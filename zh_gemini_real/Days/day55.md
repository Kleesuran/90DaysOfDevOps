---
title: '#90DaysOfDevOps - State and Ingress in Kubernetes - Day 55'
published: false
description: 90DaysOfDevOps - State and Ingress in Kubernetes
tags: 'DevOps, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048779
---

## State and Ingress in Kubernetes

In this closing section of Kubernetes, we are going to take a look at State and ingress.
在Kubernetes的这一收尾部分中，我们将重点关注状态（State）和入口（Ingress）。

Everything we have said so far is about stateless, stateless is really where our applications do not care which network it is using and does not need any permanent storage. Whereas stateful apps and databases for example for such an application to function correctly, you’ll need to ensure that pods can reach each other through a unique identity that does not change (hostnames, IPs...etc.). Examples of stateful applications include MySQL clusters, Redis, Kafka, MongoDB and others. Basically, through any application that stores data.
到目前为止，我们讨论的一切都与无状态（stateless）有关，无状态意味着我们的应用程序不关心它使用哪个网络，并且不需要任何永久存储。而对于有状态应用程序和数据库（例如，若要使其正常运行），你需要确保Pod可以通过不会改变的唯一身份（主机名、IP等）相互访问。有状态应用程序的示例包括MySQL集群、Redis、Kafka、MongoDB等。基本上，就是任何存储数据的应用程序。

### Stateful Application

StatefulSets represent a set of Pods with unique, persistent identities and stable hostnames that Kubernetes maintains regardless of where they are scheduled. The state information and other resilient data for any given StatefulSet Pod are maintained in persistent disk storage associated with the StatefulSet.
StatefulSets 代表一组具有唯一、持久身份和稳定主机名的Pod，Kubernetes 会维护它们，无论它们被调度到何处。任何给定 StatefulSet Pod 的状态信息和其他弹性数据都保存在与 StatefulSet 关联的持久磁盘存储中。

### Deployment vs StatefulSet

- Replicating stateful applications is more difficult.
- 复制有状态应用程序更加困难。
- Replicating our pods in a deployment (Stateless Application) is identical and interchangeable.
- 在 Deployment（无状态应用程序）中复制我们的 Pod 是相同且可互换的。
- Create pods in random order with random hashes
- 以随机顺序创建带有随机哈希的 Pod
- One Service that load balances to any Pod.
- 一个 Service 可以对任何 Pod 进行负载均衡。

When it comes to StatefulSets or Stateful Applications the above is more difficult.
当涉及到 StatefulSets 或有状态应用程序时，上述情况会更加困难。

- Cannot be created or deleted at the same time.
- 无法同时创建或删除。
- Can't be randomly addressed.
- 无法随机寻址。
- replica Pods are not identical
- 副本 Pod 并不相同

Something you will see in our demonstration shortly is that each pod has its own identity. With a stateless Application, you will see random names. For example `app-7469bbb6d7-9mhxd` whereas a Stateful Application would be more aligned to `mongo-0` and then when scaled it will create a new pod called `mongo-1`.
您很快会在我们的演示中看到，每个 Pod 都有自己的身份。对于无状态应用程序，您会看到随机名称。例如 `app-7469bbb6d7-9mhxd`，而有状态应用程序则更像是 `mongo-0`，然后当进行扩展时，它将创建一个名为 `mongo-1` 的新 Pod。

These pods are created from the same specification, but they are not interchangeable. Each StatefulSet pod has a persistent identifier across any rescheduling. This is necessary because when we require stateful workloads such as a database where we require writing and reading to a database, we cannot have two pods writing at the same time with no awareness as this will give us data inconsistency. We need to ensure that only one of our pods is writing to the database at any given time however we can have multiple pods reading that data.
这些 Pod 由相同的规范创建，但它们不可互换。每个 StatefulSet Pod 在任何重新调度中都具有持久标识符。这是必要的，因为当我们要求有状态工作负载（例如数据库）需要进行写入和读取操作时，我们不能让两个 Pod 在不知情的情况下同时写入，因为这会导致数据不一致。我们需要确保在任何给定时间只有一个 Pod 写入数据库，但我们可以有多个 Pod 读取该数据。

Each pod in a StatefulSet would have access to its persistent volume and replica copy of the database to read from, this is continuously updated from the master. It's also interesting to note that each pod will also store its pod state in this persistent volume, if then `mongo-0` dies then when a new one is provisioned it will take over the pod state stored in storage.
StatefulSet 中的每个 Pod 都可以访问其持久卷以及用于读取的数据库副本，该副本会从主节点持续更新。另外值得注意的是，每个 Pod 也会将自己的 Pod 状态存储在这个持久卷中，如果 `mongo-0` 死亡，那么当提供新的 Pod 时，它将接管存储中保存的 Pod 状态。

