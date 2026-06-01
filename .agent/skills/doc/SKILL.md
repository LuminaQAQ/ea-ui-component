---
name: "DOC"
description: "Component documentation generation. Invoke when writing or updating component documentation including API tables, examples, and usage guides."
---

# 组件文档生成指南

根据组件源代码（`.ts` 文件）和示例文件（`.html` 文件）生成完整的组件文档。

## 文档结构

````markdown
<script setup>
import { onMounted } from 'vue'
import PropTag from './components/PropTag.vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
  const example1 = {
    element: document.querySelector("#elementId"),

    init() {
      if (!this.element) return;
      this.element.addEventListener("change", (e) => {
        console.log(e.detail.value);
      });
    },
  };
  example1.init();
})
</script>

# [组件名称] [中文描述]

[组件功能简介]

## 引入

::: code-group

```html [原生引入]

<script type="module">
  import "./node_modules/easy-component-ui/dist/components/[组件名].js";
</script>

```

```js [Vite]
import "easy-component-ui/[组件名]";
```

:::

## 自定义样式

移步到 [CSS Part](#[PascalCase组件名]-css-part) 和 [CSS Custom Properties](#[PascalCase组件名]-css-custom-properties)。

## [示例标题 1]

[示例描述]

<div class="demo">
  <div class="row">
    [示例HTML代码]
  </div>
</div>

::: details 查看代码

```html
[HTML代码]
```

:::

## [PascalCase组件名] API

### [PascalCase组件名] Attributes

[属性表格]

### [PascalCase组件名] Properties

> Properties 为纯 JavaScript 属性，不映射到 HTML attribute，需通过 JS 访问。

[Properties 表格]

### [PascalCase组件名] CSS Part

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

[CSS Part 表格]

### [PascalCase组件名] Slots

[插槽表格]

### [PascalCase组件名] Methods

[方法表格]

### [PascalCase组件名] Events

[事件表格]

### [PascalCase组件名] CSS Custom Properties

[CSS Custom Properties 表格或代码块]
````

## `<script setup>` 规范

### 基本结构

文档中的 `<script setup>` 块用于导入组件库和编写示例交互逻辑：

```html
<script setup>
import { onMounted } from 'vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"

onMounted(() => {
  // 示例交互逻辑
})
</script>
```

### 组件库导入

| 导入方式 | 说明 | 使用场景 |
|----------|------|----------|
| `import "../dist/components/index.js"` | 全量导入 | 大多数文档使用 |
| `import "../dist/components/ea-xxx.js"` | 按需导入 | 仅需特定组件时 |
| `import "../dist/assets/icon.css"` | 图标样式 | 使用了 ea-icon 的文档 |

### PropTag 组件导入

当 API 表格中使用了 `<PropTag />` 标记 `@property` 属性时，**必须**在 `<script setup>` 中导入 PropTag：

```html
<script setup>
import { onMounted } from 'vue'
import PropTag from './components/PropTag.vue'
import "../dist/components/index.js"
import "../dist/assets/icon.css"
</script>
```

**PropTag 导入规则：**
- 使用 `<PropTag />` 的文档**必须**添加 `import PropTag from './components/PropTag.vue'`
- PropTag 导入位于 `import { onMounted } from 'vue'` 之后、组件库导入之前
- 未使用 `<PropTag />` 的文档不需要导入

### DOM 操作 null 检查

`onMounted` 中通过 `document.querySelector` 获取的 DOM 元素可能为 null（VitePress 客户端路由/HMR 时序问题），**必须**在调用方法前进行 null 检查：

```javascript
// ✅ 正确：有 null 检查
const example = {
  element: document.querySelector("#elementId"),

  init() {
    if (!this.element) return;
    this.element.addEventListener("change", (e) => {
      console.log(e.detail.value);
    });
  },
};
example.init();

// ❌ 错误：无 null 检查，可能导致 TypeError
const example = {
  element: document.querySelector("#elementId"),

  init() {
    this.element.addEventListener("change", (e) => {
      console.log(e.detail.value);
    });
  },
};
example.init();
```

### 代码风格

文档中的 JavaScript 代码使用对象模式组织：

```javascript
onMounted(() => {
  const example1 = {
    element: document.querySelector("#elementId"),

    init() {
      if (!this.element) return;
      this.element.addEventListener("change", this.onChange);
    },

    onChange: e => {
      console.log(e.detail.value);
    },
  };
  example1.init();
});
```

## 引入路径规范

引入部分使用 `::: code-group` 展示两种引入方式，**不使用** `> \`js\`` 提示行。

### 原生 HTML 环境

组件引入路径以 `./node_modules/easy-component-ui/` 为起始目录，指向 `dist/components/` 下的文件：

```html
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/ea-button.js";
</script>
```

全量引入：

```html
<script type="module">
  import "./node_modules/easy-component-ui/dist/components/index.js";
</script>
```

### Vite / 构建工具环境

通过包名子路径引入，利用 `package.json` 中的 `exports` 字段解析：

```js
import "easy-component-ui/ea-button";
```

全量引入：

```js
import "easy-component-ui";
```

### 图标资源

ea-icon 组件已内置 Font Awesome 样式注入机制，无需手动引入图标 CSS 文件。组件在挂载时会自动将图标样式注入到文档和 Shadow DOM 中。

## 代码展示规范

### VitePress 容器语法使用规则

**`::: code-group` 仅在存在多种语言代码块时使用**（如同时有 HTML + CSS + JS）。当只有单一 HTML 代码块时，**禁止使用** `::: code-group`，否则会导致 `:::` 在页面中显示为明文。

#### 单一代码块（仅 HTML）

当示例只有 HTML 代码时，使用 `::: details` 直接包裹代码块：

````markdown
::: details 查看代码

```html
<ea-button>点击</ea-button>
```

:::
````

#### 多种代码块（HTML + CSS + JS）

当示例同时包含 HTML、CSS、JavaScript 等多种代码时，使用 `:::: details` + `::: code-group` 嵌套。**外层 `details` 必须使用 `::::`（4 个冒号）**，以区分内层 `::: code-group` 的 `:::`（3 个冒号）：

````markdown
:::: details 查看代码

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

::::
````

**关键规则：**

- `::: code-group` 内必须包含 **两个及以上** 不同语言的代码块
- 嵌套时，外层 `:::: details` 使用 4 个冒号，内层 `::: code-group` 使用 3 个冒号
- 关闭顺序：先 `:::` 关闭内层 `code-group`，再 `::::` 关闭外层 `details`
- 单一 HTML 代码块直接放在 `::: details` 内，不嵌套 `::: code-group`

## 示例布局规范

### 布局容器层级

示例区域采用**外层 `demo` + 内层布局类**的两层结构：

```html
<div class="demo">
  <div class="row">
    <ea-button>按钮1</ea-button>
    <ea-button>按钮2</ea-button>
  </div>
</div>
```

**禁止嵌套 `demo` 类**，避免双层边框视觉问题：

```html
<!-- ❌ 错误：嵌套 demo 导致双层边框 -->
<div class="demo">
  <div class="demo">
    <ea-button>按钮</ea-button>
  </div>
</div>

<!-- ✅ 正确：外层 demo + 内层布局类 -->
<div class="demo">
  <div class="row is-not-demo">
    <ea-button>按钮</ea-button>
  </div>
</div>
```

### 布局类选择规则

| 场景 | 布局类 | 说明 |
|------|--------|------|
| 单个元素或自带良好内部结构的组件 | 无额外布局类 | 仅使用外层 `demo` |
| 多个元素水平排列 | `row` | Flex 水平布局，`space-around` 对齐 |
| 多个元素垂直排列 | `col` | Flex 垂直布局，居中对齐 |
| 多个元素左对齐水平排列 | `row left` | Flex 水平布局，`flex-start` 对齐 |
| 多个元素右对齐水平排列 | `row right` | Flex 水平布局，`flex-end` 对齐 |
| 多个元素居中水平排列 | `row center` | Flex 水平布局，`center` 对齐 |
| 多个元素顶部对齐水平排列 | `row flex-start` | Flex 水平布局，`align-items: flex-start` |
| 多个元素左对齐垂直排列 | `col left` | Flex 垂直布局，`align-items: flex-start` |
| 垂直居中对齐 | `align-center` | `display: flex; align-items: center` |
| 两端对齐 | `space-between` | `display: flex; justify-content: space-between` |

### `is-not-demo` 修饰类

当内层布局容器不需要边框和内边距时，添加 `is-not-demo` 修饰类：

- `.row.is-not-demo`：移除边框和内边距，保留 Flex 布局
- `.col.is-not-demo`：移除边框和内边距，保留 Flex 布局
- `.demo.is-not-demo`：移除边框和内边距

**使用原则**：外层 `demo` 提供边框容器，内层布局类通过 `is-not-demo` 移除多余的边框和内边距。

## 示例处理规则

### 示例与 HTML 文件对齐

示例必须与 `.html` 文件中 `#region` 标记的内容和顺序完全对齐：

1. **标题对齐**：文档中的示例标题应与 HTML 文件中的 `h1`/`h2` 标签内容对应
2. **顺序对齐**：示例顺序必须与 HTML 文件中 `#region` 标记的顺序一致
3. **代码对齐**：示例代码应与 HTML 文件中对应 `#region` 内的代码一致

### Props 标记

对于 `@property` 装饰器声明的属性（纯 JS 属性，不映射 HTML attribute），在 Properties 表格中标记 `<PropTag />`：

```markdown
| marks <PropTag /> | 标记点 | Object | — | null |
```

**注意**：使用 `<PropTag />` 时必须在 `<script setup>` 中导入 `import PropTag from './components/PropTag.vue'`。

## API 生成规则

### API 标题命名规范

API 部分的标题使用 **PascalCase 组件名**，不使用 `ea-` 前缀的 kebab-case 格式：

| 格式 | 示例 | 是否正确 |
|------|------|----------|
| PascalCase | `## Drawer API`、`### Drawer Attributes` | ✅ |
| kebab-case | `## ea-drawer API`、`### ea-drawer Attributes` | ❌ |

**组件名转换规则**：将 `ea-` 前缀的 kebab-case 转换为 PascalCase：

- `ea-drawer` → `Drawer`
- `ea-button-group` → `ButtonGroup`
- `ea-message-box` → `MessageBox`

**子组件命名**：子组件同样使用 PascalCase，如 `DrawerItem Attributes`、`ButtonGroup Attributes`。

### API 子标题顺序

API 部分的子标题按以下顺序排列，无内容的部分省略：

1. Attributes
2. Properties
3. CSS Part
4. Slots
5. Methods
6. Events
7. CSS Custom Properties

### CSS Custom Properties 标题规范

CSS 自定义属性部分的标题使用英文格式：

```markdown
### Drawer CSS Custom Properties
```

**禁止使用中文标题**（如 `### Drawer CSS 自定义属性`）。

### CSS Custom Properties 展示方式

CSS Custom Properties 支持两种展示方式，根据实际情况选择：

#### 方式一：表格形式（推荐）

适用于变量较多、需要详细说明的场景：

```markdown
### Drawer CSS Custom Properties

| 属性名 | 说明 | 默认值 |
| ------ | ---- | ------ |
| --ea-drawer-size | 抽屉尺寸 | 30% |
| --ea-drawer-padding | 抽屉内边距 | var(--spacing-lg) |
```

#### 方式二：CSS 代码块形式

适用于变量较少、需要展示完整 CSS 用法的场景：

````markdown
### Overlay CSS Variables

```css
ea-overlay {
  --ea-overlay-z-index: 3000;
  --ea-overlay-background-color: rgba(0, 0, 0, 0.4);
  --ea-overlay-content-width: 50%;
}
```
````

### Attributes 表格

以 `@attribute` 装饰器的定义为准：

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |

- 类型为 Boolean 且默认值为 false 的属性，可选值列写 `—`
- 类型为枚举值的属性，可选值列写出所有可选值
- 属性名使用 camelCase
- 仅包含 `@attribute` 装饰器声明的属性（映射 HTML attribute）

### Properties 表格

以 `@property` 装饰器的定义为准，仅当组件存在 `@property` 声明时才添加此部分：

> Properties 为纯 JavaScript 属性，不映射到 HTML attribute，需通过 JS 访问。

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |

- Properties 表格位于 Attributes 表格之后
- 类型为 Function 的属性，可选值列写 `—`
- 类型为 Array/Object 的属性，可选值列写 `—`
- 属性名使用 camelCase
- 不以下划线 `_` 开头的 `@property` 才列入表格（内部属性不列入）
- `@property` 属性在表格参数名后标记 `<PropTag />`

### CSS Part 表格

以模板中 `part="xxx"` 属性为准，表格前添加 MDN 引用：

> 用法可参考 [MDN ::part()伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

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

### CSS Custom Properties 表格

以 `:host` 中 `--#{$name}-` 前缀的 CSS 变量为准：

| 属性名 | 说明 | 默认值 |
| ------ | ---- | ------ |

## 自定义样式链接锚点

`## 自定义样式` 部分的链接锚点使用 PascalCase 组件名：

```markdown
移步到 [CSS Part](#Drawer-css-part) 和 [CSS Custom Properties](#Drawer-css-custom-properties)。
```

## 特殊情况

### 无某个 API 部分

如果组件没有 Methods、Events、Slots 或 Properties，则不写该部分。

### 父子组件结构

```markdown
## Parent API

### Parent Attributes

...

### Parent Properties

...

## Child API

### Child Attributes

...

### Child Properties

...
```

### 弹出层类组件

弹出层类组件（overlay、dialog、drawer）的示例区域通常不使用 `<div class="demo">` 包裹，而是直接使用 `<div class="row left">` 等布局类，因为弹出层组件的触发按钮不需要边框容器。

### VitePress 自定义元素配置

VitePress 中 `ea-` 前缀的标签会被 `isCustomElement` 配置识别为自定义元素。但非 `ea-` 前缀的 Vue 组件标签（如 `<PropTag />`）必须在 `<script setup>` 中导入，否则会触发 Vue 警告 `Failed to resolve component`。
