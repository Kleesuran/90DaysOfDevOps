---
title: '#90DaysOfDevOps - Data Visualisation - Grafana - Day 83'
published: false
description: 90DaysOfDevOps - Data Visualisation - Grafana
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048767
---

## Data Visualisation - Grafana

We saw a lot of Kibana over this section around Observability. But we have to also take some time to cover Grafana. But also they are not the same and they are not completely competing against each other.
在可观察性（Observability）这一章节中，我们已经大量接触了 Kibana。但我们也需要花一些时间来介绍 Grafana。然而，它们并不完全相同，也不是完全相互竞争的关系。

Kibana’s core feature is data querying and analysis. Using various methods, users can search the data indexed in Elasticsearch for specific events or strings within their data for root cause analysis and diagnostics. Based on these queries, users can use Kibana’s visualisation features which allow users to visualize data in a variety of different ways, using charts, tables, geographical maps and other types of visualizations.
Kibana 的核心功能是数据查询和分析。用户可以使用各种方法在 Elasticsearch 中索引的数据里搜索特定的事件或字符串，以便进行根本原因分析和诊断。基于这些查询，用户可以使用 Kibana 的可视化功能，该功能允许用户通过图表、表格、地理地图和其他类型的方式，以各种不同的方式来可视化数据。

Grafana started as a fork of Kibana, Grafana had an aim to supply support for metrics aka monitoring, which at that time Kibana did not provide.
Grafana 最初是 Kibana 的一个分支（fork），它的目标是为指标（metrics，即监控）提供支持，而这是当时的 Kibana 所不具备的。

Grafana is a free and Open-Source data visualisation tool. We commonly see Prometheus and Grafana together out in the field but we might also see Grafana alongside Elasticsearch and Graphite.
Grafana 是一款免费的开源数据可视化工具。我们在实际应用中通常会看到 Prometheus 和 Grafana 搭配使用，但有时也会看到 Grafana 与 Elasticsearch 和 Graphite 搭配使用。

The key difference between the two tools is Logging vs Monitoring, we started the section off covering monitoring with Nagios and then into Prometheus before moving into Logging where we covered the ELK and EFK stacks.
这两种工具之间的主要区别在于日志记录（Logging）与监控（Monitoring）。我们在本节开始时介绍了使用 Nagios 进行监控，随后是 Prometheus，然后才进入日志记录部分，其中涵盖了 ELK 和 EFK 技术栈。

Grafana caters to analysing and visualising metrics such as system CPU, memory, disk and I/O utilisation. The platform does not allow full-text data querying. Kibana runs on top of Elasticsearch and is used primarily for analyzing log messages.
Grafana 专注于分析和可视化指标，例如系统 CPU、内存、磁盘和 I/O 利用率。该平台不允许进行全文数据查询。Kibana 运行在 Elasticsearch 之上，主要用于分析日志消息。

As we have already discovered with Kibana it is quite easy to deploy as well as having the choice of where to deploy, this is the same for Grafana.
正如我们对 Kibana 所了解到的那样，它部署起来非常简单，并且可以选择部署位置，这对于 Grafana 来说也是如此。

Both support installation on Linux, Mac, Windows, Docker or building from source.
它们都支持在 Linux, Mac, Windows, Docker 上安装或通过源代码构建。

There are no doubt others but Grafana is a tool that I have seen spanning the virtual, cloud and cloud-native platforms so I wanted to cover this here in this section.
毫无疑问还有其他工具，但我见过 Grafana 跨越了虚拟化、云平台和云原生平台，因此我想在本节中介绍它。

### Prometheus Operator + Grafana Deployment

We have covered Prometheus already in this section but as we see these paired so often I wanted to spin up an environment that would allow us to at least see what metrics we could have displayed in a visualisation. We know that monitoring our environments is important but going through those metrics alone in Prometheus or any metric tool is going to be cumbersome and it is not going to scale. This is where Grafana comes in and provides us with that interactive visualisation of those metrics collected and stored in the Prometheus database.
我们在本节中已经介绍了 Prometheus，但鉴于我们经常看到它们成对出现，我想搭建一个环境，让我们至少可以看到哪些指标可以通过可视化方式显示出来。我们知道监控环境非常重要，但仅仅通过 Prometheus 或任何指标工具单独查看这些指标将会非常麻烦，并且无法扩展。这就是 Grafana 发挥作用的地方，它为我们提供了交互式的可视化功能，用于展示在 Prometheus 数据库中收集和存储的指标。

With that visualisation, we can create custom charts, graphs and alerts for our environment. In this walkthrough, we will be using our minikube cluster.
借助这种可视化功能，我们可以为我们的环境创建自定义的图表、图形和警报。在本演练中，我们将使用我们的 minikube 集群。

