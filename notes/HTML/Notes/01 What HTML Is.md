---
summary: Open the lid on a web page. What HTML is, how it works with CSS and JavaScript, and the three words this whole course is built on, tag, element and attribute.
---

# What HTML Is

Every page you've ever opened, a search engine, a news story, a shop, is a plain text file underneath. That file is written in HTML. Let's open the lid and look inside. By the end of this chapter you'll know the three words this whole course is built on: **tag**, **element** and **attribute**.

<figure class="doodle">
<svg viewBox="0 0 400 220" aria-hidden="true">
<rect x="70" y="24" width="260" height="172" rx="16"/>
<path d="M70 58h260"/>
<circle cx="92" cy="41" r="4"/><circle cx="108" cy="41" r="4"/><circle cx="124" cy="41" r="4"/>
<path d="M176 98l-34 29 34 29"/>
<path d="M212 90l-22 76"/>
<path d="M226 98l34 29-34 29"/>
<path class="soft" d="M150 178h100"/>
<path d="M356 50v12M350 56h12M40 150v10M35 155h10"/>
</svg>
<figcaption>Underneath every web page is a plain text file of labelled content.</figcaption>
</figure>

::: tiles By the end of this chapter you can
- **Explain** what HTML is, in one sentence
- **Separate** HTML, CSS and JavaScript
- **Name** the parts: tag, element, attribute
- **Nest** elements the right way
:::

## HTML in one sentence

HTML stands for **HyperText Markup Language**. It's how you tell the browser what each piece of your page *is*. Each word in the name is a small clue:

::: tiles
- **HyperText** text that links to other text, which is what turns pages into a web
- **Markup** labels you put around content to say what it is
- **Language** a fixed set of labels that every browser understands
:::

::: idea
HTML doesn't make a page pretty or clever. It says what things are: this is a heading, this is a paragraph, this is a picture.
:::

> [!NOTE]
> Because it describes rather than calculates, HTML isn't a programming language. That's exactly why it's the friendliest place to start.

## Three layers of every page

A finished web page is built from three languages, each with one job. Picture a house:

::: tiles Three layers, one page
- **HTML** structure: the walls and the rooms
- **CSS** presentation: the paint and the furniture
- **JavaScript** behaviour: the switches that make things happen
:::

This whole notebook is about the first layer. Everything else gets built on top of it.

> [!TIP] For a creative web developer
> Beautiful design and smooth interaction both stand on structure. Clean HTML is easier to style and easier to bring to life.

## Tags: labels in angle brackets

A **tag** is a label written inside `<` and `>`. Most tags come in pairs, one to start and one to finish:

::: anatomy
- `<p>` **Opening tag.** "A paragraph starts here."
- `</p>` **Closing tag.** The same name with a `/` in front: "the paragraph ends here."
:::

Put content between them and you have a paragraph:

```html preview
<p>Hello World</p>
```

## Elements: the whole package

Opening tag, content and closing tag together make an **element**. Here's one with every part labelled:

```html
<p class="intro">Hello World</p>
```

::: anatomy Anatomy of an element
- `<p class="intro">` **Opening tag.** Starts the element, and can carry extra information.
- `class="intro"` **An attribute**: a name, `class`, and a value, `"intro"`.
- `Hello World` **The content**, the part people actually see.
- `</p>` **Closing tag.** Ends the element.
:::

People often say "tag" when they mean "element", and in conversation that's fine. The difference in one glance:

::: tiles
- `<p>` a **tag**: just the label
- `<p>Hello</p>` an **element**: the whole package
- `class="intro"` an **attribute**: extra information
:::

### Some elements have nothing to close

A few elements never wrap any content, so there's nothing to close. These are **void elements**, written as a single tag. You'll meet these four in this course:

::: tiles
- `<br>` a line break
- `<hr>` a break between topics
- `<img>` an image
- `<input>` a form field
:::

> [!NOTE]
> You may see them written with a slash, like `<br />`. That's an older style. Both work; this notebook uses the shorter one.

## Attributes: extra information

An **attribute** gives an element extra information. It always lives inside the opening tag, as `name="value"`.

```html
<a href="https://www.google.com" target="_blank">Open Google</a>
```

::: anatomy
- `href="https://www.google.com"` **Where** the link goes.
- `target="_blank"` **How** it opens: in a new tab.
:::

Four rules keep attributes happy:

::: tiles
- **Inside** attributes go in the opening tag, never the closing one
- **Quoted** values go in quotes: `class="intro"`
- **Spaced** a space separates one attribute from the next
- **Specific** each attribute has its own job; they aren't interchangeable
:::

Here are the attributes you'll use in this course, all in one place:

| Attribute | Used on | What it does |
|---|---|---|
| `lang` | `<html>` | The main language of the page |
| `href` | `<a>` | Where a link goes |
| `target` | `<a>` | Where the linked page opens |
| `src` | `<img>` | Where the image file is |
| `alt` | `<img>` | A text description of the image |
| `type` | `<input>` | Which kind of form field to show |
| `id` | any element | A unique name for one element |
| `class` | any element | A group name many elements can share |

Some attributes are **switches**: just writing them turns something on, no value needed. You'll meet `checked` this way in the forms chapter: `<input type="checkbox" checked>`.

> [!PREDICT]- What's wrong with `<p>Hello</p class="intro">`?
> The attribute is in the **closing** tag. Attributes only ever go in the opening tag: `<p class="intro">Hello</p>`.

## Nesting: boxes inside boxes

Elements can sit inside other elements, like boxes inside boxes. One rule makes it work: **the inner box closes first.**

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
  `<b>` is still open when `<p>` closes, so the boxes cross.
:::

The outer element is the **parent**; the one inside is its **child**. These family words come back in Chapter 2, when the browser turns your page into a family tree.

> [!TIP]
> Indent each child one step further than its parent. The browser doesn't mind either way, but you'll see the structure at a glance.

> [!PREDICT]- Is `<b><i>Hi</b></i>` correct?
> No. `<i>` opened last, so it must close first: `<b><i>Hi</i></b>`.

## How the browser reads your file

Three habits of the browser surprise almost everyone at first:

::: tiles
- **Spaces collapse** many spaces or line breaks become one space
- **Case is ignored** `<P>` works, but lowercase is the custom
- **Mistakes are forgiven** which quietly hides bugs, so write it correctly
:::

See the first one for yourself. Lots of spaces and a line break go in, one tidy line comes out:

```html preview
<p>This     text     has     lots     of
spaces    and a line break,     but the browser
shows    it    as    one    tidy    line.</p>
```

### Comments: notes for humans

A comment is a note to yourself or a teammate. The browser skips it completely.

```html
<!-- This is a comment. It never appears on the page. -->
<p>This paragraph does.</p>
```

## Recap

::: idea Chapter 1 in one breath
HTML labels content. Tags are the labels, elements are the labelled packages, attributes add detail, and boxes always close inside-out.
:::

> [!PREDICT]- What's the difference between a tag and an element?
> A tag is just the label, like `<p>`. An element is the whole package: opening tag, content and closing tag, like `<p>Hello</p>`.

> [!PREDICT]- Why does `<img>` have no closing tag?
> It's a void element. It never wraps any content, so there's nothing to close.

> [!PREDICT]- How many spaces appear between the words in `<p>a     b</p>`?
> Just one. The browser collapses runs of spaces into a single space.
