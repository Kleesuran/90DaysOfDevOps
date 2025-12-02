---
title: '#90DaysOfDevOps - Disaster Recovery - Day 89'
published: false
description: 90DaysOfDevOps - Disaster Recovery
description: 90DaysOfDevOps - 灾难恢复
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048718
---

## Disaster Recovery

We have mentioned already how different failure scenarios will warrant different recovery requirements.
我们已经提到，不同的故障场景需要不同的恢复要求。
When it comes to Fire, Flood and Blood scenarios we can consider these mostly disaster situations where we might need our workloads up and running in a completely different location as fast as possible or at least with near-zero recovery time objectives (RTO).
当涉及到火灾（Fire）、洪水（Flood）和流血/人为（Blood）场景时，我们主要将其视为灾难情况，此时我们可能需要我们的工作负载尽快在完全不同的位置运行，或者至少具有接近零的恢复时间目标（RTO）。

This can only be achieved at scale when you automate the replication of the complete application stack to a standby environment.
只有将整个应用程序堆栈的复制自动化到备用环境时，才能大规模实现这一目标。

This allows for fast failovers across cloud regions, cloud providers or between on-premises and cloud infrastructure.
这允许在云区域、云提供商之间或本地与云基础设施之间实现快速故障转移。

Keeping with the theme so far, we are going to concentrate on how this can be achieved using Kasten K10 using the minikube cluster that we deployed and configured a few sessions ago.
为了与迄今为止的主题保持一致，我们将重点介绍如何使用Kasten K10，通过我们几节课前部署和配置的minikube集群来实现这一点。

We will then create another minikube cluster with Kasten K10 also installed to act as our standby cluster which in theory could be any location.
然后，我们将创建另一个安装了Kasten K10的minikube集群，作为我们的备用集群，理论上它可以位于任何位置。

