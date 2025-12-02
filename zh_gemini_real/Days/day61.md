---
title: '#90DaysOfDevOps - Kubernetes & Multiple Environments - Day 61'
published: false
description: 90DaysOfDevOps - Kubernetes & Multiple Environments
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048743
---

## Kubernetes & Multiple Environments

So far during this section on Infrastructure as code, we have looked at deploying virtual machines albeit to VirtualBox but the premise is the same really as we define in code what we want our virtual machine to look like and then we deploy. The same for Docker containers and in this session, we are going to take a look at how Terraform can be used to interact with resources supported by Kubernetes.
到目前为止，在基础设施即代码这一部分中，我们已经研究了如何部署虚拟机，尽管是部署到 VirtualBox，但其前提是相同的，即我们在代码中定义我们希望虚拟机是什么样子，然后进行部署。对于 Docker 容器也是如此，在本节中，我们将探讨如何使用 Terraform 与 Kubernetes 支持的资源进行交互。

I have been using Terraform to deploy my Kubernetes clusters for demo purposes across the 3 main cloud providers and you can find the repository [tf_k8deploy](https://github.com/MichaelCade/tf_k8deploy)
我一直在使用 Terraform 在三大主要云提供商上部署我的 Kubernetes 集群用于演示目的，您可以在此仓库中找到相关内容：[tf_k8deploy](https://github.com/MichaelCade/tf_k8deploy)

However you can also use Terraform to interact with objects within the Kubernetes cluster, this could be using the [Kubernetes provider](https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs) or it could be using the [Helm provider](https://registry.terraform.io/providers/hashicorp/helm/latest) to manage your chart deployments.
然而，您也可以使用 Terraform 与 Kubernetes 集群中的对象进行交互，这可以通过使用 [Kubernetes provider](https://registry.terraform.com/providers/hashicorp/kubernetes/latest/docs) 来实现，或者使用 [Helm provider](https://registry.terraform.io/providers/hashicorp/helm/latest) 来管理您的 chart 部署。

Now we could use `kubectl` as we have shown in previous sections. But there are some benefits to using Terraform in your Kubernetes environment.
现在我们可以使用 `kubectl`，正如我们在前面章节中展示的那样。但在您的 Kubernetes 环境中使用 Terraform 也有一些好处。

- Unified workflow - if you have used Terraform to deploy your clusters, you could use the same workflow and tool to deploy within your Kubernetes clusters
- 统一的工作流 (Unified workflow) - 如果您使用 Terraform 部署了集群，您可以使用相同的工作流和工具在 Kubernetes 集群内部署。

- Lifecycle management - Terraform is not just a provisioning tool, it's going to enable change, updates and deletions.
- 生命周期管理 (Lifecycle management) - Terraform 不仅仅是一个配置工具，它还能实现变更、更新和删除。

### Simple Kubernetes Demo

Much like the demo we created in the last session, we can now deploy nginx into our Kubernetes cluster, I will be using minikube here again for demo purposes. We create our Kubernetes.tf file and you can find this in the [folder](2022/Days/IaC/Kubernetes/Kubernetes.tf)
就像我们在上一节中创建的演示一样，我们现在可以将 nginx 部署到我们的 Kubernetes 集群中，出于演示目的，我将再次使用 minikube。我们创建 `Kubernetes.tf` 文件，您可以在此 [文件夹](2022/Days/IaC/Kubernetes/Kubernetes.tf) 中找到它。

In that file we are going to define our Kubernetes provider, we are going to point to our kubeconfig file, create a namespace called nginx, and then we will create a deployment which contains 2 replicas and finally service.
在该文件中，我们将定义我们的 Kubernetes provider，指定我们的 kubeconfig 文件，创建一个名为 `nginx` 的命名空间，然后我们将创建一个包含 2 个副本的部署，最后是一个服务。

```
terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.0"
    }
  }
}
provider "kubernetes" {
  config_path = "~/.kube/config"
}
resource "kubernetes_namespace" "test" {
  metadata {
    name = "nginx"
  }
}
resource "kubernetes_deployment" "test" {
  metadata {
    name      = "nginx"
    namespace = kubernetes_namespace.test.metadata.0.name
  }
  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "MyTestApp"
      }
    }
    template {
      metadata {
        labels = {
          app = "MyTestApp"
        }
      }
      spec {
        container {
          image = "nginx"
          name  = "nginx-container"
          port {
            container_port = 80
          }
        }
      }
    }
  }
}
resource "kubernetes_service" "test" {
  metadata {
    name      = "nginx"
    namespace = kubernetes_namespace.test.metadata.0.name
  }
  spec {
    selector = {
      app = kubernetes_deployment.test.spec.0.template.0.metadata.0.labels.app
    }
    type = "NodePort"
    port {
      node_port   = 30201
      port        = 80
      target_port = 80
    }
  }
}
```

The first thing we have to do in our new project folder is run the `terraform init` command.
在我们的新项目文件夹中，我们要做的第一件事是运行 `terraform init` 命令。

![](Images/Day61_IAC1.png)

And then before we run the `terraform apply` command, let me show you that we have no namespaces.
然后，在我们运行 `terraform apply` 命令之前，让我向您展示我们没有任何命名空间。

![](Images/Day61_IAC2.png)

When we run our apply command this is going to create those 3 new resources, namespace, deployment and service within our Kubernetes cluster.
当我们运行 apply 命令时，它将在我们的 Kubernetes 集群中创建这 3 个新资源：命名空间 (namespace)、部署 (deployment) 和服务 (service)。

![](Images/Day61_IAC3.png)

We can now take a look at the deployed resources within our cluster.
现在我们可以查看集群中已部署的资源。

![](Images/Day61_IAC4.png)

Now because we are using minikube as you will have seen in the previous section this has its limitations when we try and play with the docker networking for ingress. But if we simply issue the `kubectl port-forward -n nginx svc/nginx 30201:80` command and open a browser to `http://localhost:30201/` we should see our NGINX page.
正如您在上一节中看到的，由于我们使用的是 minikube，当我们尝试使用 Docker 网络进行入口 (ingress) 时，它有一些限制。但是如果我们简单地执行 `kubectl port-forward -n nginx svc/nginx 30201:80` 命令并打开浏览器访问 `http://localhost:30201/`，我们应该会看到我们的 NGINX 页面。

![](Images/Day61_IAC5.png)

If you want to try out more detailed demos with Terraform and Kubernetes then the [HashiCorp Learn site](https://learn.hashicorp.com/tutorials/terraform/kubernetes-provider) is fantastic to run through.
如果您想尝试更多关于 Terraform 和 Kubernetes 的详细演示，[HashiCorp 学习网站](https://learn.hashicorp.com/tutorials/terraform/kubernetes-provider) 是一个非常棒的学习资源。

### Multiple Environments

If we wanted to take any of the demos we have run through but wanted to now have specific production, staging and development environments looking the same and leveraging this code there are two approaches to achieve this with Terraform
如果我们想使用我们运行过的任何演示，但现在希望拥有看起来相同并利用这段代码的特定生产 (production)、预演 (staging) 和开发 (development) 环境，使用 Terraform 有两种方法可以实现这一点：

- `terraform workspaces` - multiple named sections within a single backend
- `terraform workspaces` - 单个后端中的多个命名部分。

- file structure - Directory layout provides separation, modules provide reuse.
- 文件结构 (file structure) - 目录布局提供分离，模块提供重用。

Each of the above does have its pros and cons though.
不过，上述每种方法都有其优缺点。

### terraform workspaces

Pros
优点 (Pros)

- Easy to get started
- 易于上手。

- Convenient terraform.workspace expression
- 方便的 `terraform.workspace` 表达式。

- Minimises code duplication
- 最大限度地减少代码重复。

Cons
缺点 (Cons)

- Prone to human error (we were trying to eliminate this by using TF)
- 容易出现人为错误（我们使用 TF 正是为了消除人为错误）。

- State stored within the same backend
- 状态存储在同一个后端中。

- Codebase doesn't unambiguously show deployment configurations.
- 代码库不能明确地显示部署配置。

### File Structure

Pros
优点 (Pros)

- Isolation of backends
- 后端隔离

  - improved security
  - 提高安全性

  - decreased potential for human error
  - 减少潜在的人为错误

- Codebase fully represents deployed state
- 代码库完全代表已部署的状态。

Cons
缺点 (Cons)

- Multiple terraform apply required to provision environments
- 预置环境需要多次运行 `terraform apply`。

- More code duplication, but can be minimised with modules.
- 更多代码重复，但可以通过模块最小化。

## Resources

I have listed a lot of resources down below and I think this topic has been covered so many times out there, If you have additional resources be sure to raise a PR with your resources and I will be happy to review and add them to the list.
我在下面列出了许多资源，我认为这个话题已经被广泛涵盖。如果您有额外的资源，请务必提交 PR (Pull Request) 给我，我将很乐意审核并将它们添加到列表中。

- [What is Infrastructure as Code? Difference of Infrastructure as Code Tools](https://www.youtube.com/watch?v=POPP2WTJ8es)
- [Terraform Tutorial | Terraform Course Overview 2021](https://www.youtube.com/watch?v=m3cKkYXl-8o)
- [Terraform explained in 15 mins | Terraform Tutorial for Beginners](https://www.youtube.com/watch?v=l5k1ai_GBDE)
- [Terraform Course - From BEGINNER to PRO!](https://www.youtube.com/watch?v=7xngnjfIlK4&list=WL&index=141&t=16s)
- [HashiCorp Terraform Associate Certification Course](https://www.youtube.com/watch?v=V4waklkBC38&list=WL&index=55&t=111s)
- [Terraform Full Course for Beginners](https://www.youtube.com/watch?v=EJ3N-hhiWv0&list=WL&index=39&t=27s)
- [KodeKloud - Terraform for DevOps Beginners + Labs: Complete Step by Step Guide!](https://www.youtube.com/watch?v=YcJ9IeukJL8&list=WL&index=16&t=11s)
- [Terraform Simple Projects](https://terraform.joshuajebaraj.com/)
- [Terraform Tutorial - The Best Project Ideas](https://www.youtube.com/watch?v=oA-pPa0vfks)
- [Awesome Terraform](https://github.com/shuaibiyy/awesome-terraform)

See you on [Day 62](day62.md)
62 日再见 ([Day 62](day62.md))