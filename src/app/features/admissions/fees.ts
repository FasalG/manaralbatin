import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { ContentService } from '../../core/services/content.service';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero';
import { IconComponent } from '../../shared/components/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-fees',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageHeroComponent, IconComponent, RevealDirective],
  templateUrl: './fees.html',
  styleUrl: './fees.css',
})
export class FeesPage {
  protected readonly i18n = inject(I18nService);
  private readonly content = inject(ContentService);
  protected readonly fees = computed(() => this.content.content().fees);
  protected readonly school = computed(() => this.content.content().school);
}
