import {
  Component,
  ElementRef,
  OnDestroy,
  effect,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { SKILLS } from '../../core/data/skills.data';
import { SectionHeader } from '../../shared/ui/section-header/section-header';

@Component({
  selector: 'app-skills',
  imports: [SectionHeader],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements OnDestroy {
  protected readonly translation = inject(TranslationService);
  protected readonly skills = SKILLS;
  protected readonly activeSkillIndex = signal(0);

  private readonly gridEl = viewChild<ElementRef<HTMLDivElement>>('gridEl');
  private readonly cardEls = viewChildren<ElementRef<HTMLElement>>('cardEl');
  private observer?: IntersectionObserver;

  constructor() {
    effect(() => {
      const root = this.gridEl()?.nativeElement;
      const cards = this.cardEls();

      this.observer?.disconnect();

      if (!root || cards.length === 0 || typeof IntersectionObserver === 'undefined') {
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              continue;
            }
            const index = cards.findIndex((card) => card.nativeElement === entry.target);
            if (index !== -1) {
              this.activeSkillIndex.set(index);
            }
          }
        },
        {
          root,
          // Only count a card as "centred" while it overlaps a thin band in
          // the horizontal middle of the scroller — more reliable than
          // tracking scrollLeft by hand, and unaffected by snap-scroll
          // easing/momentum.
          rootMargin: '0px -40% 0px -40%',
          threshold: 0,
        },
      );

      for (const card of cards) {
        this.observer.observe(card.nativeElement);
      }
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
