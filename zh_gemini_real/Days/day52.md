---
title: '#90DaysOfDevOps - Setting up a multinode Kubernetes Cluster - Day 52'
published: false
description: 90DaysOfDevOps - Setting up a multinode Kubernetes Cluster
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049050
---

## Setting up a multinode Kubernetes Cluster

I wanted this title to be "Setting up a multinode Kubernetes cluster with Vagrant" but thought it might be a little too long!
我本想把标题定为“使用 Vagrant 设置多节点 Kubernetes 集群”，但觉得可能有点太长了！

In the session yesterday we used a cool project to deploy our first Kubernetes cluster and get a little hands-on with the most important CLI tool you will come across when using Kubernetes (kubectl).
在昨天的会议中，我们使用了一个很酷的项目来部署我们的第一个 Kubernetes 集群，并对你在使用 Kubernetes 时会遇到的最重要的 CLI 工具 (kubectl) 进行了一些实践。

Here we are going to use VirtualBox as our base but as mentioned the last time we spoke about Vagrant back in the Linux section we can use any hypervisor or virtualisation tool supported. It was [Day 14](day14.md) when we went through and deployed an Ubuntu machine for the Linux section.
在这里，我们将使用 VirtualBox 作为我们的基础，但正如我们在 Linux 部分上次谈到 Vagrant 时提到的那样，我们可以使用任何受支持的虚拟机管理程序或虚拟化工具。我们在 [第 14 天](day14.md) 部署了一台用于 Linux 部分的 Ubuntu 机器。

### A quick recap on Vagrant

Vagrant is a CLI utility that manages the lifecycle of your virtual machines. We can use vagrant to spin up and down virtual machines across many different platforms including vSphere, Hyper-v, Virtual Box and also Docker. It does have other providers but we will stick with that we are using Virtual Box here so we are good to go.
Vagrant 是一个管理虚拟机生命周期的 CLI 实用程序。我们可以使用 Vagrant 在许多不同的平台（包括 vSphere、Hyper-V、Virtual Box 以及 Docker）上启动和关闭虚拟机。它确实有其他提供商，但我们将坚持使用 Virtual Box，所以我们可以开始了。

### Kubernetes Lab environment

