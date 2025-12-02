---
title: '#90DaysOfDevOps - Docker Images & Hands-On with Docker Desktop - Day 44'
published: false
description: 90DaysOfDevOps - Docker Images & Hands-On with Docker Desktop
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048708
---

## Docker Images & Hands-On with Docker Desktop

We now have Docker Desktop installed on our system. (If you are running Linux then you still have options but no GUI but docker does work on Linux.)[Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/) (Other distributions also available.)
我们现在已经在系统上安装了 Docker Desktop。（如果您正在运行 Linux，您仍然有选择，但没有 GUI，不过 Docker 确实可以在 Linux 上运行。）[在 Ubuntu 上安装 Docker Engine](https://docs.docker.com/engine/install/ubuntu/) (其他发行版也可用。)

In this post, we are going to get started with deploying some images into our environment. A recap on what a Docker Image is - A Docker image is a file used to execute code in a Docker container. Docker images act as a set of instructions to build a Docker container, like a template. Docker images also act as the starting point when using Docker.
在本文中，我们将开始在我们的环境中部署一些镜像。回顾一下什么是 Docker 镜像——Docker 镜像是用于在 Docker 容器中执行代码的文件。Docker 镜像充当构建 Docker 容器的一组指令，类似于模板。Docker 镜像也是使用 Docker 时的起点。

Now is a good time to go and create your account on [DockerHub](https://hub.docker.com/)
现在是去 [DockerHub](https://hub.docker.com/) 上创建您账户的好时机。

![](Images/Day44_Containers1.png)

DockerHub is a centralised resource for working with Docker and its components. Most commonly known as a registry to host docker images. But there are a lot of additional services here which can be used in part with automation or integrated into GitHub as well as security scanning.
DockerHub 是处理 Docker 及其组件的集中资源。它最常见的作用是作为托管 Docker 镜像的注册中心。但这里还有许多额外的服务，可以用于自动化或集成到 GitHub 中，以及用于安全扫描。

If you scroll down once logged in you are going to see a list of container images, You might see database images for MySQL, hello-world etc. Think of these as great baseline images or you might just need a database image and you are best to use the official one which means you don't need to create your own.
如果您登录后向下滚动，您会看到一个容器镜像列表，您可能会看到用于 MySQL 的数据库镜像、hello-world 等。可以将这些视为出色的基线镜像，或者如果您只需要一个数据库镜像，最好使用官方镜像，这意味着您不需要自己创建。

![](Images/Day44_Containers2.png)

We can drill deeper into the view of available images and search across categories, operating systems and architectures. The one thing I highlight below is the Official Image, this should give you peace of mind about the origin of this container image.
我们可以更深入地查看可用镜像，并跨类别、操作系统和架构进行搜索。我在下面重点强调的一点是官方镜像（Official Image），这应该让您对该容器镜像的来源感到放心。

![](Images/Day44_Containers3.png)

We can also search for a specific image, for example, WordPress might be a good base image that we want we can do that at the top and find all container images related to WordPress. Below are notices that we also have verified publisher.
我们还可以搜索特定的镜像，例如，WordPress 可能是一个我们想要的良好基础镜像，我们可以在顶部进行搜索并找到所有与 WordPress 相关的容器镜像。下面是关于我们也有验证发布者（verified publisher）的通知。

- Official Image - Docker Official images are a curated set of Docker open source and "drop-in" solution repositories.
- 官方镜像（Official Image）- Docker 官方镜像是精选的 Docker 开源和“即用型”解决方案仓库。

- Verified Publisher - High-quality Docker content from verified publishers. These products are published and maintained directly by a commercial entity.
- 验证发布者（Verified Publisher）- 来自验证发布者的高质量 Docker 内容。这些产品由商业实体直接发布和维护。

![](Images/Day44_Containers4.png)

### Exploring Docker Desktop

We have Docker Desktop installed on our system and if you open this I expect unless you had this already installed you will see something similar to the image below. As you can see we have no containers running and our docker engine is running.
我们的系统上安装了 Docker Desktop，如果您打开它，我预计（除非您以前安装过）您会看到类似于下面的图像。正如您所见，我们没有容器在运行，但我们的 Docker 引擎正在运行。

![](Images/Day44_Containers5.png)

Because this was not a fresh install for me, I do have some images already downloaded and available on my system. You will likely see nothing in here.
因为这对我来说不是全新安装，我的系统上已经下载并有一些可用的镜像。您可能在此处看不到任何内容。

![](Images/Day44_Containers6.png)

Under remote repositories, this is where you will find any container images you have stored in your docker hub. You can see from the below I do not have any images.
在远程仓库（remote repositories）下，您可以找到存储在 Docker Hub 中的任何容器镜像。从下图中您可以看到我没有任何镜像。

![](Images/Day44_Containers7.png)

We can also clarify this on our dockerhub site and confirm that we have no repositories there.
我们也可以在我们的 Docker Hub 网站上澄清这一点，并确认那里没有仓库。

![](Images/Day44_Containers8.png)

Next, we have the Volumes tab, If you have containers that require persistence then this is where we can add these volumes to your local file system or a shared file system.
接下来是“卷”（Volumes）选项卡。如果您的容器需要持久性，那么您可以在此处将这些卷添加到您的本地文件系统或共享文件系统。

![](Images/Day44_Containers9.png)

At the time of writing, there is also a Dev Environments tab, this is going to help you collaborate with your team instead of moving between different git branches. We won't be covering this.
在撰写本文时，还有一个“开发环境”（Dev Environments）选项卡，这将帮助您与团队协作，而不是在不同的 Git 分支之间切换。我们将不涉及这部分内容。

![](Images/Day44_Containers10.png)

Going back to the first tab you can see that there is a command we can run which is a getting started container. Let's run `docker run -d -p 80:80 docker/getting-started` in our terminal.
回到第一个选项卡，您可以看到有一个可以运行的命令，这是一个入门容器。让我们在终端中运行 `docker run -d -p 80:80 docker/getting-started`。

![](Images/Day44_Containers11.png)

If we go and check our docker desktop window again, we are going to see that we have a running container.
如果我们再次查看 Docker Desktop 窗口，我们将看到一个正在运行的容器。

![](Images/Day44_Containers12.png)

You might have noticed that I am using WSL2 and for you to be able to use that you will need to make sure this is enabled in the settings.
您可能已经注意到我正在使用 WSL2，要能够使用它，您将需要确保在设置中启用了此功能。

![](Images/Day44_Containers13.png)

If we now go and check our Images tab again, you should now see an in-use image called docker/getting-started.
如果我们现在再次查看“镜像”（Images）选项卡，您应该会看到一个名为 `docker/getting-started` 且正在使用的镜像。

![](Images/Day44_Containers14.png)

Back to the Containers/Apps tab, click on your running container. You are going to see the logs by default and along the top, you have some options to choose from, in our case I am pretty confident that this is going to be a web page running in this container so we are going to choose the open in the browser.
回到“容器/应用”（Containers/Apps）选项卡，单击正在运行的容器。默认情况下您会看到日志，顶部有一些选项可供选择，在我们的例子中，我非常有信心这是一个在此容器中运行的网页，因此我们将选择“在浏览器中打开”（open in the browser）。

![](Images/Day44_Containers15.png)

When we hit that button above sure enough a web page should open hitting your localhost and display something similar to below.
当我们点击上面的按钮时，果然会打开一个网页，访问您的 localhost 并显示类似于下图的内容。

This container also has some more detail on our containers and images.
此容器还包含有关我们的容器和镜像的更多详细信息。

![](Images/Day44_Containers16.png)

We have now run our first container. Nothing too scary just yet. What about if we wanted to pull one of the container images down from DockerHub? Maybe there is a `hello world` docker container we could use.
我们现在已经运行了第一个容器。目前为止还没有什么太可怕的。如果我们想从 DockerHub 上拉取一个容器镜像怎么办？也许有一个 `hello world` Docker 容器我们可以使用。

I went ahead and stopped the getting started container not that it's taking up any mass amount of resources but for tidiness, as we walk through some more steps.
我继续停止了入门容器，倒不是因为它占用了大量的资源，而是为了整洁，以便我们继续执行更多步骤。

Back in our terminal let's go ahead and run `docker run hello-world` and see what happens.
回到我们的终端，让我们继续运行 `docker run hello-world`，看看会发生什么。

You can see we did not have the image locally so we pulled that down and then we got a message that is written into the container image with some information on what it did to get up and running and some links to reference points.
您可以看到我们本地没有该镜像，所以我们将其拉取下来，然后我们收到一条写入容器镜像的消息，其中包含有关其如何启动和运行的一些信息以及一些参考链接。

![](Images/Day44_Containers17.png)

However, if we go and look in Docker Desktop now we have no running containers but we do have an exited container that used the hello-world message, meaning it came up, delivered the message and then is terminated.
但是，如果我们现在查看 Docker Desktop，我们没有正在运行的容器，但我们确实有一个已退出的容器使用了 hello-world 消息，这意味着它启动了，发送了消息，然后终止了。

![](Images/Day44_Containers18.png)

And for the last time, let's just go and check the images tab and see that we have a new hello-world image locally on our system, meaning that if we run the `docker run hello-world` command again in our terminal we would not have to pull anything unless a version changes.
最后，我们再次检查“镜像”选项卡，看看我们的系统上本地是否有一个新的 hello-world 镜像，这意味着如果我们在终端中再次运行 `docker run hello-world` 命令，除非版本发生变化，否则我们无需拉取任何内容。

![](Images/Day44_Containers19.png)

The message from the hello-world container set down the challenge of running something a little more ambitious.
来自 hello-world 容器的消息提出了运行一些更大胆东西的挑战。

Challenge Accepted!
挑战接受！

![](Images/Day44_Containers20.png)

In running `docker run -it ubuntu bash` in our terminal we are going to run a containerised version of Ubuntu well not a full copy of the Operating system. You can find out more about this particular image on [DockerHub](https://hub.docker.com/_/ubuntu)
在终端中运行 `docker run -it ubuntu bash`，我们将运行 Ubuntu 的容器化版本，当然，它不是操作系统的完整副本。您可以在 [DockerHub](https://hub.docker.com/_/ubuntu) 上找到有关此特定镜像的更多信息。

You can see below when we run the command we now have an interactive prompt (`-it`) and we have a bash shell into our container.
您可以在下面看到，当我们运行该命令时，我们现在有一个交互式提示符（`-it`），并且我们已经进入了容器的 bash shell。

![](Images/Day44_Containers21.png)

We have a bash shell but we don't have much more which is why this container image is less than 30MB.
我们有一个 bash shell，但除此之外没有太多其他东西，这就是为什么这个容器镜像小于 30MB 的原因。

![](Images/Day44_Containers22.png)

But we can still use this image and we can still install software using our apt package manager, we can update our container image and upgrade also.
但是我们仍然可以使用这个镜像，我们仍然可以使用我们的 apt 包管理器安装软件，我们也可以更新我们的容器镜像并进行升级。

![](Images/Day44_Containers23.png)

Or maybe we want to install some software into our container, I have chosen a really bad example here as pinta is an image editor and it's over 200MB but hopefully you get where I am going with this. This would increase the size of our container considerably but still, we are going to be in the MB and not in the GB.
或者也许我们想在我们的容器中安装一些软件，我在这里选择了一个非常糟糕的例子，因为 pinta 是一个图像编辑器，它超过 200MB，但希望您能明白我的意思。这会大大增加我们容器的大小，但我们仍然会保持在 MB 级别而不是 GB 级别。

![](Images/Day44_Containers24.png)

I wanted that to hopefully give you an overview of Docker Desktop and the not-so-scary world of containers when you break it down with simple use cases, we do need to cover some networking, security and other options we have vs just downloading container images and using them like this. By the end of the section, we want to have made something and uploaded it to our DockerHub repository and be able to deploy it.
我希望通过简单的用例分解容器的世界，让您对 Docker Desktop 和容器不再那么害怕。我们确实需要涵盖一些网络、安全以及除了仅仅下载容器镜像并像这样使用它们之外的其他选项。到本节结束时，我们希望能够创建一些东西并将其上传到我们的 DockerHub 仓库并能够部署它。

## Resources

- [TechWorld with Nana - Docker Tutorial for Beginners](https://www.youtube.com/watch?v=3c-iBn73dDE)
- [Programming with Mosh - Docker Tutorial for Beginners](https://www.youtube.com/watch?v=pTFZFxd4hOI)
- [Docker Tutorial for Beginners - What is Docker? Introduction to Containers](https://www.youtube.com/watch?v=17Bl31rlnRM&list=WL&index=128&t=61s)
- [WSL 2 with Docker getting started](https://www.youtube.com/watch?v=5RQbdMn04Oc)

See you on [Day 45](day45.md)
我们第 [45 天](day45.md)见。