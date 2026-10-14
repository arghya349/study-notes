---
summary: The div container for grouping content, id for naming one element, class for labelling many, and the meaningful containers that often replace a div.
---

# Grouping and Identifiers

Once a page has content, you need ways to **group** pieces together and to **point at** particular ones. That is what `div`, `id` and `class` are for. On their own they barely change how a page looks. Their job is to prepare the page for CSS and JavaScript, which you will meet next.

## div: a generic container

`<div>` (short for *division*) is a container with no meaning of its own. It groups content when no more specific element fits.

```html preview
<div>
  <h2>About Me</h2>
  <p>I am learning front-end development.</p>
</div>
```

<figure class="diagram">
<div class="scroll">
<svg viewBox="0 0 600 196" role="img" aria-label="A page containing a dashed div box. Inside the div are a heading, About Me, and a paragraph. The div draws nothing itself; it groups the heading and paragraph into one unit.">
<rect class="dg-box" x="20" y="12" width="560" height="172" rx="16"/>
<text x="36" y="36" class="dg-small">page</text>
<rect class="dg-box-accent dg-dash" x="56" y="48" width="300" height="116" rx="12"/>
<text x="72" y="72" class="dg-mono dg-tag" style="font-size:12px">div</text>
<text x="72" y="104" class="dg-serif" style="font-weight:600">About Me</text>
<rect class="dg-well" x="72" y="120" width="250" height="9" rx="4.5"/>
<rect class="dg-well" x="72" y="138" width="180" height="9" rx="4.5"/>
<text x="384" y="88" class="dg-label">The div draws nothing itself.</text>
<text x="384" y="108" class="dg-label">It wraps the heading and the</text>
<text x="384" y="128" class="dg-label">paragraph into one unit that</text>
<text x="384" y="148" class="dg-label">CSS and JavaScript can target.</text>
</svg>
</div>
<figcaption>A div is an invisible box. What makes it useful is what you put inside, and what you later do with it.</figcaption>
</figure>

What a div does and doesn't do:

- It **groups** related content so it can be styled, moved or shown and hidden together.
- It is a **block**: it starts on a new line and stretches across the available width.
- Apart from that it adds **no visual style** and **no meaning**. A screen reader gives it no special announcement.

> [!NOTE]
> This chapter's lecture roadmap listed `div` alongside `id` and `class`, but the original notes explained only the last two. The section above fills that gap, so the roadmap and the notes now match.

## id: a unique name

The `id` attribute gives one element a **unique** identifier.

```html
<p id="apple">Hello</p>
```

### Rules for ids

- **Unique.** The same id value must not appear twice on one page.
- **No spaces.** Use hyphens to join words: `id="contact-form"`.
- **Case-sensitive.** `id="Apple"` and `id="apple"` are different.
- **Meaningful.** `id="newsletter-email"` tells you far more than `id="box2"`.

<figure class="diagram">
<div class="dg-grid cols-2">
<div class="dg-card is-wrong"><span class="dg-verdict">Incorrect: a repeated id</span><pre>&lt;p <span class="dg-hl">id="apple"</span>&gt;First paragraph&lt;/p&gt;
&lt;p <span class="dg-hl">id="apple"</span>&gt;Second paragraph&lt;/p&gt;</pre></div>
<div class="dg-card is-right"><span class="dg-verdict">Correct: different ids</span><pre>&lt;p id="apple"&gt;First paragraph&lt;/p&gt;
&lt;p id="mango"&gt;Second paragraph&lt;/p&gt;</pre></div>
</div>
<figcaption>An id is like a roll number. Two students can't share one.</figcaption>
</figure>

An id is useful whenever **one specific element** needs to be found. You have already met one use, and will meet the rest soon:

| Who uses the id | How | Where |
|---|---|---|
| A label | `<label for="apple">` points at the input with `id="apple"` | Chapter 6 |
| A link | `<a href="#apple">` jumps to the element with `id="apple"` | Chapter 5 |
| CSS | `#apple { … }` styles that one element | Coming next |
| JavaScript | `document.getElementById('apple')` finds it | Later |

## class: a reusable group name

The `class` attribute puts elements into a named **group**. Unlike an id, the same class can be used on as many elements as you like.

```html preview
<p class="fruit">Apple</p>
<p class="fruit">Mango</p>
<p class="fruit">Banana</p>
<p class="fruit">Orange</p>
```

All four paragraphs share the class `fruit`. Nothing changes on screen yet, but a single CSS rule can now style all four at once. Here is a glimpse of what that will look like:

