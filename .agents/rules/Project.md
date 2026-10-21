# ea-ui-component 项目开发规范

> **版本**: 3.10.1
> **最后更新**: 2026-10-18
> **更新日志**: 见文末

本项目是基于 Web Components 的组件库，使用 TypeScript 和装饰器模式实现，开发时必须遵循以下规范。

## 项目架构

### 目录结构

```
packages/
├── components/                     # 组件包（easy-component-ui）
│   └── src/
│       ├── components/             # 组件目录（由 ea add 生成）
│       │   └── ea-alert/
│       │       ├── index.ts        # 组件入口
│       │       ├── index.scss      # 组件样式
│       │       ├── ea-alert.test.ts # 组件测试（与组件同目录，必填）
│       │       ├── types.d.ts      # 类型声明（可选）
│       │       └── events/         # 自定义事件类（可选）
│       ├── common/                 # 公共子组件（ea-overlay / ea-popper）
│       ├── constants/              # 组件库局部常量（variant.ts / size.ts）
│       ├── utils/                  # 组件库局部工具（Color / I18nManager / parseTime）
│       ├── types/                  # 全局类型定义（events.ts）
│       ├── test/                   # 共享测试区（仅限下列内容）
│       │   ├── setup.ts            # 测试全局 setup
│       │   ├── utils/              # 测试工具（waitForRender.ts / keyboard.ts / a11y.ts）
│       │   ├── integration/        # 跨组件集成测试
│       │   │   └── ea-form-integration.test.ts
│       │   ├── ea-form-associated-base.test.ts  # 基类行为测试
│       │   └── browser/            # 浏览器端测试（*.browser.test.ts）
│       └── index.ts                # 聚合出口（CLI 维护的哨兵区 barrel）
├── core/                           # 核心包 @easy-component-ui/core
│   └── src/
│       ├── core/                   # EaBase.ts / EaFormAssociatedBase.ts
│       ├── decorator/              # attribute / property / custom-element / query / children / listen
│       ├── utils/                  # bem / html / Enum / case-convert / h / parseAttributeValue / timeout
│       ├── stores/                 # 属性与样式缓存
│       └── types/                  # 核心类型定义
├── themes/                         # 主题包 @easy-component-ui/themes
│   └── src/
│       ├── styles/                 # variables / mixins / namespace / light / dark / source.scss
│       ├── entries/                # light / dark / source 主题入口
│       ├── controller.ts           # 主题控制器
│       └── test/                   # 主题测试
├── cli/                            # 工程 CLI @easy-component-ui/cli（ea add / ea check / ea init）
└── mcp-server/                     # MCP Server
```

### 核心变更（重构后）

1. **基类变更**：`Base` → `EaBase`，路径从 `@components/Base` 改为 `@easy-component-ui/core/core/EaBase`
2. **表单基类**：`FormBase` → `EaFormAssociatedBase`，路径 `@easy-component-ui/core/core/EaFormAssociatedBase`
3. **BEM 工具**：`namespace()` → `createBEM()`，路径从 `@/directives/namespace` 改为 `@easy-component-ui/core/utils/bem`
4. **属性定义**：`this.properties()` → `@attribute()` 装饰器（映射 HTML attribute）/ `@property()` 装饰器（纯 JS 属性）
5. **事件监听**：手动 `addEventListener` → `@listen()` 装饰器
6. **DOM 查询**：手动 `querySelector` → `@query()` / `@queryAll()` 装饰器（Shadow DOM）/ `@children()` 装饰器（Light DOM）
7. **HTML 安全**：使用 `html()` 工具函数处理 HTML 内容
8. **a11y 属性同步**：使用 `@attribute` / `@property` 装饰器的 `a11y` 选项自动同步 ARIA 属性，禁止在 observer 中手动 `setAttribute`/`removeAttribute`

## TypeScript 开发规范

### 组件结构规范

所有组件必须继承 `EaBase` 类（表单组件继承 `EaFormAssociatedBase`），使用装饰器模式定义：

```typescript
import EaBase, { createBEM } from "@easy-component-ui/core/core/EaBase";
import {
  CustomElement,
  attribute,
  property,
  query,
  queryAll,
  children,
  listen,
} from "@easy-component-ui/core/decorator";
import { html } from "@easy-component-ui/core/utils/html";
import { Enum } from "@easy-component-ui/core/utils/Enum";
import {
  VARIANT_TYPES,
  VARIANT_DEFAULT,
  type VariantType,
} from "@constants/variant";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-component" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 警告提示组件，用于展示重要的提示信息，支持多种类型和可关闭功能。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot icon - 自定义图标内容。
 * @slot heading - 自定义标题内容。
 * @slot default - 默认插槽，用于描述内容。
 *
 * @event close - 关闭时触发，detail: `{ visible: false }`。
 *
 * @csspart container - 容器元素。
 * @csspart icon-wrap - 图标包裹元素。
 * @csspart content-wrap - 内容包裹元素。
 * @csspart heading - 标题元素。
 * @csspart description - 描述元素。
 * @csspart close-btn - 关闭按钮元素。
 *
 * @cssproperty --ea-alert-height - 组件高度。
 * @cssproperty --ea-alert-bg-color - 组件背景颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaComponent extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

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
    a11y: {
      ariaAttr: "aria-disabled",
      map: v => String(v),
    },
    observer(this: EaComponent) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  updateContainerClasslist(): string {
    const className = bem({ [this.size]: true }, { disabled: this.disabled });

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <slot></slot>
      </div>
    `;
  }

  @listen("click", ".ea-component__button")
  private _handleClick(e: Event) {
    if (this.disabled) return;
    this.emit("click", { detail: { target: e.target } });
  }

  $mount(): void {
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    // 清理资源
  }
}

