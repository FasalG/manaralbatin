import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { ContentService } from '../../core/services/content.service';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero';
import { IconComponent } from '../../shared/components/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { GradeLevel } from '../../core/models/content.model';

@Component({
  selector: 'app-academics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageHeroComponent, IconComponent, RevealDirective],
  templateUrl: './academics.html',
  styleUrl: './academics.css',
})
export class AcademicsPage {
  protected readonly i18n = inject(I18nService);
  private readonly content = inject(ContentService);

  protected readonly grades = computed(() => this.content.content().grades);
  protected readonly calendar = computed(() => this.content.content().calendar);

  protected readonly stages = computed(() => {
    const g = this.grades();
    return [
      { key: 'kg', label: { en: 'Kindergarten', ar: 'رياض الأطفال' }, note: { en: 'KG1 – KG2 · Ages 3–5', ar: 'روضة 1–2 · 3–5 سنوات' }, items: g.filter((x) => x.code.startsWith('KG')) },
      { key: 'primary', label: { en: 'Primary', ar: 'الابتدائية' }, note: { en: 'Grade 1 – 6 · Ages 6–11', ar: 'الصف 1–6 · 6–11 سنة' }, items: g.filter((x) => /^G[1-6]$/.test(x.code)) },
      { key: 'secondary', label: { en: 'Lower Secondary', ar: 'المتوسطة' }, note: { en: 'Grade 7 – 9 · Ages 12–14', ar: 'الصف 7–9 · 12–14 سنة' }, items: g.filter((x) => /^G[7-9]$/.test(x.code)) },
    ];
  });

  protected typeLabel(type: string): { en: string; ar: string } {
    const map: Record<string, { en: string; ar: string }> = {
      term: { en: 'Term', ar: 'فصل' },
      holiday: { en: 'Holiday', ar: 'إجازة' },
      exam: { en: 'Exams', ar: 'اختبارات' },
      event: { en: 'Event', ar: 'فعالية' },
    };
    return map[type] ?? map['event'];
  }

  protected trackGrade = (_: number, g: GradeLevel) => g.code;
}
