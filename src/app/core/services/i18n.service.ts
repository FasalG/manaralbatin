import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Lang, LocalizedText } from '../models/content.model';

/** UI strings that are not part of editable content (nav, buttons, labels). */
const UI: Record<string, LocalizedText> = {
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.about': { en: 'About', ar: 'من نحن' },
  'nav.academics': { en: 'Academics', ar: 'البرامج الأكاديمية' },
  'nav.faculty': { en: 'Faculty', ar: 'هيئة التدريس' },
  'nav.facilities': { en: 'Facilities', ar: 'المرافق' },
  'nav.gallery': { en: 'Gallery', ar: 'معرض الصور' },
  'nav.admissions': { en: 'Admissions', ar: 'القبول والتسجيل' },
  'nav.contact': { en: 'Contact', ar: 'اتصل بنا' },
  'nav.resources': { en: 'Downloads', ar: 'التحميلات' },
  'nav.apply': { en: 'Apply Now', ar: 'سجّل الآن' },
  'nav.menu': { en: 'Menu', ar: 'القائمة' },

  'cta.explore': { en: 'Explore', ar: 'استكشف' },
  'cta.learnMore': { en: 'Learn more', ar: 'اقرأ المزيد' },
  'cta.viewAll': { en: 'View all', ar: 'عرض الكل' },
  'cta.readMore': { en: 'Read more', ar: 'المزيد' },
  'cta.startRegistration': { en: 'Start Registration', ar: 'ابدأ التسجيل' },
  'cta.viewFees': { en: 'View Fee Structure', ar: 'رسوم الدراسة' },
  'cta.viewRequirements': { en: 'View Requirements', ar: 'متطلبات القبول' },
  'cta.back': { en: 'Back', ar: 'رجوع' },
  'cta.submit': { en: 'Submit Enquiry', ar: 'إرسال الطلب' },
  'cta.callUs': { en: 'Call us', ar: 'اتصل بنا' },
  'cta.getDirections': { en: 'Get directions', ar: 'الوصول إلينا' },
  'cta.download': { en: 'Download', ar: 'تحميل' },

  'lang.toggle': { en: 'العربية', ar: 'English' },

  'home.why.eyebrow': { en: 'Why families choose us', ar: 'لماذا تختارنا العائلات' },
  'home.facilities.eyebrow': { en: 'Campus & facilities', ar: 'الحرم والمرافق' },
  'home.accred.eyebrow': { en: 'Recognised standards', ar: 'اعتمادات ومعايير' },
  'home.stats.eyebrow': { en: 'Our record', ar: 'إنجازاتنا' },
  'home.faculty.eyebrow': { en: 'Meet our educators', ar: 'تعرّف على معلمينا' },
  'home.principal.eyebrow': { en: 'A word from our principal', ar: 'كلمة مدير المدرسة' },

  'academics.title': { en: 'Academic Programme', ar: 'البرنامج الأكاديمي' },
  'academics.grades': { en: 'Grades & stages', ar: 'المراحل والصفوف' },
  'academics.calendar': { en: 'Academic Calendar', ar: 'التقويم الدراسي' },
  'academics.age': { en: 'Ages', ar: 'الأعمار' },

  'admissions.title': { en: 'Admissions', ar: 'القبول والتسجيل' },
  'admissions.fees': { en: 'Fee Structure', ar: 'الرسوم الدراسية' },
  'admissions.requirements': { en: 'Registration Requirements', ar: 'متطلبات التسجيل' },
  'admissions.register': { en: 'Registration Enquiry', ar: 'طلب تسجيل' },
  'admissions.intro': {
    en: 'Please review the fee structure and requirements, then submit an enquiry. Our admissions team will contact you shortly.',
    ar: 'يرجى الاطلاع على الرسوم والمتطلبات ثم إرسال الطلب، وسيتواصل معك فريق القبول قريباً.',
  },

  'form.studentName': { en: "Student's full name", ar: 'اسم الطالب الكامل' },
  'form.dob': { en: 'Date of birth', ar: 'تاريخ الميلاد' },
  'form.grade': { en: 'Grade applying for', ar: 'الصف المطلوب' },
  'form.gender': { en: 'Gender', ar: 'الجنس' },
  'form.male': { en: 'Male', ar: 'ذكر' },
  'form.female': { en: 'Female', ar: 'أنثى' },
  'form.parentName': { en: "Parent / guardian name", ar: 'اسم ولي الأمر' },
  'form.phone': { en: 'Phone / WhatsApp', ar: 'الجوال / واتساب' },
  'form.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'form.nationality': { en: 'Nationality', ar: 'الجنسية' },
  'form.previousSchool': { en: 'Previous school (optional)', ar: 'المدرسة السابقة (اختياري)' },
  'form.message': { en: 'Message (optional)', ar: 'ملاحظات (اختياري)' },
  'form.select': { en: 'Please select', ar: 'اختر' },
  'form.required': { en: 'This field is required', ar: 'هذا الحقل مطلوب' },
  'form.invalidEmail': { en: 'Enter a valid email', ar: 'أدخل بريداً صحيحاً' },
  'form.invalidPhone': { en: 'Enter a valid phone number', ar: 'أدخل رقم هاتف صحيح' },
  'form.searchCountry': { en: 'Search country', ar: 'ابحث عن الدولة' },
  'form.noCountry': { en: 'No matches', ar: 'لا توجد نتائج' },
  'form.success': {
    en: 'Thank you! Your enquiry has been received. Our admissions team will contact you soon.',
    ar: 'شكراً لك! تم استلام طلبك وسيتواصل معك فريق القبول قريباً.',
  },
  'form.sending': { en: 'Sending…', ar: 'جارٍ الإرسال…' },

  'footer.quickLinks': { en: 'Quick links', ar: 'روابط سريعة' },
  'footer.contact': { en: 'Get in touch', ar: 'تواصل معنا' },
  'footer.visit': { en: 'Visit us', ar: 'زورونا' },
  'footer.rights': { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
  'footer.admin': { en: 'Staff login', ar: 'دخول الموظفين' },
  'footer.tagline': {
    en: 'Building confident, curious, capable learners with a Cambridge education.',
    ar: 'نبني متعلمين واثقين وفضوليين وقادرين عبر تعليم كامبريدج.',
  },

  'admin.title': { en: 'Admin Dashboard', ar: 'لوحة التحكم' },
  'admin.login': { en: 'Staff Login', ar: 'تسجيل دخول الموظفين' },
  'admin.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'admin.password': { en: 'Password', ar: 'كلمة المرور' },
  'admin.signIn': { en: 'Sign in', ar: 'تسجيل الدخول' },
  'admin.signOut': { en: 'Sign out', ar: 'تسجيل الخروج' },
  'admin.enquiries': { en: 'Registration enquiries', ar: 'طلبات التسجيل' },
  'admin.noEnquiries': { en: 'No enquiries yet.', ar: 'لا توجد طلبات بعد.' },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly doc = inject(DOCUMENT);

  readonly lang = signal<Lang>(this.readInitial());
  readonly dir = computed<'ltr' | 'rtl'>(() => (this.lang() === 'ar' ? 'rtl' : 'ltr'));
  readonly isRtl = computed(() => this.lang() === 'ar');

  constructor() {
    // Keep <html lang/dir> and storage in sync with the signal.
    effect(() => {
      const l = this.lang();
      const root = this.doc.documentElement;
      root.setAttribute('lang', l);
      root.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
      try { localStorage.setItem('mab-lang', l); } catch { /* SSR / private mode */ }
    });
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
  }

  toggle(): void {
    this.lang.update((l) => (l === 'en' ? 'ar' : 'en'));
  }

  /** Translate a UI key for the active language. */
  t(key: string): string {
    return UI[key]?.[this.lang()] ?? key;
  }

  /** Pick the active-language string from an editable bilingual field. */
  pick(text: LocalizedText | undefined): string {
    if (!text) return '';
    return text[this.lang()] || text.en || '';
  }

  private readInitial(): Lang {
    try {
      const saved = localStorage.getItem('mab-lang');
      if (saved === 'ar' || saved === 'en') return saved;
    } catch { /* ignore */ }
    return 'en';
  }
}
