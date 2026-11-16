---
"@easy-component-ui/core": major
---

### 样式所有权移交消费方，core 产物零 CSS

core 之前通过 `EaBase` 内联主题变量表，只引 core 的产物也要背一份 CSS，且语义层无法被文档级样式复用。

- 新增 `setBaseStyles(css | css[])` / `getBaseStyles()`，默认空数组（不配置即裸样式）
- `applyStyles` 按「基础样式 → 类链样式」拼接，基础样式只出现一次，两类样式共用 `StylesheetCache`
- 主题包新增 `base`（JS 导出 CSS 字符串）与 `base.css`（文档级 `<link>`），变量层选择器改为 `:host, :root`，元素基线限定在 `:host` 下
- 组件主包入口调用 `setBaseStyles(themes/base)`，零配置行为不变
- 环境不支持 `adoptedStyleSheets` 时降级为每实例 `<style>` 并告警一次

BREAKING CHANGE: 只引 `@easy-component-ui/core` 自建组件时，不再自动获得语义变量层，需自行调用 `setBaseStyles()` 注入 `@easy-component-ui/themes/base`，或在页面引入 `@easy-component-ui/themes/base.css`。使用主包 `easy-component-ui` 时行为不变。
