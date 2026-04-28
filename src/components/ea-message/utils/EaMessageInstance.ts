import { timeout } from "@utils/timeout";
import type { EaMessageElement } from "../components/index";

export interface EaMessageOptions {
  message?: string;
  placement?:
    | "top"
    | "top-left"
    | "top-right"
    | "bottom"
    | "bottom-left"
    | "bottom-right"
    | "middle";
  type?: "primary" | "success" | "warning" | "info" | "error";
  dangerouslyUseHTMLString?: boolean;
  showClose?: boolean;
  duration?: number;
  onClose?: (e: Event) => void;
  offset?: number;
  icon?: string;
  appendTo?: HTMLElement | string;
}

class EaMessageInstance {
  private _includeTypes = [
    "dangerouslyUseHTMLString",
    "message",
    "placement",
    "type",
    "showClose",
    "duration",
    "offset",
    "icon",
  ];

  constructor(options: EaMessageOptions | string) {
    const opts: EaMessageOptions =
      typeof options === "string" ? { message: options } : { ...options };

    const filteredOptions = this._includeTypes.reduce<Record<string, any>>(
      (acc, cur) => {
        if (opts[cur as keyof EaMessageOptions] !== undefined)
          acc[cur] = opts[cur as keyof EaMessageOptions];
        return acc;
      },
      {}
    );

    filteredOptions.placement = filteredOptions.placement || "top";

    const el = this._renderer(filteredOptions);
    this._appendToHandler(el, opts.appendTo);
    this._durationHandler(el, opts.duration);
    this._hideHandler(el, opts.onClose);
    el.visible = true;
  }

  private _renderer(options: Record<string, any>): EaMessageElement {
    const el = document.createElement("ea-message") as EaMessageElement;

    for (const option in options) {
      (el as any)[option] = options[option];
    }

    return el;
  }

  private _durationHandler(el: EaMessageElement, duration: number = 3000): void {
    if (duration <= 0) return;

    timeout(() => {
      el.visible = false;
    }, duration);
  }

  private _appendToHandler(
    el: EaMessageElement,
    appendTo?: HTMLElement | string
  ): void {
    if (appendTo instanceof HTMLElement) {
      appendTo.appendChild(el);
    } else {
      const parent = appendTo
        ? document.querySelector(appendTo as string)
        : null;
      parent ? parent.appendChild(el) : document.body.appendChild(el);
    }
  }

  private _hideHandler(
    el: EaMessageElement,
    closeFn?: (e: Event) => void
  ): void {
    el.addEventListener(
      "hidden",
      (e: Event) => {
        closeFn?.(e);
        el.remove();
      },
      { once: true }
    );
  }
}

export const EaMessage = (options: EaMessageOptions | string) => {
  new EaMessageInstance(options);
};

EaMessage.primary = (message: string) =>
  new EaMessageInstance({
    message,
    type: "primary",
  });

EaMessage.success = (message: string) =>
  new EaMessageInstance({
    message,
    type: "success",
  });

EaMessage.warning = (message: string) =>
  new EaMessageInstance({
    message,
    type: "warning",
  });

EaMessage.info = (message: string) =>
  new EaMessageInstance({
    message,
    type: "info",
  });

EaMessage.error = (message: string) =>
  new EaMessageInstance({
    message,
    type: "error",
  });
