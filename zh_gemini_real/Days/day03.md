---
title: '#90DaysOfDevOps - Application Focused - Day 3'
published: false
description: 90DaysOfDevOps - Application Focused
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048825
---

## DevOps Lifecycle - Application Focused

As we continue through these next few weeks we are 100% going to come across these titles (Continuous Development, Testing, Deployment, Monitor) over and over again, If you are heading towards the DevOps Engineer role then repeatability will be something you will get used to but constantly enhancing each time is another thing that keeps things interesting.
在接下来的几周里，我们将百分之百地反复遇到这些主题（持续开发、测试、部署、监控）。如果你正朝着 DevOps 工程师的角色迈进，那么重复性将是你需要习惯的事情，但每一次都不断改进则是保持趣味性的另一要素。

In this hour we are going to take a look at the high-level view of the application from start to finish and then back around again like a constant loop.
在本小时的学习中，我们将从宏观角度审视应用程序从开始到结束，然后像一个持续的循环一样再次返回的过程。

### Development

Let's take a brand new example of an Application, to start with we have nothing created, maybe as a developer, you have to discuss with your client or end user the requirements and come up with some sort of plan or requirements for your Application. We then need to create from the requirements our brand new application.
让我们以一个全新的应用程序为例，刚开始时我们没有任何已创建的内容，也许作为开发人员，你需要与客户或最终用户讨论需求，并为你的应用程序制定某种计划或需求。然后，我们需要根据这些需求来创建全新的应用程序。

In regards to tooling at this stage, there is no real requirement here other than choosing your IDE and the programming language you wish to use to write your application.
在此阶段的工具方面，除了选择你的 IDE 和你想用来编写应用程序的编程语言之外，没有其他硬性要求。

As a DevOps engineer, remember you are probably not the one creating this plan or coding the application for the end user, this will be a skilled developer.
作为一名 DevOps 工程师，请记住，你可能不是为最终用户制定此计划或编写应用程序代码的人，这通常会由熟练的开发人员来完成。

But it also would not hurt for you to be able to read some of the code so that you can make the best infrastructure decisions moving forward for your application.
但对你来说，能够阅读部分代码也无妨，这样你就能为你的应用程序做出最佳的后续基础设施决策。

We previously mentioned that this application can be written in any language. Importantly this should be maintained using a version control system, this is something we will cover also in detail later on and in particular, we will dive into **Git**.
我们之前提到过，这个应用程序可以用任何语言编写。重要的是，它应该使用版本控制系统进行维护，这也是我们稍后将详细介绍的内容，特别是我们将深入探讨 **Git**。

It is also likely that it will not be one developer working on this project although this could be the case even so best practices would require a code repository to store and collaborate on the code, this could be private or public and could be hosted or privately deployed generally speaking you would hear the likes of **GitHub or GitLab** being used as a code repository. Again we will cover these as part of our section on **Git** later on.
此外，这个项目很可能不是由一名开发人员独立完成的，尽管也有可能是这种情况，但最佳实践要求使用代码仓库来存储代码和进行协作，这可以是私有的或公共的，可以是托管的或私下部署的。一般来说，你会听说像 **GitHub or GitLab** 这样的平台被用作代码仓库。同样，我们将在稍后的 **Git** 部分中介绍这些内容。

### Testing

At this stage, we have our requirements and we have our application being developed. But we need to make sure we are testing our code in all the different environments that we have available to us or specifically maybe to the programming language chosen.
在这个阶段，我们已经有了需求，并且正在开发我们的应用程序。但是我们需要确保在所有可用的不同环境中测试我们的代码，或者特别是针对所选择的编程语言进行测试。

This phase enables QA to test for bugs, more frequently we see containers being used for simulating the test environment which overall can improve on cost overheads of physical or cloud infrastructure.
此阶段使质量保证 (QA) 能够测试 Bug，我们更频繁地看到容器被用于模拟测试环境，这总体上可以改善物理或云基础设施的成本开销。

This phase is also likely going to be automated as part of the next area which is Continuous Integration.
这个阶段也很可能会作为下一个领域——持续集成的一部分——被自动化。

The ability to automate this testing vs 10s,100s or even 1000s of QA engineers having to do this manually speaks for itself, these engineers can focus on something else within the stack to ensure you are moving faster and developing more functionality vs testing bugs and software which tends to be the hold up on most traditional software releases that use a waterfall methodology.
能够自动化测试，而不是让数十、数百甚至数千名质量保证工程师手动操作，其优势不言而喻。这些工程师可以专注于堆栈中的其他工作，确保你能够更快地推进并开发更多功能，而不是受限于测试 Bug 和软件，后者往往是大多数采用瀑布方法学的传统软件发布的瓶颈。

### Integration

Quite importantly Integration is at the middle of the DevOps lifecycle. It is the practice in which developers require to commit changes to the source code more frequently. This could be on a daily or weekly basis.
非常重要的是，集成处于 DevOps 生命周期的中间位置。这是一种要求开发人员更频繁地向源代码提交更改的实践。这可能是每天或每周进行一次。

With every commit, your application can go through the automated testing phases and this allows for early detection of issues or bugs before the next phase.
每进行一次提交，你的应用程序都可以通过自动化测试阶段，这有助于在进入下一阶段之前尽早发现问题或 Bug。

Now you might at this stage be saying "but we don't create applications, we buy it off the shelf from a software vendor" Don't worry many companies do this and will continue to do this and it will be the software vendor that is concentrating on the above 3 phases but you might want to still adopt the final phase as this will enable for faster and more efficient deployments of your off the shelf deployments.
现在，你可能在想：“但我们不创建应用程序，我们是从软件供应商那里购买现成的。”别担心，许多公司都是这样做的，并将继续这样做，软件供应商会专注于上面提到的前三个阶段，但你可能仍然希望采用最后的阶段，因为这将使你的现成部署更快、更高效。

I would also suggest just having this above knowledge is very important as you might buy off the shelf software today, but what about tomorrow or down the line... next job maybe?
我也会建议你掌握上述知识，因为这非常重要，你可能今天购买了现成的软件，但明天或将来呢……也许是下一份工作？

### Deployment

Ok so we have our application built and tested against the requirements of our end user and we now need to go ahead and deploy this application into production for our end users to consume.
好的，现在我们的应用程序已经构建完成，并根据最终用户的需求进行了测试，我们现在需要将这个应用程序部署到生产环境供最终用户使用。

This is the stage where the code is deployed to the production servers, now this is where things get extremely interesting and it is where the rest of our 86 days dives deeper into these areas. Because different applications require different possibly hardware or configurations. This is where **Application Configuration Management** and **Infrastructure as Code** could play a key part in your DevOps lifecycle. It might be that your application is **Containerised** but also available to run on a virtual machine. This then also leads us onto platforms like **Kubernetes** which would be orchestrating those containers and making sure you have the desired state available to your end users.
这是代码部署到生产服务器的阶段，现在事情变得非常有趣，这也是我们接下来的 86 天将深入探讨的领域。因为不同的应用程序可能需要不同的硬件或配置。这就是 **Application Configuration Management**（应用程序配置管理）和 **Infrastructure as Code**（基础设施即代码）可以在你的 DevOps 生命周期中发挥关键作用的地方。你的应用程序可能是 **Containerised**（容器化）的，但也可能可以在虚拟机上运行。这也会将我们引向 **Kubernetes** 这样的平台，它将编排这些容器，并确保你的最终用户能够获得所需的期望状态。

Of these bold topics, we will go into more detail over the next few weeks to get a better foundational knowledge of what they are and when to use them.
对于这些加粗的主题，我们将在接下来的几周内进行更详细的探讨，以获得关于它们是什么以及何时使用它们的更好基础知识。

### Monitoring

Things are moving fast here and we have our Application that we are continuously updating with new features and functionality and we have our testing making sure no gremlins are being found. We have the application running in our environment that can be continually keeping the required configuration and performance.
事情发展很快，我们正在持续更新具有新特性和功能的应用程序，并且我们通过测试确保没有发现任何隐患（gremlins）。我们的应用程序在环境中运行，可以持续保持所需的配置和性能。

But now we need to be sure that our end users are getting the experience they require. Here we need to make sure that our Application Performance is continuously being monitored, this phase is going to allow your developers to make better decisions about enhancements to the application in future releases to better serve the end users.
但现在我们需要确保我们的最终用户获得了他们所需的体验。在这里，我们需要确保应用程序性能得到持续监控，这个阶段将允许你的开发人员在未来的版本中做出关于应用程序增强的更好决策，以便更好地服务最终用户。

This section is also where we are going to capture that feedback wheel about the features that have been implemented and how the end users would like to make these better for them.
本节也是我们将捕获关于已实现功能以及最终用户希望如何改进这些功能的反馈循环的地方。

