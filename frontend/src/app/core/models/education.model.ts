import { Lang } from './project.model';

export type EducationGroup = 'dev' | 'lab';

export interface EducationTranslation {
  dt: string;
  t: string;
  d?: string;
}

export interface EducationEntry {
  id: string;
  group: EducationGroup;
  active?: boolean;
  org: string;
  chips: string[];
  translations: Record<Lang, EducationTranslation>;
}
