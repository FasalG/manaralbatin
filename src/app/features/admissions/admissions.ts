import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero';
import { IconComponent } from '../../shared/components/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-admissions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageHeroComponent, IconComponent, RevealDirective],
  templateUrl: './admissions.html',
  styleUrl: './admissions.css',
})
export class AdmissionsPage {
  protected readonly i18n = inject(I18nService);

  protected readonly steps = [
    { icon: 'book', title: { en: 'Review fees & requirements', ar: 'اطّلع على الرسوم والمتطلبات' }, text: { en: 'See the fee structure and the documents you will need.', ar: 'اطّلع على الرسوم والمستندات المطلوبة.' } },
    { icon: 'mail', title: { en: 'Submit an enquiry', ar: 'أرسل طلب التسجيل' }, text: { en: 'Complete the short registration form online.', ar: 'أكمل نموذج التسجيل القصير عبر الإنترنت.' } },
    { icon: 'phone', title: { en: 'We contact you', ar: 'نتواصل معك' }, text: { en: 'Our admissions team calls to guide your next steps.', ar: 'يتصل بك فريق القبول لإرشادك للخطوات التالية.' } },
    { icon: 'graduation', title: { en: 'Confirm enrolment', ar: 'تأكيد التسجيل' }, text: { en: 'Complete documents and secure your child\'s place.', ar: 'أكمل المستندات واحجز مقعد طفلك.' } },
  ];
}
