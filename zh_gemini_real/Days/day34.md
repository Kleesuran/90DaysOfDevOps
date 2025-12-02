---
title: '#90DaysOfDevOps - Microsoft Azure Hands-On Scenarios - Day 34'
published: false
description: 90DaysOfDevOps - Microsoft Azure Hands-On Scenarios
tags: 'DevOps, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048763
---

## Microsoft Azure Hands-On Scenarios

The last 6 days have been focused on Microsoft Azure and the public cloud in general, a lot of this foundation had to contain a lot of theory to understand the building blocks of Azure but also this will nicely translate to the other major cloud providers as well.
过去 6 天的重点是 Microsoft Azure 和公有云，这些基础知识必须包含大量的理论来理解 Azure 的构建块，但这也会很好地转化为其他主要的云提供商。

I mentioned at the very beginning about getting a foundational knowledge of the public cloud and choosing one provider to at least begin with, if you are dancing between different clouds then I believe you can get lost quite easily whereas choosing one you get to understand the fundamentals and when you have those it is quite easy to jump into the other clouds and accelerate your learning.
我在最开始就提到要掌握公有云的基础知识，并至少选择一家提供商入门；如果你在不同的云之间徘徊，我相信你很容易迷失方向，而选择一家云提供商可以让你理解其基本原理，有了这些基础，跳入其他云并加速你的学习就相当容易了。

In this final session, I am going to be picking and choosing my hands-on scenarios from this page here which is a reference created by Microsoft and is used for preparations for the [AZ-104 Microsoft Azure Administrator](https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/)
在这最后一次会议中，我将从这个页面中挑选我的动手实践场景，这是 Microsoft 创建的参考资料，用于准备 [AZ-104 Microsoft Azure Administrator](https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/) 认证。

There are some here such as Containers and Kubernetes that we have not covered in any detail as of yet so I don't want to jump in there just yet.
这里面有一些我们尚未详细介绍的内容，例如容器（Containers）和 Kubernetes，所以我暂时不想跳到那里。

In previous posts, we have created most of Modules 1,2 and 3.
在之前的帖子中，我们已经完成了模块 1、2 和 3 的大部分内容。

### Virtual Networking

Following [Module 04](https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_04-Implement_Virtual_Networking.html):
遵循 [Module 04](https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_04-Implement_Virtual_Networking.html):

I went through the above and changed a few namings for #90DaysOfDevOps. I also instead of using the Cloud Shell went ahead and logged in with my new user created on previous days with the Azure CLI on my Windows machine.
我通读了上面的内容，并为 #90DaysOfDevOps 更改了一些命名。我也没有使用 Cloud Shell，而是直接在我的 Windows 机器上使用 Azure CLI，用前几天创建的新用户登录。

You can do this using the `az login` which will open a browser and let you authenticate to your account.
你可以使用 `az login` 来完成此操作，它将打开一个浏览器并允许你对你的帐户进行身份验证。

I have then created a PowerShell script and some references from the module to use to build out some of the tasks below. You can find the associated files in this folder.
接下来，我创建了一个 PowerShell 脚本和一些来自模块的参考资料，用于构建下面的一些任务。你可以在此文件夹中找到相关文件。
(Cloud\01VirtualNetworking)

Please make sure you change the file location in the script to suit your environment.
请确保更改脚本中的文件位置以适应你的环境。

At this first stage, we have no virtual network or virtual machines created in our environment, I only have a cloud shell storage location configured in my resource group.
在第一阶段，我们的环境中没有创建任何虚拟网络或虚拟机，我只在我的资源组中配置了一个 Cloud Shell 存储位置。

I first of all run my [PowerShell script](Cloud/01VirtualNetworking/Module4_90DaysOfDevOps.ps1)
我首先运行我的 [PowerShell script](Cloud/01VirtualNetworking/Module4_90DaysOfDevOps.ps1)

![](Images/Day34_Cloud1.png)

- Task 1: Create and configure a virtual network
- 任务 1：创建和配置虚拟网络

![](Images/Day34_Cloud2.png)

- Task 2: Deploy virtual machines into the virtual network
- 任务 2：将虚拟机部署到虚拟网络中

![](Images/Day34_Cloud3.png)

- Task 3: Configure private and public IP addresses of Azure VMs
- 任务 3：配置 Azure VM 的私有和公共 IP 地址

![](Images/Day34_Cloud4.png)

- Task 4: Configure network security groups
- 任务 4：配置网络安全组

