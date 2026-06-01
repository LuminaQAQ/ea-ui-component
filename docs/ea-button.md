<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
  document
    .querySelector("#switch-disabled")
    .addEventListener("change", function (e) {
      document.querySelectorAll(".disabled-toggle").forEach((btn) => {
        btn.toggleAttribute("disabled", e.detail.value);
      });
    });

  document
    .querySelector("#switch-loading")
    .addEventListener("change", function (e) {
      document.querySelectorAll(".loading-toggle").forEach((btn) => {
        btn.loading = e.detail.value;
      });
    });

  document
    .querySelector("#switch-group-disabled")
    .addEventListener("change", function (e) {
      document.querySelector("#group-disabled").toggleAttribute("disabled", e.detail.value);
    });

  document
    .querySelector("#form-submit")
    .addEventListener("click", function () {
      document.querySelector("#form-message").textContent = "表单已提交！";
      setTimeout(() => {
        document.querySelector("#form-message").textContent = "";
      }, 2000);
    });

  document
    .querySelector("#form-reset")
    .addEventListener("click", function () {
      document.querySelector("#form-message").textContent = "表单已重置！";
      setTimeout(() => {
        document.querySelector("#form-message").textContent = "";
      }, 2000);
    });
})
</script>

# Button 按钮

常用的操作按钮。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-button.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-button";
```

:::

## 自定义样式

移步到 [CSS Part](#button-css-part)。

## 基础用法

使用 `variant` 属性定义按钮的类型。

<div class="demo">
  <div class="row is-not-demo">
    <ea-button>默认按钮</ea-button>
    <ea-button variant="primary">主要按钮</ea-button>
    <ea-button variant="success">成功按钮</ea-button>
    <ea-button variant="warning">警告按钮</ea-button>
    <ea-button variant="danger">危险按钮</ea-button>
    <ea-button variant="info">信息按钮</ea-button>
  </div>
</div>

::: details 查看代码

```html
<ea-button>默认按钮</ea-button>
<ea-button variant="primary">主要按钮</ea-button>
<ea-button variant="success">成功按钮</ea-button>
<ea-button variant="warning">警告按钮</ea-button>
<ea-button variant="danger">危险按钮</ea-button>
<ea-button variant="info">信息按钮</ea-button>
```

:::

## 朴素按钮

设置 `plain` 属性，按钮显示为朴素风格（浅色背景 + 彩色边框和文字）。

<div class="demo">
  <div class="row is-not-demo">
    <ea-button plain>朴素按钮</ea-button>
    <ea-button variant="primary" plain>主要按钮</ea-button>
    <ea-button variant="success" plain>成功按钮</ea-button>
    <ea-button variant="warning" plain>警告按钮</ea-button>
    <ea-button variant="danger" plain>危险按钮</ea-button>
    <ea-button variant="info" plain>信息按钮</ea-button>
  </div>
</div>

::: details 查看代码

```html
<ea-button plain>朴素按钮</ea-button>
<ea-button variant="primary" plain>主要按钮</ea-button>
<ea-button variant="success" plain>成功按钮</ea-button>
<ea-button variant="warning" plain>警告按钮</ea-button>
<ea-button variant="danger" plain>危险按钮</ea-button>
<ea-button variant="info" plain>信息按钮</ea-button>
```

:::

## 圆角按钮

设置 `round` 属性使按钮呈现圆角胶囊样式。

<div class="demo">
  <div class="row is-not-demo">
    <ea-button round>圆角按钮</ea-button>
    <ea-button variant="primary" round>主要按钮</ea-button>
    <ea-button variant="success" round>成功按钮</ea-button>
    <ea-button variant="warning" round>警告按钮</ea-button>
    <ea-button variant="danger" round>危险按钮</ea-button>
    <ea-button variant="info" round>信息按钮</ea-button>
  </div>
</div>

::: details 查看代码

```html
<ea-button round>圆角按钮</ea-button>
<ea-button variant="primary" round>主要按钮</ea-button>
<ea-button variant="success" round>成功按钮</ea-button>
<ea-button variant="warning" round>警告按钮</ea-button>
<ea-button variant="danger" round>危险按钮</ea-button>
<ea-button variant="info" round>信息按钮</ea-button>
```

:::

## 圆形按钮

设置 `circle` 属性使按钮呈现圆形，通常配合 `icon` 使用。

<div class="demo">
  <div class="row is-not-demo">
    <ea-button icon="coffee" circle></ea-button>
    <ea-button icon="pen-to-square" variant="primary" circle></ea-button>
    <ea-button icon="comment" variant="success" circle></ea-button>
    <ea-button icon="bell" variant="warning" circle></ea-button>
    <ea-button icon="gear" variant="danger" circle></ea-button>
    <ea-button icon="circle-info" variant="info" circle></ea-button>
  </div>
</div>

::: details 查看代码

```html
<ea-button icon="coffee" circle></ea-button>
<ea-button icon="pen-to-square" variant="primary" circle></ea-button>
<ea-button icon="comment" variant="success" circle></ea-button>
<ea-button icon="bell" variant="warning" circle></ea-button>
<ea-button icon="gear" variant="danger" circle></ea-button>
<ea-button icon="circle-info" variant="info" circle></ea-button>
```

:::

## 文字按钮

设置 `text` 属性使按钮无边框和背景，仅显示文字。

<div class="demo">
  <div class="row is-not-demo">
    <ea-button text>文字按钮</ea-button>
    <ea-button variant="primary" text>文字按钮</ea-button>
    <ea-button variant="success" text>文字按钮</ea-button>
    <ea-button variant="warning" text>文字按钮</ea-button>
    <ea-button variant="danger" text>文字按钮</ea-button>
    <ea-button variant="info" text>文字按钮</ea-button>
  </div>
  <div class="row is-not-demo">
    <ea-button text disabled>文字按钮</ea-button>
    <ea-button variant="primary" text disabled>文字按钮</ea-button>
    <ea-button variant="success" text disabled>文字按钮</ea-button>
    <ea-button variant="warning" text disabled>文字按钮</ea-button>
    <ea-button variant="danger" text disabled>文字按钮</ea-button>
    <ea-button variant="info" text disabled>文字按钮</ea-button>
  </div>
</div>

::: details 查看代码

```html
<ea-button text>文字按钮</ea-button>
<ea-button variant="primary" text>文字按钮</ea-button>
<ea-button variant="success" text>文字按钮</ea-button>
<ea-button variant="warning" text>文字按钮</ea-button>
<ea-button variant="danger" text>文字按钮</ea-button>
<ea-button variant="info" text>文字按钮</ea-button>
```

:::

## 链接按钮

设置 `link` 属性和 `href` 属性将按钮渲染为链接，支持 `target`、`rel`、`download` 等 `<a>` 标签原生属性。

<div class="demo">
  <div class="row is-not-demo">
    <ea-button href="https://example.com" link>链接按钮</ea-button>
    <ea-button variant="primary" href="https://example.com" link>主要链接</ea-button>
    <ea-button variant="success" href="https://example.com" link>成功链接</ea-button>
    <ea-button variant="warning" href="https://example.com" link>警告链接</ea-button>
    <ea-button variant="danger" href="https://example.com" link>危险链接</ea-button>
    <ea-button variant="info" href="https://example.com" link>信息链接</ea-button>
  </div>
  <div class="row is-not-demo">
    <ea-button href="https://example.com" link target="_blank" rel="noopener noreferrer">新窗口打开</ea-button>
    <ea-button href="/logo.png" link download>下载图片</ea-button>
    <ea-button href="/logo.png" link download="ea-logo.png">自定义文件名下载</ea-button>
    <ea-button href="https://example.com" link disabled>禁用链接</ea-button>
  </div>
</div>

:::: details 查看代码

::: code-group

```html [基础链接]
<ea-button href="https://example.com" link>链接按钮</ea-button>
<ea-button variant="primary" href="https://example.com" link
  >主要链接</ea-button
