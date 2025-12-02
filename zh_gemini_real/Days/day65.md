---
title: '#90DaysOfDevOps - Ansible Playbooks - Day 65'
published: false
description: 90DaysOfDevOps - Ansible Playbooks
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049054
---

### Ansible Playbooks

In this section we will take a look at the main reason that I can see at least for Ansible, I mean it is great to take a single command and hit many different servers to perform simple commands such as rebooting a long list of servers and saving the hassle of having to connect to each one individually.
在本节中，我们将探讨至少在我看来使用 Ansible 的主要原因。我的意思是，能够使用单个命令对许多不同的服务器执行简单操作（例如重新启动大量服务器），并省去单独连接到每台服务器的麻烦，这很棒。

But what about actually taking a bare operating system and declaring the software and services we want running on that system and making sure they are all running in that desired state.
但是，如果我们要做的实际上是获取一个裸操作系统，并声明我们希望在该系统上运行的软件和服务，并确保它们都处于所需的运行状态呢？

This is where ansible playbooks come in. A playbook enables us to take our group of servers and perform configuration and installation tasks against that group.
这就是 Ansible Playbooks 发挥作用的地方。Playbook 使我们能够针对服务器组执行配置和安装任务。

### Playbook format

Playbook > Plays > Tasks

For anyone that comes from a sports background you may have come across the term playbook, a playbook then tells the team how you will play made up of various plays and tasks if we think of the plays as the set pieces within the sport or game, and the tasks are associated to each play, you can have multiple tasks to make up a play and in the playbook, you may have multiple different plays.
对于有体育背景的人来说，您可能遇到过术语“playbook”（战术手册）。Playbook 告诉团队如何进行比赛，它由各种“play”（剧本/行动）和“task”（任务）组成。如果我们将 play 视为体育运动或游戏中的固定套路，而 task 与每个 play 相关联，那么你可以有多个 task 来组成一个 play，而在整个 playbook 中，你可能有多个不同的 play。

These playbooks are written in YAML (YAML ain’t markup language) you will find a lot of the sections we have covered so far especially Containers and Kubernetes to feature YAML formatted configuration files.
这些 Playbook 使用 YAML（YAML ain’t markup language，一种递归缩写）编写。您会发现我们目前涉及的许多部分，尤其是容器和 Kubernetes，都包含 YAML 格式的配置文件。

Let’s take a look at a simple playbook called playbook.yml.
让我们看看一个名为 `playbook.yml` 的简单 Playbook。

```Yaml
- name: Simple Play
  hosts: localhost
  connection: local
  tasks:
    - name: Ping me
      ping:
    - name: print os
      debug:
        msg: "{{ ansible_os_family }}"
```

You will find the above file [simple_play](days/../Configmgmt/simple_play.yml). If we then use the `ansible-playbook simple_play.yml` command we will walk through the following steps.
您可以在此处找到上述文件 [simple_play](days/../Configmgmt/simple_play.yml)。如果我们随后使用 `ansible-playbook simple_play.yml` 命令，我们将执行以下步骤。

![](Images/Day65_config1.png)

You can see the first task of "gathering steps" happened, but we didn't trigger or ask for this? This module is automatically called by playbooks to gather useful variables about remote hosts. [ansible.builtin.setup](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/setup_module.html)
您可以看到第一个“gathering steps”（收集步骤）任务发生了，但我们并没有触发或要求它执行？这个模块由 Playbooks 自动调用，用于收集有关远程主机的有用变量。 [ansible.builtin.setup](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/setup_module.html)

Our second task was to set a ping, this is not an ICMP ping but a python script to report back `pong` on successful connectivity to remote or localhost. [ansible.builtin.ping](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/ping_module.html)
我们的第二个任务是设置 ping，这不是 ICMP ping，而是在成功连接到远程或 localhost 时报告 `pong` 的 Python 脚本。 [ansible.builtin.ping](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/ping_module.html)

