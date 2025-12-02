---
title: '#90DaysOfDevOps - Building a Jenkins Pipeline - Day 73'
published: false
description: 90DaysOfDevOps - Building a Jenkins Pipeline
tags: 'DevOps, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048766
---

## Building a Jenkins Pipeline
## 构建 Jenkins 流水线

In the last section, we got Jenkins deployed to our Minikube cluster and we set up a very basic Jenkins Pipeline, that didn't do much at all other than echo out the stages of a Pipeline.
在上一节中，我们成功将 Jenkins 部署到了我们的 Minikube 集群，并设置了一个非常基础的 Jenkins Pipeline，除了打印出 Pipeline 的各个阶段之外，它没有做太多事情。

You might have also seen that there are some example scripts available for us to run in the Jenkins Pipeline creation.
您可能还看到，在 Jenkins Pipeline 创建过程中，有一些示例脚本可供我们运行。

![](Images/Day73_CICD1.png)

The first demo script is "Declarative (Kubernetes)" and you can see the stages below.
第一个演示脚本是 "Declarative (Kubernetes)"，您可以在下方看到它的阶段。

```Yaml
// Uses Declarative syntax to run commands inside a container.
pipeline {
    agent {
        kubernetes {
            // Rather than inline YAML, in a multibranch Pipeline you could use: yamlFile 'jenkins-pod.yaml'
            // Or, to avoid YAML:
            // containerTemplate {
            //     name 'shell'
            //     image 'ubuntu'
            //     command 'sleep'
            //     args 'infinity'
            // }
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: shell
    image: ubuntu
    command:
    - sleep
    args:
    - infinity
'''
            // Can also wrap individual steps:
            // container('shell') {
            //     sh 'hostname'
            // }
            defaultContainer 'shell'
        }
    }
    stages {
        stage('Main') {
            steps {
                sh 'hostname'
            }
        }
    }
}
```

You can see below the outcome of what happens when this Pipeline is run.
您可以在下方看到运行此 Pipeline 后的结果。

![](Images/Day73_CICD2.png)

### Job creation
### 任务创建

#### Goals
#### 目标

