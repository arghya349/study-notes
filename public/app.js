// Notebook — client. Reads the library from the local server and renders it.

import { searchNotes } from './search.js';

// On Vercel the notebook is pre-rendered: data comes from JSON files and search runs here.
const STATIC = document.documentElement.dataset.static === 'true';
const api = {
  tree: () => getJSON(STATIC ? '/_api/tree.json' : '/_api/tree'),
  note: (url) => getJSON(STATIC ? encodeURI(`/_api/notes${url}.json`) : '/_api/note?url=' + encodeURIComponent(url)),
  async search(q) {
    if (!STATIC) return getJSON('/_api/search?q=' + encodeURIComponent(q));
    api.index ??= await getJSON('/_api/search.json');
    return searchNotes(api.index, q);
  },
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const html = String.raw;
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

const store = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem('notebook:' + key);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try { localStorage.setItem('notebook:' + key, JSON.stringify(value)); } catch {}
  },
};

const SIZES = [16, 17, 18, 19, 20, 22, 24];
const mobile = matchMedia('(max-width: 899px)');
const root = document.documentElement;

const state = {
  tree: null,
  version: null,
  nodes: new Map(),
  parents: new Map(),
  open: new Set(store.get('open', [])),
  headings: [],
  renderId: 0,
  lastY: 0,
  note: null,
};

const settings = {
  size: store.get('size', 3),
  face: store.get('face', null),
  theme: store.get('theme', 'auto'),
  style: store.get('style', 'folder'),
};
const STYLES = ['cobalt', 'willow'];

const icons = {
  chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5.5 6.5 6.5L9 18.5"/></svg>',
  folder: '<svg class="glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.25 7.25a2 2 0 0 1 2-2h3.7a1.5 1.5 0 0 1 1.06.44l1.56 1.56h7.18a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H5.25a2 2 0 0 1-2-2z"/><path d="M3.25 10h17.5"/></svg>',
  sparkle: '<svg class="ask-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5c.5 4.3 2.7 6.5 7 7-4.3.5-6.5 2.7-7 7-.5-4.3-2.7-6.5-7-7 4.3-.5 6.5-2.7 7-7Z"/><path d="M18.5 3v3M17 4.5h3"/></svg>',
  library: '<svg class="glyph" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.25" width="7" height="7" rx="2"/><rect x="13.5" y="4.25" width="7" height="7" rx="2"/><rect x="3.5" y="14.25" width="7" height="7" rx="2"/><rect x="13.5" y="14.25" width="7" height="7" rx="2"/></svg>',
};

/* ───────── Helpers ───────── */

async function getJSON(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw Object.assign(new Error(res.statusText), { status: res.status });
  return res.json();
}

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

function revised(ms) {
  if (!ms) return '';
  const date = new Date(ms);
  const now = new Date();
  const day = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round((day(now) - day(date)) / 864e5);
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', ...(date.getFullYear() !== now.getFullYear() && { year: 'numeric' }) });
}

function currentPath() {
  try {
    return decodeURIComponent(location.pathname).replace(/\/+$/, '') || '/';
  } catch {
    return location.pathname;
  }
}

function folderSummary(folder) {
  const parts = [];
  if (folder.folders.length) parts.push(plural(folder.folders.length, 'folder'));
  parts.push(plural(folder.count, 'note'));
  return parts.join(', ');
}

function notesIn(folder) {
  return [...folder.notes, ...folder.folders.flatMap(notesIn)];
}

function indexTree(tree) {
  state.nodes.clear();
  state.parents.clear();
  (function walk(folder) {
    state.nodes.set(folder.url, folder);
    for (const child of folder.folders) {
      state.parents.set(child.url, folder);
      walk(child);
    }
    for (const note of folder.notes) {
      state.nodes.set(note.url, note);
      state.parents.set(note.url, folder);
    }
  })(tree);
}

async function loadTree() {
  const data = await api.tree();
  state.tree = data.root;
  state.version = data.version;
  indexTree(state.tree);
  // Remember which folders carry their own style, so the next visit paints correctly at once.
  const skins = {};
  for (const node of state.nodes.values()) {
    if (node.type === 'folder' && node.style && state.parents.get(node.url)?.style !== node.style) skins[node.url] = node.style;
  }
  store.set('skins', skins);
}

function applySkin() {
  const node = state.nodes.get(currentPath());
  const folder = node?.type === 'note' ? state.parents.get(node.url) : node;
  const skin = settings.style === 'folder' ? folder?.style : settings.style;
  if (STYLES.includes(skin)) root.dataset.skin = skin;
  else delete root.dataset.skin;
  const face = settings.face ?? (root.dataset.skin ? 'sans' : 'serif');
  for (const b of $$('#reader [data-face]')) b.setAttribute('aria-pressed', b.dataset.face === face);
}

