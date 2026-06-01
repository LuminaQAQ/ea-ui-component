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

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-carousel.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-carousel";
```

:::

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

结合使用 `ea-carousel` 和 `ea-carousel-item` 标签就得到了一个轮播图。轮播图的内容是任意的，需要放在 `ea-carousel-item` 标签中。默认情况下，在鼠标 `hover` 底部的指示器时就会触发切换。通过设置 `trigger` 属性为 `click`，可以达到点击触发的效果。

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

::: details 查看代码

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

:::

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

::: details 查看代码

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

::: details 查看代码

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

:::

## 方向

通过设置 `direction` 属性可以设置轮播图的方向。可选值为 `horizontal`（水平）和 `vertical`（垂直）。

<div class="demo">
  <ea-carousel direction="vertical" height="150px">
  <ea-carousel-item> 1 </ea-carousel-item>
  <ea-carousel-item> 2 </ea-carousel-item>
  <ea-carousel-item> 3 </ea-carousel-item>
  <ea-carousel-item> 4 </ea-carousel-item>
  <ea-carousel-item> 5 </ea-carousel-item>
  </ea-carousel>
</div>

::: details 查看代码

```html
<ea-carousel direction="vertical" height="150px">
  <ea-carousel-item> 1 </ea-carousel-item>
  <ea-carousel-item> 2 </ea-carousel-item>
  <ea-carousel-item> 3 </ea-carousel-item>
  <ea-carousel-item> 4 </ea-carousel-item>
  <ea-carousel-item> 5 </ea-carousel-item>
</ea-carousel>
```

:::

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

### Carousel CSS Part

| 名称             | 说明                                                                    |
| ---------------- | ----------------------------------------------------------------------- |
| container        | 轮播图外层容器, 包含内容容器(`content`)、指示器容器(`indicator-wrap`)等 |
| content          | 轮播图内容容器（滑动承载层）                                            |
| indicator-wrap   | 指示器容器                                                              |
| indicator        | 单个指示器项                                                            |
| arrow-left       | 左侧切换箭头                                                            |
| arrow-left-icon  | 左侧切换箭头图标                                                        |
| arrow-right      | 右侧切换箭头                                                            |
| arrow-right-icon | 右侧切换箭头图标                                                        |

### Carousel Slots

| 名称        | 说明                                   |
| ----------- | -------------------------------------- |
| default     | 默认插槽，放置 ea-carousel-item 子组件 |
| clone-first | 首项克隆插槽（内部使用）               |
| clone-last  | 末项克隆插槽（内部使用）               |

### Carousel Methods

| 方法名 | 说明                           | 参数 |
| ------ | ------------------------------ | ---- |
| prev() | 切换到上一项（会修改 `index`） | —    |
| next() | 切换到下一项（会修改 `index`） | —    |

### Carousel Events

| 事件名    | 说明                                 | 回调参数(event.detail)              |
| --------- | ------------------------------------ | ----------------------------------- |
| ea-change | 当前索引变化时触发（变更为有效索引） | `{ current: number, prev: number }` |

### Carousel CSS Custom Properties

| 属性名                                | 说明             | 默认值                      |
| ------------------------------------- | ---------------- | --------------------------- |
| --ea-carousel-height                  | 轮播图高度       | 100%                        |
| --ea-carousel-transform               | 内容容器位移     | translateX(0)               |
| --ea-carousel-transition              | 过渡动画时长     | var(--transition-slow)      |
| --ea-carousel-indicator-x             | 指示器水平位置   | 50%                         |
| --ea-carousel-indicator-y             | 指示器垂直位置   | 8px                         |
| --ea-carousel-indicator-spacing       | 指示器间距       | var(--spacing-sm)           |
| --ea-carousel-indicator-width         | 指示器宽度       | 16px                        |
| --ea-carousel-indicator-height        | 指示器高度       | 4px                         |
| --ea-carousel-indicator-color         | 指示器颜色       | rgba(255, 255, 255, 0.4)    |
| --ea-carousel-indicator-outside-color | 外部指示器颜色   | rgba(208, 208, 208, 0.4)    |
| --ea-carousel-indicator-active-color  | 激活指示器颜色   | var(--grey-400)             |
| --ea-carousel-arrow-x                 | 箭头水平偏移     | 8px                         |
| --ea-carousel-arrow-size              | 箭头尺寸         | 24px                        |
| --ea-carousel-arrow-border-radius     | 箭头圆角         | var(--border-radius-circle) |
| --ea-carousel-arrow-color             | 箭头背景颜色     | rgba(31, 45, 61, 0.11)      |
| --ea-carousel-arrow-hover-color       | 箭头悬停背景颜色 | rgba(31, 45, 61, 0.23)      |

## CarouselItem API

### CarouselItem Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 轮播项内容插槽 |

### CarouselItem CSS Part

| 名称      | 说明                 |
| --------- | -------------------- |
| container | 单个轮播项的外层容器 |
