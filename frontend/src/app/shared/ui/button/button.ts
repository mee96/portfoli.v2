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
  @Input() warm = false;
  @Output() clicked = new EventEmitter<void>();

  protected get classes(): string {
    const base = `btn btn--${this.variant}`;
    return this.variant === 'primary' && this.warm ? `${base} btn--primary--warm` : base;
  }

  protected onClick(): void {
    this.clicked.emit();
  }
}
