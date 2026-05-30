/* ============================================================================
 * generar_paises.js — Genera los tableros JSON de países "precargados" y
 * reconstruye data/manifest.json a partir de TODO lo que haya en data/.
 *
 * Uso:   node generar_paises.js
 * Salida: data/<iso>.json (uno por país) + data/manifest.json
 * Cada país se valida con assets/schema.js (SE_ESQUEMA.validate).
 *
 * Datos realistas y plausibles (no necesariamente exactos). Colores estándar:
 *   petróleo #c4570e · carbón #8a4a4a · gas #0b5394 · solar #a17c1c
 *   eólica #6a8caf · hidro #2e7d32 · nuclear/otros #6b4e8e
 * ==========================================================================*/
const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname, 'data');
const S = require(path.join(__dirname, 'assets', 'schema.js'));

const PAISES = [];
function P(o) { PAISES.push(o); }

/* === ARABIA SAUDITA ===================================================== */
P({
  schema_version: "1.0.0",
  meta: {
    pais: "Arabia Saudita", pais_iso: "SAU", pais_iso2: "SA", subtitulo_pais: "Reino de",
    eyebrow: "Portafolio · Seguridad Energética por País",
    titulo: "Seguridad Energética de Arabia Saudita:<br/>renta del crudo, concentración y Visión 2030",
    subtitulo: "Mayor exportador mundial de petróleo y líder de la OPEP+: máxima disponibilidad de hidrocarburos frente a una severa monodependencia y baja aceptabilidad ambiental.",
    estudiante: "Cátedra (ejemplo de referencia)", asignatura: "Logística Militar · Rúbrica Slide18",
    tipo_doc: "Documento de sustentación", fecha: "Mayo 2026",
    fuerzas_armadas: "Fuerzas Armadas Reales Saudíes", aperc_global: 5.7,
    cita_corta: "IEA, 2024; Aramco, 2024; OPEP, 2024; APERC, 2007.",
    portafolio_label: "Rúbrica Slide18<br/>Logística Militar<br/>v2 — académica",
    map_view: { lat: 24, lng: 45, zoom: 5 }
  },
  resumen: {
    tesis_html: "Arabia Saudita encarna la <i>paradoja del rentista</i>: posee ~17% de las reservas mundiales de crudo y es el primer exportador, con disponibilidad y asequibilidad internas altísimas, pero su seguridad energética es frágil por <b>monodependencia</b> del petróleo (renta fiscal y mix), un nexo agua-energía intensivo (desalación) y nula diversificación histórica. La <b>Visión 2030</b> y NEOM impulsan solar y reducción del crudo quemado para electricidad.",
    conclusion_html: "En métricas APERC obtiene <b>5.7/10</b>: lidera en <i>availability</i> pero se hunde en <i>acceptability</i> y diversificación. El rol militar es decisivo para proteger Abqaiq/Ras Tanura y los estrechos de Ormuz y Bab el-Mandeb tras los ataques de 2019.",
    kpis: [
      { valor: 17, unidad: "%", etiqueta: "Reservas mundiales de crudo" },
      { valor: 9.6, unidad: "Mb/d", etiqueta: "Producción de crudo", decimal: true },
      { valor: 99, unidad: "%", etiqueta: "Mix eléctrico fósil" },
      { valor: 62, unidad: "%", etiqueta: "Ingresos fiscales del petróleo" }
    ]
  },
  aperc: {
    src: "APERC 2007 · IEA 2024",
    definicion_html: "<p>Bajo el marco <b>APERC</b>, Arabia Saudita combina una <i>availability</i> sobresaliente (Ghawar, mayor campo del mundo) con una <i>acceptability</i> muy baja (alta intensidad de carbono, quema de crudo para electricidad y desalación).</p><p>La seguridad de demanda (compradores asiáticos) y la transición global son hoy su mayor riesgo estratégico de largo plazo.</p>",
    definicion_cita: "APERC (2007); IEA, Saudi Arabia Energy Profile 2024.",
    scorecard_titulo: "Scorecard de Arabia Saudita bajo APERC",
    scores: [
      { letra: "A", nombre: "vailability", desc: "Mayores reservas y producción de crudo; gas asociado.", score: 9.5 },
      { letra: "A", nombre: "ccessibility", desc: "Dependencia de Ormuz/Bab el-Mandeb; riesgo de ataques.", score: 4.5 },
      { letra: "A", nombre: "ffordability", desc: "Energía interna subsidiada y barata.", score: 6.3 },
      { letra: "A", nombre: "cceptability", desc: "Altísima intensidad de carbono; nula diversificación.", score: 2.5 }
    ],
    scorecard_cita: "Scores propios sobre indicadores normalizados.",
    comparador: { pais_b: "Noruega", pais_c: "Rusia" },
    indicadores_titulo: "Indicadores cuantitativos aplicados",
    indicadores: [
      { indicador: "HHI mix primario", definicion: "Concentración (0–10 000)", propio: "6 800", b: "3 600", c: "4 200", interp: { texto: "Altísima concentración", pill: "danger" } },
      { indicador: "Net Import Dep. (%)", definicion: "(Imp−Exp)/Consumo bruto", propio: "−320%", b: "−600%", c: "−85%", interp: { texto: "Gran exportador neto" } },
      { indicador: "Intensidad de carbono (gCO₂/kWh)", definicion: "Generación eléctrica", propio: "615", b: "26", c: "360", interp: { texto: "Muy alta", pill: "danger" } },
      { indicador: "Renovables en electricidad (%)", definicion: "Solar + eólica", propio: "2", b: "98", c: "20", interp: { texto: "Incipiente" } }
    ],
    indicadores_nota: "Comparación con Noruega (descarbonizada) y Rusia (otro gran exportador)."
  },
  matriz: {
    src: "IEA · Aramco 2024",
    primaria_titulo: "Energía Primaria (TPES, %)",
    primaria: [
      { label: "Petróleo", valor: 62, color: "#c4570e" },
      { label: "Gas natural", valor: 36, color: "#0b5394" },
      { label: "Renovables", valor: 2, color: "#a17c1c" }
    ],
    primaria_cita: "Petróleo 62 · Gas 36 · Renovables 2. <i>Fuente: IEA 2024.</i>",
    electrica_titulo: "Generación Eléctrica (%)",
    electrica: [
      { label: "Gas", valor: 60, color: "#0b5394" },
      { label: "Petróleo", valor: 38, color: "#c4570e" },
      { label: "Solar", valor: 2, color: "#a17c1c" }
    ],
    electrica_cita: "Gas 60 · Petróleo 38 · Solar 2. <i>Fuente: Ember 2024.</i>",
    comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
    comparativa: {
      paises: ["Arabia Saudita", "Noruega", "Rusia"],
      series: [
        { label: "Gas", data: [60, 1, 46], color: "#0b5394" },
        { label: "Petróleo", data: [38, 0, 1], color: "#c4570e" },
        { label: "Hidro", data: [0, 88, 18], color: "#2e7d32" },
        { label: "Nuclear", data: [0, 0, 20], color: "#6b4e8e" },
        { label: "Solar/Eólica", data: [2, 11, 1], color: "#a17c1c" },
        { label: "Carbón", data: [0, 0, 14], color: "#8a4a4a" }
      ]
    },
    comparativa_nota: "Arabia Saudita: único mix 100% fósil del trío."
  },
  sankey: {
    src: "Producción → Transformación → Uso final",
    titulo_panel: "Flujos físicos de energía, Arabia Saudita (PJ aprox.)",
    flujos: [
      { from: "Crudo (prod.)", to: "Exportación de crudo", flow: 13000 },
      { from: "Crudo (prod.)", to: "Refinación local", flow: 3500 },
      { from: "Gas natural (prod.)", to: "Generación eléctrica", flow: 2600 },
      { from: "Gas natural (prod.)", to: "Industria & desalación", flow: 1800 },
      { from: "Refinación local", to: "Combustibles refinados", flow: 3300 },
      { from: "Combustibles refinados", to: "Generación eléctrica", flow: 1400 },
      { from: "Combustibles refinados", to: "Transporte", flow: 1700 },
      { from: "Generación eléctrica", to: "Desalación de agua", flow: 1200 },
      { from: "Generación eléctrica", to: "Residencial (A/C)", flow: 1500 }
    ],
    nodos: {
      "Crudo (prod.)": { color: "#c4570e", label: "Crudo (producción)" },
      "Gas natural (prod.)": { color: "#0b5394", label: "Gas natural" },
      "Refinación local": { color: "#c4570e", label: "Refinerías" },
      "Combustibles refinados": { color: "#a17c1c", label: "Combustibles refinados" },
      "Generación eléctrica": { color: "#6b4e8e", label: "Generación eléctrica" },
      "Exportación de crudo": { color: "#8a4a4a", label: "EXPORT · Crudo" },
      "Industria & desalación": { color: "#4a5870", label: "Industria + Desalación" },
      "Desalación de agua": { color: "#0b5394", label: "Desalación" },
      "Residencial (A/C)": { color: "#4a5870", label: "Residencial (A/C)" },
      "Transporte": { color: "#c4570e", label: "Transporte" }
    },
    cita: "El nexo agua-energía: la desalación consume una fracción enorme de la electricidad. <i>Datos estilizados sobre IEA 2024.</i>"
  },
  evolucion: {
    src: "2000–2050 · Visión 2030",
    historico_titulo: "Mix Eléctrico Histórico y Proyectado (%)",
    anios: ["2000", "2010", "2020", "2024", "2030", "2040", "2050"],
    series: [
      { label: "Petróleo", data: [50, 48, 42, 38, 20, 8, 3], color: "#c4570e" },
      { label: "Gas", data: [50, 52, 57, 60, 58, 50, 37], color: "#0b5394" },
      { label: "Solar/Eólica", data: [0, 0, 1, 2, 22, 40, 55], color: "#a17c1c" },
      { label: "Nuclear", data: [0, 0, 0, 0, 0, 2, 5], color: "#6b4e8e" }
    ],
    historico_cita: "Meta Visión 2030: 50% renovables en electricidad y desplazar el crudo quemado.",
    hitos_titulo: "Hitos del Régimen Energético",
    hitos: [
      { anio: "1938", evento: "Descubrimiento de petróleo en Dammam." },
      { anio: "1960", evento: "Cofundación de la OPEP." },
      { anio: "1980", evento: "Nacionalización completa de Aramco." },
      { anio: "2016", evento: "Lanzamiento de Visión 2030; IPO parcial de Aramco (2019)." },
      { anio: "2019", evento: "Ataques con drones a Abqaiq/Khurais: -5% oferta mundial momentánea." },
      { anio: "2021", evento: "Saudi Green Initiative; meta net-zero 2060." },
      { anio: "2025", evento: "Plantas solares Sakaka y Sudair en operación; NEOM/Helios H₂ verde." }
    ]
  },
  infraestructura: {
    src: "Mapa Leaflet · GEM",
    mapa_titulo: "Campos, terminales y estrechos críticos",
    pines: [
      { lat: 25.4, lng: 49.6, tipo: "refineria", nombre: "Campo Ghawar", desc: "Mayor campo de petróleo del mundo (Aramco)" },
      { lat: 25.93, lng: 49.67, tipo: "refineria", nombre: "Abqaiq (Buqayq)", desc: "Mayor planta de procesamiento de crudo; atacada en 2019" },
      { lat: 26.64, lng: 50.16, tipo: "gnl", nombre: "Ras Tanura", desc: "Mayor terminal/refinería de exportación" },
      { lat: 24.09, lng: 38.06, tipo: "gnl", nombre: "Yanbu", desc: "Terminal y refinerías en el Mar Rojo" },
      { lat: 27.0, lng: 49.66, tipo: "refineria", nombre: "Jubail", desc: "Complejo industrial y petroquímico" },
      { lat: 29.9, lng: 40.2, tipo: "minerales", nombre: "Solar Sakaka", desc: "300 MW · primera fotovoltaica utility-scale" },
      { lat: 25.6, lng: 45.6, tipo: "minerales", nombre: "Solar Sudair", desc: "1.5 GW · una de las mayores del mundo" },
      { lat: 26.57, lng: 56.25, tipo: "sloc", nombre: "Estrecho de Ormuz", desc: "Paso de ~20% del petróleo mundial" },
      { lat: 12.6, lng: 43.3, tipo: "sloc", nombre: "Bab el-Mandeb", desc: "Ruta hacia el Mar Rojo y Suez" }
    ],
    rutas: [
      { puntos: [[26.64, 50.16], [26.57, 56.25], [22, 60], [10, 72]], tooltip: "SLOC: Golfo → Ormuz → Asia" },
      { puntos: [[24.09, 38.06], [12.6, 43.3], [20, 38], [30, 32.55]], tooltip: "SLOC: Yanbu → Bab el-Mandeb → Suez" }
    ],
    leyenda: [
      { color: "#c4570e", label: "Campos / refinerías" },
      { color: "#0b5394", label: "Terminales de exportación" },
      { color: "#a17c1c", label: "Solar (Visión 2030)" },
      { color: "#c62828", label: "Estrechos críticos" }
    ],
    mapa_cita: "Coordenadas reales de Ghawar, Abqaiq, Ras Tanura, Yanbu, Jubail, Sakaka y Sudair. <i>Fuentes: GEM 2024; Aramco.</i>",
    vulnerabilidades_titulo: "Vulnerabilidades técnicas",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Concentración física</b> · Abqaiq procesa una parte enorme del crudo: un solo punto de falla estratégico (ataque 2019)." },
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Estrecho de Ormuz</b> · la mayoría de las exportaciones pasa por un cuello de botella; el oleoducto Este-Oeste mitiga parcialmente." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Nexo agua-energía</b> · la desalación consume crudo/gas que compiten con la exportación." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Pico de demanda por A/C</b> · veranos extremos disparan el consumo eléctrico interno." }
    ],
    capacidad_titulo: "Capacidad vs Demanda (GW)",
    capacidad: {
      anios: ["2024", "2030", "2040", "2050"],
      y_titulo: "GW",
      series: [
        { label: "Fósil (GW)", tipo: "bar", data: [80, 78, 60, 35], color: "#8a4a4a" },
        { label: "Solar/Eólica (GW)", tipo: "bar", data: [3, 58, 120, 180], color: "#a17c1c" },
        { label: "Demanda pico (GW)", tipo: "line", data: [62, 75, 95, 120], color: "#c4570e" }
      ]
    },
    capacidad_cita: "Visión 2030: 130 GW renovables a 2030. <i>Fuente: KAPSARC; PIF.</i>"
  },
  geopolitica: {
    src: "Radar APERC normalizado",
    radar_titulo: "Radar APERC: Arabia Saudita vs Noruega vs Rusia",
    radar: {
      ejes: ["Availability", "Accessibility", "Affordability", "Acceptability", "Sovereignty", "Robustness", "Resilience"],
      series: [
        { label: "Arabia Saudita", data: [9.5, 4.5, 6.3, 2.5, 8.5, 6.5, 4.5], color: "#c4570e" },
        { label: "Noruega", data: [9.0, 8.5, 7.5, 9.5, 9.0, 9.0, 9.0], color: "#2e7d32" },
        { label: "Rusia", data: [9.0, 4.0, 7.0, 4.8, 8.5, 6.5, 5.5], color: "#0b5394" }
      ]
    },
    radar_cita: "Normalización min-max sobre indicadores §01.",
    dependencias_titulo: "Dependencias y socios",
    dependencias: [
      { vinculo: "Exportación crudo a China", pct: "25", riesgo: { texto: "Cliente clave", pill: "warn" } },
      { vinculo: "Exportación crudo a India/Japón/Corea", pct: "45", riesgo: { texto: "Asia dependiente", pill: "ok" } },
      { vinculo: "Coordinación OPEP+ con Rusia", pct: "—", riesgo: { texto: "Cártel de oferta", pill: "warn" } },
      { vinculo: "Seguridad con EE.UU.", pct: "—", riesgo: { texto: "Garante histórico", pill: "ok" } }
    ],
    dependencias_cita: "JODI; OPEP 2024.",
    minerales_titulo: "Posición energética global",
    minerales: [
      { valor: "#1", unidad: " mundial", etiqueta: "EXPORTADOR DE CRUDO" },
      { valor: "17", unidad: "%", etiqueta: "RESERVAS MUNDIALES" },
      { valor: "~12", unidad: " Mb/d", etiqueta: "CAPACIDAD INSTALADA" }
    ],
    minerales_cita: "OPEP Annual Statistical Bulletin 2024."
  },
  militar: {
    titulo_seccion: "Combustibles Militares y Rol Operacional de las Fuerzas Armadas Reales Saudíes",
    nav_label: "Combustibles militares",
    src: "SIPRI · Ministerio de Defensa KSA",
    combustibles_titulo: "Demanda de combustibles de las Fuerzas Armadas",
    combustibles: [
      { codigo: "F-34 (JP-8)", tipo: "Queroseno militar", usuario: "RSAF (aviación)", ml_anio: "650" },
      { codigo: "F-76", tipo: "Diésel naval", usuario: "Royal Saudi Navy", ml_anio: "180" },
      { codigo: "F-54", tipo: "Diésel terrestre", usuario: "RSLF (tierra)", ml_anio: "260" }
    ],
    combustibles_total: "~1090",
    combustibles_cita: "Estimación de orden de magnitud (presupuesto de defensa entre los mayores del mundo).",
    vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Defensa de infraestructura</b> · ataques con drones/misiles a instalaciones petroleras (Abqaiq 2019, ataques hutíes)." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Defensa antiaérea</b> · saturación de sistemas Patriot frente a enjambres de drones baratos." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Seguridad marítima</b> · protección de Ormuz y del Mar Rojo (ataques a buques)." }
    ],
    mision_titulo: "Misión en Seguridad Energética",
    mision: [
      { titulo: "PROTECCIÓN DE INSTALACIONES", texto_html: "Defensa de Abqaiq, Ras Tanura y campos por la Saudi Aramco Industrial Security Force y las FF.AA." },
      { titulo: "DEFENSA AÉREA", texto_html: "Interceptación de drones/misiles balísticos; integración de sensores y antiaéreos." },
      { titulo: "SEGURIDAD MARÍTIMA", texto_html: "Escolta y vigilancia en Ormuz y Mar Rojo; coordinación con coaliciones." },
      { titulo: "DISUASIÓN REGIONAL", texto_html: "Equilibrio frente a Irán; rutas alternas (oleoducto Este-Oeste a Yanbu)." }
    ],
    mision_cita: "IISS Military Balance 2024."
  },
  politicas: {
    src: "PIF · Ministerio de Energía",
    planes_titulo: "Planes nacionales",
    planes: [
      { nombre: "Visión 2030", texto: "Diversificación económica y energética; reducir dependencia del crudo." },
      { nombre: "National Renewable Energy Program", texto: "~130 GW renovables a 2030." },
      { nombre: "Saudi Green Initiative", texto: "Net-zero 2060; economía circular del carbono." },
      { nombre: "NEOM / Helios", texto: "Hidrógeno verde a gran escala para exportación." }
    ],
    instituciones_titulo: "Instituciones clave",
    instituciones: [
      { sigla: "Saudi Aramco", texto: "petrolera nacional; mayor productora del mundo." },
      { sigla: "Ministerio de Energía", texto: "rectoría del sector." },
      { sigla: "PIF", texto: "fondo soberano; financia la transición (ACWA Power)." },
      { sigla: "KAPSARC", texto: "centro de investigación de política energética." }
    ],
    transicion_titulo: "Transición y economía",
    transicion_html: "<p>El reto es <b>diversificar la renta</b> antes de que la demanda global de petróleo decline. La transición es financiada por el propio petróleo (PIF), apostando a solar, hidrógeno verde y petroquímica de valor agregado.</p>",
    transicion_cita: "PIF; IEA 2024."
  },
  crisis: {
    src: "Wargaming · Cone of Plausibility",
    matriz_titulo: "Matriz Probabilidad × Impacto",
    matriz: {
      esquina: "Impacto ↓ / Prob →",
      prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
      filas: [
        { impacto: "Catastrófico", celdas: [{ nivel: 3 }, { nivel: 4 }, { nivel: 5, texto: "Cierre de Ormuz" }, { nivel: 5, texto: "Ataque mayor a Abqaiq" }, { nivel: 5 }] },
        { impacto: "Mayor", celdas: [{ nivel: 2 }, { nivel: 3 }, { nivel: 4, texto: "Guerra de precios" }, { nivel: 4, texto: "Drones hutíes" }, { nivel: 5 }] },
        { impacto: "Moderado", celdas: [{ nivel: 1 }, { nivel: 2 }, { nivel: 3, texto: "Caída demanda" }, { nivel: 4, texto: "Pico A/C" }, { nivel: 4 }] },
        { impacto: "Menor", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 3 }, { nivel: 3 }] },
        { impacto: "Insignif.", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 2 }] }
      ]
    },
    matriz_cita: "Escala HM Treasury Orange Book.",
    escenarios_titulo: "Escenarios calibrados",
    escenarios: [
      { nivel: "high", tag: "A", texto_html: "<b>Cierre de Ormuz</b> — bloqueo de exportaciones. <i>Respuesta:</i> oleoducto Este-Oeste a Yanbu, reservas, coalición naval." },
      { nivel: "high", tag: "B", texto_html: "<b>Ataque a Abqaiq</b> — pérdida temporal de procesamiento. <i>Respuesta:</i> defensa aérea, redundancia, liberación de inventarios." },
      { nivel: "med", tag: "C", texto_html: "<b>Transición global acelerada</b> — caída estructural de la demanda. <i>Respuesta:</i> Visión 2030, diversificación." },
      { nivel: "med", tag: "D", texto_html: "<b>Ola de calor + pico de A/C</b> — estrés de la red. <i>Respuesta:</i> solar diurna, eficiencia, tarifas." }
    ],
    vectores_titulo: "Respuesta estratégica integrada — vectores",
    vectores: [
      { titulo: "DIVERSIFICACIÓN", texto: "Solar, hidrógeno verde y petroquímica de valor agregado." },
      { titulo: "RUTAS ALTERNAS", texto: "Oleoducto Este-Oeste para evitar Ormuz." },
      { titulo: "DEFENSA", texto: "Antiaérea en capas contra drones/misiles." },
      { titulo: "ALIANZAS", texto: "OPEP+ para gestionar la oferta; seguridad con EE.UU." }
    ]
  },
  referencias: {
    src: "Triangulación multi-fuente",
    titulo: "Fuentes primarias y académicas",
    items: [
      "IEA (2024). <i>Saudi Arabia Energy Profile</i>. París.",
      "OPEC (2024). <i>Annual Statistical Bulletin</i>.",
      "Saudi Aramco (2024). <i>Annual Report</i>.",
      "KAPSARC (2023). Estudios de política energética. Riad.",
      "IISS (2024). <i>The Military Balance</i>.",
      "APERC (2007). <i>A Quest for Energy Security in the 21st Century</i>. Tokio."
    ]
  },
  footer: "Documento de sustentación · Rúbrica Slide18 · Logística Militar · Mayo 2026"
});

/* === RUSIA ============================================================== */
P({
  schema_version: "1.0.0",
  meta: {
    pais: "Rusia", pais_iso: "RUS", pais_iso2: "RU", subtitulo_pais: "Federación de",
    eyebrow: "Portafolio · Seguridad Energética por País",
    titulo: "Seguridad Energética de Rusia:<br/>superpotencia de hidrocarburos bajo sanciones",
    subtitulo: "Mayores reservas de gas y top-3 en petróleo: enorme disponibilidad y soberanía frente a una accesibilidad golpeada por las sanciones y el giro forzado hacia Asia.",
    estudiante: "Cátedra (ejemplo de referencia)", asignatura: "Logística Militar · Rúbrica Slide18",
    tipo_doc: "Documento de sustentación", fecha: "Mayo 2026",
    fuerzas_armadas: "Fuerzas Armadas de la Federación de Rusia", aperc_global: 6.2,
    cita_corta: "IEA, 2024; BP, 2023; Gazprom, 2024.",
    portafolio_label: "Rúbrica Slide18<br/>Logística Militar<br/>v2 — académica",
    map_view: { lat: 62, lng: 90, zoom: 3 }
  },
  resumen: {
    tesis_html: "Rusia es una <b>superpotencia energética</b>: mayores reservas mundiales de gas y top-3 en petróleo, con disponibilidad y soberanía sobresalientes y el hidrocarburo como <i>instrumento geopolítico</i>. Tras 2022, las sanciones del G7 y el tope de precios degradan su <b>accesibilidad</b> a mercados y la obligan a reorientar exportaciones de Europa hacia China e India con descuento.",
    conclusion_html: "APERC <b>6.2/10</b>: altísima <i>availability/sovereignty</i> pero <i>accessibility</i> y <i>resilience</i> erosionadas por sanciones, daño a Nord Stream y dependencia de ingresos por hidrocarburos. El componente militar protege la Ruta Marítima del Norte y la infraestructura ártica.",
    kpis: [
      { valor: 20, unidad: "%", etiqueta: "Reservas mundiales de gas" },
      { valor: 10.5, unidad: "Mb/d", etiqueta: "Producción de petróleo", decimal: true },
      { valor: 45, unidad: "%", etiqueta: "Ingresos fiscales energéticos" },
      { valor: 38, unidad: "%", etiqueta: "Gas en el mix primario" }
    ]
  },
  aperc: {
    src: "APERC 2007 · IEA 2024",
    definicion_html: "<p>Rusia maximiza <i>availability</i> y <i>sovereignty</i> (control estatal de Gazprom/Rosneft), pero las sanciones convierten la <i>accessibility</i> a mercados y tecnología en su talón de Aquiles.</p>",
    definicion_cita: "IEA, Russia Energy Profile 2024.",
    scorecard_titulo: "Scorecard de Rusia bajo APERC",
    scores: [
      { letra: "A", nombre: "vailability", desc: "Mayores reservas de gas; vasto petróleo y carbón.", score: 9.0 },
      { letra: "A", nombre: "ccessibility", desc: "Sanciones, tope de precios, pérdida del mercado europeo.", score: 4.0 },
      { letra: "A", nombre: "ffordability", desc: "Energía interna muy barata.", score: 7.0 },
      { letra: "A", nombre: "cceptability", desc: "Alta huella; quema de gas; Ártico frágil.", score: 4.8 }
    ],
    scorecard_cita: "Scores propios sobre indicadores normalizados.",
    comparador: { pais_b: "Arabia Saudita", pais_c: "Noruega" },
    indicadores_titulo: "Indicadores cuantitativos aplicados",
    indicadores: [
      { indicador: "HHI mix primario", definicion: "Concentración (0–10 000)", propio: "4 200", b: "6 800", c: "3 600", interp: { texto: "Concentrado en gas/petróleo" } },
      { indicador: "Net Import Dep. (%)", definicion: "(Imp−Exp)/Consumo", propio: "−85%", b: "−320%", c: "−600%", interp: { texto: "Gran exportador" } },
      { indicador: "Exportaciones a Asia (%)", definicion: "Reorientación post-2022", propio: "55", b: "70", c: "10", interp: { texto: "Giro a Asia", pill: "warn" } },
      { indicador: "Intensidad de carbono (gCO₂/kWh)", definicion: "Generación", propio: "360", b: "615", c: "26", interp: { texto: "Media-alta" } }
    ],
    indicadores_nota: "Comparación con otros dos grandes exportadores."
  },
  matriz: {
    src: "IEA · BP 2024",
    primaria_titulo: "Energía Primaria (TPES, %)",
    primaria: [
      { label: "Gas natural", valor: 54, color: "#0b5394" },
      { label: "Petróleo", valor: 22, color: "#c4570e" },
      { label: "Carbón", valor: 16, color: "#8a4a4a" },
      { label: "Nuclear", valor: 5, color: "#6b4e8e" },
      { label: "Hidro/Renov.", valor: 3, color: "#2e7d32" }
    ],
    primaria_cita: "Gas 54 · Petróleo 22 · Carbón 16 · Nuclear 5 · Hidro 3. <i>Fuente: BP 2023.</i>",
    electrica_titulo: "Generación Eléctrica (%)",
    electrica: [
      { label: "Gas", valor: 46, color: "#0b5394" },
      { label: "Nuclear", valor: 20, color: "#6b4e8e" },
      { label: "Hidro", valor: 18, color: "#2e7d32" },
      { label: "Carbón", valor: 14, color: "#8a4a4a" },
      { label: "Otros", valor: 2, color: "#a17c1c" }
    ],
    electrica_cita: "Gas 46 · Nuclear 20 · Hidro 18 · Carbón 14. <i>Fuente: Ember 2024.</i>",
    comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
    comparativa: {
      paises: ["Rusia", "Arabia Saudita", "Noruega"],
      series: [
        { label: "Gas", data: [46, 60, 1], color: "#0b5394" },
        { label: "Nuclear", data: [20, 0, 0], color: "#6b4e8e" },
        { label: "Hidro", data: [18, 0, 88], color: "#2e7d32" },
        { label: "Carbón", data: [14, 0, 0], color: "#8a4a4a" },
        { label: "Petróleo", data: [0, 38, 0], color: "#c4570e" },
        { label: "Solar/Eólica", data: [2, 2, 11], color: "#a17c1c" }
      ]
    },
    comparativa_nota: "Rusia: mix más diverso del trío, con nuclear e hidro relevantes."
  },
  sankey: {
    src: "Producción → Transformación → Uso final",
    titulo_panel: "Flujos físicos de energía, Rusia (PJ aprox.)",
    flujos: [
      { from: "Gas natural (prod.)", to: "Exportación de gas", flow: 9000 },
      { from: "Gas natural (prod.)", to: "Generación eléctrica", flow: 3000 },
      { from: "Gas natural (prod.)", to: "Industria & residencial", flow: 4000 },
      { from: "Petróleo (prod.)", to: "Exportación de crudo", flow: 8000 },
      { from: "Petróleo (prod.)", to: "Refinación local", flow: 5000 },
      { from: "Refinación local", to: "Exportación de derivados", flow: 2500 },
      { from: "Refinación local", to: "Transporte", flow: 2000 },
      { from: "Carbón (prod.)", to: "Exportación de carbón", flow: 3500 },
      { from: "Generación eléctrica", to: "Industria & residencial", flow: 2600 }
    ],
    nodos: {
      "Gas natural (prod.)": { color: "#0b5394", label: "Gas natural" },
      "Petróleo (prod.)": { color: "#c4570e", label: "Petróleo" },
      "Carbón (prod.)": { color: "#8a4a4a", label: "Carbón" },
      "Refinación local": { color: "#c4570e", label: "Refinerías" },
      "Generación eléctrica": { color: "#6b4e8e", label: "Generación eléctrica" },
      "Exportación de gas": { color: "#0b5394", label: "EXPORT · Gas" },
      "Exportación de crudo": { color: "#8a4a4a", label: "EXPORT · Crudo" },
      "Exportación de derivados": { color: "#a17c1c", label: "EXPORT · Derivados" },
      "Exportación de carbón": { color: "#8a4a4a", label: "EXPORT · Carbón" },
      "Industria & residencial": { color: "#4a5870", label: "Industria + Residencial" },
      "Transporte": { color: "#c4570e", label: "Transporte" }
    },
    cita: "El gas y el crudo de exportación son la columna fiscal del Estado. <i>Datos estilizados sobre IEA/BP.</i>"
  },
  evolucion: {
    src: "2000–2050 · post-sanciones",
    historico_titulo: "Destino de las exportaciones de hidrocarburos (%)",
    anios: ["2000", "2010", "2020", "2022", "2024", "2030"],
    series: [
      { label: "Europa", data: [70, 72, 65, 50, 25, 15], color: "#0b5394" },
      { label: "Asia (China/India)", data: [10, 15, 25, 40, 60, 70], color: "#c4570e" },
      { label: "Resto", data: [20, 13, 10, 10, 15, 15], color: "#a17c1c" }
    ],
    historico_cita: "Reorientación forzada de Europa a Asia tras 2022 (con descuentos).",
    hitos_titulo: "Hitos del Régimen Energético",
    hitos: [
      { anio: "2006", evento: "Cortes de gas a Ucrania: el gas como instrumento político." },
      { anio: "2011", evento: "Inicio de Nord Stream 1." },
      { anio: "2014", evento: "Primeras sanciones (Crimea)." },
      { anio: "2019", evento: "Inauguración de Power of Siberia a China." },
      { anio: "2022", evento: "Invasión; sanciones del G7, tope de precios y daño a Nord Stream." },
      { anio: "2024", evento: "Mayoría de exportaciones reorientadas a Asia." }
    ]
  },
  infraestructura: {
    src: "Mapa Leaflet · GEM",
    mapa_titulo: "Campos, gasoductos y terminales",
    pines: [
      { lat: 71.3, lng: 72.1, tipo: "gnl", nombre: "Yamal LNG (Sabetta)", desc: "Novatek · GNL ártico" },
      { lat: 66.0, lng: 76.6, tipo: "gnl", nombre: "Campo Urengoy", desc: "Uno de los mayores yacimientos de gas" },
      { lat: 44.72, lng: 37.79, tipo: "refineria", nombre: "Novorossiysk", desc: "Mayor puerto petrolero del Mar Negro" },
      { lat: 42.73, lng: 133.0, tipo: "gnl", nombre: "Kozmino", desc: "Terminal del oleoducto ESPO al Pacífico" },
      { lat: 46.63, lng: 142.9, tipo: "gnl", nombre: "Sakhalin-2 LNG", desc: "Prigorodnoye · GNL al Pacífico" },
      { lat: 59.85, lng: 29.05, tipo: "almacenamiento", nombre: "Nuclear Leningrado", desc: "Rosatom" },
      { lat: 52.83, lng: 91.37, tipo: "almacenamiento", nombre: "Hidro Sayano-Shúshenskaya", desc: "Mayor central hidroeléctrica de Rusia" }
    ],
    rutas: [
      { puntos: [[66.0, 76.6], [55, 80], [50.2, 127.5], [40, 116]], tooltip: "Gasoducto Power of Siberia → China" },
      { puntos: [[44.72, 37.79], [41, 29], [37, 26]], tooltip: "SLOC: Mar Negro → Bósforo" }
    ],
    leyenda: [
      { color: "#c4570e", label: "Petróleo / refinerías" },
      { color: "#0b5394", label: "Gas / GNL" },
      { color: "#2e7d32", label: "Hidro" },
      { color: "#6b4e8e", label: "Nuclear" }
    ],
    mapa_cita: "Coordenadas reales de Yamal, Urengoy, Novorossiysk, Kozmino, Sakhalin. <i>Fuentes: GEM 2024.</i>",
    vulnerabilidades_titulo: "Vulnerabilidades técnicas",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Acceso a mercados</b> · sanciones y tope de precios reducen ingresos y obligan a vender con descuento." },
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Tecnología</b> · dependencia de equipos occidentales para GNL y campos difíciles (Ártico)." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Infraestructura fija</b> · gasoductos a Europa (Nord Stream dañado) difíciles de reorientar a Asia." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Logística ártica</b> · Ruta Marítima del Norte exige rompehielos y es estacional." }
    ],
    capacidad_titulo: "Exportaciones por vector (Mtep)",
    capacidad: {
      anios: ["2021", "2022", "2024", "2030"],
      y_titulo: "Mtep",
      series: [
        { label: "Gas a Europa", tipo: "bar", data: [180, 120, 40, 25], color: "#0b5394" },
        { label: "Petróleo/gas a Asia", tipo: "bar", data: [120, 160, 230, 290], color: "#c4570e" },
        { label: "Ingreso energético (índice)", tipo: "line", data: [100, 130, 90, 95], color: "#a17c1c" }
      ]
    },
    capacidad_cita: "Reorientación de volúmenes 2021–2030. <i>Fuente: IEA estimaciones.</i>"
  },
  geopolitica: {
    src: "Radar APERC normalizado",
    radar_titulo: "Radar APERC: Rusia vs Arabia Saudita vs Noruega",
    radar: {
      ejes: ["Availability", "Accessibility", "Affordability", "Acceptability", "Sovereignty", "Robustness", "Resilience"],
      series: [
        { label: "Rusia", data: [9.0, 4.0, 7.0, 4.8, 8.5, 6.5, 5.5], color: "#0b5394" },
        { label: "Arabia Saudita", data: [9.5, 4.5, 6.3, 2.5, 8.5, 6.5, 4.5], color: "#c4570e" },
        { label: "Noruega", data: [9.0, 8.5, 7.5, 9.5, 9.0, 9.0, 9.0], color: "#2e7d32" }
      ]
    },
    radar_cita: "Normalización min-max sobre indicadores §01.",
    dependencias_titulo: "Dependencias y socios",
    dependencias: [
      { vinculo: "Exportación a China (gas/petróleo)", pct: "35", riesgo: { texto: "Comprador dominante", pill: "warn" } },
      { vinculo: "Exportación a India (crudo)", pct: "20", riesgo: { texto: "Nuevo gran cliente", pill: "ok" } },
      { vinculo: "Mercado europeo (histórico)", pct: "15", riesgo: { texto: "En contracción", pill: "danger" } },
      { vinculo: "Tecnología GNL occidental", pct: "—", riesgo: { texto: "Restringida", pill: "danger" } }
    ],
    dependencias_cita: "IEA; aduanas 2024.",
    minerales_titulo: "Posición energética global",
    minerales: [
      { valor: "#1", unidad: " mundial", etiqueta: "RESERVAS DE GAS" },
      { valor: "#1", unidad: " export.", etiqueta: "EXPORTADOR DE TRIGO Y GAS" },
      { valor: "~40", unidad: "%", etiqueta: "URANIO ENRIQUECIDO (Rosatom)" }
    ],
    minerales_cita: "BP 2023; IAEA."
  },
  militar: {
    titulo_seccion: "Combustibles Militares y Rol Operacional de las Fuerzas Armadas de Rusia",
    nav_label: "Combustibles militares",
    src: "IISS Military Balance 2024",
    combustibles_titulo: "Demanda de combustibles de las Fuerzas Armadas",
    combustibles: [
      { codigo: "TS-1 / RT", tipo: "Queroseno de aviación", usuario: "VKS (aeroespacial)", ml_anio: "1200" },
      { codigo: "F-76 / Flота", tipo: "Diésel/fuelóleo naval", usuario: "Armada", ml_anio: "500" },
      { codigo: "Diésel terrestre", tipo: "Diésel", usuario: "Fuerzas Terrestres", ml_anio: "700" }
    ],
    combustibles_total: "~2400",
    combustibles_cita: "Estimación de orden de magnitud.",
    vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Ataques a refinerías</b> · drones de largo alcance contra refinerías han afectado el suministro interno de combustible." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Logística ártica</b> · proteger la Ruta Marítima del Norte y bases del Ártico." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Repuestos y tecnología</b> · sanciones afectan mantenimiento." }
    ],
    mision_titulo: "Misión en Seguridad Energética",
    mision: [
      { titulo: "ARMA ENERGÉTICA", texto_html: "El gas/petróleo como herramienta de coerción y financiación estatal." },
      { titulo: "ÁRTICO", texto_html: "Flota del Norte y rompehielos para asegurar Yamal y la Ruta Marítima del Norte." },
      { titulo: "PROTECCIÓN DE REFINERÍAS", texto_html: "Defensa antiaérea de infraestructura energética interna." },
      { titulo: "EXPORTACIÓN NUCLEAR", texto_html: "Rosatom: reactores y combustible como influencia geopolítica." }
    ],
    mision_cita: "IISS 2024."
  },
  politicas: {
    src: "Ministerio de Energía · Gazprom",
    planes_titulo: "Planes nacionales",
    planes: [
      { nombre: "Estrategia Energética 2035", texto: "Maximizar exportaciones y giro a mercados asiáticos." },
      { nombre: "Power of Siberia 2", texto: "Nuevo gasoducto a China (en negociación)." },
      { nombre: "Doctrina Ártica", texto: "Desarrollo de la Ruta Marítima del Norte y campos árticos." }
    ],
    instituciones_titulo: "Instituciones clave",
    instituciones: [
      { sigla: "Gazprom", texto: "monopolio del gas y de exportación por ducto." },
      { sigla: "Rosneft", texto: "mayor petrolera estatal." },
      { sigla: "Novatek", texto: "GNL (Yamal, Arctic LNG-2)." },
      { sigla: "Rosatom", texto: "energía nuclear y exportación de reactores." }
    ],
    transicion_titulo: "Transición y economía",
    transicion_html: "<p>El modelo depende de la <b>renta de hidrocarburos</b>; las sanciones y la transición global presionan a diversificar clientes (Asia) más que tecnologías. La descarbonización interna es secundaria.</p>",
    transicion_cita: "IEA 2024."
  },
  crisis: {
    src: "Wargaming · Cone of Plausibility",
    matriz_titulo: "Matriz Probabilidad × Impacto",
    matriz: {
      esquina: "Impacto ↓ / Prob →",
      prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
      filas: [
        { impacto: "Catastrófico", celdas: [{ nivel: 3 }, { nivel: 4 }, { nivel: 5, texto: "Embargo total" }, { nivel: 5 }, { nivel: 5 }] },
        { impacto: "Mayor", celdas: [{ nivel: 2 }, { nivel: 3 }, { nivel: 4, texto: "Ataques a refinerías" }, { nivel: 4, texto: "Caída de precios" }, { nivel: 5 }] },
        { impacto: "Moderado", celdas: [{ nivel: 1 }, { nivel: 2 }, { nivel: 3, texto: "Cuello logístico Asia" }, { nivel: 4 }, { nivel: 4 }] },
        { impacto: "Menor", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 3 }, { nivel: 3 }] },
        { impacto: "Insignif.", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 2 }] }
      ]
    },
    matriz_cita: "Escala HM Treasury Orange Book.",
    escenarios_titulo: "Escenarios calibrados",
    escenarios: [
      { nivel: "high", tag: "A", texto_html: "<b>Endurecimiento del embargo</b> — caída de ingresos. <i>Respuesta:</i> descuentos a Asia, flota fantasma." },
      { nivel: "high", tag: "B", texto_html: "<b>Ataques a refinerías</b> — escasez interna de combustible. <i>Respuesta:</i> defensa aérea, racionamiento de exportación de gasolina." },
      { nivel: "med", tag: "C", texto_html: "<b>Sobre-dependencia de China</b> — poder de negociación del comprador. <i>Respuesta:</i> diversificar (India, Power of Siberia 2)." },
      { nivel: "med", tag: "D", texto_html: "<b>Caída estructural de precios</b> — déficit fiscal. <i>Respuesta:</i> fondo de reserva, recorte de gasto." }
    ],
    vectores_titulo: "Respuesta estratégica integrada — vectores",
    vectores: [
      { titulo: "GIRO A ASIA", texto: "Power of Siberia 2, ESPO, GNL ártico hacia China/India." },
      { titulo: "FLOTA FANTASMA", texto: "Evadir el tope de precios con buques y seguros propios." },
      { titulo: "ÁRTICO", texto: "Ruta Marítima del Norte como corredor estratégico." },
      { titulo: "NUCLEAR", texto: "Rosatom como palanca de influencia y divisas." }
    ]
  },
  referencias: {
    src: "Triangulación multi-fuente",
    titulo: "Fuentes primarias y académicas",
    items: [
      "IEA (2024). <i>Russia Energy Profile</i>. París.",
      "BP (2023). <i>Statistical Review of World Energy</i>.",
      "Gazprom / Novatek (2024). Reportes anuales.",
      "IISS (2024). <i>The Military Balance</i>.",
      "APERC (2007). <i>A Quest for Energy Security in the 21st Century</i>. Tokio."
    ]
  },
  footer: "Documento de sustentación · Rúbrica Slide18 · Logística Militar · Mayo 2026"
});

