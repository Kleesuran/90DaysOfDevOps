---
title: '#90DaysOfDevOps - Network Protocols - Day 23'
published: false
description: 90DaysOfDevOps - Network Protocols
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048704
---

The content below comes mostly from Practical Networking's [Networking Fundamentals series](https://www.youtube.com/playlist?list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi). If you prefer this content in video form, check out this video:
以下内容主要来自 Practical Networking 的[网络基础系列](https://www.youtube.com/playlist?list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi)。如果您更喜欢视频形式的内容，请查看此视频：

* [Network Protocols - ARP, FTP, SMTP, HTTP, SSL, TLS, HTTPS, DNS, DHCP](https://www.youtube.com/watch?v=E5bSumTAHZE&list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi&index=12)


## Network Protocols

A set of rules and messages that form a standard. An Internet Standard.
一组规则和消息，它们构成了一个标准。一个互联网标准。

- ARP - Address Resolution Protocol
- ARP - 地址解析协议

If you want to get really into the weeds on ARP you can read the Internet Standard here. [RFC 826](https://datatracker.ietf.org/doc/html/rfc826)
如果您想深入了解 ARP 的细节，您可以在这里阅读互联网标准。 [RFC 826](https://datatracker.ietf.org/doc/html/rfc826)

Connects IP addresses to fixed physical machine addresses, also known as MAC addresses across a layer 2 network.
在二层网络中，将 IP 地址连接到固定的物理机器地址，即 MAC 地址。

![](Images/Day23_Networking1.png)

- FTP - File Transfer Protocol
- FTP - 文件传输协议

Allows for the transfer of files from source to destination. Generally, this process is authenticated but there is the ability if configured to use anonymous access. You will more frequently now see FTPS which provides SSL/TLS connectivity to FTP servers from the client for better security. This protocol would be found in the Application layer of the OSI Model.
允许文件从源传输到目标。通常，此过程需要身份验证，但如果配置得当，也可以使用匿名访问。现在您会更频繁地看到 FTPS，它通过 SSL/TLS 为客户端提供与 FTP 服务器的连接，以获得更好的安全性。该协议属于 OSI 模型的应用层。

![](Images/Day23_Networking2.png)

- SMTP - Simple Mail Transfer Protocol
- SMTP - 简单邮件传输协议

Used for email transmission, mail servers use SMTP to send and receive mail messages. You will still find even with Microsoft 365 that the SMTP protocol is used for the same purpose.
用于电子邮件传输，邮件服务器使用 SMTP 来发送和接收邮件消息。即使在使用 Microsoft 365 的情况下，您仍然会发现 SMTP 协议用于相同的目的。

![](Images/Day23_Networking3.png)

- HTTP - Hyper Text Transfer Protocol
- HTTP - 超文本传输协议

HTTP is the foundation of the internet and browsing content. Giving us the ability to easily access our favourite websites. HTTP is still heavily used but HTTPS is more so used or should be used on most of your favourite sites.
HTTP 是互联网和浏览内容的基础。它使我们能够轻松访问我们最喜爱的网站。 HTTP 仍然被大量使用，但在您最喜欢的网站上，HTTPS 被更多地使用或应该被使用。

![](Images/Day23_Networking4.png)

- SSL - Secure Sockets Layer | TLS - Transport Layer Security
- SSL - 安全套接层 | TLS - 传输层安全

TLS has taken over from SSL, TLS is a **Cryptographic Protocol** that provides secure communications over a network. It can and will be found in the mail, Instant Messaging and other applications but most commonly it is used to secure HTTPS.
TLS 已经取代了 SSL，TLS 是一种**加密协议**，它提供安全的网络通信。它可以在邮件、即时消息和其他应用程序中找到，但最常用于保护 HTTPS。

![](Images/Day23_Networking5.png)

- HTTPS - HTTP secured with SSL/TLS
- HTTPS - 使用 SSL/TLS 加密的 HTTP

An extension of HTTP, used for secure communications over a network, HTTPS is encrypted with TLS as mentioned above. The focus here was to bring authentication, privacy and integrity whilst data is exchanged between hosts.
作为 HTTP 的扩展，用于安全的网络通信，如上所述，HTTPS 使用 TLS 进行加密。这里的重点是在主机之间交换数据时提供身份验证、隐私和完整性。

![](Images/Day23_Networking6.png)

- DNS - Domain Name System
- DNS - 域名系统

The DNS is used to map human-friendly domain names for example we all know [google.com](https://google.com) but if you were to open a browser and put in [8.8.8.8](https://8.8.8.8) you would get Google as we pretty much know it. However good luck trying to remember all of the IP addresses for all of your websites where some of them we even use google to find information.
DNS 用于映射对人类友好的域名，例如我们都知道 [google.com](https://google.com)，但如果你打开浏览器输入 [8.8.8.8](https://8.8.8.8)，你也会得到我们所熟知的 Google 网站。然而，如果你需要记住所有网站的 IP 地址，祝你好运，有些信息我们甚至还需要通过 Google 来查找。

This is where DNS comes in, it ensures that hosts, services and other resources are reachable.
这就是 DNS 的作用所在，它确保主机、服务和其他资源可以被访问到。

On all hosts, if they require internet connectivity then they must have DNS to be able to resolve those domain names. DNS is an area you could spend Days and Years on learning. I would also say from experience that DNS is mostly the common cause of all errors when it comes to Networking. Not sure if a Network engineer would agree there though.
所有需要互联网连接的主机都必须配置 DNS 才能解析这些域名。DNS 是一个你可以花费数日甚至数年去学习的领域。我也会凭经验说，在网络方面，DNS 通常是所有错误的常见原因。不过，我不确定网络工程师是否会同意这一点。

![](Images/Day23_Networking7.png)

- DHCP - Dynamic Host Configuration Protocol
- DHCP - 动态主机配置协议

We have discussed a lot about protocols that are required to make our hosts work, be it accessing the internet or transferring files between each other.
我们已经讨论了很多关于使我们的主机正常工作所需的协议，无论是访问互联网还是互相传输文件。

There are 4 things that we need on every host for it to be able to achieve both of those tasks.
我们的每个主机都需要 4 件事才能完成这两个任务。

- IP Address
- Subnet Mask
- Default Gateway
- DNS

We have covered IP address being a unique address for your host on the network it resides, we can think of this as our house number.
我们已经讨论过 IP 地址，它是您的主机在其所在网络上的唯一地址，我们可以将其视为我们的门牌号码。

Subnet mask we will cover shortly, but you can think of this as postcode or zip code.
我们稍后将介绍子网掩码，您可以将其视为邮政编码。

A default gateway is the IP of our router generally on our network providing us with that Layer 3 connectivity. You could think of this as the single road that allows us out of our street.
默认网关通常是我们网络上路由器的 IP 地址，为我们提供三层连接。你可以把它想象成一条让我们离开我们街道的唯一道路。

Then we have DNS as we just covered to help us convert complicated public IP addresses to more suitable and rememberable domain names. Maybe we can think of this as the giant sorting office to make sure we get the right post.
然后我们有 DNS，正如我们刚刚介绍的，它可以帮助我们将复杂的公共 IP 地址转换为更合适、更容易记住的域名。也许我们可以把它想象成一个巨大的分拣中心，确保我们收到正确的邮件。

As I said each host requires these 4 things, if you have 1000 or 10,000 hosts then that is going to take you a very long time to determine each one of these individually. This is where DHCP comes in and allows you to determine a scope for your network and then this protocol will distribute to all available hosts in your network.
如我所说，每个主机都需要这 4 件事，如果你有 1000 个或 10,000 个主机，那么单独确定每个参数将花费很长时间。这就是 DHCP 的用武之地，它允许您确定网络的范围，然后该协议会将这些配置分发给网络中的所有可用主机。

Another example is you head into a coffee shop, grab a coffee and sit down with your laptop or your phone let's call that your host. You connect your host to the coffee shop WiFi and you gain access to the internet, messages and mail start pinging through and you can navigate web pages and social media. When you connected to the coffee shop WiFi your machine would have picked up a DHCP address either from a dedicated DHCP server or most likely from the router also handling DHCP.
另一个例子是，你走进一家咖啡店，点了一杯咖啡，然后带着你的笔记本电脑或手机（我们称之为你的主机）坐下。你将主机连接到咖啡店的 WiFi，然后就可以访问互联网、消息和邮件开始涌入，你可以浏览网页和社交媒体。当你连接到咖啡店 WiFi 时，你的机器会获得一个 DHCP 地址，它可能来自专用的 DHCP 服务器，或者更可能是来自同时也处理 DHCP 的路由器。

![](Images/Day23_Networking8.png)

### Subnetting

A subnet is a logical subdivision of an IP network.
子网是 IP 网络的逻辑细分。

Subnets break large networks into smaller, more manageable networks that run more efficiently.
子网将大型网络分解为更小、更易于管理的网络，从而更高效地运行。

Each subnet is a logical subdivision of the bigger network. Connected devices with enough subnet share common IP address identifiers, enabling them to communicate with each other.
每个子网都是更大网络的逻辑细分。具有足够子网的连接设备共享共同的 IP 地址标识符，使它们能够相互通信。

Routers manage communication between subnets.
路由器管理子网之间的通信。

The size of a subnet depends on the connectivity requirements and the network technology used.
子网的大小取决于连接要求和所使用的网络技术。

An organisation is responsible for determining the number and size of the subnets within the limits of address space available, and the details remain local to that organisation. Subnets can also be segmented into even smaller subnets for things like Point to Point links, or subnetworks supporting a few devices.
组织负责在可用地址空间的限制内确定子网的数量和大小，并且这些详细信息对该组织是局部的。子网也可以被分割成更小的子网，用于点对点链接，或支持少量设备的子网络。

Among other advantages, segmenting large
networks into subnets enable IP address
reallocation and relieves network congestion, streamlining, network communication and efficiency.
除了其他优点外，将大型网络分段成子网还可以实现 IP 地址的重新分配，缓解网络拥堵，从而简化网络通信并提高效率。

Subnets can also improve network security.
子网还可以提高网络安全性。
If a section of a network is compromised, it can be quarantined, making it difficult for bad actors to move around the larger network.
如果网络的某个部分受到威胁，它可以被隔离，使恶意行为者难以在更大的网络中移动。

![](Images/Day23_Networking9.png)

## Resources

- [Networking Fundamentals](https://www.youtube.com/playlist?list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi)
- [Subnetting Mastery](https://www.youtube.com/playlist?list=PLIFyRwBY_4bQUE4IB5c4VPRyDoLgOdExE)
- [Computer Networking full course](https://www.youtube.com/watch?v=IPvYjXCsTg8)

See you on [Day 24](day24.md)
[第 24 天](day24.md)见
