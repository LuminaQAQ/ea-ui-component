<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
  const basicExample = {
    el: document.querySelector("#basicTour"),
    btn: document.querySelector("#basicTourBtn"),

    init() {
      this.btn.addEventListener("click", () => {
        this.el.visible = true;
      });
    },
  };

  const noMaskExample = {
    el: document.querySelector("#noMaskTour"),
    btn: document.querySelector("#noMaskTourBtn"),

    init() {
      this.btn.addEventListener("click", () => {
        this.el.visible = true;
      });
    },
  };

  const placementExample = {
    el: document.querySelector("#placementTour"),
    btn: document.querySelector("#placementTourBtn"),

    init() {
      this.btn.addEventListener("click", () => {
        this.el.visible = true;
      });
    },
  };

  basicExample.init();
  noMaskExample.init();
  placementExample.init();
})
</script>

<style scoped>
  hr {
    margin: 3rem 0;
  }
</style>

# Tour 引导

引导用户按步骤使用界面或完成任务的组件，由 `ea-tour` 与 `ea-tour-step` 组成。

## 引入

::: code-group

```html [原生引入]
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-tour.js";
</script>
```

```js [Vite]
import "easy-component-ui/ea-tour";
```

:::

## 基础用法

简单示例：点击按钮开启引导。

<div class="demo">
  <ea-button id="basicTourBtn" variant="primary">Begin Tour</ea-button>
  <p class="row left is-not-demo">
    <ea-button id="basicEl1">Upload</ea-button>
    <ea-button id="basicEl2" variant="primary">Save</ea-button>
    <ea-button id="basicEl3" icon="share-nodes"></ea-button>
  </p>

  <ea-tour id="basicTour">
    <ea-tour-step target="#basicEl1" heading="Upload File">
      <img style="width: 240px" src="https://raw.githubusercontent.com/LuminaQAQ/ea-ui-component/refs/heads/dev_3.0/docs/favicon.ico" alt="tour.png" />
      <div>Put you files here.</div>
    </ea-tour-step>
    <ea-tour-step target="#basicEl2" heading="Save" description="Save your changes"></ea-tour-step>
    <ea-tour-step target="#basicEl3" heading="Other Actions" description="Click to see other"></ea-tour-step>
  </ea-tour>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-button id="basicTourBtn" variant="primary">Begin Tour</ea-button>
  <hr />
  <ea-button id="basicEl1">Upload</ea-button>
  <ea-button id="basicEl2" variant="primary">Save</ea-button>
  <ea-button id="basicEl3" icon="share-nodes"></ea-button>

  <ea-tour id="basicTour">
    <ea-tour-step target="#basicEl1" heading="Upload File">
      <img
        style="width: 240px"
        src="https://raw.githubusercontent.com/LuminaQAQ/ea-ui-component/refs/heads/dev_3.0/docs/favicon.ico"
        alt="tour.png"
      />
      <div>Put you files here.</div>
    </ea-tour-step>
    <ea-tour-step
      target="#basicEl2"
      heading="Save"
      description="Save your changes"
    ></ea-tour-step>
    <ea-tour-step
      target="#basicEl3"
      heading="Other Actions"
      description="Click to see other"
    ></ea-tour-step>
  </ea-tour>
</div>

<script type="module">
  const basicExample = {
    el: document.querySelector("#basicTour"),
    btn: document.querySelector("#basicTourBtn"),

    init() {
      this.btn.addEventListener("click", () => {
        this.el.visible = true;
      });
    },
  };
  basicExample.init();
</script>
```

:::

## 非模态

设置 `mask="false"` 可让引导非模态显示（不遮罩页面），配合 `variant="primary"` 可使用主题色样式。

<div class="demo">
  <ea-button id="noMaskTourBtn" variant="primary">Begin Tour</ea-button>
  <hr />
  <p class="row left is-not-demo">
    <ea-button id="noMaskEl1">Upload</ea-button>
    <ea-button id="noMaskEl2" variant="primary">Save</ea-button>
    <ea-button id="noMaskEl3" icon="share-nodes"></ea-button>
  </p>

  <ea-tour id="noMaskTour" variant="primary" mask="false">
    <ea-tour-step target="#noMaskEl1" heading="Upload File">
      <div>Put you files here.</div>
    </ea-tour-step>
    <ea-tour-step target="#noMaskEl2" heading="Save" description="Save your changes"></ea-tour-step>
    <ea-tour-step target="#noMaskEl3" heading="Other Actions" description="Click to see other"></ea-tour-step>
  </ea-tour>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-button id="noMaskTourBtn" variant="primary">Begin Tour</ea-button>
  <hr />
  <ea-button id="noMaskEl1">Upload</ea-button>
  <ea-button id="noMaskEl2" variant="primary">Save</ea-button>
  <ea-button id="noMaskEl3" icon="share-nodes"></ea-button>

  <ea-tour id="noMaskTour" variant="primary" mask="false">
    <ea-tour-step target="#noMaskEl1" heading="Upload File">
      <div>Put you files here.</div>
    </ea-tour-step>
    <ea-tour-step
      target="#noMaskEl2"
      heading="Save"
      description="Save your changes"
    ></ea-tour-step>
    <ea-tour-step
      target="#noMaskEl3"
      heading="Other Actions"
      description="Click to see other"
    ></ea-tour-step>
  </ea-tour>
</div>

<script type="module">
  const noMaskExample = {
    el: document.querySelector("#noMaskTour"),
    btn: document.querySelector("#noMaskTourBtn"),

    init() {
      this.btn.addEventListener("click", () => {
        this.el.visible = true;
      });
    },
  };
  noMaskExample.init();
</script>
```

:::

## 位置

通过 `placement` 属性可设置 `ea-tour-step` 的出现位置；若不设置 `target`，可在屏幕中心显示。

<div class="demo" style="text-align: center">
  <ea-button id="placementTourBtn" variant="primary">Begin Tour</ea-button>

  <ea-tour id="placementTour">
    <ea-tour-step heading="Center" description="Displayed in the center of screen."></ea-tour-step>
    <ea-tour-step target="#placementTourBtn" heading="Top" description="On the top of target." placement="top"></ea-tour-step>
    <ea-tour-step target="#placementTourBtn" heading="Top-Start" description="On the top-start of target." placement="top-start"></ea-tour-step>
    <ea-tour-step target="#placementTourBtn" heading="Top-End" description="On the top-end of target." placement="top-end"></ea-tour-step>
    <ea-tour-step target="#placementTourBtn" heading="Right" description="On the right of target." placement="right"></ea-tour-step>
    <ea-tour-step target="#placementTourBtn" heading="Right-Start" description="On the right-start of target." placement="right-start"></ea-tour-step>
    <ea-tour-step target="#placementTourBtn" heading="Right-End" description="On the right-end of target." placement="right-end"></ea-tour-step>
    <ea-tour-step target="#placementTourBtn" heading="Bottom" description="On the bottom of target." placement="bottom"></ea-tour-step>
    <ea-tour-step target="#placementTourBtn" heading="Bottom-Start" description="On the bottom-start of target." placement="bottom-start"></ea-tour-step>
    <ea-tour-step target="#placementTourBtn" heading="Bottom-End" description="On the bottom-end of target." placement="bottom-end"></ea-tour-step>
    <ea-tour-step target="#placementTourBtn" heading="Left" description="On the Left of target." placement="left"></ea-tour-step>
    <ea-tour-step target="#placementTourBtn" heading="Left-Start" description="On the left-start of target." placement="left-start"></ea-tour-step>
    <ea-tour-step target="#placementTourBtn" heading="Left-End" description="On the left-end of target." placement="left-end"></ea-tour-step>
  </ea-tour>
</div>

::: details 查看代码

```html
<div class="demo" style="text-align: center">
  <ea-button id="placementTourBtn" variant="primary">Begin Tour</ea-button>

  <ea-tour id="placementTour">
    <ea-tour-step
      heading="Center"
      description="Displayed in the center of screen."
    ></ea-tour-step>
    <ea-tour-step
      target="#placementTourBtn"
      heading="Top"
      description="On the top of target."
      placement="top"
    ></ea-tour-step>
    <ea-tour-step
      target="#placementTourBtn"
      heading="Top-Start"
      description="On the top-start of target."
      placement="top-start"
    ></ea-tour-step>
    <ea-tour-step
      target="#placementTourBtn"
      heading="Top-End"
      description="On the top-end of target."
      placement="top-end"
    ></ea-tour-step>
    <ea-tour-step
      target="#placementTourBtn"
      heading="Right"
      description="On the right of target."
      placement="right"
    ></ea-tour-step>
    <ea-tour-step
      target="#placementTourBtn"
      heading="Right-Start"
      description="On the right-start of target."
      placement="right-start"
    ></ea-tour-step>
    <ea-tour-step
      target="#placementTourBtn"
      heading="Right-End"
      description="On the right-end of target."
      placement="right-end"
    ></ea-tour-step>
    <ea-tour-step
      target="#placementTourBtn"
      heading="Bottom"
      description="On the bottom of target."
      placement="bottom"
    ></ea-tour-step>
    <ea-tour-step
      target="#placementTourBtn"
      heading="Bottom-Start"
      description="On the bottom-start of target."
      placement="bottom-start"
    ></ea-tour-step>
    <ea-tour-step
      target="#placementTourBtn"
      heading="Bottom-End"
      description="On the bottom-end of target."
      placement="bottom-end"
    ></ea-tour-step>
    <ea-tour-step
      target="#placementTourBtn"
      heading="Left"
      description="On the Left of target."
      placement="left"
    ></ea-tour-step>
    <ea-tour-step
      target="#placementTourBtn"
      heading="Left-Start"
      description="On the left-start of target."
      placement="left-start"
    ></ea-tour-step>
    <ea-tour-step
      target="#placementTourBtn"
      heading="Left-End"
      description="On the left-end of target."
      placement="left-end"
    ></ea-tour-step>
  </ea-tour>
</div>

<script type="module">
  const placementExample = {
    el: document.querySelector("#placementTour"),
    btn: document.querySelector("#placementTourBtn"),

    init() {
      this.btn.addEventListener("click", () => {
        this.el.visible = true;
      });
    },
  };
  placementExample.init();
</script>
```

:::

## Tour API

### Tour Attributes

| 参数      | 说明                                                | 类型    | 可选值                                                                                                                                     | 默认值  |
| --------- | --------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| append-to | 挂载容器选择器                                      | string  | —                                                                                                                                          | body    |
| visible   | 控制引导是否显示                                    | boolean | —                                                                                                                                          | false   |
| current   | 当前步骤索引                                        | number  | —                                                                                                                                          | 0       |
| gap       | 遮罩与目标元素间距（像素）                          | number  | —                                                                                                                                          | 6       |
| mask      | 是否显示遮罩                                        | boolean | —                                                                                                                                          | true    |
| variant   | 按钮等样式类型，会传递给子 step                     | string  | `default \| primary`                                                                                                                       | default |
| placement | 默认步骤弹出位置（当 step 未设置 placement 时生效） | string  | top \| top-start \| top-end \| bottom \| bottom-start \| bottom-end \| left \| left-start \| left-end \| right \| right-start \| right-end | bottom  |

### Tour Slots

| 名称    | 说明            |
| ------- | --------------- |
| default | step 子元素插槽 |

### Tour Events

| 事件名         | 说明           | 回调参数(event.detail) |
| -------------- | -------------- | ---------------------- |
| ea-close       | 引导关闭时触发 | `{ current: number }`  |
| ea-tour-change | 步骤切换时触发 | `{ current: number }`  |
| ea-tour-finish | 完成引导时触发 | —                      |

### Tour CSS Custom Properties

| 属性名               | 说明         | 默认值                   |
| -------------------- | ------------ | ------------------------ |
| --ea-tour-transition | 过渡动画时长 | var(--transition-normal) |
| --ea-tour-mask-color | 遮罩颜色     | rgba(0, 0, 0, 0.5)       |

## TourStep API

### TourStep Attributes

| 参数      | 说明                             | 类型   | 可选值                                                                                                                                     | 默认值  |
| --------- | -------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| heading   | 步骤标题                         | string | —                                                                                                                                          | ""      |
| target    | 目标元素选择器（缺省则居中显示） | string | —                                                                                                                                          | ""      |
| placement | 步骤弹出位置                     | string | top \| top-start \| top-end \| bottom \| bottom-start \| bottom-end \| left \| left-start \| left-end \| right \| right-start \| right-end | bottom  |
| variant   | 样式类型，会影响按钮类型         | string | `default \| primary`                                                                                                                       | default |

### TourStep CSS Part

| 名称            | 说明                    |
| --------------- | ----------------------- |
| container       | step 根元素             |
| header          | 头部（heading / close） |
| close-icon      | 关闭图标                |
| content         | 内容区域                |
| footer          | 底部区域                |
| indicator-group | 指示器容器              |
| indicator       | 单个指示器（circle）    |
| switch-group    | 按钮容器                |
| previous        | 上一步按钮 part         |
| next            | 下一步按钮 part         |
| finish          | 完成按钮 part           |

### TourStep Slots

| 名称      | 说明                             |
| --------- | -------------------------------- |
| default   | 默认插槽，用于步骤内容           |
| header    | 头部插槽，可自定义标题或关闭按钮 |
| indicator | 自定义指示器（覆盖默认圆点）     |
| footer    | 自定义底部按钮区域               |

### TourStep Methods

| 方法名           | 说明           | 参数                    |
| ---------------- | -------------- | ----------------------- |
| updateIndicators | 更新步骤指示器 | allSteps: HTMLElement[] |

### TourStep CSS Custom Properties

| 属性名                                | 说明           | 默认值            |
| ------------------------------------- | -------------- | ----------------- |
| --ea-tour-step-visible                | 步骤可见性     | none              |
| --ea-tour-step-width                  | 步骤宽度       | 400px             |
| --ea-tour-step-padding                | 步骤内边距     | var(--spacing-lg) |
| --ea-tour-step-bg-color               | 步骤背景颜色   | var(--white)      |
| --ea-tour-step-indicator-size         | 指示器尺寸     | 6px               |
| --ea-tour-step-indicator-color        | 指示器颜色     | var(--grey-200)   |
| --ea-tour-step-indicator-active-color | 激活指示器颜色 | var(--blue-500)   |
| --ea-tour-step-close-color            | 关闭图标颜色   | var(--grey-500)   |
| --ea-tour-step-primary-color          | 主题色         | var(--blue-500)   |
