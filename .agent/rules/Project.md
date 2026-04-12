# ea-ui-component 项目开发规范

本项目是基于 Web Components 的组件库，使用 TypeScript 和装饰器模式实现，开发时必须遵循以下规范。

## 项目架构

### 目录结构

```
src/
├── components/          # 组件目录
│   ├── ea-alert/       # 单个组件
│   │   ├── index.ts    # 组件入口
│   │   ├── index.scss  # 组件样式
│   │   └── types.d.ts  # 类型声明（可选）
├── core/               # 核心基础类
│   ├── EaBase.ts       # 组件基类
│   └── FormBase/       # 表单组件基类
├── decorator/          # 装饰器
│   ├── attribute.ts    # 属性装饰器
│   ├── custom-element.ts # 自定义元素装饰器
│   ├── query.ts        # DOM 查询装饰器
│   └── listen.ts       # 事件监听装饰器
├── utils/              # 工具函数
│   ├── bem.ts          # BEM 类名生成
│   ├── html.ts         # HTML 安全处理
│   └── timeout.ts      # 定时器工具
├── types/              # 类型定义
└── themes/             # 主题样式
```

### 核心变更（重构后）

1. **基类变更**：`Base` → `EaBase`，路径从 `@components/Base` 改为 `@core/EaBase`
2. **BEM 工具**：`namespace()` → `createBEM()`，路径从 `@/directives/namespace` 改为 `@utils/bem`
3. **属性定义**：`this.properties()` → `@attribute()` 装饰器
4. **事件监听**：手动 `addEventListener` → `@listen()` 装饰器
5. **DOM 查询**：手动 `querySelector` → `@query()` 装饰器
6. **HTML 安全**：使用 `html()` 工具函数处理 HTML 内容

## TypeScript 开发规范

### 组件结构规范

所有组件必须继承 `EaBase` 类，使用装饰器模式定义：

```typescript
import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { html } from "@utils/html";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-component" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaComponent extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-component")
  private _container!: HTMLElement;

  @query(".ea-component__input")
  private _input!: HTMLInputElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaComponent, newVal: string) {
      this._container.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaComponent) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: ["small", "medium", "large"],
    default: "medium",
    observer(this: EaComponent) {
      this.updateContainerClasslist();
    },
  })
  size: string = "medium";

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem({ [this.size]: true }, { disabled: this.disabled });
    this._container.className = className;
    return className;
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <slot></slot>
      </div>
    `;
  }

  // ==================== 事件处理 ====================

  @listen("click", ".ea-component__button")
  private _handleClick(e: Event) {
    if (this.disabled) return;
    this.emit("click", { detail: { target: e.target } });
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    // 清理资源
  }
}
```

**核心要点：**

- 继承 `EaBase` 类（表单组件继承 `FormBase`）
- 使用 `@CustomElement` 装饰器注册组件
- 使用 `@attribute` 装饰器定义属性
- 使用 `@query` 装饰器获取 DOM 元素
- 使用 `@listen` 装饰器绑定事件
- 使用 `createBEM()` 生成 BEM 类名
- 使用 `html()` 函数处理 HTML 内容（防止 XSS）
- 样式导入使用 `?inline` 后缀
- 私有属性使用 `_` 前缀（`#` 与装饰器不兼容）

### 装饰器使用规范

#### @CustomElement

```typescript
@CustomElement("ea-component", {
  styles: [stylesheet],      // 样式数组
  autoDefine: true,          // 是否自动注册（默认 true）
})
```

#### @attribute

```typescript
@attribute({
  type: String,              // String | Number | Boolean | Array | Object | 枚举数组
  default: "default value",  // 默认值
  observer(this, newVal) {   // 变化回调
    this.updateUI();
  },
})
propertyName: string = "";
```

**属性命名规则：**

- **类属性使用小驼峰命名**（如 `closeText`, `showIcon`）
- **框架自动转换为连字符命名**作为 HTML 属性（如 `close-text`, `show-icon`）
- **无需显式声明 `name` 选项**，装饰器会自动处理命名转换

