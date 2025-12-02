---
title: '#90DaysOfDevOps - Hands-On Monitoring Tools - Day 78'
published: false
description: 90DaysOfDevOps - Hands-On Monitoring Tools
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049056
---

## Hands-On Monitoring Tools

In the last session, I spoke about the big picture of monitoring and I took a look into Nagios, there were two reasons for doing this.
在上一节中，我谈到了监控的全局视图，并研究了 Nagios，这样做有两个原因。
The first was this is a piece of software I have heard a lot of over the years so wanted to know a little more about its capabilities.
第一个原因是这是一款多年来我听说了很多的软件，所以我想更多地了解它的功能。

Today I am going to be going into Prometheus, I have seen more and more of Prometheus in the Cloud-Native landscape but it can also be used to look after those physical resources as well outside of Kubernetes and the like.
今天我将深入研究 Prometheus，我在云原生领域中越来越多地看到 Prometheus，但它也可以用于管理 Kubernetes 等之外的物理资源。

### Prometheus - Monitors nearly everything

First of all, Prometheus is Open-Source that can help you monitor containers and microservice-based systems as well as physical, virtual and other services.
首先，Prometheus 是开源的，可以帮助您监控容器和基于微服务的系统，以及物理、虚拟和其他服务。
There is a large community behind Prometheus.
Prometheus 背后有一个庞大的社区。

Prometheus has a large array of [integrations and exporters](https://prometheus.io/docs/instrumenting/exporters/) The key is to export existing metrics as Prometheus metrics.
Prometheus 拥有大量的[集成和导出器](https://prometheus.io/docs/instrumenting/exporters/)，关键在于将现有指标导出为 Prometheus 指标。
On top of this, it also supports multiple programming languages.
除此之外，它还支持多种编程语言。

Pull approach - If you are talking to thousands of microservices or systems and services a push method is going to be where you generally see the service pushing to the monitoring system.
拉取方式 (Pull approach) - 如果您正在与数千个微服务或系统和服务通信，推送方法通常是您看到服务推送到监控系统的方式。
This brings some challenges around flooding the network, high CPU and also a single point of failure.
这带来了一些挑战，例如网络泛洪、高 CPU 以及单点故障。
Where Pull gives us a much better experience where Prometheus will pull from the metrics endpoint on every service.
而拉取方式 (Pull) 则提供了更好的体验，Prometheus 将从每个服务的指标端点拉取数据。

Once again we see YAML for configuration for Prometheus.
我们再次看到用于 Prometheus 配置的 YAML。

![](Images/Day78_Monitoring7.png)

Later on, you are going to see how this looks when deployed into Kubernetes, in particular, we have the **PushGateway** which pulls our metrics from our jobs/exporters.
稍后您将看到它部署到 Kubernetes 中时的样子，特别是我们有 **PushGateway**，它从我们的作业/导出器中拉取指标。

We have the **AlertManager** which pushes alerts and this is where we can integrate into external services such as email, slack and other tooling.
我们有 **AlertManager** 用于推送警报，在这里我们可以集成到外部服务，例如电子邮件、Slack 和其他工具。

Then we have the Prometheus server which manages the retrieval of those pull metrics from the PushGateway and then sends those push alerts to the AlertManager.
然后我们有 Prometheus 服务器，它管理从 PushGateway 检索这些拉取指标，然后将这些推送警报发送给 AlertManager。
The Prometheus server also stores data on a local disk. Although can leverage remote storage solutions.
Prometheus 服务器也将数据存储在本地磁盘上。但它可以利用远程存储解决方案。

We then also have PromQL which is the language used to interact with the metrics, this can be seen later on with the Prometheus Web UI but you will also see later on in this section how this is also used within Data visualisation tools such as Grafana.
我们还有 PromQL，它是用于与指标交互的语言，稍后可以在 Prometheus Web UI 中看到，但您也会在本节后面看到它是如何在 Grafana 等数据可视化工具中使用的。

### Ways to Deploy Prometheus

Various ways of installing Prometheus, [Download Section](https://prometheus.io/download/) Docker images are also available.
安装 Prometheus 的方法有很多，可以访问[下载部分](https://prometheus.io/download/)，Docker 镜像也可用。

`docker run --name prometheus -d -p 127.0.0.1:9090:9090 prom/prometheus`

But we are going to focus our efforts on deploying to Kubernetes. Which also has some options.
但我们将把精力集中在部署到 Kubernetes 上。这也有一些选项。

- Create configuration YAML files
- 创建配置 YAML 文件
- Using an Operator (manager of all Prometheus components)
- 使用 Operator（所有 Prometheus 组件的管理器）
- Using helm chart to deploy operator
- 使用 helm chart 部署 Operator

### Deploying to Kubernetes

We will be using our minikube cluster locally again for this quick and simple installation. As with previous touch points with minikube, we will be using helm to deploy the Prometheus helm chart.
我们将再次在本地使用我们的 minikube 集群进行快速简单的安装。与之前接触 minikube 一样，我们将使用 helm 来部署 Prometheus helm chart。

`helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`

![](Images/Day78_Monitoring1.png)

As you can see from the above we have also run a helm repo update, we are now ready to deploy Prometheus into our minikube environment using the `helm install stable prometheus-community/prometheus` command.
正如您从上图中所看到的，我们还运行了 helm repo update，现在我们准备使用 `helm install stable prometheus-community/prometheus` 命令将 Prometheus 部署到我们的 minikube 环境中。

![](Images/Day78_Monitoring2.png)

After a couple of minutes, you will see several new pods appear, for this demo, I have deployed into the default namespace, I would normally push this to its namespace.
几分钟后，您会看到几个新的 Pod 出现，在这个演示中，我部署到了默认命名空间，但我通常会将它推送到其自己的命名空间。

![](Images/Day78_Monitoring3.png)

Once all the pods are running we can also take a look at all the deployed aspects of Prometheus.
一旦所有 Pod 都在运行，我们还可以查看 Prometheus 的所有已部署方面。

![](Images/Day78_Monitoring4.png)

Now for us to access the Prometheus Server UI we can use the following command to port forward.
现在，为了访问 Prometheus 服务器 UI，我们可以使用以下命令进行端口转发。

```Shell
export POD_NAME=$(kubectl get pods --namespace default -l "app=prometheus,component=server" -o jsonpath="{.items[0].metadata.name}")
  kubectl --namespace default port-forward $POD_NAME 9090
```

When we first open our browser to `http://localhost:9090` we see the following very blank screen.
当我们第一次在浏览器中打开 `http://localhost:9090` 时，我们看到以下非常空白的屏幕。

![](Images/Day78_Monitoring5.png)

Because we have deployed to our Kubernetes cluster we will automatically be picking up metrics from our Kubernetes API so we can use some PromQL to at least make sure we are capturing metrics `container_cpu_usage_seconds_total`
因为我们已经部署到 Kubernetes 集群，我们将自动从 Kubernetes API 接收指标，所以我们可以使用一些 PromQL 至少确保我们正在捕获指标 `container_cpu_usage_seconds_total`。

![](Images/Day78_Monitoring6.png)

Short on learning PromQL and putting that into practice this is very much like I mentioned previously in that gaining metrics is great, and so is monitoring but you have to know what you are monitoring and why and what you are not monitoring and why!
除了学习 PromQL 并将其付诸实践之外，这与我之前提到的非常相似：获取指标很棒，监控也是如此，但您必须知道您正在监控什么、为什么监控，以及您没有监控什么、为什么没有监控！

I want to come back to Prometheus but for now, I think we need to think about Log Management and Data Visualisation to bring us back to Prometheus later on.
我想稍后回到 Prometheus，但现在，我认为我们需要考虑日志管理和数据可视化，以便稍后将我们带回到 Prometheus。

## Resources

- [The Importance of Monitoring in DevOps](https://www.devopsonline.co.uk/the-importance-of-monitoring-in-devops/)
- [DevOps 中监控的重要性](https://www.devopsonline.co.uk/the-importance-of-monitoring-in-devops/)
- [Understanding Continuous Monitoring in DevOps?](https://medium.com/devopscurry/understanding-continuous-monitoring-in-devops-f6695b004e3b)
- [了解 DevOps 中的持续监控？](https://medium.com/devopscurry/understanding-continuous-monitoring-in-devops-f6695b004e3b)
- [DevOps Monitoring Tools](https://www.youtube.com/watch?v=Zu53QQuYqJ0)
- [DevOps 监控工具](https://www.youtube.com/watch?v=Zu53QQuYqJ0)
- [Top 5 - DevOps Monitoring Tools](https://www.youtube.com/watch?v=4t71iv_9t_4)
- [Top 5 - DevOps 监控工具](https://www.youtube.com/watch?v=4t71iv_9t_4)
- [How Prometheus Monitoring works](https://www.youtube.com/watch?v=h4Sl21AKiDg)
- [Prometheus 监控如何工作](https://www.youtube.com/watch?v=h4Sl21AKiDg)
- [Introduction to Prometheus monitoring](https://www.youtube.com/watch?v=5o37CGlNLr8)
- [Prometheus 监控简介](https://www.youtube.com/watch?v=5o37CGlNLr8)
- [Promql cheat sheet with examples](https://www.containiq.com/post/promql-cheat-sheet-with-examples)
- [带示例的 Promql 速查表](https://www.containiq.com/post/promql-cheat-sheet-with-examples)

See you on [Day 79](day79.md)
我们下期[第 79 天](day79.md)见
