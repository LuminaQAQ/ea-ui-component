import EaBase from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";

/**
 * 表单关联基类
 * 为表单组件提供表单关联功能、验证功能和表单值管理
 */
@CustomElement("ea-form-associated-base", { autoDefine: false })
export class EaFormAssociatedBase extends EaBase {
  static formAssociated = true;

  /** ElementInternals 实例，用于表单关联 */
  declare internals: ElementInternals;

  // ==================== 属性定义 ====================

  /**
   * 字段名称
   */
  @attribute({
    type: HTMLFormElement,
    default: function (this: EaFormAssociatedBase) {
      return this.internals.form;
    },
  })
  form: HTMLFormElement | null = null;

  /**
   * 字段名称
   */
  @attribute({
    type: String,
    default: "",
  })
  name: string = "";

  /**
   * 字段名称
   */
  @attribute({
    type: String,
    default: function (this: EaFormAssociatedBase) {
      return this.localName;
    },
  })
  type: string = "";

  /**
   * 验证状态
   */
  @attribute({
    type: ValidityState,
    default: function (this: EaFormAssociatedBase) {
      return this.internals?.validity ?? null;
    },
  })
  validity: ValidityState | null = null;

  /**
   * 获取内部验证消息
   */
  @attribute({
    type: String,
    default: function (this: EaFormAssociatedBase) {
      return this.internals?.validationMessage ?? "";
    },
  })
  validationMessage: string = "";

  /**
   * 是否将参与验证
   */
  @attribute({
    type: Boolean,
    default: function (this: EaFormAssociatedBase) {
      return this.internals?.willValidate ?? false;
    },
  })
  willValidate: boolean = false;

  /**
   * 禁用状态
   */
  @attribute({
    type: Boolean,
    default: false,
  })
  disabled: boolean = false;

  /**
   * 字段值
   */
  @attribute({
    type: String,
    default: "",
    observer(this: EaFormAssociatedBase, newVal: string) {
      this.internals?.setFormValue(newVal);
    },
  })
  value: string | any = "";

  /**
   * 必填状态
   */
  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaFormAssociatedBase, newVal: boolean) {
      this.validationTarget?.toggleAttribute("required", newVal);
    },
  })
  required: boolean = false;

  /**
   * 最小长度
   */
  @attribute({
    type: Number,
    default: 0,
    observer(this: EaFormAssociatedBase, newVal: number) {
      this.validationTarget?.setAttribute("minlength", String(newVal));
    },
  })
  minlength: number | string | null = null;

  /**
   * 最大长度
   */
  @attribute({
    type: Number,
    default: 0,
    observer(this: EaFormAssociatedBase, newVal: number) {
      this.validationTarget?.setAttribute("maxlength", String(newVal));
    },
  })
  maxlength: number | string | null = null;

  /**
   * 最小值
   */
  @attribute({
    type: Number,
    default: 0,
    observer(this: EaFormAssociatedBase, newVal: number) {
      this.validationTarget?.setAttribute("min", String(newVal));
    },
  })
  min: number | string | null = null;

  /**
   * 最大值
   */
  @attribute({
    type: Number,
    default: 0,
    observer(this: EaFormAssociatedBase, newVal: number) {
      this.validationTarget?.setAttribute("max", String(newVal));
    },
  })
  max: number | string | null = null;

  /**
   * 模式匹配
   */
  @attribute({
    type: String,
    default: "",
    observer(this: EaFormAssociatedBase, newVal: string) {
      if (newVal) {
        this.validationTarget?.setAttribute("pattern", newVal);
      } else {
        this.validationTarget?.removeAttribute("pattern");
      }
    },
  })
  pattern: string | null = null;

  // ==================== 抽象属性 ====================

  /**
   * 获取验证目标元素，需子组件实现
   * @returns 验证目标元素
   */
  get validationTarget(): HTMLElement | null | undefined {
    return undefined;
  }

  get labels() {
    return this.internals.labels;
  }

  // ==================== 构造函数 ====================

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  // ==================== 方法 ====================

  /**
   * 获取关联的表单元素
   * @returns 表单元素或 null
   */
  getForm(): HTMLFormElement | null {
    return this.internals?.form ?? null;
  }

  /**
   * 设置表单值
   * @param value - 表单值
   */
  setValue(value: string | File | FormData | null): void {
    if (this.internals && typeof this.internals.setFormValue === "function") {
      this.internals.setFormValue(value);
    }
  }

  /**
   * 移除表单值
   */
  removeValue(): void {
    if (this.internals && typeof this.internals.setFormValue === "function") {
      this.internals.setFormValue(null);
    }
  }

  /**
   * 更新表单验证状态
   * 使用内部 input 元素的 validity 状态
   */
  updateValidity(): void {
    if (this.tagName === "EA-BUTTON") return;

    const formControl = this.validationTarget;

    if (formControl && "validity" in formControl) {
      const validity = (formControl as HTMLInputElement).validity;
      if (!validity) return;
      if (validity.valid) {
        this.resetCustomValidity();
      } else {
        const flags: Record<string, boolean> = {};
        for (const key in validity) {
          if (validity[key as keyof ValidityState] && key !== "valid") {
            flags[key] = true;
          }
        }

        this.setValidity(
          flags,
          this.validationMessage ||
            (formControl as HTMLInputElement).validationMessage
        );
      }
    }
  }

  /**
   * 检查表单字段是否有效
   * @returns 如果字段有效返回 true，否则返回 false
   */
  checkValidity(): boolean {
    if (this.tagName === "EA-BUTTON") return true;

    this.updateValidity();
    if (this.internals && typeof this.internals.checkValidity === "function") {
      return this.internals.checkValidity();
    }
    return true;
  }

  /**
   * 报告表单字段的验证状态
   * @returns 如果字段有效返回 true，否则返回 false
   */
  reportValidity(): boolean {
    if (this.tagName === "EA-BUTTON") return true;

    this.updateValidity();
    if (this.internals && typeof this.internals.reportValidity === "function") {
      return this.internals.reportValidity();
    }
    return true;
  }

  /**
   * 设置自定义验证错误消息
   * @param flags - 验证状态标志
   * @param message - 自定义错误消息
   */
  setValidity(flags: Record<string, boolean> = {}, message: string = ""): void {
    const hasError = Object.values(flags).some(v => v === true);

    if (message) {
      flags.customError = true;
    } else if (hasError) {
      const target = this.validationTarget as HTMLInputElement | undefined;
      message = target?.validationMessage || "";
    }

    if (this.internals && typeof this.internals.setValidity === "function") {
      this.internals.setValidity(
        flags,
        message,
        this.validationTarget ?? undefined
      );
    }
  }

  /**
   * 设置自定义验证错误消息
   * @param message - 自定义错误消息，空字符串表示清除错误
   */
  setCustomValidity(message: string): void {
    if (this.tagName === "EA-BUTTON") return;

    const target = this.validationTarget as HTMLElement | undefined;
    if (
      target &&
      target !== this &&
      typeof (target as HTMLInputElement).setCustomValidity === "function"
    ) {
      (target as HTMLInputElement).setCustomValidity(message);
    }

    if (this.internals && typeof this.internals.setValidity === "function") {
      if (message) {
        this.internals.setValidity(
          { customError: true },
          message,
          this.validationTarget ?? undefined
        );
      } else {
        this.internals.setValidity({}, "", this.validationTarget ?? undefined);
      }
    }
  }

  /**
   * 重置自定义验证错误消息
   */
  resetCustomValidity(): void {
    if (this.internals && typeof this.internals.setValidity === "function") {
      this.internals.setValidity({}, "", this.validationTarget ?? undefined);
    }

    const target = this.validationTarget as HTMLElement | undefined;
    if (
      target &&
      target !== this &&
      typeof (target as HTMLInputElement).setCustomValidity === "function"
    ) {
      (target as HTMLInputElement).setCustomValidity("");
    }
  }

  // ==================== 生命周期 ====================

  private static _formSubmitControllers: WeakMap<
    HTMLFormElement,
    { controller: AbortController; registered: boolean }
  > = new WeakMap();

  /**
   * 表单关联回调，处理表单提交事件
   * @param form - 关联的表单元素
   */
  formAssociatedCallback(form: HTMLFormElement | null): void {
    if (!form) return;

    form.noValidate = true;

    let entry = EaFormAssociatedBase._formSubmitControllers.get(form);
    if (!entry) {
      entry = { controller: new AbortController(), registered: false };
      EaFormAssociatedBase._formSubmitControllers.set(form, entry);
    }

    if (!entry.registered) {
      entry.registered = true;
      form.addEventListener(
        "submit",
        (e: Event) => {
          const allElements = Array.from(
            form.querySelectorAll("*")
          ) as EaFormAssociatedBase[];
          const sorted = allElements.filter(
            el =>
              el instanceof EaFormAssociatedBase && el.tagName !== "EA-BUTTON"
          );

          let firstInvalid: EaFormAssociatedBase | null = null;
          for (const el of sorted) {
            el.setCustomValidity("");
            el.updateValidity();
            if (!el.checkValidity() && !firstInvalid) {
              firstInvalid = el;
            }
          }

          if (firstInvalid) {
            e.preventDefault();
            e.stopImmediatePropagation();
            firstInvalid.reportValidity();
          }
        },
        { signal: entry.controller.signal }
      );
    }
  }

  /**
   * 表单禁用回调，处理表单禁用状态变化
   * @param disabled - 表单是否禁用
   */
  formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
    this.updateValidity();
  }

  /**
   * 表单重置回调，处理表单重置事件
   */
  formResetCallback(): void {
    this.value = "";
    this.setValidity({});
  }
}

export default EaFormAssociatedBase;
