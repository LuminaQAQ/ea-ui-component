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

**使用规范（2026-10-07 定稿）**：按优先级选择等待方式，禁止写
`new Promise(resolve => setTimeout(resolve, 100))`：

1. **首选 `await el.updateComplete`**：只需等待"该组件自身渲染 / 属性更新"完成时使用，精确、不依赖固定时长（见下节）。
2. **次选 `await vi.waitFor(() => { ... })`**：`updateComplete` 不覆盖、但**能写出可断言终态**的异步链路（`slotchange`、`MutationObserver`、rAF fire-and-forget、真实定时器），见「条件等待」节。
3. **兜底 `waitForRender(ms)`**：仅当「等待的就是真实时长本身」（`showAfter` / `autoClose` / 倒计时 tick / `setTimeout` 竞态编排 / 假定时器场景）才保留，且必须传真实时长。

## updateComplete 更新信号

`EaBase` 暴露公开属性 `updateComplete: Promise<void>`，用于等待**该组件**的渲染与属性
更新完成，是首选的等待方式。

**已覆盖的场景（可用 `await el.updateComplete` 替代 `waitForRender()`）**：

| 场景                                                                         | 示例                                                    |
| ---------------------------------------------------------------------------- | ------------------------------------------------------- |
| 挂载后的 `$mount()` / `$mounted()` 效果（BEM 类名、CSS 变量、ARIA、子元素）  | `container.appendChild(el); await el.updateComplete;`   |
| `$mount()` / `$mounted()` 内部的异步操作（含 `await import()` 懒加载子组件） | 同上                                                    |
| `@attribute` 的 `observer`（含异步 observer）                                | `el.setAttribute("open", ""); await el.updateComplete;` |
| `@property` 的 `observer`（含异步 observer）                                 | `el.data = rows; await el.updateComplete;`              |

**未覆盖的场景（改用条件轮询，或保留 `waitForRender()`）**：

- 组件内部定时器 / 倒计时（`autoClose`、`showAfter` 等）
- `slotchange` / `MutationObserver` 触发的结构重渲染
- **子组件自身的渲染**：给父元素追加子组件后，父元素的 `updateComplete` 不会等待子组件，
  应改为 `await child.updateComplete`；若父组件状态依赖子组件 `$mount()` 的结果（如 ea-select 的
  `aria-activedescendant` 取自 `ea-option` 的 `id`），须在父组件等待后再
  `await Promise.all([...children].map(child => child.updateComplete))`
- 组件在事件回调、定时器等时机自行发起的异步操作
- **observer 只调用 async 方法、未 `return` 该 Promise**：`attributeChangedCallback` 仅在 observer
  返回 Promise 时才 `await` 它（见 `await option.observer?.call(...)`）。ea-select 的 `multiple` /
  `filterable` observer 即属此类，其内部的 `await import()` 链路不在 `updateComplete` 覆盖内
- **组件内部的多阶段异步渲染**：如 ea-transfer 的面板需等子面板自身挂载，首次等待后仍会被后续
  re-render 覆盖，须保留 `waitForRender()`
- **`slotchange` 驱动的子元素属性同步**：如 ea-tabs 的 `_handleSlotChange`（`setTimeout 16ms` + rAF
  防抖后才给 `ea-tab` 设 `slot="nav"`、同步 `type` / `tab-position` / `aria-selected`），父容器
  `updateComplete` 不覆盖；正解是 `await vi.waitFor(() => expect(tab.getAttribute("slot")).toBe("nav"))`
  之后再 `click()` / 断言

## 条件等待（vi.waitFor）

上述「须保留 `waitForRender()`」的场景，正解是**条件轮询**而非固定延时。ea-calendar 是典型例子：
`_handleControllerRender` 是 fire-and-forget 的 async（`$mount()` 与 `controllerType` observer 都只调用
不 await / 不 return），它先 `await importButtonComponent()` / `importSelectComponent()` 再写
`_controllerWrapper.innerHTML`，之后还有 `await setTimeout(0)` 才挂载 `change` 监听器——这几段都在
`updateComplete` 覆盖范围之外。因此该文件的最终做法是：**控制器元素用 `waitForElement` 轮询占位**
（`createCalendar` 只 `await calendar.updateComplete`，不再固定等 150ms），**一次性 `change` 事件用
`vi.waitFor` 把「派发 + 断言」一起重试**。实测对比（各 20 次采样）：原写法丢失 2/20，`vi.waitFor` 0/20。

