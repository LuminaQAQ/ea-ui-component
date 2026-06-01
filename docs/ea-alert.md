<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // import("../dist/components/index.js")
  // import("../dist/assets/icon.css")

  import("../dist/components/ea-alert.js")
  // import("../dist/assets/icon.css")

  // ------- 自定义关闭按钮 -------
  // #region
  const customizedCloseBtnExample = {
    container: document.querySelector("#customizedCloseBtn"),

    init() {
        this.container.addEventListener("ea-close", () => {
            console.log("close");
        });
    }
  }
  customizedCloseBtnExample.init();
  // #endregion
  // ------- end -------

  // ------- 延迟属性 -------
  // #region
  const delayAttrExample = {
    showAfterAlert: document.querySelector("#showAfterAlert"),
    hideAfterAlert: document.querySelector("#hideAfterAlert"),
    autoCloseAlert: document.querySelector("#autoCloseAlert"),

    init() {
        this.showAfterAlert.addEventListener("ea-open", () => {
            console.log("open");
        });

        this.hideAfterAlert.addEventListener("ea-close", () => {
            console.log("close");
        });

        this.autoCloseAlert.addEventListener("ea-close", () => {
            console.log("auto-close");
        });
    }
  }
  delayAttrExample.init();
  // #endregion
  // ------- end -------
})
</script>

<style scoped>
ea-alert {
  margin: 20px 0 0;
}

ea-alert:first-child {
  margin: 0;
}

.with-desc-and-icon::part(icon) {
  --ea-icon-size: 1.75rem !important;
}
</style>

# Alert 警告

用于页面中展示重要的提示信息。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-alert.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-alert";
```

:::

## 自定义样式

移步到 [CSS Part](#alert-css-part) 或 [CSS Custom Properties](#alert-css-自定义属性)。

::: details 查看代码

```css
ea-alert {
  margin: 20px 0 0;
}

ea-alert:first-child {
  margin: 0;
}

.with-desc-and-icon::part(icon) {
  --ea-icon-size: 1.75rem !important;
}
```

:::

## 基本用法

Alert 组件不属于浮层元素，不会自动消失或关闭。

Alert 组件提供 5 种类型，由 `variant` 属性指定，默认值为 `info`。

<div class="demo">
  <ea-alert heading="Primary alert" variant="primary"></ea-alert>
  <ea-alert heading="Success alert" variant="success"></ea-alert>
  <ea-alert heading="Info alert" variant="info"></ea-alert>
  <ea-alert heading="Warning alert" variant="warning"></ea-alert>
  <ea-alert heading="Error alert" variant="danger"></ea-alert>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-alert heading="Primary alert" variant="primary"></ea-alert>
  <ea-alert heading="Success alert" variant="success"></ea-alert>
  <ea-alert heading="Info alert" variant="info"></ea-alert>
  <ea-alert heading="Warning alert" variant="warning"></ea-alert>
  <ea-alert heading="Error alert" variant="danger"></ea-alert>
</div>
```

:::

## 主题

Alert 组件提供了两个不同的主题：`light` 和 `dark`。

通过设置 `effect` 属性来改变主题，默认为 `light`。

<div class="demo">
  <ea-alert heading="Primary alert" variant="primary" effect="dark"></ea-alert>
  <ea-alert heading="Success alert" variant="success" effect="dark"></ea-alert>
  <ea-alert heading="Info alert" variant="info" effect="dark"></ea-alert>
  <ea-alert heading="Warning alert" variant="warning" effect="dark"></ea-alert>
  <ea-alert heading="Error alert" variant="danger" effect="dark"></ea-alert>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-alert heading="Primary alert" variant="primary" effect="dark"></ea-alert>
  <ea-alert heading="Success alert" variant="success" effect="dark"></ea-alert>
  <ea-alert heading="Info alert" variant="info" effect="dark"></ea-alert>
  <ea-alert heading="Warning alert" variant="warning" effect="dark"></ea-alert>
  <ea-alert heading="Error alert" variant="danger" effect="dark"></ea-alert>
</div>
```

:::

## 自定义关闭按钮

你可以自定义关闭按钮为文字或其他符号。

你可以设置 Alert 组件是否为可关闭状态，关闭按钮的内容以及关闭时的回调函数同样可以定制。`closable` 属性决定 Alert 组件是否可关闭，该属性接受一个 `Boolean`，默认为 `true`。你可以设置 `close-text` 属性来代替右侧的关闭图标，需要注意的是 `close-text` 必须是一个字符串。当 Alert 组件被关闭时会触发 `ea-close` 事件。

::: tip
关闭按钮使用 `<button type="button">` 元素实现，支持键盘聚焦和操作，符合无障碍访问标准。
:::

<div class="demo">
  <ea-alert heading="Unclosable alert" variant="success" closable="false"></ea-alert>
  <ea-alert
    heading="Customized close text"
    variant="info"
    close-text="Gotcha"
  ></ea-alert>
  <ea-alert
    id="customizedCloseBtn"
    heading="Alert with callback"
    variant="warning"
  ></ea-alert>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-alert
    heading="Unclosable alert"
    variant="success"
    closable="false"
  ></ea-alert>
  <ea-alert
    heading="Customized close text"
    variant="info"
    close-text="Gotcha"
  ></ea-alert>
  <ea-alert
    id="customizedCloseBtn"
    heading="Alert with callback"
    variant="warning"
  ></ea-alert>
</div>
```

