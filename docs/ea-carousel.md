<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../dist/components/index.js')
  import('../dist/assets/icon.css')
})
</script>

<style scoped>
ea-carousel-item {
  background-color: #d3dce6;
}
</style>

# Carousel 走马灯

在有限空间内，循环播放同一类型的图片、文字等内容。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-carousel/index.js";
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

移步到 [CSS Part](#carousel-css-part)。

::: tip
示例中使用到的样式
:::

```css
ea-carousel-item {
  background-color: #d3dce6;
}
```

## 基础用法

结合使用 `ea-carousel` 和 `ea-carousel-item` 标签就得到了一个轮播图。轮播图的内容是任意的，需要放在 `el-carousel-item` 标签中。默认情况下，在鼠标 `hover` 底部的指示器时就会触发切换。通过设置 `trigger` 属性为 `click`，可以达到点击触发的效果。

<div class="demo">
  <!-- Hover 指示器触发 -->
  <div class="title">默认 Hover 指示器触发</div>
  <ea-carousel height="150px">
    <ea-carousel-item> 1 </ea-carousel-item>
    <ea-carousel-item> 2 </ea-carousel-item>
    <ea-carousel-item> 3 </ea-carousel-item>
    <ea-carousel-item> 4 </ea-carousel-item>
    <ea-carousel-item> 5 </ea-carousel-item>
  </ea-carousel>
  <!-- Click 指示器触发 -->
  <div class="title">Click 指示器触发</div>
  <ea-carousel trigger="click" height="150px">
    <ea-carousel-item> 1 </ea-carousel-item>
    <ea-carousel-item> 2 </ea-carousel-item>
    <ea-carousel-item> 3 </ea-carousel-item>
    <ea-carousel-item> 4 </ea-carousel-item>
    <ea-carousel-item> 5 </ea-carousel-item>
  </ea-carousel>
</div>

::: details 查看代码

```html
<div class="demo">
  <!-- Hover 指示器触发 -->
  <div class="title">默认 Hover 指示器触发</div>
  <ea-carousel height="150px">
    <ea-carousel-item> 1 </ea-carousel-item>
    <ea-carousel-item> 2 </ea-carousel-item>
    <ea-carousel-item> 3 </ea-carousel-item>
    <ea-carousel-item> 4 </ea-carousel-item>
    <ea-carousel-item> 5 </ea-carousel-item>
  </ea-carousel>

  <!-- Click 指示器触发 -->
  <div class="title">Click 指示器触发</div>
  <ea-carousel trigger="click" height="150px">
    <ea-carousel-item> 1 </ea-carousel-item>
    <ea-carousel-item> 2 </ea-carousel-item>
    <ea-carousel-item> 3 </ea-carousel-item>
    <ea-carousel-item> 4 </ea-carousel-item>
    <ea-carousel-item> 5 </ea-carousel-item>
  </ea-carousel>
</div>
```

:::

## 指示器

可以将指示器的显示位置设置在容器外部

`indicator-position` 属性定义了指示器的位置。 默认情况下，它会显示在走马灯内部，设置为 outside 则会显示在外部；设置为 `none` 则不会显示指示器。

<div class="demo">
  <ea-carousel height="150px" indicator-position="outside">
    <ea-carousel-item> 1 </ea-carousel-item>
    <ea-carousel-item> 2 </ea-carousel-item>
    <ea-carousel-item> 3 </ea-carousel-item>
    <ea-carousel-item> 4 </ea-carousel-item>
    <ea-carousel-item> 5 </ea-carousel-item>
  </ea-carousel>
</div>

```html
<div class="demo">
  <ea-carousel height="150px" indicator-position="outside">
    <ea-carousel-item> 1 </ea-carousel-item>
    <ea-carousel-item> 2 </ea-carousel-item>
    <ea-carousel-item> 3 </ea-carousel-item>
    <ea-carousel-item> 4 </ea-carousel-item>
    <ea-carousel-item> 5 </ea-carousel-item>
  </ea-carousel>
</div>
```

## 切换箭头

可以设置切换箭头的显示时机

`arrow` 属性定义了切换箭头的显示时机。 默认情况下，切换箭头只有在鼠标 `hover` 到走马灯上时才会显示。 若将 `arrow` 设置为 `always`，则会一直显示；设置为 `never`，则会一直隐藏。

<div class="demo">
  <div class="title"><b>arrow</b> 属性值为 <b>always</b></div>
  <ea-carousel arrow="always" height="150px">
    <ea-carousel-item> 1 </ea-carousel-item>
    <ea-carousel-item> 2 </ea-carousel-item>
    <ea-carousel-item> 3 </ea-carousel-item>
    <ea-carousel-item> 4 </ea-carousel-item>
    <ea-carousel-item> 5 </ea-carousel-item>
  </ea-carousel>
  <div class="title"><b>arrow</b> 属性值为 <b>never</b></div>
  <ea-carousel arrow="never" height="150px">
    <ea-carousel-item> 1 </ea-carousel-item>
    <ea-carousel-item> 2 </ea-carousel-item>
    <ea-carousel-item> 3 </ea-carousel-item>
    <ea-carousel-item> 4 </ea-carousel-item>
    <ea-carousel-item> 5 </ea-carousel-item>
  </ea-carousel>
</div>

::: code-group

```html
<div class="demo">
  <div class="title"><b>arrow</b> 属性值为 <b>always</b></div>
  <ea-carousel arrow="always" height="150px">
    <ea-carousel-item> 1 </ea-carousel-item>
    <ea-carousel-item> 2 </ea-carousel-item>
    <ea-carousel-item> 3 </ea-carousel-item>
    <ea-carousel-item> 4 </ea-carousel-item>
    <ea-carousel-item> 5 </ea-carousel-item>
  </ea-carousel>

  <div class="title"><b>arrow</b> 属性值为 <b>never</b></div>
  <ea-carousel arrow="never" height="150px">
    <ea-carousel-item> 1 </ea-carousel-item>
    <ea-carousel-item> 2 </ea-carousel-item>
    <ea-carousel-item> 3 </ea-carousel-item>
    <ea-carousel-item> 4 </ea-carousel-item>
    <ea-carousel-item> 5 </ea-carousel-item>
  </ea-carousel>
</div>
```

:::

## 切换间隔

通过设置 `interval` 属性可以设置切换间隔。单位为 `ms`。

<div class="demo">
  <ea-carousel interval="5000" height="150px">
    <ea-carousel-item> 1 </ea-carousel-item>
    <ea-carousel-item> 2 </ea-carousel-item>
    <ea-carousel-item> 3 </ea-carousel-item>
    <ea-carousel-item> 4 </ea-carousel-item>
    <ea-carousel-item> 5 </ea-carousel-item>
  </ea-carousel>
</div>

```html
<div class="demo">
  <ea-carousel interval="5000" height="150px">
    <ea-carousel-item> 1 </ea-carousel-item>
    <ea-carousel-item> 2 </ea-carousel-item>
    <ea-carousel-item> 3 </ea-carousel-item>
    <ea-carousel-item> 4 </ea-carousel-item>
    <ea-carousel-item> 5 </ea-carousel-item>
  </ea-carousel>
</div>
```

## 方向

通过设置 `direction` 属性可以设置轮播图的方向。可选值为 `horizontal`（水平）和 `vertical`（垂直）。

<ea-carousel direction="vertical" height="150px">
  <ea-carousel-item> 1 </ea-carousel-item>
  <ea-carousel-item> 2 </ea-carousel-item>
  <ea-carousel-item> 3 </ea-carousel-item>
  <ea-carousel-item> 4 </ea-carousel-item>
  <ea-carousel-item> 5 </ea-carousel-item>
</ea-carousel>

```html
<ea-carousel direction="vertical" height="150px">
  <ea-carousel-item> 1 </ea-carousel-item>
  <ea-carousel-item> 2 </ea-carousel-item>
  <ea-carousel-item> 3 </ea-carousel-item>
  <ea-carousel-item> 4 </ea-carousel-item>
  <ea-carousel-item> 5 </ea-carousel-item>
</ea-carousel>
```

## Carousel Attributes

| 参数     | 说明               | 类型   | 可选值             | 默认值 |
| -------- | ------------------ | ------ | ------------------ | ------ |
| interval | 切换间隔，单位为秒 | number | —                  | 3      |
| trigger  | 指示器触发方式     | string | hover/click        | hover  |
| arrow    | 切换箭头显示时机   | string | always/hover/never | hover  |

## Carousel CSS Part

| 名称           | 说明                                                                         |
| -------------- | ---------------------------------------------------------------------------- |
| container      | 轮播图外层容器, 包含轮播图容器(`content-wrap`)和指示器容器(`indicator-wrap`) |
| content-wrap   | 轮播图内容容器                                                               |
| indicator-wrap | 指示器容器                                                                   |
| indicator      | 指示器                                                                       |
| arrow          | 切换箭头                                                                     |
