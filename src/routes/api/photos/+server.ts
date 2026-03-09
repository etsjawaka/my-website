import type { RequestHandler } from '@sveltejs/kit';
import photoFiles from '$lib/photos.json';

export const GET: RequestHandler = async () => {
  const images = photoFiles
    .filter((f) => /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(f))
    .map((f) => `/photos/${f}`);

  return new Response(JSON.stringify(images), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
