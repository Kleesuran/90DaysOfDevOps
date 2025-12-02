---
title: '#90DaysOfDevOps - The Big Picture: Data Management - Day 84'
published: false
description: 90DaysOfDevOps - The Big Picture Data Management
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048747
---

## The Big Picture: Data Management

![](Images/Day84_Data1.png)

Data Management is by no means a new wall to climb, although we do know that data is more important than it may be was a few years ago.
数据管理绝非一个需要攀登的新挑战，尽管我们知道数据比几年前可能更加重要。
Valuable and ever-changing it can also be a massive nightmare when we are talking about automation and continuously integrating, testing and deploying frequent software releases. Enter the persistent data and underlying data services are often the main culprit when things go wrong.
数据既有价值又瞬息万变，当我们谈论自动化以及持续集成、测试和部署频繁的软件版本时，它也可能是一个巨大的梦魇。在这种情况下，持久性数据和底层数据服务往往是出错时的主要症结所在。

But before I get into Cloud-Native Data Management, we need to go up a level. We have touched on many different platforms throughout this challenge. Be it Physical, Virtual, Cloud or Cloud-Native obviously including Kubernetes there is none of these platforms that provide the lack of requirement for data management.
但在我深入探讨云原生数据管理之前，我们需要提升一个层次。在整个挑战过程中，我们接触了许多不同的平台。无论是物理、虚拟、云还是云原生（显然包括 Kubernetes），所有这些平台都需要数据管理。

Whatever our business it is more than likely you will find a database lurking in the environment somewhere, be it for the most mission-critical system in the business or at least some cog in the chain is storing that persistent data on some level of the system.
无论我们的业务是什么，你很可能会在环境中的某个地方发现数据库的存在，无论它是用于业务中最关键的系统，还是链条中的某个环节正在系统的某个层面上存储持久性数据。

### DevOps and Data

Much like the very start of this series where we spoke about the DevOps principles, for a better process when it comes to data you have to include the right people. This might be the DBAs but equally, that is going to include people that care about the backup of those data services as well.
就像本系列开篇我们讨论 DevOps 原则一样，要在数据方面实现更好的流程，你必须纳入合适的人员。这可能是数据库管理员（DBA），但同样也会包括关心这些数据服务备份的人员。

Secondly, we also need to identify the different data types, domains, and boundaries that we have associated with our data. This way it is not just dealt with in a silo approach amongst Database administrators, storage engineers or Backup focused engineers.
其次，我们还需要识别与我们的数据相关的不同数据类型、域和边界。这样，数据就不会只由数据库管理员、存储工程师或专注于备份的工程师以孤立的方式处理。
This way the whole team can determine the best route of action when it comes to developing and hosting applications for the wider business and focus on the data architecture vs it being an afterthought.
通过这种方式，整个团队可以在为更广泛的业务开发和托管应用程序时确定最佳行动方案，并关注数据架构，而不是将其视为事后考虑的问题。

Now, this can span many different areas of the data lifecycle, we could be talking about data ingest, where and how will data be ingested into our service or application? How will the service, application or users access this data? But then it also requires us to understand how we will secure the data and then how will we protect that data.
如今，这可以涵盖数据生命周期的许多不同领域，我们可能会谈论数据摄取（data ingest），数据将如何以及在哪里被摄取到我们的服务或应用程序中？服务、应用程序或用户将如何访问这些数据？但它也要求我们理解将如何保护数据以及如何确保数据的安全。

### Data Management 101

