---
title: '#90DaysOfDevOps - Automate tasks with bash scripts - Day 19'
published: false
description: 90DaysOfDevOps - Automate tasks with bash scripts
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048774
---

## Automate tasks with bash scripts

The shell that we are going to use today is the bash but we will cover another shell tomorrow when we dive into ZSH.
我们今天将使用的 shell 是 bash，但明天深入 ZSH 时，我们将介绍另一种 shell。

BASH - **B**ourne **A**gain **Sh**ell
BASH - **B**ourne **A**gain **Sh**ell

We could almost dedicate a whole section of 7 days to shell scripting much like the programming languages, bash gives us the capability of working alongside other automation tools to get things done.
我们几乎可以像编程语言那样，用整整 7 天的时间专门讲解 shell 脚本，bash 使我们能够与其他自动化工具协同工作来完成任务。

I still speak to a lot of people who have set up some complex shell scripts to make something happen and they rely on this script for some of the most important things in the business, I am not saying we need to understand shell/bash scripting for this purpose, this is not the way. But we should learn shell/bash scripting to work alongside our automation tools and for ad-hoc tasks.
我仍然会和很多人交流，他们设置了一些复杂的 shell 脚本来实现某些功能，并且他们依赖这些脚本来处理业务中一些最重要的事情。我并不是说我们必须为此目的去理解 shell/bash 脚本，这不是重点。但是，我们应该学习 shell/bash 脚本，以便与我们的自动化工具配合使用，并用于处理临时任务。

An example of this that we have used in this section could be the VAGRANTFILE we used to create our VM, we could wrap this into a simple bash script that deleted and renewed this every Monday morning so that we have a fresh copy of our Linux VM every week, we could also add all the software stack that we need on said Linux machine and so on all through this one bash script.
我们在此部分中使用的例子可能是我们用来创建虚拟机的 VAGRANTFILE，我们可以将其封装到一个简单的 bash 脚本中，该脚本在每个周一早上删除并重新创建它，这样我们每周都有一个全新的 Linux 虚拟机副本。我们还可以通过这一个 bash 脚本，添加该 Linux 机器上所需的所有软件堆栈等等。

I think another thing I am at least hearing is that hands-on scripting questions are becoming more and more apparent in all lines of interviews.
我认为我听到的另一件事是，在所有类型的面试中，动手脚本编写问题正变得越来越明显。

### Getting started

As with a lot of things we are covering in this whole 90 days, the only real way to learn is through doing. Hands-on experience is going to help soak all of this into your muscle memory.
正如我们在整个 90 天中涵盖的许多内容一样，真正学习的唯一方法就是实践。动手实践经验将有助于把所有这些知识融入你的肌肉记忆中。

First of all, we are going to need a text editor. On [Day 17](day17.md) we covered probably the two most common text editors and a little on how to use them.
首先，我们需要一个文本编辑器。在 [Day 17](day17.md) 中，我们介绍了两种最常见的文本编辑器，并简要介绍了如何使用它们。

Let's get straight into it and create our first shell script.
让我们直接开始创建第一个 shell 脚本。

`touch 90DaysOfDevOps.sh`

Followed by `nano 90DaysOfDevOps.sh` this will open our new blank shell script in nano. Again you can choose your text editor of choice here.
接着是 `nano 90DaysOfDevOps.sh`，这将在 nano 中打开我们新的空白 shell 脚本。同样，你可以在这里选择你喜欢的文本编辑器。

The first line of all bash scripts will need to look something like this `#!/usr/bin/bash` this is the path to your bash binary.
所有 bash 脚本的第一行都需要类似于 `#!/usr/bin/bash`，这是你的 bash 二进制文件的路径。

You should however check this in the terminal by running `which bash` if you are not using Ubuntu then you might also try `whereis bash` from the terminal.
但是，你应该在终端中运行 `which bash` 来检查它，如果你没有使用 Ubuntu，那么你也可以在终端中尝试 `whereis bash`。

However, you may see other paths listed in already created shell scripts which could include:
但是，你可能会在已经创建的 shell 脚本中看到列出的其他路径，其中可能包括：

- `#!/bin/bash`
- `#!/usr/bin/env bash`

