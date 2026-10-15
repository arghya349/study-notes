---
summary: How a program remembers. Variables as labelled jars, values that change, types that don't, and the eight types you'll meet most.
---

# Variables, Values and Data Types

Programs need to remember things: a score, a name, whether you passed. This chapter is about how C++ remembers. By the end, you'll read a line like `int marks = 85;` and know exactly what it does, why it's written that way, and what happens to it as the program runs.

<figure class="sketch">
<svg viewBox="0 0 460 262" aria-hidden="true">
<g class="washes">
<path class="w-sky" d="M66 134q-6 2-6 12v58q0 12 14 12h68q14 0 14-12v-58q0-10-6-12z"/>
<path class="w-orange" d="M62 150h96v52q0 12-14 12h-68q-14 0-14-12z"/>
<path class="w-blue" d="M202 134h48v68q0 12-14 12h-20q-14 0-14-12z"/>
<path class="w-green" d="M302 166h52v36q0 12-12 12h-28q-12 0-12-12z"/>
<path class="w-red" d="M396 146h48v68h-48z"/>
<path class="w-ochre" d="M20 212h428v14H20z"/>
</g>
<g class="ink">
<rect x="68" y="108" width="84" height="18" rx="3"/>
<path class="thin" d="M76 111v12M84 111v12M92 111v12M100 111v12M108 111v12M116 111v12M124 111v12M132 111v12M140 111v12"/>
<path d="M72 126q-12 3-12 16v58q0 14 14 14h72q14 0 14-14v-58q0-13-12-16"/>
<rect x="74" y="178" width="72" height="26" rx="2"/>
<path class="thin" d="M67 144q-2 16 0 30"/>
<rect x="214" y="58" width="24" height="18" rx="3"/>
<path class="thin" d="M218 62l5 10M225 62l5 10M232 62l4 8"/>
<path d="M218 76v18M234 76v18"/>
<path d="M218 94q-18 6-18 24v82q0 14 14 14h24q14 0 14-14v-82q0-18-18-24"/>
<rect x="204" y="178" width="44" height="26" rx="2"/>
<path class="thin" d="M206 122q-2 20 0 40"/>
<rect x="304" y="142" width="48" height="12" rx="2"/>
<path class="thin" d="M310 144v8M316 144v8M322 144v8M328 144v8M334 144v8M340 144v8M346 144v8"/>
<path d="M306 154q-8 2-8 12v34q0 14 14 14h32q14 0 14-14v-34q0-10-8-12"/>
<rect x="316" y="164" width="24" height="24" rx="2"/>
<rect x="398" y="148" width="44" height="66" rx="7"/>
<rect x="411" y="162" width="18" height="38" rx="5"/>
<rect class="solid" x="414" y="165" width="12" height="15" rx="3"/>
<rect x="392" y="122" width="56" height="20" rx="2"/>
<path d="M20 214h428M20 226h428M20 214v12M448 214v12"/>
<path class="thin" d="M62 226l10 16M398 226l-10 16"/>
<path class="thin" d="M34 233l7-6M46 233l7-6M150 233l7-6M162 233l7-6M282 233l7-6M294 233l7-6M424 233l7-6"/>
</g>
<text class="t-num" x="110" y="168" text-anchor="middle">85</text>
<text class="t-hand" x="110" y="196" text-anchor="middle">marks</text>
<text class="t-num" x="226" y="158" text-anchor="middle" style="font-size:22px">1.75</text>
<text class="t-hand" x="226" y="196" text-anchor="middle" style="font-size:14px">height</text>
<text class="t-num" x="328" y="183" text-anchor="middle" style="font-size:18px">A</text>
<text class="t-hand" x="328" y="207" text-anchor="middle" style="font-size:13px">grade</text>
<text class="t-hand" x="420" y="136" text-anchor="middle" style="font-size:13px">passed</text>
<text class="t-code" x="110" y="256" text-anchor="middle">int</text>
<text class="t-code" x="226" y="256" text-anchor="middle">double</text>
<text class="t-code" x="328" y="256" text-anchor="middle">char</text>
<text class="t-code" x="420" y="256" text-anchor="middle">bool</text>
</svg>
<figcaption>A shelf of variables. The label is the name, what's inside is the value, and the shape of the jar is its type.</figcaption>
</figure>

::: tiles By the end of this chapter you can
- **Create** a variable and give it a value
- **Choose** the right type for any information
- **Trace** a value as it changes, line by line
- **Name** variables so code explains itself
:::

## Why we need variables

Say you're writing a program about a student who scored 85. The simplest thing you could write is:

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << 85;
    return 0;
}
```

```output
85
```

It works, but the 85 just floats past and disappears. The program can't come back to it. And real programs keep asking questions like these:

::: tiles
- **Change it** what if the score is updated?
- **Combine it** what's the average of several marks?
- **Compare it** did the student pass?
:::

To do any of that, the program needs to **keep** the value and **refer to it by name**. That's exactly what a variable is.

::: idea
A variable is a named place for a value, so you can use it anywhere in your program.
:::

## Reading `int marks = 85;`

This one line is the pattern you'll write more than any other in C++. Let's take it apart:

```cpp
int marks = 85;
```

::: anatomy One statement, five parts
- `int` **The type.** What kind of value this variable holds: here, whole numbers.
- `marks` **The name.** How you'll refer to it everywhere else in your code.
- `=` **"Start with this value."** It fills the variable as it's created.
- `85` **The starting value.**
- `;` **End of the statement.**
:::

The picture to keep in your head is a labelled jar:

<figure class="sketch">
<svg viewBox="0 0 420 240" aria-hidden="true">
<g class="washes">
<path class="w-sky" d="M154 70q-6 2-6 14v98q0 14 14 14h96q14 0 14-14v-98q0-12-6-14z"/>
<path class="w-orange" d="M150 116h120v66q0 14-14 14h-92q-14 0-14-14z"/>
<path class="w-paper" d="M168 140h84v32h-84z"/>
<path class="w-ochre" d="M110 196h200v8H110z"/>
</g>
<g class="ink">
<rect x="160" y="44" width="100" height="22" rx="4"/>
<path class="thin" d="M170 48v14M180 48v14M190 48v14M200 48v14M210 48v14M220 48v14M230 48v14M240 48v14M250 48v14"/>
<path d="M164 66q-14 3-14 18v98q0 14 14 14h92q14 0 14-14v-98q0-15-14-18"/>
<rect x="168" y="140" width="84" height="32" rx="2"/>
<path class="thin" d="M157 90q-3 30 0 60"/>
<path d="M110 196h200"/>
<rect x="188" y="206" width="44" height="20" rx="2"/>
<path class="thin" d="M146 104h-30M254 156h40M234 216h60"/>
</g>
<text class="t-num" x="210" y="120" text-anchor="middle" style="font-size:40px">85</text>
<text class="t-hand" x="210" y="162" text-anchor="middle" style="font-size:19px">marks</text>
<text class="t-code" x="210" y="220" text-anchor="middle">int</text>
<text class="t-hand" x="110" y="109" text-anchor="end">the value</text>
<text class="t-hand" x="300" y="161">the name</text>
<text class="t-hand" x="300" y="221">the type</text>
</svg>
<figcaption>Name on the label, value inside, type on the placard.</figcaption>
</figure>

> [!NOTE] A picture to think with
> The jar is a mental model, not a photograph of the computer's memory. It's accurate enough for everything in this chapter; Chapter 2 opens up what really happens in memory.

Now let's use the jar:

```cpp
#include <iostream>
using namespace std;

