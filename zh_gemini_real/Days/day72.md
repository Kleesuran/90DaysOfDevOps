---
title: '#90DaysOfDevOps - Getting hands-on with Jenkins - Day 72'
published: false
description: 90DaysOfDevOps - Getting hands-on with Jenkins
tags: 'DevOps, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048829
---

## Getting hands-on with Jenkins

The plan today is to get some hands-on with Jenkins and make something happen as part of our CI pipeline, looking at some example code bases that we can use.
今天的计划是亲手操作 Jenkins，并使其作为我们 CI 管道的一部分发挥作用，同时我们会查看一些可以使用的示例代码库。

### What is a pipeline?

Before we start we need to know what is a pipeline when it comes to CI, and we already covered this in the session yesterday with the following image.
在开始之前，我们需要了解在 CI 中什么是管道（pipeline），我们已经在昨天的会议中通过下图涵盖了这一点。

![](Images/Day71_CICD4.png)

We want to take the processes or steps above and we want to automate them to get an outcome eventually meaning that we have a deployed application that we can then ship to our customers, end users etc.
我们希望采用上述流程或步骤并将其自动化，最终获得一个结果，这意味着我们拥有了一个已部署的应用程序，然后我们可以将其交付给我们的客户、最终用户等。

This automated process enables us to have version control through to our users and customers. Every change, feature enhancement, bug fix etc goes through this automated process confirming that everything is fine without too much manual intervention to ensure our code is good.
这种自动化流程使我们能够实现对用户和客户的版本控制。每一次更改、功能增强、错误修复等都会经过这个自动化流程，确认一切正常，无需太多人工干预即可确保我们的代码质量。

This process involves building the software in a reliable and repeatable manner, as well as progressing the built software (called a "build") through multiple stages of testing and deployment.
此过程包括以可靠且可重复的方式构建软件，以及使已构建的软件（称为“构建”）通过测试和部署的多个阶段。

A Jenkins pipeline is written into a text file called a Jenkinsfile. Which itself should be committed to a source control repository. This is also known as Pipeline as code, we could also very much liken this to Infrastructure as code which we covered a few weeks back.
Jenkins 管道被写入一个名为 Jenkinsfile 的文本文件中。该文件本身应提交到源代码控制存储库中。这也被称为“代码即管道”（Pipeline as Code），我们也可以将其类比为我们在几周前介绍的“代码即基础设施”（Infrastructure as Code）。

