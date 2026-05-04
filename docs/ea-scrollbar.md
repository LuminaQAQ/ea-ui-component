<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")
})
</script>

<style>
ea-header::part(container) {
  text-align: center;
  background-color: #b3c0d1;
}

ea-main::part(container) {
  text-align: center;
  background-color: #e9eef3;
}

ea-footer::part(container) {
  text-align: center;
  background-color: #b3c0d1;
}

ea-aside::part(container) {
  background-color: #d3dce6;
  text-align: center;
}

.scrollbar-item {
  box-sizing: border-box;
  padding: 50px;
  margin: 10px;

  background-color: rgb(236, 245, 255);
  color: black;

  text-align: center;
}

.horizontal-section {
  display: flex;
  align-items: center;
}
</style>

# Scrollbar 滚动条

用于替换浏览器原生滚动条。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-scrollbar/index.ts";
</script>
```

## 自定义样式

移步到 [CSS Part](#scrollbar-css-part)。

## 基础用法

通过 height 属性设置滚动条高度，若不设置则根据父容器高度自适应。

<div class="demo">
  <ea-container class="example" direction="horizontal" style="height: 500px;">
    <ea-aside width="200px">
      <ea-header>
        <p style="margin-top: 0;">header</p>
      </ea-header>
      <ea-main>
        <ea-scrollbar>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
          <div>aside</div>
        </ea-scrollbar>
      </ea-main>
      <ea-footer>
        <p>footer</p>
      </ea-footer>
    </ea-aside>
    <ea-container>
      <ea-header>
        <p style="margin-top: 0;">header</p>
      </ea-header>
      <ea-main>
        <ea-scrollbar>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
          <p>main</p>
        </ea-scrollbar>
      </ea-main>
      <ea-footer>
        <p>footer</p>
      </ea-footer>
    </ea-container>
  </ea-container>
</div>

:::details 查看代码

```html
<ea-scrollbar>
  <div>aside</div>
  <!-- ... -->
</ea-scrollbar>
```

:::

## 横向滚动

当元素宽度大于滚动条宽度时，会显示横向滚动条。

<div class="demo" style="height: 200px;">
    <ea-scrollbar>
        <div class="horizontal-section">
            <div class="scrollbar-item">horizontal</div>
            <div class="scrollbar-item">horizontal</div>
            <div class="scrollbar-item">horizontal</div>
            <div class="scrollbar-item">horizontal</div>
            <div class="scrollbar-item">horizontal</div>
            <div class="scrollbar-item">horizontal</div>
            <div class="scrollbar-item">horizontal</div>
            <div class="scrollbar-item">horizontal</div>
            <div class="scrollbar-item">horizontal</div>
            <div class="scrollbar-item">horizontal</div>
            <div class="scrollbar-item">horizontal</div>
        </div>
    </ea-scrollbar>
</div>

::: details 查看代码

```html
<div class="demo" style="height: 200px;">
  <ea-scrollbar>
    <div class="horizontal-section">
      <div class="scrollbar-item">horizontal</div>
      <!-- ... -->
    </div>
  </ea-scrollbar>
</div>
```

:::

## 原生滚动条

使用 native 属性使用浏览器原生滚动条样式。

<div class="demo" style="height: 200px;">
  <ea-scrollbar native>
    <p>native scrollbar content</p>
    <p>native scrollbar content</p>
    <p>native scrollbar content</p>
    <p>native scrollbar content</p>
    <p>native scrollbar content</p>
    <p>native scrollbar content</p>
    <p>native scrollbar content</p>
    <p>native scrollbar content</p>
    <p>native scrollbar content</p>
    <p>native scrollbar content</p>
    <p>native scrollbar content</p>
    <p>native scrollbar content</p>
    <p>native scrollbar content</p>
    <p>native scrollbar content</p>
    <p>native scrollbar content</p>
  </ea-scrollbar>
</div>

::: details 查看代码

```html
<ea-scrollbar native>
  <p>native scrollbar content</p>
  <!-- ... -->
</ea-scrollbar>
```

:::

## 始终显示

使用 always 属性始终显示滚动条。

<div class="demo" style="height: 200px;">
  <ea-scrollbar always>
    <p>always visible scrollbar content</p>
    <p>always visible scrollbar content</p>
    <p>always visible scrollbar content</p>
    <p>always visible scrollbar content</p>
    <p>always visible scrollbar content</p>
    <p>always visible scrollbar content</p>
    <p>always visible scrollbar content</p>
    <p>always visible scrollbar content</p>
    <p>always visible scrollbar content</p>
    <p>always visible scrollbar content</p>
    <p>always visible scrollbar content</p>
    <p>always visible scrollbar content</p>
    <p>always visible scrollbar content</p>
    <p>always visible scrollbar content</p>
    <p>always visible scrollbar content</p>
  </ea-scrollbar>
</div>

::: details 查看代码

```html
<ea-scrollbar always>
  <p>always visible scrollbar content</p>
  <!-- ... -->
</ea-scrollbar>
```

:::

## Scrollbar Attributes

| **参数**    | **说明**                         | **类型**  | **可选值** | **默认值** |
| ----------- | -------------------------------- | --------- | ---------- | ---------- |
| `height`    | 滚动条高度                       | `string`  | —          | `""`       |
| `native`    | 是否使用浏览器原生滚动条样式     | `boolean` | —          | `false`    |
| `noresize`  | 是否禁用滚动条的自动调整大小功能 | `boolean` | —          | `false`    |
| `always`    | 是否始终显示滚动条               | `boolean` | —          | `false`    |

## Scrollbar Events

| **事件名**    | **说明**               | **回调参数**                                                                                                               |
| ------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `scroll`      | 滚动时触发             | `({ scrollLeft: number, scrollTop: number }) => void`                                                                      |
| `end-reached` | 触发滚动结束时触发     | `(direction: 'top' \| 'bottom' \| 'left' \| 'right'`, `scrollLeft: number,` `scrollTop: number ) => void`                  |

## Scrollbar Methods

| **方法名** | **说明**             | **参数**                           |
| ---------- | -------------------- | ---------------------------------- |
| `scrollTo` | 滚动到指定位置       | `ScrollToOptions`                  |

## Scrollbar CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称              | 说明         |
| ----------------- | ------------ |
| container         | 滚动条容器   |
| track-horizontal  | 水平滚动轨道 |
| track-vertical    | 垂直滚动轨道 |
| thumb             | 滚动滑块     |
| view-container    | 视图容器     |
