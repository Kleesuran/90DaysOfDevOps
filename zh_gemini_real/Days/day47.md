---
title: '#90DaysOfDevOps - Docker Networking & Security - Day 47'
published: false
description: 90DaysOfDevOps - Docker Networking & Security
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049078
---

## Docker Networking & Security

During this container session so far we have made things happen but we have not looked at how things have worked behind the scenes either from a networking point of view also we have not touched on security, that is the plan for this session.
到目前为止，在本次容器会话中，我们已经实现了一些功能，但还没有从网络角度深入研究它们在幕后的工作原理，我们也没有涉及安全性，这就是本次会话的计划。

### Docker Networking Basics

Open a terminal, and type the command `docker network` this is the main command for configuring and managing container networks.
打开终端，输入命令 `docker network`，这是配置和管理容器网络的主要命令。

From the below, you can see this is how we can use the command, and all of the sub-commands available. We can create new networks, list existing ones, and inspect and remove networks.
从下面可以看到我们如何使用该命令，以及所有可用的子命令。我们可以创建新网络、列出现有网络、检查和删除网络。

![](Images/Day47_Containers1.png)

Let's take a look at the existing networks we have since our installation, so the out-of-box Docker networking looks like using the `docker network list` command.
让我们看看自安装以来我们拥有的现有网络，使用 `docker network list` 命令查看开箱即用的 Docker 网络是什么样的。

Each network gets a unique ID and NAME. Each network is also associated with a single driver. Notice that the "bridge" network and the "host" network have the same name as their respective drivers.
每个网络都有一个唯一的 ID 和 NAME。每个网络还与一个驱动程序相关联。请注意，“bridge”网络和“host”网络与其各自的驱动程序同名。

![](Images/Day47_Containers2.png)

Next, we can take a deeper look into our networks with the `docker network inspect` command.
接下来，我们可以使用 `docker network inspect` 命令对我们的网络进行更深入的了解。

With me running `docker network inspect bridge` I can get all the configuration details of that specific network name. This includes name, ID, drivers, connected containers and as you can see quite a lot more.
通过运行 `docker network inspect bridge`，我可以获得该特定网络名称的所有配置详细信息。这包括名称、ID、驱动程序、连接的容器，以及如您所见的大量其他信息。

![](Images/Day47_Containers3.png)

### Docker: Bridge Networking

As you have seen above a standard installation of Docker Desktop gives us a pre-built network called `bridge` If you look back up to the `docker network list` command, you will see that the network called bridge is associated with the `bridge` driver. Just because they have the same name doesn't they are the same thing. Connected but not the same thing.
正如您在上面所看到的，标准的 Docker Desktop 安装为我们提供了一个预构建的网络，称为 `bridge`。如果您回顾 `docker network list` 命令，您会看到名为 bridge 的网络与 `bridge` 驱动程序相关联。仅仅因为它们同名并不意味着它们是同一事物。它们是关联的，但不是同一事物。

The output above also shows that the bridge network is scoped locally. This means that the network only exists on this Docker host. This is true of all networks using the bridge driver - the bridge driver provides single-host networking.
上面的输出还显示，bridge 网络的范围是本地的。这意味着该网络仅存在于此 Docker 主机上。所有使用 bridge 驱动程序的网络都是如此——bridge 驱动程序提供单主机网络。

All networks created with the bridge driver are based on a Linux bridge (a.k.a. a virtual switch).
所有使用 bridge 驱动程序创建的网络都基于 Linux 网桥（也称为虚拟交换机）。

### Connect a Container

By default the bridge network is assigned to new containers, meaning unless you specify a network all containers will be connected to the bridge network.
默认情况下，bridge 网络分配给新容器，这意味着除非您指定网络，否则所有容器都将连接到 bridge 网络。

Let's create a new container with the command `docker run -dt ubuntu sleep infinity`
让我们使用命令 `docker run -dt ubuntu sleep infinity` 创建一个新容器。

The sleep command above is just going to keep the container running in the background so we can mess around with it.
上面的 sleep 命令只是让容器在后台保持运行，以便我们可以进行操作。

![](Images/Day47_Containers4.png)

If we then check our bridge network with `docker network inspect bridge` you will see that we have a container matching what we have just deployed because we did not specify a network.
如果我们随后使用 `docker network inspect bridge` 检查我们的 bridge 网络，您会看到我们有一个容器与我们刚刚部署的容器匹配，因为我们没有指定网络。

