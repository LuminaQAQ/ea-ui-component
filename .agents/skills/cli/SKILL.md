---
name: "cli"
description: "ea-ui-component 工程 CLI（ea add / ea check / ea init）：新建组件必须走 ea add，校验组件目录规范走 ea check。Invoke when creating a new component, scaffolding component boilerplate, generating component files, checking component directory structure, or working with ea.config.json."
---

# 工程 CLI（ea）

`@easy-component-ui/cli`（bin 名 `ea`）是组件库工程 CLI，负责把「组件目录规范」变成机械可执行的命令。三条命令：

| 命令                                | 用途                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------ |
| `ea add [name]`（别名 `new`/`gen`） | **生成合规新组件**（三件套；支持复合组件 / 私有组件）                          |
| `ea check`                          | 校验组件目录规范（同名测试 / 孤儿测试 / 命名 / 共享测试区），有 error 退出码 1 |
| `ea init`                           | 将内置模板落盘到项目（二次开发起点，`--templates`）                            |

> **核心约定：新建组件一律先走 `ea add`，不要手写组件骨架。** 手写会漏掉注册、同名测试、聚合出口等机械环节，属于规范漂移的根源。

## 本仓库调用方式（重要）

CLI 在本仓库以**源码形式**接入（不依赖构建产物），root `package.json` 提供转发脚本：

```json
"ea": "tsx packages/cli/src/bin.ts",
"check": "tsx packages/cli/src/bin.ts check"
```

因此在本仓库内必须经包管理器脚本转发（因 CLI 尚未作为全局可执行发布）：

```bash
# pnpm（推荐，参数直接透传）
pnpm ea add my-widget
pnpm ea add my-widget --with sub-panel --parts item --summary "摘要" --yes
pnpm ea check            # 等价于：pnpm check
pnpm ea --help

# npm（需用 -- 透传参数）
npm run ea -- add my-widget
npm run check
```

- pnpm 会直接把 `ea` 之后的参数传给脚本；npm 必须在脚本名后加 `--`。
- 三方复用：当前包为 `private: true`（尚未发布到 npm），三方项目需**复制 `packages/cli` 源码**并自行接入 `bin` / 脚本转发（见 `build/cli-design-plan.md` 决策 14）。

## `ea add`（新建组件）

```text
ea add [name] [--with <names...>] [--parts <names...>] [--summary <text>]
              [--internal] [--dry-run] [--yes]
```

| 选项                 | 说明                                                                                     |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `name`（位置参数）   | 组件名（kebab-case，可省略走交互问答）。可含 `prefix-` 前缀，也可只给裸名，自动归一化    |
| `--with <names...>`  | 附属组件名（**对外暴露**，进聚合出口）。可多个，空格 / 逗号混排均可                      |
| `--parts <names...>` | 私有子组件名（**不对外导出**，仅主实现副作用注册 + 追加 `@dependency` 文档）             |
| `--summary <text>`   | 组件摘要（写入 `@summary` JSDoc；缺省时交互询问，非交互留空）                            |
| `--internal`         | 生成到 internal 内部组件目录（`componentDirs` 中 `internal: true` 的目录），不进聚合出口 |
| `--dry-run`          | 仅预览将创建的文件树 + 聚合入口新增行，**不落盘**                                        |
| `--yes`              | 跳过写盘前确认（脚本 / CI 非交互场景；要求全部输入已由参数给全）                         |

### 前置要求与运行三态

- **前置要求**：`ea add` 是写操作，要求**完整 config**（`componentDirs` / `testDir` / `entry` 等路径 + `prefix` 均必配）。缺 `prefix` 会前置报错并引导配置——`prefix` 是类名 / 标签名生成的前提。
- **运行三态**：
  1. 交互模式（TTY）：整体预览卡片 + confirm 后落盘；
  2. `--dry-run`：任何环境只预览不落盘；
  3. 无 TTY：未给全输入时直接报错退出（脚本场景请用参数给全 + `--yes`）。

### 生成产物

**单组件（默认）**：

```text
packages/components/src/components/ea-my-widget/
├── index.ts                 # 组件实现 + TagNameMap 自声明 + export default
├── index.scss               # BEM 样式骨架
└── ea-my-widget.test.ts     # 同名 Vitest 用例骨架
```

**复合组件（`--with`）**：主出口改为「薄出口」，实现下沉到 `components/`：

```text
ea-foo/
├── index.ts                 # 薄主出口（entry.ts.tpl）：import 主/附属实现 + export/default
├── ea-foo.test.ts           # 测试仅在组件根，经主出口 import 链注册全部子组件
└── components/
    ├── ea-foo/index.ts + index.scss        # 主实现（截断值导出段）
    └── ea-bar/index.ts + index.scss        # 附属实现（同样截断值导出段）
```

- 子目录名 = 子组件**完整标签名**（如 `ea-bar` 而非 `bar`）。
- `--parts`（私有组件）：生成到 `components/<私有名>/`，主实现里以副作用 `import "./components/<私有名>/index";` 注册，且**不进聚合出口 / 不对外导出**。

### 写盘后的连锁动作

`ea add` 落盘后会**自动重建聚合入口**（在 `// @ea-generated:start` / `// @ea-generated:end` 哨兵区内补上新组件的再导出行）。生成后需人工补齐：

1. `@summary` / `@since`（若为空、或 `@since` 探测不到而写 `unknown`，需手动补）；
2. `index.scss` 样式与 `index.ts` 交互逻辑（模板仅骨架）；
3. `<完整名>.test.ts` 的实际用例（模板仅基础渲染断言）；
4. **事件声明与 `@event` JSDoc**：`ea add` **不生成** `events/` 目录，模板 JSDoc 也只有 `@summary` / `@status` / `@since` / `@dependency` / `@slot` / `@csspart`，**没有 `@event`**。需要对外事件时，手动建 `events/Ea{Component}{Action}Event.ts` 并补组件 JSDoc 的 `@event` 标签（参见 `event` 技能）。

## `ea check`（校验规范）

```text
ea check [--ignore <name...>]
```

校验规则（与 `check.ts` 一一对应）：

| 规则                  | 级别    | 内容                                                                       |
| --------------------- | ------- | -------------------------------------------------------------------------- |
| `missing-test`        | error   | 组件目录含 `index.ts` ⇒ 须有同名 `<完整组件名>.test.ts`（或 `.test.js`）   |
| `orphan-test`         | error   | 有测试但无 `index.ts`（孤儿测试）                                          |
| `test-root-violation` | error   | 共享测试区根目录出现单组件测试（须在组件目录内或加入白名单）               |
| `naming`              | error   | 组件名须为 `${prefix}-` + kebab-case；未配置 prefix 时退化为纯 WC 全名校验 |
| `ignore-reason`       | warning | 豁免条目缺 `reason`                                                        |
| `ignore-stale`        | warning | 豁免条目对应目录已不存在 / 未命中任何违规                                  |

- 有 error ⇒ 退出码 `1`；warning 不影响退出码。
- `--ignore <name...>` 临时豁免（叠加 config）。
- 这是 CI 门禁：`.github/workflows/ci.yml` 通过 root `pnpm test`（= `test:run` + `check`）执行。

## `ea init`（模板落盘）

```text
ea init [--templates] [--dir <path>] [--force]
```

- `--templates`：把内置模板（`packages/cli/templates/*.tpl` + `README.md`）写到项目模板目录，作为二次开发起点；
- `--dir`：输出目录（缺省取 `ea.config.json` 的 `templates`，再回落 `ea-templates/`）；
- `--force`：覆盖已存在同名模板（默认跳过）。
- 落盘后在 `ea.config.json` 配置 `"templates": "<目录>"`，`ea add` 会优先用项目模板（未覆盖的文件回落内置）。

## `ea.config.json`（契约）

| 字段                      | 必填 | 说明                                                                      |
| ------------------------- | ---- | ------------------------------------------------------------------------- |
| `project.prefix`          | 是\* | 组件命名空间前缀（如 `"ea"`），须匹配 `^[a-z][a-z0-9]*$`；`ea add` 必配   |
| `project.componentDirs`   | 是   | 组件目录：字符串（公开）或 `{ path, internal: true }`（内部）的数组       |
| `project.testDir`         | 是   | 共享测试区目录                                                            |
| `project.entry`           | 是   | 聚合出口文件路径（CLI 生成维护的哨兵区 barrel）                           |
| `templates`               | 否   | 项目自定义模板目录（目录约定见 `templates/README.md`）                    |
| `check.rootTestWhitelist` | 否   | 共享测试区根目录的测试白名单（基类 / 特殊测试）                           |
| `check.ignore`            | 否   | 豁免条目数组 `{ name, rules?, reason? }`；`rules` 缺省=豁免全部可豁免规则 |

\* `prefix` 对 `ea check`（读路径）可选（退化为纯 WC 全名校验），对 `ea add`（写路径）必配。

## 命名规则

| config.prefix | 输入                 | 处理                                           |
| ------------- | -------------------- | ---------------------------------------------- |
| 已配置 `ea`   | `color-picker`       | 非 `ea-` 开头 ⇒ 拼接为 `ea-color-picker`       |
| 已配置 `ea`   | `ea-color-picker`    | 已含前缀 ⇒ 剥离裸名 `color-picker`，全名即输入 |
| 已配置 `ea`   | `ea`                 | **拒绝**（恰等于 prefix，几乎必为笔误）        |
| 已配置 `ea`   | `ea-`                | **拒绝**（剥出裸名为空）                       |
| 任意          | 含大写（`MyWidget`） | **拒绝**（须 kebab-case）                      |

- 最终全名强校验：WC 格式（`^[a-z][a-z0-9]*(-[a-z0-9]+)+$`）+ 保留标签名黑名单。
- 长度上限：全名 ≤ 246 字符（为同目录 `<全名>.test.ts` 文件名预留）。
- 归一化结果示例：`color-picker → ea-color-picker · EaColorPicker`。

## 聚合入口机制（勿手改制度）

- 聚合出口由 `regenerateAggregateEntry(config)` 维护，只重建 `// @ea-generated:start` 至 `// @ea-generated:end` 之间的内容，**标记区之外的手工内容原位保留**。
- 名单来源 = **各公开组件 `index.ts` 的具名值导出**（机械投影）。因此组件 `index.ts` 只导出该组件的公开 API 值（组件类 / 子组件类 / 服务类），非组件工具不进组件出口。
- **禁止**在手工区写入与生成名单重复的导出；无哨兵标记且存在多余行时，重建会中止报错（防止销毁手工内容）。

## 与其它技能的关系

`ea add` 只负责生成**合规骨架**；组件细节仍在生成产物上继续完善，按需组合：

| 需求            | 对应技能                                                   |
| --------------- | ---------------------------------------------------------- |
| 属性 / 变体定义 | `attribute`、`property`、`variant`                         |
| DOM / 事件      | `query`、`children`、`listen`、`event`                     |
| 样式            | `css`、`bem`、`bem-mixin`                                  |
| 测试 / 文档     | `test`、`doc`                                              |
| 信息 / 安全     | `custom-element`（JSDoc）、`html-safe`、`type-declaration` |

## 常见陷阱

1. **不要手写新组件骨架**——`ea add` 已内置注册 / JSDoc / TagNameMap / 测试 / BEM 骨架，手写必漏。
2. **非交互环境必须给全参数**：无 TTY 且缺 `name` 或 `--summary` 会报错；脚本场景加 `--yes`。
3. **重名检测覆盖**：主名 vs 现有目录、子名 vs 主名 / 现有目录、同批 `--with` 内部互斥。
4. **`--internal` 需要 config 里存在 `internal: true` 的目录**，否则报错。
5. **`--parts` 不会进聚合出口**，别到出口里找它；它在主实现的副作用 import 中注册。
6. **不要手改 `// @ea-generated:*` 标记区内内容**，下次 `ea add` / 构建会覆盖重建。
7. **Windows CRLF**：聚合解析已兼容 `\r?\n`，如自定义脚本解析入口文件请同样处理。
