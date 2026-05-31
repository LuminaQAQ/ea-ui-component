---
name: JS
description: 在对 web components 组件相关的 TypeScript 按照要求来进行更新时
---

# JavaScript/TypeScript 开发规范

基于 ea-ui-component Web Components 组件库的开发特性制定的统一开发标准（重构后版本）。

## 项目架构变更

### 核心变更

1. **基类变更**：`Base` → `EaBase`，路径从 `@components/Base` 改为 `@core/EaBase`
2. **BEM 工具**：`namespace()` → `createBEM()`，路径从 `@/directives/namespace` 改为 `@utils/bem`
3. **属性定义**：`this.properties()` → `@attribute()` 装饰器
4. **事件监听**：手动 `addEventListener` → `@listen()` 装饰器
5. **DOM 查询**：手动 `querySelector` → `@query()` 装饰器
6. **HTML 安全**：使用 `html()` 工具函数处理 HTML 内容

### 目录结构

```
ea-component/
├── index.ts                    # 组件主入口（TypeScript）
├── index.scss                  # 组件主样式
├── types.d.ts                  # 类型声明（可选）
├── components/                 # 子组件（可选）
│   └── sub-component/
│       ├── index.ts
│       └── index.scss
└── events/                     # 自定义事件（可选）
    └── ComponentEvent.ts
```

---

## 组件结构规范

### 主组件框架（TypeScript + 装饰器）

```typescript
import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { html } from "@utils/html";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-component" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaComponent extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-component")
  private _container!: HTMLElement;

  @query(".ea-component__input")
  private _input!: HTMLInputElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaComponent, newVal: string) {
      this._container.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaComponent) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: ["small", "medium", "large"] as const,
    default: "medium",
    observer(this: EaComponent) {
      this.updateContainerClasslist();
    },
  })
  size: "small" | "medium" | "large" = "medium";

  // 带连字符的属性名示例：使用小驼峰命名，框架自动转换
  @attribute({
    type: String,
    default: "",
    observer(this: EaComponent, newVal: string) {
      this._closeBtn.textContent = newVal;
    },
  })
  closeText: string = ""; // 自动映射到 HTML 属性 close-text

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaComponent) {
      this._updateIconVisibility();
    },
  })
  showIcon: boolean = false; // 自动映射到 HTML 属性 show-icon

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem({ [this.size]: true }, { disabled: this.disabled });
    this._container.className = className;
    return className;
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <slot></slot>
      </div>
    `;
  }

  // ==================== 事件处理 ====================

  /** 处理按钮点击事件 */
  @listen("click", ".ea-component__button")
  private _handleClick(e: Event) {
    if (this.disabled) return;
    this.emit("ea-component-click", { detail: { target: e.target } });
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    // 清理资源
  }
}
```

### 结构说明

1. **导入模块**：基类、装饰器、工具函数、样式
2. **常量定义**：`TAG_NAME` 和 `bem` 工具
3. **@CustomElement**：注册组件，传入样式数组
4. **DOM 引用**：使用 `@query` 装饰器获取元素
5. **属性定义**：使用 `@attribute` 装饰器定义响应式属性
6. **方法**：公共方法（对外 API）和私有方法（`_` 前缀）
7. **事件处理**：使用 `@listen` 装饰器绑定事件
8. **生命周期**：`$mount()`、`$beforeUnmount()` 等钩子

### 核心要点

- 继承 `EaBase` 类（表单组件继承 `FormBase`）
- 使用 `@CustomElement` 装饰器注册组件
- 使用 `@attribute` 装饰器定义属性（替代 `this.properties()`）
- 使用 `@query` 装饰器获取 DOM 元素
- 使用 `@listen` 装饰器绑定事件（自动清理）
- 使用 `createBEM()` 生成 BEM 类名（替代 `namespace()`）
- 使用 `html()` 函数处理 HTML 内容（防止 XSS）
- 私有属性使用 `_` 前缀（`#` 与装饰器不兼容）
- 样式导入使用 `?inline` 后缀

