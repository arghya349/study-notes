---
summary: How a page asks you things. The form container, labels that connect to their fields, nine input types, and why radio buttons share a name.
---

# Forms

Every time a page asks you something, your name, a search, a quiz answer, it's using a form. Forms can look busy, but they're made from a handful of simple pieces that click together. Let's build one, piece by piece.

<figure class="doodle">
<svg viewBox="0 0 400 230" aria-hidden="true">
<rect x="112" y="14" width="176" height="204" rx="14"/>
<path d="M134 42h44M134 104h56"/>
<rect x="134" y="52" width="132" height="26" rx="7"/>
<rect x="134" y="114" width="132" height="26" rx="7"/>
<path d="M144 59v12"/>
<rect x="134" y="156" width="14" height="14" rx="3"/>
<path d="M137 163l3.5 3.5 6-8"/>
<path d="M158 163h58"/>
<circle cx="141" cy="196" r="7"/>
<circle class="fill" cx="141" cy="196" r="3"/>
<circle cx="175" cy="196" r="7"/>
<rect class="fill soft" x="212" y="184" width="54" height="24" rx="12"/>
</svg>
<figcaption>Labels, boxes, ticks and choices: every form is made of the same few pieces.</figcaption>
</figure>

::: tiles By the end of this chapter you can
- **Build** a form from scratch
- **Connect** a label to its field
- **Use** nine kinds of input
- **Group** radio buttons with name
:::

> [!NOTE]
> These notes cover the **front end** of forms: the parts people see and fill in. Actually *sending* the answers somewhere, with the `action` and `method` attributes and a server, comes later in your journey.

## The form element

`<form>` is the container that holds all the fields:

```html
<form>
  <!-- labels, inputs and buttons go in here -->
</form>
```

On its own it draws nothing at all. It's an invisible box; the visible parts are the fields you put inside.

## Labels: naming each field

Every field needs words that say what to type. That's the job of `<label>`:

```html preview
<label for="name">Name</label>
<input type="text" id="name">
```

Try clicking the word **Name** in the result: the cursor jumps into the box. Here's how that connection works:

::: anatomy
- `<label for="name">Name</label>` **The label** points at a field, with `for="name"`.
- `<input type="text" id="name">` **The field** carries that same name, in `id="name"`.
:::

::: idea
Same value in `for` and `id`, and the two are linked.
:::

::: tiles Why it's worth it
- **Bigger target** clicking the words focuses or ticks the field
- **Heard** screen readers announce the label for the field
- **Clear** nobody has to guess what goes where
:::

You can also link them by **wrapping** the field inside the label. Then no `for` or `id` is needed:

```html
<label><input type="checkbox"> Remember me</label>
```

## The input element

`<input>` creates a field. It's a **void element**, and its `type` attribute decides which kind you get:

::: tiles Nine types of input
- `text` short answers, names
- `email` email addresses
- `password` hides what you type
- `checkbox` an independent tick
- `radio` one choice from a group
- `file` pick a file
- `range` a slider
- `date` a date picker
- `color` a colour picker
:::

### Text, email and password

```html preview
<label for="full-name">Name</label>
<input type="text" id="full-name">
<br><br>
<label for="user-email">Email</label>
<input type="email" id="user-email">
<br><br>
<label for="user-password">Password</label>
<input type="password" id="user-password">
```

::: tiles
- `email` brings an @ key on phones and checks the *format*, not whether the address exists
- `password` shows dots instead of letters
:::

> [!WARNING]
> A password field hides letters from people looking over your shoulder. That's privacy, **not encryption**. Keeping passwords safe is the job of HTTPS and the server.

### Checkbox: tick as many as you like

```html preview
<input type="checkbox" id="terms">
<label for="terms">I agree to the terms</label>
<br>
<input type="checkbox" id="newsletter" checked>
<label for="newsletter">Send me the weekly newsletter</label>
```

Each checkbox is its own on/off switch. The `checked` attribute ticks one in advance.

### Radio buttons: pick exactly one

```html preview
<p>Choose one option:</p>
<input type="radio" id="male" name="gender" value="male">
<label for="male">Male</label>
<input type="radio" id="female" name="gender" value="female">
<label for="female">Female</label>
<input type="radio" id="other" name="gender" value="other">
<label for="other">Other</label>
```

Choose one and the previous choice switches off, like the preset buttons on an old car radio that gave them their name.

## The name attribute

`name` has two jobs:

::: tiles
- **Labels the answer** each answer is sent as `name=value`, like `gender=female`
- **Groups radios** radios that share a name allow only one choice
:::

Here's what goes wrong without a shared name:

