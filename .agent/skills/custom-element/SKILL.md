---
name: "custom-element"
description: "@CustomElement decorator for registering Web Components. Invoke when creating new components or modifying component registration options."
---

# @CustomElement 装饰器

注册自定义元素（Web Component），配置 Shadow DOM、样式和属性监听。

## 导入

```typescript
import { CustomElement } from "@decorator/custom-element";
```

## API

```typescript
@CustomElement(elementName: string, options?: CustomElementOptions)
```

### CustomElementOptions

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `autoDefine` | `boolean` | `true` | 是否自动调用 `customElements.define()` 注册 |
| `styles` | `string \| string[]` | — | 组件的 CSS 样式字符串（通常通过 `?inline` 导入 SCSS） |
| `extraAttr` | `string \| string[]` | — | 额外需要监听的 HTML attribute 名称 |

## 使用示例

### 基础用法

```typescript
import stylesheet from "./index.scss?inline";

@CustomElement("ea-alert", { styles: [stylesheet] })
export class EaAlert extends EaBase {
  // ...
}
```

### 多样式表

```typescript
import stylesheet from "./index.scss?inline";
import sharedStyles from "../shared/styles.scss?inline";

@CustomElement("ea-component", {
  styles: [sharedStyles, stylesheet],
})
export class EaComponent extends EaBase {
  // ...
}
```

### 额外属性监听

```typescript
@CustomElement("ea-input", {
  styles: [stylesheet],
  extraAttr: ["value", "type"],
})
export class EaInput extends EaBase {
  // extraAttr 中的属性会被加入 observedAttributes
}
```

### 禁用自动注册

```typescript
@CustomElement("ea-base", {
  styles: [variable],
  autoDefine: false,
})
export default class EaBase extends HTMLElement {
  // 基类通常不自动注册
}
```

## 核心行为

1. **创建 Shadow DOM**：`mode: "open"`
2. **自动收集属性**：遍历继承链上所有 `@attribute` 注册的属性，生成 `observedAttributes`
3. **属性 getter/setter**：为每个 `@attribute` 属性创建 `Object.defineProperty`
4. **connectedCallback 流程**：
   - 防重复初始化检查
   - 设置 `tabIndex`
   - `requestAnimationFrame` 中：清空 shadowRoot → 应用样式 → 渲染模板 → `$mount()` → `$mounted()`
5. **样式优化**：优先使用 `adoptedStyleSheets`，降级为 `<style>` 标签
6. **模板渲染**：自动通过 `html()` 函数进行 XSS 清洗
7. **支持继承**：遍历原型链收集父类的属性和样式

## 命名规范

- 元素名必须以 `ea-` 前缀开头
- 使用小写连字符命名（如 `ea-alert`, `ea-button-group`）
- 类名使用大驼峰（如 `EaAlert`, `EaButtonGroup`）