In the next line in our script, I like to add a comment and add the purpose of the script or at least some information about me. You can do this by using the `#` This allows us to comment on particular lines in our code and provide descriptions of what the upcoming commands will be doing. I find the more notes the better for the user experience especially if you are sharing this.
在脚本的下一行，我喜欢添加注释，说明脚本的用途，或者至少提供一些关于我的信息。你可以使用 `#` 来实现这一点，这允许我们对代码中的特定行进行注释，并描述接下来的命令将做什么。我发现注释越多，用户体验就越好，尤其是当你分享脚本时。

I sometimes use figlet, a program we installed earlier in the Linux section to create some asci art to kick things off in our scripts.
我有时会使用 figlet（我们在 Linux 部分早期安装的一个程序）来创建一些 ASCII 艺术，以此在我们的脚本中开启功能。

![](Images/Day19_Linux1.png)

All of the commands we have been through earlier in this Linux section ([Day15](day15.md)) could be used here as a simple command to test our script.
我们在此 Linux 部分早期（[Day15](day15.md)）经历过的所有命令都可以在这里用作测试脚本的简单命令。

Let's add a simple block of code to our script.
让我们向脚本中添加一个简单的代码块。

```
mkdir 90DaysOfDevOps
cd 90DaysOfDevOps
touch Day19
ls
```

You can then save this and exit your text editor, if we run our script with `./90DaysOfDevOps.sh` you should get a permission denied message. You can check the permissions of this file using the `ls -al` command and you can see highlighted we do not have executable rights on this file.
然后你可以保存并退出文本编辑器，如果使用 `./90DaysOfDevOps.sh` 运行脚本，你应该会收到“权限被拒绝”的消息。你可以使用 `ls -al` 命令检查此文件的权限，并且可以看到突出显示的部分表明我们对此文件没有可执行权限。

![](Images/Day19_Linux2.png)

We can change this using `chmod +x 90DaysOfDevOps.sh` and then you will see the `x` meaning we can now execute our script.
我们可以使用 `chmod +x 90DaysOfDevOps.sh` 来更改此权限，然后你将看到 `x`，表示我们现在可以执行脚本了。

![](Images/Day19_Linux3.png)

Now we can run our script again using `./90DaysOfDevOps.sh` after running the script has now created a new directory, changed into that directory and then created a new file.
现在我们可以再次使用 `./90DaysOfDevOps.sh` 运行脚本，运行后脚本已创建了一个新目录，并进入该目录，然后创建了一个新文件。

![](Images/Day19_Linux4.png)

Pretty basic stuff but you can start to see hopefully how this could be used to call on other tools as part of ways to make your life easier and automate things.
这是非常基础的东西，但你希望可以看到如何利用它来调用其他工具，作为让你生活更轻松和自动化事物的方式之一。

### Variables, Conditionals

A lot of this section is a repeat of what we covered when we were learning Golang but I think it's worth us diving in here again.
本节很多内容是我们学习 Golang 时涉及过的重复内容，但我认为我们值得再次深入探讨。

- ### Variables

Variables enable us to define once a particular repeated term that is used throughout a potentially complex script.
变量使我们能够对在潜在复杂脚本中重复使用的特定术语进行一次定义。

To add a variable you simply add it like this to a clean line in your script.
要添加变量，你只需像这样将其添加到脚本中的一个新行即可。

`challenge="90DaysOfDevOps"`

This way when and where we use `$challenge` in our code, if we change the variable it will be reflected throughout.
这样，当我们在代码中使用 `$challenge` 时，如果更改变量，它将在整个代码中反映出来。

![](Images/Day19_Linux5.png)

If we now run our `sh` script you will see the printout that was added to our script.
如果我们现在运行我们的 `sh` 脚本，你将看到添加到脚本中的输出。

![](Images/Day19_Linux6.png)

We can also ask for user input that can set our variables using the following:
我们还可以要求用户输入，使用以下方式来设置我们的变量：

```
echo "Enter your name"
read name
```

This would then define the input as the variable `$name` We could then use this later on.
这将把输入定义为变量 `$name`。我们可以在后面使用它。

- ### Conditionals

Maybe we want to find out who we have on our challenge and how many days they have completed, we can define this using `if` `if-else` `else-if` conditionals, this is what we have defined below in our script.
也许我们想知道谁参与了我们的挑战以及他们完成了多少天，我们可以使用 `if`、`if-else`、`else-if` 条件语句来定义，这就是我们在下面脚本中定义的。

```
#!/bin/bash
#  ___   ___  ____                   ___   __ ____              ___
# / _ \ / _ \|  _ \  __ _ _   _ ___ / _ \ / _|  _ \  _____   __/ _ \ _ __  ___
#| (_) | | | | | | |/ _` | | | / __| | | | |_| | | |/ _ \ \ / / | | | '_ \/ __|
# \__, | |_| | |_| | (_| | |_| \__ \ |_| |  _| |_| |  __/\ V /| |_| | |_) \__ \
#   /_/ \___/|____/ \__,_|\__, |___/\___/|_| |____/ \___| \_/  \___/| .__/|___/
#                         |___/                                     |_|
#
# This script is to demonstrate bash scripting!

# Variables to be defined

ChallengeName=#90DaysOfDevOps
TotalDays=90

# User Input

echo "Enter Your Name"
read name
echo "Welcome $name to $ChallengeName"
echo "How Many Days of the $ChallengeName challenge have you completed?"
read DaysCompleted

if [ $DaysCompleted -eq 90 ]
then
  echo "You have finished, well done"
elif [ $DaysCompleted -lt 90 ]
then
  echo "Keep going you are doing great"
else
  echo "You have entered the wrong amount of days"
fi
```

You can also see from the above that we are running some comparisons or checking values against each other to move on to the next stage. We have different options here worth noting.
从上面你还可以看到，我们正在进行一些比较或检查值与值之间关系的操作，以便进入下一个阶段。这里有不同的选项值得注意。

- `eq` - if the two values are equal will return TRUE
- `eq` - 如果两个值相等，则返回 TRUE
- `ne` - if the two values are not equal will return TRUE
- `ne` - 如果两个值不相等，则返回 TRUE
- `gt` - if the first value is greater than the second value will return TRUE
- `gt` - 如果第一个值大于第二个值，则返回 TRUE
- `ge` - if the first value is greater than or equal to the second value will return TRUE
- `ge` - 如果第一个值大于或等于第二个值，则返回 TRUE
- `lt` - if the first value is less than the second value will return TRUE
- `lt` - 如果第一个值小于第二个值，则返回 TRUE
- `le` - if the first value is less than or equal to the second value will return TRUE
- `le` - 如果第一个值小于或等于第二个值，则返回 TRUE

We might also use bash scripting to determine information about files and folders, this is known as file conditions.
我们也可能使用 bash 脚本来确定有关文件和文件夹的信息，这被称为文件条件。

- `-d file` True if the file is a directory
- `-d file` 如果文件是一个目录，则为 True
- `-e file` True if the file exists
- `-e file` 如果文件存在，则为 True
- `-f file` True if the provided string is a file
- `-f file` 如果提供的字符串是一个文件，则为 True
- `-g file` True if the group id is set on a file
- `-g file` 如果文件上设置了组 ID，则为 True
- `-r file` True if the file is readable
- `-r file` 如果文件可读，则为 True
- `-s file` True if the file has a non-zero size
- `-s file` 如果文件大小非零，则为 True

```
FILE="90DaysOfDevOps.txt"
if [ -f "$FILE" ]
then
  echo "$FILE is a file"
else
  echo "$FILE is not a file"
