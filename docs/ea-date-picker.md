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

## 自定义 Header 交互

日期选择器提供了自定义的 Header 交互功能，支持以下操作：

1. **基础日期视图**：显示年份和月份，点击年份进入年份选择模式，点击月份进入月份选择模式
2. **年份选择模式**：显示近10年的年份列表（如 2020~2029），点击年份进入月份选择模式
3. **月份选择模式**：显示12个月的英文简写（Jan, Feb...），点击月份返回日期视图

<div class="demo">
    <ea-date-picker placeholder="点击选择日期，体验自定义Header"></ea-date-picker>
</div>

::: details 查看代码

`html`

```html
<div class="demo">
  <ea-date-picker placeholder="点击选择日期"></ea-date-picker>
</div>
```

:::

## Attributes

| 参数        | 说明               | 类型    | 可选值            | 默认值 |
| ----------- | ------------------ | ------- | ----------------- | ------ |
| name        | 输入框的 name 属性 | string  | -                 | -      |
| value       | 初始值/当前值      | string  | -                 | -      |
| width       | 选择器宽度         | string  | -                 | 280px  |
| disabled    | 是否禁用           | boolean | -                 | false  |
| align       | 对齐方式           | string  | left/center/right | left   |
| placeholder | 占位提示文本       | string  | -                 | -      |

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
