import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 'bbt',
    well: 'B2',
    kind: 'stack',
    year: '2026',
    stack: [
      'Angular 21',
      'FastAPI',
      'SQLAlchemy',
      'MySQL / Aiven',
      'Firebase Auth',
      'Render',
      'Vercel',
    ],
    translations: {
      en: {
        tag: 'Full-stack catalogue with authenticated CRUD.',
        method:
          'REST API in FastAPI and SQLAlchemy, MySQL on Aiven, Angular 21 front with AuthGuard-protected routes.',
        reading:
          'About 55 drinks with categories, prices and allergens. Backend on Render, front on Vercel, soft deletes throughout.',
      },
      es: {
        tag: 'Catálogo full stack con CRUD autenticado.',
        method:
          'API REST en FastAPI y SQLAlchemy, MySQL en Aiven y front en Angular 21 con rutas protegidas por AuthGuard.',
        reading:
          'Unas 55 bebidas con categorías, precios y alérgenos. Backend en Render, front en Vercel, borrado lógico en todo.',
      },
      ca: {
        tag: 'Catàleg full stack amb CRUD autenticat.',
        method:
          'API REST en FastAPI i SQLAlchemy, MySQL a Aiven i front en Angular 21 amb rutes protegides per AuthGuard.',
        reading:
          'Unes 55 begudes amb categories, preus i al·lèrgens. Backend a Render, front a Vercel, esborrat lògic a tot arreu.',
      },
    },
  },
  {
    id: 'chat',
    well: 'D3',
    kind: 'ai',
    year: '2026',
    stack: [
      'Angular 21 signals',
      'WebSockets',
      'FastAPI',
      'Groq',
      'Qdrant Cloud',
      'fastembed',
      'Render',
    ],
    translations: {
      en: {
        tag: 'Real-time messenger with two AI assistants.',
        method:
          'WebSockets over Angular 21 signals, private and group rooms, an assistant called Yuki running on Groq.',
        reading:
          'A second bot answers Spanish grammar questions over a RAG index of about 6,187 chunks in Qdrant Cloud.',
      },
      es: {
        tag: 'Mensajería en tiempo real con dos asistentes de IA.',
        method:
          'WebSockets sobre signals de Angular 21, salas privadas y de grupo y un asistente llamado Yuki sobre Groq.',
        reading:
          'Un segundo bot responde dudas de gramática sobre un índice RAG de unos 6.187 fragmentos en Qdrant Cloud.',
      },
      ca: {
        tag: "Missatgeria en temps real amb dos assistents d'IA.",
        method:
          "WebSockets sobre signals d'Angular 21, sales privades i de grup i un assistent anomenat Yuki sobre Groq.",
        reading:
          "Un segon bot respon dubtes de gramàtica sobre un índex RAG d'uns 6.187 fragments a Qdrant Cloud.",
      },
    },
  },
  {
    id: 'nikkura',
    well: 'B5',
    kind: 'stack',
    year: '2026',
    stack: ['Angular 21', 'FastAPI', 'MySQL / Aiven', 'Firebase Auth', 'Jikan API'],
    translations: {
      en: {
        tag: 'Anime discovery app with role-based presets.',
        method:
          'Angular 21 and FastAPI, MySQL on Aiven, Firebase Auth, catalogue fed by the Jikan API.',
        reading:
          'Three genre presets, adult-content gating and default folders created on registration.',
      },
      es: {
        tag: 'App de descubrimiento de anime con presets por rol.',
        method:
          'Angular 21 y FastAPI, MySQL en Aiven, Firebase Auth y catálogo alimentado por la API de Jikan.',
        reading:
          'Tres presets de géneros, filtro de contenido adulto y carpetas por defecto al registrarse.',
      },
      ca: {
        tag: "App de descobriment d'anime amb presets per rol.",
        method:
          "Angular 21 i FastAPI, MySQL a Aiven, Firebase Auth i catàleg alimentat per l'API de Jikan.",
        reading:
          'Tres presets de gèneres, filtre de contingut adult i carpetes per defecte en registrar-se.',
      },
    },
  },
  {
    id: 'skincare',
    well: 'C8',
    kind: 'stack',
    year: '2026',
    stack: ['Angular 21', 'FastAPI', 'MySQL / Aiven', 'Firebase Auth', 'Groq', 'i18n'],
    translations: {
      en: {
        tag: 'Korean skincare routine tracker.',
        method:
          'Angular 21 and FastAPI, MySQL on Aiven, Firebase Auth, Groq for routine suggestions.',
        reading:
          'Stock, calendar and product pages with i18n. Dynamic routine generation and wishlist in progress.',
      },
      es: {
        tag: 'Seguimiento de rutinas de skincare coreano.',
        method:
          'Angular 21 y FastAPI, MySQL en Aiven, Firebase Auth y Groq para sugerir rutinas.',
        reading:
          'Páginas de stock, calendario y productos con i18n. Generación dinámica de rutinas y wishlist en curso.',
      },
      ca: {
        tag: 'Seguiment de rutines de skincare coreà.',
        method:
          'Angular 21 i FastAPI, MySQL a Aiven, Firebase Auth i Groq per suggerir rutines.',
        reading:
          "Pàgines d'estoc, calendari i productes amb i18n. Generació dinàmica de rutines i wishlist en curs.",
      },
    },
  },
  {
    id: 'animeapi',
    well: 'C11',
    kind: 'stack',
    year: '2024',
    stack: ['Node.js', 'Express', 'REST API', 'CRUD'],
    translations: {
      en: {
        tag: 'Backend for an anime and character database.',
        method:
          'REST API with full CRUD over a database, built as a backend-only exercise.',
        reading: 'First project where I owned the data model from end to end.',
      },
      es: {
        tag: 'Backend para una base de datos de animes y personajes.',
        method:
          'API REST con CRUD completo sobre una base de datos, hecha como ejercicio solo de backend.',
        reading: 'Primer proyecto donde llevé el modelo de datos de principio a fin.',
      },
      ca: {
        tag: "Backend per a una base de dades d'animes i personatges.",
        method:
          "API REST amb CRUD complet sobre una base de dades, feta com a exercici només de backend.",
        reading: 'Primer projecte on vaig portar el model de dades de principi a fi.',
      },
    },
  },
  {
    id: 'connect4',
    well: 'D11',
    kind: 'ai',
    year: '2026',
    stack: ['Angular 19', 'FastAPI', 'WebSockets', 'Groq', 'Render'],
    translations: {
      en: {
        tag: 'Connect 4 against an AI opponent.',
        method:
          'Angular 19 front, FastAPI with WebSockets for live play, Groq driving the opponent.',
        reading: 'Pixel-art board deployed on Render. Built and graded as a class project.',
      },
      es: {
        tag: 'Conecta 4 contra un oponente de IA.',
        method:
          'Front en Angular 19, FastAPI con WebSockets para la partida en vivo y Groq moviendo al rival.',
        reading:
          'Tablero en pixel art desplegado en Render. Hecho y evaluado como proyecto de clase.',
      },
      ca: {
        tag: "Connecta 4 contra un oponent d'IA.",
        method:
          'Front en Angular 19, FastAPI amb WebSockets per a la partida en directe i Groq movent el rival.',
        reading:
          'Tauler en pixel art desplegat a Render. Fet i avaluat com a projecte de classe.',
      },
    },
  },
  {
    id: 'plantealo',
    well: 'E6',
    kind: 'ai',
    year: '2026',
    stack: ['Angular 17+', 'FastAPI', 'PostgreSQL', 'Groq vision', 'Firebase', 'Aiven'],
    translations: {
      en: {
        tag: 'Mobile-first plant care app, built by three.',
        method:
          'Angular 17+, FastAPI and PostgreSQL. Mine: a custom datepicker and select, the SSR to SPA migration and the AI chat.',
        reading:
          'Vision chat on Groq and a full Firebase to Aiven migration with uid-sync endpoints deployed on Render.',
      },
      es: {
        tag: 'App de cuidado de plantas mobile-first, a tres manos.',
        method:
          'Angular 17+, FastAPI y PostgreSQL. Lo mío: datepicker y select propios, la migración de SSR a SPA y el chat de IA.',
        reading:
          'Chat con visión en Groq y migración completa de Firebase a Aiven con endpoints de sync por uid en Render.',
      },
      ca: {
        tag: 'App de cura de plantes mobile-first, feta entre tres.',
        method:
          "Angular 17+, FastAPI i PostgreSQL. El meu tros: datepicker i select propis, la migració d'SSR a SPA i el xat d'IA.",
        reading:
          "Xat amb visió a Groq i migració completa de Firebase a Aiven amb endpoints de sync per uid a Render.",
      },
    },
  },
  {
    id: 'cms',
    well: 'F2',
    kind: 'client',
    year: '2026',
    stack: ['WordPress', 'PHP child theme', 'Elementor', 'Gravity Forms', 'Membership plugin'],
    translations: {
      en: {
        name: 'Nonprofit programme site',
        tag: 'Full site redesign for a nonprofit programme. Client under NDA.',
        method:
          'WordPress with a PHP child theme, page builder, form and membership plugins, in a team of four.',
        reading:
          'Public landing plus a nine-page private member area, with custom shortcodes serving content per organisation.',
      },
      es: {
        name: 'Web de un programa del tercer sector',
        tag: 'Rediseño completo del sitio de un programa social. Cliente bajo acuerdo de confidencialidad.',
        method:
          'WordPress con child theme en PHP, maquetador visual y plugins de formularios y de área privada, en un equipo de cuatro.',
        reading:
          'Landing pública y área privada de nueve páginas, con shortcodes propios que sirven contenido por entidad.',
      },
      ca: {
        name: "Web d'un programa del tercer sector",
        tag: 'Redisseny complet del web d\'un programa social. Client sota acord de confidencialitat.',
        method:
          'WordPress amb child theme en PHP, maquetador visual i plugins de formularis i d\'àrea privada, en un equip de quatre.',
        reading:
          'Landing pública i àrea privada de nou pàgines, amb shortcodes propis que serveixen contingut per entitat.',
      },
    },
  },
  {
    id: 'purr',
    well: 'F9',
    kind: 'client',
    year: '2024',
    stack: ['HTML', 'CSS', 'JavaScript', 'Figma', 'Team of 4'],
    translations: {
      en: {
        tag: 'Character-sheet generator for tabletop RPGs.',
        method:
          'HTML, CSS and JavaScript. My concept and design; I led UX/UI and coordinated a team of four.',
        reading: 'Final team project of the Adalab bootcamp, December 2024.',
      },
      es: {
        tag: 'Generador de fichas de personaje para rol de mesa.',
        method:
          'HTML, CSS y JavaScript. Concepto y diseño míos; llevé el UX/UI y coordiné un equipo de cuatro.',
        reading: 'Proyecto final de equipo del bootcamp de Adalab, diciembre de 2024.',
      },
      ca: {
        tag: 'Generador de fitxes de personatge per a rol de taula.',
        method:
          "HTML, CSS i JavaScript. Concepte i disseny meus; vaig portar l'UX/UI i coordinar un equip de quatre.",
        reading: "Projecte final d'equip del bootcamp d'Adalab, desembre del 2024.",
      },
    },
  },
  {
    id: 'shop',
    well: 'G5',
    kind: 'client',
    year: '2026',
    stack: ['Angular', 'TypeScript', 'SCSS', 'Vercel'],
    translations: {
      en: {
        tag: 'Responsive online shop.',
        method: 'Angular, TypeScript and SCSS with a component-based architecture.',
        reading: 'Product catalogue and shopping cart, built as a module project.',
      },
      es: {
        tag: 'Tienda online responsive.',
        method: 'Angular, TypeScript y SCSS con arquitectura de componentes.',
        reading: 'Catálogo de productos y carrito, hecho como proyecto de módulo.',
      },
      ca: {
        tag: 'Botiga en línia responsive.',
        method: 'Angular, TypeScript i SCSS amb arquitectura de components.',
        reading: 'Catàleg de productes i carret, fet com a projecte de mòdul.',
      },
    },
  },
  {
    id: 'wedding',
    well: 'G12',
    kind: 'client',
    year: '2024–25',
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel', 'Freelance'],
    translations: {
      en: {
        tag: 'Wedding site for a private client.',
        method: 'HTML, CSS and JavaScript, deployed on Vercel.',
        reading:
          'First paid commission. I handled requirements, delivery and client communication on my own.',
      },
      es: {
        tag: 'Web de boda para un cliente privado.',
        method: 'HTML, CSS y JavaScript, desplegada en Vercel.',
        reading:
          'Primer encargo pagado. Gestioné requisitos, entrega y trato con el cliente por mi cuenta.',
      },
      ca: {
        tag: 'Web de casament per a un client privat.',
        method: 'HTML, CSS i JavaScript, desplegada a Vercel.',
        reading:
          'Primer encàrrec pagat. Vaig gestionar requisits, lliurament i tracte amb el client sola.',
      },
    },
  },
  {
    id: 'rickmorty',
    well: 'A4',
    kind: 'client',
    year: '2024',
    stack: ['React', 'Hooks', 'REST API', 'CSS'],
    translations: {
      en: {
        tag: 'Character search and filtering over a public API.',
        method: 'React with Hooks, asynchronous data handling and client-side filtering.',
        reading: 'Personal project from the Adalab bootcamp, 2024.',
      },
      es: {
        tag: 'Búsqueda y filtrado de personajes sobre una API pública.',
        method: 'React con Hooks, manejo de datos asíncronos y filtrado en cliente.',
        reading: 'Proyecto personal del bootcamp de Adalab, 2024.',
      },
      ca: {
        tag: 'Cerca i filtratge de personatges sobre una API pública.',
        method: 'React amb Hooks, gestió de dades asíncrones i filtratge al client.',
        reading: "Projecte personal del bootcamp d'Adalab, 2024.",
      },
    },
  },
];
