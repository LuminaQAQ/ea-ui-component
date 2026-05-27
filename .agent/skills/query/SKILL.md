---
name: "query"
description: "@query and @queryAll decorators for DOM element queries in Shadow DOM. Invoke when needing to access shadow DOM elements in components."
---

# @query / @queryAll 装饰器

从组件的 Shadow DOM 中查询 DOM 元素。

## 导入

```typescript
import { CustomElement, query, queryAll } from "@decorator";
```

## @query(selector)

查询单个 DOM 元素，返回 `Element | null`：

```typescript
@query(".ea-component")
private _container!: HTMLElement;

@query("input[type='text']")
private _input!: HTMLInputElement;

@query(".ea-component__icon")
private _icon!: HTMLElement;
```

## @queryAll(selector)

查询所有匹配的 DOM 元素，返回 `NodeListOf<Element> | null`：

```typescript
@queryAll(".ea-component__item")
private _items!: NodeListOf<HTMLElement>;

@queryAll("li")
private _listItems!: NodeListOf<HTMLLIElement>;
```

## 核心行为

- 通过 `Object.defineProperty` 定义 getter
- **每次访问时动态查询**（非缓存），确保获取最新 DOM 状态
- 查询范围限定在 `element.shadowRoot` 内
- 兼容新版（TC39 Stage 3）和旧版（experimentalDecorators）装饰器 API

## 使用规范

- 私有属性使用 `_` 前缀（`#` 与装饰器不兼容）
- 使用非空断言 `!` 声明类型（因为 DOM 元素在组件挂载后才存在）
- 选择器应与模板中的 BEM 类名对应

## 常见模式

```typescript
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaComponent extends EaBase {
  @query(".ea-component")
  private _container!: HTMLElement;

  @query(".ea-component__input")
  private _input!: HTMLInputElement;

  @queryAll(".ea-component__item")
  private _items!: NodeListOf<HTMLElement>;

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <input class="${bem.e('input')}" type="text" />
        <ul>
          <li class="${bem.e('item')}">Item 1</li>
          <li class="${bem.e('item')}">Item 2</li>
        </ul>
      </div>
    `;
  }
}
```
