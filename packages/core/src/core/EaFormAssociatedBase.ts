import EaBase from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import {
  GlobalHTMLElement,
  GlobalHTMLFormElement,
  GlobalValidityState,
} from "@utils/env";
import { Enum } from "@utils/Enum";

/** 单条校验失败的结果 */
export interface EaValidationResult {
  /** 原生 validity 标记，如 valueMissing / tooShort */
  flag: string;
  /** 错误文案 */
  message: string;
}

/** 错误样式的展示时机 */
export type EaValidateTrigger = "auto" | "submit" | "manual";

/** 错误提示的展示方式 */
export type EaErrorDisplay = "text" | "native";

/** 可作为校验提示锚点的原生表单控件 */
const FORM_CONTROL_SELECTOR =
  "input:not([type=hidden]), select, textarea, button";

/** 可作为校验提示锚点的可聚焦元素 */
const FOCUSABLE_SELECTOR = "[tabindex]:not([tabindex='-1'])";

/**
 * 判断元素是否有实际盒子；jsdom 里尺寸恒为 0，一律视为不可见
 * @param el 目标元素
 * @returns 是否可见
 */
function isRenderable(el: HTMLElement | null | undefined): boolean {
  if (!el || !el.isConnected) return false;

  const rect = el.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return false;

  const style = getComputedStyle(el);
  if (style.display === "none" || style.visibility === "hidden") return false;

  return Number(style.opacity || "1") > 0;
}

/**
 * 在给定根里递归查找首个可见的匹配元素，跨自定义元素的 shadow 边界
 * @param root 查询根节点
 * @param selector 匹配选择器
 * @param depth 递归深度
 * @returns 首个可见元素，找不到返回 null
 */
function findVisible(
  root: ParentNode | null | undefined,
  selector: string,
  depth = 0
): HTMLElement | null {
  if (!root || depth > 4) return null;

  const direct = root.querySelector(selector) as HTMLElement | null;
  if (direct && isRenderable(direct)) return direct;

  for (const el of Array.from(root.querySelectorAll("*"))) {
    const found = findVisible(
      (el as HTMLElement).shadowRoot,
      selector,
      depth + 1
    );
    if (found) return found;
  }

  return null;
}

/**
 * 表单关联基类
 * 为表单组件提供表单关联功能、验证功能和表单值管理
 */
@CustomElement("ea-form-associated-base", { autoDefine: false })
export class EaFormAssociatedBase extends EaBase {
  static formAssociated = true;

  /** ElementInternals 实例，用于表单关联 */
  declare internals: ElementInternals;

  /** 首次连接时的值，用于表单重置 */
  private _resetValue: unknown;

  /** 是否已记录重置值 */
  private _resetCaptured = false;

  /** 自定义校验文案；非空时优先于自动校验 */
  private _customValidityMessage = "";

  /** 最近一次校验结果，`null` 表示通过 */
  private _validation: EaValidationResult | null = null;

  /** 提交拦截挂载的根节点 */
  private _submitRoot: EventTarget | null = null;

  /** 是否已发生用户交互或提交尝试，决定错误样式是否展示 */
  private _dirty = false;

  /** form 上统配属性的观察器 */
  private _settingObserver: MutationObserver | null = null;

  /** 已监听统配属性的表单 */
  private _watchedForm: GlobalHTMLFormElement | null = null;

  // ==================== 属性定义 ====================

