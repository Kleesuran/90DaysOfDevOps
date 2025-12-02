---
title: '#90DaysOfDevOps - ELK Stack - Day 80'
published: false
description: 90DaysOfDevOps - ELK Stack
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048746
---

## ELK Stack

In this session, we are going to get a little more hands-on with some of the options we have mentioned.
在本节中，我们将对我们提到的一些选项进行更多实践操作。

ELK Stack is the combination of 3 separate tools:
ELK Stack 是 3 个独立工具的组合：

- [Elasticsearch](https://www.elastic.co/what-is/elasticsearch) is a distributed, free and open search and analytics engine for all types of data, including textual, numerical, geospatial, structured, and unstructured.
- [Elasticsearch](https://www.elastic.co/what-is/elasticsearch) 是一个分布式、免费和开放的搜索和分析引擎，适用于所有类型的数据，包括文本、数字、地理空间、结构化和非结构化数据。

- [Logstash](https://www.elastic.co/logstash/) is a free and open server-side data processing pipeline that ingests data from a multitude of sources, transforms it, and then sends it to your favourite "stash."
- [Logstash](https://www.elastic.co/logstash/) 是一个免费和开放的服务器端数据处理管道，可从大量来源摄取数据，对其进行转换，然后将其发送到你最喜欢的“存储库（stash）”中。

- [Kibana](https://www.elastic.co/kibana/) is a free and open user interface that lets you visualize your Elasticsearch data and navigate the Elastic Stack. Do anything from tracking query load to understanding the way requests flow through your apps.
- [Kibana](https://www.elastic.co/kibana/) 是一个免费且开放的用户界面，允许你可视化 Elasticsearch 数据并浏览 Elastic Stack。你可以进行从跟踪查询负载到了解请求如何在应用程序中流动的任何操作。

ELK stack lets us reliably and securely take data from any source, in any format, then search, analyze, and visualize it in real time.
ELK stack 使我们能够可靠且安全地从任何来源、任何格式获取数据，然后实时搜索、分析和可视化这些数据。

On top of the above-mentioned components, you might also see Beats which are lightweight agents that are installed on edge hosts to collect different types of data for forwarding into the stack.
除了上述组件之外，你可能还会看到 Beats，它们是安装在边缘主机上的轻量级代理，用于收集不同类型的数据并将其转发到堆栈中。

- Logs: Server logs that need to be analysed are identified
- Logs：识别需要分析的服务器日志

- Logstash: Collect logs and events data. It even parses and transforms data
- Logstash：收集日志和事件数据。它甚至可以解析和转换数据

- ElasticSearch: The transformed data from Logstash is Store, Search, and indexed.
- ElasticSearch：来自 Logstash 的转换后的数据进行存储、搜索和索引。

- Kibana uses Elasticsearch DB to Explore, Visualize, and Share
- Kibana 使用 Elasticsearch 数据库进行探索、可视化和共享

![](Images/Day80_Monitoring8.png)

[Picture taken from Guru99](https://www.guru99.com/elk-stack-tutorial.html)
[图片来自 Guru99](https://www.guru99.com/elk-stack-tutorial.html)

A good resource explaining this [Is the Complete Guide to the ELK Stack](https://logz.io/learn/complete-guide-elk-stack/)
一个很好的解释资源是 [ELK Stack 完整指南](https://logz.io/learn/complete-guide-elk-stack/)

With the addition of beats, the ELK Stack is also now known as Elastic Stack.
随着 Beats 的加入，ELK Stack 现在也称为 Elastic Stack。

For the hands-on scenario, there are many places you can deploy the Elastic Stack but we are going to be using docker-compose to deploy locally on our system.
对于实践场景，你可以在许多地方部署 Elastic Stack，但我们将使用 docker-compose 在我们的系统上进行本地部署。

[Start the Elastic Stack with Docker Compose](https://www.elastic.co/guide/en/elastic-stack-get-started/current/get-started-stack-docker.html#get-started-docker-tls)

![](Images/Day80_Monitoring1.png)

You will find the original files and walkthrough that I used here [deviantony/docker-elk](https://github.com/deviantony/docker-elk)
你可以在这里找到我使用的原始文件和演练 [deviantony/docker-elk](https://github.com/deviantony/docker-elk)

Now we can run `docker-compose up -d`, the first time this has been running will require the pulling of images.
现在我们可以运行 `docker-compose up -d`，第一次运行时需要拉取镜像。

![](Images/Day80_Monitoring2.png)

If you follow either this repository or the one that I used you will have either the password of "changeme" or in my repository the password of "90DaysOfDevOps". The username is "elastic"
如果你遵循这个仓库或我使用的那个仓库，你的密码要么是 "changeme"，要么在我自己的仓库中是 "90DaysOfDevOps"。用户名是 "elastic"

After a few minutes, we can navigate to `http://localhost:5601/` which is our Kibana server / Docker container.
几分钟后，我们可以导航到 `http://localhost:5601/`，这是我们的 Kibana 服务器/Docker 容器。

![](Images/Day80_Monitoring3.png)

Your initial home screen is going to look something like this.
你的初始主屏幕看起来像这样。

![](Images/Day80_Monitoring4.png)

Under the section titled "Get started by adding integrations" there is a "try sample data" click this and we can add one of the shown below.
在标题为“Get started by adding integrations（通过添加集成开始）”的部分下，有一个“try sample data（尝试样本数据）”的按钮，点击它，我们可以添加下面显示的一个选项。

![](Images/Day80_Monitoring5.png)

I am going to select "Sample weblogs" but this is really to get a look and feel of what data sets you can get into the ELK stack.
我将选择“Sample weblogs（样本网络日志）”，但这主要是为了让你了解可以将哪些数据集导入到 ELK stack 中。

When you have selected "Add Data" it takes a while to populate some of that data and then you have the "View Data" option and a list of the available ways to view that data in the dropdown.
当你选择了“Add Data（添加数据）”后，填充部分数据需要一些时间，然后你就会看到“View Data（查看数据）”选项以及下拉列表中可用的查看该数据的方式。

![](Images/Day80_Monitoring6.png)

As it states on the dashboard view:
正如仪表板视图中所述：

**Sample Logs Data**

> This dashboard contains sample data for you to play with. You can view it, search it, and interact with the visualizations. For more information about Kibana, check our docs.

> 这个仪表板包含用于供你操作的示例数据。你可以查看它、搜索它并与可视化效果进行交互。有关 Kibana 的更多信息，请查看我们的文档。

![](Images/Day80_Monitoring7.png)

This is using Kibana to visualise data that has been added into ElasticSearch via Logstash. This is not the only option but I wanted to deploy and look at this.
这是使用 Kibana 来可视化通过 Logstash 添加到 ElasticSearch 中的数据。这不是唯一的选择，但我希望部署并查看它。

We are going to cover Grafana at some point and you are going to see some data visualisation similarities between the two, you have also seen Prometheus.
我们将在某个时候介绍 Grafana，你将看到两者之间的一些数据可视化相似之处，你之前也见过 Prometheus。

The key takeaway I have had between the Elastic Stack and Prometheus + Grafana is that Elastic Stack or ELK Stack is focused on Logs and Prometheus is focused on metrics.
我在 Elastic Stack 和 Prometheus + Grafana 之间获得的重点是，Elastic Stack 或 ELK Stack 侧重于日志（Logs），而 Prometheus 侧重于指标（metrics）。

I was reading this article from MetricFire [Prometheus vs. ELK](https://www.metricfire.com/blog/prometheus-vs-elk/) to get a better understanding of the different offerings.
我正在阅读 MetricFire 的这篇文章 [Prometheus vs. ELK](https://www.metricfire.com/blog/prometheus-vs-elk/)，以便更好地了解这些不同的产品。

## Resources

- [Understanding Logging: Containers & Microservices](https://www.youtube.com/watch?v=MMVdkzeQ848)
- [The Importance of Monitoring in DevOps](https://www.devopsonline.co.uk/the-importance-of-monitoring-in-devops/)
- [Understanding Continuous Monitoring in DevOps?](https://medium.com/devopscurry/understanding-continuous-monitoring-in-devops-f6695b004e3b)
- [DevOps Monitoring Tools](https://www.youtube.com/watch?v=Zu53QQuYqJ0)
- [Top 5 - DevOps Monitoring Tools](https://www.youtube.com/watch?v=4t71iv_9t_4)
- [How Prometheus Monitoring works](https://www.youtube.com/watch?v=h4Sl21AKiDg)
- [Introduction to Prometheus monitoring](https://www.youtube.com/watch?v=5o37CGlNLr8)
- [Promql cheat sheet with examples](https://www.containiq.com/post/promql-cheat-sheet-with-examples)
- [Log Management for DevOps | Manage application, server, and cloud logs with Site24x7](https://www.youtube.com/watch?v=J0csO_Shsj0)
- [Log Management what DevOps need to know](https://devops.com/log-management-what-devops-teams-need-to-know/)
- [What is ELK Stack?](https://www.youtube.com/watch?v=4X0WLg05ASw)
- [Fluentd simply explained](https://www.youtube.com/watch?v=5ofsNyHZwWE&t=14s)

See you on [Day 81](day81.md)
[第 81 天](day81.md) 见
