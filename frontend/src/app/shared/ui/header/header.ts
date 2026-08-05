import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';
import { LangSwitcher } from '../lang-switcher/lang-switcher';

const NAV_LINKS = [
  { href: '#plate', labelKey: 'nav.plate' },
  { href: '#experience', labelKey: 'nav.experience' },
  { href: '#skills', labelKey: 'nav.skills' },
  { href: '#training-log', labelKey: 'nav.log' },
  { href: '#contact', labelKey: 'nav.contact' },
] as const;

@Component({
  selector: 'app-header',
  imports: [LangSwitcher],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly translation = inject(TranslationService);
  protected readonly navLinks = NAV_LINKS;
}
