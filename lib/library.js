// Reads the notes folder into a library: folders, notes, lookups and search.
import fsp from 'node:fs/promises';
import path from 'node:path';
import { renderMarkdown, slugify } from './markdown.js';
import { searchNotes } from '../public/search.js';

const NOTE_EXT = /\.(md|markdown)$/i;
// A folder's cover image: the glass folder's skin and the title image of every note inside.
const COVER = /^cover\.(jpe?g|png|webp|avif|gif|svg)$/i;
const WORDS_PER_MINUTE = 220;
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
const renderCache = new Map();

// "01 Foundations" → { number: 1, name: "Foundations" }
function parseName(raw) {
  const m = /^(\d+)[\s._-]+(.+)$/.exec(raw);
  return m ? { number: Number(m[1]), name: m[2].trim() } : { number: null, name: raw.trim() };
}

function parseFrontmatter(source) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(source);
  if (!m) return { data: {}, body: source };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line);
    if (kv) data[kv[1].toLowerCase()] = kv[2].trim().replace(/^(["'])(.*)\1$/, '$2');
  }
  return { data, body: source.slice(m[0].length) };
}

// Plain text for summaries and search. Code is kept verbatim so "<br>" stays searchable.
function toPlain(md) {
  const code = [];
  const keep = (text) => `\u0000${code.push(text) - 1}\u0000`;
  return md
    .replace(/```[^\n]*\n([\s\S]*?)```/g, (_, block) => ` ${keep(block)} `)
    .replace(/`([^`\n]+)`/g, (_, inline) => keep(inline))
    .replace(/<(svg|figure|div)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g, (_, a, b) => b || a)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^ {0,3}> ?\[![\w-]+\][+-]?/gm, '')
    .replace(/^ {0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '')
    .replace(/^\s*\|?[\s:|-]+\|[\s:|-]*$/gm, ' ')
    .replace(/\[\^[^\]]+\]:?/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[*_~=`|]+/g, '')
    .replace(/\$([^$\n]+)\$/g, '$1')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\u0000(\d+)\u0000/g, (_, i) => code[i])
    .replace(/\s+/g, ' ')
    .trim();
}

function clip(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.–—-]+$/, '') + '…';
}

