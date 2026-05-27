---
name: "variant"
description: "Variant type system for component visual variants. Invoke when defining component variant/type attributes using VARIANT_TYPES constant and Enum utility."
---

# Variant 类型系统

统一管理组件视觉变体类型的规范，使用 `VARIANT_TYPES` 常量和 `Enum` 工具。

## 常量定义

定义在 `src/constants/variant.ts`：

```typescript
export const VARIANT_TYPES = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
] as const;

export type VariantType = (typeof VARIANT_TYPES)[number];
export const VARIANT_DEFAULT = "info";

export const VARIANT_ICON_MAP: Record<string, string> = {
  primary: "circle-info",
  success: "circle-check",
  info: "circle-info",
  warning: "triangle-exclamation",
  danger: "circle-xmark",
  error: "circle-xmark",
};
```

## Enum 工具

导入路径：`@/utils/Enum` 或 `@utils/Enum`

```typescript
import { Enum } from "@/utils/Enum";

// 传入数组
Enum(VARIANT_TYPES)  // 返回数组本身

// 传入多个参数
Enum("a", "b", "c")  // 返回 ["a", "b", "c"]
```

`Enum()` 本质是标识函数，让 `@attribute` 的 `type` 字段区分枚举类型和普通构造器。

## 使用方式

### 基础用法

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

### 扩展 variant 值

```typescript
@attribute({
  type: Enum([...VARIANT_TYPES, "normal"]),
  default: "normal",
  observer(this: EaComponent) {
    this.updateContainerClasslist();
  },
})
variant: VariantType | "normal" = "normal";
```

### 自定义枚举（非 variant）

```typescript
@attribute({
  type: Enum(["outline", "solid", "dashed"]),
  default: "solid",
})
borderStyle: string = "solid";
```

## 命名规则

- **属性名统一为 `variant`**：用于表示组件视觉变体/类型的属性，不使用 `type`
- **统一使用 `danger`**：作为错误类型，不使用 `error`（`VARIANT_ICON_MAP` 中保留 `error` 做兼容映射）
- **可选值**：`primary`, `success`, `warning`, `danger`, `info`

## 与 BEM 配合

```typescript
updateContainerClasslist(): string {
  const className = bem(
    { [this.variant]: true },
    { disabled: this.disabled }
  );
  this._container.className = className;
  return className;
}
```

```scss
@include block($name) {
  @include modifier(primary) {
    background-color: var(--primary-color);
  }

  @include modifier(success) {
    background-color: var(--green-500);
  }

  @include modifier(danger) {
    background-color: var(--red-500);
  }
}
```

## 图标映射

使用 `VARIANT_ICON_MAP` 获取 variant 对应的图标名：

```typescript
import { VARIANT_ICON_MAP } from "@/constants/variant";

const iconName = VARIANT_ICON_MAP[this.variant]; // 如 "circle-check"
```
