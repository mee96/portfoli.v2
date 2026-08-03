import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { SKILLS } from '../../core/data/skills.data';
import { SectionHeader } from '../../shared/ui/section-header/section-header';

@Component({
  selector: 'app-skills',
  imports: [SectionHeader],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly translation = inject(TranslationService);
  protected readonly skills = SKILLS;
}
