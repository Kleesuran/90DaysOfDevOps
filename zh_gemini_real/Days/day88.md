---
title: '#90DaysOfDevOps - Application Focused Backup - Day 88'
published: false
description: 90DaysOfDevOps - Application Focused Backups
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048749
---

## Application-Focused Backups

We have already spent some time talking about data services or data-intensive applications such as databases on [Day 85](day85.md).
我们已经在[第 85 天](day85.md)花了一些时间讨论数据服务或数据密集型应用，例如数据库。
For these data services, we have to consider how we manage consistency, especially when it comes to application consistency.
对于这些数据服务，我们必须考虑如何管理一致性，特别是在涉及应用一致性时。

In this post, we are going to dive into that requirement around consistently protecting the application data.
在本文中，我们将深入探讨围绕持续保护应用数据的这一需求。

To do this our tool of choice will be [Kanister](https://kanister.io/)
为此，我们选择的工具是 [Kanister](https://kanister.io/)

![](Images/Day88_Data1.png)

### Introducing Kanister

Kanister is an open-source project by Kasten, that enables us to manage (backup and restore) application data on Kubernetes.
Kanister 是 Kasten 的一个开源项目，它使我们能够在 Kubernetes 上管理（备份和恢复）应用数据。
You can deploy Kanister as a helm application into your Kubernetes cluster.
您可以将 Kanister 作为 Helm 应用部署到您的 Kubernetes 集群中。

Kanister uses Kubernetes custom resources, the main custom resources that are installed when Kanister is deployed are
Kanister 使用 Kubernetes 自定义资源，部署 Kanister 时安装的主要自定义资源是

- `Profile` - is a target location to store your backups and recover from. Most commonly this will be object storage.
- `Profile` - 是用于存储和恢复备份的目标位置。最常见的是对象存储。
- `Blueprint` - steps that are to be taken to backup and restore the database should be maintained in the Blueprint
- `Blueprint` - 备份和恢复数据库所需的步骤应在 Blueprint 中维护。
- `ActionSet` - is the motion to move our target backup to our profile as well as restore actions.
- `ActionSet` - 是将我们的目标备份移动到 Profile 以及执行恢复操作的动作。

### Execution Walkthrough

Before we get hands-on we should take a look at the workflow that Kanister takes in protecting application data.
在我们开始动手实践之前，我们应该先看看 Kanister 保护应用数据所采取的工作流程。
Firstly our controller is deployed using helm into our Kubernetes cluster, Kanister lives within its namespace.
首先，我们的控制器使用 Helm 部署到 Kubernetes 集群中，Kanister 位于其自身的命名空间内。
We take our Blueprint of which there are many community-supported blueprints available, we will cover this in more detail shortly.
我们采用 Blueprint（有许多社区支持的 Blueprint 可用），稍后我们将详细介绍这一点。
We then have our database workload.
然后我们有数据库工作负载。

![](Images/Day88_Data2.png)

We then create our ActionSet.
然后我们创建 ActionSet。

![](Images/Day88_Data3.png)

The ActionSet allows us to run the actions defined in the blueprint against the specific data service.
ActionSet 允许我们针对特定的数据服务运行在 blueprint 中定义的操作。

![](Images/Day88_Data4.png)

The ActionSet in turn uses the Kanister functions (KubeExec, KubeTask, Resource Lifecycle) and pushes our backup to our target repository (Profile).
ActionSet 转而使用 Kanister 函数 (KubeExec, KubeTask, Resource Lifecycle) 并将我们的备份推送到我们的目标存储库 (Profile)。

![](Images/Day88_Data5.png)

If that action is completed/failed the respective status is updated in the Actionset.
如果该操作完成/失败，相应的状态将在 Actionset 中更新。

![](Images/Day88_Data6.png)

### Deploying Kanister

Once again we will be using the minikube cluster to achieve this application backup.
我们将再次使用 minikube 集群来实现应用备份。
If you have it still running from the previous session then we can continue to use this.
如果它仍在运行上一会话中的内容，我们可以继续使用它。

At the time of writing, we are up to image version `0.75.0` with the following helm command we will install kanister into our Kubernetes cluster.
在撰写本文时，我们使用的是镜像版本 `0.75.0`，我们将使用以下 helm 命令将 Kanister 安装到我们的 Kubernetes 集群中。

```Shell
helm install kanister --namespace kanister kanister/kanister-operator --set image.tag=0.75.0 --create-namespace
```

![](Images/Day88_Data7.png)

We can use `kubectl get pods -n kanister` to ensure the pod is up and running and then we can also check our custom resource definitions are now available (If you have only installed Kanister then you will see the highlighted 3)
我们可以使用 `kubectl get pods -n kanister` 来确保 Pod 正在运行，然后我们还可以检查我们的自定义资源定义是否可用（如果您只安装了 Kanister，您将看到突出显示的 3 个）。

![](Images/Day88_Data8.png)

### Deploy a Database

Deploying MySQL via helm:
通过 Helm 部署 MySQL：

```Shell
APP_NAME=my-production-app
kubectl create ns ${APP_NAME}
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install mysql-store bitnami/mysql --set primary.persistence.size=1Gi,volumePermissions.enabled=true --namespace=${APP_NAME}
kubectl get pods -n ${APP_NAME} -w
```

![](Images/Day88_Data9.png)

Populate the MySQL database with initial data, and run the following:
使用初始数据填充 MySQL 数据库，并运行以下命令：

```Shell
MYSQL_ROOT_PASSWORD=$(kubectl get secret --namespace ${APP_NAME} mysql-store -o jsonpath="{.data.mysql-root-password}" | base64 --decode)
MYSQL_HOST=mysql-store.${APP_NAME}.svc.cluster.local
MYSQL_EXEC="mysql -h ${MYSQL_HOST} -u root --password=${MYSQL_ROOT_PASSWORD} -DmyImportantData -t"
echo MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
```

### Create a MySQL CLIENT

We will run another container image to act as our client
我们将运行另一个容器镜像作为我们的客户端

```Shell
APP_NAME=my-production-app
kubectl run mysql-client --rm --env APP_NS=${APP_NAME} --env MYSQL_EXEC="${MYSQL_EXEC}" --env MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} --env MYSQL_HOST=${MYSQL_HOST} --namespace ${APP_NAME} --tty -i --restart='Never' --image  docker.io/bitnami/mysql:latest --command -- bash
```

```Shell
Note: if you already have an existing MySQL client pod running, delete with the command

kubectl delete pod -n ${APP_NAME} mysql-client
```

### Add Data to MySQL

```Shell
echo "create database myImportantData;" | mysql -h ${MYSQL_HOST} -u root --password=${MYSQL_ROOT_PASSWORD}
MYSQL_EXEC="mysql -h ${MYSQL_HOST} -u root --password=${MYSQL_ROOT_PASSWORD} -DmyImportantData -t"
echo "drop table Accounts" | ${MYSQL_EXEC}
echo "create table if not exists Accounts(name text, balance integer); insert into Accounts values('nick', 0);" |  ${MYSQL_EXEC}
echo "insert into Accounts values('albert', 112);" | ${MYSQL_EXEC}
echo "insert into Accounts values('alfred', 358);" | ${MYSQL_EXEC}
echo "insert into Accounts values('beatrice', 1321);" | ${MYSQL_EXEC}
echo "insert into Accounts values('bartholomew', 34);" | ${MYSQL_EXEC}
echo "insert into Accounts values('edward', 5589);" | ${MYSQL_EXEC}
echo "insert into Accounts values('edwin', 144);" | ${MYSQL_EXEC}
echo "insert into Accounts values('edwina', 233);" | ${MYSQL_EXEC}
echo "insert into Accounts values('rastapopoulos', 377);" | ${MYSQL_EXEC}
echo "select * from Accounts;" |  ${MYSQL_EXEC}
exit
```

You should be able to see some data as per below.
您应该能够看到一些数据，如下所示。

![](Images/Day88_Data10.png)

### Create Kanister Profile

Kanister provides a CLI, `kanctl` and another utility `kando` that is used to interact with your object storage provider from the blueprint and both of these utilities.
Kanister 提供了一个 CLI 工具 `kanctl` 和另一个实用程序 `kando`，用于从 blueprint 中与您的对象存储提供商进行交互。

[CLI Download](https://docs.kanister.io/tooling.html#tooling)
[CLI 下载](https://docs.kanister.io/tooling.html#tooling)

I have gone and I have created an AWS S3 Bucket that we will use as our profile target and restore location.
我已经创建了一个 AWS S3 存储桶，我们将用它作为我们的 Profile 目标和恢复位置。
I am going to be using environment variables so that I can still show you the commands I am running with `kanctl` to create our kanister profile.
我将使用环境变量，以便我仍然可以向您展示我使用 `kanctl` 运行的命令来创建 Kanister Profile。

`kanctl create profile s3compliant --access-key $ACCESS_KEY --secret-key $SECRET_KEY --bucket $BUCKET --region eu-west-2 --namespace my-production-app`

![](Images/Day88_Data11.png)

### Blueprint time

Don't worry you don't need to create your one from scratch unless your data service is not listed here in the [Kanister Examples](https://github.com/kanisterio/kanister/tree/master/examples) but by all means, community contributions are how this project gains awareness.
不用担心，您不需要从头开始创建自己的 blueprint，除非您的数据服务未在 [Kanister 示例](https://github.com/kanisterio/kanister/tree/master/examples) 中列出，但社区贡献无疑是该项目获得关注的方式。

The blueprint we will be using will be the below.
我们将使用的 blueprint 如下。

```Shell
apiVersion: cr.kanister.io/v1alpha1
kind: Blueprint
metadata:
  name: mysql-blueprint
actions:
  backup:
    outputArtifacts:
      mysqlCloudDump:
        keyValue:
          s3path: "{{ .Phases.dumpToObjectStore.Output.s3path }}"
    phases:
    - func: KubeTask
      name: dumpToObjectStore
      objects:
        mysqlSecret:
          kind: Secret
          name: '{{ index .Object.metadata.labels "app.kubernetes.io/instance" }}'
          namespace: '{{ .StatefulSet.Namespace }}'
      args:
        image: ghcr.io/kanisterio/mysql-sidecar:0.75.0
        namespace: "{{ .StatefulSet.Namespace }}"
        command:
        - bash
        - -o
        - errexit
        - -o
        - pipefail
        - -c
        - |
          s3_path="/mysql-backups/{{ .StatefulSet.Namespace }}/{{ index .Object.metadata.labels "app.kubernetes.io/instance" }}/{{ toDate "2006-01-02T15:04:05.999999999Z07:00" .Time  | date "2006-01-02T15-04-05" }}/dump.sql.gz"
          root_password="{{ index .Phases.dumpToObjectStore.Secrets.mysqlSecret.Data "mysql-root-password" | toString }}"
          mysqldump --column-statistics=0 -u root --password=${root_password} -h {{ index .Object.metadata.labels "app.kubernetes.io/instance" }} --single-transaction --all-databases | gzip - | kando location push --profile '{{ toJson .Profile }}' --path ${s3_path} -
          kando output s3path ${s3_path}
  restore:
    inputArtifactNames:
    - mysqlCloudDump
    phases:
    - func: KubeTask
      name: restoreFromBlobStore
      objects:
        mysqlSecret:
          kind: Secret
          name: '{{ index .Object.metadata.labels "app.kubernetes.io/instance" }}'
          namespace: '{{ .StatefulSet.Namespace }}'
      args:
        image: ghcr.io/kanisterio/mysql-sidecar:0.75.0
        namespace: "{{ .StatefulSet.Namespace }}"
        command:
        - bash
        - -o
        - errexit
        - -o
        - pipefail
        - -c
        - |
          s3_path="{{ .ArtifactsIn.mysqlCloudDump.KeyValue.s3path }}"
          root_password="{{ index .Phases.restoreFromBlobStore.Secrets.mysqlSecret.Data "mysql-root-password" | toString }}"
          kando location pull --profile '{{ toJson .Profile }}' --path ${s3_path} - | gunzip | mysql -u root --password=${root_password} -h {{ index .Object.metadata.labels "app.kubernetes.io/instance" }}
  delete:
    inputArtifactNames:
    - mysqlCloudDump
    phases:
    - func: KubeTask
      name: deleteFromBlobStore
      args:
        image: ghcr.io/kanisterio/mysql-sidecar:0.75.0
        namespace: "{{ .Namespace.Name }}"
        command:
        - bash
        - -o
        - errexit
        - -o
        - pipefail
        - -c
        - |
          s3_path="{{ .ArtifactsIn.mysqlCloudDump.KeyValue.s3path }}"
          kando location delete --profile '{{ toJson .Profile }}' --path ${s3_path}
```

To add this we will use the `kubectl create -f mysql-blueprint.yml -n kanister` command
要添加此 blueprint，我们将使用 `kubectl create -f mysql-blueprint.yml -n kanister` 命令

![](Images/Day88_Data12.png)

### Create our ActionSet and Protect our application

We will now take a backup of the MySQL data using an ActionSet defining backup for this application.
现在，我们将使用一个定义了此应用备份的 ActionSet 来对 MySQL 数据进行备份。
Create an ActionSet in the same namespace as the controller.
在与控制器相同的命名空间中创建一个 ActionSet。

`kubectl get profiles.cr.kanister.io -n my-production-app` This command will show us the profile we previously created, we can have multiple profiles configured here so we might want to use specific ones for different ActionSets
`kubectl get profiles.cr.kanister.io -n my-production-app` 此命令将显示我们之前创建的 profile，我们可以在此处配置多个 profile，因此我们可能希望为不同的 ActionSet 使用特定的 profile。

We are then going to create our ActionSet with the following command using `kanctl`
然后，我们将使用以下 `kanctl` 命令创建 ActionSet：

`kanctl create actionset --action backup --namespace kanister --blueprint mysql-blueprint --statefulset my-production-app/mysql-store --profile my-production-app/s3-profile-dc5zm --secrets mysql=my-production-app/mysql-store`

You can see from the command above we are defining the blueprint we added to the namespace, the statefulset in our `my-production-app` namespace and also the secrets to get into the MySQL application.
从上面的命令中可以看到，我们定义了添加到命名空间中的 blueprint、我们 `my-production-app` 命名空间中的 statefulset，以及用于访问 MySQL 应用的 secrets。

![](Images/Day88_Data13.png)

Check the status of the ActionSet by taking the ActionSet name and using this command `kubectl --namespace kanister describe actionset backup-qpnqv`
通过获取 ActionSet 名称并使用此命令 `kubectl --namespace kanister describe actionset backup-qpnqv` 来检查 ActionSet 的状态。

Finally, we can go and confirm that we now have data in our AWS S3 bucket.
最后，我们可以去确认我们的 AWS S3 存储桶中现在有数据了。

![](Images/Day88_Data14.png)

### Restore

We need to cause some damage before we can restore anything, we can do this by dropping our table, maybe it was an accident, maybe it wasn't.
在我们可以恢复任何东西之前，我们需要造成一些破坏，我们可以通过删除我们的表来实现，也许这是一个意外，也许不是。

Connect to our MySQL pod.
连接到我们的 MySQL Pod。

```Shell
APP_NAME=my-production-app
kubectl run mysql-client --rm --env APP_NS=${APP_NAME} --env MYSQL_EXEC="${MYSQL_EXEC}" --env MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} --env MYSQL_HOST=${MYSQL_HOST} --namespace ${APP_NAME} --tty -i --restart='Never' --image  docker.io/bitnami/mysql:latest --command -- bash
```

You can see that our importantdata DB is there with `echo "SHOW DATABASES;" | ${MYSQL_EXEC}`
您可以使用 `echo "SHOW DATABASES;" | ${MYSQL_EXEC}` 看到我们的 importantdata 数据库在那里。

Then to drop we ran `echo "DROP DATABASE myImportantData;" | ${MYSQL_EXEC}`
然后我们运行 `echo "DROP DATABASE myImportantData;" | ${MYSQL_EXEC}` 来删除它。

And confirmed that this was gone with a few attempts to show our database.
并通过几次尝试查看数据库来确认它已消失。

![](Images/Day88_Data15.png)

We can now use Kanister to get our important data back in business using the `kubectl get actionset -n kanister` to find out the ActionSet name that we took earlier.
我们现在可以使用 Kanister 让我们的重要数据恢复运行，方法是使用 `kubectl get actionset -n kanister` 找出我们之前创建的 ActionSet 名称。
Then we will create a restore ActionSet to restore our data using `kanctl create actionset -n kanister --action restore --from "backup-qpnqv"`
然后，我们将使用 `kanctl create actionset -n kanister --action restore --from "backup-qpnqv"` 创建一个恢复 ActionSet 来恢复我们的数据。

![](Images/Day88_Data16.png)

We can confirm our data is back by using the below command to connect to our database.
我们可以使用以下命令连接到我们的数据库来确认数据已恢复。

```Shell
APP_NAME=my-production-app
kubectl run mysql-client --rm --env APP_NS=${APP_NAME} --env MYSQL_EXEC="${MYSQL_EXEC}" --env MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} --env MYSQL_HOST=${MYSQL_HOST} --namespace ${APP_NAME} --tty -i --restart='Never' --image  docker.io/bitnami/mysql:latest --command -- bash
```

Now we are inside the MySQL Client, we can issue the `echo "SHOW DATABASES;" | ${MYSQL_EXEC}` and we can see the database is back.
现在我们在 MySQL 客户端内部，我们可以执行 `echo "SHOW DATABASES;" | ${MYSQL_EXEC}`，看到数据库已经恢复。
We can also issue the `echo "select * from Accounts;" | ${MYSQL_EXEC}` to check the contents of the database and our important data is restored.
我们还可以执行 `echo "select * from Accounts;" | ${MYSQL_EXEC}` 来检查数据库内容，确认我们的重要数据已恢复。

![](Images/Day88_Data17.png)

In the next post, we take a look at Disaster Recovery within Kubernetes.
在下一篇文章中，我们将探讨 Kubernetes 中的灾难恢复。

## Resources

- [Kanister Overview - An extensible open-source framework for app-lvl data management on Kubernetes](https://www.youtube.com/watch?v=wFD42Zpbfts)
- [Application Level Data Operations on Kubernetes](https://community.cncf.io/events/details/cncf-cncf-online-programs-presents-cncf-live-webinar-kanister-application-level-data-operations-on-kubernetes/)
- [Kubernetes Backup and Restore made easy!](https://www.youtube.com/watch?v=01qcYSck1c4&t=217s)
- [Kubernetes Backups, Upgrades, Migrations - with Velero](https://www.youtube.com/watch?v=zybLTQER0yY)
- [7 Database Paradigms](https://www.youtube.com/watch?v=W2Z7fbCLSTw&t=520s)
- [Disaster Recovery vs. Backup: What's the difference?](https://www.youtube.com/watch?v=07EHsPuKXc0)
- [Veeam Portability & Cloud Mobility](https://www.youtube.com/watch?v=hDBlTdzE6Us&t=3s)

See you on [Day 89](day89.md)
[Day 89](day89.md) 见
