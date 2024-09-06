<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../components/ea-empty/index.js')
    import('../components/ea-button/index.js')

    import('./index.scss')
})
</script>

# Empty 空状态

空状态时的占位提示。

## 引入

> `js`

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-empty/index.js";
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

## 基础用法

通过设置 `description` 属性来配置描述文字。

<div class="demo">
    <ea-empty description="描述文字"></ea-empty>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-empty description="描述文字"></ea-empty>
</div>
```

:::

## 自定义图片

通过设置 `image` 属性传入图片 URL。

<div class="demo">
    <ea-empty image="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"></ea-empty>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-empty
    image="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-empty>
</div>
```

:::

## 图片尺寸

通过设置 `image-size` 属性来控制图片大小。

<div class="row">
    <ea-empty image-size="100" image="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"></ea-empty>
    <ea-empty image-size="100"></ea-empty>
</div>

::: details 查看代码

```html
<div class="row">
  <ea-empty
    image-size="100"
    image="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-empty>
  <ea-empty image-size="100"></ea-empty>
</div>
```

:::

## 底部内容

使用默认插槽可在底部插入内容。

<div class="demo">
  <ea-empty>
    <ea-button type="primary">刷新</ea-button>
  </ea-empty>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-empty>
    <ea-button type="primary">刷新</ea-button>
  </ea-empty>
</div>
```

:::

## Attributes

| 参数        | 说明     | 类型   | 可选值 | 默认值 |
| ----------- | -------- | ------ | ------ | ------ |
| description | 描述     | string | -      | -      |
| image       | 图片     | string | -      | -      |
| image-size  | 图片大小 | number | -      | 80     |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称             | 说明                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------- |
| container        | 外层容器, 包含 图片容器`image-wrap`、描述容器`description-wrap`和底部容器`bottom-wrap` |
| image-wrap       | 图片容器                                                                               |
| description-wrap | 描述容器                                                                               |
| bottom-wrap      | 底部容器                                                                               |

## Slots

| 名称    | 说明                 |
| ------- | -------------------- |
| default | 底部内容(非具名插槽) |
