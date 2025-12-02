---
title: '#90DaysOfDevOps - The Big Picture: Containers - Day 42'
published: false
description: 90DaysOfDevOps - The Big Picture Containers
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048826
---

## The Big Picture: Containers

We are now starting the next section and this section is going to be focused on containers in particular we are going to be looking into Docker getting into some of the key areas to understand more about Containers.
我们现在开始下一部分，这部分将重点关注容器，特别是我们将研究 Docker，深入了解一些关键领域，以便更好地理解容器。

I will also be trying to get some hands-on here to create the container that we can use during this section but also in future sections later on in the challenge.
我也会尝试进行一些实践操作，创建我们可以在本节以及后续挑战中使用的容器。

As always this first post is going to be focused on the big picture of how we got here and what it all means.
像往常一样，第一篇文章将侧重于我们是如何发展到这个阶段以及这一切意味着什么的大局。

#History of platforms and application development
#do we want to talk about Virtualisation & Containerisation

### Why another way to run applications?

The first thing we have to take a look at is why do we need another way to run our software or applications?
我们首先需要探讨的是，为什么我们需要另一种方式来运行我们的软件或应用程序？
Well it is just that choice is great, we can run our applications in many different forms, we might see applications deployed on physical hardware with an operating system and a single application deployed there, and we might see the virtual machine or cloud-based IaaS instances running our application which then integrate into a database again in a VM or as PaaS offering in the public cloud.
嗯，仅仅是因为选择很棒，我们可以用许多不同的形式运行应用程序：我们可能会看到应用程序部署在具有操作系统和单个应用程序的物理硬件上；我们可能会看到虚拟机或基于云的 IaaS 实例运行我们的应用程序，然后集成到同样位于 VM 或作为公有云 PaaS 服务的数据库中。
Or we might see our applications running in containers.
或者，我们可能会看到应用程序运行在容器中。

None of the above options is wrong or right, but they each have their reasons to exist and I also strongly believe that none of these is going away.
以上选项都没有对错之分，但它们都有各自存在的理由，我也坚信这些选项都不会消失。
I have seen a lot of content that walks into Containers vs Virtual Machines and there really should not be an argument as that is more like apples vs pears argument where they are both fruit (ways to run our applications) but they are not the same.
我见过很多关于“容器 vs 虚拟机”的讨论内容，但这实际上不应该成为一个争论点，因为它更像是“苹果 vs 梨”的争论——它们都是水果（运行应用程序的方式），但它们并不相同。

I would also say that if you were starting and you were developing an application you should lean towards containers simply because we will get into some of these areas later, but it's about efficiency, speed and size.
我还会说，如果你刚开始开发应用程序，你应该倾向于使用容器，仅仅是因为（我们稍后会深入探讨这些领域）它关乎效率、速度和大小。
But that also comes with a price, if you have no idea about containers then it's going to be a learning curve to force yourself to understand the why and get into that mindset.
但那也伴随着代价，如果你对容器一无所知，那么你需要经历一段学习曲线，强迫自己理解其原因并接受这种思维模式。
If you have developed your applications a particular way or you are not in a greenfield environment then you might have more pain points to deal with before even considering containers.
如果你是以特定的方式开发应用程序，或者你不是在一个全新的（greenfield）环境中，那么在考虑容器之前，你可能需要处理更多的痛点。

We have many different choices then when it comes to downloading a given piece of software, there are a variety of different operating systems that we might be using.
因此，在下载特定软件时，我们有许多不同的选择，我们可能会使用各种不同的操作系统。
And specific instructions for what we need to do to install our applications.
并且需要遵循安装应用程序所需的具体说明。

![](Images/Day42_Containers1.png)

