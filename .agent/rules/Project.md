# ea-ui-component 项目开发规范

本项目是基于 Web Components 的组件库，开发时必须遵循以下规范。

## JavaScript 开发规范

### 组件结构规范

所有组件必须继承 `Base` 类，使用 Shadow DOM 实现样式隔离：

```javascript
import { namespace } from "@/directives/namespace";
import Base from "@components/Base.js";
import stylesheet from "./index.scss?inline";

export class EaComponent extends Base {
  #container;
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  constructor() {
    super();
    this.stylesheet = stylesheet;
    this.$render();
  }

  $render() {
    const ns = namespace("component");
    this.ns = ns;
    this.shadowRoot.innerHTML = this.html(`
      <div class='${ns.b("component")}' part='container'>
        <slot></slot>
      </div>
    `);
    this.#container = this.shadowRoot.querySelector(ns.cb("component"));
  }

  connectedCallback() {
    super.connectedCallback();
    this.#abortController?.abort();
    this.#abortController = new AbortController();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!customElements.get("ea-component")) {
  customElements.define("ea-component", EaComponent);
}
```

**核心要点：**

- 私有属性使用 `#` 前缀
- 使用 `namespace()` 生成 BEM 命名空间
- 样式导入使用 `?inline` 后缀
- 文件末尾注册自定义元素

### 属性定义规范

使用 `this.properties()` 定义属性，分为三类：

1. **state**：组件内部状态属性，从 HTML 属性读取
2. **propStates**：组件外部传入属性，从 `props` 对象读取
3. **funcStates**：函数类型属性，保持函数原始形式

```javascript
state = this.properties({
  disabled: {
    type: Boolean,
    default: false,
    observer: newVal => {
      this.updateContainerClasslist();
    },
  },
  size: {
    type: ["", "small", "medium", "large"],
    default: "",
    observer: newVal => {
      this.updateContainerClasslist();
    },
  },
});

propStates = this.properties({
  data: {
    props: true,
    type: Array,
    default: [],
    observer: newVal => {
      this.#handleDataUpdate(newVal);
    },
  },
});

funcStates = this.properties({
  selectable: {
    props: true,
    type: Function,
    rawFunction: true,
    default: null,
  },
});
```

**属性配置对象：**

- `type`: String | Number | Boolean | Array | Function | Object | 枚举数组 | 动态类型对象
- `default`: 静态值或函数
- `props`: 是否从 props 对象读取
- `rawFunction`: 是否保持函数原始形式
- `observer`: 属性变化回调函数

### 函数命名规范

| 函数类型 | 前缀  | 示例                                      | 说明          |
| -------- | ----- | ----------------------------------------- | ------------- |
| 事件函数 | `#on` | `#onClick`, `#onScroll`                   | 处理 DOM 事件 |
| 私有函数 | `#`   | `#handleDataUpdate`, `#handleStyleUpdate` | 组件内部使用  |
| 暴露函数 | 无    | `setData`, `show`, `hide`                 | 对外 API      |
| 生命周期 | `$`   | `$render`, `$beforeUnmounted`             | 生命周期钩子  |

### 生命周期管理

```javascript
connectedCallback() {
  super.connectedCallback();
  this.#abortController?.abort();
  this.#abortController = new AbortController();
  this.#bindEvents();
}

$beforeUnmounted() {
  this.#abortController?.abort();
  this.#resizeObserver?.unobserve();
  this.#mutationObserver?.disconnect();
}
```

### 事件绑定规范

使用 `AbortController` 管理事件监听器：

```javascript
connectedCallback() {
  super.connectedCallback();
  this.#abortController?.abort();
  this.#abortController = new AbortController();

  this.#container.addEventListener("click", this.#onClick, {
    signal: this.#abortController.signal,
  });
}

#onClick = (e) => {
  const target = e.target.closest("ea-item");
  if (!target || target?.hasAttribute("disabled")) return;
  this.active = target.getAttribute("name");
};
```

### 样式更新规范

使用 `updateContainerClasslist()` 更新类名：

```javascript
updateContainerClasslist() {
  const className = this.computedClasslist(
    "ea-component",
    {
      ["--" + this.type]: this.type,
      ["--" + this.size]: this.size,
    },
    {
      disabled: this.disabled,
      active: this.active,
    }
  );
  this.#container.className = className;
}
```

### 数据处理规范

使用 `WeakMap` 管理数据与 DOM 节点的映射：

```javascript
#states = {
  dataSource: new WeakMap(),
  dataIndex: new WeakMap(),
};

setData = (data) => {
  data.forEach((item, i) => {
    const trNode = this.#createRowNode(item, i);
    this.#states.dataSource.set(trNode, item);
    this.#states.dataIndex.set(item, trNode);
  });
};
```

