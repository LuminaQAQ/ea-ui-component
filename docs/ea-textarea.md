<script setup>
import { onMounted, ref } from 'vue'

onMounted(() => {
  import('../components/ea-textarea/index.js')
  import('./index.scss')
})
</script>

# Textarea 文本域

通过鼠标或键盘输入字符

## 引入

> `js`

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-textarea/index.js";
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

<div class="row left">
    <ea-textarea type="textarea" rows="2" placeholder="这不是空的"></ea-textarea>
</div>

::: details 查看代码

```html
<div class="row left">
  <ea-textarea type="textarea" rows="2" placeholder="这不是空的"></ea-textarea>
</div>
```

:::

## 可自适应文本高度的文本域

通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整。

<div class="col left">
  <ea-textarea type="textarea" placeholder="这不是空的" autosize></ea-textarea>
</div>

::: details 查看代码

```html
<div class="col left">
  <ea-textarea type="textarea" placeholder="这不是空的" autosize></ea-textarea>
</div>
```

:::

## 设置高度的最值

可以指定最小行数和最大行数。

<div class="col left">
    <ea-textarea type="textarea" placeholder="这不是空的" min-rows="2" max-rows="10"></ea-textarea>
    <ea-textarea type="textarea" placeholder="这不是空的" min-rows="5" max-rows="20"></ea-textarea>
</div>

::: details 查看代码

```html
<div class="col left">
  <ea-textarea
    type="textarea"
    placeholder="这不是空的"
    min-rows="2"
    max-rows="10"
  ></ea-textarea>
  <ea-textarea
    type="textarea"
    placeholder="这不是空的"
    min-rows="5"
    max-rows="20"
  ></ea-textarea>
</div>
```

:::

## 输入长度限制

<div class="col left">
    <ea-textarea type="textarea" placeholder="这不是空的" min-length="2" max-length="10"></ea-textarea>
    <ea-textarea type="textarea" placeholder="这不是空的" min-length="5" max-length="20"></ea-textarea>
</div>

::: details 查看代码

```html
<div class="col left">
  <ea-textarea
    type="textarea"
    placeholder="这不是空的"
    min-length="2"
    max-length="10"
  ></ea-textarea>
  <ea-textarea
    type="textarea"
    placeholder="这不是空的"
    min-length="5"
    max-length="20"
  ></ea-textarea>
</div>
```

:::

## 展示字数统计

<div class="col left">
    <ea-textarea type="textarea" placeholder="这不是空的" rows="5" min-length="5" max-length="20" show-word-limit></ea-textarea>
</div>

::: details 查看代码

```html
<div class="col left">
  <ea-textarea
    type="textarea"
    placeholder="这不是空的"
    rows="5"
    min-length="5"
    max-length="20"
    show-word-limit
  ></ea-textarea>
</div>
```

:::

## Attributes

| 参数            | 说明             | 类型    | 可选值   | 默认值   |
| --------------- | ---------------- | ------- | -------- | -------- |
| type            | 类型             | string  | textarea | textarea |
| rows            | 输入框行数       | number  | -        | 2        |
| min-rows        | 最小行数         | number  | -        | -        |
| max-rows        | 最大行数         | number  | -        | -        |
| min-length      | 最小长度         | number  | -        | -        |
| max-length      | 最大长度         | number  | -        | -        |
| show-word-limit | 是否显示字数统计 | boolean | -        | false    |
| autosize        | 高度是否自适应   | boolean | -        | false    |
| placeholder     | 输入框占位文本   | string  | -        | -        |
| disabled        | 禁用             | boolean | -        | false    |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称       | 说明                                                   |
| ---------- | ------------------------------------------------------ |
| container  | 外层容器                                               |
| textarea   | 文本域                                                 |
| word-limit | 字数统计 **(仅当 `show-word-limit` 为 `true` 时生效)** |

## Events

| 事件名 | 说明                 | 参数 | 获取值         | 值的类型 |
| ------ | -------------------- | ---- | -------------- | -------- |
| input  | 输入时触发           | -    | e.target.value | String   |
| focus  | 输入框聚焦时触发     | -    | e.target.value | String   |
| blur   | 输入框失去焦点时触发 | -    | e.target.value | String   |
