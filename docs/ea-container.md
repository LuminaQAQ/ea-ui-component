<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../dist/assets/icon.css');
    import('../dist/components/ea-container.js');
})
</script>

<style>
ea-header::part(container) {
    text-align: center;
    background-color: #b3c0d1;
}

ea-main::part(container) {
    text-align: center;
    background-color: #e9eef3;
    min-height: 20rem;
}

ea-footer::part(container) {
    text-align: center;
    background-color: #b3c0d1;
}

ea-aside::part(container) {
    background-color: #d3dce6;
    text-align: center;
}

hr {
    margin: 3rem 0;
}
</style>

# Container 布局容器

`<ea-container>`：外层容器。当子元素中包含 `<ea-header>` 或 `<ea-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<ea-header>`：顶栏容器。

`<ea-aside>`：侧边栏容器。

`<ea-main>`：主要区域容器。

`<ea-footer>`：底栏容器。

::: tip

以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<ea-container>` 的子元素只能是以上五个组件，后四个组件的父元素也只能是 `<ea-container>`。

:::

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-container.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-container";
```

:::

## 示例样式

:::: details 查看代码

::: code-group

```html [示例样式]
<style>
  ea-header::part(container) {
    text-align: center;
    background-color: #b3c0d1;
  }

  ea-main::part(container) {
    text-align: center;
    background-color: #e9eef3;
  }

  ea-footer::part(container) {
    text-align: center;
    background-color: #b3c0d1;
  }

  ea-aside::part(container) {
    background-color: #d3dce6;
    text-align: center;
  }
</style>
```

```html [页面样式]
<style>
  html,
  body {
    margin: 0;
    padding: 0;

    height: 100%;
    width: 100%;
  }
</style>
```

:::

::::

## 自定义样式

