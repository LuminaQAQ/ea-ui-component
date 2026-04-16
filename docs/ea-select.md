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

## 自定义样式

移步到 [CSS Part](#select-css-part)。

## 基础用法

适用广泛的基础单选

<div class="demo">
  <ea-select placeholder="请选择" style="width: 240px">
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
    <ea-option value="option4">选项 4</ea-option>
    <ea-option value="option5">选项 5</ea-option>
  </ea-select>
</div>

```html
<div class="demo">
  <ea-select placeholder="请选择" style="width: 240px">
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
    <ea-option value="option4">选项 4</ea-option>
    <ea-option value="option5">选项 5</ea-option>
  </ea-select>
</div>
```

## 有禁用选项

在 `ea-option` 中，设定 `disabled` 值为 `true`，即可禁用该选项

<div class="demo">
  <ea-select placeholder="请选择" style="width: 240px">
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2" disabled>选项 2 (禁用)</ea-option>
    <ea-option value="option3">选项 3</ea-option>
    <ea-option value="option4">选项 4</ea-option>
    <ea-option value="option5">选项 5</ea-option>
  </ea-select>
</div>

```html
<div class="demo">
  <ea-select placeholder="请选择" style="width: 240px">
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2" disabled>选项 2 (禁用)</ea-option>
    <ea-option value="option3">选项 3</ea-option>
    <ea-option value="option4">选项 4</ea-option>
    <ea-option value="option5">选项 5</ea-option>
  </ea-select>
</div>
```

## 禁用状态

为 `ea-select` 设置 `disabled` 属性，则整个选择器不可用

<div class="demo">
  <ea-select style="width: 240px" placeholder="请选择" disabled>
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
    <ea-option value="option4">选项 4</ea-option>
    <ea-option value="option5">选项 5</ea-option>
  </ea-select>
</div>

```html
<div class="demo">
  <ea-select style="width: 240px" placeholder="请选择" disabled>
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
    <ea-option value="option4">选项 4</ea-option>
    <ea-option value="option5">选项 5</ea-option>
  </ea-select>
</div>
```

## 可清空单选

为 `ea-select` 设置 `clearable` 属性，则可将选择器清空

<div class="demo">
  <ea-select style="width: 240px" placeholder="请选择" clearable>
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
    <ea-option value="option4">选项 4</ea-option>
    <ea-option value="option5">选项 5</ea-option>
  </ea-select>
</div>

```html
<div class="demo">
  <ea-select style="width: 240px" placeholder="请选择" clearable>
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
    <ea-option value="option4">选项 4</ea-option>
    <ea-option value="option5">选项 5</ea-option>
  </ea-select>
</div>
```

## 尺寸​

使用 `size` 属性改变选择器大小。 除了默认大小外，还有另外两个选项： `large`, `small`。

<div class="demo row left">
  <ea-select style="width: 240px" placeholder="大尺寸" size="large">
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
    <ea-option value="option4">选项 4</ea-option>
    <ea-option value="option5">选项 5</ea-option>
  </ea-select>
  <ea-select style="width: 240px" placeholder="默认尺寸">
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
    <ea-option value="option4">选项 4</ea-option>
    <ea-option value="option5">选项 5</ea-option>
  </ea-select>
  <ea-select style="width: 240px" placeholder="小尺寸" size="small">
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
    <ea-option value="option4">选项 4</ea-option>
    <ea-option value="option5">选项 5</ea-option>
  </ea-select>
</div>

```html
<div class="demo">
  <ea-select style="width: 240px" placeholder="大尺寸" size="large">
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
  </ea-select>
  <ea-select style="width: 240px" placeholder="默认尺寸">
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
  </ea-select>
  <ea-select style="width: 240px" placeholder="小尺寸" size="small">
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
  </ea-select>
</div>
```

## 基础多选

为 `ea-select` 设置 `multiple` 属性即可启用多选模式， 默认情况下选中值会以 Tag 的形式展现

<div class="demo">
  <p>默认多选</p>
  <ea-select id="test" style="width: 240px" placeholder="请选择" multiple>
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
    <ea-option value="option4">选项 4</ea-option>
    <ea-option value="option5">选项 5</ea-option>
  </ea-select>

  <p>标签折叠</p>
  <ea-select
    style="width: 240px"
    placeholder="请选择"
    multiple
    collapseTags
  >
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
    <ea-option value="option4">选项 4</ea-option>
    <ea-option value="option5">选项 5</ea-option>
  </ea-select>

  <p>最大折叠标签数量</p>
  <ea-select
    style="width: 240px"
    placeholder="请选择"
    multiple
    collapseTags
    maxCollapseTags="3"
  >
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
    <ea-option value="option4">选项 4</ea-option>
    <ea-option value="option5">选项 5</ea-option>
  </ea-select>
</div>

```html
<div class="demo">
  <p>默认多选</p>
  <ea-select id="test" style="width: 240px" placeholder="请选择" multiple>
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
  </ea-select>

  <p>标签折叠</p>
  <ea-select
    style="width: 240px"
    placeholder="请选择"
    multiple
    collapseTags
  >
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
  </ea-select>

  <p>最大折叠标签数量</p>
  <ea-select
    style="width: 240px"
    placeholder="请选择"
    multiple
    collapseTags
    maxCollapseTags="3"
  >
    <ea-option value="option1">选项 1</ea-option>
    <ea-option value="option2">选项 2</ea-option>
    <ea-option value="option3">选项 3</ea-option>
  </ea-select>
</div>
```

## 自定义模板

可以自定义备选项的模板

<div class="demo">
  <ea-select style="width: 240px" placeholder="请选择城市" clearable>
    <ea-option value="beijing">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">北京</div>
        <div class="ea-select_option-eng">Beijing</div>
      </div>
    </ea-option>
    <ea-option value="shanghai">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">上海</div>
        <div class="ea-select_option-eng">Shanghai</div>
      </div>
    </ea-option>
    <ea-option value="guangzhou">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">广州</div>
        <div class="ea-select_option-eng">Guangzhou</div>
      </div>
    </ea-option>
    <ea-option value="shenzhen">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">深圳</div>
        <div class="ea-select_option-eng">Shenzhen</div>
      </div>
    </ea-option>
  </ea-select>
</div>

```html
<div class="demo">
  <ea-select style="width: 240px" placeholder="请选择城市" clearable>
    <ea-option value="beijing">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">北京</div>
        <div class="ea-select_option-eng">Beijing</div>
      </div>
    </ea-option>
    <ea-option value="shanghai">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">上海</div>
        <div class="ea-select_option-eng">Shanghai</div>
      </div>
    </ea-option>
    <ea-option value="guangzhou">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">广州</div>
        <div class="ea-select_option-eng">Guangzhou</div>
      </div>
    </ea-option>
    <ea-option value="shenzhen">
      <div class="ea-select_option-wrap">
        <div class="ea-select_option-text">深圳</div>
        <div class="ea-select_option-eng">Shenzhen</div>
      </div>
    </ea-option>
  </ea-select>
</div>
```

## 将选项进行分组

使用 `ea-option-group` 对备选项进行分组

<div class="demo">
  <ea-select placeholder="请选择" style="width: 240px">
    <ea-option-group label="分组 1">
      <ea-option value="option1">选项 1</ea-option>
      <ea-option value="option2">选项 2</ea-option>
      <ea-option value="option3">选项 3</ea-option>
    </ea-option-group>
    <ea-option-group label="分组 2">
      <ea-option value="option4">选项 4</ea-option>
      <ea-option value="option5">选项 5</ea-option>
    </ea-option-group>
  </ea-select>
</div>

```html
<div class="demo">
  <ea-select placeholder="请选择" style="width: 240px">
    <ea-option-group label="分组 1">
      <ea-option value="option1">选项 1</ea-option>
      <ea-option value="option2">选项 2</ea-option>
      <ea-option value="option3">选项 3</ea-option>
    </ea-option-group>
    <ea-option-group label="分组 2">
      <ea-option value="option4">选项 4</ea-option>
      <ea-option value="option5">选项 5</ea-option>
    </ea-option-group>
  </ea-select>
</div>
```

## 筛选选项

可以利用筛选功能快速查找选项

<div class="demo">
  <ea-select style="width: 240px" placeholder="请输入关键词搜索" filterable>
    <ea-option value="apple">苹果</ea-option>
    <ea-option value="banana">香蕉</ea-option>
    <ea-option value="orange">橙子</ea-option>
    <ea-option value="grape">葡萄</ea-option>
    <ea-option value="watermelon">西瓜</ea-option>
  </ea-select>
</div>

```html
<div class="demo">
  <ea-select style="width: 240px" placeholder="请输入关键词搜索" filterable>
    <ea-option value="apple">苹果</ea-option>
    <ea-option value="banana">香蕉</ea-option>
    <ea-option value="orange">橙子</ea-option>
    <ea-option value="grape">葡萄</ea-option>
    <ea-option value="watermelon">西瓜</ea-option>
  </ea-select>
</div>
```

## Select 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| :--- | :--- | :--- | :--- | :--- |
| placeholder | 占位文本 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| clearable | 是否可以清空选项 | boolean | — | false |
| size | 输入框尺寸 | string | large / default / small | default |
| multiple | 是否多选 | boolean | — | false |
| collapseTags | 多选时是否将选中值按文字的形式展示 | boolean | — | false |
| maxCollapseTags | 多选时最多显示标签数量 | number | — | 1 |
| filterable | 是否可搜索 | boolean | — | false |
| value / v-model | 绑定值 | string / number / boolean / array | — | — |

## Select 事件

| 事件名 | 说明 | 参数 |
| :--- | :--- | :--- |
| change | 选中值发生变化时触发 | 目前的选中值 |
| ea-visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| remove-tag | 多选模式下移除tag时触发 | 移除的tag值 |

## Select 方法

| 方法名 | 说明 | 参数 |
| :--- | :--- | :--- |
| focus | 使 input 获取焦点 | — |
| blur | 使 input 失去焦点，并隐藏下拉框 | — |
| show | 显示下拉框 | — |
| hide | 隐藏下拉框 | — |

## Option 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| :--- | :--- | :--- | :--- | :--- |
| value | 选项的值 | string / number / boolean | — | — |
| label | 选项的标签，若不设置则默认与 `value` 相同 | string | — | — |
| disabled | 是否禁用该选项 | boolean | — | false |

## Option Group 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| :--- | :--- | :--- | :--- | :--- |
| label | 分组的组名 | string | — | — |

## Select CSS Part

| 名称 | 说明 |
| :--- | :--- |
| container | 选择器容器 |
| input | 输入框 |
| tag-wrap | 标签包装容器 |
| dropdown | 下拉框 |
| dropdown-icon | 下拉图标 |
| clear-icon | 清除图标 |

## Option CSS Part

| 名称 | 说明 |
| :--- | :--- |
| container | 选项容器 |

## Option Group CSS Part

| 名称 | 说明 |
| :--- | :--- |
| container | 分组容器 |
| header | 分组头部 |
| content | 分组内容 |