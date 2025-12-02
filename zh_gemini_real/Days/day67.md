---
title: '#90DaysOfDevOps - Using Roles & Deploying a Loadbalancer - Day 67'
published: false
description: '90DaysOfDevOps - Using Roles & Deploying a Loadbalancer'
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048713
---

## Using Roles & Deploying a Loadbalancer

In the last session, we covered roles and used the `ansible-galaxy` command to help create our folder structures for some roles that we are going to use.
在上一节中，我们介绍了角色（roles），并使用了 `ansible-galaxy` 命令来帮助我们创建将要使用的一些角色的文件夹结构。
We finished up with a much tidier working repository for our configuration code as everything is hidden away in our role folders.
我们的配置代码现在有了一个更整洁的工作存储库，因为所有内容都隐藏在我们的角色文件夹中。

However, we have only used the apache2 role and have a working playbook3.yaml to handle our webservers.
但是，我们只使用了 apache2 角色，并且有一个可用的 playbook3.yaml 来处理我们的 Web 服务器。

At this point if you have only used `vagrant up web01 web02` now is the time to run `vagrant up loadbalancer` this will bring up another Ubuntu system that we will use as our Load Balancer/Proxy.
此时，如果您只运行了 `vagrant up web01 web02`，那么现在是时候运行 `vagrant up loadbalancer` 了，这将启动另一个 Ubuntu 系统，我们将把它用作我们的负载均衡器/代理。

We have already defined this new machine in our host's file, but we do not have the ssh key configured until it is available, so we need to also run `ssh-copy-id loadbalancer` when the system is up and ready.
我们已经在主机文件中定义了这台新机器，但在它可用之前，我们尚未配置 ssh 密钥，因此在系统启动并准备就绪后，我们还需要运行 `ssh-copy-id loadbalancer`。

### Common role

I created at the end of yesterday's session the role of `common`, common will be used across all of our servers whereas the other roles are specific to use cases, now the applications I am going to install are as common as spurious and I cannot see many reasons for this to be the case but it shows the objective.
我在昨天的会议结束时创建了 `common` 角色，该角色将用于我们所有的服务器，而其他角色则特定于用例。现在，我将要安装的应用程序非常常见且无关紧要，我看不出很多这样做的理由，但这展示了我们的目标。
In our common role folder structure, navigate to the tasks folder and you will have a main.yml.
在我们的 common 角色文件夹结构中，导航到 tasks 文件夹，您会找到一个 main.yml 文件。
In this YAML, we need to point this to our install_tools.yml file and we do this by adding a line `- import_tasks: install_tools.yml` this used to be `include` but this is going to be depreciated soon enough so we are using import_tasks.
在这个 YAML 文件中，我们需要将其指向我们的 install_tools.yml 文件，我们通过添加一行 `- import_tasks: install_tools.yml` 来实现，这以前是 `include`，但它很快就会被弃用，所以我们使用 `import_tasks`。

```yaml
- name: "Install Common packages"
  apt: name={{ item }} state=latest
  with_items:
   - neofetch
   - tree
   - figlet
```

In our playbook, we then add in the common role for each host block.
在我们的 playbook 中，我们随后为每个主机块添加 common 角色。

```yaml
- hosts: webservers
  become: yes
  vars:
    http_port: 8000
    https_port: 4443
    html_welcome_msg: "Hello 90DaysOfDevOps - Welcome to Day 66!"
  roles:
    - common
    - apache2
```

### nginx

The next phase is for us to install and configure nginx on our loadbalancer VM.
下一阶段是我们在负载均衡器虚拟机上安装和配置 nginx。
Like the common folder structure, we have the nginx based on the last session.
与 common 文件夹结构类似，我们有基于上一节的 nginx 结构。

First of all, we are going to add a host block to our playbook.
首先，我们将在 playbook 中添加一个主机块。
This block will include our common role and then our new nginx role.
这个块将包括我们的 common 角色，然后是我们的新 nginx 角色。

