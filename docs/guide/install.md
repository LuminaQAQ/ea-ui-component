---
outline: deep
title: 安装 - Easy UI
description: 了解如何通过 npm 或 CDN 安装 Easy UI 组件库，快速集成到您的项目中。
---

# 安装

## npm 安装

```bash
npm i easy-component-ui
```

## 在线引入

通过 unpkg CDN 引入最新版本：

```html
<!-- 引入主题样式 -->
<script type="module">
  import "https://unpkg.com/easy-component-ui/dist/themes/source.js";
</script>

<!-- 引入全部组件 -->
<script type="module">
  import "https://unpkg.com/easy-component-ui/dist/components/index.js";
</script>

<!-- 或引入单个组件 -->
<script type="module">
  import "https://unpkg.com/easy-component-ui/dist/components/ea-button.js";
</script>
```

## 在原生环境引入

安装后，在 HTML 文件中直接引入：

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Easy UI 示例</title>
  </head>
  <body>
    <ea-button variant="primary">主要按钮</ea-button>

    <!-- 引入主题样式 -->
    <script type="module">
      import "./node_modules/easy-component-ui/dist/themes/source.js";
    </script>

    <!-- 引入全部组件 -->
    <script type="module">
      import "./node_modules/easy-component-ui/dist/components/index.js";
    </script>

    <!-- 或按需引入单个组件 -->
    <script type="module">
      import "./node_modules/easy-component-ui/dist/components/ea-button.js";
    </script>
  </body>
</html>
```

## 在 Vite + Vue 项目中引入

### 全部引入

在 `main.js` 或 `main.ts` 中引入：

```js
import { createApp } from "vue";
import "./style.css";

// 引入主题样式
import "easy-component-ui/themes/source";

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

// 引入主题样式
import "easy-component-ui/themes/source";

// 引入图标样式（如果需要使用图标）
import "easy-component-ui/icon-assets";

// 按需引入单个组件
import "easy-component-ui/ea-button";
import "easy-component-ui/ea-input";

import App from "./App.vue";

createApp(App).mount("#app");
```

### 配置 vite.config.js

在 Vue 中使用自定义元素时，需要配置 Vue 编译器以识别 `ea-` 开头的标签：

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

## 文件目录结构

```txt
easy-component-ui/
├─dist/
│  ├─assets/
│  │  └─icon.css              # 图标字体样式（Font Awesome）
│  ├─components/
│  │  ├─index.js              # 全部组件入口
│  │  ├─ea-button.js          # 按钮组件
│  │  ├─ea-icon.js            # 图标组件
│  │  └─...                   # 其他组件
│  ├─core/
│  │  └─*.js                  # 核心基类
│  ├─css/
│  │  └─*.style.js            # 组件样式
│  ├─themes/
│  │  ├─source.js             # 主题基础变量
│  │  ├─light.js              # 浅色主题
│  │  ├─dark.js               # 深色主题
│  │  └─controller.js         # 主题切换控制器
│  └─utils/
│     └─*.js                  # 工具函数
├─README.md
├─LICENSE
└─package.json
```

:::tip

- `dist/components/index.js` - 全部组件入口，引入后会注册所有组件
- `dist/components/ea-*.js` - 单个组件文件，可按需引入
- `dist/assets/icon.css` - 图标字体样式，使用图标组件时需要引入
- `dist/themes/source.js` - 主题基础变量，使用组件前必须引入
- `dist/themes/controller.js` - 主题切换控制器，支持浅色/深色/自动模式
  :::