---

## 装饰器使用规范

### @CustomElement

```typescript
@CustomElement("ea-component", {
  styles: [stylesheet],      // 样式数组
  autoDefine: true,          // 是否自动注册（默认 true）
})
```

### @attribute

```typescript
@attribute({
  type: String,              // String | Number | Boolean | Array | Object | 枚举数组
  default: "default value",  // 默认值
  observer(this, newVal) {   // 变化回调
    this.updateUI();
  },
})
propertyName: string = "";
```

**属性命名规则：**

- **类属性使用小驼峰命名**（如 `closeText`, `showIcon`）
- **框架自动转换为连字符命名**作为 HTML 属性（如 `close-text`, `show-icon`）
- **无需显式声明 `name` 选项**，装饰器会自动处理命名转换
- **组件视觉变体属性统一命名为 `variant`**（而非 `type`），并使用 `VARIANT_TYPES` 常量

```typescript
// 正确示例：使用小驼峰命名
@attribute({
  type: String,
  default: "",
})
closeText: string = "";  // 自动映射到 HTML 属性 close-text

@attribute({
  type: Boolean,
  default: false,
})
showIcon: boolean = false;  // 自动映射到 HTML 属性 show-icon

// 正确示例：使用 VARIANT_TYPES 常量定义 variant 属性
import { Enum } from "@utils/Enum";
import { VARIANT_TYPES, type VariantType } from "@constants/variant";

@attribute({
  type: Enum(VARIANT_TYPES),
  default: "info",
  observer(this: EaComponent) {
    this.updateContainerClasslist();
  },
})
variant: VariantType = "info";

// 如果需要扩展 variant 值（如添加 "normal"）
@attribute({
  type: Enum([...VARIANT_TYPES, "normal"]),
  default: "normal",
  observer(this: EaComponent) {
    this.updateContainerClasslist();
  },
})
variant: VariantType | "normal" = "normal";
```

**类型说明：**

- `String` - 字符串类型
- `Number` - 数字类型
- `Boolean` - 布尔类型（HTML 中属性存在即为 true）
- `Array` - JSON 数组
- `Object` - JSON 对象
- `["a", "b", "c"] as const` - 枚举类型，限制可选值
- `VARIANT_TYPES` - 组件变体类型常量，统一从 `@constants/variant` 导入

### @query

```typescript
@query(".ea-component__container")
private _container!: HTMLElement;

@query("input[type='text']")
private _input!: HTMLInputElement;
```

### @listen

```typescript
// 基础用法 - 监听 shadowRoot 事件
@listen("click")
private _handleClick(e: Event) {
  // 处理点击
}

// 事件委托 - 监听特定选择器
@listen("click", ".ea-component__button")
private _handleButtonClick(e: Event) {
  // 处理按钮点击
}

// 自动清理 - 组件销毁时自动移除监听
```

---

## BEM 类名规范

### createBEM 使用

```typescript
const bem = createBEM("ea-component");

// 基础块
bem(); // "ea-component"

// 带修饰符
bem({ size: "large" }); // "ea-component ea-component--size-large"
bem({ [this.type]: true }); // "ea-component ea-component--primary"

// 带状态
bem({}, { disabled: true }); // "ea-component is-disabled"
bem({}, { active: this.active }); // "ea-component" 或 "ea-component is-active"

// 组合使用
bem(
  { [this.type]: true, [this.size]: true },
  { disabled: this.disabled, center: this.center }
);
// "ea-component ea-component--primary ea-component--large is-disabled is-center"
```

### 与 SCSS 配合

```scss
$name: ea-component;

@include block($name) {
  // 基础样式

  @include element(item) {
    // .ea-component__item
  }

  @include modifier(large) {
    // .ea-component--large
  }

  @include state(disabled) {
    // .is-disabled
  }
}
```

---

## HTML 安全处理

### html() 函数使用

