import { EducationEntry } from '../models/education.model';

export const EDUCATION: EducationEntry[] = [
  {
    id: 'fpo-dual',
    group: 'dev',
    org: 'Fundació Esplai – Talent IT',
    chips: ['Angular', 'Ionic', 'WordPress', 'MySQL', 'AI fundamentals'],
    translations: {
      en: {
        dt: 'Feb–29 Jul 2026',
        t: 'Dual VET — Full Stack Developer (Level 3)',
        d: 'Classroom training combined with placement work, building the projects on the plate above.',
      },
      es: {
        dt: 'Feb–29 Jul 2026',
        t: 'FPO Dual — Desarrollo Full Stack (Nivel 3)',
        d: 'Formación en aula combinada con trabajo en prácticas, construyendo los proyectos de la placa de arriba.',
      },
      ca: {
        dt: 'Feb–29 Jul 2026',
        t: 'FPO Dual — Desenvolupament Full Stack (Nivell 3)',
        d: "Formació a l'aula combinada amb feina en pràctiques, construint els projectes de la placa de dalt.",
      },
    },
  },
  {
    id: 'ai900',
    group: 'dev',
    org: 'Microsoft',
    chips: ['Azure AI services', 'ML concepts', 'Responsible AI', 'Computer vision', 'NLP'],
    translations: {
      en: {
        dt: '2026',
        t: 'Azure AI Fundamentals (AI-900)',
        d: 'Microsoft certification, prepared and passed alongside full-time work.',
      },
      es: {
        dt: '2026',
        t: 'Azure AI Fundamentals (AI-900)',
        d: 'Certificación de Microsoft, preparada y aprobada en paralelo al trabajo.',
      },
      ca: {
        dt: '2026',
        t: 'Azure AI Fundamentals (AI-900)',
        d: "Certificació de Microsoft, preparada i aprovada en paral·lel a la feina.",
      },
    },
  },
  {
    id: 'it-academy-java',
    group: 'dev',
    org: 'IT Academy · Barcelona Activa',
    chips: ['Java', 'OOP', 'Algorithms'],
    translations: {
      en: { dt: 'Jan–Feb 2026', t: 'Programming Fundamentals — Java' },
      es: { dt: 'Ene–Feb 2026', t: 'Fundamentos de Programación — Java' },
      ca: { dt: 'Gen–Feb 2026', t: 'Fonaments de Programació — Java' },
    },
  },
  {
    id: 'ioe-bigdata',
    group: 'dev',
    org: 'IOE Business School',
    chips: ['Big Data', 'AI foundations'],
    translations: {
      en: { dt: 'Jan 2026', t: 'Introduction to Big Data & AI' },
      es: { dt: 'Ene 2026', t: 'Introducción a Big Data e IA' },
      ca: { dt: 'Gen 2026', t: 'Introducció al Big Data i la IA' },
    },
  },
  {
    id: 'adalab',
    group: 'dev',
    org: 'Adalab',
    chips: ['JavaScript ES6+', 'React', 'Node.js', 'SASS', 'Git', 'SQL', 'Scrum'],
    translations: {
      en: {
        dt: 'Sep–Dec 2024',
        t: 'Full Stack Web Development Bootcamp',
        d: 'Intensive, project-based, in teams and running Scrum. Where the career change actually started.',
      },
      es: {
        dt: 'Sep–Dic 2024',
        t: 'Bootcamp Intensivo Full Stack Web Developer',
        d: 'Intensivo, basado en proyectos, en equipo y con Scrum. Aquí empezó de verdad el cambio de sector.',
      },
      ca: {
        dt: 'Set–Des 2024',
        t: 'Bootcamp Intensiu Full Stack Web Developer',
        d: 'Intensiu, basat en projectes, en equip i amb Scrum. Aquí va començar de debò el canvi de sector.',
      },
    },
  },
  {
    id: 'severo-ochoa',
    group: 'lab',
    org: 'INS Severo Ochoa',
    chips: ['GMP', 'Process control'],
    translations: {
      en: { dt: '2022', t: 'Higher VET — Pharmaceutical & Biotechnology Manufacturing' },
      es: {
        dt: '2022',
        t: 'CFGS — Fabricación de Productos Farmacéuticos y Biotecnológicos',
      },
      ca: {
        dt: '2022',
        t: 'CFGS — Fabricació de Productes Farmacèutics i Biotecnològics',
      },
    },
  },
  {
    id: 'ramon-i-cajal',
    group: 'lab',
    org: 'Escola Ramon i Cajal, Barcelona',
    chips: ['RIA', 'EIA', 'Quality control'],
    translations: {
      en: {
        dt: '2020',
        t: 'Higher VET — Clinical Laboratory Technician',
        d: 'The origin of everything on the left-hand side of this page.',
      },
      es: {
        dt: '2020',
        t: 'CFGS — Laboratorio Clínico y Biomédico',
        d: 'El origen de todo lo que hay en la parte izquierda de esta página.',
      },
      ca: {
        dt: '2020',
        t: 'CFGS — Laboratori Clínic i Biomèdic',
        d: "L'origen de tot el que hi ha a la part esquerra d'aquesta pàgina.",
      },
    },
  },
];
