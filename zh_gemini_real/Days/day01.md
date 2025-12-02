```markdown
---
title: '#90DaysOfDevOps - Introduction - Day 1'
published: true
description: 90DaysOfDevOps - Introduction
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048731
date: '2022-04-17T10:12:40Z'
---

## Introduction - Day 1

Day 1 of our 90 days and adventure to learn a good foundational understanding of DevOps and tools that help with a DevOps mindset.
这是我们90天学习之旅的第一天，我们将深入学习DevOps的基础知识和有助于形成DevOps思维模式的工具。

This learning journey started for me a few years back, but my focus then was around virtualisation platforms and cloud-based technologies, I was looking mostly into Infrastructure as Code and Application configuration management with Terraform and Chef.
我的这段学习旅程始于几年前，但那时我的重点是虚拟化平台和基于云的技术，我主要研究使用Terraform和Chef进行基础设施即代码（Infrastructure as Code）和应用程序配置管理。

Fast forward to March 2021, I was given an amazing opportunity to concentrate my efforts around the Cloud Native strategy at Kasten by Veeam. Which was going to be a massive focus on Kubernetes and DevOps and the community surrounding these technologies. I started my learning journey and quickly realised there was a very wide world aside from just learning the fundamentals of Kubernetes and Containerisation and it was then when I started speaking to the community and learning more and more about the DevOps culture, tooling and processes so I started documenting some of the areas I wanted to learn in public.
快进到2021年3月，我获得了在Kasten by Veeam专注于云原生战略的绝佳机会。这将把我的重点大规模放在Kubernetes、DevOps以及围绕这些技术的社区上。我开始了我的学习之旅，并很快意识到，除了学习Kubernetes和容器化的基础知识之外，还有一个非常广阔的世界。正是在那时，我开始与社区交流，越来越多地了解DevOps文化、工具和流程，因此我开始公开记录一些我想学习的领域。

[So you want to learn DevOps?](https://blog.kasten.io/devops-learning-curve)

## Let the journey begin

If you read the above blog, you will see this is a high-level contents for my learning journey and I will say at this point I am nowhere near an expert in any of these sections but what I wanted to do was share some resources both FREE and some paid for but an option for both as we all have different circumstances.
如果您阅读了上面的博客，您会发现这是我学习旅程的高级目录。我必须说明，在所有这些部分中，我距离专家还很遥远，但我想做的是分享一些资源，包括免费和付费的，两者都有选择，因为我们都有不同的情况。

Over the next 90 days, I want to document these resources and cover those foundational areas. I would love for the community to also get involved. Share your journey and resources so we can learn in public and help each other.
在接下来的90天里，我将记录这些资源并涵盖那些基础领域。我非常希望社区也能参与进来。分享您的旅程和资源，这样我们就可以公开学习并互相帮助。

You will see from the opening readme in the project repository that I have split things into sections and it is 12 weeks plus 6 days. For the first 6 days, we will explore the fundamentals of DevOps in general before diving into some of the specific areas. By no way is this list exhaustive and again, I would love for the community to assist in making this a useful resource.
您将从项目存储库的起始自述文件中看到，我已经将内容分成了几个部分，总共是12周加6天。在前6天，我们将先探索DevOps的一般基础知识，然后再深入研究一些特定领域。这份清单绝非详尽无遗，我再次希望社区能够协助使它成为一个有用的资源。

Another resource I will share at this point and that I think everyone should have a good look at, maybe create your mind map for yourself and your interest and position, is the following:
在这一点上，我想分享另一个我认为每个人都应该好好看看的资源，也许你可以根据自己的兴趣和定位来创建自己的思维导图，它就是：

[DevOps Roadmap](https://roadmap.sh/devops)

I found this a great resource when I was creating my initial list and blog post on this topic. You can also see other areas go into a lot more detail outside of the 12 topics I have listed here in this repository.
当我创建关于此主题的初始列表和博客文章时，我发现这是一个很好的资源。您还可以看到，除了我在此存储库中列出的12个主题之外，其他领域还有更多的细节内容。

## First Steps - What is DevOps?

There are so many blog articles and YouTube videos to list here, but as we start the 90-day challenge and we focus on spending around an hour a day learning something new or about DevOps, I thought it was good to get some of the high level of "what DevOps is" down to begin.
有太多的博客文章和YouTube视频可以列在这里，但随着我们开始90天挑战，并专注于每天花大约一个小时学习新事物或DevOps相关内容，我认为最好先写下一些关于“什么是DevOps”的宏观概念。

Firstly, DevOps is not a tool. You cannot buy it, it is not a software SKU or an open source GitHub repository you can download. It is also not a programming language, it is also not some dark art magic either.
首先，DevOps不是一个工具。你买不到它，它不是一个软件SKU，也不是一个你可以下载的开源GitHub存储库。它也不是一种编程语言，它也不是某种神秘的魔法。

DevOps is a way to do smarter things in Software Development. - Hold up... But if you are not a software developer should you turn away right now and not dive into this project??? No. Not at all. Stay... Because DevOps brings together a combination of software development and operations. I mentioned earlier that I was more on the VM side and that would generally fall under the Operations side of the house, but within the community, there are people with all different backgrounds where DevOps is 100% going to benefit the individual, Developers, Operations and QA Engineers all can equally learn these best practices by having a better understanding of DevOps.
DevOps是一种在软件开发中做更聪明事情的方式。——等等……但如果你不是软件开发人员，你现在是否应该转身离开，不深入研究这个项目呢？？？不。完全不是。请留下来……因为DevOps结合了软件开发和运营。我前面提到，我更多地在虚拟机（VM）方面，这通常属于运营部门，但在社区中，有来自各种不同背景的人士，DevOps将100%惠及个人。开发人员、运营人员和质量保证（QA）工程师都可以通过更好地理解DevOps来学习这些最佳实践。

DevOps is a set of practices that help to reach the goal of this movement: reducing the time between the ideation phase of a product and its release in production to the end-user or whomever it could be an internal team or customer.
DevOps是一套实践，有助于实现这一运动的目标：缩短产品构思阶段与其在生产环境中发布给最终用户（或内部团队或客户）之间的时间。

Another area we will dive into in this first week is around **The Agile Methodology**. DevOps and Agile are widely adopted together to achieve continuous delivery of your **Application**.
我们将在本周深入研究的另一个领域是关于 **敏捷方法论（The Agile Methodology）**。DevOps和敏捷被广泛地结合采用，以实现 **应用程序（Application）** 的持续交付。

The high-level takeaway is that a DevOps mindset or culture is about shrinking the long, drawn out software release process from potentially years to being able to drop smaller releases more frequently. The other key fundamental point to understand here is the responsibility of a DevOps engineer to break down silos between the teams I previously mentioned: Developers, Operations and QA.
宏观的理解是，DevOps思维模式或文化旨在将漫长且拖沓的软件发布过程从潜在的数年缩短到能够更频繁地发布小型版本。这里需要理解的另一个关键基本点是DevOps工程师的职责是打破我之前提到的团队之间的孤岛：开发人员、运营人员和质量保证（QA）人员。

From a DevOps perspective, **Development, Testing and Deployment** all land with the DevOps team.
从DevOps的角度来看，**开发（Development）、测试（Testing）和部署（Deployment）** 都属于DevOps团队的范畴。

The final point I will make is to make this as effective and efficient as possible we must leverage **Automation**.
我要说的最后一点是，为了使这一切尽可能有效和高效，我们必须利用 **自动化（Automation）**。

## Resources

I am always open to adding additional resources to these readme files as it is here as a learning tool.
我随时乐意将更多资源添加到这些自述文件中，因为它们是作为学习工具存在的。

My advice is to watch all of the below and hopefully you have also picked something up from the text and explanations above.
我的建议是观看以下所有内容，希望您也能从上面的文本和解释中有所收获。

- [DevOps in 5 Minutes](https://www.youtube.com/watch?v=Xrgk023l4lI)
- [What is DevOps? Easy Way](https://www.youtube.com/watch?v=_Gpe1Zn-1fE&t=43s)
- [DevOps roadmap 2022 | Success Roadmap 2022](https://www.youtube.com/watch?v=7l_n97Mt0ko)
- [From Zero to DevOps Engineer - DevOps Roadmap for YOUR specific background
](https://www.youtube.com/watch?v=G_nVMUtaqCk)

If you made it this far, then you will know if this is where you want to be or not. See you on [Day 2](day02.md).
如果您坚持到这里，那么您就会知道这是否是您想要走的方向。我们[第 2 天](day02.md)见。
```