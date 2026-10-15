---
summary: The rules of the game, before the first move. What a C++ program looks like, how an instruction is written, and how the computer follows it.
---

# Before We Begin C++

Every game is easier once you know the rules. Before we touch data types or algorithms, let's learn the rules of C++: what a program looks like, how you write an instruction, and how the computer follows it. No history lesson, no heavy theory. Just enough to read your first programs with confidence.

<figure class="sketch">
<svg viewBox="0 0 420 240" aria-hidden="true">
<g class="washes">
<path class="w-ochre" d="M90 178h48v28H90zM186 178h48v28h-48zM282 178h48v28h-48zM138 206h48v28h-48zM234 206h48v28h-48z"/>
<path class="w-blue" d="M222 160C230 130 238 104 226 78L230 60L218 70C204 68 190 74 180 86L162 104C156 112 160 121 170 120C180 119 188 114 194 116C186 130 176 146 178 160ZM160 178q2-16 16-18h48q14 2 16 18z"/>
<path class="w-red" d="M296 204q2-12 10-14q8 2 10 14zM300 184a6 6 0 1 0 12 0a6 6 0 1 0-12 0z"/>
</g>
<g class="ink">
<rect x="90" y="178" width="240" height="56" rx="2"/>
<path class="thin" d="M138 178v56M186 178v56M234 178v56M282 178v56M90 206h240"/>
<path d="M160 178q2-16 16-18h48q14 2 16 18M172 160h56"/>
<path d="M222 160C230 130 238 104 226 78L230 60L218 70C204 68 190 74 180 86L162 104C156 112 160 121 170 120C180 119 188 114 194 116C186 130 176 146 178 160"/>
<circle class="solid" cx="201" cy="88" r="3"/>
<circle class="solid" cx="167" cy="112" r="1.8"/>
<path d="M228 86q10 10 6 22M232 106q8 10 4 22M232 128q6 10 2 20"/>
<path class="thin" d="M213 101l10-6M212 113l12-7M211 125l13-7M210 137l14-7M210 149l14-7"/>
<circle cx="306" cy="184" r="6"/>
<path d="M296 204q2-12 10-14q8 2 10 14"/>
<path class="dash" d="M252 92c30-22 72-14 84 18"/>
<path d="M336 110l-11-1M336 110l1-11"/>
<path class="thin" d="M74 70v16M66 78h16M356 36v12M350 42h12M54 150v10M49 155h10"/>
</g>

</svg>
<figcaption>Learn the pieces and the board first. Strategy comes later.</figcaption>
</figure>

::: tiles By the end of this chapter you can
- **Read** the shape of any beginner C++ program
- **Spot** statements and blocks at a glance
- **Predict** exactly what a program prints
- **Explain** what write, compile and run mean
:::

## What programming really is

You know that 12 + 7 is 19 without even thinking. A computer doesn't know what you *want*. It only does what it's told: precisely, literally, and incredibly fast.

<figure class="sketch">
<svg viewBox="0 0 420 220" aria-hidden="true">
<g class="washes">
<path class="w-paper" d="M30 28h142v168H30z" transform="rotate(-4 100 112)"/>
<path class="w-grey" d="M272 40h128v96H272z"/>
<path class="w-sky" d="M284 52h104v72H284z"/>
<path class="w-ochre" d="M292 168h88v12h-88z"/>
</g>
<g class="ink">
<g transform="rotate(-4 100 112)"><rect x="30" y="28" width="142" height="168" rx="12"/><circle class="solid" cx="101" cy="40" r="3"/></g>
<path d="M192 112c26-14 48-14 68-2"/>
<path d="M262 111l-10-6M262 111l-11 3"/>
<rect x="272" y="40" width="128" height="96" rx="14"/>
<rect x="284" y="52" width="104" height="72" rx="7"/>
<path d="M324 136l-6 24h40l-6-24"/>
<rect x="292" y="168" width="88" height="12" rx="3"/>
<path class="thin" d="M300 174h5M311 174h5M322 174h5M333 174h5M344 174h5M355 174h5M366 174h5"/>
</g>
<g transform="rotate(-4 100 112)">
<text class="t-hand" x="48" y="74">1. take 12</text>
<text class="t-hand" x="48" y="106">2. take 7</text>
<text class="t-hand" x="48" y="138">3. add them</text>
<text class="t-hand" x="48" y="170">4. show it</text>
</g>
<text class="t-num" x="336" y="104" text-anchor="middle" style="font-size:40px">19</text>
</svg>
<figcaption>A program is a recipe the computer follows exactly, one step at a time.</figcaption>
</figure>

::: idea
A program is a list of instructions, written in a language the computer can follow.
:::

Here's our little sum, written in C++:

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << 12 + 7;
    return 0;
}
```

```output
19
```

Six lines just to add two numbers? Don't worry. Most of it is a frame that almost every program shares, and in the next section you'll learn to see straight through it.

## The shape of every program

Nearly every program you write at the start sits inside the same frame. Learn to recognise it once and you'll spot it everywhere.

```cpp
#include <iostream>
using namespace std;

