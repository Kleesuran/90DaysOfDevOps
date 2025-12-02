---
title: '#90DaysOfDevOps - ArgoCD Overview - Day 76'
published: false
description: 90DaysOfDevOps - ArgoCD Overview
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048809
---

## ArgoCD Overview

“Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes”

Version control is the key here, ever made a change to your environment on the fly and have no recollection of that change and because the lights are on and everything is green you continue to keep plodding along?
版本控制是这里的关键，你是否曾经在环境中即时做出更改，却对该更改没有任何印象，然后因为指示灯亮着、一切正常，你就继续向前推进？
Ever made a change and broken everything or some of everything?
你是否曾经做出更改，结果导致所有东西或部分东西损坏？
You might have known you made the change and you can quickly roll back your change, that bad script or misspelling.
你可能知道你做了更改，并且可以快速回滚该更改、那个错误的脚本或拼写错误。
Now ever done this on a massive scale and maybe it was not you or maybe it was not found straight away and now the business is suffering.
现在，你是否在大规模环境中做过类似的事情，也许不是你做的，也许没有立即发现，现在业务正在遭受损失。
Therefore, version control is important.
因此，版本控制非常重要。
Not only that but “Application definitions, configurations, and environments should be declarative, and version controlled.”
不仅如此，“应用程序定义、配置和环境应该是声明式的，并进行版本控制。”
On top of this (which comes from ArgoCD), they also mention that “Application deployment and lifecycle management should be automated, auditable, and easy to understand.”
除此之外（这来自 ArgoCD），他们还提到：“应用程序部署和生命周期管理应该是自动化的、可审计的且易于理解的。”

From an Operations background but having played a lot around Infrastructure as Code this is the next step to ensuring all of that good stuff is taken care of along the way with continuous deployment/delivery workflows.
尽管我来自运维背景，但在基础设施即代码方面有很多实践，这是确保通过持续部署/交付工作流来处理好所有这些优质工作的下一步。

