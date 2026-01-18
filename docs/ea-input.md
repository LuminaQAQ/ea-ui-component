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
    background-color: #f5f7fa;
    padding: 0.5rem;
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
    clear-icon="icon-cancel-circled2"
  ></ea-input>
</div>

```html
<div class="demo">
  <ea-input
    style="width: 240px"
    placeholder="Please input"
    clearable
    clear-icon="icon-cancel-circled2"
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
        prefix-icon="icon-coffee"
      ></ea-input>
      <ea-input
        class="responsive-input"
        placeholder="Type something"
        suffix-icon="icon-coffee"
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
        <ea-icon icon="icon-search" slot="suffix"></ea-icon>
      </ea-input>
      <ea-input
        class="responsive-input"
        placeholder="Type something"
      >
        <ea-icon icon="icon-search" slot="prefix"></ea-icon>
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
        prefix-icon="icon-coffee"
      ></ea-input>
      <ea-input
        class="responsive-input"
        placeholder="Type something"
        suffix-icon="icon-coffee"
      ></ea-input>
    </div>
  </div>
  <div class="input-group">
    <p class="label">Using slots</p>
    <div class="input-container">
      <ea-input class="responsive-input" placeholder="Pick a date">
        <ea-icon icon="icon-search" slot="suffix"></ea-icon>
      </ea-input>
      <ea-input class="responsive-input" placeholder="Type something">
        <ea-icon icon="icon-search" slot="prefix"></ea-icon>
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
      <i class="icon-search"></i>
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
      <i class="icon-search"></i>
    </div>
  </ea-input>
</div>
```

## 尺寸​

使用 `size` 属性改变输入框大小。 除了默认大小外，还有另外两个选项： `large`, `small`。

<div class="demo col left">
  <ea-input
    style="width: 240px"
    size="large"
    placeholder="Please Input"
  ></ea-input>
  <ea-input style="width: 240px" placeholder="Please Input"></ea-input>
  <ea-input
    style="width: 240px"
    size="small"
    placeholder="Please Input"
  ></ea-input>
</div>

```html
<div class="demo">
  <ea-input
    style="width: 240px"
    size="large"
    placeholder="Please Input"
  ></ea-input>
  <ea-input style="width: 240px" placeholder="Please Input"></ea-input>
  <ea-input
    style="width: 240px"
    size="small"
    placeholder="Please Input"
  ></ea-input>
</div>
```

## 输入长度限制

使用 `maxlength` 和 `minlength` 属性, 来控制输入内容的最大字数和最小字数。 `"字符数"`使用JavaScript字符串长度来衡量。 为文本或文本输入类型设置 `maxlength` 可以限制输入值的长度。 允许你通过设置 `show-word-limit` 到 `true` 来显示剩余字数。

<div class="col left">
  <ea-input
    style="width: 240px"
    maxlength="10"
    placeholder="Please input"
    show-word-limit
    type="text"
    clearable
  ></ea-input>
  <ea-input
    maxlength="30"
    style="width: 240px"
    placeholder="Please input"
    show-word-limit
    type="textarea"
    clearable
  ></ea-input>
</div>

```html
<div class="col left">
  <ea-input
    style="width: 240px"
    maxlength="10"
    placeholder="Please input"
    show-word-limit
    type="text"
    clearable
  ></ea-input>
  <ea-input
    maxlength="30"
    style="width: 240px"
    placeholder="Please input"
    show-word-limit
    type="textarea"
    clearable
  ></ea-input>
</div>
```

## Attributes