### 性能优化规范

1. 使用 `AbortController` 管理事件和异步操作
2. 使用防抖和节流优化频繁操作
3. 使用 `DocumentFragment` 批量 DOM 操作
4. 在 `$beforeUnmounted` 中清理所有资源

### 错误处理规范

```javascript
#handleDataUpdate = async (newData) => {
  try {
    await this.#validateData(newData);
    this.#renderData(newData);
  } catch (error) {
    console.error("Failed to update data:", error);
    this.emit("error", { detail: { error, data: newData } });
  }
};
```

## CSS 开发规范

### 样式文件结构

```scss
$name: ea-component-name;

:host {
  --#{$name}-text-color: var(--grey-700);
  --#{$name}-font-size: var(--font-size-md);
}

@include block($name) {
  font-size: var(--#{$name}-font-size);

  @include element(item) {
    padding: var(--#{$name}-padding);
  }

  @include modifier(large) {
    font-size: var(--#{$name}-font-size-large);
  }

  @include state(active) {
    background-color: var(--primary-color);
  }
}
```

### BEM 命名规范

- 使用 `@include block($name)` 定义组件块
- 使用 `@include element(element-name)` 定义元素
- 使用 `@include modifier(modifier-name)` 定义修饰符
- 使用 `@include state(state-name)` 定义状态
- **仅在 `@include block($name)` 内部使用 elements、modifiers 和 states 的 mixin 函数**

### 设计变量使用原则

1. **优先使用变量**：若在 `src/themes/variables.scss` 中存在的颜色、尺寸、间距等值，必须使用其对应的 CSS 变量
   - 使用 `var(--blue-500)` 而不是硬编码 `#409eff`
   - 使用 `var(--spacing-md)` 而不是硬编码 `8px`
   - 使用 `var(--font-size-lg)` 而不是硬编码 `16px`

2. **变量命名规范**：自定义变量必须以 `--#{$name}-` 开头，后跟有意义的描述性名称

### 注意事项

- 任何可能被用户自定义的样式属性都应提供 CSS 变量接口
- 使用 `part` 属性暴露样式钩子，允许外部样式覆盖
- 保持样式模块化，每个组件独立
- 考虑颜色对比度、焦点状态等无障碍访问需求

## 文档生成规范

### 文档结构

```
# [组件名称] [中文描述]

## 引入

[引入代码]

## [示例标题 1]

[示例内容及代码]

## [组件名] API

### [组件名] Attributes

[属性表格]

### [组件名] CSS Part

[CSS Part 表格]

### [组件名] Slots

[插槽表格]

### [组件名] Methods

[方法表格]
```

### API 部分生成规则

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
     - ### Parent Events
   - ## Child API
     - ### Child Attributes
     - ### Child CSS Part
     - ### Child Slots
     - ### Child Methods
     - ### Child Events

4. 如果某个部分不存在（如无 Methods），则不写该部分

### 表格格式

**属性表格：**
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|

**CSS Part 表格：**
| 名称 | 说明 |
|------|------|

**Slots 表格：**
| 名称 | 说明 |
|-|-|

**Methods 表格：**
| 方法名 | 说明 | 参数 |
|-|-|-|

**Event 表格：**
| 事件名 | 说明 | 回调参数(event.detail) |
|-|-|-|

### 示例处理规则

1. 每个示例需包含简略示例描述和 HTML 示例代码
2. 示例必须与 `.html` 文件中 `#region` 标记的内容和顺序完全对齐
3. 如果示例代码带有多个语言版本（如 HTML、JavaScript、CSS），每个版本都需要单独的代码块。格式为vitepress的代码组格式：
   ```markdown
   ::: code-group
   [代码内容]
   :::
   ```
4. 示例代码如果过长，使用折叠格式：
   ```markdown
   ::: details 查看代码
   [代码内容]
   :::
   ```

## 通用规范

### 代码风格

- 除函数的 jsdoc 注释外不添加任何注释（除非用户明确要求）
- 保持代码简洁、清晰
- 遵循现有的代码风格和命名约定

### 文件操作

- 优先编辑现有文件，而不是创建新文件
- 不要主动创建文档文件（\*.md）或 README 文件，除非用户明确要求

### 开发流程

1. 使用 `TodoWrite` 工具规划和跟踪任务
2. 使用 `SearchCodebase` 工具搜索和理解代码库
3. 遵循项目现有的库和框架
4. 遵循安全最佳实践，不暴露或记录密钥和机密信息
