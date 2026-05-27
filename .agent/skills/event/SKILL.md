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

自定义事件类的事件名**统一使用 `ea-` 前缀**：

| 事件类别 | 前缀 | 示例 |
|---------|------|------|
| 标准语义事件（change, close, open 等） | `ea-` | `ea-change`, `ea-close`, `ea-open` |
| 组件特有事件 | `ea-` | `ea-sort-change`, `ea-visible-change`, `ea-check` |

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

```typescript
// events/EaComponentChangeEvent.ts
export interface EaComponentChangeEventDetail {
  value: string;
  checked: boolean;
}

export class EaComponentChangeEvent extends Event {
  readonly detail: EaComponentChangeEventDetail;

  constructor(detail: EaComponentChangeEventDetail) {
    super("ea-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-change": EaComponentChangeEvent;
  }
}
```

### 关键规范

1. **事件名**：`super()` 中的事件名统一使用 `ea-` 前缀
2. **Detail 接口**：必须定义独立的 `export interface`，命名为 `Ea{Component}{Action}EventDetail`
3. **Detail 属性**：使用 `readonly` 修饰符，确保不可变
4. **构造选项**：默认 `{ bubbles: true, composed: true }`；需要阻止默认行为时添加 `cancelable: true`
5. **全局类型注册**：统一注册到 `GlobalEventHandlersEventMap`，禁止使用 `HTMLElementEventMap`
6. **类命名**：`Ea{Component}{Action}Event`（如 `EaTableSortChangeEvent`、`EaTreeCheckEvent`）

### 使用自定义事件

```typescript
import { EaComponentChangeEvent } from "./events/EaComponentChangeEvent";

this.dispatchEvent(new EaComponentChangeEvent({ value: "new", checked: true }));
```

### 在外部监听

```typescript
import { EaComponentChangeEvent } from "@components/ea-component/events/EaComponentChangeEvent";

component.addEventListener("ea-change", (e: EaComponentChangeEvent) => {
  console.log(e.detail.value);
  console.log(e.detail.checked);
});
```

## 事件名速查

### 对外公开事件（自定义事件类，ea- 前缀）

| 事件名 | 用途 | 典型组件 |
|--------|------|---------|
| `ea-change` | 值变化 | checkbox、switch、slider、input-number |
| `ea-sort-change` | 排序变化 | table |
| `ea-current-change` | 当前项变化 | table、tree、pagination |
| `ea-check` / `ea-check-change` | 勾选变化 | tree |
| `ea-clear` | 清除操作 | input、select、color-picker |
| `ea-remove-tag` | 移除标签 | select、tag |
| `ea-visible-change` | 下拉框显隐变化 | select、picker |
| `ea-select` / `ea-select-all` | 选中变化 | table |
| `ea-row-click` / `ea-cell-click` | 行/单元格点击 | table |

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
    super("ea-change", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}

// 使用时可通过 preventDefault() 阻止
const event = new EaSliderChangeEvent({ value: 50 });
if (!this.dispatchEvent(event)) {
  return;
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
