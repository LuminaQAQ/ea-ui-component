<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../components/ea-switch/index.js')
  import('./index.scss')

  document.querySelector('#switch').addEventListener('change', function(e){ 
    console.log(e.detail.checked, e.detail.value)
  })
})
</script>

# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 引入

> `js`

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-switch/index.js";
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

## 基本用法

<div class="row">
  <ea-switch></ea-switch>
  <ea-switch inactive-text="按年付费" active-text="按月付费"></ea-switch>
</div>

::: details 查看代码

```html
<div class="row">
  <ea-switch></ea-switch>
  <ea-switch inactive-text="按年付费" active-text="按月付费"></ea-switch>
</div>
```

:::

## 默认选中状态

<div class="row">
  <ea-switch checked></ea-switch>
  <ea-switch inactive-text="按年付费" active-text="按月付费" checked></ea-switch>
</div>

::: details 查看代码

```html
<div class="row">
  <ea-switch checked></ea-switch>
  <ea-switch
    inactive-text="按年付费"
    active-text="按月付费"
    checked
  ></ea-switch>
</div>
```

:::

## 禁用状态

<div class="row">
  <ea-switch disabled></ea-switch>
  <ea-switch inactive-text="按年付费" active-text="按月付费" checked disabled></ea-switch>
</div>

::: details 查看代码

```html
<div class="row">
  <ea-switch disabled></ea-switch>
  <ea-switch
    inactive-text="按年付费"
    active-text="按月付费"
    checked
    disabled
  ></ea-switch>
</div>
```

:::

## 指定背景色

<div class="row">
  <ea-switch inactive-color="#ff4949" active-color="#13ce66"></ea-switch>
  <ea-switch inactive-color="#ff4949" active-color="#13ce66" inactive-text="按年付费" active-text="按月付费" checked></ea-switch>
</div>

::: details 查看代码

```html
<div class="row">
  <ea-switch inactive-color="#ff4949" active-color="#13ce66"></ea-switch>
  <ea-switch
    inactive-color="#ff4949"
    active-color="#13ce66"
    inactive-text="按年付费"
    active-text="按月付费"
    checked
  ></ea-switch>
</div>
```

:::

## change 事件

<div class="row left">
  <ea-switch inactive-text="按年付费" active-text="按月付费" id="switch"></ea-switch>
</div>

::: details 查看代码

> 是否选中: `e.detail.checked`

> 选中值: `e.detail.value`

```js
document.querySelector("#switch").addEventListener("change", function (e) {
  console.log(e.detail.checked, e.detail.value);
});
```

:::

## Attributes

| 参数           | 说明             | 类型    | 可选值 | 默认值                                                                       |
| -------------- | ---------------- | ------- | ------ | ---------------------------------------------------------------------------- |
| checked        | 是否选中         | Boolean | -      | false                                                                        |
| disabled       | 是否禁用         | Boolean | -      | false                                                                        |
| active-color   | 选中时的背景色   | String  | -      | <span class="color-picker" style="background-color: #409eff;"></span>#1989fa |
| inactive-color | 未选中时的背景色 | String  | -      | <span class="color-picker" style="background-color: #dcdfe6;"></span>#dcdfe6 |
| active-text    | 选中时的文字     | String  | -      | -                                                                            |
| inactive-text  | 未选中时的文字   | String  | -      | -                                                                            |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称        | 说明     |
| ----------- | -------- |
| container   | 外层容器 |
| label-left  | 左侧文字 |
| switch      | 开关     |
| label-right | 右侧文字 |

## Events

| 事件名 | 说明               | 回调参数                                                |
| ------ | ------------------ | ------------------------------------------------------- |
| change | 状态发生变化时触发 | (`e.detail.checked`: Boolean, `e.detail.value`: String) |
