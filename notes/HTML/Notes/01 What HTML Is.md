---
summary: What HTML is, how it works with CSS and JavaScript, and the three words you will use in every chapter after this one, tag, element and attribute.
---

# What HTML Is

Every web page you have opened, whether a search engine, a news article or a shop, starts life as a plain text file written in HTML. This chapter explains what that file contains, and introduces the three words you will use in every chapter that follows: **tag**, **element** and **attribute**.

## HTML in one sentence

HTML stands for **HyperText Markup Language**. It is the language used to describe the *structure* of a web page: what content is there, and what kind of content each piece is.

Each word in the name tells you something:

- **HyperText** is text that links to other text. Links are what turn separate pages into a web.
- **Markup** means labels you place around content to say what it is: this is a heading, this is a paragraph, this is an image.
- **Language** means a fixed set of those labels, with rules every browser understands.

> [!NOTE]
> HTML does not calculate anything or make decisions, so it is not a programming language. It *describes*. That makes it the easiest place to start, and the foundation everything else is built on.

## Three layers of a web page

A finished web page is usually made from three languages working together. Each has one job.

<figure class="diagram">
<div class="dg-grid cols-3">
<div class="dg-card is-accent"><span class="dg-card-title">HTML <span class="dg-card-role">structure</span></span><p>What is on the page: headings, paragraphs, lists, links, images and forms.</p><pre><span class="tok-punct">&lt;</span><span class="tok-tag">h1</span><span class="tok-punct">&gt;</span>Hello<span class="tok-punct">&lt;/</span><span class="tok-tag">h1</span><span class="tok-punct">&gt;</span></pre></div>
<div class="dg-card"><span class="dg-card-title">CSS <span class="dg-card-role">presentation</span></span><p>How it looks: colour, type, spacing and layout.</p><pre>h1 { color: navy; }</pre></div>
<div class="dg-card"><span class="dg-card-title">JavaScript <span class="dg-card-role">behaviour</span></span><p>What it does: reacts to clicks, checks forms and updates content.</p><pre>button.onclick = …</pre></div>
</div>
<figcaption>Three layers, one page. This notebook covers the first.</figcaption>
</figure>

A handy way to remember the split: HTML gives a page its **nouns** (heading, paragraph, image, form), CSS gives it **adjectives** (navy, large, centred), and JavaScript gives it **verbs** (open, hide, check, send).

> [!TIP] For a creative web developer
> Design and interaction sit on top of structure. A page with clean, meaningful HTML is easier to style beautifully and easier to bring to life.

## Tags

> [!DEFINITION] Tag
> A tag is a piece of markup written inside angle brackets, `<` and `>`.

Most tags come in pairs:

- An **opening tag** marks where something starts: `<p>`
- A **closing tag** marks where it ends. It has the same name with a forward slash in front: `</p>`

```html
<p>Hello World</p>
```

Read it aloud as: *a paragraph starts here, "Hello World", the paragraph ends here.*

## Elements

> [!DEFINITION] Element
> An element is the complete unit: the opening tag, the content inside it, and the closing tag.

<figure class="diagram">
<div class="scroll">
<svg viewBox="0 0 600 232" role="img" aria-label="The element p class intro Hello World, labelled: the opening tag contains an attribute with a name, class, and a value, intro. Hello World is the content. Slash p is the closing tag. Together they form one element.">
<text x="231" y="40" text-anchor="middle" class="dg-label dg-strong">Attribute</text>
<path class="dg-line" d="M231 46v6M161 64v-5a4 4 0 0 1 4-4h132a4 4 0 0 1 4 4v5"/>
<text x="186.6" y="84" text-anchor="middle" class="dg-small">name</text>
<text x="263.4" y="84" text-anchor="middle" class="dg-small">value</text>
<text x="127.2" y="118" class="dg-mono" style="font-size:18px" textLength="345.6" lengthAdjust="spacing"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">p</tspan> <tspan class="dg-attr">class</tspan><tspan class="dg-punct">=</tspan><tspan class="dg-value">"intro"</tspan><tspan class="dg-punct">&gt;</tspan>Hello World<tspan class="dg-punct">&lt;/</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;</tspan></text>
<path class="dg-line" d="M128 132v5a4 4 0 0 0 4 4h172a4 4 0 0 0 4-4v-5M218 141v6"/>
<path class="dg-line" d="M313 132v5a4 4 0 0 0 4 4h106a4 4 0 0 0 4-4v-5M370 141v6"/>
<path class="dg-line" d="M432 132v5a4 4 0 0 0 4 4h31a4 4 0 0 0 4-4v-5M451.5 141v6"/>
<text x="218" y="166" text-anchor="middle" class="dg-label">Opening tag</text>
<text x="370" y="166" text-anchor="middle" class="dg-label">Content</text>
<text x="451.5" y="166" text-anchor="middle" class="dg-label">Closing tag</text>
<path class="dg-accent-line" d="M128 182v6a4 4 0 0 0 4 4h335a4 4 0 0 0 4-4v-6M300 192v8"/>
<text x="300" y="222" text-anchor="middle" class="dg-text"><tspan class="dg-accent dg-strong">One element</tspan>: opening tag, content and closing tag together</text>
</svg>
</div>
<figcaption>The anatomy of an element. Everything between the first &lt; and the last &gt; belongs to it.</figcaption>
</figure>

