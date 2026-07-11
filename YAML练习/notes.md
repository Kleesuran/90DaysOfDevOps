# YAML 基础学习笔记与练习

YAML（YAML Ain't Markup Language）是一种人类可读的数据序列化语言。它在 DevOps 领域（如 Docker Compose、Kubernetes、GitHub Actions 等）被广泛应用。

## 📌 YAML 核心语法三大纪律
1. **大小写敏感**。
2. **使用缩进表示层级关系**：
   - **绝对不能**使用 Tab 键，必须使用**空格**（推荐 2 个空格）。
   - 同一同一层级的元素左侧必须对齐。
3. **冒号/短横线后必须有空格**：
   - 键值对表示为 `key: value`（注意冒号后面有一个空格！）。
   - 列表项表示为 `- item`（注意短横线后面有一个空格！）。

---

## ✍️ YAML 基础语法结构

### 1. 键值对 (Key-Value)
```yaml
name: Antigravity
role: Tutor
```

### 2. 对象/映射 (Maps / Dictionaries)
```yaml
student:
  name: klee
  status: learning
```

### 3. 数组/列表 (Lists / Sequences)
```yaml
skills:
  - Docker
  - Kubernetes
  - GitHub Actions
```
或者也可以写成行内格式（类似 JSON）：
```yaml
skills: [Docker, Kubernetes, GitHub Actions]
```

### 4. 复合结构（最常用，如 K8s/Compose 中的容器定义）
```yaml
containers:
  - name: web
    image: nginx:latest
    ports:
      - 80
      - 443
  - name: db
    image: postgres:15
    ports:
      - 5432
```

---

## 🎯 闯关任务 1：完成第一个 YAML 文件

请打开同目录下的 [practice.yaml](file:///home/klee/repos/90DaysOfDevOps/YAML练习/practice.yaml) 文件，根据以下需求补充内容：

**需求**：
1. 创建一个名为 `app` 的对象，它有以下属性：
   - `name` 值为 `my-devops-app`
   - `version` 值为 `1.0.0`
2. 添加一个名为 `services` 的列表，包含两个服务：
   - 第一个服务：
     - `name`: `web`
     - `port`: `8080`
   - 第二个服务：
     - `name`: `redis`
     - `port`: `6379`

请完成修改后保存，并在聊天框中告诉我，我将自动帮你运行验证！
