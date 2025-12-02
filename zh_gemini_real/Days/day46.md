---
title: '#90DaysOfDevOps - Docker Compose - Day 46'
published: false
description: 90DaysOfDevOps - Docker Compose
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048740
---

## Docker Compose

The ability to run one container could be great if you have a self-contained image that has everything you need for your single use case, where things get interesting is when you are looking to build multiple applications between different container images. For example, if I had a website front end but required a backend database I could put everything in one container but better and more efficient would be to have its container for the database.
如果你有一个自包含的镜像，其中包含单个用例所需的一切，那么运行单个容器是非常棒的；而当你想要在不同的容器镜像之间构建多个应用程序时，事情就会变得有趣起来。例如，如果我有一个网站前端，但需要一个后端数据库，我可以将所有内容放在一个容器中，但更好、更高效的做法是为数据库设置它自己的容器。

This is where Docker compose comes in which is a tool that allows you to run more complex apps over multiple containers. With the benefit of being able to use a single file and command to spin up your application. The example I am going to the walkthrough in this post is from the [Docker QuickStart sample apps (Quickstart: Compose and WordPress)](https://docs.docker.com/samples/wordpress/).
这就是 Docker Compose 的作用所在，它是一个允许你在多个容器上运行更复杂应用的工具。它的好处在于可以使用单个文件和命令来启动你的应用程序。本文将要演练的示例来自 [Docker QuickStart 示例应用程序 (快速入门：Compose 和 WordPress)](https://docs.docker.com/samples/wordpress/)。

In this first example we are going to:
在第一个示例中，我们将执行以下操作：

- Use Docker compose to bring up WordPress and a separate MySQL instance.
- Use a YAML file which will be called `docker-compose.yml`
- Build the project
- Configure WordPress via a Browser
- Shutdown and Clean up

### Install Docker Compose

As mentioned Docker Compose is a tool, If you are on macOS or Windows then compose is included in your Docker Desktop installation. However, you might be wanting to run your containers on a Windows server host or Linux server and in which case you can install using these instructions [Install Docker Compose](https://docs.docker.com/compose/install/)
如前所述，Docker Compose 是一个工具，如果你使用 macOS 或 Windows，Compose 已包含在你的 Docker Desktop 安装中。但是，你可能希望在 Windows 服务器主机或 Linux 服务器上运行容器，在这种情况下，你可以使用这些说明进行安装：[安装 Docker Compose](https://docs.docker.com/compose/install/)

To confirm we have `docker-compose` installed on our system we can open a terminal and simply type the above command.
为了确认我们的系统上安装了 `docker-compose`，我们可以打开一个终端并简单地输入上面的命令。

![](Images/Day46_Containers1.png)

### Docker-Compose.yml (YAML)

The next thing to talk about is the docker-compose.yml which you can find in the container folder of the repository. But more importantly, we need to discuss YAML, in general, a little.
接下来要讨论的是 `docker-compose.yml` 文件，你可以在仓库的容器文件夹中找到它。但更重要的是，我们需要大致讨论一下 YAML。

YAML could almost have its session as you are going to find it in so many different places. But for the most part
YAML 几乎可以单独开一个章节来讲解，因为它出现在太多不同的地方。但就其大部分用途而言：

"YAML is a human-friendly data serialization language for all programming languages."

It is commonly used for configuration files and in some applications where data is being stored or transmitted. You have no doubt come across XML files that tend to offer that same configuration file. YAML provides a minimal syntax but is aimed at those same use cases.
它通常用于配置文件，以及在某些应用程序中存储或传输数据。你无疑遇到过 XML 文件，它们通常提供相同类型的配置文件功能。YAML 提供了极简的语法，但目标是相同的用例。

YAML Ain't Markup Language (YAML) is a serialisation language that has steadily increased in popularity over the last few years. The object serialisation abilities make it a viable replacement for languages like JSON.
YAML Ain't Markup Language (YAML) 是一种序列化语言，在过去几年中受欢迎程度稳步增长。其对象序列化能力使其成为 JSON 等语言的可行替代品。

The YAML acronym was shorthand for Yet Another Markup Language. But the maintainers renamed it to YAML Ain't Markup Language to place more emphasis on its data-oriented features.
YAML 这个缩写最初是 Yet Another Markup Language 的简称。但维护者将其重命名为 YAML Ain't Markup Language，以更加强调其面向数据（data-oriented）的特性。

Anyway, back to the docker-compose.yml file. This is a configuration file of what we want to do when it comes to multiple containers being deployed on our single system.
无论如何，回到 `docker-compose.yml` 文件。当涉及到在我们的单个系统上部署多个容器时，这是一个关于我们想要做什么的配置文件。

Straight from the tutorial linked above you can see the contents of the file looks like this:
从上面链接的教程中，你可以直接看到该文件的内容如下所示：

```
version: "3.9"

services:
  DB:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    volumes:
      - wordpress_data:/var/www/html
    ports:
      - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
volumes:
  db_data: {}
  wordpress_data: {}
```

We declare a version and then a large part of this docker-compose.yml file is made up of our services, we have a DB service and a WordPress service. You can see each of those has an image defined with a version tag associated. We are now also introducing state into our configuration unlike our first walkthroughs, but now we are going to create volumes so we can store our databases there.
我们声明了一个版本，然后 `docker-compose.yml` 文件的主要部分由我们的服务组成，我们有一个 DB 服务和一个 WordPress 服务。你可以看到，每个服务都定义了一个带有版本标签的镜像。与我们第一次演练不同，我们现在也在配置中引入了状态管理，我们将创建卷（volumes）以便我们可以在其中存储数据库。

We then have some environmental variables such as passwords and usernames. These files can get very complicated but the YAML configuration file simplifies what these look like overall.
然后我们有一些环境变量，例如密码和用户名。这些文件可能会变得非常复杂，但 YAML 配置文件总体上简化了它们的外观。

### Build the project

Next up we can head back into our terminal and we can use some commands with our docker-compose tool. Navigate to your directory, where your docker-compose.yml file is located.
接下来，我们可以回到终端，使用 `docker-compose` 工具运行一些命令。导航到你的 `docker-compose.yml` 文件所在的目录。

From the terminal, we can simply run `docker-compose up -d` this will start the process of pulling those images and standing up your multi-container application.
在终端中，我们只需运行 `docker-compose up -d`，这将开始拉取这些镜像并启动你的多容器应用程序。

The `-d` in this command means detached mode, which means that the Run command is or will be in the background.
此命令中的 `-d` 表示分离模式（detached mode），这意味着运行命令将在后台执行。

![](Images/Day46_Containers2.png)

If we now run the `docker ps` command, you can see we have 2 containers running, one being WordPress and the other being MySQL.
如果我们现在运行 `docker ps` 命令，你会看到我们有两个容器正在运行，一个是 WordPress，另一个是 MySQL。

![](Images/Day46_Containers3.png)

Next, we can validate that we have WordPress up and running by opening a browser and going to `http://localhost:8000` and you should see the WordPress set-up page.
接下来，我们可以通过打开浏览器并访问 `http://localhost:8000` 来验证 WordPress 是否已启动并运行，你应该会看到 WordPress 设置页面。

![](Images/Day46_Containers4.png)

We can run through the setup of WordPress, and then we can start building our website as we see fit in the console below.
我们可以完成 WordPress 的设置过程，然后我们就可以在下面的控制台中根据需要开始构建我们的网站。

![](Images/Day46_Containers5.png)

If we then open a new tab and navigate to that same address we did before `http://localhost:8000` we will now see a simple default theme with our site title "90DaysOfDevOps" and then a sample post.
如果我们打开一个新标签页并导航到与之前相同的地址 `http://localhost:8000`，我们现在会看到一个带有我们的站点标题 "90DaysOfDevOps" 的简单默认主题，然后是一个示例帖子。

![](Images/Day46_Containers6.png)

Before we make any changes, open Docker Desktop and navigate to the volumes tab and here you will see two volumes associated with our containers, one for WordPress and one for DB.
在进行任何更改之前，打开 Docker Desktop 并导航到“卷”（volumes）选项卡，在这里你将看到与我们的容器关联的两个卷，一个用于 WordPress，一个用于 DB。

![](Images/Day46_Containers7.png)

My Current wordpress theme is "Twenty Twenty-Two" and I want to change this to "Twenty Twenty" Back in the dashboard we can make those changes.
我当前的 WordPress 主题是 "Twenty Twenty-Two"，我想将其更改为 "Twenty Twenty"。回到仪表板，我们可以进行这些更改。

![](Images/Day46_Containers8.png)

I am also going to add a new post to my site, and here below you see the latest version of our new site.
我还将在我的站点上添加一篇新帖子，下面你看到的是我们新站点的最新版本。

![](Images/Day46_Containers9.png)

### Clean Up or not

If we were now to use the command `docker-compose down` this would bring down our containers. But will leave our volumes in place.
如果我们现在使用命令 `docker-compose down`，这将关闭我们的容器。但会保留我们的卷（volumes）。

![](Images/Day46_Containers10.png)

We can just confirm in Docker Desktop that our volumes are still there though.
不过，我们可以在 Docker Desktop 中确认我们的卷仍然存在。

![](Images/Day46_Containers11.png)

If we then want to bring things back up then we can issue the `docker up -d` command from within the same directory and we have our application back up and running.
如果我们想再次启动这些容器，我们可以在同一目录中执行 `docker up -d` 命令，我们的应用程序将重新启动并运行。

![](Images/Day46_Containers12.png)

We then navigate in our browser to that same address of `http://localhost:8000` and notice that our new post and our theme change are all still in place.
然后我们在浏览器中导航到相同的地址 `http://localhost:8000`，并注意到我们的新帖子和主题更改都保留了下来。

![](Images/Day46_Containers13.png)

If we want to get rid of the containers and those volumes then issuing the `docker-compose down --volumes` will also destroy the volumes.
如果我们想要清除容器和这些卷，那么执行 `docker-compose down --volumes` 也会销毁这些卷。

![](Images/Day46_Containers14.png)

Now when we use `docker-compose up -d` again we will be starting, however, the images will still be local on our system so you won't need to re-pull them from the DockerHub repository.
现在当我们再次使用 `docker-compose up -d` 时，我们将重新开始启动，但是镜像仍将保存在我们的本地系统上，因此无需从 DockerHub 仓库重新拉取它们。

I know that when I started diving into docker-compose and its capabilities I was then confused as to where this sits alongside or with Container Orchestration tools such as Kubernetes, well everything we have done here in this short demo is focused on one host we have WordPress and DB running on the local desktop machine. We don't have multiple virtual machines or multiple physical machines, we also can't easily scale up and down the requirements of our application.
我知道，当我开始深入研究 `docker-compose` 及其功能时，我曾困惑于它与 Kubernetes 等容器编排工具相比处于什么位置，但我们在这个简短演示中所做的一切都集中在一个主机上：我们在本地桌面机器上运行 WordPress 和 DB。我们没有多个虚拟机或多个物理机，我们也无法轻松地扩展（scale up and down）应用程序的需求。

Our next section is going to cover Kubernetes but we have a few more days of Containers in general first.
我们的下一部分将涵盖 Kubernetes，但我们首先还有几天的容器基础知识要学习。

This is also a great resource for samples of docker-compose applications with multiple integrations. [Awesome-Compose](https://github.com/docker/awesome-compose)
这也是一个很好的资源，其中包含多个集成的 `docker-compose` 应用程序示例。[Awesome-Compose](https://github.com/docker/awesome-compose)

In the above repository, there is a great example which will deploy an Elasticsearch, Logstash, and Kibana (ELK) in single-node.
在上面的仓库中，有一个很好的示例，它将部署单节点的 Elasticsearch, Logstash, and Kibana (ELK)。

I have uploaded the files to the [Containers folder](2022/Days/Containers/elasticsearch-logstash-kibana/) When you have this folder locally, navigate there and you can simply use `docker-compose up -d`
我已将文件上传到 [Containers 文件夹](2022/Days/Containers/elasticsearch-logstash-kibana/)。当你拥有此本地文件夹后，导航到该处，你可以直接使用 `docker-compose up -d`。

![](Images/Day46_Containers15.png)

We can then check we have those running containers with `docker ps`
然后我们可以使用 `docker ps` 检查这些正在运行的容器。

![](Images/Day46_Containers16.png)

Now we can open a browser for each of the containers:
现在我们可以为每个容器打开一个浏览器：

![](Images/Day46_Containers17.png)

To remove everything we can use the `docker-compose down` command.
要删除所有内容，我们可以使用 `docker-compose down` 命令。

## Resources

- [TechWorld with Nana - Docker Tutorial for Beginners](https://www.youtube.com/watch?v=3c-iBn73dDE)
- [Programming with Mosh - Docker Tutorial for Beginners](https://www.youtube.com/watch?v=pTFZFxd4hOI)
- [Docker Tutorial for Beginners - What is Docker? Introduction to Containers](https://www.youtube.com/watch?v=17Bl31rlnRM&list=WL&index=128&t=61s)
- [WSL 2 with Docker getting started](https://www.youtube.com/watch?v=5RQbdMn04Oc)
- [Blog on getting started building a docker image](https://stackify.com/docker-build-a-beginners-guide-to-building-docker-images/)
- [Docker documentation for building an image](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [YAML Tutorial: Everything You Need to Get Started in Minute](https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started)

See you on [Day 47](day47.md)
[第 47 天](day47.md)见