/* ───────── Sidebar ───────── */

function folderItem(folder, depth) {
  const open = state.open.has(folder.url);
  const children = folder.folders.map((f) => folderItem(f, depth + 1)).join('') + folder.notes.map((n) => noteItem(n, depth + 1)).join('');
  const empty = !folder.folders.length && !folder.notes.length;
  return html`<li class="tree-item${open ? ' is-open' : ''}" data-url="${esc(folder.url)}">
    <div class="tree-row folder-row" style="--depth:${depth}">
      <button class="disclosure" type="button" data-action="toggle-folder" aria-expanded="${open}" aria-label="Show contents of ${esc(folder.name)}"${empty ? ' disabled' : ''}>${icons.chevron}</button>
      <a href="${esc(folder.url)}" data-link>${icons.folder}<span class="label">${esc(folder.name)}</span><span class="count">${folder.count || ''}</span></a>
    </div>
    <div class="tree-children"><ul>${children}</ul></div>
  </li>`;
}

function noteItem(note, depth) {
  const number = note.number != null ? `<span class="num">${note.number}</span>` : '';
  return html`<li><a class="tree-row note-row" href="${esc(note.url)}" data-link style="--depth:${depth}">${number}<span class="label">${esc(note.title)}</span></a></li>`;
}

function renderSidebar() {
  const tree = state.tree;
  const parts = [
    html`<a class="tree-row home-row" href="/" data-link>${icons.library}<span class="label">Library</span><span class="count">${tree.count || ''}</span></a>`,
  ];
  if (tree.folders.length) parts.push(`<p class="tree-section">Folders</p><ul>${tree.folders.map((f) => folderItem(f, 0)).join('')}</ul>`);
  if (tree.notes.length) parts.push(`<p class="tree-section">Notes</p><ul>${tree.notes.map((n) => noteItem(n, 0)).join('')}</ul>`);
  $('#tree').innerHTML = parts.join('');
}

function setFolderOpen(url, open) {
  if (open) state.open.add(url);
  else state.open.delete(url);
  store.set('open', [...state.open]);
  const item = $(`.tree-item[data-url="${CSS.escape(url)}"]`);
  if (!item) return;
  item.classList.toggle('is-open', open);
  $('.disclosure', item).setAttribute('aria-expanded', open);
}

function syncSidebar() {
  const path = currentPath();
  for (let parent = state.parents.get(path); parent && parent.url !== '/'; parent = state.parents.get(parent.url)) {
    if (!state.open.has(parent.url)) setFolderOpen(parent.url, true);
  }
  let active = null;
  for (const link of $$('#tree a[data-link]')) {
    const match = decodeURIComponent(link.pathname) === path;
    const row = link.closest('.tree-row');
    row.classList.toggle('is-active', match);
    if (match) {
      link.setAttribute('aria-current', 'page');
      active = row;
    } else {
      link.removeAttribute('aria-current');
    }
  }
  if (active) {
    const box = $('#tree').getBoundingClientRect();
    const r = active.getBoundingClientRect();
    if (r.top < box.top || r.bottom > box.bottom) active.scrollIntoView({ block: 'nearest' });
  }
}

function toggleSidebar(force) {
  if (root.classList.contains('is-immersive') && force !== false) toggleImmersive(false);
  if (mobile.matches) {
    root.classList.toggle('sidebar-open', force);
    return;
  }
  const hidden = force === undefined ? !root.classList.contains('sidebar-hidden') : !force;
  root.classList.toggle('sidebar-hidden', hidden);
  store.set('sidebar', !hidden);
}

/* ───────── Views ───────── */

function coverFigure(src) {
  return src ? html`<figure class="cover" aria-hidden="true"><div class="cover-frame"><img src="${esc(src)}" alt="" decoding="async"></div></figure>` : '';
}

function folderCard(folder) {
  const sheets = notesIn(folder).slice(0, 3).reverse();
  const skin = folder.cover ? ` has-cover" style="--cover:url('${esc(encodeURI(folder.cover))}')` : '';
  return html`<li><a class="folder${skin}" href="${esc(folder.url)}" data-link>
    <span class="folder-tab" aria-hidden="true"></span>
    <span class="folder-back" aria-hidden="true"></span>
    <span class="folder-sheets" aria-hidden="true">${sheets.map((n) => `<span class="sheet"><span class="sheet-title">${esc(n.title)}</span></span>`).join('')}</span>
    <span class="folder-front">
      <span class="folder-name">${esc(folder.name)}</span>
      <span class="folder-count">${folder.count || folder.folders.length ? folderSummary(folder) : 'Empty'}</span>
    </span>
  </a></li>`;
}

