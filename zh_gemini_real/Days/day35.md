---
title: '#90DaysOfDevOps - The Big Picture: Git - Version Control - Day 35'
published: false
description: 90DaysOfDevOps - The Big Picture Git - Version Control
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049041
---

## The Big Picture: Git - Version Control

Before we get into git, we need to understand what version control is and why? In this opener for Git, we will take a look at what version control is, and the basics of git.
在我们深入了解 Git 之前，我们需要理解什么是版本控制以及为什么需要它？作为 Git 的开篇介绍，我们将探讨版本控制是什么以及 Git 的基础知识。

### What is Version Control?

Git is not the only version control system so here we want to cover what options and what methodologies are available around version control.
Git 并不是唯一的版本控制系统，因此在这里我们希望涵盖版本控制有哪些可选方案和方法论。

The most obvious and a big benefit of Version Control is the ability to track a project's history. We can look back over this repository using `git log` and see that we have many commits and many comments and what has happened so far in the project. Don't worry we will get into the commands later. Now think if this was an actual software project full of source code and multiple people are committing to our software at different times, different authors and then reviewers all are logged here so that we know what has happened, when, by whom and who reviewed.
版本控制最明显和最大的好处是能够追踪项目的历史记录。我们可以使用 `git log` 来回顾这个仓库，查看我们进行了多少次提交、多少条注释以及项目到目前为止发生了什么。别担心，稍后我们会详细介绍这些命令。现在想象一下，如果这是一个实际的软件项目，充满了源代码，并且多个人在不同时间向我们的软件提交代码，不同的作者和审阅者都会在这里被记录下来，这样我们就能知道发生了什么、何时发生、由谁操作以及谁进行了审阅。

![](Images/Day35_Git1.png)

Version Control before it was cool, would have been something like manually creating a copy of your version before you made changes. It might be that you also comment out old useless code with the just-in-case mentality.
在版本控制尚未流行之前，它可能类似于在进行更改之前手动创建你的版本副本。你也可能会抱着以防万一的心态，注释掉旧的、无用的代码。

![](Images/Day35_Git2.png)

I have started using version control over not just source code but pretty much anything, talks about projects like this (90DaysOfDevOps). Why not accept the features that rollback and log of everything that has gone on.
我已经开始对几乎所有东西都使用版本控制，而不仅仅是源代码，比如像这样的项目（90DaysOfDevOps）的讲稿。为什么不接受这种能够回滚和记录所发生一切的功能呢？

However, a big disclaimer **Version Control is not a Backup!**
然而，一个重要的免责声明是：**版本控制不是备份！**

Another benefit of Version Control is the ability to manage multiple versions of a project, Let's create an example, we have a free app that is available on all operating systems and then we have a paid-for app also available on all operating systems. The majority of the code is shared between both applications. We could copy and paste our code each commit to each app but that is going to be very messy especially as you scale your development to more than just one person, also mistakes will be made.
版本控制的另一个好处是能够管理项目的多个版本。让我们举个例子，我们有一个适用于所有操作系统的免费应用，还有一个同样适用于所有操作系统的付费应用。这两个应用之间共享了大部分代码。我们可以在每次提交时将代码复制并粘贴到每个应用中，但这会变得非常混乱，尤其是当你将开发规模扩大到不止一个人时，而且也容易出错。

The premium app is where we are going to have additional features, let's call them premium commits, the free edition will just contain the normal commits.
付费应用将包含额外的功能，我们称之为高级提交（premium commits），而免费版将只包含正常的提交（normal commits）。

The way this is achieved in Version Control is through branching.
在版本控制中，实现这一点的方法是通过分支（branching）。

![](Images/Day35_Git3.png)

Branching allows for two code streams for the same app as we stated above. But we will still want new features that land in our source code-free version to be in our premium and to achieve this we have something called merging.
如上所述，分支允许同一个应用程序拥有两个代码流。但是，我们仍然希望免费版源代码中出现的新功能也能存在于我们的付费版中，为了实现这一点，我们有一个叫做合并（merging）的操作。

![](Images/Day35_Git4.png)

Now, this seems easy but merging can be complicated because you could have a team working on the free edition and you could have another team working on the premium paid-for version and what if both change code that affects aspects of the overall code. Maybe a variable gets updated and breaks something. Then you have a conflict that breaks one of the features. Version Control cannot fix the conflicts that are down to you. But version control allows this to be easily managed.
现在，这看起来很容易，但合并可能会很复杂，因为你可能有一个团队在开发免费版，另一个团队在开发付费版，如果两个团队都更改了影响整体代码的某些代码会怎样呢？也许一个变量被更新并导致某些东西损坏。然后就会出现冲突，破坏其中一个功能。版本控制无法解决冲突，这取决于你。但版本控制允许对这种情况进行轻松管理。

