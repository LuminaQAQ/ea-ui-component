<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  await import("../dist/components/index.js")
  await import("../dist/assets/icon.css")

    const customizedPopconfirmExample = {
        el: document.querySelector("#customizedPopconfirm"),

        init() {
            this.el.addEventListener("confirm", (e) => {
            console.log("confirm");
            });

            this.el.addEventListener("cancel", (e) => {
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

# Popconfirm 气泡确认框 ​

点击某个元素弹出一个简单的气泡确认框

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-popconfirm/index.js";
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

```css [该用例使用到的样式]
ea-popconfirm {
  margin: 1rem;
}
```

:::

## 展示位置 ​

Popconfirm 提供 9 种展示位置。

使用 title 属性来设置点击参考元素时显示的信息。 由 `placement` 属性决定 Popconfirm 的位置。 该属性值格式为：`[方向]-[对齐位置]`，可供选择的四个方向分别是 `top`、`left`、`right`、`bottom`，可供选择的三种对齐方式分别是 `start`、`end`、`null`，默认的对齐方式为 `null`。 以 `placement="left-end"` 为例，气泡确认框会显示在悬停元素的左侧，且提示信息的底部与悬停元素的底部对齐。

<div id="referenceSection" class="demo">
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popconfirm title="Top Left prompts info" placement="top-start">
        <ea-button type="primary" slot="reference">top-start</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm title="Top Center prompts info" placement="top">
        top
        <ea-button type="primary" slot="reference">top</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm title="Top Right prompts info" placement="top-end">
        <ea-button type="primary" slot="reference">top-end</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popconfirm title="Left Top prompts info" placement="left-start">
        <ea-button type="primary" slot="reference">left-start</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm title="Right Top prompts info" placement="right-start">
        <ea-button type="primary" slot="reference">right-start</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popconfirm title="Left Center prompts info" placement="left">
        <ea-button type="primary" slot="reference">left</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm title="Right Center prompts info" placement="right">
        <ea-button type="primary" slot="reference">right</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popconfirm title="Left Bottom prompts info" placement="left-end">
        <ea-button type="primary" slot="reference">left-end</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm title="Right Bottom prompts info" placement="right-end">
        <ea-button type="primary" slot="reference">right-end</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popconfirm title="Bottom Left prompts info" placement="bottom-start">
        <ea-button type="primary" slot="reference">bottom-start</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm title="Bottom Center prompts info" placement="bottom">
        <ea-button type="primary" slot="reference">bottom</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm title="Bottom Right prompts info" placement="bottom-end">
        <ea-button type="primary" slot="reference">bottom-end</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
</div>

::: details 查看代码

```html
<div id="referenceSection" class="demo">
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popconfirm title="Top Left prompts info" placement="top-start">
        <ea-button type="primary" slot="reference">top-start</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm title="Top Center prompts info" placement="top">
        top
        <ea-button type="primary" slot="reference">top</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm title="Top Right prompts info" placement="top-end">
        <ea-button type="primary" slot="reference">top-end</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popconfirm title="Left Top prompts info" placement="left-start">
        <ea-button type="primary" slot="reference">left-start</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm title="Right Top prompts info" placement="right-start">
        <ea-button type="primary" slot="reference">right-start</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popconfirm title="Left Center prompts info" placement="left">
        <ea-button type="primary" slot="reference">left</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm title="Right Center prompts info" placement="right">
        <ea-button type="primary" slot="reference">right</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popconfirm title="Left Bottom prompts info" placement="left-end">
        <ea-button type="primary" slot="reference">left-end</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm title="Right Bottom prompts info" placement="right-end">
        <ea-button type="primary" slot="reference">right-end</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popconfirm title="Bottom Left prompts info" placement="bottom-start">
        <ea-button type="primary" slot="reference">bottom-start</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm title="Bottom Center prompts info" placement="bottom">
        <ea-button type="primary" slot="reference">bottom</ea-button>
      </ea-popconfirm>
    </ea-col>
    <ea-col span="6">
      <ea-popconfirm title="Bottom Right prompts info" placement="bottom-end">
        <ea-button type="primary" slot="reference">bottom-end</ea-button>
      </ea-popconfirm>
    </ea-col>
  </ea-row>
</div>
```

:::

## 基础用法 ​

Popconfirm 是在 <ea-link type="primary" href="/ea-popper">EaPopover</ea-link> 基础上开发出来的。 因此对于重复属性，请参考 Popper 的文档，在此文档中不做详尽解释。

在 Popconfirm 中，只有 `title` 属性可用，`content` 属性会被忽略。

<div id="triggerSection" class="demo">
  <ea-popconfirm
    title="Are you sure to delete this?"
    confirm-button-text="Yes"
    cancel-button-text="No"
  >
    <ea-button slot="reference">Delete</ea-button>
  </ea-popconfirm>
</div>

::: details 查看代码

`html`

```html
<div id="triggerSection" class="demo">
  <ea-popconfirm
    title="Are you sure to delete this?"
    confirm-button-text="Yes"
    cancel-button-text="No"
  >
    <ea-button slot="reference">Delete</ea-button>
  </ea-popconfirm>
</div>
```

:::

## 自定义弹出框的内容 ​

可以在 Popconfirm 中自定义内容。

<div id="scalableSection" class="demo">
  <ea-popconfirm
    id="customizedPopconfirm"
    placement="right"
    width="220"
    icon="icon-info"
    icon-color="#626AEF"
    title="Are you sure to delete this?"
  >
    <ea-button slot="reference">Delete</ea-button>
    <footer slot="actions">
      <ea-button size="small" type="default" data-cancel>No!</ea-button>
      <ea-button size="small" type="danger" data-confirm>Yes?</ea-button>
    </footer>
  </ea-popconfirm>
</div>

:::details 查看代码

`html`

```html
<div id="scalableSection" class="demo">
  <ea-popconfirm
    id="customizedPopconfirm"
    placement="right"
    width="220"
    icon="icon-info"
    icon-color="#626AEF"
    title="Are you sure to delete this?"
  >
    <ea-button slot="reference">Delete</ea-button>

    <footer slot="actions">
      <ea-button size="small" type="default" data-cancel>No!</ea-button>
      <ea-button size="small" type="danger" data-confirm>Yes?</ea-button>
    </footer>
  </ea-popconfirm>
</div>
```

`js`

```js
const customizedPopconfirmExample = {
  el: document.querySelector("#customizedPopconfirm"),

  init() {
    this.el.addEventListener("confirm", (e) => {
      console.log("confirm");
    });

    this.el.addEventListener("cancel", (e) => {
      console.log("cancel");
    });
  },
};
customizedPopconfirmExample.init();
```

:::

## Popover API

| 参数                | 说明                                      | 类型    | 可选值                                                                                                                                                               | 默认值                                          |
| ------------------- | ----------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| title               | 标题                                      | string  | —                                                                                                                                                                    | —                                               |
| confirm-button-text | 确认按钮文字                              | string  | —                                                                                                                                                                    | —                                               |
| cancel-button-text  | 取消按钮文字                              | string  | —                                                                                                                                                                    | —                                               |
| confirm-button-type | 确认按钮类型                              | string  | —                                                                                                                                                                    | —                                               |
| cancel-button-type  | 取消按钮类型                              | string  | —                                                                                                                                                                    | —                                               |
| icon                | 自定义图标                                | string  | —                                                                                                                                                                    | —                                               |
| width               | 宽度，单位 px。                           | number  | —                                                                                                                                                                    | 150                                             |
| icon-color          | 确认框图标的颜色。                        | string  | —                                                                                                                                                                    | `rgb(255, 153, 0)`                              |
| placement           | 气泡的出现位置。                          | string  | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | top                                             |
| show-arrow          | 是否显示箭头                              | boolean |                                                                                                                                                                      | false                                           |
| visible             | 控制 Popover 显隐的属性                   | boolean |                                                                                                                                                                      | false                                           |
| offset              | 气泡出现的位置偏移量。                    | string  | —                                                                                                                                                                    | <span style="white-space: nowrap;">"0 0"</span> |
| flip                | 是否在超过原 placement 视口时，进行翻转。 | boolean | —                                                                                                                                                                    | true                                            |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称           | 说明                                      |
| -------------- | ----------------------------------------- |
| container      | Popconfirm 外层容器                       |
| reference      | 触发 Popconfirm 显示的 HTML 元素 的父容器 |
| title          | Popconfirm 标题容器                       |
| icon           | Popconfirm 的图标                         |
| title-content  | Popconfirm 内容容器                       |
| footer         | Popconfirm 底部容器                       |
| cancel-button  | Popconfirm 取消按钮                       |
| confirm-button | Popconfirm 确认按钮                       |

## Events

| 事件名称 | 说明               | 回调参数     |
| -------- | ------------------ | ------------ |
| confirm  | 点击确认按钮时触发 | `() => void` |
| cancel   | 点击取消按钮时触发 | `() => void` |

## Methods

| 名称   | 详情                  | 类型         |
| ------ | --------------------- | ------------ |
| show   | 显示 Popover          | `() => void` |
| hide   | 隐藏 Popover          | `() => void` |
| toggle | 切换 Popover 显示状态 | `() => void` |

## Slots

| 名称      | 描述                              |
| --------- | --------------------------------- |
| reference | 触发 Popover 显示的 HTML 元素插槽 |
| actions   | 页脚的内容                        |
