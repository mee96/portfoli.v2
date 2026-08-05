import { Component, Input } from '@angular/core';
import { Chip } from '../chip/chip';

@Component({
  selector: 'app-log-entry',
  imports: [Chip],
  templateUrl: './log-entry.html',
  styleUrl: './log-entry.scss',
})
export class LogEntry {
  @Input({ required: true }) dt!: string;
  @Input({ required: true }) title!: string;
  @Input() org?: string;
  @Input() description?: string;
  @Input({ required: true }) chips!: string[];
  @Input() active = false;
  @Input() activeLabel = '';
}
