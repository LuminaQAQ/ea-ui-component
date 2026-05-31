<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import("../dist/components/index.js")
  import("../dist/assets/icon.css")

  const basicExample = {
    steps: document.querySelector("#basicSteps"),

    prevBtn: document.querySelector("#basicStepsPrevBtn"),
    nextBtn: document.querySelector("#basicStepsNextBtn"),

    stepChildren: [...document.querySelectorAll("#basicSteps > ea-step")],

    init() {
      let active = new Proxy(
        { value: parseInt(this.steps.getAttribute("active")) },
        {
          get: (target, prop) => {
            return target[prop];
          },
          set: (target, prop, value) => {
            if (value < 0) value = this.stepChildren.length;
            if (value > this.stepChildren.length) value = 0;

            target[prop] = value;
            this.steps.setAttribute("active", value);
            return true;
          },
        }
      );

      this.prevBtn.addEventListener("click", () => {
        active.value--;
      });

      this.nextBtn.addEventListener("click", () => {
        active.value++;
      });
    },
  };

  basicExample.init();
})
</script>

# Steps 步骤条

引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-steps/index.js";
</script>
```

> `css`

::: tip
如果需要使用带有图标的属性，需要提前引入图标文件
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 自定义样式

移步到 [CSS Part](#steps-css-part) 和 [CSS 自定义属性](#steps-css-自定义属性)。

## 基础用法

设置 `active` 属性，接受一个 `Number`，表明步骤的 `index`，从 `0` 开始。需要定宽的步骤条时，设置 `space` 属性即可，它接受 `String`，单位为 `px`，如果不设置，则为自适应。设置 `finish-status` 属性可以改变已经完成的步骤的状态。

<div class="demo">
  <p>
    <ea-button id="basicStepsPrevBtn">上一步</ea-button>
    <ea-button id="basicStepsNextBtn">下一步</ea-button>
  </p>
  <ea-steps id="basicSteps" active="0" finish-status="success">
    <ea-step heading="Step 1"></ea-step>
    <ea-step heading="Step 2"></ea-step>
    <ea-step heading="Step 3"></ea-step>
    <ea-step heading="Step 4"></ea-step>
  </ea-steps>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <p>
    <ea-button id="basicStepsPrevBtn">上一步</ea-button>
    <ea-button id="basicStepsNextBtn">下一步</ea-button>
  </p>
  <ea-steps id="basicSteps" active="0" finish-status="success">
    <ea-step heading="Step 1"></ea-step>
    <ea-step heading="Step 2"></ea-step>
    <ea-step heading="Step 3"></ea-step>
    <ea-step heading="Step 4"></ea-step>
  </ea-steps>
</div>
```

```js
const basicExample = {
  steps: document.querySelector("#basicSteps"),

  prevBtn: document.querySelector("#basicStepsPrevBtn"),
  nextBtn: document.querySelector("#basicStepsNextBtn"),

  stepChildren: [...document.querySelectorAll("#basicSteps > ea-step")],

  init() {
    let active = new Proxy(
      { value: parseInt(this.steps.getAttribute("active")) },
      {
        get: (target, prop) => {
          return target[prop];
        },
        set: (target, prop, value) => {
          if (value < 0) value = this.stepChildren.length;
          if (value > this.stepChildren.length) value = 0;

          target[prop] = value;
          this.steps.setAttribute("active", value);
          return true;
        },
      }
    );

    this.prevBtn.addEventListener("click", () => {
      active.value--;
    });

    this.nextBtn.addEventListener("click", () => {
      active.value++;
    });
  },
};

basicExample.init();
```

:::

::::

## 含状态步骤条

每一步骤显示出该步骤的状态。也可以使用 `heading` 具名插槽，可以用 `slot` 的方式来取代属性的设置。

<div class="demo">
  <ea-steps
    style="max-width: 600px"
    active="1"
    finish-status="success"
    space="200px"
  >
    <ea-step heading="Done"></ea-step>
    <ea-step heading="Processing"></ea-step>
    <ea-step heading="Step 3"></ea-step>
  </ea-steps>
