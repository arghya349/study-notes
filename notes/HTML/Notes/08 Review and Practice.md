---
summary: How every chapter fits together, a one-page cheat sheet, recall questions with hidden answers, and a coding challenge with a sample solution.
---

# Review and Practice

You have covered the foundations of HTML: the document skeleton, text, lists, links and images, forms, and the tools for grouping and naming elements. This chapter pulls it all together so you can revise in one place, test yourself, and then build something from memory.

## How the chapters connect

### Tags and attributes, everywhere

Every chapter used the same two ideas from Chapter 1. **Tags and elements** establish *what kind* of content or control something is. **Attributes** configure or describe it.

```html
<a href="https://www.google.com" target="_blank">Open Google</a>
```

Here `<a>` says *this is a link*, while `href` and `target` say *where* it goes and *how* it opens.

### The skeleton holds everything

The boilerplate from Chapter 2 creates the document's frame. Everything from the later chapters, the headings, paragraphs, lists, links, images, forms and divs, lives inside `<body>`.

```html preview
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Learning Page</title>
</head>
<body>
    <h1>My Learning Page</h1>
    <p>I am learning <b>HTML</b>.</p>
    <a href="https://www.google.com" target="_blank">Open Google</a>
</body>
</html>
```

### From static content to interaction

Read in order, the chapters build up a page layer by layer:

1. [[What HTML Is]]: tags, elements and attributes, the vocabulary for everything else.
2. [[The Document Skeleton]]: the frame every page starts from.
3. [[Working with Text]]: display and structure written content.
4. [[Lists]]: organise related items.
5. [[Links and Images]]: connect pages and show pictures.
6. [[Forms]]: collect information from people.
7. [[Grouping and Identifiers]]: group content and name elements for future CSS and JavaScript.

## Cheat sheet

| Tag or attribute | Purpose | Key detail |
|---|---|---|
| `h1`–`h6` | Headings | Six levels; choose by hierarchy, not size |
| `p` | Paragraph | For paragraphs, not for spacing |
| `b` / `i` | Bold / italic appearance | Use `strong` / `em` when meaning calls for it |
| `sup` / `sub` | Above / below the baseline | 2<sup>3</sup>, H<sub>2</sub>O |
| `br` / `hr` | Line break / thematic break | Void elements; no closing tags |
| `ol` / `ul` / `li` | Lists and list items | `li` goes inside `ol` or `ul` |
| `a` / `href` | Hyperlink / destination | The anchor has opening and closing tags |
| `target="_blank"` | Open a link in a new context | Usually a new tab |
| `img` / `src` / `alt` | Image / source / alternative text | `img` is a void element |
| `form` | Groups form controls | Invisible on its own |
| `label` / `for` | Describes and connects a field | `for` matches the input's `id` |
| `input` / `type` | Creates a control | text, email, password, checkbox, radio, file, range, date, color |
| `name` | Names submitted data; groups radios | Radios in one group share a name |
| `div` | Generic grouping container | Prefer a meaningful element when one fits |
| `id` | Unique identifier | Never repeat it on a page |
| `class` | Reusable group label | Can be shared by many elements |

## Recall without looking

Try to answer each question out loud or on paper **before** revealing the answer. Struggling a little before you check is what makes it stick.

> [!QUESTION]- What is the difference between a tag, an element and an attribute?
> A **tag** is markup in angle brackets, like `<p>`. An **element** is the whole unit: opening tag, content and closing tag. An **attribute** adds extra information inside the opening tag, like `class="intro"`.

> [!QUESTION]- What does each major part of the HTML boilerplate do?
> `<!DOCTYPE html>` switches on modern standards mode. `<html lang="en">` is the root and declares the language. `<head>` holds metadata: `<meta charset>` sets the encoding, the viewport meta makes the page fit phones, and `<title>` names the tab. `<body>` holds the visible content.

> [!QUESTION]- Which tags create headings, paragraphs, bold and italic text, superscript and subscript?
> `h1`–`h6` for headings, `p` for paragraphs, `b` (or `strong`) for bold, `i` (or `em`) for italic, `sup` for superscript and `sub` for subscript.

> [!QUESTION]- What is the difference between `br` and `hr`?
> `br` breaks a line within text, as in an address. `hr` marks a thematic break, a change of topic between sections.