More and more recently I am finding that the applications we might have once needed a full server OS, A VM, Physical or cloud instance are now releasing container-based versions of their software.
最近，我发现越来越多过去可能需要完整的服务器操作系统、虚拟机、物理机或云实例的应用程序，现在正在发布基于容器的软件版本。
I find this interesting as this opens the world of containers and then Kubernetes to everyone and not just a focus on application developers.
我发现这很有趣，因为它向所有人开放了容器和 Kubernetes 的世界，而不仅仅是面向应用程序开发人员。

![](Images/Day42_Containers2.png)

As you can probably tell as I have said before, I am not going to advocate that the answer is containers, what's the question!
正如你可能知道的，正如我之前所说，我不会主张容器就是答案，那问题又是什么呢！
But I would like to discuss how this is another option for us to be aware of when we deploy our applications.
但我希望讨论的是，这是我们在部署应用程序时需要了解的另一种选择。

![](Images/Day42_Containers4.png)

We have had container technology for a long time, so why now over the last say 10 years has this become popular, I would say even more popular in the last 5.
我们拥有容器技术已经很长时间了，那么为什么在过去的 10 年里它变得流行起来，我认为在过去的 5 年里甚至更受欢迎。
We have had containers for decades.
我们拥有容器已经几十年了。
It comes down to the challenge of containers or should I say images as well, to how we distribute our software, because if we just have container technology, then we still will have many of the same problems we've had with software management.
这归结于容器（或者我应该说镜像）的挑战，以及我们如何分发软件，因为如果我们只有容器技术，那么我们仍然会遇到许多与软件管理相同的麻烦。

If we think about Docker as a tool, the reason that it took off, is because of the ecosystem of images that are easy to find and use.
如果我们把 Docker 视为一个工具，它之所以能够普及，是因为其镜像生态系统易于查找和使用。
Simple to get on your systems and get up and running.
它很容易在你的系统上安装并运行起来。
A major part of this is consistency across the entire space, of all these different challenges that we face with software.
其中一个主要部分是它在整个领域中提供的一致性，解决了我们在软件方面面临的所有这些不同挑战。
It doesn't matter if it's MongoDB or nodeJS, the process to get either of those up and running will be the same.
无论是 MongoDB 还是 nodeJS，让它们运行起来的过程都是相同的。
The process to stop either of those is the same.
停止它们中任何一个的过程也是相同的。
All of these issues will still exist, but the nice thing is, when we bring good container and image technology together, we now have a single set of tools to help us tackle all of these different problems.
所有这些问题仍然存在，但好处是，当我们把优秀的容器和镜像技术结合在一起时，我们现在拥有一套单一的工具来帮助我们解决所有这些不同的问题。
Some of those issues are listed below:
其中一些问题列在下面：

- We first have to find software on the internet.
- We then have to download this software.
- Do we trust the source?
- Do we then need a license? Which License?
- Is it compatible with different platforms?
- What is the package? binary? Executable? Package manager?
- How do we configure the software?
- Dependencies? Did the overall download have us covered or do we need them as well?
- Dependencies of Dependencies?
- How do we start the application?
- How do we stop the application?
- Will it auto-restart?
- Start on boot?
- Resource conflicts?
- Conflicting libraries?
- Port Conflicts
- Security for the software?
- Software updates?
- How can I remove the software?

We can split the above into 3 areas of the complexity of the software that containers and images do help with these.
我们可以将上述问题拆分为 3 个软件复杂性领域，容器和镜像确实有助于解决这些问题。

| Distribution | Installation  | Operation          |
| 分发 | 安装  | 运维          |
| ------------ | ------------- | ------------------ |
| Find         | Install       | Start              |
| 查找         | 安装          | 启动               |
| Download     | Configuration | Security           |
| 下载         | 配置          | 安全性             |
| License      | Uninstall     | Ports              |
| 许可         | 卸载          | 端口               |
| Package      | Dependencies  | Resource Conflicts |
| 打包         | 依赖关系      | 资源冲突           |
| Trust        | Platform      | Auto-Restart       |
| 信任         | 平台          | 自动重启           |
| Find         | Libraries     | Updates            |
| 查找         | 库文件        | 更新               |

