import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-kontakt',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './kontakt.html',
  styleUrl: './kontakt.scss',
})
export class Kontakt {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(180)]],
    phone: ['', [Validators.maxLength(40)]],
    subject: ['', [Validators.required, Validators.maxLength(180)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
    consent: [false, [Validators.requiredTrue]],
    // Honeypot: muss leer bleiben. Bots füllen versteckte Felder gerne aus.
    _honey: [''],
  });

  async onSubmit(): Promise<void> {
    this.errorMessage.set(null);

    if (this.form.controls._honey.value) {
      // Bot erkannt – still erfolgreich tun, nichts senden.
      this.submitted.set(true);
      this.form.reset();
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, phone, subject, message } = this.form.getRawValue();
    const payload = {
      name,
      email,
      phone: phone || '-',
      subject,
      message,
      _email: {
        from: `${name} <${email}>`,
        subject: `[Kontaktformular] ${subject}`,
        template: {
          title: 'Neue Anfrage über das Kontaktformular',
        },
      },
    };

    this.submitting.set(true);
    try {
      await firstValueFrom(
        this.http.post(`https://submit-form.com/${environment.formsparkFormId}`, payload, {
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        }),
      );
      this.submitted.set(true);
      this.form.reset();
    } catch {
      this.errorMessage.set(
        'Die Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.',
      );
    } finally {
      this.submitting.set(false);
    }
  }
}
