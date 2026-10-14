// Markdown → HTML for Notebook.
// Adds math, ==highlights==, [[wiki links]], callouts (with foldable
// questions), HTML syntax highlighting and live "Result" previews.
import { Marked } from 'marked';
import markedFootnote from 'marked-footnote';
import katex from 'katex';

export function slugify(text) {
  return String(text)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '') || 'untitled';
}

export function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

const CALLOUTS = {
  note: ['Note', 'note'],
  info: ['Note', 'note'],
  tip: ['Tip', 'tip'],
  hint: ['Tip', 'tip'],
  important: ['Important', 'important'],
  warning: ['Watch out', 'warning'],
  caution: ['Caution', 'caution'],
  danger: ['Caution', 'caution'],
  definition: ['Definition', 'definition'],
  theorem: ['Theorem', 'theorem'],
  example: ['Example', 'example'],
  remember: ['Remember', 'remember'],
  summary: ['In short', 'summary'],
  question: ['Question', 'question'],
  predict: ['Predict', 'predict'],
  idea: ['Big idea', 'idea'],
};

const LANGUAGES = { cpp: 'C++', 'c++': 'C++', output: 'Output', input: 'Input', html: 'HTML', css: 'CSS', js: 'JavaScript', javascript: 'JavaScript', json: 'JSON', bash: 'Terminal', sh: 'Terminal', text: 'Text' };

function tex(source, displayMode) {
  return katex.renderToString(source, { displayMode, throwOnError: false, output: 'htmlAndMathml' });
}

