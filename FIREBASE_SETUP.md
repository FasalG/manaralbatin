# Connecting the website to Firebase

Your project is **manar-al-batin-school** (project number `894506294532`) on the
free **Spark** plan — everything below works at no cost.

The site already runs on built-in content. Firebase adds three live powers:
- **Admins edit content + upload images/PDFs** (Firestore + Storage)
- **Registration enquiries are collected** (Firestore)
- **Secure staff login** (Authentication)

Follow the steps in order. It takes about 10 minutes.

---

## Step 1 — Get your web config

1. Open the [Firebase console](https://console.firebase.google.com/) → your
   project **Manar Al Batin School**.
2. Click the gear icon → **Project settings** → tab **General**.
3. Scroll to **Your apps**. If there's no web app yet, click the **`</>`** (Web)
   icon, give it a nickname (e.g. "Website"), and register it. **Do not** enable
   Firebase Hosting in that dialog (optional, can add later).
4. You'll see a `firebaseConfig` object. Keep it open — you need these values:
   `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`,
   `appId`.

## Step 2 — Paste it into the app

Open **`src/environments/environment.ts`** and:
- set `useFirebase: true`
- replace the `firebase: { … }` values with your config

```ts
export const environment = {
  production: true,
  useFirebase: true,                         // ← turn on
  firebase: {
    apiKey: 'AIza…',                         // ← from console
    authDomain: 'manar-al-batin-school.firebaseapp.com',
    projectId: 'manar-al-batin-school',
    storageBucket: 'manar-al-batin-school.appspot.com',
    messagingSenderId: '894506294532',
    appId: '1:894506294532:web:…',           // ← from console
  },
  registrationGoogleFormAction: '',
};
```

That's the only code change needed. The app auto-detects the real config and
switches from seed content to live Firebase.

## Step 3 — Turn on Authentication (staff login)

1. Console → **Build → Authentication → Get started**.
2. **Sign-in method** tab → enable **Email/Password** → Save.
3. **Users** tab → **Add user** → enter the admin's email + a password.
   That email/password is now the login at `/admin/login`.

## Step 4 — Create the Firestore database

1. Console → **Build → Firestore Database → Create database**.
2. Choose **Production mode** → pick a location near KSA (e.g.
   `eur3` / `europe-west`) → Enable.
3. Go to the **Rules** tab, paste the rules below, and **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Anyone can read the website content; only signed-in admins can change it.
    match /site/content {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Parents may submit an enquiry (create only). Only admins can read them.
    match /registrations/{id} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## Step 5 — Turn on Cloud Storage (image & PDF uploads)

1. Console → **Build → Storage → Get started** → accept the default bucket →
   choose the same region.
2. **Rules** tab, paste this, and **Publish**:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Public can view images/PDFs; only signed-in admins can upload.
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## Step 6 — Test it

```bash
npm start
```

1. Go to `/admin/login`, sign in with the user you created in Step 3.
2. On **Website content**, change some text or upload the hero image / brochure,
   then **Save & publish**. Refresh the public site — your change is live for
   everyone. (Behind the scenes this writes the `site/content` document.)
3. Open `/admissions/register` in a normal browser tab, submit a test enquiry,
   then check the dashboard's **Registration enquiries** tab — it appears there,
   and you can **Export CSV**.

The little badge at the top of the dashboard shows **"Firebase connected"** when
everything is wired correctly (it says "Local preview" until then).

---

## Deploy the website (optional, free)

To host it on Firebase's global CDN with automatic HTTPS:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting     # public dir: dist/manaralbatin/browser  · SPA: Yes
npm run build
firebase deploy
```

Your site goes live at `https://manar-al-batin-school.web.app`.

---

## Troubleshooting

- **"Firebase not configured" / seed content still shows** → `useFirebase` is
  false, or an `apiKey`/`appId` still contains `PASTE…`. Double-check Step 2.
- **Login fails** → the user must exist in Authentication → Users, and
  Email/Password must be enabled.
- **Saves don't persist / permission denied** → re-check the Firestore rules in
  Step 4 and that you're signed in as an admin.
- **Uploads fail** → Storage isn't enabled, or the Storage rules in Step 5
  aren't published.