```typescript
// 正确示例：使用小驼峰命名
@attribute({
  type: String,
  default: "",
})
closeText: string = "";  // 自动映射到 HTML 属性 close-text

@attribute({
  type: Boolean,
  default: false,
})
showIcon: boolean = false;  // 自动映射到 HTML 属性 show-icon
```

**组件类型属性命名：**

- 用于表示组件视觉变体/类型的属性统一命名为 `variant`（而非 `type`）
- 使用统一的常量 `VARIANT_TYPES` 定义可选值，确保全局一致
- 统一使用 `danger` 作为错误类型（而非 `error`）
- 可选值包括：`primary`, `success`, `warning`, `danger`, `info`

```typescript
// 正确示例：使用 variant 命名类型属性
import {
  VARIANT_TYPES,
  VARIANT_DEFAULT,
  VARIANT_ICON_MAP,
  type VariantType,
} from "@/constants/variant";

@attribute({
  type: Enum(VARIANT_TYPES),
  default: VARIANT_DEFAULT,
  observer(this: EaAlert, newVal: VariantType) {
    this.updateContainerClasslist();
  },
})
variant: VariantType = VARIANT_DEFAULT;
```

**常量定义（src/constants/variant.ts）：**

```typescript
export const VARIANT_TYPES = [
  "primary",
  "success",
  "warning",
  "danger", // 统一使用 danger 而不是 error
  "info",
] as const;

export type VariantType = (typeof VARIANT_TYPES)[number];
export const VARIANT_DEFAULT = "info";

// 图标映射（danger 和 error 都映射到同一个图标，兼容处理）
export const VARIANT_ICON_MAP: Record<string, string> = {
  primary: "circle-info",
  success: "circle-check",
  info: "circle-info",
  warning: "triangle-exclamation",
  danger: "circle-xmark",
  error: "circle-xmark", // 兼容处理
};
```

**类型说明：**

- `String` - 字符串类型
- `Number` - 数字类型
- `Boolean` - 布尔类型（HTML 中属性存在即为 true）
- `Array` - JSON 数组
- `Object` - JSON 对象
- `["a", "b", "c"]` - 枚举类型，限制可选值

#### @query

```typescript
@query(".ea-component__container")
private _container!: HTMLElement;

@query("input[type='text']")
private _input!: HTMLInputElement;
```

#### @listen

```typescript
// 基础用法 - 监听 shadowRoot 事件
@listen("click")
private _handleClick(e: Event) {
  // 处理点击
}

// 事件委托 - 监听特定选择器
@listen("click", ".ea-component__button")
private _handleButtonClick(e: Event) {
  // 处理按钮点击
}

// 自动清理 - 组件销毁时自动移除监听
```

### BEM 类名规范

使用 `createBEM` 工具生成 BEM 类名：

```typescript
const bem = createBEM("ea-component");

// 基础块
bem(); // "ea-component"
bem.b(); // "ea-component"
bem.cb(); // ".ea-component"

// 元素类名 (block__element)
bem.e("content"); // "ea-component__content"
bem.ce("content"); // ".ea-component__content"

// 带修饰符
bem({ size: "large" }); // "ea-component ea-component--size-large"
bem({ [this.type]: true }); // "ea-component ea-component--primary"
bem.m("primary", "large"); // "ea-component--primary ea-component--large"
bem.cm("primary"); // ".ea-component--primary"

// 带状态
bem({}, { disabled: true }); // "ea-component is-disabled"
bem({}, { active: this.active }); // "ea-component" 或 "ea-component is-active"
bem.s("active", "disabled"); // "is-active is-disabled"
bem.cs("active"); // ".is-active"

// 组合使用
bem(
  { [this.type]: true, [this.size]: true },
  { disabled: this.disabled, center: this.center }
);
// "ea-component ea-component--primary ea-component--large is-disabled is-center"
```

**使用场景：**

1. **模板中定义元素类名**：

```typescript
html(): string {
  return `
    <div class="${bem()}" part="container">
      <sup class="${bem.e("content")}" part="content"></sup>
      <slot></slot>
    </div>
  `;
}
```

2. **updateContainerClasslist 方法**：