```html preview
<style>
  .fruit { color: #2b4a72; font-weight: 600; }
</style>
<p class="fruit">Apple</p>
<p class="fruit">Mango</p>
<p>Bread</p>
<p class="fruit">Banana</p>
```

Two more things classes can do:

- **One element can have several classes**, separated by spaces: `class="fruit sweet"`. It then belongs to both groups.
- **An element can have an id and classes together**: `<p id="apple" class="fruit sweet">`.

## id versus class

<figure class="diagram">
<div class="scroll">
<svg viewBox="0 0 620 206" role="img" aria-label="Left: four paragraphs, only one of which has id equals apple, so the id points at exactly one element. Right: four paragraphs that all have class equals fruit, so the class gathers all of them.">
<text x="20" y="22" class="dg-label dg-strong">id: one of a kind</text>
<rect class="dg-box" x="20" y="38" width="272" height="32" rx="9"/>
<rect class="dg-box-accent" x="20" y="78" width="272" height="32" rx="9"/>
<rect class="dg-box" x="20" y="118" width="272" height="32" rx="9"/>
<rect class="dg-box" x="20" y="158" width="272" height="32" rx="9"/>
<text x="36" y="59" class="dg-mono" style="font-size:12.5px"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;</tspan>Mango<tspan class="dg-punct">&lt;/</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;</tspan></text>
<text x="36" y="99" class="dg-mono" style="font-size:12.5px"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">p</tspan> <tspan class="dg-attr">id</tspan><tspan class="dg-punct">=</tspan><tspan class="dg-value">"apple"</tspan><tspan class="dg-punct">&gt;</tspan>Apple<tspan class="dg-punct">&lt;/</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;</tspan></text>
<text x="36" y="139" class="dg-mono" style="font-size:12.5px"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;</tspan>Banana<tspan class="dg-punct">&lt;/</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;</tspan></text>
<text x="36" y="179" class="dg-mono" style="font-size:12.5px"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;</tspan>Orange<tspan class="dg-punct">&lt;/</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;</tspan></text>
<text x="330" y="22" class="dg-label dg-strong">class: shared by many</text>
<rect class="dg-box-hl" x="330" y="38" width="272" height="32" rx="9"/>
<rect class="dg-box-hl" x="330" y="78" width="272" height="32" rx="9"/>
<rect class="dg-box-hl" x="330" y="118" width="272" height="32" rx="9"/>
<rect class="dg-box-hl" x="330" y="158" width="272" height="32" rx="9"/>
<text x="346" y="59" class="dg-mono" style="font-size:12.5px"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">p</tspan> <tspan class="dg-attr">class</tspan><tspan class="dg-punct">=</tspan><tspan class="dg-value">"fruit"</tspan><tspan class="dg-punct">&gt;</tspan>Mango<tspan class="dg-punct">&lt;/</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;</tspan></text>
<text x="346" y="99" class="dg-mono" style="font-size:12.5px"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">p</tspan> <tspan class="dg-attr">class</tspan><tspan class="dg-punct">=</tspan><tspan class="dg-value">"fruit"</tspan><tspan class="dg-punct">&gt;</tspan>Apple<tspan class="dg-punct">&lt;/</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;</tspan></text>
<text x="346" y="139" class="dg-mono" style="font-size:12.5px"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">p</tspan> <tspan class="dg-attr">class</tspan><tspan class="dg-punct">=</tspan><tspan class="dg-value">"fruit"</tspan><tspan class="dg-punct">&gt;</tspan>Banana<tspan class="dg-punct">&lt;/</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;</tspan></text>
<text x="346" y="179" class="dg-mono" style="font-size:12.5px"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">p</tspan> <tspan class="dg-attr">class</tspan><tspan class="dg-punct">=</tspan><tspan class="dg-value">"fruit"</tspan><tspan class="dg-punct">&gt;</tspan>Orange<tspan class="dg-punct">&lt;/</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;</tspan></text>
</svg>
</div>
<figcaption>An id points at exactly one element. A class gathers any number of them.</figcaption>
</figure>

| `id` | `class` |
|---|---|
| A unique identifier for **one** element | A reusable label that **many** elements can share |
| Must not repeat on the page | Can be used as often as you like |
| One per element | An element can have several, separated by spaces |
| Used by a label's `for`, by `#` links, by CSS `#name` | Used by CSS `.name` to style a whole group |

> [!REMEMBER]
> An **id** is like your roll number: nobody else has it. A **class** is like your section or batch: many students share it, and you can belong to more than one.

