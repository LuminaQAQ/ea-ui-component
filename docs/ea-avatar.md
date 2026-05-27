<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../dist/components/index.js')
  import('../dist/assets/icon.css')


  const avatar = document.querySelector("#error");
  avatar.addEventListener("error", e => {
    console.log("avatar load error", e);
  });
})
</script>

# Avatar 头像

以图标、图片或字符的形式展示用户或实体的标识信息。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-avatar/index.js";
</script>
```

> `css`

::: tip
如果需要使用带有图标的属性，需要提前引入图标样式文件。
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 自定义样式

移步到 [CSS Part](#avatar-css-part) 和 [CSS 自定义属性](#avatar-css-自定义属性)。

## 基本用法

使用 `shape`（`circle` | `square`）和 `size` 控制头像的形状与大小。`size` 支持预设字符串或像素值。

<div class="demo">
  <div class="row">
    <ea-avatar size="50px"></ea-avatar>
    <ea-avatar size="large"></ea-avatar>
    <ea-avatar size="default"></ea-avatar>
    <ea-avatar size="small"></ea-avatar>
  </div>
  <div class="row">
    <ea-avatar shape="square" size="50px"></ea-avatar>
    <ea-avatar shape="square" size="large"></ea-avatar>
    <ea-avatar shape="square" size="default"></ea-avatar>
    <ea-avatar shape="square" size="small"></ea-avatar>
  </div>
</div>

::: details 查看代码

```html
<div class="row">
  <ea-avatar size="50px"></ea-avatar>
  <ea-avatar size="large"></ea-avatar>
  <ea-avatar size="default"></ea-avatar>
  <ea-avatar size="small"></ea-avatar>
</div>

<div class="row">
  <ea-avatar shape="square" size="50px"></ea-avatar>
  <ea-avatar shape="square" size="large"></ea-avatar>
  <ea-avatar shape="square" size="default"></ea-avatar>
  <ea-avatar shape="square" size="small"></ea-avatar>
</div>
```

:::

## 展示类型

支持三种展示类型：图标（`icon`）、图片（`src`）和字符（slot）。当 `src` 和 `icon` 同时设置时，`src` 优先。

<div class="demo">
  <div class="row">
    <ea-avatar icon="coffee"></ea-avatar>
    <ea-avatar
      src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
    ></ea-avatar>
    <ea-avatar>user</ea-avatar>
  </div>
</div>

```html
<div class="row">
  <ea-avatar icon="coffee"></ea-avatar>
  <ea-avatar
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar>user</ea-avatar>
</div>
```

## 图片加载失败的回退（fallback）

当 `src` 指定的图片加载失败时，组件会触发 `error` 事件并显示错误占位图。你可以监听该事件来替换图片、显示文本或其它占位内容。

清空 `src` 属性时，组件会自动回退到 `icon`（如果已设置）或默认 slot 内容。

<div class="demo">
  <div class="row">
    <ea-avatar id="error" size="60px" src="https://empty"></ea-avatar>
    <ea-avatar id="error-with-text" size="60px" src="https://empty">error text</ea-avatar>
  </div>
</div>

::: code-group

```html
<div class="row">
  <ea-avatar id="error" size="60px" src="https://empty"></ea-avatar>
  <ea-avatar id="error-with-text" size="60px" src="https://empty"
    >error text</ea-avatar
  >
</div>
```

```js
const avatar = document.querySelector("#error");
avatar.addEventListener("error", e => {
  console.log("avatar load error", e);
});
```

:::

## 适应容器

使用 `fit` 属性控制图片的 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit) 行为，支持：`fill` / `contain` / `cover` / `none` / `scale-down`。

<div class="demo row">
  <ea-avatar
    size="100px"
    fit="fill"
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    size="100px"
    fit="contain"
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    size="100px"
    fit="cover"
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    size="100px"
    fit="none"
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    size="100px"
    fit="scale-down"
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
</div>

::: details 查看代码

```html
<div class="row">
  <ea-avatar
    size="100px"
    fit="fill"
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    size="100px"
    fit="contain"
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    size="100px"
    fit="cover"
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    size="100px"
    fit="none"
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
  <ea-avatar
    size="100px"
    fit="scale-down"
    shape="square"
    src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
  ></ea-avatar>
</div>
```

:::

## Avatar API

### Avatar Attributes

| 参数    | 说明         | 类型   | 可选值                                                   | 默认值  |
| ------- | ------------ | ------ | -------------------------------------------------------- | ------- |
| icon    | 图标类名     | string | —                                                        | —       |
| size    | 尺寸         | string | `large` \| `default` \| `small` \| 像素值                | default |
| shape   | 形状         | string | `circle` \| `square`                                     | circle  |
| src     | 图片地址     | string | —                                                        | —       |
| src-set | 图片地址集   | string | —                                                        | —       |
| alt     | 替代文本     | string | —                                                        | —       |
| fit     | 图片适应方式 | string | `fill` \| `contain` \| `cover` \| `none` \| `scale-down` | cover   |

### Avatar Events

| 事件名 | 说明               | 回调参数(event.detail) |
| ------ | ------------------ | ---------------------- |
| error  | 图片加载失败时触发 | —                      |

### Avatar CSS Part

| 名称        | 说明     |
| ----------- | -------- |
| container   | 容器元素 |
| img-avatar  | 图片元素 |
| icon-avatar | 图标元素 |

### Avatar Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |

### Avatar CSS 自定义属性

| 属性名                           | 说明         |
| -------------------------------- | ------------ |
| --ea-avatar-size                 | 头像尺寸     |
| --ea-avatar-square-border-radius | 方形圆角     |
| --ea-avatar-circle-border-radius | 圆形圆角     |
| --ea-avatar-fit                  | 图片适应方式 |
| --ea-avatar-color                | 文字颜色     |
| --ea-avatar-font-size            | 字体大小     |
| --ea-avatar-background-color     | 背景颜色     |
