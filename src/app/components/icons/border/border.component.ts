import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-icon-border',
  standalone: true,
  template: `
    <svg
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        [attr.x]="strokeWidth() / 2"
        [attr.y]="strokeWidth() / 2"
        [attr.rx]="borderRadius()"
        [attr.stroke]="'url(#' + gradientId + ')'"
        [attr.stroke-width]="strokeWidth()"
        width="100%"
        height="100%"
        [style]="{
          width: 'calc(100% - ' + strokeWidth() + 'px)',
          height: 'calc(100% - ' + strokeWidth() + 'px)'
        }"
      />
      <defs>
        @let position = gradientPosition();
        <linearGradient
          [id]="gradientId"
          [attr.x1]="position.x1 + '%'"
          [attr.y1]="position.y1 + '%'"
          [attr.x2]="position.x2 + '%'"
          [attr.y2]="position.y2 + '%'"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B786F5" stop-opacity="0.77" />
          <stop offset="1" stop-color="#1196CF" />
        </linearGradient>
      </defs>
    </svg>
  `,
  styleUrl: './border.component.scss',
})
export default class BorderComponent {
  public strokeWidth = input(2);
  public borderRadius = input(12);
  public position = input<
    'up' | 'down' | 'diagonal' | 'reverse-diagonal' | 'right' | 'left'
  >();

  readonly gradientId =
    'linearGradient_' + Math.random().toString(36).substring(2, 9);

  readonly gradientPosition = computed<GradientPosition>(() => {
    switch (this.position()) {
      case 'up':
        return { x1: 100, x2: 100, y1: 0, y2: 100 };

      case 'down':
        return { x1: 0, x2: 0, y1: 100, y2: 0 };

      case 'diagonal':
        return { x1: 0, x2: 100, y1: 0, y2: 100 };

      case 'right':
        return { x1: 0, x2: 100, y1: 0, y2: 0 };

      case 'left':
        return { x1: 100, x2: 0, y1: 0, y2: 0 };

      case 'reverse-diagonal':
        return { x1: 0, x2: 100, y1: 100, y2: 0 };

      default:
        return { x1: 100, x2: 100, y1: 0, y2: 100 };
    }
  });
}

interface GradientPosition {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}
