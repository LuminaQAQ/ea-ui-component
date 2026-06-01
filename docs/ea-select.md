<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {

const createOptionExample = {
  examples: document.querySelectorAll(".create-example"),

  init() {
    this.examples.forEach(example => {
      const button = example.querySelector("ea-button");
      const select = example.querySelector("ea-select");
      const isMultiple = select.hasAttribute("multiple");

      button.addEventListener("click", () => {
        if (select.querySelector("ea-option[value='Option 6']")) return;

        const option = document.createElement("ea-option");
        option.value = "Option 6";
        option.textContent = "Option 6";
        select.appendChild(option);

        select.value = isMultiple ? ["Option 6"] : "Option 6";
      });
    });
  },
};
createOptionExample.init();

})
</script>

<style scoped>
.ea-select_option-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.ea-select_option-eng {
    font-size: 10px;
}
</style>

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-select.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-select";
```

:::

## 自定义样式

移步到 [CSS Part](#select-css-part) 和 [CSS Custom Properties](#select-css-自定义属性)。

## 基础用法

适用广泛的基础单选

<div class="demo">
  <ea-select placeholder="Select" style="width: 240px">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2">Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>

::: details 查看代码

```html
<ea-select placeholder="Select" style="width: 240px">
  <ea-option value="Option 1">Option 1</ea-option>
  <ea-option value="Option 2">Option 2</ea-option>
  <ea-option value="Option 3">Option 3</ea-option>
  <ea-option value="Option 4">Option 4</ea-option>
  <ea-option value="Option 5">Option 5</ea-option>
</ea-select>
```

:::

## 有禁用选项

在 `ea-option` 中，设定 `disabled` 值为 `true`，即可禁用该选项

<div class="demo">
  <ea-select placeholder="Select" style="width: 240px">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2" disabled>Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>

::: details 查看代码

```html
<ea-select placeholder="Select" style="width: 240px">
  <ea-option value="Option 1">Option 1</ea-option>
  <ea-option value="Option 2" disabled>Option 2</ea-option>
  <ea-option value="Option 3">Option 3</ea-option>
  <ea-option value="Option 4">Option 4</ea-option>
  <ea-option value="Option 5">Option 5</ea-option>
</ea-select>
```

:::

## 禁用状态

为 `ea-select` 设置 `disabled` 属性，则整个选择器不可用

<div class="demo">
  <ea-select style="width: 240px" placeholder="Select" disabled>
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2">Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>

::: details 查看代码

```html
<ea-select style="width: 240px" placeholder="Select" disabled>
  <ea-option value="Option 1">Option 1</ea-option>
  <ea-option value="Option 2">Option 2</ea-option>
  <ea-option value="Option 3">Option 3</ea-option>
  <ea-option value="Option 4">Option 4</ea-option>
  <ea-option value="Option 5">Option 5</ea-option>
</ea-select>
```

:::

## 可清空

为 `ea-select` 设置 `clearable` 属性，则可将选择器清空

<div class="demo">
  <ea-select style="width: 240px" placeholder="Select" clearable>
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2">Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>

::: details 查看代码

```html
<ea-select style="width: 240px" placeholder="Select" clearable>
  <ea-option value="Option 1">Option 1</ea-option>
  <ea-option value="Option 2">Option 2</ea-option>
  <ea-option value="Option 3">Option 3</ea-option>
  <ea-option value="Option 4">Option 4</ea-option>
  <ea-option value="Option 5">Option 5</ea-option>
</ea-select>
```

:::

## 尺寸

使用 `size` 属性改变选择器大小。 除了默认大小外，还有另外两个选项： `large`, `small`。

<div class="demo row left">
  <ea-select style="width: 240px" placeholder="Large" size="large">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2">Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
  </ea-select>
  <ea-select style="width: 240px" placeholder="Default">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2">Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
  </ea-select>
  <ea-select style="width: 240px" placeholder="Small" size="small">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2">Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
  </ea-select>
</div>

::: details 查看代码

```html
<ea-select style="width: 240px" placeholder="Large" size="large">
  <ea-option value="Option 1">Option 1</ea-option>
  <ea-option value="Option 2">Option 2</ea-option>
  <ea-option value="Option 3">Option 3</ea-option>