int main() {
    int marks = 85;
    cout << marks;
    return 0;
}
```

```output
85
```

Here's what happened, step by step:

::: flow
1. **Create** `marks` is created as an `int` and filled with `85`.
2. **Ask** `cout << marks;` refers to the jar by its name.
3. **Look inside** C++ fetches the current value, `85`.
4. **Show** That value is sent to the screen.
:::

Notice the quiet but important thing: we wrote `marks`, not `85`, in the `cout` line. That's the whole point of a variable: refer to information by a meaningful name instead of retyping the value.

> [!PREDICT]- What does `cout << "marks";` print?
> The word `marks`. Quotes turn it into text, so C++ prints those letters. Without quotes, `cout << marks;` looks inside the jar and prints `85`.

## Types: what kind of information?

Here are three facts about a student:

```cpp
int age = 20;          // a whole number
double height = 1.75;  // a number with a fractional part
bool passed = true;    // a yes or no
```

All three are information, but they're **different kinds** of information. A **data type** tells C++ which kind, and that decides two things:

::: tiles
- **What fits** which values the variable can hold
- **What works** which operations make sense on it
:::

Look back at the shelf: each type is a differently shaped jar. You can put a new whole number into an `int` jar any time. But text simply doesn't fit:

<figure class="sketch">
<svg viewBox="0 0 420 236" aria-hidden="true">
<g class="washes">
<path class="w-sky" d="M154 104q-6 2-6 14v68q0 14 14 14h76q14 0 14-14v-68q0-12-6-14z"/>
<path class="w-ochre" d="M152 182q48-16 96 0v4q0 12-14 12h-68q-14 0-14-12z"/>
<ellipse class="w-yellow" cx="201" cy="41" rx="19" ry="18"/>
<path class="w-paper" d="M168 146h64v26h-64z"/>
<ellipse class="w-red" cx="260" cy="77" rx="10" ry="9"/>
<path class="w-grey" d="M276 72q20-12 40 0t40 0t40 0v26q-20-12-40 0t-40 0t-40 0z"/>
</g>
<g class="ink">
<rect x="156" y="84" width="88" height="16" rx="3"/>
<path class="thick" d="M186 87h28"/>
<path d="M160 100q-12 3-12 16v70q0 14 14 14h76q14 0 14-14v-70q0-13-12-16"/>
<rect x="168" y="146" width="64" height="26" rx="2"/>
<circle cx="200" cy="40" r="17"/>
<circle class="thin" cx="200" cy="40" r="13"/>
<path class="thin" d="M184 8v8M200 4v8M216 8v8"/>
<path class="dash" d="M200 60v20"/>
<path d="M228 46l6 7 13-15"/>
<path d="M276 72q20-12 40 0t40 0t40 0v26q-20-12-40 0t-40 0t-40 0z"/>
<path class="thin" d="M300 56l-8-9M336 52l-2-11M372 56l6-10"/>
<path d="M254 70l12 12M266 70l-12 12"/>
<path d="M120 200h160"/>
<rect x="182" y="208" width="36" height="18" rx="2"/>
</g>
<text class="t-num" x="200" y="46" text-anchor="middle" style="font-size:17px">21</text>
<text class="t-hand" x="200" y="165" text-anchor="middle">age</text>
<text class="t-hand" x="336" y="91" text-anchor="middle" style="font-size:18px">twenty</text>
<text class="t-code" x="200" y="221" text-anchor="middle">int</text>
</svg>
<figcaption>An int jar takes whole numbers. Text doesn't fit through the slot, and C++ won't let you force it.</figcaption>
</figure>

::: pair
- **Fits**
  ```cpp
  int age = 20;
  age = 21;
  ```
  `21` is a whole number, so it goes straight into an `int`.
- **Doesn't fit**
  ```cpp
  int age = "twenty";
  ```
  `"twenty"` is text, not an integer. The compiler stops with an error.
:::

### C++ checks types before the program runs

C++ is **statically typed**: the compiler checks every variable's type while it builds your program, before anything runs. Once you write `int age`, that variable is an `int` for its whole life.

That doesn't freeze the **value**. Watch it change while the type stays put:

::: watch Follow age
- `int age = 20;` age=20
- `age = 21;` age=21
- `age = 22;` age=22
- `cout << age;` prints 22, the value right now
:::

::: pair
- **Type: fixed**

  Chosen when the variable is declared. It's the shape of the jar.
- **Value: changeable**

  Whatever is in the jar right now. It can change as often as you like.
:::

> [!REMEMBER]
> Keep **type** and **value** separate in your head. So many later C++ ideas get easier once this one clicks.

## Declare, assign, initialise

Three lines that look alike but mean different things:

```cpp
int marks;       // declare
marks = 85;      // assign
int age = 20;    // initialise
```

<div class="sketch-row">
<figure class="sketch">
<svg viewBox="0 0 160 170" aria-hidden="true">
<g class="washes">
<path class="w-grey" d="M36 92q20-10 44 0t44 0v46q0 12-12 12h-64q-12 0-12-12z"/>
<path class="w-paper" d="M50 122h60v22H50z"/>
</g>
<g class="ink">
<rect x="40" y="44" width="80" height="16" rx="3"/>
<path class="thin" d="M48 47v10M56 47v10M64 47v10M72 47v10M80 47v10M88 47v10M96 47v10M104 47v10M112 47v10"/>
<path d="M44 60q-12 3-12 16v62q0 14 14 14h68q14 0 14-14v-62q0-13-12-16"/>
<rect x="50" y="122" width="60" height="22" rx="2"/>
<path class="thin" d="M50 98q6-5 12 0t12 0M86 102q6-5 12 0t12 0"/>
</g>
<text class="t-num" x="80" y="112" text-anchor="middle" style="fill:#8A857D">?</text>
<text class="t-hand" x="80" y="138" text-anchor="middle" style="font-size:14px">marks</text>
</svg>
<figcaption><code>int marks;</code><br>Declared: the jar has a label, but what's inside is unknown.</figcaption>
</figure>
<figure class="sketch">
<svg viewBox="0 0 160 170" aria-hidden="true">
<g class="washes">
<path class="w-sky" d="M36 72h88v66q0 12-12 12h-64q-12 0-12-12z"/>
<path class="w-paper" d="M50 122h60v22H50z"/>
</g>
<g class="ink">
<rect x="4" y="34" width="56" height="14" rx="3" transform="rotate(-28 32 41)"/>
<path d="M44 60q-12 3-12 16v62q0 14 14 14h68q14 0 14-14v-62q0-13-12-16"/>
<rect x="50" y="122" width="60" height="22" rx="2"/>
<path class="thin" d="M76 6v8M112 6v8"/>
<path class="dash" d="M94 34v18"/>
</g>
<text class="t-num" x="94" y="28" text-anchor="middle" style="font-size:24px">85</text>
<text class="t-hand" x="80" y="138" text-anchor="middle" style="font-size:14px">marks</text>
</svg>
<figcaption><code>marks = 85;</code><br>Assigned: a value is dropped into an existing jar.</figcaption>
</figure>
<figure class="sketch">
<svg viewBox="0 0 160 170" aria-hidden="true">
<g class="washes">
<path class="w-orange" d="M34 82h92v56q0 12-12 12h-68q-12 0-12-12z"/>
<path class="w-paper" d="M50 122h60v22H50z"/>
<ellipse class="w-red" cx="80" cy="36" rx="24" ry="9"/>
</g>
<g class="ink">
<rect x="40" y="44" width="80" height="16" rx="3"/>
<path d="M44 60q-12 3-12 16v62q0 14 14 14h68q14 0 14-14v-62q0-13-12-16"/>
<rect x="50" y="122" width="60" height="22" rx="2"/>
<path d="M80 44q-20-18-26-6q4 12 26 6zM80 44q20-18 26-6q-4 12-26 6z"/>
<path class="thin" d="M80 44l-9 14M80 44l9 14"/>
</g>
<text class="t-num" x="80" y="110" text-anchor="middle" style="font-size:28px">85</text>
<text class="t-hand" x="80" y="138" text-anchor="middle" style="font-size:14px">marks</text>
</svg>
<figcaption><code>int marks = 85;</code><br>Initialised: the jar arrives already filled.</figcaption>
</figure>
</div>

### Declaration: a label on an empty jar

```cpp
int marks;
```

This creates a variable called `marks` of type `int`, but doesn't put anything in it. The jar isn't empty, though: it holds whatever happened to be left in that spot of memory. Its value is **indeterminate**.

> [!WARNING] Never read a jar you haven't filled
> Reading `marks` before giving it a value is **undefined behaviour**: C++ makes no promises at all about what happens. Don't assume it starts at zero.

::: pair
- **Don't**
  ```cpp
  int marks;
  cout << marks;   // anything could appear
  ```
- **Do**
  ```cpp
  int marks = 0;   // a known starting value
  ```
:::

### Assignment: putting a value in

```cpp
int marks;
marks = 85;
```

The second line **assigns** 85 to `marks`. In C++, `=` doesn't ask "are these equal?". It's an instruction: work out the right-hand side, then put the result into the variable on the left.

> [!TIP]
> Read `=` as **"becomes"**. `marks = 85;` reads as "marks becomes 85".

### Initialisation: filled from the start

```cpp
int marks = 85;
```

Declaring and giving a first value in one go is called **initialisation**. Here's all three together:

::: watch
- `int marks;` marks=? declared, but unknown
- `marks = 85;` marks=85 assigned
- `int age = 20;` age=20 initialised
:::

```output
85
20
```

> [!NOTE]
> Both initialisation and assignment use `=`, but C++ treats them as different operations. The practical difference for now: initialisation gives a brand-new variable its first value; assignment changes the value of a variable that already exists.

> [!PREDICT]- What is `x` at the end? `int x = 5; x = x + 1;`
> `6`. C++ works out the right-hand side first, `x + 1`, which is `5 + 1`. Then `x` becomes `6`. In maths `x = x + 1` would be impossible; in C++ it simply means "x becomes one more than it was".

## A slate, not a diary

A variable remembers only its **current** value. Writing a new one wipes the old one away, like chalk on a slate:

<figure class="sketch">
<svg viewBox="0 0 400 236" aria-hidden="true">
<g class="washes">
<path class="w-ochre" d="M100 40h200v140H100z"/>
<path class="w-slate" d="M113 53h174v114H113z"/>
<path class="w-yellow" d="M300 184h44v22h-44z"/>
<path class="w-paper" d="M166 30h68v20h-68z"/>
</g>
<g class="ink">
<circle class="solid" cx="200" cy="12" r="2.5"/>
<path class="thin" d="M200 13L158 40M200 13L242 40"/>
<rect x="100" y="40" width="200" height="140" rx="8"/>
<rect x="112" y="52" width="176" height="116" rx="3"/>
<path class="thin" d="M106 66v86M294 66v86"/>
<rect x="166" y="30" width="68" height="20" rx="2"/>
<rect x="298" y="184" width="46" height="24" rx="8" transform="rotate(-10 321 196)"/>
<path class="thin" d="M150 176l2 3M160 178l1 3M246 176l2 2M256 178l1 2"/>
</g>
<text class="t-num t-chalk" x="146" y="88" text-anchor="middle" style="font-size:30px;opacity:.13">10</text>
<text class="t-num t-chalk" x="252" y="92" text-anchor="middle" style="font-size:30px;opacity:.13">25</text>
<g style="fill:none;stroke:#F2F0E8;stroke-width:9;stroke-linecap:round;opacity:.12">
<path d="M126 80q20-8 42 2"/>
<path d="M232 84q22-8 44 2"/>
</g>
<text class="t-num t-chalk" x="200" y="146" text-anchor="middle" style="font-size:64px">40</text>
<text class="t-hand" x="200" y="45" text-anchor="middle" style="font-size:14px">score</text>
</svg>
<figcaption>A variable is a slate, not a diary. Write a new value and the old one is rubbed away.</figcaption>
</figure>

Let's follow one variable through a program:

```cpp
#include <iostream>
using namespace std;

