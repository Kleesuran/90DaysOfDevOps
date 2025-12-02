---
title: '#90DaysOfDevOps - The Big Picture: CI/CD Pipelines - Day 70'
published: false
description: 90DaysOfDevOps - The Big Picture CI/CD Pipelines
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048836
---

## The Big Picture: CI/CD Pipelines

A CI/CD (Continuous Integration/Continuous Deployment) Pipeline implementation is the backbone of the modern DevOps environment.
CI/CD（持续集成/持续部署）流水线的实现是现代DevOps环境的支柱。

It bridges the gap between development and operations by automating the build, test and deployment of applications.
它通过自动化应用程序的构建、测试和部署，弥合了开发和运维之间的差距。

We covered a lot of this continuous mantra in the opening section of the challenge. But to reiterate:
我们在这个挑战的开篇部分已经涵盖了许多关于“持续”的理念。但为了重申：

Continuous Integration (CI) is a more modern software development practice in which incremental code changes are made more frequently and reliably. Automated build and test workflow steps triggered by Continuous Integration ensure that code changes being merged into the repository are reliable.
持续集成（CI）是一种更现代的软件开发实践，其中增量代码更改的频率更高、可靠性更强。由持续集成触发的自动化构建和测试工作流步骤，确保合并到仓库中的代码更改是可靠的。

That code / Application is then delivered quickly and seamlessly as part of the Continuous Deployment process.
该代码/应用程序随后作为持续部署过程的一部分，被快速、无缝地交付。

### The importance of CI/CD?

- Ship software quickly and efficiently
- 快速高效地交付软件
- Facilitates an effective process for getting applications to market as fast as possible
- 促进了一个有效的流程，使应用程序尽快推向市场
- A continuous flow of bug fixes and new features without waiting months or years for version releases.
- 持续不断地提供错误修复和新功能，无需等待数月或数年的版本发布。

The ability for developers to make small impactful changes regular means we get faster fixes and more features quicker.
开发人员定期进行小而有影响力的更改的能力，意味着我们能更快地获得修复和更多的功能。

### Ok, so what does this mean?

On [Day 5](day05.md) we covered a lot of the theory behind DevOps and as already mentioned here that the CI/CD Pipeline is the backbone of the modern DevOps environment.
在[第5天](day05.md)，我们涵盖了许多DevOps背后的理论，正如这里已经提到的，CI/CD流水线是现代DevOps环境的支柱。

![DevOps](Images/Day5_DevOps8.png)

I want to reiterate some of the key points on this image above, now that we are a little further into our journey of learning the fundamentals of DevOps.
我想重申上面这张图片中的一些关键点，因为我们学习DevOps基础知识的旅程已经进行了一段时间。

We are referring to the software development life cycle (SDLC).
我们指的是软件开发生命周期（SDLC）。

The steps are usually written out within an infinity loop since it's a cycle that repeats forever.
这些步骤通常以无限循环的形式写出，因为它是一个永远重复的循环。
The steps in the cycle are, developers write the **code** then it gets **built** or all compiled together then it's **tested** for bugs then it's **deployed** into production where it's used (**Operated**) by end users or customers then we **monitor** and collect feedback and finally we **plan** improvements around that feedback **rinse and repeat**.
循环中的步骤是：开发人员编写**代码**，然后它被**构建**或全部编译在一起，然后进行错误**测试**，然后**部署**到生产环境中，供最终用户或客户使用（**运维**），然后我们进行**监控**并收集反馈，最后我们围绕该反馈**规划**改进，**周而复始**。

### Let's go a little deeper into CI/CD

### CI

CI is a development practice that requires developers to integrate code into a shared repository several times a day.
CI是一种开发实践，它要求开发人员每天多次将代码集成到共享仓库中。

When the code is written and pushed to a repository like Github or GitLab that's where the magic begins.
当代码被编写并推送到像Github或GitLab这样的仓库时，奇迹就开始了。

![](Images/Day70_CICD1.png)

