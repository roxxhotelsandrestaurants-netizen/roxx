import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// Preserve the supplied crest; only resize and encode it for browser icon formats.
const logo = 'public/images/roxx-logo.jpg';
const sizes = [16, 32, 48, 64];
// PNG payloads inside ICO containers must have RGBA channels.
const frames = await Promise.all(sizes.map(size => sharp(logo).resize(size, size, { fit: 'contain' }).ensureAlpha().png().toBuffer()));
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
for (const [index, frame] of frames.entries()) {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(frame.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
}
await writeFile('app/favicon.ico', Buffer.concat([directory, ...frames]));
await sharp(logo).resize(64, 64, { fit: 'contain' }).png().toFile('app/icon.png');
await sharp(logo).resize(180, 180, { fit: 'contain' }).png().toFile('app/apple-icon.png');
console.log(JSON.stringify({ favicon: sizes, icon: '64x64 PNG', appleIcon: '180x180 PNG', source: logo }));