Then our third or our second defined task as the first one will run unless you disable was the printing of a message telling us our OS. In this task we are using conditionals, we could run this playbook against all different types of operating systems and this would return the OS name. We are simply messaging this output for ease but we could add a task to say something like:
我们的第三个任务（或我们定义的第二个任务，因为第一个任务除非禁用否则会自动运行）是打印一条消息告诉我们操作系统。在这个任务中，我们使用了条件语句，我们可以针对所有不同类型的操作系统运行此 Playbook，并且它会返回操作系统的名称。为了简单起见，我们只是输出了这条消息，但我们可以添加一个任务，例如：

```Yaml
tasks:
  - name: "shut down Debian flavoured systems"
    command: /sbin/shutdown -t now
    when: ansible_os_family == "Debian"
```

### Vagrant to set up our environment

We are going to use Vagrant to set up our node environment, I am going to keep this at a reasonable 4 nodes but you can hopefully see that this could easily be 300 or 3000 and this is the power of Ansible and other configuration management tools to be able to configure your servers.
我们将使用 Vagrant 来设置我们的节点环境，我打算将其保持在合理的 4 个节点，但您可以预见到这很容易扩展到 300 或 3000 个节点，这就是 Ansible 和其他配置管理工具配置服务器的能力所在。

You can find this file located here ([Vagrantfile](Configmgmt/Vagrantfile))
您可以在此处找到此文件 ([Vagrantfile](Configmgmt/Vagrantfile))

```Vagrant
Vagrant.configure("2") do |config|
  servers=[
    {
      :hostname => "db01",
      :box => "bento/ubuntu-21.10",
      :ip => "192.168.169.130",
      :ssh_port => '2210'
    },
    {
      :hostname => "web01",
      :box => "bento/ubuntu-21.10",
      :ip => "192.168.169.131",
      :ssh_port => '2211'
    },
    {
      :hostname => "web02",
      :box => "bento/ubuntu-21.10",
      :ip => "192.168.169.132",
      :ssh_port => '2212'
    },
    {
      :hostname => "loadbalancer",
      :box => "bento/ubuntu-21.10",
      :ip => "192.168.169.134",
      :ssh_port => '2213'
    }

  ]

config.vm.base_address = 600

  servers.each do |machine|

    config.vm.define machine[:hostname] do |node|
      node.vm.box = machine[:box]
      node.vm.hostname = machine[:hostname]

      node.vm.network :public_network, bridge: "Intel(R) Ethernet Connection (7) I219-V", ip: machine[:ip]
      node.vm.network "forwarded_port", guest: 22, host: machine[:ssh_port], id: "ssh"

      node.vm.provider :virtualbox do |v|
        v.customize ["modifyvm", :id, "--memory", 2048]
        v.customize ["modifyvm", :id, "--name", machine[:hostname]]
      end
    end
  end

end
```

Use the `vagrant up` command to spin these machines up in VirtualBox, You might be able to add more memory and you might also want to define a different private_network address for each machine but this works in my environment. Remember our control box is the Ubuntu desktop we deployed during the Linux section.
使用 `vagrant up` 命令在 VirtualBox 中启动这些机器。您可能能够添加更多内存，并且您可能还想为每台机器定义不同的 `private_network` 地址，但这在我的环境中是有效的。请记住，我们的控制机是我们在 Linux 部分部署的 Ubuntu 桌面。

If you are resource contrained then you can also run `vagrant up web01 web02` to only bring up the webservers that we are using here.
如果您的资源有限，您也可以运行 `vagrant up web01 web02` 来仅启动我们在此处使用的 Web 服务器。

### Ansible host configuration

