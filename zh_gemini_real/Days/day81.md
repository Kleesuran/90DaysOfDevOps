---
title: '#90DaysOfDevOps - Fluentd & FluentBit - Day 81'
published: false
description: 90DaysOfDevOps - Fluentd & FluentBit
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048716
---

## Fluentd & FluentBit

Another data collector that I wanted to explore as part of this observability section was [Fluentd](https://docs.fluentd.org/). An Open-Source unified logging layer.
我想作为可观察性部分探索的另一个数据收集器是 [Fluentd](https://docs.fluentd.org/)。它是一个开源的统一日志层。

Fluentd has four key features that make it suitable to build clean, reliable logging pipelines:
Fluentd 具有四个关键特性，使其适合构建干净、可靠的日志记录管道：

Unified Logging with JSON: Fluentd tries to structure data as JSON as much as possible. This allows Fluentd to unify all facets of processing log data: collecting, filtering, buffering, and outputting logs across multiple sources and destinations. The downstream data processing is much easier with JSON since it has enough structure to be accessible without forcing rigid schemas.
使用 JSON 的统一日志记录：Fluentd 尝试尽可能将数据结构化为 JSON。这使得 Fluentd 能够统一处理日志数据的所有方面：收集、过滤、缓冲以及在多个源和目标之间输出日志。使用 JSON，下游数据处理变得更加容易，因为它具有足够的结构来访问，而无需强制执行严格的模式。

Pluggable Architecture: Fluentd has a flexible plugin system that allows the community to extend its functionality. Over 300 community-contributed plugins connect dozens of data sources to dozens of data outputs, manipulating the data as needed. By using plugins, you can make better use of your logs right away.
可插拔架构：Fluentd 具有灵活的插件系统，允许社区扩展其功能。超过 300 个社区贡献的插件将数十个数据源连接到数十个数据输出，并根据需要对数据进行操作。通过使用插件，您可以立即更好地利用日志。

Minimum Resources Required: A data collector should be lightweight so that it runs comfortably on a busy machine. Fluentd is written in a combination of C and Ruby and requires minimal system resources. The vanilla instance runs on 30-40MB of memory and can process 13,000 events/second/core.
所需资源最少：数据收集器应该轻量级，以便它可以在繁忙的机器上舒适地运行。Fluentd 采用 C 和 Ruby 混合编写，只需要最少的系统资源。标准实例运行占用 30-40MB 内存，每秒/每核可处理 13,000 个事件。

Built-in Reliability: Data loss should never happen. Fluentd supports memory- and file-based buffering to prevent inter-node data loss. Fluentd also supports robust failover and can be set up for high availability.
内置可靠性：数据丢失绝不应该发生。Fluentd 支持基于内存和文件的缓冲，以防止节点间数据丢失。Fluentd 还支持强大的故障转移，并且可以设置为高可用性。

[Installing Fluentd](https://docs.fluentd.org/quickstart#step-1-installing-fluentd)
[安装 Fluentd](https://docs.fluentd.org/quickstart#step-1-installing-fluentd)

### How do apps log data?

- Write to files. `.log` files (difficult to analyse without a tool and at scale)
- 写入文件。`.log` 文件（没有工具且大规模时难以分析）
- Log directly to a database (each application must be configured with the correct format)
- 直接记录到数据库（每个应用程序必须配置正确的格式）
- Third-party applications (NodeJS, NGINX, PostgreSQL)
- 第三方应用程序 (NodeJS, NGINX, PostgreSQL)

This is why we want a unified logging layer.
这就是我们想要一个统一日志层的原因。

FluentD allows for the 3 logging data types shown above and gives us the ability to collect, process and send those to a destination, this could be sending them logs to Elastic, MongoDB, or Kafka databases for example.
FluentD 支持上述 3 种日志数据类型，并使我们能够收集、处理并将它们发送到目标，例如，这可能是将日志发送到 Elastic、MongoDB 或 Kafka 数据库。

Any Data, Any Data source can be sent to FluentD and that can be sent to any destination. FluentD is not tied to any particular source or destination.
任何数据、任何数据源都可以发送到 FluentD，并且可以发送到任何目标。FluentD 不受限于任何特定的源或目标。

In my research of Fluentd, I kept stumbling across Fluent bit as another option and it looks like if you were looking to deploy a logging tool into your Kubernetes environment then fluent bit would give you that capability, even though fluentd can also be deployed to containers as well as servers.
在我对 Fluentd 的研究中，我不断发现 Fluent Bit 是另一种选择，看起来如果您希望将日志工具部署到您的 Kubernetes 环境中，那么 Fluent Bit 将为您提供该功能，尽管 Fluentd 也可以部署到容器和服务器。

[Fluentd & Fluent Bit](https://docs.fluentbit.io/manual/about/fluentd-and-fluent-bit)
[Fluentd 与 Fluent Bit](https://docs.fluentbit.io/manual/about/fluentd-and-fluent-bit)

Fluentd and Fluentbit will use the input plugins to transform that data to Fluent Bit format, then we have output plugins to whatever that output target is such as elasticsearch.
Fluentd 和 Fluent Bit 将使用输入插件将数据转换为 Fluent Bit 格式，然后我们使用输出插件将其发送到任何输出目标，例如 Elasticsearch。

We can also use tags and matches between configurations.
我们还可以在配置之间使用标签（tags）和匹配项（matches）。

I cannot see a good reason for using fluentd and it seems that Fluent Bit is the best way to get started. Although they can be used together in some architectures.
我看不出使用 Fluentd 的充分理由，而且看起来 Fluent Bit 是开始使用的最佳方式。尽管它们可以在某些架构中一起使用。

### Fluent Bit in Kubernetes

Fluent Bit in Kubernetes is deployed as a DaemonSet, which means it will run on each node in the cluster. Each Fluent Bit pod on each node will then read each container on that node and gather all of the logs available. It will also gather the metadata from the Kubernetes API Server.
Fluent Bit 在 Kubernetes 中是作为 DaemonSet 部署的，这意味着它将在集群中的每个节点上运行。每个节点上的 Fluent Bit Pod 随后将读取该节点上的每个容器并收集所有可用的日志。它还将从 Kubernetes API 服务器收集元数据。

Kubernetes annotations can be used within the configuration YAML of our applications.
Kubernetes 注释（annotations）可用于我们应用程序的配置 YAML 中。

First of all, we can deploy from the fluent helm repository. `helm repo add fluent https://fluent.github.io/helm-charts` and then install using the `helm install fluent-bit fluent/fluent-bit` command.
首先，我们可以从 Fluent Helm 存储库进行部署。运行 `helm repo add fluent https://fluent.github.io/helm-charts`，然后使用 `helm install fluent-bit fluent/fluent-bit` 命令进行安装。

![](Images/Day81_Monitoring1.png)
![](Images/Day81_Monitoring1.png)

In my cluster, I am also running Prometheus in my default namespace (for test purposes) we need to make sure our fluent-bit pod is up and running. we can do this using `kubectl get all | grep fluent` this is going to show us our running pod, service and daemonset that we mentioned earlier.
在我的集群中，我还在默认命名空间中运行 Prometheus（用于测试目的），我们需要确保我们的 fluent-bit pod 正在运行。我们可以使用 `kubectl get all | grep fluent` 来完成此操作，这将显示我们前面提到的正在运行的 Pod、Service 和 DaemonSet。

![](Images/Day81_Monitoring2.png)
![](Images/Day81_Monitoring2.png)

So that fluentbit knows where to get logs from we have a configuration file, in this Kubernetes deployment of fluentbit, we have a configmap which resembles the configuration file.
为了让 Fluent Bit 知道从哪里获取日志，我们有一个配置文件；在这个 Fluent Bit 的 Kubernetes 部署中，我们有一个类似于配置文件的 ConfigMap。

![](Images/Day81_Monitoring3.png)
![](Images/Day81_Monitoring3.png)

That ConfigMap will look something like:
该 ConfigMap 看起来像这样：

```
Name:         fluent-bit
Namespace:    default
Labels:       app.kubernetes.io/instance=fluent-bit
              app.kubernetes.io/managed-by=Helm
              app.kubernetes.io/name=fluent-bit
              app.kubernetes.io/version=1.8.14
              helm.sh/chart=fluent-bit-0.19.21
Annotations:  meta.helm.sh/release-name: fluent-bit
              meta.helm.sh/release-namespace: default

Data
====
custom_parsers.conf:
----
[PARSER]
    Name docker_no_time
    Format json
    Time_Keep Off
    Time_Key time
    Time_Format %Y-%m-%dT%H:%M:%S.%L

fluent-bit.conf:
----
[SERVICE]
    Daemon Off
    Flush 1
    Log_Level info
    Parsers_File parsers.conf
    Parsers_File custom_parsers.conf
    HTTP_Server On
    HTTP_Listen 0.0.0.0
    HTTP_Port 2020
    Health_Check On

[INPUT]
    Name tail
    Path /var/log/containers/*.log
    multiline.parser docker, cri
    Tag kube.*
    Mem_Buf_Limit 5MB
    Skip_Long_Lines On

[INPUT]
    Name systemd
    Tag host.*
    Systemd_Filter _SYSTEMD_UNIT=kubelet.service
    Read_From_Tail On

[FILTER]
    Name Kubernetes
    Match kube.*
    Merge_Log On
    Keep_Log Off
    K8S-Logging.Parser On
    K8S-Logging.Exclude On

[OUTPUT]
    Name es
    Match kube.*
    Host elasticsearch-master
    Logstash_Format On
    Retry_Limit False

[OUTPUT]
    Name es
    Match host.*
    Host elasticsearch-master
    Logstash_Format On
    Logstash_Prefix node
    Retry_Limit False

Events:  <none>
```

We can now port-forward our pod to our localhost to ensure that we have connectivity. Firstly get the name of your pod with `kubectl get pods | grep fluent` and then use `kubectl port-forward fluent-bit-8kvl4 2020:2020` to open a web browser to `http://localhost:2020/`
我们现在可以将 Pod 端口转发到本地主机，以确保我们具有连接性。首先使用 `kubectl get pods | grep fluent` 获取 Pod 的名称，然后使用 `kubectl port-forward fluent-bit-8kvl4 2020:2020` 在 Web 浏览器中打开 `http://localhost:2020/`。

![](Images/Day81_Monitoring4.png)
![](Images/Day81_Monitoring4.png)

I also found this great medium article covering more about [Fluent Bit](https://medium.com/kubernetes-tutorials/exporting-kubernetes-logs-to-elasticsearch-using-fluent-bit-758e8de606af)
我还发现了这篇很棒的 Medium 文章，介绍了更多关于 [Fluent Bit](https://medium.com/kubernetes-tutorials/exporting-kubernetes-logs-to-elasticsearch-using-fluent-bit-758e8de606af) 的内容。

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
- [Fluent Bit explained | Fluent Bit vs Fluentd](https://www.youtube.com/watch?v=B2IS-XS-cc0)

See you on [Day 82](day82.md)
第 82 天见 [Day 82](day82.md)