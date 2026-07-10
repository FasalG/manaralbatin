import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { ContentService } from '../../core/services/content.service';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ImgFallbackDirective } from '../../shared/directives/img-fallback.directive';
import { LocalizedText } from '../../core/models/content.model';

type Filter = 'all' | 'campus' | 'classroom' | 'activities' | 'events';

@Component({
  selector: 'app-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeroComponent, RevealDirective, ImgFallbackDirective],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class GalleryPage {
  protected readonly i18n = inject(I18nService);
  private readonly content = inject(ContentService);

  protected readonly active = signal<Filter>('all');

  protected readonly filters: { key: Filter; label: LocalizedText }[] = [
    { key: 'all', label: { en: 'All', ar: 'الكل' } },
    { key: 'campus', label: { en: 'Campus', ar: 'الحرم' } },
    { key: 'classroom', label: { en: 'Classrooms', ar: 'الفصول' } },
    { key: 'activities', label: { en: 'Activities', ar: 'الأنشطة' } },
    { key: 'events', label: { en: 'Events', ar: 'الفعاليات' } },
  ];

  protected readonly images = computed(() => {
    const all = this.content.content().gallery;
    const f = this.active();
    return f === 'all' ? all : all.filter((g) => g.category === f);
  });

  protected setFilter(f: Filter): void {
    this.active.set(f);
  }
}
