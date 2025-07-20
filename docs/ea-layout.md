<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")
})
</script>

<style>
ea-button::part(container) {
    width: 100%;
}

.row-container {
    margin: 0.5rem 0;
    padding: .5rem;

    background-color: #f9fafc;
}
</style>

# Layout 布局

通过基础的 24 分栏，迅速简便地创建布局。

:::tip
组件默认使用 `Flex` 布局，不需要手动设置 `type="flex"`。

请注意父容器避免使用 `inline` 相关样式，会导致组件宽度不能撑满。

列的基本单位为`1`，最多`24`个，最少`0`个。

:::

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-button/index.js";
  import "./node_modules/easy-component-ui/components/ea-button-group/index.js"; // 需要使用按钮组时才需引入
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

## 基础布局 ​

使用列创建基础网格布局。

通过 `row` 和 `col` 组件，并通过 `col` 组件的 `span` 属性我们就可以自由地组合布局。

<div class="demo">
  <ea-row class="row-container">
    <ea-col span="24">
      <ea-button type="primary">col-24</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container">
    <ea-col span="12">
      <ea-button type="primary">col-12</ea-button>
    </ea-col>
    <ea-col span="12">
      <ea-button type="primary">col-12</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container">
    <ea-col span="8">
      <ea-button type="primary">col-8</ea-button>
    </ea-col>
    <ea-col span="8">
      <ea-button type="primary">col-8</ea-button>
    </ea-col>
    <ea-col span="8">
      <ea-button type="primary">col-8</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container">
    <ea-col span="6">
      <ea-button type="primary">col-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">col-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">col-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">col-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container">
    <ea-col span="4">
      <ea-button type="primary">col-4</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">col-4</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">col-4</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">col-4</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">col-4</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">col-4</ea-button>
    </ea-col>
  </ea-row>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-row class="row-container">
    <ea-col span="24">
      <ea-button type="primary">col-24</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container">
    <ea-col span="12">
      <ea-button type="primary">col-12</ea-button>
    </ea-col>
    <ea-col span="12">
      <ea-button type="primary">col-12</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container">
    <ea-col span="8">
      <ea-button type="primary">col-8</ea-button>
    </ea-col>
    <ea-col span="8">
      <ea-button type="primary">col-8</ea-button>
    </ea-col>
    <ea-col span="8">
      <ea-button type="primary">col-8</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container">
    <ea-col span="6">
      <ea-button type="primary">col-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">col-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">col-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">col-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container">
    <ea-col span="4">
      <ea-button type="primary">col-4</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">col-4</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">col-4</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">col-4</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">col-4</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">col-4</ea-button>
    </ea-col>
  </ea-row>
</div>
```

:::

## 分栏间隔 ​

支持列间距。

行提供 `gutter` 属性来指定列之间的间距，其默认值为 `0`。

<div class="demo">
  <ea-row class="row-container" gutter="20">
    <ea-col span="6">
      <ea-button type="primary">col-gutter-20</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">col-gutter-20</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">col-gutter-20</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">col-gutter-20</ea-button>
    </ea-col>
  </ea-row>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-row class="row-container" gutter="20">
    <ea-col span="6">
      <ea-button type="primary">col-gutter-20</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">col-gutter-20</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">col-gutter-20</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">col-gutter-20</ea-button>
    </ea-col>
  </ea-row>
</div>
```

:::

## 混合布局 ​

通过基础的 `1/24` 分栏任意扩展组合形成较为复杂的混合布局。

<div class="demo">
  <ea-row class="row-container" gutter="20">
    <ea-col span="16">
      <ea-button type="primary">span-16</ea-button>
    </ea-col>
    <ea-col span="8">
      <ea-button type="primary">span-8</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" gutter="20">
    <ea-col span="8">
      <ea-button type="primary">span-8</ea-button>
    </ea-col>
    <ea-col span="8">
      <ea-button type="primary">span-8</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">span-4</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">span-4</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" gutter="20">
    <ea-col span="4">
      <ea-button type="primary">span-4</ea-button>
    </ea-col>
    <ea-col span="16">
      <ea-button type="primary">span-16</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">span-4</ea-button>
    </ea-col>
  </ea-row>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-row class="row-container" gutter="20">
    <ea-col span="16">
      <ea-button type="primary">span-16</ea-button>
    </ea-col>
    <ea-col span="8">
      <ea-button type="primary">span-8</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" gutter="20">
    <ea-col span="8">
      <ea-button type="primary">span-8</ea-button>
    </ea-col>
    <ea-col span="8">
      <ea-button type="primary">span-8</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">span-4</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">span-4</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" gutter="20">
    <ea-col span="4">
      <ea-button type="primary">span-4</ea-button>
    </ea-col>
    <ea-col span="16">
      <ea-button type="primary">span-16</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">span-4</ea-button>
    </ea-col>
  </ea-row>
