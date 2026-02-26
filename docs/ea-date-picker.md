<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

const fn = (e) => {
  console.log(e.detail)
}

onMounted(() => {
  // 选择某一天示例
  const basicExample = {
    sizeSegmented: document.getElementById("sizeSegmented"),
    defaultDatePicker: document.getElementById("defaultDatePicker"),
    disabledDatePicker: document.getElementById("disabledDatePicker"),
    centerDatePicker: document.getElementById("centerDatePicker"),

    init() {
      this.sizeSegmented.options = ["small", "default", "large"]

      this.sizeSegmented.addEventListener("change", e => {
        this.defaultDatePicker.size = e.detail.value
        this.disabledDatePicker.size = e.detail.value
        this.centerDatePicker.size = e.detail.value
      })
    },
  }
  basicExample.init()

  // 日期格式示例
  const formatExample = {
    formatPicker1: document.getElementById("formatPicker1"),
    formatPicker2: document.getElementById("formatPicker2"),
    formatPicker3: document.getElementById("formatPicker3"),

    onChange: e => {
      const { target } = e
      const valueEl = target.previousElementSibling
      valueEl.textContent = "Value: " + target.value
    },

    init() {
      this.formatPicker1.addEventListener("change", this.onChange)
      this.formatPicker2.addEventListener("change", this.onChange)
      this.formatPicker3.addEventListener("change", this.onChange)
    },
  }
  formatExample.init()
})
</script>

<style>
.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1rem 0;
}

.demo-date-picker .block {
  flex: 1;
  min-width: 240px;
  max-width: 320px;
  padding: 1.5rem;
}

.demo-date-picker .demonstration {
  display: block;
  margin-bottom: 0.75rem;
  font-size: 14px;
  text-align: center;
  color: #606266;
}

.demo-date-picker .demonstration:first-child {
  font-weight: 600;
  color: #303133;
}

.demo-date-picker ea-date-picker {
  width: 100%;
}
</style>

# DatePicker 日期选择器

用于选择或输入日期。

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/ea-date-picker/index.js";
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

移步到 [CSS Part](#datepicker-css-part)。

## 选择某一天

以「日」为基本单位，基础的日期选择控件。

<div class="demo">
  <p>
    <ea-segmented id="sizeSegmented" value="default"></ea-segmented>
  </p>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <ea-date-picker
        id="defaultDatePicker"
        type="date"
        placeholder="Pick a Date"
      ></ea-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">Disabled</span>
      <ea-date-picker
        id="disabledDatePicker"
        type="date"
        placeholder="Pick a Date"
        value="2026-01-01"
        disabled
      ></ea-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">Center Aligned</span>
      <ea-date-picker
        id="centerDatePicker"
        placeholder="Pick a Date"
        align="center"
      ></ea-date-picker>
    </div>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<p>
  <ea-segmented id="sizeSegmented" value="default"></ea-segmented>
</p>
<div class="demo-date-picker">
  <div class="block">
    <span class="demonstration">Default</span>
    <ea-date-picker
      id="defaultDatePicker"
      type="date"
      placeholder="Pick a Date"
    ></ea-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">Disabled</span>
    <ea-date-picker
      id="disabledDatePicker"
      type="date"
      placeholder="Pick a Date"
      value="2026-01-01"
      disabled
    ></ea-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">Center Aligned</span>
    <ea-date-picker
      id="centerDatePicker"
      placeholder="Pick a Date"
      align="center"
    ></ea-date-picker>
  </div>
</div>
```

```js
const basicExample = {
  sizeSegmented: document.getElementById("sizeSegmented"),
  defaultDatePicker: document.getElementById("defaultDatePicker"),
  disabledDatePicker: document.getElementById("disabledDatePicker"),
  centerDatePicker: document.getElementById("centerDatePicker"),

  init() {
    this.sizeSegmented.options = ["small", "default", "large"];

    this.sizeSegmented.addEventListener("change", e => {
      this.defaultDatePicker.size = e.detail.value;
      this.disabledDatePicker.size = e.detail.value;
      this.centerDatePicker.size = e.detail.value;
    });
  },
};
basicExample.init();
```

```css
.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1rem 0;
}