**关键约定：一次性事件必须把「派发动作 + 断言」一起放进 `vi.waitFor` 回调内重试**，只轮询断言
（如 `expect.poll`）无法补救已经丢失的事件：

```js
await vi.waitFor(() => {
  yearEl.value = "2023";
  yearEl.dispatchEvent(new Event("change"));

  expect(calendar.displayDate.get("year")).toBe(2023);
});
```

`vi.waitFor` 默认 `interval: 50ms` / `timeout: 1000ms`，回调抛错即重试、不抛错即 resolve。

**ea-pagination 复核结论（2026-10-06 更新）**：早期记录的"该文件换任何更快等待都会 4GB 堆溢出、
属组件结构性泄漏"已**被证伪**。在 `--max-old-space-size=1024`（1GB 上限，低于当初报告的 4GB）下把
该文件 80 处 `waitForRender()` 全部换为 `await pagination.updateComplete`，连续 4 次全量运行均
112/112 通过，堆峰值 128 MB（113 次采样）且无单调增长，不存在无法回收的结构性对象。真正的问题在
**原写法**：`waitForRender(100)` 对 `CSS Parts > 应该支持 page part` 存在 load 敏感 flake——并发压力下
`$mount()` 内 `await import(ea-input-number)` 尚未完成就断言，取到 `null`（实测 2/2 失败）。
`updateComplete` 等待的正是 `$mount()` 的 Promise，能确定性覆盖该懒加载链路，故该文件已统一改用
`updateComplete`。

**ea-select / ea-date-picker 复核结论（2026-10-06 更新）**：ea-select 的 218 处、ea-date-picker 的
82 处 `waitForRender()` 已全部换为 `updateComplete`（单文件 160/160、168/168 通过；与 ea-calendar /
ea-pagination / ea-table 并发 665/665 连续 3 轮通过）。ea-select 唯一需要补偿的是子组件依赖：其
`aria-activedescendant` 取自 `ea-option` 的 `id`，而 `id` 在 `ea-option` 自己的 `$mount()`（rAF）中
写入，故断言前用文件内 helper `waitForOptionsMounted(select)` 追加
`await Promise.all([...options].map(o => o.updateComplete))`。ea-date-picker 组件本身无 async 逻辑，
全部转换后无补偿点。

**注意**：`updateComplete` 只表达"本次更新"。若元素当前没有待处理的更新，读取到的是已兑现的
Promise（`await` 会立即继续），不会等待将来的更新。

**注意**：`@attribute` 的 `observer` 只对**已连接**（`appendChild` 之后）的元素执行。
对未连接的元素设置属性后 `await el.updateComplete` 会一直挂起，请先连接元素再等待。

## 其他已复核定稿的处理模式（2026-10-07）

**`waitForRender(0)` 同样用 `updateComplete`**：「append / 改属性后断言组件自身渲染的 DOM」时，
`waitForRender(0)`（单帧）与 `waitForRender()`（100ms）都不是最优，一律换 `await el.updateComplete`。
只有等待的确实是「真实时长」时才保留数字参数。

**焦点 / 关闭逻辑（rAF fire-and-forget）**：ea-popover / ea-popconfirm / ea-tooltip 的
`_focusContent`、`_handleFocusOut`，以及 ea-menu 子菜单的 `focusout`，都在 `requestAnimationFrame`
里执行，`updateComplete` 等不到。正解是 `vi.waitFor` 包住断言：
`await vi.waitFor(() => { expect(popover.visible).toBe(false); });`。
**同一段 rAF 逻辑产生的全部断言必须一起放进回调**——例如 `document.activeElement` 与
`original.tabIndex === 0` 要同时放，否则 `tabIndex` 仍为 -1 会失败。

**`slotchange` 驱动**：ea-card 的 `is-header-empty` / `is-footer-empty`、ea-infinite-scroll 的
`ea-infinite-scroll-slotchange`、ea-tour-step 的指示器数量、ea-tabs 的 `aria-selected` 都由
slotchange 派生，用 `vi.waitFor` 轮询。

