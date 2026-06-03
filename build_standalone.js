/* ------------------------------------------------------------------ *
 * build_standalone.js
 * Ensambla TODA la plataforma (mapa mundi + tableros de país) en un
 * único HTML autocontenido: CSS, schema.js, render.js, logos y los
 * datos de los 17 países + GeoJSON quedan EMBEBIDOS. Funciona con
 * doble clic (file://) sin servidor ni carpeta data/.
 *
 * Las librerías Leaflet / Chart.js / sankey siguen viniendo por CDN
 * (necesita internet para ellas y para las teselas del mapa base).
 *
 * Uso:  node build_standalone.js
 * Salida: Tablero_Seguridad_Energetica.html
 * ------------------------------------------------------------------ */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = __dirname;

const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const b64 = (p) => fs.readFileSync(path.join(ROOT, p)).toString("base64");
/* Embebe un objeto JS escapando "<" para no romper </script> dentro del JSON. */
const esc = (s) => s.replace(/</g, "\\u003c");
const embed = (obj) => esc(JSON.stringify(obj));
const embedText = (txt) => esc(txt);

/* ---- Fuentes -------------------------------------------------------- */
const css = read("assets/app.css");
const schema = read("assets/schema.js");
const render = read("assets/render.js");
const geoText = read("assets/countries.geo.json"); // JSON válido como texto
const logo = "data:image/png;base64," + b64("assets/esdegue-logo.png");

/* Datos de país (excluye manifest y plantilla), indexados por ISO3. */
const dataDir = path.join(ROOT, "data");
const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json") && f !== "manifest.json" && f !== "_plantilla.json");
const SE_DATA = {};
files.forEach((f) => {
  const d = JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf8"));
  const iso = String((d.meta && d.meta.pais_iso) || path.basename(f, ".json")).toUpperCase();
  SE_DATA[iso] = d;
});
const manifest = JSON.parse(read("data/manifest.json"));
const plantilla = fs.existsSync(path.join(dataDir, "_plantilla.json")) ? JSON.parse(read("data/_plantilla.json")) : {};

/* ---- Reutilizar markup y script del mapa de index.html -------------- */
const indexHtml = read("index.html");
const mapStyles = (indexHtml.match(/<style>([\s\S]*?)<\/style>/) || [, ""])[1];

const bodyInner = indexHtml.slice(indexHtml.indexOf("<body>") + "<body>".length, indexHtml.lastIndexOf("</body>"));
const scriptAt = bodyInner.indexOf("<script>");
let mapMarkup = bodyInner.slice(0, scriptAt);
let mapScript = bodyInner.slice(scriptAt).replace(/^\s*<script>/, "").replace(/<\/script>\s*$/, "");

/* Adaptaciones del markup: logos a base64 + quitar enlace al editor externo. */
mapMarkup = mapMarkup.replace(/src="assets\/esdegue-logo\.png"/g, 'src="' + logo + '"');
mapMarkup = mapMarkup.replace(/<a class="btn btn-primary sans" href="editor\.html">Abrir editor<\/a>/g, "");

/* Adaptación del script: navegación a tablero -> router interno. */
const navCount = (mapScript.match(/window\.location = "pais\.html\?pais=" \+ encodeURIComponent\(e\.meta\.iso\);/g) || []).length;
mapScript = mapScript.replace(/window\.location = "pais\.html\?pais=" \+ encodeURIComponent\(e\.meta\.iso\);/g, "window.__verPais(e.meta.iso);");
if (navCount !== 2) console.warn("AVISO: se esperaban 2 navegaciones a reemplazar, se encontraron " + navCount);

