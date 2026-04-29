import { timeout } from "@utils/timeout";
import type { EaNotificationElement } from "../components/index";

export interface EaNotificationOptions {
  heading?: string;
  message?: string;
  type?: "primary" | "success" | "warning" | "info" | "error";
  icon?: string;
  duration?: number;
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  showClose?: boolean;
  closeIcon?: string;
  zIndex?: number;
  dangerouslyUseHTMLString?: boolean;
  appendTo?: HTMLElement | string;
  onClose?: (e: Event) => void;
}

class EaNotificationInstance {
  private _includeTypes = [
    "heading",
    "message",
    "placement",
    "type",
    "showClose",
    "duration",
    "closeIcon",
    "zIndex",
    "icon",
    "dangerouslyUseHTMLString",
  ];

  private _privateTypes = ["appendTo", "onClose", "duration"];

  private _defaultOptions: EaNotificationOptions = {
    heading: "",
    dangerouslyUseHTMLString: false,
    message: "",
    icon: "",
    type: "info",
    duration: 3000,
    placement: "top-right",
    zIndex: 0,
    showClose: true,
    closeIcon: "xmark",
    appendTo: "body",
  };

  instance: EaNotificationElement;

  constructor(options: EaNotificationOptions) {
    const opts = Object.assign({}, this._defaultOptions, options);

    const filteredOptions = this._includeTypes.reduce<Record<string, any>>(
      (acc, cur) => {
        if (opts[cur as keyof EaNotificationOptions] !== undefined)
          acc[cur] = opts[cur as keyof EaNotificationOptions];
        return acc;
      },
      {}
    );

    const el = this._renderer(filteredOptions);
    this.instance = el;
    this._appendToHandler(el, opts.appendTo);
    this._durationHandler(el, opts.duration);
    this._hideHandler(el, opts.onClose);
    el.visible = true;
  }

  private _renderer(options: Record<string, any>): EaNotificationElement {
    const el = document.createElement(
      "ea-notification"
    ) as EaNotificationElement;

    for (const option in options) {
      (el as any)[option] = options[option];
    }

    return el;
  }

  private _appendToHandler(
    el: EaNotificationElement,
    appendTo?: HTMLElement | string
  ): void {
    if (!appendTo) {
      document.body.appendChild(el);
      return;
    }

    if (appendTo instanceof HTMLElement) {
      appendTo.appendChild(el);
    } else if (typeof appendTo === "string") {
      const parent = document.querySelector(appendTo);
      parent ? parent.appendChild(el) : document.body.appendChild(el);
    } else {
      console.warn(
        `[EaNotification] TypeError: ${appendTo} is not a valid element or selector.`
      );
    }
  }

  private _durationHandler(
    el: EaNotificationElement,
    duration: number = 3000
  ): void {
    if (duration <= 0) return;

    timeout(() => {
      el.visible = false;
    }, duration);
  }

  private _hideHandler(
    el: EaNotificationElement,
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

  close(): void {
    this.instance.close();
  }
}

export const EaNotification = (options: EaNotificationOptions) =>
  new EaNotificationInstance(options);

EaNotification.primary = (options: EaNotificationOptions) =>
  EaNotification({
    ...options,
    type: "primary",
  });

EaNotification.success = (options: EaNotificationOptions) =>
  EaNotification({
    ...options,
    type: "success",
  });

EaNotification.warning = (options: EaNotificationOptions) =>
  EaNotification({
    ...options,
    type: "warning",
  });

EaNotification.info = (options: EaNotificationOptions) =>
  EaNotification({
    ...options,
    type: "info",
  });

EaNotification.error = (options: EaNotificationOptions) =>
  EaNotification({
    ...options,
    type: "error",
  });
