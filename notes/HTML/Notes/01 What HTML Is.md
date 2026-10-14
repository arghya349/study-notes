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

::: tiles Three layers, one page
- **HTML** structure: what is on the page, like headings, paragraphs, images and forms
- **CSS** presentation: how it looks, like colour, type, spacing and layout
- **JavaScript** behaviour: what it does, like reacting to clicks and checking forms
:::

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

```html
<p class="intro">Hello World</p>
```

::: anatomy Anatomy of an element
- `<p class="intro">` **Opening tag.** Starts the element, and can carry attributes.
- `class="intro"` **An attribute**: a name, `class`, and a value, `"intro"`.
- `Hello World` **The content**, the part people actually see.
- `</p>` **Closing tag.** The same name with a `/` in front.
:::

Everything from the first `<` to the last `>` is **one element**.

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

::: pair
- **Nested: correct**
  ```html
  <p><b>Hello</b></p>
  ```
  `<b>` opens inside `<p>` and closes inside it too.
- **Overlapping: incorrect**
  ```html
  <p><b>Hello</p></b>
  ```
  `<b>` is still open when `<p>` closes, so the two boxes cross.
:::

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
