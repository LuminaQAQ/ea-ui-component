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

```js
<script type='module'>
  import "./node_modules/easy-component-ui/components/ea-steps/index.js";
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

设置 `active` 属性，接受一个 `Number`，表明步骤的 `index`，从 `0` 开始。 需要定宽的步骤条时，设置 `space` 属性即可，它接受 `String`， 单位为 `px`， 如果不设置，则为自适应。 设置 `finish-status` 属性可以改变已经完成的步骤的状态。

<div class="demo">
  <p>
    <ea-button id="basicStepsPrevBtn">上一步</ea-button>
    <ea-button id="basicStepsNextBtn">下一步</ea-button>
  </p>
  <ea-steps id="basicSteps" active="0" finish-status="success">
    <ea-step title="Step 1"></ea-step>
    <ea-step title="Step 2"></ea-step>
    <ea-step title="Step 3"></ea-step>
    <ea-step title="Step 4"></ea-step>
  </ea-steps>
</div>

::: code-group

```html
<div class="demo">
  <p>
    <ea-button id="basicStepsPrevBtn">上一步</ea-button>
    <ea-button id="basicStepsNextBtn">下一步</ea-button>
  </p>
  <ea-steps id="basicSteps" active="0" finish-status="success">
    <ea-step title="Step 1"></ea-step>
    <ea-step title="Step 2"></ea-step>
    <ea-step title="Step 3"></ea-step>
    <ea-step title="Step 4"></ea-step>
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

## 含状态步骤条

每一步骤显示出该步骤的状态。

> 也可以使用 `title` 具名分发，可以用 `slot` 的方式来取代属性的设置，在本文档最后的列表中有所有的 `slot name` 可供参考。

<!-- -------- 2. 含状态步骤条 --------  -->
<!-- #region  -->
<div class="demo">
  <ea-steps
    style="max-width: 600px"
    active="1"
    finish-status="success"
    space="200px"
  >
    <ea-step title="Done"></ea-step>
    <ea-step title="Processing"></ea-step>
    <ea-step title="Step 3"></ea-step>
  </ea-steps>
</div>
<!-- #endregion  -->
<!-- -------------------  -->

```html
<div class="demo">
  <ea-steps
    style="max-width: 600px"
    active="1"
    finish-status="success"
    space="200px"
  >
    <ea-step title="Done"></ea-step>
    <ea-step title="Processing"></ea-step>
    <ea-step title="Step 3"></ea-step>
  </ea-steps>
</div>
```

## 居中的步骤条

<div class="demo">
  <ea-steps style="max-width: 600px" active="2" align-center>
    <ea-step title="Step 1" description="Some description"></ea-step>
    <ea-step title="Step 2" description="Some description"></ea-step>
    <ea-step title="Step 3" description="Some description"></ea-step>
  </ea-steps>
</div>

```html
<div class="demo">
  <ea-steps style="max-width: 600px" active="2" align-center>
    <ea-step title="Step 1" description="Some description"></ea-step>
    <ea-step title="Step 2" description="Some description"></ea-step>
    <ea-step title="Step 3" description="Some description"></ea-step>
  </ea-steps>
</div>
```

## 有描述的步骤条

每个步骤有其对应的步骤状态描述。

<div class="demo">
  <ea-steps style="max-width: 600px" active="2">
    <ea-step title="Step 1" description="Some description"></ea-step>
    <ea-step title="Step 2" description="Some description"></ea-step>
    <ea-step title="Step 3" description="Some description"></ea-step>
  </ea-steps>
</div>

```html
<div class="demo">
  <ea-steps style="max-width: 600px" active="2">
    <ea-step title="Step 1" description="Some description"></ea-step>
    <ea-step title="Step 2" description="Some description"></ea-step>
    <ea-step title="Step 3" description="Some description"></ea-step>
  </ea-steps>
</div>
```

## 带图标的步骤条

步骤条内可以启用各种自定义的图标。

<div class="demo">
    <ea-steps active="1">
        <ea-step title="步骤 1" icon="icon-music"></ea-step>
        <ea-step title="步骤 2" icon="icon-videocam"></ea-step>
        <ea-step title="步骤 3" icon="icon-camera"></ea-step>
    </ea-steps>
</div>

```html
<div class="demo">
  <ea-steps style="max-width: 600px" active="1">
    <ea-step title="Step 1" icon="icon-coffee">
      <ea-icon
        slot="icon"
        class="ea-step__icon"
        icon="icon-note-beamed"
      ></ea-icon>
    </ea-step>
    <ea-step title="Step 2" icon="icon-videocam"></ea-step>
    <ea-step title="Step 3" icon="icon-camera"></ea-step>
  </ea-steps>
</div>
```

