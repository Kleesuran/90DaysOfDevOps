---
title: '#90DaysOfDevOps - An intro to Terraform - Day 57'
published: false
description: 90DaysOfDevOps - An intro to Terraform
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048710
---

## An intro to Terraform

"Terraform is a tool for building, changing, and versioning infrastructure safely and efficiently"

The above quote is from HashiCorp, HashiCorp is the company behind Terraform.
上述引用来自 HashiCorp，HashiCorp 是 Terraform 背后的公司。

"Terraform is an open-source infrastructure as a code software tool that provides a consistent CLI workflow to manage hundreds of cloud services. Terraform codifies cloud APIs into declarative configuration files."

HashiCorp has a great resource in [HashiCorp Learn](https://learn.hashicorp.com/terraform?utm_source=terraform_io&utm_content=terraform_io_hero) which covers all of their products and gives some great walkthrough demos when you are trying to achieve something with Infrastructure as Code.
HashiCorp 在 [HashiCorp Learn](https://learn.hashicorp.com/terraform?utm_source=terraform_io&utm_content=terraform_io_hero) 中提供了极好的资源，涵盖了他们的所有产品，并在您尝试使用基础设施即代码 (Infrastructure as Code, IaC) 实现某些目标时提供了精彩的演练演示。

All cloud providers and on-prem platforms generally give us access to management consoles which enables us to create our resources via a UI, generally, these platforms also provide a CLI or API access to create the same resources but with an API we can provision fast.
所有云提供商和本地平台通常都允许我们访问管理控制台，使我们能够通过用户界面 (UI) 创建资源。通常，这些平台也提供 CLI 或 API 访问来创建相同的资源，但使用 API 我们可以实现快速配置。

Infrastructure as Code allows us to hook into those APIs to deploy our resources in the desired state.
基础设施即代码 (IaC) 允许我们连接到这些 API，以所需的配置状态部署我们的资源。

Other tools but not exclusive or exhaustive below. If you have other tools then please share via a PR.
下面列出了其他工具，但并非详尽无遗。如果您有其他工具，请通过 PR 分享。

| Cloud Specific                  | Cloud Agnostic |
| ------------------------------- | -------------- |
| AWS CloudFormation              | Terraform      |
| Azure Resource Manager          | Pulumi         |
| Google Cloud Deployment Manager |                |

This is another reason why we are using Terraform, we want to be agnostic to the clouds and platforms that we wish to use for our demos but also in general.
这也是我们使用 Terraform 的另一个原因，我们希望对用于演示以及日常使用的云和平台保持中立。

## Terraform Overview

Terraform is a provisioning-focused tool, Terraform is a CLI that gives the capabilities of being able to provision complex infrastructure environments. With Terraform we can define complex infrastructure requirements that exist locally or remote (cloud) Terraform not only enables us to build things initially but also to maintain and update those resources for their lifetime.
Terraform 是一种专注于配置的工具，它是一个 CLI，能够配置复杂的底层基础设施环境。使用 Terraform，我们可以定义本地或远程（云端）的复杂基础设施要求。Terraform 不仅使我们能够初步构建资源，还能够在这些资源的整个生命周期内进行维护和更新。

We are going to cover the high level here but for more details and loads of resources, you can head to [terraform. io](https://www.terraform.io/)
我们将在这里介绍高层概念，但如果需要更多细节和大量资源，您可以访问 [terraform. io](https://www.terraform.io/)

### Write

Terraform allows us to create declarative configuration files that will build our environments. The files are written using the HashiCorp Configuration Language (HCL) which allows for concise descriptions of resources using blocks, arguments, and expressions. We will of course be looking into these in detail in deploying VMs, Containers and within Kubernetes.
Terraform 允许我们创建用于构建环境的声明性配置文件。这些文件使用 HashiCorp 配置语言 (HCL) 编写，该语言允许使用块 (blocks)、参数 (arguments) 和表达式 (expressions) 简洁地描述资源。当然，我们将在部署虚拟机 (VMs)、容器 (Containers) 和 Kubernetes 时详细研究这些内容。

### Plan

The ability to check that the above configuration files are going to deploy what we want to see using specific functions of the terraform cli to be able to test that plan before deploying anything or changing anything. Remember Terraform is a continued tool for your infrastructure if you would like to change aspects of your infrastructure you should do that via terraform so that it is captured all in code.
能够使用 terraform CLI 的特定功能来检查上述配置文件是否将部署我们想要的结果，以便在部署或更改任何内容之前测试该计划。请记住，Terraform 是用于您的基础设施的持续性工具——如果您想更改基础设施的某些方面，您应该通过 Terraform 来完成，以便所有更改都以代码的形式被捕获。

### Apply

Once you are happy you can go ahead and apply this configuration to the many providers that are available within Terraform. You can see a large number of providers available [here](https://registry.terraform.io/browse/providers)
一旦您满意，就可以继续将此配置应用于 Terraform 中可用的众多提供商 (providers)。您可以在 [此处](https://registry.terraform.io/browse/providers) 查看大量可用的提供商。

Another thing to mention is that there are also modules available, and this is similar to container images in that these modules have been created and shared in public so you do not have to create them again and again just reuse the best practice of deploying a specific infrastructure resource the same way everywhere. You can find the modules available [here](https://registry.terraform.io/browse/modules)
另一点需要提及的是，还有可用的模块 (modules)，这类似于容器镜像，这些模块已被创建并在公共场合共享，因此您无需重复创建它们，只需重复使用在任何地方以相同方式部署特定基础设施资源的最佳实践。您可以在 [此处](https://registry.terraform.io/browse/modules) 找到可用的模块。

The Terraform workflow looks like this: (_taken from the terraform site_)
Terraform 工作流程如下所示：（_取自 terraform 网站_）

![](Images/Day57_IAC3.png)

### Terraform vs Vagrant

During this challenge, we have used Vagrant which happens to be another Hashicorp open source tool which concentrates on the development environments.
在本次挑战中，我们使用了 Vagrant，它恰好是另一个专注于开发环境的 Hashicorp 开源工具。

- Vagrant is a tool focused on managing development environments

- Terraform is a tool for building infrastructure.

A great comparison of the two tools can be found here on the official [Hashicorp site](https://www.vagrantup.com/intro/vs/terraform)
可以在官方 [Hashicorp 网站](https://www.vagrantup.com/intro/vs/terraform) 上找到这两种工具的精彩比较。

## Terraform Installation

There is not much to the installation of Terraform.
Terraform 的安装没有什么复杂之处。

Terraform is cross-platform and you can see below on my Linux machine we have several options to download and install the CLI
Terraform 是跨平台的，您可以在下面看到在我的 Linux 机器上，我们有几种下载和安装 CLI 的选项。

![](Images/Day57_IAC2.png)

Using `arkade` to install Terraform, arkade is a handy little tool for getting your required tools, apps and clis onto your system. A simple `arkade get terraform` will allow for an update of terraform if available or this same command will also install the Terraform CLI
使用 `arkade` 安装 Terraform，arkade 是一个方便的小工具，用于将所需的工具、应用程序和 CLI 安装到您的系统上。一个简单的 `arkade get terraform` 命令将在 Terraform 可用时进行更新，或者该命令也会安装 Terraform CLI。

![](Images/Day57_IAC1.png)

We are going to get into more around HCL and then also start using Terraform to create some infrastructure resources in various platforms.
我们将更深入地研究 HCL，然后开始使用 Terraform 在各种平台上创建一些基础设施资源。

## Resources

I have listed a lot of resources down below and I think this topic has been covered so many times out there, If you have additional resources be sure to raise a PR with your resources and I will be happy to review and add them to the list.
我在下面列出了许多资源，我认为这个主题已经被很多人涵盖过。如果您有额外的资源，请务必通过 PR 提出您的资源，我将很乐意审查并将其添加到列表中。

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

See you on [Day 58](day58.md)
第 58 天见：[Day 58](day58.md)
