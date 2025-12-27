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

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-backtop/index.js";
</script>
```

> `css`

::: tip
需要注意的是, 如果需要使用到带有图标的 `属性/组件`, 需要提前使用 `link` 标签引入图标文件
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 自定义样式

移步到 [CSS Part](#css-part)。

## 基础用法

通过滑动来查看容器右下角的按钮。

<ea-backtop><ea-icon icon="icon-angle-up"></ea-icon></ea-backtop>

<div class="demo">
  <p>Scroll down to see the bottom-right button.</p> 
</div>

::: details 查看代码

```html
<ea-backtop><ea-icon icon="icon-angle-up"></ea-icon></ea-backtop>
```

:::

## 自定义触发元素

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

::: details 显示代码

```html
<ea-backtop target="#hasTarget" bottom="200px">UP</ea-backtop>

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

<ea-backtop bottom="160px" visibility-height="50">视距</ea-backtop>

<div class="demo">
    <p>滑动页面大约 50px 即可看到右下方的按钮。</p> 
</div>

::: details 查看代码

```html
<ea-backtop bottom="160px" visibility-height="50">视距</ea-backtop>

<div class="demo">
  <p>滑动页面大约 50px 即可看到右下方的按钮。</p>
</div>
```

:::

## Attributes

| 参数              | 说明                       | 类型   | 可选值 | 默认值 |
| ----------------- | -------------------------- | ------ | ------ | ------ |
| target            | 触发滚动的对象             | String | -      | -      |
| visibility-height | 滚动高度达到此参数值才出现 | Number | -      | 200    |
| right             | 按钮距右侧距离             | Number | -      | 40     |
| bottom            | 按钮距底部距离             | Number | -      | 40     |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明             |
| --------- | ---------------- |
| container | backtop 外层容器 |

## Events

| 事件名称   | 说明             | 回调参数 |
| ---------- | ---------------- | -------- |
| backtop    | 点击按钮时触发   | -        |
| reachedTop | 滚动到顶部时触发 | -        |

## Slots

| 插槽名 | 说明     |
| ------ | -------- |
| -      | 默认插槽 |
