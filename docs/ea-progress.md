<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    import('../index.js')
    import('./index.scss')

    document.querySelector('#ea-progress-change-btn').addEventListener('click', function (e) {
        document.querySelector('#ea-progress').percentage = 100;
    })

    document.querySelector('#ea-progress-text-inside-btn').addEventListener('click', function (e) {
        document.querySelector('#ea-progress-text-inside').percentage = 100;
    })

    document.querySelector('#ea-progress_circle-change-btn').addEventListener('click', function (e) {
        document.querySelector('#ea-progress_circle').percentage = 100;
    })

    document.querySelector('#ea-progress_dashboard-change-btn-add').addEventListener('click', function (e) {
        const dashboardPercentage = Number(document.querySelector('#ea-progress_dashboard').percentage);
        document.querySelector('#ea-progress_dashboard').percentage = dashboardPercentage - 10;
    })
    document.querySelector('#ea-progress_dashboard-change-btn-minus').addEventListener('click', function (e) {
        const dashboardPercentage = Number(document.querySelector('#ea-progress_dashboard').percentage);
        document.querySelector('#ea-progress_dashboard').percentage = dashboardPercentage + 10;
    })
})
</script>

<style lang="scss" scoped>
ea-progress {
    width: 20rem;
}

ea-progress[type="circle"],
ea-progress[type="dashboard"] {
    width: auto;
}
</style>

# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

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

`JS`: 设置进度条的进度

```js
// 核心逻辑
progress.percentage = 100;

// 示例
document
  .querySelector("#ea-progress-change-btn")
  .addEventListener("click", function (e) {
    document.querySelector("#ea-progress").percentage = 100;
  });
```

## 百分比内显

百分比不占用额外控件，适用于文件上传等场景。

<div class="row left">
    <ea-button id="ea-progress-text-inside-btn" type="primary">修改值为 100</ea-button>
    <ea-progress id="ea-progress-text-inside" stroke-width="26" text-inside percentage="25"></ea-progress>
</div>

<div class="col left">
    <ea-progress stroke-width="24" text-inside percentage="60" status="success"></ea-progress>
    <ea-progress stroke-width="22" text-inside percentage="75" status="warning"></ea-progress>
    <ea-progress stroke-width="20" text-inside percentage="90" status="exception"></ea-progress>
</div>

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

## 环形进度条

Progress 组件可通过 type 属性来指定使用环形进度条，在环形进度条中，还可以通过 width 属性来设置其大小。

<div class="row left">
    <ea-progress id="ea-progress_circle" type="circle" :percentage="0"></ea-progress>
    <ea-button id="ea-progress_circle-change-btn" type="primary">修改值为 100</ea-button>
</div>

<div class="row left">
    <ea-progress type="circle" :percentage="0"></ea-progress>
    <ea-progress type="circle" :percentage="25"></ea-progress>
    <ea-progress type="circle" :percentage="100" status="success"></ea-progress>
    <ea-progress type="circle" :percentage="70" status="warning"></ea-progress>
    <ea-progress type="circle" :percentage="50" status="exception"></ea-progress>
</div>

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

```js
document
  .querySelector("#ea-progress_circle-change-btn")
  .addEventListener("click", function (e) {
    document.querySelector("#ea-progress_circle").percentage = 100;
  });
```

## 仪表盘形进度条

<div class="row left">
    <ea-progress id="ea-progress_dashboard" type="dashboard" :percentage="25"></ea-progress>
    <ea-button-group>
      <ea-button id="ea-progress_dashboard-change-btn-add" type="primary">-</ea-button>
      <ea-button id="ea-progress_dashboard-change-btn-minus" type="primary">+</ea-button>
    </ea-button-group>
</div>

<div class="row left">
    <ea-progress type="dashboard" :percentage="0"></ea-progress>
    <ea-progress type="dashboard" :percentage="25"></ea-progress>
    <ea-progress type="dashboard" :percentage="100" status="success"></ea-progress>
    <ea-progress type="dashboard" :percentage="70" status="warning"></ea-progress>
    <ea-progress type="dashboard" :percentage="50" status="exception"></ea-progress>
</div>

```html
<!-- 示例: html + js -->
<div class="row left">
  <ea-progress
    id="ea-progress_dashboard"
    type="dashboard"
    :percentage="25"
  ></ea-progress>
  <ea-button-group>
    <ea-button id="ea-progress_dashboard-change-btn-add" type="primary"
      >-</ea-button
    >
    <ea-button id="ea-progress_dashboard-change-btn-minus" type="primary"
      >+</ea-button
    >
  </ea-button-group>
</div>

<!-- 实例 -->
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

```js
document
  .querySelector("#ea-progress_dashboard-change-btn-add")
  .addEventListener("click", function (e) {
    const dashboardPercentage = Number(
      document.querySelector("#ea-progress_dashboard").percentage
    );
    document.querySelector("#ea-progress_dashboard").percentage =
      dashboardPercentage - 10;
  });
document
  .querySelector("#ea-progress_dashboard-change-btn-minus")
  .addEventListener("click", function (e) {
    const dashboardPercentage = Number(
      document.querySelector("#ea-progress_dashboard").percentage
    );
    document.querySelector("#ea-progress_dashboard").percentage =
      dashboardPercentage + 10;
  });
```

## Attributes

| 参数         | 说明                  | 类型    | 可选值                   | 默认值 |
| ------------ | --------------------- | ------- | ------------------------ | ------ |
| type         | 进度条类型            | String  | circle, dashboard        | -      |
| percentage   | 进度百分比            | Number  | 0-100                    | 0      |
| status       | 进度条状态            | String  | success, warning, danger | -      |
| text-inside  | 进度条内显示文字      | Boolean | true, false              | false  |
| stroke-width | 进度条的宽度，单位 px | Number  | -                        | 6      |
