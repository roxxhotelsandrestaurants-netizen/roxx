import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { menu } from '../app/menu.ts';
import { getMenuPresentation } from '../app/menu-presentation.ts';

const manifest = JSON.parse(await readFile('photography/dish-images.json', 'utf8'));
assert.equal(menu.length, 138);
assert.equal(manifest.items.length, menu.length);
const paths = new Set();
const hashes = new Set();
let bytes = 0;
for (const dish of menu) {
  const item = manifest.items.find(item => item.name === dish.name);
  assert.ok(item, `Missing manifest entry: ${dish.name}`);
  assert.equal(item.status, 'generated', `Unfinished image: ${dish.name}`);
  const image = getMenuPresentation(dish).image;
  assert.equal(image, item.image);
  assert.ok(!paths.has(image), `Repeated image mapping: ${dish.name}`);
  paths.add(image);
  const hash = createHash('sha256').update(await readFile(`public${image}`)).digest('hex');
  assert.ok(!hashes.has(hash), `Duplicated photograph: ${dish.name}`);
  hashes.add(hash);
  for (const size of manifest.sizes) {
    const path = `public${size === 768 ? image : image.replace('.webp', `-${size}.webp`)}`;
    const metadata = await sharp(path).metadata();
    assert.equal(metadata.format, 'webp');
    assert.equal(metadata.width, size, `Incorrect image width: ${path}`);
    assert.equal(metadata.height, size, `Incorrect image height: ${path}`);
    bytes += (await stat(path)).size;
  }
}
console.log(JSON.stringify({ dishes: menu.length, uniqueImages: hashes.size, webpFiles: menu.length * manifest.sizes.length, sizes: manifest.sizes, totalBytes: bytes, categories: menu.reduce((counts, dish) => (counts[dish.category] = (counts[dish.category] || 0) + 1, counts), {}) }, null, 2));
