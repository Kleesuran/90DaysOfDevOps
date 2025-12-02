---
title: '#90DaysOfDevOps - Building our Lab - Day 26'
published: false
description: 90DaysOfDevOps - Building our Lab
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048762
---

## Building our Lab

We are going to continue our setup of our emulated network using EVE-NG and then hopefully get some devices deployed and start thinking about how we can automate the configuration of these devices.
我们将继续使用 EVE-NG 来设置我们的仿真网络，然后希望能部署一些设备，并开始思考如何实现这些设备的配置自动化。
On [Day 25](day25.md) we covered the installation of EVE-NG onto our machine using VMware Workstation.
在 [第 25 天](day25.md) 中，我们介绍了使用 VMware Workstation 在我们的机器上安装 EVE-NG 的过程。

### Installing EVE-NG Client

There is also a client pack that allows us to choose which application is used when we SSH to the devices.
还有一个客户端包，允许我们选择通过 SSH 连接到设备时使用的应用程序。
It will also set up Wireshark for packet captures between links.
它还会设置 Wireshark，用于捕获链接之间的网络数据包。
You can grab the client pack for your OS (Windows, macOS, Linux).
您可以下载适用于您的操作系统的客户端包（Windows, macOS, Linux）。

[EVE-NG Client Download](https://www.eve-ng.net/index.php/download/)

![](Images/Day26_Networking1.png)

Quick Tip: If you are using Linux as your client then there is this [client pack](https://github.com/SmartFinn/eve-ng-integration).
快速提示：如果您使用 Linux 作为客户端，那么可以使用这个 [客户端包](https://github.com/SmartFinn/eve-ng-integration)。

The install is straightforward next, next and I would suggest leaving the defaults.
安装过程很简单，下一步、下一步即可，我建议保留默认设置。

### Obtaining network images

This step has been a challenge, I have followed some videos that I will link at the end that links to some resources and downloads for our router and switch images whilst telling us how and where to upload them.
这一步一直很有挑战性，我参考了一些视频（我会在末尾附上链接），这些视频链接到我们路由器和交换机镜像的一些资源和下载地址，并告诉我们如何以及将它们上传到哪里。

It is important to note that I using everything for education purposes.
需要注意的是，我所使用的一切都仅用于教育目的。
I would suggest downloading official images from network vendors.
我建议从网络供应商处下载官方镜像。

[Blog & Links to YouTube videos](https://loopedback.com/2019/11/15/setting-up-eve-ng-for-ccna-ccnp-ccie-level-studies-includes-multiple-vendor-node-support-an-absolutely-amazing-study-tool-to-check-out-asap/)

[How To Add Cisco VIRL vIOS image to Eve-ng](https://networkhunt.com/how-to-add-cisco-virl-vios-image-to-eve-ng/)

Overall the steps here are a little complicated and could be much easier but the above blogs and videos walk through the process of adding the images to your EVE-NG box.
总的来说，这里的步骤有点复杂，本可以更简单，但上面的博客和视频详细介绍了将镜像添加到您的 EVE-NG 设备中的过程。

I used FileZilla to transfer the qcow2 to the VM over SFTP.
我使用 FileZilla 通过 SFTP 将 qcow2 文件传输到了虚拟机。

For our lab, we need Cisco vIOS L2 (switches) and Cisco vIOS (router)
对于我们的实验，我们需要 Cisco vIOS L2（交换机）和 Cisco vIOS（路由器）

### Create a Lab

Inside the EVE-NG web interface, we are going to create our new network topology.
在 EVE-NG Web 界面内，我们将创建新的网络拓扑结构。
We will have four switches and one router that will act as our gateway to outside networks.
我们将有四个交换机和一个充当我们通往外部网络网关的路由器。

| Node | IP Address |
| ------- | ------------ |
| Router | 10.10.88.110 |
| Switch1 | 10.10.88.111 |
| Switch2 | 10.10.88.112 |
| Switch3 | 10.10.88.113 |
| Switch4 | 10.10.88.114 |

#### Adding our Nodes to EVE-NG

When you first log in to EVE-NG you will see a screen like the below, we want to start by creating our first lab.
当您首次登录 EVE-NG 时，您会看到如下所示的屏幕，我们要做的第一件事是创建我们的第一个实验。

![](Images/Day26_Networking2.png)

Give your lab a name and the other fields are optional.
给您的实验命名，其他字段是可选的。

![](Images/Day26_Networking3.png)

You will be then greeted with a blank canvas to start creating your network. Right-click on your canvas and choose add node.
然后，您会看到一个空白画布，可以开始创建您的网络。右键单击画布，选择“添加节点”（add node）。

From here you will have a long list of node options, If you have followed along above you will have the two in blue shown below and the others are going to be grey and unselectable.
从这里您会看到一个长长的节点选项列表，如果您按照上面的步骤操作，您将拥有下面显示的两个蓝色节点选项，而其他节点将是灰色且无法选择的。

![](Images/Day26_Networking4.png)

We want to add the following to our lab:
我们希望在实验中添加以下内容：

- 1 x Cisco vIOS Router
- 1 x Cisco vIOS 路由器
- 4 x Cisco vIOS Switch
- 4 x Cisco vIOS 交换机

Run through the simple wizard to add them to your lab and it should look something like this.
通过简单的向导将它们添加到您的实验中，它看起来应该像这样。

![](Images/Day26_Networking5.png)

#### Connecting our nodes

We now need to add our connectivity between our routers and switches.
现在我们需要添加路由器和交换机之间的连接。
We can do this quite easily by hovering over the device and seeing the connection icon as per below and then connecting that to the device we wish to connect to.
我们可以很容易地做到这一点，只需将鼠标悬停在设备上，看到如下所示的连接图标，然后将其连接到我们想要连接的设备即可。

![](Images/Day26_Networking6.png)

When you have finished connecting your environment you may also want to add some way to define physical boundaries or locations using boxes or circles which can also be found in the right-click menu.
当您完成环境连接后，您可能还想使用方框或圆形来定义物理边界或位置，这些也可以在右键菜单中找到。
You can also add text which is useful when we want to define our naming or IP addresses in our labs.
您还可以添加文本，这在我们想要在实验中定义命名或 IP 地址时很有用。

I went ahead and made my lab look like the below.
我继续操作，让我的实验看起来像下面这样。

![](Images/Day26_Networking7.png)

You will also notice that the lab above is all powered off, we can start our lab by selecting everything and right-clicking and selecting start selected.
您还会注意到上面的实验都是断电的，我们可以通过选择所有内容，然后右键单击并选择“启动所选”（start selected）来启动我们的实验。

![](Images/Day26_Networking8.png)

Once we have our lab up and running you will be able to console into each device and you will notice at this stage they are pretty dumb with no configuration.
一旦我们的实验启动并运行，您将能够连接到每个设备进行控制台操作，您会注意到在这个阶段，它们非常简单，没有任何配置。
We can add some configuration to each node by copying or creating your own in each terminal.
我们可以通过在每个终端中复制或创建自己的配置来为每个节点添加配置。

I will leave my configuration in the Networking folder of the repository for reference.
我将把我的配置留在仓库的 Networking 文件夹中以供参考。

| Node | Configuration |
| ------- | --------------------- |
| Router | [R1](Networking/R1) |
| Switch1 | [SW1](Networking/SW1) |
| Switch2 | [SW2](Networking/SW2) |
| Switch3 | [SW3](Networking/SW3) |
| Switch4 | [SW4](Networking/SW4) |

## Resources

- [Free Course: Introduction to EVE-NG](https://www.youtube.com/watch?v=g6B0f_E0NMg)
- [EVE-NG - Creating your first lab](https://www.youtube.com/watch?v=9dPWARirtK8)
- [3 Necessary Skills for Network Automation](https://www.youtube.com/watch?v=KhiJ7Fu9kKA&list=WL&index=122&t=89s)
- [Computer Networking full course](https://www.youtube.com/watch?v=IPvYjXCsTg8)
- [Practical Networking](http://www.practicalnetworking.net/)
- [Python Network Automation](https://www.youtube.com/watch?v=xKPzLplPECU&list=WL&index=126)

Most of the examples I am using here as I am not a Network Engineer have come from this extensive book which is not free but I am using some of the scenarios to help understand Network Automation.
我在这里使用的大多数示例都来自于这本内容丰富的书籍，它不是免费的，但我正在使用其中的一些场景来帮助理解网络自动化（因为我不是网络工程师）。

- [Hands-On Enterprise Automation with Python (Book)](https://www.packtpub.com/product/hands-on-enterprise-automation-with-python/9781788998512)

See you on [Day 27](day27.md)
第 [27 天](day27.md) 见
