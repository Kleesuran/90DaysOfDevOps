---
title: '#90DaysOfDevOps - Gitting to know Git - Day 37'
published: false
description: 90DaysOfDevOps - Gitting to know Git
tags: 'DevOps, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048707
---

## Gitting to know Git

Apologies for the terrible puns in the title and throughout. I am surely not the first person to turn Git into a dad joke!
对于标题和全文中蹩脚的双关语表示歉意。我肯定不是第一个把 Git 变成“爸爸笑话”的人！

In the last two posts we learnt about version control systems, and some of the fundamental workflows of git as a version control system [Day 35](day35.md) Then we got git installed on our system, updated and configured. We also went a little deeper into the theory between the Client-Server version control system and Git which is a distributed version control system [Day 36](day36.md).
在过去的两次博文中，我们了解了版本控制系统，以及作为版本控制系统的 Git 的一些基本工作流程 [Day 35](day35.md)。然后我们在系统上安装、更新和配置了 Git。我们还深入探讨了客户端-服务器版本控制系统和作为分布式版本控制系统的 Git 之间的理论区别 [Day 36](day36.md)。

Now we are going to run through some of the commands and use cases that we will all commonly see with git.
现在，我们将快速回顾一些我们在使用 Git 时都会经常看到的一些命令和用例。

### Where to git help with git?

There are going to be times when you just cannot remember or just don't know the command you need to get things done with git. You are going to need help.
有些时候，你可能就是记不住，或者根本不知道使用 Git 完成任务所需的命令。这时你就需要帮助。

Google or any search engine is likely to be your first port of call when searching for help.
搜索帮助时，Google 或任何搜索引擎很可能是你的第一个求助渠道。