**子组件渲染**：父元素的 `updateComplete` 不等子组件。ea-tour-step 的 `variant` 类名要
`await step.updateComplete`；ea-upload 的 `ea-upload-file-item > ea-progress` percentage 要用
`vi.waitFor` 重新查询；ea-select 的 `ea-option id` 用
`Promise.all([...children].map(c => c.updateComplete))`。

**命令式实例 API（ea-notification / ea-message / ea-message-box）**：

- 能拿到组件句柄时直接 `await instance.instance.updateComplete;`（ea-notification 39 处即此模式）
- 只能靠 `document.querySelector` 时用
  `await vi.waitFor(() => expect(document.querySelector("ea-message")).toBeTruthy());`
- 提交走 `.then` 微任务派发事件时（ea-message-box 的 submit），`updateComplete` 会提前 resolve，
  须 `vi.waitFor(() => expect(handler).toHaveBeenCalled())`

## 仍需保留 `waitForRender(ms)` 的清单（2026-10-07 收口）

全库测试仅剩 **12 个文件 / 56 处**保留，全部是「真实时长」语义：

| 文件           | 处数 | 参数          | 原因                                                                 |
| -------------- | ---- | ------------- | -------------------------------------------------------------------- |
| ea-alert       | 24   | 50~600        | `show-after` / `auto-close` / `hide-after` 真实定时器                |
| ea-countdown   | 12   | 1100 / 200    | `setInterval` 真实 tick                                              |
| ea-tree        | 5    | 50            | `defaultExpandedKeys` 等 `timeout(16)` 链路 + 负向断言               |
| ea-dropdown    | 4    | 50 / 80 / 200 | hover 延迟隐藏 `setTimeout(150)` 的时长语义                          |
| ea-collapse    | 2    | 200           | `beforeCollapse` 异步回调内 `setTimeout(10)`                         |
| ea-time-picker | 2    | 50 / 200      | 延迟插入 DOM（append 前等待）、disabled 负向断言                     |
| ea-carousel    | 1    | —             | `transitionend` 末尾 `setTimeout(0)` 链路（`simulateTransitionEnd`） |
| ea-overlay     | 1    | 100           | 异步 `beforeClose` 内 `setTimeout(50)` 竞态                          |
| ea-calendar    | 1    | 50            | `waitForElement` 轮询 helper 自身                                    |
| ea-message-box | 1    | —             | `beforeClose` 阻止关闭 + 真实 `setTimeout` 编排                      |
| ea-message     | 1    | —             | `advanceTimersByTime` 后等待 duration 到期自动关闭                   |
| ea-transfer    | 2    | —             | 面板多阶段异步渲染，首帧后仍会被后续 re-render 覆盖                  |

## 何时需要等待

| 断言对象                                                         | 是否等待                  | 说明                                  |
| ---------------------------------------------------------------- | ------------------------- | ------------------------------------- |
| Shadow DOM 结构（`.ea-xxx`、`[part="x"]`、`<slot>`）             | 不需要                    | 模板在 `connectedCallback` 中同步渲染 |
| `@attribute` / `@property` 值读取（`el.offset`、`el.target`）    | 不需要                    | getter 同步读取 attribute / 内部存储  |
| `$mount()` 产生的状态（BEM 类名、CSS 变量、尺寸缓存）            | `await el.updateComplete` | `$mount` 挂在 rAF 上                  |
| attribute / property `observer` 触发的更新（类名、ARIA、子元素） | `await el.updateComplete` | rAF → 微任务                          |
| 事件派发后的 DOM 断言                                            | `await el.updateComplete` | 事件若只触发属性更新则等价            |
| 组件内部定时器 / `slotchange` / `MutationObserver`               | `waitForRender(ms)`       | 传真实时长，如倒计时 1100             |

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

