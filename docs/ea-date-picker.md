<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
})
</script>

# DatePicker 日期选择器

用于选择或输入日期

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

移步到 [CSS Part](#css-part)。

## 任意时间点

以「日」为基本单位，基础的日期选择控件

<div class="demo">
    <ea-date-picker placeholder="选择日期"></ea-date-picker>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-date-picker placeholder="选择日期"></ea-date-picker>
</div>
```

`js`: `change` 事件

```js
document.querySelector("ea-date-picker").addEventListener("change", e => {
  console.log(e.detail);
});
```

:::

## 禁用状态

通过设置 `disabled` 属性，可以禁用时间选择器

<div class="demo">
    <ea-date-picker placeholder="选择日期" value="2024-1-1" disabled></ea-date-picker>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-date-picker placeholder="选择日期" disabled></ea-date-picker>
</div>
```

:::

## 对齐方式

通过设置 `align` 属性，可以设置时间选择器的对齐方式

<div class="demo">
    <ea-date-picker placeholder="选择日期" align="center"></ea-date-picker>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-date-picker placeholder="选择日期" align="center"></ea-date-picker>
</div>
```

:::

## 选择器类型

通过 `type` 属性可以设置选择器的类型，支持三种模式：

### 日期选择（type="date"，默认）

完整的日期选择流程，选择年份后进入月份选择，选择月份后进入日期选择。

<div class="demo">
    <ea-date-picker type="date" placeholder="选择日期"></ea-date-picker>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-date-picker type="date" placeholder="选择日期"></ea-date-picker>
</div>
```

:::

### 月份选择（type="month"）

仅选择年份和月份，选择后保持月份面板，返回年月信息。

<div class="demo">
    <ea-date-picker type="month" placeholder="选择月份" display-format="YYYY年MM月" value-format="YYYY-MM"></ea-date-picker>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-date-picker
    type="month"
    placeholder="选择月份"
    display-format="YYYY年MM月"
    value-format="YYYY-MM"
  >
  </ea-date-picker>
</div>
```

`js`: `change` 事件

```js
document.querySelector("ea-date-picker").addEventListener("change", e => {
  console.log(e.detail.fullDate); // "2024-01"
  console.log(e.detail.year); // 2024
  console.log(e.detail.month); // 1
  console.log(e.detail.date); // null
});
```

:::

### 年份选择（type="year"）

仅选择年份，选择后保持年份面板，返回年份信息。

<div class="demo">
    <ea-date-picker type="year" placeholder="选择年份" display-format="YYYY年" value-format="YYYY"></ea-date-picker>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-date-picker
    type="year"
    placeholder="选择年份"
    display-format="YYYY年"
    value-format="YYYY"
  >
  </ea-date-picker>
</div>
```

`js`: `change` 事件

```js
document.querySelector("ea-date-picker").addEventListener("change", e => {
  console.log(e.detail.fullDate); // "2024"
  console.log(e.detail.year); // 2024
  console.log(e.detail.month); // null
  console.log(e.detail.date); // null
});
```

:::

## 日期格式

通过 `display-format` 和 `value-format` 属性可以自定义日期格式。

<div class="demo">
    <ea-date-picker 
      placeholder="选择日期" 
      display-format="YYYY/MM/DD" 
      value-format="YYYY-MM-DD">
    </ea-date-picker>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-date-picker
    placeholder="选择日期"
    display-format="YYYY/MM/DD"
    value-format="YYYY-MM-DD"
  >
  </ea-date-picker>
</div>
```

`js`: `change` 事件

```js
document.querySelector("ea-date-picker").addEventListener("change", e => {
  // 根据 value-format 格式化
  console.log(e.detail.fullDate); // "2024-01-15"
});
```

:::

## Attributes

| 参数           | 说明                     | 类型    | 可选值            | 默认值     |
| -------------- | ------------------------ | ------- | ----------------- | ---------- |
| name           | 输入框的 name 属性       | string  | -                 | -          |
| value          | 初始值/当前值            | string  | -                 | -          |
| width          | 选择器宽度               | string  | -                 | 280px      |
| disabled       | 是否禁用                 | boolean | -                 | false      |
| align          | 对齐方式                 | string  | left/center/right | left       |
| placeholder    | 占位提示文本             | string  | -                 | -          |
| display-format | 输入框中显示的日期格式   | string  | 见下方格式说明    | YYYY-MM-DD |
| value-format   | change事件返回的日期格式 | string  | 见下方格式说明    | YYYY-MM-DD |
| type           | 选择器类型               | string  | date/month/year   | date       |

### 格式说明

使用 [dayjs 格式字符串](https://day.js.org/docs/en/display/format)：

| 格式 | 说明          | 示例  |
| ---- | ------------- | ----- |
| YYYY | 四位年份      | 2024  |
| MM   | 两位月份      | 01-12 |
| DD   | 两位日期      | 01-31 |
| HH   | 两位小时(24h) | 00-23 |
| mm   | 两位分钟      | 00-59 |
| ss   | 两位秒        | 00-59 |

**常用格式示例**：

- `YYYY-MM-DD` → 2024-01-15
- `YYYY/MM/DD` → 2024/01/15
- `DD/MM/YYYY` → 15/01/2024
- `MM-DD-YYYY` → 01-15-2024

## CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

| 名称          | 说明                                                                |
| ------------- | ------------------------------------------------------------------- |
| container     | 外层容器(包含 输入框容器`input-wrap`和 下拉菜单容器`dropdown-wrap`) |
| input-wrap    | 输入框容器(包含 `input`)                                            |
| input         | 输入框                                                              |
| dropdown-wrap | 下拉菜单容器(包含自定义Header、日历等)                              |
| custom-header | 自定义Header容器                                                    |
| header-year   | Header年份文本                                                      |
| header-month  | Header月份文本                                                      |
| calendar-body | 日历主体容器                                                        |
| calendar      | 日历组件                                                            |
| year-panel    | 年份选择面板                                                        |
| month-panel   | 月份选择面板                                                        |

## Events

| 事件名称 | 说明         | 回调参数                                |
| -------- | ------------ | --------------------------------------- |
| change   | 值改变时触发 | `{ year, month, date, week, fullDate }` |

## 注意事项

1. 点击输入框可以展开/收起日历下拉框
2. 点击日历外部区域会自动收起下拉框
3. 选择日期后会自动触发 `change` 事件并收起下拉框
4. **自定义Header交互**：
   - 点击年份文本进入年份选择模式
   - 点击月份文本进入月份选择模式
   - 在年份选择模式下，点击年份进入月份选择模式
   - 在月份选择模式下，点击月份返回日期视图
   - 年份选择模式下，左右箭头切换十年范围
   - 月份选择模式下，左右箭头切换年份

## 更新日志

### 2025-02-24

- 新增自定义Header容器，支持年份/月份快速选择
- 实现三种视图模式切换：日期视图、年份视图、月份视图
- 年份选择模式显示近10年列表，支持十年范围切换
- 月份选择模式显示12个月英文简写
- 优化交互体验，点击年份/月份文本可快速切换视图
- 新增响应式适配，支持移动端触摸操作
