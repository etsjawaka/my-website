import fs from 'fs';
import path from 'path';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const photosDir = path.join(process.cwd(), 'static', 'photos');
  try {
    const files = await fs.promises.readdir(photosDir);
    const images = files
      .filter((f) => /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(f))
      .map((f) => `/photos/${f}`);

    return new Response(JSON.stringify(images), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
