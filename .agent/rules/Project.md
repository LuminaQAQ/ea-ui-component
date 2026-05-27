# ea-ui-component 项目开发规范

> **版本**: 3.1.0  
> **最后更新**: 2026-05-27  
> **更新日志**: 见文末

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
├── common/             # 公共子组件
│   ├── ea-overlay/     # 遮罩层
│   └── ea-popper/      # 弹出定位
├── core/               # 核心基础类
│   ├── EaBase.ts       # 组件基类
│   └── EaFormAssociatedBase.ts  # 表单关联基类
├── decorator/          # 装饰器
│   ├── attribute.ts    # 属性装饰器（映射 HTML attribute）
│   ├── property.ts     # 属性装饰器（纯 JS 属性，不映射 HTML attribute）
│   ├── custom-element.ts # 自定义元素装饰器
│   ├── query.ts        # DOM 查询装饰器（@query / @queryAll）
│   └── listen.ts       # 事件监听装饰器
├── utils/              # 工具函数
│   ├── bem.ts          # BEM 类名生成（createBEM）
│   ├── html.ts         # HTML 安全处理（DOMPurify 封装）
│   ├── Enum.ts         # 枚举类型工具
│   ├── case-convert.ts # 大小写转换
│   ├── h.ts            # 元素创建辅助
│   ├── parseAttributeValue.ts # 属性值解析
│   └── timeout.ts      # 定时器工具
├── constants/          # 常量定义
│   └── variant.ts      # 统一变体类型（VARIANT_TYPES 等）
├── types/              # 全局类型定义
├── stores/             # 状态存储（属性/样式缓存）
├── themes/             # 主题样式
│   ├── variables.scss  # CSS 变量定义
│   ├── mixins.scss     # SCSS mixin
│   ├── namespace.scss  # BEM mixin 定义
│   ├── light.scss      # 浅色主题
│   └── dark.scss       # 深色主题
└── test/               # 测试文件
    └── utils/          # 测试工具
        └── waitForRender.js
```

### 核心变更（重构后）

1. **基类变更**：`Base` → `EaBase`，路径从 `@components/Base` 改为 `@core/EaBase`
2. **表单基类**：`FormBase` → `EaFormAssociatedBase`，路径 `@core/EaFormAssociatedBase`
3. **BEM 工具**：`namespace()` → `createBEM()`，路径从 `@/directives/namespace` 改为 `@utils/bem`
4. **属性定义**：`this.properties()` → `@attribute()` 装饰器（映射 HTML attribute）/ `@property()` 装饰器（纯 JS 属性）
5. **事件监听**：手动 `addEventListener` → `@listen()` 装饰器
6. **DOM 查询**：手动 `querySelector` → `@query()` / `@queryAll()` 装饰器
7. **HTML 安全**：使用 `html()` 工具函数处理 HTML 内容

## TypeScript 开发规范

### 组件结构规范

所有组件必须继承 `EaBase` 类（表单组件继承 `EaFormAssociatedBase`），使用装饰器模式定义：

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
  @query(".ea-component")
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
    observer(this: EaComponent) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  updateContainerClasslist(): string {
    const className = bem({ [this.size]: true }, { disabled: this.disabled });
    this._container.className = className;
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
```

**核心要点：**

- 继承 `EaBase` 类（表单组件继承 `EaFormAssociatedBase`）
- 使用 `@CustomElement` 装饰器注册组件
- 使用 `@attribute` 装饰器定义 HTML attribute 映射属性
- 使用 `@property` 装饰器定义纯 JS 属性（不映射 HTML attribute）
- 使用 `@query` / `@queryAll` 装饰器获取 DOM 元素
- 使用 `@listen` 装饰器绑定事件
- 使用 `createBEM()` 生成 BEM 类名
- 使用 `html()` 函数处理 HTML 内容（防止 XSS）
- 样式导入使用 `?inline` 后缀
- 私有属性使用 `_` 前缀（`#` 与装饰器不兼容）

### 装饰器速查

> 详细用法参见对应技能模块

| 装饰器 | 用途 | 技能 |
|--------|------|------|
| `@CustomElement` | 注册自定义元素 | `custom-element` |
| `@attribute` | 定义 HTML attribute 映射属性 | `attribute` |
| `@property` | 定义纯 JS 属性 | `property` |
| `@query` | 查询单个 DOM 元素 | `query` |
| `@queryAll` | 查询多个 DOM 元素 | `query` |
| `@listen` | 绑定事件监听 | `listen` |

### 属性命名规则