/* ---- Glue: fetch-shim (sirve datos embebidos) + router ------------- */
const glue = `
(function () {
  "use strict";
  // Sirve los datos embebidos a través de fetch() para que el script del
  // mapa (tomado de index.html) funcione sin servidor ni carpeta data/.
  var realFetch = window.fetch ? window.fetch.bind(window) : null;
  function resp(obj) {
    return Promise.resolve({ ok: true, status: 200,
      json: function () { return Promise.resolve(obj); },
      text: function () { return Promise.resolve(JSON.stringify(obj)); } });
  }
  window.fetch = function (url) {
    var u = String(url);
    if (u.indexOf("assets/countries.geo.json") !== -1) return resp(window.SE_GEO);
    if (u.indexOf("data/manifest.json") !== -1) return resp(window.SE_MANIFEST);
    var m = u.match(/data\\/([A-Za-z]{3})\\.json/);
    if (m) {
      var iso = m[1].toUpperCase();
      return window.SE_DATA[iso] ? resp(window.SE_DATA[iso])
        : Promise.resolve({ ok: false, status: 404, json: function () { return Promise.resolve(null); } });
    }
    return realFetch ? realFetch(url) : Promise.resolve({ ok: false, status: 404 });
  };

  // Router mapa <-> tablero (todo en la misma página).
  function el(id) { return document.getElementById(id); }
  window.__verPais = function (iso) {
    iso = String(iso || "").toUpperCase();
    var data = window.SE_DATA[iso];
    if (!data || !window.renderDashboard) return;
    var tb = el("tbPais");
    if (tb && data.meta) tb.textContent = data.meta.pais || iso;
    document.title = "Seguridad Energética · " + ((data.meta && data.meta.pais) || iso);
    el("view-map").style.display = "none";
    el("view-pais").style.display = "block";
    window.scrollTo(0, 0);
    window.renderDashboard(el("app"), data);
    try { window.history.replaceState({ iso: iso }, "", "#" + iso); } catch (e) {}
  };
  window.__verMapa = function () {
    el("view-pais").style.display = "none";
    el("view-map").style.display = "block";
    document.title = "Seguridad Energética por País — Panel Mundial";
    try { window.history.replaceState({}, "", location.pathname + location.search); } catch (e) {}
    setTimeout(function () { window.dispatchEvent(new Event("resize")); }, 60); // re-mide Leaflet
  };

  document.addEventListener("DOMContentLoaded", function () {
    var back = el("btn-back");
    if (back) back.addEventListener("click", function (e) { e.preventDefault(); window.__verMapa(); });
    var lnk = el("lnk-plantilla");
    if (lnk) lnk.addEventListener("click", function (e) {
      e.preventDefault();
      try {
        var blob = new Blob([JSON.stringify(window.SE_PLANTILLA, null, 2)], { type: "application/json" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob); a.download = "_plantilla.json";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
      } catch (err) { alert("No se pudo generar la plantilla."); }
    });
    window.addEventListener("popstate", function () {
      var h = (location.hash || "").replace("#", "").toUpperCase();
      if (h && window.SE_DATA[h]) window.__verPais(h); else window.__verMapa();
    });
    var h0 = (location.hash || "").replace("#", "").toUpperCase();
    if (h0 && window.SE_DATA[h0]) window.__verPais(h0); // enlace directo #ECU
  });
})();
`;

/* ---- Ensamblado del HTML ------------------------------------------- */
const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Seguridad Energética por País — Plataforma (autocontenida)</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-chart-sankey@0.12.1/dist/chartjs-chart-sankey.min.js"></script>
<style>
/* === app.css (tablero) === */
${css}
/* === estilos del panel mundial (de index.html) === */
${mapStyles}
/* === ajustes del modo autocontenido === */
#view-pais .topbar .back { cursor: pointer; }
</style>
</head>
<body>

<div id="view-map">
${mapMarkup}
</div>

<div id="view-pais" style="display:none">
  <div class="topbar">
    <a class="back" href="#" id="btn-back">← Volver al mapa</a>
    <span class="tb-pais" id="tbPais">Seguridad Energética</span>
  </div>
  <div id="app"></div>
</div>

<script>window.SE_GEO = ${embedText(geoText)};</script>
<script>window.SE_DATA = ${embed(SE_DATA)};</script>
<script>window.SE_MANIFEST = ${embed(manifest)}; window.SE_PLANTILLA = ${embed(plantilla)};</script>
<script>${glue}</script>
<script>
/* === assets/schema.js === */
${schema}
</script>
<script>
/* === assets/render.js === */
${render}
</script>
<script>
"use strict";
/* === script del panel mundial (de index.html, navegación adaptada al router) === */
${mapScript}
</script>
</body>
</html>
`;

const OUT = "Tablero_Seguridad_Energetica.html";
fs.writeFileSync(path.join(ROOT, OUT), html, "utf8");
const kb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(0);
console.log("OK " + OUT + " (" + kb + " KB) · países: " + Object.keys(SE_DATA).length + " · navegaciones adaptadas: " + navCount);
