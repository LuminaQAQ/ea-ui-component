# 使用

## 快速开始

### 1. 引入组件

在 HTML 文件中：

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Easy Component UI 示例</title>
    <!-- 引入图标样式（如果需要使用图标） -->
    <link
      rel="stylesheet"
      href="./node_modules/easy-component-ui/dist/assets/icon.css"
    />
  </head>
  <body>
    <ea-button type="primary">主要按钮</ea-button>
    <ea-input placeholder="请输入内容"></ea-input>

    <!-- 引入全部组件 -->
    <script type="module">
      import "./node_modules/easy-component-ui/dist/components/index.js";
    </script>
  </body>
</html>
```

### 2. 按需使用

```html
<script type="module">
  // 只引入需要的组件
  import "./node_modules/easy-component-ui/dist/components/ea-button.js";
  import "./node_modules/easy-component-ui/dist/components/ea-input.js";
</script>
```

## 在 Vite + Vue 项目中使用

### 安装

```bash
npm i easy-component-ui
```

### 全部引入

在 `main.js` 中：

```js
import { createApp } from "vue";
import "./style.css";

// 引入图标样式（如果需要使用图标）
import "easy-component-ui/icon-assets";

// 全部引入组件
import "easy-component-ui";

import App from "./App.vue";

createApp(App).mount("#app");
```

### 按需引入

```js
import { createApp } from "vue";
import "./style.css";

// 引入图标样式（如果需要使用图标）
import "easy-component-ui/icon-assets";

// 按需引入
import "easy-component-ui/ea-button";
import "easy-component-ui/ea-input";

import App from "./App.vue";

createApp(App).mount("#app");
```

### 配置 Vite

在 `vite.config.js` 中配置 Vue 编译器以识别自定义元素：

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith("ea-"),
        },
      },
    }),
  ],
});
```

### 在 Vue 组件中使用

```vue
<template>
  <div class="demo">
    <h2>按钮示例</h2>
    <ea-button type="primary">主要按钮</ea-button>
    <ea-button type="success">成功按钮</ea-button>
    <ea-button type="warning">警告按钮</ea-button>
    <ea-button type="danger">危险按钮</ea-button>

    <h2>输入框示例</h2>
    <ea-input v-model="inputValue" placeholder="请输入内容"></ea-input>

    <h2>图标示例</h2>
    <ea-button icon="icon-heart">带图标的按钮</ea-button>
    <ea-icon icon="icon-star"></ea-icon>
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

1. **图标样式**：如果组件使用了图标（如 `ea-button` 的 `icon` 属性），必须引入 `dist/assets/icon.css`
2. **ES Module**：组件使用 ES Module 格式，需要通过 `type="module"` 引入
3. **自定义元素**：所有组件标签以 `ea-` 开头，如 `<ea-button>`、`<ea-input>`
