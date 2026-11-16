---
title: 主题切换 - Easy UI
description: 了解如何使用 Easy UI 的主题系统，手动实现浅色/深色主题切换。
---

# 主题切换

Easy UI 的主题只靠 CSS 变量实现，支持浅色、深色和跟随系统三种模式。

## 原理

变量的定义分两层：

- **源变量**（`--ea-source-*`）写在 `:root` 和 `html.dark` 上，切换主题时改的是这一层
- **组件变量**写在组件自己的 `:host` 上，值是 `var(--ea-source-*)`，所以在 Shadow DOM 里也能跟着变

切换主题时，控制器在 `<html>` 上加或去掉 `dark` 类名，`html.dark` 下的深色变量随之生效，Shadow DOM 里的组件不需要额外处理。

## 引入样式

组件的颜色来自语义变量（`--color-*`、`--blue-*` 这些），它们不由 core 提供，需要你在外面注入一次。不做这一步，组件能渲染出来但没有配色。

### 用组件库主包（推荐）

```js
import "easy-component-ui";
```

主包入口已经调过 `setBaseStyles(themes/base)`。按需引入单个组件也一样，比如 `import "easy-component-ui/ea-button"`，组件入口会做同样的注入。

### 只用 core 自己写组件

```js
import { setBaseStyles } from "@easy-component-ui/core";
import baseStyles from "@easy-component-ui/themes/base";

setBaseStyles(baseStyles);
```

想换成自己的颜色，直接传 CSS 字符串：`setBaseStyles([".my-theme { --color-blue: #0a84ff; }"])`。注意别传运行时拼出来的字符串，内容每次都不同的话，底层样式表就没法复用了。

### 用文档级 CSS

不想往 Shadow 里注入，也可以用 `<link>` 引入现成的 CSS：

```html
<link
  rel="stylesheet"
  href="./node_modules/@easy-component-ui/themes/dist/base.css"
/>
```

`base.css` 和 `themes/base` 是同一份 SCSS 编出来的。里面的变量写成 `:host, :root`，两种场景都能命中：在 Shadow 里 `:host` 指宿主元素，在文档里 `:root` 指 `<html>`。元素重置（`input` 的背景、`ul` 的缩进等）只写在 `:host` 下面，放到文档里也不会影响页面原有样式。

体积上，`themes/base` gzip 后约 1.3 kB，core 本身不带任何 CSS。

## 引入配色变量

上面注入的语义变量只是中转，真正的颜色值来自源变量。所以在用组件之前，还要把源变量引进来：

```js
import "easy-component-ui/themes/source"; // 浅色默认值
import "easy-component-ui/themes/dark"; // 深色覆盖值
```

## 使用主题控制器

控制器提供以下方法：

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
      import "./node_modules/easy-component-ui/dist/index.js";
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

主题偏好存在 `localStorage` 的 `ea-theme` 键里：

- `setTheme("light")` 存 `"light"`
- `setTheme("dark")` 存 `"dark"`
- `setTheme("auto")` 清除存储，跟随系统

刷新页面后 `initTheme()` 会自动恢复上次的选择。
