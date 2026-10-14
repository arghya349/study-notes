// Pre-renders the notebook into dist/ as a static site (used for Vercel).
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLibrary } from './lib/library.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const NOTES_DIR = path.resolve(process.env.NOTEBOOK_DIR || path.join(ROOT, 'notes'));
const OUT = path.join(ROOT, 'dist');

const write = async (file, data) => {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, typeof data === 'string' ? data : JSON.stringify(data));
};

await fs.rm(OUT, { recursive: true, force: true });
const library = await buildLibrary(NOTES_DIR);
const tree = library.tree();

await write(path.join(OUT, '_api/tree.json'), { version: library.version, root: tree });
await write(path.join(OUT, '_api/search.json'), library.searchIndex());
const urls = [];
(function walk(folder) {
  folder.notes.forEach((n) => urls.push(n.url));
  folder.folders.forEach(walk);
})(tree);
for (const url of urls) await write(path.join(OUT, '_api/notes', `${url}.json`), library.note(url));

await fs.cp(path.join(ROOT, 'public'), path.join(OUT, '_static'), { recursive: true });
await fs.cp(path.join(ROOT, 'node_modules/katex/dist'), path.join(OUT, '_vendor/katex'), { recursive: true });
for (const font of ['@fontsource-variable/newsreader', '@fontsource-variable/albert-sans', '@fontsource/instrument-serif']) {
  await fs.cp(path.join(ROOT, 'node_modules', font), path.join(OUT, '_vendor', path.basename(font)), { recursive: true });
}
await fs.cp(NOTES_DIR, path.join(OUT, '_files'), { recursive: true, filter: (src) => !/\.(md|markdown)$/i.test(src) && !path.basename(src).startsWith('.') });

const index = await fs.readFile(path.join(ROOT, 'public/index.html'), 'utf8');
await write(path.join(OUT, 'index.html'), index.replace('<html lang="en">', '<html lang="en" data-static="true">'));

console.log(`Built ${urls.length} notes into dist/`);