>
<ea-button variant="success" href="https://example.com" link
  >成功链接</ea-button
>
<ea-button variant="warning" href="https://example.com" link
  >警告链接</ea-button
>
<ea-button variant="danger" href="https://example.com" link>危险链接</ea-button>
<ea-button variant="info" href="https://example.com" link>信息链接</ea-button>
```

```html [链接属性]
<ea-button
  href="https://example.com"
  link
  target="_blank"
  rel="noopener noreferrer"
  >新窗口打开</ea-button
>
<ea-button href="/logo.png" link download>下载图片</ea-button>
<ea-button href="/logo.png" link download="ea-logo.png"
  >自定义文件名下载</ea-button
>
<ea-button href="https://example.com" link disabled>禁用链接</ea-button>
```

:::

::::

## 图标按钮

设置 `icon` 属性为按钮添加图标，也可以通过默认插槽插入自定义图标元素。

<div class="demo">
  <div class="row is-not-demo">
    <ea-button variant="primary" icon="pen-to-square" round></ea-button>
    <ea-button variant="primary" icon="pen-to-square"></ea-button>
    <ea-button variant="primary" icon="comment">图标按钮</ea-button>
    <ea-button variant="primary" icon="trash-can" disabled>图标按钮</ea-button>
    <ea-button variant="primary" disabled>图标按钮 <ea-icon name="trash-can"></ea-icon></ea-button>
  </div>
</div>

:::: details 查看代码

::: code-group

```html [icon 属性]
<ea-button variant="primary" icon="pen-to-square" round></ea-button>
<ea-button variant="primary" icon="pen-to-square"></ea-button>
<ea-button variant="primary" icon="comment">图标按钮</ea-button>
```

```html [插槽图标]
<ea-button variant="primary" disabled>
  图标按钮 <ea-icon name="trash-can"></ea-icon>
