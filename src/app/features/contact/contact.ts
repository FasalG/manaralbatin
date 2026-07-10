import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { ContentService } from '../../core/services/content.service';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero';
import { IconComponent } from '../../shared/components/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageHeroComponent, IconComponent, RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactPage {
  protected readonly i18n = inject(I18nService);
  private readonly content = inject(ContentService);
  protected readonly school = computed(() => this.content.content().school);
  protected readonly whatsappLink = computed(() => `https://wa.me/${this.school().whatsapp}`);
}
