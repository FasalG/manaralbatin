# Manar Al Batin International School — Website

A bilingual (English · العربية) school website built with **Angular 21**
(standalone, zoneless, signals) and **Firebase** (optional, wired but not
required to run). KG1 → Grade 9, Cambridge pathway, Hafar Al Batin, KSA.

The site ships with built-in seed content, so it runs and looks complete
immediately. Connect Firebase when you want admins to edit content, upload
images, and collect registration enquiries live.

---

## Run it

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build → dist/
```

## What's included

| Area | Route |
|------|-------|
| Home (hero, why-us, facilities, stats, principal, accreditation) | `/` |
| About | `/about` · Mission & Vision `/aim` |
| Academics + academic calendar (KG1–G9) | `/academics` |
| Faculty | `/faculty` |
| Facilities + detail pages | `/facilities`, `/facilities/:slug` |
| Gallery (filterable) | `/gallery` |
| Admissions overview | `/admissions` |
| Fee structure · Requirements · Registration form | `/admissions/fees`, `/requirements`, `/register` |
| Downloads (brochure, academic calendar, PDFs) | `/resources` |
| Contact | `/contact` |
| Staff login · Admin dashboard | `/admin/login`, `/admin` |

- **Bilingual**: toggle EN/AR in the header; the whole site flips to RTL and an
  Arabic font. Language is remembered.
- **Animations**: hero entrance, scroll reveals, animated stat counters, hover
  micro-interactions — all respect `prefers-reduced-motion`.
- **Images**: drop photos into `public/assets/images/` (see the README there).
  Missing photos show a branded placeholder, so nothing ever looks broken.

## Design language

Colours and crest come from the school shield: royal blue, growth green, gold,
on warm sand. Display type **Fraunces**, body **Plus Jakarta Sans**, Arabic
**Tajawal** (loaded from Google Fonts in `index.html`).

---

## Connect Firebase (optional)

> **Full step-by-step walkthrough: [FIREBASE_SETUP.md](FIREBASE_SETUP.md)** —
> config, Auth, Firestore + Storage rules, testing, and deploying.

Quick version — everything is already coded against the Firebase Web SDK:

1. In the Firebase console (project **manar-al-batin-school**) → Project
   settings → Your apps → **Web app** → copy the config.
2. Paste it into `src/environments/environment.ts` and set `useFirebase: true`.
3. Enable these products in the console:
   - **Authentication** → Email/Password. Add an admin user — that email +
     password is the staff login.
   - **Cloud Firestore** → create database.
   - **Cloud Storage** → for admin image uploads.
4. Suggested Firestore rules: allow public **read** of `site/content`, allow
   **create** on `registrations` (so parents can submit), and restrict
   everything else to authenticated admins.

### Data model
- `site/content` — one document holding all editable site content.
- `registrations/*` — one document per registration enquiry.

### Preview the admin before Firebase
Without Firebase, use the demo login on `/admin/login`:
`admin@manaralbatin.local` · `manar2026` (local preview only — real security
comes from Firebase Auth).

---

## Registration enquiries → the school

The form on `/admissions/register` delivers each enquiry, in order:

1. **Firestore** `registrations` collection → visible in the admin dashboard
   (with CSV export).
2. **Google Form** (optional) — set `registrationGoogleFormAction` in
   `environment.ts` to your form's POST URL (`…/formResponse`) and map the
   `entry.<id>` field names in `registration.service.ts`. Responses land in the
   linked Google Sheet.
3. **Local fallback** — kept in the browser during demos so nothing is lost.

You only need **one** of these; Firestore is recommended since the project
already uses Firebase.

---

## Project structure

```
src/app/
  core/         models, services (i18n, content, auth, storage, registration,
                firebase gateway), route guard
  shared/       header, footer, logo (SVG crest), icon set, count-up,
                reveal + image-fallback directives, page hero
  features/     home, about, aim, academics, faculty, facilities(+detail),
                gallery, admissions(+fees, requirements, register), contact,
                admin(login, dashboard)
```

All content lives in `core/services/seed-content.ts` — edit it directly, or let
admins edit via the dashboard once Firebase is connected.
