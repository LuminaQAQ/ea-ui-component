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
    }
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
        const { checked } = e.target;
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
    }
  };
  indeterminateExample.init();

  const limitExample = {
    group: document.querySelector('#limitGroup'),
    init() {
      if (!this.group) return;
      this.group.value = ["Guangzhou", "Shenzhen"];
    }
  };
  limitExample.init();
})
</script>

# Checkbox 多选框

一组备选项中进行多选。

## 引入

`js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-checkbox/index.js";
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

移步到 [CSS Part](#checkbox-css-part)。

## 基础用法

可以使用 `label` 属性或直接在标签内写文本，并可以添加 `change` 事件监听。

<div class="col left">
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

## 禁用状态

多选框不可用状态。在元素上添加 `disabled` 属性即可。

<div class="demo">
  <ea-checkbox size="large" disabled>Disabled</ea-checkbox>
  <ea-checkbox size="large" disabled checked>
    selected and disabled
  </ea-checkbox>
  <ea-checkbox size="large">Not disabled</ea-checkbox>
</div>

```html
<div class="demo">
  <ea-checkbox size="large" disabled>Disabled</ea-checkbox>
  <ea-checkbox size="large" disabled checked>
    selected and disabled
  </ea-checkbox>
  <ea-checkbox size="large">Not disabled</ea-checkbox>
</div>
```

## 多选框组

`checkbox-group`适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

<div class="row left">
  <ea-checkbox-group id="mulipleGroup" name="mulipleGroup">
    <ea-checkbox label="Option A" value="Value A"></ea-checkbox>
    <ea-checkbox label="Option B" value="Value B"></ea-checkbox>
    <ea-checkbox label="Option C" value="Value C"></ea-checkbox>
    <ea-checkbox label="disabled" value="Value disabled" disabled></ea-checkbox>
    <ea-checkbox label="selected and disabled" value="Value selected and disabled" disabled></ea-checkbox>
  </ea-checkbox-group>
</div>

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
  gruop: document.querySelector("#mulipleGroup"),

  init() {
    this.gruop.value = ["Value selected and disabled", "Value A"];
  },
};

multipleGroupExample.init();
```

:::

## 中间状态

`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果。下面演示如何把单个“全选” checkbox 与一个 `checkbox-group` 同步。

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
    this.group.value = ["Guangzhou", "Shenzhen"];

    const getValueLength = () => {
      return this.group.value.length;
    };

    this.indeterminateCheckbox.addEventListener("change", e => {
      const { checked } = e.target;

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

  cities: ["Shanghai", "Beijing", "Guangzhou", "Shenzhen", "Fujian"],

  init() {
    this.group.value = ["Guangzhou", "Shenzhen"];
  },
};
limitExample.init();
```

:::

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
| label         | 通过属性设置的文本 | string  | -                           | -       |
| value         | 绑定值             | string  | -                           | -       |
| name          | 原生的`name`属性   | string  | -                           | -       |
| disabled      | 是否禁用           | boolean | -                           | false   |
| checked       | 是否选中           | boolean | -                           | false   |
| indeterminate | 是否为半选状态     | boolean | -                           | false   |
| size          | 组件尺寸           | string  | `large \| default \| small` | default |
| border        | 是否带边框样式     | boolean | -                           | false   |

### Checkbox CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明                                                                 |
| --------- | -------------------------------------------------------------------- |
| container | 外层容器(包含 按钮容器`input-container`和 标签容器`label-container`) |
| orignal   | 原生`checkbox`元素                                                   |
| input     | `checkbox` 伪按钮                                                    |
| label     | `label` 标签容器, 用于放置标签内容                                   |

### Checkbox Events

| 事件名 | 说明               | 回调参数                                        |
| ------ | ------------------ | ----------------------------------------------- |
| change | 状态发生变化时触发 | e.detail：`{ value: String, checked: Boolean }` |

### Checkbox Slots

| 名称 | 说明     |
| ---- | -------- |
| -    | 默认插槽 |

## CheckboxGroup API

### CheckboxGroup Attributes

| 参数     | 说明                                             | 类型    | 可选值                      | 默认值 |
| -------- | ------------------------------------------------ | ------- | --------------------------- | ------ |
| name     | 若该组件位于表单内，则该`name`将作为该组值的键名 | string  | -                           | -      |
| value    | 当前选中的值（Array 或 用逗号分隔的字符串）      | string  | `large \| default \| small` | -      |
| size     | 尺寸                                             | string  | -                           | -      |
| disabled | 是否禁用                                         | boolean | -                           | false  |
| min      | 最少可选数量                                     | number  | -                           | -      |
| max      | 最多可选数量                                     | number  | -                           | -      |

### CheckboxGroup CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |

### CheckboxGroup Slots

| 名称 | 说明     |
| ---- | -------- |
| -    | 默认插槽 |
