import fs from 'node:fs';
const source = fs.readFileSync(process.argv[2] || 'design/mobile-reference.svg', 'utf8');
console.log(source.slice(0, 250));
console.log('Elements:', [...source.matchAll(/<(?:g|rect|image|path|ellipse|circle|line|use|pattern)\b[^>]*>/g)].map(([s]) => s.replace(/xlink:href="data:[^"]*"/g, 'xlink:href="[embedded image]"').replace(/ d="[^"]*"/g, ' d="[path]"')).join('\n'));
