<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")
})
</script>

# Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-breadcrumb.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-breadcrumb";
```

:::

## 自定义样式

移步到 [CSS Part](#breadcrumb-css-part) 和 [CSS Custom Properties](#breadcrumbitem-css-自定义属性)。

## 基础用法

在 `ea-breadcrumb` 中使用 `ea-breadcrumb-item` 标签表示从首页开始的每一级。`ea-breadcrumb` 提供了一个 `separator` 属性，在 `ea-breadcrumb` 标签中设置它来决定分隔符，它只能是字符串，默认为斜杠 `/`。

<!-- -------- 1. 基础用法 --------  -->
<!-- #region  -->
<div class="demo">
  <ea-breadcrumb separator="/">
    <ea-breadcrumb-item href="javascript:;">homepage</ea-breadcrumb-item>
    <ea-breadcrumb-item href="javascript:;">
      promotion management
    </ea-breadcrumb-item>
    <ea-breadcrumb-item>promotion list</ea-breadcrumb-item>
    <ea-breadcrumb-item>promotion detail</ea-breadcrumb-item>
  </ea-breadcrumb>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 查看代码

```html
<ea-breadcrumb separator="/">
  <ea-breadcrumb-item href="javascript:;">homepage</ea-breadcrumb-item>
  <ea-breadcrumb-item href="javascript:;">
    promotion management
  </ea-breadcrumb-item>
  <ea-breadcrumb-item>promotion list</ea-breadcrumb-item>
  <ea-breadcrumb-item>promotion detail</ea-breadcrumb-item>
</ea-breadcrumb>
```

:::

## 图标分隔符

通过在 `ea-breadcrumb` 中使用 `slot="separator"` 插入自定义元素（如 `ea-icon`）作为分隔符。也可以在单个 `ea-breadcrumb-item` 中使用 `slot="separator"` 自定义该项的分隔符。

<!-- -------- 2. 图标分隔符 --------  -->
<!-- #region  -->
<div class="demo">
  <ea-breadcrumb>
    <ea-icon name="angle-right" slot="separator"></ea-icon>
    <ea-breadcrumb-item href="javascript:;">homepage</ea-breadcrumb-item>
    <ea-breadcrumb-item href="javascript:;">
      <span slot="separator">→</span>
      promotion management
    </ea-breadcrumb-item>
    <ea-breadcrumb-item>promotion list</ea-breadcrumb-item>
    <ea-breadcrumb-item>promotion detail</ea-breadcrumb-item>
  </ea-breadcrumb>
</div>
<!-- #endregion -->
<!-- ------------------- -->

::: details 查看代码

```html
<ea-breadcrumb>
  <ea-icon name="angle-right" slot="separator"></ea-icon>
  <ea-breadcrumb-item href="javascript:;">homepage</ea-breadcrumb-item>
  <ea-breadcrumb-item href="javascript:;">
    <span slot="separator">→</span>
    promotion management
  </ea-breadcrumb-item>
  <ea-breadcrumb-item>promotion list</ea-breadcrumb-item>
  <ea-breadcrumb-item>promotion detail</ea-breadcrumb-item>
</ea-breadcrumb>
```

:::

## Breadcrumb API

### Breadcrumb Attributes

| 参数      | 说明   | 类型   | 可选值 | 默认值 |
| --------- | ------ | ------ | ------ | ------ |
| separator | 分隔符 | string | —      | `/`    |

### Breadcrumb Slots

| 名称      | 说明                              |
| --------- | --------------------------------- |
| default   | 默认插槽，放置 ea-breadcrumb-item |
| separator | 自定义分隔符内容                  |

### Breadcrumb CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明         |
| --------- | ------------ |
| container | 导航容器元素 |

## BreadcrumbItem API

### BreadcrumbItem Attributes

| 参数 | 说明     | 类型   | 可选值 | 默认值 |
| ---- | -------- | ------ | ------ | ------ |
| href | 链接地址 | string | —      | —      |

### BreadcrumbItem Slots

| 名称      | 说明                   |
| --------- | ---------------------- |
| default   | 默认插槽，面包屑项内容 |
| separator | 自定义分隔符内容       |

### BreadcrumbItem CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明     |
| --------- | -------- |
| container | 项容器   |
| content   | 内容元素 |
| separator | 分隔符   |

### BreadcrumbItem CSS Custom Properties

| 属性名                                 | 说明           | 默认值                   |
| -------------------------------------- | -------------- | ------------------------ |
| --ea-breadcrumb-item-separator-color   | 分隔符颜色     | var(--grey-700)          |
| --ea-breadcrumb-item-separator-size    | 分隔符字体大小 | var(--font-size-md)      |
| --ea-breadcrumb-item-separator-spacing | 分隔符间距     | var(--spacing-md)        |
| --ea-breadcrumb-item-link-color        | 链接颜色       | var(--grey-900)          |
| --ea-breadcrumb-item-link-hover-color  | 链接悬停颜色   | var(--blue-500)          |
| --ea-breadcrumb-item-link-font-weight  | 链接字体粗细   | var(--font-weight-bold)  |
| --ea-breadcrumb-item-transition        | 过渡动画时长   | var(--transition-normal) |
