---
summary: Headings, paragraphs, bold and italic (and their meaningful partners), superscript and subscript, line breaks and thematic breaks. The everyday elements for written content.
---

# Working with Text

Most of what people read on the web is text, and HTML has a small set of elements for shaping it. This chapter covers the ones you will reach for every day: headings, paragraphs, bold and italic, raised and lowered text, line breaks and section breaks.

## Headings: h1 to h6

HTML has six levels of heading, from `<h1>`, the most important, down to `<h6>`, the least.

```html preview
<h1>Apple</h1>
<h2>Apple</h2>
<h3>Apple</h3>
<h4>Apple</h4>
<h5>Apple</h5>
<h6>Apple</h6>
```

Browsers draw higher levels larger by default, but **size is not the point**. Headings describe the *hierarchy* of your content, the way a book's contents page shows parts, chapters and sections.

<figure class="diagram">
<div class="dg-outline">
<div class="dg-outline-row" style="--lvl:0"><span class="dg-chip">h1</span><span class="dg-outline-text is-1">Learning HTML</span></div>
<div class="dg-outline-row" style="--lvl:1"><span class="dg-chip">h2</span><span class="dg-outline-text is-2">Text elements</span></div>
<div class="dg-outline-row" style="--lvl:2"><span class="dg-chip">h3</span><span class="dg-outline-text is-3">Headings</span></div>
<div class="dg-outline-row" style="--lvl:2"><span class="dg-chip">h3</span><span class="dg-outline-text is-3">Paragraphs</span></div>
<div class="dg-outline-row" style="--lvl:1"><span class="dg-chip">h2</span><span class="dg-outline-text is-2">Lists</span></div>
<div class="dg-outline-row" style="--lvl:2"><span class="dg-chip">h3</span><span class="dg-outline-text is-3">Ordered lists</span></div>
<div class="dg-outline-row" style="--lvl:2"><span class="dg-chip">h3</span><span class="dg-outline-text is-3">Unordered lists</span></div>
</div>
<figcaption>Headings outline a page. Each level sits inside the level above it.</figcaption>
</figure>

| Element | Role |
|---|---|
| `<h1>` | The main title of the page. Usually used once. |
| `<h2>` | A major section. |
| `<h3>` to `<h6>` | Sections inside sections, each one level deeper. |

### Using headings well

- **Use one `<h1>`** for the page's main title.
- **Don't skip levels.** After an `<h2>`, the next level down is `<h3>`, not `<h5>`.
- **Don't pick a heading for its size.** If you only want large or bold text, that is a job for CSS.

> [!NOTE]
> CSS can make an `<h2>` and an `<h4>` look identical, but their levels still matter. Screen reader users jump between headings to scan a page, and search engines read headings to understand what a page is about.

## Paragraphs: p

The `<p>` element marks a paragraph of text.

```html preview
<h1>Learning HTML</h1>
<p>HTML gives a webpage its structure.</p>
<p>CSS can style that structure.</p>
```

Browsers show each paragraph as its own block, with space above and below.

> [!WARNING]
> Use `<p>` for paragraphs, not for spacing. Empty paragraphs like `<p></p>` used to push content down are a common beginner habit. Spacing is a job for CSS.

## Bold and italic

HTML has two pairs of elements here. One element in each pair is about **appearance**, the other about **meaning**.

### `<b>` and `<strong>`

```html
<p>I am <b>learning</b> HTML.</p>
```

`<b>` draws attention to words without saying they are more important: keywords in a summary, or product names in a review. It is shown in bold.

`<strong>` says the words are genuinely **important, serious or urgent**. It is also shown in bold, but the importance is part of the HTML itself.

```html
<p><strong>Warning:</strong> the oven is still hot.</p>
```

### `<i>` and `<em>`

```html
<p><i>Creative Web Development</i> is exciting.</p>
```

`<i>` marks text in an **alternate voice or mood**: a technical term, a phrase from another language, a thought, the name of a ship. It is shown in italics.

`<em>` adds **stress emphasis**, the kind that changes the meaning of a sentence when you say it aloud:

```html
<p>I <em>never</em> said she took the book.</p>
<p>I never said <em>she</em> took the book.</p>
```

The first denies saying it at all. The second suggests someone else took it. Same words, different meaning.

| Element | Looks | Means |
|---|---|---|
| `<b>` | bold | Look at this, without extra importance |
| `<strong>` | bold | This is important |
| `<i>` | italic | Different voice: a term, a foreign phrase, a thought |
| `<em>` | italic | Stress this word; it changes the meaning |

```html preview
<p>Remember to bring your <b>notebook</b> and <b>pen</b>.</p>
<p><strong>Exams start on Monday.</strong></p>
<p>The word <i>déjà vu</i> comes from French.</p>
<p>You <em>must</em> revise this chapter.</p>
```

> [!TIP]
> Ask yourself one question: *would the meaning change if this were read aloud without the styling?* If yes, use `<strong>` or `<em>`. If it is only visual, use `<b>` or `<i>`.

## Superscript and subscript

`<sup>` raises text above the normal line of type, called the **baseline**. `<sub>` lowers it below.

::: tiles Up and down
- **2<sup>3</sup>** `<sup>` raises text above the baseline
- **H<sub>2</sub>O** `<sub>` lowers text below it
:::

Superscript is used for exponents, ordinal endings and footnote markers. Subscript is used in chemical formulas and some mathematical notation.

```html preview
<p>2<sup>3</sup> = 8</p>
<p>The area of a square is x<sup>2</sup>.</p>
<p>She finished 1<sup>st</sup> in the race.</p>
<p>Water is H<sub>2</sub>O and carbon dioxide is CO<sub>2</sub>.</p>
```

> [!REMEMBER]
> **sup** goes **up**. **sub** goes **down**, like a submarine.

## Line breaks: br

Chapter 1 showed that the browser collapses line breaks in your text into spaces. When a line break is genuinely part of the content, as in an address or a poem, use the void element `<br>`.

```html preview
<p>
  Notebook Studio<br>
  12 Park Street<br>
  Kolkata 700016
</p>
```

> [!WARNING]
> Don't stack `<br>` tags to create gaps, as in `<br><br><br>`. Separate paragraphs belong in separate `<p>` elements, and spacing belongs in CSS.

## Thematic breaks: hr

`<hr>` marks a **change of topic** between sections, like the small gap or row of asterisks between scenes in a novel. Browsers draw it as a horizontal line by default.

```html preview
<p>HTML structures content.</p>
<hr>
<p>CSS styles content.</p>
```

> [!NOTE]
> The line is only the default *appearance*. What `<hr>` *means* is a shift in subject. If you only want a decorative line, CSS is the better tool.

## Recap and practice

> [!SUMMARY] Chapter 3 in short
> - `<h1>` to `<h6>` create a **hierarchy** of headings. Choose them by level, not by size.
> - `<p>` marks a paragraph.
> - `<b>` and `<i>` change appearance; `<strong>` and `<em>` add importance and emphasis.
> - `<sup>` raises text above the baseline; `<sub>` lowers it.
> - `<br>` breaks a line inside text. `<hr>` marks a change of topic.

| Element | In a word |
|---|---|
| `<h1>`–`<h6>` | headings |
| `<p>` | paragraph |
| `<b>` / `<strong>` | bold look / importance |
| `<i>` / `<em>` | italic look / emphasis |
| `<sup>` / `<sub>` | above / below the baseline |
| `<br>` | line break |
| `<hr>` | thematic break |

> [!QUESTION]- Why shouldn't you choose a heading level for its size?
> Heading levels describe the structure of the content. Screen readers and search engines rely on that structure, and the size can always be changed with CSS.

> [!QUESTION]- When would you use `<strong>` instead of `<b>`?
> When the words are genuinely important, serious or urgent, such as a warning. `<b>` only draws attention visually.

> [!QUESTION]- How would you write the chemical formula for carbon dioxide?
> `CO<sub>2</sub>`

> [!QUESTION]- What is the difference between `<br>` and `<hr>`?
> `<br>` breaks a line *within* text, for example in an address. `<hr>` separates *sections* when the topic changes.
