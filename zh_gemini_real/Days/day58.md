---
title: '#90DaysOfDevOps - HashiCorp Configuration Language (HCL) - Day 58'
published: false
description: 90DaysOfDevOps - HashiCorp Configuration Language (HCL)
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048741
---

## HashiCorp Configuration Language (HCL)

Before we start making stuff with Terraform we have to dive a little into HashiCorp Configuration Language (HCL).
在我们开始使用 Terraform 创建基础设施之前，我们必须深入了解一下 HashiCorp 配置语言 (HCL)。
So far during our challenge, we have looked at a few different scripting and programming languages and here is another one.
到目前为止，在我们的挑战中，我们已经研究了几种不同的脚本和编程语言，现在是另一种。
We touched on the [Go programming language](day07.md) then [bash scripts](day19.md) we even touched on a little python when it came to [network automation](day27.md)
我们接触了 [Go 编程语言](day07.md)，然后是 [bash 脚本](day19.md)，甚至在涉及到 [网络自动化](day27.md) 时还接触了一点 Python。

Now we must cover HashiCorp Configuration Language (HCL) if this is the first time you are seeing the language it might look a little daunting but it's quite simple and very powerful.
现在我们必须介绍 HashiCorp 配置语言 (HCL)，如果您是第一次看到这种语言，它可能看起来有点吓人，但它非常简单且功能强大。

As we move through this section, we are going to be using examples that we can run locally on our system regardless of what OS you are using, we will be using VirtualBox, albeit not the infrastructure platform you would usually be using with Terraform.
当我们进行本节的学习时，我们将使用可以在本地系统上运行的示例，无论您使用的是什么操作系统。我们将使用 VirtualBox，尽管它通常不是您在使用 Terraform 时会使用的基础设施平台。
However running this locally, is free and will allow us to achieve what we are looking for in this post.
然而，在本地运行它是免费的，并且能让我们实现本文中想要达到的目的。
We could also extend this post's concept to docker or Kubernetes as well.
我们也可以将本文的概念扩展到 Docker 或 Kubernetes。

In general, though, you would or should be using Terraform to deploy your infrastructure in the public cloud (AWS, Google, Microsoft Azure) but then also in your virtualisation environments such as (VMware, Microsoft Hyper-V, Nutanix AHV).
总的来说，您应该使用 Terraform 将您的基础设施部署到公有云（AWS, Google, Microsoft Azure），也可以部署到您的虚拟化环境（例如 VMware, Microsoft Hyper-V, Nutanix AHV）。
In the public cloud Terraform allows for us to do a lot more than just Virtual Machine automated deployment, we can create all the required infrastructure such as PaaS workloads and all of the networking required assets such as VPCs and Security Groups.
在公有云中，Terraform 允许我们做的不仅仅是虚拟机自动化部署，我们还可以创建所有必需的基础设施，例如 PaaS 工作负载以及所有必需的网络资产，例如 VPC 和安全组。

There are two important aspects to Terraform, we have the code which we are going to get into in this post and then we also have the state.
Terraform 有两个重要的方面：我们将在这篇文章中深入探讨的代码，以及状态 (state)。
Both of these together could be called the Terraform core.
这两者结合起来可以称为 Terraform 核心。
We then have the environment we wish to speak to and deploy into, which is executed using Terraform providers, briefly mentioned in the last session, but we have an AWS provider, we have Azure providers etc.
然后是我们希望与之通信并部署到的环境，这是通过 Terraform Providers 执行的，在上次会议中简要提到过，但我们有 AWS provider、Azure provider 等。
There are hundreds.
这样的 Provider 有数百个。

### Basic Terraform Usage

Let's take a look at a Terraform `.tf` file to see how they are made up.
让我们看一下 Terraform 的 `.tf` 文件，了解它们是如何构成的。
The first example we will walk through will be code to deploy resources to AWS, this would then also require the AWS CLI to be installed on your system and configured for your account.
我们将要讲解的第一个示例是部署资源到 AWS 的代码，这需要您的系统上安装 AWS CLI 并为您的账户进行配置。

### Providers

