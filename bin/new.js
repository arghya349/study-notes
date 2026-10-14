#!/usr/bin/env node
// Create a folder or a note inside notes/.
//   npm run new -- "Biology"                 → notes/Biology/
//   npm run new -- "Biology/01 Cells.md"     → notes/Biology/01 Cells.md
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const NOTES_DIR = path.resolve(process.env.NOTEBOOK_DIR || path.join(ROOT, 'notes'));
const input = process.argv.slice(2).join(' ').trim();

if (!input) {
  console.log('Usage:\n  npm run new -- "Folder/Subfolder"\n  npm run new -- "Folder/Note title.md"');
  process.exit(1);
}

const target = path.resolve(NOTES_DIR, input);
if (!target.startsWith(NOTES_DIR + path.sep)) {
  console.error('Choose a path inside notes/.');
  process.exit(1);
}
const shown = path.relative(ROOT, target);

if (/\.(md|markdown)$/i.test(target)) {
  if (fs.existsSync(target)) {
    console.error(`${shown} already exists.`);
    process.exit(1);
  }
  const title = path.basename(target).replace(/\.(md|markdown)$/i, '').replace(/^\d+[\s._-]+/, '');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `# ${title}\n\nStart writing here.\n`);
  console.log(`Created note ${shown}`);
} else {
  fs.mkdirSync(target, { recursive: true });
  console.log(`Created folder ${shown}`);
}
