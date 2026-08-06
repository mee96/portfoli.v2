import {
  Component,
  ElementRef,
  HostListener,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { WebSocketService } from '../../core/services/websocket.service';

const COLDSTART_DELAY_MS = 3000;
const COLDSTART2_DELAY_MS = 15000;

@Component({
  selector: 'app-secretari',
  imports: [],
  templateUrl: './secretari.html',
  styleUrl: './secretari.scss',
})
export class Secretari {
  protected readonly translation = inject(TranslationService);
  protected readonly ws = inject(WebSocketService);

  protected readonly open = signal(false);
  protected readonly awaitingResponse = signal(false);
  protected readonly coldStartStage = signal<0 | 1 | 2>(0);

  private readonly messagesEl = viewChild<ElementRef<HTMLDivElement>>('messagesEl');
  private readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');
  private readonly panelEl = viewChild<ElementRef<HTMLDivElement>>('panelEl');
  private readonly fabEl = viewChild<ElementRef<HTMLButtonElement>>('fabEl');

  private coldStartTimer?: ReturnType<typeof setTimeout>;
  private coldStart2Timer?: ReturnType<typeof setTimeout>;
  private wasStreaming = false;

  constructor() {
    effect(() => {
      if (this.ws.partial().length > 0) {
        this.awaitingResponse.set(false);
        this.clearColdStartTimers();
      }
    });

    effect(() => {
      // Track dependencies: any new turn or growing in-progress text should
      // scroll the panel down.
      this.ws.turns();
      this.ws.partial();

      const el = this.messagesEl()?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });

    effect(() => {
      const streaming = this.ws.streaming();
      // Refocus the input the moment a response finishes streaming, so the
      // user can keep typing without clicking back into the panel.
      if (this.wasStreaming && !streaming) {
        // Deferred to a macrotask: at this exact point in the effect, the
        // [disabled] binding removal triggered by the same `streaming`
        // write hasn't been applied to the DOM yet (it's microtask-scheduled
        // by Angular), so calling .focus() synchronously here is a no-op on
        // an element the browser still considers disabled.
        setTimeout(() => this.inputEl()?.nativeElement.focus(), 0);
      }
      this.wasStreaming = streaming;
    });
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.open()) {
      return;
    }

    const target = event.target as Node;
    const panel = this.panelEl()?.nativeElement;
    const fab = this.fabEl()?.nativeElement;

    // Ignore clicks inside the panel (e.g. selecting response text) and the
    // fab itself (its own click already toggles `open` — closing here too
    // would just re-open it, or close it right back on the same click that
    // opened it).
    if (panel?.contains(target) || fab?.contains(target)) {
      return;
    }

    this.open.set(false);
  }

  protected toggle(): void {
    const nowOpen = !this.open();
    this.open.set(nowOpen);

    if (nowOpen) {
      this.ws.connect();
    }
  }

  protected onSend(input: HTMLInputElement): void {
    const text = input.value.trim();
    if (!text) {
      return;
    }

    input.value = '';
    this.ws.send(text);

    this.awaitingResponse.set(true);
    this.startColdStartTimers();
  }

  private startColdStartTimers(): void {
    this.clearColdStartTimers();
    this.coldStartTimer = setTimeout(() => {
      this.coldStartStage.set(1);

      this.coldStart2Timer = setTimeout(() => {
        this.coldStartStage.set(2);
      }, COLDSTART2_DELAY_MS);
    }, COLDSTART_DELAY_MS);
  }

  private clearColdStartTimers(): void {
    clearTimeout(this.coldStartTimer);
    clearTimeout(this.coldStart2Timer);
    this.coldStartStage.set(0);
  }
}
