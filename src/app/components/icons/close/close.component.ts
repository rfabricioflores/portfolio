import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-close',
  standalone: true,
  template: `
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2L22 22M22 2L2 22"
        stroke="white"
        stroke-width="3"
        stroke-miterlimit="16"
        stroke-linecap="round"
      />
    </svg>
  `,
})
export default class CloseComponent {}
