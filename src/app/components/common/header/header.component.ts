import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export default class HeaderComponent {
  @HostBinding('class')
  readonly class = 'wrapper';
}