/* === VENEZUELA ========================================================== */
P({
  schema_version: "1.0.0",
  meta: {
    pais: "Venezuela", pais_iso: "VEN", pais_iso2: "VE", subtitulo_pais: "República Bolivariana de",
    eyebrow: "Portafolio · Seguridad Energética por País",
    titulo: "Seguridad Energética de Venezuela:<br/>las mayores reservas, el sistema colapsado",
    subtitulo: "Posee las mayores reservas probadas de crudo del mundo (Faja del Orinoco) pero su seguridad energética se desplomó por el colapso de PDVSA, las sanciones y la fragilidad hidroeléctrica.",
    estudiante: "Cátedra (ejemplo de referencia)", asignatura: "Logística Militar · Rúbrica Slide18",
    tipo_doc: "Documento de sustentación", fecha: "Mayo 2026",
    fuerzas_armadas: "Fuerza Armada Nacional Bolivariana (FANB)", aperc_global: 3.8,
    cita_corta: "OPEP, 2024; IEA, 2024; PDVSA.",
    portafolio_label: "Rúbrica Slide18<br/>Logística Militar<br/>v2 — académica",
    map_view: { lat: 7, lng: -66, zoom: 5 }
  },
  resumen: {
    tesis_html: "Venezuela vive la <b>paradoja extrema</b>: las <i>mayores reservas probadas de crudo del mundo</i> (Faja del Orinoco, extrapesado) conviven con un sistema energético colapsado — producción de PDVSA hundida, refinación degradada, sanciones y fuga de talento. La electricidad, ~75% hidro y dependiente del <b>Guri</b>, sufre apagones nacionales (marzo 2019). Hay escasez interna de gasolina pese a ser un país petrolero.",
    conclusion_html: "APERC <b>3.8/10</b>, el más bajo del portafolio: alta <i>availability</i> en reservas pero <i>affordability</i>, <i>robustness</i> y gobernanza en mínimos. La FANB protege la Faja, el Guri y los terminales.",
    kpis: [
      { valor: 303, unidad: "Gbbl", etiqueta: "Reservas probadas de crudo" },
      { valor: 0.8, unidad: "Mb/d", etiqueta: "Producción actual de crudo", decimal: true },
      { valor: 75, unidad: "%", etiqueta: "Electricidad de origen hidro" },
      { valor: 3, unidad: "Mb/d", etiqueta: "Producción pico (2000s)" }
    ]
  },
  aperc: {
    src: "APERC 2007 · OPEP 2024",
    definicion_html: "<p>Venezuela ilustra que la <i>availability</i> de recursos no garantiza seguridad: sin inversión, gobernanza ni mantenimiento, la <i>robustness</i> del sistema colapsa y la <i>affordability</i> se vuelve negativa pese a subsidios.</p>",
    definicion_cita: "OPEP 2024; IEA.",
    scorecard_titulo: "Scorecard de Venezuela bajo APERC",
    scores: [
      { letra: "A", nombre: "vailability", desc: "Mayores reservas de crudo; gran hidro (Guri).", score: 8.5 },
      { letra: "A", nombre: "ccessibility", desc: "Sanciones; refinación e infraestructura degradadas.", score: 3.0 },
      { letra: "A", nombre: "ffordability", desc: "Subsidios insostenibles; escasez de gasolina.", score: 2.5 },
      { letra: "A", nombre: "cceptability", desc: "Quema de gas; derrames; apagones.", score: 1.2 }
    ],
    scorecard_cita: "Scores propios sobre indicadores normalizados.",
    comparador: { pais_b: "Colombia", pais_c: "Arabia Saudita" },
    indicadores_titulo: "Indicadores cuantitativos aplicados",
    indicadores: [
      { indicador: "Reservas de crudo (Gbbl)", definicion: "Probadas", propio: "303", b: "2", c: "267", interp: { texto: "Las mayores del mundo", pill: "ok" } },
      { indicador: "Utilización refinación (%)", definicion: "Capacidad usada", propio: "20", b: "70", c: "90", interp: { texto: "Colapsada", pill: "danger" } },
      { indicador: "Días de apagón/año", definicion: "Estimado", propio: "alto", b: "bajo", c: "muy bajo", interp: { texto: "Crisis eléctrica", pill: "danger" } },
      { indicador: "Hidro en electricidad (%)", definicion: "Generación", propio: "75", b: "70", c: "0", interp: { texto: "Hiperdependencia del Guri" } }
    ],
    indicadores_nota: "Comparación con Colombia (vecino) y Arabia Saudita (otro gran petrolero)."
  },
  matriz: {
    src: "OPEP · IEA 2024",
    primaria_titulo: "Energía Primaria (TPES, %)",
    primaria: [
      { label: "Petróleo", valor: 58, color: "#c4570e" },
      { label: "Gas natural", valor: 30, color: "#0b5394" },
      { label: "Hidro", valor: 12, color: "#2e7d32" }
    ],
    primaria_cita: "Petróleo 58 · Gas 30 · Hidro 12. <i>Fuente: OPEP/IEA.</i>",
    electrica_titulo: "Generación Eléctrica (%)",
    electrica: [
      { label: "Hidro", valor: 75, color: "#2e7d32" },
      { label: "Gas", valor: 15, color: "#0b5394" },
      { label: "Petróleo", valor: 10, color: "#c4570e" }
    ],
    electrica_cita: "Hidro 75 · Gas 15 · Petróleo 10. <i>Fuente: IEA.</i>",
    comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
    comparativa: {
      paises: ["Venezuela", "Colombia", "Arabia Saudita"],
      series: [
        { label: "Hidro", data: [75, 70, 0], color: "#2e7d32" },
        { label: "Gas", data: [15, 16, 60], color: "#0b5394" },
        { label: "Petróleo", data: [10, 2, 38], color: "#c4570e" },
        { label: "Carbón", data: [0, 8, 0], color: "#8a4a4a" },
        { label: "Solar/Eólica", data: [0, 4, 2], color: "#a17c1c" }
      ]
    },
    comparativa_nota: "Hiperdependencia hidroeléctrica del Guri (vulnerable a sequía)."
  },
  sankey: {
    src: "Producción → Transformación → Uso final",
    titulo_panel: "Flujos físicos de energía, Venezuela (PJ aprox.)",
    flujos: [
      { from: "Crudo (Faja Orinoco)", to: "Exportación de crudo", flow: 4000 },
      { from: "Crudo (Faja Orinoco)", to: "Refinación local", flow: 1200 },
      { from: "Refinación local", to: "Combustibles refinados", flow: 800 },
      { from: "Combustibles refinados", to: "Transporte", flow: 700 },
      { from: "Hidro (Guri)", to: "Generación eléctrica", flow: 1600 },
      { from: "Gas natural", to: "Generación eléctrica", flow: 400 },
      { from: "Generación eléctrica", to: "Industria & residencial", flow: 1700 }
    ],
    nodos: {
      "Crudo (Faja Orinoco)": { color: "#c4570e", label: "Crudo (Faja Orinoco)" },
      "Hidro (Guri)": { color: "#2e7d32", label: "Hidro (Guri)" },
      "Gas natural": { color: "#0b5394", label: "Gas natural" },
      "Refinación local": { color: "#c4570e", label: "Refinerías (degradadas)" },
      "Combustibles refinados": { color: "#a17c1c", label: "Combustibles" },
      "Generación eléctrica": { color: "#6b4e8e", label: "Generación eléctrica" },
      "Exportación de crudo": { color: "#8a4a4a", label: "EXPORT · Crudo" },
      "Industria & residencial": { color: "#4a5870", label: "Industria + Residencial" },
      "Transporte": { color: "#c4570e", label: "Transporte" }
    },
    cita: "La refinación opera muy por debajo de su capacidad; de ahí la escasez interna de gasolina. <i>Datos estilizados.</i>"
  },
  evolucion: {
    src: "2000–2024 · colapso y sanciones",
    historico_titulo: "Producción de crudo (Mb/d)",
    anios: ["2000", "2008", "2013", "2016", "2019", "2024"],
    series: [
      { label: "Producción de crudo", data: [3.2, 3.2, 2.5, 2.2, 0.9, 0.8], color: "#c4570e" }
    ],
    historico_cita: "Caída de ~3.2 a <1 Mb/d por desinversión, mala gestión y sanciones.",
    hitos_titulo: "Hitos del Régimen Energético",
    hitos: [
      { anio: "1976", evento: "Nacionalización del petróleo; nace PDVSA." },
      { anio: "1986", evento: "Inauguración de la represa del Guri (10 GW)." },
      { anio: "2003", evento: "Paro petrolero; despido masivo en PDVSA." },
      { anio: "2007", evento: "Estatización de la Faja del Orinoco." },
      { anio: "2017", evento: "Sanciones de EE.UU. al sector petrolero." },
      { anio: "2019", evento: "Apagón nacional de varios días (falla del SEN/Guri)." }
    ]
  },
  infraestructura: {
    src: "Mapa Leaflet · GEM",
    mapa_titulo: "Crudo, refinerías e hidroeléctrica",
    pines: [
      { lat: 8.5, lng: -64.0, tipo: "refineria", nombre: "Faja del Orinoco", desc: "Mayor reserva de crudo extrapesado del mundo" },
      { lat: 7.76, lng: -62.99, tipo: "almacenamiento", nombre: "Represa del Guri", desc: "Central Simón Bolívar · ~10 GW · base del SEN" },
      { lat: 11.75, lng: -70.2, tipo: "refineria", nombre: "Complejo Paraguaná (Amuay/Cardón)", desc: "Mayor complejo refinador; opera degradado" },
      { lat: 10.2, lng: -64.6, tipo: "refineria", nombre: "Refinería Puerto La Cruz", desc: "Oriente del país" },
      { lat: 10.1, lng: -64.7, tipo: "gnl", nombre: "Terminal José", desc: "Mayor terminal de exportación de crudo" },
      { lat: 10.0, lng: -71.5, tipo: "refineria", nombre: "Lago de Maracaibo", desc: "Cuenca petrolera histórica" }
    ],
    rutas: [
      { puntos: [[10.1, -64.7], [12, -68], [15, -72], [20, -80]], tooltip: "SLOC: José → Caribe → Asia (con descuentos)" }
    ],
    leyenda: [
      { color: "#c4570e", label: "Crudo / refinerías" },
      { color: "#2e7d32", label: "Hidroeléctrica" },
      { color: "#0b5394", label: "Terminales" }
    ],
    mapa_cita: "Coordenadas reales de Orinoco, Guri, Paraguaná, José y Maracaibo. <i>Fuentes: GEM.</i>",
    vulnerabilidades_titulo: "Vulnerabilidades técnicas",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Hiperdependencia del Guri</b> · una falla deja sin luz a gran parte del país (2019)." },
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Refinación colapsada</b> · escasez crónica de gasolina pese a las reservas." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Mantenimiento</b> · décadas de desinversión en PDVSA y el SEN." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Sanciones</b> · limitan exportación, importación de diluyentes y repuestos." }
    ],
    capacidad_titulo: "Capacidad vs Demanda eléctrica (GW)",
    capacidad: {
      anios: ["2010", "2016", "2019", "2024"],
      y_titulo: "GW",
      series: [
        { label: "Capacidad efectiva (GW)", tipo: "bar", data: [22, 18, 12, 14], color: "#2e7d32" },
        { label: "Demanda (GW)", tipo: "line", data: [17, 18, 16, 15], color: "#c4570e" }
      ]
    },
    capacidad_cita: "La capacidad efectiva cayó por falta de mantenimiento. <i>Estimación.</i>"
  },
  geopolitica: {
    src: "Radar APERC normalizado",
    radar_titulo: "Radar APERC: Venezuela vs Colombia vs Arabia Saudita",
    radar: {
      ejes: ["Availability", "Accessibility", "Affordability", "Acceptability", "Sovereignty", "Robustness", "Resilience"],
      series: [
        { label: "Venezuela", data: [8.5, 3.0, 2.5, 1.2, 6.0, 2.5, 2.0], color: "#c4570e" },
        { label: "Colombia", data: [6.5, 6.0, 6.0, 6.5, 6.5, 6.0, 5.5], color: "#2e7d32" },
        { label: "Arabia Saudita", data: [9.5, 4.5, 6.3, 2.5, 8.5, 6.5, 4.5], color: "#0b5394" }
      ]
    },
    radar_cita: "Normalización min-max sobre indicadores §01.",
    dependencias_titulo: "Dependencias y socios",
    dependencias: [
      { vinculo: "Exportación de crudo a China", pct: "60", riesgo: { texto: "Pago de deuda/descuentos", pill: "warn" } },
      { vinculo: "Sanciones de EE.UU.", pct: "—", riesgo: { texto: "Restricción severa", pill: "danger" } },
      { vinculo: "Importación de diluyentes/nafta", pct: "—", riesgo: { texto: "Necesaria para el extrapesado", pill: "danger" } },
      { vinculo: "Apoyo técnico de Irán", pct: "—", riesgo: { texto: "Reparación de refinerías", pill: "warn" } }
    ],
    dependencias_cita: "OPEP; prensa especializada 2024.",
    minerales_titulo: "Posición energética global",
    minerales: [
      { valor: "#1", unidad: " mundial", etiqueta: "RESERVAS DE CRUDO" },
      { valor: "303", unidad: " Gbbl", etiqueta: "RESERVAS PROBADAS" },
      { valor: "~10", unidad: " GW", etiqueta: "HIDRO DEL GURI" }
    ],
    minerales_cita: "OPEP Annual Statistical Bulletin 2024."
  },
  militar: {
    titulo_seccion: "Combustibles Militares y Rol Operacional de la FANB",
    nav_label: "Combustibles militares",
    src: "IISS · FANB",
    combustibles_titulo: "Demanda de combustibles de la FANB",
    combustibles: [
      { codigo: "Jet A-1", tipo: "Queroseno de aviación", usuario: "Aviación Militar Bolivariana", ml_anio: "120" },
      { codigo: "Diésel naval", tipo: "Diésel/fuelóleo", usuario: "Armada Bolivariana", ml_anio: "60" },
      { codigo: "Gasoil terrestre", tipo: "Diésel", usuario: "Ejército Bolivariano", ml_anio: "90" }
    ],
    combustibles_total: "~270",
    combustibles_cita: "Estimación de orden de magnitud.",
    vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Escasez de combustible</b> · incluso operaciones militares sufren la crisis de refinación." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Protección de infraestructura</b> · Faja, Guri y terminales son objetivos críticos." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Contrabando de combustible</b> · fronteras porosas con Colombia." }
    ],
    mision_titulo: "Misión en Seguridad Energética",
    mision: [
      { titulo: "PROTECCIÓN DEL GURI", texto_html: "Custodia de la represa y del Sistema Eléctrico Nacional." },
      { titulo: "FAJA Y TERMINALES", texto_html: "Seguridad de la Faja del Orinoco y del terminal José." },
      { titulo: "ANTI-CONTRABANDO", texto_html: "Control del desvío de combustible subsidiado." },
      { titulo: "SOBERANÍA", texto_html: "Discurso de defensa de los recursos frente a sanciones." }
    ],
    mision_cita: "IISS 2024."
  },
  politicas: {
    src: "PDVSA · CORPOELEC",
    planes_titulo: "Planes nacionales",
    planes: [
      { nombre: "Plan de la Patria", texto: "Marco político con metas de recuperación petrolera (incumplidas)." },
      { nombre: "Licencias OFAC (Chevron)", texto: "Alivios parciales para reactivar producción y exportación." },
      { nombre: "Recuperación del SEN", texto: "Intentos de rehabilitar generación y transmisión." }
    ],
    instituciones_titulo: "Instituciones clave",
    instituciones: [
      { sigla: "PDVSA", texto: "petrolera estatal; eje del colapso y la recuperación." },
      { sigla: "CORPOELEC", texto: "operador eléctrico nacional." },
      { sigla: "Ministerio del Poder Popular de Petróleo", texto: "rectoría." }
    ],
    transicion_titulo: "Transición y economía",
    transicion_html: "<p>El reto no es transición sino <b>reconstrucción</b>: recuperar producción, refinación y red eléctrica tras años de desinversión, sanciones y éxodo de personal calificado.</p>",
    transicion_cita: "IEA; OPEP 2024."
  },
  crisis: {
    src: "Wargaming · Cone of Plausibility",
    matriz_titulo: "Matriz Probabilidad × Impacto",
    matriz: {
      esquina: "Impacto ↓ / Prob →",
      prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
      filas: [
        { impacto: "Catastrófico", celdas: [{ nivel: 3 }, { nivel: 4 }, { nivel: 5, texto: "Apagón nacional" }, { nivel: 5, texto: "Colapso del Guri" }, { nivel: 5 }] },
        { impacto: "Mayor", celdas: [{ nivel: 2 }, { nivel: 3 }, { nivel: 4, texto: "Escasez de gasolina" }, { nivel: 4 }, { nivel: 5 }] },
        { impacto: "Moderado", celdas: [{ nivel: 1 }, { nivel: 2 }, { nivel: 3, texto: "Falla de refinería" }, { nivel: 4, texto: "Sequía/El Niño" }, { nivel: 4 }] },
        { impacto: "Menor", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 3 }, { nivel: 3 }] },
        { impacto: "Insignif.", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 2 }] }
      ]
    },
    matriz_cita: "Escala HM Treasury Orange Book.",
    escenarios_titulo: "Escenarios calibrados",
    escenarios: [
      { nivel: "high", tag: "A", texto_html: "<b>Colapso del Guri</b> — apagón nacional prolongado. <i>Respuesta:</i> generación distribuida, racionamiento, reparación." },
      { nivel: "high", tag: "B", texto_html: "<b>Escasez total de gasolina</b> — parálisis. <i>Respuesta:</i> importación, rehabilitación de refinerías (Irán)." },
      { nivel: "med", tag: "C", texto_html: "<b>El Niño / sequía</b> — baja el embalse del Guri. <i>Respuesta:</i> termoeléctricas de respaldo (deterioradas)." },
      { nivel: "med", tag: "D", texto_html: "<b>Endurecimiento de sanciones</b> — caída de exportación. <i>Respuesta:</i> ventas a China con descuento." }
    ],
    vectores_titulo: "Respuesta estratégica integrada — vectores",
    vectores: [
      { titulo: "RECONSTRUCCIÓN", texto: "Inversión y socios técnicos para PDVSA y el SEN." },
      { titulo: "DIVERSIFICAR GENERACIÓN", texto: "Reducir la hiperdependencia del Guri." },
      { titulo: "REFINACIÓN", texto: "Rehabilitar Paraguaná y Puerto La Cruz." },
      { titulo: "ALIVIO DE SANCIONES", texto: "Licencias (Chevron) para reactivar el sector." }
    ]
  },
  referencias: {
    src: "Triangulación multi-fuente",
    titulo: "Fuentes primarias y académicas",
    items: [
      "OPEC (2024). <i>Annual Statistical Bulletin</i>.",
      "IEA (2024). <i>Venezuela Energy Profile</i>.",
      "Monaldi, F. (2023). Estudios sobre el sector petrolero venezolano.",
      "IISS (2024). <i>The Military Balance</i>.",
      "APERC (2007). <i>A Quest for Energy Security in the 21st Century</i>. Tokio."
    ]
  },
  footer: "Documento de sustentación · Rúbrica Slide18 · Logística Militar · Mayo 2026"
});