Now that we have our environment ready, we can check ansible and for this, we will use our Ubuntu desktop (You could use this but you can equally use any Linux-based machine on your network access to the network below) as our control, let’s also add the new nodes to our group in the ansible hosts file, you can think of this file as an inventory, an alternative to this could be another inventory file that is called on as part of your ansible command with `-i filename` this could be useful vs using the host file as you can have different files for different environments, maybe production, test and staging. Because we are using the default hosts file we do not need to specify as this would be the default used.
现在我们的环境已经准备好了，我们可以检查 Ansible，为此我们将使用我们的 Ubuntu 桌面（您可以使用它，但您也可以使用网络上任何可访问下方网络的基于 Linux 的机器）作为我们的控制节点。让我们也将新节点添加到 Ansible hosts 文件中的组中。您可以将此文件视为一个清单（inventory），另一种选择是使用 `-i filename` 作为 Ansible 命令的一部分来调用的另一个清单文件。这可能比使用默认 hosts 文件更有用，因为您可以为不同的环境（可能是生产、测试和预发布环境）设置不同的文件。由于我们使用的是默认的 hosts 文件，因此我们不需要指定它，因为它会被默认使用。

I have added the following to the default hosts file.
我已将以下内容添加到默认 hosts 文件中。

```Text
[control]
ansible-control

[proxy]
loadbalancer

[webservers]
web01
web02

[database]
db01

```

![](Images/Day65_config2.png)

Before moving on we want to make sure we can run a command against our nodes, let’s run `ansible nodes -m command -a hostname` this simple command will test that we have connectivity and report back our host names.
在继续之前，我们想确保可以针对我们的节点运行命令。让我们运行 `ansible nodes -m command -a hostname`，这个简单的命令将测试我们的连接性并报告主机名。

Also, note that I have added these nodes and IPs to my Ubuntu control node within the /etc/hosts file to ensure connectivity. We might also need to do an SSH configuration for each node from the Ubuntu box.
另外请注意，我已将这些节点及其 IP 添加到我的 Ubuntu 控制节点的 `/etc/hosts` 文件中，以确保连接性。我们可能还需要从 Ubuntu 机器对每个节点进行 SSH 配置。

```Text
192.168.169.140 ansible-control
192.168.169.130 db01
192.168.169.131 web01
192.168.169.132 web02
192.168.169.133 loadbalancer
```

![](Images/Day65_config3.png)

At this stage, we want to run through setting up SSH keys between your control and your server nodes. This is what we are going to do next, another way here could be to add variables into your host's file to give username and password. I would advise against this as this is never going to be a best practice.
在此阶段，我们希望设置控制节点和服务器节点之间的 SSH 密钥。这就是我们接下来要做的事情。另一种方法是将变量添加到 hosts 文件中以提供用户名和密码。我建议不要这样做，因为这绝不是最佳实践。

To set up SSH and share amongst your nodes, follow the steps below, you will be prompted for passwords (`vagrant`) and you will likely need to hit `y` a few times to accept.
要设置 SSH 并在节点之间共享，请按照以下步骤操作，系统将提示您输入密码 (`vagrant`)，并且您可能需要多次按 `y` 接受。

`ssh-keygen`

![](Images/Day65_config5.png)

`ssh-copy-id localhost`

![](Images/Day65_config6.png)

Now if you have all of your VMs switched on then you can run the `ssh-copy-id web01 && ssh-copy-id web02 && ssh-copy-id loadbalancer && ssh-copy-id db01` this will prompt you for your password in our case our password is `vagrant`
现在，如果您所有虚拟机都已开启，那么您可以运行 `ssh-copy-id web01 && ssh-copy-id web02 && ssh-copy-id loadbalancer && ssh-copy-id db01`，这会提示您输入密码，在我们的例子中密码是 `vagrant`

I am not running all my VMs and only running the webservers so I issued `ssh-copy-id web01 && ssh-copy-id web02`
我没有运行所有虚拟机，只运行了 Web 服务器，所以我输入了 `ssh-copy-id web01 && ssh-copy-id web02`

![](Images/Day65_config7.png)

Before running any playbooks I like to make sure that I have simple connectivity with my groups so I have run `ansible webservers -m ping` to test connectivity.
在运行任何 Playbooks 之前，我喜欢确保与我的组有简单的连接性，因此我运行了 `ansible webservers -m ping` 来测试连接。

![](Images/Day65_config4.png)

### Our First "real" Ansible Playbook

Our first Ansible playbook is going to configure our web servers, we have grouped these in our host's file under the grouping [webservers].
我们的第一个 Ansible Playbook 将配置我们的 Web 服务器，我们已在 hosts 文件中将它们归入 `[webservers]` 组。