int main() {
    int score = 10;
    cout << score << '\n';

    score = 25;
    cout << score << '\n';

    score = 40;
    cout << score;

    return 0;
}
```

::: watch Watch the jar
- `int score = 10;` score=10 initialised
- `cout << score << '\n';` prints 10
- `score = 25;` score=25 the 10 is gone
- `cout << score << '\n';` prints 25
- `score = 40;` score=40 the 25 is gone
- `cout << score;` prints 40
:::

```output
10
25
40
```

Each `cout` shows the value **at that moment**. C++ doesn't keep a history. If you need an old value, you have to save it yourself, in another variable:

```cpp
int score = 10;
int previousScore = score;   // save a copy

score = 25;

cout << previousScore << '\n';
cout << score;
```

::: watch
- `int score = 10;` score=10
- `int previousScore = score;` previousScore=10 a copy of the 10 inside score
- `score = 25;` score=25 previousScore doesn't change
:::

```output
10
25
```

<figure class="sketch">
<svg viewBox="0 0 420 214" aria-hidden="true">
<g class="washes">
<path class="w-orange" d="M76 112h88v52q0 12-12 12h-64q-12 0-12-12z"/>
<path class="w-blue" d="M248 112h104v52q0 12-12 12h-80q-12 0-12-12z"/>
<path class="w-paper" d="M90 148h60v22H90zM256 148h88v22h-88z"/>
</g>
<g class="ink">
<rect x="82" y="70" width="76" height="16" rx="3"/>
<path d="M86 86q-12 3-12 16v62q0 14 14 14h64q14 0 14-14v-62q0-13-12-16"/>
<rect x="90" y="148" width="60" height="22" rx="2"/>
<rect x="254" y="70" width="92" height="16" rx="3"/>
<path d="M258 86q-12 3-12 16v62q0 14 14 14h80q14 0 14-14v-62q0-13-12-16"/>
<rect x="256" y="148" width="88" height="22" rx="2"/>
<path class="dash" d="M128 64Q210 4 290 62"/>
<path d="M290 62l-11-3M290 62l-2-11"/>
<path d="M50 178h330"/>
<path class="thin" d="M168 154q14 9 26 3M226 157q14 6 22-4"/>
</g>
<text class="t-num" x="120" y="136" text-anchor="middle">25</text>
<text class="t-num" x="300" y="136" text-anchor="middle">10</text>
<text class="t-hand" x="120" y="164" text-anchor="middle" style="font-size:14px">score</text>
<text class="t-hand" x="300" y="164" text-anchor="middle" style="font-size:13px">previousScore</text>
<text class="t-hand" x="210" y="22" text-anchor="middle" style="font-size:15px">copied once, at the start</text>
<text class="t-hand" x="210" y="202" text-anchor="middle" style="font-size:14px">not tied together</text>
</svg>
<figcaption>Assignment copies the value across. After that, the two jars live separate lives.</figcaption>
</figure>

::: idea
Assignment copies a value. It never ties two variables together.
:::

> [!PREDICT]- What does this print? `int a = 5; int b = a; a = 9; cout << b;`
> `5`. When `b` was created it got a *copy* of the 5 in `a`. Changing `a` later doesn't reach into `b`.

## Meet the types

Here's the whole family on one page. The rest of this section introduces each one properly.

::: tiles
- `int` whole numbers, like `20`
- `double` decimals, like `1.75`
- `float` decimals, less precise: `1.75f`
- `char` one character, like `'A'`
- `bool` `true` or `false`
- `string` text, like `"Arghya"`
- `wchar_t` a wide character: `L'A'`
- `void` "nothing is returned"
:::

### `int`: whole numbers

```cpp
int age = 20;
int temperature = -5;
int numberOfStudents = 60;
```

Whole numbers, positive or negative, with no fractional part. If you need `20.5`, `int` is the wrong jar. (How big an `int` can get is a Chapter 2 story.)

### `float` and `double`: numbers with decimals

```cpp
float height = 1.75f;
double pi = 3.1415926535;
```

Both hold **floating-point** numbers: numbers with a fractional part. The difference is how many digits they can keep accurately:

::: pair
- **float**

  About **6 to 7** significant digits.
  ```output
  3.141593
  ```
- **double**

  About **15 to 16** significant digits.
  ```output
  3.141592653589793
  ```
:::

That extra precision is why `double` is the everyday default for decimals. Two small details:

::: tiles
- `1.75` on its own is a `double` literal
- `1.75f` the `f` makes it a `float` literal
:::

> [!NOTE]
> Why `0.1 + 0.2` isn't exactly `0.3`, and how decimals are really stored, is coming in Chapter 2.

### `char`: a single character

```cpp
char grade = 'A';
char initial = 'R';
```

A `char` holds **one** character, written in **single** quotes. Text of any length, a string, uses **double** quotes:

<figure class="sketch">
<svg viewBox="0 0 440 200" aria-hidden="true">
<g class="ink"><path d="M186 108Q220 84 252 76T328 80T392 106"/><circle class="solid" cx="186" cy="108" r="3"/><circle class="solid" cx="392" cy="106" r="3"/></g>
<g style="fill:#F3F2EE"><circle cx="214" cy="87" r="17"/><circle cx="252" cy="75" r="17"/><circle cx="290" cy="73" r="17"/><circle cx="328" cy="80" r="17"/><circle cx="366" cy="93" r="17"/></g>
<g class="washes">
<path class="w-ochre" d="M52 58h72v72H52z"/>
<circle class="w-blue" cx="214" cy="87" r="16"/>
<circle class="w-red" cx="252" cy="75" r="16"/>
<circle class="w-ochre" cx="290" cy="73" r="16"/>
<circle class="w-green" cx="328" cy="80" r="16"/>
<circle class="w-blue" cx="366" cy="93" r="16"/>
</g>
<g class="ink">
<rect x="52" y="58" width="72" height="72" rx="7"/>
<rect class="thin" x="58" y="64" width="60" height="60" rx="4"/>
<circle cx="214" cy="87" r="17"/>
<circle cx="252" cy="75" r="17"/>
<circle cx="290" cy="73" r="17"/>
<circle cx="328" cy="80" r="17"/>
<circle cx="366" cy="93" r="17"/>
</g>
<text class="t-num" x="88" y="108" text-anchor="middle" style="font-size:40px">A</text>
<text class="t-num" x="40" y="92" text-anchor="middle" style="font-size:36px">‘</text>
<text class="t-num" x="136" y="92" text-anchor="middle" style="font-size:36px">’</text>
<text class="t-num" x="214" y="93" text-anchor="middle" style="font-size:18px">A</text>
<text class="t-num" x="252" y="81" text-anchor="middle" style="font-size:18px">p</text>
<text class="t-num" x="290" y="79" text-anchor="middle" style="font-size:18px">p</text>
<text class="t-num" x="328" y="86" text-anchor="middle" style="font-size:18px">l</text>
<text class="t-num" x="366" y="99" text-anchor="middle" style="font-size:18px">e</text>
<text class="t-num" x="172" y="98" text-anchor="middle" style="font-size:36px">“</text>
<text class="t-num" x="408" y="96" text-anchor="middle" style="font-size:36px">”</text>
<text class="t-code" x="88" y="162" text-anchor="middle">char</text>
<text class="t-hand" x="88" y="182" text-anchor="middle" style="font-size:14px">one tile</text>
<text class="t-code" x="290" y="162" text-anchor="middle">string</text>
<text class="t-hand" x="290" y="182" text-anchor="middle" style="font-size:14px">characters strung together</text>
</svg>
<figcaption>A char is a single tile. A string is a thread of characters, beads on a string.</figcaption>
</figure>

::: tiles
- `'A'` single quotes: one `char`
- `"Apple"` double quotes: a string of text
:::

> [!PREDICT]- Is `char grade = "A";` correct?
> No. `"A"` in double quotes is a string, even though it has one letter. A `char` needs single quotes: `char grade = 'A';`.

### `bool`: true or false

```cpp
bool passed = true;
bool submitted = false;
```

A `bool` holds one of exactly two values: `true` or `false`. Its superpower is storing the answer to a **question**:

```cpp
int marks = 85;
bool passed = marks >= 40;   // is marks at least 40?
```

`marks >= 40` asks a question; the answer, `true`, is what goes into `passed`.

<figure class="sketch">
<svg viewBox="0 0 420 206" aria-hidden="true">
<g class="washes">
<path class="w-sky" d="M30 62h150v76H30z"/>
<path class="w-red" d="M256 44h70v116h-70z"/>
<ellipse class="w-yellow" cx="372" cy="73" rx="19" ry="18"/>
</g>
<g class="ink">
<g transform="rotate(-3 105 100)"><rect x="30" y="62" width="150" height="76" rx="8"/></g>
<path d="M196 100h36"/>
<path class="solid" d="M244 100l-12-6v12z"/>
<rect x="256" y="44" width="70" height="116" rx="10"/>
<rect x="279" y="66" width="24" height="72" rx="6"/>
<rect class="solid" x="283" y="70" width="16" height="30" rx="4"/>
<circle class="solid" cx="291" cy="54" r="2"/>
<circle class="solid" cx="291" cy="150" r="2"/>
<circle cx="372" cy="74" r="17"/>
<path d="M364 91h16M365 96h14M367 101h10"/>
<path class="thin" d="M372 46v-12M393 55l8-8M351 55l-8-8M398 76h12M346 76h-12"/>
</g>
<g transform="rotate(-3 105 100)"><text class="t-hand" x="105" y="107" text-anchor="middle" style="font-size:21px">marks ≥ 40 ?</text></g>
<text class="t-hand" x="291" y="186" text-anchor="middle" style="font-size:20px">true</text>
</svg>
<figcaption>A bool is the answer to a yes-or-no question: switched on for true, off for false.</figcaption>
</figure>

> [!PREDICT]- What does this print? `bool passed = 30 >= 40; cout << passed;`
> `0`. 30 isn't at least 40, so `passed` is `false`, and `cout` shows `false` as `0` (and `true` as `1`) unless you ask for words. You'll see how in [the full program](#putting-it-all-together).

### `string`: text

```cpp
#include <string>

