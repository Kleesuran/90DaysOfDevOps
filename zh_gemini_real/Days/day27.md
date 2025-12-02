---
title: '#90DaysOfDevOps - Getting Hands-On with Python & Network - Day 27'
published: false
description: 90DaysOfDevOps - Getting Hands-On with Python & Network
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048735
---

## Getting Hands-On with Python & Network

In this final section of Networking fundamentals, we are going to cover some automation tasks and tools with our lab environment created on [Day 26](day26.md)
在网络基础知识的最后这一部分，我们将利用我们在[第 26 天](day26.md)创建的实验环境来涵盖一些自动化任务和工具。

We will be using an SSH tunnel to connect to our devices from our client vs telnet. The SSH tunnel created between client and device is encrypted. We also covered SSH in the Linux section on [Day 18](day18.md)
我们将使用 SSH 隧道（而非 Telnet）从客户端连接到我们的设备。在客户端和设备之间创建的 SSH 隧道是加密的。我们在 [第 18 天](day18.md)的 Linux 部分也介绍了 SSH。

## Access our virtual emulated environment

For us to interact with our switches we either need a workstation inside the EVE-NG network or you can deploy a Linux box there with Python installed to perform your automation ([Resource for setting up Linux inside EVE-NG](https://www.youtube.com/watch?v=3Qstk3zngrY)) or you can do something like me and define a cloud for access from your workstation.
为了与交换机进行交互，我们既可以在 EVE-NG 网络内部部署一个工作站，也可以在其中部署一个安装了 Python 的 Linux 盒子来执行自动化操作（[在 EVE-NG 内部设置 Linux 的资源](https://www.youtube.com/watch?v=3Qstk3zngrY)），或者像我一样，定义一个云来允许从您的工作站进行访问。

![](Images/Day27_Networking3.png)

To do this, we have right-clicked on our canvas and we have selected network and then selected "Management(Cloud0)" this will bridge out to our home network.
为此，我们在画布上右键单击，然后选择了网络，接着选择了 "Management(Cloud0)"，这将桥接到我们的家庭网络。

![](Images/Day27_Networking4.png)

However, we do not have anything inside this network so we need to add connections from the new network to each of our devices. (My networking knowledge needs more attention and I feel that you could just do this next step to the top router and then have connectivity to the rest of the network through this one cable?)
然而，我们的网络内部没有任何设备，因此我们需要为新网络与我们的每个设备之间添加连接。（我的网络知识需要更多的关注，我觉得你可以只对最上面的路由器执行下一步操作，然后通过这一根电缆连接到网络的其余部分，对吗？）

I have then logged on to each of our devices and I have run through the following commands for the interfaces applicable to where the cloud comes in.
然后我登录到我们的每个设备上，并为云连接所适用的接口运行了以下命令。

```
enable
config t
int gi0/0
IP add DHCP
no sh
exit
exit
sh ip int br
```

The final step gives us the DHCP address from our home network. My device network list is as follows:
最后一步为我们提供了来自家庭网络的 DHCP 地址。我的设备网络列表如下：

| Node    | IP Address   | Home Network IP |
| ------- | ------------ | --------------- |
| Router  | 10.10.88.110 | 192.168.169.115 |
| Switch1 | 10.10.88.111 | 192.168.169.178 |
| Switch2 | 10.10.88.112 | 192.168.169.193 |
| Switch3 | 10.10.88.113 | 192.168.169.125 |
| Switch4 | 10.10.88.114 | 192.168.169.197 |

### SSH to a network device

With the above in place, we can now connect to our devices on our home network using our workstation. I am using Putty but also have access to other terminals such as git bash that give me the ability to SSH to our devices.
有了上述配置，我们现在可以使用工作站连接到家庭网络上的设备。我正在使用 Putty，但也可以访问其他终端（例如 git bash），它们使我能够通过 SSH 连接到我们的设备。

Below you can see we have an SSH connection to our router device. (R1)
在下面您可以看到我们已经成功通过 SSH 连接到我们的路由器设备 (R1)。

![](Images/Day27_Networking5.png)

### Using Python to gather information from our devices

The first example of how we can leverage Python is to gather information from all of our devices and in particular, I want to be able to connect to each one and run a simple command to provide me with interface configuration and settings. I have stored this script here [netmiko_con_multi.py](Networking/netmiko_con_multi.py)
我们可以利用 Python 的第一个示例是收集所有设备的信息，特别是，我希望能够连接到每个设备并运行一个简单的命令，向我提供接口配置和设置。我已将该脚本存储在 [netmiko_con_multi.py](Networking/netmiko_con_multi.py) 中。

Now when I run this I can see each port configuration over all of my devices.
现在当我运行它时，我可以看到所有设备上的每个端口配置。

![](Images/Day27_Networking6.png)

This could be handy if you have a lot of different devices, create this one script so that you can centrally control and understand quickly all of the configurations in one place.
如果您有许多不同的设备，这可能非常方便。创建这一个脚本，您就可以在一个地方集中控制并快速了解所有配置。

### Using Python to configure our devices

The above is useful but what about using Python to configure our devices, in our scenario we have a trunked port between `SW1` and `SW2` again imagine if this was to be done across many of the same switches we want to automate that and not have to manually connect to each switch to make the configuration change.
上面的示例很有用，但是使用 Python 配置设备如何呢？在我们的场景中，`SW1` 和 `SW2` 之间有一个中继端口 (trunked port)。再次设想一下，如果需要在许多相同的交换机上完成此操作，我们会希望将其自动化，而不是必须手动连接到每个交换机来进行配置更改。

We can use [netmiko_sendchange.py](Networking/netmiko_sendchange.py) to achieve this. This will connect over SSH and perform that change on our `SW1` which will also change to `SW2`.
我们可以使用 [netmiko_sendchange.py](Networking/netmiko_sendchange.py) 来实现这一点。它将通过 SSH 连接到我们的 `SW1` 并执行该更改，该更改也将延伸到 `SW2`。

![](Images/Day27_Networking7.png)

Now for those that look at the code, you will see the message appears and tells us `sending configuration to device` but there is no confirmation that this has happened we could add additional code to our script to perform that check and validation on our switch or we could modify our script before to show us this. [netmiko_con_multi_vlan.py](Networking/netmiko_con_multi_vlan.py)
现在，对于查看代码的人来说，您会看到消息出现并告诉我们 `sending configuration to device`，但没有确认配置已完成。我们可以向脚本添加额外的代码来在交换机上执行检查和验证，或者我们可以修改我们之前的脚本来向我们展示这一点。[netmiko_con_multi_vlan.py](Networking/netmiko_con_multi_vlan.py)

![](Images/Day27_Networking8.png)

### backing up your device configurations

Another use case would be to capture our network configurations and make sure we have those backed up, but again we don't want to be connecting to every device we have on our network so we can also automate this using [backup.py](Networking/backup.py). You will also need to populate the [backup.txt](Networking/backup.txt) with the IP addresses you want to backup.
另一个用例是捕获我们的网络配置并确保我们对其进行了备份，但我们同样不希望连接到网络上的每个设备，因此我们也可以使用 [backup.py](Networking/backup.py) 来实现自动化。您还需要使用要备份的 IP 地址填充 [backup.txt](Networking/backup.txt) 文件。

Run your script and you should see something like the below.
运行您的脚本，您应该会看到类似如下的内容。

![](Images/Day27_Networking9.png)

That could be me just writing a simple print script in python so I should show you the backup files as well.
那可能只是我在 Python 中编写的一个简单的打印脚本，所以我还应该向您展示备份文件。

![](Images/Day27_Networking10.png)

### Paramiko

A widely used Python module for SSH. You can find out more at the official GitHub link [here](https://github.com/paramiko/paramiko)
一个广泛用于 SSH 的 Python 模块。您可以在官方 GitHub 链接[此处](https://github.com/paramiko/paramiko)找到更多信息。

We can install this module using the `pip install paramiko` command.
我们可以使用 `pip install paramiko` 命令来安装此模块。

![](Images/Day27_Networking1.png)

We can verify the installation by entering the Python shell and importing the paramiko module.
我们可以通过进入 Python shell 并导入 paramiko 模块来验证安装。

![](Images/Day27_Networking2.png)

### Netmiko

The netmiko module targets network devices specifically whereas paramiko is a broader tool for handling SSH connections overall.
netmiko 模块专门针对网络设备，而 paramiko 是一个更广泛的、用于处理整体 SSH 连接的工具。

Netmiko which we have used above alongside paramiko can be installed using `pip install netmiko`
我们上面使用过的 Netmiko 可以与 paramiko 一起使用 `pip install netmiko` 进行安装。

Netmiko supports many network vendors and devices, you can find a list of supported devices on the [GitHub Page](https://github.com/ktbyers/netmiko#supports)
Netmiko 支持许多网络供应商和设备，您可以在 [GitHub 页面](https://github.com/ktbyers/netmiko#supports)上找到支持的设备列表。

### Other modules

It is also worth mentioning a few other modules that we have not had the chance to look at but they give a lot more functionality when it comes to network automation.
值得一提的是，还有一些我们没有机会研究的其他模块，但在网络自动化方面，它们提供了更多的功能。

`netaddr` is used for working with and manipulating IP addresses, again the installation is simple with `pip install netaddr`
`netaddr` 用于处理和操作 IP 地址，同样，安装很简单，使用 `pip install netaddr` 即可。

you might find yourself wanting to store a lot of your switch configuration in an excel spreadsheet, the `xlrd` will allow your scripts to read the excel workbook and convert rows and columns into a matrix. `pip install xlrd` to get the module installed.
您可能会发现自己希望将大量的交换机配置存储在 Excel 表格中，`xlrd` 将允许您的脚本读取 Excel 工作簿并将行和列转换为矩阵。使用 `pip install xlrd` 来安装该模块。

Some more use cases where network automation can be used that I have not had the chance to look into can be found [here](https://github.com/ktbyers/pynet/tree/master/presentations/dfwcug/examples)
我还没有机会研究的一些可以使用网络自动化的更多用例可以在[此处](https://github.com/ktbyers/pynet/tree/master/presentations/dfwcug/examples)找到。

I think this wraps up our Networking section of the #90DaysOfDevOps, Networking is one area that I have not touched for a while really and there is so much more to cover but I am hoping between my notes and the resources shared throughout it is helpful for some.
我认为这结束了 #90DaysOfDevOps 的网络部分。网络是我有一段时间没有真正接触过的领域，还有很多内容需要涵盖，但我希望我的笔记和分享的资源能对某些人有所帮助。

## Resources

- [Free Course: Introduction to EVE-NG](https://www.youtube.com/watch?v=g6B0f_E0NMg)
- [EVE-NG - Creating your first lab](https://www.youtube.com/watch?v=9dPWARirtK8)
- [3 Necessary Skills for Network Automation](https://www.youtube.com/watch?v=KhiJ7Fu9kKA&list=WL&index=122&t=89s)
- [Computer Networking full course](https://www.youtube.com/watch?v=IPvYjXCsTg8)
- [Practical Networking](http://www.practicalnetworking.net/)
- [Python Network Automation](https://www.youtube.com/watch?v=xKPzLplPECU&list=WL&index=126)

Most of the examples I am using here as I am not a Network Engineer have come from this extensive book which is not free but I am using some of the scenarios to help understand Network Automation.
我在这里使用的大多数示例都来自于这本内容丰富的书（它不是免费的），因为我不是一名网络工程师，但我正在使用其中的一些场景来帮助理解网络自动化。

- [Hands-On Enterprise Automation with Python (Book)](https://www.packtpub.com/product/hands-on-enterprise-automation-with-python/9781788998512)

See you on [Day 28](day28.md) where will start looking into cloud computing and get a good grasp and foundational knowledge of the topic and what is available.
在[第 28 天](day28.md)再见，届时我们将开始研究云计算，并对该主题及其可用内容有一个很好的掌握和基础知识。
