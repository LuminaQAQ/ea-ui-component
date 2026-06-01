<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {

  const multipleGroupExample = {
    group: document.querySelector('#mulipleGroup'),

    init() {
      if (!this.group) return;
      this.group.value = ["Value selected and disabled", "Value A"];
    },
  };
  multipleGroupExample.init();

  const indeterminateExample = {
    indeterminateCheckbox: document.querySelector("#indeterminateCheckbox"),
    group: document.querySelector("#indeterminateGroup"),

    cities: ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"],

    init() {
      if (!this.group || !this.indeterminateCheckbox) return;
      this.group.value = ["Guangzhou", "Shenzhen"];

      const getValueLength = () => this.group.value.length;

      this.indeterminateCheckbox.addEventListener("change", e => {
        const { checked } = e.detail;

        if (checked) this.group.value = this.cities;
        else this.group.value = [];

        this.indeterminateCheckbox.indeterminate =
          getValueLength() > 0 && getValueLength() < this.cities.length;
      });

      this.group.addEventListener("change", e => {
        this.indeterminateCheckbox.indeterminate =
          getValueLength() > 0 && getValueLength() < this.cities.length;
        this.indeterminateCheckbox.checked =
          getValueLength() === this.cities.length;
      });
    },
  };
  indeterminateExample.init();

  const limitExample = {
    group: document.querySelector('#limitGroup'),

    init() {
      if (!this.group) return;
      this.group.value = ["Guangzhou", "Shenzhen"];
    },
  };
  limitExample.init();
})
</script>

# Checkbox 多选框

一组备选项中进行多选。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-checkbox.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-checkbox";
```

:::

## 自定义样式

移步到 [CSS Part](#checkbox-css-part)。

## 基础用法

可以使用 `label` 属性或直接在标签内写文本，并可以监听 `change` 事件。

<div class="row left">
  <div>
    <ea-checkbox label="Option 1" size="large"></ea-checkbox>
    <ea-checkbox label="Option 2" size="large"></ea-checkbox>
  </div>
  <div>
    <ea-checkbox label="Option 1"></ea-checkbox>
    <ea-checkbox label="Option 2"></ea-checkbox>
  </div>
  <div>
    <ea-checkbox label="Option 1" size="small"></ea-checkbox>
    <ea-checkbox label="Option 2" size="small"></ea-checkbox>
  </div>
</div>

::: details 查看代码

```html
<div class="demo">
  <div>
    <ea-checkbox label="Option 1" size="large"></ea-checkbox>
    <ea-checkbox label="Option 2" size="large"></ea-checkbox>
  </div>
  <div>
    <ea-checkbox label="Option 1"></ea-checkbox>
    <ea-checkbox label="Option 2"></ea-checkbox>
  </div>
  <div>
    <ea-checkbox label="Option 1" size="small"></ea-checkbox>
    <ea-checkbox label="Option 2" size="small"></ea-checkbox>
  </div>
</div>
```

:::

## 禁用状态

多选框不可用状态。在元素上添加 `disabled` 属性即可。

<div class="demo">
  <ea-checkbox size="large" disabled>Disabled</ea-checkbox>
  <ea-checkbox size="large" disabled checked>
    selected and disabled
  </ea-checkbox>
  <ea-checkbox size="large">Not disabled</ea-checkbox>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-checkbox size="large" disabled>Disabled</ea-checkbox>
  <ea-checkbox size="large" disabled checked>
    selected and disabled
  </ea-checkbox>
  <ea-checkbox size="large">Not disabled</ea-checkbox>
</div>
```

:::

## 多选框组

`checkbox-group` 适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

<div class="row left">
  <ea-checkbox-group id="mulipleGroup" name="mulipleGroup">
    <ea-checkbox label="Option A" value="Value A"></ea-checkbox>
    <ea-checkbox label="Option B" value="Value B"></ea-checkbox>
    <ea-checkbox label="Option C" value="Value C"></ea-checkbox>
    <ea-checkbox label="disabled" value="Value disabled" disabled></ea-checkbox>
    <ea-checkbox label="selected and disabled" value="Value selected and disabled" disabled></ea-checkbox>
  </ea-checkbox-group>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-checkbox-group id="mulipleGroup" name="mulipleGroup">
    <ea-checkbox label="Option A" value="Value A"></ea-checkbox>
    <ea-checkbox label="Option B" value="Value B"></ea-checkbox>
    <ea-checkbox label="Option C" value="Value C"></ea-checkbox>
    <ea-checkbox label="disabled" value="Value disabled" disabled></ea-checkbox>
    <ea-checkbox
      label="selected and disabled"
      value="Value selected and disabled"
      disabled
    ></ea-checkbox>
  </ea-checkbox-group>
</div>
```

```js
const multipleGroupExample = {
  group: document.querySelector("#mulipleGroup"),

  init() {
    if (!this.group) return;
    this.group.value = ["Value selected and disabled", "Value A"];
  },
};

multipleGroupExample.init();
```

:::

::::

## 中间状态

`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果。下面演示如何把单个"全选" checkbox 与一个 `checkbox-group` 同步。

