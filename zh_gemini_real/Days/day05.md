---
title: '#90DaysOfDevOps - Plan > Code > Build > Testing > Release > Deploy > Operate > Monitor > - Day 5'
published: false
description: 90DaysOfDevOps - Plan > Code > Build > Testing > Release > Deploy > Operate > Monitor >
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048830
---

## Plan > Code > Build > Testing > Release > Deploy > Operate > Monitor >

Today we are going to focus on the individual steps from start to finish and the continuous cycle of an Application in a DevOps world.
今天我们将重点关注DevOps世界中应用程序从开始到结束的各个步骤及其连续循环。

![DevOps](Images/Day5_DevOps8.png)

### Plan

It all starts with the planning process this is where the development team gets together and figures out what types of features and bug fixes they're going to roll out in their next sprint.
一切都始于规划过程，在这个阶段，开发团队会聚集在一起，确定他们将在下一个 Sprint 中推出哪些功能和错误修复。
This is an opportunity as a DevOps Engineer for you to get involved with that and learn what kinds of things are going to be coming your way that you need to be involved with and also influence their decisions or their path and kind of help them work with the infrastructure that you've built or steer them towards something that's going to work better for them in case they're not on that path and so one key thing to point out here is the developers or software engineering team is your customer as a DevOps engineer so this is your opportunity to work with your customer before they go down a bad path.
作为一名 DevOps 工程师，这是一个让你参与其中、了解未来需要处理哪些事务的机会，同时也可以影响他们的决策或路径，帮助他们使用你构建的基础设施，或引导他们转向更适合他们的解决方案，以防他们偏离正确的轨道。因此，这里需要指出的一个关键点是：作为 DevOps 工程师，开发人员或软件工程团队就是你的客户，所以这是你在客户走上错误道路之前与他们合作的机会。

### Code

Now once that planning session's done they're going to go start writing the code you may or may not be involved a whole lot with this one of the places you may get involved with it, is whenever they're writing code you can help them better understand the infrastructure so if they know what services are available and how to best talk with those services so they're going to do that and then once they're done they'll merge that code into the repository
一旦规划会议结束，他们就会开始编写代码。你可能不会过多参与这个环节，但你可以参与的其中一个方面是：在他们编写代码时，你可以帮助他们更好地理解基础设施，让他们了解有哪些可用的服务以及如何最好地与这些服务进行通信。他们完成编码后，会将代码合并到代码仓库（repository）中。

### Build

This is where we'll kick off the first of our automation processes because we're going to take their code and we're going to build it depending on what language they're using it may be transpiling it or compiling it or it might be creating a docker image from that code either way we're going to go through that process using our ci cd pipeline
这就是我们启动第一个自动化流程的地方，因为我们将获取他们的代码并进行构建。根据他们使用的语言，这可能是转译（transpiling）或编译（compiling）代码，也可能是从该代码创建 Docker 镜像。无论哪种方式，我们都将通过 CI/CD 管道来完成这个过程。

## Testing

Once we've built it we're going to run some tests on it now the development team usually writes the test you may have some input in what tests get written but we need to run those tests and the testing is a way for us to try and minimise introducing problems out into production, it doesn't guarantee that but we want to get as close to a guarantee as we can that were one not introducing new bugs and two not breaking things that used to work
构建完成后，我们将对其运行一些测试。开发团队通常会编写测试，你可能会对编写哪些测试提供一些意见，但我们都需要运行这些测试。测试是一种尝试最大限度地减少向生产环境引入问题的方法。它不能提供绝对保证，但我们希望尽可能地保证两点：第一，不引入新的 Bug；第二，不破坏以前正常运行的功能。

## Release

Once those tests pass we're going to do the release process and depending again on what type of application you're working on this may be a non-step.
一旦这些测试通过，我们将进入发布（release）流程。再次强调，根据你正在处理的应用程序类型，这可能是一个非必需的步骤。
You know the code may just live in the GitHub repo or the git repository or wherever it lives but it may be the process of taking your compiled code or the docker image that you've built and putting it into a registry or a repository where it's accessible by your production servers for the deployment process
例如，代码可能只存在于 GitHub 仓库、Git 仓库或它所在的任何位置，但这可能是将你编译的代码或构建的 Docker 镜像放入注册中心（registry）或仓库（repository）的过程，以便你的生产服务器可以在部署过程中访问它。

## Deploy

which is the thing that we do next because deployment is like the end game of this whole thing because deployments are when we put the code into production and it's not until we do that that our business realizes the value from all the time effort and hard work that you and the software engineering team have put into this product up to this point.
这是我们接下来要做的事情，因为部署（deployment）就像是整个过程的最终目标。部署是将代码投入生产环境的操作，只有完成了部署，我们的业务才能实现你和软件工程团队迄今为止投入到该产品中的所有时间、精力和努力的价值。

## Operate

