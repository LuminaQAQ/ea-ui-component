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

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-breadcrumb/index.js";
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

移步到 [CSS Part](#breadcrumb-css-part)。

## 基础用法

在 `ea-breadcrumb` 中使用 `ea-breadcrumb-item` 标签表示从首页开始的每一级。`ea-breadcrumb` 提供了一个 separator 属性，在 `ea-breadcrumb` 标签中设置它来决定分隔符，它只能是字符串，默认为斜杠 `/`。

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

```html
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
```

## 图标分隔符

> 通过设置 `separator-class` 可使用相应的 `iconfont` 作为分隔符，注意这将使 `separator` 设置失效. 可设置 `separator-color` 来设置分隔符颜色.

<!-- -------- 2. 图标分隔符 --------  -->
<!-- #region  -->
<div class="demo">
  <ea-breadcrumb>
    <ea-icon icon="icon-angle-right" slot="separator"></ea-icon>
    <ea-breadcrumb-item href="javascript:;">homepage</ea-breadcrumb-item>
    <ea-breadcrumb-item href="javascript:;">
      <span slot="separator">→</span>
      promotion management
    </ea-breadcrumb-item>
    <ea-breadcrumb-item>promotion list</ea-breadcrumb-item>
    <ea-breadcrumb-item>promotion detail</ea-breadcrumb-item>
  </ea-breadcrumb>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

```html
<div class="demo">
  <ea-breadcrumb>
    <ea-icon icon="icon-angle-right" slot="separator"></ea-icon>
    <ea-breadcrumb-item href="javascript:;">homepage</ea-breadcrumb-item>
    <ea-breadcrumb-item href="javascript:;">
      <span slot="separator">→</span>
      promotion management
    </ea-breadcrumb-item>
    <ea-breadcrumb-item>promotion list</ea-breadcrumb-item>
    <ea-breadcrumb-item>promotion detail</ea-breadcrumb-item>
  </ea-breadcrumb>
</div>
```

## Breadcrumb API

### Breadcrumb Attributes

| 参数      | 说明   | 类型   | 可选值 | 默认值 |
| --------- | ------ | ------ | ------ | ------ |
| separator | 分隔符 | string | -      | `/`    |

### Breadcrumb Slots

| 名称      | 说明     |
| --------- | -------- |
| -         | 默认插槽 |
| separator | 分隔符   |

### Breadcrumb CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明 |
| --------- | ---- |
| container | 容器 |

## BreadcrumbItem API

### BreadcrumbItem Attributes

| 参数 | 说明 | 类型   | 可选值 | 默认值 |
| ---- | ---- | ------ | ------ | ------ |
| href | 链接 | string | -      | -      |

### Breadcrumb Slots

| 名称      | 说明     |
| --------- | -------- |
| -         | 默认插槽 |
| separator | 分隔符   |

### Breadcrumb CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明   |
| --------- | ------ |
| container | 容器   |
| separator | 分隔符 |
