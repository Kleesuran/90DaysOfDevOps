---
title: '#90DaysOfDevOps - Social Network for code - Day 40'
published: false
description: 90DaysOfDevOps - Social Network for code
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049044
---

## Social Network for code

Exploring GitHub | GitLab | BitBucket

Today I want to cover some of the git-based services that we have likely all heard of and expect we also use daily.
今天我想介绍一些我们可能都听说过并且日常使用的基于 Git 的服务。

We will then use some of our prior session knowledge to move copies of our data to each of the main services.
然后，我们将利用之前学到的一些知识，将数据副本迁移到每一个主要服务上。

I called this section "Social Network for Code" let me explain why?
我将这部分称为“代码社交网络”，让我解释一下原因？

### GitHub

Most common at least for me is GitHub, GitHub is a web-based hosting service for git. It is most commonly used by software developers to store their code. Source Code Management with the git version control features as well as a lot of additional features. It allows for teams or open contributors to easily communicate and provides a social aspect to coding. (hence the social networking title) Since 2018 GitHub is part of Microsoft.
对我来说最常见的是 GitHub，GitHub 是一个基于网络的 Git 托管服务。它最常被软件开发人员用于存储他们的代码。它提供了带有 Git 版本控制功能的源代码管理，以及许多附加功能。它允许团队或开放贡献者轻松地进行交流，并为编码提供了一个社交方面。（因此得名社交网络）自 2018 年以来，GitHub 成为微软的一部分。

GitHub has been around for quite some time and was founded in 2007/2008. With Over 40 million users on the platform today.
GitHub 已经存在很长时间了，成立于 2007/2008 年。如今，该平台拥有超过 4000 万用户。

GitHub Main Features
GitHub 主要功能

- Code Repository
- Pull Requests
- Project Management toolset - Issues
- CI / CD Pipeline - GitHub Actions

