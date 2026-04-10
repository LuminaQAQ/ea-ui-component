---
name: DOC
description: 需要为某个组件编写文档时
---

# 组件文档生成指南

根据提供的组件源代码（`.ts` 文件）和示例文件（`.html` 文件）生成完整的组件文档。

## 文档结构要求

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
```

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
```

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

```markdown
::: details 查看代码

::: code-group

```html
<!-- HTML代码 -->
```

```js
// JavaScript代码
```

```css
/* CSS代码 */
```

:::

:::
```

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
```

### 6. Props 标记规范

对于需要通过 JavaScript 设置的属性（props），在表格中标记 `<PropTag />`：

```markdown
| marks <PropTag /> | 标记点 | Object | — | null |
| formatTooltip <PropTag /> | 自定义提示框内容格式 | Function | — | `value => value` |
```

---

## API部分生成规则

### 1. Attributes 表格

以 `.ts` 文件中 `@attribute` 装饰器的定义为准：

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |

**注意事项**：

- 类型为 Boolean 且默认值为 false 的属性，可选值列写 `—`
- 类型为枚举值的属性，可选值列写出所有可选值
- Props 类型的属性需要标记 `<PropTag />`
- 属性名使用 camelCase（如 `closeText` 对应 HTML 中的 `close-text`）

**示例**：

```typescript
// TypeScript 源码
@attribute({
  type: String,
  default: "",
  observer(this: EaAlert, newVal: string) {
    this._alertHeading.innerHTML = html(newVal);
  },
})
heading: string = "";

@attribute({
  type: Boolean,
  default: true,
})
closable: boolean = true;

@attribute({
  type: ["primary", "success", "warning", "error", "info"] as const,
  default: "info",
})
type: string = "info";
```

```markdown
<!-- 文档表格 -->
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |
| heading | 标题 | String | — | '' |
| closable | 是否可关闭 | Boolean | — | true |
| type | 主题类型 | String | primary/success/warning/error/info | info |
```

### 2. CSS Part 表格

| 名称 | 说明 |
| ---- | ---- |

**说明**：

- 列出所有在组件模板中定义的 `part` 属性
- 说明应简洁明了，描述该 part 对应的元素

**示例**：

```typescript
// TypeScript 模板
html(): string {
  return `
    <div class='ea-alert' part='container'>
      <span class="ea-alert__icon-wrap" part='icon-wrap'>
        <slot name='icon'></slot>
      </span>
      <div class="ea-alert__content" part='content-wrap'>
        ...
      </div>
    </div>
  `;
}
```

```markdown
<!-- 文档表格 -->
| 名称 | 说明 |
| ---- | ---- |
| container | 容器元素 |
| icon-wrap | 图标包裹元素 |
| content-wrap | 内容包裹元素 |
```

### 3. Slots 表格

| 名称 | 说明 |
| ---- | ---- |

**说明**：

- 列出所有在组件模板中定义的 `<slot>` 元素
- 默认插槽（无 name 属性）名称为 `default`

**示例**：

```typescript
// TypeScript 模板
html(): string {
  return `
    <div class='ea-alert'>
      <slot name='icon'></slot>
      <slot name='heading'></slot>
      <slot></slot>
    </div>
  `;
}
```

```markdown
<!-- 文档表格 -->
| 名称 | 说明 |
| ---- | ---- |
| default | 默认插槽，用于描述内容 |
| icon | 自定义图标 |
| heading | 自定义标题 |
```

### 4. Methods 表格

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |

**说明**：

- 列出类中所有公共方法（不含 `_` 前缀的方法）
- 包括继承自 EaBase 的方法（如 `emit`）如果组件有特殊用法

**示例**：

```typescript
// TypeScript 源码
export class EaComponent extends EaBase {
  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    // ...
  }

  /**
   * 设置数据
   * @param data - 数据数组
   */
  setData(data: any[]): void {
    // ...
  }

  // 私有方法不列入文档
  private _handleClick() {}
}
```

```markdown
<!-- 文档表格 -->
| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| updateContainerClasslist | 更新容器类名 | — |
| setData | 设置数据 | (data: Array) |
```

### 5. Events 表格

| 事件名 | 说明 | 回调参数(event.detail) |
| ------ | ---- | ---------------------- |

**说明**：

- 列出所有 `this.emit()` 调用的事件
- 列出所有自定义事件类（如 `EaComponentChangeEvent`）
- "ea-" 前缀的事件需要详细描述 event.detail 结构

**示例**：

```typescript
// TypeScript 源码
// 普通事件
this.emit("close", { detail: { visible: false } });
this.emit("open");

// 自定义事件类
this.dispatchEvent(new EaAlertCloseEvent({ visible: false }));
```

```markdown
<!-- 文档表格 -->
| 事件名 | 说明 | 回调参数(event.detail) |
| ------ | ---- | ---------------------- |
| close | 关闭时触发 | `{ visible: false }` |
| open | 显示时触发 | — |
| ea-close | 关闭动画开始时触发（自定义事件类） | `{ visible: boolean }` |
```

---

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

## 类型声明文档

如果组件包含 `types.d.ts` 文件，应在文档中说明类型支持：

```markdown
## 类型支持

### HTML

组件支持 `HTMLElementTagNameMap` 扩展：

```typescript
const alert = document.createElement('ea-alert');
alert.type = 'success'; // 类型安全
```

### Vue

组件支持 Vue 全局组件类型：

```typescript
// 在模板中使用时有类型提示
<ea-alert :heading="'标题'" @close="handleClose" />
```

### React

组件支持 JSX 类型：

```typescript
// 在 JSX 中使用时有类型检查
<ea-alert heading="标题" type="success" />
```
```

---

## 输出要求

- 所有内容使用 Markdown 格式编写
- 使用中文编写文档内容
- 保持代码语法高亮
- 合理使用折叠和分组展示代码
- 确保文档结构清晰、易于阅读
- **示例必须与 HTML 文件中的 `#region` 标记完全对齐**
- **JavaScript 代码风格必须与 HTML 测试文件保持一致**
- **API 表格必须从 `@attribute` 装饰器和模板中提取**
