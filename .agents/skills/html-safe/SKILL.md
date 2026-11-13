---
name: "html-safe"
description: "HTML writing and escaping contract: setHTML/insertHTML as the only write entry, escapeHTML for dynamic values, text attributes render as plain text. Invoke when writing component templates, inserting HTML content, or handling user-provided values."
---

# HTML 写入与转义

组件库**不在运行时清洗 HTML**（已移除 DOMPurify）。模板由组件作者编写、视为可信；使用者提供的值转义后再插入。

## 导入

```typescript
import {
  escapeHTML,
  html,
  insertHTML,
  setHTML,
} from "@easy-component-ui/core/utils/html";
```

## API

| API            | 签名                                         | 用途                                              |
| -------------- | -------------------------------------------- | ------------------------------------------------- |
| `escapeHTML()` | `(value: unknown): string`                   | 转义 `& < > " '`，`null` / `undefined` 归一为空串 |
| `setHTML()`    | `(target, content: string): void`            | 唯一的 HTML 写入入口，空目标直接忽略              |
| `insertHTML()` | `(target, content: string, position?): void` | 在指定位置插入（`afterbegin` 等）                 |
| `html()`       | `(template: string): string`                 | 声明模板可信；不清洗，可疑片段走诊断告警          |

## 三条规则

1. **写 DOM 只走写入口**：不写 `ele.innerHTML =`，不写 `ele.insertAdjacentHTML()`；两者都收在 `setHTML` / `insertHTML` 里。
2. **动态值一律 `escapeHTML()`**：属性值、observer 收到的新值、列表项数据都算动态值；**属性上下文同样要转义**（`class` / `name` / `style` 里的 `"` 可以闭合属性）。
3. **需要富文本时用 slot**：`heading`、`description`、`label` 一类文本属性按纯文本渲染；只有组件显式提供 `dangerously-use-html-string` 这类开关时才传 HTML。

## 示例

### 文本上下文

```typescript
@attribute({
  type: String,
  observer(this: EaAlert, newVal: string) {
    setHTML(this._alertHeading, escapeHTML(newVal));
  },
})
heading: string = "";
```

### 属性上下文

```typescript
setHTML(
  this._iconContainer,
  `<ea-icon name="${escapeHTML(this.icon)}" part="icon"></ea-icon>`
);
```

### 富文本走 slot

```html
<ea-alert heading="纯文本标题">
  <b slot="heading">富文本标题</b>
</ea-alert>
```

### 显式信任通道

确实由代码构造、不含外部输入的内容，可标注豁免（全库仅 3 处，均在 `dangerouslyUseHTMLString` 分支）：

```typescript
if (this.dangerouslyUseHTMLString) {
  // @ea-html-safe 由 dangerouslyUseHTMLString 显式开启
  setHTML(this._messageContent, html(newVal));
}
```

## 门禁

`pnpm check:html`（已并入 `pnpm test`）扫描 `setHTML` / `insertHTML` / `html()` 上下文里的插值。

- 规则实现：`packages/cli/src/lib/html-injection.ts`
- 白名单按**数据来源**判定（`escapeHTML()`、`html()`、内部 `bem`、`this._renderXxx()`、常量表查值、布尔三元、同源 DOM 克隆），不绑 `this.` 前缀
- 豁免只能用行内注释 `@ea-html-safe`，新增豁免需说明来源可信的理由

## 常见问题

- **文案里出现了字面 `<b>` 标签** → 属性按纯文本渲染，这是预期行为；要富文本就改用 slot。
- **检查报"模板插值需用 escapeHTML() 转义"** → 优先加 `escapeHTML()`；确属内部受控内容再考虑 `@ea-html-safe`。
- **以前依赖 `html()` 剥离 `script` / 未知标签** → 该行为已移除，安全性由"转义动态值 + 构建期校验"保证。