  /**
   * 字段名称
   */
  @attribute({
    type: String,
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
   * `text` 模式不参与原生约束校验，按组件自身的结果合成
   */
  get validity(): GlobalValidityState | null {
    if (this.resolvedErrorDisplay !== "text") {
      return this.internals?.validity ?? null;
    }

    const result = this._validation;

    return {
      valid: !result,
      ...(result ? { [result.flag]: true } : {}),
    } as unknown as GlobalValidityState;
  }

  /**
   * 验证消息（只读派生值）
   */
  get validationMessage(): string {
    if (this.resolvedErrorDisplay === "text") {
      return this._validation?.message ?? "";
    }

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
  })
  disabled: boolean = false;

  /**
   * 字段值
   */
  @attribute({
    type: String,
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
    forward: {
      target: "validationTarget",
      attr: "required",
      map: value => (value ? "" : null),
    },
  })
  required: boolean = false;

  /** 错误样式的展示时机，映射 `data-validate-trigger` */
  @attribute({
    name: "data-validate-trigger",
    type: Enum(["", "auto", "submit", "manual"]),
    observer(this: EaFormAssociatedBase) {
      this._applyValidateTrigger();
    },
  })
  validateTrigger: EaValidateTrigger | "" = "";

  /** 错误提示的展示方式，映射 `data-error-display` */
  @attribute({
    name: "data-error-display",
    type: Enum(["", "text", "native"]),
    observer(this: EaFormAssociatedBase) {
      this.updateValidity();
    },
  })
  errorDisplay: EaErrorDisplay | "" = "";

  /** 生效的错误展示时机：自身属性 > form 属性 > auto */
  get resolvedValidateTrigger(): EaValidateTrigger {
    return (
      this.validateTrigger ||
      this._readFormSetting("data-validate-trigger", [
        "auto",
        "submit",
        "manual",
      ]) ||
      "auto"
    );
  }

  /** 生效的错误提示方式：自身属性 > form 属性 > native */
  get resolvedErrorDisplay(): EaErrorDisplay {
    return (
      this.errorDisplay ||
      this._readFormSetting("data-error-display", ["text", "native"]) ||
      "native"
    );
  }

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
    this.internals?.setFormValue?.(value);
  }

  /**
   * 移除表单值
   */
  removeValue(): void {
    this.internals?.setFormValue?.(null);
  }

  /**
   * 重算校验状态
   *
   * 子类不覆盖本方法，只覆盖 `$isEmpty` / `$validate` / `$validationMessage`
   */
  updateValidity(): void {
    this._validation = this._customValidityMessage
      ? { flag: "customError", message: this._customValidityMessage }
      : this.$validate();

    this._publishValidity();
    this._syncInvalidState();
  }

  /**
   * 把最近一次校验结果发布给 form
   * `text` 模式只用自渲染文案，不发布失效状态，浏览器也就没有气泡可弹；
   * 锚点不在允许的树内时浏览器会抛错，此时退回不带锚点再发布一次
   */
  private _publishValidity(): void {
    const internals = this.internals;
    if (typeof internals?.setValidity !== "function") return;

    const result =
      this.resolvedErrorDisplay === "native" ? this._validation : null;
    const flags = result ? { [result.flag]: true } : {};
    const message = result?.message ?? "";
    const anchor = result ? this._resolveAnchor() : undefined;

    try {
      internals.setValidity(flags, message, anchor);
    } catch {
      internals.setValidity(flags, message);
    }
  }

  /** 同步 `data-invalid` 与错误文案属性 */
  private _syncInvalidState(): void {
    const show = this._validation !== null && this._dirty;

    if (show) {
      this.setAttribute("data-invalid", "");
    } else {
      this.removeAttribute("data-invalid");
    }

    const withText = show && this.resolvedErrorDisplay === "text";

    if (withText) {
      this.setAttribute(
        "data-invalid-message",
        this._validation?.message ?? ""
      );
    } else {
      this.removeAttribute("data-invalid-message");
    }
  }

  /** 标记已交互，错误样式从此刻起可见 */
  private _markDirty = (): void => {
    if (this._dirty) return;

    this._dirty = true;
    this.updateValidity();
  };

  /** 用户交互，仅 auto 模式展示错误 */
  private _handleInteraction = (): void => {
    if (this.resolvedValidateTrigger !== "auto") return;

    this._markDirty();
  };

  /** 提交被拦，auto 与 submit 模式展示错误 */
  private _handleSubmitAttempt = (): void => {
    if (this.resolvedValidateTrigger === "manual") return;

    this._markDirty();
  };

  /**
   * 拦住提交
   * `text` 模式不参与原生约束校验，浏览器不会替我们拦，只能在根节点的
   * 捕获阶段拦住并阻断后续监听，效果与原生拦截一致
   */
  private _handleSubmitCapture = (e: Event): void => {
    if (this.resolvedErrorDisplay !== "text") return;

    const form = this._formElement();
    if (!form || e.target !== form || !this.willValidate) return;

    this.updateValidity();
    if (this._validation === null) return;

    e.preventDefault();
    e.stopPropagation();

    this._markDirty();
  };