export default EaComponent;

declare global {
  interface HTMLElementTagNameMap {
    "ea-component": EaComponent;
  }
}
```

**核心要点：**

- 继承 `EaBase` 类（表单组件继承 `EaFormAssociatedBase`）
- **装饰器统一从 `@easy-component-ui/core/decorator` 导入**，不使用零散路径（如 `@easy-component-ui/core/decorator/attribute`）
- 使用 `@CustomElement` 装饰器注册组件
- 使用 `@attribute` 装饰器定义 HTML attribute 映射属性
- 使用 `@property` 装饰器定义纯 JS 属性（不映射 HTML attribute）
- 使用 `@query` / `@queryAll` 装饰器获取 DOM 元素
- 使用 `@listen` 装饰器绑定事件
- 使用 `createBEM()` 生成 BEM 类名
- 使用 `html()` 函数处理 HTML 内容（防止 XSS）
- 使用 `a11y` 选项自动同步 ARIA 属性，禁止在 observer 中手动 `setAttribute`/`removeAttribute`
- 样式导入使用 `?inline` 后缀
- 私有属性使用 `_` 前缀（`#` 与装饰器不兼容）
- **骨架须与 `ea add` 生成物一致**：文件末尾保留 `export default EaComponent;` 与 `declare global { HTMLElementTagNameMap }`（供 `document.createElement` 类型推导），`@query` 优先使用 `bem.cb()`

### 装饰器速查

> 详细用法参见对应技能模块

| 装饰器           | 用途                         | 技能             |
| ---------------- | ---------------------------- | ---------------- |
| `@CustomElement` | 注册自定义元素               | `custom-element` |
| `@attribute`     | 定义 HTML attribute 映射属性 | `attribute`      |
| `@property`      | 定义纯 JS 属性               | `property`       |
| `@query`         | 查询单个 DOM 元素            | `query`          |
| `@queryAll`      | 查询多个 DOM 元素            | `query`          |
| `@children`      | 查询 Light DOM 子元素        | `children`       |
| `@listen`        | 绑定事件监听                 | `listen`         |

### 导入顺序规范

组件文件的导入必须按以下顺序排列，每组之间空一行：

```typescript
// 1. 核心基类
import EaBase, { createBEM } from "@easy-component-ui/core/core/EaBase";

// 2. 装饰器（统一从 @easy-component-ui/core/decorator 导入）
import {
  CustomElement,
  attribute,
  property,
  query,
  queryAll,
  children,
  listen,
} from "@easy-component-ui/core/decorator";

// 3. 工具函数
import { html } from "@easy-component-ui/core/utils/html";
import { Enum } from "@easy-component-ui/core/utils/Enum";
import { timeout } from "@easy-component-ui/core/utils/timeout";

// 4. 常量
import {
  VARIANT_TYPES,
  VARIANT_DEFAULT,
  type VariantType,
} from "@constants/variant";

// 5. 子组件/资源
import stylesheet from "./index.scss?inline";
```

**关键规则：**

- **装饰器统一从 `@easy-component-ui/core/decorator` 导入**，禁止使用零散路径（如 `@easy-component-ui/core/decorator/attribute`）
- 仅导入当前组件实际使用的装饰器
- 装饰器按 `CustomElement → attribute → property → query → queryAll → children → listen` 顺序排列

### 代码文件布局规范

单个 TS 源文件按以下顺序组织，便于一目了然地看出依赖的类型与常量：

1. `import`（组内按「导入顺序规范」排列）
2. 类型 / 接口（`interface`、`type`、`enum`）
3. 模块级常量（`const`：查找表、正则、候选数组等）
4. 函数 / 类实现

**关键规则：**

- 类型与模块级常量一律**置于文件顶部**（`import` 之后），不要夹在函数之间
- 仅供单个函数使用的局部常量/类型，留在该函数内就近声明
- 该约定由评审遵守，**不配置 lint 规则强制**

### 组件类 JSDoc 注释规范

每个组件类必须添加 JSDoc 注释，描述组件的元信息、插槽、事件、CSS Part 和 CSS 自定义属性：

