/* ============================================================================
 * Plataforma de Seguridad Energética por País — núcleo de render.
 * Define window.renderDashboard(rootEl, data).
 *
 * Reproduce 1:1 la estética/DOM/JS del HTML de referencia (dashboard Australia),
 * pero a partir del JSON por país (forma = data/aus.json) y de la API
 * window.SE_ESQUEMA (assets/schema.js).
 *
 * Re-ejecutable: el editor lo llama en cada cambio para la vista previa. Por eso
 * destruimos charts/mapa/observer/listeners previos antes de reconstruir.
 * ==========================================================================*/
(function (root) {
  "use strict";

  var SE = root.SE_ESQUEMA;

  /* Estado vivo entre re-render para poder limpiar sin fugas. */
  var LIVE = {
    charts: [],          // instancias Chart.js
    map: null,           // instancia Leaflet
    observer: null,      // IntersectionObserver de reveal
    onScroll: null,      // listener de scroll-spy
    mapTimer: null       // timeout de invalidateSize
  };

  /* ---- helpers de DOM y datos ------------------------------------------- */

  function esc(s) { return SE.esc(s); }

  /* Crea un elemento; props.html inserta HTML crudo; props.text se escapa. */
  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "style") node.setAttribute("style", attrs[k]);
        else if (attrs[k] !== null && attrs[k] !== undefined) node.setAttribute(k, attrs[k]);
      });
    }
    if (html !== null && html !== undefined) node.innerHTML = html;
    return node;
  }

  function colorAt(obj, i) {
    return (obj && obj.color) || SE.PALETTE[i % SE.PALETTE.length];
  }

  /* "#0b5394" → "rgba(11,83,148,a)". Tolerante a #rgb y #rrggbb. */
  function rgba(hex, a) {
    if (typeof hex !== "string") return "rgba(11,83,148," + a + ")";
    var h = hex.replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    if (!isFinite(n)) return "rgba(11,83,148," + a + ")";
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  /* ¿Una cadena es numérica (para alinear celdas a la derecha)? Admite signos,
   * separadores de miles, decimales, %, "n/d", "—", "90+". */
  function looksNumeric(v) {
    if (typeof v === "number") return true;
    if (v === null || v === undefined) return false;
    var s = String(v).trim();
    return /[0-9]/.test(s) && /^[−\-+]?[\d.,\s]+%?\+?$/.test(s.replace(/−/g, "-"));
  }

  /* ---- charts (uniformes con la referencia) ----------------------------- */

  function setChartDefaults() {
    if (!root.Chart) return;
    var C = root.Chart;
    C.defaults.font.family = "'Helvetica Neue','Arial',sans-serif";
    C.defaults.font.size = 11;
    C.defaults.color = "#4a5870";
    C.defaults.borderColor = "#e2e6ed";
    C.defaults.plugins.legend.labels.boxWidth = 10;
    C.defaults.plugins.legend.labels.usePointStyle = true;
    C.defaults.animation.duration = 900;
    C.defaults.animation.easing = "easeOutQuart";
  }

  function newChart(canvas, cfg) {
    if (!root.Chart || !canvas) return null;
    var ch = new root.Chart(canvas, cfg);
    LIVE.charts.push(ch);
    return ch;
  }

  /* Barra horizontal apilada 100% con un solo eje de categoría (mix de un país). */
  function chartMixUnico(canvas, items, catLabel) {
    var datasets = items.map(function (it, i) {
      return { label: it.label, data: [it.valor], backgroundColor: colorAt(it, i) };
    });
    newChart(canvas, {
      type: "bar",
      data: { labels: [catLabel || ""], datasets: datasets },
      options: {
        indexAxis: "y",
        plugins: { legend: { position: "bottom" } },
        scales: {
          x: { stacked: true, max: 100, ticks: { callback: function (v) { return v + "%"; } } },
          y: { stacked: true, display: false }
        }
      }
    });
  }

  /* Comparativa: barras horizontales apiladas 100% con varios países. */
  function chartComparativa(canvas, paises, series) {
    var datasets = series.map(function (s, i) {
      return { label: s.label, data: s.data || [], backgroundColor: colorAt(s, i) };
    });
    newChart(canvas, {
      type: "bar",
      data: { labels: (paises || []), datasets: datasets },
      options: {
        indexAxis: "y",
        plugins: { legend: { position: "bottom" } },
        scales: {
          x: { stacked: true, max: 100, ticks: { callback: function (v) { return v + "%"; } } },
          y: { stacked: true }
        }
      }
    });
  }

  /* ---- builders de cada sección ----------------------------------------- */

  function secHead(num, titulo, src) {
    var head = el("div", { class: "sec-head" });
    head.appendChild(el("span", { class: "n" }, esc(num)));
    head.appendChild(el("h2", null, titulo)); // titulo puede incluir marcado controlado
    head.appendChild(el("span", { class: "src" }, src ? esc(src) : ""));
    return head;
  }

  function placeholder(section) {
    section.appendChild(el("div", { class: "placeholder-vacio" }, "— Sección no diligenciada —"));
  }

  function panel(titulo, extraClass) {
    var p = el("div", { class: "panel" + (extraClass ? " " + extraClass : "") });
    if (titulo) p.appendChild(el("h3", null, esc(titulo)));
    return p;
  }

  function cite(html) { return el("div", { class: "cite" }, html || ""); }
  function fn(html) { return el("div", { class: "fn" }, html || ""); }

  function chartWrap(canvas, sizeClass) {
    var w = el("div", { class: "chart-wrap" + (sizeClass ? " " + sizeClass : "") });
    w.appendChild(canvas);
    return w;
  }

  /* 00 — Resumen ejecutivo */
  function buildResumen(section, d) {
    var ab = el("div", { class: "abstract" });
    ab.appendChild(el("div", { class: "label" }, "Resumen Ejecutivo"));
    if (d.tesis_html)
      ab.appendChild(el("p", { style: "margin-bottom:8px" }, "<b>Tesis:</b> " + d.tesis_html));
    if (d.conclusion_html)
      ab.appendChild(el("p", null, "<b>Conclusión clave:</b> " + d.conclusion_html));
    section.appendChild(ab);

    if (Array.isArray(d.kpis) && d.kpis.length) {
      var row = el("div", { class: "kpi-row" });
      d.kpis.forEach(function (k) {
        var card = el("div", { class: "kpi" });
        var v = el("div", { class: "v", "data-c": k.valor, "data-dec": k.decimal ? "1" : null });
        v.appendChild(document.createTextNode("0"));
        v.appendChild(el("span", { class: "u" }, esc(k.unidad || "")));
        card.appendChild(v);
        card.appendChild(el("div", { class: "l" }, esc(k.etiqueta || "")));
        row.appendChild(card);
      });
      section.appendChild(row);
    }
  }

  /* 01 — Marco APERC */
  function buildAperc(section, d, meta) {
    var grid = el("div", { class: "grid g2" });

    var pDef = panel("Definición operativa");
    if (d.definicion_html) {
      var box = el("div", null, d.definicion_html);
      while (box.firstChild) pDef.appendChild(box.firstChild);
    }
    if (d.definicion_cita) pDef.appendChild(cite(d.definicion_cita));
    grid.appendChild(pDef);

    var pScore = panel(d.scorecard_titulo || "Scorecard bajo APERC");
    var aperc = el("div", { class: "aperc" });
    (d.scores || []).forEach(function (s) {
      var a = el("div", { class: "a" });
      a.appendChild(el("div", { class: "letter" }, esc(s.letra)));
      a.appendChild(el("div", { class: "name" }, esc(s.nombre)));
      a.appendChild(el("div", { class: "desc" }, esc(s.desc)));
      if (s.score !== null && s.score !== undefined && s.score !== "")
        a.appendChild(el("div", { class: "score" }, "<b>" + esc(s.score) + "</b>/10"));
      aperc.appendChild(a);
    });
    pScore.appendChild(aperc);
    if (d.scorecard_cita) pScore.appendChild(cite(d.scorecard_cita));
    grid.appendChild(pScore);

    if (Array.isArray(d.indicadores) && d.indicadores.length) {
      var cmp = d.comparador || {};
      var pInd = panel(d.indicadores_titulo || "Indicadores cuantitativos aplicados", "span2");
      var table = el("table");
      var thead = el("thead");
      var htr = el("tr");
      ["Indicador", "Definición"].forEach(function (h) { htr.appendChild(el("th", null, esc(h))); });
      htr.appendChild(el("th", { class: "num" }, esc(meta.pais || "Propio")));
      htr.appendChild(el("th", { class: "num" }, esc(cmp.pais_b || "B")));
      htr.appendChild(el("th", { class: "num" }, esc(cmp.pais_c || "C")));
      htr.appendChild(el("th", null, "Interpretación"));
      thead.appendChild(htr); table.appendChild(thead);

      var tbody = el("tbody");
      d.indicadores.forEach(function (r) {
        var tr = el("tr");
        tr.appendChild(el("td", null, esc(r.indicador)));
        tr.appendChild(el("td", null, esc(r.definicion)));
        [r.propio, r.b, r.c].forEach(function (val) {
          tr.appendChild(el("td", looksNumeric(val) ? { class: "num" } : null, esc(val)));
        });
        var interp = r.interp || {};
        var tdI = el("td");
        if (interp.pill) {
          tdI.appendChild(el("span", { class: "pill " + SE.pillClass(interp.pill) }, esc(interp.texto)));
        } else {
          tdI.appendChild(document.createTextNode(interp.texto || ""));
        }
        tr.appendChild(tdI);
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      pInd.appendChild(table);
      if (d.indicadores_nota) pInd.appendChild(fn(d.indicadores_nota));
      grid.appendChild(pInd);
    }

    section.appendChild(grid);
  }

  /* 02 — Matriz energética */
  function buildMatriz(section, d, meta) {
    var grid = el("div", { class: "grid g2" });

    var pPrim = panel(d.primaria_titulo || "Energía Primaria");
    var cPrim = el("canvas");
    pPrim.appendChild(chartWrap(cPrim));
    if (d.primaria_cita) pPrim.appendChild(cite(d.primaria_cita));
    grid.appendChild(pPrim);

    var pElec = panel(d.electrica_titulo || "Generación Eléctrica");
    var cElec = el("canvas");
    pElec.appendChild(chartWrap(cElec));
    if (d.electrica_cita) pElec.appendChild(cite(d.electrica_cita));
    grid.appendChild(pElec);

    var comp = d.comparativa || {};
    var pCmp = null, cCmp = null;
    if (Array.isArray(comp.series) && comp.series.length) {
      pCmp = panel(d.comparativa_titulo || "Comparativa Internacional", "span2");
      cCmp = el("canvas");
      pCmp.appendChild(chartWrap(cCmp));
      if (d.comparativa_nota) pCmp.appendChild(fn(d.comparativa_nota));
      grid.appendChild(pCmp);
    }
    section.appendChild(grid);

    /* Charts tras inyectar al DOM. */
    if (Array.isArray(d.primaria) && d.primaria.length) chartMixUnico(cPrim, d.primaria, (meta && meta.pais) || "");
    if (Array.isArray(d.electrica) && d.electrica.length) chartMixUnico(cElec, d.electrica, (meta && meta.pais) || "");
    if (cCmp) chartComparativa(cCmp, comp.paises, comp.series);
  }

  /* 03 — Sankey */
  function buildSankey(section, d) {
    var p = panel(d.titulo_panel || "Flujos físicos de energía");
    var canvas = el("canvas");
    p.appendChild(chartWrap(canvas, "chart-xl"));
    if (d.cita) p.appendChild(cite(d.cita));
    section.appendChild(p);

    var nodos = d.nodos || {};
    var labels = {};
    Object.keys(nodos).forEach(function (k) { labels[k] = (nodos[k] && nodos[k].label) || k; });

    newChart(canvas, {
      type: "sankey",
      data: {
        datasets: [{
          data: (d.flujos || []).map(function (f) { return { from: f.from, to: f.to, flow: f.flow }; }),
          colorFrom: function (c) {
            var key = c.dataset.data[c.dataIndex].from;
            return (nodos[key] && nodos[key].color) || "#8693a8";
          },
          colorTo: function (c) {
            var key = c.dataset.data[c.dataIndex].to;
            return (nodos[key] && nodos[key].color) || "#8693a8";
          },
          colorMode: "gradient",
          labels: labels
        }]
      },
      options: { plugins: { legend: { display: false } } }
    });
  }

  /* 04 — Evolución & transición */
  function buildEvolucion(section, d) {
    var grid = el("div", { class: "grid g2" });

    var pHist = panel(d.historico_titulo || "Mix histórico y proyectado");
    var canvas = el("canvas");
    pHist.appendChild(chartWrap(canvas, "chart-tall"));
    if (d.historico_cita) pHist.appendChild(cite(d.historico_cita));
    grid.appendChild(pHist);

    var pTl = panel(d.hitos_titulo || "Hitos del Régimen Energético");
    if (Array.isArray(d.hitos) && d.hitos.length) {
      var tl = el("div", { class: "timeline" });
      d.hitos.forEach(function (h) {
        var item = el("div", { class: "tl" });
        item.appendChild(el("div", { class: "y" }, esc(h.anio)));
        item.appendChild(el("div", { class: "e" }, esc(h.evento)));
        tl.appendChild(item);
      });
      pTl.appendChild(tl);
    }
    grid.appendChild(pTl);
    section.appendChild(grid);

    if (Array.isArray(d.anios) && d.anios.length && Array.isArray(d.series) && d.series.length) {
      var datasets = d.series.map(function (s, i) {
        var col = colorAt(s, i);
        return {
          label: s.label, data: s.data || [],
          borderColor: col, backgroundColor: rgba(col, 0.18),
          fill: true, tension: 0.3, pointRadius: 2
        };
      });
      newChart(canvas, {
        type: "line",
        data: { labels: d.anios, datasets: datasets },
        options: {
          plugins: { legend: { position: "bottom" } },
          scales: { y: { beginAtZero: true, max: 100, ticks: { callback: function (v) { return v + "%"; } } } }
        }
      });
    }
  }

  /* 05 — Infraestructura (mapa Leaflet) */
  function buildInfra(section, d, meta) {
    var pMap = panel(d.mapa_titulo || "Nodos energéticos y rutas");
    var mapDiv = el("div", { id: "map" });
    pMap.appendChild(mapDiv);
    if (Array.isArray(d.leyenda) && d.leyenda.length) {
      var lg = el("div", { class: "legend-row" });
      d.leyenda.forEach(function (item) {
        var s = el("span");
        s.appendChild(el("span", { class: "dot", style: "background:" + esc(item.color) }));
        s.appendChild(document.createTextNode(item.label || ""));
        lg.appendChild(s);
      });
      pMap.appendChild(lg);
    }
    if (d.mapa_cita) pMap.appendChild(cite(d.mapa_cita));
    section.appendChild(pMap);

    var grid = el("div", { class: "grid g2", style: "margin-top:18px" });

    var pVul = panel(d.vulnerabilidades_titulo || "Vulnerabilidades técnicas");
    (d.vulnerabilidades || []).forEach(function (v) {
      pVul.appendChild(riskRow(v));
    });
    grid.appendChild(pVul);

    var cap = d.capacidad || {};
    var pCap = panel(d.capacidad_titulo || "Capacidad vs Demanda");
    var canvas = el("canvas");
    pCap.appendChild(chartWrap(canvas, "chart-tall"));
    if (d.capacidad_cita) pCap.appendChild(cite(d.capacidad_cita));
    grid.appendChild(pCap);
    section.appendChild(grid);

    /* Chart de capacidad: barras apiladas + línea(s). */
    if (Array.isArray(cap.series) && cap.series.length) {
      var datasets = cap.series.map(function (s, i) {
        var col = colorAt(s, i);
        if (s.tipo === "line") {
          return {
            label: s.label, type: "line", data: s.data || [],
            borderColor: col, backgroundColor: col, tension: 0.3, borderWidth: 2.5, pointRadius: 3
          };
        }
        return { label: s.label, type: "bar", data: s.data || [], backgroundColor: col };
      });
      newChart(canvas, {
        type: "bar",
        data: { labels: (cap.anios || []), datasets: datasets },
        options: {
          plugins: { legend: { position: "bottom" } },
          scales: {
            x: { stacked: true },
            y: { stacked: true, beginAtZero: true, title: { display: true, text: cap.y_titulo || "GW" } }
          }
        }
      });
    }

    /* Mapa Leaflet sobre el div recién insertado. */
    initMapa(mapDiv, d, meta);
  }

  function initMapa(mapDiv, d, meta) {
    if (!root.L) return;
    var L = root.L;
    var mv = (meta && meta.map_view) || { lat: 20, lng: 0, zoom: 2 };

    var map = L.map(mapDiv, { zoomControl: true, attributionControl: true })
      .setView([mv.lat, mv.lng], mv.zoom);
    LIVE.map = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: "© OpenStreetMap, © CARTO", maxZoom: 10
    }).addTo(map);

    function pin(lat, lng, color, name, desc) {
      var m = L.circleMarker([lat, lng], {
        radius: 7, color: "#fff", weight: 1.5, fillColor: color, fillOpacity: 0.95
      }).addTo(map);
      m.bindPopup("<b>" + esc(name) + "</b><br/><span style=\"font-size:11px;color:#4a5870\">" + esc(desc) + "</span>");
      return m;
    }

    (d.pines || []).forEach(function (p) {
      var color = SE.TIPO_PIN_COLOR[p.tipo] || SE.TIPO_PIN_COLOR.otro;
      pin(p.lat, p.lng, color, p.nombre, p.desc);
    });

    var slocStyle = { color: "#c62828", weight: 2, dashArray: "6,4", opacity: 0.7 };
    (d.rutas || []).forEach(function (r) {
      var line = L.polyline(r.puntos || [], slocStyle).addTo(map);
      if (r.tooltip) line.bindTooltip(esc(r.tooltip));
    });

    /* invalidateSize tras un pequeño timeout para que el mapa pinte bien. */
    LIVE.mapTimer = setTimeout(function () { try { map.invalidateSize(); } catch (e) {} }, 220);
  }

  /* 06 — Geopolítica & comparado */
  function buildGeopolitica(section, d) {
    var grid = el("div", { class: "grid g2" });

    var rad = d.radar || {};
    var pRadar = panel(d.radar_titulo || "Radar APERC comparativo");
    var canvas = el("canvas");
    pRadar.appendChild(chartWrap(canvas, "chart-tall"));
    if (d.radar_cita) pRadar.appendChild(cite(d.radar_cita));
    grid.appendChild(pRadar);

    var pDep = panel(d.dependencias_titulo || "Dependencias y socios");
    if (Array.isArray(d.dependencias) && d.dependencias.length) {
      var table = el("table");
      var thead = el("thead");
      var htr = el("tr");
      htr.appendChild(el("th", null, "Vínculo"));
      htr.appendChild(el("th", { class: "num" }, "% Comercio"));
      htr.appendChild(el("th", null, "Riesgo"));
      thead.appendChild(htr); table.appendChild(thead);
      var tbody = el("tbody");
      d.dependencias.forEach(function (r) {
        var tr = el("tr");
        tr.appendChild(el("td", null, esc(r.vinculo)));
        tr.appendChild(el("td", { class: "num" }, esc(r.pct)));
        var riesgo = r.riesgo || {};
        var tdR = el("td");
        if (riesgo.pill) tdR.appendChild(el("span", { class: "pill " + SE.pillClass(riesgo.pill) }, esc(riesgo.texto)));
        else tdR.appendChild(document.createTextNode(riesgo.texto || ""));
        tr.appendChild(tdR);
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      pDep.appendChild(table);
    }
    if (d.dependencias_cita) pDep.appendChild(cite(d.dependencias_cita));
    grid.appendChild(pDep);

    if (Array.isArray(d.minerales) && d.minerales.length) {
      var pMin = panel(d.minerales_titulo || "Minerales críticos", "span2");
      var g4 = el("div", { class: "grid g4", style: "gap:14px" });
      d.minerales.forEach(function (m) {
        var cell = el("div");
        var big = el("div", { class: "sans", style: "font-size:30px;font-weight:700;color:var(--accent)" });
        big.appendChild(document.createTextNode(String(m.valor === null || m.valor === undefined ? "" : m.valor)));
        big.appendChild(el("span", { style: "font-size:14px;color:var(--muted)" }, esc(m.unidad || "")));
        cell.appendChild(big);
        cell.appendChild(el("div", { class: "sans", style: "font-size:11px;color:var(--ink-2);letter-spacing:1px" }, esc(m.etiqueta || "")));
        g4.appendChild(cell);
      });
      pMin.appendChild(g4);
      if (d.minerales_cita) pMin.appendChild(cite(d.minerales_cita));
      grid.appendChild(pMin);
    }
    section.appendChild(grid);

    if (Array.isArray(rad.series) && rad.series.length) {
      var datasets = rad.series.map(function (s, i) {
        var col = colorAt(s, i);
        return {
          label: s.label, data: s.data || [],
          borderColor: col, backgroundColor: rgba(col, 0.15), pointBackgroundColor: col, borderWidth: 2
        };
      });
      newChart(canvas, {
        type: "radar",
        data: { labels: (rad.ejes || []), datasets: datasets },
        options: {
          plugins: { legend: { position: "bottom" } },
          scales: {
            r: {
              beginAtZero: true, max: 10,
              ticks: { stepSize: 2, showLabelBackdrop: false, color: "#8693a8" },
              grid: { color: "#e2e6ed" }, angleLines: { color: "#e2e6ed" },
              pointLabels: { font: { size: 11 }, color: "#1a2332" }
            }
          }
        }
      });
    }
  }

  /* 07 — Combustibles militares */
  function buildMilitar(section, d) {
    var grid = el("div", { class: "grid g2" });

    var pComb = panel(d.combustibles_titulo || "Demanda de combustibles");
    if (Array.isArray(d.combustibles) && d.combustibles.length) {
      var table = el("table");
      var thead = el("thead");
      var htr = el("tr");
      htr.appendChild(el("th", null, "Código OTAN"));
      htr.appendChild(el("th", null, "Tipo"));
      htr.appendChild(el("th", null, "Usuario"));
      htr.appendChild(el("th", { class: "num" }, "~ML/año"));
      thead.appendChild(htr); table.appendChild(thead);
      var tbody = el("tbody");
      d.combustibles.forEach(function (c) {
        var tr = el("tr");
        tr.appendChild(el("td", null, "<b>" + esc(c.codigo) + "</b>"));
        tr.appendChild(el("td", null, esc(c.tipo)));
        tr.appendChild(el("td", null, esc(c.usuario)));
        tr.appendChild(el("td", { class: "num" }, esc(c.ml_anio)));
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      if (d.combustibles_total) {
        var tfoot = el("tfoot");
        var ftr = el("tr");
        ftr.appendChild(el("td", { colspan: "3" }, "<b>Total estimado</b>"));
        ftr.appendChild(el("td", { class: "num" }, "<b>" + esc(d.combustibles_total) + "</b>"));
        tfoot.appendChild(ftr); table.appendChild(tfoot);
      }
      pComb.appendChild(table);
    }
    if (d.combustibles_cita) pComb.appendChild(cite(d.combustibles_cita));
    grid.appendChild(pComb);

    var pVul = panel(d.vulnerabilidades_titulo || "Vulnerabilidades específicas de defensa");
    (d.vulnerabilidades || []).forEach(function (v) { pVul.appendChild(riskRow(v)); });
    grid.appendChild(pVul);

    if (Array.isArray(d.mision) && d.mision.length) {
      var pMis = panel(d.mision_titulo || "Misión en Seguridad Energética", "span2");
      var g3 = el("div", { class: "grid g3", style: "gap:18px" });
      d.mision.forEach(function (m) {
        var cell = el("div");
        cell.appendChild(el("div", { class: "sans", style: "font-size:11px;letter-spacing:2px;color:var(--accent);font-weight:600" }, esc(m.titulo)));
        cell.appendChild(el("p", { style: "margin-top:6px" }, m.texto_html || ""));
        g3.appendChild(cell);
      });
      pMis.appendChild(g3);
      if (d.mision_cita) pMis.appendChild(cite(d.mision_cita));
      grid.appendChild(pMis);
    }
    section.appendChild(grid);
  }

  /* 08 — Políticas & instituciones */
  function buildPoliticas(section, d) {
    var grid = el("div", { class: "grid g3" });

    var pPlan = panel(d.planes_titulo || "Planes nacionales");
    (d.planes || []).forEach(function (pl) {
      pPlan.appendChild(el("p", null, "<b>" + esc(pl.nombre) + "</b> — " + esc(pl.texto)));
    });
    grid.appendChild(pPlan);

    var pInst = panel(d.instituciones_titulo || "Instituciones clave");
    (d.instituciones || []).forEach(function (it) {
      pInst.appendChild(el("p", null, "<b>" + esc(it.sigla) + "</b> · " + (it.texto || "")));
    });
    grid.appendChild(pInst);

    var pTr = panel(d.transicion_titulo || "Transición justa");
    if (d.transicion_html) {
      var box = el("div", null, d.transicion_html);
      while (box.firstChild) pTr.appendChild(box.firstChild);
    }
    if (d.transicion_cita) pTr.appendChild(cite(d.transicion_cita));
    grid.appendChild(pTr);

    section.appendChild(grid);
  }

  /* 09 — Escenarios de crisis */
  function buildCrisis(section, d) {
    var grid = el("div", { class: "grid g2" });

    var mtx = d.matriz || {};
    var pMtx = panel(d.matriz_titulo || "Matriz Probabilidad × Impacto");
    if (Array.isArray(mtx.filas) && mtx.filas.length) {
      var m = el("div", { class: "matrix" });
      m.appendChild(el("div", { class: "h" }, esc(mtx.esquina || "Impacto ↓ / Prob →")));
      (mtx.prob_labels || []).forEach(function (lbl) { m.appendChild(el("div", { class: "h" }, esc(lbl))); });
      mtx.filas.forEach(function (fila) {
        m.appendChild(el("div", { class: "h" }, esc(fila.impacto)));
        (fila.celdas || []).forEach(function (c) {
          var cls = SE.MATRIZ_NIVEL_CLASS[c.nivel] || "";
          m.appendChild(el("div", { class: "cell " + cls }, c.texto ? esc(c.texto) : ""));
        });
      });
      pMtx.appendChild(m);
    }
    if (d.matriz_cita) pMtx.appendChild(cite(d.matriz_cita));
    grid.appendChild(pMtx);

    var pEsc = panel(d.escenarios_titulo || "Escenarios calibrados");
    (d.escenarios || []).forEach(function (e) { pEsc.appendChild(riskRow(e)); });
    grid.appendChild(pEsc);

    if (Array.isArray(d.vectores) && d.vectores.length) {
      var pVec = panel(d.vectores_titulo || "Respuesta estratégica integrada — vectores", "span2");
      var g4 = el("div", { class: "grid g4", style: "gap:14px" });
      d.vectores.forEach(function (v) {
        var cell = el("div");
        cell.appendChild(el("b", { class: "sans", style: "color:var(--accent);font-size:11px;letter-spacing:2px" }, esc(v.titulo)));
        cell.appendChild(el("p", { style: "margin-top:6px" }, esc(v.texto)));
        g4.appendChild(cell);
      });
      pVec.appendChild(g4);
      grid.appendChild(pVec);
    }
    section.appendChild(grid);
  }

  /* 10 — Referencias */
  function buildReferencias(section, d) {
    var box = el("div", { class: "refs" });
    box.appendChild(el("h3", null, esc(d.titulo || "Fuentes primarias y académicas")));
    var ol = el("ol");
    (d.items || []).forEach(function (it) { ol.appendChild(el("li", null, it || "")); });
    box.appendChild(ol);
    section.appendChild(box);
  }

  /* risk-row genérico (texto_html). */
  function riskRow(v) {
    var row = el("div", { class: "risk-row " + SE.nivelClass(v.nivel) });
    row.appendChild(el("div", { class: "tag" }, esc(v.tag)));
    row.appendChild(el("div", null, v.texto_html || ""));
    return row;
  }

  /* Despacho por id de sección. */
  function buildSectionBody(section, id, data) {
    switch (id) {
      case "resumen":        buildResumen(section, data.resumen); break;
      case "aperc":          buildAperc(section, data.aperc, data.meta || {}); break;
      case "matriz":         buildMatriz(section, data.matriz, data.meta || {}); break;
      case "sankey":         buildSankey(section, data.sankey); break;
      case "evolucion":      buildEvolucion(section, data.evolucion); break;
      case "infraestructura":buildInfra(section, data.infraestructura, data.meta || {}); break;
      case "geopolitica":    buildGeopolitica(section, data.geopolitica); break;
      case "militar":        buildMilitar(section, data.militar); break;
      case "politicas":      buildPoliticas(section, data.politicas); break;
      case "crisis":         buildCrisis(section, data.crisis); break;
      case "referencias":    buildReferencias(section, data.referencias); break;
    }
  }

  /* Título visible (h2) de cada sección, fiel a la referencia. */
  function sectionTitle(id, data) {
    var titulos = {
      resumen: "Resumen Ejecutivo",
      aperc: "Marco Analítico: las cuatro A's de APERC",
      matriz: "Matriz Energética",
      sankey: "Balance Energético — Diagrama de Sankey",
      evolucion: "Evolución Histórica y Sendero de Transición",
      infraestructura: "Infraestructura Crítica y Rutas Marítimas",
      geopolitica: "Geopolítica y Comparativa Internacional",
      militar: (data.militar && data.militar.titulo_seccion) || "Combustibles Militares y Rol Operacional",
      politicas: "Políticas e Instituciones",
      crisis: "Escenarios de Crisis y Matriz de Riesgo",
      referencias: "Referencias"
    };
    return esc(titulos[id] || id);
  }

  /* Fuente (.src) de la cabecera por sección, donde la haya en el JSON. */
  function sectionSrc(id, data) {
    var s = data[id] || {};
    if (id === "resumen") return "";
    return s.src || "";
  }

  /* ---- limpieza de estado previo ---------------------------------------- */

  function teardown() {
    LIVE.charts.forEach(function (c) { try { c.destroy(); } catch (e) {} });
    LIVE.charts = [];
    if (LIVE.map) { try { LIVE.map.remove(); } catch (e) {} LIVE.map = null; }
    if (LIVE.observer) { try { LIVE.observer.disconnect(); } catch (e) {} LIVE.observer = null; }
    if (LIVE.onScroll) { try { root.removeEventListener("scroll", LIVE.onScroll); } catch (e) {} LIVE.onScroll = null; }
    if (LIVE.mapTimer) { clearTimeout(LIVE.mapTimer); LIVE.mapTimer = null; }
  }

  /* ---- API pública ------------------------------------------------------ */

  function renderDashboard(rootEl, data) {
    if (!rootEl) return;
    if (!SE) { rootEl.innerHTML = "<div class='aviso'>Falta SE_ESQUEMA (schema.js).</div>"; return; }
    data = data || {};
    var meta = data.meta || {};

    teardown();
    setChartDefaults();
    rootEl.innerHTML = "";

    var layout = el("div", { class: "layout" });
    var aside = el("aside");
    var main = el("main");
    layout.appendChild(aside);
    layout.appendChild(main);

    /* ----- aside: brand + nav + side-foot ----- */
    var brand = el("div", { class: "brand" });
    brand.appendChild(el("div", { class: "country" }, esc(meta.subtitulo_pais || "")));
    brand.appendChild(el("div", { class: "title" }, esc(meta.pais || "")));
    var brandMeta = [meta.asignatura, meta.fecha].filter(Boolean).map(esc).join(" · ");
    brand.appendChild(el("div", { class: "meta" }, brandMeta));
    aside.appendChild(brand);

    var nav = el("nav", { id: "nav" });
    var navLinkById = {};
    SE.SECTIONS.forEach(function (sec, idx) {
      var label = sec.label;
      if (sec.id === "militar" && data.militar && data.militar.nav_label) label = data.militar.nav_label;
      var has = SE.sectionHasData(data, sec.id);
      var cls = [];
      if (idx === 0) cls.push("active");
      if (!has) cls.push("pendiente");
      var a = el("a", { href: "#sec-" + sec.id, class: cls.join(" ") });
      a.appendChild(el("span", { class: "num" }, esc(sec.num)));
      a.appendChild(document.createTextNode(" " + label));
      nav.appendChild(a);
      navLinkById[sec.id] = a;
    });
    aside.appendChild(nav);

    var foot = el("div", { class: "side-foot" });
    if (meta.portafolio_label) {
      var pf = el("span", null, meta.portafolio_label);
      foot.appendChild(pf);
      foot.appendChild(el("br"));
    }
    if (meta.cita_corta) {
      foot.appendChild(el("br"));
      foot.appendChild(document.createTextNode("Cita corta:"));
      foot.appendChild(el("br"));
      foot.appendChild(el("span", { style: "color:#dbe2ef" }, esc(meta.cita_corta)));
    }
    aside.appendChild(foot);

    /* ----- main: doc-header ----- */
    var header = el("div", { class: "doc-header" });
    header.appendChild(el("div", { class: "eyebrow" }, esc(meta.eyebrow || "")));
    header.appendChild(el("h1", null, meta.titulo || "")); // admite <br/>
    header.appendChild(el("div", { class: "sub" }, esc(meta.subtitulo || "")));
    var authorParts = [];
    if (meta.asignatura) authorParts.push("Asignatura: " + esc(meta.asignatura));
    if (meta.tipo_doc) authorParts.push(esc(meta.tipo_doc));
    if (meta.fecha) authorParts.push(esc(meta.fecha));
    var authors = authorParts.join(" · ");
    if (meta.estudiante) authors += (authors ? " · " : "") + "Estudiante: " + esc(meta.estudiante);
    header.appendChild(el("div", { class: "authors" }, authors));
    main.appendChild(header);

    /* ----- main: las 11 secciones, número fijo ----- */
    SE.SECTIONS.forEach(function (sec, idx) {
      var section = el("section", { id: "sec-" + sec.id });
      if (idx === 0) section.className = "visible";
      var has = SE.sectionHasData(data, sec.id);
      /* §00 Resumen: sin sec-head cuando hay datos (la caja .abstract es su
         cabecera, fiel a la referencia). El número 00 sigue presente en el nav. */
      if (!(sec.id === "resumen" && has)) {
        section.appendChild(secHead(sec.num, sectionTitle(sec.id, data), sectionSrc(sec.id, data)));
      }
      if (has) buildSectionBody(section, sec.id, data);
      else placeholder(section);
      main.appendChild(section);
    });

    main.appendChild(el("footer", null, esc(data.footer || "")));

    rootEl.appendChild(layout);

    /* ----- reveal + contadores + scroll-spy (idéntico a la referencia) ----- */
    var sections = rootEl.querySelectorAll("section");

    LIVE.observer = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          e.target.querySelectorAll("[data-c]").forEach(function (elc) {
            if (elc.dataset.done) return; elc.dataset.done = 1;
            var tgt = parseFloat(elc.dataset.c);
            var isF = elc.dataset.dec === "1" || (tgt % 1 !== 0);
            var start = performance.now(), dur = 1100;
            function tick(t) {
              var p = Math.min((t - start) / dur, 1);
              var v = tgt * (1 - Math.pow(1 - p, 3));
              var txt = isF ? v.toFixed(1) : Math.round(v).toLocaleString();
              elc.firstChild.nodeValue = txt;
              if (p < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
          });
        }
      });
    }, { threshold: 0.12 });
    sections.forEach(function (s) { LIVE.observer.observe(s); });

    var navLinks = rootEl.querySelectorAll("#nav a");
    navLinks.forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var target = rootEl.querySelector(a.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    });
    LIVE.onScroll = function () {
      var cur = SE.SECTIONS[0] ? ("sec-" + SE.SECTIONS[0].id) : null;
      sections.forEach(function (s) { if (root.scrollY + 180 >= s.offsetTop) cur = s.id; });
      navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + cur); });
    };
    root.addEventListener("scroll", LIVE.onScroll);
  }

  root.renderDashboard = renderDashboard;
})(typeof window !== "undefined" ? window : this);
