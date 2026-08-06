import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { Header } from './shared/ui/header/header';
import { Hero } from './features/hero/hero';
import { Plate } from './features/plate/plate';
import { Experience } from './features/experience/experience';
import { Skills } from './features/skills/skills';
import { TrainingLog } from './features/training-log/training-log';
import { Contact } from './features/contact/contact';
import { Secretari } from './features/secretari/secretari';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Plate, Experience, Skills, TrainingLog, Contact, Secretari],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    // Silent pre-warm: wakes up the Render backend before the user opens the chat.
    fetch(`${environment.apiUrl}/health`).catch(() => {});
  }
}
