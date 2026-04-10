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
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
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

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem(
      { [this.size]: true },
      { disabled: this.disabled }
    );
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

  @listen("click", ".ea-component__button")
  private _handleClick(e: Event) {
    if (this.disabled) return;
    this.emit("click", { detail: { target: e.target } });
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

**类型说明：**
- `String` - 字符串类型
- `Number` - 数字类型
- `Boolean` - 布尔类型（HTML 中属性存在即为 true）
- `Array` - JSON 数组
- `Object` - JSON 对象
- `["a", "b", "c"] as const` - 枚举类型，限制可选值

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
bem()                          // "ea-component"

// 带修饰符
bem({ size: "large" })         // "ea-component ea-component--size-large"
bem({ [this.type]: true })     // "ea-component ea-component--primary"

// 带状态
bem({}, { disabled: true })    // "ea-component is-disabled"
bem({}, { active: this.active }) // "ea-component" 或 "ea-component is-active"

// 组合使用
bem(
  { [this.type]: true, [this.size]: true },
  { disabled: this.disabled, center: this.center }
)
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
// 简单事件
this.emit("focus");
this.emit("blur");

// 带数据的事件
this.emit("change", {
  detail: {
    value: newVal,
    label: item.label,
  },
});
```

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

| 方法 | 说明 | 调用时机 |
|------|------|----------|
| `$mount()` | 组件挂载 | connectedCallback 后，首次渲染前 |
| `$beforeUnmount()` | 组件销毁前 | disconnectedCallback 开始时 |
| `$unmounted()` | 组件销毁后 | disconnectedCallback 结束时 |
| `$updated()` | 属性更新 | attributeChangedCallback 后 |

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

| 函数类型 | 前缀 | 示例 | 说明 |
|----------|------|------|------|
| 事件处理 | `_handle` | `_handleClick`, `_handleInput` | 事件回调 |
| 私有方法 | `_` | `_updateUI`, `_renderData` | 组件内部使用 |
| 公共方法 | 无 | `setData`, `show`, `hide` | 对外 API |
| 生命周期 | `$` | `$mount`, `$beforeUnmount` | 生命周期钩子 |
| 渲染相关 | `_render` | `_renderItems` | 渲染方法 |

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
