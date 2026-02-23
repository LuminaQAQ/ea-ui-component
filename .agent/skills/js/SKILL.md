---
name: JS
description: 在对 web componnents 组件相关的js按照要求来进行更新时
---

# JavaScript 开发规范

基于 ea-ui-component Web Components 组件库的开发特性制定的统一开发标准。

## 组件结构规范

### 目录结构

```
ea-component/
├── index.js                    # 组件主入口
├── index.scss                  # 组件主样式
├── components/                 # 子组件（可选）
│   └── sub-component/
│       ├── index.js
│       └── index.scss
└── events/                     # 自定义事件（可选）
    └── ComponentEvent.ts
```

### 主组件框架

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

  state = this.properties({
    disabled: {
      type: Boolean,
      default: false,
      observer: () => this.updateContainerClasslist(),
    },
  });

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
    this.#container = this.shadowRoot.querySelector(`.${ns.b("component")}`);
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

### 结构说明

1. **导入模块**：命名空间、基类、样式
2. **私有属性**：`#container` 容器、`#abortController` 事件管理
3. **observedAttributes**：继承父类属性
4. **state/propStates/funcStates**：使用 `this.properties()` 定义响应式属性
5. **constructor**：设置样式表并调用 `$render()`
6. **$render()**：创建 Shadow DOM 结构，使用 `namespace()` 生成 BEM 类名
7. **connectedCallback()**：初始化 AbortController
8. **$beforeUnmounted()**：清理事件监听
9. **注册组件**：文件末尾注册自定义元素

### 核心要点

- 继承 `Base` 类（表单组件继承 `FormAssociatedBase`）
- 私有属性使用 `#` 前缀
- 使用 Shadow DOM 实现样式隔离
- 使用 `namespace()` 生成 BEM 命名空间
- 样式导入使用 `?inline` 后缀
- 文件末尾注册自定义元素

---

## 属性更新方式

### 属性类型分类

1. **state**：组件内部状态属性，从 HTML 属性读取
2. **propStates**：组件外部传入属性，从 `props` 对象读取
3. **funcStates**：函数类型属性，保持函数原始形式

### 属性配置对象

```javascript
{
  type: String | Number | Boolean | Array | Function | Object | Array<*>,
  default: any | Function,
  props: Boolean,           // 是否从 props 对象读取
  rawFunction: Boolean,      // 是否保持函数原始形式
  observer: Function        // 属性变化回调函数
}
```

### 属性定义示例

```javascript
// 基础属性（state）
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

// 外部属性（propStates）
propStates = this.properties({
  data: {
    props: true,
    type: Array,
    default: [],
    observer: newVal => {
      this.#handleDataUpdate(newVal);
    },
  },
  value: {
    props: true,
    type: {
      Array: () => this.multiple && Array.isArray(this.props?.value),
      Number: () => typeof this.props?.value === "number",
      String: () => typeof this.props?.value === "string",
    },
    default: "",
    observer: async newVal => {
      this.setValue(newVal);
      this.#handleSelectedStyle(newVal);
      this.emit("change", { detail: { value: newVal } });
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

// 函数属性（funcStates）
funcStates = this.properties({
  selectable: {
    props: true,
    type: Function,
    rawFunction: true,
    default: null,
  },
  indexMethod: {
    props: true,
    type: Function,
    rawFunction: true,
    default: index => index,
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

### 类型声明

```javascript
// 基础类型
type: String | Number | Boolean | Array | Function | Object | Date

// 枚举类型
type: ["", "small", "medium", "large"]

// 动态类型
type: {
  Array: () => this.multiple && Array.isArray(this.props?.value),
  Number: () => typeof this.props?.value === "number",
}
```

### 默认值设置

```javascript
// 静态默认值
default: ""
default: false
default: []

// 动态默认值（函数形式）
default: () => {
  const active = this.getAttribute("active");
  return active || "";
}

