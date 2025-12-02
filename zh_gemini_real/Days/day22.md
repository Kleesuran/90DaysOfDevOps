---
title: '#90DaysOfDevOps - The OSI Model - The 7 Layers - Day 22'
published: false
description: 90DaysOfDevOps - The OSI Model - The 7 Layers
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049037
---

The content below comes mostly from Practical Networking's [Networking Fundamentals series](https://www.youtube.com/playlist?list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi).
以下内容主要来源于 Practical Networking 的 [Networking Fundamentals series](https://www.youtube.com/playlist?list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi)（网络基础知识系列）。

If you prefer this content in video form, check out these two videos:
如果您更喜欢视频形式的内容，请查看以下两个视频：

* [The OSI Model: A Practical Perspective - Layers 1 / 2 / 3](https://www.youtube.com/watch?v=LkolbURrtTs&list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi&index=3)
* [The OSI Model: A Practical Perspective - Layers 4 / 5+](https://www.youtube.com/watch?v=0aGqGKrRE0g&list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi&index=4)

## The OSI Model - The 7 Layers

The overall purpose of networking as an industry is to allow two hosts to share data.
作为一个行业，网络的总体目标是允许两台主机共享数据。

Before networking if I want to get data from this host to this host I'd have to plug something into this host walk it over to the other host and plug it into the other host.
在网络出现之前，如果我想将数据从一台主机传输到另一台主机，我必须将某种介质插入这台主机，然后带着它走到另一台主机并将其插入。

Networking allows us to automate this by allowing the host to share data automatically across the wire for these hosts to do this they must follow a set of rules.
网络允许我们自动化这一过程，通过允许主机通过线路自动共享数据，而主机必须遵循一套规则才能实现这一点。

This is no different than any language. English has a set of rules that two English speakers must follow. Spanish has its own set of rules. French has its own set of rules, while networking also has its own set of rules
这与任何语言都别无二致。英语有一套规则，两名英语使用者必须遵循。西班牙语有它自己的一套规则。法语有它自己的一套规则，而网络也有它自己的一套规则。

The rules for networking are divided into seven different layers and those layers are known as the OSI model.
网络的规则被划分为七个不同的层，这些层被称为 OSI 模型。

### Introduction to the OSI Model

The OSI Model (Open Systems Interconnection Model) is a framework used to describe the functions of a networking system.
OSI 模型（开放系统互连模型）是一个用于描述网络系统功能的框架。

The OSI model characterises computing functions into a universal set of rules and requirements to support interoperability between different products and software.
OSI 模型将计算功能归纳为一套通用的规则和要求，以支持不同产品和软件之间的互操作性。

In the OSI reference model, the communications between a computing system are split into seven different abstraction layers: **Physical, Data Link, Network, Transport, Session, Presentation, and Application**.
在 OSI 参考模型中，计算系统之间的通信被分为七个不同的抽象层：**物理层 (Physical)，数据链路层 (Data Link)，网络层 (Network)，传输层 (Transport)，会话层 (Session)，表示层 (Presentation) 和应用层 (Application)**。

![](Images/Day22_Networking1.png)

### Physical

Layer 1 in the OSI model and this is known as physical, the premise of being able to get data from one host to another through a means be it physical cable or we could also consider Wi-Fi in this layer as well.
OSI 模型中的第 1 层被称为物理层，其前提是通过某种方式（无论是物理电缆还是我们可以考虑在此层中的 Wi-Fi）将数据从一台主机传输到另一台主机。

We might also see some more legacy hardware seen here around hubs and repeaters to transport the data from one host to another.
我们可能还会看到一些更传统的硬件，如集线器 (hubs) 和中继器 (repeaters)，用于在主机之间传输数据。

![](Images/Day22_Networking2.png)

### Data Link

Layer 2, the data link enables a node to node transfer where data is packaged into frames.
第 2 层，数据链路层，实现了节点到节点 (node to node) 的传输，数据被封装成帧 (frames)。

There is also a level of error correcting that might have occurred at the physical layer. This is also where we introduce or first see MAC addresses.
此外，这里还涉及一定程度的错误校正，以纠正可能发生在物理层上的错误。这也是我们首次介绍或看到 MAC 地址的地方。

This is where we see the first mention of switches that we covered on our first day of networking on [Day 21](day21.md)
这也是我们首次提到交换机 (switches) 的地方，我们在网络基础知识的第一天 [第 21 天](day21.md) 讨论了它。

![](Images/Day22_Networking3.png)

### Network

You have likely heard the term layer 3 switches or layer 2 switches. In our OSI model Layer 3, the Network has a goal of an end to end delivery, this is where we see our IP addresses also mentioned in the first-day overview.
您可能听说过第 3 层交换机或第 2 层交换机这样的术语。在我们的 OSI 模型中，第 3 层（网络层）的目标是实现端到端 (end to end) 交付，这也是我们在第一天的概述中提到的 IP 地址出现的地方。

Routers and hosts exist at layer 3, remember the router is the ability to route between multiple networks. Anything with an IP could be considered Layer 3.
路由器和主机存在于第 3 层，请记住路由器具备在多个网络之间进行路由的能力。任何具有 IP 地址的设备都可以被视为第 3 层设备。

![](Images/Day22_Networking4.png)

So why do we need addressing schemes on both Layers 2 and 3? (MAC Addresses vs IP Addresses)
那么，为什么我们在第 2 层和第 3 层都需要寻址方案呢？（MAC 地址对比 IP 地址）

If we think about getting data from one host to another, each host has an IP address but there are several switches and routers in between. Each of the devices has that layer 2 MAC address.
如果我们考虑将数据从一台主机传输到另一台主机，每台主机都有一个 IP 地址，但中间有多个交换机和路由器。这些设备中的每一个都有第 2 层 MAC 地址。

The layer 2 MAC address will go from host to switch/router only, it is focused on hops whereas the layer 3 IP addresses will stay with that packet of data until it reaches its end host. (End to End)
第 2 层 MAC 地址只会在主机到交换机/路由器之间传递，它侧重于跳跃 (hops)，而第 3 层 IP 地址将一直伴随着该数据包，直到它到达最终主机。（端到端）

IP Addresses - Layer 3 = End to End Delivery
IP 地址 - 第 3 层 = 端到端交付

MAC Addresses - Layer 2 = Hop to Hop Delivery
MAC 地址 - 第 2 层 = 跳到跳交付

Now there is a network protocol that we will get into but not today called ARP(Address Resolution Protocol) which links our Layer3 and Layer2 addresses.
现在有一个网络协议，我们以后会深入探讨，但不是今天，它被称为 ARP（地址解析协议），它连接了我们的第 3 层和第 2 层地址。

### Transport

Service to Service delivery, Layer 4 is there to distinguish data streams.
服务到服务 (Service to Service) 交付，第 4 层的作用是区分数据流。

In the same way that Layer 3 and Layer 2 both had their addressing schemes, in Layer 4 we have ports.
就像第 3 层和第 2 层都有自己的寻址方案一样，在第 4 层，我们有端口 (ports)。

![](Images/Day22_Networking5.png)

### Session, Presentation, Application

The distinction between Layers 5,6,7 is or had become somewhat vague.
第 5、6、7 层之间的区别目前或曾经变得有些模糊。

It is worth looking at the [TCP IP Model](https://www.geeksforgeeks.org/tcp-ip-model/) to get a more recent understanding.
值得查看 [TCP IP 模型](https://www.geeksforgeeks.org/tcp-ip-model/) 以获得更贴近现代的理解。

Let's now try and explain what's happening when hosts are communicating with each other using this networking stack.
现在，让我们尝试解释当主机使用此网络堆栈相互通信时会发生什么。

This host has an application that's going to generate data that is meant to be sent to another host.
这台主机有一个应用程序，它将生成旨在发送给另一台主机的数据。

The source host is going to go through is what's known as the encapsulation process. That data will be first sent to layer 4.
源主机将经历一个被称为封装 (encapsulation) 的过程。该数据将首先发送到第 4 层。

Layer 4 is going to add a header to that data which can facilitate the goal of layer 4 which is service to service delivery.
第 4 层将向该数据添加一个报头 (header)，以帮助实现第 4 层的目标，即服务到服务的交付。

This is going to be a port using either TCP or UDP. It is also going to include the source port and destination port.
这将是一个使用 TCP 或 UDP 的端口。它还将包括源端口和目标端口。

This may also be known as a segment (Data and Port)
这也可能被称为一个段 (segment)（数据和端口）。

This segment is going to be passed down the OSI stack to layer 3, the network layer, and the network layer is going to add another header to this data.
该段将被传递到 OSI 堆栈的第 3 层（网络层），网络层将向此数据添加另一个报头。

This header is going to facilitate the goal of layer 3 which is the end to end delivery meaning in this header you will have a source IP address and a destination IP, the header plus data may also be referred to as a packet.
该报头将帮助实现第 3 层的目标，即端到端交付，这意味着在该报头中将包含源 IP 地址和目标 IP 地址，报头加数据也可能被称为一个数据包 (packet)。

Layer 3 will then take that packet and hand it off to layer 2, layer 2 will once again add another header to that data to accomplish layer 2's goal of hop to hop delivery meaning this header will include a source and destination mac address.
第 3 层随后将该数据包交给第 2 层，第 2 层将再次向该数据添加另一个报头，以完成第 2 层的跳到跳交付目标，这意味着该报头将包含源 MAC 地址和目标 MAC 地址。

This is known as a frame when you have the layer 2 header and data.
当您拥有第 2 层报头和数据时，这被称为一个帧 (frame)。

That frame then gets converted into ones and zeros and sent over the Layer 1 Physical cable or wifi.
然后，该帧被转换为一和零（比特流），并通过第 1 层物理电缆或 Wi-Fi 发送出去。

![](Images/Day22_Networking6.png)

I did mention above the naming for each layer of header plus data but decided to draw this out as well.
我上面提到了每一层报头加数据的命名，但也决定将其绘制出来。

![](Images/Day22_Networking7.png)

The Application sending the data is being sent somewhere so the receiving is somewhat in reverse to get that back up the stack and into the receiving host.
发送数据的应用程序正在将数据发送到某个地方，因此接收过程在某种程度上是相反的，目的是将数据重新推回到堆栈上方并进入接收主机。

![](Images/Day22_Networking8.png)

## Resources

* [Networking Fundamentals](https://www.youtube.com/playlist?list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi)
- [Computer Networking full course](https://www.youtube.com/watch?v=IPvYjXCsTg8)

See you on [Day23](day23.md)
[第 23 天](day23.md)见。
