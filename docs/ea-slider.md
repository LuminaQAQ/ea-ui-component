<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(async () => {
  await customElements.whenDefined("ea-slider");

  const formatTooltipExample = {
    slider: document.querySelector("#formatTooltipSlider"),

    tooltipFormat: value => value + "%",

    init() {
      this.slider.formatTooltip = this.tooltipFormat;
    },
  };

  formatTooltipExample.init();

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
.vertical-demo {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 300px;
}

.vertical-demo ea-slider {
  height: 200px;
}

.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}
.slider-demo-block ea-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  line-height: 44px;
  flex: 1 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
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

基础的滑块用法，支持自定义初始值、隐藏提示框、格式化提示框内容和禁用状态。

<div class="demo">
  <div class="slider-demo-block">
    <span class="demonstration">Default value</span>
    <ea-slider value="50"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Customized initial value</span>
    <ea-slider value="70"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Hide Tooltip</span>
    <ea-slider value="50" show-tooltip="false"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Format Tooltip</span>
    <ea-slider id="formatTooltipSlider" value="50"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Disabled</span>
    <ea-slider value="50" disabled></ea-slider>
  </div>
</div>

::: code-group

```html
<div class="demo">
  <div class="slider-demo-block">
    <span class="demonstration">Default value</span>
    <ea-slider value="50"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Customized initial value</span>
    <ea-slider value="70"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Hide Tooltip</span>
    <ea-slider value="50" show-tooltip="false"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Format Tooltip</span>
    <ea-slider id="formatTooltipSlider" value="50"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Disabled</span>
    <ea-slider value="50" disabled></ea-slider>
  </div>
</div>
```

```js
const formatTooltipExample = {
  slider: document.querySelector("#formatTooltipSlider"),

  tooltipFormat: value => value + "%",

  init() {
    this.slider.formatTooltip = this.tooltipFormat;
  },
};

formatTooltipExample.init();
```

```css
.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}
.slider-demo-block ea-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  line-height: 44px;
  flex: 1 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
```

:::

## 离散值

通过 `step` 属性设置步长，使滑块只能选择离散的值。配合 `show-stops` 属性可以显示步长节点。

<div class="demo">
  <div class="slider-demo-block">
    <span class="demonstration">Breakpoints not displayed</span>
    <ea-slider value="0" step="10"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Breakpoints displayed</span>
    <ea-slider value="0" step="10" show-stops></ea-slider>
  </div>
</div>

::: code-group

```html
<div class="demo">
  <div class="slider-demo-block">
    <span class="demonstration">Breakpoints not displayed</span>
    <ea-slider value="0" step="10"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Breakpoints displayed</span>
    <ea-slider value="0" step="10" show-stops></ea-slider>
  </div>
</div>
```

```css
.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}
.slider-demo-block ea-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  line-height: 44px;
  flex: 1 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
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
  <div class="slider-demo-block">
    <span class="demonstration">Small size</span>
    <ea-slider value="50" show-input size="small"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Default size</span>
    <ea-slider value="50" show-input></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Large size</span>
    <ea-slider value="50" show-input size="large"></ea-slider>
  </div>
</div>

::: code-group

```html
<div class="demo">
  <div class="slider-demo-block">
    <span class="demonstration">Small size</span>
    <ea-slider value="50" show-input size="small"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Default size</span>
    <ea-slider value="50" show-input></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Large size</span>
    <ea-slider value="50" show-input size="large"></ea-slider>
  </div>
</div>
```

```css
.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}
.slider-demo-block ea-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  line-height: 44px;
  flex: 1 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
```

:::

## 自定义 Tooltip 提示的位置

通过 `placement` 属性设置提示框的位置。

<div class="demo">
  <div class="slider-demo-block">
    <span class="demonstration">Top placement</span>
    <ea-slider value="50"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Right placement</span>
    <ea-slider value="50" placement="right"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Left placement</span>
    <ea-slider value="50" placement="left"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Bottom placement</span>
    <ea-slider value="50" placement="bottom"></ea-slider>
  </div>
</div>

::: code-group

```html
<div class="demo">
  <div class="slider-demo-block">
    <span class="demonstration">Top placement</span>
    <ea-slider value="50"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Right placement</span>
    <ea-slider value="50" placement="right"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Left placement</span>
    <ea-slider value="50" placement="left"></ea-slider>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Bottom placement</span>
    <ea-slider value="50" placement="bottom"></ea-slider>
  </div>
</div>
```

```css
.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}
.slider-demo-block ea-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  line-height: 44px;
  flex: 1 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
```

:::

## 垂直模式

通过 `vertical` 属性开启垂直模式。

<div class="demo vertical-demo">
  <ea-slider value="50" vertical></ea-slider>
  <ea-slider value="50" vertical step="10" show-stops></ea-slider>
</div>

::: code-group

```html
<div class="demo vertical-demo">
  <ea-slider value="50" vertical></ea-slider>
  <ea-slider value="50" vertical step="10" show-stops></ea-slider>
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

<div class="demo" style="height: 100px;">
  <ea-slider value="0" id="marksSlider"></ea-slider>
</div>

::: code-group

```html
<div class="demo">
  <ea-slider value="0" id="marksSlider"></ea-slider>
</div>
```

```js
const marksSlider = document.querySelector("#marksSlider");
marksSlider.marks = {
  0: "0°C",
  26: "26°C",
  37: "37°C",
  50: "50°C",
  100: "100°C",
};
```

:::

## Slider API

### Slider Attributes

| 参数                      | 说明                 | 类型     | 可选值                                                                                                                                                               | 默认值           |
| ------------------------- | -------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| value                     | 绑定值               | Number   | —                                                                                                                                                                    | 0                |
| min                       | 最小值               | Number   | —                                                                                                                                                                    | 0                |
| max                       | 最大值               | Number   | —                                                                                                                                                                    | 100              |
| step                      | 步长                 | Number   | —                                                                                                                                                                    | 1                |
| disabled                  | 是否禁用             | Boolean  | —                                                                                                                                                                    | false            |
| vertical                  | 是否垂直模式         | Boolean  | —                                                                                                                                                                    | false            |
| show-input                | 是否显示输入框       | Boolean  | —                                                                                                                                                                    | false            |
| show-tooltip              | 是否显示提示框       | Boolean  | —                                                                                                                                                                    | true             |
| show-stops                | 是否显示步长节点     | Boolean  | —                                                                                                                                                                    | false            |
| placement                 | 提示框位置           | String   | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | 'top'            |
| size                      | 尺寸                 | String   | `'small' \| 'default' \| 'large'`                                                                                                                                    | ""               |
| marks <PropTag />         | 标记点               | Object   | —                                                                                                                                                                    | null             |
| formatTooltip <PropTag /> | 自定义提示框内容格式 | Function | —                                                                                                                                                                    | `value => value` |

### Slider CSS Part

| 名称       | 说明       |
| ---------- | ---------- |
| container  | 根容器     |
| runway     | 轨道容器   |
| rail       | 轨道       |
| stop       | 步长节点   |
| mark-stop  | 标记点     |
| trigger    | 触发器容器 |
| thumb      | 滑块按钮   |
| tooltip    | 提示框内容 |
| marks      | 标记容器   |
| mark       | 标记项     |
| mark-label | 标记标签   |
| input      | 输入框     |

### Slider Events

| 事件名 | 说明         | 回调参数(event.detail) |
| ------ | ------------ | ---------------------- |
| change | 值改变时触发 | `{ value: number }`    |
| input  | 拖动时触发   | `{ value: number }`    |
