<script setup>
import { onMounted } from 'vue'
import { EaMessage } from "../dist/components/ea-message.js";

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

  const basicExample = {
    moduleInstanceBtn: document.getElementById("moduleInstanceBtn"),
    chainInstanceBtn: document.getElementById("chainInstanceBtn"),

    init() {
      this.moduleInstanceBtn.addEventListener("click", () => {
        EaMessage({
          message: "This is a message.",
          variant: "info",
          showClose: false,
          duration: 3000,
        });
      });

      this.chainInstanceBtn.addEventListener("click", () => {
        EaMessage.info("This is a message.");
      });
    },
  };
  basicExample.init();

  let topCount = 0;
  let bottomCount = 0;
  let topLeftCount = 0;
  let topRightCount = 0;
  let bottomLeftCount = 0;
  let bottomRightCount = 0;
  const openMsg = (placement = "top") => {
    let count = 0;
    let variant = "success";

    switch (placement) {
      case "top":
        count = ++topCount;
        variant = "success";
        break;
      case "bottom":
        count = ++bottomCount;
        variant = "warning";
        break;
      case "top-left":
        count = ++topLeftCount;
        variant = "info";
        break;
      case "top-right":
        count = ++topRightCount;
        variant = "primary";
        break;
      case "bottom-left":
        count = ++bottomLeftCount;
        variant = "warning";
        break;
      case "bottom-right":
        count = ++bottomRightCount;
        variant = "danger";
        break;
    }

    EaMessage({
      message: `This is a message from the ${placement} ${count}`,
      variant,
      placement,
    });
  };
  const placementExample = {
    els: document.querySelectorAll("#placementSection ea-button"),

    init() {
      this.els.forEach(el => {
        el.addEventListener("click", () => {
          const placement = el.textContent
            .trim()
            .toLocaleLowerCase()
            ?.replace(" ", "-");

          openMsg(placement);
        });
      });
    },
  };
  placementExample.init();
})
</script>

# Message 消息提示

常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-message.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-message";
```

:::

## 自定义样式

移步到 [CSS Part](#message-css-part)。

## 基础用法

从顶部出现，3 秒后自动消失。

<div class="demo row">
  <ea-button
    plain
    onclick="
          window.$message({
            message: 'This is a message.',
            variant: 'info',
            showClose: false,
            duration: 3000,
          })
        "
  >
    Show message
  </ea-button>
  <ea-button id="moduleInstanceBtn" plain>
    Module-Instance message
  </ea-button>
  <ea-button id="chainInstanceBtn" plain>
    Chain-Instance message
  </ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-button
    plain
    onclick="
          window.$message({
            message: 'This is a message.',
            variant: 'info',
            showClose: false,
            duration: 3000,
          })
        "
  >
    Show message
  </ea-button>
  <ea-button id="moduleInstanceBtn" plain> Module-Instance message </ea-button>
  <ea-button id="chainInstanceBtn" plain> Chain-Instance message </ea-button>
</div>
```

```js
const basicExample = {
  moduleInstanceBtn: document.getElementById("moduleInstanceBtn"),
  chainInstanceBtn: document.getElementById("chainInstanceBtn"),

  init() {
    this.moduleInstanceBtn.addEventListener("click", () => {
      EaMessage({
        message: "This is a message.",
        variant: "info",
        showClose: false,
        duration: 3000,
      });
    });

    this.chainInstanceBtn.addEventListener("click", () => {
      EaMessage.info("This is a message.");
    });
  },
};
basicExample.init();
```

:::

::::

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。通过设置 `option` 中的 `variant` 属性来改变主题。

<div class="demo row">
  <ea-button plain onclick="window.$message.info('This is a info message.')"
    >info</ea-button
  >
  <ea-button
    variant="primary"
    plain
    onclick="window.$message.primary('This is a primary message.')"
    >Primary</ea-button
  >
  <ea-button
    variant="success"
    plain
    onclick="
          window.$message.success('Congrats, this is a success message.')
        "
    >Success</ea-button
  >
  <ea-button
    variant="warning"
    plain
    onclick="window.$message.warning('Warning, this is a warning message.')"
    >Warning</ea-button
  >
  <ea-button
    variant="danger"
    plain
    onclick="window.$message.danger('Oops, this is a danger message.')"
    >Danger</ea-button
  >
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-button plain onclick="window.$message.info('This is a info message.')"
    >info</ea-button
  >
  <ea-button
    variant="primary"
    plain
    onclick="window.$message.primary('This is a primary message.')"
    >Primary</ea-button
  >
  <ea-button
    variant="success"
    plain
    onclick="
          window.$message.success('Congrats, this is a success message.')
        "
    >Success</ea-button
  >
  <ea-button
    variant="warning"
    plain
    onclick="window.$message.warning('Warning, this is a warning message.')"
    >Warning</ea-button
  >
  <ea-button
    variant="danger"
    plain
    onclick="window.$message.danger('Oops, this is a danger message.')"
    >Danger</ea-button
  >
</div>
```

:::

## 可关闭

使用 `showClose` 属性可以让消息提示显示关闭按钮。使用 `duration` 属性可以让消息提示按照既定的时间自动消失, 若 `duration` 设置为 `0` , 则该消息提示不会自动消失。

<div class="demo row">
  <ea-button
    plain
    onclick="
          window.$message({
            message: 'This is a info message.',
            showClose: true,
          })
        "
    >info</ea-button
  >
  <ea-button
    variant="primary"
    plain
    onclick="
          window.$message({
            variant: 'primary',
            message: 'This is a primary message.',
            showClose: true,
          })
        "
    >Primary</ea-button
  >
  <ea-button
    variant="success"
    plain
    onclick="
          window.$message({
            variant: 'success',
            message: 'Congrats, this is a success message.',
            showClose: true,
          })
        "
    >Success</ea-button
  >
  <ea-button
    variant="warning"
    plain
    onclick="
          window.$message({
            variant: 'warning',
            message: 'Warning, this is a warning message.',
            showClose: true,
          })
        "
    >Warning</ea-button
  >
  <ea-button
    variant="danger"
    plain
    onclick="
          window.$message({
            variant: 'danger',
            message: 'Oops, this is a danger message.',
            showClose: true,
          })
        "
    >Danger</ea-button
  >
  <ea-button
    plain
    onclick="
          window.$message({
            message: 'This is a info message.',
            showClose: true,
            duration: 0,
            icon: 'circle-info',
          })
        "
    >Won't close automatically</ea-button
  >
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-button
    plain
    onclick="
          window.$message({
            message: 'This is a info message.',
            showClose: true,
          })
        "
    >info</ea-button
  >
  <ea-button
    variant="primary"
    plain
    onclick="
          window.$message({
            variant: 'primary',
            message: 'This is a primary message.',
            showClose: true,
          })
        "
    >Primary</ea-button
  >
  <ea-button
    variant="success"
    plain
    onclick="
          window.$message({
            variant: 'success',
            message: 'Congrats, this is a success message.',
            showClose: true,
          })
        "
    >Success</ea-button
  >
  <ea-button
    variant="warning"
    plain
    onclick="
          window.$message({
            variant: 'warning',
            message: 'Warning, this is a warning message.',
            showClose: true,
          })
        "
    >Warning</ea-button
  >
  <ea-button
    variant="danger"
    plain
    onclick="
          window.$message({
            variant: 'danger',
            message: 'Oops, this is a danger message.',
            showClose: true,
          })
        "
    >Danger</ea-button
  >
  <ea-button
    plain
    onclick="
          window.$message({
            message: 'This is a info message.',
            showClose: true,
            duration: 0,
            icon: 'circle-info',
          })
        "
    >Won't close automatically</ea-button
  >
</div>
```

:::

## 使用 HTML 片段作为正文内容

`message` 还支持使用 HTML 字符串作为正文内容。

将`dangerouslyUseHTMLString`属性设置为 `true`,`message` 就会被当作 HTML 片段处理。

<div class="demo">
  <ea-button
    plain
    onclick="
          window.$message({
            dangerouslyUseHTMLString: true,
            message: '<strong>This is <i>HTML</i> string</strong>',
          })
        "
  >
    Use HTML string
  </ea-button>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-button
    plain
    onclick="
          window.$message({
            dangerouslyUseHTMLString: true,
            message: '<strong>This is <i>HTML</i> string</strong>',
          })
        "
  >
    Use HTML string
  </ea-button>
</div>
```

:::

## Placement

<div id="placementSection" class="demo row">
  <ea-button plain> Top </ea-button>
  <ea-button plain> Top Left </ea-button>
  <ea-button plain> Top Right </ea-button>
  <ea-button plain> Bottom </ea-button>
  <ea-button plain> Bottom Left </ea-button>
  <ea-button plain> Bottom Right </ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div id="placementSection" class="demo">
  <ea-button plain> Top </ea-button>
  <ea-button plain> Top Left </ea-button>
  <ea-button plain> Top Right </ea-button>
  <ea-button plain> Bottom </ea-button>
  <ea-button plain> Bottom Left </ea-button>
  <ea-button plain> Bottom Right </ea-button>
</div>
```

