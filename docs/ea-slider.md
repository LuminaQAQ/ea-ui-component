<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(async () => {
  await customElements.whenDefined("ea-slider");

  // ------- marks 示例 -------
  // #region
  const marksExample = {
    slider: document.querySelector("#marksSlider"),
    marks: {
      0: "0°C",
      26: "26°C",
      37: "37°C",
      50: "50°C",
      100: "100°C",
    },

    init() {
      this.slider.marks = this.marks;
    },
  };
  marksExample.init();
})
</script>

<style>
.demo {
  margin-bottom: 2rem;
}

.vertical-demo {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 300px;
}

.vertical-demo ea-slider {
  height: 200px;
}
</style>

# Slider 滑块

通过拖动滑块在一个固定区间内进行选择。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-slider/index.js";
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

移步到 [CSS Part](#slider-css-part)。

## 基础用法

基础的滑块用法。

<div class="demo">
  <ea-slider value="50"></ea-slider>
</div>

::: code-group

```html
<div class="demo">
  <ea-slider value="50"></ea-slider>
</div>
```

:::

## 离散值

通过 `step` 属性设置步长，使滑块只能选择离散的值。

<div class="demo">
  <ea-slider value="0" step="10"></ea-slider>
</div>

::: code-group

```html
<div class="demo">
  <ea-slider value="0" step="10"></ea-slider>
</div>
```

:::

## 带有输入框的滑块

通过 `show-input` 属性显示输入框，可以直接输入数值。

<div class="demo">
  <ea-slider value="50" show-input></ea-slider>
</div>

::: code-group

```html
<div class="demo">
  <ea-slider value="50" show-input></ea-slider>
</div>
```

:::

## 不同尺寸

提供不同尺寸的滑块。

<div class="demo">
  <ea-slider value="50" size="small"></ea-slider>
  <br />
  <ea-slider value="50"></ea-slider>
  <br />
  <ea-slider value="50" size="large"></ea-slider>
</div>

::: code-group

```html
<div class="demo">
  <ea-slider value="50" size="small"></ea-slider>
  <br />
  <ea-slider value="50"></ea-slider>
  <br />
  <ea-slider value="50" size="large"></ea-slider>
</div>
```

:::

## 自定义 Tooltip 提示的位置

通过 `tooltip-placement` 属性设置提示框的位置。

<div class="demo">
  <ea-slider value="50" show-tooltip tooltip-placement="top"></ea-slider>
</div>

::: code-group

```html
<div class="demo">
  <ea-slider value="50" show-tooltip tooltip-placement="top"></ea-slider>
</div>
```

:::

## 范围选择

通过 `range` 属性开启范围选择模式。

<div class="demo">
  <ea-slider value="[30, 70]" range></ea-slider>
</div>

::: code-group

```html
<div class="demo">
  <ea-slider value="[30, 70]" range></ea-slider>
</div>
```

:::

## 垂直模式

通过 `vertical` 属性开启垂直模式。

<div class="demo vertical-demo">
  <ea-slider value="50" vertical></ea-slider>
  <ea-slider value="[30, 70]" range vertical></ea-slider>
</div>

::: code-group

```html
<div class="demo vertical-demo">
  <ea-slider value="50" vertical></ea-slider>
  <ea-slider value="[30, 70]" range vertical></ea-slider>
</div>
```

```css
.vertical-demo {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 300px;
}

.vertical-demo ea-slider {
  height: 200px;
}
```

:::

## 设置 marks 属性可以在滑块上显示标记

通过 `marks` 属性在滑块上显示标记点。

<div class="demo">
  <ea-slider value="0" id="marksSlider"></ea-slider>
</div>

::: code-group

```html
<div class="demo">
  <ea-slider value="0" id="marksSlider"></ea-slider>
</div>
```

```js
const marksExample = {
  slider: document.querySelector("#marksSlider"),
  marks: {
    0: "0°C",
    26: "26°C",
    37: "37°C",
    50: "50°C",
    100: "100°C",
  },

  init() {
    this.slider.marks = this.marks;
  },
};
marksExample.init();
```

:::

## Slider API

### Slider Attributes

| 参数                  | 说明                   | 类型             | 可选值                              | 默认值  |
| --------------------- | ---------------------- | ---------------- | ----------------------------------- | ------- |
| value                 | 绑定值                 | Number \| Array  | —                                   | 0       |
| min                   | 最小值                 | Number           | —                                   | 0       |
| max                   | 最大值                 | Number           | —                                   | 100     |
| step                  | 步长                   | Number           | —                                   | 1       |
| disabled              | 是否禁用               | Boolean          | —                                   | false   |
| range                 | 是否开启范围选择       | Boolean          | —                                   | false   |
| vertical              | 是否垂直模式           | Boolean          | —                                   | false   |
| show-input            | 是否显示输入框         | Boolean          | —                                   | false   |
| show-tooltip          | 是否显示提示框         | Boolean          | —                                   | true    |
| tooltip-placement     | 提示框位置             | String           | `'top' \| 'bottom' \| 'left' \| 'right'` | 'top'    |
| size                  | 尺寸                   | String           | `'small' \| 'medium' \| 'large'`   | ""      |
| marks <PropTag />     | 标记点                 | Object           | —                                   | null    |

### Slider CSS Part

| 名称      | 说明         |
| --------- | ------------ |
| container | 根容器       |
| runway    | 轨道容器     |
| rail      | 轨道         |
| track     | 已选轨道     |
| thumb     | 滑块按钮     |
| thumb-2   | 第二个滑块   |
| tooltip   | 提示框       |
| tooltip-2 | 第二个提示框 |
| marks     | 标记容器     |
| mark      | 标记项       |
| mark-dot  | 标记点       |
| mark-label| 标记标签     |
| input     | 输入框       |
| input-2   | 第二个输入框 |

### Slider Events

| 事件名 | 说明             | 回调参数(event.detail) |
| ------ | ---------------- | ---------------------- |
| change | 值改变时触发     | `{ value: number \| number[] }` |
| input  | 拖动时触发       | `{ value: number \| number[] }` |
