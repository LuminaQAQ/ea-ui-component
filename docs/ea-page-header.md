<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('./index.scss')
    
    import('../components/ea-icon/index.js')
    import('../components/ea-icon/index.css')
    import('../components/ea-page-header/index.js')

    const pageHeader = document.querySelector('#pageHeader');
    pageHeader.addEventListener('back', () => {
        console.log('go back');
    })
})
</script>

# PageHeader 页头

如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-page-header/index.js";
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

## 基础

<div class="demo">
    <ea-page-header id="pageHeader" content="详情页面"></ea-page-header>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-page-header id="pageHeader" content="详情页面"></ea-page-header>
</div>
```

`js`

```js
const pageHeader = document.querySelector("#pageHeader");
pageHeader.addEventListener("back", () => {
  console.log("go back");
});
```

:::

## Attributes

| 参数    | 说明         | 类型   | 可选值 | 默认值 |
| ------- | ------------ | ------ | ------ | ------ |
| title   | 返回按钮文字 | String | -      | 返回   |
| content | 页头内容     | String | -      | -      |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明                     |
| ------------ | ------------------------ |
| container    | 外层容器                 |
| title-wrap   | 标题容器(`title`属性)    |
| back-icon    | 返回图标                 |
| divider      | 分隔符                   |
| content-wrap | 内容容器 (`content`属性) |

## Events

| 事件名 | 说明     | 回调参数 |
| ------ | -------- | -------- |
| back   | 点击返回 | -        |

## Slots

| 名称    | 说明         |
| ------- | ------------ |
| title   | 返回按钮文字 |
| content | 内容         |
