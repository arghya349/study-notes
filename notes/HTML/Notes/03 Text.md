---
summary: Headings, paragraphs, bold and italic (and what they mean), raised and lowered text, line breaks and topic breaks. Your everyday toolkit for words.
---

# Working with Text

Most of the web is words. HTML gives you a small, friendly toolkit for shaping them: headings to organise, paragraphs to hold your writing, a way to stress what matters, and a few neat tricks for raised, lowered and broken lines.

<figure class="sketch">
<svg viewBox="0 0 400 240" aria-hidden="true">
<g class="washes">
<path class="w-paper" d="M110 16h176v210H110z"/>
<path class="w-blue" d="M128 36h120v12H128z"/>
<path class="w-sky" d="M128 66h86v9h-86zM128 158h70v9h-70z"/>
<path class="w-orange" d="M262 222l70-84 9 7-70 84z"/>
</g>
<g class="ink">
<rect x="110" y="16" width="176" height="210" rx="10"/>
<rect class="thin" x="128" y="36" width="120" height="12" rx="6"/>
<rect class="thin" x="128" y="66" width="86" height="9" rx="4.5"/>
<path class="thin" d="M128 94h140M128 108h128M128 122h140M128 136h96"/>
<rect class="thin" x="128" y="158" width="70" height="9" rx="4.5"/>
<path class="thin" d="M128 186h140M128 200h110"/>
<path d="M262 222l70-84 9 7-70 84z"/>
<path d="M262 222l-3 10 9-5"/>
</g>
<text class="t-hand" x="98" y="47" text-anchor="end" style="font-size:18px">h1</text>
<text class="t-hand" x="98" y="76" text-anchor="end" style="font-size:18px">h2</text>
<text class="t-hand" x="98" y="120" text-anchor="end" style="font-size:18px">p</text>
</svg>
<figcaption>A page of text is a little outline: big headings, smaller ones, and paragraphs underneath.</figcaption>
</figure>

::: tiles By the end of this chapter you can
- **Organise** a page with headings
- **Write** paragraphs the right way
- **Choose** between looking bold and being important
- **Shape** lines with sup, sub, br and hr
:::

## Headings: h1 to h6

HTML has six heading levels, from `<h1>`, the most important, down to `<h6>`, the least.

```html preview
<h1>Apple</h1>
<h2>Apple</h2>
<h3>Apple</h3>
<h4>Apple</h4>
<h5>Apple</h5>
<h6>Apple</h6>
```

The browser makes higher levels bigger, but **size isn't the point**. Headings are an outline of your page, like the contents page of a book:

<figure class="diagram">
<div class="dg-outline">
<div class="dg-outline-row" style="--lvl:0"><span class="dg-chip">h1</span><span class="dg-outline-text is-1">Learning HTML</span></div>
<div class="dg-outline-row" style="--lvl:1"><span class="dg-chip">h2</span><span class="dg-outline-text is-2">Text elements</span></div>
<div class="dg-outline-row" style="--lvl:2"><span class="dg-chip">h3</span><span class="dg-outline-text is-3">Headings</span></div>
<div class="dg-outline-row" style="--lvl:2"><span class="dg-chip">h3</span><span class="dg-outline-text is-3">Paragraphs</span></div>
<div class="dg-outline-row" style="--lvl:1"><span class="dg-chip">h2</span><span class="dg-outline-text is-2">Lists</span></div>
<div class="dg-outline-row" style="--lvl:2"><span class="dg-chip">h3</span><span class="dg-outline-text is-3">Ordered lists</span></div>
</div>
<figcaption>Each level sits inside the level above it.</figcaption>
</figure>

Three simple rules:

::: tiles
- **One h1** the main title of the page, used once
- **No skipping** after an `<h2>` comes `<h3>`, not `<h5>`
- **Not for size** if you just want big text, that's a job for CSS
:::

> [!NOTE] Why the level matters
> Screen reader users jump from heading to heading to scan a page, and search engines read headings to understand it. CSS can change the look; the level carries the meaning.

## Paragraphs: p

`<p>` holds a paragraph. Each one gets its own block, with space above and below.

