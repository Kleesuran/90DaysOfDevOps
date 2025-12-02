---
title: '#90DaysOfDevOps - The anatomy of a Docker Image - Day 45'
published: false
description: 90DaysOfDevOps - The anatomy of a Docker Image
tags: 'DevOps, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048777
---
## The anatomy of a Docker Image

In the last session, we covered some basics of how we can use Docker Desktop combined with DockerHub to deploy and run some verified images.
在上一节中, 我们介绍了一些如何结合使用 Docker Desktop 和 DockerHub 来部署和运行一些经过验证的镜像的基础知识。
A recap on what an image is, you won't forget things if I keep mentioning them.
回顾一下什么是镜像，如果我不断提及它们，你就不会忘记。

A Docker image is a read-only template that contains a set of instructions for creating a container that can run on the Docker platform.
Docker 镜像是一个只读模板，其中包含一组用于创建可在 Docker 平台上运行的容器的指令。
It provides a convenient way to package up applications and preconfigured server environments, which you can use for your private use or share publicly with other Docker users.
它提供了一种方便的方式来打包应用程序和预配置的服务器环境，您可以将其用于个人用途或与其他 Docker 用户公开共享。
Docker images are also the starting point for anyone using Docker for the first time.
Docker 镜像也是初次使用 Docker 的用户的起点。

What happens if we want to create our own Docker image? For us to do this we would create a Dockerfile.
如果我们想创建自己的 Docker 镜像会怎样？为此，我们需要创建一个 Dockerfile。
You saw how we could take that Ubuntu container image and we could add our software and we would have our container image with the software that we wanted and everything is good, however, if that container is shut down or thrown away then all those software updates and installations go away there is no repeatable version of what we had done.
你看到了我们可以如何获取该 Ubuntu 容器镜像，然后添加我们的软件，我们就会拥有带有我们所需软件的容器镜像，一切都很好，但是，如果该容器关闭或被删除，那么所有这些软件更新和安装都会消失，我们所做的工作就没有可重复的版本。
So that is great for showing off the capabilities but it doesn't help with the transport of images across multiple environments with the same set of software installed each time the container is run.
因此，这对于展示功能非常有用，但它无助于在每次运行容器时在多个环境中传输安装了相同软件集的镜像。

### What is a Dockerfile 

A dockerfile is a text file that contains commands you would normally execute manually to build a docker image.
Dockerfile 是一个文本文件，其中包含您通常手动执行以构建 Docker 镜像的命令。
Docker can build images automatically by reading the instructions we have in our dockerfile.
Docker 可以通过读取 Dockerfile 中的指令自动构建镜像。

Each of the files that make up a docker image is known as a layer.
构成 Docker 镜像的每个文件都称为一层（layer）。
these layers form a series of images, built on top of each other in stages.
这些层构成了按阶段相互叠加的一系列镜像。
Each layer is dependent on the layer immediately below it.
每一层都依赖于紧挨着它的下一层。
The order of your layers is key to the efficiency of the lifecycle management of your docker images.
层的顺序对于 Docker 镜像生命周期管理的效率至关重要。

We should organise our layers that change most often as high in the stack as possible, this is because when you make changes to a layer in your image, Docker not only rebuilds that particular layer but all layers built from it.
我们应该将最常更改的层尽可能地组织在堆栈的高层，这是因为当您更改镜像中的某一图层时，Docker 不仅会重建该特定层，还会重建所有基于它构建的层。
Therefore a change to a layer at the top involves the least amount of work to rebuild the entire image.
因此，更改顶部的层涉及重建整个镜像所需的最少工作量。

Each time docker launches a container from an image (like we ran yesterday) it adds a writeable layer, known as the container layer.
每次 Docker 从镜像启动容器（就像我们昨天运行的那样）时，它都会添加一个可写层，称为容器层。
This stores all changes to the container throughout its runtime.
它存储了容器在整个运行期间的所有更改。
This layer is the only difference between a live operational container and the source image itself.
该层是实时运行的容器与源镜像本身之间的唯一区别。
Any number of like-for-like containers can share access to the same underlying image while maintaining their state.
任意数量的同类容器都可以共享访问相同的底层镜像，同时保持各自的状态。

Back to the example, we used yesterday with the Ubuntu image.
回到我们昨天使用的 Ubuntu 镜像的示例。
We could run that same command multiple times and on the first container we could go and install pinta and on the second we could install figlet with two different applications, different purposes, different sizes etc.
我们可以多次运行相同的命令，在第一个容器上安装 pinta，在第二个容器上安装 figlet，这是两个不同的应用程序，具有不同的用途、大小等。
Each container that we deployed shares the same image but not the same state and then that state is then gone when we remove the container.
我们部署的每个容器都共享相同的镜像，但状态不同，当我们移除容器时，该状态就会消失。