::: pair
- **Same name: one choice**
  ```html
  <input type="radio" name="gender"> Male
  <input type="radio" name="gender"> Female
  <input type="radio" name="gender"> Other
  ```
  Pick one and the others switch off.
- **Different names: no group**
  ```html
  <input type="radio" name="a"> Male
  <input type="radio" name="b"> Female
  <input type="radio" name="c"> Other
  ```
  Every button can be on at once, and none can be switched off.
:::

Try both. In the second group, every option sticks:

```html preview
<p><strong>Shared name</strong></p>
<input type="radio" id="a1" name="size"> <label for="a1">Small</label>
<input type="radio" id="a2" name="size"> <label for="a2">Medium</label>
<input type="radio" id="a3" name="size"> <label for="a3">Large</label>
<p><strong>Different names</strong></p>
<input type="radio" id="b1" name="small"> <label for="b1">Small</label>
<input type="radio" id="b2" name="medium"> <label for="b2">Medium</label>
<input type="radio" id="b3" name="large"> <label for="b3">Large</label>
```

> [!REMEMBER]
> **Same name** for choices that exclude each other; **different names** for separate questions. And give every radio a `value`: it's what gets sent. Without one, the browser sends the unhelpful word `on`.

> [!PREDICT]- A quiz has two questions, each with three radio options. How many different names do you need?
> Two: one shared name per question. All three options of question 1 share one name; all three of question 2 share another.

## Four more types

```html preview
<label for="upload">Choose a file</label>
<input type="file" id="upload">
<br><br>
<label for="volume">Volume</label>
<input type="range" id="volume" min="0" max="100" value="50">
<br><br>
<label for="exam-date">Exam date</label>
<input type="date" id="exam-date">
<br><br>
<label for="theme">Choose a colour</label>
<input type="color" id="theme" value="#2b4a72">
```

::: tiles
- `file` add `accept="image/*"` to allow images only; uploading needs a server
- `range` `min` and `max` set the ends, `value` sets the start
- `date` looks different per browser, but the value is always year-month-day
- `color` gives a hex code like `#2b4a72`
:::

## Placeholder is not a label

`placeholder` shows a faint hint inside an empty field:

```html preview
<label for="city">City</label>
<input type="text" id="city" placeholder="For example, Kolkata">
```

> [!WARNING]
> The hint vanishes as soon as someone types, so they lose track of what the field was for, and it's often too faint to read. Use it for an *example* answer, and always keep a real `<label>`.

## A complete form

Everything from this chapter, working together:

```html preview
<form>
  <label for="f-name">Name</label>
  <input type="text" id="f-name" name="name" placeholder="Your full name">
  <br><br>

  <label for="f-email">Email</label>
  <input type="email" id="f-email" name="email">
  <br><br>

  <label for="f-password">Password</label>
  <input type="password" id="f-password" name="password">
  <br><br>

  <input type="checkbox" id="f-terms" name="terms">
  <label for="f-terms">I agree to the terms</label>
  <br><br>

  <p>Choose one option:</p>
  <input type="radio" id="f-male" name="gender" value="male">
  <label for="f-male">Male</label>
  <input type="radio" id="f-female" name="gender" value="female">
  <label for="f-female">Female</label>
  <input type="radio" id="f-other" name="gender" value="other">
  <label for="f-other">Other</label>
  <br><br>

  <label for="f-file">File</label>
  <input type="file" id="f-file" name="file">
  <br><br>

  <label for="f-range">Range</label>
  <input type="range" id="f-range" name="range" min="0" max="100" value="50">
  <br><br>

  <label for="f-date">Date</label>
  <input type="date" id="f-date" name="date">
  <br><br>

  <label for="f-color">Colour</label>
  <input type="color" id="f-color" name="color">
  <br><br>

  <button type="submit">Send</button>
</form>
```

::: tiles Two things to notice
- `button` almost every real form needs a send button (it's switched off in these previews)
- `br` matches the simple course style; real designs space things with CSS
:::

## Recap

::: idea Chapter 6 in one breath
A form holds fields; each field gets a label linked by matching `for` and `id`; `type` picks the field; and radios that share a `name` become one question.
:::

> [!PREDICT]- Why should a label's `for` match an input's `id`?
> The matching value links them: clicking the label focuses the field, and screen readers announce it.

> [!PREDICT]- Checkbox or radio for "Which toppings do you want?"
> Checkbox. You can want several toppings at once. Radios are for exactly one choice.

> [!PREDICT]- Does `type="password"` keep a password secure?
> No. It only hides the letters on screen. Real security comes from HTTPS and the server.
