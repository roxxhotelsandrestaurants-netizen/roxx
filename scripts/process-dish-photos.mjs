import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import sharp from 'sharp';

console.log('Ready for generated dish records JSON on stdin.');
const input = process.argv[2] ? JSON.parse(await readFile(process.argv[2], 'utf8')) : await new Promise(resolve => {
  const lines = createInterface({ input: process.stdin, crlfDelay: Infinity });
  lines.once('line', line => { lines.close(); resolve(JSON.parse(line)); });
});
const manifest = JSON.parse(await readFile('photography/dish-images.json', 'utf8'));
await mkdir('public/images/dishes', { recursive: true });
for (const record of input.records) {
  const item = manifest.items.find(item => item.index === record.index);
  if (!item) throw new Error(`Unknown dish ${record.index}`);
  if (record.prompt) item.prompt = record.prompt;
  if (item.status === 'generated' && item.source === record.path) continue;
  const metadata = await sharp(record.path).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Invalid source image for ${item.name}`);
  for (const size of manifest.sizes) {
    const suffix = size === 768 ? '' : `-${size}`;
    await sharp(record.path).rotate().resize(size, size, { fit: 'contain', background: '#26190f' }).webp({ quality: size === 768 ? 90 : 86, effort: 5 }).toFile(`public/images/dishes/${item.slug}${suffix}.webp`);
  }
  item.status = 'generated';
  item.source = record.path;
  item.sourceDimensions = { width: metadata.width, height: metadata.height };
  item.generatedAt = new Date().toISOString();
}
await writeFile('photography/dish-images.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({ processed: input.records.length, complete: manifest.items.filter(item => item.status === 'generated').length, total: manifest.count }));
process.exit(0);
