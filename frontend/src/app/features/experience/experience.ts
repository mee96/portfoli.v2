import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { EXPERIENCE } from '../../core/data/experience.data';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { LogEntry } from '../../shared/ui/log-entry/log-entry';

@Component({
  selector: 'app-experience',
  imports: [SectionHeader, LogEntry],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  protected readonly translation = inject(TranslationService);
  protected readonly entries = EXPERIENCE;
}
