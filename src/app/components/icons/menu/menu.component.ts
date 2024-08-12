import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-menu',
  standalone: true,
  template: `<svg
    width="100%"
    height="100%"
    viewBox="0 0 31 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 2H29M2 11.5H29M29 21H2"
      stroke="white"
      stroke-width="3"
      stroke-miterlimit="16"
      stroke-linecap="round"
    />
  </svg>`,
})
export default class MenuComponent {}
