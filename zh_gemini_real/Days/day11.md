---
title: '#90DaysOfDevOps - Variables & Constants in Go - Day 11'
published: false
description: 90DaysOfDevOps - Variables & Constants in Go
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048862
---

Before we get into the topics for today I want to give a massive shout out to [Techworld with Nana](https://www.youtube.com/watch?v=yyUHQIec83I) and this fantastic concise journey through the fundamentals of Go.
在我们开始今天的学习主题之前，我想向 [Techworld with Nana](https://www.youtube.com/watch?v=yyUHQIec83I) 致以崇高的敬意，感谢他们提供的关于 Go 基础知识的精彩简洁的旅程。

On [Day8](day08.md) we set our environment up, on [Day9](day09.md) we walked through the Hello #90DaysOfDevOps code and on [Day10](day10.md) we looked at our Go workspace and went a little deeper into compiling and running the code.
在 [第 8 天](day08.md)，我们设置了环境；在 [第 9 天](day09.md)，我们学习了 Hello #90DaysOfDevOps 代码；在 [第 10 天](day10.md)，我们研究了 Go 工作区并深入了解了编译和运行代码。

Today we are going to take a look into Variables, Constants and Data Types whilst writing a new program.
今天，我们将通过编写一个新程序来研究变量（Variables）、常量（Constants）和数据类型（Data Types）。

## Variables & Constants in Go

Let's start by planning our application, I think it would be a good idea to work on a program that tells us how many days we have remained in our #90DaysOfDevOps challenge.
让我们从规划我们的应用程序开始，我认为开发一个程序来告诉我们 #90DaysOfDevOps 挑战还剩下多少天会是一个好主意。

The first thing to consider here is that as we are building our app and we are welcoming our attendees and we are giving the user feedback on the number of days they have completed we might use the term #90DaysOfDevOps many times throughout the program. This is a great use case to make #90DaysOfDevOps a variable within our program.
这里要考虑的第一件事是，当我们构建应用程序、欢迎参与者并向用户提供他们已完成天数的反馈时，我们可能会在整个程序中多次使用术语 #90DaysOfDevOps。这是一个很好的用例，可以将 #90DaysOfDevOps 作为程序中的一个变量。

- Variables are used to store values.
- 变量用于存储值。
- Like a little box with our saved information or values.
- 就像一个装有我们保存的信息或值的小盒子。
- We can then use this variable across the program which also benefits that if this challenge or variable changes then we only have to change this in one place. This means we could translate this to other challenges we have in the community by just changing that one variable value.
- 然后我们可以在整个程序中使用此变量，这样做的好处是，如果这个挑战或变量发生变化，我们只需要在一个地方进行更改。这意味着我们只需更改该变量值，就可以将其应用于社区中的其他挑战。

To declare this in our Go Program we define a value by using a **keyword** for variables. This will live within our `func main` block of code that you will see later. You can find more about [Keywords](https://go.dev/ref/spec#Keywords) here.
要在我们的 Go 程序中声明它，我们使用变量的**关键字**来定义一个值。这将在我们的 `func main` 代码块中，您稍后会看到。您可以在此处找到有关 [关键字（Keywords）](https://go.dev/ref/spec#Keywords) 的更多信息。

Remember to make sure that your variable names are descriptive. If you declare a variable you must use it or you will get an error, this is to avoid possible dead code, code that is never used. This is the same for packages not used.
请记住确保您的变量名称具有描述性。如果声明了一个变量，则必须使用它，否则您将收到错误，这是为了避免可能的死代码（即从不使用的代码）。对于未使用的包（packages）也是如此。

```
var challenge = "#90DaysOfDevOps"
```

With the above set and used as we will see in the next code snippet you can see from the output below that we have used a variable.
如我们在下一个代码片段中看到的，通过设置和使用上述变量，您可以从下面的输出中看到我们已经使用了变量。

```go
package main

import "fmt"

func main() {
    var challenge = "#90DaysOfDevOps"
    fmt.Println("Welcome to", challenge, "")
}
```

You can find the above code snippet in [day11_example1.go](Go/day11_example1.go)
您可以在 [day11_example1.go](Go/day11_example1.go) 中找到上面的代码片段。

You will then see from the below that we built our code with the above example and we got the output shown below.
您将从下面看到，我们使用上面的示例构建了代码，并得到了如下所示的输出。

![](Images/Day11_Go1.png)

We also know that our challenge is 90 days at least for this challenge, but next, maybe it's 100 so we want to define a variable to help us here as well. However, for our program, we want to define this as a constant. Constants are like variables, except that their value cannot be changed within code (we can still create a new app later on down the line with this code and change this constant but this 90 will not change while we are running our application)
我们还知道，至少对于本次挑战而言，我们的挑战是 90 天，但下一次，也许是 100 天，所以我们也想在这里定义一个变量来帮助我们。然而，对于我们的程序，我们希望将其定义为常量（constant）。常量与变量类似，不同之处在于它们的值不能在代码中更改（我们稍后仍然可以使用此代码创建一个新应用程序并更改此常量，但在我们运行应用程序时，这个 90 将保持不变）。

Adding the `const` to our code and adding another line of code to print this.
在我们的代码中添加 `const` 并添加另一行代码来打印它。

```go
package main

import "fmt"

func main() {
    var challenge = "#90DaysOfDevOps"
    const daystotal = 90

    fmt.Println("Welcome to", challenge, "")
    fmt.Println("This is a", daystotal, "challenge")
}
```

You can find the above code snippet in [day11_example2.go](Go/day11_example2.go)
您可以在 [day11_example2.go](Go/day11_example2.go) 中找到上面的代码片段。

If we then go through that `go build` process again and run you will see below the outcome.
如果然后我们再次进行 `go build` 过程并运行，您将在下面看到结果。

![](Images/Day11_Go2.png)

Finally, and this won't be the end of our program we will come back to this in [Day12](day12.md) to add more functionality. We now want to add another variable for the number of days we have completed the challenge.
最后，虽然这不会是我们程序的结尾（我们将在 [第 12 天](day12.md) 回顾它以添加更多功能），但我们现在想添加另一个变量来表示我们已完成挑战的天数。

Below I added the `dayscomplete` variable with the number of days completed.
我在下面添加了 `dayscomplete` 变量，其中包含已完成的天数。

```go
package main

import "fmt"

func main() {
    var challenge = "#90DaysOfDevOps"
    const daystotal = 90
    var dayscomplete = 11

    fmt.Println("Welcome to", challenge, "")
    fmt.Println("This is a", daystotal, "challenge and you have completed", dayscomplete, "days")
    fmt.Println("Great work")
}
```

You can find the above code snippet in [day11_example3.go](Go/day11_example3.go)
您可以在 [day11_example3.go](Go/day11_example3.go) 中找到上面的代码片段。

Let's run through that `go build` process again or you could just use `go run`
让我们再次执行 `go build` 过程，或者您也可以直接使用 `go run`。

![](Images/Day11_Go3.png)

Here are some other examples that I have used to make the code easier to read and edit. We have up till now been using `Println` but we can simplify this by using `Printf` by using `%v` which means we define our variables in order at the end of the line of code. we also use `\n` for a line break.
这里还有一些我用来使代码更易于阅读和编辑的其他示例。到目前为止，我们一直在使用 `Println`，但我们可以通过使用 `Printf` 并使用 `%v` 来简化它，这意味着我们在代码行的末尾按顺序定义变量。我们还使用 `\n` 进行换行。

I am using `%v` as this uses a default value but there are other options that can be found here in the [fmt package documentation](https://pkg.go.dev/fmt) you can find the code example [day11_example4.go](Go/day11_example4.go)
我使用 `%v` 是因为它使用了默认值，但在 [fmt 包文档](https://pkg.go.dev/fmt) 中可以找到其他选项，您可以在 [day11_example4.go](Go/day11_example4.go) 中找到代码示例。

Variables may also be defined in a simpler format in your code. Instead of defining that it is a `var` and the `type` you can code this as follows to get the same functionality but a nice cleaner and simpler look for your code. This will only work for variables though and not constants.
变量也可以用更简单的格式在您的代码中定义。您可以像下面这样编写代码，而不是定义它是 `var` 和 `type`，从而获得相同的功能，但代码看起来更简洁、更简单。请注意，这仅适用于变量，不适用于常量。

```go
func main() {
    challenge := "#90DaysOfDevOps"
    const daystotal = 90
```

## Data Types

In the above examples, we have not defined the type of variables, this is because we can give it a value here and Go is smart enough to know what that type is or at least can infer what it is based on the value you have stored. However, if we want a user to input this will require a specific type.
在上面的示例中，我们没有定义变量的类型，这是因为我们可以在此处赋予它一个值，Go 足够智能，知道该类型是什么，或者至少可以根据您存储的值来推断它是什么。但是，如果我们想要用户输入，则需要特定类型。

We have used Strings and Integers in our code so far. Integers for the number of days and strings are for the name of the challenge.
到目前为止，我们在代码中使用了字符串（Strings）和整数（Integers）。整数用于表示天数，字符串用于表示挑战的名称。

It is also important to note that each data type can do different things and behaves differently. For example, integers can multiply where strings do not.
同样重要的是要注意，每种数据类型可以执行不同的操作并且行为不同。例如，整数可以进行乘法运算，而字符串则不能。

There are four categories
数据类型有四个类别：

- **Basic type**: Numbers, strings, and booleans come under this category.
- **基本类型（Basic type）**：数字、字符串和布尔值属于此类。
- **Aggregate type**: Array and structs come under this category.
- **聚合类型（Aggregate type）**：数组和结构体属于此类。
- **Reference type**: Pointers, slices, maps, functions, and channels come under this category.
- **引用类型（Reference type）**：指针、切片、映射、函数和通道属于此类。
- **Interface type**
- **接口类型（Interface type）**

The data type is an important concept in programming. Data type specifies the size and type of variable values.
数据类型是编程中的一个重要概念。数据类型指定变量值的大小和类型。

Go is statically typed, meaning that once a variable type is defined, it can only store data of that type.
Go 是静态类型的，这意味着一旦定义了变量类型，它只能存储该类型的数据。

Go has three basic data types:
Go 有三种基本数据类型：

- **bool**: represents a boolean value and is either true or false
- **bool**：表示布尔值，只能是 true 或 false。
- **Numeric**: represents integer types, floating-point values, and complex types
- **Numeric（数字）**：表示整数类型、浮点值和复杂类型。
- **string**: represents a string value
- **string（字符串）**：表示一个字符串值。

I found this resource super detailed on data types [Golang by example](https://golangbyexample.com/all-data-types-in-golang-with-examples/)
我发现这个资源对数据类型进行了超级详细的解释：[Golang by example](https://golangbyexample.com/all-data-types-in-golang-with-examples/)

I would also suggest [Techworld with Nana](https://www.youtube.com/watch?v=yyUHQIec83I&t=2023s) at this point covers in detail a lot about the data types in Go.
我还建议 [Techworld with Nana](https://www.youtube.com/watch?v=yyUHQIec83I&t=2023s) 在这一点上详细介绍了 Go 中的许多数据类型。

If we need to define a type in our variable we can do this like so:
如果我们需要在变量中定义类型，我们可以这样做：

```go
var TwitterHandle string
var DaysCompleted uint
```

Because Go implies variables where a value is given we can print out those values with the following:
因为 Go 会对给定值的变量进行类型推断，我们可以用以下方式打印出这些值：

```go
fmt.Printf("challenge is %T, daystotal is %T, dayscomplete is %T\n", conference, daystotal, dayscomplete)
```

There are many different types of integer and float types the links above will cover these in detail.
整数类型和浮点类型有许多不同的种类，上面的链接将详细介绍这些内容。

- **int** = whole numbers
- **int** = 整数（可正可负）
- **unint** = positive whole numbers
- **unint** = 正整数
- **floating point types** = numbers that contain a decimal component
- **floating point types（浮点类型）** = 包含小数部分的数字

## Resources

- [StackOverflow 2021 Developer Survey](https://insights.stackoverflow.com/survey/2021)
- [Why we are choosing Golang to learn](https://www.youtube.com/watch?v=7pLqIIAqZD4&t=9s)
- [Jake Wright - Learn Go in 12 minutes](https://www.youtube.com/watch?v=C8LgvuEBraI&t=312s)
- [Techworld with Nana - Golang full course - 3 hours 24 mins](https://www.youtube.com/watch?v=yyUHQIec83I)
- [**NOT FREE** Nigel Poulton Pluralsight - Go Fundamentals - 3 hours 26 mins](https://www.pluralsight.com/courses/go-fundamentals)
- [FreeCodeCamp - Learn Go Programming - Golang Tutorial for Beginners](https://www.youtube.com/watch?v=YS4e4q9oBaU&t=1025s)
- [Hitesh Choudhary - Complete playlist](https://www.youtube.com/playlist?list=PLRAV69dS1uWSR89FRQGZ6q9BR2b44Tr9N)

Next up we are going to start adding some user input functionality to our program so that we are asked how many days have been completed.
接下来，我们将开始为我们的程序添加一些用户输入功能，以便程序询问我们已完成了多少天。

See you on [Day 12](day12.md).
[第 12 天](day12.md) 见。