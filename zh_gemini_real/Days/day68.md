---
title: '#90DaysOfDevOps - Tags, Variables, Inventory & Database Server config - Day 68'
published: false
description: '90DaysOfDevOps - Tags, Variables, Inventory & Database Server config'
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048780
---

## Tags, Variables, Inventory & Database Server config

### Tags

As we left our playbook in the session yesterday we would need to run every task and play within that playbook.
正如我们在昨天的会话中留下的剧本一样，我们需要运行该剧本中的每个任务和剧。
This means we would have to run the webservers and loadbalancer plays and tasks to completion.
这意味着我们必须运行 webservers 和 loadbalancer 的剧和任务直到完成。

However, tags can enable us to separate these if we want. This could be an efficient move if we have extra large and long playbooks in our environments.
然而，如果需要，标签可以让我们将这些内容分隔开来。如果我们的环境中有超大型和冗长的剧本，这可能是一种高效的做法。

In our playbook file, in this case, we are using [ansible-scenario5](Configmgmt/ansible-scenario5/playbook5.yml)
在我们的剧本文件中，在本例中，我们使用的是 [ansible-scenario5](Configmgmt/ansible-scenario5/playbook5.yml)

```Yaml
- hosts: webservers
  become: yes
  vars:
    http_port: 8000
    https_port: 4443
    html_welcome_msg: "Hello 90DaysOfDevOps - Welcome to Day 66!"
  roles:
    - common
    - apache2
  tags: web

- hosts: proxy
  become: yes
  roles:
    - common
    - nginx
  tags: proxy
```

We can then confirm this by using the `ansible-playbook playbook5.yml --list-tags` and the list tags are going to outline the tags we have defined in our playbook.
然后，我们可以使用 `ansible-playbook playbook5.yml --list-tags` 来确认这一点，列表标签将概述我们在剧本中定义的标签。

![](Images/Day68_config1.png)

Now if we wanted to target just the proxy we could do this by running `ansible-playbook playbook5.yml --tags proxy` and this will as you can see below only run the playbook against the proxy.
现在如果我们要只针对代理服务器（proxy），我们可以通过运行 `ansible-playbook playbook5.yml --tags proxy` 来实现，如下图所示，这将只针对代理服务器运行剧本。

![](Images/Day68_config2.png)

tags can be added at the task level as well so we can get granular on where and what you want to happen. It could be application-focused tags, we could go through tasks for example and tag our tasks based on installation, configuration or removal. Another very useful tag you can use is
标签也可以在任务级别添加，这样我们就可以精细地控制要在哪里发生什么。它可以是专注于应用程序的标签，例如，我们可以遍历任务并根据安装、配置或删除来标记我们的任务。另一个非常有用的标签是

`tag: always` this will ensure no matter what --tags you are using in your command if something is tagged with the always value then it will always be running when you run the ansible-playbook command.
`tag: always` 这将确保无论你在命令中使用什么 --tags，如果某个内容被标记为 always 值，那么当你运行 ansible-playbook 命令时，它将始终运行。

With tags, we can also bundle multiple tags together and if we choose to run `ansible-playbook playbook5.yml --tags proxy,web` this will run all of the items with those tags. Obviously, in our instance, that would mean the same as running the playbook but if we had multiple other plays then this would make sense.
使用标签，我们还可以将多个标签捆绑在一起，如果我们选择运行 `ansible-playbook playbook5.yml --tags proxy,web`，这将运行所有带有这些标签的项目。显然，在我们的实例中，这与运行整个剧本是相同的效果，但如果我们有多个其他剧（plays），那么这样做将是有意义的。

You can also define more than one tag.
你也可以定义多个标签。

### Variables

There are two main types of variables within Ansible.
Ansible 中主要有两种类型的变量。

- User created
- 用户创建的
- Ansible Facts
- Ansible 事实（Facts）

### Ansible Facts

Each time we have run our playbooks, we have had a task that we have not defined called "Gathering facts" we can use these variables or facts to make things happen with our automation tasks.
每次运行剧本时，我们都会遇到一个我们没有定义的任务，称为“Gathering facts”（收集事实），我们可以使用这些变量或事实来实现我们的自动化任务。

![](Images/Day68_config3.png)

