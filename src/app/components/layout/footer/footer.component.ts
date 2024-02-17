import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="content">
      <p>Fabricio's cool portfolio</p>
    </footer>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class FooterComponent {
  @HostBinding('class')
  readonly class = 'wrapper';
}
