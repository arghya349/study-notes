---
summary: Grouping content with div, naming one element with id, labelling many with class, and the meaningful containers that often do a div's job better.
---

# Grouping and Identifiers

Once a page has content, you'll want to group pieces together and point at particular ones. That's all `div`, `id` and `class` do. They change almost nothing you can see; think of them as getting the page ready for CSS and JavaScript, which come next in your journey.

<figure class="sketch">
<svg viewBox="0 0 420 222" aria-hidden="true">
<g class="washes">
<path class="w-orange" d="M48 88h104l26 26-26 26H48z"/>
<path class="w-green" d="M232 50h96l22 22-22 22h-96zM232 100h96l22 22-22 22h-96zM232 150h96l22 22-22 22h-96z"/>
</g>
<g class="ink">
<path d="M48 88h104l26 26-26 26H48z"/>
<circle cx="164" cy="114" r="4"/>
<path class="thin" d="M168 114q22 8 16 34q-4 16 10 24"/>
<path d="M232 50h96l22 22-22 22h-96zM232 100h96l22 22-22 22h-96zM232 150h96l22 22-22 22h-96z"/>
<circle cx="340" cy="72" r="3.5"/><circle cx="340" cy="122" r="3.5"/><circle cx="340" cy="172" r="3.5"/>
<path class="thin" d="M344 72q30 10 46 50M344 122h46M344 172q30-10 46-50"/>
<circle class="solid" cx="390" cy="122" r="3"/>
</g>
<text class="t-hand" x="98" y="121" text-anchor="middle" style="font-size:20px">#apple</text>
<text class="t-hand" x="282" y="79" text-anchor="middle" style="font-size:19px">.fruit</text>
<text class="t-hand" x="282" y="129" text-anchor="middle" style="font-size:19px">.fruit</text>
<text class="t-hand" x="282" y="179" text-anchor="middle" style="font-size:19px">.fruit</text>
<text class="t-code" x="106" y="186" text-anchor="middle">id</text>
<text class="t-code" x="282" y="214" text-anchor="middle">class</text>
</svg>
<figcaption>An id is a name tag for one. A class is a label many can share.</figcaption>
</figure>

::: tiles By the end of this chapter you can
- **Group** content with div
- **Name** one element with id
- **Label** many elements with class
- **Pick** a meaningful container instead
:::

## div: an invisible box

`<div>`, short for *division*, is a container with no meaning of its own. It simply groups things that belong together.

```html preview
<div>
  <h2>About Me</h2>
  <p>I am learning front-end development.</p>
</div>
```

::: anatomy What the div is doing
- `<div>` **Opens an invisible box.**
- `<h2>About Me</h2>`<br>`<p>I am learning…</p>` **Everything inside** now belongs together, so CSS and JavaScript can treat it as one unit.
- `</div>` **Closes the box.** On screen, nothing changes yet.
:::

::: tiles A div in three facts
- **Groups** related content, to style or move it together
- **Blocks** starts on a new line and spans the width
- **Plain** no look and no meaning of its own
:::

> [!NOTE]
> The lecture roadmap listed `div` next to `id` and `class`, but the original notes only explained the last two. This section fills that gap.

## id: a unique name

`id` gives **one** element a name nobody else on the page can have.

```html
<p id="apple">Hello</p>
```

::: tiles Rules for ids
- **Unique** never repeat one on a page
- **No spaces** join words with hyphens: `contact-form`
- **Exact** `Apple` and `apple` are different ids
- **Meaningful** `newsletter-email` beats `box2`
:::

::: pair
- **Incorrect: a repeated id**
  ```html
  <p id="apple">First paragraph</p>
  <p id="apple">Second paragraph</p>
  ```
- **Correct: different ids**
  ```html
  <p id="apple">First paragraph</p>
  <p id="mango">Second paragraph</p>
  ```
:::

An id is how other parts of the web find **one specific element**. You've already met two of them:

::: tiles Who uses an id
- **A label** `for="apple"` points at it (Chapter 6)
- **A link** `href="#apple"` jumps to it (Chapter 5)
- **CSS** `#apple { … }` styles it
- **JavaScript** `getElementById('apple')` finds it
:::

## class: a shared label

`class` puts elements into a named **group**. Unlike an id, you can use the same class as often as you like.

```html preview
<p class="fruit">Apple</p>
<p class="fruit">Mango</p>
<p class="fruit">Banana</p>
<p class="fruit">Orange</p>
```

Nothing changes on screen yet, but one CSS rule can now style all four at once. Here's a sneak peek of what's coming:

```html preview
<style>
  .fruit { color: #2b4a72; font-weight: 600; }
</style>
<p class="fruit">Apple</p>
<p class="fruit">Mango</p>
<p>Bread</p>
<p class="fruit">Banana</p>
```

::: tiles
- **Many classes** separate them with spaces: `class="fruit sweet"`
- **Both at once** `<p id="apple" class="fruit">`
:::

## id versus class

::: pair
- **id: one of a kind**
  ```html
  <p>Mango</p>
  <p id="apple">Apple</p>
  <p>Banana</p>
  ```
  Exactly one element carries `id="apple"`.
- **class: shared by many**
  ```html
  <p class="fruit">Mango</p>
  <p class="fruit">Apple</p>
  <p class="fruit">Banana</p>
  ```
  Every element in the group carries `class="fruit"`.
:::

::: idea
An id is like your roll number: nobody else has it. A class is like your section: many students share it, and you can belong to more than one.
:::

> [!NOTE]
> Neither changes how an element looks by itself. They're names. CSS and JavaScript decide what happens to the elements those names point at.

> [!PREDICT]- Every product card on a shop page should look the same. id or class?
> `class`. Many cards share it, so one style rule reaches them all.

## Better than a div: meaningful containers

A `div` says nothing about what's inside it. HTML also has containers that **do** carry meaning, and they're often the better choice:

<figure class="diagram">
<div class="wire">
<div class="wire-box wire-head is-accent"><span>header</span><div class="wire-box"><span>nav</span></div></div>
<div class="wire-box"><span>main</span><div class="wire-row"><div class="wire-box is-hl"><span>section</span><i></i><i></i><i></i></div><div class="wire-box is-hl"><span>article</span><i></i><i></i><i></i></div></div></div>
<div class="wire-box is-accent"><span>footer</span></div>
</div>
<figcaption>A typical page, built from meaningful containers instead of anonymous divs.</figcaption>
</figure>

::: tiles
- `header` the top of a page: logo, title, often the menu
- `nav` the main navigation links
- `main` the main content, used once
- `section` a themed group with its own heading
- `article` a self-contained piece, like a blog post
- `footer` the closing part: contact, copyright
:::

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

They look just like divs, but browsers, screen readers and search engines understand them. A screen reader user can jump straight to `<main>`, for example.

> [!TIP] A simple rule
> If a meaningful container describes your content, use it. Reach for `<div>` when none fits, usually for grouping that's only there for layout.

## Recap

::: idea Chapter 7 in one breath
`div` groups, `id` names one, `class` labels many, and a meaningful container beats a plain div whenever one fits.
:::

> [!PREDICT]- What's the difference between `id` and `class`?
> An id is unique to one element on the page. A class is a label any number of elements can share.

> [!PREDICT]- How do you give a paragraph two classes, `fruit` and `sweet`?
> `<p class="fruit sweet">Mango</p>`, with a space between the names.

> [!PREDICT]- Name three things that can use an element's id.
> A label's `for`, a link like `href="#apple"`, and CSS with `#apple`. JavaScript can find it too.
