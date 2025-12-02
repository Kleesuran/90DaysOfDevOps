---
title: '#90DaysOfDevOps - Microsoft Azure Networking Models + Azure Management - Day 33'
published: false
description: 90DaysOfDevOps - Microsoft Azure Networking Models + Azure Management
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048706
---

## Microsoft Azure Networking Models + Azure Management

As if today marks the anniversary of Microsoft Azure and its 12th Birthday! (1st February 2022) Anyway, we are going to cover the networking models within Microsoft Azure and some of the management options for Azure. So far we have only used the Azure portal but we have mentioned other areas that can be used to drive and create our resources within the platform.
恰逢今天（2022年2月1日）是 Microsoft Azure 成立 12 周年的日子！无论如何，我们将介绍 Microsoft Azure 中的网络模型以及 Azure 的一些管理选项。到目前为止，我们只使用了 Azure 门户，但我们提到了可用于驱动和创建平台内资源的其他方面。

## Azure Network Models

### Virtual Networks

- A virtual network is a construct created in Azure.
- 虚拟网络是在 Azure 中创建的一种结构。
- A virtual network has one or more IP ranges assigned to it.
- 虚拟网络分配有一个或多个 IP 范围。
- Virtual networks live within a subscription within a region.
- 虚拟网络位于某一区域内的订阅中。
- Virtual subnets are created in the virtual network to break up the network range.
- 在虚拟网络中创建虚拟子网以划分网络范围。
- Virtual machines are placed in virtual subnets.
- 虚拟机放置在虚拟子网中。
- All virtual machines within a virtual network can communicate.
- 虚拟网络中的所有虚拟机都可以进行通信。
- 65,536 Private IPs per Virtual Network.
- 每个虚拟网络有 65,536 个私有 IP。
- Only pay for egress traffic from a region. (Data leaving the region)
- 只需支付来自某个区域的出口流量费用。（离开该区域的数据）
- IPv4 & IPv6 Supported.
- 支持 IPv4 和 IPv6。
  - IPv6 for public-facing and within virtual networks.
  - IPv6 用于面向公众和虚拟网络内部。

We can liken Azure Virtual Networks to AWS VPCs. However, there are some differences to note:
我们可以将 Azure 虚拟网络比作 AWS VPC。但是，需要注意一些区别：

- In AWS a default VNet is created that is not the case in Microsoft Azure, you have to create your first virtual network to your requirements.
- 在 AWS 中，会创建一个默认 VNet，但在 Microsoft Azure 中并非如此，您必须根据自己的要求创建第一个虚拟网络。
- All Virtual Machines by default in Azure have NAT access to the internet. No NAT Gateways as per AWS.
- 默认情况下，Azure 中的所有虚拟机都具有对互联网的 NAT 访问权限。不像 AWS 那样需要 NAT 网关。
- In Microsoft Azure, there is no concept of Private or Public subnets.
- 在 Microsoft Azure 中，没有私有或公共子网的概念。
- Public IPs are a resource that can be assigned to vNICs or Load Balancers.
- 公共 IP 是一种可分配给 vNIC 或负载均衡器的资源。
- The Virtual Network and Subnets have their own ACLs enabling subnet level delegation.
- 虚拟网络和子网具有自己的 ACL，可实现子网级别的委派。
- Subnets across Availability Zones whereas in AWS you have subnets per Availability Zones.
- 子网跨越可用区，而在 AWS 中，每个可用区都有子网。

We also have Virtual Network Peering. This enables virtual networks across tenants and regions to be connected using the Azure backbone. Not transitive but can be enabled via Azure Firewall in the hub virtual network. Using a gateway transit allows peered virtual networks to the connectivity of the connected network and an example of this could ExpressRoute to On-Premises.
我们还有虚拟网络对等连接（Virtual Network Peering）。这使得跨租户和区域的虚拟网络能够使用 Azure 主干网连接。它不是传递性的，但可以通过中心虚拟网络中的 Azure 防火墙启用。使用网关传输允许对等虚拟网络连接到已连接的网络，例如，ExpressRoute 连接到本地部署网络。

### Access Control

- Azure utilises Network Security Groups, these are stateful.
- Azure 使用网络安全组 (Network Security Groups)，它们是有状态的。
- Enable rules to be created and then assigned to a network security group
- 启用规则创建，然后将其分配给网络安全组。
- Network security groups applied to subnets or VMs.
- 网络安全组应用于子网或虚拟机。
- When applied to a subnet it is still enforced at the Virtual Machine NIC that it is not an "Edge" device.
- 当应用于子网时，它仍然在虚拟机网卡 (NIC) 处强制执行，它不是“边缘”设备。

![](Images/Day33_Cloud1.png)