- **类属性使用小驼峰命名**（如 `closeText`, `showIcon`）
- **框架自动转换为连字符命名**作为 HTML 属性（如 `close-text`, `show-icon`）
- **无需显式声明 `name` 选项**，装饰器会自动处理命名转换
- **组件视觉变体属性统一命名为 `variant`**（而非 `type`），使用 `VARIANT_TYPES` 常量（参见 `variant` 技能）

### 生命周期方法

| 方法 | 说明 | 调用时机 |
|------|------|---------|
| `html()` | 渲染模板 | `connectedCallback` 中调用，返回 HTML 字符串 |
| `$mount()` | 组件挂载 | `connectedCallback` 后，`requestAnimationFrame` 中 |
| `$mounted()` | 挂载完成 | `$mount()` 之后调用 |
| `$beforeUnmount()` | 组件销毁前 | `disconnectedCallback` 开始时 |
| `$unmounted()` | 组件销毁后 | `disconnectedCallback` 结束时 |
| `$updated(data)` | 属性更新 | `attributeChangedCallback` 后，参数 `{ key, newVal, oldVal }` |
| `$updateLocalization(locale)` | 语言更新 | `locale` 属性变化时 |

### 事件系统

```typescript
// 简单事件
this.emit("focus");

// 带数据的事件
this.emit("change", { detail: { value: newVal } });

// 自定义事件类（ea- 前缀）
this.dispatchEvent(new EaComponentChangeEvent({ value: "new" }));
```

### BEM 类名规范

使用 `createBEM` 工具生成 BEM 类名（详见 `bem` 技能）：

```typescript
const bem = createBEM("ea-component");

bem();                              // "ea-component"
bem.e("content");                   // "ea-component__content"
bem({ size: "large" });             // "ea-component ea-component--size-large"
bem({}, { disabled: true });        // "ea-component is-disabled"
bem({ primary: true }, { active: this.active });  // 组合
```

### HTML 安全处理

使用 `html()` 函数处理可能包含 HTML 的内容（详见 `html-safe` 技能）：

```typescript
import { html } from "@utils/html";

this._container.innerHTML = html(newVal);
```

**注意：** `html()` 函数会自动保护 `<slot>` 标签不被 DOMPurify 清洗，并允许 `ea-` 前缀的自定义元素标签和属性。

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

1. **优先使用变量**：若在 `src/themes/variables.scss` 中存在的颜色、尺寸、间距等值，必须使用其对应的 CSS 变量
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

1. **Attributes** 以 `@attribute` 装饰器的定义为准
2. **CSS Part** 以模板中 `part="xxx"` 属性为准
3. **Slots** 以模板中 `<slot name="xxx">` 为准
4. **Methods** 以类中公共方法为准（不含 `_` 前缀）
5. **Events** 以 `this.emit()` 调用为准

## 通用规范

### 代码风格

- 不添加任何注释（除非用户明确要求）
- **例外：每个私有方法必须添加简单的 JSDoc 注释**，格式为 `/** 描述 */`；有参数时必须用 `@param` 说明参数，有返回值时必须用 `@returns` 说明返回值
- 保持代码简洁、清晰
- 遵循现有的代码风格和命名约定

### 函数命名规范

| 函数类型 | 前缀 | 示例 | 说明 |
|----------|------|------|------|
| 事件处理 | `_handle` | `_handleClick`, `_handleInput` | 事件回调 |
| 私有方法 | `_` | `_updateUI`, `_renderData` | 组件内部使用 |
| 公共方法 | 无 | `setData`, `show`, `hide` | 对外 API |
| 生命周期 | `$` | `$mount`, `$beforeUnmount` | 生命周期钩子 |
| 渲染相关 | `_render` | `_renderItems` | 渲染方法 |

### 文件操作

- 优先编辑现有文件，而不是创建新文件
- 不要主动创建文档文件（*.md）或 README 文件，除非用户明确要求

### 开发流程

1. 使用 `TodoWrite` 工具规划和跟踪任务
2. 使用 `SearchCodebase` 工具搜索和理解代码库
3. 遵循项目现有的库和框架
4. 遵循安全最佳实践，不暴露或记录密钥和机密信息

## 测试规范

> 详见 `test` 技能模块

### 统一等待工具函数

```javascript
import { waitForRender } from "./utils/waitForRender";

await waitForRender();    // 默认 100ms
await waitForRender(200); // 自定义
await waitForRender(0);   // 微任务等待
```

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

### 3. $mount 中不应执行 DOM 移动操作

`$mount()` 在 `connectedCallback` 中触发，执行 DOM 移动操作（如 `appendChild`）会导致无限递归。DOM 移动操作应放在 `constructor` 中。

**安全操作**：`updateContainerClasslist()`、`setAttribute()`、DOM 查询和读取  
**危险操作**：`appendChild()`、`insertBefore()`、`remove()`、`removeChild()`

---

## 更新日志

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
