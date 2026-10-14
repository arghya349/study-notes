---
summary: How pages collect information. The form element, labels that connect to their fields, every input type in the course, and why radio buttons share a name.
---

# Forms

Sign-up pages, search bars, quizzes, checkout screens: whenever a page asks you for something, it uses a form. This chapter builds forms from the ground up and explains how each piece connects to the next.

> [!NOTE]
> These notes focus on the **front-end structure** of forms: the parts people see and fill in. Sending the answers somewhere, using the `action` and `method` attributes and a server, comes later in a web developer's journey.

## The form element

`<form>` groups the controls that collect information from someone.

```html
<form>
  <!-- labels, inputs and other controls go here -->
</form>
```

A form on its own draws nothing on the page. It is an invisible container; the visible parts are the controls you put inside it.

## Labels: label and for

Every field needs a visible description that says what to type. That is the job of `<label>`.

```html preview
<label for="name">Name</label>
<input type="text" id="name">
```

The connection works like this:

<figure class="diagram">
<div class="scroll">
<svg viewBox="0 0 640 150" role="img" aria-label="label for equals email, and input id equals email. The two values match, so the label is linked to the input. Clicking the word Email on the page puts the cursor in the email box.">
<rect class="dg-box-accent" x="139" y="37" width="73" height="27" rx="7"/>
<rect class="dg-box-accent" x="129.5" y="85" width="73" height="27" rx="7"/>
<path class="dg-accent-line" d="M175.5 64 166 85"/>
<circle class="dg-dot" cx="175.5" cy="64" r="2.5"/>
<circle class="dg-dot" cx="166" cy="85" r="2.5"/>
<text x="226" y="80" class="dg-small dg-accent">same value, so they are linked</text>
<text x="36" y="56" class="dg-mono" style="font-size:16px" textLength="307.2" lengthAdjust="spacing"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">label</tspan> <tspan class="dg-attr">for</tspan><tspan class="dg-punct">=</tspan><tspan class="dg-value">"email"</tspan><tspan class="dg-punct">&gt;</tspan>Email<tspan class="dg-punct">&lt;/</tspan><tspan class="dg-tag">label</tspan><tspan class="dg-punct">&gt;</tspan></text>
<text x="36" y="104" class="dg-mono" style="font-size:16px" textLength="297.6" lengthAdjust="spacing"><tspan class="dg-punct">&lt;</tspan><tspan class="dg-tag">input</tspan> <tspan class="dg-attr">id</tspan><tspan class="dg-punct">=</tspan><tspan class="dg-value">"email"</tspan> <tspan class="dg-attr">type</tspan><tspan class="dg-punct">=</tspan><tspan class="dg-value">"email"</tspan><tspan class="dg-punct">&gt;</tspan></text>
<path class="dg-ink" d="M406 82h12"/>
<path class="dg-arrow" d="M424 82l-7-4v8z"/>
<text x="434" y="50" class="dg-text">Email</text>
<rect class="dg-ring" x="430" y="62" width="184" height="42" rx="12"/>
<rect class="dg-focus" x="432" y="64" width="180" height="38" rx="10"/>
<path class="dg-caret" d="M445 75v16"/>
<path class="dg-cursor" d="M470 33v17l4.5-4 3.2 7 2.6-1.2-3.1-6.8h6z"/>
<text x="522" y="134" text-anchor="middle" class="dg-small">Clicking the label focuses the box</text>
</svg>
</div>
<figcaption>The label's for and the input's id hold the same value. That shared value is the link between them.</figcaption>
</figure>

- `for="email"` on the label names the input it describes.
- `id="email"` on the input gives it that name. An id must be unique on the page (Chapter 7 explains why).
- Because the values match, **clicking the label focuses the field**. For checkboxes and radio buttons it ticks them, which gives people a much bigger target to hit.
- Screen readers announce the label when someone reaches the field, so they know what to type.

You can also link a label by **wrapping** the input inside it. No `for` or `id` is needed then:

```html
<label><input type="checkbox"> Remember me</label>
```

## The input element

`<input>` creates a control for someone to type into, tick, slide or pick from. It is a **void element**, and its `type` attribute decides which control appears.

