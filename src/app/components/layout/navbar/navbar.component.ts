import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CloseComponent,
  LogoComponent,
  MenuComponent,
} from '@components/icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MenuComponent, CloseComponent, LogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  host: { class: 'wrapper' },
})
export class NavbarComponent {
  public menuIsOpen = signal(false);

  public onLinkClick() {
    this.menuIsOpen() && this.menuIsOpen.set(false);
  }
}
