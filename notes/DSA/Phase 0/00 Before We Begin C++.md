---
summary: The rules of the game before we play it. What a C++ program looks like, how instructions are written, and how the computer follows them.
---

# Before We Begin C++

Before Chapter 1, we need a Chapter 0: how to **read** and **think** in C++. This isn't a history lesson, a dry list of syntax rules, or an early deep dive into compilers.

Think of it as learning the rules of a game before playing it. You don't need every rule of chess theory to make your first move, but you do need to know how the pieces, the board and the turns work. C++ is similar. Before we study data types, we need to know what a program looks like, how instructions are written, and how the computer follows them.

## What are we actually doing when we program?

Imagine you want a computer to add two numbers. You already know how:

$$
12 + 7 = 19
$$

But the computer doesn't magically know what you intend. You have to give it instructions in a form it can process. That's programming.

> [!DEFINITION] Program
> A set of instructions, written in a programming language, that makes a computer perform a task.

Here is that addition as a C++ program:

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

That's our first little C++ program. We'll eventually understand every line in detail. For now, let's learn the rules that let us *read* it.

## The basic shape of a C++ program

Almost every beginner C++ program you write will start from this pattern:

```cpp
#include <iostream>
using namespace std;

int main() {
    // Write your instructions here

    return 0;
}
```

<figure class="diagram">
<div class="scroll">
<svg viewBox="0 0 600 222" role="img" aria-label="The shape of a C++ program. The first two lines prepare the program by bringing in tools. int main opens the place where execution starts. The lines inside the braces are the instructions. return 0 finishes and reports success. The braces mark one block.">
<text x="40" y="44" class="dg-mono" style="font-size:15px"><tspan class="dg-ochre">#include &lt;iostream&gt;</tspan></text>
<text x="40" y="70" class="dg-mono" style="font-size:15px"><tspan class="dg-tag">using namespace</tspan> std;</text>
<text x="40" y="122" class="dg-mono" style="font-size:15px"><tspan class="dg-tag">int</tspan> main() {</text>
<text x="40" y="148" class="dg-mono" style="font-size:15px">    cout &lt;&lt; <tspan class="dg-ochre">12</tspan> + <tspan class="dg-ochre">7</tspan>;</text>
<text x="40" y="174" class="dg-mono" style="font-size:15px">    <tspan class="dg-tag">return</tspan> <tspan class="dg-ochre">0</tspan>;</text>
<text x="40" y="200" class="dg-mono" style="font-size:15px">}</text>
<path class="dg-accent-line" d="M30 108h-6v98h6"/>
<path class="dg-line" d="M262 28h6v48h-6M268 52h8"/>
<path class="dg-line" d="M262 108h6v20h-6M268 118h8"/>
<path class="dg-line" d="M262 134h6v20h-6M268 144h8"/>
<path class="dg-line" d="M262 160h6v20h-6M268 170h8"/>
<text x="284" y="56" class="dg-label"><tspan class="dg-strong">Prepare</tspan>: bring in the tools we need</text>
<text x="284" y="122" class="dg-label"><tspan class="dg-strong">Start here</tspan>: execution begins in main()</text>
<text x="284" y="148" class="dg-label"><tspan class="dg-strong">Do the work</tspan>: your instructions</text>
<text x="284" y="174" class="dg-label"><tspan class="dg-strong">Finish</tspan>: report that all went well</text>
<text x="284" y="200" class="dg-small">The accent bracket on the left is one block: { … }</text>
</svg>
</div>
<figcaption>Not every line does the same job. Some prepare, one marks where execution starts, and some do the actual work.</figcaption>
</figure>

Let's look at the pieces one by one.

### Rule 1: `#include <iostream>`

This makes the standard input and output facilities, declared in a header called `iostream`, available to your program.

For now, remember the practical reason: it lets us use tools such as `cout` to **display output** and `cin` to **receive input**.

### Rule 2: `using namespace std;`

