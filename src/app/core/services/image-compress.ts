/**
 * Client-side image compression. Every uploaded photo is resized and re-encoded
 * in the browser so it never exceeds the target size (default 1 MB) before it
 * ever touches Cloud Storage. Keeps uploads fast and storage costs near zero.
 *
 * SVG / GIF and non-images are passed through untouched.
 */
export interface CompressOptions {
  maxSizeMB?: number; // hard ceiling for the output file
  maxWidth?: number; // longest edge is scaled down to at most this
  quality?: number; // starting JPEG quality (0–1)
}

const PASS_THROUGH = ['image/svg+xml', 'image/gif'];

export async function compressImage(file: File, opts: CompressOptions = {}): Promise<Blob> {
  const maxBytes = (opts.maxSizeMB ?? 1) * 1024 * 1024;
  let maxWidth = opts.maxWidth ?? 1600;

  // Only compress raster images. Leave PDFs, SVGs, GIFs alone.
  if (!file.type.startsWith('image/') || PASS_THROUGH.includes(file.type)) {
    return file;
  }
  // Already small enough — no need to touch it.
  if (file.size <= maxBytes) {
    // still cap dimensions for very large-but-light images
    if (!(await tooWide(file, maxWidth))) return file;
  }

  const bitmap = await createImageBitmap(file);
  try {
    let quality = opts.quality ?? 0.9;
    let blob = await draw(bitmap, maxWidth, quality);

    // Reduce quality first, then dimensions, until under the ceiling.
    while (blob.size > maxBytes && quality > 0.45) {
      quality -= 0.1;
      blob = await draw(bitmap, maxWidth, quality);
    }
    while (blob.size > maxBytes && maxWidth > 640) {
      maxWidth = Math.round(maxWidth * 0.85);
      blob = await draw(bitmap, maxWidth, quality);
    }
    return blob.size < file.size ? blob : file;
  } finally {
    bitmap.close();
  }
}

async function tooWide(file: File, maxWidth: number): Promise<boolean> {
  try {
    const bmp = await createImageBitmap(file);
    const wide = bmp.width > maxWidth;
    bmp.close();
    return wide;
  } catch {
    return false;
  }
}

async function draw(bitmap: ImageBitmap, maxWidth: number, quality: number): Promise<Blob> {
  let { width, height } = bitmap;
  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');
  ctx.fillStyle = '#ffffff'; // flatten any transparency for JPEG
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Compression failed'))),
      'image/jpeg',
      quality,
    );
  });
}
