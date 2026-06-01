<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"
import PropTag from './components/PropTag.vue'

onMounted(() => {
  document.addEventListener("ea-theme-change", (e) => {
    const status = document.querySelector("#basicStatus");
    if (status) status.textContent = e.detail.mode;
  });
})
</script>

# ThemeToggle 主题切换

基于 ea-switch 封装的主题切换组件，支持日间/夜间模式切换，内置太阳/月亮图标。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-theme-toggle.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-theme-toggle";
```

:::

## 自定义样式

移步到 [CSS Part](#themetoggle-css-part) 和 [CSS Custom Properties](#themetoggle-css-自定义属性)。

## 基础用法

点击切换日间/夜间模式。默认跟随系统偏好，点击后切换为手动模式。

<div class="demo">
  <ea-theme-toggle id="basicToggle"></ea-theme-toggle>
  <span>当前主题：<strong id="basicStatus">auto</strong></span>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-theme-toggle id="basicToggle"></ea-theme-toggle>
  <span>当前主题：<strong id="basicStatus">auto</strong></span>
</div>
```

```js
document.addEventListener("ea-theme-change", e => {
  document.querySelector("#basicStatus").textContent = e.detail.mode;
});
```

:::

::::

## 指定初始模式

通过 `mode` 属性设置初始主题模式，支持 `light`、`dark`、`auto` 三种值。`auto` 模式下开关状态跟随系统偏好。

<div class="demo">
  <ea-theme-toggle mode="light"></ea-theme-toggle>
  <ea-theme-toggle mode="dark"></ea-theme-toggle>
  <ea-theme-toggle mode="auto"></ea-theme-toggle>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-theme-toggle mode="light"></ea-theme-toggle>
  <ea-theme-toggle mode="dark"></ea-theme-toggle>
  <ea-theme-toggle mode="auto"></ea-theme-toggle>
</div>
```

:::

## 自定义颜色

通过 CSS 自定义属性修改开关的背景色。

<div class="demo">
  <ea-theme-toggle style="--ea-theme-toggle-active-color: #8b5cf6; --ea-theme-toggle-inactive-color: #fbbf24;"></ea-theme-toggle>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-theme-toggle
    style="--ea-theme-toggle-active-color: #8b5cf6; --ea-theme-toggle-inactive-color: #fbbf24;"
  ></ea-theme-toggle>
</div>
```

:::

## 多实例同步

页面中存在多个 `ea-theme-toggle` 时，切换任一实例会自动同步所有实例的状态。

<div class="demo">
  <ea-theme-toggle></ea-theme-toggle>
  <ea-theme-toggle></ea-theme-toggle>
  <ea-theme-toggle></ea-theme-toggle>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-theme-toggle></ea-theme-toggle>
  <ea-theme-toggle></ea-theme-toggle>
  <ea-theme-toggle></ea-theme-toggle>
</div>
```

:::

## JS API 方式

无需引入组件，通过主题控制器直接控制主题切换。

:::: details 查看代码

::: code-group

```js [ES Module]
import {
  initTheme,
  setTheme,
  toggleTheme,
  getCurrentTheme,
} from "easy-component-ui/theme";

initTheme(); // 初始化（检测系统偏好 + localStorage）
setTheme("dark"); // 切换到暗色
toggleTheme(); // 切换当前主题
getCurrentTheme(); // 获取当前主题 'light' | 'dark'
```

```js [统一入口]
import {
  initTheme,
  setTheme,
  toggleTheme,
  getCurrentTheme,
} from "easy-component-ui";

initTheme();
setTheme("dark");
toggleTheme();
getCurrentTheme();
```

:::

::::

## 全局事件

主题控制器在主题变化时会派发全局事件，无论通过组件切换还是 JS API 切换均可监听。

| 事件名          | 监听目标 | 说明           | 回调参数 ( event.detail )     |
| --------------- | -------- | -------------- | ----------------------------- |
| ea-theme-change | document | 主题变化时触发 | `{ mode: 'light' \| 'dark' }` |

:::: details 查看代码

```js
document.addEventListener("ea-theme-change", e => {
  console.log("当前主题：", e.detail.mode);
});
```

::::

## ThemeToggle API

### ThemeToggle Attributes

| 参数 | 说明                                                     | 类型   | 可选值                  | 默认值 |
| ---- | -------------------------------------------------------- | ------ | ----------------------- | ------ |
| mode | 主题模式。`auto` 跟随系统偏好，`light`/`dark` 为手动指定 | string | `light \| dark \| auto` | auto   |

### ThemeToggle CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称   | 说明                |
| ------ | ------------------- |
| switch | 内部 ea-switch 组件 |

### ThemeToggle Events

| 事件名                 | 说明           | 回调参数 ( event.detail )     |
| ---------------------- | -------------- | ----------------------------- |
| ea-theme-toggle-change | 主题切换时触发 | `{ mode: 'light' \| 'dark' }` |

### ThemeToggle CSS Custom Properties

| 属性名                           | 说明               | 默认值          |
| -------------------------------- | ------------------ | --------------- |
| --ea-theme-toggle-active-color   | 暗色状态开关背景色 | var(--blue-500) |
| --ea-theme-toggle-inactive-color | 浅色状态开关背景色 | var(--grey-300) |
