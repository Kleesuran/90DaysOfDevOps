---
title: '#90DaysOfDevOps - The Big Picture: Kubernetes - Day 49'
published: false
description: 90DaysOfDevOps - The Big Picture Kubernetes
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049049
---

## The Big Picture: Kubernetes

In the last section we covered Containers, Containers fall short when it comes to scale and orchestration alone.
在上一节中，我们介绍了容器（Containers），但容器在单独处理规模化和编排方面存在不足。
The best we can do is use docker-compose to bring up multiple containers together.
我们能做的最好方式是使用 docker-compose 将多个容器一起启动。
When it comes to Kubernetes which is a Container Orchestrator, this gives us the ability to scale up and down in an automated way or based on a load of your applications and services.
而 Kubernetes 作为容器编排器，使我们能够以自动化方式，或根据应用程序和服务的负载情况进行自动伸缩。

As a platform Kubernetes offers the ability to orchestrate containers according to your requirements and desired state.
作为一个平台，Kubernetes 能够根据你的要求和期望状态来编排容器。
We are going to cover Kubernetes in this section as it is growing rapidly as the next wave of infrastructure.
我们将在本节中介绍 Kubernetes，因为它正在迅速成长为下一波基础设施浪潮。
I would also suggest that from a DevOps perspective Kubernetes is just one platform that you will need to have a basic understanding of, you will also need to understand bare metal, virtualisation and most likely cloud-based services as well.
我还建议，从 DevOps 的角度来看，Kubernetes 只是你需要基本了解的一个平台，你还需要了解裸机、虚拟化以及很可能是基于云的服务。
Kubernetes is just another option to run our applications.
Kubernetes 只是运行我们应用程序的另一种选择。

### What is Container Orchestration?

I have mentioned Kubernetes and I have mentioned Container Orchestration, Kubernetes is the technology whereas container orchestration is the concept or the process behind the technology.
我提到了 Kubernetes，也提到了容器编排（Container Orchestration）。Kubernetes 是一种技术，而容器编排是该技术背后的概念或过程。
Kubernetes is not the only Container Orchestration platform we also have Docker Swarm, HashiCorp Nomad and others.
Kubernetes 并非唯一的容器编排平台，我们还有 Docker Swarm、HashiCorp Nomad 等。
But Kubernetes is going from strength to strength so I want to cover Kubernetes but wanted to say that it is not the only one out there.
但是 Kubernetes 正在不断发展壮大，所以我想介绍 Kubernetes，但也想指出它并非唯一的选择。

### What is Kubernetes?

The first thing you should read if you are new to Kubernetes is the official documentation, My experience of really deep diving into Kubernetes a little over a year ago was that this is going to be a steep learning curve.
如果你是 Kubernetes 的新手，你应该阅读的第一件事是官方文档。我在一年多前深入研究 Kubernetes 的经验是：这是一个陡峭的学习曲线。
Coming from a virtualisation and storage background I was thinking about how daunting this felt.
我来自虚拟化和存储背景，当时我心想这感觉有多么令人生畏。

