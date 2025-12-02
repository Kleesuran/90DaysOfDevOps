---
title: '#90DaysOfDevOps - Microsoft Azure Fundamentals - Day 29'
published: false
description: 90DaysOfDevOps - Microsoft Azure Fundamentals
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048705
---

## Microsoft Azure Fundamentals

Before we get going, the winner of the Twitter poll was Microsoft Azure, hence the title of the page.
在我们开始之前，Twitter 投票的获胜者是 Microsoft Azure，因此成为了本页面的标题。
It was close and also quite interesting to see the results come in over the 24 hours.
投票结果非常接近，并且在 24 小时内看到这些结果的出现也很有趣。

![](Images/Day29_Cloud1.png)

I would say in terms of covering this topic is going to give me a better understanding and update around the services available on Microsoft Azure, I lean towards Amazon AWS when it comes to my day today.
我想说，涵盖这个主题将使我对 Microsoft Azure 上可用的服务有更好的理解和更新。就我日常工作而言，我更倾向于 Amazon AWS。
I have however left resources I had lined up for all three of the major cloud providers.
不过，我已经准备好了针对所有三大主流云服务提供商的资源。

I do appreciate that there are more and the poll only included these 3 and in particular, there were some comments about Oracle Cloud.
我确实知道有更多的云服务提供商，而且本次投票只包含这三个，特别是有人评论了 Oracle Cloud。
I would love to hear more about other cloud providers being used out in the wild.
我很乐意听到更多关于在实际应用中使用的其他云服务提供商的信息。

### The Basics

- Provides public cloud services
- 提供公共云服务
- Geographically distributed (60+ Regions worldwide)
- 地理分布式（全球 60 多个区域）
- Accessed via the internet and/or private connections
- 通过互联网和/或专用连接进行访问
- Multi-tenant model
- 多租户模型
- Consumption-based billing - (Pay as you go | Pay as you grow)
- 基于消费的计费模型 - (即用即付 | 随增长付费)
- A large number of service types and offerings for different requirements.
- 针对不同要求的大量服务类型和产品。

