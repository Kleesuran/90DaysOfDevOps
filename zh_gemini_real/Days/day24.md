---
title: '#90DaysOfDevOps - Network Automation - Day 24'
published: false
description: 90DaysOfDevOps - Network Automation
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048805
---

## Network Automation

### Basics of network automation

Primary drivers for Network Automation
网络自动化的主要驱动力

- Achieve Agility
- 实现敏捷性
- Reduce Cost
- 降低成本
- Eliminate Errors
- 消除错误
- Ensure Compliance
- 确保合规性
- Centralised Management
- 集中式管理

The automation adoption process is specific to each business. There's no one size fits all when it comes to deploying automation, the ability to identify and embrace the approach that works best for your organisation is critical in advancing towards maintaining or creating a more agile environment, the focus should always be on business value and end-user experience. (We said something similar right at the start in regards to the whole of DevOps and the culture change and the automated process that this brings)
自动化采用过程对每个企业都是特定的。在部署自动化方面，没有放之四海而皆准的方法，识别并采用最适合您组织的方法的能力，对于推进维护或创建更敏捷的环境至关重要，重点应始终放在业务价值和最终用户体验上。（我们在开头就DevOps的整体、文化变革以及由此带来的自动化流程也说过类似的话）

To break this down you would need to identify how the task or process that you're trying to automate is going to achieve and improve the end-user experience or business value whilst following a step-by-step systematic approach.
要分解这一点，您需要确定您尝试自动化的任务或流程将如何通过遵循循序渐进的系统方法来实现和改善最终用户体验或业务价值。

"If you don't know where you are going, any road will take you there."

Have a framework or design structure that you're trying to achieve know what your end goal is and then work step by step towards achieving that goal measuring the automation success at various stages based on the business outcomes.
制定您想要实现的框架或设计结构，了解您的最终目标是什么，然后根据业务成果，在各个阶段衡量自动化成功率，逐步实现该目标。

Build concepts modelled around existing applications there's no need to design the concepts around automation in a bubble because they need to be applied to your application, your service, and your infrastructure, so begin to build the concepts and model them around your existing infrastructure, you're existing applications.
围绕现有应用程序构建概念模型，无需孤立地设计自动化概念，因为它们需要应用于您的应用程序、服务和基础设施，因此请开始构建这些概念并围绕您现有的基础设施和应用程序进行建模。

### Approach to Networking Automation

We should identify the tasks and perform a discovery on network change requests so that you have the most common issues and problems to automate a solution to.
我们应该识别任务并对网络变更请求进行发现，以便您能够掌握最常见的问题并自动化解决方案。

- Make a list of all the change requests and workflows that are currently being addressed manually.
- 列出当前所有手动处理的变更请求和工作流程。
- Determine the most common, time-consuming and error-prone activities.
- 确定最常见、最耗时和最容易出错的活动。
- Prioritise the requests by taking a business-driven approach.
- 通过采取业务驱动的方法对请求进行优先级排序。
- This is the framework for building an automation process, what must be automated and what must not.
- 这是构建自动化流程的框架，确定哪些必须自动化，哪些不必自动化。

We should then divide tasks and analyse how different network functions work and interact with each other.
然后，我们应该划分任务并分析不同的网络功能如何工作以及如何相互交互。

- The infrastructure/Network team receives change tickets at multiple layers to deploy applications.
- 基础设施/网络团队接收多个层面的变更工单来部署应用程序。
- Based on Network services, divide them into different areas and understand how they interact with each other.
- 根据网络服务，将其划分为不同的领域，并了解它们如何相互交互。
  - Application Optimisation
  - 应用程序优化
  - ADC (Application Delivery Controller)
  - ADC (应用交付控制器)
  - Firewall
  - 防火墙
  - DDI (DNS, DHCP, IPAM etc)
  - DDI (DNS、DHCP、IPAM 等)
  - Routing
  - 路由
  - Others
  - 其他
- Identify various dependencies to address business and cultural differences and bring in cross-team collaboration.
- 识别各种依赖关系，以解决业务和文化差异，并引入跨团队协作。

Reusable policies, define and simplify reusable service tasks, processes and input/outputs.
可重用策略，定义和简化可重用的服务任务、流程和输入/输出。