fi
```

![](Images/Day19_Linux7.png)

Providing we have that file still in our directory we should get the first echo command back. But if we remove that file then we should get the second echo command.
如果该文件仍在我们的目录中，我们应该得到第一个 echo 命令的返回。但如果我们删除该文件，那么我们应该得到第二个 echo 命令的返回。

![](Images/Day19_Linux8.png)

You can hopefully see how this can be used to save you time when searching through a system for specific items.
你希望可以看到如何使用它来在你搜索系统中的特定项目时节省时间。

I found this amazing repository on GitHub that has what seems to be an endless amount of scripts [DevOps Bash Tools](https://github.com/HariSekhon/DevOps-Bash-tools/blob/master/README.md)
我在 GitHub 上找到了一个很棒的仓库，里面似乎有数不尽的脚本 [DevOps Bash Tools](https://github.com/HariSekhon/DevOps-Bash-tools/blob/master/README.md)

### Example

**Scenario**: We have our company called "90DaysOfDevOps" and we have been running a while and now it is time to expand the team from 1 person to lots more over the coming weeks, I am the only one so far that knows the onboarding process so we want to reduce that bottleneck by automating some of these tasks.
**场景**：我们有一家名为 "90DaysOfDevOps" 的公司，已经运营了一段时间，现在是时候在未来几周内将团队从 1 人扩展到更多人。到目前为止，只有我知道入职流程，所以我们希望通过自动化其中的一些任务来减少瓶颈。

**Requirements**:
**要求**：

- A user can be passed in as a command line argument.
- 可以将用户作为命令行参数传入。
- A user is created with the name of the command line argument.
- 创建一个以命令行参数命名的用户。
- A password can be parsed as a command line argument.
- 可以将密码解析为命令行参数。
- The password is set for the user
- 为用户设置密码
- A message of successful account creation is displayed.
- 显示账户创建成功的消息。

Let's start with creating our shell script with `touch create_user.sh`
让我们从创建 shell 脚本 `touch create_user.sh` 开始。

Before we move on let's also make this executable using `chmod +x create_user.sh`
在继续之前，我们还要使用 `chmod +x create_user.sh` 使其可执行。

then we can use `nano create_user.sh` to start editing our script for the scenario we have been set.
然后我们可以使用 `nano create_user.sh` 来开始编辑我们针对已设定场景的脚本。

We can take a look at the first requirement "A user can be passed in as a command line argument" we can use the following
我们可以看一下第一个要求：“可以将用户作为命令行参数传入”，我们可以使用以下代码：

```
#! /usr/bin/bash

#A user can be passed in as a command line argument
echo "$1"
```

![](Images/Day19_Linux9.png)

Go ahead and run this using `./create_user.sh Michael` replace Michael with your name when you run the script.
继续运行，使用 `./create_user.sh Michael`，当你运行脚本时，将 Michael 替换为你的名字。

![](Images/Day19_Linux10.png)

Next up we can take that second requirement "A user is created with the name of command line argument" this can be done with the `useradd` command. The `-m` option is to create the user home directory as /home/username
接下来，我们可以考虑第二个要求：“创建一个以命令行参数命名的用户”，这可以通过 `useradd` 命令完成。 `-m` 选项用于创建用户主目录，例如 /home/username。

```
#! /usr/bin/bash

#A user can be passed in as a command line argument
echo "$1 user account being created."

#A user is created with the name of the command line argument
sudo useradd -m "$1"

```

Warning: If you do not provide a user account name then it will error as we have not filled the variable `$1`
警告：如果你没有提供用户账户名，那么它将报错，因为我们没有填充变量 `$1`。

We can then check this account has been created with the `awk -F: '{ print $1}' /etc/passwd` command.
然后我们可以使用 `awk -F: '{ print $1}' /etc/passwd` 命令检查该账户是否已创建。

![](Images/Day19_Linux11.png)

Our next requirement is "A password can be parsed as a command line argument." First of all, we are not going to ever do this in production it is more for us to work through a list of requirements in the lab to understand.
我们的下一个要求是“可以将密码解析为命令行参数。” 首先，我们永远不会在生产环境中这样做，这更多是为了我们在实验环境中理解需求列表并进行操作。

```
#! /usr/bin/bash

#A user can be passed in as a command line argument
echo "$1 user account being created."

#A user is created with the name of the command line argument
sudo useradd -m "$1"

#A password can be parsed as a command line argument.
sudo chpasswd <<< "$1":"$2"
```

If we then run this script with the two parameters `./create_user.sh 90DaysOfDevOps password`
如果然后我们使用这两个参数运行脚本 `./create_user.sh 90DaysOfDevOps password`

You can see from the below image that we executed our script it created our user and password and then we manually jumped into that user and confirmed with the `whoami` command.
你可以从下面的图片中看到，我们执行了脚本，它创建了用户和密码，然后我们手动切换到该用户并使用 `whoami` 命令进行了确认。

![](Images/Day19_Linux12.png)

The final requirement is "A message of successful account creation is displayed." We already have this in the top line of our code and we can see on the above screenshot that we have a `90DaysOfDevOps user account being created` shown. This was left from our testing with the `$1` parameter.
最后一个要求是“显示账户创建成功的消息”。我们代码的第一行已经包含了这一点，并且在上面的截图中我们可以看到显示了 `90DaysOfDevOps user account being created`。这是我们使用 `$1` 参数进行测试时留下的。

Now, this script can be used to quickly onboard and set up new users on to our Linux systems. But maybe instead of a few of the historic people having to work through this and then having to get other people their new usernames or passwords we could add some user input that we have previously covered earlier on to capture our variables.
现在，这个脚本可以用于快速地将新用户引入并设置到我们的 Linux 系统上。但是，也许我们可以添加一些我们之前介绍过的用户输入来捕获我们的变量，而不是让少数历史人员必须手动完成此操作，然后还得把他们的新用户名或密码提供给其他人。

```
#! /usr/bin/bash

