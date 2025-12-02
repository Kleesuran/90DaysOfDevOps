---
title: '#90DaysOfDevOps - Deploying your first Kubernetes Cluster - Day 51'
published: false
description: 90DaysOfDevOps - Deploying your first Kubernetes Cluster
tags: 'DevOps, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048778
---

## Deploying your first Kubernetes Cluster

In this post we are going to get a Kubernetes cluster up and running on our local machine using minikube, this will give us a baseline Kubernetes cluster for the rest of the Kubernetes section, although we will look at deploying a Kubernetes cluster also in VirtualBox later on.
在本文中，我们将使用 minikube 在本地机器上启动并运行一个 Kubernetes 集群，这将为我们接下来的 Kubernetes 部分提供一个基准集群，尽管我们稍后也会研究如何在 VirtualBox 中部署 Kubernetes 集群。
The reason for choosing this method vs spinning a managed Kubernetes cluster up in the public cloud is that this is going to cost money even with the free tier, I shared some blogs though if you would like to spin up that environment in the previous section [Day 50](day50.md).
之所以选择这种方法而不是在公共云中启动托管 Kubernetes 集群，是因为即使使用免费套餐，公共云也会产生费用。不过，如果您想在公共云中部署该环境，我在上一部分 [Day 50](day50.md) 中分享了一些相关博客。

### What is Minikube?

> “minikube quickly sets up a local Kubernetes cluster on macOS, Linux, and Windows. We proudly focus on helping application developers and new Kubernetes users.”
> “minikube 可以在 macOS、Linux 和 Windows 上快速设置本地 Kubernetes 集群。我们专注于帮助应用开发者和新的 Kubernetes 用户。”

