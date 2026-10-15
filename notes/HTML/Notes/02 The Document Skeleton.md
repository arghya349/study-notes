---
summary: The frame every page starts from, explained line by line. What lives in the head, what lives in the body, and how the browser turns your file into a family tree.
---

# The Document Skeleton

Every HTML page, from a one-line experiment to a huge website, sits inside the same frame. Learn it once and you'll never have to think about it again. Even better, your editor can type the whole thing for you.

<figure class="doodle">
<svg viewBox="0 0 400 230" aria-hidden="true">
<rect x="120" y="16" width="160" height="200" rx="12"/>
<rect class="fill soft" x="134" y="30" width="132" height="40" rx="7"/>
<path d="M148 98h104M148 118h90M148 138h104M148 158h72M148 178h96"/>
<path d="M272 50h40M264 138h48"/>
<text class="hand" x="320" y="56">head</text>
<text class="hand" x="320" y="144">body</text>
</svg>
<figcaption>Two halves: the head describes the page, the body is the page.</figcaption>
</figure>

::: tiles By the end of this chapter you can
- **Write** the starter frame without looking
- **Explain** what every line does
- **Separate** the head from the body
- **Picture** your page as a family tree
:::

## The starter frame

This frame is called the **boilerplate**: a standard start you reuse for every page.

> [!TIP] Let VS Code type it
> In a new file saved as `index.html`, type `!` and press <kbd>Tab</kbd> or <kbd>Enter</kbd> when the suggestion appears. The whole frame appears in one go.

Here it is, with a title and a little content filled in:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Practice Page</title>
</head>
<body>
    <h1>Hello, world</h1>
    <p>My first web page.</p>
</body>
</html>
```

It looks like a lot, but every line has one simple job. Let's take them in turn.

## Line by line

::: anatomy
- `<!DOCTYPE html>` **"This is modern HTML."** It switches the browser into today's standard rules.
- `<html lang="en">` **The root.** It wraps everything, and `lang` says the page is in English.
- `<head>` **Information about the page** starts here.
- `<meta charset="UTF-8">` **Lets every letter and symbol show correctly**, from *café* to *নমস্কার*.
- `<meta name="viewport" …>` **Makes the page fit phone screens.**
- `<title>My Practice Page</title>` **The words in the browser tab.**
- `</head>` **End of the information.**
- `<body>` **The page itself starts here.** Everything people see goes inside.
- `</body>`<br>`</html>` **Close the body, then close the whole page.**
:::

A few of these lines deserve a closer look.

### `<!DOCTYPE html>` isn't an element

It's a **declaration**: a note to the browser that comes before everything else, with no closing tag. Leave it out and browsers fall back to *quirks mode*, imitating very old, inconsistent browsers.

### `lang` helps more than you'd think

::: tiles What lang="en" does
- **Pronounce** screen readers say words correctly
- **Translate** browsers know when to offer translation
- **Find** search engines know who the page is for
:::

If your page is mostly in another language, change it: `lang="bn"` for Bengali, `lang="hi"` for Hindi, `lang="fr"` for French.

### `charset` keeps your text readable

> [!WARNING]
> With the wrong character set, text turns into garbled symbols, like `cafÃ©` where you wrote `café`.

### The viewport line saves your phone readers

::: pair
- **Without it**

  The phone pretends to be a desktop screen about 980 pixels wide and shrinks the page to fit. The text comes out tiny.
- **With it**

  `width=device-width` fits the page to the real screen, and `initial-scale=1.0` starts at normal zoom.
:::

## Head and body

The frame splits cleanly into two halves:

::: pair
- **The head is about the page**

  Character set, phone settings and the title. None of it appears on the page, except the title, which shows in the browser tab.
- **The body is the page**

  Headings, paragraphs, lists, links, images, forms: everything people see and use.
:::

Here's where each part ends up:

<figure class="diagram">
<div class="dg-grid cols-2 dg-map">
<div class="dg-card"><span class="dg-card-title">index.html</span><pre>&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" …&gt;
  <span class="dg-hl-accent">&lt;title&gt;My Practice Page&lt;/title&gt;</span>
&lt;/head&gt;
&lt;body&gt;
  <span class="dg-hl">&lt;h1&gt;Hello, world&lt;/h1&gt;</span>
  <span class="dg-hl">&lt;p&gt;My first web page.&lt;/p&gt;</span>
&lt;/body&gt;</pre></div>
<div class="dg-browser"><div class="dg-browser-bar"><span class="result-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="dg-browser-tab is-hl">My Practice Page</span></div><div class="dg-browser-body is-hl"><p class="dg-browser-h1">Hello, world</p><p>My first web page.</p></div></div>
</div>
<figcaption>The title travels up to the tab. Everything in the body is drawn in the window.</figcaption>
</figure>

> [!REMEMBER]
> The head is *about* the page. The body *is* the page.

## Your page is a family tree

When the browser reads your file, it builds a family tree of elements in memory, called the **DOM** (Document Object Model). Later, CSS and JavaScript will both work with this tree.

<figure class="diagram">
<ul class="dg-tree">
<li><span class="dg-node is-root">html</span>
<ul>
<li><span class="dg-node">head</span>
<ul>
<li><span class="dg-node">meta</span><span class="dg-note">charset</span></li>
<li><span class="dg-node">meta</span><span class="dg-note">viewport</span></li>
<li><span class="dg-node">title</span><span class="dg-note">“My Practice Page”</span></li>
</ul></li>
<li><span class="dg-node">body</span>
<ul>
<li><span class="dg-node">h1</span><span class="dg-note">“Hello, world”</span></li>
<li><span class="dg-node">p</span><span class="dg-note">“My first web page.”</span></li>
</ul></li>
</ul></li>
</ul>
<figcaption>Each box is an element; the quoted words are the text inside it.</figcaption>
</figure>

::: tiles Family words
- **Root** `html` sits at the top; everything descends from it
- **Children** `head` and `body` are children of `html`
- **Siblings** `head` and `body` are siblings of each other
:::

## Make your first page

::: flow
1. **Make a folder** Call it something like `my-site`.
2. **Create index.html** Open the folder in VS Code and add a file called `index.html`. Browsers treat that name as the home page of a folder.
3. **Type the frame** Press `!` then <kbd>Tab</kbd>, change the title, and add an `<h1>` inside the body.
4. **Open it** Save, then double-click the file or drag it into a browser.
5. **Repeat** Change something, save, refresh. Edit, save, refresh is the rhythm you'll work in from now on.
:::

> [!TIP]
> The **Live Server** extension for VS Code refreshes the browser for you each time you save.

Here's the finished page running. The tab title isn't visible in this little window, but the body is:

```html preview
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Practice Page</title>
</head>
<body>
    <h1>Hello, world</h1>
    <p>My first web page.</p>
</body>
</html>
```

## Recap

::: idea Chapter 2 in one breath
Every page sits in the same frame: a doctype, then `html`, then a head that describes the page and a body that is the page.
:::

> [!PREDICT]- Where does the text inside `<title>` show up?
> In the browser tab, plus bookmarks, history and search results. Not on the page itself.

> [!PREDICT]- You put a paragraph inside `<head>`. Where should it go?
> Inside `<body>`. Everything people should see belongs in the body; the head is only for information about the page.

> [!PREDICT]- Is `<!DOCTYPE html>` an element?
> No. It's a declaration that tells the browser to use modern rules. It has no closing tag.

> [!PREDICT]- Your page looks tiny on a phone. Which line is probably missing?
> The viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
