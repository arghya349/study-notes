---
summary: Ordered and unordered lists, the list items inside them, lists inside lists, and a simple test for choosing the right one.
---

# Lists

Lists are everywhere on the web: navigation menus, steps in a recipe, features of a product, search results. HTML has two kinds of list, and both are built from the same small parts.

## Ordered lists: ol

`<ol>` creates an **ordered list**. The browser numbers the items for you.

```html preview
<ol>
  <li>Wake up</li>
  <li>Study HTML</li>
  <li>Practice coding</li>
</ol>
```

Use an ordered list when **the sequence or ranking matters**: steps in a process, instructions, a top-ten.

## Unordered lists: ul

`<ul>` creates an **unordered list**, shown with bullets.

```html preview
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```

Use an unordered list when **order doesn't matter**: a collection of topics, ingredients, features.

## List items: li

Each item in either kind of list is an `<li>` element. The list element is the container; the `<li>` elements are what it contains.

<figure class="diagram">
<div class="scroll">
<svg viewBox="0 0 600 220" role="img" aria-label="An ol container holds three li items: Wake up, Study HTML and Practice coding. The browser draws the numbers 1, 2 and 3 beside them. The ol holds only li items; each li can hold any content.">
<rect class="dg-box" x="150" y="20" width="300" height="180" rx="18"/>
<text x="168" y="46" class="dg-mono dg-tag" style="font-size:13px">ol</text>
<rect class="dg-box-accent" x="196" y="62" width="240" height="34" rx="10"/>
<rect class="dg-box-accent" x="196" y="106" width="240" height="34" rx="10"/>
<rect class="dg-box-accent" x="196" y="150" width="240" height="34" rx="10"/>
<text x="176" y="84" class="dg-label">1.</text>
<text x="176" y="128" class="dg-label">2.</text>
<text x="176" y="172" class="dg-label">3.</text>
<text x="210" y="84" class="dg-mono dg-tag" style="font-size:12px">li</text>
<text x="210" y="128" class="dg-mono dg-tag" style="font-size:12px">li</text>
<text x="210" y="172" class="dg-mono dg-tag" style="font-size:12px">li</text>
<text x="236" y="84" class="dg-serif" style="font-size:16px">Wake up</text>
<text x="236" y="128" class="dg-serif" style="font-size:16px">Study HTML</text>
<text x="236" y="172" class="dg-serif" style="font-size:16px">Practice coding</text>
<path class="dg-line" d="M120 123H168"/>
<text x="112" y="117" text-anchor="end" class="dg-label">The browser</text>
<text x="112" y="135" text-anchor="end" class="dg-label">adds the numbers</text>
<path class="dg-line" d="M450 41H478"/>
<text x="486" y="37" class="dg-label"><tspan class="dg-strong">ol</tspan> holds only</text>
<text x="486" y="55" class="dg-label">li elements</text>
<path class="dg-line" d="M436 167H478"/>
<text x="486" y="163" class="dg-label"><tspan class="dg-strong">li</tspan> holds any</text>
<text x="486" y="181" class="dg-label">content</text>
</svg>
</div>
<figcaption>You write the items. The browser supplies numbers or bullets, and renumbers automatically when you add or remove one.</figcaption>
</figure>

Two rules keep lists valid:

1. **An `<li>` belongs inside an `<ol>` or a `<ul>`.** On its own it is not a list.
2. **Only `<li>` elements go directly inside `<ol>` and `<ul>`.** Any other content, including a heading or a paragraph, goes *inside* an `<li>`.

## Lists inside lists

A list item can contain a whole new list. This is how outlines, sub-steps and dropdown menus are built.

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

<figure class="diagram">
<div class="dg-grid cols-2">
<div class="dg-card is-right"><span class="dg-verdict">Correct</span><p>The inner list sits inside an <code>li</code>.</p><pre>&lt;ul&gt;
  &lt;li&gt;Front end
    <span class="dg-hl">&lt;ul&gt;…&lt;/ul&gt;</span>
  &lt;/li&gt;
&lt;/ul&gt;</pre></div>
<div class="dg-card is-wrong"><span class="dg-verdict">Incorrect</span><p>The inner list sits directly inside a <code>ul</code>.</p><pre>&lt;ul&gt;
  &lt;li&gt;Front end&lt;/li&gt;
  <span class="dg-hl">&lt;ul&gt;…&lt;/ul&gt;</span>
&lt;/ul&gt;</pre></div>
</div>
<figcaption>A nested list belongs to the item it expands on, so it goes inside that item.</figcaption>
</figure>

Browsers change the bullet style for each level of nesting automatically, so the hierarchy is visible without any extra work.

## Changing how an ordered list counts

`<ol>` accepts a few attributes that change its numbering:

| Attribute | Effect | Example |
|---|---|---|
| `start` | Begin counting from a number other than 1 | `<ol start="3">` |
| `reversed` | Count down instead of up (a boolean attribute) | `<ol reversed>` |
| `type` | Use letters or Roman numerals: `1`, `A`, `a`, `I` or `i` | `<ol type="A">` |

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
> These attributes change what the numbering *means*. If you only want a different bullet shape or number style for looks, that is done with CSS.

## Choosing the right list

<figure class="diagram">
<div class="dg-grid cols-2">
<div class="dg-card is-accent"><span class="dg-card-title">ol <span class="dg-card-role">order matters</span></span><p>Recipe steps, installation instructions, a ranking, a timeline.</p></div>
<div class="dg-card"><span class="dg-card-title">ul <span class="dg-card-role">order doesn't matter</span></span><p>A shopping list, a set of topics, product features, links in a menu.</p></div>
</div>
<figcaption>Both lists are made from li items. Only the container changes.</figcaption>
</figure>

> [!TIP] A quick test
> Imagine shuffling the items. If the meaning would change, use `<ol>`. If it wouldn't, use `<ul>`.

## Recap and practice

> [!SUMMARY] Chapter 4 in short
> - `<ol>` is an ordered list, numbered by the browser. Use it when order matters.
> - `<ul>` is an unordered list, shown with bullets. Use it when order doesn't matter.
> - `<li>` is one item, and it always lives inside `<ol>` or `<ul>`.
> - A nested list goes *inside* an `<li>`.
> - `start`, `reversed` and `type` change how an `<ol>` counts.

> [!QUESTION]- When should you choose `<ol>` instead of `<ul>`?
> When the order or ranking of the items carries meaning, such as steps in a process. If the items could be shuffled without changing the meaning, use `<ul>`.

> [!QUESTION]- Where does a nested list go?
> Inside the `<li>` it belongs to, not directly inside the outer `<ol>` or `<ul>`.

> [!QUESTION]- Do you type the numbers in an ordered list yourself?
> No. The browser adds them, and renumbers automatically when items are added or removed.

> [!QUESTION]- How would you make a list count down from 3 to 1?
> Add the boolean `reversed` attribute: `<ol reversed>` with three `<li>` items.
