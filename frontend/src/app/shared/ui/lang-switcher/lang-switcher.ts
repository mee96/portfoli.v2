import { Component, inject, signal } from '@angular/core';
import { Lang, TranslationService } from '../../../core/services/translation.service';

const OTHER_LANGS: Record<Lang, Lang[]> = {
  en: ['es', 'ca'],
  es: ['en', 'ca'],
  ca: ['en', 'es'],
};

@Component({
  selector: 'app-lang-switcher',
  imports: [],
  templateUrl: './lang-switcher.html',
  styleUrl: './lang-switcher.scss',
})
export class LangSwitcher {
  protected readonly translation = inject(TranslationService);

  protected readonly compactMenuOpen = signal(false);

  protected get otherLangs(): Lang[] {
    return OTHER_LANGS[this.translation.lang()];
  }

  protected setLang(l: Lang): void {
    this.translation.setLang(l);
    this.compactMenuOpen.set(false);
  }

  protected toggleCompactMenu(): void {
    this.compactMenuOpen.update((open) => !open);
  }
}