function chapterList(notes) {
  const numbered = notes.some((n) => n.number != null);
  return html`<ol class="chapters${numbered ? ' is-numbered' : ''}" role="list">${notes.map((n) => html`<li><a class="chapter" href="${esc(n.url)}" data-link>
    ${numbered ? `<span class="chapter-num">${n.number ?? ''}</span>` : ''}
    <span class="chapter-main"><span class="chapter-title">${esc(n.title)}</span>${n.summary ? `<span class="chapter-summary">${esc(n.summary)}</span>` : ''}</span>
    <span class="chapter-time">${n.minutes} min</span>
  </a></li>`).join('')}</ol>`;
}

function homeView() {
  const tree = state.tree;
  const sub = tree.count || tree.folders.length
    ? `${folderSummary(tree)}. Last revised ${revised(tree.updated) || 'never'}.`
    : 'Nothing here yet.';
  const body = [];
  if (tree.folders.length) body.push(`<ul class="folders" role="list">${tree.folders.map(folderCard).join('')}</ul>`);
  if (tree.notes.length) body.push(`<h2 class="section-title">Notes</h2>${chapterList(tree.notes)}`);
  if (!tree.count && !tree.folders.length) {
    body.push(html`<div class="empty">
      <p class="empty-title">Your library is empty</p>
      <p>Create a folder inside <code>notes/</code> and add Markdown files to it. Notebook shows them as soon as you save.</p>
      <p>Or run <code>npm run new -- "Biology/Cells.md"</code> from the notebook folder.</p>
    </div>`);
  }
  return {
    title: 'Library',
    html: html`<div class="page"><header class="page-head"><h1 class="page-title">Library</h1><p class="page-sub">${sub}</p></header>${body.join('')}</div>`,
  };
}

function folderView(folder) {
  const sub = folder.count || folder.folders.length ? `${folderSummary(folder)}. Last revised ${revised(folder.updated) || 'never'}.` : 'Empty folder.';
  const body = [];
  if (folder.folders.length) body.push(`<ul class="folders" role="list">${folder.folders.map(folderCard).join('')}</ul>`);
  if (folder.notes.length) {
    if (folder.folders.length) body.push('<h2 class="section-title">Notes</h2>');
    body.push(chapterList(folder.notes));
  }
  if (!folder.folders.length && !folder.notes.length) {
    body.push(html`<div class="empty">
      <p class="empty-title">This folder is empty</p>
      <p>Add Markdown files to <code>notes/${esc(folder.file)}</code> and they will appear here.</p>
    </div>`);
  }
  return {
    title: folder.name,
    html: html`<div class="page">${coverFigure(folder.cover)}<header class="page-head"><h1 class="page-title">${esc(folder.name)}</h1><p class="page-sub">${sub}</p>${folder.count ? `<div class="page-actions">${askControl('folder', 'is-page')}</div>` : ''}</header>${body.join('')}</div>`,
  };
}

async function noteView(node) {
  const note = await api.note(node.url);
  const numbered = note.number != null;
  const meta = [];
  if (numbered) meta.push(`<span>Chapter ${note.number} of ${state.parents.get(node.url).notes.filter((n) => n.number != null).length}</span>`);
  meta.push(`<span>${note.minutes} min read</span>`);
  meta.push(`<span>Revised ${revised(note.updated)}</span>`);

  const chapter = numbered ? ` data-chapter style="--chapter:'${note.number}.'"` : '';
  let section = 0;
  const toc = note.headings.length > 1 ? html`<aside class="toc" aria-label="On this page"><div class="toc-inner">
    <p class="toc-title">On this page</p>
    <ol>${note.headings.map((h) => {
      const num = h.level === 2 && numbered ? `<span class="toc-num">${note.number}.${++section}</span>` : '';
      return `<li class="${h.level === 3 ? 'toc-sub' : ''}"><a href="#${esc(h.id)}" data-id="${esc(h.id)}">${num}<span>${esc(h.text)}</span></a></li>`;
    }).join('')}</ol>
  </div></aside>` : '';

  const link = (n, dir) => (n ? html`<a class="${dir}" href="${esc(n.url)}" data-link rel="${dir}">
    <span class="pager-dir">${dir === 'prev' ? 'Previous' : 'Next'}${n.number != null ? `, chapter ${n.number}` : ''}</span>
    <span class="pager-title">${esc(n.title)}</span></a>` : '');
  const pager = note.prev || note.next ? `<nav class="pager" aria-label="Chapters">${link(note.prev, 'prev')}${link(note.next, 'next')}</nav>` : '';

  return {
    title: note.title,
    html: html`<div class="note-layout">
      ${coverFigure(note.cover)}
      <article class="note">
        <header class="page-head"><h1 class="page-title">${esc(note.title)}</h1><p class="note-meta">${meta.join('')}</p><div class="page-actions">${askControl('note', 'is-page')}</div></header>
        <div class="prose"${chapter}>${note.html}</div>
        ${pager}
      </article>
      ${toc}
    </div>`,
    headings: note.headings,
    note,
  };
}

function missingView() {
  return {
    title: 'Not found',
    html: html`<div class="page"><header class="page-head"><h1 class="page-title">Nothing here</h1><p class="page-sub">There is no note or folder at this address. It may have been renamed or moved.</p></header>
      <div class="empty"><p><a href="/" data-link>Go to Library</a></p></div></div>`,
  };
}

async function render({ keepScroll = false } = {}) {
  const id = ++state.renderId;
  const path = currentPath();
  const node = state.nodes.get(path);
  let view;
  try {
    if (!node) view = missingView();
    else if (node.type === 'note') view = await noteView(node);
    else view = node.url === '/' ? homeView() : folderView(node);
  } catch (error) {
    if (error.status === 404) view = missingView();
    else throw error;
  }
  if (id !== state.renderId) return;

  state.note = view.note || null;
  applySkin();
  const el = $('#view');
  el.innerHTML = view.html;
  decorateHeadings(el);
  if (!keepScroll) {
    el.classList.remove('view-enter');
    void el.offsetWidth;
    el.classList.add('view-enter');
  }
  state.headings = (view.headings || []).map((h) => ({ ...h, el: document.getElementById(h.id), link: $(`.toc a[data-id="${CSS.escape(h.id)}"]`) }));
  document.title = view.title === 'Library' ? 'Notebook' : `${view.title} — Notebook`;

  const parent = node && node.url !== '/' ? state.parents.get(node.url) : null;
  const back = $('#back');
  back.hidden = !parent;
  if (parent) {
    back.href = parent.url;
    $('span', back).textContent = parent.url === '/' ? 'Library' : parent.name;
  }
  $('#toolbar-title').textContent = view.title;

  syncSidebar();
  setupFrames();
  onScroll();
}

/* ───────── Navigation ───────── */

function scrollToHash(hash, smooth = true) {
  if (!hash) return false;
  let target;
  try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch {}
  if (!target) return false;
  target.scrollIntoView({ behavior: smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto', block: 'start' });
  return true;
}

async function navigate(href) {
  history.replaceState({ ...history.state, scroll: scrollY }, '');
  history.pushState({}, '', href);
  if (mobile.matches) toggleSidebar(false);
  await render();
  if (!scrollToHash(location.hash, false)) window.scrollTo(0, 0);
  $('#view').focus({ preventScroll: true });
}

document.addEventListener('click', (event) => {
  const actionEl = event.target.closest('[data-action]');
  if (actionEl) return handleAction(actionEl.dataset.action, actionEl, event);

  const copy = event.target.closest('.code-copy');
  if (copy) return copyCode(copy);

  const askToggle = event.target.closest('.ask-toggle');
  if (askToggle) return toggleAsk(askToggle.closest('.ask'));
  const askOption = event.target.closest('.ask-option');
  if (askOption) return openTutor(askOption, event);
  closeAsk();

  const a = event.target.closest('a[href]');
  if (!a || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (a.target === '_blank' || a.hasAttribute('download')) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || url.pathname.startsWith('/_')) return;
  event.preventDefault();
  if (url.pathname === location.pathname && url.hash) {
    history.replaceState(history.state, '', url.hash);
    scrollToHash(url.hash);
    return;
  }
  navigate(url.pathname + url.hash);
});

window.addEventListener('popstate', async () => {
  await render();
  const y = history.state?.scroll;
  if (y != null) window.scrollTo(0, y);
  else if (!scrollToHash(location.hash, false)) window.scrollTo(0, 0);
});

function handleAction(action, el, event) {
  switch (action) {
    case 'toggle-sidebar': return toggleSidebar();
    case 'close-sidebar': return toggleSidebar(false);
    case 'toggle-folder': {
      event.preventDefault();
      const url = el.closest('.tree-item').dataset.url;
      return setFolderOpen(url, !state.open.has(url));
    }
    case 'search': return openPalette();
    case 'close-palette': return closePalette();
    case 'reader': return toggleReader();
    case 'fullscreen': return toggleImmersive();
    case 'dismiss-toast': return hideToast();
  }
}

/* ───────── Scrolling: toolbar, progress, contents ───────── */

let ticking = false;
function onScroll() {
  ticking = false;
  const toolbar = $('#toolbar');
  const y = window.scrollY;
  toolbar.classList.toggle('is-scrolled', y > 2);
  if (root.classList.contains('is-immersive') && $('#reader').hidden) {
    const delta = y - state.lastY;
    if (y < 64 || delta < -6) toolbar.classList.remove('is-tucked');
    else if (delta > 6) toolbar.classList.add('is-tucked');
  } else {
    toolbar.classList.remove('is-tucked');
  }
  state.lastY = y;
  const title = $('#view .page-title');
  toolbar.classList.toggle('show-title', !!title && title.getBoundingClientRect().bottom < 64);

  const max = document.documentElement.scrollHeight - innerHeight;
  const reading = !!$('#view .prose');
  toolbar.style.setProperty('--progress', reading && max > 0 ? Math.min(1, y / max) : 0);

  if (state.headings.length) {
    let current = null;
    for (const h of state.headings) {
      if (h.el && h.el.getBoundingClientRect().top < 140) current = h;
    }
    if (max - y < 4) current = state.headings.at(-1);
    for (const h of state.headings) h.link?.classList.toggle('is-current', h === current);
  }
}
window.addEventListener('scroll', () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(onScroll);
  }
}, { passive: true });

/* ───────── Ask AI ─────────
   Every folder, chapter and section has a pill that springs open into
   ChatGPT, Gemini and Claude. Each opens a new chat with a tutoring prompt
   built from the notes on screen. */

const TUTORS = {
  chatgpt: { name: 'ChatGPT', url: (prompt) => 'https://chatgpt.com/?q=' + encodeURIComponent(prompt) },
  gemini: { name: 'Gemini', url: (prompt) => 'https://gemini.google.com/app?q=' + encodeURIComponent(prompt) },
  claude: { name: 'Claude', url: (prompt) => 'https://claude.ai/new?q=' + encodeURIComponent(prompt) },
};
const PROMPT_NOTES_LIMIT = 1400;

function askControl(scope, variant = '') {
  return html`<span class="ask ${variant}" data-scope="${scope}">
    <button class="ask-toggle" type="button" aria-expanded="false">${icons.sparkle}<span class="ask-label">Ask AI</span></button>
    <span class="ask-options" role="group" aria-label="Learn this with an AI tutor"><span class="ask-options-inner">${
      Object.entries(TUTORS).map(([id, t]) => `<a class="ask-option" data-ai="${id}" href="#" target="_blank" rel="noopener noreferrer" tabindex="-1">${t.name}</a>`).join('')
    }</span></span>
  </span>`;
}

function decorateHeadings(view) {
  for (const heading of $$('.prose > h2:not(.sr-only), .prose > h3', view)) {
    heading.insertAdjacentHTML('beforeend', askControl('section', 'is-inline'));
  }
}

function closeAsk(focusToggle = false) {
  for (const ask of $$('.ask.is-open')) {
    ask.classList.remove('is-open');
    const toggle = $('.ask-toggle', ask);
    toggle.setAttribute('aria-expanded', 'false');
    $$('.ask-option', ask).forEach((a) => a.setAttribute('tabindex', '-1'));
    if (focusToggle) toggle.focus();
  }
}

function toggleAsk(ask) {
  const opening = !ask.classList.contains('is-open');
  closeAsk();
  if (!opening) return;
  const prompt = tutorPrompt(ask);
  ask.dataset.topic = prompt.topic;
  for (const option of $$('.ask-option', ask)) {
    option.href = TUTORS[option.dataset.ai].url(prompt.text);
    option.setAttribute('tabindex', '0');
  }
  ask.classList.add('is-open');
  $('.ask-toggle', ask).setAttribute('aria-expanded', 'true');
}

async function openTutor(option, event) {
  const ask = option.closest('.ask');
  const tutor = TUTORS[option.dataset.ai];
  const prompt = new URL(option.href).searchParams.get('q') || '';
  if (!prompt) return event.preventDefault();
  try { await navigator.clipboard.writeText(prompt); } catch {}
  showToast(`Opening ${tutor.name} with a lesson on ${ask.dataset.topic}. The prompt is on your clipboard too, in case you need to paste it.`, 6000);
  setTimeout(() => closeAsk(), 400);
}

function cleanText(node) {
  const copy = node.cloneNode(true);
  copy.querySelectorAll('.ask, iframe, .code-head, .result, .katex-mathml, .sr-only').forEach((n) => n.remove());
  return copy.textContent.replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
}

function blockText(el) {
  if (el.matches('.example, .code')) return 'Example code:\n' + ($('code', el)?.textContent.trim() || '');
  if (el.matches('.diagram')) {
    const label = [$('svg[aria-label]', el)?.getAttribute('aria-label'), $('figcaption', el)?.textContent].filter(Boolean).join(' ');
    return label ? 'Diagram: ' + label : '';
  }
  if (el.matches('details.callout')) {
    return 'Practice question: ' + cleanText($('.callout-text', el) || el) + '\nAnswer: ' + cleanText($('.callout-body', el) || el);
  }
  if (el.matches('.callout')) {
    const title = [$('.callout-kind', el), $('.callout-text', el)].filter(Boolean).map(cleanText).join(', ');
    return `${title}: ${cleanText($('.callout-body', el) || el)}`;
  }
  if (el.matches('.table-wrap')) {
    return $$('tr', el).map((tr) => $$('th, td', tr).map(cleanText).join(' | ')).join('\n');
  }
  return cleanText(el);
}

