---
title: '#90DaysOfDevOps - Microsoft Azure Storage Models - Day 32'
published: false
description: 90DaysOfDevOps - Microsoft Azure Storage Models
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048775
---

## Microsoft Azure Storage Models

### Storage Services

- Azure storage services are provided by storage accounts.
- 存储服务由存储账户提供。
- Storage accounts are primarily accessed via REST API.
- 存储账户主要通过 REST API 访问。
- A storage account must have a unique name that is part of a DNS name `<Storage Account name>.core.windows.net`
- 存储账户必须拥有一个唯一的名称，该名称是 DNS 名称 `<Storage Account name>.core.windows.net` 的一部分。
- Various replication and encryption options.
- 具有各种复制和加密选项。
- Sits within a resource group
- 位于资源组内。

We can create our storage group by simply searching for Storage Group in the search bar at the top of the Azure Portal.
我们可以通过在 Azure 门户顶部的搜索栏中搜索“存储组”（Storage Group）来创建我们的存储组。

![](Images/Day32_Cloud1.png)

We can then run through the steps to create our storage account remembering that this name needs to be unique and it also needs to be all lower case, with no spaces but can include numbers.
然后我们可以按照步骤创建我们的存储账户，请记住，该名称需要是唯一的，并且必须全部小写，没有空格，但可以包含数字。

![](Images/Day32_Cloud2.png)

We can also choose the level of redundancy we would like against our storage account and anything we store here. The further down the list the more expensive option but also the spread of your data.
我们还可以选择存储账户及其存储内容的冗余级别。列表越往下，选项越昂贵，但数据的分布也越广。

Even the default redundancy option gives us 3 copies of our data.
即使是默认的冗余选项，也会为我们提供 3 份数据副本。

