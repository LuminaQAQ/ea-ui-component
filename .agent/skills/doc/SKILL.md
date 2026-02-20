---
name: DOC
description: 需要为某个组件编写文档时
---

## 组件文档生成指南

根据提供的组件源代码（`.js` 文件）和示例文件（`.html` 文件）生成完整的组件文档。

### 文档结构要求

文档应遵循以下结构：

````
# [组件名称] [中文描述]

[组件功能简介]

## 引入

`js`
```html
<script type="module">
  import "./node_modules/easy-component-ui/components/[组件名]/index.js";
</script>
````

> [css](file:///home/lumina/文档/ea-ui-doc/ea-ui-component/vite.config.js#L142-L153)

::: tip
需要注意的是, 如果需要使用到带有图标的 `属性/组件`, 需要提前使用 [link](file:///home/lumina/文档/ea-ui-doc/ea-ui-component/src/utils/setStyle.js#L1-L1) 标签引入图标文件
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## [示例标题 1]

[示例内容及代码]

## [示例标题 2]

[示例内容及代码]

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

[如果有子组件，则按如下格式]

## Parent API

### Parent Attributes

[父组件属性表格]

### Parent CSS Part

[父组件CSS Part表格]

### Parent Slots

[父组件插槽表格]

### Parent Methods

[父组件方法表格]

## Child API

### Child Attributes

[子组件属性表格]

### Child CSS Part

[子组件CSS Part表格]

### Child Slots

[子组件插槽表格]

### Child Methods

[子组件方法表格]

```

### 示例处理规则

1. 每个示例需包含：
   - 简略示例描述
   - HTML 示例代码
   - 对应的 HTML/JS/CSS 代码展示

2. 示例必须与 `.html` 文件中 `#region` 标记的内容和顺序完全对齐

3. 示例代码如果过长，使用以下格式：
```

::: details 查看代码
[代码内容]
:::

```

4. 如果示例代码包含多种语言，使用以下格式：
```

::: code-group

```lang
[代码内容]
```

```lang
[代码内容]
```

:::

```

### API部分生成规则

1. **组件的 Attributes&Props** 部分，以 `.js` 文件中 `this.properties` 函数里的键名、type、default 为准

2. **单组件 API 结构**：
   - ## Attributes（如果有属性）
   - ## CSS Part（如果有CSS Part）
   - ## Slots（如果有插槽）
   - ## Methods（如果有方法）

3. **父子组件 API 结构**：
   - ## Parent API
     - ### Parent Attributes
     - ### Parent CSS Part
     - ### Parent Slots
     - ### Parent Methods
   - ## Child API
     - ### Child Attributes
     - ### Child CSS Part
     - ### Child Slots
     - ### Child Methods

4. 如果某个部分不存在（如无 Methods），则不写该部分

5. **属性表格格式**：
   | 参数 | 说明 | 类型 | 可选值 | 默认值 |
   |------|------|------|--------|--------|

6. **CSS Part 表格格式**：
   | 名称 | 说明 |
   |------|------|

7. **Slots 表格格式**：
   | 名称 | 说明 |
   |------|------|

8. **Methods 表格格式**：
   | 方法名 | 说明 | 参数 |
   |--------|------|------|

### 特殊情况处理

1. 如果组件没有子组件，只需读取该组件相关的引入文件

2. 如果组件包含子组件，提供的 `.js` 文件通常是带有本组件和子组件的引入语句的文件，需要逐级逐个读取

3. 从 HTML 文件中提取所有被 `#region` 包围的示例代码，并与文档中的示例标题匹配

4. 注意提取示例中的 JavaScript 代码块和 CSS 样式块

5. 在 CSS Part 部分说明如何使用 `::part()` 伪类选择器

### 输出要求

- 所有内容使用 Markdown 格式编写
- 使用中文编写文档内容
- 保持代码语法高亮
- 合理使用折叠和分组展示代码
- 确保文档结构清晰、易于阅读

```