export interface RotatableItem {
  el: Element;
  angle: number;
}

export interface Animation<T extends HTMLElement> {
  destroy(): void;
}

export class RotateAnimation<List extends HTMLElement>
  implements Animation<List>
{
  private radius = 0;
  private items: RotatableItem[] = [];
  private resizeObserver: ResizeObserver | null = null;
  private intervals: NodeJS.Timeout[] = [];

  constructor(private list: List) {
    this.list.style.opacity = '1';
    this.radius = list.offsetWidth / 2;

    const children = Array.from(list.children);

    this.items = children.map((el, index) => {
      const angle = (index / children.length) * 360;
      this.calcPosition({ el, angle });
      return { el, angle };
    });

    this.items.forEach((icon) => {
      const interval = setInterval(() => {
        icon.angle -= 5;
        if (icon.angle === 360) icon.angle = 0;
        this.calcPosition(icon);
      }, 200);
      this.intervals.push(interval);
    });

    this.resizeObserver = new ResizeObserver(
      () => (this.radius = this.list.offsetWidth / 2)
    );
    this.resizeObserver.observe(this.list);
  }

  public destroy() {
    this.resizeObserver && this.resizeObserver.disconnect();
    this.intervals.forEach((interval) => clearInterval(interval));
    this.list.style.opacity = '0';
  }

  private calcPosition({ el, angle }: RotatableItem) {
    let xPos = Math.cos((angle * Math.PI) / 180) * this.radius;
    let yPos = Math.sin((angle * Math.PI) / 180) * this.radius;
    xPos += this.radius;
    yPos += this.radius;

    const style = `left: calc(${xPos}px - ${el.clientWidth / 2}px);
    top: calc(${yPos}px - ${el.clientHeight / 2}px);`;
    el.setAttribute('style', style);
  }
}

// Refactorize this in next commit
export class ScrollAnimation<List extends HTMLElement>
  implements Animation<List>
{
  private visibleItems = 5; // Number of visible items
  private parentWidth: number;
  private itemWidth: number;
  private scrollContainer: HTMLElement;
  private items: HTMLElement[] = [];
  private animationInterval: NodeJS.Timeout | null = null;
  private scrollSpeed = 1; // Pixels per frame
  private currentPosition = 0;
  private resizeObserver: ResizeObserver | null = null;

  constructor(private list: List) {
    this.list.style.opacity = '1';
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.list);

    // Ensure the list container has the correct structure
    const scrollContainer = document.createElement('div');
    scrollContainer.classList.add('scroll-container');
    scrollContainer.append(...Array.from(this.list.children));

    this.list.appendChild(scrollContainer);
    this.scrollContainer = scrollContainer;

    this.parentWidth = this.list.offsetWidth;
    this.itemWidth = this.list.querySelectorAll('img')[0].offsetWidth || 0;

    const children = Array.from(scrollContainer.children) as HTMLImageElement[];

    // Set initial spacing
    const spacing = this.calculateSpacing();
    children.forEach((child) => {
      child.style.marginRight = `${spacing}px`;
      this.items.push(child);
    });

    this.scrollSpeed = this.parentWidth / 500;

    // Duplicate items to fill the scroll space
    this.duplicateItems(scrollContainer, spacing);

    // Start the scrolling animation
    this.startAnimation();
  }

  private handleResize() {
    this.parentWidth = this.list.offsetWidth;
    this.itemWidth = this.list.querySelectorAll('img')[0].offsetWidth || 0;

    // Recalculate spacing and restart animation
    const spacing = this.calculateSpacing();
    this.scrollContainer.innerHTML = '';
    this.scrollContainer.append(...this.items);
    this.items.forEach((item, index) => {
      if (item.getAttribute('item-type') === 'clone') {
        this.items.splice(index, 1);
        item.remove();
      }
      item.style.marginRight = `${spacing}px`;
    });
    this.duplicateItems(this.scrollContainer, spacing);
    this.currentPosition = 0;
  }

  private calculateSpacing(): number {
    return Math.max(
      (this.parentWidth - this.itemWidth * this.visibleItems) /
        (this.visibleItems - 1),
      0
    );
  }

  private duplicateItems(scrollContainer: HTMLElement, spacing: number) {
    const totalItemsNeeded =
      Math.ceil(this.parentWidth / (this.itemWidth + spacing)) * 2;

    while (scrollContainer.children.length < totalItemsNeeded) {
      this.items.forEach((item) => {
        const clone = item.cloneNode(true) as HTMLElement;
        clone.style.marginRight = `${spacing}px`;
        clone.setAttribute('item-type', 'clone');
        scrollContainer.appendChild(clone);
      });
    }
  }

  private startAnimation() {
    const totalWidth = this.scrollContainer.scrollWidth;

    this.animationInterval = setInterval(() => {
      this.currentPosition += this.scrollSpeed;

      if (this.currentPosition >= totalWidth / 2) {
        this.currentPosition = 0;
      }

      this.scrollContainer.style.transform = `translateX(-${this.currentPosition}px)`;
    }, 16); // Roughly 60fps
  }

  public destroy() {
    this.resizeObserver?.disconnect();
    if (this.animationInterval) clearInterval(this.animationInterval);

    const originalItems = this.items.filter(
      (item) => item.getAttribute('item-type') !== 'clone'
    );

    this.scrollContainer.remove();

    this.list.append(...originalItems);

    this.list.style.opacity = '0';
  }
}
