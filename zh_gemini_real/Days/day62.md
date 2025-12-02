---
title: '#90DaysOfDevOps - Testing, Tools & Alternatives - Day 62'
published: false
description: '90DaysOfDevOps - Testing, Tools & Alternatives'
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049053
---

## Testing, Tools & Alternatives

As we close out this section on Infrastructure as Code we must mention testing our code, the various tools available and then some of the alternatives to Terraform to achieve this.
随着我们结束基础设施即代码（IaC）这一章节，我们必须提及代码测试、各种可用工具，以及实现该目标的 Terraform 替代方案。
As I said at the start of the section my focus was on Terraform because it is firstly free and open source, secondly, it is cross-platform and agnostic to environments.
正如我在本章节开始时所说，我的重点放在 Terraform 上，因为它首先是免费且开源的，其次，它是跨平台且与环境无关的。
But there are also alternatives out there that should be considered but the overall goal is to make people aware that this is the way to deploy your infrastructure.
但市场上也有其他值得考虑的替代方案，不过总目标是让人们意识到这是部署基础设施的方式。

### Code Rot

The first area I want to cover in this session is code rot, unlike application code, infrastructure as code might get used and then not for a very long time.
在本节中，我想讨论的第一个领域是代码腐化（code rot），与应用程序代码不同，基础设施即代码可能在使用一次之后很长一段时间内都不会再次使用。
Let's take the example that we are going to be using Terraform to deploy our VM environment in AWS, perfect and it works the first time and we have our environment, but this environment doesn't change too often so the code gets left the state possibly or hopefully stored in a central location but the code does not change.
举例来说，我们要使用 Terraform 在 AWS 中部署 VM 环境，完美运行，我们拥有了环境，但由于该环境不经常变化，代码就被搁置了，其状态可能会（或者希望）存储在一个中心位置，但代码本身没有变化。

What if something changes in the infrastructure? But it is done out of band, or other things change in our environment.
如果基础设施中的某些东西发生了变化怎么办？但它是带外（out of band）完成的，或者我们环境中的其他事物发生了变化。

- Out of band changes
- Unpinned versions
- Deprecated dependencies
- Unapplied changes

### Testing

Another huge area that follows on from code rot and in general is the ability to test your IaC and make sure all areas are working the way they should.
另一个与代码腐化紧密相关且普遍存在的重要领域是测试您的 IaC 的能力，确保所有部分都按预期方式工作。

First up there are some built-in testing commands we can take a look at:
首先，我们可以查看一些内置的测试命令：

| Command              | Description                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `terraform fmt`      | Rewrite Terraform configuration files to a canonical format and style.                     |
| `terraform validate` | Validates the configuration files in a directory, referring only to the configuration      |
| `terraform plan`     | Creates an execution plan, which lets you preview the changes that Terraform plans to make |
| Custom validation    | Validation of your input variables to ensure they match what you would expect them to be   |

We also have some testing tools available external to Terraform:
我们还有一些 Terraform 外部的测试工具：

