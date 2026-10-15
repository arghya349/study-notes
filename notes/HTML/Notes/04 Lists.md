---
summary: Numbered lists, bulleted lists, the items inside them, lists inside lists, and a simple test for choosing the right one.
---

# Lists

Shopping lists, recipes, top tens, menus: lists are everywhere, on paper and on the web. HTML has two kinds, and the good news is that they're built from exactly the same pieces.

<figure class="sketch">
<svg viewBox="0 0 420 236" aria-hidden="true">
<g class="washes">
<path class="w-paper" d="M60 24h150v180H60z" transform="rotate(-3 135 115)"/>
<path class="w-yellow" d="M226 42h128v140H226z" transform="rotate(4 290 115)"/>
<circle class="w-red" cx="135" cy="34" r="7"/>
</g>
<g class="ink">
<g transform="rotate(-3 135 115)">
<rect x="60" y="24" width="150" height="180" rx="6"/>
<path class="thin" d="M106 70h82M106 110h66M106 150h76"/>
<path d="M192 62l5 6 10-12"/>
</g>
<circle class="solid" cx="135" cy="34" r="3"/>
<g transform="rotate(4 290 115)">
<path d="M226 42h128v120l-20 20H226z"/>
<path class="thin" d="M354 162h-20v20"/>
<circle class="solid" cx="248" cy="82" r="3.5"/><circle class="solid" cx="248" cy="114" r="3.5"/><circle class="solid" cx="248" cy="146" r="3.5"/>
<path class="thin" d="M262 82h70M262 114h56M262 146h64"/>
</g>
</g>
<g transform="rotate(-3 135 115)">
<text class="t-hand" x="78" y="76" style="font-size:18px">1.</text>
<text class="t-hand" x="78" y="116" style="font-size:18px">2.</text>
<text class="t-hand" x="78" y="156" style="font-size:18px">3.</text>
</g>
<text class="t-code" x="135" y="226" text-anchor="middle">ol</text>
<text class="t-code" x="292" y="226" text-anchor="middle">ul</text>
</svg>
<figcaption>Numbers when the order matters, bullets when it doesn’t.</figcaption>
</figure>

::: tiles By the end of this chapter you can
- **Number** a list with ol
- **Bullet** a list with ul
- **Nest** a list inside a list
- **Choose** the right one in a second
:::

## Two kinds of list

::: pair
- **ol: the numbered list**
  ```html
  <ol>
    <li>Wake up</li>
    <li>Study HTML</li>
    <li>Practice coding</li>
  </ol>
  ```
  For when **order matters**: steps, instructions, rankings.
- **ul: the bulleted list**
  ```html
  <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
  </ul>
  ```
  For when **order doesn't matter**: topics, ingredients, features.
:::

Here they are in the browser. Notice you never typed a single number or bullet:

```html preview
<ol>
  <li>Wake up</li>
  <li>Study HTML</li>
  <li>Practice coding</li>
</ol>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```

## The items: li

Every item, in either kind of list, is an `<li>`, short for *list item*. The list is the container; the items are what it holds.

::: anatomy How a list is built
- `<ol>` **The container.** Only `<li>` elements go directly inside it.
- `<li>Wake up</li>`<br>`<li>Study HTML</li>`<br>`<li>Practice coding</li>` **The items.** Each `<li>` can hold any content you like.
- `</ol>` **Closes the list.** The browser adds 1, 2, 3, and renumbers by itself when items change.
:::

Two rules keep every list valid:

::: tiles
- **li lives inside** an `<li>` belongs in an `<ol>` or a `<ul>`
- **Only li directly** anything else goes *inside* an `<li>`
:::

## Lists inside lists

An item can hold a whole new list. That's how outlines, sub-steps and dropdown menus are built.

```html preview
<ul>
  <li>Front end
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>Back end</li>
</ul>
```

The one thing to get right is *where* the inner list goes:

::: pair
- **Correct: inside the item**
  ```html
  <ul>
    <li>Front end
      <ul>…</ul>
    </li>
  </ul>
  ```
  The inner list belongs to the item it expands on.
- **Incorrect: loose in the list**
  ```html
  <ul>
    <li>Front end</li>
    <ul>…</ul>
  </ul>
  ```
  Only `<li>` may sit directly inside `<ul>`.
:::

The browser even changes the bullet style for each level, so the hierarchy shows up by itself.

## Changing how a numbered list counts

`<ol>` has three handy attributes:

::: tiles
- `start` begin from another number: `<ol start="3">`
- `reversed` count down instead of up
- `type` letters or Roman numerals: `A`, `a`, `I`, `i`
:::

```html preview
<ol start="3">
  <li>Third step</li>
  <li>Fourth step</li>
</ol>
<ol reversed>
  <li>Bronze</li>
  <li>Silver</li>
  <li>Gold</li>
</ol>
<ol type="A">
  <li>First option</li>
  <li>Second option</li>
</ol>
```

> [!NOTE]
> These attributes change what the numbering *means*. If you only want a different bullet shape for looks, that's done with CSS.

## Which list?

There's a one-second test:

::: idea
Imagine shuffling the items. If the meaning changes, use `ol`. If it doesn't, use `ul`.
:::

> [!PREDICT]- The steps for making a cup of tea: ol or ul?
> `ol`. Pouring the milk before boiling the water would be a very different cup of tea.

> [!PREDICT]- A list of fruits you like: ol or ul?
> `ul`. Shuffle them and nothing changes, unless it's a ranking of favourites, which would make it an `ol`.

## Recap

::: idea Chapter 4 in one breath
`ol` numbers, `ul` bullets, and both are filled with `li` items. Nested lists go inside an item, and the shuffle test picks the right one.
:::

> [!PREDICT]- Do you type the numbers in an ordered list yourself?
> No. The browser adds them, and renumbers when you add or remove an item.

> [!PREDICT]- Where does a nested list go?
> Inside the `<li>` it belongs to, never directly inside the outer `<ol>` or `<ul>`.

> [!PREDICT]- How would you make a list count down from 3 to 1?
> Add the `reversed` attribute: `<ol reversed>` with three `<li>` items.
