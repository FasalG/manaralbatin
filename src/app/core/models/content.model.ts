/**
 * Content models. Every editable piece of text is bilingual (`en` + `ar`) so
 * the admin can maintain both languages from one dashboard, and the site
 * renders the active language via I18nService.pick().
 */

export type Lang = 'en' | 'ar';

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface CtaLink {
  label: LocalizedText;
  path: string;
}

export interface SchoolInfo {
  name: LocalizedText;
  shortName: LocalizedText;
  tagline: LocalizedText;
  logoUrl: string;           // uploaded logo; empty = use the built-in SVG crest
  established: string;        // e.g. "1985"
  curriculum: LocalizedText;  // e.g. "Cambridge Pathway"
  phone: string;
  whatsapp: string;
  email: string;
  address: LocalizedText;
  mapUrl: string;
  social: { facebook: string; instagram: string; twitter: string; youtube: string };
}

export interface Hero {
  badge: LocalizedText;       // "Admissions open 2026–2027"
  title: LocalizedText;
  highlight: LocalizedText;   // emphasised word in the title
  subtitle: LocalizedText;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  image: string;              // asset path
}

export interface Stat {
  value: number;
  suffix: string;             // "+", "%", ""
  label: LocalizedText;
}

export interface Feature {
  icon: string;               // inline svg key
  title: LocalizedText;
  text: LocalizedText;
}

export interface FacilityItem {
  slug: string;
  icon: string;
  title: LocalizedText;
  summary: LocalizedText;
  body: LocalizedText;
  image: string;
}

export interface Accreditation {
  name: LocalizedText;
  note: LocalizedText;
  logo: string;
}

export interface FacultyMember {
  name: LocalizedText;
  role: LocalizedText;
  subject: LocalizedText;
  photo: string;
}

export interface GalleryImage {
  src: string;
  caption: LocalizedText;
  category: 'campus' | 'classroom' | 'activities' | 'events';
}

export interface GradeLevel {
  code: string;               // "KG1", "G1"...
  name: LocalizedText;
  ageRange: string;
  focus: LocalizedText;
}

export interface CalendarEvent {
  date: LocalizedText;        // human readable date range
  title: LocalizedText;
  type: 'term' | 'holiday' | 'exam' | 'event';
}

export interface FeeRow {
  grade: LocalizedText;
  tuition: string;
  registration: string;
  note: LocalizedText;
}

export interface Requirement {
  text: LocalizedText;
}

/** A downloadable document — brochure, academic calendar, fee sheet, etc. */
export interface ResourceItem {
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
  fileUrl: string;    // asset path or Cloud Storage URL ('' = not uploaded yet)
  fileLabel: string;  // e.g. "PDF · 2.4 MB"
}

/** A leadership message (principal, director, etc.). */
export interface LeaderMessage {
  name: LocalizedText;
  role: LocalizedText;
  photo: string;
  quote: LocalizedText;
  body: LocalizedText;
}

export interface NoticeInfo {
  id: string;
  active: boolean;
  showAsPopup: boolean;
  badge: LocalizedText;
  title: LocalizedText;
  content: LocalizedText;
  linkText?: LocalizedText;
  linkPath?: string;
  updatedAt: string;
}

export interface SiteContent {
  school: SchoolInfo;
  hero: Hero;
  stats: Stat[];
  features: Feature[];
  facilities: FacilityItem[];
  accreditations: Accreditation[];
  directorMessage: LeaderMessage;
  principalMessage: LeaderMessage;
  faculty: FacultyMember[];
  gallery: GalleryImage[];
  grades: GradeLevel[];
  calendar: CalendarEvent[];
  fees: FeeRow[];
  requirements: Requirement[];
  resources: ResourceItem[];
  aim: {
    mission: LocalizedText;
    vision: LocalizedText;
    values: { title: LocalizedText; text: LocalizedText }[];
  };
  about: {
    story: LocalizedText;
    pillars: { title: LocalizedText; text: LocalizedText }[];
  };
  notice?: NoticeInfo;
  notices?: NoticeInfo[];
}

/** A registration enquiry submitted by a parent. */
export interface RegistrationEnquiry {
  studentName: string;
  dob: string;
  gradeApplying: string;
  gender: string;
  parentName: string;
  phone: string;
  email: string;
  nationality: string;
  previousSchool: string;
  message: string;
  submittedAt: string;
}