- Define offerings for various services, processes and input/outputs.
- 定义各种服务、流程和输入/输出的交付内容。
- Simplifying the deployment process will reduce the time to market for both new and existing workloads.
- 简化部署过程将缩短新旧工作负载的上市时间。
- Once you have a standard process, it can be sequenced and aligned to individual requests for a multi-threaded approach and delivery.
- 一旦有了标准流程，就可以对其进行排序，并与单独的请求保持一致，以实现多线程方法和交付。

Combine the policies with business-specific activities. How does implementing this policy help the business? Saves time? Saves Money? Provides a better business outcome?
将策略与特定于业务的活动结合起来。实施此策略如何帮助业务？节省时间？节省资金？提供更好的业务成果？

- Ensure that service tasks are interoperable.
- 确保服务任务可互操作。
- Associate the incremental service tasks so that they align to create business services.
- 关联增量服务任务，使其保持一致以创建业务服务。
- Allow for the flexibility to associate and re-associate service tasks on demand.
- 允许根据需求灵活地关联和重新关联服务任务。
- Deploy Self-Service capabilities and pave the way for improved operational efficiency.
- 部署自助服务能力，为提高运营效率铺平道路。
- Allow for the multiple technology skillsets to continue to contribute with oversight and compliance.
- 允许具有多种技术技能的人员在监督和合规的情况下继续做出贡献。

**Iterate** on the policies and process, adding and improving while maintaining availability and service.
对策略和流程进行**迭代**，在保持可用性和服务的同时进行添加和改进。

- Start small by automating existing tasks.
- 从自动化现有任务开始，从小处着手。
- Get familiar with the automation process, so that you can identify other areas that can benefit from automation.
- 熟悉自动化流程，以便您可以识别其他可以从自动化中受益的领域。
- iterate your automation initiatives, adding agility incrementally while maintaining the required availability.
- 迭代您的自动化举措，在保持所需可用性的同时逐步增加敏捷性。
- Taking an incremental approach paves the way for success!
- 采取增量方法为成功铺平道路！

Orchestrate the network service!
编排网络服务！

- Automation of the deployment process is required to deliver applications rapidly.
- 需要自动化部署过程才能快速交付应用程序。
- Creating an agile service environment requires different elements to be managed across technology skillsets.
- 创建敏捷的服务环境需要跨技术技能管理不同的元素。
- Prepare for an end to end orchestration that provides for control over automation and the order of deployments.
- 准备端到端编排，提供对自动化和部署顺序的控制。

## Network Automation Tools

The good news here is that for the most part, the tools we use here for Network automation are generally the same that we will use for other areas of automation or what we have already covered so far or what we will cover in future sessions.
好消息是，我们用于网络自动化的工具，在很大程度上与我们用于其他自动化领域、或到目前为止已经涵盖、或将在未来会议中涵盖的工具通常是相同的。

Operating System - As I have throughout this challenge, I am focusing on doing most of my learning with a Linux OS, those reasons were given in the Linux section but almost all of the tooling that we will touch albeit cross-OS platforms maybe today they all started as Linux based applications or tools, to begin with.
操作系统 (Operating System) - 正如我在整个挑战中所做的那样，我专注于使用 Linux 操作系统进行大部分学习，这些原因已在 Linux 部分给出，但我们接触到的几乎所有工具，即使今天它们是跨操作系统的平台，最初都是基于 Linux 的应用程序或工具。

Integrated Development Environment (IDE) - Again not much to say here other than throughout I would suggest Visual Studio Code as your IDE, based on the extensive plugins that are available for so many different languages.
集成开发环境 (Integrated Development Environment, IDE) - 再次，这里没有太多可说的，只是我建议全程使用 Visual Studio Code 作为您的 IDE，因为它为许多不同的语言提供了广泛的插件。

Configuration Management - We have not got to the Configuration management section yet, but it is very clear that Ansible is a favourite in this area for managing and automating configurations. Ansible is written in Python but you do not need to know Python.
配置管理 (Configuration Management) - 我们还没有到配置管理部分，但很明显，Ansible 是管理和自动化配置方面最受欢迎的工具。Ansible 是用 Python 编写的，但您不需要了解 Python。

- Agentless
- 无代理
- Only requires SSH
- 只需要 SSH
- Large Support Community
- 庞大的支持社区
- Lots of Network Modules
- 许多网络模块
- Push only model
- 仅推送模型
- Configured with YAML
- 使用 YAML 配置
- Open Source!
- 开源！

