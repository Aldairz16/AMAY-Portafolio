# AMAY — Tu asistente de salud

> **"Tecnología con calidez humana"**
> Demo web de portafolio de **AMAY**, una app móvil de salud para adultos mayores y sus cuidadores. Diseñada originalmente en Figma y convertida a web app con React + Vite + Tailwind.

- **En escritorio** la app se muestra dentro de un mockup de iPhone junto a la descripción del proyecto.
- **En un teléfono** la app se abre directamente a pantalla completa.

## Funciones de la demo

- **Adulto mayor**: recordatorio de medicinas con confirmación por voz, botón SOS con alerta al cuidador, registro de signos vitales y estado de ánimo, citas médicas y código de vinculación.
- **Cuidador**: panel de supervisión (con botón de datos de ejemplo), inventario de medicamentos, signos vitales, ubicación GPS con rutas del día, agenda médica, notificaciones y ajustes.
- Narrador por voz (Web Speech API) pensado para accesibilidad de adultos mayores.
- Todos los datos son ficticios y se guardan en `localStorage`.

## Desarrollo local

```bash
npm install
npm run dev
```

## Desplegar en Vercel

1. Sube esta carpeta a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com) → **Add New Project** → importa el repo.
3. Vercel detecta Vite automáticamente (build: `npm run build`, output: `dist`). No necesitas configurar nada más: `vercel.json` ya incluye las rewrites para las rutas de la SPA.

O directamente con la CLI:

```bash
npx vercel --prod
```