/* === CHINA ============================================================== */
P({
  schema_version: "1.0.0",
  meta: {
    pais: "China", pais_iso: "CHN", pais_iso2: "CN", subtitulo_pais: "República Popular",
    eyebrow: "Portafolio · Seguridad Energética por País",
    titulo: "Seguridad Energética de China:<br/>el mayor consumidor y el dilema de Malaca",
    subtitulo: "Mayor consumidor e importador de energía: mix aún dominado por el carbón pero líder absoluto en renovables, con la accesibilidad expuesta a las rutas marítimas del Indo-Pacífico.",
    estudiante: "Cátedra (ejemplo de referencia)", asignatura: "Logística Militar · Rúbrica Slide18",
    tipo_doc: "Documento de sustentación", fecha: "Mayo 2026",
    fuerzas_armadas: "Ejército Popular de Liberación (EPL)", aperc_global: 5.5,
    cita_corta: "IEA, 2024; Ember, 2024; CNPC.",
    portafolio_label: "Rúbrica Slide18<br/>Logística Militar<br/>v2 — académica",
    map_view: { lat: 35, lng: 105, zoom: 4 }
  },
  resumen: {
    tesis_html: "China es el <b>mayor consumidor e importador</b> de energía del mundo. Su mix sigue dominado por el <b>carbón</b>, pero lidera por amplio margen el despliegue de <i>solar, eólica, hidro, nuclear y vehículos eléctricos</i>. Su talón de Aquiles es la <b>accesibilidad</b>: ~70% del petróleo es importado por mar, sobre todo a través del <b>Estrecho de Malaca</b> (\"dilema de Malaca\").",
    conclusion_html: "APERC <b>5.5/10</b>: gran <i>availability</i> agregada y <i>robustness</i> creciente (renovables, SPR) pero <i>accessibility</i> vulnerable a los SLOC. El EPL desarrolla capacidad naval para asegurar rutas y diversifica vía ductos terrestres.",
    kpis: [
      { valor: 70, unidad: "%", etiqueta: "Petróleo importado" },
      { valor: 55, unidad: "%", etiqueta: "Carbón en el mix primario" },
      { valor: 1, unidad: "º", etiqueta: "Capacidad solar y eólica mundial" },
      { valor: 60, unidad: "%", etiqueta: "EV vendidos a nivel mundial" }
    ]
  },
  aperc: {
    src: "APERC 2007 · IEA 2024",
    definicion_html: "<p>China combina escala (mayor productor y consumidor de casi todo) con dependencia de importación de crudo y gas. Su estrategia: diversificar rutas (ductos terrestres), acumular reservas (SPR) y dominar la cadena de renovables y minerales críticos.</p>",
    definicion_cita: "IEA, China Energy Profile 2024.",
    scorecard_titulo: "Scorecard de China bajo APERC",
    scores: [
      { letra: "A", nombre: "vailability", desc: "Enorme carbón propio y mayor parque renovable.", score: 7.5 },
      { letra: "A", nombre: "ccessibility", desc: "Dilema de Malaca; ~70% del crudo importado.", score: 4.5 },
      { letra: "A", nombre: "ffordability", desc: "Energía relativamente asequible; subsidios.", score: 6.0 },
      { letra: "A", nombre: "cceptability", desc: "Carbón aún alto, pero descarbonización acelerada.", score: 4.0 }
    ],
    scorecard_cita: "Scores propios sobre indicadores normalizados.",
    comparador: { pais_b: "Estados Unidos", pais_c: "India" },
    indicadores_titulo: "Indicadores cuantitativos aplicados",
    indicadores: [
      { indicador: "Dependencia importación petróleo (%)", definicion: "Neta", propio: "70", b: "−10", c: "85", interp: { texto: "Alta", pill: "warn" } },
      { indicador: "Carbón en electricidad (%)", definicion: "Generación", propio: "60", b: "16", c: "73", interp: { texto: "Dominante, en descenso" } },
      { indicador: "Capacidad renovable (GW)", definicion: "Solar+eólica", propio: "1200", b: "390", c: "130", interp: { texto: "Líder mundial", pill: "ok" } },
      { indicador: "Días de SPR petróleo", definicion: "Reserva estratégica", propio: "90", b: "—", c: "75", interp: { texto: "En estándar IEA" } }
    ],
    indicadores_nota: "Comparación con EE.UU. (productor) e India (otro gran importador asiático)."
  },
  matriz: {
    src: "IEA · Ember 2024",
    primaria_titulo: "Energía Primaria (TPES, %)",
    primaria: [
      { label: "Carbón", valor: 55, color: "#8a4a4a" },
      { label: "Petróleo", valor: 19, color: "#c4570e" },
      { label: "Gas natural", valor: 9, color: "#0b5394" },
      { label: "Renovables", valor: 12, color: "#a17c1c" },
      { label: "Nuclear/Hidro", valor: 5, color: "#6b4e8e" }
    ],
    primaria_cita: "Carbón 55 · Petróleo 19 · Gas 9 · Renov. 12 · Nuclear/Hidro 5. <i>Fuente: IEA 2024.</i>",
    electrica_titulo: "Generación Eléctrica (%)",
    electrica: [
      { label: "Carbón", valor: 60, color: "#8a4a4a" },
      { label: "Hidro", valor: 14, color: "#2e7d32" },
      { label: "Solar", valor: 9, color: "#a17c1c" },
      { label: "Eólica", valor: 9, color: "#6a8caf" },
      { label: "Nuclear", valor: 5, color: "#6b4e8e" },
      { label: "Gas", valor: 3, color: "#0b5394" }
    ],
    electrica_cita: "Carbón 60 · Hidro 14 · Solar 9 · Eólica 9 · Nuclear 5. <i>Fuente: Ember 2024.</i>",
    comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
    comparativa: {
      paises: ["China", "Estados Unidos", "India"],
      series: [
        { label: "Carbón", data: [60, 16, 73], color: "#8a4a4a" },
        { label: "Gas", data: [3, 43, 3], color: "#0b5394" },
        { label: "Hidro", data: [14, 6, 10], color: "#2e7d32" },
        { label: "Nuclear", data: [5, 18, 3], color: "#6b4e8e" },
        { label: "Solar/Eólica", data: [18, 16, 11], color: "#a17c1c" }
      ]
    },
    comparativa_nota: "China lidera en valor absoluto de renovables pese al peso del carbón."
  },
  sankey: {
    src: "Producción → Transformación → Uso final",
    titulo_panel: "Flujos físicos de energía, China (PJ aprox.)",
    flujos: [
      { from: "Carbón (prod.+imp.)", to: "Generación eléctrica", flow: 9000 },
      { from: "Carbón (prod.+imp.)", to: "Industria (acero/cemento)", flow: 5000 },
      { from: "Petróleo importado", to: "Refinación local", flow: 6000 },
      { from: "Refinación local", to: "Transporte", flow: 4500 },
      { from: "Gas (imp.+ductos)", to: "Industria & residencial", flow: 2500 },
      { from: "Renovables (sol/viento)", to: "Generación eléctrica", flow: 2600 },
      { from: "Hidro", to: "Generación eléctrica", flow: 1500 },
      { from: "Generación eléctrica", to: "Industria & residencial", flow: 9000 }
    ],
    nodos: {
      "Carbón (prod.+imp.)": { color: "#8a4a4a", label: "Carbón" },
      "Petróleo importado": { color: "#c4570e", label: "Petróleo importado" },
      "Gas (imp.+ductos)": { color: "#0b5394", label: "Gas" },
      "Renovables (sol/viento)": { color: "#a17c1c", label: "Solar & Eólica" },
      "Hidro": { color: "#2e7d32", label: "Hidro" },
      "Refinación local": { color: "#c4570e", label: "Refinerías" },
      "Generación eléctrica": { color: "#6b4e8e", label: "Generación eléctrica" },
      "Industria (acero/cemento)": { color: "#4a5870", label: "Industria pesada" },
      "Industria & residencial": { color: "#4a5870", label: "Industria + Residencial" },
      "Transporte": { color: "#c4570e", label: "Transporte" }
    },
    cita: "El petróleo importado (vía Malaca) alimenta el transporte; el carbón, la electricidad e industria. <i>Datos estilizados.</i>"
  },
  evolucion: {
    src: "2000–2050 · doble objetivo de carbono",
    historico_titulo: "Mix Eléctrico Histórico y Proyectado (%)",
    anios: ["2000", "2010", "2020", "2024", "2030", "2040", "2050"],
    series: [
      { label: "Carbón", data: [78, 79, 67, 60, 45, 25, 10], color: "#8a4a4a" },
      { label: "Renovables", data: [17, 18, 28, 32, 45, 60, 75], color: "#a17c1c" },
      { label: "Nuclear", data: [1, 2, 5, 5, 7, 10, 12], color: "#6b4e8e" },
      { label: "Gas", data: [4, 1, 3, 3, 3, 5, 3], color: "#0b5394" }
    ],
    historico_cita: "Doble objetivo: pico de emisiones antes de 2030, neutralidad en 2060.",
    hitos_titulo: "Hitos del Régimen Energético",
    hitos: [
      { anio: "1993", evento: "China pasa a ser importador neto de petróleo." },
      { anio: "2003", evento: "Hu Jintao plantea el \"dilema de Malaca\"." },
      { anio: "2009", evento: "Inicio de la Presa de las Tres Gargantas a plena capacidad." },
      { anio: "2013", evento: "Lanzamiento de la Franja y la Ruta (energía)." },
      { anio: "2019", evento: "Inauguración de Power of Siberia (gas ruso)." },
      { anio: "2020", evento: "Anuncio del doble objetivo de carbono (2030/2060)." }
    ]
  },
  infraestructura: {
    src: "Mapa Leaflet · GEM",
    mapa_titulo: "Generación, importación y SLOC",
    pines: [
      { lat: 30.82, lng: 111.0, tipo: "almacenamiento", nombre: "Presa Tres Gargantas", desc: "Mayor central hidroeléctrica del mundo (22.5 GW)" },
      { lat: 46.6, lng: 125.0, tipo: "refineria", nombre: "Campo petrolero Daqing", desc: "Mayor yacimiento histórico de China" },
      { lat: 30.6, lng: 122.1, tipo: "gnl", nombre: "Terminal GNL Yangshan/Shanghái", desc: "Importación de GNL" },
      { lat: 21.93, lng: 112.97, tipo: "almacenamiento", nombre: "Nuclear Taishan (EPR)", desc: "Primeros EPR del mundo en operación" },
      { lat: 40.4, lng: 108.8, tipo: "minerales", nombre: "Base solar/eólica de Kubuqi (Gobi)", desc: "Megabases renovables del desierto" },
      { lat: 37.9, lng: 112.5, tipo: "minerales", nombre: "Carbón de Shanxi", desc: "Corazón carbonífero" },
      { lat: 2.5, lng: 101.4, tipo: "sloc", nombre: "Estrecho de Malaca", desc: "~80% del crudo importado pasa por aquí" },
      { lat: 15.0, lng: 114.0, tipo: "sloc", nombre: "Mar de China Meridional", desc: "Ruta y disputa estratégica" }
    ],
    rutas: [
      { puntos: [[26.0, 56.25], [10, 75], [2.5, 101.4], [22, 114], [30.6, 122.1]], tooltip: "SLOC: Golfo → Malaca → costa china" },
      { puntos: [[50.2, 127.5], [45, 124], [40, 116]], tooltip: "Power of Siberia (gas ruso por ducto)" }
    ],
    leyenda: [
      { color: "#c4570e", label: "Petróleo / refinerías" },
      { color: "#2e7d32", label: "Hidro" },
      { color: "#a17c1c", label: "Renovables / carbón" },
      { color: "#c62828", label: "SLOC críticos" }
    ],
    mapa_cita: "Coordenadas reales de Tres Gargantas, Daqing, Taishan, Kubuqi y los estrechos. <i>Fuentes: GEM 2024.</i>",
    vulnerabilidades_titulo: "Vulnerabilidades técnicas",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Dilema de Malaca</b> · la mayoría del crudo importado cruza un estrecho controlable por terceros." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Peso del carbón</b> · transición lenta del lado de la demanda industrial." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Integración de renovables</b> · curtailment y necesidad de almacenamiento/red." },
      { nivel: "low", tag: "MED", texto_html: "<b>Minerales críticos</b> · domina la cadena, pero depende de insumos importados (litio)." }
    ],
    capacidad_titulo: "Capacidad instalada (GW)",
    capacidad: {
      anios: ["2020", "2024", "2030", "2040"],
      y_titulo: "GW",
      series: [
        { label: "Carbón (GW)", tipo: "bar", data: [1080, 1170, 1100, 700], color: "#8a4a4a" },
        { label: "Solar/Eólica (GW)", tipo: "bar", data: [530, 1200, 2400, 4000], color: "#a17c1c" },
        { label: "Demanda pico (GW)", tipo: "line", data: [1100, 1450, 1800, 2300], color: "#c4570e" }
      ]
    },
    capacidad_cita: "Crecimiento histórico de renovables. <i>Fuente: NEA/IEA.</i>"
  },
  geopolitica: {
    src: "Radar APERC normalizado",
    radar_titulo: "Radar APERC: China vs EE.UU. vs India",
    radar: {
      ejes: ["Availability", "Accessibility", "Affordability", "Acceptability", "Sovereignty", "Robustness", "Resilience"],
      series: [
        { label: "China", data: [7.5, 4.5, 6.0, 4.0, 7.0, 6.5, 6.0], color: "#c4570e" },
        { label: "Estados Unidos", data: [9.0, 7.5, 7.0, 6.0, 8.0, 8.0, 8.0], color: "#0b5394" },
        { label: "India", data: [5.0, 3.5, 5.5, 3.5, 5.0, 5.0, 5.0], color: "#a17c1c" }
      ]
    },
    radar_cita: "Normalización min-max sobre indicadores §01.",
    dependencias_titulo: "Dependencias y socios",
    dependencias: [
      { vinculo: "Importación crudo Golfo Pérsico", pct: "45", riesgo: { texto: "Vía Malaca", pill: "danger" } },
      { vinculo: "Gas por ducto desde Rusia/Asia Central", pct: "—", riesgo: { texto: "Diversificación terrestre", pill: "ok" } },
      { vinculo: "Importación de litio", pct: "—", riesgo: { texto: "Insumo de baterías", pill: "warn" } },
      { vinculo: "Exportación de paneles/baterías", pct: "—", riesgo: { texto: "Dominio de la cadena", pill: "ok" } }
    ],
    dependencias_cita: "IEA; aduanas 2024.",
    minerales_titulo: "Dominio de la cadena de transición",
    minerales: [
      { valor: "#1", unidad: " mundial", etiqueta: "PANELES SOLARES" },
      { valor: "~75", unidad: "%", etiqueta: "BATERÍAS DE LITIO" },
      { valor: "~60", unidad: "%", etiqueta: "PROCESO DE TIERRAS RARAS" }
    ],
    minerales_cita: "IEA Critical Minerals 2024."
  },
  militar: {
    titulo_seccion: "Combustibles Militares y Rol Operacional del EPL",
    nav_label: "Combustibles militares",
    src: "IISS Military Balance 2024",
    combustibles_titulo: "Demanda de combustibles del EPL",
    combustibles: [
      { codigo: "RP-3 / Jet", tipo: "Queroseno de aviación", usuario: "Fuerza Aérea del EPL", ml_anio: "1500" },
      { codigo: "Diésel naval", tipo: "Diésel/fuelóleo", usuario: "Armada del EPL (PLAN)", ml_anio: "900" },
      { codigo: "Diésel terrestre", tipo: "Diésel", usuario: "Fuerzas Terrestres", ml_anio: "800" }
    ],
    combustibles_total: "~3200",
    combustibles_cita: "Estimación de orden de magnitud.",
    vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>SLOC de importación</b> · el suministro de crudo depende de rutas marítimas vulnerables a bloqueo." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Proyección naval</b> · necesidad de asegurar el Índico (\"collar de perlas\")." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Reservas operativas</b> · dependencia de SPR civil ante crisis." }
    ],
    mision_titulo: "Misión en Seguridad Energética",
    mision: [
      { titulo: "ASEGURAR SLOC", texto_html: "Desarrollo de la PLAN para proteger rutas del Índico y Malaca." },
      { titulo: "COLLAR DE PERLAS", texto_html: "Bases e instalaciones logísticas (Yibuti, Gwadar, Hambantota)." },
      { titulo: "DIVERSIFICACIÓN TERRESTRE", texto_html: "Ductos desde Rusia, Asia Central y Myanmar evitan Malaca." },
      { titulo: "RESERVAS Y AUTARQUÍA", texto_html: "SPR y dominio de la cadena renovable como resiliencia." }
    ],
    mision_cita: "IISS 2024; US DoD China Military Power Report."
  },
  politicas: {
    src: "NDRC · NEA",
    planes_titulo: "Planes nacionales",
    planes: [
      { nombre: "Doble objetivo de carbono", texto: "Pico de emisiones antes de 2030; neutralidad en 2060." },
      { nombre: "14º Plan Quinquenal", texto: "Megabases renovables en desiertos; nuclear; red ultra-alta tensión." },
      { nombre: "Reserva estratégica de petróleo (SPR)", texto: "Acumulación hacia el estándar IEA." },
      { nombre: "Franja y la Ruta (energía)", texto: "Ductos e inversión energética en Eurasia." }
    ],
    instituciones_titulo: "Instituciones clave",
    instituciones: [
      { sigla: "NDRC", texto: "comisión de planificación; precios de energía." },
      { sigla: "NEA", texto: "administración nacional de energía." },
      { sigla: "CNPC / Sinopec / CNOOC", texto: "petroleras estatales." },
      { sigla: "State Grid", texto: "mayor operador de red del mundo." }
    ],
    transicion_titulo: "Transición y economía",
    transicion_html: "<p>China apuesta a <b>dominar la cadena de la transición</b> (paneles, baterías, EV, procesamiento de minerales) mientras gestiona la salida gradual del carbón sin comprometer la seguridad de suministro.</p>",
    transicion_cita: "IEA 2024."
  },
  crisis: {
    src: "Wargaming · Cone of Plausibility",
    matriz_titulo: "Matriz Probabilidad × Impacto",
    matriz: {
      esquina: "Impacto ↓ / Prob →",
      prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
      filas: [
        { impacto: "Catastrófico", celdas: [{ nivel: 3 }, { nivel: 4 }, { nivel: 5, texto: "Bloqueo de Malaca" }, { nivel: 5, texto: "Conflicto Taiwán" }, { nivel: 5 }] },
        { impacto: "Mayor", celdas: [{ nivel: 2 }, { nivel: 3 }, { nivel: 4, texto: "Disrupción GNL" }, { nivel: 4 }, { nivel: 5 }] },
        { impacto: "Moderado", celdas: [{ nivel: 1 }, { nivel: 2 }, { nivel: 3, texto: "Curtailment renovable" }, { nivel: 4, texto: "Sequía hidro" }, { nivel: 4 }] },
        { impacto: "Menor", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 3 }, { nivel: 3 }] },
        { impacto: "Insignif.", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 2 }] }
      ]
    },
    matriz_cita: "Escala HM Treasury Orange Book.",
    escenarios_titulo: "Escenarios calibrados",
    escenarios: [
      { nivel: "high", tag: "A", texto_html: "<b>Bloqueo de Malaca</b> — corte del crudo importado. <i>Respuesta:</i> SPR, ductos terrestres, racionamiento priorizado." },
      { nivel: "high", tag: "B", texto_html: "<b>Contingencia Taiwán</b> — sanciones y disrupción de SLOC. <i>Respuesta:</i> autarquía relativa (carbón+renovables)." },
      { nivel: "med", tag: "C", texto_html: "<b>Sequía + ola de calor</b> — caída hidro y pico de demanda (Sichuan 2022). <i>Respuesta:</i> carbón de respaldo, gestión de demanda." },
      { nivel: "med", tag: "D", texto_html: "<b>Cuello de litio</b> — restricción de insumos de baterías. <i>Respuesta:</i> reciclaje, inversiones mineras externas." }
    ],
    vectores_titulo: "Respuesta estratégica integrada — vectores",
    vectores: [
      { titulo: "DIVERSIFICAR RUTAS", texto: "Ductos terrestres para evitar Malaca." },
      { titulo: "RENOVABLES + RED", texto: "Megabases y red de ultra-alta tensión." },
      { titulo: "SPR", texto: "Reservas estratégicas de petróleo y gas." },
      { titulo: "DOMINIO DE CADENA", texto: "Baterías, paneles, EV y minerales críticos." }
    ]
  },
  referencias: {
    src: "Triangulación multi-fuente",
    titulo: "Fuentes primarias y académicas",
    items: [
      "IEA (2024). <i>China Energy Profile / World Energy Outlook</i>. París.",
      "Ember (2024). <i>Electricity Data Explorer</i>.",
      "IEA (2024). <i>Critical Minerals Market Review</i>.",
      "US DoD (2024). <i>China Military Power Report</i>.",
      "APERC (2007). <i>A Quest for Energy Security in the 21st Century</i>. Tokio."
    ]
  },
  footer: "Documento de sustentación · Rúbrica Slide18 · Logística Militar · Mayo 2026"
});

/* === FRANCIA ============================================================ */
P({
  schema_version: "1.0.0",
  meta: {
    pais: "Francia", pais_iso: "FRA", pais_iso2: "FR", subtitulo_pais: "República",
    eyebrow: "Portafolio · Seguridad Energética por País",
    titulo: "Seguridad Energética de Francia:<br/>soberanía nuclear y dependencia de hidrocarburos",
    subtitulo: "Caso atípico de descarbonización vía energía nuclear (~65-70% de la electricidad): fuerte soberanía eléctrica frente a una dependencia casi total de petróleo, gas y uranio importados.",
    estudiante: "Cátedra (ejemplo de referencia)", asignatura: "Logística Militar · Rúbrica Slide18",
    tipo_doc: "Documento de sustentación", fecha: "Mayo 2026",
    fuerzas_armadas: "Fuerzas Armadas Francesas", aperc_global: 7.7,
    cita_corta: "IEA, 2024; RTE, 2024; EDF.",
    portafolio_label: "Rúbrica Slide18<br/>Logística Militar<br/>v2 — académica",
    map_view: { lat: 46.5, lng: 2.5, zoom: 5 }
  },
  resumen: {
    tesis_html: "Francia es el <b>caso nuclear</b>: 56 reactores (EDF) generan ~65-70% de su electricidad, con baja intensidad de carbono y fuerte soberanía eléctrica. Pero importa <i>casi todo</i> el petróleo y el gas, y el <b>uranio</b> (Níger, Kazajistán, Canadá, Australia). El reto: envejecimiento del parque (corrosión 2022) y la relance con nuevos <b>EPR2</b>.",
    conclusion_html: "APERC <b>7.7/10</b>: alta <i>acceptability</i> (bajas emisiones) y <i>sovereignty</i> eléctrica, pero <i>availability</i> de fósiles importados limitada. El vínculo defensa-energía es directo: disuasión nuclear y autonomía estratégica.",
    kpis: [
      { valor: 68, unidad: "%", etiqueta: "Electricidad nuclear" },
      { valor: 56, unidad: "", etiqueta: "Reactores nucleares" },
      { valor: 56, unidad: "gCO₂/kWh", etiqueta: "Intensidad de carbono eléctrica" },
      { valor: 99, unidad: "%", etiqueta: "Petróleo y gas importados" }
    ]
  },
  aperc: {
    src: "APERC 2007 · IEA 2024",
    definicion_html: "<p>Francia maximiza la <i>acceptability</i> y la <i>sovereignty</i> en electricidad gracias al nucleoeléctrico, pero su <i>availability</i> de hidrocarburos es importada. El uranio importado es su dependencia upstream clave, mitigada por reservas y reprocesamiento (La Hague).</p>",
    definicion_cita: "IEA, France Energy Profile 2024.",
    scorecard_titulo: "Scorecard de Francia bajo APERC",
    scores: [
      { letra: "A", nombre: "vailability", desc: "Nuclear robusto; importa fósiles y uranio.", score: 7.5 },
      { letra: "A", nombre: "ccessibility", desc: "Diversifica proveedores de gas (Noruega/GNL).", score: 8.0 },
      { letra: "A", nombre: "ffordability", desc: "Tarifa regulada; crisis de precios 2022.", score: 7.0 },
      { letra: "A", nombre: "cceptability", desc: "Muy baja huella de carbono eléctrica.", score: 8.5 }
    ],
    scorecard_cita: "Scores propios sobre indicadores normalizados.",
    comparador: { pais_b: "Alemania", pais_c: "Noruega" },
    indicadores_titulo: "Indicadores cuantitativos aplicados",
    indicadores: [
      { indicador: "Intensidad de carbono (gCO₂/kWh)", definicion: "Generación", propio: "56", b: "380", c: "26", interp: { texto: "Muy baja", pill: "ok" } },
      { indicador: "Nuclear en electricidad (%)", definicion: "Generación", propio: "68", b: "0", c: "0", interp: { texto: "El más alto del mundo" } },
      { indicador: "Net Import Dep. fósiles (%)", definicion: "Petróleo+gas", propio: "99", b: "95", c: "−600%", interp: { texto: "Alta", pill: "warn" } },
      { indicador: "Disponibilidad del parque nuclear (%)", definicion: "Factor de carga", propio: "70", b: "—", c: "—", interp: { texto: "Recuperándose (corrosión 2022)" } }
    ],
    indicadores_nota: "Comparación con Alemania (salió de la nuclear) y Noruega (hidro)."
  },
  matriz: {
    src: "IEA · RTE 2024",
    primaria_titulo: "Energía Primaria (TPES, %)",
    primaria: [
      { label: "Nuclear", valor: 40, color: "#6b4e8e" },
      { label: "Petróleo", valor: 28, color: "#c4570e" },
      { label: "Gas natural", valor: 16, color: "#0b5394" },
      { label: "Renovables", valor: 14, color: "#a17c1c" },
      { label: "Carbón", valor: 2, color: "#8a4a4a" }
    ],
    primaria_cita: "Nuclear 40 · Petróleo 28 · Gas 16 · Renov. 14 · Carbón 2. <i>Fuente: IEA 2024.</i>",
    electrica_titulo: "Generación Eléctrica (%)",
    electrica: [
      { label: "Nuclear", valor: 68, color: "#6b4e8e" },
      { label: "Hidro", valor: 11, color: "#2e7d32" },
      { label: "Eólica", valor: 9, color: "#6a8caf" },
      { label: "Solar", valor: 5, color: "#a17c1c" },
      { label: "Gas", valor: 5, color: "#0b5394" },
      { label: "Otros", valor: 2, color: "#4a5870" }
    ],
    electrica_cita: "Nuclear 68 · Hidro 11 · Eólica 9 · Solar 5 · Gas 5. <i>Fuente: RTE 2024.</i>",
    comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
    comparativa: {
      paises: ["Francia", "Alemania", "Noruega"],
      series: [
        { label: "Nuclear", data: [68, 0, 0], color: "#6b4e8e" },
        { label: "Hidro", data: [11, 4, 88], color: "#2e7d32" },
        { label: "Eólica", data: [9, 27, 9], color: "#6a8caf" },
        { label: "Solar", data: [5, 12, 0], color: "#a17c1c" },
        { label: "Gas", data: [5, 14, 1], color: "#0b5394" },
        { label: "Carbón", data: [1, 25, 0], color: "#8a4a4a" }
      ]
    },
    comparativa_nota: "Francia (nuclear) vs Alemania (renovables+carbón) vs Noruega (hidro): tres caminos a baja/alta emisión."
  },
  sankey: {
    src: "Producción → Transformación → Uso final",
    titulo_panel: "Flujos físicos de energía, Francia (PJ aprox.)",
    flujos: [
      { from: "Uranio importado", to: "Generación nuclear", flow: 4500 },
      { from: "Generación nuclear", to: "Electricidad", flow: 4200 },
      { from: "Generación nuclear", to: "Exportación eléctrica", flow: 600 },
      { from: "Petróleo importado", to: "Refinación local", flow: 3000 },
      { from: "Refinación local", to: "Transporte", flow: 2600 },
      { from: "Gas importado", to: "Industria & residencial", flow: 1800 },
      { from: "Renovables (hidro/eólica)", to: "Electricidad", flow: 1100 },
      { from: "Electricidad", to: "Industria & residencial", flow: 4700 }
    ],
    nodos: {
      "Uranio importado": { color: "#6b4e8e", label: "Uranio importado" },
      "Generación nuclear": { color: "#6b4e8e", label: "Generación nuclear" },
      "Petróleo importado": { color: "#c4570e", label: "Petróleo importado" },
      "Gas importado": { color: "#0b5394", label: "Gas importado" },
      "Renovables (hidro/eólica)": { color: "#2e7d32", label: "Renovables" },
      "Refinación local": { color: "#c4570e", label: "Refinerías" },
      "Electricidad": { color: "#a17c1c", label: "Electricidad" },
      "Exportación eléctrica": { color: "#2e7d32", label: "EXPORT · Electricidad" },
      "Industria & residencial": { color: "#4a5870", label: "Industria + Residencial" },
      "Transporte": { color: "#c4570e", label: "Transporte" }
    },
    cita: "Francia es exportador neto de electricidad gracias al nuclear, pero importa todo el uranio y los fósiles. <i>Datos estilizados.</i>"
  },
  evolucion: {
    src: "1970–2050 · relance du nucléaire",
    historico_titulo: "Mix Eléctrico Histórico y Proyectado (%)",
    anios: ["1980", "2000", "2015", "2024", "2035", "2050"],
    series: [
      { label: "Nuclear", data: [24, 77, 76, 68, 60, 50], color: "#6b4e8e" },
      { label: "Hidro", data: [30, 14, 11, 11, 10, 9], color: "#2e7d32" },
      { label: "Renovables (eól/sol)", data: [0, 1, 6, 14, 28, 40], color: "#a17c1c" },
      { label: "Fósiles", data: [46, 8, 7, 7, 2, 1], color: "#8a4a4a" }
    ],
    historico_cita: "Plan Messmer (1974) creó el parque nuclear; la relance prevé 6+8 EPR2.",
    hitos_titulo: "Hitos del Régimen Energético",
    hitos: [
      { anio: "1974", evento: "Plan Messmer: gran programa nuclear tras la crisis del petróleo." },
      { anio: "1986", evento: "La Hague consolida el reprocesamiento de combustible." },
      { anio: "2015", evento: "Ley de Transición Energética (objetivo de reducir nuclear, luego revertido)." },
      { anio: "2022", evento: "Corrosión bajo tensión: baja disponibilidad del parque; crisis de precios." },
      { anio: "2023", evento: "Relance du nucléaire: 6 EPR2 (opción a 8) + renovables." },
      { anio: "2024", evento: "EPR de Flamanville conectado a la red." }
    ]
  },
  infraestructura: {
    src: "Mapa Leaflet · GEM",
    mapa_titulo: "Reactores, terminales y reprocesamiento",
    pines: [
      { lat: 51.01, lng: 2.14, tipo: "almacenamiento", nombre: "Central nuclear Gravelines", desc: "Mayor central nuclear de Europa occidental (EDF)" },
      { lat: 49.54, lng: -1.88, tipo: "almacenamiento", nombre: "EPR Flamanville", desc: "Reactor EPR conectado en 2024" },
      { lat: 49.68, lng: -1.88, tipo: "minerales", nombre: "La Hague (Orano)", desc: "Planta de reprocesamiento de combustible" },
      { lat: 44.33, lng: 4.73, tipo: "almacenamiento", nombre: "Central Tricastin", desc: "Nuclear + enriquecimiento de uranio" },
      { lat: 51.03, lng: 2.34, tipo: "gnl", nombre: "Terminal GNL Dunkerque", desc: "Importación de GNL (Norte)" },
      { lat: 43.42, lng: 4.86, tipo: "gnl", nombre: "Terminal GNL Fos-sur-Mer", desc: "Importación de GNL (Mediterráneo)" },
      { lat: 45.2, lng: 6.12, tipo: "minerales", nombre: "Hidro Grand'Maison (Alpes)", desc: "Bombeo · mayor central de bombeo de Francia" }
    ],
    rutas: [
      { puntos: [[60, 3], [55, 4], [51.03, 2.34]], tooltip: "GNL/gas desde Noruega y el Mar del Norte" }
    ],
    leyenda: [
      { color: "#6b4e8e", label: "Nuclear / enriquecimiento" },
      { color: "#0b5394", label: "Terminales GNL" },
      { color: "#2e7d32", label: "Hidro / bombeo" },
      { color: "#a17c1c", label: "Reprocesamiento" }
    ],
    mapa_cita: "Coordenadas reales de Gravelines, Flamanville, La Hague, Tricastin, Dunkerque y Fos. <i>Fuentes: GEM 2024.</i>",
    vulnerabilidades_titulo: "Vulnerabilidades técnicas",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Envejecimiento nuclear</b> · corrosión bajo tensión (2022) redujo la disponibilidad a mínimos históricos." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Uranio importado</b> · dependencia de Níger, Kazajistán, Canadá, Australia." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Petróleo y gas importados</b> · sin producción propia significativa." },
      { nivel: "low", tag: "MED", texto_html: "<b>Sequía</b> · el agua de refrigeración de reactores se restringe en olas de calor." }
    ],
    capacidad_titulo: "Capacidad instalada (GW)",
    capacidad: {
      anios: ["2024", "2030", "2040", "2050"],
      y_titulo: "GW",
      series: [
        { label: "Nuclear (GW)", tipo: "bar", data: [61, 63, 70, 75], color: "#6b4e8e" },
        { label: "Renovables (GW)", tipo: "bar", data: [40, 75, 120, 160], color: "#a17c1c" },
        { label: "Demanda pico (GW)", tipo: "line", data: [85, 90, 100, 110], color: "#c4570e" }
      ]
    },
    capacidad_cita: "Relance: nuevos EPR2 + crecimiento renovable. <i>Fuente: RTE Futurs énergétiques 2050.</i>"
  },
  geopolitica: {
    src: "Radar APERC normalizado",
    radar_titulo: "Radar APERC: Francia vs Alemania vs Noruega",
    radar: {
      ejes: ["Availability", "Accessibility", "Affordability", "Acceptability", "Sovereignty", "Robustness", "Resilience"],
      series: [
        { label: "Francia", data: [7.5, 8.0, 7.0, 8.5, 8.0, 7.5, 7.5], color: "#0b5394" },
        { label: "Alemania", data: [5.5, 6.0, 6.5, 7.2, 5.5, 6.0, 6.5], color: "#8a4a4a" },
        { label: "Noruega", data: [9.0, 8.5, 7.5, 9.5, 9.0, 9.0, 9.0], color: "#2e7d32" }
      ]
    },
    radar_cita: "Normalización min-max sobre indicadores §01.",
    dependencias_titulo: "Dependencias y socios",
    dependencias: [
      { vinculo: "Uranio de Níger/Kazajistán/Canadá", pct: "—", riesgo: { texto: "Diversificado, golpe en Níger", pill: "warn" } },
      { vinculo: "Gas de Noruega/GNL (EE.UU./Catar)", pct: "—", riesgo: { texto: "Diversificado post-Rusia", pill: "ok" } },
      { vinculo: "Exportación eléctrica a la UE", pct: "—", riesgo: { texto: "Exportador neto", pill: "ok" } },
      { vinculo: "Interconexión con Alemania/España", pct: "—", riesgo: { texto: "Resiliencia de red", pill: "ok" } }
    ],
    dependencias_cita: "RTE; Orano 2024.",
    minerales_titulo: "Posición energética global",
    minerales: [
      { valor: "#1", unidad: " mundial", etiqueta: "% NUCLEAR EN ELECTRICIDAD" },
      { valor: "56", unidad: " gCO₂/kWh", etiqueta: "INTENSIDAD DE CARBONO" },
      { valor: "#1", unidad: " UE", etiqueta: "EXPORTADOR DE ELECTRICIDAD" }
    ],
    minerales_cita: "RTE; Ember 2024."
  },
  militar: {
    titulo_seccion: "Combustibles Militares y Rol Operacional de las Fuerzas Armadas Francesas",
    nav_label: "Combustibles militares",
    src: "IISS · Ministère des Armées",
    combustibles_titulo: "Demanda de combustibles de las Armées",
    combustibles: [
      { codigo: "F-34 (JP-8)", tipo: "Queroseno militar", usuario: "Armée de l'Air", ml_anio: "500" },
      { codigo: "F-44 (JP-5)", tipo: "Queroseno alto flash", usuario: "Aéronavale (PA Charles de Gaulle)", ml_anio: "120" },
      { codigo: "F-76", tipo: "Diésel naval", usuario: "Marine nationale", ml_anio: "150" }
    ],
    combustibles_total: "~770",
    combustibles_cita: "Estimación de orden de magnitud.",
    vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa",
    vulnerabilidades: [
      { nivel: "med", tag: "ALTO", texto_html: "<b>Combustible importado</b> · dependencia de derivados para operaciones expedicionarias (Sahel, Índico)." },
      { nivel: "low", tag: "MED", texto_html: "<b>Cadena del uranio</b> · golpe de Estado en Níger (2023) elevó el foco en el suministro." },
      { nivel: "low", tag: "MED", texto_html: "<b>Resiliencia de bases</b> · transición de bases a energías limpias en curso." }
    ],
    mision_titulo: "Misión en Seguridad Energética",
    mision: [
      { titulo: "DISUASIÓN NUCLEAR", texto_html: "La <i>force de dissuasion</i> sustenta la autonomía estratégica; sinergia con la industria nuclear civil." },
      { titulo: "AUTONOMÍA ESTRATÉGICA", texto_html: "Independencia eléctrica como pilar de soberanía nacional y europea." },
      { titulo: "PROYECCIÓN EXTERIOR", texto_html: "Logística de combustible para operaciones en África e Indo-Pacífico." },
      { titulo: "SEGURIDAD DEL URANIO", texto_html: "Diversificación de proveedores y reservas estratégicas." }
    ],
    mision_cita: "IISS 2024; Ministère des Armées."
  },
  politicas: {
    src: "DGEC · RTE · CEA",
    planes_titulo: "Planes nacionales",
    planes: [
      { nombre: "Relance du nucléaire (2022)", texto: "6 reactores EPR2, con opción a 8 adicionales." },
      { nombre: "PPE", texto: "Programación plurianual de la energía: nuclear + renovables." },
      { nombre: "SNBC", texto: "Estrategia nacional baja en carbono: neutralidad 2050." },
      { nombre: "Plan de sobriété énergétique", texto: "Reducción de demanda tras la crisis de 2022." }
    ],
    instituciones_titulo: "Instituciones clave",
    instituciones: [
      { sigla: "EDF", texto: "operador (re-nacionalizado) del parque nuclear." },
      { sigla: "Orano", texto: "ciclo del combustible (minería, enriquecimiento, La Hague)." },
      { sigla: "RTE", texto: "operador de la red de transmisión." },
      { sigla: "CEA / ASN", texto: "investigación y seguridad nuclear." }
    ],
    transicion_titulo: "Transición y economía",
    transicion_html: "<p>Francia apuesta a un modelo <b>nuclear + renovables</b> para mantener baja intensidad de carbono y soberanía, mientras moderniza un parque envejecido y descarboniza transporte e industria por electrificación.</p>",
    transicion_cita: "RTE Futurs énergétiques 2050."
  },
  crisis: {
    src: "Wargaming · Cone of Plausibility",
    matriz_titulo: "Matriz Probabilidad × Impacto",
    matriz: {
      esquina: "Impacto ↓ / Prob →",
      prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
      filas: [
        { impacto: "Catastrófico", celdas: [{ nivel: 3 }, { nivel: 4 }, { nivel: 5, texto: "Parada masiva nuclear" }, { nivel: 5 }, { nivel: 5 }] },
        { impacto: "Mayor", celdas: [{ nivel: 2 }, { nivel: 3 }, { nivel: 4, texto: "Crisis de gas" }, { nivel: 4, texto: "Corrosión del parque" }, { nivel: 5 }] },
        { impacto: "Moderado", celdas: [{ nivel: 1 }, { nivel: 2 }, { nivel: 3, texto: "Ola de calor (refrig.)" }, { nivel: 4, texto: "Golpe en Níger (uranio)" }, { nivel: 4 }] },
        { impacto: "Menor", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 3 }, { nivel: 3 }] },
        { impacto: "Insignif.", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 2 }] }
      ]
    },
    matriz_cita: "Escala HM Treasury Orange Book.",
    escenarios_titulo: "Escenarios calibrados",
    escenarios: [
      { nivel: "high", tag: "A", texto_html: "<b>Parada masiva del parque</b> — defecto genérico (corrosión). <i>Respuesta:</i> importación UE, sobriété, renovables." },
      { nivel: "med", tag: "B", texto_html: "<b>Crisis de gas</b> — corte de suministro. <i>Respuesta:</i> GNL diversificado, electrificación, reservas." },
      { nivel: "med", tag: "C", texto_html: "<b>Ola de calor</b> — restricción de refrigeración de reactores. <i>Respuesta:</i> gestión de ríos, importación puntual." },
      { nivel: "med", tag: "D", texto_html: "<b>Inestabilidad en el Sahel</b> — riesgo en el uranio. <i>Respuesta:</i> diversificar minas y reservas." }
    ],
    vectores_titulo: "Respuesta estratégica integrada — vectores",
    vectores: [
      { titulo: "RELANCE NUCLEAR", texto: "EPR2 y extensión de vida útil del parque." },
      { titulo: "RENOVABLES", texto: "Eólica marina y solar para complementar." },
      { titulo: "DIVERSIFICAR GAS", texto: "GNL (EE.UU./Catar) y Noruega tras Rusia." },
      { titulo: "AUTONOMÍA EUROPEA", texto: "Interconexiones y soberanía industrial del ciclo nuclear." }
    ]
  },
  referencias: {
    src: "Triangulación multi-fuente",
    titulo: "Fuentes primarias y académicas",
    items: [
      "IEA (2024). <i>France Energy Profile</i>. París.",
      "RTE (2022). <i>Futurs énergétiques 2050</i>.",
      "EDF / Orano (2024). Reportes anuales.",
      "IISS (2024). <i>The Military Balance</i>.",
      "APERC (2007). <i>A Quest for Energy Security in the 21st Century</i>. Tokio."
    ]
  },
  footer: "Documento de sustentación · Rúbrica Slide18 · Logística Militar · Mayo 2026"
});

