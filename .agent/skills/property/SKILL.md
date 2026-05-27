---
name: "property"
description: "@property decorator for defining pure JavaScript properties that do NOT map to HTML attributes. Invoke when creating internal component state properties."
---

# @property 装饰器

定义纯 JS 属性，**不映射到 HTML attribute**。适用于组件内部状态、函数类型属性、复杂数据等。

## 导入

```typescript
import { CustomElement, property } from "@decorator";
```

## 与 @attribute 的区别

| 特性 | @attribute | @property |
|------|-----------|-----------|
| 映射 HTML attribute | ✅ 是 | ❌ 否 |
| observedAttributes | ✅ 自动收集 | ❌ 不收集 |
| HTML 中可设置 | ✅ 是 | ❌ 否 |
| 适用场景 | 对外 API 属性 | 内部状态、函数、复杂数据 |

## API

```typescript
@property(options: PropertyOptions)
propertyName: type = defaultValue;
```

### PropertyOptions

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | `StringConstructor \| NumberConstructor \| BooleanConstructor \| DateConstructor \| ArrayConstructor \| RegExpConstructor \| FunctionConstructor \| Object \| any[]` | 是 | 属性类型 |
| `default` | `any` | 否 | 默认值 |
| `observer` | `(this: Component, newVal: any, oldVal: any) => void` | 否 | 属性变化回调 |
| `rawFunction` | `boolean` | 否 | 是否保留函数原始值（不执行函数） |
| `repeatable` | `boolean` | 否 | 是否可重复（用于数组类型） |

## 使用示例

### 内部状态属性

```typescript
@property({ type: Boolean, default: false })
isActive: boolean = false;

@property({ type: String, default: "" })
internalState: string = "";
```

### 函数类型属性

```typescript
@property({ type: Function, default: null, rawFunction: true })
formatTooltip: ((value: number) => string) | null = null;
```

### 数组/对象类型

```typescript
@property({ type: Array, default: [] })
items: any[] = [];

@property({ type: Object, default: {} })
config: Record<string, any> = {};
```

### 带 observer

```typescript
@property({
  type: Boolean,
  default: false,
  observer(this: EaComponent, newVal: boolean) {
    this._updateUI();
  },
})
isExpanded: boolean = false;
```

## 核心行为

- 属性通过 `Object.defineProperty` 的 getter/setter 管理
- 值存储在 `__prop_${name}` 私有字段上
- 不参与 `observedAttributes`，不会触发 `attributeChangedCallback`
- observer 在 setter 中直接调用
