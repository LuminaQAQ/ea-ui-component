---
"easy-component-ui": minor
"ea-ui-mcp-server": minor
---

新增编辑器与 AI 场景的元数据产物，组件与 MCP Server 共用同一份解析结果。

- 新增 `easy-component-ui/vue`、`easy-component-ui/jsx`、`easy-component-ui/events` 三个类型入口，分别提供 Vue 模板、React JSX 与原生 `addEventListener` 的类型推断
- 构建时生成 Custom Elements Manifest、web-types、VS Code custom data、`llms.txt` 与 `llms-full.txt`
- 修正 `ea-upload` 四个事件名与实现不一致的问题
- MCP Server 改为构建期生成元数据，补齐子组件标签的属性数据