- [Microsoft Azure Global Infrastructure](https://infrastructuremap.microsoft.com/explore)

As much as we spoke about SaaS and Hybrid Cloud we are not planning on covering those topics here.
尽管我们讨论了 SaaS 和混合云，但我们不打算在这里涵盖这些主题。

The best way to get started and follow along is by clicking the link, which will enable you to spin up a [Microsoft Azure Free Account](https://azure.microsoft.com/en-gb/free/)
开始并跟进的最佳方式是点击链接，这将使您能够启动一个 [Microsoft Azure 免费帐户](https://azure.microsoft.com/en-gb/free/)

### Regions

I linked the interactive map above, but we can see the image below the breadth of regions being offered in the Microsoft Azure platform worldwide.
我在上面链接了交互式地图，但我们可以在下面的图片中看到 Microsoft Azure 平台在全球提供的区域范围。

![](Images/Day29_Cloud2.png)
_image taken from [Microsoft Docs - 01/05/2021](https://docs.microsoft.com/en-us/azure/networking/microsoft-global-network)_

You will also see several "sovereign" clouds meaning they are not linked or able to speak to the other regions, for example, these would be associated with governments such as the `AzureUSGovernment` also `AzureChinaCloud` and others.
您还会看到几个“主权”云，这意味着它们未与其他区域链接或无法与其通信，例如，这些云通常与政府相关联，例如 `AzureUSGovernment`，以及 `AzureChinaCloud` 和其他区域。

When we are deploying our services within Microsoft Azure we will choose a region for almost everything.
当我们在 Microsoft Azure 中部署服务时，几乎所有内容都需要选择一个区域。
However, it is important to note that not every service is available in every region.
然而，重要的是要注意并非所有服务都在每个区域都可用。
You can see [Products available by region](https://azure.microsoft.com/en-us/global-infrastructure/services/?products=all) at the time of my writing this that in West Central US we cannot use Azure Databricks.
在我撰写本文时，您可以在[按区域提供的产品](https://azure.microsoft.com/en-us/global-infrastructure/services/?products=all)中看到，在西中央美国 (West Central US) 区域，我们无法使用 Azure Databricks。

I also mentioned "almost everything" above, there are certain services that are linked to the region such as Azure Bot Services, Bing Speech, Azure Virtual Desktop, Static Web Apps, and some more.
我在上面也提到了“几乎所有”，有些服务是与区域关联的，例如 Azure Bot Services、Bing Speech、Azure Virtual Desktop、Static Web Apps 等。

Behind the scenes, a region may be made up of more than one data centre.
在幕后，一个区域可能由多个数据中心组成。
These will be referred to as Availability Zones.
这些将被称为可用区（Availability Zones）。

In the below image you will see and again this is taken from the Microsoft official documentation it describes what a region is and how it is made up of Availability Zones.
在下图中您将看到（这同样取自微软官方文档）描述了什么是区域以及它如何由可用区组成。
However not all regions have multiple Availability Zones.
然而，并非所有区域都具有多个可用区。

![](Images/Day29_Cloud3.png)

The Microsoft Documentation is very good, and you can read up more on [Regions and Availability Zones](https://docs.microsoft.com/en-us/azure/availability-zones/az-overview) here.
微软的文档非常好，您可以在此处阅读更多关于[区域和可用区](https://docs.microsoft.com/en-us/azure/availability-zones/az-overview)的信息。

### Subscriptions

Remember we mentioned that Microsoft Azure is a consumption model cloud you will find that all major cloud providers follow this model.
请记住，我们提到 Microsoft Azure 是一个消费模型云，您会发现所有主要的云服务提供商都遵循此模型。

If you are an Enterprise then you might want or have an Enterprise Agreement set up with Microsoft to enable your company to consume these Azure Services.
如果您是一家企业，那么您可能希望或已经与 Microsoft 签订了企业协议，以便您的公司能够使用这些 Azure 服务。

If you are like me and you are using Microsoft Azure for education then we have a few other options.
如果您像我一样，将 Microsoft Azure 用于教育目的，那么我们还有其他几种选择。

We have the [Microsoft Azure Free Account](https://azure.microsoft.com/en-gb/free/) which generally gives you several free cloud credits to spend in Azure over some time.
我们有 [Microsoft Azure 免费帐户](https://azure.microsoft.com/en-gb/free/)，它通常会为您提供一些免费的云点数，以便在一段时间内在 Azure 中消费。

There is also the ability to use a Visual Studio subscription which gives you maybe some free credits each month alongside your annual subscription to Visual Studio, this was commonly known as the MSDN years ago.
还可以使用 Visual Studio 订阅，它除了您对 Visual Studio 的年度订阅外，每月可能会为您提供一些免费点数，这在多年前通常被称为 MSDN。
[Visual Studio](https://azure.microsoft.com/en-us/pricing/member-offers/credit-for-visual-studio-subscribers/)

Then finally there is the hand over a credit card and have a pay as you go, model.
最后，还有一种模式是提交信用卡并采用即用即付模式。
[Pay-as-you-go](https://azure.microsoft.com/en-us/pricing/purchase-options/pay-as-you-go/)

A subscription can be seen as a boundary between different subscriptions potentially cost centres but completely different environments.
订阅可以看作是不同订阅之间的边界，可能是成本中心，但却是完全不同的环境。
A subscription is where the resources are created.
订阅是创建资源的地方。

### Management Groups

Management groups give us the ability to segregate control across our Azure Active Directory (AD) or our tenant environment.
管理组使我们能够在 Azure Active Directory (AD) 或租户环境中隔离控制。
Management groups allow us to control policies, Role Based Access Control (RBAC), and budgets.
管理组允许我们控制策略、基于角色的访问控制 (RBAC) 和预算。

Subscriptions belong to these management groups so you could have many subscriptions in your Azure AD Tenant, these subscriptions then can also control policies, RBAC, and budgets.
订阅隶属于这些管理组，因此您的 Azure AD 租户中可以有许多订阅，而这些订阅随后也可以控制策略、RBAC 和预算。

### Resource Manager and Resource Groups

#### Azure Resource Manager

- JSON based API that is built on resource providers.
- 基于 JSON 的 API，构建于资源提供程序之上。
- Resources belong to a resource group and share a common life cycle.
- 资源属于资源组并共享相同的生命周期。
- Parallelism
- 并行性
- JSON-Based deployments are declarative, idempotent and understand dependencies between resources to govern creation and order.
- 基于 JSON 的部署是声明性的、幂等的，并且理解资源之间的依赖关系以管理创建和顺序。

#### Resource Groups

- Every Azure Resource Manager resource exists in one and only one resource group!
- 每个 Azure Resource Manager 资源都存在于且仅存在于一个资源组中！
- Resource groups are created in a region that can contain resources from outside the region.
- 资源组是在一个区域中创建的，但可以包含来自该区域外部的资源。
- Resources can be moved between resource groups
- 资源可以在资源组之间移动
- Resource groups are not walled off from other resource groups, there can be communication between resource groups.
- 资源组并未与其他资源组隔绝，资源组之间可以进行通信。
- Resource Groups can also control policies, RBAC, and budgets.
- 资源组也可以控制策略、RBAC 和预算。

### Hands-On

Let's go and get connected and make sure we have a **Subscription** available to us.
让我们连接并确保我们有一个可用的**订阅 (Subscription)**。
We can check our simple out of the box **Management Group**, We can then go and create a new dedicated **Resource Group** in our preferred **Region**.
我们可以检查我们简单的开箱即用的**管理组 (Management Group)**，然后我们可以在我们偏好的**区域 (Region)**中创建一个新的专用**资源组 (Resource Group)**。

When we first login to our [Azure portal](https://portal.azure.com/#home) you will see at the top the ability to search for resources, services and docs.
当我们第一次登录到 [Azure 门户](https://portal.azure.com/#home)时，您会在顶部看到搜索资源、服务和文档的功能。

![](Images/Day29_Cloud4.png)

We are going to first look at our subscription, you will see here that I am using a Visual Studio Professional subscription which gives me some free credit each month.
我们将首先查看我们的订阅，您会在这里看到我正在使用 Visual Studio Professional 订阅，它每月为我提供一些免费点数。

![](Images/Day29_Cloud5.png)

If we go into that you will get a wider view and a look into what is happening or what can be done with the subscription, we can see billing information with control functions on the left where you can define IAM Access Control and further down there are more resources available.
如果我们进入其中，您将获得更广阔的视图，并了解订阅中正在发生什么或可以做什么；我们可以在左侧看到账单信息和控制功能，您可以在其中定义 IAM 访问控制，下方还有更多可用资源。

![](Images/Day29_Cloud6.png)

There might be a scenario where you have multiple subscriptions and you want to manage them all under one, this is where management groups can be used to segregate responsibility groups.
可能存在您拥有多个订阅并希望将它们全部集中管理的情况，这时可以使用管理组来隔离责任组。
In mine below, you can see there is just my tenant root group with my subscription.
在我的下面，您可以看到只有一个租户根组（tenant root group）和我的订阅。

You will also see in the previous image that the parent management group is the same id used on the tenant root group.
您也会在上一张图片中看到，父管理组是租户根组上使用的相同 ID。

![](Images/Day29_Cloud7.png)

Next up we have Resource groups, this is where we combine our resources and we can easily manage them in one place.
接下来是资源组，我们可以在这里组合我们的资源，并可以轻松地在一个地方管理它们。
I have a few created for various other projects.
我已经为各种其他项目创建了一些资源组。

![](Images/Day29_Cloud8.png)

With what we are going to be doing over the next few days, we want to create our resource group.
考虑到我们接下来几天要做的事情，我们需要创建我们的资源组。
This is easily done in this console by hitting the create option on the previous image.
在控制台中，通过点击上图中“创建”选项即可轻松完成此操作。

![](Images/Day29_Cloud9.png)

A validation step takes place and then you have the chance to review your creation and then create.
接下来是验证步骤，然后您有机会审核您的创建并最终创建。
You will also see down the bottom "Download a template for automation" this allows us to grab the JSON format so that we can perform this simple in an automated fashion later on if we wanted, we will cover this later on as well.
您还会看到底部有一个“下载自动化模板”的选项，这允许我们获取 JSON 格式，以便如果我们愿意，以后可以以自动化的方式执行此简单操作，我们稍后也会介绍这一点。

![](Images/Day29_Cloud10.png)

Hit create, then in our list of resource groups, we now have our "90DaysOfDevOps" group ready for what we do in the next session.
点击创建，然后在我们的资源组列表中，我们现在有了“90DaysOfDevOps”组，为我们下一节课要做的事情做好了准备。

![](Images/Day29_Cloud11.png)

## Resources

- [Hybrid Cloud and MultiCloud](https://www.youtube.com/watch?v=qkj5W98Xdvw)
- [Microsoft Azure Fundamentals](https://www.youtube.com/watch?v=NKEFWyqJ5XA&list=WL&index=130&t=12s)
- [Google Cloud Digital Leader Certification Course](https://www.youtube.com/watch?v=UGRDM86MBIQ&list=WL&index=131&t=10s)
- [AWS Basics for Beginners - Full Course](https://www.youtube.com/watch?v=ulprqHHWlng&t=5352s)

See you on [Day 30](day30.md)
我们第 30 天见
