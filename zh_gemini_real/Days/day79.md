---
title: '#90DaysOfDevOps - The Big Picture: Log Management - Day 79'
published: false
description: 90DaysOfDevOps - The Big Picture Log Management
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049057
---

## The Big Picture: Log Management

A continuation of the infrastructure monitoring challenges and solutions, log management is another puzzle piece to the overall observability jigsaw.
作为基础设施监控挑战和解决方案的延续，日志管理是整体可观测性拼图中的另一块。

### Log Management & Aggregation

Let's talk about two core concepts the first of which is log aggregation and it's a way of collecting and tagging application logs from many different services and to a single dashboard that can easily be searched.
让我们讨论两个核心概念，第一个是日志聚合（log aggregation），它是一种从许多不同服务收集应用程序日志并进行标记，然后将其汇集到一个易于搜索的单一仪表板中的方法。

One of the first systems that have to be built out in an application performance management system is log aggregation. Application performance management is the part of the DevOps lifecycle where things have been built and deployed and you need to make sure that they're continuously working so they have enough resources allocated to them and errors aren't being shown to users. In most production deployments many related events emit logs across services at google a single search might hit ten different services before being returned to the user if you got unexpected search results that might mean a logic problem in any of the ten services and log aggregation helps companies like google diagnose problems in production, they've built a single dashboard where they can map every request to unique id so if you search something your search will get a unique id and then every time that search is passing through a different service that service will connect that id to what they're currently doing.
在应用程序性能管理系统（APM）中，首先要构建的系统之一就是日志聚合。应用程序性能管理是DevOps生命周期的一部分，当应用构建和部署完成后，你需要确保它们持续正常工作，分配给它们足够的资源，并且不向用户显示错误。在大多数生产部署中，许多相关的事件会在多个服务中发出日志。在谷歌，一次搜索可能会在返回给用户之前访问十个不同的服务。如果你得到了意料之外的搜索结果，这可能意味着这十个服务中的任何一个存在逻辑问题。日志聚合帮助像谷歌这样的公司诊断生产中的问题，他们建立了一个单一的仪表板，可以将每个请求映射到一个唯一的ID。因此，如果你搜索了某些内容，你的搜索会得到一个唯一的ID，然后每当该搜索通过不同的服务时，该服务就会将该ID与其正在执行的操作关联起来。

This is the essence of a good log aggregation platform efficiently collects logs from everywhere that emits them and makes them easily searchable in the case of a fault again.
这是一个好的日志聚合平台的精髓：它能有效地收集所有发出日志的地方的日志，并在再次出现故障时使它们易于搜索。

### Example App

Our example application is a web app, we have a typical front end and backend storing our critical data in a MongoDB database.
我们的示例应用程序是一个Web应用，我们有一个典型的包含前端和后端的架构，并将关键数据存储在MongoDB数据库中。

If a user told us the page turned all white and printed an error message we would be hard-pressed to diagnose the problem with our current stack the user would need to manually send us the error and we'd need to match it with relevant logs in the other three services.
如果用户告诉我们页面变白并打印出错误消息，我们将很难用我们当前的堆栈来诊断问题。用户需要手动将该错误发送给我们，而我们需要将该错误与其余三个服务中的相关日志进行匹配。

### ELK

Let's take a look at ELK, a popular open source log aggregation stack named after its three components elasticsearch, logstash and kibana if we installed it in the same environment as our example app.
让我们看看ELK，这是一个流行的开源日志聚合堆栈，以其三个组件：Elasticsearch、Logstash和Kibana命名。假设我们将其安装在与示例应用相同的环境中。

The web application would connect to the frontend which then connects to the backend, the backend would send logs to logstash and then the way that these three components work
Web应用程序将连接到前端，前端再连接到后端，后端会将日志发送给Logstash，然后这三个组件的工作方式是

### The components of elk

Elasticsearch, logstash and Kibana are that all the services send logs to logstash, logstash takes these logs which are text emitted by the application. For example, in the web application when you visit a web page, the web page might log this visitor's access to this page at this time and that's an example of a log message those logs would be sent to logstash.
Elasticsearch、Logstash和Kibana的工作方式是：所有服务都将日志发送给Logstash。Logstash接收这些日志，它们是应用程序发出的文本。例如，在Web应用中，当你访问一个网页时，该网页可能会记录该访问者在此时访问此页面的信息，这就是一个日志消息的例子。这些日志将被发送到Logstash。