[Jenkins Pipeline Definition](https://www.jenkins.io/doc/book/pipeline/#ji-toolbar)

### Deploying Jenkins

I had some fun deploying Jenkins, You will notice from the [documentation](https://www.jenkins.io/doc/book/installing/) that there are many options on where you can install Jenkins.
我在部署 Jenkins 时遇到了一些乐趣。你会从[文档](https://www.jenkins.io/doc/book/installing/)中注意到，安装 Jenkins 的位置有很多选择。

Given that I have minikube on hand and we have used this several times I wanted to use this for this task also. (also it is free!) Although the steps are given in the [Kubernetes Installation](https://www.jenkins.io/doc/book/installing/kubernetes/) had me hitting a wall and not getting things up and running, you can compare the two when I document my steps here.
鉴于手头有 minikube 并且我们已经使用过多次，我也想将其用于此任务。（而且它是免费的！）尽管 [Kubernetes 安装](https://www.jenkins.io/doc/book/installing/kubernetes/)中给出的步骤让我碰壁，无法启动和运行，但当我在此处记录我的步骤时，您可以进行比较。

The first step is to get our minikube cluster up and running, we can simply do this with the `minikube start` command.
第一步是启动并运行我们的 minikube 集群，我们可以简单地使用 `minikube start` 命令来完成。

![](Images/Day72_CICD1.png)

I have added a folder with all the YAML configuration and values that can be found [here](CICD/Jenkins) Now that we have our cluster we can run the following to create our jenkins namespace. `kubectl create -f jenkins-namespace.yml`
我添加了一个文件夹，其中包含所有 YAML 配置和值，可以在[此处](CICD/Jenkins)找到。现在我们有了集群，我们可以运行以下命令来创建我们的 jenkins 命名空间。`kubectl create -f jenkins-namespace.yml`

![](Images/Day72_CICD2.png)

We will be using Helm to deploy Jenkins into our cluster, we covered helm in the Kubernetes section. We first need to add the jenkinsci helm repository `helm repo add jenkinsci https://charts.jenkins.io` then update our charts `helm repo update`.
我们将使用 Helm 将 Jenkins 部署到我们的集群中，我们在 Kubernetes 部分介绍过 Helm。我们首先需要添加 jenkinsci helm 存储库 `helm repo add jenkinsci https://charts.jenkins.io`，然后更新我们的 charts `helm repo update`。

![](Images/Day72_CICD3.png)

The idea behind Jenkins is that it is going to save state for its pipelines, you can run the above helm installation without persistence but if those pods are rebooted, changed or modified then any pipeline or configuration you have made will be lost. We will create a volume for persistence using the jenkins-volume.yml file with the `kubectl apply -f jenkins-volume.yml` command.
Jenkins 的目的是为其管道保存状态，您可以在没有持久性（persistence）的情况下运行上述 helm 安装，但如果这些 Pod 被重启、更改或修改，那么您所做的任何管道或配置都将丢失。我们将使用 jenkins-volume.yml 文件通过 `kubectl apply -f jenkins-volume.yml` 命令创建一个用于持久性的卷。

![](Images/Day72_CICD4.png)

We also need a service account which we can create using this YAML file and command. `kubectl apply -f jenkins-sa.yml`
我们还需要一个服务账户（Service Account），我们可以使用这个 YAML 文件和命令来创建。`kubectl apply -f jenkins-sa.yml`

![](Images/Day72_CICD5.png)

At this stage we are good to deploy using the helm chart, we will first define our chart using `chart=jenkinsci/jenkins` and then we will deploy using this command where the jenkins-values.yml contain the persistence and service accounts that we previously deployed to our cluster. `helm install jenkins -n jenkins -f jenkins-values.yml $chart`
在这个阶段，我们可以使用 helm chart 进行部署了，我们首先使用 `chart=jenkinsci/jenkins` 来定义我们的 chart，然后使用此命令进行部署，其中 jenkins-values.yml 包含我们先前部署到集群中的持久性和服务账户。`helm install jenkins -n jenkins -f jenkins-values.yml $chart`

![](Images/Day72_CICD6.png)

At this stage, our pods will be pulling the image but the pod will not have access to the storage so no configuration can be started in terms of getting Jenkins up and running.
在这个阶段，我们的 Pod 正在拉取镜像，但该 Pod 将无法访问存储，因此无法开始 Jenkins 的启动和运行配置。

This is where the documentation did not help me massively understand what needed to happen. But we can see that we have no permission to start our Jenkins install.
这是文档没有帮我弄清楚需要做什么的地方。但我们可以看到，我们没有启动 Jenkins 安装的权限。

![](Images/Day72_CICD7.png)

To fix the above or resolve it, we need to make sure we provide access or the right permission for our Jenkins pods to be able to write to this location that we have suggested. We can do this by using the `minikube ssh` which will put us into the minikube docker container we are running on, and then using `sudo chown -R 1000:1000 /data/jenkins-volume` we can ensure we have permissions set on our data volume.
要修复或解决上述问题，我们需要确保为 Jenkins Pod 提供访问权限或正确的权限，以便能够写入我们指定的这个位置。我们可以通过使用 `minikube ssh` 进入我们正在运行的 minikube Docker 容器，然后使用 `sudo chown -R 1000:1000 /data/jenkins-volume` 来确保我们在数据卷上设置了权限。

![](Images/Day72_CICD8.png)

The above process should fix the pods, however, if not you can force the pods to be refreshed with the `kubectl delete pod jenkins-0 -n jenkins` command. At this point, you should have 2/2 running pods called jenkins-0.
上述过程应该可以修复 Pod，但是，如果不行，您可以使用 `kubectl delete pod jenkins-0 -n jenkins` 命令强制刷新 Pod。此时，您应该拥有 2/2 运行中的 jenkins-0 Pod。

![](Images/Day72_CICD9.png)

We now need our admin password and we can this using the following command. `kubectl exec --namespace jenkins -it svc/jenkins -c jenkins -- /bin/cat /run/secrets/chart-admin-password && echo`
现在我们需要我们的管理员密码，我们可以使用以下命令获取它。`kubectl exec --namespace jenkins -it svc/jenkins -c jenkins -- /bin/cat /run/secrets/chart-admin-password && echo`

![](Images/Day72_CICD10.png)

Now open a new terminal as we are going to use the `port-forward` command to allow us to gain access from our workstation. `kubectl --namespace jenkins port-forward svc/jenkins 8080:8080`
现在打开一个新的终端，因为我们将使用 `port-forward` 命令允许我们从工作站访问。`kubectl --namespace jenkins port-forward svc/jenkins 8080:8080`

![](Images/Day72_CICD11.png)

We should now be able to open a browser and log in to `http://localhost:8080` and authenticate with the username: admin and password we gathered in a previous step.
现在我们应该能够打开浏览器并登录 `http://localhost:8080`，使用用户名：admin 和我们在上一步中获得的密码进行身份验证。

![](Images/Day72_CICD12.png)

When we have authenticated, our Jenkins welcome page should look something like this:
完成身份验证后，我们的 Jenkins 欢迎页面应如下所示：

![](Images/Day72_CICD13.png)

From here, I would suggest heading to "Manage Jenkins" and you will see "Manage Plugins" which will have some updates available. Select all of those plugins and choose "Download now and install after restart"
从这里，我建议前往“Manage Jenkins”（管理 Jenkins），您将看到“Manage Plugins”（管理插件），其中将有一些可用的更新。选择所有这些插件并选择“Download now and install after restart”（立即下载并在重启后安装）。

![](Images/Day72_CICD14.png)

If you want to go even further and automate the deployment of Jenkins using a shell script this great repository was shared with me on Twitter [mehyedes/nodejs-k8s](https://github.com/mehyedes/nodejs-k8s/blob/main/docs/automated-setup.md)
如果您想更进一步，并使用 shell 脚本自动部署 Jenkins，Twitter 上有人与我分享了这个很棒的存储库 [mehyedes/nodejs-k8s](https://github.com/mehyedes/nodejs-k8s/blob/main/docs/automated-setup.md)。

### Jenkinsfile

Now we have Jenkins deployed in our Kubernetes cluster, we can now go back and think about this Jenkinsfile.
现在我们已经在 Kubernetes 集群中部署了 Jenkins，我们可以回顾并思考一下这个 Jenkinsfile。

Every Jenkinsfile will likely start like this, Which is firstly where you would define the steps of your pipeline, in this instance you have Build > Test > Deploy. But we are not doing anything other than using the `echo` command to call out the specific stages.
每个 Jenkinsfile 可能都会像这样开始，这首先是您定义管道步骤的地方，在这个例子中您有 Build > Test > Deploy。但我们没有做任何事情，只是使用 `echo` 命令来标出特定的阶段。

```

Jenkinsfile (Declarative Pipeline)

pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}

```

In our Jenkins dashboard, select "New Item" give the item a name, I am going to "echo1" I am going to suggest that this is a Pipeline.
在我们的 Jenkins 仪表板中，选择“New Item”（新建项目），给项目命名，我将其命名为“echo1”，我建议这是一个 Pipeline（管道）。

![](Images/Day72_CICD15.png)

Hit Ok and you will then have the tabs (General, Build Triggers, Advanced Project Options and Pipeline) for a simple test we are only interested in Pipeline. Under Pipeline you can add a script, we can copy and paste the above script into the box.
点击“Ok”（确定），您将看到选项卡 (General, Build Triggers, Advanced Project Options and Pipeline)，对于一个简单的测试，我们只对 Pipeline 感兴趣。在 Pipeline 下，您可以添加脚本，我们可以将上面的脚本复制粘贴到框中。

As we said above this is not going to do much but it will show us the stages of our Build > Test > Deploy
正如我们上面所说，这不会做太多事情，但它会向我们展示我们的 Build > Test > Deploy 阶段。

![](Images/Day72_CICD16.png)

Click Save, We can now run our build using the build now highlighted below.
单击“Save”（保存），我们现在可以使用下面突出显示的“build now”（立即构建）来运行我们的构建。

![](Images/Day72_CICD17.png)

We should also open a terminal and run the `kubectl get pods -n jenkins` to see what happens there.
我们还应该打开一个终端并运行 `kubectl get pods -n jenkins` 来查看那里发生了什么。

![](Images/Day72_CICD18.png)

Ok, very simple stuff but we can now see that our Jenkins deployment and installation are working correctly and we can start to see the building blocks of the CI pipeline here.
好的，非常简单，但我们现在可以看到我们的 Jenkins 部署和安装运行正常，并且我们可以在这里开始看到 CI 管道的构建块。

In the next section, we will be building a Jenkins Pipeline.
在下一节中，我们将构建一个 Jenkins 管道。

## Resources

- [Jenkins is the way to build, test, deploy](https://youtu.be/_MXtbjwsz3A)
- [Jenkins.io](https://www.jenkins.io/)
- [ArgoCD](https://argo-cd.readthedocs.io/en/stable/)
- [ArgoCD Tutorial for Beginners](https://www.youtube.com/watch?v=MeU5_k9ssrs)
- [What is Jenkins?](https://www.youtube.com/watch?v=LFDrDnKPOTg)
- [Complete Jenkins Tutorial](https://www.youtube.com/watch?v=nCKxl7Q_20I&t=3s)
- [GitHub Actions](https://www.youtube.com/watch?v=R8_veQiYBjI)
- [GitHub Actions CI/CD](https://www.youtube.com/watch?v=mFFXuXjVgkU)

See you on [Day 73](day73.md)
我们第 73 天再见