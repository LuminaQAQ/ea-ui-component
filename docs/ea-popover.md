<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  await import("../dist/components/index.js")
  await import("../dist/assets/icon.css")
  
        // ------- 基础用法 -------
        // #region
        const triggerExample = {
            referenceElement: document.querySelector('#customedTrigger'),

            init() {
                this.referenceElement.addEventListener('click', () => {
                    this.referenceElement.visible = !this.referenceElement.visible;
                });
            }
        }
        triggerExample.init();
        // #endregion
        // ------- end -------

        // ------- 基础用法 -------
        // #region
        const scalableExample = {
            referenceElement: document.querySelector('#scalableSection ea-popover'),
            openButton: document.querySelector('#scalableSection #popoverBtn'),
            confirmButton: document.querySelector('#scalableSection #confirm'),
            cancelButton: document.querySelector('#scalableSection #cancel'),

            init() {
                this.openButton.addEventListener('click', e => {
                    this.referenceElement.visible = true;
                });

                this.confirmButton.addEventListener('click', () => {
                    this.referenceElement.visible = false;
                    console.log('confirm');
                });

                this.cancelButton.addEventListener('click', () => {
                    this.referenceElement.visible = false;
                    console.log('cancel');
                });
            }
        }
        scalableExample.init();
        // #endregion
        // ------- end -------
})
</script>

<style scoped>
ea-popover {
  margin: 1rem;
}
</style>

# Popover 弹出框

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-popover/index.js";
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
ea-popover {
  margin: 1rem;
}
```

:::

## 展示位置 ​

Popover 弹出框提供 9 种展示位置。

使用 `content` 属性来设置悬停时显示的信息。 由 `placement` 属性决定 Popover 弹出框的位置。 该属性值格式为：`[方向]-[对齐位置]`，可供选择的四个方向分别是 `top`、`left`、`right`、`bottom`，可供选择的三种对齐方式分别是 start、end、null，默认的对齐方式为 null。 以 `placement="left-end"` 为例，Popover 弹出框会显示在悬停元素的左侧，且提示信息的底部与悬停元素的底部对齐。

<div id="referenceSection" class="demo">
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Top Left prompts info"
        placement="top-start"
      >
        <ea-button type="primary" slot="reference">top-start</ea-button>
      </ea-popover>
    </ea-col>
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Top Center prompts info"
        placement="top"
      >
        top
        <ea-button type="primary" slot="reference">top</ea-button>
      </ea-popover>
    </ea-col>
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Top Right prompts info"
        placement="top-end"
      >
        <ea-button type="primary" slot="reference">top-end</ea-button>
      </ea-popover>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Left Top prompts info"
        placement="left-start"
      >
        <ea-button type="primary" slot="reference">left-start</ea-button>
      </ea-popover>
    </ea-col>
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Right Top prompts info"
        placement="right-start"
      >
        <ea-button type="primary" slot="reference">right-start</ea-button>
      </ea-popover>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Left Center prompts info"
        placement="left"
      >
        <ea-button type="primary" slot="reference">left</ea-button>
      </ea-popover>
    </ea-col>
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Right Center prompts info"
        placement="right"
      >
        <ea-button type="primary" slot="reference">right</ea-button>
      </ea-popover>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <ea-button type="primary" slot="reference">left-end</ea-button>
      </ea-popover>
    </ea-col>
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <ea-button type="primary" slot="reference">right-end</ea-button>
      </ea-popover>
    </ea-col>
  </ea-row>
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <ea-button type="primary" slot="reference">bottom-start</ea-button>
      </ea-popover>
    </ea-col>
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <ea-button type="primary" slot="reference">bottom</ea-button>
      </ea-popover>
    </ea-col>
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <ea-button type="primary" slot="reference">bottom-end</ea-button>
      </ea-popover>
    </ea-col>
  </ea-row>
</div>

::: details 查看代码

```html
<div id="referenceSection" class="demo">
  <ea-row justify="center">
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Top Left prompts info"
        placement="top-start"
      >
        <ea-button type="primary" slot="reference">top-start</ea-button>
      </ea-popover>
    </ea-col>
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Top Center prompts info"
        placement="top"
      >
        top
        <ea-button type="primary" slot="reference">top</ea-button>
      </ea-popover>
    </ea-col>
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Top Right prompts info"
        placement="top-end"
      >
        <ea-button type="primary" slot="reference">top-end</ea-button>
      </ea-popover>
    </ea-col>
  </ea-row>

  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Left Top prompts info"
        placement="left-start"
      >
        <ea-button type="primary" slot="reference">left-start</ea-button>
      </ea-popover>
    </ea-col>
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Right Top prompts info"
        placement="right-start"
      >
        <ea-button type="primary" slot="reference">right-start</ea-button>
      </ea-popover>
    </ea-col>
  </ea-row>

  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Left Center prompts info"
        placement="left"
      >
        <ea-button type="primary" slot="reference">left</ea-button>
      </ea-popover>
    </ea-col>
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Right Center prompts info"
        placement="right"
      >
        <ea-button type="primary" slot="reference">right</ea-button>
      </ea-popover>
    </ea-col>
  </ea-row>

  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <ea-button type="primary" slot="reference">left-end</ea-button>
      </ea-popover>
    </ea-col>
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <ea-button type="primary" slot="reference">right-end</ea-button>
      </ea-popover>
    </ea-col>
  </ea-row>

  <ea-row justify="center">
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <ea-button type="primary" slot="reference">bottom-start</ea-button>
      </ea-popover>
    </ea-col>
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <ea-button type="primary" slot="reference">bottom</ea-button>
      </ea-popover>
    </ea-col>
    <ea-col span="6">
      <ea-popover
        title="Title"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <ea-button type="primary" slot="reference">bottom-end</ea-button>
      </ea-popover>
    </ea-col>
  </ea-row>
