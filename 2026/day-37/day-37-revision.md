# Day 37 Revision & Self-Assessment

## Self-Assessment Checklist
Please honestly evaluate your knowledge in the following areas:

- [x] Run a container from Docker Hub (interactive + detached)
- [x] List, stop, remove containers and images
- [x] Explain image layers and how caching works
- [x] Write a Dockerfile from scratch with FROM, RUN, COPY, WORKDIR, CMD
- [x] Explain CMD vs ENTRYPOINT
- [x] Build and tag a custom image
- [x] Create and use named volumes
- [ ] Use bind mounts
- [x] Create custom networks and connect containers
- [ ] Write a docker-compose.yml for a multi-container app
- [ ] Use environment variables and .env files in Compose
- [ ] Write a multi-stage Dockerfile
- [ ] Push an image to Docker Hub
- [ ] Use healthchecks and depends_on

---

## Quick-Fire Questions & Answers

### 1. What is the difference between an image and a container?
*Your Answer:* 
Image (镜像) 是只读的模板（类似于系统光盘或类），而 Container (容器) 是根据镜像创建的运行实例（类似于安装好的具体系统或对象实例）。容器在只读镜像层的顶部添加了一个可写层 (Writable Layer)。使用它们的核心目的是实现进程与环境的隔离，保证“一次构建，到处运行”。

---

### 2. What happens to data inside a container when you remove it?
*Your Answer:* 
一旦删除容器，容器内部顶部可写层 (Writable Layer) 中的数据会被彻底销毁，无法找回。为了防止数据丢失，必须使用命名数据卷 (Named Volumes) 或绑定挂载 (Bind Mounts) 将数据持久化到宿主机。

---

### 3. How do two containers on the same custom network communicate?
*Your Answer:* 
它们可以通过 Docker 内置的 DNS 服务进行通信。只要它们被加入同一个自定义桥接网络 (User-defined Network)，就可以直接通过对方的 **容器名称 (Container Name)** 或 **Compose 服务名 (Service Name)** 进行互访，而无需关心频繁变化的内部 IP 地址。

---

### 4. What does `docker compose down -v` do differently from `docker compose down`?
*Your Answer:* 
`docker compose down` 默认只停止并删除容器、网络和镜像。而加上 `-v` (volumes) 参数后，它会额外将 `docker-compose.yml` 中声明的所有匿名和命名数据卷 (Volumes) 一并彻底删除。

---

### 5. Why are multi-stage builds useful?
*Your Answer:* 
多阶段构建 (Multi-stage build) 允许在同一个 Dockerfile 中定义多个构建阶段 (`FROM`)。你可以先在编译阶段使用功能齐备、体积庞大的编译环境进行代码构建，再在最终运行阶段将编译出来的二进制产物拷贝到一个极简的运行环境（如 Alpine）中。这样可以极大减小最终镜像的体积并提升系统安全性。

---

### 6. What is the difference between `COPY` and `ADD`?
*Your Answer:* 
`COPY` 和 `ADD` 都用于将文件复制到容器中。区别在于：
* `COPY` 只支持单纯的本地宿主机文件/目录复制，最清晰、最推荐使用。
* `ADD` 功能更广，支持从远程 URL 下载文件，并且在复制本地压缩文件（如 `.tar.gz`）时，会自动将其解压到容器的目标路径。

---

### 7. What does `-p 8080:80` mean?
*Your Answer:* 
它表示端口映射 (Port Mapping)，将宿主机的 `8080` 端口绑定到容器内部的 `80` 端口。当外部请求访问宿主机的 `8080` 端口时，流量会被 Docker 自动转发给容器内监听 `80` 端口的服务。

---

### 8. How do you check how much disk space Docker is using?
*Your Answer:* 
可以使用命令 `docker system df` 来查看 Docker 的磁盘空间占用情况，包括镜像、容器、本地数据卷以及构建缓存所占的大小。


---

## Weak Spots & Revision Action Plan
1. **Weak Spot 1:** (e.g., Multi-stage builds) - *Action:* Re-read Day 36 notes and rebuild the project.
2. **Weak Spot 2:** (e.g., Docker Networking) - *Action:* Recreate Day 34 network setup.
