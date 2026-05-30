/* ============================================================================
 * Plataforma de Seguridad Energética por País — ESQUEMA / CONTRATO DE DATOS
 * schema_version 1.0.0
 *
 * Fuente de verdad de la FORMA del JSON por país. Lo consumen:
 *   - render.js   (renderiza el tablero a partir del JSON)
 *   - editor.js   (construye el JSON desde el formulario y lo valida)
 *   - index.html  (lee meta.* para pintar la coropleta del mapa mundi)
 *
 * El ejemplo canónico y completo es  data/aus.json.
 * Se expone como window.SE_ESQUEMA y, si hay CommonJS, como module.exports.
 * ==========================================================================*/
(function (root) {
  "use strict";

  var VERSION = "1.0.0";

  /* Paleta editorial sobria (idéntica a la del HTML de referencia). */
  var PALETTE = ["#0b5394", "#c4570e", "#6a8caf", "#2e7d32", "#a17c1c", "#6b4e8e", "#8a4a4a"];

  /* Colores por tipo de pin del mapa de infraestructura (§05). */
  var TIPO_PIN_COLOR = {
    refineria: "#c4570e",
    gnl: "#0b5394",
    almacenamiento: "#2e7d32",
    minerales: "#a17c1c",
    sloc: "#c62828",
    otro: "#8693a8"
  };

  /* Niveles de la matriz de riesgo (§09): clases CSS .l1..l5. */
  var MATRIZ_NIVEL_CLASS = { 1: "l1", 2: "l2", 3: "l3", 4: "l4", 5: "l5" };

  /* Secciones canónicas del tablero, en orden. `req` = recomendada/núcleo.
   * El número (num) es FIJO y forma parte de la estética; no se renumera. */
  var SECTIONS = [
    { id: "resumen",         num: "00", label: "Resumen Ejecutivo",       req: true  },
    { id: "aperc",           num: "01", label: "Marco APERC",             req: true  },
    { id: "matriz",          num: "02", label: "Matriz Energética",       req: true  },
    { id: "sankey",          num: "03", label: "Balance (Sankey)",        req: false },
    { id: "evolucion",       num: "04", label: "Evolución & Transición",  req: false },
    { id: "infraestructura", num: "05", label: "Infraestructura (Mapa)",  req: true  },
    { id: "geopolitica",     num: "06", label: "Geopolítica & Comparado", req: false },
    { id: "militar",         num: "07", label: "Combustibles militares",  req: false },
    { id: "politicas",       num: "08", label: "Políticas & Instituciones", req: false },
    { id: "crisis",          num: "09", label: "Escenarios de Crisis",    req: false },
    { id: "referencias",     num: "10", label: "Referencias",             req: false }
  ];

  /* ---- helpers ---------------------------------------------------------- */

  /* Escapa texto plano para inserción segura como HTML. Úsese en campos que
   * NO terminan en *_html (los *_html admiten marcado del estudiante). */
  function esc(s) {
    if (s === null || s === undefined) return "";
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function pillClass(pill) {
    if (pill === "ok") return "pill-ok";
    if (pill === "warn") return "pill-warn";
    if (pill === "danger") return "pill-danger";
    return "";
  }

  function nivelClass(nivel) {
    if (nivel === "high") return "high";
    if (nivel === "med") return "med";
    if (nivel === "low") return "low";
    return "";
  }

  function isNum(x) { return typeof x === "number" && isFinite(x); }
  function nonEmptyArr(x) { return Array.isArray(x) && x.length > 0; }

  /* Promedio de las 4 A's → puntaje APERC global (0–10), 1 decimal.
   * Si meta.aperc_global viene fijado, ese valor manda. */
  function apercGlobal(data) {
    if (!data || !data.meta) return null;
    if (isNum(data.meta.aperc_global)) return data.meta.aperc_global;
    var sc = data.aperc && data.aperc.scores;
    if (!nonEmptyArr(sc)) return null;
    var vals = sc.map(function (s) { return s && s.score; }).filter(isNum);
    if (!vals.length) return null;
    var avg = vals.reduce(function (a, b) { return a + b; }, 0) / vals.length;
    return Math.round(avg * 10) / 10;
  }

  /* Color de la coropleta del mapa mundi según puntaje APERC global (0–10).
   * Verde = alto (más seguro) → rojo = bajo. Gris si no hay puntaje. */
  function scoreColor(score) {
    if (!isNum(score)) return "#d7dce4";
    if (score >= 8) return "#1b7a3d";
    if (score >= 6.5) return "#5fa052";
    if (score >= 5) return "#d4a82a";
    if (score >= 3.5) return "#c4570e";
    return "#a82822";
  }

  var SCORE_LEGEND = [
    { label: "≥ 8.0  Alta", color: "#1b7a3d" },
    { label: "6.5–7.9  Media-alta", color: "#5fa052" },
    { label: "5.0–6.4  Media", color: "#d4a82a" },
    { label: "3.5–4.9  Media-baja", color: "#c4570e" },
    { label: "< 3.5  Baja", color: "#a82822" },
    { label: "Sin entrega", color: "#d7dce4" }
  ];

  /* Esqueleto mínimo válido para "Nuevo país" en el editor. */
  function BLANK() {
    return {
      schema_version: VERSION,
      meta: {
        pais: "", pais_iso: "", pais_iso2: "",
        subtitulo_pais: "", eyebrow: "Portafolio · Seguridad Energética por País",
        titulo: "", subtitulo: "",
        estudiante: "", asignatura: "Logística Militar · Rúbrica Slide18",
        tipo_doc: "Documento de sustentación", fecha: "",
        fuerzas_armadas: "FF.MM.", aperc_global: null, cita_corta: "",
        portafolio_label: "", map_view: { lat: 20, lng: 0, zoom: 3 }
      },
      resumen: { tesis_html: "", conclusion_html: "", kpis: [] },
      aperc: {
        src: "", definicion_html: "", definicion_cita: "", scorecard_titulo: "Scorecard bajo APERC",
        scores: [
          { letra: "A", nombre: "vailability",  desc: "", score: null },
          { letra: "A", nombre: "ccessibility", desc: "", score: null },
          { letra: "A", nombre: "ffordability", desc: "", score: null },
          { letra: "A", nombre: "cceptability", desc: "", score: null }
        ],
        scorecard_cita: "", comparador: { pais_b: "", pais_c: "" },
        indicadores_titulo: "Indicadores cuantitativos aplicados", indicadores: [], indicadores_nota: ""
      },
      matriz: {
        src: "", primaria_titulo: "Energía Primaria (TPES, % EJ)", primaria: [], primaria_cita: "",
        electrica_titulo: "Generación Eléctrica (% TWh)", electrica: [], electrica_cita: "",
        comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
        comparativa: { paises: [], series: [] }, comparativa_nota: ""
      },
      sankey: { src: "", titulo_panel: "", flujos: [], nodos: {}, cita: "" },
      evolucion: { src: "", historico_titulo: "", anios: [], series: [], historico_cita: "", hitos_titulo: "Hitos del Régimen Energético", hitos: [] },
      infraestructura: {
        src: "", mapa_titulo: "", pines: [], rutas: [], leyenda: [], mapa_cita: "",
        vulnerabilidades_titulo: "Vulnerabilidades técnicas", vulnerabilidades: [],
        capacidad_titulo: "", capacidad: { anios: [], y_titulo: "GW", series: [] }, capacidad_cita: ""
      },
      geopolitica: {
        src: "", radar_titulo: "", radar: { ejes: [], series: [] }, radar_cita: "",
        dependencias_titulo: "Dependencias y socios", dependencias: [], dependencias_cita: "",
        minerales_titulo: "", minerales: [], minerales_cita: ""
      },
      militar: {
        titulo_seccion: "Combustibles Militares y Rol Operacional de las FF.MM.", nav_label: "Combustibles militares",
        src: "", combustibles_titulo: "", combustibles: [], combustibles_total: "", combustibles_cita: "",
        vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa", vulnerabilidades: [],
        mision_titulo: "", mision: [], mision_cita: ""
      },
      politicas: {
        src: "", planes_titulo: "Planes nacionales", planes: [],
        instituciones_titulo: "Instituciones clave", instituciones: [],
        transicion_titulo: "Transición justa", transicion_html: "", transicion_cita: ""
      },
      crisis: {
        src: "", matriz_titulo: "Matriz Probabilidad × Impacto",
        matriz: { esquina: "Impacto ↓ / Prob →", prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"], filas: [] },
        matriz_cita: "", escenarios_titulo: "Escenarios calibrados", escenarios: [],
        vectores_titulo: "Respuesta estratégica integrada — vectores", vectores: []
      },
      referencias: { src: "", titulo: "Fuentes primarias y académicas", items: [] },
      footer: ""
    };
  }

  /* ¿La sección tiene contenido suficiente para renderizarse? Si no, render.js
   * pinta el encabezado + marcador "— Sección no diligenciada —". */
  function sectionHasData(data, id) {
    if (!data || !data[id]) return false;
    var s = data[id];
    switch (id) {
      case "resumen":        return !!(s.tesis_html || s.conclusion_html || nonEmptyArr(s.kpis));
      case "aperc":          return !!(s.definicion_html || nonEmptyArr(s.indicadores) ||
                                       (nonEmptyArr(s.scores) && s.scores.some(function (x) { return isNum(x.score); })));
      case "matriz":         return nonEmptyArr(s.primaria) || nonEmptyArr(s.electrica) ||
                                    (s.comparativa && nonEmptyArr(s.comparativa.series));
      case "sankey":         return nonEmptyArr(s.flujos);
      case "evolucion":      return (nonEmptyArr(s.anios) && nonEmptyArr(s.series)) || nonEmptyArr(s.hitos);
      case "infraestructura":return nonEmptyArr(s.pines) || nonEmptyArr(s.vulnerabilidades) ||
                                    (s.capacidad && nonEmptyArr(s.capacidad.series));
      case "geopolitica":    return (s.radar && nonEmptyArr(s.radar.series)) || nonEmptyArr(s.dependencias) || nonEmptyArr(s.minerales);
      case "militar":        return nonEmptyArr(s.combustibles) || nonEmptyArr(s.vulnerabilidades) || nonEmptyArr(s.mision);
      case "politicas":      return nonEmptyArr(s.planes) || nonEmptyArr(s.instituciones) || !!s.transicion_html;
      case "crisis":         return (s.matriz && nonEmptyArr(s.matriz.filas)) || nonEmptyArr(s.escenarios) || nonEmptyArr(s.vectores);
      case "referencias":    return nonEmptyArr(s.items);
      default:               return false;
    }
  }

  /* Validación práctica (no exhaustiva): bloqueantes en `errors`, sugerencias
   * en `warnings`. Devuelve {ok, errors, warnings}. */
  function validate(data) {
    var errors = [], warnings = [];
    if (!data || typeof data !== "object") { return { ok: false, errors: ["El archivo no es un objeto JSON válido."], warnings: [] }; }

    var m = data.meta || {};
    if (!m.pais) errors.push("meta.pais es obligatorio (nombre del país).");
    if (!m.pais_iso || !/^[A-Za-z]{3}$/.test(m.pais_iso)) errors.push("meta.pais_iso debe ser el código ISO 3166-1 alpha-3 de 3 letras (ej. AUS, COL, NOR).");
    if (!m.titulo) warnings.push("meta.titulo está vacío (título principal del tablero).");
    if (!m.estudiante) warnings.push("meta.estudiante está vacío (se muestra en el mapa al pasar el cursor).");

    if (data.schema_version && data.schema_version !== VERSION)
      warnings.push("schema_version es " + data.schema_version + "; esta plataforma usa " + VERSION + ".");

    if (apercGlobal(data) === null)
      warnings.push("No hay puntaje APERC global ni scores de las 4 A's; el país saldrá en gris en el mapa.");

    var faltan = SECTIONS.filter(function (sec) { return sec.req && !sectionHasData(data, sec.id); })
                         .map(function (sec) { return sec.num + " " + sec.label; });
    if (faltan.length) warnings.push("Secciones núcleo sin diligenciar: " + faltan.join(", ") + ".");

    /* coherencia de longitudes en comparativos */
    var cmp = data.matriz && data.matriz.comparativa;
    if (cmp && nonEmptyArr(cmp.series) && nonEmptyArr(cmp.paises)) {
      cmp.series.forEach(function (s, i) {
        if (Array.isArray(s.data) && s.data.length !== cmp.paises.length)
          warnings.push("matriz.comparativa.series[" + i + "] tiene " + s.data.length + " valores pero hay " + cmp.paises.length + " países.");
      });
    }
    var ev = data.evolucion;
    if (ev && nonEmptyArr(ev.anios) && nonEmptyArr(ev.series)) {
      ev.series.forEach(function (s, i) {
        if (Array.isArray(s.data) && s.data.length !== ev.anios.length)
          warnings.push("evolucion.series[" + i + "] tiene " + s.data.length + " valores pero hay " + ev.anios.length + " años.");
      });
    }

    return { ok: errors.length === 0, errors: errors, warnings: warnings };
  }

  var API = {
    VERSION: VERSION,
    PALETTE: PALETTE,
    TIPO_PIN_COLOR: TIPO_PIN_COLOR,
    MATRIZ_NIVEL_CLASS: MATRIZ_NIVEL_CLASS,
    SECTIONS: SECTIONS,
    SCORE_LEGEND: SCORE_LEGEND,
    esc: esc,
    pillClass: pillClass,
    nivelClass: nivelClass,
    apercGlobal: apercGlobal,
    scoreColor: scoreColor,
    sectionHasData: sectionHasData,
    BLANK: BLANK,
    validate: validate
  };

  root.SE_ESQUEMA = API;
  if (typeof module !== "undefined" && module.exports) module.exports = API;
})(typeof window !== "undefined" ? window : this);
