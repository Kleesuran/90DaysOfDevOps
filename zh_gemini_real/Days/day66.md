---
title: '#90DaysOfDevOps - Ansible Playbooks Continued... - Day 66'
published: false
description: 90DaysOfDevOps - Ansible Playbooks Continued...
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048712
---

## Ansible Playbooks (Continued)

In our last section, we started with creating our small lab using a Vagrantfile to deploy 4 machines and we used the Linux machine we created in that section as our ansible control system.
在上一节中，我们开始使用 Vagrantfile 创建我们的小型实验室，部署了 4 台机器，并使用在该节中创建的 Linux 机器作为我们的 Ansible 控制系统。

We also ran through a few scenarios of playbooks and at the end we had a playbook that made our web01 and web02 individual web servers.
我们还运行了几个 playbook 场景，最后我们有一个 playbook 将我们的 web01 和 web02 配置成了独立的 Web 服务器。

![](Images/Day66_config1.png)

### Keeping things tidy

Before we get into further automation and deployment we should cover the ability to keep our playbook lean and tidy and how we can separate our tasks and handlers into subfolders.
在我们进行进一步的自动化和部署之前，我们应该讨论如何保持 playbook 精简和整洁，以及如何将任务（tasks）和处理程序（handlers）分离到子文件夹中。

we are going to copy our tasks into their file within a folder.
我们将把我们的任务复制到文件夹内的独立文件中。

```Yaml
- name: ensure apache is at the latest version
  apt: name=apache2 state=latest

- name: write the apache2 ports.conf config file
  template:
    src=templates/ports.conf.j2
    dest=/etc/apache2/ports.conf
  notify: restart apache

- name: write a basic index.html file
  template:
    src: templates/index.html.j2
    dest: /var/www/html/index.html
  notify:
  - restart apache

- name: ensure apache is running
  service:
    name: apache2
    state: started
```

and the same for the handlers.
处理程序（handlers）也一样。

```Yaml
- name: restart apache
  service:
    name: apache2
    state: restarted
```

then within our playbook now named `playbook2.yml` we point to these files. All of which can be found at [ansible-scenario2](Days/../Configmgmt/ansible-scenario2/)
然后，在我们现在命名为 `playbook2.yml` 的 playbook 中，我们指向这些文件。所有这些文件都可以在 [ansible-scenario2](Days/../Configmgmt/ansible-scenario2/) 中找到。

You can test this on your control machine. If you have copied the files from the repository you should have noticed something changed in the "write a basic index.html file"
你可以在你的控制机器上测试这一点。如果你从仓库中复制了文件，你应该注意到 "write a basic index.html file" 中有些东西发生了变化。

![](Images/Day66_config2.png)

Let's find out what simple change I made. Using `curl web01:8000`
让我们找出我做了什么简单的更改。使用 `curl web01:8000`。

![](Images/Day66_config3.png)

We have just tidied up our playbook and started to separate areas that could make a playbook very overwhelming at scale.
我们刚刚整理了我们的 playbook，并开始分离那些在大规模部署中可能使 playbook 变得难以管理的区域。

### Roles and Ansible Galaxy

At the moment we have deployed 4 VMs and we have configured 2 of these VMs as our webservers but we have some more specific functions namely, a database server and a loadbalancer or proxy. For us to do this and tidy up our repository, we can use roles within Ansible.
目前我们部署了 4 个虚拟机，并将其中 2 个配置为 Web 服务器，但我们还有一些更具体的功能，即数据库服务器和负载均衡器或代理。为了完成这些并整理我们的仓库，我们可以在 Ansible 中使用角色（roles）。

To do this we will use the `ansible-galaxy` command which is there to manage ansible roles in shared repositories.
为此，我们将使用 `ansible-galaxy` 命令，该命令用于管理共享仓库中的 Ansible 角色。

![](Images/Day66_config4.png)

We are going to use `ansible-galaxy` to create a role for apache2 which is where we are going to put our specifics for our webservers.
我们将使用 `ansible-galaxy` 为 apache2 创建一个角色，我们将在其中放置 Web 服务器的特定配置。

