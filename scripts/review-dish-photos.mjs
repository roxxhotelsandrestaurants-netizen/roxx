import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const manifest = JSON.parse(await readFile('photography/dish-images.json', 'utf8'));
const items = manifest.items.filter(item => item.status === 'generated');
await mkdir('output/dish-photo-review', { recursive: true });
const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const mask = Buffer.from('<svg width="160" height="160"><circle cx="80" cy="80" r="80" fill="white"/></svg>');
for (let offset = 0; offset < items.length; offset += 36) {
  const group = items.slice(offset, offset + 36);
  const layers = [];
  for (const [position, item] of group.entries()) {
    const left = (position % 6) * 180;
    const top = Math.floor(position / 6) * 216;
    const photo = await sharp(`public${item.image}`).resize(160, 160).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
    const lines = [''];
    for (const word of `${item.index + 1}. ${item.name}`.split(' ')) {
      if ((lines.at(-1) + ' ' + word).length > 25) lines.push(word);
      else lines[lines.length - 1] += `${lines.at(-1) ? ' ' : ''}${word}`;
    }
    const label = Buffer.from(`<svg width="180" height="56"><rect width="180" height="56" fill="#f8f2e7"/><text x="90" text-anchor="middle" font-family="Arial" font-size="11" fill="#142d28">${lines.slice(0, 3).map((line, i) => `<tspan x="90" y="${15 + i * 14}">${escape(line)}</tspan>`).join('')}</text></svg>`);
    layers.push({ input: photo, left: left + 10, top }, { input: label, left, top: top + 160 });
  }
  const path = `output/dish-photo-review/sheet-${offset / 36 + 1}.jpg`;
  await sharp({ create: { width: 1080, height: Math.ceil(group.length / 6) * 216, channels: 3, background: '#f8f2e7' } }).composite(layers).jpeg({ quality: 92 }).toFile(path);
}
console.log(JSON.stringify({ reviewed: items.length, sheets: Math.ceil(items.length / 36) }));
