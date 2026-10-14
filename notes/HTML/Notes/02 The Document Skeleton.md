---
summary: The boilerplate every page starts with, explained line by line. What lives in the head, what lives in the body, and how the browser turns your file into a tree.
---

# The Document Skeleton

Before any heading or paragraph, every HTML file needs the same basic frame. This chapter walks through that frame, called the **boilerplate**, one line at a time, so that nothing in it stays a mystery.

## What a boilerplate is

A boilerplate is a standard starting structure that you reuse whenever you create a new page. Typing it by hand each time would be slow, so code editors can write it for you.

> [!TIP] The VS Code shortcut
> In a new file saved as `index.html`, type `!` and press <kbd>Tab</kbd> or <kbd>Enter</kbd> when the Emmet suggestion appears. VS Code writes the whole skeleton in one go.

This is what it produces, with the placeholder title replaced and a little content added to the body:

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

The file splits into two halves: the **head**, which describes the page, and the **body**, which *is* the page.

## Head and body

<figure class="diagram">
<div class="dg-grid cols-2 dg-map">
<div class="dg-card"><span class="dg-card-title">index.html</span><pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" …&gt;
  <span class="dg-hl-accent">&lt;title&gt;My Practice Page&lt;/title&gt;</span>
&lt;/head&gt;
&lt;body&gt;
  <span class="dg-hl">&lt;h1&gt;Hello, world&lt;/h1&gt;</span>
  <span class="dg-hl">&lt;p&gt;My first web page.&lt;/p&gt;</span>
&lt;/body&gt;
&lt;/html&gt;</pre></div>
<div class="dg-browser"><div class="dg-browser-bar"><span class="result-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="dg-browser-tab is-hl">My Practice Page</span></div><div class="dg-browser-body is-hl"><p class="dg-browser-h1">Hello, world</p><p>My first web page.</p></div></div>
</div>
<figcaption>The title travels up to the browser tab. Everything inside the body is drawn in the window.</figcaption>
</figure>

| | `<head>` | `<body>` |
|---|---|---|
| Holds | Information about the page, called metadata, and links to resources | The content people see and use |
| Visible on the page? | No. The one exception is the title, which appears in the tab | Yes |
| Examples | `<meta>`, `<title>` | Headings, paragraphs, lists, links, images, forms |

> [!NOTE]
> It is tempting to call the head "the part with instructions". More precisely, it holds **metadata**: data *about* the document, such as its character set, its title and how it should scale on phones. Later on you will also link your CSS files from the head.

## Line by line

### `<!DOCTYPE html>`

Tells the browser that this is a modern HTML document (HTML5) and should be read using today's standard rules. Without it, browsers fall back to *quirks mode*, which imitates the inconsistent behaviour of very old browsers.

It is a **declaration**, not an element. It has no closing tag, and it always comes first.

### `<html lang="en">`

The **root element**. It wraps everything else in the file. Its `lang` attribute declares the main language of the page, which helps:

- screen readers pronounce words correctly,
- browsers offer to translate the page,
- search engines understand who the page is for.

Change the value if the page is mostly in another language: `lang="bn"` for Bengali, `lang="hi"` for Hindi, `lang="fr"` for French.

### `<head>`

The container for metadata. It opens straight after `<html>` and closes before `<body>` begins.

### `<meta charset="UTF-8">`

Sets the **character encoding**: the rule the browser uses to turn the bytes saved in your file back into letters. UTF-8 covers almost every writing system, plus symbols and emoji, so *café*, *নমস্কার* and *→* all display correctly. Keep it near the top of the head.

> [!WARNING]
> With the wrong encoding, text turns into garbled symbols, such as `cafÃ©` where you wrote `café`.

### `<meta name="viewport" …>`

Phones once pretended to be desktop screens about 980 pixels wide, then shrank the whole page to fit, so text came out tiny. This line tells mobile browsers to behave:

- `width=device-width` makes the page exactly as wide as the device's screen.
- `initial-scale=1.0` starts at normal zoom, 100 percent.

It is the first step towards **responsive design**, pages that adapt to any screen size.

### `<title>`

Sets the text shown in the browser tab. The same text is used for bookmarks, browser history and search results, so replace the default "Document" with something meaningful.

### `<body>`

Holds everything visible on the page. Every element in the chapters that follow lives in here.

### `</html>`

Closes the root element. Nothing belongs after it.

## The page as a tree

When the browser reads your file, it builds a family tree of elements in memory. This tree is called the **DOM**, short for Document Object Model, and CSS and JavaScript both work with it.