.demo-date-picker .block {
  flex: 1;
  min-width: 240px;
  max-width: 320px;
  padding: 1.5rem;
}

.demo-date-picker .demonstration {
  display: block;
  margin-bottom: 0.75rem;
  font-size: 14px;
  text-align: center;
  color: #606266;
}

.demo-date-picker .demonstration:first-child {
  font-weight: 600;
  color: #303133;
}

.demo-date-picker ea-date-picker {
  width: 100%;
}
```

:::

::::

## 其他日期单位

通过设置 `type` 属性，可以实现年份、月份的选择。

<div class="demo demo-date-picker">
  <div class="block">
    <span class="demonstration">Year</span>
    <ea-date-picker placeholder="Pick a Year" type="year"></ea-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">Month</span>
    <ea-date-picker placeholder="Pick a Month" type="month"></ea-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">Date</span>
    <ea-date-picker placeholder="Pick a Date" type="date"></ea-date-picker>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo demo-date-picker">
  <div class="block">
    <span class="demonstration">Year</span>
    <ea-date-picker placeholder="Pick a Year" type="year"></ea-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">Month</span>
    <ea-date-picker placeholder="Pick a Month" type="month"></ea-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">Date</span>
    <ea-date-picker placeholder="Pick a Date" type="date"></ea-date-picker>
  </div>
</div>
```

```css
.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1rem 0;
}

.demo-date-picker .block {
  flex: 1;
  min-width: 240px;
  max-width: 320px;
  padding: 1.5rem;
}

.demo-date-picker .demonstration {
  display: block;
  margin-bottom: 0.75rem;
  font-size: 14px;
  text-align: center;
  color: #606266;
}

.demo-date-picker .demonstration:first-child {
  font-weight: 600;
  color: #303133;
}

.demo-date-picker ea-date-picker {
  width: 100%;
}
```

:::

::::

## 日期格式

使用 `display-format` 指定输入框的显示格式，使用 `value-format` 指定绑定值的格式。

默认情况下，组件接受并返回 `Date` 对象。使用 `value-format` 可以指定返回值的格式为字符串或时间戳。

<div class="demo demo-date-picker">
  <div class="block">
    <span class="demonstration">Emits Date object</span>
    <div class="demonstration" id="value1">Value:</div>
    <ea-date-picker
      id="formatPicker1"
      type="date"
      placeholder="Pick a Date"
      display-format="YYYY/MM/DD"
    ></ea-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">Use value-format</span>
    <div class="demonstration" id="value2">Value:</div>
    <ea-date-picker
      id="formatPicker2"
      type="date"
      placeholder="Pick a Date"
      display-format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
    ></ea-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">Timestamp</span>
    <div class="demonstration" id="value3">Value:</div>
    <ea-date-picker
      id="formatPicker3"
      type="date"
      placeholder="Pick a Date"
      display-format="YYYY/MM/DD"
      value-format="x"
    ></ea-date-picker>
  </div>
</div>

:::: details 查看代码

::: code-group

```html
<div class="demo demo-date-picker">
  <div class="block">
    <span class="demonstration">Emits Date object</span>
    <div class="demonstration" id="value1">Value:</div>
    <ea-date-picker
      id="formatPicker1"
      type="date"
      placeholder="Pick a Date"
      display-format="YYYY/MM/DD"
    ></ea-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">Use value-format</span>
    <div class="demonstration" id="value2">Value:</div>
    <ea-date-picker
      id="formatPicker2"
      type="date"
      placeholder="Pick a Date"
      display-format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
    ></ea-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">Timestamp</span>
    <div class="demonstration" id="value3">Value:</div>
    <ea-date-picker
      id="formatPicker3"
      type="date"
      placeholder="Pick a Date"
      display-format="YYYY/MM/DD"
      value-format="x"
    ></ea-date-picker>
  </div>
</div>
```