移步到 [CSS Part](#container-css-part)。

## 常见页面布局

<div class="demo">
  <ea-container style="height: 500px">
    <ea-header>Header</ea-header>
    <ea-main>Main</ea-main>
  </ea-container>
</div>

::: details 查看代码

```html
<ea-container style="height: 500px">
  <ea-header>Header</ea-header>
  <ea-main>Main</ea-main>
</ea-container>
```

:::

---

<div class="demo">
  <ea-container style="height: 500px">
    <ea-header>Header</ea-header>
    <ea-main>Main</ea-main>
    <ea-footer>Footer</ea-footer>
  </ea-container>
</div>

::: details 查看代码

```html
<ea-container style="height: 500px">
  <ea-header>Header</ea-header>
  <ea-main>Main</ea-main>
  <ea-footer>Footer</ea-footer>
</ea-container>
```

:::

---

<div class="demo">
  <ea-container style="height: 500px" direction="horizontal">
    <ea-aside width="150px">Aside</ea-aside>
    <ea-main>Main</ea-main>
    <ea-aside width="150px">Aside</ea-aside>
  </ea-container>
</div>

::: details 查看代码

```html
<ea-container style="height: 500px" direction="horizontal">
  <ea-aside width="150px">Aside</ea-aside>
  <ea-main>Main</ea-main>
  <ea-aside width="150px">Aside</ea-aside>
</ea-container>
```

:::

---

<div class="demo">
  <ea-container style="height: 500px">
    <ea-header>Header</ea-header>
    <ea-container direction="horizontal">
      <ea-aside width="200px">Aside</ea-aside>
      <ea-main>Main</ea-main>
    </ea-container>
  </ea-container>
</div>

::: details 查看代码

```html
<ea-container style="height: 500px">
  <ea-header>Header</ea-header>
  <ea-container direction="horizontal">
    <ea-aside width="200px">Aside</ea-aside>
    <ea-main>Main</ea-main>
  </ea-container>
</ea-container>
```

:::

---

<div class="demo">
  <ea-container style="height: 500px">
    <ea-header>Header</ea-header>
    <ea-container direction="horizontal">
      <ea-aside width="200px">Aside</ea-aside>
      <ea-container>
        <ea-main>Main</ea-main>
        <ea-footer>Footer</ea-footer>
      </ea-container>
    </ea-container>
  </ea-container>
</div>

::: details 查看代码

```html
<ea-container style="height: 500px">
  <ea-header>Header</ea-header>
  <ea-container direction="horizontal">
    <ea-aside width="200px">Aside</ea-aside>
    <ea-container>
      <ea-main>Main</ea-main>
      <ea-footer>Footer</ea-footer>
    </ea-container>
  </ea-container>
</ea-container>
```

:::

---

<div class="demo">
  <ea-container style="height: 500px" direction="horizontal">
    <ea-aside width="200px">Aside</ea-aside>
    <ea-container>
      <ea-header>Header</ea-header>
      <ea-main>Main</ea-main>
    </ea-container>
  </ea-container>
</div>

::: details 查看代码

```html
<ea-container style="height: 500px" direction="horizontal">
  <ea-aside width="200px">Aside</ea-aside>
  <ea-container>
    <ea-header>Header</ea-header>
    <ea-main>Main</ea-main>
  </ea-container>
</ea-container>
```

:::

---

<div class="demo">
  <ea-container style="height: 500px" direction="horizontal">
    <ea-aside width="200px">Aside</ea-aside>
    <ea-container>
      <ea-header>Header</ea-header>
      <ea-main>Main</ea-main>
      <ea-footer>Footer</ea-footer>
    </ea-container>
  </ea-container>
</div>

::: details 查看代码

```html
<ea-container style="height: 500px" direction="horizontal">
  <ea-aside width="200px">Aside</ea-aside>
  <ea-container>
    <ea-header>Header</ea-header>
    <ea-main>Main</ea-main>
    <ea-footer>Footer</ea-footer>
  </ea-container>
</ea-container>
```

:::

## Container API

### Container Attributes

| 参数      | 说明                                                                                          | 类型   | 可选值                   | 默认值     |
| --------- | --------------------------------------------------------------------------------------------- | ------ | ------------------------ | ---------- |
| direction | 布局方向。当子元素中包含 `ea-header` 或 `ea-footer` 时，会自动设置为 `vertical`，无需手动指定 | string | `horizontal`、`vertical` | horizontal |

### Container Slots

| 名称    | 说明                                                              |
| ------- | ----------------------------------------------------------------- |
| default | 默认插槽，用于放置 ea-header、ea-main、ea-footer、ea-aside 子组件 |

### Container CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 容器元素 |

### Container CSS Custom Properties

| 属性名                   | 说明     | 默认值 |
| ------------------------ | -------- | ------ |
| --ea-container-direction | 布局方向 | —      |

### Container Methods

| 方法名                   | 说明              | 参数 |
| ------------------------ | ----------------- | ---- |
| updateContainerClasslist | 更新容器 BEM 类名 | —    |

## Header API

### Header Attributes

| 参数   | 说明                                   | 类型     | 可选值 | 默认值 |
| ------ | -------------------------------------- | -------- | ------ | ------ |
| height | Header 的高度，支持任何 CSS 合法高度值 | `String` | —      | `60px` |

### Header Slots

| 名称    | 说明                       |
| ------- | -------------------------- |
| default | 默认插槽，用于放置顶栏内容 |

### Header CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 容器元素 |

### Header CSS Custom Properties

| 属性名              | 说明       | 默认值   |
| ------------------- | ---------- | -------- |
| --ea-header-height  | 顶栏高度   | `60px`   |
| --ea-header-padding | 顶栏内边距 | `0 20px` |

## Main API

### Main Slots

| 名称    | 说明                       |
| ------- | -------------------------- |
| default | 默认插槽，用于放置主要内容 |

### Main CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 容器元素 |

### Main CSS Custom Properties

| 属性名            | 说明         | 默认值   |
| ----------------- | ------------ | -------- |
| --ea-main-padding | 主区域内边距 | `0 20px` |

## Aside API

### Aside Attributes

| 参数  | 说明                                  | 类型     | 可选值 | 默认值  |
| ----- | ------------------------------------- | -------- | ------ | ------- |
| width | Aside 的宽度，支持任何 CSS 合法宽度值 | `String` | —      | `300px` |

### Aside Slots

| 名称    | 说明                         |
| ------- | ---------------------------- |
| default | 默认插槽，用于放置侧边栏内容 |

### Aside CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 容器元素 |

### Aside CSS Custom Properties

| 属性名           | 说明       | 默认值  |
| ---------------- | ---------- | ------- |
| --ea-aside-width | 侧边栏宽度 | `300px` |

## Footer API

### Footer Attributes

| 参数   | 说明                                   | 类型     | 可选值 | 默认值 |
| ------ | -------------------------------------- | -------- | ------ | ------ |
| height | Footer 的高度，支持任何 CSS 合法高度值 | `String` | —      | `60px` |

### Footer Slots

| 名称    | 说明                       |
| ------- | -------------------------- |
| default | 默认插槽，用于放置底栏内容 |

### Footer CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 容器元素 |

### Footer CSS Custom Properties

| 属性名              | 说明       | 默认值   |
| ------------------- | ---------- | -------- |
| --ea-footer-height  | 底栏高度   | `60px`   |
| --ea-footer-padding | 底栏内边距 | `0 20px` |
