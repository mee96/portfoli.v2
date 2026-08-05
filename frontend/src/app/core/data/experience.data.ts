import { ExperienceEntry } from '../models/experience.model';

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'esplai-job',
    active: true,
    org: 'Fundació Esplai',
    chips: ['Angular', 'Ionic', 'WordPress', 'Git'],
    translations: {
      en: {
        dt: 'Mar 2026 – Present',
        t: 'Junior Web Developer',
        d: 'Full redesign of a digital transformation programme website for the third sector, reusable Angular + Ionic components in a team of four, weekly deployment cycles.',
      },
      es: {
        dt: 'Mar 2026 – Actualidad',
        t: 'Desarrolladora Web Junior',
        d: 'Rediseño completo del sitio de un programa de transformación digital del tercer sector, componentes reutilizables en Angular e Ionic en un equipo de cuatro, ciclos de despliegue semanales.',
      },
      ca: {
        dt: 'Mar 2026 – Actualitat',
        t: 'Desenvolupadora Web Júnior',
        d: "Redisseny complet del web d'un programa de transformació digital del tercer sector, components reutilitzables en Angular i Ionic en un equip de quatre, cicles de desplegament setmanals.",
      },
    },
  },
  {
    id: 'freelance-wedding',
    org: 'Freelance',
    chips: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    translations: {
      en: {
        dt: '2024–2025',
        t: 'Freelance Web Developer',
        d: 'Designed, built and deployed a responsive wedding website for a private client, managing requirements and delivery independently.',
      },
      es: {
        dt: '2024–2025',
        t: 'Desarrolladora Web Freelance',
        d: 'Diseñé, construí y desplegué una web de boda responsive para un cliente privado, gestionando requisitos y entrega de forma independiente.',
      },
      ca: {
        dt: '2024–2025',
        t: 'Desenvolupadora Web Freelance',
        d: 'Vaig dissenyar, construir i desplegar una web de casament responsive per a un client privat, gestionant requisits i entrega de forma independent.',
      },
    },
  },
  {
    id: 'lab-technician',
    org: 'Unilabs · Synlab · Reference Laboratory',
    chips: ['RIA', 'EIA', 'Patient care', 'Quality control'],
    translations: {
      en: {
        dt: '2021–2024',
        t: 'Laboratory Technician',
        d: 'Three years across RIA, EIA and UGM departments — patient intake, sample extraction, and immunoassay analysis. Along the way, also ran COVID antigen testing at Mobile World Congress — my first time working a tech event, years before attending one as a developer.',
      },
      es: {
        dt: '2021–2024',
        t: 'Técnica de Laboratorio',
        d: 'Tres años entre los departamentos de RIA, EIA y UGM — atención al paciente, extracción de muestras y análisis por inmunoensayo. De paso, también hice tests de antígenos de COVID en el Mobile World Congress, mi primera vez trabajando en un evento tech, años antes de asistir a uno como developer.',
      },
      ca: {
        dt: '2021–2024',
        t: 'Tècnica de Laboratori',
        d: "Tres anys entre els departaments de RIA, EIA i UGM — atenció al pacient, extracció de mostres i anàlisi per immunoassaig. De pas, també vaig fer tests d'antígens de COVID al Mobile World Congress, la primera vegada treballant en un esdeveniment tech, anys abans d'assistir-hi com a developer.",
      },
    },
  },
];