Containers and images are going to help us remove some of these challenges that we have with possibly other software and applications.
容器和镜像将帮助我们消除在使用其他软件和应用程序时可能遇到的一些挑战。

At a high level we could move installation and operation into the same list, Images are going to help us from a distribution point of view and containers help with the installation and operations.
从宏观上看，我们可以将安装和操作归为同一类别。镜像将从分发的角度帮助我们，而容器有助于安装和操作。

Ok, probably sounds great and exciting but we still need to understand what is a container and now I have mentioned images so let's cover those areas next.
好的，这听起来可能很棒且令人兴奋，但我们仍然需要了解什么是容器，既然我已经提到了镜像，那么接下来让我们讨论这些领域。

Another thing you might have seen a lot when we talk about Containers for software development is the analogy used alongside shipping containers, shipping containers are used to ship various goods across the seas using large vessels.
当我们讨论用于软件开发的容器时，你可能经常看到另一个类比是集装箱（shipping containers），集装箱用于使用大型船只在海上运输各种货物。

![](Images/Day42_Containers5.png)

What does this have to do with our topic of containers?
这与我们讨论的容器主题有什么关系呢？
Think about the code that software developers write, how can we ship that particular code from one machine to another machine?
想想软件开发人员编写的代码，我们如何将这段特定的代码从一台机器运送到另一台机器呢？

If we think about what we touched on before about software distribution, installation and operations but now we start to build this out into an environment visual.
如果我们考虑之前提到的软件分发、安装和操作，但现在我们将其构建成一个环境的可视化图。
We have hardware and an operating system where you will run multiple applications.
我们有硬件和一个操作系统，你将在上面运行多个应用程序。
For example, nodejs has certain dependencies and needs certain libraries.
例如，nodejs 具有特定的依赖关系并需要特定的库。
If you then want to install MySQL then it needs its required libraries and dependencies.
如果你随后想安装 MySQL，那么它也需要其所需的库和依赖关系。
Each software application will have its library and dependency.
每个软件应用程序都会有自己的库和依赖项。
We might be massively lucky and not have any conflicts between any of our applications where specific libraries and dependencies are clashing causing issues but the more applications the more chance or risk of conflicts.
我们可能会非常幸运，应用程序之间没有任何冲突，即特定的库和依赖项不会相互冲突而导致问题，但应用程序越多，发生冲突的可能性或风险就越大。
However, this is not about that one deployment when everything fixes your software applications are going to be updated and then we can also introduce these conflicts.
然而，这并非关于一次性部署就能解决所有问题的。随着你的软件应用程序进行更新，我们仍然可能会引入这些冲突。

![](Images/Day42_Containers6.png)

Containers can help solve this problem.
容器可以帮助解决这个问题。
Containers help **build** your application, **ship** the application, **deploy** and **scale** these applications with ease independently.
容器有助于轻松独立地**构建**、**交付**、**部署**和**扩展**这些应用程序。
let's look at the architecture, you will have hardware and operating system then on top of it you will have a container engine like docker which we will cover later.
让我们看看这个架构：你将拥有硬件和操作系统，然后在上面将运行像 Docker 这样的容器引擎（我们稍后会介绍）。
The container engine software helps create containers that package the libraries and dependencies along with it so that you can move this container seamlessly from one machine to another machine without worrying about the libraries and dependencies since they come as a part of a package which is nothing but the container so you can have different containers this container can be moved across the systems without worrying about the underlying dependencies that the application
容器引擎软件有助于创建容器，将库和依赖项与其一起打包，以便你可以将此容器从一台机器无缝地移动到另一台机器，而无需担心库和依赖项，因为它们作为软件包的一部分（即容器）一同提供。因此，你可以拥有不同的容器，这些容器可以在系统之间移动，而无需担心应用程序运行所需的底层依赖关系。
needs to run because everything the application needs to run is packaged as
因为应用程序运行所需的一切都以容器的形式打包，
a container that you can move.
你可以随时移动它。