```typescript
/**
 * @summary 警告提示组件，用于展示重要的提示信息，支持多种类型和可关闭功能。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot icon - 自定义图标内容。
 * @slot heading - 自定义标题内容。
 * @slot default - 默认插槽，用于描述内容。
 *
 * @event close - 关闭时触发，detail: `{ visible: false }`。
 *
 * @csspart container - 容器元素。
 * @csspart icon-wrap - 图标包裹元素。
 *
 * @cssproperty --ea-alert-height - 组件高度。
 * @cssproperty --ea-alert-bg-color - 组件背景颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaAlert extends EaBase {
```

**JSDoc 标签说明：**

| 标签           | 必填     | 说明                                                                             |
| -------------- | -------- | -------------------------------------------------------------------------------- |
| `@summary`     | ✅       | 组件的中文简要描述，说明用途和核心功能                                           |
| `@status`      | ✅       | 组件稳定状态：`stable`（稳定）/ `experimental`（实验性）/ `deprecated`（已弃用） |
| `@since`       | ✅       | 组件首次引入的版本号                                                             |
| `@dependency`  | 条件必填 | 依赖的子组件标签名（无依赖则省略）                                               |
| `@slot`        | 条件必填 | 插槽描述，格式：`@slot name - 描述`，默认插槽用 `default`                        |
| `@event`       | 条件必填 | 事件描述，格式：`@event name - 描述，detail: { ... }`                            |
| `@csspart`     | 条件必填 | CSS Part 描述，格式：`@csspart name - 描述`                                      |
| `@cssproperty` | 条件必填 | CSS 自定义属性描述，格式：`@cssproperty --name - 描述`                           |

### 属性命名规则

- **类属性使用小驼峰命名**（如 `closeText`, `showIcon`）
- **框架自动转换为连字符命名**作为 HTML 属性（如 `close-text`, `show-icon`）
- **无需显式声明 `name` 选项**，装饰器会自动处理命名转换
- **组件视觉变体属性统一命名为 `variant`**（而非 `type`），使用 `VARIANT_TYPES` 常量（参见 `variant` 技能）

### 生命周期方法

| 方法                          | 说明       | 调用时机                                                      |
| ----------------------------- | ---------- | ------------------------------------------------------------- |
| `html()`                      | 渲染模板   | `connectedCallback` 中调用，返回 HTML 字符串                  |
| `$mount()`                    | 组件挂载   | `connectedCallback` 后，`requestAnimationFrame` 中            |
| `$mounted()`                  | 挂载完成   | `$mount()` 之后调用                                           |
| `$beforeUnmount()`            | 组件销毁前 | `disconnectedCallback` 开始时                                 |
| `$unmounted()`                | 组件销毁后 | `disconnectedCallback` 结束时                                 |
| `$updated(data)`              | 属性更新   | `attributeChangedCallback` 后，参数 `{ key, newVal, oldVal }` |
| `$updateLocalization(locale)` | 语言更新   | `locale` 属性变化时                                           |

### 事件系统

组件支持两种事件模式，详见 `event` 技能模块：

```typescript
// 自定义事件类（对外公开事件）
this.dispatchEvent(new EaInputChangeEvent({ value: "new" }));
this.dispatchEvent(new EaInputClearEvent({ oldValue: "" }));

// emit（父子组件内部通信）
this.emit("ea-tab-close-icon-click", { detail: { name: this.name } });
```

**事件模式选择规则：**

| 场景                       | 模式          | 理由                                                   |
| -------------------------- | ------------- | ------------------------------------------------------ |
| 对外公开事件（用户监听的） | 自定义事件类  | 控制台显示类名（如 `EaCheckboxChangeEvent`），类型安全 |
| 父子组件内部通信           | `this.emit()` | 轻量级，无需定义事件类                                 |

**事件命名规则：**

| 模式                         | 事件名规则                        | 示例                                           |
| ---------------------------- | --------------------------------- | ---------------------------------------------- |
| 自定义事件类（原生对应事件） | **使用原生事件名**                | `focus`, `blur`, `change`, `input`             |
| 自定义事件类（组件特有事件） | **使用 `ea-` 前缀**               | `ea-clear`, `ea-sort-change`                   |
| `this.emit()`                | **`ea-{component}-{event}` 格式** | `ea-tab-close-icon-click`, `ea-sub-menu-click` |

**自定义事件类规范：**

- 文件组织：组件目录下 `events/Ea{Component}{Action}Event.ts`
- Detail 接口：独立 `export interface`，命名 `Ea{Component}{Action}EventDetail`
- 全局类型注册：仅 `ea-` 前缀的事件名注册到 `GlobalEventHandlersEventMap`，原生事件名不注册（避免与内置类型冲突）
- 构造选项：默认 `{ bubbles: true, composed: true }`
- 阻止原生事件泄漏：当事件名与原生事件同名时，必须在 Shadow DOM 内部 `stopPropagation()` 阻止原生事件穿透，然后从宿主元素派发自定义事件
- **`ea add` 不生成 `events/` 目录也不会写 `@event` JSDoc**：需要对外事件时，手动创建 `events/Ea{Component}{Action}Event.ts` 并补充组件 JSDoc 的 `@event` 标签（参见 `event` 技能）