- [tflint](https://github.com/terraform-linters/tflint)

  - Find possible errors
  - Warn about deprecated syntax and unused declarations.
  - Enforce best practices, and naming conventions.

Scanning tools

- [checkov](https://www.checkov.io/) - scans cloud infrastructure configurations to find misconfigurations before they're deployed.
- [tfsec](https://aquasecurity.github.io/tfsec/v1.4.2/) - static analysis security scanner for your Terraform code.
- [terrascan](https://github.com/accurics/terrascan) - static code analyser for Infrastructure as Code.
- [terraform-compliance](https://terraform-compliance.com/) - a lightweight, security and compliance-focused test framework against terraform to enable the negative testing capability for your infrastructure-as-code.
- [snyk](https://docs.snyk.io/products/snyk-infrastructure-as-code/scan-terraform-files/scan-and-fix-security-issues-in-terraform-files) - scans your Terraform code for misconfigurations and security issues

Managed Cloud offering

- [Terraform Sentinel](https://www.terraform.io/cloud-docs/sentinel) - embedded policy-as-code framework integrated with the HashiCorp Enterprise products. It enables fine-grained, logic-based policy decisions, and can be extended to use information from external sources.

### Automated testing

- [Terratest](https://terratest.gruntwork.io/) - Terratest is a Go library that provides patterns and helper functions for testing infrastructure
- Terratest makes it easier to write automated tests for our infrastructure code. It provides a variety of helper functions and patterns for common infrastructure testing.
- find code at 2022/Days/IaC/Terratest
- To Run this application
  * git clone #repo_url# <br />
  * cd test  <br />
  * go mod init "<MODULE_NAME>"  <br />
  **MODULE_NAME would be github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>**  <br />
  * go mod init github.com/<FOLDER-PATH>  <br/>
  * go run

--------------------------------------------------------------------------------------------------------------------------------------------------------------------

go mod init "<MODULE_NAME>" would create go.mod file into test folder.  <br />
go mod init "<MODULE_NAME>" 将会在 test 文件夹中创建 go.mod 文件。
* The go.mod file is the root of dependency management in GoLang. 
* go.mod 文件是 GoLang 中依赖管理的根文件。
* All the modules which are needed or to be used in the project are maintained here in go.mod file.
* 项目中所有需要或将要使用的模块都在此 go.mod 文件中维护。
* It creates entry for all the packages we are going to use/import in our project.
* 它为我们将在项目中使用的/导入的所有包创建条目。
* It reduces effort for getting each dependencies manually.
* 它减少了手动获取每个依赖项的工作量。

On running **go test** for the first time you would get go.sum file created. <br />
第一次运行 **go test** 时，您会创建 go.sum 文件。
* go.sum file is created when **go test** or **go build** is executed for the first time.
* go.sum 文件是在首次执行 **go test** 或 **go build** 时创建的。
* It installs all the packages with specific version(latest)
* 它会安装所有具有特定版本（最新版本）的包。
* we do not need to edit or modify this file.
* 我们不需要编辑或修改此文件。


Worth a mention

- [Terraform Cloud](https://cloud.hashicorp.com/products/terraform) - Terraform Cloud is HashiCorp’s managed service offering. It eliminates the need for unnecessary tooling and documentation for practitioners, teams, and organizations to use Terraform in production.

- [Terragrunt](https://terragrunt.gruntwork.io/) - Terragrunt is a thin wrapper that provides extra tools for keeping your configurations DRY, working with multiple Terraform modules, and managing remote state.

- [Atlantis](https://www.runatlantis.io/) - Terraform Pull Request Automation

### Alternatives

We mentioned on Day 57 when we started this section that there were some alternatives and I very much plan on exploring this following on from this challenge.
我们在第 57 天开始本章节时提到了一些替代方案，我非常计划在本次挑战之后探索它们。

| Cloud Specific                  | Cloud Agnostic |
| ------------------------------- | -------------- |
| AWS CloudFormation              | Terraform      |
| Azure Resource Manager          | Pulumi         |
| Google Cloud Deployment Manager |                |

I have used AWS CloudFormation probably the most out of the above list and native to AWS but I have not used the others other than Terraform.
在上面的列表中，我使用 AWS CloudFormation 的次数可能最多，它是 AWS 原生的，但我除了 Terraform 之外没有使用过其他工具。
As you can imagine the cloud-specific versions are very good in that particular cloud but if you have multiple cloud environments then you are going to struggle to migrate those configurations or you are going to have multiple management planes for your IaC efforts.
可以想象，特定于云的版本在特定云中非常好用，但如果您拥有多个云环境，那么您将难以迁移这些配置，或者您的 IaC 工作将需要多个管理平面。

I think an interesting next step for me is to take some time and learn more about [Pulumi](https://www.pulumi.com/)
我认为对我来说，下一个有趣的步骤是花一些时间了解更多关于 [Pulumi](https://www.pulumi.com/) 的知识。

From a Pulumi comparison on their site
根据 Pulumi 网站上的比较：

> "Both Terraform and Pulumi offer the desired state infrastructure as code model where the code represents the desired infrastructure state and the deployment engine compares this desired state with the stack’s current state and determines what resources need to be created, updated or deleted."
> “Terraform 和 Pulumi 都提供了期望状态的基础设施即代码模型，其中代码代表期望的基础设施状态，部署引擎将此期望状态与堆栈的当前状态进行比较，并确定需要创建、更新或删除哪些资源。”

The biggest difference I can see is that unlike the HashiCorp Configuration Language (HCL) Pulumi allows for general-purpose languages like Python, TypeScript, JavaScript, Go and .NET.
我能看到的最大区别是，与 HashiCorp 配置语言 (HCL) 不同，Pulumi 允许使用通用语言，如 Python、TypeScript、JavaScript、Go 和 .NET。

A quick overview [Introduction to Pulumi: Modern Infrastructure as Code](https://www.youtube.com/watch?v=QfJTJs24-JM) I like the ease and choices you are prompted with and want to get into this a little more.
快速概览 [Pulumi 简介：现代基础设施即代码](https://www.youtube.com/watch?v=QfJTJs24-JM) 我喜欢它提示的简易性和选择，并希望更深入地研究一下。

This wraps up the Infrastructure as code section and next we move on to that little bit of overlap with configuration management in particular as we get past the big picture of configuration management we are going to be using Ansible for some of those tasks and demos.
这总结了基础设施即代码这一章节，接下来我们将转向与配置管理有一点重叠的部分，特别是当我们回顾配置管理的宏观概念之后，我们将使用 Ansible 来完成一些任务和演示。

## Resources

I have listed a lot of resources down below and I think this topic has been covered so many times out there, If you have additional resources be sure to raise a PR with your resources and I will be happy to review and add them to the list.
我在下面列出了许多资源，而且我认为这个主题在网上已经被多次涵盖。如果您有额外的资源，请务必提交 PR，我很乐意审核并将它们添加到列表中。

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
- [Pulumi - IaC in your favorite programming language!](https://www.youtube.com/watch?v=vIjeiDcsR3Q&t=51s)

See you on [Day 63](day63.md)