| 场景                             | 等待方式                     | 说明                                                     |
| -------------------------------- | ---------------------------- | -------------------------------------------------------- |
| DOM 结构验证                     | 无需等待                     | 模板在 `connectedCallback` 中同步渲染                    |
| 属性值读取                       | 无需等待                     | getter 同步读取                                          |
| 组件渲染 / observer 更新         | `await el.updateComplete`    | 首选，精确且最快；`waitForRender(0)` 也属此类，同样换它  |
| 子组件渲染                       | `await child.updateComplete` | 父元素的 `updateComplete` 不等子组件                     |
| rAF fire-and-forget（焦点/关闭） | `vi.waitFor(() => ...)`      | 把该段逻辑产生的**全部**断言一起放进回调                 |
| slotchange / MutationObserver    | `vi.waitFor(() => ...)`      | 轮询终态                                                 |
| 组件内部真实定时器               | `waitForRender(ms)`          | 传真实时长（`showAfter` / `autoClose` / 倒计时 1100 等） |

## 假定时器（vi.useFakeTimers）约定

组件内部使用 `setTimeout` / `setInterval` / `Date.now()` 时（如计时、长按重复、自动关闭），
用假定时器精确推进时间，避免真实等待。

```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("Timer Component", () => {
  afterEach(() => {
    container.remove();
    vi.useRealTimers();
  });

  it("duration 到期后应该自动关闭", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    const instance = EaNotification({ duration: 3000 });
    await waitForRender();

    vi.advanceTimersByTime(3000);

    expect(instance.instance.visible).toBe(false);
    instance.close();
  });
});
```

**约定**：

- 必须成对使用：`vi.useFakeTimers()` 开启，`afterEach` 中 `vi.useRealTimers()` 关闭，避免污染其他用例
- 推荐 `vi.useFakeTimers({ shouldAdvanceTime: true })`：假定时器随真实时间自动推进，
  `waitForRender()` 的真实超时仍能正常 resolve，可与现有等待工具混用
- 使用**非自动推进**的 `vi.useFakeTimers()` 时，`rAF` 与 `setTimeout` 都被接管，
  `waitForRender()` 不会自行推进，必须用 `vi.advanceTimersByTime(ms)` /
  `vi.advanceTimersByTimeAsync(ms)` 手动推进（需要等待异步链时用 async 版本）
- 只需等待属性更新时优先用 `await el.updateComplete`，它不受假定时器影响

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

## 浏览器模式（真实布局套件）

jsdom 不做布局计算（`getBoundingClientRect()` 恒为 0、无样式层叠），因此
「指示条几何 / 拖拽改宽 / 真实尺寸」类断言只能在真实浏览器中执行。该套件由独立配置驱动，
**不进入 jsdom 套件**：

- 目录：`packages/components/src/test/browser/**/*.browser.test.js`
- 配置：`packages/components/vitest.browser.config.ts`（`provider: playwright()`，chromium，headless）
- 命令：`pnpm test:browser`（根目录；等价于 `packages/components` 下的同名脚本）
- jsdom 主配置用 `test.exclude` 排除 `src/test/browser/**`，两套互不干扰

`vitest.browser.config.ts` 复用 `internal/vite-config/index.ts` 的共享选项（alias / esbuild 装饰器契约 /
scss），与主配置保持一致，仅 `test.browser` 段不同。

**真实浏览器下的等待与 jsdom 同源，只是延迟更可观测**：

- **`slotchange` 防抖**：ea-tabs 的 `slot="nav"` 分配在 `setTimeout 16ms` + rAF 之后。首次
  `await tabs.updateComplete` 时标签仍留在默认插槽内（宽度等于内容区宽度、全部 `x` 相同），
  断言几何前必须
  `await vi.waitFor(() => expect(rects[1].x).toBeGreaterThan(rects[0].x))`
- **异步 observer**：`attributeChangedCallback` 中的 `await option.observer?.call(...)` 使内联 CSS 变量
  延迟写入。ea-splitter-panel 的 `size` → `--ea-splitter-panel-size` 即在拖拽后
  `await vi.waitFor(() => expect(panel.getBoundingClientRect().width).toBeCloseTo(目标, 0))` 才能读到

**断言原则**：只断言几何关系（尺寸 > 0、位置递增、宽度差 ≈ 位移量），不要断言硬编码像素值。

## 运行命令

```bash
npm run test          # Vitest watch 模式
npm run test:run      # 单次执行（jsdom）
npm run test:browser  # 单次执行（真实浏览器布局套件）
npm run test:coverage # 生成覆盖率报告
```
