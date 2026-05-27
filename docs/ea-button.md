<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
  document
    .querySelector("#ea-switch-disabled")
    .addEventListener("change", function (e) {
      const btn = document.querySelector("#ea-button-disabled");
      btn.toggleAttribute("disabled", e.detail.value);
    });

  document
    .querySelector("#ea-radio-href")
    .addEventListener("change", function (e) {
      const btn = document.querySelector("#ea-button-a");
      btn.toggleAttribute("disabled", e.detail.value);
    });

  document
    .querySelector("#btngroup-switch")
    .addEventListener("change", function (e) {
      const btn = document.querySelector("#btngroup");
      btn.toggleAttribute("disabled", e.detail.value);
    });

  document
    .querySelector("#ea-radio-loading")
    .addEventListener("change", function (e) {
      const btn = document.querySelector("#ea-button-loading");
      btn.loading = e.detail.value;
    });
})
</script>

# Button 按钮

常用的操作按钮。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-button/index.ts";
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

使用 variant、plain、round 和 circle 来定义按钮的样式。

<div class="demo">
  <div class="row">
      <ea-button>默认按钮</ea-button>
      <ea-button variant="primary">主要按钮</ea-button>
      <ea-button variant="success">成功按钮</ea-button>
      <ea-button variant="warning">警告按钮</ea-button>
      <ea-button variant="danger">危险按钮</ea-button>
  </div>
  <div class="row">
      <ea-button plain>朴素按钮</ea-button>
      <ea-button variant="primary" plain>主要按钮</ea-button>
      <ea-button variant="success" plain>成功按钮</ea-button>
      <ea-button variant="warning" plain>警告按钮</ea-button>
      <ea-button variant="danger" plain>危险按钮</ea-button>
  </div>
  <div class="row">
      <ea-button round>圆角按钮</ea-button>
      <ea-button variant="primary" round>主要按钮</ea-button>
      <ea-button variant="success" round>成功按钮</ea-button>
      <ea-button variant="warning" round>警告按钮</ea-button>
      <ea-button variant="danger" round>危险按钮</ea-button>
  </div>
  <div class="row">
      <ea-button icon="coffee" circle></ea-button>
      <ea-button icon="pen-to-square" variant="primary" circle></ea-button>
      <ea-button icon="comment" variant="success" circle></ea-button>
      <ea-button icon="bell" variant="warning" circle></ea-button>
      <ea-button icon="gear" variant="danger" circle></ea-button>
  </div>
</div>

:::: details 查看代码

::: code-group

```html [默认按钮]
<ea-button>默认按钮</ea-button>
<ea-button variant="primary">主要按钮</ea-button>
<ea-button variant="success">成功按钮</ea-button>
<ea-button variant="warning">警告按钮</ea-button>
<ea-button variant="danger">危险按钮</ea-button>
```

```html [朴素按钮]
<ea-button plain>朴素按钮</ea-button>
<ea-button variant="primary" plain>主要按钮</ea-button>
<ea-button variant="success" plain>成功按钮</ea-button>
<ea-button variant="warning" plain>警告按钮</ea-button>
<ea-button variant="danger" plain>危险按钮</ea-button>
```

```html [圆角按钮]
<ea-button round>圆角按钮</ea-button>
<ea-button variant="primary" round>主要按钮</ea-button>
<ea-button variant="success" round>成功按钮</ea-button>
<ea-button variant="warning" round>警告按钮</ea-button>
<ea-button variant="danger" round>危险按钮</ea-button>
```

```html [图标按钮]
<ea-button icon="coffee" circle></ea-button>
<ea-button icon="pen-to-square" variant="primary" circle></ea-button>
<ea-button icon="comment" variant="success" circle></ea-button>
<ea-button icon="bell" variant="warning" circle></ea-button>
<ea-button icon="gear" variant="danger" circle></ea-button>
```

:::

::::

## 禁用按钮

你可以使用 disabled 属性来定义按钮是否被禁用。

使用 disabled 属性来控制按钮是否为禁用状态。 该属性接受一个 Boolean 类型的值。

<div class="demo">
  <ea-switch id="ea-switch-disabled" value="true"></ea-switch>
  <div class="row">
      <ea-button disabled>禁用按钮</ea-button>
      <ea-button variant="primary" disabled>主要按钮</ea-button>
      <ea-button variant="success" disabled>成功按钮</ea-button>
      <ea-button variant="warning" disabled>警告按钮</ea-button>
      <ea-button variant="danger" disabled>危险按钮</ea-button>
  </div>
  <div class="row">
      <ea-button disabled plain>禁用按钮</ea-button>
      <ea-button variant="primary" disabled plain>主要按钮</ea-button>
      <ea-button variant="success" disabled plain>成功按钮</ea-button>
      <ea-button variant="warning" disabled plain>警告按钮</ea-button>
      <ea-button variant="danger" disabled plain>危险按钮</ea-button>
  </div>
  <div class="row">
      <ea-button id="ea-button-disabled" round disabled>圆角按钮</ea-button>
      <ea-button variant="primary" round disabled>主要按钮</ea-button>
      <ea-button variant="success" round disabled>成功按钮</ea-button>
      <ea-button variant="warning" round disabled>警告按钮</ea-button>
      <ea-button variant="danger" round disabled>危险按钮</ea-button>
  </div>
  <div class="row">
      <ea-button icon="coffee" circle disabled></ea-button>
      <ea-button icon="pen-to-square" variant="primary" circle disabled></ea-button>
      <ea-button icon="comment" variant="success" circle disabled></ea-button>
      <ea-button icon="bell" variant="warning" circle disabled></ea-button>
      <ea-button icon="gear" variant="danger" circle disabled></ea-button>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<ea-switch id="ea-switch-disabled" value="true"></ea-switch>
<div class="row">
    <ea-button disabled>禁用按钮</ea-button>
    <ea-button variant="primary" disabled>主要按钮</ea-button>
    <ea-button variant="success" disabled>成功按钮</ea-button>
    <ea-button variant="warning" disabled>警告按钮</ea-button>
    <ea-button variant="danger" disabled>危险按钮</ea-button>
</div>
<div class="row">
    <ea-button disabled plain>禁用按钮</ea-button>
    <ea-button variant="primary" disabled plain>主要按钮</ea-button>
    <ea-button variant="success" disabled plain>成功按钮</ea-button>
    <ea-button variant="warning" disabled plain>警告按钮</ea-button>
    <ea-button variant="danger" disabled plain>危险按钮</ea-button>
</div>
<div class="row">
    <ea-button id="ea-button-disabled" round disabled>圆角按钮</ea-button>
    <ea-button variant="primary" round disabled>主要按钮</ea-button>
    <ea-button variant="success" round disabled>成功按钮</ea-button>
    <ea-button variant="warning" round disabled>警告按钮</ea-button>
    <ea-button variant="danger" round disabled>危险按钮</ea-button>
</div>
<div class="row">
    <ea-button icon="coffee" circle disabled></ea-button>
    <ea-button icon="pen-to-square" variant="primary" circle disabled></ea-button>
    <ea-button icon="comment" variant="success" circle disabled></ea-button>
    <ea-button icon="bell" variant="warning" circle disabled></ea-button>
    <ea-button icon="gear" variant="danger" circle disabled></ea-button>
</div>
```

```js
document
  .querySelector("#ea-switch-disabled")
  .addEventListener("change", function (e) {
    const btn = document.querySelector("#ea-button-disabled");
    btn.toggleAttribute("disabled", e.detail.value);
  });