- Rules are combined in a Network Security Group.
- 规则在网络安全组中合并。
- Based on the priority, flexible configurations are possible.
- 根据优先级，可以进行灵活的配置。
- Lower priority number means high priority.
- 较低的优先级数字意味着较高的优先级。
- Most logic is built by IP Addresses but some tags and labels can also be used.
- 大多数逻辑是通过 IP 地址构建的，但也可以使用一些标签和标记。

| Description | Priority | Source Address | Source Port | Destination Address | Destination Port | Action |
| ---------------- | -------- | ------------------ | ----------- | ------------------- | ---------------- | ------ |
| Inbound 443 | 1005 | \* | \* | \* | 443 | Allow |
| ILB | 1010 | Azure LoadBalancer | \* | \* | 10000 | Allow |
| Deny All Inbound | 4000 | \* | \* | \* | \* | DENY |

We also have Application Security Groups (ASGs)
我们还有应用程序安全组 (Application Security Groups, ASGs)

- Where NSGs are focused on the IP address ranges which may be difficult to maintain for growing environments.
- NSG 侧重于 IP 地址范围，这对于不断增长的环境可能难以维护。
- ASGs enable real names (Monikers) for different application roles to be defined (Webservers, DB servers, WebApp1 etc.)
- ASG 能够为不同的应用程序角色定义真实名称（标识符）（Web 服务器、数据库服务器、WebApp1 等）。
- The Virtual Machine NIC is made a member of one or more ASGs.
- 虚拟机网卡 (NIC) 成为一个或多个 ASG 的成员。

The ASGs can then be used in rules that are part of Network Security Groups to control the flow of communication and can still use NSG features like service tags.
然后，ASG 可用于作为网络安全组一部分的规则中，以控制通信流，并且仍然可以使用 NSG 功能，例如服务标签。

| Action | Name | Source | Destination | Port |
| ------ | ------------------ | ---------- | ----------- | ------------ |
| Allow | AllowInternettoWeb | Internet | WebServers | 443(HTTPS) |
| Allow | AllowWebToApp | WebServers | AppServers | 443(HTTPS) |
| Allow | AllowAppToDB | AppServers | DbServers | 1443 (MSSQL) |
| Deny | DenyAllinbound | Any | Any | Any |

### Load Balancing

Microsoft Azure has two separate load balancing solutions. (the first party, there are third parties available in the Azure marketplace.) Both can operate with externally facing or internally facing endpoints.
Microsoft Azure 有两种独立的负载均衡解决方案。（第一方解决方案，Azure Marketplace 中还有第三方解决方案。）两者都可以使用面向外部或面向内部的端点进行操作。

- Load Balancer (Layer 4) supporting hash-based distribution and port-forwarding.
- 负载均衡器（第 4 层），支持基于哈希的分配和端口转发。
- App Gateway (Layer 7) supports features such as SSL offload, cookie-based session affinity and URL-based content routing.
- 应用程序网关（第 7 层），支持 SSL 卸载、基于 Cookie 的会话亲和性和基于 URL 的内容路由等功能。

Also with the App Gateway, you can optionally use the Web Application firewall component.
此外，对于应用程序网关，您可以选择使用 Web 应用程序防火墙组件。

## Azure Management Tools

We have spent most of our theory time walking through the Azure Portal, I would suggest that when it comes to following a DevOps culture and process a lot of these tasks, especially around provisioning will be done via an API or a command-line tool. I wanted to touch on some of those other management tools that we have available to us as we need to know this for when we are automating the provisioning of our Azure environments.
我们大部分的理论时间都花在浏览 Azure 门户上，我建议，在遵循 DevOps 文化和流程时，许多此类任务（尤其是配置任务）将通过 API 或命令行工具完成。我想谈谈我们可用的其他一些管理工具，因为当我们自动化 Azure 环境的配置时，我们需要了解这些工具。

### Azure Portal

The Microsoft Azure Portal is a web-based console, that provides an alternative to command-line tools. You can manage your subscriptions within the Azure Portal. Build, Manage, and Monitor everything from a simple web app to complex cloud deployments. Another thing you will find within the portal are these breadcrumbs, JSON as mentioned before is the underpinning of all Azure Resources, It might be that you start in the Portal to understand the features, services and functionality but then later understand the JSON underneath to incorporate into your automated workflows.
Microsoft Azure 门户是一个基于 Web 的控制台，提供了命令行工具的替代方案。您可以在 Azure 门户中管理您的订阅。构建、管理和监控从简单的 Web 应用程序到复杂的云部署的一切。您在门户中还会发现这些面包屑（breadcrumbs），正如之前提到的，JSON 是所有 Azure 资源的基础，您可能最初在门户中了解功能、服务和特性，但随后会理解底层的 JSON，以便将其纳入您的自动化工作流程。

