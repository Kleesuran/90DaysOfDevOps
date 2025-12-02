---
title: '#90DaysOfDevOps - Ansible: Getting Started - Day 64'
published: false
description: '90DaysOfDevOps - Ansible: Getting Started'
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048765
---

## Ansible: Getting Started

We covered a little about what Ansible is in the [big picture session yesterday](day63.md) But we are going to get started with a little more information on top of that here.
在[昨天的宏观概述会议中](day63.md)，我们简要介绍了 Ansible 是什么。但在这里，我们将在此基础上提供更多信息，开始我们的学习之旅。
Firstly Ansible comes from RedHat. Secondly, it is agentless, connects via SSH and runs commands. Thirdly it is cross-platform (Linux & macOS, WSL2) and open-source (there is also a paid-for enterprise option) Ansible pushes configuration vs other models.
首先，Ansible 来自 RedHat。其次，它是无代理的（agentless），通过 SSH 连接并运行命令。第三，它是跨平台的（Linux、macOS、WSL2）和开源的（也有付费的企业版选项）。Ansible 采用的是配置推送模型（push configuration），而非其他模型。

### Ansible Installation

As you might imagine, RedHat and the Ansible team have done a fantastic job of documenting Ansible. This generally starts with the installation steps which you can find [here](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) Remember we said that Ansible is an agentless automation tool, the tool is deployed to a system referred to as a "Control Node" from this control node is manages machines and other devices (possibly network) over SSH.
正如你所预料的那样，RedHat 和 Ansible 团队在编写 Ansible 文档方面做得非常出色。这些文档通常从安装步骤开始，你可以在[此处](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)找到。请记住，我们说过 Ansible 是一种无代理的自动化工具，该工具部署在一个被称为“控制节点”（Control Node）的系统上，并从该控制节点通过 SSH 管理机器和其他设备（可能是网络设备）。

It does state in the above-linked documentation that the Windows OS cannot be used as the control node.
在上面链接的文档中确实提到，Windows 操作系统不能用作控制节点。

For my control node and at least this demo, I am going to use the Linux VM we created way back in the [Linux section](day20.md) as my control node.
对于我的控制节点以及至少本次演示，我将使用我们在[Linux 部分](day20.md)创建的 Linux 虚拟机作为控制节点。

This system was running Ubuntu and the installation steps simply need the following commands.
该系统运行的是 Ubuntu，安装步骤只需要以下命令。

```Shell
sudo apt update
sudo apt install software-properties-common
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt install ansible
```

Now we should have ansible installed on our control node, you can check this by running `ansible --version` and you should see something similar to this below.
现在我们的控制节点上应该安装了 Ansible，你可以通过运行 `ansible --version` 来检查，结果应该与下面类似。

![](Images/Day64_config1.png)

