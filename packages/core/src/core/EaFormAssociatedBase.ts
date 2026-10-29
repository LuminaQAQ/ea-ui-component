import EaBase from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import {
  GlobalHTMLElement,
  GlobalHTMLFormElement,
  GlobalValidityState,
} from "@utils/env";

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
    type: String,
    default: "",
  })
  name: string = "";

  /**
   * 字段类型，默认为标签名（可写，组件可覆盖）
   */
  @attribute({
    type: String,
    default: function (this: EaFormAssociatedBase) {
      return this.localName;
    },
  })
  type: string = "";

  /**
   * 关联的表单元素（只读派生值）
   */
  get form(): GlobalHTMLFormElement | null {
    return this.internals?.form ?? null;
  }

  /**
   * 验证状态（只读派生值）
   */
  get validity(): GlobalValidityState | null {
    return this.internals?.validity ?? null;
  }

  /**
   * 验证消息（只读派生值）
   */
  get validationMessage(): string {
    return this.internals?.validationMessage ?? "";
  }

  /**
   * 是否参与验证（只读派生值，禁用时不参与）
   */
  get willValidate(): boolean {
    return !this.disabled && (this.internals?.willValidate ?? false);
  }

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
  value: string | number | boolean | unknown[] | null = "";

  /**
   * 必填状态
   */
  @attribute({
    type: Boolean,
    default: false,
    forward: {
      target: "validationTarget",
      attr: "required",
      map: value => (value ? "" : null),
    },
  })
  required: boolean = false;

  /**
   * 最小长度
   */
  @attribute({
    type: Number,
    forward: { target: "validationTarget", attr: "minlength" },
  })
  minlength: number | string | null = null;

  /**
   * 最大长度
   */
  @attribute({
    type: Number,
    forward: { target: "validationTarget", attr: "maxlength" },
  })
  maxlength: number | string | null = null;

  /**
   * 最小值
   */
  @attribute({
    type: Number,
    forward: { target: "validationTarget", attr: "min" },
  })
  min: number | string | null = null;

  /**
   * 最大值
   */
  @attribute({
    type: Number,
    forward: { target: "validationTarget", attr: "max" },
  })
  max: number | string | null = null;

  /**
   * 模式匹配
   */
  @attribute({
    type: String,
    forward: { target: "validationTarget", attr: "pattern" },
  })
  pattern: string | null = null;

  // ==================== 抽象属性 ====================

  /**
   * 获取验证目标元素，需子组件实现
   * @returns 验证目标元素
   */
  get validationTarget(): GlobalHTMLElement | null | undefined {
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
  getForm(): GlobalHTMLFormElement | null {
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
    const formControl = this.validationTarget;

    if (formControl && "validity" in formControl) {
      const validity = (formControl as HTMLInputElement).validity;
      if (!validity) return;
      if (validity.valid) {
        this.resetCustomValidity();
      } else {
        const flags: Record<string, boolean> = {};
        for (const key in validity) {
          if (validity[key as keyof GlobalValidityState] && key !== "valid") {
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
    const target = this.validationTarget as GlobalHTMLElement | undefined;
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

    const target = this.validationTarget as GlobalHTMLElement | undefined;
    if (
      target &&
      target !== this &&
      typeof (target as HTMLInputElement).setCustomValidity === "function"
    ) {
      (target as HTMLInputElement).setCustomValidity("");
    }
  }

  // ==================== 生命周期 ====================

  /** 每个表单的提交监听与 noValidate 快照 */
  private static _formStates = new WeakMap<
    GlobalHTMLFormElement,
    { count: number; noValidate: boolean; controller: AbortController }
  >();

  /** 当前关联的表单 */
  private _associatedForm: GlobalHTMLFormElement | null = null;

  /** 首次连接时的值，用于表单重置 */
  private _resetValue: unknown;

  /** 是否已记录重置值 */
  private _resetCaptured = false;

  connectedCallback(): void {
    if (!this._resetCaptured) {
      this._resetCaptured = true;
      this._resetValue = this.value;
    }

    super.connectedCallback();
  }

  disconnectedCallback(): void {
    this._releaseForm();
    super.disconnectedCallback();
  }

  /**
   * 收集表单内的本库字段
   * @param form 表单元素
   * @returns 字段列表
   */
  private static _collectFields(
    form: GlobalHTMLFormElement
  ): EaFormAssociatedBase[] {
    const fields = new Set<EaFormAssociatedBase>();

    for (const el of Array.from(form.elements ?? [])) {
      if (el instanceof EaFormAssociatedBase) fields.add(el);
    }

    form.querySelectorAll("*").forEach(el => {
      if (el instanceof EaFormAssociatedBase) fields.add(el);
    });

    const formId = form.getAttribute("id");
    if (formId) {
      document.querySelectorAll(`[form="${formId}"]`).forEach(el => {
        if (el instanceof EaFormAssociatedBase) fields.add(el);
      });
    }

    return [...fields];
  }

  /**
   * 校验表单内的本库字段，首个无效字段阻断提交
   * @param form 表单元素
   * @param e 提交事件
   */
  private static _onSubmit(
    form: GlobalHTMLFormElement,
    e: Event
  ): void {
    const fields = EaFormAssociatedBase._collectFields(form);
    let firstInvalid: EaFormAssociatedBase | null = null;

    for (const el of fields) {
      el.setCustomValidity("");
      el.updateValidity();

      const valid =
        typeof el.internals?.checkValidity === "function"
          ? el.internals.checkValidity()
          : true;

      if (!valid && !firstInvalid) {
        firstInvalid = el;
      }
    }

    if (firstInvalid) {
      e.preventDefault();
      e.stopImmediatePropagation();
      firstInvalid.reportValidity();
    }
  }

  /**
   * 关联表单：登记提交监听并关闭原生校验
   * @param form 表单元素
   */
  private _associateForm(form: GlobalHTMLFormElement): void {
    if (this._associatedForm === form) return;

    this._releaseForm();
    this._associatedForm = form;

    let state = EaFormAssociatedBase._formStates.get(form);
    if (!state) {
      const controller = new AbortController();
      state = { count: 0, noValidate: form.noValidate, controller };
      EaFormAssociatedBase._formStates.set(form, state);

      form.addEventListener(
        "submit",
        (e: Event) => EaFormAssociatedBase._onSubmit(form, e),
        { signal: controller.signal }
      );
    }

    state.count += 1;
    form.noValidate = true;
  }

  /**
   * 解除表单关联：最后一个字段离开时恢复 noValidate 并注销监听
   */
  private _releaseForm(): void {
    const form = this._associatedForm;
    this._associatedForm = null;

    if (!form) return;

    const state = EaFormAssociatedBase._formStates.get(form);
    if (!state) return;

    state.count -= 1;
    if (state.count > 0) return;

    state.controller.abort();
    form.noValidate = state.noValidate;
    EaFormAssociatedBase._formStates.delete(form);
  }

  /**
   * 表单关联回调，处理表单提交事件
   * @param form - 关联的表单元素
   */
  formAssociatedCallback(form: GlobalHTMLFormElement | null): void {
    if (!form) {
      this._releaseForm();
      return;
    }

    this._associateForm(form);
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
   * 表单重置回调，恢复到首次连接时的值
   */
  formResetCallback(): void {
    this.value = (this._resetValue as any) ?? "";
    this.setValidity({});
  }
}

export default EaFormAssociatedBase;
