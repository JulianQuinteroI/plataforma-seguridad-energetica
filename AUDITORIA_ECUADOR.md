# INFORME DE EVALUACIÓN ACADÉMICA
## Tablero de Seguridad Energética — ECUADOR (`data/ecu.json`)
### Cátedra de Seguridad Energética · ESDEG

> **Método.** 8 verificadores factuales con búsqueda web comprobaron 50 afirmaciones
> contra fuentes reales (EIA, OPEC, CENACE, BEN 2023, IEA, GEM, prensa ecuatoriana e
> internacional); las 10 dudosas pasaron por una verificación adversarial independiente
> (un segundo agente intentando *refutar* cada hallazgo). En paralelo se auditó la
> consistencia interna (cruce numérico, esquema, coordenadas y contraste con
> `col.json` / `per.json`) y el rigor académico frente al estándar canónico `aus.json`.
>
> **Fecha de auditoría:** junio 2026. **Auditoría asistida por IA; cifras verificadas
> contra fuentes externas, pero el docente debe validar antes de calificar en firme.**

---

## 1. Veredicto general

El tablero de Ecuador está **estructuralmente completo y narrativamente coherente**
(cubre las 14 secciones del contrato, suma 100 en todas las matrices, y la tesis
*hidrodependencia → erosión de robustness → apagones* está bien construida), pero
arrastra **errores factuales de fondo en datos de alta carga** (reservas de crudo
subdimensionadas a la mitad, cronología OPEP falseada, pico de apagones subestimado,
demanda pico mal rotulada, geolocalización de Paute-Molino caída en Guayaquil) y un
**déficit metodológico serio**: los scores APERC y la "normalización min-max" que el
tablero declara no son reproducibles, y las citas son genéricas, sin trazabilidad a
página/tabla/informe.

**Calificación global: 3.4 / 5.0**

*Justificación:* la completitud estructural y la coherencia interna sostienen un aprobado
sólido. Sin embargo, hay **tres errores de gravedad ALTA confirmados en verificación
adversarial independiente** (reservas 4 Bbbl vs ~8,3 Bbbl; subsidio mal contextualizado;
coordenada de Paute-Molino en Guayaquil) y **varios datos centrales desactualizados o
incorrectos** (hidro 79%, apagones 12 h/día, demanda pico 4,4 GW). Estos no son matices:
contaminan los KPIs titulares y el mensaje analítico (sugieren holgura de capacidad donde
hay déficit). El rigor de fuentes y la trazabilidad cita→dato quedan muy por debajo del
estándar canónico (`aus.json`). La nota no baja más porque la arquitectura es correcta,
la narrativa cualitativa es defendible y el tablero es transparente al rotular sus
estimaciones.

---

## 2. Errores factuales y desactualizaciones

### 2.1 INCORRECTO — gravedad ALTA (confirmados en verificación adversarial)

| Afirmación | Declarado | Real | Fuente |
|---|---|---|---|
| Reservas de crudo (KPI + `geopolitica.minerales`) | ~4 Bbbl | **~8,3 Bbbl** probadas (estable 2015-2023; 3.º de Latinoamérica). La propia cita "OPEP" del tablero **contradice** el 4 Bbbl | EIA *Today in Energy*; OPEC ASB (8.273 Mbbl) |
| Coordenada pin "Hidro Paute-Molino" | `-2.2, -79.9` | **`-2.576, -78.510`** (Sevilla de Oro, Azuay). El pin declarado **cae en el centro de Guayaquil** (~155 km al oeste) | GEM (la fuente que el propio tablero cita) |
| Subsidio a combustibles (% PIB) | ~3%, cita "MEM 2024", Colombia/Perú = 0% | ~2,5% PIB *solo combustibles*; cita y contexto erróneos | Min. Finanzas, Proforma PGE 2024 |

**Matiz crítico (la verificación adversarial refutó parcialmente al primer auditor):**
el "~3%" del subsidio resultó una **aproximación razonable** (real ~2,5% solo combustibles;
el 6,41% que se barajó al inicio era el *total* de subsidios estatales, no solo
combustibles). El error real es de **contexto**: cita mal atribuida ("MEM 2024" → debería
ser "Min. Finanzas / Proforma PGE 2024"), dato sin fechar, y el "0%" de Colombia/Perú es
falso (ambos tienen mecanismos de estabilización). La política además ya cambió: gasolina
liberada desde jun-2024, diésel desde sep-2025.

