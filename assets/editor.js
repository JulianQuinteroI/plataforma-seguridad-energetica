/* ============================================================================
 * editor.js — Editor del estudiante (formulario ↔ JSON ↔ vista previa)
 *
 * Mantiene un objeto `modelo` (parte de SE_ESQUEMA.BLANK()) y construye el
 * formulario dinámicamente, agrupado por las SECTIONS canónicas más un bloque
 * "meta". Cada cambio (con debounce) actualiza `modelo`, re-renderiza la vista
 * previa con renderDashboard(#preview, modelo) y refresca la validación.
 *
 * Convención de campos:
 *   - claves terminadas en "_html" y las "citas"  → textarea, se insertan SIN
 *     escapar (el render las trata como HTML). Aquí solo las editamos en crudo.
 *   - el resto de strings  → input/textarea de texto plano.
 * Depende de window.SE_ESQUEMA y window.renderDashboard.
 * ==========================================================================*/
(function () {
  "use strict";

  var S = window.SE_ESQUEMA;
  if (!S) { console.error("editor.js: falta SE_ESQUEMA (assets/schema.js)."); return; }

  /* ---- estado --------------------------------------------------------- */
  var modelo = S.BLANK();
  var abiertas = {};            // id de sección/bloque → abierto?
  abiertas.meta = true;
  abiertas.resumen = true;
  abiertas.matriz = true;

  var $form = document.getElementById("ed-sections");
  var $val = document.getElementById("ed-validation");
  var $preview = document.getElementById("preview");

  /* ---- utilidades ----------------------------------------------------- */
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") n.className = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else if (k.slice(0, 2) === "on" && typeof attrs[k] === "function") n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c != null) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  function isHtmlKey(key) { return /_html$/.test(key) || /(^|_)cita(s)?$/.test(key) || key === "titulo" || key === "portafolio_label"; }
  function debounce(fn, ms) { var t; return function () { clearTimeout(t); t = setTimeout(fn, ms); }; }

  // Acceso por ruta "a.b.c" sobre `modelo`.
  function getPath(path) {
    var o = modelo, p = path.split(".");
    for (var i = 0; i < p.length && o != null; i++) o = o[p[i]];
    return o;
  }
  function setPath(path, val) {
    var o = modelo, p = path.split(".");
    for (var i = 0; i < p.length - 1; i++) {
      if (o[p[i]] == null || typeof o[p[i]] !== "object") o[p[i]] = {};
      o = o[p[i]];
    }
    o[p[p.length - 1]] = val;
  }

  var refrescar = debounce(function () { renderPreview(); renderValidation(); refreshFlags(); }, 300);

  /* ---- fábrica de campos primitivos ----------------------------------- */
  // Campo de texto plano / HTML / numérico ligado a una ruta del modelo.
  function fieldText(label, path, opts) {
    opts = opts || {};
    var cur = getPath(path);
    var key = path.split(".").pop();
    var multiline = opts.multiline || isHtmlKey(key);
    var control;
    if (multiline) {
      control = el("textarea", { rows: opts.rows || 3 });
      control.value = cur == null ? "" : String(cur);
      control.addEventListener("input", function () { setPath(path, control.value); refrescar(); });
    } else {
      control = el("input", { type: "text" });
      control.value = cur == null ? "" : String(cur);
      control.addEventListener("input", function () { setPath(path, control.value); refrescar(); });
    }
    var lab = el("label", {}, [opts.labelText || label]);
    if (opts.req) lab.appendChild(el("span", { class: "req", text: " *" }));
    if (isHtmlKey(key)) lab.appendChild(el("span", { class: "html-tag", text: "HTML" }));
    var wrap = el("div", { class: "fld" }, [lab, control]);
    if (opts.hint) wrap.appendChild(el("div", { class: "hint", text: opts.hint }));
    return wrap;
  }

  // Campo numérico (number|null) ligado a una ruta.
  function fieldNumber(label, path, opts) {
    opts = opts || {};
    var cur = getPath(path);
    var input = el("input", { type: "number", step: opts.step || "any" });
    input.value = (cur === null || cur === undefined || cur === "") ? "" : cur;
    input.addEventListener("input", function () {
      var v = input.value.trim();
      setPath(path, v === "" ? null : Number(v));
      refrescar();
    });
    var lab = el("label", {}, [opts.labelText || label]);
    if (opts.req) lab.appendChild(el("span", { class: "req", text: " *" }));
    var wrap = el("div", { class: "fld" }, [lab, input]);
    if (opts.hint) wrap.appendChild(el("div", { class: "hint", text: opts.hint }));
    return wrap;
  }

  // Selector de opciones.
  function fieldSelect(label, path, options, opts) {
    opts = opts || {};
    var cur = getPath(path);
    var sel = el("select", {});
    options.forEach(function (o) {
      var val = typeof o === "string" ? o : o.value;
      var txt = typeof o === "string" ? o : o.label;
      var op = el("option", { value: val, text: txt });
      if (String(val) === String(cur)) op.selected = true;
      sel.appendChild(op);
    });
    sel.addEventListener("change", function () { setPath(path, sel.value); refrescar(); });
    var wrap = el("div", { class: "fld" }, [el("label", {}, [opts.labelText || label]), sel]);
    if (opts.hint) wrap.appendChild(el("div", { class: "hint", text: opts.hint }));
    return wrap;
  }

  // Campo ligado directamente a obj[key] (para filas de listas, donde no hay ruta global).
  function bound(obj, key, label, opts) {
    opts = opts || {};
    var multiline = opts.multiline || isHtmlKey(key);
    var control;
    if (opts.type === "number") {
      control = el("input", { type: "number", step: opts.step || "any" });
      control.value = (obj[key] === null || obj[key] === undefined || obj[key] === "") ? "" : obj[key];
      control.addEventListener("input", function () {
        var v = control.value.trim(); obj[key] = (v === "" ? null : Number(v)); refrescar();
      });
    } else if (opts.type === "select") {
      control = el("select", {});
      (opts.options || []).forEach(function (o) {
        var val = typeof o === "string" ? o : o.value, txt = typeof o === "string" ? o : o.label;
        var op = el("option", { value: val, text: txt });
        if (String(val) === String(obj[key])) op.selected = true;
        control.appendChild(op);
      });
      control.addEventListener("change", function () { obj[key] = control.value; refrescar(); });
    } else if (opts.type === "checkbox") {
      control = el("input", { type: "checkbox" });
      control.checked = !!obj[key];
      control.addEventListener("change", function () { obj[key] = control.checked; refrescar(); });
    } else if (multiline) {
      control = el("textarea", { rows: opts.rows || 2 });
      control.value = obj[key] == null ? "" : String(obj[key]);
      control.addEventListener("input", function () { obj[key] = control.value; refrescar(); });
    } else {
      control = el("input", { type: "text" });
      control.value = obj[key] == null ? "" : String(obj[key]);
      control.addEventListener("input", function () { obj[key] = control.value; refrescar(); });
    }
    var lab = el("label", {}, [opts.labelText || label]);
    if (isHtmlKey(key)) lab.appendChild(el("span", { class: "html-tag", text: "HTML" }));
    var wrap = el("div", { class: "fld" }, [lab, control]);
    if (opts.hint) wrap.appendChild(el("div", { class: "hint", text: opts.hint }));
    return wrap;
  }

  /* ---- editor de listas (añadir / eliminar / reordenar) --------------- */
  // arr: array del modelo. blankRow: () => objeto nuevo. rowFields(row)=>[DOM].
  function listEditor(arr, blankRow, rowFields, opts) {
    opts = opts || {};
    var cont = el("div", { class: "lst" });

    function rebuild() {
      cont.innerHTML = "";
      arr.forEach(function (row, i) {
        var bar = el("div", { class: "row-bar" }, [
          el("span", { class: "row-idx", text: (opts.rowLabel ? opts.rowLabel(row, i) : "#" + (i + 1)) }),
          el("button", {
            class: "icon-btn", title: "Subir", text: "↑",
            onclick: function () { if (i > 0) { var t = arr[i - 1]; arr[i - 1] = arr[i]; arr[i] = t; rebuild(); refrescar(); } }
          }),
          el("button", {
            class: "icon-btn", title: "Bajar", text: "↓",
            onclick: function () { if (i < arr.length - 1) { var t = arr[i + 1]; arr[i + 1] = arr[i]; arr[i] = t; rebuild(); refrescar(); } }
          }),
          el("button", {
            class: "icon-btn del", title: "Eliminar", text: "✕ Eliminar",
            onclick: function () { arr.splice(i, 1); rebuild(); refrescar(); }
          })
        ]);
        var rowEl = el("div", { class: "lst-row" }, [bar]);
        rowFields(row, i).forEach(function (f) { if (f) rowEl.appendChild(f); });
        cont.appendChild(rowEl);
      });
    }
    rebuild();

    var add = el("button", {
      class: "add-btn", text: "+ " + (opts.addLabel || "Añadir fila"),
      onclick: function () { arr.push(blankRow()); rebuild(); refrescar(); }
    });
    return el("div", {}, [cont, add]);
  }

  // Editor de una lista de números paralela a una lista de etiquetas (para series.data).
  // Devuelve un contenedor estable que se re-pinta internamente al añadir/quitar valores.
  function dataRowEditor(dataArr, labels) {
    var holder = el("div", {});
    function rebuild() {
      holder.innerHTML = "";
      var grid = el("div", { class: "fgrid c3" });
      var n = Math.max(dataArr.length, (labels || []).length);
      for (var i = 0; i < n; i++) (function (idx) {
        var inp = el("input", { type: "number", step: "any" });
        inp.value = (dataArr[idx] === null || dataArr[idx] === undefined) ? "" : dataArr[idx];
        inp.addEventListener("input", function () {
          var v = inp.value.trim(); dataArr[idx] = (v === "" ? null : Number(v)); refrescar();
        });
        var lbl = (labels && labels[idx] != null) ? String(labels[idx]) : ("v" + (idx + 1));
        grid.appendChild(el("div", { class: "fld" }, [el("label", { text: lbl }), inp]));
      })(i);
      holder.appendChild(grid);
      holder.appendChild(el("div", { class: "row-bar", style: "margin-top:6px" }, [
        el("span", { class: "row-idx", text: "valores: " + dataArr.length }),
        el("button", { class: "icon-btn", text: "+ valor", onclick: function () { dataArr.push(null); rebuild(); refrescar(); } }),
        el("button", { class: "icon-btn del", text: "− último", onclick: function () { if (dataArr.length) dataArr.pop(); rebuild(); refrescar(); } })
      ]));
    }
    rebuild();
    return holder;
  }

  // Editor simple de una lista de strings (p. ej. anios, paises, ejes, referencias).
  function stringListEditor(arr, opts) {
    opts = opts || {};
    return listEditor(arr,
      function () { return ""; },
      function (row, i) {
        var inp = el(opts.multiline ? "textarea" : "input", opts.multiline ? { rows: 2 } : { type: "text" });
        inp.value = arr[i] == null ? "" : String(arr[i]);
        inp.addEventListener("input", function () { arr[i] = inp.value; refrescar(); });
        var lab = el("label", { text: opts.itemLabel || "Valor" });
        if (opts.html) lab.appendChild(el("span", { class: "html-tag", text: "HTML" }));
        return [el("div", { class: "fld" }, [lab, inp])];
      },
      { addLabel: opts.addLabel || "Añadir", rowLabel: function (r, i) { return "#" + (i + 1); } }
    );
  }

  /* ---- bloques de secciones ------------------------------------------- */
  function subgroup(title, children) {
    var g = el("div", { class: "subgrp" }, [el("div", { class: "subgrp-t", text: title })]);
    (children || []).forEach(function (c) { if (c) g.appendChild(c); });
    return g;
  }
  function row2() { var g = el("div", { class: "fgrid c2" }); for (var i = 0; i < arguments.length; i++) if (arguments[i]) g.appendChild(arguments[i]); return g; }

  function buildMeta() {
    var m = modelo.meta;
    if (!m.map_view) m.map_view = { lat: 20, lng: 0, zoom: 3 };
    var nodes = [
      row2(
        fieldText("País", "meta.pais", { req: true, hint: "Nombre del país en español." }),
        fieldText("ISO-3", "meta.pais_iso", { req: true, hint: "Código alpha-3 (AUS, COL, NOR). Determina el archivo y el mapa." })
      ),
      row2(
        fieldText("ISO-2", "meta.pais_iso2", { hint: "alpha-2 opcional (AU, CO)." }),
        fieldText("Subtítulo del país", "meta.subtitulo_pais", { hint: "Aparece sobre el nombre en la barra lateral (p. ej. \"Commonwealth of\")." })
      ),
      fieldText("Eyebrow", "meta.eyebrow", { hint: "Línea superior pequeña del encabezado." }),
      fieldText("Título principal", "meta.titulo", { multiline: true, rows: 2, hint: "Admite <br/>. Es el H1 del tablero." }),
      fieldText("Subtítulo", "meta.subtitulo", { multiline: true, rows: 2 }),
      row2(
        fieldText("Estudiante", "meta.estudiante", { hint: "Se muestra en el mapa al pasar el cursor." }),
        fieldText("Fuerzas Armadas", "meta.fuerzas_armadas", { hint: "Sigla (ADF, FF.MM.)." })
      ),
      row2(
        fieldText("Asignatura", "meta.asignatura"),
        fieldText("Tipo de documento", "meta.tipo_doc")
      ),
      row2(
        fieldText("Fecha", "meta.fecha"),
        fieldNumber("APERC global", "meta.aperc_global", { step: "0.1", hint: "0–10. Vacío = promedio de las 4 A's. Usa «Calcular APERC global»." })
      ),
      fieldText("Cita corta", "meta.cita_corta", { hint: "Pie de la barra lateral." }),
      fieldText("Etiqueta de portafolio", "meta.portafolio_label", { multiline: true, rows: 2, hint: "Admite <br/>." }),
      subgroup("Vista inicial del mapa (§05)", [
        el("div", { class: "fgrid c3" }, [
          fieldNumber("Latitud", "meta.map_view.lat", { step: "any" }),
          fieldNumber("Longitud", "meta.map_view.lng", { step: "any" }),
          fieldNumber("Zoom", "meta.map_view.zoom", { step: "any" })
        ])
      ])
    ];
    return el("div", {}, nodes);
  }

  function buildResumen() {
    var r = modelo.resumen;
    return el("div", {}, [
      fieldText("Tesis", "resumen.tesis_html", { multiline: true, rows: 4 }),
      fieldText("Conclusión", "resumen.conclusion_html", { multiline: true, rows: 4 }),
      subgroup("KPIs (cuadros de cifra grande)", [
        listEditor(r.kpis,
          function () { return { valor: null, unidad: "", etiqueta: "", decimal: false }; },
          function (k) {
            return [
              el("div", { class: "fgrid c2" }, [
                bound(k, "valor", "Valor", { type: "number" }),
                bound(k, "unidad", "Unidad")
              ]),
              bound(k, "etiqueta", "Etiqueta"),
              bound(k, "decimal", "¿Decimal?", { type: "checkbox" })
            ];
          },
          { addLabel: "Añadir KPI", rowLabel: function (k, i) { return (k.etiqueta || "KPI") + " #" + (i + 1); } }
        )
      ])
    ]);
  }

  function buildAperc() {
    var a = modelo.aperc;
    if (!a.comparador) a.comparador = { pais_b: "", pais_c: "" };
    return el("div", {}, [
      fieldText("Fuente (src)", "aperc.src"),
      fieldText("Definición operativa", "aperc.definicion_html", { multiline: true, rows: 5 }),
      fieldText("Cita de la definición", "aperc.definicion_cita", { multiline: true, rows: 2 }),
      fieldText("Título del scorecard", "aperc.scorecard_titulo"),
      subgroup("Scorecard — las 4 A's (fijas)", [
        el("div", { class: "hint", style: "margin-bottom:8px", text: "Cuatro dimensiones APERC. Edita la descripción y el puntaje 0–10 de cada una." }),
        listEditor(a.scores,
          function () { return { letra: "A", nombre: "", desc: "", score: null }; },
          function (s) {
            return [
              el("div", { class: "fgrid c2" }, [
                bound(s, "nombre", "Nombre (sin la A inicial)", { hint: "p. ej. vailability" }),
                bound(s, "score", "Puntaje (0–10)", { type: "number", step: "0.1" })
              ]),
              bound(s, "desc", "Descripción", { multiline: true })
            ];
          },
          { addLabel: "Añadir dimensión", rowLabel: function (s) { return "A" + (s.nombre || ""); } }
        )
      ]),
      fieldText("Cita del scorecard", "aperc.scorecard_cita", { multiline: true, rows: 2 }),
      subgroup("Países comparadores", [
        row2(
          fieldText("País B", "aperc.comparador.pais_b"),
          fieldText("País C", "aperc.comparador.pais_c")
        )
      ]),
      fieldText("Título de indicadores", "aperc.indicadores_titulo"),
      subgroup("Indicadores cuantitativos (tabla)", [
        listEditor(a.indicadores,
          function () { return { indicador: "", definicion: "", propio: "", b: "", c: "", interp: { texto: "", pill: "" } }; },
          function (it) {
            if (!it.interp) it.interp = { texto: "", pill: "" };
            return [
              bound(it, "indicador", "Indicador"),
              bound(it, "definicion", "Definición", { multiline: true }),
              el("div", { class: "fgrid c3" }, [
                bound(it, "propio", "Propio"),
                bound(it, "b", "País B"),
                bound(it, "c", "País C")
              ]),
              el("div", { class: "fgrid c2" }, [
                bound(it.interp, "texto", "Interpretación"),
                bound(it.interp, "pill", "Píldora", { type: "select", options: [{ value: "", label: "(ninguna)" }, "ok", "warn", "danger"] })
              ])
            ];
          },
          { addLabel: "Añadir indicador", rowLabel: function (it, i) { return (it.indicador || "Indicador") + " #" + (i + 1); } }
        )
      ]),
      fieldText("Nota de indicadores", "aperc.indicadores_nota", { multiline: true, rows: 2 })
    ]);
  }

  // Editor de una lista de segmentos {label, valor, color} (primaria / electrica).
  function segmentosEditor(arr) {
    return listEditor(arr,
      function () { return { label: "", valor: null, color: "" }; },
      function (seg) {
        return [
          el("div", { class: "fgrid c3" }, [
            bound(seg, "label", "Etiqueta"),
            bound(seg, "valor", "Valor (%)", { type: "number", step: "any" }),
            bound(seg, "color", "Color", { hint: "#hex; vacío = paleta" })
          ])
        ];
      },
      { addLabel: "Añadir segmento", rowLabel: function (s, i) { return (s.label || "Segmento") + " #" + (i + 1); } }
    );
  }

  function buildMatriz() {
    var m = modelo.matriz;
    if (!m.comparativa) m.comparativa = { paises: [], series: [] };
    var cmp = m.comparativa;
    return el("div", {}, [
      el("div", { class: "ped-note", html: "<b>§02 es el corazón del análisis.</b> La matriz energética y su diversificación alimentan los indicadores HHI/Shannon (§01) y las dimensiones APERC. Diligénciala con cuidado." }),
      fieldText("Fuente (src)", "matriz.src"),
      fieldText("Título energía primaria", "matriz.primaria_titulo"),
      subgroup("Energía primaria (TPES, %)", [segmentosEditor(m.primaria)]),
      fieldText("Cita primaria", "matriz.primaria_cita", { multiline: true, rows: 2 }),
      fieldText("Título generación eléctrica", "matriz.electrica_titulo"),
      subgroup("Generación eléctrica (%)", [segmentosEditor(m.electrica)]),
      fieldText("Cita eléctrica", "matriz.electrica_cita", { multiline: true, rows: 2 }),
      fieldText("Título comparativa", "matriz.comparativa_titulo"),
      subgroup("Comparativa internacional — países", [
        el("div", { class: "hint", style: "margin-bottom:6px", text: "Orden de las columnas. Cada serie debe tener un valor por país." }),
        stringListEditor(cmp.paises, { addLabel: "Añadir país", itemLabel: "País" })
      ]),
      subgroup("Comparativa internacional — series (mix por país)", [
        listEditor(cmp.series,
          function () { return { label: "", data: cmp.paises.map(function () { return null; }), color: "" }; },
          function (s) {
            if (!Array.isArray(s.data)) s.data = [];
            return [
              el("div", { class: "fgrid c2" }, [
                bound(s, "label", "Etiqueta de serie"),
                bound(s, "color", "Color", { hint: "#hex opcional" })
              ]),
              el("div", { class: "fld" }, [el("label", { text: "Valores por país" }), dataRowEditor(s.data, cmp.paises)])
            ];
          },
          { addLabel: "Añadir serie", rowLabel: function (s, i) { return (s.label || "Serie") + " #" + (i + 1); } }
        )
      ]),
      fieldText("Nota comparativa", "matriz.comparativa_nota", { multiline: true, rows: 2 })
    ]);
  }

  function buildSankey() {
    var sk = modelo.sankey;
    return el("div", {}, [
      fieldText("Fuente (src)", "sankey.src"),
      fieldText("Título del panel", "sankey.titulo_panel"),
      subgroup("Flujos (origen → destino · magnitud)", [
        listEditor(sk.flujos,
          function () { return { from: "", to: "", flow: null }; },
          function (f) {
            return [
              el("div", { class: "fgrid c3" }, [
                bound(f, "from", "Origen"),
                bound(f, "to", "Destino"),
                bound(f, "flow", "Flujo", { type: "number", step: "any" })
              ])
            ];
          },
          { addLabel: "Añadir flujo", rowLabel: function (f, i) { return (f.from || "?") + " → " + (f.to || "?"); } }
        )
      ]),
      subgroup("Nodos (color y etiqueta visible) — opcional", [
        el("div", { class: "hint", style: "margin-bottom:6px", text: "Clave = nombre exacto del nodo usado en los flujos. Edita su etiqueta y color." }),
        nodosEditor(sk)
      ]),
      fieldText("Cita", "sankey.cita", { multiline: true, rows: 2 })
    ]);
  }

  // Editor del mapa sankey.nodos: { "Clave": {color,label} }. Lo manejamos como lista de pares.
  function nodosEditor(sk) {
    if (!sk.nodos || typeof sk.nodos !== "object") sk.nodos = {};
    var holder = el("div", {});
    function rebuild() {
      holder.innerHTML = "";
      var keys = Object.keys(sk.nodos);
      var cont = el("div", { class: "lst" });
      keys.forEach(function (k, i) {
        var node = sk.nodos[k] || {};
        var keyInput = el("input", { type: "text", value: k });
        keyInput.addEventListener("change", function () {
          var nk = keyInput.value;
          if (nk && nk !== k) { sk.nodos[nk] = sk.nodos[k]; delete sk.nodos[k]; rebuild(); }
          refrescar();
        });
        var bar = el("div", { class: "row-bar" }, [
          el("span", { class: "row-idx", text: k || "(nodo)" }),
          el("button", { class: "icon-btn del", text: "✕ Eliminar", onclick: function () { delete sk.nodos[k]; rebuild(); refrescar(); } })
        ]);
        var rowEl = el("div", { class: "lst-row" }, [
          bar,
          el("div", { class: "fld" }, [el("label", { text: "Clave (nombre del nodo)" }), keyInput]),
          el("div", { class: "fgrid c2" }, [
            bound(node, "label", "Etiqueta visible"),
            bound(node, "color", "Color", { hint: "#hex" })
          ])
        ]);
        cont.appendChild(rowEl);
      });
      holder.appendChild(cont);
      holder.appendChild(el("button", {
        class: "add-btn", text: "+ Añadir nodo",
        onclick: function () { var n = "Nodo " + (Object.keys(sk.nodos).length + 1); sk.nodos[n] = { color: "", label: "" }; rebuild(); refrescar(); }
      }));
    }
    rebuild();
    return holder;
  }

  function buildEvolucion() {
    var ev = modelo.evolucion;
    return el("div", {}, [
      fieldText("Fuente (src)", "evolucion.src"),
      fieldText("Título histórico", "evolucion.historico_titulo"),
      subgroup("Años (eje X)", [
        stringListEditor(ev.anios, { addLabel: "Añadir año", itemLabel: "Año" })
      ]),
      subgroup("Series (una por tecnología)", [
        listEditor(ev.series,
          function () { return { label: "", data: ev.anios.map(function () { return null; }), color: "" }; },
          function (s) {
            if (!Array.isArray(s.data)) s.data = [];
            return [
              el("div", { class: "fgrid c2" }, [bound(s, "label", "Etiqueta"), bound(s, "color", "Color", { hint: "#hex" })]),
              el("div", { class: "fld" }, [el("label", { text: "Valores por año" }), dataRowEditor(s.data, ev.anios)])
            ];
          },
          { addLabel: "Añadir serie", rowLabel: function (s, i) { return (s.label || "Serie") + " #" + (i + 1); } }
        )
      ]),
      fieldText("Cita histórico", "evolucion.historico_cita", { multiline: true, rows: 2 }),
      fieldText("Título de hitos", "evolucion.hitos_titulo"),
      subgroup("Hitos (línea de tiempo)", [
        listEditor(ev.hitos,
          function () { return { anio: "", evento: "" }; },
          function (h) {
            return [el("div", { class: "fgrid c2" }, [bound(h, "anio", "Año/periodo")]), bound(h, "evento", "Evento", { multiline: true })];
          },
          { addLabel: "Añadir hito", rowLabel: function (h, i) { return (h.anio || "Hito") + ""; } }
        )
      ])
    ]);
  }

  // Editor de risk-rows {nivel, tag, texto_html} reutilizado en varias secciones.
  function riskRowsEditor(arr) {
    return listEditor(arr,
      function () { return { nivel: "med", tag: "", texto_html: "" }; },
      function (v) {
        return [
          el("div", { class: "fgrid c2" }, [
            bound(v, "nivel", "Nivel", { type: "select", options: [{ value: "high", label: "high (crítico)" }, { value: "med", label: "med (alto)" }, { value: "low", label: "low (medio)" }] }),
            bound(v, "tag", "Etiqueta corta", { hint: "CRÍT, ALTO, A, B…" })
          ]),
          bound(v, "texto_html", "Texto", { multiline: true, rows: 3 })
        ];
      },
      { addLabel: "Añadir fila", rowLabel: function (v, i) { return (v.tag || "Fila") + " #" + (i + 1); } }
    );
  }

  function buildInfra() {
    var inf = modelo.infraestructura;
    if (!inf.capacidad) inf.capacidad = { anios: [], y_titulo: "GW", series: [] };
    var cap = inf.capacidad;
    var tiposPin = ["refineria", "gnl", "almacenamiento", "minerales", "sloc", "otro"];
    return el("div", {}, [
      fieldText("Fuente (src)", "infraestructura.src"),
      fieldText("Título del mapa", "infraestructura.mapa_titulo"),
      subgroup("Pines del mapa", [
        listEditor(inf.pines,
          function () { return { lat: null, lng: null, tipo: "otro", nombre: "", desc: "" }; },
          function (p) {
            return [
              el("div", { class: "fgrid c3" }, [
                bound(p, "lat", "Lat", { type: "number", step: "any" }),
                bound(p, "lng", "Lng", { type: "number", step: "any" }),
                bound(p, "tipo", "Tipo", { type: "select", options: tiposPin })
              ]),
              bound(p, "nombre", "Nombre"),
              bound(p, "desc", "Descripción", { multiline: true })
            ];
          },
          { addLabel: "Añadir pin", rowLabel: function (p, i) { return (p.nombre || p.tipo || "Pin") + " #" + (i + 1); } }
        )
      ]),
      subgroup("Rutas SLOC (polilíneas)", [
        listEditor(inf.rutas,
          function () { return { puntos: [], tooltip: "" }; },
          function (rt) {
            if (!Array.isArray(rt.puntos)) rt.puntos = [];
            return [
              bound(rt, "tooltip", "Tooltip"),
              el("div", { class: "fld" }, [el("label", { text: "Puntos [lat,lng] (uno por fila)" }), puntosEditor(rt.puntos)])
            ];
          },
          { addLabel: "Añadir ruta", rowLabel: function (rt, i) { return "Ruta #" + (i + 1); } }
        )
      ]),
      subgroup("Leyenda del mapa", [
        listEditor(inf.leyenda,
          function () { return { color: "", label: "" }; },
          function (lg) { return [el("div", { class: "fgrid c2" }, [bound(lg, "color", "Color", { hint: "#hex" }), bound(lg, "label", "Etiqueta")])]; },
          { addLabel: "Añadir ítem", rowLabel: function (lg, i) { return lg.label || ("Ítem #" + (i + 1)); } }
        )
      ]),
      fieldText("Cita del mapa", "infraestructura.mapa_cita", { multiline: true, rows: 2 }),
      fieldText("Título de vulnerabilidades", "infraestructura.vulnerabilidades_titulo"),
      subgroup("Vulnerabilidades técnicas", [riskRowsEditor(inf.vulnerabilidades)]),
      fieldText("Título de capacidad", "infraestructura.capacidad_titulo"),
      subgroup("Capacidad vs demanda (barras + línea)", [
        fieldText("Título eje Y", "infraestructura.capacidad.y_titulo"),
        el("div", { class: "subgrp-t", text: "Años (eje X)" }),
        stringListEditor(cap.anios, { addLabel: "Añadir año", itemLabel: "Año" }),
        el("div", { class: "subgrp-t", style: "margin-top:10px", text: "Series" }),
        listEditor(cap.series,
          function () { return { label: "", tipo: "bar", data: cap.anios.map(function () { return null; }), color: "" }; },
          function (s) {
            if (!Array.isArray(s.data)) s.data = [];
            return [
              el("div", { class: "fgrid c3" }, [
                bound(s, "label", "Etiqueta"),
                bound(s, "tipo", "Tipo", { type: "select", options: [{ value: "bar", label: "Barra" }, { value: "line", label: "Línea" }] }),
                bound(s, "color", "Color", { hint: "#hex" })
              ]),
              el("div", { class: "fld" }, [el("label", { text: "Valores por año" }), dataRowEditor(s.data, cap.anios)])
            ];
          },
          { addLabel: "Añadir serie", rowLabel: function (s, i) { return (s.label || "Serie") + " #" + (i + 1); } }
        )
      ]),
      fieldText("Cita de capacidad", "infraestructura.capacidad_cita", { multiline: true, rows: 2 })
    ]);
  }

  // Editor de puntos [lat,lng] (array de pares numéricos).
  function puntosEditor(pts) {
    var holder = el("div", {});
    function rebuild() {
      holder.innerHTML = "";
      var cont = el("div", { class: "lst" });
      pts.forEach(function (pt, i) {
        if (!Array.isArray(pt)) { pt = [null, null]; pts[i] = pt; }
        var latI = el("input", { type: "number", step: "any", placeholder: "lat" });
        latI.value = pt[0] == null ? "" : pt[0];
        latI.addEventListener("input", function () { var v = latI.value.trim(); pt[0] = (v === "" ? null : Number(v)); refrescar(); });
        var lngI = el("input", { type: "number", step: "any", placeholder: "lng" });
        lngI.value = pt[1] == null ? "" : pt[1];
        lngI.addEventListener("input", function () { var v = lngI.value.trim(); pt[1] = (v === "" ? null : Number(v)); refrescar(); });
        var del = el("button", { class: "icon-btn del", text: "✕", onclick: function () { pts.splice(i, 1); rebuild(); refrescar(); } });
        cont.appendChild(el("div", { class: "fgrid c3", style: "margin-bottom:5px;align-items:end" }, [
          el("div", { class: "fld", style: "margin:0" }, [el("label", { text: "lat #" + (i + 1) }), latI]),
          el("div", { class: "fld", style: "margin:0" }, [el("label", { text: "lng" }), lngI]),
          el("div", { class: "fld", style: "margin:0" }, [el("label", { text: " " }), del])
        ]));
      });
      holder.appendChild(cont);
      holder.appendChild(el("button", { class: "add-btn", text: "+ Punto", onclick: function () { pts.push([null, null]); rebuild(); refrescar(); } }));
    }
    rebuild();
    return holder;
  }

  function buildGeo() {
    var g = modelo.geopolitica;
    if (!g.radar) g.radar = { ejes: [], series: [] };
    var rd = g.radar;
    return el("div", {}, [
      fieldText("Fuente (src)", "geopolitica.src"),
      fieldText("Título del radar", "geopolitica.radar_titulo"),
      subgroup("Radar — ejes", [
        stringListEditor(rd.ejes, { addLabel: "Añadir eje", itemLabel: "Eje" })
      ]),
      subgroup("Radar — series (una por país)", [
        listEditor(rd.series,
          function () { return { label: "", data: rd.ejes.map(function () { return null; }), color: "" }; },
          function (s) {
            if (!Array.isArray(s.data)) s.data = [];
            return [
              el("div", { class: "fgrid c2" }, [bound(s, "label", "País/serie"), bound(s, "color", "Color", { hint: "#hex" })]),
              el("div", { class: "fld" }, [el("label", { text: "Valores por eje (0–10)" }), dataRowEditor(s.data, rd.ejes)])
            ];
          },
          { addLabel: "Añadir serie", rowLabel: function (s, i) { return (s.label || "Serie") + " #" + (i + 1); } }
        )
      ]),
      fieldText("Cita del radar", "geopolitica.radar_cita", { multiline: true, rows: 2 }),
      fieldText("Título de dependencias", "geopolitica.dependencias_titulo"),
      subgroup("Dependencias y socios (tabla)", [
        listEditor(g.dependencias,
          function () { return { vinculo: "", pct: "", riesgo: { texto: "", pill: "" } }; },
          function (d) {
            if (!d.riesgo) d.riesgo = { texto: "", pill: "" };
            return [
              el("div", { class: "fgrid c2" }, [bound(d, "vinculo", "Vínculo"), bound(d, "pct", "% Comercio")]),
              el("div", { class: "fgrid c2" }, [
                bound(d.riesgo, "texto", "Riesgo (texto)"),
                bound(d.riesgo, "pill", "Píldora", { type: "select", options: [{ value: "", label: "(ninguna)" }, "ok", "warn", "danger"] })
              ])
            ];
          },
          { addLabel: "Añadir dependencia", rowLabel: function (d, i) { return (d.vinculo || "Vínculo") + " #" + (i + 1); } }
        )
      ]),
      fieldText("Cita de dependencias", "geopolitica.dependencias_cita", { multiline: true, rows: 2 }),
      fieldText("Título de minerales", "geopolitica.minerales_titulo"),
      subgroup("Minerales críticos (cifras)", [
        listEditor(g.minerales,
          function () { return { valor: "", unidad: "", etiqueta: "" }; },
          function (mn) {
            return [el("div", { class: "fgrid c3" }, [bound(mn, "valor", "Valor"), bound(mn, "unidad", "Unidad"), bound(mn, "etiqueta", "Etiqueta")])];
          },
          { addLabel: "Añadir mineral", rowLabel: function (mn, i) { return (mn.etiqueta || "Mineral") + " #" + (i + 1); } }
        )
      ]),
      fieldText("Cita de minerales", "geopolitica.minerales_cita", { multiline: true, rows: 2 })
    ]);
  }

  function buildMilitar() {
    var mil = modelo.militar;
    return el("div", {}, [
      fieldText("Título de la sección", "militar.titulo_seccion"),
      fieldText("Etiqueta de navegación", "militar.nav_label", { hint: "Texto del enlace en la barra lateral (§07)." }),
      fieldText("Fuente (src)", "militar.src"),
      fieldText("Título de combustibles", "militar.combustibles_titulo"),
      subgroup("Combustibles (tabla)", [
        listEditor(mil.combustibles,
          function () { return { codigo: "", tipo: "", usuario: "", ml_anio: "" }; },
          function (c) {
            return [
              el("div", { class: "fgrid c2" }, [bound(c, "codigo", "Código"), bound(c, "ml_anio", "~ML/año")]),
              el("div", { class: "fgrid c2" }, [bound(c, "tipo", "Tipo"), bound(c, "usuario", "Usuario")])
            ];
          },
          { addLabel: "Añadir combustible", rowLabel: function (c, i) { return c.codigo || ("Fila #" + (i + 1)); } }
        )
      ]),
      fieldText("Total de combustibles", "militar.combustibles_total"),
      fieldText("Cita de combustibles", "militar.combustibles_cita", { multiline: true, rows: 2 }),
      fieldText("Título de vulnerabilidades", "militar.vulnerabilidades_titulo"),
      subgroup("Vulnerabilidades de defensa", [riskRowsEditor(mil.vulnerabilidades)]),
      fieldText("Título de misión", "militar.mision_titulo"),
      subgroup("Misión de las FF.MM. (tarjetas)", [
        listEditor(mil.mision,
          function () { return { titulo: "", texto_html: "" }; },
          function (ms) { return [bound(ms, "titulo", "Título"), bound(ms, "texto_html", "Texto", { multiline: true, rows: 3 })]; },
          { addLabel: "Añadir tarjeta", rowLabel: function (ms, i) { return ms.titulo || ("Tarjeta #" + (i + 1)); } }
        )
      ]),
      fieldText("Cita de misión", "militar.mision_cita", { multiline: true, rows: 2 })
    ]);
  }

  function buildPoliticas() {
    var p = modelo.politicas;
    return el("div", {}, [
      fieldText("Fuente (src)", "politicas.src"),
      fieldText("Título de planes", "politicas.planes_titulo"),
      subgroup("Planes nacionales", [
        listEditor(p.planes,
          function () { return { nombre: "", texto: "" }; },
          function (pl) { return [bound(pl, "nombre", "Nombre"), bound(pl, "texto", "Texto", { multiline: true })]; },
          { addLabel: "Añadir plan", rowLabel: function (pl, i) { return pl.nombre || ("Plan #" + (i + 1)); } }
        )
      ]),
      fieldText("Título de instituciones", "politicas.instituciones_titulo"),
      subgroup("Instituciones clave", [
        listEditor(p.instituciones,
          function () { return { sigla: "", texto: "" }; },
          function (ins) { return [bound(ins, "sigla", "Sigla"), bound(ins, "texto", "Texto", { multiline: true })]; },
          { addLabel: "Añadir institución", rowLabel: function (ins, i) { return ins.sigla || ("Inst. #" + (i + 1)); } }
        )
      ]),
      fieldText("Título de transición", "politicas.transicion_titulo"),
      fieldText("Transición justa", "politicas.transicion_html", { multiline: true, rows: 4 }),
      fieldText("Cita de transición", "politicas.transicion_cita", { multiline: true, rows: 2 })
    ]);
  }

  function buildCrisis() {
    var c = modelo.crisis;
    if (!c.matriz) c.matriz = { esquina: "", prob_labels: [], filas: [] };
    var mtz = c.matriz;
    return el("div", {}, [
      fieldText("Fuente (src)", "crisis.src"),
      fieldText("Título de la matriz", "crisis.matriz_titulo"),
      subgroup("Matriz Probabilidad × Impacto", [
        fieldText("Etiqueta esquina", "crisis.matriz.esquina"),
        el("div", { class: "subgrp-t", text: "Etiquetas de probabilidad (columnas)" }),
        stringListEditor(mtz.prob_labels, { addLabel: "Añadir columna", itemLabel: "Prob." }),
        el("div", { class: "subgrp-t", style: "margin-top:10px", text: "Filas (impacto → celdas)" }),
        listEditor(mtz.filas,
          function () { return { impacto: "", celdas: mtz.prob_labels.map(function () { return { nivel: 1, texto: "" }; }) }; },
          function (fila) {
            if (!Array.isArray(fila.celdas)) fila.celdas = [];
            var celdasUI = el("div", {});
            fila.celdas.forEach(function (cel, ci) {
              if (!cel || typeof cel !== "object") { cel = { nivel: 1 }; fila.celdas[ci] = cel; }
              celdasUI.appendChild(el("div", { class: "fgrid c2", style: "margin-bottom:5px" }, [
                bound(cel, "nivel", "Nivel " + (ci + 1) + " (1–5)", { type: "number", step: "1" }),
                bound(cel, "texto", "Texto celda")
              ]));
            });
            var barra = el("div", { class: "row-bar", style: "margin-top:4px" }, [
              el("span", { class: "row-idx", text: "celdas: " + fila.celdas.length }),
              el("button", { class: "icon-btn", text: "+ celda", onclick: function () { fila.celdas.push({ nivel: 1, texto: "" }); rebuildCrisis(); refrescar(); } }),
              el("button", { class: "icon-btn del", text: "− celda", onclick: function () { if (fila.celdas.length) fila.celdas.pop(); rebuildCrisis(); refrescar(); } })
            ]);
            return [bound(fila, "impacto", "Impacto (fila)"), el("div", { class: "fld" }, [el("label", { text: "Celdas (una por columna de probabilidad)" }), celdasUI, barra])];
          },
          { addLabel: "Añadir fila", rowLabel: function (f, i) { return f.impacto || ("Fila #" + (i + 1)); } }
        )
      ]),
      fieldText("Cita de la matriz", "crisis.matriz_cita", { multiline: true, rows: 2 }),
      fieldText("Título de escenarios", "crisis.escenarios_titulo"),
      subgroup("Escenarios calibrados", [riskRowsEditor(c.escenarios)]),
      fieldText("Título de vectores", "crisis.vectores_titulo"),
      subgroup("Vectores de respuesta", [
        listEditor(c.vectores,
          function () { return { titulo: "", texto: "" }; },
          function (v) { return [bound(v, "titulo", "Título"), bound(v, "texto", "Texto", { multiline: true })]; },
          { addLabel: "Añadir vector", rowLabel: function (v, i) { return v.titulo || ("Vector #" + (i + 1)); } }
        )
      ])
    ]);
  }

  function buildReferencias() {
    var r = modelo.referencias;
    return el("div", {}, [
      fieldText("Fuente (src)", "referencias.src"),
      fieldText("Título", "referencias.titulo"),
      subgroup("Items (una referencia por fila — admite HTML)", [
        stringListEditor(r.items, { addLabel: "Añadir referencia", itemLabel: "Referencia", multiline: true, html: true })
      ])
    ]);
  }

  function buildFooter() {
    return el("div", {}, [fieldText("Pie de página", "footer", { hint: "Texto del footer del tablero." })]);
  }

  /* ---- mapa de constructores ------------------------------------------ */
  var BUILDERS = {
    resumen: buildResumen, aperc: buildAperc, matriz: buildMatriz, sankey: buildSankey,
    evolucion: buildEvolucion, infraestructura: buildInfra, geopolitica: buildGeo,
    militar: buildMilitar, politicas: buildPoliticas, crisis: buildCrisis, referencias: buildReferencias
  };

  // Re-construye un acordeón concreto in situ (usado por la matriz de crisis al cambiar nº de celdas).
  function rebuildCrisis() { rebuildAcordeon("crisis"); }

  var accBodies = {}; // id → elemento .acc-body para reconstrucción puntual
  var accEls = {};    // id → elemento .acc

  function rebuildAcordeon(id) {
    var body = accBodies[id];
    if (!body) return;
    body.innerHTML = "";
    if (id === "meta") body.appendChild(buildMeta());
    else if (id === "footer") body.appendChild(buildFooter());
    else if (BUILDERS[id]) body.appendChild(BUILDERS[id]());
  }

  /* ---- construcción del formulario completo --------------------------- */
  function buildForm() {
    $form.innerHTML = "";
    accBodies = {}; accEls = {};

    // Bloque meta primero.
    $form.appendChild(makeAcc("meta", "—", "Metadatos del país", false));

    // Una sección por cada SECTION canónica.
    S.SECTIONS.forEach(function (sec) {
      var label = sec.label;
      if (sec.id === "militar" && modelo.militar && modelo.militar.nav_label) label = modelo.militar.nav_label;
      $form.appendChild(makeAcc(sec.id, sec.num, label, sec.req));
    });

    // Footer al final.
    $form.appendChild(makeAcc("footer", "—", "Pie de página", false));

    refreshFlags();
  }

  function makeAcc(id, num, label, req) {
    var open = !!abiertas[id];
    var flag;
    if (id === "meta" || id === "footer") flag = null;
    else flag = el("span", { class: "acc-flag " + (req ? "nucleo" : ""), text: req ? "Núcleo" : "" });

    var head = el("div", { class: "acc-head" }, [
      el("span", { class: "acc-num", text: num }),
      el("span", { class: "acc-label", text: label }),
      flag,
      el("span", { class: "acc-chev", text: "▾" })
    ]);
    var body = el("div", { class: "acc-body" });
    accBodies[id] = body;
    var acc = el("div", { class: "acc" + (open ? "" : " closed") }, [head, body]);
    accEls[id] = acc;

    head.addEventListener("click", function () {
      abiertas[id] = acc.classList.contains("closed");
      acc.classList.toggle("closed");
      // construcción perezosa: rellena el cuerpo la primera vez que se abre
      if (!acc.classList.contains("closed") && !body.firstChild) rebuildAcordeon(id);
    });

    if (open) rebuildAcordeon(id);
    return acc;
  }

  // Actualiza la píldora de estado (vacía/ok) de cada sección según sectionHasData.
  function refreshFlags() {
    S.SECTIONS.forEach(function (sec) {
      var acc = accEls[sec.id];
      if (!acc) return;
      var flag = acc.querySelector(".acc-flag");
      if (!flag) return;
      var has = S.sectionHasData(modelo, sec.id);
      flag.className = "acc-flag " + (has ? "ok" : (sec.req ? "vacia" : ""));
      flag.textContent = has ? "✓ Con datos" : (sec.req ? "Núcleo — vacía" : "Vacía");
      // refrescar etiqueta militar si cambió nav_label
      if (sec.id === "militar") {
        var lbl = acc.querySelector(".acc-label");
        if (lbl) lbl.textContent = (modelo.militar && modelo.militar.nav_label) || sec.label;
      }
    });
  }

  /* ---- vista previa --------------------------------------------------- */
  function renderPreview() {
    if (typeof window.renderDashboard !== "function") {
      $preview.innerHTML = '<div style="padding:30px;font-family:sans-serif;color:#c62828">No se encontró renderDashboard (assets/render.js).</div>';
      return;
    }
    try {
      window.renderDashboard($preview, modelo);
    } catch (e) {
      $preview.innerHTML = '<div style="padding:30px;font-family:sans-serif;color:#c62828">Error al renderizar la vista previa: ' + S.esc(e.message) + "</div>";
    }
  }

  /* ---- validación visible --------------------------------------------- */
  function renderValidation() {
    var r = S.validate(modelo);
    $val.innerHTML = "";
    if (r.errors.length) {
      $val.appendChild(el("div", { class: "vbox errs" }, [
        el("div", { class: "vtitle", text: "Errores (" + r.errors.length + ")" }),
        el("ul", {}, r.errors.map(function (m) { return el("li", { text: m }); }))
      ]));
    }
    if (r.warnings.length) {
      $val.appendChild(el("div", { class: "vbox warns" }, [
        el("div", { class: "vtitle", text: "Advertencias (" + r.warnings.length + ")" }),
        el("ul", {}, r.warnings.map(function (m) { return el("li", { text: m }); }))
      ]));
    }
    if (!r.errors.length && !r.warnings.length) {
      $val.appendChild(el("div", { class: "vbox ok" }, [
        el("div", { class: "vtitle", text: "Validación" }),
        el("div", { text: "Sin errores ni advertencias. Listo para exportar." })
      ]));
    }
  }

  /* ---- acciones de la barra superior ---------------------------------- */
  function nuevoPais() {
    if (!confirm("¿Descartar el contenido actual y empezar un país en blanco?")) return;
    modelo = S.BLANK();
    buildForm(); renderPreview(); renderValidation();
  }

  function cargarModelo(obj) {
    // Fusiona sobre BLANK para garantizar que todas las claves existan.
    var base = S.BLANK();
    modelo = deepMerge(base, obj);
    buildForm(); renderPreview(); renderValidation();
  }

  // Fusión profunda: el objeto importado manda; el base aporta claves faltantes.
  function deepMerge(base, over) {
    if (Array.isArray(over)) return over.slice();
    if (over && typeof over === "object") {
      var out = {};
      var keys = {};
      Object.keys(base || {}).forEach(function (k) { keys[k] = 1; });
      Object.keys(over).forEach(function (k) { keys[k] = 1; });
      Object.keys(keys).forEach(function (k) {
        if (over[k] === undefined) out[k] = base ? base[k] : undefined;
        else if (over[k] && typeof over[k] === "object" && !Array.isArray(over[k]) && base && typeof base[k] === "object" && !Array.isArray(base[k]))
          out[k] = deepMerge(base[k], over[k]);
        else out[k] = over[k];
      });
      return out;
    }
    return over;
  }

  function calcularAperc() {
    var v = S.apercGlobal(modelo);
    modelo.meta.aperc_global = v;
    buildForm(); renderPreview(); renderValidation();
    alert(v == null ? "No hay puntajes en las 4 A's para calcular el APERC global." : "APERC global fijado en " + v + " / 10.");
  }

  function vistaPreviaPais() {
    try {
      sessionStorage.setItem("se_preview", JSON.stringify(modelo));
      window.open("pais.html", "_blank");
    } catch (e) {
      alert("No se pudo abrir la vista previa: " + e.message);
    }
  }

  function exportar() {
    var iso = (modelo.meta && modelo.meta.pais_iso ? modelo.meta.pais_iso : "pais").toLowerCase().replace(/[^a-z]/g, "");
    if (!iso) iso = "pais";
    var json = JSON.stringify(modelo, null, 2);
    var blob = new Blob([json], { type: "application/json;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = el("a", { href: url, download: iso + ".json" });
    document.body.appendChild(a); a.click();
    setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 0);
  }

  /* ---- importación ---------------------------------------------------- */
  var importPane = document.getElementById("import-pane");
  var importText = document.getElementById("import-text");
  var importMsg = document.getElementById("import-msg");
  var fileInput = document.getElementById("file-importar");

  function toggleImport(open) {
    importPane.classList.toggle("open", open);
    importMsg.textContent = "";
    if (open) importText.focus();
  }
  // Extrae el objeto JSON de un texto que puede traer ``` o prosa alrededor.
  function limpiarJSON(str) {
    if (!str) return "";
    var s = String(str).trim();
    var fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fence) s = fence[1].trim();
    var a = s.indexOf("{"), b = s.lastIndexOf("}");
    if (a >= 0 && b > a) s = s.slice(a, b + 1);
    return s;
  }

  function parseImport(str) {
    try {
      var obj = JSON.parse(limpiarJSON(str));
      if (!obj || typeof obj !== "object") throw new Error("no es un objeto");
      cargarModelo(obj);
      toggleImport(false);
    } catch (e) {
      importMsg.textContent = "JSON inválido: " + e.message;
    }
  }

  /* ---- Asistente IA: PDF → prompt → JSON ------------------------------ */
  var iaPane = document.getElementById("ia-pane");
  var iaFile = document.getElementById("ia-file");
  var iaStatus = document.getElementById("ia-status");
  var iaPrompt = document.getElementById("ia-prompt");
  var iaResponse = document.getElementById("ia-response");
  var iaMsg = document.getElementById("ia-msg");
  var iaCopyMsg = document.getElementById("ia-copy-msg");

  // Guía de forma para la IA: un elemento de ejemplo por lista, con los nombres
  // de clave EXACTOS del esquema y pistas de valores admitidos.
  var EJEMPLO = {
    schema_version: "1.0.0",
    meta: {
      pais: "Nombre del país", pais_iso: "ISO3", pais_iso2: "I2",
      subtitulo_pais: "República de… / Reino de…", eyebrow: "Portafolio · Seguridad Energética por País",
      titulo: "Seguridad Energética de <País>: diagnóstico, vulnerabilidades y rol de las FF.MM.",
      subtitulo: "Resumen en una línea bajo el marco APERC.",
      estudiante: "Nombre del estudiante", asignatura: "Logística Militar · Rúbrica Slide18",
      tipo_doc: "Documento de sustentación", fecha: "Mes Año",
      fuerzas_armadas: "FF.MM.", aperc_global: null,
      cita_corta: "Autor, Año; Autor, Año.", portafolio_label: "Rúbrica Slide18<br/>Logística Militar",
      map_view: { lat: 0, lng: 0, zoom: 4 }
    },
    resumen: {
      tesis_html: "Tesis central del país (admite <i> y <b>).",
      conclusion_html: "Conclusión clave en métricas APERC.",
      kpis: [{ valor: 0, unidad: "%", etiqueta: "Indicador", decimal: false }]
    },
    aperc: {
      src: "APERC 2007 · Cherp & Jewell 2014",
      definicion_html: "<p>Definición operativa de seguridad energética…</p>",
      definicion_cita: "Fuente de la definición.",
      scorecard_titulo: "Scorecard bajo APERC",
      scores: [
        { letra: "A", nombre: "vailability", desc: "Recursos físicos.", score: 0 },
        { letra: "A", nombre: "ccessibility", desc: "Geopolítica, rutas, refinación.", score: 0 },
        { letra: "A", nombre: "ffordability", desc: "Precios, pobreza energética.", score: 0 },
        { letra: "A", nombre: "cceptability", desc: "Huella de carbono, licencia social.", score: 0 }
      ],
      scorecard_cita: "Scores propios sobre indicadores normalizados.",
      comparador: { pais_b: "País B", pais_c: "País C" },
      indicadores_titulo: "Indicadores cuantitativos aplicados",
      indicadores: [{ indicador: "HHI mix primario", definicion: "Concentración 0–10 000", propio: "0", b: "0", c: "0", interp: { texto: "Interpretación", pill: null } }],
      indicadores_nota: "Notas metodológicas y fuentes."
    },
    matriz: {
      src: "IEA · fuente nacional",
      primaria_titulo: "Energía Primaria (TPES, %)",
      primaria: [{ label: "Petróleo", valor: 0, color: "#c4570e" }],
      primaria_cita: "Fuente del mix primario.",
      electrica_titulo: "Generación Eléctrica (%)",
      electrica: [{ label: "Carbón", valor: 0, color: "#8a4a4a" }],
      electrica_cita: "Fuente del mix eléctrico.",
      comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
      comparativa: { paises: ["País", "País B", "País C"], series: [{ label: "Carbón", data: [0, 0, 0], color: "#8a4a4a" }] },
      comparativa_nota: "Eje normativo de la comparación."
    },
    sankey: {
      src: "Producción → Transformación → Uso final",
      titulo_panel: "Flujos físicos de energía (PJ aprox.)",
      flujos: [{ from: "Nodo origen", to: "Nodo destino", flow: 0 }],
      nodos: { "Nodo origen": { color: "#0b5394", label: "Etiqueta visible" } },
      cita: "Fuente y lectura del balance."
    },
    evolucion: {
      src: "2000–2050",
      historico_titulo: "Mix Eléctrico Histórico y Proyectado (%)",
      anios: ["2000", "2010", "2020", "2030", "2040", "2050"],
      series: [{ label: "Carbón", data: [0, 0, 0, 0, 0, 0], color: "#8a4a4a" }],
      historico_cita: "Fuente de la trayectoria.",
      hitos_titulo: "Hitos del Régimen Energético",
      hitos: [{ anio: "AAAA", evento: "Hecho relevante." }]
    },
    infraestructura: {
      src: "Mapa Leaflet · OSM",
      mapa_titulo: "Nodos energéticos y rutas",
      pines: [{ lat: 0, lng: 0, tipo: "refineria", nombre: "Nombre del nodo", desc: "Descripción · operador" }],
      rutas: [{ puntos: [[0, 0], [0, 0]], tooltip: "Ruta / SLOC" }],
      leyenda: [{ color: "#c4570e", label: "Refinerías" }],
      mapa_cita: "Fuentes de coordenadas e infraestructura.",
      vulnerabilidades_titulo: "Vulnerabilidades técnicas",
      vulnerabilidades: [{ nivel: "high", tag: "CRÍT", texto_html: "<b>Tema</b> · descripción de la vulnerabilidad." }],
      capacidad_titulo: "Capacidad vs Demanda (GW)",
      capacidad: { anios: ["2024", "2030", "2040"], y_titulo: "GW", series: [{ label: "Renovables (GW)", tipo: "bar", data: [0, 0, 0], color: "#2e7d32" }, { label: "Demanda pico (GW)", tipo: "line", data: [0, 0, 0], color: "#c4570e" }] },
      capacidad_cita: "Fuente de capacidad/demanda."
    },
    geopolitica: {
      src: "Radar APERC normalizado",
      radar_titulo: "Radar APERC comparativo",
      radar: { ejes: ["Availability", "Accessibility", "Affordability", "Acceptability", "Sovereignty", "Robustness", "Resilience"], series: [{ label: "País", data: [0, 0, 0, 0, 0, 0, 0], color: "#0b5394" }] },
      radar_cita: "Normalización y fuente.",
      dependencias_titulo: "Dependencias y socios",
      dependencias: [{ vinculo: "Exportación X a País", pct: "0", riesgo: { texto: "Lectura del riesgo", pill: "warn" } }],
      dependencias_cita: "Fuente comercial.",
      minerales_titulo: "Minerales críticos",
      minerales: [{ valor: "0", unidad: "%", etiqueta: "RECURSO" }],
      minerales_cita: "Fuente de minerales."
    },
    militar: {
      titulo_seccion: "Combustibles Militares y Rol Operacional de las FF.MM.",
      nav_label: "Combustibles militares",
      src: "Fuente de defensa",
      combustibles_titulo: "Demanda de combustibles de las FF.MM.",
      combustibles: [{ codigo: "F-XX", tipo: "Tipo de combustible", usuario: "Fuerza/usuario", ml_anio: "0" }],
      combustibles_total: "~0",
      combustibles_cita: "Fuente de la demanda de combustibles.",
      vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa",
      vulnerabilidades: [{ nivel: "high", tag: "CRÍT", texto_html: "<b>Tema</b> · vulnerabilidad de defensa." }],
      mision_titulo: "Misión de las FF.MM. en Seguridad Energética",
      mision: [{ titulo: "PROTECCIÓN DE INFRAESTRUCTURA", texto_html: "Descripción del rol operacional." }],
      mision_cita: "Fuentes de doctrina/defensa."
    },
    politicas: {
      src: "Ministerio / operador del sistema",
      planes_titulo: "Planes nacionales",
      planes: [{ nombre: "Plan o Ley (Año)", texto: "Qué establece." }],
      instituciones_titulo: "Instituciones clave",
      instituciones: [{ sigla: "SIGLA", texto: "Rol de la institución (admite <b>)." }],
      transicion_titulo: "Transición justa",
      transicion_html: "<p>Empleos, regiones y tensiones de la transición.</p>",
      transicion_cita: "Fuente de política."
    },
    crisis: {
      src: "Wargaming · Cone of Plausibility",
      matriz_titulo: "Matriz Probabilidad × Impacto",
      matriz: { esquina: "Impacto ↓ / Prob →", prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"], filas: [{ impacto: "Catastrófico", celdas: [{ nivel: 3 }, { nivel: 4 }, { nivel: 5, texto: "Escenario" }, { nivel: 5 }, { nivel: 5 }] }] },
      matriz_cita: "Escala y calibración.",
      escenarios_titulo: "Escenarios calibrados",
      escenarios: [{ nivel: "high", tag: "A", texto_html: "<b>Escenario</b> — descripción. <i>Respuesta:</i> medida." }],
      vectores_titulo: "Respuesta estratégica integrada — vectores",
      vectores: [{ titulo: "DIVERSIFICACIÓN", texto: "Descripción del vector." }]
    },
    referencias: { src: "Triangulación multi-fuente", titulo: "Fuentes primarias y académicas", items: ["Autor (Año). <i>Título</i>. Editorial."] },
    footer: "Documento de sustentación · Logística Militar"
  };

  function construirPromptIA(texto) {
    var cap = 120000;
    var t = texto.length > cap ? texto.slice(0, cap) + "\n…[texto truncado por longitud]" : texto;
    return [
      "Eres un asistente experto en seguridad energética. Convierte el PAPER de abajo al formato JSON EXACTO de una plataforma educativa que usa el marco APERC (las 4 A's).",
      "",
      "DEVUELVE ÚNICAMENTE un objeto JSON válido — sin texto antes/después y sin ``` — con EXACTAMENTE estas claves y esta forma (hay un elemento de ejemplo por cada lista):",
      "",
      JSON.stringify(EJEMPLO, null, 2),
      "",
      "REGLAS:",
      "- meta.pais_iso = código ISO 3166-1 alpha-3 (AUS, COL, NOR…); meta.pais_iso2 = alpha-2.",
      "- Rellena SOLO lo que el paper sustente. Usa \"\", null o [] donde no haya información (p. ej. coordenadas lat/lng de los pines, flujos del Sankey, cifras ausentes): el estudiante las completará después en el editor.",
      "- NO inventes coordenadas ni cifras que no estén en el texto. Si necesitas inferir algo no explícito, antepón \"[inferido] \" al texto para que el estudiante lo verifique.",
      "- Cada mix (matriz.primaria y matriz.electrica) debería sumar ~100. Las 4 A's (aperc.scores[].score) van de 0 a 10.",
      "- Conserva EXACTAMENTE los nombres de clave del ejemplo; no agregues claves nuevas. Los campos cuyo nombre termina en _html admiten <i>, <b> y <br/>.",
      "- Valores admitidos: pin.tipo ∈ {refineria, gnl, almacenamiento, minerales, sloc}; nivel de riesgo ∈ {high, med, low}; pill ∈ {ok, warn, danger} o null; nivel de celda de la matriz de crisis ∈ 1..5.",
      "",
      "PAPER (texto extraído del PDF):",
      "\"\"\"",
      t,
      "\"\"\""
    ].join("\n");
  }

  function extraerTextoPDF(file) {
    return new Promise(function (resolve, reject) {
      if (!window.pdfjsLib) { reject(new Error("pdf.js no está disponible (¿sin conexión?)")); return; }
      var rd = new FileReader();
      rd.onload = function () {
        window.pdfjsLib.getDocument({ data: new Uint8Array(rd.result) }).promise.then(function (pdf) {
          var n = pdf.numPages, partes = [];
          var chain = Promise.resolve();
          for (var i = 1; i <= n; i++) {
            (function (p) {
              chain = chain.then(function () {
                return pdf.getPage(p).then(function (pg) { return pg.getTextContent(); }).then(function (tc) {
                  partes.push(tc.items.map(function (it) { return it.str; }).join(" "));
                });
              });
            })(i);
          }
          chain.then(function () { resolve({ text: partes.join("\n\n"), pages: n }); }).catch(reject);
        }).catch(reject);
      };
      rd.onerror = function () { reject(new Error("no se pudo leer el archivo")); };
      rd.readAsArrayBuffer(file);
    });
  }

  function toggleIA(open) {
    iaPane.classList.toggle("open", open);
    iaMsg.textContent = ""; iaCopyMsg.textContent = "";
    if (open) toggleImport(false);
  }

  document.getElementById("btn-ia").addEventListener("click", function () { toggleIA(!iaPane.classList.contains("open")); });
  document.getElementById("btn-ia-pdf").addEventListener("click", function () { iaFile.click(); });
  iaFile.addEventListener("change", function () {
    var f = iaFile.files && iaFile.files[0];
    iaFile.value = "";
    if (!f) return;
    iaStatus.style.color = "var(--ink-2)";
    iaStatus.textContent = "Extrayendo texto de «" + f.name + "»…";
    extraerTextoPDF(f).then(function (r) {
      if (!r.text.replace(/\s/g, "")) {
        iaStatus.style.color = "var(--warn)";
        iaStatus.textContent = "El PDF no trae texto seleccionable (¿es escaneado?). Usa un PDF con texto, o llena el formulario a mano.";
        return;
      }
      iaPrompt.value = construirPromptIA(r.text);
      iaStatus.style.color = "var(--ok)";
      iaStatus.textContent = r.pages + " página(s), " + r.text.length.toLocaleString() + " caracteres. Prompt listo abajo ↓";
    }).catch(function (e) {
      iaStatus.style.color = "var(--danger)";
      iaStatus.textContent = "No se pudo leer el PDF: " + e.message;
    });
  });
  document.getElementById("btn-ia-copy").addEventListener("click", function () {
    if (!iaPrompt.value) { iaCopyMsg.style.color = "var(--warn)"; iaCopyMsg.textContent = "Primero carga un PDF."; return; }
    var done = function () { iaCopyMsg.style.color = "var(--ok)"; iaCopyMsg.textContent = "¡Copiado! Pégalo en Claude."; };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(iaPrompt.value).then(done, function () { iaPrompt.select(); try { document.execCommand("copy"); } catch (e) {} done(); });
    } else { iaPrompt.select(); try { document.execCommand("copy"); } catch (e) {} done(); }
  });
  document.getElementById("btn-ia-load").addEventListener("click", function () {
    try {
      var obj = JSON.parse(limpiarJSON(iaResponse.value));
      if (!obj || typeof obj !== "object") throw new Error("no es un objeto");
      cargarModelo(obj);
      iaMsg.style.color = "var(--ok)";
      iaMsg.textContent = "Cargado. Revisa cada sección y completa lo que falte antes de exportar.";
    } catch (e) {
      iaMsg.style.color = "var(--danger)";
      iaMsg.textContent = "JSON inválido: " + e.message + ". Pega solo el objeto { … } que devolvió la IA.";
    }
  });
  document.getElementById("btn-ia-cancel").addEventListener("click", function () { toggleIA(false); });

  document.getElementById("btn-nuevo").addEventListener("click", nuevoPais);
  document.getElementById("btn-importar").addEventListener("click", function () { toggleImport(!importPane.classList.contains("open")); });
  document.getElementById("btn-import-cancel").addEventListener("click", function () { toggleImport(false); });
  document.getElementById("btn-import-apply").addEventListener("click", function () { parseImport(importText.value); });
  document.getElementById("btn-import-file").addEventListener("click", function () { fileInput.click(); });
  fileInput.addEventListener("change", function () {
    var f = fileInput.files && fileInput.files[0];
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function () { importText.value = rd.result; parseImport(rd.result); };
    rd.readAsText(f);
    fileInput.value = "";
  });
  document.getElementById("btn-aperc").addEventListener("click", calcularAperc);
  document.getElementById("btn-validar").addEventListener("click", function () { renderValidation(); });
  document.getElementById("btn-preview").addEventListener("click", vistaPreviaPais);
  document.getElementById("btn-exportar").addEventListener("click", exportar);

  /* ---- arranque ------------------------------------------------------- */
  buildForm();
  renderPreview();
  renderValidation();
})();
