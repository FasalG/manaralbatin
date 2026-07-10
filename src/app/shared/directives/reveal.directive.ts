import { Directive, ElementRef, inject, input, OnDestroy, OnInit } from '@angular/core';

/**
 * Reveals an element on scroll by adding `.is-in` (see global styles).
 * Usage: <div appReveal [revealDelay]="120">…</div>
 */
@Directive({
  selector: '[appReveal]',
  host: { '[attr.data-reveal]': '""', '[style.--reveal-delay.ms]': 'revealDelay()' },
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  readonly revealDelay = input(0);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.el.nativeElement.classList.add('is-in');
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
