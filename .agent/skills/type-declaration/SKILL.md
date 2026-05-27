---
name: "type-declaration"
description: "Type declaration files (types.d.ts) for HTML/Vue/React type support. Invoke when creating or updating component type declarations."
---

# 类型声明文件

为组件创建类型声明，支持 HTML/Vue/React 的类型检查。

## 文件位置

```
ea-component/
├── index.ts
├── index.scss
└── types.d.ts    # 类型声明文件
```

## 完整模板

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
  variant: "primary" | "success" | "warning" | "danger" | "info";
}

// ==================== Vue 类型 ====================

import type { DefineComponent } from "vue";

declare module "vue" {
  interface GlobalComponents {
    "ea-component": DefineComponent<{
      label?: string;
      disabled?: boolean;
      size?: "small" | "medium" | "large";
      variant?: "primary" | "success" | "warning" | "danger" | "info";
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
        variant?: "primary" | "success" | "warning" | "danger" | "info";
      };
    }
  }
}
```

## 生成规则

### 属性列表来源

从 `@attribute` 装饰器定义中提取所有属性，包括：
- 属性名（小驼峰）
- 属性类型
- 是否可选（所有属性在 Vue/React 中标记为可选）

### HTMLElementTagNameMap

必须注册组件标签名到 `HTMLElementTagNameMap`，以支持：

```typescript
const el = document.createElement("ea-component");
el.label = "Hello";  // 类型安全
```

### Vue GlobalComponents

注册到 Vue 的 `GlobalComponents` 接口，以支持模板中的类型提示。

### React JSX IntrinsicElements

注册到 React 的 `JSX.IntrinsicElements` 接口，以支持 JSX 中的类型检查。

## 布尔属性处理

Boolean 属性在 HTML 中通过属性存在性判断，在类型声明中仍声明为 `boolean`：

```typescript
export interface EaAlertElement extends HTMLElement {
  closable: boolean;      // HTML: closable 属性存在即为 true
  showIcon: boolean;      // HTML: show-icon
  center: boolean;        // HTML: center
}
```

## 事件类型

如果组件有自定义事件类，也应在类型声明中导出：

```typescript
export class EaComponentChangeEvent extends Event {
  readonly detail: { value: string; label: string };
}
```
