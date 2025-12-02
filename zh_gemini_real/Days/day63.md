```markdown
---
title: '#90DaysOfDevOps - The Big Picture: Configuration Management - Day 63'
published: false
description: 90DaysOfDevOps - The Big Picture Configuration Management
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048711
---

## The Big Picture: Configuration Management

Coming straight off the back of the section covering Infrastructure as Code, there is likely going to be some crossover as we talk about Configuration Management or Application Configuration Management.
紧接着关于基础设施即代码（Infrastructure as Code）的部分之后，当我们讨论配置管理（Configuration Management）或应用程序配置管理时，可能会有一些交叉重叠。

Configuration Management is the process of maintaining applications, systems and servers in the desired state. The overlap with Infrastructure as code is that IaC is going to make sure your infrastructure is at the desired state but after that especially terraform is not going to look after the desired state of your OS settings or Application and that is where Configuration Management tools come in. Make sure that the system and applications perform the way it is expected as changes occur over Deane.
配置管理是维护应用程序、系统和服务器处于预期状态的过程。与基础设施即代码（IaC）的重叠在于，IaC会确保您的基础设施处于预期状态，但在那之后，尤其是像 Terraform 这样的工具，不会负责维护您的操作系统设置或应用程序的预期状态，这就是配置管理工具发挥作用的地方。它确保系统和应用程序在随着时间的推移发生变化时，能够按照预期的方式运行。

Configuration management keeps you from making small or large changes that go undocumented.
配置管理可以防止您进行未记录在案的或大或小的更改。

### Scenario: Why would you want to use Configuration Management

The scenario or why you'd want to use Configuration Management, meet Dean he's our system administrator and Dean is a happy camper pretty and
您可能想要使用配置管理的场景或原因，认识一下迪恩（Dean），他是我们的系统管理员，迪恩是一个很开心的家伙，他相当擅长
working on all of the systems in his environment.
处理他环境中的所有系统。

What happens if their system fails, if there's a fire, a server goes down well? Dean knows exactly what to do he can fix that fire easily the problems become difficult for Dean however if multiple servers start failing particularly when you have large and expanding environments, this is why Dean needs to have a configuration management tool. Configuration Management tools can help make Dean look like a rockstar, all he has to do is configure the right codes that allow him to push out the instructions on how to set up each of the servers quickly effectively and at scale.
如果他们的系统出现故障、发生火灾、或者一台服务器宕机了，会发生什么？迪恩确切地知道该怎么做，他可以轻松解决这些问题，然而，如果多台服务器开始故障，尤其当您拥有庞大且不断扩张的环境时，问题对迪恩来说就变得棘手了，这就是为什么迪恩需要一个配置管理工具。配置管理工具可以帮助迪恩看起来像个摇滚明星，他所要做的就是配置正确的代码，这些代码能让他快速、高效、大规模地推送设置每台服务器的指令。

### Configuration Management tools

There are a variety of configuration management tools available, and each has specific features that make it better for some situations than others.
有各种各样的配置管理工具可用，每种工具都有特定的功能，使其在某些情况下比其他工具更适用。

![](Images/Day63_config1.png)

At this stage, we will take a quickfire look at the options in the above picture before making our choice on which one we will use and why.
在这个阶段，我们将快速浏览一下上图中的选项，然后再决定我们将使用哪个工具以及原因。

- **Chef**

  - Chef ensures configuration is applied consistently in every environment, at any scale with infrastructure automation.
  - Chef 通过基础设施自动化确保配置在任何规模的每个环境中得到一致的应用。
  - Chef is an open-source tool developed by OpsCode written in Ruby and Erlang.
  - Chef 是由 OpsCode 开发的开源工具，使用 Ruby 和 Erlang 编写。
  - Chef is best suited for organisations that have a heterogeneous infrastructure and are looking for mature solutions.
  - Chef 最适合拥有异构基础设施并正在寻找成熟解决方案的组织。
  - Recipes and Cookbooks determine the configuration code for your systems.
  - Recipes（配方）和 Cookbooks（烹饪书）决定了您的系统的配置代码。
  - Pro - A large collection of recipes is available
  - 优点 - 有大量的配方（recipes）可用
  - Pro - Integrates well with Git which provides a strong version control
  - 优点 - 与 Git 集成良好，提供强大的版本控制
  - Con - Steep learning curve, a considerable amount of time required.
  - 缺点 - 学习曲线陡峭，需要相当多的时间。
  - Con - The main server doesn't have much control.
  - 缺点 - 主服务器没有太多控制权。
  - Architecture - Server / Clients
  - Architecture - 服务器 / 客户端
  - Ease of setup - Moderate
  - Ease of setup - 中等
  - Language - Procedural - Specify how to do a task
  - Language - 过程式 - 指定如何执行任务

- **Puppet**
  - Puppet is a configuration management tool that supports automatic deployment.
  - Puppet 是一种支持自动部署的配置管理工具。
  - Puppet is built in Ruby and uses DSL for writing manifests.
  - Puppet 使用 Ruby 构建，并使用 DSL 来编写 manifest（清单）。
  - Puppet also works well with heterogeneous infrastructure where the focus is on scalability.
  - Puppet 也适用于注重可扩展性的异构基础设施。
  - Pro - Large community for support.
  - 优点 - 拥有庞大的社区支持。
  - Pro - Well-developed reporting mechanism.
  - 优点 - 拥有完善的报告机制。
  - Con - Advance tasks require knowledge of the Ruby language.
  - 缺点 - 高级任务需要 Ruby 语言知识。
  - Con - The main server doesn't have much control.
  - 缺点 - 主服务器没有太多控制权。
  - Architecture - Server / Clients
  - Architecture - 服务器 / 客户端
  - Ease of setup - Moderate
  - Ease of setup - 中等
  - Language - Declarative - Specify only what to do
  - Language - 声明式 - 仅指定要做什么

- **Ansible**

  - Ansible is an IT automation tool that automates configuration management, cloud provisioning, deployment and orchestration.
  - Ansible 是一种 IT 自动化工具，可自动化配置管理、云资源调配、部署和编排。
  - The core of Ansible playbooks is written in YAML. (Should do a section on YAML as we have seen this a few times)
  - Ansible Playbook 的核心是用 YAML 编写的。（我们已经见过几次 YAML 了，应该专门写一个部分）
  - Ansible works well when there are environments that focus on getting things up and running fast.
  - Ansible 适用于注重快速启动和运行的环境。
  - Works on playbooks which provide instructions to your servers.
  - 它的工作基于 Playbook（剧本），Playbook 为您的服务器提供指令。
  - Pro - No agents are needed on remote nodes.
  - 优点 - 远程节点上不需要代理（Agent）。
  - Pro - YAML is easy to learn.
  - 优点 - YAML 易于学习。
  - Con - Performance speed is often less than other tools (Faster than Dean doing it himself manually)
  - 缺点 - 性能速度通常不如其他工具（但比迪恩手动操作要快）
  - Con - YAML is not as powerful as Ruby but has less of a learning curve.
  - 缺点 - YAML 不如 Ruby 强大，但学习曲线较平缓。
  - Architecture - Client Only
  - Architecture - 仅客户端
  - Ease of setup - Very Easy
  - Ease of setup - 非常简单
  - Language - Procedural - Specify how to do a task
  - Language - 过程式 - 指定如何执行任务

- **SaltStack**
  - SaltStack is a CLI-based tool that automates configuration management and remote execution.
  - SaltStack 是一个基于 CLI 的工具，可自动化配置管理和远程执行。
  - SaltStack is Python based whilst the instructions are written in YAML or its DSL.
  - SaltStack 基于 Python，而指令则用 YAML 或其 DSL 编写。
  - Perfect for environments with scalability and resilience as the priority.
  - 非常适合将可扩展性和弹性作为优先事项的环境。
  - Pro - Easy to use when up and running
  - 优点 - 启动运行后易于使用
  - Pro - Good reporting mechanism
  - 优点 - 良好的报告机制
  - Con - The setup phase is tough
  - 缺点 - 设置阶段比较困难
  - Con - New web UI which is much less developed than the others.
  - 缺点 - 新的 Web UI 远不如其他工具成熟。
  - Architecture - Server / Clients
  - Architecture - 服务器 / 客户端
  - Ease of setup - Moderate
  - Ease of setup - 中等
  - Language - Declarative - Specify only what to do
  - Language - 声明式 - 仅指定要做什么

### Ansible vs Terraform

The tool that we will be using for this section is going to be Ansible. (Easy to use and easier language basics required.)
我们将用于本节的工具是 Ansible。（易于使用且所需的语言基础知识更简单。）

I think it is important to touch on some of the differences between Ansible and Terraform before we look into the tooling a little further.
我认为在我们进一步研究这些工具之前，有必要提及一下 Ansible 和 Terraform 之间的一些区别。

|                | Ansible                                                      | Terraform                                                        |
| -------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| Type           | Ansible is a configuration management tool
| 类型           | Ansible 是一种配置管理工具                                   | Terraform is an orchestration tool
|                |                                                              | Terraform 是一种编排工具                                         |
| Infrastructure | Ansible provides support for mutable infrastructure
| 基础设施       | Ansible 支持可变基础设施                                     | Terraform provides support for immutable infrastructure
|                |                                                              | Terraform 支持不可变基础设施                                     |
| Language       | Ansible follows procedural language
| 语言           | Ansible 遵循过程式语言                                       | Terraform follows a declarative language
|                |                                                              | Terraform 遵循声明式语言                                         |
| Provisioning   | Ansible provides partial provisioning (VM, Network, Storage)
| 资源调配       | Ansible 提供部分资源调配（虚拟机、网络、存储）                 | Terraform provides extensive provisioning (VM, Network, Storage)
|                |                                                              | Terraform 提供广泛的资源调配（虚拟机、网络、存储）               |
| Packaging      | Ansible provides complete support for packaging & templating
| 打包           | Ansible 提供完整的打包和模板支持                             | Terraform provides partial support for packaging & templating
|                |                                                              | Terraform 提供部分的打包和模板支持                               |
| Lifecycle Mgmt | Ansible does not have lifecycle management
| 生命周期管理   | Ansible 没有生命周期管理                                     | Terraform is heavily dependent on lifecycle and state management
|                |                                                              | Terraform 严重依赖生命周期和状态管理                             |

## Resources

- [What is Ansible](https://www.youtube.com/watch?v=1id6ERvfozo)
- [Ansible 101 - Episode 1 - Introduction to Ansible](https://www.youtube.com/watch?v=goclfp6a2IQ)
- [NetworkChuck - You need to learn Ansible right now!](https://www.youtube.com/watch?v=5hycyr-8EKs&t=955s)

See you on [Day 64](day64.md)
```