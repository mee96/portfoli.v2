import { EducationEntry } from '../models/education.model';

export const EDUCATION: EducationEntry[] = [
  {
    id: 'fpo-dual',
    group: 'dev',
    org: 'Fundación Esplai',
    chips: ['AI fundamentals', 'Angular', 'Ionic', 'MySQL', 'Python'],
    translations: {
      en: {
        dt: 'Feb–Jul 2026',
        t: 'Dual Technical Diploma in Full Stack Software Development',
        d: 'Classroom training combined with placement work, building the projects on the plate above.',
      },
      es: {
        dt: 'Feb–Jul 2026',
        t: 'FPO Dual — Desarrollo Full Stack',
        d: 'Formación en aula combinada con trabajo en prácticas, construyendo los proyectos de la placa de arriba.',
      },
      ca: {
        dt: 'Feb–Jul 2026',
        t: 'FPO Dual — Desenvolupament Full Stack',
        d: "Formació a l'aula combinada amb feina en pràctiques, construint els projectes de la placa de dalt.",
      },
    },
  },
  {
    id: 'ai900',
    group: 'dev',
    org: 'Microsoft',
    chips: ['Azure AI services', 'ML concepts', 'Responsible AI', 'Computer vision', 'NLP'],
    verifyUrl: 'https://www.credly.com/users/carmeen-mc/badges/credly',
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
    chips: ['Big Data', 'AI foundations', 'Python'],
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
    org: 'INS Severo Ochoa, Esplugues de Llobregat',
    chips: [],
    translations: {
      en: {
        dt: '2022',
        t: 'Higher Diploma — Pharmaceutical & Biotechnological Products Manufacturing',
      },
      es: {
        dt: '2022',
        t: 'CFGS Fabricación de Productos Farmacéuticos, Biotecnológicos y Afines',
      },
      ca: {
        dt: '2022',
        t: 'CFGS Fabricació de Productes Farmacèutics, Biotecnològics i Afins',
      },
    },
  },
  {
    id: 'ramon-i-cajal',
    group: 'lab',
    org: 'Escola Ramon i Cajal, Barcelona',
    chips: [],
    translations: {
      en: {
        dt: '2020',
        t: 'Higher Diploma — Clinical and Biomedical Laboratory',
      },
      es: {
        dt: '2020',
        t: 'CFGS en Laboratorio Clínico y Biomédico',
      },
      ca: {
        dt: '2020',
        t: 'CFGS en Laboratori Clínic i Biomèdic',
      },
    },
  },
];
