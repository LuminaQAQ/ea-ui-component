# @easy-component-ui/themes

easy-component-ui 主题包：提供 light / dark / source 主题样式与主题控制器，支持 SCSS 变量直接引用。

## 安装

```bash
npm install @easy-component-ui/themes
```

## 使用

```typescript
import { initTheme, setTheme, toggleTheme } from "@easy-component-ui/themes";
```

```scss
@use "@easy-component-ui/themes/variables.scss";
@use "@easy-component-ui/themes/mixins.scss";
```

> 通常无需直接安装本包，[`easy-component-ui`](https://www.npmjs.com/package/easy-component-ui) 主包已内置依赖。

## 文档

完整文档见 [easy-component-ui 文档站](https://luminaqaq.github.io/ea-ui-component/)。
