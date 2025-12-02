---
title: '#90DaysOfDevOps - Dev workstation setup - All the pretty things - Day 20'
published: false
description: 90DaysOfDevOps - Dev workstation setup - All the pretty things
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048734
---

## Dev workstation setup - All the pretty things

Not to be confused with us setting Linux servers up this way but I wanted to also show off the choice and flexibility that we have within the Linux desktop.
不要将其与我们设置 Linux 服务器的方式混淆，但我也想展示我们在 Linux 桌面中所拥有的选择和灵活性。

I have been using a Linux Desktop for almost a year now and I have it configured just the way I want from a look and feel perspective. Using our Ubuntu VM on Virtual Box we can run through some of the customisations I have made to my daily driver.
我使用 Linux 桌面已有将近一年时间，并且从外观和感觉的角度来看，我已将其配置成我想要的样子。使用 Virtual Box 上的 Ubuntu 虚拟机，我们可以运行我为我的“主力机 (daily driver)”所做的一些自定义设置。

I have put together a YouTube video walking through the rest as some people might be able to better follow along:
我制作了一个 YouTube 视频来演示其余步骤，因为有些人可能更容易跟着操作：

[![Click to access YouTube Video](Images/Day20_YouTube.png)](https://youtu.be/jeEslAtHfKc)

Out of the box, our system will look something like the below:
默认情况下，我们的系统看起来如下图所示：

![](Images/Day20_Linux1.png)

We can also see our default bash shell below,
我们还可以在下方看到我们的默认 bash shell，

![](Images/Day20_Linux2.png)

A lot of this comes down to dotfiles something we will cover in this final Linux session of the series.
很多内容都归结于点文件（dotfiles），这是我们在本系列最后一个 Linux 会话中将要介绍的内容。

### dotfiles

First up I want to dig into dotfiles, I have said on a previous day that Linux is made up of configuration files. These dotfiles are configuration files for your Linux system and applications.
首先我想深入研究一下点文件（dotfiles），我在前几天说过，Linux 是由配置文件组成的。这些点文件就是你的 Linux 系统和应用程序的配置文件。

I will also add that dotfiles are not just used to customise and make your desktop look pretty, there are also dotfile changes and configurations that will help you with productivity.
我还要补充一点，点文件不仅用于自定义和美化桌面，还有一些点文件的更改和配置有助于提高你的生产力。

As I mentioned many software programs store their configurations in these dotfiles. These dotfiles assist in managing functionality.
正如我所提到的，许多软件程序都将它们的配置存储在这些点文件中。这些点文件有助于管理功能。

Each dotfile starts with a `.` You can probably guess where the naming came from?
每个点文件都以 `.` 开头。你可能猜到这个命名是如何来的了吧？

So far we have been using bash as our shell which means you will have a .bashrc and .bash_profile in our home folder. You can see below a few dotfiles we have on our system.
到目前为止，我们一直使用 bash 作为我们的 shell，这意味着在我们的 home 文件夹中会有 `.bashrc` 和 `.bash_profile` 文件。你可以在下面看到我们系统上的一些点文件。

![](Images/Day20_Linux3.png)

We are going to be changing our shell, so we will later be seeing a new `.zshrc` configuration dotfile.
我们将要更改我们的 shell，所以稍后我们将看到一个新的 `.zshrc` 配置文件。

But now you know if we refer to dotfiles you know they are configuration files. We can use them to add aliases to our command prompt as well as paths to different locations. Some people publish their dotfiles so they are publicly available. You will find mine here on my GitHub [MichaelCade/dotfiles](https://github.com/MichaelCade/dotfiles) here you will find my custom `.zshrc` file, my terminal of choice is terminator which also has some configuration files in the folder and then also some background options.
但现在你知道了，当我们提到点文件时，你就知道它们是配置文件。我们可以使用它们为命令行提示符添加别名，以及添加指向不同位置的路径。有些人会发布他们的点文件，使其可公开访问。你可以在我的 GitHub 上的 [MichaelCade/dotfiles](https://github.com/MichaelCade/dotfiles) 找到我的点文件，你会在那里找到我自定义的 `.zshrc` 文件，我选择的终端是 terminator，该文件夹中也有一些配置，还有一些背景选项。

### ZSH

As I mentioned throughout our interactions so far we have been using a bash shell the default shell with Ubuntu. ZSH is very similar but it does have some benefits over bash.
正如我之前提到的，到目前为止，我们一直在使用 bash shell，它是 Ubuntu 的默认 shell。ZSH 与 bash 非常相似，但它确实有一些优势。

Zsh has features like interactive Tab completion, automated file searching, regex integration, advanced shorthand for defining command scope, and a rich theme engine.
Zsh 具有交互式 Tab 补全、自动化文件搜索、正则表达式集成、定义命令范围的高级速记，以及丰富的的主题引擎等功能。

We can use our `apt` package manager to get zsh installed on our system. Let's go ahead and run `sudo apt install zsh` from our bash terminal. I am going to do this from within the VM console vs being connected over SSH.
我们可以使用我们的 `apt` 包管理器在我们的系统上安装 zsh。让我们继续在 bash 终端中运行 `sudo apt install zsh`。我将从 VM 控制台内部执行此操作，而不是通过 SSH 连接。

When the installation command is complete you can run `zsh` inside your terminal, this will then start a shell configuration script.
安装命令完成后，你可以在终端内运行 `zsh`，这将启动一个 shell 配置脚本。

![](Images/Day20_Linux4.png)

I selected `1` to the above question and now we have some more options.
我对上面的问题选择了 `1`，现在我们有了更多选项。

![](Images/Day20_Linux5.png)

You can see from this menu that we can make some out of the box edits to make ZSH configured to our needs.
你可以从这个菜单中看到，我们可以进行一些开箱即用的编辑，使 ZSH 配置符合我们的需求。

If you exit the wizard with a `0` and then use the `ls -al | grep .zshrc` you should see we have a new configuration file.
如果你输入 `0` 退出向导，然后使用 `ls -al | grep .zshrc`，你应该看到我们有了一个新的配置文件。

Now we want to make zsh our default shell every time we open our terminal, we can do this by running the following command to change our shell `chsh -s $(which zsh)` we then need to log out and back in again for the changes to take place.
现在我们希望每次打开终端时都将 zsh 设置为默认 shell，我们可以通过运行以下命令来更改我们的 shell：`chsh -s $(which zsh)`，然后我们需要注销并重新登录以使更改生效。

When you log back and open a terminal it should look something like this. We can also confirm our shell has now been changed over by running `which $SHELL`
当你重新登录并打开终端时，它应该看起来像这样。我们还可以通过运行 `which $SHELL` 来确认我们的 shell 已经更改。

![](Images/Day20_Linux6.png)

I generally perform this step on each Ubuntu desktop I spin up and find in general without going any further that the zsh shell is a little faster than bash.
我通常在我启动的每个 Ubuntu 桌面上执行此步骤，并且发现即使不进行任何进一步的配置，zsh shell 也比 bash 稍快一些。

### OhMyZSH

Next up we want to make things look a little better and also add some functionality to help us move around within the terminal.
接下来，我们希望让界面看起来更好一些，并添加一些功能来帮助我们在终端中更好地操作。

OhMyZSH is a free and open source framework for managing your zsh configuration. There are lots of plugins, themes and other things that just make interacting with the zsh shell a lot nicer.
OhMyZSH 是一个免费且开源的框架，用于管理你的 zsh 配置。它有很多插件、主题和其他功能，能让与 zsh shell 的交互变得更加愉快。

You can find out more about [ohmyzsh](https://ohmyz.sh/)
你可以在 [ohmyzsh](https://ohmyz.sh/) 了解更多信息。

Let's get Oh My ZSH installed, we have a few options with `curl` `wget` or `fetch` we have the first two available on our system but I will lead with `curl`
让我们安装 Oh My ZSH，我们有 `curl`、`wget` 或 `fetch` 几个选项。我们的系统上可以使用前两个，但我将以 `curl` 为主。

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`

When you have run the above command you should see some output like the below.
运行上述命令后，你应该会看到如下所示的输出。

![](Images/Day20_Linux7.png)

Now we can move on to start putting a theme in for our experience, there are well over 100 bundled with Oh My ZSH but my go-to for all of my applications and everything is the Dracula theme.
现在我们可以继续为我们的体验设置一个主题，Oh My ZSH 中捆绑了 100 多个主题，但我所有应用程序和所有配置的首选主题都是 Dracula 主题。

I also want to add that these two plugins are a must when using Oh My ZSH.
我还要补充一点，使用 Oh My ZSH 时，这两个插件是必不可少的。

`git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions`

`git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting`

`nano ~/.zshrc`

edit the plugins to now include `plugins=(git zsh-autosuggestions zsh-syntax-highlighting)`

## Gnome Extensions

I also use Gnome extensions, and in particular the list below
我还使用 Gnome 扩展，特别是以下列表：

[Gnome extensions](https://extensions.gnome.org)

    - Caffeine
    - CPU Power Manager
    - Dash to Dock
    - Desktop Icons
    - User Themes

## Software Installation

A short list of the programs I install on the machine using `apt`
这是我使用 `apt` 在机器上安装的程序简短列表：

    - VSCode
    - azure-cli
    - containerd.io
    - docker
    - docker-ce
    - google-cloud-sdk
    - insomnia
    - packer
    - terminator
    - terraform
    - vagrant

### Dracula theme

This site is the only theme I am using at the moment. Looks clear, and clean and everything looks great. [Dracula Theme](https://draculatheme.com/) It also has you covered when you have lots of other programs you use on your machine.
这是我目前唯一使用的主题网站。它看起来清晰、干净，一切都很棒。[Dracula Theme](https://draculatheme.com/) 当你的机器上使用许多其他程序时，它也能满足你的需求。

From the link above we can search for zsh on the site and you will find at least two options.
通过上面的链接，我们可以在网站上搜索 zsh，你会发现至少有两个选项。

Follow the instructions listed to install either manually or using git. Then you will need to finally edit your `.zshrc` configuration file as per below.
按照列出的说明手动安装或使用 git 安装。然后，你需要最终编辑你的 `.zshrc` 配置文件，如下所示。

![](Images/Day20_Linux8.png)

You are next going to want the [Gnome Terminal Dracula theme](https://draculatheme.com/gnome-terminal) with all instructions available here as well.
接下来你会需要 [Gnome Terminal Dracula theme](https://draculatheme.com/gnome-terminal)，所有说明也都在此处提供。

It would take a long time for me to document every step so I created a video walkthrough of the process. (**Click on the image below**)
要记录下每一步需要很长时间，所以我创建了一个视频来演示整个过程。（**点击下方图片**）

[![](Images/Day20_YouTube.png)](https://youtu.be/jeEslAtHfKc)

If you made it this far, then we have now finished our Linux section of the #90DaysOfDevOps. Once again I am open to feedback and additions to resources here.
如果你看到这里，那么我们现在已经完成了 #90DaysOfDevOps 的 Linux 部分。我再次欢迎大家提供反馈和补充资源。

I also thought on this it was easier to show you a lot of the steps through video vs writing them down here, what do you think about this? I do have a goal to work back through these days and where possible create video walkthroughs to add in and better maybe explain and show some of the things we have covered. What do you think?
我也认为，用视频向你展示很多步骤比在这里写下来要容易得多，你对此有什么看法？我的目标是回顾这些内容，并在可能的情况下创建视频演练来添加进来，以便更好地解释和展示我们所涵盖的一些内容。你觉得如何？

## Resources

- [Bash in 100 seconds](https://www.youtube.com/watch?v=I4EWvMFj37g)
- [Bash script with practical examples - Full Course](https://www.youtube.com/watch?v=TPRSJbtfK4M)
- [Client SSH GUI - Remmina](https://remmina.org/)
- [The Beginner's guide to SSH](https://www.youtube.com/watch?v=2QXkrLVsRmk)
- [Vim in 100 Seconds](https://www.youtube.com/watch?v=-txKSRn0qeA)
- [Vim tutorial](https://www.youtube.com/watch?v=IiwGbcd8S7I)
- [Learn the Linux Fundamentals - Part 1](https://www.youtube.com/watch?v=kPylihJRG70)
- [Linux for hackers (don't worry you don't need to be a hacker!)](https://www.youtube.com/watch?v=VbEx7B_PTOE)

Tomorrow we start our 7 days of diving into Networking, we will be looking to give ourselves the foundational knowledge and understanding of Networking around DevOps.
明天我们将开始为期 7 天的网络（Networking）深入研究，我们将致力于为自己奠定 DevOps 周边网络的基础知识和理解。

See you on [Day21](day21.md)
[Day21](day21.md) 见