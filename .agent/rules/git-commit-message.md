---
alwaysApply: true
scene: git_message
---

# Git 提交信息规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范，与项目 commitlint 配置保持一致。

## 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

## type 类型

| type     | 说明                     | 示例                                              |
| -------- | ------------------------ | ------------------------------------------------- |
| feat     | 新功能                   | feat(ea-button): 新增 loading 状态                |
| fix      | 修复缺陷                 | fix(ea-input): 修复清空按钮未触发 change 事件     |
| docs     | 文档变更                 | docs(ea-alert): 更新 API 文档                     |
| style    | 代码格式（不影响逻辑）   | style: 统一缩进风格                               |
| refactor | 重构（非新功能、非修复） | refactor(ea-base): 优化属性观察者机制             |
| perf     | 性能优化                 | perf(ea-table): 虚拟滚动减少 DOM 节点             |
| test     | 测试相关                 | test(ea-checkbox): 补充 indeterminate 状态测试    |
| chore    | 构建/工具变动            | chore: 升级 vite 至 v6                            |
| ci       | CI 配置变动              | ci: 添加 GitHub Actions 发布流程                  |
| build    | 构建系统变动             | build: 调整 library 模式输出配置                  |
| revert   | 回滚提交                 | revert: revert feat(ea-drawer): 新增 appendToBody |

## scope 范围

优先使用组件标签名作为 scope，非组件变更使用模块名：

**组件 scope**：`ea-button`、`ea-input`、`ea-select`、`ea-dialog` 等

**模块 scope**：

| scope     | 说明                                        |
| --------- | ------------------------------------------- |
| core      | EaBase、EaFormAssociatedBase 基类           |
| decorator | 装饰器模块（attribute、property、query 等） |
| utils     | 工具函数（bem、html、Enum 等）              |
| constants | 常量定义（variant 等）                      |
| themes    | 主题样式（变量、mixin 等）                  |
| docs      | 文档站点                                    |
| release   | 版本发布                                    |

**多组件变更**：省略 scope 或使用父级分类，如 `feat(components): 新增 size 属性支持`。

## subject 主体

- 使用祈使句、现在时态（如"新增"而非"新增了"，"修复"而非"修复了"）
- 不超过 50 个字符
- 末尾不加句号
- 首字母不大写（英文）、不以大写开头（中文无此限制）
- 简明扼要描述"做了什么"，而非"为什么做"

## body 正文

- 与 subject 空一行
- 解释"为什么做"和"怎么做"，而非"做了什么"
- 每行不超过 72 个字符
- 可省略（简单变更无需 body）
- 使用无序列表（`-`），禁止使用有序列表（`1.`）

## footer 页脚

- 与 body 空一行
- **破坏性变更**：以 `BREAKING CHANGE:` 开头，描述变更内容、影响范围和迁移方式
- **关闭 Issue**：`Closes #123` 或 `Fixes #456`
- **关联提交**：`Ref: abc1234`

## 破坏性变更

在 type 后加 `!` 或在 footer 中使用 `BREAKING CHANGE:`：

```
feat(ea-base)!: 重构属性观察者机制

BREAKING CHANGE: observer 函数签名变更，this 指向改为组件实例。
迁移方式：将 observer(this: any, newVal, oldVal) 改为 observer(this: ComponentClass, newVal, oldVal)。
```

## 示例

### 新功能

```
feat(ea-tabs): 新增 before-leave 钩子属性

支持切换标签页前的拦截，返回 Promise 时等待异步结果决定是否切换。
```

### 缺陷修复

```
fix(ea-select): 修复多选模式下清空后下拉选项未更新

多选清空时未触发 value observer，导致已选标签残留。
```

### 重构

```
refactor(decorator): 统一装饰器导出路径

所有装饰器从 @decorator 统一导入，废弃零散路径如 @decorator/attribute。
```

### 破坏性变更

```
feat(core)!: 属性系统重构为装饰器模式

BREAKING CHANGE: this.properties() 方式废弃，改用 @attribute 和 @property 装饰器。
迁移方式：参见 v3.0 迁移指南。
```
