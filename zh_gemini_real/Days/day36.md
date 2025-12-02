---
title: '#90DaysOfDevOps - Installing & Configuring Git - Day 36'
published: false
description: 90DaysOfDevOps - Installing & Configuring Git
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048738
---

## Installing & Configuring Git

Git is an open source, cross-platform tool for version control.
Git 是一个开源、跨平台的版本控制工具。
If you are like me, using Ubuntu or most Linux environments you might find that you already have git installed but we are going to run through the install and configuration.
如果你像我一样，使用的是 Ubuntu 或大多数 Linux 环境，你可能会发现你的系统上已经安装了 Git，但我们仍将完整地介绍安装和配置过程。

Even if you already have git installed on your system it is also a good idea to make sure we are up to date.
即使你的系统上已经安装了 Git，确保我们使用的是最新版本也是一个好习惯。

### Installing Git

As already mentioned Git is cross-platform, we will be running through Windows and Linux but you can find macOS also listed [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
正如已经提到的，Git 是跨平台的，我们将介绍 Windows 和 Linux 的安装过程，你也可以在[这里](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)找到 macOS 的安装说明。

For [Windows](https://git-scm.com/download/win) we can grab our installers from the official site.
对于 [Windows](https://git-scm.com/download/win) 系统，我们可以从官方网站获取安装程序。

You could also use `winget` on your Windows machine, think of this as your Windows Application Package Manager.
你也可以在 Windows 机器上使用 `winget`，可以将其视为 Windows 应用程序包管理器。

Before we install anything let's see what version we have on our Windows Machine. Open a PowerShell window and run `git --version`
在安装任何东西之前，让我们先看看我们的 Windows 机器上有什么版本的 Git。打开 PowerShell 窗口并运行 `git --version`

![](Images/Day36_Git1.png)

We can also check our WSL Ubuntu version of Git as well.
我们也可以检查我们的 WSL Ubuntu 版本的 Git。

![](Images/Day36_Git2.png)

At the time of writing the latest Windows release is `2.35.1` so we have some updating to do there which I will run through. I expect the same for Linux.
在撰写本文时，最新的 Windows 版本是 `2.35.1`，所以我们需要进行一些更新，我将演示这个过程。我预计 Linux 也会是类似的情况。

I went ahead and downloaded the latest installer and ran through the wizard and will document that here. The important thing to note is that git will uninstall previous versions before installing the latest.
我下载了最新的安装程序并运行了向导，将在这里记录下来。需要注意的重要一点是，Git 会在安装最新版本之前卸载以前的版本。

Meaning that the process shown below is also the same process for the most part as if you were installing from no git.
这意味着下面显示的过程在很大程度上与你从未安装过 Git 的安装过程是相同的。

It is a very simple installation. Once downloaded double click and get started. Read through the GNU license agreement. But remember this is free and open-source software.
这是一个非常简单的安装过程。下载后双击并开始。通读 GNU 许可协议。但请记住，这是免费的开源软件。

![](Images/Day36_Git3.png)

Now we can choose additional components that we would like to also install but also associate with git. On Windows, I always make sure I install Git Bash as this allows us to run bash scripts on Windows.
现在我们可以选择想要安装和关联到 Git 的附加组件。在 Windows 上，我总是确保安装 Git Bash，因为它允许我们在 Windows 上运行 bash 脚本。

![](Images/Day36_Git4.png)

We can then choose which SSH Executable we wish to use. I leave this as the bundled OpenSSH that you might have seen in the Linux section.
然后我们可以选择希望使用哪个 SSH 可执行文件。我保留了捆绑的 OpenSSH，你可能在 Linux 部分见过它。

![](Images/Day36_Git5.png)

We then have experimental features that we may wish to enable, for me I don't need them so I don't enable them, you can always come back in through the installation and enable these later on.
然后我们有一些可能希望启用的实验性功能，对我来说，我不需要它们，所以我没有启用，你随时可以通过安装向导回来稍后启用这些功能。

![](Images/Day36_Git6.png)

Installation complete, we can now choose to open Git Bash and or the latest release notes.
安装完成，我们现在可以选择打开 Git Bash 和/或最新的发行说明。

![](Images/Day36_Git7.png)

The final check is to take a look in our PowerShell window at what version of git we have now.
最后的检查是在我们的 PowerShell 窗口中查看我们现在拥有哪个版本的 Git。

![](Images/Day36_Git8.png)

Super simple stuff and now we are on the latest version. On our Linux machine, we seemed to be a little behind so we can also walk through that update process.
超级简单，现在我们使用的是最新版本。在我们的 Linux 机器上，Git 版本似乎有点落后，所以我们也可以演示一下更新过程。

I simply run the `sudo apt-get install git` command.
我只需运行 `sudo apt-get install git` 命令。

![](Images/Day36_Git9.png)

You could also run the following which will add the git repository for software installations.
你也可以运行以下命令，它将添加用于软件安装的 Git 仓库。

```
sudo add-apt-repository ppa:git-core/ppa -y
sudo apt-get update
sudo apt-get install git -y
git --version
```

### Configuring Git

When we first use git we have to define some settings,
当我们第一次使用 Git 时，我们必须定义一些设置，

- Name
- Email
- Default Editor
- Line Ending

This can be done at three levels
这可以在三个级别上完成

- System = All users
- Global = All repositories of the current user
- Local = The current repository

Example:
示例：
`git config --global user.name "Michael Cade"`
`git config --global user.email Michael.Cade@90DaysOfDevOPs.com"`
Depending on your Operating System will determine the default text editor. In my Ubuntu machine without setting the next command is using nano. The below command will change this to visual studio code.
你的操作系统将决定默认的文本编辑器。在我的 Ubuntu 机器上，如果不设置，下一个命令将使用 nano。下面的命令会将其更改为 Visual Studio Code。

`git config --global core.editor "code --wait"`

now if we want to be able to see all git configurations then we can use the following command.
现在，如果我们想要查看所有 Git 配置，那么我们可以使用以下命令。

`git config --global -e`

![](Images/Day36_Git10.png)

On any machine this file will be named `.gitconfig` on my Windows machine you will find this in your user account directory.
在任何机器上，这个文件都将命名为 `.gitconfig`，在我的 Windows 机器上，你会在用户账户目录下找到它。

![](Images/Day36_Git11.png)

### Git Theory

I mentioned in the post yesterday that there were other version control types and we can split these down into two different types. One is Client Server and the other is Distributed.
我在昨天的文章中提到还有其他的版本控制类型，我们可以将它们分为两种不同的类型。一种是客户端-服务器（Client Server），另一种是分布式（Distributed）。

### Client-Server Version Control

Before git was around Client-Server was the defacto method for version control. An example of this would be [Apache Subversion](https://subversion.apache.org/) which is an open source version control system founded in 2000.
在 Git 出现之前，客户端-服务器是事实上的版本控制方法。一个例子是 [Apache Subversion](https://subversion.apache.org/)，这是一个成立于 2000 年的开源版本控制系统。

In this model of Client-Server version control, the first step the developer downloads the source code and the actual files from the server. This doesn't remove the conflicts but it does remove the complexity of the conflicts and how to resolve them.
在客户端-服务器版本控制的这种模型中，第一步是开发人员从服务器下载源代码和实际文件。这并不能消除冲突，但它确实消除了冲突的复杂性以及如何解决它们的问题。

![](Images/Day36_Git12.png)

Now for example let's say we have two developers working on the same files and one wins the race and commits or uploads their file back to the server first with their new changes. When the second developer goes to update they have a conflict.
现在举个例子，假设我们有两个开发人员正在处理相同的文件，其中一个率先完成并提交或将他们的文件以及新更改上传回服务器。当第二个开发人员去更新时，他们就会遇到冲突。

![](Images/Day36_Git13.png)

So now the Dev needs to pull down the first devs code change next to their check and then commit once those conflicts have been settled.
因此，现在开发人员需要将第一个开发人员的代码更改拉取下来，对照自己的更改进行检查，并在解决这些冲突后进行提交。

![](Images/Day36_Git15.png)

### Distributed Version Control

Git is not the only distributed version control system. But it is very much the defacto.
Git 并不是唯一的分布式版本控制系统。但它确实是事实上的标准。

Some of the major benefits of Git are:
Git 的主要优势包括：

- Fast
- Smart
- Flexible
- Safe & Secure

Unlike the Client-Server version control model, each developer downloads the source repository meaning everything. History of commits, all the branches etc.
与客户端-服务器版本控制模型不同，每个开发人员都会下载整个源代码仓库，这意味着包含所有内容：提交历史、所有分支等等。

![](Images/Day36_Git16.png)

## Resources

- [What is Version Control?](https://www.youtube.com/watch?v=Yc8sCSeMhi4)
- [Types of Version Control System](https://www.youtube.com/watch?v=kr62e_n6QuQ)
- [Git Tutorial for Beginners](https://www.youtube.com/watch?v=8JJ101D3knE&t=52s)
- [Git for Professionals Tutorial](https://www.youtube.com/watch?v=Uszj_k0DGsg)
- [Git and GitHub for Beginners - Crash Course](https://www.youtube.com/watch?v=RGOj5yH7evk&t=8s)
- [Complete Git and GitHub Tutorial](https://www.youtube.com/watch?v=apGV9Kg7ics)

See you on [Day 37](day37.md)
我们第 [37 天](day37.md)见。