<div class="demo">
  <ea-checkbox
    id="indeterminateCheckbox"
    label="Check all"
    indeterminate
  ></ea-checkbox>
  <ea-checkbox-group id="indeterminateGroup" name="city">
    <ea-checkbox label="Shanghai" value="Shanghai"></ea-checkbox>
    <ea-checkbox label="Beijing" value="Beijing"></ea-checkbox>
    <ea-checkbox label="Guangzhou" value="Guangzhou"></ea-checkbox>
    <ea-checkbox label="Shenzhen" value="Shenzhen"></ea-checkbox>
  </ea-checkbox-group>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-checkbox
    id="indeterminateCheckbox"
    label="Check all"
    indeterminate
  ></ea-checkbox>
  <ea-checkbox-group id="indeterminateGroup" name="city">
    <ea-checkbox label="Shanghai" value="Shanghai"></ea-checkbox>
    <ea-checkbox label="Beijing" value="Beijing"></ea-checkbox>
    <ea-checkbox label="Guangzhou" value="Guangzhou"></ea-checkbox>
    <ea-checkbox label="Shenzhen" value="Shenzhen"></ea-checkbox>
  </ea-checkbox-group>
</div>
```

```js
const indeterminateExample = {
  indeterminateCheckbox: document.querySelector("#indeterminateCheckbox"),
  group: document.querySelector("#indeterminateGroup"),

  cities: ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"],

  init() {
    if (!this.group || !this.indeterminateCheckbox) return;
    this.group.value = ["Guangzhou", "Shenzhen"];

    const getValueLength = () => this.group.value.length;

    this.indeterminateCheckbox.addEventListener("change", e => {
      const { checked } = e.detail;

      if (checked) this.group.value = this.cities;
      else this.group.value = [];

      this.indeterminateCheckbox.indeterminate =
        getValueLength() > 0 && getValueLength() < this.cities.length;
    });

    this.group.addEventListener("change", e => {
      this.indeterminateCheckbox.indeterminate =
        getValueLength() > 0 && getValueLength() < this.cities.length;
      this.indeterminateCheckbox.checked =
        getValueLength() === this.cities.length;
    });
  },
};

indeterminateExample.init();
```

:::

::::

## 可选项目数量的限制

`ea-checkbox-group` 支持 `min`、`max` 属性来限制可选项数量。

<div class="demo">
  <ea-checkbox-group id="limitGroup" name="city" min="1" max="2">
    <ea-checkbox label="Shanghai" value="Shanghai"></ea-checkbox>
    <ea-checkbox label="Beijing" value="Beijing"></ea-checkbox>
    <ea-checkbox label="Guangzhou" value="Guangzhou"></ea-checkbox>
    <ea-checkbox label="Shenzhen" value="Shenzhen"></ea-checkbox>
    <ea-checkbox label="Fujian" value="Fujian" disabled></ea-checkbox>
  </ea-checkbox-group>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-checkbox-group id="limitGroup" name="city" min="1" max="2">
    <ea-checkbox label="Shanghai" value="Shanghai"></ea-checkbox>
    <ea-checkbox label="Beijing" value="Beijing"></ea-checkbox>
    <ea-checkbox label="Guangzhou" value="Guangzhou"></ea-checkbox>
    <ea-checkbox label="Shenzhen" value="Shenzhen"></ea-checkbox>
    <ea-checkbox label="Fujian" value="Fujian" disabled></ea-checkbox>
  </ea-checkbox-group>
</div>
```

```js
const limitExample = {
  group: document.querySelector("#limitGroup"),

  init() {
    if (!this.group) return;
    this.group.value = ["Guangzhou", "Shenzhen"];
  },
};

limitExample.init();
```

:::

::::

## 带有边框

支持 `border` 属性展现带边框的样式。

<div class="col left">
  <div>
    <ea-checkbox label="Option 1" size="large" border checked></ea-checkbox>
    <ea-checkbox label="Option 2" size="large" border></ea-checkbox>
  </div>
  <div>
    <ea-checkbox label="Option 1" border checked></ea-checkbox>
    <ea-checkbox label="Option 2" border></ea-checkbox>
  </div>
  <div>
    <ea-checkbox label="Option 1" size="small" border checked></ea-checkbox>
    <ea-checkbox label="Option 2" size="small" border></ea-checkbox>
  </div>
  <div>
    <ea-checkbox label="Option 1" size="small" border disabled checked></ea-checkbox>
    <ea-checkbox label="Option 2" size="small" border disabled></ea-checkbox>
  </div>
</div>

::: details 查看代码

```html
<div class="demo">
  <div>
    <ea-checkbox label="Option 1" size="large" border checked></ea-checkbox>
    <ea-checkbox label="Option 2" size="large" border></ea-checkbox>
  </div>
  <div>
    <ea-checkbox label="Option 1" border checked></ea-checkbox>
    <ea-checkbox label="Option 2" border></ea-checkbox>
  </div>
  <div>
    <ea-checkbox label="Option 1" size="small" border checked></ea-checkbox>
    <ea-checkbox label="Option 2" size="small" border></ea-checkbox>
  </div>
  <div>
    <ea-checkbox
      label="Option 1"
      size="small"
      border
      disabled
      checked
    ></ea-checkbox>
    <ea-checkbox label="Option 2" size="small" border disabled></ea-checkbox>
  </div>
</div>
```