We are going to start by cloning this down to our local system. Using `git clone https://github.com/prometheus-operator/kube-prometheus.git` and `cd kube-prometheus`
我们将首先把代码克隆到我们的本地系统。使用 `git clone https://github.com/prometheus-operator/kube-prometheus.git` 和 `cd kube-prometheus` 命令。

![](Images/Day83_Monitoring1.png)

The first job is to create our namespace within our minikube cluster `kubectl create -f manifests/setup` if you have not been following along in previous sections we can use `minikube start` to bring up a new cluster here.
第一项任务是在我们的 minikube 集群中创建命名空间，使用命令 `kubectl create -f manifests/setup`。如果您没有跟随前面的章节操作，可以使用 `minikube start` 在这里启动一个新的集群。

![](Images/Day83_Monitoring2.png)

Next, we are going to deploy everything we need for our demo using the `kubectl create -f manifests/` command, as you can see this is going to deploy a lot of different resources within our cluster.
接下来，我们将使用 `kubectl create -f manifests/` 命令部署演示所需的一切。如您所见，这将在我们的集群中部署许多不同的资源。

![](Images/Day83_Monitoring3.png)

We then need to wait for our pods to come up and being in the running state we can use the `kubectl get pods -n monitoring -w` command to keep an eye on the pods.
然后我们需要等待我们的 Pod 启动并处于运行状态。我们可以使用 `kubectl get pods -n monitoring -w` 命令来持续关注 Pod 的状态。

![](Images/Day83_Monitoring4.png)

When everything is running we can check all pods are in a running and healthy state using the `kubectl get pods -n monitoring` command.
当所有组件都在运行时，我们可以使用 `kubectl get pods -n monitoring` 命令检查所有 Pod 是否处于运行和健康状态。

![](Images/Day83_Monitoring5.png)

With the deployment, we deployed several services that we are going to be using later on in the demo you can check these by using the `kubectl get svc -n monitoring` command.
通过这次部署，我们部署了几个服务（service），我们将在演示的后续部分中使用它们。您可以使用 `kubectl get svc -n monitoring` 命令来检查这些服务。

![](Images/Day83_Monitoring6.png)

And finally, let's check on all resources deployed in our new monitoring namespace using the `kubectl get all -n monitoring` command.
最后，让我们使用 `kubectl get all -n monitoring` 命令检查部署在我们新的监控命名空间中的所有资源。

![](Images/Day83_Monitoring7.png)

Opening a new terminal we are now ready to access our Grafana tool and start gathering and visualising some of our metrics, the command to use is`kubectl --namespace monitoring port-forward svc/grafana 3000`
打开一个新的终端，我们现在就可以访问我们的 Grafana 工具，并开始收集和可视化一些指标。要使用的命令是 `kubectl --namespace monitoring port-forward svc/grafana 3000`。

![](Images/Day83_Monitoring8.png)

Open a browser and navigate to http://localhost:3000 you will be prompted for a username and password.
打开浏览器并导航到 http://localhost:3000，系统会提示您输入用户名和密码。

![](Images/Day83_Monitoring9.png)
The default username and password to access is
默认的访问用户名和密码是

```
Username: admin
Password: admin
```

However, you will be asked to provide a new password at first login. The initial screen or home page you will see will give you some areas to explore as well as some useful resources to get up to speed with Grafana and its capabilities. Notice the "Add your first data source" and "create your first dashboard" widgets we will be using later.
但是，您将在首次登录时被要求提供一个新密码。您看到的初始屏幕或主页将提供一些可供探索的区域以及一些有用的资源，帮助您快速了解 Grafana 及其功能。请注意我们稍后将使用的“添加您的第一个数据源”（"Add your first data source"）和“创建您的第一个仪表板”（"create your first dashboard"）小部件。

![](Images/Day83_Monitoring10.png)

You will find that there is already a prometheus data source already added to our Grafana data sources, however, because we are using minikube we need to also port forward prometheus so that this is available on our localhost, opening a new terminal we can run the following command. `kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090` if on the home page of Grafana we now enter into the widget "Add your first data source" and from here we are going to select Prometheus.
您会发现我们的 Grafana 数据源中已经添加了一个 Prometheus 数据源，但是，因为我们使用的是 minikube，我们还需要对 Prometheus 进行端口转发，以便在我们的 localhost 上可用。打开一个新的终端，我们可以运行以下命令：`kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090`。如果在 Grafana 的主页上，我们现在进入“添加您的第一个数据源”（"Add your first data source"）小部件，并从中选择 Prometheus。

![](Images/Day83_Monitoring11.png)

