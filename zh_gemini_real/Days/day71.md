---
title: '#90DaysOfDevOps - What is Jenkins? - Day 71'
published: false
description: 90DaysOfDevOps - What is Jenkins?
tags: 'DevOps, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048745
---

## What is Jenkins?

Jenkins is a continuous integration tool that allows continuous development, testing and deployment of newly created code.
Jenkins 是一个持续集成工具，它允许对新创建的代码进行持续开发、测试和部署。

There are two ways we can achieve this with either nightly builds or continuous development. The first option is that our developers are developing throughout the day on their tasks and come to the end of the set day they push their changes to the source code repository. Then during the night we run our unit tests and build the software. This could be deemed as the old way to integrate all code.
我们有两种方法可以实现这一点：夜间构建或持续开发。第一个选项是，我们的开发人员全天都在开发他们的任务，在设定的一天结束时，他们将更改推送到源代码仓库。然后，在夜间，我们运行单元测试并构建软件。这可以被视为集成所有代码的旧方式。

![](Images/Day71_CICD1.png)

The other option and the preferred way is that our developers are still committing their changes to source code, then when that code commit has been made there is a build process kicked off continuously.
另一个选择，也是更优选的方式是，我们的开发人员仍然将更改提交到源代码，然后在代码提交完成后，构建过程会持续启动。

![](Images/Day71_CICD2.png)

The above methods mean that with distributed developers across the world we don't have a set time each day where we have to stop committing our code changes. This is where Jenkins comes in to act as that CI server to control those tests and build processes.
上述方法意味着，对于分布在全球的开发人员，我们不必每天都有一个固定的时间停止提交代码更改。这就是 Jenkins 发挥作用的地方，它充当 CI 服务器来控制这些测试和构建过程。

![](Images/Day71_CICD3.png)

I know we are talking about Jenkins here but I also want to add a few more to maybe look into later on down the line to get an understanding of why I am seeing Jenkins as the overall most popular, why is that and what can the others do over Jenkins.
我知道我们在这里讨论 Jenkins，但我也想补充一些其他的工具，以便将来深入研究，了解为什么我认为 Jenkins 是整体最受欢迎的，原因是什么，以及其他工具相对于 Jenkins 有哪些优势。

- TravisCI - A hosted, distributed continuous integration service used to build and test software projects hosted on GitHub.
- TravisCI - 一种托管的分布式持续集成服务，用于构建和测试托管在 GitHub 上的软件项目。
- Bamboo - Can run multiple builds in parallel for faster compilation, built-in functionality to connect with repositories and has build tasks for Ant, and Maven.
- Bamboo - 可以并行运行多个构建以加快编译速度，具有连接仓库的内置功能，并为 Ant 和 Maven 提供了构建任务。
- Buildbot - is an open-source framework for automating software build, test and release processes. It is written in Python and supports distributed, parallel execution of jobs across multiple platforms.
- Buildbot - 是一个开源框架，用于自动化软件构建、测试和发布流程。它使用 Python 编写，支持跨多个平台的分布式并行作业执行。
- Apache Gump - Specific to Java projects, designed to build and test those Java projects every night. ensures that all projects are compatible at both API and functionality levels.
- Apache Gump - 专用于 Java 项目，旨在每晚构建和测试这些 Java 项目。它确保所有项目在 API 和功能级别都兼容。

Because we are now going to focus on Jenkins - Jenkins is again open source like all of the above tools and is an automation server written in Java. It is used to automate the software development process via continuous integration and facilitates continuous delivery.
既然我们现在要专注于 Jenkins——Jenkins 与上述所有工具一样是开源的，并且是用 Java 编写的自动化服务器。它用于通过持续集成自动化软件开发过程并促进持续交付。

### Features of Jenkins

As you can probably expect Jenkins has a lot of features spanning a lot of areas.
正如您所预料的，Jenkins 拥有许多涵盖广泛领域的功能。

**Easy Installation** - Jenkins is a self-contained java based program ready to run with packages for Windows, macOS and Linux operating systems.
**易于安装（Easy Installation）** - Jenkins 是一个基于 Java 的独立程序，可立即运行，并提供适用于 Windows, macOS 和 Linux 操作系统的软件包。

**Easy Configuration** - Easy setup and configuration via a web interface which includes error checks and built-in help.
**易于配置（Easy Configuration）** - 通过 Web 界面轻松设置和配置，其中包括错误检查和内置帮助。

**Plug-ins** - Lots of plugins are available in the Update Centre and integrate with many tools in the CI / CD toolchain.
**插件（Plug-ins）** - 更新中心提供了大量插件，可与 CI / CD 工具链中的许多工具集成。

**Extensible** - In addition to the Plug-Ins available, Jenkins can be extended by that plugin architecture which provides nearly infinite options for what it can be used for.
**可扩展（Extensible）** - 除了现有的插件之外，Jenkins 还可以通过其插件架构进行扩展，这为其用途提供了几乎无限的选择。

**Distributed** - Jenkins easily distributes work across multiple machines, helping to speed up builds, tests and deployments across multiple platforms.
**分布式（Distributed）** - Jenkins 可以轻松地将工作分配给多台机器，有助于加快跨多个平台的构建、测试和部署速度。

### Jenkins Pipeline

You will have seen this pipeline but used in a much broader and we have not spoken about specific tools.
您可能见过这个流水线，但它是在更广泛的范围内使用的，我们尚未讨论特定工具。

