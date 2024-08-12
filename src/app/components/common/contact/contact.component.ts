import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, inject, signal } from '@angular/core';
import { BorderComponent } from '@components/icons';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [BorderComponent, ReactiveFormsModule],
})
export default class ContactComponent {
  @HostBinding('class')
  readonly class = 'wrapper';

  private http = inject(HttpClient);
  private formBuilder = inject(FormBuilder);

  public contactForm!: FormGroup;
  public isLoading = signal(false);
  public message = signal<string | null>(null);

  constructor() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
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
