---
summary: Links that go anywhere, opening a new tab, file paths that always work, and images with alternative text that actually helps.
---

# Links and Images

Links are what make the web a *web*: they carry you from one page to the next. Images bring in everything words can't show. Each needs just one element and a couple of attributes, and by the end of this chapter you'll use both with confidence.

<figure class="doodle">
<svg viewBox="0 0 400 220" aria-hidden="true">
<rect x="58" y="92" width="96" height="40" rx="20" transform="rotate(-32 106 112)"/>
<rect x="112" y="72" width="96" height="40" rx="20" transform="rotate(-32 160 92)"/>
<rect x="236" y="46" width="120" height="124" rx="8"/>
<rect class="soft" x="248" y="58" width="96" height="100" rx="4"/>
<path d="M254 150l26-38 18 22 14-16 26 32"/>
<circle cx="320" cy="82" r="9"/>
</svg>
<figcaption>A link carries you somewhere. An image brings something to you.</figcaption>
</figure>

::: tiles By the end of this chapter you can
- **Link** to any page, email or number
- **Open** a link in a new tab
- **Point** to your own files with paths
- **Add** images with helpful alt text
:::

## The anchor element: a

A link is made with `<a>`, the **anchor** element. Here's one, taken apart:

```html
<a href="https://www.google.com" target="_blank">Open Google</a>
```

::: anatomy Anatomy of a link
- `<a href="https://www.google.com" target="_blank">` **Opening tag**, carrying two attributes.
- `href="https://www.google.com"` **Where it goes.** The destination.
- `target="_blank"` **How it opens.** Here, in a new tab.
- `Open Google` **The link text**: the words people click.
- `</a>` **Closing tag.**
:::

### Write link text that makes sense on its own

People skim links, and screen reader users can jump through a list of every link on the page. "Click here" means nothing out of context:

::: pair
- **Weak**
  ```html
  <a href="timetable.html">Click here</a> for the timetable.
  ```
- **Better**
  ```html
  See the <a href="timetable.html">exam timetable</a>.
  ```
:::

## Where a link can go

`href` can point to all kinds of places:

::: tiles
- **Another site** `https://www.google.com`
- **Your own page** `about.html`
- **Same page** `#contact` jumps to the element with `id="contact"`
- **Email** `mailto:hello@example.com`
- **Phone** `tel:+919800000000`
:::

```html preview
<p><a href="https://www.google.com">Search the web</a></p>
<p><a href="mailto:hello@example.com">Email the class teacher</a></p>
<p><a href="tel:+919800000000">Call the school office</a></p>
```

## Opening a new tab

A link normally opens in the **same tab**, replacing the page you're on. `target="_blank"` asks for a new tab instead (or a new window, depending on the browser's settings).

```html
<a href="https://www.google.com" target="_blank">Open Google in a new tab</a>
```

> [!NOTE] About rel="noopener noreferrer"
> Pages opened this way could once reach back and control the page that opened them. Modern browsers now block that automatically, but many developers still add `rel="noopener noreferrer"` as a safety habit.

> [!TIP]
> Use new tabs sparingly. People can always choose a new tab themselves, but they can't easily undo one you forced on them. It makes most sense when leaving would lose someone's work, like a half-filled form.

## File paths: directions to your files

When a link or image points to a file in your own project, you write a **path**: directions from the file you're in to the file you want. Here's a small project:

<figure class="diagram">
<ul class="dg-tree">
<li><span class="dg-node is-root">my-site/</span>
<ul>
<li><span class="dg-node is-file">index.html</span></li>
<li><span class="dg-node is-file">about.html</span></li>
<li><span class="dg-node">images/</span>
<ul><li><span class="dg-node is-file">mountains.svg</span></li></ul></li>
<li><span class="dg-node">blog/</span>
<ul><li><span class="dg-node is-file">first-post.html</span></li></ul></li>
</ul></li>
</ul>
<figcaption>A path is a set of directions that starts from the file you're in.</figcaption>
</figure>

::: anatomy Reading a path
- `about.html` **Same folder.** Just the file name.
- `images/mountains.svg` **Go into** the `images` folder, then find the file.
- `../index.html` **Go up one folder first.** You'd write this from inside `blog/`.
- `https://www.google.com` **The full address.** For other websites.
:::

::: pair
- **Relative paths**

  Start from the current file, like `images/mountains.svg`. Use them for your own files: they keep working when you move the whole project.
- **Absolute URLs**

  The complete address, starting with `https://`. Use them for other websites.
:::

> [!WARNING]
> Paths must match names exactly. On most web servers `Images/Mountains.svg` and `images/mountains.svg` are different files, so stick to lowercase names without spaces.

> [!PREDICT]- You're in `blog/first-post.html`. How do you show `images/mountains.svg`?
> `../images/mountains.svg`. Go up out of `blog/` first, then into `images/`.

## Images: img

`<img>` puts a picture on the page. It's a **void element**, so there's no closing tag. Two attributes do all the work:

```html preview
<img src="images/mountains.svg" alt="Blue mountains under a pale morning sky">
```

::: anatomy
- `src="images/mountains.svg"` **The source.** Where the image file is: a path, or a full URL.
- `alt="Blue mountains…"` **The alternative text.** The image, described in words.
:::

### Pick a sensible format

::: tiles
- **JPEG** photographs
- **PNG** sharp graphics, transparent backgrounds
- **SVG** logos and icons, sharp at any size
- **WebP** smaller files, same quality
:::

### Why alt text matters

::: tiles
- **Heard** screen readers read it aloud
- **Shown** it appears when the image can't load
- **Found** search engines use it
:::

Here the file doesn't exist, so the browser shows the alt text instead:

```html preview
<img src="images/missing-photo.jpg" alt="Students revising together in a library">
```

Good alt text describes what the image shows *for the job it does on the page*:

| Image | Weak | Better |
|---|---|---|
| A photo in an article about pets | `alt="image of dog"` | `alt="A golden retriever leaping to catch a red ball"` |
| A school logo that links home | `alt="logo"` | `alt="Notebook School home"` |
| A decorative swirl | `alt="decorative swirl"` | `alt=""` |

> [!REMEMBER]
> Don't start with "image of": screen readers already say it's an image. For pure decoration, write an **empty** `alt=""` so it's skipped. Never leave `alt` out entirely, or some screen readers read out the file name.

### Tell the browser the size

```html
<img src="images/mountains.svg" alt="Blue mountains under a pale morning sky" width="400" height="225">
```

With `width` and `height` (in pixels, no units), the browser saves the right space before the image arrives, so the text below doesn't jump. Keep the two numbers in the image's real proportion.

## Links and images together

Put an image inside a link and the whole picture becomes clickable. The alt text then describes where it takes you:

```html preview
<a href="https://www.google.com/search?q=mountains" target="_blank">
  <img src="images/mountains.svg" alt="Search for mountain photos" width="240" height="135">
</a>
```

::: pair
- **a uses href**

  The destination of a link. Has a closing tag; the link text sits inside.
- **img uses src**

  The file to show. A void element, with no closing tag; `alt` stands in for text.
:::

> [!WARNING]
> The classic mix-up: links use **`href`**, images use **`src`**. `<img href="…">` or `<a src="…">` silently does nothing.

## Recap

::: idea Chapter 5 in one breath
`a` with `href` takes you somewhere, `img` with `src` brings a picture in, paths are directions from where you stand, and alt text speaks for the image.
:::

> [!PREDICT]- What's the difference between `href` and `src`?
> `href` is where a link goes, on `<a>`. `src` is the file to show, on `<img>`.

> [!PREDICT]- What alt text should a purely decorative image have?
> An empty one, `alt=""`, so screen readers skip it.

> [!PREDICT]- What does `target="_blank"` do?
> It asks the browser to open the link in a new tab instead of replacing the current page.