</ea-button>
```

:::

::::

## 加载状态

设置 `loading` 属性使按钮进入加载状态，加载时自动禁用按钮并显示加载图标。

<div class="demo">
  <div class="row is-not-demo">
    <ea-switch id="switch-loading" value="true"></ea-switch>
    <ea-button class="loading-toggle" variant="primary" loading>加载中</ea-button>
    <ea-button class="loading-toggle" variant="primary" icon="coffee" loading>加载中</ea-button>
    <ea-button class="loading-toggle" variant="success" loading plain>加载中</ea-button>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<ea-switch id="switch-loading" value="true"></ea-switch>
<ea-button class="loading-toggle" variant="primary" loading>加载中</ea-button>
<ea-button class="loading-toggle" variant="primary" icon="coffee" loading
  >加载中</ea-button
>
<ea-button class="loading-toggle" variant="success" loading plain
  >加载中</ea-button
>
```

```js
document
  .querySelector("#switch-loading")
  .addEventListener("change", function (e) {
    document.querySelectorAll(".loading-toggle").forEach(btn => {
      btn.loading = e.detail.value;
    });
  });
```

:::

::::

## 禁用状态

设置 `disabled` 属性使按钮不可用，支持所有变体和形态。

<div class="demo">
  <p><ea-switch id="switch-disabled" value="true"></ea-switch></p>
  <div class="row is-not-demo">
    <ea-button class="disabled-toggle" disabled>默认按钮</ea-button>
    <ea-button class="disabled-toggle" variant="primary" disabled>主要按钮</ea-button>
    <ea-button class="disabled-toggle" variant="success" disabled>成功按钮</ea-button>
    <ea-button class="disabled-toggle" variant="warning" disabled>警告按钮</ea-button>
    <ea-button class="disabled-toggle" variant="danger" disabled>危险按钮</ea-button>
    <ea-button class="disabled-toggle" variant="info" disabled>信息按钮</ea-button>
  </div>
  <div class="row is-not-demo">
    <ea-button class="disabled-toggle" disabled plain>朴素按钮</ea-button>
    <ea-button class="disabled-toggle" variant="primary" disabled plain>主要按钮</ea-button>
    <ea-button class="disabled-toggle" variant="success" disabled plain>成功按钮</ea-button>
    <ea-button class="disabled-toggle" variant="warning" disabled plain>警告按钮</ea-button>
    <ea-button class="disabled-toggle" variant="danger" disabled plain>危险按钮</ea-button>
    <ea-button class="disabled-toggle" variant="info" disabled plain>信息按钮</ea-button>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<p><ea-switch id="switch-disabled" value="true"></ea-switch></p>
<div class="row">
  <ea-button class="disabled-toggle" disabled>默认按钮</ea-button>
  <ea-button class="disabled-toggle" variant="primary" disabled
    >主要按钮</ea-button
  >
  <ea-button class="disabled-toggle" variant="success" disabled
    >成功按钮</ea-button
  >
  <ea-button class="disabled-toggle" variant="warning" disabled
    >警告按钮</ea-button
  >
  <ea-button class="disabled-toggle" variant="danger" disabled
    >危险按钮</ea-button
  >
  <ea-button class="disabled-toggle" variant="info" disabled
    >信息按钮</ea-button
  >
</div>
<div class="row">
  <ea-button class="disabled-toggle" disabled plain>朴素按钮</ea-button>
  <ea-button class="disabled-toggle" variant="primary" disabled plain
    >主要按钮</ea-button
  >
  <ea-button class="disabled-toggle" variant="success" disabled plain
    >成功按钮</ea-button
  >
  <ea-button class="disabled-toggle" variant="warning" disabled plain
    >警告按钮</ea-button
  >
  <ea-button class="disabled-toggle" variant="danger" disabled plain
    >危险按钮</ea-button
  >
  <ea-button class="disabled-toggle" variant="info" disabled plain
    >信息按钮</ea-button
  >