Once it's deployed we are going to operate it and operate it may involve something like you start getting calls from your customers that they're all annoyed that the site's running slow or their application is running slow right so you need to figure out why that is and then possibly build auto-scaling you know to handle increase the number of servers available during peak periods and decrease the number of servers during off-peak periods either way that's all operational type metrics, another operational thing that you do is include like a feedback loop from production back to your ops team letting you know about key events that happened in production such as a deployment back one step on the deployment thing this may or may not get automated depending on your environment the goal is to always automate it when possible there are some environments where you possibly need to do a few steps before you're ready to do that but ideally you want to deploy automatically as part of your automation process but if you're doing that it might be a good idea to include in your operational steps some type of notification so that your ops team knows that a deployment has happened
一旦部署完成，我们就要开始运维（operate）它。运维可能涉及诸如你开始接到客户电话，抱怨网站运行缓慢或应用程序运行缓慢之类的事情。因此，你需要弄清楚原因，然后可能需要构建自动扩缩容（auto-scaling）机制，以在高峰期增加可用服务器数量，在非高峰期减少服务器数量。无论是哪种情况，这都属于运维指标。你在运维方面做的另一件事是：在生产环境中包含一个反馈回路（feedback loop），将关键事件（例如部署）通知给运维团队。关于部署，这可能会或可能不会自动化，具体取决于你的环境，但目标是尽可能使其自动化。在某些环境中，你可能需要完成一些步骤才能准备好进行自动化部署，但理想情况下，你希望将其作为自动化流程的一部分自动部署。如果你正在这样做，最好在运维步骤中包含某种通知，以便你的运维团队知道部署已经发生。

## Monitor

All of the above parts lead to the final step because you need to have monitoring, especially around operational issues auto-scaling troubleshooting like you don't know
所有上述环节都导向了最后一步，因为你需要进行监控（monitoring），尤其是在运维问题、自动扩缩容故障排除等方面。如果你没有
there's a problem if you don't have monitoring in place to tell you that there's a problem so some of the things you might build monitoring for are memory utilization CPU utilization disk space, API endpoint, response time, how quickly that endpoint is responding and a big part of that as well is logs.
监控机制来告诉你存在问题，你就无法得知问题所在。因此，你可能需要构建监控的内容包括内存利用率、CPU 利用率、磁盘空间、API 端点响应时间（即该端点响应的速度）。日志也是其中重要的一部分。
Logs give developers the ability to see what is happening without having to access production systems.
日志使开发人员能够在不访问生产系统的情况下查看正在发生的事情。

## Rinse & Repeat

Once that's in place you go right back to the beginning to the planning stage and go through the whole thing again
一旦这一切就绪，你就会回到最初的规划阶段，并再次经历整个过程。

## Continuous

Many tools help us achieve the above continuous process, all this code and the ultimate goal of being completely automated, cloud infrastructure or any environment is often described as Continuous Integration/ Continuous Delivery/Continous Deployment or “CI/CD” for short.
许多工具帮助我们实现上述持续流程。所有这些代码以及完全自动化的最终目标，无论是在云基础设施还是在任何环境中，通常都被描述为持续集成（Continuous Integration）/持续交付（Continuous Delivery）/持续部署（Continous Deployment），简称“CI/CD”。
We will spend a whole week on CI/CD later on in the 90 Days with some examples and walkthroughs to grasp the fundamentals.
在接下来的 90 天中，我们将花一整周时间专门学习 CI/CD，并通过一些示例和演练来掌握其基础知识。

### Continuous Delivery

Continuous Delivery = Plan > Code > Build > Test

### Continuous Integration

This is effectively the outcome of the Continuous Delivery phases above plus the outcome of the Release phase.
这实际上是上述持续交付阶段的结果，再加上发布阶段的结果。
This is the case for both failure and success but this is fed back into continuous delivery or moved to Continuous Deployment.
无论是失败还是成功，都会出现这种情况，但其结果要么反馈回持续交付，要么转入持续部署。

Continuous Integration = Plan > Code > Build > Test > Release

### Continuous Deployment

If you have a successful release from your continuous integration then move to Continuous Deployment which brings in the following phases
如果你的持续集成发布成功，那么就会进入持续部署，它包含以下阶段：

CI Release is Success = Continuous Deployment = Deploy > Operate > Monitor

You can see these three Continuous notions above as the simple collection of phases of the DevOps Lifecycle.
你可以将上述这三个“持续”概念视为 DevOps 生命周期阶段的简单集合。

This last bit was a bit of a recap for me on Day 3 but think this makes things clearer for me.
最后这一点对我来说是对第 3 天内容的小结，但我认为这让事情对我来说更清晰了。

### Resources

- [DevOps for Developers – Software or DevOps Engineer?](https://www.youtube.com/watch?v=a0-uE3rOyeU)
- [Techworld with Nana -DevOps Roadmap 2022 - How to become a DevOps Engineer? What is DevOps?](https://www.youtube.com/watch?v=9pZ2xmsSDdo&t=125s)
- [How to become a DevOps Engineer in 2021 - DevOps Roadmap](https://www.youtube.com/watch?v=5pxbp6FyTfk)

If you made it this far then you will know if this is where you want to be or not.
如果你坚持读到了这里，那么你就会知道这是否是你想要追求的领域。

See you on [Day 6](day06.md).
第 6 天再见。