---
title: '#90DaysOfDevOps - Hands-On Backup & Recovery - Day 87'
published: false
description: 90DaysOfDevOps - Hands-On Backup & Recovery
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048717
---

## Hands-On Backup & Recovery

In the last session, we touched on [Kopia](https://kopia.io/) an Open-Source backup tool that we used to get some important data off to a local NAS and off to some cloud-based object storage.
在上一期中，我们讨论了 [Kopia](https://kopia.io/)，这是一个开源备份工具，我们用它将一些重要数据备份到本地 NAS 和基于云的对象存储中。

In this section, I want to get into the world of Kubernetes backup. It is a platform we covered [The Big Picture: Kubernetes](Days/day49.md) earlier in the challenge.
在本节中，我想深入探讨 Kubernetes 备份的世界。这是我们在挑战早期介绍过的平台：[大局观：Kubernetes](Days/day49.md)。

We will again be using our minikube cluster but this time we are going to take advantage of some of those addons that are available.
我们将再次使用我们的 minikube 集群，但这次我们将利用一些可用的插件。

### Kubernetes cluster setup

To set up our minikube cluster we will be issuing the `minikube start --addons volumesnapshots,csi-hostpath-driver --apiserver-port=6443 --container-runtime=containerd -p 90daysofdevops --kubernetes-version=1.21.2` you will notice that we are using the `volumesnapshots` and `csi-hostpath-driver` as we will make full use of these for when we are taking our backups.
为了设置我们的 minikube 集群，我们将运行命令 `minikube start --addons volumesnapshots,csi-hostpath-driver --apiserver-port=6443 --container-runtime=containerd -p 90daysofdevops --kubernetes-version=1.21.2`，您会注意到我们正在使用 `volumesnapshots` 和 `csi-hostpath-driver`，因为我们将在进行备份时充分利用它们。

At this point I know we have not deployed Kasten K10 yet but we want to issue the following command when your cluster is up, we want to annotate the volumesnapshotclass so that Kasten K10 can use this.
此时，我知道我们还没有部署 Kasten K10，但我们希望在集群启动后执行以下命令，我们需要注释 volumesnapshotclass，以便 Kasten K10 可以使用它。

```Shell
kubectl annotate volumesnapshotclass csi-hostpath-snapclass \
    k10.kasten.io/is-snapshot-class=true
```

We are also going to change over the default storageclass from the standard default storageclass to the csi-hostpath storageclass using the following.
我们还将使用以下命令将默认 storageclass 从标准的默认 storageclass 更改为 csi-hostpath storageclass。

```Shell
kubectl patch storageclass csi-hostpath-sc -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'

kubectl patch storageclass standard -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
```

![](Images/Day87_Data1.png)

### Deploy Kasten K10

Add the Kasten Helm repository
添加 Kasten Helm 仓库

`helm repo add kasten https://charts.kasten.io/`

We could use `arkade kasten install k10` here as well but for the demo, we will run through the following steps. [More Details](https://blog.kasten.io/kasten-k10-goes-to-the-arkade)
我们也可以在这里使用 `arkade kasten install k10`，但为了演示，我们将执行以下步骤。[更多细节](https://blog.kasten.io/kasten-k10-goes-to-the-arkade)

Create the namespace and deploy K10, note that this will take around 5 mins
创建命名空间并部署 K10，请注意，这大约需要 5 分钟

`helm install k10 kasten/k10 --namespace=kasten-io --set auth.tokenAuth.enabled=true --set injectKanisterSidecar.enabled=true --set-string injectKanisterSidecar.namespaceSelector.matchLabels.k10/injectKanisterSidecar=true --create-namespace`

![](Images/Day87_Data1.png)

You can watch the pods come up by running the following command.
您可以通过运行以下命令来查看 Pod 的启动情况。

`kubectl get pods -n kasten-io -w`

![](Images/Day87_Data3.png)

Port forward to access the K10 dashboard, open a new terminal to run the below command
端口转发以访问 K10 仪表板，打开一个新终端运行以下命令

`kubectl --namespace kasten-io port-forward service/gateway 8080:8000`

The Kasten dashboard will be available at `http://127.0.0.1:8080/k10/#/`
Kasten 仪表板将可通过 `http://127.0.0.1:8080/k10/#/` 访问

![](Images/Day87_Data4.png)

To authenticate with the dashboard we now need the token which we can get with the following commands.
要使用仪表板进行身份验证，我们现在需要令牌，我们可以通过以下命令获取。

```Shell
TOKEN_NAME=$(kubectl get secret --namespace kasten-io|grep k10-k10-token | cut -d " " -f 1)
TOKEN=$(kubectl get secret --namespace kasten-io $TOKEN_NAME -o jsonpath="{.data.token}" | base64 --decode)

echo "Token value: "
echo $TOKEN
```

![](Images/Day87_Data5.png)

Now we take this token and we input that into our browser, you will then be prompted for an email and company name.
现在我们获取此令牌并将其输入到浏览器中，系统将提示您输入电子邮件和公司名称。

![](Images/Day87_Data6.png)

Then we get access to the Kasten K10 dashboard.
然后我们就可以访问 Kasten K10 仪表板了。

![](Images/Day87_Data7.png)

### Deploy our stateful application

Use the stateful application that we used in the Kubernetes section.
使用我们在 Kubernetes 部分中使用的有状态应用程序。

![](Images/Day55_Kubernetes1.png)

You can find the YAML configuration file for this application here-> [pacman-stateful-demo.yaml](Kubernetes/pacman-stateful-demo.yaml)
您可以在此处找到此应用程序的 YAML 配置文件 -> [pacman-stateful-demo.yaml](Kubernetes/pacman-stateful-demo.yaml)

![](Images/Day87_Data8.png)

We can use `kubectl get all -n pacman` to check on our pods coming up.
我们可以使用 `kubectl get all -n pacman` 来检查我们的 Pod 启动情况。

![](Images/Day87_Data9.png)

In a new terminal we can then port forward the pacman front end. `kubectl port-forward svc/pacman 9090:80 -n pacman`
在一个新终端中，我们可以端口转发 pacman 前端。 `kubectl port-forward svc/pacman 9090:80 -n pacman`

Open another tab on your browser to http://localhost:9090/
在浏览器中打开另一个标签页到 http://localhost:9090/

![](Images/Day87_Data10.png)

Take the time to clock up some high scores in the backend MongoDB database.
花点时间在后端 MongoDB 数据库中记录一些高分。

![](Images/Day87_Data11.png)

### Protect our High Scores

Now we have some mission-critical data in our database and we do not want to lose it. We can use Kasten K10 to protect this whole application.
现在我们的数据库中有一些关键任务数据，我们不想丢失它。我们可以使用 Kasten K10 来保护整个应用程序。

If we head back into the Kasten K10 dashboard tab you will see that our number of applications has now increased from 1 to 2 with the addition of our Pacman application to our Kubernetes cluster.
如果我们回到 Kasten K10 仪表板选项卡，您将看到随着我们的 Pacman 应用程序添加到 Kubernetes 集群中，应用程序数量已从 1 增加到 2。

![](Images/Day87_Data12.png)

If you click on the Applications card you will see the automatically discovered applications in our cluster.
如果您单击“应用程序”卡片，您将看到集群中自动发现的应用程序。

![](Images/Day87_Data13.png)

With Kasten K10 we can leverage storage-based snapshots as well export our copies out to object storage options.
借助 Kasten K10，我们可以利用基于存储的快照，并可以将副本导出到对象存储选项中。

For the demo, we will create a manual storage snapshot in our cluster and then we can add some rogue data to our high scores to simulate an accidental mistake being made or is it?
对于本次演示，我们将在集群中创建一个手动存储快照，然后我们可以向我们的高分列表中添加一些“异常”数据，以模拟意外错误发生的情况——或者真的只是意外吗？

Firstly we can use the manual snapshot option below.
首先，我们可以使用下面的手动快照选项。

![](Images/Day87_Data14.png)

For the demo, I am going to leave everything as the default
在本次演示中，我将保留所有默认设置

![](Images/Day87_Data15.png)

Back on the dashboard, you get a status report on the job as it is running and then when complete it should look as successful as this one.
回到仪表板，您将看到作业运行时的状态报告，完成后它应该像这张图一样显示成功。

![](Images/Day87_Data16.png)

### Failure Scenario

We can now make that fatal change to our mission-critical data by simply adding in a prescriptive bad change to our application.
现在我们可以通过简单地向我们的应用程序添加一个预期的错误更改，对我们的关键任务数据进行致命更改。

As you can see below we have two inputs that we probably don't want in our production mission-critical database.
正如您在下面看到的，我们有两个输入项，可能不希望它们出现在我们的生产关键任务数据库中。

![](Images/Day87_Data17.png)

### Restore the data

This is a simple demo and in a way not realistic although have you seen how easy it is to drop databases?
这是一个简单的演示，在某种程度上并不完全符合实际，尽管您应该知道删除数据库有多容易？

Now we want to get that high score list looking a little cleaner and how we had it before the mistakes were made.
现在我们希望高分列表看起来更整洁一些，恢复到我们犯错之前的样子。

Back in the Applications card and on the Pacman tab, we now have 1 restore point we can use to restore from.
回到“应用程序”卡片上的 Pacman 选项卡，我们现在有 1 个可用于恢复的还原点。

![](Images/Day87_Data18.png)

When you select restore you can see all the associated snapshots and exports to that application.
当您选择还原时，可以看到与该应用程序相关联的所有快照和导出。

![](Images/Day87_Data19.png)

Select that restore and a side window will appear, we will keep the default settings and hit restore.
选择该还原点，一个侧边窗口将出现，我们将保留默认设置并点击“还原”。

![](Images/Day87_Data20.png)

Confirm that you want to make this happen.
确认您要执行此操作。

![](Images/Day87_Data21.png)

You can then go back to the dashboard and see the progress of the restore. You should see something like this.
然后您可以返回仪表板查看还原进度。您应该会看到类似这样的内容。

![](Images/Day87_Data22.png)

But more importantly, how is our High-Score list looking in our mission-critical application. You will have to start the port forward again to Pacman as we previously covered.
但更重要的是，我们的关键任务应用程序中的高分列表现在看起来如何？您必须像我们之前介绍的那样，重新启动到 Pacman 的端口转发。

![](Images/Day87_Data23.png)

A super simple demo and only really touching the surface of what Kasten K10 can achieve when it comes to backup. I will be creating some more in-depth video content on some of these areas in the future. We will also be using Kasten K10 to highlight some of the other prominent areas around Data Management when it comes to Disaster Recovery and the mobility of your data.
这是一个超级简单的演示，真正只触及了 Kasten K10 在备份方面能实现的功能的皮毛。我将来会在其中一些领域创建更深入的视频内容。我们还将使用 Kasten K10 来突出显示数据管理中关于灾难恢复和数据迁移的其他一些重要领域。

Next, we will take a look at Application consistency.
接下来，我们将看看应用程序一致性。

## Resources

- [Kubernetes Backup and Restore made easy!](https://www.youtube.com/watch?v=01qcYSck1c4&t=217s)
- [Kubernetes Backups, Upgrades, Migrations - with Velero](https://www.youtube.com/watch?v=zybLTQER0yY)
- [7 Database Paradigms](https://www.youtube.com/watch?v=W2Z7fbCLSTw&t=520s)
- [Disaster Recovery vs. Backup: What's the difference?](https://www.youtube.com/watch?v=07EHsPuKXc0)
- [Veeam Portability & Cloud Mobility](https://www.youtube.com/watch?v=hDBlTdzE6Us&t=3s)

See you on [Day 88](day88.md)
第 88 天见 [Day 88](day88.md)
