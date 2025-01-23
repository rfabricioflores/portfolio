import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { BorderComponent } from '@components/icons';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, finalize, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [BorderComponent, ReactiveFormsModule],
  host: {
    class: 'wrapper',
  },
})
export default class ContactComponent {
  private http = inject(HttpClient);
  private formBuilder = inject(FormBuilder);

  public contactForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(100)],
    ],
    message: [
      '',
      [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(400),
      ],
    ],
  });

  public isLoading = signal(false);
  public message = signal<string | null>(null);

  getFieldErrors(name: string): string[] {
    const control = this.contactForm.get(name);
    if (!control || !control.errors) return [];

    const isDirty = control.dirty;
    const isValid = control.valid;

    if (isDirty && !isValid) {
      const errors = Object.keys(control.errors).map((key) =>
        errorMessages[key]
          ? errorMessages[key]
          : `Validation of type "${key}" failed.`
      );

      return errors;
    }

    return [];
  }

  private timeout: ReturnType<typeof setTimeout> | null = null;

  submitForm() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.message.set(null);
    this.isLoading.set(true);

    this.http
      .post('https://api.fabricioflores.se/contact', this.contactForm.value)
      .pipe(
        tap(() => this.contactForm.reset()),
        map(() => "✅ Thank you! I'll be in touch with you."),
        catchError(() => of('❌ Something went nuts, please try again.')),
        finalize(() => {
          this.isLoading.set(false);
          this.timeout = setTimeout(() => this.message.set(null), 1000 * 10);
        })
      )
      .subscribe((message) => this.message.set(message));
  }
}

const errorMessages: { [key: string]: string } = {
  required: "This field can't be empty.",
  email: 'Please enter a valid email address.',
  minlength: 'Text is too short.',
  maxlength: 'Text is too long.',
};
