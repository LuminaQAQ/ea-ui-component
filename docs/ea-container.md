<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('./index.scss')

    import('../components/ea-container/index.js')
    import('../components/ea-header/index.js')
    import('../components/ea-footer/index.js')
    import('../components/ea-aside/index.js')
    import('../components/ea-main/index.js')
})
</script>

<style>
ea-header::part(wrap),
ea-main::part(wrap),
ea-footer::part(wrap),
ea-aside::part(wrap) {
    display: flex;
    align-items: center;
    justify-content: center;
}

ea-header::part(wrap) {
    text-align: center;
    background-color: #b3c0d1;
}

ea-main::part(wrap) {
    text-align: center;
    background-color: #e9eef3;
    min-height: 20rem;
}

ea-footer::part(wrap) {
    text-align: center;
    background-color: #b3c0d1;
}

ea-aside::part(wrap) {
    background-color: #d3dce6;
    text-align: center;
}

hr {
    margin: 3rem 0;
}
</style>

# Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

`<ea-container>`：外层容器。当子元素中包含 `<ea-header>` 或 `<ea-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<ea-header>`：顶栏容器。

`<ea-aside>`：侧边栏容器。

`<ea-main>`：主要区域容器。

`<ea-footer>`：底栏容器。

> 以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<el-container>` 的子元素只能是以上五个组件，后四个组件的父元素也只能是 `<el-container>`。

## 引入

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-container/index.js";
  import "./node_modules/easy-component-ui/components/ea-header/index.js";
  import "./node_modules/easy-component-ui/components/ea-footer/index.js";
  import "./node_modules/easy-component-ui/components/ea-aside/index.js";
  import "./node_modules/easy-component-ui/components/ea-main/index.js";
</script>
```

## 示例样式

```html
<style>
  ea-header::part(wrap),
  ea-main::part(wrap),
  ea-footer::part(wrap),
  ea-aside::part(wrap) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ea-header::part(wrap) {
    text-align: center;
    background-color: #b3c0d1;
  }

  ea-main::part(wrap) {
    text-align: center;
    background-color: #e9eef3;
    min-height: 20rem;
  }

  ea-footer::part(wrap) {
    text-align: center;
    background-color: #b3c0d1;
  }

  ea-aside::part(wrap) {
    background-color: #d3dce6;
    text-align: center;
  }

  hr {
    margin: 3rem 0;
  }
</style>
```

## 01. 只包含 `Header` 和 `Main` 部分。

<div class="demo">
    <ea-container>
        <ea-header>header</ea-header>
        <ea-main>01. 这是最简单的布局，只包含了 Header 和 Main 部分，没有 Footer。</ea-main>
    </ea-container>
</div>

```html
<div class="demo">
  <ea-container>
    <ea-header>header</ea-header>
    <ea-main
      >01. 这是最简单的布局，只包含了 Header 和 Main 部分，没有
      Footer。</ea-main
    >
  </ea-container>
</div>
```

## 02. 在示例 1 的基础上增加了 Footer。

<div class="demo">
    <ea-container>
        <ea-header>header</ea-header>
        <ea-main>02. 这个示例在示例 1 的基础上增加了 Footer。</ea-main>
        <ea-footer>footer</ea-footer>
    </ea-container>
</div>

```html
<div class="demo">
  <ea-container>
    <ea-header>header</ea-header>
    <ea-main>02. 这个示例在示例 1 的基础上增加了 Footer。</ea-main>
    <ea-footer>footer</ea-footer>
  </ea-container>
</div>
```

## 03. 带有侧边栏 (Aside) 和主内容区 (Main) 的布局。

<div class="demo">
    <ea-container direction="vertical">
        <ea-aside width="200">Aside</ea-aside>
        <ea-main> <p>03. 这个示例展示了带有侧边栏 (Aside) 和主内容区 (Main) 的布局。</p></ea-main>
    </ea-container>
</div>

```html
<div class="demo">
  <ea-container direction="vertical">
    <ea-aside width="200">Aside</ea-aside>
    <ea-main>
      <p>
        03. 这个示例展示了带有侧边栏 (Aside) 和主内容区 (Main) 的布局。
      </p></ea-main
    >
  </ea-container>
</div>
```

## 04. 在 Header 下方嵌套了一个包含 Aside 和 Main 的 el-container。

<div class="demo">
    <ea-container direction="vertical">
        <ea-header>header</ea-header>
        <ea-container direction="vertical">
            <ea-aside width="200">Aside</ea-aside>
            <ea-main>04. 这个示例在 Header 下方嵌套了一个包含 Aside 和 Main 的 el-container。</ea-main>
        </ea-container>
    </ea-container>
</div>

```html
<div class="demo">
  <ea-container direction="vertical">
    <ea-header>header</ea-header>
    <ea-container direction="vertical">
      <ea-aside width="200">Aside</ea-aside>
      <ea-main
        >04. 这个示例在 Header 下方嵌套了一个包含 Aside 和 Main 的
        el-container。</ea-main
      >
    </ea-container>
  </ea-container>
</div>
```

## 05. 进一步嵌套了一个 el-container，内部包含了 Aside、Main 和 Footer

<div class="demo">
    <ea-container>
        <ea-header>header</ea-header>
        <ea-container direction="vertical">
            <ea-aside width="200">Aside</ea-aside>
            <ea-container>
                <ea-main>05. 这个示例进一步嵌套了一个 el-container，内部包含了 Aside、Main 和 Footer。</ea-main>
                <ea-footer>Footer</ea-footer>
            </ea-container>
        </ea-container>
    </ea-container>
</div>

```html
<div class="demo">
  <ea-container>
    <ea-header>header</ea-header>
    <ea-container direction="vertical">
      <ea-aside width="200">Aside</ea-aside>
      <ea-container>
        <ea-main
          >05. 这个示例进一步嵌套了一个 el-container，内部包含了 Aside、Main 和
          Footer。</ea-main
        >
        <ea-footer>Footer</ea-footer>
      </ea-container>
    </ea-container>
  </ea-container>
</div>
```

## 06. 侧边栏 (Aside) 位于外层 el-container 的左侧，内部 el-container 包含了 Header 和 Main。

<div class="demo">
    <ea-container direction="vertical">
        <ea-aside width="150">Aside</ea-aside>
        <ea-container direction="vertical">
            <ea-header>header</ea-header>
            <ea-main>06. 这个示例中，侧边栏 (Aside) 位于外层 el-container 的左侧，内部 el-container 包含了 Header 和 Main。</ea-main>
        </ea-container>
    </ea-container>
</div>

```html
<div class="demo">
  <ea-container direction="vertical">
    <ea-aside width="150">Aside</ea-aside>
    <ea-container direction="vertical">
      <ea-header>header</ea-header>
      <ea-main
        >06. 这个示例中，侧边栏 (Aside) 位于外层 el-container 的左侧，内部
        el-container 包含了 Header 和 Main。</ea-main
      >
    </ea-container>
  </ea-container>
</div>
```

## 07. 在 6 的基础上增加了一个 Footer。

<div class="demo">
    <ea-container direction="vertical">
        <ea-aside width="200">Aside</ea-aside>
        <ea-container>
            <ea-header>Header</ea-header>
            <ea-main>07. 最后一个示例与示例 6 类似，不过增加了一个 Footer。</ea-main>
            <ea-footer>Footer</ea-footer>
        </ea-container>
    </ea-container>
</div>

```html
<div class="demo">
  <ea-container direction="vertical">
    <ea-aside width="200">Aside</ea-aside>
    <ea-container>
      <ea-header>Header</ea-header>
      <ea-main>07. 最后一个示例与示例 6 类似，不过增加了一个 Footer。</ea-main>
      <ea-footer>Footer</ea-footer>
    </ea-container>
  </ea-container>
</div>
```

## Container Attributes

| 参数      | 说明                                        | 类型   | 可选值                | 默认值     |
| --------- | ------------------------------------------- | ------ | --------------------- | ---------- |
| direction | 布局模式，可选值为 `horizontal`、`vertical` | string | horizontal / vertical | horizontal |

## Header Attributes

| 参数   | 说明                   | 类型   | 可选值 | 默认值 |
| ------ | ---------------------- | ------ | ------ | ------ |
| height | Header 的高度，单位 px | number | -      | 60     |

## Aside Attributes

| 参数  | 说明                  | 类型   | 可选值 | 默认值 |
| ----- | --------------------- | ------ | ------ | ------ |
| width | Aside 的宽度，单位 px | number | -      | 200    |

## Footer Attributes

| 参数   | 说明                   | 类型   | 可选值 | 默认值 |
| ------ | ---------------------- | ------ | ------ | ------ |
| height | Footer 的高度，单位 px | number | -      | 60     |