```

:::

::::

## 文字按钮

没有边框和背景色的按钮。 通过设置 `text` 属性来切换文字按钮类型。

<div class="demo">
  <div class="row left">
    <ea-button icon="coffee" text>文字按钮</ea-button>
    <ea-button icon="coffee" text disabled>文字按钮</ea-button>
    <ea-button variant="primary" text>文字按钮</ea-button>
    <ea-button variant="danger" text>文字按钮</ea-button>
    <ea-button variant="warning" text>文字按钮</ea-button>
    <ea-button variant="success" text>文字按钮</ea-button>
  </div>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-button icon="coffee" text>文字按钮</ea-button>
  <ea-button icon="coffee" text disabled>文字按钮</ea-button>
  <ea-button variant="primary" text>文字按钮</ea-button>
  <ea-button variant="danger" text>文字按钮</ea-button>
  <ea-button variant="warning" text>文字按钮</ea-button>
  <ea-button variant="success" text>文字按钮</ea-button>
</div>
```

:::

## 链接按钮

通过设置 `href` 属性和 `link` 属性来改变链接。

<div class="demo">
  <div class="row left">
    <ea-switch id="ea-radio-href" value="true"></ea-switch>
    <ea-button href="https://luminaqaq.github.io/ea-ui-component/ea-button" link
      >链接按钮</ea-button
    >
    <ea-button
      variant="primary"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >文本按钮</ea-button
    >
    <ea-button
      variant="danger"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >危险按钮</ea-button
    >
    <ea-button
      variant="warning"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >警告按钮</ea-button
    >
    <ea-button
      variant="success"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >成功按钮</ea-button
    >
    <ea-button
      disabled
      id="ea-button-a"
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
      variant="primary"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >文本按钮</ea-button
    >
    <ea-button
      disabled
      variant="danger"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >危险按钮</ea-button
    >
    <ea-button
      disabled
      variant="warning"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >警告按钮</ea-button
    >
    <ea-button
      disabled
      variant="success"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >成功按钮</ea-button
    >
    <ea-button
      disabled
      id="ea-button-a"
      href="https://luminaqaq.github.io/ea-ui-component/ea-button"
      link
      >链接按钮</ea-button
    >
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<ea-switch id="ea-radio-href" value="true"></ea-switch>
<div class="row left">
  <ea-button href="https://luminaqaq.github.io/ea-ui-component/ea-button" link
    >链接按钮</ea-button
  >
  <ea-button
    variant="primary"
    href="https://luminaqaq.github.io/ea-ui-component/ea-button"
    link
    >文本按钮</ea-button
  >
  <ea-button
    variant="danger"
    href="https://luminaqaq.github.io/ea-ui-component/ea-button"
    link
    >危险按钮</ea-button
  >
  <ea-button
    variant="warning"
    href="https://luminaqaq.github.io/ea-ui-component/ea-button"
    link
    >警告按钮</ea-button
  >
  <ea-button
    variant="success"
    href="https://luminaqaq.github.io/ea-ui-component/ea-button"
    link
    >成功按钮</ea-button
  >
  <ea-button
    disabled
    id="ea-button-a"
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
    variant="primary"
    href="https://luminaqaq.github.io/ea-ui-component/ea-button"
    link
    >文本按钮</ea-button
  >
  <ea-button
    disabled
    variant="danger"
    href="https://luminaqaq.github.io/ea-ui-component/ea-button"
    link
    >危险按钮</ea-button
  >
  <ea-button
    disabled
    variant="warning"
    href="https://luminaqaq.github.io/ea-ui-component/ea-button"
    link
    >警告按钮</ea-button
  >
  <ea-button
    disabled
    variant="success"
    href="https://luminaqaq.github.io/ea-ui-component/ea-button"
    link
    >成功按钮</ea-button
  >
  <ea-button
    disabled
    id="ea-button-a"
    href="https://luminaqaq.github.io/ea-ui-component/ea-button"
    link
    >链接按钮</ea-button
  >
</div>
```

```js
document
  .querySelector("#ea-radio-href")
  .addEventListener("change", function (e) {
    const btn = document.querySelector("#ea-button-a");
    btn.toggleAttribute("disabled", e.detail.value);
  });