![](Images/Day47_Containers5.png)

We can also dive into the container using `docker exec -it 3a99af449ca2 bash` you will have to use `docker ps` to get your container ID.
我们还可以使用 `docker exec -it 3a99af449ca2 bash` 进入容器，您必须使用 `docker ps` 来获取您的容器 ID。

From here our image doesn't have anything to ping so we need to run the following command.`apt-get update && apt-get install -y iputils-ping` then ping an external interfacing address. `ping -c5 www.90daysofdevops.com`
从这里开始，我们的镜像没有任何可 ping 的工具，因此我们需要运行以下命令：`apt-get update && apt-get install -y iputils-ping`，然后 ping 一个外部接口地址。`ping -c5 www.90daysofdevops.com`

![](Images/Day47_Containers6.png)

To clear this up we can run `docker stop 3a99af449ca2` again and use `docker ps` to find your container ID but this will remove our container.
为了清理，我们可以再次运行 `docker stop 3a99af449ca2` 并使用 `docker ps` 找到您的容器 ID，但这将移除我们的容器。

### Configure NAT for external connectivity

In this step, we'll start a new NGINX container and map port 8080 on the Docker host to port 80 inside of the container. This means that traffic that hits the Docker host on port 8080 will be passed on to port 80 inside the container.
在此步骤中，我们将启动一个新的 NGINX 容器，并将 Docker 主机上的 8080 端口映射到容器内部的 80 端口。这意味着到达 Docker 主机 8080 端口的流量将被传递到容器内部的 80 端口。

Start a new container based on the official NGINX image by running `docker run --name web1 -d -p 8080:80 nginx`
通过运行 `docker run --name web1 -d -p 8080:80 nginx`，启动一个基于官方 NGINX 镜像的新容器。

![](Images/Day47_Containers7.png)

Review the container status and port mappings by running `docker ps`
通过运行 `docker ps` 检查容器状态和端口映射。

![](Images/Day47_Containers8.png)

The top line shows the new web1 container running NGINX. Take note of the command the container is running as well as the port mapping - `0.0.0.0:8080->80/tcp` maps port 8080 on all host interfaces to port 80 inside the web1 container. This port mapping is what effectively makes the container's web service accessible from external sources (via the Docker hosts IP address on port 8080).
第一行显示了正在运行 NGINX 的新 web1 容器。请注意容器正在运行的命令以及端口映射——`0.0.0.0:8080->80/tcp` 将所有主机接口上的 8080 端口映射到 web1 容器内的 80 端口。正是这种端口映射有效地使容器的 Web 服务可以从外部源访问（通过 Docker 主机 IP 地址的 8080 端口）。

Now we need our IP address for our actual host, we can do this by going into our WSL terminal and using the `IP addr` command.
现在我们需要获取实际主机的 IP 地址，我们可以通过进入 WSL 终端并使用 `IP addr` 命令来完成此操作。

![](Images/Day47_Containers9.png)

Then we can take this IP and open a browser and head to `http://172.25.218.154:8080/` Your IP might be different. This confirms that NGINX is accessible.
然后我们可以使用此 IP 地址并打开浏览器，访问 `http://172.25.218.154:8080/`。您的 IP 地址可能不同。这证实了 NGINX 是可访问的。

![](Images/Day47_Containers10.png)