![](Images/Day45_Containers1.png)

Following the example above with the Ubuntu image, but also many other ready-built container images available on DockerHub and other third-party repositories.
参照上面 Ubuntu 镜像的示例，以及 DockerHub 和其他第三方仓库中提供的许多其他现成的容器镜像。
These images are generally known as the parent image.
这些镜像通常被称为父镜像（parent image）。
It is the foundation upon which all other layers are built and provides the basic building blocks for our container environments.
它是构建所有其他层的基础，并为我们的容器环境提供了基本的构建块。

Together with a set of individual layer files, a Docker image also includes an additional file known as a manifest.
除了单独的层文件集之外，Docker 镜像还包括一个称为 manifest（清单）的附加文件。
This is essentially a description of the image in JSON format and comprises information such as image tags, a digital signature, and details on how to configure the container for different types of host platforms.
这本质上是以 JSON 格式描述镜像的文件，包含诸如镜像标签、数字签名以及有关如何为不同类型的主机平台配置容器的详细信息。

![](Images/Day45_Containers2.png)

### How to create a docker image 

 There are two ways we can create a docker image.
 我们可以通过两种方式创建 Docker 镜像。
 We can do it a little on the fly with the process that we started yesterday, we pick our base image spin up that container, and install all of the software and dependencies that we wish to have on our container.
 我们可以使用昨天开始的流程即时完成：我们选择基础镜像，启动该容器，并在容器上安装我们希望拥有的所有软件和依赖项。

 Then we can use the `docker commit container name` then we have a local copy of this image under docker images and in our docker desktop images tab.
 然后我们可以使用 `docker commit container name` 命令，然后在 `docker images` 命令列表和我们的 Docker Desktop 镜像选项卡中获得该镜像的本地副本。

 Super simple, I would not recommend this method unless you want to understand the process, it is going to be very difficult to manage lifecycle management this way and a lot of manual configuration/reconfiguration.
 超级简单，我不推荐这种方法，除非您只是想了解这个过程，因为这样管理生命周期会非常困难，而且需要大量的手动配置/重新配置。
 But it is the quickest and most simple way to build a docker image.
 但这是构建 Docker 镜像最快捷、最简单的方法。
 Great for testing, troubleshooting, validating dependencies etc.
 非常适合测试、故障排除、验证依赖项等。

The way we intend to build our image is through a dockerfile.
我们打算通过 Dockerfile 来构建我们的镜像。
Which gives us a clean, compact and repeatable way to create our images.
这为我们提供了一种清晰、紧凑且可重复创建镜像的方式。
Much easier lifecycle management and easy integration into Continous Integration and Continuous delivery processes.
更易于生命周期管理，并易于集成到持续集成和持续交付流程中。
But as you might gather it is a little more difficult than the first mentioned process.
但正如您可能知道的，它比第一种提到的过程稍微困难一些。

Using the dockerfile method is much more in tune with real-world, enterprise-grade container deployments.
使用 Dockerfile 方法更符合真实世界的企业级容器部署。

A dockerfile is a three-step process whereby you create the dockerfile and add the commands you need to assemble the image.
Dockerfile 是一个三步过程，您需要在其中创建 Dockerfile 并添加组装镜像所需的命令。

The following table shows some of the dockerfile statements we will be using or that you will most likely be using.
下表显示了我们将使用或您最有可能使用的一些 Dockerfile 语句。

| Command    | Purpose                                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| FROM       | To specify the parent image.                                                                                                                |
| | 用于指定父镜像。|
| WORKDIR    | To set the working directory for any commands that follow in the Dockerfile.                                                                |
| | 用于设置 Dockerfile 中后续所有命令的工作目录。|
| RUN        | To install any applications and packages required for your container.                                                                       |
| | 用于安装容器所需的任何应用程序和软件包。|
| COPY       | To copy over files or directories from a specific location.                                                                                 |
| | 用于从特定位置复制文件或目录。|
| ADD        | As COPY, but also able to handle remote URLs and unpack compressed files.                                                                   |
| | 与 COPY 类似，但也能处理远程 URL 并解压压缩文件。|
| ENTRYPOINT | Command that will always be executed when the container starts. If not specified, the default is /bin/sh -c                                 |
| | 容器启动时始终会执行的命令。如果未指定，默认值为 /bin/sh -c |
| CMD       | Arguments passed to the entrypoint. If ENTRYPOINT is not set (defaults to /bin/sh -c), the CMD will be the commands the container executes. |
| | 传递给 entrypoint 的参数。如果未设置 ENTRYPOINT (默认值为 /bin/sh -c)，则 CMD 将是容器执行的命令。|
| EXPOSE     | To define which port through which to access your container application.                                                                    |
| | 用于定义访问容器应用程序的端口。|
| LABEL      | To add metadata to the image.                                                                                                               |
| | 用于向镜像添加元数据。|