```typescript
import { html } from "@utils/html";

@attribute({
  type: String,
  default: "",
  observer(this: EaAlert, newVal: string) {
    // 安全地插入 HTML（自动过滤 XSS）
    this._container.innerHTML = html(newVal);
  },
})
content: string = "";
```

**注意：** `html()` 函数会进行 XSS 过滤，只允许安全的 HTML 标签。

---

## 事件系统

### 派发事件

```typescript
// 内部通信事件（ea-{component}-{event} 格式）
this.emit("ea-input-number-focus");
this.emit("ea-input-number-blur");

// 带数据的内部通信事件
this.emit("ea-tab-close-icon-click", {
  detail: {
    name: this.name,
  },
});
```

**注意**：`this.emit()` 仅用于父子组件内部通信，事件名必须使用 `ea-{component}-{event}` 格式。对外公开事件应使用自定义事件类（参见 event 技能）。

### 自定义事件类（ea- 前缀事件）

```typescript
// types.ts
export class EaComponentChangeEvent extends Event {
  readonly detail: { value: string; label: string };

  constructor(detail: { value: string; label: string }) {
    super("ea-change", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-change": EaComponentChangeEvent;
  }
}

// 使用
this.dispatchEvent(new EaComponentChangeEvent({ value: "new", label: "New" }));
```

---

## 生命周期管理

### 生命周期方法

| 方法               | 说明       | 调用时机                         |
| ------------------ | ---------- | -------------------------------- |
| `$mount()`         | 组件挂载   | connectedCallback 后，首次渲染前 |
| `$beforeUnmount()` | 组件销毁前 | disconnectedCallback 开始时      |
| `$unmounted()`     | 组件销毁后 | disconnectedCallback 结束时      |
| `$updated()`       | 属性更新   | attributeChangedCallback 后      |

```typescript
$mount(): void {
  // 初始化操作
  this.updateContainerClasslist();
}

$beforeUnmount(): void {
  // 清理 AbortController、Observer 等资源
  this._transitionAbortController?.abort();
  this._resizeObserver?.disconnect();
}
```

---

## AbortController 管理

### 装饰器自动管理

`@listen` 装饰器会自动处理事件监听器的绑定和清理：

```typescript
@listen("click", ".ea-component__button")
private _handleClick(e: Event) {
  // 自动在 connectedCallback 绑定
  // 自动在 disconnectedCallback 清理
}
```

### 手动管理（特殊情况）

对于需要手动管理的事件监听：

```typescript
private _transitionAbortController?: AbortController;

private _startTransition() {
  // 清理之前的
  this._transitionAbortController?.abort();
  this._transitionAbortController = new AbortController();

  this._container.addEventListener("transitionend", () => {
    this.remove();
  }, {
    signal: this._transitionAbortController.signal,
    once: true,
  });
}

$beforeUnmount(): void {
  this._transitionAbortController?.abort();
}
```

---

## 类型声明文件

### 为组件创建类型声明

```typescript
// types.d.ts

// ==================== HTML 全局类型 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-component": EaComponentElement;
  }
}

export interface EaComponentElement extends HTMLElement {
  label: string;
  disabled: boolean;
  size: "small" | "medium" | "large";
}

// ==================== Vue 类型 ====================

import type { DefineComponent } from "vue";

declare module "vue" {
  interface GlobalComponents {
    "ea-component": DefineComponent<{
      label?: string;
      disabled?: boolean;
      size?: "small" | "medium" | "large";
    }>;
  }
}

// ==================== React 类型 ====================

import type { HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-component": HTMLAttributes<HTMLElement> & {
        label?: string;
        disabled?: boolean;
        size?: "small" | "medium" | "large";
      };
    }
  }
}
```

---

## 函数命名规范

| 函数类型 | 前缀      | 示例                           | 说明         |
| -------- | --------- | ------------------------------ | ------------ |
| 事件处理 | `_handle` | `_handleClick`, `_handleInput` | 事件回调     |
| 私有方法 | `_`       | `_updateUI`, `_renderData`     | 组件内部使用 |
| 公共方法 | 无        | `setData`, `show`, `hide`      | 对外 API     |
| 生命周期 | `$`       | `$mount`, `$beforeUnmount`     | 生命周期钩子 |
| 渲染相关 | `_render` | `_renderItems`                 | 渲染方法     |

