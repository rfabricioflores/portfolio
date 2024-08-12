import { Component, HostBinding, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CloseComponent, MenuComponent } from '@components/icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MenuComponent, CloseComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @HostBinding('class')
  readonly class = 'wrapper';

  public menuIsOpen = signal(false);

  public onLinkClick() {
    this.menuIsOpen() && this.menuIsOpen.set(false);
  }
}
