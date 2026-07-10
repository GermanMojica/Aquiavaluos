# Categorías RAA en la sección "Sectores que Atendemos"

## Contexto

La sección `Sectores` (`src/components/sections/Sectors.tsx`) actualmente muestra 4
segmentos de audiencia (Propietarios, Constructoras, Empresas Privadas, Entidades
Públicas) en un carrusel full-bleed con autoplay.

El usuario proporcionó `Categorias RAA.docx` (Descargas), que contiene las 13
categorías técnicas oficiales del Registro Abierto de Avaluadores (RAA) usadas para
clasificar especialidades de avalúo en Colombia. Se reemplaza el contenido actual por
estas categorías. La categoría N°11 del documento duplicaba literalmente el texto de
la N°9 ("Activos operacionales y establecimientos de comercio") — se fusionan en una
sola, quedando 12 categorías finales.

El encabezado de la sección ("Sectores que Atendemos") se mantiene sin cambios; solo
cambia el contenido debajo.

## Contenido final (12 categorías)

| # | Nombre | Alcance |
|---|---|---|
| 01 | Inmuebles Urbanos | Casas, apartamentos, edificios, oficinas, locales comerciales, terrenos y bodegas situados total o parcialmente en áreas urbanas, lotes no clasificados en la estructura ecológica principal, lotes en suelo de expansión con plan parcial adoptado. |
| 02 | Inmuebles Rurales | Terrenos rurales con o sin construcciones, como viviendas, edificios, establos, galpones, cercas, sistemas de riego, drenaje, vías, adecuación de suelos, pozos, cultivos, plantaciones, lotes en suelo de expansión sin plan parcial adoptado, lotes para el aprovechamiento agropecuario y demás infraestructura de explotación situados totalmente en áreas rurales. |
| 03 | Recursos Naturales y Suelos de Protección | Bienes ambientales, minas, yacimientos y explotaciones minerales. Lotes incluidos en la estructura ecológica principal, lotes definidos o contemplados en el Código de Recursos Naturales Renovables y daños ambientales. |
| 04 | Obras de Infraestructura | Estructuras especiales para proceso, puentes, túneles, acueductos y conducciones, presas, aeropuertos, muelles y demás construcciones civiles de infraestructura similar. |
| 05 | Edificaciones de Conservación Arqueológica y Monumentos Históricos | Edificaciones de conservación arquitectónica y monumentos históricos. |
| 06 | Inmuebles Especiales | Incluye centros comerciales, hoteles, colegios, hospitales, clínicas y avance de obras. Incluye todos los inmuebles que no se clasifiquen dentro de los numerales anteriores. |
| 07 | Maquinaria Fija, Equipos y Maquinaria Móvil | Equipos eléctricos y mecánicos de uso en la industria, motores, subestaciones de planta, tableros eléctricos, equipos de generación, subestaciones de transmisión y distribución, equipos e infraestructura de transmisión y distribución, maquinaria de construcción, movimiento de tierra, y maquinaria para producción y proceso. Equipos de cómputo: microcomputadores, impresoras, monitores, módems y otros accesorios de estos equipos, redes, mainframes, periféricos especiales y otros equipos accesorios de estos. Equipos de telefonía, electromedicina y radiocomunicación. Transporte automotor: vehículos de transporte terrestre como automóviles, camperos, camiones, buses, tractores, camiones y remolques, motocicletas, motociclos, mototriciclos, cuatrimotos, bicicletas y similares. |
| 08 | Maquinaria y Equipos Especiales | Naves, aeronaves, trenes, locomotoras, vagones, teleféricos y cualquier medio de transporte diferente del automotor descrito en la clase anterior. |
| 09 | Activos Operacionales y Establecimientos de Comercio | Revalorización de activos, inventarios, materia prima, producto en proceso y producto terminado. Establecimientos de comercio. |
| 10 | Semovientes y Animales | Semovientes, animales y muebles no clasificados en otra especialidad. |
| 11 | Intangibles | Marcas, patentes, secretos empresariales, derechos de autor, nombres comerciales, derechos deportivos, espectro radioeléctrico, fondo de comercio, prima comercial y otros similares. |
| 12 | Intangibles Especiales | Daño emergente, lucro cesante, daño moral, servidumbres, derechos herenciales y litigiosos y demás derechos de indemnización o cálculos compensatorios y cualquier otro derecho no contemplado en las clases anteriores. |

