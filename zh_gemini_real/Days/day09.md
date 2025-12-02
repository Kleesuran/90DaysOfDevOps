```markdown
---
title: '#90DaysOfDevOps - Let''s explain the Hello World code - Day 9'
published: false
description: 90DaysOfDevOps - Let's explain the Hello World code
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1099682
---

## Let's explain the Hello World code
让我们来解释 Hello World 代码

### How Go works
Go 是如何工作的

On [Day 8](day08.md) we walked through getting Go installed on your workstation and we then created our first Go application.
在[第 8 天](day08.md)，我们详细介绍了如何在你的工作站上安装 Go，然后创建了我们的第一个 Go 应用程序。

In this section, we are going to take a deeper look into the code and understand a few more things about the Go language.
在本节中，我们将深入研究代码，并了解有关 Go 语言的更多知识。

### What is Compiling?
什么是编译？

Before we get into the [6 lines of the Hello World code](Go/hello.go) we need to have a bit of an understanding of compiling.
在深入了解[这 6 行 Hello World 代码](Go/hello.go)之前，我们需要对编译有一个基本的了解。

Programming languages that we commonly use such as Python, Java, Go and C++ are high-level languages. Meaning they are human-readable but when a machine is trying to execute a program it needs to be in a form that a machine can understand. We have to translate our human-readable code to machine code which is called compiling.
我们常用的编程语言，如 Python、Java、Go 和 C++，都是高级语言。这意味着它们是人类可读的，但当机器试图执行程序时，它需要以机器能够理解的形式存在。我们必须将人类可读的代码转换为机器代码，这个过程称为编译（compiling）。

![](Images/Day9_Go1.png)

From the above you can see what we did on [Day 8](day08.md) here, we created a simple Hello World main.go and we then used the command `go build main.go` to compile our executable.
从上图你可以看到我们在[第 8 天](day08.md)所做的事情：我们创建了一个简单的 Hello World `main.go` 文件，然后使用命令 `go build main.go` 来编译我们的可执行文件。

### What are packages?
什么是包？

A package is a collection of source files in the same directory that are compiled together. We can simplify this further, a package is a bunch of .go files in the same directory. Remember our Hello folder from Day 8? If and when you get into more complex Go programs you might find that you have folder1 folder2 and folder3 containing different.go files that make up your program with multiple packages.
包（Package）是同一目录中源代码文件的集合，它们被一起编译。我们可以进一步简化理解：一个包是同一目录中的一堆 `.go` 文件。还记得我们第 8 天创建的 Hello 文件夹吗？如果你接触到更复杂的 Go 程序，你可能会发现你有 `folder1`、`folder2` 和 `folder3` 文件夹，其中包含不同的 `.go` 文件，这些文件组成了包含多个包的程序。

We use packages so we can reuse other people's code, we don't have to write everything from scratch. Maybe we are wanting a calculator as part of our program, you could probably find an existing Go Package that contains the mathematical functions that you could import into your code saving you a lot of time and effort in the long run.
我们使用包是为了重用其他人的代码，我们不必从头开始编写所有内容。也许我们想要在程序中包含一个计算器功能，你很可能会找到一个现有的 Go 包，其中包含数学函数，你可以将其导入到你的代码中，从长远来看可以为你节省大量时间和精力。

Go encourages you to organise your code in packages so that it is easy to reuse and maintain source code.
Go 鼓励你以包的形式组织代码，以便于重用和维护源代码。

### Hello #90DaysOfDevOps Line by Line
Hello #90DaysOfDevOps 逐行分析

Now let's take a look at our Hello #90DaysOfDevOps main.go file and walk through the lines.
现在，让我们来看看我们的 Hello #90DaysOfDevOps `main.go` 文件并逐行进行分析。

![](Images/Day9_Go2.png)

In the first line, you have `package main` which means that this file belongs to a package called main. All .go files need to belong to a package, they should also have `package something` in the opening line.
在第一行，你看到 `package main`，这意味着该文件属于一个名为 `main` 的包。所有的 `.go` 文件都需要属于一个包，它们的首行也应该包含 `package something`。

A package can be named whatever you wish. We have to call this `main` as this is the starting point of the program that is going to be in this package, this is a rule. (I need to understand more about this rule?)
包可以随意命名。但我们必须将其命名为 `main`，因为这是将包含在该包中的程序的起始点，这是一条规则。（我需要对这条规则有更多的了解？）

![](Images/Day9_Go3.png)

Whenever we want to compile and execute our code we have to tell the machine where the execution needs to start. We do this by writing a function called main. The machine will look for a function called main to find the entry point of the program.
每当我们想要编译和执行代码时，我们都必须告诉机器程序执行需要从哪里开始。我们通过编写一个名为 `main` 的函数来实现这一点。机器会寻找一个名为 `main` 的函数来找到程序的入口点。

A function is a block of code that can do some specific task and can be used across the program.
函数（Function）是一块可以完成特定任务并在整个程序中使用的代码块。

You can declare a function with any name using `func` but in this case, we need to name it `main` as this is where the code starts.
你可以使用 `func` 声明任何名称的函数，但在这种情况下，我们需要将其命名为 `main`，因为这是代码开始执行的地方。

![](Images/Day9_Go4.png)

Next, we are going to look at line 3 of our code, the import, this means you want to bring in another package to your main program. fmt is a standard package being used here provided by Go, this package contains the `Println()` function and because we have imported this we can use this in line 6. There are several standard packages you can include in your program and leverage or reuse them in your code saving you the hassle of having to write from scratch. [Go Standard Library](https://pkg.go.dev/std)
接下来，我们将查看代码的第 3 行，即 `import`，这意味着你希望将另一个包引入到你的主程序中。 `fmt` 是 Go 提供的标准包，该包包含 `Println()` 函数，正因为我们导入了它，我们才能在第 6 行使用它。你可以将多个标准包包含在你的程序中，并在代码中利用或重用它们，从而为你省去从头编写的麻烦。[Go 标准库](https://pkg.go.dev/std)

![](Images/Day9_Go5.png)

the `Println()` that we have here is a way in which to write standard output to the terminal where ever the executable has been executed successfully. Feel free to change the message in between the ().
我们这里的 `Println()` 是一种将标准输出写入终端的方式，无论可执行文件在哪里成功执行。请随意更改括号之间的消息。

![](Images/Day9_Go6.png)

### TLDR
总结

- **Line 1** = This file will be in the package called `main` and this needs to be called `main` because includes the entry point of the program.
- **第 1 行** = 该文件将位于名为 `main` 的包中，并且必须命名为 `main`，因为它包含程序的入口点。
- **Line 3** = For us to use the `Println()` we have to import the fmt package to use this on line 6.
- **第 3 行** = 为了使用 `Println()`，我们必须导入 `fmt` 包，以便在第 6 行使用它。
- **Line 5** = The actual starting point, its the `main` function.
- **第 5 行** = 实际的起始点，即 `main` 函数。
- **Line 6** = This will let us print "Hello #90DaysOfDevOps" on our system.
- **第 6 行** = 这将允许我们在系统上打印出 "Hello #90DaysOfDevOps"。

## Resources
资源

- [StackOverflow 2021 Developer Survey](https://insights.stackoverflow.com/survey/2021)
- [Why we are choosing Golang to learn](https://www.youtube.com/watch?v=7pLqIIAqZD4&t=9s)
- [Jake Wright - Learn Go in 12 minutes](https://www.youtube.com/watch?v=C8LgvuEBraI&t=312s)
- [Techworld with Nana - Golang full course - 3 hours 24 mins](https://www.youtube.com/watch?v=yyUHQIec83I)
- [**NOT FREE** Nigel Poulton Pluralsight - Go Fundamentals - 3 hours 26 mins](https://www.pluralsight.com/courses/go-fundamentals)
- [FreeCodeCamp - Learn Go Programming - Golang Tutorial for Beginners](https://www.youtube.com/watch?v=YS4e4q9oBaU&t=1025s)
- [Hitesh Choudhary - Complete playlist](https://www.youtube.com/playlist?list=PLRAV69dS1uWSR89FRQGZ6q9BR2b44Tr9N)

See you on [Day 10](day10.md).
[第 10 天](day10.md)见。
```