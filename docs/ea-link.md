<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")
})
</script>

<style>
  .custom-link::part(container) {
    color: pink;
  }
</style>

# Link 文字链接

文字超链接，用于页面之间的导航跳转，支持原生 `<a>` 标签的全部能力。

## 引入

> `js`

```js
<script type='module'>
  import "./node_modules/easy-component-ui/components/ea-link/index.js";
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

移步到 [CSS Part](#link-css-part)。

## 基础用法

基础的文字链接用法。通过设置 `variant` 属性来定义文字链接的类型。

<div class="row left">
  <ea-link href="https://github.com/LuminaQAQ">默认链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" variant="primary">主要链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" variant="success">成功链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" variant="warning">警告链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" variant="danger">危险链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" variant="info">信息链接</ea-link>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-link href="https://github.com/LuminaQAQ">默认链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" variant="primary"
    >主要链接</ea-link
  >
  <ea-link href="https://github.com/LuminaQAQ" variant="success"
    >成功链接</ea-link
  >
  <ea-link href="https://github.com/LuminaQAQ" variant="warning"
    >警告链接</ea-link
  >
  <ea-link href="https://github.com/LuminaQAQ" variant="danger"
    >危险链接</ea-link
  >
  <ea-link href="https://github.com/LuminaQAQ" variant="info">信息链接</ea-link>
</div>
```

:::

## 禁用状态

文字链接不可用状态。通过设置 `disabled` 属性来定义是否禁用状态。

<div class="row left">
  <ea-link href="https://github.com/LuminaQAQ" disabled>默认链接</ea-link>
  <ea-link variant="primary" href="https://github.com/LuminaQAQ" disabled>主要链接</ea-link>
  <ea-link variant="success" href="https://github.com/LuminaQAQ" disabled>成功链接</ea-link>
  <ea-link variant="warning" href="https://github.com/LuminaQAQ" disabled>警告链接</ea-link>
  <ea-link variant="danger" href="https://github.com/LuminaQAQ" disabled>危险链接</ea-link>
  <ea-link variant="info" href="https://github.com/LuminaQAQ" disabled>信息链接</ea-link>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-link href="https://github.com/LuminaQAQ" disabled>默认链接</ea-link>
  <ea-link variant="primary" href="https://github.com/LuminaQAQ" disabled
    >主要链接</ea-link
  >
  <ea-link variant="success" href="https://github.com/LuminaQAQ" disabled
    >成功链接</ea-link
  >
  <ea-link variant="warning" href="https://github.com/LuminaQAQ" disabled
    >警告链接</ea-link
  >
  <ea-link variant="danger" href="https://github.com/LuminaQAQ" disabled
    >危险链接</ea-link
  >
  <ea-link variant="info" href="https://github.com/LuminaQAQ" disabled
    >信息链接</ea-link
  >
</div>
```

:::

## 下划线

文字链接下划线。通过设置 `underline` 属性来控制是否显示下划线，支持 `'always' | 'hover' | 'never'` 三种模式。

<div class="row left">
  <ea-link>无下划线</ea-link>
  <ea-link underline="never">无下划线</ea-link>
  <ea-link variant="primary" underline="hover">hover下划线</ea-link>
  <ea-link variant="primary" underline="always">always下划线</ea-link>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-link>无下划线</ea-link>
  <ea-link underline="never">无下划线</ea-link>
  <ea-link variant="primary" underline="hover">hover下划线</ea-link>
  <ea-link variant="primary" underline="always">always下划线</ea-link>
</div>
```

:::

## 图标

带图标的文字链接可增强辨识度。通过 `icon` 属性设置图标名称，也可以在默认插槽中直接使用 `ea-icon` 组件。

<div class="row left">
  <ea-link icon="eye">查看</ea-link>
  <ea-link icon="share">分享</ea-link>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-link icon="eye">查看</ea-link>
  <ea-link icon="share">分享</ea-link>
</div>
```

:::

## 原生链接属性

ea-link 支持原生 `<a>` 标签的 `target`、`rel`、`download` 属性，提供完整的原生链接能力。

<div class="row left">
  <ea-link href="https://github.com/LuminaQAQ" target="_blank" rel="noopener noreferrer">新窗口打开</ea-link>
  <ea-link href="/files/document.pdf" download="document.pdf">下载文件</ea-link>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-link
    href="https://github.com/LuminaQAQ"
    target="_blank"
    rel="noopener noreferrer"
    >新窗口打开</ea-link
  >
  <ea-link href="/files/document.pdf" download="document.pdf">下载文件</ea-link>
</div>
```

:::

## Link API

### Link Attributes

| 参数      | 说明         | 类型                         | 可选值                                                           | 默认值   |
| --------- | ------------ | ---------------------------- | ---------------------------------------------------------------- | -------- |
| variant   | 链接类型     | string                       | `primary` / `success` / `warning` / `danger` / `info` / `normal` | `normal` |
| disabled  | 是否禁用     | boolean                      | —                                                                | `false`  |
| underline | 下划线模式   | `always` / `hover` / `never` | —                                                                | —        |
| icon      | 图标名称     | string                       | —                                                                | —        |
| href      | 链接地址     | string                       | —                                                                | —        |
| target    | 链接打开方式 | string                       | `_blank` / `_self` / `_parent` / `_top`                          | —        |
| rel       | 链接关系     | string                       | —                                                                | —        |
| download  | 下载文件名   | string                       | —                                                                | —        |

### Link CSS Part

| 名称      | 说明         |
| --------- | ------------ |
| container | 链接容器元素 |
| icon      | 图标元素     |

### Link Slots

| 名称    | 说明                   |
| ------- | ---------------------- |
| default | 默认插槽，链接文本内容 |

### Link CSS 自定义属性

| 属性名                      | 说明         | 默认值                 |
| --------------------------- | ------------ | ---------------------- |
| --ea-link-font-size         | 链接字体大小 | var(--font-size-md)    |
| --ea-link-transition        | 过渡动画时长 | var(--transition-fast) |
| --ea-link-icon-margin-right | 图标右边距   | var(--spacing-sm)      |
