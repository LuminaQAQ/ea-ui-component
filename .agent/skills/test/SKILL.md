---
name: "test"
description: "Component testing patterns with Vitest. Invoke when writing or updating component test files, debugging test failures, or working with waitForRender utility."
---

# 测试开发规范

基于 Vitest + jsdom 的组件测试规范。

## 测试文件结构

```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import "../components/ea-component/index";

describe("EaComponent", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Feature Name", () => {
    it("should do something", async () => {
      // 测试代码
    });
  });
});
```

## 统一等待工具

```javascript
import { waitForRender } from "./utils/waitForRender";

await waitForRender();    // 默认 100ms
await waitForRender(200); // 自定义
await waitForRender(0);   // 微任务等待
```

**使用规范**：所有测试文件中需要等待组件渲染时，统一使用 `waitForRender()` 替代 `new Promise(resolve => setTimeout(resolve, 100))`。

## 测试模式

### 1. 基础渲染测试（同步）

```javascript
it("应该正确渲染组件", () => {
  const component = document.createElement("ea-component");
  container.appendChild(component);

  expect(component).toBeDefined();
  expect(component.shadowRoot).toBeDefined();
});
```

### 2. 属性测试（异步）

```javascript
it("应该正确应用属性", async () => {
  const component = document.createElement("ea-component");
  component.setAttribute("prop", "value");
  container.appendChild(component);

  await waitForRender();

  expect(component.prop).toBe("value");
});
```

### 3. 属性变化测试

```javascript
it("属性变化时应该正确更新", async () => {
  const component = document.createElement("ea-component");
  component.setAttribute("prop", "old-value");
  container.appendChild(component);

  await waitForRender();
  expect(component.prop).toBe("old-value");

  component.setAttribute("prop", "new-value");
  await waitForRender();

  expect(component.prop).toBe("new-value");
});
```

### 4. 事件测试

```javascript
it("应该触发事件", async () => {
  const component = document.createElement("ea-component");
  container.appendChild(component);

  const handler = vi.fn();
  component.addEventListener("event-name", handler);

  // 触发事件的操作
  await waitForRender();

  expect(handler).toHaveBeenCalled();
});
```

### 5. 复杂场景测试

```javascript
it("应该支持组合使用多个属性", async () => {
  const component = document.createElement("ea-component");
  component.setAttribute("prop1", "value1");
  component.setAttribute("prop2", "value2");
  container.appendChild(component);

  await waitForRender();

  expect(component.prop1).toBe("value1");
  expect(component.prop2).toBe("value2");
});
```

## 等待时间选择

| 场景 | 等待时间 | 说明 |
|------|---------|------|
| 同步属性读取 | `waitForRender(0)` | 直接读取已设置的属性 |
| 组件渲染/属性更新 | `waitForRender()` | 默认 100ms |
| 图片加载/网络请求 | `waitForRender(100)` 或更长 | 异步资源加载 |
| DOM 结构验证 | 无需等待 | 同步验证 DOM 结构 |

## DOMPurify 属性丢失问题

若测试中属性丢失或为空，优先考虑 DOMPurify 清洗问题：

1. 检查组件是否使用 `html()` 函数处理包含该属性的 HTML 字符串
2. 在浏览器中测试是否正常
3. 使用 DOM API 替代 HTML 字符串

```typescript
// 推荐：使用 DOM API
const img = document.createElement("img");
img.srcset = value;
this._container.appendChild(img);
```

## 运行命令

```bash
npm run test          # Vitest watch 模式
npm run test:run      # 单次执行
npm run test:coverage # 生成覆盖率报告
```