const clipText = (text, max) => (text.length <= max ? text : text.slice(0, text.lastIndexOf(' ', max)) + ' …');

function trail(url) {
  const names = [];
  for (let node = state.nodes.get(url); node && node.url !== '/'; node = state.parents.get(node.url)) {
    names.unshift(node.type === 'note' && node.number != null ? `Chapter ${node.number}: ${node.title}` : node.title || node.name);
  }
  return names;
}

function tutorPrompt(ask) {
  const path = currentPath();
  const node = state.nodes.get(path);
  const names = trail(path);
  let topic;
  let notes;
  let where;

  if (ask.dataset.scope === 'folder') {
    topic = node.name;
    where = names.join(' › ');
    notes = 'The chapters in this folder:\n' + notesIn(node).map((n) => `${n.number != null ? n.number + '. ' : '- '}${n.title}: ${n.summary}`).join('\n');
  } else if (ask.dataset.scope === 'note') {
    const note = state.note;
    topic = note.title;
    where = names.join(' › ');
    const sections = note.headings
      .filter((h) => h.level === 2)
      .map((h, i) => `${note.number != null ? `${note.number}.${i + 1}` : '-'} ${h.text}`)
      .join('\n');
    notes = `${note.summary}\n\nSections:\n${sections}`;
  } else {
    const heading = ask.closest('h2, h3');
    const level = Number(heading.tagName[1]);
    topic = cleanText(heading);
    const parts = [];
    for (let el = heading.nextElementSibling; el; el = el.nextElementSibling) {
      if (/^H[1-6]$/.test(el.tagName) && Number(el.tagName[1]) <= level) break;
      if (el.matches('h3, h4')) parts.push('\n' + cleanText(el) + ':');
      else if (!el.matches('.footnotes')) parts.push(blockText(el));
    }
    where = names.join(' › ');
    notes = parts.filter(Boolean).join('\n\n');
  }

  const text = [
    `I'm studying ${topic}. In my notes it sits under: ${where}.`,
    '',
    'Please be my patient tutor and teach it to me step by step, holding my hand the whole way:',
    '1. Start with the big idea in plain, simple words, as if I am a complete beginner.',
    '2. Show me one small, concrete example and walk me through it line by line.',
    '3. Ask me one short question to check I understood, then wait for my answer before moving on.',
    '4. Build up to the finer details one at a time, checking in with me as we go.',
    '5. When we finish, invite me to ask about anything I am still unsure of, and answer clearly.',
    '',
    'Here are my notes on it, so you can follow what I am learning:',
    '"""',
    clipText(notes, PROMPT_NOTES_LIMIT),
    '"""',
  ].join('\n');
  return { topic, text };
}

/* ───────── Full screen ─────────
   Laptops get the real Fullscreen API. iPhone Safari doesn't allow it for
   pages, so there the same button hides every bit of chrome instead, and
   Notebook suggests adding it to the Home Screen for a browser-free view. */

const canFullscreen = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
const isIOS = /iPhone|iPod|iPad/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isStandalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const fullscreenElement = () => document.fullscreenElement || document.webkitFullscreenElement;

async function toggleImmersive(force) {
  const on = force ?? !root.classList.contains('is-immersive');
  root.classList.toggle('is-immersive', on);
  const button = $('[data-action="fullscreen"]');
  button.setAttribute('aria-pressed', on);
  button.setAttribute('aria-label', on ? 'Exit full screen' : 'Full screen');
  button.title = on ? 'Exit full screen (F)' : 'Full screen (F)';
  if (on) {
    root.classList.remove('sidebar-open');
    toggleReader(false);
    if (canFullscreen && !fullscreenElement()) {
      try {
        await (root.requestFullscreen ? root.requestFullscreen({ navigationUI: 'hide' }) : root.webkitRequestFullscreen());
      } catch {}
    } else if (!canFullscreen && isIOS && !isStandalone && !store.get('home-screen-hint', false)) {
      showToast('For true full screen on iPhone, tap Share, then Add to Home Screen. Notebook will open without the browser bars.');
      store.set('home-screen-hint', true);
    }
  } else {
    $('#toolbar').classList.remove('is-tucked');
    if (fullscreenElement()) {
      try {
        await (document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen());
      } catch {}
    }
  }
  setTimeout(() => $$('.result-frame').forEach(fitFrame), 350);
}

for (const type of ['fullscreenchange', 'webkitfullscreenchange']) {
  document.addEventListener(type, () => {
    if (!fullscreenElement() && root.classList.contains('is-immersive')) toggleImmersive(false);
  });
}