Before we run our playbook we can confirm that our web01 and web02 do not have apache installed. The top of the screenshot below is showing you the folder and file layout I have created within my ansible control to run this playbook, we have the `playbook1.yml`, then in the templates folder we have the `index.html.j2` and `ports.conf.j2` files. You can find these files in the folder listed above in the repository.
在运行 Playbook 之前，我们可以确认我们的 web01 和 web02 尚未安装 Apache。下面的屏幕截图顶部显示了我为运行此 Playbook 在 Ansible 控制节点内创建的文件夹和文件布局，我们有 `playbook1.yml`，然后在 `templates` 文件夹中有 `index.html.j2` 和 `ports.conf.j2` 文件。您可以在仓库中上面列出的文件夹中找到这些文件。

Then we SSH into web01 to check if we have apache installed?
然后我们 SSH 进入 web01 来检查是否安装了 Apache？

![](Images/Day65_config8.png)

You can see from the above that we have not got apache installed on our web01 so we can fix this by running the below playbook.
从上面可以看出，我们的 web01 上没有安装 Apache，因此我们可以通过运行以下 Playbook 来解决此问题。

```Yaml
- hosts: webservers
  become: yes
  vars:
    http_port: 8000
    https_port: 4443
    html_welcome_msg: "Hello 90DaysOfDevOps"
  tasks:
  - name: ensure apache is at the latest version
    apt:
      name: apache2
      state: latest

  - name: write the apache2 ports.conf config file
    template:
      src: templates/ports.conf.j2
      dest: /etc/apache2/ports.conf
    notify:
    - restart apache

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

  handlers:
    - name: restart apache
      service:
        name: apache2
        state: restarted
```

Breaking down the above playbook:
分解上述 Playbook：

- `- hosts: webservers` this is saying that our group to run this playbook on is a group called webservers
- `- hosts: webservers` 这意味着我们运行此 Playbook 的组是名为 `webservers` 的组
- `become: yes` means that our user running the playbook will become root on our remote systems. You will be prompted for the root password.
- `become: yes` 意味着运行 Playbook 的用户将在远程系统上成为 root 用户。系统将提示您输入 root 密码。
- We then have `vars` and this defines some environment variables we want throughout our webservers.
- 然后我们有 `vars`，它定义了我们在整个 Web 服务器中需要的一些环境变量。

Following this, we start our tasks,
接下来，我们开始执行任务 (tasks)：

- Task 1 is to ensure that apache is running the latest version
- 任务 1 是确保 Apache 运行最新版本
- Task 2 is writing the ports.conf file from our source found in the templates folder.
- 任务 2 是从 `templates` 文件夹中的源文件写入 `ports.conf` 配置文件。
- Task 3 is creating a basic index.html file
- 任务 3 是创建一个基本的 `index.html` 文件
- Task 4 is making sure apache is running
- 任务 4 是确保 Apache 正在运行

