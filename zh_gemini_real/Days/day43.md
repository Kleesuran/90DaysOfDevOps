---
title: '#90DaysOfDevOps - What is Docker & Getting installed - Day 43'
published: false
description: 90DaysOfDevOps - What is Docker & Getting installed
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048739
---

## What is Docker & Getting installed

In the previous post, I mentioned Docker at least once and that is because Docker is innovative in making containers popular even though they have been around for such a long time.
在上一篇文章中，我至少提到过一次 Docker，这是因为它在使容器流行起来方面具有创新性，尽管容器已经存在很长时间了。

We are going to be using and explaining docker here but we should also mention the [Open Container Initiative (OCI)](https://www.opencontainers.org/) which is an industry standards organization that encourages innovation while avoiding the danger of vendor lock-in. Thanks to the OCI, we have a choice when choosing a container toolchain, including Docker, [CRI-O](https://cri-o.io/), [Podman](http://podman.io/), [LXC](https://linuxcontainers.org/), and others.
我们将在这里使用和解释 docker，但我们也应该提及 [Open Container Initiative (OCI)](https://www.opencontainers.org/)，这是一个行业标准组织，它鼓励创新，同时避免供应商锁定的风险。得益于 OCI，我们在选择容器工具链时有了更多选择，包括 Docker、[CRI-O](https://cri-o.io/)、[Podman](http://podman.io/)、[LXC](https://linuxcontainers.org/) 等。

Docker is a software framework for building, running, and managing containers. The term "docker" may refer to either the tools (the commands and a daemon) or the Dockerfile file format.
Docker 是一个用于构建、运行和管理容器的软件框架。“docker”一词可能指代其工具（命令和守护进程）或 Dockerfile 文件格式。

We are going to be using Docker Personal here which is free (for education and learning). This includes all the essentials that we need to cover to get a good foundation of knowledge of containers and tooling.
我们将在这里使用 Docker Personal，它是免费的（用于教育和学习）。这包括我们需要涵盖的所有要素，以便为容器和工具打下良好的知识基础。

It is probably worth breaking down some of the "docker" tools that we will be using and what they are used for. The term docker can be referring to the docker project overall, which is a platform for devs and admins to develop, ship and run applications. It might also be a reference to the docker daemon process running on the host which manages images and containers also called Docker Engine.
也许值得分解一下我们将要使用的某些“docker”工具及其用途。“docker”一词可以指代整个 docker 项目，它是开发人员和管理员开发、交付和运行应用程序的平台。它也可能指的是在主机上运行、用于管理镜像和容器的 docker 守护进程，也称为 Docker Engine。

### Docker Engine

Docker Engine is an open-source containerization technology for building and containerizing your applications. Docker Engine acts as a client-server application with:
Docker Engine 是一种开源容器化技术，用于构建应用程序并将其容器化。Docker Engine 作为一个客户端-服务器应用程序，具备以下特点：

- A server with a long-running daemon process dockerd.
- 具有长时间运行的守护进程 dockerd 的服务器。
- APIs specify interfaces that programs can use to talk to and instruct the Docker daemon.
- API 接口，程序可以通过它们与 Docker 守护进程进行通信和指令操作。
- A command line interface (CLI) client docker.
- 一个命令行界面 (CLI) 客户端 docker。

The above was taken from the official Docker documentation and the specific [Docker Engine Overview](https://docs.docker.com/engine/)
上述内容摘自官方 Docker 文档，具体请参阅 [Docker Engine Overview](https://docs.docker.com/engine/)

### Docker Desktop

We have a docker desktop for both Windows and macOS systems. An easy-to-install, lightweight docker development environment. A native OS application that leverages virtualisation capabilities on the host operating system.
我们有适用于 Windows 和 macOS 系统的 docker desktop。这是一个易于安装、轻量级的 docker 开发环境。它是一个利用主机操作系统上的虚拟化功能的本地操作系统应用程序。

It’s the best solution if you want to build, debug, test, package, and ship Dockerized applications on Windows or macOS.
如果您想在 Windows 或 macOS 上构建、调试、测试、打包和交付 Docker 化应用程序，它是最佳解决方案。

On Windows, we can also take advantage of WSL2 and Microsoft Hyper-V. We will cover some of the WSL2 benefits as we go through.
在 Windows 上，我们还可以利用 WSL2 和 Microsoft Hyper-V。我们将在后续过程中介绍一些 WSL2 的优势。

Because of the integration with hypervisor capabilities on the host operating system docker provides the ability to run your containers with Linux Operating systems.
由于与主机操作系统的 hypervisor 功能集成，docker 提供了使用 Linux 操作系统运行容器的能力。

### Docker Compose

Docker compose is a tool that allows you to run more complex apps over multiple containers. With the benefit of being able to use a single file and command to spin up your application.
Docker compose 是一种工具，允许您在多个容器上运行更复杂的应用程序。其优点是能够使用单个文件和命令来启动您的应用程序。

### Docker Hub

A centralised resource for working with Docker and its components. Most commonly known as a registry to host docker images. But there are a lot of additional services here which can be used in part with automation or integrated into GitHub as well as security scanning.
Docker Hub 是一个集中式资源，用于处理 Docker 及其组件。它最常被称为托管 docker 镜像的注册表。但这里还有许多额外的服务，可以部分用于自动化，或集成到 GitHub 以及安全扫描中。

### Dockerfile

A dockerfile is a text file that contains commands you would normally execute manually to build a docker image. Docker can build images automatically by reading the instructions we have in our dockerfile.
Dockerfile 是一个文本文件，其中包含您通常手动执行以构建 docker 镜像的命令。Docker 可以通过读取我们在 dockerfile 中的指令来自动构建镜像。

## Installing Docker Desktop

The [docker documenation](https://docs.docker.com/engine/install/) is amazing and if you are only just diving in then you should take a look and have a read-through. We will be using Docker Desktop on Windows with WSL2. I had already run through the installation on the machine we are using here.
[docker documenation](https://docs.docker.com/engine/install/)非常棒，如果您刚刚开始接触，应该仔细阅读一下。我们将使用带有 WSL2 的 Windows 版 Docker Desktop。我已经在这台机器上完成了安装。

![](Images/Day43_Containers1.png)

Take note before you go ahead and install at the system requirements, [Install Docker Desktop on Windows](https://docs.docker.com/desktop/windows/install/) if you are using macOS including the M1-based CPU architecture you can also take a look at [Install Docker Desktop on macOS](https://docs.docker.com/desktop/mac/install/)
在您开始安装之前，请注意系统要求，如果您使用的是 Windows，请参阅 [Install Docker Desktop on Windows](https://docs.docker.com/desktop/windows/install/)；如果您使用的是 macOS（包括基于 M1 的 CPU 架构），您也可以查看 [Install Docker Desktop on macOS](https://docs.docker.com/desktop/mac/install/)。

I will run through the Docker Desktop installation for Windows on another Windows Machine and log the process down below.
我将在另一台 Windows 机器上运行 Windows 版 Docker Desktop 的安装过程，并将其记录在下面。

### Windows

- Select windows as the operating system of your device.
- 选择 windows 作为您设备的操作系统。

   <img src = Images/Day43_operatingSystem.png>

- Navigate to the folder where you want to save the installer and save.
- 导航到您想要保存安装程序的文件夹并保存。

- Run the installer and wait for a few seconds and grant access for WSL.
- 运行安装程序，等待几秒钟并授予 WSL 访问权限。
    <img src = Images/Day43_EnableWSL.png>

- Click ok and the installation will begin.
- 单击“确定”，安装将开始。
    <img src = Images/Day43_install.png>

- Docker Desktop has been successfully installed on your device. You can now run the command "docker" on the terminal to check if the installation was successfull.
- Docker Desktop 已成功安装在您的设备上。您现在可以在终端上运行“docker”命令来检查安装是否成功。
    <img src = Images/Day43_check.png>

## Resources

- [TechWorld with Nana - Docker Tutorial for Beginners](https://www.youtube.com/watch?v=3c-iBn73dDE)
- [Programming with Mosh - Docker Tutorial for Beginners](https://www.youtube.com/watch?v=pTFZFxd4hOI)
- [Docker Tutorial for Beginners - What is Docker? Introduction to Containers](https://www.youtube.com/watch?v=17Bl31rlnRM&list=WL&index=128&t=61s)
- [WSL 2 with Docker getting started](https://www.youtube.com/watch?v=5RQbdMn04Oc)

See you on [Day 44](day44.md)
第 44 天见 [day44.md]
