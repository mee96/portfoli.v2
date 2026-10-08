import { Component, computed, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-hero',
  imports: [Button],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly translation = inject(TranslationService);
  protected readonly cvHref = computed(
    () => `/cv/CV_Carme_Medina_${this.translation.lang().toUpperCase()}.pdf`,
  );
}
