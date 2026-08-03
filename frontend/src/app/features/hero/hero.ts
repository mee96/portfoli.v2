import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { LangSwitcher } from '../../shared/ui/lang-switcher/lang-switcher';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-hero',
  imports: [LangSwitcher, Button],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly translation = inject(TranslationService);
}
