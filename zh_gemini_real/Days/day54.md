---
title: '#90DaysOfDevOps - Kubernetes Application Deployment - Day 54'
published: false
description: 90DaysOfDevOps - Kubernetes Application Deployment
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048764
---

## Kubernetes Application Deployment

Now we finally get to deploying some applications into our clusters, some would say this is the reason Kubernetes exists, for Application delivery.
现在我们终于可以开始在集群中部署应用程序了，有人说，这就是 Kubernetes 存在的意义——实现应用程序交付。

The idea here is that we can take our container images and now deploy these as pods into our Kubernetes cluster to take advantage of Kubernetes as a container orchestrator.
这里的想法是，我们可以利用我们的容器镜像，将其作为 Pod 部署到 Kubernetes 集群中，从而利用 Kubernetes 作为容器编排器的优势。

### Deploying Apps into Kubernetes

There are several ways in which we can deploy our applications into our Kubernetes cluster, we will cover two of the most common approaches which will be YAML files and Helm charts.
有多种方法可以将应用程序部署到 Kubernetes 集群中，我们将介绍两种最常见的方法：YAML 文件和 Helm charts。

We will be using our minikube cluster for these application deployments. We will be walking through some of the previously mentioned components or building blocks of Kubernetes.
我们将使用 minikube 集群进行这些应用程序部署。我们将逐步介绍一些前面提到过的 Kubernetes 组件或构建块。

All through this section and the Container section we have discussed images and the benefits of Kubernetes and how we can handle scale quite easily on this platform.
贯穿本节和容器部分，我们讨论了镜像、Kubernetes 的优势以及如何在该平台上轻松处理扩展。

In this first step, we are simply going to create a stateless application within our minikube cluster. We will be using the defacto standard stateless application in our first demonstration `nginx` we will configure a Deployment, which will provide us with our pods and then we will also create a service which will allow us to navigate to the simple web server hosted by the nginx pod. All of this will be contained in a namespace.
在第一步中，我们将简单地在 minikube 集群中创建一个无状态应用程序。在我们的第一个演示中，我们将使用事实上的标准无状态应用程序 `nginx`。我们将配置一个 Deployment（部署），它将为我们提供 Pod，然后我们还将创建一个 Service（服务），它将允许我们导航到由 nginx Pod 托管的简单 Web 服务器。所有这些都将包含在一个 Namespace（命名空间）中。

![](Images/Day54_Kubernetes1.png)

### Creating the YAML

In the first demo, we want to define everything we do with YAML, we could have a whole section on YAML but I am going to skim over this and leave some resources at the end that will cover YAML in more detail.
在第一个演示中，我们希望使用 YAML 定义我们所做的所有事情，我们可以专门用一整节来介绍 YAML，但我将略过此部分，并在最后留下一些更详细介绍 YAML 的资源。

We could create the following as one YAML file or we could break this down for each aspect of our application, i.e this could be separate files for namespace, deployment and service creation but in this file, below we separate these by using `---` in one file. You can find this file located [here](Kubernetes) (File name:- nginx-stateless-demo.YAML)
我们可以将以下内容创建一个 YAML 文件，或者可以针对应用程序的每个方面将其分解，即命名空间、部署和服务创建可以分别使用单独的文件，但在下面的文件中，我们使用 `---` 在一个文件中将它们分隔开。您可以在[此处](Kubernetes)找到此文件（文件名：- nginx-stateless-demo.YAML）

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: nginx
  "labels": {
    "name": "nginx"
  }
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: nginx
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  namespace: nginx
spec:
  selector:
    app: nginx-deployment
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

### Checking our cluster

Before we deploy anything we should just make sure that we have no existing namespaces called `nginx` we can do this by running the `kubectl get namespace` command and as you can see below we do not have a namespace called `nginx`
在部署任何内容之前，我们应该确保没有名为 `nginx` 的现有命名空间，我们可以通过运行 `kubectl get namespace` 命令来做到这一点，如下所示，我们目前没有名为 `nginx` 的命名空间。

![](Images/Day54_Kubernetes2.png)

### Time to deploy our App

Now we are ready to deploy our application to our minikube cluster, this same process will work on any other Kubernetes cluster.
现在我们准备将应用程序部署到 minikube 集群中，同样的过程也适用于任何其他 Kubernetes 集群。