I have taken these instructions from this site from way back in 2017 DockerCon but they are still relevant today. However, the rest of the walkthrough goes into Docker Swarm and I am not going to be looking into that here. [Docker Networking - DockerCon 2017](https://github.com/docker/labs/tree/master/dockercon-us-2017/docker-networking)
我从 2017 年 DockerCon 的网站上获取了这些说明，但它们今天仍然适用。但是，演练的其余部分涉及 Docker Swarm，我不会在这里研究它。[Docker Networking - DockerCon 2017](https://github.com/docker/labs/tree/master/dockercon-us-2017/docker-networking)

### Securing your containers

Containers provide a secure environment for your workloads vs a full server configuration. They offer the ability to break up your applications into much smaller, loosely coupled components each isolated from one another which helps reduce the attack surface overall.
与完整的服务器配置相比，容器为您的工作负载提供了更安全的环境。它们能够将您的应用程序分解成更小、松散耦合的组件，每个组件相互隔离，这有助于减少整体攻击面。

But they are not immune from hackers that are looking to exploit systems. We still need to understand the security pitfalls of the technology and maintain best practices.
但它们并非对试图利用系统的黑客免疫。我们仍然需要了解该技术的安全陷阱并维护最佳实践。

### Move away from root permission

All of the containers we have deployed have been using the root permission to the process within your containers. This means they have full administrative access to your container and host environments. Now to walk through we knew these systems were not going to be up and running for long. But you saw how easy it was to get up and running.
我们部署的所有容器都使用 root 权限来运行容器内的进程。这意味着它们对您的容器和主机环境拥有完全的管理访问权限。在演练过程中，我们知道这些系统不会长时间运行。但您看到了启动和运行是多么容易。

We can add a few steps to our process to enable non-root users to be our preferred best practice. When creating our dockerfile we can create user accounts. You can find this example also in the containers folder in the repository.
我们可以在我们的流程中添加一些步骤，以启用非 root 用户作为我们首选的最佳实践。创建 dockerfile 时，我们可以创建用户帐户。您也可以在仓库中的容器文件夹中找到此示例。

```
# Use the official Ubuntu 18.04 as base
FROM ubuntu:18.04
RUN apt-get update && apt-get upgrade -y
RUN groupadd -g 1000 basicuser && useradd -r -u 1000 -g basicuser basicuser
USER basicuser
```

We can also use `docker run --user 1009 ubuntu` the Docker run command overrides any user specified in your Dockerfile. Therefore, in the following example, your container will always run with the least privilege—provided user identifier 1009 also has the lowest permission level.
我们也可以使用 `docker run --user 1009 ubuntu`，Docker run 命令会覆盖您 Dockerfile 中指定的任何用户。因此，在下面的示例中，您的容器将始终以最低权限运行——前提是用户标识符 1009 也具有最低权限级别。

However, this method doesn’t address the underlying security flaw of the image itself. Therefore it’s better to specify a non-root user in your Dockerfile so your containers always run securely.
然而，此方法并未解决镜像本身的底层安全缺陷。因此，最好在 Dockerfile 中指定一个非 root 用户，这样您的容器就能始终安全运行。

### Private Registry

Another area we have used heavily in public registries in DockerHub, with a private registry of container images set up by your organisation means that you can host where you wish or there are managed services for this as well, but all in all, this gives you complete control of the images available for you and your team.
我们大量使用的另一个领域是 DockerHub 中的公共注册中心，而由您的组织设置的私有容器镜像注册中心意味着您可以托管在您希望的位置，或者也有托管服务可用于此，但总而言之，这使您可以完全控制可供您和您的团队使用的镜像。

DockerHub is great to give you a baseline, but it's only going to be providing you with a basic service where you have to put a lot of trust into the image publisher.
DockerHub 非常适合为您提供基线，但它只会为您提供基本服务，您必须对镜像发布者投入大量信任。

### Lean & Clean

Have mentioned this throughout, although not related to security. But the size of your container can also affect security in terms of attack surface if you have resources you do not use in your application then you do not need them in your container.
贯穿始终提到过这一点，尽管它与安全无关。但是，如果您的应用程序中包含未使用的资源，那么容器的大小也会影响安全性方面的攻击面，因此您不需要将这些资源放入容器中。

This is also my major concern with pulling the `latest` images because that can bring a lot of bloat to your images as well. DockerHub does show the compressed size for each of the images in a repository.
这也是我对拉取 `latest` 镜像的主要担忧，因为它也可能给您的镜像带来大量冗余。DockerHub 确实会显示仓库中每个镜像的压缩大小。

Checking `docker image` is a great command to see the size of your images.
检查 `docker image` 是一个查看镜像大小的出色命令。

![](Images/Day47_Containers11.png)

## Resources

- [TechWorld with Nana - Docker Tutorial for Beginners](https://www.youtube.com/watch?v=3c-iBn73dDE)
- [Programming with Mosh - Docker Tutorial for Beginners](https://www.youtube.com/watch?v=pTFZFxd4hOI)
- [Docker Tutorial for Beginners - What is Docker? Introduction to Containers](https://www.youtube.com/watch?v=17Bl31rlnRM&list=WL&index=128&t=61s)
- [WSL 2 with Docker getting started](https://www.youtube.com/watch?v=5RQbdMn04Oc)
- [Blog on getting started building a docker image](https://stackify.com/docker-build-a-beginners-guide-to-building-docker-images/)
- [Docker documentation for building an image](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [YAML Tutorial: Everything You Need to Get Started in Minute](https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started)

See you on [Day 48](day48.md)
我们第 48 天再见 [Day 48](day48.md)
