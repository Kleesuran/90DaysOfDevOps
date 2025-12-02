---
title: '#90DaysOfDevOps - Responsibilities of a DevOps Engineer - Day 2'
published: false
description: 90DaysOfDevOps - Responsibilities of a DevOps Engineer
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048699
date: '2022-04-17T21:15:34Z'
---

## Responsibilities of a DevOps Engineer

Hopefully, you are coming into this off the back of going through the resources and posting on [Day1 of #90DaysOfDevOps](day01.md)
希望你在阅读了资源并完成了[#90DaysOfDevOps 第 1 天](day01.md)的帖子后，开始阅读这篇内容。

It was briefly touched on in the first post but now we must get deeper into this concept and understand that there are two main parts when creating an application. We have the **Development** part where software developers program the application and test it. Then we have the **Operations** part where the application is deployed and maintained on a server.
在第一篇文章中我们简单地提到了它，但现在我们必须深入研究这个概念，并理解在创建应用程序时有两个主要部分。我们有**开发 (Development)** 部分，软件开发人员在此处编写应用程序并进行测试。然后我们有**运维 (Operations)** 部分，在此处将应用程序部署并在服务器上进行维护。

## DevOps is the link between the two

To get to grips with DevOps or the tasks which a DevOps engineer would be carrying out we need to understand the tools or the process and overview of those and how they come together.
要掌握 DevOps 或 DevOps 工程师将要执行的任务，我们需要了解相关工具或流程及其概览，以及它们如何协同工作。

Everything starts with the application! You will see so much throughout that it is all about the application when it comes to DevOps.
一切都始于应用程序！你会发现，在整个 DevOps 过程中，应用程序是核心。

Developers will create an application, this can be done with many different technology stacks and let's leave that to the imagination for now as we get into this later. This can also involve many different programming languages, build tools, code repositories etc.
开发人员将创建应用程序，这可以通过许多不同的技术栈来完成，但现在让我们先发挥想象力，因为我们稍后会深入探讨。这还可能涉及许多不同的编程语言、构建工具、代码仓库等。

As a DevOps engineer you won't be programming the application but having a good understanding of the concepts of how a developer works and the systems, tools and processes they are using is key to success.
作为一名 DevOps 工程师，你不会编写应用程序，但对开发人员的工作方式以及他们使用的系统、工具和流程有一个很好的理解是成功的关键。

At a very high level, you are going to need to know how the application is configured to talk to all of its required services or data services and then also sprinkle a requirement of how this can or should be tested.
在一个非常高的层面上，你需要知道应用程序是如何配置的，以便与所有必需的服务或数据服务进行通信，然后还需要考虑如何以及应该如何对它进行测试。

The application will need to be deployed somewhere, let's keep it generally simple here and make this a server, doesn't matter where but a server. This is then expected to be accessed by the customer or end user depending on the application that has been created.
应用程序需要部署在某个地方，在这里我们保持简单，假设是一个服务器，不重要在哪里，但它是一个服务器。然后，根据所创建的应用程序，客户或最终用户将访问该服务器。

This server needs to run somewhere, on-premises, in a public cloud, serverless (Ok I have gone too far, we won't be covering serverless but its an option and more and more enterprises are heading this way) Someone needs to create and configure these servers and get them ready for the application to run. Now, this element might land to you as a DevOps engineer to deploy and configure these servers.
这个服务器需要在某个地方运行：本地部署、公共云中，或者使用无服务器架构（好吧，我说得太远了，我们不会涉及无服务器架构，但它是一个选项，并且越来越多的企业正朝着这个方向发展）。需要有人创建和配置这些服务器，并让它们准备好运行应用程序。现在，部署和配置这些服务器的这个要素可能落在你这个 DevOps 工程师的肩上。

These servers run an operating system and generally speaking this is going to be Linux but we have a whole section or week where we cover some of the foundational knowledge you should gain here.
这些服务器运行一个操作系统，通常来说会是 Linux，但我们有一个完整的章节或一周的时间来涵盖你应在此处获得的一些基础知识。

It is also likely that we need to communicate with other services in our network or environment, so we also need to have that level of knowledge around networking and configuring that, this might to some degree also land at the feet of the DevOps engineer. Again we will cover this in more detail in a dedicated section talking about all things DNS, DHCP, Load Balancing etc.
同样，我们可能还需要与网络或环境中的其他服务进行通信，因此我们也需要具备网络和配置方面的知识，这在某种程度上也可能落在 DevOps 工程师的肩上。我们将再次在一个专门的章节中更详细地介绍这些内容，讨论 DNS、DHCP、负载均衡等所有相关内容。

## Jack of all trades, Master of none

I will say at this point though, you don't need to be a Network or Infrastructure specialist you need a foundational knowledge of how to get things up and running and talking to each other, much the same as maybe having a foundational knowledge of a programming language but you don't need to be a developer. However, you might be coming into this as a specialist in an area and that is a great footing to adapt to other areas.
在这一点上我要说的是，你不必成为网络或基础设施专家，你需要的是关于如何让事物启动、运行并相互通信的基础知识，就像你可能拥有编程语言的基础知识，但你不必成为一名开发人员。然而，如果你是以某个领域的专家身份进入这个行业，那将是适应其他领域的绝佳基础。

You will also most likely not take over the management of these servers or the application daily.
你也很可能不需要每天接管这些服务器或应用程序的管理工作。

We have been talking about servers but the likelihood is that your application will be developed to run as containers, Which still runs on a server for the most part but you will also need an understanding of not only virtualisation, Cloud Infrastructure as a Service (IaaS) but also containerisation as well, The focus in these 90 days will be more catered towards containers.
我们一直在讨论服务器，但你的应用程序很可能被开发为以容器形式运行，尽管容器在很大程度上仍然运行在服务器上，但你也需要了解虚拟化、云基础设施即服务 (IaaS) 以及容器化。这 90 天的学习重点将更多地侧重于容器。

## High-Level Overview

On one side we have our developers creating new features and functionality (as well as bug fixes) for the application.
一方面，我们有开发人员为应用程序创建新的特性和功能（以及错误修复）。

On the other side, we have some sort of environment, infrastructure or servers which are configured and managed to run this application and communicate with all its required services.
另一方面，我们有某种环境、基础设施或服务器，它们经过配置和管理，用于运行此应用程序并与其所有必需的服务进行通信。

The big question is how do we get those features and bug fixes into our products and make them available to those end users?
最大的问题是，我们如何将这些特性和错误修复整合到我们的产品中，并供最终用户使用？

How do we release the new application version? This is one of the main tasks for a DevOps engineer, and the important thing here is not to just figure out how to do this once but we need to do this continuously and in an automated, efficient way which also needs to include testing!
我们如何发布新的应用程序版本？这是 DevOps 工程师的主要任务之一，这里的重点不是只弄清楚如何做一次，而是我们需要持续地、以自动化、高效的方式来完成，并且还需要包括测试！

This is where we are going to end this day of learning, hopefully, this was useful. Over the next few days, we are going to dive a little deeper into some other areas of DevOps and then we will get into the sections that dive deeper into the tooling and processes and the benefits of these.
我们的今日学习到此结束，希望对你有所帮助。在接下来的几天里，我们将更深入地探讨 DevOps 的其他一些领域，然后我们将进入更深入地研究工具、流程以及它们益处的章节。

## Resources

I am always open to adding additional resources to these readme files as it is here as a learning tool.
我随时愿意向这些 Readme 文件添加额外的资源，因为它们是作为学习工具存在的。

My advice is to watch all of the below and hopefully you also picked something up from the text and explanations above.
我的建议是观看以下所有内容，希望你也能从上面的文字和解释中有所收获。

- [What is DevOps? - TechWorld with Nana](https://www.youtube.com/watch?v=0yWAtQ6wYNM)
- [What is DevOps? - GitHub YouTube](https://www.youtube.com/watch?v=kBV8gPVZNEE)
- [What is DevOps? - IBM YouTube](https://www.youtube.com/watch?v=UbtB4sMaaNM)
- [What is DevOps? - AWS](https://aws.amazon.com/devops/what-is-devops/)
- [What is DevOps? - Microsoft](https://docs.microsoft.com/en-us/devops/what-is-devops)

If you made it this far then you will know if this is where you want to be or not. See you on [Day 3](day03.md).
如果你坚持看到了这里，那么你就会知道这是否是你想要追求的领域。我们[第 3 天](day03.md)见。
