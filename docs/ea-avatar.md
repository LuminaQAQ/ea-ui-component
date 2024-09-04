<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')

    document.querySelector('#error').addEventListener('error', (e) => {
        console.log(e)
    })
})
</script>

# Avatar 头像

用图标、图片或者字符的形式展示用户或事物信息。

## 引入

> `js`

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-avatar/index.js";
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

通过 `shape` 和 `size` 设置头像的形状和大小。

> `size` 默认为 `normal`, 可选 `large`、`medium`、`small`。

<div class="row">
    <ea-avatar src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"></ea-avatar>
    <ea-avatar size="large" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"></ea-avatar>
    <ea-avatar size="medium" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"></ea-avatar>
    <ea-avatar size="small" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"></ea-avatar>
</div>

<div class="row">
    <ea-avatar shape="square" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain" ></ea-avatar>
    <ea-avatar shape="square" size="large" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain" ></ea-avatar>
    <ea-avatar shape="square" size="medium" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"  ></ea-avatar>
    <ea-avatar shape="square" size="small" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"  ></ea-avatar>
</div>

::: details 查看代码 | `shape` 属性为 `circle`

```html
<div class="row">
  <ea-avatar
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    size="large"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    size="medium"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    size="small"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
</div>
```

:::

::: details 查看代码 | `shape` 属性为 `square`

```html
<div class="row">
  <ea-avatar
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    shape="square"
    size="large"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    shape="square"
    size="medium"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    shape="square"
    size="small"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
</div>
```

:::

## 展示类型

支持三种类型：图标`icon`、图片`src`和字符

<div class="row">
    <ea-avatar icon="icon-coffee"></ea-avatar>
    <ea-avatar src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"></ea-avatar>
    <ea-avatar>user</ea-avatar>
</div>

::: details 示例代码

```html
<div class="row">
  <ea-avatar icon="icon-coffee"></ea-avatar>
  <ea-avatar
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar>user</ea-avatar>
</div>
```

:::

## 图片加载失败的 fallback 行为

当展示类型为图片的时候，图片加载失败的 `fallback` 行为。可以在元素上添加 `error` 事件来进行后续操作。

<div class="row left">
    <ea-avatar id="error" src="./1.png"  ></ea-avatar>
</div>

::: details 查看代码

`html`

```html
<div class="row left">
  <ea-avatar id="error" src="./1.png"></ea-avatar>
</div>
```

`js`: `error` 事件

```js
const avatar = document.querySelector("#error");
avatar.addEventListener("error", (e) => {
  console.log(e);
});
```

:::

## 图片如何适应容器框

当展示类型为图片的时候，使用 `fit` 属性定义图片如何适应容器框，同原生 [MDN: object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)。

<div class="row">
    <ea-avatar fit="fill" shape="square"
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"></ea-avatar>
    <ea-avatar fit="contain" shape="square"
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"></ea-avatar>
    <ea-avatar fit="cover" shape="square"
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"></ea-avatar>
    <ea-avatar fit="none" shape="square"
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"></ea-avatar>
    <ea-avatar fit="scale-down" shape="square"
        src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"></ea-avatar>
</div>

::: details 查看代码

```html
<div class="row">
  <ea-avatar
    fit="fill"
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    fit="contain"
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    fit="cover"
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    fit="none"
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    fit="scale-down"
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
</div>
```

:::

## Attributes

| 参数  | 说明 | 类型   | 可选值                          | 默认值 |
| ----- | ---- | ------ | ------------------------------- | ------ |
| size  | 尺寸 | string | normal / large / medium / small | normal |
| src   | 图片 | string | -                               | -      |
| shape | 形状 | string | circle / square                 | circle |
| icon  | 图标 | string | -                               | -      |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明                                               |
| --------- | -------------------------------------------------- |
| container | avatar 外层容器                                    |
| avatar    | 图片外层容器(适用于类型为 `icon` 与 `字符` 的情况) |

## Event

| 事件名 | 说明         | 回调参数 |
| ------ | ------------ | -------- |
| error  | 图片加载失败 | -        |