Data management according to the [Data Management Body of Knowledge](https://www.dama.org/cpages/body-of-knowledge) is “the development, execution and supervision of plans, policies, programs and practices that control, protect, deliver and enhance the value of data and information assets.”
根据《[数据管理知识体系](https://www.dama.org/cpages/body-of-knowledge)》（Data Management Body of Knowledge），数据管理是“对控制、保护、交付和增强数据与信息资产价值的计划、政策、程序和实践进行制定、执行和监督”。

- Data is the most important aspect of your business - Data is only one part of your overall business. I have seen the term "Data is the lifeblood of our business" and most likely true. This then got me thinking about blood being pretty important to the body but alone it is nothing we still need the aspects of the body to make the blood something other than a liquid.
- 数据是业务中最重要的方面 - 数据只是你整个业务的一部分。我见过“数据是我们业务的命脉”这个说法，这很可能是正确的。这让我想到了血液对身体非常重要，但它本身什么都不是，我们仍然需要身体的其他部分来使血液不仅仅是一种液体。

- Data quality is more important than ever - We are having to treat data as a business asset, meaning that we have to give it the considerations it needs and requires to work with our automation and DevOps principles.
- 数据质量比以往任何时候都更加重要 - 我们必须将数据视为一项业务资产，这意味着我们必须给予它所需的考量，使其能够与我们的自动化和 DevOps 原则协同工作。

- Accessing data in a timely fashion - Nobody has the patience to not have access to the right data at the right time to make effective decisions. Data must be available in a streamlined and timely manner regardless of presentation.
- 及时访问数据 - 没有人有耐心在需要做出有效决策的关键时刻无法访问到正确的数据。无论以何种形式展示，数据都必须以流畅和及时的方式可用。

- Data Management has to be an enabler to DevOps - I mentioned streamlining previously, we have to include the data management requirements into our cycle and ensure not just availability of that data but also include other important policy-based protection of those data points along with fully tested recovery models with that as well.
- 数据管理必须成为 DevOps 的推动者 - 我前面提到了流畅化，我们必须将数据管理要求纳入我们的周期中，不仅要确保数据的可用性，还要包括对这些数据点进行基于策略的重要保护，同时还要具备经过充分测试的恢复模型。

### DataOps

Both DataOps and DevOps apply the best practices of technology development and operations to improve quality, increase speed, reduce security threats, delight customers and provide meaningful and challenging work for skilled professionals.
DataOps 和 DevOps 都应用了技术开发和运营的最佳实践，以提高质量、加快速度、减少安全威胁、取悦客户，并为熟练的专业人员提供有意义且具有挑战性的工作。
DevOps and DataOps share goals to accelerate product delivery by automating as many process steps as possible. For DataOps, the objective is a resilient data pipeline and trusted insights from data analytics.
DevOps 和 DataOps 拥有共同的目标，即通过尽可能自动化更多的流程步骤来加速产品交付。对于 DataOps 而言，目标是建立弹性数据管道和从数据分析中获取可信赖的洞察。

Some of the most common higher-level areas that focus on DataOps are going to be Machine Learning, Big Data and Data Analytics including Artificial Intelligence.
DataOps 关注的一些最常见的高级领域包括机器学习、大数据和数据分析，以及人工智能。

### Data Management is the management of information

My focus throughout this section is not going to be getting into Machine Learning or Artificial Intelligence but focus on the protecting the data from a data protection point of view, the title of this subsection is "Data management is the management of information" and we can relate that information = data.
我在这一部分中的重点不会是深入探讨机器学习或人工智能，而是从数据保护的角度关注数据的保护，这个小节的标题是“数据管理就是信息管理”，我们可以将信息与数据关联起来。

Three key areas that we should consider along this journey with data are:
在这段数据之旅中，我们应该考虑三个关键领域：

- Accuracy - Making sure that production data is accurate, equally we need to ensure that our data in the form of backups are also working and tested against recovery to be sure if a failure or a reason comes up we need to be able to get back up and running as fast as possible.
- 准确性（Accuracy） - 确保生产数据是准确的，同样我们需要确保以备份形式存在的数据也是有效的，并经过恢复测试，以确保在出现故障或某种原因时，我们能够尽快恢复运行。

- Consistent - If our data services span multiple locations then for production we need to make sure we have consistency across all data locations so that we are getting accurate data, this also spans into data protection when it comes to protecting these data services, especially data services we need to ensure consistency at different levels to make sure we are taking a good clean copy of that data for our backups, replicas etc.
- 一致性（Consistent） - 如果我们的数据服务跨越多个位置，那么对于生产环境，我们需要确保所有数据位置之间保持一致性，以便获取准确的数据。这也延伸到数据保护领域，尤其是在保护这些数据服务时，我们需要确保不同级别上的一致性，以确保我们为备份、副本等获取到良好且干净的数据副本。

- Secure - Access Control but equally just keeping data, in general, is a topical theme at the moment across the globe. Making sure the right people have access to your data is paramount, again this leads to data protection where we must make sure that only the required personnel have access to backups and the ability to restore from those as well clone and provide other versions of the business data.
- 安全性（Secure） - 访问控制，以及更普遍的数据保存，是目前全球范围内的一个热门话题。确保合适的人员能够访问你的数据至关重要，这也引向了数据保护，我们必须确保只有必需的人员才能访问备份，并具备从这些备份进行恢复、克隆和提供业务数据其他版本的能力。

Better Data = Better Decisions
更好的数据 = 更好的决策

### Data Management Days

During the next 6 sessions we are going to be taking a closer look at Databases, Backup & Recovery, Disaster Recovery, and Application Mobility all with an element of demo and hands-on throughout.
在接下来的 6 个会话中，我们将仔细研究数据库、备份与恢复、灾难恢复和应用程序移动性，所有这些都将贯穿演示和实际操作环节。

## Resources

- [Kubernetes Backup and Restore made easy!](https://www.youtube.com/watch?v=01qcYSck1c4&t=217s)
- [Kubernetes Backups, Upgrades, Migrations - with Velero](https://www.youtube.com/watch?v=zybLTQER0yY)
- [7 Database Paradigms](https://www.youtube.com/watch?v=W2Z7fbCLSTw&t=520s)
- [Disaster Recovery vs. Backup: What's the difference?](https://www.youtube.com/watch?v=07EHsPuKXc0)
- [Veeam Portability & Cloud Mobility](https://www.youtube.com/watch?v=hDBlTdzE6Us&t=3s)

See you on [Day 85](day85.md)