[What is ArgoCD](https://argo-cd.readthedocs.io/en/stable/)
[什么是 ArgoCD](https://argo-cd.readthedocs.io/en/stable/)

### Deploying ArgoCD

We are going to be using our trusty minikube Kubernetes cluster locally again for this deployment.
我们将再次使用我们信赖的本地 minikube Kubernetes 集群来进行此次部署。

```Shell
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

![](Images/Day76_CICD1.png)

Make sure all the ArgoCD pods are up and running with `kubectl get pods -n argocd`
使用 `kubectl get pods -n argocd` 确保所有 ArgoCD Pods 都已启动并运行。

![](Images/Day76_CICD2.png)

Also, let's check everything that we deployed in the namespace with `kubectl get all -n argocd`
此外，让我们使用 `kubectl get all -n argocd` 检查我们在该命名空间中部署的所有内容。

![](Images/Day76_CICD3.png)

When the above is looking good, we then should consider accessing this via the port forward.
当以上看起来不错时，我们应该考虑通过端口转发来访问它。
Using the `kubectl port-forward svc/argocd-server -n argocd 8080:443` command.
使用 `kubectl port-forward svc/argocd-server -n argocd 8080:443` 命令。
Do this in a new terminal.
在一个新的终端中执行此操作。

Then open a new web browser and head to `https://localhost:8080`
然后打开一个新的网络浏览器，访问 `https://localhost:8080`

![](Images/Day76_CICD4.png)

To log in you will need a username of admin and then grab your created secret as your password use the `kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d && echo`
要登录，你需要使用用户名 admin，然后获取创建的 secret 作为密码，使用 `kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d && echo` 命令。

![](Images/Day76_CICD5.png)

Once you have logged in you will have your blank CD canvas.
登录后，你将看到空白的 CD 画布。

![](Images/Day76_CICD6.png)

### Deploying our application

Now we have ArgoCD up and running we can now start using it to deploy our applications from our Git repositories as well as Helm.
现在 ArgoCD 已经启动并运行，我们可以开始使用它来从我们的 Git 仓库以及 Helm 部署应用程序。

The application I want to deploy is Pac-Man, yes that's right the famous game and something I use in a lot of demos when it comes to data management, this will not be the last time we see Pac-Man.
我想要部署的应用程序是吃豆人（Pac-Man），是的，就是那个著名的游戏，也是我在很多关于数据管理的演示中使用的东西，这不会是我们最后一次看到吃豆人。

You can find the repository for [Pac-Man](https://github.com/MichaelCade/pacman-tanzu.git) here.
你可以在这里找到 [吃豆人（Pac-Man）] 的仓库。

Instead of going through each step using screenshots, I thought it would be easier to create a walkthrough video covering the steps taken for this one particular application deployment.
我认为与其使用屏幕截图逐步展示每个步骤，不如创建一个涵盖本次特定应用程序部署所采取步骤的演练视频会更容易。

[ArgoCD Demo - 90DaysOfDevOps](https://www.youtube.com/watch?v=w6J413_j0hA)
[ArgoCD 演示 - 90DaysOfDevOps](https://www.youtube.com/watch?v=w6J413_j0hA)

Note - During the video, there is a service that is never satisfied as the app health is healthy this is because the LoadBalancer type set for the Pacman service is pending, in Minikube we do not have a loadbalancer configured.
注意 - 在视频中，有一个服务永远不会满足（但应用程序健康状况是健康的），这是因为为 Pacman 服务设置的 LoadBalancer 类型处于 pending 状态，而在 Minikube 中我们没有配置负载均衡器。
If you would like to test this you could change the YAML for the service to ClusterIP and use port forwarding to play the game.
如果你想测试这个，可以将服务的 YAML 更改为 ClusterIP，并使用端口转发来玩游戏。

This wraps up the CICD Pipelines section, I feel there is a lot of focus on this area in the industry at the moment and you will also hear terms around GitOps also related to the methodologies used within CICD in general.
持续集成/持续部署 (CICD) 管道部分到此结束，我感觉目前业界非常关注这一领域，你也会听到与 CICD 总体方法论相关的 GitOps 术语。

The next section we move into is around Observability, another concept or area that is not new but it is more and more important as we look at our environments differently.
我们将进入的下一部分是关于可观测性（Observability），这是另一个并不新鲜的概念或领域，但随着我们以不同的方式看待我们的环境，它变得越来越重要。

## Resources

- [Jenkins is the way to build, test, deploy](https://youtu.be/_MXtbjwsz3A)
- [Jenkins 是构建、测试、部署的方式](https://youtu.be/_MXtbjwsz3A)
- [Jenkins.io](https://www.jenkins.io/)
- [Jenkins.io](https://www.jenkins.io/)
- [ArgoCD](https://argo-cd.readthedocs.io/en/stable/)
- [ArgoCD](https://argo-cd.readthedocs.io/en/stable/)
- [ArgoCD Tutorial for Beginners](https://www.youtube.com/watch?v=MeU5_k9ssrs)
- [ArgoCD 初学者教程](https://www.youtube.com/watch?v=MeU5_k9ssrs)
- [What is Jenkins?](https://www.youtube.com/watch?v=LFDrDnKPOTg)
- [什么是 Jenkins？](https://www.youtube.com/watch?v=LFDrDnKPOTg)
- [Complete Jenkins Tutorial](https://www.youtube.com/watch?v=nCKxl7Q_20I&t=3s)
- [完整的 Jenkins 教程](https://www.youtube.com/watch?v=nCKxl7Q_20I&t=3s)
- [GitHub Actions](https://www.youtube.com/watch?v=R8_veQiYBjI)
- [GitHub Actions](https://www.youtube.com/watch?v=R8_veQiYBjI)
- [GitHub Actions CI/CD](https://www.youtube.com/watch?v=mFFXuXjVgkU)
- [GitHub Actions CI/CD](https://www.youtube.com/watch?v=mFFXuXjVgkU)

See you on [Day 77](day77.md)
第 77 天见
