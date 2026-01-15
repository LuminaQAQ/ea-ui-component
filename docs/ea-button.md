<script setup>
import { onMounted, ref } from 'vue'

const btn = ref(null);

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

  document
    .querySelector("#ea-radio-loading")
    .addEventListener("change", function (e) {
      const btn = document.querySelector("#ea-button-loading");

      e.target.value
        ? btn.loading = true
        : btn.loading = false;
    });
})
</script>

# Button 按钮

常用的操作按钮。

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

移步到 [CSS Part](#button-css-part)。

## 基础用法

使用 type、plain、round 和 circle 来定义按钮的样式。

<div class="demo">
  <div class="row">
      <ea-button>默认按钮</ea-button>
      <ea-button type="primary">主要按钮</ea-button>
      <ea-button type="success">成功按钮</ea-button>
      <ea-button type="warning">警告按钮</ea-button>
      <ea-button type="danger">危险按钮</ea-button>
  </div>
  <div class="row">
      <ea-button plain>朴素按钮</ea-button>
      <ea-button type="primary" plain>主要按钮</ea-button>
      <ea-button type="success" plain>成功按钮</ea-button>
      <ea-button type="warning" plain>警告按钮</ea-button>
      <ea-button type="danger" plain>危险按钮</ea-button>
  </div>
  <div class="row">
      <ea-button round>圆角按钮</ea-button>
      <ea-button type="primary" round>主要按钮</ea-button>
      <ea-button type="success" round>成功按钮</ea-button>
      <ea-button type="warning" round>警告按钮</ea-button>
      <ea-button type="danger" round>危险按钮</ea-button>
  </div>
  <div class="row">
      <ea-button icon="icon-coffee" circle></ea-button>
      <ea-button icon="icon-edit" type="primary" circle></ea-button>
      <ea-button icon="icon-comment-empty" type="success" circle></ea-button>
      <ea-button icon="icon-bell" type="warning" circle></ea-button>
      <ea-button icon="icon-cog" type="danger" circle></ea-button>
  </div>
</div>

::: details 查看代码

```html
<div class="row">
  <ea-button>默认按钮</ea-button>
  <ea-button class="part">默认按钮</ea-button>
  <ea-button type="primary">主要按钮</ea-button>
  <ea-button type="success">成功按钮</ea-button>
  <ea-button type="warning">警告按钮</ea-button>
  <ea-button type="danger">危险按钮</ea-button>
</div>
```

:::

## 禁用状态

你可以使用 disabled 属性来定义按钮是否被禁用。

使用 disabled 属性来控制按钮是否为禁用状态。 该属性接受一个 Boolean 类型的值。

<div class="demo">
  <div class="row">
      <ea-button disabled>禁用按钮</ea-button>
      <ea-button type="primary" disabled>主要按钮</ea-button>
      <ea-button type="success" disabled>成功按钮</ea-button>
      <ea-button type="warning" disabled>警告按钮</ea-button>
      <ea-button type="danger" disabled>危险按钮</ea-button>
  </div>
  <div class="row">
      <ea-button disabled plain>禁用按钮</ea-button>
      <ea-button type="primary" disabled plain>主要按钮</ea-button>
      <ea-button type="success" disabled plain>成功按钮</ea-button>
      <ea-button type="warning" disabled plain>警告按钮</ea-button>
      <ea-button type="danger" disabled plain>危险按钮</ea-button>
  </div>
  <div class="row">
      <ea-button id="ea-button-disabled" round disabled>圆角按钮</ea-button>
      <ea-button type="primary" round disabled>主要按钮</ea-button>
      <ea-button type="success" round disabled>成功按钮</ea-button>
      <ea-button type="warning" round disabled>警告按钮</ea-button>
      <ea-button type="danger" round disabled>危险按钮</ea-button>
  </div>
  <div class="row">
      <ea-button icon="icon-coffee" circle disabled></ea-button>
      <ea-button icon="icon-edit" type="primary" circle disabled></ea-button>
      <ea-button icon="icon-comment-empty" type="success" circle disabled></ea-button>
      <ea-button icon="icon-bell" type="warning" circle disabled></ea-button>
      <ea-button icon="icon-cog" type="danger" circle disabled></ea-button>
  </div>
</div>

::: details 查看代码

`html`

```html
<div class="row">
  <ea-button disabled>禁用按钮</ea-button>
  <ea-button type="primary" disabled>主要按钮</ea-button>
  <ea-button type="success" disabled>成功按钮</ea-button>
  <ea-button type="warning" disabled>警告按钮</ea-button>
  <ea-button type="danger" disabled>危险按钮</ea-button>
</div>
```

`js`: 操作 `disabled` 属性

```js
const btn = document.querySelector("ea-button");
btn.addEventListener("click", function (e) {
  btn.disabled = e.target.checked;
});
```

:::

## 链接按钮 ​

::: danger

type="text" 已被 废弃，将于版本 3.0.0 时 移除，请考虑切换至新的 API。

新的 API link 于 3.0.0 版本时添加，你可以使用 type API 设置链接按钮的主题样式

:::

通过设置 `href` 属性来改变链接。

<div class="demo">
  <div class="row left">
    <ea-button href="https://luminaqaq.github.io/ea-ui-component/ea-button" link
      >链接按钮</ea-button
    >
    <ea-button
      type="primary"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >文本按钮</ea-button
    >
    <ea-button
      type="danger"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >危险按钮</ea-button
    >
    <ea-button
      type="warning"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >警告按钮</ea-button
    >
    <ea-button
      type="success"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >成功按钮</ea-button
    >
    <ea-button
      disabled
      id="ea-button-a"
      type="text"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >链接按钮</ea-button
    >
  </div>

  <div class="row left">
    <ea-button
      disabled
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >链接按钮</ea-button
    >
    <ea-button
      disabled
      type="primary"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >文本按钮</ea-button
    >
    <ea-button
      disabled
      type="danger"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >危险按钮</ea-button
    >
    <ea-button
      disabled
      type="warning"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >警告按钮</ea-button
    >
    <ea-button
      disabled
      type="success"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >成功按钮</ea-button
    >
    <ea-button
      disabled
      id="ea-button-a"
      type="text"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >链接按钮</ea-button
    >
  </div>
</div>

::: details 查看代码

```html
<div class="demo">
  <div class="row left">
    <ea-button href="https://luminaqaq.github.io/ea-ui-component/ea-button" link
      >链接按钮</ea-button
    >
    <ea-button
      type="primary"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >文本按钮</ea-button
    >
    <ea-button
      type="danger"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >危险按钮</ea-button
    >
    <ea-button
      type="warning"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >警告按钮</ea-button
    >
    <ea-button
      type="success"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >成功按钮</ea-button
    >
    <ea-button
      disabled
      id="ea-button-a"
      type="text"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >链接按钮</ea-button
    >
  </div>

  <div class="row left">
    <ea-button
      disabled
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >链接按钮</ea-button
    >
    <ea-button
      disabled
      type="primary"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >文本按钮</ea-button
    >
    <ea-button
      disabled
      type="danger"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >危险按钮</ea-button
    >
    <ea-button
      disabled
      type="warning"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >警告按钮</ea-button
    >
    <ea-button
      disabled
      type="success"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >成功按钮</ea-button
    >
    <ea-button
      disabled
      id="ea-button-a"
      type="text"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >链接按钮</ea-button
    >
  </div>
</div>
```

:::

## 文字按钮

::: tip

没有边框和背景色的按钮。 通过设置 `type` 属性为 `text` 来切换按钮类型。

API 也已更新，由于 type 属性会同时控制按钮的样式， 因此于 3.0.0，我们通过一个新的 API text: boolean 来控制文字按钮。

:::

<div class="demo">
  <div class="row left">
    <ea-button icon="icon-coffee" text>文字按钮</ea-button>
    <ea-button type="primary" text>文字按钮</ea-button>
    <ea-button type="danger" text>文字按钮</ea-button>
    <ea-button type="warning" text>文字按钮</ea-button>
    <ea-button type="success" text>文字按钮</ea-button>
  </div>
  <div class="row left">
    <ea-button disabled icon="icon-coffee" text>文字按钮</ea-button>
    <ea-button disabled type="primary" text>文字按钮</ea-button>
    <ea-button disabled type="danger" text>文字按钮</ea-button>
    <ea-button disabled type="warning" text>文字按钮</ea-button>
    <ea-button disabled type="success" text>文字按钮</ea-button>
  </div>
</div>

::: details 查看代码

```html
<div class="demo">
  <div class="row left">
    <ea-button icon="icon-coffee" text>文字按钮</ea-button>
    <ea-button type="primary" text>文字按钮</ea-button>
    <ea-button type="danger" text>文字按钮</ea-button>
    <ea-button type="warning" text>文字按钮</ea-button>
    <ea-button type="success" text>文字按钮</ea-button>
  </div>
  <div class="row left">
    <ea-button disabled icon="icon-coffee" text>文字按钮</ea-button>
    <ea-button disabled type="primary" text>文字按钮</ea-button>
    <ea-button disabled type="danger" text>文字按钮</ea-button>
    <ea-button disabled type="warning" text>文字按钮</ea-button>
    <ea-button disabled type="success" text>文字按钮</ea-button>
  </div>
</div>
```

:::

## 图标按钮

使用图标为按钮添加更多的含义。 你也可以单独使用图标不添加文字来节省显示区域占用。

通过设置 `icon` 属性为 `icon-xxx` 来改变图标，更多图标请查看 [图标文档](./ea-icon.md)。

<div class="row left">
  <ea-button type="primary" icon="icon-coffee" circle></ea-button>
  <ea-button type="primary" icon="icon-edit" round></ea-button>
  <ea-button type="primary" icon="icon-edit"></ea-button>
  <ea-button type="primary" icon="icon-comment-empty">图标按钮</ea-button>
  <ea-button type="primary" icon="icon-trash-empty" disabled>
    图标按钮
  </ea-button>
  <ea-button type="primary" disabled>
    图标按钮 <ea-icon icon="icon-trash-empty"></ea-icon>
  </ea-button>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-button type="primary" icon="icon-coffee" circle></ea-button>
  <ea-button type="primary" icon="icon-edit" round></ea-button>
  <ea-button type="primary" icon="icon-edit"></ea-button>
  <ea-button type="primary" icon="icon-comment-empty">图标按钮</ea-button>
  <ea-button type="primary" icon="icon-trash-empty" disabled>
    图标按钮
  </ea-button>
  <ea-button type="primary" disabled>
    图标按钮 <ea-icon icon="icon-trash-empty"></ea-icon>
  </ea-button>
</div>
```

:::

## 按钮组

以按钮组的方式出现，常用于多项类似操作。

<div class="row left">
  <ea-button-group>
    <ea-button icon="icon-angle-left" type="primary">上一页</ea-button>
    <ea-button type="primary">
      下一页 <ea-icon icon="icon-angle-right"></ea-icon>
    </ea-button>
  </ea-button-group>
  <ea-button-group>
    <ea-button type="primary">后退</ea-button>
    <ea-button type="primary">刷新</ea-button>
    <ea-button type="primary">前进</ea-button>
  </ea-button-group>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-button-group>
    <ea-button icon="icon-angle-left" type="primary">上一页</ea-button>
    <ea-button type="primary">
      下一页 <ea-icon icon="icon-angle-right"></ea-icon>
    </ea-button>
  </ea-button-group>
  <ea-button-group>
    <ea-button type="primary">后退</ea-button>
    <ea-button type="primary">刷新</ea-button>
    <ea-button type="primary">前进</ea-button>
  </ea-button-group>
</div>
```

:::

## 加载状态按钮 ​

点击按钮来加载数据，并向用户反馈加载状态。

通过设置 loading 属性为 true 来显示加载中状态。

<div class="row left">
  <ea-switch id="ea-radio-loading" value="true"></ea-switch>
  <ea-button id="ea-button-loading" type="primary" loading>加载中按钮</ea-button>
</div>

::: details 查看代码

`html`

```html
<div class="row">
  <ea-switch id="ea-radio-loading" value="true"></ea-switch>
  <ea-button id="ea-button-loading" type="primary" loading
    >加载中按钮</ea-button
  >
</div>
```

`js`: 操作 `loading` 属性。

```js
document
  .querySelector("#ea-radio-loading")
  .addEventListener("change", function (e) {
    const btn = document.querySelector("#ea-button-loading");

    e.target.value ? (btn.loading = true) : (btn.loading = false);
  });
```

:::

## 不同尺寸

除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。

使用 size 属性额外配置尺寸，可使用 large 和 small 两种值。

<div class="demo">
  <div class="row left">
    <ea-button type="primary" size="large">大型按钮</ea-button>
    <ea-button type="primary">默认按钮</ea-button>
    <ea-button type="primary" size="small">小型按钮</ea-button>
  </div>
  <div class="row left">
    <ea-button type="primary" icon="icon-coffee" size="large"
      >大型按钮</ea-button
    >
    <ea-button type="primary" icon="icon-coffee">默认按钮</ea-button>
    <ea-button type="primary" icon="icon-coffee" size="small"
      >小型按钮</ea-button
    >
  </div>
  <div class="row left">
    <ea-button type="primary" round size="large">大型按钮</ea-button>
    <ea-button type="primary" round>默认按钮</ea-button>
    <ea-button type="primary" round size="small">小型按钮</ea-button>
  </div>
  <div class="row left">
    <ea-button
      type="primary"
      circle
      icon="icon-coffee"
      size="large"
    ></ea-button>
    <ea-button type="primary" circle icon="icon-coffee"></ea-button>
    <ea-button
      type="primary"
      circle
      icon="icon-coffee"
      size="small"
    ></ea-button>
  </div>
</div>

::: details 查看代码

```html
<div class="demo">
  <div class="row left">
    <ea-button type="primary" size="large">大型按钮</ea-button>
    <ea-button type="primary">默认按钮</ea-button>
    <ea-button type="primary" size="small">小型按钮</ea-button>
  </div>
  <div class="row left">
    <ea-button type="primary" icon="icon-coffee" size="large"
      >大型按钮</ea-button
    >
    <ea-button type="primary" icon="icon-coffee">默认按钮</ea-button>
    <ea-button type="primary" icon="icon-coffee" size="small"
      >小型按钮</ea-button
    >
  </div>
  <div class="row left">
    <ea-button type="primary" round size="large">大型按钮</ea-button>
    <ea-button type="primary" round>默认按钮</ea-button>
    <ea-button type="primary" round size="small">小型按钮</ea-button>
  </div>
  <div class="row left">
    <ea-button
      type="primary"
      circle
      icon="icon-coffee"
      size="large"
    ></ea-button>
    <ea-button type="primary" circle icon="icon-coffee"></ea-button>
    <ea-button
      type="primary"
      circle
      icon="icon-coffee"
      size="small"
    ></ea-button>
  </div>
</div>
```

:::

## Button Attributes

| **参数**   | **说明** | **类型**  | **可选值**                                                          | **默认值** |
| ---------- | -------- | --------- | ------------------------------------------------------------------- | ---------- |
| `size`     | 按钮尺寸 | `string`  | `normal`\|`medium`\|`small`\|`mini`                                 | `"normal"` |
| `type`     | 按钮类型 | `string`  | `normal`\|`primary`\|`success`\|`warning`\|`danger`\|`text`\|`link` | `"normal"` |
| `plain`    | 朴素效果 | `boolean` | `true`\|`false`                                                     | `false`    |
| `disabled` | 是否禁用 | `boolean` | `true`\|`false`                                                     | `false`    |
| `round`    | 圆角按钮 | `boolean` | `true`\|`false`                                                     | `false`    |
| `loading`  | 加载状态 | `boolean` | `true`\|`false`                                                     | `false`    |
| `icon`     | 图标类名 | `string`  | —                                                                   | —          |
| `href`     | 链接地址 | `string`  | —                                                                   | —          |

## ButtonGroup Attributes

| **参数**   | **说明** | **类型**  | **可选值**                                                          | **默认值** |
| ---------- | -------- | --------- | ------------------------------------------------------------------- | ---------- |
| `disabled` | 是否禁用 | `boolean` | `true`\|`false`                                                     | `false`    |
| `type`     | 按钮类型 | `string`  | `normal`\|`primary`\|`success`\|`warning`\|`danger`\|`text`\|`link` | `"normal"` |
| `size`     | 按钮尺寸 | `string`  | `normal`\|`medium`\|`small`\|`mini`                                 | `"normal"` |

## Button CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明     |
| --------- | -------- |
| container | 按钮容器 |
