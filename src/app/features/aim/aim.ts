import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { ContentService } from '../../core/services/content.service';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero';
import { IconComponent } from '../../shared/components/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-aim',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeroComponent, IconComponent, RevealDirective],
  templateUrl: './aim.html',
  styleUrl: './aim.css',
})
export class AimPage {
  protected readonly i18n = inject(I18nService);
  private readonly content = inject(ContentService);
  protected readonly aim = computed(() => this.content.content().aim);
  protected readonly valueIcons = ['trophy', 'heart', 'shield', 'sprout'];
}
