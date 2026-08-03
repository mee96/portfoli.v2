import { Injectable, signal } from '@angular/core';
import en from '../../shared/i18n/en.json';
import es from '../../shared/i18n/es.json';
import ca from '../../shared/i18n/ca.json';

export type Lang = 'en' | 'es' | 'ca';

type Translations = Record<string, unknown>;

const translations: Record<Lang, Translations> = { en, es, ca };

@Injectable({ providedIn: 'root' })
export class TranslationService {
  readonly lang = signal<Lang>('en');

  setLang(l: Lang): void {
    this.lang.set(l);
  }

  t(key: string): string {
    const value = key
      .split('.')
      .reduce<unknown>(
        (acc, segment) =>
          acc && typeof acc === 'object' ? (acc as Translations)[segment] : undefined,
        translations[this.lang()],
      );
    return typeof value === 'string' ? value : key;
  }
}
