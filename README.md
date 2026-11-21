# Compañeros

App en React, Vite y Redux Toolkit para agregar compañeros por nombre y grupo. Ambos campos son obligatorios. La lista se guarda en el navegador.

## Desarrollo

Usa Node.js 22.12 o una versión posterior compatible con Vite.

```sh
npm ci
npm run dev
```

## Instalación y uso sin conexión

```sh
npm run build
npm run preview
```

Abre la URL que imprime Vite. Carga la app una vez con conexión para que el service worker guarde los archivos. Puedes instalarla desde el menú de un navegador compatible y seguir consultando la lista o agregando compañeros sin conexión. El service worker se activa en la compilación de producción. Para servir la app fuera de localhost, usa HTTPS.
