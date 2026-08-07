import { ExperienceEntry } from '../models/experience.model';

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'esplai',
    active: true,
    org: 'Fundación Esplai',
    chips: ['Angular', 'Ionic', 'WordPress', 'Git', 'PHP', 'Python'],
    translations: {
      en: {
        dt: 'Mar 2026 – Present',
        t: 'Junior Web Developer',
        d: 'A third-sector organisation building websites and apps.',
      },
      es: {
        dt: 'Mar 2026 – Actualidad',
        t: 'Desarrolladora Web Junior',
        d: 'Una organización del tercer sector que construye webs y aplicaciones.',
      },
      ca: {
        dt: 'Mar 2026 – Actualitat',
        t: 'Desenvolupadora Web Júnior',
        d: 'Una organització del tercer sector que construeix webs i aplicacions.',
      },
    },
  },
  {
    id: 'freelance',
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
    id: 'lab',
    org: 'Unilabs · Synlab · Reference Laboratory',
    chips: ['RIA', 'EIA', 'Patient care', 'Quality control'],
    translations: {
      en: {
        dt: '2021–2024',
        t: 'Laboratory Technician',
        d: 'Three years across RIA, EIA and UGM departments — patient intake, sample extraction, and immunoassay analysis. UGM (Sample Management Unit) is where incoming samples are received, pre-treated and distributed to the right department. Along the way, also ran COVID antigen testing at Mobile World Congress — years before going back twice more as a developer.',
      },
      es: {
        dt: '2021–2024',
        t: 'Técnica de Laboratorio',
        d: 'Tres años entre los departamentos de RIA, EIA y UGM — atención al paciente, extracción de muestras y análisis por inmunoensayo. La UGM (Unidad de Gestión de Muestras) es donde llegan las muestras, se les da el tratamiento previo y se distribuyen al departamento que corresponda. De paso, también hizo tests de antígenos de COVID en el Mobile World Congress — años antes de volver dos veces más como desarrolladora.',
      },
      ca: {
        dt: '2021–2024',
        t: 'Tècnica de Laboratori',
        d: "Tres anys entre els departaments de RIA, EIA i UGM — atenció al pacient, extracció de mostres i anàlisi per immunoassaig. La UGM (Unitat de Gestió de Mostres) és on arriben les mostres, se'ls fa el tractament previ i es distribueixen al departament que toqui. De pas, també va fer tests d'antígens de COVID al Mobile World Congress — anys abans de tornar-hi dues vegades més com a desenvolupadora.",
      },
    },
  },
  {
    id: 'teleperformance',
    org: 'Teleperformance',
    chips: ['Technical support', 'Communication', 'Troubleshooting'],
    translations: {
      en: {
        dt: 'Jun 2019 – Jul 2021',
        t: 'Technical Support Agent',
        d: 'Two years of inbound and outbound technical support calls, plus back-office email management.',
      },
      es: {
        dt: 'Jun 2019 – Jul 2021',
        t: 'Agente de Soporte Técnico',
        d: 'Dos años de llamadas de soporte técnico entrantes y salientes, más gestión de back-office por correo.',
      },
      ca: {
        dt: 'Jun 2019 – Jul 2021',
        t: 'Agent de Suport Tècnic',
        d: 'Dos anys de trucades de suport tècnic entrants i sortints, més gestió de back-office per correu.',
      },
    },
  },
];
