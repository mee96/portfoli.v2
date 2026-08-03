import { Component, computed, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { EDUCATION } from '../../core/data/education.data';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { Chip } from '../../shared/ui/chip/chip';

@Component({
  selector: 'app-training-log',
  imports: [SectionHeader, Chip],
  templateUrl: './training-log.html',
  styleUrl: './training-log.scss',
})
export class TrainingLog {
  protected readonly translation = inject(TranslationService);

  protected readonly groups = computed(() => [
    { labelKey: 'log.dev', entries: EDUCATION.filter((entry) => entry.group === 'dev') },
    { labelKey: 'log.lab', entries: EDUCATION.filter((entry) => entry.group === 'lab') },
  ]);
}
