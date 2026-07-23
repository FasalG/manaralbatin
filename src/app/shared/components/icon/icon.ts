import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { inject } from '@angular/core';

/** Line-icon set (currentColor, 1.6 stroke). Add new icons to PATHS by key. */
const PATHS: Record<string, string> = {
  cambridge: '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="M7 10.5V15c0 1.1 2.2 2.5 5 2.5s5-1.4 5-2.5v-4.5"/><path d="M21 8v5"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v14H6.5A2.5 2.5 0 0 0 4 19.5V5.5Z"/><path d="M20 17v4H6.5A2.5 2.5 0 0 1 4 18.5"/>',
  sprout: '<path d="M12 21v-8"/><path d="M12 13c0-3 2.5-5 6-5-.5 3.5-3 5-6 5Z"/><path d="M12 13c0-2.5-2-4.5-5-4.5C7.4 11 9.5 13 12 13Z"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z"/>',
  heart: '<path d="M12 20s-7-4.4-9.3-8.3C1.2 9 2.4 6 5.4 6c1.9 0 3.1 1 2.6 1 .5 0 1.7-1 3.6-1 3 0 4.2 3 2.7 5.7C19 15.6 12 20 12 20Z"/>',
  flask: '<path d="M9 3h6"/><path d="M10 3v6l-5 8.5A2 2 0 0 0 6.7 21h10.6a2 2 0 0 0 1.7-3.5L14 9V3"/><path d="M7.5 15h9"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1.7 0 2-1.3 1.2-2.3-.8-1 0-2.2 1.3-2.2H16a5 5 0 0 0 5-5c0-4.4-4-8.5-9-8.5Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="16" cy="11" r="1"/>',
  laptop: '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 20h20"/>',
  ball: '<circle cx="12" cy="12" r="9"/><path d="m12 7 4 3-1.5 4.7h-5L8 10l4-3Z"/><path d="M12 3v4M4.5 9l3.5 1M19.5 9 16 10M7 20l1.7-5M17 20l-1.7-5"/>',
  bus: '<rect x="4" y="4" width="16" height="12" rx="2"/><path d="M4 10h16"/><path d="M6 20v-1M18 20v-1"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="16" r="1"/>',
  library: '<path d="M4 4h6v16H4z"/><path d="M14 4h6v16h-6z"/><path d="M4 9h6M14 9h6"/>',
  clinic: '<path d="M5 8h14v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8Z"/><path d="M9 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/><path d="M12 11v5M9.5 13.5h5"/>',
  trophy: '<path d="M8 4h8v4a4 4 0 0 1-8 0V4Z"/><path d="M8 5H5v1a3 3 0 0 0 3 3M16 5h3v1a3 3 0 0 1-3 3"/><path d="M12 12v4M9 20h6M10 20l.5-4M14 20l-.5-4"/>',
  graduation: '<path d="M12 4 2 9l10 5 10-5-10-5Z"/><path d="M6 11v4c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-4"/>',
  star: '<path d="m12 3 2.6 5.6 6.1.7-4.5 4.1 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7L12 3Z"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.5a3 3 0 0 1 0 5.6M20.5 20a5.5 5.5 0 0 0-4-5.3"/>',
  phone: '<path d="M4 5c0-1 .8-2 2-2h1.5c.5 0 .9.3 1 .8l.8 3c.1.5-.1.9-.5 1.2L8 9.3a11 11 0 0 0 5 5l1.3-1.8c.3-.4.7-.6 1.2-.5l3 .8c.5.1.8.5.8 1V16c0 1.1-1 2-2 2A15 15 0 0 1 4 5Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  pin: '<path d="M12 21s-6.5-5.4-6.5-10.3A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.7C18.5 15.6 12 21 12 21Z"/><circle cx="12" cy="10.5" r="2.3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  music: '<path d="M9 18V6l10-2v11"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="15" r="2.5"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5-6-3.5Z"/>',
  download: '<path d="M12 4v10m0 0 4-4m-4 4-4-4"/><path d="M5 19h14"/>',
  whatsapp: '<path d="M4 20l1.4-4A8 8 0 1 1 9 19.2L4 20Z"/><path d="M9 9c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1l-1.4-1-1.2.8c-1-.5-1.9-1.4-2.4-2.4l.8-1.2-1-1.4c-.5 0-1 .4-1 1Z" fill="currentColor" stroke="none"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
};

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
    [style.width.px]="size()" [style.height.px]="size()" [innerHTML]="svg()"></svg>`,
  host: { style: 'display:inline-flex' },
})
export class IconComponent {
  private readonly sanitizer = inject(DomSanitizer);
  readonly name = input.required<string>();
  readonly size = input(24);

  protected readonly svg = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(PATHS[this.name()] ?? PATHS['star']),
  );
}