#### TLDR; StatefulSets vs Deployments

- Predictable pod name = `mongo-0`
- 可预测的 Pod 名称 = `mongo-0`
- Fixed individual DNS name
- 固定的独立 DNS 名称
- Pod Identity - Retain State, Retain Role
- Pod 身份——保留状态，保留角色
- Replicating stateful apps is complex
- 复制有状态应用程序是复杂的
  - There are lots of things you must do:
  - 您必须做很多事情：
    - Configure cloning and data synchronisation.
    - 配置克隆和数据同步。
    - Make remote shared storage available.
    - 提供远程共享存储。
    - Management & backup
    - 管理与备份

### Persistant Volumes | Claims | StorageClass

How to persist data in Kubernetes?
如何在 Kubernetes 中持久化数据？

We mentioned above when we have a stateful application, we have to store the state somewhere and this is where the need for a volume comes in, out of the box Kubernetes does not provide persistence out of the box.
我们前面提到，当我们有一个有状态应用程序时，我们必须在某个地方存储状态，这就是需要 Volume 的原因，Kubernetes 本身并不直接提供持久性。

We require a storage layer that does not depend on the pod lifecycle. This storage should be available and accessible from all of our Kubernetes nodes. The storage should also be outside of the Kubernetes cluster to be able to survive even if the Kubernetes cluster crashes.
我们需要一个不依赖于 Pod 生命周期的存储层。该存储应该可用于所有 Kubernetes 节点并可从所有节点访问。该存储还应该位于 Kubernetes 集群之外，以便即使 Kubernetes 集群崩溃也能幸存下来。

### Persistent Volume

- A cluster resource (like CPU and RAM) to store data.
- 存储数据的集群资源（类似于 CPU 和 RAM）。
- Created via a YAML file
- 通过 YAML 文件创建
- Needs actual physical storage (NAS)
- 需要实际的物理存储（NAS）
- External integration to your Kubernetes cluster
- 与您的 Kubernetes 集群进行外部集成
- You can have different types of storage available in your storage.
- 您可以在存储中拥有不同类型的存储可用。
- PVs are not namespaced
- PV 不属于命名空间范围
- Local storage is available but it would be specific to one node in the cluster
- 本地存储可用，但它仅限于集群中的单个节点
- Database persistence should use remote storage (NAS)
- 数据库持久性应使用远程存储 (NAS)

### Persistent Volume Claim

A persistent volume alone above can be there and available but unless it is claimed by an application it is not being used.
仅有上述持久卷，它可能存在并可用，但除非被应用程序声明，否则它不会被使用。

- Created via a YAML file
- 通过 YAML 文件创建
- Persistent Volume Claim is used in pod configuration (volumes attribute)
- 持久卷声明用于 Pod 配置中（`volumes` 属性）
- PVCs live in the same namespace as the pod
- PVC 与 Pod 位于相同的命名空间中
- Volume is mounted into the pod
- 卷被挂载到 Pod 中
- Pods can have multiple different volume types (ConfigMap, Secret, PVC)
- Pod 可以拥有多种不同类型的卷（ConfigMap, Secret, PVC）

Another way to think of PVs and PVCs is that
理解 PV 和 PVC 的另一种方式是：

PVs are created by the Kubernetes Admin
PV 由 Kubernetes 管理员创建
PVCs are created by the user or application developer
PVC 由用户或应用程序开发人员创建

We also have two other types of volumes that we will not get into detail on but are worth mentioning:
我们还有另外两种卷类型，在此我们不会深入探讨，但值得一提：

### ConfigMaps | Secrets

- Configuration file for your pod.
- Pod 的配置文件。
- Certificate file for your pod.
- Pod 的证书文件。

### StorageClass

- Created via a YAML file
- 通过 YAML 文件创建
- Provisions Persistent Volumes Dynamically when a PVC claims it
- 当 PVC 声明时动态提供持久卷
- Each storage backend has its provisioner
- 每个存储后端都有其 Provisioner（供应者）
- Storage backend is defined in YAML (via provisioner attribute)
- 存储后端在 YAML 中定义（通过 `provisioner` 属性）
- Abstracts underlying storage provider
- 抽象底层存储提供商
- Define parameters for that storage
- 定义该存储的参数

### Walkthrough time

