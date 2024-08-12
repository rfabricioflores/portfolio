import { Component, OnInit, input } from '@angular/core';

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
        @switch(position()) { @case('up') {
        <linearGradient
          [id]="gradientId"
          x1="100%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B786F5" stop-opacity="0.77" />
          <stop offset="1" stop-color="#1196CF" />
        </linearGradient>
        } @case('down'){
        <linearGradient
          [id]="gradientId"
          x1="0%"
          y1="100%"
          x2="0%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B786F5" stop-opacity="0.77" />
          <stop offset="1" stop-color="#1196CF" />
        </linearGradient>
        } @case('diagonal'){
        <linearGradient
          [id]="gradientId"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B786F5" stop-opacity="0.77" />
          <stop offset="1" stop-color="#1196CF" />
        </linearGradient>
        } @case('right'){
        <linearGradient
          [id]="gradientId"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B786F5" stop-opacity="0.77" />
          <stop offset="1" stop-color="#1196CF" />
        </linearGradient>
        } @case('left') {
        <linearGradient
          [id]="gradientId"
          x1="100%"
          y1="0%"
          x2="0%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B786F5" stop-opacity="0.77" />
          <stop offset="1" stop-color="#1196CF" />
        </linearGradient>
        } @case ('reverse-diagonal') {
        <linearGradient
          [id]="gradientId"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B786F5" stop-opacity="0.77" />
          <stop offset="1" stop-color="#1196CF" />
        </linearGradient>
        } }
      </defs>
    </svg>
  `,
  styleUrl: './border.component.scss',
})
export default class BorderComponent implements OnInit {
  public strokeWidth = input(2);
  public borderRadius = input(12);
  public position = input<
    'up' | 'down' | 'diagonal' | 'reverse-diagonal' | 'right' | 'left'
  >();
  public gradientId: string = '';

  ngOnInit() {
    this.gradientId =
      'linearGradient_' + Math.random().toString(36).substring(2, 9);
  }
}
