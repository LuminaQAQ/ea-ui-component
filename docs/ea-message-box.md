<script setup>
import { onMounted } from 'vue'
import { EaMessage } from "../components/ea-message/MessageClass.js"

import { EaMessageBox } from "../components/ea-message-box/EaMessageBoxClass.js"

onMounted(() => {
    import('../index.js')
    import('./index.scss')

    const $message = new EaMessage();

    const $alert = new EaMessageBox();
    document.querySelector("#openAlertMessageBox").addEventListener("click", () => {
        $alert
            .open("同意该须知则意味着您同意该须知!", "是否同意该须知", {
                confirmButtonText: "同意",
            })
            .then(() => {
                $message.open("用户同意了须知");
            })
            .catch(() => {
                $message.open("用户拒绝了须知");
            });
    });


    const $confirm = new EaMessageBox();
    document.querySelector("#openConfirmMessageBox").addEventListener("click", () => {
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
})

</script>

# MessageBox 弹框

模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。

> 从场景上说，`MessageBox` 的作用是美化系统自带的 `alert`、`confirm` 和 `prompt`，因此适合展示较为简单的内容。如果需要弹出较为复杂的内容，请使用 `Dialog`。

## 使用

```js
import "./easy-component-ui/index.js";
import { EaMessageBox } from "./easy-component-ui/ea-message-box/EaMessageBoxClass.js";
```

## 消息提示

当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。

> 调用 `$alert` 方法即可打开消息提示，它模拟了系统的 `alert`，无法通过按下 ESC 或点击框外关闭。此例中依顺序接收了三个参数，`message` 、 `title` 和 `options` 的 `confirmButtonText(显示确认按钮)`。值得一提的是，窗口被关闭后，它默认会返回一个 `Promise` 对象便于进行后续操作的处理。

<div class="demo">
    <ea-button type="primary" id="openAlertMessageBox">是否同意</ea-button>
</div>

```html
<div class="demo">
  <ea-button type="primary" id="openAlertMessageBox">是否同意</ea-button>
</div>
```

```js
const $alert = new EaMessageBox();
document.querySelector("#openAlertMessageBox").addEventListener("click", () => {
  $confirm
    .open("同意该须知则意味着您同意该须知", "是否同意该须知", {
      confirmButtonText: "同意",
    })
    .then(() => {
      $message.open("用户取消了确认");
    })
    .catch(() => {
      $message.open("用户取消了取消");
    });
});
```

## 确认消息

提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。

> 调用 `$confirm` 方法即可打开消息提示，它模拟了系统的 `confirm`，无法通过按下 ESC 或点击框外关闭。此例中依顺序接收了三个参数，`message` 、 `title` 和 `options` 的 `confirmButtonText(显示确认按钮)` 和 `cancelButtonText(显示取消按钮)`。值得一提的是，窗口被关闭后，它默认会返回一个 `Promise` 对象便于进行后续操作的处理。

<div class="demo">
    <ea-button type="primary" id="openConfirmMessageBox">是否取消确认</ea-button>
</div>

```html
<div class="demo">
  <ea-button type="primary" id="openMessageBox">是否取消确认</ea-button>
</div>
```

```js
const $confirm = new EaMessageBox();
document.querySelector("#openMessageBox").addEventListener("click", () => {
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

## Attributes

| 参数              | 说明         | 类型   | 默认值 |
| ----------------- | ------------ | ------ | ------ |
| title             | 标题         | String | -      |
| content           | 内容         | String | -      |
| confirmButtonText | 确认按钮文本 | String | 确认   |
| cancelButtonText  | 取消按钮文本 | String | 取消   |
