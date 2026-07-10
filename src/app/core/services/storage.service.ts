import { Injectable } from '@angular/core';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getStorageInstance } from './firebase-app';

/** Uploads admin images to Cloud Storage and returns a public download URL.
 *  Falls back to a local object URL when Firebase Storage is not configured. */
@Injectable({ providedIn: 'root' })
export class StorageService {
  get isEnabled(): boolean {
    return !!getStorageInstance();
  }

  async upload(file: File, folder = 'site'): Promise<string> {
    const storage = getStorageInstance();
    const safeName = `${Date.now()}-${file.name.replace(/[^\w.\-]+/g, '_')}`;
    if (!storage) {
      // Local preview only — not persisted. Real uploads need Firebase Storage.
      return URL.createObjectURL(file);
    }
    const storageRef = ref(storage, `${folder}/${safeName}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }
}
