---
title: '#90DaysOfDevOps - Staging & Changing - Day 38'
published: false
description: 90DaysOfDevOps - Staging & Changing
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049042
---

## Staging & Changing

We have already covered some of the basics but putting things into a walkthrough makes it better for me to learn and understand how and why we are doing it this way.
我们已经涵盖了一些基础知识，但通过一个演练（walkthrough）来理解事情，能让我更好地学习和理解我们为什么以及如何以这种方式操作。
Before we get into any git-based services such as GitHub, git has its powers that we can take advantage of on our local workstation.
在我们接触任何基于 Git 的服务（例如 GitHub）之前，Git 自身拥有一些强大的功能，我们可以在本地工作站上加以利用。

We are going to take the project folder we created at the start of the git session and we are going to walk through some of the simple steps we can do with git.
我们将使用在 Git 会话开始时创建的项目文件夹，并演练一些我们可以用 Git 完成的简单步骤。
We created a folder on our local machine and we initialised it with the `git init` command
我们在本地机器上创建了一个文件夹，并使用 `git init` 命令对其进行了初始化。

![](Images/Day38_Git1.png)

We can also see now that we have initialised the folder we have a hidden folder in our directory.
现在我们还可以看到，初始化该文件夹后，我们的目录中有一个隐藏文件夹。

![](Images/Day38_Git2.png)

This is where the details of the git repository are stored as well as the information regarding our branches and commits.
这里存储了 Git 仓库的详细信息，以及有关分支和提交的信息。

### Staging Files

We then start working on our empty folder and maybe we add some source code on the first days of work.
然后我们开始在空文件夹上工作，也许我们在工作的第一天添加了一些源代码。
We create our readme.mdfile and we can see that file in the directory, next we check our `git status` and it knows about the new readme.mdfile but we have not committed the file yet.
我们创建了 readme.md 文件，并且可以在目录中看到该文件，接下来我们检查 `git status`，它知道这个新的 readme.md 文件，但我们还没有提交该文件。

![](Images/Day38_Git3.png)

We can stage our readme.mdfile with the `git add README.md` command then we can see changes to be committed that we did not have before and a green new file.
我们可以使用 `git add README.md` 命令暂存我们的 readme.md 文件，然后我们可以看到待提交的更改（这是之前没有的），以及一个绿色的新文件。

![](Images/Day38_Git4.png)

Next up we want to commit this, our first commit or our first snapshot of our project.
接下来我们想要提交此更改，这是我们的第一次提交，也是我们项目的第一个快照。
We can do this by using the `git commit -m "Meaningful message"` command so that we can easily see what has changed for each commit.
我们可以使用 `git commit -m "Meaningful message"` 命令来完成此操作，这样我们就可以轻松查看每次提交更改了什么。
Also, notice the yellow cross changes now to a green tick.
另外，请注意黄色的叉现在变成了绿色的勾。
This is something I have within my terminal with the theme I use, something we covered in the Linux section.
这是我终端中使用的主题所带有的效果，我们在 Linux 部分中介绍过这一点。

![](Images/Day38_Git5.png)

### Committing Changes

We are going to most likely want to add more files or even change the files we have in our directory.
我们很可能想要添加更多文件，甚至更改目录中已有的文件。
We have already done our first commit above.
我们上面已经完成了第一次提交。
But now we are going to add more details and more files.
但现在我们将添加更多细节和文件。

We could repeat our process from before, create or edit our file > `git add .` to add all files to the staging area then `git commit -m "meaningful message"` and this would work just fine.
我们可以重复之前的过程：创建或编辑文件 > 使用 `git add .` 将所有文件添加到暂存区 > 然后使用 `git commit -m "meaningful message"`，这样做完全没问题。
But to be able to offer a meaningful message on commit of what has changed you might not want to write something out like `git commit -m "Well, I changed some code because it did not work and when I fixed that I also added something new to the readme.mdto ensure everyone knew about the user experience and then I made a tea."`
但是，为了在提交时提供关于更改内容的有意义的消息，你可能不想写出像 `git commit -m "Well, I changed some code because it did not work and when I fixed that I also added something new to the readme.mdto ensure everyone knew about the user experience and then I made a tea."` 这样的内容。
I mean this would work as well although probably make it descriptive but the preferred way here is to add this with a text editor.
我的意思是，这样做也行，尽管可能不够描述性，但这里首选的方式是使用文本编辑器来添加信息。

If we run `git commit` after running `git add` it will open our default text editor which in my case here is nano.
如果我们在运行 `git add` 之后运行 `git commit`，它将打开我们的默认文本编辑器，在我这里是 nano。
Here are the steps I took to add some changes to the file, ran `git status` to show what is and what is not staged.
以下是我进行操作的步骤：向文件添加了一些更改，运行 `git status` 以显示哪些已暂存哪些未暂存。
Then I used `git add` to add the file to the staging area, then ran `git commit` which opened nano.
然后我使用 `git add` 将文件添加到暂存区，接着运行 `git commit`，这打开了 nano。

![](Images/Day38_Git6.png)

When nano opens you can then add your short and long description and then save the file.
当 nano 打开时，你可以添加你的简短和详细描述，然后保存文件。

![](Images/Day38_Git7.png)

### Committing Best Practices

There is a balance here between when to commit and commit often.
关于何时提交以及经常提交之间存在一个平衡点。
We don't want to wait to the end of the project before committing, each commit should be meaningful and they also should not be coupled with non-relevant tasks with each other.
我们不想等到项目结束才提交，每个提交都应该是有意义的，并且它们不应该与彼此不相关的任务耦合在一起。
If you have a bug fix and a typo make sure they are two separate commits as a best practice.
如果有一个错误修复和一个拼写错误，作为最佳实践，请确保它们是两次单独的提交。

Make the commit message mean something.
让提交信息具有意义。

In terms of wording, the team or yourself should be sticking to the same wording for each commit.
在措辞方面，团队或你自己应该坚持为每次提交使用相同的措辞。

### Skipping the Staging Area

Do we always have to stage our changes before committing them?
在提交更改之前，我们总是需要先暂存它们吗？

The answer is yes but don't see this as a shortcut, you have to be sure 100% that you are not needing that snapshot to roll back to, it is a risky thing to do.
答案是可以，但不要将其视为捷径，你必须百分之百确定你不需要该快照进行回滚，这样做是有风险的。

![](Images/Day38_Git8.png)

### Removing Files

What about removing files from our project, maybe we have another file in our directory that we have committed but now the project no longer needs or using it, as a best practice we should remove it.
那么从项目中删除文件呢？也许我们的目录中有一个已经提交的文件，但项目现在不再需要或使用了，作为最佳实践，我们应该将其删除。

Just because we remove the file from the directory, git is still aware of this file and we also need to remove it from the repository.
仅仅因为我们从目录中删除了该文件，Git仍然知道该文件，因此我们还需要将其从仓库中删除。
You can see the workflow for this below.
你可以在下面看到这个工作流程。

![](Images/Day38_Git9.png)

That could be a bit of a pain to either remember or have to deal with if you have a large project which has many moving files and folders.
如果你有一个包含许多移动文件和文件夹的大型项目，这可能有点麻烦，无论是记住操作还是实际处理起来。
We can do this with one command with `git rm oldcode.ps1`
我们可以通过一个命令来完成此操作：`git rm oldcode.ps1`

![](Images/Day38_Git10.png)

### Renaming or Moving Files

Within our operating system, we can rename and move our files.
在我们的操作系统中，我们可以重命名和移动文件。
We will no doubt need to do this from time to time with our projects.
毫无疑问，我们的项目会不时需要这样做。
Similar to removing though there is a two-step process, we change our files on our OS and then we have to modify and make sure that the staging area or that the files are added correctly.
然而，与删除类似，这是一个两步过程：我们在操作系统上更改文件，然后我们必须修改并确保暂存区或文件被正确添加。
Steps as follows:
步骤如下：

