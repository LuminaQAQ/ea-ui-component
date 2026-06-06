---
title: 主题切换 - Easy UI
description: 了解如何使用 Easy UI 的主题系统，手动实现浅色/深色主题切换。
---

# 主题切换

Easy UI 采用双层 CSS 变量架构实现主题切换，支持浅色、深色和跟随系统三种模式。

## 原理

主题系统基于双层 CSS 变量：

- **源变量**（`--ea-source-*`）：定义在 `:root` 和 `html.dark` 上，随主题切换而变化
- **组件变量**：定义在组件 `:host` 上，引用源变量作为值，在 Shadow DOM 内生效

切换主题时，控制器在 `<html>` 元素上添加或移除 `dark` 类名，激活 `html.dark` 选择器下的深色变量覆盖，变更通过 CSS 变量自动传播到所有 Shadow DOM 组件。

## 引入主题样式

使用组件前必须引入主题样式：

```js
// 引入基础主题变量（包含浅色默认值）
import "easy-component-ui/themes/source";
```

如果需要深色主题支持，还需引入深色样式：

```js
import "easy-component-ui/themes/source"; // 基础变量
import "easy-component-ui/themes/dark"; // 深色覆盖变量
```

## 使用主题控制器

主题控制器提供了完整的主题管理 API：

```js
import {
  initTheme,
  setTheme,
  toggleTheme,
  getCurrentTheme,
} from "easy-component-ui/theme";
```

### API

| 方法                | 说明                                                      | 返回值               |
| ------------------- | --------------------------------------------------------- | -------------------- |
| `initTheme()`       | 初始化主题，读取 localStorage 偏好，监听系统主题变化      | `void`               |
| `setTheme(mode)`    | 设置主题模式，`mode` 可选 `"light"` / `"dark"` / `"auto"` | `void`               |
| `toggleTheme()`     | 在浅色和深色之间切换                                      | `void`               |
| `getCurrentTheme()` | 获取当前主题                                              | `"light"` / `"dark"` |

### 初始化

在应用入口调用 `initTheme()`，它会：

1. 读取 `localStorage` 中存储的主题偏好（key 为 `ea-theme`）
2. 若无存储偏好，则跟随系统 `prefers-color-scheme`
3. 监听系统主题变化，当模式为 `auto` 时自动响应

```js
import { initTheme } from "easy-component-ui/theme";

initTheme();
```

### 切换主题

```js
import {
  setTheme,
  toggleTheme,
  getCurrentTheme,
} from "easy-component-ui/theme";

// 切换到深色
setTheme("dark");

// 切换到浅色
setTheme("light");

// 跟随系统
setTheme("auto");

// 在浅色和深色之间切换
toggleTheme();

// 获取当前主题
const theme = getCurrentTheme(); // "light" | "dark"
```

### 监听主题变化

主题切换时，控制器会在 `document` 上派发 `ea-theme-change` 事件：

```js
document.addEventListener("ea-theme-change", e => {
  console.log("当前主题:", e.detail.mode); // "light" | "dark"
});
```

## 在原生项目中使用

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Easy UI 主题切换示例</title>
  </head>
  <body>
    <ea-button variant="primary">主要按钮</ea-button>
    <button id="toggle-btn">切换主题</button>

    <script type="module">
      import "./node_modules/easy-component-ui/dist/themes/source.js";
      import "./node_modules/easy-component-ui/dist/themes/dark.js";
      import "./node_modules/easy-component-ui/dist/components/index.js";
      import {
        initTheme,
        toggleTheme,
      } from "./node_modules/easy-component-ui/dist/themes/controller.js";

      initTheme();

      document.getElementById("toggle-btn").addEventListener("click", () => {
        toggleTheme();
      });
    </script>
  </body>
</html>
```

## 在 Vite + Vue 项目中使用

```js
// main.js
import { createApp } from "vue";
import "./style.css";

import "easy-component-ui/themes/source";
import "easy-component-ui/themes/dark";
import "easy-component-ui/icon-assets";
import "easy-component-ui";

import { initTheme } from "easy-component-ui/theme";

initTheme();

import App from "./App.vue";
createApp(App).mount("#app");
```

在组件中切换主题：

```vue
<template>
  <button @click="handleToggle">切换主题</button>
  <p>当前主题：{{ currentTheme }}</p>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { toggleTheme, getCurrentTheme } from "easy-component-ui/theme";

const currentTheme = ref(getCurrentTheme());

function handleToggle() {
  toggleTheme();
}

function onThemeChange(e) {
  currentTheme.value = e.detail.mode;
}

onMounted(() => {
  document.addEventListener("ea-theme-change", onThemeChange);
});

onUnmounted(() => {
  document.removeEventListener("ea-theme-change", onThemeChange);
});
</script>
```

## 持久化

主题偏好自动持久化到 `localStorage`（key 为 `ea-theme`）：

- `setTheme("light")` — 存储 `"light"`
- `setTheme("dark")` — 存储 `"dark"`
- `setTheme("auto")` — 清除存储，跟随系统

页面刷新后 `initTheme()` 会自动恢复上次的选择。
