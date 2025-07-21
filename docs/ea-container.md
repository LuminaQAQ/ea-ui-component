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

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-container/index.js";
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

## 示例样式

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
  }
</style>
```

```html [页面样式]
<style>
  body,
  html {
    height: 100%;
    width: 100%;
  }
</style>
```

:::

## 自定义样式

移步到 [CSS Part](#container-css-part)。

## 常见页面布局

<div class="demo">
  <ea-container>
    <ea-header>Header</ea-header>
    <ea-main>Main</ea-main>
  </ea-container>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-container>
    <ea-header>Header</ea-header>
    <ea-main>Main</ea-main>
  </ea-container>
</div>
```

:::

---

<div class="demo">
  <ea-container>
    <ea-header>Header</ea-header>
    <ea-main>Main</ea-main>
    <ea-footer>Footer</ea-footer>
  </ea-container>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-container>
    <ea-header>Header</ea-header>
    <ea-main>Main</ea-main>
    <ea-footer>Footer</ea-footer>
  </ea-container>
</div>
```

:::

---

<div class="demo">
  <ea-container>
    <ea-aside width="150px">Aside</ea-aside>
    <ea-main>Main</ea-main>
    <ea-aside width="150px">Aside</ea-aside>
  </ea-container>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-container>
    <ea-aside width="200px">Aside</ea-aside>
    <ea-main>Main</ea-main>
    <ea-aside width="200px">Aside</ea-aside>
  </ea-container>
</div>
```

:::

---

<div class="demo">
  <ea-container>
    <ea-header>Header</ea-header>
    <ea-container>
      <ea-aside width="200px">Aside</ea-aside>
      <ea-main>Main</ea-main>
    </ea-container>
  </ea-container>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-container>
    <ea-header>Header</ea-header>
    <ea-container>
      <ea-aside width="200px">Aside</ea-aside>
      <ea-main>Main</ea-main>
    </ea-container>
  </ea-container>
</div>
```

:::

---

<div class="demo">
  <ea-container>
    <ea-header>Header</ea-header>
    <ea-container>
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
<div class="demo">
  <ea-container>
    <ea-header>Header</ea-header>
    <ea-container>
      <ea-aside width="200px">Aside</ea-aside>
      <ea-container>
        <ea-main>Main</ea-main>
        <ea-footer>Footer</ea-footer>
      </ea-container>
    </ea-container>
  </ea-container>
</div>
```

:::

---

<div class="demo">
  <ea-container>
    <ea-aside width="200px">Aside</ea-aside>
    <ea-container>
      <ea-header>Header</ea-header>
      <ea-main>Main</ea-main>
    </ea-container>
  </ea-container>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-container>
    <ea-aside width="200px">Aside</ea-aside>
    <ea-container>
      <ea-header>Header</ea-header>
      <ea-main>Main</ea-main>
    </ea-container>
  </ea-container>
</div>
```

:::

---

<div class="demo">
  <ea-container>
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
<div class="demo">
  <ea-container>
    <ea-aside width="200px">Aside</ea-aside>
    <ea-container>
      <ea-header>Header</ea-header>
      <ea-main>Main</ea-main>
      <ea-footer>Footer</ea-footer>
    </ea-container>
  </ea-container>
</div>
```

:::

## 例子

<div class="demo" style="height: 500px;">
  <ea-container class="example" direction="vertical">
    <ea-aside width="200px">
      <ea-header>
        <p>header</p>
      </ea-header>
      <ea-main>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
      </ea-main>
      <ea-footer>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
      </ea-footer>
    </ea-aside>
    <ea-container>
      <ea-header>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
      </ea-header>
      <ea-main>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
      </ea-main>
      <ea-footer>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
      </ea-footer>
    </ea-container>
  </ea-container>
</div>

::: details 查看代码

```html
<div class="demo" style="height: 500px;">
  <ea-container class="example" direction="vertical">
    <ea-aside width="200px">
      <ea-header>
        <p>header</p>
      </ea-header>
      <ea-main>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
        <div>aside</div>
      </ea-main>
      <ea-footer>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
      </ea-footer>
    </ea-aside>
    <ea-container>
      <ea-header>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
        <p>header</p>
      </ea-header>
      <ea-main>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
        <p>main</p>
      </ea-main>
      <ea-footer>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
        <p>footer</p>
      </ea-footer>
    </ea-container>
  </ea-container>
</div>
```

:::

## Container Attributes

| 参数      | 说明     | 类型   | 可选值                   | 默认值     |
| --------- | -------- | ------ | ------------------------ | ---------- |
| direction | 布局模式 | string | `horizontal`、`vertical` | horizontal |

## Header Attributes

| 参数   | 说明                   | 类型     | 可选值 | 默认值 |
| ------ | ---------------------- | -------- | ------ | ------ |
| height | Header 的高度，单位 px | `String` | -      | `60px` |

## Aside Attributes

| 参数  | 说明                  | 类型     | 可选值 | 默认值  |
| ----- | --------------------- | -------- | ------ | ------- |
| width | Aside 的宽度，单位 px | `String` | -      | `300px` |

## Footer Attributes

| 参数   | 说明                   | 类型     | 可选值 | 默认值 |
| ------ | ---------------------- | -------- | ------ | ------ |
| height | Footer 的高度，单位 px | `String` | -      | `60px` |

## Container CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明 |
| --------- | ---- |
| container | 容器 |

## Header CSS Part

| 名称      | 说明 |
| --------- | ---- |
| container | 容器 |

## Aside CSS Part

| 名称      | 说明 |
| --------- | ---- |
| container | 容器 |

## Main CSS Part

| 名称      | 说明 |
| --------- | ---- |
| container | 容器 |

## Footer CSS Part

| 名称      | 说明 |
| --------- | ---- |
| container | 容器 |
