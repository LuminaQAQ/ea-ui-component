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

显示日期

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-calendar/index.js";
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

## 基础用法

<div class="demo">
  <ea-calendar></ea-calendar>
</div>

```html
<div class="demo">
  <ea-calendar></ea-calendar>
</div>
```

## 自定义日期

通过设置 `value` 属性可以自定义显示的日期

<div class="demo">
  <ea-calendar value="2024-05-01"></ea-calendar>
</div>

```html
<div class="demo">
  <ea-calendar value="2024-05-01"></ea-calendar>
</div>
```

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

## Attributes

| 参数            | 说明       | 类型   | 可选值             | 默认值 |
| --------------- | ---------- | ------ | ------------------ | ------ |
| value           | 指定日期   | String | -                  | -      |
| controller-type | 控制器类型 | String | `button \| select` | button |

## CSS Part

| 名称                                                              | 说明         |
| ----------------------------------------------------------------- | ------------ |
| container                                                         | 外层容器     |
| header                                                            | 头部容器     |
| title                                                             | 标题部分     |
| controller-wrapper                                                | 控制器包装器 |
| controller-group                                                  | 控制器组     |
| controller & `"prev" \| "next" \| "current" \| "year" \| "month"` | 控制器       |
| body                                                              | 主体部分     |
| thead                                                             | 表头         |
| tr & `thead-tr`                                                   | 表头         |
| th                                                                | 表头单元格   |
| tbody                                                             | 表体         |
| row                                                               | 日期行       |
| day & `"last-mon" \| "current-mon" \| "next-mon"`                 | 日期单元格   |

## Events

| 事件名称 | 说明           | 回调参数                                               |
| -------- | -------------- | ------------------------------------------------------ |
| select   | 选择日期时触发 | `{ year, month, date, day, fullDate }`                 |

## Slots

| 名称   | 说明                         |
| ------ | ---------------------------- |
| header | 头部插槽，用于自定义头部内容 |