Many standard C++ facilities belong to a *namespace* called `std`. This line lets us write `cout` instead of `std::cout`.

It's common in beginner tutorials. In larger programs you'll often see `std::cout` written out explicitly instead.

### Rule 3: `int main()`

This is the **entry point** of a normal C++ program: the place where the program starts executing your instructions.

We'll study why it has the return type `int` in a later chapter.

### Rule 4: `{` and `}`

Curly braces mark the **beginning and end of a block** of code. Everything between the braces that belong to `main()` forms the *body* of that function.

### Rule 5: `return 0;`

This ends `main()` and reports a **successful finish** to the environment that ran the program.

For now, treat it as a conventional last line you'll commonly see. C++ also allows `main()` to simply reach its closing brace without `return 0;`, and it still counts as success.

> [!REMEMBER] Our first important distinction
> These lines don't all serve the same purpose. Some **prepare** the program, one **marks where execution begins**, and some **perform actions**.

## C++ code is made of instructions

Consider these two lines:

```cpp
cout << 12;
cout << 7;
```

They are **two separate instructions**. The first displays `12`; the second displays `7`.

```output
127
```

Why not `12` and `7` on separate lines? Because neither instruction asked for a line break. The second number is printed exactly where the first one stopped.

Now compare:

```cpp
cout << 12 << '\n';
cout << 7 << '\n';
```

```output
12
7
```

The special character `'\n'` represents a **newline**: it moves the output to the start of the next line.

> [!IMPORTANT] Game rule
> If you want separate output lines, you must tell the program to produce line breaks. The computer doesn't guess your formatting intentions.

## The semicolon: the punctuation of C++

Look at this statement:

```cpp
cout << 12 + 7;
```

The semicolon `;` marks the **end of the statement**, the way a full stop ends a sentence. In everyday beginner C++, most executable statements end with one.

<figure class="diagram">
<div class="dg-grid cols-2">
<div class="dg-card is-right"><span class="dg-verdict">Correct</span><pre>int age = 20<span class="dg-hl">;</span>
cout &lt;&lt; age<span class="dg-hl">;</span>
return 0<span class="dg-hl">;</span></pre></div>
<div class="dg-card is-wrong"><span class="dg-verdict">Incorrect</span><pre>int age = 20<span class="dg-hl"> </span>   ← missing ;
cout &lt;&lt; age;</pre><p style="margin-top:10px">The compiler reports an error, so the program never runs.</p></div>
</div>
<figcaption>Every statement needs its full stop.</figcaption>
</figure>

But here's a detail worth remembering: **not every line ends with a semicolon.**

```cpp
int main() {
    cout << 19;
    return 0;
}
```

`int main()` is followed by a **block**, not a semicolon. The **statements** inside the block are the ones that end with semicolons.

> [!TIP]
> Don't try to memorise every exception yet. Just learn to recognise two shapes: **statements**, which end in `;`, and **blocks**, which are wrapped in `{ }`.

## Spaces, indentation and comments

C++ generally ignores ordinary spaces and line breaks between the pieces of your code, as long as they don't change its meaning. These two do exactly the same thing:

```cpp
cout << 12 + 7;
```

```cpp
cout
    <<
    12
    +
    7;
```

Both display `19`. The first is simply far easier to read.

> [!NOTE]
> The computer needs **valid syntax**. Humans need **readable code**. That's why programmers use indentation and sensible spacing even though the compiler doesn't require them.

### Comments

A comment is a note for people. The compiler ignores it.

```cpp
// This line explains what the next statement does
cout << 19;
```

`//` tells the compiler to ignore the rest of that line. For longer notes, C++ also supports comments that span several lines:

```cpp
/*
This is a
multiline comment.
*/
```

> [!WARNING]
> Comments explain code; they don't make incorrect code correct.

## Write, compile, run

Here's how your C++ program becomes something you can execute.