document.addEventListener('mousemove', (event) => {
  if (event.clientY < 64 && root.classList.contains('is-immersive')) $('#toolbar').classList.remove('is-tucked');
}, { passive: true });

let toastTimer;
function showToast(text, duration = 9000) {
  const toast = $('#toast');
  $('.toast-text', toast).textContent = text;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, duration);
}
function hideToast() {
  $('#toast').hidden = true;
}

/* ───────── Live examples ───────── */

const effectiveScheme = () => {
  if (settings.theme === 'paper') return 'light';
  if (settings.theme === 'night') return 'dark';
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

function fitFrame(frame) {
  try {
    const doc = frame.contentDocument;
    if (!doc?.documentElement) return;
    doc.documentElement.style.colorScheme = effectiveScheme();
    frame.style.height = '0px';
    frame.style.height = Math.max(56, doc.documentElement.scrollHeight) + 'px';
  } catch {}
}

function setupFrames() {
  for (const frame of $$('.result-frame')) {
    frame.addEventListener('load', () => {
      fitFrame(frame);
      // Images inside the example can arrive after the first layout.
      setTimeout(() => fitFrame(frame), 300);
    });
    if (frame.contentDocument?.readyState === 'complete') fitFrame(frame);
  }
}

document.addEventListener('toggle', (event) => {
  if (event.target.open) $$('.result-frame', event.target).forEach(fitFrame);
}, true);

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => $$('.result-frame').forEach(fitFrame), 120);
});

async function copyCode(button) {
  const code = button.closest('.code')?.querySelector('code');
  if (!code) return;
  try {
    await navigator.clipboard.writeText(code.textContent);
    button.textContent = 'Copied';
  } catch {
    button.textContent = 'Press ⌘C';
    getSelection().selectAllChildren(code);
  }
  button.classList.add('is-done');
  setTimeout(() => {
    button.textContent = 'Copy';
    button.classList.remove('is-done');
  }, 1600);
}

/* ───────── Reader settings ───────── */

function applySettings() {
  root.style.setProperty('--text-size', SIZES[settings.size] + 'px');
  if (settings.face) root.dataset.face = settings.face;
  else delete root.dataset.face;
  if (settings.theme === 'auto') delete root.dataset.theme;
  else root.dataset.theme = settings.theme;

  const panel = $('#reader');
  const range = $('#size-range');
  range.value = settings.size;
  range.style.setProperty('--fill', (settings.size / (SIZES.length - 1)) * 100 + '%');
  range.setAttribute('aria-valuetext', SIZES[settings.size] + ' pixels');
  for (const b of $$('[data-style]', panel)) b.setAttribute('aria-pressed', b.dataset.style === settings.style);
  for (const b of $$('[data-theme]', panel)) b.setAttribute('aria-checked', b.dataset.theme === settings.theme);
  if (state.tree) applySkin();
  $$('.result-frame').forEach(fitFrame);
}

function toggleReader(force) {
  const panel = $('#reader');
  const open = force ?? panel.hidden;
  panel.hidden = !open;
  $('[data-action="reader"]').setAttribute('aria-expanded', open);
}

$('#reader').addEventListener('click', (event) => {
  const b = event.target.closest('button');
  if (!b) return;
  if (b.dataset.face) settings.face = b.dataset.face;
  if (b.dataset.theme) settings.theme = b.dataset.theme;
  if (b.dataset.style) settings.style = b.dataset.style;
  store.set('face', settings.face);
  store.set('theme', settings.theme);
  store.set('style', settings.style);
  applySettings();
});

$('#size-range').addEventListener('input', (event) => {
  settings.size = Number(event.target.value);
  store.set('size', settings.size);
  applySettings();
});

document.addEventListener('pointerdown', (event) => {
  const panel = $('#reader');
  if (!panel.hidden && !panel.contains(event.target) && !event.target.closest('[data-action="reader"]')) toggleReader(false);
});

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => $$('.result-frame').forEach(fitFrame));

/* ───────── Search ───────── */

const palette = {
  el: $('#palette'),
  input: $('#palette-input'),
  body: $('#palette-results'),
  items: [],
  index: 0,
  lastFocus: null,
  timer: null,
};

function openPalette() {
  if (!palette.el.hidden) return palette.input.select();
  palette.lastFocus = document.activeElement;
  toggleReader(false);
  palette.el.hidden = false;
  palette.input.value = '';
  showAllNotes();
  palette.input.focus();
}

function closePalette() {
  if (palette.el.hidden) return;
  palette.el.hidden = true;
  palette.lastFocus?.focus?.({ preventScroll: true });
}

