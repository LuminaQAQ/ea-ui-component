---
trigger: glob
glob: docs/*.md
---

## 组件文档生成指南

根据提供的组件源代码（`.js` 文件）和示例文件（`.html` 文件）生成完整的组件文档。

### 文档结构要求

文档应遵循以下结构：

```markdown
# [组件名称] [中文描述]

[组件功能简介]

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/[组件名]/index.js";
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

移步到 [CSS Part](#[组件名小写]-css-part)。

## [示例标题 1]

[示例描述]

<div class="demo">
  [示例HTML代码]
</div>

::: details 查看代码

::: code-group

```html
[HTML代码]
```

```js
[JavaScript代码]
```

```css
[CSS代码]
```

:::

:::

## [示例标题 2]

...

## [组件名] API

### [组件名] Attributes

[属性表格]

### [组件名] CSS Part

[CSS Part 表格]

### [组件名] Slots

[插槽表格]

### [组件名] Methods

[方法表格]

### [组件名] Events

[事件表格]
```

### 示例处理规则

1. **示例结构**：
   - 示例标题使用 `##` 格式
   - 示例描述简要说明功能
   - 示例展示使用 `<div class="demo">` 包裹
   - 代码块使用 `::: details 查看代码` 包裹

2. **布局规范**：
   - 使用 `.slider-demo-block` 布局结构
   - 包含 `.demonstration` 标签用于说明
   - 参考 ea-slider.html 的示例布局

3. **代码分组**：
   - 使用 `::: code-group` 分组 HTML/CSS/JS 代码
   - 较长示例必须折叠

4. **与 HTML 文件对齐**：
   - 示例标题与 HTML 文件中的 `h1` 标签对应
   - 示例顺序与 `#region` 标记顺序一致
   - 示例代码与 `#region` 内的代码一致

5. **垂直模式示例**：
   - 使用 `.vertical-demo` 类名
   - 需要设置固定高度

### API部分生成规则

1. **Attributes 表格**：以 `.js` 文件中 `this.properties` 函数里的键名为准

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|

2. **CSS Part 表格**：

| 名称 | 说明 |
|------|------|

3. **Slots 表格**：

| 名称 | 说明 |
|------|------|

4. **Methods 表格**：

| 方法名 | 说明 | 参数 |
|--------|------|------|

5. **Events 表格**：

| 事件名 | 说明 | 回调参数(event.detail) |
|--------|------|------------------------|

### 特殊情况处理

1. **Props 标记**：对于需要通过 JavaScript 设置的属性（props），在表格中标记 `<PropTag />`

2. **无某个 API 部分**：如果组件没有 Methods 或 Slots，则不写该部分

3. **父子组件结构**：
   ```markdown
   ## Parent API
   ### Parent Attributes
   ...
   ## Child API
   ### Child Attributes
   ...
   ```
