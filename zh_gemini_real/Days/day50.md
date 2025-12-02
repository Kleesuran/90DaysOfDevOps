---
title: '#90DaysOfDevOps - Choosing your Kubernetes platform - Day 50'
published: false
description: 90DaysOfDevOps - Choosing your Kubernetes platform
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049046
---

## Choosing your Kubernetes platform

I wanted to use this session to break down some of the platforms or maybe distributions is a better term to use here, one thing that has been a challenge in the Kubernetes world is removing complexity.
我希望通过本次分享来分析一些平台，或者说分发版本（distribution）可能是更好的术语，在 Kubernetes 世界中，移除复杂性一直是一个挑战。

Kubernetes the hard way walks through how to build out from nothing to a full-blown functional Kubernetes cluster this is to the extreme but more and more at least the people I am speaking to are wanting to remove that complexity and run a managed Kubernetes cluster. The issue there is that it costs more money but the benefits could be if you use a managed service do you need to know the underpinning node architecture and what is happening from a Control Plane node point of view when generally you do not have access to this.
《Kubernetes the hard way》详细介绍了如何从零开始构建一个功能齐全的 Kubernetes 集群，虽然这有些极端，但越来越多的人（至少是我交谈过的人）希望消除这种复杂性，转而运行托管的 Kubernetes 集群。随之而来的问题是成本会更高，但好处是，如果使用托管服务，你是否还需要了解底层节点架构以及控制平面节点正在发生的事情——因为通常你无法访问这些内容。

Then we have the local development distributions that enable us to use our systems and run a local version of Kubernetes so developers can have the full working environment to run their apps in the platform they are intended for.
然后是本地开发分发版本，它们使我们能够利用自己的系统运行本地版本的 Kubernetes，这样开发人员就可以拥有完整的工作环境，在目标平台上运行他们的应用程序。

The general basis of all of these concepts is that they are all a flavour of Kubernetes which means we should be able to freely migrate and move our workloads where we need them to suit our requirements.
所有这些概念的一般基础是它们都是 Kubernetes 的一种“风味”（flavour），这意味着我们应该能够根据我们的需求自由地迁移和移动我们的工作负载。

A lot of our choice will also depend on what investments have been made. I mentioned the developer experience as well but some of those local Kubernetes environments that run our laptops are great for getting to grips with the technology without spending any money.
我们的许多选择也将取决于已有的投资。我提到了开发者体验，但那些运行在我们笔记本电脑上的本地 Kubernetes 环境对于我们掌握这项技术而无需花费任何资金来说非常棒。

### Bare-Metal Clusters

An option for many could be running your Linux OS straight onto several physical servers to create our cluster, it could also be Windows but I have not heard much about the adoption rate around Windows, Containers and Kubernetes. If you are a business and you have made a CAPEX decision to buy your physical servers then this might be how you go when building out your Kubernetes cluster, the management and admin side here means you are going to have to build yourself and manage everything from the ground up.
对于许多人来说，一种选择可能是将 Linux 操作系统直接运行在几台物理服务器上以创建集群，它也可以是 Windows，但我很少听说有关 Windows、容器和 Kubernetes 的采用率。如果你是一家企业，并且已经做出了购买物理服务器的资本支出（CAPEX）决策，那么这可能是你构建 Kubernetes 集群的方式，这里的管理和维护意味着你必须从头开始自己构建和管理一切。

### Virtualisation

Regardless of test and learning environments or enterprise-ready Kubernetes clusters virtualisation is a great way to go, typically the ability to spin up virtual machines to act as your nodes and then cluster those together. You have the underpinning architecture, efficiency and speed of virtualisation as well as leveraging that existing spend. VMware for example offers a great solution for both Virtual Machines and Kubernetes in various flavours.
无论是测试和学习环境还是企业级 Kubernetes 集群，虚拟化都是一个很好的选择，通常具备快速启动虚拟机作为节点并将它们集群化的能力。你可以利用虚拟化的底层架构、效率和速度，同时利用现有支出。例如，VMware 为虚拟机和各种风味的 Kubernetes 提供了出色的解决方案。

