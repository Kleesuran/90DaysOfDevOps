---
title: '#90DaysOfDevOps - Alternatives to Docker - Day 48'
published: false
description: 90DaysOfDevOps - Alternatives to Docker
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048807
---

## Alternatives to Docker

I did say at the very beginning of this section that we were going to be using Docker, simply because resource wise there is so much and the community is very big, but also this was really where the indents to making containers popular came from. I would encourage you to go and watch some of the history around Docker and how it came to be, I found it very useful.
我在本节一开始就说过我们将使用 Docker，仅仅是因为资源非常丰富，社区也非常庞大，而且这也是使容器普及化的真正起点。我鼓励您去观看一些关于 Docker 及其发展历程的历史介绍，我发现这非常有用。

But as I have alluded to there are other alternatives to Docker. If we think about what Docker is and what we have covered. It is a platform for developing, testing, deploying, and managing applications.
但正如我所暗示的，Docker 还有其他替代品。如果我们回顾一下 Docker 是什么以及我们已经涵盖的内容。它是一个用于开发、测试、部署和管理应用程序的平台。

I want to highlight a few alternatives to Docker that you might or will in the future see out in the wild.
我想强调一些您将来可能会在实际环境中看到的 Docker 替代方案。

### Podman

What is Podman? Podman is a daemon-less container engine for developing, managing, and running OCI Containers on your Linux System. Containers can either be run as root or in rootless mode.
什么是 Podman？Podman 是一个无守护进程的容器引擎，用于在您的 Linux 系统上开发、管理和运行 OCI 容器。容器可以作为 root 用户运行，也可以在无 root 模式下运行。

I am going to be looking at this from a Windows point of view but know that like Docker there is no requirement for virtualisation there as it will use the underlying OS which is cannot do in the Windows world.
我将从 Windows 的角度来看待这个问题，但要知道，与 Docker 一样，它不需要虚拟化，因为它会使用底层操作系统，这在 Windows 环境中是无法做到的。

Podman can be run under WSL2 although not as sleek as the experience with Docker Desktop. There is also a Windows remote client where you can connect to a Linux VM where your containers will run.
尽管体验不如 Docker Desktop 那么流畅，但 Podman 可以在 WSL2 下运行。它还有一个 Windows 远程客户端，您可以通过它连接到运行容器的 Linux 虚拟机。

My Ubuntu on WSL2 is the 20.04 release. Following the next steps will enable you to install Podman on your WSL instance.
我在 WSL2 上的 Ubuntu 是 20.04 版本。按照以下步骤，您将能够在 WSL 实例上安装 Podman。

```Shell
echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_20.04/ /" |
sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
```

Add the GPG Key
添加 GPG 密钥

```Shell
curl -L "https://download.opensuse.org/repositories/devel:/kubic:\
/libcontainers:/stable/xUbuntu_20.04/Release.key" | sudo apt-key add -
```

Run a system update and upgrade with the `sudo apt-get update && sudo apt-get upgrade` command. Finally, we can install podman using `sudo apt install podman`
使用 `sudo apt-get update && sudo apt-get upgrade` 命令运行系统更新和升级。最后，我们可以使用 `sudo apt install podman` 来安装 Podman。

We can now use a lot of the same commands we have been using for docker, note that we do not have that nice docker desktop UI. You can see below I used `podman images` and I have nothing after installation then I used `podman pull ubuntu` to pull down the ubuntu container image.
我们现在可以使用许多与 Docker 相同的命令，但请注意，我们没有 Docker Desktop 漂亮的用户界面。您可以在下面看到，我使用了 `podman images`，安装后没有任何内容，然后我使用 `podman pull ubuntu` 拉取了 ubuntu 容器镜像。

![](Images/Day48_Containers1.png)

We can then run our Ubuntu image using `podman run -dit ubuntu` and `podman ps` to see our running image.
然后，我们可以使用 `podman run -dit ubuntu` 运行我们的 Ubuntu 镜像，并使用 `podman ps` 查看正在运行的镜像。

![](Images/Day48_Containers2.png)

To then get into that container we can run `podman attach dazzling_darwin` your container name will most likely be different.
要进入该容器，我们可以运行 `podman attach dazzling_darwin`，您的容器名称很可能会不同。

![](Images/Day48_Containers3.png)

If you are moving from docker to podman it is also common to change your config file to have `alias docker=podman` that way any command you run with docker will use podman.
如果您正从 Docker 迁移到 Podman，通常也会更改您的配置文件，设置 `alias docker=podman`，这样您运行的任何 Docker 命令都将使用 Podman。

### LXC

LXC is a containerisation engine that enables users again to create multiple isolated Linux container environments. Unlike Docker, LXC acts as a hypervisor for creating multiple Linux machines with separate system files, and networking features. Was around before Docker and then made a short comeback due to Docker's shortcomings.
LXC 是一个容器化引擎，使用户能够创建多个隔离的 Linux 容器环境。与 Docker 不同，LXC 充当管理程序（Hypervisor），用于创建具有独立系统文件和网络功能的多个 Linux 机器。它在 Docker 之前就存在，后来由于 Docker 的缺点而短暂回归。

