---
name: "attribute"
description: "@attribute decorator for defining HTML attribute-mapped properties. Invoke when creating or updating component attributes that map to HTML attributes."
---

# @attribute 装饰器

定义映射到 HTML attribute 的响应式属性。

## 导入

```typescript
import { attribute } from "@decorator/attribute";
```

## API

```typescript
@attribute(options: AttributeOptions)
propertyName: type = defaultValue;
```

### AttributeOptions

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | `StringConstructor \| NumberConstructor \| BooleanConstructor \| DateConstructor \| EnumConstructor \| object` | 是 | 属性类型 |
| `default` | `any` | 否 | 默认值 |
| `observer` | `(this: Component, newVal: any, oldVal: any) => void` | 否 | 属性变化回调 |

### 类型说明

| type 值 | 说明 | HTML 行为 |
|---------|------|-----------|
| `String` | 字符串 | 直接映射 |
| `Number` | 数字 | 自动解析为数字 |
| `Boolean` | 布尔 | 属性存在即为 true |
| `Array` | JSON 数组 | JSON.parse 解析 |
| `Object` | JSON 对象 | JSON.parse 解析 |
| `Enum([...])` | 枚举 | 限制可选值 |
| `Date` | 日期 | 自动解析为 Date |

## 使用示例

### 基础属性

```typescript
@attribute({ type: String, default: "" })
heading: string = "";

@attribute({ type: Number, default: 0 })
count: number = 0;

@attribute({ type: Boolean, default: false })
disabled: boolean = false;
```

### 带 observer

```typescript
@attribute({
  type: String,
  default: "",
  observer(this: EaAlert, newVal: string) {
    this._container.innerHTML = html(newVal);
  },
})
content: string = "";
```

### 枚举属性

```typescript
import { Enum } from "@/utils/Enum";

@attribute({
  type: Enum(["small", "medium", "large"]),
  default: "medium",
  observer(this: EaComponent) {
    this.updateContainerClasslist();
  },
})
size: string = "medium";
```

### Variant 属性

```typescript
import { Enum } from "@/utils/Enum";
import { VARIANT_TYPES, VARIANT_DEFAULT, type VariantType } from "@/constants/variant";

@attribute({
  type: Enum(VARIANT_TYPES),
  default: VARIANT_DEFAULT,
  observer(this: EaAlert, newVal: VariantType) {
    this.updateContainerClasslist();
  },
})
variant: VariantType = VARIANT_DEFAULT;
```

## 属性命名规则

- **类属性使用小驼峰命名**（如 `closeText`, `showIcon`）
- **框架自动转换为连字符命名**作为 HTML 属性（如 `close-text`, `show-icon`）
- **无需显式声明 `name` 选项**，装饰器会自动处理命名转换

```typescript
@attribute({ type: String, default: "" })
closeText: string = "";  // HTML: close-text=""

@attribute({ type: Boolean, default: false })
showIcon: boolean = false;  // HTML: show-icon
```

## 核心行为

- 装饰器将属性配置注册到全局 `ElementAttributesMap`
- `@CustomElement` 自动收集 `@attribute` 注册的属性，生成 `observedAttributes`
- 通过 `Object.defineProperty` 为每个属性创建 getter/setter
- getter 从 HTML attribute 读取值，Boolean 类型通过 `hasAttribute` 判断
- setter 对 Boolean 类型用 `toggleAttribute`，其他类型用 `setAttribute`
- `attributeChangedCallback` 中自动调用 observer 回调

## 常见陷阱

### 避免使用 HTMLElement 保留属性名

`title`, `lang`, `dir`, `draggable`, `tabIndex`, `style`, `className`, `id`, `hidden`, `accessKey`, `contentEditable` 等是 HTMLElement 保留属性，使用 `@attribute` 声明同名属性会导致 jsdom 升级失败。

- `title` → `heading`
- `type` → `variant`