<figure class="diagram">
<div class="scroll">
<svg viewBox="0 0 600 200" role="img" aria-label="Three stages. Write the source code in a .cpp file. Compile: the compiler checks and translates it. Run: the program executes and may produce output. A compile error, such as a missing semicolon, stops the program from ever running. A logic error lets it run but gives the wrong answer.">
<rect class="dg-box-accent" x="20" y="24" width="160" height="70" rx="14"/>
<rect class="dg-box-accent" x="220" y="24" width="160" height="70" rx="14"/>
<rect class="dg-box-accent" x="420" y="24" width="160" height="70" rx="14"/>
<text x="100" y="54" text-anchor="middle" class="dg-text dg-strong">1. Write</text>
<text x="100" y="76" text-anchor="middle" class="dg-small">source code in a .cpp file</text>
<text x="300" y="54" text-anchor="middle" class="dg-text dg-strong">2. Compile</text>
<text x="300" y="76" text-anchor="middle" class="dg-small">check and translate</text>
<text x="500" y="54" text-anchor="middle" class="dg-text dg-strong">3. Run</text>
<text x="500" y="76" text-anchor="middle" class="dg-small">execute, show output</text>
<path class="dg-ink" d="M184 59h26M384 59h26"/>
<path class="dg-arrow" d="M217 59l-7-4v8zM417 59l-7-4v8z"/>
<path class="dg-line dg-dash" d="M300 94v34M500 94v34"/>
<rect class="dg-box-bad" x="210" y="128" width="180" height="58" rx="12"/>
<rect class="dg-box-hl" x="410" y="128" width="180" height="58" rx="12"/>
<text x="300" y="152" text-anchor="middle" class="dg-label dg-strong dg-bad">Compile error</text>
<text x="300" y="172" text-anchor="middle" class="dg-small">e.g. a missing ; so it never runs</text>
<text x="500" y="152" text-anchor="middle" class="dg-label dg-strong dg-ochre">Logic error</text>
<text x="500" y="172" text-anchor="middle" class="dg-small">it runs, but the answer is wrong</text>
</svg>
</div>
<figcaption>Two different kinds of mistake can stop you, at two different stages.</figcaption>
</figure>

1. **Write the source code.** You type instructions into a `.cpp` file.
2. **Compile the program.** The compiler checks your code and translates it into a form the computer can execute.
3. **Run the program.** It executes its instructions and may produce output.

If you forget a required semicolon, compilation generally fails, so the program never runs. If your program compiles but contains a **logical** mistake, it may run perfectly smoothly while producing the wrong answer. We'll learn to tell these two kinds of problem apart as we go.

## Input, processing and output

Most simple programs follow a useful three-step pattern:

<figure class="diagram">
<div class="scroll">
<svg viewBox="0 0 600 132" role="img" aria-label="Input: the numbers 12 and 7 arrive through cin. Processing: the program calculates 12 plus 7. Output: 19 is displayed through cout.">
<rect class="dg-box" x="20" y="18" width="160" height="96" rx="14"/>
<rect class="dg-box-accent" x="220" y="18" width="160" height="96" rx="14"/>
<rect class="dg-box" x="420" y="18" width="160" height="96" rx="14"/>
<text x="100" y="46" text-anchor="middle" class="dg-label dg-strong">Input</text>
<text x="300" y="46" text-anchor="middle" class="dg-label dg-strong">Processing</text>
<text x="500" y="46" text-anchor="middle" class="dg-label dg-strong">Output</text>
<text x="100" y="78" text-anchor="middle" class="dg-serif" style="font-size:22px">12 7</text>
<text x="300" y="78" text-anchor="middle" class="dg-serif" style="font-size:22px">12 + 7</text>
<text x="500" y="78" text-anchor="middle" class="dg-serif" style="font-size:22px">19</text>
<text x="100" y="100" text-anchor="middle" class="dg-mono dg-tag" style="font-size:12px">cin &gt;&gt;</text>
<text x="300" y="100" text-anchor="middle" class="dg-mono dg-tag" style="font-size:12px">a + b</text>
<text x="500" y="100" text-anchor="middle" class="dg-mono dg-tag" style="font-size:12px">cout &lt;&lt;</text>
<path class="dg-ink" d="M184 66h26M384 66h26"/>
<path class="dg-arrow" d="M217 66l-7-4v8zM417 66l-7-4v8z"/>
</svg>
</div>
<figcaption>Receive information, work on it, show the result.</figcaption>
</figure>

