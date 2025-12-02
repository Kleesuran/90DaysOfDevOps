---
title: '#90DaysOfDevOps - The Big Picture: IaC - Day 56'
published: false
description: 90DaysOfDevOps - The Big Picture IaC
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048709
---

## The Big Picture: IaC

Humans make mistakes! Automation is the way to go!
人类会犯错！自动化是必经之路！

How do you build your systems today?
你今天是如何构建你的系统的？

What would be your plan if you were to lose everything today, Physical machines, Virtual Machines, Cloud VMs, Cloud PaaS etc etc.?
如果你今天丢失了所有东西，包括物理机、虚拟机、云虚拟机、云PaaS等等，你的计划是什么？

How long would it take you to replace everything?
你需要多长时间来替换所有这些东西？

Infrastructure as code provides a solution to be able to do this whilst also being able to test this, we should not confuse this with backup and recovery but in terms of your infrastructure and environments, your platforms we should be able to spin them up and treat them as cattle vs pets.
基础设施即代码（IaC）提供了一种解决方案，不仅能够做到这一点，还能进行测试。我们不应将其与备份和恢复混淆，但就基础设施和环境而言，我们应该能够快速启动它们，并将它们视为“牛”而非“宠物”。

The TLDR; is that we can use code to rebuild our entire environment.
总而言之（TLDR），我们可以使用代码来重建我们的整个环境。

If we also remember from the start we said about DevOps in general is a way in which to break down barriers to deliver systems into production safely and rapidly.
如果我们回顾开头，我们曾说过DevOps总体上是一种打破障碍、安全且快速地将系统交付到生产环境的方式。

Infrastructure as code helps us deliver the systems, we have spoken a lot of processes and tools. IaC brings us more tools to be familiar with to enable this part of the process.
基础设施即代码帮助我们交付系统。我们已经讨论了很多流程和工具。IaC为我们带来了更多需要熟悉的工具，以支持流程的这一部分。

We are going to concentrate on Infrastructure as code in this section. You might also hear this mentioned as Infrastructure from code or configuration as code. I think the most well-known term is likely Infrastructure as code.
在本节中，我们将重点关注基础设施即代码。你可能也会听到“来自代码的基础设施”或“配置即代码”的说法。但我认为最广为人知的术语可能是“基础设施即代码”。

### Pets vs Cattle

If we take a look at pre-DevOps, if we had the requirement to build a new Application, we would need to prepare our servers manually for the most part.
回顾DevOps出现之前，如果我们需要构建一个新的应用程序，我们大部分时间都需要手动准备服务器。

- Deploy VMs | Physical Servers and install the operating system
- 部署虚拟机 | 物理服务器并安装操作系统
- Configure networking
- 配置网络
- Create routing tables
- 创建路由表
- Install software and updates
- 安装软件和更新
- Configure software
- 配置软件
- Install database
- 安装数据库

This would be a manual process performed by Systems Administrators. The bigger the application the more resource and servers required the more manual effort it would take to bring up those systems. This would take a huge amount of human effort and time but also as a business you would have to pay for that resource to build out this environment. As I opened the section with "Humans make mistakes! Automation is the way to go!"
这将是系统管理员执行的手动过程。应用程序越大，所需的资源和服务器越多，启动这些系统所需的手动工作量就越大。这不仅耗费大量人力和时间，而且作为企业，你必须为构建该环境的人力资源付费。正如本节开头所说：“人类会犯错！自动化是必经之路！”

Ongoing from the above initial setup phase you then have maintenance of these servers.
在上述初始设置阶段之后，你还需要对这些服务器进行维护。

- Update versions
- 更新版本
- Deploy new releases
- 部署新版本
- Data Management
- 数据管理
- Recovery of Applications
- 应用程序恢复
- Add, Remove and Scale Servers
- 增加、删除和扩展服务器
- Network Configuration
- 网络配置

Add the complexity of multiple test and dev environments.
还要加上多个测试和开发环境的复杂性。

This is where Infrastructure as Code comes in, the above was very much a time where we would look after those servers as if they were pets, people even called them servers pet names or at least named them something because they were going to be around for a while, they were going to hopefully be part of the "family" for a while.
这就是基础设施即代码发挥作用的地方。在上述时期，我们对待这些服务器就像对待宠物一样。人们甚至会给服务器起宠物名字，或者至少给它们命名，因为它们会存在很长一段时间，并希望在很长一段时间内成为“家庭”的一部分。

With Infrastructure as Code, we can automate all these tasks end to end. Infrastructure as code is a concept and some tools carry out this automated provisioning of infrastructure, at this point if something bad happens to a server you throw it away and you spin up a new one. This process is automated and the server is exactly as defined in the code. At this point we don't care what they are called they are there in the field serving their purpose until they are no longer in the field and we have another to replace it either because of a failure or because we updated part or all of our application.
有了基础设施即代码，我们可以端到端地自动化所有这些任务。基础设施即代码是一个概念，一些工具可以实现基础设施的自动配置。此时，如果服务器出现故障，你只需将其丢弃并启动一个新的。这个过程是自动化的，并且新服务器与代码中定义的完全一致。此时，我们不在乎它们叫什么名字，它们在现场发挥作用，直到不再需要，或者因为故障或应用程序更新而被另一个新的替代。

