import { camelToKebab } from "@utils/case-convert";

type Action = "cancel" | "close" | "confirm";

interface MessageBoxOptions {
  boxType?: "alert" | "confirm" | "prompt" | "personalized";
  distinguishCancelAndClose?: boolean;
  title?: string;
  heading?: string;
  dangerouslyUseHTMLString?: boolean;
  message?: string;
  icon?: string;
  variant?: string;
  closeIcon?: string;
  showClose?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  confirmButtonLoading?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  showInput?: boolean;
  inputPlaceholder?: string;
  inputType?: string;
  inputValue?: string;
  inputPattern?: string | RegExp | null;
  inputErrorMessage?: string;
  inputValidator?: ((value: string) => boolean | string | Promise<boolean | string>) | null;
  center?: boolean;
  movable?: boolean;
  roundButton?: boolean;
  buttonSize?: "small" | "medium" | "large";
  appendTo?: string | HTMLElement;
  beforeClose?:
    | ((action: Action, instance: HTMLElement, done: () => void) => void)
    | null;
  callback?: (value: string, action: Action) => any;
}

const EXCLUDED_KEYS = [
  "appendTo",
  "inputPattern",
  "inputValidator",
  "beforeClose",
  "confirmButtonLoading",
  "dangerouslyUseHTMLString",
  "distinguishCancelAndClose",
];

const DEFERRED_BOOLEAN_KEYS = [
  "closeOnClickModal",
  "closeOnPressEscape",
  "showCancelButton",
  "showClose",
  "showConfirmButton",
];

class EaMessageBoxInstance {
  private _defaultOptions: MessageBoxOptions = {
    boxType: "personalized",
    distinguishCancelAndClose: false,
    heading: "",
    dangerouslyUseHTMLString: false,
    message: "",
    icon: "",
    variant: "primary",
    closeIcon: "xmark",
    showClose: true,
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonLoading: false,
    cancelButtonText: "Cancel",
    confirmButtonText: "OK",
    closeOnClickModal: true,
    closeOnPressEscape: true,
    showInput: false,
    inputPlaceholder: "",
    inputType: "text",
    inputValue: "",
    inputPattern: null,
    inputErrorMessage: "",
    inputValidator: null,
    center: false,
    movable: false,
    roundButton: false,
    buttonSize: "medium",
    appendTo: "body",
    beforeClose: null,
  };

  instance: HTMLElement;

  constructor(options: MessageBoxOptions) {
    const mergedOptions = Object.assign(
      { boxType: options.boxType },
      this._defaultOptions,
      options
    );

    const messageBox = this._renderer(mergedOptions);
    this.instance = messageBox;
    this._appendToHandler(messageBox, mergedOptions.appendTo);
    this._applyDeferredBooleanProps(messageBox, mergedOptions);
    this._applyExcludedProps(messageBox, mergedOptions);
  }

  private _appendToHandler(
    el: HTMLElement,
    appendTo?: string | HTMLElement
  ): void {
    if (appendTo instanceof HTMLElement) {
      appendTo.appendChild(el);
    } else {
      const parent = document.querySelector(appendTo || "body");
      parent ? parent.appendChild(el) : document.body.appendChild(el);
    }
  }

  private _renderer(options: MessageBoxOptions): HTMLElement {
    const messageBox = document.createElement("ea-message-box");

    for (const k in options) {
      if (k === "appendTo" || DEFERRED_BOOLEAN_KEYS.includes(k) || EXCLUDED_KEYS.includes(k)) {
        continue;
      }
      const key = camelToKebab(k);
      messageBox.setAttribute(key, String((options as any)[k]));
    }

    return messageBox;
  }

  private _applyDeferredBooleanProps(
    messageBox: HTMLElement,
    options: MessageBoxOptions
  ): void {
    for (const k of DEFERRED_BOOLEAN_KEYS) {
      if (k in options) {
        (messageBox as any)[k] = (options as any)[k];
      }
    }
  }