People often say "tag" when they mean "element", and in conversation that is fine. The precise difference is still worth knowing:

| You see | It is called | Example |
|---|---|---|
| Markup inside angle brackets | a tag | `<p>` or `</p>` |
| Opening tag, content and closing tag | an element | `<p>Hello World</p>` |
| Extra information inside the opening tag | an attribute | `class="intro"` |

### Void elements

Some elements never hold content, so there is nothing to close. These are **void elements**, and they are written as a single tag.

```html
<br>                <!-- a line break -->
<hr>                <!-- a thematic break between sections -->
<img src="images/mountains.svg" alt="Mountains at sunrise">
<input type="text">
```

These four are the void elements used in this course. You will meet each one properly in a later chapter.

> [!NOTE]
> You may see void elements written with a slash at the end, like `<br />`. That style comes from XHTML, an older and stricter cousin of HTML. Both forms work in HTML; this notebook uses the shorter one.

## Attributes

> [!DEFINITION] Attribute
> An attribute gives an element extra information. It is written inside the opening tag as a `name="value"` pair.

```html
<a href="https://www.google.com" target="_blank">Open Google</a>
```

This one link carries two attributes:

- `href` says **where** the link goes.
- `target` says **how** it opens. The value `_blank` asks for a new tab.

These are the attributes you will use in this course:

| Attribute | Used on | What it does |
|---|---|---|
| `lang` | `<html>` | Declares the main language of the page |
| `href` | `<a>` | The destination of a link |
| `target` | `<a>` | Where the linked page opens |
| `src` | `<img>` | Where the image file is |
| `alt` | `<img>` | A text description of the image |
| `type` | `<input>` | Which kind of form control to show |
| `id` | any element | A unique name for one element |
| `class` | any element | A reusable group name |

### Rules worth keeping

1. **Attributes go in the opening tag**, never in the closing one.
2. **Put values in quotes.** Double quotes are the convention: `class="intro"`. A value that contains a space breaks without them.
3. **Separate attributes with a space.** Their order does not matter; `href` first or `target` first gives the same result.
4. **Every attribute has its own job.** `href`, `src`, `id` and `class` all look like `name="value"`, but they are not interchangeable.

Some attributes are **boolean**: simply being present switches something on, so they need no value. You will use `checked` this way in the forms chapter.

```html
<input type="checkbox" checked>
```

## Nesting: boxes inside boxes

Elements can contain other elements. When they do, the inner element must close **before** the outer one. Picture boxes: one box can sit inside another, but two boxes cannot half overlap.

