```markdown
---
title: '#90DaysOfDevOps - Microsoft Azure Compute Models - Day 31'
published: false
description: 90DaysOfDevOps - Microsoft Azure Compute Models
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049040
---

## Microsoft Azure Compute Models

Following on from covering the basics around security models within Microsoft Azure yesterday today we are going to look into the various compute services available to us in Azure.
继昨天介绍了 Microsoft Azure 中安全模型的基础知识之后，今天我们将深入探讨 Azure 中可用的各种计算服务。

### Service Availability Options

This section is close to my heart given my role in Data Management. As with on-premises, it is critical to ensure the availability of your services.
鉴于我在数据管理中的角色，本节对我来说意义重大。与本地部署一样，确保服务的可用性至关重要。

- High Availability (Protection within a region)
- 高可用性（区域内保护）
- Disaster Recovery (Protection between regions)
- 灾难恢复（跨区域保护）
- Backup (Recovery from a point in time)
- 备份（从某个时间点恢复）

Microsoft deploys multiple regions within a geopolitical boundary.
微软在一个地缘政治边界内部署了多个区域。

Two concepts with Azure for Service Availability. Both sets and zones.
Azure 中有两个关于服务可用性的概念：可用性集（Availability Sets）和可用性区域（Availability Zones）。

Availability Sets - Provide resiliency within a datacenter
可用性集——在数据中心内提供弹性。

Availability Zones - Provide resiliency between data centres within a region.
可用性区域——在区域内不同数据中心之间提供弹性。

### Virtual Machines

Most likely the starting point for anyone in the public cloud.
这很可能是任何使用公有云的人的起点。

- Provides a VM from a variety of series and sizes with different capabilities (Sometimes an overwhelming) [Sizes for Virtual machines in Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes)
- 提供各种系列和大小、具有不同功能的虚拟机（有时种类多得让人不知所措）[Azure 虚拟机大小](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes)
- There are many different options and focuses for VMs from high performance, and low latency to high memory options VMs.
- 虚拟机有许多不同的选项和侧重点，从高性能、低延迟到高内存选项的虚拟机都有。
- We also have a burstable VM type which can be found under the B-Series. This is great for workloads where you can have a low CPU requirement for the most part but require that maybe once a month performance spike requirement.
- 我们还有一种可突发（burstable）的虚拟机类型，可在 B 系列下找到。这非常适合那些大部分时间对 CPU 要求较低，但可能每月需要一次性能峰值的工作负载。
- Virtual Machines are placed on a virtual network that can provide connectivity to any network.
- 虚拟机被放置在一个虚拟网络上，该网络可以提供与任何网络的连接。
- Windows and Linux guest OS support.
- 支持 Windows 和 Linux 访客操作系统。
- There are also Azure-tuned kernels when it comes to specific Linux distributions. [Azure Tuned Kernals](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/endorsed-distros#azure-tuned-kernels)
- 对于特定的 Linux 发行版，还有经过 Azure 优化的内核。[Azure 优化的内核](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/endorsed-distros#azure-tuned-kernels)

### Templating

I have mentioned before that everything behind or underneath Microsoft Azure is JSON.
我之前提到过，Microsoft Azure 背后或底层的一切都是 JSON。

There are several different management portals and consoles we can use to create our resources the preferred route is going to be via JSON templates.
我们可以使用几种不同的管理门户和控制台来创建资源，但首选途径是通过 JSON 模板。

Idempotent deployments in incremental or complete mode - i.e repeatable desired state.
增量或完全模式下的幂等部署（Idempotent deployments）——即所需状态是可重复的。

There is a large selection of templates that can export deployed resource definitions. I like to think about this templating feature to something like AWS CloudFormation or could be Terraform for a multi-cloud option. We will cover Terraform more in the Infrastructure as code section.
有大量的模板可以选择，这些模板可以导出已部署的资源定义。我喜欢将这种模板化功能视为类似于 AWS CloudFormation，或者对于多云选项来说可以是 Terraform。我们将在基础设施即代码（Infrastructure as code）部分更详细地介绍 Terraform。

### Scaling

Automatic scaling is a large feature of the Public Cloud, being able to spin down resources you are not using or spin up when you need them.
自动扩展是公有云的一大特色，能够缩减未使用的资源，并在需要时快速启动资源。

In Azure, we have something called Virtual Machine Scale Sets (VMSS) for IaaS. This enables the automatic creation and scale from a gold standard image based on schedules and metrics.
在 Azure 中，我们有针对 IaaS 的虚拟机规模集（Virtual Machine Scale Sets, VMSS）。这使得可以根据计划和指标，从黄金标准镜像自动创建和扩展资源。

This is ideal for updating windows so that you can update your images and roll those out with the least impact.
这对于更新窗口（update windows）非常理想，您可以更新镜像并以最小的影响将其推出。

Other services such as Azure App Services have auto-scaling built in.
其他服务，如 Azure App Services，内置了自动扩展功能。

### Containers

We have not covered containers as a use case and what and how they can and should be needed in our DevOps learning journey but we need to mention that Azure has some specific container-focused services to mention.
在我们的 DevOps 学习旅程中，我们还没有将容器作为一个用例，也没有介绍它们可以和应该如何被需要，但我们需要提及 Azure 拥有一些特定的以容器为中心的服务。

Azure Kubernetes Service (AKS) - Provides a managed Kubernetes solution, no need to worry about the control plane or management of the underpinning cluster management. More on Kubernetes also later on.
Azure Kubernetes Service (AKS)——提供托管的 Kubernetes 解决方案，无需担心控制平面或底层集群的管理。稍后我们也会详细介绍 Kubernetes。

Azure Container Instances - Containers as a service with Per-Second Billing. Run an image and integrate it with your virtual network, no need for Container Orchestration.
Azure Container Instances——容器即服务，按秒计费。运行一个镜像并将其与您的虚拟网络集成，无需容器编排。

Service Fabric - Has many capabilities but includes orchestration for container instances.
Service Fabric——具有多种功能，其中包括对容器实例的编排。

Azure also has the Container Registry which provides a private registry for Docker Images, Helm charts, OCI Artifacts and images. More on this again when we reach the containers section.
Azure 也有容器注册表（Container Registry），它为 Docker 镜像、Helm charts、OCI 工件和镜像提供了一个私有注册表。当我们到达容器部分时，我们会再次详细介绍这一点。

We should also mention that a lot of the container services may indeed also leverage containers under the hood but this is abstracted away from your requirement to manage.
我们还应该提到，许多容器服务实际上可能也在底层利用容器，但这已从您的管理要求中抽象出来。

These mentioned container-focused services we also find similar services in all other public clouds.
我们发现所有其他公有云中也有提及的这些以容器为中心的服务。

### Application Services

- Azure Application Services provides an application hosting solution that provides an easy method to establish services.
- Azure Application Services 提供了一个应用程序托管解决方案，提供了一种建立服务的简单方法。
- Automatic Deployment and Scaling.
- 自动部署和扩展。
- Supports Windows & Linux-based solutions.
- 支持基于 Windows 和 Linux 的解决方案。
- Services run in an App Service Plan which has a type and size.
- 服务在具有类型和大小的 App Service Plan 中运行。
- Number of different services including web apps, API apps and mobile apps.
- 许多不同的服务，包括 Web 应用、API 应用和移动应用。
- Support for Deployment slots for reliable testing and promotion.
- 支持部署槽（Deployment slots），用于可靠的测试和推广。

### Serverless Computing

Serverless for me is an exciting next step that I am extremely interested in learning more about.
对我来说，Serverless 是一个令人兴奋的下一步，我非常感兴趣去了解更多。

The goal with serverless is that we only pay for the runtime of the function and do not have to have running virtual machines or PaaS applications running all the time. We simply run our function when we need it and then it goes away.
Serverless 的目标是我们只为函数的运行时间付费，而不必让虚拟机或 PaaS 应用程序一直运行。我们只需在需要时运行我们的函数，然后它就会停止。

Azure Functions - Provides serverless code. If we remember back to our first look into the public cloud we will remember the abstraction layer of management, with serverless functions you are only going to be managing the code.
Azure Functions——提供 Serverless 代码。如果我们回顾我们第一次了解公有云，我们会记得管理抽象层，而使用 Serverless 函数，您将只需管理代码。

Event-Driven with massive scale, I have a plan to build something when I get some hands-on here hopefully later on.
事件驱动且具有大规模扩展性，我计划在稍后获得一些实践经验时构建一些东西。

Provides input and output binding to many Azure and 3rd Party Services.
提供与许多 Azure 和第三方服务的输入和输出绑定。

Supports many different programming languages. (C#, NodeJS, Python, PHP, batch, bash, Golang and Rust. Or any Executable)
支持许多不同的编程语言。（C#、NodeJS、Python、PHP、batch、bash、Golang 和 Rust。或任何可执行文件）

Azure Event Grid enables logic to be triggered from services and events.
Azure Event Grid 能够从服务和事件中触发逻辑。

Azure Logic App provides a graphical-based workflow and integration.
Azure Logic App 提供基于图形的工作流和集成。

We can also look at Azure Batch which can run large-scale jobs on both Windows and Linux nodes with consistent management & scheduling.
我们还可以关注 Azure Batch，它可以在 Windows 和 Linux 节点上运行大规模作业，并具有一致的管理和调度功能。

## Resources

- [Hybrid Cloud and MultiCloud](https://www.youtube.com/watch?v=qkj5W98Xdvw)
- [Microsoft Azure Fundamentals](https://www.youtube.com/watch?v=NKEFWyqJ5XA&list=WL&index=130&t=12s)
- [Google Cloud Digital Leader Certification Course](https://www.youtube.com/watch?v=UGRDM86MBIQ&list=WL&index=131&t=10s)
- [AWS Basics for Beginners - Full Course](https://www.youtube.com/watch?v=ulprqHHWlng&t=5352s)

See you on [Day 32](day32.md)
我们第 [32 天](day32.md)见
```