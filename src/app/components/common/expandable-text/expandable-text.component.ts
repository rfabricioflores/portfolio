import { NgClass } from '@angular/common';
import { afterNextRender, Component, ElementRef, input, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-expandable-text',
  standalone: true,
  imports: [NgClass],
  template: `
  @let expanded = isExpanded();

  <p #textContainer [ngClass]="{'expanded': expanded}">
      <ng-content/>
      {{text()}}
  </p>

  @if(showExpandButton()) {
    <span class="toggle-btn" (click)="toggle()">
    {{ expanded ? '... show less' : '... show more' }}
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
  public showExpandButton = signal(false);
  public isExpanded = signal(false);

  public text = input<string>();
  public textCont = viewChild<ElementRef<HTMLParagraphElement>>('textContainer')

  public toggle() {
    this.isExpanded.update((val) => !val);
  }

  constructor() {
    afterNextRender(() => {
      const cont = this.textCont()?.nativeElement;
      if(!cont) return;

      const hasHiddenContent = cont.scrollHeight > cont.clientHeight

      this.showExpandButton.set(hasHiddenContent);
    })
  }
}
