import type { RequestHandler } from '@sveltejs/kit';

const SHORTS_URL = 'https://www.youtube.com/@galaxiuschaos/shorts';
const SHORT_ID_PATTERN = /\/shorts\/([A-Za-z0-9_-]{11})/g;

export const GET: RequestHandler = async () => {
  try {
    const res = await fetch(SHORTS_URL, {
      headers: {
        // A browser-like UA helps avoid lightweight anti-bot variants.
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to load channel shorts page.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const html = await res.text();
    const matches = [...html.matchAll(SHORT_ID_PATTERN)];
    const videoId = matches[0]?.[1];

    if (!videoId) {
      return new Response(JSON.stringify({ error: 'No shorts found for this channel.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const payload = {
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      watchUrl: `https://www.youtube.com/shorts/${videoId}`
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Unexpected error while fetching latest short.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