### BEM 类名规范

使用 `createBEM` 工具生成 BEM 类名（详见 `bem` 技能）：

```typescript
const bem = createBEM("ea-component");

bem(); // "ea-component"
bem.e("content"); // "ea-component__content"
bem({ size: "large" }); // "ea-component ea-component--size-large"
bem({}, { disabled: true }); // "ea-component is-disabled"
bem({ primary: true }, { active: this.active }); // 组合
```

### HTML 安全处理

使用 `html()` 函数处理可能包含 HTML 的内容（详见 `html-safe` 技能）：

```typescript
import { html } from "@easy-component-ui/core/utils/html";

this._container.innerHTML = html(newVal);
```

**注意：** `html()` 函数会自动保护 `<slot>` 标签不被 DOMPurify 清洗，并允许 `ea-` 前缀的自定义元素标签和属性。

### a11y 无障碍属性同步

当组件属性变化时需要同步更新 ARIA 属性（如 `aria-disabled`、`aria-expanded`、`aria-checked`）或 HTML `inert` 属性时，**必须使用 `@attribute` / `@property` 装饰器的 `a11y` 选项**，禁止在 observer 中手动 `setAttribute`/`removeAttribute`。

> 详细的 `A11yOption` 配置、映射模式和不适用场景参见 `attribute` 技能模块。

#### A11yOption 配置

| 字段       | 类型                           | 必填 | 说明                                                                       |
| ---------- | ------------------------------ | ---- | -------------------------------------------------------------------------- |
| `ariaAttr` | `string`                       | 是   | 同步到的 ARIA 属性名（如 `"aria-disabled"`、`"aria-expanded"`、`"inert"`） |
| `target`   | `string`                       | 否   | 目标元素 CSS 选择器，默认 `":host"` 表示组件宿主元素                       |
| `map`      | `(val: any) => string \| null` | 否   | 值映射函数，返回 `null` 时移除属性；省略时用 `String(value)`               |

#### 使用示例

```typescript
// disabled → aria-disabled（宿主元素）
@attribute({
  type: Boolean,
  default: false,
  a11y: {
    ariaAttr: "aria-disabled",
    map: v => String(v),
  },
})
disabled: boolean = false;

// open → aria-expanded（Shadow DOM 内部元素）
@attribute({
  type: Boolean,
  default: false,
  a11y: {
    ariaAttr: "aria-expanded",
    target: ".ea-sub-menu__title",
  },
  observer(this: EaSubMenu) {
    this.updateContainerClasslist();
  },
})
open: boolean = false;

// active → inert（关闭时阻止焦点进入）
@attribute({
  type: Boolean,
  default: false,
  a11y: {
    ariaAttr: "inert",
    map: v => v ? null : "",
  },
})
active: boolean = false;
```

#### 使用规则

**必须使用 `a11y` 选项的场景**（属性值直接决定 ARIA 属性值，目标为宿主或 Shadow DOM 内固定元素）：

| 场景                                 | ariaAttr              | map                      | 示例组件                       |
| ------------------------------------ | --------------------- | ------------------------ | ------------------------------ |
| `disabled` → `aria-disabled`         | `"aria-disabled"`     | `v => String(v)`         | ea-button, ea-input, ea-switch |
| `checked` → `aria-checked`           | `"aria-checked"`      | `v => String(!!v)`       | ea-checkbox, ea-radio          |
| `open` → `aria-expanded`             | `"aria-expanded"`     | 无需 map                 | ea-sub-menu, ea-collapse-item  |
| `active` → `inert`（关闭时阻止焦点） | `"inert"`             | `v => v ? null : ""`     | ea-tab-panel                   |
| `filterable` → `aria-autocomplete`   | `"aria-autocomplete"` | `v => v ? "both" : null` | ea-select                      |
| `value` → `aria-valuenow`            | `"aria-valuenow"`     | `v => String(v)`         | ea-slider, ea-rate             |
| `min` → `aria-valuemin`              | `"aria-valuemin"`     | `v => String(v)`         | ea-slider                      |
| `max` → `aria-valuemax`              | `"aria-valuemax"`     | `v => String(v)`         | ea-slider, ea-rate             |

**禁止使用 `a11y` 选项的场景**（仍需手动管理）：

