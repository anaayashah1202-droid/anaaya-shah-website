import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const pages = ['index.html', 'entrepreneurship.html'];
// Keep the founder page on the homepage's existing design system.
const homepage = readFileSync(join(root, 'index.html'), 'utf8');
writeFileSync(join(root, 'portfolio-base.css'), homepage.match(/<style>([\s\S]*?)<\/style>/)[1]);
const missing = [];
for (const page of pages) {
  const html = readFileSync(join(root, page), 'utf8');
  for (const [, ref] of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    if (/^(#|https?:|\/\/|mailto:|tel:|data:)/.test(ref)) continue;
    const path = ref.split('#')[0].split('?')[0];
    const target = path.startsWith('/') ? join(root, path) : resolve(root, dirname(page), path);
    if (!existsSync(target) || (statSync(target).isDirectory() && !existsSync(join(target, 'index.html')))) missing.push(`${page}: ${ref}`);
  }
}
if (missing.length) throw new Error(`Missing local references:\n${missing.join('\n')}`);
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
for (const entry of ['index.html','styles.css','script.js','assets','portfolio-base.css','founder.css','navigation.css','navigation.js']) {
  cpSync(join(root, entry), join(dist, entry), { recursive: true, filter: source => !/anaaya-shah(?:-social-media)?-resume\.pdf$/.test(source) });
}
mkdirSync(join(dist, 'entrepreneurship'), { recursive: true });
cpSync(join(root, 'entrepreneurship.html'), join(dist, 'entrepreneurship/index.html'));
console.log('Build complete: both pages and all local references verified.');
