---
name: "form-base"
description: "EaFormAssociatedBase for form-associated components. Invoke when creating or updating form components (input / select / checkbox / switch etc.) that need form integration, validation timing, error state and native bubble handling."
---

# EaFormAssociatedBase 表单关联基类

表单组件基类，继承自 `EaBase`，提供表单集成、校验发布与错误态能力。

## 导入

```typescript
import EaFormAssociatedBase from "@easy-component-ui/core/core/EaFormAssociatedBase";
```

## 继承关系

```
HTMLElement
  └── EaBase           (基础组件基类)
        └── EaFormAssociatedBase  (表单关联基类)
```

## 使用场景

当组件需要：

- 参与表单提交
- 支持表单验证
- 与 `<form>` 元素交互
- 支持 `name`、`value`、`required`、`disabled` 等表单属性

应继承 `EaFormAssociatedBase` 而非 `EaBase`。

## 最小示例

```typescript
import EaFormAssociatedBase from "@easy-component-ui/core/core/EaFormAssociatedBase";
import {
  CustomElement,
  attribute,
  query,
} from "@easy-component-ui/core/decorator";
import { createBEM } from "@easy-component-ui/core/utils/bem";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-example" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaExample extends EaFormAssociatedBase {
  @query(bem.ce("original"))
  private _original!: HTMLInputElement;

  /** 校验目标：决定原生约束下发与提示锚点的起点 */
  get validationTarget(): HTMLInputElement {
    return this._original;
  }

  /** 空值判定；`0` 是否算空由组件自己决定 */
  protected $isEmpty(value: unknown): boolean {
    return value === "" || value == null;
  }

  /**
   * 组件专属文案
   * @param flag 原生 validity 标记
   * @param limit 长度类规则的阀值
   * @returns 错误文案
   */
  protected $validationMessage(flag: string, limit?: number): string {
    if (flag === "valueMissing") return "请选择内容";

    return super.$validationMessage(flag, limit);
  }

  /** 表单重置：清值并收起面板 */
  formResetCallback(): void {
    super.formResetCallback();
    this._closeDropdown();
  }

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <input class="${bem.e("original")}" part="original" />
      </div>
    `;
  }
}
```

## 校验契约

### 自动发布

- `$mounted()` / `$updated()` 自动调用 `updateValidity()`，结果发布到 `ElementInternals`；组件与业务侧都不需要手动触发
- 子类**只覆盖** `$validate()` / `$isEmpty()` / `$validationMessage()` / `$validationAnchor()`，**不覆盖** `updateValidity()`
- `$validate()` 按「必填 → 原生 validity → 程序化长度」顺序返回首个失败项，返回 `null` 表示通过；子类可追加自定义规则

### 错误态：`data-invalid`

- 校验失败时基类写 `data-invalid` 到宿主，样式用 `:host([data-invalid])` 定制
- 是否展示由交互门控决定：首屏与未交互前只有 validity 为 false，不写 `data-invalid`
- **禁止**再用 `:host(:invalid)`：`:invalid` 由 `internals.validity` 驱动，进页面就会命中

### 错误提示：`data-error-display`

| 取值             | 行为                                                           |
| ---------------- | -------------------------------------------------------------- |
| `native`（默认） | 只用浏览器原生校验气泡，不写文案属性、不占位                   |
| `text`           | 只写 `data-invalid-message` 渲染文案，不发布失效状态、不弹气泡 |

两种模式互斥：`text` 模式下基类不向 `ElementInternals` 发布失效状态（浏览器没有可报告的错误就不会弹气泡），所以这类控件**不参与原生约束校验**——提交由基类在根节点捕获阶段拦住，`form.checkValidity()` 也看不到它们；需要原生语义（表单级校验 API、气泡）时用 `native`。

组件 scss 只需一行接入：

```scss
@include form-error-message;
```

`data-error-display` 与 `data-validate-trigger` 都可以写在 `<form>` 上统配，优先级为「组件属性 > form 属性 > 默认值」，form 属性动态变更会实时刷新。

### 错误展示时机：`data-validate-trigger`

| 取值           | 何时展示错误                                                         |
| -------------- | -------------------------------------------------------------------- |
| `auto`（默认） | `input` / `change` / `focusout` 交互，或提交被拦、`reportValidity()` |
| `submit`       | 仅提交被拦或 `reportValidity()`                                      |
| `manual`       | 只能由 `markTouched()` 主动展示，`resetTouched()` 收起               |

### 重置

- 子类覆盖 `formResetCallback()` 时必须调用 `super.formResetCallback()` 或 `$resetValidity()`
- `$resetValidity()` 收起错误态并按当前约束重算；直接 `setValidity({})` 会留下错误样式且抹掉 `required`
- 有展开面板的组件（date-picker / time-picker）还需要在 `formResetCallback()` 里收起面板

### 提示锚点

锚点解析顺序（`_resolveAnchor()`）：

1. `$validationAnchor()` 子类显式指定
2. 验证目标自身（且是可见的原生控件）
3. 验证目标内部第一个可见原生控件
4. 验证目标自身可见（容器或自定义元素）
5. 自身 shadow 内第一个可见原生控件
6. 自身 shadow 内可见的 `[tabindex]:not([tabindex="-1"])`
7. 不传锚点

原生提示只在可见元素上渲染。验证目标是容器 `div` 或自定义元素时，需要下探到内部原生控件，否则气泡不出现。

## 提交按钮

自定义提交按钮必须走原生提交，才能先跑约束校验：

```typescript
private _handleClick(e: Event): void {
  const form = this.closest("form");
  if (!form) return;

  e.preventDefault();
  if (typeof form.requestSubmit === "function") form.requestSubmit();
  else form.submit();
}
```

## 常见陷阱

| 现象                             | 原因                                          | 做法                                                     |
| -------------------------------- | --------------------------------------------- | -------------------------------------------------------- |
| 首屏就报红                       | 样式绑了 `:host(:invalid)`                    | 改用 `:host([data-invalid])`                             |
| 非法值仍能提交                   | `dispatchEvent(new Event("submit"))` 伪造提交 | 用 `form.requestSubmit()`                                |
| 文案占位突然变高                 | `data-error-display="text"` 会多一行          | 默认用 `native`，只给需要兜底的组件配 `text`             |
| 提交后没有气泡                   | 锚点指向 `display:none` 的隐藏控件            | 让 `_visibleAnchor()` 生效，或覆写 `$validationAnchor()` |
| 勾选后仍然报必填                 | 值原地 `push`，且 `change` 不跨 shadow        | 不可变赋值 + 在 change 处理里显式 `updateValidity()`     |
| 重置后红框残留                   | 子类直接 `setValidity({})`                    | 调 `$resetValidity()` 或 `super.formResetCallback()`     |
| `form.checkValidity()` 全为 true | `text` 模式不参与原生约束校验                 | 逐控件调 `checkValidity()`，或改用 `native`              |

## 测试

- 基类行为：`packages/core/src/test/EaFormAssociatedBase.test.ts`
- 跨组件表单集成：`packages/components/src/test/integration/ea-form-integration.test.ts`
- 组件侧至少覆盖：首屏不展示错误、交互后展示、填满后回落、重置后复位

## 常见表单组件

以下组件继承自 `EaFormAssociatedBase`：

- `ea-input` - 输入框
- `ea-input-number` - 数字输入框
- `ea-select` - 选择器
- `ea-checkbox` / `ea-checkbox-group` - 复选框
- `ea-radio` / `ea-radio-group` - 单选框
- `ea-switch` - 开关
- `ea-slider` - 滑块
- `ea-rate` - 评分
- `ea-date-picker` - 日期选择器
- `ea-time-picker` - 时间选择器
- `ea-color-picker` - 颜色选择器
- `ea-transfer` - 穿梭框
- `ea-upload` - 上传
