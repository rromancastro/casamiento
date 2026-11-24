import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const manifest = JSON.parse(await fs.readFile('design/assets.json', 'utf8'));
for (const [name, expected] of Object.entries(manifest)) {
  const bytes = await fs.readFile(path.join('public/home', name));
  assert(bytes.length > 0, `${name} vacío`);
  const metadata = await sharp(bytes).metadata();
  assert.equal(metadata.width, expected.width, `${name}: ancho`);
  assert.equal(metadata.height, expected.height, `${name}: alto`);
}
for (const name of await fs.readdir('public/home')) {
  if (!name.endsWith('.svg')) continue;
  const svg = await fs.readFile(path.join('public/home', name), 'utf8');
  assert(svg.includes('<path'), `${name}: sin trazados`);
  assert(!svg.includes('clip-path='), `${name}: referencia de recorte no resuelta`);
  await sharp(Buffer.from(svg)).png().toBuffer();
}
const htmlResponse = await fetch('http://127.0.0.1:3000');
assert.equal(htmlResponse.status, 200);
const html = await htmlResponse.text();
for (const id of ['homeHeader', 'celebracion', 'dressCode', 'regalos', 'homeClosing']) assert(html.includes(`id="${id}"`), `Sección ${id} ausente`);
for (const text of ['ROMÁN', 'MICAELA', 'ROMANYMICA.BODA', '20:00 HS', '59.000']) assert(html.includes(text), `Texto ${text} ausente`);
for (const name of [...Object.keys(manifest), 'calendar.svg', 'clock.svg', 'copy.svg', 'hand.svg', 'check.svg']) {
  const response = await fetch(`http://127.0.0.1:3000/home/${name}`);
  assert.equal(response.status, 200, `${name}: HTTP`);
}
console.log('OK: recursos originales, dimensiones, SVGs, HTML y rutas locales.');
