<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

const eaSplitter = document.querySelector('ea-splitter');
eaSplitter.addEventListener('ea-panel-resize-start', (e) => {
    console.log('ea-panel-resize-start', e.detail.size);
});
eaSplitter.addEventListener('ea-panel-resize', (e) => {
    console.log('ea-panel-resize', e.detail.size);
});
eaSplitter.addEventListener('ea-panel-resize-end', (e) => {
    console.log('ea-panel-resize-end', e.detail.size);
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

可将区域水平或垂直分隔，并可自由拖动以调整各个区域的大小。

## 基础用法

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

:::: details 查看代码

::: code-group

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

```js [resize 监听]
const eaSplitter = document.querySelector("ea-splitter");
eaSplitter.addEventListener("ea-panel-resize-start", e => {
  console.log("ea-panel-resize-start", e.detail.size);
});
eaSplitter.addEventListener("ea-panel-resize", e => {
  console.log("ea-panel-resize", e.detail.size);
});
eaSplitter.addEventListener("ea-panel-resize-end", e => {
  console.log("ea-panel-resize-end", e.detail.size);
});
```

:::

::::

## 垂直布局

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

| 属性名   | 说明               | 类型   | 可选值                       | 默认值     |
| -------- | ------------------ | ------ | ---------------------------- | ---------- |
| `layout` | 分隔面板的布局方向 | `enum` | `'horizontal' \| 'vertical'` | horizontal |

### Splitter Events

| 事件名                  | 说明                   | 回调参数(event.detail) |
| ----------------------- | ---------------------- | ---------------------- |
| `ea-panel-resize-start` | 开始调整面板大小时触发 | `{ size: number[] }`   |
| `ea-panel-resize`       | 调整面板大小时触发     | `{ size: number[] }`   |
| `ea-panel-resize-end`   | 面板调整大小结束时触发 | `{ size: number[] }`   |

### Splitter Slots

| 名称    | 说明                                 |
| ------- | ------------------------------------ |
| default | 默认插槽，用于放置 ea-splitter-panel |

### Splitter CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 容器元素 |

### Splitter CSS Custom Properties

| 属性名                    | 说明          | 默认值 |
| ------------------------- | ------------- | ------ |
| `--ea-splitter-direction` | flex 布局方向 | row    |

## SplitterPanel API

### SplitterPanel Attributes

| 属性名   | 说明                       | 类型     | 可选值                       | 默认值     |
| -------- | -------------------------- | -------- | ---------------------------- | ---------- |
| `size`   | 面板大小(像素或百分比)     | `string` | —                            | —          |
| `min`    | 面板最小尺寸(像素或百分比) | `string` | —                            | —          |
| `layout` | 布局方向                   | `enum`   | `'horizontal' \| 'vertical'` | horizontal |

### SplitterPanel Slots

| 名称    | 说明                   |
| ------- | ---------------------- |
| default | 默认插槽，用于面板内容 |

### SplitterPanel CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 容器元素 |

### SplitterPanel CSS Custom Properties

| 属性名                         | 说明         | 默认值 |
| ------------------------------ | ------------ | ------ |
| `--ea-splitter-panel-size`     | 面板大小     | 100%   |
| `--ea-splitter-panel-min-size` | 面板最小尺寸 | 0      |

## SplitterBar API

### SplitterBar Attributes

| 属性名   | 说明     | 类型   | 可选值                       | 默认值     |
| -------- | -------- | ------ | ---------------------------- | ---------- |
| `layout` | 布局方向 | `enum` | `'horizontal' \| 'vertical'` | horizontal |

### SplitterBar CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 容器元素 |

### SplitterBar CSS Custom Properties

| 属性名                          | 说明                                         | 默认值              |
| ------------------------------- | -------------------------------------------- | ------------------- |
| `--ea-splitter-bar-size`        | 分隔条尺寸（水平模式为宽度，垂直模式为高度） | 1rem                |
| `--ea-splitter-bar-color`       | 分隔条默认颜色                               | var(--color-border) |
| `--ea-splitter-bar-hover-color` | 分隔条悬停颜色                               | var(--color-blue)   |
