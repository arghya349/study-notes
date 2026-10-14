// Full-text search over notes. Shared by the local server and the static site.
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

function clip(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.–—-]+$/, '') + '…';
}

/**
 * @param {Array<{url, title, text, summary, folder}>} notes
 * @returns {Array<{url, title, folder, snippet}>} title and snippet are HTML with <mark>s
 */
export function searchNotes(notes, query, limit = 20) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const results = [];
  for (const note of notes) {
    const title = note.title.toLowerCase();
    const text = note.text.toLowerCase();
    if (!terms.every((t) => title.includes(t) || text.includes(t))) continue;
    let score = title.startsWith(terms.join(' ')) ? 40 : 0;
    for (const t of terms) {
      if (title.includes(t)) score += 12;
      score += Math.min(text.split(t).length - 1, 8);
    }
    results.push({ note, score });
  }
  results.sort((a, b) => b.score - a.score || collator.compare(a.note.title, b.note.title));
  const pattern = new RegExp(terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'gi');
  const mark = (s) => {
    let out = '';
    let last = 0;
    for (const m of s.matchAll(pattern)) {
      out += escapeHtml(s.slice(last, m.index)) + `<mark>${escapeHtml(m[0])}</mark>`;
      last = m.index + m[0].length;
    }
    return out + escapeHtml(s.slice(last));
  };
  return results.slice(0, limit).map(({ note }) => {
    const at = terms.map((t) => note.text.toLowerCase().indexOf(t)).filter((i) => i >= 0).sort((a, b) => a - b)[0];
    let snippet = note.summary;
    if (at !== undefined) {
      const start = Math.max(0, note.text.lastIndexOf(' ', Math.max(0, at - 50)) + 1);
      snippet = (start > 0 ? '…' : '') + clip(note.text.slice(start), 150);
    }
    return { url: note.url, title: mark(note.title), folder: note.folder, snippet: mark(snippet) };
  });
}