In the session yesterday we walked through creating a stateless application, here we want to do the same but we want to use our minikube cluster to deploy a stateful workload.
在昨天的会议中，我们演示了如何创建一个无状态应用程序，在这里我们想做同样的事情，但我们想使用我们的 minikube 集群来部署一个有状态工作负载。

A recap on the minikube command we are using to have the capability and addons to use persistence is `minikube start --addons volumesnapshots,csi-hostpath-driver --apiserver-port=6443 --container-runtime=containerd -p mc-demo --kubernetes-version=1.21.2`
回顾一下我们正在使用的 minikube 命令，它具有使用持久性的能力和附加组件：`minikube start --addons volumesnapshots,csi-hostpath-driver --apiserver-port=6443 --container-runtime=containerd -p mc-demo --kubernetes-version=1.21.2`

This command uses the CSI-hostpath-driver which is what gives us our storageclass, something I will show later.
此命令使用 CSI-hostpath-driver，它为我们提供了 StorageClass，我稍后会展示。

The build-out of the application looks like the below:
应用程序的构建结构如下图所示：

![](Images/Day55_Kubernetes1.png)

You can find the YAML configuration file for this application here [pacman-stateful-demo.yaml](Kubernetes)
您可以在此处找到此应用程序的 YAML 配置文件：[pacman-stateful-demo.yaml](Kubernetes)

### StorageClass Configuration

There is one more step though that we should run before we start deploying our application and that is to make sure that our storageclass (CSI-hostpath-sc) is our default one. We can firstly check this by running the `kubectl get storageclass` command but out of the box, the minikube cluster will be showing the standard storageclass as default so we have to change that with the following commands.
不过，在我们开始部署应用程序之前，我们应该运行另外一个步骤，即确保我们的 StorageClass (CSI-hostpath-sc) 是默认的。我们可以首先通过运行 `kubectl get storageclass` 命令来检查这一点，但开箱即用的 minikube 集群会将标准 StorageClass 显示为默认值，因此我们必须使用以下命令进行更改。

This first command will make our CSI-hostpath-sc storageclass our default.
第一个命令将把我们的 CSI-hostpath-sc StorageClass 设为默认。

`kubectl patch storageclass csi-hostpath-sc -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'`

This command will remove the default annotation from the standard StorageClass.
此命令将删除标准 StorageClass 上的默认注解。

`kubectl patch storageclass standard -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'`

![](Images/Day55_Kubernetes2.png)

We start with no Pacman namespace in our cluster. `kubectl get namespace`
我们的集群中最初没有 Pacman 命名空间。 `kubectl get namespace`

![](Images/Day55_Kubernetes3.png)

We will then deploy our YAML file. `kubectl create -f pacman-stateful-demo.yaml` you can see from this command we are creating several objects within our Kubernetes cluster.
然后我们将部署我们的 YAML 文件。`kubectl create -f pacman-stateful-demo.yaml` 您可以看到，我们正在 Kubernetes 集群中创建多个对象。

![](Images/Day55_Kubernetes4.png)

We now have our newly created namespace.
我们现在有了新创建的命名空间。

![](Images/Day55_Kubernetes5.png)

You can then see from the next image and command `kubectl get all -n pacman` that we have several things happening inside of our namespace. We have our pods running our NodeJS web front end, we have mongo running our backend database. There are services for both Pacman and mongo to access those pods. We have a deployment for Pacman and a statefulset for mongo.
从下一张图片和命令 `kubectl get all -n pacman` 中您可以看到我们的命名空间中正在发生几件事。我们有运行 NodeJS Web 前端的 Pod，有运行后端数据库的 Mongo。Pacman 和 Mongo 都有服务来访问这些 Pod。我们有一个用于 Pacman 的 Deployment 和一个用于 Mongo 的 StatefulSet。

![](Images/Day55_Kubernetes6.png)

We also have our persistent volume and persistent volume claim by running `kubectl get pv` will give us our non-namespaced persistent volumes and running `kubectl get pvc -n pacman` will give us our namespaced persistent volume claims.
我们还有持久卷和持久卷声明，运行 `kubectl get pv` 将显示非命名空间范围的持久卷，运行 `kubectl get pvc -n pacman` 将显示命名空间范围的持久卷声明。

![](Images/Day55_Kubernetes7.png)

### Playing the game | I mean accessing our mission-critical application