Reliability is a key factor here as well, at the end of the day we want our Application to be available all the time it is required. This then leads to other **observability, security and data management** areas that should be continuously monitored and feedback can always be used to better enhance, update and release the application continuously.
可靠性也是这里的关键因素，毕竟我们希望我们的应用程序在需要时始终可用。这随后引出了其他**可观测性 (observability)、安全和数据管理**领域，这些领域应该持续受到监控，并且反馈始终可以用于不断增强、更新和发布应用程序。

Some input from the community here specifically [@\_ediri](https://twitter.com/_ediri) mentioned also part of this continuous process we should also have the FinOps teams involved. Apps & Data are running and stored somewhere you should be monitoring this continuously to make sure if things change from a resources point of view your costs are not causing some major financial pain on your Cloud Bills.
来自社区的一些意见，特别是 [@\_ediri](https://twitter.com/_ediri) 提到，作为持续流程的一部分，我们也应该让 FinOps 团队参与进来。应用程序和数据正在运行并存储在某个地方，你应该持续监控这一点，以确保如果资源方面发生变化，你的成本不会给你的云账单带来重大的财务压力。

I think it is also a good time to bring up the "DevOps Engineer" mentioned above, albeit there are many DevOps Engineer positions in the wild that people hold, this is not the ideal way of positioning the process of DevOps. What I mean is from speaking to others in the community the title of DevOps Engineer should not be the goal for anyone because really any position should be adopting DevOps processes and the culture explained here. DevOps should be used in many different positions such as Cloud-Native engineer/architect, virtualisation admin, cloud architect/engineer, and infrastructure admin. This is to name a few but the reason for using DevOps Engineer above was really to highlight the scope of the process used by any of the above positions and more.
我认为现在也是一个很好的时机来提一下上面提到的“DevOps 工程师”这个头衔，尽管现实中许多人担任着 DevOps 工程师的职位，但这并非定位 DevOps 流程的理想方式。我的意思是，根据与社区其他成员的交流，DevOps 工程师这个头衔不应该成为任何人的目标，因为实际上任何职位都应该采用此处解释的 DevOps 流程和文化。DevOps 应该被用于许多不同的职位，例如云原生工程师/架构师、虚拟化管理员、云架构师/工程师以及基础设施管理员。这只是列举了一部分，但在上文中使用 DevOps 工程师这个词，是为了突出上述任何职位乃至更多职位所使用的流程范围。

## Resources

I am always open to adding additional resources to these readme files as it is here as a learning tool.
我一直乐于向这些 readme 文件添加额外的资源，因为它们是学习工具。

My advice is to watch all of the below and hopefully you also picked something up from the text and explanations above.
我的建议是观看以下所有内容，并希望你也能从上面的文本和解释中有所收获。

- [Continuous Development](https://www.youtube.com/watch?v=UnjwVYAN7Ns) I will also add that this is focused on manufacturing but the lean culture can be closely followed with DevOps.
- [Continuous Development](https://www.youtube.com/watch?v=UnjwVYAN7Ns) 我还要补充一点，这个视频侧重于制造业，但精益文化可以与 DevOps 紧密结合。
- [Continuous Testing - IBM YouTube](https://www.youtube.com/watch?v=RYQbmjLgubM)
- [Continuous Testing - IBM YouTube](https://www.youtube.com/watch?v=RYQbmjLgubM)
- [Continuous Integration - IBM YouTube](https://www.youtube.com/watch?v=1er2cjUq1UI)
- [Continuous Integration - IBM YouTube](https://www.youtube.com/watch?v=1er2cjUq1UI)
- [Continuous Monitoring](https://www.youtube.com/watch?v=Zu53QQuYqJ0)
- [Continuous Monitoring](https://www.youtube.com/watch?v=Zu53QQuYqJ0)
- [FinOps Foundation - What is FinOps](https://www.finops.org/introduction/what-is-finops/)
- [FinOps Foundation - What is FinOps](https://www.finops.org/introduction/what-is-finops/)
- [**NOT FREE** The Phoenix Project: A Novel About IT, DevOps, and Helping Your Business Win](https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business/dp/1942788290/)
- [**NOT FREE** The Phoenix Project: A Novel About IT, DevOps, and Helping Your Business Win](https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business/dp/1942788290/)

If you made it this far then you will know if this is where you want to be or not. See you on [Day 4](day04.md).
如果你坚持读到这里，那么你就会知道这是否是你想要的方向。我们 [第 4 天](day04.md) 见。