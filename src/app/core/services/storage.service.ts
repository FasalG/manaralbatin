import { Injectable } from '@angular/core';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getStorageInstance } from './firebase-app';
import { compressImage } from './image-compress';

/** Uploads admin images to Cloud Storage and returns a public download URL.
 *  Images are auto-compressed to stay under 1 MB before upload. Falls back to a
 *  local object URL when Firebase Storage is not configured. */
@Injectable({ providedIn: 'root' })
export class StorageService {
  get isEnabled(): boolean {
    return !!getStorageInstance();
  }

  async upload(file: File, folder = 'site'): Promise<string> {
    // Shrink/re-encode images so nothing over 1 MB ever reaches Storage.
    const payload = await compressImage(file, { maxSizeMB: 1, maxWidth: 1600 });
    const isJpeg = payload.type === 'image/jpeg' && payload !== file;
    const base = file.name.replace(/\.[^.]+$/, '').replace(/[^\w-]+/g, '_').slice(0, 40);
    const ext = isJpeg ? 'jpg' : file.name.split('.').pop() || 'bin';
    const safeName = `${Date.now()}-${base}.${ext}`;

    const storage = getStorageInstance();
    if (!storage) {
      // Local preview only — not persisted. Real uploads need Firebase Storage.
      return URL.createObjectURL(payload);
    }
    const storageRef = ref(storage, `${folder}/${safeName}`);
    await uploadBytes(storageRef, payload, { contentType: payload.type });
    return getDownloadURL(storageRef);
  }
}
