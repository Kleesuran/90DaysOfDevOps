---
title: '#90DaysOfDevOps - Getting user input with Pointers and a finished program - Day 12'
published: false
description: 90DaysOfDevOps - Getting user input with Pointers and a finished program
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048864
---

## Getting user input with Pointers and a finished program

Yesterday ([Day 11](day11.md)), we created our first Go program that was self-contained and the parts we wanted to get user input for were created as variables within our code and given values, we now want to ask the user for their input to give the variable the value for the end message.
昨天（[第 11 天](day11.md)），我们创建了第一个独立的 Go 程序，其中我们希望获取用户输入的那些部分作为变量在代码中创建并赋予了值。现在，我们希望向用户请求输入，以便为最终消息中的变量赋值。

## Getting user input

Before we do that let's take a look at our application again and walk through the variables we want as a test before getting that user input.
在此之前，让我们再次查看我们的应用程序，并在获取用户输入之前，像进行测试一样遍历我们需要的变量。

Yesterday we finished up with our code looking like this [day11_example4.go](Go/day11_example4.go) we have manually in code defined our `challenge, daystotal, dayscomplete` variables and constants.
昨天，我们的代码完成时看起来像这样 [day11_example4.go](Go/day11_example4.go)，我们在代码中手动定义了 `challenge, daystotal, dayscomplete` 这些变量和常量。

Let's now add a new variable called `TwitterName` you can find this new code at [day12_example1.go](Go/day12_example1.go) and if we run this code this is our output.
现在我们添加一个名为 `TwitterName` 的新变量，您可以在 [day12_example1.go](Go/day12_example1.go) 中找到这段新代码，如果我们运行此代码，这是我们的输出。

![](Images/Day12_Go1.png)

We are on day 12 and we would need to change that `dayscomplete` every day and compile our code each day if this was hardcoded which doesn't sound so great.
我们现在是第 12 天，如果这些数值是硬编码的，我们每天都需要更改 `dayscomplete` 并每天重新编译代码，这听起来不太好。

Getting user input, we want to get the value of maybe a name and the number of days completed. For us to do this we can use another function from within the `fmt` package.
为了获取用户输入，我们可能希望获取姓名以及已完成天数的值。为此，我们可以使用 `fmt` 包中的另一个函数。

Recap on the `fmt` package, different functions for formatted input and output (I/O)
回顾 `fmt` 包，用于格式化输入和输出 (I/O) 的不同函数：

- Print Messages
- Collect User Input
- Write into a file

This is instead of assigning the value of a variable we want to ask the user for their input.
这取代了我们直接为变量赋值的做法，而是希望向用户询问输入。

```
fmt.Scan(&TwitterName)
```

Notice that we also use `&` before the variable. This is known as a pointer which we will cover in the next section.
请注意，我们在变量前面使用了 `&` 符号。这被称为指针 (pointer)，我们将在下一节中介绍它。

In our code [day12_example2.go](Go/day12_example2.go) you can see that we are asking the user to input two variables, `TwitterName` and `DaysCompleted`
在我们的代码 [day12_example2.go](Go/day12_example2.go) 中，您可以看到我们要求用户输入两个变量：`TwitterName` 和 `DaysCompleted`。

Let's now run our program and you see we have input for both of the above.
现在我们运行程序，您可以看到我们为上述两个变量都进行了输入。

![](Images/Day12_Go2.png)

Ok, that's great we got some user input and we printed a message but what about getting our program to tell us how many days we have left in our challenge.
好的，我们获得了用户输入并打印了一条消息，这很棒，但如何让程序告诉我们挑战还剩下多少天呢？

For us to do that we have created a variable called `remainingDays` and we have hard valued this in our code as `90` we then need to change the value of this value to print out the remaining days when we get our user input of `DaysCompleted` we can do this with this simple variable change.
为此，我们创建了一个名为 `remainingDays` 的变量，并在代码中将其硬赋值为 `90`。然后，我们需要更改这个变量的值，以便在我们获得用户输入的 `DaysCompleted` 时打印出剩余天数。我们可以通过这种简单的变量更改来实现这一点。

```
remainingDays = remainingDays - DaysCompleted
```

You can see how our finished program looks here [day12_example2.go](Go/day12_example3.go).
您可以在此处查看我们最终程序的样式 [day12_example2.go](Go/day12_example3.go)。

If we now run this program you can see that simple calculation is made based on the user input and the value of the `remainingDays`
如果我们现在运行此程序，您可以看到程序根据用户输入和 `remainingDays` 的值进行了简单的计算。

![](Images/Day12_Go3.png)

## What is a pointer? (Special Variables)

A pointer is a (special) variable that points to the memory address of another variable.
指针是一种（特殊）变量，它指向另一个变量的内存地址。

A great explanation of this can be found here at [geeksforgeeks](https://www.geeksforgeeks.org/pointers-in-golang/)
您可以在 [geeksforgeeks](https://www.geeksforgeeks.org/pointers-in-golang/) 找到对此的精彩解释。

Let's simplify our code now and show with and without the `&` in front of one of our print commands, this gives us the memory address of the pointer. I have added this code example here. [day12_example4.go](Go/day12_example4.go)
现在让我们简化代码，展示在其中一个打印命令前有和没有 `&` 的区别，这为我们提供了指针的内存地址。我在此处添加了此代码示例：[day12_example4.go](Go/day12_example4.go)。

Below is running this code.
下面是运行此代码的结果。

![](Images/Day12_Go4.png)

## Resources

- [StackOverflow 2021 Developer Survey](https://insights.stackoverflow.com/survey/2021)
- [Why we are choosing Golang to learn](https://www.youtube.com/watch?v=7pLqIIAqZD4&t=9s)
- [Jake Wright - Learn Go in 12 minutes](https://www.youtube.com/watch?v=C8LgvuEBraI&t=312s)
- [Techworld with Nana - Golang full course - 3 hours 24 mins](https://www.youtube.com/watch?v=yyUHQIec83I)
- [**NOT FREE** Nigel Poulton Pluralsight - Go Fundamentals - 3 hours 26 mins](https://www.pluralsight.com/courses/go-fundamentals)
- [FreeCodeCamp - Learn Go Programming - Golang Tutorial for Beginners](https://www.youtube.com/watch?v=YS4e4q9oBaU&t=1025s)
- [Hitesh Choudhary - Complete playlist](https://www.youtube.com/playlist?list=PLRAV69dS1uWSR89FRQGZ6q9BR2b44Tr9N)

See you on [Day 13](day13.md).
[第 13 天](day13.md) 见。
