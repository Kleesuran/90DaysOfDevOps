---
title: '#90DaysOfDevOps - The Big Picture: DevOps and Linux - Day 14'
published: false
description: 90DaysOfDevOps - The Big Picture DevOps and Linux
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049033
---

## The Big Picture: DevOps and Linux

Linux and DevOps share very similar cultures and perspectives; both are focused on customization and scalability.
Linux 和 DevOps 拥有非常相似的文化和理念；两者都专注于定制化和可扩展性。
Both of these aspects of Linux are of particular importance for DevOps.
Linux 的这两个方面对于 DevOps 来说尤为重要。

A lot of technologies start on Linux, especially if they are related to software development or managing infrastructure.
许多技术都始于 Linux，尤其是那些与软件开发或基础设施管理相关的技术。

As well lots of open source projects, especially DevOps tools, were designed to run on Linux from the start.
同样，许多开源项目，尤其是 DevOps 工具，从一开始就被设计为在 Linux 上运行。

From a DevOps perspective or any operations role perspective, you are going to come across Linux I would say mostly.
从 DevOps 或任何运维角色的角度来看，我敢说你将主要接触 Linux。
There is a place for WinOps but the majority of the time you are going to be administering and deploying Linux servers.
WinOps（Windows 运维）也有其一席之地，但在大多数情况下，你将管理和部署 Linux 服务器。

I have been using Linux daily for several years but my go to desktop machine has always been either macOS or Windows.
几年来我每天都在使用 Linux，但我首选的桌面机一直是 macOS 或 Windows。
However, when I moved into the Cloud Native role I am in now I took the plunge to make sure that my laptop was fully Linux based and my daily driver, whilst I still needed Windows for work-based applications and a lot of my audio and video gear does not run on Linux I was forcing myself to run a Linux desktop full time to get a better grasp of a lot of the things we are going to touch on over the next 7 days.
然而，当我转到现在所处的云原生角色时，我毅然决定确保我的笔记本电脑完全基于 Linux 并作为我的日常主力设备。虽然我仍然需要 Windows 来运行工作应用，而且我的许多音频和视频设备不支持 Linux，但我还是强迫自己全职运行 Linux 桌面，以便更好地掌握我们将在接下来的 7 天内涉及的许多内容。

## Getting Started

I am not suggesting you do the same as me by any stretch as there are easier options which are less destructive but I will say that taking that full-time step forces you to learn faster how to make things work on Linux.
我绝不建议你也像我这样做，因为有更容易、破坏性更小的选择，但我会说，迈出全职使用这一步会迫使你更快地学习如何在 Linux 上解决问题。

For the majority of these 7 days, I am going to deploy a Virtual Machine in Virtual Box on my Windows machine.
在接下来的这 7 天里，我大部分时间都会在我的 Windows 机器上的 Virtual Box 中部署一个虚拟机。
I am also going to deploy a desktop version of a Linux distribution, whereas a lot of the Linux servers you will be administering will likely be servers that come with no GUI and everything is shell-based.
我还将部署一个桌面版的 Linux 发行版，然而，你将管理的大多数 Linux 服务器很可能是不带 GUI 且完全基于 Shell 的服务器。
However, as I said at the start a lot of the tools that we covered throughout this whole 90 days started on Linux I would also strongly encourage you to dive into running that Linux Desktop for that learning experience as well.
然而，正如我一开始所说，我们在整个 90 天内介绍的许多工具都始于 Linux，我也会强烈鼓励你尝试运行 Linux 桌面，以获得这种学习体验。