| 场景           | 原因                                | 示例                                                                            |
| -------------- | ----------------------------------- | ------------------------------------------------------------------------------- |
| 动态 ID 引用   | 值由运行时生成的唯一 ID 决定        | `aria-labelledby`, `aria-controls`, `aria-describedby`, `aria-activedescendant` |
| 多元素批量操作 | 循环中对多个动态元素设置 ARIA 属性  | ea-tree 节点、ea-carousel 项、ea-pagination 按钮                                |
| Light DOM 目标 | `target` 只支持 Shadow DOM 内部元素 | ea-tooltip 触发器、ea-dropdown 触发器                                           |
| 复杂条件逻辑   | 多个属性共同决定一个 ARIA 属性的值  | `disabled                                                                       |     | limitDisabled` |
| 一次性静态设置 | 不随属性变化的固定值                | `aria-modal="true"`, `aria-haspopup="listbox"`                                  |

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

    .#{$name}__content {
      color: var(--color-white);
    }
  }
}
```

### BEM SCSS 命名规范

- 使用 `@include block($name)` 定义组件块
- 使用 `@include element(element-name)` 定义元素
- 使用 `@include modifier(modifier-name)` 定义修饰符
- 使用 `@include state(state-name)` 定义状态
- **仅在 `@include block($name)` 内部使用 elements、modifiers 和 states 的 mixin 函数**
- **在 `@include element()`、`@include modifier()` 和 `@include state()` 内部使用完整 CSS 选择器而非 mixin**

### 设计变量使用原则

1. **优先使用变量**：若在 `packages/themes/src/styles/variables.scss` 中存在的颜色、尺寸、间距等值，必须使用其对应的 CSS 变量
2. **变量命名规范**：自定义变量必须以 `--#{$name}-` 开头，后跟有意义的描述性名称
3. **避免嵌套变量**：不要创建引用其他组件变量的嵌套变量

### 子组件样式覆盖

使用 `::part` 选择器修改子组件样式：

```scss
@include block($name) {
  @include element(trigger) {
    &::part(original) {
      display: none;
    }
  }
}
```

## 文档生成规范

> 详见 `doc` 技能模块

### API 生成规则

1. **Attributes** 以 `@attribute` 装饰器的定义为准（映射 HTML attribute）
2. **Properties** 以 `@property` 装饰器的定义为准（纯 JS 属性，不映射 HTML attribute），仅当组件存在非内部 `@property` 声明时添加此部分，并附注"Properties 为纯 JavaScript 属性，不映射到 HTML attribute，需通过 JS 访问。"
3. **CSS Part** 以模板中 `part="xxx"` 属性为准，表格前添加 MDN `::part()` 引用
4. **Slots** 以模板中 `<slot name="xxx">` 为准
5. **Methods** 以类中公共方法为准（不含 `_` 前缀）
6. **Events** 以 `this.emit()` 调用和自定义事件类为准
7. **CSS Custom Properties** 以 `:host` 中 `--#{$name}-` 前缀的 CSS 变量为准，支持表格和 CSS 代码块两种展示方式

### API 标题命名规范

API 部分的标题使用 **PascalCase 组件名**，不使用 `ea-` 前缀的 kebab-case 格式：

- `## Drawer API`、`### Drawer Attributes` ✅
- `## ea-drawer API`、`### ea-drawer Attributes` ❌

### CSS Custom Properties 标题规范

- 使用英文标题：`### Drawer CSS Custom Properties`
- 禁止使用中文标题：`### Drawer CSS 自定义属性` ❌

### VitePress 容器语法规则

- **`::: code-group` 仅在存在多种语言代码块时使用**（如 HTML + CSS + JS），单一 HTML 代码块禁止使用 `::: code-group`
- 单一代码块：`::: details` 直接包裹代码块
- 多种代码块：`:::: details`（4 个冒号）+ `::: code-group`（3 个冒号）嵌套，闭合符先内 `:::` 后外 `::::`

### `<script setup>` 规范

- 文档中必须包含 `<script setup>` 块，用于导入组件库和编写示例交互逻辑
- 使用 `<PropTag />` 标记 `@property` 属性时，**必须**导入 `import PropTag from './components/PropTag.vue'`
- `onMounted` 中 `document.querySelector` 获取的 DOM 元素**必须**进行 null 检查，避免 `TypeError: Cannot read properties of null`
- 非 `ea-` 前缀的 Vue 组件标签必须在 `<script setup>` 中导入，否则会触发 Vue 警告

## 通用规范

### 代码风格

- 不添加任何注释（除非用户明确要求）
- **例外 1：每个组件类必须添加 JSDoc 注释**，包含 `@summary`、`@status`、`@since` 等元信息标签（参见「组件类 JSDoc 注释规范」）
- **例外 2：每个私有方法必须添加简单的 JSDoc 注释**，格式为 `/** 描述 */`；有参数时必须用 `@param` 说明参数，有返回值时必须用 `@returns` 说明返回值。**包括 `@listen` 事件处理方法**（如 `_handleClick`、`_handleInput`）
- **例外 3：每个公共方法必须添加 JSDoc 注释**，格式为 `/** 描述 */`；有参数时必须用 `@param` 说明参数，有返回值时必须用 `@returns` 说明返回值
- 保持代码简洁、清晰
- 遵循现有的代码风格和命名约定

### 函数命名规范

