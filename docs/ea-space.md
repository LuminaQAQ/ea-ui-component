<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")
})
</script>

<style>
.alignment-container {
    width: 240px;
    margin-bottom: 20px;
    padding: 8px;

    border: 1px solid #ddd;
}
</style>

# Space 间距 ​

虽然我们拥有 <ea-link type="primary" href="./ea-divider">Divider</ea-link> 组件，但很多时候我们需要不是一个被 <ea-link type="primary" href="./ea-divider">Divider</ea-link> 组件 分割开的页面结构，因此我们会重复的使用很多的 <ea-link type="primary" href="./ea-divider">Divider</ea-link> 组件，这在我们的开发效率上造成了一定的困扰。 间距组件就是为了解决这种困扰应运而生的。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-space/index.js";
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

最基础的用法，通过这个组件来给组件之间提供统一的间距。

通过间距组件来给多个组件之间提供间距

<div class="demo">
  <ea-space wrap>
    <ea-card v-for="i in 3" style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
  </ea-space>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-space wrap>
    <ea-card style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
    <ea-card style="width: 250px;">
      <span slot="header"> 卡片标题 <ea-button>操作</ea-button> </span>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
    <ea-card style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
  </ea-space>
</div>
```

:::

## 垂直布局 ​

使用 `direction` 来控制布局的方式, 背后实际上是利用了 `flex-direction` 来控制.

我们也提供垂直布局方式。

<div class="demo">
  <ea-space direction="vertical" wrap>
    <ea-card v-for="i in 3" style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
  </ea-space>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-space direction="vertical" wrap>
    <ea-card style="width: 250px;">
      <div slot="header">卡片标题 <ea-button>操作</ea-button></div>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
    <ea-card style="width: 250px;">
      <span slot="header"> 卡片标题 <ea-button>操作</ea-button> </span>
      <ol>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ol>
    </ea-card>
  </ea-space>
</div>
```

:::

## 控制间距的大小 ​

通过调整 `size` 的值来控制间距的大小

使用内置的 `small`、`default`、`large` 来设置间距大小，分别对应 `8px`、`12px` 和 `16px` 的间距。 默认的间距大小为 `small`，也就是 `8px`。

您也可以通过自定义的 size 来控制大小， 参见下一个部分。

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
