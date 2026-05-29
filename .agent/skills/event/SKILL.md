---
name: "event"
description: "Event system for Web Components including emit() and custom event classes. Invoke when creating or updating component events."
---

# 事件系统

组件事件的派发规范，包括自定义事件类（对外公开）和 `emit()`（内部通信）两种模式。

## 模式选择规则

| 场景 | 模式 | 理由 |
|------|------|------|
| 对外公开事件（用户监听的） | 自定义事件类 | 控制台显示类名（如 `EaCheckboxChangeEvent`），类型安全 |
| 父子组件内部通信 | `this.emit()` | 轻量级，无需定义事件类 |

**为什么自定义事件类用于对外公开事件？**

在浏览器控制台中：
- `dispatchEvent(new EaCheckboxChangeEvent(...))` → 显示为 `EaCheckboxChangeEvent { detail: { value, checked } }`
- `this.emit("change", { detail: {...} })` → 显示为 `CustomEvent { type: "change", detail: {...} }`

自定义事件类提供了更好的调试体验和类型安全。

## emit() 模式

`this.emit()` 仅用于父子组件内部通信，事件名统一使用 `ea-` 前缀标识其内部性质。

### 内部通信事件

```typescript
// ea-tab 向 ea-tabs 通知关闭按钮点击
this.emit("ea-tab-close-icon-click", { detail: { name: this.name } });

// ea-sub-menu 向 ea-menu 通知点击
this.emit("ea-sub-menu-click", { detail: { index, item } });

// ea-dropdown-item 向 ea-dropdown 通知点击
this.emit("ea-dropdown-item-click", { detail: { value } });
```

### emit() 签名

```typescript
emit(eventName: string, options?: CustomEventInit): boolean
```

默认配置：`bubbles: true, composed: true, cancelable: false`

### 命名规则

`this.emit()` 的事件名统一使用 `ea-` 前缀，格式为 `ea-{component}-{action}`：

```typescript
// ✅ 正确：ea- 前缀标识内部通信
this.emit("ea-tab-close-icon-click", { detail: { name } });
this.emit("ea-sub-menu-click", { detail: { index, item } });

// ❌ 错误：无前缀，外部用户可能误监听
this.emit("close-icon-click", { detail: { name } });
this.emit("click", { detail: { index, item } });
```

## 自定义事件类

对于对外公开的事件（用户监听的），创建自定义事件类。

### 事件命名规则

自定义事件类的事件名应**优先使用原生事件名**，仅在没有原生对应事件时使用 `ea-` 前缀：

| 事件类别 | 命名策略 | 示例 |
|---------|---------|------|
| 原生 DOM 事件（focus, blur, change, input 等） | **使用原生事件名** | `focus`, `blur`, `change`, `input` |
| 组件特有事件（无原生对应） | **使用 `ea-` 前缀** | `ea-clear`, `ea-sort-change`, `ea-visible-change` |

**为什么原生事件名优先？**

1. **直觉性**：用户使用表单组件时，天然期望监听 `focus`、`blur`、`change`、`input` 等原生事件名
2. **一致性**：与原生 HTML 元素行为一致，降低学习成本
3. **互操作性**：与框架和工具的事件系统兼容

**原生事件名使用注意事项：**

1. **阻止原生事件泄漏**：在 Shadow DOM 内部监听原生事件后，必须调用 `e.stopPropagation()` 阻止原生事件穿透 Shadow DOM，然后从宿主元素派发自定义事件，防止用户收到两次同名事件
2. **不注册到 GlobalEventHandlersEventMap**：原生事件名（如 `"focus"`、`"change"`）已在内置类型中定义，重复注册会导致类型冲突。仅 `ea-` 前缀的事件名注册到 `GlobalEventHandlersEventMap`

```typescript
// ✅ 正确：原生事件名 + stopPropagation
this._originalWrapper.addEventListener("input", (e: Event) => {
  e.stopPropagation(); // 阻止原生事件穿透 Shadow DOM
  this._handleInput(e);
}, { signal });

// 从宿主元素派发自定义事件
this.dispatchEvent(new EaInputInputEvent({ value }));

// ✅ 正确：组件特有事件使用 ea- 前缀
this.dispatchEvent(new EaInputClearEvent({ oldValue }));

// ❌ 错误：原生事件使用 ea- 前缀
this.dispatchEvent(new EaInputFocusEvent()); // super("ea-focus", ...) ❌
// 应改为 super("focus", ...)
```

### 文件组织

```
ea-component/
├── index.ts
├── index.scss
├── types.d.ts
└── events/
    ├── EaComponentChangeEvent.ts
    └── EaComponentSelectEvent.ts
```

### 定义事件类

#### 原生事件名的事件类

```typescript
// events/EaInputChangeEvent.ts
export interface EaInputChangeEventDetail {
  value: string;
}

export class EaInputChangeEvent extends Event {
  readonly detail: EaInputChangeEventDetail;

  constructor(detail: EaInputChangeEventDetail) {
    super("change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

// 注意：原生事件名不注册到 GlobalEventHandlersEventMap（会与内置类型冲突）
```

#### 组件特有事件的事件类

```typescript
// events/EaInputClearEvent.ts
export interface EaInputClearEventDetail {
  oldValue: string;
}

export class EaInputClearEvent extends Event {
  readonly detail: EaInputClearEventDetail;

  constructor(detail: EaInputClearEventDetail) {
    super("ea-clear", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-clear": EaInputClearEvent;
  }
}
```

### 关键规范

