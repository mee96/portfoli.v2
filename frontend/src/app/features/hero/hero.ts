import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { LangSwitcher } from '../../shared/ui/lang-switcher/lang-switcher';
import { Chip } from '../../shared/ui/chip/chip';

@Component({
  selector: 'app-hero',
  imports: [LangSwitcher, Chip],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly translation = inject(TranslationService);

  // TODO: temporal, per provar visualment ChipComponent — s'eliminarà quan skills/plate rebin dades reals.
  protected readonly demoChips = ['Angular', 'FastAPI', 'RAG'];
}
