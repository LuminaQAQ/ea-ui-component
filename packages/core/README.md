# @easy-component-ui/core

easy-component-ui 核心包：提供 `EaBase` 组件基类、`EaFormAssociatedBase` 表单关联基类、装饰器体系（`@attribute` / `@property` / `@CustomElement` 等）与 UI 无关的纯工具函数。

## 安装

```bash
npm install @easy-component-ui/core
```

## 使用

```typescript
import { EaBase } from "@easy-component-ui/core";
import { CustomElement, attribute } from "@easy-component-ui/core/decorator";
```

> 通常无需直接安装本包，[`easy-component-ui`](https://www.npmjs.com/package/easy-component-ui) 主包已内置依赖。

## 属性默认值

`default` 的语义由装饰器决定：

- `@property`：`default` 是值，可以是函数（原样返回，不会被调用）。
- `@attribute`：`default` 是值或工厂；函数会被调用，可用 `this` 计算依赖实例状态的默认值。要在属性上放函数值，写成 `default: () => fn`。

移除属性等同于回到默认值：有 `default` 就是该值，没有则是 `null`；observer 照常触发，`previous` 首次为 `null`。

## 文档

完整文档见 [easy-component-ui 文档站](https://luminaqaq.github.io/ea-ui-component/)。