### 2.2 INCORRECTO / DESACTUALIZADO — gravedad MEDIA

| Afirmación | Declarado | Real |
|---|---|---|
| Cronología OPEP ("1973 → salió 2020") | Membresía continua | **Dos tramos**: 1973-1992 (retiro) → reingreso 2007 → salida definitiva 2020. No fue miembro 1993-2006 |
| Hidro en electricidad (KPI, matriz, comparativa, radar) | 79% | El 79% es de **2021**; 2023 = **69,1%**; 2024 ~70% |
| Apagones pico 2024 (KPI, indicador, vulnerabilidad) | hasta 12 h/día | hasta **14 h/día** (oct-nov 2024) |
| Demanda pico 2024 (serie `capacidad`) | 4,4 GW | **~5,05 GW** (pico abr-2024 = 5.063 MW). El 4,4 es el *promedio*, no el pico |
| Solar/Eólica en generación | 3% | **~0,3%** (error ~10×) |
| Gas natural en energía primaria | 8% | ~3-4,5% (inflado 2-4×) |
| Petróleo en energía primaria | 70% | ~79% |
| Térmica/petróleo en electricidad | 18% | ~25-30% (coherente con haber inflado la hidro) |
| MEM como ministerio vigente | "Ministerio de Energía y Minas" | Fusionado ago-2025 (Decreto 94) en **"Ministerio de Ambiente y Energía"** |

### 2.3 APROXIMADO / ESTILIZADO — gravedad BAJA (NO penalizable como error)

