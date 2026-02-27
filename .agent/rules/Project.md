# ea-ui-component 项目开发规范

本项目是基于 Web Components 的组件库，开发时必须遵循以下规范。

## JavaScript 开发规范

### 组件结构规范

所有组件必须继承 `Base` 类（表单组件继承 `FormAssociatedBase`），使用 Shadow DOM 实现样式隔离：

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

- 继承 `Base` 类（表单组件继承 `FormAssociatedBase`）
- 私有属性使用 `#` 前缀
- 使用 Shadow DOM 实现样式隔离
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
  marks: {
    props: true,
    type: Object,
    default: null,
    observer: () => {
      this.#renderMarks();
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
  formatTooltip: {
    props: true,
    type: Function,
    rawFunction: true,
    default: value => value,
    observer: () => {
      this.#updateSlider();
    },
  },
});
```

**属性配置对象：**

- `type`: String | Number | Boolean | Array | Function | Object | 枚举数组 | 动态类型对象
- `default`: 静态值或函数（`rawFunction: true` 时使用 `() => value => value`）
- `props`: 是否从 props 对象读取
- `rawFunction`: 是否保持函数原始形式
- `observer`: 属性变化回调函数

### 函数命名规范

| 函数类型 | 前缀      | 示例                                      | 说明          |
| -------- | --------- | ----------------------------------------- | ------------- |
| 事件函数 | `#on`     | `#onClick`, `#onScroll`                   | 处理 DOM 事件 |
| 私有函数 | `#`       | `#handleDataUpdate`, `#handleStyleUpdate` | 组件内部使用  |
| 暴露函数 | 无        | `setData`, `show`, `hide`                 | 对外 API      |
| 生命周期 | `$`       | `$render`, `$beforeUnmounted`             | 生命周期钩子  |
| 渲染函数 | `#render` | `#renderStops`, `#renderMarkLabels`       | 渲染相关      |

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

### 多 AbortController 管理

```javascript
#AbortControllerStates = {
  /** @type {AbortController} */
  input: null,
};

// 在 observer 中使用
"show-input": {
  type: Boolean,
  default: false,
  observer: async newVal => {
    if (!this.#states.isInputNumberDefined) {
      await customElements.whenDefined("ea-input-number");
      this.#states.isInputNumberDefined = true;
    }

    this.#AbortControllerStates.input?.abort();

    if (newVal) {
      this.#AbortControllerStates.input = new AbortController();
      this.#input.addEventListener("ea-change", this.#onInputChange, {
        signal: this.#AbortControllerStates.input.signal,
      });
    }
  },
}

$beforeUnmounted() {
  this.#abortController?.abort();
  for (const key in this.#AbortControllerStates) {
    this.#AbortControllerStates[key]?.abort();
  }
}
```

### 事件绑定规范

使用 `AbortController` 管理事件监听器：

```javascript
#onClick = (e) => {
  const target = e.target.closest("ea-item");
  if (!target || target?.hasAttribute("disabled")) return;
  this.active = target.getAttribute("name");
};

#bindEvents = () => {
  this.#abortController?.abort();
  this.#abortController = new AbortController();

  // 组件内部事件
  this.#rail.addEventListener("mousedown", this.#onMouseDown, {
    signal: this.#abortController.signal,
  });

  // 全局事件（用于拖拽时鼠标移出组件）
  document.addEventListener("mousemove", this.#onMouseMove, {
    signal: this.#abortController.signal,
  });
  document.addEventListener("mouseup", this.#onMouseUp, {
    signal: this.#abortController.signal,
  });
};

connectedCallback() {
  super.connectedCallback();
  this.#abortController?.abort();
  this.#abortController = new AbortController();

  this.#container.addEventListener("click", this.#onClick, {
    signal: this.#abortController.signal,
  });
}
```

### 拖拽交互规范

```javascript
#states = {
  isDragging: false,
  startX: 0,
  startY: 0,
};

#onMouseDown = e => {
  if (this.disabled) return;
  e.preventDefault();
  e.stopPropagation();
  this.#states.isDragging = true;
  // ...
};

#onMouseMove = e => {
  if (!this.#states.isDragging || this.disabled) return;
  e.preventDefault();
  e.stopPropagation();
  // ...
};

#onMouseUp = () => {
  if (!this.#states.isDragging) return;
  this.#states.isDragging = false;
  // ...
};
```

### 子组件集成规范

```javascript
// 等待子组件定义
"show-input": {
  type: Boolean,
  default: false,
  observer: async newVal => {
    if (!this.#states.isInputNumberDefined) {
      await customElements.whenDefined("ea-input-number");
      this.#states.isInputNumberDefined = true;
    }
    // ...
  },
}

// 子组件事件处理
#onInputChange = e => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const newValue = parseFloat(e.detail.currentValue);
  // ...
};
```

### 事件派发规范

#### 事件命名规则

- **非 "ea-" 前缀事件**：使用 `this.emit` 方法派发，如 `change`, `focus`, `blur`
- **"ea-" 前缀事件**：创建专用事件类，使用 `dispatchEvent` 派发

#### 普通事件派发（this.emit）

```javascript
// 简单事件，无 detail
this.emit("focus");
this.emit("blur");

// 带 detail 的事件
this.emit("change", {
  detail: {
    value: newVal,
    label: item.label,
  },
});
```

#### "ea-" 前缀事件派发（事件类）

- 注意此类事件声明是 typescript 的，同时需要在 `GlobalEventHandlersEventMap` 中声明

