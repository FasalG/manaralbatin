import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { ContentService } from '../../core/services/content.service';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero';
import { IconComponent } from '../../shared/components/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ImgFallbackDirective } from '../../shared/directives/img-fallback.directive';

@Component({
  selector: 'app-faculty',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeroComponent, IconComponent, RevealDirective, ImgFallbackDirective],
  templateUrl: './faculty.html',
  styleUrl: './faculty.css',
})
export class FacultyPage {
  protected readonly i18n = inject(I18nService);
  private readonly content = inject(ContentService);
  protected readonly faculty = computed(() => this.content.content().faculty);
  protected readonly leadership = computed(() => this.content.content().principalMessage);
}