/* === ESTADOS UNIDOS ===================================================== */
P({
  schema_version: "1.0.0",
  meta: {
    pais: "Estados Unidos", pais_iso: "USA", pais_iso2: "US", subtitulo_pais: "Estados Unidos de",
    eyebrow: "Portafolio · Seguridad Energética por País",
    titulo: "Seguridad Energética de Estados Unidos:<br/>la revolución del esquisto y el dominio energético",
    subtitulo: "Mayor productor mundial de petróleo y gas y a la vez mayor consumidor: exportador neto de GNL con un mix diversificado, pero con retos de resiliencia de red y ciberseguridad.",
    estudiante: "Cátedra (ejemplo de referencia)", asignatura: "Logística Militar · Rúbrica Slide18",
    tipo_doc: "Documento de sustentación", fecha: "Mayo 2026",
    fuerzas_armadas: "Fuerzas Armadas de los EE.UU.", aperc_global: 7.8,
    cita_corta: "EIA, 2024; IEA, 2024.",
    portafolio_label: "Rúbrica Slide18<br/>Logística Militar<br/>v2 — académica",
    map_view: { lat: 39.5, lng: -98.5, zoom: 4 }
  },
  resumen: {
    tesis_html: "La <b>revolución del esquisto</b> convirtió a EE.UU. en el <i>mayor productor mundial</i> de petróleo y gas y en exportador neto de GNL, con un mix diversificado (gas, renovables en alza, gran flota nuclear, carbón en declive) y una <b>SPR</b> estratégica. Sus vulnerabilidades son internas: resiliencia de la red (apagón de Texas 2021) y ciberseguridad (Colonial Pipeline 2021).",
    conclusion_html: "APERC <b>7.8/10</b>: alta <i>availability</i>, <i>sovereignty</i> y <i>resilience</i>; menor <i>acceptability</i> por emisiones aún elevadas. El componente militar protege SLOC globales y posee la mayor logística de combustible del mundo (DLA Energy).",
    kpis: [
      { valor: 13, unidad: "Mb/d", etiqueta: "Producción de crudo" },
      { valor: 1, unidad: "º", etiqueta: "Exportador de GNL" },
      { valor: 60, unidad: "%", etiqueta: "Mix eléctrico fósil" },
      { valor: 18, unidad: "%", etiqueta: "Electricidad nuclear" }
    ]
  },
  aperc: {
    src: "APERC 2007 · EIA 2024",
    definicion_html: "<p>EE.UU. logró <i>availability</i> y <i>sovereignty</i> tras el esquisto, pasando de gran importador a exportador neto. Su agenda gira hacia <i>resilience</i> de red y ciberseguridad, y hacia la <i>acceptability</i> (IRA, renovables, EV).</p>",
    definicion_cita: "EIA, Annual Energy Outlook 2024.",
    scorecard_titulo: "Scorecard de EE.UU. bajo APERC",
    scores: [
      { letra: "A", nombre: "vailability", desc: "Mayor productor de petróleo y gas; gran nuclear.", score: 9.0 },
      { letra: "A", nombre: "ccessibility", desc: "Autosuficiente; exportador neto de GNL.", score: 7.5 },
      { letra: "A", nombre: "ffordability", desc: "Energía relativamente barata; volatilidad.", score: 7.0 },
      { letra: "A", nombre: "cceptability", desc: "Emisiones aún altas; transición vía IRA.", score: 7.7 }
    ],
    scorecard_cita: "Scores propios sobre indicadores normalizados.",
    comparador: { pais_b: "China", pais_c: "Noruega" },
    indicadores_titulo: "Indicadores cuantitativos aplicados",
    indicadores: [
      { indicador: "Net Import Dep. (%)", definicion: "(Imp−Exp)/Consumo", propio: "−8%", b: "20%", c: "−600%", interp: { texto: "Exportador neto", pill: "ok" } },
      { indicador: "Producción de crudo (Mb/d)", definicion: "2024", propio: "13", b: "4", c: "1.8", interp: { texto: "El mayor del mundo" } },
      { indicador: "Días de SPR petróleo", definicion: "Reserva estratégica", propio: "—", b: "90", c: "—", interp: { texto: "SPR reducida tras 2022", pill: "warn" } },
      { indicador: "Intensidad de carbono (gCO₂/kWh)", definicion: "Generación", propio: "370", b: "530", c: "26", interp: { texto: "Media, en mejora" } }
    ],
    indicadores_nota: "Comparación con China (rival/importador) y Noruega (descarbonizado)."
  },
  matriz: {
    src: "EIA · Ember 2024",
    primaria_titulo: "Energía Primaria (TPES, %)",
    primaria: [
      { label: "Petróleo", valor: 36, color: "#c4570e" },
      { label: "Gas natural", valor: 33, color: "#0b5394" },
      { label: "Renovables", valor: 13, color: "#a17c1c" },
      { label: "Nuclear", valor: 9, color: "#6b4e8e" },
      { label: "Carbón", valor: 9, color: "#8a4a4a" }
    ],
    primaria_cita: "Petróleo 36 · Gas 33 · Renov. 13 · Nuclear 9 · Carbón 9. <i>Fuente: EIA 2024.</i>",
    electrica_titulo: "Generación Eléctrica (%)",
    electrica: [
      { label: "Gas", valor: 43, color: "#0b5394" },
      { label: "Nuclear", valor: 18, color: "#6b4e8e" },
      { label: "Carbón", valor: 16, color: "#8a4a4a" },
      { label: "Eólica", valor: 10, color: "#6a8caf" },
      { label: "Solar", valor: 6, color: "#a17c1c" },
      { label: "Hidro", valor: 6, color: "#2e7d32" }
    ],
    electrica_cita: "Gas 43 · Nuclear 18 · Carbón 16 · Eólica 10 · Solar 6 · Hidro 6. <i>Fuente: Ember 2024.</i>",
    comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
    comparativa: {
      paises: ["Estados Unidos", "China", "Noruega"],
      series: [
        { label: "Gas", data: [43, 3, 1], color: "#0b5394" },
        { label: "Carbón", data: [16, 60, 0], color: "#8a4a4a" },
        { label: "Nuclear", data: [18, 5, 0], color: "#6b4e8e" },
        { label: "Hidro", data: [6, 14, 88], color: "#2e7d32" },
        { label: "Solar/Eólica", data: [16, 18, 11], color: "#a17c1c" }
      ]
    },
    comparativa_nota: "Gas como columna del mix estadounidense desde el esquisto."
  },
  sankey: {
    src: "Producción → Transformación → Uso final",
    titulo_panel: "Flujos físicos de energía, EE.UU. (PJ aprox.)",
    flujos: [
      { from: "Petróleo (esquisto)", to: "Refinación local", flow: 9000 },
      { from: "Petróleo (esquisto)", to: "Exportación de crudo", flow: 2500 },
      { from: "Refinación local", to: "Transporte", flow: 8000 },
      { from: "Gas natural (esquisto)", to: "Generación eléctrica", flow: 6000 },
      { from: "Gas natural (esquisto)", to: "Exportación GNL", flow: 3000 },
      { from: "Gas natural (esquisto)", to: "Industria & residencial", flow: 4000 },
      { from: "Nuclear", to: "Generación eléctrica", flow: 2500 },
      { from: "Renovables", to: "Generación eléctrica", flow: 2200 },
      { from: "Generación eléctrica", to: "Industria & residencial", flow: 9500 }
    ],
    nodos: {
      "Petróleo (esquisto)": { color: "#c4570e", label: "Petróleo (esquisto)" },
      "Gas natural (esquisto)": { color: "#0b5394", label: "Gas (esquisto)" },
      "Nuclear": { color: "#6b4e8e", label: "Nuclear" },
      "Renovables": { color: "#a17c1c", label: "Renovables" },
      "Refinación local": { color: "#c4570e", label: "Refinerías" },
      "Generación eléctrica": { color: "#6b4e8e", label: "Generación eléctrica" },
      "Exportación de crudo": { color: "#8a4a4a", label: "EXPORT · Crudo" },
      "Exportación GNL": { color: "#0b5394", label: "EXPORT · GNL" },
      "Industria & residencial": { color: "#4a5870", label: "Industria + Residencial" },
      "Transporte": { color: "#c4570e", label: "Transporte" }
    },
    cita: "El esquisto hace a EE.UU. exportador neto de crudo y GNL. <i>Datos estilizados sobre EIA.</i>"
  },
  evolucion: {
    src: "2000–2050 · esquisto e IRA",
    historico_titulo: "Mix Eléctrico Histórico y Proyectado (%)",
    anios: ["2000", "2010", "2020", "2024", "2035", "2050"],
    series: [
      { label: "Carbón", data: [52, 45, 19, 16, 5, 1], color: "#8a4a4a" },
      { label: "Gas", data: [16, 24, 40, 43, 38, 30], color: "#0b5394" },
      { label: "Nuclear", data: [20, 19, 20, 18, 16, 14], color: "#6b4e8e" },
      { label: "Renovables", data: [9, 10, 20, 22, 40, 54], color: "#a17c1c" }
    ],
    historico_cita: "El carbón cede ante gas y renovables; la IRA (2022) acelera la transición.",
    hitos_titulo: "Hitos del Régimen Energético",
    hitos: [
      { anio: "1975", evento: "Creación de la Reserva Estratégica de Petróleo (SPR)." },
      { anio: "2008", evento: "Despegue del fracking (esquisto): gas y petróleo." },
      { anio: "2016", evento: "Levantamiento de la prohibición de exportar crudo." },
      { anio: "2021", evento: "Apagón de Texas (Uri); ciberataque a Colonial Pipeline." },
      { anio: "2022", evento: "Inflation Reduction Act (IRA): mayor impulso climático de la historia de EE.UU." },
      { anio: "2023", evento: "EE.UU. consolidado como mayor exportador de GNL." }
    ]
  },
  infraestructura: {
    src: "Mapa Leaflet · GEM",
    mapa_titulo: "Cuencas, hubs y terminales",
    pines: [
      { lat: 31.8, lng: -102.3, tipo: "refineria", nombre: "Cuenca Pérmica", desc: "Mayor zona productora de petróleo de esquisto" },
      { lat: 29.73, lng: -93.87, tipo: "gnl", nombre: "Sabine Pass LNG", desc: "Mayor terminal de exportación de GNL" },
      { lat: 30.0, lng: -92.3, tipo: "gnl", nombre: "Henry Hub", desc: "Referencia de precio del gas en EE.UU." },
      { lat: 35.97, lng: -96.77, tipo: "almacenamiento", nombre: "Hub de Cushing (OK)", desc: "Punto de entrega del WTI" },
      { lat: 33.39, lng: -112.86, tipo: "minerales", nombre: "Nuclear Palo Verde", desc: "Mayor central nuclear de EE.UU." },
      { lat: 36.02, lng: -114.74, tipo: "almacenamiento", nombre: "Presa Hoover", desc: "Hidroeléctrica histórica" },
      { lat: 47.8, lng: -103.3, tipo: "refineria", nombre: "Bakken (ND)", desc: "Esquisto del norte" }
    ],
    rutas: [
      { puntos: [[29.73, -93.87], [25, -90], [20, -85], [9, -79.6]], tooltip: "SLOC: Golfo de México → Canal de Panamá" }
    ],
    leyenda: [
      { color: "#c4570e", label: "Petróleo / cuencas" },
      { color: "#0b5394", label: "Gas / GNL" },
      { color: "#6b4e8e", label: "Nuclear" },
      { color: "#2e7d32", label: "Hidro" }
    ],
    mapa_cita: "Coordenadas reales de Pérmica, Sabine Pass, Henry Hub, Cushing, Palo Verde, Hoover y Bakken. <i>Fuentes: EIA; GEM.</i>",
    vulnerabilidades_titulo: "Vulnerabilidades técnicas",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Resiliencia de red</b> · redes regionales (ERCOT) aisladas; apagón de Texas 2021." },
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Ciberseguridad</b> · ataque a Colonial Pipeline (2021) detuvo el suministro de la costa Este." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>SPR reducida</b> · liberaciones de 2022 bajaron la reserva a mínimos." },
      { nivel: "low", tag: "MED", texto_html: "<b>Permisos de transmisión</b> · cuellos para conectar renovables." }
    ],
    capacidad_titulo: "Capacidad instalada (GW)",
    capacidad: {
      anios: ["2024", "2030", "2040", "2050"],
      y_titulo: "GW",
      series: [
        { label: "Fósil (GW)", tipo: "bar", data: [800, 700, 500, 350], color: "#8a4a4a" },
        { label: "Renovables (GW)", tipo: "bar", data: [400, 750, 1200, 1700], color: "#a17c1c" },
        { label: "Demanda pico (GW)", tipo: "line", data: [780, 850, 980, 1150], color: "#c4570e" }
      ]
    },
    capacidad_cita: "Crecimiento renovable impulsado por la IRA. <i>Fuente: EIA AEO 2024.</i>"
  },
  geopolitica: {
    src: "Radar APERC normalizado",
    radar_titulo: "Radar APERC: EE.UU. vs China vs Noruega",
    radar: {
      ejes: ["Availability", "Accessibility", "Affordability", "Acceptability", "Sovereignty", "Robustness", "Resilience"],
      series: [
        { label: "Estados Unidos", data: [9.0, 7.5, 7.0, 7.7, 8.0, 8.0, 8.0], color: "#0b5394" },
        { label: "China", data: [7.5, 4.5, 6.0, 4.0, 7.0, 6.5, 6.0], color: "#c4570e" },
        { label: "Noruega", data: [9.0, 8.5, 7.5, 9.5, 9.0, 9.0, 9.0], color: "#2e7d32" }
      ]
    },
    radar_cita: "Normalización min-max sobre indicadores §01.",
    dependencias_titulo: "Dependencias y socios",
    dependencias: [
      { vinculo: "Exportación de GNL a Europa/Asia", pct: "—", riesgo: { texto: "Palanca geopolítica", pill: "ok" } },
      { vinculo: "Importación de crudo de Canadá", pct: "60", riesgo: { texto: "Vecino estable", pill: "ok" } },
      { vinculo: "Minerales críticos de China", pct: "—", riesgo: { texto: "Concentración de cadena", pill: "warn" } },
      { vinculo: "Integración de red con Canadá/México", pct: "—", riesgo: { texto: "Resiliencia regional", pill: "ok" } }
    ],
    dependencias_cita: "EIA; USGS 2024.",
    minerales_titulo: "Posición energética global",
    minerales: [
      { valor: "#1", unidad: " mundial", etiqueta: "PRODUCTOR DE PETRÓLEO Y GAS" },
      { valor: "#1", unidad: " export.", etiqueta: "GNL" },
      { valor: "94", unidad: "", etiqueta: "REACTORES NUCLEARES" }
    ],
    minerales_cita: "EIA 2024."
  },
  militar: {
    titulo_seccion: "Combustibles Militares y Rol Operacional de las Fuerzas Armadas de EE.UU.",
    nav_label: "Combustibles militares",
    src: "DLA Energy · DoD",
    combustibles_titulo: "Demanda de combustibles de las FF.AA.",
    combustibles: [
      { codigo: "JP-8 / F-24", tipo: "Queroseno militar", usuario: "Air Force / Army", ml_anio: "9000" },
      { codigo: "F-44 (JP-5)", tipo: "Queroseno alto flash", usuario: "Navy (portaaviones)", ml_anio: "2500" },
      { codigo: "F-76", tipo: "Diésel naval", usuario: "Navy (buques)", ml_anio: "3000" }
    ],
    combustibles_total: "~14500",
    combustibles_cita: "El DoD es el mayor consumidor institucional de combustible del mundo (DLA Energy).",
    vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa",
    vulnerabilidades: [
      { nivel: "med", tag: "ALTO", texto_html: "<b>Logística global</b> · cadena de combustible expedicionaria extensa y costosa de proteger." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Ciber-OT</b> · redes e infraestructura crítica como objetivo de adversarios." },
      { nivel: "low", tag: "MED", texto_html: "<b>Microrredes en bases</b> · dependencia de la red civil; programas de resiliencia en curso." }
    ],
    mision_titulo: "Misión en Seguridad Energética",
    mision: [
      { titulo: "PROTECCIÓN DE SLOC", texto_html: "La US Navy asegura las rutas marítimas globales (Ormuz, Malaca, Bab el-Mandeb)." },
      { titulo: "DLA ENERGY", texto_html: "Mayor logística de combustible del mundo para operaciones globales." },
      { titulo: "RESILIENCIA DE BASES", texto_html: "Microrredes y energías limpias para continuidad operativa." },
      { titulo: "DOMINIO ENERGÉTICO", texto_html: "El GNL como herramienta de política exterior (\"freedom gas\")." }
    ],
    mision_cita: "DoD Operational Energy Strategy; DLA Energy."
  },
  politicas: {
    src: "DOE · FERC · EIA",
    planes_titulo: "Planes nacionales",
    planes: [
      { nombre: "Inflation Reduction Act 2022", texto: "~370 mil M USD para energía limpia y manufactura." },
      { nombre: "Bipartisan Infrastructure Law", texto: "Red, transmisión, hidrógeno y captura de carbono." },
      { nombre: "Strategic Petroleum Reserve", texto: "Reserva estratégica; recompra tras liberaciones 2022." },
      { nombre: "Hubs de hidrógeno", texto: "Siete hubs regionales de H₂." }
    ],
    instituciones_titulo: "Instituciones clave",
    instituciones: [
      { sigla: "DOE", texto: "departamento de energía; SPR; I+D." },
      { sigla: "FERC", texto: "regulador de transmisión y mercados mayoristas." },
      { sigla: "NERC", texto: "fiabilidad de la red." },
      { sigla: "EIA", texto: "estadística y prospectiva energética." }
    ],
    transicion_titulo: "Transición y economía",
    transicion_html: "<p>EE.UU. combina <b>dominio fósil</b> (esquisto, GNL) con una transición acelerada por la IRA, buscando re-shoring de la manufactura limpia y reducir dependencia de China en minerales y baterías.</p>",
    transicion_cita: "EIA AEO 2024; DOE."
  },
  crisis: {
    src: "Wargaming · Cone of Plausibility",
    matriz_titulo: "Matriz Probabilidad × Impacto",
    matriz: {
      esquina: "Impacto ↓ / Prob →",
      prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
      filas: [
        { impacto: "Catastrófico", celdas: [{ nivel: 3 }, { nivel: 4 }, { nivel: 5, texto: "Ciberataque masivo a red" }, { nivel: 5 }, { nivel: 5 }] },
        { impacto: "Mayor", celdas: [{ nivel: 2 }, { nivel: 3 }, { nivel: 4, texto: "Huracán Golfo (refinerías)" }, { nivel: 4, texto: "Apagón regional" }, { nivel: 5 }] },
        { impacto: "Moderado", celdas: [{ nivel: 1 }, { nivel: 2 }, { nivel: 3, texto: "Ola de frío (ERCOT)" }, { nivel: 4 }, { nivel: 4 }] },
        { impacto: "Menor", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 3 }, { nivel: 3 }] },
        { impacto: "Insignif.", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 2 }] }
      ]
    },
    matriz_cita: "Escala HM Treasury Orange Book.",
    escenarios_titulo: "Escenarios calibrados",
    escenarios: [
      { nivel: "high", tag: "A", texto_html: "<b>Ciberataque a la red/ductos</b> — réplica de Colonial a mayor escala. <i>Respuesta:</i> CISA, segmentación OT, reservas." },
      { nivel: "high", tag: "B", texto_html: "<b>Evento extremo en ERCOT</b> — ola de frío/calor (Uri 2021). <i>Respuesta:</i> interconexión, reserva, weatherization." },
      { nivel: "med", tag: "C", texto_html: "<b>Huracán en el Golfo</b> — paro de refinerías y exportación. <i>Respuesta:</i> SPR, redundancia logística." },
      { nivel: "med", tag: "D", texto_html: "<b>Dependencia de minerales de China</b> — restricción de insumos. <i>Respuesta:</i> re-shoring, IRA, aliados." }
    ],
    vectores_titulo: "Respuesta estratégica integrada — vectores",
    vectores: [
      { titulo: "RESILIENCIA DE RED", texto: "Interconexión, weatherization y almacenamiento." },
      { titulo: "CIBERSEGURIDAD", texto: "Protección de sistemas OT/SCADA críticos." },
      { titulo: "DOMINIO GNL", texto: "Exportación como palanca geopolítica." },
      { titulo: "CADENAS LIMPIAS", texto: "Re-shoring de baterías y minerales (IRA)." }
    ]
  },
  referencias: {
    src: "Triangulación multi-fuente",
    titulo: "Fuentes primarias y académicas",
    items: [
      "EIA (2024). <i>Annual Energy Outlook</i>. Washington.",
      "IEA (2024). <i>United States Energy Profile</i>.",
      "DoD (2023). <i>Operational Energy Strategy</i>.",
      "Ember (2024). <i>Electricity Data Explorer</i>.",
      "APERC (2007). <i>A Quest for Energy Security in the 21st Century</i>. Tokio."
    ]
  },
  footer: "Documento de sustentación · Rúbrica Slide18 · Logística Militar · Mayo 2026"
});

/* === ALEMANIA =========================================================== */
P({
  schema_version: "1.0.0",
  meta: {
    pais: "Alemania", pais_iso: "DEU", pais_iso2: "DE", subtitulo_pais: "República Federal de",
    eyebrow: "Portafolio · Seguridad Energética por País",
    titulo: "Seguridad Energética de Alemania:<br/>Energiewende tras el shock del gas ruso",
    subtitulo: "Transición energética con salida nuclear y senda de salida del carbón: fuerte despliegue renovable frente a la dependencia histórica del gas ruso, reconfigurada de urgencia tras 2022.",
    estudiante: "Cátedra (ejemplo de referencia)", asignatura: "Logística Militar · Rúbrica Slide18",
    tipo_doc: "Documento de sustentación", fecha: "Mayo 2026",
    fuerzas_armadas: "Bundeswehr", aperc_global: 6.3,
    cita_corta: "IEA, 2024; AGEB, 2024; BNetzA.",
    portafolio_label: "Rúbrica Slide18<br/>Logística Militar<br/>v2 — académica",
    map_view: { lat: 51, lng: 10, zoom: 5 }
  },
  resumen: {
    tesis_html: "Alemania impulsa la <b>Energiewende</b>: salió de la energía nuclear (2023) y avanza hacia la salida del carbón con fuerte eólica y solar. Su talón de Aquiles era la <b>dependencia del gas ruso</b> (~55% del gas), que el shock de 2022 obligó a sustituir con terminales de GNL exprés (Wilhelmshaven) y diversificación. Retos: red, almacenamiento e industria electrointensiva.",
    conclusion_html: "APERC <b>6.3/10</b>: buena <i>acceptability</i> (renovables) pero <i>availability</i> y <i>sovereignty</i> golpeadas por importar casi todos los fósiles. La Bundeswehr enfoca resiliencia energética y compromisos OTAN.",
    kpis: [
      { valor: 55, unidad: "%", etiqueta: "Renovables en electricidad" },
      { valor: 0, unidad: "", etiqueta: "Reactores nucleares activos" },
      { valor: 95, unidad: "%", etiqueta: "Gas importado" },
      { valor: 6, unidad: "", etiqueta: "Terminales GNL (nuevas)" }
    ]
  },
  aperc: {
    src: "APERC 2007 · IEA 2024",
    definicion_html: "<p>Alemania prioriza la <i>acceptability</i> (descarbonización) pero el shock de 2022 expuso su débil <i>availability/sovereignty</i> al depender del gas ruso. La respuesta: GNL diversificado, aceleración renovable y debate sobre el respaldo (gas/hidrógeno).</p>",
    definicion_cita: "IEA, Germany Energy Profile 2024.",
    scorecard_titulo: "Scorecard de Alemania bajo APERC",
    scores: [
      { letra: "A", nombre: "vailability", desc: "Sin fósiles propios (salvo lignito); importador.", score: 5.5 },
      { letra: "A", nombre: "ccessibility", desc: "Diversificó gas tras Rusia (GNL, Noruega).", score: 6.0 },
      { letra: "A", nombre: "ffordability", desc: "Precios altos para la industria post-2022.", score: 6.5 },
      { letra: "A", nombre: "cceptability", desc: "Renovables altas; lignito aún presente.", score: 7.2 }
    ],
    scorecard_cita: "Scores propios sobre indicadores normalizados.",
    comparador: { pais_b: "Francia", pais_c: "Noruega" },
    indicadores_titulo: "Indicadores cuantitativos aplicados",
    indicadores: [
      { indicador: "Renovables en electricidad (%)", definicion: "Generación", propio: "55", b: "25", c: "98", interp: { texto: "Alta y creciendo", pill: "ok" } },
      { indicador: "Intensidad de carbono (gCO₂/kWh)", definicion: "Generación", propio: "380", b: "56", c: "26", interp: { texto: "Alta por lignito", pill: "warn" } },
      { indicador: "Dependencia de gas importado (%)", definicion: "Neta", propio: "95", b: "99", c: "−600%", interp: { texto: "Casi total" } },
      { indicador: "Gas ruso en el mix de gas (%)", definicion: "Antes/después 2022", propio: "0 (era 55)", b: "—", c: "—", interp: { texto: "Sustituido", pill: "ok" } }
    ],
    indicadores_nota: "Comparación con Francia (nuclear) y Noruega (hidro)."
  },
  matriz: {
    src: "AGEB · Ember 2024",
    primaria_titulo: "Energía Primaria (TPES, %)",
    primaria: [
      { label: "Petróleo", valor: 34, color: "#c4570e" },
      { label: "Gas natural", valor: 24, color: "#0b5394" },
      { label: "Renovables", valor: 20, color: "#a17c1c" },
      { label: "Carbón", valor: 18, color: "#8a4a4a" },
      { label: "Otros", valor: 4, color: "#4a5870" }
    ],
    primaria_cita: "Petróleo 34 · Gas 24 · Renov. 20 · Carbón 18. <i>Fuente: AGEB 2024.</i>",
    electrica_titulo: "Generación Eléctrica (%)",
    electrica: [
      { label: "Eólica", valor: 31, color: "#6a8caf" },
      { label: "Carbón", valor: 25, color: "#8a4a4a" },
      { label: "Solar", valor: 12, color: "#a17c1c" },
      { label: "Gas", valor: 14, color: "#0b5394" },
      { label: "Biomasa", valor: 8, color: "#2e7d32" },
      { label: "Otros", valor: 10, color: "#4a5870" }
    ],
    electrica_cita: "Eólica 31 · Carbón 25 · Solar 12 · Gas 14 · Biomasa 8. <i>Fuente: Ember 2024.</i>",
    comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
    comparativa: {
      paises: ["Alemania", "Francia", "Noruega"],
      series: [
        { label: "Eólica", data: [31, 9, 9], color: "#6a8caf" },
        { label: "Solar", data: [12, 5, 0], color: "#a17c1c" },
        { label: "Carbón", data: [25, 1, 0], color: "#8a4a4a" },
        { label: "Gas", data: [14, 5, 1], color: "#0b5394" },
        { label: "Nuclear", data: [0, 68, 0], color: "#6b4e8e" },
        { label: "Hidro", data: [4, 11, 88], color: "#2e7d32" }
      ]
    },
    comparativa_nota: "Tres modelos europeos: renovables+carbón (DE), nuclear (FR), hidro (NO)."
  },
  sankey: {
    src: "Producción → Transformación → Uso final",
    titulo_panel: "Flujos físicos de energía, Alemania (PJ aprox.)",
    flujos: [
      { from: "Gas importado", to: "Industria & residencial", flow: 3500 },
      { from: "Gas importado", to: "Generación eléctrica", flow: 1200 },
      { from: "Petróleo importado", to: "Refinación local", flow: 4000 },
      { from: "Refinación local", to: "Transporte", flow: 3600 },
      { from: "Lignito (propio)", to: "Generación eléctrica", flow: 2200 },
      { from: "Eólica/Solar", to: "Generación eléctrica", flow: 3000 },
      { from: "Generación eléctrica", to: "Industria & residencial", flow: 5500 },
      { from: "Generación eléctrica", to: "Exportación eléctrica", flow: 400 }
    ],
    nodos: {
      "Gas importado": { color: "#0b5394", label: "Gas importado" },
      "Petróleo importado": { color: "#c4570e", label: "Petróleo importado" },
      "Lignito (propio)": { color: "#8a4a4a", label: "Lignito (propio)" },
      "Eólica/Solar": { color: "#a17c1c", label: "Eólica & Solar" },
      "Refinación local": { color: "#c4570e", label: "Refinerías" },
      "Generación eléctrica": { color: "#6b4e8e", label: "Generación eléctrica" },
      "Industria & residencial": { color: "#4a5870", label: "Industria + Residencial" },
      "Exportación eléctrica": { color: "#2e7d32", label: "EXPORT · Electricidad" },
      "Transporte": { color: "#c4570e", label: "Transporte" }
    },
    cita: "El lignito propio es el único fósil doméstico; todo lo demás se importa. <i>Datos estilizados.</i>"
  },
  evolucion: {
    src: "2000–2050 · Energiewende",
    historico_titulo: "Mix Eléctrico Histórico y Proyectado (%)",
    anios: ["2000", "2010", "2020", "2024", "2035", "2050"],
    series: [
      { label: "Carbón", data: [52, 43, 24, 25, 8, 0], color: "#8a4a4a" },
      { label: "Nuclear", data: [29, 22, 11, 0, 0, 0], color: "#6b4e8e" },
      { label: "Renovables", data: [7, 17, 45, 55, 80, 95], color: "#a17c1c" },
      { label: "Gas", data: [9, 14, 16, 14, 10, 5], color: "#0b5394" }
    ],
    historico_cita: "Meta: 80% renovables en electricidad a 2030; neutralidad climática 2045.",
    hitos_titulo: "Hitos del Régimen Energético",
    hitos: [
      { anio: "2000", evento: "Ley de Energías Renovables (EEG): tarifas de inyección." },
      { anio: "2011", evento: "Tras Fukushima, decisión de salir de la energía nuclear." },
      { anio: "2011", evento: "Inicio de Nord Stream 1 (gas ruso)." },
      { anio: "2022", evento: "Shock de gas ruso; GNL exprés en Wilhelmshaven; reactivación temporal de carbón." },
      { anio: "2023", evento: "Apagado de los últimos reactores nucleares." },
      { anio: "2024", evento: "Ley de centrales de respaldo a hidrógeno (Kraftwerksstrategie)." }
    ]
  },
  infraestructura: {
    src: "Mapa Leaflet · GEM",
    mapa_titulo: "GNL, lignito y eólica marina",
    pines: [
      { lat: 53.6, lng: 8.1, tipo: "gnl", nombre: "Terminal GNL Wilhelmshaven", desc: "Primera terminal de GNL alemana (2022)" },
      { lat: 53.9, lng: 9.1, tipo: "gnl", nombre: "Terminal GNL Brunsbüttel", desc: "GNL del Mar del Norte" },
      { lat: 51.05, lng: 6.45, tipo: "refineria", nombre: "Lignito renano (Garzweiler)", desc: "Mayor cuenca de lignito a cielo abierto" },
      { lat: 54.0, lng: 7.5, tipo: "minerales", nombre: "Eólica marina del Mar del Norte", desc: "Parques offshore (Borkum, etc.)" },
      { lat: 52.6, lng: 8.6, tipo: "almacenamiento", nombre: "Almacén de gas Rehden", desc: "Mayor depósito de gas de Europa occidental" },
      { lat: 50.5, lng: 11.0, tipo: "almacenamiento", nombre: "Hidrobombeo Goldisthal", desc: "Almacenamiento por bombeo" }
    ],
    rutas: [
      { puntos: [[60, 4], [56, 6], [53.6, 8.1]], tooltip: "Gas/GNL desde Noruega y el Atlántico" }
    ],
    leyenda: [
      { color: "#0b5394", label: "Terminales GNL / gas" },
      { color: "#8a4a4a", label: "Lignito" },
      { color: "#a17c1c", label: "Eólica / solar" },
      { color: "#2e7d32", label: "Almacenamiento" }
    ],
    mapa_cita: "Coordenadas reales de Wilhelmshaven, Brunsbüttel, Garzweiler, Rehden. <i>Fuentes: GEM 2024.</i>",
    vulnerabilidades_titulo: "Vulnerabilidades técnicas",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Seguridad de gas</b> · sin gas ruso, depende de GNL y Noruega; almacenamiento estacional clave." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Red norte-sur</b> · cuellos para llevar eólica del norte al sur industrial (SuedLink)." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Respaldo</b> · intermitencia exige centrales de gas/hidrógeno (Dunkelflaute)." },
      { nivel: "low", tag: "MED", texto_html: "<b>Industria electrointensiva</b> · precios altos amenazan competitividad." }
    ],
    capacidad_titulo: "Capacidad instalada (GW)",
    capacidad: {
      anios: ["2020", "2024", "2030", "2040"],
      y_titulo: "GW",
      series: [
        { label: "Renovables (GW)", tipo: "bar", data: [130, 170, 360, 500], color: "#a17c1c" },
        { label: "Fósil/respaldo (GW)", tipo: "bar", data: [85, 80, 60, 40], color: "#8a4a4a" },
        { label: "Demanda pico (GW)", tipo: "line", data: [80, 82, 95, 110], color: "#c4570e" }
      ]
    },
    capacidad_cita: "Expansión renovable masiva + respaldo flexible. <i>Fuente: BNetzA.</i>"
  },
  geopolitica: {
    src: "Radar APERC normalizado",
    radar_titulo: "Radar APERC: Alemania vs Francia vs Noruega",
    radar: {
      ejes: ["Availability", "Accessibility", "Affordability", "Acceptability", "Sovereignty", "Robustness", "Resilience"],
      series: [
        { label: "Alemania", data: [5.5, 6.0, 6.5, 7.2, 5.5, 6.0, 6.5], color: "#8a4a4a" },
        { label: "Francia", data: [7.5, 8.0, 7.0, 8.5, 8.0, 7.5, 7.5], color: "#0b5394" },
        { label: "Noruega", data: [9.0, 8.5, 7.5, 9.5, 9.0, 9.0, 9.0], color: "#2e7d32" }
      ]
    },
    radar_cita: "Normalización min-max sobre indicadores §01.",
    dependencias_titulo: "Dependencias y socios",
    dependencias: [
      { vinculo: "Gas de Noruega", pct: "45", riesgo: { texto: "Proveedor clave post-Rusia", pill: "ok" } },
      { vinculo: "GNL (EE.UU./Catar)", pct: "25", riesgo: { texto: "Nueva vía marítima", pill: "ok" } },
      { vinculo: "Gas ruso (histórico)", pct: "0", riesgo: { texto: "Eliminado tras 2022", pill: "warn" } },
      { vinculo: "Paneles/baterías de China", pct: "—", riesgo: { texto: "Dependencia de cadena", pill: "warn" } }
    ],
    dependencias_cita: "BNetzA; AGEB 2024.",
    minerales_titulo: "Posición energética",
    minerales: [
      { valor: "#1", unidad: " UE", etiqueta: "MAYOR DEMANDA ENERGÉTICA" },
      { valor: "55", unidad: "%", etiqueta: "RENOVABLES ELÉCTRICAS" },
      { valor: "2045", unidad: "", etiqueta: "META DE NEUTRALIDAD" }
    ],
    minerales_cita: "AGEB; Ember 2024."
  },
  militar: {
    titulo_seccion: "Combustibles Militares y Rol Operacional de la Bundeswehr",
    nav_label: "Combustibles militares",
    src: "IISS · Bundeswehr",
    combustibles_titulo: "Demanda de combustibles de la Bundeswehr",
    combustibles: [
      { codigo: "F-34 (JP-8)", tipo: "Queroseno militar", usuario: "Luftwaffe", ml_anio: "400" },
      { codigo: "F-76", tipo: "Diésel naval", usuario: "Deutsche Marine", ml_anio: "120" },
      { codigo: "F-54", tipo: "Diésel terrestre", usuario: "Heer", ml_anio: "200" }
    ],
    combustibles_total: "~720",
    combustibles_cita: "Estimación de orden de magnitud.",
    vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa",
    vulnerabilidades: [
      { nivel: "med", tag: "ALTO", texto_html: "<b>Resiliencia industrial</b> · la base industrial de defensa depende de energía asequible." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Protección de infraestructura crítica</b> · gasoductos y cables (sabotaje a Nord Stream, 2022)." },
      { nivel: "low", tag: "MED", texto_html: "<b>Flanco OTAN</b> · seguridad energética del este europeo." }
    ],
    mision_titulo: "Misión en Seguridad Energética",
    mision: [
      { titulo: "PROTECCIÓN DE INFRAESTRUCTURA", texto_html: "Vigilancia de ductos y cables submarinos en el Báltico/Mar del Norte tras Nord Stream." },
      { titulo: "RESILIENCIA OTAN", texto_html: "Zeitenwende: rearme y seguridad energética del flanco oriental." },
      { titulo: "TRANSICIÓN DE BASES", texto_html: "Eficiencia y energías limpias en instalaciones militares." },
      { titulo: "COOPERACIÓN UE", texto_html: "Compras conjuntas de gas y solidaridad energética." }
    ],
    mision_cita: "IISS 2024; Zeitenwende."
  },
  politicas: {
    src: "BMWK · BNetzA",
    planes_titulo: "Planes nacionales",
    planes: [
      { nombre: "Energiewende / EEG", texto: "80% renovables en electricidad a 2030." },
      { nombre: "Kohleausstieg", texto: "Salida del carbón (idealmente 2030–2038)." },
      { nombre: "LNG-Beschleunigungsgesetz", texto: "Ley exprés para terminales de GNL (2022)." },
      { nombre: "Kraftwerksstrategie", texto: "Centrales de respaldo listas para hidrógeno." }
    ],
    instituciones_titulo: "Instituciones clave",
    instituciones: [
      { sigla: "BMWK", texto: "ministerio de economía y clima." },
      { sigla: "BNetzA", texto: "agencia federal de redes." },
      { sigla: "Übertragungsnetzbetreiber", texto: "operadores de red (50Hertz, TenneT, Amprion, TransnetBW)." },
      { sigla: "KfW", texto: "banco de desarrollo; financia la transición." }
    ],
    transicion_titulo: "Transición y economía",
    transicion_html: "<p>La <b>Energiewende</b> busca descarbonizar con renovables, pero el shock de 2022 mostró que la seguridad de suministro (gas, respaldo, red) es tan crítica como la sostenibilidad. La industria pesa el costo energético.</p>",
    transicion_cita: "IEA 2024; AGEB."
  },
  crisis: {
    src: "Wargaming · Cone of Plausibility",
    matriz_titulo: "Matriz Probabilidad × Impacto",
    matriz: {
      esquina: "Impacto ↓ / Prob →",
      prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
      filas: [
        { impacto: "Catastrófico", celdas: [{ nivel: 3 }, { nivel: 4 }, { nivel: 5, texto: "Corte total de gas" }, { nivel: 5 }, { nivel: 5 }] },
        { impacto: "Mayor", celdas: [{ nivel: 2 }, { nivel: 3 }, { nivel: 4, texto: "Dunkelflaute" }, { nivel: 4, texto: "Sabotaje de ductos" }, { nivel: 5 }] },
        { impacto: "Moderado", celdas: [{ nivel: 1 }, { nivel: 2 }, { nivel: 3, texto: "Cuello de red sur" }, { nivel: 4, texto: "Precios industriales" }, { nivel: 4 }] },
        { impacto: "Menor", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 3 }, { nivel: 3 }] },
        { impacto: "Insignif.", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 2 }] }
      ]
    },
    matriz_cita: "Escala HM Treasury Orange Book.",
    escenarios_titulo: "Escenarios calibrados",
    escenarios: [
      { nivel: "high", tag: "A", texto_html: "<b>Corte total de gas</b> en invierno. <i>Respuesta:</i> almacenamiento lleno, GNL, racionamiento industrial priorizado." },
      { nivel: "high", tag: "B", texto_html: "<b>Dunkelflaute</b> — semanas sin sol ni viento. <i>Respuesta:</i> respaldo de gas/hidrógeno, importación UE." },
      { nivel: "med", tag: "C", texto_html: "<b>Sabotaje de ductos/cables</b> (Nord Stream 2022). <i>Respuesta:</i> vigilancia militar de infraestructura submarina." },
      { nivel: "med", tag: "D", texto_html: "<b>Fuga industrial</b> por precios. <i>Respuesta:</i> precio industrial de electricidad, eficiencia." }
    ],
    vectores_titulo: "Respuesta estratégica integrada — vectores",
    vectores: [
      { titulo: "DIVERSIFICAR GAS", texto: "GNL y Noruega; almacenamiento estacional lleno." },
      { titulo: "ACELERAR RENOVABLES", texto: "Eólica marina, solar y red norte-sur (SuedLink)." },
      { titulo: "RESPALDO H₂", texto: "Centrales flexibles listas para hidrógeno." },
      { titulo: "PROTEGER INFRAESTRUCTURA", texto: "Vigilancia de ductos y cables submarinos." }
    ]
  },
  referencias: {
    src: "Triangulación multi-fuente",
    titulo: "Fuentes primarias y académicas",
    items: [
      "IEA (2024). <i>Germany Energy Profile</i>. París.",
      "AGEB (2024). <i>Energiebilanz</i>.",
      "BNetzA (2024). <i>Monitoringbericht</i>.",
      "Ember (2024). <i>Electricity Data Explorer</i>.",
      "APERC (2007). <i>A Quest for Energy Security in the 21st Century</i>. Tokio."
    ]
  },
  footer: "Documento de sustentación · Rúbrica Slide18 · Logística Militar · Mayo 2026"
});

