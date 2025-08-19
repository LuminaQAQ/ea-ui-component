<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

  // ------- 自定义关闭按钮 -------
  // #region
  const customizedCloseBtnExample = {
    container: document.querySelector("#customizedCloseBtn"),

    init() {
        this.container.addEventListener("close", () => {
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
        this.showAfterAlert.addEventListener("open", () => {
            console.log("open");
        });

        this.hideAfterAlert.addEventListener("close", () => {
            console.log("close");
        });

        this.autoCloseAlert.addEventListener("close", () => {
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

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-alert/index.js";
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

::: code-group

```css [所有示例通用的 style]
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

Alert 组件提供 5 种类型，由 `type` 属性指定，默认值为 `info`。

<div class="demo">
  <ea-alert title="Primary alert" type="primary"></ea-alert>
  <ea-alert title="Success alert" type="success"></ea-alert>
  <ea-alert title="Info alert" type="info"></ea-alert>
  <ea-alert title="Warning alert" type="warning"></ea-alert>
  <ea-alert title="Error alert" type="error"></ea-alert>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-alert title="Primary alert" type="primary"></ea-alert>
  <ea-alert title="Success alert" type="success"></ea-alert>
  <ea-alert title="Info alert" type="info"></ea-alert>
  <ea-alert title="Warning alert" type="warning"></ea-alert>
  <ea-alert title="Error alert" type="error"></ea-alert>
</div>
```

:::

## 主题

Alert 组件提供了两个不同的主题：`light` 和 `dark`。

通过设置 `effect` 属性来改变主题，默认为 `light`。

<div class="demo">
  <ea-alert title="Primary alert" type="primary" effect="dark"></ea-alert>
  <ea-alert title="Success alert" type="success" effect="dark"></ea-alert>
  <ea-alert title="Info alert" type="info" effect="dark"></ea-alert>
  <ea-alert title="Warning alert" type="warning" effect="dark"></ea-alert>
  <ea-alert title="Error alert" type="error" effect="dark"></ea-alert>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-alert title="Primary alert" type="primary" effect="dark"></ea-alert>
  <ea-alert title="Success alert" type="success" effect="dark"></ea-alert>
  <ea-alert title="Info alert" type="info" effect="dark"></ea-alert>
  <ea-alert title="Warning alert" type="warning" effect="dark"></ea-alert>
  <ea-alert title="Error alert" type="error" effect="dark"></ea-alert>
</div>
```

:::

## 自定义关闭按钮

你可以自定义关闭按钮为文字或其他符号。

你可以设置 Alert 组件是否为可关闭状态， 关闭按钮的内容以及关闭时的回调函数同样可以定制。 `closable` 属性决定 Alert 组件是否可关闭， 该属性接受一个 `Boolean`，默认为 `false`。 你可以设置 `close-text` 属性来代替右侧的关闭图标， 需要注意的是 `close-text` 必须是一个字符串。 当 Alert 组件被关闭时会触发 `close` 事件。

<div class="demo">
  <ea-alert title="Unclosable alert" type="success" closable="false"></ea-alert>
  <ea-alert
    title="Customized close text"
    type="info"
    close-text="Gotcha"
  ></ea-alert>
  <ea-alert
    id="customizedCloseBtn"
    title="Alert with callback"
    type="warning"
  ></ea-alert>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-alert title="Unclosable alert" type="success" closable="false"></ea-alert>
  <ea-alert
    title="Customized close text"
    type="info"
    close-text="Gotcha"
  ></ea-alert>
  <ea-alert
    id="customizedCloseBtn"
    title="Alert with callback"
    type="warning"
  ></ea-alert>
</div>
```

`js`: 在该元素上添加 `close` 事件即可。

```js
const callbackAlert = document.querySelector("#callback");
callbackAlert.addEventListener("close", (e) => {
  alert("Hello World");
});
```

:::

## 使用图标 ​

你可以通过为 Alert 组件添加图标来提高可读性。

通过设置 `show-icon` 属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。 或者你可以使用 `icon` slot 自定义 `icon` 内容。

<div class="demo">
  <ea-alert title="Primary alert" type="primary" show-icon></ea-alert>
  <ea-alert title="Success alert" type="success" show-icon></ea-alert>
  <ea-alert title="Info alert" type="info" show-icon></ea-alert>
  <ea-alert title="Warning alert" type="warning" show-icon></ea-alert>
  <ea-alert title="Error alert" type="error" show-icon></ea-alert>
  <ea-alert title="Error alert with custom icon" type="error" show-icon>
    <ea-icon slot="icon" icon="icon-bell" color="red" style=""></ea-icon>
  </ea-alert>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-alert title="Primary alert" type="primary" show-icon></ea-alert>
  <ea-alert title="Success alert" type="success" show-icon></ea-alert>
  <ea-alert title="Info alert" type="info" show-icon></ea-alert>
  <ea-alert title="Warning alert" type="warning" show-icon></ea-alert>
  <ea-alert title="Error alert" type="error" show-icon></ea-alert>
  <ea-alert title="Error alert with custom icon" type="error" show-icon>
    <ea-icon slot="icon" icon="icon-bell" color="red" style=""></ea-icon>
  </ea-alert>
</div>
```

:::

## 文字居中

使用 `center` 属性让文字水平居中。

<div class="demo">
  <ea-alert title="Primary alert" type="primary" center show-icon></ea-alert>
  <ea-alert title="Success alert" type="success" center show-icon></ea-alert>
  <ea-alert title="Info alert" type="info" center show-icon></ea-alert>
  <ea-alert title="Warning alert" type="warning" center show-icon></ea-alert>
  <ea-alert title="Error alert" type="error" center show-icon></ea-alert>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-alert title="Primary alert" type="primary" center show-icon></ea-alert>
  <ea-alert title="Success alert" type="success" center show-icon></ea-alert>
  <ea-alert title="Info alert" type="info" center show-icon></ea-alert>
  <ea-alert title="Warning alert" type="warning" center show-icon></ea-alert>
  <ea-alert title="Error alert" type="error" center show-icon></ea-alert>
</div>
```

:::

## 带有辅助性文字介绍

为 Alert 组件添加一个更加详细的描述来使用户了解更多信息。

除了必填的 `title` 属性外，你可以设置 `description` 属性来帮助你更好地介绍，我们称之为辅助性文字。 辅助性文字只能存放文本内容，当内容超出长度限制时会自动换行显示。

<div class="demo">
  <ea-alert
    class="with-desc-and-icon"
    title="Primary alert"
    type="primary"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    title="Success alert"
    type="success"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    title="Info alert"
    type="info"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    title="Warning alert"
    type="warning"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    title="Error alert"
    type="error"
    description="More text description"
    show-icon
  ></ea-alert>
</div>

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
    title="Primary alert"
    type="primary"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    title="Success alert"
    type="success"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    title="Info alert"
    type="info"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    title="Warning alert"
    type="warning"
    description="More text description"
    show-icon
  ></ea-alert>
  <ea-alert
    class="with-desc-and-icon"
    title="Error alert"
    type="error"
    description="More text description"
    show-icon
  ></ea-alert>
</div>
```

:::

## 延迟属性

在最后, 这是一个延迟属性的例子。

<div class="demo">
  <ea-alert
    id="showAfterAlert"
    title="Primary alert that appearance after 5000 milliseconds"
    type="primary"
    show-after="5000"
  ></ea-alert>
  <ea-alert
    id="hideAfterAlert"
    title="Success alert that disappear after 5000 milliseconds"
    type="success"
    hide-after="5000"
  ></ea-alert>
  <ea-alert
    id="autoCloseAlert"
    title="Info alert that in 5000 milliseconds to be hidden"
    type="info"
    closable="false"
    auto-close="5000"
  ></ea-alert>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-alert
    id="showAfterAlert"
    title="Primary alert that appearance after 5000 milliseconds"
    type="primary"
    show-after="5000"
  ></ea-alert>
  <ea-alert
    id="hideAfterAlert"
    title="Success alert that disappear after 5000 milliseconds"
    type="success"
    hide-after="5000"
  ></ea-alert>
  <ea-alert
    id="autoCloseAlert"
    title="Info alert that in 5000 milliseconds to be hidden"
    type="info"
    closable="false"
    auto-close="5000"
  ></ea-alert>
</div>
```

:::

## Alert API

| 参数        | 说明                           | 类型    | 可选值                                                                | 默认值 |
| ----------- | ------------------------------ | ------- | --------------------------------------------------------------------- | ------ |
| title       | Alert 标题。                   | string  | —                                                                     | —      |
| type        | Alert 类型。                   | string  | `'primary'  \| 'success' \| 'warning' \| 'info' \| 'error' \| 'info'` | info   |
| description | 辅助性文字介绍                 | string  | —                                                                     | —      |
| closable    | 是否可关闭                     | boolean | —                                                                     | true   |
| center      | 文字是否居中                   | boolean | —                                                                     | false  |
| close-text  | 关闭按钮自定义文本             | string  | —                                                                     | —      |
| show-icon   | 是否显示图标                   | boolean | —                                                                     | false  |
| effect      | 选择提供的主题                 | string  | `'light' \| 'dark'`                                                   | light  |
| show-after  | 在触发后多久显示内容，单位毫秒 | number  | —                                                                     | 0      |
| hide-after  | 延迟关闭，单位毫秒             | number  | —                                                                     | 200    |
| auto-close  | 是否自动关闭的延时，单位毫秒   | boolean | —                                                                     | 0      |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明                              |
| ------------ | --------------------------------- |
| container    | alert 外层容器                    |
| icon-wrap    | alert 图标容器                    |
| icon         | alert 图标                        |
| content-wrap | alert 内层容器                    |
| title        | alert 标题容器(`title`属性)       |
| description  | alert 描述容器(`description`属性) |
| close-btn    | alert 关闭按钮容器                |
| close-icon   | alert 关闭图标                    |

## Events

| 事件名称 | 说明                    | 回调参数     |
| -------- | ----------------------- | ------------ |
| open     | 开启 Alert 时触发的事件 | `() => void` |
| close    | 关闭 alert 时触发       | `() => void` |

## Slots

| 名称  | 描述           |
| ----- | -------------- |
| -     | Alert 内容描述 |
| title | 标题的内容     |
| icon  | 图标内容       |
