# Notebook

A quiet, read-only place to read your study notes. Notes are Markdown files in `notes/`; folders on disk are folders in Notebook.

```bash
npm install
npm start          # http://localhost:4000
npm run phone      # also reachable from your iPhone on the same Wi-Fi
```

## Organising notes

- **Make a folder:** create a folder inside `notes/`, or run `npm run new -- "Biology"`.
- **Make a note:** add a `.md` file, or run `npm run new -- "Biology/01 Cells.md"`.
- **Order:** a number prefix (`01 Cells.md`) sets the order and makes the notes chapters. The number is hidden from titles.
- **Cover image:** put `cover.jpg` (or `.png`, `.webp`) in a folder. It becomes the skin of that glass folder and the title image of every note inside. A note can override it with `cover: other.jpg` (or `cover: none`) in its frontmatter.
- **Summary:** `summary:` in the frontmatter sets the line shown in folder lists.
- Folders and files starting with `_` or `.` are hidden. Folders holding only images stay hidden too.

Notebook re-reads the folder whenever you save, and open pages update on their own.

## Writing

Standard Markdown plus:

| Write | Get |
|---|---|
| `> [!NOTE]`, `[!TIP]`, `[!WARNING]`, `[!REMEMBER]`, `[!DEFINITION]`, `[!SUMMARY]`, `[!EXAMPLE]` | Callouts |
| `> [!QUESTION]- Question text` then `> answer` lines | A question with a hidden answer |
| ```` ```html preview ```` | Code with a live result window |
| `==text==` | Highlighter |
| `$x^2$`, `$$ … $$` | Maths |
| `[[Note title]]` | Link to another note |
| `[^1]` | Footnotes |

## Reading

- **Ask AI** on every folder, chapter and section opens ChatGPT, Gemini or Claude with a step-by-step tutoring prompt built from that part of your notes.
- **Full screen** (button or <kbd>F</kbd>). On iPhone, Safari can't make a page full screen, so the button hides all chrome instead; for a browser-free view use Share → Add to Home Screen.
- <kbd>⌘K</kbd> or <kbd>/</kbd> search, <kbd>⌘\</kbd> sidebar, <kbd>[</kbd> <kbd>]</kbd> previous and next chapter, **Aa** for text size, typeface and Paper/Night.

## Publishing

The site lives at https://proud-of-you-baby.vercel.app. The GitHub repo is connected to Vercel, so every push to `main` rebuilds and publishes it:

```bash
git add -A && git commit -m "Add notes" && git push
```