```html preview
<h1>Learning HTML</h1>
<p>HTML gives a webpage its structure.</p>
<p>CSS can style that structure.</p>
```

> [!WARNING]
> Use `<p>` for paragraphs, not for spacing. Empty paragraphs pushed in to make gaps are a common beginner habit; spacing is a job for CSS.

## Looking bold versus being important

HTML has two pairs here. In each pair, one element is about **how it looks**, the other about **what it means**.

::: tiles
- `<b>` **look at this**, without extra importance
- `<strong>` **this matters**: important, serious or urgent
- `<i>` **a different voice**: a term, a foreign phrase, a thought
- `<em>` **stress this word**, the way you would out loud
:::

Emphasis can completely change a sentence. Read these two out loud:

::: pair
- **"I *never* said she took the book."**

  I didn't say it at all.
- **"I never said *she* took the book."**

  Someone else took it.
:::

That's what `<em>` captures: `<p>I <em>never</em> said she took the book.</p>`. Here are all four side by side:

```html preview
<p>Remember to bring your <b>notebook</b> and <b>pen</b>.</p>
<p><strong>Exams start on Monday.</strong></p>
<p>The phrase <i>déjà vu</i> comes from French.</p>
<p>You <em>must</em> revise this chapter.</p>
```

> [!TIP] One question decides it
> Would the meaning change if someone read it aloud without the styling? Then use `<strong>` or `<em>`. If it's only for looks, use `<b>` or `<i>`.

> [!PREDICT]- A sign says "Do not touch the wire." Which element fits "Do not touch"?
> `<strong>`. It's a genuine warning, so the importance is part of the meaning, not just the look.

## Up and down: sup and sub

`<sup>` raises text above the normal line of type, called the **baseline**. `<sub>` lowers it below.

::: tiles
- **2<sup>3</sup>** `<sup>` for powers, 1<sup>st</sup>, footnotes
- **H<sub>2</sub>O** `<sub>` for chemical formulas
:::

```html preview
<p>2<sup>3</sup> = 8</p>
<p>The area of a square is x<sup>2</sup>.</p>
<p>She finished 1<sup>st</sup> in the race.</p>
<p>Water is H<sub>2</sub>O and carbon dioxide is CO<sub>2</sub>.</p>
```

> [!REMEMBER]
> **sup** goes **up**. **sub** goes **down**, like a submarine.

## A new line inside text: br

Remember from Chapter 1: the browser turns your line breaks into spaces. When a break is part of the content itself, like the lines of an address, use `<br>`:

```html preview
<p>
  Notebook Studio<br>
  12 Park Street<br>
  Kolkata 700016
</p>
```

> [!WARNING]
> Don't stack `<br><br><br>` to make gaps. Separate paragraphs belong in separate `<p>` elements, and spacing belongs in CSS.

## A change of topic: hr

`<hr>` marks a **shift in subject**, like the row of stars between scenes in a novel. Browsers draw it as a line.

```html preview
<p>HTML structures content.</p>
<hr>
<p>CSS styles content.</p>
```

> [!NOTE]
> The line is only how it *looks*. What `<hr>` *means* is "new topic". For a purely decorative line, CSS is the better tool.

## Recap

::: tiles Your text toolkit
- `h1–h6` headings, by level
- `p` a paragraph
- `b` `strong` bold look, real importance
- `i` `em` italic look, real stress
- `sup` `sub` above and below the line
- `br` `hr` new line, new topic
:::

::: idea Chapter 3 in one breath
Choose text elements for what they mean, not how they look. Headings outline, paragraphs hold, strong and em carry weight, and CSS handles the looks.
:::

> [!PREDICT]- Why not pick `<h4>` just because it's a nice size?
> Because levels describe the structure of the page, which screen readers and search engines rely on. The size can always change with CSS.

> [!PREDICT]- How do you write carbon dioxide, CO₂?
> `CO<sub>2</sub>`

> [!PREDICT]- What's the difference between `<br>` and `<hr>`?
> `<br>` breaks a line *inside* text, like in an address. `<hr>` separates *topics* between sections.
