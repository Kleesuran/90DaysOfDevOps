---
title: '#90DaysOfDevOps - Linux Commands for DevOps (Actually everyone) - Day 15'
published: false
description: 90DaysOfDevOps - Linux Commands for DevOps (Actually everyone)
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048834
---

## Linux Commands for DevOps (Actually everyone)

I mentioned [yesterday](day14.md) that we are going to be spending a lot of time in the terminal with some commands to get stuff done.
我[昨天](day14.md)提到，我们将花费大量时间在终端中使用一些命令来完成任务。

I also mentioned that with our vagrant provisioned VM we can use `vagrant ssh` and gain access to our box. You will need to be in the same directory as we provisioned it from.
我也提到，对于我们通过 vagrant 预置的虚拟机，我们可以使用 `vagrant ssh` 并访问我们的盒子。您需要处于我们预置它时所在的目录中。

For SSH you won't need the username and password, you will only need that if you decide to log in to the Virtual Box console.
对于 SSH 连接，您不需要用户名和密码，只有当您决定登录 Virtual Box 控制台时才需要。

This is where we want to be as per below:
如下图所示，这就是我们希望达到的状态：

![](Images/Day15_Linux1.png)

## Commands

I cannot cover all the commands here, there are pages and pages of documentation that cover these but also if you are ever in your terminal and you just need to understand options to a specific command we have the `man` pages short for manual. We can use this to go through each of the commands we touch on during this post to find out more options for each one. We can run `man man` which will give you the help for manual pages. To escape the man pages you should press `q` for quit.
我无法在此处涵盖所有命令，有大量的文档来介绍这些命令，但如果您在终端中需要了解某个特定命令的选项，我们有 `man` 页面（manual 的缩写，即手册）。我们可以用它来查阅本文中提到的每个命令，以了解更多选项。我们可以运行 `man man`，这将提供手册页面的帮助。要退出 man 页面，您应该按 `q` 键退出。

![](Images/Day15_Linux2.png)
![](Images/Day15_Linux3.png)

`sudo` If you are familiar with Windows and the right click `run as administrator` we can think of `sudo` as very much this. When you run a command with this command you will be running it as `root` it will prompt you for the password before running the command.
`sudo` 如果您熟悉 Windows 上的右键单击“以管理员身份运行”，那么您可以把 `sudo` 看作是类似的。当您使用此命令运行指令时，您将以 `root` 用户身份运行它，并在运行该命令之前提示您输入密码。

![](Images/Day15_Linux4.png)

For one off jobs like installing applications or services, you might need that `sudo command` but what if you have several tasks to deal with and you want to live as `sudo` for a while? This is where you can use `sudo su` again the same as `sudo` once entered you will be prompted for your `root` password. In a test VM like ours, this is fine but I would find it very hard for us to be rolling around as `root` for prolonged periods, bad things can happen. To get out of this elevated position you simply type in `exit`
对于安装应用程序或服务等一次性任务，您可能只需要 `sudo command`，但是如果您有几个任务需要处理，并且希望暂时保持 `sudo` 状态呢？这时您可以使用 `sudo su`，与 `sudo` 类似，一旦输入，系统将提示您输入 `root` 密码。在像我们这样的测试虚拟机中，这样做没问题，但我认为长时间以 `root` 身份操作是非常危险的，可能会发生不好的事情。要退出这种提升的权限状态，您只需输入 `exit`。

![](Images/Day15_Linux5.png)

I find myself using `clear` all the time, the `clear` command does exactly what it says it is going to clear the screen of all previous commands, putting your prompt to the top and giving you a nice clean workspace. Windows I think is `cls` in the .mdprompt.
我发现自己一直在使用 `clear` 命令，`clear` 命令的作用正如其名：清除屏幕上的所有先前命令，将您的提示符放到顶部，为您提供一个干净的工作空间。Windows 在命令提示符中对应的命令我认为是 `cls`。

![](Images/Day15_Linux6.png)