If we were to run the following `ansible proxy -m setup` command we should see a lot of output in JSON format. There is going to be a lot of information on your terminal though to use this so we would like to output this to a file using `ansible proxy -m setup >> facts.json` you can see this file in this repository, [ansible-scenario5](Configmgmt/ansible-scenario5/facts.json)
如果我们运行以下 `ansible proxy -m setup` 命令，我们应该会看到大量的 JSON 格式输出。终端上将会有大量信息，为了方便使用，我们希望使用 `ansible proxy -m setup >> facts.json` 将其输出到一个文件中。你可以在这个仓库中看到这个文件：[ansible-scenario5](Configmgmt/ansible-scenario5/facts.json)

![](Images/Day68_config4.png)

If you open this file you can see all sorts of information for our command. We can get our IP addresses, architecture, and bios version. A lot of useful information if we want to leverage this and use this in our playbooks.
如果你打开这个文件，你可以看到我们命令的各种信息。我们可以获取 IP 地址、架构和 BIOS 版本。如果我们想利用这些信息并在我们的剧本中使用它们，这是非常有用的。

An idea would be to potentially use one of these variables within our nginx template mysite.j2 where we hard-coded the IP addresses of our webservers. You can do this by creating a for loop in your mysite.j2 and this is going to cycle through the group [webservers] this enables us to have more than our 2 webservers automatically and dynamically created or added to this load balancer configuration.
一个想法是，我们可以在 nginx 模板 mysite.j2 中使用其中一个变量，我们之前在其中硬编码了 webservers 的 IP 地址。你可以通过在 mysite.j2 中创建一个 for 循环来实现这一点，它将遍历 [webservers] 组，这使我们能够自动且动态地创建或将多于我们现在 2 个 webserver 添加到此负载均衡器配置中。

```
#Dynamic Config for server {{ ansible_facts['nodename'] }}
    upstream webservers {
  {% for host in groups['webservers'] %}
        server {{ hostvars[host]['ansible_facts']['nodename'] }}:8000;
    {% endfor %}
    }

    server {
        listen 80;

        location / {
                proxy_pass http://webservers;
        }
    }
```

The outcome of the above will look the same as it does right now but if we added more web servers or removed one this would dynamically change the proxy configuration. For this to work you will need to have name resolution configured.
上述的结果看起来和现在一样，但如果我们添加了更多的 web server 或删除了一个，这将动态地改变代理配置。要使其工作，你需要配置名称解析。

### User created

User-created variables are what we have created ourselves. If you take a look in our playbook you will see we have `vars:` and then a list of 3 variables we are using there.
用户创建的变量是我们自己创建的。如果你查看我们的剧本，你会看到我们有 `vars:`，然后是我们在那里使用的 3 个变量的列表。

```Yaml
- hosts: webservers
  become: yes
  vars:
    http_port: 8000
    https_port: 4443
    html_welcome_msg: "Hello 90DaysOfDevOps - Welcome to Day 68!"
  roles:
    - common
    - apache2
  tags: web

- hosts: proxy
  become: yes
  roles:
    - common
    - nginx
  tags: proxy
```

We can however keep our playbook clear of variables by moving them to their file. We are going to do this but we will move into the [ansible-scenario6](Configmgmt/ansible-scenario6) folder. In the root of that folder, we are going to create a group_vars folder. We are then going to create another folder called all (all groups are going to get these variables). In there we will create a file called `common_variables.yml` and we will copy our variables from our playbook into this file. Removing them from the playbook along with vars: as well.
然而，我们可以通过将变量移动到它们自己的文件来保持剧本的整洁。我们将这样做，但我们首先会进入 [ansible-scenario6](Configmgmt/ansible-scenario6) 文件夹。在该文件夹的根目录下，我们将创建一个 group_vars 文件夹。然后我们将创建另一个名为 all 的文件夹（所有组都将获取这些变量）。在那里，我们将创建一个名为 `common_variables.yml` 的文件，并将我们的变量从剧本复制到该文件中。同时也将 vars: 从剧本中移除。

```Yaml
http_port: 8000
https_port: 4443
html_welcome_msg: "Hello 90DaysOfDevOps - Welcome to Day 68!"
```