Finally, we have a handlers section, [Handlers: Running operations on change](https://docs.ansible.com/ansible/latest/user_guide/playbooks_handlers.html)
最后，我们有一个 `handlers`（处理程序）部分，[Handlers: Running operations on change](https://docs.ansible.com/ansible/latest/user_guide/playbooks_handlers.html)

"Sometimes you want a task to run only when a change is made on a machine. For example, you may want to restart a service if a task updates the configuration of that service, but not if the configuration is unchanged. Ansible uses handlers to address this use case. Handlers are tasks that only run when notified. Each handler should have a globally unique name."
“有时您希望任务仅在机器发生更改时运行。例如，如果某个任务更新了服务的配置，您可能希望重新启动该服务，但如果配置未更改则不需要。Ansible 使用 handlers 来解决这个用例。Handlers 是仅在被通知时才运行的任务。每个 handler 都应该有一个全局唯一的名称。”

At this stage, you might be thinking that we have deployed 5 VMs (including our Ubuntu Desktop machine which is acting as our Ansible Control) The other systems will come into play during the rest of the section.
在此阶段，您可能会认为我们部署了 5 个虚拟机（包括充当 Ansible 控制节点的 Ubuntu 桌面机器）。其他系统将在本节的其余部分发挥作用。

### Run our Playbook

We are now ready to run our playbook against our nodes. To run our playbook we can use the `ansible-playbook playbook1.yml` We have defined the hosts that our playbook will run against within the playbook and this will walk through the tasks that we have defined.
现在我们准备好对我们的节点运行 Playbook 了。要运行我们的 Playbook，我们可以使用 `ansible-playbook playbook1.yml`。我们已经在 Playbook 中定义了 Playbook 将针对哪些主机运行，并且它将执行我们定义的任务。

When the command is complete we get an output showing our plays and tasks, this may take some time you can see from the below image that this took a while to go and install our desired state.
命令完成后，我们会得到一个显示我们的 plays 和 tasks 的输出。这可能需要一些时间，您可以从下图中看到，它花了一段时间来安装我们所需的配置状态。

![](Images/Day65_config9.png)

We can then double-check this by jumping into a node and checking we have the installed software on our node.
然后，我们可以通过跳入一个节点并检查我们的节点上是否安装了软件来再次确认。

![](Images/Day65_config10.png)

Just to round this out as we have deployed two standalone webservers with the above we can now navigate to the respective IPs that we defined and get our new website.
总结一下，由于我们使用上述 Playbook 部署了两个独立的 Web 服务器，我们现在可以导航到我们定义的相应 IP 地址并访问我们的新网站。

![](Images/Day65_config11.png)

We are going to build on this playbook as we move through the rest of this section. I am interested as well in taking our Ubuntu desktop and seeing if we could bootstrap our applications and configuration using Ansible so we might also touch this. You saw that we can use the local host in our commands we can also run playbooks against our local host for example.
在本节的其余部分，我们将在此 Playbook 的基础上进行构建。我也很有兴趣使用 Ansible 对我们的 Ubuntu 桌面进行应用程序和配置的引导（bootstrap），所以我们可能会涉及这方面的内容。您已经看到我们可以在命令中使用 `localhost`，例如，我们也可以针对本地主机运行 Playbooks。

Another thing to add here is that we are only really working with Ubuntu VMs but Ansible is agnostic to the target systems. The alternatives that we have previously mentioned to manage your systems could be server by server (not scalable when you get over a large number of servers, plus a pain even with 3 nodes) we can also use shell scripting which again we covered in the Linux section but these nodes are potentially different so yes it can be done but then someone needs to maintain and manage those scripts. Ansible is free and hits the easy button vs having to have a specialised script.
这里要补充一点，尽管我们目前主要使用 Ubuntu 虚拟机，但 Ansible 对目标系统是不可知的（agnostic）。我们之前提到过的管理系统的替代方案可以是逐台服务器管理（当服务器数量过多时，可扩展性差，即使只有 3 个节点也很麻烦），我们也可以使用 Shell 脚本（我们在 Linux 部分也介绍过），但这些节点可能存在差异，因此虽然可以做到，但需要有人维护和管理这些脚本。Ansible 是免费的，并且比编写专门的脚本更加便捷。

## Resources

- [What is Ansible](https://www.youtube.com/watch?v=1id6ERvfozo)
- [Ansible 101 - Episode 1 - Introduction to Ansible](https://www.youtube.com/watch?v=goclfp6a2IQ)
- [NetworkChuck - You need to learn Ansible right now!](https://www.youtube.com/watch?v=5hycyr-8EKs&t=955s)
- [Your complete guide to Ansible](https://www.youtube.com/playlist?list=PLnFWJCugpwfzTlIJ-JtuATD2MBBD7_m3u)

This final playlist listed above is where a lot of the code and ideas came from for this section, a great resource and walkthrough in video format.
上面列出的最后一个播放列表是本节中许多代码和想法的来源，它是一个很好的视频格式资源和演练。

See you on [Day 66](day66.md)
第 66 天见 [Day 66](day66.md)