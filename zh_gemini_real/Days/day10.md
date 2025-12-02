---
title: '#90DaysOfDevOps - The Go Workspace - Day 10'
published: false
description: 90DaysOfDevOps - The Go Workspace
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048701
---

### The Go Workspace

On [Day 8](day08.md) we briefly covered the Go workspace to get Go up and running to get to the demo of `Hello #90DaysOfDevOps` But we should explain a little more about the Go workspace.
在[第 8 天](day08.md)我们简要介绍了 Go 工作区，以便让 Go 运行起来并展示 `Hello #90DaysOfDevOps` 的演示。但我们应该对 Go 工作区进行更详细的解释。

Remember we chose the defaults and we then went through and created our Go folder in the GOPATH that was already defined but in reality, this GOPATH can be changed to be wherever you want it to be.
请记住，我们选择了默认设置，然后在已定义的 GOPATH 中创建了 Go 文件夹，但实际上，这个 GOPATH 可以更改为你想要的任何位置。

If you run
如果你运行

```
echo $GOPATH
```

The output should be similar to mine (with a different username may be) which is:
输出结果应该与我的类似（用户名可能不同），即：

```
/home/michael/projects/go
```

Then here, we created 3 directories. **src**, **pkg** and **bin**
接着，在这里我们创建了 3 个目录：**src**、**pkg** 和 **bin**

![](Images/Day10_Go1.png)

**src** is where all of your Go programs and projects are stored. This handles namespacing package management for all your Go repositories. This is where you will see on our workstation we have our Hello folder for the Hello #90DaysOfDevOps project.
**src** 是存储所有 Go 程序和项目的地方。它负责处理所有 Go 仓库的命名空间包管理。您可以看到在我们的工作站中，我们有一个用于 Hello #90DaysOfDevOps 项目的 Hello 文件夹。

![](Images/Day10_Go2.png)

**pkg** is where your archived files of packages that are or were installed in programs. This helps to speed up the compiling process based on if the packages being used have been modified.
**pkg** 是存储已安装或曾在程序中安装过的包的归档文件的地方。这有助于根据所使用的包是否已修改来加快编译过程。

![](Images/Day10_Go3.png)

**bin** is where all of your compiled binaries are stored.
**bin** 是存储所有已编译的二进制文件的地方。

![](Images/Day10_Go4.png)

Our Hello #90DaysOfDevOps is not a complex program so here is an example of a more complex Go Program taken from another great resource worth looking at [GoChronicles](https://gochronicles.com/)
我们的 Hello #90DaysOfDevOps 不是一个复杂的程序，因此这里有一个更复杂的 Go 程序的示例，该示例取自另一个值得一看的优秀资源 [GoChronicles](https://gochronicles.com/)

![](Images/Day10_Go5.png)

