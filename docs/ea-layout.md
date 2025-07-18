<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
})
</script>

# Layout 布局 ​

通过基础的 24 分栏，迅速简便地创建布局。

::: tip

组件默认使用 Flex 布局，不需要手动设置 type="flex"。

请注意父容器避免使用 inline 相关样式，会导致组件宽度不能撑满。

列的基本单位为 1，最多 24 个，最少 0 个。

:::

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-layout/index.js";
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

移步到 [CSS Part](#button-css-part)。

## 基础布局 ​

使用列创建基础网格布局。

通过 `row` 和 `col` 组件，并通过 `col` 组件的 `span` 属性我们就可以自由地组合布局。

## 分栏间隔 ​

支持列间距。

行提供 `gutter` 属性来指定列之间的间距，其默认值为 0。

## 混合布局 ​

通过基础的 `1/24` 分栏任意扩展组合形成较为复杂的混合布局。

## 列偏移 ​

您可以指定列偏移量。

通过制定 `col` 组件的 `offset` 属性可以指定分栏偏移的栏数。

## 对齐方式 ​

默认使用 `flex` 布局来对分栏进行灵活的对齐。

您可以通过 `justify` 属性来定义子元素的排版方式，其取值为`start | center | end | space-between | space-around | space-evenly`。