- **Input:** receive information.
- **Processing:** perform a calculation or make a decision.
- **Output:** display the result.

Here are all three in one tiny program:

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;

    cin >> a >> b;      // input

    cout << a + b;      // processing and output

    return 0;
}
```

Suppose you type:

```input
12 7
```

The program reads the two numbers into `a` and `b`, adds them, and displays:

```output
19
```

For now you only need to recognise these symbols:

| Symbol | What it does |
|---|---|
| `cin` | Receives input |
| `>>` | Extracts input into variables |
| `cout` | Displays output |
| `<<` | Sends output to the output stream |
| `+` | Adds numbers |

> [!REMEMBER]
> The arrows point the way the data flows. `cin >> a` sends data **into** `a`. `cout << a` sends `a` **out** to the screen.

We'll explore variables, types and operators properly in later chapters.

## What to learn now, and what can wait

| Learn now | Leave for later |
|---|---|
| A C++ program contains instructions | The full meaning of `int main()` |
| `main()` is where execution begins | How variables are stored in memory |
| `{ }` enclose blocks | Why types differ in size and precision |
| Most statements end in `;` | Operator precedence and integer overflow |
| `cout` displays output; `cin` receives input | Function scope and return values |
| Comments use `//` or `/* … */` | Advanced compilation details |
| Writing, compiling and running are different stages | |

The things on the right aren't unimportant. They're simply much easier to understand once you have the basic vocabulary on the left.

## Your first exercise

Read this program carefully:

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << 5;
    cout << 8;
    return 0;
}
```

What exactly appears on the screen: `13`, `58`, or `5` and `8` on separate lines? And **why**?

Take a moment to reason it out before you reveal the answer. Build the habit of *predicting* what code does, rather than just recognising what it looks like.

> [!QUESTION]- What does the program print, and why?
> It prints `58`.
>
> - Not `13`: there is no `+`, so nothing is added. Each `cout` displays a number exactly as written.
> - Not two lines: neither statement outputs `'\n'`, so `8` is printed right where `5` stopped.
>
> To get two lines you would write `cout << 5 << '\n';` and `cout << 8 << '\n';`.

## Recap and practice

> [!SUMMARY] Chapter 0 in short
> - A **program** is a set of instructions the computer follows exactly.
> - Execution begins in **`main()`**; `#include` and `using` prepare the program.
> - **Statements** end with `;`. **Blocks** are wrapped in `{ }`.
> - Spaces and indentation are for humans; **comments** (`//`, `/* … */`) are ignored by the compiler.
> - Programs are **written**, then **compiled**, then **run**. Compile errors stop the program; logic errors give wrong answers.
> - `cin >>` brings data in; `cout <<` sends it out. Line breaks only happen when you ask for them with `'\n'`.

> [!QUESTION]- What is the job of `#include <iostream>`?
> It makes the standard input/output tools available, which is what lets us use `cout` and `cin`.

> [!QUESTION]- What would `cout << 3 << '\n' << 4;` print?
> `3` on the first line and `4` on the second, because `'\n'` sits between them.

> [!QUESTION]- Does `int main() {` end with a semicolon? Why or why not?
> No. `int main()` is followed by a block in braces, not ended like a statement. The statements *inside* the block end with semicolons.

> [!QUESTION]- A program compiles and runs, but prints the wrong total. What kind of error is that?
> A logic error. The code is valid C++, so it compiles and runs, but the instructions don't do what you intended.