```

:::

::::

## 图标按钮

使用图标为按钮添加更多的含义。 你也可以单独使用图标不添加文字来节省显示区域占用。

通过设置 `icon` 属性为 `icon-xxx` 来改变图标，更多图标请查看 [图标文档](./ea-icon.md)。

<div class="demo">
  <div class="row left">
    <ea-button variant="primary" icon="pen-to-square" round></ea-button>
    <ea-button variant="primary" icon="pen-to-square"></ea-button>
    <ea-button variant="primary" icon="comment">图标按钮</ea-button>
    <ea-button variant="primary" icon="trash-can" disabled>图标按钮</ea-button>
    <ea-button variant="primary" disabled
      >图标按钮 <ea-icon name="trash-can"></ea-icon
    ></ea-button>
  </div>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-button variant="primary" icon="pen-to-square" round></ea-button>
  <ea-button variant="primary" icon="pen-to-square"></ea-button>
  <ea-button variant="primary" icon="comment">图标按钮</ea-button>
  <ea-button variant="primary" icon="trash-can" disabled>图标按钮</ea-button>
  <ea-button variant="primary" disabled
    >图标按钮 <ea-icon name="trash-can"></ea-icon
  ></ea-button>
</div>
```

:::

## 按钮组

以按钮组的方式出现，常用于多项类似操作。

<div class="demo">
  <div class="row left">
    <ea-switch id="btngroup-switch" value="true"></ea-switch>
    <ea-button-group id="btngroup" disabled>
      <ea-button icon="angle-left" variant="success">上一页</ea-button>
      <ea-button variant="primary"
        >下一页 <ea-icon name="angle-right"></ea-icon>
      </ea-button>
    </ea-button-group>
    <ea-button-group size="small">
      <ea-button>后退</ea-button>
      <ea-button>刷新</ea-button>
      <ea-button>前进</ea-button>
    </ea-button-group>
    <ea-button-group variant="success">
      <ea-button variant="primary">后退</ea-button>
      <ea-button variant="primary">刷新</ea-button>
      <ea-button variant="primary">前进</ea-button>
    </ea-button-group>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<ea-switch id="btngroup-switch" value="true"></ea-switch>
<ea-button-group id="btngroup" disabled>
  <ea-button icon="angle-left" variant="success">上一页</ea-button>
  <ea-button variant="primary"
    >下一页 <ea-icon name="angle-right"></ea-icon>
  </ea-button>
</ea-button-group>
<ea-button-group size="small">
  <ea-button>后退</ea-button>
  <ea-button>刷新</ea-button>
  <ea-button>前进</ea-button>
</ea-button-group>
<ea-button-group variant="success">
  <ea-button variant="primary">后退</ea-button>
  <ea-button variant="primary">刷新</ea-button>
  <ea-button variant="primary">前进</ea-button>
</ea-button-group>
```

```js
document
  .querySelector("#btngroup-switch")
  .addEventListener("change", function (e) {
    const btn = document.querySelector("#btngroup");
    btn.toggleAttribute("disabled", e.detail.value);
  });
```

:::

::::

## 加载状态按钮

点击按钮来加载数据，并向用户反馈加载状态。

通过设置 loading 属性为 true 来显示加载中状态。

<div class="demo">
  <div class="row left">
    <ea-switch id="ea-radio-loading" value="true"></ea-switch>
    <ea-button id="ea-button-loading" variant="primary" icon="coffee" loading>
      加载中按钮
    </ea-button>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<ea-switch id="ea-radio-loading" value="true"></ea-switch>
<ea-button id="ea-button-loading" variant="primary" icon="coffee" loading>
  加载中按钮
</ea-button>
```

```js
document
  .querySelector("#ea-radio-loading")
  .addEventListener("change", function (e) {
    const btn = document.querySelector("#ea-button-loading");
    btn.loading = e.detail.value;
  });
```

