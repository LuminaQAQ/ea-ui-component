<script setup>
import { onMounted, ref } from 'vue'

const btn = ref(null);

onMounted(() => {
  import('../index.js')
  import('./index.scss')

  document.querySelector("#ea-button-a").addEventListener("click", function (e) {
    e.target.getAttribute("disabled") !== null
      ? e.target.removeAttribute("disabled")
      : e.target.setAttribute("disabled", true);
  });

  document
    .querySelector("#ea-button-loading")
    .addEventListener("click", function (e) {
      e.target.getAttribute("loading") !== null
        ? e.target.removeAttribute("loading")
        : e.target.setAttribute("loading", true);
    });
})
</script>

# Button 按钮

常用的操作按钮。

## 基础用法 `normal`

基础的按钮用法。

<div class="row">
    <ea-button>默认按钮</ea-button>
    <ea-button type="primary">主要按钮</ea-button>
    <ea-button type="success">成功按钮</ea-button>
    <ea-button type="warning">警告按钮</ea-button>
    <ea-button type="danger">危险按钮</ea-button>
</div>

```html
<div class="row">
  <ea-button>默认按钮</ea-button>
  <ea-button type="primary">主要按钮</ea-button>
  <ea-button type="success">成功按钮</ea-button>
  <ea-button type="warning">警告按钮</ea-button>
  <ea-button type="danger">危险按钮</ea-button>
</div>
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

<div class="row left">
  <ea-button type="primary" icon="icon-firefox">文字按钮</ea-button>
  <ea-button type="primary" icon="icon-chrome" disabled>文字按钮</ea-button>
</div>

## 链接按钮 `href`

对普通链接的样式进行美化，可以在不同场景下选择相应的样式。(该示例中, 点击可解禁链接按钮)

<div class="row left">
  <ea-button type="text" href="https://www.baidu.com">链接按钮</ea-button>
  <ea-button id="ea-button-a" type="normal" href="https://www.baidu.com" disabled>链接按钮</ea-button>
</div>

```html
<div class="row left">
  <ea-button type="text">文字按钮</ea-button>
  <ea-button id="ea-button-a" type="text" disabled>文字按钮</ea-button>
</div>

<script>
  document
    .querySelector("#ea-button-a")
    .addEventListener("click", function (e) {
      e.target.getAttribute("disabled") !== null
        ? e.target.removeAttribute("disabled")
        : e.target.setAttribute("disabled", true);
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
  <ea-button id="ea-button-loading" type="primary" loading>默认按钮</ea-button>
</div>

```html
<div class="row">
  <ea-button id="ea-button-loading" round>默认按钮</ea-button>
</div>

<script>
  document
    .querySelector("#ea-button-loading")
    .addEventListener("click", function (e) {
      e.target.getAttribute("loading") !== null
        ? e.target.removeAttribute("loading")
        : e.target.setAttribute("loading", true);
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
