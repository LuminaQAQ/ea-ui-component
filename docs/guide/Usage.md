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

## 注意事项

1. **图标样式**：如果组件使用了图标（如 `ea-button` 的 `icon` 属性），必须引入 `icon-assets`
2. **ES Module**：组件使用 ES Module 格式，需要通过 `type="module"` 引入
3. **自定义元素**：所有组件标签以 `ea-` 开头，如 `<ea-button>`、`<ea-input>`
4. **主题样式**：使用组件前必须引入主题样式 `easy-component-ui/themes/source`，详见 [主题切换](./theme.md)
