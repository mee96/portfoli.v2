import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonType = 'button' | 'submit';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input({ required: true }) label!: string;
  @Input() href?: string;
  @Input() variant: ButtonVariant = 'primary';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();

  protected get classes(): string {
    return `btn btn--${this.variant}`;
  }

  protected onClick(): void {
    this.clicked.emit();
  }
}
