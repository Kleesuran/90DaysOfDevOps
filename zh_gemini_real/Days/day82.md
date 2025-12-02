---
title: '#90DaysOfDevOps - EFK Stack - Day 82'
published: false
description: 90DaysOfDevOps - EFK Stack
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049059
---

### EFK Stack

In the previous section, we spoke about ELK Stack, which uses Logstash as the log collector in the stack, in the EFK Stack we are swapping that out for FluentD or FluentBit.
在前一节中，我们讨论了 ELK Stack，它使用 Logstash 作为日志收集器；而在 EFK Stack 中，我们将其替换为 FluentD 或 FluentBit。

Our mission in this section is to monitor our Kubernetes logs using EFK.
我们在本节中的任务是使用 EFK 来监控我们的 Kubernetes 日志。

### Overview of EFK

We will be deploying the following into our Kubernetes cluster.
我们将在 Kubernetes 集群中部署以下内容。

![](Images/Day82_Monitoring1.png)

The EFK stack is a collection of 3 software bundled together, including:
EFK 堆栈是捆绑在一起的 3 个软件的集合，包括：

- Elasticsearch: NoSQL database is used to store data and provides an interface for searching and query logs.
- Elasticsearch：NoSQL 数据库，用于存储数据并提供搜索和查询日志的接口。

- Fluentd: Fluentd is an open source data collector for a unified logging layer. Fluentd allows you to unify data collection and consumption for better use and understanding of data.
- Fluentd：Fluentd 是一个用于统一日志层的开源数据收集器。Fluentd 允许您统一数据收集和消费，以便更好地利用和理解数据。

- Kibana: Interface for managing and statistics logs. Responsible for reading information from elasticsearch.
- Kibana：用于管理和统计日志的接口。负责从 Elasticsearch 中读取信息。

### Deploying EFK on Minikube

We will be using our trusty minikube cluster to deploy our EFK stack. Let's start a cluster using `minikube start` on our system. I am using a Windows OS with WSL2 enabled.
我们将使用我们可靠的 Minikube 集群来部署 EFK 堆栈。让我们在系统上使用 `minikube start` 启动一个集群。我使用的是启用 WSL2 的 Windows 操作系统。

![](Images/Day82_Monitoring2.png)

I have created [efk-stack.yaml](Days/Monitoring/../../Monitoring/EFK%20Stack/efk-stack.yaml) which contains everything we need to deploy the EFK stack into our cluster, using the `kubectl create -f efk-stack.yaml` command we can see everything being deployed.
我创建了 [efk-stack.yaml](Days/Monitoring/../../Monitoring/EFK%20Stack/efk-stack.yaml)，其中包含将 EFK 堆栈部署到集群所需的一切，使用 `kubectl create -f efk-stack.yaml` 命令我们可以看到所有内容正在部署。

![](Images/Day82_Monitoring3.png)

Depending on your system and if you have run this already and have images pulled you should now watch the pods into a ready state before we can move on, you can check the progress with the following command. `kubectl get pods -n kube-logging -w` This can take a few minutes.
根据您的系统以及您是否已经运行过此操作并拉取了镜像，您现在应该观察 Pod 进入就绪状态，然后才能继续，您可以使用以下命令检查进度。 `kubectl get pods -n kube-logging -w` 这可能需要几分钟。

![](Images/Day82_Monitoring4.png)

The above command lets us keep an eye on things but I like to clarify that things are all good by just running the following `kubectl get pods -n kube-logging` command to ensure all pods are now up and running.
上述命令让我们能够关注情况，但我喜欢通过运行以下 `kubectl get pods -n kube-logging` 命令来确认一切都正常，以确保所有 Pod 现在都已启动并运行。

![](Images/Day82_Monitoring5.png)

Once we have all our pods up and running and at this stage, we should see
一旦所有 Pod 都启动并运行，在此阶段，我们应该看到：

- 3 pods associated with ElasticSearch
- 3 个与 ElasticSearch 相关的 Pod
- 1 pod associated with Fluentd
- 1 个与 Fluentd 相关的 Pod
- 1 pod associated with Kibana
- 1 个与 Kibana 相关的 Pod

We can also use `kubectl get all -n kube-logging` to show all in our namespace, fluentd as explained previously is deployed as a daemonset, kibana as deployment and Elasticsearch as a statefulset.
我们还可以使用 `kubectl get all -n kube-logging` 来显示命名空间中的所有内容。如前所述，Fluentd 是作为 DaemonSet 部署的，Kibana 是作为 Deployment 部署的，而 Elasticsearch 是作为 StatefulSet 部署的。

