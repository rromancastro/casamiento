import fs from 'node:fs/promises';
const source = await fs.readFile('design/fonts.css', 'utf8');
let css = '';
for (const [block] of source.matchAll(/@font-face\s*\{[^}]+\}/g)) {
  const family = block.match(/font-family: '([^']+)'/)[1];
  const weight = block.match(/font-weight: (\d+)/)[1];
  const style = block.match(/font-style: (\w+)/)[1];
  const url = block.match(/url\(([^)]+)\)/)[1];
  const filename = `${family.toLowerCase().replaceAll(' ', '-')}-${weight}-${style}.ttf`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status}: ${family}`);
  await fs.writeFile(`public/fonts/${filename}`, Buffer.from(await response.arrayBuffer()));
  css += block.replace(url, `/fonts/${filename}`) + '\n';
  console.log(filename);
}
await fs.writeFile('app/fonts.scss', css);