1. **事件名**：优先使用原生事件名，仅组件特有事件使用 `ea-` 前缀
2. **Detail 接口**：必须定义独立的 `export interface`，命名为 `Ea{Component}{Action}EventDetail`
3. **Detail 属性**：使用 `readonly` 修饰符，确保不可变
4. **构造选项**：默认 `{ bubbles: true, composed: true }`；需要阻止默认行为时添加 `cancelable: true`
5. **全局类型注册**：仅 `ea-` 前缀的事件名注册到 `GlobalEventHandlersEventMap`，原生事件名不注册（避免与内置类型冲突）
6. **类命名**：`Ea{Component}{Action}Event`（如 `EaTableSortChangeEvent`、`EaTreeCheckEvent`）
7. **阻止原生事件泄漏**：当事件名与原生事件同名时，必须在 Shadow DOM 内部 `stopPropagation()` 阻止原生事件穿透

### 使用自定义事件

```typescript
import { EaInputChangeEvent } from "./events/EaInputChangeEvent";
import { EaInputClearEvent } from "./events/EaInputClearEvent";

// 原生事件名
this.dispatchEvent(new EaInputChangeEvent({ value: "new" }));

// 组件特有事件
this.dispatchEvent(new EaInputClearEvent({ oldValue: "" }));
```

### 在外部监听

```typescript
import { EaInputChangeEvent } from "@components/ea-input/events/EaInputChangeEvent";
import { EaInputClearEvent } from "@components/ea-input/events/EaInputClearEvent";

// 原生事件名 - 直接使用字符串
component.addEventListener("change", (e: EaInputChangeEvent) => {
  console.log(e.detail.value);
});

// 组件特有事件 - 使用 ea- 前缀
component.addEventListener("ea-clear", (e: EaInputClearEvent) => {
  console.log(e.detail.oldValue);
});
```

## 事件名速查

### 对外公开事件（自定义事件类）

#### 原生事件名

| 事件名 | 用途 | 典型组件 |
|--------|------|---------|
| `focus` | 获得焦点 | input、textarea、select |
| `blur` | 失去焦点 | input、textarea、select |
| `change` | 值提交变化 | input、select、checkbox、switch |
| `input` | 实时输入 | input、textarea |

#### 组件特有事件（`ea-` 前缀）

| 事件名 | 用途 | 典型组件 |
|--------|------|---------|
| `ea-clear` | 清除操作 | input、select、color-picker |
| `ea-sort-change` | 排序变化 | table |
| `ea-current-change` | 当前项变化 | table、tree、pagination |
| `ea-check` / `ea-check-change` | 勾选变化 | tree |
| `ea-remove-tag` | 移除标签 | select、tag |
| `ea-visible-change` | 下拉框显隐变化 | select、picker |
| `ea-select` / `ea-select-all` | 选中变化 | table |
| `ea-row-click` / `ea-cell-click` | 行/单元格点击 | table |
| `ea-close` | 关闭 | alert、tour |

### 内部通信事件（emit 模式，ea- 前缀）

| 事件名 | 用途 | 通信方向 |
|--------|------|---------|
| `ea-tab-close-icon-click` | 关闭按钮点击 | ea-tab → ea-tabs |
| `ea-sub-menu-click` | 子菜单点击 | ea-sub-menu → ea-menu |
| `ea-dropdown-item-click` | 下拉项点击 | ea-dropdown-item → ea-dropdown |
| `ea-transfer-panel-select-change` | 面板选中变化 | panel → ea-transfer |
| `ea-table-column-change` | 列属性变化 | ea-table-column → ea-table |
| `ea-descriptions-item-change` | 描述项属性变化 | ea-descriptions-item → ea-descriptions |
| `collapse-item-click` | 折叠项点击 | ea-collapse-item → ea-collapse |

## 常见模式

### 可取消事件

```typescript
// events/EaSliderChangeEvent.ts
export class EaSliderChangeEvent extends Event {
  readonly detail: EaSliderChangeEventDetail;

  constructor(detail: EaSliderChangeEventDetail) {
    super("change", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}

// 使用时可通过 preventDefault() 阻止
const event = new EaSliderChangeEvent({ value: 50 });
if (!this.dispatchEvent(event)) {
  return;
}
```

### Shadow DOM 内事件代理模式

当组件封装了原生表单元素（如 input、textarea）时，需要阻止原生事件穿透 Shadow DOM，然后从宿主元素重新派发自定义事件：

```typescript
private _bindOriginalEvents(): void {
  const { signal } = this._originalAbortController;

  // 阻止原生 input 事件穿透，派发自定义事件
  this._originalWrapper.addEventListener("input", (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains(bem.e("original"))) return;
    e.stopPropagation(); // 关键：阻止原生事件穿透 Shadow DOM
    this._handleInput(e);
  }, { signal });

  this._originalWrapper.addEventListener("focusin", (e: FocusEvent) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains(bem.e("original"))) return;
    e.stopPropagation();
    this._handleFocus();
  }, { signal });
}

private _handleInput(e: Event): void {
  const { value } = e.target as HTMLInputElement;
  this.value = value;
  this.dispatchEvent(new EaInputInputEvent({ value }));
}

private _handleFocus(): void {
  this._isFocus = true;
  this.updateContainerClasslist();
  this.dispatchEvent(new EaInputFocusEvent());
}
```

### 子组件向父组件通信（emit 模式）

```typescript
// ea-tab 内部
this.emit("ea-tab-close-icon-click", { detail: { name: this.name } });

// ea-tabs 监听
@listen("ea-tab-close-icon-click")
private _handleTabClose(e: CustomEvent) {
  this.dispatchEvent(new EaTabRemoveEvent({ name: e.detail.name }));
}
```

### 命令式组件的事件

命令式创建的组件（message、notification、message-box）在实例工具类中派发事件：

```typescript
// EaMessageInstance.ts
el.emit("show");
el.emit("shown");
el.emit("hide");
el.emit("hidden");
el.emit("close");
```