function paletteItems(items, group) {
  palette.items = items;
  palette.index = 0;
  palette.body.innerHTML = (group ? `<p class="palette-group">${group}</p>` : '') + items.map((item, i) => html`<a class="palette-item" id="result-${i}" role="option" href="${esc(item.url)}" aria-selected="${i === 0}">
    <span class="palette-item-head"><span class="palette-item-title">${item.title}</span><span class="palette-item-folder">${esc(item.folder)}</span></span>
    ${item.snippet ? `<span class="palette-item-snippet">${item.snippet}</span>` : ''}
  </a>`).join('');
  palette.input.setAttribute('aria-activedescendant', items.length ? 'result-0' : '');
}

function showAllNotes() {
  const notes = notesIn(state.tree).map((n) => {
    const folder = state.parents.get(n.url);
    return { url: n.url, title: esc(n.title), folder: folder.url === '/' ? 'Library' : folder.name, snippet: '' };
  });
  if (notes.length) paletteItems(notes, 'Notes');
  else palette.body.innerHTML = '<p class="palette-empty">Add notes to your library to search them.</p>';
}

async function runSearch() {
  const q = palette.input.value.trim();
  if (!q) return showAllNotes();
  const results = await api.search(q);
  if (q !== palette.input.value.trim()) return;
  if (!results.length) {
    palette.items = [];
    palette.body.innerHTML = `<p class="palette-empty">No notes contain “${esc(q)}”.</p>`;
    return;
  }
  paletteItems(results);
}

function movePalette(step) {
  if (!palette.items.length) return;
  palette.index = (palette.index + step + palette.items.length) % palette.items.length;
  $$('.palette-item', palette.body).forEach((el, i) => el.setAttribute('aria-selected', i === palette.index));
  const active = $(`#result-${palette.index}`);
  active.scrollIntoView({ block: 'nearest' });
  palette.input.setAttribute('aria-activedescendant', active.id);
}

palette.input.addEventListener('input', () => {
  clearTimeout(palette.timer);
  palette.timer = setTimeout(runSearch, 80);
});

palette.input.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') { event.preventDefault(); movePalette(1); }
  else if (event.key === 'ArrowUp') { event.preventDefault(); movePalette(-1); }
  else if (event.key === 'Enter') {
    event.preventDefault();
    const item = palette.items[palette.index];
    if (item) {
      closePalette();
      navigate(item.url);
    }
  }
});

palette.body.addEventListener('click', (event) => {
  const a = event.target.closest('.palette-item');
  if (!a) return;
  event.preventDefault();
  event.stopPropagation();
  closePalette();
  navigate(a.getAttribute('href'));
});

palette.body.addEventListener('pointermove', (event) => {
  const a = event.target.closest('.palette-item');
  if (!a) return;
  const i = Number(a.id.slice(7));
  if (i !== palette.index) movePalette(i - palette.index);
});

/* ───────── Keyboard ───────── */

const isTyping = (el) => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

document.addEventListener('keydown', (event) => {
  const mod = event.metaKey || event.ctrlKey;
  const key = event.key.toLowerCase();
  if (mod && key === 'k') {
    event.preventDefault();
    return palette.el.hidden ? openPalette() : closePalette();
  }
  if (mod && event.key === '\\') {
    event.preventDefault();
    return toggleSidebar();
  }
  if (event.key === 'Escape') {
    if ($('.ask.is-open')) return closeAsk(true);
    if (!palette.el.hidden) return closePalette();
    if (!$('#reader').hidden) return toggleReader(false);
    if (root.classList.contains('sidebar-open')) return toggleSidebar(false);
    if (root.classList.contains('is-immersive')) return toggleImmersive(false);
    return;
  }
  if (mod || event.altKey || isTyping(event.target)) return;
  if (event.key === '/') {
    event.preventDefault();
    openPalette();
  } else if (key === 'f') {
    event.preventDefault();
    toggleImmersive();
  } else if (event.key === '[' || event.key === ']') {
    $(event.key === '[' ? '.pager .prev' : '.pager .next')?.click();
  }
});

/* ───────── Live updates ───────── */

function listen() {
  if (STATIC) return;
  const events = new EventSource('/_api/events');
  const refresh = async (event) => {
    if (event.data === state.version) return;
    await loadTree();
    renderSidebar();
    const y = scrollY;
    await render({ keepScroll: true });
    window.scrollTo(0, y);
  };
  events.addEventListener('change', refresh);
  events.addEventListener('hello', refresh);
}

/* ───────── Start ───────── */

history.scrollRestoration = 'manual';
applySettings();
mobile.addEventListener('change', () => root.classList.remove('sidebar-open'));

try {
  await loadTree();
  renderSidebar();
  await render();
  scrollToHash(location.hash, false);
} catch (error) {
  $('#view').innerHTML = html`<div class="page"><header class="page-head"><h1 class="page-title">Notebook can’t reach its library</h1>
    <p class="page-sub">Start the server with <code>npm start</code> in the notebook folder, then reload this page.</p></header></div>`;
  console.error(error);
}
listen();
