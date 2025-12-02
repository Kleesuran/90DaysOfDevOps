---
title: '#90DaysOfDevOps - Viewing, unstaging, discarding & restoring - Day 39'
published: false
description: '90DaysOfDevOps - Viewing, unstaging, discarding & restoring'
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048827
---

## Viewing, unstaging, discarding & restoring

Continuing from where we finished yesterday around some of the commands that we have with git and how to leverage git with your projects.
我们将继续昨天的内容，围绕 Git 中的一些命令以及如何将 Git 应用到你的项目中。
Remember we have not touched GitHub or any other git-based services yet this is all to help you keep control of your projects locally at the moment, but they will all become useful when we start to integrate into those tools.
请记住，我们尚未涉及 GitHub 或任何其他基于 Git 的服务，目前所有这些都是为了帮助你本地控制你的项目，但当我们开始整合这些工具时，它们都会变得非常有用。

### Viewing the Staged and Unstaged Changes

It is good practice to make sure you view the staged and unstaged code before committing. We can do this by running the `git diff --staged` command
在提交之前，最好检查一下暂存区和非暂存区的代码。我们可以通过运行 `git diff --staged` 命令来实现。

![](Images/Day39_Git1.png)

This then shows us all the changes we have made and all new files we have added or deleted.
这将显示我们所做的所有更改，以及我们添加或删除的所有新文件。

changes in the modified files are indicated with `---` or `+++` you can see below that we just added +add some text below which means they are new lines.
修改的文件中的更改用 `---` 或 `+++` 表示，你可以在下面看到我们刚刚添加了 +add some text below，这意味着它们是新行。

![](Images/Day39_Git2.png)

We can also run `git diff` to compare our staging area with our working directory. If we make some changes to our newly added file code.txt and add some lines of text.
我们还可以运行 `git diff` 来比较我们的暂存区和工作目录。如果我们对新添加的文件 code.txt 进行一些更改并添加一些文本行。

![](Images/Day39_Git3.png)

If we then run `git diff` we compare and see the output below.
如果我们随后运行 `git diff`，我们将进行比较并看到下面的输出。

![](Images/Day39_Git4.png)

### Visual Diff Tools

For me, the above is more confusing so I would much rather use a visual tool,
对我来说，上面的内容有点混乱，所以我更倾向于使用可视化工具，

To name a few visual diff tools:
举几个可视化差异（diff）工具：

- KDiff3
- P4Merge
- WinMerge (Windows Only)
- VSCode

To set this in git we run the following command `git config --global diff.tool vscode`
要在 Git 中设置此功能，我们运行以下命令 `git config --global diff.tool vscode`

We are going to run the above and we are going to set some parameters when we launch VScode.
我们将运行上面的命令，并在启动 VSCode 时设置一些参数。

![](Images/Day39_Git5.png)

We can also check our configuration with `git config --global -e`
我们还可以使用 `git config --global -e` 来检查我们的配置。

![](Images/Day39_Git6.png)

We can then use `git difftool` to now open our diff visual tool.
然后我们可以使用 `git difftool` 来打开我们的可视化差异工具。

![](Images/Day39_Git7.png)

Which then opens our VScode editor on the diff page and compares the two, we have only modified one file from nothing to now adding a line of code on the right side.
这随后在差异页面打开了我们的 VSCode 编辑器并进行了比较，我们只修改了一个文件，从空文件到现在在右侧添加了一行代码。

![](Images/Day39_Git8.png)

I find this method much easier to track changes and this is something similar to what we will see when we look into git-based services such as GitHub.
我发现这种方法更容易跟踪更改，这与我们在研究基于 Git 的服务（例如 GitHub）时将看到的内容相似。

We can also use `git difftool --staged` to compare stage with committed files.
我们还可以使用 `git difftool --staged` 来比较暂存区和已提交的文件。

![](Images/Day39_Git9.png)

Then we can cycle through our changed files before we commit.
然后我们可以在提交之前循环查看我们已更改的文件。

![](Images/Day39_Git10.png)

I am using VScode as my IDE and like most IDEs they have this functionality built in it is very rare you would need to run these commands from the terminal, although helpful if you don't have an IDE installed for some reason.
我正在使用 VSCode 作为我的 IDE，像大多数 IDE 一样，它们内置了此功能，所以你很少需要从终端运行这些命令，尽管如果由于某种原因你没有安装 IDE，这些命令会很有用。

### Viewing the History

We previously touched on `git log` which will provide us with a comprehensive view of all commits we have made in our repository.
我们之前提到过 `git log`，它将为我们提供我们在仓库中所做的所有提交的全面视图。

![](Images/Day39_Git11.png)

Each commit has its hexadecimal string, unique to the repository. Here you can see which branch we are working on and then also the author, date and commit message.
每次提交都有其十六进制字符串，对于该仓库来说是唯一的。在这里你可以看到我们正在处理哪个分支，以及作者、日期和提交消息。

We also have `git log --oneline` and this gives us a much smaller version of the hexadecimal string which we can use in other `diff` commands. We also only have the one-line description or commit message.
我们还有 `git log --oneline`，它为我们提供了一个小得多的十六进制字符串版本，我们可以在其他 `diff` 命令中使用。我们也只有一行描述或提交消息。

![](Images/Day39_Git12.png)

We can reverse this into a start with the first commit by running `git log --oneline --reverse` and now we see our first commit at the top of our page.
我们可以通过运行 `git log --oneline --reverse` 将其反转，从第一次提交开始，现在我们在页面顶部看到了我们的第一次提交。

![](Images/Day39_Git13.png)

### Viewing a Commit

Being able to look at the commit message is great if you have been conscious about following best practices and you have added a meaningful commit message, however, there is also `git show` command which allows us to inspect and view a commit.
如果你一直注意遵循最佳实践并添加了有意义的提交消息，那么能够查看提交消息是很棒的，但是，还有 `git show` 命令允许我们检查和查看提交。

We can use `git log --oneline --reverse` to get a list of our commits. and then we can take those and run `git show <commit ID>`
我们可以使用 `git log --oneline --reverse` 来获取提交列表。然后我们可以使用这些提交并运行 `git show <commit ID>`

![](Images/Day39_Git14.png)

The output of that command will look like below with the detail of the commit, author and what changed.
该命令的输出将如下所示，包含提交的详细信息、作者和更改的内容。

![](Images/Day39_Git15.png)

We can also use `git show HEAD~1` where 1 is how many steps back from the current version we want to get back to.
我们还可以使用 `git show HEAD~1`，其中 1 是我们希望从当前版本回溯的步数。

This is great if you want some detail on your files, but if we want to list all the files in a tree for the whole snapshot directory. We can achieve this by using the `git ls-tree HEAD~1` command, again going back one snapshot from the last commit. We can see below we have two blobs, these indicate files whereas the tree would indicate a directory. You can also see commits and tags in this information.
如果你想了解文件的一些详细信息，这很棒，但如果我们要列出整个快照目录中树中的所有文件，我们可以使用 `git ls-tree HEAD~1` 命令来实现，同样是从上次提交回溯一个快照。我们可以在下面看到我们有两个 blob（二进制大对象），它们表示文件，而 tree（树）则表示目录。你也可以在此信息中看到提交和标签。

![](Images/Day39_Git16.png)

We can then use the above to drill in and see the contents of our file (blobs) using the `git show` command.
然后我们可以使用上面的信息，通过 `git show` 命令深入查看我们文件 (blob) 的内容。

![](Images/Day39_Git17.png)

Then the contents of that specific version of the file will be shown.
然后将显示该特定版本文件的内容。

![](Images/Day39_Git18.png)

### Unstaging Files

There will be a time when you have maybe used `git add .` but there are files you do not wish to commit to that snapshot just yet. In this example below I have added newfile.txt to my staging area but I am not ready to commit this file so I am going to use the `git restore --staged newfile.txt` to undo the `git add` step.
有时你可能使用了 `git add .`，但有些文件你暂时不想提交到该快照中。在下面的示例中，我已将 newfile.txt 添加到暂存区，但我尚未准备好提交此文件，因此我将使用 `git restore --staged newfile.txt` 来撤消 `git add` 步骤。

![](Images/Day39_Git19.png)

We can also do the same to modified files such as main.js and unstage the commit, see above we have a green M for modified and then below we are unstaging those changes.
我们也可以对像 main.js 这样的已修改文件执行相同的操作并取消暂存提交，请看上面，我们有一个绿色的 M 表示已修改（modified），然后在下面我们正在取消暂存这些更改。

![](Images/Day39_Git20.png)

I have found this command quite useful during the 90DaysOfDevOps as I sometimes work ahead of the days where I feel I want to make notes for the following day but I don't want to commit and push to the public GitHub repository.
在 90DaysOfDevOps 期间，我发现这个命令非常有用，因为我有时会提前工作，想为第二天做笔记，但又不想提交并推送到公共 GitHub 仓库。

### Discarding Local Changes

Sometimes we might make changes but we are not happy with those changes and we want to throw them away. We are going to use the `git restore` command again and we are going to be able to restore files from our snapshots or previous versions. We can run `git restore .` against our directory and we will restore everything from our snapshot but notice that our untracked file is still present. There is no previous file being tracked called newfile.txt.
有时我们可能会进行一些更改，但我们对这些更改不满意并想将其丢弃。我们将再次使用 `git restore` 命令，并且能够从我们的快照或先前版本中恢复文件。我们可以对目录运行 `git restore .`，它将从快照中恢复所有内容，但请注意，我们的未跟踪文件仍然存在。没有名为 newfile.txt 的先前被跟踪的文件。

![](Images/Day39_Git21.png)

Now to remove newfile.txt or any untracked files. We can use `git clean` we will get a warning alone.
现在要删除 newfile.txt 或任何未跟踪的文件。我们可以使用 `git clean`，单独使用时我们会收到警告。

![](Images/Day39_Git22.png)

Or if we know the consequences then we might want to run `git clean -fd` to force and remove all directories.
或者，如果我们知道后果，我们可能需要运行 `git clean -fd` 来强制删除所有目录。

![](Images/Day39_Git23.png)

### Restoring a File to an Earlier Version

As we have alluded to throughout a big portion of what Git can help with is being able to restore copies of your files from your snapshots (this is not a backup but it is a very fast restore point) My advice is that you also save copies of your code in other locations using a backup solution for this.
正如我们一直提到的，Git 可以提供帮助的一个重要部分是能够从你的快照中恢复文件的副本（这不是备份，但它是一个非常快速的恢复点）。我的建议是，你也应该使用备份解决方案将代码副本保存在其他位置。

As an example let's go and delete our most important file in our directory, notice we are using Unix-based commands to remove this from the directory, not git commands.
举个例子，让我们删除目录中最重要的文件，请注意，我们正在使用基于 Unix 的命令从目录中删除它，而不是 Git 命令。

![](Images/Day39_Git24.png)

Now we have no readme.md in our working directory. We could have used `git rm readme.md` and this would then be reflected in our git database. Let's also delete it from here to simulate it being removed completely.
现在我们的工作目录中没有 readme.md。我们本可以使用 `git rm readme.md`，这将在我们的 Git 数据库中得到反映。我们也从这里删除它，以模拟它被完全删除。

![](Images/Day39_Git25.png)

Let's now commit this with a message and prove that we no longer have anything in our working directory or staging area.
现在让我们使用一条消息提交此更改，并证明我们的工作目录或暂存区中不再有任何内容。

![](Images/Day39_Git26.png)

Mistakes were made and we now need this file back!
犯了错误，我们现在需要这个文件回来！

We could use the `git undo` command which will undo the last commit, but what if it was a while back? We can use our `git log` command to find our commits and then we find that our file is in the last commit but we don't all of those commits to be undone so we can then use this command `git restore --source=HEAD~1 README.md` to specifically find the file and restore it from our snapshot.
我们可以使用 `git undo` 命令来撤消上次提交，但如果这是很久以前的提交怎么办？我们可以使用 `git log` 命令来查找我们的提交，然后我们发现我们的文件在上次提交中，但我们不想撤消所有这些提交，因此我们可以使用此命令 `git restore --source=HEAD~1 README.md` 来专门查找文件并从我们的快照中恢复它。

You can see using this process we now have the file back in our working directory.
你可以看到，使用这个过程，我们现在已经将文件恢复到我们的工作目录中。

![](Images/Day39_Git27.png)

We now have a new untracked file and we can use our commands previously mentioned to track, stage and commit our files and changes.
我们现在有了一个新的未跟踪文件，我们可以使用前面提到的命令来跟踪、暂存和提交我们的文件和更改。

### Rebase vs Merge

This seems to be the biggest headache when it comes to Git and when to use rebase vs using merge on your git repositories.
当涉及到 Git 以及何时在 Git 仓库中使用 rebase（变基）与 merge（合并）时，这似乎是最大的难题。

The first thing to know is that both `git rebase` and `git merge` solve the same problem. Both are to integrate changes from one branch into another branch. However, they do this in different ways.
首先要知道的是，`git rebase` 和 `git merge` 解决的是同一个问题。两者都是为了将一个分支的更改集成到另一个分支中。但是，它们以不同的方式完成此操作。

Let's start with a new feature in a new dedicated branch. The Main branch continues with new commits.
让我们从一个新专用分支中的新功能开始。主分支继续进行新的提交。

![](Images/Day39_Git28.png)

The easy option here is to use `git merge feature main` which will merge the main branch into the feature branch.
这里简单的选择是使用 `git merge feature main`，它会将主分支合并到功能分支中。

![](Images/Day39_Git29.png)

Merging is easy because it is non-destructive. The existing branches are not changed in any way. However, this also means that the feature branch will have an irrelevant merge commit every time you need to incorporate upstream changes. If the main is very busy or active this will or can pollute the feature branch history.
合并很容易，因为它是非破坏性的。现有分支不会以任何方式更改。但是，这也意味着每次你需要合并上游更改时，功能分支都会有一个不相关的合并提交。如果主分支非常繁忙或活跃，这将会或可能会污染功能分支的历史记录。

As an alternate option, we can rebase the feature branch onto the main branch using
作为替代选项，我们可以使用以下方法将功能分支变基到主分支上：

```
git checkout feature
git rebase main
```

This moves the feature branch (the entire feature branch) effectively incorporating all of the new commits in the main. But, instead of using a merge commit, rebasing re-writes the project history by creating brand new commits for each commit in the original branch.
这会移动功能分支（整个功能分支），有效地合并主分支中的所有新提交。但是，rebase 不使用合并提交，而是通过为原始分支中的每次提交创建全新的提交来重写项目历史记录。

![](Images/Day39_Git30.png)

The biggest benefit of rebasing is a much cleaner project history. It also eliminates unnecessary merge commits. and as you compare the last two images, you can follow arguably a much cleaner linear project history.
Rebase 的最大好处是项目历史记录更加清晰。它还消除了不必要的合并提交。并且当你比较最后两张图片时，你可以看到一个更清晰的线性项目历史记录。

Although it's still not a foregone conclusion, choosing the cleaner history also comes with tradeoffs, If you do not follow the [The Golden rule of rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing#the-golden-rule-of-rebasing) re-writing project history can be potentially catastrophic for your collaboration workflow. And, less importantly, rebasing loses the context provided by a merge commit—you can’t see when upstream changes were incorporated into the feature.
尽管这仍然没有定论，但选择更清晰的历史记录也伴随着权衡。如果你不遵循 [变基的黄金法则](https://www.atlassian.com/git/tutorials/merging-vs-rebasing#the-golden-rule-of-rebasing)，重写项目历史记录可能会对你的协作工作流程造成潜在的灾难性后果。而且，不那么重要的是，rebase 失去了合并提交提供的上下文——你无法看到上游更改何时合并到功能中。

## Resources

- [What is Version Control?](https://www.youtube.com/watch?v=Yc8sCSeMhi4)
- [Types of Version Control System](https://www.youtube.com/watch?v=kr62e_n6QuQ)
- [Git Tutorial for Beginners](https://www.youtube.com/watch?v=8JJ101D3knE&t=52s)
- [Git for Professionals Tutorial](https://www.youtube.com/watch?v=Uszj_k0DGsg)
- [Git and GitHub for Beginners - Crash Course](https://www.youtube.com/watch?v=RGOj5yH7evk&t=8s)
- [Complete Git and GitHub Tutorial](https://www.youtube.com/watch?v=apGV9Kg7ics)
- [Git cheatsheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)
- [Exploring the Git command line – A getting started guide](https://veducate.co.uk/exploring-the-git-command-line/)

See you on [Day40](day40.md)