/* === BRASIL ============================================================= */
P({
  schema_version: "1.0.0",
  meta: {
    pais: "Brasil", pais_iso: "BRA", pais_iso2: "BR", subtitulo_pais: "República Federativa de",
    eyebrow: "Portafolio · Seguridad Energética por País",
    titulo: "Seguridad Energética de Brasil:<br/>hidroelectricidad, presal y biocombustibles",
    subtitulo: "Matriz eléctrica de las más limpias del mundo (hidro dominante), gran petróleo del presal y liderazgo en etanol; principal vulnerabilidad: la dependencia hídrica frente a sequías.",
    estudiante: "Cátedra (ejemplo de referencia)", asignatura: "Logística Militar · Rúbrica Slide18",
    tipo_doc: "Documento de sustentación", fecha: "Mayo 2026",
    fuerzas_armadas: "Forças Armadas do Brasil", aperc_global: 6.8,
    cita_corta: "EPE, 2024; IEA, 2024; Petrobras.",
    portafolio_label: "Rúbrica Slide18<br/>Logística Militar<br/>v2 — académica",
    map_view: { lat: -14, lng: -52, zoom: 4 }
  },
  resumen: {
    tesis_html: "Brasil tiene una de las matrices más <b>limpias</b> del mundo: ~60% de electricidad hidroeléctrica más eólica/solar en auge, y es líder en <b>etanol</b> de caña. El <b>presal</b> (Petrobras) lo volvió gran exportador de crudo. Su talón de Aquiles es la <i>hidrodependencia</i>: las sequías obligan a térmicas caras y suben tarifas. La 'Amazonía Azul' (presal offshore) es activo estratégico.",
    conclusion_html: "APERC <b>6.8/10</b>: alta <i>acceptability</i> y <i>availability</i>, pero <i>robustness</i> sensible al clima. Las Forças Armadas protegen el presal y la Amazonía.",
    kpis: [
      { valor: 60, unidad: "%", etiqueta: "Electricidad hidroeléctrica" },
      { valor: 3.4, unidad: "Mb/d", etiqueta: "Producción de crudo", decimal: true },
      { valor: 85, unidad: "%", etiqueta: "Renovables en electricidad" },
      { valor: 1, unidad: "º", etiqueta: "Etanol (con EE.UU.)" }
    ]
  },
  aperc: {
    src: "APERC 2007 · EPE 2024",
    definicion_html: "<p>Brasil combina <i>acceptability</i> (matriz limpia) con creciente <i>availability</i> (presal). El riesgo es la <i>robustness</i> climática: la hidrología manda sobre la seguridad eléctrica.</p>",
    definicion_cita: "EPE, Balanço Energético Nacional 2024.",
    scorecard_titulo: "Scorecard de Brasil bajo APERC",
    scores: [
      { letra: "A", nombre: "vailability", desc: "Hidro, presal, biomasa, eólica/solar.", score: 7.5 },
      { letra: "A", nombre: "ccessibility", desc: "Autosuficiente; exporta crudo.", score: 6.5 },
      { letra: "A", nombre: "ffordability", desc: "Tarifas suben en sequía (térmicas).", score: 6.0 },
      { letra: "A", nombre: "cceptability", desc: "Matriz muy limpia; deforestación como tensión.", score: 7.2 }
    ],
    scorecard_cita: "Scores propios sobre indicadores normalizados.",
    comparador: { pais_b: "Colombia", pais_c: "Estados Unidos" },
    indicadores_titulo: "Indicadores cuantitativos aplicados",
    indicadores: [
      { indicador: "Renovables en electricidad (%)", definicion: "Generación", propio: "85", b: "70", c: "22", interp: { texto: "Muy alta", pill: "ok" } },
      { indicador: "Hidro en electricidad (%)", definicion: "Generación", propio: "60", b: "70", c: "6", interp: { texto: "Dominante (riesgo sequía)" } },
      { indicador: "Producción de crudo (Mb/d)", definicion: "Presal incluido", propio: "3.4", b: "0.8", c: "13", interp: { texto: "Gran productor" } },
      { indicador: "Etanol en transporte (%)", definicion: "Flex-fuel", propio: "alto", b: "bajo", c: "medio", interp: { texto: "Líder mundial", pill: "ok" } }
    ],
    indicadores_nota: "Comparación con Colombia (vecino hidro) y EE.UU. (gran productor)."
  },
  matriz: {
    src: "EPE · Ember 2024",
    primaria_titulo: "Energía Primaria (TPES, %)",
    primaria: [
      { label: "Petróleo", valor: 34, color: "#c4570e" },
      { label: "Biomasa/etanol", valor: 25, color: "#2e7d32" },
      { label: "Hidro", valor: 12, color: "#6a8caf" },
      { label: "Gas natural", valor: 12, color: "#0b5394" },
      { label: "Otros renov.", valor: 9, color: "#a17c1c" },
      { label: "Carbón", valor: 8, color: "#8a4a4a" }
    ],
    primaria_cita: "Petróleo 34 · Biomasa 25 · Hidro 12 · Gas 12. <i>Fuente: EPE BEN 2024.</i>",
    electrica_titulo: "Generación Eléctrica (%)",
    electrica: [
      { label: "Hidro", valor: 60, color: "#2e7d32" },
      { label: "Eólica", valor: 13, color: "#6a8caf" },
      { label: "Gas", valor: 8, color: "#0b5394" },
      { label: "Solar", valor: 8, color: "#a17c1c" },
      { label: "Biomasa", valor: 7, color: "#8a4a4a" },
      { label: "Nuclear", valor: 4, color: "#6b4e8e" }
    ],
    electrica_cita: "Hidro 60 · Eólica 13 · Gas 8 · Solar 8 · Biomasa 7. <i>Fuente: Ember 2024.</i>",
    comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
    comparativa: {
      paises: ["Brasil", "Colombia", "Estados Unidos"],
      series: [
        { label: "Hidro", data: [60, 70, 6], color: "#2e7d32" },
        { label: "Eólica/Solar", data: [21, 4, 16], color: "#a17c1c" },
        { label: "Gas", data: [8, 16, 43], color: "#0b5394" },
        { label: "Carbón", data: [7, 8, 16], color: "#8a4a4a" },
        { label: "Nuclear", data: [4, 0, 18], color: "#6b4e8e" }
      ]
    },
    comparativa_nota: "Brasil y Colombia: matrices hidro-dominantes; EE.UU.: gas+nuclear."
  },
  sankey: {
    src: "Producción → Transformación → Uso final",
    titulo_panel: "Flujos físicos de energía, Brasil (PJ aprox.)",
    flujos: [
      { from: "Petróleo (presal)", to: "Exportación de crudo", flow: 3500 },
      { from: "Petróleo (presal)", to: "Refinación local", flow: 4000 },
      { from: "Refinación local", to: "Transporte", flow: 3500 },
      { from: "Caña de azúcar", to: "Etanol", flow: 2500 },
      { from: "Etanol", to: "Transporte", flow: 2300 },
      { from: "Hidro", to: "Generación eléctrica", flow: 4000 },
      { from: "Eólica/Solar", to: "Generación eléctrica", flow: 1400 },
      { from: "Generación eléctrica", to: "Industria & residencial", flow: 5000 }
    ],
    nodos: {
      "Petróleo (presal)": { color: "#c4570e", label: "Petróleo (presal)" },
      "Caña de azúcar": { color: "#2e7d32", label: "Caña de azúcar" },
      "Etanol": { color: "#2e7d32", label: "Etanol" },
      "Hidro": { color: "#6a8caf", label: "Hidro" },
      "Eólica/Solar": { color: "#a17c1c", label: "Eólica & Solar" },
      "Refinación local": { color: "#c4570e", label: "Refinerías" },
      "Generación eléctrica": { color: "#6b4e8e", label: "Generación eléctrica" },
      "Exportación de crudo": { color: "#8a4a4a", label: "EXPORT · Crudo" },
      "Industria & residencial": { color: "#4a5870", label: "Industria + Residencial" },
      "Transporte": { color: "#c4570e", label: "Transporte" }
    },
    cita: "El etanol de caña sustituye gasolina en la flota flex-fuel. <i>Datos estilizados sobre EPE.</i>"
  },
  evolucion: {
    src: "2000–2050 · presal y transición",
    historico_titulo: "Mix Eléctrico Histórico y Proyectado (%)",
    anios: ["2000", "2010", "2020", "2024", "2035", "2050"],
    series: [
      { label: "Hidro", data: [87, 80, 65, 60, 50, 42], color: "#2e7d32" },
      { label: "Eólica/Solar", data: [0, 1, 11, 21, 38, 50], color: "#a17c1c" },
      { label: "Gas/Térmica", data: [9, 13, 18, 15, 10, 6], color: "#0b5394" },
      { label: "Nuclear", data: [4, 3, 3, 4, 2, 2], color: "#6b4e8e" }
    ],
    historico_cita: "La hidro cede peso ante eólica/solar, que dan resiliencia ante sequías.",
    hitos_titulo: "Hitos del Régimen Energético",
    hitos: [
      { anio: "1975", evento: "Programa Proálcool: etanol de caña como combustible." },
      { anio: "1984", evento: "Inauguración de Itaipú (binacional con Paraguay)." },
      { anio: "2006", evento: "Descubrimiento del presal (Cuenca de Santos)." },
      { anio: "2001", evento: "\"Apagão\": racionamiento eléctrico por sequía." },
      { anio: "2021", evento: "Crisis hídrica eleva tarifas (bandera escasez hídrica)." },
      { anio: "2024", evento: "Auge de eólica/solar en el Nordeste; leilões de transmisión." }
    ]
  },
  infraestructura: {
    src: "Mapa Leaflet · GEM",
    mapa_titulo: "Hidro, presal y renovables",
    pines: [
      { lat: -25.41, lng: -54.59, tipo: "almacenamiento", nombre: "Represa de Itaipú", desc: "14 GW · binacional con Paraguay" },
      { lat: -25.0, lng: -43.0, tipo: "refineria", nombre: "Presal (Cuenca de Santos)", desc: "Campos Tupi/Búzios (Petrobras)" },
      { lat: -3.10, lng: -51.78, tipo: "almacenamiento", nombre: "Belo Monte", desc: "11 GW · gran hidro amazónica" },
      { lat: -22.7, lng: -43.25, tipo: "refineria", nombre: "Refinería REDUC", desc: "Río de Janeiro (Petrobras)" },
      { lat: -5.5, lng: -36.0, tipo: "minerales", nombre: "Eólica del Nordeste (RN/BA)", desc: "Mayor polo eólico del país" },
      { lat: -21.0, lng: -48.0, tipo: "minerales", nombre: "Etanol de São Paulo", desc: "Corazón cañero" }
    ],
    rutas: [
      { puntos: [[-25.0, -43.0], [-23, -42], [-15, -38], [0, -30]], tooltip: "SLOC: presal → exportación atlántica" }
    ],
    leyenda: [
      { color: "#c4570e", label: "Petróleo / refinerías" },
      { color: "#2e7d32", label: "Hidro / biomasa" },
      { color: "#a17c1c", label: "Eólica / solar" }
    ],
    mapa_cita: "Coordenadas reales de Itaipú, presal de Santos, Belo Monte, REDUC. <i>Fuentes: GEM 2024.</i>",
    vulnerabilidades_titulo: "Vulnerabilidades técnicas",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Hidrodependencia</b> · las sequías obligan a térmicas caras y elevan tarifas (apagão 2001)." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Transmisión</b> · llevar eólica del Nordeste al sur-sudeste exige grandes líneas." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Refinación</b> · déficit que obliga a importar derivados pese al crudo propio." },
      { nivel: "low", tag: "MED", texto_html: "<b>Presal offshore</b> · operaciones complejas en aguas profundas." }
    ],
    capacidad_titulo: "Capacidad instalada (GW)",
    capacidad: {
      anios: ["2020", "2024", "2030", "2040"],
      y_titulo: "GW",
      series: [
        { label: "Hidro (GW)", tipo: "bar", data: [109, 110, 112, 115], color: "#2e7d32" },
        { label: "Eólica/Solar (GW)", tipo: "bar", data: [20, 45, 90, 150], color: "#a17c1c" },
        { label: "Demanda pico (GW)", tipo: "line", data: [86, 100, 120, 145], color: "#c4570e" }
      ]
    },
    capacidad_cita: "Eólica/solar como nueva columna del crecimiento. <i>Fuente: ONS/EPE.</i>"
  },
  geopolitica: {
    src: "Radar APERC normalizado",
    radar_titulo: "Radar APERC: Brasil vs Colombia vs EE.UU.",
    radar: {
      ejes: ["Availability", "Accessibility", "Affordability", "Acceptability", "Sovereignty", "Robustness", "Resilience"],
      series: [
        { label: "Brasil", data: [7.5, 6.5, 6.0, 7.2, 7.0, 6.0, 6.5], color: "#2e7d32" },
        { label: "Colombia", data: [6.5, 6.0, 6.0, 6.5, 6.5, 6.0, 5.5], color: "#a17c1c" },
        { label: "Estados Unidos", data: [9.0, 7.5, 7.0, 7.7, 8.0, 8.0, 8.0], color: "#0b5394" }
      ]
    },
    radar_cita: "Normalización min-max sobre indicadores §01.",
    dependencias_titulo: "Dependencias y socios",
    dependencias: [
      { vinculo: "Exportación de crudo a China", pct: "45", riesgo: { texto: "Cliente clave", pill: "warn" } },
      { vinculo: "Importación de diésel", pct: "—", riesgo: { texto: "Déficit de refinación", pill: "warn" } },
      { vinculo: "Importación de gas de Bolivia", pct: "—", riesgo: { texto: "En declive", pill: "warn" } },
      { vinculo: "Etanol como exportación", pct: "—", riesgo: { texto: "Ventaja competitiva", pill: "ok" } }
    ],
    dependencias_cita: "EPE; MME 2024.",
    minerales_titulo: "Posición energética",
    minerales: [
      { valor: "#1", unidad: " mundial", etiqueta: "ETANOL (con EE.UU.)" },
      { valor: "85", unidad: "%", etiqueta: "RENOVABLES ELÉCTRICAS" },
      { valor: "3.4", unidad: " Mb/d", etiqueta: "PRODUCCIÓN DE CRUDO" }
    ],
    minerales_cita: "EPE BEN 2024."
  },
  militar: {
    titulo_seccion: "Combustibles Militares y Rol Operacional de las Forças Armadas",
    nav_label: "Combustibles militares",
    src: "IISS · Ministério da Defesa",
    combustibles_titulo: "Demanda de combustibles de las Forças Armadas",
    combustibles: [
      { codigo: "QAV / Jet A-1", tipo: "Queroseno de aviación", usuario: "Força Aérea", ml_anio: "350" },
      { codigo: "Diésel naval", tipo: "Diésel/fuelóleo", usuario: "Marinha", ml_anio: "200" },
      { codigo: "Diésel terrestre", tipo: "Diésel", usuario: "Exército", ml_anio: "180" }
    ],
    combustibles_total: "~730",
    combustibles_cita: "Estimación de orden de magnitud.",
    vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa",
    vulnerabilidades: [
      { nivel: "med", tag: "ALTO", texto_html: "<b>Amazônia Azul</b> · proteger el presal offshore (Petrobras) en aguas jurisdiccionales." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Amazonía</b> · vigilancia de un territorio vasto con recursos e infraestructura dispersa." },
      { nivel: "low", tag: "MED", texto_html: "<b>Submarino nuclear (Prosub)</b> · capacidad para proteger el Atlántico Sur." }
    ],
    mision_titulo: "Misión en Seguridad Energética",
    mision: [
      { titulo: "AMAZÔNIA AZUL", texto_html: "La Marinha protege el presal y las rutas del Atlántico Sur." },
      { titulo: "VIGILANCIA AMAZÓNICA", texto_html: "SIVAM/SIPAM y operaciones de presencia." },
      { titulo: "PROSUB", texto_html: "Programa de submarinos (incl. propulsión nuclear) para disuasión marítima." },
      { titulo: "INFRAESTRUCTURA CRÍTICA", texto_html: "Apoyo ante apagones y desastres." }
    ],
    mision_cita: "IISS 2024; Estratégia Nacional de Defesa."
  },
  politicas: {
    src: "MME · EPE · ANEEL",
    planes_titulo: "Planes nacionales",
    planes: [
      { nombre: "Plano Decenal de Energia (PDE)", texto: "Expansión de oferta a 10 años." },
      { nombre: "RenovaBio", texto: "Política de biocombustibles y créditos de descarbonización." },
      { nombre: "Leilões de energía", texto: "Subastas que impulsan eólica y solar." },
      { nombre: "Programa Combustível do Futuro", texto: "Biocombustibles avanzados y SAF." }
    ],
    instituciones_titulo: "Instituciones clave",
    instituciones: [
      { sigla: "Petrobras", texto: "petrolera estatal; presal y refinación." },
      { sigla: "ONS", texto: "operador nacional del sistema eléctrico." },
      { sigla: "ANEEL / ANP", texto: "reguladores de electricidad e hidrocarburos." },
      { sigla: "EPE", texto: "empresa de investigación energética." }
    ],
    transicion_titulo: "Transición y economía",
    transicion_html: "<p>Brasil parte de una matriz limpia y busca <b>diversificar la hidro</b> con eólica/solar (resiliencia ante sequías), monetizar el presal en la ventana de demanda y liderar biocombustibles avanzados.</p>",
    transicion_cita: "EPE PDE; MME 2024."
  },
  crisis: {
    src: "Wargaming · Cone of Plausibility",
    matriz_titulo: "Matriz Probabilidad × Impacto",
    matriz: {
      esquina: "Impacto ↓ / Prob →",
      prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
      filas: [
        { impacto: "Catastrófico", celdas: [{ nivel: 3 }, { nivel: 4 }, { nivel: 5, texto: "Megasequía nacional" }, { nivel: 5 }, { nivel: 5 }] },
        { impacto: "Mayor", celdas: [{ nivel: 2 }, { nivel: 3 }, { nivel: 4, texto: "Apagão hídrico" }, { nivel: 4 }, { nivel: 5 }] },
        { impacto: "Moderado", celdas: [{ nivel: 1 }, { nivel: 2 }, { nivel: 3, texto: "Déficit de diésel" }, { nivel: 4, texto: "Cuello de transmisión" }, { nivel: 4 }] },
        { impacto: "Menor", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 3 }, { nivel: 3 }] },
        { impacto: "Insignif.", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 2 }] }
      ]
    },
    matriz_cita: "Escala HM Treasury Orange Book.",
    escenarios_titulo: "Escenarios calibrados",
    escenarios: [
      { nivel: "high", tag: "A", texto_html: "<b>Megasequía</b> — caída hidro nacional. <i>Respuesta:</i> térmicas, eólica/solar, gestión de embalses." },
      { nivel: "med", tag: "B", texto_html: "<b>Déficit de diésel</b> — dependencia de importación. <i>Respuesta:</i> ampliar refinación, biodiésel." },
      { nivel: "med", tag: "C", texto_html: "<b>Cuello de transmisión</b> — eólica del NE no llega al sur. <i>Respuesta:</i> nuevas líneas (leilões)." },
      { nivel: "low", tag: "D", texto_html: "<b>Caída de precio del crudo</b> — afecta inversión presal. <i>Respuesta:</i> eficiencia de costos de Petrobras." }
    ],
    vectores_titulo: "Respuesta estratégica integrada — vectores",
    vectores: [
      { titulo: "DIVERSIFICAR HIDRO", texto: "Eólica y solar para resiliencia climática." },
      { titulo: "PRESAL", texto: "Monetizar crudo en la ventana de demanda." },
      { titulo: "BIOCOMBUSTIBLES", texto: "Etanol, biodiésel y SAF." },
      { titulo: "TRANSMISIÓN", texto: "Líneas para integrar el Nordeste renovable." }
    ]
  },
  referencias: {
    src: "Triangulación multi-fuente",
    titulo: "Fuentes primarias y académicas",
    items: [
      "EPE (2024). <i>Balanço Energético Nacional</i>.",
      "IEA (2024). <i>Brazil Energy Profile</i>.",
      "Petrobras (2024). <i>Plano Estratégico</i>.",
      "Ember (2024). <i>Electricity Data Explorer</i>.",
      "APERC (2007). <i>A Quest for Energy Security in the 21st Century</i>. Tokio."
    ]
  },
  footer: "Documento de sustentación · Rúbrica Slide18 · Logística Militar · Mayo 2026"
});

/* === PERÚ =============================================================== */
P({
  schema_version: "1.0.0",
  meta: {
    pais: "Perú", pais_iso: "PER", pais_iso2: "PE", subtitulo_pais: "República del",
    eyebrow: "Portafolio · Seguridad Energética por País",
    titulo: "Seguridad Energética del Perú:<br/>el gas de Camisea y la demanda minera",
    subtitulo: "Gas natural de Camisea como eje, electricidad con fuerte hidroeléctrica y una gran demanda energética de la minería; vulnerabilidad por la concentración en un solo sistema de transporte.",
    estudiante: "Cátedra (ejemplo de referencia)", asignatura: "Logística Militar · Rúbrica Slide18",
    tipo_doc: "Documento de sustentación", fecha: "Mayo 2026",
    fuerzas_armadas: "Fuerzas Armadas del Perú", aperc_global: 6.2,
    cita_corta: "MINEM, 2024; Osinergmin; IEA.",
    portafolio_label: "Rúbrica Slide18<br/>Logística Militar<br/>v2 — académica",
    map_view: { lat: -10, lng: -75, zoom: 5 }
  },
  resumen: {
    tesis_html: "Perú gira en torno al <b>gas de Camisea</b>: cambió su matriz hacia el gas y la hidroeléctrica, exporta <b>GNL</b> desde Pampa Melchorita y abastece una enorme demanda <b>minera</b> (cobre). Su seguridad depende de pocos activos críticos (Camisea y su ducto), con riesgo por conflictividad social y déficit de refinación.",
    conclusion_html: "APERC <b>6.2/10</b>: buena <i>availability</i> y <i>acceptability</i>, pero <i>robustness</i> limitada por la concentración en Camisea. Las FF.AA. protegen el gasoducto y la infraestructura crítica.",
    kpis: [
      { valor: 40, unidad: "%", etiqueta: "Gas en generación eléctrica" },
      { valor: 55, unidad: "%", etiqueta: "Hidro en electricidad" },
      { valor: 2, unidad: "º", etiqueta: "Productor de cobre mundial" },
      { valor: 1, unidad: "", etiqueta: "Planta de GNL (Melchorita)" }
    ]
  },
  aperc: {
    src: "APERC 2007 · MINEM 2024",
    definicion_html: "<p>Perú logró <i>availability</i> y <i>acceptability</i> con Camisea e hidro, pero su <i>robustness</i> está atada a un sistema de transporte concentrado y a la licencia social minera.</p>",
    definicion_cita: "MINEM, Balance Energético Nacional 2024.",
    scorecard_titulo: "Scorecard del Perú bajo APERC",
    scores: [
      { letra: "A", nombre: "vailability", desc: "Gas de Camisea; hidro; potencial solar/eólico.", score: 6.5 },
      { letra: "A", nombre: "ccessibility", desc: "Concentración en Camisea y su ducto.", score: 6.0 },
      { letra: "A", nombre: "ffordability", desc: "Energía relativamente asequible.", score: 6.3 },
      { letra: "A", nombre: "cceptability", desc: "Matriz baja en carbono; conflictos socioambientales.", score: 6.0 }
    ],
    scorecard_cita: "Scores propios sobre indicadores normalizados.",
    comparador: { pais_b: "Chile", pais_c: "Colombia" },
    indicadores_titulo: "Indicadores cuantitativos aplicados",
    indicadores: [
      { indicador: "Hidro en electricidad (%)", definicion: "Generación", propio: "55", b: "30", c: "70", interp: { texto: "Alta" } },
      { indicador: "Gas en electricidad (%)", definicion: "Generación", propio: "40", b: "20", c: "16", interp: { texto: "Eje del sistema" } },
      { indicador: "Producción de cobre (Mt)", definicion: "Anual", propio: "2.6", b: "5.3", c: "1.0", interp: { texto: "Gran demanda minera" } },
      { indicador: "Concentración de transporte gas", definicion: "Camisea", propio: "alta", b: "media", c: "media", interp: { texto: "Riesgo de cuello", pill: "warn" } }
    ],
    indicadores_nota: "Comparación con Chile (minero) y Colombia (vecino hidro)."
  },
  matriz: {
    src: "MINEM · Ember 2024",
    primaria_titulo: "Energía Primaria (TPES, %)",
    primaria: [
      { label: "Petróleo", valor: 40, color: "#c4570e" },
      { label: "Gas natural", valor: 32, color: "#0b5394" },
      { label: "Hidro", valor: 16, color: "#2e7d32" },
      { label: "Biomasa/otros", valor: 8, color: "#a17c1c" },
      { label: "Carbón", valor: 4, color: "#8a4a4a" }
    ],
    primaria_cita: "Petróleo 40 · Gas 32 · Hidro 16. <i>Fuente: MINEM 2024.</i>",
    electrica_titulo: "Generación Eléctrica (%)",
    electrica: [
      { label: "Hidro", valor: 55, color: "#2e7d32" },
      { label: "Gas", valor: 40, color: "#0b5394" },
      { label: "Solar/Eólica", valor: 5, color: "#a17c1c" }
    ],
    electrica_cita: "Hidro 55 · Gas 40 · Solar/Eólica 5. <i>Fuente: Ember 2024.</i>",
    comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
    comparativa: {
      paises: ["Perú", "Chile", "Colombia"],
      series: [
        { label: "Hidro", data: [55, 30, 70], color: "#2e7d32" },
        { label: "Gas", data: [40, 20, 16], color: "#0b5394" },
        { label: "Solar/Eólica", data: [5, 35, 4], color: "#a17c1c" },
        { label: "Carbón", data: [0, 15, 8], color: "#8a4a4a" }
      ]
    },
    comparativa_nota: "Perú apoyado en hidro+gas; Chile lidera en solar/eólica."
  },
  sankey: {
    src: "Producción → Transformación → Uso final",
    titulo_panel: "Flujos físicos de energía, Perú (PJ aprox.)",
    flujos: [
      { from: "Gas de Camisea", to: "Generación eléctrica", flow: 1800 },
      { from: "Gas de Camisea", to: "Exportación GNL", flow: 1200 },
      { from: "Gas de Camisea", to: "Industria & residencial", flow: 700 },
      { from: "Petróleo importado", to: "Refinación local", flow: 1500 },
      { from: "Refinación local", to: "Transporte", flow: 1300 },
      { from: "Hidro", to: "Generación eléctrica", flow: 2000 },
      { from: "Generación eléctrica", to: "Minería", flow: 1500 },
      { from: "Generación eléctrica", to: "Industria & residencial", flow: 1800 }
    ],
    nodos: {
      "Gas de Camisea": { color: "#0b5394", label: "Gas de Camisea" },
      "Petróleo importado": { color: "#c4570e", label: "Petróleo importado" },
      "Hidro": { color: "#2e7d32", label: "Hidro" },
      "Refinación local": { color: "#c4570e", label: "Refinerías" },
      "Generación eléctrica": { color: "#6b4e8e", label: "Generación eléctrica" },
      "Exportación GNL": { color: "#0b5394", label: "EXPORT · GNL" },
      "Minería": { color: "#a17c1c", label: "Minería (cobre)" },
      "Industria & residencial": { color: "#4a5870", label: "Industria + Residencial" },
      "Transporte": { color: "#c4570e", label: "Transporte" }
    },
    cita: "La minería es un gran consumidor; Camisea alimenta electricidad, exportación e industria. <i>Datos estilizados.</i>"
  },
  evolucion: {
    src: "2000–2050 · era Camisea",
    historico_titulo: "Mix Eléctrico Histórico y Proyectado (%)",
    anios: ["2000", "2010", "2020", "2024", "2035", "2050"],
    series: [
      { label: "Hidro", data: [85, 60, 55, 55, 50, 45], color: "#2e7d32" },
      { label: "Gas", data: [5, 35, 40, 40, 35, 25], color: "#0b5394" },
      { label: "Solar/Eólica", data: [0, 1, 4, 5, 15, 30], color: "#a17c1c" }
    ],
    historico_cita: "Camisea (2004) transformó la matriz; el sur tiene gran potencial solar.",
    hitos_titulo: "Hitos del Régimen Energético",
    hitos: [
      { anio: "2004", evento: "Inicio de producción del gas de Camisea." },
      { anio: "2010", evento: "Exportación de GNL desde Pampa Melchorita." },
      { anio: "2016", evento: "Auge de la inversión minera (cobre)." },
      { anio: "2022", evento: "Conflictividad social afecta corredor minero del sur." },
      { anio: "2024", evento: "Subastas de renovables; debate del Gasoducto Sur Peruano." }
    ]
  },
  infraestructura: {
    src: "Mapa Leaflet · GEM",
    mapa_titulo: "Gas, hidro y minería",
    pines: [
      { lat: -11.8, lng: -72.7, tipo: "gnl", nombre: "Gas de Camisea", desc: "Yacimiento clave (Cusco)" },
      { lat: -13.3, lng: -76.4, tipo: "gnl", nombre: "GNL Pampa Melchorita", desc: "Planta de licuefacción y exportación" },
      { lat: -12.4, lng: -74.9, tipo: "almacenamiento", nombre: "Hidro del Mantaro", desc: "Mayor complejo hidroeléctrico" },
      { lat: -4.58, lng: -81.27, tipo: "refineria", nombre: "Refinería de Talara", desc: "Modernizada por Petroperú" },
      { lat: -16.53, lng: -71.58, tipo: "minerales", nombre: "Cobre Cerro Verde", desc: "Gran mina (Arequipa)" },
      { lat: -14.07, lng: -72.33, tipo: "minerales", nombre: "Cobre Las Bambas", desc: "Mina y corredor minero del sur" }
    ],
    rutas: [
      { puntos: [[-11.8, -72.7], [-12.5, -75], [-13.3, -76.4]], tooltip: "Ducto de gas: Camisea → costa" }
    ],
    leyenda: [
      { color: "#0b5394", label: "Gas / GNL" },
      { color: "#2e7d32", label: "Hidro" },
      { color: "#a17c1c", label: "Minería" },
      { color: "#c4570e", label: "Refinería" }
    ],
    mapa_cita: "Coordenadas reales de Camisea, Melchorita, Mantaro, Talara, Cerro Verde, Las Bambas. <i>Fuentes: GEM 2024.</i>",
    vulnerabilidades_titulo: "Vulnerabilidades técnicas",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Concentración en Camisea</b> · un solo ducto principal: punto único de falla." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Conflictividad social</b> · bloqueos en el corredor minero del sur." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Déficit de refinación</b> · dependencia de importación de derivados." },
      { nivel: "low", tag: "MED", texto_html: "<b>Sismicidad</b> · riesgo geológico para infraestructura." }
    ],
    capacidad_titulo: "Capacidad instalada (GW)",
    capacidad: {
      anios: ["2020", "2024", "2030", "2040"],
      y_titulo: "GW",
      series: [
        { label: "Hidro (GW)", tipo: "bar", data: [5.3, 5.8, 6.5, 7.5], color: "#2e7d32" },
        { label: "Gas (GW)", tipo: "bar", data: [4.5, 5.0, 5.5, 5.0], color: "#0b5394" },
        { label: "Solar/Eólica (GW)", tipo: "bar", data: [0.7, 1.5, 4.0, 9.0], color: "#a17c1c" }
      ]
    },
    capacidad_cita: "Gran potencial solar en el sur aún por desarrollar. <i>Fuente: COES/MINEM.</i>"
  },
  geopolitica: {
    src: "Radar APERC normalizado",
    radar_titulo: "Radar APERC: Perú vs Chile vs Colombia",
    radar: {
      ejes: ["Availability", "Accessibility", "Affordability", "Acceptability", "Sovereignty", "Robustness", "Resilience"],
      series: [
        { label: "Perú", data: [6.5, 6.0, 6.3, 6.0, 6.5, 5.5, 6.0], color: "#a17c1c" },
        { label: "Chile", data: [6.0, 6.5, 6.0, 7.5, 6.5, 6.5, 7.0], color: "#0b5394" },
        { label: "Colombia", data: [6.5, 6.0, 6.0, 6.5, 6.5, 6.0, 5.5], color: "#2e7d32" }
      ]
    },
    radar_cita: "Normalización min-max sobre indicadores §01.",
    dependencias_titulo: "Dependencias y socios",
    dependencias: [
      { vinculo: "Exportación de GNL a Asia/Europa", pct: "—", riesgo: { texto: "Mercado spot", pill: "ok" } },
      { vinculo: "Exportación de cobre a China", pct: "60", riesgo: { texto: "Cliente dominante", pill: "warn" } },
      { vinculo: "Importación de derivados", pct: "—", riesgo: { texto: "Déficit de refinación", pill: "warn" } },
      { vinculo: "Inversión minera extranjera", pct: "—", riesgo: { texto: "Sensible a estabilidad", pill: "warn" } }
    ],
    dependencias_cita: "MINEM; BCRP 2024.",
    minerales_titulo: "Posición minero-energética",
    minerales: [
      { valor: "#2", unidad: " mundial", etiqueta: "COBRE" },
      { valor: "#2", unidad: " mundial", etiqueta: "ZINC Y PLATA" },
      { valor: "55", unidad: "%", etiqueta: "HIDRO ELÉCTRICA" }
    ],
    minerales_cita: "USGS; MINEM 2024."
  },
  militar: {
    titulo_seccion: "Combustibles Militares y Rol Operacional de las Fuerzas Armadas del Perú",
    nav_label: "Combustibles militares",
    src: "IISS · Ministerio de Defensa",
    combustibles_titulo: "Demanda de combustibles de las FF.AA.",
    combustibles: [
      { codigo: "Jet A-1", tipo: "Queroseno de aviación", usuario: "Fuerza Aérea del Perú", ml_anio: "150" },
      { codigo: "Diésel naval", tipo: "Diésel", usuario: "Marina de Guerra", ml_anio: "90" },
      { codigo: "Diésel terrestre", tipo: "Diésel", usuario: "Ejército", ml_anio: "110" }
    ],
    combustibles_total: "~350",
    combustibles_cita: "Estimación de orden de magnitud.",
    vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Protección del gasoducto de Camisea</b> · objetivo crítico en zona VRAEM." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Corredor minero</b> · seguridad ante bloqueos y conflictividad." },
      { nivel: "low", tag: "MED", texto_html: "<b>Infraestructura andina</b> · acceso difícil para respuesta rápida." }
    ],
    mision_titulo: "Misión en Seguridad Energética",
    mision: [
      { titulo: "PROTECCIÓN DE CAMISEA", texto_html: "Seguridad del ducto y de las instalaciones de gas." },
      { titulo: "CORREDOR MINERO", texto_html: "Apoyo al orden público para la continuidad de operaciones." },
      { titulo: "INFRAESTRUCTURA CRÍTICA", texto_html: "Custodia de hidroeléctricas y refinería de Talara." },
      { titulo: "FRONTERAS", texto_html: "Control del contrabando de combustible." }
    ],
    mision_cita: "IISS 2024."
  },
  politicas: {
    src: "MINEM · Osinergmin · COES",
    planes_titulo: "Planes nacionales",
    planes: [
      { nombre: "Política Energética Nacional 2010–2040", texto: "Diversificación y seguridad de suministro." },
      { nombre: "Masificación del gas natural", texto: "Llevar gas a regiones (SiteGas)." },
      { nombre: "Subastas RER", texto: "Recursos energéticos renovables." },
      { nombre: "Modernización de Talara", texto: "Reducir déficit de refinación." }
    ],
    instituciones_titulo: "Instituciones clave",
    instituciones: [
      { sigla: "MINEM", texto: "ministerio de energía y minas." },
      { sigla: "Osinergmin", texto: "regulador de energía y minería." },
      { sigla: "COES", texto: "operador del sistema eléctrico." },
      { sigla: "Petroperú", texto: "petrolera estatal (refinación)." }
    ],
    transicion_titulo: "Transición y economía",
    transicion_html: "<p>El reto es <b>diversificar</b> más allá de Camisea (solar del sur, segundo ducto) y resolver el déficit de refinación, mientras la minería del cobre crece como demanda y motor fiscal.</p>",
    transicion_cita: "MINEM PEN; IEA 2024."
  },
  crisis: {
    src: "Wargaming · Cone of Plausibility",
    matriz_titulo: "Matriz Probabilidad × Impacto",
    matriz: {
      esquina: "Impacto ↓ / Prob →",
      prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
      filas: [
        { impacto: "Catastrófico", celdas: [{ nivel: 3 }, { nivel: 4 }, { nivel: 5, texto: "Corte del ducto Camisea" }, { nivel: 5 }, { nivel: 5 }] },
        { impacto: "Mayor", celdas: [{ nivel: 2 }, { nivel: 3 }, { nivel: 4, texto: "Bloqueos corredor minero" }, { nivel: 4 }, { nivel: 5 }] },
        { impacto: "Moderado", celdas: [{ nivel: 1 }, { nivel: 2 }, { nivel: 3, texto: "Sequía (hidro)" }, { nivel: 4, texto: "Sismo mayor" }, { nivel: 4 }] },
        { impacto: "Menor", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 3 }, { nivel: 3 }] },
        { impacto: "Insignif.", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 2 }] }
      ]
    },
    matriz_cita: "Escala HM Treasury Orange Book.",
    escenarios_titulo: "Escenarios calibrados",
    escenarios: [
      { nivel: "high", tag: "A", texto_html: "<b>Corte del ducto de Camisea</b> — crisis de gas y electricidad. <i>Respuesta:</i> reservas, segundo ducto, diésel de respaldo." },
      { nivel: "med", tag: "B", texto_html: "<b>Bloqueos en el corredor minero</b> — parálisis de exportación. <i>Respuesta:</i> diálogo, seguridad, rutas alternas." },
      { nivel: "med", tag: "C", texto_html: "<b>Sismo mayor</b> — daño a infraestructura. <i>Respuesta:</i> redundancia, normas sísmicas." },
      { nivel: "med", tag: "D", texto_html: "<b>Sequía</b> — baja hidro. <i>Respuesta:</i> gas y renovables de respaldo." }
    ],
    vectores_titulo: "Respuesta estratégica integrada — vectores",
    vectores: [
      { titulo: "DIVERSIFICAR TRANSPORTE", texto: "Segundo ducto y redundancia de gas." },
      { titulo: "SOLAR DEL SUR", texto: "Aprovechar el potencial del altiplano." },
      { titulo: "REFINACIÓN", texto: "Talara para reducir importación de derivados." },
      { titulo: "SEGURIDAD MINERA", texto: "Continuidad del corredor del cobre." }
    ]
  },
  referencias: {
    src: "Triangulación multi-fuente",
    titulo: "Fuentes primarias y académicas",
    items: [
      "MINEM (2024). <i>Balance Energético Nacional</i>.",
      "Osinergmin (2024). <i>La industria del gas natural en el Perú</i>.",
      "IEA (2024). <i>Peru Energy Profile</i>.",
      "USGS (2024). <i>Mineral Commodity Summaries</i>.",
      "APERC (2007). <i>A Quest for Energy Security in the 21st Century</i>. Tokio."
    ]
  },
  footer: "Documento de sustentación · Rúbrica Slide18 · Logística Militar · Mayo 2026"
});

