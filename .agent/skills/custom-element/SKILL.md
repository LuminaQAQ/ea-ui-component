---
name: "custom-element"
description: "@CustomElement decorator for registering Web Components. Invoke when creating new components or modifying component registration options."
---

# @CustomElement 装饰器

注册自定义元素（Web Component），配置 Shadow DOM、样式和属性监听。

## 导入

```typescript
import { CustomElement } from "@decorator";
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

## 组件类 JSDoc 注释

每个组件类必须添加 JSDoc 注释，描述组件的元信息：

```typescript
/**
 * @summary 警告提示组件，用于展示重要的提示信息，支持多种类型和可关闭功能。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot icon - 自定义图标内容。
 * @slot heading - 自定义标题内容。
 * @slot default - 默认插槽，用于描述内容。
 *
 * @event close - 关闭时触发，detail: `{ visible: false }`。
 *
 * @csspart container - 容器元素。
 * @csspart icon-wrap - 图标包裹元素。
 *
 * @cssproperty --ea-alert-height - 组件高度。
 * @cssproperty --ea-alert-bg-color - 组件背景颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaAlert extends EaBase {
```

### JSDoc 标签说明

| 标签 | 必填 | 说明 |
|------|------|------|
| `@summary` | ✅ | 组件的中文简要描述，说明用途和核心功能 |
| `@status` | ✅ | 组件稳定状态：`stable` / `experimental` / `deprecated` |
| `@since` | ✅ | 组件首次引入的版本号 |
| `@dependency` | 条件必填 | 依赖的子组件标签名（无依赖则省略） |
| `@slot` | 条件必填 | 插槽描述，格式：`@slot name - 描述`，默认插槽用 `default` |
| `@event` | 条件必填 | 事件描述，格式：`@event name - 描述，detail: { ... }` |
| `@csspart` | 条件必填 | CSS Part 描述，格式：`@csspart name - 描述` |
| `@cssproperty` | 条件必填 | CSS 自定义属性描述，格式：`@cssproperty --name - 描述` |

### JSDoc 标签顺序

1. `@summary` - 必须为第一个标签
2. `@status`
3. `@since`
4. （空行）
5. `@dependency`（如有）
6. （空行）
7. `@slot`（如有，每个插槽一行）
8. （空行）
9. `@event`（如有，每个事件一行）
10. （空行）
11. `@csspart`（如有，每个 part 一行）
12. （空行）
13. `@cssproperty`（如有，每个属性一行）

## 命名规范

- 元素名必须以 `ea-` 前缀开头
- 使用小写连字符命名（如 `ea-alert`, `ea-button-group`）
- 类名使用大驼峰（如 `EaAlert`, `EaButtonGroup`）
