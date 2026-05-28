<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {

      const controllerExample = {
        radio: document.querySelector("#controllerCalendarRadio"),
        calendar: document.querySelector("#controllerCalendarCalendar"),

        init() {
          this.radio.addEventListener("change", e => {
            this.calendar.setAttribute("controller-type", e.detail.value);
          });
        },
      };

      controllerExample.init();


      const localeExample = {
        radio: document.querySelector("#localeCalendarRadio"),
        calendar: document.querySelector("#localeCalendarCalendar"),

        init() {
          this.radio.addEventListener("change", e => {
            this.calendar.setAttribute("locale", e.detail.value);
          });
        },
      };

      localeExample.init();


})
</script>

# Calendar 日历

显示日期，支持按钮/下拉控制器和国际化。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-calendar/index";
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

移步到 [CSS Part](#ea-calendar-css-part) 和 [CSS 自定义属性](#ea-calendar-css-自定义属性)。

## 基础用法

<div class="demo">
  <ea-calendar></ea-calendar>
</div>

::: details 查看代码

```html
<ea-calendar></ea-calendar>
```

:::

## 自定义日期

通过设置 `value` 属性可以自定义显示的日期

<div class="demo">
  <ea-calendar value="2024-05-01"></ea-calendar>
</div>

::: details 查看代码

```html
<ea-calendar value="2024-05-01"></ea-calendar>
```

:::

## 控制器类型

通过设置 `controller-type` 属性可以选择控制器类型，支持 `button`（默认）和 `select` 两种类型

<div class="demo">
  <p>
    <ea-radio-group id="controllerCalendarRadio" value="button">
      <ea-radio value="button">button</ea-radio>
      <ea-radio value="select">select</ea-radio>
    </ea-radio-group>
  </p>
  <ea-calendar id="controllerCalendarCalendar"></ea-calendar>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <p>
    <ea-radio-group id="controllerCalendarRadio" value="button">
      <ea-radio value="button">button</ea-radio>
      <ea-radio value="select">select</ea-radio>
    </ea-radio-group>
  </p>
  <ea-calendar id="controllerCalendarCalendar"></ea-calendar>
</div>
```

```js
const controllerExample = {
  radio: document.querySelector("#controllerCalendarRadio"),
  calendar: document.querySelector("#controllerCalendarCalendar"),

  init() {
    this.radio.addEventListener("change", e => {
      this.calendar.setAttribute("controller-type", e.detail.value);
    });
  },
};

controllerExample.init();
```

:::

::::

## 国际化

通过设置 `locale` 属性可以控制日历的语言（影响月份和星期名称的显示）

<div class="demo">
  <p>
    <ea-radio-group id="localeCalendarRadio" value="en-US">
      <ea-radio value="en-US">en-US</ea-radio>
      <ea-radio value="zh-CN">zh-CN</ea-radio>
    </ea-radio-group>
  </p>
  <ea-calendar id="localeCalendarCalendar"></ea-calendar>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo">
  <p>
    <ea-radio-group id="localeCalendarRadio" value="en-US">
      <ea-radio value="en-US">en-US</ea-radio>
      <ea-radio value="zh-CN">zh-CN</ea-radio>
    </ea-radio-group>
  </p>
  <ea-calendar id="localeCalendarCalendar"></ea-calendar>
</div>
```

```js
const localeExample = {
  radio: document.querySelector("#localeCalendarRadio"),
  calendar: document.querySelector("#localeCalendarCalendar"),

  init() {
    this.radio.addEventListener("change", e => {
      this.calendar.setAttribute("locale", e.detail.value);
    });
  },
};

localeExample.init();
```

:::

::::

## ea-calendar API

### ea-calendar Attributes

| 参数            | 说明       | 类型   | 可选值             | 默认值 |
| --------------- | ---------- | ------ | ------------------ | ------ |
| value           | 指定日期   | String | —                  | —      |
| controller-type | 控制器类型 | String | `button \| select` | button |
| locale          | 语言设置   | String | `en-US \| zh-CN`   | en-US  |

### ea-calendar CSS Part

| 名称               | 说明            |
| ------------------ | --------------- |
| container          | 外层容器        |
| header             | 头部容器        |
| title              | 标题部分        |
| controller-wrapper | 控制器包装器    |
| controller-group   | 控制器组        |
| controller         | 控制器通用部分  |
| prev               | 上一月控制器    |
| next               | 下一月控制器    |
| current            | 当前/今天控制器 |
| year               | 年份选择器      |
| month              | 月份选择器      |
| body               | 主体表格        |
| thead              | 表头            |
| thead-tr           | 表头行          |
| th                 | 表头单元格      |
| tbody              | 表体            |
| row                | 日期行          |
| day                | 日期单元格      |
| prev-month         | 上月日期单元格  |
| current-month      | 当月日期单元格  |
| next-month         | 下月日期单元格  |

### ea-calendar Slots

| 名称   | 说明                         |
| ------ | ---------------------------- |
| header | 头部插槽，用于自定义头部内容 |

### ea-calendar Events

| 事件名称  | 说明           | 回调参数                               |
| --------- | -------------- | -------------------------------------- |
| ea-select | 选择日期时触发 | `{ year, month, date, day, fullDate }` |

### ea-calendar CSS 自定义属性

| 属性名                                        | 说明                   | 默认值                  |
| --------------------------------------------- | ---------------------- | ----------------------- |
| --ea-calendar-bg-color                        | 组件背景颜色           | var(--white)            |
| --ea-calendar-border-color                    | 组件边框颜色           | var(--grey-200)         |
| --ea-calendar-border-radius                   | 组件圆角               | var(--border-radius)    |
| --ea-calendar-shadow                          | 组件阴影               | var(--box-shadow-sm)    |
| --ea-calendar-header-padding                  | 头部内边距             | var(--spacing-md)       |
| --ea-calendar-header-title-font-size          | 标题字体大小           | var(--font-size-lg)     |
| --ea-calendar-header-title-font-weight        | 标题字体粗细           | var(--font-weight-bold) |
| --ea-calendar-header-title-color              | 标题颜色               | var(--grey-900)         |
| --ea-calendar-body-padding                    | 主体内边距             | var(--spacing-md)       |
| --ea-calendar-thead-bg-color                  | 表头背景颜色           | var(--grey-100)         |
| --ea-calendar-th-color                        | 表头单元格颜色         | var(--grey-700)         |
| --ea-calendar-th-font-weight                  | 表头单元格字体粗细     | var(--font-weight-md)   |
| --ea-calendar-th-padding                      | 表头单元格内边距       | var(--spacing-md) 0     |
| --ea-calendar-th-border-color                 | 表头单元格边框颜色     | var(--grey-200)         |
| --ea-calendar-day-height                      | 日期单元格高度         | 40px                    |
| --ea-calendar-day-hover-bg-color              | 日期悬停背景颜色       | var(--grey-100)         |
| --ea-calendar-day-active-bg-color             | 选中日期背景颜色       | var(--blue-500)         |
| --ea-calendar-day-active-color                | 选中日期文字颜色       | var(--white)            |
| --ea-calendar-day-active-border-color         | 选中日期边框颜色       | var(--blue-500)         |
| --ea-calendar-day-active-hover-bg-color       | 选中日期悬停背景颜色   | var(--blue-400)         |
| --ea-calendar-day-today-color                 | 今日日期文字颜色       | var(--blue-500)         |
| --ea-calendar-day-today-font-weight           | 今日日期字体粗细       | var(--font-weight-bold) |
| --ea-calendar-day-out-of-range-color          | 非当月日期文字颜色     | var(--grey-400)         |
| --ea-calendar-day-out-of-range-hover-color    | 非当月日期悬停文字颜色 | var(--grey-500)         |
| --ea-calendar-day-out-of-range-hover-bg-color | 非当月日期悬停背景颜色 | var(--grey-100)         |
| --ea-calendar-controller-year-width           | 年份选择器宽度         | 120px                   |
| --ea-calendar-controller-month-width          | 月份选择器宽度         | 100px                   |
| --ea-calendar-controller-group-gap            | 控制器组间距           | var(--spacing-sm)       |