[Link to Ansible Network Modules](https://docs.ansible.com/ansible/2.9/modules/list_of_network_modules.html)

We will also touch on **Ansible Tower** in the configuration management section, see this as the GUI front end for Ansible.
我们还将在配置管理部分讨论 **Ansible Tower**，可以将其视为 Ansible 的 GUI 前端。

CI/CD - Again we will cover more about the concepts and tooling around this but it's important to at least mention here as this spans not only networking but all provisioning of service and platform.
CI/CD - 同样，我们将介绍更多有关此处的概念和工具，但至少在此提及很重要，因为它不仅涵盖网络，还涵盖所有服务和平台的预置。

In particular, Jenkins provides or seems to be a popular tool for Network Automation.
特别是，Jenkins 提供或似乎是网络自动化的一种流行工具。

- Monitors git repository for changes and then initiates them.
- 监视 git 存储库的更改，然后启动这些更改。

Version Control - Again something we will dive deeper into later on.
版本控制 (Version Control) - 同样，我们稍后将深入探讨。

- Git provides version control of your code on your local device - Cross-Platform
- Git 在您的本地设备上提供代码版本控制 - 跨平台
- GitHub, GitLab, BitBucket etc are online websites where you define your repositories and upload your code.
- GitHub、GitLab、BitBucket 等是在线网站，您可以在其中定义存储库并上传代码。

Language | Scripting - Something we have not covered here is Python as a language, I decided to dive into Go instead as the programming language based on my circumstances, I would say that it was a close call between Golang and Python and Python it seems to be the winner for Network Automation.
语言 | 脚本 (Language | Scripting) - 我们这里没有介绍 Python 这种语言，我根据我的情况决定转而深入研究 Go 作为编程语言，我想说 Golang 和 Python 势均力敌，但 Python 似乎是网络自动化领域的赢家。

- Nornir is something to mention here, an automation framework written in Python. This seems to take the role of Ansible but specifically around Network Automation. [Nornir documentation](https://nornir.readthedocs.io/en/latest/)
- 这里要提到 Nornir，一个用 Python 编写的自动化框架。它似乎扮演了 Ansible 的角色，但专门围绕网络自动化。[Nornir documentation](https://nornir.readthedocs.io/en/latest/)

Analyse APIs - Postman is a great tool for analysing RESTful APIs. Helps to build, test and modify APIs.
分析 API (Analyse APIs) - Postman 是一个分析 RESTful API 的绝佳工具。有助于构建、测试和修改 API。

- POST >>> To create resources objects.
- POST >>> 用于创建资源对象。
- GET >>> To retrieve a resources.
- GET >>> 用于检索资源。
- PUT >>> To create or replace the resources.
- PUT >>> 用于创建或替换资源。
- PATCH >>> To create or update the resources object.
- PATCH >>> 用于创建或更新资源对象。
- Delete >>> To delete a resources
- Delete >>> 用于删除资源

[Postman tool Download](https://www.postman.com/downloads/)

### Other tools to mention

[Cisco NSO (Network Services Orchestrator)](https://www.cisco.com/c/en/us/products/cloud-systems-management/network-services-orchestrator/index.html)

[NetYCE - Simplify Network Automation](https://netyce.com/)

[Network Test Automation](https://pubhub.devnetcloud.com/media/genie-feature-browser/docs/#/)

Over the next 3 days, I am planning to get more hands-on with some of the things we have covered and put some work in around Python and Network automation.
在接下来的 3 天里，我计划对我们所涵盖的一些内容进行更多实践，并投入一些精力在 Python 和网络自动化方面。

We have nowhere near covered all of the networking topics so far but wanted to make this broad enough to follow along and still keep learning from the resources I am adding below.
到目前为止，我们还没有完全涵盖所有网络主题，但希望让内容足够广泛，以便跟进并继续从我在下面添加的资源中学习。

## Resources

- [3 Necessary Skills for Network Automation](https://www.youtube.com/watch?v=KhiJ7Fu9kKA&list=WL&index=122&t=89s)
- [Computer Networking full course](https://www.youtube.com/watch?v=IPvYjXCsTg8)
- [Practical Networking](http://www.practicalnetworking.net/)
- [Python Network Automation](https://www.youtube.com/watch?v=xKPzLplPECU&list=WL&index=126)

See you on [Day 25](day25.md)
第 [Day 25](day25.md) 见