</ea-select>
<ea-select style="width: 240px" placeholder="Default">
  <ea-option value="Option 1">Option 1</ea-option>
  <ea-option value="Option 2">Option 2</ea-option>
  <ea-option value="Option 3">Option 3</ea-option>
</ea-select>
<ea-select style="width: 240px" placeholder="Small" size="small">
  <ea-option value="Option 1">Option 1</ea-option>
  <ea-option value="Option 2">Option 2</ea-option>
  <ea-option value="Option 3">Option 3</ea-option>
</ea-select>
```

:::

## 基础多选

为 `ea-select` 设置 `multiple` 属性即可启用多选模式， 默认情况下选中值会以 Tag 的形式展现

<div class="demo">
  <p>default</p>
  <ea-select style="width: 240px" placeholder="Select" multiple>
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2">Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>

  <p>use collapse-tags</p>
  <ea-select
    style="width: 240px"
    placeholder="Select"
    multiple
    collapse-tags
  >
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2">Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>

  <p>max-collapse-tags</p>
  <ea-select
    style="width: 240px"
    placeholder="Select"
    multiple
    collapse-tags
    max-collapse-tags="3"
  >
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2">Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>

::: details 查看代码

```html
<ea-select style="width: 240px" placeholder="Select" multiple>
  <ea-option value="Option 1">Option 1</ea-option>
  <ea-option value="Option 2">Option 2</ea-option>
  <ea-option value="Option 3">Option 3</ea-option>
</ea-select>

<ea-select style="width: 240px" placeholder="Select" multiple collapse-tags>
  <ea-option value="Option 1">Option 1</ea-option>
  <ea-option value="Option 2">Option 2</ea-option>
  <ea-option value="Option 3">Option 3</ea-option>
</ea-select>

<ea-select
  style="width: 240px"
  placeholder="Select"
  multiple
  collapse-tags
  max-collapse-tags="3"
>
  <ea-option value="Option 1">Option 1</ea-option>
  <ea-option value="Option 2">Option 2</ea-option>
  <ea-option value="Option 3">Option 3</ea-option>
</ea-select>
```

:::

## 自定义模板

可以自定义备选项的模板，使用 `label` 属性指定选中后显示的文本

<div class="demo">
  <ea-select style="width: 240px" placeholder="Select city" clearable>
    <ea-option value="beijing" label="Beijing">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">Beijing</div>
        <div class="ea-select_option-eng">北京</div>
      </div>
    </ea-option>
    <ea-option value="shanghai" label="Shanghai">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">Shanghai</div>
        <div class="ea-select_option-eng">上海</div>
      </div>
    </ea-option>
    <ea-option value="guangzhou" label="Guangzhou">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">Guangzhou</div>
        <div class="ea-select_option-eng">广州</div>
      </div>
    </ea-option>
    <ea-option value="shenzhen" label="Shenzhen">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">Shenzhen</div>
        <div class="ea-select_option-eng">深圳</div>
      </div>
    </ea-option>
  </ea-select>
</div>

::: details 查看代码

```html
<ea-select style="width: 240px" placeholder="Select city" clearable>
  <ea-option value="beijing" label="Beijing">
    <div class="ea-select_option-wrap">
      <div class="ea-select_option-text">Beijing</div>
      <div class="ea-select_option-eng">北京</div>
    </div>
  </ea-option>
  <ea-option value="shanghai" label="Shanghai">
    <div class="ea-select_option-wrap">
      <div class="ea-select_option-text">Shanghai</div>
      <div class="ea-select_option-eng">上海</div>
    </div>
  </ea-option>