:::

## Checkbox API

### Checkbox Attributes

| 参数          | 说明               | 类型    | 可选值                      | 默认值  |
| ------------- | ------------------ | ------- | --------------------------- | ------- |
| label         | 通过属性设置的文本 | string  | —                           | —       |
| value         | 绑定值             | string  | —                           | —       |
| name          | 原生的 `name` 属性 | string  | —                           | —       |
| disabled      | 是否禁用           | boolean | —                           | false   |
| checked       | 是否选中           | boolean | —                           | false   |
| indeterminate | 是否为半选状态     | boolean | —                           | false   |
| size          | 组件尺寸           | string  | `large \| default \| small` | default |
| border        | 是否带边框样式     | boolean | —                           | false   |
| limitDisabled | 是否被限制禁用     | boolean | —                           | false   |
| required      | 是否必填           | boolean | —                           | false   |

### Checkbox CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明               |
| --------- | ------------------ |
| container | 外层 label 容器    |
| original  | 原生 checkbox 元素 |
| input     | 伪复选框元素       |
| label     | 标签容器元素       |

### Checkbox Events

| 事件名 | 说明               | 回调参数(event.detail)                |
| ------ | ------------------ | ------------------------------------- |
| change | 选中状态变化时触发 | `{ value: string, checked: boolean }` |
| focus  | 获得焦点时触发     | `{ value: string, checked: boolean }` |
| blur   | 失去焦点时触发     | `{ value: string, checked: boolean }` |

### Checkbox Methods

| 方法名 | 说明         | 参数 |
| ------ | ------------ | ---- |
| focus  | 获取焦点     | —    |
| blur   | 失去焦点     | —    |
| toggle | 切换选中状态 | —    |

### Checkbox Slots

| 名称    | 说明                         |
| ------- | ---------------------------- |
| default | 默认插槽，用于多选框标签内容 |

### Checkbox CSS Custom Properties

| 属性名                                  | 说明             | 默认值                |
| --------------------------------------- | ---------------- | --------------------- |
| --ea-checkbox-size                      | 复选框尺寸       | `var(--font-size-md)` |
| --ea-checkbox-spacing                   | 内边距           | `var(--spacing-md)`   |
| --ea-checkbox-font-size                 | 字体大小         | `var(--font-size-md)` |
| --ea-checkbox-box-spacing               | 复选框与标签间距 | `var(--spacing-md)`   |
| --ea-checkbox-box-bg-color              | 选中背景颜色     | `var(--blue-500)`     |
| --ea-checkbox-box-bg-disabled-color     | 禁用背景颜色     | `var(--grey-100)`     |
| --ea-checkbox-box-border-color          | 边框颜色         | `var(--grey-300)`     |
| --ea-checkbox-box-border-disabled-color | 禁用边框颜色     | `var(--grey-200)`     |
| --ea-checkbox-box-border-active-color   | 选中边框颜色     | `var(--blue-500)`     |
| --ea-checkbox-check-color               | 勾选颜色         | `var(--color-white)`  |
| --ea-checkbox-check-disabled-color      | 禁用勾选颜色     | `var(--grey-400)`     |
| --ea-checkbox-label-color               | 选中标签颜色     | `var(--blue-500)`     |
| --ea-checkbox-disabled-color            | 禁用标签颜色     | `var(--grey-500)`     |

## CheckboxGroup API

### CheckboxGroup Attributes

| 参数     | 说明                                             | 类型    | 可选值                      | 默认值   |
| -------- | ------------------------------------------------ | ------- | --------------------------- | -------- |
| label    | 表单标签                                         | string  | —                           | —        |
| name     | 若该组件位于表单内，则该 name 将作为该组值的键名 | string  | —                           | —        |
| value    | 当前选中的值                                     | any[]   | —                           | []       |
| size     | 尺寸                                             | string  | `large \| default \| small` | —        |
| disabled | 是否禁用                                         | boolean | —                           | false    |
| min      | 最少可选数量                                     | number  | —                           | 0        |
| max      | 最多可选数量                                     | number  | —                           | Infinity |
| required | 是否必填                                         | boolean | —                           | false    |

### CheckboxGroup CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称       | 说明         |
| ---------- | ------------ |
| container  | 外层容器     |
| form-label | 表单标签元素 |

### CheckboxGroup Slots

| 名称    | 说明                           |
| ------- | ------------------------------ |
| default | 默认插槽，用于放置 ea-checkbox |

### CheckboxGroup CSS Custom Properties

| 属性名                  | 说明       | 默认值              |
| ----------------------- | ---------- | ------------------- |
| --ea-checkbox-group-gap | 子组件间距 | `var(--spacing-md)` |