For our new data source, we can use the address http://localhost:9090 and we will also need to change the dropdown to the browser as highlighted below.
对于我们的新数据源，我们可以使用地址 http://localhost:9090，并且我们还需要将下拉菜单更改为浏览器（browser），如下面突出显示的那样。

![](Images/Day83_Monitoring12.png)

At the bottom of the page, we can now hit save and test. This should give us the outcome you see below if the port forward for Prometheus is working.
现在，在页面底部，我们可以点击保存并测试（save and test）。如果 Prometheus 的端口转发正常工作，您应该会看到如下所示的结果。

![](Images/Day83_Monitoring13.png)

Head back to the home page and find the option to "Create your first dashboard" select "Add a new panel"
返回主页，找到“创建您的第一个仪表板”（"Create your first dashboard"）选项，然后选择“添加新面板”（"Add a new panel"）。

![](Images/Day83_Monitoring14.png)

You will see from below that we are already gathering from our Grafana data source, but we would like to gather metrics from our Prometheus data source, select the data source drop down and select our newly created "Prometheus-1"
您会从下图中看到我们已经从 Grafana 数据源收集数据，但我们希望从 Prometheus 数据源收集指标。请选择数据源下拉列表，并选择我们新创建的 "Prometheus-1"。

![](Images/Day83_Monitoring15.png)

If you then select the Metrics browser you will have a long list of metrics being gathered from Prometheus related to our minikube cluster.
如果您随后选择 Metrics 浏览器，您将看到从 Prometheus 收集到的、与我们的 minikube 集群相关的一长串指标。

![](Images/Day83_Monitoring16.png)

For the demo I am going to find a metric that gives us some output around our system resources, `cluster:node_cpu:ratio{}` gives us some detail on the nodes in our cluster and proves that this integration is working.
在本次演示中，我将找到一个能够显示我们系统资源输出的指标。`cluster:node_cpu:ratio{}` 提供了我们集群中节点的一些详细信息，并证明了这种集成正在正常工作。

![](Images/Day83_Monitoring17.png)

Once you are happy with this as your visualisation then you can hit the apply button in the top right and you will then add this graph to your dashboard. You can go ahead and add additional graphs and other charts to give you the visuals that you need.
一旦您对这个可视化结果感到满意，您可以点击右上角的应用（apply）按钮，然后将此图表添加到您的仪表板中。您可以继续添加额外的图表和其他图形，以获得您需要的视觉效果。

![](Images/Day83_Monitoring18.png)

We can however take advantage of thousands of previously created dashboards that we can use so that we do not need to reinvent the wheel.
然而，我们可以利用数千个先前创建好的仪表板，这样我们就不必重复造轮子。

![](Images/Day83_Monitoring19.png)

If we search Kubernetes we will see a long list of pre-built dashboards that we can choose from.
如果我们搜索 Kubernetes，我们将看到一个很长的预构建仪表板列表供我们选择。

![](Images/Day83_Monitoring20.png)

We have chosen the Kubernetes API Server dashboard and changed the data source to suit our newly added Prometheus-1 data source and we get to see some of the metrics displayed below.
我们选择了 Kubernetes API Server 仪表板，并更改了数据源以适应我们新添加的 Prometheus-1 数据源，我们可以看到下面显示的一些指标。

![](Images/Day83_Monitoring21.png)

### Alerting

You could also leverage the alertmanager that we deployed to then send alerts out to slack or other integrations, to do this you would need to port forward the alertmanager service using the below details.
您还可以利用我们部署的 alertmanager，将警报发送到 Slack 或其他集成平台。为此，您需要使用以下详细信息对 alertmanager 服务进行端口转发。

`kubectl --namespace monitoring port-forward svc/alertmanager-main 9093`
`http://localhost:9093`

That wraps up our section on all things observability, I have personally found that this section has highlighted how broad this topic is but equally how important this is for our roles and that be it metrics, logging or tracing you are going to need to have a good idea of what is happening in our broad environments moving forward, especially when they can change so dramatically with all the automation that we have already covered in the other sections.
这就总结了我们关于可观察性（observability）的所有内容。我个人发现，本节突出了该主题的广泛性，同时也强调了它对我们角色的重要性。无论是指标、日志记录还是跟踪，您都需要对我们广阔环境中所发生的事情有清晰的了解，特别是考虑到我们已在其他章节中涵盖的自动化技术可能导致环境发生巨大变化。

Next up we are going to be taking a look into data management and how DevOps principles also need to be considered when it comes to Data Management.
接下来我们将探讨数据管理，以及在数据管理方面也需要考虑 DevOps 原则。

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

See you on [Day 84](day84.md)
我们第 84 天再见。