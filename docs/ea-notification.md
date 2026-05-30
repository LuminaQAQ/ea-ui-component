<script setup>
import { onMounted } from 'vue'
import { EaNotification } from "../dist/components/ea-notification.js";

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

  // ------- 基础用法 -------
  // #region
  const basicExample = {
    moduleInstanceBtn: document.getElementById("moduleInstanceBtn"),

    init() {
      this.moduleInstanceBtn.addEventListener("click", () => {
        EaNotification({
          heading: "Title",
          message: "This is a message that automatically close",
        });
      });
    },
  };
  basicExample.init();
  // #endregion
  // ------- end -------

  // ------- 自定义位置 -------
  // #region
  const placementExample = {
    btns: document.querySelectorAll("#placementSection ea-button"),

    init() {
      this.btns.forEach(btn => {
        btn.addEventListener("click", () => {
          EaNotification({
            heading: "Custom Position",
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
})
</script>

# Notification 通知

用于系统级通知或轻量级提醒，常用于页面右上角或指定位置短暂提示。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-notification/index.js";
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

移步到 [CSS Part](#notification-css-part)。

## 基础用法

从 `placement` 指定的位置出现，默认 3 秒后自动消失。

<div class="demo row">
  <ea-button
    plain
    onclick="
          window.$notify({
            heading: 'Title',
            message: 'This is a message that automatically close',
          })
        "
  >
    Closes automatically
  </ea-button>
  <ea-button
    plain
    onclick="
          window.$notify({
            heading: 'Prompt',
            message: 'This is a message that does not automatically close',
            duration: 0,
          })
        "
  >
    Won't close automatically
  </ea-button>
  <ea-button id="moduleInstanceBtn" plain>
    Module-Instance notify
  </ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-button
    plain
    onclick="
          window.$notify({
            heading: 'Title',
            message: 'This is a message that automatically close',
          })
        "
  >
    Closes automatically
  </ea-button>
  <ea-button
    plain
    onclick="
          window.$notify({
            heading: 'Prompt',
            message: 'This is a message that does not automatically close',
            duration: 0,
          })
        "
  >
    Won't close automatically
  </ea-button>
  <ea-button id="moduleInstanceBtn" plain> Module-Instance notify </ea-button>
</div>
```

```js
const basicExample = {
  moduleInstanceBtn: document.getElementById("moduleInstanceBtn"),

  init() {
    this.moduleInstanceBtn.addEventListener("click", () => {
      EaNotification({
        heading: "Title",
        message: "This is a message that automatically close",
      });
    });
  },
};
basicExample.init();
```

:::

::::

## 不同类型

支持 success / warning / info / error / primary 类型，通过 `variant` 改变样式。

<div id="typeSection" class="demo row">
  <ea-button plain onclick="window.$notify.info({ heading: 'Info', message: 'This is a info message.' })">Info</ea-button>
  <ea-button
    variant="primary"
    plain
    onclick="window.$notify.primary({ heading: 'Primary', message: 'This is a primary message.' })"
    >Primary</ea-button
  >
  <ea-button
    variant="success"
    plain
    onclick="window.$notify.success({ heading: 'Success', message: 'Congrats, this is a success message.' })"
    >Success</ea-button
  >
  <ea-button
    variant="warning"
    plain
    onclick="window.$notify.warning({ heading: 'Warning', message: 'Warning, this is a warning message.' })"
    >Warning</ea-button
  >
  <ea-button
    variant="danger"
    plain
    onclick="window.$notify.error({ heading: 'Error', message: 'Oops, this is a error message.' })"
    >Error</ea-button
  >
</div>

:::: details 查看代码

::: code-group

```html
<div id="typeSection" class="demo">
  <ea-button
    plain
    onclick="window.$notify.info({ heading: 'Info', message: 'This is a info message.' })"
    >Info</ea-button
  >
  <ea-button
    variant="primary"
    plain
    onclick="window.$notify.primary({ heading: 'Primary', message: 'This is a primary message.' })"
    >Primary</ea-button
  >
  <ea-button
    variant="success"
    plain
    onclick="window.$notify.success({ heading: 'Success', message: 'Congrats, this is a success message.' })"
    >Success</ea-button
  >
  <ea-button
    variant="warning"
    plain
    onclick="window.$notify.warning({ heading: 'Warning', message: 'Warning, this is a warning message.' })"
    >Warning</ea-button
  >
  <ea-button
    variant="danger"
    plain
    onclick="window.$notify.error({ heading: 'Error', message: 'Oops, this is a error message.' })"
    >Error</ea-button
  >
</div>
```

```js
EaNotification.info({ heading: "Info", message: "This is a info message." });
EaNotification.primary({
  heading: "Primary",
  message: "This is a primary message.",
});
EaNotification.success({
  heading: "Success",
  message: "Congrats, this is a success message.",
});
EaNotification.warning({
  heading: "Warning",
  message: "Warning, this is a warning message.",
});
EaNotification.error({
  heading: "Error",
  message: "Oops, this is a error message.",
});
```

:::

::::

## 自定义位置

支持 `top-right`、`top-left`、`bottom-right`、`bottom-left` 四个位置，通过 `placement` 配置。

<div id="placementSection" class="demo row">
  <ea-button plain> Top Right </ea-button>
  <ea-button plain> Bottom Right </ea-button>
  <ea-button plain> Bottom Left </ea-button>
  <ea-button plain> Top Left </ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div id="placementSection" class="demo">
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
          heading: "Custom Position",
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

::::

## 使用 HTML 片段作为正文内容

将 `dangerouslyUseHTMLString` 设为 `true` 可以让 `message` 被当作 HTML 片段渲染。

<div class="demo" id="useHTMLSection">
  <ea-button
    plain
    onclick="
          window.$notify({
            heading: 'HTML String',
            dangerouslyUseHTMLString: true,
            message: '<strong>This is <i>HTML</i> string</strong>',
          })
        "
  >
    Use HTML string
  </ea-button>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo" id="useHTMLSection">
  <ea-button
    plain
    onclick="
          window.$notify({
            heading: 'HTML String',
            dangerouslyUseHTMLString: true,
            message: '<strong>This is <i>HTML</i> string</strong>',
          })
        "
  >
    Use HTML string
  </ea-button>
</div>
```

```js
EaNotification({
  heading: "HTML String",
  dangerouslyUseHTMLString: true,
  message: "<strong>This is <i>HTML</i> string</strong>",
});
```

:::

::::

## 隐藏关闭按钮

通过 `showClose` 控制是否显示右上角关闭按钮。

<div class="demo">
  <ea-button
    plain
    onclick="
          window.$notify({
            heading: 'Info',
            message: 'This is a message without close button',
            showClose: false,
          })
        "
  >
    Hide close button
  </ea-button>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-button
    plain
    onclick="
          window.$notify({
            heading: 'Info',
            message: 'This is a message without close button',
            showClose: false,
          })
        "
  >
    Hide close button
  </ea-button>
</div>
```

:::

## Notification API

### Notification Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |
| heading | 标题 | string | — | '' |
| message | 正文内容 | string | — | '' |
| variant | 通知类型 | enum | `'success' \| 'warning' \| 'info' \| 'error' \| 'primary'` | 'info' |
| icon | 自定义图标 | string | — | '' |
| duration | 显示时间（毫秒）。设为 0 则不会自动关闭 | number | — | 3000 |
| placement | 出现位置 | enum | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | 'top-right' |
| show-close | 是否显示关闭按钮 | boolean | — | false |
| close-icon | 关闭按钮图标 | string | — | 'xmark' |
| z-index | z-index 值 | number | — | 0 |
| dangerouslyUseHTMLString | 是否把 message 当作 HTML 渲染 | boolean | — | false |
| append-to | 指定挂载容器，支持选择器或 HTMLElement | CSSSelector | — | 'body' |
| onClose | 关闭回调函数 | Function | — | — |

### Notification CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称 | 说明 |
| ---- | ---- |
| container | 通知整体根元素 |
| icon | 类型图标 |
| content | 内容区域 |
| header | 标题区域 |
| title | 标题文本 |
| close-icon | 关闭按钮 |
| main | 正文内容区域 |

### Notification Slots

| 名称 | 说明 |
| ---- | ---- |
| default | 默认插槽，用于自定义正文内容 |

### Notification Events

| 事件名 | 说明 | 回调参数(event.detail) |
| ---- | ---- | ---- |
| ea-show | 显示时触发 | — |
| ea-shown | 显示完毕时触发 | — |
| ea-hide | 隐藏时触发 | — |
| ea-hidden | 隐藏完毕时触发 | — |
| ea-close | 关闭时触发 | — |

### Notification Methods

| 名称 | 描述 | 类型 |
| ---- | ---- | ---- |
| close | 关闭当前的 Notification 实例 | `Function: () => void` |

### Notification CSS 自定义属性

| 属性名 | 说明 | 默认值 |
| ---- | ---- | ---- |
| --ea-notification-y | 垂直偏移量 | 0 |
| --ea-notification-show-x | 水平显示偏移量 | var(--spacing-lg) |
| --ea-notification-fade-out-x | 水平隐藏偏移量 | 100% |
| --ea-notification-padding | 内边距 | var(--spacing-lg) |
| --ea-notification-border-color | 边框颜色 | var(--grey-200) |
| --ea-notification-border-radius | 圆角 | var(--border-radius-sm) |
| --ea-notification-box-shadow | 阴影 | var(--box-shadow-md) |
| --ea-notification-width | 宽度 | 300px |
| --ea-notification-title-font-size | 标题字号 | var(--font-size-lg) |
| --ea-notification-message-font-size | 正文字号 | var(--font-size-md) |
| --ea-notification-title-color | 标题颜色 | var(--grey-900) |
| --ea-notification-message-color | 正文颜色 | var(--grey-700) |
| --ea-notification-icon-size | 图标尺寸 | var(--font-size-lg) |
| --ea-notification-transition | 过渡动画时长 | var(--transition-normal) |
| --ea-notification-gap | 间距 | var(--spacing-md) |
| --ea-notification-close-icon-color | 关闭图标颜色 | var(--grey-500) |
| --ea-notification-z-index | 层级 | 2000 |
