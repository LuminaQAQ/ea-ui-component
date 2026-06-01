<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  await import("../dist/components/index.js")
  await import("../dist/assets/icon.css")

    const customizedPopconfirmExample = {
        el: document.querySelector("#customizedPopconfirm"),
        cancelBtn: document.querySelector("#customCancelBtn"),
        confirmBtn: document.querySelector("#customConfirmBtn"),

        init() {
            this.cancelBtn.addEventListener("click", () => {
                this.el.close();
            });

            this.confirmBtn.addEventListener("click", () => {
                this.el.close();
            });

            this.el.addEventListener("ea-confirm", (e) => {
                console.log("confirm");
            });

            this.el.addEventListener("ea-cancel", (e) => {
                console.log("cancel");
            });
        },
    };
    customizedPopconfirmExample.init();
})
</script>

<style scoped>
ea-popconfirm {
    margin: 1rem;
}
</style>

# Popconfirm 气泡确认框

点击某个元素弹出一个简单的气泡确认框。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-popconfirm.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-popconfirm";
```

:::

## 自定义样式

移步到 [CSS Part](#popconfirm-css-part)。

## 展示位置

Popconfirm 提供 9 种展示位置。

使用 heading 属性来设置点击参考元素时显示的信息。由 `placement` 属性决定 Popconfirm 的位置。该属性值格式为：`[方向]-[对齐位置]`，可供选择的四个方向分别是 `top`、`left`、`right`、`bottom`，可供选择的三种对齐方式分别是 `start`、`end`、`null`，默认的对齐方式为 `null`。以 `placement="left-end"` 为例，气泡确认框会显示在悬停元素的左侧，且提示信息的底部与悬停元素的底部对齐。

<div id="referenceSection" class="demo">
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popconfirm heading="Top Left prompts info" placement="top-start">
        <ea-button variant="primary" slot="reference">top-start</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm heading="Top Center prompts info" placement="top">
        <ea-button variant="primary" slot="reference">top</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm heading="Top Right prompts info" placement="top-end">
        <ea-button variant="primary" slot="reference">top-end</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popconfirm heading="Left Top prompts info" placement="left-start">
        <ea-button variant="primary" slot="reference">left-start</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm heading="Right Top prompts info" placement="right-start">
        <ea-button variant="primary" slot="reference">right-start</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popconfirm heading="Left Center prompts info" placement="left">
        <ea-button variant="primary" slot="reference">left</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm heading="Right Center prompts info" placement="right">
        <ea-button variant="primary" slot="reference">right</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popconfirm heading="Left Bottom prompts info" placement="left-end">
        <ea-button variant="primary" slot="reference">left-end</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm heading="Right Bottom prompts info" placement="right-end">
        <ea-button variant="primary" slot="reference">right-end</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popconfirm heading="Bottom Left prompts info" placement="bottom-start">
        <ea-button variant="primary" slot="reference">bottom-start</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm heading="Bottom Center prompts info" placement="bottom">
        <ea-button variant="primary" slot="reference">bottom</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm heading="Bottom Right prompts info" placement="bottom-end">
        <ea-button variant="primary" slot="reference">bottom-end</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
</div>

::: details 查看代码

```html
<div id="referenceSection" class="demo">
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popconfirm heading="Top Left prompts info" placement="top-start">
        <ea-button variant="primary" slot="reference">top-start</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm heading="Top Center prompts info" placement="top">
        <ea-button variant="primary" slot="reference">top</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm heading="Top Right prompts info" placement="top-end">
        <ea-button variant="primary" slot="reference">top-end</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popconfirm heading="Left Top prompts info" placement="left-start">
        <ea-button variant="primary" slot="reference">left-start</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm heading="Right Top prompts info" placement="right-start">
        <ea-button variant="primary" slot="reference">right-start</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popconfirm heading="Left Center prompts info" placement="left">
        <ea-button variant="primary" slot="reference">left</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm heading="Right Center prompts info" placement="right">
        <ea-button variant="primary" slot="reference">right</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popconfirm heading="Left Bottom prompts info" placement="left-end">
        <ea-button variant="primary" slot="reference">left-end</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm heading="Right Bottom prompts info" placement="right-end">
        <ea-button variant="primary" slot="reference">right-end</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popconfirm
        heading="Bottom Left prompts info"
        placement="bottom-start"
      >
        <ea-button variant="primary" slot="reference">bottom-start</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm heading="Bottom Center prompts info" placement="bottom">
        <ea-button variant="primary" slot="reference">bottom</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm heading="Bottom Right prompts info" placement="bottom-end">
        <ea-button variant="primary" slot="reference">bottom-end</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
