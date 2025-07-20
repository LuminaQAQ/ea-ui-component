<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")
})
</script>

<style>
    
</style>

# Text 文本

文本的常见操作

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-text/index.js";
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

## 基础用法 ​

由 `type` 属性来选择 `Text` 的类型。

<div class="row">
  <ea-text>Default</ea-text>
  <ea-text type="primary">Primary</ea-text>
  <ea-text type="success">Success</ea-text>
  <ea-text type="info">Info</ea-text>
  <ea-text type="warning">Warning</ea-text>
  <ea-text type="danger">Danger</ea-text>
</div>

::: details 查看代码

```html
<div class="row">
  <ea-text>Default</ea-text>
  <ea-text type="primary">Primary</ea-text>
  <ea-text type="success">Success</ea-text>
  <ea-text type="info">Info</ea-text>
  <ea-text type="warning">Warning</ea-text>
  <ea-text type="danger">Danger</ea-text>
</div>
```

:::

## 尺寸 ​

使用 `size` 属性配置尺寸，可选的尺寸大小有: `large`, `default` 或 `small`

<div class="row">
  <ea-text size="large">Large</ea-text>
  <ea-text>Default</ea-text>
  <ea-text size="small">Small</ea-text>
</div>

::: details 查看代码

```html
<div class="row">
  <ea-text size="large">Large</ea-text>
  <ea-text>Default</ea-text>
  <ea-text size="small">Small</ea-text>
</div>
```

:::

## 省略 ​

通过 `truncated` 属性，在文本超过视图或最大宽度设置时展示省略符。 通过 `line-clamp` 属性控制多行的样式

<div class="col">
  <ea-text tag="p" truncated style="width: 100px;">
    Self element set width 100px
  </ea-text>
  <ea-row style="width: 100px;">
    <ea-text tag="p" truncated>Squeezed by parent element</ea-text>
  </ea-row>
  <ea-text tag="p" line-clamp="2">
    The -webkit-line-clamp CSS property<br />
    allows limiting of the contents of<br />
    a block to the specified number of lines.
  </ea-text>
</div>

::: details 查看代码

```html
<div class="row">
  <ea-text tag="p" truncated="true" style="width: 100px;">
    Self element set width 100px
  </ea-text>
  <ea-row style="width: 100px;">
    <ea-text tag="p" truncated="true">Squeezed by parent element</ea-text>
  </ea-row>
  <ea-text tag="p" line-clamp="2">
    The -webkit-line-clamp CSS property<br />
    allows limiting of the contents of<br />
    a block to the specified number of lines.
  </ea-text>
</div>
```

:::

## 覆盖 ​

使用属性 `tag` 覆盖元素

<div class="col">
  <ea-text>span</ea-text>
  <ea-text tag="p">This is a paragraph.</ea-text>
  <ea-text tag="b">Bold</ea-text>
  <ea-text tag="i">Italic</ea-text>
  <ea-text>
    This is
    <ea-text tag="sub" size="small">subscript</ea-text>
  </ea-text>
  <ea-text>
    This is
    <ea-text tag="sup" size="small">superscript</ea-text>
  </ea-text>
  <ea-text tag="ins">Inserted</ea-text>
  <ea-text tag="del">Deleted</ea-text>
  <ea-text tag="mark">Marked</ea-text>
</div>

::: details 查看代码

```html
<div class="col">
  <ea-text>span</ea-text>
  <ea-text tag="p">This is a paragraph.</ea-text>
  <ea-text tag="b">Bold</ea-text>
  <ea-text tag="i">Italic</ea-text>
  <ea-text>
    This is
    <ea-text tag="sub" size="small">subscript</ea-text>
  </ea-text>
  <ea-text>
    This is
    <ea-text tag="sup" size="small">superscript</ea-text>
  </ea-text>
  <ea-text tag="ins">Inserted</ea-text>
  <ea-text tag="del">Deleted</ea-text>
  <ea-text tag="mark">Marked</ea-text>
</div>
```

:::

## Text API

### Text Attributes

| **属性名** | **说明** | **类型** | **可选值** | **默认值** |
| ---------- | -------- | -------- | ---------- | ---------- |

### Text Slots

| **插槽名** | **说明** |
| ---------- | -------- |
| -          | 默认内容 |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明 |
| --------- | ---- |
| container | 容器 |