Let's now look at some commands where we can actually create things within our system and then visualise them in our terminal, first of all, we have `mkdir` which will allow us to create a folder in our system. With the following command, we can create a folder in our home directory called Day15 `mkdir Day15`
现在让我们看看一些命令，通过它们我们可以在系统中创建东西，并在终端中查看它们。首先是 `mkdir`，它允许我们在系统中创建一个文件夹。使用以下命令，我们可以在主目录中创建一个名为 Day15 的文件夹：`mkdir Day15`

![](Images/Day15_Linux7.png)

With `cd` this allows us to change the directory, so for us to move into our newly created directory we can do this with `cd Day15` tab can also be used to autocomplete the directory available. If we want to get back to where we started we can use `cd ..`
`cd` 允许我们更改目录，因此要进入我们新创建的目录，我们可以使用 `cd Day15`。Tab 键也可用于自动补全可用的目录。如果我们想回到起始位置，可以使用 `cd ..`。

![](Images/Day15_Linux8.png)

`rmdir` allows for us to remove the directory, if we run `rmdir Day15` then the folder will be removed (note that this will only work if you have nothing in the folder)
`rmdir` 允许我们删除目录，如果我们运行 `rmdir Day15`，那么该文件夹将被删除（请注意，这仅在文件夹中没有内容时才有效）。

![](Images/Day15_Linux9.png)

I am sure we have all done it where we have navigated to the depths of our file system to a directory and not known where we are. `pwd` gives us the printout of the working directory, pwd as much as it looks like password it stands for print working directory.
我相信我们都曾遇到过这种情况：导航到文件系统的深层目录，却不知道自己身在何处。`pwd` 会打印出当前工作目录，`pwd` 看起来像 password（密码），但它代表 print working directory（打印工作目录）。

![](Images/Day15_Linux10.png)

We know how to create folders and directories but how do we create files? We can create files using the `touch` command if we were to run `touch Day15` this would create a file. Ignore `mkdir` we are going to see this again later.
我们知道如何创建文件夹和目录，但是如何创建文件呢？我们可以使用 `touch` 命令创建文件，如果我们运行 `touch Day15`，这将创建一个文件。忽略 `mkdir`，我们稍后会再次看到它。

![](Images/Day15_Linux11.png)

`ls` I can put my house on this, you will use this command so many times, this is going to list all the files and folders in the current directory. Let's see if we can see that file we just created.
`ls` 我敢肯定，您会无数次使用这个命令，它将列出当前目录中的所有文件和文件夹。让我们看看是否能看到我们刚刚创建的文件。

![](Images/Day15_Linux12.png)

How can we find files on our Linux system? `locate` is going to allow us to search our file system. If we use `locate Day15` it will report back the location of the file. The bonus round is that if you know that the file does exist but you get a blank result then run `sudo updatedb` which will index all the files in the file system then run your `locate` again. If you do not have `locate` available to you, you can install it using this command `sudo apt install mlocate`
我们如何在 Linux 系统上查找文件？`locate` 命令允许我们搜索文件系统。如果我们使用 `locate Day15`，它将报告文件的位置。附带提示：如果您确定文件存在但得到空白结果，请运行 `sudo updatedb`，它将索引文件系统中的所有文件，然后再次运行您的 `locate` 命令。如果您没有 `locate`，可以使用此命令安装它：`sudo apt install mlocate`。

![](Images/Day15_Linux13.png)

What about moving files from one location to another? `mv` is going to allow you to move your files. Example `mv Day15 90DaysOfDevOps` will move your file to the 90DaysOfDevOps folder.
如何将文件从一个位置移动到另一个位置？`mv` 命令将允许您移动文件。例如，`mv Day15 90DaysOfDevOps` 会将您的文件移动到 90DaysOfDevOps 文件夹。

![](Images/Day15_Linux14.png)

We have moved our file but what if we want to rename it now to something else? We can do that using the `mv` command again... WOT!!!? yep we can simply use `mv Day15 day15` to change to upper case or we could use `mv day15 AnotherDay` to change it altogether, now use `ls` to check the file.
我们已经移动了文件，但如果现在我们想把它重命名为其他名字呢？我们可以再次使用 `mv` 命令... 啥？是的，我们可以简单地使用 `mv Day15 day15` 来更改大小写，或者我们可以使用 `mv day15 AnotherDay` 来完全更改名称，现在使用 `ls` 来检查文件。

![](Images/Day15_Linux15.png)

