<script setup>
import { onMounted, ref } from 'vue'

const btn = ref(null);

onMounted(() => {
  import('../components/ea-icon/index.css')
  import('../components/ea-button/ea-button.js')
  import('../components/ea-button-group/index.js')
  import('../components/ea-switch/index.js')
  import('./index.scss')

  document
    .querySelector("#ea-radio-href")
    .addEventListener("click", function (e) {
      const btn = document.querySelector("#ea-button-a");

      btn.disabled = e.target.checked;
    });

  document
    .querySelector("#ea-radio-loading")
    .addEventListener("click", function (e) {
      const btn = document.querySelector("#ea-button-loading");

      e.target.checked
        ? btn.loading = true
        : btn.loading = false;
    });
})
</script>

<style>
  .part::part(wrap) {
    background: aquamarine;
  }
</style>

# Button 按钮

常用的操作按钮。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-button/index.js";
  import "./node_modules/easy-component-ui/components/ea-button-group/index.js";
</script>
```

> `css`: 需要注意的是, 如果需要使用到带有图标的 `属性/组件`, 需要提前使用 `link` 标签引入图标文件

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 基础用法 `normal`

基础的按钮用法。

<div class="row">
  <ea-button>默认按钮</ea-button>
  <ea-button class="part">默认按钮</ea-button>
  <ea-button type="primary">主要按钮</ea-button>
  <ea-button type="success">成功按钮</ea-button>
  <ea-button type="warning">警告按钮</ea-button>
  <ea-button type="danger">危险按钮</ea-button>
</div>

```html
<div class="row">
  <ea-button>默认按钮</ea-button>
  <ea-button class="part">默认按钮</ea-button>
  <ea-button type="primary">主要按钮</ea-button>
  <ea-button type="success">成功按钮</ea-button>
  <ea-button type="warning">警告按钮</ea-button>
  <ea-button type="danger">危险按钮</ea-button>
</div>
```

`css`: 自定义样式

```html
<style>
  .part::part(wrap) {
    background: aquamarine;
  }

  /* 或修改所有 ea-button */

  ea-button::part(wrap) {
    background: aquamarine;
  }
</style>
```

## 朴素按钮 `plain`

朴素按钮用法。

<div class="row">
    <ea-button plain>朴素按钮</ea-button>
    <ea-button type="primary" plain>主要按钮</ea-button>
    <ea-button type="success" plain>成功按钮</ea-button>
    <ea-button type="warning" plain>警告按钮</ea-button>
    <ea-button type="danger" plain>危险按钮</ea-button>
</div>

```html
<div class="row">
  <ea-button plain>朴素按钮</ea-button>
  <ea-button type="primary" plain>主要按钮</ea-button>
  <ea-button type="success" plain>成功按钮</ea-button>
  <ea-button type="warning" plain>警告按钮</ea-button>
  <ea-button type="danger" plain>危险按钮</ea-button>
</div>
```

## 圆角按钮 `round`

圆角按钮用法。

<div class="row">
    <ea-button round>圆角按钮</ea-button>
    <ea-button type="primary" round>主要按钮</ea-button>
    <ea-button type="success" round>成功按钮</ea-button>
    <ea-button type="warning" round>警告按钮</ea-button>
    <ea-button type="danger" round>危险按钮</ea-button>
</div>

```html
<div class="row">
  <ea-button round>圆角按钮</ea-button>
  <ea-button type="primary" round>主要按钮</ea-button>
  <ea-button type="success" round>成功按钮</ea-button>
  <ea-button type="warning" round>警告按钮</ea-button>
  <ea-button type="danger" round>危险按钮</ea-button>
</div>
```

## 禁用按钮 `disabled`

按钮不可用状态。

<div class="row">
  <ea-button disabled>禁用按钮</ea-button>
  <ea-button type="primary" disabled>主要按钮</ea-button>
  <ea-button type="success" disabled>成功按钮</ea-button>
  <ea-button type="warning" disabled>警告按钮</ea-button>
  <ea-button type="danger" disabled>危险按钮</ea-button>
</div>

```html
<div class="row">
  <ea-button disabled>禁用按钮</ea-button>
  <ea-button type="primary" disabled>主要按钮</ea-button>
  <ea-button type="success" disabled>成功按钮</ea-button>
  <ea-button type="warning" disabled>警告按钮</ea-button>
  <ea-button type="danger" disabled>危险按钮</ea-button>
</div>
```

## 文字按钮 `text`

没有边框和背景色的按钮。

<div class="row left">
  <ea-button type="text">文字按钮</ea-button>
  <ea-button type="text" disabled>文字按钮</ea-button>
</div>

```html
<div class="row left">
  <ea-button type="text">文字按钮</ea-button>
  <ea-button type="text" disabled>文字按钮</ea-button>