// Minimal, dependable HTML highlighter: comments, doctype, tags, attributes.
const TAG_RE = /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/?[A-Za-z][\w-]*(?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*\s*\/?>/gi;
const ATTR_RE = /(\s+)([^\s"'>/=]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s"'=<>`]+))?/g;

function highlightTag(tag) {
  if (tag.startsWith('<!--')) return `<span class="tok-comment">${escapeHtml(tag)}</span>`;
  if (/^<!doctype/i.test(tag)) return `<span class="tok-doctype">${escapeHtml(tag)}</span>`;
  const m = /^(<\/?)([A-Za-z][\w-]*)([\s\S]*?)(\s*\/?>)$/.exec(tag);
  if (!m) return escapeHtml(tag);
  const attrs = m[3].replace(ATTR_RE, (_, space, name, eq, value) => (
    space + `<span class="tok-attr">${escapeHtml(name)}</span>` +
    (eq ? `<span class="tok-punct">${escapeHtml(eq)}</span><span class="tok-value">${escapeHtml(value)}</span>` : '')
  ));
  return `<span class="tok-punct">${escapeHtml(m[1])}</span><span class="tok-tag">${m[2]}</span>${attrs}<span class="tok-punct">${escapeHtml(m[4])}</span>`;
}

export function highlightHtml(source) {
  let out = '';
  let last = 0;
  for (const m of source.matchAll(TAG_RE)) {
    out += escapeHtml(source.slice(last, m.index)) + highlightTag(m[0]);
    last = m.index + m[0].length;
  }
  return out + escapeHtml(source.slice(last));
}

// Browser defaults stay visible (heading sizes, bullets, blue links); only the font and canvas are softened.
// C++: comments, preprocessor lines, strings, numbers and keywords.
const CPP_KEYWORDS = new Set(('int char bool float double void long short unsigned signed const constexpr auto return if else for while do ' +
  'switch case default break continue using namespace struct class public private protected true false new delete nullptr ' +
  'template typename sizeof static inline').split(' '));
const CPP_RE = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(^[ \t]*#[^\n]*)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)/gm;

export function highlightCpp(source) {
  let out = '';
  let last = 0;
  for (const m of source.matchAll(CPP_RE)) {
    const [text, comment, pre, string, number, word] = m;
    let cls = comment ? 'tok-comment' : pre ? 'tok-pre' : string ? 'tok-value' : number ? 'tok-num' : CPP_KEYWORDS.has(word) ? 'tok-tag' : '';
    out += escapeHtml(source.slice(last, m.index)) + (cls ? `<span class="${cls}">${escapeHtml(text)}</span>` : escapeHtml(text));
    last = m.index + text.length;
  }
  return out + escapeHtml(source.slice(last));
}

const PREVIEW_STYLE = ':root{color-scheme:light}body{margin:18px 22px;font:16px/1.5 -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:light-dark(#1d1d1f,#ececec);background:light-dark(#fff,#1e1e20)}img{max-width:100%;height:auto}@media (pointer:coarse){input,select,textarea{font-size:16px}}';

function previewDocument(source, baseHref) {
  // Links open in a new tab so an example never navigates its own little window away.
  const head = `<meta charset="utf-8"><base href="${escapeHtml(baseHref)}" target="_blank"><style>${PREVIEW_STYLE}</style>`;
  if (/<head[^>]*>/i.test(source)) return source.replace(/<head[^>]*>/i, (h) => h + head);
  return `<!doctype html><html><head>${head}</head><body>${source}</body></html>`;
}

function plainInline(tokens = []) {
  return tokens.map((t) => (t.tokens ? plainInline(t.tokens) : t.text ?? '')).join('');
}

function isRelative(href) {
  return href && !/^([a-z][a-z0-9+.-]*:|\/|#)/i.test(href);
}

const unescapeHtml = (s) => s.replace(/&(lt|gt|amp|quot|#39);/g, (_, e) => ({ lt: '<', gt: '>', amp: '&', quot: '"', '#39': "'" }[e]));

// Inline code inside lesson boxes gets the same colours as code blocks.
function highlightInline(html) {
  return html.replace(/<code>([\s\S]*?)<\/code>/g, (_, code) => {
    const raw = unescapeHtml(code);
    const lit = /^\s*<[!/a-zA-Z]/.test(raw) ? highlightHtml(raw) : highlightCpp(raw);
    return `<code class="lit">${lit}</code>`;
  });
}

// ::: name Optional title … ::: blocks. Each name is a lesson component styled in app.css.
const BOXES = {
  tiles: (html) => html.replace(/<li>((?:\s*<code>[^<]*<\/code>)+|\s*<strong>[\s\S]*?<\/strong>)?([\s\S]*?)<\/li>/g, (_, key, rest) =>
    `<li>${key ? `<span class="tile-key">${key}</span>` : ''}<span class="tile-text">${rest.trim()}</span></li>`),
  flow: (html) => html.replace(/<li>(\s*<strong>[\s\S]*?<\/strong>)?([\s\S]*?)<\/li>/g, (_, title, rest) =>
    `<li><span class="flow-mark" aria-hidden="true"></span><span class="flow-body">${title ? `<span class="flow-title">${title}</span>` : ''}<span class="flow-text">${rest.trim()}</span></span></li>`),
  anatomy: (html) => highlightInline(html).replace(/<li>(\s*(?:<code class="lit">[\s\S]*?<\/code>\s*(?:<br>\s*)?)+)([\s\S]*?)<\/li>/g, (_, code, rest) =>
    `<li><span class="part-code">${code.replace(/<br>/g, '')}</span><span class="part-text">${rest.trim()}</span></li>`),
  trace: (html) => html.replace(/<li>\s*<code>([\s\S]*?)<\/code>\s*(?:→|->)?\s*<code>([\s\S]*?)<\/code>([\s\S]*?)<\/li>/g, (_, line, screen, note) =>
    `<li><code class="lit trace-line"><span>${highlightCpp(unescapeHtml(line))}</span></code><span class="trace-screen"><span class="trace-out">${screen.replace(/⏎/g, '<br>')}</span><i class="trace-caret"></i></span>${note.trim() ? `<span class="trace-note">${note.trim()}</span>` : ''}</li>`),
};

let ctx;

const marked = new Marked({ gfm: true });

marked.use(markedFootnote({ description: 'Footnotes' }));

marked.use({
  extensions: [
    {
      name: 'box',
      level: 'block',
      start(src) {
        const i = src.search(/(^|\n):::[ \t]*[\w-]/);
        return i < 0 ? undefined : i + (src[i] === '\n' ? 1 : 0);
      },
      tokenizer(src) {
        const m = /^:::[ \t]*([\w-]+)[ \t]*([^\n]*)\n([\s\S]*?)\n:::[ \t]*(?:\n+|$)/.exec(src);
        if (!m) return;
        const token = { type: 'box', raw: m[0], name: m[1].toLowerCase(), title: [], tokens: [] };
        if (m[2].trim()) this.lexer.inline(m[2].trim(), token.title);
        this.lexer.blockTokens(m[3], token.tokens);
        return token;
      },
      renderer(t) {
        const body = (BOXES[t.name] || ((h) => h))(this.parser.parse(t.tokens));
        const title = t.title.length ? `<p class="box-title">${this.parser.parseInline(t.title)}</p>` : '';
        return `<div class="box box-${escapeHtml(t.name)}">${title}${body}</div>\n`;
      },
    },
    {
      name: 'callout',
      level: 'block',
      start(src) {
        const i = src.search(/(^|\n) {0,3}> ?\[!/);
        return i < 0 ? undefined : i + (src[i] === '\n' ? 1 : 0);
      },
      tokenizer(src) {
        const m = /^ {0,3}> ?\[!([\w-]+)\]([+-]?)[ \t]*([^\n]*)(?:\n|$)((?: {0,3}>[^\n]*(?:\n|$))*)/.exec(src);
        if (!m) return;
        const kind = m[1].toLowerCase();
        const [label, style] = CALLOUTS[kind] || [kind[0].toUpperCase() + kind.slice(1), 'note'];
        const token = { type: 'callout', raw: m[0], label, style, fold: m[2], title: [], tokens: [] };
        if (m[3].trim()) this.lexer.inline(m[3].trim(), token.title);
        this.lexer.blockTokens(m[4].replace(/^ {0,3}> ?/gm, ''), token.tokens);
        return token;
      },
      renderer(t) {
        const title = t.title.length ? `<span class="callout-text">${this.parser.parseInline(t.title)}</span>` : '';
        const head = `<span class="callout-kind">${escapeHtml(t.label)}</span>${title}`;
        const body = t.tokens.length ? `<div class="callout-body">${this.parser.parse(t.tokens)}</div>` : '';
        if (t.fold) {
          return `<details class="callout callout-${t.style}"${t.fold === '+' ? ' open' : ''}><summary class="callout-title">${head}<span class="callout-reveal" aria-hidden="true"></span></summary>${body}</details>\n`;
        }
        return `<aside class="callout callout-${t.style}"><p class="callout-title">${head}</p>${body}</aside>\n`;
      },
    },
    {
      name: 'blockMath',
      level: 'block',
      start(src) {
        const i = src.search(/(^|\n)\$\$/);
        return i < 0 ? undefined : i + (src[i] === '\n' ? 1 : 0);
      },
      tokenizer(src) {
        const m = /^\$\$([\s\S]+?)\$\$[ \t]*(?:\n+|$)/.exec(src);
        if (m) return { type: 'blockMath', raw: m[0], text: m[1].trim() };
      },
      renderer(t) {
        return `<div class="math-block">${tex(t.text, true)}</div>\n`;
      },
    },
    {
      name: 'inlineMath',
      level: 'inline',
      start(src) {
        const i = src.indexOf('$');
        return i < 0 ? undefined : i;
      },
      tokenizer(src) {
        const m = /^\$(?!\s)((?:\\\$|[^$\n])+?)(?<!\s)\$(?!\d)/.exec(src);
        if (m) return { type: 'inlineMath', raw: m[0], text: m[1] };
      },
      renderer(t) {
        return tex(t.text, false);
      },
    },
    {
      name: 'mark',
      level: 'inline',
      start(src) {
        const i = src.indexOf('==');
        return i < 0 ? undefined : i;
      },
      tokenizer(src) {
        const m = /^==(?=\S)([\s\S]*?\S)==/.exec(src);
        if (m) return { type: 'mark', raw: m[0], tokens: this.lexer.inlineTokens(m[1]) };
      },
      renderer(t) {
        return `<mark>${this.parser.parseInline(t.tokens)}</mark>`;
      },
    },
    {
      name: 'wikiLink',
      level: 'inline',
      start(src) {
        const i = src.indexOf('[[');
        return i < 0 ? undefined : i;
      },
      tokenizer(src) {
        const m = /^\[\[([^\]|#\n]+)(#[^\]|\n]+)?(?:\|([^\]\n]+))?\]\]/.exec(src);
        if (m) return { type: 'wikiLink', raw: m[0], target: m[1].trim(), hash: m[2] || '', label: (m[3] || m[1]).trim() };
      },
      renderer(t) {
        const url = ctx.resolveTitle(t.target);
        if (!url) return `<span class="link-missing" title="No note called “${escapeHtml(t.target)}”">${escapeHtml(t.label)}</span>`;
        const hash = t.hash ? '#' + slugify(t.hash.slice(1)) : '';
        return `<a href="${escapeHtml(url + hash)}" data-link>${escapeHtml(t.label)}</a>`;
      },
    },
  ],
  renderer: {
    heading({ tokens, depth }) {
      const text = plainInline(tokens).trim();
      let id = slugify(text);
      for (let n = 2; ctx.ids.has(id); n++) id = `${slugify(text)}-${n}`;
      ctx.ids.add(id);
      if (depth === 2 || depth === 3) ctx.headings.push({ id, text, level: depth });
      return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
    },
    link({ href, title, tokens }) {
      const label = this.parser.parseInline(tokens);
      const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
      if (isRelative(href)) {
        const [file, hash] = href.split('#');
        const target = decodeURIComponent(file);
        const note = /\.(md|markdown)$/i.test(target) ? ctx.resolveFile(target) : null;
        if (note) return `<a href="${escapeHtml(note + (hash ? '#' + hash : ''))}"${titleAttr} data-link>${label}</a>`;
        return `<a href="${escapeHtml(ctx.fileUrl(target) + (hash ? '#' + hash : ''))}"${titleAttr}>${label}</a>`;
      }
      const external = /^https?:/i.test(href);
      return `<a href="${escapeHtml(href)}"${titleAttr}${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
    },
    image({ href, title, text }) {
      const src = isRelative(href) ? ctx.fileUrl(decodeURIComponent(href)) : href;
      return `<img src="${escapeHtml(src)}" alt="${escapeHtml(text)}"${title ? ` title="${escapeHtml(title)}"` : ''} loading="lazy">`;
    },
    paragraph({ tokens }) {
      const only = tokens.filter((t) => !(t.type === 'text' && !t.text.trim()));
      if (only.length === 1 && only[0].type === 'image') {
        const img = only[0];
        const caption = img.title || img.text;
        return `<figure class="figure">${this.parser.parseInline(only)}${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ''}</figure>\n`;
      }
      return `<p>${this.parser.parseInline(tokens)}</p>\n`;
    },
    code({ text, lang }) {
      const info = (lang || '').trim();
      const language = info.split(/\s+/)[0].toLowerCase();
      const preview = /(^|\s)preview(\s|$)/.test(info);
      const file = /title="([^"]+)"/.exec(info)?.[1];
      const label = file || LANGUAGES[language] || language || 'Code';
      const cpp = language === 'cpp' || language === 'c++';
      const body = language === 'html' ? highlightHtml(text) : cpp ? highlightCpp(text) : escapeHtml(text);
      const kind = language === 'output' || language === 'input' ? ` is-${language}` : '';
      const block =
        `<div class="code${kind}"><div class="code-head"><span class="code-label">${escapeHtml(label)}</span>` +
        `<button class="code-copy" type="button">Copy</button></div>` +
        `<pre><code${language ? ` class="language-${escapeHtml(language)}"` : ''}>${body}</code></pre></div>`;
      if (!preview) return block + '\n';
      const doc = previewDocument(text, ctx.fileUrl(''));
      return (
        `<figure class="example">${block}<div class="result"><div class="result-window">` +
        `<div class="result-bar"><span class="result-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="result-label">Result</span></div>` +
        `<iframe class="result-frame" title="Rendered result" sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox" srcdoc="${escapeHtml(doc)}"></iframe>` +
        `</div></div></figure>\n`
      );
    },
    table(token) {
      return `<div class="table-wrap">${this.constructor.prototype.table.call(this, token)}</div>\n`;
    },
  },
});

/**
 * Render a note body.
 * @param {string} source Markdown without frontmatter.
 * @param {object} options { resolveFile(rel) → url|null, resolveTitle(title) → url|null, fileUrl(rel) → url }
 */
export function renderMarkdown(source, options) {
  ctx = { ...options, ids: new Set(), headings: [] };
  try {
    const html = marked.parse(source);
    return { html, headings: ctx.headings };
  } finally {
    ctx = null;
  }
}