```js
let topCount = 0;
let bottomCount = 0;
let topLeftCount = 0;
let topRightCount = 0;
let bottomLeftCount = 0;
let bottomRightCount = 0;
const openMsg = (placement = "top") => {
  let count = 0;
  let variant = "success";

  switch (placement) {
    case "top":
      count = ++topCount;
      variant = "success";
      break;
    case "bottom":
      count = ++bottomCount;
      variant = "warning";
      break;
    case "top-left":
      count = ++topLeftCount;
      variant = "info";
      break;
    case "top-right":
      count = ++topRightCount;
      variant = "primary";
      break;
    case "bottom-left":
      count = ++bottomLeftCount;
      variant = "warning";
      break;
    case "bottom-right":
      count = ++bottomRightCount;
      variant = "danger";
      break;
  }

  EaMessage({
    message: `This is a message from the ${placement} ${count}`,
    variant,
    placement,
  });
};
const placementExample = {
  els: document.querySelectorAll("#placementSection ea-button"),

  init() {
    this.els.forEach(el => {
      el.addEventListener("click", () => {
        const placement = el.textContent
          .trim()
          .toLocaleLowerCase()
          ?.replace(" ", "-");

        openMsg(placement);
      });
    });
  },
};
placementExample.init();
```

:::

::::

## Message API

### Message Attributes

| 参数                     | 说明                                                                        | 类型        | 可选值                                                                                          | 默认值 |
| ------------------------ | --------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------- | ------ |
| message                  | 消息文字                                                                    | string      | —                                                                                               | ''     |
| variant                  | 消息类型                                                                    | enum        | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'`                                     | 'info' |
| icon                     | 自定义图标                                                                  | string      | —                                                                                               | ''     |
| dangerouslyUseHTMLString | 是否将 `message` 作为 HTML 片段渲染                                         | boolean     | —                                                                                               | false  |
| duration                 | 显示时间（毫秒）。设为 0 则不会自动关闭                                     | number      | —                                                                                               | 3000   |
| onClose                  | 关闭回调函数（消息关闭或被手动关闭时调用），回调接收事件对象                | Function    | —                                                                                               | —      |
| showClose                | 是否显示关闭按钮                                                            | boolean     | —                                                                                               | false  |
| offset                   | 设置到视口边缘的距离（当位置为`'top'`时为顶部，当位置为`'bottom'`时为底部） | number      | —                                                                                               | 0      |
| placement                | 出现位置                                                                    | enum        | `'top' \| 'top-left' \| 'top-right' \| 'bottom' \| 'bottom-left' \| 'bottom-right' \| 'middle'` | 'top'  |
| appendTo                 | 设置 `message` 的根元素，默认为 `document.body`                             | CSSSelector | -                                                                                               | —      |

### Message CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明                 |
| ------------ | -------------------- |
| container    | 消息整体的根元素     |
| icon         | 类型自带的图标       |
| content-wrap | 内容容器（消息文本） |
| close-icon   | 关闭按钮             |

### Message Events

| 事件名称  | 说明           | 回调参数(event.detail) |
| --------- | -------------- | ---------------------- |
| ea-close  | 关闭时触发     | `{ visible: false }`   |
| ea-show   | 显示时触发     | —                      |
| ea-shown  | 显示完毕时触发 | —                      |
| ea-hide   | 隐藏时触发     | —                      |
| ea-hidden | 隐藏完毕时触发 | —                      |

### Message Methods

| 名称  | 描述               | 类型                   |
| ----- | ------------------ | ---------------------- |
| close | 关闭当前的 Message | `Function: () => void` |

### Message CSS Custom Properties

| 属性名                        | 说明         | 默认值                   |
| ----------------------------- | ------------ | ------------------------ |
| --ea-message-z-index          | 组件层级     | 2000                     |
| --ea-message-y                | 垂直偏移量   | 0                        |
| --ea-message-fade-out-y       | 消失方向偏移 | -100%                    |
| --ea-message-offset           | 初始偏移距离 | 0                        |
| --ea-message-spacing          | 内边距       | var(--spacing-md)        |
| --ea-message-border-color     | 边框颜色     | var(--grey-200)          |
| --ea-message-border-radius    | 圆角大小     | var(--border-radius-sm)  |
| --ea-message-min-width        | 最小宽度     | 380px                    |
| --ea-message-font-size        | 字体大小     | var(--font-size-md)      |
| --ea-message-transition       | 过渡动画时长 | var(--transition-normal) |
| --ea-message-gap              | 元素间距     | var(--spacing-md)        |
| --ea-message-close-icon-color | 关闭图标颜色 | var(--grey-500)          |
