---
summary: The anchor element and where links can point, opening links in a new tab, file paths that always resolve, and images with useful alternative text.
---

# Links and Images

Links are what make the web a *web*: they connect one page to the next. Images bring in everything that words alone can't show. Both are built with just one element and a couple of attributes each.

## The anchor element: a

`<a>`, the **anchor** element, creates a hyperlink. A link can lead to another website, another page on your own site, a file, an email address, or a section further down the same page.

```html
<a href="https://www.google.com">Open Google</a>
```

The text between the opening and closing tags is the **link text**: the part people see and click.

::: anatomy Anatomy of a link
- `<a href="https://www.google.com" target="_blank">` **Opening tag**, carrying two attributes.
- `href="https://www.google.com"` **Where it goes.** The destination.
- `target="_blank"` **How it opens.** Here, in a new tab.
- `Open Google` **Link text**, the words people click.
- `</a>` **Closing tag.**
:::

### Write link text that makes sense on its own

People scan links, and screen reader users can pull up a list of every link on a page. "Click here" means nothing out of context.

| Weak | Better |
|---|---|
| `<a href="timetable.html">Click here</a> for the timetable.` | `See the <a href="timetable.html">exam timetable</a>.` |
| `<a href="void.html">Read more</a>` | `<a href="void.html">Read more about void elements</a>` |

## href: where the link goes

`href`, short for *hypertext reference*, holds the link's destination. Different kinds of value lead to different kinds of place:

| Destination | Example `href` |
|---|---|
| Another website | `https://www.google.com` |
| Another page on your own site | `about.html` |
| A section of the same page | `#contact` (the section has `id="contact"`, see Chapter 7) |
| An email address | `mailto:hello@example.com` |
| A phone number | `tel:+919800000000` |

```html preview
<p><a href="https://www.google.com">Search the web</a></p>
<p><a href="mailto:hello@example.com">Email the class teacher</a></p>
<p><a href="tel:+919800000000">Call the school office</a></p>
```

## target="_blank": opening a new tab

By default a link opens in the **same tab**, replacing the current page. Adding `target="_blank"` asks the browser to open it in a new browsing context instead, usually a new tab. Whether that is a tab or a window depends on the browser's settings.

```html
<a href="https://www.google.com" target="_blank">Open Google in a new tab</a>
```

> [!NOTE] About rel="noopener noreferrer"
> A page opened with `target="_blank"` used to be able to reach back and control the page that opened it. Modern browsers now block this automatically, but adding `rel="noopener noreferrer"` is still a common defensive habit:
>
> ```html
> <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Open Google</a>
> ```

> [!TIP]
> Use new tabs sparingly. People can always choose to open a link in a new tab themselves, but they can't easily undo one you forced. A new tab makes most sense when leaving would lose someone's work, such as a half-filled form.

## File paths

When a link or an image points to a file in your own project, `href` or `src` holds a **path**: directions from the current file to the target file. Take this project:

<figure class="diagram">
<div class="dg-grid cols-2">
<div><ul class="dg-tree">
<li><span class="dg-node is-root">my-site/</span>
<ul>
<li><span class="dg-node is-file">index.html</span></li>
<li><span class="dg-node is-file">about.html</span></li>
<li><span class="dg-node">images/</span>
<ul><li><span class="dg-node is-file">mountains.svg</span></li></ul></li>
<li><span class="dg-node">blog/</span>
<ul><li><span class="dg-node is-file">first-post.html</span></li></ul></li>
</ul></li>
</ul></div>
<div class="dg-card"><span class="dg-card-title">Reading a path</span><p><code>about.html</code> is in the same folder.</p><p style="margin-top:8px"><code>images/mountains.svg</code> means go into <em>images</em>, then find the file.</p><p style="margin-top:8px"><code>../index.html</code> means go up one folder first.</p></div>
</div>
<figcaption>A relative path is a set of directions starting from the file you are in.</figcaption>
</figure>

| You are in | You want | You write |
|---|---|---|
| `index.html` | the About page | `about.html` |
| `index.html` | the mountain picture | `images/mountains.svg` |
| `blog/first-post.html` | the home page | `../index.html` |
| any page | Google | `https://www.google.com` |

There are two kinds of path:

- **Relative paths** start from the current file, like the first three rows. They keep working when you move the whole project folder, so use them for your own files.
- **Absolute URLs** give the full address, starting with `https://`. Use them for other websites.

> [!WARNING]
> Paths must match file and folder names exactly. On most web servers `Images/Mountains.svg` and `images/mountains.svg` are different files, so stick to lowercase names without spaces.

## The image element: img

`<img>` embeds an image in the page. It is a **void element**, so it has no closing tag. Two attributes do the work:

```html preview
<img src="images/mountains.svg" alt="Blue mountains under a pale morning sky">
```

### src: the source

`src` says where the image file is. It can be a relative path to a file in your project, as above, or a full URL to an image elsewhere on the web.

Common image formats:

| Format | Best for |
|---|---|
| JPEG (`.jpg`) | Photographs |
| PNG (`.png`) | Graphics that need sharp edges or a transparent background |
| SVG (`.svg`) | Logos, icons and illustrations. Stays sharp at any size |
| WebP and AVIF | Modern formats with smaller files for the same quality |

### alt: the alternative text

`alt` describes the image in words. It is:

- **read aloud by screen readers** for people who can't see the image,
- **shown in place of the image** if it fails to load,
- **used by search engines** to understand the image.

Here the file doesn't exist, so the browser falls back to the alternative text:

```html preview
<img src="images/missing-photo.jpg" alt="Students revising together in a library">
```

Good alt text describes what the image shows *for the purpose it serves on the page*:

| Image | Weak alt | Better alt |
|---|---|---|
| A photo in an article about pets | `alt="image of dog"` | `alt="A golden retriever leaping to catch a red ball"` |
| A school logo linking to the home page | `alt="logo"` | `alt="Notebook School home"` |
| A decorative swirl between sections | `alt="decorative swirl"` | `alt=""` |

> [!REMEMBER]
> Don't begin alt text with "image of" or "picture of": screen readers already announce that it is an image. For purely decorative images, write an **empty** `alt=""` so they are skipped. Never leave `alt` out entirely, or some screen readers will read out the file name instead.

### width and height

You can tell the browser an image's size in advance, in pixels, without units:

```html
<img src="images/mountains.svg" alt="Blue mountains under a pale morning sky" width="400" height="225">
```

The browser then reserves the right space before the file arrives, so the text below doesn't jump when the image finishes loading. Keep the two numbers in the image's real proportion, or it will look stretched.

## Links and images together

An image can sit inside a link, so the whole image becomes clickable. The alt text then describes where the link goes:

```html preview
<a href="https://www.google.com/search?q=mountains" target="_blank">
  <img src="images/mountains.svg" alt="Search for mountain photos" width="240" height="135">
</a>
```

| | Anchor `<a>` | Image `<img>` |
|---|---|---|
| Main attribute | `href`: the destination | `src`: the image file |
| Closing tag? | Yes: `</a>` | No, it's a void element |
| Text inside | The link text | None. `alt` stands in for it |

> [!WARNING]
> A classic mix-up: links use **`href`**, images use **`src`**. Writing `<img href="…">` or `<a src="…">` silently does nothing.

## Recap and practice

> [!SUMMARY] Chapter 5 in short
> - `<a>` creates a link. `href` is where it goes; the content is the link text.
> - `target="_blank"` opens the link in a new tab. Use it sparingly.
> - Relative paths (`images/photo.jpg`, `../index.html`) point to your own files; absolute URLs (`https://…`) point elsewhere.
> - `<img>` is a void element. `src` is the file; `alt` describes it.
> - `width` and `height` reserve space so the page doesn't jump.

> [!QUESTION]- What is the difference between `href` and `src`?
> `href` is the destination of a link (on `<a>`). `src` is the location of a file to embed, such as an image (on `<img>`).

> [!QUESTION]- Why is alt text important?
> Screen readers read it aloud, browsers show it when the image can't load, and search engines use it to understand the image.

> [!QUESTION]- What alt text should a purely decorative image have?
> An empty one: `alt=""`. The image is then skipped by screen readers.

> [!QUESTION]- You are in `blog/first-post.html`. How do you link to `index.html` in the folder above?
> `<a href="../index.html">Home</a>`. The `../` means "go up one folder".

> [!QUESTION]- What does `target="_blank"` do?
> It asks the browser to open the link in a new browsing context, usually a new tab, instead of replacing the current page.