Enough is enough, let's now get rid (delete)of our file and maybe even our directory if we have one created. `rm` simply `rm AnotherDay` will remove our file. We will also use quite a bit `rm -R` which will recursively work through a folder or location. We might also use `rm -R -f` to force the removal of all of those files. Spoiler if you run `rm -R -f /` add sudo to it and you can say goodbye to your system....!
够了，现在让我们删除（delete）我们的文件，如果创建了目录，也可能删除它。`rm` 命令，简单地运行 `rm AnotherDay` 就会删除我们的文件。我们还会经常使用 `rm -R`，它会递归地处理文件夹或位置。我们也可能使用 `rm -R -f` 来强制删除所有这些文件。剧透一下，如果您运行 `rm -R -f /` 并加上 sudo，您就可以和您的系统说再见了....！

![](Images/Day15_Linux16.png)

We have looked at moving files around but what if I just want to copy files from one folder to another, simply put its very similar to the `mv` command but we use `cp` so we can now say `cp Day15 Desktop`
我们已经看了如何移动文件，但如果我只是想将文件从一个文件夹复制到另一个文件夹呢？简单来说，它与 `mv` 命令非常相似，但我们使用 `cp`，所以现在我们可以执行 `cp Day15 Desktop`。

![](Images/Day15_Linux17.png)

We have created folders and files but we haven't put any contents into our folder, we can add contents a few ways but an easy way is `echo` we can also use `echo` to print out a lot of things in our terminal, I use echo a lot to print out system variables to know if they are set or not at least. we can use `echo "Hello #90DaysOfDevOps" > Day15` and this will add this to our file. We can also append to our file using `echo "Commands are fun!" >> Day15`
我们创建了文件夹和文件，但没有在文件里放入任何内容。我们可以通过几种方式添加内容，但一个简单的方法是 `echo`。我们也可以使用 `echo` 在终端中打印出很多东西，我经常使用 `echo` 来打印系统变量，至少可以知道它们是否已设置。我们可以使用 `echo "Hello #90DaysOfDevOps" > Day15`，这会将内容添加到我们的文件中。我们也可以使用 `echo "Commands are fun!" >> Day15` 来追加内容到文件中。

![](Images/Day15_Linux18.png)

Another one of those commands you will use a lot! `cat` short for concatenate. We can use `cat Day15` to see the contents inside the file. Great for quickly reading those configuration files.
这是另一个您会经常使用的命令！`cat` 是 concatenate（连接）的缩写。我们可以使用 `cat Day15` 来查看文件中的内容。这对快速阅读配置文件非常有用。

![](Images/Day15_Linux19.png)

If you have a long complex configuration file and you want or need to find something fast in that file vs reading every line then `grep` is your friend, this will allow us to search your file for a specific word using `cat Day15 | grep "#90DaysOfDevOps"`
如果您有一个很长且复杂的配置文件，并且您想或需要快速在该文件中查找某些内容，而不是逐行阅读，那么 `grep` 就是您的朋友，它允许我们使用 `cat Day15 | grep "#90DaysOfDevOps"` 来搜索文件中的特定单词。

![](Images/Day15_Linux20.png)

If you are like me and you use that `clear` command a lot then you might miss some of the commands previously ran, we can use `history` to find out all those commands we have run prior. `history -c` will remove the history.
如果您像我一样经常使用 `clear` 命令，那么您可能会错过一些先前运行的命令，我们可以使用 `history` 来查找所有我们以前运行过的命令。`history -c` 将清除历史记录。

When you run `history` and you would like to pick a specific command you can use `!3` to choose the 3rd command in the list.
当您运行 `history` 并希望选择特定的命令时，您可以使用 `!3` 来选择列表中的第 3 个命令。

You are also able to use `history | grep "Command"` to search for something specific.
您也可以使用 `history | grep "Command"` 来搜索特定的内容。

On servers to trace back when was a command executed, it can be useful to append the date and time to each command in the history file.
在服务器上，为了追溯命令的执行时间，将日期和时间附加到历史记录文件中的每个命令上会很有用。

The following system variable controls this behaviour:
以下系统变量控制此行为：

```
HISTTIMEFORMAT="%d-%m-%Y %T "
```