Producción de crudo **0,46 Mb/d = correcto y vigente**. Utilización Esmeraldas ~60%
(optimista; real reciente ~45%), capacidad hidro y mix primario ligeramente altos pero del
mismo orden. El **Sankey** ("Datos estilizados") y los **combustibles militares** ("orden
de magnitud") están **correctamente rotulados como ilustrativos** — se valora positivamente
esa honestidad.

**Hechos correctos confirmados:** SOTE 1972; crudo amazónico; Coca Codo Sinclair 1,5 GW
(2016); estiaje 2023-2024; déficit de refinación e importación de derivados; erosión del río
Coca; consulta Yasuní-ITT 2023 (SÍ 58,9%); contrabando a Colombia/Perú; preventas a China;
conflicto armado interno (Decreto 111, ene-2024); importación eléctrica de Colombia;
SOTE/OCP/Balao; coordenadas de Coca Codo y Esmeraldas; vigencia de Petroecuador, ARCONEL,
CENACE, CELEC.

---

## 3. Inconsistencias internas y de datos

### 3.1 Cruce con vecinos (`col.json` / `per.json`) — la más grave

- **Radar de Colombia (ALTA, sistémica):** `ecu.json` atribuye a Colombia
  `[6.5, 6, 6, 6.5, 6.5, 6, 5.5]`, pero `col.json` declara `[6.5, 4.2, 5.0, 5.9, 6.0, 4.8, 5.0]`
  — **contradicción en 5 de 7 ejes** (implica APERC ~6,2 vs el 5,4 real de Colombia). El error
  se repite en `per.json`.
- **Gas de Colombia (MEDIA):** `ecu` usa 16% vs 14% que declara `col.json`.
- **Térmica de Colombia (BAJA):** `ecu` = 2% vs `col` = 3%.
- *Fortaleza compensatoria:* el cruce con **Perú es correcto 1:1**, y Colombia hidro 70% y
  carbón 8% sí coinciden con `col.json`.

### 3.2 Esquema y coordenadas

- **Balao mal clasificado (BAJA):** `tipo='gnl'` cuando es terminal de exportación de
  **crudo**.
- **Solapamiento de pines (BAJA):** Esmeraldas (0.98, -79.65) y Balao (0.95, -79.62) a ~4,5 km.

### 3.3 Cita-vs-dato y numérico

- **Capacidad vs apagones (BAJA):** la capacidad declarada (6,8 GW) supera la demanda pico
  (4,4 GW) en todos los años, lo que *aparenta* contradecir la tesis de apagones. Al corregir
  la demanda pico a ~5,05 GW el margen se estrecha y la tesis se sostiene mejor.
- **Subsidio Colombia/Perú = 0% (MEDIA)** y **refinación vecinos 70/70 (BAJA):** datos
  comparativos duros sin respaldo.
- **Radar "normalización min-max §01" (BAJA):** los 4 primeros ejes son los scores crudos del
  scorecard, no normalizados; la cita promete un procesamiento que los datos no reflejan.

---

## 4. Rigor académico (frente a `aus.json`)

| Dimensión | Puntaje | Problema de fondo |
|---|---|---|
| Calidad/autoridad de fuentes | **4/10** | Solo 5 referencias, varias genéricas o desactualizadas ("OPEC 2020" ya no cubre a Ecuador). Siglas del cuerpo (GEM, Ember, BCE, IISS) no figuran en `referencias`. (`aus.json`: 14 refs completas.) |
| Trazabilidad cita→dato | **3/10** | Citas genéricas sin página/tabla. El dato crítico —12 h/día— nunca se ancla a un parte de CENACE. |
| Justificación scoring APERC | **3/10** | "Scores propios sobre indicadores normalizados" / "min-max §01", pero sin trazabilidad: 4 indicadores, mayoría cualitativos; Sovereignty/Robustness/Resilience sin un solo indicador detrás. No reproducible. |
| Marco teórico (APERC + Cherp & Jewell) | **5/10** | APERC bien aplicado, pero **Cherp & Jewell (2014) está ausente del texto** pese a que el radar usa sus tres perspectivas. |
| Honestidad metodológica | **7/10** | La más fuerte: rotula lo estilizado, usa "~"/"—". Riesgo: los KPIs del resumen se muestran como datos duros sin ese matiz. |
| Profundidad analítica | **4/10** | Telegráfico vs `aus.json`: 4 indicadores (vs 7), 5 hitos (vs 11), 4 escenarios (vs 5). |

**Diagnóstico de fondo:** el tablero confunde **completar campos** con **fundamentar datos**.
Tres patologías: scoring APERC sin metodología reproducible; citas genéricas sin trazabilidad;
datos "estilizados" mezclados con datos duros sin jerarquía clara en el resumen.

---

## 5. Fortalezas

1. Estructura completa y ordenada (las 14 claves del contrato, en orden, secciones núcleo
   diligenciadas).
2. Coherencia numérica perfecta (todas las matrices suman 100; `aperc_global=5` = promedio
   exacto de las 4 A's).
3. KPIs consistentes en todo el archivo (aunque, irónicamente, propaga de forma consistente
   los valores erróneos).
4. Narrativa analítica defendible y coherente con el radar (robustness el eje más bajo).
5. Hechos cualitativos bien documentados y confirmados en verificación independiente.
6. Cruce con Perú correcto (1:1).
7. Honestidad explícita sobre la incertidumbre (rotula lo estilizado/estimado).

---

## 6. Recomendaciones priorizadas

### P1 — CRÍTICO (corregir para no reprobar el dato) — *APLICADO, ver §7*
1. **Reservas de crudo:** `4 Bbbl` → **~8,3 Bbbl** (KPI + `geopolitica.minerales`).
2. **Coordenada Paute-Molino:** `-2.2, -79.9` → **`-2.576, -78.510`**.
3. **Apagones pico 2024:** `12 h/día` → **14 h/día** (KPI, indicador, vulnerabilidad).
4. **Demanda pico 2024:** `4,4` → **~5,05 GW** (serie `capacidad`).
5. **Hidro en electricidad:** `79%` (es de 2021) → **~70%** y recalcular la matriz eléctrica
   (térmica ~30%, solar/eólica ~0,3%).

### P2 — IMPORTANTE (eleva rigor y precisión) — *APLICADO, ver §7*
6. Cronología OPEP: reescribir el hito con los dos tramos (1973-1992, 2007-2020).
7. Matriz primaria: petróleo 70→~79%; gas 8→~3-4%; hidro 16→~14%; biomasa 6→~4%.
8. **Resolver el conflicto con `col.json`/`per.json`:** alinear el radar de Colombia a
   `[6.5, 4.2, 5.0, 5.9, 6.0, 4.8, 5.0]` y el gas a 14%.
9. Subsidio: fechar, corregir cita ("Min. Finanzas, Proforma PGE 2024"), reemplazar el "0%"
   de vecinos, reflejar que la política avanzó a eliminación.
10. Clasificación Balao: `tipo='gnl'` → terminal de exportación de crudo; desplazar para evitar
    solape con Esmeraldas.
11. Actualizar institución rectora: "MEM" → "Ministerio de Ambiente y Energía" (ago-2025),
    conservando "MEM 2024" solo como referencia histórica.

### P3 — RIGOR ACADÉMICO (de aprobado a sobresaliente) — *APLICADO, ver §7.3*
12. Trazabilidad de citas: convertir cada `*_cita` genérica en cita con localizador
    (informe/tabla/figura). Anclar el dato de apagones a un parte de CENACE.
13. Expandir `referencias.items` a ≥10 entradas con cita completa e incorporar todas las siglas
    usadas (GEM, Ember, EIA, BCE) y **añadir Cherp & Jewell (2014)**, *Energy Policy* 75: 415-421.
14. Documentar el scoring APERC: tabular los mismos indicadores cuantitativos para Ecuador,
    Colombia y Perú (HHI/Shannon, días de reserva, import-dependence, intensidad de carbono),
    declarar la fórmula min-max y derivar los 7 ejes del radar.
15. Completar el marco teórico: introducir el párrafo de Cherp & Jewell que fundamente
    Sovereignty/Robustness/Resilience (hoy huérfanos) y la definición textual de APERC (2007).
16. Profundidad: ≥6 indicadores con métrica reproducible, ampliar hitos y escenarios, reforzar
    con cifras duras (importación 70,8 Mbbl / USD 6.598 M en 2024; importación eléctrica USD 334 M).

---

## 7. Correcciones P1 y P2 aplicadas a `data/ecu.json` + `generar_paises.js` (junio 2026)

> **Doble escritura.** El sitio renderiza el tablero en vivo desde `data/ecu.json`
> (`pais.html` + `render.js`); no hay HTML estático por país. Pero `generar_paises.js`
> es el **generador fuente de verdad** (regenera `data/<iso>.json` + `manifest.json`).
> Por eso cada corrección se aplicó **en los dos archivos** y luego se ejecutó
> `node generar_paises.js`, que validó `ecu.json` (OK · primaria≈100 · 5 pines) sin
> alterar ningún otro país ni el manifest.

### 7.1 P1 — críticas

| # | Campo(s) | Antes | Después |
|---|---|---|---|
| 1 | `resumen.kpis` (reservas) + `geopolitica.minerales` | 4 Bbbl | **8.3 Bbbl** (con `decimal:true` en el KPI) |
| 2 | `infraestructura.pines[Paute-Molino]` | lat -2.2, lng -79.9 | **lat -2.576, lng -78.510** |
| 3 | `resumen.kpis` + `aperc.indicadores` + `infraestructura.vulnerabilidades` (apagones) | 12 h/día | **14 h/día** |
| 4 | `infraestructura.capacidad` (demanda pico 2024) | 4.4 GW | **5.05 GW** |
| 5 | `resumen.kpis`, `aperc.indicadores`, `matriz.electrica` (+cita), `matriz.comparativa` (col. Ecuador), `evolucion.series` (2024), `geopolitica.minerales` (hidro) | Hidro 79 / Térmica 18 / Solar 3 | **Hidro 70 / Térmica 29.7 / Solar 0.3** (suma 100) |

**Nota sobre la corrección #5 en `evolucion`:** se ajustó solo el punto 2024 de la serie
(Hidro 79→70, Térmica 18→29.7, Solar 3→0.3) para que coincida con la matriz de snapshot y
sume 100; los puntos históricos y proyectados restantes no se tocaron (quedan fuera del
alcance P1 y cambiarlos rompería las sumas por columna).

**No se modificó `manifest.json`:** el `aperc_global` de Ecuador (5.0) depende de los 4 scores
del scorecard, que son juicios cualitativos no afectados por las correcciones factuales P1.

### 7.2 P2 — importantes

| # | Campo(s) | Antes | Después |
|---|---|---|---|
| 6 | `evolucion.hitos` (1973) | "Ingreso a la OPEP (salió en 2020)" | **"…retiro 1992, reingreso 2007, salida definitiva 2020"** |
| 7 | `matriz.primaria` (+cita) | Petróleo 70 / Hidro 16 / Gas 8 / Biomasa 6 | **Petróleo 79 / Hidro 14 / Gas 3 / Biomasa 4** (suma 100; cita → IEA/BEN 2023) |
| 8 | `geopolitica.radar` (serie Colombia) | `[6.5,6,6,6.5,6.5,6,5.5]` | **`[6.5,4.2,5.0,5.9,6.0,4.8,5.0]`** (= autodeclaración de `col.json`) |
| 8 | `matriz.comparativa` (col. Colombia) | Térmica 2 / Gas 16 | **Térmica 4 / Gas 14** (alineado con `col.json`; suma 100) |
| 8 | `matriz.comparativa_nota` | "Mayor hidrodependencia de la región" | reformulada (Ecuador = Colombia en hidro; énfasis en *respaldo firme*) |
| 9 | `aperc.indicadores` (subsidio) + `indicadores_nota` | "~3", vecinos "0", cita "MEM" | **"~2.5–3" (solo comb., 2024)**, vecinos "menor", cita Min. Finanzas PGE 2024, política → eliminación |
| 9 | `politicas.planes` (subsidios) | "Focalización · reducir costo fiscal" | **"Focalización/eliminación · gasolinas 2024, diésel 2025"** |
| 11 | `politicas.instituciones` (MEM) | "ministerio de energía y minas" | **"…(desde ago-2025, Ministerio de Ambiente y Energía)"** |

**P2 #10 (Balao) — evaluado y NO modificado, con justificación técnica:** el informe sugería
cambiar `tipo='gnl'`, pero el mapa `TIPO_PIN_COLOR` del esquema solo produce el color azul de la
leyenda *"Terminal de exportación"* con el tipo `gnl`. Es decir, **la plataforma reutiliza `gnl`
como "terminal de exportación"**; cambiarlo rompería la leyenda. Las coordenadas de Balao
(0.95, -79.62) son además geográficamente correctas (el terminal adjunta el puerto de Esmeraldas),
así que el "solape" refleja la realidad. Se deja como está.

**Verificación de consistencia tras P2:** el radar y el gas de Colombia en `ecu.json` ahora
coinciden 1:1 con la autodeclaración de `col.json`.

### 7.3 P3 — rigor académico (APLICADO)

| # | Campo(s) | Cambio |
|---|---|---|
| 13 | `referencias.items` | 5 → **12 referencias** verificadas con formato completo (autor/org, año, título, editor), incluida **Cherp & Jewell (2014), *Energy Policy* 75: 415–421** y APERC (2007) completo; incorpora las siglas usadas en el cuerpo (EIA, IEA, Ember, GEM, BCE, IISS, ARCONEL, CENACE, OPEC) |
| 15 | `aperc.definicion_html` + `definicion_cita` | Enuncia la **definición textual de APERC (2007)** y fundamenta los 3 ejes huérfanos del radar (**Sovereignty/Robustness/Resilience**) según **Cherp & Jewell (2014)**, con cita |
| 14 | `aperc.scorecard_cita` + `geopolitica.radar_cita` | Reescritura **honesta**: los scores son juicio experto 0–10 anclado en los indicadores §01 (no un min-max mecánico); los ejes 1–4 del radar = scorecard, los 3 extra siguen a Cherp & Jewell |
| 12 | 6 citas trazables (`matriz.primaria_cita`, `matriz.electrica_cita`, `evolucion.historico_cita`, `infraestructura.mapa_cita`, `infraestructura.capacidad_cita`, `geopolitica.minerales_cita`) | Citas genéricas → **citas con localizador** (informe/capítulo/tabla y fuente correcta) |

> Se ejecutó el generador tras los cambios: `OK ecu.json · aperc=5 · primaria≈100 · 5 pines`.
> Verificado: 12 referencias con Cherp & Jewell presente; `definicion_cita` con Cherp.

### 7.4 Propagación cruzada (consistencia con `per.json`)

Al corregir el mix de Perú en su auditoría (hidro 55→52, solar 5→8; ver `AUDITORIA_PERU.md`), se
actualizó también la columna de **Perú en la comparativa de Ecuador** (hidro 55→52, solar 5→8) y el
indicador c-Perú (55→52), para que `ecu.json` siga coincidiendo 1:1 con `per.json` (verificado).

### 7.5 Pendiente

- **Error sistémico — RESUELTO:** la "Colombia inflada" del radar se corrigió tanto en `ecu.json`
  (P2) como en `per.json` (auditoría de Perú); ambos coinciden ya con `col.json`.
- **Solo queda P3 de Perú** (añadir Cherp & Jewell + 3 ejes del radar, scoring reproducible,
  bibliografía ≥10 a `per.json`), no aplicado en esta ronda.