function firstParagraph(body) {
  for (const block of body.split(/\n\s*\n/)) {
    const b = block.trim();
    if (!b || /^(#|>|```|\$\$|<|!\[|\||[-*+] |\d+\. |---)/.test(b)) continue;
    return toPlain(b);
  }
  return '';
}

function hash(text) {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

const fileUrl = (rel) => '/_files/' + rel.split('/').filter(Boolean).map(encodeURIComponent).join('/') + (rel === '' || rel.endsWith('/') ? '/' : '');

function noteCover(value, file, folder) {
  if (!value) return folder.cover || null;
  if (/^none$/i.test(value)) return null;
  if (/^https?:/i.test(value)) return value;
  const dir = path.posix.dirname(file);
  return fileUrl(path.posix.normalize(path.posix.join(dir === '.' ? '' : dir, value)));
}

async function readNote(abs, file, folder, slug, number, name) {
  const [source, stat] = await Promise.all([fsp.readFile(abs, 'utf8'), fsp.stat(abs)]);
  const { data, body: raw } = parseFrontmatter(source.replace(/^﻿/, ''));
  let body = raw;
  let title = data.title;
  const h1 = /^\s*#[ \t]+(.+?)[ \t]*#*[ \t]*(?:\r?\n|$)/.exec(body);
  if (h1) {
    title = title || toPlain(h1[1]);
    body = body.slice(h1[0].length);
  }
  const text = toPlain(body);
  const words = text ? text.split(' ').length : 0;
  return {
    type: 'note',
    title: title || name,
    number,
    file,
    url: (folder.url === '/' ? '' : folder.url) + '/' + slug,
    folderUrl: folder.url,
    summary: clip(data.summary || data.description || firstParagraph(body) || text, 190),
    cover: noteCover(data.cover, file, folder),
    words,
    minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    updated: stat.mtimeMs,
    size: stat.size,
    body,
    text,
  };
}

async function scanFolder(folder, abs, lib) {
  const entries = (await fsp.readdir(abs, { withFileTypes: true }))
    .filter((e) => !e.name.startsWith('.') && !e.name.startsWith('_'))
    .sort((a, b) => collator.compare(a.name, b.name));
  const used = new Set();
  const unique = (base) => {
    let slug = base;
    for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;
    used.add(slug);
    return slug;
  };
  let hasFiles = false;
  // _folder.json holds folder settings, e.g. { "style": "cobalt" }. Subfolders inherit them.
  const settings = await fsp.readFile(path.join(abs, '_folder.json'), 'utf8').then(JSON.parse).catch(() => ({}));
  folder.style = settings.style || folder.style || null;
  const cover = entries.find((e) => e.isFile() && COVER.test(e.name));
  folder.cover = cover ? fileUrl(path.posix.join(folder.file, cover.name)) : folder.cover || null;

  for (const entry of entries) {
    const file = path.posix.join(folder.file, entry.name);
    if (entry.isDirectory()) {
      const { number, name } = parseName(entry.name);
      const child = {
        type: 'folder',
        name,
        number,
        file,
        url: (folder.url === '/' ? '' : folder.url) + '/' + unique(slugify(name)),
        parentUrl: folder.url,
        cover: folder.cover,
        style: folder.style,
        folders: [],
        notes: [],
      };
      const childHasFiles = await scanFolder(child, path.join(abs, entry.name), lib);
      // Folders holding only images or other files are asset folders, not notebook folders.
      if (child.count === 0 && childHasFiles) continue;
      folder.folders.push(child);
    } else if (entry.isFile() && NOTE_EXT.test(entry.name)) {
      const { number, name } = parseName(entry.name.replace(NOTE_EXT, ''));
      folder.notes.push(await readNote(path.join(abs, entry.name), file, folder, unique(slugify(name)), number, name));
    } else if (entry.isFile()) {
      hasFiles = true;
    }
  }

  folder.count = folder.notes.length + folder.folders.reduce((n, f) => n + f.count, 0);
  folder.updated = Math.max(0, ...folder.notes.map((n) => n.updated), ...folder.folders.map((f) => f.updated));
  lib.folders.set(folder.url, folder);
  for (const note of folder.notes) lib.notes.set(note.url, note);
  return hasFiles;
}

function publicFolder(folder) {
  return {
    type: 'folder',
    name: folder.name,
    number: folder.number,
    url: folder.url,
    file: folder.file,
    count: folder.count,
    updated: folder.updated,
    cover: folder.cover,
    style: folder.style,
    folders: folder.folders.map(publicFolder),
    notes: folder.notes.map(({ body, text, size, file, ...note }) => note),
  };
}

export async function buildLibrary(notesDir) {
  const lib = { folders: new Map(), notes: new Map() };
  const root = { type: 'folder', name: 'Library', number: null, file: '', url: '/', folders: [], notes: [] };
  await scanFolder(root, notesDir, lib);

  const byFile = new Map();
  const byTitle = new Map();
  for (const note of lib.notes.values()) {
    byFile.set(note.file.toLowerCase(), note.url);
    const base = parseName(path.posix.basename(note.file).replace(NOTE_EXT, '')).name;
    for (const key of [note.title, base]) {
      if (!byTitle.has(key.toLowerCase())) byTitle.set(key.toLowerCase(), note.url);
    }
  }
  const signature = hash([...lib.notes.values()].map((n) => n.file + n.url + n.title).join('|'));

  function renderNote(note) {
    const key = `${note.updated}:${note.size}:${signature}`;
    const cached = renderCache.get(note.file);
    if (cached?.key === key) return cached.result;
    const dir = path.posix.dirname(note.file) === '.' ? '' : path.posix.dirname(note.file);
    const result = renderMarkdown(note.body, {
      resolveFile: (target) => byFile.get(path.posix.normalize(path.posix.join(dir, target)).toLowerCase()) || null,
      resolveTitle: (title) => byTitle.get(title.toLowerCase()) || null,
      fileUrl: (target) => fileUrl(target === '' ? (dir ? dir + '/' : '') : path.posix.normalize(path.posix.join(dir, target))),
    });
    renderCache.set(note.file, { key, result });
    return result;
  }

  return {
    version: hash(signature + [...lib.notes.values()].map((n) => n.updated).join()),
    tree() {
      return publicFolder(root);
    },
    note(url) {
      const note = lib.notes.get(url);
      if (!note) return null;
      const siblings = lib.folders.get(note.folderUrl).notes;
      const index = siblings.indexOf(note);
      const link = (n) => (n ? { url: n.url, title: n.title, number: n.number } : null);
      const { body, text, size, file, ...meta } = note;
      return {
        ...meta,
        ...renderNote(note),
        position: { index: index + 1, total: siblings.length },
        prev: link(siblings[index - 1]),
        next: link(siblings[index + 1]),
      };
    },
    searchIndex() {
      return [...lib.notes.values()].map((note) => {
        const folder = lib.folders.get(note.folderUrl);
        return { url: note.url, title: note.title, text: note.text, summary: note.summary, folder: folder.url === '/' ? 'Library' : folder.name };
      });
    },
    search(query, limit = 20) {
      return searchNotes(this.searchIndex(), query, limit);
    },
  };
}