```js
const formatExample = {
  formatPicker1: document.getElementById("formatPicker1"),
  formatPicker2: document.getElementById("formatPicker2"),
  formatPicker3: document.getElementById("formatPicker3"),

  onChange: e => {
    const { target } = e;
    const valueEl = target.previousElementSibling;
    valueEl.textContent = "Value: " + target.value;
  },

  init() {
    this.formatPicker1.addEventListener("change", this.onChange);
    this.formatPicker2.addEventListener("change", this.onChange);
    this.formatPicker3.addEventListener("change", this.onChange);
  },
};
formatExample.init();
```

```css
.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1rem 0;
}

.demo-date-picker .block {
  flex: 1;
  min-width: 240px;
  max-width: 320px;
  padding: 1.5rem;
}

.demo-date-picker .demonstration {
  display: block;
  margin-bottom: 0.75rem;
  font-size: 14px;
  text-align: center;
  color: #606266;
}

.demo-date-picker .demonstration:first-child {
  font-weight: 600;
  color: #303133;
}

.demo-date-picker ea-date-picker {
  width: 100%;
}
```

:::

::::

## DatePicker API

### DatePicker Attributes

| 参数           | 说明                 | 类型    | 可选值                      | 默认值     |
| -------------- | -------------------- | ------- | --------------------------- | ---------- |
| value          | 日期值               | string  | —                           | —          |
| type           | 显示类型             | string  | `date \| month \| year`     | date       |
| placeholder    | 输入框占位文本       | string  | —                           | —          |
| disabled       | 是否禁用             | boolean | —                           | false      |
| size           | 输入框尺寸           | string  | `large \| default \| small` | default    |
| align          | 对齐方式             | string  | `left \| center \| right`   | left       |
| display-format | 显示在输入框中的格式 | string  | 见[日期格式](#日期格式)     | YYYY-MM-DD |
| value-format   | 绑定值的格式         | string  | 见[日期格式](#日期格式)     | YYYY-MM-DD |
| width          | 输入框宽度           | string  | —                           | -          |
| locale         | 国际化语言           | string  | -                           | en-US      |

### DatePicker CSS Part

| 名称            | 说明                                  |
| --------------- | ------------------------------------- |
| container       | 组件根容器                            |
| input-wrap      | 输入框包装器                          |
| input           | 输入框元素                            |
| dropdown-wrap   | 下拉面板包装器                        |
| calendar-header | 日历头部                              |
| header-left     | 头部左侧                              |
| header-center   | 头部中心                              |
| header-right    | 头部右侧                              |
| header-btn      | 头部按钮                              |
| header-year     | 年份按钮                              |
| header-month    | 月份按钮                              |
| calendar-body   | 日历主体                              |
| calendar        | [日历组件](./ea-calendar.md#css-part) |
| year-panel      | 年份选择面板                          |
| year-item       | 年份项                                |
| month-panel     | 月份选择面板                          |
| month-item      | 月份项                                |

### DatePicker Slots

| 名称 | 说明 |
| ---- | ---- |
| —    | —    |

### DatePicker Methods

| 方法名              | 说明             | 参数             |
| ------------------- | ---------------- | ---------------- |
| focus               | 使组件获取焦点   | —                |
| blur                | 使组件失去焦点   | —                |
| handleOpen          | 打开日期选择面板 | —                |
| handleClose         | 关闭日期选择面板 | —                |
| $updateLocalization | 更新本地化语言   | (locale: string) |

### DatePicker Events

| 事件名            | 说明                         | 回调参数(event.detail)                                                          |
| ----------------- | ---------------------------- | ------------------------------------------------------------------------------- |
| change            | 用户确认选定的值时触发       | `{ fullDate: string, year: number, month: number, date: number, week: number }` |
| focus             | 当 Input 组件获得焦点时触发  | —                                                                               |
| blur              | 当 Input 组件失去焦点时触发  | —                                                                               |
| ea-panel-change   | 当日期选择面板发生改变时触发 | `{ date: Date, mode: 'month' \| 'year', view?: string }`                        |
| ea-visible-change | 当下拉列表显示状态改变时触发 | `{ visible: boolean }`                                                          |