</div>

::: details 查看代码

```html
<ea-steps
  style="max-width: 600px"
  active="1"
  finish-status="success"
  space="200px"
>
  <ea-step heading="Done"></ea-step>
  <ea-step heading="Processing"></ea-step>
  <ea-step heading="Step 3"></ea-step>
</ea-steps>
```

:::

## 居中的步骤条

设置 `align-center` 属性可以使步骤内容居中对齐。

<div class="demo">
  <ea-steps style="max-width: 600px" active="2" align-center>
    <ea-step heading="Step 1" description="Some description"></ea-step>
    <ea-step heading="Step 2" description="Some description"></ea-step>
    <ea-step heading="Step 3" description="Some description"></ea-step>
  </ea-steps>
</div>

::: details 查看代码

```html
<ea-steps style="max-width: 600px" active="2" align-center>
  <ea-step heading="Step 1" description="Some description"></ea-step>
  <ea-step heading="Step 2" description="Some description"></ea-step>
  <ea-step heading="Step 3" description="Some description"></ea-step>
</ea-steps>
```

:::

## 有描述的步骤条

每个步骤有其对应的步骤状态描述。

<div class="demo">
  <ea-steps style="max-width: 600px" active="2">
    <ea-step heading="Step 1" description="Some description"></ea-step>
    <ea-step heading="Step 2" description="Some description"></ea-step>
    <ea-step heading="Step 3" description="Some description"></ea-step>
  </ea-steps>
</div>

::: details 查看代码

```html
<ea-steps style="max-width: 600px" active="2">
  <ea-step heading="Step 1" description="Some description"></ea-step>
  <ea-step heading="Step 2" description="Some description"></ea-step>
  <ea-step heading="Step 3" description="Some description"></ea-step>
</ea-steps>
```

:::

## 带图标的步骤条

步骤条内可以启用各种自定义的图标。

<div class="demo">
  <ea-steps style="max-width: 600px" active="1">
    <ea-step heading="Step 1" icon="music"></ea-step>
    <ea-step heading="Step 2" icon="video"></ea-step>
    <ea-step heading="Step 3" icon="camera"></ea-step>
  </ea-steps>
</div>

::: details 查看代码

```html
<ea-steps style="max-width: 600px" active="1">
  <ea-step heading="Step 1" icon="music"></ea-step>
  <ea-step heading="Step 2" icon="video"></ea-step>
  <ea-step heading="Step 3" icon="camera"></ea-step>
</ea-steps>
```

:::

## 简洁风格的步骤条

设置 `simple` 可应用简洁风格，该条件下 `description` / `space` 都将失效。

<div class="demo">
  <ea-steps style="max-width: 600px" active="1" simple>
    <ea-step heading="Step 1" icon="music"></ea-step>
    <ea-step heading="Step 2" icon="video"></ea-step>
    <ea-step heading="Step 3" icon="camera"></ea-step>
  </ea-steps>
</div>

::: details 查看代码

```html
<ea-steps style="max-width: 600px" active="1" simple>
  <ea-step heading="Step 1" icon="music"></ea-step>
  <ea-step heading="Step 2" icon="video"></ea-step>
  <ea-step heading="Step 3" icon="camera"></ea-step>
</ea-steps>
```

:::

## Steps API

### Steps Attributes

| 参数           | 说明                                             | 类型    | 可选值                                          | 默认值  |
| -------------- | ------------------------------------------------ | ------- | ----------------------------------------------- | ------- |
| space          | 每个 step 的间距（影响连接线长度），支持 CSS 值  | string  | —                                               | 50%     |
| active         | 当前激活步骤的 index，从 0 开始记数              | number  | —                                               | 0       |
| process-status | 正在进行中的步骤状态展示                         | string  | `wait \| process \| finish \| error \| success` | process |
| finish-status  | 已完成步骤的状态展示                             | string  | `wait \| process \| finish \| error \| success` | finish  |
| align-center   | 是否居中对齐步骤内容                             | boolean | —                                               | false   |
| simple         | 简洁模式（启用后会为每个 step 注入简洁箭头 slot）| boolean | —                                               | false   |
| direction      | 步骤方向                                         | string  | `vertical \| horizontal`                        | horizontal |

