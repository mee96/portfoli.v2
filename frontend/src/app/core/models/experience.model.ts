import { Lang } from './project.model';

export interface ExperienceTranslation {
  dt: string;
  t: string;
  d?: string;
}

export interface ExperienceEntry {
  id: string;
  active?: boolean;
  org?: string;
  chips: string[];
  translations: Record<Lang, ExperienceTranslation>;
}