> [!NOTE]
> Neither `id` nor `class` changes how an element looks by itself. They are names. CSS and JavaScript decide what happens to the elements those names point at.

## Beyond div: meaningful containers

A div says nothing about what it contains. HTML also has containers that **do** carry meaning, and they are often the better choice:

<figure class="diagram">
<div class="scroll">
<svg viewBox="0 0 600 296" role="img" aria-label="A page layout. A header across the top contains a nav. Below it, main holds a section and an article side by side. A footer runs across the bottom.">
<rect class="dg-box" x="40" y="10" width="520" height="276" rx="18"/>
<rect class="dg-box-accent" x="58" y="28" width="484" height="46" rx="11"/>
<text x="76" y="56" class="dg-mono dg-tag" style="font-size:13px">header</text>
<rect class="dg-box" x="372" y="38" width="154" height="26" rx="8"/>
<text x="449" y="56" text-anchor="middle" class="dg-mono dg-tag" style="font-size:12px">nav</text>
<rect class="dg-box" x="58" y="86" width="484" height="148" rx="11"/>
<text x="76" y="110" class="dg-mono dg-tag" style="font-size:13px">main</text>
<rect class="dg-box-hl" x="76" y="122" width="214" height="98" rx="9"/>
<text x="92" y="144" class="dg-mono dg-tag" style="font-size:12px">section</text>
<rect class="dg-well" x="92" y="160" width="170" height="8" rx="4"/>
<rect class="dg-well" x="92" y="176" width="140" height="8" rx="4"/>
<rect class="dg-well" x="92" y="192" width="156" height="8" rx="4"/>
<rect class="dg-box-hl" x="310" y="122" width="214" height="98" rx="9"/>
<text x="326" y="144" class="dg-mono dg-tag" style="font-size:12px">article</text>
<rect class="dg-well" x="326" y="160" width="170" height="8" rx="4"/>
<rect class="dg-well" x="326" y="176" width="150" height="8" rx="4"/>
<rect class="dg-well" x="326" y="192" width="120" height="8" rx="4"/>
<rect class="dg-box-accent" x="58" y="246" width="484" height="28" rx="9"/>
<text x="76" y="265" class="dg-mono dg-tag" style="font-size:13px">footer</text>
</svg>
</div>
<figcaption>A typical page skeleton built from meaningful containers instead of anonymous divs.</figcaption>
</figure>

| Element | Holds |
|---|---|
| `<header>` | The introduction to a page or section: a logo, a title, often the navigation |
| `<nav>` | The main navigation links |
| `<main>` | The main content of the page. Use it once |
| `<section>` | A themed group of content, usually with its own heading |
| `<article>` | A self-contained piece that would make sense on its own, like a blog post |
| `<footer>` | Closing information: contact details, copyright, related links |

```html preview
<header>
  <h1>My Learning Page</h1>
  <nav><a href="#">Home</a> · <a href="#">Notes</a></nav>
</header>
<main>
  <section>
    <h2>This week</h2>
    <p>Grouping content with div, id and class.</p>
  </section>
</main>
<footer>
  <p>Made while learning HTML.</p>
</footer>
```

They look just like divs in the browser, but browsers, screen readers and search engines understand them. Screen reader users can jump straight to `<main>` or `<nav>`, for example.

> [!TIP] A rule of thumb
> If one of the meaningful containers describes your content, use it. Reach for `<div>` when none of them fits, typically for grouping that exists only for layout or styling.

## Recap and practice

> [!SUMMARY] Chapter 7 in short
> - `<div>` is a generic block container with no meaning and no style of its own.
> - `id` names **one** element uniquely. Don't repeat it on a page.
> - `class` labels a **group**. Reuse it freely; one element can have several.
> - Neither changes appearance by itself. They give CSS and JavaScript something to aim at.
> - Prefer meaningful containers such as `<header>`, `<main>`, `<section>` and `<footer>` when they fit.

> [!QUESTION]- What is the difference between `id` and `class`?
> An id uniquely identifies one element and must not repeat on a page. A class is a reusable label that any number of elements can share.

> [!QUESTION]- What is a div, and why might you use one?
> A generic block container. You use it to group related content so it can be styled or handled together, when no more meaningful element fits.

> [!QUESTION]- How would you give one paragraph two classes, `fruit` and `sweet`?
> `<p class="fruit sweet">Mango</p>`, with the class names separated by a space.

> [!QUESTION]- Name three things that can use an element's id.
> A label's `for` attribute, a link such as `href="#apple"`, and CSS through `#apple`. JavaScript can find it too, with `getElementById`.