My first ever Kubernetes cluster was built based on Virtualisation using Microsoft Hyper-V on an old server that I had which was capable of running a few VMs as my nodes.
我的第一个 Kubernetes 集群是基于虚拟化构建的，它使用 Microsoft Hyper-V 运行在我一台旧服务器上，该服务器能够运行几个虚拟机作为我的节点。

### Local Desktop options

There are several options when it comes to running a local Kubernetes cluster on your desktop or laptop. This as previously said gives developers the ability to see what their app will look like without having to have multiple costly or complex clusters. Personally, this has been one that I have used a lot and in particular, I have been using minikube. It has some great functionality and adds-ons which changes the way you get something up and running.
在台式机或笔记本电脑上运行本地 Kubernetes 集群时，有几种选择。正如前文所述，这使开发人员能够看到他们的应用程序的外观，而无需拥有多个昂贵或复杂的集群。就个人而言，这是我经常使用的选项，特别是 minikube。它具有一些很棒的功能和附加组件，改变了你启动和运行事物的方式。

### Kubernetes Managed Services

I have mentioned virtualisation, and this can be achieved with hypervisors locally but we know from previous sections we could also leverage VMs in the public cloud to act as our nodes. What I am talking about here with Kubernetes managed services are the offerings we see from the large hyperscalers but also from MSPs removing layers of management and control away from the end user, this could be removing the control plane from the end user this is what happens with Amazon EKS, Microsoft AKS and Google Kubernetes Engine. (GKE)
我提到了虚拟化，这可以通过本地虚拟机管理程序实现，但我们从前面的部分了解到，我们也可以利用公共云中的虚拟机作为我们的节点。我在这里谈论的 Kubernetes 托管服务是指我们从大型超大规模服务商以及 MSP 看到的那些产品，它们将多层管理和控制从最终用户手中移除，这可能包括将控制平面从最终用户手中移除，Amazon EKS、Microsoft AKS 和 Google Kubernetes Engine (GKE) 就是如此。

### Overwhelming choice

I mean the choice is great but there is a point where things become overwhelming and this is not a depth look into all options within each category listed above. On top of the above, we also have OpenShift which is from Red Hat and this option can be run across the options above in all the major cloud providers and probably today gives the best overall useability to the admins regardless of where clusters are deployed.
我的意思是，选择是好事，但在某个节点上事情会变得难以承受，而且这并不是对上面列出的每个类别中所有选项的深入研究。除了以上选项，我们还有来自 Red Hat 的 OpenShift，这个选项可以运行在上述所有主要云提供商的选项之上，并且无论集群部署在哪里，它可能为管理员提供了最佳的整体可用性。

So where do you start from your learning perspective, as I said I started with the virtualisation route but that was because I had access to a physical server which I could use for the purpose, I appreciate and in fact, since then I no longer have this option.
那么从学习的角度来看，你应该从哪里开始呢？正如我所说，我从虚拟化这条路开始，那是因为我有一台可用于该目的的物理服务器。我明白，事实上，从那时起我就不再有这个选择了。

My actual advice now would be to use Minikube as a first option or Kind (Kubernetes in Docker) but Minikube gives us some additional benefits which almost abstracts the complexity out as we can just use add-ons and get things built out quickly and we can then blow it away when we are finished, we can run multiple clusters, we can run it almost anywhere, cross-platform and hardware agnostic.
我现在真正的建议是，首先使用 Minikube 或 Kind (Kubernetes in Docker)，但 Minikube 提供了额外的优势，它几乎抽象掉了复杂性，因为我们可以只使用附加组件并快速构建出东西，完成后我们就可以将其清除。我们可以运行多个集群，几乎可以在任何地方运行，它是跨平台且与硬件无关的。

