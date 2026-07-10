import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../core/services/i18n.service';
import { ContentService } from '../../../core/services/content.service';
import { LogoComponent } from '../logo/logo';
import { IconComponent } from '../icon/icon';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LogoComponent, IconComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  protected readonly i18n = inject(I18nService);
  private readonly content = inject(ContentService);

  protected readonly school = computed(() => this.content.content().school);
  protected readonly year = 2026;

  protected readonly links = [
    { key: 'nav.about', path: '/about' },
    { key: 'nav.academics', path: '/academics' },
    { key: 'nav.facilities', path: '/facilities' },
    { key: 'nav.gallery', path: '/gallery' },
    { key: 'nav.admissions', path: '/admissions' },
    { key: 'nav.resources', path: '/resources' },
    { key: 'nav.contact', path: '/contact' },
  ];
}