echo "What is your intended username?"
read  username
echo "What is your password"
read  password

#A user can be passed in as a command line argument
echo "$username user account being created."

#A user is created with the name of the command line argument
sudo useradd -m $username

#A password can be parsed as a command line argument.
sudo chpasswd <<< $username:$password
```

With the steps being more interactive,
通过使步骤更具交互性，

![](Images/Day19_Linux14.png)

Just to finish this off maybe we do want to output a successful output to say that our new user account has finished being created.
为了完成此操作，也许我们确实希望输出一个成功的提示信息，表明我们的新用户账户已创建完成。

![](Images/Day19_Linux15.png)

One thing I did notice was that we are displaying the password on our input we can hide this by using the `-s` flag in the line of code `read -s password`
我注意到的一件事是，我们在输入时显示了密码，我们可以通过在代码行 `read -s password` 中使用 `-s` 标志来隐藏它。

![](Images/Day19_Linux16.png)

If you do want to delete the user you have created for lab purposes then you can do that with `sudo userdel test_user`
如果你确实想删除为实验目的而创建的用户，可以使用 `sudo userdel test_user` 来完成。

[Example Script](Linux/create-user.sh)

Once again I am not saying this is going to be something that you do create in your day to day but it was something I thought of that would highlight the flexibility of what you could use shell scripting for.
我再次声明，我并不是说这是你日常工作中一定会创建的东西，但这只是我想到的一个例子，它可以突出 shell 脚本的灵活性。

Think about any repeatable tasks that you do every day or week or month and how could you better automate that, first option is likely going to be using a bash script before moving into more complex territory.
想一想你每天、每周或每月所做的任何重复性任务，以及如何更好地将其自动化。在进入更复杂的领域之前，第一个选择很可能是使用 bash 脚本。

I have created a very simple bash file that helps me spin up a Kubernetes cluster using minikube on my local machine along with data services and Kasten K10 to help demonstrate the requirements and needs around data management. [Project Pace](https://github.com/MichaelCade/project_pace/blob/main/singlecluster_demo.sh) But I did not feel this appropriate to raise here as we have not covered Kubernetes yet.
我创建了一个非常简单的 bash 文件，它帮助我在本地机器上使用 minikube 启动一个 Kubernetes 集群，同时还包含数据服务和 Kasten K10，以帮助演示围绕数据管理的需求。 [Project Pace](https://github.com/MichaelCade/project_pace/blob/main/singlecluster_demo.sh) 但我觉得在这里提出它不太合适，因为我们还没有涉及到 Kubernetes。

## Resources

- [Bash in 100 seconds](https://www.youtube.com/watch?v=I4EWvMFj37g)
- [Bash script with practical examples - Full Course](https://www.youtube.com/watch?v=TPRSJbtfK4M)
- [Client SSH GUI - Remmina](https://remmina.org/)
- [The Beginner's guide to SSH](https://www.youtube.com/watch?v=2QXkrLVsRmk)
- [Vim in 100 Seconds](https://www.youtube.com/watch?v=-txKSRn0qeA)
- [Vim tutorial](https://www.youtube.com/watch?v=IiwGbcd8S7I)
- [Learn the Linux Fundamentals - Part 1](https://www.youtube.com/watch?v=kPylihJRG70)
- [Linux for hackers (don't worry you don't need to be a hacker!)](https://www.youtube.com/watch?v=VbEx7B_PTOE)

See you on [Day20](day20.md)
我们 [Day20](day20.md) 再见