  private _applyExcludedProps(
    messageBox: HTMLElement,
    options: MessageBoxOptions
  ): void {
    if (options.inputPattern instanceof RegExp) {
      (messageBox as any).inputPattern = options.inputPattern.source;
    } else if (typeof options.inputPattern === "string") {
      (messageBox as any).inputPattern = options.inputPattern;
    }

    if (options.inputValidator) {
      (messageBox as any).inputValidator = options.inputValidator;
    }

    if (options.beforeClose) {
      (messageBox as any).beforeClose = options.beforeClose;
    }

    if (options.dangerouslyUseHTMLString) {
      (messageBox as any).dangerouslyUseHTMLString = true;
    }

    if (options.distinguishCancelAndClose) {
      (messageBox as any).distinguishCancelAndClose = true;
    }

    if (options.confirmButtonLoading) {
      (messageBox as any).confirmButtonLoading = true;
    }
  }
}

type EaMessageBoxFn = {
  (options: MessageBoxOptions): Promise<Action>;
  alert: (
    message?: string,
    title?: string,
    options?: Partial<MessageBoxOptions>
  ) => Promise<Action>;
  confirm: (
    message?: string,
    title?: string,
    options?: Partial<MessageBoxOptions>
  ) => Promise<Action>;
  prompt: (
    message?: string,
    title?: string,
    options?: Partial<MessageBoxOptions>
  ) => Promise<Action>;
};

const EaMessageBox: EaMessageBoxFn = (options: MessageBoxOptions) => {
  const controller = new AbortController();
  const messageBox = new EaMessageBoxInstance(options).instance;

  let currentAction: Action = "confirm";
  let inputValue: string | undefined;

  if (options.beforeClose) {
    const userBeforeClose = options.beforeClose;
    (messageBox as any).beforeClose = (done: () => void) => {
      userBeforeClose(currentAction, messageBox, done);
    };
  }

  messageBox.setAttribute("visible", "true");

  return new Promise((resolve, reject) => {
    messageBox.addEventListener(
      "ea-closed",
      () => {
        messageBox.remove();
        controller.abort();

        if (currentAction === "confirm") {
          resolve((inputValue ?? "confirm") as Action);
        } else if (currentAction === "cancel") {
          reject("cancel");
        } else {
          reject("close");
        }
      },
      { signal: controller.signal }
    );

    messageBox.addEventListener(
      "ea-confirm",
      (e: Event) => {
        currentAction = "confirm";
        const detail = (e as CustomEvent).detail;
        if (detail && "value" in detail) {
          inputValue = detail.value;
        }
        messageBox.removeAttribute("visible");
      },
      { signal: controller.signal }
    );

    messageBox.addEventListener(
      "ea-cancel",
      () => {
        currentAction = "cancel";
        messageBox.removeAttribute("visible");
      },
      { signal: controller.signal }
    );

    messageBox.addEventListener(
      "ea-message-close",
      () => {
        currentAction = "close";
        messageBox.removeAttribute("visible");
      },
      { signal: controller.signal }
    );
  });
};

EaMessageBox.alert = (message = "", title = "", options = {}) =>
  EaMessageBox({
    message,
    heading: title,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    showConfirmButton: true,
    boxType: "alert",
    ...options,
  });

EaMessageBox.confirm = (message = "", title = "", options = {}) =>
  EaMessageBox({
    message,
    heading: title,
    showConfirmButton: true,
    showCancelButton: true,
    closeOnPressEscape: true,
    boxType: "confirm",
    ...options,
  });

EaMessageBox.prompt = (message = "", title = "", options = {}) =>
  EaMessageBox({
    message,
    heading: title,
    showConfirmButton: true,
    showCancelButton: true,
    showInput: true,
    closeOnPressEscape: true,
    boxType: "prompt",
    ...options,
  });

export { EaMessageBox };
export type { MessageBoxOptions, Action };