You might not fit into the above but I have found minikube is a great little tool if you just want to test something out in a Kubernetes fashion, you can easily deploy an app and they have some amazing add-ons which I will also cover.
您可能不属于上述人群，但我发现 minikube 是一个很棒的小工具，如果您只是想以 Kubernetes 的方式测试一些东西，您可以轻松部署应用程序，并且它还有一些令人惊叹的附加组件，我也会介绍这些。
To begin with, regardless of your workstation OS, you can run minikube. First, head over to the [project page here](https://minikube.sigs.k8s.io/docs/start/). The first option you have is choosing your installation method. I did not use this method, but you might choose to vs my way (my way is coming up).
首先，无论您的工作站操作系统是什么，您都可以运行 minikube。首先，请访问[项目页面](https://minikube.sigs.k8s.io/docs/start/)。您选择的第一个选项是安装方法。我没有使用这种方法，但您可能会选择它而不是我的方式（我的方式即将介绍）。
mentioned below it states that you need to have a “Container or virtual machine managers, such as Docker, Hyper kit, Hyper-V, KVM, Parallels, Podman, VirtualBox, or VMware” this is where MiniKube will run and the easy option and unless stated in the repository I am using Docker. You can install Docker on your system using the following [link](https://docs.docker.com/get-docker/).
下面提到，您需要拥有一个“容器或虚拟机管理器，例如 Docker、Hyper kit、Hyper-V、KVM、Parallels、Podman、VirtualBox 或 VMware”，这是 MiniKube 运行的地方，也是一个简单的选项，除非在仓库中另有说明，我使用的是 Docker。您可以使用以下[链接](https://docs.docker.com/get-docker/)在系统上安装 Docker。

![](Images/Day51_Kubernetes1.png)

### My way of installing minikube and other prereqs…

I have been using arkade for some time now to get all those Kubernetes tools and CLIs, you can see the installation steps on this [github repository](https://github.com/alexellis/arkade) for getting started with Arkade. I have also mentioned this in other blog posts where I needed something installed. The simplicity of just hitting arkade get and then seeing if your tool or cli is available in handy. In the Linux section, we spoke about package manager and the process for getting our software, you can think about Arkade as that marketplace for all your apps and CLIs for Kubernetes. A very handy little tool to have on your systems, written in Golang and cross-platform.
我使用 arkade 有一段时间了，用来获取所有 Kubernetes 工具和 CLI，您可以在这个 [github 仓库](https://github.com/alexellis/arkade)上查看 Arkade 的入门安装步骤。在其他需要安装某些软件的博客文章中我也提到过它。只需输入 `arkade get` 然后查看您的工具或 CLI 是否可用，这种简单性非常方便。在 Linux 部分，我们讨论了包管理器和获取软件的过程，您可以将 Arkade 视为 Kubernetes 所有应用程序和 CLI 的市场。它是一个非常方便的小工具，用 Golang 编写，支持跨平台。

![](Images/Day51_Kubernetes2.png)

As part of the long list of available apps within arkade minikube is one of them so with a simple `arkade get minikube` command we are now downloading the binary and we are good to go.
作为 arkade 中可用应用程序长列表的一部分，minikube 是其中之一，因此只需简单的 `arkade get minikube` 命令，我们就可以下载二进制文件并开始使用了。

![](Images/Day51_Kubernetes3.png)

We will also need kubectl as part of our tooling so you can also get this via arkade or I believe that the minikube documentation brings this down as part of the curl commands mentioned above. We will cover more on kubectl later on in the post.
我们还需要 kubectl 作为我们的工具集的一部分，您也可以通过 arkade 获取它，或者我相信 minikube 文档中提到的 curl 命令也会将它下载下来。我们将在本文后面介绍更多关于 kubectl 的内容。

### Getting a Kubernetes cluster up and running

For this particular section, I want to cover the options available to us when it comes to getting a Kubernetes cluster up and running on your local machine. We could simply run the following command and it would spin up a cluster for you to use.
对于这一特定部分，我想介绍一下在本地机器上启动和运行 Kubernetes 集群时可用的选项。我们可以简单地运行以下命令，它就会为您启动一个集群供您使用。
minikube is used on the command line, and simply put once you have everything installed you can run `minikube start` to deploy your first Kubernetes cluster. You will see below that the Docker Driver is the default as to where we will be running our nested virtualisation node. I mentioned at the start of the post the other options available, the other options help when you want to expand what this local Kubernetes cluster needs to look like.
minikube 是在命令行上使用的，简而言之，安装好所有东西后，您可以运行 `minikube start` 来部署您的第一个 Kubernetes 集群。您将在下面看到 Docker Driver 是默认驱动程序，我们将在其中运行我们的嵌套虚拟化节点。我在文章开头提到了其他可用选项，这些选项在您想要扩展本地 Kubernetes 集群的样子时会很有帮助。
A single Minikube cluster is going to consist of a single docker container in this instance which will have the control plane node and worker node in one instance. Whereas typically you would separate those nodes. Something we will cover in the next section where we look at still home lab type Kubernetes environments but a little closer to production architecture.
在这种情况下，单个 Minikube 集群将包含一个 docker 容器实例，该容器将把控制平面节点和工作节点合二为一。然而，通常您会分离这些节点。我们将在下一节中介绍这一点，届时我们将研究仍然是家庭实验室类型的 Kubernetes 环境，但架构会更接近生产环境。

![](Images/Day51_Kubernetes4.png)

I have mentioned this a few times now, I like minikube because of the add-ons available, the ability to deploy a cluster with a simple command including all the required addons from the start helps me deploy the same required setup every time.
我现在已经提到过几次了，我喜欢 minikube 是因为它提供的附加组件，能够通过一个简单的命令部署集群，并从一开始就包含所有必需的附加组件，这有助于我每次都部署相同的所需设置。
Below you can see a list of those add-ons, I generally use the `CSI-host path-driver` and the `volumesnapshots` addons but you can see the long list below. Sure these addons can generally be deployed using Helm again something we will cover later on in the Kubernetes section but this makes things much simpler.
您可以在下面看到这些附加组件的列表，我通常使用 `CSI-host path-driver` 和 `volumesnapshots` 附加组件，但您可以在下面看到长长的列表。当然，这些附加组件通常可以使用 Helm 进行部署，这也是我们稍后将在 Kubernetes 部分介绍的内容，但这会让事情简单得多。

![](Images/Day51_Kubernetes5.png)

I am also defining in our project some additional configuration, apiserver is set to 6433 instead of a random API port, and I define the container runtime also to containerd however docker is default and CRI-O is also available. I am also setting a specific Kubernetes version.
我还在我们的项目中定义了一些额外的配置，apiserver 设置为 6433 而不是随机的 API 端口，并且我将容器运行时定义为 containerd（尽管 docker 是默认的，CRI-O 也可用）。我还设置了一个特定的 Kubernetes 版本。

![](Images/Day51_Kubernetes6.png)

Now we are ready to deploy our first Kubernetes cluster using minikube. I mentioned before though that you will also need `kubectl` to interact with your cluster. You can get kubectl installed using arkade with the command `arkade get kubectl`
现在我们准备好使用 minikube 部署我们的第一个 Kubernetes 集群了。不过我之前提到过，您还需要 `kubectl` 来与集群进行交互。您可以使用 arkade 通过命令 `arkade get kubectl` 安装 kubectl。

![](Images/Day51_Kubernetes7.png)

or you can download cross-platform from the following
或者您可以从以下链接下载跨平台版本：

- [Linux](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux)
- [macOS](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos)
- [Windows](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows)

Once you have kubectl installed we can then interact with our cluster with a simple command like `kubectl get nodes`
安装 kubectl 后，我们就可以使用 `kubectl get nodes` 这样的简单命令与集群进行交互了。

![](Images/Day51_Kubernetes8.png)

### What is kubectl?

We now have our minikube | Kubernetes cluster up and running and I have asked you to install both Minikube where I have explained at least what it does but I have not explained what kubectl is and what it does.
我们现在已经启动并运行了 minikube | Kubernetes 集群，我要求您安装 Minikube（我至少解释了它的作用），但我还没有解释 kubectl 是什么以及它的作用。
kubectl is a cli that is used or allows you to interact with Kubernetes clusters, we are using it here for interacting with our minikube cluster but we would also use kubectl for interacting with our enterprise clusters across the public cloud.
kubectl 是一个命令行工具（CLI），用于或允许您与 Kubernetes 集群进行交互。我们在这里使用它与我们的 minikube 集群进行交互，但我们也会使用 kubectl 与公共云中的企业集群进行交互。
We use kubectl to deploy applications and inspect and manage cluster resources. A much better [Overview of kubectl](https://kubernetes.io/docs/reference/kubectl/overview/) can be found here on the Kubernetes official documentation.
我们使用 kubectl 来部署应用程序、检查和管理集群资源。您可以在 Kubernetes 官方文档中找到更好的 [kubectl 概述](https://kubernetes.io/docs/reference/kubectl/overview/)。
kubectl interacts with the API server found on the Control Plane node which we briefly covered in an earlier post.
kubectl 与控制平面节点上的 API 服务器进行交互，我们在之前的文章中简要介绍了这一点。

### kubectl cheat sheet

Along with the official documentation, I have also found myself with this page open all the time when looking for kubectl commands. [Unofficial Kubernetes](https://unofficial-kubernetes.readthedocs.io/en/latest/)
除了官方文档之外，我在查找 kubectl 命令时，也发现自己一直打开这个页面：[Unofficial Kubernetes](https://unofficial-kubernetes.readthedocs.io/en/latest/)

| Listing Resources        |                                            |
| ------------------------ | ------------------------------------------ |
| kubectl get nodes        | List all nodes in cluster                  |
| kubectl get nodes        | 列出集群中的所有节点                       |
| kubectl get namespaces   | List all namespaces in cluster             |
| kubectl get namespaces   | 列出集群中的所有命名空间                   |
| kubectl get pods         | List all pods in default namespace cluster |
| kubectl get pods         | 列出默认命名空间中的所有 Pod               |
| kubectl get pods -n name | List all pods in the "name" namespace      |
| kubectl get pods -n name | 列出“name”命名空间中的所有 Pod             |

| Creating Resources            |                                             |
| ----------------------------- | ------------------------------------------- |
| kubectl create namespace name | Create a namespace called "name"            |
| kubectl create namespace name | 创建名为“name”的命名空间                    |
| kubectl create -f [filename]  | Create a resource from a JSON or YAML file: |
| kubectl create -f [filename]  | 从 JSON 或 YAML 文件创建资源：              |

| Editing Resources            |                   |
| ---------------------------- | ----------------- |
| kubectl edit svc/servicename | To edit a service |
| kubectl edit svc/servicename | 编辑服务          |

| More detail on Resources |                                                         |
| ------------------------ | ------------------------------------------------------- |
| kubectl describe nodes   | display the state of any number of resources in detail, |
| kubectl describe nodes   | 详细显示任意数量资源的状态，                          |

| Delete Resources   |                                                  |
| ------------------ | ------------------------------------------------ |
| kubectl delete pod | Remove resources, this can be from stdin or file |
| kubectl delete pod | 删除资源，这可以来自标准输入或文件               |

You will find yourself wanting to know the short names for some of the kubectl commands, for example `-n` is the short name for `namespace` which makes it easier to type a command but also if you are scripting anything you can have much tidier code.
您会发现自己想知道一些 kubectl 命令的短名称，例如 `-n` 是 `namespace` 的短名称，这使得输入命令更容易，而且如果您正在编写脚本，您可以拥有更整洁的代码。

| Short name | Full name                  |
| ---------- | -------------------------- |
| csr        | certificatesigningrequests |
| cs         | componentstatuses          |
| cm         | configmaps                 |
| ds         | daemonsets                 |
| deploy     | deployments                |
| ep         | endpoints                  |
| ev         | events                     |
| hpa        | horizontalpodautoscalers   |
| ing        | ingresses                  |
| limits     | limitranges                |
| ns         | namespaces                 |
| no         | nodes                      |
| pvc        | persistentvolumeclaims     |
| pv         | persistentvolumes          |
| po         | pods                       |
| pdb        | poddisruptionbudgets       |
| psp        | podsecuritypolicies        |
| rs         | replicasets                |
| rc         | replicationcontrollers     |
| quota      | resourcequotas             |
| sa         | serviceaccounts            |
| svc        | services                   |

The final thing to add here is that I created another project around minikube to help me quickly spin up demo environments to display data services and protect those workloads with Kasten K10, [Project Pace](https://github.com/MichaelCade/project_pace) can be found there and would love your feedback or interaction, it also displays or includes some automated ways of deploying your minikube clusters and creating different data services applications.
最后要补充的是，我围绕 minikube 创建了另一个项目，以帮助我快速启动演示环境，以展示数据服务并使用 Kasten K10 保护这些工作负载，[Project Pace](https://github.com/MichaelCade/project_pace) 可以在那里找到，我期待您的反馈或互动。它还展示或包含了一些自动化部署 minikube 集群和创建不同数据服务应用程序的方法。
Next up, we will get into deploying multiple nodes into virtual machines using VirtualBox but we are going to hit the easy button there as we did in the Linux section where we used vagrant to quickly spin up the machines and deploy our software how we want them.
接下来，我们将使用 VirtualBox 在虚拟机中部署多个节点，但我们会像在 Linux 部分一样，使用简易按钮（即 Vagrant）来快速启动机器并按我们希望的方式部署软件。
I added this list to the post yesterday which are walkthrough blogs I have done around different Kubernetes clusters being deployed.
我昨天将此列表添加到了文章中，这些是我围绕部署不同 Kubernetes 集群所做的演练博客。

- [Kubernetes playground – How to choose your platform](https://vzilla.co.uk/vzilla-blog/building-the-home-lab-kubernetes-playground-part-1)
- [Kubernetes playground – Setting up your cluster](https://vzilla.co.uk/vzilla-blog/building-the-home-lab-kubernetes-playground-part-2)
- [Getting started with Amazon Elastic Kubernetes Service (Amazon EKS)](https://vzilla.co.uk/vzilla-blog/getting-started-with-amazon-elastic-kubernetes-service-amazon-eks)
- [Getting started with Microsoft Azure Kubernetes Service (AKS)](https://vzilla.co.uk/vzilla-blog/getting-started-with-microsoft-azure-kubernetes-service-aks)
- [Getting Started with Microsoft AKS – Azure PowerShell Edition](https://vzilla.co.uk/vzilla-blog/getting-started-with-microsoft-aks-azure-powershell-edition)
- [Getting started with Google Kubernetes Service (GKE)](https://vzilla.co.uk/vzilla-blog/getting-started-with-google-kubernetes-service-gke)
- [Kubernetes, How to – AWS Bottlerocket + Amazon EKS](https://vzilla.co.uk/vzilla-blog/kubernetes-how-to-aws-bottlerocket-amazon-eks)
- [Getting started with CIVO Cloud](https://vzilla.co.uk/vzilla-blog/getting-started-with-civo-cloud)
- [Minikube - Kubernetes Demo Environment For Everyone](https://vzilla.co.uk/vzilla-blog/project_pace-kasten-k10-demo-environment-for-everyone)
- [Minikube - Deploy Minikube Using Vagrant and Ansible on VirtualBox](https://medium.com/techbeatly/deploy-minikube-using-vagrant-and-ansible-on-virtualbox-infrastructure-as-code-2baf98188847)

### What we will cover in the series on Kubernetes

We have started covering some of these mentioned below but we are going to get more hands-on tomorrow with our second cluster deployment then we can start deploying applications into our clusters.
我们已经开始涉及下面提到的一些内容，但明天我们将通过第二次集群部署进行更多实践操作，然后我们就可以开始在集群中部署应用程序了。

- Kubernetes Architecture
- Kubectl Commands
- Kubernetes YAML
- Kubernetes Ingress
- Kubernetes Services
- Helm Package Manager
- Persistent Storage
- Stateful Apps

## Resources

If you have FREE resources that you have used then please feel free to add them here via a PR to the repository and I will be happy to include them.
如果您有使用过的免费资源，请随时通过向仓库提交 PR 的方式将其添加到此处，我将乐意收录它们。

- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [TechWorld with Nana - Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]](https://www.youtube.com/watch?v=X48VuDVv0do)
- [TechWorld with Nana - Kubernetes Crash Course for Absolute Beginners](https://www.youtube.com/watch?v=s_o8dwzRlu4)
- [Kunal Kushwaha - Kubernetes Tutorial for Beginners | What is Kubernetes? Architecture Simplified!](https://www.youtube.com/watch?v=KVBON1lA9N8)
- [Techbeatly - Deploy Minikube Using Vagrant and Ansible on VirtualBox](https://www.youtube.com/watch?v=xPLQqHbp9BM&t=371s)

See you on [Day 52](day52.md)
我们第 [52 天](day52.md)见