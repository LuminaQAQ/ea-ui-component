---
name: "lifecycle"
description: "Component lifecycle methods including $mount, $mounted, $beforeUnmount, $unmounted, $updated. Invoke when implementing component lifecycle hooks."
---

# 生命周期方法

组件生命周期钩子，定义在 `EaBase` 基类中，子类可覆盖。

## 生命周期概览

| 方法 | 签名 | 调用时机 |
|------|------|---------|
| `html()` | `(): string` | `connectedCallback` 中调用，返回 HTML 模板字符串 |
| `$mount()` | `(): void` | `connectedCallback` 后，`requestAnimationFrame` 中调用 |
| `$mounted()` | `(): void` | `$mount()` 之后调用 |
| `$beforeUnmount()` | `(): void` | `disconnectedCallback` 开始时调用 |
| `$unmounted()` | `(): void` | `disconnectedCallback` 结束时调用 |
| `$updated(data)` | `(): void` | `attributeChangedCallback` 后调用，参数 `{ key, newVal, oldVal }` |
| `$updateLocalization(locale)` | `(): void` | `locale` 属性变化时调用 |

## 调用流程

### connectedCallback

```
connectedCallback
  → 防重复初始化检查
  → 设置 tabIndex
  → requestAnimationFrame
    → 清空 shadowRoot
    → 应用样式
    → 渲染模板（调用 html()）
    → $mount()
    → resolve _isRendered
    → $mounted()
```

### disconnectedCallback

```
disconnectedCallback
  → $beforeUnmount() + 触发 beforeUnmount 事件
  → $unmounted() + 触发 unmounted 事件
  → 重置状态
```

### attributeChangedCallback

```
attributeChangedCallback
  → await this._isRendered（确保组件已渲染）
  → 调用属性的 observer 回调
  → $updated({ key, newVal, oldVal })
  → 触发 updated 事件
```

## 使用示例

### 基础生命周期

```typescript
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaComponent extends EaBase {
  html(): string {
    return `<div class="${bem()}" part="container"><slot></slot></div>`;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }

  $mounted(): void {
    // 组件已完全挂载，可安全访问 DOM
  }

  $beforeUnmount(): void {
    this._transitionAbortController?.abort();
    this._resizeObserver?.disconnect();
  }

  $unmounted(): void {
    // 组件已完全销毁
  }

  $updated(data: { key: string; newVal: any; oldVal?: any }): void {
    // 属性更新后
  }
}
```

### AbortController 管理

对于需要手动管理的事件监听（`@listen` 无法覆盖的场景）：

```typescript
private _transitionAbortController?: AbortController;

private _startTransition() {
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

## 常见陷阱

### $mount 中不应执行 DOM 移动操作

`$mount()` 在 `connectedCallback` 中触发。执行 DOM 移动操作（如 `appendChild` 将组件移到 `document.body`）会导致无限递归。

```typescript
// ❌ 错误：在 $mount 中执行 DOM 移动会导致无限循环
$mount(): void {
  super.$mount?.();
  this._handleAppendTo();
}

// ✅ 正确：在 constructor 中执行 DOM 移动
constructor() {
  super();
  this._handleAppendTo();
}

$mount(): void {
  super.$mount?.();
  this.updateContainerClasslist();
}
```

**安全操作**：`updateContainerClasslist()`、`setAttribute()`、DOM 查询和读取
**危险操作**：`appendChild()`、`insertBefore()`、`remove()`、`removeChild()`
