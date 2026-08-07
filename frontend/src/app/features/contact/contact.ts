import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from '../../core/services/translation.service';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { Button } from '../../shared/ui/button/button';
import { environment } from '../../../environments/environment';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, SectionHeader, Button],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly translation = inject(TranslationService);

  protected photoFailed = false;
  protected readonly status = signal<SubmitStatus>('idle');

  private readonly fb = inject(FormBuilder);
  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    message: ['', Validators.required],
  });

  protected onPhotoError(): void {
    this.photoFailed = true;
  }

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid || this.status() === 'sending') return;

    this.status.set('sending');

    try {
      const response = await fetch(`${environment.apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form.getRawValue()),
      });

      if (!response.ok) {
        throw new Error(`Contact request failed with status ${response.status}`);
      }

      this.status.set('success');
      this.form.reset();
    } catch {
      this.status.set('error');
    }
  }
}