Kasten K10 also has built-in functionality to ensure if something was to happen to the Kubernetes cluster it is running on that the catalogue data is replicated and available in a new one [K10 Disaster Recovery](https://docs.kasten.io/latest/operating/dr.html).
Kasten K10还具有内置功能，可确保如果它所运行的Kubernetes集群发生任何问题，其目录数据也会被复制并可在新集群中使用[K10 灾难恢复](https://docs.kasten.io/latest/operating/dr.html)。

### Add object storage to K10

The first thing we need to do is add an object storage bucket as a target location for our backups to land. Not only does this act as an offsite location but we can also leverage this as our disaster recovery source data to recover from.
我们需要做的第一件事是添加一个对象存储桶作为备份的目标位置。这不仅可以作为异地存储位置，我们还可以利用它作为灾难恢复的源数据进行恢复。

I have cleaned out the S3 bucket that we created for the Kanister demo in the last session.
我已经清理了我们在上一节中为Kanister演示创建的S3存储桶。

![](Images/Day89_Data1.png)

Port forward to access the K10 dashboard, open a new terminal to run the below command:
端口转发以访问 K10 仪表板，打开一个新终端运行以下命令：

`kubectl --namespace kasten-io port-forward service/gateway 8080:8000`

The Kasten dashboard will be available at `http://127.0.0.1:8080/k10/#/`
Kasten 仪表板将可通过 `http://127.0.0.1:8080/k10/#/` 访问

![](Images/Day87_Data4.png)

To authenticate with the dashboard, we now need the token which we can get with the following commands.
要使用仪表板进行身份验证，我们现在需要令牌，可以通过以下命令获取。

```Shell
TOKEN_NAME=$(kubectl get secret --namespace kasten-io|grep k10-k10-token | cut -d " " -f 1)
TOKEN=$(kubectl get secret --namespace kasten-io $TOKEN_NAME -o jsonpath="{.data.token}" | base64 --decode)

echo "Token value: "
echo $TOKEN
```

![](Images/Day87_Data5.png)

Now we take this token and we input that into our browser, you will then be prompted for an email and company name.
现在我们获取此令牌并将其输入到我们的浏览器中，系统将提示您输入电子邮件和公司名称。

![](Images/Day87_Data6.png)

Then we get access to the Kasten K10 dashboard.
然后我们就可以访问 Kasten K10 仪表板了。

![](Images/Day87_Data7.png)

Now that we are back in the Kasten K10 dashboard we can add our location profile, select "Settings" at the top of the page and "New Profile".
现在我们回到 Kasten K10 仪表板，我们可以添加我们的位置配置文件，选择页面顶部的“Settings”（设置）和“New Profile”（新建配置文件）。

![](Images/Day89_Data2.png)

You can see from the image below that we have a choice when it comes to where this location profile is, we are going to select Amazon S3, and we are going to add our sensitive access credentials, region and bucket name.
从下图中可以看到，我们可以选择此位置配置文件的位置，我们将选择 Amazon S3，并添加我们的敏感访问凭证、区域和存储桶名称。

![](Images/Day89_Data3.png)

If we scroll down on the New Profile creation window you will see, that we also can enable immutable backups which leverage the S3 Object Lock API. For this demo, we won't be using that.
如果我们向下滚动“新建配置文件”创建窗口，您会看到我们还可以启用不可变备份，它利用了 S3 Object Lock API。在此演示中，我们将不使用此功能。

![](Images/Day89_Data4.png)

Hit "Save Profile" and you can now see our newly created or added location profile as per below.
点击“Save Profile”（保存配置文件），您现在可以看到我们新创建或添加的位置配置文件，如下图所示。

![](Images/Day89_Data5.png)

### Create a policy to protect the Pac-Man app to object storage

In the previous session, we created only an ad-hoc snapshot of our Pac-Man application, therefore we need to create a backup policy that will send our application backups to our newly created object storage location.
在上一节中，我们只为我们的 Pac-Man 应用程序创建了一个临时快照，因此我们需要创建一个备份策略，将我们的应用程序备份发送到我们新创建的对象存储位置。

If you head back to the dashboard and select the Policy card you will see a screen as per below. Select "Create New Policy".
如果您回到仪表板并选择“Policy”（策略）卡，您将看到如下图所示的屏幕。选择“Create New Policy”（创建新策略）。

![](Images/Day89_Data6.png)

First, we can give our policy a useful name and description. We can also define our backup frequency for demo purposes I am using on-demand.
首先，我们可以为我们的策略提供一个有用的名称和描述。我们还可以定义我们的备份频率，出于演示目的，我使用的是按需备份。

![](Images/Day89_Data7.png)

Next, we want to enable backups via Snapshot exports meaning that we want to send our data out to our location profile. If you have multiple you can select which one you would like to send your backups to.
接下来，我们要通过快照导出启用备份，这意味着我们希望将数据发送到我们的位置配置文件。如果您有多个配置文件，您可以选择要将备份发送到哪一个。

![](Images/Day89_Data8.png)

Next, we select the application by either name or labels, I am going to choose by name and all resources.
接下来，我们通过名称或标签选择应用程序，我将按名称选择所有资源。

![](Images/Day89_Data9.png)

Under Advanced settings we are not going to be using any of these but based on our [walkthrough of Kanister yesterday](https://github.com/MichaelCade/90DaysOfDevOps/blob/main/Days/day88.md), we can leverage Kanister as part of Kasten K10 as well to take those application consistent copies of our data.
在高级设置下，我们不会使用任何这些选项，但基于我们[昨天对 Kanister 的演练](https://github.com/MichaelCade/90DaysOfDevOps/blob/main/Days/day88.md)，我们也可以利用 Kanister 作为 Kasten K10 的一部分，来获取数据中应用程序一致的副本。

![](Images/Day89_Data10.png)

Finally, select "Create Policy" and you will now see the policy in our Policy window.
最后，选择“Create Policy”（创建策略），您现在将在“Policy”（策略）窗口中看到该策略。

![](Images/Day89_Data11.png)

At the bottom of the created policy, you will have "Show import details" we need this string to be able to import into our standby cluster. Copy this somewhere safe for now.
在创建的策略底部，您将看到“Show import details”（显示导入详细信息），我们需要此字符串才能导入到我们的备用集群中。暂时将其复制到安全的地方。

![](Images/Day89_Data12.png)

Before we move on, we just need to select "run once" to get a backup sent to our object storage bucket.
在继续之前，我们只需选择“run once”（运行一次），即可将备份发送到我们的对象存储桶。

![](Images/Day89_Data13.png)

Below, the screenshot is just to show the successful backup and export of our data.
下面的截图只是为了显示我们的数据已成功备份和导出。

![](Images/Day89_Data14.png)

### Create a new MiniKube cluster & deploy K10

We then need to deploy a second Kubernetes cluster and where this could be any supported version of Kubernetes including OpenShift, for education we will use the very free version of MiniKube with a different name.
然后，我们需要部署第二个 Kubernetes 集群，它可以是任何受支持的 Kubernetes 版本，包括 OpenShift，但出于教育目的，我们将使用不同名称的免费 MiniKube 版本。

Using `minikube start --addons volumesnapshots,csi-hostpath-driver --apiserver-port=6443 --container-runtime=containerd -p standby --kubernetes-version=1.21.2` we can create our new cluster.
使用 `minikube start --addons volumesnapshots,csi-hostpath-driver --apiserver-port=6443 --container-runtime=containerd -p standby --kubernetes-version=1.21.2` 我们可以创建新集群。

![](Images/Day89_Data15.png)

We then can deploy Kasten K10 in this cluster using:
然后我们可以使用以下命令在此集群中部署 Kasten K10：

`helm install k10 kasten/k10 --namespace=kasten-io --set auth.tokenAuth.enabled=true --set injectKanisterSidecar.enabled=true --set-string injectKanisterSidecar.namespaceSelector.matchLabels.k10/injectKanisterSidecar=true --create-namespace`

This will take a while but in the meantime, we can use `kubectl get pods -n kasten-io -w` to watch the progress of our pods getting to the running status.
这需要一段时间，但在此期间，我们可以使用 `kubectl get pods -n kasten-io -w` 来观察我们的 Pods 达到运行状态的进度。

It is worth noting that because we are using MiniKube our application will just run when we run our import policy, our storageclass is the same on this standby cluster. However, something we will cover in the final session is mobility and transformation.
值得注意的是，因为我们使用的是 MiniKube，所以当我们运行导入策略时，我们的应用程序就会运行起来；此备用集群上的存储类是相同的。然而，我们将在最后一节中讨论迁移和转换。

When the pods are up and running, we can follow the steps we went through on the previous steps in the other cluster.
当 Pods 启动并运行时，我们可以按照我们在另一个集群中完成的先前步骤进行操作。

Port forward to access the K10 dashboard, open a new terminal to run the below command
端口转发以访问 K10 仪表板，打开一个新终端运行以下命令

`kubectl --namespace kasten-io port-forward service/gateway 8080:8000`

The Kasten dashboard will be available at `http://127.0.0.1:8080/k10/#/`
Kasten 仪表板将可通过 `http://127.0.0.1:8080/k10/#/` 访问

![](Images/Day87_Data4.png)

To authenticate with the dashboard, we now need the token which we can get with the following commands.
要使用仪表板进行身份验证，我们现在需要令牌，可以通过以下命令获取。

```Shell
TOKEN_NAME=$(kubectl get secret --namespace kasten-io|grep k10-k10-token | cut -d " " -f 1)
TOKEN=$(kubectl get secret --namespace kasten-io $TOKEN_NAME -o jsonpath="{.data.token}" | base64 --decode)

echo "Token value: "
echo $TOKEN
```

![](Images/Day87_Data5.png)

Now we take this token and we input that into our browser, you will then be prompted for an email and company name.
现在我们获取此令牌并将其输入到我们的浏览器中，系统将提示您输入电子邮件和公司名称。

![](Images/Day87_Data6.png)

Then we get access to the Kasten K10 dashboard.
然后我们就可以访问 Kasten K10 仪表板了。

![](Images/Day87_Data7.png)

### Import Pac-Man into new the MiniKube cluster

At this point, we are now able to create an import policy in that standby cluster and connect to the object storage backups and determine what and how we want this to look.
此时，我们现在能够在该备用集群中创建导入策略，连接到对象存储备份，并确定我们希望它是什么样子以及如何实现。

First, we add in our Location Profile that we walked through earlier on the other cluster, showing off dark mode here to show the difference between our production system and our DR standby location.
首先，我们添加我们在另一个集群上演示过的“位置配置文件”，这里展示了暗黑模式（dark mode），以显示我们的生产系统和我们的灾难恢复备用位置之间的区别。

![](Images/Day89_Data16.png)

Now we go back to the dashboard and into the policies tab to create a new policy.
现在我们回到仪表板并进入“策略”选项卡以创建新策略。

![](Images/Day89_Data17.png)

Create the import policy as per the below image. When complete, we can create a policy. There are options here to restore after import and some people might want this option, this will go and be restored into our standby cluster on completion. We also can change the configuration of the application as it is restored and this is what I have documented in [Day 90](day90.md).
按照下图创建导入策略。完成后，我们可以创建一个策略。这里有导入后恢复的选项，有些人可能需要此选项，它将在完成后恢复到我们的备用集群中。我们还可以在恢复应用程序时更改其配置，这也是我在 [第 90 天](day90.md) 中记录的内容。

![](Images/Day89_Data18.png)

I selected to import on demand, but you can set a schedule on when you want this import to happen. Because of this, I am going to run once.
我选择按需导入，但您可以设置导入发生的计划。正因为如此，我将运行一次。

![](Images/Day89_Data19.png)

You can see below the successful import policy job.
您可以在下面看到成功的导入策略作业。

![](Images/Day89_Data20.png)

If we now head back to the dashboard and into the Applications card, we can then select the drop-down where you see below "Removed" you will see our application here. Select Restore
如果我们现在回到仪表板并进入“Applications”（应用程序）卡，然后我们可以选择您在下面看到“Removed”（已移除）的下拉菜单，您将在此处看到我们的应用程序。选择“Restore”（恢复）。

![](Images/Day89_Data21.png)

Here we can see the restore points we have available to us; this was the backup job that we ran on the primary cluster against our Pac-Man application.
在这里，我们可以看到可用的恢复点；这是我们在主集群上针对 Pac-Man 应用程序运行的备份作业。

![](Images/Day89_Data22.png)

I am not going to change any of the defaults as I want to cover this in more detail in the next session.
我不会更改任何默认设置，因为我想在下一节中更详细地介绍这一点。

![](Images/Day89_Data23.png)

When you hit "Restore" it will prompt you with a confirmation.
当您点击“Restore”（恢复）时，它会提示您进行确认。

![](Images/Day89_Data24.png)

We can see below that we are in the standby cluster and if we check on our pods, we can see that we have our running application.
我们可以看到我们现在处于备用集群中，如果我们检查我们的 Pods，可以看到我们的应用程序正在运行。

![](Images/Day89_Data25.png)

We can then port forward (in real-life/production environments, you would not need this step to access the application, you would be using ingress)
然后我们可以进行端口转发（在现实/生产环境中，您不需要此步骤来访问应用程序，您会使用 Ingress）。

![](Images/Day89_Data26.png)

Next, we will take a look at Application mobility and transformation.
接下来，我们将研究应用程序迁移和转换。

## Resources

- [Kubernetes Backup and Restore made easy!](https://www.youtube.com/watch?v=01qcYSck1c4&t=217s)
- [Kubernetes Backups, Upgrades, Migrations - with Velero](https://www.youtube.com/watch?v=zybLTQER0yY)
- [7 Database Paradigms](https://www.youtube.com/watch?v=W2Z7fbCLSTw&t=520s)
- [Disaster Recovery vs. Backup: What's the difference?](https://www.youtube.com/watch?v=07EHsPuKXc0)
- [Veeam Portability & Cloud Mobility](https://www.youtube.com/watch?v=hDBlTdzE6Us&t=3s)

See you on [Day 90](day90.md)
我们[第 90 天](day90.md)见
