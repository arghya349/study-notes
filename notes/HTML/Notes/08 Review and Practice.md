---
summary: Tie it all together. How the chapters connect, a one-page cheat sheet, recall questions with hidden answers, and a coding challenge with a sample solution.
---

# Review and Practice

Look how far you've come: a page's skeleton, text, lists, links, images, forms, and the tools to group and name it all. This chapter ties everything together, hands you a one-page cheat sheet, and then lets you prove to yourself that you really know it.

<figure class="doodle">
<svg viewBox="0 0 400 200" aria-hidden="true">
<path class="soft" d="M30 160Q55 160 80 140T130 95T185 110T235 130T290 100T340 62"/>
<circle class="fill" cx="30" cy="160" r="5"/>
<circle class="fill" cx="80" cy="140" r="5"/>
<circle class="fill" cx="130" cy="95" r="5"/>
<circle class="fill" cx="185" cy="110" r="5"/>
<circle class="fill" cx="235" cy="130" r="5"/>
<circle class="fill" cx="290" cy="100" r="5"/>
<circle class="fill" cx="340" cy="62" r="5"/>
<path d="M340 62V18l28 9-28 9"/>
</svg>
<figcaption>Seven chapters behind you. Time to check the view from the top.</figcaption>
</figure>

::: tiles In this chapter you'll
- **Connect** every chapter into one picture
- **Revise** from a single cheat sheet
- **Recall** answers before revealing them
- **Build** a page from memory
:::

## How it all connects

Two ideas from Chapter 1 run through everything. **Elements** say *what* something is; **attributes** add the details.

```html
<a href="https://www.google.com" target="_blank">Open Google</a>
```

`<a>` says *this is a link*; `href` and `target` say *where* it goes and *how* it opens. Every chapter after that added new elements and attributes to the same pattern:

::: flow
1. **[[What HTML Is]]** Tags, elements and attributes: the vocabulary for everything else.
2. **[[The Document Skeleton]]** The frame every page lives in.
3. **[[Working with Text]]** Headings, paragraphs and emphasis.
4. **[[Lists]]** Numbered and bulleted items.
5. **[[Links and Images]]** Connecting pages and showing pictures.
6. **[[Forms]]** Asking people for information.
7. **[[Grouping and Identifiers]]** Grouping and naming elements, ready for CSS and JavaScript.
:::

And it all sits inside the skeleton. Everything from chapters 3 to 7 lives in the body:

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

## Cheat sheet

| Tag or attribute | Purpose | Key detail |
|---|---|---|
| `h1`–`h6` | Headings | Choose by level, not size |
| `p` | Paragraph | For paragraphs, not spacing |
| `b` / `i` | Bold / italic look | `strong` / `em` when it carries meaning |
| `sup` / `sub` | Above / below the line | 2<sup>3</sup>, H<sub>2</sub>O |
| `br` / `hr` | New line / new topic | Void elements, no closing tag |
| `ol` / `ul` / `li` | Lists and their items | `li` goes inside `ol` or `ul` |
| `a` / `href` | Link / destination | Has a closing tag |
| `target="_blank"` | Open in a new tab | Use sparingly |
| `img` / `src` / `alt` | Image / file / description | Void element |
| `form` | Holds the fields | Invisible on its own |
| `label` / `for` | Names a field | `for` matches the field's `id` |
| `input` / `type` | A field / which kind | text, email, password, checkbox, radio, file, range, date, color |
| `name` | Names the answer | Radios in one group share it |
| `div` | Groups content | Prefer a meaningful container when one fits |
| `id` | One unique name | Never repeat it on a page |
| `class` | A shared label | Use it as often as you like |

## Recall without looking

Say each answer out loud, or write it down, **before** you reveal it. That little struggle to remember is exactly what makes it stick.

> [!PREDICT]- Tag, element, attribute: what's the difference?
> A **tag** is the label in angle brackets, like `<p>`. An **element** is the whole package: opening tag, content, closing tag. An **attribute** adds detail inside the opening tag, like `class="intro"`.

> [!PREDICT]- What does each part of the boilerplate do?
> `<!DOCTYPE html>` switches on modern rules. `<html lang="en">` is the root and sets the language. `<head>` holds information about the page: `charset` for letters, the viewport line for phones, `<title>` for the tab. `<body>` holds everything people see.

> [!PREDICT]- Which tags make headings, paragraphs, bold, italic, superscript and subscript?
> `h1`–`h6`, `p`, `b` (or `strong`), `i` (or `em`), `sup` and `sub`.

> [!PREDICT]- What's the difference between `br` and `hr`?
> `br` breaks a line inside text, like an address. `hr` marks a change of topic between sections.

> [!PREDICT]- When do you choose `ol` instead of `ul`?
> When the order matters, like steps in a process. The shuffle test: if shuffling changes the meaning, use `ol`.

> [!PREDICT]- What's the difference between `href` and `src`?
> `href` is where a link goes, on `<a>`. `src` is the file to show, on `<img>`.

> [!PREDICT]- Why does alt text matter?
> Screen readers read it aloud, browsers show it when an image can't load, and search engines use it.

> [!PREDICT]- Why should a label's `for` match an input's `id`?
> The shared value links them: clicking the label focuses the field, and screen readers announce it.

> [!PREDICT]- Why do radio buttons in one group share a `name`?
> The shared name makes them one question, so only one can be chosen. It's also the name the answer is sent under.

> [!PREDICT]- What's the difference between `id` and `class`?
> An `id` belongs to exactly one element on the page. A `class` is a label any number of elements can share.

> [!PREDICT]- What is a `div`, and when would you use one?
> A plain container with no meaning or look of its own. Use it to group content when no meaningful container fits.

## Coding challenge

Build a page with everything below. Try it **from memory** first, then compare.

- [ ] Start with the full boilerplate and title it *My Practice Page*.
- [ ] Add one `h1`, one paragraph, and a phrase using `b` and `i`.
- [ ] Show a maths expression with `sup` and a chemical formula with `sub`.
- [ ] List three learning goals with `ul` and `li`.
- [ ] Add a link that opens in a new tab.
- [ ] Add an image with a meaningful `alt`.
- [ ] Build a form with name, email, password, a checkbox, and three radio choices sharing one `name`.
- [ ] Group a heading and a paragraph in a `div`.
- [ ] Give one element a unique `id`, and several elements the same `class`.

> [!EXAMPLE]- A sample solution
> Yours can look different and still be right. Compare the structure, not the exact words.
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

## What you now know

::: idea
HTML gives a web page its structure. You can now build that structure from the frame up: text, lists, links, images, forms, and the names that CSS and JavaScript will use next.
:::

> [!TIP] Keep the notebook growing
> Add each new lecture as a new chapter in this folder. The best reference keeps your notes and shows how every new idea connects to the ones before it.
