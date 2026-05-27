---
name: "bem"
description: "BEM class name generation using createBEM() in TypeScript. Invoke when creating or updating component CSS class names in TS code."
---

# BEM 类名生成（TypeScript 侧）

使用 `createBEM` 工具函数在 TypeScript 中生成 BEM 规范的 CSS 类名。

## 导入方式

```typescript
import EaBase, { createBEM } from "@core/EaBase";

const TAG_NAME = "ea-component" as const;
const bem = createBEM(TAG_NAME);
```

## API 参考

### 主函数调用

```typescript
bem(modifiers?, states?): string
```

- `modifiers`：对象形式，键为修饰符名，值为 `true`（生成 `block--key`）、字符串/数字（生成 `block--key-value`）、`false/undefined/null`（忽略）
- `states`：对象形式，键为状态名，值为 `true` 或空字符串时生成 `is-key`，其他值忽略
- 始终包含基础块类名

### 挂载方法

| 方法 | 返回值 | 说明 |
|------|--------|------|
| `bem.b()` | `"ea-component"` | 块类名 |
| `bem.cb()` | `".ea-component"` | 块类名选择器 |
| `bem.e(name)` | `"ea-component__content"` | 元素类名 |
| `bem.ce(name)` | `".ea-component__content"` | 元素类名选择器 |
| `bem.m(...names)` | `"ea-component--primary ea-component--large"` | 修饰符类名 |
| `bem.cm(...names)` | `".ea-component--primary"` | 修饰符类名选择器 |
| `bem.s(...names)` | `"is-active is-disabled"` | 状态类名 |
| `bem.cs(...names)` | `".is-active"` | 状态类名选择器 |

## 使用示例

### 模板中定义元素类名

```typescript
html(): string {
  return `
    <div class="${bem()}" part="container">
      <sup class="${bem.e('content')}" part="content"></sup>
      <slot></slot>
    </div>
  `;
}
```

### updateContainerClasslist 方法

```typescript
updateContainerClasslist(): string {
  const className = bem(
    { [this.variant]: true },
    { disabled: this.disabled, hidden: isHidden }
  );

  if (this._container) {
    this._container.className = className;
  }

  return className;
}
```

### 修饰符类名

```typescript
bem({ primary: true })              // 'ea-component ea-component--primary'
bem({ size: 'large' })              // 'ea-component ea-component--size-large'
bem.m('primary', 'large')           // 'ea-component--primary ea-component--large'
bem.cm('primary')                   // '.ea-component--primary'
```

### 状态类名

```typescript
bem({}, { center: true })           // 'ea-component is-center'
bem({}, { active: this.isActive })  // 'ea-component' 或 'ea-component is-active'
bem.s('active', 'disabled')         // 'is-active is-disabled'
bem.cs('active')                    // '.is-active'
```

### 组合使用

```typescript
bem(
  { [this.variant]: true, [this.size]: true },
  { disabled: this.disabled, center: this.center }
);
// 'ea-component ea-component--primary ea-component--large is-disabled is-center'
```

## 命名规范

1. **块名**：使用组件标签名（如 `ea-badge`）
2. **元素名**：使用小写单词，多个单词用连字符（如 `content`, `close-btn`）
3. **修饰符名**：使用小写单词，布尔值或字符串（如 `{ primary: true }`, `{ size: 'large' }`）
4. **状态名**：使用小写单词，布尔值（如 `{ hidden: true }`, `{ active: this.isActive }`）

## 与 SCSS 配合

TypeScript 中 `createBEM` 生成的类名与 SCSS 中 `@include block/element/modifier/state` 的结构一一对应，参见 `bem-mixin` 技能。
