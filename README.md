# Plataforma de Seguridad Energética por País

Portafolio académico de **seguridad energética** desplegado sobre un **mapa mundi
Mercator**. Cada estudiante analiza **un país** y produce un tablero interactivo
(dashboard) a partir de un único archivo `.json`. En el mapa, cada país entregado
se colorea según su puntaje **APERC global** (verde = alta seguridad → rojo = baja)
y, al hacer clic, abre su tablero completo.

La plataforma es **100% estática**: solo HTML, CSS y JavaScript en el navegador.
**No hay backend, ni base de datos, ni instalación**. Los datos de cada país son
archivos JSON; el docente los reúne en el mapa y los estudiantes los producen con
un editor incluido.

> Basado en la **rúbrica Slide18** de la asignatura *Logística Militar*. El tablero
> de **Australia** (`data/aus.json`) es el ejemplo de referencia: muestra cómo
> debe verse y diligenciarse un portafolio completo.

---

## Índice

- [Para el DOCENTE — Inicio rápido](#para-el-docente--inicio-rápido)
  - [Modo 1 · Local sin servidor (doble clic)](#modo-1--local-sin-servidor-doble-clic)
  - [Modo 2 · Servido (recomendado para proyección / CESAC / GitHub Pages)](#modo-2--servido-recomendado-para-proyección--cesac--github-pages)
  - [¿Por qué dos modos?](#por-qué-dos-modos)
- [Para el ESTUDIANTE — Flujo de trabajo](#para-el-estudiante--flujo-de-trabajo)
- [El marco APERC (las 4 A's)](#el-marco-aperc-las-4-as)
- [Las 11 secciones del tablero](#las-11-secciones-del-tablero)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Nota sobre el uso offline](#nota-sobre-el-uso-offline)
- [Créditos](#créditos)

---

## Para el DOCENTE — Inicio rápido

Hay **dos formas** de usar la plataforma. Elija una según el contexto.

### Modo 1 · Local sin servidor (doble clic)

Ideal para revisar entregas de forma rápida en su propio computador, sin instalar
nada.

1. Abra la carpeta del proyecto en su explorador de archivos.
2. Haga **doble clic en `index.html`**. Se abre en su navegador con el mapa mundi.
3. En el panel **«Cargar entregas»**, **arrastre y suelte** los archivos `.json`
   que entregaron los estudiantes (puede soltar varios a la vez), o use el botón
   para seleccionarlos.
4. Cada entrega válida pinta su país en el mapa y aparece en la lista lateral
   (país · estudiante · puntaje). **Clic en un país** abre su tablero.

> Las entregas cargadas así **persisten en el navegador** (se guardan en el
> almacenamiento local del propio navegador). Si vuelve a abrir `index.html` más
> tarde, siguen ahí. El botón **«Limpiar todo»** las borra; **«Quitar»** elimina
> una sola.

**Limitación del Modo 1:** como abre con `file://`, el navegador **no puede leer**
automáticamente los archivos de la carpeta `data/` (lo prohíben las reglas de
seguridad del navegador). Por eso en este modo las entregas se cargan **a mano**
(arrastrando). Es perfecto para uso individual; para proyectar o publicar, use el
Modo 2.

### Modo 2 · Servido (recomendado para proyección / CESAC / GitHub Pages)

Ideal para clase, sustentaciones, o publicar el curso completo. Al servir la carpeta
por HTTP, el mapa **carga solo** todas las entregas registradas, sin arrastrar nada.

1. Abra una terminal **en la carpeta del proyecto** y levante un servidor estático
   (Python ya viene instalado en macOS y Linux):

   ```bash
   python3 -m http.server 8000
   ```

2. Abra en el navegador:

   ```
   http://localhost:8000/
   ```

3. Para **añadir una entrega**:
   - Copie el `.json` del estudiante dentro de la carpeta `data/`.
   - Regístrelo en **`data/manifest.json`** (el índice de entregas). Añada una
     entrada al arreglo `countries`:

     ```json
     {
       "countries": [
         { "iso": "AUS", "file": "aus.json", "pais": "Australia", "estudiante": "Cátedra (ejemplo)", "aperc_global": 6.2 },
         { "iso": "COL", "file": "col.json",  "pais": "Colombia",  "estudiante": "Nombre del estudiante", "aperc_global": 5.4 },
         { "iso": "NOR", "file": "nor.json",   "pais": "Noruega",   "estudiante": "Nombre del estudiante", "aperc_global": 8.4 }
       ]
     }
     ```

     - `iso` = código ISO 3166-1 **alfa-3** en mayúsculas (debe coincidir con
       `meta.pais_iso` del JSON).
     - `file` = nombre del archivo dentro de `data/`.
     - `pais`, `estudiante`, `aperc_global` se muestran en la lista y el mapa.

4. Recargue `http://localhost:8000/`. El mapa carga el manifiesto y pinta todos
   los países. (Si además algún docente arrastró entregas en este navegador, se
   **fusionan** con las del manifiesto.)

> **Publicar en GitHub Pages / CESAC:** suba la carpeta tal cual a un repositorio
> y active GitHub Pages (o cópiela al servidor web institucional). El sitio queda
> disponible para todo el curso sin instalación. El flujo de `data/` +
> `manifest.json` es el mismo.

### ¿Por qué dos modos?

| | Modo 1 · `file://` (doble clic) | Modo 2 · HTTP (servido) |
|---|---|---|
| Cómo abre | doble clic en `index.html` | `python3 -m http.server` → `localhost:8000` |
| Cargar entregas | **arrastrar** los `.json` a la zona de carga | **automático** desde `data/` + `manifest.json` |
| Persistencia | en el navegador (local) | en la carpeta `data/` (compartible) |
| Ideal para | revisar rápido en su PC | clase, proyección, publicación |

La diferencia técnica: cargar `data/...` automáticamente usa `fetch()`, que **solo
funciona por HTTP**. Por `file://` el navegador lo bloquea, así que el Modo 1 recurre
a la carga manual. Ambas vías muestran exactamente el mismo tablero.

---

## Para el ESTUDIANTE — Flujo de trabajo

Su tarea: producir el archivo `<iso>.json` de su país (p. ej. `col.json`)
usando el editor incluido. **No necesita programar nada.**

1. **Abra el editor**: `editor.html` (doble clic, o desde el botón «Abrir editor»
   del mapa).

2. **Empiece el país**, por una de dos vías:
   - **«Nuevo país»** → arranca un formulario en blanco.
   - **«Importar»** → cargue la plantilla `data/_plantilla.json` (o un `.json`
     que ya venía trabajando) para seguir editándolo. La plantilla viene comentada
     con la forma exacta de cada campo.

3. **Llene el formulario sección por sección** (acordeón con las 11 secciones).
   Escriba sus datos, citas y análisis en cada una.

   > **El corazón del análisis es la §02 — Matriz Energética.** Ahí define el *mix*
   > de energía primaria y de generación eléctrica de su país. Ese mix alimenta los
   > indicadores de diversificación (HHI / Shannon) y las dimensiones APERC de la
   > **§01**. Diligénciela con cuidado: el resto del tablero se apoya en ella.

4. **«Calcular APERC global»** → la plataforma promedia las cuatro A's (§01) y
   produce el puntaje 0–10 que colorea su país en el mapa.

5. **«Validar»** → revisa errores (bloqueantes, p. ej. falta el código ISO) y
   advertencias (sugerencias, p. ej. secciones núcleo sin diligenciar). Corrija
   lo que marque como error.

6. **«Vista previa»** → vea su tablero renderizado tal como lo verá el docente,
   con sus gráficas y su mapa de infraestructura.

7. **«Exportar JSON»** → descarga `<iso>.json` (su código de país en minúsculas,
   p. ej. `col.json`). **Ese archivo es su entrega**: envíelo al docente.

> Consejo: los campos cuyo nombre termina en `_html` (por ejemplo la tesis o las
> conclusiones) admiten marcado simple como `<i>cursiva</i>`, `<b>negrita</b>` y
> `<br/>` para saltos de línea. Los demás campos son texto normal.

---

## El marco APERC (las 4 A's)

El **Asia Pacific Energy Research Centre (APERC, 2007)** define la seguridad
energética como *la capacidad de una economía para garantizar el abastecimiento de
recursos energéticos de forma sustentable y oportuna*, descompuesta en **cuatro
dimensiones**:

| Dimensión | En inglés | Pregunta que responde |
|---|---|---|
| **Disponibilidad** | *Availability* | ¿Existen físicamente los recursos (reservas, producción)? |
| **Accesibilidad** | *Accessibility* | ¿Se pueden obtener (geopolítica, rutas, refinación)? |
| **Asequibilidad** | *Affordability* | ¿El costo es soportable (precios, pobreza energética)? |
| **Aceptabilidad** | *Acceptability* | ¿Es compatible con el ambiente y la sociedad (huella de carbono, licencia social)? |

Cada A se puntúa de **0 a 10**. El **APERC global** es el **promedio de las cuatro**
(redondeado a un decimal) y es el valor que determina el color del país en el mapa:

| Puntaje | Lectura |
|---|---|
| ≥ 8.0 | Alta |
| 6.5 – 7.9 | Media-alta |
| 5.0 – 6.4 | Media |
| 3.5 – 4.9 | Media-baja |
| < 3.5 | Baja |
| (sin puntaje) | gris — país sin entrega |

El análisis se complementa con las tres perspectivas de **Cherp & Jewell (2014)**:
*sovereignty* (control estatal), *robustness* (resistencia técnica) y *resilience*
(adaptación), que aparecen, por ejemplo, en el radar de la §06.

---

## Las 11 secciones del tablero

El tablero siempre muestra **las 11 secciones en este orden y con esta numeración
fija** (00–10). Las marcadas como **núcleo** son las recomendadas como mínimo; si
una sección queda sin diligenciar, el tablero muestra su encabezado con el aviso
*«— Sección no diligenciada —»** y atenúa su enlace en el menú (no se renumera).

| # | Sección | Núcleo | De qué trata |
|---|---|:---:|---|
| 00 | **Resumen Ejecutivo** | sí | Tesis, conclusión y KPIs principales del país. |
| 01 | **Marco APERC** | sí | Definición, *scorecard* de las 4 A's e indicadores cuantitativos. |
| 02 | **Matriz Energética** | sí | *Mix* de energía primaria y eléctrica, y comparativa internacional. **Corazón del análisis.** |
| 03 | **Balance (Sankey)** | — | Diagrama de flujos físicos: producción → transformación → uso final. |
| 04 | **Evolución & Transición** | — | Mix histórico y proyectado, e hitos del régimen energético. |
| 05 | **Infraestructura (Mapa)** | sí | Mapa Leaflet con nodos (refinerías, GNL, almacenamiento, minerales), rutas marítimas (SLOC), vulnerabilidades y capacidad. |
| 06 | **Geopolítica & Comparado** | — | Radar APERC comparado, dependencias/socios y minerales críticos. |
| 07 | **Combustibles militares** | — | Demanda de combustibles de las FF.MM., vulnerabilidades de defensa y rol operacional. |
| 08 | **Políticas & Instituciones** | — | Planes nacionales, instituciones clave y transición justa. |
| 09 | **Escenarios de Crisis** | — | Matriz probabilidad × impacto, escenarios calibrados y vectores de respuesta. |
| 10 | **Referencias** | — | Fuentes primarias y académicas. |

---

## Estructura de carpetas

```
Plataforma_Seguridad_Energetica/
├── index.html              Panel principal: mapa mundi + carga de entregas
├── pais.html               Renderiza el tablero de UN país desde su JSON
├── editor.html             Herramienta del estudiante: formulario → vista previa → exportar
├── assets/
│   ├── app.css             Estilos compartidos (paleta y tipografía del tablero)
│   ├── schema.js           Contrato de datos + validador (define window.SE_ESQUEMA)
│   ├── render.js           Construye el tablero a partir del JSON
│   ├── editor.js           Lógica del editor (formulario ↔ JSON, importar, vista previa, exportar)
│   └── countries.geo.json  GeoJSON mundial vendorizado (fronteras de los países)
├── data/
│   ├── manifest.json       Índice de entregas para el modo servido
│   ├── _plantilla.json     Plantilla en blanco y comentada para estudiantes
│   ├── aus.json      Ejemplo de referencia (tablero completo)
│   ├── col.json       Semilla de ejemplo
│   └── nor.json        Semilla de ejemplo
├── CONTRACT.md             Detalle TÉCNICO de la plataforma (para quien edite el código)
└── README.md               Esta guía
```

Archivos que más usará cada rol:

- **Docente:** `index.html`, `data/` y `data/manifest.json`.
- **Estudiante:** `editor.html` y `data/_plantilla.json` (para empezar);
  `data/aus.json` como ejemplo de qué tan completo puede quedar.

> **¿Va a modificar el código (CSS, lógica, esquema de datos)?** Lea primero
> **`CONTRACT.md`**: es la fuente de verdad técnica (forma exacta del JSON, API de
> `render.js`, convenciones de URL, colores, matching del mapa, etc.).

---

## Nota sobre el uso offline

La plataforma necesita **internet** para tres cosas, porque se cargan desde CDN:

- **Leaflet** (motor del mapa) y su CSS.
- **Chart.js** y su complemento Sankey (las gráficas del tablero).
- **Los *tiles* (teselas) del mapa base** (fondo cartográfico CARTO).

En cambio, las **fronteras de los países ya están vendorizadas** en
`assets/countries.geo.json`: ese archivo no requiere conexión.

**Para un uso 100% offline** (sin internet en absoluto), descargue además las
librerías CDN y apunte las etiquetas a copias locales:

1. Descargue estos archivos y guárdelos, por ejemplo, en `assets/vendor/`:
   - `https://unpkg.com/leaflet@1.9.4/dist/leaflet.css`
   - `https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`
   - `https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js`
   - `https://cdn.jsdelivr.net/npm/chartjs-chart-sankey@0.12.1/dist/chartjs-chart-sankey.min.js`
2. En `index.html`, `pais.html` y `editor.html`, cambie las URLs de CDN por las
   rutas locales (p. ej. `assets/vendor/leaflet.js`).
3. El **mapa base** (los *tiles*) seguiría necesitando internet; para offline total
   habría que servir teselas locales, lo cual excede el alcance de esta guía. El
   resto del tablero (gráficas, mapa de infraestructura con su capa de fronteras)
   funcionaría sin conexión.

---

## Créditos

- Basado en la **rúbrica Slide18** de la asignatura **Logística Militar**.
- **Tablero de referencia:** dashboard de **Australia** (`data/aus.json`),
  que define la estética y el nivel de detalle esperado de cada portafolio.
- Marco analítico: **APERC (2007)** y **Cherp & Jewell (2014)**.