The primary reason if you have not picked up so far for version control, in general, is the ability to collaborate. The ability to share code amongst developers and when I say code as I said before more and more we are seeing much more use cases for other reasons to use source control, maybe its a joint presentation you are working on with a colleague or a 90DaysOfDevOps challenge where you have the community offering their corrections and updates throughout the project.
如果你还没有发现，版本控制的根本原因在于它具备协作能力。它使开发人员能够共享代码，而当我提到代码时，正如我之前所说，我们看到了越来越多使用源代码控制的其他用例，比如你正在与同事一起完成的联合演示文稿，或是一个 90DaysOfDevOps 挑战，其中社区在整个项目过程中提供他们的修正和更新。

Without version control how did teams of software developers even handle this? I find it hard enough when I am working on my projects to keep track of things. I expect they would split out the code into each functional module. Maybe a little part of the puzzle then was bringing the pieces together and then problems and issues before anything would get released.
如果没有版本控制，软件开发团队是如何处理这些问题的呢？当我处理自己的项目时，我都觉得很难追踪事务。我猜他们会将代码拆分成各个功能模块。也许难题的一部分在于将这些碎片组合起来，然后在发布之前解决所有问题。

With version control, we have a single source of truth. We might all still work on different modules but it enables us to collaborate better.
有了版本控制，我们就有了唯一的真相来源（single source of truth）。我们可能仍然在不同的模块上工作，但它使我们能够更好地协作。

![](Images/Day35_Git5.png)

Another thing to mention here is that it's not just developers that can benefit from Version Control, it's all members of the team to have visibility but also tools all having awareness or leverage, Project Management tools can be linked here, tracking the work. We might also have a build machine for example Jenkins which we will talk about in another module. A tool that Builds and Packages the system, automating the deployment tests and metrics.
这里要提到的另一点是，受益于版本控制的不仅仅是开发人员，团队中的所有成员都可以获得可见性，并且所有工具都可以感知或利用它。项目管理工具可以在此处链接，用于追踪工作。我们也可能有一个构建机器，例如 Jenkins（我们将在另一个模块中讨论）。这个工具可以构建和打包系统，自动化部署测试和指标。

### What is Git?

Git is a tool that tracks changes to source code or any file, or we could also say Git is an open-source distributed version control system.
Git 是一种追踪源代码或任何文件变化的工具，或者我们也可以说 Git 是一个开源的分布式版本控制系统。

There are many ways in which git can be used on our systems, most commonly or at least for me I have seen it at the command line, but we also have graphical user interfaces and tools like Visual Studio Code that have git-aware operations we can take advantage of.
在我们的系统上，Git 有许多使用方式，最常见的是（至少对我来说）在命令行中使用，但我们也有图形用户界面和像 Visual Studio Code 这样的工具，它们具有我们可以利用的 Git 感知操作。

Now we are going to run through a high-level overview before we even get Git installed on our local machine.
现在，在我们本地机器上安装 Git 之前，我们将先进行一个高级概述。

Let's take the folder we created earlier.
让我们使用我们之前创建的文件夹。

![](Images/Day35_Git2.png)

To use this folder with version control we first need to initiate this directory using the `git init` command. For now, just think that this command puts our directory as a repository in a database somewhere on our computer.
要将此文件夹用于版本控制，我们首先需要使用 `git init` 命令初始化此目录。目前，只需认为此命令将我们的目录作为仓库放置在计算机上的某个数据库中。

![](Images/Day35_Git6.png)

Now we can create some files and folders and our source code can begin or maybe it already has and we have something in here already. We can use the `git add .` command which puts all files and folders in our directory into a snapshot but we have not yet committed anything to that database. We are just saying all files with the `.` are ready to be added.
现在我们可以创建一些文件和文件夹，我们的源代码可以开始了，或者它可能已经存在，并且我们这里已经有一些内容了。我们可以使用 `git add .` 命令，它将目录中的所有文件和文件夹放入一个快照中，但我们尚未向该数据库提交任何内容。我们只是表示所有带有 `.` 的文件都已准备好被添加。

![](Images/Day35_Git7.png)

Then we want to go ahead and commit our files, we do this with the `git commit -m "My First Commit"` command. We can give a reason for our commit and this is suggested so we know what has happened for each commit.
然后我们想要继续提交文件，我们使用 `git commit -m "My First Commit"` 命令来完成此操作。我们可以为提交提供一个理由，这是建议的做法，以便我们知道每次提交发生了什么。

