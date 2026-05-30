# CONTRATO TÉCNICO — Plataforma de Seguridad Energética por País

**Fuente de verdad compartida por todos los archivos.** No cambiar las convenciones
de abajo sin actualizar este documento. El tablero por país debe reproducir
**1:1** el HTML de referencia: `/Users/jq/Downloads/Logística Militar/index.html`
(dashboard de Australia). El ejemplo de datos canónico y completo es
`data/aus.json`. El esquema/validador es `assets/schema.js` (`window.SE_ESQUEMA`).

---

## 1. Estructura de carpetas

```
Plataforma_Seguridad_Energetica/
├── index.html              # Panel principal: mapa mundi Mercator (coropleta) + carga de entregas
├── pais.html               # Renderiza el tablero de UN país desde su JSON
├── editor.html             # Herramienta del estudiante: formulario → vista previa → exportar JSON
├── assets/
│   ├── app.css             # Estilos compartidos (adaptados del HTML de referencia)
│   ├── schema.js           # Contrato de datos + validador  (YA EXISTE — no romper su API)
│   ├── render.js           # window.renderDashboard(rootEl, data)  → construye el tablero
│   ├── editor.js           # Lógica del editor (form ↔ JSON, import, preview, export)
│   └── countries.geo.json  # GeoJSON mundial vendorizado (YA EXISTE, Natural Earth 110m, 177 países)
├── data/
│   ├── manifest.json       # Índice de entregas para despliegue servido (GitHub Pages / CESAC)
│   ├── _plantilla.json     # Plantilla en blanco comentada para estudiantes
│   ├── aus.json      # Ejemplo de referencia (YA EXISTE)
│   ├── col.json       # Semilla de ejemplo
│   └── nor.json        # Semilla de ejemplo
├── CONTRACT.md             # Este documento
└── README.md               # Guía para estudiante y docente
```

## 2. Dependencias CDN (idénticas a la referencia; se cargan en el navegador)

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-chart-sankey@0.12.1/dist/chartjs-chart-sankey.min.js"></script>
```
`pais.html` y `editor.html` cargan Leaflet + Chart.js + sankey + `app.css` + `schema.js` + `render.js`.
`index.html` carga Leaflet + `app.css` + `schema.js` (no necesita Chart.js).

## 3. Contrato de datos (JSON por país)

La FORMA exacta = `data/aus.json`. Claves de nivel superior, en orden:
`schema_version, meta, resumen, aperc, matriz, sankey, evolucion, infraestructura,
geopolitica, militar, politicas, crisis, referencias, footer`.

- Campos que terminan en `_html` (p.ej. `tesis_html`, `texto_html`, `transicion_html`)
  admiten marcado inline del estudiante (`<i> <b> <br/>` y entidades) → se insertan tal cual.
- Los demás campos de texto se ESCAPAN con `SE_ESQUEMA.esc()` antes de insertarse.
- `meta.titulo` admite `<br/>`.
- Colores opcionales por serie/segmento (`color`); si faltan, usar `SE_ESQUEMA.PALETTE` por orden.
- Pines de mapa (§05): `tipo ∈ {refineria, gnl, almacenamiento, minerales, sloc, otro}` → color por `SE_ESQUEMA.TIPO_PIN_COLOR`.
- Matriz de riesgo (§09): `nivel ∈ {1..5}` → clases `.l1..l5`. `pill ∈ {ok, warn, danger}` → `.pill-ok/.pill-warn/.pill-danger`. `nivel` de risk-row ∈ `{high, med, low}`.

## 4. Secciones canónicas (orden y numeración FIJOS)

`SE_ESQUEMA.SECTIONS` define id, número (00–10) y etiqueta de navegación:

| # | id | Nav label | Núcleo |
|---|----|-----------|--------|
|00|resumen|Resumen Ejecutivo|sí|
|01|aperc|Marco APERC|sí|
|02|matriz|Matriz Energética|sí|
|03|sankey|Balance (Sankey)|—|
|04|evolucion|Evolución & Transición|—|
|05|infraestructura|Infraestructura (Mapa)|sí|
|06|geopolitica|Geopolítica & Comparado|—|
|07|militar|Combustibles militares (usa `militar.nav_label` si existe)|—|
|08|politicas|Políticas & Instituciones|—|
|09|crisis|Escenarios de Crisis|—|
|10|referencias|Referencias|—|

**Regla de secciones vacías:** render SIEMPRE muestra las 11 con su número fijo.
Si `SE_ESQUEMA.sectionHasData(data, id) === false`, renderiza el encabezado de
sección + un marcador discreto `— Sección no diligenciada —` y atenúa su enlace
en el nav (clase `.pendiente`). No se renumeran las secciones.

## 5. API de render (la implementa `render.js`, la usan `pais.html` y `editor.js`)

```js
// Construye el tablero COMPLETO (aside con nav + main con secciones, charts y mapa)
// dentro de rootEl. Limpia rootEl antes. Inicializa Chart.js, Leaflet,
// IntersectionObserver (reveal), contadores KPI y scroll-spy del nav.
window.renderDashboard(rootEl, data /*, opts */);
```
- `rootEl` es un contenedor vacío; render.js inyecta `<div class="layout"><aside>…</aside><main>…</main></div>`.
- Debe ser re-ejecutable (el editor lo llama en cada cambio para la vista previa): destruir charts/mapa previos o recrear el contenedor.
- Comportamiento visual idéntico a la referencia: animación de aparición por sección (IntersectionObserver, `.visible`), contadores con `data-c`, scroll-spy que marca `.active` en el nav, mapa Leaflet con `pin()` (circleMarker) + polilíneas SLOC punteadas, y todos los charts (barras apiladas 100%, líneas con área, radar, sankey, capacidad mixta barras+línea).

## 6. Convenciones de URL y carga de datos

- Abrir un país: `pais.html?pais=<ISO3>` (acepta también `?país=` y `?iso=`). Ej.: `pais.html?pais=AUS`.
- `pais.html` resuelve el JSON en este orden:
  1. `sessionStorage["se_preview"]` (vista previa lanzada desde el editor), si coincide o no hay ISO.
  2. `fetch("data/" + iso.toLowerCase() + ".json")` — funciona cuando se sirve por HTTP (GitHub Pages, CESAC, `python3 -m http.server`).
  3. `localStorage["se_pais_" + ISO]` — entregas cargadas antes desde `index.html` (permite uso por `file://` sin servidor).
  Si nada resuelve, mostrar mensaje claro con enlace «← Volver al mapa».