Because we are associating this as a global variable we could also add in our NTP and DNS servers here as well. The variables are set from the folder structure that we have created. You can see below how clean our Playbook now looks.
因为我们将其关联为全局变量，所以我们也可以在此处添加我们的 NTP 和 DNS 服务器。这些变量是根据我们创建的文件夹结构设置的。你可以在下面看到我们的剧本现在看起来多么整洁。

```Yaml
- hosts: webservers
  become: yes
  roles:
    - common
    - apache2
  tags: web

- hosts: proxy
  become: yes
  roles:
    - common
    - nginx
  tags: proxy
```

One of those variables was the http_port, we can use this again in our for loop within the mysite.j2 as per below:
其中一个变量是 http_port，我们可以在 mysite.j2 中的 for 循环中再次使用它，如下所示：

```J2
#Dynamic Config for server {{ ansible_facts['nodename'] }}
    upstream webservers {
  {% for host in groups['webservers'] %}
        server {{ hostvars[host]['ansible_facts']['nodename'] }}:{{ http_port }};
    {% endfor %}
    }

    server {
        listen 80;

        location / {
                proxy_pass http://webservers;
        }
    }
```

We can also define an ansible fact in our roles/apache2/templates/index.HTML.j2 file so that we can understand which webserver we are on.
我们还可以在 roles/apache2/templates/index.HTML.j2 文件中定义一个 Ansible 事实（fact），以便我们了解当前位于哪个 webserver 上。

```J2
<html>

<h1>{{ html_welcome_msg }}! I'm webserver {{ ansible_facts['nodename'] }} </h1>

</html>
```

The results of running the `ansible-playbook playbook6.yml` command with our variable changes mean that when we hit our loadbalancer you can see that we hit either of the webservers we have in our group.
运行带有变量更改的 `ansible-playbook playbook6.yml` 命令的结果意味着，当我们访问负载均衡器时，可以看到我们访问了组中任何一个 webserver。

![](Images/Day68_config5.png)

We could also add a folder called host_vars and create a web01.yml and have a specific message or change what that looks like on a per host basis if we wish.
如果愿意，我们还可以添加一个名为 host_vars 的文件夹，并创建一个 web01.yml 文件，以便根据每个主机来设置特定的消息或更改其显示内容。

### Inventory Files

So far we have used the default hosts file in the /etc/ansible folder to determine our hosts. We could however have different files for different environments, for example, production and staging. I am not going to create more environments. But we can create our host files.
到目前为止，我们一直使用 /etc/ansible 文件夹中的默认 hosts 文件来确定我们的主机。然而，我们可以为不同的环境使用不同的文件，例如生产环境和预演环境。我不会创建更多的环境。但我们可以创建自己的主机文件。

We can create multiple files for our different inventory of servers and nodes. We would call these using `ansible-playbook -i dev playbook.yml` you can also define variables within your host's file and then print that out or leverage that variable somewhere else in your playbooks for example in the example and training course I am following along to below they have added the environment variable created in the host file to the loadbalancer web page template to show the environment as part of the web page message.
我们可以为我们不同的服务器和节点清单创建多个文件。我们将使用 `ansible-playbook -i dev playbook.yml` 来调用这些文件。你还可以在主机文件中定义变量，然后在剧本的其他地方打印或利用该变量，例如，在我下面正在学习的示例和培训课程中，他们将主机文件中创建的环境变量添加到了负载均衡器的网页模板中，以将环境显示为网页消息的一部分。

### Deploying our Database server

We still have one more machine we have not powered up yet and configured. We can do this using `vagrant up db01` from where our Vagrantfile is located. When this is up and accessible we then need to make sure the SSH key is copied over using `ssh-copy-id db01` so that we can access it.
我们还有一个尚未启动和配置的机器。我们可以从 Vagrantfile 所在的目录使用 `vagrant up db01` 来完成此操作。当它启动并可访问时，我们需要使用 `ssh-copy-id db01` 确保 SSH 密钥已复制过去，以便我们可以访问它。

We are going to be working from the [ansible-scenario7](Configmgmt/ansible-scenario7) folder
我们将从 [ansible-scenario7](Configmgmt/ansible-scenario7) 文件夹开始工作。

