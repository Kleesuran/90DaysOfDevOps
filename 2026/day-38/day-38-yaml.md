# Day 38 – YAML Basics

## 1. YAML Files Created

### `person.yaml`
```yaml
# Day 38 - Task 1 & 2: person.yaml
name: "Kleesuran"
role: "Want to be a DevOps Engineer!"
experience_years: 0
learning: true

# Task 2: Add tools and hobbies below
tools:
  - linux
  - docker
  - kubernetes
  - GCP
  - Terraform
hobbies: [video-games, cooking]
```

### `server.yaml`
```yaml
# Day 38 - Task 3 & 4: server.yaml
server:
  name: "web-server-01"
  ip: "192.168.1.10"
  port: 80

database:
  host: "db-server-01"
  name: "production_db"
  credentials:
    user: "db_admin"
    password: "securepassword123"

# Task 4: Add startup_script below using | and >
startup_script_preserve: |
  echo "Updating packages..."
  apt-get update -y
  echo "Done!"

startup_script_folded: >
  This is a very long text
  that we want to write on multiple lines
  but have it read as a single line.
```

## 2. Learning & Notes

### Task 2: What are the two ways to write a list in YAML?
1. **块状格式 (Block Style)**：使用换行，在每个列表项前加上减号和空格（如 `- item`）。
2. **行内格式 (Flow/Inline Style)**：使用中括号 `[item1, item2]` 包裹（类似于 JSON/JS 数组）。

### Task 4: When would you use `|` vs `>`?
* 当需要**保留多行文本的换行符**时使用 `|`（例如编写多行 Shell 脚本命令）。
* 当多行文本仅为了编辑器中排版美观，但在实际读取时希望被**折叠成单行空格分隔文本**时使用 `>`。

### Task 5: Intentionally break the indentation — what error do you get?
会得到语法解析错误。例如当我们错误地将 `startup_script_folded` 缩进 4 格时，Python/Yamllint 报错：
`yaml.parser.ParserError: while parsing a block mapping ... expected <block end>, but found '<block mapping start>'`

### Task 6: Spot the Difference (Why is Block 2 broken?)
在 Block 2 中，`- docker` 和 `- kubernetes` 处于不同的缩进级别。作为同级（兄弟关系）的列表项，它们的减号 `-` 必须在垂直方向上**完美对齐**。此外，`- docker` 前面没有空格，意味着它与 `tools` 变成了平级节点，这彻底破坏了列表的嵌套结构。

## 3. Key Takeaways
1. **空格是 YAML 的灵魂**：缩进决定了层级结构，必须严格平级对齐；且不能使用 `Tab`。
2. **冒号 `:` 和减号 `-` 后面必须加空格**：用来区分语法符号和实际的值内容本身。
3. **强大的多行处理**：`|` 和 `>` 是处理多行复杂配置、自动化脚本的利器。