string name = "Arghya";
```

`string` (in full, `std::string`) holds a sequence of characters. Notice the extra `#include <string>`: unlike `int` or `char`, a string isn't built into the core of the language. It comes from the **standard library**, as a ready-made type you bring in.

::: tiles
- **Fundamental** built into C++: `int`, `double`, `char`, `bool`…
- **Library** ready-made, brought in: `string`
:::

### `void`: nothing comes back

`void` isn't a jar at all: you can't store a value in it. Its most important job is to say that a **function hands back nothing**:

```cpp
void sayHello() {
    cout << "Hello!";
}
```

<figure class="sketch">
<svg viewBox="0 0 420 228" aria-hidden="true">
<g class="washes">
<path class="w-blue" d="M130 70h150v104H130z"/>
<path class="w-yellow" d="M256 20h112q10 0 10 10v26q0 10-10 10h-112q-10 0-10-10v-26q0-10 10-10z"/>
<path class="w-grey" d="M300 178h86l-8 18h-70z"/>
</g>
<g class="ink">
<path d="M150 70l-10-28h44l-10 28"/>
<rect x="130" y="70" width="150" height="104" rx="12"/>
<circle cx="180" cy="116" r="22"/>
<circle class="thin" cx="180" cy="116" r="6"/>
<path class="thin" d="M180 88v6M180 138v6M152 116h6M202 116h6M160 96l4 4M196 132l4 4M160 136l4-4M196 100l4-4"/>
<circle cx="228" cy="130" r="14"/>
<circle class="thin" cx="228" cy="130" r="4"/>
<path class="thin" d="M228 112v4M228 144v4M210 130h4M242 130h4"/>
<rect x="146" y="150" width="76" height="16" rx="2"/>
<rect x="238" y="82" width="34" height="16" rx="2"/>
<path d="M280 150h22l18 22"/>
<path d="M300 178h86l-8 18h-70z"/>
<path d="M256 20h112q10 0 10 10v26q0 10-10 10h-66l-18 14 4-14h-32q-10 0-10-10v-26q0-10 10-10z"/>
</g>
<text class="t-hand" x="312" y="50" text-anchor="middle" style="font-size:22px">Hello!</text>
<text class="t-code" x="184" y="162" text-anchor="middle" style="font-size:10px">sayHello</text>
<text class="t-code" x="255" y="94" text-anchor="middle" style="font-size:10px">void</text>
<text class="t-hand" x="343" y="216" text-anchor="middle" style="font-size:14px">nothing comes out</text>
</svg>
<figcaption>A void function does its job, then hands nothing back.</figcaption>
</figure>

