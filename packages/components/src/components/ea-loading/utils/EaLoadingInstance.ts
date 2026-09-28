import type { EaLoading } from "../index";

export interface EaLoadingOptions {
  lock?: boolean;
  text?: string;
  spinner?: string;
  background?: string;
  spinnerSize?: number;
  target?: HTMLElement | string;
}

class EaLoadingInstance {
  private _includeTypes = [
    "lock",
    "text",
    "spinner",
    "background",
    "spinnerSize",
  ];

  private _defaultOptions: EaLoadingOptions = {
    lock: false,
    text: "",
    spinner: "spinner",
    background: "hsla(0, 0%, 100%, 0.9)",
    spinnerSize: 0,
    target: "body",
  };

  instance: EaLoading;

  constructor(options: EaLoadingOptions) {
    const opts = Object.assign({}, this._defaultOptions, options);

    const filteredOptions = this._includeTypes.reduce<Record<string, any>>(
      (acc, cur) => {
        if (opts[cur as keyof EaLoadingOptions] !== undefined)
          acc[cur] = opts[cur as keyof EaLoadingOptions];
        return acc;
      },
      {}
    );

    const el = this._renderer(filteredOptions, opts.target);
    this.instance = el;
    this._appendToHandler(el, opts.target);
    el.loading = true;
  }

  private _renderer(
    options: Record<string, any>,
    target?: HTMLElement | string
  ): EaLoading {
    const el = document.createElement("ea-loading") as EaLoading;

    const isAreaLoading =
      target && target !== "body" && typeof target !== "string"
        ? true
        : typeof target === "string" && target !== "body"
          ? true
          : false;

    if (!isAreaLoading) {
      el.fullscreen = true;
    }

    for (const option in options) {
      (el as any)[option] = options[option];
    }

    return el;
  }

  private _appendToHandler(
    el: EaLoading,
    target?: HTMLElement | string
  ): void {
    if (!target || target === "body") {
      document.body.appendChild(el);
      return;
    }

    if (target instanceof HTMLElement) {
      target.style.position = "relative";
      target.appendChild(el);
    } else if (typeof target === "string") {
      const parent = document.querySelector(target);
      if (parent) {
        (parent as HTMLElement).style.position = "relative";
        parent.appendChild(el);
      } else {
        document.body.appendChild(el);
      }
    } else {
      console.warn(
        `[EaLoading] TypeError: ${target} is not a valid element or selector.`
      );
      document.body.appendChild(el);
    }
  }

  close(): void {
    this.instance.loading = false;

    const target = this.instance.parentElement;
    this.instance.remove();

    if (target && target !== document.body) {
      const hasOtherLoading = target.querySelector("ea-loading");
      if (!hasOtherLoading) {
        target.style.removeProperty("position");
      }
    }
  }
}

export const EaLoadingService = (options: EaLoadingOptions = {}) =>
  new EaLoadingInstance(options);