Logstash would then extract things from them so for that log message user did **thing**, at **time**. It would extract the time and extract the message and extract the user and include those all as tags so the message would be an object of tags and message so that you could search them easily could find all of the requests made by a specific user but logstash doesn't store things itself it stores things in elasticsearch which is an efficient database for querying text and elasticsearch exposes the results as Kibana and Kibana is a web server that connects to elasticsearch and allows administrators as the DevOps person or other people on your team, the on-call engineer to view the logs in production whenever there's a major fault. You as the administrator would connect to Kibana, and Kibana would query elasticsearch for logs matching whatever you wanted.
然后Logstash会从中提取信息，例如对于日志消息“用户在 **time** 做了 **thing**”。它会提取时间、提取消息、提取用户，并将所有这些作为标签包含进去，这样消息就会成为标签和消息的对象，从而可以轻松搜索它们，例如找到特定用户发出的所有请求。但是Logstash本身不存储数据，它将数据存储在Elasticsearch中，Elasticsearch是一个用于查询文本的高效数据库。Elasticsearch通过Kibana暴露结果。Kibana是一个连接到Elasticsearch的Web服务器，允许管理员（如DevOps人员或团队中的其他人，即待命工程师）在发生重大故障时查看生产环境中的日志。作为管理员，您将连接到Kibana，Kibana会查询Elasticsearch以获取与您想要的任何内容匹配的日志。

You could say hey Kibana in the search bar I want to find errors and kibana would say elasticsearch find the messages which contain the string error and then elasticsearch would return results that had been populated by logstash. Logstash would have been sent those results from all of the other services.
您可以在Kibana的搜索栏中说“嘿，Kibana，我想查找错误（errors）”，Kibana会告诉Elasticsearch去查找包含字符串“error”的消息，然后Elasticsearch将返回由Logstash填充的结果。Logstash会从所有其他服务接收到这些结果。

### how would we use elk to diagnose a production problem

A user says I saw error code one two three four five six seven when I tried to do this with elk setup we'd have to go to kibana enter one two three four five six seven in the search bar press enter and then that would show us the logs that corresponded to that and one of the logs might say internal server error returning one two three four five six seven and we'd see that the service that emitted that log was the backend and we'd see what time that log was emitted at so we could go to the time in that log and we could look at the messages above and below it in the backend and then we could see a better picture of what happened for the user's request and we'd be able to repeat this process going to other services until we found what caused the problem for the user.
一个用户说：“我尝试执行此操作时看到了错误代码 1234567”。如果设置了ELK，我们只需转到Kibana，在搜索栏中输入 1234567，然后按回车键。这将显示与该错误代码对应的日志，其中一条日志可能会显示“内部服务器错误，返回 1234567”。我们会看到发出该日志的服务是后端，并且会看到该日志的发出时间。因此，我们可以根据该日志的时间，查看后端中它上下方的消息，从而更好地了解用户的请求发生了什么，并且我们可以重复此过程，查看其他服务，直到找到导致用户问题的根源。

### Security and Access to Logs

An important piece of the puzzle is ensuring that logs are only visible to administrators (or the users and groups that need to have access), logs can contain sensitive information like tokens only authenticated users should have access to them, you wouldn't want to expose Kibana to the internet without some way of authenticating.
拼图中的一个重要部分是确保日志仅对管理员（或需要访问权限的用户和组）可见。日志可能包含敏感信息，例如令牌，因此只有经过身份验证的用户才能访问它们。您绝不希望在没有某种身份验证机制的情况下将Kibana暴露给互联网。

### Examples of Log Management Tools

Examples of log management platforms there's
日志管理平台的例子包括：

- Elasticsearch
- Logstash
- Kibana
- Fluentd - popular open source choice
- Fluentd - 流行的开源选择
- Datadog - hosted offering, commonly used at larger enterprises,
- Datadog - 托管服务，常用于大型企业
- LogDNA - hosted offering
- LogDNA - 托管服务
- Splunk

Cloud providers also provide logging such as AWS CloudWatch Logs, Microsoft Azure Monitor and Google Cloud Logging.
云提供商也提供日志记录服务，例如 AWS CloudWatch Logs、Microsoft Azure Monitor 和 Google Cloud Logging。

Log Management is a key aspect of the overall observability of your applications and infrastructure environment for diagnosing problems in production it's relatively simple to install a turnkey solution like ELK or CloudWatch and it makes diagnosing and triaging problems in production significantly easier.
日志管理是应用程序和基础设施环境整体可观测性的关键方面，用于诊断生产中的问题。安装像 ELK 或 CloudWatch 这样的交钥匙解决方案相对简单，并且能显著简化生产中问题的诊断和分类。

## Resources

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

See you on [Day 80](day80.md)
