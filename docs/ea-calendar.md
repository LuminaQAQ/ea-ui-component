<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    // import('../index.js')
    import('../components/ea-calendar/index.js')
    import('./index.scss')

    document.querySelector('ea-calendar').addEventListener('select', (e) => {
        console.log(e.detail)
    })
})
</script>

# Calendar 日历

显示日期

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-calendar/index.js";
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

## 基本

<div class="demo">
    <ea-calendar></ea-calendar>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-calendar></ea-calendar>
</div>
```

`js` 通过在元素上添加 `select` 事件可以获取选中的日期信息

```js
const calendar = document.querySelector("ea-calendar");
calendar.addEventListener("select", (e) => {
  console.log(e.detail);
});
```

:::

## 自定义日期

通过设置 `date` 属性可以自定义日期

<div class="demo">
    <ea-calendar date="2024-5"></ea-calendar>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-calendar date="2024-5"></ea-calendar>
</div>
```

:::

## 自定义周起始日

通过设置 `week-start` 属性可以设置周起始日

<div class="demo">
    <ea-calendar date="2024-6" week-start="六"></ea-calendar>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-calendar date="2024-6" week-start="六"></ea-calendar>
</div>
```

:::

## Attributes

| 参数       | 说明     | 类型   | 可选值                                   | 默认值 |
| ---------- | -------- | ------ | ---------------------------------------- | ------ |
| date       | 指定日期 | String | -                                        | -      |
| week-start | 周起始日 | String | 周一，周二，周三，周四，周五，周六，周日 | 周一   |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称                     | 说明                                                    |
| ------------------------ | ------------------------------------------------------- |
| container                | 外层容器(包含`头部(header-wrap)`/`日历(calendar-wrap)`) |
| header-wrap              | 头部容器                                                |
| header-content           | 头部内容(顶部当前年月所在的容器)                        |
| header-changer           | 头部按钮(切换上一月/今天/下一月)                        |
| header-changer-lastMonth | 上一月按钮                                              |
| header-changer-today     | 今天按钮                                                |
| header-changer-nextMonth | 下一月按钮                                              |
| calendar-wrap            | 日历容器                                                |
| table                    | 日历本体                                                |
| table-head               | 日历表头                                                |
| table-head-row           | 日历表头行                                              |
| table-head-item          | 日历表头单元格                                          |
| table-body               | 日历日期                                                |
| table-body-row           | 日历日期行                                              |
| table-body-item          | 日历日期单元容器                                        |
| table-body-cell-content  | 日历日期单元格内容                                      |
| table-body-cell-today    | 日历日期单元格当前日                                    |
| table-body-cell-selected | 日历日期单元格选中元素                                  |
| table-body-cell-disabled | 日历日期单元格禁用元素                                  |
