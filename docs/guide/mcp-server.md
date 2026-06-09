---
outline: deep
title: MCP Server - Easy UI
description: 通过 MCP Server 让 AI 助手实时检索 Easy UI 组件信息，支持 Cursor、Claude Desktop 等 IDE。
---

# MCP Server

MCP Server 让 AI 助手能够实时检索 Easy UI 组件信息，无需翻阅源码即可获取组件 Props、Events、Slots、CSS 变量和使用示例。

## 功能

| Tool                    | 说明                                                             |
| ----------------------- | ---------------------------------------------------------------- |
| `list_components`       | 列出组件库中所有组件                                             |
| `get_component`         | 获取单个组件的完整信息（Props、Events、Slots、CSS 变量、示例等） |
| `search_components`     | 按关键词模糊搜索组件                                             |
| `get_component_example` | 获取组件的使用示例代码                                           |

## 安装

安装 `easy-component-ui` 后自动包含 MCP Server，无需额外安装：

```bash
npm install easy-component-ui
```

或直接通过 npx 使用，无需安装：

```bash
npx ea-ui-mcp
```

## 配置

### Cursor

编辑项目根目录下的 `.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "ea-ui-component": {
      "command": "npx",
      "args": ["ea-ui-mcp"]
    }
  }
}
```

### Claude Desktop

编辑 `claude_desktop_config.json`：

::: details 配置文件位置

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

:::

```json
{
  "mcpServers": {
    "ea-ui-component": {
      "command": "npx",
      "args": ["ea-ui-mcp"]
    }
  }
}
```

### Windsurf

编辑 `.windsurf/mcp.json`：

```json
{
  "mcpServers": {
    "ea-ui-component": {
      "command": "npx",
      "args": ["ea-ui-mcp"]
    }
  }
}
```

### 全局安装

如果不想每次通过 npx 下载，可以先全局安装：

```bash
npm install -g ea-ui-mcp-server
```

配置改为：

```json
{
  "mcpServers": {
    "ea-ui-component": {
      "command": "ea-ui-mcp-server"
    }
  }
}
```

## 使用

配置完成后，在 AI 对话中直接提问即可：

- "ea-table 支持哪些 Props？"
- "怎么用 ea-select 做多选？给我示例代码"
- "组件库里有没有树形控件？"
- "ea-dialog 有哪些事件？"
- "ea-button 的 size 属性有哪些可选值？"

AI 会自动调用 MCP Tool 查询组件信息并回答。

## Tool 详情

### list_components

列出组件库中所有组件，返回组件名、显示名称、分类和状态。

**参数**：无

**返回示例**：

```json
{
  "components": [
    {
      "name": "ea-table",
      "displayName": "表格",
      "category": "data-display",
      "status": "stable"
    },
    {
      "name": "ea-select",
      "displayName": "选择器",
      "category": "form",
      "status": "stable"
    }
  ]
}
```

### get_component

获取单个组件的完整信息。

**参数**：

| 参数   | 类型   | 必填 | 说明                                            |
| ------ | ------ | ---- | ----------------------------------------------- |
| name   | string | 是   | 组件名，如 `ea-table`                           |
| detail | enum   | 否   | `summary`（概要）或 `full`（完整），默认 `full` |

**返回内容**（full 模式）：

- Props — 属性列表（名称、类型、默认值、描述）
- Events — 事件列表（名称、参数、描述）
- Slots — 插槽列表（名称、描述）
- CSS Custom Properties — CSS 变量（名称、默认值、描述）
- CSS Parts — CSS Part（名称、描述）
- Sub Components — 子组件列表
- Dependencies — 依赖的其他组件
- Examples — 使用示例（标题、类型、代码）

### search_components

按关键词模糊搜索组件。

**参数**：

| 参数     | 类型   | 必填 | 说明                                                                                     |
| -------- | ------ | ---- | ---------------------------------------------------------------------------------------- |
| keyword  | string | 是   | 搜索关键词，如 `table`、`表单`、`选择`                                                   |
| category | string | 否   | 按分类过滤：`basic` / `form` / `data-display` / `navigation` / `feedback` / `foundation` |

### get_component_example

获取组件的使用示例代码。

**参数**：

| 参数        | 类型   | 必填 | 说明                                                           |
| ----------- | ------ | ---- | -------------------------------------------------------------- |
| name        | string | 是   | 组件名，如 `ea-button`                                         |
| exampleType | enum   | 否   | `basic`（基础）/ `advanced`（进阶）/ `all`（全部），默认 `all` |

## 本地开发

如果你在本地开发 ea-ui-component，可以直接从源码运行 MCP Server：

```bash
cd mcp-server
npm install
npm run mcp:build   # 构建并生成组件元数据缓存（含示例预提取）
npm run mcp:start   # 启动 MCP Server
```

本地开发时，配置指向源码编译产物：

```json
{
  "mcpServers": {
    "ea-ui-component": {
      "command": "node",
      "args": ["/path/to/ea-ui-component/mcp-server/dist/index.js"]
    }
  }
}
```

当组件源码变更后，重新运行 `npm run mcp:build` 更新缓存即可。
