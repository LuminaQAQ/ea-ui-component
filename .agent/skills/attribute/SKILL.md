---
name: "attribute"
description: "@attribute decorator for defining HTML attribute-mapped properties. Invoke when creating or updating component attributes that map to HTML attributes."
---

# @attribute 装饰器

定义映射到 HTML attribute 的响应式属性。

## 导入

```typescript
import { CustomElement, attribute } from "@decorator";
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
| `a11y` | `A11yOption` | 否 | 无障碍属性同步配置 |

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
import { Enum } from "@utils/Enum";

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
import { Enum } from "@utils/Enum";
import { VARIANT_TYPES, VARIANT_DEFAULT, type VariantType } from "@constants/variant";

@attribute({
  type: Enum(VARIANT_TYPES),
  default: VARIANT_DEFAULT,
  observer(this: EaAlert, newVal: VariantType) {
    this.updateContainerClasslist();
  },
})
variant: VariantType = VARIANT_DEFAULT;
```

### a11y 无障碍属性同步

当属性变化时需要同步更新 ARIA 属性（如 `aria-disabled`、`aria-expanded`、`aria-checked`）或 HTML `inert` 属性时，**必须使用 `a11y` 选项**，禁止在 observer 中手动 `setAttribute`/`removeAttribute`。

#### A11yOption 配置

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `ariaAttr` | `string` | 是 | 同步到的 ARIA 属性名（如 `"aria-disabled"`、`"aria-expanded"`、`"inert"`） |
| `target` | `string` | 否 | 目标元素 CSS 选择器，默认 `":host"` 表示组件宿主元素 |
| `map` | `(val: any) => string \| null` | 否 | 值映射函数，返回 `null` 时移除属性；省略时用 `String(value)` |

#### 基础用法：宿主元素 ARIA 属性

```typescript
@attribute({
  type: Boolean,
  default: false,
  a11y: {
    ariaAttr: "aria-disabled",
    map: v => String(v),
  },
})
disabled: boolean = false;
```

#### 目标元素为 Shadow DOM 内部元素

```typescript
@attribute({
  type: Boolean,
  default: false,
  a11y: {
    ariaAttr: "aria-expanded",
    target: ".ea-sub-menu__title",
  },
})
open: boolean = false;
```

#### 条件移除属性（map 返回 null）

```typescript
// placeholder 为空时移除 aria-label
@attribute({
  type: String,
  default: "",
  a11y: {
    ariaAttr: "aria-label",
    map: v => v || null,
  },
})
placeholder: string = "";

// 关闭时设置 inert，打开时移除
@attribute({
  type: Boolean,
  default: false,
  a11y: {
    ariaAttr: "inert",
    target: ".ea-collapse-item__content",
    map: v => v ? null : "",
  },
})
active: boolean = false;
```

#### 常见 a11y 映射模式

| 场景 | ariaAttr | map | 说明 |
|------|----------|-----|------|
| `disabled` → `aria-disabled` | `"aria-disabled"` | `v => String(v)` | 布尔属性映射 |
| `checked` → `aria-checked` | `"aria-checked"` | `v => String(!!v)` | 布尔属性映射 |
| `open` → `aria-expanded` | `"aria-expanded"` | 无需 map | 默认 `String(value)` |
| `open` → `inert`（关闭时阻止焦点） | `"inert"` | `v => v ? null : ""` | 打开时移除 inert |
| `placeholder` → `aria-label` | `"aria-label"` | `v => v \|\| null` | 空值时移除属性 |
| `filterable` → `aria-autocomplete` | `"aria-autocomplete"` | `v => v ? "both" : null` | 条件映射 |
| `value` → `aria-valuenow` | `"aria-valuenow"` | `v => String(v)` | 数值映射 |
| `min` → `aria-valuemin` | `"aria-valuemin"` | `v => String(v)` | 数值映射 |
| `max` → `aria-valuemax` | `"aria-valuemax"` | `v => String(v)` | 数值映射 |

#### 核心行为

- `a11y` 在属性变化时自动调用 `syncA11yAttribute`，无需在 observer 中手动 `setAttribute`
- `connectedCallback` 中 `initA11yAttributes` 自动初始化，不依赖 `$mount` 执行顺序
- `target` 为 `":host"` 时直接操作宿主元素，其他值通过 `shadowRoot.querySelector` 查找
- `map` 返回 `null` 时调用 `removeAttribute`，返回字符串时调用 `setAttribute`

#### 不适用 a11y 的场景

以下场景仍需手动管理，不适合使用 `a11y` 选项：

- **动态 ID 引用**：`aria-activedescendant`、`aria-labelledby`、`aria-describedby` 的值是子元素动态 ID
- **多元素批量操作**：循环中对多个动态创建的元素设置 ARIA 属性
- **Light DOM 目标**：`target` 只支持 Shadow DOM 内部元素，不支持 Light DOM
- **复杂条件逻辑**：多个属性共同决定一个 ARIA 属性的值（如 `disabled || limitDisabled`）
- **一次性静态设置**：`_setupAria()` 中的 `id`、`aria-controls`、`aria-haspopup` 等不随属性变化的设置

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
