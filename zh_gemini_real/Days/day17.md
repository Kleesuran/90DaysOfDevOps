```markdown
---
title: '#90DaysOfDevOps - Text Editors - nano vs vim - Day 17'
published: false
description: 90DaysOfDevOps - Text Editors - nano vs vim
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048703
---

## Text Editors - nano vs vim

The majority of your Linux systems are going to be servers and these are not going to have a GUI.
大多数 Linux 系统都是服务器，它们不会有图形用户界面（GUI）。
I also mentioned in the last session that Linux is mostly made up of configuration files, to make changes you are going to need to be able to edit those configuration files to change anything on the system.
我在上一节中也提到，Linux 主要由配置文件组成，要进行更改，你需要能够编辑这些配置文件，才能更改系统上的任何内容。

There are lots of options out there but I think we should cover probably the two most common terminal text editors.
外面有很多选项，但我认为我们应该介绍两种最常见的终端文本编辑器。
I have used both of these editors and for me, I find `nano` the easy button when it comes to quick changes but `vim` has such a broad set of capabilities.
我使用过这两种编辑器，对我来说，在进行快速更改时，`nano` 是简单的选择，但 `vim` 具有广泛的功能集。

### nano

- Not available on every system.
- 并非在每个系统上都可用。
- Great for getting started.
- 非常适合入门。

If you run `nano 90DaysOfDevOps.txt` we will create a new file with nothing in, from here we can add our text and we have our instructions below for what we want to do with that file.
如果你运行 `nano 90DaysOfDevOps.txt`，我们将创建一个空文件，从这里我们可以添加文本，下面是关于如何操作该文件的说明。

![](Images/Day17_Linux1.png)

We can now use `control x + enter` and then run `ls` you can now see our new text file.
现在我们可以使用 `control x + enter`，然后运行 `ls`，你就可以看到我们的新文本文件了。

![](Images/Day17_Linux2.png)

We can now run `cat` against that file to read our file.
现在我们可以对该文件运行 `cat` 来读取文件。
We can then use that same `nano 90DaysOfDevOps.txt` to add additional text or modify your file.
我们 then 可以使用同样的 `nano 90DaysOfDevOps.txt` 来添加额外的文本或修改你的文件。

For me, nano is super easy when it comes to getting small changes done on configuration files.
对我来说，当需要在配置文件上进行微小更改时，nano 非常容易使用。

### vim

Possibly the most common text editor around?
可能是周围最常见的文本编辑器？
A sibling of the UNIX text editor vi from 1976 we get a lot of functionality with vim.
作为 1976 年 UNIX 文本编辑器 vi 的兄弟，vim 为我们提供了大量功能。

- Pretty much supported on every single Linux distribution.
- 几乎支持所有 Linux 发行版。
- Incredibly powerful! You can likely find a full 7-hour course just covering vim.
- 极其强大！你可能会找到一个完整的 7 小时课程专门讲解 vim。

We can jump into vim with the `vim` command or if we want to edit our new txt file we could run `vim 90DaysOfDevOps.txt` but you are going to first see the lack of help menus at the bottom.
我们可以使用 `vim` 命令进入 vim，或者如果我们想编辑新的 txt 文件，我们可以运行 `vim 90DaysOfDevOps.txt`，但你会首先看到底部缺乏帮助菜单。

The first question might be "How do I exit vim?" that is going to be `escape` and if we have not made any changes then it will be `:q`
第一个问题可能是“如何退出 vim？”答案是 `escape`，如果我们没有做任何更改，那么将是 `:q`。

![](Images/Day17_Linux3.png)

You start in `normal` mode, there are other modes `command, normal, visual, insert`, if we want to add the text we will need to switch from `normal` to `insert` we need to press `i` if you have added some text and would like to save these changes then you would hit escape and then `:wq`
你以 `normal` 模式启动，还有其他模式：`command, normal, visual, insert`。如果我们想添加文本，我们需要从 `normal` 切换到 `insert`，我们需要按 `i`；如果你添加了一些文本并想保存这些更改，那么你需要按 escape，然后输入 `:wq`。

![](Images/Day17_Linux4.png)

![](Images/Day17_Linux5.png)

You can confirm this with the `cat` command to check you have saved those changes.
你可以使用 `cat` 命令来确认，检查你是否保存了这些更改。

There is some cool fast functionality with vim that allows you to do menial tasks very quickly if you know the shortcuts which is a lecture in itself.
vim 具有一些很酷的快速功能，如果你知道快捷键，你可以非常迅速地完成繁琐的任务，这本身就可以单独开课讲解。
Let's say we have added a list of repeated words and we now need to change that, maybe it's a configuration file and we repeat a network name and now this has changed and we quickly want to change this.
假设我们添加了一系列重复的单词，现在我们需要更改它，也许这是一个配置文件，我们重复了一个网络名称，但现在它改变了，我们想快速更改它。
I am using the word day for this example.
我将使用“day”这个词作为这个例子。

![](Images/Day17_Linux6.png)

Now we want to replace that word with 90DaysOfDevOps, we can do this by hitting `ESC` and typing `:%s/Day/90DaysOfDevOps`
现在我们想把那个单词替换成 90DaysOfDevOps，我们可以通过按 `ESC` 并输入 `:%s/Day/90DaysOfDevOps` 来实现。

![](Images/Day17_Linux7.png)

The outcome when you hit enter is that the word day is then replaced with 90DaysOfDevOps.
当你按下 enter 键后，结果就是单词 day 被替换成了 90DaysOfDevOps。

![](Images/Day17_Linux8.png)

Copy and Paste was a big eye-opener for me.
复制和粘贴对我来说是一个很大的启示。
Copy is not copied it is yanked.
复制在 vim 中不叫 copied，而叫 yanked。
we can copy using `yy` on our keyboard in normal mode.
在 normal 模式下，我们可以使用键盘上的 `yy` 来复制（yank）。
`p` paste on the same line, `P` paste on a new line.
`p` 在同一行粘贴，`P` 在新行粘贴。

You can also delete these lines by choosing the number of lines you wish to delete followed by `dd`
你也可以通过选择你想删除的行数，然后紧跟 `dd` 来删除这些行。

There is also likely a time you will need to search a file, now we can use `grep` as mentioned in a previous session but we can also use vim.
还有一种情况是你可能需要搜索文件，现在我们可以使用 `grep`（如前一节所述），但我们也可以使用 vim。
we can use `/word` and this will find the first match, to navigate through to the next you will use the `n` key and so on.
我们可以使用 `/word`，这将找到第一个匹配项，要导航到下一个匹配项，你将使用 `n` 键，依此类推。

For vim this is not even touching the surface, the biggest advice I can give is to get hands-on and use vim wherever possible.
对于 vim 来说，这甚至只是冰山一角，我能给出的最大建议是亲自动手，尽可能多地使用 vim。

A common interview question is what is your favourite text editor in Linux and I would make sure you have at least this knowledge of both so you can answer, it is fine to say nano because it's simple.
一个常见的面试问题是你在 Linux 中最喜欢的文本编辑器是什么，我建议你确保至少对这两种编辑器有所了解，以便能够回答。回答 nano 是可以的，因为它很简单。
At least you show competence in understanding what a text editor is.
至少你表现出了对文本编辑器是什么的理解能力。
But get hands-on with them to be more proficient.
但要多加练习，才能更熟练。

Another pointer to navigate around in vim we can use `H,J,K,L` as well as our arrow keys.
另一个在 vim 中导航的技巧是，我们可以使用 `H,J,K,L` 以及箭头键。

## Resources

- [Vim in 100 Seconds](https://www.youtube.com/watch?v=-txKSRn0qeA)
- [Vim tutorial](https://www.youtube.com/watch?v=IiwGbcd8S7I)
- [Learn the Linux Fundamentals - Part 1](https://www.youtube.com/watch?v=kPylihJRG70)
- [Linux for hackers (don't worry you don't need to be a hacker!)](https://www.youtube.com/watch?v=VbEx7B_PTOE)

See you on [Day18](day18.md)
我们在 [Day18](day18.md) 再见
```
