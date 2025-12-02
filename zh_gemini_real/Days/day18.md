---
title: '#90DaysOfDevOps - SSH & Web Server - Day 18'
published: false
description: 90DaysOfDevOps - SSH & Web Server
description: 90DaysOfDevOps - SSH和Web服务器
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048733
---

## SSH & Web Server

As we have mentioned throughout you are going to most likely be managing lots of remote Linux servers, because of this, you will need to make sure that your connectivity to these remote servers is secure. In this section, we want to cover some of the basics of SSH that everyone should know that will help you with that secure tunnel to your remote systems.
正如我们一直提到的，您很可能会管理许多远程Linux服务器，因此，您需要确保与这些远程服务器的连接是安全的。在本节中，我们将介绍一些每个人都应该了解的SSH基础知识，这些知识将帮助您建立通往远程系统的安全隧道。

- Setting up a connection with SSH
- 使用SSH建立连接
- Transferring files
- 传输文件
- Create your private key
- 创建您的私钥

### SSH introduction

- Secure shell
- 安全外壳
- Networking Protocol
- 网络协议
- Allows secure communications
- 允许安全通信
- Can secure any network service
- 可以保护任何网络服务
- Typically used for remote command-line access
- 通常用于远程命令行访问

In our environment, if you have been following along we have been using SSH already but this was all configured and automated through our vagrant configuration so we only had to run `vagrant ssh` and we gained access to our remote virtual machine.
在我们的环境中，如果您一直跟随着，我们已经在使用SSH了，但这都是通过我们的vagrant配置来配置和自动化的，所以我们只需要运行 `vagrant ssh` 就可以访问我们的远程虚拟机。

If our remote machine was not on the same system as our workstation and was in a remote location, maybe a cloud-based system or running in a data centre that we could only access over the internet we would need a secure way of being able to access the system to manage it.
如果我们的远程机器与我们的工作站不在同一系统上，并且位于远程位置，可能是基于云的系统或运行在我们只能通过互联网访问的数据中心，那么我们需要一种安全的方式来访问该系统以对其进行管理。

SSH provides a secure tunnel between client and server so that nothing can be intercepted by bad actors.
SSH在客户端和服务器之间提供了一个安全的隧道，这样恶意行为者就无法拦截任何东西。

![](Images/Day18_Linux1.png)

The server has a server-side SSH service always running and listening on a specific TCP port (22).
服务器上有一个服务器端SSH服务，该服务始终运行并监听特定的TCP端口（22）。

If we use our client to connect with the correct credentials or SSH key then we gain access to that server.
如果我们使用客户端以正确的凭证或SSH密钥进行连接，那么我们就可以访问该服务器。

### Adding a bridged network adapter to our system

For us to use this with our current virtual box VM, we need to add a bridged network adapter to our machine.
为了将此功能与我们当前的VirtualBox虚拟机配合使用，我们需要为我们的机器添加一个桥接网络适配器。

Power down your virtual machine, right-click on your machine within Virtual Box and select settings. In the new window then select networking.
关闭您的虚拟机，在Virtual Box中右键单击您的机器并选择设置（settings）。在新窗口中选择网络（networking）。

![](Images/Day18_Linux2.png)

Now power your machine back on and you will now have an IP address on your local machine. You can confirm this with the `IP addr` command.
现在重新打开您的机器电源，您的本地机器上将拥有一个IP地址。您可以使用 `IP addr` 命令来确认这一点。

### Confirming SSH server is running

We know SSH is already configured on our machine as we have been using it with vagrant but we can confirm by running
我们知道SSH已经在我们的机器上配置好了，因为我们一直在配合vagrant使用它，但我们可以通过运行以下命令来确认：

`sudo systemctl status ssh`

![](Images/Day18_Linux3.png)

If your system does not have the SSH server then you can install it by issuing this command `sudo apt install OpenSSH-server`
如果您的系统没有SSH服务器，则可以使用此命令安装它 `sudo apt install OpenSSH-server`

You then want to make sure that our SSH is allowed if the firewall is running. We can do this with `sudo ufw allow ssh` this is not required on our configuration as we automated this with our vagrant provisioning.
然后，如果防火墙正在运行，您需要确保允许我们的SSH连接。我们可以使用 `sudo ufw allow ssh` 来实现，但这在我们的配置中不是必需的，因为我们通过vagrant配置自动化了这一点。

### Remote Access - SSH Password

Now that we have our SSH Server listening out on port 22 for any incoming connection requests and we have added the bridged networking we could use putty or an SSH client on our local machine to connect to our system using SSH.
现在我们的SSH服务器正在端口22上侦听任何传入的连接请求，并且我们已经添加了桥接网络，我们可以使用本地机器上的Putty或SSH客户端通过SSH连接到我们的系统。

[# PuTTy installation Guide](https://www.cuit.columbia.edu/putty).
[# PuTTy 安装指南](https://www.cuit.columbia.edu/putty)。

![](Images/Day18_Linux4.png)

Then hit open, if this is the first time you have connected to this system via this IP address you will get this warning. We know that this is our system so you can choose yes.
然后点击打开（open），如果这是您第一次通过此IP地址连接到此系统，您将收到此警告。我们知道这是我们自己的系统，所以您可以选择是（yes）。

![](Images/Day18_Linux5.png)

We are then prompted for our username (vagrant) and password (default password - vagrant) Below you will see we are now using our SSH client (Putty) to connect to our machine using username and password.
然后系统会提示我们输入用户名（vagrant）和密码（默认密码 - vagrant）。您将在下方看到我们现在正在使用我们的SSH客户端（Putty）通过用户名和密码连接到我们的机器。

![](Images/Day18_Linux6.png)

At this stage, we are connected to our VM from our remote client and we can issue our commands on our system.
在此阶段，我们已从远程客户端连接到我们的虚拟机，并且可以在系统上执行命令。

### Remote Access - SSH Key

The above is an easy way to gain access to your systems however it still relies on username and password, if some malicious actor was to gain access to this information plus the public address or IP of your system then it could be easily compromised. This is where SSH keys are preferred.
上述是一种访问系统的简单方法，但它仍然依赖于用户名和密码。如果某个恶意行为者获得了此信息以及您系统的公共地址或IP，那么系统很容易受到威胁。这就是为什么首选SSH密钥的原因。

SSH Keys means that we provide a key pair so that both the client and server know that this is a trusted device.
SSH密钥意味着我们提供了一对密钥，以便客户端和服务器都知道这是一个受信任的设备。

Creating a key is easy. On our local machine (Windows) We can issue the following command in fact if you have an ssh-client installed on any system I believe this same command will work?
创建密钥很容易。在我们的本地机器（Windows）上，我们可以执行以下命令。事实上，如果您在任何系统上安装了ssh客户端，我相信这个相同的命令也会起作用？

`ssh-keygen -t ed25519`

I am not going to get into what `ed25519` is and means here but you can have a search if you want to learn more about [cryptography](https://en.wikipedia.org/wiki/EdDSA#Ed25519)
我不会在这里深入探讨 `ed25519` 是什么以及它的含义，但如果您想了解更多关于[加密学](https://en.wikipedia.org/wiki/EdDSA#Ed25519)的知识，可以自行搜索。

![](Images/Day18_Linux7.png)

At this point, we have our created SSH key stored in `C:\Users\micha/.ssh/`
至此，我们已将创建的SSH密钥存储在 `C:\Users\micha/.ssh/` 中。

But to link this with our Linux VM we need to copy the key. We can do this by using the `ssh-copy-id vagrant@192.168.169.135`
但是要将此密钥与我们的Linux虚拟机关联起来，我们需要复制该密钥。我们可以使用 `ssh-copy-id vagrant@192.168.169.135` 来完成此操作。

I used Powershell to create my keys on my Windows client but there is no `ssh-copy-id` available here. There are ways in which you can do this on Windows and a small search online will find you an alternative, but I will just use git bash on my Windows machine to make the copy.
我在Windows客户端上使用Powershell创建了我的密钥，但这里没有可用的 `ssh-copy-id`。您可以通过在Windows上执行此操作的方式，在网上搜索一下就能找到替代方法，但我将使用Windows机器上的git bash进行复制。

![](Images/Day18_Linux8.png)

We can now go back to Powershell to test that our connection now works with our SSH Keys and no password is required.
现在我们可以回到Powershell来测试我们的连接是否通过SSH密钥工作，并且不再需要密码。

`ssh vagrant@192.168.169.135`

![](Images/Day18_Linux9.png)

We could secure this further if needed by using a passphrase. We could also go one step further saying that no passwords at all meaning only key pairs over SSH would be allowed. You can make this happen in the following configuration file.
如果需要，我们可以通过使用密码短语来进一步保护它。我们还可以更进一步，完全不允许密码登录，这意味着只允许通过SSH密钥对进行连接。您可以在以下配置文件中实现此目的。

`sudo nano /etc/ssh/sshd_config`

there is a line in here with `PasswordAuthentication yes` this will be `#` commented out, you should uncomment and change the yes to no. You will then need to reload the SSH service with `sudo systemctl reload sshd`
其中有一行包含 `PasswordAuthentication yes`，它会被 `#` 注释掉，您应该取消注释并将其中的 yes 更改为 no。然后，您需要使用 `sudo systemctl reload sshd` 重新加载SSH服务。

## Setting up a Web Server

Not specifically related to what we have just done with SSH above but I wanted to include this as this is again another task that you might find a little daunting but it really should not be.
这与我们刚刚完成的SSH操作没有直接关系，但我想把它包括在内，因为这又是您可能会觉得有点令人生畏的一项任务，但实际上它不应该如此。

We have our Linux playground VM and at this stage, we want to add an apache webserver to our VM so that we can host a simple website from it that serves my home network. Note that this web page will not be accessible from the internet, this can be done but it will not be covered here.
我们有我们的Linux实验环境虚拟机，在这个阶段，我们想在虚拟机中添加一个Apache Web服务器，以便我们可以从中托管一个简单的网站来服务我的家庭网络。请注意，此网页无法从互联网访问，虽然可以实现，但本文不会涉及。

You might also see this referred to as a LAMP stack.
您可能还会看到这被称为LAMP堆栈。

- **L**inux Operating System
- **L**inux 操作系统
- **A**pache Web Server
- **A**pache Web 服务器
- **m**ySQL database
- **m**ySQL 数据库
- **P**HP
- **P**HP

### Apache2

Apache2 is an open-source HTTP server. We can install apache2 with the following command.
Apache2是一个开源的HTTP服务器。我们可以使用以下命令安装apache2。

`sudo apt-get install apache2`

To confirm that apache2 is installed correctly we can run `sudo service apache2 restart`
为了确认apache2已正确安装，我们可以运行 `sudo service apache2 restart`

Then using the bridged network address from the SSH walkthrough open a browser and go to that address. Mine was `http://192.168.169.135/`
然后使用SSH演练中的桥接网络地址，打开浏览器并访问该地址。我的地址是 `http://192.168.169.135/`

![](Images/Day18_Linux10.png)

### mySQL

MySQL is a database in which we will be storing our data for our simple website. To get MySQL installed we should use the following command `sudo apt-get install mysql-server`
MySQL是一个数据库，我们将在其中存储我们简单网站的数据。要安装MySQL，我们应该使用以下命令 `sudo apt-get install mysql-server`

### PHP

PHP is a server-side scripting language, we will use this to interact with a MySQL database. The final installation is to get PHP and dependencies installed using `sudo apt-get install php libapache2-mod-php php-mysql`
PHP是一种服务器端脚本语言，我们将使用它来与MySQL数据库进行交互。最后的安装是使用以下命令安装PHP及其依赖项 `sudo apt-get install php libapache2-mod-php php-mysql`

The first configuration change we want to make out of the box apache is using index.html and we want it to use index.php instead.
我们想做的第一个配置更改是：默认情况下Apache使用的是 index.html，我们希望它改用 index.php。

We are going to use `sudo nano /etc/apache2/mods-enabled/dir.conf` and we are going to move index.php to the first item in the list.
我们将使用 `sudo nano /etc/apache2/mods-enabled/dir.conf`，并将 index.php 移动到列表中的第一项。

![](Images/Day18_Linux11.png)

Restart the apache2 service `sudo systemctl restart apache2`
重启apache2服务 `sudo systemctl restart apache2`

Now let's confirm that our system is configured correctly for PHP. Create the following file using this command, this will open a blank file in nano.
现在让我们确认我们的系统已正确配置PHP。使用此命令创建以下文件，这将在nano中打开一个空白文件。

`sudo nano /var/www/html/90Days.php`

then copy the following and use control + x to exit and save your file.
然后复制以下内容，并使用 control + x 退出并保存您的文件。

```
<?php
phpinfo();
?>
```

Now navigate to your Linux VM IP again with the additional 90Days.php on the end of the URL. `http://192.168.169.135/90Days.php` you should see something similar to the below if PHP is configured correctly.
现在再次导航到您的Linux VM IP，并在URL末尾添加 90Days.php。如果PHP配置正确，您应该会看到类似于以下内容的页面 `http://192.168.169.135/90Days.php`

![](Images/Day18_Linux12.png)

### WordPress Installation

I then walked through this tutorial to get WordPress up on our LAMP stack, some commands are shown below if not shown correctly in the walkthrough [How to install WordPress on Ubuntu with LAMP](https://blog.ssdnodes.com/blog/how-to-install-wordpress-on-ubuntu-18-04-with-lamp-tutorial/)
接着我按照这个教程在我们的LAMP堆栈上安装了WordPress，如果演练中未正确显示，下面会展示一些命令 [如何在Ubuntu上使用LAMP安装WordPress](https://blog.ssdnodes.com/blog/how-to-install-wordpress-on-ubuntu-18-04-with-lamp-tutorial/)

```
sudo mysql -u root -p

CREATE DATABASE wordpressdb;

CREATE USER 'admin-user'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON wordpressdb.* TO 'admin-user'@'localhost';

FLUSH PRIVILEGES;

EXIT;

sudo apt install php-curl php-gd php-mbstring php-xml php-xmlrpc php-soap php-intl php-zip

sudo systemctl restart apache2

cd /var/www

sudo curl -O https://wordpress.org/latest.tar.gz

sudo tar -xvf latest.tar.gz

sudo rm latest.tar.gz
```

At this point you are in Step 4 in the linked article, you will need to follow the steps to make sure all correct permissions are in place for the WordPress directory.
至此，您已到达链接文章中的第4步，您需要按照步骤确保WordPress目录的所有权限都设置正确。

Because this is internal only you do not need to "generate security keys" in this step. Move to Step 5 which is changing the Apache configuration to WordPress.
因为这只是内部使用，您不需要在此步骤中“生成安全密钥”。请移至第5步，即更改Apache配置以适应WordPress。

Then providing everything is configured correctly you will be able to access via your internal network address and run through the WordPress installation.
然后，如果所有内容都配置正确，您将能够通过内部网络地址进行访问并完成WordPress安装过程。

## Resources

- [Client SSH GUI - Remmina](https://remmina.org/)
- [SSH 客户端 GUI - Remmina](https://remmina.org/)
- [The Beginner's guide to SSH](https://www.youtube.com/watch?v=2QXkrLVsRmk)
- [SSH 初学者指南](https://www.youtube.com/watch?v=2QXkrLVsRmk)
- [Vim in 100 Seconds](https://www.youtube.com/watch?v=-txKSRn0qeA)
- [100秒学会Vim](https://www.youtube.com/watch?v=-txKSRn0qeA)
- [Vim tutorial](https://www.youtube.com/watch?v=IiwGbcd8S7I)
- [Vim 教程](https://www.youtube.com/watch?v=IiwGbcd8S7I)
- [Learn the Linux Fundamentals - Part 1](https://www.youtube.com/watch?v=kPylihJRG70)
- [学习Linux基础知识 - 第1部分](https://www.youtube.com/watch?v=kPylihJRG70)
- [Linux for hackers (don't worry you don't need to be a hacker!)](https://www.youtube.com/watch?v=VbEx7B_PTOE)
- [面向黑客的Linux（别担心，您不需要成为黑客！）](https://www.youtube.com/watch?v=VbEx7B_PTOE)

See you on [Day19](day19.md)
第19天见 [Day19](day19.md)