---

## 性能优化

### 批量 DOM 操作

```typescript
private _renderData(data: any[]) {
  const fragment = document.createDocumentFragment();

  data.forEach(item => {
    const node = this._createItemNode(item);
    fragment.appendChild(node);
  });

  this._container.innerHTML = "";
  this._container.appendChild(fragment);
}
```

### 防抖与节流

```typescript
import { debounce, throttle } from "@utils/performance";

@attribute({
  type: String,
  observer: debounce(function(this: EaComponent, newVal: string) {
    this._handleSearch(newVal);
  }, 300),
})
searchText: string = "";
```

---

## 错误处理

```typescript
@attribute({
  type: Array,
  default: [],
  observer(this: EaComponent, newVal: any[]) {
    try {
      this._validateData(newVal);
      this._renderData(newVal);
    } catch (error) {
      console.error("[EaComponent] Failed to update data:", error);
      this.emit("error", { detail: { error, data: newVal } });
    }
  },
})
data: any[] = [];
```

---

## 参考组件

- [ea-alert](file:///e:/repo/ea-ui-component/src/components/ea-alert/index.ts) - 警告组件（装饰器模式示例）
- [EaBase](file:///e:/repo/ea-ui-component/src/core/EaBase.ts) - 基类组件
- [attribute](file:///e:/repo/ea-ui-component/src/decorator/attribute.ts) - 属性装饰器
- [custom-element](file:///e:/repo/ea-ui-component/src/decorator/custom-element.ts) - 自定义元素装饰器
- [query](file:///e:/repo/ea-ui-component/src/decorator/query.ts) - DOM 查询装饰器
- [listen](file:///e:/repo/ea-ui-component/src/decorator/listen.ts) - 事件监听装饰器

---

## 测试开发技能

### DOMPurify 属性丢失问题处理

**问题场景**：
当测试失败，且组件属性（如 `srcset`）为空或丢失时，优先考虑 DOMPurify 清洗导致的问题。

**诊断步骤**：

1. 检查组件是否使用 `html()` 函数处理包含该属性的 HTML 字符串
2. 在浏览器中测试是否正常（DOMPurify 在浏览器和 JSDOM 环境行为可能不同）
3. 确认属性值是否包含 `data:` URI（这类 URI 在 JSDOM 中可能被过滤）

**解决方案**：
使用 DOM API 替代 HTML 字符串：

```typescript
// ❌ 不推荐：HTML 字符串可能被清洗
private _loadImage(src: string): void {
  this._container.innerHTML = html(
    `<img src="${src}" srcset="${this["src-set"]}" />`
  );
}

// ✅ 推荐：使用 DOM API 设置属性
private _renderImage(src: string): void {
  const img = document.createElement("img");
  img.src = src;
  img.srcset = this["src-set"];  // 直接设置属性，绕过 DOMPurify
  this._container.innerHTML = "";
  this._container.appendChild(img);
}
```

**参考案例**：

- [ea-avatar/index.ts](file:///e:/repo/ea-ui-component/src/components/ea-avatar/index.ts) - 使用 DOM API 处理 srcset 属性

---

## 常见陷阱与注意事项

### 1. 避免使用 HTMLElement 保留属性名

**问题**：`HTMLElement` 有一些内置属性（如 `title`, `lang`, `dir`, `draggable`, `tabIndex`, `style`, `className` 等）。如果在组件中使用 `@attribute` 装饰器声明与这些保留属性同名的属性，类字段初始化器（如 `this.title = ""`）会触发 `HTMLElement.title` 的 setter，导致 jsdom 自定义元素升级失败（`NotSupportedError: Unexpected attributes`）。

**解决方案**：使用不会与 `HTMLElement` 保留属性冲突的名称。例如：

- `title` → `heading`（与 `EaDialog` 一致）
- `type` → `variant`

```typescript
// ❌ 错误：title 是 HTMLElement 保留属性
@attribute({ type: String, default: "" })
title: string = "";  // this.title = "" 触发 HTMLElement.title setter

// ✅ 正确：使用 heading 避免冲突
@attribute({ type: String, default: "" })
heading: string = "";  // 安全，不与 HTMLElement 属性冲突
```

**常见的 HTMLElement 保留属性名**：`title`, `lang`, `dir`, `draggable`, `tabIndex`, `style`, `className`, `id`, `hidden`, `accessKey`, `contentEditable`, `isContentEditable`, `offsetHeight`, `offsetWidth`, `offsetLeft`, `offsetTop` 等。

### 2. 用 CSS 状态类替代 JS style 控制显隐

**问题**：使用 JS 的 `element.style.display = "none"` 控制元素显隐会导致样式与逻辑耦合，不利于主题定制和样式覆盖。

**解决方案**：使用 BEM 状态类（`is-xxx`）配合 SCSS 的 `@include state()` 控制，通过 `updateContainerClasslist()` 统一管理。

```typescript
// ❌ 不推荐：JS 直接控制 style
private _updateHeaderVisibility(): void {
  if (this._header) {
    this._header.style.display = this.withHeader ? "" : "none";
  }
}

// ✅ 推荐：CSS 状态类控制
updateContainerClasslist(): string {
  const className = bem(
    { [this.direction]: true },
    {
      "close-hidden": !this.showClose,
      "header-hidden": !this.withHeader,
    }
  );
  // ...
}
```

### 3. $mount 中不应执行 DOM 移动操作

**问题**：`$mount()` 钩子在 `connectedCallback` 中触发。如果在 `$mount()` 中执行 DOM 移动操作（如 `appendChild` 将组件移到 `document.body`），会导致组件从原位置移除并重新插入 DOM，从而再次触发 `connectedCallback`，形成无限递归调用。

**解决方案**：将 DOM 移动操作（如 `_handleAppendTo`）放在 `constructor` 中执行，因为 `constructor` 只在元素创建时调用一次，不会因 DOM 移动而重复触发。

```typescript
// ❌ 错误：在 $mount 中执行 DOM 移动会导致无限循环
$mount(): void {
  super.$mount?.();
  this._handleAppendTo();  // appendChild 触发 connectedCallback → $mount → 无限循环
}

// ✅ 正确：在 constructor 中执行 DOM 移动
constructor() {
  super();
  this._handleAppendTo();  // constructor 只执行一次，不会重复触发
}

$mount(): void {
  super.$mount?.();
  this.updateContainerClasslist();  // 只做样式初始化等安全操作
}
```

**安全操作**（可在 `$mount` 中执行）：

- `updateContainerClasslist()` - 更新 CSS 类名
- `setAttribute()` - 设置属性
- DOM 查询和读取

**危险操作**（不可在 `$mount` 中执行）：

- `appendChild()` / `insertBefore()` - DOM 移动
- `remove()` / `removeChild()` - DOM 移除
- 任何会改变组件在 DOM 树中位置的操作

### 测试等待函数使用

**工具函数**：`src/test/utils.js`

```typescript
import { waitForRender } from "./utils.js";
```

**使用场景**：

```typescript
// 默认等待 100ms（适用于大多数组件渲染）
await waitForRender();

// 自定义等待时间
await waitForRender(200);

// 立即执行（0ms，用于微任务等待）
await waitForRender(0);
```

**典型用例**：

```typescript
describe("Component Tests", () => {
  it("属性变化后应该正确更新", async () => {
    const component = document.createElement("ea-component");
    component.setAttribute("size", "large");
    container.appendChild(component);

    // 等待组件渲染完成
    await waitForRender();

    // 验证更新后的状态
    expect(component.size).toBe("large");
  });
});
```

**注意事项**：

- 组件属性变化后需要等待渲染：使用 `waitForRender()`
- 图片加载等异步操作：使用 `waitForRender(100)` 或更长
- 微任务等待（如属性 setter 执行）：使用 `waitForRender(0)`

---

## 测试开发技能

### 组件测试标准模式

基于 `ea-avatar.test.js` 的测试逻辑，所有组件测试遵循以下模式：

#### 1. 测试文件模板

```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入被测试组件
import "../components/ea-component/index";

describe("EaComponent", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("基本功能", () => {
    it("应该正确渲染", () => {
      const component = document.createElement("ea-component");
      container.appendChild(component);
      expect(component.shadowRoot).toBeDefined();
    });
  });
});
```

#### 2. 属性测试模式

**设置属性后验证（100ms 等待）**：

```javascript
it("应该正确应用属性", async () => {
  const component = document.createElement("ea-component");
  component.setAttribute("prop", "value");
  container.appendChild(component);

  await new Promise(resolve => setTimeout(resolve, 100));

  expect(component.prop).toBe("value");
});
```

**属性变化验证**：

```javascript
it("属性变化时应该更新", async () => {
  const component = document.createElement("ea-component");
  component.setAttribute("prop", "old");
  container.appendChild(component);

  await new Promise(resolve => setTimeout(resolve, 100));
  expect(component.prop).toBe("old");

  component.setAttribute("prop", "new");
  await new Promise(resolve => setTimeout(resolve, 100));

  expect(component.prop).toBe("new");
});
```

#### 3. 事件测试模式

```javascript
it("应该触发事件", async () => {
  const component = document.createElement("ea-component");
  container.appendChild(component);

  const handler = vi.fn();
  component.addEventListener("event-name", handler);

  // 触发事件的操作
  await new Promise(resolve => setTimeout(resolve, 100));

  expect(handler).toHaveBeenCalled();
});
```

#### 4. 复杂场景测试模式

```javascript
it("应该支持多属性组合", async () => {
  const component = document.createElement("ea-component");
  component.setAttribute("prop1", "value1");
  component.setAttribute("prop2", "value2");
  container.appendChild(component);

  await new Promise(resolve => setTimeout(resolve, 100));

  expect(component.prop1).toBe("value1");
  expect(component.prop2).toBe("value2");
});
```

### 等待时间选择指南

| 场景              | 等待时间 | 示例                                   |
| ----------------- | -------- | -------------------------------------- |
| 同步属性读取      | 0ms      | `expect(component.prop).toBe("value")` |
| 组件渲染/属性更新 | 100ms    | 大多数异步渲染场景                     |
| 图片加载          | 100ms    | 图片资源加载                           |
| DOM 结构验证      | 无需等待 | `expect(element).toBeDefined()`        |

### DOMPurify 属性丢失问题处理

**问题场景**：
当测试失败，且组件属性（如 `srcset`）为空或丢失时，优先考虑 DOMPurify 清洗导致的问题。

**诊断步骤**：

1. 检查组件是否使用 `html()` 函数处理包含该属性的 HTML 字符串
2. 在浏览器中测试是否正常（DOMPurify 在浏览器和 JSDOM 环境行为可能不同）
3. 确认属性值是否包含 `data:` URI（这类 URI 在 JSDOM 中可能被过滤）

**解决方案**：
使用 DOM API 替代 HTML 字符串：

```typescript
// ❌ 不推荐：HTML 字符串可能被清洗
private _loadImage(src: string): void {
  this._container.innerHTML = html(
    `<img src="${src}" srcset="${this["src-set"]}" />`
  );
}

// ✅ 推荐：使用 DOM API 设置属性
private _renderImage(src: string): void {
  const img = document.createElement("img");
  img.src = src;
  img.srcset = this["src-set"];  // 直接设置属性，绕过 DOMPurify
  this._container.innerHTML = "";
  this._container.appendChild(img);
}
```

**参考案例**：

- [ea-avatar/index.ts](file:///e:/repo/ea-ui-component/src/components/ea-avatar/index.ts) - 使用 DOM API 处理 srcset 属性
