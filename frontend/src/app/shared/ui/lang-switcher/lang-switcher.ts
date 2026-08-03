import { Component, inject } from '@angular/core';
import { Lang, TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-lang-switcher',
  imports: [],
  templateUrl: './lang-switcher.html',
  styleUrl: './lang-switcher.scss',
})
export class LangSwitcher {
  protected readonly translation = inject(TranslationService);

  protected setLang(l: Lang): void {
    this.translation.setLang(l);
  }
}
