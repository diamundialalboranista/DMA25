# DMA'25 · Mapa de maletas — v3 (completa)

Incluye:
- Títulos con **Big Shoulders Display** (Google Fonts).
- Cuerpo con **Helvetica Neue** (con fallbacks).
- Vídeo vertical más **estrecho** (mejor en desktop).
- **Miniatura por participante** con campo `thumb` en JSON.
- **Filtro por país** corregido (normalización) y **búsqueda**.
- **Paginación** con botón “Ver más” (12 por página).
- Botones para descargar **pasaporte** (PDF + stories).
- Dinámica **cerrada** (sin formulario).

## Publicación
1. Sube toda la carpeta al repo (branch `main`, root).
2. Activa GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root.

## Personaliza
- Reemplaza `assets/sample.mp4`, `poster.jpg`, `maleta.png`, `paper-texture.png`, `pasaporte.pdf`, `pasaporte_story.png` por los definitivos.
- Añade tus miniaturas en `assets/thumbs/` y referencia en `data/participaciones.json` como `thumb`.