</div>
```

:::

## 基础用法

Popconfirm 是在 <ea-link type="primary" href="/ea-popper">EaPopover</ea-link> 基础上开发出来的。因此对于重复属性，请参考 Popper 的文档，在此文档中不做详尽解释。

在 Popconfirm 中，只有 `heading` 属性可用，`content` 属性会被忽略。

<div id="triggerSection" class="demo">
  <ea-popconfirm
    heading="Are you sure to delete this?"
    confirm-button-text="Yes"
    cancel-button-text="No"
  >
    <ea-button slot="reference">Delete</ea-button>
  </ea-popconfirm>
</div>

::: details 查看代码

```html
<div id="triggerSection" class="demo">
  <ea-popconfirm
    heading="Are you sure to delete this?"
    confirm-button-text="Yes"
    cancel-button-text="No"
  >
    <ea-button slot="reference">Delete</ea-button>
  </ea-popconfirm>
</div>
```

:::

## 自定义弹出框的内容

可以在 Popconfirm 中自定义内容。

<div id="scalableSection" class="demo">
  <ea-popconfirm
    id="customizedPopconfirm"
    placement="right"
    width="220"
    icon="circle-info"
    icon-color="#626AEF"
    heading="Are you sure to delete this?"
  >
    <ea-button slot="reference">Delete</ea-button>
    <footer slot="actions">
      <ea-button id="customCancelBtn" size="small" variant="normal">No!</ea-button>
      <ea-button id="customConfirmBtn" size="small" variant="danger">Yes?</ea-button>
    </footer>
  </ea-popconfirm>
</div>

:::: details 查看代码

::: code-group

```html
<div id="scalableSection" class="demo">
  <ea-popconfirm
    id="customizedPopconfirm"
    placement="right"
    width="220"
    icon="circle-info"
    icon-color="#626AEF"
    heading="Are you sure to delete this?"
  >
    <ea-button slot="reference">Delete</ea-button>

    <footer slot="actions">
      <ea-button id="customCancelBtn" size="small" variant="normal"
        >No!</ea-button
      >
      <ea-button id="customConfirmBtn" size="small" variant="danger"
        >Yes?</ea-button
      >
    </footer>
  </ea-popconfirm>
