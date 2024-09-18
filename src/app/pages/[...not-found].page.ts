import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-page-not-found',
  standalone: true,
  template: `
    <main class="content">
      <h1>Denna sida finns inte</h1>
      <button routerLink="/" class="btn">Gå till huvudsidan</button>
    </main>
  `,
  styles: `
    @use '~/colors' as *;

    :host {
      background: $blue-dark-to-light;

      main {
        height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        >h1 {
          margin-bottom: 1rem;
        }
      }
    }
  `,
  host: { class: 'wrapper' },
})
export default class PageNotFoundComponent {}
