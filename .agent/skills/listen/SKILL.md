---
name: "listen"
description: "@listen decorator for event binding with automatic cleanup. Invoke when adding event listeners to components, including event delegation and special targets."
---

# @listen 装饰器

绑定事件监听器，支持事件委托和自动清理。

## 导入

```typescript
import { CustomElement, listen } from "@decorator";
```

## API

```typescript
@listen(eventName: string, selector?: string, options?: ListenOptions)
```

### 参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `eventName` | `string` | 事件名称（如 "click", "input", "transitionend"） |
| `selector` | `string?` | 可选，事件委托选择器或特殊目标 |
| `options` | `ListenOptions?` | 可选，监听器选项 |

### selector 特殊值

| selector 值 | 监听目标 | 事件委托 |
|-------------|---------|---------|
| 不传（undefined） | 组件自身 (`element`) | 无委托 |
| `"window"` | `window` | 无委托 |
| `"document"` | `document` | 无委托 |
| `"shadowRoot"` | `element.shadowRoot` | 无委托 |
| CSS 选择器 | `element.shadowRoot` | **事件委托**：通过 `composedPath()` + `closest()` 判断 |

### ListenOptions

| 属性 | 类型 | 说明 |
|------|------|------|
| `capture` | `boolean` | 是否在捕获阶段监听 |
| `passive` | `boolean` | 是否为被动监听器 |
| `once` | `boolean` | 是否只触发一次 |

## 使用示例

### 监听组件自身事件

```typescript
@listen("click")
private _handleClick(e: Event) {
  // 处理点击
}
```

### 事件委托（监听特定选择器）

```typescript
@listen("click", ".ea-component__button")
private _handleButtonClick(e: Event) {
  // 处理按钮点击
}

@listen("input", ".ea-component__input")
private _handleInput(e: Event) {
  // 处理输入
}
```

### 监听特殊目标

```typescript
@listen("resize", "window")
private _handleResize(e: Event) {
  // 处理窗口大小变化
}

@listen("click", "document")
private _handleDocumentClick(e: Event) {
  // 处理文档点击（如关闭弹出层）
}

@listen("slotchange", "shadowRoot")
private _handleSlotChange(e: Event) {
  // 处理 slot 变化
}
```

### 带选项

```typescript
@listen("touchstart", ".ea-component__handle", { passive: true })
private _handleTouchStart(e: Event) {
  // 被动监听器，提升滚动性能
}

@listen("click", ".ea-component__close", { once: true })
private _handleCloseOnce(e: Event) {
  // 只触发一次
}

@listen("click", ".ea-component__item", { capture: true })
private _handleCaptureClick(e: Event) {
  // 捕获阶段监听
}
```

## 核心行为

- **自动绑定**：在 `connectedCallback` 时自动绑定事件监听
- **自动清理**：在 `disconnectedCallback` 时通过 `AbortController` 自动移除监听
- **事件委托**：使用 `composedPath()` 正确处理跨 Shadow DOM boundary 的事件
- **委托匹配**：确保匹配元素在当前 `shadowRoot` 内或为 shadow host 本身

## 命名规范

事件处理方法使用 `_handle` 前缀：

```typescript
@listen("click", ".ea-button")
private _handleButtonClick(e: Event) { }

@listen("input")
private _handleInput(e: Event) { }

@listen("change", ".ea-select")
private _handleChange(e: Event) { }
```

## JSDoc 注释规范

每个 `@listen` 事件处理方法必须添加 JSDoc 注释，格式为 `/** 描述 */`；有参数时必须用 `@param` 说明参数：

```typescript
/** 处理按钮点击事件 */
@listen("click", ".ea-component__button")
private _handleButtonClick(e: Event) { }

/**
 * 处理输入事件，校验输入值
 * @param e - 输入事件对象
 */
@listen("input", ".ea-component__input")
private _handleInput(e: Event) { }

/** 处理指针抬起事件，停止长按重复 */
@listen("pointerup", ".ea-component__button")
private _handlePointerUp() { }
```
