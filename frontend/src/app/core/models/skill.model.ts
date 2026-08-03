import { Lang } from './project.model';

export interface SkillTranslation {
  title: string;
  body: string;
}

export interface Skill {
  id: string;
  translations: Record<Lang, SkillTranslation>;
}
