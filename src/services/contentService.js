import { apiConfig } from './api'

const fallbackContent = {
  hero: {
    badge: 'UPTNTMS - Complejo Educativo Virtual',
    title: 'Universidad Politecnica Territorial del Norte del Tachira Manuela Saenz',
    description:
      'Les damos una cordial bienvenida a nuestro espacio educativo virtual, una plataforma que promueve el uso de tecnologias de informacion y comunicacion para toda la comunidad universitaria.',
    ctaPrimaryLabel: 'Entrar al portal interno',
    ctaPrimaryHref: '/login',
    ctaSecondaryLabel: 'Conocer la universidad',
    ctaSecondaryHref: '/about',
  },
  highlights: [
    {
      title: 'Programas Nacionales de Formacion (PNF)',
      description:
        'Formacion alineada con las necesidades productivas y sociales del territorio, con oferta trimestral y semestral.',
      href: '/services',
      label: 'Ver programas',
    },
    {
      title: 'Noticias y avisos institucionales',
      description:
        'Publicaciones sobre censo de grado 2026, calendario academico, reglamentos y notas informativas.',
      href: '/admissions',
      label: 'Ver avisos',
    },
    {
      title: 'Comunidad y servicios universitarios',
      description:
        'Espacios academicos, administrativos y de bienestar estudiantil para fortalecer la trayectoria universitaria.',
      href: '/about',
      label: 'Explorar sedes',
    },
  ],
  news: [
    {
      title: 'Censo de grado 2026',
      body: 'Registro abierto para aspirantes. Consulta el formulario oficial publicado por la universidad.',
      href: 'https://docs.google.com/forms/d/e/1FAIpQLSdC2wPJxaeYkwYcqCREGguk876pws-DSQ5Bh682tFMfFBHgzw/viewform',
      linkLabel: 'Ir al registro',
    },
    {
      title: 'Periodico Enfoque Contemporaneo UPTNTMS',
      body: 'Publicacion institucional disponible para descarga en formato PDF.',
      href: 'https://www.uptntmanuelasaenz-lafria.com.ve/descargas-pdf/periodicoXXXIII.pdf',
      linkLabel: 'Descargar periodico',
    },
    {
      title: 'Nota informativa - Agosto 2025',
      body: 'Actualizaciones academicas sobre curso intensivo y transformacion educativa universitaria.',
      href: '/admissions',
      linkLabel: 'Leer nota',
    },
  ],
  contact: {
    email: 'uptntmanuelasaenz.ce@gmail.com',
    usefulLinks: [
      {
        title: 'Historia de la UPTNTMS',
        href: '/about',
      },
      {
        title: 'Mision y vision',
        href: '/about',
      },
    ],
  },
  admissions: {
    intro:
      'Proceso de inscripcion de nuevo ingreso para asignados OPSU y no asignados, segun periodos informados por la universidad.',
    requirements: [
      'Original y copia de la planilla de inscripcion.',
      'Planilla de preregistro o formulario de preinscripcion completo.',
      'Copia legible de la cedula de identidad o pasaporte.',
      'Dos fotografias tipo carnet.',
      'Copia de la cedula de identidad ampliada y centrada.',
      'Original y copia de partida de nacimiento.',
      'Copia del titulo de bachiller o fondo negro del titulo segun el proceso publicado.',
      'Original y copia de notas certificadas.',
      'Original de constancia de buena conducta.',
      'Original de comprobante RUSNIES (OPSU).',
      'Constancia o planilla de asignacion OPSU cuando aplique.',
      'Constancia de estudios, programa analitico o equivalencias para traslado o reingreso.',
      'Original de certificado de salud para PNF aplicables.',
      'Soportes adicionales solicitados por la carrera o por el periodo academico vigente.',
    ],
  },
}

export async function getPublicContent() {
  return {
    ...fallbackContent,
    backendBase: apiConfig.baseURL,
  }
}