![](Images/Day33_Cloud2.png)

There is also the Azure Preview portal, this can be used to view and test new and upcoming services and enhancements.
还有 Azure 预览门户，可用于查看和测试新的和即将推出的服务和增强功能。

![](Images/Day33_Cloud3.png)

### PowerShell

Before we get into Azure PowerShell it is worth introducing PowerShell first. PowerShell is a task automation and configuration management framework, a command-line shell and a scripting language. We might and dare I say this liken this to what we have covered in the Linux section around shell scripting. PowerShell was very much first found on Windows OS but it is now cross-platform.
在我们深入了解 Azure PowerShell 之前，有必要先介绍一下 PowerShell。PowerShell 是一个任务自动化和配置管理框架、一个命令行 Shell 和一种脚本语言。我们可能会将其比作我们在 Linux 部分介绍的 Shell 脚本。PowerShell 最初主要用于 Windows 操作系统，但现在它是跨平台的。

Azure PowerShell is a set of cmdlets for managing Azure resources directly from the PowerShell command line.
Azure PowerShell 是一组 cmdlet，用于直接从 PowerShell 命令行管理 Azure 资源。

We can see below that you can connect to your subscription using the PowerShell command `Connect-AzAccount`
我们可以看到，您可以使用 PowerShell 命令 `Connect-AzAccount` 连接到您的订阅

![](Images/Day33_Cloud4.png)

Then if we wanted to find some specific commands associated with Azure VMs we can run the following command. You could spend hours learning and understanding more about this PowerShell programming language.
然后，如果我们想查找一些与 Azure VM 关联的特定命令，我们可以运行以下命令。您可以花费数小时来学习和理解有关这种 PowerShell 编程语言的更多内容。

![](Images/Day33_Cloud5.png)

There are some great quickstarts from Microsoft on getting started and provisioning services from PowerShell [here](https://docs.microsoft.com/en-us/powershell/azure/get-started-azureps?view=azps-7.1.0)
Microsoft 提供了一些关于如何开始使用 PowerShell 配置服务的优秀快速入门指南，请点击[此处](https://docs.microsoft.com/en-us/powershell/azure/get-started-azureps?view=azps-7.1.0)

### Visual Studio Code

Like many, and as you have all seen my go-to IDE is Visual Studio Code.
和许多人一样，我的首选 IDE 是 Visual Studio Code，这一点你们都看到了。

Visual Studio Code is a free source-code editor made by Microsoft for Windows, Linux and macOS.
Visual Studio Code 是 Microsoft 针对 Windows、Linux 和 macOS 制作的一款免费源代码编辑器。

You will see below that there are lots of integrations and tools built into Visual Studio Code that you can use to interact with Microsoft Azure and the services within.
您将在下面看到，Visual Studio Code 中内置了许多集成和工具，可用于与 Microsoft Azure 及其内部服务进行交互。

![](Images/Day33_Cloud6.png)

### Cloud Shell

Azure Cloud Shell is an interactive, authenticated, browser-accessible shell for managing Azure resources. It provides the flexibility of choosing the shell experience that best suits the way you work.
Azure Cloud Shell 是一个交互式的、经过身份验证的、可通过浏览器访问的 Shell，用于管理 Azure 资源。它提供了灵活的选择，让您能够选取最适合您工作方式的 Shell 体验。

![](Images/Day33_Cloud7.png)

You can see from the below when we first launch Cloud Shell within the portal we can choose between Bash and PowerShell.
您可以从下图中看到，当我们首次在门户中启动 Cloud Shell 时，我们可以在 Bash 和 PowerShell 之间进行选择。

![](Images/Day33_Cloud8.png)

To use the cloud shell you will have to provide a bit of storage in your subscription.
要使用云 Shell，您必须在订阅中提供一些存储空间。

When you select to use the cloud shell it is spinning up a machine, these machines are temporary but your files are persisted in two ways; through a disk image and a mounted file share.
当您选择使用云 Shell 时，它会启动一台机器，这些机器是临时的，但您的文件会通过两种方式持久保存：通过磁盘映像和挂载的文件共享。

![](Images/Day33_Cloud9.png)

- Cloud Shell runs on a temporary host provided on a per-session, per-user basis
- Cloud Shell 在按会话、按用户提供的临时主机上运行
- Cloud Shell times out after 20 minutes without interactive activity
- 如果 20 分钟没有交互式活动，Cloud Shell 将超时
- Cloud Shell requires an Azure file share to be mounted
- Cloud Shell 需要挂载 Azure 文件共享
- Cloud Shell uses the same Azure file share for both Bash and PowerShell
- Cloud Shell 对 Bash 和 PowerShell 使用相同的 Azure 文件共享
- Cloud Shell is assigned one machine per user account
- 每个用户帐户分配一台 Cloud Shell 机器
- Cloud Shell persists $HOME using a 5-GB image held in your file share
- Cloud Shell 使用文件共享中保存的 5GB 映像来持久保存 $HOME
- Permissions are set as a regular Linux user in Bash
- 权限设置为 Bash 中的常规 Linux 用户

The above was copied from [Cloud Shell Overview](https://docs.microsoft.com/en-us/azure/cloud-shell/overview)
以上内容复制自 [Cloud Shell 概述](https://docs.microsoft.com/en-us/azure/cloud-shell/overview)

### Azure CLI

Finally, I want to cover the Azure CLI, The Azure CLI can be installed on Windows, Linux and macOS. Once installed you can type `az` followed by other commands to create, update, delete and view Azure resources.
最后，我想介绍一下 Azure CLI，Azure CLI 可以安装在 Windows、Linux 和 macOS 上。安装后，您可以键入 `az`，后跟其他命令来创建、更新、删除和查看 Azure 资源。

When I initially came into my Azure learning I was a little confused by there being Azure PowerShell and the Azure CLI.
当我最初开始学习 Azure 时，我对 Azure PowerShell 和 Azure CLI 的存在感到有些困惑。

I would love some feedback from the community on this as well. But the way I see it is that Azure PowerShell is a module added to Windows PowerShell or PowerShell Core (Also available on other OS but not all) Whereas Azure CLI is a cross-platform command-line program that connects to Azure and executes those commands.
我也很希望社区能就此提供一些反馈。但在我看来，Azure PowerShell 是添加到 Windows PowerShell 或 PowerShell Core 的模块（也适用于其他操作系统，但并非全部），而 Azure CLI 是一个跨平台的命令行程序，用于连接到 Azure 并执行这些命令。

Both of these options have a different syntax, although they can from what I can see and what I have done do very similar tasks.
这两个选项的语法不同，尽管根据我的观察和实践，它们可以完成非常相似的任务。

For example, creating a virtual machine from PowerShell would use the `New-AzVM` cmdlet whereas Azure CLI would use `az VM create`.
例如，从 PowerShell 创建虚拟机将使用 `New-AzVM` cmdlet，而 Azure CLI 将使用 `az VM create`。

You saw previously that I have the Azure PowerShell module installed on my system but then I also have the Azure CLI installed that can be called through PowerShell on my Windows machine.
您之前看到我的系统上安装了 Azure PowerShell 模块，但我也安装了 Azure CLI，可以通过 Windows 计算机上的 PowerShell 调用它。

![](Images/Day33_Cloud10.png)

The takeaway here as we already mentioned is about choosing the right tool. Azure runs on automation. Every action you take inside the portal translates somewhere to code being executed to read, create, modify, or delete resources.
正如我们已经提到的，这里的关键是选择正确的工具。Azure 依赖于自动化。您在门户中执行的每个操作都会转化为某处执行的代码，用于读取、创建、修改或删除资源。

Azure CLI

- Cross-platform command-line interface, installable on Windows, macOS, Linux
- 跨平台命令行界面，可安装在 Windows, macOS, Linux 上
- Runs in Windows PowerShell, Cmd, Bash and other Unix shells.
- 在 Windows PowerShell, Cmd, Bash 和其他 Unix Shell 中运行。

Azure PowerShell

- Cross-platform PowerShell module, runs on Windows, macOS, Linux
- 跨平台 PowerShell 模块，可在 Windows, macOS, Linux 上运行
- Requires Windows PowerShell or PowerShell
- 需要 Windows PowerShell 或 PowerShell

If there is a reason you cannot use PowerShell in your environment but you can use .mdor bash then the Azure CLI is going to be your choice.
如果您的环境中出于某种原因无法使用 PowerShell，但可以使用 Bash，那么 Azure CLI 将是您的选择。

Next up we take all the theories we have been through and create some scenarios and get hands-on in Azure.
接下来，我们将把我们所学的理论知识付诸实践，创建一些场景并在 Azure 中进行动手操作。

## Resources

- [Hybrid Cloud and MultiCloud](https://www.youtube.com/watch?v=qkj5W98Xdvw)
- [Microsoft Azure Fundamentals](https://www.youtube.com/watch?v=NKEFWyqJ5XA&list=WL&index=130&t=12s)
- [Google Cloud Digital Leader Certification Course](https://www.youtube.com/watch?v=UGRDM86MBIQ&list=WL&index=131&t=10s)
- [AWS Basics for Beginners - Full Course](https://www.youtube.com/watch?v=ulprqHHWlng&t=5352s)

See you on [Day 34](day34.md)