I have been through a bit of a journey with my learning around Kubernetes so I am going to leave the platform choice and specifics here to list out the options that I have tried to give me a better understanding of Kubernetes the platform and where it can run. What I might do with the below blog posts is take another look at these update them and bring them more into here vs them being linked to blog posts.
在我的 Kubernetes 学习过程中，我经历了一段旅程，所以我将在这里列出我尝试过的各种平台选择和具体细节，这让我对 Kubernetes 平台以及它可以运行的位置有了更好的理解。我可能会针对下面的博客文章重新审视并更新它们，将更多内容整合到这里，而不是仅仅链接到博客文章。

- [Kubernetes playground – How to choose your platform](https://vzilla.co.uk/vzilla-blog/building-the-home-lab-kubernetes-playground-part-1)
Kubernetes 演练场 – 如何选择你的平台
- [Kubernetes playground – Setting up your cluster](https://vzilla.co.uk/vzilla-blog/building-the-home-lab-kubernetes-playground-part-2)
Kubernetes 演练场 – 设置你的集群
- [Getting started with Amazon Elastic Kubernetes Service (Amazon EKS)](https://vzilla.co.uk/vzilla-blog/getting-started-with-amazon-elastic-kubernetes-service-amazon-eks)
Amazon Elastic Kubernetes Service (Amazon EKS) 入门
- [Getting started with Microsoft Azure Kubernetes Service (AKS)](https://vzilla.co.uk/vzilla-blog/getting-started-with-microsoft-azure-kubernetes-service-aks)
Microsoft Azure Kubernetes Service (AKS) 入门
- [Getting Started with Microsoft AKS – Azure PowerShell Edition](https://vzilla.co.uk/vzilla-blog/getting-started-with-microsoft-aks-azure-powershell-edition)
Microsoft AKS 入门 – Azure PowerShell 版本
- [Getting started with Google Kubernetes Service (GKE)](https://vzilla.co.uk/vzilla-blog/getting-started-with-google-kubernetes-service-gke)
Google Kubernetes Service (GKE) 入门
- [Kubernetes, How to – AWS Bottlerocket + Amazon EKS](https://vzilla.co.uk/vzilla-blog/kubernetes-how-to-aws-bottlerocket-amazon-eks)
Kubernetes 教程 – AWS Bottlerocket + Amazon EKS
- [Getting started with CIVO Cloud](https://vzilla.co.uk/vzilla-blog/getting-started-with-civo-cloud)
CIVO Cloud 入门
- [Minikube - Kubernetes Demo Environment For Everyone](https://vzilla.co.uk/vzilla-blog/project_pace-kasten-k10-demo-environment-for-everyone)
Minikube - 适用于所有人的 Kubernetes 演示环境

### What we will cover in the series on Kubernetes

- Kubernetes Architecture
Kubernetes 架构
- Kubectl Commands
Kubectl 命令
- Kubernetes YAML
Kubernetes YAML
- Kubernetes Ingress
Kubernetes Ingress
- Kubernetes Services
Kubernetes 服务
- Helm Package Manager
Helm 包管理器
- Persistent Storage
持久化存储
- Stateful Apps
有状态应用

## Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
Kubernetes 文档
- [TechWorld with Nana - Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]](https://www.youtube.com/watch?v=X48VuDVv0do)
TechWorld with Nana - 针对初学者的 Kubernetes 教程 [4 小时完整课程]
- [TechWorld with Nana - Kubernetes Crash Course for Absolute Beginners](https://www.youtube.com/watch?v=s_o8dwzRlu4)
TechWorld with Nana - 针对绝对初学者的 Kubernetes 速成课程
- [Kunal Kushwaha - Kubernetes Tutorial for Beginners | What is Kubernetes? Architecture Simplified!](https://www.youtube.com/watch?v=KVBON1lA9N8)
Kunal Kushwaha - 针对初学者的 Kubernetes 教程 | 什么是 Kubernetes？架构简化版！

See you on [Day 51](day51.md)
第 51 天见