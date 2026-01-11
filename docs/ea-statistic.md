<script setup>
import { onMounted } from 'vue'
import dayjs from "dayjs"
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
  const countdownExample = {
    countdown1: document.querySelector('#countdown1'),
    countdown2: document.querySelector('#countdown2'),
    countdown3: document.querySelector('#countdown3'),
    countdownFooter: document.querySelector('#countdownFooter'),
    init() {
      this.countdown1.setAttribute('value', Date.now() + 1000 * 60 * 60 * 7)
      this.countdown2.setAttribute('value', Date.now() + 1000 * 60 * 60 * 24 * 2)
      this.countdown3.setAttribute('value', dayjs().add(1, 'month').startOf('month').format('YYYY-MM-DD'))

      this.countdownFooter.textContent = dayjs().add(1, 'month').startOf('month').format('YYYY-MM-DD')
    }
  }
  countdownExample.init()
})
</script>

<style scoped>
ea-statistic {
  display: block;
}

.statistic-card {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  border-radius: 4px;
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green { color: #67c23a }
.red { color: #f56c6c }
</style>

# Statistic 统计数值

显示统计数值与倒计时的组件集合。

## 引入

`js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-statistic/index.js";
  import "./node_modules/easy-component-ui/components/ea-countdown/index.js";
</script>
```

> `css`

::: tip
如果示例使用到图标，需提前使用 `link` 标签引入图标样式文件。
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 基础用法

用于突出某个或某组数字时，如统计数值、金额、排名等，数值和标题前后都可以加icon、单位等元素。

<div class="demo">
  <ea-statistic title="Daily active users" value="268500"></ea-statistic>
  <ea-statistic value="138">
    <div slot="title" style="display: inline-flex; align-items: center">
      Ratio of men to women
      <ea-icon style="margin-left: 4px" size="12" icon="icon-mars"></ea-icon>
    </div>
    <div slot="suffix">/100</div>
  </ea-statistic>
  <ea-statistic title="Total Transactions" value="172000"></ea-statistic>
  <ea-statistic title="Feedback number" value="562">
    <div slot="suffix">
      <ea-icon style="vertical-align: middle" icon="icon-comment-empty"></ea-icon>
    </div>
  </ea-statistic>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-statistic title="Daily active users" value="268500"></ea-statistic>
  <ea-statistic value="138">
    <div slot="title" style="display: inline-flex; align-items: center">
      Ratio of men to women
      <ea-icon style="margin-left: 4px" size="12" icon="icon-mars"></ea-icon>
    </div>
    <div slot="suffix">/100</div>
  </ea-statistic>
  <ea-statistic title="Total Transactions" value="172000"></ea-statistic>
  <ea-statistic title="Feedback number" value="562">
    <div slot="suffix">
      <ea-icon
        style="vertical-align: middle"
        icon="icon-comment-empty"
      ></ea-icon>
    </div>
  </ea-statistic>
</div>
```

:::

## 倒计时

`Countdown` 用于显示倒计时/剩余时间，支持 `format` 属性并可通过设置 `value` 为时间戳或日期字符串来初始化。

<div class="demo">
  <ea-countdown id="countdown1" title="Start to grab"></ea-countdown>
  <div style="display:flex;align-items:center;justify-content:center;flex-direction:column;">
    <ea-countdown id="countdown2" title="Remaining VIP time" format="HH:mm:ss"></ea-countdown>
    <ea-button type="primary" onclick="document.getElementById('countdown2').setAttribute('value', Date.now() + 1000 * 60 * 60 * 24 * 2);">Reset</ea-button>
  </div>

  <div style="display:flex;align-items:center;justify-content:center;flex-direction:column;">
    <ea-countdown id="countdown3" title="Countdown" format="DD [days] HH:mm:ss">
      <div style="display: inline-flex; align-items: center" slot="title">
        <ea-icon style="margin-right: 4px" size="12" icon="icon-calendar-times-o"></ea-icon>
        <span> Still to go until next month </span>
      </div>
    </ea-countdown>
    <span id="countdownFooter"></span>
  </div>
</div>

::: details 查看代码

```html
<div class="demo">
  <ea-countdown id="countdown1" title="Start to grab"></ea-countdown>
  <div
    style="display:flex;align-items:center;justify-content:center;flex-direction:column;"
  >
    <ea-countdown
      id="countdown2"
      title="Remaining VIP time"
      format="HH:mm:ss"
    ></ea-countdown>
    <ea-button
      type="primary"
      onclick="document.getElementById('countdown2').setAttribute('value', Date.now() + 1000 * 60 * 60 * 24 * 2);"
      >Reset</ea-button
    >
  </div>

  <div
    style="display:flex;align-items:center;justify-content:center;flex-direction:column;"
  >
    <ea-countdown id="countdown3" title="Countdown" format="DD [days] HH:mm:ss">
      <div style="display: inline-flex; align-items: center" slot="title">
        <ea-icon
          style="margin-right: 4px"
          size="12"
          icon="icon-calendar-times-o"
        ></ea-icon>
        <span> Still to go until next month </span>
      </div>
    </ea-countdown>
    <span id="countdownFooter"></span>
  </div>
</div>

<script type="module">
  // 示例初始化脚本（在页面中引入 dayjs）
  const countdownExample = {
    countdown1: document.querySelector("#countdown1"),
    countdown2: document.querySelector("#countdown2"),
    countdown3: document.querySelector("#countdown3"),
    countdownFooter: document.querySelector("#countdownFooter"),
    init() {
      this.countdown1.setAttribute("value", Date.now() + 1000 * 60 * 60 * 7);
      this.countdown2.setAttribute(
        "value",
        Date.now() + 1000 * 60 * 60 * 24 * 2
      );
      this.countdown3.setAttribute(
        "value",
        dayjs().add(1, "month").startOf("month").format("YYYY-MM-DD")
      );

      this.countdownFooter.textContent = dayjs()
        .add(1, "month")
        .startOf("month")
        .format("YYYY-MM-DD");
    },
  };
  countdownExample.init();
</script>
```

:::

## 统计卡片

在卡片中使用 `ea-statistic`，并在底部显示环比信息。

<div class="demo row">
  <div class="statistic-card">
    <ea-statistic value="98500">
      <div style="display: inline-flex; align-items: center" slot="title">
        Daily active users
        <ea-tooltip effect="dark" content="Number of users who logged into the product in one day" placement="top">
          <ea-icon style="margin-left: 4px" slot="reference" size="12" icon="icon-attention-alt"></ea-icon>
        </ea-tooltip>
      </div>
    </ea-statistic>
    <div class="statistic-footer">
      <div class="footer-item">
        <span>than yesterday</span>
        <span class="green">24%<ea-icon icon="icon-angle-up"></ea-icon></span>
      </div>
    </div>
  </div>

  <div class="statistic-card">
    <ea-statistic value="693700">
      <div style="display: inline-flex; align-items: center" slot="title">
        Monthly Active Users
        <ea-tooltip effect="dark" content="Number of users who logged into the product in one month" placement="top">
          <ea-icon style="margin-left: 4px" slot="reference" size="12" icon="icon-attention-alt"></ea-icon>
        </ea-tooltip>
      </div>
    </ea-statistic>
    <div class="statistic-footer">
      <div class="footer-item">
        <span>month on month</span>
        <span class="red">12%<ea-icon icon="icon-angle-down"></ea-icon></span>
      </div>
    </div>
  </div>

  <div class="statistic-card">
    <ea-statistic value="72000" title="New transactions today">
      <div style="display: inline-flex; align-items: center" slot="title">New transactions today</div>
    </ea-statistic>
    <div class="statistic-footer">
      <div class="footer-item">
        <span>than yesterday</span>
        <span class="green">16%<ea-icon icon="icon-angle-up"></ea-icon></span>
      </div>
      <div class="footer-item">
        <ea-icon icon="icon-angle-up" size="14"> </ea-icon>
      </div>
    </div>
  </div>
</div>

::: details 查看代码

`HTML`

```html
<div class="demo row">
  <div class="statistic-card">
    <ea-statistic value="98500">
      <div style="display: inline-flex; align-items: center" slot="title">
        Daily active users
        <ea-tooltip
          effect="dark"
          content="Number of users who logged into the product in one day"
          placement="top"
        >
          <ea-icon
            style="margin-left: 4px"
            slot="reference"
            size="12"
            icon="icon-attention-alt"
          ></ea-icon>
        </ea-tooltip>
      </div>
    </ea-statistic>
    <div class="statistic-footer">
      <div class="footer-item">
        <span>than yesterday</span>
        <span class="green">24%<ea-icon icon="icon-angle-up"></ea-icon></span>
      </div>
    </div>
  </div>

  <div class="statistic-card">
    <ea-statistic value="693700">
      <div style="display: inline-flex; align-items: center" slot="title">
        Monthly Active Users
        <ea-tooltip
          effect="dark"
          content="Number of users who logged into the product in one month"
          placement="top"
        >
          <ea-icon
            style="margin-left: 4px"
            slot="reference"
            size="12"
            icon="icon-attention-alt"
          ></ea-icon>
        </ea-tooltip>
      </div>
    </ea-statistic>
    <div class="statistic-footer">
      <div class="footer-item">
        <span>month on month</span>
        <span class="red">12%<ea-icon icon="icon-angle-down"></ea-icon></span>
      </div>
    </div>
  </div>

  <div class="statistic-card">
    <ea-statistic value="72000" title="New transactions today">
      <div style="display: inline-flex; align-items: center" slot="title">
        New transactions today
      </div>
    </ea-statistic>
    <div class="statistic-footer">
      <div class="footer-item">
        <span>than yesterday</span>
        <span class="green">16%<ea-icon icon="icon-angle-up"></ea-icon></span>
      </div>
      <div class="footer-item">
        <ea-icon icon="icon-angle-up" size="14"> </ea-icon>
      </div>
    </div>
  </div>
</div>
```

`css`

```css
.statistic-card {
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 100%;
  padding: 20px;
  border-radius: 4px;
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: #67c23a;
}
.red {
  color: #f56c6c;
}
```

:::

## Statistic API

### Statistic Attributes

| 参数  | 说明                           | 类型               | 可选值 | 默认值 |
| ----- | ------------------------------ | ------------------ | ------ | ------ |
| title | 显示的标题文本                 | string             | -      | -      |
| value | 要显示的数值，可为数字或字符串 | `number \| string` | -      | 0      |

### Statistic CSS Part

| 名称      | 说明                         |
| --------- | ---------------------------- |
| container | 组件根容器，part="container" |
| title     | 标题区域，part="title"       |
| content   | 内容区域，part="content"     |
| prefix    | 前缀，part="prefix"          |
| number    | 数值区域，part="number"      |
| suffix    | 后缀，part="suffix"          |

### Statistic Slots

| 名称   | 说明           |
| ------ | -------------- |
| -      | 默认内容插槽   |
| title  | 自定义标题插槽 |
| prefix | 自定义前缀插槽 |
| suffix | 自定义后缀插槽 |

## Countdown API

### Countdown Attributes

| 参数                               | 说明                                                           | 类型               | 可选值 | 默认值          |
| ---------------------------------- | -------------------------------------------------------------- | ------------------ | ------ | --------------- |
| value                              | 倒计时目标，可为时间戳（ms）或日期字符串                       | `number \| string` | -      | -               |
| format                             | 显示格式（支持 dayjs 风格或组件自定义占位符），例如 `HH:mm:ss` | string             | -      | HH:mm:ss (推断) |
| title                              | 标题文本                                                       | string             | -      | -               |
| refresh-interval                   | 刷新间隔（ms），默认 1000ms                                    | number             | -      |
| displayValue <ea-tag>prop</ea-tag> | 显示值，默认为倒计时剩余时间（ms）                             | number             | -      | -               |

### Countdown Events

| 事件名    | 说明             | 触发时机                 | 事件 detail                               |
| --------- | ---------------- | ------------------------ | ----------------------------------------- |
| change    | 倒计时变化时触发 | 倒计时变化时             | `{ value: Number, displayValue: String }` |
| ea-finish | 倒计时结束时触发 | 倒计时归零或达到目标时间 | `{ value: Number, displayValue: String }` |

### Countdown CSS Part

| 名称      | 说明                         |
| --------- | ---------------------------- |
| container | 组件根容器，part="container" |
| title     | 标题区域，part="title"       |
| content   | 内容区域，part="content"     |
| prefix    | 前缀，part="prefix"          |
| number    | 数值区域，part="number"      |
| suffix    | 后缀，part="suffix"          |

### Countdown Slots

| 名称   | 说明           |
| ------ | -------------- |
| -      | 默认内容插槽   |
| title  | 自定义标题插槽 |
| prefix | 自定义前缀插槽 |
| suffix | 自定义后缀插槽 |
