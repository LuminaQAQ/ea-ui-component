# JavaScript 开发规范

## 组件结构规范

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
    prop1: {
      type: String,
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

  updateContainerClasslist() {
    const className = this.computedClasslist("ea-component", {}, {});
    this.#container.className = className;
    return className;
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

### 核心要点

- 继承 `Base` 类（表单组件继承 `FormAssociatedBase`）
- 私有属性使用 `#` 前缀
- 使用 Shadow DOM 实现样式隔离
- 使用 `namespace()` 生成 BEM 命名空间
- 样式导入使用 `?inline` 后缀
- 主要以 `properties` 定义组件的 attr 或 prop，特殊情况才使用 `data-` 作为前缀定义属性
- 文件末尾注册自定义元素

---

## 属性定义规范

### 属性类型分类

1. **state**：组件内部状态属性
2. **propStates**：组件外部传入属性（`props: true`）
3. **funcStates**：函数类型属性（`rawFunction: true`）

### 属性配置

```javascript
{
  type: String | Number | Boolean | Array | Function | Object | ["a", "b"],
  default: any | Function,
  props: Boolean,
  rawFunction: Boolean,
  observer: Function
}
```

### 示例

```javascript
state = this.properties({
  disabled: {
    type: Boolean,
    default: false,
    observer: () => this.updateContainerClasslist(),
  },
  size: {
    type: ["", "small", "large"],
    default: "",
    observer: () => this.updateContainerClasslist(),
  },
});

propStates = this.properties({
  data: {
    props: true,
    type: Array,
    default: [],
    observer: newVal => this.#handleDataUpdate(newVal),
  },
});

funcStates = this.properties({
  formatValue: {
    props: true,
    type: Function,
    rawFunction: true,
    default: value => value,
  },
});
```

---

## 函数命名规范

| 类型     | 前缀      | 示例                           | 说明         |
| -------- | --------- | ------------------------------ | ------------ |
| 事件函数 | `#on`     | `#onClick`, `#onScroll`        | DOM事件处理  |
| 私有函数 | `#`       | `#handleUpdate`, `#renderData` | 组件内部使用 |
| 暴露函数 | 无        | `setData`, `show`              | 对外API      |
| 生命周期 | `$`       | `$render`, `$beforeUnmounted`  | 生命周期钩子 |
| 渲染函数 | `#render` | `#renderItems`                 | 渲染相关     |

---

## 生命周期管理

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
#AbortControllerStates = { input: null };

// 使用
this.#AbortControllerStates.input?.abort();
this.#AbortControllerStates.input = new AbortController();

// 清理
$beforeUnmounted() {
  for (const key in this.#AbortControllerStates) {
    this.#AbortControllerStates[key]?.abort();
  }
}
```

---

## 事件处理规范

```javascript
#onClick = e => {
  const target = e.target.closest("ea-item");
  if (!target || target?.hasAttribute("disabled")) return;
  this.active = target.getAttribute("name");
  this.emit("change", { detail: { value: this.active } });
};

#bindEvents = () => {
  this.#container.addEventListener("click", this.#onClick, {
    signal: this.#abortController.signal,
  });
};
```

---

## 拖拽交互规范

```javascript
#states = { isDragging: false };

#onMouseDown = e => {
  if (this.disabled) return;
  e.preventDefault();
  this.#states.isDragging = true;
};

#onMouseMove = e => {
  if (!this.#states.isDragging) return;
  e.preventDefault();
  // 更新位置
};

#onMouseUp = () => {
  if (!this.#states.isDragging) return;
  this.#states.isDragging = false;
};
```

---

## 子组件集成规范

### 等待子组件定义

```javascript
observer: async newVal => {
  if (!this.#states.componentNameIsDefined) {
    await customElements.whenDefined("ea-sub-component");
    this.#states.componentNameIsDefined = true;
  }
  // 子组件已定义
};
```

### 子组件事件处理

```javascript
#onSubComponentChange = e => {
  e.preventDefault();
  e.stopImmediatePropagation();
  // 处理事件
};
```

### 子组件属性同步

```javascript
observer: newVal => {
  this.#subComponent.setAttribute("prop", newVal);
};
```

---

## 数据处理规范

### WeakMap 使用

```javascript
#states = {
  dataSource: new WeakMap(),
  dataIndex: new WeakMap(),
};

setData = data => {
  data.forEach((item, i) => {
    const node = this.#createNode(item, i);
    this.#states.dataSource.set(node, item);
    this.#states.dataIndex.set(item, node);
  });
};
```

### 批量 DOM 操作

```javascript
#renderData = data => {
  const fragment = document.createDocumentFragment();

  data.forEach(item => {
    fragment.appendChild(this.#createItemNode(item));
  });

  this.#container.innerHTML = "";
  this.#container.appendChild(fragment);
};
```

---

## 代码组织规范

### 导入顺序

```javascript
// 1. 核心模块
import { namespace } from "@/directives/namespace";
import Base from "@components/Base.js";

// 2. 组件导入
import "@components/ea-icon/index.js";

// 3. 工具函数
import EaUtils from "@/utils/Utils";

// 4. 样式导入
import stylesheet from "./index.scss?inline";
```

### 类成员顺序

```javascript
export class EaComponent extends Base {
  // 1. 私有属性
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #abortController = new AbortController();

  // 2. 私有状态
  #states = {};

  // 3. 静态属性
  static get observedAttributes() {
    return []
  }

  // 4. 响应式属性
  state = this.properties({});
  propStates = this.properties({});
  funcStates = this.properties({});

  // 5. 公共方法
  setData() {}

  // 6. 私有方法
  #handleUpdate() {}

  // 7. 事件处理
  #onClick() {}

  // 8. 生命周期
  constructor() {}
  $render() {}
  connectedCallback() {}
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
```

### 类型注释

```javascript
/** @type {HTMLElement} */
#container;

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

- [ea-tree](file:///c:/Users/Administrator/Desktop/github/ea-ui-component/src/components/ea-tree/index.js) - 树形组件
- [ea-table](file:///c:/Users/Administrator/Desktop/github/ea-ui-component/src/components/ea-table/components/ea-table/index.js) - 表格组件
- [ea-tabs](file:///c:/Users/Administrator/Desktop/github/ea-ui-component/src/components/ea-tabs/components/ea-tabs/index.js) - 标签页组件
- [ea-select](file:///c:/Users/Administrator/Desktop/github/ea-ui-component/src/components/ea-select/components/ea-select/index.js) - 选择器组件
- [Base](file:///c:/Users/Administrator/Desktop/github/ea-ui-component/src/components/Base.js) - 基类组件
