import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { ContentService } from '../../core/services/content.service';
import { IconComponent } from '../../shared/components/icon/icon';
import { CountUpComponent } from '../../shared/components/count-up/count-up';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ImgFallbackDirective } from '../../shared/directives/img-fallback.directive';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, CountUpComponent, RevealDirective, ImgFallbackDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomePage {
  protected readonly i18n = inject(I18nService);
  private readonly content = inject(ContentService);

  protected readonly c = computed(() => this.content.content());
  protected readonly hero = computed(() => this.c().hero);
  protected readonly school = computed(() => this.c().school);
  protected readonly stats = computed(() => this.c().stats);
  protected readonly features = computed(() => this.c().features);
  protected readonly facilities = computed(() => this.c().facilities.slice(0, 4));
  protected readonly accreditations = computed(() => this.c().accreditations);
  protected readonly principal = computed(() => this.c().principalMessage);
}
