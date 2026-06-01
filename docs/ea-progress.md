<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"
import PropTag from './components/PropTag.vue'

onMounted(async () => {
  await customElements.whenDefined("ea-progress")

// #region 自定义颜色示例
const customColorExample = {
  els: document.querySelectorAll(".custom-color-progress"),
  stringColorProgress: document.querySelector("#customStringColorProgress"),
  arrayColorProgress: document.querySelector("#customArrayColorProgress"),
  functionColorProgress: document.querySelector("#customFunctionColorProgress"),

  minus: document.querySelector("#customColorMinusBtn"),
  plus: document.querySelector("#customColorPlusBtn"),

  colors: [
    { color: "#f56c6c", percentage: 20 },
    { color: "#e6a23c", percentage: 40 },
    { color: "#5cb87a", percentage: 60 },
    { color: "#1989fa", percentage: 80 },
    { color: "#6f7ad3", percentage: 100 },
  ],

  customColorMethod: () => {
    const percentage = customColorExample.stringColorProgress.percentage;

    if (percentage < 30) {
      return "#909399";
    }
    if (percentage < 70) {
      return "#e6a23c";
    }
    return "#67c23a";
  },

  init() {
    this.arrayColorProgress.color = this.colors;
    this.functionColorProgress.color = this.customColorMethod;

    this.minus.addEventListener("click", () => {
      this.els.forEach(el => {
        const percentage = Number(el.getAttribute("percentage"));
        el.setAttribute("percentage", percentage - 10);
      });
    });

    this.plus.addEventListener("click", () => {
      this.els.forEach(el => {
        const percentage = Number(el.getAttribute("percentage"));
        el.setAttribute("percentage", percentage + 10);
      });
    });
  },
};
customColorExample.init();
// #endregion

// #region 仪表盘示例
const dashboardExample = {
  el1: document.querySelector("#dashboardProgress1"),
  el2: document.querySelector("#dashboardProgress2"),
  minus: document.querySelector("#dashboardMinus"),
  plus: document.querySelector("#dashboardPlus"),

  init() {
    this.minus.addEventListener("click", () => {
      const percentage = Number(this.el1.getAttribute("percentage"));
      this.el1.setAttribute("percentage", percentage - 10);
    });

    this.plus.addEventListener("click", () => {
      const percentage = Number(this.el1.getAttribute("percentage"));
      this.el1.setAttribute("percentage", percentage + 10);
    });

    let timer = setInterval(() => {
      const percentage = Number(this.el2.getAttribute("percentage"));
      this.el2.setAttribute("percentage", percentage + 10);

      if (percentage >= 100) {
        this.el2.setAttribute("percentage", 0);
      }
    }, 500);

    this.el2.addEventListener("beforeUnmount", () => {
      clearInterval(timer);
      timer = null;
    });
  },
};
dashboardExample.init();
// #endregion

// #region 条纹进度条示例
const stripedExample = {
  el: document.querySelector("#stripedProgress"),
  minus: document.querySelector("#stripedMinus"),
  plus: document.querySelector("#stripedPlus"),

  init() {
    this.minus.addEventListener("click", () => {
      const percentage = Number(this.el.getAttribute("percentage"));
      this.el.setAttribute("percentage", percentage - 10);
    });

    this.plus.addEventListener("click", () => {
      const percentage = Number(this.el.getAttribute("percentage"));
      this.el.setAttribute("percentage", percentage + 10);
    });

    this.el.addEventListener("change", e => {
      const { percentage } = e.detail;

      this.el.setAttribute("duration", percentage / 10);
    });
  },
};
stripedExample.init();
// #endregion

})
</script>

<style lang="scss">
ea-progress {
  margin: 0.5rem 0;
}

.percentage-value {
  display: block;
  font-size: 28px;
}
.percentage-label {
  display: block;
  font-size: 12px;
}
</style>

# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-progress.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-progress";
```

:::

## 自定义样式

移步到 [CSS Part](#css-part) 和 [CSS Custom Properties](#css-自定义属性)。

::: tip
示例中使用的样式

```css
ea-progress {
  margin: 0.5rem 0;
}
```

:::

## 直线进度条

<div class="demo">
  <ea-progress percentage="50"></ea-progress>
  <ea-progress percentage="100"></ea-progress>
  <ea-progress percentage="100" status="success"></ea-progress>
  <ea-progress percentage="100" status="warning"></ea-progress>
  <ea-progress percentage="100" status="exception"></ea-progress>
</div>

::: details 查看代码

```html
<ea-progress percentage="50"></ea-progress>
<ea-progress percentage="100"></ea-progress>
<ea-progress percentage="100" status="success"></ea-progress>
<ea-progress percentage="100" status="warning"></ea-progress>
<ea-progress percentage="100" status="exception"></ea-progress>
```

:::

## 进度条内显示百分比标识

百分比不占用额外空间，适用于文件上传等场景。

Progress 组件可通过 `stroke-width` 属性更改进度条的高度，并可通过 `text-inside` 属性来改变进度条内部的文字。

<div class="demo">
  <ea-progress stroke-width="26px" percentage="25" text-inside></ea-progress>
  <ea-progress
    stroke-width="24px"
    percentage="60"
    status="success"
    text-inside
  ></ea-progress>
  <ea-progress
    stroke-width="22px"
    percentage="75"
    status="warning"
    text-inside
  ></ea-progress>
  <ea-progress
    stroke-width="20px"
    percentage="90"
    status="exception"
    text-inside
  ></ea-progress>
</div>

::: details 查看代码

```html
<ea-progress stroke-width="26px" percentage="25" text-inside></ea-progress>
<ea-progress
  stroke-width="24px"
  percentage="60"
  status="success"
  text-inside
></ea-progress>
<ea-progress
  stroke-width="22px"
  percentage="75"
  status="warning"
  text-inside
></ea-progress>
<ea-progress
  stroke-width="20px"
  percentage="90"
  status="exception"
  text-inside
></ea-progress>
```

:::

## 自定义进度条的颜色

可以通过 `color` 属性来设置进度条的颜色。该属性可以接受十六进制颜色值、函数和数组。

<div class="demo">
  <ea-progress class="custom-color-progress" percentage="20"></ea-progress>
  <ea-progress
    id="customStringColorProgress"
    class="custom-color-progress"
    percentage="20"
    color="#6f7ad3"
  ></ea-progress>
  <ea-progress
    id="customFunctionColorProgress"
    class="custom-color-progress"
    percentage="20"
  ></ea-progress>
  <ea-progress
    id="customArrayColorProgress"
    class="custom-color-progress"
    percentage="20"
  ></ea-progress>

  <ea-button-group>
    <ea-button id="customColorMinusBtn">-</ea-button>
    <ea-button id="customColorPlusBtn">+</ea-button>
  </ea-button-group>
</div>

:::: details 查看代码

::: code-group

```html
<ea-progress class="custom-color-progress" percentage="20"></ea-progress>
<ea-progress
  id="customStringColorProgress"
  class="custom-color-progress"
  percentage="20"
  color="#6f7ad3"
></ea-progress>
<ea-progress
  id="customFunctionColorProgress"
  class="custom-color-progress"
  percentage="20"
></ea-progress>
<ea-progress
  id="customArrayColorProgress"
  class="custom-color-progress"
  percentage="20"
></ea-progress>

<ea-button-group>
  <ea-button id="customColorMinusBtn">-</ea-button>
  <ea-button id="customColorPlusBtn">+</ea-button>
