---
title: '#90DaysOfDevOps - GitHub Actions Overview - Day 75'
published: false
description: 90DaysOfDevOps - GitHub Actions Overview
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049070
---

## GitHub Actions Overview

In this section, I wanted to move on and take a look at maybe a different approach to what we just spent time on. GitHub Actions is what we will focus on in this session.
在本节中，我想继续探讨与我们刚刚花费时间研究的方法可能有所不同的另一种方法。GitHub Actions 是我们本次会议将重点关注的内容。

GitHub Actions is a CI/CD platform that allows us to build, test and deploy amongst other tasks in our pipeline. It has the concept of workflows that build and test against a GitHub repository. You could also use GitHub Actions to drive other workflows based on events that happen within your repository.
GitHub Actions 是一个 CI/CD 平台，它允许我们在流水线中进行构建、测试和部署等任务。它具有工作流的概念，这些工作流针对 GitHub 仓库进行构建和测试。您还可以使用 GitHub Actions 根据仓库中发生的事件来驱动其他工作流。

### Workflows

Overall, in GitHub Actions, our task is called a **Workflow**.
总的来说，在 GitHub Actions 中，我们的任务被称为一个 **工作流 (Workflow)**。

- A **workflow** is the configurable automated process.
- 一个 **工作流 (workflow)** 是可配置的自动化过程。
- Defined as YAML files.
- 定义为 YAML 文件。
- Contain and run one or more **jobs**
- 包含并运行一个或多个 **作业 (jobs)**
- Will run when triggered by an **event** in your repository or can be run manually
- 当由仓库中的 **事件 (event)** 触发时运行，或者可以手动运行
- You can multiple workflows per repository
- 每个仓库可以有多个工作流
- A **workflow** will contain a **job** and then **steps** to achieve that **job**
- 一个 **工作流 (workflow)** 将包含一个 **作业 (job)**，以及实现该 **作业 (job)** 的 **步骤 (steps)**
- Within our **workflow** we will also have a **runner** on which our **workflow** runs.
- 在我们的 **工作流 (workflow)** 中，我们还将有一个 **运行器 (runner)**，我们的 **工作流 (workflow)** 运行在其上。

For example, you can have one **workflow** to build and test pull requests, another **workflow** to deploy your application every time a release is created, and still another **workflow** that adds a label every time someone opens a new issue.
例如，您可以设置一个 **工作流** 来构建和测试拉取请求，另一个 **工作流** 用于在每次创建版本发布时部署您的应用程序，还有另一个 **工作流** 用于在每次有人打开新议题时添加标签。

### Events

Events are specific event in a repository that triggers the workflow to run.
事件 (Events) 是仓库中的特定事件，它触发工作流运行。

### Jobs

A job is a set of steps in the workflow that execute on a runner.
作业 (Job) 是工作流中的一组步骤，它们在运行器上执行。

### Steps

Each step within the job can be a shell script that gets executed or an action. Steps are executed in order and they are dependent on each other.
作业中的每个步骤 (Step) 可以是执行的 shell 脚本或一个动作 (action)。步骤按顺序执行，并且它们相互依赖。

### Actions

A repeatable custom application is used for frequently repeated tasks.
动作 (Action) 是用于频繁重复任务的可重复使用的自定义应用程序。

### Runners

A runner is a server that runs the workflow, each runner runs a single job at a time. GitHub Actions provides the ability to run Ubuntu Linux, Microsoft Windows, and macOS runners. You can also host your own on a specific OS or hardware.
运行器 (Runner) 是运行工作流的服务器，每个运行器一次运行一个作业。GitHub Actions 提供了运行 Ubuntu Linux、Microsoft Windows 和 macOS 运行器的能力。您也可以在特定的操作系统或硬件上托管自己的运行器。

Below you can see how this looks, we have our event triggering our workflow > our workflow consists of two jobs > within our jobs we then have steps and then we have actions.
您可以在下面看到它的样子，我们有事件触发我们的工作流 > 我们的工作流包含两个作业 > 在我们的作业中，我们有步骤，然后我们有动作。

![](Images/Day75_CICD1.png)

### YAML

Before we get going with a real use case let's take a quick look at the above image in the form of an example YAML file.
在我们开始一个真实的用例之前，让我们快速看一下上图所示的 YAML 文件示例形式。

I have added # to the comment where we can find the components of the YAML workflow.
我在注释中添加了 #，我们可以在其中找到 YAML 工作流的组件。

```Yaml
#Workflow
name: 90DaysOfDevOps
#Event
on: [push]
#Jobs
jobs:
  check-bats-version:
    #Runners
    runs-on: ubuntu-latest
    #Steps
    steps:
        #Actions
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: npm install -g bats
      - run: bats -v
```

### Getting Hands-On with GitHub Actions

I think there are a lot of options when it comes to GitHub Actions, yes it will satisfy your CI/CD needs when it comes to Building, Test, and Deploying your code and the continued steps thereafter.
我认为在使用 GitHub Actions 时有很多选择，是的，它能够满足您在构建、测试和部署代码以及后续持续步骤方面的 CI/CD 需求。

I can see lots of options and other automated tasks that we could use GitHub Actions for.
我可以看到许多我们可以使用 GitHub Actions 来完成的选项和其他自动化任务。

### Using GitHub Actions for Linting your code

One option is making sure your code is clean and tidy within your repository. This will be our first example demo.
一个选项是确保您的代码在仓库中是干净整洁的。这将是我们的第一个示例演示。

I am going to be using some example code linked in one of the resources for this section, we are going to use `GitHub/super-linter` to check against our code.
我将使用本节资源中链接的一些示例代码，我们将使用 `GitHub/super-linter` 来检查我们的代码。

```Yaml
name: Super-Linter

on: push

jobs:
  super-lint:
    name: Lint code base
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Run Super-Linter
        uses: github/super-linter@v3
        env:
          DEFAULT_BRANCH: main
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**github/super-linter**
You can see from the above that for one of our steps we have an action called GitHub/super-linter and this is referring to a step that has already been written by the community. You can find out more about this here [Super-Linter](https://github.com/github/super-linter)
从上面可以看到，对于我们的其中一个步骤，我们有一个名为 GitHub/super-linter 的动作，它指的是社区已经编写好的步骤。您可以在此处了解有关它的更多信息 [Super-Linter](https://github.com/github/super-linter)

"This repository is for the GitHub Action to run a Super-Linter. It is a simple combination of various linters, written in bash, to help validate your source code."
“这个仓库是用于运行 Super-Linter 的 GitHub Action。它是各种使用 bash 编写的 linters 的简单组合，用于帮助验证您的源代码。”

Also in the code snippet above it mentions GITHUB_TOKEN so I was interested to find out why and what this does and is needed for.
此外，在上面的代码片段中提到了 GITHUB_TOKEN，所以我很想知道为什么需要它以及它是做什么用的。

"NOTE: If you pass the Environment variable `GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}` in your workflow, then the GitHub Super-Linter will mark the status of each linter run in the Checks section of a pull request. Without this, you will only see the overall status of the full run. **There is no need to set the GitHub Secret as it is automatically set by GitHub, it only needs to be passed to the action.**"
“注意：如果您在工作流中传递环境变量 `GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}`，那么 GitHub Super-Linter 将在拉取请求的‘检查’部分标记每次 linter 运行的状态。没有它，您将只能看到完整运行的总体状态。**无需设置 GitHub Secret，因为它会自动由 GitHub 设置，它只需要传递给 Action 即可。**”

The bold text is important to note at this stage. We are using it but we do not need to set any environment variable within our repository.
黑体字在这阶段很重要。我们正在使用它，但我们不需要在我们的仓库中设置任何环境变量。

We will use the repository that we used in our Jenkins demo to test against.[Jenkins-HelloWorld](https://github.com/MichaelCade/Jenkins-HelloWorld)
我们将使用我们在 Jenkins 演示中用于测试的仓库。[Jenkins-HelloWorld](https://github.com/MichaelCade/Jenkins-HelloWorld)

Here is our repository as we left it in the Jenkins sessions.
这是我们在 Jenkins 会议中保留的仓库状态。

![](Images/Day75_CICD2.png)

For us to take advantage, we have to use the Actions tab above to choose from the marketplace which I will cover shortly or we can create our files using our super-linter code above, to create your own, you must create a new file in your repository at this exact location. `.github/workflows/workflow_name` obviously making sure the workflow_name is something useful for you to recognise, within here we can have many different workflows performing different jobs and tasks against our repository.
为了利用它，我们必须使用上面的“Actions”选项卡从市场中进行选择（我将很快介绍），或者我们可以使用上面的 super-linter 代码创建文件。要创建自己的工作流，您必须在仓库的这个确切位置创建一个新文件：`.github/workflows/workflow_name`。显然，要确保 workflow_name 是方便您识别的名称。在这里，我们可以有许多不同的工作流来针对我们的仓库执行不同的作业和任务。

We are going to create `.github/workflows/super-linter.yml`
我们将创建 `.github/workflows/super-linter.yml`

![](Images/Day75_CICD3.png)

We can then paste our code and commit the code to our repository, if we then head to the Actions tab we will now see our Super-Linter workflow listed below,
然后我们可以粘贴我们的代码并将其提交到我们的仓库。如果我们随后转到“Actions”选项卡，现在将看到我们的 Super-Linter 工作流列在下方，

![](Images/Day75_CICD4.png)

We defined in our code that this workflow would run when we pushed anything to our repository, so in pushing the super-linter.yml to our repository we triggered the workflow.
我们在代码中定义了，当我们向仓库推送任何内容时，此工作流就会运行，因此，通过将 super-linter.yml 推送到我们的仓库，我们触发了工作流。

![](Images/Day75_CICD5.png)

As you can see from the above we have some errors most likely with my hacking ability vs my coding ability.
正如您从上面看到的，我们有一些错误，很可能是我的“黑客能力”与我的“编码能力”之间的差异导致的。

Although it was not my code at least not yet, in running this and getting an error I found this [issue](https://github.com/github/super-linter/issues/2255)
虽然这还不是我的代码，但至少目前不是，在运行它并收到错误时，我发现了这个 [issue](https://github.com/github/super-linter/issues/2255)

Take #2 I changed the version of Super-Linter from version 3 to 4 and have run the task again.
第二次尝试 (#2) 我将 Super-Linter 的版本从版本 3 更改为版本 4，并再次运行了任务。

![](Images/Day75_CICD6.png)

As expected my hacker coding brought up some issues and you can see them here in the [workflow](https://github.com/MichaelCade/Jenkins-HelloWorld/runs/5600278515?check_suite_focus=true)
正如预期的那样，我的黑客式编码带来了一些问题，您可以在 [工作流] 中看到它们 (https://github.com/MichaelCade/Jenkins-HelloWorld/runs/5600278515?check_suite_focus=true)

I wanted to show the look now on our repository when something within the workflow has failed or reported back an error.
我现在想展示当工作流中的某些内容失败或报告错误时，我们的仓库外观。

![](Images/Day75_CICD7.png)

Now if we resolve the issue with my code and push the changes our workflow will run again (you can see from the image it took a while to iron out our "bugs") Deleting a file is probably not recommended but it is a very quick way to show the issue being resolved.
现在，如果我们解决代码中的问题并推送更改，我们的工作流将再次运行（您可以从图片中看到，解决我们的“bug”花了一段时间）。删除文件可能不被推荐，但这是显示问题得到解决的一种非常快速的方式。

![](Images/Day75_CICD8.png)

If you hit the new workflow button highlighted above, this is going to open the door to a huge plethora of actions. One thing you might have noticed throughout this challenge is that we don't want to reinvent the wheel we want to stand on the shoulders of giants and share our code, automation and skills far and wide to make our lives easier.
如果您点击上面突出显示的新工作流按钮，这将打开通往大量动作的大门。您可能在整个挑战中注意到一件事：我们不想重复造轮子，我们希望站在巨人的肩膀上，广泛分享我们的代码、自动化和技能，让我们的生活更轻松。

![](Images/Day75_CICD9.png)

Oh, I didn't show you the green tick on the repository when our workflow was successful.
哦，我忘了展示当我们的工作流成功时，仓库上的绿色对勾。

![](Images/Day75_CICD10.png)

I think that covers things from a foundational point of view for GitHub Actions but if you are anything like me then you are probably seeing how else GitHub Actions can be used to automate a lot of tasks.
我认为这涵盖了 GitHub Actions 的基础知识，但是如果您和我一样，那么您可能会看到 GitHub Actions 还可以用于自动化许多其他任务。

Next up we will cover another area of CD, we will be looking into ArgoCD to deploy our applications out into our environments.
接下来，我们将介绍 CD 的另一个领域，我们将研究 ArgoCD，将我们的应用程序部署到环境中。

## Resources

- [Jenkins is the way to build, test, deploy](https://youtu.be/_MXtbjwsz3A)
- [Jenkins.io](https://www.jenkins.io/)
- [ArgoCD](https://argo-cd.readthedocs.io/en/stable/)
- [ArgoCD Tutorial for Beginners](https://www.youtube.com/watch?v=MeU5_k9ssrs)
- [What is Jenkins?](https://www.youtube.com/watch?v=LFDrDnKPOTg)
- [Complete Jenkins Tutorial](https://www.youtube.com/watch?v=nCKxl7Q_20I&t=3s)
- [GitHub Actions](https://www.youtube.com/watch?v=R8_veQiYBjI)
- [GitHub Actions CI/CD](https://www.youtube.com/watch?v=mFFXuXjVgkU)

See you on [Day 76](day76.md)
[Day 76]再见 (day76.md)