## Data model

`src/components/sections/Sectors.tsx` reemplaza el array `sectors` por `categories`:

```ts
type Category = {
  id: number          // 1-12, mostrado como "01".."12"
  name: string
  icon: LucideIcon
  image: string        // /images/sectors/xx-slug.jpg
  alcance: string       // texto completo, tal cual el documento
  teaser: string        // 1-2 líneas cortas para la tarjeta (derivadas del alcance)
}
```

Iconos (lucide-react): `Building2, Trees, Mountain, Construction, Landmark, Building,
Cog, Plane, Store, PawPrint, Lightbulb, Scale`.

## Layout

- Se elimina el carrusel con autoplay, dots y flechas prev/next.
- Header de la sección sin cambios ("[ ALCANCE DEL SERVICIO ]" / "Sectores que
  Atendemos").
- Grid responsive debajo del header: 1 columna en móvil, 2 en tablet (`sm:`), 3 en
  desktop (`lg:`) → 4 filas de 3 en desktop.
- Tarjeta: imagen de fondo (`next/image`, `object-cover`) con overlay degradado para
  legibilidad, número `[ 01 ]` y patrón de acentos de esquina (mismo estilo que el
  panel de imagen actual), ícono + nombre superpuestos, teaser corto visible en la
  tarjeta. Hover: lift + scale sutil (Framer Motion), igual que el resto del sitio.
- Click en una tarjeta abre un modal (overlay `brand-dark`, blur de fondo) con: imagen
  grande, número, ícono, nombre completo, texto de alcance completo, y flechas
  prev/next para recorrer las 12 categorías sin cerrar el modal. Cierre con botón X,
  click fuera, o `Escape`.
- Se elimina la fila de "stats" por categoría (no aplica a categorías técnicas); no se
  agrega reemplazo.
- Animación de entrada del grid vía GSAP ScrollTrigger (patrón ya usado en el
  componente: import dinámico de gsap + ScrollTrigger).

## Imágenes

- Se buscan fotos de stock de licencia libre (Unsplash/Pexels) para las 12
  categorías, una por categoría, priorizando estilo fotográfico consistente con el
  resto del sitio (tono cálido/técnico, escenas reales colombianas cuando aplique).
- Categorías abstractas (11 Intangibles, 12 Intangibles Especiales) usan imágenes
  conceptuales (ej. detalle arquitectónico, documentos/balanza) en vez de literales.
- Se descargan a `public/images/sectors/` con nombres descriptivos
  (`01-inmuebles-urbanos.jpg`, etc.), optimizadas en tamaño/dimensión para las
  tarjetas y el modal.
- Las 6 imágenes actuales (`banking.png`, `construction.png`, `corporate.png`,
  `government.png`, `investors.png`, `residential.png`) se eliminan del árbol de
  `Sectors.tsx`; `construction.png` y/o `residential.png` se reutilizan si encajan
  visualmente con alguna categoría para evitar descargas innecesarias. Ninguna otra
  parte del código las referencia (verificado por grep).

## Fuera de alcance

- No se toca `Navbar.tsx` (el link `#sectores` sigue apuntando a la misma sección).
- No se agregan nuevas rutas, ni cambios a otras secciones de `page.tsx`.
- No hay generación de imágenes por IA (no hay herramienta disponible en este
  entorno); todas las imágenes son fotografías de stock de licencia libre.
