<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('./index.scss')
    
    import('../components/ea-icon/index.js')
    import('../components/ea-icon/index.css')
    
    import('../components/ea-date-picker/index.js')

    // document.querySelector('ea-date-picker').addEventListener('change', (e) => {
    //     console.log(e.detail)
    // })
})
</script>

# DatePicker 日期选择器

用于选择或输入日期

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-date-picker/index.js";
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

| 参数     | 说明               | 类型    | 可选值            | 默认值 |
| -------- | ------------------ | ------- | ----------------- | ------ |
| name     | 输入框的 name 属性 | string  | -                 | -      |
| vaalue   | 初始值/当前值      | string  | -                 | -      |
| disabled | 是否禁用           | boolean | -                 | false  |
| align    | 对齐方式           | string  | left/center/right | left   |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称          | 说明                                                                |
| ------------- | ------------------------------------------------------------------- |
| container     | 外层容器(包含 输入框容器`input-wrap`和 下拉菜单容器`dropdown-wrap`) |
| input-wrap    | 输入框容器(包含 `input`)                                            |
| input         | 输入框                                                              |
| dropdown-wrap | 下拉菜单容器(包含`calendar`)                                        |
| calendar      | 日历                                                                |

## Events

| 事件名称 | 说明         | 回调参数 |
| -------- | ------------ | -------- |
| change   | 值改变时触发 | e.detail |