You are going to be committing code to Jenkins, which then will build out your application, with all automated tests, it will then release and deploy that code when each step is completed. Jenkins is what allows for the automation of this process.
您将把代码提交给 Jenkins，然后它将使用所有自动化测试来构建您的应用程序，并在每个步骤完成后发布和部署该代码。Jenkins 正是实现此过程自动化的工具。

![](Images/Day71_CICD4.png)

### Jenkins Architecture

First up and not wanting to reinvent the wheel, the [Jenkins Documentation](https://www.jenkins.io/doc/developer/architecture/) is always the place to start but I am going to put down my notes and learnings here as well.
首先，为了避免重复造轮子，[Jenkins 文档](https://www.jenkins.io/doc/developer/architecture/)始终是起点，但我也会在这里记下我的笔记和学习心得。

Jenkins can be installed on many different operating systems, Windows, Linux and macOS but then also the ability to deploy as a Docker container and within Kubernetes. [Installing Jenkins](https://www.jenkins.io/doc/book/installing/)
Jenkins 可以安装在许多不同的操作系统上，包括 Windows, Linux 和 macOS，也可以部署为 Docker 容器并在 Kubernetes 中运行。[安装 Jenkins](https://www.jenkins.io/doc/book/installing/)

As we get into this we will likely take a look at installing Jenkins within a minikube cluster simulating the deployment to Kubernetes. But this will depend on the scenarios we put together throughout the rest of the section.
当我们深入研究时，我们可能会在 minikube 集群中尝试安装 Jenkins，以模拟部署到 Kubernetes 的过程。但这将取决于我们在本节的其余部分中构建的场景。

Let's now break down the image below.
现在让我们分解下面的图片。

Step 1 - Developers commit changes to the source code repository.
第 1 步 - 开发人员将更改提交到源代码仓库。

Step 2 - Jenkins checks the repository at regular intervals and pulls any new code.
第 2 步 - Jenkins 定期检查仓库并拉取任何新代码。

Step 3 - A build server then builds the code into an executable, in this example, we are using maven as a well-known build server. Another area to cover.
第 3 步 - 然后，构建服务器将代码构建成可执行文件，在此示例中，我们使用 maven 作为一个知名的构建服务器。这是另一个需要涵盖的领域。

Step 4 - If the build fails then feedback is sent back to the developers.
第 4 步 - 如果构建失败，则将反馈发送回开发人员。

Step 5 - Jenkins then deploys the build app to the test server, in this example, we are using selenium as a well-known test server. Another area to cover.
第 5 步 - 然后 Jenkins 将构建的应用程序部署到测试服务器，在此示例中，我们使用 selenium 作为一个知名的测试服务器。这是另一个需要涵盖的领域。

Step 6 - If the test fails then feedback is passed to the developers.
第 6 步 - 如果测试失败，则将反馈传递给开发人员。

Step 7 - If the tests are successful then we can release them to production.
第 7 步 - 如果测试成功，那么我们可以将其发布到生产环境。

This cycle is continuous, this is what allows applications to be updated in minutes vs hours, days, months, and years!
这个周期是持续不断的，这就是为什么应用程序能够在几分钟内更新，而不是几小时、几天、几个月甚至几年！

![](Images/Day71_CICD5.png)

There is a lot more to the architecture of Jenkins if you require it, they have a master-slave capability, which enables a master to distribute the tasks to the slave Jenkins environment.
如果您需要，Jenkins 的架构还有更多内容，它们具有主从（master-slave）功能，使主节点能够将任务分配给从节点 Jenkins 环境。

For reference with Jenkins being open source, there are going to be lots of enterprises that require support, CloudBees is that enterprise version of Jenkins that brings support and possibly other functionality for the paying enterprise customer.
作为参考，Jenkins 是开源的，许多企业将需要支持，CloudBees 就是 Jenkins 的企业版，它为付费企业客户带来了支持和可能更多的功能。

An example of this in a customer is Bosch, you can find the Bosch case study [here](https://assets.ctfassets.net/vtn4rfaw6n2j/case-study-boschpdf/40a0b23c61992ed3ee414ae0a55b6777/case-study-bosch.pdf)
博世（Bosch）就是一个客户案例，您可以在[此处](https://assets.ctfassets.net/vtn4rfaw6n2j/case-study-boschpdf/40a0b23c61992ed3ee414ae0a55b6777/case-study-bosch.pdf)找到博世的案例研究。

I am going to be looking for a step-by-step example of an application that we can use to walk through using Jenkins and then also use this with some other tools.
我将寻找一个应用程序的循序渐进示例，我们可以用它来逐步演示 Jenkins 的使用，然后也将其与其他一些工具一起使用。

## Resources

- [Jenkins is the way to build, test, deploy](https://youtu.be/_MXtbjwsz3A)
- [Jenkins.io](https://www.jenkins.io/)
- [ArgoCD](https://argo-cd.readthedocs.io/en/stable/)
- [ArgoCD Tutorial for Beginners](https://www.youtube.com/watch?v=MeU5_k9ssrs)
- [What is Jenkins?](https://www.youtube.com/watch?v=LFDrDnKPOTg)
- [Complete Jenkins Tutorial](https://www.youtube.com/watch?v=nCKxl7Q_20I&t=3s)
- [GitHub Actions](https://www.youtube.com/watch?v=R8_veQiYBjI)
- [GitHub Actions CI/CD](https://www.youtube.com/watch?v=mFFXuXjVgkU)

See you on [Day 72](day72.md)
[Day 72](day72.md) 再见
