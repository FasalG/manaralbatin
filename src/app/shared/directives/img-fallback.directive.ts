import { Directive, ElementRef, inject, input, OnChanges } from '@angular/core';

/** A branded SVG placeholder shown until real photos are dropped into assets. */
const PLACEHOLDER =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0b4f8a"/><stop offset="1" stop-color="#2f9e6b"/>
      </linearGradient></defs>
      <rect width="800" height="600" fill="url(#g)"/>
      <g fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="10" stroke-linejoin="round">
        <path d="M330 250h140l-70 40-70-40Z"/>
        <path d="M330 250v70c0 18 34 32 70 32s70-14 70-32v-70"/>
      </g>
      <text x="400" y="430" fill="#ffffff" fill-opacity="0.85" font-family="sans-serif"
        font-size="30" font-weight="700" text-anchor="middle">Manar Al Batin</text>
    </svg>`,
  );

/**
 * Binds an image with a graceful fallback:  <img [appImg]="path" alt="…">
 * If the file is missing, shows a branded placeholder instead of a broken icon.
 */
@Directive({
  selector: 'img[appImg]',
  host: {
    loading: 'lazy',
    decoding: 'async',
    '(error)': 'onError()',
  },
})
export class ImgFallbackDirective implements OnChanges {
  private readonly el = inject(ElementRef<HTMLImageElement>);
  readonly appImg = input<string>('');
  private failed = false;

  ngOnChanges(): void {
    this.failed = false;
    this.el.nativeElement.src = this.appImg() || PLACEHOLDER;
  }

  protected onError(): void {
    if (this.failed) return;
    this.failed = true;
    this.el.nativeElement.src = PLACEHOLDER;
  }
}