At the top of our `.tf` file structure, generally called `main.tf` at least until we make things more complex.
在我们的 `.tf` 文件结构的顶部，通常称为 `main.tf`，至少在我们使其更复杂之前是这样。
Here we will define the providers that we have mentioned before.
在这里，我们将定义我们之前提到的 Provider。
Our source of the AWS provider as you can see is `hashicorp/aws` this means the provider is maintained or has been published by hashicorp themselves.
如您所见，我们的 AWS provider 来源是 `hashicorp/aws`，这意味着该 provider 由 HashiCorp 自己维护或发布。
By default you will reference providers that are available from the [Terraform Registry](https://registry.terraform.io/), you also can write your providers, and use these locally, or self-publish to the Terraform Registry.
默认情况下，您将引用 [Terraform Registry](https://registry.terraform.io/) 中可用的 Provider，您也可以编写自己的 Provider，并在本地使用它们，或自行发布到 Terraform Registry。

```
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}
```

We might also add in a region as well here to determine which AWS region we would like to provision to we can do this by adding the following:
我们可能还会在这里添加一个区域，以确定我们希望部署到哪个 AWS 区域，我们可以通过添加以下内容来实现：

```
provider "aws" {
  region = "ap-southeast-1" //region where resources need to be deployed
}
```

### Terraform Resources

- Another important component of a terraform config file which describes one or more infrastructure objects like EC2, Load Balancer, VPC, etc.
- Terraform 配置文件中的另一个重要组成部分，它描述了一个或多个基础设施对象，如 EC2、负载均衡器、VPC 等。
- A resource block declares a resource of a given type ("aws_instance") with a given local name ("90daysofdevops").
- 资源块声明了给定类型（"aws_instance"）且具有给定本地名称（"90daysofdevops"）的资源。
- The resource type and name together serve as an identifier for a given resource.
- 资源类型和名称共同作为给定资源的标识符。

```
resource "aws_instance" "90daysofdevops" {
  ami               = data.aws_ami.instance_id.id
  instance_type     = "t2.micro"
  availability_zone = "us-west-2a"
  security_groups   = [aws_security_group.allow_web.name]
  user_data         = <<-EOF
                #! /bin/bash
                sudo yum update
                sudo yum install -y httpd
                sudo systemctl start httpd
                sudo systemctl enable httpd
                echo "
<h1>Deployed via Terraform</h1>

" | sudo tee /var/www/html/index.html
        EOF
  tags = {
    Name = "Created by Terraform"
  }
}
```

You can see from the above we are also running a `yum` update and installing `httpd` into our ec2 instance.
从上面您可以看到，我们还在 EC2 实例中运行了 `yum` 更新并安装了 `httpd`。

If we now look at the complete main.tf file it might look something like this.
如果我们现在查看完整的 `main.tf` 文件，它可能看起来像这样。

```
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "default"
  region  = "us-west-2"
}

resource "aws_instance" "90daysofdevops" {
  ami           = "ami-830c94e3"
  instance_type = "t2.micro"
  availability_zone = "us-west-2a"
    user_data         = <<-EOF
                #! /bin/bash
                sudo yum update
                sudo yum install -y httpd
                sudo systemctl start httpd
                sudo systemctl enable httpd
                echo "
<h1>Deployed via Terraform</h1>

" | sudo tee /var/www/html/index.html
        EOF
  tags = {
    Name = "Created by Terraform"

  tags = {
    Name = "ExampleAppServerInstance"
  }
}
```

The above code will go and deploy a very simple web server as an ec2 instance in AWS, the great thing about this and any other configuration like this is that we can repeat this and we will get the same output every single time.
上面的代码将部署一个非常简单的 Web 服务器作为 AWS 中的 EC2 实例，这以及任何其他类似的配置的优点在于，我们可以重复执行它，并且每次都会得到相同的输出。
Other than the chance that I have messed up the code there is no human interaction with the above.
除了我可能搞砸代码的可能性之外，上述过程无需任何人为干预。

We can take a look at a super simple example, one that you will likely never use but let's humour it anyway.
我们可以看一个超级简单的例子，一个你可能永远不会使用的例子，但我们姑且看看。
Like with all good scripting and programming language we should start with a hello-world scenario.
就像所有优秀的脚本和编程语言一样，我们应该从“Hello World”场景开始。

```
terraform {
  # This module is now only being tested with Terraform 0.13.x. However, to make upgrading easier, we are setting
  # 0.12.26 as the minimum version, as that version added support for required_providers with source URLs, making it
  # forwards compatible with 0.13.x code.
  required_version = ">= 0.12.26"
}

# website::tag::1:: The simplest possible Terraform module: it just outputs "Hello, World!"
output "hello_world" {
  value = "Hello, 90DaysOfDevOps from Terraform"
}
```

You will find this file in the IAC folder under hello-world, but out of the box, this is not going to simply work there are some commands we need to run to use our terraform code.
您会在 IAC 文件夹下的 hello-world 目录中找到此文件，但它不会开箱即用，我们需要运行一些命令才能使用我们的 Terraform 代码。

In your terminal navigate to your folder where the main.tf has been created, this could be from this repository or you could create a new one using the code above.
在您的终端中，导航到创建 `main.tf` 的文件夹，这可以来自这个代码仓库，或者您可以使用上面的代码创建一个新的文件夹。

When in that folder we are going to run `terraform init`
在该文件夹中，我们将运行 `terraform init`。

We need to perform this on any directory where we have or before we run any terraform code.
我们需要在包含 Terraform 代码的任何目录中或在运行任何 Terraform 代码之前执行此操作。
Initialising a configuration directory downloads and installs the providers defined in the configuration, in this case, we have no providers but in the example above this would download the AWS provider for this configuration.
初始化配置目录会下载并安装配置中定义的 Provider，在这个示例中我们没有 Provider，但在上面的 AWS 示例中，它会为该配置下载 AWS Provider。

![](Images/Day58_IAC1.png)

The next command will be `terraform plan`
下一个命令将是 `terraform plan`。

The `terraform plan` command creates an execution plan, which lets you preview the changes that Terraform plans to make to your infrastructure.
`terraform plan` 命令会创建一个执行计划，让您可以预览 Terraform 计划对您的基础设施进行的更改。

You can simply see below that with our hello-world example we are going to see output if this was an AWS ec2 instance we would see all the steps that we will be creating.
您可以在下面简单地看到，在我们的 hello-world 示例中，我们将看到输出；如果这是一个 AWS EC2 实例，我们将看到所有将被创建的步骤。

![](Images/Day58_IAC2.png)

At this point, we have initialised our repository and we have our providers downloaded where required, we have run a test walkthrough to make sure this is what we want to see so now we can run and deploy our code.
至此，我们已经初始化了我们的仓库，并在需要时下载了我们的 Provider，我们已经运行了测试演练以确保这是我们想要看到的结果，所以现在我们可以运行和部署我们的代码了。

`terraform apply` allows us to do this there is a built-in safety measure to this command and this will again give you a plan view on what is going to happen which warrants a response from you to say yes to continue.
`terraform apply` 允许我们执行此操作。此命令具有内置的安全措施，它会再次为您提供一个关于将要发生的事情的计划视图，需要您回复 “yes” 才能继续。

![](Images/Day58_IAC3.png)

When we type in yes to enter a value, our code is deployed.
当我们输入 yes 确认时，我们的代码就被部署了。
Not that exciting but you can see we have the output that we defined in our code.
虽然不是那么令人兴奋，但您可以看到我们获得了在代码中定义的输出。

![](Images/Day58_IAC4.png)

Now we have not deployed anything, we have not added, changed or destroyed anything but if we did then we would see that indicated also in the above.
现在我们还没有部署任何东西，我们没有添加、更改或销毁任何东西，但如果部署了，我们也会在上面看到相应的指示。
If however we had deployed something and we wanted to get rid of everything we deployed we can use the `terraform destroy` command.
但是，如果部署了某些东西，并且我们想清除所有部署的内容，我们可以使用 `terraform destroy` 命令。
Again this has that safety where you have to type yes although you can use `--auto-approve` on the end of your `apply` and `destroy` commands to bypass that manual intervention.
同样，这也有安全措施，您必须输入 yes 确认，尽管您可以在 `apply` 和 `destroy` 命令的末尾使用 `--auto-approve` 来绕过手动干预。
But I would advise only using this shortcut when learning and testing as everything will disappear sometimes faster than it was built.
但我建议仅在学习和测试时使用此快捷方式，因为有时一切都会比构建速度更快地消失。

From this, there are 4 commands we have covered from the Terraform CLI.
由此，我们介绍了 Terraform CLI 中的 4 个命令。

- `terraform init` = get your project folder ready with providers
- `terraform init` = 使用 Provider 准备您的项目文件夹
- `terraform plan` = show what is going to be created, and changed during the next command based on our code.
- `terraform plan` = 根据我们的代码，显示在下一个命令期间将创建和更改的内容。
- `terraform apply` = will go and deploy the resources defined in our code.
- `terraform apply` = 将部署我们代码中定义的资源。
- `terraform destroy` = will destroy the resources we have created in our project
- `terraform destroy` = 将销毁我们在项目中创建的资源

We also covered two important aspects of our code files.
我们还介绍了代码文件的两个重要方面。

- providers = how does terraform speak to the end platform via APIs
- providers = Terraform 如何通过 API 与目标平台进行通信
- resources = what it is we want to deploy with code
- resources = 我们希望用代码部署什么

Another thing to note when running `terraform init` take a look at the tree on the folder before and after to see what happens and where we store providers and modules.
运行 `terraform init` 时需要注意的另一件事是，查看文件夹运行前后的树结构，看看发生了什么以及我们在哪里存储 Provider 和模块。

### Terraform state

We also need to be aware of the state file that is created also inside our directory and for this hello world example our state file is simple.
我们还需要注意在我们的目录中创建的状态文件（state file），对于这个 hello world 示例，我们的状态文件很简单。
This is a JSON file which is the representation of the world according to Terraform.
这是一个 JSON 文件，它代表了 Terraform 眼中的“世界”状态。
The state will happily show off your sensitive data so be careful and as a best practice put your `.tfstate` files in your `.gitignore` folder before uploading to GitHub.
状态文件会高兴地展示您的敏感数据，因此请务必小心，最佳实践是在上传到 GitHub 之前将您的 `.tfstate` 文件放入您的 `.gitignore` 文件夹中。

By default, the state file as you can see lives inside the same directory as your project code, but it can also be stored remotely as an option.
默认情况下，如您所见，状态文件位于与项目代码相同的目录中，但它也可以选择远程存储。
In a production environment, this is likely going to be a shared location such as an S3 bucket.
在生产环境中，这很可能是一个共享位置，例如 S3 存储桶。

Another option could be Terraform Cloud, this is a paid-for-managed service. (Free up to 5 users)
另一个选择是 Terraform Cloud，这是一项付费的托管服务。（5 个用户以下免费）

The pros for storing state in a remote location are that we get:
在远程位置存储状态文件的优点是我们获得了：

- Sensitive data encrypted
- 敏感数据加密
- Collaboration
- 协作性
- Automation
- 自动化
- However, it could bring increase the complexity
- 但是，它可能会增加复杂性

```JSON
{
  "version": 4,
  "terraform_version": "1.1.6",
  "serial": 1,
  "lineage": "a74296e7-670d-0cbb-a048-f332696ca850",
  "outputs": {
    "hello_world": {
      "value": "Hello, 90DaysOfDevOps from Terraform",
      "type": "string"
    }
  },
  "resources": []
}
```

## Resources

I have listed a lot of resources down below and I think this topic has been covered so many times out there, If you have additional resources be sure to raise a PR with your resources and I will be happy to review and add them to the list.
我在下面列出了许多资源，我认为这个主题已经被很多人讨论过很多次了。如果您有额外的资源，请务必提交 PR，我将很乐意审查并将它们添加到列表中。

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

See you on [Day 59](day59.md)
我们第 [59 天](day59.md) 见