</div>
```

```js
const customizedPopconfirmExample = {
  el: document.querySelector("#customizedPopconfirm"),
  cancelBtn: document.querySelector("#customCancelBtn"),
  confirmBtn: document.querySelector("#customConfirmBtn"),

  init() {
    this.cancelBtn.addEventListener("click", () => {
      this.el.close();
    });

    this.confirmBtn.addEventListener("click", () => {
      this.el.close();
    });

    this.el.addEventListener("ea-confirm", e => {
      console.log("confirm");
    });

    this.el.addEventListener("ea-cancel", e => {
      console.log("cancel");
    });
  },
};
customizedPopconfirmExample.init();
```

:::

::::

## Popconfirm API

### Popconfirm Attributes

| 参数              | 说明                                  | 类型    | 可选值                                                                                                                                                             | 默认值             |
| ----------------- | ------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| heading           | 标题                                  | string  | —                                                                                                                                                                  | —                  |
| confirmButtonText | 确认按钮文字                          | string  | —                                                                                                                                                                  | 确定               |
| cancelButtonText  | 取消按钮文字                          | string  | —                                                                                                                                                                  | 取消               |
| confirmButtonType | 确认按钮类型                          | string  | `normal` \| `primary` \| `success` \| `warning` \| `danger`                                                                                                        | primary            |
| cancelButtonType  | 取消按钮类型                          | string  | `normal` \| `primary` \| `success` \| `warning` \| `danger`                                                                                                        | normal             |
| icon              | 自定义图标                            | string  | —                                                                                                                                                                  | circle-question    |
| iconColor         | 确认框图标的颜色                      | string  | —                                                                                                                                                                  | `rgb(255, 153, 0)` |
| hideIcon          | 是否隐藏图标                          | boolean | —                                                                                                                                                                  | false              |
| width             | 宽度，单位 px                         | number  | —                                                                                                                                                                  | 150                |
| placement         | 气泡的出现位置                        | string  | `top` \| `top-start` \| `top-end` \| `bottom` \| `bottom-start` \| `bottom-end` \| `left` \| `left-start` \| `left-end` \| `right` \| `right-start` \| `right-end` | top                |
| showArrow         | 是否显示箭头                          | boolean | —                                                                                                                                                                  | true               |
| visible           | 控制 Popconfirm 显隐                  | boolean | —                                                                                                                                                                  | false              |
| offset            | 气泡出现的位置偏移量                  | string  | —                                                                                                                                                                  | "0 0"              |
| flip              | 是否在超过原 placement 视口时进行翻转 | boolean | —                                                                                                                                                                  | true               |

### Popconfirm CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称           | 说明                                     |
| -------------- | ---------------------------------------- |
| container      | Popconfirm 外层容器                      |
| reference      | 触发 Popconfirm 显示的 HTML 元素的父容器 |
| original       | Popconfirm 弹出内容容器                  |
| title          | Popconfirm 标题容器                      |
| icon           | Popconfirm 的图标                        |
| title-content  | Popconfirm 内容容器                      |
| footer         | Popconfirm 底部容器                      |
| cancel-button  | Popconfirm 取消按钮                      |
| confirm-button | Popconfirm 确认按钮                      |

### Popconfirm CSS Custom Properties

| 属性名                           | 说明         | 默认值                  |
| -------------------------------- | ------------ | ----------------------- |
| --ea-popconfirm-title-icon-color | 标题图标颜色 | rgb(255, 153, 0)        |
| --ea-popconfirm-title-color      | 标题文字颜色 | var(--grey-900)         |
| --ea-popconfirm-title-font-size  | 标题文字大小 | var(--font-size-md)     |
| --ea-popconfirm-box-shadow       | 容器阴影     | var(--box-shadow-md)    |
| --ea-popconfirm-border-radius    | 容器圆角     | var(--border-radius-sm) |
| --ea-popconfirm-z-index          | 容器层级     | 100                     |

### Popconfirm Events

| 事件名     | 说明                         | 回调参数 |
| ---------- | ---------------------------- | -------- |
| ea-confirm | 点击确认按钮时触发           | —        |
| ea-cancel  | 点击取消按钮时触发           | —        |
| ea-show    | 开启 Popper 时触发           | —        |
| ea-shown   | 开启 Popper 的动画结束时触发 | —        |
| ea-hide    | 关闭 Popper 时触发           | —        |
| ea-hidden  | 关闭 Popper 的动画结束时触发 | —        |

### Popconfirm Methods

| 方法名 | 说明                 | 参数 |
| ------ | -------------------- | ---- |
| open   | 显示 Popconfirm      | —    |
| close  | 隐藏 Popconfirm      | —    |
| show   | 显示 Popper          | —    |
| hide   | 隐藏 Popper          | —    |
| toggle | 切换 Popper 显示状态 | —    |

### Popconfirm Slots

| 名称      | 说明                                 |
| --------- | ------------------------------------ |
| reference | 触发 Popconfirm 显示的 HTML 元素插槽 |
| actions   | 页脚内容插槽                         |
