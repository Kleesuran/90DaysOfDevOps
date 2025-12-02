```markdown
---
title: '#90DaysOfDevOps - Docker Containers, Provisioners & Modules - Day 60'
published: false
description: '90DaysOfDevOps - Docker Containers, Provisioners & Modules'
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049052
---

## Docker Containers, Provisioners & Modules

On [Day 59](day59.md) we provisioned a virtual machine using Terraform to our local FREE VirtualBox environment. In this section, we are going to deploy a Docker container with some configuration to our local Docker environment.
在[第 59 天](day59.md)，我们使用 Terraform 在本地免费的 VirtualBox 环境中预置了一台虚拟机。在本节中，我们将向本地 Docker 环境部署一个包含特定配置的 Docker 容器。

### Docker Demo

First up we are going to use the code block below, the outcome of the below is that we would like a simple web app to be deployed into docker and to publish this so that it is available to our network. We will be using nginx and we will make this available externally on our laptop over localhost and port 8000. We are using a docker provider from the community and you can see the docker image we are using also stated in our configuration.
首先，我们将使用下面的代码块。我们的目标是将一个简单的 Web 应用程序部署到 Docker 中，并发布它，使其对我们的网络可用。我们将使用 nginx，并通过 localhost 和端口 8000 在我们的笔记本电脑上对外提供服务。我们使用的是来自社区的 Docker Provider，您可以在配置中看到我们使用的 Docker 镜像。

```
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "2.16.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "nginx" {
  name         = "nginx:latest"
  keep_locally = false
}

resource "docker_container" "nginx" {
  image = docker_image.nginx.latest
  name  = "tutorial"
  ports {
    internal = 80
    external = 8000
  }
}
```

The first task is to use `terraform init` command to download the provider to our local machine.
第一个任务是使用 `terraform init` 命令将 Provider 下载到我们的本地机器。

![](Images/Day60_IAC1.png)

We then run our `terraform apply` followed by `docker ps` and you can see we have a running container.
接着我们运行 `terraform apply`，随后运行 `docker ps`，您可以看到我们有了一个正在运行的容器。

![](Images/Day60_IAC2.png)

If we then open a browser we can navigate to `http://localhost:8000/` and you will see we have access to our NGINX container.
如果我们打开浏览器，导航到 `http://localhost:8000/`，您将看到我们可以访问我们的 NGINX 容器。

![](Images/Day60_IAC3.png)

