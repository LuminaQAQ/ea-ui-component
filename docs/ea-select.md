<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('./index.scss')
    
    import('../components/ea-icon/index.js')
    import('../components/ea-icon/index.css')
    
    import('../components/ea-input/index.js')
    import('../components/ea-empty/index.js')
    import('../components/ea-select/index.js')

    document.getElementById('clearableSelect').addEventListener('clear', (e) => {
        console.log('clear', e.detail)
    })

    document.getElementById('basicSelect').addEventListener('change', (e) => {
        console.log('change', e.detail)
    })
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

<!-- -------- 1. 基础用法 --------  -->
<!-- #region  -->
<div class="demo">
    <ea-select id="basicSelect" placeholder="请选择">
        <ea-option value="1">选项1</ea-option>
        <ea-option value="2">选项2</ea-option>
        <ea-option value="3">选项3</ea-option>
        <ea-option value="4">选项4</ea-option>
    </ea-select>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

::: details 显示代码

`html`

```html
<div class="demo">
  <ea-select placeholder="请选择">
    <ea-option value="1">选项1</ea-option>
    <ea-option value="2">选项2</ea-option>
    <ea-option value="3">选项3</ea-option>
    <ea-option value="4">选项4</ea-option>
  </ea-select>
</div>
```

`js`

```js
document.getElementById("basicSelect").addEventListener("change", (e) => {
  console.log("change", e.detail);
});
```

:::

## 有禁用选项

在 `ea-option` 中，设定 `disabled` 值为 `true`，即可禁用该选项

<div class="demo">
    <ea-select placeholder="请选择">
        <ea-option value="1">选项1</ea-option>
        <ea-option value="2">选项2</ea-option>
        <ea-option value="3" disabled>选项3</ea-option>
        <ea-option value="4">选项4</ea-option>
    </ea-select>
</div>

::: details 显示代码

`html`

```html
<div class="demo">
  <ea-select placeholder="请选择">
    <ea-option value="1">选项1</ea-option>
    <ea-option value="2">选项2</ea-option>
    <ea-option value="3" disabled>选项3</ea-option>
    <ea-option value="4">选项4</ea-option>
  </ea-select>
</div>
```

:::

## 禁用状态

为 `ea-select` 设置 `disabled` 属性，则整个选择器不可用

<div class="demo">
    <ea-select placeholder="请选择" disabled>
        <ea-option value="1">选项1</ea-option>
        <ea-option value="2">选项2</ea-option>
        <ea-option value="3">选项3</ea-option>
        <ea-option value="4">选项4</ea-option>
    </ea-select>
</div>

::: details 显示代码

`html`

```html
<div class="demo">
  <ea-select placeholder="请选择" disabled>
    <ea-option value="1">选项1</ea-option>
    <ea-option value="2">选项2</ea-option>
    <ea-option value="3">选项3</ea-option>
    <ea-option value="4">选项4</ea-option>
  </ea-select>
</div>
```

:::

## 可清空单选

为 `ea-select` 设置 `clearable` 属性，则可将选择器清空

<div class="demo">
    <ea-select id="clearableSelect" placeholder="请选择" clearable>
        <ea-option value="北京">北京</ea-option>
        <ea-option value="上海">上海</ea-option>
        <ea-option value="广州">广州</ea-option>
        <ea-option value="深圳">深圳</ea-option>
    </ea-select>
</div>

::: details 显示代码

`html`

```html
<div class="demo">
  <ea-select id="clearableSelect" placeholder="请选择" clearable>
    <ea-option value="北京">北京</ea-option>
    <ea-option value="上海">上海</ea-option>
    <ea-option value="广州">广州</ea-option>
    <ea-option value="深圳">深圳</ea-option>
  </ea-select>
</div>
```

`js`

```js
document.getElementById("clearableSelect").addEventListener("clear", (e) => {
  console.log("clear", e.detail);
});
```

:::

## 基础多选

为 `ea-select` 设置 `multiple` 属性即可启用多选。

<div class="demo">
    <ea-select placeholder="请选择" multiple>
        <ea-option value="北京">北京</ea-option>
        <ea-option value="上海">上海</ea-option>
        <ea-option value="广州">广州</ea-option>
        <ea-option value="深圳">深圳</ea-option>
    </ea-select>
</div>

::: details 显示代码

`html`

```html
<div class="demo">
  <ea-select placeholder="请选择" multiple>
    <ea-option value="北京">北京</ea-option>
    <ea-option value="上海">上海</ea-option>
    <ea-option value="广州">广州</ea-option>
    <ea-option value="深圳">深圳</ea-option>
  </ea-select>
</div>
```

:::

## 自定义模板

可以自定义备选项。将自定义的 `HTML` 模板插入 `ea-option` 中即可。

<div class="demo">
    <ea-select placeholder="请选择">
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

::: details 显示代码

`html`

```html
<div class="demo">
  <ea-select placeholder="请选择">
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

:::

## 分组

备选项进行分组展示

<div class="demo">
    <ea-select placeholder="请选择">
        <ea-option-group label="热门城市">
            <ea-option value="北京">北京</ea-option>
            <ea-option value="上海">上海</ea-option>
        </ea-option-group>
        <ea-option-group label="一分别想带回家城市">
            <ea-option value="广州">广州</ea-option>
            <ea-option value="深圳">深圳</ea-option>
        </ea-option-group>
    </ea-select>
</div>

::: details 显示代码

`html`

```html
<div class="demo">
  <ea-select placeholder="请选择" filterable>
    <ea-option value="北京">北京</ea-option>
    <ea-option value="上海">上海</ea-option>
    <ea-option value="广州">广州</ea-option>
    <ea-option value="深圳">深圳</ea-option>
    <div slot="empty">
      <ea-empty></ea-empty>
    </div>
  </ea-select>
</div>
```

:::

## 可搜索

可以通过 `filterable` 属性开启搜索功能。其中, 可添加 `slot="empty"` 插槽来自定义空状态。

<div class="demo">
    <ea-select placeholder="请选择" filterable>
        <ea-option value="北京">北京</ea-option>
        <ea-option value="上海">上海</ea-option>
        <ea-option value="广州">广州</ea-option>
        <ea-option value="深圳">深圳</ea-option>
        <div slot="empty">
            <ea-empty></ea-empty>
        </div>
    </ea-select>
</div>

::: details 显示代码

`html`

```html
<div class="demo">
  <ea-select placeholder="请选择" filterable>
    <ea-option value="北京">北京</ea-option>
    <ea-option value="上海">上海</ea-option>
    <ea-option value="广州">广州</ea-option>
    <ea-option value="深圳">深圳</ea-option>
    <div slot="empty">
      <ea-empty></ea-empty>
    </div>
  </ea-select>
</div>
```

:::

## Select Attributes

| 参数        | 说明                                                                                   | 类型         | 可选值 | 默认值 |
| ----------- | -------------------------------------------------------------------------------------- | ------------ | ------ | ------ |
| name        | 输入框的 `name` 属性。若与 `form` 组合使用，则 `form` 的返回值中. 该键名为该 `name` 值 | String       | -      | -      |
| width       | 宽度                                                                                   | String       | -      | 200px  |
| selection   | 选中值, 同时也是默认值                                                                 | String       | -      | -      |
| placeholder | 占位符                                                                                 | String       | -      | -      |
| multiple    | 是否多选                                                                               | Boolean      | -      | false  |
| value       | 更加精确地值。若设置了 `multiple`属性, 则会返回一个数组                                | String/Array | -      | -      |
| disabled    | 是否禁用                                                                               | Boolean      | -      | false  |
| clearable   | 是否可清除                                                                             | Boolean      | -      | false  |
| filterable  | 是否可搜索                                                                             | Boolean      | -      | false  |

## Select Slots

| 名称  | 说明       |
| ----- | ---------- |
| -     | 默认插槽   |
| empty | 空状态插槽 |

## Select Events

| 事件名         | 说明                     | 参数                        |
| -------------- | ------------------------ | --------------------------- |
| change         | 选中值改变时触发         | (value: String/Array)       |
| clear          | 清除选中值时触发         | (originValue: String/Array) |
| visible-change | 下拉框显示状态改变时触发 | (visible: Boolean)          |

## Option Group Attributes

| 参数  | 说明       | 类型   | 可选值 | 默认值 |
| ----- | ---------- | ------ | ------ | ------ |
| label | 分组的组名 | String | -      | -      |

## Option Attributes

| 参数     | 说明       | 类型    | 可选值 | 默认值 |
| -------- | ---------- | ------- | ------ | ------ |
| value    | 选项的值   | String  | -      | -      |
| label    | 选项的显示 | String  | -      | -      |
| disabled | 是否禁用   | Boolean | -      | false  |

## Select CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称               | 说明             |
| ------------------ | ---------------- |
| container          | 外层容器         |
| input-wrap         | 输入框外层容器   |
| input              | 输入框           |
| dropdown-icon-wrap | 下拉图标外层容器 |
| icon               | 下拉图标         |
| dropdown-wrap      | 下拉框外层容器   |

## Option CSS Part

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |

## OptionGroup CSS Part

| 名称       | 说明         |
| ---------- | ------------ |
| container  | 外层容器     |
| title-wrap | 标题外层容器 |