## 简洁风格的步骤条

设置 `simple` 可应用简洁风格，该条件下 `description` / `space` 都将失效。

<div class="demo">
  <ea-steps style="max-width: 600px" active="1" simple align-center>
    <ea-step title="Step 1" icon="icon-coffee">
      <ea-icon
        slot="icon"
        class="ea-step__icon"
        icon="icon-note-beamed"
      ></ea-icon>
    </ea-step>
    <ea-step title="Step 2" icon="icon-videocam"></ea-step>
    <ea-step title="Step 3" icon="icon-camera"></ea-step>
  </ea-steps>
</div>

```html
<div class="demo">
  <ea-steps style="max-width: 600px" active="1" simple align-center>
    <ea-step title="Step 1" icon="icon-coffee">
      <ea-icon
        slot="icon"
        class="ea-step__icon"
        icon="icon-note-beamed"
      ></ea-icon>
    </ea-step>
    <ea-step title="Step 2" icon="icon-videocam"></ea-step>
    <ea-step title="Step 3" icon="icon-camera"></ea-step>
  </ea-steps>
</div>
```

## Steps API

### Steps Attributes

| 参数           | 说明                                              | 类型    | 可选值                                          | 默认值  |
| -------------- | ------------------------------------------------- | ------- | ----------------------------------------------- | ------- |
| space          | 每个 step 的间距（影响连接线长度），支持 CSS 值   | string  | —                                               | 50%     |
| active         | 当前激活步骤的 index，从 0 开始记数               | number  | —                                               | 0       |
| process-status | 正在进行中的步骤状态展示                          | string  | `wait \| process \| finish \| error \| success` | process |
| finish-status  | 已完成步骤的状态展示                              | string  | `wait \| process \| finish \| error \| success` | finish  |
| align-center   | 是否居中对齐步骤内容                              | boolean | —                                               | false   |
| simple         | 简洁模式（启用后会为每个 step 注入简洁箭头 slot） | boolean | —                                               | false   |

### Steps CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称      | 说明     |
| --------- | -------- |
| container | 外层容器 |

### Steps Slot

| 名称 | 说明     | 子元素    |
| ---- | -------- | --------- |
| —    | 默认插槽 | `ea-step` |

## Step API

### Step Attributes

| 参数         | 说明                                           | 类型    | 可选值                                           | 默认值                         |
| ------------ | ---------------------------------------------- | ------- | ------------------------------------------------ | ------------------------------ |
| title        | 标题                                           | string  | —                                                | ""                             |
| description  | 步骤的详细描述                                 | string  | —                                                | ""                             |
| icon         | 图标（会传给内部的 `ea-icon`）                 | string  | —                                                | ""                             |
| status       | 步骤的状态（可由父组件根据 active 自动设置）   | string  | `wait \| process \| finish \| error \| success` | ""                             |
| index        | 当前步骤的索引（只读，组件内部计算）           | number  | —                                                | 自动计算                       |
| simple       | 是否为简洁模式（继承自父级 `ea-steps` 的属性） | boolean | —                                                | 与父组件同步                   |
| align-center | 是否居中（继承自父级 `ea-steps` 的属性）       | boolean | —                                                | 与父组件同步                   |
| direction    | 步骤方向（继承自父级 `ea-steps`）              | string  | `vertical \| horizontal`                         | horizontal（来自父组件或默认） |

### Step CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称         | 说明                         |
| ------------ | ---------------------------- |
| container    | 外层容器                     |
| head         | 头部容器 (包含图标与连接线)  |
| icon-wrapper | 图标包裹容器                 |
| icon         | 图标（内部 ea-icon）         |
| tail         | 步骤之间的连接线             |
| main         | 主体容器                     |
| title        | 标题容器                     |
| description  | 描述容器                     |
| simple-arrow | 简洁模式下的箭头 slot 的容器 |

### Step Slot

| 名称         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| —            | 步骤内容（默认插槽，通常为空）                               |
| title        | 步骤标题（具名插槽，优先于 `title` 属性）                    |
| description  | 步骤描述（具名插槽，优先于 `description` 属性）              |
| icon         | 步骤图标（具名插槽，优先于 `icon` 属性，内部为 `<ea-icon>`） |
| simple-arrow | 简洁模式下的箭头插槽（由父组件在 `simple` 模式下自动注入）   |