| 函数类型 | 前缀      | 示例                           | 说明         |
| -------- | --------- | ------------------------------ | ------------ |
| 事件处理 | `_handle` | `_handleClick`, `_handleInput` | 事件回调     |
| 私有方法 | `_`       | `_updateUI`, `_renderData`     | 组件内部使用 |
| 公共方法 | 无        | `setData`, `show`, `hide`      | 对外 API     |
| 生命周期 | `$`       | `$mount`, `$beforeUnmount`     | 生命周期钩子 |
| 渲染相关 | `_render` | `_renderItems`                 | 渲染方法     |

### 文件操作

- 优先编辑现有文件，而不是创建新文件
- 不要主动创建文档文件（*.md）或 README 文件，除非用户明确要求

### 开发流程

1. 使用 `TodoWrite` 工具规划和跟踪任务
2. **新建组件使用 `ea add` 生成合规骨架**（见「CLI 工具规范」），不要手写组件骨架
3. 使用 `SearchCodebase` 工具搜索和理解代码库
4. 遵循项目现有的库和框架
5. 遵循安全最佳实践，不暴露或记录密钥和机密信息

## CLI 工具规范

> 详见 `cli` 技能模块；CLI 源码见 `packages/cli`

工程项目内置 CLI（bin 名 `ea`），把组件目录规范变成可执行命令。**新建组件必须走 `ea add`，禁止手写组件骨架。**

| 命令                                  | 用途                                                                        |
| ------------------------------------- | --------------------------------------------------------------------------- |
| `ea add [name]`（别名 `new` / `gen`） | 生成合规新组件三件套，支持复合组件（`--with`）与私有组件（`--parts`）       |
| `ea check`                            | 校验组件目录规范（同名测试 / 命名 / 孤儿测试 / 共享测试区），error 退出码 1 |
| `ea init --templates`                 | 将内置模板落盘到项目（二次开发起点）                                        |

**本仓库调用方式**（CLI 以源码接入，尚未发布为全局可执行，须经包管理器脚本转发）：

```bash
pnpm ea add my-widget                 # 新建组件（推荐）
pnpm ea add my-widget --with sub --parts item --summary "摘要" --yes
pnpm ea check                         # 等价于 pnpm check
# npm 环境：npm run ea -- add my-widget
```

**关键要求**：

- **新建组件先跑 `ea add`**：其内置注册、JSDoc、`HTMLElementTagNameMap`、同名测试与 BEM 骨架，手写必漏。生成后再按需用 `attribute` / `property` / `variant` / `query` / `listen` / `css` / `test` / `doc` 等技能完善细节。
- **`ea add` 需完整 config**：`ea.config.json` 的 `componentDirs` / `testDir` / `entry` 等路径 + `prefix` 必配（缺 `prefix` 会前置报错引导配置）；`ea check` 的 `prefix` 可选（退化为纯 WC 全名校验）。
- **非交互（脚本 / CI）须给全参数并加 `--yes`**；无 TTY 且缺输入会直接报错。
- **不要手改聚合入口 `// @ea-generated:start` ~ `// @ea-generated:end` 标记区内内容**：该区由 CLI 依据各组件 `index.ts` 具名值导出重建，标记区之外的手工内容原位保留。
- **组件 `index.ts` 只导出该组件公开 API 值**（组件类 / 子组件类 / 服务类），非组件工具不进组件出口。
- **组件名须 kebab-case**（禁止大写），最终全名 = `${prefix}-` + 裸名，且 ≤ 246 字符。

## 测试规范

> 详见 `test` 技能模块

### 测试文件存放规范

1. **单组件单测必须与组件同目录**，命名为 `<组件名>.test.ts`（与 `index.ts` 同级平铺，不使用 `__tests__/` 子目录）
2. **`packages/components/src/test/` 只允许存放**：共享测试工具（`utils/`）、全局 setup（`setup.ts`）、跨组件集成测试（`integration/`）、基类行为测试、浏览器端测试（`browser/`）
3. **禁止**在 `src/test/` 下新建任何 `ea-<组件名>.test.ts` 单组件测试文件（白名单：`ea-form-associated-base.test.ts`）
4. `packages/components/src/components/*/` 与 `packages/components/src/common/*/` 下凡存在 `index.ts` 的目录，**必须**存在同名 `*.test.ts`
5. 组件目录内的测试引用共享工具使用 `../../test/utils/*` 相对路径（common 目录下同理）

### 统一等待工具函数

```javascript
import { waitForRender } from "../../test/utils/waitForRender";

await waitForRender(); // 等待渲染完成（默认 100ms）
await waitForRender(0); // 只等一帧（单 rAF）
await waitForRender(200); // 等真实 200ms
```

`$mount()` 与属性 `observer` 都挂在 `requestAnimationFrame` 上，部分组件 `$mount` 还会 `await import()` 懒加载子组件，故渲染/observer 更新需要等待；Shadow DOM 结构与属性值读取是同步的，无需等待。

### DOMPurify 属性丢失问题