![](Images/Day35_Git8.png)

We can now see what has happened within the history of the project. Using the `git log` command.
现在我们可以查看项目历史记录中发生的事情。通过使用 `git log` 命令。

![](Images/Day35_Git9.png)

If we create an additional file called `samplecode.ps1`, the status would become different. We can also check the status of our repository by using `git status` this shows we have nothing to commit and we can add a new file called samplecode.ps1. If we then run the same `git status` you will see that we file to be committed.
如果我们创建另一个名为 `samplecode.ps1` 的文件，状态将变得不同。我们还可以使用 `git status` 来检查仓库的状态，这显示我们没有要提交的内容，我们可以添加一个名为 samplecode.ps1 的新文件。如果我们随后再次运行 `git status`，您将看到有待提交的文件。

![](Images/Day35_Git10.png)

Add our new file using the `git add samplecode.ps1` command and then we can run `git status` again and see our file is ready to be committed.
使用 `git add samplecode.ps1` 命令添加我们的新文件，然后我们可以再次运行 `git status`，查看我们的文件已准备好提交。

![](Images/Day35_Git11.png)

Then issue `git commit -m "My Second Commit"` command.
然后执行 `git commit -m "My Second Commit"` 命令。

![](Images/Day35_Git12.png)

Another `git status` now shows everything is clean again.
再次运行 `git status` 现在显示一切都已干净（clean）。

![](Images/Day35_Git13.png)

We can then use the `git log` command which shows the latest changes and first commit.
然后我们可以使用 `git log` 命令，它会显示最新的更改和首次提交。

![](Images/Day35_Git14.png)

If we wanted to see the changes between our commits i.e what files have been added or modified we can use the `git diff b8f8 709a`
如果我们想查看提交之间的变化，即添加或修改了哪些文件，我们可以使用 `git diff b8f8 709a`

![](Images/Day35_Git15.png)

Which then displays what has changed in our case we added a new file.
随后显示了发生的变化，在我们的例子中，我们添加了一个新文件。

![](Images/Day35_Git16.png)

We will go deeper into this later on but we can jump around our commits i.e we can go time travelling! By using our commit number we can use the `git checkout 709a` command to jump back in time without losing our new file.
我们稍后会深入探讨这一点，但我们可以在提交之间跳转，也就是说，我们可以进行时间旅行！通过使用我们的提交编号，我们可以使用 `git checkout 709a` 命令及时返回，而不会丢失我们的新文件。

![](Images/Day35_Git17.png)

But then equally we will want to move forward as well and we can do this the same way with the commit number or you can see here we are using the `git switch -` command to undo our operation.
但同样地，我们也希望向前推进，我们可以用相同的提交编号来做到这一点，或者您可以看到我们在这里使用 `git switch -` 命令来撤消我们的操作。

![](Images/Day35_Git18.png)

The TLDR;
总结一下 (TLDR;);

- Tracking a project's history
- 追踪项目的历史记录
- Managing multiple versions of a project
- 管理项目的多个版本
- Sharing code amongst developers and a wider scope of teams and tools
- 在开发人员以及更广泛的团队和工具之间共享代码
- Coordinating teamwork
- 协调团队合作
- Oh and there is some time travel!
- 哦，还有一些时间旅行！

This might have seemed a jump around but hopefully, you can see without really knowing the commands used the powers and the big picture behind Version Control.
这可能看起来有些跳跃，但希望您能在不真正了解所使用命令的情况下，看到版本控制背后的强大功能和宏观图景。

Next up we will be getting git installed and set up on your local machine and diving a little deeper into some other use cases and commands that we can achieve in Git.
接下来，我们将在您的本地机器上安装和设置 Git，并深入探讨我们可以在 Git 中实现的其他一些用例和命令。

## Resources

- [What is Version Control?](https://www.youtube.com/watch?v=Yc8sCSeMhi4)
- [Types of Version Control System](https://www.youtube.com/watch?v=kr62e_n6QuQ)
- [Git Tutorial for Beginners](https://www.youtube.com/watch?v=8JJ101D3knE&t=52s)
- [Git for Professionals Tutorial](https://www.youtube.com/watch?v=Uszj_k0DGsg)
- [Git and GitHub for Beginners - Crash Course](https://www.youtube.com/watch?v=RGOj5yH7evk&t=8s)
- [Complete Git and GitHub Tutorial](https://www.youtube.com/watch?v=apGV9Kg7ics)

See you on [Day 36](day36.md)
第 36 天见 [Day 36](day36.md)
