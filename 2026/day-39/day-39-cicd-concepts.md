# Day 39: CI/CD Concepts & Principles

## Task 1: The Problem (Manual Deployments & Local Environments)

### 1. What can go wrong when 5 developers manually push code and deploy?
> [您的回答请写在这里]

### 2. What does "it works on my machine" mean, and why is it a real problem in a team?
> [您的回答请写在这里]

### 3. How many times a day can a team safely deploy manually?
> [您的回答请写在这里]

---

## Task 2: CI vs CD (Definitions & Examples)

### 1. Continuous Integration (CI)
* **Definition**: [请输入您的理解，2-3行]
* **Real-world example**: [请输入实例]

### 2. Continuous Delivery (CD - 持续交付)
* **Definition**: [请输入您的理解，2-3行]
* **Real-world example**: [请输入实例]

### 3. Continuous Deployment (CD - 持续部署)
* **Definition**: [请输入您的理解，2-3行]
* **Real-world example**: [请输入实例]

---

## Task 3: Pipeline Anatomy (流水线解构)
请简述以下核心概念的作用：
* **Trigger**: [写在这里]
* **Stage**: [写在这里]
* **Job**: [写在这里]
* **Step**: [写在这里]
* **Runner**: [写在这里]
* **Artifact**: [写在这里]

---

## Task 4: Draw a Pipeline (绘制流水线)
场景：开发人员提交代码到 GitHub -> 测试 -> 构建 Docker 镜像 -> 部署到 Staging 服务器（至少包含 3 个 Stage）。
*您可以使用 Mermaid 语法或 ASCII 字符图在此处绘制：*

```mermaid
% 在此处绘制您的流水线图
```

---

## Task 5: Explore in the Wild (开源项目探索)
请选择一个您熟悉的开源仓库（例如 Kubernetes, React, FastAPI 等），并在其 `.github/workflows/` 中找一个 workflow YAML 文件。
* **Repository name & Workflow file**: [例如: fastapi / .github/workflows/test.yml]
* **What triggers it?**: [写在这里]
* **How many jobs does it have?**: [写在这里]
* **What does it do? (Best guess)**: [写在这里]