You can easily add to your bash_profile:
您可以轻松地添加到您的 bash_profile 中：

```
echo 'export HISTTIMEFORMAT="%d-%m-%Y %T "' >> ~/.bash_profile
```

So as useful to allow the history file to grow bigger:
同样有用的是允许历史记录文件增长更大：

```
echo 'export HISTSIZE=100000' >> ~/.bash_profile
echo 'export HISTFILESIZE=10000000' >> ~/.bash_profile
```

![](Images/Day15_Linux21.png)

Need to change your password? `passwd` is going to allow us to change our password. Note that when you add your password like this when it is hidden it will not be shown in `history` however if your command has `-p PASSWORD` then this will be visible in your `history`.
需要更改密码吗？`passwd` 命令将允许我们更改密码。请注意，当您以隐藏方式输入密码时，它不会显示在 `history` 中，但是如果您的命令包含 `-p PASSWORD`，那么它将在 `history` 中可见。

![](Images/Day15_Linux22.png)

We might also want to add new users to our system, we can do this with `useradd` we have to add the user using our `sudo` command, we can add a new user with `sudo useradd NewUser`
我们可能还想向系统中添加新用户，我们可以使用 `useradd` 来实现。我们必须使用 `sudo` 命令来添加用户，我们可以使用 `sudo useradd NewUser` 来添加一个新用户。

![](Images/Day15_Linux23.png)

Creating a group again requires `sudo` and we can use `sudo groupadd DevOps` then if we want to add our new user to that group we can do this by running `sudo usermod -a -G DevOps` `-a` is add and `-G` is group name.
创建群组同样需要 `sudo`，我们可以使用 `sudo groupadd DevOps`。然后，如果我们想将新用户添加到该群组，我们可以运行 `sudo usermod -a -G DevOps`，其中 `-a` 表示添加，`-G` 表示群组名称。

![](Images/Day15_Linux24.png)

How do we add users to the `sudo` group, this would be a very rare occasion for this to happen but to do this it would be `usermod -a -G sudo NewUser`
我们如何将用户添加到 `sudo` 群组？这种情况非常罕见，但要实现这一点，命令是 `usermod -a -G sudo NewUser`。

### Permissions

read, write and execute are the permissions we have on all of our files and folders on our Linux system.
读取（read）、写入（write）和执行（execute）是我们 Linux 系统上所有文件和文件夹所拥有的权限。

A full list:
完整列表：

- 0 = None `---`
- 0 = 无 `---`
- 1 = Execute only `--X`
- 1 = 仅执行 `--X`
- 2 = Write only `-W-`
- 2 = 仅写入 `-W-`
- 3 = Write & Execute `-WX`
- 3 = 写入与执行 `-WX`
- 4 = Read Only `R--`
- 4 = 仅读取 `R--`
- 5 = Read & Execute `R-X`
- 5 = 读取与执行 `R-X`
- 6 = Read & Write `RW-`
- 6 = 读取与写入 `RW-`
- 7 = Read, Write & Execute `RWX`
- 7 = 读取、写入与执行 `RWX`

You will also see `777` or `775` and these represent the same numbers as the list above but each one represents **User - Group - Everyone**
您还会看到 `777` 或 `775`，它们代表与上述列表相同的数字，但每个数字分别代表 **用户 (User) - 群组 (Group) - 所有人 (Everyone)**。

Let's take a look at our file. `ls -al Day15` you can see the 3 groups mentioned above, user and group have read & write but everyone only has read.
让我们看看我们的文件。运行 `ls -al Day15`，您可以看到上面提到的 3 个组，用户和群组拥有读取和写入权限，但所有人只有读取权限。

![](Images/Day15_Linux25.png)

We can change this using `chmod` you might find yourself doing this if you are creating binaries a lot on your systems as well and you need to give the ability to execute those binaries. `chmod 750 Day15` now run `ls -al Day15` if you want to run this for a whole folder then you can use `-R` to recursively do that.
我们可以使用 `chmod` 来更改权限，如果您经常在系统上创建二进制文件，并且需要赋予执行这些二进制文件的能力，您可能会发现自己经常这样做。运行 `chmod 750 Day15`，现在再运行 `ls -al Day15`。如果您想对整个文件夹运行此命令，则可以使用 `-R` 进行递归操作。

