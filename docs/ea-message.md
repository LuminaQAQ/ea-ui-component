<script setup>
import { onMounted } from 'vue'
import { EaMessage } from "../dist/components/ea-message.js";

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

  // ------- 基础用法 -------
  // #region
  const basicExample = {
    moduleInstanceBtn: document.getElementById("moduleInstanceBtn"),
    chainInstanceBtn: document.getElementById("chainInstanceBtn"),

    init() {
      this.moduleInstanceBtn.addEventListener("click", () => {
        EaMessage({
          message: "This is a message.",
          type: "info",
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
  // #endregion
  // ------- end -------

  // ------- Placement -------
  // #region
  let topCount = 0;
  let bottomCount = 0;
  let topLeftCount = 0;
  let topRightCount = 0;
  let bottomLeftCount = 0;
  let bottomRightCount = 0;
  const openMsg = (placement = "top") => {
    let count = 0;
    let type = "success";

    switch (placement) {
      case "top":
        count = ++topCount;
        type = "success";
        break;
      case "bottom":
        count = ++bottomCount;
        type = "warning";
        break;
      case "top-left":
        count = ++topLeftCount;
        type = "info";
        break;
      case "top-right":
        count = ++topRightCount;
        type = "primary";
        break;
      case "bottom-left":
        count = ++bottomLeftCount;
        type = "warning";
        break;
      case "bottom-right":
        count = ++bottomRightCount;
        type = "error";
        break;
    }

    EaMessage({
      message: `This is a message from the ${placement} ${count}`,
      type,
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
  // #endregion
  // ------- end -------
})
</script>

# Message 消息提示

常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 引入

`js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-message/index.js";
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

## 基础用法

从顶部出现，3 秒后自动消失。

<div class="demo row">
  <ea-button
    plain
    onclick="
          window.$message({
            message: 'This is a message.',
            type: 'info',
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

::: code-group

```html
<div class="demo">
  <ea-button
    plain
    onclick="
          window.$message({
            message: 'This is a message.',
            type: 'info',
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
        type: "info",
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

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。通过设置 `option` 中的 `type` 属性来改变主题。

<div class="demo row">
  <ea-button plain onclick="window.$message.info('This is a info message.')"
    >info</ea-button
  >
  <ea-button
    type="primary"
    plain
    onclick="window.$message.primary('This is a info message.')"
    >Primary</ea-button
  >
  <ea-button
    type="success"
    plain
    onclick="
          window.$message.success('Congrats, this is a success message.')
        "
    >Success</ea-button
  >
  <ea-button
    type="warning"
    plain
    onclick="window.$message.warning('Warning, this is a warning message.')"
    >Warning</ea-button
  >
  <ea-button
    type="danger"
    plain
    onclick="window.$message.error('Oops, this is a error message.')"
    >Error</ea-button
  >
</div>

::: code-group

```html
<div class="demo">
  <ea-button plain onclick="window.$message.info('This is a info message.')"
    >info</ea-button
  >
  <ea-button
    type="primary"
    plain
    onclick="window.$message.primary('This is a info message.')"
    >Primary</ea-button
  >
  <ea-button
    type="success"
    plain
    onclick="
          window.$message.success('Congrats, this is a success message.')
        "
    >Success</ea-button
  >
  <ea-button
    type="warning"
    plain
    onclick="window.$message.warning('Warning, this is a warning message.')"
    >Warning</ea-button
  >
  <ea-button
    type="danger"
    plain
    onclick="window.$message.error('Oops, this is a error message.')"
    >Error</ea-button
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
    type="primary"
    plain
    onclick="
          window.$message({
            type: 'primary',
            message: 'This is a info message.',
            showClose: true,
          })
        "
    >Primary</ea-button
  >
  <ea-button
    type="success"
    plain
    onclick="
          window.$message({
            type: 'success',
            message: 'Congrats, this is a success message.',
            showClose: true,
          })
        "
    >Success</ea-button
  >
  <ea-button
    type="warning"
    plain
    onclick="
          window.$message({
            type: 'warning',
            message: 'Warning, this is a warning message.',
            showClose: true,
          })
        "
    >Warning</ea-button
  >
  <ea-button
    type="danger"
    plain
    onclick="
          window.$message({
            type: 'error',
            message: 'Oops, this is a error message.',
            showClose: true,
          })
        "
    >Error</ea-button
  >
  <ea-button
    plain
    onclick="
          window.$message({
            message: 'This is a info message.',
            showClose: true,
            duration: 0,
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
    type="primary"
    plain
    onclick="
          window.$message({
            type: 'primary',
            message: 'This is a info message.',
            showClose: true,
          })
        "
    >Primary</ea-button
  >
  <ea-button
    type="success"
    plain
    onclick="
          window.$message({
            type: 'success',
            message: 'Congrats, this is a success message.',
            showClose: true,
          })
        "
    >Success</ea-button
  >
  <ea-button
    type="warning"
    plain
    onclick="
          window.$message({
            type: 'warning',
            message: 'Warning, this is a warning message.',
            showClose: true,
          })
        "
    >Warning</ea-button
  >
  <ea-button
    type="danger"
    plain
    onclick="
          window.$message({
            type: 'error',
            message: 'Oops, this is a error message.',
            showClose: true,
          })
        "
    >Error</ea-button
  >
  <ea-button
    plain
    onclick="
          window.$message({
            message: 'This is a info message.',
            showClose: true,
            duration: 0,
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

::: code-group

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
  let type = "success";

  switch (placement) {
    case "top":
      count = ++topCount;
      type = "success";
      break;
    case "bottom":
      count = ++bottomCount;
      type = "warning";
      break;
    case "top-left":
      count = ++topLeftCount;
      type = "info";
      break;
    case "top-right":
      count = ++topRightCount;
      type = "primary";
      break;
    case "bottom-left":
      count = ++bottomLeftCount;
      type = "warning";
      break;
    case "bottom-right":
      count = ++bottomRightCount;
      type = "error";
      break;
  }

  EaMessage({
    message: `This is a message from the ${placement} ${count}`,
    type,
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

## Attributes

| 参数                     | 说明                                                                          | 类型        | 可选值                                                                              | 默认值 |
| ------------------------ | ----------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------- | ------ |
| message                  | 消息文字                                                                      | string      | —                                                                                   | ''     |
| type                     | 消息类型                                                                      | enum        | `'success' \| 'warning' \| 'info' \| 'error' \| info`                               | 'info' |
| showClose                | 是否显示关闭按钮                                                              | boolean     | —                                                                                   | false  |
| dangerouslyUseHTMLString | 是否将 `message` 作为 HTML 片段渲染                                           | boolean     | —                                                                                   | false  |
| duration                 | 显示时间（毫秒）。设为 0 则不会自动关闭                                       | number      | —                                                                                   | 3000   |
| onClose                  | 关闭回调函数（消息关闭或被手动关闭时调用），回调接收事件对象                  | Function    | —                                                                                   | —      |
| showClose                | 是否显示关闭按钮                                                              | boolean     | —                                                                                   | false  |
| offset                   | 设置到视口边缘的距离（当位置为`'top'`时为顶部，当位置为`'bottom'`时为底部）） | number      | —                                                                                   | 16     |
| placement                | 出现位置                                                                      | enum        | `'top' \| 'top-left' \| 'top-right' \| 'bottom' \| 'bottom-left' \| 'bottom-right'` | top    |
| appendTo                 | 设置 `message` 的根元素，默认为 `document.body`                               | CSSSelector | -                                                                                   | —      |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明                 |
| ------------ | -------------------- |
| container    | 消息整体的根元素     |
| icon         | 类型自带的图标       |
| content-wrap | 内容容器（消息文本） |
| close-icon   | 关闭按钮             |

## Events

| 事件名称 | 说明             |
| -------- | ---------------- |
| show     | 显示时触发。     |
| shown    | 显示完毕时触发。 |
| hide     | 隐藏时触发。     |
| hidden   | 隐藏完毕时触发。 |
| close    | 关闭时触发。     |

## Methods

| 名称  | 描述               | 类型                   |
| ----- | ------------------ | ---------------------- |
| close | 关闭当前的 Message | `Function: () => void` |