`sayHello` clearly *does* something: it prints a greeting. `void` doesn't stop it working; it only says the function gives **no result back** to whoever called it. Functions, `main()`, return values and `void` get their own full chapter later.

### `wchar_t`: a wide character

```cpp
wchar_t letter = L'A';
```

A character type that can be wider than a `char`. The `L` in front marks a wide-character literal. Its size depends on the system: commonly 2 bytes on Windows and 4 bytes on many Unix-like systems such as Linux and macOS. Chapter 2 explains what that size means and where `wchar_t` falls short.

## Choosing the right type

Choosing a type isn't trivia; it's part of solving the problem. Here's a student record:

```cpp
int age = 20;
double height = 1.75;
char grade = 'A';
bool passed = true;
```

::: anatomy Why each one
- `int age` **A whole number.** Nobody says they're 20.37 years old.
- `double height` **Needs a fraction.** 1.75 metres.
- `char grade` **One letter.** A, B or C.
- `bool passed` **A yes-or-no answer.**
:::

::: idea
Before declaring any variable, ask: what kind of information is this, and what will I need to do with it?
:::

That question will serve you far better than memorising which type goes with which textbook example.

## Names that explain themselves

Both of these are valid C++. Only one tells you what's going on:

::: pair
- **Mysterious**
  ```cpp
  int a = 85;
  double b = 1.75;
  bool c = true;
  ```
