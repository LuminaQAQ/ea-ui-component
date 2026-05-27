---
name: "event"
description: "Event system for Web Components including emit() and custom event classes. Invoke when creating or updating component events."
---

# 事件系统

组件事件派发和自定义事件类的规范。

## 派发事件

### 简单事件

```typescript
this.emit("focus");
this.emit("blur");
this.emit("open");
this.emit("close");
```

### 带数据的事件

```typescript
this.emit("change", {
  detail: {
    value: newVal,
    label: item.label,
  },
});

this.emit("close", {
  detail: { visible: false },
});
```

### emit() 签名

```typescript
emit(eventName: string, options?: CustomEventInit): boolean
```

默认配置：`bubbles: true, composed: true, cancelable: false`

## 自定义事件类（ea- 前缀）

对于需要强类型和详细 detail 结构的事件，创建自定义事件类。

### 定义事件类

```typescript
// events/EaComponentChangeEvent.ts
export class EaComponentChangeEvent extends Event {
  readonly detail: { value: string; label: string };

  constructor(detail: { value: string; label: string }) {
    super("ea-change", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}
```

### 注册全局事件类型

```typescript
declare global {
  interface GlobalEventHandlersEventMap {
    "ea-change": EaComponentChangeEvent;
  }
}
```

### 使用自定义事件

```typescript
this.dispatchEvent(new EaComponentChangeEvent({ value: "new", label: "New" }));
```

### 在外部监听

```typescript
component.addEventListener("ea-change", (e: EaComponentChangeEvent) => {
  console.log(e.detail.value);
  console.log(e.detail.label);
});
```

## 命名规范

| 事件类型 | 命名格式 | 示例 |
|---------|---------|------|
| 普通事件 | 小写单词 | `close`, `open`, `change`, `focus` |
| 自定义事件类 | `ea-` 前缀 | `ea-change`, `ea-close`, `ea-select` |
| 事件类名 | `Ea{Component}{Action}Event` | `EaAlertCloseEvent`, `EaCheckboxChangeEvent` |

## 事件文件组织

```
ea-component/
├── index.ts
├── index.scss
├── types.d.ts
└── events/
    └── EaComponentChangeEvent.ts
```

## 常见模式

### 带验证的事件

```typescript
@listen("click", ".ea-component__submit")
private _handleSubmit(e: Event) {
  if (this.disabled) return;
  this.emit("submit", { detail: { value: this._input.value } });
}
```

### 双事件模式

```typescript
// 普通事件（简单通知）
this.emit("close", { detail: { visible: false } });

// 自定义事件类（带动画状态）
this.dispatchEvent(new EaDrawerCloseEvent({ visible: false }));
```
