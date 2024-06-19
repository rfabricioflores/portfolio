import { Component, HostBinding } from '@angular/core';
import BorderComponent from '@components/icons/border.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [BorderComponent],
})
export default class ContactComponent {
  @HostBinding('class')
  readonly class = 'wrapper';
}