</div>
```

```js
document
  .querySelector("#switch-disabled")
  .addEventListener("change", function (e) {
    document.querySelectorAll(".disabled-toggle").forEach(btn => {
      btn.toggleAttribute("disabled", e.detail.value);
    });
  });
```

:::

::::

## 不同尺寸

设置 `size` 属性配置按钮尺寸，支持 `large`、`medium`（默认）和 `small` 三种。

<div class="demo">
  <div class="row is-not-demo">
    <ea-button variant="primary" size="large">大型按钮</ea-button>
    <ea-button variant="primary">默认按钮</ea-button>
    <ea-button variant="primary" size="small">小型按钮</ea-button>
  </div>
  <div class="row is-not-demo">
    <ea-button variant="primary" icon="coffee" size="large">大型按钮</ea-button>
    <ea-button variant="primary" icon="coffee">默认按钮</ea-button>
    <ea-button variant="primary" icon="coffee" size="small">小型按钮</ea-button>
  </div>
  <div class="row is-not-demo">
    <ea-button variant="primary" round size="large">大型按钮</ea-button>
    <ea-button variant="primary" round>默认按钮</ea-button>
    <ea-button variant="primary" round size="small">小型按钮</ea-button>
  </div>
  <div class="row is-not-demo">
    <ea-button variant="primary" circle icon="coffee" size="large"></ea-button>
    <ea-button variant="primary" circle icon="coffee"></ea-button>
    <ea-button variant="primary" circle icon="coffee" size="small"></ea-button>
  </div>
</div>

::: details 查看代码

```html
<ea-button variant="primary" size="large">大型按钮</ea-button>
<ea-button variant="primary">默认按钮</ea-button>
<ea-button variant="primary" size="small">小型按钮</ea-button>

<ea-button variant="primary" icon="coffee" size="large">大型按钮</ea-button>
<ea-button variant="primary" icon="coffee">默认按钮</ea-button>
<ea-button variant="primary" icon="coffee" size="small">小型按钮</ea-button>

<ea-button variant="primary" round size="large">大型按钮</ea-button>
<ea-button variant="primary" round>默认按钮</ea-button>
<ea-button variant="primary" round size="small">小型按钮</ea-button>

<ea-button variant="primary" circle icon="coffee" size="large"></ea-button>
<ea-button variant="primary" circle icon="coffee"></ea-button>
<ea-button variant="primary" circle icon="coffee" size="small"></ea-button>
```

:::

## 按钮组

使用 `ea-button-group` 将多个按钮组合在一起，通过 `size` 和 `variant` 统一控制子按钮样式。

<div class="demo">
  <div class="row is-not-demo">
    <ea-switch id="switch-group-disabled" value="true"></ea-switch>
    <ea-button-group id="group-disabled" disabled>
      <ea-button icon="angle-left">上一页</ea-button>
      <ea-button>下一页 <ea-icon name="angle-right"></ea-icon></ea-button>
    </ea-button-group>
  </div>
  <div class="row is-not-demo">
    <ea-button-group>
      <ea-button icon="angle-left">上一页</ea-button>
      <ea-button>下一页 <ea-icon name="angle-right"></ea-icon></ea-button>
    </ea-button-group>
    <ea-button-group size="small">
      <ea-button>后退</ea-button>
      <ea-button>刷新</ea-button>
      <ea-button>前进</ea-button>
    </ea-button-group>
    <ea-button-group variant="primary">
      <ea-button>后退</ea-button>
      <ea-button>刷新</ea-button>
      <ea-button>前进</ea-button>
    </ea-button-group>
  </div>
</div>

:::: details 查看代码

::: code-group

```html [禁用控制]
<ea-switch id="switch-group-disabled" value="true"></ea-switch>
<ea-button-group id="group-disabled" disabled>
  <ea-button icon="angle-left">上一页</ea-button>
  <ea-button>下一页 <ea-icon name="angle-right"></ea-icon></ea-button>
</ea-button-group>
```

```html [基础组合]
<ea-button-group>
  <ea-button icon="angle-left">上一页</ea-button>
  <ea-button>下一页 <ea-icon name="angle-right"></ea-icon></ea-button>