We need to navigate to our YAML file location and then we can run `kubectl create -f nginx-stateless-demo.yaml` which you then see that 3 objects have been created, and we have a namespace, deployment and service.
我们需要导航到我们的 YAML 文件位置，然后运行 `kubectl create -f nginx-stateless-demo.yaml`，然后您会看到创建了 3 个对象，包括一个命名空间、一个部署和一个服务。

![](Images/Day54_Kubernetes3.png)

Let's run the command again to see our available namespaces in our cluster `kubectl get namespace` and you can now see that we have our new namespace.
让我们再次运行命令 `kubectl get namespace` 来查看集群中可用的命名空间，您现在可以看到我们有了新的命名空间。

![](Images/Day54_Kubernetes5.png)

If we then check our namespace for pods using `kubectl get pods -n nginx` you will see that we have 1 pod in a ready and running state.
如果我们随后使用 `kubectl get pods -n nginx` 检查命名空间中的 Pod，您将看到我们有一个处于就绪 (ready) 运行状态的 Pod。

![](Images/Day54_Kubernetes4.png)

We can also check our service is created by running `kubectl get service -n nginx`
我们也可以通过运行 `kubectl get service -n nginx` 来检查我们的服务是否创建成功。

![](Images/Day54_Kubernetes6.png)

Finally, we can then go and check our deployment, the deployment is where and how we keep our desired configuration.
最后，我们可以去检查我们的 Deployment（部署），Deployment 是我们保存期望配置的地方和方式。

![](Images/Day54_Kubernetes7.png)

The above takes a few commands that are worth knowing but you can also use `kubectl get all -n nginx` to see everything we deployed with that one YAML file.
上述操作需要一些值得了解的命令，但您也可以使用 `kubectl get all -n nginx` 来查看我们使用该 YAML 文件部署的所有内容。

![](Images/Day54_Kubernetes8.png)

You will notice in the above that we also have a replicaset, in our deployment we define how many replicas of our image we would like to deploy. This was set to 1 initially, but if we wanted to quickly scale our application then we can do these several ways.
您会注意到上图中我们还有一个 ReplicaSet（副本集），在我们的 Deployment 中，我们定义了想要部署多少个镜像副本。它最初设置为 1，但如果我们需要快速扩展应用程序，我们可以通过几种方式实现。

We can edit our file using `kubectl edit deployment nginx-deployment -n nginx` which will open a text editor within your terminal and enable you to modify your deployment.
我们可以使用 `kubectl edit deployment nginx-deployment -n nginx` 来编辑文件，这将在您的终端中打开一个文本编辑器，使您能够修改部署。

![](Images/Day54_Kubernetes9.png)

Upon saving the above in your text editor within the terminal if there were no issues and the correct formatting was used then you should see additional deployed in your namespace.
如果在终端内的文本编辑器中保存上述内容时没有问题并使用了正确的格式，那么您应该会看到命名空间中有额外的 Pod 被部署。

![](Images/Day54_Kubernetes10.png)

We can also make a change to the number of replicas using kubectl and the `kubectl scale deployment nginx-deployment --replicas=10 -n nginx`
我们还可以使用 kubectl 和命令 `kubectl scale deployment nginx-deployment --replicas=10 -n nginx` 来更改副本的数量。

![](Images/Day54_Kubernetes11.png)

We can equally use this method to scale our application down back to 1 again if we wish to use either method. I used the edit option but you can also use the scale command above.
如果我们愿意，也可以使用此方法将应用程序再次缩减回 1。我使用了编辑选项，但您也可以使用上面的 scale 命令。

![](Images/Day54_Kubernetes12.png)

Hopefully, here you can see the use case not only are things super fast to spin up and down but we have the ability to quickly scale up and down our applications. If this was a web server we could scale up during busy times and down when the load is quiet.
希望在这里您可以看到用例：不仅启动和停止的速度非常快，而且我们还具备快速扩展和缩减应用程序的能力。如果这是一个 Web 服务器，我们可以在繁忙时段进行扩展，在负载较低时进行缩减。

### Exposing our app

But how do we access our web server?
但是我们如何访问我们的 Web 服务器呢？

