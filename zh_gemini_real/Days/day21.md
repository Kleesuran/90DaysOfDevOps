---
title: '#90DaysOfDevOps - The Big Picture: DevOps and Networking - Day 21'
published: false
description: 90DaysOfDevOps - The Big Picture DevOps and Networking
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048761
---

## The Big Picture: DevOps and Networking

As with all sections, I am using open and free training materials and a lot of the content can be attributed to others. 
与其他所有章节一样，我使用的都是公开和免费的培训材料，其中许多内容可归功于其他人。
In the case of the networking section a large majority of the content shown is from [Practical Networking](https://www.practicalnetworking.net/)'s free [Networking Fundamentals series](https://www.youtube.com/playlist?list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi).  
就网络部分而言，所展示的大部分内容来自于 [Practical Networking](https://www.practicalnetworking.net/) 的免费 [网络基础系列课程](https://www.youtube.com/playlist?list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi)。
It is mentioned in the resources as well as a link but it's appropriate to highlight this as from a community point of view, I have leveraged this course to help myself understand more about particular areas of technologies. 
虽然它已在资源部分被提及并附有链接，但从社区的角度来看，我有必要重点强调它，因为我利用了该课程来帮助自己更深入地理解特定技术领域。
This repository is a repository for my note taking and enabling the community to hopefully benefit from this and the listed resources. 
这个代码库是我用来记录笔记的，并希望社区能够从中以及列出的资源中受益。

Welcome to Day 21! We are going to be getting into Networking over the next 7 days, Networking and DevOps are the overarching themes but we will need to get into some of the networking fundamentals as well.
欢迎来到第 21 天！在接下来的 7 天里，我们将深入研究网络，网络和 DevOps 是总体主题，但我们也需要涉及一些网络基础知识。

Ultimately as we have said previously DevOps is about a culture and process change within your organisation this as we have discussed can be Virtual Machines, Containers, or Kubernetes but it can also be the network, If we are using those DevOps principles for our infrastructure that has to include the network more to the point from a DevOps point of view you also need to know about the network as in the different topologies and networking tools and stacks that we have available.
正如我们之前所说，DevOps 最终关乎组织内部的文化和流程变革，正如我们讨论过的，这可能涉及虚拟机、容器或 Kubernetes，但它也可以是网络。如果我们将这些 DevOps 原则应用于基础设施，那么它必须包含网络，更重要的是，从 DevOps 的角度来看，您还需要了解网络，例如我们可用的不同拓扑结构、网络工具和技术栈。

I would argue that we should have our networking devices configured using infrastructure as code and have everything automated like we would our virtual machines, but to do that we have to have a good understanding of what we are automating.
我认为，我们应该使用基础设施即代码来配置我们的网络设备，并像配置虚拟机一样实现所有内容的自动化，但要做到这一点，我们必须对我们正在自动化的内容有充分的理解。

### What is NetDevOps | Network DevOps?

You may also hear the terms Network DevOps or NetDevOps. Maybe you are already a Network engineer and have a great grasp on the network components within the infrastructure you understand the elements used around networking such as DHCP, DNS, NAT etc. You will also have a good understanding of the hardware or software-defined networking options, switches, routers etc.
您可能还听说过 Network DevOps 或 NetDevOps 这些术语。也许您已经是网络工程师，对基础设施中的网络组件有很好的掌握，您了解网络中使用的元素，例如 DHCP、DNS、NAT 等。您也将对硬件或软件定义网络选项、交换机、路由器等有很好的理解。

But if you are not a network engineer then we probably need to get foundational knowledge across the board in some of those areas so that we can understand the end goal of Network DevOps.
但是，如果您不是网络工程师，那么我们可能需要在其中一些领域获得全面的基础知识，以便我们能够理解网络 DevOps 的最终目标。

But in regards to those terms, we can think of NetDevOps or Network DevOps as applying the DevOps Principles and Practices to the network, applying version control and automation tools to the network creation, testing, monitoring, and deployments.
但是关于这些术语，我们可以将 NetDevOps 或 Network DevOps 视为将 DevOps 原则和实践应用于网络，将版本控制和自动化工具应用于网络的创建、测试、监控和部署。

If we think of Network DevOps as having to require automation, we mentioned before about DevOps breaking down the silos between teams. If the networking teams do not change to a similar model and process then they become the bottleneck or even the failure overall.
如果我们认为网络 DevOps 必须要求自动化，我们之前提到了 DevOps 打破团队之间的孤岛。如果网络团队不转向类似的模式和流程，那么他们将成为瓶颈，甚至导致整体失败。

Using the automation principles around provisioning, configuration, testing, version control and deployment is a great start. 
围绕资源调配、配置、测试、版本控制和部署使用自动化原则是一个很好的开始。
Automation is overall going to enable speed of deployment, stability of the networking infrastructure and consistent improvement as well as the process being shared across multiple environments once they have been tested. 
自动化总体上将实现部署速度的提升、网络基础设施的稳定性和持续改进，以及一旦经过测试，流程就可以在多个环境中共享。
Such as a fully tested Network Policy that has been fully tested on one environment can be used quickly in another location because of the nature of this being in code vs a manually authored process which it might have been before.
例如，一个已在一个环境中经过充分测试的网络策略，由于它是以代码形式存在的，而不是像以前那样是手动编写的流程，因此可以快速地用于另一个位置。
A really good viewpoint and outline of this thinking can be found here. [Network DevOps](https://www.thousandeyes.com/learning/techtorials/network-devops)
关于这种思路的一个非常好的观点和概述可以在这里找到：[网络 DevOps](https://www.thousandeyes.com/learning/techtorials/network-devops)

## Networking The Basics

Let's forget the DevOps side of things to begin with here and we now need to look very briefly into some of the Networking fundamentals.
让我们先暂时忘记 DevOps 方面的事情，现在我们需要非常简要地了解一些网络基础知识。

### Network Devices

If you prefer this content in video form, check out these videos from Practical Networking:
如果您更喜欢视频形式的内容，请查看 Practical Networking 提供的这些视频：

* [Network Devices - Hosts, IP Addresses, Networks - Networking Fundamentals - Lesson 1a](https://www.youtube.com/watch?v=bj-Yfakjllc&list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi&index=1)
* [Network Devices - Hub, Bridge, Switch, Router - Networking Fundamentals - Lesson 1b
](https://www.youtube.com/watch?v=H7-NR3Q3BeI&list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi&index=2)

**Host** are any devices which send or receive traffic.
**主机 (Host)** 是指任何发送或接收流量的设备。

![](Images/Day21_Networking1.png)

**IP Address** the identity of each host.
**IP 地址 (IP Address)** 是每个主机的身份。

![](Images/Day21_Networking2.png)

**Network** is what transports traffic between hosts. If we did not have networks there would be a lot of manual movement of data!
**网络 (Network)** 是在主机之间传输流量的媒介。如果没有网络，数据的移动将需要大量的手动操作！

A logical group of hosts which require similar connectivity.
需要类似连接的一组逻辑主机。

![](Images/Day21_Networking3.png)

**Switches** facilitate communication **_within_** a network. A switch forwards data packets between hosts. A switch sends packets directly to hosts.
**交换机 (Switches)** 促进网络**_内部_**的通信。交换机在主机之间转发数据包。交换机将数据包直接发送给主机。

- Network: A Grouping of hosts which require similar connectivity.
- 网络：一组需要类似连接的主机。
- Hosts on a Network share the same IP address space.
- 网络上的主机共享相同的 IP 地址空间。

![](Images/Day21_Networking4.png)

**Router** facilitates communication between networks. As we said before that a switch looks after communication within a network a router allows us to join these networks together or at least give them access to each other if permitted.
**路由器 (Router)** 促进网络之间的通信。正如我们之前所说，交换机负责网络内的通信，而路由器允许我们将这些网络连接在一起，或者至少在允许的情况下让它们相互访问。

A router can provide a traffic control point (security, filtering, redirecting) More and more switches also provide some of these functions now.
路由器可以提供流量控制点（安全、过滤、重定向）。现在越来越多的交换机也提供其中一些功能。

Routers learn which networks they are attached to. These are known as routes, a routing table is all the networks a router knows about.
路由器会学习它所连接的网络。这些被称为路由，路由表是路由器知道的所有网络。

A router has an IP address in the networks they are attached to. This IP is also going to be each host's way out of their local network also known as a gateway.
路由器在它们所连接的网络中拥有一个 IP 地址。该 IP 地址也将是每个主机离开其本地网络的方式，也称为网关。

Routers also create the hierarchy in networks I mentioned earlier.
路由器还创建了我之前提到的网络层次结构。

![](Images/Day21_Networking5.png)

## Switches vs Routers

**Routing** is the process of moving data between networks.
**路由 (Routing)** 是在网络之间移动数据的过程。

- A router is a device whose primary purpose is Routing.
- 路由器是一种主要目的在于路由的设备。

**Switching** is the process of moving data within networks.
**交换 (Switching)** 是在网络内部移动数据的过程。

- A Switch is a device whose primary purpose is switching.
- 交换机是一种主要目的在于交换的设备。

This is very much a foundational overview of devices as we know there are many different Network Devices such as:
这只是对设备的基础概述，因为我们知道还有许多不同的网络设备，例如：

- Access Points
- 接入点
- Firewalls
- 防火墙
- Load Balancers
- 负载均衡器
- Layer 3 Switches
- 三层交换机
- IDS / IPS
- 入侵检测系统 / 入侵防御系统 (IDS / IPS)
- Proxies
- 代理
- Virtual Switches
- 虚拟交换机
- Virtual Routers
- 虚拟路由器

Although all of these devices are going to perform Routing and/or Switching.
尽管所有这些设备都将执行路由和/或交换功能。

Over the next few days, we are going to get to know a little more about this list.
在接下来的几天里，我们将更多地了解这个列表中的内容。

- OSI Model
- OSI 模型
- Network Protocols
- 网络协议
- DNS (Domain Name System)
- DNS (域名系统)
- NAT
- 网络地址转换 (NAT)
- DHCP
- 动态主机配置协议 (DHCP)
- Subnets
- 子网

## Resources

* [Networking Fundamentals](https://www.youtube.com/playlist?list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi)
* [Computer Networking full course](https://www.youtube.com/watch?v=IPvYjXCsTg8)

See you on [Day22](day22.md)
我们第 22 天再见。