I am going to be using a baseline this [blog and repository](https://devopscube.com/kubernetes-cluster-vagrant/) to walk through the configuration. I would however advise that if this is your first time deploying a Kubernetes cluster then maybe also look into how you would do this manually and then at least you know what this looks like. Although I will say that this Day 0 operations and effort is being made more efficient with every release of Kubernetes. I liken this very much to the days of VMware and ESX and how you would need at least a day to deploy 3 ESX servers now we can have that up and running in an hour. We are heading in that direction when it comes to Kubernetes.
我将使用这个 [博客和存储库](https://devopscube.com/kubernetes-cluster-vagrant/) 作为基础来逐步完成配置。但我建议，如果这是你第一次部署 Kubernetes 集群，那么也许也应该研究一下如何手动完成，这样至少你知道它是如何运作的。尽管如此，我必须说，随着 Kubernetes 的每一次发布，这种 Day 0 操作和努力正变得越来越高效。我将其比作 VMware 和 ESX 的时代，那时你至少需要一天时间来部署 3 台 ESX 服务器，而现在我们可以在一小时内部署并运行它们。在 Kubernetes 方面，我们正朝着这个方向发展。

I have uploaded in [Kubernetes folder](Kubernetes) the vagrantfile that we will be using to build out our environment. Grab this and navigate to this directory in your terminal. I am again using Windows so I will be using PowerShell to perform my workstation commands with vagrant. If you do not have vagrant then you can use arkade, we covered this yesterday when installing minikube and other tools. A simple command `arkade get vagrant` should see your download and install the latest version of vagrant.
我已将我们用于构建环境的 vagrantfile 上传到 [Kubernetes 文件夹](Kubernetes) 中。获取此文件并在你的终端中导航到该目录。我再次使用 Windows，因此我将使用 PowerShell 来执行我的 Vagrant 工作站命令。如果你没有 Vagrant，那么你可以使用 arkade，我们在昨天安装 minikube 和其他工具时介绍过它。一个简单的命令 `arkade get vagrant` 应该可以下载并安装最新版本的 Vagrant。

When you are in your directory then you can simply run `vagrant up` and if all is configured correctly then you should see the following kick-off in your terminal.
当你在你的目录中时，你只需运行 `vagrant up`，如果所有配置都正确，那么你应该在终端中看到以下启动过程。

![](Images/Day52_Kubernetes1.png)

In the terminal, you are going to see several steps taking place, but in the meantime let's take a look at what we are building here.
在终端中，你将看到几个步骤正在进行，但同时让我们看看我们正在构建什么。

![](Images/Day52_Kubernetes2.png)

From the above you can see that we are going to build out 3 virtual machines, we will have a control plane node and then two worker nodes. If you head back to [Day 49](day49.md) You will see some more descriptions of these areas we see in the image.
从上图可以看到，我们将构建 3 个虚拟机：一个控制平面节点和两个工作节点。如果你回到 [第 49 天](day49.md)，你将看到图中所示这些区域的更多描述。

Also in the image, we indicate that our kubectl access will come from outside of the cluster and hit that kube apiserver when in fact as part of the vagrant provisioning we are deploying kubectl on each of these nodes so that we can access the cluster from within each of our nodes.
另外，在图中，我们指出我们的 kubectl 访问将来自集群外部并访问 kube apiserver，但实际上，作为 Vagrant 供应的一部分，我们正在每个节点上部署 kubectl，以便我们可以从每个节点内部访问集群。

The process of building out this lab could take anything from 5 minutes to 30 minutes depending on your setup.
构建这个实验环境的过程可能需要 5 分钟到 30 分钟，具体取决于你的设置。

I am going to cover the scripts shortly as well but you will notice if you look into the vagrant file that we are calling on 3 scripts as part of the deployment and this is really where the cluster is created. We have seen how easy it is to use vagrant to deploy our virtual machines and OS installations using vagrant boxes but having the ability to run a shell script as part of the deployment process is where it gets quite interesting around automating these lab build-outs.
我稍后也会介绍这些脚本，但如果你查看 vagrant 文件，你会发现我们正在调用 3 个脚本作为部署的一部分，这才是集群真正创建的地方。我们已经看到了使用 vagrant box 来部署我们的虚拟机和操作系统安装是多么容易，但能够在部署过程中运行 shell 脚本的能力使得自动化这些实验室构建变得非常有趣。

Once complete we can then ssh to one of our nodes `vagrant ssh master` from the terminal should get you access, the default username and password is `vagrant/vagrant`
完成后，我们可以通过终端 SSH 连接到我们的一个节点，运行 `vagrant ssh master` 即可获得访问权限，默认用户名和密码是 `vagrant/vagrant`。

You can also use `vagrant ssh node01` and `vagrant ssh node02` to gain access to the worker nodes should you wish.
如果你愿意，你也可以使用 `vagrant ssh node01` 和 `vagrant ssh node02` 来访问工作节点。

![](Images/Day52_Kubernetes3.png)

Now we are in one of the above nodes in our new cluster we can issue `kubectl get nodes` to show our 3 node cluster and the status of this.
现在我们在新集群的上述其中一个节点中，我们可以执行 `kubectl get nodes` 来显示我们的 3 节点集群及其状态。

![](Images/Day52_Kubernetes4.png)

At this point, we have a running 3 node cluster, with 1 control plane node and 2 worker nodes.
至此，我们拥有了一个正在运行的 3 节点集群，包括 1 个控制平面节点和 2 个工作节点。

### Vagrantfile and Shell Script walkthrough

If we take a look at our vagrantfile, you will see that we are defining several worker nodes, networking IP addresses for the bridged network within VirtualBox and then some naming. Another you will notice is that we are also calling upon some scripts that we want to run on specific hosts.
如果我们看一下我们的 vagrantfile，你会看到我们定义了几个工作节点、VirtualBox 内桥接网络的网络 IP 地址，以及一些命名。你还会注意到，我们还调用了一些我们想要在特定主机上运行的脚本。

```
NUM_WORKER_NODES=2
IP_NW="10.0.0."
IP_START=10

Vagrant.configure("2") do |config|
    config.vm.provision "shell", inline: <<-SHELL
        apt-get update -y
        echo "$IP_NW$((IP_START))  master-node" >> /etc/hosts
        echo "$IP_NW$((IP_START+1))  worker-node01" >> /etc/hosts
        echo "$IP_NW$((IP_START+2))  worker-node02" >> /etc/hosts
    SHELL
    config.vm.box = "bento/ubuntu-21.10"
    config.vm.box_check_update = true

    config.vm.define "master" do |master|
      master.vm.hostname = "master-node"
      master.vm.network "private_network", ip: IP_NW + "#{IP_START}"
      master.vm.provider "virtualbox" do |vb|
          vb.memory = 4048
          vb.cpus = 2
          vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
      end
      master.vm.provision "shell", path: "scripts/common.sh"
      master.vm.provision "shell", path: "scripts/master.sh"
    end

    (1..NUM_WORKER_NODES).each do |i|
      config.vm.define "node0#{i}" do |node|
        node.vm.hostname = "worker-node0#{i}"
        node.vm.network "private_network", ip: IP_NW + "#{IP_START + i}"
        node.vm.provider "virtualbox" do |vb|
            vb.memory = 2048
            vb.cpus = 1
            vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
        end
        node.vm.provision "shell", path: "scripts/common.sh"
        node.vm.provision "shell", path: "scripts/node.sh"
      end
    end
  end
```

Let's break down those scripts that are being run. We have three scripts listed in the above VAGRANTFILE to run on specific nodes.
让我们分解一下正在运行的这些脚本。在上面的 VAGRANTFILE 中列出了三个要在特定节点上运行的脚本。

`master.vm.provision "shell", path: "scripts/common.sh"`

This script above is going to focus on getting the nodes ready, it is going to be run on all 3 of our nodes and it will remove any existing Docker components and reinstall Docker and ContainerD as well kubeadm, kubelet and kubectl. This script will also update existing software packages on the system.
上面的这个脚本将专注于准备节点，它将在我们所有的 3 个节点上运行，它将删除任何现有的 Docker 组件，并重新安装 Docker、ContainerD 以及 kubeadm、kubelet 和 kubectl。该脚本还将更新系统上现有的软件包。

`master.vm.provision "shell", path: "scripts/master.sh"`

The master.sh script will only run on the control plane node, this script is going to create the Kubernetes cluster using kubeadm commands. It will also prepare the config context for access to this cluster which we will cover next.
master.sh 脚本只会运行在控制平面节点上，该脚本将使用 kubeadm 命令创建 Kubernetes 集群。它还会准备用于访问该集群的配置上下文，我们将在稍后介绍这一点。

`node.vm.provision "shell", path: "scripts/node.sh"`

This is simply going to take the config created by the master and join our nodes to the Kubernetes cluster, this join process again uses kubeadm and another script which can be found in the config folder.
这只会获取 master 创建的配置，并将我们的节点加入到 Kubernetes 集群中，这个加入过程再次使用了 kubeadm 和另一个可以在 config 文件夹中找到的脚本。

### Access to the Kubernetes cluster

Now we have two clusters deployed we have the minikube cluster that we deployed in the previous section and we have the new 3 node cluster we just deployed to VirtualBox.
现在我们部署了两个集群：我们在前一个部分部署的 minikube 集群，以及我们刚刚部署到 VirtualBox 的新的 3 节点集群。

Also, that config file that you will also have access to on the machine, you ran vagrant from consists of how we can gain access to our cluster from our workstation.
此外，你运行 Vagrant 的机器上也有一个配置文件，该文件包含了我们如何从工作站访问集群的方法。

Before we show that let me touch on the context.
在我们展示之前，让我先谈谈上下文 (Context)。

![](Images/Day52_Kubernetes5.png)

Context is important, the ability to access your Kubernetes cluster from your desktop or laptop is required. Lots of different options out there and people use different operating systems as their daily drivers.
上下文 (Context) 很重要，从台式机或笔记本电脑访问 Kubernetes 集群的能力是必需的。有很多不同的选择，人们使用不同的操作系统作为日常驱动。

By default, the Kubernetes CLI client (kubectl) uses the C:\Users\username\.kube\config to store the Kubernetes cluster details such as endpoint and credentials. If you have deployed a cluster you will be able to see this file in that location. But if you have been using maybe the master node to run all of your kubectl commands so far via SSH or other methods then this post will hopefully help you get to grips with being able to connect with your workstation.
默认情况下，Kubernetes CLI 客户端 (kubectl) 使用 C:\Users\username\.kube\config 文件来存储 Kubernetes 集群的详细信息，例如端点和凭证。如果你部署了一个集群，你将能够在该位置看到这个文件。但是，如果你一直通过 SSH 或其他方式使用 master 节点运行所有 kubectl 命令，那么这篇文章有望帮助你掌握如何连接到你的工作站。

We then need to grab the kubeconfig file from the cluster or we can also get this from our config file once deployed, grab the contents of this file either via SCP or just open a console session to your master node and copy to the local windows machine.
然后我们需要从集群中获取 kubeconfig 文件，或者我们也可以在部署后从我们的配置文件中获取它，通过 SCP 获取该文件的内容，或者只是打开到 master 节点的控制台会话并复制到本地 Windows 机器。

![](Images/Day52_Kubernetes6.png)

We then want to take a copy of that config file and move it to our `$HOME/.kube/config` location.
然后我们需要复制该配置文件并将其移动到我们的 `$HOME/.kube/config` 位置。

![](Images/Day52_Kubernetes7.png)

Now from your local workstation, you will be able to run `kubectl cluster-info` and `kubectl get nodes` to validate that you have access to your cluster.
现在，从你的本地工作站，你将能够运行 `kubectl cluster-info` 和 `kubectl get nodes` 来验证你是否可以访问你的集群。

![](Images/Day52_Kubernetes8.png)

This not only allows for connectivity and control from your windows machine but this then also allows us to do some port forwarding to access certain services from our windows machine
这不仅允许从你的 Windows 机器进行连接和控制，而且还允许我们执行一些端口转发，以便从 Windows 机器访问特定的服务。

If you are interested in how you would manage multiple clusters on your workstation then I have a more detailed walkthrough [here](https://vzilla.co.uk/vzilla-blog/building-the-home-lab-kubernetes-playground-part-6).
如果你对如何在工作站上管理多个集群感兴趣，那么我在这里有一个更详细的演练 [here](https://vzilla.co.uk/vzilla-blog/building-the-home-lab-kubernetes-playground-part-6)。

I have added this list which are walkthrough blogs I have done around different Kubernetes clusters being deployed.
我添加了这个列表，其中包含我针对不同 Kubernetes 集群部署所做的一些演练博客。

- [Kubernetes playground – How to choose your platform](https://vzilla.co.uk/vzilla-blog/building-the-home-lab-kubernetes-playground-part-1)
- [Kubernetes 演练场 – 如何选择你的平台](https://vzilla.co.uk/vzilla-blog/building-the-home-lab-kubernetes-playground-part-1)
- [Kubernetes playground – Setting up your cluster](https://vzilla.co.uk/vzilla-blog/building-the-home-lab-kubernetes-playground-part-2)
- [Kubernetes 演练场 – 设置你的集群](https://vzilla.co.uk/vzilla-blog/building-the-home-lab-kubernetes-playground-part-2)
- [Getting started with Amazon Elastic Kubernetes Service (Amazon EKS)](https://vzilla.co.uk/vzilla-blog/getting-started-with-amazon-elastic-kubernetes-service-amazon-eks)
- [Amazon Elastic Kubernetes Service (Amazon EKS) 入门](https://vzilla.co.uk/vzilla-blog/getting-started-with-amazon-elastic-kubernetes-service-amazon-eks)
- [Getting started with Microsoft Azure Kubernetes Service (AKS)](https://vzilla.co.uk/vzilla-blog/getting-started-with-microsoft-azure-kubernetes-service-aks)
- [Microsoft Azure Kubernetes Service (AKS) 入门](https://vzilla.co.uk/vzilla-blog/getting-started-with-microsoft-azure-kubernetes-service-aks)
- [Getting Started with Microsoft AKS – Azure PowerShell Edition](https://vzilla.co.uk/vzilla-blog/getting-started-with-microsoft-aks-azure-powershell-edition)
- [Microsoft AKS 入门 – Azure PowerShell 版本](https://vzilla.co.uk/vzilla-blog/getting-started-with-microsoft-aks-azure-powershell-edition)
- [Getting started with Google Kubernetes Service (GKE)](https://vzilla.co.uk/vzilla-blog/getting-started-with-google-kubernetes-service-gke)
- [Google Kubernetes Service (GKE) 入门](https://vzilla.co.uk/vzilla-blog/getting-started-with-google-kubernetes-service-gke)
- [Kubernetes, How to – AWS Bottlerocket + Amazon EKS](https://vzilla.co.uk/vzilla-blog/kubernetes-how-to-aws-bottlerocket-amazon-eks)
- [Kubernetes, 操作指南 – AWS Bottlerocket + Amazon EKS](https://vzilla.co.uk/vzilla-blog/kubernetes-how-to-aws-bottlerocket-amazon-eks)
- [Getting started with CIVO Cloud](https://vzilla.co.uk/vzilla-blog/getting-started-with-civo-cloud)
- [CIVO Cloud 入门](https://vzilla.co.uk/vzilla-blog/getting-started-with-civo-cloud)
- [Minikube - Kubernetes Demo Environment For Everyone](https://vzilla.co.uk/vzilla-blog/project_pace-kasten-k10-demo-environment-for-everyone)
- [Minikube - 适用于所有人的 Kubernetes 演示环境](https://vzilla.co.uk/vzilla-blog/project_pace-kasten-k10-demo-environment-for-everyone)

### What we will cover in the series on Kubernetes

We have started covering some of these mentioned below but we are going to get more hands-on tomorrow with our second cluster deployment then we can start deploying applications into our clusters.
我们已经开始涵盖下面提到的一些内容，但明天我们将通过我们的第二个集群部署进行更多实践，然后我们就可以开始将应用程序部署到我们的集群中。

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

If you have FREE resources that you have used then please feel free to add them here via a PR to the repository and I will be happy to include them.
如果你有使用过的免费资源，请随时通过 PR 将它们添加到存储库中，我很乐意将其包含在内。

- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [Kubernetes 文档](https://kubernetes.io/docs/home/)
- [TechWorld with Nana - Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]](https://www.youtube.com/watch?v=X48VuDVv0do)
- [TechWorld with Nana - Kubernetes 初学者教程 [4 小时完整课程]](https://www.youtube.com/watch?v=X48VuDVv0do)
- [TechWorld with Nana - Kubernetes Crash Course for Absolute Beginners](https://www.youtube.com/watch?v=s_o8dwzRlu4)
- [TechWorld with Nana - 绝对初学者的 Kubernetes 速成课程](https://www.youtube.com/watch?v=s_o8dwzRlu4)
- [Kunal Kushwaha - Kubernetes Tutorial for Beginners | What is Kubernetes? Architecture Simplified!](https://www.youtube.com/watch?v=KVBON1lA9N8)
- [Kunal Kushwaha - Kubernetes 初学者教程 | 什么是 Kubernetes？架构简化！](https://www.youtube.com/watch?v=KVBON1lA9N8)

See you on [Day 53](day53.md)
[第 53 天](day53.md) 见