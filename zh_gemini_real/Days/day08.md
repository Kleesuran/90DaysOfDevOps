---
title: '#90DaysOfDevOps - Setting up your DevOps environment for Go & Hello World - Day 8'
published: false
description: 90DaysOfDevOps - Setting up your DevOps environment for Go & Hello World
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048857
---

## Setting up your DevOps environment for Go & Hello World

Before we get into some of the fundamentals of Go we should get Go installed on our workstation and do what every "learning programming 101" module teaches us which is to create the Hello World app.
在深入了解 Go 的一些基础知识之前，我们应该在工作站上安装 Go，并完成所有“编程入门 101”模块都会教我们的任务——创建一个 Hello World 应用程序。
As this one is going to be walking through the steps to get Go installed on your workstation we are going to attempt to document the process in pictures so people can easily follow along.
由于本文将逐步指导您在工作站上安装 Go，我们将尝试通过图片来记录整个过程，以便读者轻松跟进。

First of all, let's head on over to [go.dev/dl](https://go.dev/dl/) and you will be greeted with some available options for downloads.
首先，让我们前往 [go.dev/dl](https://go.dev/dl/)，您将看到一些可用的下载选项。

![](Images/Day8_Go1.png)

If we made it this far you probably know which workstation operating system you are running so select the appropriate download and then we can get installing.
如果已经走到这一步，您可能知道您的工作站运行的是哪种操作系统，因此请选择相应的下载项，然后我们就可以开始安装了。
I am using Windows for this walkthrough, basically, from this next screen, we can leave all the defaults in place for now. **_(I will note that at the time of writing this was the latest version so screenshots might be out of date)_**
我在本次演练中使用的是 Windows；基本上，从下一个屏幕开始，我们可以暂时保留所有默认设置。**_(我要指出，在撰写本文时，这是最新版本，因此屏幕截图可能会过时)_**

![](Images/Day8_Go2.png)

Also note if you do have an older version of Go installed you will have to remove this before installing, Windows has this built into the installer and will remove and install as one.
另请注意，如果您安装了旧版本的 Go，则必须在安装前将其删除。Windows 安装程序内置了此功能，将一次性完成删除和安装。

Once finished you should now open a command prompt/terminal and we want to check that we have to Go installed.
完成后，您现在应该打开命令提示符/终端，我们需要检查 Go 是否已安装。
If you do not get the output that we see below then Go is not installed and you will need to retrace your steps.
如果您没有看到下面的输出，则表示 Go 未安装，您需要重新检查安装步骤。

`go version`

![](Images/Day8_Go3.png)

Next up we want to check our environment for Go.
接下来我们要检查 Go 的环境配置。
This is always good to check to make sure your working directories are configured correctly, as you can see below we need to make sure you have the following directory on your system.
检查这一点总是有益的，以确保您的工作目录配置正确。如您在下方所见，我们需要确保您的系统上有以下目录。

![](Images/Day8_Go4.png)

Did you check? Are you following along?
您检查了吗？您是否跟上了进度？
You will probably get something like the below if you try and navigate there.
如果您尝试导航到该路径，可能会看到类似下面的结果。

![](Images/Day8_Go5.png)

Ok, let's create that directory for ease I am going to use the mkdir command in my PowerShell terminal.
好的，为了方便起见，我们来创建该目录。我将在 PowerShell 终端中使用 `mkdir` 命令。
We also need to create 3 folders within the Go folder as you will see also below.
我们还需要在 Go 文件夹内创建 3 个子文件夹，如下所示。

![](Images/Day8_Go6.png)

Now we have to Go installed and we have our Go working directory ready for action.
现在我们已经安装了 Go 并准备好了 Go 工作目录。
We now need an integrated development environment (IDE) Now there are many out there available that you can use but the most common and the one I use is Visual Studio Code or Code.
我们现在需要一个集成开发环境 (IDE)。市面上有许多可用的 IDE，但我使用且最常见的是 Visual Studio Code（或简称 Code）。
You can learn more about IDEs [here](https://www.youtube.com/watch?v=vUn5akOlFXQ).
您可以在[此处](https://www.youtube.com/watch?v=vUn5akOlFXQ)了解有关 IDE 的更多信息。

If you have not downloaded and installed VSCode already on your workstation then you can do so by heading [here](https://code.visualstudio.com/download).
如果您的工作站尚未下载并安装 VSCode，您可以前往[此处](https://code.visualstudio.com/download)进行下载。
As you can see below you have your different OS options.
正如您在下方所见，您有不同的操作系统选项。

![](Images/Day8_Go7.png)

Much the same as with the Go installation we are going to download and install and keep the defaults.
与 Go 安装非常相似，我们将下载并安装，并保留默认设置。
Once complete you can open VSCode you can select Open File and navigate to our Go directory that we created above.
完成后，您可以打开 VSCode，选择“打开文件”，并导航到我们上面创建的 Go 目录。

![](Images/Day8_Go8.png)

You may get a popup about trust, read it if you want and then hit Yes, trust the authors.
您可能会收到一个关于信任的弹出窗口，如果您愿意，可以阅读它，然后点击“是，信任作者”。
(I am not responsible later on though if you start opening things you don't trust!)
(如果您以后打开了不信任的东西，我可不负责任！)

Now you should see the three folders we also created earlier as well and what we want to do now is right click the src folder and create a new folder called `Hello`
现在您应该会看到我们之前创建的三个文件夹。我们现在要做的就是右键单击 `src` 文件夹并创建一个名为 `Hello` 的新文件夹。

![](Images/Day8_Go9.png)

Pretty easy stuff I would say up till this point?
我想说，到目前为止一切都很简单，对吧？
Now we are going to create our first Go Program with no understanding of anything we put in this next phase.
现在我们将创建我们的第一个 Go 程序，尽管我们可能对下一步输入的任何内容都没有理解。

Next, create a file called `main.go` in your `Hello` folder.
接下来，在您的 `Hello` 文件夹中创建一个名为 `main.go` 的文件。
As soon as you hit enter on the main.go you will be asked if you want to install the Go extension and also packages you can also check that empty pkg file that we made a few steps back and notice that we should have some new packages in there now?
一旦您在 main.go 上按下 Enter 键，系统将询问您是否要安装 Go 扩展和相关包。您也可以检查几步前我们创建的那个空的 pkg 文件，并注意到现在里面应该有一些新的包了？

![](Images/Day8_Go10.png)

Now let's get this Hello World app going, copy the following code into your new main.go file and save that.
现在，让我们运行这个 Hello World 应用程序。将以下代码复制到您的新 `main.go` 文件中并保存。

```
package main

import "fmt"

func main() {
    fmt.Println("Hello #90DaysOfDevOps")
}
```

Now I appreciate that the above might make no sense at all, but we will cover more about functions, packages and more in later days.
我知道上面的代码可能完全没有意义，但我们将在以后的日子里讨论有关函数（functions）、包（packages）等更多内容。
For now, let's run our app. Back in the terminal and in our Hello folder we can now check that all is working.
现在，让我们运行我们的应用程序。回到终端，在我们的 Hello 文件夹中，我们现在可以检查一切是否正常运行。
Using the command below we can check to see if our generic learning program is working.
使用下面的命令，我们可以检查我们的通用学习程序是否正在工作。

```
go run main.go
```

![](Images/Day8_Go11.png)

It doesn't end there though, what if we now want to take our program and run it on other Windows machines?
但故事还没有结束。如果我们现在想将我们的程序带到其他 Windows 机器上运行呢？
We can do that by building our binary using the following command
我们可以使用以下命令构建我们的二进制文件：

```
go build main.go
```

![](Images/Day8_Go12.png)

If we run that, we would see the same output:
如果我们运行它，我们将看到相同的输出：

```bash
$ ./main.exe
Hello #90DaysOfDevOps
```

## Resources

- [StackOverflow 2021 Developer Survey](https://insights.stackoverflow.com/survey/2021)
- [Why we are choosing Golang to learn](https://www.youtube.com/watch?v=7pLqIIAqZD4&t=9s)
- [Jake Wright - Learn Go in 12 minutes](https://www.youtube.com/watch?v=C8LgvuEBraI&t=312s)
- [Techworld with Nana - Golang full course - 3 hours 24 mins](https://www.youtube.com/watch?v=yyUHQIec83I)
- [**NOT FREE** Nigel Poulton Pluralsight - Go Fundamentals - 3 hours 26 mins](https://www.pluralsight.com/courses/go-fundamentals)
- [FreeCodeCamp - Learn Go Programming - Golang Tutorial for Beginners](https://www.youtube.com/watch?v=YS4e4q9oBaU&t=1025s)
- [Hitesh Choudhary - Complete playlist](https://www.youtube.com/playlist?list=PLRAV69dS1uWSR89FRQGZ6q9BR2b44Tr9N)

See you on [Day 9](day09.md).
第 9 天见：[Day 9](day09.md)。

![](Images/Day8_Go13.png)