![](Images/Day15_Linux26.png)

What about changing the owner of the file? We can use `chown` for this operation, if we wanted to change the ownership of our `Day15` from user `vagrant` to `NewUser` we can run `sudo chown NewUser Day15` again `-R` can be used.
那么更改文件的所有者呢？我们可以使用 `chown` 来执行此操作，如果想将 `Day15` 的所有权从用户 `vagrant` 更改为 `NewUser`，我们可以运行 `sudo chown NewUser Day15`。同样，可以使用 `-R`。

![](Images/Day15_Linux27.png)

A command that you will come across is `awk` which comes in real use when you have an output that you only need specific data from. like running `who` we get lines with information, but maybe we only need the names. We can run `who | awk '{print $1}'` to get just a list of that first column.
您会遇到的一个命令是 `awk`，当您的输出中只需要特定数据时，它会非常有用。例如运行 `who`，我们会得到带有信息的行，但也许我们只需要用户名。我们可以运行 `who | awk '{print $1}'` 来只获取第一列的列表。

![](Images/Day15_Linux28.png)

If you are looking to read streams of data from standard input, then generate and execute command lines; meaning it can take the output of a command and passes it as an argument of another command. `xargs` is a useful tool for this use case. If for example, I want a list of all the Linux user accounts on the system I can run. `cut -d: -f1 < /etc/passwd` and get the long list we see below.
如果您想从标准输入中读取数据流，然后生成并执行命令行，这意味着它可以获取一个命令的输出并将其作为另一个命令的参数。`xargs` 是处理此用例的有用工具。例如，如果我想要系统上所有 Linux 用户帐户的列表，我可以运行 `cut -d: -f1 < /etc/passwd` 并得到我们下面看到的很长的列表。

![](Images/Day15_Linux29.png)

If I want to compact that list I can do so by using `xargs` in a command like this `cut -d: -f1 < /etc/passwd | sort | xargs`
如果我想压缩这个列表，我可以使用 `xargs` 结合这样的命令来实现：`cut -d: -f1 < /etc/passwd | sort | xargs`

![](Images/Day15_Linux30.png)

I didn't mention the `cut` command either, this allows us to remove sections from each line of a file. It can be used to cut parts of a line by byte position, character and field. The `cut -d " " -f 2 list.txt` command allows us to remove that first letter we have and just display our numbers. There are so many combinations that can be used here with this command, I am sure I have spent too much time trying to use this command when I could have extracted data quicker manually.
我也没有提到 `cut` 命令，它允许我们从文件的每一行中删除部分内容。它可用于按字节位置、字符和字段来切割行的一部分。`cut -d " " -f 2 list.txt` 命令允许我们移除第一个字母并仅显示数字。这个命令有很多组合用法，我相信我曾花费了太多时间试图使用这个命令，而实际上我本可以手动更快地提取数据。

![](Images/Day15_Linux31.png)

Also to note if you type a command and you are no longer happy with it and you want to start again just hit control + c and this will cancel that line and start you fresh.
另外请注意，如果您输入了一个命令但不再满意，想重新开始，只需按下 Control + C，这将取消该行并让您重新开始。

## Resources

- [Learn the Linux Fundamentals - Part 1](https://www.youtube.com/watch?v=kPylihJRG70)
- [Linux for hackers (don't worry you don't need to be a hacker!)](https://www.youtube.com/watch?v=VbEx7B_PTOE)

See you on [Day16](day16.md)
[Day16](day16.md) 再见

This is a pretty heavy list already but I can safely say that I have used all of these commands in my day to day, be it from an administering Linux servers or on my Linux Desktop, it is very easy when you are in Windows or macOS to navigate the UI but in Linux Servers, they are not there, everything is done through the terminal.
这已经是一个相当庞大的列表了，但我可以肯定地说，我在日常工作中都使用过所有这些命令，无论是管理 Linux 服务器还是在我的 Linux 桌面上。在 Windows 或 macOS 中，您很容易通过用户界面（UI）进行导航，但在 Linux 服务器中，UI 不存在，一切都通过终端完成。