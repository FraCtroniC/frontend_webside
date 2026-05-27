## Instrucciones para la website pública

El objetivo es crear una website separada del portal interno, con una estructura parecida a la de este frontend, pero enfocada solo en presentación pública, captación de usuarios y acceso al sistema. No debe mezclar lógica del portal administrativo ni tocar sus rutas privadas.

La website debe seguir una arquitectura modular similar a la de este proyecto: components, pages, services, context, hooks, assets, layout y un punto de entrada limpio con Vite y React. La diferencia es funcional: aquí la app será pública, informativa y de entrada al sistema; allá queda el portal interno autenticado.

La base visual debe ser consistente con el proyecto actual, pero adaptada a una experiencia pública más institucional. Debe sentirse como la misma familia de producto, no como una app distinta. Usa el mismo lenguaje visual, colores institucionales, tipografía cuidada y componentes reutilizables, pero con una landing más abierta y menos enfocada en CRUD o navegación interna.

## Estructura recomendada para la nueva carpeta

Crea un frontend independiente con algo como esto:

- App.jsx
- main.jsx
- index.css
- assets
- components
- layout
- src/components/ui/
- src/components/sections/
- src/pages/
- src/pages/Home.jsx
- src/pages/About.jsx
- src/pages/Services.jsx
- src/pages/Contact.jsx
- src/pages/Admissions.jsx o la página equivalente
- src/pages/LoginRedirect.jsx o un botón/ruta clara hacia el portal
- services
- api.js
- context
- hooks

Si más adelante necesitas formularios públicos, usa la misma lógica por capas que en este proyecto: la UI por un lado, las peticiones en services/, el estado global en context/ y la lógica reusable en hooks/.

## Qué debe tener la website pública

La web debería incluir, como mínimo:

- Home o landing principal.
- Sección institucional o “Sobre nosotros”.
- Información del sistema o de la universidad.
- Noticias, avisos o bloques informativos si aplican.
- Sección de contacto o soporte.
- Botón claro para entrar al portal interno.
- Opcional: acceso rápido a recuperar contraseña o al login.

La homepage no debe mostrar de entrada el login. Debe mostrar identidad, propósito, acceso al portal y contenido institucional. El login queda como acción secundaria, no como pantalla principal.

## Reglas de desarrollo para el otro agente

El otro agente debe:

- Mantener la estructura modular y limpia.
- Usar React con Vite, sin mezclar la lógica de página con la lógica de API.
- Evitar hardcodear datos si pueden venir del backend.
- Preparar el proyecto para crecer sin reescribir todo.
- No tocar el portal interno de este repo.
- Construir la web como un proyecto independiente, pero con el mismo estándar visual y técnico.

Si necesita crear componentes reutilizables, que priorice algo como:

- Hero
- Navbar pública
- Footer
- Cards informativas
- Secciones de noticias o avisos
- CTA para entrar al sistema

## Cómo conectar la website con este proyecto después

La forma correcta de conectar ambos mundos no es mezclando código entre repos, sino compartiendo contrato y backend.

Lo ideal es esto:

- Ambos proyectos consumen el mismo backend.
- Ambos usan la misma base de API y el mismo contrato de autenticación.
- La website pública solo redirige al portal interno cuando el usuario quiere iniciar sesión.
- El portal interno sigue manejando autenticación, dashboards y módulos privados.

En tu caso actual, el portal interno ya está orientado a auth y rutas protegidas en App.jsx, con protección en AppLayout.jsx, y el login vive en Login.jsx. Eso conviene dejarlo como sistema cerrado. La web pública debe enlazar a ese acceso, no reemplazarlo.

## Para conectar ambos después, define estas reglas:

- Misma API base o una URL de backend centralizada por entorno.
- Mismos endpoints de autenticación.
- Mismo criterio de roles y perfil si la web va a leer sesión.
- Enlaces claros desde la web hacia el portal.
- Si más adelante quieres SSO real, usa una estrategia de autenticación común en backend, no comunicación entre frontends.