import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/layout/footer/footer.component';
import { NavbarComponent } from '@components/layout/navbar/navbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <router-outlet />
    <app-footer />
  `,
})
export class AppComponent {}
