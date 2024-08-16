import {
  afterNextRender,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export default class HeaderComponent implements OnDestroy {
  @HostBinding('class')
  readonly class = 'wrapper';

  @ViewChild('techs') base!: ElementRef<HTMLElement>;

  private radius: number = 0;
  private techsWAngle: {
    el: Element;
    angle: number;
  }[] = [];
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    afterNextRender(() => {
      this.run();
      this.resizeObserver = new ResizeObserver(() => {
        this.radius = this.base.nativeElement.offsetWidth / 2;
      });
      this.resizeObserver.observe(this.base.nativeElement);
    });
  }

  ngOnDestroy() {
    this.resizeObserver && this.resizeObserver.disconnect();
  }

  private run() {
    this.techsWAngle = [];
    const icons = Array.from(this.base.nativeElement.children);
    this.radius = this.base.nativeElement.offsetWidth / 2;

    icons.forEach((item, index) => {
      const angle = (index / icons.length) * 360;
      this.techsWAngle.push({ el: item, angle });
      this.calcPosition(item, angle);
    });

    this.base.nativeElement.style.opacity = '1';

    this.techsWAngle.forEach((techWAngle) => {
      const interval = setInterval(() => {
        techWAngle.angle -= 5;
        if (techWAngle.angle === 360) {
          techWAngle.angle = 0;
        }
        this.calcPosition(techWAngle.el, techWAngle.angle);
      }, 200);
    });
  }

  private calcPosition(el: Element, angle: number) {
    let xPos = Math.cos((angle * Math.PI) / 180) * this.radius;
    let yPos = Math.sin((angle * Math.PI) / 180) * this.radius;
    xPos += this.radius;
    yPos += this.radius;

    const style = `left: calc(${xPos}px - ${el.clientWidth / 2}px);
    top: calc(${yPos}px - ${el.clientHeight / 2}px);`;
    el.setAttribute('style', style);
  }
}