If you look above at our service you will see there is no External IP available so we cannot just open a web browser and expect this to be there magically. For access, we have a few options.
如果您查看上面的服务，您会发现没有可用的外部 IP (External IP)，因此我们不能直接打开 Web 浏览器并期望它神奇地出现。对于访问，我们有几个选项。

**ClusterIP** - The IP you do see is a ClusterIP this is on an internal network on the cluster. Only things within the cluster can reach this IP.
**ClusterIP** - 您确实看到的 IP 是 ClusterIP，它位于集群的内部网络上。只有集群内的东西才能访问此 IP。

**NodePort** - Exposes the service on the same port of each of the selected nodes in the cluster using NAT.
**NodePort** - 使用 NAT 将服务公开给集群中每个选定节点的相同端口。

**LoadBalancer** - Creates an external load balancer in the current cloud, we are using minikube but also if you have built your own Kubernetes cluster i.e what we did in VirtualBox you would need to deploy a LoadBalancer such as metallb into your cluster to provide this functionality.
**LoadBalancer** - 在当前云中创建一个外部负载均衡器，我们正在使用 minikube，但如果您构建了自己的 Kubernetes 集群（例如我们在 VirtualBox 中所做的），您将需要将 metallb 等负载均衡器部署到您的集群中以提供此功能。

**Port-Forward** - We also have the ability to Port Forward, which allows you to access and interact with internal Kubernetes cluster processes from your localhost. This option is only for testing and fault finding.
**Port-Forward** - 我们还具备端口转发 (Port Forward) 的功能，它允许您从本地主机访问和与内部 Kubernetes 集群进程进行交互。此选项仅用于测试和故障排除。

We now have a few options to choose from, Minikube has some limitations or differences I should say to a full-blown Kubernetes cluster.
现在我们有了一些选择，Minikube 与成熟的 Kubernetes 集群相比有一些限制或区别（我应该这样说）。

We could simply run the following command to port forward our access using our local workstation.
我们可以简单地运行以下命令，使用我们的本地工作站进行端口转发访问。

```bash
kubectl port-forward deployment/nginx-deployment -n nginx 8090:80
```

![](Images/Day54_Kubernetes13.png)

note that when you run the above command this terminal is now unusable as this is acting as your port forward to your local machine and port.
请注意，当您运行上述命令时，该终端现在无法使用，因为它正充当到本地机器和端口的端口转发通道。

![](Images/Day54_Kubernetes14.png)

