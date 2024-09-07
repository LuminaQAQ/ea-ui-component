<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // import('../index.js')
  // import('../components/')
  import('./index.scss')

})
</script>

# InputNumber 计数器

仅允许输入标准的数字值，可定义范围

## 引入

> `js`

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-input-number/index.js";
</script>
```

## 基础用法

<div class="row left">
    <ea-input-number></ea-input-number>
</div>

```html
<div class="row left">
  <ea-input-number></ea-input-number>
</div>
```

## 禁用状态

<div class="row left">
    <ea-input-number disabled></ea-input-number>
</div>

```html
<div class="row left">
  <ea-input-number disabled></ea-input-number>
</div>
```

## 限制值

<div class="row left">
    <ea-input-number min="1" max="10"></ea-input-number>
</div>

```html
<div class="row left">
  <ea-input-number min="1" max="10"></ea-input-number>
</div>
```

## 步数

<div class="row left">
    <ea-input-number step="2"></ea-input-number>
</div>

```html
<div class="row left">
  <ea-input-number step="2"></ea-input-number>
</div>
```

## 严格步数

<div class="row left">
  <ea-input-number step="3" step-strictly></ea-input-number>
</div>

```html
<div class="row left">
  <ea-input-number step="3" step-strictly></ea-input-number>
</div>
```

## 精度

> precision 的值必须是一个非负整数，并且不能小于 step 的小数位数。

<div class="row left">
  <ea-input-number value="1" step="0.1" precision="1"></ea-input-number>
  <ea-input-number value="1" step="0.01" precision="2"></ea-input-number>
</div>

```html
<div class="row left">
  <ea-input-number value="1" step="0.1" precision="1"></ea-input-number>
  <ea-input-number value="1" step="0.01" precision="2"></ea-input-number>
</div>
```

## 尺寸

额外提供了 medium、small、mini 三种尺寸的数字输入框

<div class="row left">
  <ea-input-number></ea-input-number>
  <ea-input-number size="medium"></ea-input-number>
  <ea-input-number size="small"></ea-input-number>
  <ea-input-number size="mini"></ea-input-number>
</div>

```html
<div class="row left">
  <ea-input-number></ea-input-number>
  <ea-input-number size="medium"></ea-input-number>
  <ea-input-number size="small"></ea-input-number>
  <ea-input-number size="mini"></ea-input-number>
</div>
```

## Attributes

| 参数          | 说明                                                    | 类型    | 可选值                | 默认值    |
| ------------- | ------------------------------------------------------- | ------- | --------------------- | --------- |
| value         | 默认值                                                  | number  | —                     | 0         |
| disabled      | 是否禁用计数器                                          | boolean | —                     | false     |
| step          | 计数器步长                                              | number  | —                     | 1         |
| step-strictly | 是否只能输入 step 的倍数                                | boolean | —                     | false     |
| min/max       | 设置计数器允许的最小值/最大值                           | number  | —                     | ±Infinity |
| precision     | 设置计数器数值精度，需要 step-strictly 为 true 时才生效 | number  | —                     | 0         |
| size          | 计数器尺寸                                              | string  | medium / small / mini | medium    |

## Events

| 事件名称 | 说明                         | 回调参数       |
| -------- | ---------------------------- | -------------- |
| change   | 当输入框的值改变时触发的事件 | (event: Event) |
| blur     | 当 input 失去焦点时触发      | (event: Event) |
| focus    | 当 input 获得焦点时触发      | (event: Event) |
