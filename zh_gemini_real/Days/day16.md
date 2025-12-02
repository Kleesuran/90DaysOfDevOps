```markdown
---
title: '#90DaysOfDevOps - Managing your Linux System, Filesystem & Storage - Day 16'
published: false
description: '90DaysOfDevOps - Managing your Linux System, Filesystem & Storage'
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048702
---

## Managing your Linux System, Filesystem & Storage

So far we have had a brief overview of Linux and DevOps and then we got our lab environment set up using Vagrant [(Day 14)](day14.md), we then touched on a small portion of commands that will be in your daily toolkit when in the terminal and getting things done [(Day 15)](day15.md).
到目前为止，我们简要概述了 Linux 和 DevOps，然后使用 Vagrant 设置了我们的实验环境 [(Day 14)](day14.md)，接着我们接触了终端日常工具包中的一小部分命令，用于完成各种任务 [(Day 15)](day15.md)。

Here we are going to look into three key areas of looking after your Linux systems with updates, installing software, understanding what system folders are used for and we will also take a look at storage.
在这里，我们将研究维护 Linux 系统的三个关键领域：更新、安装软件、了解系统文件夹的用途，我们还将探讨存储。

## Managing Ubuntu & Software

The first thing we are going to look at is how we update our operating system. Most of you will be familiar with this process in a Windows OS and macOS, this looks slightly different on a Linux desktop and server.
我们要看的第一个内容是如何更新我们的操作系统。大多数人对 Windows OS 和 macOS 中的更新过程很熟悉，但这在 Linux 桌面和服务器上看起来略有不同。

We are going to be looking at the apt package manager, this is what we are going to use on our Ubuntu VM for updates and software installation.
我们将研究 apt 包管理器，这是我们在 Ubuntu 虚拟机上用于更新和软件安装的工具。

Generally, at least on dev workstations, I run this command to make sure that I have the latest available updates from the central repositories, before any software installation.
通常，至少在开发工作站上，我在安装任何软件之前都会运行此命令，以确保我从中央存储库获取到最新的可用更新。

`sudo apt-get update`

![](Images/Day16_Linux1.png)

Now we have an updated Ubuntu VM with the latest OS updates installed. We now want to get some software installed here.
现在我们有了一个安装了最新操作系统更新的 Ubuntu 虚拟机。我们现在想在这里安装一些软件。

Let's choose `figlet` which is a program that generates text banners.
让我们选择 `figlet`，这是一个生成文本横幅的程序。

If we type `figlet` in our terminal you are going to see that we do not have it installed on our system.
如果我们在终端中输入 `figlet`，你会看到我们的系统上没有安装它。

![](Images/Day16_Linux2.png)

You will see from the above though that it does give us some `apt` install options that we could try. This is because in the default repositories there is a program called figlet. Let's try `sudo apt install figlet`
你会从上面看到它确实给我们提供了一些可以尝试的 `apt` 安装选项。这是因为在默认存储库中有一个名为 figlet 的程序。让我们尝试 `sudo apt install figlet`

![](Images/Day16_Linux3.png)

We can now use our `figlet` app as you can see below.
正如你在下面看到的，我们现在可以使用我们的 `figlet` 应用程序了。

![](Images/Day16_Linux4.png)

If we want to remove that or any of our software installations we can also do that via the `apt` package manager.
如果我们要移除该软件或任何其他已安装的软件，我们也可以通过 `apt` 包管理器来完成。

`sudo apt remove figlet`

![](Images/Day16_Linux5.png)

There are third party repositories that we can also add to our system, the ones we have access to out of the box are the Ubuntu default repositories.
我们还可以将第三方存储库添加到我们的系统中，我们开箱即可访问的是 Ubuntu 默认存储库。

If for example, we wanted to install vagrant on our Ubuntu VM we would not be able to right now and you can see this below on the first command issued. We then add the key to trust the HashiCorp repository, then add the repository to our system.
例如，如果我们要安装 vagrant 到我们的 Ubuntu 虚拟机上，我们现在还无法做到，你可以在下面发出的第一个命令中看到这一点。然后我们添加密钥以信任 HashiCorp 存储库，然后将该存储库添加到我们的系统。

![](Images/Day16_Linux6.png)

Once we have the HashiCorp repository added we can go ahead and run `sudo apt install vagrant` and get vagrant installed on our system.
一旦添加了 HashiCorp 存储库，我们就可以继续运行 `sudo apt install vagrant` 并将 vagrant 安装到我们的系统上。

![](Images/Day16_Linux7.png)

There are so many options when it comes to software installation, different options for package managers, built into Ubuntu we could also use snaps for our software installations.
在软件安装方面有很多选项，有不同的包管理器选项，在 Ubuntu 中我们还可以使用 snaps 进行软件安装。

Hopefully, this gives you a feel about how to manage your OS and software installations on Linux.
希望这能让你了解如何在 Linux 上管理操作系统和软件安装。

## File System Explained

Linux is made up of configuration files, if you want to change anything then you change these configuration files.
Linux 由配置文件组成，如果你想更改任何内容，就需要更改这些配置文件。

On Windows, you have C: drive and that is what we consider the root. On Linux we have `/` this is where we are going to find the important folders on our Linux system.
在 Windows 上，你有 C: 驱动器，我们将其视为根目录。在 Linux 上，我们有 `/`，这是我们在 Linux 系统上找到重要文件夹的位置。

![](Images/Day16_Linux8.png)

- `/bin` - Short for binary, the bin folder is where our binaries that your system needs, executables and tools will mostly be found here.
- `/bin` - binary 的缩写，bin 文件夹是存放系统所需的二进制文件、可执行文件和工具的地方。

![](Images/Day16_Linux9.png)

- `/boot` - All the files your system needs to boot up. How to boot up, and what drive to boot from.
- `/boot` - 系统启动所需的所有文件。如何启动以及从哪个驱动器启动。

![](Images/Day16_Linux10.png)

- `/dev` - You can find device information here, this is where you will find pointers to your disk drives `sda` will be your main OS disk.
- `/dev` - 你可以在这里找到设备信息，这里是指向你的磁盘驱动器的指针，`sda` 将是你的主操作系统磁盘。

![](Images/Day16_Linux11.png)

- `/etc` Likely the most important folder on your Linux system, this is where the majority of your configuration files are.
- `/etc` 可能是你的 Linux 系统上最重要的文件夹，大多数配置文件都位于此处。

![](Images/Day16_Linux12.png)

- `/home` - this is where you will find your user folders and files. We have our vagrant user folder. This is where you will find your `Documents` and `Desktop` folders that we worked in for the commands section.
- `/home` - 在这里你会找到你的用户文件夹和文件。我们有我们的 vagrant 用户文件夹。你会在命令部分中操作过的 `Documents` 和 `Desktop` 文件夹。

![](Images/Day16_Linux13.png)

- `/lib` - We mentioned that `/bin` is where our binaries and executables live, and `/lib` is where you will find the shared libraries for those.
- `/lib` - 我们提到 `/bin` 是存放二进制文件和可执行文件的地方，而 `/lib` 是你找到这些文件所需的共享库的地方。

![](Images/Day16_Linux14.png)

- `/media` - This is where we will find removable devices.
- `/media` - 我们可以在这里找到可移动设备。

![](Images/Day16_Linux15.png)

- `/mnt` - This is a temporary mount point. We will cover more here in the next storage section.
- `/mnt` - 这是一个临时的挂载点。我们将在下一个存储部分介绍更多相关内容。

![](Images/Day16_Linux16.png)

- `/opt` - Optional software packages. You will notice here that we have some vagrant and virtual box software stored here.
- `/opt` - 可选的软件包。你会注意到这里存储了一些 vagrant 和 virtual box 软件。

![](Images/Day16_Linux17.png)

- `/proc` - Kernel & process information, similar to `/dev`
- `/proc` - 内核和进程信息，类似于 `/dev`

![](Images/Day16_Linux18.png)

- `/root` - To gain access you will need to sudo into this folder. The home folder for root.
- `/root` - 要访问此文件夹，你需要使用 sudo 进入。这是 root 用户的家目录。

![](Images/Day16_Linux19.png)

- `/run` -Placeholder for application states.
- `/run` - 应用程序状态的占位符。

![](Images/Day16_Linux20.png)

- `/sbin` - Sudo bin, similar to the bin folder but these tools are intended for elevated superuser privileges on the system.
- `/sbin` - Sudo bin，类似于 bin 文件夹，但这些工具旨在用于系统上的超级用户权限（更高权限）。

![](Images/Day16_Linux21.png)

- `/tmp` - temporary files.
- `/tmp` - 临时文件。

![](Images/Day16_Linux22.png)

- `/usr` - If we as a standard user have installed software packages it would generally be installed in the `/usr/bin` location.
- `/usr` - 如果我们作为标准用户安装了软件包，它通常会安装在 `/usr/bin` 位置。

![](Images/Day16_Linux23.png)

- `/var` - Our applications get installed in a `bin` folder. We need somewhere to store all of the log files this is `/var`
- `/var` - 我们的应用程序安装在 `bin` 文件夹中。我们需要一个地方来存储所有日志文件，这就是 `/var`。

![](Images/Day16_Linux24.png)

## Storage

When we come to a Linux system or any system we might want to know the available disks and how much free space we have on those disks. The next few commands will help us identify and use and manage storage.
当我们接触 Linux 系统或任何系统时，我们可能想知道可用的磁盘以及这些磁盘上有多少可用空间。接下来的几个命令将帮助我们识别、使用和管理存储。

- `lsblk` List Block devices. `sda` is our physical disk and then `sda1, sda2, sda3` are our partitions on that disk.
- `lsblk` 列出块设备。`sda` 是我们的物理磁盘，然后 `sda1, sda2, sda3` 是该磁盘上的分区。

![](Images/Day16_Linux25.png)

- `df` gives us a little more detail about those partitions, total, used and available. You can parse other flags here I generally use `df -h` to give us a human output of the data.
- `df` 提供了关于这些分区的更多详细信息：总空间、已用空间和可用空间。你可以在这里解析其他标志，我通常使用 `df -h` 来给出人类可读的输出数据。

![](Images/Day16_Linux26.png)

If you were adding a new disk to your system and this is the same in Windows you would need to format the disk in disk management, in the Linux terminal you can do this by using the `sudo mkfs -t ext4 /dev/sdb` with sdb relating to our newly added disk.
如果你要向系统添加新磁盘，这与 Windows 中的情况相同，你需要在磁盘管理中格式化磁盘；在 Linux 终端中，你可以使用 `sudo mkfs -t ext4 /dev/sdb` 来执行此操作，其中 sdb 指代我们新添加的磁盘。

We would then need to mount our newly formatted disk so that it was useable. We would do this in our `/mnt` folder previously mentioned and we would create a directory there with `sudo mkdir NewDisk` we would then use `sudo mount /dev/sdb newdisk` to mount the disk to that location.
然后我们需要挂载新格式化的磁盘，使其可用。我们会在前面提到的 `/mnt` 文件夹中执行此操作，并使用 `sudo mkdir NewDisk` 在其中创建一个目录，然后我们使用 `sudo mount /dev/sdb newdisk` 将磁盘挂载到该位置。

It is also possible that you will need to unmount storage from your system safely vs just pulling it from the configuration. We can do this with `sudo umount /dev/sdb`
你可能还需要安全地从系统中卸载存储，而不仅仅是从配置中删除它。我们可以使用 `sudo umount /dev/sdb` 来执行此操作。

If you did not want to unmount that disk and you were going to be using this disk for a database or some other persistent use case then you want it to be there when you reboot your system. For this to happen we need to add this disk to our `/etc/fstab` configuration file for it to persist, if you don't it won't be useable when the machine reboots and you would manually have to go through the above process. The data will still be there on the disk but it won't automount unless you add the configuration to this file.
如果你不想卸载该磁盘，并且打算将此磁盘用于数据库或其他持久性用例，那么你希望在系统重启时它仍然存在。为此，我们需要将此磁盘添加到我们的 `/etc/fstab` 配置文件中以使其持久化，如果你不这样做，则机器重启时它将无法使用，你将不得不手动执行上述过程。数据仍然在磁盘上，但除非你将配置添加到此文件，否则它不会自动挂载。

Once you have edited the `fstab` configuration file you can check your workings with `sudo mount -a` if no errors then your changes will now be persistent across restarts.
编辑完 `fstab` 配置文件后，你可以使用 `sudo mount -a` 检查你的操作，如果没有错误，那么你的更改现在将在重启后持续生效。

We will cover how you would edit a file using a text editor in a future session.
我们将在未来的课程中介绍如何使用文本编辑器编辑文件。

## Resources

- [Learn the Linux Fundamentals - Part 1](https://www.youtube.com/watch?v=kPylihJRG70)
- [Linux for hackers (don't worry you don't need to be a hacker!)](https://www.youtube.com/watch?v=VbEx7B_PTOE)

See you on [Day17](day17.md)
我们将在 [Day17](day17.md) 再见
```