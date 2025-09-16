import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function POST(request) {
  try {
    const form = await request.formData();
    const file = form.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const mime = file.type || '';
    if (!mime.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const baseName = (file.name || 'image').replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.[^.]+$/, '');
    const uniqueBase = `${Date.now()}_${Math.random().toString(36).slice(2)}_${baseName}`;
    const webpName = `${uniqueBase}.webp`;
    const filePath = path.join(uploadsDir, webpName);

    // Resize to 1200x675 (16:9), center crop, convert to WebP
    await sharp(buffer)
      .resize(1200, 675, { fit: 'cover', position: 'centre' })
      .webp({ quality: 82 })
      .toFile(filePath);

    const url = `/uploads/${webpName}`;
    return NextResponse.json({ url, width: 1200, height: 675, format: 'webp' });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