Because we are using Minikube as mentioned in the stateless application we have a few hurdles to get over when it comes to accessing our application, however, we had access to ingress or a load balancer within our cluster the service is set up to automatically get an IP from that to gain access externally. (you can see this above in the image of all components in the Pacman namespace).
正如我们在无状态应用程序中提到的，由于我们使用 Minikube，在访问应用程序时会遇到一些障碍；然而，如果我们在集群中可以使用 Ingress 或负载均衡器，则 Service 会自动从中获取 IP 地址以进行外部访问。（您可以在上面 Pacman 命名空间中所有组件的图像中看到这一点）。

For this demo, we are going to use the port forward method to access our application. By opening a new terminal and running the following `kubectl port-forward svc/pacman 9090:80 -n pacman` command, opening a browser we will now have access to our application. If you are running this in AWS or specific locations then this will also report on the cloud and zone as well as the host which equals your pod within Kubernetes, again you can look back and see this pod name in our screenshots above.
对于此演示，我们将使用端口转发方法访问我们的应用程序。通过打开一个新终端并运行以下命令 `kubectl port-forward svc/pacman 9090:80 -n pacman`，打开浏览器后，我们现在可以访问我们的应用程序。如果您在 AWS 或特定位置运行此程序，则它还会报告云和可用区以及主机（即 Kubernetes 中的 Pod），您可以回顾上面的屏幕截图查看此 Pod 名称。

![](Images/Day55_Kubernetes8.png)

Now we can go and create a high score which will then be stored in our database.
现在我们可以创建一个高分，该高分将存储在我们的数据库中。

![](Images/Day55_Kubernetes9.png)

Ok, great we have a high score but what happens if we go and delete our `mongo-0` pod? by running `kubectl delete pod mongo-0 -n pacman` I can delete that and if you are still in the app you will see that high score not available at least for a few seconds.
好的，我们有了一个高分，但是如果我去删除我们的 `mongo-0` Pod 会发生什么？通过运行 `kubectl delete pod mongo-0 -n pacman`，我可以删除它，如果您仍在应用程序中，您会看到该高分在几秒钟内不可用。

![](Images/Day55_Kubernetes10.png)

Now if I go back to my game I can create a new game and see my high scores. The only way you can truly believe me on this though is if you give it a try and share on social media your high scores!
现在，如果我回到我的游戏，我可以创建一个新游戏并看到我的高分。不过，唯一能让您真正相信我的方法是亲自尝试一下，并在社交媒体上分享您的高分！

![](Images/Day55_Kubernetes11.png)

With the deployment, we can scale this up using the commands that we covered in the previous session but in particular here, especially if you want to host a huge Pacman party then you can scale this up using `kubectl scale deployment pacman --replicas=10 -n pacman`
对于 Deployment，我们可以使用前一节中介绍的命令来扩展它，但在这里特别值得一提的是，如果您想举办一场盛大的 Pacman 派对，您可以使用 `kubectl scale deployment pacman --replicas=10 -n pacman` 命令来扩展它。

![](Images/Day55_Kubernetes12.png)

### Ingress explained

Before we wrap things up with Kubernetes I also wanted to touch on a huge aspect of Kubernetes and that is ingress.
在我们结束 Kubernetes 内容之前，我还想谈谈 Kubernetes 的一个重要方面——Ingress（入口）。

### What is ingress?

So far with our examples, we have used port-forward or we have used specific commands within minikube to gain access to our applications but this in production is not going to work. We are going to want a better way of accessing our applications at scale with multiple users.
到目前为止，在我们的示例中，我们使用了端口转发（port-forward）或 minikube 中的特定命令来访问我们的应用程序，但这在生产环境中是行不通的。我们需要一种更好的方式，以便多用户大规模地访问我们的应用程序。

We also spoke about NodePort being an option but again this should be only for test purposes.
我们还讨论了 NodePort 是一种选择，但同样，这应该仅用于测试目的。

Ingress gives us a better way of exposing our applications, this allows us to define routing rules within our Kubernetes cluster.
Ingress 为我们提供了一种更好的方式来暴露我们的应用程序，这使我们能够在 Kubernetes 集群中定义路由规则。

For ingress, we would create a forward request to the internal service of our application.
对于 Ingress，我们将创建转发请求到我们应用程序的内部 Service。

### When do you need ingress?

If you are using a cloud provider, a managed Kubernetes offering they most likely will have their ingress option for your cluster or they provide you with their load balancer option. You don't have to implement this yourself, one of the benefits of managed Kubernetes.
如果您正在使用云提供商、托管的 Kubernetes 服务，他们很可能会为您的集群提供自己的 Ingress 选项，或者为您提供他们的负载均衡器选项。您无需自己实现这一点，这是托管 Kubernetes 的优势之一。

