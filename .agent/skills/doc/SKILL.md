---
name: DOC
description: 需要为某个组件编写文档时
---

# 组件文档生成指南

根据提供的组件源代码（`.js` 文件）和示例文件（`.html` 文件）生成完整的组件文档。

## 文档结构要求

文档应遵循以下结构：

````markdown
# [组件名称] [中文描述]

[组件功能简介]

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/[组件名]/index.js";
</script>
```
````

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
[JavaScript代码];
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

````

## 示例处理规则

### 1. 示例结构规范

每个示例必须包含以下部分：

1. **示例标题**：使用 `##` 标题格式
2. **示例描述**：简要说明示例功能
3. **示例展示**：使用 `<div class="demo">` 包裹实际展示代码
4. **代码块**：使用 `::: details 查看代码` 包裹代码

### 2. 布局规范

参考 `ea-slider.html` 的示例布局：

```html
<div class="demo">
  <div class="slider-demo-block">
    <span class="demonstration">示例说明文字</span>
    <ea-component [属性]></ea-component>
  </div>
</div>
````

对应的 CSS 样式：

```css
.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}
.slider-demo-block [组件名] {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  line-height: 44px;
  flex: 1 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
```

### 3. 代码折叠规范

- **简单示例**（单行代码）：可以不使用折叠
- **复杂示例**（多行代码）：必须使用 `::: details 查看代码` 包裹

### 4. 代码分组规范

使用 `::: code-group` 来分组不同语言的代码：

````markdown
::: details 查看代码

::: code-group

```html
<!-- HTML代码 -->
```
````

```js
// JavaScript代码
```

```css
/* CSS代码 */
```

:::

:::

````

### 5. 示例与 HTML 文件对齐规则

**关键要求**：示例必须与 `.html` 文件中 `#region` 标记的内容和顺序完全对齐。

1. **标题对齐**：文档中的示例标题应与 HTML 文件中的 `h1` 标签内容对应
2. **顺序对齐**：示例顺序必须与 HTML 文件中 `#region` 标记的顺序一致
3. **代码对齐**：示例代码应与 HTML 文件中对应 `#region` 内的代码一致

示例 HTML 文件结构：

```html
<!--  示例标题 -->
<!-- #region -->
<h1>示例标题</h1>

<div class="demo">
  <!-- 示例代码 -->
</div>

<script type="module">
  // JavaScript代码
</script>

<hr />
<!-- #endregion  -->
<!-- end  -->
````

### 6. Props 标记规范

对于需要通过 JavaScript 设置的属性（props），在表格中标记 `<PropTag />`：

```markdown
| marks <PropTag /> | 标记点 | Object | — | null |
| formatTooltip <PropTag /> | 自定义提示框内容格式 | Function | — | `value => value` |
```

## API部分生成规则

### 1. Attributes 表格

以 `.js` 文件中 `this.properties` 函数里的键名为准：

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |

**注意事项**：

- 类型为 Boolean 且默认值为 false 的属性，可选值列写 `—`
- 类型为枚举值的属性，可选值列写出所有可选值
- Props 类型的属性需要标记 `<PropTag />`

### 2. CSS Part 表格

| 名称 | 说明 |
| ---- | ---- |

**说明**：

- 列出所有在组件中定义的 `part` 属性
- 说明应简洁明了，描述该 part 对应的元素

### 3. Slots 表格

| 名称 | 说明 |
| ---- | ---- |

### 4. Methods 表格

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |

### 5. Events 表格

| 事件名 | 说明 | 回调参数(event.detail) |
| ------ | ---- | ---------------------- |

## 特殊情况处理

### 1. 无某个 API 部分

如果组件没有 Methods 或 Slots，则不写该部分。

### 2. 父子组件结构

如果组件包含子组件，按以下格式组织：

```markdown
## Parent API

### Parent Attributes

...

### Parent CSS Part

...

## Child API

### Child Attributes

...

### Child CSS Part

...
```

### 3. 垂直模式示例

垂直模式示例需要特殊的 CSS：

```css
.vertical-demo {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 300px;
}

.vertical-demo [组件名] {
  height: 200px;
}
```

---

## JavaScript 代码风格规范

### 示例代码组织方式

文档中的 JavaScript 代码应使用对象模式组织，与 HTML 测试文件保持一致：

```javascript
<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
  // 示例 1
  const example1 = {
    element: document.getElementById("elementId"),

    init() {
      // 初始化逻辑
      this.element.addEventListener("change", this.onChange);
    },

    onChange: (e) => {
      // 事件处理
      console.log(e.detail.value);
    },
  };
  example1.init();

  // 示例 2
  const example2 = {
    picker: document.getElementById("pickerId"),
    valueEl: document.getElementById("valueId"),

    onChange: (e) => {
      const { target } = e;
      this.valueEl.textContent = "Value: " + target.value;
    },

    init() {
      this.picker.addEventListener("change", this.onChange);
    },
  };
  example2.init();
})
</script>
```

### 代码风格要点

1. **使用 `document.getElementById`** 获取 DOM 元素，不使用 Vue 的 `ref`
2. **对象模式组织代码**：每个示例一个对象，包含 `init()` 方法
3. **箭头函数定义事件处理**：`onChange: (e) => { ... }`
4. **使用 `this` 访问对象属性**：在对象方法中使用 `this.element`
5. **调用 `init()` 初始化**：每个示例对象最后调用 `init()`

### HTML 属性使用

示例中的 HTML 应使用 `id` 属性，不使用 `ref`：

```html
<!-- 正确 -->
<ea-component id="myComponent"></ea-component>

<!-- 错误 -->
<ea-component ref="myComponent"></ea-component>
```

---

## API 表格更新规范

### Methods 表格

当组件添加公共方法时，需要更新 Methods 表格：

```markdown
### Component Methods

| 方法名      | 说明           | 参数          |
| ----------- | -------------- | ------------- |
| focus       | 使组件获取焦点 | —             |
| blur        | 使组件失去焦点 | —             |
| handleOpen  | 打开下拉面板   | —             |
| handleClose | 关闭下拉面板   | —             |
| setData     | 设置数据       | (data: Array) |
```

### Events 表格

当组件添加事件时，需要更新 Events 表格：

```markdown
### Component Events

| 事件名            | 说明             | 回调参数(event.detail)         |
| ----------------- | ---------------- | ------------------------------ |
| change            | 值改变时触发     | `{ value, label }`             |
| focus             | 获得焦点时触发   | —                              |
| blur              | 失去焦点时触发   | —                              |
| ea-visible-change | 可见性改变时触发 | `{ visible: boolean }`         |
| ea-panel-change   | 面板改变时触发   | `{ date: Date, mode: string }` |
```

**注意**：

- "ea-" 前缀的事件需要详细描述 event.detail 结构
- 普通事件（如 focus, blur）无 detail 时写 "—"
- 复杂对象类型需要注明属性类型

---

## 输出要求

- 所有内容使用 Markdown 格式编写
- 使用中文编写文档内容
- 保持代码语法高亮
- 合理使用折叠和分组展示代码
- 确保文档结构清晰、易于阅读
- **示例必须与 HTML 文件中的 `#region` 标记完全对齐**
- **JavaScript 代码风格必须与 HTML 测试文件保持一致**