  /** 原生拦下提交时，同表单的 `text` 模式控件也要进入错误态 */
  private _handleFormInvalid = (): void => {
    if (this.resolvedErrorDisplay !== "text") return;

    this._markDirty();
  };

  /** 切到 manual 时收起已有错误态 */
  private _applyValidateTrigger(): void {
    if (this.resolvedValidateTrigger !== "manual" || !this._dirty) return;

    this._dirty = false;
    this._syncInvalidState();
  }

  /** 展示当前校验结果的错误样式 */
  markTouched(): void {
    this._markDirty();
  }

  /** 收起错误样式，回到未交互状态 */
  resetTouched(): void {
    this._dirty = false;
    this._syncInvalidState();
  }

  /**
   * 用于读取统配属性的表单
   * @returns 优先关联表单，其次最近的祖先 form
   */
  private _formElement(): GlobalHTMLFormElement | null {
    return this.form ?? (this.closest("form") as GlobalHTMLFormElement | null);
  }

  /** 监听 form 上的统配属性变更与同表单的提交尝试，变更后重新解析 */
  private _watchFormSettings(): void {
    const form = this._formElement();
    if (!form || form === this._watchedForm) return;

    this._settingObserver?.disconnect();
    this._settingObserver = null;
    this._watchedForm?.removeEventListener(
      "invalid",
      this._handleFormInvalid,
      true
    );

    this._watchedForm = form;
    form.addEventListener("invalid", this._handleFormInvalid, true);

    if (typeof MutationObserver === "undefined") return;

    const observer = new MutationObserver(() => {
      this._applyValidateTrigger();
      this.updateValidity();
    });

    observer.observe(form, {
      attributes: true,
      attributeFilter: ["data-validate-trigger", "data-error-display"],
    });

    this._settingObserver = observer;
  }

  /** 在根节点的捕获阶段拦提交，供 `text` 模式使用 */
  private _watchSubmit(): void {
    const root = this.getRootNode() as unknown as EventTarget;
    if (!root?.addEventListener || this._submitRoot === root) return;

    this._submitRoot?.removeEventListener(
      "submit",
      this._handleSubmitCapture,
      true
    );

    root.addEventListener("submit", this._handleSubmitCapture, true);
    this._submitRoot = root;
  }

  /**
   * 读取 form 上的统配属性
   * @param name 属性名
   * @param allowed 取值白名单
   * @returns 命中白名单的取值，未设置或非法时为 null
   */
  private _readFormSetting<T extends string>(
    name: string,
    allowed: readonly T[]
  ): T | null {
    const fromForm = this._formElement()?.getAttribute(name) ?? null;

    return fromForm && (allowed as readonly string[]).includes(fromForm)
      ? (fromForm as T)
      : null;
  }

  /**
   * 校验提示的锚点
   * 子类用 `$validationAnchor()` 指定，未指定时按可见性挑选
   * @returns 锚点元素，找不到时返回 `undefined`
   */
  private _resolveAnchor(): HTMLElement | undefined {
    return this.$validationAnchor() ?? this._visibleAnchor();
  }

  /**
   * 把自定义错误消息同步给可承接的原生控件
   * `text` 模式不碰原生校验，残留的自定义错误一并清掉
   * @param message 错误消息，空串表示清除
   */
  private _syncNativeCustomValidity(message: string): void {
    const target = this.validationTarget as HTMLInputElement | null | undefined;
    if (!target || Object.is(target, this)) return;

    target.setCustomValidity?.(
      this.resolvedErrorDisplay === "text" ? "" : message
    );
  }

  /** 聚焦校验目标；`text` 模式没有原生的报告流程，需要手动补上 */
  private _focusValidationTarget(): void {
    const target = this.validationTarget as HTMLElement | null | undefined;
    const element = target && !Object.is(target, this) ? target : this;

    element.focus?.();
  }

  /**
   * 按可见性挑选锚点
   * 顺序为验证目标自身（原生控件）> 目标内部首个可见控件 > 目标自身
   * > 自身 shadow 内可见控件 > 可聚焦元素；原生提示只在可见元素上渲染，
   * 锚到隐藏控件会静默不显示
   * @returns 锚点元素，找不到时返回 `undefined`
   */
  private _visibleAnchor(): HTMLElement | undefined {
    const target = this.validationTarget as HTMLElement | null | undefined;

    if (target && !Object.is(target, this)) {
      if (target.matches?.(FORM_CONTROL_SELECTOR) && isRenderable(target)) {
        return target;
      }

      const nested = findVisible(target.shadowRoot, FORM_CONTROL_SELECTOR);
      if (nested) return nested;

      if (isRenderable(target)) return target;
    }

    return (
      findVisible(this.shadowRoot, FORM_CONTROL_SELECTOR) ??
      findVisible(this.shadowRoot, FOCUSABLE_SELECTOR) ??
      undefined
    );
  }

  /**
   * 按声明顺序计算首个失败的校验结果
   * `null` 表示通过；子类可追加自定义规则
   * @returns 首个失败的校验结果，通过时返回 null
   */
  protected $validate(): EaValidationResult | null {
    if (this.required && this.$isEmpty(this.value)) {
      return {
        flag: "valueMissing",
        message: this.$validationMessage("valueMissing"),
      };
    }

    return this._nativeValidation() ?? this._programmaticLengthValidation();
  }

  /**
   * 空值判定；子类按值语义覆盖（如 `0` 是否算空）
   * @param value 字段值
   * @returns 是否视为空
   */
  protected $isEmpty(value: unknown): boolean {
    return (
      value == null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    );
  }

  /**
   * 错误气泡的锚点
   * @returns 锚点元素；返回 `undefined` 时由浏览器使用元素自身
   */
  protected $validationAnchor(): HTMLElement | undefined {
    return undefined;
  }

  /**
   * 校验文案
   * core 暂无 i18n 表，默认文案可被子类覆盖
   * @param flag 原生 validity 标记
   * @param limit 长度类规则的阀值
   * @returns 对应的文案，无对应规则时为空串
   */
  protected $validationMessage(flag: string, limit?: number): string {
    switch (flag) {
      case "valueMissing":
        return "此项为必填";
      case "tooShort":
        return `请至少输入 ${limit} 个字符`;
      case "tooLong":
        return `请最多输入 ${limit} 个字符`;
      default:
        return "";
    }
  }

  /**
   * 读取验证目标上的原生 validity
   * target 为自身或另一个表单关联元素时，读到的是上一轮已发布的状态，
   * 会把旧错误当成当前错误，因此只认原生控件
   * @returns 首个失败的校验结果，通过时返回 null
   */
  private _nativeValidation(): EaValidationResult | null {
    const target = this.validationTarget as HTMLInputElement | null | undefined;
    if (!target || !("validity" in target)) return null;

    if (Object.is(target, this) || "internals" in target) return null;

    const validity = target.validity;
    if (!validity || validity.valid) return null;

    for (const key in validity) {
      if (key === "valid" || key === "customError") continue;

      if (validity[key as keyof GlobalValidityState]) {
        return {
          flag: key,
          message: target.validationMessage || this.$validationMessage(key),
        };
      }
    }

    return null;
  }

  /**
   * 程序化 minlength / maxlength
   * 原生只在用户编辑后触发 tooShort / tooLong，程序赋值不会
   * @returns 首个失败的校验结果，通过时返回 null
   */
  private _programmaticLengthValidation(): EaValidationResult | null {
    if (typeof this.value !== "string" || this.value.length === 0) return null;

    const min = Number(this.minlength);
    if (min > 0 && this.value.length < min) {
      return {
        flag: "tooShort",
        message: this.$validationMessage("tooShort", min),
      };
    }

    const max = Number(this.maxlength);
    if (max > 0 && this.value.length > max) {
      return {
        flag: "tooLong",
        message: this.$validationMessage("tooLong", max),
      };
    }

    return null;
  }

  /**
   * 检查表单字段是否有效
   * @returns 如果字段有效返回 true，否则返回 false
   */
  checkValidity(): boolean {
    this.updateValidity();

    if (this.resolvedErrorDisplay === "text") return this._validation === null;

    return this.internals?.checkValidity?.() ?? true;
  }

  /**
   * 报告表单字段的验证状态
   * @returns 如果字段有效返回 true，否则返回 false
   */
  reportValidity(): boolean {
    this._handleSubmitAttempt();
    this.updateValidity();

    if (this.resolvedErrorDisplay !== "text") {
      return this.internals?.reportValidity?.() ?? true;
    }

    if (this._validation === null) return true;

    this._focusValidationTarget();

    return false;
  }

  /**
   * 设置校验状态
   * @param flags - 验证状态标志
   * @param message - 自定义错误消息
   */
  setValidity(flags: Record<string, boolean> = {}, message: string = ""): void {
    const failed = Object.keys(flags).find(key => flags[key] === true);
    const target = this.validationTarget as HTMLInputElement | null | undefined;
    const text = message || (failed ? target?.validationMessage || "" : "");

    this._validation =
      failed || message
        ? {
            flag: message ? "customError" : (failed ?? "customError"),
            message: text,
          }
        : null;

    this._publishValidity();
    this._syncInvalidState();
  }

  /**
   * 设置自定义验证错误消息
   * @param message - 自定义错误消息，空字符串表示清除错误；清除后按当前规则重算
   */
  setCustomValidity(message: string): void {
    this._customValidityMessage = message;
    this._syncNativeCustomValidity(message);
    this.updateValidity();
  }

  /**
   * 重置自定义验证错误消息
   * 清除后按当前规则重算，而不是直接宣布合法
   */
  resetCustomValidity(): void {
    this._customValidityMessage = "";
    this._syncNativeCustomValidity("");
    this.updateValidity();
  }

  // ==================== 生命周期 ====================

  /**
   * 挂载完成后发布一次校验状态
   * 原生提交只读 internals 中最后一次发布的结果，不发布就等于“永远合法”
   */
  $mounted(): void {
    this.updateValidity();
  }

  /**
   * 每次更新后重算校验状态
   * 属性与值变化（含用户交互）都可能改变约束或取值，需重新发布给 form
   */
  $updated(): void {
    this.updateValidity();
  }

  /**
   * 连接时记录重置初值，并把交互与原生校验挂到错误样式的展示时机上
   */
  connectedCallback(): void {
    if (!this._resetCaptured) {
      this._resetCaptured = true;
      this._resetValue = this.value;
    }

    this.addEventListener("input", this._handleInteraction);
    this.addEventListener("change", this._handleInteraction);
    this.addEventListener("focusout", this._handleInteraction);
    this.addEventListener("invalid", this._handleSubmitAttempt);

    this._watchFormSettings();
    this._watchSubmit();

    super.connectedCallback();
  }

  /**
   * 关联到表单后按 form 级配置刷新
   * `data-validate-trigger` / `data-error-display` 可写在 form 上统配
   */
  formAssociatedCallback(): void {
    this._watchFormSettings();
    this._syncInvalidState();
  }

  disconnectedCallback(): void {
    this._settingObserver?.disconnect();
    this._settingObserver = null;
    this._watchedForm?.removeEventListener(
      "invalid",
      this._handleFormInvalid,
      true
    );
    this._watchedForm = null;

    this._submitRoot?.removeEventListener(
      "submit",
      this._handleSubmitCapture,
      true
    );
    this._submitRoot = null;

    super.disconnectedCallback();
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
    this.value = this.$resetValue() as any;
    this.$resetValidity();
  }

  /**
   * 重置到的值
   * 引用类型做一层拷贝，避免运行中被原地修改后污染初值
   * @returns 重置时使用的值
   */
  protected $resetValue(): unknown {
    const captured = this._resetValue ?? "";

    if (captured === null || typeof captured !== "object") return captured;

    try {
      return structuredClone(captured);
    } catch {
      return captured;
    }
  }

  /**
   * 重置后的校验状态复位
   * 子类覆盖 formResetCallback 时应调用本方法，而不是 setValidity({})：
   * 后者既不收起错误样式，也会把 required 约束一并抹掉
   */
  protected $resetValidity(): void {
    this._dirty = false;
    this.updateValidity();
  }
}

export default EaFormAssociatedBase;
