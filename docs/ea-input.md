<script setup>
import { onMounted, ref } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
})
</script>

<style lang="scss" scoped>
  .prepend,
  .append {
    box-sizing: border-box;
    padding: 0.5rem;
    line-height: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f7fa;
  }
</style>

# Input 输入框

通过鼠标或键盘输入字符

## 引入

> `js`

```js
<script type='module'>
  import "./node_modules/easy-component-ui/components/ea-input/index.js";
</script>
```

## 自定义样式

移步到 [CSS Part](#css-part)。

## 基础用法

<div class="demo">
  <ea-input style="width: 240px" placeholder="Please input"></ea-input>
</div>

```html
<div class="demo">
  <ea-input style="width: 240px" placeholder="Please input"></ea-input>
</div>
```

## 禁用状态

通过 `disabled` 属性指定是否禁用 input 组件

<div class="demo">
  <ea-input style="width: 240px" disabled placeholder="Please input"></ea-input>
</div>

```html
<div class="demo">
  <ea-input style="width: 240px" disabled placeholder="Please input"></ea-input>
</div>
```

## 可清空

使用 `clearable` 属性即可得到一个可一键清空的输入框

<div class="demo">
  <ea-input
    style="width: 240px"
    placeholder="Please input"
    clearable
  ></ea-input>
</div>

```html
<div class="demo">
  <ea-input
    style="width: 240px"
    placeholder="Please input"
    clearable
  ></ea-input>
</div>
```

## 自定义清除图标

你可以通过 `clear-icon` 属性自定义清除图标

<div class="demo">
  <ea-input
    style="width: 240px"
    placeholder="Please input"
    clearable
    clear-icon="circle-xmark"
  ></ea-input>
</div>

```html
<div class="demo">
  <ea-input
    style="width: 240px"
    placeholder="Please input"
    clearable
    clear-icon="circle-xmark"
  ></ea-input>
</div>
```

## 密码框

<div class="demo">
  <ea-input
    style="width: 240px"
    type="password"
    placeholder="Please input password"
    show-password
  ></ea-input>
</div>

```html
<div class="demo">
  <ea-input
    style="width: 240px"
    type="password"
    placeholder="Please input password"
    show-password
  ></ea-input>
</div>
```

## 带 icon 的输入框

带 icon 的输入框示例，分为使用属性和使用插槽两种方式。

<div class="demo demo-input-with-icon">
  <div class="input-group">
    <p class="label">Using attributes</p>
    <div class="input-container col left is-not-demo">
      <ea-input
        class="responsive-input"
        placeholder="Pick a date"
        prefix-icon="mug-hot"
      ></ea-input>
      <ea-input
        class="responsive-input"
        placeholder="Type something"
        suffix-icon="mug-hot"
      ></ea-input>
    </div>
  </div>
  <div class="input-group">
    <p class="label">Using slots</p>
    <div class="input-container col left is-not-demo">
      <ea-input
        class="responsive-input"
        placeholder="Pick a date"
      >
        <ea-icon name="magnifying-glass" slot="suffix"></ea-icon>
      </ea-input>
      <ea-input
        class="responsive-input"
        placeholder="Type something"
      >
        <ea-icon name="magnifying-glass" slot="prefix"></ea-icon>
      </ea-input>
    </div>
  </div>
</div>

::: details 查看代码

```html
<div class="demo demo-input-with-icon">
  <div class="input-group">
    <p class="label">Using attributes</p>
    <div class="input-container">
      <ea-input
        class="responsive-input"
        placeholder="Pick a date"
        prefix-icon="mug-hot"
      ></ea-input>
      <ea-input
        class="responsive-input"
        placeholder="Type something"
        suffix-icon="mug-hot"
      ></ea-input>
    </div>
  </div>
  <div class="input-group">
    <p class="label">Using slots</p>
    <div class="input-container">
      <ea-input class="responsive-input" placeholder="Pick a date">
        <ea-icon name="magnifying-glass" slot="suffix"></ea-icon>
      </ea-input>
      <ea-input class="responsive-input" placeholder="Type something">
        <ea-icon name="magnifying-glass" slot="prefix"></ea-icon>
      </ea-input>
    </div>
  </div>
</div>
```

:::

## 文本域

用于输入多行文本信息可缩放的输入框。 添加 `type="textarea"` 属性来将 `input` 元素转换为原生的 `textarea` 元素。

文本域高度可通过 `rows` 属性控制

<div class="demo">
  <ea-input
    style="width: 240px"
    rows="4"
    type="textarea"
    placeholder="Please input"
  ></ea-input>
</div>

```html
<div class="demo">
  <ea-input
    style="width: 240px"
    rows="4"
    type="textarea"
    placeholder="Please input"
  ></ea-input>
</div>
```

## 自适应文本域

设置文字输入类型的 `autosize` 属性使得根据内容自动调整的高度。 你可以给 `autosize` 提供一个包含有最大和最小高度的对象，让输入框自动调整。

<div class="demo col left">
  <ea-input
    style="width: 240px"
    rows="4"
    type="textarea"
    placeholder="Please input"
    autosize
  ></ea-input>
  <ea-input
    style="width: 240px"
    type="textarea"
    placeholder="Please input"
    autosize
    min-rows="2"
    max-rows="4"
  ></ea-input>
</div>

```html
<div class="demo">
  <ea-input
    style="width: 240px"
    rows="4"
    type="textarea"
    placeholder="Please input"
    autosize
  ></ea-input>
  <ea-input
    style="width: 240px"
    type="textarea"
    placeholder="Please input"
    autosize
    min-rows="2"
    max-rows="4"
  ></ea-input>
</div>
```

## 复合型输入框

可以在输入框中前置或后置一个元素，通常是标签或按钮。

可通过 `slot` 来指定在 Input 中分发的前置或者后置的内容。

<div class="col left">
  <ea-input style="max-width: 600px" placeholder="Please input">
    <div class="prepend" slot="prepend">Http://</div>
  </ea-input>
  <ea-input style="max-width: 600px" placeholder="Please input">
    <div class="append" slot="append">.com</div>
  </ea-input>
  <ea-input style="max-width: 600px" placeholder="Please input">
    <div class="prepend" slot="prepend">Http://</div>
    <div class="append" slot="append">
      <ea-icon name="magnifying-glass"></ea-icon>
    </div>
  </ea-input>
</div>

```html
<div class="demo">
  <ea-input style="max-width: 600px" placeholder="Please input">
    <div class="prepend" slot="prepend">Http://</div>
  </ea-input>
  <ea-input style="max-width: 600px" placeholder="Please input">
    <div class="append" slot="append">.com</div>
  </ea-input>
  <ea-input style="max-width: 600px" placeholder="Please input">
    <div class="prepend" slot="prepend">Http://</div>
    <div class="append" slot="append">
      <ea-icon name="magnifying-glass"></ea-icon>
    </div>
  </ea-input>
</div>
```

## 字数统计

设置 `show-word-limit` 属性来显示字数统计。

<div class="demo">
  <ea-input
    style="width: 240px"
    type="textarea"
    placeholder="Please input"
    maxlength="100"
    show-word-limit
  ></ea-input>
</div>

```html
<div class="demo">
  <ea-input
    style="width: 240px"
    type="textarea"
    placeholder="Please input"
    maxlength="100"
    show-word-limit
  ></ea-input>
</div>
```

## 不同尺寸

通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small 两种尺寸。

<div class="demo">
  <ea-input
    style="width: 240px"
    size="large"
    placeholder="Large"
  ></ea-input>
  <ea-input
    style="width: 240px"
    size="default"
    placeholder="Default"
  ></ea-input>
  <ea-input
    style="width: 240px"
    size="small"
    placeholder="Small"
  ></ea-input>
</div>

```html
<div class="demo">
  <ea-input style="width: 240px" size="large" placeholder="Large"></ea-input>
  <ea-input
    style="width: 240px"
    size="default"
    placeholder="Default"
  ></ea-input>
  <ea-input style="width: 240px" size="small" placeholder="Small"></ea-input>
</div>
```

## 属性

| 属性名          | 说明             | 类型    | 可选值                           | 默认值                  |
| --------------- | ---------------- | ------- | -------------------------------- | ----------------------- |
| label           | 标签文本         | string  | —                                | —                       |
| type            | 输入框类型       | string  | text, textarea, password 等      | text                    |
| size            | 输入框尺寸       | string  | large, default, small            | default                 |
| value           | 输入框值         | string  | —                                | —                       |
| placeholder     | 占位符文本       | string  | —                                | —                       |
| maxlength       | 最大输入长度     | number  | —                                | —                       |
| minlength       | 最小输入长度     | number  | —                                | —                       |
| clearable       | 是否可清空       | boolean | —                                | false                   |
| clear-icon      | 清空图标名称     | string  | —                                | xmark                   |
| disabled        | 是否禁用         | boolean | —                                | false                   |
| show-password   | 是否显示密码切换 | boolean | —                                | false                   |
| prefix-icon     | 前缀图标名称     | string  | —                                | —                       |
| suffix-icon     | 后缀图标名称     | string  | —                                | —                       |
| show-word-limit | 是否显示字数统计 | boolean | —                                | false                   |
| rows            | 文本域行数       | number  | —                                | 2                       |
| autosize        | 是否自动调整高度 | boolean | —                                | false                   |
| min-rows        | 最小行数         | number  | —                                | 0                       |
| max-rows        | 最大行数         | number  | —                                | 0                       |
| autocomplete    | 自动完成设置     | string  | —                                | off                     |
| name            | 字段名称         | string  | —                                | —                       |
| readonly        | 是否只读         | boolean | —                                | false                   |
| max             | 最大值           | number  | —                                | —                       |
| min             | 最小值           | number  | —                                | —                       |
| step            | 步长             | number  | —                                | 1                       |
| pattern         | 正则表达式模式   | string  | —                                | —                       |
| resize          | 调整大小方式     | string  | none, both, horizontal, vertical | vertical                |
| autofocus       | 是否自动聚焦     | boolean | —                                | false                   |
| form            | 关联表单         | string  | —                                | —                       |
| aria-label      | ARIA 标签        | string  | —                                | —                       |
| tabindex        | Tab 索引         | number  | —                                | —                       |
| inputmode       | 输入模式         | string  | —                                | —                       |

## 事件

| 事件名 | 说明             | 回调参数                    |
| ------ | ---------------- | --------------------------- |
| input  | 输入值变化时触发 | (value: string)             |
| clear  | 清空输入框时触发 | (oldValue: string)          |
| focus  | 获取焦点时触发   | (event: FocusEvent)         |
| blur   | 失去焦点时触发   | (event: FocusEvent)         |

## 方法

| 方法名           | 说明                             | 参数 |
| ---------------- | -------------------------------- | ---- |
| focus            | 使 input 获取焦点                | —    |
| blur             | 使 input 失去焦点                | —    |
| select           | 选中 input 中的文字              | —    |
| clear            | 清空输入框内容                   | —    |
| checkValidity    | 检查表单字段的有效性             | —    |
| reportValidity   | 报告表单字段的有效性（显示验证提示） | —    |

## CSS Parts

| 名称                | 说明             |
| ------------------- | ---------------- |
| container           | 容器             |
| region              | 区域             |
| prepend             | 前置内容         |
| inner               | 内部容器         |
| prefix              | 前缀             |
| original-wrapper    | 原始输入框包装器 |
| original            | 原始输入框       |
| suffix              | 后缀             |
| clear-icon          | 清除图标         |
| show-password-icon  | 显示密码图标     |
| suffix-icon         | 后缀图标         |
| count               | 字数统计         |
| append              | 后置内容         |
| label               | 标签             |

## 插槽

| 插槽名  | 说明         |
| ------- | ------------ |
| prepend | 前置内容插槽 |
| prefix  | 前缀图标插槽 |
| suffix  | 后缀图标插槽 |
| append  | 后置内容插槽 |