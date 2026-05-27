---
name: "html-safe"
description: "HTML safety processing using html() function with DOMPurify. Invoke when inserting HTML content into components or debugging DOMPurify-related issues."
---

# HTML 安全处理

使用 `html()` 函数安全地处理 HTML 内容，防止 XSS 攻击。

## 导入

```typescript
import { html } from "@utils/html";
```

## API

```typescript
const html = (dirtyHTML: string): string
```

## 核心行为

1. **保护 `<slot>` 标签**：先用占位符 `___SLOT_N___` 替换所有 `<slot>` 和 `</slot>` 标签
2. **DOMPurify 清洗**：使用以下配置进行 XSS 过滤：
   - `USE_PROFILES: { html: true, svg: true, svgFilters: true }`
   - `CUSTOM_ELEMENT_HANDLING`：
     - `tagNameCheck: /^ea-/` — 允许所有 `ea-` 前缀的自定义元素标签
     - `attributeNameCheck: /.*/` — 允许自定义元素上的所有属性名
     - `allowCustomizedBuiltInElements: true`
3. **恢复 `<slot>` 标签**：将占位符替换回原始的 `<slot>` 标签

## 使用示例

### 安全插入 HTML

```typescript
@attribute({
  type: String,
  default: "",
  observer(this: EaAlert, newVal: string) {
    this._container.innerHTML = html(newVal);
  },
})
content: string = "";
```

### 在模板中使用

```typescript
html(): string {
  return `
    <div class="${bem()}" part="container">
      <div class="${bem.e('body')}">${html(this.content)}</div>
      <slot></slot>
    </div>
  `;
}
```

## DOMPurify 属性丢失问题

### 问题场景

在 JSDOM 测试环境中，DOMPurify 对某些属性（如 `srcset`）的处理比浏览器更严格，可能导致属性被清洗掉。

### 诊断步骤

1. 检查组件是否使用 `html()` 函数处理包含该属性的 HTML 字符串
2. 在浏览器中测试是否正常（DOMPurify 在浏览器和 JSDOM 环境行为可能不同）
3. 确认属性值是否包含 `data:` URI（这类 URI 在 JSDOM 中可能被过滤）

### 解决方案

使用 DOM API 替代 HTML 字符串：

```typescript
// ❌ 不推荐：HTML 字符串可能被清洗
private _loadImage(src: string): void {
  this._container.innerHTML = html(
    `<img src="${src}" srcset="${this["src-set"]}" />`
  );
}

// ✅ 推荐：使用 DOM API 设置属性
private _renderImage(src: string): void {
  const img = document.createElement("img");
  img.src = src;
  img.srcset = this["src-set"];
  this._container.innerHTML = "";
  this._container.appendChild(img);
}
```

### 参考案例

- [ea-avatar/index.ts](file:///e:/repo/ea-ui-component/src/components/ea-avatar/index.ts) - 使用 DOM API 处理 srcset 属性
