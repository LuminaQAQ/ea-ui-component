---
title: 使用 - Easy UI
description: 快速上手 Easy UI 组件库，了解如何在 HTML、Vue、React 等项目中引入和使用组件。
---

# 使用

## 快速开始

安装和引入方式请参考 [安装](./install.md) 章节。

## 在 Vue 组件中使用

```vue
<template>
  <div class="demo">
    <h2>按钮示例</h2>
    <ea-button variant="primary">主要按钮</ea-button>
    <ea-button variant="success">成功按钮</ea-button>
    <ea-button variant="warning">警告按钮</ea-button>
    <ea-button variant="danger">危险按钮</ea-button>

    <h2>输入框示例</h2>
    <ea-input v-model="inputValue" placeholder="请输入内容"></ea-input>

    <h2>图标示例</h2>
    <ea-button icon="fa-solid fa-heart">带图标的按钮</ea-button>
    <ea-icon icon="fa-solid fa-star"></ea-icon>
  </div>
</template>

<script setup>
import { ref } from "vue";

const inputValue = ref("");
</script>
```

## 组件注册检测

与传统框架不同，自定义元素没有集中式的初始化阶段。这意味着在尝试与其属性或方法交互之前，您需要验证自定义元素是否已正确注册。

::: tip
特别的，当与其属性或方法交互时，元素未进行相应更新。可以通过确认这点来排查问题。
:::

```js
// 等待组件注册完成
await customElements.whenDefined("ea-button");

const button = document.querySelector("ea-button");
// 现在可以安全地操作组件
button.disabled = true;
```

## HTML 安全边界

组件不内置运行期 HTML 清洗（不再依赖 DOMPurify）。模板由组件作者编写、视为可信；用户提供的属性值按纯文本插入，需要插入 HTML 时自行转义。

```js
import { escapeHTML, html, setHTML } from "easy-component-ui";

// 动态值一律走 escapeHTML，属性上下文（含 class / name 等）同样适用
const label = '<img src=x onerror="alert(1)">';
setHTML(panel, html(`<span class="label">${escapeHTML(label)}</span>`));
```

| API            | 用途                                                    |
| -------------- | ------------------------------------------------------- |
| `escapeHTML()` | 转义 `& < > " '`，所有动态值的默认选择                  |
| `html()`       | 声明模板可信；不做清洗，模板里含内联事件等会告警        |
| `setHTML()`    | 唯一的 HTML 写入入口，负责把字符串写进元素或 ShadowRoot |
| `insertHTML()` | 同上，用于在指定位置插入（`afterbegin` 等）             |

::: tip
确实需要渲染 HTML 的属性（如 `ea-message` 的 `message`）需显式开启对应开关，例如 `dangerously-use-html-string`；其余组件的 `heading`、`label` 等文本属性均按纯文本渲染，富文本请改用同名 slot。
:::

## 注意事项

1. **图标样式**：如果组件使用了图标（如 `ea-button` 的 `icon` 属性），必须引入 `icon-assets`
2. **ES Module**：组件使用 ES Module 格式，需要通过 `type="module"` 引入
3. **自定义元素**：所有组件标签以 `ea-` 开头，如 `<ea-button>`、`<ea-input>`
4. **主题样式**：使用组件前必须引入主题样式 `easy-component-ui/themes/source`，详见 [主题切换](./theme.md)