![](Images/Day66_config5.png)

The above command `ansible-galaxy init roles/apache2` will create the folder structure that we have shown above. Our next step is we need to move our existing tasks and templates to the relevant folders in the new structure.
上述命令 `ansible-galaxy init roles/apache2` 将创建我们上面显示的文件夹结构。我们的下一步是将我们现有的任务和模板移动到新结构中相应的文件夹中。

![](Images/Day66_config6.png)

Copy and paste are easy to move those files but we also need to make a change to the tasks/main.yml so that we point this to the apache2_install.yml.
复制和粘贴可以轻松移动这些文件，但我们还需要更改 tasks/main.yml，以便将它指向 apache2_install.yml。

We also need to change our playbook now to refer to our new role. In the playbook1.yml and playbook2.yml we determine our tasks and handlers in different ways as we changed these between the two versions. We need to change our playbook to use this role as per below:
我们现在还需要更改我们的 playbook 以引用新角色。在 playbook1.yml 和 playbook2.yml 中，我们以不同的方式确定了任务和处理程序，因为我们在两个版本之间进行了更改。我们需要按照如下方式更改我们的 playbook 来使用这个角色：

```Yaml
- hosts: webservers
  become: yes
  vars:
    http_port: 8000
    https_port: 4443
    html_welcome_msg: "Hello 90DaysOfDevOps - Welcome to Day 66!"
  roles:
    - apache2
```

![](Images/Day66_config7.png)

We can now run our playbook again this time with the new playbook name `ansible-playbook playbook3.yml` you will notice the depreciation, we can fix that next.
现在我们可以再次运行我们的 playbook，这次使用新的 playbook 名称 `ansible-playbook playbook3.yml`，你会注意到一条弃用警告（depreciation），我们接下来可以修复它。

![](Images/Day66_config8.png)

Ok, the depreciation although our playbook ran we should fix our ways now, to do that I have changed the include option in the tasks/main.yml to now be import_tasks as per below.
好的，尽管我们的 playbook 运行成功，但我们应该修复这个弃用警告。为此，我已经将 tasks/main.yml 中的 include 选项更改为 import_tasks，如下所示。

![](Images/Day66_config9.png)

You can find these files in the [ansible-scenario3](Days/Configmgmt/ansible-scenario3)
您可以在 [ansible-scenario3](Days/Configmgmt/ansible-scenario3) 中找到这些文件。

We are also going to create a few more roles whilst using `ansible-galaxy` we are going to create:
在使用 `ansible-galaxy` 的同时，我们还将创建几个额外的角色：

- common = for all of our servers (`ansible-galaxy init roles/common`)
- common = 用于我们所有的服务器 (`ansible-galaxy init roles/common`)
- nginx = for our loadbalancer (`ansible-galaxy init roles/nginx`)
- nginx = 用于我们的负载均衡器 (`ansible-galaxy init roles/nginx`)

![](Images/Day66_config10.png)

I am going to leave this one here and in the next session, we will start working on those other nodes we have deployed but have not done anything with yet.
我将把这一部分留在这里，在下一节中，我们将开始处理我们已经部署但尚未进行任何操作的其他节点。

## Resources

- [What is Ansible](https://www.youtube.com/watch?v=1id6ERvfozo)
- [Ansible 101 - Episode 1 - Introduction to Ansible](https://www.youtube.com/watch?v=goclfp6a2IQ)
- [NetworkChuck - You need to learn Ansible right now!](https://www.youtube.com/watch?v=5hycyr-8EKs&t=955s)
- [Your complete guide to Ansible](https://www.youtube.com/playlist?list=PLnFWJCugpwfzTlIJ-JtuATD2MBBD7_m3u)

This final playlist listed above is where a lot of the code and ideas came from for this section, a great resource and walkthrough in video format.
上面列出的最后一个播放列表是本节中许多代码和想法的来源，这是一个很好的视频格式的资源和演练。

See you on [Day 67](day67.md)
第 67 天见 [Day 67](day67.md)
