---
"easy-component-ui": major
---

### HTML 渲染改为"模板可信 + 值转义"

组件不再在运行时清洗 HTML：`dompurify` 依赖移除，core 产物 gzip 从 27.5 kB 降到 21.2 kB。模板由组件作者编写、视为可信；使用者提供的属性值按纯文本插入。

- 新增 `escapeHTML(value)`，动态值（含 `class` / `name` 等属性上下文）统一用它转义
- 新增 `setHTML(target, content)` 与 `insertHTML(target, content, position)`，作为唯一的 HTML 写入入口；源码中 84 处 `innerHTML` 赋值与 2 处 `insertAdjacentHTML` 已收敛
- `html()` 退化为"声明模板可信"：原样返回，模板里出现 `<script>`、内联事件等片段时通过诊断通道告警
- 以下属性改为按纯文本渲染：`ea-alert` 的 `heading` / `description` / `close-text`、`ea-page-header` 的 `heading` / `content` / `icon`、`ea-anchor-link` 的 `heading`、`ea-loading` 的 `text`、`ea-descriptions` 的 `items[].content`、`ea-transfer` 的列表项标签、`ea-avatar` / `ea-input` / `ea-timeline-item` 的图标名、`ea-color-picker` 的色值
- 需要富文本时改用同名 slot（`heading` / `description` 等）；`ea-message` / `ea-message-box` / `ea-notification` 的 `dangerously-use-html-string` 保持为显式信任通道
- 新增构建期校验 `pnpm check:html`（已并入 `pnpm test`）：拦截 `setHTML` / `insertHTML` / `html()` 里未经转义的插值，可用 `// @ea-html-safe` 标注显式信任

BREAKING CHANGE: `html()` 不再剥离 `script`、未知标签与危险属性，传给它的内容会原样渲染；把 HTML 字符串传给 `heading`、`description`、`label`、`items[].content` 等文本属性的写法不再生效，会按字面文本显示，需改为用 slot 提供富文本或改用 `dangerously-use-html-string` 一类的显式开关。
