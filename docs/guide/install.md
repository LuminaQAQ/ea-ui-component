---
outline: deep
---

# 安装

## npm 安装

```bash
npm init -y

npm i easy-component-ui
```

## 在线引入

通过 unpkg CDN 引入最新版本：

```html
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

:::warning
如果项目中会使用到带有图标的组件，需要先引入图标样式文件
:::

```html
<!-- 引入图标样式（如果需要使用图标） -->
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/dist/assets/icon.css"
/>

<!-- 引入全部组件 -->
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/index.js";
</script>

<!-- 或按需引入单个组件 -->
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-button.js";
</script>
```

## 在 Vite + Vue 项目中引入

### 全部引入

在 `main.js` 或 `main.ts` 中引入：

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

## 如何获取单独的图标组件

> 1. [npm 安装](#npm-安装)
> 2. [jsdelivr](https://www.jsdelivr.com/package/npm/easy-component-ui?tab=files)
> 3. [github 发布页](https://github.com/LuminaQAQ/ea-ui-component/releases)

## 文件目录结构

```txt
easy-component-ui/
├─dist/
│  ├─assets/
│  │  └─icon.css              # 图标字体样式
│  ├─components/
│  │  ├─index.js              # 全部组件入口
│  │  ├─Base.js               # 组件基类
│  │  ├─ea-button.js          # 按钮组件
│  │  ├─ea-icon.js            # 图标组件
│  │  └─...                   # 其他组件
│  ├─core/
│  │  └─FormBase.js           # 表单组件基类
│  ├─css/
│  │  └─*.style.js            # 组件样式
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
  :::
