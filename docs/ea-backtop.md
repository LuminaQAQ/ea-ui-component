<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")
})
</script>

# Backtop 回到顶部

返回页面顶部的操作按钮

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-backtop.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-backtop";
```

:::

## 自定义样式

移步到 [CSS Part](#ea-backtop-css-part)。

## 基础用法

通过滑动来查看容器右下角的按钮。

<ea-backtop><ea-icon name="angle-up"></ea-icon></ea-backtop>

<div class="demo">
  <p>Scroll down to see the bottom-right button.</p>
</div>

::: details 查看代码

```html
<ea-backtop><ea-icon name="angle-up"></ea-icon></ea-backtop>
```

:::

## 自定义触发元素

通过 `target` 属性指定触发滚动的目标元素，`visibility-height` 控制显示阈值。

<ea-backtop target="#hasTarget" bottom="200px" visibility-height="100">UP</ea-backtop>

<div class="demo" id="hasTarget" style="height: 200px; overflow: auto">
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
</div>

::: details 查看代码

```html
<ea-backtop target="#hasTarget" bottom="200px" visibility-height="100"
  >UP</ea-backtop
>

<div class="demo" id="hasTarget" style="height: 100px; overflow: auto">
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
  <h2>Scroll down to see the bottom-right button.</h2>
</div>
```

:::

## 自定义滚动到的视距

通过 `visibility-height` 属性控制按钮出现的滚动阈值，滑动页面达到指定距离即可看到按钮。

<ea-backtop bottom="160px" visibility-height="50">视距</ea-backtop>

<div class="demo">
    <p>滑动页面大约 50px 即可看到右下方的按钮。</p>
</div>

::: details 查看代码

```html
<ea-backtop bottom="160px" visibility-height="50">视距</ea-backtop>
```

:::

## EaBacktop API

### EaBacktop Attributes

| 参数              | 说明                             | 类型    | 可选值 | 默认值   |
| ----------------- | -------------------------------- | ------- | ------ | -------- |
| target            | 触发滚动的目标对象               | String  | —      | `window` |
| visibility-height | 滚动高度达到此参数值才出现       | Number  | —      | 200      |
| right             | 控制其显示位置，距离页面右边距   | String  | —      | `40px`   |
| bottom            | 控制其显示位置，距离页面底部距离 | String  | —      | `40px`   |
| smooth            | 滚动动画是否平滑                 | Boolean | —      | true     |

### EaBacktop CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明             |
| --------- | ---------------- |
| container | backtop 外层容器 |

### EaBacktop Slots

| 名称    | 说明                     |
| ------- | ------------------------ |
| default | 默认插槽，自定义按钮内容 |