For the rest of this post, we are going to concentrate on getting a Ubuntu Desktop virtual machine up and running in our Virtual Box environment.
在本文的其余部分，我们将专注于在我们的 Virtual Box 环境中启动并运行一个 Ubuntu 桌面虚拟机。
Now we could just download [Virtual Box](https://www.virtualbox.org/) and grab the latest [Ubuntu ISO](https://ubuntu.com/download) from the sites linked and go ahead and build out our desktop environment but that wouldn't be very DevOps of us, would it?
现在我们可以直接下载 [Virtual Box](https://www.virtualbox.org/)，从链接的站点获取最新的 [Ubuntu ISO](https://ubuntu.com/download)，然后开始构建我们的桌面环境，但这似乎不太符合 DevOps 的精神，是吧？

Another good reason to use most Linux distributions is that they are free and open-source.
使用大多数 Linux 发行版的另一个好理由是它们是免费和开源的。
We are also choosing Ubuntu as it is probably the most widely used distribution deployed not thinking about mobile devices and enterprise RedHat Enterprise servers.
我们选择 Ubuntu 是因为它可能是部署最广泛的发行版（不考虑移动设备和企业 RedHat Enterprise 服务器）。
I might be wrong there but with CentOS and the history there I bet Ubuntu is high on the list and it's super simple.
我可能说得不对，但考虑到 CentOS 及其历史，我敢打赌 Ubuntu 在列表中排名很高，而且它超级简单。

## Introducing HashiCorp Vagrant

Vagrant is a CLI utility that manages the lifecycle of your virtual machines.
Vagrant 是一个 CLI 实用程序，用于管理虚拟机的生命周期。
We can use vagrant to spin up and down virtual machines across many different platforms including vSphere, Hyper-v, Virtual Box and also Docker.
我们可以使用 Vagrant 在许多不同的平台（包括 vSphere、Hyper-v、Virtual Box 以及 Docker）上启动和关闭虚拟机。
It does have other providers but we will stick with Virtual Box here so we are good to go.
它确实还有其他提供商，但我们在这里将使用 Virtual Box，这样就足够了。

The first thing we need to do is get Vagrant installed on our machine, when you go to the downloads page you will see all the operating systems listed for your choice.
我们需要做的第一件事是在我们的机器上安装 Vagrant，当你访问下载页面时，你会看到所有可供选择的操作系统。
[HashiCorp Vagrant](https://www.vagrantup.com/downloads) I am using Windows so I grabbed the binary for my system and went ahead and installed this on my system.
[HashiCorp Vagrant](https://www.vagrantup.com/downloads) 我使用的是 Windows，所以我下载了适用于我系统的二进制文件并将其安装到我的系统上。

Next up we also need to get [Virtual Box](https://www.virtualbox.org/wiki/Downloads) installed.
接下来，我们还需要安装 [Virtual Box](https://www.virtualbox.org/wiki/Downloads)。
Again, this can also be installed on many different operating systems and a good reason to choose this and vagrant is that if you are running Windows, macOS, or Linux then we have you covered here.
同样，它也可以安装在许多不同的操作系统上，选择它和 Vagrant 的一个好理由是，无论你运行的是 Windows、macOS 还是 Linux，我们都能满足你的需求。

Both installations are pretty straightforward and both have great communitites around them so feel free to reach out if you have issues and I can try and assist too.
这两种安装都非常简单直接，并且它们都有很棒的社区支持，因此如果你遇到问题，请随时联系，我也可以尝试提供帮助。

> If you are using m1 macOS, I recommend to use [multiplass]([url](https://multipass.run/)) instead of Vagrant and VirtualBox. (reference : https://github.com/MichaelCade/90DaysOfDevOps/issues/365)

## Our first VAGRANTFILE

The VAGRANTFILE describes the type of machine we want to deploy.
VAGRANTFILE 描述了我们想要部署的机器类型。
It also defines the configuration and provisioning for this machine.
它还定义了该机器的配置和配置过程（provisioning）。

When it comes to saving these and organizing your VAGRANTFILEs I tend to put them in their folders in my workspace.
在保存和组织 VAGRANTFILE 时，我通常将它们放在工作区中的单独文件夹中。
You can see below how this looks on my system.
你可以在下面看到这在我的系统上是什么样子的。
Hopefully following this you will play around with Vagrant and see the ease of spinning up different systems, it is also great for that rabbit hole known as distro hopping for Linux Desktops.
希望通过接下来的操作，你能够试用 Vagrant，并看到启动不同系统是多么容易，这对于 Linux 桌面用户来说，也为“发行版跳跃”（distro hopping）这个兔子洞提供了便利。

![](Images/Day14_Linux1.png)

Let's take a look at that VAGRANTFILE and see what we are building.
让我们来看看这个 VAGRANTFILE，看看我们正在构建什么。

```
Vagrant.configure("2") do |config|

  config.vm.box = "chenhan/ubuntu-desktop-20.04"

  config.vm.provider :virtualbox do |v|

   v.memory  = 8096

   v.cpus    = 4

   v.customize ["modifyvm", :id, "--vram", "128"]

end

end
```

This is a very simple VAGRANTFILE overall.
总体而言，这是一个非常简单的 VAGRANTFILE。
We are saying that we want a specific "box", a box being possibly either a public image or private build of the system you are looking for.
我们指定需要一个特定的 “box”（盒子），这个 box 可能是你正在寻找的系统的公共镜像或私人构建版本。
You can find a long list of "boxes" publicly available here in the [public catalogue of Vagrant boxes](https://app.vagrantup.com/boxes/search)
你可以在 [Vagrant box 公共目录](https://app.vagrantup.com/boxes/search) 中找到大量公开可用的 “box”。

Next line we're saying that we want to use a specific provider and in this case it's `VirtualBox`.
下一行我们说我们想要使用一个特定的提供商，在本例中它是 `VirtualBox`。
We also define our machine's memory to `8GB` and the number of CPUs to `4`.
我们还定义了机器的内存为 `8GB`，CPU 数量为 `4`。
My experience tells me that you may want to also add the following line if you experience display issues.
根据我的经验，如果你遇到显示问题，你可能还需要添加下面这一行。
This will set the video memory to what you want, I would ramp this right up to `128MB` but it depends on your system.
这将把显存设置为你想要的值，我通常会将其提高到 `128MB`，但这取决于你的系统。

```
v.customize ["modifyvm", :id, "--vram", ""]
```

I have also placed a copy of this specific vagrant file in the [Linux Folder](Linux/VAGRANTFILE)
我还将这个特定的 vagrant 文件的一个副本放在了 [Linux 文件夹](Linux/VAGRANTFILE) 中。

## Provisioning our Linux Desktop

We are now ready to get our first machine up and running, in our workstation's terminal.
现在，我们准备好在工作站的终端中启动并运行我们的第一台机器了。
In my case I am using PowerShell on my Windows machine.
在我的情况下，我在 Windows 机器上使用 PowerShell。
Navigate to your projects folder and where you will find your VAGRANTFILE.
导航到你的项目文件夹，在那里你会找到你的 VAGRANTFILE。
Once there you can type the command `vagrant up` and if everything's alright you will see something like this.
到达那里后，你可以输入命令 `vagrant up`，如果一切正常，你将看到类似下图的内容。

![](Images/Day14_Linux2.png)

Another thing to add here is that the network will be set to `NAT` on your virtual machine.
这里要补充一点，你的虚拟机的网络将被设置为 `NAT`。
At this stage we don't need to know about NAT and I plan to have a whole session talking about it in the Networking session.
在现阶段我们不需要了解 NAT，我计划在网络会议中专门用一整节来讨论它。
Know that it is the easy button when it comes to getting a machine on your home network, it is also the default networking mode on Virtual Box.
请记住，在将机器连接到家庭网络方面，它是最简单的选项（easy button），它也是 Virtual Box 上的默认网络模式。
You can find out more in the [Virtual Box documentation](https://www.virtualbox.org/manual/ch06.html#network_nat)
你可以在 [Virtual Box 文档](https://www.virtualbox.org/manual/ch06.html#network_nat) 中了解更多信息。

Once `vagrant up` is complete we can now use `vagrant ssh` to jump straight into the terminal of our new VM.
一旦 `vagrant up` 完成，我们现在可以使用 `vagrant ssh` 直接进入新 VM 的终端。

![](Images/Day14_Linux3.png)

This is where we will do most of our exploring over the next few days but I also want to dive into some customizations for your developer workstation that I have done and it makes your life much simpler when running this as your daily driver, and of course, are you really in DevOps unless you have a cool nonstandard terminal?
在接下来的几天里，我们将在这里进行大部分探索，但我也想深入探讨一些我已经完成的开发者工作站定制化内容，这些定制化在你将 Linux 作为日常主力设备时会让你的生活简单得多，当然了，除非你有一个炫酷的非标准终端，否则你真的算是从事 DevOps 吗？

But just to confirm in Virtual Box you should see the login prompt when you select your VM.
但为了确认，在 Virtual Box 中，当你选择你的 VM 时，你应该能看到登录提示符。

![](Images/Day14_Linux4.png)

Oh and if you made it this far and you have been asking "WHAT IS THE USERNAME & PASSWORD?"
哦，如果你已经读到这里并且一直在问“用户名和密码是什么？”

- Username = vagrant
- 用户名 = vagrant
- Password = vagrant
- 密码 = vagrant

Tomorrow we are going to get into some of the commands and what they do, The terminal is going to be the place to make everything happen.
明天我们将深入了解一些命令及其作用，终端将是实现一切的地方。

## Resources

- [Learn the Linux Fundamentals - Part 1](https://www.youtube.com/watch?v=kPylihJRG70)
- [学习 Linux 基础知识 - 第 1 部分](https://www.youtube.com/watch?v=kPylihJRG70)
- [Linux for hackers (don't worry you don't need to be a hacker!)](https://www.youtube.com/watch?v=VbEx7B_PTOE)
- [面向黑客的 Linux（别担心，你不必成为黑客！）](https://www.youtube.com/watch?v=VbEx7B_PTOE)

There are going to be lots of resources I find as we go through and much like the Go resources I am generally going to be keeping them to FREE content so we can all partake and learn here.
在接下来的过程中，我会找到很多资源，就像 Go 语言的资源一样，我通常会把它们限制在免费内容，以便我们都能参与进来学习。

As I mentioned next up we will take a look at the commands we might be using on a daily whilst in our Linux environments.
正如我所提到的，接下来我们将看看我们在 Linux 环境中日常可能会使用到的命令。

See you on [Day15](day15.md)
[Day15](day15.md) 见