We are now going to run through specifically with Minikube how we can expose our application. We can also use minikube to create a URL to connect to a service [More details](https://minikube.sigs.k8s.io/docs/commands/service/)
现在我们将专门介绍如何使用 Minikube 来暴露我们的应用程序。我们还可以使用 minikube 来创建一个 URL 以连接到服务 [更多详情](https://minikube.sigs.k8s.io/docs/commands/service/)

First of all, we will delete our service using `kubectl delete service nginx-service -n nginx`
首先，我们将使用 `kubectl delete service nginx-service -n nginx` 删除我们的服务。

Next, we are going to create a new service using `kubectl expose deployment nginx-deployment --name nginx-service --namespace nginx --port=80 --type=NodePort` notice here that we are going to use the expose and change the type to NodePort.
接下来，我们将使用 `kubectl expose deployment nginx-deployment --name nginx-service --namespace nginx --port=80 --type=NodePort` 创建一个新服务。请注意，这里我们将使用 expose 并将类型更改为 NodePort。

![](Images/Day54_Kubernetes15.png)

Finally in a new terminal run `minikube --profile='mc-demo' service nginx-service --URL -n nginx` to create a tunnel for our service.
最后，在一个新的终端中运行 `minikube --profile='mc-demo' service nginx-service --URL -n nginx` 为我们的服务创建一个隧道。

![](Images/Day54_Kubernetes16.png)

Open a browser or control and click on the link in your terminal.
打开浏览器或按住 Control 键并单击终端中的链接。

![](Images/Day54_Kubernetes17.png)

### Helm

Helm is another way in which we can deploy our applications. Known as "The package manager for Kubernetes" You can find out more [here](https://helm.sh/)
Helm 是我们可以部署应用程序的另一种方式。它被称为“Kubernetes 的包管理器”。您可以在[此处](https://helm.sh/)了解更多信息。

Helm is a package manager for Kubernetes. Helm could be considered the Kubernetes equivalent of yum or apt. Helm deploys charts, which you can think of like a packaged application., it is a blueprint for your pre-configured application resources which can be deployed as one easy-to-use chart. You can then deploy another version of the chart with a different set of configurations.
Helm 是 Kubernetes 的包管理器。Helm 可以被认为是 Kubernetes 中 yum 或 apt 的等价物。Helm 部署 charts，您可以将其视为打包的应用程序，它是预配置应用程序资源的蓝图，可以作为一个易于使用的 chart 进行部署。然后，您可以使用不同的配置集部署 chart 的另一个版本。

They have a site where you can browse all the Helm charts available and of course, you can create your own. The documentation is also clear and concise and not as daunting as when I first started hearing the term helm amongst all of the other new words in this space.
他们有一个网站，您可以在其中浏览所有可用的 Helm charts，当然，您也可以创建自己的 charts。它的文档也清晰简洁，不像我刚开始在这个领域听到所有其他新术语时那样令人望而生畏。

It is super simple to get Helm up and running or installed. Simply. You can find the binaries and download links here for pretty much all distributions including your RaspberryPi arm64 devices.
启动或安装 Helm 非常简单。您可以找到适用于几乎所有发行版（包括 RaspberryPi arm64 设备）的二进制文件和下载链接。

Or you can use an installer script, the benefit here is that the latest version of the helm will be downloaded and installed.
或者您可以使用安装脚本，这样做的好处是 Helm 的最新版本将被下载和安装。

```shell
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3

chmod 700 get_helm.sh

./get_helm.sh
```

Finally, there is also the option to use a package manager for the application manager, homebrew for mac, chocolatey for windows, apt with Ubuntu/Debian, snap and pkg also.
最后，还可以选择使用应用程序管理器本身的包管理器，例如适用于 Mac 的 homebrew、适用于 Windows 的 chocolatey、适用于 Ubuntu/Debian 的 apt，以及 snap 和 pkg。

Helm so far seems to be the go-to way to get different test applications downloaded and installed in your cluster.
到目前为止，Helm 似乎是用于在集群中下载和安装各种测试应用程序的首选方法。

A good resource to link here would be [ArtifactHUB](https://artifacthub.io/) which is a resource to find, install and publish Kubernetes packages. I will also give a shout-out to [KubeApps](https://kubeapps.com/) which is a UI to display helm charts.
这里要链接的一个很好的资源是 [ArtifactHUB](https://artifacthub.io/)，它是查找、安装和发布 Kubernetes 软件包的资源。我还要向 [KubeApps](https://kubeapps.com/) 致敬，它是一个用于显示 helm charts 的 UI。

### What we will cover in the series on Kubernetes

We have started covering some of these mentioned below but we are going to get more hands-on tomorrow with our second cluster deployment then we can start deploying applications into our clusters.
我们已经开始介绍下面提到的一些内容，但我们将在明天进行第二个集群部署，届时我们将进行更多的实践操作，然后我们就可以开始在集群中部署应用程序了。

- Kubernetes Architecture
- Kubernetes 架构
- Kubectl Commands
- Kubectl 命令
- Kubernetes YAML
- Kubernetes YAML
- Kubernetes Ingress
- Kubernetes Ingress
- Kubernetes Services
- Kubernetes Service
- Helm Package Manager
- Helm 包管理器
- Persistent Storage
- 持久存储
- Stateful Apps
- 有状态应用程序

## Resources

If you have FREE resources that you have used then please feel free to add them here via a PR to the repository and I will be happy to include them.
如果您有使用过的免费资源，请随时通过向仓库提交 PR 将它们添加到此处，我很乐意将其收录。

- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [TechWorld with Nana - Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]](https://www.youtube.com/watch?v=X48VuDVv0do)
- [TechWorld with Nana - Kubernetes Crash Course for Absolute Beginners](https://www.youtube.com/watch?v=s_o8dwzRlu4)
- [Kunal Kushwaha - Kubernetes Tutorial for Beginners | What is Kubernetes? Architecture Simplified!](https://www.youtube.com/watch?v=KVBON1lA9N8)

See you on [Day 55](day55.md)
[第 55 天](day55.md)见
