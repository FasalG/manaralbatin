import { ChangeDetectionStrategy, Component, ElementRef, inject, input, OnDestroy, OnInit, signal } from '@angular/core';

/** Counts from 0 to [value] once it scrolls into view. Respects reduced motion. */
@Component({
  selector: 'app-count-up',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{ display() }}{{ suffix() }}`,
})
export class CountUpComponent implements OnInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly value = input.required<number>();
  readonly suffix = input('');
  readonly duration = input(1600);

  protected readonly display = signal(0);
  private observer?: IntersectionObserver;
  private raf = 0;

  ngOnInit(): void {
    const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      this.display.set(this.value());
      return;
    }
    this.observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        this.observer?.disconnect();
        this.animate();
      }
    }, { threshold: 0.4 });
    this.observer.observe(this.host.nativeElement);
  }

  private animate(): void {
    const target = this.value();
    const start = performance.now();
    const dur = this.duration();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      this.display.set(Math.round(target * eased));
      if (t < 1) this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.raf);
  }
}
