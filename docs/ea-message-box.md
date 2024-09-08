<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../components/ea-message-box/index.js')
    import('../components/ea-message/index.js')

    import('./index.scss')

    // ------- 消息提示 -------
    // #region
    const alertBtn = document.querySelector("#openAlertMessageBox");
    alertBtn.addEventListener("click", () => {
        $alert
            .open("同意该须知则意味着您同意该须知", "是否同意该须知", {
                confirmButtonText: "同意",
            })
            .then(() => {
                $message.open("用户同意了同意");
            }).catch(() => {
                $message.open("用户不同意了同意");
            });
    });
    // #endregion
    // ------- end -------

    // ------- 确认消息 -------
    // #region
    const confirmBtn = document.querySelector("#openconfirmMessageBox");
    confirmBtn.addEventListener("click", () => {
        $confirm
            .open("这是一段内容", "确认取消确认", {
                confirmButtonText: "确认取消",
                cancelButtonText: "取消确认",
            })
            .then(() => {
                $message.open("用户取消了确认");
            })
            .catch(() => {
                $message.open("用户取消了取消");
            });
    });
    // #endregion
    // ------- end -------

    // ------- 提交内容 -------
    // #region
    const promptBtn = document.querySelector("#openPromptMessageBox");
    promptBtn.addEventListener("click", () => {
        $prompt
            .open("请输入邮箱", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPlaceholder: "请输入邮箱",
                reg: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
                invalidMessage: "请输入正确的邮箱",
            })
            .then((msg) => {
                console.log(msg);
                $message.open("用户取消了确认");
            })
            .catch(() => {
                $message.open("用户取消了取消");
            });
    });
    // #endregion
    // ------- end -------
})

</script>

# MessageBox 弹框

模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-message-box/index.js";
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

## 消息提示

当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。

::: tip
调用 `$alert` 方法即可打开消息提示，它模拟了系统的 `alert`，无法通过按下 ESC 或点击框外关闭。此例中依顺序接收了三个参数，`message` 、 `title` 和 `options` 的 `confirmButtonText(显示确认按钮)`。值得一提的是，窗口被关闭后，它默认会返回一个 `Promise` 对象便于进行后续操作的处理。
:::

<div class="demo">
    <ea-button type="primary" id="openAlertMessageBox">是否同意</ea-button>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-button type="primary" id="openAlertMessageBox">是否同意</ea-button>
</div>
```

`js`

```js
const alertBtn = document.querySelector("#openAlertMessageBox");
alertBtn.addEventListener("click", () => {
  $alert
    .open("同意该须知则意味着您同意该须知", "是否同意该须知", {
      confirmButtonText: "同意",
    })
    .then(() => {
      $message.open("用户同意了同意");
    })
    .catch(() => {
      $message.open("用户不同意了同意");
    });
});
```

:::

## 确认消息

提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。

:::tip
调用 `$confirm` 方法即可打开消息提示，它模拟了系统的 `confirm`，无法通过按下 ESC 或点击框外关闭。此例中依顺序接收了三个参数，`message` 、 `title` 和 `options` 的 `confirmButtonText(显示确认按钮)` 和 `cancelButtonText(显示取消按钮)`。值得一提的是，窗口被关闭后，它默认会返回一个 `Promise` 对象便于进行后续操作的处理。
:::

<div class="demo">
    <ea-button type="primary" id="openconfirmMessageBox">是否取消确认</ea-button>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-button type="primary" id="openMessageBox">是否取消确认</ea-button>
</div>
```

`js`

```js
const confirmBtn = document.querySelector("#openconfirmMessageBox");
confirmBtn.addEventListener("click", () => {
  $confirm
    .open("这是一段内容", "确认取消确认", {
      confirmButtonText: "确认取消",
      cancelButtonText: "取消确认",
    })
    .then(() => {
      $message.open("用户取消了确认");
    })
    .catch(() => {
      $message.open("用户取消了取消");
    });
});
```

:::

## 提交内容

当用户进行操作时会被触发，中断用户操作，提示用户进行输入的对话框。

:::tip
调用 `$prompt` 方法即可打开消息提示，它模拟了系统的 `prompt`。可以用 `reg` 字段自己规定匹配模式。当验证通过时, `Promise` 会返回一个用户的输入值，否则返回一个 `reject` 对象。
:::

<div class="demo">
  <ea-button type="primary" id="openPromptMessageBox">提交内容</ea-button>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-button type="primary" id="openPromptMessageBox">提交内容</ea-button>
</div>
```

`js`

```js
const promptBtn = document.querySelector("#openPromptMessageBox");
promptBtn.addEventListener("click", () => {
  $prompt
    .open("请输入邮箱", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      reg: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
      invalidMessage: "请输入正确的邮箱",
    })
    .then((res) => {
      console.log(res);
      $message.open("用户取消了确认");
    })
    .catch(() => {
      $message.open("用户取消了取消");
    });
});
```

:::

## Attributes

| 参数              | 说明         | 类型   | 默认值 |
| ----------------- | ------------ | ------ | ------ |
| title             | 标题         | String | -      |
| content           | 内容         | String | -      |
| confirmButtonText | 确认按钮文本 | String | 确认   |
| cancelButtonText  | 取消按钮文本 | String | 取消   |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称                                     | 说明         |
| ---------------------------------------- | ------------ |
| container                                | 外层容器     |
| dialog-body                              | 主要内容容器 |
| dialog-header                            | 顶部容器     |
| dialog-title                             | 标题容器     |
| close-icon                               | 关闭按钮     |
| dialog-content                           | 内容容器     |
| dialog-content-text                      | 内容文本     |
| **(仅 `$prompt` 方式有效)** dialog-input | 输入框容器   |
| dialog-footer                            | 底部容器     |
| footer-cancel-button                     | 取消按钮     |
| footer-confirm-button                    | 确认按钮     |
| mask-wrap                                | 遮罩层容器   |