You can find out more information on the [Docker Provider](https://registry.terraform.io/providers/kreuzwerker/docker/latest/docs/resources/container)
您可以在[Docker Provider](https://registry.terraform.io/providers/kreuzwerker/docker/latest/docs/resources/container)上找到更多信息。

The above is a very simple demo of what can be done with Terraform plus Docker and how we can now manage this under the Terraform state. We covered docker-compose in the containers section and there is a little crossover in a way between this, infrastructure as code as well as then Kubernetes.
上述演示了一个使用 Terraform 结合 Docker 可以实现的非常简单的功能，以及我们如何通过 Terraform 状态来管理它。我们在容器章节中讨论了 `docker-compose`，这与基础设施即代码（IaC）以及随后的 Kubernetes 之间存在一些交叉点。

To show this and how Terraform can handle a little more complexity, we are going to take the docker-compose file for WordPress and MySQL that we created with docker-compose and we will put this to Terraform. You can find the [docker-wordpress.tf](2022/Days/IaC/Docker-WordPress/docker-WordPress.tf)
为了展示这一点以及 Terraform 如何处理稍微复杂一些的情况，我们将使用之前通过 `docker-compose` 创建的 WordPress 和 MySQL 的 docker-compose 文件，并将其转化为 Terraform 配置。您可以在 [docker-wordpress.tf](2022/Days/IaC/Docker-WordPress/docker-WordPress.tf) 中找到该文件。

```
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "2.16.0"
    }
  }
}

provider "docker" {}

variable wordpress_port {
  default = "8080"
}

resource "docker_volume" "db_data" {
  name = "db_data"
}

resource "docker_network" "wordpress_net" {
  name = "wordpress_net"
}

resource "docker_container" "db" {
  name  = "db"
  image = "mysql:5.7"
  restart = "always"
  network_mode = "wordpress_net"
  env = [
     "MYSQL_ROOT_PASSWORD=wordpress",
     "MYSQL_PASSWORD=wordpress",
     "MYSQL_USER=wordpress",
     "MYSQL_DATABASE=wordpress"
  ]
  mounts {
    type = "volume"
    target = "/var/lib/mysql"
    source = "db_data"
    }
}

resource "docker_container" "wordpress" {
  name  = "wordpress"
  image = "wordpress:latest"
  restart = "always"
  network_mode = "wordpress_net"
  env = [
    "WORDPRESS_DB_HOST=db:3306",
    "WORDPRESS_DB_USER=wordpress",
    "WORDPRESS_DB_NAME=wordpress",
    "WORDPRESS_DB_PASSWORD=wordpress"
  ]
  ports {
    internal = "80"
    external = "${var.wordpress_port}"
  }
}
```

We again put this in a new folder and then run our `terraform init` command to pull down our provisioners required.
我们再次将这段配置放在一个新文件夹中，然后运行 `terraform init` 命令来下载所需的 Provider。

![](Images/Day60_IAC4.png)

We then run our `terraform apply` command and then take a look at our docker ps output we should see our newly created containers.
接着我们运行 `terraform apply` 命令，然后查看 `docker ps` 的输出，应该可以看到我们新创建的容器。

![](Images/Day60_IAC5.png)

We can then also navigate to our WordPress front end. Much like when we went through this process with docker-compose in the containers section we can now run through the setup and our WordPress posts would be living in our MySQL database.
然后我们就可以访问我们的 WordPress 前端页面了。就像我们在容器章节中使用 `docker-compose` 完成这个过程一样，我们现在可以运行设置流程，我们的 WordPress 文章将存储在 MySQL 数据库中。

![](Images/Day60_IAC6.png)

Now we have covered containers and Kubernetes in some detail, we probably know that this is ok for testing but if you were going to be running a website you would not do this with containers alone and you would look at using Kubernetes to achieve this, Next up we are going to take a look using Terraform with Kubernetes.
既然我们已经详细介绍了容器和 Kubernetes，我们可能知道这种方法只适用于测试，但如果你想运行一个网站，你不会只使用容器，你会考虑使用 Kubernetes 来实现。接下来，我们将探讨如何将 Terraform 与 Kubernetes 结合使用。

### Provisioners

Provisioners are there so that if something cannot be declarative we have a way in which to parse this to our deployment.
Provisioners（配置器）存在的意义是，如果某些东西无法通过声明方式实现，我们可以通过它们将配置解析到我们的部署中。

If you have no other alternative and adding this complexity to your code is the place to go then you can do this by running something similar to the following block of code.
如果你没有其他选择，并且必须将这种复杂性添加到你的代码中，那么你可以运行类似于以下代码块的内容：

```
resource "docker_container" "db" {
  # ...

  provisioner "local-exec" {
    command = "echo The server's IP address is ${self.private_ip}"
  }
}
```

The remote-exec provisioner invokes a script on a remote resource after it is created. This could be used for something OS-specific or it could be used to wrap in a configuration management tool. Although notice that we have some of these covered in their provisioners.
`remote-exec` 配置器在远程资源创建后调用该资源上的脚本。这可以用于执行操作系统特定的操作，或者用于包装配置管理工具。不过请注意，其中一些功能已经被它们自己的 Provisioner 覆盖了。

[More details on provisioners](https://www.terraform.io/language/resources/provisioners/syntax)
[有关 Provisioner 的更多详细信息](https://www.terraform.io/language/resources/provisioners/syntax)

- file
- local-exec
- remote-exec
- vendor
  - ansible
  - chef
  - puppet

### Modules

Modules are containers for multiple resources that are used together. A module consists of a collection of .tf files in the same directory.
模块（Modules）是用于共同使用的多个资源的容器。一个模块由同一目录中的一组 `.tf` 文件组成。

Modules are a good way to separate your infrastructure resources as well as be able to pull in third-party modules that have already been created so you do not have to reinvent the wheel.
模块是分离基础设施资源的好方法，同时您还可以引入已创建的第三方模块，从而避免重复造轮子。

For example, if we wanted to use the same project to build out some VMs, VPCs, Security Groups and then also a Kubernetes cluster we would likely want to split our resources out into modules to better define our resources and where they are grouped.
例如，如果我们要使用同一个项目来构建虚拟机（VM）、VPC、安全组（Security Groups），以及 Kubernetes 集群，我们很可能希望将资源拆分为模块，以便更好地定义资源及其分组位置。

Another benefit to modules is that you can take these modules and use them on other projects or share them publicly to help the community.
模块的另一个好处是，您可以将这些模块用于其他项目，或公开发布以帮助社区。

We are breaking down our infrastructure into components, components are known here as modules.
我们正在将基础设施分解为组件，这里的组件即称为模块。

## Resources

I have listed a lot of resources down below and I think this topic has been covered so many times out there, If you have additional resources be sure to raise a PR with your resources and I will be happy to review and add them to the list.
我在下面列出了许多资源，我认为这个主题已经被广泛涵盖。如果您有额外的资源，请务必提交 PR，我很乐意审核并将其添加到列表中。

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

See you on [Day 61](day61.md)
[第 61 天](day61.md)见
```