若测试中属性丢失或为空，优先考虑 DOMPurify 清洗问题，使用 DOM API 替代 HTML 字符串：

```typescript
// 推荐：使用 DOM API
const img = document.createElement("img");
img.srcset = value;
this._container.appendChild(img);
```

## 常见陷阱与注意事项

### 1. 避免使用 HTMLElement 保留属性名

`HTMLElement` 有内置属性（如 `title`, `lang`, `dir`, `draggable`, `tabIndex`, `style`, `className`, `id`, `hidden` 等）。使用 `@attribute` 声明与保留属性同名的属性会导致 jsdom 自定义元素升级失败。

- `title` → `heading`
- `type` → `variant`

### 2. 用 CSS 状态类替代 JS style 控制显隐

使用 BEM 状态类（`is-xxx`）配合 SCSS 的 `@include state()` 控制，通过 `updateContainerClasslist()` 统一管理，而非 `element.style.display = "none"`。

### 3. $mount 中的 DOM 移动操作

`$mount()` 在 `connectedCallback` 中触发，DOM 移动操作（如 `appendChild(this)`）会导致 `disconnectedCallback` + `connectedCallback` 重新触发。需区分场景处理：

**自身移动**（`parent.appendChild(this)`）：允许在 `$mount()` 中执行，但**必须**有防重入保护：

```typescript
private _appendHandled: boolean = false;

private _handleAppendTo(): void {
  if (this._appendHandled) return;
  if (this.parentElement !== target) {
    this._appendHandled = true;
    target.appendChild(this);
  }
}

$mount(): void {
  this._handleAppendTo();
}
```

**子元素操作**（`this.appendChild(child)`、`this.insertBefore(child)`）：在 `$mount()` 中一般安全，推荐用 `queueMicrotask` 延迟执行。

**`appendToBody` / `appendTo` 模式**：弹出层类组件（overlay、dialog、drawer）的标准模式，通过 `@attribute` 定义属性，在 observer 和 `$mount()` 中调用 `_handleAppendTo()`，使用 `_appendHandled` 标志位防重入。

---

## 更新日志

### v3.10.1 (2026-10-18)

- **技能索引补录 `js` 模块**：技能目录实际 19 个，索引此前只列 18 个且漏登 `js`，已补「编码规范」分组并将总数更正为 19
- **骨架示例对齐 `ea add` 生成物**：`query` 技能根容器改用 `@query(bem.cb())` 并立规范；`rules` / `js` / `css` / `variant` 的 `updateContainerClasslist()` 补 `if (this._container)` 守卫；`js` 主框架示例补 `export default` + `declare global { HTMLElementTagNameMap }`
- **修正残缺与陈旧片段**：`css` 技能的 `updateContainerClasslist()` 此前声明返回 `string` 却无 `return`，已补全；`js` 核心要点残留旧基类名 `FormBase` → `EaFormAssociatedBase`

### v3.10.0 (2026-10-17)

- **目录结构更新为 monorepo 布局**：`packages/components` / `core` / `themes` / `cli` / `mcp-server` 分述，明确 core、themes 已独立为独立包
- **导入路径更新**：`@core/EaBase` → `@easy-component-ui/core/core/EaBase`，`@decorator` → `@easy-component-ui/core/decorator`，`@utils/*` → `@easy-component-ui/core/utils/*`；`@components` / `@common` / `@constants` 为组件包局部别名保持不变
- **主题样式路径更新**：`src/themes/variables.scss` → `packages/themes/src/styles/variables.scss`
- **测试文件扩展名更新**：`*.test.js` → `*.test.ts`，共享测试区路径补全为 `packages/components/src/test/`
- **骨架文档对齐 `ea add` 生成物**：组件结构示例补 `export default` + `declare global { HTMLElementTagNameMap }`，`@query` 改用 `bem.cb()`；事件章节注明 `ea add` 不生成 `events/` 目录与 `@event` JSDoc
- **补建 core `performance` 工具**：新增 `debounce` / `throttle`（`@easy-component-ui/core/utils/performance`），修正 `js` 技能中的悬空引用
- **`git-commit-message` scope 表新增 `cli`**；`type-declaration` 技能修正 `HTMLElementTagNameMap` 归属（由 `index.ts` 声明，`types.d.ts` 不重复）

### v3.9.0 (2026-10-17)

- **新增「CLI 工具规范」章节**：明确**新建组件必须走 `ea add`**（本仓库经 `pnpm ea add` / `npm run ea -- add` 转发），给出 `ea add` / `ea check` / `ea init` 命令面与调用方式
- **开发流程新增步骤**：新建组件使用 `ea add` 生成合规骨架，禁止手写组件骨架
- **新增 `cli` 技能模块**：覆盖命令规格、生成产物结构、命名规则、聚合入口哨兵机制与常见陷阱

### v3.8.0 (2026-10-08)

