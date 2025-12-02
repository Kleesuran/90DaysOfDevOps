---
title: '#90DaysOfDevOps - All other things Ansible - Automation Controller (Tower), AWX, Vault - Day 69'
published: false
description: '90DaysOfDevOps - All other things Ansible - Automation Controller (Tower), AWX, Vault'
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048714
---

## All other things Ansible - Automation Controller (Tower), AWX, Vault

Rounding out the section on Configuration Management I wanted to have a look into the other areas that you might come across when dealing with Ansible.
在结束配置管理这一章节时，我想研究一下在使用 Ansible 时可能会遇到的其他领域。

There are a lot of products that make up the Ansible Automation platform.
构成 Ansible 自动化平台的产品有很多。

Red Hat Ansible Automation Platform is a foundation for building and operating automation across an organization. The platform includes all the tools needed to implement enterprise-wide automation.
Red Hat Ansible 自动化平台是跨组织构建和运行自动化的基础。该平台包含了实施企业级自动化所需的所有工具。

![](Images/Day69_config1.png)

I will try and cover some of these in this post. But for more information then the official Red Hat Ansible site is going to have lots more information. [Ansible.com](https://www.ansible.com/?hsLang=en-us)
我将尝试在本文中介绍其中一些内容。但要了解更多信息，官方的 Red Hat Ansible 网站会提供更多资料。 [Ansible.com](https://www.ansible.com/?hsLang=en-us)

### Ansible Automation Controller | AWX

I have bundled these two together because the Automation Controller and AWX are very similar in what they offer.
我将这两者捆绑在一起，因为自动化控制器（Automation Controller）和 AWX 在提供的功能上非常相似。

The AWX project or AWX for short is an open-source community project, sponsored by Red Hat that enables you to better control your Ansible projects within your environments. AWX is the upstream project from which the automation controller component is derived.
AWX 项目，简称 AWX，是一个由 Red Hat 赞助的开源社区项目，使您能够更好地控制环境中的 Ansible 项目。AWX 是衍生出自动化控制器组件的上游项目。

If you are looking for an enterprise solution then you will be looking for the Automation Controller or you might have previously heard this as Ansible Tower. The Ansible Automation Controller is the control plane for the Ansible Automation Platform.
如果您正在寻找企业解决方案，那么您需要的是自动化控制器（Automation Controller），或者您以前可能听说过 Ansible Tower 这个名称。Ansible 自动化控制器是 Ansible 自动化平台的控制平面。

Both AWX and the Automation Controller bring the following features above everything else we have covered in this section thus far.
AWX 和自动化控制器都带来了以下功能，这些功能超出了我们迄今为止在本节中介绍的所有内容。

- User Interface
- 用户界面
- Role-Based Access Control
- 基于角色的访问控制
- Workflows
- 工作流
- CI/CD integration
- CI/CD 集成

The Automation Controller is the enterprise offering where you pay for your support.
自动化控制器是企业级产品，您需要付费购买支持服务。

We are going to take a look at deploying AWX within our minikube Kubernetes environment.
我们将研究如何在 minikube Kubernetes 环境中部署 AWX。

### Deploying Ansible AWX

AWX does not need to be deployed to a Kubernetes cluster, the [github](https://github.com/ansible/awx) for AWX from ansible will give you that detail. However starting in version 18.0, the AWX Operator is the preferred way to install AWX.
AWX 不需要部署到 Kubernetes 集群，Ansible 的 AWX [github](https://github.com/ansible/awx) 页面将提供相关详细信息。然而，从 18.0 版本开始，AWX Operator 是安装 AWX 的首选方式。

First of all, we need a minikube cluster. We can do this if you followed along during the Kubernetes section by creating a new minikube cluster with the `minikube start --cpus=4 --memory=6g --addons=ingress` command.
首先，我们需要一个 minikube 集群。如果您在 Kubernetes 章节中跟随操作，可以通过运行 `minikube start --cpus=4 --memory=6g --addons=ingress` 命令来创建一个新的 minikube 集群。

![](Images/Day69_config2.png)

The official [Ansible AWX Operator](https://github.com/ansible/awx-operator) can be found here. As stated in the install instructions you should clone this repository and then run through the deployment.
官方的 [Ansible AWX Operator](https://github.com/ansible/awx-operator) 可以在这里找到。正如安装说明中所述，您应该克隆此存储库，然后运行部署。

I forked the repo above and then ran `git clone https://github.com/MichaelCade/awx-operator.git` my advice is you do the same and do not use my repository as I might change things or it might not be there.
我分叉了上面的存储库，然后运行了 `git clone https://github.com/MichaelCade/awx-operator.git` 我的建议是您也这样做，并且不要使用我的存储库，因为我可能会更改内容或者它可能不存在了。

In the cloned repository you will find an awx-demo.yml file we need to change `NodePort` for `ClusterIP` as per below:
在克隆的存储库中，您会找到一个 awx-demo.yml 文件，我们需要将 `NodePort` 更改为 `ClusterIP`，如下所示：

```Yaml
---
apiVersion: awx.ansible.com/v1beta1
kind: AWX
metadata:
  name: awx-demo
spec:
  service_type: ClusterIP
```

The next step is to define our namespace where we will be deploying the awx operator, using the `export NAMESPACE=awx` command then followed by `make deploy` we will start the deployment.
下一步是定义我们将部署 awx operator 的命名空间，使用 `export NAMESPACE=awx` 命令，然后是 `make deploy`，我们将开始部署。

![](Images/Day69_config3.png)

In checking we have our new namespace and we have our awx-operator-controller pod running in our namespace. `kubectl get pods -n awx`
检查结果显示我们有了新的命名空间，并且我们的 awx-operator-controller pod 正在该命名空间中运行。 `kubectl get pods -n awx`

![](Images/Day69_config4.png)

Within the cloned repository you will find a file called awx-demo.yml we now want to deploy this into our Kubernetes cluster and our awx namespace. `kubectl create -f awx-demo.yml -n awx`
在克隆的存储库中，您会找到一个名为 awx-demo.yml 的文件，我们现在想将其部署到我们的 Kubernetes 集群和 awx 命名空间中。 `kubectl create -f awx-demo.yml -n awx`

![](Images/Day69_config5.png)

You can keep an eye on the progress with `kubectl get pods -n awx -w` which will keep a visual watch on what is happening.
您可以使用 `kubectl get pods -n awx -w` 来关注进度，它将实时监视正在发生的事情。

You should have something that resembles the image you see below when everything is running.
当一切正常运行时，您应该看到类似于下图所示的内容。

![](Images/Day69_config6.png)

Now we should be able to access our awx deployment after running in a new terminal `minikube service awx-demo-service --url -n $NAMESPACE` to expose this through the minikube ingress.
现在，我们应该能够访问我们的 awx 部署了，在新的终端中运行 `minikube service awx-demo-service --url -n $NAMESPACE` 通过 minikube ingress 暴露它。

![](Images/Day69_config7.png)

If we then open a browser to that address [] you can see we are prompted for username and password.
如果我们随后在浏览器中打开该地址 []，您会看到系统提示输入用户名和密码。

![](Images/Day69_config8.png)

The username by default is admin, to get the password we can run the following command to get this `kubectl get secret awx-demo-admin-password -o jsonpath="{.data.password}" -n awx| base64 --decode`
默认的用户名是 admin，要获取密码，我们可以运行以下命令： `kubectl get secret awx-demo-admin-password -o jsonpath="{.data.password}" -n awx| base64 --decode`

![](Images/Day69_config9.png)

This then gives you a UI to manage your playbook and configuration management tasks in a centralised location, it also allows you as a team to work together vs what we have been doing so far here where we have been running from one ansible control station.
这样您就可以获得一个 UI，用于在集中位置管理您的 playbook 和配置管理任务，它还允许您的团队协同工作，而不是像我们目前为止那样仅从单个 Ansible 控制站运行。

This is another one of those areas where you could probably go and spend another length of time walking through the capabilities within this tool.
这是另一个您可以花更多时间来研究此工具内功能的领域。

I will call out a great resource from Jeff Geerling, which goes into more detail on using Ansible AWX. [Ansible 101 - Episode 10 - Ansible Tower and AWX](https://www.youtube.com/watch?v=iKmY4jEiy_A&t=752s)
我将推荐 Jeff Geerling 的一个很棒的资源，其中更详细地介绍了如何使用 Ansible AWX。 [Ansible 101 - Episode 10 - Ansible Tower and AWX](https://www.youtube.com/watch?v=iKmY4jEiy_A&t=752s)

In this video, he also goes into great detail on the differences between Automation Controller (Previously Ansible Tower) and Ansible AWX (Free and Open Source).
在这个视频中，他还详细介绍了自动化控制器（以前的 Ansible Tower）和 Ansible AWX（免费和开源）之间的区别。

### Ansible Vault

`ansible-vault` allows us to encrypt and decrypt Ansible data files. Throughout this section, we have skipped over and put some of our sensitive information in plain text.
`ansible-vault` 允许我们加密和解密 Ansible 数据文件。在整个这一节中，我们忽略了这个问题，将一些敏感信息以纯文本形式放置。

Built into the Ansible binary is `ansible-vault` which allows us to mask away this sensitive information.
`ansible-vault` 内置于 Ansible 二进制文件中，它允许我们隐藏这些敏感信息。

![](Images/Day69_config10.png)

Secrets Management has progressively become another area in which more time should have been spent alongside tools such as HashiCorp Vault or the AWS Key Management Service. I will mark this as an area to dive deeper into.
秘密管理已逐渐成为另一个应该投入更多时间的领域，以及像 HashiCorp Vault 或 AWS Key Management Service 这样的工具。我将把这标记为一个值得深入研究的领域。

I am going to link a great resource and demo to run through from Jeff Geerling again [Ansible 101 - Episode 6 - Ansible Vault and Roles](https://www.youtube.com/watch?v=JFweg2dUvqM)
我将再次链接 Jeff Geerling 的一个很棒的资源和演示，供大家观看 [Ansible 101 - Episode 6 - Ansible Vault and Roles](https://www.youtube.com/watch?v=JFweg2dUvqM)

### Ansible Galaxy (Docs)

Now, we have already used `ansible-galaxy` to create some of our roles and file structure for our demo project. But we also have [Ansible Galaxy documentation](https://galaxy.ansible.com/docs/)
现在，我们已经使用 `ansible-galaxy` 为我们的演示项目创建了一些角色和文件结构。但我们也有 [Ansible Galaxy documentation](https://galaxy.ansible.com/docs/)。

"Galaxy is a hub for finding and sharing Ansible content."
“Galaxy 是查找和分享 Ansible 内容的中心。”

### Ansible Testing

- [Ansible Molecule](https://molecule.readthedocs.io/en/latest/) - The molecule project is designed to aid in the development and testing of Ansible roles
- [Ansible Molecule](https://molecule.readthedocs.io/en/latest/) - Molecule 项目旨在协助 Ansible 角色的开发和测试

- [Ansible Lint](https://ansible-lint.readthedocs.io/en/latest/) - CLI tool for linting playbooks, roles and collections
- [Ansible Lint](https://ansible-lint.readthedocs.io/en/latest/) - 用于对 playbook、角色和集合进行 linting 的 CLI 工具

### Other Resource

- [Ansible Documentation](https://docs.ansible.com/ansible/latest/index.html)
- [Ansible Documentation](https://docs.ansible.com/ansible/latest/index.html)

## Resources

- [What is Ansible](https://www.youtube.com/watch?v=1id6ERvfozo)
- [What is Ansible](https://www.youtube.com/watch?v=1id6ERvfozo)
- [Ansible 101 - Episode 1 - Introduction to Ansible](https://www.youtube.com/watch?v=goclfp6a2IQ)
- [Ansible 101 - Episode 1 - Introduction to Ansible](https://www.youtube.com/watch?v=goclfp6a2IQ)
- [NetworkChuck - You need to learn Ansible right now!](https://www.youtube.com/watch?v=5hycyr-8EKs&t=955s)
- [NetworkChuck - You need to learn Ansible right now!](https://www.youtube.com/watch?v=5hycyr-8EKs&t=955s)
- [Your complete guide to Ansible](https://www.youtube.com/playlist?list=PLnFWJCugpwfzTlIJ-JtuATD2MBBD7_m3u)
- [Your complete guide to Ansible](https://www.youtube.com/playlist?list=PLnFWJCugpwfzTlIJ-JtuATD2MBBD7_m3u)

This final playlist listed above is where a lot of the code and ideas came from for this section, a great resource and walkthrough in video format.
上面列出的最后一个播放列表是本节中许多代码和想法的来源，这是一个很棒的视频格式资源和演练。

This post wraps up our look into configuration management, we next move into CI/CD Pipelines and some of the tools and processes that we might see and use out there to achieve this workflow for our application development and release.
本文结束了我们对配置管理的研究，接下来我们将转向 CI/CD 流水线以及我们可能会看到和使用的一些工具和流程，以实现应用程序开发和发布的这一工作流程。

See you on [Day 70](day70.md)
在 [第 70 天](day70.md) 见
