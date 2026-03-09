import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const photosDir = path.join(root, 'static', 'photos');
const outputFile = path.join(root, 'src', 'lib', 'photos.json');
const imagePattern = /\.(jpe?g|png|gif|webp|avif|svg)$/i;

async function syncPhotosManifest() {
  const entries = await fs.readdir(photosDir, { withFileTypes: true });

  const files = entries
    .filter((entry) => entry.isFile() && imagePattern.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  await fs.writeFile(outputFile, `${JSON.stringify(files, null, 2)}\n`, 'utf8');
  console.log(`Synced ${files.length} photos to src/lib/photos.json`);
}

syncPhotosManifest().catch((error) => {
  console.error('Failed to sync photo manifest:', error);
  process.exitCode = 1;
});
