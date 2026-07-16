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
  protected readonly director = computed(() => this.c().directorMessage);

  /** Director + principal rendered through one card pattern. View-model only. */
  protected readonly leaders = computed(() => [this.director()]);

  /** The "at a glance" strip — presentation-only view of existing school info. */
  protected readonly glance = computed(() => {
    const school = this.c().school;
    return [
      {
        icon: 'cambridge',
        tint: 'var(--joy-sky)',
        label: { en: 'Curriculum', ar: 'المنهج' },
        value: school.curriculum,
      },
      {
        icon: 'graduation',
        tint: 'var(--joy-grape)',
        label: { en: 'Grades', ar: 'الصفوف' },
        value: { en: 'KG2 – Grade 9', ar: 'روضة – الصف التاسع' },
      },
      {
        icon: 'globe',
        tint: 'var(--joy-mint)',
        label: { en: 'Languages', ar: 'اللغات' },
        value: { en: 'English · Arabic', ar: 'إنجليزي · عربي' },
      },
      {
        icon: 'clock',
        tint: 'var(--joy-coral)',
        label: { en: 'Established', ar: 'التأسيس' },
        value: { en: school.established, ar: school.established },
      },
    ];
  });
}