[Azure Storage Redundancy](https://docs.microsoft.com/en-us/azure/storage/common/storage-redundancy)

Summary of the above link down below:
下面是上述链接的摘要：

- **Locally-redundant storage** - replicates your data three times within a single data centre in the primary region.
- **本地冗余存储 (Locally-redundant storage)** - 在主区域的单个数据中心内将数据复制三份。
- **Geo-redundant storage** - copies your data synchronously three times within a single physical location in the primary region using LRS.
- **异地冗余存储 (Geo-redundant storage)** - 使用 LRS 在主区域的单个物理位置同步复制您的数据三次。
- **Zone-redundant storage** - replicates your Azure Storage data synchronously across three Azure availability zones in the primary region.
- **区域冗余存储 (Zone-redundant storage)** - 在主区域的三个 Azure 可用区之间同步复制您的 Azure 存储数据。
- **Geo-zone-redundant storage** - combines the high availability provided by redundancy across availability zones with protection from regional outages provided by geo-replication. Data in a GZRS storage account is copied across three Azure availability zones in the primary region and is also replicated to a second geographic region for protection from regional disasters.
- **异地区域冗余存储 (Geo-zone-redundant storage)** - 将跨可用区冗余提供的高可用性与异地复制提供的区域中断保护相结合。GZRS 存储账户中的数据会在主区域的三个 Azure 可用区之间复制，并复制到第二个地理区域，以防止区域性灾难。

![](Images/Day32_Cloud3.png)

Just moving back up to performance options. We have Standard and Premium to choose from. We have chosen Standard in our walkthrough but premium gives you some specific options.
回到性能选项。我们有标准（Standard）和高级（Premium）可供选择。我们在演练中选择了标准，但高级提供了一些特定的选项。

![](Images/Day32_Cloud4.png)

Then in the drop-down, you can see we have these three options to choose from.
然后在下拉列表中，您可以看到我们有这三个选项可供选择。

![](Images/Day32_Cloud5.png)

There are lots more advanced options available for your storage account but for now, we do not need to get into these areas. These options are around encryption and data protection.
您的存储账户还有许多更高级的选项可用，但目前我们不需要深入研究这些领域。这些选项主要围绕加密和数据保护。

### Managed Disks

Storage access can be achieved in a few different ways.
存储访问可以通过几种不同的方式实现。

Authenticated access via:
通过以下方式进行身份验证访问：

- A shared key for full control.
- 共享密钥，用于完全控制。
- Shared Access Signature for delegated, granular access.
- 共享访问签名 (Shared Access Signature)，用于委托的、精细的访问。
- Azure Active Directory (Where Available)
- Azure Active Directory（如果可用）。

Public Access:
公共访问：

- Public access can also be granted to enable anonymous access including via HTTP.
- 也可以授予公共访问权限，以启用匿名访问，包括通过 HTTP 的访问。
- An example of this could be to host basic content and files in a block blob so a browser can view and download this data.
- 例如，可以在块 Blob 中托管基本内容和文件，以便浏览器可以查看和下载这些数据。

If you are accessing your storage from another Azure service, traffic stays within Azure.
如果您从另一个 Azure 服务访问存储，流量将保留在 Azure 内部。

When it comes to storage performance we have two different types:
谈到存储性能，我们有两种不同的类型：

- **Standard** - Maximum number of IOPS
- **标准 (Standard)** - 最大 IOPS（每秒输入/输出操作数）。
- **Premium** - Guaranteed number of IOPS
- **高级 (Premium)** - 保证的 IOPS 数量。

IOPS => Input/Output operations per sec.
IOPS => 每秒输入/输出操作。

There is also a difference between unmanaged and managed disks to consider when choosing the right storage for the task you have.
在为您的任务选择合适的存储时，还需要考虑非托管磁盘和托管磁盘之间的差异。

### Virtual Machine Storage

- Virtual Machine OS disks are typically stored on persistent storage.
- 虚拟机 OS 磁盘通常存储在持久性存储上。
- Some stateless workloads do not require persistent storage and reduced latency is a larger benefit.
- 一些无状态工作负载不需要持久存储，而降低延迟是更大的优势。
- There are VMs that support ephemeral OS-managed disks that are created on the node-local storage.
- 有些 VM 支持在节点本地存储上创建的临时 OS 托管磁盘 (ephemeral OS-managed disks)。
  - These can also be used with VM Scale Sets.
  - 它们也可以与虚拟机规模集 (VM Scale Sets) 结合使用。

Managed Disks are durable block storage that can be used with Azure Virtual Machines. You can have Ultra Disk Storage, Premium SSD, Standard SSD, or Standard HDD. They also carry some characteristics.
托管磁盘 (Managed Disks) 是可与 Azure 虚拟机一起使用的持久块存储。您可以使用超级磁盘存储 (Ultra Disk Storage)、高级 SSD、标准 SSD 或标准 HDD。它们也具有一些特性。

- Snapshot and Image support
- 支持快照和镜像。
- Simple movement between SKUs
- SKU 之间移动简单。
- Better availability when combined with availability sets
- 与可用性集结合使用时，可用性更高。
- Billed based on disk size not on consumed storage.
- 根据磁盘大小而不是消耗的存储空间计费。

## Archive Storage

- **Cool Tier** - A cool tier of storage is available to block and append blobs.
- **冷存储层 (Cool Tier)** - 适用于块 Blob 和追加 Blob 的冷存储层。
  - Lower Storage cost
  - 存储成本较低。
  - Higher transaction cost.
  - 事务成本较高。
- **Archive Tier** - Archive storage is available for block BLOBs.
- **存档存储层 (Archive Tier)** - 存档存储适用于块 Blob。
  - This is configured on a per-BLOB basis.
  - 这是按每个 Blob 配置的。
  - Cheaper cost, Longer Data retrieval latency.
  - 成本更低，数据检索延迟更长。
  - Same Data Durability as regular Azure Storage.
  - 与常规 Azure 存储具有相同的数据持久性。
  - Custom Data tiering can be enabled as required.
  - 可以根据需要启用自定义数据分层。

### File Sharing

From the above creation of our storage account, we can now create file shares.
根据上面创建的存储账户，我们现在可以创建文件共享。

![](Images/Day32_Cloud6.png)

This will provide SMB2.1 and 3.0 file shares in Azure.
这将提供 Azure 中的 SMB2.1 和 3.0 文件共享。

Useable within the Azure and externally via SMB3 and port 445 open to the internet.
可在 Azure 内部使用，也可通过 SMB3 和向互联网开放的端口 445 在外部使用。

Provides shared file storage in Azure.
在 Azure 中提供共享文件存储。

Can be mapped using standard SMB clients in addition to REST API.
除了 REST API，还可以使用标准的 SMB 客户端进行映射。

You might also notice [Azure NetApp Files](https://vzilla.co.uk/vzilla-blog/azure-netapp-files-how) (SMB and NFS)
您可能还会注意到 [Azure NetApp 文件](https://vzilla.co.uk/vzilla-blog/azure-netapp-files-how)（SMB 和 NFS）。

### Caching & Media Services

The Azure Content Delivery Network provides a cache of static web content with locations throughout the world.
Azure 内容分发网络 (CDN) 提供静态 Web 内容缓存，在全球设有多个位置。

Azure Media Services, provides media transcoding technologies in addition to playback services.
Azure 媒体服务除了提供播放服务外，还提供媒体转码技术。

## Microsoft Azure Database Models

Back on [Day 28](day28.md), we covered various service options. One of these was PaaS (Platform as a Service) where you abstract a large amount of the infrastructure and operating system away and you are left with the control of the application or in this case the database models.
回顾 [第 28 天](day28.md)，我们介绍了各种服务选项。其中之一是 PaaS（平台即服务），您将大量的底层基础设施和操作系统抽象化，只保留对应用程序的控制权，或者在本文中，只保留对数据库模型的控制权。

### Relational Databases

Azure SQL Database provides a relational database as a service based on Microsoft SQL Server.
Azure SQL 数据库提供了一种基于 Microsoft SQL Server 的关系数据库即服务。

This is SQL running the latest SQL branch with database compatibility level available where a specific functionality version is required.
此 SQL 运行最新的 SQL 分支，并在需要特定功能版本时提供数据库兼容性级别。

There are a few options on how this can be configured, we can provide a single database that provides one database in the instance, while an elastic pool enables multiple databases that share a pool of capacity and collectively scale.
关于如何配置它，有几个选项：我们可以提供一个单数据库，该实例中只有一个数据库；而弹性池 (elastic pool) 则允许多个数据库共享容量池并共同扩展。

These database instances can be accessed like regular SQL instances.
这些数据库实例可以像常规 SQL 实例一样访问。

Additional managed offerings for MySQL, PostgreSQL and MariaDB.
还有针对 MySQL、PostgreSQL 和 MariaDB 的额外托管服务。

![](Images/Day32_Cloud7.png)

### NoSQL Solutions

Azure Cosmos DB is a scheme agnostic NoSQL implementation.
Azure Cosmos DB 是一种与架构无关的 NoSQL 实现。

99.99% SLA
99.99% 服务级别协议 (SLA)。

Globally distributed database with single-digit latencies at the 99th percentile anywhere in the world with automatic homing.
全球分布式数据库，在世界任何地方均可在第 99 个百分位实现个位数延迟，并具有自动归属功能 (automatic homing)。

Partition key leveraged for the partitioning/sharding/distribution of data.
利用分区键 (Partition key) 来实现数据分区/分片/分发。

Supports various data models (documents, key-value, graph, column-friendly)
支持各种数据模型（文档、键值、图形、列友好型）。

Supports various APIs (DocumentDB SQL, MongoDB, Azure Table Storage and Gremlin)
支持各种 API（DocumentDB SQL、MongoDB、Azure 表存储和 Gremlin）。

![](Images/Day32_Cloud9.png)

Various consistency models are available based around [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem).
各种一致性模型都基于 [CAP 理论](https://en.wikipedia.org/wiki/CAP_theorem)。

![](Images/Day32_Cloud8.png)

### Caching

Without getting into the weeds about caching systems such as Redis I wanted to include that Microsoft Azure has a service called Azure Cache for Redis.
我不想深入探讨 Redis 等缓存系统，但我希望提一下 Microsoft Azure 有一项名为“Azure Cache for Redis”的服务。

Azure Cache for Redis provides an in-memory data store based on the Redis software.
Azure Cache for Redis 提供了一个基于 Redis 软件的内存数据存储。

- It is an implementation of the open-source Redis Cache.
- 它是开源 Redis 缓存的一个实现。
  - A hosted, secure Redis cache instance.
  - 一个托管的、安全的 Redis 缓存实例。
  - Different tiers are available
  - 提供不同的层级。
  - Application must be updated to leverage the cache.
  - 应用程序必须更新才能利用该缓存。
  - Aimed for an application that has high read requirements compared to writes.
  - 目标是针对读要求高、写要求相对较低的应用程序。
  - Key-Value store based.
  - 基于键值存储。

![](Images/Day32_Cloud10.png)

I appreciate the last few days have been a lot of note-taking and theory on Microsoft Azure but I wanted to cover the building blocks before we get into the hands-on aspects of how these components come together and work.
我知道过去几天我们一直在做大量的笔记和 Microsoft Azure 理论学习，但在我们开始动手实践这些组件如何组合和工作之前，我想先介绍一下基础构建块。

We have one more bit of theory remaining around networking before we can get some scenario-based deployments of services up and running. We also want to take a look at some of the different ways we can interact with Microsoft Azure vs just using the portal that we have been using so far.
在我们可以启动一些基于场景的服务部署之前，还有最后一点关于网络的理论需要讲解。我们还想看看与 Microsoft Azure 交互的不同方式，而不仅仅是我们目前一直在使用的门户。

## Resources

- [Hybrid Cloud and MultiCloud](https://www.youtube.com/watch?v=qkj5W98Xdvw)
- [Microsoft Azure Fundamentals](https://www.youtube.com/watch?v=NKEFWyqJ5XA&list=WL&index=130&t=12s)
- [Google Cloud Digital Leader Certification Course](https://www.youtube.com/watch?v=UGRDM86MBIQ&list=WL&index=131&t=10s)
- [AWS Basics for Beginners - Full Course](https://www.youtube.com/watch?v=ulprqHHWlng&t=5352s)

See you on [Day 33](day33.md)
我们 [第 33 天](day33.md) 见。