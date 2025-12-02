---
title: '#90DaysOfDevOps - The Big Picture: Monitoring - Day 77'
published: false
description: 90DaysOfDevOps - The Big Picture Monitoring
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048715
---

## The Big Picture: Monitoring

In this section we are going to talk about monitoring, what is it and why do we need it?
在本节中，我们将讨论监控，它是什么以及为什么我们需要它？

### What is Monitoring?

Monitoring is the process of keeping a close eye on the entire infrastructure
监控是密切关注整个基础设施的过程。

### and why do we need it?

Let's assume we're managing a thousand servers these include a variety of specialised servers like application servers, database servers and web servers. We could also complicate this further with additional services and different platforms including public cloud offerings and Kubernetes.
假设我们正在管理一千台服务器，其中包括各种专用服务器，如应用服务器、数据库服务器和Web服务器。我们还可以通过额外的服务和不同的平台（包括公共云产品和Kubernetes）使问题进一步复杂化。

![](Images/Day77_Monitoring1.png)

We are responsible for ensuring that all the services, applications and resources on the servers are running as they should be.
我们有责任确保服务器上的所有服务、应用程序和资源都按应有的方式运行。

![](Images/Day77_Monitoring2.png)

How do we do it? there are three ways:
我们如何做到这一点？有三种方法：

- Login manually to all of our servers and check all the data about service processes and resources.
- 手动登录到我们所有的服务器并检查有关服务进程和资源的所有数据。
- Write a script that logs in to the servers for us and checks on the data.
- 编写一个脚本，代我们登录到服务器并检查数据。

Both of these options would require a considerable amount of work on our part,
这两种选择都需要我们付出大量的劳动，

The third option is easier, we could use a monitoring solution that is available in the market.
第三种选择更容易，我们可以使用市场上现有的监控解决方案。

Nagios and Zabbix are possible solutions that are readily available which allow us to upscale our monitoring infrastructure to include as many servers as we want.
Nagios和Zabbix是现成的可行解决方案，它们允许我们扩展监控基础设施，以包含任意数量的服务器。

### Nagios

Nagios is an infrastructure monitoring tool that is made by a company that goes by the same name. The open-source version of this tool is called Nagios core while the commercial version is called Nagios XI. [Nagios Website](https://www.nagios.org/)
Nagios是一款基础设施监控工具，由一家同名公司开发。该工具的开源版本称为Nagios core，而商业版本称为Nagios XI。[Nagios Website](https://www.nagios.org/)

The tool allows us to monitor our servers and see if they are being sufficiently utilised or if there are any tasks of failure that need addressing.
该工具允许我们监控服务器，查看它们是否得到了充分利用，或者是否存在需要解决的故障任务。

![](Images/Day77_Monitoring3.png)

Essentially monitoring allows us to achieve these two goals, check the status of our servers and services and determine the health of our infrastructure it also gives us a 40,000ft view of the complete infrastructure to see if our servers are up and running if the applications are working properly and the web servers are reachable or not.
本质上，监控使我们能够实现这两个目标：检查服务器和服务的状态，并确定我们基础设施的健康状况。它还为我们提供了整个基础设施的概览（40,000英尺视角），以查看我们的服务器是否启动并运行，应用程序是否正常工作以及Web服务器是否可访问。

It will tell us that our disk has been increasing by 10 per cent for the last 10 weeks in a particular server, that it will exhaust entirely within the next four or five days and we'll fail to respond soon it will alert us when your disk or server is in a critical state so that we can take appropriate actions to avoid possible outages.
它会告诉我们，在特定服务器上，我们的磁盘在过去10周内增加了10%，并且它将在接下来的四五天内完全耗尽，如果我们不迅速做出反应，它将警示我们。当您的磁盘或服务器处于关键状态时，它会提醒我们，以便我们可以采取适当的行动来避免可能的停机。

In this case, we can free up some disk space and ensure that our servers don't fail and that our users are not affected.
在这种情况下，我们可以释放一些磁盘空间，确保我们的服务器不会崩溃，并且我们的用户不会受到影响。

The difficult question for most monitoring engineers is what do we monitor? and alternately what do we not?
对于大多数监控工程师来说，困难的问题是：我们监控什么？以及，我们不监控什么？

Every system has several resources, which of these should we keep a close eye on and which ones can we turn a blind eye to for instance is it necessary to monitor CPU usage the answer is yes obviously nevertheless it is still a decision that has to be made is it necessary to monitor the number of open ports in the system we may or may not have to depend on the situation if it is a general-purpose server we probably won't have to but then again if it is a webserver we probably would have to.
每个系统都有多种资源，我们应该密切关注哪些资源，而又可以忽略哪些资源呢？例如，是否有必要监控CPU使用率？答案显然是肯定的，尽管如此，这仍然是一个必须做出的决定。是否有必要监控系统中的开放端口数量？这取决于具体情况，可能需要，也可能不需要。如果它是通用服务器，我们可能不需要；但如果它是一个Web服务器，我们可能就需要监控。

### Continuous Monitoring

Monitoring is not a new item and even continuous monitoring has been an ideal that many enterprises have adopted for many years.
监控并不是一个新事物，甚至持续监控也是许多企业多年来一直采用的理想做法。

There are three key areas of focus when it comes to monitoring.
在监控方面，有三个关键的重点领域。

- Infrastructure Monitoring
- 基础设施监控
- Application Monitoring
- 应用监控
- Network Monitoring
- 网络监控

The important thing to note is that there are many tools available we have mentioned two generic systems and tools in this session but there are lots. The real benefit of a monitoring solution comes when you have spent the time making sure you are answering the question of what should we be monitoring and what shouldn't we?
需要注意的重要一点是，有许多可用的工具。我们在本次会议中提到了两种通用系统和工具，但实际上有很多。监控解决方案的真正益处在于，你花时间确保自己回答了“我们应该监控什么，不应该监控什么？”这个问题。

We could turn on a monitoring solution in any of our platforms and it will start grabbing information but if that information is simply too much then you are going to struggle to benefit from that solution, you have to spend the time to configure it.
我们可以在任何平台上开启监控解决方案，它将开始抓取信息但如果这些信息过多，那么你就很难从该解决方案中受益，你必须花时间去配置它。

In the next session, we will get hands-on with a monitoring tool and see what we can start monitoring.
在下一节中，我们将亲自动手使用一个监控工具，看看我们可以开始监控哪些内容。

## Resources

- [The Importance of Monitoring in DevOps](https://www.devopsonline.co.uk/the-importance-of-monitoring-in-devops/)
- [Understanding Continuous Monitoring in DevOps?](https://medium.com/devopscurry/understanding-continuous-monitoring-in-devops-f6695b004e3b)
- [DevOps Monitoring Tools](https://www.youtube.com/watch?v=Zu53QQuYqJ0)
- [Top 5 - DevOps Monitoring Tools](https://www.youtube.com/watch?v=4t71iv_9t_4)
- [How Prometheus Monitoring works](https://www.youtube.com/watch?v=h4Sl21AKiDg)
- [Introduction to Prometheus monitoring](https://www.youtube.com/watch?v=5o37CGlNLr8)

See you on [Day 78](day78.md)
期待在 [Day 78](day78.md) 与您相见
