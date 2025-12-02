---
title: '#90DaysOfDevOps - Data & Application Mobility - Day 90'
published: false
description: 90DaysOfDevOps - Data & Application Mobility
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048748
---

## Data & Application Mobility

Day 90 of the #90DaysOfDevOps Challenge! In this final session, I am going to cover the mobility of our data and applications. I am specifically going to focus on Kubernetes but the requirement across platforms and between platforms is something that is an ever-growing requirement and is seen in the field.
#90DaysOfDevOps 挑战的第 90 天！在这个最后的环节中，我将介绍我们的数据和应用程序的迁移能力。我将特别关注 Kubernetes，但跨平台和平台之间的需求是一个不断增长的需求，并且在实际领域中随处可见。

The use case being "I want to move my workload, application and data from one location to another" for many different reasons, could be cost, risk or to provide the business with a better service.
这里的用例是：“我想将我的工作负载、应用程序和数据从一个位置移动到另一个位置”，这可能是出于许多不同的原因，例如成本、风险，或者只是为了向企业提供更好的服务。

In this session, we are going to take our workload and we are going to look at moving a Kubernetes workload from one cluster to another, but in doing so we are going to change how our application is on the target location.
在本次会议中，我们将以我们的工作负载为例，研究如何将 Kubernetes 工作负载从一个集群移动到另一个集群，但在这样做时，我们将改变应用程序在目标位置的表现形式。

It uses a lot of the characteristics that we went through with [Disaster Recovery](day89.md)
它使用了我们学习 [Disaster Recovery](day89.md) 时所经历的许多特性。

### **The Requirement**

Our current Kubernetes cluster cannot handle demand and our costs are rocketing through the roof, it is a business decision that we wish to move our production Kubernetes cluster to our Disaster Recovery location, located on a different public cloud which will provide the ability to expand but also at a cheaper rate. We could also take advantage of some of the native cloud services available in the target cloud.
我们当前的 Kubernetes 集群无法满足需求，而且成本高昂，因此我们做出了一个业务决定，希望将生产 Kubernetes 集群迁移到我们的灾难恢复位置，该位置位于不同的公有云上，它将提供扩展能力，同时还能以更便宜的价格运行。我们还可以利用目标云中可用的一些原生云服务。

Our current mission-critical application (Pac-Man) has a database (MongoDB) and is running on slow storage, we would like to move to a newer faster storage tier.
我们当前的任务关键型应用程序（Pac-Man）有一个数据库（MongoDB），并且正在慢速存储上运行，我们希望迁移到更新、更快的存储层。

The current Pac-Man (NodeJS) front-end is not scaling very well, and we would like to increase the number of available pods in the new location.
当前的 Pac-Man (NodeJS) 前端扩展性不是很好，我们希望在新位置增加可用 Pod 的数量。

### Getting to IT

We have our brief and in fact, we have our imports already hitting the Disaster Recovery Kubernetes cluster.
我们已经拿到了简报，事实上，我们的导入数据已经到达了灾难恢复 Kubernetes 集群。

The first job we need to do is remove the restore operation we carried out on Day 89 for the Disaster Recovery testing.
我们首先需要做的就是删除我们在第 89 天为灾难恢复测试执行的恢复操作。

We can do this using `kubectl delete ns pacman` on the "standby" minikube cluster.
我们可以在“备用”minikube 集群上使用 `kubectl delete ns pacman` 来完成此操作。

![](Images/Day90_Data1.png)

To get started head into the Kasten K10 Dashboard, and select the Applications card. From the dropdown choose "Removed"
首先进入 Kasten K10 仪表板，选择 Applications 卡片。从下拉菜单中选择 "Removed"（已移除）。

![](Images/Day90_Data2.png)

We then get a list of the available restore points. We will select the one that is available as this contains our mission-critical data. (In this example we only have a single restore point.)
然后，我们获得了可用恢复点的列表。我们将选择可用的那个，因为它包含我们的任务关键型数据。（在此示例中，我们只有一个恢复点。）

![](Images/Day90_Data3.png)

When we worked on the Disaster Recovery process, we left everything as default. However, these additional restore options are there if you have a Disaster Recovery process that requires the transformation of your application. In this instance, we have the requirement to change our storage and number of replicas.
当我们进行灾难恢复过程时，我们让所有内容都保持默认设置。但是，如果您的灾难恢复过程需要对应用程序进行转换，则可以使用这些额外的恢复选项。在这种情况下，我们需要更改存储和副本的数量。

![](Images/Day90_Data4.png)

Select the "Apply transforms to restored resources" option.
选择 "Apply transforms to restored resources"（对恢复的资源应用转换）选项。

![](Images/Day90_Data5.png)

It just so happens that the two built-in examples for the transformation that we want to perform are what we need for our requirements.
碰巧，我们想要执行的转换所对应的两个内置示例正是我们要求所需的内容。

![](Images/Day90_Data6.png)

The first requirement is that on our primary cluster we were using a Storage Class called `csi-hostpath-sc` and in our new cluster we would like to use `standard` so we can make that change here.
第一个要求是，在我们的主集群上，我们使用了一个名为 `csi-hostpath-sc` 的存储类（Storage Class），而在我们的新集群中，我们希望使用 `standard`，因此我们可以在此处进行更改。