/* === ECUADOR ============================================================ */
P({
  schema_version: "1.0.0",
  meta: {
    pais: "Ecuador", pais_iso: "ECU", pais_iso2: "EC", subtitulo_pais: "República del",
    eyebrow: "Portafolio · Seguridad Energética por País",
    titulo: "Seguridad Energética del Ecuador:<br/>crudo amazónico e hidrodependencia",
    subtitulo: "Exportador de crudo amazónico con una electricidad muy hidrodependiente: los estiajes provocan apagones, los subsidios pesan en las finanzas y la refinación es deficitaria.",
    estudiante: "Cátedra (ejemplo de referencia)", asignatura: "Logística Militar · Rúbrica Slide18",
    tipo_doc: "Documento de sustentación", fecha: "Mayo 2026",
    fuerzas_armadas: "Fuerzas Armadas del Ecuador", aperc_global: 5.0,
    cita_corta: "MEM, 2024; ARCONEL; OPEP.",
    portafolio_label: "Rúbrica Slide18<br/>Logística Militar<br/>v2 — académica",
    map_view: { lat: -1.5, lng: -78.5, zoom: 6 }
  },
  resumen: {
    tesis_html: "Ecuador es <b>exportador de crudo amazónico</b> (ex-OPEP) con una electricidad <i>muy hidrodependiente</i> (Coca Codo Sinclair). Los <b>estiajes</b> de 2023-2024 provocaron apagones nacionales. Carga con fuertes <b>subsidios a combustibles</b> y un déficit de refinación que obliga a importar derivados; el debate ITT/Yasuní marca su política petrolera.",
    conclusion_html: "APERC <b>5.0/10</b>: <i>availability</i> en crudo pero <i>robustness</i> y <i>affordability</i> débiles (apagones, subsidios). Las FF.AA. protegen el SOTE/OCP y la infraestructura amazónica.",
    kpis: [
      { valor: 0.46, unidad: "Mb/d", etiqueta: "Producción de crudo", decimal: true },
      { valor: 79, unidad: "%", etiqueta: "Hidro en electricidad" },
      { valor: 4, unidad: "Bbbl", etiqueta: "Reservas de crudo" },
      { valor: 12, unidad: "h/día", etiqueta: "Apagones pico (2024)" }
    ]
  },
  aperc: {
    src: "APERC 2007 · MEM 2024",
    definicion_html: "<p>Ecuador muestra cómo la <i>hidrodependencia</i> sin respaldo erosiona la <i>robustness</i>: en estiaje, la baja del embalse de Coca Codo Sinclair deja al país a oscuras. La <i>affordability</i> sufre por subsidios insostenibles.</p>",
    definicion_cita: "MEM; ARCONEL 2024.",
    scorecard_titulo: "Scorecard del Ecuador bajo APERC",
    scores: [
      { letra: "A", nombre: "vailability", desc: "Crudo amazónico; gran hidro; potencial solar.", score: 6.0 },
      { letra: "A", nombre: "ccessibility", desc: "Déficit de refinación; importa derivados.", score: 4.5 },
      { letra: "A", nombre: "ffordability", desc: "Subsidios costosos; apagones.", score: 4.5 },
      { letra: "A", nombre: "cceptability", desc: "Electricidad limpia, pero crudo en Amazonía (Yasuní).", score: 5.0 }
    ],
    scorecard_cita: "Scores propios sobre indicadores normalizados.",
    comparador: { pais_b: "Colombia", pais_c: "Perú" },
    indicadores_titulo: "Indicadores cuantitativos aplicados",
    indicadores: [
      { indicador: "Hidro en electricidad (%)", definicion: "Generación", propio: "79", b: "70", c: "55", interp: { texto: "Hiperdependiente", pill: "warn" } },
      { indicador: "Horas de apagón (2024)", definicion: "Pico", propio: "hasta 12/día", b: "bajo", c: "bajo", interp: { texto: "Crisis por estiaje", pill: "danger" } },
      { indicador: "Subsidio a combustibles (% PIB)", definicion: "Estimado", propio: "~3", b: "0", c: "0", interp: { texto: "Carga fiscal", pill: "warn" } },
      { indicador: "Utilización de refinación (%)", definicion: "Esmeraldas", propio: "60", b: "70", c: "70", interp: { texto: "Deficitaria" } }
    ],
    indicadores_nota: "Comparación con Colombia y Perú (vecinos andinos)."
  },
  matriz: {
    src: "MEM · Ember 2024",
    primaria_titulo: "Energía Primaria (TPES, %)",
    primaria: [
      { label: "Petróleo", valor: 70, color: "#c4570e" },
      { label: "Hidro", valor: 16, color: "#2e7d32" },
      { label: "Gas natural", valor: 8, color: "#0b5394" },
      { label: "Biomasa/otros", valor: 6, color: "#a17c1c" }
    ],
    primaria_cita: "Petróleo 70 · Hidro 16 · Gas 8. <i>Fuente: MEM 2024.</i>",
    electrica_titulo: "Generación Eléctrica (%)",
    electrica: [
      { label: "Hidro", valor: 79, color: "#2e7d32" },
      { label: "Petróleo/Térmica", valor: 18, color: "#c4570e" },
      { label: "Solar/Eólica", valor: 3, color: "#a17c1c" }
    ],
    electrica_cita: "Hidro 79 · Térmica 18 · Renov. 3. <i>Fuente: ARCONEL 2024.</i>",
    comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
    comparativa: {
      paises: ["Ecuador", "Colombia", "Perú"],
      series: [
        { label: "Hidro", data: [79, 70, 55], color: "#2e7d32" },
        { label: "Térmica/Petróleo", data: [18, 2, 0], color: "#c4570e" },
        { label: "Gas", data: [0, 16, 40], color: "#0b5394" },
        { label: "Carbón", data: [0, 8, 0], color: "#8a4a4a" },
        { label: "Solar/Eólica", data: [3, 4, 5], color: "#a17c1c" }
      ]
    },
    comparativa_nota: "Mayor hidrodependencia de la región → mayor riesgo en estiaje."
  },
  sankey: {
    src: "Producción → Transformación → Uso final",
    titulo_panel: "Flujos físicos de energía, Ecuador (PJ aprox.)",
    flujos: [
      { from: "Crudo amazónico", to: "Exportación de crudo", flow: 1500 },
      { from: "Crudo amazónico", to: "Refinación local", flow: 800 },
      { from: "Refinación local", to: "Combustibles refinados", flow: 600 },
      { from: "Combustibles importados", to: "Transporte", flow: 900 },
      { from: "Combustibles refinados", to: "Transporte", flow: 550 },
      { from: "Hidro (Coca Codo)", to: "Generación eléctrica", flow: 1400 },
      { from: "Térmica", to: "Generación eléctrica", flow: 350 },
      { from: "Generación eléctrica", to: "Industria & residencial", flow: 1600 }
    ],
    nodos: {
      "Crudo amazónico": { color: "#c4570e", label: "Crudo amazónico" },
      "Combustibles importados": { color: "#a82822", label: "Derivados importados" },
      "Hidro (Coca Codo)": { color: "#2e7d32", label: "Hidro (Coca Codo)" },
      "Térmica": { color: "#8a4a4a", label: "Térmica" },
      "Refinación local": { color: "#c4570e", label: "Refinería Esmeraldas" },
      "Combustibles refinados": { color: "#a17c1c", label: "Combustibles" },
      "Generación eléctrica": { color: "#6b4e8e", label: "Generación eléctrica" },
      "Exportación de crudo": { color: "#8a4a4a", label: "EXPORT · Crudo" },
      "Industria & residencial": { color: "#4a5870", label: "Industria + Residencial" },
      "Transporte": { color: "#c4570e", label: "Transporte" }
    },
    cita: "Exporta crudo pero importa derivados; la electricidad depende del agua. <i>Datos estilizados.</i>"
  },
  evolucion: {
    src: "2000–2050 · hidro y subsidios",
    historico_titulo: "Mix Eléctrico Histórico y Proyectado (%)",
    anios: ["2000", "2010", "2016", "2024", "2035", "2050"],
    series: [
      { label: "Hidro", data: [70, 55, 75, 79, 70, 60], color: "#2e7d32" },
      { label: "Térmica/Petróleo", data: [30, 44, 23, 18, 12, 5], color: "#c4570e" },
      { label: "Solar/Eólica", data: [0, 1, 2, 3, 18, 35], color: "#a17c1c" }
    ],
    historico_cita: "Coca Codo Sinclair (2016) elevó la hidro, pero aumentó la exposición al estiaje.",
    hitos_titulo: "Hitos del Régimen Energético",
    hitos: [
      { anio: "1972", evento: "Inicio de la exportación petrolera (SOTE)." },
      { anio: "1973", evento: "Ingreso a la OPEP (salió en 2020)." },
      { anio: "2016", evento: "Entrada de Coca Codo Sinclair (1.5 GW)." },
      { anio: "2023", evento: "Consulta del Yasuní: dejar el crudo del ITT bajo tierra." },
      { anio: "2024", evento: "Apagones nacionales por estiaje severo." }
    ]
  },
  infraestructura: {
    src: "Mapa Leaflet · GEM",
    mapa_titulo: "Hidro, crudo y refinación",
    pines: [
      { lat: -0.12, lng: -77.55, tipo: "almacenamiento", nombre: "Hidro Coca Codo Sinclair", desc: "1.5 GW · base del sistema (estiaje crítico)" },
      { lat: 0.98, lng: -79.65, tipo: "refineria", nombre: "Refinería de Esmeraldas", desc: "Principal refinería del país" },
      { lat: -0.95, lng: -75.4, tipo: "refineria", nombre: "Bloques amazónicos / ITT", desc: "Crudo pesado de la Amazonía (Yasuní)" },
      { lat: 0.95, lng: -79.62, tipo: "gnl", nombre: "Terminal Balao", desc: "Exportación de crudo (fin del SOTE)" },
      { lat: -2.2, lng: -79.9, tipo: "almacenamiento", nombre: "Hidro Paute-Molino", desc: "Complejo hidroeléctrico del sur" }
    ],
    rutas: [
      { puntos: [[-0.95, -75.4], [-0.3, -78], [0.98, -79.65], [0.95, -79.62]], tooltip: "Oleoducto SOTE: Amazonía → Esmeraldas/Balao" }
    ],
    leyenda: [
      { color: "#2e7d32", label: "Hidroeléctrica" },
      { color: "#c4570e", label: "Crudo / refinería" },
      { color: "#0b5394", label: "Terminal de exportación" }
    ],
    mapa_cita: "Coordenadas reales de Coca Codo, Esmeraldas, ITT, Balao, Paute. <i>Fuentes: GEM 2024.</i>",
    vulnerabilidades_titulo: "Vulnerabilidades técnicas",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Estiaje hidroeléctrico</b> · sin respaldo, el país sufre apagones de hasta 12 h/día (2024)." },
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Subsidios</b> · presión fiscal y contrabando hacia países vecinos." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>SOTE/OCP</b> · oleoductos expuestos a deslizamientos (erosión regresiva del río Coca) y derrames." },
      { nivel: "low", tag: "MED", texto_html: "<b>Déficit de refinación</b> · importación de derivados." }
    ],
    capacidad_titulo: "Capacidad vs Demanda eléctrica (GW)",
    capacidad: {
      anios: ["2016", "2020", "2024", "2030"],
      y_titulo: "GW",
      series: [
        { label: "Hidro (GW)", tipo: "bar", data: [4.5, 5.0, 5.1, 5.8], color: "#2e7d32" },
        { label: "Térmica/Renov. (GW)", tipo: "bar", data: [2.0, 1.8, 1.7, 2.5], color: "#c4570e" },
        { label: "Demanda pico (GW)", tipo: "line", data: [3.6, 3.9, 4.4, 5.2], color: "#a17c1c" }
      ]
    },
    capacidad_cita: "Poco respaldo térmico/renovable agrava el estiaje. <i>Fuente: CENACE.</i>"
  },
  geopolitica: {
    src: "Radar APERC normalizado",
    radar_titulo: "Radar APERC: Ecuador vs Colombia vs Perú",
    radar: {
      ejes: ["Availability", "Accessibility", "Affordability", "Acceptability", "Sovereignty", "Robustness", "Resilience"],
      series: [
        { label: "Ecuador", data: [6.0, 4.5, 4.5, 5.0, 5.5, 3.5, 4.0], color: "#c4570e" },
        { label: "Colombia", data: [6.5, 6.0, 6.0, 6.5, 6.5, 6.0, 5.5], color: "#2e7d32" },
        { label: "Perú", data: [6.5, 6.0, 6.3, 6.0, 6.5, 5.5, 6.0], color: "#0b5394" }
      ]
    },
    radar_cita: "Normalización min-max sobre indicadores §01.",
    dependencias_titulo: "Dependencias y socios",
    dependencias: [
      { vinculo: "Exportación de crudo a EE.UU./Asia", pct: "—", riesgo: { texto: "Ingreso fiscal clave", pill: "warn" } },
      { vinculo: "Importación de derivados", pct: "—", riesgo: { texto: "Déficit de refinación", pill: "danger" } },
      { vinculo: "Importación de electricidad de Colombia", pct: "—", riesgo: { texto: "Respaldo en estiaje", pill: "warn" } },
      { vinculo: "Preventas de crudo a China", pct: "—", riesgo: { texto: "Compromiso de volúmenes", pill: "warn" } }
    ],
    dependencias_cita: "MEM; BCE 2024.",
    minerales_titulo: "Posición energética",
    minerales: [
      { valor: "79", unidad: "%", etiqueta: "HIDRO ELÉCTRICA" },
      { valor: "4", unidad: " Bbbl", etiqueta: "RESERVAS DE CRUDO" },
      { valor: "ITT", unidad: "", etiqueta: "DEBATE YASUNÍ" }
    ],
    minerales_cita: "OPEP; MEM 2024."
  },
  militar: {
    titulo_seccion: "Combustibles Militares y Rol Operacional de las Fuerzas Armadas del Ecuador",
    nav_label: "Combustibles militares",
    src: "IISS · Ministerio de Defensa",
    combustibles_titulo: "Demanda de combustibles de las FF.AA.",
    combustibles: [
      { codigo: "Jet A-1", tipo: "Queroseno de aviación", usuario: "Fuerza Aérea", ml_anio: "70" },
      { codigo: "Diésel naval", tipo: "Diésel", usuario: "Armada", ml_anio: "45" },
      { codigo: "Diésel terrestre", tipo: "Diésel", usuario: "Ejército", ml_anio: "60" }
    ],
    combustibles_total: "~175",
    combustibles_cita: "Estimación de orden de magnitud.",
    vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Protección del SOTE/OCP</b> · oleoductos clave y vulnerables (erosión, atentados)." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Crimen organizado</b> · presión sobre infraestructura y combustible." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Contrabando de combustible</b> · fronteras con Colombia y Perú." }
    ],
    mision_titulo: "Misión en Seguridad Energética",
    mision: [
      { titulo: "PROTECCIÓN DE OLEODUCTOS", texto_html: "Seguridad del SOTE/OCP y de la Amazonía petrolera." },
      { titulo: "ANTI-CONTRABANDO", texto_html: "Control del desvío de combustible subsidiado." },
      { titulo: "INFRAESTRUCTURA ELÉCTRICA", texto_html: "Custodia de hidroeléctricas en crisis." },
      { titulo: "ORDEN INTERNO", texto_html: "Apoyo ante la violencia del crimen organizado." }
    ],
    mision_cita: "IISS 2024."
  },
  politicas: {
    src: "MEM · ARCONEL · CENACE",
    planes_titulo: "Planes nacionales",
    planes: [
      { nombre: "Plan Maestro de Electricidad", texto: "Expansión y diversificación de la generación." },
      { nombre: "Focalización de subsidios", texto: "Reducir el costo fiscal de los combustibles." },
      { nombre: "Bloque ITT / Yasuní", texto: "Cierre progresivo tras la consulta de 2023." },
      { nombre: "Renovables no convencionales", texto: "Solar, eólica y geotermia." }
    ],
    instituciones_titulo: "Instituciones clave",
    instituciones: [
      { sigla: "MEM", texto: "ministerio de energía y minas." },
      { sigla: "Petroecuador", texto: "petrolera estatal." },
      { sigla: "ARCONEL / CENACE", texto: "regulación y operación eléctrica." },
      { sigla: "CELEC EP", texto: "generación pública (hidro)." }
    ],
    transicion_titulo: "Transición y economía",
    transicion_html: "<p>El reto inmediato es <b>respaldar la hidro</b> (térmica/renovable/importación) para evitar apagones, racionalizar subsidios y decidir el futuro del crudo amazónico tras el mandato del Yasuní.</p>",
    transicion_cita: "MEM; IEA 2024."
  },
  crisis: {
    src: "Wargaming · Cone of Plausibility",
    matriz_titulo: "Matriz Probabilidad × Impacto",
    matriz: {
      esquina: "Impacto ↓ / Prob →",
      prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
      filas: [
        { impacto: "Catastrófico", celdas: [{ nivel: 3 }, { nivel: 4 }, { nivel: 5, texto: "Apagón nacional" }, { nivel: 5, texto: "Estiaje severo" }, { nivel: 5 }] },
        { impacto: "Mayor", celdas: [{ nivel: 2 }, { nivel: 3 }, { nivel: 4, texto: "Crisis fiscal por subsidios" }, { nivel: 4 }, { nivel: 5 }] },
        { impacto: "Moderado", celdas: [{ nivel: 1 }, { nivel: 2 }, { nivel: 3, texto: "Ruptura del SOTE" }, { nivel: 4, texto: "Ataques a infraestructura" }, { nivel: 4 }] },
        { impacto: "Menor", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 3 }, { nivel: 3 }] },
        { impacto: "Insignif.", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 2 }] }
      ]
    },
    matriz_cita: "Escala HM Treasury Orange Book.",
    escenarios_titulo: "Escenarios calibrados",
    escenarios: [
      { nivel: "high", tag: "A", texto_html: "<b>Estiaje severo</b> — apagones nacionales (2024). <i>Respuesta:</i> térmicas, importación de Colombia, gestión de demanda." },
      { nivel: "high", tag: "B", texto_html: "<b>Crisis fiscal por subsidios</b> — insostenibilidad. <i>Respuesta:</i> focalización gradual." },
      { nivel: "med", tag: "C", texto_html: "<b>Ruptura del SOTE</b> (erosión del río Coca) — derrame y corte de exportación. <i>Respuesta:</i> variantes, contención ambiental." },
      { nivel: "med", tag: "D", texto_html: "<b>Ataques del crimen organizado</b> a infraestructura. <i>Respuesta:</i> protección militar." }
    ],
    vectores_titulo: "Respuesta estratégica integrada — vectores",
    vectores: [
      { titulo: "RESPALDO DE GENERACIÓN", texto: "Térmica y renovable para no depender solo del agua." },
      { titulo: "INTERCONEXIÓN", texto: "Importar electricidad de Colombia en estiaje." },
      { titulo: "FOCALIZAR SUBSIDIOS", texto: "Aliviar la carga fiscal." },
      { titulo: "PROTEGER OLEODUCTOS", texto: "Seguridad del SOTE/OCP." }
    ]
  },
  referencias: {
    src: "Triangulación multi-fuente",
    titulo: "Fuentes primarias y académicas",
    items: [
      "MEM Ecuador (2024). <i>Balance Energético Nacional</i>.",
      "ARCONEL / CENACE (2024). Informes del sector eléctrico.",
      "OPEC (2020). <i>Annual Statistical Bulletin</i>.",
      "IEA (2024). <i>Ecuador Energy Profile</i>.",
      "APERC (2007). <i>A Quest for Energy Security in the 21st Century</i>. Tokio."
    ]
  },
  footer: "Documento de sustentación · Rúbrica Slide18 · Logística Militar · Mayo 2026"
});

/* === CHILE ============================================================== */
P({
  schema_version: "1.0.0",
  meta: {
    pais: "Chile", pais_iso: "CHL", pais_iso2: "CL", subtitulo_pais: "República de",
    eyebrow: "Portafolio · Seguridad Energética por País",
    titulo: "Seguridad Energética de Chile:<br/>cobre, litio y el sol del Atacama",
    subtitulo: "Gran productor de cobre y litio con un potencial solar excepcional y una transición renovable agresiva, frente a una dependencia histórica de la importación de hidrocarburos.",
    estudiante: "Cátedra (ejemplo de referencia)", asignatura: "Logística Militar · Rúbrica Slide18",
    tipo_doc: "Documento de sustentación", fecha: "Mayo 2026",
    fuerzas_armadas: "Fuerzas Armadas de Chile", aperc_global: 6.5,
    cita_corta: "CNE, 2024; IEA, 2024; Coordinador Eléctrico.",
    portafolio_label: "Rúbrica Slide18<br/>Logística Militar<br/>v2 — académica",
    map_view: { lat: -35, lng: -71, zoom: 4 }
  },
  resumen: {
    tesis_html: "Chile combina liderazgo en <b>cobre y litio</b> (Atacama) con el <i>mejor recurso solar del mundo</i> y una transición renovable acelerada (salida del carbón). Su debilidad histórica es la <b>dependencia de importación</b> de petróleo, gas y carbón. Apuesta fuerte por el <b>hidrógeno verde</b> y la electromovilidad.",
    conclusion_html: "APERC <b>6.5/10</b>: alta <i>acceptability</i> (renovables) y minerales de transición, pero <i>availability</i> de fósiles importada. Las FF.AA. protegen infraestructura crítica y la zona minera del norte.",
    kpis: [
      { valor: 35, unidad: "%", etiqueta: "Solar+eólica en electricidad" },
      { valor: 1, unidad: "º", etiqueta: "Productor de cobre mundial" },
      { valor: 2, unidad: "º", etiqueta: "Productor de litio mundial" },
      { valor: 2040, unidad: "", etiqueta: "Meta de salida del carbón" }
    ]
  },
  aperc: {
    src: "APERC 2007 · CNE 2024",
    definicion_html: "<p>Chile maximiza la <i>acceptability</i> con el sol del Atacama y los minerales de la transición, pero importa casi todos sus hidrocarburos. Su reto de <i>robustness</i> es la transmisión norte-centro y el estrés hídrico minero.</p>",
    definicion_cita: "CNE; IEA 2024.",
    scorecard_titulo: "Scorecard de Chile bajo APERC",
    scores: [
      { letra: "A", nombre: "vailability", desc: "Sol/viento excepcional; importa fósiles.", score: 6.0 },
      { letra: "A", nombre: "ccessibility", desc: "GNL diversificado; transmisión como cuello.", score: 6.5 },
      { letra: "A", nombre: "ffordability", desc: "Costos a la baja por solar.", score: 6.0 },
      { letra: "A", nombre: "cceptability", desc: "Descarbonización agresiva; H₂ verde.", score: 7.5 }
    ],
    scorecard_cita: "Scores propios sobre indicadores normalizados.",
    comparador: { pais_b: "Perú", pais_c: "Australia" },
    indicadores_titulo: "Indicadores cuantitativos aplicados",
    indicadores: [
      { indicador: "Solar+eólica en electricidad (%)", definicion: "Generación", propio: "35", b: "5", c: "29", interp: { texto: "Líder regional", pill: "ok" } },
      { indicador: "Producción de cobre (Mt)", definicion: "Anual", propio: "5.3", b: "2.6", c: "0.9", interp: { texto: "#1 mundial" } },
      { indicador: "Producción de litio (kt)", definicion: "Anual", propio: "alto", b: "0", c: "alto", interp: { texto: "#2 mundial" } },
      { indicador: "Dependencia fósil importada (%)", definicion: "Neta", propio: "alta", b: "media", c: "−330%", interp: { texto: "Importador neto", pill: "warn" } }
    ],
    indicadores_nota: "Comparación con Perú (minero) y Australia (litio/exportador)."
  },
  matriz: {
    src: "CNE · Ember 2024",
    primaria_titulo: "Energía Primaria (TPES, %)",
    primaria: [
      { label: "Petróleo", valor: 42, color: "#c4570e" },
      { label: "Carbón", valor: 18, color: "#8a4a4a" },
      { label: "Gas natural", valor: 16, color: "#0b5394" },
      { label: "Renovables", valor: 18, color: "#a17c1c" },
      { label: "Hidro", valor: 6, color: "#2e7d32" }
    ],
    primaria_cita: "Petróleo 42 · Carbón 18 · Gas 16 · Renov. 18. <i>Fuente: CNE 2024.</i>",
    electrica_titulo: "Generación Eléctrica (%)",
    electrica: [
      { label: "Solar", valor: 22, color: "#a17c1c" },
      { label: "Carbón", valor: 18, color: "#8a4a4a" },
      { label: "Hidro", valor: 23, color: "#2e7d32" },
      { label: "Gas", valor: 18, color: "#0b5394" },
      { label: "Eólica", valor: 13, color: "#6a8caf" },
      { label: "Otros", valor: 6, color: "#4a5870" }
    ],
    electrica_cita: "Solar 22 · Hidro 23 · Carbón 18 · Gas 18 · Eólica 13. <i>Fuente: Ember 2024.</i>",
    comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
    comparativa: {
      paises: ["Chile", "Perú", "Australia"],
      series: [
        { label: "Solar/Eólica", data: [35, 5, 29], color: "#a17c1c" },
        { label: "Hidro", data: [23, 55, 6], color: "#2e7d32" },
        { label: "Carbón", data: [18, 0, 46], color: "#8a4a4a" },
        { label: "Gas", data: [18, 40, 16], color: "#0b5394" }
      ]
    },
    comparativa_nota: "Chile lidera la penetración renovable variable de la región."
  },
  sankey: {
    src: "Producción → Transformación → Uso final",
    titulo_panel: "Flujos físicos de energía, Chile (PJ aprox.)",
    flujos: [
      { from: "Petróleo importado", to: "Refinación local", flow: 2200 },
      { from: "Refinación local", to: "Transporte", flow: 2000 },
      { from: "GNL importado", to: "Generación eléctrica", flow: 900 },
      { from: "Carbón importado", to: "Generación eléctrica", flow: 800 },
      { from: "Solar/Eólica", to: "Generación eléctrica", flow: 1600 },
      { from: "Hidro", to: "Generación eléctrica", flow: 1000 },
      { from: "Generación eléctrica", to: "Minería (cobre/litio)", flow: 1800 },
      { from: "Generación eléctrica", to: "Industria & residencial", flow: 1700 }
    ],
    nodos: {
      "Petróleo importado": { color: "#c4570e", label: "Petróleo importado" },
      "GNL importado": { color: "#0b5394", label: "GNL importado" },
      "Carbón importado": { color: "#8a4a4a", label: "Carbón importado" },
      "Solar/Eólica": { color: "#a17c1c", label: "Solar & Eólica" },
      "Hidro": { color: "#2e7d32", label: "Hidro" },
      "Refinación local": { color: "#c4570e", label: "Refinerías" },
      "Generación eléctrica": { color: "#6b4e8e", label: "Generación eléctrica" },
      "Minería (cobre/litio)": { color: "#a17c1c", label: "Minería (cobre/litio)" },
      "Industria & residencial": { color: "#4a5870", label: "Industria + Residencial" },
      "Transporte": { color: "#c4570e", label: "Transporte" }
    },
    cita: "La minería del cobre/litio es el gran consumidor; la solar la abastece cada vez más. <i>Datos estilizados.</i>"
  },
  evolucion: {
    src: "2000–2050 · descarbonización",
    historico_titulo: "Mix Eléctrico Histórico y Proyectado (%)",
    anios: ["2000", "2010", "2020", "2024", "2035", "2050"],
    series: [
      { label: "Carbón", data: [30, 40, 37, 18, 5, 0], color: "#8a4a4a" },
      { label: "Solar/Eólica", data: [0, 1, 22, 35, 60, 75], color: "#a17c1c" },
      { label: "Hidro", data: [50, 40, 26, 23, 20, 18], color: "#2e7d32" },
      { label: "Gas", data: [15, 17, 14, 18, 12, 5], color: "#0b5394" }
    ],
    historico_cita: "Salida del carbón y boom solar del Atacama; meta de retiro a 2040 (o antes).",
    hitos_titulo: "Hitos del Régimen Energético",
    hitos: [
      { anio: "2004", evento: "Crisis del gas argentino: cortes de suministro." },
      { anio: "2009", evento: "Primer terminal de GNL (Quintero)." },
      { anio: "2016", evento: "Subastas con récords mundiales de precio solar." },
      { anio: "2019", evento: "Plan de retiro de centrales a carbón." },
      { anio: "2022", evento: "Estrategia Nacional de Hidrógeno Verde." },
      { anio: "2023", evento: "Estrategia Nacional del Litio (mayor rol estatal)." }
    ]
  },
  infraestructura: {
    src: "Mapa Leaflet · GEM",
    mapa_titulo: "Solar, litio, cobre y GNL",
    pines: [
      { lat: -22.76, lng: -69.47, tipo: "minerales", nombre: "Solar Cerro Dominador", desc: "Termosolar + fotovoltaica (Atacama)" },
      { lat: -23.5, lng: -68.2, tipo: "minerales", nombre: "Litio Salar de Atacama", desc: "SQM/Albemarle · #2 mundial" },
      { lat: -24.27, lng: -69.07, tipo: "minerales", nombre: "Cobre Escondida", desc: "Mayor mina de cobre del mundo" },
      { lat: -32.78, lng: -71.53, tipo: "gnl", nombre: "Terminal GNL Quintero", desc: "Importación de GNL (zona central)" },
      { lat: -23.1, lng: -70.45, tipo: "gnl", nombre: "Mejillones (GNL/carbón)", desc: "Hub energético del norte" }
    ],
    rutas: [
      { puntos: [[-22.76, -69.47], [-25, -70], [-30, -71], [-33.4, -70.7]], tooltip: "Transmisión: solar del norte → centro" }
    ],
    leyenda: [
      { color: "#a17c1c", label: "Solar / litio" },
      { color: "#0b5394", label: "GNL" },
      { color: "#8a4a4a", label: "Cobre / carbón" }
    ],
    mapa_cita: "Coordenadas reales de Cerro Dominador, Salar de Atacama, Escondida, Quintero, Mejillones. <i>Fuentes: GEM 2024.</i>",
    vulnerabilidades_titulo: "Vulnerabilidades técnicas",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Dependencia fósil importada</b> · sin petróleo ni gas propios significativos." },
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Transmisión norte-centro</b> · la solar del Atacama necesita líneas para llegar a la demanda (curtailment)." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Estrés hídrico</b> · la minería compite por agua escasa en el norte." },
      { nivel: "low", tag: "MED", texto_html: "<b>Sismicidad</b> · uno de los países más sísmicos del mundo." }
    ],
    capacidad_titulo: "Capacidad instalada (GW)",
    capacidad: {
      anios: ["2020", "2024", "2030", "2040"],
      y_titulo: "GW",
      series: [
        { label: "Solar/Eólica (GW)", tipo: "bar", data: [7, 14, 30, 55], color: "#a17c1c" },
        { label: "Carbón (GW)", tipo: "bar", data: [5, 3, 1, 0], color: "#8a4a4a" },
        { label: "Demanda pico (GW)", tipo: "line", data: [11, 12, 16, 22], color: "#c4570e" }
      ]
    },
    capacidad_cita: "Salida del carbón compensada por solar/eólica + almacenamiento. <i>Fuente: CNE.</i>"
  },
  geopolitica: {
    src: "Radar APERC normalizado",
    radar_titulo: "Radar APERC: Chile vs Perú vs Australia",
    radar: {
      ejes: ["Availability", "Accessibility", "Affordability", "Acceptability", "Sovereignty", "Robustness", "Resilience"],
      series: [
        { label: "Chile", data: [6.0, 6.5, 6.0, 7.5, 6.5, 6.5, 7.0], color: "#0b5394" },
        { label: "Perú", data: [6.5, 6.0, 6.3, 6.0, 6.5, 5.5, 6.0], color: "#a17c1c" },
        { label: "Australia", data: [8.5, 4.8, 6.0, 5.5, 7.0, 6.2, 6.5], color: "#2e7d32" }
      ]
    },
    radar_cita: "Normalización min-max sobre indicadores §01.",
    dependencias_titulo: "Dependencias y socios",
    dependencias: [
      { vinculo: "Exportación de cobre a China", pct: "55", riesgo: { texto: "Cliente dominante", pill: "warn" } },
      { vinculo: "Exportación de litio (China/Corea)", pct: "—", riesgo: { texto: "Cadena de baterías", pill: "ok" } },
      { vinculo: "Importación de GNL/petróleo/carbón", pct: "—", riesgo: { texto: "Sin fósiles propios", pill: "warn" } },
      { vinculo: "Hidrógeno verde a Europa/Asia", pct: "—", riesgo: { texto: "Futuro vector de exportación", pill: "ok" } }
    ],
    dependencias_cita: "CNE; Cochilco 2024.",
    minerales_titulo: "Minerales de la transición",
    minerales: [
      { valor: "#1", unidad: " mundial", etiqueta: "COBRE" },
      { valor: "#2", unidad: " mundial", etiqueta: "LITIO" },
      { valor: "#1", unidad: " mundial", etiqueta: "RECURSO SOLAR (Atacama)" }
    ],
    minerales_cita: "USGS; Cochilco 2024."
  },
  militar: {
    titulo_seccion: "Combustibles Militares y Rol Operacional de las Fuerzas Armadas de Chile",
    nav_label: "Combustibles militares",
    src: "IISS · Ministerio de Defensa",
    combustibles_titulo: "Demanda de combustibles de las FF.AA.",
    combustibles: [
      { codigo: "JP-8 / Jet A-1", tipo: "Queroseno militar", usuario: "Fuerza Aérea", ml_anio: "180" },
      { codigo: "F-76", tipo: "Diésel naval", usuario: "Armada de Chile", ml_anio: "130" },
      { codigo: "Diésel terrestre", tipo: "Diésel", usuario: "Ejército", ml_anio: "120" }
    ],
    combustibles_total: "~430",
    combustibles_cita: "Estimación de orden de magnitud (Ley del Cobre financió equipamiento).",
    vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa",
    vulnerabilidades: [
      { nivel: "med", tag: "ALTO", texto_html: "<b>Protección de infraestructura minera</b> · cobre/litio son activos estratégicos nacionales." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Importación de combustible</b> · cadena marítima de suministro vulnerable." },
      { nivel: "low", tag: "MED", texto_html: "<b>Soberanía austral</b> · vastas zonas y rutas marítimas que vigilar." }
    ],
    mision_titulo: "Misión en Seguridad Energética",
    mision: [
      { titulo: "INFRAESTRUCTURA CRÍTICA", texto_html: "Protección de minería, puertos y transmisión." },
      { titulo: "SEGURIDAD MARÍTIMA", texto_html: "Custodia de las rutas de importación de combustible." },
      { titulo: "SOBERANÍA DEL LITIO", texto_html: "Rol estatal en recursos estratégicos (Estrategia del Litio)." },
      { titulo: "HADR", texto_html: "Respuesta ante sismos y desastres que afectan la energía." }
    ],
    mision_cita: "IISS 2024."
  },
  politicas: {
    src: "Ministerio de Energía · CNE",
    planes_titulo: "Planes nacionales",
    planes: [
      { nombre: "Plan de Retiro del Carbón", texto: "Cierre de centrales a carbón (meta 2040 o antes)." },
      { nombre: "Estrategia Nacional de Hidrógeno Verde", texto: "Exportación de H₂ verde con el sol del Atacama." },
      { nombre: "Estrategia Nacional del Litio", texto: "Mayor rol estatal en la cadena del litio." },
      { nombre: "Carbono-neutralidad 2050", texto: "Compromiso climático nacional." }
    ],
    instituciones_titulo: "Instituciones clave",
    instituciones: [
      { sigla: "Ministerio de Energía", texto: "rectoría del sector." },
      { sigla: "CNE", texto: "comisión nacional de energía." },
      { sigla: "Coordinador Eléctrico Nacional", texto: "operación del sistema." },
      { sigla: "ENAP / Codelco / SQM", texto: "petróleo estatal; cobre; litio." }
    ],
    transicion_titulo: "Transición y economía",
    transicion_html: "<p>Chile apuesta a ser <b>potencia de la transición</b>: sol del Atacama, cobre y litio para baterías, e hidrógeno verde de exportación. El cuello es la <b>transmisión</b> y el almacenamiento para mover la energía del norte al centro.</p>",
    transicion_cita: "CNE; IEA 2024."
  },
  crisis: {
    src: "Wargaming · Cone of Plausibility",
    matriz_titulo: "Matriz Probabilidad × Impacto",
    matriz: {
      esquina: "Impacto ↓ / Prob →",
      prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
      filas: [
        { impacto: "Catastrófico", celdas: [{ nivel: 3 }, { nivel: 4 }, { nivel: 5, texto: "Megasismo (infra)" }, { nivel: 5 }, { nivel: 5 }] },
        { impacto: "Mayor", celdas: [{ nivel: 2 }, { nivel: 3 }, { nivel: 4, texto: "Crisis de GNL" }, { nivel: 4, texto: "Curtailment masivo" }, { nivel: 5 }] },
        { impacto: "Moderado", celdas: [{ nivel: 1 }, { nivel: 2 }, { nivel: 3, texto: "Estrés hídrico minero" }, { nivel: 4 }, { nivel: 4 }] },
        { impacto: "Menor", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 3 }, { nivel: 3 }] },
        { impacto: "Insignif.", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 2 }] }
      ]
    },
    matriz_cita: "Escala HM Treasury Orange Book.",
    escenarios_titulo: "Escenarios calibrados",
    escenarios: [
      { nivel: "high", tag: "A", texto_html: "<b>Megasismo</b> — daño a puertos/transmisión. <i>Respuesta:</i> normas sísmicas, redundancia, HADR." },
      { nivel: "med", tag: "B", texto_html: "<b>Crisis de GNL</b> — corte de respaldo. <i>Respuesta:</i> diversificar proveedores, almacenamiento." },
      { nivel: "med", tag: "C", texto_html: "<b>Curtailment solar</b> — sin líneas, se pierde energía del norte. <i>Respuesta:</i> transmisión, baterías." },
      { nivel: "med", tag: "D", texto_html: "<b>Estrés hídrico</b> — minería vs agua. <i>Respuesta:</i> desalación, eficiencia." }
    ],
    vectores_titulo: "Respuesta estratégica integrada — vectores",
    vectores: [
      { titulo: "TRANSMISIÓN + STORAGE", texto: "Mover y almacenar la solar del Atacama." },
      { titulo: "HIDRÓGENO VERDE", texto: "Nuevo vector de exportación." },
      { titulo: "DIVERSIFICAR GNL", texto: "Reducir riesgo de respaldo fósil." },
      { titulo: "DESALACIÓN", texto: "Aliviar el estrés hídrico minero." }
    ]
  },
  referencias: {
    src: "Triangulación multi-fuente",
    titulo: "Fuentes primarias y académicas",
    items: [
      "CNE Chile (2024). <i>Anuario Estadístico de Energía</i>.",
      "Cochilco (2024). Estadísticas de cobre y litio.",
      "IEA (2024). <i>Chile Energy Profile</i>.",
      "Ember (2024). <i>Electricity Data Explorer</i>.",
      "APERC (2007). <i>A Quest for Energy Security in the 21st Century</i>. Tokio."
    ]
  },
  footer: "Documento de sustentación · Rúbrica Slide18 · Logística Militar · Mayo 2026"
});