</div>
```

## 图标按钮 `icon`

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

<div class="row left">
  <ea-button type="primary" icon="icon-edit"></ea-button>
  <ea-button type="primary" icon="icon-comment-empty">图标按钮</ea-button>
  <ea-button type="primary" icon="icon-trash-empty" disabled>图标按钮</ea-button>
</div>

```html
<div class="row left">
  <ea-button type="primary" icon="icon-edit"></ea-button>
  <ea-button type="primary" icon="icon-comment-empty">图标按钮</ea-button>
  <ea-button type="primary" icon="icon-trash-empty" disabled
    >图标按钮</ea-button
  >
</div>
```

## 链接按钮 `href`

对普通链接的样式进行美化，可以在不同场景下选择相应的样式。

<div class="row left">
  <ea-switch id="ea-radio-href" checked></ea-switch>
  <ea-button type="text" href="https://github.com/LuminaQAQ">链接按钮</ea-button>
  <ea-button id="ea-button-a" type="normal" href="https://github.com/LuminaQAQ" disabled>链接按钮</ea-button>
</div>

```html
<div class="row left">
  <ea-button type="text">文字按钮</ea-button>
  <ea-button id="ea-button-a" type="text" disabled>文字按钮</ea-button>
</div>

<script>
  document
    .querySelector("#ea-radio-href")
    .addEventListener("click", function (e) {
      const btn = document.querySelector("#ea-button-a");

      btn.disabled = e.target.checked;
    });
</script>
```

## 按钮组 `button-group`

以按钮组的方式出现，常用于多项类似操作。

<div class="row left">
  <ea-button-group>
    <ea-button type="primary">上一页</ea-button>
    <ea-button type="primary">下一页</ea-button>
  </ea-button-group>
  <ea-button-group>
    <ea-button type="primary">后退</ea-button>
    <ea-button type="primary">刷新</ea-button>
    <ea-button type="primary">前进</ea-button>
  </ea-button-group>
</div>

```html
<ea-button-group>
  <ea-button type="primary">上一页</ea-button>
  <ea-button type="primary">下一页</ea-button>
</ea-button-group>
<ea-button-group>
  <ea-button type="primary">后退</ea-button>
  <ea-button type="primary">刷新</ea-button>
  <ea-button type="primary">前进</ea-button>
</ea-button-group>
```

## 加载中 `loading`

点击按钮后进行数据加载操作，在按钮上显示加载状态。可以点击尝试。

<div class="row left">
  <ea-switch id="ea-radio-loading" checked></ea-switch>
  <ea-button id="ea-button-loading" type="primary" loading>加载中按钮</ea-button>
</div>

```html
<div class="row">
  <ea-switch id="ea-radio-loading" checked></ea-switch>
  <ea-button id="ea-button-loading" type="primary" loading
    >加载中按钮</ea-button
  >
</div>

<script>
  document
    .querySelector("#ea-radio-loading")
    .addEventListener("click", function (e) {
      const btn = document.querySelector("#ea-button-loading");

      e.target.checked ? (btn.loading = true) : (btn.loading = false);
    });
</script>
```

## 不同尺寸 `size`

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

<div class="row">
  <ea-button round>默认按钮</ea-button>
  <ea-button size="medium" round>中等按钮</ea-button>
  <ea-button size="small" round>小型按钮</ea-button>
  <ea-button size="mini" round>超小按钮</ea-button>
</div>

```html
<div class="row">
  <ea-button round>默认按钮</ea-button>
  <ea-button size="medium" round>中等按钮</ea-button>
  <ea-button size="small" round>小型按钮</ea-button>
  <ea-button size="mini" round>超小按钮</ea-button>
</div>
```

## Attributes

| 参数     | 说明       | 类型    | 可选值                                           | 默认值 |
| -------- | ---------- | ------- | ------------------------------------------------ | ------ |
| size     | 尺寸       | string  | normal/medium/small/mini                         | normal |
| type     | 类型       | string  | normal/primary/success <br> /warning/danger/text | normal |
| plain    | 朴素按钮   | boolean | true/false                                       | false  |
| disabled | 禁用状态   | boolean | true/false                                       | false  |
| round    | 圆角按钮   | boolean | true/false                                       | false  |
| loading  | 加载中状态 | boolean | true/false                                       | false  |
| icon     | 图标类名   | string  | -                                                | -      |
| href     | 链接地址   | string  | -                                                | -      |