</div>
```

:::

## 列偏移 ​

您可以指定列偏移量。

通过制定 `col` 组件的 `offset` 属性可以指定分栏偏移的栏数。

<div class="demo">
  <ea-row class="row-container" gutter="20">
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6" offset="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" gutter="20">
    <ea-col span="6" offset="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6" offset="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" gutter="20">
    <ea-col span="12" offset="6">
      <ea-button type="primary">span-12</ea-button>
    </ea-col>
  </ea-row>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-row class="row-container" gutter="20">
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6" offset="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" gutter="20">
    <ea-col span="6" offset="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6" offset="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" gutter="20">
    <ea-col span="12" offset="6">
      <ea-button type="primary">span-12</ea-button>
    </ea-col>
  </ea-row>
</div>
```

:::

## 列栅格偏移

该属性是对 `列偏移` 属性的补充，用于改变列的左右偏移方式。

<div class="demo">
  <p>栅格向右偏移</p>
  <ea-row class="row-container" gutter="20">
    <ea-col span="4">
      <ea-button type="primary">span-4</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">span-4</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" gutter="20">
    <ea-col span="4" push="4">
      <ea-button type="primary">span-4 push-4</ea-button>
    </ea-col>
    <ea-col span="4" push="4">
      <ea-button type="primary">span-4 push-4</ea-button>
    </ea-col>
  </ea-row>
  <p>栅格向左偏移</p>
  <ea-row class="row-container" gutter="20">
    <ea-col span="4" offset="4">
      <ea-button type="primary">span-4 offset-4</ea-button>
    </ea-col>
    <ea-col span="4" offset="4">
      <ea-button type="primary">span-4 offset-4</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" gutter="20">
    <ea-col span="4" pull="4" offset="4">
      <ea-button type="primary">span-4 pull-4 offset-4</ea-button>
    </ea-col>
    <ea-col span="4" pull="4" offset="4">
      <ea-button type="primary">span-4 pull-4 offset-4</ea-button>
    </ea-col>
  </ea-row>
</div>

::: details 查看代码

```html
<div class="demo">
  <p>栅格向右移动</p>
  <ea-row class="row-container" gutter="20">
    <ea-col span="4">
      <ea-button type="primary">span-4</ea-button>
    </ea-col>
    <ea-col span="4">
      <ea-button type="primary">span-4</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" gutter="20">
    <ea-col span="4" push="4">
      <ea-button type="primary">span-4 push-4</ea-button>
    </ea-col>
    <ea-col span="4" push="4">
      <ea-button type="primary">span-4 push-4</ea-button>
    </ea-col>
  </ea-row>
  <p>栅格向左移动</p>
  <ea-row class="row-container" gutter="20">
    <ea-col span="4" offset="4">
      <ea-button type="primary">span-4 offset-4</ea-button>
    </ea-col>
    <ea-col span="4" offset="4">
      <ea-button type="primary">span-4 offset-4</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" gutter="20">
    <ea-col span="4" pull="4" offset="4">
      <ea-button type="primary">span-4 pull-4 offset-4</ea-button>
    </ea-col>
    <ea-col span="4" pull="4" offset="4">
      <ea-button type="primary">span-4 pull-4 offset-4</ea-button>
    </ea-col>
  </ea-row>
</div>
```

:::

## 对齐方式 ​

默认使用 `flex` 布局来对分栏进行灵活的对齐。

您可以通过 `justify` 属性来定义子元素的排版方式，其取值为`start | center | end | space-between | space-around | space-evenly`。

<div class="demo">
  <ea-row class="row-container">
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" justify="center">
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" justify="end">
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" justify="space-between">
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" justify="space-around">
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" justify="space-evenly">
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-row class="row-container">
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" justify="center">
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" justify="end">
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" justify="space-between">
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" justify="space-around">
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
  <ea-row class="row-container" justify="space-evenly">
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
    <ea-col span="6">
      <ea-button type="primary">span-6</ea-button>
    </ea-col>
  </ea-row>
</div>
```

:::

## Row API

### Row Attributes

| **属性名** | **说明**             | **类型** | **可选值**                                                                            | **默认值** |
| ---------- | -------------------- | -------- | ------------------------------------------------------------------------------------- | ---------- |
| gutter     | 设置列之间的间距     | Number   | -                                                                                     | `0`        |
| justify    | 定义子元素的排版方式 | String   | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `start`    |
| align      | 定义子元素的对齐方式 | String   | `'top' \| 'middle' \| 'bottom'`                                                       | `top`      |
| tag        | 设置布局的标签       | String   | -                                                                                     | `div`      |

### Row Slots

| **插槽名** | **说明** |
| ---------- | -------- |
| -          | 默认内容 |

## Col API

### Col Attributes

| **属性名** | **说明**               | **类型** | **可选值** | **默认值** |
| ---------- | ---------------------- | -------- | ---------- | ---------- |
| span       | 定义列所占的宽度比例   | Number   | 0-24       | `24`       |
| offset     | 定义列左侧的偏移量     | Number   | 0-24       | `0`        |
| push       | 将列向右移动指定的列数 | Number   | 0-24       | `0`        |
| pull       | 将列向左移动指定的列数 | Number   | 0-24       | `0`        |
| tag        | 设置布局的标签         | String   | -          | `div`      |

### Col Slots

| **插槽名** | **说明** |
| ---------- | -------- |
| -          | 默认内容 |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

### Row CSS Part

| 名称      | 说明 |
| --------- | ---- |
| container | 容器 |

### Col CSS Part

| 名称      | 说明 |
| --------- | ---- |
| container | 容器 |