// 函数类型默认值（rawFunction: true）
default: value => value
default: index => index
```

### Observer 函数规范

```javascript
observer: (newVal, oldVal) => {
  // 1. 更新内部状态
  this.#internalState = newVal;

  // 2. 更新样式
  this.updateContainerClasslist();

  // 3. 更新 DOM
  this.#container.textContent = newVal;

  // 4. 触发事件
  this.emit("change", { detail: { value: newVal } });

  // 5. 更新子组件
  this.querySelectorAll("ea-sub-component").forEach(item => {
    item.setAttribute("prop", newVal);
  });
};
```

### observedAttributes 规范

```javascript
static get observedAttributes() {
  return [
    ...super.observedAttributes,
    "disabled",
    "size",
    "active",
  ];
}
```

---

## 样式更新方式

### BEM 命名规范

```scss
$name: ea-component;

@include block($name) {
  font-size: var(--#{$name}-font-size);

  @include element(item) {
    padding: var(--#{$name}-padding);
  }

  @include modifier(card) {
    border: 1px solid var(--grey-300);
  }

  @include state(active) {
    background-color: var(--primary-color);
  }
}
```

### CSS 变量定义

```scss
:host {
  --#{$name}-text-color: var(--grey-700);
  --#{$name}-font-size: var(--font-size-md);
  --#{$name}-padding: var(--spacing-md);
  --#{$name}-border-radius: var(--border-radius-sm);
  --#{$name}-transition: var(--transition-normal);
}
```

### 样式作用域控制

```javascript
// Shadow DOM 样式隔离
this.shadowRoot.innerHTML = this.html(`
  <div class='${ns.b("component")}' part='container'>
    <slot></slot>
  </div>
`);

// Part 属性暴露样式钩子
this.shadowRoot.innerHTML = this.html(`
  <div class='${ns.b("component")}' part='container'>
    <slot></slot>
  </div>
`);
```

外部样式覆盖：

```css
ea-component::part(container) {
  background-color: #f0f0f0;
}
```

### 动态样式更新策略

```javascript
// 1. 通过 updateContainerClasslist() 更新类名
updateContainerClasslist() {
  const className = this.computedClasslist(
    "ea-component",
    // 对应 @include modifier()
    {
      ["--" + this.type]: this.type,
      ["--" + this.size]: this.size,
    },
    // 对应 @include state()
    {
      disabled: this.disabled,
      active: this.active,
    }
  );
  this.#container.className = className;
}

// 2. 通过 CSS 变量更新样式
state = this.properties({
  height: {
    type: String,
    default: null,
    observer: newVal => {
      this.style.setProperty("--ea-component-height", newVal);
      this.updateContainerClasslist();
    },
  },
});

// 3. 通过 style 属性直接更新
#handleStyleUpdate = () => {
  this.#container.style.setProperty(
    "--ea-component-indicator-size",
    `${this.#tabElement.offsetWidth}px`
  );
};

// 4. 根据方向更新位置（水平/垂直）
#updateSlider = () => {
  const value = this.value;
  const percentage = ((value - this.min) / (this.max - this.min)) * 100;

  if (this.vertical) {
    this.#trigger.style.top = `${percentage}%`;
    this.#trigger.style.left = "50%";
  } else {
    this.#trigger.style.left = `${percentage}%`;
    this.#trigger.style.top = "50%";
  }
};
```

### 响应式样式更新

```javascript
connectedCallback() {
  super.connectedCallback();
  this.#resizeObserver = new ResizeObserver(() => {
    this.updateContainerClasslist();
  }).observe(this.#container);
}

$beforeUnmounted() {
  this.#resizeObserver?.unobserve();
}
```

---

## 函数命名规范

### 命名约定

| 函数类型 | 前缀      | 示例                                      | 说明          |
| -------- | --------- | ----------------------------------------- | ------------- |
| 事件函数 | `#on`     | `#onClick`, `#onScroll`                   | 处理 DOM 事件 |
| 私有函数 | `#`       | `#handleDataUpdate`, `#handleStyleUpdate` | 组件内部使用  |
| 暴露函数 | 无        | `setData`, `show`, `hide`                 | 对外 API      |
| 生命周期 | `$`       | `$render`, `$beforeUnmounted`             | 生命周期钩子  |
| 渲染函数 | `#render` | `#renderStops`, `#renderMarkLabels`       | 渲染相关      |
| 辅助函数 | 无        | `computedClasslist`, `findDisplayValue`   | 工具函数      |

