<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')

    document.querySelector('#callback').addEventListener('close', (e) => {
        alert("Hello World");
    })
})
</script>

# Alert 警告

用于页面中展示重要的提示信息。

## 引入

> `js`

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-alert/index.js";
</script>
```

## 自定义样式

移步到 [CSS Part](#css-part)。

## 基本用法

页面中的非浮层元素，不会自动消失

> Alert 组件提供四种主题, 由 `type` 属性指定, 默认值为 `info`。

<div class="demo">
    <ea-alert title="成功提示的文案" type="success"></ea-alert>
    <ea-alert title="消息提示的文案"></ea-alert>
    <ea-alert title="警告提示的文案" type="warning"></ea-alert>
    <ea-alert title="错误提示的文案" type="error"></ea-alert>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-alert title="成功提示的文案" type="success"></ea-alert>
  <ea-alert title="消息提示的文案"></ea-alert>
  <ea-alert title="警告提示的文案" type="warning"></ea-alert>
  <ea-alert title="错误提示的文案" type="error"></ea-alert>
</div>
```

:::

## 主题

Alert 组件提供了两个不同的主题：`light` 和 `dark`。

<div class="demo">
    <ea-alert effect="dark" title="成功提示的文案" type="success"></ea-alert>
    <ea-alert effect="dark" title="消息提示的文案" type="info"></ea-alert>
    <ea-alert effect="dark" title="警告提示的文案" type="warning"></ea-alert>
    <ea-alert effect="dark" title="错误提示的文案" type="error"></ea-alert>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-alert effect="dark" title="成功提示的文案" type="success"></ea-alert>
  <ea-alert effect="dark" title="消息提示的文案" type="info"></ea-alert>
  <ea-alert effect="dark" title="警告提示的文案" type="warning"></ea-alert>
  <ea-alert effect="dark" title="错误提示的文案" type="error"></ea-alert>
</div>
```

:::

## 自定义关闭按钮

自定义关闭按钮为文字或其他符号。

<div class="demo">
    <ea-alert closable="false" title="不可关闭的alert" type="success"></ea-alert>
    <ea-alert close-text="知道了" title="消息提示的文案" type="info"></ea-alert>
    <ea-alert id="callback" title="警告提示的文案" type="warning"></ea-alert>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-alert closable="false" title="不可关闭的alert" type="success"></ea-alert>
  <ea-alert close-text="知道了" title="消息提示的文案" type="info"></ea-alert>
  <ea-alert id="callback" title="警告提示的文案" type="warning"></ea-alert>
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

## 带有 icon

表示某种状态时提升可读性。在元素上添加 `show-icon` 属性即可。

<div class="demo">
    <ea-alert title="成功提示的文案" type="success" show-icon></ea-alert>
    <ea-alert title="消息提示的文案" type="info" show-icon></ea-alert>
    <ea-alert title="警告提示的文案" type="warning" show-icon></ea-alert>
    <ea-alert title="错误提示的文案" type="error" show-icon></ea-alert>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-alert title="成功提示的文案" type="success" show-icon></ea-alert>
  <ea-alert title="消息提示的文案" type="info" show-icon></ea-alert>
  <ea-alert title="警告提示的文案" type="warning" show-icon></ea-alert>
  <ea-alert title="错误提示的文案" type="error" show-icon></ea-alert>
</div>
```

:::

## 文字居中

使用 `center` 属性让文字水平居中。

<div class="demo">
    <ea-alert title="成功提示的文案" type="success" center show-icon></ea-alert>
    <ea-alert title="消息提示的文案" type="info" center show-icon></ea-alert>
    <ea-alert title="警告提示的文案" type="warning" center show-icon></ea-alert>
    <ea-alert title="错误提示的文案" type="error" center show-icon></ea-alert>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-alert title="成功提示的文案" type="success" center show-icon></ea-alert>
  <ea-alert title="消息提示的文案" type="info" center show-icon></ea-alert>
  <ea-alert title="警告提示的文案" type="warning" center show-icon></ea-alert>
  <ea-alert title="错误提示的文案" type="error" center show-icon></ea-alert>
</div>
```

:::

## 带有辅助性文字介绍

包含标题和内容，解释更详细的警告。在元素上添加 `description` 属性即可。

<div class="demo">
    <ea-alert title="带辅助性文字介绍" type="success" show-icon description="中国人认为宇宙万法的那个源头🤔，
它是什么🧐，如如😋，
对吧，所以这个词叫如带，我经常说如带😍，
这个词有秘密，
如带，如带了吗？🤨如带嘛😎，
他真带了吗？如带☝🏻️🤓，
到底带没带，如带😆，
为什么说如带，他真的带了吗？😫
如带，你看看，带没带？如带。🤗"></ea-alert>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-alert
    title="带辅助性文字介绍"
    type="success"
    show-icon
    description="
    中国人认为宇宙万法的那个源头🤔，
    它是什么🧐，如如😋，
    对吧，所以这个词叫如带，我经常说如带😍，
    这个词有秘密，
    如带，如带了吗？🤨如带嘛😎，
    他真带了吗？如带☝🏻️🤓，
    到底带没带，如带😆，
    为什么说如带，他真的带了吗？😫
    如带，你看看，带没带？如带。🤗"
  ></ea-alert>
</div>
```

:::

## Attributes

| 参数        | 说明               | 类型    | 可选值                     | 默认值 |
| ----------- | ------------------ | ------- | -------------------------- | ------ |
| title       | 标题               | string  | —                          | —      |
| type        | 主题               | string  | success/warning/info/error | info   |
| description | 辅助性文字介绍     | string  | —                          | —      |
| closable    | 是否可关闭         | boolean | —                          | true   |
| center      | 文字是否居中       | boolean | —                          | false  |
| close-text  | 关闭按钮自定义文本 | string  | —                          | —      |
| show-icon   | 是否显示图标       | boolean | —                          | false  |
| effect      | 选择提供的主题     | string  | light/dark                 | light  |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明                              |
| ------------ | --------------------------------- |
| container    | alert 外层容器                    |
| content-wrap | alert 内层容器                    |
| title        | alert 内容容器(`title`属性)       |
| description  | alert 描述容器(`description`属性) |
| icon         | alert 图标                        |

## Events

| 事件名称 | 说明              | 回调参数 |
| -------- | ----------------- | -------- |
| close    | 关闭 alert 时触发 | —        |
