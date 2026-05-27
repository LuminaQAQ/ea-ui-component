---
name: "form-base"
description: "EaFormAssociatedBase for form-associated components. Invoke when creating form components like input, select, checkbox that need form integration."
---

# EaFormAssociatedBase 表单关联基类

表单组件基类，继承自 `EaBase`，提供表单集成能力。

## 导入

```typescript
import EaFormAssociatedBase from "@core/EaFormAssociatedBase";
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

## 使用示例

```typescript
import EaFormAssociatedBase from "@core/EaFormAssociatedBase";
import { CustomElement, attribute, query } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-input" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaInput extends EaFormAssociatedBase {
  @query(".ea-input__inner")
  private _input!: HTMLInputElement;

  @attribute({
    type: String,
    default: "",
    observer(this: EaInput, newVal: string) {
      this._input.value = newVal;
    },
  })
  value: string = "";

  @attribute({
    type: Boolean,
    default: false,
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
  })
  required: boolean = false;

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <input class="${bem.e('inner')}" part="inner" />
      </div>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
```

## 表单集成测试

项目提供了表单集成测试文件 `src/test/ea-form-integration.test.js`，验证表单组件与 `<form>` 元素的交互行为。

## 常见表单组件

以下组件继承自 `EaFormAssociatedBase`：
- `ea-input` - 输入框
- `ea-select` - 选择器
- `ea-checkbox` - 复选框
- `ea-radio` - 单选框
- `ea-switch` - 开关
- `ea-input-number` - 数字输入框
- `ea-slider` - 滑块
- `ea-rate` - 评分
- `ea-date-picker` - 日期选择器
- `ea-time-picker` - 时间选择器
- `ea-color-picker` - 颜色选择器
