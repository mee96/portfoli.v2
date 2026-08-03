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
];