But the community, free learning resources and documentation are amazing. [Kubernetes.io](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
但社区、免费学习资源和文档都非常棒。 [Kubernetes.io](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

_Kubernetes is a portable, extensible, open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. It has a large, rapidly growing ecosystem. Kubernetes services, support, and tools are widely available._

Important things to note from the above quote, Kubernetes is Open-Source with a rich history that goes back to Google who donated the project to the Cloud Native Computing Foundation (CNCF) and it has now been progressed by the open-source community as well as large enterprise vendors contributing to making Kubernetes what it is today.
从上面的引述中需要注意的重要一点是，Kubernetes 是开源的，它拥有丰富的历史，可以追溯到谷歌（Google），谷歌将该项目捐赠给了云原生计算基金会（CNCF），现在它由开源社区以及大型企业供应商推进，共同成就了今天的 Kubernetes。

I mentioned above that containers are great and in the previous section, we spoke about how containers and container images have changed and accelerated the adoption of cloud-native systems.
我上面提到容器很棒，并且在上一节中，我们讨论了容器和容器镜像如何改变和加速云原生系统的采用。
But containers alone are not going to give you the production-ready experience you need from your application.
但是仅靠容器本身并不能提供你的应用程序所需的生产就绪体验。
Kubernetes gives us the following:
Kubernetes 为我们提供了以下功能：

- **Service discovery and load balancing** Kubernetes can expose a container using the DNS name or using their IP address. If traffic to a container is high, Kubernetes can load balance and distribute the network traffic so that the deployment is stable.
- **服务发现和负载均衡** Kubernetes 可以使用 DNS 名称或 IP 地址暴露容器。如果流向容器的流量很高，Kubernetes 可以进行负载均衡并分配网络流量，从而使部署保持稳定。

- **Storage orchestration** Kubernetes allows you to automatically mount a storage system of your choice, such as local storage, public cloud providers, and more.
- **存储编排** Kubernetes 允许你自动挂载你选择的存储系统，例如本地存储、公共云提供商等。

- **Automated rollouts and rollbacks** You can describe the desired state for your deployed containers using Kubernetes, and it can change the actual state to the desired state at a controlled rate. For example, you can automate Kubernetes to create new containers for your deployment, remove existing containers and adopt all their resources to the new container.
- **自动部署和回滚** 你可以使用 Kubernetes 描述已部署容器的期望状态，它能以受控的速率将实际状态更改为期望状态。例如，你可以自动化 Kubernetes 为你的部署创建新容器，移除现有容器，并将它们的所有资源转移给新容器。

- **Automatic bin packing** You provide Kubernetes with a cluster of nodes that it can use to run containerized tasks. You tell Kubernetes how much CPU and memory (RAM) each container needs. Kubernetes can fit containers onto your nodes to make the best use of your resources.
- **自动装箱** 你为 Kubernetes 提供一个节点集群，它可以使用这些节点来运行容器化任务。你告诉 Kubernetes 每个容器需要多少 CPU 和内存（RAM）。Kubernetes 可以将容器安排到你的节点上，从而最好地利用你的资源。

- **Self-healing** Kubernetes restarts containers that fail, replaces containers, kills containers that don't respond to your user-defined health check, and doesn't advertise them to clients until they are ready to serve.
- **自我修复** Kubernetes 会重新启动失败的容器、替换容器、终止不响应用户定义健康检查的容器，并且在容器准备好服务之前不会将其公布给客户端。

- **Secret and configuration management** Kubernetes lets you store and manage sensitive information, such as passwords, OAuth tokens, and SSH keys. You can deploy and update secrets and application configuration without rebuilding your container images, and without exposing secrets in your stack configuration.
- **密文和配置管理** Kubernetes 允许你存储和管理敏感信息，例如密码、OAuth 令牌和 SSH 密钥。你可以在不重建容器镜像的情况下，部署和更新密文和应用程序配置，并且不会在堆栈配置中暴露密文。

Kubernetes provides you with a framework to run distributed systems resiliently.
Kubernetes 为你提供了一个弹性运行分布式系统的框架。

Container Orchestration manages the deployment, placement, and lifecycle of containers.
容器编排管理容器的部署、放置和生命周期。

It also has many other responsibilities:
它还承担许多其他职责：

- Cluster management federates hosts into one target.
- 集群管理将主机联合为一个目标。

- Schedule management distributes containers across nodes through the scheduler.
- 调度管理通过调度器将容器分布到各个节点上。
- Service discovery knows where containers are located and distributes client requests across them.
- 服务发现知道容器的位置，并将客户端请求分配给它们。

- Replication ensures that the right number of nodes and containers are available for the requested workload.
- 副本确保为请求的工作负载提供正确数量的节点和容器。

- Health management detects and replaces unhealthy containers and nodes.
- 健康管理检测并替换不健康的容器和节点。

### Main Kubernetes Components

Kubernetes is a container orchestrator to provision, manage, and scale apps.
Kubernetes 是一个容器编排器，用于预置、管理和扩展应用程序。
You can use it to manage the lifecycle of containerized apps in a cluster of nodes, which is a collection of worker machines such as VMs or physical machines.
你可以使用它来管理节点集群（即虚拟机或物理机等工作机器的集合）中容器化应用程序的生命周期。

Your apps might need many other resources to run, such as volumes, networks, and secrets that can help you connect to databases, talk to firewalled back ends, and secure keys.
你的应用程序可能需要许多其他资源才能运行，例如卷（volumes）、网络和密文，这些资源可以帮助你连接到数据库、与受防火墙保护的后端通信并保护密钥。
With Kubernetes, you can add those resources to your app.
使用 Kubernetes，你可以将这些资源添加到你的应用程序中。
Infrastructure resources that your apps need are managed declaratively.
你的应用程序所需的基础设施资源是声明式管理的。

The key paradigm of Kubernetes is its declarative model.
Kubernetes 的关键范式是其声明式模型。
You provide the state that you want and Kubernetes makes it happen.
你提供所需的（期望）状态，Kubernetes 会使其实现。
If you need five instances, you don't start five separate instances on your own.
如果你需要五个实例，你无需自己启动五个独立的实例。
Instead, you tell Kubernetes that you need five instances, and Kubernetes automatically reconciles the state.
相反，你告诉 Kubernetes 你需要五个实例，Kubernetes 会自动协调状态。
If something goes wrong with one of your instances and it fails, Kubernetes still knows the state that you want and creates instances on an available node.
如果你的某个实例出现问题并发生故障，Kubernetes 仍然知道你想要的（期望）状态，并在可用节点上创建实例。

### Node

#### Control Plane

Every Kubernetes cluster requires a Control Plane node, the control plane's components make global decisions about the cluster (for example, scheduling), as well as detecting and responding to cluster events.
每个 Kubernetes 集群都需要一个控制平面节点（Control Plane Node）。控制平面组件会做出关于集群的全局决策（例如，调度），以及检测和响应集群事件。

![](Images/Day49_Kubernetes1.png)

#### Worker Node

A worker machine that runs Kubernetes workloads.
运行 Kubernetes 工作负载的工作机器。
It can be a physical (bare metal) machine or a virtual machine (VM).
它可以是物理机（裸机）或虚拟机（VM）。
Each node can host one or more pods.
每个节点可以托管一个或多个 Pod。
Kubernetes nodes are managed by a control plane
Kubernetes 节点由控制平面管理。

![](Images/Day49_Kubernetes2.png)

There are other node types but I won't be covering them here.
还有其他节点类型，但我不会在这里介绍它们。

#### kubelet

An agent that runs on each node in the cluster.
运行在集群中每个节点上的代理程序。
It makes sure that containers are running in a Pod.
它确保容器正在 Pod 中运行。

The kubelet takes a set of PodSpecs that are provided through various mechanisms and ensures that the containers described in those PodSpecs are running and healthy.
kubelet 接收通过各种机制提供的一组 PodSpecs，并确保这些 PodSpecs 中描述的容器正在运行且健康。
The kubelet doesn't manage containers which were not created by Kubernetes.
kubelet 不管理非 Kubernetes 创建的容器。

![](Images/Day49_Kubernetes3.png)

#### kube-proxy

kube-proxy is a network proxy that runs on each node in your cluster, implementing part of the Kubernetes Service concept.
kube-proxy 是一个网络代理，运行在集群中的每个节点上，实现 Kubernetes Service 概念的一部分。

kube-proxy maintains network rules on nodes.
kube-proxy 维护节点上的网络规则。
These network rules allow network communication to your Pods from network sessions inside or outside of your cluster.
这些网络规则允许集群内部或外部的网络会话与你的 Pod 进行网络通信。

kube-proxy uses the operating system packet filtering layer if there is one and it's available.
如果操作系统有数据包过滤层并且可用，kube-proxy 就会使用它。
Otherwise, kube-proxy forwards the traffic itself.
否则，kube-proxy 会自己转发流量。

![](Images/Day49_Kubernetes4.png)

#### Container runtime

The container runtime is the software that is responsible for running containers.
容器运行时是负责运行容器的软件。

Kubernetes supports several container runtimes: Docker, containerd, CRI-O, and any implementation of the Kubernetes CRI (Container Runtime Interface).
Kubernetes 支持多种容器运行时：Docker, containerd, CRI-O 以及任何 Kubernetes CRI（容器运行时接口）的实现。

![](Images/Day49_Kubernetes5.png)

### Cluster

A cluster is a group of nodes, where a node can be a physical machine or a virtual machine.
集群是一组节点的集合，其中节点可以是物理机或虚拟机。
Each of the nodes will have the container runtime (Docker) and will also be running a kubelet service, which is an agent that takes in the commands from the Master controller (more on that later) and a Proxy, that is used to proxy connections to the Pods from another component (Services, that we will see later).
每个节点都将具有容器运行时（Docker），并且还将运行 kubelet 服务（这是一个接收来自主控制器命令的代理程序，稍后会详细介绍），以及一个代理（Proxy），用于代理来自其他组件（Service，稍后会介绍）到 Pod 的连接。

Our control plane which can be made highly available will contain some unique roles compared to the worker nodes, the most important will be the kube API server, this is where any communication will take place to get information or push information to our Kubernetes cluster.
我们的控制平面（可以实现高可用性）将包含一些与工作节点相比独特的角色，其中最重要的是 kube API server，这是获取信息或将信息推送到 Kubernetes 集群进行任何通信的场所。

#### Kube API-Server

The Kubernetes API server validates and configures data for the API objects which include pods, services, replication controllers, and others.
Kubernetes API 服务器对 API 对象（包括 Pods、Services、Replication Controllers 等）的数据进行验证和配置。
The API Server services REST operations and provide the frontend to the cluster's shared state through which all other components interact.
API Server 提供 REST 操作服务，并为集群的共享状态提供前端，所有其他组件都通过它进行交互。

#### Scheduler

The Kubernetes scheduler is a control plane process which assigns Pods to Nodes.
Kubernetes 调度器（Scheduler）是一个控制平面进程，负责将 Pod 分配给节点（Nodes）。
The scheduler determines which Nodes are valid placements for each Pod in the scheduling queue according to constraints and available resources.
调度器根据约束和可用资源，确定调度队列中每个 Pod 的有效放置节点。
The scheduler then ranks each valid Node and binds the Pod to a suitable Node.
然后，调度器对每个有效节点进行排名，并将 Pod 绑定到合适的节点。

#### Controller Manager

The Kubernetes controller manager is a daemon that embeds the core control loops shipped with Kubernetes.
Kubernetes 控制器管理器（Controller Manager）是一个守护程序，它嵌入了 Kubernetes 附带的核心控制循环。
In applications of robotics and automation, a control loop is a non-terminating loop that regulates the state of the system.
在机器人技术和自动化应用中，控制循环是一个调节系统状态的非终止循环。
In Kubernetes, a controller is a control loop that watches the shared state of the cluster through the apiserver and makes changes attempting to move the current state towards the desired state.
在 Kubernetes 中，控制器是一个控制循环，它通过 apiserver 监视集群的共享状态，并做出更改，试图将当前状态推向期望状态。

#### etcd

Consistent and highly-available key value store used as Kubernetes' backing store for all cluster data.
一致且高可用的键值存储，用作 Kubernetes 所有集群数据的支持存储。

![](Images/Day49_Kubernetes6.png)

#### kubectl

To manage this from a CLI point of view we have kubectl, kubectl interacts with the API server.
从 CLI（命令行界面）的角度进行管理，我们有 kubectl，kubectl 与 API 服务器进行交互。

The Kubernetes command-line tool, kubectl, allows you to run commands against Kubernetes clusters.
Kubernetes 命令行工具 kubectl 允许你对 Kubernetes 集群运行命令。
You can use kubectl to deploy applications, inspect and manage cluster resources, and view logs.
你可以使用 kubectl 部署应用程序、检查和管理集群资源以及查看日志。

![](Images/Day49_Kubernetes7.png)

### Pods

A Pod is a group of containers that form a logical application.
Pod 是一组容器的集合，它们构成了一个逻辑应用程序。
E.g. If you have a web application that is running a NodeJS container and also a MySQL container, then both these containers will be located in a single Pod.
例如，如果你的 Web 应用程序运行一个 NodeJS 容器和一个 MySQL 容器，那么这两个容器都将位于单个 Pod 中。
A Pod can also share common data volumes and they also share the same networking namespace.
Pod 还可以共享公共数据卷，并且共享相同的网络命名空间。
Remember that Pods are ephemeral and they could be brought up and down by the Master Controller.
请记住，Pod 是短暂的（ephemeral），它们可以由主控制器启动和关闭。
Kubernetes uses a simple but effective means to identify the Pods via the concepts of Labels (name – values).
Kubernetes 使用一种简单而有效的方式通过标签（Label）（名称-值）的概念来识别 Pod。

- Pods handle Volumes, Secrets, and configuration for containers.
- Pod 处理容器的卷、密文和配置。

- Pods are ephemeral. They are intended to be restarted automatically when they die.
- Pod 是短暂的。当它们终止时，会被设计为自动重启。

- Pods are replicated when the app is scaled horizontally by the ReplicationSet. Each Pod will run the same container code.
- 当应用程序通过 ReplicaSet 进行水平扩展时，Pod 会被复制。每个 Pod 将运行相同的容器代码。

- Pods live on Worker Nodes.
- Pod 位于工作节点上。

![](Images/Day49_Kubernetes8.png)

### Deployments

- You can just decide to run Pods but when they die they die.
- 你可以决定只运行 Pods，但当它们终止时就终止了。

- A Deployment will enable your pod to run continuously.
- Deployment 将使你的 Pod 能够持续运行。

- Deployments allow you to update a running app without downtime.
- Deployment 允许你在不停机的情况下更新正在运行的应用程序。

- Deployments also specify a strategy to restart Pods when they die
- Deployment 还指定了在 Pod 终止时重新启动它们的策略。

![](Images/Day49_Kubernetes9.png)

### ReplicaSets

- The Deployment can also create the ReplicaSet
- Deployment 也可以创建 ReplicaSet

- A ReplicaSet ensures your app has the desired number of Pods
- ReplicaSet 确保你的应用程序拥有期望数量的 Pods

- ReplicaSets will create and scale Pods based on the Deployment
- ReplicaSet 将根据 Deployment 创建和扩展 Pods

- Deployments, ReplicaSets, and Pods are not exclusive but can be
- Deployment、ReplicaSet 和 Pod 并非互相排斥，但可以组合使用

### StatefulSets

- Does your App require you to keep information about its state?
- 你的应用程序是否要求你保留有关其状态的信息？

- A database needs state
- 数据库需要状态

- A StatefulSet’s Pods are not interchangeable.
- StatefulSet 的 Pod 是不可互换的。

- Each pod has a unique, persistent identifier that the controller maintains over any rescheduling.
- 每个 Pod 都有一个唯一的、持久的标识符，控制器会在任何重新调度期间维护该标识符。

![](Images/Day49_Kubernetes10.png)

### DaemonSets

- DaemonSets are for continuous process
- DaemonSet 适用于连续进程

- They run one Pod per Node.
- 它们在每个节点上运行一个 Pod。

- Each new node added to the cluster gets a pod started
- 添加到集群的每个新节点都会启动一个 Pod

- Useful for background tasks such as monitoring and log collection
- 对监控和日志收集等后台任务很有用

- Each pod has a unique, persistent identifier that the controller maintains over any rescheduling.
- 每个 Pod 都有一个唯一的、持久的标识符，控制器会在任何重新调度期间维护该标识符。

![](Images/Day49_Kubernetes11.png)

### Services

- A single endpoint to access Pods
- 访问 Pods 的单个端点

- a unified way to route traffic to a cluster and eventually to a list of Pods.
- 一种将流量路由到集群并最终路由到 Pod 列表的统一方式。

- By using a Service, Pods can be brought up and down without affecting anything.
- 通过使用 Service，Pod 可以被启动和关闭而不会影响任何东西。

This is just a quick overview and notes around the fundamental building blocks of Kubernetes, we can take this knowledge and add in some other areas around Storage and Ingress to enhance our applications but we then also have a lot of choices on where our Kubernetes cluster runs.
这只是对 Kubernetes 基本构建块的快速概述和注释。我们可以利用这些知识，添加存储（Storage）和 Ingress 等其他领域来增强我们的应用程序，但随后我们对于 Kubernetes 集群的运行位置也有很多选择。
The next session will focus on those options on where can I run a Kubernetes cluster, whilst also exploring some specifics around Storage.
下一节将重点讨论“我可以在哪里运行 Kubernetes 集群”的选项，同时也会探讨一些关于存储的具体细节。

![](Images/Day49_Kubernetes12.png)

### What we will cover in the series on Kubernetes

- Kubernetes Architecture
- Kubernetes 架构
- Kubectl Commands
- Kubectl 命令
- Kubernetes YAML
- Kubernetes YAML
- Kubernetes Ingress
- Kubernetes Ingress
- Kubernetes Services
- Kubernetes 服务
- Helm Package Manager
- Helm 包管理器
- Persistent Storage
- 持久存储
- Stateful Apps
- 有状态应用

## Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [TechWorld with Nana - Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]](https://www.youtube.com/watch?v=X48VuDVv0do)
- [TechWorld with Nana - Kubernetes Crash Course for Absolute Beginners](https://www.youtube.com/watch?v=s_o8dwzRlu4)
- [Kunal Kushwaha - Kubernetes Tutorial for Beginners | What is Kubernetes? Architecture Simplified!](https://www.youtube.com/watch?v=KVBON1lA9N8)

See you on [Day 50](day50.md)