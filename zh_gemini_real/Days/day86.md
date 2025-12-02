---
title: '#90DaysOfDevOps - Backup all the platforms - Day 86'
published: false
description: 90DaysOfDevOps - Backup all the platforms
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049058
---

## Backup all the platforms

During this whole challenge, we discussed many different platforms and environments.
在整个挑战过程中，我们讨论了许多不同的平台和环境。
One thing all of those have in common is the fact they all need some level of data protection!
所有这些平台和环境都有一个共同点，那就是它们都需要一定程度的数据保护！

Data Protection has been around for many many years but the wealth of data that we have today and the value that this data brings means we have to make sure we are not only resilient to infrastructure failure by having multiple nodes and high availability across applications but we must also consider that we need a copy of that data, that important data in a safe and secure location if a failure scenario was to occur.
数据保护已经存在多年，但我们今天拥有的海量数据以及这些数据带来的价值意味着我们必须确保我们不仅通过拥有多个节点和跨应用的高可用性来抵御基础设施故障，而且还必须考虑到，如果发生故障场景，我们需要将该数据（那些重要数据）的副本保存在一个安全可靠的位置。

We hear a lot these days it seems about cybercrime and ransomware, and don't get me wrong this is a massive threat and I stand by the fact that you will be attacked by ransomware.
如今，我们似乎经常听到有关网络犯罪和勒索软件的消息，请不要误会，这是一个巨大的威胁，我坚持认为你迟早会受到勒索软件的攻击。
It is not a matter of if it is a matter of when.
这不是会不会发生的问题，而是何时发生的问题。
So even more reason to make sure you have your data secure for when that time arises.
因此，更有理由确保在发生这种情况时你的数据是安全的。
However, the most common cause for data loss is not ransomware or cybercrime it is simply accidental deletion!
然而，数据丢失最常见的原因不是勒索软件或网络犯罪，而仅仅是意外删除！

We have all done it, deleted something we shouldn't have and had that instant regret.
我们都做过，删除了不该删除的东西，并立即感到后悔。

With all of the technology and automation we have discussed during the challenge, the requirement to protect any stateful data or even complex stateless configuration is still there, regardless of the platform.
尽管我们在挑战中讨论了所有的技术和自动化，但无论平台如何，保护任何有状态数据或甚至复杂的无状态配置的要求仍然存在。

![](Images/Day86_Data1.png)

But we should be able to perform that protection of the data with automation in mind and be able to integrate it into our workflows.
但是，我们应该考虑到自动化来执行数据保护，并能够将其集成到我们的工作流程中。

If we look at what backup is:
如果我们看看备份是什么：

_In information technology, a backup, or data backup is a copy of computer data taken and stored elsewhere so that it may be used to restore the original after a data loss event. The verb form, referring to the process of doing so, is "back up", whereas the noun and adjective form is "backup"._
_在信息技术中，备份（backup，或数据备份 data backup）是为了在数据丢失事件后恢复原始数据而复制并存储在其他地方的计算机数据。指代执行此过程的动词形式是“back up”，而名词和形容词形式是“backup”。_

If we break this down to the simplest form, a backup is a copy and paste of data to a new location.
如果将其分解为最简单的形式，备份就是将数据复制粘贴到新位置。
Simply put I could take a backup right now by copying a file from my C: drive to my D: drive and I would then have a copy in case something happened to the C: drive or something was edited wrongly within the files.
简单来说，我现在就可以通过将文件从 C: 盘复制到 D: 盘来进行备份，这样如果 C: 盘发生问题或者文件内容被错误编辑，我就会有一个副本。
I could revert to the copy I have on the D: drive.
我可以恢复到 D: 盘上的副本。
Now if my computer dies where both the C & D drives live then I am not protected so I have to consider a solution or a copy of data outside of my system maybe onto a NAS drive in my house?
但是，如果我的计算机（C 盘和 D 盘都在上面）坏了，我就没有受到保护了，所以我必须考虑一个解决方案，或者将数据副本存储到我的系统之外，比如存储到家里的 NAS 驱动器上？
But then what happens if something happens to my house, maybe I need to consider storing it on another system in another location, maybe the cloud is an option.
但如果我的房子发生了什么事，又该怎么办呢？也许我需要考虑将其存储在另一个位置的另一个系统上，也许云计算是一个选择。
Maybe I could store a copy of my important files in several locations to mitigate the risk of failure?
也许我可以将重要文件的副本存储在多个位置，以减轻故障风险？

