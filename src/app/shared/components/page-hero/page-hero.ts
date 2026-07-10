import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../core/services/i18n.service';
import { LocalizedText } from '../../../core/models/content.model';

/** Compact hero banner used at the top of every inner page. */
@Component({
  selector: 'app-page-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <header class="page-hero">
      <div class="aurora"></div>
      <div class="shell page-hero__inner">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a routerLink="/">{{ i18n.t('nav.home') }}</a>
          <span aria-hidden="true">/</span>
          <span>{{ i18n.pick(eyebrow()) }}</span>
        </nav>
        <h1>{{ i18n.pick(title()) }}</h1>
        @if (subtitle()) {
          <p>{{ i18n.pick(subtitle()!) }}</p>
        }
      </div>
    </header>
  `,
  styleUrl: './page-hero.css',
})
export class PageHeroComponent {
  protected readonly i18n = inject(I18nService);
  readonly eyebrow = input.required<LocalizedText>();
  readonly title = input.required<LocalizedText>();
  readonly subtitle = input<LocalizedText | null>(null);
}
