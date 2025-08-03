<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")


const eaSplitter = document.querySelector('ea-splitter');
eaSplitter.addEventListener('panel-resize-start', (e) => {
    console.log('panel-resize-start', e.detail.size);
});
eaSplitter.addEventListener('panel-resize', (e) => {
    console.log('panel-resize', e.detail.size);
});
eaSplitter.addEventListener('panel-resize-end', (e) => {
    console.log('panel-resize-end', e.detail.size);
});
})
</script>

<style>
.demo-panel {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;

    font-size: 1.5rem;

    overflow: hidden;
}

.section {
    height: 300px;
    box-shadow: #ccc 0px 0px 10px;
}
</style>

# Splitter 分隔面板

​
可将区域水平或垂直分隔，并可自由拖动以调整各个区域的大小。

## 基础用法 ​

最基本的用法，如果未传入默认尺寸，将自动平均分配。

<div class="demo">
  <div class="section">
    <ea-splitter class="section">
      <ea-splitter-panel min="30%">
        <div class="demo-panel">1</div>
      </ea-splitter-panel>
      <ea-splitter-panel size="20%" min="20%">
        <div class="demo-panel">2</div>
      </ea-splitter-panel>
      <ea-splitter-panel size="10%">
        <div class="demo-panel">3</div>
      </ea-splitter-panel>
    </ea-splitter>
  </div>
</div>

::: code-group 查看代码

```html
<div class="demo">
  <div class="section">
    <ea-splitter class="section">
      <ea-splitter-panel min="30%">
        <div class="demo-panel">1</div>
      </ea-splitter-panel>
      <ea-splitter-panel size="20%" min="20%">
        <div class="demo-panel">2</div>
      </ea-splitter-panel>
      <ea-splitter-panel size="10%">
        <div class="demo-panel">3</div>
      </ea-splitter-panel>
    </ea-splitter>
  </div>
</div>
```

```js [<b>resize</b>  监听]
const eaSplitter = document.querySelector("ea-splitter");
eaSplitter.addEventListener("panel-resize-start", (e) => {
  console.log("panel-resize-start", e.detail.size);
});
eaSplitter.addEventListener("panel-resize", (e) => {
  console.log("panel-resize", e.detail.size);
});
eaSplitter.addEventListener("panel-resize-end", (e) => {
  console.log("panel-resize-end", e.detail.size);
});
```

:::

## 垂直布局 ​

使用垂直方向。

<div class="demo">
  <div class="section">
    <ea-splitter layout="vertical">
      <ea-splitter-panel min="30%">
        <div class="demo-panel">1</div>
      </ea-splitter-panel>
      <ea-splitter-panel min="20%">
        <div class="demo-panel">2</div>
      </ea-splitter-panel>
      <ea-splitter-panel size="10%">
        <div class="demo-panel">3</div>
      </ea-splitter-panel>
    </ea-splitter>
  </div>
</div>

::: details 查看代码

```html
<div class="demo">
  <div class="section">
    <ea-splitter layout="vertical">
      <ea-splitter-panel min="30%">
        <div class="demo-panel">1</div>
      </ea-splitter-panel>
      <ea-splitter-panel size="20%" min="20%">
        <div class="demo-panel">2</div>
      </ea-splitter-panel>
      <ea-splitter-panel size="10%">
        <div class="demo-panel">3</div>
      </ea-splitter-panel>
    </ea-splitter>
  </div>
</div>
```

:::

## Splitter API

### Splitter Attributes

| **属性名** | **说明**           | **类型** | **可选值**                   | **默认值** |
| ---------- | ------------------ | -------- | ---------------------------- | ---------- |
| `layout`   | 分隔面板的布局方向 | `enum`   | `'horizontal' \| 'vertical'` | horizontal |

### Splitter Events

| **事件名**           | **说明**               | **类型**                                     |
| -------------------- | ---------------------- | -------------------------------------------- |
| `panel-resize-start` | 开始调整面板大小时触发 | Function <br> `({ size: number[] }) => void` |
| `panel-resize`       | 调整面板大小时触发     | Function <br> `({ size: number[] }) => void` |
| `panel-resize-end`   | 面板调整大小结束时触发 | Function <br> `({ size: number[] }) => void` |

## SplitterPanel API​

### SplitterPanel Attributes

| **属性名** | **说明**                   | **类型** | **可选值**             | **默认值** |
| ---------- | -------------------------- | -------- | ---------------------- | ---------- |
| `size`     | 面板大小(像素或百分比)     | `enum`   | `'string' \| 'number'` | -          |
| `min`      | 面板最小尺寸(像素或百分比) | `enum`   | `'string' \| 'number'` | -          |
