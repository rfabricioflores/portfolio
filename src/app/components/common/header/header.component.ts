import {
  afterNextRender,
  Component,
  ElementRef,
  OnDestroy,
  viewChild,
} from '@angular/core';
import { RotateAnimation, ScrollAnimation, Animation } from './animation';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: { class: 'wrapper' },
})
export default class HeaderComponent implements OnDestroy {
  private iconListRef = viewChild.required<ElementRef<HTMLElement>>('techs');
  private animation: Animation<HTMLElement> | null = null;

  constructor() {
    afterNextRender(() => {
      const mediaQuery = window.matchMedia('(max-width: 1023px)');
      this.handleResonsiveAnimation(mediaQuery.matches);

      mediaQuery.addEventListener('change', (event) => {
        this.handleResonsiveAnimation(event.matches);
      });
    });
  }

  handleResonsiveAnimation(isMobile: boolean) {
    if (isMobile) {
      this.animation?.destroy();
      this.animation = new ScrollAnimation(this.iconListRef().nativeElement);
    } else {
      this.animation?.destroy();
      this.animation = new RotateAnimation(this.iconListRef().nativeElement);
    }
  }

  ngOnDestroy() {
    this.animation?.destroy();
  }
}
