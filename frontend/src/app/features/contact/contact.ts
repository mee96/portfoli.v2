import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from '../../core/services/translation.service';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, SectionHeader, Button],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly translation = inject(TranslationService);

  protected photoFailed = false;

  private readonly fb = inject(FormBuilder);
  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    message: ['', Validators.required],
  });

  protected onPhotoError(): void {
    this.photoFailed = true;
  }

  // TODO: decidir com s'envia realment el formulari (mailto vs backend) — de moment només es registra la intenció.
  protected onSubmit(): void {
    console.warn('Contact form submission not wired up yet');
  }
}
