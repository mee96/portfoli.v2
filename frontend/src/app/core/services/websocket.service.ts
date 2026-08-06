import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface SecretariTurn {
  role: 'bunsen' | 'user';
  text: string;
}

type ServerMessage =
  | { type: 'welcome'; text: string }
  | { type: 'chunk'; text: string }
  | { type: 'end' };

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket?: WebSocket;
  private pendingSends: string[] = [];

  readonly turns = signal<SecretariTurn[]>([]);
  readonly partial = signal('');
  readonly streaming = signal(false);

  connect(): void {
    if (this.socket) {
      return;
    }

    this.socket = new WebSocket(environment.wsUrl);

    this.socket.addEventListener('open', () => {
      // Flush anything the user sent while the handshake was still in
      // flight, instead of silently dropping it.
      for (const text of this.pendingSends) {
        this.socket?.send(text);
      }
      this.pendingSends = [];
    });

    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data) as ServerMessage;

      if (data.type === 'welcome') {
        this.turns.update((turns) => [...turns, { role: 'bunsen', text: data.text }]);
        return;
      }

      if (data.type === 'chunk') {
        this.streaming.set(true);
        this.partial.update((partial) => partial + data.text);
        return;
      }

      const finalText = this.partial();
      this.turns.update((turns) => [...turns, { role: 'bunsen', text: finalText }]);
      this.partial.set('');
      this.streaming.set(false);
    });
  }

  send(text: string): void {
    this.turns.update((turns) => [...turns, { role: 'user', text }]);

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(text);
    } else {
      this.pendingSends.push(text);
    }
  }
}
