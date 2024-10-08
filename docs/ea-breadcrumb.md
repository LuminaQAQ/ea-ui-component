<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('./index.scss')

    import('../components/ea-breadcrumb/index.js')
    import('../components/ea-link/index.js')
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

适用广泛的基础用法。

> 在 `ea-breadcrumb` 中使用 `ea-breadcrumb-item` 标签表示从首页开始的每一级。`ea-breadcrumb` 提供了一个 separator 属性，在 `ea-breadcrumb` 标签中设置它来决定分隔符，它只能是字符串，默认为斜杠 `/`。

<!-- -------- 1. 基础用法 --------  -->
<!-- #region  -->
<div class="demo">
    <ea-breadcrumb separator="/" separator-color="#c0c4cc">
        <ea-breadcrumb-item>
          <ea-link href="javascript:;" type="primary" underline>首页</ea-link>
        </ea-breadcrumb-item>
        <ea-breadcrumb-item>
          <ea-link href="javascript:;" type="primary" underline>一级</ea-link>
        </ea-breadcrumb-item>
        <ea-breadcrumb-item>二级</ea-breadcrumb-item>
        <ea-breadcrumb-item>三级</ea-breadcrumb-item>
    </ea-breadcrumb>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 查看代码

```html
<div class="demo">
  <ea-breadcrumb separator="/" separator-color="#c0c4cc">
    <ea-breadcrumb-item>
      <ea-link href="javascript:;" type="primary" underline>首页</ea-link>
    </ea-breadcrumb-item>
    <ea-breadcrumb-item>
      <ea-link href="javascript:;" type="primary" underline>一级</ea-link>
    </ea-breadcrumb-item>
    <ea-breadcrumb-item>二级</ea-breadcrumb-item>
    <ea-breadcrumb-item>三级</ea-breadcrumb-item>
  </ea-breadcrumb>
</div>
```

:::

## 图标分隔符

> 通过设置 `separator-class` 可使用相应的 `iconfont` 作为分隔符，注意这将使 `separator` 设置失效. 可设置 `separator-color` 来设置分隔符颜色.

<!-- -------- 2. 图标分隔符 --------  -->
<!-- #region  -->
<div class="demo">
    <ea-breadcrumb separator-class="icon-angle-right" separator-color="#c0c4cc">
        <ea-breadcrumb-item>
          <ea-link href="javascript:;" type="primary" underline>一级</ea-link>
        </ea-breadcrumb-item>
        <ea-breadcrumb-item>一级</ea-breadcrumb-item>
        <ea-breadcrumb-item>二级</ea-breadcrumb-item>
        <ea-breadcrumb-item>三级</ea-breadcrumb-item>
    </ea-breadcrumb>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 查看代码

```html
<div class="demo">
  <ea-breadcrumb separator-class="icon-angle-right" separator-color="#c0c4cc">
    <ea-breadcrumb-item>
      <a href="javascript:;">首页</a>
    </ea-breadcrumb-item>
    <ea-breadcrumb-item>一级</ea-breadcrumb-item>
    <ea-breadcrumb-item>二级</ea-breadcrumb-item>
    <ea-breadcrumb-item>三级</ea-breadcrumb-item>
  </ea-breadcrumb>
</div>
```

:::

## Breadcrumb Attributes

| 参数            | 说明         | 类型   | 可选值 | 默认值    |
| --------------- | ------------ | ------ | ------ | --------- |
| separator       | 分隔符       | string | -      | `/`       |
| separator-class | 分隔符的类名 | string | -      | -         |
| separator-color | 分隔符颜色   | string | -      | `#c0c4cc` |

## Breadcrumb CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明 |
| --------- | ---- |
| container | 容器 |

## BreadcrumbItem CSS Part

| 名称      | 说明 |
| --------- | ---- |
| container | 容器 |
