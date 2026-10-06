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

await waitForRender(); // 等待渲染完成（默认 100ms）
await waitForRender(0); // 只等一帧（单 rAF）
await waitForRender(200); // 等真实 200ms
```

**为什么需要等待**：组件的 `$mount()` / `$mounted()` 与 `@attribute` 的 `observer` 都挂在
`requestAnimationFrame` 上（见 `core/EaBase` 的 `connectedCallback` /
`attributeChangedCallback`）；部分组件的 `$mount()` 还是 async 的，内部会
`await import()` 懒加载子组件（如 ea-pagination 懒加载 ea-input-number / ea-select）
或等待组件内定时器。所以等待必须同时覆盖"跨帧"与"真实时长"：

- 微任务 `await Promise.resolve()` **不够**（rAF 尚未执行）
- `await new Promise(r => setTimeout(r, 0))` **也不够**（jsdom 的 rAF 排在 0ms 定时器之后，也遮不住动态 import）
- 因此需要 `waitForRender()`（默认 100ms）来覆盖帧与组件内部的异步资源

**使用规范**：需要等待渲染时统一用 `waitForRender()`，不要写
`new Promise(resolve => setTimeout(resolve, 100))`。

## 何时需要等待

| 断言对象                                                      | 是否等待            | 说明                                  |
| ------------------------------------------------------------- | ------------------- | ------------------------------------- |
| Shadow DOM 结构（`.ea-xxx`、`[part="x"]`、`<slot>`）          | 不需要              | 模板在 `connectedCallback` 中同步渲染 |
| `@attribute` / `@property` 值读取（`el.offset`、`el.target`） | 不需要              | getter 同步读取 attribute / 内部存储  |
| `$mount()` 产生的状态（BEM 类名、CSS 变量、尺寸缓存）         | `waitForRender()`   | `$mount` 挂在 rAF 上                  |
| attribute `observer` 触发的更新（类名、ARIA、子元素）         | `waitForRender()`   | rAF → 微任务                          |
| 事件派发后的 DOM 断言                                         | `waitForRender()`   | 同上                                  |
| 组件内部有定时器 / 动态 import / 异步资源                     | `waitForRender(ms)` | 传真实时长，如倒计时 1100             |

## 测试模式

### 1. 基础渲染测试（同步，无需等待）

```javascript
it("应该正确渲染组件", () => {
  const component = document.createElement("ea-component");
  container.appendChild(component);

  expect(component.shadowRoot.querySelector(".ea-component")).toBeTruthy();
  expect(component.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
});
```

### 2. 属性读取测试（同步，无需等待）

```javascript
it("应该正确应用属性", () => {
  const component = document.createElement("ea-component");
  component.setAttribute("prop", "value");
  container.appendChild(component);

  expect(component.prop).toBe("value");
});
```

### 3. 属性变化测试

```javascript
it("属性变化时应该正确更新", () => {
  const component = document.createElement("ea-component");
  component.setAttribute("prop", "old-value");
  container.appendChild(component);

  expect(component.prop).toBe("old-value");

  component.setAttribute("prop", "new-value");

  expect(component.prop).toBe("new-value");
});
```

> 若断言的是 `observer` 中更新的 DOM（类名、ARIA、子元素），则需要 `await waitForRender()`。

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
it("应该支持组合使用多个属性", () => {
  const component = document.createElement("ea-component");
  component.setAttribute("prop1", "value1");
  component.setAttribute("prop2", "value2");
  container.appendChild(component);

  expect(component.prop1).toBe("value1");
  expect(component.prop2).toBe("value2");
});
```

## 等待时间选择

| 场景                         | 等待方式            | 说明                                  |
| ---------------------------- | ------------------- | ------------------------------------- |
| DOM 结构验证                 | 无需等待            | 模板在 `connectedCallback` 中同步渲染 |
| 属性值读取                   | 无需等待            | getter 同步读取                       |
| 组件渲染 / observer 更新     | `waitForRender()`   | 默认 100ms，覆盖 rAF 与内部异步资源   |
| 只需跨一帧                   | `waitForRender(0)`  | 单帧，最快                            |
| 组件内部定时器 / 动态 import | `waitForRender(ms)` | 传真实时长，如倒计时 1100             |

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
