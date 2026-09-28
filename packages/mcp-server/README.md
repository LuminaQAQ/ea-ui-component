# ea-ui-mcp-server

ea-ui-component 组件库的 MCP Server，让 AI 助手（Cursor / Claude Desktop / Windsurf）能够实时检索组件信息。

## 功能

- **list_components** — 列出组件库中所有组件
- **get_component** — 获取单个组件的完整信息（Props、Events、Slots、CSS 变量、子组件等）
- **search_components** — 按关键词模糊搜索组件
- **get_component_example** — 获取组件的使用示例代码

## 安装

```bash
npm install -g ea-ui-mcp-server
```

或直接通过 npx 使用，无需安装：

```bash
npx ea-ui-mcp-server
```

## 配置

### Cursor

编辑 `.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "ea-ui-component": {
      "command": "npx",
      "args": ["-y", "ea-ui-mcp-server"]
    }
  }
}
```

### Claude Desktop

编辑 `claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "ea-ui-component": {
      "command": "npx",
      "args": ["-y", "ea-ui-mcp-server"]
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
      "args": ["-y", "ea-ui-mcp-server"]
    }
  }
}
```

### 全局安装

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

## 使用示例

配置完成后，在 AI 对话中直接提问：

- "ea-table 支持哪些 Props？"
- "怎么用 ea-select 做多选？给我示例代码"
- "组件库里有没有树形控件？"
- "ea-dialog 有哪些事件？"

AI 会自动调用 MCP Tool 查询组件信息并回答。

## Tool 说明

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

### search_components

按关键词模糊搜索组件。

**参数**：

| 参数     | 类型   | 必填 | 说明                                                               |
| -------- | ------ | ---- | ------------------------------------------------------------------ |
| keyword  | string | 是   | 搜索关键词                                                         |
| category | string | 否   | 按分类过滤：basic/form/data-display/navigation/feedback/foundation |

### get_component_example

获取组件的使用示例代码。

**参数**：

| 参数        | 类型   | 必填 | 说明                                 |
| ----------- | ------ | ---- | ------------------------------------ |
| name        | string | 是   | 组件名                               |
| exampleType | enum   | 否   | `basic`/`advanced`/`all`，默认 `all` |

## 开发

```bash
# 安装依赖
cd mcp-server && npm install

# 构建并生成元数据缓存
npm run mcp:build

# 启动 MCP Server
npm run mcp:start
```

## License

MIT
