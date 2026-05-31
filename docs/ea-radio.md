<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
})
</script>

<style scoped>
</style>

# Radio 单选框

在一组备选项中进行单选。

## 引入

`js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-radio/index.js";
</script>
```

## 自定义样式

移步到 [Radio CSS Part](#radio-css-part) 和 [RadioGroup CSS Part](#radiogroup-css-part)。

## 基础用法

以下展示三种尺寸的基本用法

<div class="demo col left">
  <div>
    <ea-radio-group value="1">
      <ea-radio value="1" size="large">Option 1</ea-radio>
      <ea-radio value="2" size="large">Option 2</ea-radio>
    </ea-radio-group>
  </div>
  <div>
    <ea-radio-group value="1">
      <ea-radio value="1">Option 1</ea-radio>
      <ea-radio value="2">Option 2</ea-radio>
    </ea-radio-group>
  </div>
  <div>
    <ea-radio-group value="1">
      <ea-radio value="1" size="small">Option 1</ea-radio>
      <ea-radio value="2" size="small">Option 2</ea-radio>
    </ea-radio-group>
  </div>
</div>

::: details 查看代码

```html
<div class="demo">
  <div>
    <ea-radio-group value="1">
      <ea-radio value="1" size="large">Option 1</ea-radio>
      <ea-radio value="2" size="large">Option 2</ea-radio>
    </ea-radio-group>
  </div>
  <div>
    <ea-radio-group value="1">
      <ea-radio value="1">Option 1</ea-radio>
      <ea-radio value="2">Option 2</ea-radio>
    </ea-radio-group>
  </div>
  <div>
    <ea-radio-group value="1">
      <ea-radio value="1" size="small">Option 1</ea-radio>
      <ea-radio value="2" size="small">Option 2</ea-radio>
    </ea-radio-group>
  </div>
</div>
```

:::

## 禁用状态

展示禁用和已禁用且选中状态

<div class="demo row left">
  <ea-radio-group value="selected and disabled">
    <ea-radio value="disabled" disabled>Option A</ea-radio>
    <ea-radio value="selected and disabled" disabled>Option B</ea-radio>
  </ea-radio-group>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-radio-group value="selected and disabled">
    <ea-radio value="disabled" disabled>Option A</ea-radio>
    <ea-radio value="selected and disabled" disabled>Option B</ea-radio>
  </ea-radio-group>
</div>
```

:::

## 单选框组

基础的互斥选项组

<div class="demo">
  <ea-radio-group value="3">
    <ea-radio value="3">Option A</ea-radio>
    <ea-radio value="6">Option B</ea-radio>
    <ea-radio value="9">Option C</ea-radio>
  </ea-radio-group>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-radio-group value="3">
    <ea-radio value="3">Option A</ea-radio>
    <ea-radio value="6">Option B</ea-radio>
    <ea-radio value="9">Option C</ea-radio>
  </ea-radio-group>
</div>
```

:::

## 带有边框

展示不同尺寸和禁用情况下的边框样式

<div class="demo col left">
  <div>
    <ea-radio-group value="1">
      <ea-radio value="1" size="large" border>Option A</ea-radio>
      <ea-radio value="2" size="large" border>Option B</ea-radio>
    </ea-radio-group>
  </div>
  <div style="margin-top: 20px">
    <ea-radio-group value="1">
      <ea-radio value="1" border>Option A</ea-radio>
      <ea-radio value="2" border>Option B</ea-radio>
    </ea-radio-group>
  </div>
  <div style="margin-top: 20px">
    <ea-radio-group value="1" size="small">
      <ea-radio value="1" border>Option A</ea-radio>
      <ea-radio value="2" border disabled>Option B</ea-radio>
    </ea-radio-group>
  </div>
  <div style="margin-top: 20px">
    <ea-radio-group value="1" size="small" disabled>
      <ea-radio value="1" border>Option A</ea-radio>
      <ea-radio value="2" border>Option B</ea-radio>
    </ea-radio-group>
  </div>
</div>

::: details 查看代码

```html
<div class="demo">
  <div>
    <ea-radio-group value="1">
      <ea-radio value="1" size="large" border>Option A</ea-radio>
      <ea-radio value="2" size="large" border>Option B</ea-radio>
    </ea-radio-group>
  </div>
  <div style="margin-top: 20px">
    <ea-radio-group value="1">
      <ea-radio value="1" border>Option A</ea-radio>
      <ea-radio value="2" border>Option B</ea-radio>
    </ea-radio-group>
  </div>
  <div style="margin-top: 20px">
    <ea-radio-group value="1" size="small">
      <ea-radio value="1" border>Option A</ea-radio>
      <ea-radio value="2" border disabled>Option B</ea-radio>
    </ea-radio-group>
  </div>
  <div style="margin-top: 20px">
    <ea-radio-group value="1" size="small" disabled>
      <ea-radio value="1" border>Option A</ea-radio>
      <ea-radio value="2" border>Option B</ea-radio>
    </ea-radio-group>
  </div>
</div>
```

:::

## Radio API

### Radio Attributes

| 参数     | 说明                         | 类型    | 可选值                      | 默认值   |
| -------- | ---------------------------- | ------- | --------------------------- | -------- |
| value    | 选项的值                     | string  | —                           | ''       |
| label    | 选项的显示文本（未指定时以 slot 为准） | string  | —                           | ''       |
| disabled | 是否禁用                     | boolean | —                           | false    |
| checked  | 是否选中                     | boolean | —                           | false    |
| border   | 是否显示边框样式             | boolean | —                           | false    |
| size     | 组件尺寸                     | string  | `large \| default \| small` | default  |

### Radio CSS Part

| 名称       | 说明                   |
| ---------- | ---------------------- |
| container  | 外层 label 容器        |
| original   | 原生 radio 元素        |
| input      | 伪单选框元素           |
| input-wrap | 输入框容器             |
| label      | 标签容器元素           |

### Radio Slots

| 名称    | 说明                     |
| ------- | ------------------------ |
| default | 单个选项的显示内容（label） |

### Radio Methods

| 方法名 | 说明     | 参数 |
| ------ | -------- | ---- |
| focus  | 获取焦点 | —    |
| blur   | 失去焦点 | —    |

### Radio Events

| 事件名 | 说明                     | 回调参数(event.detail)                |
| ------ | ------------------------ | ------------------------------------- |
| change | 选中状态变化时触发       | `{ value: string, checked: boolean }` |
| focus  | 获得焦点时触发           | `{ value: string, checked: boolean }` |
| blur   | 失去焦点时触发           | `{ value: string, checked: boolean }` |

### Radio CSS 自定义属性

| 属性名                                  | 说明               | 默认值               |
| --------------------------------------- | ------------------ | -------------------- |
| --ea-radio-input-size-large             | 大号单选框尺寸     | var(--font-size-lg)  |
| --ea-radio-input-size-default           | 默认单选框尺寸     | var(--font-size-md)  |
| --ea-radio-input-size-small             | 小号单选框尺寸     | var(--font-size-sm)  |
| --ea-radio-inner-size-large             | 大号内部圆点尺寸   | 7px                  |
| --ea-radio-inner-size-default           | 默认内部圆点尺寸   | 5px                  |
| --ea-radio-inner-size-small             | 小号内部圆点尺寸   | 4px                  |
| --ea-radio-space                        | 间距               | var(--spacing-md)    |
| --ea-radio-border                       | 边框样式           | var(--ea-border)     |
| --ea-radio-border-radius                | 边框圆角           | var(--border-radius) |
| --ea-radio-border-hover                 | 悬停/选中边框颜色  | var(--blue-400)      |
| --ea-radio-inner-background             | 内部圆点背景颜色   | var(--color-white)   |
| --ea-radio-disabled-color               | 禁用颜色           | var(--grey-300)      |

## RadioGroup API

### RadioGroup Attributes

| 参数     | 说明                   | 类型    | 可选值                          | 默认值 |
| -------- | ---------------------- | ------- | ------------------------------- | ------ |
| value    | 当前选中值             | string  | —                               | ''     |
| label    | 表单标签文本           | string  | —                               | ''     |
| name     | 组名（表单提交时使用） | string  | —                               | ''     |
| disabled | 是否整体禁用           | boolean | —                               | false  |
| size     | 组件尺寸               | string  | `large \| default \| small \| ` | ''     |
| border   | 是否显示边框样式       | boolean | —                               | false  |
| required | 是否必填               | boolean | —                               | false  |

### RadioGroup CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |
| form-label | 表单标签元素 |

### RadioGroup Slots

| 名称    | 说明                       |
| ------- | -------------------------- |
| default | 包含若干 `ea-radio` 子节点 |

### RadioGroup Events

| 事件名 | 说明                 | 回调参数(event.detail)                |
| ------ | -------------------- | ------------------------------------- |
| change | 组内选中值变化时触发 | `{ value: string, checked: boolean }` |

### RadioGroup CSS 自定义属性

| 属性名                       | 说明       | 默认值            |
| ---------------------------- | ---------- | ----------------- |
| --ea-radio-group-gap         | 子组件间距 | var(--spacing-md) |
