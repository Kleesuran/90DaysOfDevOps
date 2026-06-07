# Day 37 Practice Lab: Advanced Docker & Compose

欢迎来到 Docker 进阶实践实验室！

为了帮你彻底攻克在自查清单中发现的 4 个薄弱点：
* **[2] 编写多容器 docker-compose.yml**
* **[3] 使用环境变量与 .env 文件**
* **[4] 编写多阶段构建 Dockerfile**
* **[6] 使用 healthcheck 与 depends_on 协同**

我们设计了一个极其逼真的微服务部署场景：**部署一个 Web 应用（Node.js）并连接 PostgreSQL 数据库**。

---

## 🎯 你的任务与挑战

在当前目录下，我为你生成了 3 个含有“填空与思考注释”的文件：
1. **[Dockerfile](file:///home/klee/repos/90DaysOfDevOps/2026/day-37/practice-lab/Dockerfile)**：多阶段构建的挖空练习。
2. **[docker-compose.yml](file:///home/klee/repos/90DaysOfDevOps/2026/day-37/practice-lab/docker-compose.yml)**：编排、依赖、健康检查的挖空练习。
3. **[.env](file:///home/klee/repos/90DaysOfDevOps/2026/day-37/practice-lab/.env)**：环境变量填空。

请根据每个文件内部的 `# TODO` 注释进行思考，完成代码填空或在注释后写下你的答案。

---

## 💡 课后思考题（请在终端或本文件中回答）

当你阅读并尝试填空后，请思考以下两个问题：
1. **在 `Dockerfile` 中，如果我们把 `COPY --from=builder` 换成普通的 `COPY`，会发生什么错误？为什么？**
2. **在 `docker-compose.yml` 中，如果 `db` 服务的健康检测命令返回失败，`web` 服务会启动吗？如果 `web` 一直在等待 `db`，这在生产环境中有什么利弊？**