```js
const customizedCloseBtn = document.querySelector("#customizedCloseBtn");
customizedCloseBtn.addEventListener("ea-close", () => {
  console.log("close");
});
```

:::

::::

## 带有 icon

你可以通过为 Alert 组件添加图标来提高可读性。

通过设置 `show-icon` 属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。或者你可以使用 `icon` slot 自定义 `icon` 内容。

<div class="demo">
  <ea-alert heading="Primary alert" variant="primary" show-icon></ea-alert>
  <ea-alert heading="Success alert" variant="success" show-icon></ea-alert>
  <ea-alert heading="Info alert" variant="info" show-icon></ea-alert>
  <ea-alert heading="Warning alert" variant="warning" show-icon></ea-alert>
  <ea-alert heading="Error alert" variant="danger" show-icon></ea-alert>
  <ea-alert heading="Error alert with custom icon" variant="danger" show-icon>
    <ea-icon slot="icon" name="bell" color="red"></ea-icon>
  </ea-alert>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-alert heading="Primary alert" variant="primary" show-icon></ea-alert>
  <ea-alert heading="Success alert" variant="success" show-icon></ea-alert>
  <ea-alert heading="Info alert" variant="info" show-icon></ea-alert>
  <ea-alert heading="Warning alert" variant="warning" show-icon></ea-alert>
  <ea-alert heading="Error alert" variant="danger" show-icon></ea-alert>
  <ea-alert heading="Error alert with custom icon" variant="danger" show-icon>
    <ea-icon slot="icon" name="bell" color="red"></ea-icon>
  </ea-alert>
</div>
```

:::

## 文字居中

使用 `center` 属性让文字水平居中。

<div class="demo">
  <ea-alert heading="Primary alert" variant="primary" center show-icon></ea-alert>
  <ea-alert heading="Success alert" variant="success" center show-icon></ea-alert>
  <ea-alert heading="Info alert" variant="info" center show-icon></ea-alert>
  <ea-alert heading="Warning alert" variant="warning" center show-icon></ea-alert>
  <ea-alert heading="Error alert" variant="danger" center show-icon></ea-alert>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-alert
    heading="Primary alert"
    variant="primary"
    center
    show-icon
  ></ea-alert>
  <ea-alert
    heading="Success alert"
    variant="success"
    center
    show-icon
  ></ea-alert>
  <ea-alert heading="Info alert" variant="info" center show-icon></ea-alert>
  <ea-alert
    heading="Warning alert"
    variant="warning"
    center
    show-icon
  ></ea-alert>
  <ea-alert heading="Error alert" variant="danger" center show-icon></ea-alert>
</div>
```

:::

## 带有辅助性文字介绍

为 Alert 组件添加一个更加详细的描述来使用户了解更多信息。

除了必填的 `heading` 属性外，你可以设置 `description` 属性来帮助你更好地介绍，我们称之为辅助性文字。辅助性文字只能存放文本内容，当内容超出长度限制时会自动换行显示。

<div class="demo">
  <ea-alert
    class="with-desc-and-icon"
    heading="Primary alert"
    variant="primary"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    heading="Success alert"
    variant="success"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    heading="Info alert"
    variant="info"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    heading="Warning alert"
    variant="warning"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    heading="Error alert"
    variant="danger"
    show-icon
  >
    More text description
  </ea-alert>
</div>

:::: details 查看代码

::: code-group

```css [图标样式]
.with-desc-and-icon::part(icon) {
  --ea-icon-size: 1.75rem !important;
}
```

```html
<div class="demo">
  <ea-alert
    class="with-desc-and-icon"
    heading="Primary alert"
    variant="primary"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    heading="Success alert"
    variant="success"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    heading="Info alert"
    variant="info"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    heading="Warning alert"
    variant="warning"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    heading="Error alert"
    variant="danger"
    show-icon
  >
    More text description
  </ea-alert>
</div>
```

:::

::::

## 延迟属性

Alert 组件支持延迟显示、延迟关闭和自动关闭功能。

- `show-after`：延迟显示，单位毫秒
- `hide-after`：延迟关闭，单位毫秒（点击关闭按钮后延迟关闭）
- `auto-close`：自动关闭的延时，单位毫秒

