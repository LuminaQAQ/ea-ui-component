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

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-select/index.js";
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

移步到 [CSS Part](#select-css-part)。

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

```html
<div class="demo">
  <ea-select placeholder="Select" style="width: 240px">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2">Option 2</ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>
```

## 有禁用选项

在 `ea-option` 中，设定 `disabled` 值为 `true`，即可禁用该选项

<div class="demo">
  <ea-select placeholder="Select" style="width: 240px">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2" disabled> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>

```html
<div class="demo">
  <ea-select placeholder="Select" style="width: 240px">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2" disabled> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>
```

## 禁用状态

为 `ea-select` 设置 `disabled` 属性，则整个选择器不可用

<div class="demo">
  <ea-select style="width: 240px" placeholder="Select" disabled>
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2"> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>

```html
<div class="demo">
  <ea-select style="width: 240px" placeholder="Select" disabled>
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2"> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>
```

## 可清空单选

为 `ea-select` 设置 `clearable` 属性，则可将选择器清空

<div class="demo">
  <ea-select style="width: 240px" placeholder="Select" clearable>
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2"> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>

```html
<div class="demo">
  <ea-select style="width: 240px" placeholder="Select" clearable>
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2"> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>
```

## 尺寸​

使用 `size` 属性改变选择器大小。 除了默认大小外，还有另外两个选项： `large`, `small`。

<div class="demo row left">
  <ea-select style="width: 240px" placeholder="Select" size="large">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2"> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
  <ea-select style="width: 240px" placeholder="Select">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2"> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
  <ea-select style="width: 240px" placeholder="Select" size="small">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2"> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>

::: details 显示代码

```html
<div class="demo">
  <ea-select style="width: 240px" placeholder="Select" size="large">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2"> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
  <ea-select style="width: 240px" placeholder="Select">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2"> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
  <ea-select style="width: 240px" placeholder="Select" size="small">
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2"> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>
```

:::

## 基础多选

为 `ea-select` 设置 `multiple` 属性即可启用多选。

<div class="demo col left"> 
  <p>default</p>
  <ea-select style="width: 240px" placeholder="Select" multiple>
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2"> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>

  <p>use collapse-tags</p>
  <ea-select style="width: 240px" placeholder="Select" multiple collapse-tags>
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2"> Option 2 </ea-option>
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
    <ea-option value="Option 2"> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>

::: details 显示代码

```html
<div class="demo">
  <p>default</p>
  <ea-select style="width: 240px" placeholder="Select" multiple>
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2"> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>

  <p>use collapse-tags</p>
  <ea-select style="width: 240px" placeholder="Select" multiple collapse-tags>
    <ea-option value="Option 1">Option 1</ea-option>
    <ea-option value="Option 2"> Option 2 </ea-option>
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
    <ea-option value="Option 2"> Option 2 </ea-option>
    <ea-option value="Option 3">Option 3</ea-option>
    <ea-option value="Option 4">Option 4</ea-option>
    <ea-option value="Option 5">Option 5</ea-option>
  </ea-select>
</div>
```

:::

## 自定义模板

可以自定义备选项。将自定义的 `HTML` 模板插入 `ea-option` 中即可。

<div class="demo">
  <ea-select style="width: 240px" placeholder="Select" clearable>
    <ea-option value="北京">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">北京</div>
        <div class="ea-select_option-eng">Beijing</div>
      </div>
    </ea-option>
    <ea-option value="上海">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">上海</div>
        <div class="ea-select_option-eng">Shanghai</div>
      </div>
    </ea-option>
    <ea-option value="广州">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">广州</div>
        <div class="ea-select_option-eng">Guangzhou</div>
      </div>
    </ea-option>
    <ea-option value="深圳">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">深圳</div>
        <div class="ea-select_option-eng">Shenzhen</div>
      </div>
    </ea-option>
  </ea-select>
</div>

::: code-group

```html
<div class="demo">
  <ea-select style="width: 240px" placeholder="Select" clearable>
    <ea-option value="北京">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">北京</div>
        <div class="ea-select_option-eng">Beijing</div>
      </div>
    </ea-option>
    <ea-option value="上海">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">上海</div>
        <div class="ea-select_option-eng">Shanghai</div>
      </div>
    </ea-option>
    <ea-option value="广州">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">广州</div>
        <div class="ea-select_option-eng">Guangzhou</div>
      </div>
    </ea-option>
    <ea-option value="深圳">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">深圳</div>
        <div class="ea-select_option-eng">Shenzhen</div>
      </div>
    </ea-option>
  </ea-select>
</div>
```

```css
.ea-select_option-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ea-select_option-eng {
  font-size: 10px;
}
```

:::

## 分组

备选项进行分组展示

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

```html
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
```

## 筛选选项​

可以通过 `filterable` 属性开启筛选功能。

<div class="demo row left">
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

::: details 显示代码

```html
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
```

:::

## 创建新的选项

创建并选中未包含在初始选项中的条目。

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

::: code-group

```html
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

## Select API

### Select Attributes

| 参数                                       | 说明                                                                                     | 类型                              | 可选值                      | 默认值 |
| ------------------------------------------ | ---------------------------------------------------------------------------------------- | --------------------------------- | --------------------------- | ------ |
| name                                       | 输入框的 `name` 属性。若与 `form` 组合使用，则 `form` 的返回值中. 该键名为该 `name` 值。 | String                            | -                           | -      |
| value <ea-tag type="primary">prop</ea-tag> | 选中值，单选时为字符串，多选时为数组                                                     | String / Number / Boolean / Array | -                           | -      |
| placeholder                                | 占位符                                                                                   | String                            | -                           | -      |
| disabled                                   | 是否禁用                                                                                 | Boolean                           | -                           | false  |
| clearable                                  | 是否可清除                                                                               | Boolean                           | -                           | false  |
| size                                       | 尺寸                                                                                     | Enum                              | `small \| default \| large` | -      |
| multiple                                   | 是否多选                                                                                 | Boolean                           | -                           | false  |
| collapse-tags                              | 多选时是否折叠标签                                                                       | Boolean                           | -                           | false  |
| max-collapse-tags                          | 多选折叠时最多显示的标签数量                                                             | Number                            | -                           | 1      |
| filterable                                 | 是否可搜索                                                                               | Boolean                           | -                           | false  |

### Select Slots

| 名称 | 说明     | 子组件                                    |
| ---- | -------- | ----------------------------------------- |
| -    | 默认插槽 | 用于放置 `ea-option` 和 `ea-option-group` |

### Select Events

| 事件名            | 说明                     | 回调参数 ( `event.detail` )                       |
| ----------------- | ------------------------ | ------------------------------------------------- |
| change            | 选中值改变时触发         | `{ value: String \| Number \| Boolean \| Array }` |
| ea-clear          | 清除选中值时触发         | -                                                 |
| ea-visible-change | 下拉框显示状态改变时触发 | `{ visible: boolean }`                            |
| ea-remove-tag     | 多选模式下移除标签时触发 | `{ tag: EaTag, tagValue: string }`                |

### Select CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称          | 说明                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| container     | 外层容器                                                                  |
| input         | 输入框，该组件是对 [ea-input](./ea-input.md) 的二次封装，可以参考对应文档 |
| tag-wrap      | 标签外层容器                                                              |
| clear-icon    | 清除图标                                                                  |
| dropdown-icon | 下拉图标                                                                  |
| dropdown      | 下拉框                                                                    |

## Option API

### Option Attributes

| 参数     | 说明     | 类型    | 可选值 | 默认值 |
| -------- | -------- | ------- | ------ | ------ |
| value    | 选项的值 | String  | -      | -      |
| disabled | 是否禁用 | Boolean | -      | false  |

### Option CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |

## OptionGroup API

## OptionGroup Attributes

| 参数  | 说明       | 类型   | 可选值 | 默认值 | 必填 |
| ----- | ---------- | ------ | ------ | ------ | ---- |
| label | 分组的组名 | String | -      | -      | 否   |

## OptionGroup Slots

| 名称   | 说明     | 子组件      |
| ------ | -------- | ----------- |
| -      | 默认插槽 | `ea-option` |
| header | 标题插槽 | -           |

## OptionGroup CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |
| header    | 标题容器 |
| content   | 内容容器 |
