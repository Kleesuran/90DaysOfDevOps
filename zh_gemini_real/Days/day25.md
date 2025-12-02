---
title: '#90DaysOfDevOps - Python for Network Automation - Day 25'
published: false
description: 90DaysOfDevOps - Python for Network Automation
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049038
---

## Python for Network Automation

Python is the standard language used for automated network operations.
Python是用于自动化网络操作的标准语言。

Whilst it is not only for network automation it seems to be everywhere when you are looking for resources and as previously mentioned if it's not Python then it's generally Ansible which is written also in Python.
虽然Python并非仅用于网络自动化，但在你寻找相关资源时，它似乎无处不在，正如前文所述，如果不是Python，通常也是Ansible（Ansible本身也是用Python编写的）。

I think I have mentioned this already but during the "Learn a programming language" section I chose Golang over Python for reasons around my company is developing in Go so that was a good reason for me to learn but if that was not the case then Python would have taken that time.
我想我已经提到过这一点，但在“学习一门编程语言”部分，我选择了Golang而不是Python，原因是我公司正在使用Go进行开发，这对我来说是一个很好的学习理由，但如果不是这种情况，我可能会选择Python。

- Readability and ease of use - It seems that Python seems just makes sense. There don't seem to be the requirements around `{}` in the code to start and end blocks. Couple this with a strong IDE like VS Code you have a pretty easy start when wanting to run some python code.
- 可读性和易用性——Python似乎非常直观。代码中似乎没有使用 `{}` 来开始和结束代码块的要求。如果将其与像VS Code这样的强大IDE结合使用，当你想要运行Python代码时，会有一个非常容易的开始。

Pycharm might be another IDE worth mentioning here.
Pycharm可能是这里值得一提的另一个IDE。

- Libraries - The extensibility of Python is the real gold mine here, I mentioned before that this is not just for Network Automation but in fact, there are libraries plenty for all sorts of devices and configurations. You can see the vast amount here [PyPi](https://pypi.python.org/pypi)
- 库——Python的扩展性是真正的金矿所在，我之前提到过，这不仅适用于网络自动化，事实上，有大量库适用于各种设备和配置。你可以在这里看到其庞大的数量 [PyPi](https://pypi.python.org/pypi)

When you want to download the library to your workstation, then you use a tool called `pip` to connect to PyPI and download it locally. Network vendors such as Cisco, Juniper, and Arista developed libraries to facilitate access to their devices.
当你想将库下载到你的工作站时，你可以使用一个名为 `pip` 的工具连接到PyPI并将其下载到本地。像Cisco、Juniper和Arista等网络供应商开发了库来方便地访问他们的设备。

- Powerful & Efficient - Remember during the Go days I went through the "Hello World" scenario and we went through I think 6 lines of code? In Python it is
- 强大且高效——还记得在学习Go语言时，我演示了“Hello World”场景，当时我们使用了大约6行代码？而在Python中，它是

```
print('hello world')
```

Put all of the above points together and it should be easy to see why Python is generally mentioned as the de-facto tool when working on automating.
综合以上所有几点，很容易理解为什么Python在进行自动化工作时通常被认为是事实上的标准工具。

I think it's important to note that it's possible that several years back there were scripts that might have interacted with your network devices to maybe automate the backup of configuration or to gather logs and other insights into your devices. The automation we are talking about here is a little different and that's because the overall networking landscape has also changed to suit this way of thinking better and enabled more automation.
我认为需要指出的是，几年前可能就有脚本与你的网络设备进行交互，用于自动化配置备份或收集日志及设备的其他信息。我们在这里讨论的自动化有所不同，那是因为整个网络环境也发生了变化，更好地适应了这种思维方式并实现了更多的自动化。

- Software-Defined Network - SDN Controllers take the responsibility of delivering the control plane configuration to all devices on the network, meaning just a single point of contact for any network changes, no longer having to telnet or SSH into every device and also relying on humans to do this which has a repeatable chance of failure or misconfiguration.
- 软件定义网络（Software-Defined Network, SDN）——SDN控制器负责向网络中的所有设备交付控制平面配置，这意味着对于任何网络更改，只需一个单点接触，不再需要通过telnet或SSH登录到每台设备，也避免了依赖人工操作带来的重复性失败或错误配置的可能性。

- High-Level Orchestration - Go up a level from those SDN controllers and this allows for orchestration of service levels then there is the integration of this orchestration layer into your platforms of choice, VMware, Kubernetes, Public Clouds etc.
- 高级编排——比SDN控制器更高一层，这允许进行服务级别的编排，然后将此编排层集成到你选择的平台中，如VMware、Kubernetes、公共云等。

- Policy-based management - What do you want to have? What is the desired state? You describe this and the system has all the details on how to figure it out to become the desired state.
- 基于策略的管理——你想要什么？期望状态是什么？你只需描述这一点，系统便拥有所有详细信息，知道如何实现并达到期望状态。

## Setting up the lab environment

Not everyone has access to physical routers, switches and other networking devices.
并非每个人都能接触到物理路由器、交换机和其他网络设备。

I wanted to make it possible for us to look at some of the tooling pre-mentioned but also get hands-on and learn how to automate the configuration of our networks.
我想让我们能够研究前面提到的一些工具，同时也能亲自动手学习如何自动化配置我们的网络。

When it comes to options there are a few that we can choose from.
至于选项，我们有几种可供选择。

- [GNS3 VM](https://www.gns3.com/software/download-vm)
- [Eve-ng](https://www.eve-ng.net/)
- [Unimus](https://unimus.net/) Not a lab environment but an interesting concept.
- [Unimus](https://unimus.net/) 这不是一个实验环境，但它是一个有趣的概念。

We will build our lab out using [Eve-ng](https://www.eve-ng.net/) as mentioned before you can use a physical device but to be honest a virtual environment means that we can have a sandbox environment to test many different scenarios. Plus being able to play with different devices and topologies might be of interest.
我们将使用 [Eve-ng](https://www.eve-ng.net/) 来构建我们的实验环境，如前所述，你可以使用物理设备，但老实说，虚拟环境意味着我们可以拥有一个沙盒环境来测试许多不同的场景。此外，能够使用不同的设备和拓扑结构进行操作可能会很有趣。

We are going to do everything on EVE-NG with the community edition.
我们将使用社区版的EVE-NG完成所有操作。

### Getting started

The community edition comes in ISO and OVF formats for [download](https://www.eve-ng.net/index.php/download/)
社区版提供ISO和OVF格式供 [下载](https://www.eve-ng.net/index.php/download/)

We will be using the OVF download but with the ISO there is the option to build out on a bare metal server without the need for a hypervisor.
我们将使用OVF下载，但如果是ISO格式，则可以选择在裸机服务器上构建，而无需使用虚拟机管理程序。

![](Images/Day25_Networking1.png)

For our walkthrough, we will be using VMware Workstation as I have a license via my vExpert but you can equally use VMware Player or any of the other options mentioned in the [documentation](https://www.eve-ng.net/index.php/documentation/installation/system-requirement/). Unfortunately we cannot use our previously used Virtual box!
在我们的演练中，我将使用VMware Workstation，因为我通过vExpert获得了许可，但你也可以使用VMware Player或 [文档](https://www.eve-ng.net/index.php/documentation/installation/system-requirement/) 中提到的任何其他选项。不幸的是，我们不能使用我们之前用过的Virtual box！

This is also where I had an issue with GNS3 with Virtual Box even though supported.
这也是我在Virtual Box上使用GNS3时遇到问题的地方，尽管它是受支持的。

[Download VMware Workstation Player - FREE](https://www.vmware.com/uk/products/workstation-player.html)

[VMware Workstation PRO](https://www.vmware.com/uk/products/workstation-pro.html) Also noted that there is an evaluation period for free!
[VMware Workstation PRO](https://www.vmware.com/uk/products/workstation-pro.html) 另请注意，有免费试用期！

### Installation on VMware Workstation PRO

Now we have our hypervisor software downloaded and installed, and we have the EVE-NG OVF downloaded. If you are using VMware Player please let me know if this process is the same.
现在我们已经下载并安装了虚拟机管理程序软件，并且下载了EVE-NG OVF。如果你正在使用VMware Player，请告诉我这个过程是否相同。

We are now ready to get things configured.
现在我们准备开始配置。

Open VMware Workstation and then select `file` and `open`
打开VMware Workstation，然后选择 `file` 和 `open`

![](Images/Day25_Networking2.png)

When you download the EVE-NG OVF Image it is going to be within a compressed file. Extract the contents out into its folder so it looks like this.
当你下载EVE-NG OVF镜像时，它会包含在一个压缩文件中。将其内容解压到一个文件夹中，看起来像这样。

![](Images/Day25_Networking3.png)

Navigate to the location where you downloaded the EVE-NG OVF image and begin the import.
导航到你下载EVE-NG OVF镜像的位置并开始导入。

Give it a recognisable name and store the virtual machine somewhere on your system.
给它一个易于识别的名称，并将虚拟机存储在你系统上的某个位置。

![](Images/Day25_Networking4.png)

When the import is complete increase the number of processors to 4 and the memory allocated to 8 GB. (This should be the case after import with the latest version if not then edit VM settings)
导入完成后，将处理器数量增加到4个，并将分配的内存增加到8 GB。（如果导入的是最新版本，应该已经是这样了，否则请编辑VM设置）

Also, make sure the Virtualise Intel VT-x/EPT or AMD-V/RVI checkbox is enabled. This option instructs the VMware workstation to pass the virtualisation flags to the guest OS (nested virtualisation) This was the issue I was having with GNS3 with Virtual Box even though my CPU allows this.
另外，请确保启用了“虚拟化Intel VT-x/EPT或AMD-V/RVI”复选框。此选项指示VMware Workstation将虚拟化标志传递给客户操作系统（嵌套虚拟化）。这也是我在Virtual Box上使用GNS3时遇到的问题，尽管我的CPU支持此功能。

![](Images/Day25_Networking5.png)

### Power on & Access

Sidenote & Rabbit hole: Remember I mentioned that this would not work with VirtualBox! Well yeah had the same issue with VMware Workstation and EVE-NG but it was not the fault of the virtualisation platform!
旁注与深挖：还记得我提到过这在VirtualBox上不起作用吗！好吧，我在VMware Workstation和EVE-NG上也遇到了同样的问题，但这并不是虚拟化平台本身的错误！

I have WSL2 running on my Windows Machine and this seems to remove the capability of being able to run anything nested inside of your environment. I am confused as to why the Ubuntu VM does run as it seems to take out the Intel VT-d virtualisation aspect of the CPU when using WSL2.
我的Windows机器上运行了WSL2，这似乎消除了在你的环境中运行任何嵌套（nested）虚拟化的能力。我很困惑为什么Ubuntu VM能够运行，因为在使用WSL2时，它似乎占用了CPU的Intel VT-d虚拟化功能。

To resolve this we can run the following command on our Windows machine and reboot the system, note that whilst this is off then you will not be able to use WSL2.
要解决这个问题，我们可以在Windows机器上运行以下命令并重新启动系统，请注意，当此功能关闭时，你将无法使用WSL2。

```
bcdedit /set hypervisorlaunchtype off
```

When you want to go back and use WSL2 then you will need to run this command and reboot.
当你想要回去使用WSL2时，你需要运行此命令并重新启动。

```
bcdedit /set hypervisorlaunchtype auto
```

Both of these commands should be run as administrator!
这两个命令都应该以管理员身份运行！

Ok back to the show, You should now have a powered-on machine in VMware Workstation and you should have a prompt looking similar to this.
好了，回到正题，现在你的VMware Workstation中应该有一台已开机的机器，并且你应该看到一个类似于这样的提示符。

![](Images/Day25_Networking6.png)

On the prompt above you can use:
在上面的提示符上你可以使用：

username = root
username = root
password = eve
password = eve

You will then be asked to provide the root password again, this will be used to SSH into the host later on.
然后系统会要求你再次提供root密码，这个密码将用于之后SSH登录到主机。

We then can change the hostname.
然后我们可以更改主机名。

![](Images/Day25_Networking7.png)

Next, we define a DNS Domain Name, I have used the one below but I am not sure if this will need to be changed later on.
接下来，我们定义一个DNS域名，我使用了下面的这个，但不确定以后是否需要更改。

![](Images/Day25_Networking8.png)

We then configure networking, I am selecting static so that the IP address given will be persistent after reboots.
然后我们配置网络，我选择静态（static）以便分配的IP地址在重启后会保持不变。

![](Images/Day25_Networking9.png)

The final step, provide a static IP address from a network that is reachable from your workstation.
最后一步，提供一个静态IP地址，该地址来自你的工作站可以访问的网络。

![](Images/Day25_Networking10.png)

There are some additional steps here where you will have to provide a subnet mask for your network, default gateway and DNS.
这里还有一些额外的步骤，你需要提供网络的子网掩码、默认网关和DNS。

Once finished it will reboot, when it is back up you can take your static IP address and put this into your browser.
完成后它将重启，当它重新启动后，你可以使用你的静态IP地址并在浏览器中输入它。

![](Images/Day25_Networking11.png)

The default username for the GUI is `admin` and the password is `eve` while the default username for SSH is `root` and the password is `eve` but this would have been changed if you changed during the setup.
GUI的默认用户名是 `admin`，密码是 `eve`；而SSH的默认用户名是 `root`，密码是 `eve`，如果你在设置过程中进行了更改，则密码会有所不同。

![](Images/Day25_Networking12.png)

I chose HTML5 for the console vs native as this will open a new tab in your browser when you are navigating through different consoles.
我选择了HTML5控制台而不是原生控制台，因为当你浏览不同的控制台时，这会在浏览器中打开一个新标签页。

Next up we are going to:
接下来我们将：

- Install the EVE-NG client pack
- 安装EVE-NG客户端包
- Load some network images into EVE-NG
- 将一些网络镜像加载到EVE-NG中
- Build a Network Topology
- 构建一个网络拓扑
- Adding Nodes
- 添加节点
- Connecting Nodes
- 连接节点
- Start building Python Scripts
- 开始构建Python脚本
- Look at telnetlib, Netmiko, Paramiko and Pexpect
- 研究 telnetlib, Netmiko, Paramiko 和 Pexpect

## Resources

- [Free Course: Introduction to EVE-NG](https://www.youtube.com/watch?v=g6B0f_E0NMg)
- [EVE-NG - Creating your first lab](https://www.youtube.com/watch?v=9dPWARirtK8)
- [3 Necessary Skills for Network Automation](https://www.youtube.com/watch?v=KhiJ7Fu9kKA&list=WL&index=122&t=89s)
- [Computer Networking full course](https://www.youtube.com/watch?v=IPvYjXCsTg8)
- [Practical Networking](http://www.practicalnetworking.net/)
- [Python Network Automation](https://www.youtube.com/watch?v=xKPzLplPECU&list=WL&index=126)

See you on [Day 26](day26.md)
[Day 26](day26.md) 再见
