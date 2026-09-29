# easy-component-ui

使用 Web Component 编写的原生组件库，无框架依赖，支持 Vue / React / Angular 等任意框架直接使用。

## 安装

```bash
npm install easy-component-ui
```

## 使用

### 按需引入

```typescript
import "easy-component-ui/ea-button";
```

```html
<ea-button type="primary">按钮</ea-button>
```

### 全量引入

```typescript
import "easy-component-ui";
```

## 主题

```typescript
import { initTheme, setTheme, toggleTheme } from "easy-component-ui/theme";
```

## 文档

完整文档与组件 API 见 [easy-component-ui 文档站](https://luminaqaq.github.io/ea-ui-component/)。

## License

[MIT](./LICENSE)