</div>
```

:::

## 基础用法 ​

Popover 是在 <ea-link type="primary" href="/ea-popper">EaPopover</ea-link> 基础上开发出来的。 因此对于重复属性，请参考 Popover 的文档，在此文档中不做详尽解释。

`trigger` 属性被用来决定 popover 的触发方式，支持的触发方式： `hover`、`click`、`focus` 或 `contextmenu`。 如果你想手动控制它，可以设置 `visible` 属性。

<div id="triggerSection" class="demo">
  <ea-popover
    placement="top-start"
    title="Title"
    content="this is content, this is content, this is content"
  >
    <ea-button type="primary" slot="reference">Hover to activate</ea-button>
  </ea-popover>
  <ea-popover
    placement="top-start"
    trigger="click"
    title="Title"
    content="this is content, this is content, this is content"
  >
    <ea-button type="primary" slot="reference">Click to activate</ea-button>
  </ea-popover>
  <ea-popover
    placement="top-start"
    trigger="focus"
    title="Title"
    content="this is content, this is content, this is content"
  >
    <ea-button type="primary" slot="reference">Focus to activate</ea-button>
  </ea-popover>
  <ea-popover
    placement="top-start"
    trigger="contextmenu"
    title="Title"
    content="this is content, this is content, this is content"
  >
    <ea-button type="primary" slot="reference"
      >contextmenu to activate</ea-button
    >
  </ea-popover>
  <ea-popover
    id="customedTrigger"
    placement="top-start"
    trigger="customized"
    title="Title"
    width="200"
    content="this is content, this is content, this is content"
  >
    <ea-button type="primary" slot="reference">Manual to activate</ea-button>
  </ea-popover>
</div>

::: details 查看代码

`html`

```html
<div id="triggerSection" class="demo">
  <ea-popover
    placement="top-start"
    title="Title"
    content="this is content, this is content, this is content"
  >
    <ea-button type="primary" slot="reference">Hover to activate</ea-button>
  </ea-popover>
  <ea-popover
    placement="top-start"
    trigger="click"
    title="Title"
    content="this is content, this is content, this is content"
  >
    <ea-button type="primary" slot="reference">Click to activate</ea-button>
  </ea-popover>
  <ea-popover
    placement="top-start"
    trigger="focus"
    title="Title"
    content="this is content, this is content, this is content"
  >
    <ea-button type="primary" slot="reference">Focus to activate</ea-button>
  </ea-popover>
  <ea-popover
    placement="top-start"
    trigger="contextmenu"
    title="Title"
    content="this is content, this is content, this is content"
  >
    <ea-button type="primary" slot="reference"
      >contextmenu to activate</ea-button
    >
  </ea-popover>
  <ea-popover
    placement="top-start"
    trigger="customized"
    title="Title"
    width="200"
    content="this is content, this is content, this is content"
  >
    <ea-button type="primary" slot="reference">Manual to activate</ea-button>
  </ea-popover>
