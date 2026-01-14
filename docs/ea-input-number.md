<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
})
</script>

# InputNumber 计数器

仅允许输入标准的数字值，可定义范围

## 引入

> `js`

```js
<script type='module'>
  import "./node_modules/easy-component-ui/components/ea-input-number/index.js";
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

<div class="demo">
  <ea-input-number value="1" min="1" max="10"></ea-input-number>
</div>

```html
<div class="demo">
  <ea-input-number value="1" min="1" max="10"></ea-input-number>
</div>
```

## 禁用状态

`disabled` 属性接受一个 `Boolean`，设置为 `true` 即可禁用整个组件。

<div class="demo">
  <ea-input-number disabled></ea-input-number>
</div>

```html
<div class="demo">
  <ea-input-number disabled></ea-input-number>
</div>
```

## 步进

允许定义递增递减的步进控制

设置 `step` 属性可以控制步长。

<div class="demo">
  <ea-input-number value="5" step="2"></ea-input-number>
</div>

```html
<div class="demo">
  <ea-input-number value="5" step="2"></ea-input-number>
</div>
```

## 严格步进

<div class="demo">
  <ea-input-number value="2" step="2" step-strictly></ea-input-number>
</div>

```html
<div class="demo">
  <ea-input-number value="2" step="2" step-strictly></ea-input-number>
</div>
```

## 精度

设置 `precision` 属性可以控制数值精度，接收一个 `Number`。

::: tip
`precision` 的值必须是一个非负整数，并且不能小于 `step` 的小数位数。
:::

<div class="demo row left">
  <ea-input-number value="1" step="0.1" precision="1"></ea-input-number>
  <ea-input-number value="1" step="0.01" precision="2"></ea-input-number>
</div>

```html
<div class="demo">
  <ea-input-number value="1" step="0.1" precision="1"></ea-input-number>
  <ea-input-number value="1" step="0.01" precision="2"></ea-input-number>
</div>
```

## 尺寸

组件支持 `large`、`default`、`small` 三种尺寸（不指定默认为 `default`）。

<div class="demo row left">
  <ea-input-number size="large"></ea-input-number>
  <ea-input-number size="default"></ea-input-number>
  <ea-input-number size="small"></ea-input-number>
</div>

```html
<div class="demo">
  <ea-input-number size="large"></ea-input-number>
  <ea-input-number size="default"></ea-input-number>
  <ea-input-number size="small"></ea-input-number>
</div>
```

## Attributes

| 参数           | 说明                           | 类型    | 可选值                      | 默认值                  |
| -------------- | ------------------------------ | ------- | --------------------------- | ----------------------- |
| value          | 当前值（字符串形式以保留精度） | number  | —                           | 0                       |
| value-on-clear | 清空时使用的值                 | number  | —                           | -                       |
| min            | 设置允许的最小值               | number  | —                           | Number.MIN_SAFE_INTEGER |
| max            | 设置允许的最大值               | number  | —                           | Number.MAX_SAFE_INTEGER |
| step           | 计数器步长                     | number  | —                           | 1                       |
| step-strictly  | 是否严格按 step 的倍数校验值   | boolean | —                           | false                   |
| precision      | 值的小数精度（非负整数）       | number  | —                           | -                       |
| size           | 组件尺寸                       | string  | `large \| default \| small` | default                 |
| readonly       | 原生 readonly 属性，是否只读   | boolean | —                           | false                   |
| disabled       | 是否禁用                       | boolean | —                           | false                   |
| controls       | 是否显示加减控制按钮           | boolean | —                           | true                    |
| align          | 文本对齐方式                   | string  | left / center / right       | center                  |
| name           | input 的 name / id             | string  | —                           | -                       |
| placeholder    | 输入框占位文本                 | string  | —                           | (空)                    |
| inputmode      | 原生 input 的 inputmode 属性   | string  | —                           | (空)                    |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明                                      |
| --------- | ----------------------------------------- |
| container | 组件根容器，对应元素的 `part="container"` |
| decrease  | 减号按钮，对应 `part="decrease"`          |
| prefix    | 前缀插槽容器，对应 `part="prefix"`        |
| input     | 输入框，对应 `part="input"`               |
| suffix    | 后缀插槽容器，对应 `part="suffix"`        |
| increase  | 加号按钮，对应 `part="increase"`          |

## Slots

| 名称   | 说明                               |
| ------ | ---------------------------------- |
| prefix | 输入框前置插槽，用于放置图标或文本 |
| suffix | 输入框后置插槽，用于放置单位或图标 |

## Events

| 事件名称  | 说明                 | 回调参数                                                   |
| --------- | -------------------- | ---------------------------------------------------------- |
| ea-change | 值发生变化时触发     | event.detail: `{ currentValue: number, oldValue: number }` |
| blur      | 输入框失去焦点时触发 | -                                                          |
| focus     | 输入框获得焦点时触发 | -                                                          |