This can be used in almost all platforms, virtualisation, cloud-based workloads and also cloud-native infrastructures such as Kubernetes and containers.
这几乎可以用于所有平台：虚拟化、基于云的工作负载，以及Kubernetes和容器等云原生基础设施。

### Infrastructure Provisioning

Not all IaC cover all of the below, You will find that the tool we are going to be using during this section only really covers the first 2 areas below; Terraform is that tool we will be covering and this allows us to start from nothing and define in code what our infrastructure should look like and then deploy that, it will also enable us to manage that infrastructure and also initially deploy an application but at that point it is going to lose track of the application which is where the next section comes in and something like Ansible as a configuration management tool might work better on that front.
并非所有的IaC都涵盖以下所有内容。你会发现我们将在本节中使用的工具只真正涵盖下面的前两个领域；我们将介绍的工具是Terraform，它允许我们从零开始，在代码中定义我们的基础设施应该是什么样子，然后进行部署。它还可以让我们管理基础设施，并进行应用程序的初步部署，但在那之后它将失去对应用程序的跟踪，这时就需要下一个部分的内容，例如使用Ansible这样的配置管理工具可能会在应用层面表现得更好。

Without jumping ahead tools like chef, puppet and ansible are best suited to deal with the initial application setup and then manage those applications and their configuration.
我们先不跳到前面，像Chef、Puppet和Ansible这样的工具最适合处理初始的应用程序设置，然后管理这些应用程序及其配置。

Initial installation & configuration of software
软件的初始安装和配置

- Spinning up new servers
- 启动新服务器
- Network configuration
- 网络配置
- Creating load balancers
- 创建负载均衡器
- Configuration on the infrastructure level
- 基础设施层面的配置

### Configuration of provisioned infrastructure
### 已配置基础设施的配置

- Installing applications on servers
- 在服务器上安装应用程序
- Prepare the servers to deploy your application.
- 准备服务器以部署你的应用程序。

### Deployment of Application
### 应用程序部署

- Deploy and Manage Application
- 部署和管理应用程序
- Maintain phase
- 维护阶段
- Software updates
- 软件更新
- Reconfiguration
- 重新配置

### Difference between IaC tools

Declarative vs procedural
声明式 vs 过程式

Procedural
过程式

- Step-by-step instruction
- 循序渐进的指令
- Create a server > Add a server > Make this change
- 创建服务器 > 添加服务器 > 进行此更改

Declarative
声明式

- declare the result
- 声明结果
- 2 Servers
- 2台服务器

Mutable (pets) vs Immutable (cattle)
可变性（宠物） vs 不可变性（牛）

Mutable
可变性

- Change instead of replacing
- 更改而非替换
- Generally long lived
- 通常长期存在

Immutable
不可变性

- Replace instead of change
- 替换而非更改
- Possibly short-lived
- 可能是短期存在的

This is really why we have lots of different options for Infrastructure as Code because there is no one tool to rule them all.
这就是为什么我们在基础设施即代码方面有很多不同的选择，因为没有一个工具可以一统天下。

We are going to be mostly using terraform and getting hands-on as this is the best way to start seeing the benefits of Infrastructure as Code when it is in action. Getting hands-on is also the best way to pick up the skills you are going to be writing code.
我们将主要使用Terraform并进行实践操作，因为这是开始看到基础设施即代码实际运行优势的最佳方式。亲自动手也是学习编写代码技能的最佳方式。

Next up we will start looking into Terraform with a 101 before we get some hands-on getting used.
接下来，在实际操作之前，我们将先从Terraform 101基础知识开始。

## Resources

I have listed a lot of resources down below and I think this topic has been covered so many times out there, If you have additional resources be sure to raise a PR with your resources and I will be happy to review and add them to the list.
我在下面列出了许多资源，我认为这个主题已经被很多人讨论过很多次。如果你有额外的资源，请务必提交拉取请求（PR），我很乐意进行审核并将其添加到列表中。

- [What is Infrastructure as Code? Difference of Infrastructure as Code Tools](https://www.youtube.com/watch?v=POPP2WTJ8es)
- [Terraform Tutorial | Terraform Course Overview 2021](https://www.youtube.com/watch?v=m3cKkYXl-8o)
- [Terraform explained in 15 mins | Terraform Tutorial for Beginners](https://www.youtube.com/watch?v=l5k1ai_GBDE)
- [Terraform Course - From BEGINNER to PRO!](https://www.youtube.com/watch?v=7xngnjfIlK4&list=WL&index=141&t=16s)
- [HashiCorp Terraform Associate Certification Course](https://www.youtube.com/watch?v=V4waklkBC38&list=WL&index=55&t=111s)
- [Terraform Full Course for Beginners](https://www.youtube.com/watch?v=EJ3N-hhiWv0&list=WL&index=39&t=27s)
- [KodeKloud - Terraform for DevOps Beginners + Labs: Complete Step by Step Guide!](https://www.youtube.com/watch?v=YcJ9IeukJL8&list=WL&index=16&t=11s)
- [Terraform Simple Projects](https://terraform.joshuajebaraj.com/)
- [Terraform Tutorial - The Best Project Ideas](https://www.youtube.com/watch?v=oA-pPa0vfks)
- [Awesome Terraform](https://github.com/shuaibiyy/awesome-terraform)

See you on [Day 57](day57.md)
我们第57天见
