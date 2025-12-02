---
title: '#90DaysOfDevOps - Create a VM with Terraform & Variables - Day 59'
published: false
description: 90DaysOfDevOps - Create a VM with Terraform & Variables
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049051
---

## Create a VM with Terraform & Variables

In this session, we are going to be creating a VM or two VMs using terraform inside VirtualBox.
在本次会话中，我们将使用 Terraform 在 VirtualBox 中创建一台或两台虚拟机（VM）。
This is not normal, VirtualBox is a workstation virtualisation option and this would not be a use case for Terraform but I am currently 36,000ft in the air and as much as I have deployed public cloud resources this high in the clouds it is much faster to do this locally on my laptop.
这并不常见，VirtualBox 是一种工作站虚拟化选项，通常不会是 Terraform 的用例，但我目前正在 36,000 英尺的高空，虽然我在云端部署过公共云资源，但在本地笔记本电脑上执行此操作要快得多。

Purely for demo purposes but the concept is the same we are going to have our desired state configuration code and then we are going to run that against the VirtualBox provider.
这纯粹是为了演示目的，但概念是相同的：我们将准备所需的配置代码（Desired State Configuration Code），然后针对 VirtualBox 提供者运行它。
In the past, we have used vagrant here and I covered the differences between vagrant and terraform at the beginning of the section.
过去我们在这里使用过 Vagrant，并且在本节开始时我介绍过 Vagrant 和 Terraform 之间的区别。

### Create a virtual machine in VirtualBox

The first thing we are going to do is create a new folder called VirtualBox, we can then create a VirtualBox.tf file and this is going to be where we define our resources.
我们要做的第一件事是创建一个名为 VirtualBox 的新文件夹，然后我们可以创建一个 VirtualBox.tf 文件，这将是我们定义资源的地方。
The code below which can be found in the VirtualBox folder as VirtualBox.tf is going to create 2 VMs in Virtualbox.
下面的代码位于 VirtualBox 文件夹中，文件名为 VirtualBox.tf，它将在 VirtualBox 中创建 2 台虚拟机。

