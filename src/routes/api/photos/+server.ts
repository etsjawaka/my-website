import type { RequestHandler } from '@sveltejs/kit';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import photoFiles from '$lib/photos.json';

const imagePattern = /\.(jpe?g|png|gif|webp|avif|svg)$/i;

async function listPhotosFromStatic(dir: string, prefix = ''): Promise<string[]> {
	const entries = await readdir(dir, { withFileTypes: true });
	const files: string[] = [];

	for (const entry of entries) {
		if (entry.isDirectory()) {
			const nested = await listPhotosFromStatic(path.join(dir, entry.name), `${prefix}${entry.name}/`);
			files.push(...nested);
			continue;
		}

		if (entry.isFile() && imagePattern.test(entry.name)) {
			files.push(`${prefix}${entry.name}`);
		}
	}

	return files;
}

export const GET: RequestHandler = async () => {
	let sourceFiles: string[] = [];

	try {
		const photosDir = path.join(process.cwd(), 'static', 'photos');
		sourceFiles = await listPhotosFromStatic(photosDir);
	} catch {
		// Fallback for runtimes where static dir is not readable at runtime.
		sourceFiles = photoFiles;
	}

	const images = sourceFiles
		.filter((f) => imagePattern.test(f))
		.sort((a, b) => a.localeCompare(b))
		.map((f) => `/photos/${f}`);

	return new Response(JSON.stringify(images), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
			Pragma: 'no-cache',
			Expires: '0'
		}
	});
};