- **Self-explaining**
  ```cpp
  int marks = 85;
  double height = 1.75;
  bool passed = true;
  ```
:::

The rules C++ enforces:

::: tiles Naming rules
- **Allowed** letters, digits and underscores
- **Start** never with a digit
- **No spaces** use `studentAge` or `student_age`
- **No keywords** `int` and `return` are taken
- **Exact** `marks`, `Marks` and `MARKS` are all different
:::

::: pair
- **Valid**
  ```cpp
  int studentAge = 20;
  int student_age = 20;
  int age2 = 20;
  ```
- **Invalid**
  ```cpp
  int 2age = 20;          // starts with a digit
  int student age = 20;   // contains a space
  ```
:::

> [!TIP]
> Good names cost nothing to write and save hours to read. The larger your programs grow, the more this little habit pays you back.

## Putting it all together

Here's everything from this chapter in one program:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "Arghya";
    int marks = 85;
    double attendance = 92.5;
    bool passed = true;

    cout << "Name: " << name << '\n';
    cout << "Marks: " << marks << '\n';
    cout << "Attendance: " << attendance << '\n';
    cout << "Passed: " << boolalpha << passed << '\n';

    return 0;
}
```

::: watch The jars, after the four declarations
- `string name = "Arghya";` name="Arghya"
- `int marks = 85;` marks=85
- `double attendance = 92.5;` attendance=92.5
- `bool passed = true;` passed=true
:::

```output
Name: Arghya
Marks: 85
Attendance: 92.5
Passed: true
```

Reason it through, the way you'll reason about every program from now on:

::: flow
1. **Fill the jars** Four variables are created, each with a name, a type and a starting value.
2. **Run the couts in order** Each time `cout` meets a variable's name, it shows that variable's current value.
3. **Break the lines** Each `'\n'` starts a new line.
4. **Say it in words** `boolalpha` tells `cout` to print `true` instead of `1`.
:::

Nothing here is guesswork. The output follows exactly from the instructions. Practise explaining *why* a program prints what it prints, not just recognising that it's correct.

## Check yourself

> [!PREDICT]- What does `int marks = 85;` do?
> It declares an integer variable called `marks` and initialises it to `85`. It doesn't print anything; that would need `cout`.

> [!PREDICT]- What does this print? `int score = 10; score = 25; cout << score;`
> `25`. The assignment replaced the 10, and `cout` shows the current value.

> [!PREDICT]- True or false: a variable's type can change if you assign a different kind of value.
> False. The **value** can change as often as you like; the declared **type** stays the same for the variable's whole life.

> [!PREDICT]- What does this print? `cout << 12; cout << 7;`
> `127`. Neither statement adds a line break, so the 7 appears right after the 12. (A Chapter 0 classic!)

> [!EXAMPLE]- Your turn: write it yourself, then compare
> Write a program that stores your name, your age, your height in metres, and whether you like tea, then prints all four on separate lines with `true`/`false` as words.
>
> ```cpp
> #include <iostream>
> #include <string>
> using namespace std;
>
> int main() {
>     string name = "Arghya";
>     int age = 20;
>     double height = 1.75;
>     bool likesTea = true;
>
>     cout << "Name: " << name << '\n';
>     cout << "Age: " << age << '\n';
>     cout << "Height: " << height << '\n';
>     cout << "Likes tea: " << boolalpha << likesTea << '\n';
>
>     return 0;
> }
> ```

## What's next

::: idea Chapter 1 in one breath
A variable is a named jar. Its type is the jar's shape, fixed forever; its value is what's inside right now; and assignment swaps the contents, by copying.
:::

Chapter 2 opens the jars up and looks at what's really inside:

::: tiles Coming in Chapter 2
- **Bits and bytes** how numbers are actually stored
- **Ranges** why `int` and `long long` hold different amounts
- **Overflow** when a multiplication runs out of room
- `1LL * a * b` why this changes the answer
- `0.1 + 0.2` why it isn't exactly `0.3`
- **Characters** codes, `bool` and `wchar_t`, inside
:::
