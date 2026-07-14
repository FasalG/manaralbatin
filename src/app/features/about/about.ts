import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { ContentService } from '../../core/services/content.service';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero';
import { IconComponent } from '../../shared/components/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ImgFallbackDirective } from '../../shared/directives/img-fallback.directive';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageHeroComponent, IconComponent, RevealDirective, ImgFallbackDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutPage {
  protected readonly i18n = inject(I18nService);
  private readonly content = inject(ContentService);

  protected readonly c = computed(() => this.content.content());
  protected readonly about = computed(() => this.c().about);
  protected readonly school = computed(() => this.c().school);
  protected readonly stats = computed(() => this.c().stats);
  protected readonly principal = computed(() => this.c().principalMessage);
  protected readonly director = computed(() => this.c().directorMessage);
}