This page also goes into some great detail about why and how the layout is like this it also goes a little deeper on other folders we have not mentioned [GoChronicles](https://gochronicles.com/project-structure/)
该页面还详细介绍了为什么以及如何形成这种布局，并对我们尚未提及的其他文件夹进行了更深入的探讨 [GoChronicles](https://gochronicles.com/project-structure/)

### Compiling & running code

On [Day 9](day09.md) we also covered a brief introduction to compiling code, but we can go a little deeper here.
在[第 9 天](day09.md)我们还简要介绍了代码编译，但我们可以在这里进行更深入的探讨。

To run our code we first must **compile** it. There are three ways to do this within Go.
为了运行我们的代码，我们首先必须**编译**它。在 Go 中有三种方法可以做到这一点。

- go build
- go install
- go run

Before we get to the above compile stage we need to take a look at what we get with the Go Installation.
在进入上述编译阶段之前，我们需要了解一下 Go 安装为我们提供了什么。

When we installed Go on Day 8 we installed something known as Go tools which consist of several programs that let us build and process our Go source files. One of the tools is `Go`
当我们在第 8 天安装 Go 时，我们安装了所谓的 Go 工具，它由几个程序组成，允许我们构建和处理 Go 源文件。其中一个工具就是 `Go`

It is worth noting that you can install additional tools that are not in the standard Go installation.
值得注意的是，您可以安装标准 Go 安装中不包含的附加工具。

If you open your command prompt and type `go` you should see something like the image below and then you will see "Additional Help Topics" below that for now we don't need to worry about those.
如果您打开命令行并键入 `go`，您应该会看到类似于下面的图像，然后您会看到“Additional Help Topics”（附加帮助主题），目前我们不需要担心这些。

![](Images/Day10_Go6.png)

You might also remember that we have already used at least two of these tools so far on Day 8.
您可能还记得，到目前为止，我们在第 8 天已经使用了至少两个这些工具。

![](Images/Day10_Go7.png)

The ones we want to learn more about are the build, install and run.
我们想了解更多的是 build（构建）、install（安装）和 run（运行）。

![](Images/Day10_Go8.png)

- `go run` - This command compiles and runs the main package comprised of the .go files specified on the command line. The command is compiled to a temporary folder.
- `go run` - 此命令编译并运行由命令行上指定的 .go 文件组成的主包。该命令被编译到一个临时文件夹中。
- `go build` - To compile packages and dependencies, compile the package in the current directory. If Go project contains a `main` package, it will create and place the executable in the current directory if not then it will put the executable in the `pkg` folder, and that can be imported and used by other Go programs. `go build` also enables you to build an executable file for any Go Supported OS platform.
- `go build` - 用于编译包和依赖项，编译当前目录中的包。如果 Go 项目包含 `main` 包，它将在当前目录中创建并放置可执行文件；如果不是，它将把可执行文件放在 `pkg` 文件夹中，然后可以被其他 Go 程序导入和使用。`go build` 还允许您为任何 Go 支持的操作系统平台构建可执行文件。
- `go install` - The same as go build but will place the executable in the `bin` folder.
- `go install` - 与 go build 相同，但会将可执行文件放置在 `bin` 文件夹中。

We have run through go build and go run but feel free to run through them again here if you wish, `go install` as stated above puts the executable in our bin folder.
我们已经运行了 go build 和 go run，如果您愿意，可以再次在这里运行它们，如上所述，`go install` 会将可执行文件放入我们的 bin 文件夹中。

![](Images/Day10_Go9.png)

Hopefully, if you are following along, you are watching one of the playlists or videos below. I am taking bits of all of these and translating these into my notes so that I can understand the foundational knowledge of the Golang language. The resources below are likely going to give you a much better understanding of a lot of the areas you need overall, but I am trying to document the 7 days or 7 hours worth of the journey with interesting things that I have found.
希望您如果一直跟着学习，正在观看下面的播放列表或视频之一。我正在从所有这些资源中提取部分内容并将其转化为我的笔记，以便理解 Golang 语言的基础知识。下面的资源可能会让您对所需的许多领域有更好的整体理解，但我正在尝试记录我发现的有趣事物，来记录这 7 天或 7 小时的学习旅程。

## Resources

- [StackOverflow 2021 Developer Survey](https://insights.stackoverflow.com/survey/2021)
- [Why we are choosing Golang to learn](https://www.youtube.com/watch?v=7pLqIIAqZD4&t=9s)
- [Jake Wright - Learn Go in 12 minutes](https://www.youtube.com/watch?v=C8LgvuEBraI&t=312s)
- [Techworld with Nana - Golang full course - 3 hours 24 mins](https://www.youtube.com/watch?v=yyUHQIec83I)
- [**NOT FREE** Nigel Poulton Pluralsight - Go Fundamentals - 3 hours 26 mins](https://www.pluralsight.com/courses/go-fundamentals)
- [FreeCodeCamp - Learn Go Programming - Golang Tutorial for Beginners](https://www.youtube.com/watch?v=YS4e4q9oBaU&t=1025s)
- [Hitesh Choudhary - Complete playlist](https://www.youtube.com/playlist?list=PLRAV69dS1uWSR89FRQGZ6q9BR2b44Tr9N)

See you on [Day 11](day11.md).
[第 11 天](day11.md)见。