The code is verified by an automated build which allows teams or the project owner to detect any problems early.
代码通过自动化构建进行验证，这使得团队或项目负责人能够及早发现任何问题。

![](Images/Day70_CICD2.png)

From there the code is analysed and given a series of automated tests three examples are
然后，代码被分析并进行一系列自动化测试，其中三个例子是

- Unit testing tests the individual units of the source code
- 单元测试测试源代码的各个单元
- Validation testing makes sure that the software satisfies or fits the intended use
- 验证测试确保软件满足或符合预期用途
- Format testing checks for syntax and other formatting errors
- 格式测试检查语法和其他格式错误

These tests are created as a workflow and then are run every time you push to the master branch so pretty much every major development team has some sort of CI/CD workflow and remember on a development team the new code could be coming in from teams all over the world at different times of the day from developers working on all sorts of different projects it's more efficient to build an automated workflow of tests that make sure that everyone is on the same page before the code is accepted. It would take much longer for a human to do this each time.
这些测试被创建为一个工作流，并且在每次推送到主分支时都会运行，因此几乎每个主要的开发团队都有某种CI/CD工作流。请记住，在一个开发团队中，新代码可能在一天中的不同时间从世界各地的团队中输入，这些开发人员致力于各种不同的项目。因此，构建一个自动化的测试工作流，确保在代码被接受之前每个人都保持一致，效率会更高。如果每次都由人工来做，将花费更长的时间。

![](Images/Day70_CICD3.png)

Once we have our tests complete and they are successful then we can compile and send them to our repository. For example, I am using Docker Hub but this could be anywhere that then gets leveraged for the CD aspect of the pipeline.
一旦我们的测试完成并成功，我们就可以编译并将它们发送到我们的仓库。例如，我正在使用Docker Hub，但这可以是任何地方，然后它将被用于流水线的CD方面。

![](Images/Day70_CICD4.png)

So this process is very much down to the software development process, we are creating our application, adding, fixing bugs etc and then updating our source control and versioning that whilst also testing.
因此，这个过程主要取决于软件开发过程：我们正在创建应用程序、添加、修复错误等，然后在测试的同时更新我们的源代码控制和版本控制。

Moving onto the next phase is the CD element which more and more is what we generally see from any off-the-shelf software, I would argue that we will see a trend if we get our software from a vendor such as Oracle or Microsoft we will consume that from a Docker Hub type repository and then we would use our CD pipelines to deploy that into our environments.
进入下一个阶段是CD要素，这是我们通常从任何现成软件中越来越多看到的。我认为，如果我们从像Oracle或Microsoft这样的供应商那里获取软件，我们会看到一个趋势：我们将从类似Docker Hub的仓库中获取它，然后使用我们的CD流水线将其部署到我们的环境中。

### CD

Now we have our tested version of our code and we are ready to deploy out into the wild as I say, the Software vendor will run through this stage but I strongly believe this is how we will all deploy the off-the-shelf software we require in the future.
现在我们有了经过测试的代码版本，正如我所说，我们准备将其部署到实际环境中。软件供应商会经历这个阶段，但我坚信，这是未来我们所有人部署所需的现成软件的方式。

It is now time to release our code into an environment. This is going to include Production but also likely other environments as well such as staging.
现在是时候将我们的代码发布到一个环境中。这包括生产环境，但也可能包括其他环境，例如预演（staging）环境。

![](Images/Day70_CICD5.png)

Our next step at least on Day 1 of v1 of the software deployment is we need to make sure we are pulling the correct code base to the correct environment. This could be pulling elements from the software repository (DockerHub) but it is more than likely that we are also pulling additional configuration from maybe another code repository, the configuration for the application for example. In the diagram below we are pulling the latest release of the software from DockerHub and then we are releasing this to our environments whilst possibly picking up configuration from a Git repository. Our CD tool is performing this and pushing everything to our environment.
至少在软件部署v1版本的第1天，我们的下一步是确保我们将正确的代码库拉取到正确的环境中。这可能是从软件仓库（DockerHub）中拉取元素，但更有可能的是，我们也会从另一个代码仓库中拉取额外的配置，例如应用程序的配置。在下面的图表中，我们正在从DockerHub拉取最新的软件版本，然后将其发布到我们的环境中，同时可能从Git仓库中获取配置。我们的CD工具正在执行此操作，并将所有内容推送到我们的环境中。

