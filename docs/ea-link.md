<script setup>
import { onMounted, ref } from 'vue'

const btn = ref(null);

onMounted(() => {
  import('../components/ea-link/index.js')
  import('./index.scss')
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

基础的文字链接用法。

<div class="row left">
    <ea-link href="https://github.com/LuminaQAQ">默认链接</ea-link>
    <ea-link class="custom-link" href="https://github.com/LuminaQAQ">默认链接-自定义链接颜色</ea-link>
    <ea-link href="https://github.com/LuminaQAQ" type="primary">主要链接</ea-link>
    <ea-link href="https://github.com/LuminaQAQ" type="success">成功链接</ea-link>
    <ea-link href="https://github.com/LuminaQAQ" type="warning">警告链接</ea-link>
    <ea-link href="https://github.com/LuminaQAQ" type="danger">危险链接</ea-link>
    <ea-link href="https://github.com/LuminaQAQ" type="info">信息链接</ea-link>
</div>

```html
<div class="row left">
  <ea-link href="https://github.com/LuminaQAQ">默认链接</ea-link>
  <ea-link class="custom-link" href="https://github.com/LuminaQAQ"
    >默认链接-自定义链接颜色</ea-link
  >
  <ea-link href="https://github.com/LuminaQAQ" type="primary">主要链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="success">成功链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="warning">警告链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="danger">危险链接</ea-link>
  <ea-link href="https://github.com/LuminaQAQ" type="info">信息链接</ea-link>
</div>
```

`css`: 自定义样式

```html
<style>
  .custom-link::part(wrap) {
    color: pink;
  }

  /* 或改变所有 */

  ea-link::part(wrap) {
    color: black;
  }
</style>
```

## 禁用状态

文字链接不可用状态。

<div class="row left">
    <ea-link type="primary" href="https://github.com/LuminaQAQ">未禁用状态</ea-link>
    <ea-link disabled>禁用状态</ea-link>
</div>

```html
<div class="row left">
  <ea-link type="primary" href="https://github.com/LuminaQAQ"
    >未禁用状态</ea-link
  >
  <ea-link disabled>禁用状态</ea-link>
</div>
```

## 下划线

文字链接下划线。

<div class="row left">
    <ea-link>无下划线</ea-link>
    <ea-link type="primary" underline>下划线</ea-link>
</div>

```html
<div class="row left">
  <ea-link>无下划线</ea-link>
  <ea-link type="primary" underline>下划线</ea-link>
</div>
```

## 图标

带图标的文字链接可增强辨识度。

<div class="row left">
    <ea-link icon="icon-eye">查看</ea-link>
    <ea-link icon="icon-share">分享</ea-link>
</div>

```html
<div class="row left">
  <ea-link icon="icon-eye">查看</ea-link>
  <ea-link icon="icon-share">分享</ea-link>
</div>
```

## Attributes

| 参数      | 说明       | 类型    | 可选值                                      | 默认值 |
| --------- | ---------- | ------- | ------------------------------------------- | ------ |
| type      | 类型       | string  | primary / success / warning / danger / info | -      |
| disabled  | 是否禁用   | boolean | -                                           | false  |
| underline | 是否下划线 | boolean | -                                           | true   |
| icon      | 图标       | string  | -                                           | -      |
| href      | 链接地址   | string  | -                                           | -      |
