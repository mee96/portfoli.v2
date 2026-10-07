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
  /** Display name for proper names the id can't express (e.g. "BBT · BubbleTea API"). */
  name?: string;
  /** Eligible to be pre-selected (at random) when the plate first loads. */
  featured?: boolean;
  well: string;
  kind: ProjectKind;
  year: string;
  stack: string[];
  githubUrl?: string;
  demoUrl?: string;
  translations: Record<Lang, ProjectTranslation>;
}
