```markdown
---
title: '#90DaysOfDevOps - The Big Picture: DevOps & The Cloud - Day 28'
published: false
description: 90DaysOfDevOps - The Big Picture DevOps & The Cloud
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048737
---

## The Big Picture: DevOps & The Cloud

When it comes to cloud computing and what is offered, it goes very nicely with the DevOps ethos and processes. We can think of Cloud Computing as bringing the technology and services whilst DevOps as we have mentioned many times before is about the process and process improvement.
谈到云计算及其提供的服务时，它与DevOps的精神和流程非常契合。我们可以将云计算视为提供技术和服务的，而DevOps，正如我们之前多次提到的，是关于流程和流程改进的。

But to start with that cloud learning journey is a steep one and making sure you know and understand all elements or the best service to choose for the right price point is confusing.
但开始这段云学习之旅是艰难的，要确保了解和理解所有要素或以合适的价位选择最佳服务是令人困惑的。

![](Images/Day28_Cloud1.png)

Does the public cloud require a DevOps mindset? My answer here is not, but to really take advantage of cloud computing and possibly avoid those large cloud bills that so many people have been hit with then it is important to think of Cloud Computing and DevOps together.
公有云是否需要DevOps思维模式？我的答案是不一定，但为了真正利用云计算的优势，并尽可能避免许多人遭遇的高昂云账单，将云计算和DevOps结合起来思考非常重要。

If we look at what we mean by the Public Cloud at a 40,000ft view, it is about removing some responsibility to a managed service to enable you and your team to focus on more important aspects which name should be the application and the end-users. After all the Public Cloud is just someone else's computer.
如果我们以一个宏观视角（40,000英尺）来看待公有云，它旨在将部分责任转移给托管服务，使你和你的团队能够专注于更重要的方面，即应用程序和最终用户。毕竟，公有云不过是别人的计算机罢了。

![](Images/Day28_Cloud2.png)

In this first section, I want to get into and describe a little more of what a Public Cloud is and some of the building blocks that get referred to as the Public Cloud overall.
在第一部分中，我想深入探讨并描述一下公有云是什么，以及构成公有云的一些基本要素。

### SaaS

The first area to cover is Software as a service, this service is removing almost all of the management overhead of a service that you may have once run on-premises. Let's think about Microsoft Exchange for our email, this used to be a physical box that lived in your data centre or maybe in the cupboard under the stairs. You would need to feed and water that server. By that I mean you would need to keep it updated and you would be responsible for buying the server hardware, most likely installing the operating system, installing the applications required and then keeping that patched, if anything went wrong you would have to troubleshoot and get things back up and running.
首先要介绍的领域是软件即服务（SaaS），该服务几乎消除了你过去可能在本地运行的服务的全部管理开销。想想我们用于电子邮件的Microsoft Exchange，它过去可能是一个放置在你的数据中心或楼梯下储藏室里的物理盒子。你需要“喂养和浇灌”这台服务器。我的意思是，你需要保持它的更新，负责购买服务器硬件，很可能还要安装操作系统，安装所需的应用程序，然后保持打补丁。如果出现任何问题，你必须进行故障排除并让系统恢复运行。

Oh, and you would also have to make sure you were backing up your data, although this doesn't change with SaaS for the most part either.
哦，你还必须确保数据备份，尽管在SaaS中，这在很大程度上也没有改变。

What SaaS does and in particular Microsoft 365, because I mentioned Exchange is removing that administration overhead and they provide a service that delivers your exchange functionality by way of mail but also much other productivity (Office 365) and storage options (OneDrive) that overall gives a great experience to the end-user.
SaaS 所做的，特别是 Microsoft 365，因为我提到了 Exchange，就是消除了这种管理开销，它们提供了一种服务，通过邮件、以及许多其他生产力工具（Office 365）和存储选项（OneDrive），来提供 Exchange 的功能，总体上为最终用户提供了出色的体验。

Other SaaS applications are widely adopted, such as Salesforce, SAP, Oracle, Google, and Apple. All removing that burden of having to manage more of the stack.
其他 SaaS 应用程序也被广泛采用，例如 Salesforce、SAP、Oracle、Google 和 Apple。它们都减轻了管理更多技术栈的负担。

I am sure there is a story with DevOps and SaaS-based applications but I am struggling to find out what they may be. I know Azure DevOps has some great integrations with Microsoft 365 that I might have a look into and report back to.
我确信 DevOps 和基于 SaaS 的应用程序之间存在联系，但我正在努力找出它们可能是什么。我知道 Azure DevOps 与 Microsoft 365 有一些很好的集成，我可能会研究一下并向大家报告。

![](Images/Day28_Cloud3.png)

### Public Cloud

Next up we have the public cloud, most people would think of this in a few different ways, some would see this as the hyper scalers only such as Microsoft Azure, Google Cloud Platform and AWS.
接下来我们讨论公有云，大多数人会以几种不同的方式看待它，有些人认为它仅指超大规模服务商（hyper scalers），例如 Microsoft Azure、Google Cloud Platform 和 AWS。

![](Images/Day28_Cloud4.png)

Some will also see the public cloud as a much wider offering that includes those hyper scalers but also the thousands of MSPs all over the world as well. For this post, we are going to consider Public Cloud including hyper scalers and MSPs, although later on, we will specifically dive into one or more of the hyper scalers to get that foundational knowledge.
还有一些人将公有云视为更广泛的产品，它不仅包括这些超大规模服务商，也包括全球数千家托管服务提供商（MSPs）。对于本文，我们将把公有云视为包括超大规模服务商和 MSPs，尽管稍后我们将具体深入探讨一个或多个超大规模服务商以获得基础知识。

![](Images/Day28_Cloud5.png)
_thousands more companies could land on this, I am merely picking from local, regional, telco and global brands I have worked with and am aware of._

We mentioned in the SaaS section that Cloud removed the responsibility or the burden of having to administer parts of a system. If SaaS we see a lot of the abstraction layers removed i.e the physical systems, network, storage, operating system, and even application to some degree. When it comes to the cloud there are various levels of abstraction we can remove or keep depending on your requirements.
我们在 SaaS 部分提到，云消除了管理系统某些部分的责任或负担。对于 SaaS，我们看到很多抽象层被移除，即物理系统、网络、存储、操作系统，甚至在某种程度上也包括应用程序。谈到云时，我们可以移除或保留不同级别的抽象，具体取决于你的要求。

We have already mentioned SaaS but there are at least two more to mention regarding the public cloud.
我们已经提到了 SaaS，但关于公有云，至少还有两个需要提及。

Infrastructure as a service - You can think of this layer as a virtual machine but whereas on-premises you will be having to look after the physical layer in the cloud this is not the case, the physical is the cloud provider's responsibility and you will manage and administer the Operating System, the data and the applications you wish to run.
基础设施即服务 (IaaS)——你可以将这一层视为虚拟机，但在本地环境中你需要关注物理层，而在云中则不必，物理层由云提供商负责，你将管理和维护操作系统、数据以及你希望运行的应用程序。

Platform as a service - This continues to remove the responsibility of layers and this is really about you taking control of the data and the application but not having to worry about the underpinning hardware or operating system.
平台即服务 (PaaS)——这继续消除了层级的责任，它主要是让你控制数据和应用程序，而不必担心底层硬件或操作系统。

There are many other aaS offerings out there but these are the two fundamentals. You might see offerings around StaaS (Storage as a service) which provide you with your storage layer but without having to worry about the hardware underneath. Or you might have heard CaaS for Containers as a service which we will get onto, later on, another aaS we will look to cover over the next 7 days is FaaS (Functions as a Service) where maybe you do not need a running system up all the time and you just want a function to be executed as and when.
还有许多其他 aaS 产品，但这是两个基本概念。你可能会看到围绕 StaaS（存储即服务）的产品，它为你提供存储层，而无需担心底层硬件。或者你可能听说过 CaaS（容器即服务），我们稍后会介绍。接下来的 7 天里，我们还会探讨另一个 aaS：FaaS（函数即服务），在 FaaS 中，你可能不需要系统一直运行，而只是希望功能在需要时被执行。

There are many ways in which the public cloud can provide abstraction layers of control that you wish to pass up and pay for.
公有云可以通过多种方式提供抽象的控制层，你可以选择放弃这些控制并为此付费。

![](Images/Day28_Cloud6.png)

### Private Cloud

Having your own data centre is not a thing of the past I would think that this has become a resurgence among a lot of companies that have found the OPEX model difficult to manage as well as skill sets in just using the public cloud.
拥有自己的数据中心并非过时的事情，我认为对于许多发现 OPEX（运营支出）模式难以管理，或在使用公有云方面缺乏技能的公司来说，这已经卷土重来。

The important thing to note here is the public cloud is likely now going to be your responsibility and it is going to be on your premises.
这里需要注意的重要一点是，公有云（根据上下文，此处应指私有云）现在很可能成为你的责任，并且它将位于你的本地环境中。

We have some interesting things happening in this space not only with VMware that dominated the virtualisation era and on-premises infrastructure environments. We also have the hyper scalers offering an on-premises version of their public clouds.
在这个领域发生了一些有趣的事情，不仅是主导了虚拟化时代和本地基础设施环境的 VMware，我们还有超大规模服务商正在提供其公有云的本地版本。

![](Images/Day28_Cloud7.png)

### Hybrid Cloud

To follow on from the Public and Private cloud mentions we also can span across both of these environments to provide flexibility between the two, maybe take advantage of services available in the public cloud but then also take advantage of features and functionality of being on-premises or it might be a regulation that dictates you having to store data locally.
承接公有云和私有云的提及，我们也可以跨越这两种环境，以提供两者之间的灵活性，可能利用公有云中可用的服务，同时也利用本地部署的特性和功能，或者可能是法规要求你必须在本地存储数据。

![](Images/Day28_Cloud8.png)

Putting this all together we have a lot of choices for where we store and run our workloads.
综合来看，对于存储和运行工作负载的位置，我们有很多选择。

![](Images/Day28_Cloud9.png)

Before we get into a specific hyper-scale, I have asked the power of Twitter where we should go?
在我们深入研究某个特定的超大规模服务商之前，我已经通过 Twitter 征求了意见，我们应该选择哪一个？

![](Images/Day28_Cloud10.png)

[Link to Twitter Poll](https://twitter.com/MichaelCade1/status/1486814904510259208?s=20&t=x2n6QhyOXSUs7Pq0itdIIQ)

Whichever one gets the highest percentage we will take a deeper dive into the offerings, I think the important to mention though is that services from all of these are quite similar which is why I say to start with one because I have found that in knowing the foundation of one and how to create virtual machines, set up networking etc. I have been able to go to the others and quickly ramp up in those areas.
无论哪个获得最高的百分比，我们都会深入研究它的产品。不过，我认为重要的一点是，所有这些服务商提供的服务都非常相似，这就是为什么我说要从一个开始，因为我发现只要了解了一个平台的基础知识，比如如何创建虚拟机、设置网络等，我就能很快地转向其他平台并在这些领域迅速上手。

Either way, I am going to share some great **FREE** resources that cover all three of the hyper scalers.
无论如何，我都会分享一些涵盖所有这三个超大规模服务商的优秀**免费**资源。

I am also going to build out a scenario as I have done in the other sections where we can build something as we move through the days.
我还将像在其他章节中一样，建立一个场景，以便我们可以在接下来的日子里逐步构建一些东西。

## Resources

- [Hybrid Cloud and MultiCloud](https://www.youtube.com/watch?v=qkj5W98Xdvw)
- [Microsoft Azure Fundamentals](https://www.youtube.com/watch?v=NKEFWyqJ5XA&list=WL&index=130&t=12s)
- [Google Cloud Digital Leader Certification Course](https://www.youtube.com/watch?v=UGRDM86MBIQ&list=WL&index=131&t=10s)
- [AWS Basics for Beginners - Full Course](https://youtu.be/k1RI5locZE4?si=0wPB2cdTY5hHgjl5)

See you on [Day 29](day29.md)
```