![](Images/Day82_Monitoring6.png)

Now all of our pods are up and running we can now issue in a new terminal the port-forward command so that we can access our kibana dashboard. Note that your pod name will be different to the command we see here. `kubectl port-forward kibana-84cf7f59c-v2l8v 5601:5601 -n kube-logging`
现在，我们所有的 Pod 都已启动并运行，我们可以在新的终端中发出端口转发命令，以便我们可以访问 Kibana 仪表板。请注意，您的 Pod 名称将与我们在此处看到的命令不同。 `kubectl port-forward kibana-84cf7f59c-v2l8v 5601:5601 -n kube-logging`

![](Images/Day82_Monitoring7.png)

We can now open up a browser and navigate to this address, `http://localhost:5601` you will be greeted with either the screen you see below or you might indeed see a sample data screen or continue and configure yourself. Either way and by all means look at that test data, it is what we covered when we looked at the ELK stack in a previous session.
现在我们可以打开浏览器并导航到此地址 `http://localhost:5601`，您将看到如下所示的屏幕，或者您可能会看到示例数据屏幕，或者您可以继续自行配置。无论如何，请务必查看该测试数据，这是我们在上一节中查看 ELK 堆栈时介绍的内容。

![](Images/Day82_Monitoring8.png)

Next, we need to hit the "discover" tab on the left menu and add "\*" to our index pattern. Continue to the next step by hitting "Next step".
接下来，我们需要点击左侧菜单上的“discover”（发现）选项卡，并将“\*”添加到我们的索引模式中。点击“Next step”（下一步）继续。

![](Images/Day82_Monitoring9.png)

In Step 2 of 2, we are going to use the @timestamp option from the dropdown as this will filter our data by time. When you hit create pattern it might take a few seconds to complete.
在第 2 步（共 2 步）中，我们将使用下拉菜单中的 @timestamp 选项，因为这将按时间过滤我们的数据。当您点击创建模式时，可能需要几秒钟才能完成。

![](Images/Day82_Monitoring10.png)

If we now head back to our "discover" tab after a few seconds you should start to see data coming in from your Kubernetes cluster.
如果我们现在回到“discover”（发现）选项卡，几秒钟后您应该开始看到来自 Kubernetes 集群的数据。

![](Images/Day82_Monitoring11.png)

Now that we have the EFK stack up and running and we are gathering logs from our Kubernetes cluster via Fluentd we can also take a look at other sources we can choose from if you navigate to the home screen by hitting the Kibana logo on the top left you will be greeted with the same page we saw when we first logged in.
既然 EFK 堆栈已启动并运行，并且我们正在通过 Fluentd 从 Kubernetes 集群收集日志，我们还可以查看我们可以选择的其他来源。如果您点击左上角的 Kibana 徽标导航到主屏幕，您将看到与我们第一次登录时相同的页面。

We can add APM, Log data, metric data and security events from other plugins or sources.
我们可以从其他插件或来源添加 APM、日志数据、指标数据和安全事件。

![](Images/Day82_Monitoring12.png)

If we select "Add log data" then we can see below that we have a lot of choices on where we want to get our logs from, you can see that Logstash is mentioned there which is part of the ELK stack.
如果我们选择“Add log data”（添加日志数据），那么我们可以在下面看到有很多关于日志来源的选择，您可以看到其中提到了 Logstash，它是 ELK 堆栈的一部分。

![](Images/Day82_Monitoring13.png)

Under the metrics data, you will find that you can add sources for Prometheus and lots of other services.
在指标数据下，您会发现可以为 Prometheus 和许多其他服务添加来源。

### APM (Application Performance Monitoring)

There is also the option to gather APM (Application Performance Monitoring) which collects in-depth performance metrics and errors from inside your application. It allows you to monitor the performance of thousands of applications in real time.
还可以选择收集 APM（应用性能监控）数据，它收集应用程序内部的深入性能指标和错误。它允许您实时监控数千个应用程序的性能。

I am not going to get into APM here but you can find out more on the [Elastic site](https://www.elastic.co/observability/application-performance-monitoring)
我在这里不打算深入探讨 APM，但您可以在 [Elastic 网站](https://www.elastic.co/observability/application-performance-monitoring) 上找到更多信息。

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

See you on [Day 83](day83.md)
我们在 [Day 83](day83.md) 再见