int main() {
    // your instructions go here

    return 0;
}
```

Here's what each line is for:

::: anatomy
- `#include <iostream>` **Brings in the toolbox** for input and output, so we can use `cout` and `cin`.
- `using namespace std;` **Lets us use short names**, like `cout` instead of `std::cout`.
- `int main() {` **The front door.** Your program starts running here.
- `// your instructions go here` **Where the work happens**, one instruction at a time.
- `return 0;` **Says "finished, all good"** to whatever started the program.
- `}` **Closes the block** that `{` opened.
:::

Look closely and you'll notice the lines aren't all doing the same kind of job:

::: tiles Three kinds of job
- **Prepare** `#include` and `using` set things up before anything runs
- **Start** `main()` marks where running begins
- **Act** statements like `cout` do the actual work
:::

> [!NOTE] Small print, for later
> - In bigger programs you'll often see `std::cout` written out in full instead of `using namespace std;`.
> - Why `main` is written `int main()` gets its own chapter.
> - `return 0;` is optional at the end of `main()`: reaching the closing `}` also counts as success. We'll still write it, because you'll see it everywhere.

## One instruction at a time

The computer reads your instructions **from top to bottom, one at a time**, the way you'd follow a recipe. Let's run two lines in slow motion and watch the screen:

::: trace Watch the screen
- `cout << 12;` → `12` 12 appears, and the cursor waits right after it.
- `cout << 7;` → `127` 7 is printed exactly where the cursor was waiting.
:::

Were you expecting `12` and `7` on separate lines? The computer never starts a new line on its own. If you want one, you have to ask for it, with `'\n'`:

::: trace Now with line breaks
- `cout << 12 << '\n';` → `12⏎` After 12, the cursor drops to the next line.
- `cout << 7 << '\n';` → `12⏎7⏎` So 7 lands on a line of its own.
:::

> [!REMEMBER] Game rule
> The computer never guesses how you want things to look. No `'\n'`, no new line.

> [!PREDICT]- What does `cout << 1 << 2 << '\n' << 3;` print?
> ```output
> 12
> 3
> ```
> `1` and `2` are printed side by side, `'\n'` starts a new line, and then `3` appears on it.

## The semicolon is a full stop

In English, a full stop ends a sentence. In C++, a **semicolon ends an instruction**. Each instruction is called a **statement**.

```cpp
cout << 12 + 7;
```

::: pair
- **Every statement ends with `;`**
  ```cpp
  int age = 20;
  cout << age;
  return 0;
  ```
- **One is missing, and nothing runs**
  ```cpp
  int age = 20
  cout << age;
  ```
  The compiler stops with an error, so the program never gets to run.
:::

But not every line gets a semicolon. There are just two shapes to recognise:

::: tiles Two shapes
- **Statement** one instruction, finished with `;`
- **Block** a group of statements wrapped in `{ }`
:::

That's why `int main() {` has no semicolon: it opens a **block**. The statements *inside* the block are the ones that end with `;`.

> [!TIP]
> Don't memorise exceptions. Just ask: is this **one instruction** (it ends with `;`), or a **container of instructions** (it's wrapped in `{ }`)?

## Spaces are for humans

The compiler doesn't care about extra spaces or line breaks between the pieces of your code. These two do exactly the same thing:

::: pair
- **Easy to read**
  ```cpp
  cout << 12 + 7;
  ```
- **Same result, harder to read**
  ```cpp
  cout
      <<
      12
      +
      7;
  ```
:::

Both print `19`. The computer needs correct **grammar**; people need **readable** code. So we space and indent for whoever reads it next, which is very often future you.

### Comments

A comment is a note for people. The compiler skips it completely.

```cpp
// A one-line comment: everything after // is ignored
cout << 19;

/*
   A comment that
   spans several lines
*/
```

> [!WARNING]
> A comment can explain code, but it can't fix it.

## Write, compile, run

Before you see a single result, your code goes through three stages. Think of writing a letter, having a very strict proofreader check it, and then sending it off.

<figure class="sketch">
<svg viewBox="0 0 460 214" aria-hidden="true">
<g class="washes">
<path class="w-paper" d="M34 50h84v110H34z" transform="rotate(-5 76 105)"/>
<path class="w-blue" d="M100 156l6-14 34-48 8 6-34 48z"/>
<path class="w-paper" d="M200 56h70v92h-70z"/>
<circle class="w-sky" cx="250" cy="96" r="24"/>
<path class="w-red" d="M358 176V84q0-30 26-30t26 30v92z"/>
<path class="w-grey" d="M350 176h68v10h-68z"/>
</g>
<g class="ink">
<g transform="rotate(-5 76 105)"><rect x="34" y="50" width="84" height="110" rx="4"/><path class="thin" d="M46 74h56M46 88h50M46 102h58M46 116h40M46 130h52"/></g>
<path d="M100 156l6-14 34-48 8 6-34 48z"/>
<path d="M100 156l1-9 5 3z"/>
<path class="dash" d="M154 112h32"/><path d="M194 112l-10-5M194 112l-10 5"/>
<rect x="200" y="56" width="70" height="92" rx="4"/>
<path class="thin" d="M210 72h46M210 84h40M210 96h48M210 108h30"/>
<path d="M212 124l8 8 16-20" style="stroke:#B5483A"/>
<circle cx="250" cy="96" r="26"/>
<path class="thick" d="M268 116l22 24"/>
<path class="dash" d="M300 112h32"/><path d="M340 112l-10-5M340 112l-10 5"/>
<path d="M358 176V84q0-30 26-30t26 30v92"/>
<path d="M354 84h60"/>
<path class="thick" d="M372 104h24"/>
<rect x="350" y="176" width="68" height="10" rx="2"/>
<circle class="thin" cx="384" cy="132" r="7"/>
</g>
<text class="t-hand" x="80" y="200" text-anchor="middle">write</text>
<text class="t-hand" x="245" y="200" text-anchor="middle">compile</text>
<text class="t-hand" x="384" y="206" text-anchor="middle">run</text>
</svg>
<figcaption>Write the letter, let a strict proofreader check it, then send it off.</figcaption>
</figure>

::: flow
1. **Write** You type instructions into a `.cpp` file. This is your *source code*.
2. **Compile** The compiler checks your grammar and translates the code into something the computer can run. A grammar mistake, like a missing `;`, stops everything here.
3. **Run** The computer follows the instructions, top to bottom, and you see the output.
:::

Two very different kinds of mistake can catch you:

::: pair
- **Compile error**

  The grammar is wrong, say a missing `;`. The program never runs, and the compiler points you roughly to the problem.
- **Logic error**

  The grammar is fine, so the program runs happily… and gives the wrong answer. Nothing warns you. Only checking the output catches it.
:::

> [!REMEMBER]
> Compile errors shout, which makes them the friendly kind. Logic errors whisper.

## Input, processing, output

Most simple programs follow the same three-beat rhythm:

::: flow
1. **Input** Take something in: `cin >> a >> b;`
2. **Processing** Work on it: `a + b`
3. **Output** Show the result: `cout << a + b;`
:::

Here are all three beats in one tiny program:

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;

    cin >> a >> b;     // input: read two numbers
    cout << a + b;     // processing and output

    return 0;
}
```

If you type this:

```input
12 7
```

the program reads `12` into `a` and `7` into `b`, adds them, and shows:

```output
19
```

You don't need to understand variables yet. Just learn to recognise these five symbols:

::: tiles Five symbols to recognise
- `cin` takes input from the keyboard
- `>>` moves that input into a variable
- `cout` shows output on the screen
- `<<` sends something to the screen
- `+` adds two numbers
:::

> [!REMEMBER] Follow the arrows
> The arrows point the way the data flows. `cin >> a` moves data **into** `a`. `cout << a` sends `a` **out** to the screen.

## What to learn now, and what can wait

::: tiles Learn now
- **Instructions** a program is a list of them
- `main()` where running starts
- `{ }` wraps a block
- `;` ends a statement
- `cin` `cout` input and output, together
- `//` a note for humans
:::

> [!NOTE] Parked for later
> - The full meaning of `int main()`
> - How variables live in memory
> - Why types come in different sizes
> - Operator precedence and integer overflow
> - Functions, scope and return values
> - What the compiler does in detail
>
> None of these are unimportant. They're simply much easier once the basics above feel natural.

## Your first prediction

Read this program slowly:

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << 5;
    cout << 8;
    return 0;
}
```

What appears on the screen: `13`, `58`, or `5` and `8` on separate lines? Say your answer out loud, and *why*, before you reveal it.

> [!PREDICT]- So, what does it print?
> ```output
> 58
> ```
> - **Not `13`.** There's no `+`, so nothing is added. Each `cout` shows its number exactly as written.
> - **Not two lines.** Neither statement prints `'\n'`, so `8` appears right where `5` stopped.
>
> To get two lines you'd write `cout << 5 << '\n';` and `cout << 8 << '\n';`.

> [!TIP] The habit that matters most
> Always **predict first, then run**. Guessing what code will do before you see it is the fastest way to truly understand it, and it's the skill every chapter of DSA builds on.

## Recap

::: idea Chapter 0 in one breath
A program is a list of instructions. It starts in `main()`, statements end with `;`, blocks live in `{ }`, and nothing happens on screen unless you ask for it.
:::

> [!PREDICT]- What is `#include <iostream>` for?
> It brings in the input and output tools, so we can use `cout` and `cin`.

> [!PREDICT]- What does `cout << 3 << '\n' << 4;` print?
> `3` on the first line and `4` on the second, because `'\n'` sits between them.

> [!PREDICT]- Why is there no semicolon after `int main() {`?
> Because it opens a **block**. Semicolons end statements; the statements inside the block are the ones that get them.

> [!PREDICT]- The program runs, but the total it prints is wrong. Compile error or logic error?
> A logic error. The grammar was fine, so it compiled and ran. The instructions just didn't do what you meant.