```typescript
updateContainerClasslist(): string {
  const className = bem(
    { [this.type]: true },           // 修饰符
    { dot: this.isDot, hidden: isHidden }  // 状态
  );

  if (this._container) {
    this._container.className = className;
  }

  return className;
}
```

### HTML 安全处理

使用 `html()` 函数处理可能包含 HTML 的内容：

```typescript
import { html } from "@utils/html";

@attribute({
  type: String,
  default: "",
  observer(this: EaAlert, newVal: string) {
    // 安全地插入 HTML
    this._container.innerHTML = html(newVal);
  },
})
content: string = "";
```

**注意：** `html()` 函数会进行 XSS 过滤，只允许安全的 HTML 标签。

### 事件系统

#### 派发事件

```typescript
// 简单事件
this.emit("focus");
this.emit("blur");

// 带数据的事件
this.emit("change", {
  detail: {
    value: newVal,
    label: item.label,
  },
});
```

#### 自定义事件类（ea- 前缀事件）

```typescript
// types.ts
export class EaComponentChangeEvent extends Event {
  readonly detail: { value: string; label: string };

  constructor(detail: { value: string; label: string }) {
    super("ea-change", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-change": EaComponentChangeEvent;
  }
}

// 使用
this.dispatchEvent(new EaComponentChangeEvent({ value: "new", label: "New" }));
```

### 生命周期方法

| 方法               | 说明       | 调用时机                         |
| ------------------ | ---------- | -------------------------------- |
| `$mount()`         | 组件挂载   | connectedCallback 后，首次渲染前 |
| `$beforeUnmount()` | 组件销毁前 | disconnectedCallback 开始时      |
| `$unmounted()`     | 组件销毁后 | disconnectedCallback 结束时      |
| `$updated()`       | 属性更新   | attributeChangedCallback 后      |

```typescript
$mount(): void {
  // 初始化操作
  this.updateContainerClasslist();
}

$beforeUnmount(): void {
  // 清理 AbortController、Observer 等资源
  this._transitionAbortController?.abort();
  this._resizeObserver?.disconnect();
}
```

### AbortController 管理

对于需要手动管理的事件监听：

```typescript
private _transitionAbortController?: AbortController;

private _startTransition() {
  // 清理之前的
  this._transitionAbortController?.abort();
  this._transitionAbortController = new AbortController();

  this._container.addEventListener("transitionend", () => {
    this.remove();
  }, {
    signal: this._transitionAbortController.signal,
    once: true,
  });
}

$beforeUnmount(): void {
  this._transitionAbortController?.abort();
}
```

### 类型声明文件

为组件创建类型声明，支持 HTML/Vue/React：

```typescript
// types.d.ts

// HTML 全局类型
declare global {
  interface HTMLElementTagNameMap {
    "ea-component": EaComponentElement;
  }
}

export interface EaComponentElement extends HTMLElement {
  label: string;
  disabled: boolean;
  size: "small" | "medium" | "large";
}

// Vue 类型
declare module "vue" {
  interface GlobalComponents {
    "ea-component": DefineComponent<{
      label?: string;
      disabled?: boolean;
      size?: "small" | "medium" | "large";
    }>;
  }
}

// React 类型
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-component": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        label?: string;
        disabled?: boolean;
        size?: "small" | "medium" | "large";
      };
    }
  }
}
```

## CSS 开发规范

### 样式文件结构

```scss
$name: ea-component-name;

:host {
  --#{$name}-height: 6px;
  --#{$name}-bg-color: var(--grey-200);
  --#{$name}-transition: var(--transition-fast);
}

:host {
  display: inline-block;
  width: 100%;
}

:host([disabled]) {
  cursor: not-allowed;
}

@include block($name) {
  display: inline-flex;
  align-items: center;

  @include element(item) {
    padding: var(--#{$name}-padding);
  }

  @include modifier(large) {
    --#{$name}-height: var(--#{$name}-height-large);
  }

  @include state(active) {
    background-color: var(--primary-color);

    // 在 state 内部使用完整选择器
    .#{$name}__content {
      color: var(--color-white);
    }
  }
}
```

### BEM 命名规范

