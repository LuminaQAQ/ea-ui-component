# @easy-component-ui/themes

easy-component-ui 主题包：提供 base 语义层、light / dark / source 配色与主题控制器，支持 SCSS 变量直接引用。

## 样式所有权

语义变量层不在 core 里：core 只提供注入机制 `setBaseStyles()`，默认不注入任何样式。本包提供同一份 SCSS 的两种形态，由消费方按需选用。

| 产物                                 | 形式                | 用途                               |
| ------------------------------------ | ------------------- | ---------------------------------- |
| `@easy-component-ui/themes/base`     | JS，导出 CSS 字符串 | 交给 `setBaseStyles()` 注入 Shadow |
| `@easy-component-ui/themes/base.css` | 纯 CSS 文件         | 文档级 `<link>` / `@import`        |

变量层选择器为 `:host, :root`：Shadow 内靠 `:host` 命中宿主，文档级靠 `:root` 命中根元素；元素基线（`input` / `ul` 等）只挂在 `:host` 下，文档级不会污染页面。

## 安装

```bash
npm install @easy-component-ui/themes
```

## 使用

```typescript
import { initTheme, setTheme, toggleTheme } from "@easy-component-ui/themes";

// 自建组件时自行注入语义层
import { setBaseStyles } from "@easy-component-ui/core";
import baseStyles from "@easy-component-ui/themes/base";

setBaseStyles(baseStyles);
```

```scss
@use "@easy-component-ui/themes/variables.scss";
@use "@easy-component-ui/themes/reset.scss";
@use "@easy-component-ui/themes/mixins.scss";
```

> 通常无需直接安装本包，[`easy-component-ui`](https://www.npmjs.com/package/easy-component-ui) 主包已内置依赖。

## 文档

完整文档见 [easy-component-ui 文档站](https://luminaqaq.github.io/ea-ui-component/)。
