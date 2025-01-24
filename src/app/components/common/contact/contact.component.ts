import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { BorderComponent } from '@components/icons';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  catchError,
  finalize,
  map,
  of,
  startWith,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [BorderComponent, ReactiveFormsModule, AsyncPipe],
  host: {
    class: 'wrapper',
  },
})
export default class ContactComponent {
  private http = inject(HttpClient);
  private formBuilder = inject(FormBuilder);

  public contactForm = this.formBuilder.nonNullable.group({
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

  public formLoading = signal(false);
  private formResponse = signal<string | null>(null);
  public formNotification$ = toObservable(this.formResponse).pipe(
    switchMap((message) =>
      message
        ? timer(1000 * 8).pipe(
            startWith(message),
            map((v) => v || null)
          )
        : of(null)
    )
  );

  public formControlErrors(name: keyof typeof this.contactForm.controls) {
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

  public submitForm() {
    this.formResponse.set(null);
    this.formLoading.set(true);
    const body = this.contactForm.getRawValue();

    this.http
      .post('https://api.fabricioflores.se/contact', body)
      .pipe(
        tap(() => this.contactForm.reset()),
        map(() => "✅ Thank you! I'll be in touch with you."),
        catchError(() => of('❌ Something went nuts, please try again.')),
        finalize(() => this.formLoading.set(false))
      )
      .subscribe(this.formResponse.set);
  }
}

const errorMessages: { [key: string]: string } = {
  required: "This field can't be empty.",
  email: 'Please enter a valid email address.',
  minlength: 'Text is too short.',
  maxlength: 'Text is too long.',
};