Now we have the detail on how to build our first dockerfile we can create a working directory and create our dockerfile.
现在我们已经掌握了构建第一个 Dockerfile 的细节，我们可以创建一个工作目录并创建我们的 Dockerfile。
I have created a working directory within this repository where you can see the files and folders I have to walk through. [Containers](Containers)
我已在此仓库中创建了一个工作目录，您可以在其中查看我需要逐步介绍的文件和文件夹。[Containers](Containers)

In this directory, I am going to create a .dockerignore file similar to the .gitignore we used in the last section.
在此目录中，我将创建一个类似于上一节中使用的 .gitignore 文件的 .dockerignore 文件。
This file will list any files that would otherwise be created during the Docker build process, which you want to exclude from the final build.
此文件将列出在 Docker 构建过程中可能创建但您希望从最终构建中排除的任何文件。

Remember everything about containers is about being compact, as fast as possible with no bloat.
请记住，容器的一切都是关于紧凑、尽可能快且没有冗余。

I want to create a very simple Dockerfile with the below layout also can be found in the folder linked above.
我想创建一个非常简单的 Dockerfile，其布局如下，也可以在上面链接的文件夹中找到。

```
# Use the official Ubuntu 18.04 as base
FROM ubuntu:18.04
# Install nginx and curl
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y nginx curl
RUN rm -rf /var/lib/apt/lists/*
```

Navigate to this directory in your terminal, and then run `docker build -t 90daysofdevops:0.1 .` we are using the `-t` and then setting an image name and tag.
在终端中导航到此目录，然后运行 `docker build -t 90daysofdevops:0.1 .` 我们使用 `-t` 来设置镜像名称和标签。

![](Images/Day45_Containers3.png)

Now we have created our image we can then go and run our image using Docker Desktop or we could use the docker command line.
现在我们已经创建了镜像，我们可以使用 Docker Desktop 或 Docker 命令行来运行我们的镜像。
I have used Docker Desktop I have fired up a container and you can see that we have `curl` available to us in the cli of the container.
我使用了 Docker Desktop 启动了一个容器，您可以看到容器的 cli 中有 `curl` 可供我们使用。

![](Images/Day45_Containers4.png)

Whilst in Docker Desktop there is also the ability to leverage the UI to do some more tasks with this new image.
在 Docker Desktop 中，还可以利用用户界面 (UI) 对这个新镜像执行更多任务。

![](Images/Day45_Containers5.png)

We can inspect our image, in doing so you see very much of the dockerfile and the lines of code that we wanted to run within our container.
我们可以检查我们的镜像，这样做您会看到很多关于 dockerfile 以及我们希望在容器中运行的代码行。

![](Images/Day45_Containers6.png)

We have a pull option, now this would fail for us because this image is not hosted anywhere so we would get that as an error.
我们有一个拉取（Pull）选项，现在这对我们来说会失败，因为这个镜像没有托管在任何地方，所以我们会收到错误。
However, we do have a Push to hub which would enable us to push our image to DockerHub.
但是，我们确实有一个“推送到中心 (Push to hub)”选项，它将使我们能够将镜像推送到 DockerHub。

If you are using the same `docker build` we ran earlier then this would not work either, you would need the build command to be `docker build -t {{username}}/{{imagename}}:{{version}}`
如果您使用我们之前运行的相同 `docker build` 命令，那么它也不会工作，您需要将构建命令更改为 `docker build -t {{username}}/{{imagename}}:{{version}}`

![](Images/Day45_Containers7.png)

Then if we go and take a look in our DockerHub repository you can see that we just pushed a new image.
然后，如果我们去查看我们的 DockerHub 仓库，您可以看到我们刚刚推送了一个新镜像。
Now in Docker Desktop, we would be able to use that pull tab.
现在在 Docker Desktop 中，我们将能够使用该拉取（Pull）选项卡。

![](Images/Day45_Containers8.png)

## Resources 

- [TechWorld with Nana - Docker Tutorial for Beginners](https://www.youtube.com/watch?v=3c-iBn73dDE)
- [Programming with Mosh - Docker Tutorial for Beginners](https://www.youtube.com/watch?v=pTFZFxd4hOI)
- [Docker Tutorial for Beginners - What is Docker? Introduction to Containers](https://www.youtube.com/watch?v=17Bl31rlnRM&list=WL&index=128&t=61s)
- [WSL 2 with Docker getting started](https://www.youtube.com/watch?v=5RQbdMn04Oc)
- [Blog on gettng started building a docker image](https://stackify.com/docker-build-a-beginners-guide-to-building-docker-images/)
- [Docker documentation for building an image](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

See you on [Day 46](day46.md)