</div>
```

`js`

```js
const triggerExample = {
  referenceElement: document.querySelector(
    '#triggerSection ea-popover[trigger="customized"]'
  ),

  init() {
    this.referenceElement.addEventListener("click", () => {
      this.referenceElement.visible = !this.referenceElement.visible;
    });
  },
};
triggerExample.init();
```

:::

## 内容可扩展 ​

可以在 Popover 中嵌套其它组件， 以下为嵌套表格的例子。

利用插槽取代 content 属性

<div id="scalableSection" class="demo">
  <ea-popover trigger="customized" placement="right" show-arrow="false" width="200">
    <ea-button id="popoverBtn" type="primary" slot="reference"
      >Click to activate</ea-button
    >
    <ea-card shadow="never" header="Header">
      Are you sure?
      <section slot="footer" style="text-align: right;">
        <ea-button id="confirm" type="primary" size="small">Confirm</ea-button>
        <ea-button id="cancel" size="small">Cancel</ea-button>
      </section>
    </ea-card>
  </ea-popover>
</div>

:::details 查看代码

`html`

```html
<div id="scalableSection" class="demo">
  <ea-popover
    trigger="customized"
    placement="right"
    show-arrow="false"
    width="200"
  >
    <ea-button id="popoverBtn" type="primary" slot="reference"
      >Click to activate</ea-button
    >

    <ea-card shadow="never" header="Header">
      Are you sure?
      <section slot="footer" style="text-align: right;">
        <ea-button id="confirm" type="primary" size="small">Confirm</ea-button>
        <ea-button id="cancel" size="small">Cancel</ea-button>
      </section>
    </ea-card>
  </ea-popover>
</div>
```

`js`

```js
const scalableExample = {
  referenceElement: document.querySelector("#scalableSection ea-popover"),
  openButton: document.querySelector("#scalableSection #popoverBtn"),
  confirmButton: document.querySelector("#scalableSection #confirm"),
  cancelButton: document.querySelector("#scalableSection #cancel"),

  init() {
    this.openButton.addEventListener("click", (e) => {
      this.referenceElement.visible = true;
    });

    this.confirmButton.addEventListener("click", () => {
      this.referenceElement.visible = false;
      console.log("confirm");
    });

    this.cancelButton.addEventListener("click", () => {
      this.referenceElement.visible = false;
      console.log("cancel");
    });
  },
};
scalableExample.init();
```

:::

## Popover API

| 参数       | 说明                                             | 类型    | 可选值                                                                                                                                                               | 默认值                                          |
| ---------- | ------------------------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| trigger    | 触发方式。                                       | string  | `'click' \| 'focus' \| 'hover' \| 'contextmenu' \| 'customized'`                                                                                                     | hover                                           |
| title      | 标题                                             | string  | —                                                                                                                                                                    | —                                               |
| content    | 显示的内容，也可以通过写入默认 slot 修改显示内容 | string  | —                                                                                                                                                                    | —                                               |
| width      | 宽度，单位 px。                                  | number  | —                                                                                                                                                                    | 150                                             |
| placement  | 气泡的出现位置。                                 | string  | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | top                                             |
| show-arrow | 是否显示箭头                                     | boolean |                                                                                                                                                                      | false                                           |
| visible    | 控制 Popover 显隐的属性                          | boolean |                                                                                                                                                                      | false                                           |
| offset     | 气泡出现的位置偏移量。                           | string  | —                                                                                                                                                                    | <span style="white-space: nowrap;">"0 0"</span> |
| flip       | 是否在超过原 placement 视口时，进行翻转。        | boolean | —                                                                                                                                                                    | true                                            |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明                                   |
| --------- | -------------------------------------- |
| container | Popover 外层容器                       |
| reference | 触发 Popover 显示的 HTML 元素 的父容器 |
| original  | Popover 内容容器                       |
| title     | Popover 标题容器                       |
| content   | Popover 内容容器                       |

## Events

| 事件名称 | 说明                          | 回调参数     |
| -------- | ----------------------------- | ------------ |
| show     | 开启 Popover 时触发的事件     | `() => void` |
| shown    | 开启 Popover 的动画结束时触发 | `() => void` |
| hide     | 关闭 Popover 时触发的事件     | `() => void` |
| hidden   | 关闭 Popover 的动画结束时触发 | `() => void` |

## Methods

| 名称   | 详情                  | 类型         |
| ------ | --------------------- | ------------ |
| show   | 显示 Popover          | `() => void` |
| hide   | 隐藏 Popover          | `() => void` |
| toggle | 切换 Popover 显示状态 | `() => void` |

## Slots

| 名称      | 描述                              |
| --------- | --------------------------------- |
| -         | Popover 内容插槽                  |
| reference | 触发 Popover 显示的 HTML 元素插槽 |
