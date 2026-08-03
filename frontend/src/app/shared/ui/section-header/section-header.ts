import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  imports: [],
  templateUrl: './section-header.html',
  styleUrl: './section-header.scss',
})
export class SectionHeader {
  @Input({ required: true }) fig!: string;
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
}