Before we then start to look at controlling other nodes in our environment, we can also check the functionality of ansible by running a command against our local machine `ansible localhost -m ping` will use an [Ansible Module](https://docs.ansible.com/ansible/2.9/user_guide/modules_intro.html) and this is a quick way to perform a single task across many different systems. I mean it is not much fun with just the local host but imagines you wanted to get something or make sure all your systems were up and you had 1000+ servers and devices.
在我们开始研究如何控制环境中的其他节点之前，我们还可以通过对本地机器运行命令来检查 Ansible 的功能：`ansible localhost -m ping` 将使用一个 [Ansible 模块](https://docs.ansible.com/ansible/2.9/user_guide/modules_intro.html)，这是在许多不同系统上执行单个任务的快捷方法。当然，只使用本地主机并没有多大乐趣，但想象一下，如果你想获取某些信息或确保所有系统都处于运行状态，而你拥有 1000 多个服务器和设备时，这就会很有用。

![](Images/Day64_config2.png)

Or an actual real-life use for a module might be something like `ansible webservers -m service -a "name=httpd state=started"` this will tell us if all of our webservers have the httpd service running. I have glossed over the webservers term used in that command.
模块的实际真实用途可能是类似于 `ansible webservers -m service -a "name=httpd state=started"` 这样的命令，它会告诉我们所有 web 服务器是否都在运行 httpd 服务。我在这条命令中简单地带过了 “webservers” 这个术语。

### hosts

The way I used localhost above to run a simple ping module against the system, I cannot specify another machine on my network, for example in the environment I am using my Windows host where VirtualBox is running has a network adapter with the IP 10.0.0.1 but you can see below that I can reach by pinging but I cannot use ansible to perform that task.
正如我上面使用 localhost 对系统运行简单的 ping 模块的方式一样，我无法指定网络上的其他机器。例如，在我使用的环境中，运行 VirtualBox 的 Windows 主机有一个 IP 地址为 10.0.0.1 的网络适配器。你可以在下面看到我可以通过 ping 访问它，但我不能使用 Ansible 来执行该任务。

![](Images/Day64_config3.png)

For us to specify our hosts or the nodes that we want to automate with these tasks, we need to define them. We can define them by navigating to the `/etc/ansible` directory on your system.
为了指定我们的主机（hosts）或我们想要通过这些任务实现自动化的节点，我们需要定义它们。我们可以通过导航到系统上的 `/etc/ansible` 目录来定义它们。

![](Images/Day64_config4.png)

The file we want to edit is the host's file, using a text editor we can jump in and define our hosts. The host file contains lots of great instructions on how to use and modify the file. We want to scroll down to the bottom and we are going to create a new group called `[windows]` and we are going to add our `10.0.0.1` IP address for that host. Save the file.
我们想要编辑的文件是 hosts 文件，使用文本编辑器我们可以进入并定义我们的主机。hosts 文件包含许多关于如何使用和修改该文件的优秀说明。我们需要向下滚动到文件底部，创建一个名为 `[windows]` 的新组，并添加该主机的 IP 地址 `10.0.0.1`。保存文件。

![](Images/Day64_config5.png)

However, remember I said you will need to have SSH available to enable Ansible to connect to your system. As you can see below when I run `ansible windows -m ping` we get an unreachable because things failed to connect via SSH.
然而，请记住我说过你需要启用 SSH，这样 Ansible 才能连接到你的系统。正如你在下面看到的，当我运行 `ansible windows -m ping` 时，我们得到了一个不可达（unreachable）的错误，因为通过 SSH 连接失败了。

![](Images/Day64_config6.png)

I have now also started adding some additional hosts to our inventory, another name for this file as this is where you are going to define all of your devices, could be network devices, switches and routers for example also would be added here and grouped.
我现在也开始在我们的清单（inventory）中添加一些额外的主机。这个文件也被称为清单文件，因为你将在这里定义所有的设备，例如网络设备、交换机和路由器也会被添加到这里并进行分组。
In our hosts file though I have also added my credentials for accessing the Linux group of systems.
不过，在我们的 hosts 文件中，我也添加了访问 Linux 系统组的凭据。

![](Images/Day64_config7.png)

Now if we run `ansible Linux -m ping` we get success as per below.
现在，如果运行 `ansible Linux -m ping`，我们会得到成功的结果，如下所示。

![](Images/Day64_config8.png)

We then have the node requirements, these are the target systems you wish to automate the configuration on. We are not installing anything for Ansible on these (I mean we might be installing software but there is no client from Ansible we need) Ansible will make a connection over SSH and send anything over SFTP.
接下来是节点要求，这些是你希望在其上自动执行配置的目标系统。我们不需要在这些系统上安装任何 Ansible 的东西（我的意思是，我们可能会安装软件，但不需要 Ansible 的客户端）。Ansible 将通过 SSH 建立连接，并通过 SFTP 传输任何东西。
(If you so desire though and you have SSH configured you could use SCP vs SFTP.)
（不过，如果你愿意并且配置了 SSH，你可以使用 SCP 而不是 SFTP。）

### Ansible Commands

You saw that we were able to run `ansible Linux -m ping` against our Linux machine and get a response, basically, with Ansible we can run many ad-hoc commands.
你看到我们能够对我们的 Linux 机器运行 `ansible Linux -m ping` 并得到响应，基本上，使用 Ansible 我们可以运行许多临时命令（ad-hoc commands）。
But you can run this against a group of systems and get that information back. [ad hoc commands](https://docs.ansible.com/ansible/latest/user_guide/intro_adhoc.html)
但你可以针对一组系统运行此命令并获取信息。[临时命令（ad hoc commands）](https://docs.ansible.com/ansible/latest/user_guide/intro_adhoc.html)
If you find yourself repeating commands or even worse you are having to log into individual systems to run these commands then Ansible can help there.
如果你发现自己正在重复执行命令，或者更糟的是，你必须登录到单独的系统来运行这些命令，那么 Ansible 就可以提供帮助。
For example, the simple command below would give us the output of all the operating system details for all of the systems we add to our Linux group.
例如，下面的简单命令将为我们提供添加到 Linux 组中的所有系统的操作系统详细信息输出。
`ansible linux -a "cat /etc/os-release"`
`ansible linux -a "cat /etc/os-release"`

Other use cases could be to reboot systems, copy files, and manage packers and users. You can also couple ad hoc commands with Ansible modules.
其他用例可能包括重启系统、复制文件以及管理软件包和用户。你还可以将临时命令与 Ansible 模块结合使用。
Ad hoc commands use a declarative model, calculating and executing the actions required to reach a specified final state. They achieve a form of idempotence by checking the current state before they begin and doing nothing unless the current state is different from the specified final state.
临时命令使用声明式模型，计算并执行到达指定最终状态所需的动作。它们通过在开始之前检查当前状态来实现某种形式的幂等性（idempotence），除非当前状态与指定的最终状态不同，否则不会执行任何操作。

## Resources

- [What is Ansible](https://www.youtube.com/watch?v=1id6ERvfozo)
- [Ansible 101 - Episode 1 - Introduction to Ansible](https://www.youtube.com/watch?v=goclfp6a2IQ)
- [NetworkChuck - You need to learn Ansible right now!](https://www.youtube.com/watch?v=5hycyr-8EKs&t=955s)

See you on [Day 65](day65.md)
[第 65 天](day65.md)见