| `type` | Creates | Good for |
|---|---|---|
| `text` | A single-line text box | Names, short answers |
| `email` | A text box for email addresses | Sign-ups, contact forms |
| `password` | A text box that hides what you type | Log-ins |
| `checkbox` | A box that can be ticked on or off | Agreements, multiple choices |
| `radio` | One choice from a group | Single-choice questions |
| `file` | A file picker | Uploading a photo or document |
| `range` | A slider | Volume, ratings, approximate values |
| `date` | A date picker | Birthdays, bookings |
| `color` | A colour picker | Choosing a theme colour |

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

- **`text`** is the standard field for short text.
- **`email`** is designed for email addresses. On phones it brings up a keyboard with an @ key, and browsers check the *format* when the form is sent. It cannot check that the address actually exists.
- **`password`** shows dots instead of the characters typed.

> [!WARNING]
> A password field hides characters from people looking at the screen. That is a visual privacy feature, **not encryption**. Keeping passwords safe in transit and in storage is the job of HTTPS and the server.

### Checkbox

A checkbox is an **independent on/off choice**. Any number of checkboxes can be ticked at the same time. Add the boolean `checked` attribute to tick one in advance.

```html preview
<input type="checkbox" id="terms">
<label for="terms">I agree to the terms</label>
<br>
<input type="checkbox" id="newsletter" checked>
<label for="newsletter">Send me the weekly newsletter</label>
```

### Radio buttons

Radio buttons offer **one choice from a group**. Selecting one releases whichever was selected before, like the preset buttons on an old car radio that gave them their name.

```html preview
<p>Choose one option:</p>
<input type="radio" id="male" name="gender" value="male">
<label for="male">Male</label>
<input type="radio" id="female" name="gender" value="female">
<label for="female">Female</label>
<input type="radio" id="other" name="gender" value="other">
<label for="other">Other</label>
```

## The name attribute

`name` does two jobs:

1. **It labels the data that gets sent.** When a form is submitted, each answer travels as a `name=value` pair, such as `gender=female`. A field without a name is not sent at all.
2. **For radio buttons, it forms the group.** All the options in one group share the same `name`, and that is how the browser knows only one of them may be on.

<figure class="diagram">
<div class="scroll">
<svg viewBox="0 0 620 196" role="img" aria-label="Left: three radios share name equals gender, so only Female is selected. Right: each radio has a different name, so all three are selected at once and none can be unselected.">
<text x="30" y="22" class="dg-label dg-strong dg-good">Same name: one choice</text>
<rect class="dg-line dg-dash" x="30" y="38" width="250" height="140" rx="16"/>
<text x="48" y="62" class="dg-mono" style="font-size:12px"><tspan class="dg-attr">name</tspan><tspan class="dg-punct">=</tspan><tspan class="dg-value">"gender"</tspan></text>
<circle class="dg-radio" cx="58" cy="94" r="8"/>
<circle class="dg-radio-on" cx="58" cy="124" r="8"/>
<circle class="dg-dot" cx="58" cy="124" r="4"/>
<circle class="dg-radio" cx="58" cy="154" r="8"/>
<text x="76" y="99" class="dg-text">Male</text>
<text x="76" y="129" class="dg-text">Female</text>
<text x="76" y="159" class="dg-text">Other</text>
<text x="340" y="22" class="dg-label dg-strong dg-bad">Different names: no group</text>
<circle class="dg-radio-on" cx="358" cy="94" r="8"/>
<circle class="dg-dot" cx="358" cy="94" r="4"/>
<circle class="dg-radio-on" cx="358" cy="124" r="8"/>
<circle class="dg-dot" cx="358" cy="124" r="4"/>
<circle class="dg-radio-on" cx="358" cy="154" r="8"/>
<circle class="dg-dot" cx="358" cy="154" r="4"/>
<text x="376" y="99" class="dg-text">Male</text>
<text x="376" y="129" class="dg-text">Female</text>
<text x="376" y="159" class="dg-text">Other</text>
<text x="470" y="98" class="dg-mono" style="font-size:12px"><tspan class="dg-attr">name</tspan><tspan class="dg-punct">=</tspan><tspan class="dg-value">"a"</tspan></text>
<text x="470" y="128" class="dg-mono" style="font-size:12px"><tspan class="dg-attr">name</tspan><tspan class="dg-punct">=</tspan><tspan class="dg-value">"b"</tspan></text>
<text x="470" y="158" class="dg-mono" style="font-size:12px"><tspan class="dg-attr">name</tspan><tspan class="dg-punct">=</tspan><tspan class="dg-value">"c"</tspan></text>
</svg>
</div>
<figcaption>Radios with one shared name behave as one question. Give each a different name and every button becomes its own question that can never be switched off.</figcaption>
</figure>

> [!REMEMBER]
> **Same `name`** for choices that exclude each other. **Different `name`s** for separate questions. And give every radio a `value`: it is what gets sent. Without one, the browser sends the unhelpful word `on`.

Try both versions. In the second, every option can be selected and none can be cleared:

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

## More input types

### File

```html preview
<label for="upload">Choose a file</label>
<input type="file" id="upload">
```

Lets someone pick a file from their device. The optional `accept` attribute narrows the choice, for example `accept="image/*"` for images only. Actually uploading the file needs a server, beyond this HTML field.

### Range

```html preview
<label for="volume">Volume</label>
<input type="range" id="volume" min="0" max="100" value="50">
```

Shows a slider. `min` and `max` set the ends of the scale (0 and 100 by default), and `value` sets where the handle starts. Use a range when an approximate value is fine; for an exact number, a typed field is kinder.

### Date

```html preview
<label for="exam-date">Exam date</label>
<input type="date" id="exam-date">
```

Gives a date picker. Its exact appearance depends on the browser and the operating system, but the value it produces is always written year, month, day, as in `2026-03-14`.

### Color

```html preview
<label for="theme">Choose a colour</label>
<input type="color" id="theme" value="#2b4a72">
```

Opens a colour picker. Its value is a hex colour code such as `#2b4a72`.

## Placeholder is not a label

The `placeholder` attribute shows hint text inside an empty field:

```html preview
<label for="city">City</label>
<input type="text" id="city" placeholder="For example, Kolkata">
```

> [!WARNING]
> A placeholder disappears as soon as someone starts typing, so they can no longer check what the field was for. It is also often too faint to read comfortably. Use it for an *example* of the answer, and always keep a real `<label>`.

## A complete form

Everything in this chapter, working together:

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

Two things to notice:

- The `<button type="submit">` at the end sends the form. It is not in the original lecture, but almost every real form needs one. (Sending is switched off inside these preview windows.)
- The `<br>` tags match the simple style of the course. In a polished interface, CSS handles this spacing instead.

## Recap and practice

> [!SUMMARY] Chapter 6 in short
> - `<form>` groups the controls that collect input. It is invisible on its own.
> - `<label>` describes a field. Its `for` matches the input's `id`.
> - `<input>` is a void element; `type` chooses the control.
> - `name` labels each answer when it is sent, and groups radio buttons.
> - Checkboxes are independent; radios with a shared name allow one choice.
> - A placeholder is a hint, never a replacement for a label.

| Term | In a word |
|---|---|
| `form` | groups the controls |
| `label` | describes a field |
| `for` | points a label at an input's `id` |
| `input` | creates a control |
| `type` | chooses which control |
| `name` | names the data, groups radios |
| `placeholder` | example text inside a field |
| `checkbox` | independent on/off |
| `radio` | one choice from a group |
| `file`, `range`, `date`, `color` | file picker, slider, date picker, colour picker |

> [!QUESTION]- Why should a label's `for` match an input's `id`?
> The matching value links them. Clicking the label then focuses or ticks the input, and screen readers announce the label when the field is reached.

> [!QUESTION]- Why do radio buttons in one group share the same `name`?
> The shared name is what makes them one group, so the browser allows only one of them to be selected. It is also the name the chosen value is sent under.

> [!QUESTION]- What is the difference between a checkbox and a radio button?
> Checkboxes are independent: any number can be on. Radio buttons in a group are mutually exclusive: choosing one turns the others off.

> [!QUESTION]- Does `type="password"` keep a password secure?
> No. It only hides the characters on screen. Security comes from HTTPS and how the server handles the data.

> [!QUESTION]- Why is a placeholder not a substitute for a label?
> It disappears once someone starts typing, so they lose the description of the field, and it is often too faint to read.