The playbook can be found here. [playbook4.yml](Days/../Configmgmt/ansible-scenario4/playbook4.yml)
playbook 可以在此处找到：[playbook4.yml](Days/../Configmgmt/ansible-scenario4/playbook4.yml)

```yaml
- hosts: webservers
  become: yes
  vars:
    http_port: 8000
    https_port: 4443
    html_welcome_msg: "Hello 90DaysOfDevOps - Welcome to Day 66!"
  roles:
    - common
    - apache2

- hosts: proxy
  become: yes
  roles:
    - common
    - nginx
```

For this to mean anything, we have to define the tasks that we wish to run, in the same way, we will modify the main.yml in tasks to point to two files this time, one for installation and one for configuration.
为了使这些有意义，我们必须定义我们希望运行的任务。同样，我们将修改 tasks 目录中的 main.yml，使其这次指向两个文件：一个用于安装，一个用于配置。

There are some other files that I have modified based on the outcome we desire, take a look in the folder [ansible-scenario4](Days/Configmgmt/ansible-scenario4) for all the files changed.
根据我们想要的结果，我还修改了其他一些文件，请查看 [ansible-scenario4](Days/Configmgmt/ansible-scenario4) 文件夹以了解所有更改的文件。
You should check the folders tasks, handlers and templates in the nginx folder and you will find those additional changes and files.
您应该检查 nginx 文件夹中的 tasks、handlers 和 templates 文件夹，您会找到那些额外的更改和文件。

### Run the updated playbook

Since yesterday we have added the common role which will now install some packages on our system and then we have also added our nginx role which includes installation and configuration.
从昨天开始，我们添加了 common 角色，它现在将在我们的系统上安装一些软件包，然后我们还添加了 nginx 角色，其中包括安装和配置。

Let's run our playbook4.yml using the `ansible-playbook playbook4.yml`
让我们使用 `ansible-playbook playbook4.yml` 命令运行我们的 playbook4.yml。

![](Images/Day67_config1.png)

Now that we have our webservers and loadbalancer configured we should now be able to go to http://192.168.169.134/ which is the IP address of our loadbalancer.
现在我们已经配置了 Web 服务器和负载均衡器，我们应该能够访问 http://192.168.169.134/，这是我们负载均衡器的 IP 地址。

![](Images/Day67_config2.png)

If you are following along and you do not have this state then it could be down to the server IP addresses you have in your environment.
如果您正在跟进并且没有达到这种状态，那可能是由于您环境中的服务器 IP 地址不同所致。
The file can be found in `templates\mysite.j2` and looks similar to the below: You would need to update with your web server IP addresses.
该文件位于 `templates\mysite.j2` 中，看起来类似于以下内容：您需要使用您的 Web 服务器 IP 地址进行更新。

```J2
    upstream webservers {
        server 192.168.169.131:8000;
        server 192.168.169.132:8000;
    }

    server {
        listen 80;

        location / {
                proxy_pass http://webservers;
        }
    }
```

I am pretty confident that what we have installed is all good but let's use an ad-hoc command using ansible to check these common tools installation.
我对我们安装的一切感到非常有信心，但让我们使用 ansible 的即席（ad-hoc）命令来检查这些通用工具的安装情况。

`ansible loadbalancer -m command -a neofetch`

![](Images/Day67_config3.png)

## Resources

- [What is Ansible](https://www.youtube.com/watch?v=1id6ERvfozo)
- [Ansible 101 - Episode 1 - Introduction to Ansible](https://www.youtube.com/watch?v=goclfp6a2IQ)
- [NetworkChuck - You need to learn Ansible right now!](https://www.youtube.com/watch?v=5hycyr-8EKs&t=955s)
- [Your complete guide to Ansible](https://www.youtube.com/playlist?list=PLnFWJCugpwfzTlIJ-JtuATD2MBBD7_m3u)

This final playlist listed above is where a lot of the code and ideas came from for this section, a great resource and walkthrough in video format.
上面列出的最后一个播放列表是本节中许多代码和想法的来源，这是一个很棒的视频格式资源和演练。

See you on [Day 68](day68.md)
第 [68 天](day68.md) 见