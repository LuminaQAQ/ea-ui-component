<script setup>
import { onMounted } from 'vue'
import PropTag from './components/PropTag.vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

const fn = (e) => {
  console.log(e.detail.value);
}

onMounted(async () => {
  await customElements.whenDefined("ea-color-picker");
  await customElements.whenDefined("ea-color-picker-panel");

  // ------- 预定义颜色 -------
  // #region
  const predefineExample = {
    picker: document.querySelector("#predefinePicker"),
    predefineList: [
      "#ff4500",
      "#ff8c00",
      "#ffd700",
      "#90ee90",
      "#00ced1",
      "#1e90ff",
      "#c71585",
    ],

    init() {
      this.picker.predefine = this.predefineList;
    },
  };
  predefineExample.init();
})
</script>

<style>
.demo-color-block {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.demo-color-block .demonstration {
  margin-right: 16px;
}
</style>

# ColorPicker 颜色选择器

用于颜色选择，支持多种颜色格式（hex/rgb/hsl/hsv/rgba）、透明度选择和预定义颜色。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-color-picker.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-color-picker";
```

:::

## 自定义样式

移步到 [CSS Part](#color-picker-css-part) 和 [CSS Custom Properties](#color-picker-css-自定义属性)。

## 基础用法

基础的颜色选择器用法，支持设置默认值和可清空模式。

<div class="demo">
  <div class="demo-color-block">
    <span class="demonstration">With default value</span>
    <ea-color-picker value="#409eff"></ea-color-picker>
  </div>
  <div class="demo-color-block">
    <span class="demonstration">With no default value</span>
    <ea-color-picker></ea-color-picker>
  </div>
</div>

::: details 查看代码

```html
<div class="demo">
  <div class="demo-color-block">
    <span class="demonstration">With default value</span>
    <ea-color-picker value="#409eff"></ea-color-picker>
  </div>
  <div class="demo-color-block">
    <span class="demonstration">With no default value</span>
    <ea-color-picker></ea-color-picker>
  </div>
</div>
```

:::

## 禁用状态

禁用颜色选择器，禁用后无法点击打开面板。

<div class="demo">
  <ea-color-picker value="#409eff" disabled></ea-color-picker>
  <ea-color-picker value="#67c23a" disabled></ea-color-picker>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-color-picker value="#409eff" disabled></ea-color-picker>
  <ea-color-picker value="#67c23a" disabled></ea-color-picker>
</div>
```

:::

## 透明度支持

通过 `show-alpha` 属性支持透明度选择。

<div class="demo">
  <ea-color-picker
    value="rgba(19, 206, 102, 0.8)"
    show-alpha
  ></ea-color-picker>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-color-picker value="rgba(19, 206, 102, 0.8)" show-alpha></ea-color-picker>
</div>
```

:::

## 预定义颜色

通过 `predefine` 属性提供预定义颜色选项。

<div class="demo">
  <ea-color-picker id="predefinePicker" value="#409eff"></ea-color-picker>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <ea-color-picker id="predefinePicker" value="#409eff"></ea-color-picker>
</div>
```

```js
const predefineExample = {
  picker: document.querySelector("#predefinePicker"),
  predefineList: [
    "#ff4500",
    "#ff8c00",
    "#ffd700",
    "#90ee90",
    "#00ced1",
    "#1e90ff",
    "#c71585",
  ],

  init() {
    this.picker.predefine = this.predefineList;
  },
};
predefineExample.init();
```

:::

::::

## 不同尺寸

提供 `small`、默认和 `large` 三种尺寸的颜色选择器。

<div class="demo">
  <ea-color-picker value="#409eff" size="small"></ea-color-picker>
  <ea-color-picker value="#409eff"></ea-color-picker>
  <ea-color-picker value="#409eff" size="large"></ea-color-picker>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-color-picker value="#409eff" size="small"></ea-color-picker>
  <ea-color-picker value="#409eff"></ea-color-picker>
  <ea-color-picker value="#409eff" size="large"></ea-color-picker>
</div>
```

:::

## 独立面板

直接使用颜色选择器面板组件 `ea-color-picker-panel`。

<div class="demo">
  <ea-color-picker-panel value="#409eff"></ea-color-picker-panel>
  <ea-color-picker-panel
    value="rgba(64, 158, 255, 0.5)"
    show-alpha
  ></ea-color-picker-panel>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-color-picker-panel value="#409eff"></ea-color-picker-panel>
  <ea-color-picker-panel
    value="rgba(64, 158, 255, 0.5)"
    show-alpha
  ></ea-color-picker-panel>
</div>
```

:::

## ColorPicker API

### ColorPicker Attributes

| 参数                  | 说明           | 类型    | 可选值                                                                                                                                                               | 默认值   |
| --------------------- | -------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| label                 | 标签文本       | String  | —                                                                                                                                                                    | ""       |
| value                 | 绑定值         | String  | —                                                                                                                                                                    | ""       |
| disabled              | 是否禁用       | Boolean | —                                                                                                                                                                    | false    |
| required              | 是否必填       | Boolean | —                                                                                                                                                                    | false    |
| clearable             | 是否可清空     | Boolean | —                                                                                                                                                                    | false    |
| size                  | 尺寸           | String  | `'small' \| 'medium' \| 'large'`                                                                                                                                     | ""       |
| color-format          | 颜色格式       | String  | `'hsl' \| 'hsv' \| 'hex' \| 'rgb' \| 'rgba'`                                                                                                                         | "hex"    |
| show-alpha            | 是否支持透明度 | Boolean | —                                                                                                                                                                    | false    |
| tabindex              | Tab 键遍历顺序 | Number  | —                                                                                                                                                                    | 0        |
| placement             | 弹出位置       | String  | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | "bottom" |
| predefine <PropTag /> | 预定义颜色     | Array   | —                                                                                                                                                                    | []       |

### ColorPicker CSS Part

| 名称                              | 说明             |
| --------------------------------- | ---------------- |
| form-label                        | 表单标签         |
| container                         | 根容器           |
| [popper](./ea-popper.md#css-part) | 弹出层           |
| trigger                           | 触发器           |
| outer                             | 外层容器         |
| inner                             | 内层容器         |
| icon-wrapper                      | 图标包裹层       |
| status-icon                       | 状态图标         |
| panel                             | 颜色选择器面板   |
| footer-actions                    | 底部操作按钮区域 |
| clear-btn                         | 清除按钮         |
| confirm-btn                       | 确认按钮         |

### ColorPicker CSS Custom Properties

| 属性名                                      | 说明           | 默认值                  |
| ------------------------------------------- | -------------- | ----------------------- |
| --ea-color-picker-size                      | 触发器尺寸     | 32px                    |
| --ea-color-picker-border-radius             | 触发器圆角     | var(--border-radius-sm) |
| --ea-color-picker-border-color              | 触发器边框颜色 | var(--grey-200)         |
| --ea-color-picker-border-color-focus        | 聚焦时边框颜色 | var(--primary-color)    |
| --ea-color-picker-background-color          | 触发器背景颜色 | var(--white)            |
| --ea-color-picker-background-color-disabled | 禁用时背景颜色 | var(--grey-100)         |

### ColorPicker Methods

| 方法名         | 说明                   | 参数 |
| -------------- | ---------------------- | ---- |
| show           | 手动显示颜色选择器面板 | —    |
| hide           | 手动隐藏颜色选择器面板 | —    |
| focus          | 使颜色选择器获得焦点   | —    |
| blur           | 使颜色选择器失去焦点   | —    |
| checkValidity  | 检查表单验证是否通过   | —    |
| reportValidity | 报告表单验证结果       | —    |

### ColorPicker Events

| 事件名           | 说明                 | 回调参数(event.detail) |
| ---------------- | -------------------- | ---------------------- |
| change           | 颜色值改变时触发     | `{ value: string }`    |
| ea-clear         | 清空颜色值时触发     | —                      |
| ea-active-change | 颜色激活值改变时触发 | `{ value: string }`    |

## ColorPickerPanel API

### ColorPickerPanel Attributes

| 参数                  | 说明                                               | 类型    | 可选值                                       | 默认值                                                                |
| --------------------- | -------------------------------------------------- | ------- | -------------------------------------------- | --------------------------------------------------------------------- |
| value                 | 绑定值                                             | String  | —                                            | ""                                                                    |
| color-format          | 颜色格式                                           | String  | `'hsl' \| 'hsv' \| 'hex' \| 'rgb' \| 'rgba'` | `'hex' (when show-alpha is false) \| 'rgb' (when show-alpha is true)` |
| show-alpha            | 是否支持透明度                                     | Boolean | —                                            | false                                                                 |
| disabled              | 是否禁用                                           | Boolean | —                                            | false                                                                 |
| border                | 是否显示边框                                       | Boolean | —                                            | false                                                                 |
| clearable             | 是否可编辑，开启后显示输入框允许用户直接输入颜色值 | Boolean | —                                            | true                                                                  |
| predefine <PropTag /> | 预定义颜色                                         | Array   | —                                            | []                                                                    |

### ColorPickerPanel CSS Part

| 名称               | 说明                                    |
| ------------------ | --------------------------------------- |
| container          | 容器                                    |
| wrapper            | 包裹层                                  |
| svpanel            | 饱和度/亮度面板                         |
| svpanel-cursor     | 饱和度/亮度光标                         |
| hue-slider         | 色调滑块                                |
| hue-slider-thumb   | 色调滑块按钮                            |
| alpha-slider       | 透明度滑块                              |
| alpha-slider-thumb | 透明度滑块按钮                          |
| predefine          | 预定义颜色区域                          |
| predefine-colors   | 预定义颜色列表                          |
| predefine-color    | 预定义颜色项                            |
| footer             | 底部区域                                |
| text-display       | 文本显示区域（仅在非clearable模式显示） |
| color-input        | 颜色输入框（仅在clearable模式显示）     |
| append             | 插槽区域                                |

### ColorPickerPanel CSS Custom Properties

| 属性名                                      | 说明               | 默认值                  |
| ------------------------------------------- | ------------------ | ----------------------- |
| --ea-color-picker-panel-border-radius       | 面板圆角           | var(--border-radius-md) |
| --ea-color-picker-panel-box-shadow          | 面板阴影           | var(--shadow-lg)        |
| --ea-color-picker-panel-background-color    | 饱和度面板背景颜色 | #ff0000                 |
| --ea-color-picker-panel-border-color        | 边框颜色           | var(--grey-200)         |
| --ea-color-picker-panel-padding             | 面板内边距         | var(--spacing-md)       |
| --ea-color-picker-panel-svpanel-width       | 饱和度面板宽度     | 280px                   |
| --ea-color-picker-panel-svpanel-height      | 饱和度面板高度     | 180px                   |
| --ea-color-picker-panel-hue-slider-width    | 色调滑块宽度       | 12px                    |
| --ea-color-picker-panel-hue-slider-height   | 色调滑块高度       | 180px                   |
| --ea-color-picker-panel-alpha-slider-width  | 透明度滑块宽度     | 280px                   |
| --ea-color-picker-panel-alpha-slider-height | 透明度滑块高度     | 12px                    |
| --ea-color-picker-panel-predefine-item-size | 预定义颜色项尺寸   | 20px                    |

### ColorPickerPanel Events

| 事件名           | 说明                       | 回调参数(event.detail)            |
| ---------------- | -------------------------- | --------------------------------- |
| change           | 颜色值改变时触发           | `{ value: string, color: Color }` |
| ea-active-change | 颜色激活值改变时触发       | `{ value: string }`               |
| ea-invalid-color | 输入的颜色格式不合法时触发 | `{ value: string }`               |

### ColorPickerPanel Methods

| 方法名              | 说明                 | 参数 |
| ------------------- | -------------------- | ---- |
| resetCursorPosition | 重置所有滑块光标位置 | —    |