- Botón «← Volver al mapa» → `index.html`.

## 7. Mapa mundi (index.html)

- Leaflet, CRS por defecto **EPSG:3857 (Web Mercator)**. `setView([20,0], 2)`, `worldCopyJump:true`. Tiles CARTO `light_all` (igual que la referencia).
- Capa GeoJSON desde `assets/countries.geo.json` (fallback CDN
  `https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@master/geojson/ne_110m_admin_0_countries.geojson`).
- **Matching país↔feature:** `feature.properties.ADM0_A3` (fallback `ISO_A3`, luego `NAME`) ↔ `meta.pais_iso`.
- **Coropleta:** país con entrega → color por `SE_ESQUEMA.scoreColor(SE_ESQUEMA.apercGlobal(data))`. Sin entrega → gris `#d7dce4`. Leyenda = `SE_ESQUEMA.SCORE_LEGEND`.
- Hover: resaltar borde + tooltip `país · estudiante · APERC x.x/10`. Clic en país con entrega → navegar a `pais.html?pais=<ISO3>`.
- **Carga de entregas (sin backend):**
  - Botón/zona drag-drop «Cargar entregas» (multi-archivo `.json`). Cada archivo se valida con `SE_ESQUEMA.validate`; si ok, se guarda en `localStorage["se_pais_<ISO>"]` y se actualiza un índice `localStorage["se_indice"]` (array de `{iso, pais, estudiante, aperc_global}`). Persisten entre recargas.
  - Al iniciar: intentar `fetch("data/manifest.json")`; por cada entrada, `fetch` del archivo y registrar (modo servido). SIEMPRE fusionar con lo que haya en `localStorage` (modo local). Si ambos fallan (file:// sin nada), mostrar solo el ejemplo si `data/aus.json` es accesible, y la zona de carga.
  - Panel lateral: lista buscable de países entregados (país, estudiante, puntaje) → clic abre el tablero. Botón «Quitar» por entrega y «Limpiar todo» (borra localStorage).
  - Enlaces: «Descargar plantilla» (`data/_plantilla.json`) y «Abrir editor» (`editor.html`).

## 8. manifest.json (para despliegue servido)

```json
{ "countries": [
  { "iso": "AUS", "file": "aus.json", "pais": "Australia", "estudiante": "Cátedra (ejemplo)", "aperc_global": 6.2 },
  { "iso": "COL", "file": "col.json",  "pais": "Colombia",  "estudiante": "—", "aperc_global": 5.4 },
  { "iso": "NOR", "file": "nor.json",   "pais": "Noruega",   "estudiante": "—", "aperc_global": 8.4 }
] }
```

## 9. Editor (editor.html + editor.js)

- Dos vías: (a) **formulario guiado** por secciones (acordeón) que escribe el objeto JSON; (b) **importar** un `.json` existente (o pegar texto) para seguir editándolo.
- Botón «Vista previa» → guarda el objeto en `sessionStorage["se_preview"]` y abre `pais.html` en una pestaña/iframe, o renderiza en vivo con `renderDashboard` en un panel embebido.
- Validación visible (errores/advertencias de `SE_ESQUEMA.validate`).
- «Calcular APERC global» = promedio de las 4 A's (`SE_ESQUEMA.apercGlobal`).
- «Exportar» → descarga `\<iso minúscula\>.json` (UTF-8) listo para entregar.
- Énfasis pedagógico: la **§02 Matriz Energética** es el corazón del análisis; su mix alimenta los indicadores de diversificación (HHI/Shannon, §01) y las dimensiones APERC. Reflejarlo en ayudas/inline del editor.

## 10. Estilo / paleta (de la referencia)

Variables CSS (`:root`): `--bg:#f7f8fa; --panel:#fff; --ink:#1a2332; --ink-2:#4a5870;
--muted:#8693a8; --line:#e2e6ed; --accent:#0b5394; --accent-2:#c4570e; --ok:#2e7d32;
--warn:#ed6c02; --danger:#c62828; --gold:#a17c1c;` + series 1–6.
Tipografía: cuerpo `'Source Serif Pro','Georgia',serif`; etiquetas/datos `'Helvetica Neue','Arial',sans-serif` (clase `.sans`). `Chart.defaults` sobrios como en la referencia.
Responsive (≤900px) y `@media print` (oculta `aside`) como en la referencia.