Secondly, the next place is going to be the official git site and the documentation. [git-scm.com/docs](http://git-scm.com/docs) Here you will find not only a solid reference to all the commands available but also lots of different resources.
其次，下一个地方就是 Git 官方网站及其文档。[git-scm.com/docs](http://git-scm.com/docs) 在这里，你不光能找到所有可用命令的可靠参考，还能找到许多不同的资源。

![](Images/Day37_Git1.png)

We can also access this same documentation which is super useful if you are without connectivity from the terminal. If we chose the `git add` command for example we can run `git add --help` and we see below the manual.
我们也可以在终端中访问同样的文档，如果你没有网络连接，这会非常有用。例如，如果我们选择了 `git add` 命令，我们可以运行 `git add --help`，然后我们就会看到如下的手册。

![](Images/Day37_Git2.png)

We can also in the shell use `git add -h` which is going to give us a summary of the options we have available.
我们还可以在 shell 中使用 `git add -h`，它会为我们提供可用选项的摘要。

![](Images/Day37_Git3.png)

### Myths surrounding Git

"Git has no access control" - You can empower a leader to maintain source code.
“Git 没有访问控制”——你可以授权一位负责人来维护源代码。

"Git is too heavy" - Git can provide shallow repositories which means a reduced amount of history if you have large projects.
“Git 太重了”——如果你有大型项目，Git 可以提供浅克隆仓库 (shallow repositories)，这意味着可以减少历史记录的数量。

### Real shortcomings

Not ideal for Binary files. Great for source code but not great for executable files or videos for example.
不适合二进制文件。它非常适合源代码，但不适合可执行文件或视频等。

Git is not user-friendly, the fact that we have to spend time talking about commands and functions of the tool is probably a key sign of that.
Git 不够用户友好，我们必须花时间讨论该工具的命令和功能这一事实可能就是一个关键迹象。

Overall though, git is hard to learn but easy to use.
但总的来说，Git 难学易用。

### The git ecosystem

I want to briefly cover the ecosystem around git but not deep dive into some of these areas but I think it's important to note these here at a high level.
我想简单介绍一下 Git 周围的生态系统，但不会深入探讨其中的一些领域。不过，我认为在此高层概括地提及它们非常重要。

Almost all modern development tools support Git.
几乎所有现代开发工具都支持 Git。

- Developer tools - We have already mentioned visual studio code but you will find git plugins and integrations into sublime text and other text editors and IDEs.
- 开发者工具 - 我们已经提到了 Visual Studio Code，但你会发现 Git 插件和集成也存在于 Sublime Text 以及其他文本编辑器和 IDE 中。
- Team tools - Also mentioned around tools like Jenkins from a CI/CD point of view, Slack from a messaging framework and Jira for project management and issue tracking.
- 团队工具 - 还包括从 CI/CD 角度来看的 Jenkins，从消息框架角度来看的 Slack，以及用于项目管理和问题跟踪的 Jira 等工具。

- Cloud Providers - All the large cloud providers support git, Microsoft Azure, Amazon AWS, and Google Cloud Platform.
- 云提供商 - 所有大型云提供商都支持 Git，包括 Microsoft Azure、Amazon AWS 和 Google Cloud Platform。
- Git-Based services - Then we have GitHub, GitLab and BitBucket which we will cover in more detail later on. I have heard of these services as the social network for code!
- 基于 Git 的服务 - 还有 GitHub、GitLab 和 BitBucket，我们稍后将更详细地介绍它们。我听说这些服务被称为代码的社交网络！

### The Git Cheatsheet

We have not covered most of these commands but having looked at some cheat sheets available online I wanted to document some of the git commands and what their purpose is. We don't need to remember these all, and with more hands-on practice and use you will pick at least the git basics.
我们还没有涵盖大多数这些命令，但在查阅了一些在线备忘单后，我想记录一些 Git 命令及其用途。我们不需要记住所有这些命令，但通过更多的实践和使用，你至少会掌握 Git 的基础知识。

I have taken these from [atlassian](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet) but writing them down and reading the description is a good way to get to know what the commands are as well as getting hands-on in everyday tasks.
我将这些内容取自 [atlassian](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)，但将它们写下来并阅读描述是了解命令及其在日常任务中进行实践的好方法。

### Git Basics

| Command | Example | Description |
| :--- | :--- | :--- |
| git init | `git init <directory>` | 在指定的目录中创建一个空的 Git 仓库。 |
| git clone | `git clone <repo>` | 将位于 <repo> 的仓库克隆到本地机器上。 |
| git config | `git config user.name` | 定义用于当前仓库所有提交的作者名称，使用 `system`、`global`、`local` 标志设置配置选项。 |
| git add | `git add <directory>` | 暂存 <directory> 中所有更改以待下次提交。我们也可以添加 <files> 和 <.> 来表示所有文件。 |
| git commit -m | `git commit -m "<message>"` | 提交暂存的快照，使用 <message> 详细说明提交的内容。 |
| git status | `git status` | 列出已暂存、未暂存和未被跟踪的文件。 |
| git log | `git log` | 使用默认格式显示所有提交历史。此命令还有其他选项可用。 |
| git diff | `git diff` | 显示索引（staged changes）和工作目录（working directory）之间未暂存的更改。 |

### Git Undoing Changes

| Command | Example | Description |
| :--- | :--- | :--- |
| git revert | `git revert <commit>` | 创建一个新的提交，撤销 <commit> 中所做的所有更改，然后将其应用到当前分支。 |
| git reset | `git reset <file>` | 从暂存区中移除 <file>，但工作目录保持不变。这会在不覆盖任何更改的情况下取消文件的暂存。 |
| git clean | `git clean -n` | 显示将从工作目录中删除哪些文件。使用 `-f` 替换 `-n` 来执行清理。 |

### Git Rewriting History

| Command | Example | Description |
| :--- | :--- | :--- |
| git commit | `git commit --amend` | 用暂存的更改与上次提交的内容合并，替换上次提交。在没有暂存任何内容时使用此命令可以编辑上次提交的消息。 |
| git rebase | `git rebase <base>` | 将当前分支变基到 <base> 上。<base> 可以是提交 ID、分支名称、标签或相对于 HEAD 的引用。 |
| git reflog | `git reflog` | 显示本地仓库 HEAD 更改的日志。添加 --relative-date 标志以显示日期信息，或添加 --all 以显示所有引用。 |

### Git Branches

| Command | Example | Description |
| :--- | :--- | :--- |
| git branch | `git branch` | 列出仓库中的所有分支。添加 <branch> 参数以创建名称为 <branch> 的新分支。 |
| git checkout | `git checkout -b <branch>` | 创建并检出名为 <branch> 的新分支。省略 -b 标志可检出现有分支。 |
| git merge | `git merge <branch>` | 将 <branch> 合并到当前分支中。 |

### Git Remote Repositories

| Command | Example | Description |
| :--- | :--- | :--- |
| git remote add | `git remote add <name> <url>` | 创建到远程仓库的新连接。添加远程仓库后，您可以在其他命令中使用 <name> 作为 <url> 的快捷方式。 |
| git fetch | `git fetch <remote> <branch>` | 从仓库中获取特定的 <branch>。省略 <branch> 可获取所有远程引用。 |
| git pull | `git pull <remote>` | 获取指定远程仓库中当前分支的副本，并立即将其合并到本地副本中。 |
| git push | `git push <remote> <branch>` | 将分支推送到 <remote>，以及必要的提交和对象。如果远程仓库中不存在命名分支，则会创建该分支。 |

### Git Diff

| Command | Example | Description |
| :--- | :--- | :--- |
| git diff HEAD | `git diff HEAD` | 显示工作目录与上次提交之间的差异。 |
| git diff --cached | `git diff --cached` | 显示暂存更改与上次提交之间的差异。 |

### Git Config

| Command | Example | Description |
| :--- | :--- | :--- |
| git config --global user.name \<name> | `git config --global user.name <name>` | 定义当前用户所有提交所使用的作者名称。 |
| git config --global user.email \<email> | `git config --global user.email <email>` | 定义当前用户所有提交所使用的作者邮箱。 |
| git config --global alias \<alias-name> \<git-command> | `git config --global alias <alias-name> <git-command>` | 为 Git 命令创建快捷方式。 |
| git config --system core.editor \<editor> | `git config --system core.editor <editor>` | 设置机器上所有用户使用的命令文本编辑器。<editor> 参数应该是启动所需编辑器的命令。 |
| git config --global --edit | `git config --global --edit ` | 在文本编辑器中打开全局配置文件进行手动编辑。 |

### Git Rebase

| Command | Example | Description |
| :--- | :--- | :--- |
| git rebase -i \<base> | `git rebase -i <base>` | 交互式地将当前分支变基到 <base> 上。启动编辑器，输入命令，决定如何将每个提交转移到新的基准上。 |

### Git Pull

| Command | Example | Description |
| :--- | :--- | :--- |
| git pull --rebase \<remote> | `git pull --rebase <remote>` | 获取远程仓库当前分支的副本，并将其变基到本地副本中。使用 git rebase 而不是 merge 来集成这些分支。 |

### Git Reset

| Command | Example | Description |
| :--- | :--- | :--- |
| git reset | `git reset ` | 将暂存区重置为与最近一次提交匹配，但工作目录保持不变。 |
| git reset --hard | `git reset --hard` | 重置暂存区和工作目录以匹配最近一次提交，并覆盖工作目录中的所有更改。 |
| git reset \<commit> | `git reset <commit>` | 将当前分支的尖端（tip）后移至 <commit>，重置暂存区以匹配，但工作目录保持不变。 |
| git reset --hard \<commit> | `git reset --hard <commit>` | 与上一个命令相同，但同时重置暂存区和工作目录以匹配。删除未提交的更改以及 <commit> 之后的所有提交。 |

### Git Push

| Command | Example | Description |
| :--- | :--- | :--- |
| git push \<remote> --force | `git push <remote> --force` | 强制执行 git push，即使会导致非快进式合并。除非您确定自己在做什么，否则请勿使用 --force 标志。 |
| git push \<remote> --all | `git push <remote> --all` | 将所有本地分支推送到指定的远程仓库。 |
| git push \<remote> --tags | `git push <remote> --tags` | 推送分支或使用 --all 标志时，标签不会自动推送。--tags 标志会将所有本地标签发送到远程仓库。 |

## Resources

- [What is Version Control?](https://www.youtube.com/watch?v=Yc8sCSeMhi4)
- [Types of Version Control System](https://www.youtube.com/watch?v=kr62e_n6QuQ)
- [Git Tutorial for Beginners](https://www.youtube.com/watch?v=8JJ101D3knE&t=52s)
- [Git for Professionals Tutorial](https://www.youtube.com/watch?v=Uszj_k0DGsg)
- [Git and GitHub for Beginners - Crash Course](https://www.youtube.com/watch?v=RGOj5yH7evk&t=8s)
- [Complete Git and GitHub Tutorial](https://www.youtube.com/watch?v=apGV9Kg7ics)
- [Git cheatsheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)

See you on [Day 38](day38.md)