| 参数            | 说明                                                                           | 类型    | 可选值                                                                                                                                                | 默认值                    |
| --------------- | ------------------------------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| type            | 输入框类型                                                                     | String  | <ea-link type="primary" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#Form_%3Cinput%3E_types">MDN: input</ea-link> | text                      |
| value           | 输入框的值                                                                     | String  | -                                                                                                                                                     | -                         |
| placeholder     | 占位符                                                                         | String  | -                                                                                                                                                     | -                         |
| disabled        | 是否禁用                                                                       | Boolean | -                                                                                                                                                     | false                     |
| clearable       | 是否显示一键清空图标（仅在非 textarea 时生效）                                 | Boolean | -                                                                                                                                                     | false                     |
| clear-icon      | 自定义清除图标名称（使用图标字体时的类名）                                     | String  | -                                                                                                                                                     | icon-cancel               |
| show-password   | 是否显示切换明文/密文图标（仅在非 textarea 且 type 为 text/password 等时生效） | Boolean | -                                                                                                                                                     | false                     |
| prefix-icon     | 在输入框前显示的图标名称（同样可使用 `slot="prefix"` 插入自定义内容）          | String  | -                                                                                                                                                     | -                         |
| suffix-icon     | 在输入框后显示的图标名称（同样可使用 `slot="suffix"` 插入自定义内容）          | String  | -                                                                                                                                                     | -                         |
| rows            | textarea 行数，仅当 type 为 `textarea` 时有效                                  | Number  | -                                                                                                                                                     | 2                         |
| autosize        | textarea 是否自适应高度                                                        | Boolean | -                                                                                                                                                     | false                     |
| min-rows        | textarea 自适应时的最小行数（属性名为 `min-rows`）                             | Number  | -                                                                                                                                                     | 0                         |
| max-rows        | textarea 自适应时的最大行数（属性名为 `max-rows`）                             | Number  | -                                                                                                                                                     | 0                         |
| maxlength       | 最大输入长度（字符数）                                                         | Number  | -                                                                                                                                                     | 0                         |
| minlength       | 最小输入长度（字符数）                                                         | Number  | -                                                                                                                                                     | 0                         |
| show-word-limit | 是否显示字数统计（需要配合 `maxlength` 使用）                                  | Boolean | -                                                                                                                                                     | false                     |
| autocomplete    | 原生 autocomplete 属性                                                         | String  | on, off                                                                                                                                               | off                       |
| name            | 原生 name 属性                                                                 | String  | -                                                                                                                                                     | -                         |
| readonly        | 原生只读属性                                                                   | Boolean | -                                                                                                                                                     | false                     |
| max             | 原生 max（数字类型输入）                                                       | Number  | -                                                                                                                                                     | `Number.MAX_SAFE_INTEGER` |
| min             | 原生 min（数字类型输入）                                                       | Number  | -                                                                                                                                                     | `Number.MIN_SAFE_INTEGER` |
| step            | 原生 step                                                                      | Number  | -                                                                                                                                                     | 1                         |
| resize          | textarea 的 resize 行为（通过 CSS 变量控制）                                   | String  | `'none' \| 'both' \| 'horizontal' \| 'vertical'`                                                                                                      | vertical                  |
| autofocus       | 原生 autofocus                                                                 | Boolean | -                                                                                                                                                     | false                     |
| form            | 原生 form 属性                                                                 | String  | -                                                                                                                                                     | -                         |
| aria-label      | 原生 aria-label                                                                | String  | -                                                                                                                                                     | -                         |
| tabindex        | 原生 tabindex                                                                  | String  | -                                                                                                                                                     | -                         |
| validate-event  | 是否在输入时触发校验类事件（内部预留，默认开启）                               | Boolean | -                                                                                                                                                     | true                      |
| inputmode       | 原生 inputmode                                                                 | String  | -                                                                                                                                                     | -                         |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称               | 说明                                                                          |
| ------------------ | ----------------------------------------------------------------------------- |
| container          | 组件根容器，`part="container"`                                                |
| prepend            | 前置插槽容器，`part="prepend"`（对应 `slot="prepend"`）                       |
| inner              | 内部输入区容器，`part="inner"`                                                |
| prefix             | 前缀插槽容器，`part="prefix"`（对应 `slot="prefix"`）                         |
| original-wrapper   | 原生 input/textarea 包裹容器，`part="original-wrapper"`                       |
| original           | 原生 input 或 textarea，`part="original"`                                     |
| suffix             | 后缀容器，`part="suffix"`                                                     |
| clear-icon         | 清除图标，`part="clear-icon"`（仅在 `clearable` 时可见）                      |
| show-password-icon | 切换明文/密文图标，`part="show-password-icon"`（仅在 `show-password` 时可见） |
| suffix-icon        | 后缀图标容器，`part="suffix-icon"`（用于 `suffix` 插槽或 `suffix-icon` 属性） |
| count              | 字数统计展示，`part="count"`（仅在 `show-word-limit` 时可见）                 |
| append             | 后置插槽容器，`part="append"`（对应 `slot="append"`）                         |

## Slots

| 插槽名  | 说明                                                     |
| ------- | -------------------------------------------------------- |
| prepend | 前置内容插槽（例如文本或按钮），对应 `part="prepend"`    |
| prefix  | 前缀插槽，显示在输入框内左侧，优先于 `prefix-icon` 属性  |
| suffix  | 后缀插槽，显示在输入框内右侧，优先于 `suffix-icon` 属性  |
| append  | 后置内容插槽（例如后缀按钮或文本），对应 `part="append"` |

## Event

| 事件名            | 说明                                                             | 获取值                               |
| ----------------- | ---------------------------------------------------------------- | ------------------------------------ |
| input             | 输入内容时触发                                                   | -                                    |
| focus             | 原生 focus 时触发（组件聚焦）                                    | -                                    |
| blur              | 原生 blur 时触发（组件失去焦点）                                 | -                                    |
| keydown           | 原生 keydown 时触发                                              | -                                    |
| mouseenter        | 原生 mouseenter 时触发，鼠标进入输入区域时触发                   | -                                    |
| mouseleave        | 原生 mouseleave 时触发，鼠标离开输入区域时触发                   | -                                    |
| compositionstart  | 原生 compositionstart 时触发，输入法开始输入时触发               | e.detail：`{ value: String }`        |
| compositionupdate | 原生 compositionupdate 时触发，输入法输入过程中触发                                             | e.detail：`{ value: String }`        |
| compositionend    | 原生 compositionend 时触发，输入法结束时触发                                                 | e.detail：`{ value: String }`        |
| ea-clear          | 当用户通过清除图标清空输入时分发（自定义 Event: `EaClearEvent`） | event.detail：`{ oldValue: String }` |

## Methods

| 名称   | 说明           | 参数 |
| ------ | -------------- | ---- |
| focus  | 获取焦点       | -    |
| blur   | 失去焦点       | -    |
| select | 选中输入框内容 | -    |
| clear  | 清空输入框内容 | -    |