![](Images/Day42_Containers7.png)

### The advantages of these containers

- Containers help package all the dependencies within the container and
  isolate it.
- 容器有助于将所有依赖项打包在容器内并进行隔离。

- It is easy to manage the containers
- 容器易于管理。

- The ability to move from one system to another.
- 能够在不同系统之间移动。

- Containers help package the software and you can easily ship it without any duplicate efforts
- 容器有助于打包软件，你可以轻松交付它，无需任何重复工作。

- Containers are easily scalable.
- 容器易于扩展。

Using containers you can scale independent containers and use a load balancer
使用容器，你可以独立地扩展容器，并使用负载均衡器
or a service which helps split the traffic and you can scale the applications horizontally.
或服务来帮助拆分流量，从而水平扩展应用程序。
Containers offer a lot of flexibility and ease in how you manage your applications
容器在管理应用程序方面提供了极大的灵活性和便利性。

### What is a container?

When we run applications on our computer, this could be the web browser or VScode that you are using to read this post.
当我们在电脑上运行应用程序时，这可能是你用来阅读本文的网页浏览器或 VScode。
That application is running as a process or what is known as a process.
该应用程序作为一个进程（process）运行。
On our laptops or systems, we tend to run multiple applications or as we said processes.
在我们的笔记本电脑或系统上，我们通常会运行多个应用程序，或者如我们所说的进程。
When we open a new application or click on the application icon this is an application we would like to run, sometimes this application might be a service that we just want to run in the background, our operating system is full of services that are running in the background providing you with the user experience you get with your system.
当我们打开一个新的应用程序或点击应用程序图标时，这就是我们想要运行的应用程序；有时这个应用程序可能是一个我们只想在后台运行的服务，我们的操作系统充满了在后台运行的服务，为你提供你所获得的系统用户体验。

That application icon represents a link to an executable somewhere on your file system, the operating system then loads that executable into memory.
该应用程序图标代表着文件系统上某个可执行文件（executable）的链接，然后操作系统将该可执行文件加载到内存中。
Interestingly, that executable is sometimes referred to as an image when we're talking about a process.
有趣的是，当我们讨论进程时，该可执行文件有时被称为镜像（image）。

Containers are processes, A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.
容器也是进程。容器是一种标准的软件单元，它将代码及其所有依赖项打包在一起，使应用程序能够快速可靠地从一个计算环境运行到另一个计算环境。

Containerised software will always run the same, regardless of the infrastructure.
容器化软件无论基础设施如何，运行方式都将始终保持一致。
Containers isolate software from its environment and ensure that it works uniformly despite differences for instance between development and staging.
容器将软件与环境隔离，并确保它能够统一运行，尽管例如开发环境和暂存环境之间存在差异。

I mentioned images in the last section when it comes to how and why containers and images combined made containers popular in our ecosystem.
我在上一节中提到了镜像，即容器和镜像的结合如何以及为何使容器在我们的生态系统中流行起来。

### What is an Image?

A container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.
容器镜像（Container image）是一种轻量级、独立的、可执行的软件包，其中包含运行应用程序所需的一切：代码、运行时、系统工具、系统库和设置。
Container images become containers at runtime.
容器镜像在运行时变成容器。

## Resources

- [TechWorld with Nana - Docker Tutorial for Beginners](https://www.youtube.com/watch?v=3c-iBn73dDE)
- [Programming with Mosh - Docker Tutorial for Beginners](https://www.youtube.com/watch?v=pTFZFxd4hOI)
- [Docker Tutorial for Beginners - What is Docker? Introduction to Containers](https://www.youtube.com/watch?v=17Bl31rlnRM&list=WL&index=128&t=61s)
- [Introduction to Container By Red Hat](https://www.redhat.com/en/topics/containers)

See you on [Day 43](day43.md)
第 43 天见（[Day 43](day43.md)）