- Create a simple app and store it in GitHub public repository [https://github.com/scriptcamp/kubernetes-kaniko.git](https://github.com/scriptcamp/kubernetes-kaniko.git)
- 创建一个简单的应用程序并将其存储在 GitHub 公共仓库 [https://github.com/scriptcamp/kubernetes-kaniko.git](https://github.com/scriptcamp/kubernetes-kaniko.git) 中。

- Use Jenkins to build our docker Container image and push it to the docker hub. (for this we will use a private repository)
- 使用 Jenkins 构建我们的 docker 容器镜像并将其推送到 Docker Hub。（为此我们将使用私有仓库）

To achieve this in our Kubernetes cluster running in or using Minikube we need to use something called [Kaniko](https://github.com/GoogleContainerTools/kaniko#running-kaniko-in-a-kubernetes-cluster) It is general though if you are using Jenkins in a real Kubernetes cluster or you are running it on a server then you can specify an agent which will give you the ability to perform the docker build commands and upload that to DockerHub.
要在我们运行在 Minikube 中或使用 Minikube 的 Kubernetes 集群中实现这一目标，我们需要使用一个名为 [Kaniko](https://github.com/GoogleContainerTools/kaniko#running-kaniko-in-a-kubernetes-cluster) 的工具。但通常来说，如果您在真实的 Kubernetes 集群中使用 Jenkins，或者将其运行在服务器上，那么您可以指定一个 agent，这将使您能够执行 docker build 命令并将其上传到 DockerHub。

With the above in mind, we are also going to deploy a secret into Kubernetes with our GitHub credentials.
考虑到以上内容，我们还将使用我们的 GitHub 凭证在 Kubernetes 中部署一个 Secret。

```Shell
kubectl create secret docker-registry dockercred \
    --docker-server=https://index.docker.io/v1/ \
    --docker-username=<dockerhub-username> \
    --docker-password=<dockerhub-password>\
    --docker-email=<dockerhub-email>
```

I want to share another great resource from [DevOpsCube.com](https://devopscube.com/build-docker-image-kubernetes-pod/) running through much of what we will cover here.
我想分享另一个来自 [DevOpsCube.com](https://devopscube.com/build-docker-image-kubernetes-pod/) 的优秀资源，它介绍了我们在此处将要涵盖的大部分内容。

### Adding credentials to Jenkins
### 将凭证添加到 Jenkins

However, if you were on a Jenkins system unlike ours then you will likely want to define your credentials within Jenkins and then use them multiple times within your Pipelines and configurations. We can refer to these credentials in the Pipelines using the ID we determine on creation. I went ahead and stepped through and created a user entry for DockerHub and GitHub.
然而，如果您使用了一个与我们不同的 Jenkins 系统，那么您可能希望在 Jenkins 中定义您的凭证，然后在您的 Pipeline 和配置中多次使用它们。我们可以使用创建时确定的 ID 在 Pipeline 中引用这些凭证。我继续操作，为 DockerHub 和 GitHub 创建了一个用户条目。

First of all select "Manage Jenkins" and then "Manage Credentials"
首先选择 "Manage Jenkins"（管理 Jenkins），然后选择 "Manage Credentials"（管理凭证）。

![](Images/Day73_CICD3.png)

You will see in the centre of the page, Stores scoped to Jenkins click on Jenkins here.
您会在页面中央看到 Stores scoped to Jenkins（作用域为 Jenkins 的存储），点击这里的 Jenkins。

![](Images/Day73_CICD4.png)

Now select Global Credentials (Unrestricted)
现在选择 Global Credentials (Unrestricted)（全局凭证 (无限制)）。

![](Images/Day73_CICD5.png)

Then in the top left, you have Add Credentials
然后，在左上方，您会看到 Add Credentials（添加凭证）。

![](Images/Day73_CICD6.png)

Fill in your details for your account and then select OK, remember the ID is what you will refer to when you want to call this credential. My advice here also is that you use specific token access vs passwords.
填写您的账户详细信息，然后选择 OK，请记住 ID 是您调用此凭证时需要引用的内容。我的建议是，您最好使用特定的令牌访问，而不是密码。

![](Images/Day73_CICD7.png)

For GitHub, you should use a [Personal Access Token](https://vzilla.co.uk/vzilla-blog/creating-updating-your-github-personal-access-token)
对于 GitHub，您应该使用[个人访问令牌（Personal Access Token）](https://vzilla.co.uk/vzilla-blog/creating-updating-your-github-personal-access-token)。

I did not find this process very intuitive to create these accounts, so even though we are not using I wanted to share the process as it is not clear from the UI.
我发现创建这些账户的过程不是很直观，所以即使我们现在不使用它们，我也想分享这个过程，因为它在用户界面中不够清晰。

### Building the pipeline
### 构建流水线

We have our DockerHub credentials deployed as a secret into our Kubernetes cluster which we will call upon for our docker deploy to the DockerHub stage in our pipeline.
我们的 DockerHub 凭证已作为 Secret 部署到我们的 Kubernetes 集群中，我们将在 Pipeline 中的 DockerHub 部署阶段调用它。

The pipeline script is what you can see below, this could in turn become our Jenkinsfile located in our GitHub repository which you can also see is listed in the Get the project stage of the pipeline.
您在下方看到的就是 Pipeline 脚本，这反过来可以成为我们位于 GitHub 仓库中的 Jenkinsfile，您也可以看到它列在 Pipeline 的 Get the project 阶段中。

```Yaml
podTemplate(yaml: '''
    apiVersion: v1
    kind: Pod
    spec:
      containers:
      - name: maven
        image: maven:3.8.1-jdk-8
        command:
        - sleep
        args:
        - 99d
      - name: kaniko
        image: gcr.io/kaniko-project/executor:debug
        command:
        - sleep
        args:
        - 9999999
        volumeMounts:
        - name: kaniko-secret
          mountPath: /kaniko/.docker
      restartPolicy: Never
      volumes:
      - name: kaniko-secret
        secret:
            secretName: dockercred
            items:
            - key: .dockerconfigjson
              path: config.json
''') {
  node(POD_LABEL) {
    stage('Get the project') {
      git url: 'https://github.com/scriptcamp/kubernetes-kaniko.git', branch: 'main'
      container('maven') {
        stage('Test the project') {
          sh '''
          echo pwd
          '''
        }
      }
    }

    stage('Build & Test the Docker Image') {
      container('kaniko') {
        stage('Deploy to DockerHub') {
          sh '''
            /kaniko/executor --context `pwd` --destination michaelcade1/helloworld:latest
          '''
        }
      }
    }

  }
}
```

To kick things on the Jenkins dashboard we need to select "New Item"
要在 Jenkins 控制面板上启动，我们需要选择 "New Item"（新建项目）。

![](Images/Day73_CICD8.png)

We are then going to give our item a name, select Pipeline and then hit ok.
然后，我们将为我们的项目命名，选择 Pipeline（流水线），然后点击 OK。

![](Images/Day73_CICD9.png)

We are not going to be selecting any of the general or build triggers but have a play with these as there are some interesting schedules and other configurations that might be useful.
我们不会选择任何通用或构建触发器，但您可以试用这些选项，因为其中包含一些有趣的计划配置和其他可能有用的配置。

![](Images/Day73_CICD10.png)

We are only interested in the Pipeline tab at the end.
我们只对最末尾的 Pipeline 标签页感兴趣。

![](Images/Day73_CICD11.png)

In the Pipeline definition, we are going to copy and paste the pipeline script that we have above into the Script section and hit save.
在 Pipeline 定义中，我们将把上面提供的 Pipeline 脚本复制粘贴到 Script（脚本）部分，然后点击 Save（保存）。

![](Images/Day73_CICD12.png)

Next, we will select the "Build Now" option on the left side of the page.
接下来，我们将选择页面左侧的 "Build Now"（立即构建）选项。

![](Images/Day73_CICD13.png)

You should now wait a short amount of time, less than a minute. and you should see under status the stages that we defined above in our script.
现在您应该等待一小段时间，不到一分钟。然后您应该在状态下看到我们在脚本中定义的阶段。

![](Images/Day73_CICD14.png)

More importantly, if we now head on over to our DockerHub and check that we have a new build.
更重要的是，如果我们现在转到我们的 DockerHub 并检查我们是否有一个新的构建。

![](Images/Day73_CICD15.png)

Overall did take a while to figure out but I wanted to stick with it to get hands-on and work through a scenario that anyone can run through using minikube and access to GitHub and dockerhub.
总的来说，花了一些时间才弄明白，但我想坚持下去，通过亲自动手操作来完成一个任何人都可以使用 Minikube 以及访问 GitHub 和 DockerHub 来运行的场景。

The DockerHub repository I used for this demo was a private one. But in the next section, I want to advance some of these stages and have them do something vs just printing out `pwd` and running some tests and build stages.
我用于此演示的 DockerHub 仓库是一个私有仓库。但在下一节中，我想推进其中一些阶段，让它们做一些实际的事情，而不仅仅是打印出 `pwd` 以及运行一些测试和构建阶段。

## Resources
## 资源

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

See you on [Day 74](day74.md)
我们第 74 天见