```typescript
/**
 * 组件 Foo 事件
 * @event EaComponentFooEvent
 * @property {boolean} visible - 当前 Foo 状态
 */
export class EaComponentFooEvent extends Event {
  readonly detail: EaComponentFooEventDetail;

  constructor(detail: EaComponentFooEventDetail) {
    super("ea-foo-change", {
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.detail = detail;
  }
}

interface EaComponentFooEventDetail {
  /** @description 当前 Foo 状态 */
  visible: boolean;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-foo-change": EaComponentFooEvent;
  }
}
```

```javascript
// 2. 在组件中导入并使用
import { EaComponentFooEvent } from "./events/EaComponentFooEvent";

// 3. 派发事件
this.dispatchEvent(new EaComponentFooEvent({ visible: true }));
```

### 公共方法规范

#### 方法定义位置

公共方法定义在类的主体中，生命周期方法之后：

```javascript
export class EaComponent extends Base {
  // ... 私有方法和属性

  connectedCallback() {
    super.connectedCallback();
    // ...
  }

  $beforeUnmounted() {
    // ...
  }

  /**
   * 使组件获取焦点
   * @return {void}
   */
  focus = () => {
    this.#inputElement.focus();
  };

  /**
   * 打开下拉面板
   * @return {void}
   */
  handleOpen = () => {
    this.#openDropdown();
  };

  /**
   * 设置数据
   * @param {Array} data - 数据数组
   * @return {void}
   */
  setData = data => {
    this.#renderData(data);
  };
}
```

#### 方法命名规范

- **动词开头**：`focus`, `blur`, `handleOpen`, `handleClose`
- **驼峰命名**：`setData`, `getValue`, `updatePosition`
- **异步方法**：可添加 `async` 前缀或返回 Promise

### 样式更新规范

使用 `updateContainerClasslist()` 更新类名：

```javascript
updateContainerClasslist() {
  const className = this.computedClasslist(
    "ea-component",
    {
      ["--" + this.type]: this.type,
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
$ea-component-size-types: (small, default, large);

:host {
  --#{$name}-height: 6px;
  --#{$name}-height-small: 4px;
  --#{$name}-height-large: 8px;
  --#{$name}-rail-bg-color: var(--grey-200);
  --#{$name}-transition: var(--transition-fast);
}

:host {
  display: inline-block;
  width: 100%;
}

:host([disabled]) {
  cursor: not-allowed;
}

@include block($name) {
  display: inline-flex;
  align-items: center;

  @include element(item) {
    padding: var(--#{$name}-padding);
  }

  @include modifier(large) {
    --#{$name}-height: var(--#{$name}-height-large);
  }

  @include state(active) {
    background-color: var(--primary-color);

    // 在 state 内部使用完整选择器
    .#{$name}__content {
      color: var(--color-white);
    }
  }

  @include state(vertical) {
    flex-direction: column;

    .#{$name}__runway {
      height: 100%;
      width: auto;
    }
  }
}
```

### BEM 命名规范

- 使用 `@include block($name)` 定义组件块
- 使用 `@include element(element-name)` 定义元素
- 使用 `@include modifier(modifier-name)` 定义修饰符
- 使用 `@include state(state-name)` 定义状态
- **仅在 `@include block($name)` 内部使用 elements、modifiers 和 states 的 mixin 函数**
- **在 `@include element()`、`@include modifier()` 和 `@include state()` 内部使用完整 CSS 选择器而非 mixin**

### 子组件样式覆盖

使用 `::part` 选择器修改子组件样式：

```scss
@include block($name) {
  @include element(trigger) {
    &::part(original) {
      display: none;
    }

    &::part(content) {
      background-color: var(--grey-800);
    }
  }

  @include state(show-tooltip) {
    .#{$name}__trigger::part(original) {
      display: block;
    }
  }
}
```

### 设计变量使用原则

1. **优先使用变量**：若在 `src/themes/variables.scss` 中存在的颜色、尺寸、间距等值，必须使用其对应的 CSS 变量
   - 使用 `var(--blue-500)` 而不是硬编码 `#409eff`
   - 使用 `var(--spacing-md)` 而不是硬编码 `8px`
   - 使用 `var(--font-size-lg)` 而不是硬编码 `16px`

2. **变量命名规范**：自定义变量必须以 `--#{$name}-` 开头，后跟有意义的描述性名称

3. **尺寸变体变量**：

   ```scss
   :host {
     --#{$name}-height: 6px;
     --#{$name}-height-small: 4px;
     --#{$name}-height-large: 8px;
   }

   @include modifier(small) {
     --#{$name}-height: var(--#{$name}-height-small);
   }
   ```

### 注意事项

- 任何可能被用户自定义的样式属性都应提供 CSS 变量接口
- 使用 `part` 属性暴露样式钩子，允许外部样式覆盖
- 保持样式模块化，每个组件独立
- 考虑颜色对比度、焦点状态等无障碍访问需求
- 使用 `pointer-events: none` 控制元素交互行为

## 文档生成规范

### 文档结构

````markdown
# [组件名称] [中文描述]

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

### API 部分生成规则

1. **组件的 Attributes&Props** 部分，以 `.js` 文件中 `this.properties` 函数里的键名、type、default 为准

2. **单组件 API 结构**：
   - ## Attributes（如果有属性）
   - ## CSS Part（如果有CSS Part）
   - ## Slots（如果有插槽）
   - ## Methods（如果有方法）
   - ## Events（如果有事件）

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

5. **Props 标记**：对于需要通过 JavaScript 设置的属性（props），在表格中标记 `<PropTag />`

### 表格格式

**属性表格：**
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|

**CSS Part 表格：**
| 名称 | 说明 |
|------|------|

**Slots 表格：**
| 名称 | 说明 |
|------|------|

**Methods 表格：**
| 方法名 | 说明 | 参数 |
|--------|------|------|

**Event 表格：**
| 事件名 | 说明 | 回调参数(event.detail) |
|--------|------|------------------------|

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
```