![](Images/Day38_Git11.png)

However, like removing files from the operating system and then the git repository we can perform this rename using a git command too.
然而，就像从操作系统中删除文件然后再从 Git 仓库中删除一样，我们也可以使用 Git 命令来执行重命名操作。

![](Images/Day38_Git12.png)

### Ignoring Files

We may have the requirement to ignore files or folders within our project that we might be using locally or that will be just wasted space if we were to share with the overall project, a good example of this could be logs.
我们可能需要忽略项目中的某些文件或文件夹，这些文件或文件夹可能仅供本地使用，或者如果与整个项目共享，它们只会浪费空间，一个很好的例子就是日志文件。
I also think using this for secrets that you do not want to be shared out in public or across teams.
我也认为可以使用它来处理你不希望在公共场合或团队之间共享的密钥（secrets）。

We can ignore files by adding folders or files to the `.gitignore` file in our project directory.
我们可以通过将文件夹或文件添加到项目目录中的 `.gitignore` 文件来忽略它们。

![](Images/Day38_Git13.png)

You can then open the `.gitignore` file and see that we have the logs/ directory present.
然后你可以打开 `.gitignore` 文件，看到其中存在 logs/ 目录。
But we could also add additional files and folders here to ignore.
但我们也可以在这里添加额外的文件和文件夹进行忽略。

![](Images/Day38_Git14.png)

We can then see `git status` and then see what has happened.
然后我们可以查看 `git status`，看看发生了什么。

![](Images/Day38_Git15.png)

There are also ways in which you might need to go back and ignore files and folders, maybe you did want to share the logs folder but then later realised that you didn't want to.
还有一些情况，你可能需要回头去忽略文件和文件夹，也许你最初想共享 logs 文件夹，但后来意识到你不想要了。
You will have to use `git rm --cached ` to remove files and folders from the staging area if you have a previously tracked folder that you now want to ignore.
如果你有一个以前被跟踪的文件夹现在想要忽略，你必须使用 `git rm --cached ` 命令从暂存区中删除文件和文件夹。

### Short Status

We have been using `git status` a lot to understand what we have in our staging area and what we do not, it's a very comprehensive command with lots of detail.
我们经常使用 `git status` 来了解暂存区中有什么和没有什么，这是一个非常全面且包含大量细节的命令。
Most of the time you will just want to know what has been modified or what is new?
但大多数时候，你可能只想知道哪些文件被修改了或哪些是新增的？
We can use `git status -s` for a short status of this detail.
我们可以使用 `git status -s` 来获取这些细节的简短状态。
I would usually set an alias on my system to just use `git status -s` vs the more detailed command.
我通常会在我的系统上设置一个别名，以便直接使用 `git status -s`，而不是使用更详细的命令。

![](Images/Day38_Git16.png)

In the post tomorrow we will continue to look through these short examples of these common git commands.
在明天的文章中，我们将继续查看这些常见 Git 命令的简短示例。

## Resources

- [What is Version Control?](https://www.youtube.com/watch?v=Yc8sCSeMhi4)
- [Types of Version Control System](https://www.youtube.com/watch?v=kr62e_n6QuQ)
- [Git Tutorial for Beginners](https://www.youtube.com/watch?v=8JJ101D3knE&t=52s)
- [Git for Professionals Tutorial](https://www.youtube.com/watch?v=Uszj_k0DGsg)
- [Git and GitHub for Beginners - Crash Course](https://www.youtube.com/watch?v=RGOj5yH7evk&t=8s)
- [Complete Git and GitHub Tutorial](https://www.youtube.com/watch?v=apGV9Kg7ics)
- [Git cheatsheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)

See you on [Day 39](day39.md)