</ea-button-group>
```

```js
const customColorExample = {
  els: document.querySelectorAll(".custom-color-progress"),
  stringColorProgress: document.querySelector("#customStringColorProgress"),
  arrayColorProgress: document.querySelector("#customArrayColorProgress"),
  functionColorProgress: document.querySelector("#customFunctionColorProgress"),

  minus: document.querySelector("#customColorMinusBtn"),
  plus: document.querySelector("#customColorPlusBtn"),

  colors: [
    { color: "#f56c6c", percentage: 20 },
    { color: "#e6a23c", percentage: 40 },
    { color: "#5cb87a", percentage: 60 },
    { color: "#1989fa", percentage: 80 },
    { color: "#6f7ad3", percentage: 100 },
  ],

  customColorMethod: () => {
    const percentage = customColorExample.stringColorProgress.percentage;

    if (percentage < 30) {
      return "#909399";
    }
    if (percentage < 70) {
      return "#e6a23c";
    }
    return "#67c23a";
  },

  init() {
    this.arrayColorProgress.color = this.colors;
    this.functionColorProgress.color = this.customColorMethod;

    this.minus.addEventListener("click", () => {
      this.els.forEach(el => {
        const percentage = Number(el.getAttribute("percentage"));
        el.setAttribute("percentage", percentage - 10);
      });
    });

    this.plus.addEventListener("click", () => {
      this.els.forEach(el => {
        const percentage = Number(el.getAttribute("percentage"));
        el.setAttribute("percentage", percentage + 10);
      });
    });
  },
};
customColorExample.init();
```

:::

::::

## 环形进度条

Progress 组件可通过 `variant` 属性为 `circle` 来指定使用环形进度条，在环形进度条中，还可以通过 `size` 属性来设置其大小。

<div class="demo row left">
  <ea-progress variant="circle" percentage="0"></ea-progress>
  <ea-progress variant="circle" percentage="25"></ea-progress>
  <ea-progress variant="circle" percentage="100" status="success"></ea-progress>
  <ea-progress variant="circle" percentage="70" status="warning"></ea-progress>
  <ea-progress variant="circle" percentage="50" status="exception"></ea-progress>
</div>

::: details 查看代码

```html
<ea-progress variant="circle" percentage="0"></ea-progress>
<ea-progress variant="circle" percentage="25"></ea-progress>
<ea-progress variant="circle" percentage="100" status="success"></ea-progress>
<ea-progress variant="circle" percentage="70" status="warning"></ea-progress>
<ea-progress variant="circle" percentage="50" status="exception"></ea-progress>
```

:::

## 仪表盘形进度条

<div class="demo">
  <ea-progress
    id="dashboardProgress1"
    variant="dashboard"
    percentage="10"
    stroke-width="4px"
  ></ea-progress>
  <ea-button-group>
    <ea-button id="dashboardMinus">-</ea-button>
    <ea-button id="dashboardPlus">+</ea-button>
  </ea-button-group>
  <ea-progress
    id="dashboardProgress2"
    variant="dashboard"
    percentage="0"
    stroke-width="10px"
  ></ea-progress>
</div>

:::: details 查看代码

::: code-group

```html
<ea-progress
  id="dashboardProgress1"
  variant="dashboard"
  percentage="10"
  stroke-width="4px"
></ea-progress>
<ea-button-group>
  <ea-button id="dashboardMinus">-</ea-button>
  <ea-button id="dashboardPlus">+</ea-button>
</ea-button-group>
<ea-progress
  id="dashboardProgress2"
  variant="dashboard"
  percentage="0"
  stroke-width="10px"
></ea-progress>
```

```js
const dashboardExample = {
  el1: document.querySelector("#dashboardProgress1"),
  el2: document.querySelector("#dashboardProgress2"),
  minus: document.querySelector("#dashboardMinus"),
  plus: document.querySelector("#dashboardPlus"),

  init() {
    this.minus.addEventListener("click", () => {
      const percentage = Number(this.el1.getAttribute("percentage"));
      this.el1.setAttribute("percentage", percentage - 10);
    });

    this.plus.addEventListener("click", () => {
      const percentage = Number(this.el1.getAttribute("percentage"));
      this.el1.setAttribute("percentage", percentage + 10);
    });

    let timer = setInterval(() => {
      const percentage = Number(this.el2.getAttribute("percentage"));
      this.el2.setAttribute("percentage", percentage + 10);

      if (percentage >= 100) {
        this.el2.setAttribute("percentage", 0);
      }
    }, 500);

    this.el2.addEventListener("beforeUnmount", () => {
      clearInterval(timer);
      timer = null;
    });
  },
};
dashboardExample.init();
```

:::

::::

## 自定义内容

通过默认插槽添加自定义内容。

<div class="demo">
  <ea-progress percentage="50">
    <ea-button text>Content</ea-button>
  </ea-progress>
  <ea-progress
    text-inside
    stroke-width="20px"
    percentage="50"
    status="exception"
  >
    <span>Content</span>
  </ea-progress>
  <ea-progress variant="circle" percentage="100" status="success">
    <ea-button variant="success" icon="mug-hot" circle />
  </ea-progress>
  <ea-progress variant="dashboard" percentage="80">
    <div class="percentage-value"><span data-percentage></span>%</div>
    <span class="percentage-label">Progressing</span>
  </ea-progress>
</div>

:::: details 查看代码

::: code-group

```html
<ea-progress percentage="50">
  <ea-button text>Content</ea-button>
