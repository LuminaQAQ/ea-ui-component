<script setup>
import { onMounted } from 'vue'
import { EaNotification } from "../dist/components/ea-notification.js";

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

    // ------- 基础用法 -------
    // #region
    const basicExample = {
    btn1: document.querySelector("#basicSection #basic1"),
    btn2: document.querySelector("#basicSection #basic2"),

    init() {
        this.btn1.addEventListener("click", () => {
        EaNotification({
            title: "Title",
            message: "This is a message that automatically close",
        });
        });

        this.btn2.addEventListener("click", () => {
        EaNotification({
            title: "Prompt",
            message: "This is a message that does not automatically close",
            duration: 0,
        });
        });
    },
    };
    basicExample.init();
    // #endregion
    // ------- end -------

    // ------- 不同类型的通知 -------
    // #region
    const typeExample = {
    btns: document.querySelectorAll("#typeSection ea-button"),

    init() {
        this.btns.forEach(btn => {
        btn.addEventListener("click", () => {
            EaNotification({
            type: btn.textContent.toLowerCase(),
            title: btn.textContent,
            message: "This is a message",
            });
        });
        });
    },
    };
    typeExample.init();
    // #endregion
    // ------- end -------

    // ------- 自定义消息弹出的位置 -------
    // #region
    const placementExample = {
    btns: document.querySelectorAll("#placementSection ea-button"),
    init() {
        this.btns.forEach(btn => {
        btn.addEventListener("click", () => {
            EaNotification({
            title: "Custom Position",
            message: "This is a message",
            placement: btn.textContent
                .trim()
                .toLowerCase()
                .replace(" ", "-"),
            });
        });
        });
    },
    };
    placementExample.init();
    // #endregion
    // ------- end -------

    // ------- 使用 HTML 片段作为正文内容 -------
    // #region
    const htmlExample = {
    btn: document.querySelector("#useHTMLSection ea-button"),
    init() {
        this.btn.addEventListener("click", () => {
        EaNotification({
            title: "HTML String",
            dangerouslyUseHTMLString: true,
            message: "<strong>This is <i>HTML</i> string</strong>",
        });
        });
    },
    };
    htmlExample.init();
    // #endregion
    // ------- end -------

    // ------- 隐藏关闭按钮 -------
    // #region
    const hideCloseExample = {
    btn: document.querySelector("#hideCloseSection ea-button"),
    init() {
        this.btn.addEventListener("click", async () => {
        EaNotification.success({
            title: "Info",
            message: "This is a message without close button",
            showClose: false,
        });
        });
    },
    };
    hideCloseExample.init();
    // #endregion
    // ------- end -------
})
</script>

# Notification 通知

用于系统级通知或轻量级提醒，常用于页面右上角或指定位置短暂提示。

## 引入

`js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-notification/index.js";
</script>
```

> `css`

::: tip
如果需要使用图标，请提前引入图标样式文件
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 基础用法

从 `placement` 指定的位置出现，默认 3 秒后自动消失。

<div id="basicSection" class="demo row left">
  <ea-button id="basic1" plain> Closes automatically </ea-button>
  <ea-button id="basic2" plain> Won't close automatically </ea-button>
</div>

::: code-group

```html
<div id="basicSection" class="demo row left">
  <ea-button id="basic1" plain> Closes automatically </ea-button>
  <ea-button id="basic2" plain> Won't close automatically </ea-button>
</div>
```

```js
const basicExample = {
  btn1: document.querySelector("#basicSection #basic1"),
  btn2: document.querySelector("#basicSection #basic2"),

  init() {
    this.btn1.addEventListener("click", () => {
      EaNotification({
        title: "Title",
        message: "This is a message that automatically close",
      });
    });

    this.btn2.addEventListener("click", () => {
      EaNotification({
        title: "Prompt",
        message: "This is a message that does not automatically close",
        duration: 0,
      });
    });
  },
};
basicExample.init();
```

:::

## 不同类型的通知

支持 success / warning / info / error / primary 类型，通过 `type` 改变样式。

<div id="typeSection" class="demo row left">
  <ea-button plain>Info</ea-button>
  <ea-button type="primary" plain>Primary</ea-button>
  <ea-button type="success" plain>Success</ea-button>
  <ea-button type="warning" plain>Warning</ea-button>
  <ea-button type="danger" plain>Error</ea-button>
</div>

::: code-group

```html
<div id="typeSection" class="demo row left">
  <ea-button plain>Info</ea-button>
  <ea-button type="primary" plain>Primary</ea-button>
  <ea-button type="success" plain>Success</ea-button>
  <ea-button type="warning" plain>Warning</ea-button>
  <ea-button type="danger" plain>Error</ea-button>
</div>
```

```js
const typeExample = {
  btns: document.querySelectorAll("#typeSection ea-button"),

  init() {
    this.btns.forEach(btn => {
      btn.addEventListener("click", () => {
        EaNotification({
          type: btn.textContent.toLowerCase(),
          title: btn.textContent,
          message: "This is a message",
        });
      });
    });
  },
};
typeExample.init();
```

:::

## 自定义位置

支持 `top-right`、`top-left`、`bottom-right`、`bottom-left` 四个位置，通过 `placement` 配置。

<div class="demo row left" id="placementSection">
  <ea-button plain> Top Right </ea-button>
  <ea-button plain> Bottom Right </ea-button>
  <ea-button plain> Bottom Left </ea-button>
  <ea-button plain> Top Left </ea-button>
</div>

::: code-group

```html
<div class="demo row left" id="placementSection">
  <ea-button plain> Top Right </ea-button>
  <ea-button plain> Bottom Right </ea-button>
  <ea-button plain> Bottom Left </ea-button>
  <ea-button plain> Top Left </ea-button>
</div>
```

```js
const placementExample = {
  btns: document.querySelectorAll("#placementSection ea-button"),
  init() {
    this.btns.forEach(btn => {
      btn.addEventListener("click", () => {
        EaNotification({
          title: "Custom Position",
          message: "This is a message",
          placement: btn.textContent.trim().toLowerCase().replace(" ", "-"),
        });
      });
    });
  },
};
placementExample.init();
```

:::

## 使用 HTML 片段作为正文内容

将 `dangerouslyUseHTMLString` 设为 `true` 可以让 `message` 被当作 HTML 片段渲染。

<div class="demo" id="useHTMLSection">
  <ea-button plain> Use HTML String </ea-button>
</div>

::: code-group

```html
<div class="demo" id="useHTMLSection">
  <ea-button plain> Use HTML String </ea-button>
</div>
```

```js
const htmlExample = {
  btn: document.querySelector("#useHTMLSection ea-button"),
  init() {
    this.btn.addEventListener("click", () => {
      EaNotification({
        title: "HTML String",
        dangerouslyUseHTMLString: true,
        message: "<strong>This is <i>HTML</i> string</strong>",
      });
    });
  },
};
htmlExample.init();
```

:::

## 隐藏关闭按钮

通过 `showClose` 控制是否显示右上角关闭按钮。

<div class="demo" id="hideCloseSection">
  <ea-button plain> Hide close button </ea-button>
</div>

::: code-group

```html
<div class="demo" id="hideCloseSection">
  <ea-button plain> Hide close button </ea-button>
</div>
```

```js
const hideCloseExample = {
  btn: document.querySelector("#hideCloseSection ea-button"),
  init() {
    this.btn.addEventListener("click", async () => {
      EaNotification.success({
        title: "Info",
        message: "This is a message without close button",
        showClose: false,
      });
    });
  },
};
hideCloseExample.init();
```

:::

## Attributes

| 参数                     | 说明                                    | 类型        | 可选值                                                        | 默认值        |
| ------------------------ | --------------------------------------- | ----------- | ------------------------------------------------------------- | ------------- |
| title                    | 标题                                    | string      | —                                                             | ''            |
| message                  | 正文内容                                | string      | —                                                             | ''            |
| type                     | 通知类型                                | enum        | `'success' \| 'warning' \| 'info' \| 'error' \| 'primary'`    | 'info'        |
| icon                     | 自定义图标 class                        | string      | —                                                             | ''            |
| duration                 | 显示时间（毫秒）。设为 0 则不会自动关闭 | number      | —                                                             | 3000          |
| placement                | 出现位置                                | enum        | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' | 'top-right'`  |
| showClose                | 是否显示关闭按钮                        | boolean     | —                                                             | true          |
| closeIcon                | 关闭按钮图标 class                      | string      | —                                                             | 'icon-cancel' |
| zIndex                   | z-index 值                              | number      | —                                                             | 0             |
| dangerouslyUseHTMLString | 是否把 message 当作 HTML 渲染           | boolean     | —                                                             | false         |
| appendTo                 | 指定挂载容器，支持选择器或 HTMLElement  | CSSSelector | —                                                             | 'body'        |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称       | 说明           |
| ---------- | -------------- |
| container  | 通知整体根元素 |
| icon       | 类型图标       |
| header     | 标题区域       |
| title      | 标题文本       |
| close-icon | 关闭按钮       |
| main       | 正文内容区域   |

## Events

| 事件名称 | 说明                                   |
| -------- | -------------------------------------- |
| show     | 显示时触发                             |
| shown    | 显示完毕时触发                         |
| hide     | 隐藏时触发                             |
| hidden   | 隐藏完毕时触发                         |
| close    | 关闭时触发（可以手动调用实例的 close） |

## Methods

| 名称  | 描述                         | 类型                   |
| ----- | ---------------------------- | ---------------------- |
| close | 关闭当前的 Notification 实例 | `Function: () => void` |
