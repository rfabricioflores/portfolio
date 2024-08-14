import {
  afterNextRender,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export default class HeaderComponent {
  @HostBinding('class')
  readonly class = 'wrapper';

  @ViewChild('techs', { static: false }) base!: ElementRef<HTMLElement>;

  private radius: number = 0;
  private techsWAngle: {
    el: Element;
    angle: number;
  }[] = [];

  constructor() {
    afterNextRender(() => {
      this.run();
    });
  }

  private run() {
    this.radius = this.base.nativeElement.offsetWidth / 2;
    const techs = Array.from(this.base.nativeElement.children);

    techs.forEach((item, index) => {
      const angle = (index / techs.length) * 360;
      this.techsWAngle.push({ el: item, angle });
      this.calcPosition(item, angle);
    });

    this.base.nativeElement.style.opacity = '1';

    this.techsWAngle.forEach((techWAngle) => {
      setInterval(() => {
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

    const style = `left: calc(${xPos}px - ${
      el.clientWidth / 2
    }px);top:calc(${yPos}px - ${el.clientWidth / 2}px);`;
    el.setAttribute('style', style);
  }
}