- **测试文件同目录迁移**：单组件单测从 `src/test/` 迁移至各组件目录（67 个组件测试 + 2 个 common 子组件测试），使组件目录成为自包含单元
- **测试文件存放规范**：新增存放规范章节，定义 `<组件名>.test.js` 与组件同级平铺规则，及 `src/test/` 职责收缩为共享测试区
- **目录结构更新**：组件目录新增测试文件条目；`test/` 收缩为 setup、utils、integration、基类测试、browser 测试
- **集成测试归位**：`ea-form-integration.test.js` 移入 `src/test/integration/`

### v3.7.0 (2026-06-04)

- **a11y 无障碍属性同步规范**：新增完整的 a11y 规范章节，定义 `a11y` 装饰器选项的使用规则
- **核心变更新增 a11y**：属性同步从手动 `setAttribute` 改为 `@attribute`/`@property` 的 `a11y` 选项
- **组件示例更新**：组件结构规范示例中 `disabled` 属性添加 `a11y` 选项演示
- **核心要点更新**：新增"使用 `a11y` 选项自动同步 ARIA 属性"规则
- **使用规则定义**：明确必须使用和禁止使用 `a11y` 选项的场景

### v3.6.0 (2026-06-02)

- **文档生成规范大幅扩充**：新增 `<script setup>` 规范（组件库导入、PropTag 导入、DOM null 检查）
- **API 标题命名规范**：明确 PascalCase 格式，禁止 kebab-case
- **CSS Custom Properties 规范**：英文标题、支持表格和 CSS 代码块两种展示方式
- **CSS Part 规范**：表格前添加 MDN `::part()` 引用
- **PropTag 导入要求**：使用 `<PropTag />` 时必须导入 `import PropTag from './components/PropTag.vue'`
- **DOM null 检查要求**：`onMounted` 中 `querySelector` 结果必须进行 null 检查
- **VitePress 自定义元素注意事项**：非 `ea-` 前缀的 Vue 组件标签必须导入

### v3.5.0 (2026-05-30)

- **JSDoc 注释规范补充**：明确私有方法注释包括 `@listen` 事件处理方法，新增公共方法 JSDoc 注释为必填项（例外 3）
- **emit() 事件命名规范强化**：`this.emit()` 事件名格式从 `ea-{event}` 细化为 `ea-{component}-{event}`，明确此类事件服务于组件内部逻辑
- **自定义事件类规范强化**：原生事件名适配原则（封装原生元素时使用原生事件名而非 `ea-` 前缀），派发前必须 `stopPropagation()` 阻止原生事件穿透

### v3.4.0 (2026-05-27)

- **事件策略优化**：自定义事件类用于对外公开事件（控制台显示类名），`this.emit()` 仅用于父子组件内部通信
- **事件命名统一 `ea-` 前缀**：`this.emit()` 的事件名也统一使用 `ea-` 前缀，标识内部通信性质
- **$mount DOM 移动规则重写**：不再一刀切禁止，区分自身移动（需防重入保护）和子元素操作（一般安全），新增 `appendToBody`/`appendTo` 标准模式

### v3.3.0 (2026-05-27)

- **事件系统规范化**：定义双轨命名策略（emit 模式 vs 自定义事件类）
- **自定义事件类统一 `ea-` 前缀**：所有 Event 子类的事件名统一使用 `ea-` 前缀
- **自定义事件类规范**：Detail 接口独立导出、全局类型注册统一到 `GlobalEventHandlersEventMap`
- **目录结构更新**：组件目录新增 `events/` 子目录说明
- **文档生成规则更新**：Events 以 `this.emit()` 调用和自定义事件类为准
- 事件技能模块大幅扩充

### v3.2.0 (2026-05-27)

- **装饰器统一导入**：从 `@easy-component-ui/core/decorator` 统一导入，禁止零散路径
- **导入顺序规范**：定义标准导入顺序（基类 → 装饰器 → 工具 → 常量 → 资源）
- **组件类 JSDoc 注释规范**：新增 `@summary`、`@status`、`@since`、`@dependency`、`@slot`、`@event`、`@csspart`、`@cssproperty` 标签
- 代码风格更新：组件类 JSDoc 注释为必填项

### v3.1.0 (2026-05-27)

- 新增 `@property` 装饰器文档
- 新增 `@queryAll` 装饰器文档
- 新增 `@listen` 装饰器完整选项（capture/passive/once, 特殊 selector 值）
- 新增 `@CustomElement` 的 `extraAttr` 选项
- 修正基类名称：`FormBase` → `EaFormAssociatedBase`
- 修正生命周期方法签名：`$updated(data: { key, newVal, oldVal })`
- 新增 `$mounted()` 生命周期方法
- 新增 `$updateLocalization()` 生命周期方法
- 新增 `html()` 函数的 slot 保护机制和 DOMPurify 配置说明
- 补全目录结构：`common/`、`stores/`、`constants/`
- 统一测试工具路径：`src/test/utils/waitForRender.js`
- 添加版本追踪和更新日志
- 技能模块原子化拆分（16 个独立技能）
- 规则精简为高层规范 + 技能索引