</ea-select>
```

:::

## 将选项进行分组

使用 `ea-option-group` 对备选项进行分组

<div class="demo">
  <ea-select placeholder="Select" style="width: 240px">
    <ea-option-group label="Group 1">
      <ea-option value="Option 1">Option 1</ea-option>
      <ea-option value="Option 2">Option 2</ea-option>
      <ea-option value="Option 3">Option 3</ea-option>
    </ea-option-group>
    <ea-option-group label="Group 2">
      <ea-option value="Option 4">Option 4</ea-option>
      <ea-option value="Option 5">Option 5</ea-option>
    </ea-option-group>
  </ea-select>
</div>

::: details 查看代码

```html
<ea-select placeholder="Select" style="width: 240px">
  <ea-option-group label="Group 1">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2">Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
  </ea-option-group>
  <ea-option-group label="Group 2">
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-option-group>
</ea-select>
```

:::

## 筛选选项

可以利用筛选功能快速查找选项

<div class="demo">
  <ea-select style="width: 240px" placeholder="Select" filterable>
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2">Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>

  <ea-select style="width: 240px" placeholder="Select" multiple filterable>
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2">Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>

::: details 查看代码

```html
<ea-select style="width: 240px" placeholder="Select" filterable>
  <ea-option value="Option 1">Option 1</ea-option>
  <ea-option value="Option 2">Option 2</ea-option>
  <ea-option value="Option 3">Option 3</ea-option>
  <ea-option value="Option 4">Option 4</ea-option>
  <ea-option value="Option 5">Option 5</ea-option>
</ea-select>

<ea-select style="width: 240px" placeholder="Select" multiple filterable>
  <ea-option value="Option 1">Option 1</ea-option>
  <ea-option value="Option 2">Option 2</ea-option>
  <ea-option value="Option 3">Option 3</ea-option>
  <ea-option value="Option 4">Option 4</ea-option>
  <ea-option value="Option 5">Option 5</ea-option>
</ea-select>
```

:::

## 创建新的选项

可以通过 JavaScript 动态添加选项到选择器中

<div class="demo">
  <section class="create-example">
    <p>Single select</p>
    <ea-select style="width: 240px" placeholder="Select">
      <ea-option value="Option 1">Option 1</ea-option>
      <ea-option value="Option 2">Option 2</ea-option>
      <ea-option value="Option 3">Option 3</ea-option>
      <ea-option value="Option 4">Option 4</ea-option>
      <ea-option value="Option 5">Option 5</ea-option>
    </ea-select>
    <br />
    <ea-button>Add "Option 6" option</ea-button>
  </section>
  <section class="create-example">
    <p>Multiple Select</p>
    <ea-select style="width: 240px" placeholder="Select" multiple>
      <ea-option value="Option 1">Option 1</ea-option>
      <ea-option value="Option 2">Option 2</ea-option>
      <ea-option value="Option 3">Option 3</ea-option>
      <ea-option value="Option 4">Option 4</ea-option>
      <ea-option value="Option 5">Option 5</ea-option>
    </ea-select>
    <br />
    <ea-button>Add "Option 6" option</ea-button>
  </section>
</div>

:::: details 查看代码

::: code-group

```html
<section class="create-example">
  <p>Single select</p>
  <ea-select style="width: 240px" placeholder="Select">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2">Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
  <br />
  <ea-button>Add "Option 6" option</ea-button>
</section>
<section class="create-example">
  <p>Multiple Select</p>
  <ea-select style="width: 240px" placeholder="Select" multiple>
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2">Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
  <br />
  <ea-button>Add "Option 6" option</ea-button>
