---
name: "DOC"
description: "Component documentation generation. Invoke when writing or updating component documentation including API tables, examples, and usage guides."
---

# 组件文档生成指南

根据组件源代码（`.ts` 文件）和示例文件（`.html` 文件）生成完整的组件文档。

## 文档结构

```markdown
# [组件名称] [中文描述]

[组件功能简介]

## 引入

> `js`

\```html
<script type="module">
  import "./node_modules/easy-component-ui/components/[组件名]/index.js";
</script>
\```

> `css`

::: tip
需要注意的是, 如果需要使用到带有图标的 `属性/组件`, 需要提前使用 `link` 标签引入图标文件
:::

\```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
\```

## 自定义样式

移步到 [CSS Part](#[组件名小写]-css-part)。

## [示例标题 1]

[示例描述]

<div class="demo">
  [示例HTML代码]
</div>

::: details 查看代码

::: code-group

\```html
[HTML代码]
\```

\```js
[JavaScript代码];
\```

\```css
[CSS代码]
\```

:::

:::

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

## 示例处理规则

### 示例与 HTML 文件对齐

示例必须与 `.html` 文件中 `#region` 标记的内容和顺序完全对齐：

1. **标题对齐**：文档中的示例标题应与 HTML 文件中的 `h1` 标签内容对应
2. **顺序对齐**：示例顺序必须与 HTML 文件中 `#region` 标记的顺序一致
3. **代码对齐**：示例代码应与 HTML 文件中对应 `#region` 内的代码一致

### Props 标记

对于需要通过 JavaScript 设置的属性，在表格中标记 `<PropTag />`：

```markdown
| marks <PropTag /> | 标记点 | Object | — | null |
```

### 代码风格

文档中的 JavaScript 代码使用对象模式组织：

```javascript
onMounted(() => {
  const example1 = {
    element: document.getElementById("elementId"),

    init() {
      this.element.addEventListener("change", this.onChange);
    },

    onChange: (e) => {
      console.log(e.detail.value);
    },
  };
  example1.init();
})
```

## API 生成规则

### Attributes 表格

以 `@attribute` 装饰器的定义为准：

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |

- 类型为 Boolean 且默认值为 false 的属性，可选值列写 `—`
- 类型为枚举值的属性，可选值列写出所有可选值
- Props 类型的属性需要标记 `<PropTag />`
- 属性名使用 camelCase

### CSS Part 表格

以模板中 `part="xxx"` 属性为准：

| 名称 | 说明 |
| ---- | ---- |

### Slots 表格

以模板中 `<slot name="xxx">` 为准，默认插槽名称为 `default`：

| 名称 | 说明 |
| ---- | ---- |

### Methods 表格

以类中公共方法为准（不含 `_` 前缀）：

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |

### Events 表格

以 `this.emit()` 调用和自定义事件类为准：

| 事件名 | 说明 | 回调参数(event.detail) |
| ------ | ---- | ---------------------- |

## 特殊情况

### 无某个 API 部分

如果组件没有 Methods 或 Slots，则不写该部分。

### 父子组件结构

```markdown
## Parent API

### Parent Attributes
...

## Child API

### Child Attributes
...
```