![](Images/Day34_Cloud5.png)
![](Images/Day34_Cloud6.png)

- Task 5: Configure Azure DNS for internal name resolution
- 任务 5：配置 Azure DNS 进行内部名称解析

![](Images/Day34_Cloud7.png)
![](Images/Day34_Cloud8.png)

### Network Traffic Management

Following [Module 06](https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_06-Implement_Network_Traffic_Management.html):
遵循 [Module 06](https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_06-Implement_Network_Traffic_Management.html):

Next walkthrough, from the last one we have gone into our resource group and deleted our resources, if you had not set up the user account like me to only have access to that one resource group you could follow the module changing the name to `90Days*` this will delete all resources and resource group. This will be my process for each of the following labs.
接下来是演练，在上一个模块中，我们进入了我们的资源组并删除了资源。如果你没有像我一样设置用户账户以仅有权访问该资源组，你可以按照模块操作，将名称更改为 `90Days*`，这将删除所有资源和资源组。这将是我后续每个实验的流程。

For this lab, I have also created a PowerShell script and some references from the module to use to build out some of the tasks below. You can find the associated files in this folder.
对于这个实验，我还创建了一个 PowerShell 脚本和一些来自模块的参考资料，用于构建下面的一些任务。你可以在此文件夹中找到相关文件。
(Cloud\02TrafficManagement)

- Task 1: Provision of the lab environment
- 任务 1：预置实验环境

I first of all run my [PowerShell script](Cloud/02TrafficManagement/Mod06_90DaysOfDevOps.ps1)
我首先运行我的 [PowerShell script](Cloud/02TrafficManagement/Mod06_90DaysOfDevOps.ps1)

![](Images/Day34_Cloud9.png)

- Task 2: Configure the hub and spoke network topology
- 任务 2：配置中心辐射型网络拓扑

![](Images/Day34_Cloud10.png)

- Task 3: Test transitivity of virtual network peering
- 任务 3：测试虚拟网络对等互连的传递性

For this my 90DaysOfDevOps group did not have access to the Network Watcher because of permissions, I expect this is because Network Watchers are one of those resources that are not tied to a resource group which is where our RBAC was covered for this user. I added the East US Network Watcher contributor role to the 90DaysOfDevOps group.
对于此任务，我的 90DaysOfDevOps 组因权限问题无法访问 Network Watcher，我估计这是因为 Network Watcher 是那些不与资源组绑定的资源之一，而我们为该用户设置的 RBAC 权限仅覆盖资源组。我将“美国东部 Network Watcher 参与者”角色添加到了 90DaysOfDevOps 组中。

![](Images/Day34_Cloud11.png)
![](Images/Day34_Cloud12.png)
![](Images/Day34_Cloud13.png)

^ This is expected since the two spoke virtual networks do not peer with each other (virtual network peering is not transitive).
^ 这是预期的结果，因为两个辐射虚拟网络彼此不对等连接（虚拟网络对等互连不具有传递性）。

- Task 4: Configure routing in the hub and spoke topology
- 任务 4：配置中心辐射拓扑中的路由

I had another issue here with my account not being able to run the script as my user within the group 90DaysOfDevOps which I am unsure of so I did jump back into my main admin account. The 90DaysOfDevOps group is an owner of everything in the 90DaysOfDevOps Resource Group so would love to understand why I cannot run a command inside the VM?
我的账户在这里又遇到了另一个问题，我无法以 90DaysOfDevOps 组中的用户身份运行脚本，我不太确定原因，所以我切换回了我的主管理员账户。90DaysOfDevOps 组是 90DaysOfDevOps 资源组中所有内容的拥有者，所以我想知道为什么我不能在 VM 内运行命令？

![](Images/Day34_Cloud14.png)
![](Images/Day34_Cloud15.png)

I then was able to go back into my michael.cade@90DaysOfDevOps.com account and continue this section. Here we are running the same test again but now with the result being reachable.
然后我能够回到我的 michael.cade@90DaysOfDevOps.com 账户并继续这一部分。我们再次运行相同的测试，但现在结果是可达的。

![](Images/Day34_Cloud16.png)

- Task 5: Implement Azure Load Balancer
- 任务 5：实施 Azure Load Balancer

![](Images/Day34_Cloud17.png)
![](Images/Day34_Cloud18.png)

- Task 6: Implement Azure Application Gateway
- 任务 6：实施 Azure Application Gateway

![](Images/Day34_Cloud19.png)
![](Images/Day34_Cloud20.png)

### Azure Storage

Following [Module 07](https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_07-Manage_Azure_Storage.html):
遵循 [Module 07](https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_07-Manage_Azure_Storage.html):

For this lab, I have also created a PowerShell script and some references from the module to use to build out some of the tasks below. You can find the associated files in this folder.
对于这个实验，我还创建了一个 PowerShell 脚本和一些来自模块的参考资料，用于构建下面的一些任务。你可以在此文件夹中找到相关文件。
(Cloud\03Storage)

- Task 1: Provision of the lab environment
- 任务 1：预置实验环境

I first of all run my [PowerShell script](Cloud/03Storage/Mod07_90DaysOfDeveOps.ps1)
我首先运行我的 [PowerShell script](Cloud/03Storage/Mod07_90DaysOfDeveOps.ps1)

![](Images/Day34_Cloud21.png)

- Task 2: Create and configure Azure Storage accounts
- 任务 2：创建和配置 Azure 存储账户

![](Images/Day34_Cloud22.png)

- Task 3: Manage blob storage
- 任务 3：管理 blob 存储

![](Images/Day34_Cloud23.png)

- Task 4: Manage authentication and authorization for Azure Storage
- 任务 4：管理 Azure 存储的身份验证和授权

![](Images/Day34_Cloud24.png)
![](Images/Day34_Cloud25.png)

I was a little impatient waiting for this to be allowed but it did work eventually.
我等了很久才等到它被允许，但我确实成功了。

![](Images/Day34_Cloud26.png)

- Task 5: Create and configure an Azure Files shares
- 任务 5：创建和配置 Azure 文件共享

On the run command, this would not work with michael.cade@90DaysOfDevOps.com so I used my elevated account.
在运行命令时，这对于 michael.cade@90DaysOfDevOps.com 账户不起作用，所以我使用了我的高权限账户。

![](Images/Day34_Cloud27.png)
![](Images/Day34_Cloud28.png)
![](Images/Day34_Cloud29.png)

- Task 6: Manage network access for Azure Storage
- 任务 6：管理 Azure 存储的网络访问

![](Images/Day34_Cloud30.png)

### Serverless (Implement Web Apps)

Following [Module 09a](https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_09a-Implement_Web_Apps.html):
遵循 [Module 09a](https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_09a-Implement_Web_Apps.html):

- Task 1: Create an Azure web app
- 任务 1：创建 Azure Web 应用

![](Images/Day34_Cloud31.png)

- Task 2: Create a staging deployment slot
- 任务 2：创建临时部署槽

![](Images/Day34_Cloud34.png)

- Task 3: Configure web app deployment settings
- 任务 3：配置 Web 应用部署设置

![](Images/Day34_Cloud33.png)

- Task 4: Deploy code to the staging deployment slot
- 任务 4：将代码部署到临时部署槽

![](Images/Day34_Cloud32.png)

- Task 5: Swap the staging slots
- 任务 5：交换临时部署槽

![](Images/Day34_Cloud35.png)

- Task 6: Configure and test autoscaling of the Azure web app
- 任务 6：配置和测试 Azure Web 应用的自动缩放

This script I am using can be found in (Cloud/04Serverless)
我正在使用的此脚本可以在 (Cloud/04Serverless) 中找到

![](Images/Day34_Cloud36.png)

This wraps up the section on Microsoft Azure and the public cloud in general. I will say that I had lots of fun attacking and working through these scenarios.
至此，关于 Microsoft Azure 和公有云的部分就结束了。我想说，我非常喜欢挑战并完成这些场景。

## Resources
资源

- [Hybrid Cloud and MultiCloud](https://www.youtube.com/watch?v=qkj5W98Xdvw)
- [Microsoft Azure Fundamentals](https://www.youtube.com/watch?v=NKEFWyqJ5XA&list=WL&index=130&t=12s)
- [Google Cloud Digital Leader Certification Course](https://www.youtube.com/watch?v=UGRDM86MBIQ&list=WL&index=131&t=10s)
- [AWS Basics for Beginners - Full Course](https://www.youtube.com/watch?v=ulprqHHWlng&t=5352s)

Next, we will be diving into version control systems, specifically around git and then also code repository overviews and we will be choosing GitHub as this is my preferred option.
接下来，我们将深入研究版本控制系统，特别是围绕 Git 的内容，然后是代码仓库概述，我们将选择 GitHub，因为这是我更喜欢的选择。

See you on [Day 35](day35.md)
第 35 天见 [Day 35](day35.md)
