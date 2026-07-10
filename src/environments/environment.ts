/**
 * Production environment.
 *
 * Firebase is now configured and enabled. Content editing, image/PDF uploads,
 * registration enquiries and admin login run through this project.
 * (Firebase console → Project settings → General → Your apps → SDK setup.)
 */
export const environment = {
  production: true,
  useFirebase: true,

  firebase: {
    apiKey: 'AIzaSyDmQ4hYIE7H2LbWcOIy1jOJ40kVAZRjTI8',
    authDomain: 'manar-al-batin-school.firebaseapp.com',
    projectId: 'manar-al-batin-school',
    storageBucket: 'manar-al-batin-school.firebasestorage.app',
    messagingSenderId: '894506294532',
    appId: '1:894506294532:web:5eb8d5d53c95a845764451',
    measurementId: 'G-EPEJ1WD4SS',
  },

  /**
   * Optional: a Google Form used as a fallback destination for registration
   * enquiries. Leave blank to send enquiries to Firestore only.
   * See README for how to map entry IDs.
   */
  registrationGoogleFormAction: '',
};