</section>
```

```js
const createOptionExample = {
  examples: document.querySelectorAll(".create-example"),

  init() {
    this.examples.forEach(example => {
      const button = example.querySelector("ea-button");
      const select = example.querySelector("ea-select");
      const isMultiple = select.hasAttribute("multiple");

      button.addEventListener("click", () => {
        if (select.querySelector("ea-option[value='Option 6']")) return;

        const option = document.createElement("ea-option");
        option.value = "Option 6";
        option.textContent = "Option 6";
        select.appendChild(option);

        select.value = isMultiple ? ["Option 6"] : "Option 6";
      });
    });
  },
};
createOptionExample.init();
```

:::

::::

## Select API

### Select Attributes

| 属性名            | 说明                               | 类型                              | 可选值                  | 默认值  |
| :---------------- | :--------------------------------- | :-------------------------------- | :---------------------- | :------ |
| placeholder       | 占位文本                           | string                            | —                       | —       |
| disabled          | 是否禁用                           | boolean                           | —                       | false   |
| clearable         | 是否可以清空选项                   | boolean                           | —                       | false   |
| size              | 输入框尺寸                         | string                            | large / default / small | default |
| multiple          | 是否多选                           | boolean                           | —                       | false   |
| collapse-tags     | 多选时是否将选中值按文字的形式展示 | boolean                           | —                       | false   |
| max-collapse-tags | 多选时最多显示标签数量             | number                            | —                       | 1       |
| filterable        | 是否可搜索                         | boolean                           | —                       | false   |
| required          | 是否必填                           | boolean                           | —                       | false   |
| value / v-model   | 绑定值                             | string / number / boolean / array | —                       | —       |

### Select Events

| 事件名            | 说明                                     | 回调参数(event.detail) |
| :---------------- | :--------------------------------------- | :--------------------- |
| change            | 选中值发生变化时触发                     | `{ value }`            |
| ea-visible-change | 下拉框出现/隐藏时触发                    | `{ visible }`          |
| ea-clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                      |
| ea-remove-tag     | 多选模式下移除tag时触发                  | `{ tag, tagValue }`    |

### Select Methods

| 方法名         | 说明                         | 参数 |
| :------------- | :--------------------------- | :--- |
| show           | 显示下拉框                   | —    |
| hide           | 隐藏下拉框                   | —    |
| checkValidity  | 检查表单字段有效性           | —    |
| reportValidity | 报告表单字段有效性并显示提示 | —    |

### Select CSS Part

| 名称          | 说明         |
| :------------ | :----------- |
| container     | 选择器容器   |
| input         | 输入框       |
| tag-wrap      | 标签包装容器 |
| dropdown      | 下拉框       |
| dropdown-icon | 下拉图标     |
| clear-icon    | 清除图标     |

### Select CSS Custom Properties

| 属性名                           | 说明             | 默认值                 |
| :------------------------------- | :--------------- | :--------------------- |
| --ea-select-height-small         | 小尺寸高度       | 22px                   |
| --ea-select-height-default       | 默认尺寸高度     | 30px                   |
| --ea-select-height-large         | 大尺寸高度       | 38px                   |
| --ea-select-dropdown-bg-color    | 下拉框背景颜色   | var(--color-white)     |
| --ea-select-color                | 文本颜色         | var(--grey-700)        |
| --ea-select-placeholder-color    | 占位符颜色       | var(--grey-500)        |
| --ea-select-transition           | 过渡时长         | var(--transition-fast) |
| --ea-select-border-color         | 边框颜色         | var(--grey-300)        |
| --ea-select-border-invalid-color | 无效状态边框颜色 | var(--red-500)         |

### Select Slots

| 名称    | 说明                                            |
| :------ | :---------------------------------------------- |
| default | 默认插槽，用于放置 ea-option 或 ea-option-group |

## Option API

### Option Attributes

| 属性名   | 说明                                                                                                                       | 类型                      | 可选值 | 默认值 |
| :------- | :------------------------------------------------------------------------------------------------------------------------- | :------------------------ | :----- | :----- |
| value    | 选项的值                                                                                                                   | string / number / boolean | —      | —      |
| label    | 选项的显示文本，若不设置则默认使用 `textContent`。当选项内容较复杂时（如包含多个元素），建议使用此属性指定选中后显示的文本 | string                    | —      | null   |
| disabled | 是否禁用该选项                                                                                                             | boolean                   | —      | false  |
| selected | 是否选中该选项                                                                                                             | boolean                   | —      | false  |

### Option CSS Part

| 名称      | 说明     |
| :-------- | :------- |
| container | 选项容器 |

### Option Slots

| 名称    | 说明     |
| :------ | :------- |
| default | 选项内容 |

## Option Group API

### Option Group Attributes

| 属性名 | 说明       | 类型   | 可选值 | 默认值 |
| :----- | :--------- | :----- | :----- | :----- |
| label  | 分组的组名 | string | —      | —      |

### Option Group CSS Part

| 名称      | 说明     |
| :-------- | :------- |
| container | 分组容器 |
| header    | 分组头部 |
| content   | 分组内容 |

### Option Group Slots

| 名称    | 说明                         |
| :------ | :--------------------------- |
| header  | 自定义分组头部内容           |
| default | 默认插槽，用于放置 ea-option |
