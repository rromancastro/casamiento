import fs from 'node:fs';
import path from 'node:path';

const destination = 'public/home';
fs.mkdirSync(destination, { recursive: true });
const names = ['hero', 'cover-flowers', 'celebration-paper', 'celebration-flowers-top', 'celebration-flowers-bottom', 'olive-texture', 'draped-fabric', 'pampas', 'gifts-paper', 'gifts-flowers', 'gifts-branches', 'closing-photo'];
const manifest = {};
for (const variant of ['mobile', 'desktop']) {
  const svg = fs.readFileSync(`design/${variant}-reference.svg`, 'utf8');
  for (const [tag] of svg.matchAll(/<image\b[^>]*\/>/g)) {
    const number = Number(tag.match(/id="image(\d+)/)?.[1]);
    const data = tag.match(/xlink:href="data:([^;]+);base64,([^"]+)"/);
    if (!data) continue;
    const extension = data[1] === 'image/jpeg' ? 'jpg' : 'png';
    const name = `${names[number]}${number === 0 ? `-${variant}` : ''}.${extension}`;
    const buffer = Buffer.from(data[2], 'base64');
    fs.writeFileSync(path.join(destination, name), buffer);
    manifest[name] = { width: Number(tag.match(/\bwidth="(\d+)/)[1]), height: Number(tag.match(/\bheight="(\d+)/)[1]), bytes: buffer.length };
  }
}
const mobile = fs.readFileSync('design/mobile-reference.svg', 'utf8');
function group(name) {
  const start = mobile.indexOf(`<g id="${name}"`);
  let depth = 0;
  for (const match of mobile.slice(start).matchAll(/<\/?g\b[^>]*>/g)) {
    depth += match[0].startsWith('</') ? -1 : 1;
    if (depth === 0) return mobile.slice(start, start + match.index + match[0].length);
  }
}
const icons = {
  calendar: ['Calendario', '92 746 30 31'],
  clock: ['Reloj', '276 746 30.312 30.312'],
  location: ['Ubicaci&#195;&#179;n', '182 917 26 33'],
  ticket: ['Entrada', '91 1110 28 24'],
  dress: ['Vestido', '116 1401 49 86'],
  shirt: ['Camisa', '222 1416 59 60'],
  gift: ['Regalo', '58 1710 30 32'],
  handshake: ['Mercado Pago &#194;&#183; manos', '123 1909 43 32'],
  copy: ['Copiar alias', '296 2013 20 24'],
  arrow: ['Flecha', '184 261 22 12'],
  hand: ['hand-line-icon 1', '340 2201 8 10'],
  check: ['check-mark-line-icon 1', '38 2228 8 6'],
};
for (const [name, [id, viewBox]] of Object.entries(icons)) {
  const content = group(id);
  if (!content) throw new Error(`Missing ${id}`);
  const parts = viewBox.split(' ');
  const paths = [...content.matchAll(/<path\b[^>]*\/>/g)].map(([p]) => p).join('');
  fs.writeFileSync(`${destination}/${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="${parts[2]}" height="${parts[3]}" viewBox="${viewBox}" fill="none">${paths}</svg>`);
}
fs.writeFileSync('design/assets.json', JSON.stringify(manifest, null, 2));
console.log(manifest);
console.log('Icon path bounds (for verification):');
for (const [name, [id]] of Object.entries(icons)) console.log(name, group(id));
