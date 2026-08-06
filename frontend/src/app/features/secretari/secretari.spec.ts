import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Secretari } from './secretari';
import { WebSocketService } from '../../core/services/websocket.service';

describe('Secretari', () => {
  let component: Secretari;
  let fixture: ComponentFixture<Secretari>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Secretari],
    }).compileComponents();

    fixture = TestBed.createComponent(Secretari);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('refocuses the input once a streamed response finishes, after it is re-enabled', async () => {
    const ws = TestBed.inject(WebSocketService);
    // We drive ws.turns/partial/streaming directly below — no real socket needed.
    vi.spyOn(ws, 'connect').mockImplementation(() => {});

    const compiled = fixture.nativeElement as HTMLElement;

    (compiled.querySelector('.fab') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    const input = compiled.querySelector('input') as HTMLInputElement;

    // Mirrors what WebSocketService does while a response streams in.
    ws.streaming.set(true);
    ws.partial.set('Hola');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.disabled).toBe(true);

    // Mirrors the 'end' frame.
    ws.turns.update((turns) => [...turns, { role: 'bunsen', text: ws.partial() }]);
    ws.partial.set('');
    ws.streaming.set(false);
    fixture.detectChanges();
    await fixture.whenStable();
    // Let the setTimeout(0) in the focus effect actually run.
    await new Promise((resolve) => setTimeout(resolve, 20));
    fixture.detectChanges();

    expect(input.disabled).toBe(false);
    expect(document.activeElement).toBe(input);
  });
});
