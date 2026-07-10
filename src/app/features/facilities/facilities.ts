import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { ContentService } from '../../core/services/content.service';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero';
import { IconComponent } from '../../shared/components/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ImgFallbackDirective } from '../../shared/directives/img-fallback.directive';

@Component({
  selector: 'app-facilities',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageHeroComponent, IconComponent, RevealDirective, ImgFallbackDirective],
  templateUrl: './facilities.html',
  styleUrl: './facilities.css',
})
export class FacilitiesPage {
  protected readonly i18n = inject(I18nService);
  private readonly content = inject(ContentService);
  protected readonly facilities = computed(() => this.content.content().facilities);
}