<figure class="diagram">
<div class="scroll">
<svg viewBox="0 0 600 214" role="img" aria-label="Left: correctly nested, a b box sits fully inside a p box, written p b Hello slash b slash p. Right: overlapping, the b box sticks out of the p box, written p b Hello slash p slash b, which is wrong.">
<text x="40" y="22" class="dg-label dg-strong dg-good">Nested</text>
<rect class="dg-box" x="40" y="38" width="236" height="128" rx="16"/>
<text x="58" y="64" class="dg-mono" style="font-size:13px"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;</tspan></text>
<rect class="dg-box-accent" x="58" y="78" width="200" height="70" rx="11"/>
<text x="74" y="102" class="dg-mono" style="font-size:13px"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">b</tspan><tspan class="dg-punct">&gt;</tspan></text>
<text x="74" y="132" class="dg-serif">Hello</text>
<text x="158" y="200" text-anchor="middle" class="dg-mono" style="font-size:14px"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;&lt;</tspan><tspan class="dg-tag">b</tspan><tspan class="dg-punct">&gt;</tspan>Hello<tspan class="dg-punct">&lt;/</tspan><tspan class="dg-tag">b</tspan><tspan class="dg-punct">&gt;&lt;/</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;</tspan></text>
<text x="324" y="22" class="dg-label dg-strong dg-bad">Overlapping</text>
<rect class="dg-box" x="324" y="38" width="176" height="112" rx="16"/>
<text x="342" y="64" class="dg-mono" style="font-size:13px"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;</tspan></text>
<rect class="dg-box-bad" x="398" y="80" width="164" height="86" rx="11"/>
<text x="414" y="104" class="dg-mono" style="font-size:13px"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">b</tspan><tspan class="dg-punct">&gt;</tspan></text>
<text x="414" y="134" class="dg-serif">Hello</text>
<text x="443" y="200" text-anchor="middle" class="dg-mono" style="font-size:14px"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;&lt;</tspan><tspan class="dg-tag">b</tspan><tspan class="dg-punct">&gt;</tspan>Hello<tspan class="dg-punct">&lt;/</tspan><tspan class="dg-tag">p</tspan><tspan class="dg-punct">&gt;&lt;/</tspan><tspan class="dg-tag">b</tspan><tspan class="dg-punct">&gt;</tspan></text>
</svg>
</div>
<figcaption>Close the inner element first. The box that opened last closes first.</figcaption>
</figure>

The element on the outside is the **parent**; the one inside it is the **child**. This family vocabulary comes back in Chapter 2, when the browser turns your page into a tree.

> [!TIP]
> Indent each child one level deeper than its parent. The browser does not care, but you will: indentation makes the structure visible at a glance.

## How the browser reads your file

A few behaviours surprise almost every beginner:

- **Spaces and line breaks collapse.** Ten spaces, or a new line, in your text become a single space on the page. To force a new line inside text you use `<br>`, covered in Chapter 3.
- **Tag names are not case-sensitive.** `<P>` works like `<p>`, but lowercase is the universal convention.
- **Browsers forgive mistakes.** A missing closing tag usually still shows *something*, which hides bugs. Write it correctly rather than relying on the browser to guess.

Try it. The code below is full of extra spaces and a line break, yet the result is one tidy line:

```html preview
<p>This     text     has     lots     of
spaces    and a line break,     but the browser
shows    it    as    one    tidy    line.</p>
```

### Comments

A comment is a note to yourself or a teammate. The browser ignores it completely.

```html
<!-- This is a comment. It never appears on the page. -->
<p>This paragraph does.</p>
```

## Recap and practice

> [!SUMMARY] Chapter 1 in short
> - HTML describes the **structure** of a page. CSS styles it; JavaScript makes it interactive.
> - A **tag** is markup in angle brackets. An **element** is opening tag, content and closing tag together.
> - **Void elements** such as `<br>`, `<hr>`, `<img>` and `<input>` have no closing tag.
> - **Attributes** add information inside the opening tag, written as `name="value"`.
> - Elements **nest** like boxes, and the inner one always closes first.

> [!QUESTION]- What is the difference between a tag and an element?
> A tag is the markup in angle brackets, such as `<p>` or `</p>`. An element is the whole unit: opening tag, content and closing tag, as in `<p>Hello</p>`.

> [!QUESTION]- Why does `<img>` have no closing tag?
> It is a void element. It never wraps any content, so there is nothing to close.

> [!QUESTION]- Where do attributes go, and how are they written?
> Inside the opening tag, as `name="value"` pairs separated by spaces.

> [!QUESTION]- What is wrong with `<p><b>Hello</p></b>`?
> The elements overlap. `<b>` opened inside `<p>`, so it has to close first: `<p><b>Hello</b></p>`.
