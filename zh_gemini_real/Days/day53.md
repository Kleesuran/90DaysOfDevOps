---
title: '#90DaysOfDevOps - Rancher Overview - Hands On - Day 53'
published: false
description: 90DaysOfDevOps - Rancher Overview - Hands On
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048742
---

## Rancher Overview - Hands On

In this section we are going to take a look at Rancher, so far everything we have done has been in the cli and using kubectl but we have a few good UIs and multi-cluster management tools to give our operations teams good visibility into our cluster management.
在本节中，我们将了解 Rancher。到目前为止，我们所做的一切都是在命令行界面（cli）中使用 kubectl 完成的，但是我们有一些优秀的 UI 和多集群管理工具，可以为我们的运维团队提供良好的集群管理可见性。

Rancher is according to their [site](https://rancher.com/)
根据他们的[网站](https://rancher.com/)，Rancher 是：

> Rancher is a complete software stack for teams adopting containers. It addresses the operational and security challenges of managing multiple Kubernetes clusters across any infrastructure while providing DevOps teams with integrated tools for running containerized workloads.
> Rancher 是为采用容器的团队提供的完整软件堆栈。它解决了跨任何基础架构管理多个 Kubernetes 集群的操作和安全挑战，同时为 DevOps 团队提供了运行容器化工作负载的集成工具。

Rancher enables us to deploy production-grade Kubernetes clusters from pretty much any location and then provides centralised authentication, access control and observability.
Rancher 使我们能够从几乎任何位置部署生产级别的 Kubernetes 集群，然后提供集中式身份验证、访问控制和可观察性。
I mentioned in a previous section that there is almost an overwhelming choice when it comes to Kubernetes and where you should or could run them, looking at Rancher it doesn't matter where they are.
我在前一节中提到，关于 Kubernetes 以及你应该或可以在哪里运行它们，选择几乎多到令人不知所措，而看向 Rancher，集群在哪里运行就不重要了。

### Deploy Rancher

The first thing we need to do is deploy Rancher on our local workstation, there are a few ways and locations you can choose to proceed with this step, for me I want to use my local workstation and run rancher as a docker container.
我们需要做的第一件事是在本地工作站上部署 Rancher，你可以选择几种方式和位置来执行此步骤，对我来说，我希望使用我的本地工作站并将 Rancher 作为 Docker 容器运行。
By running the command below we will pull down a container image and then have access to the rancher UI.
通过运行以下命令，我们将拉取容器镜像，然后就可以访问 Rancher UI。

Other rancher deployment methods are available [Rancher Quick-Start-Guide](https://rancher.com/docs/rancher/v2.6/en/quick-start-guide/deployment/)
其他 Rancher 部署方法可参考 [Rancher 快速入门指南](https://rancher.com/docs/rancher/v2.6/en/quick-start-guide/deployment/)

`sudo docker run -d --restart=unless-stopped -p 80:80 -p 443:443 --privileged rancher/rancher`

As you can see in our Docker Desktop we have a running rancher container.
如您在 Docker Desktop 中所见，我们有一个正在运行的 Rancher 容器。

![](Images/Day53_Kubernetes1.png)

### Accessing Rancher UI

With the above container running we should be able to navigate to it via a web page.
运行上述容器后，我们应该能够通过网页导航到它。
`https://localhost` will bring up a login page as per below.
`https://localhost` 将显示如下登录页面。

![](Images/Day53_Kubernetes2.png)

Follow the instructions below to get the password required.
请按照以下说明获取所需密码。
Because I am using Windows I chose to use bash for Windows because of the grep command required.
因为我使用的是 Windows，所以我选择使用 Windows 版 bash，因为它需要 grep 命令。

![](Images/Day53_Kubernetes3.png)

We can then take the above password and log in, the next page is where we can define a new password.
然后我们可以使用上述密码登录，下一页是我们定义新密码的地方。

![](Images/Day53_Kubernetes4.png)

Once we have done the above we will then be logged in and we can see our opening screen.
完成上述操作后，我们将登录并看到起始屏幕。
As part of the Rancher deployment, we will also see a local K3s cluster provisioned.
作为 Rancher 部署的一部分，我们还将看到一个本地 K3s 集群已置备。

![](Images/Day53_Kubernetes5.png)

### A quick tour of rancher

The first thing for us to look at is our locally deployed K3S cluster
我们要看的第一个是本地部署的 K3S 集群
You can see below that we get a good visual of what is happening inside our cluster.
您可以在下面看到我们集群内部正在发生的事情的良好视觉效果。
This is the default deployment and we have not yet deployed anything to this cluster.
这是默认部署，我们尚未向此集群部署任何内容。
You can see it is made up of 1 node and has 5 deployments.
您可以看到它由 1 个节点组成，有 5 个部署。
Then you can also see that there are some stats on pods, cores and memory.
然后您还可以看到一些关于 Pod、内核和内存的统计信息。

![](Images/Day53_Kubernetes6.png)

On the left-hand menu, we also have an Apps & Marketplace tab, this allows us to choose applications we would like to run on our clusters, as mentioned previously Rancher gives us the capability of running or managing several different clusters.
在左侧菜单上，我们还有一个“应用和市场”（Apps & Marketplace）选项卡，这允许我们选择希望在集群上运行的应用程序，如前所述，Rancher 使我们能够运行或管理多个不同的集群。
With the marketplace, we can deploy our applications very easily.
有了这个市场，我们可以非常轻松地部署我们的应用程序。

![](Images/Day53_Kubernetes7.png)

Another thing to mention is that if you did need to get access to any cluster being managed by Rancher in the top right you can open a kubectl shell to the selected cluster.
另一点值得一提的是，如果您确实需要访问 Rancher 管理的任何集群，您可以在右上角打开一个到所选集群的 kubectl shell。

![](Images/Day53_Kubernetes8.png)

### Create a new cluster

Over the past two sessions, we have created a minikube cluster locally and we have used Vagrant with VirtualBox to create a 3 node Kubernetes cluster, with Rancher we can also create clusters.
在过去的两次会话中，我们在本地创建了一个 minikube 集群，并使用 Vagrant 和 VirtualBox 创建了一个 3 节点 Kubernetes 集群，使用 Rancher 我们也可以创建集群。
In the [Rancher Folder](Kubernetes/Rancher) you will find additional vagrant files that will build out the same 3 nodes but without the steps for creating our Kubernetes cluster (we want Rancher to do this for us)
在 [Rancher 文件夹](Kubernetes/Rancher)中，您将找到额外的 Vagrant 文件，它们将构建相同的 3 个节点，但没有创建 Kubernetes 集群的步骤（我们希望 Rancher 为我们完成此操作）

We do however want docker installed and for the OS to be updated so you will still see the `common.sh` script being run on each of our nodes.
但是，我们确实希望安装 Docker 并更新操作系统，因此您仍然会看到 `common.sh` 脚本在我们的每个节点上运行。
This will also install Kubeadm, Kubectl etc. But it will not run the Kubeadm commands to create and join our nodes into a cluster.
这还将安装 Kubeadm、Kubectl 等。但它不会运行 Kubeadm 命令来创建并将我们的节点加入集群。

We can navigate to our vagrant folder location and we can simply run `vagrant up` and this will begin the process of creating our 3 VMs in VirtualBox.
我们可以导航到我们的 Vagrant 文件夹位置，然后只需运行 `vagrant up`，这将开始在 VirtualBox 中创建 3 个 VM 的过程。

![](Images/Day53_Kubernetes9.png)

Now that we have our nodes or VMs in place and ready, we can then use Rancher to create our new Kubernetes cluster.
现在我们的节点或虚拟机已就位并准备就绪，我们就可以使用 Rancher 来创建新的 Kubernetes 集群。
The first screen to create your cluster gives you some options as to where your cluster is, i.e are you using the public cloud managed Kubernetes services, vSphere or something else.
创建集群的第一个屏幕为您提供了一些关于集群位置的选项，即您是使用公共云托管的 Kubernetes 服务、vSphere 还是其他服务。

![](Images/Day53_Kubernetes10.png)

We will be choosing "custom" as we are not using one of the integrated platforms.
我们将选择“自定义”（custom），因为我们没有使用任何集成平台。
The opening page is where you define your cluster name (it says local below but you cannot use local, our cluster is called vagrant.) you can define Kubernetes versions here, network providers and some other configuration options to get your Kubernetes cluster up and running.
打开的页面是您定义集群名称的地方（它在下面写着 local，但您不能使用 local，我们的集群命名为 vagrant）。您可以在此处定义 Kubernetes 版本、网络提供商以及其他一些配置选项，以启动和运行您的 Kubernetes 集群。

![](Images/Day53_Kubernetes11.png)

The next page is going to give you the registration code that needs to be run on each of your nodes with the appropriate services to be enabled.
下一页将为您提供需要在每个节点上运行的注册代码，以启用相应的服务。
etcd, control-plane and worker.
包括 etcd、控制平面（control-plane）和工作节点（worker）。
For our master node, we want etcd and control-plane so the command can be seen below.
对于我们的主节点，我们需要 etcd 和控制平面，因此命令如下所示。

![](Images/Day53_Kubernetes12.png)

```
sudo docker run -d --privileged --restart=unless-stopped --net=host -v /etc/kubernetes:/etc/kubernetes -v /var/run:/var/run  rancher/rancher-agent:v2.6.3 --server https://10.0.0.1 --token mpq8cbjjwrj88z4xmf7blqxcfmwdsmq92bmwjpphdkklfckk5hfwc2 --ca-checksum a81944423cbfeeb92be0784edebba1af799735ebc30ba8cbe5cc5f996094f30b --etcd --controlplane
```

If networking is configured correctly then you should pretty quickly see the following in your rancher dashboard, indicating that the first master node is now being registered and the cluster is being created.
如果网络配置正确，您应该很快在 Rancher 仪表板中看到以下内容，表明第一个主节点正在注册，并且正在创建集群。

![](Images/Day53_Kubernetes13.png)

We can then repeat the registration process for each of the worker nodes with the following command and after some time you will have your cluster up and running with the ability to leverage the marketplace to deploy your applications.
然后，我们可以使用以下命令对每个工作节点重复注册过程，一段时间后，您的集群将启动并运行，并能够利用市场部署您的应用程序。

```
sudo docker run -d --privileged --restart=unless-stopped --net=host -v /etc/kubernetes:/etc/kubernetes -v /var/run:/var/run  rancher/rancher-agent:v2.6.3 --server https://10.0.0.1 --token mpq8cbjjwrj88z4xmf7blqxcfmwdsmq92bmwjpphdkklfckk5hfwc2 --ca-checksum a81944423cbfeeb92be0784edebba1af799735ebc30ba8cbe5cc5f996094f30b --worker
```

![](Images/Day53_Kubernetes14.png)

Over the last 3 sessions, we have used a few different ways to get up and running with a Kubernetes cluster, over the remaining days we are going to look at the application side of the platform arguably the most important.
在过去的 3 次会话中，我们使用了几种不同的方法来启动和运行 Kubernetes 集群。在接下来的几天里，我们将研究该平台的应用程序侧，这可以说是最重要的部分。
We will look into services and being able to provision and use our service in Kubernetes.
我们将研究服务以及如何在 Kubernetes 中置备和使用我们的服务。

I have been told since that the requirements around bootstrapping rancher nodes require those VMs to have 4GB ram or they will crash-loop, I have since updated as our worker nodes had 2GB.
后来有人告诉我，围绕 Rancher 节点引导的需求是要求这些 VM 具有 4GB 内存，否则它们将崩溃循环（crash-loop），我已经更新了配置，因为我们之前的工作节点只有 2GB。

### What we will cover in the series on Kubernetes

We have started covering some of these mentioned below but we are going to get more hands-on tomorrow with our second cluster deployment then we can start deploying applications into our clusters.
我们已经开始涵盖下面提到的一些内容，但明天我们将通过我们的第二个集群部署进行更多的实践操作，然后我们就可以开始将应用程序部署到我们的集群中。

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
如果您使用了免费资源，请随时通过向存储库提交 PR 将它们添加到此处，我很乐意将其收录。

- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [TechWorld with Nana - Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]](https://www.youtube.com/watch?v=X48VuDVv0do)
- [TechWorld with Nana - Kubernetes Crash Course for Absolute Beginners](https://www.youtube.com/watch?v=s_o8dwzRlu4)
- [Kunal Kushwaha - Kubernetes Tutorial for Beginners | What is Kubernetes? Architecture Simplified!](https://www.youtube.com/watch?v=KVBON1lA9N8)

See you on [Day 54](day54.md)
[第 54 天](day54.md)见