<figure class="diagram">
<div class="scroll">
<svg viewBox="0 0 600 262" role="img" aria-label="A tree. html is the root. Its two children are head and body. head contains meta charset, meta viewport and title, and title contains the text My Practice Page. body contains h1, with the text Hello world, and p, with the text My first web page.">
<rect class="dg-well" x="24" y="72" width="276" height="182" rx="18"/>
<rect class="dg-well" x="330" y="72" width="246" height="182" rx="18"/>
<path class="dg-ink" d="M300 44V65M160 86V65H440V86"/>
<path class="dg-ink" d="M160 114V135M70 156V135H250V156M160 135V156"/>
<path class="dg-ink" d="M440 114V135M390 156V135H500V156"/>
<path class="dg-line dg-dash" d="M250 184V220M390 184V220M500 184V220"/>
<rect class="dg-root" x="268" y="16" width="64" height="28" rx="9"/>
<text x="300" y="35" text-anchor="middle" class="dg-mono dg-on-accent" style="font-size:13px">html</text>
<rect class="dg-box" x="130" y="86" width="60" height="28" rx="9"/>
<text x="160" y="105" text-anchor="middle" class="dg-mono dg-tag" style="font-size:13px">head</text>
<rect class="dg-box" x="410" y="86" width="60" height="28" rx="9"/>
<text x="440" y="105" text-anchor="middle" class="dg-mono dg-tag" style="font-size:13px">body</text>
<rect class="dg-box" x="42" y="156" width="56" height="28" rx="9"/>
<text x="70" y="175" text-anchor="middle" class="dg-mono dg-tag" style="font-size:13px">meta</text>
<rect class="dg-box" x="132" y="156" width="56" height="28" rx="9"/>
<text x="160" y="175" text-anchor="middle" class="dg-mono dg-tag" style="font-size:13px">meta</text>
<rect class="dg-box" x="221" y="156" width="58" height="28" rx="9"/>
<text x="250" y="175" text-anchor="middle" class="dg-mono dg-tag" style="font-size:13px">title</text>
<rect class="dg-box" x="370" y="156" width="40" height="28" rx="9"/>
<text x="390" y="175" text-anchor="middle" class="dg-mono dg-tag" style="font-size:13px">h1</text>
<rect class="dg-box" x="483" y="156" width="34" height="28" rx="9"/>
<text x="500" y="175" text-anchor="middle" class="dg-mono dg-tag" style="font-size:13px">p</text>
<text x="70" y="204" text-anchor="middle" class="dg-small">charset</text>
<text x="160" y="204" text-anchor="middle" class="dg-small">viewport</text>
<text x="250" y="238" text-anchor="middle" class="dg-leaf">My Practice Page</text>
<text x="390" y="238" text-anchor="middle" class="dg-leaf">Hello, world</text>
<text x="500" y="238" text-anchor="middle" class="dg-leaf">My first web page.</text>
</svg>
</div>
<figcaption>Boxes are elements; italic words are the text inside them. The head side describes the page, the body side is the page.</figcaption>
</figure>

Reading the tree with family words from Chapter 1:

- `html` is the **root**. Every other element descends from it.
- `head` and `body` are **children** of `html`, and **siblings** of each other.
- `title` is a child of `head`; `h1` and `p` are children of `body`.

> [!REMEMBER]
> The head is *about* the page. The body *is* the page.

## Making your first page

1. Create a folder for the project, for example `my-site`.
2. Open the folder in VS Code and create a file called `index.html`. Browsers and servers treat `index.html` as the home page of a folder, so it is the conventional first file.
3. Type `!` and press <kbd>Tab</kbd> to get the boilerplate. Change the title and add an `<h1>` inside the body.
4. Save, then open the file in a browser by double-clicking it or dragging it into a browser window.
5. Change something, save, and refresh the browser. Edit, save, refresh: that loop is how you will work for the rest of the course.

> [!TIP]
> The **Live Server** extension for VS Code refreshes the browser for you every time you save.

Here is the complete document running live. The tab title is not visible inside this small window, but the body is:

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

## Recap and practice

> [!SUMMARY] Chapter 2 in short
> - `<!DOCTYPE html>` switches on modern standards mode. It is a declaration, not an element.
> - `<html lang="…">` is the root element and declares the page's language.
> - The **head** holds metadata: `charset`, `viewport` and `title`.
> - The **body** holds everything people see.
> - The browser turns the file into a tree of elements, the **DOM**.

> [!QUESTION]- What does `<!DOCTYPE html>` do, and is it an element?
> It tells the browser to read the page with modern HTML standards instead of quirks mode. It is a declaration, not an element, so it has no closing tag.

> [!QUESTION]- What is the difference between the head and the body?
> The head holds information *about* the page (metadata such as the character set, the viewport settings and the title). The body holds the content that is actually displayed.

> [!QUESTION]- Where does the text inside `<title>` appear?
> In the browser tab, and also in bookmarks, history and search results. It does not appear inside the page itself.

> [!QUESTION]- What goes wrong on a phone without the viewport meta tag?
> The phone pretends to be a wide desktop screen and shrinks the page to fit, so the text becomes tiny and the layout does not adapt.

> [!QUESTION]- Why is `lang="en"` useful?
> It tells screen readers, translation tools and search engines which language the page is written in, so they can pronounce, translate and index it correctly.
