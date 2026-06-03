# INFORME DE EVALUACIÓN ACADÉMICA — Tablero de Seguridad Energética: PERÚ (`data/per.json`)

**Cátedra de Seguridad Energética — ESDEG**
**Evaluador senior · Auditoría sobre marco APERC (2007) + Cherp & Jewell (2014)**
**Fecha: junio 2026**

> **Método.** 6 verificadores factuales con búsqueda web comprobaron 56 afirmaciones contra
> fuentes reales (IEA, EIA, Ember, COES/MINEM/Osinergmin, USGS, BCRP, prensa); 6 dudosas
> pasaron por verificación adversarial independiente. En paralelo se auditó la consistencia
> interna (cruce con `col.json` y `chl.json`, sumas, esquema, coordenadas) y el rigor frente
> al estándar canónico `aus.json`. **Auditoría asistida por IA; verificada contra fuentes
> externas, pero el docente debe validar antes de calificar en firme.**

---

## 1. Veredicto general y calificación

**Calificación: 3.1 / 5.0 — Aprobado con reservas.** Requiere corrección obligatoria de errores
factuales y de consistencia inter-país antes de su publicación o uso doctrinal.

El tablero de Perú es **sólido en su narrativa estructural** (centralidad de Camisea, punto único
de falla del ducto de TGP, déficit de refinación, crisis de Petroperú), y su honestidad
metodológica (rotulado de "datos estilizados", uso de "~" y "—") es ejemplar. Sin embargo,
arrastra **cuatro defectos graves**:

1. **Error factual de alta gravedad confirmado adversarialmente:** Perú ya **no es el #2 productor
   mundial de cobre** (es #3 desde 2023, superado por la RD del Congo según USGS MCS 2025).
2. **Cifra geológicamente inverosímil:** atribuye a Colombia **1.0 Mt/año de cobre**, ~150–240× su
   producción real (~4.200–6.900 t).
3. **Mix eléctrico sesgado:** Hidro **55%** sobreestima 4–11 puntos; con COES/MINEM el gas (46,8%)
   ya supera a la hidro (43,9%) en 2024.
4. **Inconsistencia cruzada sistémica ("Colombia inflada"):** el radar y el mix que `per.json`
   atribuye a Colombia contradicen lo que `col.json` declara (6 de 7 ejes), y la columna de
   Colombia ni siquiera sumaba 100.

---

## 2. Errores factuales

### 2.1 Confirmados — gravedad ALTA y MEDIA (corrección obligatoria)

| Afirmación | Declarado | Real | Gravedad | Fuente |
|---|---|---|---|---|
| Perú #2 productor de cobre (KPI + minerales) | #2 mundial | **#3 mundial.** Chile 5,3 Mt (#1); RDC ~3,3 Mt (#2); Perú ~2,6–2,74 Mt (#3). Sorpasso desde 2023 | **ALTA** (no refutable) | USGS MCS 2025 (Copper), pág. 65 |
| Colombia produce ~1.0 Mt de cobre/año | 1.0 Mt | **~0,004–0,007 Mt** (mina El Roble). Error de ~150–240× | **ALTA** | MINING.COM; Atico Mining FY2024; USGS |
| Mix eléctrico: Hidro 55% | 55% | **~44%** (COES) a **~50–51%** (Ember). Ninguna fuente alcanza 55%; el JSON cita "Ember 2024", que reporta ~50% | **MEDIA** | COES/MINEM 2024 (gas 46,8% / hidro 43,9%); Ember 2025 |
| Perú #2 mundial en plata | #2 plata | **#3** (México / China / Perú). Correcto solo para zinc | **MEDIA** | USGS MCS 2025 (Silver) |
| Exportación de cobre a China | 60% | **>70%** del valor (2023); minería tradicional ~90,9% (2024) | **MEDIA** | Statista; BCRP |

**Nota sobre el cobre #2:** el hallazgo más grave — repetido y confirmado contra fuente primaria
USGS. El matiz legítimo es que Perú sí conserva el **#2 mundial en reservas**; pero el tablero
etiqueta "Productor/producción", por lo que es incorrecto tal como está.

### 2.2 Aproximaciones de baja gravedad (no bloqueantes)

Gas 40% (real 40–47%, defendible); energía primaria petróleo ~44 / gas ~30–31 / carbón ~3;
cobre propio 2,6 Mt (real 2,74, USGS redondea); capacidad hidro ~5,2–5,6 GW; comparadores Chile
hidro ~22–25 / gas ~15 (sobreestimados); coordenadas desviadas 13–27 km pero en el sitio correcto.

### 2.3 Verificadas como CORRECTAS

Camisea 2004; GNL Melchorita 2010 y Perú exportador activo; debate GSP 2024; Perú #2 en zinc;
Chile 5,3 Mt de cobre; Mantaro mayor complejo hidro (1.008 MW); Talara modernizada por Petroperú;
amenaza VRAEM y punto único de falla del ducto (TGP ~96% del gas); conflictividad corredor minero
2022–2023; trayectoria histórica hidro→gas; coordenadas de Talara/Cerro Verde/Las Bambas casi
exactas; instituciones (MINEM, Osinergmin, COES, Petroperú) y PEN 2010–2040.

**Matiz no reflejado:** presentar Talara/Petroperú como *fortaleza* está desfasado — Petroperú
atraviesa crisis financiera severa (deuda ~US$7.899 M; privatización vía ProInversión) y opera
Talara muy por debajo de capacidad, **intensificando** el déficit en vez de reducirlo.

---

## 3. Inconsistencias internas y cruzadas

### 3.1 La "Colombia inflada" (cruce con `col.json`) — ALTA
`per.json` asignaba a Colombia radar `[6.5,6,6,6.5,6.5,6,5.5]` (APERC ~6.2); `col.json` se
autodeclara `[6.5,4.2,5.0,5.9,6.0,4.8,5.0]` (APERC 5.4). **Discrepancia en 6 de 7 ejes.** Misma
patología que tenía Ecuador: un **patrón de relleno** del comparador, no un descuido aislado.

### 3.2 Columnas que no sumaban 100 — MEDIA
Colombia comparativa (70+16+4+8 = **98**); evolución histórica 2000 (**90**), 2010 (**96**),
2020 (**99**) — residual térmico no etiquetado.

### 3.3 Comparador Chile no reconciliaba con `chl.json` — MEDIA
`per.json` daba Chile hidro 30 / gas 20 / carbón 15; `chl.json` declara hidro 23 / gas 18 /
carbón 18 (+ Otros 6).

### 3.4 Consistencias CORRECTAS (fortalezas)
`aperc_global=6.2` exacto; matrices propias suman 100; indicadores = comparativa; esquema de 14
claves completo; 6 pines en territorio peruano; cobre de Chile (5,3) y Solar/Eólica de Perú (5)
coinciden con los archivos vecinos.

---

## 4. Rigor académico

| Dimensión | Puntaje | Problema de fondo |
|---|---|---|
| Calidad de fuentes | **4/10** | 5 referencias; Ember, GEM, COES, BCRP, IISS, MinDef citados en el cuerpo no figuran en bibliografía |
| Trazabilidad cita→dato | **3/10** | `*_cita` genéricas sin tabla/página; ningún KPI titular anclado |
| Justificación scoring APERC | **3/10** | "min-max §01" prometido pero los 4 primeros ejes del radar = scores crudos; Sov/Rob/Res huérfanos |
| Marco teórico (Cherp & Jewell) | **4/10** | El radar usa sus 3 ejes pero la referencia está ausente del texto y la bibliografía |
| Honestidad metodológica | **7/10** | Punto fuerte: rotula lo estilizado y la incertidumbre |
| Profundidad vs `aus.json` | **3/10** | Telegráfico (4 indicadores vs 7, 5 hitos vs 11); agravado por la contradicción cruzada |

**Problema de fondo:** brecha entre lo que el tablero promete (min-max, Cherp & Jewell, triangulación)
y lo que entrega; respalda cifras titulares con fuentes ausentes de la bibliografía.

---

## 5. Fortalezas

Narrativa estructural correcta y fundamentada; honestidad metodológica ejemplar; coherencia
aritmética interna del propio Perú; georreferenciación precisa; cronología histórica robusta;
instituciones y marco normativo correctos.

---

## 6. Recomendaciones priorizadas

**P1 — Bloqueantes:** ① Cobre #2 → **#3** (o aclarar "#2 en reservas"). ② Cobre Colombia 1.0 →
**~0.004 Mt**. ③ Mix hidro 55 → **~52%**, solar 5 → **~8%**, reconocer gas≈hidro (COES). ④ Alinear
radar de Colombia con `col.json`.

**P2 — Importantes:** ⑤ Plata #2 → **#3** (zinc #2). ⑥ Cerrar columnas en 100 (Colombia/Chile/evolución).
⑦ Cobre a China 60 → ~70–75%. ⑧ Matizar Petroperú/Talara (crisis 2025–2026).

**P3 — Rigor:** ⑨ Ajustes finos primaria/capacidad. ⑩ Añadir Cherp & Jewell (2014) y fundamentar
los 3 ejes del radar. ⑪ Hacer reproducible el scoring (o documentar que los ejes 1–4 son directos).
⑫ Bibliografía ≥10 con todas las siglas usadas y localizadores.

---

## 7. Correcciones aplicadas a `data/per.json` + `generar_paises.js` (junio 2026)

> Doble escritura: se editó el generador (fuente de verdad) y se ejecutó `node generar_paises.js`;
> validó `OK per.json · primaria≈100 · 6 pines`, todas las columnas/años suman 100, sin tocar
> otros países. Se aplicaron **P1 completo y la mayor parte de P2**.

| # | Campo(s) | Antes → Después |
|---|---|---|
| P1 ① | KPI + `geopolitica.minerales` (cobre) | #2 → **#3** mundial |
| P1 ② | `aperc.indicadores` cobre, comparador Colombia | 1.0 → **0.004 Mt** |
| P1 ③ | `matriz.electrica` (+cita), KPI, indicador, comparativa Perú, evolución 2024, minerales | Hidro 55 / Solar 5 → **Hidro 52 / Solar 8** (Gas 40); cita → Ember 2025 |
| P1 ④ | `geopolitica.radar` (serie Colombia) | `[6.5,6,6,6.5,6.5,6,5.5]` → **`[6.5,4.2,5.0,5.9,6.0,4.8,5.0]`** (= `col.json`) |
| P2 ⑤ | `geopolitica.minerales` (plata) | "ZINC Y PLATA #2" → **"ZINC (plata #3)"** |
| P2 ⑥ | `matriz.comparativa` (+nota) | Colombia 98 / Chile reconciliado → **todas las columnas = 100** (serie «Gas» agrega térmicos menores; nota lo aclara). Colombia gas 16→14 en el indicador |
| P2 ⑥ | `evolucion.series` | serie "Gas"→**"Gas/Térmico"**, años 2000/2010/2020 ajustados → **todos suman 100** |
| P2 ⑦ | `geopolitica.dependencias` (cobre→China) | 60 → **70%** |
| P3 (parcial) | `geopolitica.minerales_cita` | → "USGS, Mineral Commodity Summaries 2025…" (localizador) |

**Propagación cruzada:** como Ecuador usa a Perú de comparador, se actualizó también
`ecu.json` (comparativa Perú hidro 55→52, solar 5→8; indicador c-Perú 55→52) para mantener la
consistencia inter-archivo (verificado: coinciden).

**Pendiente (no aplicado):** P2 ⑧ (matiz narrativo Talara/Petroperú); P3 ⑨–⑫ (ajustes finos de
primaria/capacidad, añadir Cherp & Jewell + 3 ejes del radar a Perú, scoring reproducible,
bibliografía ≥10). Nota: el P3 de marco teórico y bibliografía **sí se aplicó a Ecuador** (ver
`AUDITORIA_ECUADOR.md §7.3`); replicarlo en Perú queda como siguiente paso.