### Steps CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |

### Steps Slots

| 名称    | 说明                  | 子元素    |
| ------- | --------------------- | --------- |
| default | 默认插槽，放置 ea-step | `ea-step` |

### Steps CSS 自定义属性

| 属性名                     | 说明               | 默认值       |
| -------------------------- | ------------------ | ------------ |
| --ea-step-tail-spacing    | 每个 step 的间距   | 50%          |
| --ea-steps-simple-padding  | 简洁模式内边距     | 13px 8%      |
| --ea-steps-simple-bg-color | 简洁模式背景颜色   | var(--grey-100) |

## Step API

### Step Attributes

| 参数         | 说明                                           | 类型    | 可选值                                          | 默认值                         |
| ------------ | ---------------------------------------------- | ------- | ----------------------------------------------- | ------------------------------ |
| heading      | 标题                                           | string  | —                                               | ""                             |
| description  | 步骤的详细描述                                 | string  | —                                               | ""                             |
| icon         | 图标（会传给内部的 `ea-icon`）                 | string  | —                                               | ""                             |
| status       | 步骤的状态（可由父组件根据 active 自动设置）   | string  | `wait \| process \| finish \| error \| success` | ""                             |
| index        | 当前步骤的索引（只读，组件内部计算）           | number  | —                                               | 自动计算                       |
| simple       | 是否为简洁模式（继承自父级 `ea-steps` 的属性） | boolean | —                                               | 与父组件同步                   |
| align-center | 是否居中（继承自父级 `ea-steps` 的属性）       | boolean | —                                               | 与父组件同步                   |
| direction    | 步骤方向（继承自父级 `ea-steps`）              | string  | `vertical \| horizontal`                        | horizontal（来自父组件或默认） |

### Step CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明                         |
| ------------ | ---------------------------- |
| container    | 外层容器                     |
| head         | 头部容器（包含图标与连接线） |
| icon-wrapper | 图标包裹容器                 |
| icon         | 图标元素                     |
| tail         | 步骤之间的连接线             |
| main         | 主体容器                     |
| heading      | 标题容器                     |
| description  | 描述容器                     |
| simple-arrow | 简洁模式下的箭头容器         |

### Step Slots

| 名称         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| default      | 步骤内容（默认插槽，通常为空）                               |
| heading      | 步骤标题（具名插槽，优先于 `heading` 属性）                  |
| description  | 步骤描述（具名插槽，优先于 `description` 属性）              |
| icon         | 步骤图标（具名插槽，优先于 `icon` 属性，内部为 `<ea-icon>`） |
| simple-arrow | 简洁模式下的箭头插槽（由父组件在 `simple` 模式下自动注入）   |

### Step CSS 自定义属性

| 属性名                       | 说明           | 默认值               |
| ---------------------------- | -------------- | -------------------- |
| --ea-step-icon-border-radius | 图标圆角       | var(--border-radius-circle) |
| --ea-step-icon-wrapper-size  | 图标容器尺寸   | 24px                 |
| --ea-step-icon-size          | 图标字体大小   | var(--font-size-md)  |
| --ea-step-arrow-icon-size    | 箭头图标大小   | 24px                 |
| --ea-step-tail-size          | 连接线粗细     | 2px                  |
| --ea-step-process-color      | 进行中状态颜色 | var(--grey-900)      |
| --ea-step-wait-color         | 等待状态颜色   | var(--grey-500)      |
| --ea-step-finish-color       | 已完成状态颜色 | var(--blue-500)      |
| --ea-step-success-color      | 成功状态颜色   | var(--green-500)     |
| --ea-step-error-color        | 错误状态颜色   | var(--red-500)       |
| --ea-step-tail-color         | 连接线颜色     | var(--grey-500)      |
| --ea-step-icon-bg-color      | 图标背景颜色   | var(--color-white)   |
| --ea-step-icon-font-weight   | 图标字体粗细   | var(--font-weight-bold) |
