---
title: "#90DaysOfDevOps - The Open Source Workflow - Day 41"
published: false
description: 90DaysOfDevOps - The Open Source Workflow
tags: "DevOps, 90daysofdevops, learning"
cover_image: null
canonical_url: null
id: 1048806
---

## The Open Source Workflow

Hopefully, through the last 7 sections of Git, we have a better understanding of what git is and then how a git-based service such as GitHub integrates with git to provide a source code repository but also a way in which the wider community can collaborate on code and projects together.
希望通过前面关于 Git 的 7 个章节，我们对 Git 是什么有了更好的理解，并了解了像 GitHub 这样的基于 Git 的服务如何与 Git 集成，不仅提供源代码仓库，还为更广泛的社区提供了一种共同协作代码和项目的方式。

When we went through the GitHub fundamentals we went through the process of forking a random project and making a change to our local repository. Here we want to go one step further and contribute to an open-source project. Remember that contributing doesn't need to be bug fixes or coding features but it could also be documentation. Every little helps and it also allows you to get hands-on with some of the git functionality we have covered.
当我们学习 GitHub 基础知识时，我们经历了派生（forking）一个随机项目并对本地仓库进行更改的过程。在这里，我们想更进一步，为开源项目做出贡献。请记住，贡献不一定非得是错误修复或编码功能，它也可以是文档。点滴贡献都有帮助，它也让你能亲身体验我们所涵盖的一些 Git 功能。

## Fork a Project

The first thing we have to do is find a project we can contribute to. I have recently been presenting on the [Kanister Project](https://github.com/kanisterio/kanister) and I would like to share my presentations that are now on YouTube to the main readme.md file in the project.
我们要做的第一件事是找到一个我们可以做出贡献的项目。我最近一直在介绍 [Kanister Project](https://github.com/kanisterio/kanister)，我想将我现在 YouTube 上的演示文稿分享到项目的主 readme.md 文件中。

First of all, we need to fork the project. Let's run through that process. I am going to navigate to the link shared above and fork the repository.
首先，我们需要派生（fork）该项目。让我们走一遍这个过程。我将导航到上面分享的链接并派生该仓库。

![](Images/Day41_Git1.png)

We now have our copy of the whole repository.
现在我们拥有了整个仓库的副本。

![](Images/Day41_Git2.png)

For reference on the readme.md file the original Presentations listed are just these two so we need to fix this with our process.
作为参考，readme.md 文件中列出的原始演示文稿只有这两个，所以我们需要通过我们的流程来修复它。

![](Images/Day41_Git3.png)

## Clones to a local machine

Now we have our fork we can bring that down to our local and we can then start making our edits to the files. Using the code button on our repo we can grab the URL and then use `git clone url` in a directory we wish to place the repository.
现在我们有了派生（fork）的仓库，我们可以将其下载到本地，然后开始对文件进行编辑。使用我们仓库上的“Code”按钮，我们可以获取 URL，然后在我们希望放置仓库的目录中使用 `git clone url`。

![](Images/Day41_Git4.png)

## Make our changes

We have our project local so we can open VSCode or an IDE or text editor of your choice to add your modifications.
我们的项目已在本地，因此我们可以打开 VSCode 或您选择的 IDE 或文本编辑器来添加您的修改。

![](Images/Day41_Git5.png)

The readme.md file is written in markdown language and because I am modifying someone else's project I am going to follow the existing project formatting to add our content.
readme.md 文件是用 Markdown 语言编写的，因为我正在修改别人的项目，所以我将遵循现有的项目格式来添加我们的内容。

![](Images/Day41_Git6.png)

## Test your changes

We must as a best practice test our changes, this makes total sense if this was a code change to an application you would want to ensure that the application still functions after a code change, well we also must make sure that documentation is formatted and looks correct.
作为最佳实践，我们必须测试我们的更改；如果这是对应用程序的代码更改，您会希望确保应用程序在代码更改后仍能正常运行，这完全合理。同样，我们还必须确保文档格式正确且外观良好。

In vscode we can add a lot of plugins one of these is the ability to preview markdown pages.
在 VSCode 中，我们可以添加许多插件，其中之一就是预览 Markdown 页面的功能。

![](Images/Day41_Git7.png)

## Push changes back to our forked repository

We do not have the authentication to push our changes directly back to the Kanister repository so we have to take this route. Now that I am happy with our changes we can run through some of those now well-known git commands.
我们没有权限直接将更改推回 Kanister 仓库，所以我们必须采取这条路线。既然我对更改感到满意，我们就可以运行一些现在众所周知的 Git 命令了。

![](Images/Day41_Git8.png)

Now we go back to GitHub to check the changes once more and then contribute back to the master project.
现在我们回到 GitHub，再次检查更改，然后回馈到主项目。

Looks good.
看起来不错。

![](Images/Day41_Git9.png)

Now we can go back to the top of our forked repository for Kanister and we can see that we are 1 commit ahead of the kanisterio:master branch.
现在我们可以回到 Kanister 派生仓库的顶部，可以看到我们比 kanisterio:master 分支领先 1 个提交。

![](Images/Day41_Git10.png)

Next, we hit that contribute button highlighted above. We see the option to "Open Pull Request"
接下来，我们点击上面突出显示的“Contribute”按钮。我们看到了“Open Pull Request”（打开拉取请求）的选项。

![](Images/Day41_Git11.png)

## Open a pull request

There is quite a bit going on in this next image, top left you can now see we are in the original or the master repository. then you can see what we are comparing and that is the original master and our forked repository. We then have a create pull request button which we will come back to shortly. We have our single commit but if this was more changes you might have multiple commits here. then we have the changes we have made in the readme.md file.
下一张图片中有很多内容：左上方，您现在可以看到我们处于原始或主仓库中。然后您可以看到我们正在比较的内容，即原始 master 分支和我们派生（fork）的仓库。然后我们有一个“创建拉取请求”按钮，我们稍后会用到它。我们只有一个提交，但如果更改更多，您可能在此处看到多个提交。最后，我们看到了对 readme.md 文件所做的更改。

![](Images/Day41_Git12.png)

We have reviewed the above changes and we are ready to create a pull request by hitting the green button.
我们已经审查了上述更改，并准备好点击绿色按钮创建拉取请求。

Then depending on how the maintainer of a project has set out their Pull Request functionality on their repository you may or may not have a template that gives you pointers on what the maintainer wants to see.
然后，根据项目维护者在其仓库上设置拉取请求功能的方式，您可能会或可能不会看到一个模板，该模板会指导您维护者希望看到哪些内容。

This is again where you want to make a meaningful description of what you have done, clear and concise but with enough detail. You can see I have made a simple change overview and I have ticked documentation.
在这里，您需要再次为您所做的工作提供有意义的描述，要求清晰、简洁但有足够的细节。您可以看到我做了一个简单的更改概述，并勾选了“documentation”（文档）。

![](Images/Day41_Git13.png)

## Create a pull request

We are now ready to create our pull request. After hitting the "Create Pull Request" at the top of the page you will get a summary of your pull request.
我们现在准备创建拉取请求。点击页面顶部的“Create Pull Request”后，您将看到拉取请求的摘要。

![](Images/Day41_Git14.png)

Scrolling down you are likely to see some automation taking place, in this instance, we require a review and some checks are taking place. We can see that Travis CI is in progress and a build has started and this will check our update, making sure that before anything is merged we are not breaking things with our additions.
向下滚动，您可能会看到一些自动化正在发生。在这个例子中，我们要求进行审核，并且正在进行一些检查。我们可以看到 Travis CI 正在运行，并且构建已经开始，这将检查我们的更新，确保在合并任何内容之前，我们的添加不会破坏现有功能。

![](Images/Day41_Git15.png)

Another thing to note here is that the red in the screenshot above, can look a little daunting and look as if you have made mistakes! Don't worry you have not broken anything, my biggest tip here is this process is there to help you and the maintainers of the project. If you have made a mistake at least from my experience the maintainer will contact and advise on what to do next.
这里要注意的另一点是，上面截图中的红色可能看起来有点吓人，好像你犯了错误一样！别担心，你没有破坏任何东西。我在这里最大的建议是，这个过程是为了帮助您和项目维护者。如果确实犯了错误，至少根据我的经验，维护者会联系您并建议下一步该怎么做。

This pull request is now public for everyone to see [added Kanister presentation/resource #1237](https://github.com/kanisterio/kanister/pull/1237)
这个拉取请求现在已公开，供所有人查看：[added Kanister presentation/resource #1237](https://github.com/kanisterio/kanister/pull/1237)

I am going to publish this before the merge and pull requests are accepted so maybe we can get a little prize for anyone that is still following along and can add a picture of the successful PR?
我将在合并和拉取请求被接受之前发布此内容，也许我们可以为仍在跟进并能够添加成功 PR 图片的任何人提供一个小奖励？

1. Fork this repository to your own GitHub account
1. 将此仓库派生（fork）到您自己的 GitHub 帐户
2. Add your picture and possibly text
2. 添加您的图片和可能的文本
3. Push the changes to your forked repository
3. 将更改推送到您派生的仓库
4. Create a PR that I will see and approve.
4. 创建一个我能看到并批准的 PR。
5. I will think of some sort of prize
5. 我会想出某种奖品

Here is a picture of the succesful PR:
这是成功 PR 的图片：

![](Images/Day41_Git16.png)

This then wraps up our look into Git and GitHub, next we are diving into containers which starts with a big picture look into how, and why containers and also a look into virtualisation and how we got here.
至此，我们对 Git 和 GitHub 的研究就结束了。接下来，我们将深入研究容器，首先会宏观地了解容器是如何产生的、为什么需要容器，并回顾虚拟化以及我们是如何走到这一步的。

## Resources

- [Learn GitLab in 3 Hours | GitLab Complete Tutorial For Beginners](https://www.youtube.com/watch?v=8aV5AxJrHDg)
- [BitBucket Tutorials Playlist](https://www.youtube.com/watch?v=OMLh-5O6Ub8&list=PLaD4FvsFdarSyyGl3ooAm-ZyAllgw_AM5)
- [What is Version Control?](https://www.youtube.com/watch?v=Yc8sCSeMhi4)
- [Types of Version Control System](https://www.youtube.com/watch?v=kr62e_n6QuQ)
- [Git Tutorial for Beginners](https://www.youtube.com/watch?v=8JJ101D3knE&t=52s)
- [Git for Professionals Tutorial](https://www.youtube.com/watch?v=Uszj_k0DGsg)
- [Git and GitHub for Beginners - Crash Course](https://www.youtube.com/watch?v=RGOj5yH7evk&t=8s)
- [Complete Git and GitHub Tutorial](https://www.youtube.com/watch?v=apGV9Kg7ics)
- [Git cheatsheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)

See you on [Day 42](day42.md)
我们在 [第 42 天](day42.md) 见
