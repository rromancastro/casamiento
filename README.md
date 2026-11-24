# Invitación

Base Next.js con App Router, React y Sass, siguiendo la organización de `D:\Proyectos\nodo`.

## Estado

La reproducción del diseño está pendiente de acceso al frame de Figma. El conector devolvió el límite de consultas del plan Starter y el control de la PC no pudo conectar con su servicio nativo. La página queda vacía deliberadamente hasta disponer de la referencia; no representa el diseño final.

Referencia: https://www.figma.com/design/f43aBRL1FNXU3Uh81mclui/Sin-t%C3%ADtulo?node-id=6-2

Para continuar se necesita acceso al diseño o su exportación con imágenes/SVG, tipografías y medidas.

## Desarrollo

```sh
npm install
npm run dev
```

En PowerShell con scripts deshabilitados, usar `npm.cmd`.

```sh
npm run lint
npm run build
npm run start
```

## Estructura

- `app/page.js`: composición de la página.
- `app/home/NombreSeccion/NombreSeccion.jsx`: secciones y su Sass `nombreSeccion.scss`.
- `app/home/index.js`: exportaciones de secciones.
- `app/components/NombreComponente/`: componentes reutilizables con su propio Sass.
- `app/components/Reveal/`: aparición sutil al entrar en pantalla, con soporte para movimiento reducido.
- `public/home/` y `public/fonts/`: recursos locales.
- `scripts/`: generadores copiados del proyecto de referencia.

```sh
npm run section -- HomeHeader home
npm run component -- NombreComponente
```

Las reglas base parten de móvil. Las adaptaciones a tablet y escritorio se incorporarán con `min-width` en cada sección una vez obtenidas las medidas del diseño.