If you are running your cluster then you will need to configure an entrypoint.
如果您正在运行自己的集群，那么您将需要配置一个入口点。

### Configure Ingress on Minikube

On my particular running cluster called mc-demo, I can run the following command to get ingress enabled on my cluster.
在我正在运行的名为 mc-demo 的集群上，我可以运行以下命令来启用集群上的 Ingress。

`minikube --profile='mc-demo' addons enable ingress`

![](Images/Day55_Kubernetes13.png)

If we check our namespaces now you will see that we have a new ingress-nginx namespace. `kubectl get ns`
如果我们现在检查命名空间，您将看到我们有一个新的 ingress-nginx 命名空间。`kubectl get ns`

![](Images/Day55_Kubernetes14.png)

Now we must create our ingress YAML configuration to hit our Pacman service I have added this file to the repository [pacman-ingress.yaml](Kubernetes)
现在我们必须创建 Ingress YAML 配置来访问我们的 Pacman Service，我已将此文件添加到存储库中 [pacman-ingress.yaml](Kubernetes)

We can then create this in our ingress namespace with `kubectl create -f Pacman-ingress.yaml`
然后我们可以使用 `kubectl create -f Pacman-ingress.yaml` 在我们的 ingress 命名空间中创建它。

![](Images/Day55_Kubernetes15.png)

Then if we run `kubectl get ingress -n Pacman`
然后如果我们运行 `kubectl get ingress -n Pacman`

![](Images/Day55_Kubernetes16.png)

I am then told because we are using minikube running on WSL2 in Windows we have to create the minikube tunnel using `minikube tunnel --profile=mc-demo`
我随后被告知，因为我们使用的是运行在 Windows WSL2 上的 minikube，我们必须使用 `minikube tunnel --profile=mc-demo` 来创建 minikube 隧道。

But I am still not able to gain access to 192.168.49.2 and play my Pacman game.
但我仍然无法访问 192.168.49.2 并玩我的 Pacman 游戏。

If anyone has or can get this working on Windows and WSL I would appreciate the feedback. I will raise an issue on the repository for this and come back to it once I have time and a fix.
如果有人能够在 Windows 和 WSL 上运行此功能，我将不胜感激。我将为此在存储库中提出一个 issue，并在我有时间修复后回来解决。

UPDATE: I feel like this blog helps identify maybe the cause of this not working with WSL [Configuring Ingress to run Minikube on WSL2 using Docker runtime](https://hellokube.dev/posts/configure-minikube-ingress-on-wsl2/)
更新：我觉得这篇博客可能有助于找出在 WSL 上无法工作的根源 [Configuring Ingress to run Minikube on WSL2 using Docker runtime](https://hellokube.dev/posts/configure-minikube-ingress-on-wsl2/)

## Resources

If you have FREE resources that you have used then please feel free to add them here via a PR to the repository and I will be happy to include them.
如果您有使用过的免费资源，请随时通过向存储库提交 PR 将它们添加到此处，我很乐意将其包含在内。

- [Kubernetes StatefulSet simply explained](https://www.youtube.com/watch?v=pPQKAR1pA9U)
- [Kubernetes Volumes explained](https://www.youtube.com/watch?v=0swOh5C3OVM)
- [Kubernetes Ingress Tutorial for Beginners](https://www.youtube.com/watch?v=80Ew_fsV4rM)
- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [TechWorld with Nana - Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]](https://www.youtube.com/watch?v=X48VuDVv0do)
- [TechWorld with Nana - Kubernetes Crash Course for Absolute Beginners](https://www.youtube.com/watch?v=s_o8dwzRlu4)
- [Kunal Kushwaha - Kubernetes Tutorial for Beginners | What is Kubernetes? Architecture Simplified!](https://www.youtube.com/watch?v=KVBON1lA9N8)

This wraps up our Kubernetes section, there is so much additional content we could cover on Kubernetes and 7 days gives us foundational knowledge but people are running through [100DaysOfKubernetes](https://100daysofkubernetes.io/overview.html) where you can get really into the weeds.
这结束了我们的 Kubernetes 部分，关于 Kubernetes 还有很多额外的内容可以涵盖，7 天为我们提供了基础知识，但人们正在进行 [100DaysOfKubernetes](https://100daysofkubernetes.io/overview.html) 挑战，在那里您可以真正深入研究。

Next up we are going to be taking a look at Infrastructure as Code and the important role it plays from a DevOps perspective.
接下来我们将研究基础设施即代码（Infrastructure as Code）及其从 DevOps 角度来看所扮演的重要角色。

See you on [Day 56](day56.md)
我们第 56 天见。