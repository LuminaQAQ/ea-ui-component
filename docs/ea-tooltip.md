<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")
})
</script>

<style scoped>
ea-tooltip {
  margin: 1rem;
}
ea-tooltip[effect="customized"]::part(original) {
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

ea-tooltip[effect="customized"]::part(original)::after {
  background: linear-gradient(45deg, #b2e68d, #bce689);
}
</style>

# Tooltip 文字提示 ​

常用于展示鼠标 hover 时的提示信息。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-tooltip/index.js";
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
ea-tooltip {
  margin: 1rem;
}
```

:::

## 基础用法

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

使用 `content` 属性来设置悬停时显示的信息。 由 `placement` 属性决定 Popover 弹出框的位置。 该属性值格式为：`[方向]-[对齐位置]`，可供选择的四个方向分别是 `top`、`left`、`right`、`bottom`，可供选择的三种对齐方式分别是 start、end、null，默认的对齐方式为 null。 以 `placement="left-end"` 为例，Popover 弹出框会显示在悬停元素的左侧，且提示信息的底部与悬停元素的底部对齐。

<div class="demo">
  <ea-row justify="center">
    <ea-col span="6">
      <ea-tooltip content="Top Left prompts info" placement="top-start">
        <ea-button type="primary" slot="reference">top-start</ea-button>
      </ea-tooltip>
    </ea-col>
    <ea-col span="6">
      <ea-tooltip content="Top Center prompts info" placement="top">
        top
        <ea-button type="primary" slot="reference">top</ea-button>
      </ea-tooltip>
    </ea-col>
    <ea-col span="6">
      <ea-tooltip content="Top Right prompts info" placement="top-end">
        <ea-button type="primary" slot="reference">top-end</ea-button>
      </ea-tooltip>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-tooltip content="Left Top prompts info" placement="left-start">
        <ea-button type="primary" slot="reference">left-start</ea-button>
      </ea-tooltip>
    </ea-col>
    <ea-col span="6">
      <ea-tooltip content="Right Top prompts info" placement="right-start">
        <ea-button type="primary" slot="reference">right-start</ea-button>
      </ea-tooltip>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-tooltip content="Left Center prompts info" placement="left">
        <ea-button type="primary" slot="reference">left</ea-button>
      </ea-tooltip>
    </ea-col>
    <ea-col span="6">
      <ea-tooltip content="Right Center prompts info" placement="right">
        <ea-button type="primary" slot="reference">right</ea-button>
      </ea-tooltip>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-tooltip content="Left Bottom prompts info" placement="left-end">
        <ea-button type="primary" slot="reference">left-end</ea-button>
      </ea-tooltip>
    </ea-col>
    <ea-col span="6">
      <ea-tooltip content="Right Bottom prompts info" placement="right-end">
        <ea-button type="primary" slot="reference">right-end</ea-button>
      </ea-tooltip>
    </ea-col>
  </ea-row>
  <ea-row justify="center">
    <ea-col span="6">
      <ea-tooltip content="Bottom Left prompts info" placement="bottom-start">
        <ea-button type="primary" slot="reference">bottom-start</ea-button>
      </ea-tooltip>
    </ea-col>
    <ea-col span="6">
      <ea-tooltip content="Bottom Center prompts info" placement="bottom">
        <ea-button type="primary" slot="reference">bottom</ea-button>
      </ea-tooltip>
    </ea-col>
    <ea-col span="6">
      <ea-tooltip content="Bottom Right prompts info" placement="bottom-end">
        <ea-button type="primary" slot="reference">bottom-end</ea-button>
      </ea-tooltip>
    </ea-col>
  </ea-row>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-row justify="center">
    <ea-col span="6">
      <ea-tooltip content="Top Left prompts info" placement="top-start">
        <ea-button type="primary" slot="reference">top-start</ea-button>
      </ea-tooltip>
    </ea-col>
    <ea-col span="6">
      <ea-tooltip content="Top Center prompts info" placement="top">
        top
        <ea-button type="primary" slot="reference">top</ea-button>
      </ea-tooltip>
    </ea-col>
    <ea-col span="6">
      <ea-tooltip content="Top Right prompts info" placement="top-end">
        <ea-button type="primary" slot="reference">top-end</ea-button>
      </ea-tooltip>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-tooltip content="Left Top prompts info" placement="left-start">
        <ea-button type="primary" slot="reference">left-start</ea-button>
      </ea-tooltip>
    </ea-col>
    <ea-col span="6">
      <ea-tooltip content="Right Top prompts info" placement="right-start">
        <ea-button type="primary" slot="reference">right-start</ea-button>
      </ea-tooltip>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-tooltip content="Left Center prompts info" placement="left">
        <ea-button type="primary" slot="reference">left</ea-button>
      </ea-tooltip>
    </ea-col>
    <ea-col span="6">
      <ea-tooltip content="Right Center prompts info" placement="right">
        <ea-button type="primary" slot="reference">right</ea-button>
      </ea-tooltip>
    </ea-col>
  </ea-row>
  <ea-row justify="space-between">
    <ea-col span="6">
      <ea-tooltip content="Left Bottom prompts info" placement="left-end">
        <ea-button type="primary" slot="reference">left-end</ea-button>
      </ea-tooltip>
    </ea-col>
    <ea-col span="6">
      <ea-tooltip content="Right Bottom prompts info" placement="right-end">
        <ea-button type="primary" slot="reference">right-end</ea-button>
      </ea-tooltip>
    </ea-col>
  </ea-row>
  <ea-row justify="center">
    <ea-col span="6">
      <ea-tooltip content="Bottom Left prompts info" placement="bottom-start">
        <ea-button type="primary" slot="reference">bottom-start</ea-button>
      </ea-tooltip>
    </ea-col>
    <ea-col span="6">
      <ea-tooltip content="Bottom Center prompts info" placement="bottom">
        <ea-button type="primary" slot="reference">bottom</ea-button>
      </ea-tooltip>
    </ea-col>
    <ea-col span="6">
      <ea-tooltip content="Bottom Right prompts info" placement="bottom-end">
        <ea-button type="primary" slot="reference">bottom-end</ea-button>
      </ea-tooltip>
    </ea-col>
  </ea-row>
</div>
```

:::

## 主题 ​

Tooltip 组件内置了两个主题：`dark` 和 `light`。

<div class="demo">
  <ea-tooltip content="Top center" placement="top">
    <ea-button slot="reference">Dark</ea-button>
  </ea-tooltip>
  <ea-tooltip content="Bottom center" placement="bottom" effect="light">
    <ea-button slot="reference">Light</ea-button>
  </ea-tooltip>
  <ea-tooltip content="Bottom center" effect="customized">
    <ea-button slot="reference">Customized theme</ea-button>
  </ea-tooltip>
</div>

::: details 查看代码

`css`

```css
ea-tooltip[effect="customized"]::part(original) {
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

ea-tooltip[effect="customized"]::part(original)::after {
  background: linear-gradient(45deg, #b2e68d, #bce689);
}
```

`html`

```html
<div class="demo">
  <ea-tooltip content="Top center" placement="top">
    <ea-button slot="reference">Dark</ea-button>
  </ea-tooltip>
  <ea-tooltip content="Bottom center" placement="bottom" effect="light">
    <ea-button slot="reference">Light</ea-button>
  </ea-tooltip>
  <ea-tooltip content="Bottom center" effect="customized">
    <ea-button slot="reference">Customized theme</ea-button>
  </ea-tooltip>
</div>
```

:::

## 更多内容的文字提示 ​

展示多行文本或者是设置文本内容的格式

用具名 slot `content`，替代 `tooltip` 中的 `content` 属性。

<div id="scalableSection" class="demo">
  <ea-tooltip placement="top">
    multiple lines<br />second line
    <ea-button id="popoverBtn" type="primary" slot="reference"
      >Top center</ea-button
    >
  </ea-tooltip>
</div>

:::details 查看代码

```html
<div id="scalableSection" class="demo">
  <ea-tooltip placement="top">
    multiple lines<br />second line
    <ea-button id="popoverBtn" type="primary" slot="reference"
      >Top center</ea-button
    >
  </ea-tooltip>
</div>
```

:::

## Tooltip API

| 参数       | 说明                                             | 类型    | 可选值                                                                                                                                                               | 默认值                                          |
| ---------- | ------------------------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| effect     | 显示效果。                                       | string  | `'dark' \| 'light' \| 'customized'`                                                                                                                                  | dark                                            |
| trigger    | 触发方式。                                       | string  | `'click' \| 'focus' \| 'hover' \| 'contextmenu' \| 'customized'`                                                                                                     | hover                                           |
| content    | 显示的内容，也可以通过写入默认 slot 修改显示内容 | string  | —                                                                                                                                                                    | —                                               |
| width      | 宽度，单位 px。                                  | number  | —                                                                                                                                                                    | 150                                             |
| placement  | 气泡的出现位置。                                 | string  | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | top                                             |
| show-arrow | 是否显示箭头                                     | boolean |                                                                                                                                                                      | false                                           |
| visible    | 控制 Tooltip 显隐的属性                          | boolean |                                                                                                                                                                      | false                                           |
| offset     | 气泡出现的位置偏移量。                           | string  | —                                                                                                                                                                    | <span style="white-space: nowrap;">"0 0"</span> |
| flip       | 是否在超过原 placement 视口时，进行翻转。        | boolean | —                                                                                                                                                                    | true                                            |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明                                   |
| --------- | -------------------------------------- |
| container | Tooltip 外层容器                       |
| reference | 触发 Tooltip 显示的 HTML 元素 的父容器 |
| original  | Tooltip 内容容器                       |
| content   | Tooltip 内容容器                       |

## Events

| 事件名称 | 说明                          | 回调参数     |
| -------- | ----------------------------- | ------------ |
| show     | 开启 Tooltip 时触发的事件     | `() => void` |
| shown    | 开启 Tooltip 的动画结束时触发 | `() => void` |
| hide     | 关闭 Tooltip 时触发的事件     | `() => void` |
| hidden   | 关闭 Tooltip 的动画结束时触发 | `() => void` |

## Methods

| 名称   | 详情                  | 类型         |
| ------ | --------------------- | ------------ |
| show   | 显示 Tooltip          | `() => void` |
| hide   | 隐藏 Tooltip          | `() => void` |
| toggle | 切换 Tooltip 显示状态 | `() => void` |

## Slots

| 名称      | 描述                              |
| --------- | --------------------------------- |
| -         | Tooltip 内容插槽                  |
| reference | 触发 Tooltip 显示的 HTML 元素插槽 |
