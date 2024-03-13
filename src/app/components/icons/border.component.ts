import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-border',
  standalone: true,
  template: `
    <svg
      viewBox="0 0 462 465"
      [attr.viewBox]="'0 0 ' + width() + ' ' + height()"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="width()"
      [attr.height]="height()"
    >
      <rect
        x="0.5"
        y="0.5"
        [attr.width]="width() - 1"
        [attr.height]="height() - 1"
        rx="18.5"
        stroke="url(#paint0_linear_6_249)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6_249"
          x1="181"
          y1="0"
          x2="181"
          [attr.y2]="width()"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B786F5" stop-opacity="0.77" />
          <stop offset="1" stop-color="#1196CF" />
        </linearGradient>
      </defs>
    </svg>
  `,
})
export default class BorderComponent {
  width = input.required<number>();
  height = input.required<number>();
}