/* === RD DEL CONGO ======================================================= */
P({
  schema_version: "1.0.0",
  meta: {
    pais: "RD del Congo", pais_iso: "COD", pais_iso2: "CD", subtitulo_pais: "República Democrática del",
    eyebrow: "Portafolio · Seguridad Energética por País",
    titulo: "Seguridad Energética de la RD del Congo:<br/>cobalto, cobre y el potencial de Inga",
    subtitulo: "Superpotencia de minerales críticos para la transición (primer productor de cobalto), con un enorme potencial hidroeléctrico (Inga) sin desarrollar y una electrificación nacional bajísima.",
    estudiante: "Cátedra (ejemplo de referencia)", asignatura: "Logística Militar · Rúbrica Slide18",
    tipo_doc: "Documento de sustentación", fecha: "Mayo 2026",
    fuerzas_armadas: "Fuerzas Armadas de la RDC (FARDC)", aperc_global: 4.0,
    cita_corta: "IEA, 2024; USGS, 2024; Banco Mundial.",
    portafolio_label: "Rúbrica Slide18<br/>Logística Militar<br/>v2 — académica",
    map_view: { lat: -2.5, lng: 23.5, zoom: 4 }
  },
  resumen: {
    tesis_html: "La RDC es una <b>superpotencia de minerales críticos</b>: primer productor mundial de <b>cobalto</b> (~70%) y gran productor de cobre, insumos clave para baterías y la transición global. Posee un potencial hidroeléctrico colosal (complejo <b>Inga</b>, proyecto Gran Inga) mayormente sin desarrollar, mientras la <i>electrificación nacional es de las más bajas del mundo</i> (~20%). Gobernanza débil, conflicto en el este y minería artesanal de cobalto.",
    conclusion_html: "APERC <b>4.0/10</b>: <i>availability</i> de recursos enorme (minerales e hidro) pero <i>robustness</i>, <i>accessibility</i> y gobernanza muy débiles. Las FARDC enfrentan la protección de zonas mineras y de Inga en medio del conflicto.",
    kpis: [
      { valor: 70, unidad: "%", etiqueta: "Cobalto mundial" },
      { valor: 21, unidad: "%", etiqueta: "Tasa de electrificación" },
      { valor: 100, unidad: "GW", etiqueta: "Potencial hidro (Gran Inga)" },
      { valor: 2, unidad: "GW", etiqueta: "Hidro instalada (Inga I/II)" }
    ]
  },
  aperc: {
    src: "APERC 2007 · IEA 2024",
    definicion_html: "<p>La RDC ilustra la <i>paradoja de la abundancia</i>: dispone de recursos decisivos para la transición mundial (cobalto, cobre, hidro) pero su seguridad energética interna es ínfima por falta de inversión, gobernanza y estabilidad. La <i>accessibility</i> y la <i>robustness</i> son las dimensiones más críticas.</p>",
    definicion_cita: "IEA; Banco Mundial 2024.",
    scorecard_titulo: "Scorecard de la RDC bajo APERC",
    scores: [
      { letra: "A", nombre: "vailability", desc: "Cobalto/cobre #1-2; potencial hidro de Inga.", score: 7.0 },
      { letra: "A", nombre: "ccessibility", desc: "Electrificación ~20%; infraestructura escasa.", score: 2.5 },
      { letra: "A", nombre: "ffordability", desc: "Acceso costoso; dependencia de leña/diésel.", score: 3.0 },
      { letra: "A", nombre: "cceptability", desc: "Hidro limpia potencial; minería artesanal y deforestación.", score: 3.5 }
    ],
    scorecard_cita: "Scores propios sobre indicadores normalizados.",
    comparador: { pais_b: "Nigeria", pais_c: "Sudáfrica" },
    indicadores_titulo: "Indicadores cuantitativos aplicados",
    indicadores: [
      { indicador: "Cobalto mundial (%)", definicion: "Producción", propio: "70", b: "0", c: "0", interp: { texto: "Dominante", pill: "ok" } },
      { indicador: "Tasa de electrificación (%)", definicion: "Población con acceso", propio: "21", b: "60", c: "85", interp: { texto: "Muy baja", pill: "danger" } },
      { indicador: "Hidro desarrollada vs potencial", definicion: "Inga", propio: "2%", b: "—", c: "—", interp: { texto: "Casi sin explotar", pill: "warn" } },
      { indicador: "Consumo per cápita (kWh)", definicion: "Eléctrico", propio: "~110", b: "~150", c: "~3500", interp: { texto: "De los menores del mundo" } }
    ],
    indicadores_nota: "Comparación con Nigeria y Sudáfrica (referentes africanos)."
  },
  matriz: {
    src: "IEA · Banco Mundial 2024",
    primaria_titulo: "Energía Primaria (TPES, %)",
    primaria: [
      { label: "Biomasa/leña", valor: 78, color: "#8a4a4a" },
      { label: "Petróleo (derivados)", valor: 14, color: "#c4570e" },
      { label: "Hidro", valor: 7, color: "#2e7d32" },
      { label: "Otros", valor: 1, color: "#a17c1c" }
    ],
    primaria_cita: "Biomasa 78 · Petróleo 14 · Hidro 7. <i>Fuente: IEA 2024.</i>",
    electrica_titulo: "Generación Eléctrica (%)",
    electrica: [
      { label: "Hidro", valor: 96, color: "#2e7d32" },
      { label: "Térmica (diésel)", valor: 4, color: "#c4570e" }
    ],
    electrica_cita: "Hidro 96 · Térmica 4. <i>Fuente: Banco Mundial.</i>",
    comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
    comparativa: {
      paises: ["RD del Congo", "Nigeria", "Sudáfrica"],
      series: [
        { label: "Hidro", data: [96, 18, 1], color: "#2e7d32" },
        { label: "Gas", data: [0, 75, 0], color: "#0b5394" },
        { label: "Carbón", data: [0, 0, 80], color: "#8a4a4a" },
        { label: "Diésel/Otros", data: [4, 7, 19], color: "#c4570e" }
      ]
    },
    comparativa_nota: "Electricidad casi 100% hidro, pero con cobertura mínima de la población."
  },
  sankey: {
    src: "Producción → Transformación → Uso final",
    titulo_panel: "Flujos físicos de energía, RDC (PJ aprox.)",
    flujos: [
      { from: "Biomasa/leña", to: "Cocción residencial", flow: 5500 },
      { from: "Hidro (Inga)", to: "Generación eléctrica", flow: 900 },
      { from: "Generación eléctrica", to: "Minería (cobre/cobalto)", flow: 600 },
      { from: "Generación eléctrica", to: "Residencial (urbano)", flow: 250 },
      { from: "Petróleo importado", to: "Transporte & generadores", flow: 1000 },
      { from: "Generación eléctrica", to: "Exportación a vecinos", flow: 50 }
    ],
    nodos: {
      "Biomasa/leña": { color: "#8a4a4a", label: "Biomasa / leña" },
      "Hidro (Inga)": { color: "#2e7d32", label: "Hidro (Inga)" },
      "Petróleo importado": { color: "#c4570e", label: "Derivados importados" },
      "Generación eléctrica": { color: "#6b4e8e", label: "Generación eléctrica" },
      "Minería (cobre/cobalto)": { color: "#a17c1c", label: "Minería (Cu/Co)" },
      "Cocción residencial": { color: "#4a5870", label: "Cocción (leña)" },
      "Residencial (urbano)": { color: "#4a5870", label: "Residencial urbano" },
      "Transporte & generadores": { color: "#c4570e", label: "Transporte + generadores" },
      "Exportación a vecinos": { color: "#2e7d32", label: "EXPORT · Electricidad" }
    },
    cita: "La leña domina el consumo; la mayor parte de la escasa electricidad va a la minería del cobre/cobalto. <i>Datos estilizados.</i>"
  },
  evolucion: {
    src: "2000–2050 · acceso y minerales",
    historico_titulo: "Tasa de electrificación (%)",
    anios: ["2000", "2010", "2020", "2024", "2035", "2050"],
    series: [
      { label: "Electrificación nacional", data: [7, 14, 19, 21, 40, 70], color: "#a17c1c" },
      { label: "Electrificación rural", data: [1, 2, 5, 6, 20, 50], color: "#2e7d32" }
    ],
    historico_cita: "El acceso crece muy lento pese al potencial de Inga; gran brecha rural.",
    hitos_titulo: "Hitos del Régimen Energético",
    hitos: [
      { anio: "1972", evento: "Inga I entra en operación sobre el río Congo." },
      { anio: "1982", evento: "Inga II amplía la capacidad hidroeléctrica." },
      { anio: "2009", evento: "Boom del cobalto por la demanda de baterías." },
      { anio: "2018", evento: "Nuevo código minero; cobalto declarado \"mineral estratégico\"." },
      { anio: "2023", evento: "Acuerdos de minerales por infraestructura con socios extranjeros." }
    ]
  },
  infraestructura: {
    src: "Mapa Leaflet · GEM",
    mapa_titulo: "Hidro de Inga y cinturón minero",
    pines: [
      { lat: -5.52, lng: 13.62, tipo: "almacenamiento", nombre: "Represa de Inga I/II", desc: "Sobre el río Congo · ~2 GW operativos" },
      { lat: -5.53, lng: 13.55, tipo: "almacenamiento", nombre: "Sitio de Gran Inga", desc: "Potencial hasta ~40-44 GW (proyecto)" },
      { lat: -10.72, lng: 25.47, tipo: "minerales", nombre: "Cobalto/cobre de Kolwezi", desc: "Corazón del cinturón del cobre (Lualaba)" },
      { lat: -11.66, lng: 27.48, tipo: "minerales", nombre: "Lubumbashi (Katanga)", desc: "Hub minero del sureste" },
      { lat: -1.68, lng: 29.23, tipo: "sloc", nombre: "Conflicto del Kivu (este)", desc: "Inseguridad en zonas mineras" }
    ],
    rutas: [
      { puntos: [[-10.72, 25.47], [-12, 28], [-15, 28], [-26, 28]], tooltip: "Exportación de minerales por el corredor sur (Zambia/Sudáfrica)" }
    ],
    leyenda: [
      { color: "#2e7d32", label: "Hidroeléctrica (Inga)" },
      { color: "#a17c1c", label: "Cobalto / cobre" },
      { color: "#c62828", label: "Zona de conflicto" }
    ],
    mapa_cita: "Coordenadas reales de Inga, Kolwezi, Lubumbashi. <i>Fuentes: GEM 2024; USGS.</i>",
    vulnerabilidades_titulo: "Vulnerabilidades técnicas",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Electrificación mínima</b> · ~80% de la población sin acceso fiable a la red." },
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Conflicto en el este</b> · grupos armados y minería ilegal en zonas de minerales." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Inga subutilizada</b> · falta de financiación y transmisión para el potencial hidro." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Minería artesanal de cobalto</b> · condiciones precarias y trazabilidad." }
    ],
    capacidad_titulo: "Capacidad vs Potencial (GW)",
    capacidad: {
      anios: ["2024", "2030", "2040", "2050"],
      y_titulo: "GW",
      series: [
        { label: "Hidro instalada (GW)", tipo: "bar", data: [2.5, 4, 11, 25], color: "#2e7d32" },
        { label: "Potencial Inga (GW)", tipo: "bar", data: [44, 44, 44, 44], color: "#6a8caf" },
        { label: "Demanda interna (GW)", tipo: "line", data: [2, 4, 8, 18], color: "#c4570e" }
      ]
    },
    capacidad_cita: "Gran Inga podría exportar electricidad a todo el continente. <i>Fuente: IEA; SNEL.</i>"
  },
  geopolitica: {
    src: "Radar APERC normalizado",
    radar_titulo: "Radar APERC: RDC vs Nigeria vs Sudáfrica",
    radar: {
      ejes: ["Availability", "Accessibility", "Affordability", "Acceptability", "Sovereignty", "Robustness", "Resilience"],
      series: [
        { label: "RD del Congo", data: [7.0, 2.5, 3.0, 3.5, 4.0, 2.5, 3.0], color: "#a17c1c" },
        { label: "Nigeria", data: [7.5, 3.5, 3.5, 3.5, 5.0, 3.5, 3.5], color: "#c4570e" },
        { label: "Sudáfrica", data: [6.0, 5.0, 5.0, 3.0, 6.0, 4.0, 4.5], color: "#0b5394" }
      ]
    },
    radar_cita: "Normalización min-max sobre indicadores §01.",
    dependencias_titulo: "Dependencias y socios",
    dependencias: [
      { vinculo: "Exportación de cobalto/cobre a China", pct: "70", riesgo: { texto: "Comprador y operador dominante", pill: "warn" } },
      { vinculo: "Minerales por infraestructura", pct: "—", riesgo: { texto: "Acuerdos con China", pill: "warn" } },
      { vinculo: "Importación de derivados", pct: "—", riesgo: { texto: "Sin refinación propia", pill: "danger" } },
      { vinculo: "Corredor de exportación (Zambia/Sudáfrica)", pct: "—", riesgo: { texto: "Salida al mar lejana", pill: "warn" } }
    ],
    dependencias_cita: "USGS; Banco Mundial 2024.",
    minerales_titulo: "Minerales de la transición",
    minerales: [
      { valor: "#1", unidad: " mundial", etiqueta: "COBALTO (~70%)" },
      { valor: "#1", unidad: " África", etiqueta: "COBRE" },
      { valor: "~44", unidad: " GW", etiqueta: "POTENCIAL GRAN INGA" }
    ],
    minerales_cita: "USGS Mineral Commodity Summaries 2024."
  },
  militar: {
    titulo_seccion: "Combustibles Militares y Rol Operacional de las FARDC",
    nav_label: "Combustibles militares",
    src: "IISS · FARDC",
    combustibles_titulo: "Demanda de combustibles de las FARDC",
    combustibles: [
      { codigo: "Jet A-1", tipo: "Queroseno de aviación", usuario: "Fuerza Aérea", ml_anio: "40" },
      { codigo: "Diésel terrestre", tipo: "Diésel", usuario: "Ejército (operaciones en el este)", ml_anio: "120" },
      { codigo: "Gasolina", tipo: "Gasolina", usuario: "Movilidad táctica", ml_anio: "50" }
    ],
    combustibles_total: "~210",
    combustibles_cita: "Estimación de orden de magnitud (logística difícil por el terreno).",
    vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Conflicto en el este</b> · grupos armados financiados por minería ilegal (3T, oro, coltán)." },
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Protección de Inga y zonas mineras</b> · activos estratégicos en entorno inseguro." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Logística</b> · vastas distancias y red vial deficiente para el suministro de combustible." }
    ],
    mision_titulo: "Misión en Seguridad Energética",
    mision: [
      { titulo: "PROTECCIÓN MINERA", texto_html: "Seguridad de las zonas de cobalto/cobre frente a grupos armados." },
      { titulo: "INFRAESTRUCTURA DE INGA", texto_html: "Custodia del complejo hidroeléctrico estratégico." },
      { titulo: "MINERALES DE CONFLICTO", texto_html: "Lucha contra el financiamiento armado vía minería ilegal." },
      { titulo: "ESTABILIZACIÓN", texto_html: "Operaciones en el este con apoyo regional/ONU (MONUSCO)." }
    ],
    mision_cita: "IISS 2024; ONU."
  },
  politicas: {
    src: "Ministère des Ressources Hydrauliques · SNEL",
    planes_titulo: "Planes nacionales",
    planes: [
      { nombre: "Proyecto Gran Inga", texto: "Megahidroeléctrica para consumo y exportación continental." },
      { nombre: "Código Minero 2018", texto: "Cobalto como mineral estratégico; mayores regalías." },
      { nombre: "Zona Económica de baterías", texto: "Procesar minerales localmente (con Zambia)." },
      { nombre: "Planes de electrificación rural", texto: "Mini-redes y solar descentralizada." }
    ],
    instituciones_titulo: "Instituciones clave",
    instituciones: [
      { sigla: "SNEL", texto: "empresa nacional de electricidad (Inga)." },
      { sigla: "Gécamines", texto: "minera estatal de cobre/cobalto." },
      { sigla: "ARE/ANSER", texto: "regulación y electrificación rural." },
      { sigla: "Ministère des Mines", texto: "rectoría minera." }
    ],
    transicion_titulo: "Transición y economía",
    transicion_html: "<p>El reto es <b>convertir la riqueza mineral e hídrica en seguridad energética interna</b>: desarrollar Inga, electrificar al país y agregar valor a los minerales (baterías) en un entorno de gobernanza frágil y conflicto.</p>",
    transicion_cita: "IEA; Banco Mundial 2024."
  },
  crisis: {
    src: "Wargaming · Cone of Plausibility",
    matriz_titulo: "Matriz Probabilidad × Impacto",
    matriz: {
      esquina: "Impacto ↓ / Prob →",
      prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
      filas: [
        { impacto: "Catastrófico", celdas: [{ nivel: 3 }, { nivel: 4 }, { nivel: 5, texto: "Escalada en el este" }, { nivel: 5 }, { nivel: 5 }] },
        { impacto: "Mayor", celdas: [{ nivel: 2 }, { nivel: 3 }, { nivel: 4, texto: "Corte de exportación minera" }, { nivel: 4, texto: "Falla de Inga" }, { nivel: 5 }] },
        { impacto: "Moderado", celdas: [{ nivel: 1 }, { nivel: 2 }, { nivel: 3, texto: "Escasez de diésel" }, { nivel: 4 }, { nivel: 4 }] },
        { impacto: "Menor", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 3 }, { nivel: 3 }] },
        { impacto: "Insignif.", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 2 }] }
      ]
    },
    matriz_cita: "Escala HM Treasury Orange Book.",
    escenarios_titulo: "Escenarios calibrados",
    escenarios: [
      { nivel: "high", tag: "A", texto_html: "<b>Escalada en el este</b> — minería ilegal financia el conflicto. <i>Respuesta:</i> operaciones FARDC, trazabilidad, apoyo regional." },
      { nivel: "med", tag: "B", texto_html: "<b>Falla de Inga</b> — corte de la poca electricidad. <i>Respuesta:</i> mantenimiento, mini-redes, respaldo." },
      { nivel: "med", tag: "C", texto_html: "<b>Caída del precio del cobalto</b> — golpe fiscal. <i>Respuesta:</i> diversificación, valor agregado." },
      { nivel: "med", tag: "D", texto_html: "<b>Cuello del corredor de exportación</b> — bloqueo de salida al mar. <i>Respuesta:</i> rutas alternas, acuerdos regionales." }
    ],
    vectores_titulo: "Respuesta estratégica integrada — vectores",
    vectores: [
      { titulo: "DESARROLLAR INGA", texto: "Hidro para electrificar y exportar." },
      { titulo: "VALOR AGREGADO", texto: "Procesar cobalto/cobre (baterías) localmente." },
      { titulo: "TRAZABILIDAD", texto: "Romper el vínculo minería-conflicto." },
      { titulo: "ELECTRIFICACIÓN", texto: "Mini-redes y solar para zonas rurales." }
    ]
  },
  referencias: {
    src: "Triangulación multi-fuente",
    titulo: "Fuentes primarias y académicas",
    items: [
      "USGS (2024). <i>Mineral Commodity Summaries</i> (cobalto, cobre).",
      "IEA (2024). <i>DR Congo Energy Profile</i>.",
      "Banco Mundial (2024). Indicadores de acceso a energía.",
      "IEA (2023). <i>Critical Minerals Market Review</i>.",
      "APERC (2007). <i>A Quest for Energy Security in the 21st Century</i>. Tokio."
    ]
  },
  footer: "Documento de sustentación · Rúbrica Slide18 · Logística Militar · Mayo 2026"
});

/* === NIGERIA ============================================================ */
P({
  schema_version: "1.0.0",
  meta: {
    pais: "Nigeria", pais_iso: "NGA", pais_iso2: "NG", subtitulo_pais: "República Federal de",
    eyebrow: "Portafolio · Seguridad Energética por País",
    titulo: "Seguridad Energética de Nigeria:<br/>petróleo del Delta y déficit de refinación",
    subtitulo: "Mayor productor de petróleo de África con gran GNL, pero atrapado en la paradoja de importar derivados, sufrir robo de crudo y un déficit eléctrico crónico que la refinería Dangote empieza a aliviar.",
    estudiante: "Cátedra (ejemplo de referencia)", asignatura: "Logística Militar · Rúbrica Slide18",
    tipo_doc: "Documento de sustentación", fecha: "Mayo 2026",
    fuerzas_armadas: "Fuerzas Armadas de Nigeria", aperc_global: 4.5,
    cita_corta: "OPEP, 2024; IEA, 2024; NNPC.",
    portafolio_label: "Rúbrica Slide18<br/>Logística Militar<br/>v2 — académica",
    map_view: { lat: 9.5, lng: 8, zoom: 6 }
  },
  resumen: {
    tesis_html: "Nigeria es el <b>mayor productor de petróleo de África</b> (OPEP), con crudo del Delta del Níger y GNL (Bonny/NLNG). Vive la <i>paradoja del refinado</i>: por años importó casi toda su gasolina por el colapso de sus refinerías — la megarefinería <b>Dangote</b> (2024) cambia el panorama. Sufre robo de crudo, vandalismo de oleoductos, quema de gas y un <b>déficit eléctrico</b> crónico cubierto con generadores diésel.",
    conclusion_html: "APERC <b>4.5/10</b>: alta <i>availability</i> en crudo/gas pero <i>robustness</i>, <i>affordability</i> y <i>acceptability</i> débiles. Las FF.AA. enfrentan la seguridad del Delta, los oleoductos y el Golfo de Guinea.",
    kpis: [
      { valor: 1.4, unidad: "Mb/d", etiqueta: "Producción de crudo", decimal: true },
      { valor: 45, unidad: "%", etiqueta: "Población con electricidad" },
      { valor: 650, unidad: "kb/d", etiqueta: "Refinería Dangote" },
      { valor: 1, unidad: "º", etiqueta: "Petróleo de África" }
    ]
  },
  aperc: {
    src: "APERC 2007 · OPEP 2024",
    definicion_html: "<p>Nigeria muestra que exportar crudo no asegura energía: el <i>déficit de refinación</i> y la <i>red eléctrica frágil</i> hunden la <i>robustness</i> y la <i>affordability</i>. Dangote y reformas de subsidios buscan revertirlo.</p>",
    definicion_cita: "OPEP; IEA 2024.",
    scorecard_titulo: "Scorecard de Nigeria bajo APERC",
    scores: [
      { letra: "A", nombre: "vailability", desc: "Gran crudo y gas; déficit de generación fiable.", score: 7.5 },
      { letra: "A", nombre: "ccessibility", desc: "Refinación histórica colapsada; Dangote mejora.", score: 3.5 },
      { letra: "A", nombre: "ffordability", desc: "Fin del subsidio a la gasolina (2023) elevó precios.", score: 3.5 },
      { letra: "A", nombre: "cceptability", desc: "Quema de gas (flaring); derrames en el Delta.", score: 3.5 }
    ],
    scorecard_cita: "Scores propios sobre indicadores normalizados.",
    comparador: { pais_b: "Arabia Saudita", pais_c: "Angola" },
    indicadores_titulo: "Indicadores cuantitativos aplicados",
    indicadores: [
      { indicador: "Producción de crudo (Mb/d)", definicion: "OPEP", propio: "1.4", b: "9.6", c: "1.1", interp: { texto: "Mayor de África" } },
      { indicador: "Tasa de electrificación (%)", definicion: "Población", propio: "45", b: "100", c: "47", interp: { texto: "Baja", pill: "warn" } },
      { indicador: "Robo de crudo (%)", definicion: "De la producción", propio: "~10", b: "0", c: "bajo", interp: { texto: "Pérdidas severas", pill: "danger" } },
      { indicador: "Capacidad de generación fiable (GW)", definicion: "Despachable real", propio: "~4.5", b: "—", c: "—", interp: { texto: "Insuficiente para 220 M hab.", pill: "danger" } }
    ],
    indicadores_nota: "Comparación con Arabia Saudita y Angola (petroleros)."
  },
  matriz: {
    src: "OPEP · IEA 2024",
    primaria_titulo: "Energía Primaria (TPES, %)",
    primaria: [
      { label: "Biomasa/leña", valor: 74, color: "#8a4a4a" },
      { label: "Petróleo", valor: 13, color: "#c4570e" },
      { label: "Gas natural", valor: 12, color: "#0b5394" },
      { label: "Hidro", valor: 1, color: "#2e7d32" }
    ],
    primaria_cita: "Biomasa 74 · Petróleo 13 · Gas 12 · Hidro 1. <i>Fuente: IEA 2024.</i>",
    electrica_titulo: "Generación Eléctrica (red, %)",
    electrica: [
      { label: "Gas", valor: 75, color: "#0b5394" },
      { label: "Hidro", valor: 18, color: "#2e7d32" },
      { label: "Diésel/Otros", valor: 7, color: "#c4570e" }
    ],
    electrica_cita: "Gas 75 · Hidro 18 · Diésel 7 (red); enormes generadores diésel fuera de red. <i>Fuente: Ember.</i>",
    comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
    comparativa: {
      paises: ["Nigeria", "Arabia Saudita", "Sudáfrica"],
      series: [
        { label: "Gas", data: [75, 60, 0], color: "#0b5394" },
        { label: "Hidro", data: [18, 0, 1], color: "#2e7d32" },
        { label: "Petróleo", data: [7, 38, 0], color: "#c4570e" },
        { label: "Carbón", data: [0, 0, 80], color: "#8a4a4a" },
        { label: "Solar/Otros", data: [0, 2, 19], color: "#a17c1c" }
      ]
    },
    comparativa_nota: "La red nigeriana es gas+hidro, pero cubre a menos de la mitad de la población."
  },
  sankey: {
    src: "Producción → Transformación → Uso final",
    titulo_panel: "Flujos físicos de energía, Nigeria (PJ aprox.)",
    flujos: [
      { from: "Crudo (Delta del Níger)", to: "Exportación de crudo", flow: 3500 },
      { from: "Crudo (Delta del Níger)", to: "Refinación (Dangote)", flow: 1500 },
      { from: "Refinación (Dangote)", to: "Combustibles refinados", flow: 1300 },
      { from: "Combustibles refinados", to: "Transporte & generadores", flow: 1700 },
      { from: "Gas natural", to: "Exportación GNL (Bonny)", flow: 2000 },
      { from: "Gas natural", to: "Generación eléctrica", flow: 900 },
      { from: "Biomasa/leña", to: "Cocción residencial", flow: 4000 },
      { from: "Generación eléctrica", to: "Industria & residencial", flow: 800 }
    ],
    nodos: {
      "Crudo (Delta del Níger)": { color: "#c4570e", label: "Crudo (Delta del Níger)" },
      "Gas natural": { color: "#0b5394", label: "Gas natural" },
      "Biomasa/leña": { color: "#8a4a4a", label: "Biomasa / leña" },
      "Refinación (Dangote)": { color: "#c4570e", label: "Refinería Dangote" },
      "Combustibles refinados": { color: "#a17c1c", label: "Combustibles" },
      "Generación eléctrica": { color: "#6b4e8e", label: "Generación eléctrica" },
      "Exportación de crudo": { color: "#8a4a4a", label: "EXPORT · Crudo" },
      "Exportación GNL (Bonny)": { color: "#0b5394", label: "EXPORT · GNL" },
      "Cocción residencial": { color: "#4a5870", label: "Cocción (leña)" },
      "Industria & residencial": { color: "#4a5870", label: "Industria + Residencial" },
      "Transporte & generadores": { color: "#c4570e", label: "Transporte + generadores" }
    },
    cita: "Exportaba crudo e importaba gasolina; Dangote (2024) busca cerrar esa brecha. <i>Datos estilizados.</i>"
  },
  evolucion: {
    src: "2000–2050 · Dangote y reformas",
    historico_titulo: "Balance de combustibles refinados (índice)",
    anios: ["2000", "2010", "2020", "2024", "2030", "2040"],
    series: [
      { label: "Importación de gasolina", data: [60, 80, 95, 50, 20, 10], color: "#c4570e" },
      { label: "Refinación local", data: [40, 20, 5, 50, 80, 90], color: "#2e7d32" }
    ],
    historico_cita: "La refinería Dangote (650 kb/d) invierte la dependencia de importación de derivados.",
    hitos_titulo: "Hitos del Régimen Energético",
    hitos: [
      { anio: "1956", evento: "Descubrimiento de petróleo en Oloibiri (Delta)." },
      { anio: "1971", evento: "Ingreso a la OPEP." },
      { anio: "1999", evento: "Inicio de exportaciones de GNL (Bonny/NLNG)." },
      { anio: "2023", evento: "Eliminación del subsidio a la gasolina; alza de precios." },
      { anio: "2024", evento: "Arranque de la megarefinería Dangote." }
    ]
  },
  infraestructura: {
    src: "Mapa Leaflet · GEM",
    mapa_titulo: "Crudo, GNL, refinación y SLOC",
    pines: [
      { lat: 4.8, lng: 6.0, tipo: "refineria", nombre: "Crudo del Delta del Níger", desc: "Principal zona productora (Bonny Light)" },
      { lat: 4.43, lng: 7.16, tipo: "gnl", nombre: "GNL Bonny Island (NLNG)", desc: "Gran terminal de exportación de GNL" },
      { lat: 6.43, lng: 3.65, tipo: "refineria", nombre: "Refinería Dangote (Lekki)", desc: "650 kb/d · mayor de África" },
      { lat: 4.79, lng: 7.0, tipo: "refineria", nombre: "Refinería Port Harcourt", desc: "Estatal (NNPC), en rehabilitación" },
      { lat: 9.87, lng: 4.61, tipo: "almacenamiento", nombre: "Presa de Kainji", desc: "Principal hidroeléctrica" },
      { lat: 3.0, lng: 5.0, tipo: "sloc", nombre: "Golfo de Guinea", desc: "Ruta de exportación; piratería" }
    ],
    rutas: [
      { puntos: [[4.43, 7.16], [3.0, 5.0], [0, 0], [36, -6]], tooltip: "SLOC: Golfo de Guinea → Europa/Asia" }
    ],
    leyenda: [
      { color: "#c4570e", label: "Crudo / refinerías" },
      { color: "#0b5394", label: "GNL" },
      { color: "#2e7d32", label: "Hidro" },
      { color: "#c62828", label: "SLOC / piratería" }
    ],
    mapa_cita: "Coordenadas reales del Delta, Bonny, Dangote-Lekki, Port Harcourt, Kainji. <i>Fuentes: GEM 2024.</i>",
    vulnerabilidades_titulo: "Vulnerabilidades técnicas",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Robo de crudo y vandalismo</b> · pérdidas de ~10% de la producción en el Delta." },
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Déficit eléctrico</b> · la red sirve a <50% de la población; colapsos del grid nacional." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Quema de gas (flaring)</b> · desperdicio masivo y emisiones." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Piratería en el Golfo de Guinea</b> · riesgo para la exportación." }
    ],
    capacidad_titulo: "Capacidad vs Demanda eléctrica (GW)",
    capacidad: {
      anios: ["2020", "2024", "2030", "2040"],
      y_titulo: "GW",
      series: [
        { label: "Capacidad fiable (GW)", tipo: "bar", data: [4, 4.5, 8, 15], color: "#0b5394" },
        { label: "Generadores diésel (GW)", tipo: "bar", data: [14, 14, 10, 5], color: "#c4570e" },
        { label: "Demanda reprimida (GW)", tipo: "line", data: [25, 28, 35, 50], color: "#a17c1c" }
      ]
    },
    capacidad_cita: "La demanda reprimida es enorme; los generadores diésel suplen a la red. <i>Fuente: IEA.</i>"
  },
  geopolitica: {
    src: "Radar APERC normalizado",
    radar_titulo: "Radar APERC: Nigeria vs Arabia Saudita vs Sudáfrica",
    radar: {
      ejes: ["Availability", "Accessibility", "Affordability", "Acceptability", "Sovereignty", "Robustness", "Resilience"],
      series: [
        { label: "Nigeria", data: [7.5, 3.5, 3.5, 3.5, 5.0, 3.5, 3.5], color: "#c4570e" },
        { label: "Arabia Saudita", data: [9.5, 4.5, 6.3, 2.5, 8.5, 6.5, 4.5], color: "#0b5394" },
        { label: "Sudáfrica", data: [6.0, 5.0, 5.0, 3.0, 6.0, 4.0, 4.5], color: "#2e7d32" }
      ]
    },
    radar_cita: "Normalización min-max sobre indicadores §01.",
    dependencias_titulo: "Dependencias y socios",
    dependencias: [
      { vinculo: "Exportación de crudo a Europa/Asia", pct: "—", riesgo: { texto: "Ingreso fiscal clave", pill: "warn" } },
      { vinculo: "Exportación de GNL (NLNG)", pct: "—", riesgo: { texto: "Divisas estables", pill: "ok" } },
      { vinculo: "Importación de derivados (histórica)", pct: "—", riesgo: { texto: "Revertida por Dangote", pill: "ok" } },
      { vinculo: "Inversión de majors en el Delta", pct: "—", riesgo: { texto: "Desinversión onshore", pill: "warn" } }
    ],
    dependencias_cita: "OPEP; NNPC 2024.",
    minerales_titulo: "Posición energética",
    minerales: [
      { valor: "#1", unidad: " África", etiqueta: "PRODUCTOR DE PETRÓLEO" },
      { valor: "#1", unidad: " África", etiqueta: "RESERVAS DE GAS" },
      { valor: "650", unidad: " kb/d", etiqueta: "REFINERÍA DANGOTE" }
    ],
    minerales_cita: "OPEP Annual Statistical Bulletin 2024."
  },
  militar: {
    titulo_seccion: "Combustibles Militares y Rol Operacional de las Fuerzas Armadas de Nigeria",
    nav_label: "Combustibles militares",
    src: "IISS · Ministerio de Defensa",
    combustibles_titulo: "Demanda de combustibles de las FF.AA.",
    combustibles: [
      { codigo: "Jet A-1", tipo: "Queroseno de aviación", usuario: "Fuerza Aérea de Nigeria", ml_anio: "200" },
      { codigo: "Diésel naval", tipo: "Diésel", usuario: "Armada de Nigeria", ml_anio: "150" },
      { codigo: "Diésel terrestre", tipo: "Diésel", usuario: "Ejército", ml_anio: "250" }
    ],
    combustibles_total: "~600",
    combustibles_cita: "Estimación de orden de magnitud.",
    vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Seguridad del Delta</b> · robo de crudo, militancia y oleoductos vandalizados." },
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Piratería en el Golfo de Guinea</b> · una de las zonas de mayor riesgo del mundo." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Insurgencia (noreste)</b> · presión adicional sobre recursos y logística." }
    ],
    mision_titulo: "Misión en Seguridad Energética",
    mision: [
      { titulo: "SEGURIDAD DEL DELTA", texto_html: "Protección de campos y oleoductos contra el robo de crudo." },
      { titulo: "GOLFO DE GUINEA", texto_html: "Operaciones navales (Deep Blue) contra la piratería." },
      { titulo: "INFRAESTRUCTURA ENERGÉTICA", texto_html: "Custodia de refinerías y terminales de GNL." },
      { titulo: "COOPERACIÓN REGIONAL", texto_html: "Coordinación marítima en África Occidental." }
    ],
    mision_cita: "IISS 2024; IMB Piracy Report."
  },
  politicas: {
    src: "NNPC · NMDPRA",
    planes_titulo: "Planes nacionales",
    planes: [
      { nombre: "Petroleum Industry Act 2021", texto: "Reforma del sector; reestructura de NNPC." },
      { nombre: "Fin del subsidio a la gasolina (2023)", texto: "Liberación de precios; alivio fiscal con costo social." },
      { nombre: "Decade of Gas", texto: "Gas para electricidad, industria y transporte (GNC/GLP)." },
      { nombre: "Energy Transition Plan", texto: "Acceso universal y net-zero 2060." }
    ],
    instituciones_titulo: "Instituciones clave",
    instituciones: [
      { sigla: "NNPC Ltd", texto: "compañía nacional de petróleo." },
      { sigla: "NMDPRA / NUPRC", texto: "reguladores midstream/downstream y upstream." },
      { sigla: "TCN", texto: "compañía de transmisión eléctrica." },
      { sigla: "NLNG", texto: "consorcio de gas natural licuado." }
    ],
    transicion_titulo: "Transición y economía",
    transicion_html: "<p>Nigeria busca <b>monetizar su gas</b> (\"Decade of Gas\"), recuperar la refinación (Dangote), reparar la red eléctrica y expandir el acceso, mientras gestiona el costo social del fin de los subsidios.</p>",
    transicion_cita: "NNPC; IEA 2024."
  },
  crisis: {
    src: "Wargaming · Cone of Plausibility",
    matriz_titulo: "Matriz Probabilidad × Impacto",
    matriz: {
      esquina: "Impacto ↓ / Prob →",
      prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
      filas: [
        { impacto: "Catastrófico", celdas: [{ nivel: 3 }, { nivel: 4 }, { nivel: 5, texto: "Colapso del grid nacional" }, { nivel: 5, texto: "Insurgencia en el Delta" }, { nivel: 5 }] },
        { impacto: "Mayor", celdas: [{ nivel: 2 }, { nivel: 3 }, { nivel: 4, texto: "Robo masivo de crudo" }, { nivel: 4, texto: "Crisis de precios" }, { nivel: 5 }] },
        { impacto: "Moderado", celdas: [{ nivel: 1 }, { nivel: 2 }, { nivel: 3, texto: "Piratería" }, { nivel: 4 }, { nivel: 4 }] },
        { impacto: "Menor", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 3 }, { nivel: 3 }] },
        { impacto: "Insignif.", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 2 }] }
      ]
    },
    matriz_cita: "Escala HM Treasury Orange Book.",
    escenarios_titulo: "Escenarios calibrados",
    escenarios: [
      { nivel: "high", tag: "A", texto_html: "<b>Insurgencia/robo en el Delta</b> — caída de producción. <i>Respuesta:</i> seguridad, vigilancia de oleoductos, acuerdos comunitarios." },
      { nivel: "high", tag: "B", texto_html: "<b>Colapso del grid nacional</b> — apagón total recurrente. <i>Respuesta:</i> reparar transmisión, descentralizar (solar)." },
      { nivel: "med", tag: "C", texto_html: "<b>Piratería</b> en el Golfo de Guinea. <i>Respuesta:</i> Deep Blue Project, cooperación regional." },
      { nivel: "med", tag: "D", texto_html: "<b>Choque social por precios</b> tras el fin del subsidio. <i>Respuesta:</i> transferencias, GNC/GLP más baratos." }
    ],
    vectores_titulo: "Respuesta estratégica integrada — vectores",
    vectores: [
      { titulo: "REFINACIÓN", texto: "Dangote y rehabilitación estatal cierran la brecha de derivados." },
      { titulo: "GAS DOMÉSTICO", texto: "\"Decade of Gas\" para electricidad y transporte." },
      { titulo: "DESCENTRALIZAR", texto: "Mini-redes y solar para el acceso rural." },
      { titulo: "SEGURIDAD", texto: "Proteger el Delta y el Golfo de Guinea." }
    ]
  },
  referencias: {
    src: "Triangulación multi-fuente",
    titulo: "Fuentes primarias y académicas",
    items: [
      "OPEC (2024). <i>Annual Statistical Bulletin</i>.",
      "IEA (2024). <i>Nigeria Energy Profile / Outlook</i>.",
      "NNPC (2024). Reportes corporativos.",
      "IMB (2024). <i>Piracy and Armed Robbery Report</i>.",
      "APERC (2007). <i>A Quest for Energy Security in the 21st Century</i>. Tokio."
    ]
  },
  footer: "Documento de sustentación · Rúbrica Slide18 · Logística Militar · Mayo 2026"
});

/* === INDONESIA ========================================================== */
P({
  schema_version: "1.0.0",
  meta: {
    pais: "Indonesia", pais_iso: "IDN", pais_iso2: "ID", subtitulo_pais: "República de",
    eyebrow: "Portafolio · Seguridad Energética por País",
    titulo: "Seguridad Energética de Indonesia:<br/>carbón, níquel y los estrechos del archipiélago",
    subtitulo: "Mayor economía del Sudeste Asiático y gigante del carbón; importadora neta de petróleo, líder en geotermia y níquel para baterías, con el desafío de abastecer un vasto archipiélago y custodiar estrechos clave.",
    estudiante: "Cátedra (ejemplo de referencia)", asignatura: "Logística Militar · Rúbrica Slide18",
    tipo_doc: "Documento de sustentación", fecha: "Mayo 2026",
    fuerzas_armadas: "Fuerzas Armadas de Indonesia (TNI)", aperc_global: 5.6,
    cita_corta: "IEA, 2024; ESDM; Ember.",
    portafolio_label: "Rúbrica Slide18<br/>Logística Militar<br/>v2 — académica",
    map_view: { lat: -2, lng: 118, zoom: 4 }
  },
  resumen: {
    tesis_html: "Indonesia es el <b>mayor exportador de carbón térmico</b> del mundo y la mayor economía del Sudeste Asiático. Su petróleo declinó (hoy es <i>importador neto</i> y salió de la OPEP), compensado con gas/GNL (Bontang, Tangguh) y liderazgo en <b>geotermia</b> (Anillo de Fuego). El <b>níquel</b> es su nueva carta para baterías (prohibición de exportar mineral → industrialización). Retos: acceso en un archipiélago de 17.000 islas y custodia de los estrechos de Malaca, Lombok y Sonda.",
    conclusion_html: "APERC <b>5.6/10</b>: buena <i>availability</i> (carbón, gas, geotermia, níquel) pero <i>acceptability</i> baja por el carbón y <i>accessibility</i> compleja por la geografía. La TNI custodia estrechos y la seguridad archipelágica.",
    kpis: [
      { valor: 1, unidad: "º", etiqueta: "Exportador de carbón térmico" },
      { valor: 60, unidad: "%", etiqueta: "Carbón en electricidad" },
      { valor: 1, unidad: "º", etiqueta: "Productor de níquel mundial" },
      { valor: 85, unidad: "%", etiqueta: "Tasa de electrificación" }
    ]
  },
  aperc: {
    src: "APERC 2007 · ESDM 2024",
    definicion_html: "<p>Indonesia tiene <i>availability</i> (carbón, gas, geotermia, níquel) pero su <i>acceptability</i> sufre por la dependencia del carbón y su <i>accessibility</i> es un reto geográfico (archipiélago). La política de <i>downstreaming</i> del níquel busca capturar valor de la transición.</p>",
    definicion_cita: "ESDM; IEA 2024.",
    scorecard_titulo: "Scorecard de Indonesia bajo APERC",
    scores: [
      { letra: "A", nombre: "vailability", desc: "Carbón, gas, geotermia y níquel abundantes.", score: 7.0 },
      { letra: "A", nombre: "ccessibility", desc: "Archipiélago; importa petróleo; controla estrechos.", score: 5.0 },
      { letra: "A", nombre: "ffordability", desc: "Subsidios a combustible y electricidad.", score: 5.5 },
      { letra: "A", nombre: "cceptability", desc: "Alto peso del carbón; gran potencial geotérmico/solar.", score: 4.9 }
    ],
    scorecard_cita: "Scores propios sobre indicadores normalizados.",
    comparador: { pais_b: "Australia", pais_c: "China" },
    indicadores_titulo: "Indicadores cuantitativos aplicados",
    indicadores: [
      { indicador: "Carbón en electricidad (%)", definicion: "Generación", propio: "60", b: "46", c: "60", interp: { texto: "Alto", pill: "warn" } },
      { indicador: "Níquel mundial (%)", definicion: "Producción", propio: "50", b: "0", c: "0", interp: { texto: "Dominante", pill: "ok" } },
      { indicador: "Dependencia petróleo importado (%)", definicion: "Neta", propio: "alta", b: "−330%", c: "70%", interp: { texto: "Importador neto" } },
      { indicador: "Geotermia instalada (GW)", definicion: "Capacidad", propio: "2.4", b: "—", c: "—", interp: { texto: "2º mundial", pill: "ok" } }
    ],
    indicadores_nota: "Comparación con Australia (exportador de carbón) y China (gran consumidor)."
  },
  matriz: {
    src: "ESDM · Ember 2024",
    primaria_titulo: "Energía Primaria (TPES, %)",
    primaria: [
      { label: "Carbón", valor: 38, color: "#8a4a4a" },
      { label: "Petróleo", valor: 31, color: "#c4570e" },
      { label: "Gas natural", valor: 18, color: "#0b5394" },
      { label: "Renovables/Geotermia", valor: 13, color: "#a17c1c" }
    ],
    primaria_cita: "Carbón 38 · Petróleo 31 · Gas 18 · Renov. 13. <i>Fuente: ESDM 2024.</i>",
    electrica_titulo: "Generación Eléctrica (%)",
    electrica: [
      { label: "Carbón", valor: 60, color: "#8a4a4a" },
      { label: "Gas", valor: 18, color: "#0b5394" },
      { label: "Geotermia", valor: 6, color: "#a17c1c" },
      { label: "Hidro", valor: 8, color: "#2e7d32" },
      { label: "Otros renov.", valor: 8, color: "#6a8caf" }
    ],
    electrica_cita: "Carbón 60 · Gas 18 · Hidro 8 · Geotermia 6. <i>Fuente: Ember 2024.</i>",
    comparativa_titulo: "Comparativa Internacional — Mix Eléctrico (%)",
    comparativa: {
      paises: ["Indonesia", "Australia", "China"],
      series: [
        { label: "Carbón", data: [60, 46, 60], color: "#8a4a4a" },
        { label: "Gas", data: [18, 16, 3], color: "#0b5394" },
        { label: "Hidro", data: [8, 6, 14], color: "#2e7d32" },
        { label: "Geotermia/Otros", data: [6, 0, 5], color: "#6b4e8e" },
        { label: "Solar/Eólica", data: [8, 32, 18], color: "#a17c1c" }
      ]
    },
    comparativa_nota: "Indonesia y Australia, ambas carbón-intensivas; Australia avanza más en solar/eólica."
  },
  sankey: {
    src: "Producción → Transformación → Uso final",
    titulo_panel: "Flujos físicos de energía, Indonesia (PJ aprox.)",
    flujos: [
      { from: "Carbón (prod.)", to: "Exportación de carbón", flow: 9000 },
      { from: "Carbón (prod.)", to: "Generación eléctrica", flow: 3500 },
      { from: "Gas natural", to: "Exportación GNL", flow: 2500 },
      { from: "Gas natural", to: "Industria & residencial", flow: 1500 },
      { from: "Petróleo importado", to: "Refinación local", flow: 3000 },
      { from: "Refinación local", to: "Transporte", flow: 2800 },
      { from: "Geotermia/Hidro", to: "Generación eléctrica", flow: 1100 },
      { from: "Generación eléctrica", to: "Industria & residencial", flow: 4200 }
    ],
    nodos: {
      "Carbón (prod.)": { color: "#8a4a4a", label: "Carbón (producción)" },
      "Gas natural": { color: "#0b5394", label: "Gas natural" },
      "Petróleo importado": { color: "#c4570e", label: "Petróleo importado" },
      "Geotermia/Hidro": { color: "#a17c1c", label: "Geotermia & Hidro" },
      "Refinación local": { color: "#c4570e", label: "Refinerías" },
      "Generación eléctrica": { color: "#6b4e8e", label: "Generación eléctrica" },
      "Exportación de carbón": { color: "#8a4a4a", label: "EXPORT · Carbón" },
      "Exportación GNL": { color: "#0b5394", label: "EXPORT · GNL" },
      "Industria & residencial": { color: "#4a5870", label: "Industria + Residencial" },
      "Transporte": { color: "#c4570e", label: "Transporte" }
    },
    cita: "Exporta carbón y GNL, pero importa petróleo: la paradoja del exportador-importador. <i>Datos estilizados.</i>"
  },
  evolucion: {
    src: "2000–2050 · transición y níquel",
    historico_titulo: "Mix Eléctrico Histórico y Proyectado (%)",
    anios: ["2000", "2010", "2020", "2024", "2035", "2050"],
    series: [
      { label: "Carbón", data: [35, 44, 62, 60, 40, 15], color: "#8a4a4a" },
      { label: "Gas", data: [35, 30, 22, 18, 18, 12], color: "#0b5394" },
      { label: "Renovables/Geotermia", data: [20, 18, 13, 18, 38, 68], color: "#a17c1c" },
      { label: "Petróleo", data: [10, 8, 3, 4, 4, 5], color: "#c4570e" }
    ],
    historico_cita: "Meta net-zero 2060; retiro gradual del carbón con apoyo del JETP.",
    hitos_titulo: "Hitos del Régimen Energético",
    hitos: [
      { anio: "1977", evento: "Inicio de exportaciones de GNL desde Bontang." },
      { anio: "2008", evento: "Salida de la OPEP (importador neto de petróleo)." },
      { anio: "2020", evento: "Prohibición de exportar mineral de níquel (downstreaming)." },
      { anio: "2022", evento: "JETP: 20 mil M USD para acelerar la transición." },
      { anio: "2024", evento: "Auge de plantas de níquel/baterías (Morowali)." }
    ]
  },
  infraestructura: {
    src: "Mapa Leaflet · GEM",
    mapa_titulo: "Carbón, GNL, geotermia, níquel y estrechos",
    pines: [
      { lat: 0.13, lng: 117.47, tipo: "gnl", nombre: "GNL Bontang", desc: "Gran terminal de exportación (Kalimantan)" },
      { lat: -2.40, lng: 133.40, tipo: "gnl", nombre: "GNL Tangguh", desc: "Terminal de GNL (Papúa Occidental)" },
      { lat: -1.5, lng: 115.0, tipo: "refineria", nombre: "Carbón de Kalimantan", desc: "Mayor zona de carbón térmico para exportación" },
      { lat: -7.13, lng: 107.80, tipo: "minerales", nombre: "Geotérmica de Kamojang (Java)", desc: "Energía del Anillo de Fuego" },
      { lat: -2.60, lng: 122.10, tipo: "minerales", nombre: "Níquel de Morowali (Sulawesi)", desc: "Parque industrial de níquel/baterías" },
      { lat: 2.5, lng: 101.4, tipo: "sloc", nombre: "Estrecho de Malaca", desc: "Mayor cuello de botella marítimo" },
      { lat: -8.4, lng: 115.9, tipo: "sloc", nombre: "Estrecho de Lombok", desc: "Ruta alterna profunda" },
      { lat: -6.0, lng: 105.7, tipo: "sloc", nombre: "Estrecho de Sonda", desc: "Paso entre Java y Sumatra" }
    ],
    rutas: [
      { puntos: [[2.5, 101.4], [0, 105], [-6.0, 105.7]], tooltip: "Estrechos: Malaca y Sonda" }
    ],
    leyenda: [
      { color: "#8a4a4a", label: "Carbón" },
      { color: "#0b5394", label: "GNL" },
      { color: "#a17c1c", label: "Geotermia / níquel" },
      { color: "#c62828", label: "Estrechos críticos" }
    ],
    mapa_cita: "Coordenadas reales de Bontang, Tangguh, Kamojang, Morowali y los estrechos. <i>Fuentes: GEM 2024.</i>",
    vulnerabilidades_titulo: "Vulnerabilidades técnicas",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Dependencia del carbón</b> · alta intensidad de carbono y exposición a la transición global." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Importación de petróleo</b> · refinación insuficiente para la demanda de transporte." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Geografía archipelágica</b> · electrificar 17.000 islas exige sistemas aislados." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Custodia de estrechos</b> · Malaca, Lombok y Sonda son SLOC globales." }
    ],
    capacidad_titulo: "Capacidad instalada (GW)",
    capacidad: {
      anios: ["2020", "2024", "2030", "2040"],
      y_titulo: "GW",
      series: [
        { label: "Carbón (GW)", tipo: "bar", data: [35, 42, 40, 25], color: "#8a4a4a" },
        { label: "Renovables (GW)", tipo: "bar", data: [10, 14, 35, 90], color: "#a17c1c" },
        { label: "Demanda pico (GW)", tipo: "line", data: [45, 55, 75, 110], color: "#c4570e" }
      ]
    },
    capacidad_cita: "El JETP busca adelantar el pico del carbón y crecer renovables. <i>Fuente: PLN/IEA.</i>"
  },
  geopolitica: {
    src: "Radar APERC normalizado",
    radar_titulo: "Radar APERC: Indonesia vs Australia vs China",
    radar: {
      ejes: ["Availability", "Accessibility", "Affordability", "Acceptability", "Sovereignty", "Robustness", "Resilience"],
      series: [
        { label: "Indonesia", data: [7.0, 5.0, 5.5, 4.9, 6.5, 5.5, 5.5], color: "#c4570e" },
        { label: "Australia", data: [8.5, 4.8, 6.0, 5.5, 7.0, 6.2, 6.5], color: "#2e7d32" },
        { label: "China", data: [7.5, 4.5, 6.0, 4.0, 7.0, 6.5, 6.0], color: "#0b5394" }
      ]
    },
    radar_cita: "Normalización min-max sobre indicadores §01.",
    dependencias_titulo: "Dependencias y socios",
    dependencias: [
      { vinculo: "Exportación de carbón a China/India", pct: "70", riesgo: { texto: "Demanda asiática", pill: "warn" } },
      { vinculo: "Exportación de GNL a Asia oriental", pct: "—", riesgo: { texto: "Divisas estables", pill: "ok" } },
      { vinculo: "Importación de petróleo y derivados", pct: "—", riesgo: { texto: "Importador neto", pill: "warn" } },
      { vinculo: "Inversión china en níquel/baterías", pct: "—", riesgo: { texto: "Downstreaming", pill: "warn" } }
    ],
    dependencias_cita: "ESDM; IEA 2024.",
    minerales_titulo: "Minerales y energía",
    minerales: [
      { valor: "#1", unidad: " mundial", etiqueta: "NÍQUEL Y CARBÓN TÉRMICO" },
      { valor: "#2", unidad: " mundial", etiqueta: "GEOTERMIA" },
      { valor: "~24", unidad: " GW", etiqueta: "POTENCIAL GEOTÉRMICO" }
    ],
    minerales_cita: "USGS; IEA 2024."
  },
  militar: {
    titulo_seccion: "Combustibles Militares y Rol Operacional de la TNI",
    nav_label: "Combustibles militares",
    src: "IISS · Kementerian Pertahanan",
    combustibles_titulo: "Demanda de combustibles de la TNI",
    combustibles: [
      { codigo: "Jet A-1 / Avtur", tipo: "Queroseno de aviación", usuario: "TNI-AU (aérea)", ml_anio: "300" },
      { codigo: "Diésel naval", tipo: "Diésel", usuario: "TNI-AL (naval)", ml_anio: "350" },
      { codigo: "Diésel terrestre", tipo: "Diésel", usuario: "TNI-AD (terrestre)", ml_anio: "200" }
    ],
    combustibles_total: "~850",
    combustibles_cita: "Estimación de orden de magnitud (gran componente naval por el archipiélago).",
    vulnerabilidades_titulo: "Vulnerabilidades específicas de defensa",
    vulnerabilidades: [
      { nivel: "high", tag: "CRÍT", texto_html: "<b>Custodia de estrechos</b> · Malaca, Lombok y Sonda son SLOC globales y puntos de riesgo." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Vastedad archipelágica</b> · proteger recursos e infraestructura dispersos en 17.000 islas." },
      { nivel: "med", tag: "ALTO", texto_html: "<b>Mar de China Meridional</b> · tensiones en las Natuna." }
    ],
    mision_titulo: "Misión en Seguridad Energética",
    mision: [
      { titulo: "SEGURIDAD DE ESTRECHOS", texto_html: "La TNI-AL vigila Malaca, Lombok y Sonda (con Malasia y Singapur)." },
      { titulo: "RECURSOS DE NATUNA", texto_html: "Protección de campos de gas frente a incursiones." },
      { titulo: "INFRAESTRUCTURA INSULAR", texto_html: "Custodia de terminales de GNL y plantas de níquel." },
      { titulo: "HADR", texto_html: "Respuesta ante desastres (sismos/volcanes) que afectan la energía." }
    ],
    mision_cita: "IISS 2024."
  },
  politicas: {
    src: "ESDM · PLN",
    planes_titulo: "Planes nacionales",
    planes: [
      { nombre: "JETP (2022)", texto: "20 mil M USD para adelantar el pico del carbón." },
      { nombre: "Downstreaming del níquel", texto: "Prohibición de exportar mineral; industria de baterías." },
      { nombre: "RUEN / RUPTL", texto: "Planes nacionales de energía y de electricidad (PLN)." },
      { nombre: "Net-zero 2060", texto: "Meta de neutralidad con apoyo internacional." }
    ],
    instituciones_titulo: "Instituciones clave",
    instituciones: [
      { sigla: "ESDM", texto: "ministerio de energía y recursos minerales." },
      { sigla: "Pertamina", texto: "petrolera y gasista estatal." },
      { sigla: "PLN", texto: "empresa eléctrica estatal (monopolio)." },
      { sigla: "MIND ID", texto: "holding minero estatal (níquel)." }
    ],
    transicion_titulo: "Transición y economía",
    transicion_html: "<p>Indonesia equilibra su <b>renta del carbón</b> con la presión de descarbonizar (JETP), apostando al <b>níquel</b> para capturar valor de la cadena de baterías y a la <b>geotermia/solar</b> para diversificar en un archipiélago complejo.</p>",
    transicion_cita: "ESDM; IEA 2024."
  },
  crisis: {
    src: "Wargaming · Cone of Plausibility",
    matriz_titulo: "Matriz Probabilidad × Impacto",
    matriz: {
      esquina: "Impacto ↓ / Prob →",
      prob_labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
      filas: [
        { impacto: "Catastrófico", celdas: [{ nivel: 3 }, { nivel: 4 }, { nivel: 5, texto: "Bloqueo de Malaca" }, { nivel: 5 }, { nivel: 5 }] },
        { impacto: "Mayor", celdas: [{ nivel: 2 }, { nivel: 3 }, { nivel: 4, texto: "Shock del precio del petróleo" }, { nivel: 4, texto: "Caída del carbón (transición)" }, { nivel: 5 }] },
        { impacto: "Moderado", celdas: [{ nivel: 1 }, { nivel: 2 }, { nivel: 3, texto: "Sismo/volcán (infra)" }, { nivel: 4, texto: "Tensión en Natuna" }, { nivel: 4 }] },
        { impacto: "Menor", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 3 }, { nivel: 3 }] },
        { impacto: "Insignif.", celdas: [{ nivel: 1 }, { nivel: 1 }, { nivel: 1 }, { nivel: 2 }, { nivel: 2 }] }
      ]
    },
    matriz_cita: "Escala HM Treasury Orange Book.",
    escenarios_titulo: "Escenarios calibrados",
    escenarios: [
      { nivel: "high", tag: "A", texto_html: "<b>Bloqueo de Malaca</b> — disrupción del comercio energético regional. <i>Respuesta:</i> rutas alternas (Lombok/Sonda), TNI-AL, reservas." },
      { nivel: "high", tag: "B", texto_html: "<b>Shock del precio del petróleo</b> — golpe fiscal por importación y subsidios. <i>Respuesta:</i> biodiésel (B35), eficiencia." },
      { nivel: "med", tag: "C", texto_html: "<b>Caída de la demanda de carbón</b> (transición global). <i>Respuesta:</i> downstreaming del níquel, diversificación." },
      { nivel: "med", tag: "D", texto_html: "<b>Sismo/volcán</b> — daño a infraestructura insular. <i>Respuesta:</i> redundancia, microrredes, HADR." }
    ],
    vectores_titulo: "Respuesta estratégica integrada — vectores",
    vectores: [
      { titulo: "DIVERSIFICAR ESTRECHOS", texto: "Lombok y Sonda como alternativas a Malaca." },
      { titulo: "NÍQUEL Y BATERÍAS", texto: "Capturar valor de la cadena de transición." },
      { titulo: "GEOTERMIA Y SOLAR", texto: "Aprovechar el Anillo de Fuego y reducir carbón." },
      { titulo: "BIOCOMBUSTIBLES", texto: "Biodiésel para bajar la factura de importación." }
    ]
  },
  referencias: {
    src: "Triangulación multi-fuente",
    titulo: "Fuentes primarias y académicas",
    items: [
      "IEA (2024). <i>Indonesia Energy Profile / Outlook</i>.",
      "ESDM (2024). <i>Handbook of Energy & Economic Statistics</i>.",
      "Ember (2024). <i>Electricity Data Explorer</i>.",
      "USGS (2024). <i>Mineral Commodity Summaries</i> (níquel).",
      "APERC (2007). <i>A Quest for Energy Security in the 21st Century</i>. Tokio."
    ]
  },
  footer: "Documento de sustentación · Rúbrica Slide18 · Logística Militar · Mayo 2026"
});

// __APPEND__

/* === MOTOR: escribir archivos + validar + reconstruir manifest ========= */
let okAll = true;
PAISES.forEach(function (p) {
  var iso = String(p.meta.pais_iso).toLowerCase();
  var file = path.join(DATA, iso + ".json");
  fs.writeFileSync(file, JSON.stringify(p, null, 2) + "\n", "utf8");
  var v = S.validate(p);
  var sumP = (p.matriz && p.matriz.primaria || []).reduce(function (a, x) { return a + (+x.valor || 0); }, 0);
  console.log((v.ok ? "OK " : "XX ") + (iso + ".json").padEnd(10) +
    " pais=" + p.meta.pais.padEnd(18) +
    " aperc=" + S.apercGlobal(p) +
    " primaria~" + sumP.toFixed(0) +
    " pines=" + ((p.infraestructura && p.infraestructura.pines || []).length) +
    (v.errors.length ? "  ERR:" + JSON.stringify(v.errors) : ""));
  if (!v.ok) okAll = false;
});

var files = fs.readdirSync(DATA).filter(function (f) {
  return f.endsWith(".json") && f !== "manifest.json" && f !== "_plantilla.json";
});
var countries = files.map(function (f) {
  var d = JSON.parse(fs.readFileSync(path.join(DATA, f), "utf8"));
  return { iso: d.meta.pais_iso, file: f, pais: d.meta.pais, estudiante: d.meta.estudiante || "—", aperc_global: S.apercGlobal(d) };
}).sort(function (a, b) { return a.pais.localeCompare(b.pais, "es"); });
fs.writeFileSync(path.join(DATA, "manifest.json"), JSON.stringify({ countries: countries }, null, 2) + "\n", "utf8");

console.log("\nmanifest.json -> " + countries.length + " países: " + countries.map(function (c) { return c.iso; }).join(", "));
console.log(okAll ? "\nTODOS VÁLIDOS ✅" : "\n⚠️  HAY ARCHIVOS INVÁLIDOS — revisar arriba");
