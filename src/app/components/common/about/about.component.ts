import { Component, HostBinding } from '@angular/core';
import { BorderComponent } from '@components/icons';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BorderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export default class AboutComponent {
  @HostBinding('class')
  readonly class = 'wrapper';
}
