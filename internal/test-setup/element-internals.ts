// jsdom 缺失或残缺的 ElementInternals 补齐，core 与 components 的测试共用这一份

/** 安装标记，避免重复包装原型 */
const INSTALLED = Symbol.for("ea.elementInternalsPolyfill");

/** 判断原生实现是否完整可用的代理对象 */
const isComplete = (internals: ElementInternals | undefined): boolean =>
  !!internals &&
  typeof internals.setValidity === "function" &&
  typeof internals.setFormValue === "function" &&
  internals.validity !== undefined &&
  internals.willValidate !== undefined;

/**
 * 把 validity 状态机挂到目标对象上
 * 原生对象存在时原地补齐，避免丢掉 form / labels 等原生字段
 * @param target 原生 internals 或空对象
 * @param host 宿主元素
 * @returns 补齐后的 internals
 */
const patch = (
  target: Record<string, unknown>,
  host: HTMLElement
): ElementInternals => {
  const state = {
    valid: true,
    message: "",
    customError: false,
    flags: {} as Record<string, boolean>,
  };

  target.setValidity = (flags: Record<string, boolean> = {}, message = "") => {
    const invalid = Object.values(flags).some(Boolean) || Boolean(message);

    state.valid = !invalid;
    state.message = invalid ? message : "";
    state.flags = { ...flags };
    state.customError = Boolean(flags.customError);
  };

  target.checkValidity = () => state.valid;

  target.reportValidity = () => state.valid;

  target.setFormValue = target.setFormValue ?? (() => undefined);

  target.willValidate = true;

  Object.defineProperty(target, "validity", {
    get: () => ({
      valid: state.valid,
      customError: state.customError,
      valueMissing: false,
      typeMismatch: false,
      patternMismatch: false,
      tooLong: false,
      tooShort: false,
      rangeUnderflow: false,
      rangeOverflow: false,
      stepMismatch: false,
      badInput: false,
      ...state.flags,
    }),
    configurable: true,
  });

  Object.defineProperty(target, "validationMessage", {
    get: () => state.message,
    configurable: true,
  });

  if (!("form" in target)) {
    Object.defineProperty(target, "form", { value: null, writable: true });
  }

  if (!("labels" in target)) target.labels = [];

  Object.defineProperty(target, "__host", { value: host, configurable: true });

  return target as unknown as ElementInternals;
};

/**
 * 安装 ElementInternals polyfill
 * 已完整实现时原样返回，缺失或残缺时补一个带 validity 状态机的替身
 */
export function installElementInternalsPolyfill(): void {
  if (typeof HTMLElement === "undefined") return;

  const proto = HTMLElement.prototype as unknown as Record<
    PropertyKey,
    unknown
  >;
  if (proto[INSTALLED]) return;

  const nativeAttachInternals = proto.attachInternals as
    (() => ElementInternals) | undefined;

  proto.attachInternals = function attachInternals(
    this: HTMLElement
  ): ElementInternals {
    const native = nativeAttachInternals?.call(this);

    if (isComplete(native)) return native as ElementInternals;

    return patch({ ...(native as unknown as Record<string, unknown>) }, this);
  } as typeof HTMLElement.prototype.attachInternals;

  proto[INSTALLED] = true;
}
