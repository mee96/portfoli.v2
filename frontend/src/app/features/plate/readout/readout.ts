import { Component, Input, inject } from '@angular/core';
import { Project } from '../../../core/models/project.model';
import { TranslationService } from '../../../core/services/translation.service';
import { Chip } from '../../../shared/ui/chip/chip';

@Component({
  selector: 'app-readout',
  imports: [Chip],
  templateUrl: './readout.html',
  styleUrl: './readout.scss',
})
export class Readout {
  @Input() project: Project | null = null;

  protected readonly translation = inject(TranslationService);

  protected get translationForLang() {
    return this.project ? this.project.translations[this.translation.lang()] : null;
  }

  protected get name(): string {
    if (!this.project) return '';
    return this.translationForLang?.name ?? this.readableId(this.project.id);
  }

  private readableId(id: string): string {
    return id.replace(/[-_]/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
  }
}