Let's then use `ansible-galaxy init roles/mysql` to create a new folder structure for a new role called "MySQL"
然后，让我们使用 `ansible-galaxy init roles/mysql` 为一个名为 "MySQL" 的新角色创建一个新的文件夹结构。

In our playbook, we are going to add a new play block for the database configuration. We have our group database defined in our /etc/ansible/hosts file. We then instruct our database group to have the role common and a new role called MySQL which we created in the previous step. We are also tagging our database group with the database, this means as we discussed earlier we can choose to only run against these tags if we wish.
在我们的剧本中，我们将添加一个新的剧块用于数据库配置。我们在 /etc/ansible/hosts 文件中定义了数据库组 database。然后，我们指示我们的数据库组使用 common 角色以及我们在上一步中创建的名为 MySQL 的新角色。我们还使用 database 标签标记了我们的数据库组，这意味着如前所述，如果需要，我们可以选择仅针对这些标签运行。

```Yaml
- hosts: webservers
  become: yes
  roles:
    - common
    - apache2
  tags:
    web

- hosts: proxy
  become: yes
  roles:
    - common
    - nginx
  tags:
    proxy

- hosts: database
  become: yes
  roles:
    - common
    - mysql
  tags: database
```

Within our roles folder structure, you will now have the tree automatically created, we need to populate the following:
在我们的 roles 文件夹结构中，现在将自动创建目录树，我们需要填充以下内容：

Handlers - main.yml
Handlers - main.yml

```Yaml
# handlers file for roles/mysql
- name: restart mysql
  service:
    name: mysql
    state: restarted
```

Tasks - install_mysql.yml, main.yml & setup_mysql.yml
Tasks - install_mysql.yml, main.yml & setup_mysql.yml

install_mysql.yml - this task is going to be there to install MySQL and ensure that the service is running.
install_mysql.yml - 此任务将用于安装 MySQL 并确保服务正在运行。

```Yaml
- name: "Install Common packages"
  apt: name={{ item }} state=latest
  with_items:
   - python3-pip
   - mysql-client
   - python3-mysqldb
   - libmysqlclient-dev

- name: Ensure mysql-server is installed latest version
  apt: name=mysql-server state=latest

- name: Installing python module MySQL-python
  pip:
    name: PyMySQL

- name: Ensure mysql-server is running
  service:
    name: mysql
    state: started
```

main.yml is a pointer file that will suggest that we import_tasks from these files.
main.yml 是一个指针文件，它将建议我们从这些文件中 import_tasks（导入任务）。

```Yaml
# tasks file for roles/mysql
- import_tasks: install_mysql.yml
- import_tasks: setup_mysql.yml
```

setup_mysql.yml - This task will create our database and database user.
setup_mysql.yml - 此任务将创建我们的数据库和数据库用户。

```Yaml
- name: Create my.cnf configuration file
  template: src=templates/my.cnf.j2 dest=/etc/mysql/conf.d/mysql.cnf
  notify: restart mysql

- name: Create database user with name 'devops' and password 'DevOps90' with all database privileges
  community.mysql.mysql_user:
    login_unix_socket: /var/run/mysqld/mysqld.sock
    login_user: "{{ mysql_user_name }}"
    login_password: "{{ mysql_user_password }}"
    name: "{{db_user}}"
    password: "{{db_pass}}"
    priv: '*.*:ALL'
    host: '%'
    state: present

- name: Create a new database with name '90daysofdevops'
  mysql_db:
    login_user: "{{ mysql_user_name }}"
    login_password: "{{ mysql_user_password }}"
    name: "{{ db_name }}"
    state: present
```

You can see from the above we are using some variables to determine some of our configuration such as passwords, usernames and databases, this is all stored in our group_vars/all/common_variables.yml file.
从上面可以看到，我们使用了一些变量来确定我们的一些配置，例如密码、用户名和数据库，所有这些都存储在我们的 group_vars/all/common_variables.yml 文件中。

```Yaml
http_port: 8000
https_port: 4443
html_welcome_msg: "Hello 90DaysOfDevOps - Welcome to Day 68!"

mysql_user_name: root
mysql_user_password: "vagrant"
db_user: devops
db_pass: DevOps90
db_name: 90DaysOfDevOps
```