LXC is as lightweight though as docker and easily deployed.
不过，LXC 和 Docker 一样轻量且易于部署。

### Containerd

A standalone container runtime. Containerd brings simplicity and robustness as well as of course portability. Containerd was formerly a tool that runs as part of Docker container services until Docker decided to graduate its components into standalone components.
一个独立的容器运行时。Containerd 带来了简单性、健壮性以及当然的便携性。Containerd 以前是作为 Docker 容器服务的一部分运行的工具，直到 Docker 决定将其组件拆分成独立的组件。

A project in the Cloud Native Computing Foundation, placing it in the same class as popular container tools like Kubernetes, Prometheus, and CoreDNS.
它是云原生计算基金会（Cloud Native Computing Foundation）的一个项目，与 Kubernetes、Prometheus 和 CoreDNS 等流行的容器工具属于同一类别。

### Other Docker tooling

We could also mention toolings and options around Rancher, and VirtualBox but we can cover them in more detail another time.
我们还可以提到围绕 Rancher 和 VirtualBox 的工具和选项，但我们可以在以后更详细地介绍它们。

[**Gradle**](https://gradle.org/)

- Build scans allow teams to collaboratively debug their scripts and track the history of all builds.
- 构建扫描允许团队协作调试脚本并跟踪所有构建的历史记录。
- Execution options give teams the ability to continuously build so that whenever changes are inputted, the task is automatically executed.
- 执行选项使团队能够持续构建，这样无论何时输入更改，任务都会自动执行。
- The custom repository layout gives teams the ability to treat any file directory structure as an artefact repository.
- 自定义仓库布局使团队能够将任何文件目录结构视为一个构件仓库。

[**Packer**](https://packer.io/)

- Ability to create multiple machine images in parallel to save developer time and increase efficiency.
- 能够并行创建多个机器镜像，从而节省开发人员时间并提高效率。
- Teams can easily debug builds using Packer’s debugger, which inspects failures and allows teams to try out solutions before restarting builds.
- 团队可以使用 Packer 的调试器轻松调试构建，该调试器可以检查故障，并允许团队在重新启动构建之前尝试解决方案。
- Support with many platforms via plugins so teams can customize their builds.
- 通过插件支持许多平台，以便团队可以自定义其构建。

[**Logspout**](https://github.com/gliderlabs/logspout)

- Logging tool - The tool’s customizability allows teams to ship the same logs to multiple destinations.
- 日志记录工具 - 该工具的可定制性允许团队将相同的日志发送到多个目的地。
- Teams can easily manage their files because the tool only requires access to the Docker socket.
- 团队可以轻松管理其文件，因为该工具只需要访问 Docker socket。
- Completely open-sourced and easy to deploy.
- 完全开源且易于部署。

[**Logstash**](https://www.elastic.co/products/logstash)

- Customize your pipeline using Logstash’s pluggable framework.
- 使用 Logstash 的可插拔框架自定义您的管道。
- Easily parse and transform your data for analysis and to deliver business value.
- 轻松解析和转换您的数据，以便进行分析并提供业务价值。
- Logstash’s variety of outputs lets you route your data where you want.
- Logstash 各种各样的输出允许您将数据路由到任何您想要的地方。

[**Portainer**](https://www.portainer.io/)

- Utilise pre-made templates or create your own to deploy applications.
- 利用预制模板或创建自己的模板来部署应用程序。
- Create teams and assign roles and permissions to team members.
- 创建团队并为团队成员分配角色和权限。
- Know what is running in each environment using the tool’s dashboard.
- 使用该工具的仪表板了解每个环境中正在运行的内容。

## Resources

- [TechWorld with Nana - Docker Tutorial for Beginners](https://www.youtube.com/watch?v=3c-iBn73dDE)
- [Programming with Mosh - Docker Tutorial for Beginners](https://www.youtube.com/watch?v=pTFZFxd4hOI)
- [Docker Tutorial for Beginners - What is Docker? Introduction to Containers](https://www.youtube.com/watch?v=17Bl31rlnRM&list=WL&index=128&t=61s)
- [WSL 2 with Docker getting started](https://www.youtube.com/watch?v=5RQbdMn04Oc)
- [Blog on getting started building a docker image](https://stackify.com/docker-build-a-beginners-guide-to-building-docker-images/)
- [Docker documentation for building an image](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [YAML Tutorial: Everything You Need to Get Started in Minute](https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started)
- [Podman | Daemonless Docker | Getting Started with Podman](https://www.youtube.com/watch?v=Za2BqzeZjBk)
- [LXC - Guide to building an LXC Lab](https://www.youtube.com/watch?v=cqOtksmsxfg)

See you on [Day 49](day49.md)
第 49 天见 ([Day 49](day49.md))
