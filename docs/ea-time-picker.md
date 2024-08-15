<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('./index.scss')
    
    import('../components/ea-icon/index.js')
    import('../components/ea-icon/index.css')
    
    import('../components/ea-time-picker/index.js')

    
    const basicTimePicker = document.querySelector('#basicTimePicker');
    basicTimePicker.addEventListener('change', (e) => {
        console.log(e.detail);
    });
})
</script>

# TimePicker 时间选择器

用于选择或输入时间

## 任意时间点

可以选择任意时间

<div class="demo">
    <ea-time-picker id="basicTimePicker" time="11:11:11"></ea-time-picker>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-time-picker id="basicTimePicker" time="11:11:11"></ea-time-picker>
</div>
```

`js`: `change` 事件

```js
const basicTimePicker = document.querySelector("#basicTimePicker");
basicTimePicker.addEventListener("change", (e) => {
  console.log(e.detail);
});
```

:::

## 禁用状态

通过设置 `disabled` 属性，可以禁用时间选择器

<div class="demo">
    <ea-time-picker time="8:0:0" disabled></ea-time-picker>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-time-picker time="8:0:0" disabled></ea-time-picker>
</div>
```

:::

## 对齐方式

通过设置 `align` 属性，可以设置时间选择器的对齐方式

<div class="demo">
    <ea-time-picker time="8:0:0" align="center"></ea-time-picker>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-time-picker time="8:0:0" align="center"></ea-time-picker>
</div>
```

:::

## 固定时间范围

通过设置 `limit-range-start` 和 `limit-range-end` 属性，可以设置时间选择器的最小值和最大值

<div class="demo">
    <ea-time-picker limit-range-start="3:0:0" limit-range-end="3:10:0"></ea-time-picker>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-time-picker
    limit-range-start="3:0:0"
    limit-range-end="3:10:0"
  ></ea-time-picker>
</div>
```

:::

## Attributes

| 参数              | 说明               | 类型    | 可选值            | 默认值 |
| ----------------- | ------------------ | ------- | ----------------- | ------ |
| name              | 输入框的 name 属性 | string  | -                 | -      |
| time              | 初始值/当前值      | string  | -                 | -      |
| disabled          | 是否禁用           | boolean | -                 | false  |
| align             | 对齐方式           | string  | left/center/right | left   |
| limit-range-start | 固定时间范围开始值 | string  | -                 | -      |
| limit-range-end   | 固定时间范围结束值 | string  | -                 | -      |

## Events

| 事件名称 | 说明         | 回调参数 |
| -------- | ------------ | -------- |
| change   | 值改变时触发 | e.detail |
