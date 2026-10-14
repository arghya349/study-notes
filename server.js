// Notebook — a quiet, read-only reader for a folder of Markdown notes.
import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { buildLibrary } from './lib/library.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const NOTES_DIR = path.resolve(process.env.NOTEBOOK_DIR || path.join(ROOT, 'notes'));
const PUBLIC_DIR = path.join(ROOT, 'public');
const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT) || 4000;

const MOUNTS = [
  ['/_static/', PUBLIC_DIR, 'no-cache'],
  ['/_vendor/katex/', path.join(ROOT, 'node_modules/katex/dist'), 'public, max-age=86400'],
  ['/_vendor/newsreader/', path.join(ROOT, 'node_modules/@fontsource-variable/newsreader'), 'public, max-age=86400'],
  ['/_vendor/instrument-serif/', path.join(ROOT, 'node_modules/@fontsource/instrument-serif'), 'public, max-age=86400'],
  ['/_files/', NOTES_DIR, 'no-cache'],
];

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
};

await fsp.mkdir(NOTES_DIR, { recursive: true });
let library = await buildLibrary(NOTES_DIR);
const listeners = new Set();

let rebuildTimer;
fs.watch(NOTES_DIR, { recursive: true }, () => {
  clearTimeout(rebuildTimer);
  rebuildTimer = setTimeout(async () => {
    try {
      const next = await buildLibrary(NOTES_DIR);
      if (next.version === library.version) return;
      library = next;
      for (const res of listeners) res.write(`event: change\ndata: ${library.version}\n\n`);
    } catch (error) {
      console.error('Could not re-read notes:', error.message);
    }
  }, 150);
});

function send(res, status, body, type = 'text/plain; charset=utf-8', headers = {}) {
  res.writeHead(status, { 'Content-Type': type, ...headers });
  res.end(body);
}

const sendJson = (res, data, status = 200) => send(res, status, JSON.stringify(data), TYPES['.json'], { 'Cache-Control': 'no-store' });

async function sendFile(res, dir, rel, cache) {
  const file = path.resolve(dir, rel);
  if (file !== dir && !file.startsWith(dir + path.sep)) return send(res, 403, 'Forbidden');
  try {
    const stat = await fsp.stat(file);
    if (!stat.isFile()) return send(res, 404, 'Not found');
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': cache,
      'Last-Modified': stat.mtime.toUTCString(),
    });
    fs.createReadStream(file).pipe(res);
  } catch {
    send(res, 404, 'Not found');
  }
}

const server = http.createServer(async (req, res) => {
  let url;
  let pathname;
  try {
    url = new URL(req.url, 'http://localhost');
    pathname = decodeURIComponent(url.pathname);
  } catch {
    return send(res, 400, 'Bad request');
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Notebook is read-only', undefined, { Allow: 'GET, HEAD' });

  if (pathname === '/_api/tree') return sendJson(res, { version: library.version, root: library.tree() });
  if (pathname === '/_api/note') {
    const note = library.note(url.searchParams.get('url') || '');
    return note ? sendJson(res, note) : sendJson(res, { error: 'No note at this address' }, 404);
  }
  if (pathname === '/_api/search') return sendJson(res, library.search(url.searchParams.get('q') || ''));
  if (pathname === '/_api/events') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write(`retry: 2000\nevent: hello\ndata: ${library.version}\n\n`);
    listeners.add(res);
    req.on('close', () => listeners.delete(res));
    return;
  }
  for (const [prefix, dir, cache] of MOUNTS) {
    if (pathname.startsWith(prefix)) return sendFile(res, dir, pathname.slice(prefix.length), cache);
  }
  if (pathname.startsWith('/_')) return send(res, 404, 'Not found');
  return sendFile(res, PUBLIC_DIR, 'index.html', 'no-cache');
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Start Notebook on another port: PORT=4001 npm start`);
    process.exit(1);
  }
  throw error;
});

server.listen(PORT, HOST, () => {
  const tree = library.tree();
  console.log(`\n  Notebook is open at http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
  if (HOST === '0.0.0.0') {
    const lan = Object.values(os.networkInterfaces()).flat().filter((i) => i && i.family === 'IPv4' && !i.internal);
    for (const i of lan) console.log(`  On your phone (same Wi-Fi):  http://${i.address}:${PORT}`);
  }
  console.log(`  Reading ${tree.count} note${tree.count === 1 ? '' : 's'} from ${path.relative(process.cwd(), NOTES_DIR) || '.'}\n`);
});
