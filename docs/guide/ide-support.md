---
outline: deep
title: IDE 类型提示 - Easy UI
description: 在 Vue、VS Code、WebStorm 中获得 Easy UI 组件的标签名、属性、枚举值与事件提示。
---

# IDE 类型提示

组件库在构建时会生成一套 IDE 元数据，启用后可以在编辑器里获得：

- 标签名补全：输入 `<ea-` 列出全部组件
- 属性名补全与类型检查
- 枚举值补全（如 `variant=""` 内提示 `primary` / `success` 等）
- 事件提示（如 `@ea-close`）
- 悬停文档：组件的属性、方法、事件、插槽、CSS 变量与 CSS Part

不同技术栈的启用方式不同，见下。

## Vue

在项目的类型声明文件（如 `src/env.d.ts`）中加入一行：

```ts
import "easy-component-ui/vue";
```

之后 `.vue` 模板中的 `ea-*` 标签即可获得完整的属性与事件类型检查。

::: tip 两种写法都支持
无论你是否显式 `import { EaButton } from "easy-component-ui"`，模板提示都能正常工作。
:::

### 布尔属性要用绑定写法

HTML 属性值总是字符串，布尔属性需要用 `:` 绑定：

```vue
<!-- 错误：string 不能赋给 boolean -->
<ea-alert show-icon="true" />

<!-- 正确 -->
<ea-alert :show-icon="true" />
```

### 事件

事件以 `on` 前缀的属性形式参与类型检查，模板中照常写 `@`：

```vue
<ea-alert @ea-close="handleClose" />
```

handler 的参数类型为 `CustomEvent`，具体 `detail` 结构见组件文档。

## VS Code（纯 HTML）

在项目根目录的 `.vscode/settings.json` 中指向组件库的类型数据文件：

```json
{
  "html.customData": [
    "node_modules/easy-component-ui/dist/vscode.html-custom-data.json"
  ]
}
```

保存后重载窗口（`Developer: Reload Window`）即可在 `.html` 文件中获得补全与悬停文档。

### 事件

HTML 属性无法承载事件绑定，事件统一通过 `addEventListener` 注册。
引入事件类型后，事件名与 `event.detail` 均有类型：

```html
<script type="module">
  import "easy-component-ui";
  import "easy-component-ui/events";

  const table = document.querySelector("ea-table");
  table.addEventListener("ea-row-click", event => {
    // event.detail 的类型由对应事件类定义
    console.log(event.detail.row);
  });
</script>
```

::: warning 标签上没有事件提示
HTML custom data 规范只包含标签与属性，没有事件概念，因此 `<ea-table on…>` 这类写法既无补全也不会生效。
:::

## WebStorm / IntelliJ IDEA

无需配置。组件库的 `package.json` 已声明 `web-types` 字段，IDE 会自动读取：

```json
{
  "web-types": "./dist/web-types.json"
}
```

## React / JSX

在项目的类型声明文件（如 `src/react-env.d.ts`）中加入：

```ts
import "easy-component-ui/jsx";
```

之后 TSX 中的 `ea-*` 标签即可获得属性与事件类型检查：

```tsx
<ea-button variant="primary" disabled>确定</ea-button>
<ea-alert onEaClose={event => console.log(event.detail)} />
```

需要项目已安装 `react` 与 `@types/react`。

::: tip 事件名乘驼峰
JSX 不支持带连字符的属性名，自定义事件统一转为 `on` + 驼峰形式：`ea-close` → `onEaClose`、`ea-upload-success` → `onEaUploadSuccess`。
:::

## 元数据来源

上述能力来自构建时生成的四份文件，随 `easy-component-ui` 包一起发布：

| 文件                                | 用途                                              |
| ----------------------------------- | ------------------------------------------------- |
| `dist/vue.d.ts`                     | Vue SFC 模板类型增强                              |
| `dist/jsx.d.ts`                     | React JSX 元素类型声明                            |
| `dist/events.d.ts`                  | 事件类型增强（`addEventListener` 推断）           |
| `dist/vscode.html-custom-data.json` | VS Code HTML 补全与悬停                           |
| `dist/web-types.json`               | WebStorm / IDEA 补全与悬停                        |
| `dist/custom-elements.json`         | Custom Elements Manifest，供 Storybook 等工具消费 |

数据由组件源码的装饰器与 JSDoc 解析生成，与 MCP Server 使用同一份解析结果，因此编辑器里看到的 API 与 AI 助手查到的一致。

## AI 助手

如果希望 AI 助手也能直接查询组件 API，参见 [MCP Server](./mcp-server)。

站点还提供 `llms.txt` 与 `llms-full.txt`，可供支持该规范的工具直接抓取：

- `https://luminaqaq.github.io/ea-ui-component/llms.txt` —— 全部组件索引
- `https://luminaqaq.github.io/ea-ui-component/llms-full.txt` —— 全部组件的完整 API