### 事件函数命名

```javascript
#onClick = (e) => {
  const target = e.target.closest("ea-item");
  if (!target || target?.hasAttribute("disabled")) return;
  this.active = target.getAttribute("name");
};

#onScroll = (e) => {
  this.#handleScrollPosition();
};

#onKeyDown = (e) => {
  if (e.key === "Escape") {
    this.hide();
  }
};

// 拖拽相关事件
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

// 子组件事件
#onInputChange = e => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const newValue = parseFloat(e.detail.currentValue);
  // ...
};
```

### 私有函数命名

```javascript
#handleDataUpdate = (newData) => {
  this.#states.data = newData;
  this.#renderData();
};

#handleStyleUpdate = () => {
  this.updateContainerClasslist();
};

#handleValidation = (value) => {
  return typeof value === "string" && value.length > 0;
};

// 渲染相关
#renderStops = () => {
  // 渲染 stop 元素
};

#renderMarkLabels = () => {
  // 渲染 mark 标签
};

// 计算相关
#getValueFromPosition = position => {
  // 根据位置计算值
};

#updateSlider = () => {
  // 更新滑块位置
};
```

### 暴露函数命名

```javascript
setData = data => {
  this.data = data;
  this.#handleDataUpdate(data);
};

show = () => {
  this.visible = true;
};

hide = () => {
  this.visible = false;
};

validate = () => {
  return this.#handleValidation(this.value);
};
```

### 生命周期函数命名

```javascript
$render() {
  this.shadowRoot.innerHTML = this.html(`
    <div class='${ns.b("component")}' part='container'>
      <slot></slot>
    </div>
  `);
}

connectedCallback() {
  super.connectedCallback();
  this.#abortController?.abort();
  this.#abortController = new AbortController();
}

$beforeUnmounted() {
  this.#abortController?.abort();
}

$updateLocalization(locale) {
  this.locale = locale;
}
```

---

## 生命周期管理

### 完整生命周期流程

```javascript
export class EaComponent extends Base {
  constructor() {
    super();
    this.stylesheet = stylesheet;
    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = this.html(`
      <div class='${ns.b("component")}' part='container'>
        <slot></slot>
      </div>
    `);
  }

  connectedCallback() {
    super.connectedCallback();
    this.#abortController?.abort();
    this.#abortController = new AbortController();
    this.#bindEvents();
    this.#initializeObservers();
  }

  disconnectedCallback() {
    this.$beforeUnmounted();
    this.$unmounted();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
    this.#resizeObserver?.unobserve();
  }

  $unmounted() {
    this.#cleanup();
  }
}
```

### 事件绑定与解绑

```javascript
connectedCallback() {
  super.connectedCallback();
  this.#abortController?.abort();
  this.#abortController = new AbortController();

  this.#container.addEventListener("click", this.#onClick, {
    signal: this.#abortController.signal,
  });
}

$beforeUnmounted() {
  this.#abortController?.abort();
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

### 观察器管理

```javascript
connectedCallback() {
  super.connectedCallback();
  this.#resizeObserver = new ResizeObserver(() => {
    this.updateContainerClasslist();
  }).observe(this.#container);

  this.#mutationObserver = new MutationObserver(() => {
    this.#handleSlotChange();
  }).observe(this, { childList: true, subtree: true });
}

$beforeUnmounted() {
  this.#resizeObserver?.unobserve();
  this.#mutationObserver?.disconnect();
}
```

### 异步操作清理

```javascript
#AbortControllerStates = {
  dataLoadAbortController: null,
  animationAbortController: null,
};

async #loadData() {
  this.#AbortControllerStates.dataLoadAbortController?.abort();
  this.#AbortControllerStates.dataLoadAbortController = new AbortController();

  try {
    const response = await fetch("/api/data", {
      signal: this.#AbortControllerStates.dataLoadAbortController.signal,
    });
    const data = await response.json();
    this.data = data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Failed to load data:", error);
    }
  }
}

$beforeUnmounted() {
  for (const key in this.#AbortControllerStates) {
    this.#AbortControllerStates[key]?.abort();
  }
}
```

---

## 拖拽交互规范

### 拖拽状态管理

```javascript
#states = {
  isDragging: false,
  startX: 0,
  startY: 0,
};
```

### 拖拽事件处理

```javascript
#onMouseDown = e => {
  if (this.disabled) return;

  e.preventDefault();
  e.stopPropagation();

  this.#states.isDragging = true;
  this.#states.startX = e.clientX;
  this.#states.startY = e.clientY;

  // 显示 tooltip
  this.#trigger.setAttribute("visible", "true");

  // 计算并更新值
  const newValue = this.#getValueFromPosition(
    this.vertical ? e.clientY : e.clientX
  );
  this.value = newValue;

  this.emit("input", { detail: { value: this.value } });
};

#onMouseMove = e => {
  if (!this.#states.isDragging || this.disabled) return;

  e.preventDefault();
  e.stopPropagation();

  const newValue = this.#getValueFromPosition(
    this.vertical ? e.clientY : e.clientX
  );
  this.value = newValue;

  this.emit("input", { detail: { value: this.value } });
};

#onMouseUp = () => {
  if (!this.#states.isDragging) return;

  this.#states.isDragging = false;
  this.#trigger.setAttribute("visible", "false");
  this.emit("change", { detail: { value: this.value } });
};
```

### 位置计算

```javascript
#getValueFromPosition = position => {
  const rect = this.#rail.getBoundingClientRect();
  const percentage = this.vertical
    ? (position - rect.top) / rect.height
    : (position - rect.left) / rect.width;
  const clampedPercentage = Math.max(0, Math.min(1, percentage));
  const value = this.min + clampedPercentage * (this.max - this.min);
  const steppedValue = Math.round(value / this.step) * this.step;
  return Math.max(this.min, Math.min(this.max, steppedValue));
};
```

### 事件绑定

```javascript
#bindEvents = () => {
  this.#abortController?.abort();
  this.#abortController = new AbortController();

  // 组件内部事件
  this.#rail.addEventListener("mousedown", this.#onMouseDown, {
    signal: this.#abortController.signal,
  });
  this.#thumb.addEventListener("mousedown", this.#onMouseDown, {
    signal: this.#abortController.signal,
  });
  this.#thumb.addEventListener("mouseenter", this.#onThumbMouseEnter, {
    signal: this.#abortController.signal,
  });
  this.#thumb.addEventListener("mouseleave", this.#onThumbMouseLeave, {
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
```

---

## 子组件集成规范

### 等待子组件定义

```javascript
"show-input": {
  type: Boolean,
  default: false,
  observer: async newVal => {
    // 等待子组件定义完成
    if (!this.#states.isInputNumberDefined) {
      await customElements.whenDefined("ea-input-number");
      this.#states.isInputNumberDefined = true;
    }

    // 清理之前的事件监听
    this.#AbortControllerStates.input?.abort();

    this.#updateSlider();

    if (newVal) {
      this.#AbortControllerStates.input = new AbortController();
      this.#input.addEventListener("ea-change", this.#onInputChange, {
        signal: this.#AbortControllerStates.input.signal,
      });
    }
  },
}
```

### 子组件属性同步

```javascript
size: {
  type: EA_COMPONENT_SIZES,
  default: "",
  observer: async newVal => {
    this.updateContainerClasslist();

    // 同步子组件属性
    if (this["show-input"]) this.#input.setAttribute("size", newVal);
  },
}
```

### 子组件事件处理

```javascript
#onInputChange = e => {
  e.preventDefault();
  e.stopImmediatePropagation();

  const newValue = parseFloat(e.detail.currentValue);
  const clampedValue = Math.max(this.min, Math.min(this.max, newValue));
  this.value = clampedValue;
  this.emit("change", { detail: { value: this.value } });
};
```

---

## 数据处理规范

### 私有状态管理

```javascript
#states = {
  isMounted: false,
  isDataRendered: false,
  isInputNumberDefined: false,
  isDragging: false,
  startX: 0,
  startY: 0,
  currentRow: {
    target: null,
    value: {},
  },
  columns: [],
  originData: [],
  dataSource: new WeakMap(),
  dataIndex: new WeakMap(),
};
```

### WeakMap 使用

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

getRowData = (trNode) => {
  return this.#states.dataSource.get(trNode);
};

getTrNode = (data) => {
  return this.#states.dataIndex.get(data);
};
```

### 数据更新策略

```javascript
// 完整替换
propStates = this.properties({
  data: {
    props: true,
    type: Array,
    default: [],
    observer: newVal => {
      this.#states.originData = newVal;
      this.#renderData(newVal);
    },
  },
});

// 增量更新
addData = item => {
  this.data = [...this.data, item];
  this.#renderItem(item, this.data.length - 1);
};

removeData = index => {
  this.data = this.data.filter((_, i) => i !== index);
  this.#removeItem(index);
};

updateData = (index, newItem) => {
  this.data = this.data.map((item, i) => (i === index ? newItem : item));
  this.#updateItem(index, newItem);
};
```

### 数据验证

```javascript
#validateData = (data) => {
  if (!Array.isArray(data)) {
    console.warn("Data must be an array");
    return false;
  }
  return data.every(item => {
    return typeof item === "object" && item !== null;
  });
};

setData = (data) => {
  if (!this.#validateData(data)) {
    console.error("Invalid data format");
    return;
  }
  this.data = data;
  this.#renderData(data);
};
```

### 数据转换

```javascript
#transformData = (rawData) => {
  return rawData.map(item => ({
    id: item.id,
    label: item.name,
    value: item.code,
    disabled: item.status === "inactive",
  }));
};

propStates = this.properties({
  data: {
    props: true,
    type: Array,
    default: [],
    observer: (newVal) => {
      const transformedData = this.#transformData(newVal);
      this.#renderData(transformedData);
    },
  },
});
```

### 合并数据渲染

```javascript
#renderStops = () => {
  const stops = [];

  // 生成 step stops
  const step = this.step;
  const count = (this.max - this.min) / step + 1;

  if (this["show-stops"]) {
    for (let index = 0; index < count; index++) {
      const value = this.min + step * index;
      const percentage = ((value - this.min) / (this.max - this.min)) * 100;

      stops.push({
        value,
        percentage,
        type: "stop",
        className: this.ns.e("stop"),
        part: "stop",
      });
    }
  }

  // 添加 mark stops
  if (this.marks) {
    for (const key in this.marks) {
      const value = parseFloat(key);
      if (isNaN(value) || value < this.min || value > this.max) continue;

      const percentage = ((value - this.min) / (this.max - this.min)) * 100;

      stops.push({
        value,
        percentage,
        type: "mark-stop",
        className: `${this.ns.e("stop")} ${this.ns.e("mark-stop")}`,
        part: "stop mark-stop",
        label: this.marks[key],
      });
    }
  }

  stops.sort((a, b) => a.value - b.value);

  const stopElements = stops.map(stop =>
    EaUtils.EaElement.h("div", stop.className, {
      part: stop.part,
      style: [`${this.vertical ? "top" : "left"}: ${stop.percentage}%;`],
    })
  );

  this.#rail.innerHTML = this.html(stopElements.join(""));
};
```

---

## 错误处理规范

### Try-Catch 规范

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

#handleEvent = (e) => {
  try {
    const target = e.target.closest("ea-item");
    if (!target) return;
    this.#handleItemClick(target);
  } catch (error) {
    console.error("Failed to handle event:", error);
    this.emit("error", { detail: { error, event: e } });
  }
};
```

### 异步错误处理

```javascript
#loadData = async () => {
  try {
    const response = await fetch("/api/data", {
      signal: this.#abortController.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    this.data = data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Failed to load data:", error);
      this.emit("load-error", { detail: { error } });
    }
  }
};
```

### 属性验证

```javascript
state = this.properties({
  value: {
    type: Number,
    default: 0,
    observer: newVal => {
      if (isNaN(newVal)) {
        console.warn("Invalid value:", newVal);
        this.value = 0;
        return;
      }
      this.#handleValueUpdate(newVal);
    },
  },
});
```

### 开发环境错误提示

```javascript
#handleValidation = (value) => {
  if (typeof value !== "string") {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[${this.tagName}] Value must be a string, received:`, value);
    }
    return false;
  }
  return true;
};
```

---

## 性能优化规范

### AbortController 使用

```javascript
#abortController = new AbortController();

#AbortControllerStates = {
  clickAbortController: null,
  scrollAbortController: null,
};

connectedCallback() {
  super.connectedCallback();
  this.#abortController?.abort();
  this.#abortController = new AbortController();
  this.#bindEvents();
}

#bindEvents = () => {
  this.#AbortControllerStates.clickAbortController?.abort();
  this.#AbortControllerStates.clickAbortController = new AbortController();

  this.#container.addEventListener("click", this.#onClick, {
    signal: this.#AbortControllerStates.clickAbortController.signal,
  });
}

$beforeUnmounted() {
  this.#abortController?.abort();
  for (const key in this.#AbortControllerStates) {
    this.#AbortControllerStates[key]?.abort();
  }
}
```

### 防抖与节流

```javascript
#debouncedUpdate = this.#debounce(() => {
  this.updateContainerClasslist();
}, 100);

#throttledScroll = this.#throttle(() => {
  this.#handleScrollPosition();
}, 16);

#debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};

#throttle = (fn, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
};
```

### 批量 DOM 操作

```javascript
#renderData = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach(item => {
    const node = this.#createItemNode(item);
    fragment.appendChild(node);
  });

  this.#container.innerHTML = "";
  this.#container.appendChild(fragment);
};
```

### 内存优化

```javascript
#cleanup = () => {
  this.#states.dataSource = new WeakMap();
  this.#states.dataIndex = new WeakMap();
  this.#abortController?.abort();

  for (const key in this.#AbortControllerStates) {
    this.#AbortControllerStates[key]?.abort();
  }

  this.#resizeObserver?.unobserve();
  this.#mutationObserver?.disconnect();
};
```

---

## 事件处理规范

### 事件监听器绑定

```javascript
connectedCallback() {
  super.connectedCallback();
  this.#abortController?.abort();
  this.#abortController = new AbortController();

  this.#container.addEventListener("click", this.#onClick, {
    signal: this.#abortController.signal,
  });

  this.#container.addEventListener("dblclick", this.#onDblClick, {
    signal: this.#abortController.signal,
  });

  this.#container.addEventListener("contextmenu", this.#onContextmenu, {
    signal: this.#abortController.signal,
  });

  this.#container.addEventListener("scroll", this.#onScroll, {
    signal: this.#abortController.signal,
  });

  this.#container.addEventListener("keydown", this.#onKeyDown, {
    signal: this.#abortController.signal,
  });
}
```

### 事件处理函数

```javascript
#onClick = (e) => {
  const target = e.target.closest("ea-item");
  if (!target || target?.hasAttribute("disabled")) return;

  const itemName = target.getAttribute("name");
  this.active = itemName;

  this.emit("item-click", {
    detail: { name: itemName, target },
    bubbles: true,
  });
};

#onScroll = (e) => {
  this.#handleScrollPosition();
  this.emit("scroll", {
    detail: { scrollTop: e.target.scrollTop },
  });
};

#onKeyDown = (e) => {
  const keyMap = {
    Escape: () => this.hide(),
    Enter: () => this.confirm(),
    ArrowUp: () => this.prev(),
    ArrowDown: () => this.next(),
  };

  if (keyMap[e.key]) {
    e.preventDefault();
    keyMap[e.key]();
  }
};
```

### 自定义事件定义

```typescript
export class EaComponentChangeEvent extends Event {
  constructor(detail: { value: any }) {
    super("ea-component-change", {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

export class EaComponentClickEvent extends Event {
  constructor(detail: { target: HTMLElement; name: string }) {
    super("ea-component-click", {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}
```

### 事件触发规范

```javascript
#dispatchChangeEvent = (value) => {
  this.dispatchEvent(new EaComponentChangeEvent({ value }));
};

#dispatchClickEvent = (target, name) => {
  this.dispatchEvent(new EaComponentClickEvent({ target, name }));
};

emit = (eventName, options) => {
  super.dispatchEvent(new CustomEvent(eventName, options));
};
```

### Slot 变化监听

```javascript
connectedCallback() {
  super.connectedCallback();
  this.#navSlot.addEventListener("slotchange", this.#onSlotChange, {
    signal: this.#abortController.signal,
  });
}

#onSlotChange = () => {
  const elements = [...this.#navSlot.assignedElements()];
  elements.forEach(item => {
    item.setAttribute("slot", "nav");
    item.updateContainerClasslist();
  });
  this.updateContainerClasslist();
};
```

---

## 代码组织规范

### 导入顺序

```javascript
// 1. 核心模块导入
import FormAssociatedBase from "@/core/FormBase";
import { namespace } from "@/directives/namespace";
import { html } from "@/directives/html";

// 2. 内部模块导入
import Base from "@components/Base.js";

// 3. 组件导入
import "@/components/ea-tooltip";
import "@/components/ea-input-number";
import "@components/ea-icon/index.js";
import "@components/ea-input/index.js";

// 4. 工具函数导入
import EaUtils from "@/utils/Utils";
import { timeout } from "@/utils/timeout";
import { EA_COMPONENT_SIZES } from "@/utils/Variables";

// 5. 事件导入
import { EaComponentChangeEvent } from "./events/EaComponentChangeEvent";

// 6. 样式导入
import stylesheet from "./index.scss?inline";
```

### 类成员顺序

```javascript
export class EaComponent extends Base {
  // 1. 私有属性声明
  #container;
  #rail;
  #trigger;
  #abortController = new AbortController();

  // 2. 私有状态
  #states = { isMounted: false };

  // 3. AbortController 状态
  #AbortControllerStates = { clickAbortController: null };

  // 4. 静态属性
  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  // 5. 响应式属性定义
  state = this.properties({});
  propStates = this.properties({});
  funcStates = this.properties({});

  // 6. 公共方法
  updateContainerClasslist() {}
  setData() {}

  // 7. 私有方法
  #handleDataUpdate() {}
  #renderStops() {}

  // 8. 事件处理方法
  #onClick() {}

  // 9. 生命周期方法
  constructor() {}
  $render() {}
  connectedCallback() {}
  disconnectedCallback() {}
  $beforeUnmounted() {}
  $unmounted() {}
}
```

### JSDoc 注释

```javascript
/**
 * 设置组件数据
 * @param {Array} data - 数据数组
 * @param {boolean} [silent=false] - 是否静默更新
 * @returns {void}
 */
setData = (data, silent = false) => {
  this.data = data;
  if (!silent) {
    this.emit("data-change", { detail: { data } });
  }
};

/**
 * 获取当前选中的行
 * @returns {Promise<Object>} 当前行数据对象
 */
getCurrentRow() {
  return this.#states.currentRow;
};

/**
 * 根据鼠标位置计算滑块值
 * @param {number} position - 鼠标位置
 * @returns {number} 滑块值
 */
#getValueFromPosition = position => {
  // ...
};
```

### 类型注释

```javascript
/** @type {HTMLElement} */
#container;

/** @type {HTMLElement} */
#rail;

/** @type {HTMLElement} */
#trigger;

/** @type {AbortController} */
#abortController;

/** @type {ResizeObserver} */
#resizeObserver;

/** @type {WeakMap<HTMLElement, Object>} */
#dataSource;

/**
 * @typedef {Object} ColumnOption
 * @property {number} depth - 列深度
 * @property {string} prop - 属性名
 * @property {string} label - 标签名
 */
```

---

## 参考组件

- [ea-slider](file:///e:/repo/ea-ui-component/src/components/ea-slider/index.js) - 滑块组件（拖拽交互、子组件集成）
- [ea-tree](file:///e:/repo/ea-ui-component/src/components/ea-tree/index.js) - 树形组件
- [ea-table](file:///e:/repo/ea-ui-component/src/components/ea-table/components/ea-table/index.js) - 表格组件
- [ea-tabs](file:///e:/repo/ea-ui-component/src/components/ea-tabs/components/ea-tabs/index.js) - 标签页组件
- [ea-select](file:///e:/repo/ea-ui-component/src/components/ea-select/components/ea-select/index.js) - 选择器组件
- [Base](file:///e:/repo/ea-ui-component/src/components/Base.js) - 基类组件
