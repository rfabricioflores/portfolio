import { NgClass } from '@angular/common';
import { afterNextRender, Component, ElementRef, input, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-expandable-text',
  standalone: true,
  imports: [NgClass],
  template: `
  @let expanded = isExpanded();

  <p #textElement [ngClass]="{'expanded': expanded}">
    <ng-content/>
    {{text()}}
  </p>

  @if(hasHiddenContent()) {
    <span class="toggle-btn" (click)="toggle()">
      {{ expanded ? 'show less' : '... show more' }}
    </span>
  }
  `,
  styles: `
  :host {
    display: block;

    >span {
      margin-top: .3rem;
      font-size: .85rem;
      display: block;
      cursor: pointer;
    }

    >p {
      color: #D1D1D1;
      display: -webkit-box;
      display: -moz-box;
      line-clamp: 2;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: all 0.3s ease;

      &.expanded {
        display: block;
        line-clamp: unset;
        -webkit-line-clamp: unset;
      }
    }
  }

  `,
})
export default class ExpandableText {
  public text = input<string>();
  public hasHiddenContent = signal(false);
  public isExpanded = signal(false);

  public textElementRef = viewChild.required<ElementRef<HTMLParagraphElement>>('textElement')
  private observer: ResizeObserver | null = null;

  public toggle() {
    this.textElementRef().nativeElement.setAttribute('trigger', 'toggle');
    this.isExpanded.update((val) => !val);
  }

  constructor() {
    afterNextRender(() => {
      // Observe text element for changes
      this.observer = new ResizeObserver((entries) => {
        const textEl = entries[0].target;
        const isFromToggle = textEl.getAttribute('trigger') === 'toggle';

        if(isFromToggle) return textEl.removeAttribute('trigger');

        this.isExpanded.set(false); // Reset the state
        this.hasHiddenContent.set(textEl.scrollHeight > textEl.clientHeight);
      });
      this.observer.observe(this.textElementRef().nativeElement);
    })
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
