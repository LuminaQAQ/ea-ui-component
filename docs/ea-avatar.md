<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('../dist/components/index.js')
  import('../dist/assets/icon.css')
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
如果使用到图标（通过 `icon` 属性），请提前使用 `link` 标签引入图标样式文件
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 基本用法

使用 `shape`（`circle` | `square`）和 `size` 控制头像的形状与大小。`size` 支持预设字符串或像素值。

示例：

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

支持三种展示类型：图标（`icon`）、图片（`src`）和字符（slot）。

示例：

<div class="demo">
  <div class="row">
    <ea-avatar icon="icon-coffee"></ea-avatar>
    <ea-avatar
      src="https://tse2-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain"
    ></ea-avatar>
    <ea-avatar>user</ea-avatar>
  </div>
</div>

::: details 查看代码

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

## 图片加载失败的回退（fallback）

当 `src` 指定的图片加载失败时，组件会触发 `error` 事件。你可以监听该事件来替换图片、显示文本或其它占位内容。

示例（HTML + JS）：

<div class="demo">
  <div class="row">
    <ea-avatar id="error" size="60px" src="https://empty"></ea-avatar>
    <ea-avatar id="error-with-text" size="60px" src="https://empty">error text</ea-avatar>
  </div>
</div>

::: details 查看代码

```html
<div class="row">
  <ea-avatar id="error" size="60px" src="https://empty"></ea-avatar>
  <ea-avatar id="error-with-text" size="60px" src="https://empty"
    >error text</ea-avatar
  >
</div>

<script type="module">
  import "../src/components/ea-avatar/index.js";

  const avatar = document.querySelector("#error");
  avatar.addEventListener("error", e => {
    console.log("avatar load error", e);
    // 例如：avatar.removeAttribute('src') 或 avatar.textContent = 'U'
  });
</script>
```

:::

## 图片如何适应容器（fit）

使用 `fit` 属性控制图片的 object-fit 行为，支持：`fill` / `contain` / `cover` / `none` / `scale-down`。

示例：

<div class="demo">
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

## Attributes

| **参数** | **说明**     | **类型** | **可选值**                                           | **默认值** |
| -------- | ------------ | -------- | ---------------------------------------------------- | ---------- |
| size     | 尺寸         | `string` | `large` / `default` / `small` / 像素值（如 `50px`）  | `default`  |
| src      | 图片地址     | `string` | —                                                    | —          |
| shape    | 形状         | `string` | `circle` / `square`                                  | `circle`   |
| icon     | 图标类名     | `string` | —                                                    | —          |
| fit      | 图片适应方式 | `string` | `fill` / `contain` / `cover` / `none` / `scale-down` | `cover`    |

## Events

| 事件名 | 说明         | 回调参数 |
| ------ | ------------ | -------- |
| error  | 图片加载失败 | `Event`  |

示例：

```js
const avatar = document.querySelector("#error");
avatar.addEventListener("error", e => {
  console.log(e);
});
```

## CSS Part

组件暴露的 `part`，可通过 `::part` 自定义样式：

| 名称      | 说明                    |
| --------- | ----------------------- |
| container | avatar 外层容器         |
| avatar    | 图片/图标/文本 外层容器 |

示例：

```css
ea-avatar::part(container) {
  border: 1px solid #eee;
}
ea-avatar::part(avatar) {
  background-color: #fafafa;
}
```

## 参考

- MDN: object-fit（用于理解 `fit` 属性）https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit
