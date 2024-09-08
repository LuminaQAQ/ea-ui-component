<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('./index.scss')

  import('../components/ea-progress/index.js')
  import('../components/ea-button/index.js')
  import('../components/ea-button-group/index.js')

  const linearProgressController = {
    btn: document.querySelector("#ea-progress-change-btn"),
    progress: document.querySelector("#ea-progress"),

    init() {
      this.btn.addEventListener("click", () => {
        this.progress.percentage = 100;
      });
    },
  };
  linearProgressController.init();

  const textInsideProgressController = {
    btn: document.querySelector("#ea-progress-text-inside-btn"),
    progress: document.querySelector("#ea-progress-text-inside"),
    init() {
      this.btn.addEventListener("click", () => {
        this.progress.percentage = Math.floor(Math.random() * 100);
      });
    },
  };
  textInsideProgressController.init();

  const circleProgressController = {
    btn: document.querySelector("#ea-progress_circle-change-btn"),
    progress: document.querySelector("#ea-progress_circle"),

    init() {
      this.btn.addEventListener("click", () => {
        this.progress.percentage = Math.floor(Math.random() * 100);
      });
    },
  };
  circleProgressController.init();

  const dashboardController = {
    minusBtn: document.querySelector("#ea-progress_dashboard-minus-btn"),
    plusBtn: document.querySelector("#ea-progress_dashboard-plus-btn"),
    progress: document.querySelector("#ea-progress_dashboard"),

    init() {
      this.minusBtn.addEventListener("click", () => {
        this.progress.percentage = Number(this.progress.percentage) - 10;
      });

      this.plusBtn.addEventListener("click", () => {
        this.progress.percentage = Number(this.progress.percentage) + 10;
      });
    },
  };
  dashboardController.init();
})
</script>

<style lang="scss">
ea-progress {
    width: 100%;
}

ea-progress[type="circle"],
ea-progress[type="dashboard"] {
    width: auto;
}
</style>

# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

## 引入

> `js`

```js
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-progress/index.js";
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

## 线形进度条

<div class="row left">
    <ea-button id="ea-progress-change-btn" type="primary">修改值为 100</ea-button>
    <ea-progress id="ea-progress" percentage="25"></ea-progress>
</div>

<div class="col left">
    <ea-progress percentage="60" status="success"></ea-progress>
    <ea-progress percentage="75" status="warning"></ea-progress>
    <ea-progress percentage="90" status="exception"></ea-progress>
</div>

::: details 查看源码

`html`

```html
<div class="row left">
  <ea-button id="ea-progress-change-btn" type="primary">修改值为 100</ea-button>
  <ea-progress id="ea-progress" percentage="25"></ea-progress>
</div>

<div class="col left">
  <ea-progress percentage="60" status="success"></ea-progress>
  <ea-progress percentage="75" status="warning"></ea-progress>
  <ea-progress percentage="90" status="exception"></ea-progress>
</div>
```

`js`: 设置进度条的进度 `progress.percentage = 100;`

```js
const linearProgressController = {
  btn: document.querySelector("#ea-progress-change-btn"),
  progress: document.querySelector("#ea-progress"),

  init() {
    this.btn.addEventListener("click", () => {
      this.progress.percentage = 100;
    });
  },
};
linearProgressController.init();
```

:::

## 百分比内显

百分比不占用额外控件，适用于文件上传等场景。通过设置 `text-inside` 属性开启。

<div class="row left">
    <ea-button id="ea-progress-text-inside-btn" type="primary">修改为随机值</ea-button>
    <ea-progress id="ea-progress-text-inside" stroke-width="26" text-inside percentage="25"></ea-progress>
</div>

<div class="col left">
    <ea-progress stroke-width="24" text-inside percentage="60" status="success"></ea-progress>
    <ea-progress stroke-width="22" text-inside percentage="75" status="warning"></ea-progress>
    <ea-progress stroke-width="20" text-inside percentage="90" status="exception"></ea-progress>
</div>

::: details 查看源码

`html`

```html
<div class="row left">
  <ea-button id="ea-progress-text-inside-btn" type="primary"
    >修改值为 100</ea-button
  >
  <ea-progress
    id="ea-progress-text-inside"
    stroke-width="26"
    text-inside
    percentage="25"
  ></ea-progress>
</div>

<div class="col left">
  <ea-progress
    stroke-width="24"
    text-inside
    percentage="60"
    status="success"
  ></ea-progress>
  <ea-progress
    stroke-width="22"
    text-inside
    percentage="75"
    status="warning"
  ></ea-progress>
  <ea-progress
    stroke-width="20"
    text-inside
    percentage="90"
    status="exception"
  ></ea-progress>
</div>
```

`js`

```js
const textInsideProgressController = {
  btn: document.querySelector("#ea-progress-text-inside-btn"),
  progress: document.querySelector("#ea-progress-text-inside"),
  init() {
    this.btn.addEventListener("click", () => {
      this.progress.percentage = Math.floor(Math.random() * 100);
    });
  },
};
textInsideProgressController.init();
```

:::

## 环形进度条

`Progress` 组件可通过 `type` 属性为 `circle` 来指定使用环形进度条，在环形进度条中，还可以通过 width 属性来设置其大小。

<div class="row left">
    <ea-progress id="ea-progress_circle" type="circle" :percentage="0"></ea-progress>
    <ea-button id="ea-progress_circle-change-btn" type="primary">修改为随机值</ea-button>
</div>

<div class="row left">
    <ea-progress type="circle" :percentage="0"></ea-progress>
    <ea-progress type="circle" :percentage="25"></ea-progress>
    <ea-progress type="circle" :percentage="100" status="success"></ea-progress>
    <ea-progress type="circle" :percentage="70" status="warning"></ea-progress>
    <ea-progress type="circle" :percentage="50" status="exception"></ea-progress>
</div>

::: details 查看源码

`html`

```html
<div class="row left">
  <ea-progress
    id="ea-progress_circle"
    type="circle"
    :percentage="0"
  ></ea-progress>
  <ea-button id="ea-progress_circle-change-btn" type="primary"
    >修改值为 100</ea-button
  >
</div>

<div class="row left">
  <ea-progress type="circle" :percentage="0"></ea-progress>
  <ea-progress type="circle" :percentage="25"></ea-progress>
  <ea-progress type="circle" :percentage="100" status="success"></ea-progress>
  <ea-progress type="circle" :percentage="70" status="warning"></ea-progress>
  <ea-progress type="circle" :percentage="50" status="exception"></ea-progress>
</div>
```

`js`

```js
const circleProgressController = {
  btn: document.querySelector("#ea-progress_circle-change-btn"),
  progress: document.querySelector("#ea-progress_circle"),

  init() {
    this.btn.addEventListener("click", () => {
      this.progress.percentage = Math.floor(Math.random() * 100);
    });
  },
};
circleProgressController.init();
```

:::

## 仪表盘形进度条

<div class="row left">
    <ea-progress id="ea-progress_dashboard" type="dashboard" :percentage="25"></ea-progress>
    <ea-button-group>
      <ea-button id="ea-progress_dashboard-minus-btn" type="primary">-</ea-button>
      <ea-button id="ea-progress_dashboard-plus-btn" type="primary">+</ea-button>
    </ea-button-group>
</div>

<div class="row left">
    <ea-progress type="dashboard" :percentage="0"></ea-progress>
    <ea-progress type="dashboard" :percentage="25"></ea-progress>
    <ea-progress type="dashboard" :percentage="100" status="success"></ea-progress>
    <ea-progress type="dashboard" :percentage="70" status="warning"></ea-progress>
    <ea-progress type="dashboard" :percentage="50" status="exception"></ea-progress>
</div>

::: details 查看代码

`html`

```html
<div class="row left">
  <ea-progress
    id="ea-progress_dashboard"
    type="dashboard"
    :percentage="25"
  ></ea-progress>
  <ea-button-group>
    <ea-button id="ea-progress_dashboard-minus-btn" type="primary">-</ea-button>
    <ea-button id="ea-progress_dashboard-plus-btn" type="primary">+</ea-button>
  </ea-button-group>
</div>

<div class="row left">
  <ea-progress type="dashboard" :percentage="0"></ea-progress>
  <ea-progress type="dashboard" :percentage="25"></ea-progress>
  <ea-progress
    type="dashboard"
    :percentage="100"
    status="success"
  ></ea-progress>
  <ea-progress type="dashboard" :percentage="70" status="warning"></ea-progress>
  <ea-progress
    type="dashboard"
    :percentage="50"
    status="exception"
  ></ea-progress>
</div>
```

`js`

```js
const dashboardController = {
  minusBtn: document.querySelector("#ea-progress_dashboard-change-btn-minus"),
  plusBtn: document.querySelector("#ea-progress_dashboard-change-btn-add"),
  progress: document.querySelector("#ea-progress_dashboard"),

  init() {
    this.minusBtn.addEventListener("click", () => {
      this.progress.value = Number(this.progress.percentage) - 10;
    });

    this.plusBtn.addEventListener("click", () => {
      this.progress.value = Number(this.progress.percentage) + 10;
    });
  },
};
dashboardController.init();
```

:::

## Attributes

| 参数         | 说明                  | 类型    | 可选值                   | 默认值 |
| ------------ | --------------------- | ------- | ------------------------ | ------ |
| type         | 进度条类型            | String  | circle, dashboard        | -      |
| percentage   | 进度百分比            | Number  | 0-100                    | 0      |
| status       | 进度条状态            | String  | success, warning, danger | -      |
| text-inside  | 进度条内显示文字      | Boolean | true, false              | false  |
| stroke-width | 进度条的宽度，单位 px | Number  | -                        | 6      |

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称       | 说明                                                |
| ---------- | --------------------------------------------------- |
| container  | 外层容器                                            |
| track-wrap | 进度条外层容器                                      |
| path       | 进度条                                              |
| text-wrap  | 文本外层容器 **(仅在 `text-inside="true"` 时生效)** |
