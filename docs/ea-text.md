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

## 自定义样式

移步到 [CSS Part](#ea-text-css-part)。

## 基础用法

由 `variant` 属性来选择 Text 的类型。

<div class="row">
  <ea-text>Default</ea-text>
  <ea-text variant="primary">Primary</ea-text>
  <ea-text variant="success">Success</ea-text>
  <ea-text variant="info">Info</ea-text>
  <ea-text variant="warning">Warning</ea-text>
  <ea-text variant="danger">Danger</ea-text>
</div>

::: details 查看代码

```html
<div class="row">
  <ea-text>Default</ea-text>
  <ea-text variant="primary">Primary</ea-text>
  <ea-text variant="success">Success</ea-text>
  <ea-text variant="info">Info</ea-text>
  <ea-text variant="warning">Warning</ea-text>
  <ea-text variant="danger">Danger</ea-text>
</div>
```

:::

## 尺寸

使用 `size` 属性配置尺寸，可选的尺寸大小有: `large`、`medium` 或 `small`。

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

## 省略

通过 `truncated` 属性，在文本超过视图或最大宽度设置时展示省略符。通过 `line-clamp` 属性控制多行的样式。

::: tip
当 `truncated` 或 `line-clamp` 启用时，若未设置原生 `title` 属性，组件会自动将文本内容设置为容器的 `title`，以便鼠标悬停时显示完整文本。
:::

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
```

:::

## 覆盖

使用 `tag` 属性覆盖元素标签，可选值: `span`、`p`、`b`、`i`、`sub`、`sup`、`ins`、`del`、`mark`。

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
```

:::

## ea-text API

### ea-text Attributes

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| variant | 文本类型 | string | normal / primary / success / warning / danger / info | normal |
| size | 文本大小 | string | large / medium / small | medium |
| truncated | 文本是否截断 | boolean | — | false |
| line-clamp | 截断的行数 | number | — | 0 |
| tag | 文本标签 | string | span / p / b / i / sub / sup / ins / del / mark | span |

### ea-text Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 默认内容 |

### ea-text CSS Part

| 名称 | 说明 |
| --- | --- |
| container | 容器 |

### ea-text CSS 自定义属性

| 属性名 | 说明 | 默认值 |
| --- | --- | --- |
| --ea-text-line-clamp | 截断行数 | 0 |
| --ea-text-primary-color | 主色文本颜色 | var(--blue-500) |
| --ea-text-success-color | 成功文本颜色 | var(--green-500) |
| --ea-text-info-color | 信息文本颜色 | var(--grey-500) |
| --ea-text-warning-color | 警告文本颜色 | var(--yellow-500) |
| --ea-text-danger-color | 危险文本颜色 | var(--red-500) |
| --ea-text-small-font-size | 小号字体大小 | var(--font-size-sm) |
| --ea-text-medium-font-size | 中号字体大小 | var(--font-size-md) |
| --ea-text-large-font-size | 大号字体大小 | var(--font-size-lg) |