![](Images/Day90_Data7.png)

Looks good, hit the create transform button at the bottom.
看起来不错，点击底部的创建转换按钮（create transform button）。

![](Images/Day90_Data8.png)

The next requirement is that we would like to scale our Pac-Man frontend deployment to "5"
下一个要求是我们希望将 Pac-Man 前端部署扩展到“5”个副本。

![](Images/Day90_Data9.png)

If you are following along you should see both of our transforms as per below.
如果您正在跟着操作，您应该看到我们所有的两个转换，如下所示。

![](Images/Day90_Data10.png)

You can now see from the below image that we are going to restore all of the artefacts listed below, if we wanted to we could also be granular about what we wanted to restore. Hit the "Restore" button
现在您可以从下图中看到，我们将恢复下面列出的所有工件，如果需要，我们还可以更精细地选择要恢复的内容。点击 "Restore"（恢复）按钮。

![](Images/Day90_Data11.png)

Again, we will be asked to confirm the actions.
同样，系统将要求我们确认操作。

![](Images/Day90_Data12.png)

The final thing to show is now if we head back into the terminal and we take a look at our cluster, you can see we have 5 pods now for the Pacman pods and our storageclass is now set to standard vs the csi-hostpath-sc
最后要展示的是，现在如果我们回到终端并查看我们的集群，您可以看到 Pacman Pod 现在有 5 个 Pod，并且我们的 storageclass 现在设置为 `standard`，而不是 `csi-hostpath-sc`。

![](Images/Day90_Data13.png)

Many different options can be achieved through transformation. This can span not only migration but also Disaster Recovery, test and development type scenarios and more.
通过转换可以实现许多不同的选项。这不仅可以用于迁移，还可以用于灾难恢复、测试和开发等场景。

### API and Automation

I have not spoken about the ability to leverage the API and automate some of these tasks, but these options are present and throughout the UI some breadcrumbs provide the command sets to take advantage of the APIs for automation tasks.
我没有讨论利用 API 并自动执行其中一些任务的能力，但这些选项是存在的，并且在整个 UI 中，一些路径提示提供了利用 API 进行自动化任务的命令集。

The important thing to note about Kasten K10 is that on deployment it is deployed inside the Kubernetes cluster and then can be called through the Kubernetes API.
关于 Kasten K10 需要注意的重要一点是，在部署时，它被部署在 Kubernetes 集群内部，然后可以通过 Kubernetes API 调用。

This then brings us to a close on the section around Storing and Protecting your data.
至此，关于存储和保护数据这一部分就结束了。

## Resources

- [Kubernetes Backup and Restore made easy!](https://www.youtube.com/watch?v=01qcYSck1c4&t=217s)
- [Kubernetes Backups, Upgrades, Migrations - with Velero](https://www.youtube.com/watch?v=zybLTQER0yY)
- [7 Database Paradigms](https://www.youtube.com/watch?v=W2Z7fbCLSTw&t=520s)
- [Disaster Recovery vs. Backup: What's the difference?](https://www.youtube.com/watch?v=07EHsPuKXc0)
- [Veeam Portability & Cloud Mobility](https://www.youtube.com/watch?v=hDBlTdzE6Us&t=3s)

### **Closing**

As I wrap up this challenge, I want to continue to ask for feedback to make sure that the information is always relevant.
在我结束本次挑战之际，我希望继续征求反馈，以确保这些信息始终具有相关性。

I also appreciate there are a lot of topics that I was not able to cover or not able to dive deeper into around the topics of DevOps.
我也理解有很多关于 DevOps 的主题是我未能涵盖或未能深入探讨的。

This means that we can always make another attempt that this challenge next year and find another 90 days' worth of content and walkthroughs to work through.
这意味着我们明年可以再次尝试这一挑战，并找到另外 90 天的内容和演练来完成。

### What is next?

Firstly, a break from writing for a little while, I started this challenge on the 1st of January 2022 and I finished on the 31st of March 2022 at 19:50 BST! It has been a slog. But as I say and have said for a long time, if this content helps one person, then it is always worth learning in public!
首先，休息一段时间，不再写作。我于 2022 年 1 月 1 日开始这项挑战，并于 2022 年 3 月 31 日英国夏令时 19:50 完成！这是一场苦战。但正如我所说并长期坚持的，如果这些内容能帮助一个人，那么公开学习就是值得的！

I have some ideas on where to take this next and hopefully, it has a life outside of a GitHub repository and we can look at creating an eBook and possibly even a physical book.
对于下一步的发展，我有一些想法，希望它能够跳出 GitHub 存储库的范畴，我们可以考虑制作一本电子书，甚至可能是一本实体书。

I also know that we need to revisit each post and make sure everything is grammatically correct before making anything like that happen. If anyone does know about how to take markdown to print or to an eBook it would be greatly appreciated feedback.
我也知道，在实现类似目标之前，我们需要重新审视每篇文章，确保所有语法都正确无误。如果有人知道如何将 Markdown 转换为印刷品或电子书，我将非常感谢您的反馈。

As always keep the issues and PRs coming.
一如既往，欢迎提交问题 (issues) 和拉取请求 (PRs)。

Thanks!
@MichaelCade1

- [GitHub](https://github.com/MichaelCade)
- [Twitter](https://twitter.com/MichaelCade1)