### 3-2-1 Backup Methodolgy

Now seems a good time to talk about the 3-2-1 rule or backup methodology.
现在似乎是讨论 3-2-1 规则或备份方法论的好时机。
I did a [lightning talk](https://www.youtube.com/watch?v=5wRt1bJfKBw) covering this topic.
我做了一个[闪电演讲](https://www.youtube.com/watch?v=5wRt1bJfKBw)来涵盖这个主题。

We have already mentioned before some of the extreme ends of why we need to protect our data but a few more are listed below:
我们之前已经提到了为什么需要保护数据的一些极端情况，但下面还列出了一些：

![](Images/Day86_Data2.png)

Which then allows me to talk about the 3-2-1 methodology.
这让我可以谈谈 3-2-1 方法论。
My first copy or backup of my data should be as close to my production system as possible, the reason for this is based on speed to recovery and again going back to that original point about accidental deletion this is going to be the most common reason for recovery.
我的第一个数据副本或备份应该尽可能靠近我的生产系统，其原因基于恢复速度，并且回到关于意外删除的原始点，这是最常见的恢复原因。
But I want to be storing that on a suitable second media outside of the original or production system.
但我想将其存储在原始系统或生产系统之外的合适的第二种介质上。

We then want to make sure we also send a copy of our data external or offsite this is where a second location comes in be it another house, building, data centre or the public cloud.
然后，我们需要确保还将数据的副本发送到外部或异地，这时就需要第二个位置，无论是另一栋房屋、建筑物、数据中心还是公共云。

![](Images/Day86_Data3.png)

### Backup Responsibility

We have most likely heard all of the myths when it comes to not having to backup, things like "Everything is stateless" I mean if everything is stateless then what is the business?
我们很可能听过所有关于不需要备份的迷思，例如“一切都是无状态的”（Everything is stateless），我的意思是，如果一切都是无状态的，那业务是什么？
no databases? word documents?
没有数据库？Word 文档？
There is a level of responsibility on every individual within the business to ensure they are protected but it is going to come down most likely to the operations teams to provide the backup process for the mission-critical applications and data.
企业中的每个人都有责任确保他们受到保护，但最终很可能由运营团队为任务关键型应用和数据提供备份流程。

Another good one is that "High availability is my backup, we have built in multiple nodes into our cluster there is no way this is going down!"
另一个很好的例子是“高可用性就是我的备份，我们已经在集群中内置了多个节点，这绝不会宕机！”
apart from when you make a mistake to the database and this is replicated over all the nodes in the cluster, or there is fire, flood or blood scenario that means the cluster is no longer available and with it the important data.
除了当你对数据库操作失误并且这个错误被复制到集群中的所有节点上时，或者发生火灾、洪水或流血事件导致集群不再可用，同时重要的应用数据也丢失了。
It's not about being stubborn it is about being aware of the data and the services, absolutely everyone should factor in high availability and fault tolerance into their architecture but that does not substitute the need for backup!
这不是固执的问题，而是对数据和服务的意识问题，每个人都绝对应该将高可用性和容错能力纳入他们的架构中，但这并不能替代备份的必要性！

Replication can also seem to give us the offsite copy of the data and maybe that cluster mentioned above does live across multiple locations, however, the first accidental mistake would still be replicated there.
复制似乎也可以为我们提供数据的异地副本，也许上面提到的集群确实分布在多个位置，然而，第一个意外错误仍然会被复制到那里。
But again a Backup requirement should stand alongside application replication or system replication within the environment.
但同样，备份要求应该与环境中的应用复制或系统复制并行存在。

Now with all this said you can go to the extreme on the other end as well and send copies of data to too many locations which is going to not only cost but also increase the risk of being attacked as your surface area is now massively expanded.
话虽如此，你也可以走向另一个极端，将数据副本发送到过多的位置，这不仅会增加成本，还会增加被攻击的风险，因为你的攻击面现在被大规模扩展了。

Anyway, who looks after backup?
那么，谁来负责备份呢？
It will be different within each business but someone should be taking it upon themselves to understand the backup requirements.
在每个企业中情况都会有所不同，但应该有人主动承担起理解备份要求的责任。
But also understand the recovery plan!
但也要了解恢复计划！

### Nobody cares till everybody cares

Backup is a prime example, nobody cares about backup until you need to restore something.
备份就是一个典型的例子，直到你需要恢复某些东西时，才有人关心备份。
Alongside the requirement to back our data up we also need to consider how we restore!
除了备份数据的要求之外，我们还需要考虑如何恢复！

With our text document example, we are talking about very small files so the ability to copy back and forth is easy and fast.
对于我们的文本文档示例，我们讨论的是非常小的文件，因此来回复制的能力是简单且快速的。
But if we are talking about 100GB plus files then this is going to take time.
但如果我们讨论的是 100GB 以上的文件，那么这将需要时间。
Also, we have to consider the level at which we need to recover if we take a virtual machine for example.
此外，如果我们以虚拟机为例，我们必须考虑需要恢复的粒度级别。

We have the whole Virtual Machine, we have the Operating System, Application installation and then if this is a database server we will have some database files as well.
我们有整个虚拟机、操作系统、应用安装，然后如果这是一个数据库服务器，我们也会有一些数据库文件。
If we have made a mistake and inserted the wrong line of code into our database I probably don't need to restore the whole virtual machine, I want to be granular on what I recover back.
如果我们在数据库中犯了错误，插入了错误的行代码，我可能不需要恢复整个虚拟机，我希望在恢复时具有更高的粒度。

### Backup Scenario

I want to now start building on a scenario to protect some data, specifically, I want to protect some files on my local machine (in this case Windows but the tool I am going to use is not only free and open-source but also cross-platform)
我现在想开始构建一个场景来保护一些数据，具体来说，我想保护我本地机器上的一些文件（在这个例子中是 Windows，但我将使用的工具不仅是免费和开源的，而且还是跨平台的）。
I would like to make sure they are protected to a NAS device I have locally in my home but also into an Object Storage bucket in the cloud.
我想确保它们不仅被保护到我家里本地的 NAS 设备上，还被保护到云中的对象存储（Object Storage）存储桶中。

I want to back up this important data, it just so happens to be the repository for the 90DaysOfDevOps, which yes is also being sent to GitHub which is probably where you are reading this now but what if my machine was to die and GitHub was down?
我想备份这些重要数据，它恰好是 90DaysOfDevOps 的存储库，是的，它也被发送到了 GitHub（你现在可能正在那里阅读它），但如果我的机器坏了并且 GitHub 也宕机了怎么办？
How would anyone be able to read the content but also how would I potentially be able to restore that data to another service?
人们将如何阅读这些内容，以及我将如何才能将这些数据恢复到另一个服务？

![](Images/Day86_Data5.png)

There are lots of tools that can help us achieve this but I am going to be using a tool called [Kopia](https://kopia.io/) an Open-Source backup tool which will enable us to encrypt, dedupe and compress our backups whilst being able to send them to many locations.
有很多工具可以帮助我们实现这一点，但我将使用一个名为 [Kopia](https://kopia.io/) 的开源备份工具，它使我们能够加密、去重和压缩备份，同时能够将它们发送到许多位置。

You will find the releases to download [here](https://github.com/kopia/kopia/releases) at the time of writing I will be using v0.10.6.
你可以在[这里](https://github.com/kopia/kopia/releases)找到下载版本，在撰写本文时，我将使用 v0.10.6。

### Installing Kopia

There is a Kopia CLI and GUI, we will be using the GUI but know that you can have a CLI version of this as well for those Linux servers that do not give you a GUI.
Kopia 有 CLI（命令行界面）和 GUI（图形用户界面）版本，我们将使用 GUI，但要知道你也可以为那些没有 GUI 的 Linux 服务器提供 CLI 版本。

I will be using `KopiaUI-Setup-0.10.6.exe`
我将使用 `KopiaUI-Setup-0.10.6.exe`。

Really quick next next installation and then when you open the application you are greeted with the choice of selecting the storage type that you wish to use as your backup repository.
安装过程非常快，只需点击下一步，然后当你打开应用时，会看到选择你希望用作备份存储库的存储类型的选项。

![](Images/Day86_Data6.png)

### Setting up a Repository

Firstly we would like to set up a repository using our local NAS device and we are going to do this using SMB, but we could also use NFS I believe.
首先，我们想使用本地 NAS 设备设置一个存储库，我们将使用 SMB 来完成此操作，但我相信我们也可以使用 NFS。

![](Images/Day86_Data7.png)

On the next screen, we are going to define a password, this password is used to encrypt the repository contents.
在下一个屏幕上，我们将定义一个密码，此密码用于加密存储库内容。

![](Images/Day86_Data8.png)

Now that we have the repository configured we can trigger an ad-hoc snapshot to start writing data to it.
现在我们已经配置好存储库，我们可以触发即时快照（ad-hoc snapshot）开始向其写入数据。

![](Images/Day86_Data9.png)

First up we need to enter a path to what we want to snapshot and in our case we want to take a copy of our `90DaysOfDevOps` folder.
首先，我们需要输入我们想要进行快照的路径，在本例中，我们想要复制 `90DaysOfDevOps` 文件夹。
We will get back to the scheduling aspect shortly.
我们稍后会回到调度方面。

![](Images/Day86_Data10.png)

We can define our snapshot retention.
我们可以定义快照保留策略。

![](Images/Day86_Data11.png)

Maybe there are files or file types that we wish to exclude.
也许有一些我们希望排除的文件或文件类型。

![](Images/Day86_Data12.png)

If we wanted to define a schedule we could do this on this next screen, when you first create this snapshot this is the opening page to define.
如果我们要定义一个时间表，我们可以在下一个屏幕上进行，当你第一次创建这个快照时，这是定义的起始页面。

![](Images/Day86_Data13.png)

And you will see several other settings that can be handled here.
你还会看到可以在此处处理的其他几个设置。

![](Images/Day86_Data14.png)

Select snapshot now and the data will be written to your repository.
现在选择“快照”，数据将被写入你的存储库。

![](Images/Day86_Data15.png)

### Offsite backup to S3

With Kopia we can through the UI it seems only to have one repository configured at a time.
通过 Kopia 的 UI，似乎一次只能配置一个存储库。
But through the UI we can be creative and have multiple repository configuration files to choose from to achieve our goal of having a copy local and offsite in Object Storage.
但我们可以通过 CLI 灵活地拥有多个存储库配置文件可供选择，以实现我们将数据本地存储和异地存储在对象存储中的目标。

The Object Storage I am choosing to send my data to is going to Google Cloud Storage.
我选择将数据发送到的对象存储是 Google Cloud Storage。
I firstly logged into my Google Cloud Platform account and created a storage bucket.
我首先登录到我的 Google Cloud Platform 帐户并创建了一个存储桶。
I already had the Google Cloud SDK installed on my system but running the `gcloud auth application-default login` authenticated me with my account.
我的系统上已经安装了 Google Cloud SDK，但是运行 `gcloud auth application-default login` 命令会使用我的帐户进行身份验证。

![](Images/Day86_Data16.png)

I then used the CLI of Kopia to show me the current status of my repository after we added our SMB repository in the previous steps.
然后我使用 Kopia 的 CLI 来显示我们在前一步中添加 SMB 存储库之后，我的存储库的当前状态。
I did this using the `"C:\Program Files\KopiaUI\resources\server\kopia.exe" --config-file=C:\Users\micha\AppData\Roaming\kopia\repository.config repository status` command.
我使用了 `"C:\Program Files\KopiaUI\resources\server\kopia.exe" --config-file=C:\Users\micha\AppData\Roaming\kopia\repository.config repository status` 命令来执行此操作。

![](Images/Day86_Data17.png)

We are now ready to replace for the demo the configuration for the repository, what we would probably do if we wanted a long-term solution to hit both of these repositories is we would create an `smb.config` file and a `object.config` file and be able to run both of these commands to send our copies of data to each location.
现在我们准备为演示替换存储库的配置，如果我们想要一个能够同时访问这两个存储库的长期解决方案，我们可能会创建一个 `smb.config` 文件和一个 `object.config` 文件，并能够运行这两个命令将数据副本发送到每个位置。
To add our repository we ran `"C:\Program Files\KopiaUI\resources\server\kopia.exe" --config-file=C:\Users\micha\AppData\Roaming\kopia\repository.config repository create gcs --bucket 90daysofdevops`
要添加我们的存储库，我们运行了 `"C:\Program Files\KopiaUI\resources\server\kopia.exe" --config-file=C:\Users\micha\AppData\Roaming\kopia\repository.config repository create gcs --bucket 90daysofdevops`。

The above command is taking into account that the Google Cloud Storage bucket we created is called `90daysofdevops`
上面的命令是考虑到我们创建的 Google Cloud Storage 存储桶名为 `90daysofdevops`。

![](Images/Day86_Data18.png)

Now that we have created our new repository we can then run the `"C:\Program Files\KopiaUI\resources\server\kopia.exe" --config-file=C:\Users\micha\AppData\Roaming\kopia\repository.config repository status` command again and will now show the GCS repository configuration.
现在我们已经创建了新的存储库，我们可以再次运行 `"C:\Program Files\KopiaUI\resources\server\kopia.exe" --config-file=C:\Users\micha\AppData\Roaming\kopia\repository.config repository status` 命令，它现在将显示 GCS 存储库配置。

![](Images/Day86_Data19.png)

The next thing we need to do is create a snapshot and send that to our newly created repository.
接下来我们需要做的是创建一个快照并将其发送到我们新创建的存储库。
Using the `"C:\Program Files\KopiaUI\resources\server\kopia.exe" --config-file=C:\Users\micha\AppData\Roaming\kopia\repository.config kopia snapshot create "C:\Users\micha\demo\90DaysOfDevOps"` command we can kick off this process.
使用 `"C:\Program Files\KopiaUI\resources\server\kopia.exe" --config-file=C:\Users\micha\AppData\Roaming\kopia\repository.config kopia snapshot create "C:\Users\micha\demo\90DaysOfDevOps"` 命令，我们可以启动此过程。
You can see in the below browser that our Google Cloud Storage bucket now has kopia files based on our backup in place.
你可以在下面的浏览器中看到，我们的 Google Cloud Storage 存储桶现在已经有了基于我们已执行备份的 Kopia 文件。

![](Images/Day86_Data20.png)

With the above process we can settle our requirement of sending our important data to 2 different locations, 1 of which is offsite in Google Cloud Storage and of course we still have our production copy of our data on a different media type.
通过上述过程，我们可以满足将重要数据发送到 2 个不同位置的要求，其中一个位于 Google Cloud Storage 的异地，当然，我们仍然在另一种介质类型上保留了数据的生产副本。

### Restore

Restore is another consideration and is very important, Kopia gives us the capability to not only restore to the existing location but also a new location.
恢复是另一个重要的考虑因素，Kopia 使我们能够不仅恢复到现有位置，还可以恢复到新位置。

If we run the command `"C:\Program Files\KopiaUI\resources\server\kopia.exe" --config-file=C:\Users\micha\AppData\Roaming\kopia\repository.config snapshot list` this will list the snapshots that we have currently in our configured repository (GCS)
如果我们运行 `"C:\Program Files\KopiaUI\resources\server\kopia.exe" --config-file=C:\Users\micha\AppData\Roaming\kopia\repository.config snapshot list` 命令，它将列出我们当前配置的存储库（GCS）中的快照。

![](Images/Day86_Data21.png)

We can then mount those snapshots directly from GCS using the `"C:\Program Files\KopiaUI\resources\server\kopia.exe" --config-file=C:\Users\micha\AppData\Roaming\kopia\repository.config mount all Z:` command.
然后，我们可以使用 `"C:\Program Files\KopiaUI\resources\server\kopia.exe" --config-file=C:\Users\micha\AppData\Roaming\kopia\repository.config mount all Z:` 命令直接从 GCS 挂载这些快照。

![](Images/Day86_Data22.png)

We could also restore the snapshot contents using `kopia snapshot restore kdbd9dff738996cfe7bcf99b45314e193`
我们还可以使用 `kopia snapshot restore kdbd9dff738996cfe7bcf99b45314e193` 来恢复快照内容。

The commands above are very long and this is because I was using the KopiaUI version of the kopia.exe as explained at the top of the walkthrough you can download the kopia.exe and put it into a path so you can just use the `kopia` command.
上面的命令非常长，这是因为我使用的是 kopia.exe 的 KopiaUI 版本，正如在演练顶部解释的那样，你可以下载 kopia.exe 并将其放入路径中，这样你就可以直接使用 `kopia` 命令。

In the next session, we will be focusing on protecting workloads within Kubernetes.
在下一节中，我们将重点讨论保护 Kubernetes 中的工作负载。

## Resources

- [Kubernetes Backup and Restore made easy!](https://www.youtube.com/watch?v=01qcYSck1c4&t=217s)
- [Kubernetes Backups, Upgrades, Migrations - with Velero](https://www.youtube.com/watch?v=zybLTQER0yY)
- [7 Database Paradigms](https://www.youtube.com/watch?v=W2Z7fbCLSTw&t=520s)
- [Disaster Recovery vs. Backup: What's the difference?](https://www.youtube.com/watch?v=07EHsPuKXc0)
- [Veeam Portability & Cloud Mobility](https://www.youtube.com/watch?v=hDBlTdzE6Us&t=3s)

See you on [Day 87](day87.md)
我们第 87 天见 [Day 87](day87.md)