</ea-button-group>
<ea-button-group size="small">
  <ea-button>后退</ea-button>
  <ea-button>刷新</ea-button>
  <ea-button>前进</ea-button>
</ea-button-group>
<ea-button-group variant="primary">
  <ea-button>后退</ea-button>
  <ea-button>刷新</ea-button>
  <ea-button>前进</ea-button>
</ea-button-group>
```

```js
document
  .querySelector("#switch-group-disabled")
  .addEventListener("change", function (e) {
    document
      .querySelector("#group-disabled")
      .toggleAttribute("disabled", e.detail.value);
  });
```

:::

::::

## 表单按钮

设置 `type` 属性为 `submit` 或 `reset`，按钮可在表单中触发提交或重置操作。

<div class="demo">
  <form id="demo-form" style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;">
    <ea-input name="username" placeholder="请输入用户名"></ea-input>
    <ea-input name="email" placeholder="请输入邮箱"></ea-input>
    <div style="display: flex; gap: 0.5rem;">
      <ea-button id="form-submit" variant="primary" type="submit">提交</ea-button>
      <ea-button id="form-reset" type="reset">重置</ea-button>
    </div>
    <span id="form-message" style="color: var(--green-500); font-size: 14px;"></span>
  </form>
</div>

:::: details 查看代码

::: code-group

```html
<form id="demo-form">
  <ea-input name="username" placeholder="请输入用户名"></ea-input>
  <ea-input name="email" placeholder="请输入邮箱"></ea-input>
  <div>
    <ea-button variant="primary" type="submit">提交</ea-button>
    <ea-button type="reset">重置</ea-button>
  </div>
</form>
```

```js
document.querySelector("#form-submit").addEventListener("click", function () {
  // 提交逻辑
});

document.querySelector("#form-reset").addEventListener("click", function () {
  // 重置逻辑
});
```

:::

::::

## 自定义样式

通过 CSS Part 选择器自定义按钮样式。

<div class="demo">
  <div class="row is-not-demo">
    <ea-button class="custom-btn" variant="primary">自定义按钮</ea-button>
  </div>
</div>

<style>
  .custom-btn::part(container) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 20px;
  }
  .custom-btn::part(container):hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  }
</style>

::: details 查看代码

```html
<ea-button class="custom-btn" variant="primary">自定义按钮</ea-button>

<style>
  .custom-btn::part(container) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 20px;
  }
  .custom-btn::part(container):hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  }
</style>
```

:::

## Button API

### Button Attributes

| 参数     | 说明         | 类型    | 可选值                                               | 默认值     |
| -------- | ------------ | ------- | ---------------------------------------------------- | ---------- |
| variant  | 按钮类型     | String  | normal / primary / success / warning / danger / info | `"normal"` |
| size     | 按钮尺寸     | String  | small / medium / large                               | `"medium"` |
| plain    | 朴素效果     | Boolean | —                                                    | false      |
| disabled | 是否禁用     | Boolean | —                                                    | false      |
| round    | 圆角按钮     | Boolean | —                                                    | false      |
| circle   | 圆形按钮     | Boolean | —                                                    | false      |
| text     | 文字按钮     | Boolean | —                                                    | false      |
| link     | 链接按钮     | Boolean | —                                                    | false      |
| href     | 链接地址     | String  | —                                                    | —          |
| target   | 链接打开方式 | String  | —                                                    | —          |
| rel      | 链接关系     | String  | —                                                    | —          |
| download | 下载文件名   | String  | —                                                    | —          |
| loading  | 加载状态     | Boolean | —                                                    | false      |
| icon     | 图标类名     | String  | —                                                    | —          |
| type     | 原生按钮类型 | String  | button / submit / reset                              | `"button"` |

### ButtonGroup Attributes

| 参数     | 说明     | 类型    | 可选值                                               | 默认值     |
| -------- | -------- | ------- | ---------------------------------------------------- | ---------- |
| disabled | 是否禁用 | Boolean | —                                                    | false      |
| size     | 按钮尺寸 | String  | small / medium / large                               | `"medium"` |
| variant  | 按钮类型 | String  | normal / primary / success / warning / danger / info | `"normal"` |

### Button CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明         |
| ------------ | ------------ |
| container    | 按钮容器     |
| icon         | 图标元素     |
| loading-icon | 加载图标元素 |

### ButtonGroup CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明       |
| --------- | ---------- |
| container | 按钮组容器 |

### Button Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 按钮内容插槽 |

### ButtonGroup Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 按钮组内容插槽 |