It is most likely that this is not done at the same time. i.e we would go to a staging environment run against this with our configuration to make sure things are correct and this could be a manual step for testing or it could again be automated (let's go with automated) before then allowing this code to be deployed into production.
最有可能的是，这不是同时完成的。也就是说，我们会进入预演环境，使用我们的配置运行，以确保一切正确。这可能是一个手动测试步骤，或者在允许代码部署到生产环境之前，它也可以是自动化的（让我们选择自动化）。

![](Images/Day70_CICD6.png)

Then after this when v2 of the application comes out we rinse and repeat the steps this time we ensure our application + configuration is deployed to staging ensure everything is good and then we deploy to production.
在此之后，当应用程序的v2版本发布时，我们重复这些步骤。这一次，我们确保我们的应用程序+配置部署到预演环境，确保一切正常，然后我们部署到生产环境。

### Why use CI/CD?

I think we have probably covered the benefits several times but it is because it automates things that otherwise would have to be done manually it finds small problems before it sneaks into the main codebase, you can probably imagine that if you push bad code out to your customers then you're going to have a bad time!
我认为我们可能已经多次涵盖了这些好处，但这是因为它自动化了原本必须手动完成的事情。它在小问题潜入主代码库之前将其发现。你可以想象，如果你向客户推送了有问题的代码，那么你将会遇到麻烦！

It also helps to prevent something that we call technical debt which is the idea that since the main code repos are constantly being built upon over time then a shortcut fix taken on day one is now an exponentially more expensive fix years later because now that band-aid of a fix would be so deeply intertwined and baked into all the code bases and logic.
它还有助于防止我们称之为技术债务的东西。技术债务的概念是，随着时间的推移，主代码仓库不断地被构建，那么第一天采取的捷径修复现在几年后会变成一个成本呈指数级增长的修复，因为现在那个创可贴式的修复会深深地交织并嵌入到所有代码库和逻辑中。

### Tooling

Like with other sections we are going to get hands-on with some of the tools that achieve the CI/CD pipeline process.
与本系列的其他部分一样，我们将动手实践一些实现CI/CD流水线过程的工具。

I think it is also important to note that not all tools have to do both CI and CD, We will take a look at ArgoCD which you guessed is great at the CD element of deploying our software to a Kubernetes cluster. But something like Jenkins can work across many different platforms.
我认为指出并非所有工具都必须同时执行CI和CD也很重要。我们将看看ArgoCD，正如你所猜想的，它擅长将软件部署到Kubernetes集群的CD元素。但像Jenkins这样的工具可以在许多不同的平台上工作。

I plan to look at the following:
我计划研究以下工具：

- Jenkins
- ArgoCD
- GitHub Actions

## Resources

- [Jenkins is the way to build, test, deploy](https://youtu.be/_MXtbjwsz3A)
- [Introduction to Jenkins](https://www.edx.org/course/introduction-to-jenkins)
- [Jenkins.io](https://www.jenkins.io/)
- [ArgoCD](https://argo-cd.readthedocs.io/en/stable/)
- [ArgoCD Tutorial for Beginners](https://www.youtube.com/watch?v=MeU5_k9ssrs)
- [What is Jenkins?](https://www.youtube.com/watch?v=LFDrDnKPOTg)
- [Complete Jenkins Tutorial](https://www.youtube.com/watch?v=nCKxl7Q_20I&t=3s)
- [GitHub Actions](https://www.youtube.com/watch?v=R8_veQiYBjI)
- [GitHub Actions CI/CD](https://www.youtube.com/watch?v=mFFXuXjVgkU)

See you on [Day 71](day71.md)
我们第71天再见