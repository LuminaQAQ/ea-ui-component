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

## Carousel API

### Carousel Attributes

| 参数               | 说明                                                             | 类型    | 可选值                     | 默认值     |
| ------------------ | ---------------------------------------------------------------- | ------- | -------------------------- | ---------- |
| height             | 轮播图高度，支持任意 CSS 长度值，会设置到 `--ea-carousel-height` | string  | —                          | 100%       |
| direction          | 轮播方向                                                         | string  | `horizontal \| vertical`   | horizontal |
| index              | 当前激活项索引（从 0 开始）                                      | number  | —                          | 0          |
| trigger            | 指示器触发方式                                                   | string  | `hover \| click`           | hover      |
| interval           | 自动轮播时间间隔，单位 ms                                        | number  | —                          | 3000       |
| arrow              | 切换箭头显示时机                                                 | string  | `never \| always \| hover` | hover      |
| autoplay           | 是否自动播放                                                     | boolean | —                          | true       |
| loop               | 是否循环播放（到达末尾是否回绕）                                 | boolean | —                          | true       |
| pause-on-hover     | 鼠标移入是否暂停自动播放                                         | boolean | —                          | true       |
| indicator-position | 指示器位置/显示控制                                              | string  | `"" \| none \| outside`    | ""         |

### Carousel Events

| 事件名称 | 说明                                 | 回调参数                                      |
| -------- | ------------------------------------ | --------------------------------------------- |
| change   | 当前索引变化时触发（变更为有效索引） | e.detail: `{ current: number, prev: number }` |

### Carousel Methods

| 方法名 | 说明                           |
| ------ | ------------------------------ |
| prev() | 切换到上一项（会修改 `index`） |
| next() | 切换到下一项（会修改 `index`） |

### Carousel CSS Part

| 名称             | 说明                                                                    |
| ---------------- | ----------------------------------------------------------------------- |
| container        | 轮播图外层容器, 包含内容容器(`content`)、指示器容器(`indicator-wrap`)等 |
| content          | 轮播图内容容器（滑动承载层）                                            |
| indicator-wrap   | 指示器容器                                                              |
| indicator        | 单个指示器项                                                            |
| arrow-left       | 左侧切换箭头（`part="arrow-left"`）                                     |
| arrow-left-icon  | 左侧切换箭头图标（`part="arrow-left-icon"`）                            |
| arrow-right      | 右侧切换箭头（`part="arrow-right"`）                                    |
| arrow-right-icon | 右侧切换箭头图标（`part="arrow-right-icon"`）                           |

## CarouselItem API

### CarouselItem CSS Part

| 名称      | 说明                 |
| --------- | -------------------- |
| container | 单个轮播项的外层容器 |