We also have my.cnf.j2 file in the templates folder, which looks like below:
在 templates 文件夹中，我们还有一个 my.cnf.j2 文件，内容如下：

```J2
[mysql]
bind-address = 0.0.0.0
```

### Running the playbook

Now we have our VM up and running and we have our configuration files in place, we are now ready to run our playbook which will include everything we have done before if we run the following `ansible-playbook playbook7.yml` or we could choose to just deploy to our database group with the `ansible-playbook playbook7.yml --tags database` command, which will just run our new configuration files.
现在我们的虚拟机已经启动并运行，并且配置文件的位置也已就绪，我们现在准备运行我们的剧本，如果我们运行 `ansible-playbook playbook7.yml`，它将包含我们之前所做的一切；或者我们可以选择使用 `ansible-playbook playbook7.yml --tags database` 命令，只部署到我们的数据库组，这将只运行我们的新配置文件。

I ran only against the database tag but I stumbled across an error. This error tells me that we do not have pip3 (Python) installed. We can fix this by adding this to our common tasks and install
我只针对 database 标签运行，但我遇到了一个错误。这个错误告诉我我们没有安装 pip3 (Python)。我们可以通过将其添加到我们的 common 任务中并进行安装来解决这个问题。

![](Images/Day68_config6.png)

We fixed the above and ran the playbook again and we have a successful change.
我们修复了上述问题并再次运行了剧本，并成功进行了更改。

![](Images/Day68_config7.png)

We should probably make sure that everything is how we want it to be on our newly configured db01 server. We can do this from our control node using the `ssh db01` command.
我们应该确保在我们新配置的 db01 服务器上的一切都如我们所愿。我们可以使用 `ssh db01` 命令从我们的控制节点执行此操作。

To connect to MySQL I used `sudo /usr/bin/mysql -u root -p` and gave the vagrant password for root at the prompt.
为了连接到 MySQL，我使用了 `sudo /usr/bin/mysql -u root -p` 并在提示符下输入了 root 用户的 vagrant 密码。

When we have connected let's first make sure we have our user created called DevOps. `select user, host from mysql.user;`
当我们连接后，首先确保我们创建了名为 DevOps 的用户。`select user, host from mysql.user;`

![](Images/Day68_config8.png)

Now we can issue the `SHOW DATABASES;` command to see our new database that has also been created.
现在我们可以发出 `SHOW DATABASES;` 命令来查看也已创建的新数据库。

![](Images/Day68_config9.png)

I used the root to connect but we could also now log in with our DevOps account, in the same way, using `sudo /usr/bin/MySQL -u devops -p` but the password here is DevOps90.
我使用 root 用户连接，但我们现在也可以用我们的 DevOps 帐户登录，同样使用 `sudo /usr/bin/MySQL -u devops -p`，但这里的密码是 DevOps90。

One thing I have found is that in our `setup_mysql.yml` I had to add the line `login_unix_socket: /var/run/mysqld/mysqld.sock` to successfully connect to my db01 MySQL instance and now every time I run this it reports a change when creating the user, any suggestions would be greatly appreciated.
我发现一件事，在我们的 `setup_mysql.yml` 中，我必须添加 `login_unix_socket: /var/run/mysqld/mysqld.sock` 这一行才能成功连接到我的 db01 MySQL 实例，现在每次运行它时，它在创建用户时都会报告更改，任何建议都将不胜感激。

## Resources

- [What is Ansible](https://www.youtube.com/watch?v=1id6ERvfozo)
- [Ansible 101 - Episode 1 - Introduction to Ansible](https://www.youtube.com/watch?v=goclfp6a2IQ)
- [NetworkChuck - You need to learn Ansible right now!](https://www.youtube.com/watch?v=5hycyr-8EKs&t=955s)
- [Your complete guide to Ansible](https://www.youtube.com/playlist?list=PLnFWJCugpwfzTlIJ-JtuATD2MBBD7_m3u)

This final playlist listed above is where a lot of the code and ideas came from for this section, a great resource and walkthrough in video format.
上面列出的最后一个播放列表是本节中许多代码和想法的来源，这是一个很棒的视频格式资源和演练。

See you on [Day 69](day69.md)
[Day 69](day69.md) 再见