> [!QUESTION]- When should you choose `ol` instead of `ul`?
> When the order or ranking of the items matters, such as the steps of a process.

> [!QUESTION]- What is the difference between `href` and `src`?
> `href` is the destination of a link, on `<a>`. `src` is the location of a file to embed, such as an image on `<img>`.

> [!QUESTION]- Why is alt text important?
> Screen readers read it aloud, browsers show it if the image fails to load, and search engines use it to understand the image.

> [!QUESTION]- Why should a label's `for` value match an input's `id`?
> The shared value connects them: clicking the label focuses the input, and screen readers announce the label for that field.

> [!QUESTION]- Why do radio buttons in one group share the same `name`?
> A shared name makes them one group, so only one option can be selected. It is also the name the chosen value is sent under.

> [!QUESTION]- What is the difference between `id` and `class`?
> An `id` is unique to one element on the page. A `class` is a reusable label shared by any number of elements.

> [!QUESTION]- What is a `div`, and why might you use one?
> A generic container with no meaning or style of its own. It groups content so it can be styled or handled together when no meaningful element fits.

## Coding challenge

Build a page with everything below. Try it **from memory** first, then compare with the notes.

- [ ] Start with the full HTML boilerplate and set the title to *My Practice Page*.
- [ ] Add one `h1`, one paragraph, and a phrase using `b` and `i`.
- [ ] Show a maths expression using `sup` and a chemical formula using `sub`.
- [ ] Create a list of three learning goals using `ul` and `li`.
- [ ] Add a link that opens in a new tab.
- [ ] Add an image with a meaningful `alt` attribute.
- [ ] Create a form with name, email, password, a checkbox, and three radio choices sharing the same `name`.
- [ ] Add a `div` to group a heading and a paragraph.
- [ ] Give one element a unique `id`, and give several elements the same `class`.

> [!EXAMPLE]- A sample solution
> Yours can differ and still be right. Compare the structure, not the exact words.
>
> ```html preview
> <!DOCTYPE html>
> <html lang="en">
> <head>
>     <meta charset="UTF-8">
>     <meta name="viewport" content="width=device-width, initial-scale=1.0">
>     <title>My Practice Page</title>
> </head>
> <body>
>     <h1 id="page-title">My Practice Page</h1>
>     <p>I am <b>learning HTML</b> to become a <i>creative web developer</i>.</p>
>     <p>2<sup>3</sup> = 8, and water is H<sub>2</sub>O.</p>
>
>     <ul>
>         <li class="goal">Understand page structure</li>
>         <li class="goal">Build accessible forms</li>
>         <li class="goal">Start learning CSS</li>
>     </ul>
>
>     <a href="https://www.google.com" target="_blank">Search the web</a>
>     <br>
>     <img src="images/mountains.svg" alt="Blue mountains under a pale morning sky" width="240" height="135">
>
>     <form>
>         <label for="name">Name</label>
>         <input type="text" id="name" name="name">
>         <br><br>
>         <label for="email">Email</label>
>         <input type="email" id="email" name="email">
>         <br><br>
>         <label for="password">Password</label>
>         <input type="password" id="password" name="password">
>         <br><br>
>         <input type="checkbox" id="terms" name="terms">
>         <label for="terms">I agree to the terms</label>
>         <p>Choose one option:</p>
>         <input type="radio" id="male" name="gender" value="male">
>         <label for="male">Male</label>
>         <input type="radio" id="female" name="gender" value="female">
>         <label for="female">Female</label>
>         <input type="radio" id="other" name="gender" value="other">
>         <label for="other">Other</label>
>     </form>
>
>     <div>
>         <h2>About Me</h2>
>         <p>I practise a little HTML every day.</p>
>     </div>
> </body>
> </html>
> ```

## Final summary

These notes cover the foundations of HTML. **HTML gives a web page its structure.** The boilerplate establishes the document; text elements organise writing; lists group related items; anchors connect pages; images show pictures; forms collect input; and `div`, `id` and `class` group and name elements, ready for styling with CSS and behaviour with JavaScript.

> [!TIP] Keep this notebook growing
> Add each new lecture as a new chapter in this folder. The best long-term reference keeps your original notes and also shows how every new idea connects to what you already know.
