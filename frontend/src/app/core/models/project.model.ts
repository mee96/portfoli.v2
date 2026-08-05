export type ProjectKind = 'stack' | 'ai' | 'client';

export type Lang = 'en' | 'es' | 'ca';

export interface ProjectTranslation {
  name?: string;
  tag: string;
  method: string;
  reading: string;
}

export interface Project {
  id: string;
  well: string;
  kind: ProjectKind;
  year: string;
  stack: string[];
  githubUrl?: string;
  demoUrl?: string;
  translations: Record<Lang, ProjectTranslation>;
}
