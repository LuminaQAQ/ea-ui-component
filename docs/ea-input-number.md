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

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-input-number.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-input-number";
```

:::

## 自定义样式

移步到 [CSS Part](#ea-input-number-css-part)。

## 基础用法

<div class="demo">
  <ea-input-number value="1" min="1" max="10"></ea-input-number>
</div>

::: details 查看代码

```html
<ea-input-number value="1" min="1" max="10"></ea-input-number>
```

:::

## 禁用状态

`disabled` 属性接受一个 `Boolean`，设置为 `true` 即可禁用整个组件。

<div class="demo">
  <ea-input-number disabled></ea-input-number>
</div>

::: details 查看代码

```html
<ea-input-number disabled></ea-input-number>
```

:::

## 步进

允许定义递增递减的步进控制

设置 `step` 属性可以控制步长。

<div class="demo">
  <ea-input-number value="5" step="2"></ea-input-number>
</div>

::: details 查看代码

```html
<ea-input-number value="5" step="2"></ea-input-number>
```

:::

## 严格步进

`step-strictly` 属性接受一个 `Boolean`，设置为 `true` 后，`value` 只能是 `step` 的倍数。

<div class="demo">
  <ea-input-number value="2" step="2" step-strictly></ea-input-number>
</div>

::: details 查看代码

```html
<ea-input-number value="2" step="2" step-strictly></ea-input-number>
```

:::

## 精度

设置 `precision` 属性可以控制数值精度，接收一个 `Number`。

::: tip
`precision` 的值必须是一个非负整数，并且不能小于 `step` 的小数位数。
:::

<div class="demo row left">
  <ea-input-number value="1" step="0.1" precision="1"></ea-input-number>
  <ea-input-number value="1" step="0.01" precision="2"></ea-input-number>
</div>

::: details 查看代码

```html
<ea-input-number value="1" step="0.1" precision="1"></ea-input-number>
<ea-input-number value="1" step="0.01" precision="2"></ea-input-number>
```

:::

## 尺寸

组件支持 `large`、`default`、`small` 三种尺寸（不指定默认为 `default`）。

<div class="demo row left">
  <ea-input-number size="large"></ea-input-number>
  <ea-input-number size="default"></ea-input-number>
  <ea-input-number size="small"></ea-input-number>
</div>

::: details 查看代码

```html
<ea-input-number size="large"></ea-input-number>
<ea-input-number size="default"></ea-input-number>
<ea-input-number size="small"></ea-input-number>
```

:::

## 不显示控制按钮

设置 `controls` 属性为 `false` 时，不显示加减控制按钮。

<div class="demo">
  <ea-input-number controls="false"></ea-input-number>
</div>

::: details 查看代码

```html
<ea-input-number controls="false"></ea-input-number>
```

:::

## 文本对齐

设置 `align` 属性可以控制输入框内文本的对齐方式，支持 `left`、`center`、`right`，默认为 `center`。

<div class="demo row left">
  <ea-input-number align="left" value="10"></ea-input-number>
  <ea-input-number align="center" value="10"></ea-input-number>
  <ea-input-number align="right" value="10"></ea-input-number>
</div>

::: details 查看代码

```html
<ea-input-number align="left" value="10"></ea-input-number>
<ea-input-number align="center" value="10"></ea-input-number>
<ea-input-number align="right" value="10"></ea-input-number>
```

:::

## EaInputNumber API

### EaInputNumber Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |
| label | 输入框标签文本 | string | — | (空) |
| value | 当前值 | number | — | 0 |
| valueOnClear | 清空时使用的值 | number | — | - |
| min | 设置允许的最小值 | number | — | Number.MIN_SAFE_INTEGER |
| max | 设置允许的最大值 | number | — | Number.MAX_SAFE_INTEGER |
| required | 是否必填 | boolean | — | false |
| step | 计数器步长 | number | — | 1 |
| stepStrictly | 是否严格按 step 的倍数校验值 | boolean | — | false |
| precision | 值的小数精度（非负整数） | number | — | 0 |
| size | 组件尺寸 | string | `large \| default \| small` | default |
| readonly | 原生 readonly 属性，是否只读 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| controls | 是否显示加减控制按钮 | boolean | — | true |
| align | 文本对齐方式 | string | `left \| center \| right` | center |
| name | input 的 name / id | string | — | (空) |
| placeholder | 输入框占位文本 | string | — | (空) |
| inputmode | 原生 input 的 inputmode 属性 | string | — | (空) |

### EaInputNumber CSS Part

| 名称 | 说明 |
| ---- | ---- |
| container | 组件根容器 |
| label | 标签文本 |
| region | 输入区域容器 |
| decrease | 减号按钮 |
| prefix | 前缀插槽容器 |
| input | 输入框 |
| suffix | 后缀插槽容器 |
| increase | 加号按钮 |

### EaInputNumber Slots

| 名称 | 说明 |
| ---- | ---- |
| prefix | 输入框前置插槽，用于放置图标或文本 |
| suffix | 输入框后置插槽，用于放置单位或图标 |

### EaInputNumber Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| focus | 聚焦输入框 | options?: FocusOptions |
| blur | 失焦输入框 | - |
| updateContainerClasslist | 更新容器 class | - |

### EaInputNumber Events

| 事件名称 | 说明 | 回调参数(event.detail) |
| -------- | ---- | ---------------------- |
| ea-change | 值发生变化时触发 | `{ currentValue: number, oldValue: number }` |
| focus | 输入框获得焦点时触发 | - |
| blur | 输入框失去焦点时触发 | - |

### EaInputNumber CSS Custom Properties

| 属性名 | 说明 | 默认值 |
| ------ | ---- | ------ |
| --ea-input-number-width | 组件宽度 | 150px |
| --ea-input-number-width-large | 大尺寸宽度 | 180px |
| --ea-input-number-width-small | 小尺寸宽度 | 120px |
| --ea-input-number-height | 组件高度 | 32px |
| --ea-input-number-height-large | 大尺寸高度 | 40px |
| --ea-input-number-height-small | 小尺寸高度 | 24px |
| --ea-input-number-font-size | 字体大小 | var(--font-size-md) |
| --ea-input-number-font-size-large | 大尺寸字体 | var(--font-size-lg) |
| --ea-input-number-font-size-small | 小尺寸字体 | var(--font-size-sm) |
| --ea-input-number-border-color | 边框颜色 | var(--grey-300) |
| --ea-input-number-text-color | 文字颜色 | var(--grey-700) |
| --ea-input-number-operator-color | 操作按钮颜色 | var(--grey-500) |
| --ea-input-number-operator-bg-color | 操作按钮背景颜色 | var(--grey-100) |
| --ea-input-number-operator-disabled-color | 操作按钮禁用颜色 | var(--grey-300) |
| --ea-input-number-input-disabled-color | 输入框禁用文字颜色 | var(--grey-400) |
| --ea-input-number-input-disabled-bg-color | 输入框禁用背景颜色 | var(--grey-100) |
| --ea-input-number-active-color | 激活状态颜色 | var(--blue-500) |
| --ea-input-number-transition | 过渡动画时长 | var(--transition-normal) |
