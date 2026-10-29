// core 测试环境的 jsdom 补齐

// rAF
if (typeof globalThis.requestAnimationFrame !== "function") {
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback): number =>
    setTimeout(
      () => cb(Date.now()),
      0
    ) as unknown as number) as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = ((id: number): void => {
    clearTimeout(id);
  }) as typeof cancelAnimationFrame;
}

// ElementInternals
if (typeof HTMLElement !== "undefined") {
  const proto = HTMLElement.prototype as unknown as Record<string, unknown>;
  const nativeAttachInternals = proto.attachInternals as
    (() => ElementInternals) | undefined;

  proto.attachInternals = function attachInternals(this: HTMLElement) {
    const native = nativeAttachInternals?.call(this);

    const nativeComplete =
      !!native &&
      typeof native.setValidity === "function" &&
      native.validity !== undefined &&
      native.willValidate !== undefined &&
      typeof native.setFormValue === "function";

    if (nativeComplete) return native;

    const state = { valid: true, message: "" };

    const internals = {
      form: null as HTMLFormElement | null,
      labels: [] as Node[],
      get willValidate() {
        return true;
      },
      get validity() {
        return {
          valid: state.valid,
          valueMissing: !state.valid,
          customError: !state.valid,
        };
      },
      get validationMessage() {
        return state.message;
      },
      setValidity(flags: Record<string, boolean> = {}, message = "") {
        const invalid = Object.values(flags).some(Boolean) || Boolean(message);
        state.valid = !invalid;
        state.message = invalid ? message : "";
      },
      checkValidity() {
        return state.valid;
      },
      reportValidity() {
        return state.valid;
      },
      setFormValue() {
        /* noop */
      },
      __host: this,
    };

    return internals as unknown as ElementInternals;
  } as typeof HTMLElement.prototype.attachInternals;
}
