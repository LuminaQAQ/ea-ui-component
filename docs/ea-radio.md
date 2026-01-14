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

`css`

::: tip
如果使用到带图标的属性/组件，请提前通过 `link` 引入图标样式文件。
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
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

```html
<div class="demo">
  <ea-radio-group value="selected and disabled">
    <ea-radio value="disabled" disabled>Option A</ea-radio>
    <ea-radio value="selected and disabled" disabled>Option B</ea-radio>
  </ea-radio-group>
</div>
```

## 单选框组

基础的互斥选项组

<div class="demo">
  <ea-radio-group value="3">
    <ea-radio value="3">Option A</ea-radio>
    <ea-radio value="6">Option B</ea-radio>
    <ea-radio value="9">Option C</ea-radio>
  </ea-radio-group>
</div>

```html
<div class="demo">
  <ea-radio-group value="3">
    <ea-radio value="3">Option A</ea-radio>
    <ea-radio value="6">Option B</ea-radio>
    <ea-radio value="9">Option C</ea-radio>
  </ea-radio-group>
</div>
```

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

### Attributes

| 参数     | 说明                                            | 类型    | 可选值                      | 默认值  |
| -------- | ----------------------------------------------- | ------- | --------------------------- | ------- |
| name     | 绑定的组名（提交或选择时的分组依据）            | string  | —                           | ''      |
| value    | 选项的值                                        | string  | —                           | ''      |
| disabled | 是否禁用                                        | boolean | —                           | false   |
| label    | 选项的显示文本（未指定时以 slot 或 value 为准） | string  | —                           | ''      |
| border   | 是否显示边框样式                                | boolean | —                           | false   |
| size     | 组件尺寸                                        | string  | `large \| default \| small` | default |

### Events

| 事件名 | 说明                                                 | 回调参数（event.detail） |
| ------ | ---------------------------------------------------- | ------------------------ |
| change | 单个选项被点击并成为选中项时可能触发（委托给 group） | `{ value: string }`      |

### Slots

| 名称 | 说明                        |
| ---- | --------------------------- |
| -    | 单个选项的显示内容（label） |

### CSS Part

| 名称       | 说明                   |
| ---------- | ---------------------- |
| container  | 外层容器               |
| input-wrap | 输入框容器             |
| input      | 输入框（非原生 input） |
| label-wrap | label 容器             |

## RadioGroup API

### Attributes

| 参数     | 说明                   | 类型    | 可选值                      | 默认值  |
| -------- | ---------------------- | ------- | --------------------------- | ------- |
| name     | 组名（表单提交时使用） | string  | —                           | ''      |
| value    | 当前选中值             | string  | —                           | ''      |
| disabled | 是否整体禁用           | boolean | —                           | false   |
| size     | 组件尺寸               | string  | `large \| default \| small` | default |
| border   | 是否显示边框样式       | boolean | —                           | false   |

### Events

| 事件名 | 说明                 | 回调参数（event.detail） |
| ------ | -------------------- | ------------------------ |
| change | 组内选中值变化时触发 | `{ value: string }`      |

### Slots

| 名称 | 说明                       |
| ---- | -------------------------- |
| -    | 包含若干 `ea-radio` 子节点 |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |
