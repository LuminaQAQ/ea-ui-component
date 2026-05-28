---
name: "children"
description: "@children decorator for querying Light DOM children. Invoke when needing to access light DOM child elements in components."
---

# @children 装饰器

从组件的 Light DOM 中查询子元素（与 `@queryAll` 查询 Shadow DOM 互补）。

## 导入

```typescript
import { CustomElement, query, queryAll, children, listen } from "@decorator";
```

## @children(selector)

查询 Light DOM 中所有匹配的子元素，返回 `NodeListOf<Element> | null`：

```typescript
@children("ea-carousel-item:not([slot])")
private _carouselItems!: NodeListOf<HTMLElement>;

@children('ea-carousel-item[slot^="clone-"]')
private _cloneItems!: NodeListOf<HTMLElement>;

@children(".list-item")
private _listItems!: NodeListOf<HTMLElement>;
```

## 核心行为

- 通过 `Object.defineProperty` 定义 getter
- **每次访问时动态查询**（非缓存），确保获取最新 DOM 状态
- 查询范围限定在 `element` 自身（Light DOM），使用 `this.querySelectorAll(selector)`
- 兼容新版（TC39 Stage 3）和旧版（experimentalDecorators）装饰器 API

## 与 @queryAll 的区别

| 装饰器 | 查询范围 | 典型用途 |
|--------|---------|---------|
| `@queryAll` | Shadow DOM (`this.shadowRoot.querySelectorAll`) | 查询组件模板内的元素 |
| `@children` | Light DOM (`this.querySelectorAll`) | 查询组件宿主元素的子节点 |

## 使用规范

- 私有属性使用 `_` 前缀（`#` 与装饰器不兼容）
- 使用非空断言 `!` 声明类型（因为 DOM 元素在组件挂载后才存在）
- 选择器应针对组件的 Light DOM 子元素（如 slotted children）

## 常见模式

```typescript
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCarousel extends EaBase {
  @query(bem.ce("content"))
  private _content!: HTMLElement;

  @queryAll(bem.ce("indicator"))
  private _indicatorNodes!: NodeListOf<HTMLElement>;

  @children("ea-carousel-item:not([slot])")
  private _carouselItems!: NodeListOf<HTMLElement>;

  @children('ea-carousel-item[slot^="clone-"]')
  private _cloneItems!: NodeListOf<HTMLElement>;

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <ul class="${bem.e('content')}" part="content">
          <slot name="clone-last"></slot>
          <slot></slot>
          <slot name="clone-first"></slot>
        </ul>
      </div>
    `;
  }
}
```