<div class="demo">
  <ea-alert
    id="showAfterAlert"
    heading="Primary alert that appearance after 5000 milliseconds"
    variant="primary"
    show-after="5000"
  ></ea-alert>
  <ea-alert
    id="hideAfterAlert"
    heading="Success alert that disappear after 5000 milliseconds"
    variant="success"
    hide-after="5000"
  ></ea-alert>
  <ea-alert
    id="autoCloseAlert"
    heading="Info alert that in 5000 milliseconds to be hidden"
    variant="info"
    closable="false"
    auto-close="5000"
  ></ea-alert>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-alert
    id="showAfterAlert"
    heading="Primary alert that appearance after 5000 milliseconds"
    variant="primary"
    show-after="5000"
  ></ea-alert>
  <ea-alert
    id="hideAfterAlert"
    heading="Success alert that disappear after 5000 milliseconds"
    variant="success"
    hide-after="5000"
  ></ea-alert>
  <ea-alert
    id="autoCloseAlert"
    heading="Info alert that in 5000 milliseconds to be hidden"
    variant="info"
    closable="false"
    auto-close="5000"
  ></ea-alert>
</div>
```

```js
const showAfterAlert = document.querySelector("#showAfterAlert");
const hideAfterAlert = document.querySelector("#hideAfterAlert");
const autoCloseAlert = document.querySelector("#autoCloseAlert");

showAfterAlert.addEventListener("ea-open", () => {
  console.log("open");
});

hideAfterAlert.addEventListener("ea-close", () => {
  console.log("close");
});

autoCloseAlert.addEventListener("ea-close", () => {
  console.log("auto-close");
});
```

:::

::::

## Alert API

### Alert Attributes

| 参数        | 说明                     | 类型    | 可选值                                      | 默认值 |
| ----------- | ------------------------ | ------- | ------------------------------------------- | ------ |
| heading     | Alert 标题               | String  | —                                           | ''     |
| description | 辅助性文字介绍           | String  | —                                           | ''     |
| variant     | Alert 类型               | String  | primary / success / warning / info / danger | info   |
| effect      | 选择提供的主题           | String  | light / dark                                | light  |
| close-text  | 关闭按钮自定义文本       | String  | —                                           | ''     |
| closable    | 是否可关闭               | Boolean | —                                           | true   |
| show-icon   | 是否显示图标             | Boolean | —                                           | false  |
| center      | 文字是否居中             | Boolean | —                                           | false  |
| show-after  | 延迟显示，单位毫秒       | Number  | —                                           | 0      |
| hide-after  | 延迟关闭，单位毫秒       | Number  | —                                           | 0      |
| auto-close  | 自动关闭的延时，单位毫秒 | Number  | —                                           | 0      |

### Alert CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明           |
| ------------ | -------------- |
| container    | alert 外层容器 |
| icon-wrap    | alert 图标容器 |
| icon         | alert 图标     |
| content-wrap | alert 内层容器 |
| heading      | alert 标题容器 |
| description  | alert 描述容器 |
| close-btn    | alert 关闭按钮 |
| close-icon   | alert 关闭图标 |

### Alert Slots

| 名称    | 说明                                              |
| ------- | ------------------------------------------------- |
| default | Alert 内容描述（当不设置 description 属性时生效） |
| heading | 标题的内容（当不设置 heading 属性时生效）         |
| icon    | 图标内容（当设置 show-icon 时生效）               |

### Alert Methods

| 方法名                   | 说明         | 参数 |
| ------------------------ | ------------ | ---- |
| updateContainerClasslist | 更新容器类名 | —    |

### Alert Events

| 事件名   | 说明                    | 回调参数 (event.detail) |
| -------- | ----------------------- | ----------------------- |
| ea-open  | 开启 Alert 时触发的事件 | `{}`                    |
| ea-close | 关闭 Alert 时触发的事件 | `{ visible: false }`    |

### Alert CSS Custom Properties

| 属性名                          | 说明             | 默认值                              |
| ------------------------------- | ---------------- | ----------------------------------- |
| --ea-alert-padding              | 组件内边距       | var(--spacing-md) var(--spacing-lg) |
| --ea-alert-border-radius        | 组件圆角         | var(--border-radius-sm)             |
| --ea-alert-transition           | 过渡动画时长     | var(--transition-normal)            |
| --ea-alert-icon-size            | 图标尺寸         | var(--font-size-lg)                 |
| --ea-alert-icon-margin-right    | 图标右边距       | var(--spacing-md)                   |
| --ea-alert-content-gap          | 内容间距         | var(--spacing-sm)                   |
| --ea-alert-close-position-top   | 关闭按钮顶部定位 | var(--spacing-md)                   |
| --ea-alert-close-position-right | 关闭按钮右侧定位 | var(--spacing-lg)                   |
| --ea-alert-close-icon-size      | 关闭图标尺寸     | var(--font-size-lg)                 |
| --ea-alert-close-icon-color     | 关闭图标颜色     | var(--grey-400)                     |
