import {
  afterNextRender,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

export interface TechIcon {
  el: Element;
  angle: number;
}

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: { class: 'wrapper' },
})
export default class HeaderComponent implements OnDestroy {
  @ViewChild('techs')
  private base!: ElementRef<HTMLElement>;
  private radius = 0;
  private icons: TechIcon[] = [];
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    afterNextRender(() => {
      this.run();
      this.resizeObserver = new ResizeObserver(
        () => (this.radius = this.base.nativeElement.offsetWidth / 2)
      );
      this.resizeObserver.observe(this.base.nativeElement);
    });
  }

  ngOnDestroy() {
    this.resizeObserver && this.resizeObserver.disconnect();
  }

  private run() {
    this.radius = this.base.nativeElement.offsetWidth / 2;
    const children = Array.from(this.base.nativeElement.children);

    this.icons = children.map((el, index) => {
      const angle = (index / children.length) * 360;
      this.calcPosition({ el, angle });
      return { el, angle };
    });

    this.base.nativeElement.style.opacity = '1';

    this.icons.forEach((icon) => {
      setInterval(() => {
        icon.angle -= 5;
        if (icon.angle === 360) icon.angle = 0;
        this.calcPosition(icon);
      }, 200);
    });
  }

  private calcPosition({ el, angle }: TechIcon) {
    let xPos = Math.cos((angle * Math.PI) / 180) * this.radius;
    let yPos = Math.sin((angle * Math.PI) / 180) * this.radius;
    xPos += this.radius;
    yPos += this.radius;

    const style = `left: calc(${xPos}px - ${el.clientWidth / 2}px);
    top: calc(${yPos}px - ${el.clientHeight / 2}px);`;
    el.setAttribute('style', style);
  }
}
