<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")
})
</script>

<style>
  .custom-link::part(wrap) {
    color: pink;
  }
</style>

# Link 文字链接

文字超链接

## 引入

> `js`

```js
<script type="module">
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

移步到 [CSS Part](#css-part)。

## 基础用法

基础的文字链接用法。通过设置 `type` 属性来定义文字链接的类型。

<div class="row left">
  <ea-link href="https://github.com/LuminaQAQ">默认链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="primary">主要链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="success">成功链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="warning">警告链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="danger">危险链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="info">信息链接</ea-link>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-link href="https://github.com/LuminaQAQ">默认链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="primary">主要链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="success">成功链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="warning">警告链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="danger">危险链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="info">信息链接</ea-link>
</div>
```

:::

## 禁用状态

文字链接不可用状态。通过设置 `disabled` 属性来定义是否禁用状态。

<div class="row left">
  <ea-link href="https://github.com/LuminaQAQ" disabled>默认链接</ea-link>
  <ea-link type="primary" href="https://github.com/LuminaQAQ" disabled>
    主要链接
  </ea-link>
  <ea-link type="success" href="https://github.com/LuminaQAQ" disabled>
    成功链接
  </ea-link>
  <ea-link type="warning" href="https://github.com/LuminaQAQ" disabled>
    警告链接
  </ea-link>
  <ea-link type="danger" href="https://github.com/LuminaQAQ" disabled>
    危险链接
  </ea-link>
  <ea-link type="info" href="https://github.com/LuminaQAQ" disabled>
    信息链接
  </ea-link>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-link href="https://github.com/LuminaQAQ" disabled>默认链接</ea-link>
  <ea-link type="primary" href="https://github.com/LuminaQAQ" disabled>
    主要链接
  </ea-link>
  <ea-link type="success" href="https://github.com/LuminaQAQ" disabled>
    成功链接
  </ea-link>
  <ea-link type="warning" href="https://github.com/LuminaQAQ" disabled>
    警告链接
  </ea-link>
  <ea-link type="danger" href="https://github.com/LuminaQAQ" disabled>
    危险链接
  </ea-link>
  <ea-link type="info" href="https://github.com/LuminaQAQ" disabled>
    信息链接
  </ea-link>
</div>
```

:::

## 下划线

文字链接下划线。通过设置 `underline` 属性来定义是否显示下划线。

::: danger
属性 `boolean` 值 将在 `3.0.0` 版本中被移除，请考虑切换至新的 API。
:::

::: tip
从 `3.0.0` 开始，你可以使用 `'always' | 'hover' | 'never'` 来控制是否显示下划线。 文档中的示例将都使用这些值。
:::

<div class="row left">
  <ea-link>无下划线</ea-link>
  <ea-link underline="never">无下划线</ea-link>
  <ea-link type="primary" underline="hover">hover下划线</ea-link>
  <ea-link type="primary" underline="always">always下划线</ea-link>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-link>无下划线</ea-link>
  <ea-link underline="never">无下划线</ea-link>
  <ea-link type="primary" underline="hover">hover下划线</ea-link>
  <ea-link type="primary" underline="always">always下划线</ea-link>
</div>
```

:::

## 图标

带图标的文字链接可增强辨识度。

<div class="row left">
  <ea-link icon="icon-eye">查看</ea-link>
  <ea-link>分享<ea-icon icon="icon-share"></ea-icon></ea-link>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-link icon="icon-eye">查看</ea-link>
  <ea-link icon="icon-share">分享</ea-link>
</div>
```

:::

## Link API

### Attributes

| 参数      | 说明       | 类型                         | 可选值                                                | 默认值   |
| --------- | ---------- | ---------------------------- | ----------------------------------------------------- | -------- |
| type      | 类型       | string                       | `primary` / `success` / `warning` / `danger` / `info` | `normal` |
| disabled  | 是否禁用   | boolean                      | -                                                     | `false`  |
| underline | 是否下划线 | `always` / `hover` / `never` | -                                                     | -        |
| icon      | 图标       | string                       | -                                                     | -        |
| href      | 链接地址   | string                       | -                                                     | -        |

### CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |
