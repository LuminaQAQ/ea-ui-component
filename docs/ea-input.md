<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/ea-input.js")

  const clearableExample = {
    element: document.querySelector("#clearableInput"),

    init() {
      if (!this.element) return;
      this.element.addEventListener("ea-clear", (e) => {
        console.log("cleared, oldValue:", e.detail.oldValue);
      });
    }
  }
  clearableExample.init();

  const inputExample = {
    element: document.querySelector("#inputEventInput"),

    init() {
      if (!this.element) return;
      this.element.addEventListener("input", (e) => {
        console.log("input value:", e.detail.value);
      });
    }
  }
  inputExample.init();
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

通过鼠标或键盘输入字符，支持多种输入类型、可清空、密码显示切换、字数统计等功能。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-input.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-input";
```

:::

## 自定义样式

移步到 [CSS Part](#input-css-part) 或 [CSS Custom Properties](#input-css-自定义属性)。

## 基础用法

<div class="demo">
  <ea-input style="width: 240px" placeholder="Please input"></ea-input>
</div>

::: details 查看代码

```html
<ea-input style="width: 240px" placeholder="Please input"></ea-input>
```

:::

## 标签

通过 `label` 属性设置输入框的标签文本。

<div class="demo">
  <ea-input style="width: 240px" label="用户名" placeholder="Please input"></ea-input>
</div>

::: details 查看代码

```html
<ea-input
  style="width: 240px"
  label="用户名"
  placeholder="Please input"
></ea-input>
```

:::

## 禁用状态

通过 `disabled` 属性指定是否禁用 input 组件。

<div class="demo">
  <ea-input style="width: 240px" disabled placeholder="Please input"></ea-input>
</div>

::: details 查看代码

```html
<ea-input style="width: 240px" disabled placeholder="Please input"></ea-input>
```

:::

## 可清空

使用 `clearable` 属性即可得到一个可一键清空的输入框。清空时会触发 `ea-clear` 事件。

<div class="demo">
  <ea-input
    id="clearableInput"
    style="width: 240px"
    placeholder="Please input"
    clearable
  ></ea-input>
</div>

:::: details 查看代码

::: code-group

```html
<ea-input
  id="clearableInput"
  style="width: 240px"
  placeholder="Please input"
  clearable
></ea-input>
```

```js
const clearableInput = document.querySelector("#clearableInput");
clearableInput.addEventListener("ea-clear", e => {
  console.log("cleared, oldValue:", e.detail.oldValue);
});
```

:::

::::

## 自定义清除图标

你可以通过 `clear-icon` 属性自定义清除图标。

<div class="demo">
  <ea-input
    style="width: 240px"
    placeholder="Please input"
    clearable
    clear-icon="circle-xmark"
  ></ea-input>
</div>

::: details 查看代码

```html
<ea-input
  style="width: 240px"
  placeholder="Please input"
  clearable
  clear-icon="circle-xmark"
></ea-input>
```

:::

## 密码框

使用 `show-password` 属性即可得到一个可切换显示密码的输入框。

<div class="demo">
  <ea-input
    style="width: 240px"
    type="password"
    placeholder="Please input password"
    show-password
  ></ea-input>
</div>

::: details 查看代码

```html
<ea-input
  style="width: 240px"
  type="password"
  placeholder="Please input password"
  show-password
></ea-input>
```

:::

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

用于输入多行文本信息可缩放的输入框。添加 `type="textarea"` 属性来将 `input` 元素转换为原生的 `textarea` 元素。

文本域高度可通过 `rows` 属性控制。

<div class="demo">
  <ea-input
    style="width: 240px"
    rows="4"
    type="textarea"
    placeholder="Please input"
  ></ea-input>
</div>

::: details 查看代码

```html
<ea-input
  style="width: 240px"
  rows="4"
  type="textarea"
  placeholder="Please input"
></ea-input>
```

:::

## 自适应文本域

设置文字输入类型的 `autosize` 属性使得根据内容自动调整的高度。你可以通过 `min-rows` 和 `max-rows` 属性限制自适应的行数范围。

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

::: details 查看代码

```html
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
```

:::

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

::: details 查看代码

```html
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
```

:::

## 字数统计

设置 `show-word-limit` 属性来显示字数统计，需要配合 `maxlength` 属性使用。

<div class="demo">
  <ea-input
    style="width: 240px"
    type="textarea"
    placeholder="Please input"
    maxlength="100"
    show-word-limit
  ></ea-input>
</div>

::: details 查看代码

```html
<ea-input
  style="width: 240px"
  type="textarea"
  placeholder="Please input"
  maxlength="100"
  show-word-limit
></ea-input>
```

:::

## 不同尺寸

通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small 两种尺寸。

<div class="col left">
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

::: details 查看代码

```html
<ea-input style="width: 240px" size="large" placeholder="Large"></ea-input>
<ea-input style="width: 240px" size="default" placeholder="Default"></ea-input>
<ea-input style="width: 240px" size="small" placeholder="Small"></ea-input>
```

:::

## Input API

### Input Attributes

| 参数            | 说明                  | 类型    | 可选值                                                                     | 默认值   |
| --------------- | --------------------- | ------- | -------------------------------------------------------------------------- | -------- |
| label           | 标签文本              | String  | —                                                                          | ''       |
| type            | 输入框类型            | String  | text / textarea / password / number / email / tel / url / search / date 等 | text     |
| size            | 输入框尺寸            | String  | large / default / small                                                    | default  |
| value           | 输入框值              | String  | —                                                                          | ''       |
| placeholder     | 占位符文本            | String  | —                                                                          | ''       |
| maxlength       | 最大输入长度          | Number  | —                                                                          | —        |
| minlength       | 最小输入长度          | Number  | —                                                                          | —        |
| clearable       | 是否可清空            | Boolean | —                                                                          | false    |
| clear-icon      | 清空图标名称          | String  | —                                                                          | xmark    |
| disabled        | 是否禁用              | Boolean | —                                                                          | false    |
| show-password   | 是否显示密码切换      | Boolean | —                                                                          | false    |
| prefix-icon     | 前缀图标名称          | String  | —                                                                          | ''       |
| suffix-icon     | 后缀图标名称          | String  | —                                                                          | ''       |
| show-word-limit | 是否显示字数统计      | Boolean | —                                                                          | false    |
| rows            | 文本域行数            | Number  | —                                                                          | 2        |
| autosize        | 是否自动调整高度      | Boolean | —                                                                          | false    |
| min-rows        | 自适应最小行数        | Number  | —                                                                          | —        |
| max-rows        | 自适应最大行数        | Number  | —                                                                          | —        |
| resize          | 文本域调整大小方式    | String  | none / both / horizontal / vertical                                        | vertical |
| autocomplete    | 自动完成设置          | String  | on / off 等                                                                | off      |
| name            | 字段名称              | String  | —                                                                          | ''       |
| readonly        | 是否只读              | Boolean | —                                                                          | false    |
| required        | 是否必填              | Boolean | —                                                                          | false    |
| max             | 最大值（number 类型） | Number  | —                                                                          | —        |
| min             | 最小值（number 类型） | Number  | —                                                                          | —        |
| step            | 步长（number 类型）   | Number  | —                                                                          | 1        |
| pattern         | 正则表达式模式        | String  | —                                                                          | —        |
| autofocus       | 是否自动聚焦          | Boolean | —                                                                          | false    |
| aria-label      | ARIA 标签             | String  | —                                                                          | ''       |
| tabindex        | Tab 索引              | String  | —                                                                          | ''       |
| inputmode       | 输入模式              | String  | numeric / tel / url / email 等                                             | ''       |

### Input CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称               | 说明             |
| ------------------ | ---------------- |
| container          | 容器元素         |
| label              | 标签元素         |
| region             | 区域元素         |
| prepend            | 前置内容元素     |
| inner              | 内部容器元素     |
| prefix             | 前缀元素         |
| original-wrapper   | 原始输入框包装器 |
| original           | 原始输入框       |
| suffix             | 后缀元素         |
| clear-icon         | 清除图标元素     |
| show-password-icon | 显示密码图标元素 |
| suffix-icon        | 后缀图标元素     |
| count              | 字数统计元素     |
| append             | 后置内容元素     |

### Input Slots

| 名称    | 说明         |
| ------- | ------------ |
| prepend | 前置内容插槽 |
| prefix  | 前缀图标插槽 |
| suffix  | 后缀图标插槽 |
| append  | 后置内容插槽 |

### Input Methods

| 方法名            | 说明                                                   | 参数                                                                                                     |
| ----------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| focus             | 使 input 获取焦点                                      | options?: FocusOptions                                                                                   |
| blur              | 使 input 失去焦点                                      | —                                                                                                        |
| select            | 选中 input 中的文字                                    | —                                                                                                        |
| setRangeText      | 替换指定范围的文本                                     | replacement: string, start: number, end: number, selectMode?: 'select' \| 'start' \| 'end' \| 'preserve' |
| setSelectionRange | 设置选区的起止位置（从 0 开始）                        | selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' \| 'backward' \| 'none'     |
| showPicker        | 显示浏览器内置选择器（仅当浏览器支持该输入类型时有效） | —                                                                                                        |
| stepDown          | 将数值类型输入框的值减少一个步长                       | n?: number                                                                                               |
| stepUp            | 将数值类型输入框的值增加一个步长                       | n?: number                                                                                               |
| clear             | 清空输入框内容                                         | —                                                                                                        |
| checkValidity     | 检查表单字段的有效性                                   | —                                                                                                        |
| reportValidity    | 报告表单字段的有效性（显示验证提示）                   | —                                                                                                        |
| setCustomValidity | 设置自定义验证错误消息                                 | message: string                                                                                          |

### Input Events

| 事件名   | 说明             | 回调参数 (event.detail) |
| -------- | ---------------- | ----------------------- |
| input    | 输入值变化时触发 | `{ value: string }`     |
| change   | 值提交变化时触发 | `{ value: string }`     |
| ea-clear | 清空输入框时触发 | `{ oldValue: string }`  |
| focus    | 获得焦点时触发   | —                       |
| blur     | 失去焦点时触发   | —                       |

### Input CSS Custom Properties

| 属性名                          | 说明               | 默认值                       |
| ------------------------------- | ------------------ | ---------------------------- |
| --ea-input-height               | 输入框高度         | var(--ea-input-height-md)    |
| --ea-input-font-size            | 输入框字体大小     | var(--ea-input-font-size-md) |
| --ea-input-border-color         | 输入框边框颜色     | var(--color-border)          |
| --ea-input-border-focus-color   | 输入框聚焦边框颜色 | var(--blue-400)              |
| --ea-input-border-invalid-color | 输入框无效边框颜色 | var(--red-500)               |
| --ea-input-border-radius        | 输入框圆角         | var(--border-radius-sm)      |
| --ea-input-padding              | 输入框内边距       | 0 var(--spacing-md)          |
| --ea-input-text-color           | 输入框文字颜色     | var(--grey-700)              |
| --ea-input-transition           | 过渡动画时长       | var(--transition-fast)       |
| --ea-input-icon-color           | 图标颜色           | var(--grey-500)              |
| --ea-input-resize               | 文本域调整大小方式 | vertical                     |
