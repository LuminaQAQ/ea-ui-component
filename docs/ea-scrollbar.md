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
</style>

# Scrollbar 滚动条 ​

用于替换浏览器原生滚动条。

## 基础用法 ​

通过 height 属性设置滚动条高度，若不设置则根据父容器高度自适应。

<div class="demo" style="height: 500px;">
  <ea-container class="example" direction="vertical">
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
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
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
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
      </ea-footer>
    </ea-container>
  </ea-container>
</div>

:::details 查看代码 - html

```html
<div class="demo" style="height: 500px;">
  <ea-container class="example" direction="vertical">
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
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
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
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
      </ea-footer>
    </ea-container>
  </ea-container>
</div>
```

:::

:::details 查看代码 - css

```css
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
```

:::

## 横向滚动 ​

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

::: details 查看代码 - html

```html
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
```

:::

::: details 查看代码 - css

```css
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
```

:::

## API

### Attributes

| **属性名** | **说明**                         | **类型** | **可选值** | **默认值** |
| ---------- | -------------------------------- | -------- | ---------- | ---------- |
| `native`   | 是否使用浏览器原生滚动条样式     | Boolean  | -          | false      |
| `noresize` | 是否禁用滚动条的自动调整大小功能 | Boolean  | -          | false      |
| `always`   | 是否始终显示滚动条               | Boolean  | -          | false      |

### Events

| **事件名**    | **说明**                     | **类型**                                                                                                               |
| ------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `scroll`      | 是否使用浏览器原生滚动条样式 | Function <br> `({ scrollLeft: number, scrollTop: number }) => void`                                                    |
| `end-reached` | 触发滚动结束时的触发器       | Function <br>`(direction: 'top' \| 'bottom' \| 'left' \| 'right'`, `scrollLeft: number,` `scrollTop: number ) => void` |
