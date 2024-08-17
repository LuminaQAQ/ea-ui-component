<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('./index.scss')
    
    import('../components/ea-icon/index.js')
    import('../components/ea-icon/index.css')
    
    import('../components/ea-date-picker/index.js')

    document.querySelector('ea-date-picker').addEventListener('change', (e) => {
        console.log(e.detail)
    })
})
</script>

# DatePicker 日期选择器

用于选择或输入日期

## 任意时间点

以「日」为基本单位，基础的日期选择控件

<div class="demo">
    <ea-date-picker placeholder="选择日期"></ea-date-picker>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-date-picker placeholder="选择日期"></ea-date-picker>
</div>
```

`js`: `change` 事件

```js
document.querySelector("ea-date-picker").addEventListener("change", (e) => {
  console.log(e.detail);
});
```

:::

## 禁用状态

通过设置 `disabled` 属性，可以禁用时间选择器

<div class="demo">
    <ea-date-picker placeholder="选择日期" value="2024-1-1" disabled></ea-date-picker>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-date-picker placeholder="选择日期" disabled></ea-date-picker>
</div>
```

:::

## 对齐方式

通过设置 `align` 属性，可以设置时间选择器的对齐方式

<div class="demo">
    <ea-date-picker placeholder="选择日期" align="center"></ea-date-picker>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-date-picker placeholder="选择日期" align="center"></ea-date-picker>
</div>
```

:::

## Attributes

| 参数              | 说明               | 类型    | 可选值            | 默认值 |
| ----------------- | ------------------ | ------- | ----------------- | ------ |
| name              | 输入框的 name 属性 | string  | -                 | -      |
| vaalue            | 初始值/当前值      | string  | -                 | -      |
| disabled          | 是否禁用           | boolean | -                 | false  |
| align             | 对齐方式           | string  | left/center/right | left   |

## Events

| 事件名称 | 说明         | 回调参数 |
| -------- | ------------ | -------- |
| change   | 值改变时触发 | e.detail |