- 使用 `@include block($name)` 定义组件块
- 使用 `@include element(element-name)` 定义元素
- 使用 `@include modifier(modifier-name)` 定义修饰符
- 使用 `@include state(state-name)` 定义状态
- **仅在 `@include block($name)` 内部使用 elements、modifiers 和 states 的 mixin 函数**
- **在 `@include element()`、`@include modifier()` 和 `@include state()` 内部使用完整 CSS 选择器而非 mixin**

### 设计变量使用原则

1. **优先使用变量**：若在 `src/themes/variables.scss` 中存在的颜色、尺寸、间距等值，必须使用其对应的 CSS 变量
   - 使用 `var(--blue-500)` 而不是硬编码 `#409eff`
   - 使用 `var(--spacing-md)` 而不是硬编码 `8px`
   - 使用 `var(--font-size-lg)` 而不是硬编码 `16px`

2. **变量命名规范**：自定义变量必须以 `--#{$name}-` 开头，后跟有意义的描述性名称

3. **尺寸变体变量**：

   ```scss
   :host {
     --#{$name}-height: 6px;
     --#{$name}-height-small: 4px;
     --#{$name}-height-large: 8px;
   }

   @include modifier(small) {
     --#{$name}-height: var(--#{$name}-height-small);
   }
   ```

### 子组件样式覆盖

使用 `::part` 选择器修改子组件样式：

```scss
@include block($name) {
  @include element(trigger) {
    &::part(original) {
      display: none;
    }

    &::part(content) {
      background-color: var(--grey-800);
    }
  }
}
```

## 文档生成规范

### 文档结构

````markdown
# [组件名称] [中文描述]

## 引入

> `js`

```html
<script type="module">
  import "./node_modules/easy-component-ui/components/[组件名]/index.js";
</script>
```
````

> `css`

::: tip
需要注意的是, 如果需要使用到带有图标的 `属性/组件`, 需要提前使用 `link` 标签引入图标文件
:::

```html
<link
  rel="stylesheet"
  href="./node_modules/easy-component-ui/components/ea-icon/index.css"
/>
```

## 自定义样式

