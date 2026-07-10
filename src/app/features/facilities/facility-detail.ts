import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { ContentService } from '../../core/services/content.service';
import { IconComponent } from '../../shared/components/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ImgFallbackDirective } from '../../shared/directives/img-fallback.directive';

@Component({
  selector: 'app-facility-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, RevealDirective, ImgFallbackDirective],
  templateUrl: './facility-detail.html',
  styleUrl: './facility-detail.css',
})
export class FacilityDetailPage {
  protected readonly i18n = inject(I18nService);
  private readonly content = inject(ContentService);

  /** Bound from the `:slug` route param via withComponentInputBinding(). */
  readonly slug = input<string>('');

  protected readonly facility = computed(() =>
    this.content.content().facilities.find((f) => f.slug === this.slug()) ?? null,
  );

  protected readonly others = computed(() =>
    this.content.content().facilities.filter((f) => f.slug !== this.slug()).slice(0, 3),
  );
}
