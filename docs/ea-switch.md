<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../index.js')
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

## 基本用法

<div class="row">
  <ea-switch></ea-switch>
  <ea-switch inactive-text="按年付费" active-text="按月付费"></ea-switch>
</div>

```html
<div class="row">
  <ea-switch></ea-switch>
  <ea-switch inactive-text="按年付费" active-text="按月付费"></ea-switch>
</div>
```

## 默认选中状态

<div class="row">
  <ea-switch checked></ea-switch>
  <ea-switch inactive-text="按年付费" active-text="按月付费" checked></ea-switch>
</div>

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

## 禁用状态

<div class="row">
  <ea-switch disabled></ea-switch>
  <ea-switch inactive-text="按年付费" active-text="按月付费" checked disabled></ea-switch>
</div>

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

## 指定背景色

<div class="row">
  <ea-switch inactive-color="#ff4949" active-color="#13ce66"></ea-switch>
  <ea-switch inactive-color="#ff4949" active-color="#13ce66" inactive-text="按年付费" active-text="按月付费" checked></ea-switch>
</div>

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

## change 事件

<div class="row left">
  <ea-switch inactive-text="按年付费" active-text="按月付费" id="switch"></ea-switch>
</div>

```js
// 选中情况: e.detail.checked
// 选中值: e.detail.value

document.querySelector("#switch").addEventListener("change", function (e) {
  console.log(e.detail.checked, e.detail.value);
});
```

## Attributes

| 参数           | 说明             | 类型    | 可选值 | 默认值                                                                       |
| -------------- | ---------------- | ------- | ------ | ---------------------------------------------------------------------------- |
| checked        | 是否选中         | Boolean | -      | false                                                                        |
| disabled       | 是否禁用         | Boolean | -      | false                                                                        |
| active-color   | 选中时的背景色   | String  | -      | <span class="color-picker" style="background-color: #409eff;"></span>#1989fa |
| inactive-color | 未选中时的背景色 | String  | -      | <span class="color-picker" style="background-color: #dcdfe6;"></span>#dcdfe6 |
| active-text    | 选中时的文字     | String  | -      | -                                                                            |
| inactive-text  | 未选中时的文字   | String  | -      | -                                                                            |

## Events

| 事件名 | 说明               | 回调参数                                            |
| ------ | ------------------ | --------------------------------------------------- |
| change | 状态发生变化时触发 | (e.detail.checked: Boolean, e.detail.value: String) |