In terms of pricing, GitHub has different levels of pricing for its users. More can be found on [Pricing](https://github.com/pricing)
在定价方面，GitHub 为其用户提供了不同的定价等级。更多信息可以在[定价](https://github.com/pricing)页面找到。

For this, we will cover the free tier.
为此，我们将介绍免费层级。

I am going to be using my already created GitHub account during this walkthrough, if you do not have an account then on the opening GitHub page there is a sign-up option and some easy steps to get set up.
在本次演练中，我将使用我已创建的 GitHub 账户。如果您还没有账户，那么在 GitHub 首页上有一个注册选项和一些简单的设置步骤。

### GitHub opening page

When you first log in to your GitHub account you get a page containing a lot of widgets giving you options of where and what you would like to see or do. First up we have the "All Activity" this is going to give you a look into what is happening with your repositories or activity in general associated with your organisation or account.
当您第一次登录到您的 GitHub 账户时，您会看到一个包含很多小部件的页面，这些小部件为您提供了查看或执行操作的选项。首先是“所有活动”（All Activity），这会向您展示与您的组织或账户相关的存储库或一般活动的最新动态。

![](Images/Day40_Git1.png)

Next, we have our Code Repositories, either our own or repositories that we have interacted with recently. We can also quickly create new repositories or search repositories.
接下来，我们有代码存储库，包括我们自己的或最近互动过的存储库。我们还可以快速创建新的存储库或搜索存储库。

![](Images/Day40_Git2.png)

We then have our recent activity, these for me are issues and pull requests that I have created or contributed to recently.
然后是我们的最近活动，对我来说，这些是我最近创建或贡献的 Issues（问题）和 Pull Requests（拉取请求）。

![](Images/Day40_Git3.png)

Over on the right side of the page, we have some referrals for repositories that we might be interested in, most likely based on your recent activity or own projects.
在页面的右侧，有一些我们可能感兴趣的存储库推荐，这些推荐很可能是基于您最近的活动或自己的项目。

![](Images/Day40_Git4.png)

To be honest I am very rarely on my home page that we just saw and described, although I now see that the feed could be really useful to help interact with the community a little better on certain projects.
说实话，我很少停留在我们刚刚看到和描述的这个主页上，尽管我现在意识到，这个动态（feed）可能真的很有用，可以帮助我更好地与特定项目上的社区进行互动。

Next up if we want to head into our GitHub Profile we can navigate to the top right corner and on your image, there is a drop-down which allows you to navigate through your account. From here to access your Profile select "Your Profile"
接下来，如果我们想进入我们的 GitHub 个人资料，我们可以导航到右上角，在您的头像上有一个下拉菜单，允许您浏览您的账户。从这里，选择“Your Profile”（您的个人资料）来访问您的个人资料。

![](Images/Day40_Git5.png)

Next, your profile page will appear, by default, unless you change your configuration you are not going to see what I have, I have added some functionality that shows my recent blog posts over on [vZilla](https://vzilla.co.uk) and then also my latest videos on my [YouTube](https://m.youtube.com/c/MichaelCade1) Channel.
接下来，您的个人资料页面将出现。默认情况下，除非您更改配置，否则您不会看到我所拥有的内容。我添加了一些功能，展示我在 [vZilla](https://vzilla.co.uk) 上的最新博客文章，以及我在 [YouTube](https://m.youtube.com/c/MichaelCade1) 频道上的最新视频。

You are not going to be spending much time looking at your profile, but this is a good profile page to share around your network so they can see the cool projects you are working on.
您不会花太多时间查看您的个人资料，但这是一个很好的个人资料页面，可以分享给您的网络，让他们看到您正在从事的酷炫项目。

![](Images/Day40_Git6.png)

We can then drill down into the building block of GitHub, the repositories. Here you are going to see your repositories and if you have private repositories they are also going to be shown in this long list.
然后我们可以深入研究 GitHub 的基石——存储库（repositories）。在这里，您将看到您的存储库，如果您有私有存储库，它们也会显示在这个长列表中。

![](Images/Day40_Git7.png)

As the repository is so important to GitHub let me choose a pretty busy one of late and run through some of the core functionality that we can use here on top of everything I am already using when it comes to editing our "code" in git on my local system.
由于存储库对 GitHub 非常重要，让我选择一个最近比较活跃的存储库，并介绍一些我们可以在这里使用的核心功能，这些功能是在我本地系统上编辑 Git 中的“代码”时已经使用的功能之上进行的补充。

First of all, from the previous window, I have selected the 90DaysOfDevOps repository and we get to see this view. You can see from this view we have a lot of information, we have our main code structure in the middle showing our files and folders that are stored in our repository. We have our readme.md being displayed down at the bottom. Over to the right of the page, we have an about section where the repository has a description and purpose. Then we have a lot of information underneath this showing how many people have starred in the project, forked, and watched.
首先，在前一个窗口中，我选择了 90DaysOfDevOps 存储库，我们看到了这个视图。您可以看到，在这个视图中我们有很多信息。中间是我们的主要代码结构，显示了存储在存储库中的文件和文件夹。底部显示着我们的 readme.md 文件。在页面的右侧，有一个“关于”部分，其中包含存储库的描述和目的。在这之下，我们还有很多信息，显示了有多少人给项目加星（starred）、多少人派生（forked）以及多少人关注（watched）。

![](Images/Day40_Git8.png)

If we scroll down a little further you will also see that we have Released, these are from the golang part of the challenge. We do not have any packages in our project, we have our contributors listed here. (Thank you community for assisting in my spelling and fact checking) We then have languages used again these are from different sections in the challenge.
如果我们再向下滚动一点，您还会看到我们有“发布”（Released）内容，这些来自挑战的 golang 部分。我们的项目中没有任何包（packages），这里列出了我们的贡献者。（感谢社区在我的拼写和事实核查方面提供的帮助）然后是使用的语言，这些也来自挑战的不同部分。

![](Images/Day40_Git9.png)

A the top of the page you are going to see a list of tabs. These may vary and these can be modified to only show the ones you require. You will see here that I am not using all of these and I should remove them to make sure my whole repository is tidy.
在页面的顶部，您将看到一个标签列表。这些标签可能会有所不同，并且可以修改以仅显示您需要的那些。您会看到，我没有使用所有这些标签，我应该移除它们以确保我的整个存储库整洁。

First up we had the code tab which we just discussed but these tabs are always available when navigating through a repository which is super useful so we can jump between sections quickly and easily. Next, we have the issues tab.
首先是“代码”（Code）标签，我们刚刚讨论过它。这些标签在浏览存储库时始终可用，这非常有用，因此我们可以快速轻松地在各个部分之间跳转。接下来，我们有“问题”（Issues）标签。

Issues let you track your work on GitHub, where development happens. In this specific repository you can see I have some issues focused on adding diagrams or typos but also we have an issue stating a need or requirement for a Chinese version of the repository.
问题让您可以在 GitHub 上跟踪您的工作，那里是开发发生的地方。在这个特定的存储库中，您可以看到我有一些问题是关于添加图表或错别字的，但我们也有一个问题是关于对存储库的中文版本提出需求或要求。

If this was a code repository then this is a great place to raise concerns or issues with the maintainers, but remember to be mindful and detailed about what you are reporting, and give as much detail as possible.
如果这是一个代码存储库，那么这是一个向维护者提出关注或问题的绝佳场所，但请记住要谨慎并详细说明您报告的内容，并提供尽可能多的细节。

![](Images/Day40_Git10.png)

The next tab is Pull Requests, Pull requests let you tell others about changes you've pushed to a branch in a repository. This is where someone may have forked your repository, made changes such as bug fixes or feature enhancements or just typos in a lot of the cases in this repository.
下一个标签是“拉取请求”（Pull Requests）。拉取请求允许您告知其他人您已推送到存储库分支的更改。在这里，可能有人派生了您的存储库，进行了更改，例如错误修复、功能增强，或者在这个存储库的许多情况下，只是修正了错别字。

We will cover forking later on.
我们将在后面介绍派生（forking）。

![](Images/Day40_Git11.png)

I believe the next tab is quite new? But I thought for a project like #90DaysOfDevOps this could help guide the content journey but also help the community as they walk through their learning journey. I have created some discussion groups for each section of the challenge so people can jump in and discuss.
我相信下一个标签是相当新的？但我认为对于像 #90DaysOfDevOps 这样的项目，这可以帮助指导内容旅程，同时也可以帮助社区完成他们的学习旅程。我为挑战的每个部分创建了一些讨论组，这样人们就可以加入并进行讨论。

![](Images/Day40_Git12.png)

The Actions tab is going to enable you to build, test and deploy code and a lot more right from within GitHub. GitHub Actions will be something we cover in the CI/CD section of the challenge but this is where we can set some configuration here to automate steps for us.
“动作”（Actions）标签将使您能够直接在 GitHub 内部构建、测试和部署代码以及执行更多操作。GitHub Actions 将是我们将在挑战的 CI/CD 部分介绍的内容，但我们可以在这里设置一些配置来为我们自动化步骤。

On my main GitHub Profile, I am using GitHub Actions to fetch the latest blog posts and YouTube videos to keep things up to date on that home screen.
在我的主 GitHub 个人资料上，我正在使用 GitHub Actions 来抓取最新的博客文章和 YouTube 视频，以确保该主屏幕上的内容保持最新。

![](Images/Day40_Git13.png)

I mentioned above how GitHub is not just a source code repository but is also a project management tool, The Project tab enables us to build out project tables kanban type boards so that we can link issues and PRs to better collaborate on the project and have visibility of those tasks.
我在上面提到 GitHub 不仅仅是一个源代码存储库，它还是一个项目管理工具。“项目”（Project）标签使我们能够构建出看板类型的项目表格，以便我们可以关联 Issues 和 PRs，从而更好地协作处理项目并对这些任务具有可见性。

![](Images/Day40_Git14.png)

I know that issues to me seem like a good place to log feature requests and they are but the wiki page allows for a comprehensive roadmap for the project to be outlined with the current status and in general better document your project is it troubleshooting or how-to type content.
我知道对我来说，Issues 似乎是记录功能请求的好地方，它们确实是，但 Wiki 页面允许概述项目的全面路线图，包括当前状态，并且通常更好地记录您的项目，无论是故障排除还是操作指南类的内容。

![](Images/Day40_Git15.png)

Not so applicable to this project but the Security tab is there to make sure that contributors know how to deal with certain tasks, we can define a policy here but also code scanning add-ons to make sure your code for example does not contain secret environment variables.
虽然不太适用于本项目，但“安全”（Security）标签旨在确保贡献者知道如何处理某些任务。我们可以在这里定义策略，还可以添加代码扫描插件，以确保您的代码（例如）不包含秘密环境变量。

![](Images/Day40_Git16.png)

For me the insights tab is great, it provides so much information about the repository from how much activity has been going on down to commits and issues, but it also reports on traffic to the repository. You can see a list on the left side that allows you to go into great detail about metrics on the repository.
对我来说，“洞察”（Insights）标签很棒，它提供了关于存储库的很多信息，从发生的活动量到提交和问题，它还报告了对存储库的流量。您可以在左侧看到一个列表，允许您深入了解存储库的详细指标。

![](Images/Day40_Git17.png)

Finally, we have the Settings tab, this is where we can get into the details of how we run our repository, I am currently the only maintainer of the repository but we could share this responsibility here. We can define integrations and other such tasks here.
最后，我们有“设置”（Settings）标签。这是我们可以深入了解如何运营我们的存储库的地方。我目前是该存储库的唯一维护者，但我们可以在这里共享此责任。我们可以在这里定义集成和执行其他此类任务。

![](Images/Day40_Git18.png)

This was a super quick overview of GitHub, I think there are some other areas that I might have mentioned that need explaining in a little more detail. As mentioned GitHub houses millions of repositories mostly these are holding source code and these can be public or privately accessible.
这是对 GitHub 的一个超快速概述。我认为我提到的一些其他领域需要更详细地解释一下。如前所述，GitHub 拥有数百万个存储库，其中大部分存储源代码，并且可以是公开或私有访问的。

### Forking

I am going to get more into Open-Source in the session tomorrow but a big part of any code repository is the ability to collaborate with the community. Let's think of the scenario I want a copy of a repository because I want to make some changes to it, maybe I want to fix a bug or maybe I want to change something to use it for a use case that I have that was maybe not the intended use case for the original maintainer of the code. This is what we would call forking a repository. A fork is a copy of a repository. Forking a repository allows you to freely experiment with changes without affecting the original project.
我会在明天的会议中更多地深入研究开源，但任何代码存储库的重要组成部分都是与社区协作的能力。让我们考虑一下这样的场景：我想要一个存储库的副本，因为我想对其进行一些更改，也许我想修复一个错误，或者我想更改某些内容以将其用于我所拥有的、但可能不是代码原始维护者预期的用例。这就是我们所说的派生（forking）存储库。派生是存储库的一个副本。派生一个存储库允许您自由地试验更改，而不会影响原始项目。

Let me head back to the opening page after login and see one of those suggested repositories.
让我回到登录后的初始页面，看看其中一个推荐的存储库。

![](Images/Day40_Git19.png)

If we click on that repository we are going to get the same look as we have just walked through on the 90DaysOfDevOps repository.
如果我们点击该存储库，我们将看到与我们在 90DaysOfDevOps 存储库上刚刚浏览的视图相同的外观。

![](Images/Day40_Git20.png)

If we notice below we have 3 options, we have watch, fork and star.
如果我们注意下面，我们有 3 个选项：Watch（关注）、Fork（派生）和 Star（加星）。

- Watch - Updates when things happen to the repository.
- Fork - a copy of a repository.
- Star - "I think your project is cool"

![](Images/Day40_Git21.png)

Given our scenario of wanting a copy of this repository to work on we are going to hit the fork option. If you are a member of multiple organisations then you will have to choose where the fork will take place, I am going to choose my profile.
鉴于我们想要一个存储库副本进行工作的场景，我们将点击“Fork”选项。如果您是多个组织的成员，那么您将不得不选择派生发生的位置，我将选择我的个人资料。

![](Images/Day40_Git22.png)

Now we have our copy of the repository that we can freely work on and change as we see fit. This would be the start of the pull request process that we mentioned briefly before but we will cover it in more detail tomorrow.
现在我们有了存储库的副本，我们可以自由地进行工作和更改，以满足我们的需求。这将是我们之前简要提到的拉取请求过程的开始，但我们将在明天更详细地介绍它。

![](Images/Day40_Git23.png)

Ok, I hear you say, but how do I make changes to this repository and code if it's on a website, well you can go through and edit on the website but it's not going to be the same as using your favourite IDE on your local system with your favourite colour theme. For us to get a copy of this repository on our local machine we will perform a clone of the repository. This will allow us to work on things locally and then push our changes back into our forked copy of the repository.
好的，我听到您问，但如果代码在网站上，我如何对这个存储库和代码进行更改呢？嗯，您可以通过网站进行编辑，但这与在您的本地系统上使用您最喜欢的 IDE 和您最喜欢的颜色主题进行编辑是不同的。为了在我们的本地机器上获得这个存储库的副本，我们将执行存储库的克隆（clone）。这将允许我们在本地进行工作，然后将我们的更改推送回我们派生的存储库副本中。

We have several options when it comes to getting a copy of this code as you can see below.
如您在下面所见，在获取此代码副本时，我们有几个选项。

There is a local version available of GitHub Desktop which gives you a visual desktop application to track changes and push and pull changes between local and GitHub.
有一个可用的 GitHub Desktop 本地版本，它为您提供了一个可视化的桌面应用程序，用于跟踪更改以及在本地和 GitHub 之间推送和拉取更改。

For this little demo, I am going to use the HTTPS URL we see on there.
对于这个小演示，我将使用我们在那里看到的 HTTPS URL。

![](Images/Day40_Git24.png)

Now on our local machine, I am going to navigate to a directory I am happy to download this repository to and then run `git clone url`
现在在我们的本地机器上，我将导航到一个我乐意下载此存储库的目录，然后运行 `git clone url`

![](Images/Day40_Git25.png)

Now we could take it to VScode to make some changes to this.
现在我们可以将其导入 VScode 进行一些更改。

![](Images/Day40_Git26.png)

Let's now make some changes, I want to make a change to all those links and replace that with something else.
现在让我们进行一些更改。我想更改所有这些链接，并用其他内容替换它们。

![](Images/Day40_Git27.png)

Now if we check back on GitHub and we find our readme.md in that repository, you should be able to see a few changes that I made to the file.
现在，如果我们回到 GitHub 并找到该存储库中的 readme.md 文件，您应该能够看到我对该文件所做的一些更改。

![](Images/Day40_Git28.png)

At this stage, this might be complete and we might be happy with our change as we are the only people going to use our new change but maybe it was a bug change and if that is the case then we will want to contribute via a Pull Request to notify the original repository maintainers of our change and see if they accept our changes.
在这个阶段，这可能已经完成，我们可能对我们的更改感到满意，因为我们是唯一使用我们新更改的人。但如果这是一个错误修复，那么我们将希望通过拉取请求（Pull Request）进行贡献，以通知原始存储库维护者我们的更改，并查看他们是否接受我们的更改。

We can do this by using the contribute button highlighted below. I will cover more on this tomorrow when we look into Open-Source workflows.
我们可以通过使用下面突出显示的“贡献”（contribute）按钮来做到这一点。明天当我们研究开源工作流程时，我将介绍更多相关内容。

![](Images/Day40_Git29.png)

I have spent a long time looking through GitHub and I hear some of you cry but what about other options!
我已经花了很长时间来浏览 GitHub，我听到有人问：那其他选项呢！

Well, there are and I am going to find some resources that cover the basics for some of those as well. You are going to come across GitLab and BitBucket amongst others in your travels and whilst they are git-based services they have their differences.
嗯，当然有。我也会找到一些资源来介绍其中一些服务的基础知识。在您的学习旅程中，您会遇到 GitLab 和 BitBucket 等服务。虽然它们都是基于 Git 的服务，但它们之间存在差异。

You will also come across hosted options. Most commonly here I have seen GitLab as a hosted version vs GitHub Enterprise (Don't believe there is a free hosted GitHub?)
您还会遇到自托管（hosted）选项。在这里，我最常见到的是 GitLab 的自托管版本，而不是 GitHub Enterprise (我不认为有免费的自托管 GitHub 版本？)。

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

See you on [Day 41](day41.md)
第 41 天见（See you on [Day 41](day41.md)）