移步到 [CSS Part](#[组件名小写]-css-part)。

## [示例标题 1]

[示例描述]

<div class="demo">
  [示例HTML代码]
</div>

::: details 查看代码

::: code-group

```html
[HTML代码]
```

```js
[JavaScript代码];
```

```css
[CSS代码]
```

:::

:::

## [组件名] API

### [组件名] Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |

### [组件名] CSS Part

| 名称 | 说明 |
| ---- | ---- |

### [组件名] Slots

| 名称 | 说明 |
| ---- | ---- |

### [组件名] Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |

### [组件名] Events

| 事件名 | 说明 | 回调参数(event.detail) |
| ------ | ---- | ---------------------- |

````

### API 生成规则

1. **Attributes** 以 `@attribute` 装饰器的定义为准
2. **CSS Part** 以模板中 `part="xxx"` 属性为准
3. **Slots** 以模板中 `<slot name="xxx">` 为准
4. **Methods** 以类中公共方法为准（不含 `_` 前缀）
5. **Events** 以 `this.emit()` 调用为准

## 通用规范

### 代码风格

- 不添加任何注释（除非用户明确要求）
- 保持代码简洁、清晰
- 遵循现有的代码风格和命名约定

### 文件操作

- 优先编辑现有文件，而不是创建新文件
- 不要主动创建文档文件（\*.md）或 README 文件，除非用户明确要求

### 开发流程

1. 使用 `TodoWrite` 工具规划和跟踪任务
2. 使用 `SearchCodebase` 工具搜索和理解代码库
3. 遵循项目现有的库和框架
4. 遵循安全最佳实践，不暴露或记录密钥和机密信息

## 测试规范

### DOMPurify 与属性丢失问题

若测试文件不通过，且可能因为渲染模板函数导致的属性丢失或者属性为空，优先考虑是否与数据清洗有关（DOMPurify）：

1. **问题识别**：当组件使用 `html()` 函数处理模板字符串时，DOMPurify 可能会清洗掉某些属性（如 `srcset`）
2. **根本原因**：DOMPurify 在 JSDOM 环境下对某些属性（如 `data:` URI 的 `srcset`）的处理比浏览器更严格
3. **解决方案**：
   - **优先方案**：使用 DOM API 直接创建元素并设置属性，而不是通过 HTML 字符串
   - **示例**：
     ```typescript
     // 不推荐：使用 HTML 字符串（可能被清洗）
     this._container.innerHTML = html(`<img srcset="${value}" />`);

     // 推荐：使用 DOM API
     const img = document.createElement("img");
     img.srcset = value;
     this._container.appendChild(img);
     ```

### 测试文件结构规范

所有组件测试文件遵循统一结构：

```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入被测试组件
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

  // 按功能分组测试
  describe("Feature Name", () => {
    it("should do something", async () => {
      // 测试代码
    });
  });
});
````

### 组件测试模式

#### 1. 基础渲染测试（同步）

验证组件基本渲染和 DOM 结构：

```javascript
it("应该正确渲染组件", () => {
  const component = document.createElement("ea-component");
  container.appendChild(component);

  expect(component).toBeDefined();
  expect(component.shadowRoot).toBeDefined();
});
```

#### 2. 属性测试（异步）

属性设置需要等待组件渲染：

```javascript
it("应该正确应用属性", async () => {
  const component = document.createElement("ea-component");
  component.setAttribute("prop", "value");
  container.appendChild(component);

  // 等待组件渲染完成
  await new Promise(resolve => setTimeout(resolve, 100));

  expect(component.prop).toBe("value");
});
```

#### 3. 属性变化测试

验证属性变化后的更新：

```javascript
it("属性变化时应该正确更新", async () => {
  const component = document.createElement("ea-component");
  component.setAttribute("prop", "old-value");
  container.appendChild(component);

  await new Promise(resolve => setTimeout(resolve, 100));
  expect(component.prop).toBe("old-value");

  component.setAttribute("prop", "new-value");
  await new Promise(resolve => setTimeout(resolve, 100));

  expect(component.prop).toBe("new-value");
});
```

#### 4. 事件测试

验证事件触发：

```javascript
it("应该触发事件", async () => {
  const component = document.createElement("ea-component");
  container.appendChild(component);

  const handler = vi.fn();
  component.addEventListener("event-name", handler);

  // 触发事件的操作
  await new Promise(resolve => setTimeout(resolve, 100));

  expect(handler).toHaveBeenCalled();
});
```

#### 5. 复杂场景测试

验证多个属性组合使用：

```javascript
it("应该支持组合使用多个属性", async () => {
  const component = document.createElement("ea-component");
  component.setAttribute("prop1", "value1");
  component.setAttribute("prop2", "value2");
  container.appendChild(component);

  await new Promise(resolve => setTimeout(resolve, 100));

  expect(component.prop1).toBe("value1");
  expect(component.prop2).toBe("value2");
});
```

### 等待时间规范

根据测试场景选择等待时间：

| 场景              | 等待时间 | 说明                 |
| ----------------- | -------- | -------------------- |
| 同步属性读取      | 0ms      | 直接读取已设置的属性 |
| 组件渲染/属性更新 | 100ms    | 大多数异步渲染场景   |
| 图片加载/网络请求 | 100ms+   | 异步资源加载         |
| DOM 结构验证      | 无需等待 | 同步验证 DOM 结构    |

```javascript
// 同步属性读取
await new Promise(resolve => setTimeout(resolve, 0));

// 组件渲染/属性更新
await new Promise(resolve => setTimeout(resolve, 100));

// 图片加载
await new Promise(resolve => setTimeout(resolve, 100));
```

### 统一等待工具函数

项目中提供了统一的等待工具函数 `waitForRender`，位于 `src/test/utils/waitForRender.js`：

```javascript
import { waitForRender } from "./utils/waitForRender";

// 使用默认等待时间（100ms）
await waitForRender();

// 指定等待时间
await waitForRender(200);

// 快速等待（0ms）
await waitForRender(0);
```

**使用规范：**

- 所有测试文件中需要等待组件渲染时，统一使用 `waitForRender()` 替代 `new Promise(resolve => setTimeout(resolve, 100))`
- 默认等待时间为 100ms，适用于大多数组件渲染场景
- 如需特殊等待时间，可传入参数指定毫秒数

```

```
