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

> 以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<ea-container>` 的子元素只能是以上五个组件，后四个组件的父元素也只能是 `<ea-container>`。

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

::: details 查看样式

```html
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

  /* 容器推荐类似以下的设置 */
  body,
  html {
    height: 100%;
    width: 100%;
  }
</style>
```

:::

```html
<style>
  /* 容器推荐类似以下的设置 */
  body,
  html {
    height: 100%;
    width: 100%;
  }
</style>
```

## 自定义样式

移步到 [CSS Part](#container-css-part)。

## 01. `Container` > (`Header` + `Main`) 布局。

<div class="demo">
    <ea-container>
        <ea-header>header</ea-header>
        <ea-main>01. 这是最简单的布局，只包含了 Header 和 Main 部分，没有 Footer。</ea-main>
    </ea-container>
</div>

::: details 查看代码

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

:::

## 02. `Container` > (`Header` + `Main` + `Footer`) 布局。

<div class="demo">
    <ea-container>
        <ea-header>header</ea-header>
        <ea-main>02. 这个示例在示例 1 的基础上增加了 Footer。</ea-main>
        <ea-footer>footer</ea-footer>
    </ea-container>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-container>
    <ea-header>header</ea-header>
    <ea-main>02. 这个示例在示例 1 的基础上增加了 Footer。</ea-main>
    <ea-footer>footer</ea-footer>
  </ea-container>
</div>
```

:::

## 03. `Container` > (`Aside` + `Main`) 布局。

<div class="demo">
    <ea-container direction="vertical">
        <ea-aside width="200">Aside</ea-aside>
        <ea-main> <p>03. 这个示例展示了带有侧边栏 (Aside) 和主内容区 (Main) 的布局。</p></ea-main>
    </ea-container>
</div>

::: details 查看代码

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

:::

## 04. `Container` > [`Header` + `Container` > (`Aside` + `Main`)] 布局。

<div class="demo">
    <ea-container direction="vertical">
        <ea-header>header</ea-header>
        <ea-container direction="vertical">
            <ea-aside width="200">Aside</ea-aside>
            <ea-main>04. 这个示例在 Header 下方嵌套了一个包含 Aside 和 Main 的 ea-container。</ea-main>
        </ea-container>
    </ea-container>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-container direction="vertical">
    <ea-header>header</ea-header>
    <ea-container direction="vertical">
      <ea-aside width="200">Aside</ea-aside>
      <ea-main
        >04. 这个示例在 Header 下方嵌套了一个包含 Aside 和 Main 的
        ea-container。</ea-main
      >
    </ea-container>
  </ea-container>
</div>
```

:::

## 05. `Container` > {`Header` + `Container` > [`Aside` + `Container` > (`Main` + `Footer`)]} 布局。

<div class="demo">
    <ea-container>
        <ea-header>header</ea-header>
        <ea-container direction="vertical">
            <ea-aside width="200">Aside</ea-aside>
            <ea-container>
                <ea-main>05. 这个示例进一步嵌套了一个 ea-container，内部包含了 Aside、Main 和 Footer。</ea-main>
                <ea-footer>Footer</ea-footer>
            </ea-container>
        </ea-container>
    </ea-container>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-container>
    <ea-header>header</ea-header>
    <ea-container direction="vertical">
      <ea-aside width="200">Aside</ea-aside>
      <ea-container>
        <ea-main
          >05. 这个示例进一步嵌套了一个 ea-container，内部包含了 Aside、Main 和
          Footer。</ea-main
        >
        <ea-footer>Footer</ea-footer>
      </ea-container>
    </ea-container>
  </ea-container>
</div>
```

:::

## 06. `Container` > [`Aside` + `Container` > (`Header` + `Main`) ] 布局。

<div class="demo">
    <ea-container direction="vertical">
        <ea-aside width="150">Aside</ea-aside>
        <ea-container direction="vertical">
            <ea-header>header</ea-header>
            <ea-main>06. 这个示例中，侧边栏 (Aside) 位于外层 ea-container 的左侧，内部 ea-container 包含了 Header 和 Main。</ea-main>
        </ea-container>
    </ea-container>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-container direction="vertical">
    <ea-aside width="150">Aside</ea-aside>
    <ea-container direction="vertical">
      <ea-header>header</ea-header>
      <ea-main
        >06. 这个示例中，侧边栏 (Aside) 位于外层 ea-container 的左侧，内部
        ea-container 包含了 Header 和 Main。</ea-main
      >
    </ea-container>
  </ea-container>
</div>
```

:::

## 07. `Container` > [`Aside` + `Container` > (`Header` + `Main` + `Footer`) ] 布局。

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

::: details 查看代码

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

:::

## 08. 类 `vitepress` 布局。

<div class="demo" style="height: 500px;">
  <ea-container direction="vertical">
      <ea-aside width="200">
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
  <ea-container direction="vertical">
    <ea-aside width="200">
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