:::

::::

## 不同尺寸

除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。

使用 size 属性额外配置尺寸，可使用 large 和 small 两种值。

<div class="demo">
  <div class="row left">
    <ea-button variant="primary" size="large">大型按钮</ea-button>
    <ea-button variant="primary">默认按钮</ea-button>
    <ea-button variant="primary" size="small">小型按钮</ea-button>
  </div>
  <div class="row left">
    <ea-button variant="primary" icon="coffee" size="large">大型按钮</ea-button>
    <ea-button variant="primary" icon="coffee">默认按钮</ea-button>
    <ea-button variant="primary" icon="coffee" size="small">小型按钮</ea-button>
  </div>
  <div class="row left">
    <ea-button variant="primary" round size="large">大型按钮</ea-button>
    <ea-button variant="primary" round>默认按钮</ea-button>
    <ea-button variant="primary" round size="small">小型按钮</ea-button>
  </div>
  <div class="row left">
    <ea-button variant="primary" circle icon="coffee" size="large"></ea-button>
    <ea-button variant="primary" circle icon="coffee"></ea-button>
    <ea-button variant="primary" circle icon="coffee" size="small"></ea-button>
  </div>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-button variant="primary" size="large">大型按钮</ea-button>
  <ea-button variant="primary">默认按钮</ea-button>
  <ea-button variant="primary" size="small">小型按钮</ea-button>
</div>
<div class="row left">
  <ea-button variant="primary" icon="coffee" size="large">大型按钮</ea-button>
  <ea-button variant="primary" icon="coffee">默认按钮</ea-button>
  <ea-button variant="primary" icon="coffee" size="small">小型按钮</ea-button>
</div>
<div class="row left">
  <ea-button variant="primary" round size="large">大型按钮</ea-button>
  <ea-button variant="primary" round>默认按钮</ea-button>
  <ea-button variant="primary" round size="small">小型按钮</ea-button>
</div>
<div class="row left">
  <ea-button variant="primary" circle icon="coffee" size="large"></ea-button>
  <ea-button variant="primary" circle icon="coffee"></ea-button>
  <ea-button variant="primary" circle icon="coffee" size="small"></ea-button>
</div>
```

:::

## Button API

### Button Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |
| variant | 按钮类型 | String | normal / primary / success / warning / danger / info | `"normal"` |
| size | 按钮尺寸 | String | small / medium / large | `"medium"` |
| plain | 朴素效果 | Boolean | — | false |
| disabled | 是否禁用 | Boolean | — | false |
| round | 圆角按钮 | Boolean | — | false |
| circle | 圆形按钮 | Boolean | — | false |
| text | 文字按钮 | Boolean | — | false |
| link | 链接按钮 | Boolean | — | false |
| href | 链接地址 | String | — | — |
| target | 链接打开方式 | String | — | — |
| rel | 链接关系 | String | — | — |
| download | 下载文件名 | String | — | — |
| loading | 加载状态 | Boolean | — | false |
| icon | 图标类名 | String | — | — |
| type | 原生按钮类型 | String | button / submit / reset | `"button"` |

### ButtonGroup Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |
| disabled | 是否禁用 | Boolean | — | false |
| size | 按钮尺寸 | String | small / medium / large | `"medium"` |
| variant | 按钮类型 | String | normal / primary / success / warning / danger / info | `"normal"` |

### Button CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称 | 说明 |
| ---- | ---- |
| container | 按钮容器 |
| icon | 图标元素 |
| loading-icon | 加载图标元素 |

### ButtonGroup CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称 | 说明 |
| ---- | ---- |
| container | 按钮组容器 |

### Button Slots

| 名称 | 说明 |
| ---- | ---- |
| default | 按钮内容插槽 |

### ButtonGroup Slots

| 名称 | 说明 |
| ---- | ---- |
| default | 按钮组内容插槽 |
