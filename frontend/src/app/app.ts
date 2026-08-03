import { Component } from '@angular/core';
import { Header } from './shared/ui/header/header';
import { Hero } from './features/hero/hero';
import { Plate } from './features/plate/plate';
import { Skills } from './features/skills/skills';
import { TrainingLog } from './features/training-log/training-log';
import { Contact } from './features/contact/contact';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Plate, Skills, TrainingLog, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
