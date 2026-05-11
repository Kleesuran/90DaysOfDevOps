# Day 33: Docker Compose 多容器基础 学习笔记

## 1. 核心目标
学习如何使用 Docker Compose (或 Podman Compose) 通过单一的 YAML 配置文件管理多容器应用，实现：
- **一键部署**：替代复杂的 `docker run` 命令链。
- **声明式配置**：在文件中定义服务、网络、卷和依赖。
- **环境隔离**：使用环境变量管理敏感信息。

---

## 2. 实验记录

### Task 1 & 2: 环境验证与第一个 Compose 文件
- **工具环境**：使用 `podman-compose` 代替 `docker compose`。
- **避坑指南**：在 Podman 中，镜像名需要使用完整路径（例如 `docker.io/library/nginx:latest`），否则会报 `short-name resolution` 错误。
- **成果**：通过 `docker compose up` 成功启动 Nginx，并映射 8080 端口。

### Task 3: WordPress + MySQL 协作
- **架构设计**：
    - **MySQL 服务**：负责数据存储，使用 `Named Volume` (db_data) 实现持久化。
    - **WordPress 服务**：负责网页应用，通过 `depends_on` 声明对数据库的依赖。
- **关键现象**：启动初期出现 `Error establishing a database connection`。
- **结论**：数据库初始化需要时间。在分布式系统中，**服务启动顺序不等于服务可用顺序**。等待约 30 秒或执行 `docker compose restart wordpress` 后恢复正常。

### Task 4: 常用命令实战
- `docker compose up -d`：后台启动所有服务。
- `docker compose ps`：查看当前编排中的所有容器状态。
- `docker compose logs -f [service]`：查看实时日志，定位连接问题。
- `docker compose down -v`：彻底销毁系统，并删除数据卷（慎用）。

### Task 5: 环境变量与 .env 文件
- **实践**：创建 `.env` 文件存储 `DB_PASSWORD`，在 `docker-compose.yml` 中使用 `${DB_PASSWORD}` 引用。
- **安全性**：实现了配置与代码分离，防止敏感信息（密码）直接硬编码在 Compose 文件中。
- **进阶知识**：MySQL 镜像的环境变量仅在**首次初始化**（卷为空）时读取。修改 `.env` 后若想立即生效，需清理旧卷重来。

---

## 3. 核心概念对比

| 维度 | Dockerfile | Docker Compose |
| :--- | :--- | :--- |
| **职责** | **构建 (Build)**：定义“单个”镜像里装什么。 | **编排 (Orchestrate)**：定义“一堆”容器怎么配合。 |
| **产物** | 一个静态的镜像 (Image)。 | 一个运行中的系统 (Service Stack)。 |
| **类比** | 一道菜的“菜谱”。 | 一份完整的“套餐单”。 |

---

## 4. 学习心得
1. **从手动到自动化**：Compose 将昨天繁琐的网络创建、卷挂载、运行命令压缩成了一个文件。
2. **状态管理**：通过 `volumes`，Compose 实现了即使容器“灰飞烟灭”，数据依然“岿然不动”。
3. **安全意识**：`.env` 文件的使用是迈向生产环境部署的第一步，一定要养成不把明文密码写进代码的习惯。

---
`#90DaysOfDevOps` `#DockerCompose` `#Podman` `#Orchestration` `#Persistence`

Happy Learning!
**TrainWithShubham**