</ea-progress>
<ea-progress text-inside stroke-width="20px" percentage="50" status="exception">
  <span>Content</span>
</ea-progress>
<ea-progress variant="circle" percentage="100" status="success">
  <ea-button variant="success" icon="mug-hot" circle />
</ea-progress>
<ea-progress variant="dashboard" percentage="80">
  <div class="percentage-value"><span data-percentage></span>%</div>
  <span class="percentage-label">Progressing</span>
</ea-progress>
```

```css
.percentage-value {
  display: block;
  font-size: 28px;
}
.percentage-label {
  display: block;
  font-size: 12px;
}
```

:::

::::

## 动画进度条

使用 `indeterminate` 属性来设置不确定的进度，`duration` 来控制动画持续时间。

<div class="demo">
  <ea-progress percentage="50" indeterminate></ea-progress>
  <ea-progress percentage="100" indeterminate></ea-progress>
  <ea-progress
    percentage="100"
    status="success"
    indeterminate
    duration="5"
  ></ea-progress>
  <ea-progress
    percentage="100"
    status="warning"
    indeterminate
    duration="1"
  ></ea-progress>
  <ea-progress percentage="50" status="exception" indeterminate></ea-progress>
</div>

::: details 查看代码

```html
<ea-progress percentage="50" indeterminate></ea-progress>
<ea-progress percentage="100" indeterminate></ea-progress>
<ea-progress
  percentage="100"
  status="success"
  indeterminate
  duration="5"
></ea-progress>
<ea-progress
  percentage="100"
  status="warning"
  indeterminate
  duration="1"
></ea-progress>
<ea-progress percentage="50" status="exception" indeterminate></ea-progress>
```

:::

## 条纹进度条

通过设置 `striped` 属性获取条纹进度条。也可以使用 `striped-flow` 属性来使条纹流动起来。使用 `duration` 属性来控制条纹流动的速度。

<div class="demo">
  <ea-progress percentage="50" stroke-width="15px" striped></ea-progress>
  <ea-progress
    percentage="30"
    status="success"
    stroke-width="15px"
    striped
    striped-flow
  ></ea-progress>
  <ea-progress
    percentage="100"
    status="warning"
    stroke-width="15px"
    striped
    striped-flow
    duration="10"
  ></ea-progress>
  <ea-progress
    id="stripedProgress"
    percentage="70"
    status="exception"
    stroke-width="15px"
    duration="7"
    striped
    striped-flow
  ></ea-progress>

  <ea-button-group>
    <ea-button id="stripedMinus">-</ea-button>
    <ea-button id="stripedPlus">+</ea-button>
  </ea-button-group>
</div>

:::: details 查看代码

::: code-group

```html
<ea-progress percentage="50" stroke-width="15px" striped></ea-progress>
<ea-progress
  percentage="30"
  status="success"
  stroke-width="15px"
  striped
  striped-flow
></ea-progress>
<ea-progress
  percentage="100"
  status="warning"
  stroke-width="15px"
  striped
  striped-flow
  duration="10"
></ea-progress>
<ea-progress
  id="stripedProgress"
  percentage="70"
  status="exception"
  stroke-width="15px"
  duration="7"
  striped
  striped-flow
></ea-progress>

<ea-button-group>
  <ea-button id="stripedMinus">-</ea-button>
  <ea-button id="stripedPlus">+</ea-button>
</ea-button-group>
```

```js
const stripedExample = {
  el: document.querySelector("#stripedProgress"),
  minus: document.querySelector("#stripedMinus"),
  plus: document.querySelector("#stripedPlus"),

  init() {
    this.minus.addEventListener("click", () => {
      const percentage = Number(this.el.getAttribute("percentage"));
      this.el.setAttribute("percentage", percentage - 10);
    });

    this.plus.addEventListener("click", () => {
      const percentage = Number(this.el.getAttribute("percentage"));
      this.el.setAttribute("percentage", percentage + 10);
    });

    this.el.addEventListener("change", e => {
      const { percentage } = e.detail;

      this.el.setAttribute("duration", percentage / 10);
    });
  },
};
stripedExample.init();
```

:::

::::

## Progress API

### Progress Attributes

| 参数              | 说明                                                                   | 类型                          | 可选值                                                | 默认值  |
| ----------------- | ---------------------------------------------------------------------- | ----------------------------- | ----------------------------------------------------- | ------- |
| percentage        | 进度百分比（0-100）                                                    | number                        | 0-100                                                 | 0       |
| variant           | 进度条形态                                                             | string                        | `line \| circle \| dashboard`                         | `line`  |
| stroke-width      | 进度条的宽度                                                           | string                        | 任意合法 CSS 长度                                     | `8px`   |
| text-inside       | 进度条显示文字内置在进度条内（仅 `variant` 为 `line` 时可用）          | boolean                       | —                                                     | false   |
| status            | 进度条当前状态                                                         | string                        | `success` / `warning` / `exception`                   | —       |
| indeterminate     | 是否为动画进度条                                                       | boolean                       | —                                                     | false   |
| duration          | 动画持续时间（秒），控制动画进度条速度和条纹进度条流动速度             | number                        | 正数（秒）                                            | 3       |
| color <PropTag /> | 进度条背景色（会覆盖 status 状态颜色）                                 | `string \| Array \| Function` | 例如 `"#409eff"`、`[{color, percentage}]`、`(p)=>...` | —       |
| striped           | 是否为条纹样式                                                         | boolean                       | —                                                     | false   |
| striped-flow      | 条纹是否流动（仅当 `striped` 为 true 时生效）                          | boolean                       | —                                                     | false   |
| size              | 环形/仪表盘进度条的尺寸（仅 `variant` 为 `circle`/`dashboard` 时生效） | string                        | 任意合法 CSS 长度                                     | `126px` |
| show-text         | 是否显示进度条文字内容                                                 | boolean                       | —                                                     | true    |

### Progress CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| container   | 组件根容器元素                                               |
| track       | 轨道元素（线性进度条的外层轨道 / 环形和仪表盘的 SVG circle） |
| path        | 进度路径元素（表示已完成部分）                               |
| percentage  | 百分比文本容器                                               |
| status-icon | 状态图标元素（当 `status` 为 success/warning/exception 时）  |

### Progress Slots

| 名称    | 说明                                                                                                                                                     |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default | 默认插槽。用于在进度条中插入自定义内容（例如圆环中间的文案或按钮）。当 `text-inside` 为 true 或 `variant` 为 `circle`/`dashboard` 时常用于显示中心内容。 |

### Progress Events

| 事件名 | 说明                 | 回调参数 (event.detail)  |
| ------ | -------------------- | ------------------------ |
| change | 进度百分比变化时触发 | `{ percentage: number }` |

### Progress CSS Custom Properties

| 属性名                           | 说明            | 默认值                           |
| -------------------------------- | --------------- | -------------------------------- |
| --ea-progress-percentage         | 进度百分比值    | 0                                |
| --ea-progress-stroke-width       | 进度条宽度      | 8px                              |
| --ea-progress-default-color      | 默认颜色        | var(--blue-500)                  |
| --ea-progress-success-color      | 成功状态颜色    | var(--green-500)                 |
| --ea-progress-exception-color    | 异常状态颜色    | var(--red-500)                   |
| --ea-progress-warning-color      | 警告状态颜色    | var(--yellow-500)                |
| --ea-progress-percentage-color   | 百分比文字颜色  | var(--grey-900)                  |
| --ea-progress-track-color        | 轨道颜色        | var(--grey-200)                  |
| --ea-progress-path-color         | 进度路径颜色    | var(--ea-progress-default-color) |
| --ea-progress-size               | 环形/仪表盘尺寸 | 126px                            |
| --ea-progress-animation-duration | 动画持续时间    | 3s                               |