You can find more about the community VirtualBox provider [here](https://registry.terraform.io/providers/terra-farm/virtualbox/latest/docs/resources/vm)
您可以在[此处](https://registry.terraform.io/providers/terra-farm/virtualbox/latest/docs/resources/vm)找到有关社区 VirtualBox 提供者的更多信息

```
terraform {
  required_providers {
    virtualbox = {
      source = "terra-farm/virtualbox"
      version = "0.2.2-alpha.1"
    }
  }
}

# There are currently no configuration options for the provider itself.

resource "virtualbox_vm" "node" {
  count     = 2
  name      = format("node-%02d", count.index + 1)
  image     = "https://app.vagrantup.com/ubuntu/boxes/bionic64/versions/20180903.0.0/providers/virtualbox.box"
  cpus      = 2
  memory    = "512 mib"

  network_adapter {
    type           = "hostonly"
    host_interface = "vboxnet1"
  }
}

output "IPAddr" {
  value = element(virtualbox_vm.node.*.network_adapter.0.ipv4_address, 1)
}

output "IPAddr_2" {
  value = element(virtualbox_vm.node.*.network_adapter.0.ipv4_address, 2)
}

```

Now that we have our code defined we can now perform the `terraform init` on our folder to download the provider for Virtualbox.
现在我们已经定义了代码，我们可以在文件夹上执行 `terraform init` 来下载 VirtualBox 的提供者（provider）。

![](Images/Day59_IAC1.png)

You will also need to have VirtualBox installed on your system as well.
您还需要在系统上安装 VirtualBox。
We can then next run `terraform plan` to see what our code will create for us.
接下来我们可以运行 `terraform plan` 来查看我们的代码将创建哪些内容。
Followed by `terraform apply` the below image shows your completed process.
随后运行 `terraform apply`，下图显示了完成后的过程。

![](Images/Day59_IAC2.png)

In Virtualbox, you will now see your 2 virtual machines.
在 VirtualBox 中，您现在将看到您的 2 台虚拟机。

![](Images/Day59_IAC3.png)

### Change configuration

Let's add another node to our deployment.
让我们在部署中添加另一个节点。
We can simply change the count line to show our new desired number of nodes.
我们可以简单地更改 `count` 行来显示我们期望的新节点数量。
When we run our `terraform apply` it will look something like the below.
当我们运行 `terraform apply` 时，它看起来会像下面这样。

![](Images/Day59_IAC4.png)

Once complete in VirtualBox you can see we now have 3 nodes up and running.
完成后，您可以在 VirtualBox 中看到我们现在有 3 个节点正在运行。

![](Images/Day59_IAC5.png)

When we are finished we can clear this up using the `terraform destroy` and our machines will be removed.
当我们完成后，我们可以使用 `terraform destroy` 进行清理，我们的机器将被移除。

![](Images/Day59_IAC6.png)

### Variables & Outputs

We did mention outputs when we ran our hello-world example in the last session. But we can get into more detail here.
在上一节中运行我们的 hello-world 示例时，我们确实提到了输出（outputs）。但我们可以在这里深入了解更多细节。

But there are many other variables that we can use here as well, there are also a few different ways in which we can define variables.
但我们在这里也可以使用许多其他变量，定义变量的方式也有几种不同。

- We can manually enter our variables with the `terraform plan` or `terraform apply` command
- 我们可以使用 `terraform plan` 或 `terraform apply` 命令手动输入变量

- We can define them in the .tf file within the block
- 我们可以在 `.tf` 文件中的块内定义它们

- We can use environment variables within our system using `TF_VAR_NAME` as the format.
- 我们可以使用 `TF_VAR_NAME` 格式在系统内部使用环境变量。

- My preference is to use a terraform.tfvars file in our project folder.
- 我更倾向于在项目文件夹中使用 `terraform.tfvars` 文件。

- There is an \*auto.tfvars file option
- 还有一个 `*auto.tfvars` 文件选项

- or we can define when we run the `terraform plan` or `terraform apply` with the `-var` or `-var-file`.
- 或者我们可以在运行 `terraform plan` 或 `terraform apply` 时使用 `-var` 或 `-var-file` 来定义。

Starting from the bottom moving up would be the order in which the variables are defined.
从下往上是变量定义的优先级顺序。

We have also mentioned that the state file will contain sensitive information.
我们还提到过状态文件（state file）将包含敏感信息。
We can define our sensitive information as a variable and we can define this as being sensitive.
我们可以将敏感信息定义为一个变量，并将其定义为敏感（sensitive）。

```
variable "some resource"  {
    description = "something important"
    type= string
    sensitive = true

}
```

## Resources

I have listed a lot of resources down below and I think this topic has been covered so many times out there, If you have additional resources be sure to raise a PR with your resources and I will be happy to review and add them to the list.
我在下面列出了很多资源，我认为这个主题已经被广泛地讨论过了。如果您有额外的资源，请务必提交一个带有您的资源的 PR，我很乐意审核并将它们添加到列表中。

- [What is Infrastructure as Code? Difference of Infrastructure as Code Tools](https://www.youtube.com/watch?v=POPP2WTJ8es)
- [Terraform Tutorial | Terraform Course Overview 2021](https://www.youtube.com/watch?v=m3cKkYXl-8o)
- [Terraform explained in 15 mins | Terraform Tutorial for Beginners](https://www.youtube.com/watch?v=l5k1ai_GBDE)
- [Terraform Course - From BEGINNER to PRO!](https://www.youtube.com/watch?v=7xngnjfIlK4&list=WL&index=141&t=16s)
- [HashiCorp Terraform Associate Certification Course](https://www.youtube.com/watch?v=V4waklkBC38&list=WL&index=55&t=111s)
- [Terraform Full Course for Beginners](https://www.youtube.com/watch?v=EJ3N-hhiWv0&list=WL&index=39&t=27s)
- [KodeKloud - Terraform for DevOps Beginners + Labs: Complete Step by Step Guide!](https://www.youtube.com/watch?v=YcJ9IeukJL8&list=WL&index=16&t=11s)
- [Terraform Simple Projects](https://terraform.joshuajebaraj.com/)
- [Terraform Tutorial - The Best Project Ideas](https://www.youtube.com/watch?v=oA-pPa0vfks)
- [Awesome Terraform](https://github.com/shuaibiyy/awesome-terraform)

See you on [Day 60](day60.md)
第 60 天见 [Day 60](day60.md)
