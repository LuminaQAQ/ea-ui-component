---
name: "bem"
description: "BEM class name generation and usage guidelines for ea-ui-component. Invoke when creating or updating component CSS class names."
---

# BEM 类名生成规范

本项目使用 `createBEM` 工具函数生成 BEM 规范的 CSS 类名。

## 导入方式

```typescript
import EaBase, { createBEM } from "@core/EaBase";

const TAG_NAME = "ea-component" as const;
const bem = createBEM(TAG_NAME);
```

## API 使用方法

### 1. 基础块类名

```typescript
bem()                    // 'ea-component'
bem.b()                  // 'ea-component'
bem.cb()                 // '.ea-component'
```

### 2. 元素类名 (block__element)

```typescript
bem.e('content')         // 'ea-component__content'
bem.ce('content')        // '.ea-component__content'
```

**使用场景：模板中定义元素类名**

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

### 3. 修饰符类名 (block--modifier)

```typescript
// 对象形式（推荐，用于条件判断）
bem({ primary: true })              // 'ea-component ea-component--primary'
bem({ size: 'large' })              // 'ea-component ea-component--size-large'
bem({ primary: true, large: true }) // 'ea-component ea-component--primary ea-component--large'

// 字符串形式
bem.m('primary', 'large')           // 'ea-component--primary ea-component--large'
bem.cm('primary')                   // '.ea-component--primary'
```

**使用场景：updateContainerClasslist 方法**

```typescript
updateContainerClasslist(): string {
  const className = bem(
    { [this.type]: true },           // 修饰符
    { dot: this.isDot, hidden: isHidden }  // 状态
  );
  
  if (this._container) {
    this._container.className = className;
  }
  
  return className;
}
```

### 4. 状态类名 (is-state)

```typescript
// 对象形式（推荐，用于条件判断）
bem({}, { center: true })           // 'ea-component is-center'
bem({}, { active: this.isActive })  // 'ea-component' 或 'ea-component is-active'

// 字符串形式
bem.s('active', 'disabled')         // 'is-active is-disabled'
bem.cs('active')                    // '.is-active'
```

### 5. 组合使用

```typescript
// 修饰符 + 状态
bem(
  { [this.type]: true, [this.size]: true },  // 修饰符
  { disabled: this.disabled, center: this.center }  // 状态
);
// 结果: 'ea-component ea-component--primary ea-component--large is-disabled is-center'
```

## 完整示例

```typescript
import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-badge" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaBadge extends EaBase {
  @query(".ea-badge")
  private _container!: HTMLElement;

  @attribute({
    type: ["primary", "success", "warning", "danger", "info"] as const,
    default: "danger",
    observer(this: EaBadge) {
      this.updateContainerClasslist();
    },
  })
  type: "primary" | "success" | "warning" | "danger" | "info" = "danger";

  @attribute({ type: Boolean, default: false })
  isDot: boolean = false;

  updateContainerClasslist(): string {
    const isHidden = this.dataHidden || (!this.showZero && Number(this.value) === 0);
    
    // 生成类名：块 + 修饰符 + 状态
    const className = bem(
      { [this.type]: true },           // 修饰符: ea-badge--primary
      { dot: this.isDot, hidden: isHidden }  // 状态: is-dot, is-hidden
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <sup class="${bem.e("content")}" part="content"></sup>
        <slot></slot>
      </div>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
```

## 命名规范

1. **块名**：使用组件标签名（如 `ea-badge`）
2. **元素名**：使用小写单词，多个单词用连字符（如 `content`, `close-btn`）
3. **修饰符名**：使用小写单词，布尔值或字符串（如 `{ primary: true }`, `{ size: 'large' }`）
4. **状态名**：使用小写单词，布尔值（如 `{ hidden: true }`, `{ active: this.isActive }`）

## 与 SCSS 配合

```scss
$name: ea-badge;

@include block($name) {
  // 基础样式
  position: relative;
  display: inline-block;

  @include element(content) {
    // .ea-badge__content
    position: absolute;
    top: 0;
    right: 0;
  }

  @include modifier(primary) {
    // .ea-badge--primary
    background-color: var(--primary-color);
  }

  @include state(hidden) {
    // .is-hidden
    display: none;
  }
}
```
