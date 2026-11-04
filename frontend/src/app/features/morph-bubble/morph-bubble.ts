import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';

/**
 * Full-screen WebGL backdrop: the lavender mesh gradient plus a glass bubble
 * that changes shape with scroll (bubble -> DNA double helix -> screen).
 *
 * three.js is loaded lazily after the first render so it never weighs on the
 * initial bundle. Without WebGL the CSS mesh in styles.scss stays as fallback.
 */
@Component({
  selector: 'app-morph-bubble',
  template: '<canvas #canvas></canvas>',
  styleUrl: './morph-bubble.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
})
export class MorphBubble {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    const zone = inject(NgZone);
    const destroyRef = inject(DestroyRef);
    let destroyed = false;
    let dispose: (() => void) | undefined;

    afterNextRender(() => {
      zone.runOutsideAngular(async () => {
        try {
          const { BubbleScene } = await import('./bubble-scene');
          if (destroyed) return;
          const canvas = this.canvas().nativeElement;
          const root = document.documentElement;
          // Fade the canvas in over the CSS gradient, and only drop the CSS
          // gradient once the fade has finished (no grey flash in between).
          canvas.addEventListener('transitionend', () => root.classList.add('webgl-ready'), { once: true });
          const scene = new BubbleScene(canvas, () => root.classList.add('webgl-backdrop'));
          dispose = () => scene.dispose();
        } catch {
          // No WebGL (or it failed): keep the CSS gradient.
        }
      });
    });

    destroyRef.onDestroy(() => {
      destroyed = true;
      dispose?.();
      document.documentElement.classList.remove('webgl-backdrop', 'webgl-ready');
    });
  }
}
