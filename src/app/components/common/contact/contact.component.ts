import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { BorderComponent } from '@components/icons';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [BorderComponent, ReactiveFormsModule, CommonModule],
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

  getFieldErrors(name: string): string[] | null {
    const control = this.contactForm.get(name);
    if (!control || !control.errors) return null;

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

    return null;
  }

  submitForm() {
    if (this.contactForm.invalid) return;
    this.message.set(null);
    this.isLoading.set(true);

    this.http
      .post('https://api.fabricioflores.se/contact', this.contactForm.value)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({
        next: () => {
          this.message.set("✅ Thank you! I'll be in touch with you.");
          this.contactForm.reset();
        },
        error: (e) => {
          console.log(e);
          this.message.set('❌ Something went nuts, please try again.');
        },
      });
  }
}

const errorMessages: { [key: string]: string } = {
  required: "This field can't be empty.",
  email: 'Please enter a valid email address.',
  minlength: 'Text is too short.',
  maxlength: 'Text is too long.',
};
