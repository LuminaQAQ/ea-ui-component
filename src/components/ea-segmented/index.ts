import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { property } from "@decorator/property";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { h } from "@utils/h";
import { html } from "@utils/html";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-segmented" as const;
const bem = createBEM(TAG_NAME);

export type SegmentedSize = "large" | "default" | "small";
export type SegmentedDirection = "horizontal" | "vertical";
export type SegmentedOption =
  | string
  | {
      label: string;
      value: string;
      disabled?: boolean;
      checked?: boolean;
      [key: string]: any;
    };
export type PropsConfiguration = {
  label: string;
  value: string;
  disabled: string;
};

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSegmented extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-segmented")
  private _container!: HTMLElement;

  // ==================== 私有属性 ====================

  private _resizeObserver?: ResizeObserver;

  private _resizeTimer?: number;

  // ==================== @property 属性（JS-only，不映射到 HTML attribute） ====================

  @property({
    type: Array,
    default: [],
    observer(this: EaSegmented, newVal: SegmentedOption[]) {
      if (!this.hasAttribute("name")) {
        this.setAttribute(
          "name",
          this.tagName + "-" + Math.random().toString(36).substring(2, 15)
        );
        console.warn(`[${this.tagName}] name attribute is required.`, this);
      }

      this._renderOptions(newVal);
    },
  })
  options: SegmentedOption[] = [];

  @property({
    type: Object,
    default: { label: "label", value: "value", disabled: "disabled" },
  })
  propsConfiguration: PropsConfiguration = {
    label: "label",
    value: "value",
    disabled: "disabled",
  };

  // ==================== @attribute 属性（映射到 HTML attribute） ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaSegmented, newVal: string) {
      this._updateIndicatorPosition(newVal);
    },
  })
  value: string = "";

  @attribute({
    type: Enum(["large", "default", "small"]),
    default: "",
    observer(this: EaSegmented) {
      this.updateContainerClasslist();
      this._updateIndicatorPosition(this.value);
    },
  })
  size: SegmentedSize | "" = "";

  @attribute({
    type: Enum(["horizontal", "vertical"]),
    default: "",
    observer(this: EaSegmented) {
      this.updateContainerClasslist();
      this._updateIndicatorPosition(this.value);
    },
  })
  direction: SegmentedDirection | "" = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSegmented) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSegmented) {
      this.updateContainerClasslist();
    },
  })
  block: boolean = false;

  @attribute({
    type: String,
    default: "",
  })
  name: string = "";

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = bem(
      { [this.size]: !!this.size },
      { [this.direction]: !!this.direction, block: this.block }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class='${bem()}' part='container'></div>
    `;
  }

  private _renderOptions(options: SegmentedOption[]): void {
    if (!this._container) return;

    const config = this.propsConfiguration;

    const optionsTemplate = options
      .map(item => {
        const isString = typeof item === "string";
        const label = isString ? item : item[config.label];
        const itemValue = isString ? item : item[config.value];
        const isDisabled = isString
          ? this.disabled
          : item[config.disabled] || this.disabled;
        const isChecked = isString
          ? this.value === item
          : item.checked || this.value === item[config.value];

        const itemClassName = [
          bem.e("item"),
          isDisabled ? "is-disabled" : "",
          isChecked ? "is-checked" : "",
        ]
          .filter(Boolean)
          .join(" ");

        const inputProps: Record<string, any> = {
          part: "input",
          type: "radio",
          name: this.name,
          id: label || itemValue,
          value: itemValue,
        };
        if (isDisabled) inputProps.disabled = true;
        if (isChecked) inputProps.checked = true;

        return h(
          "label",
          itemClassName,
          {
            part: "item",
            for: label || itemValue,
          },
          [
            h("input", bem.e("original"), inputProps, ""),
            h(
              "span",
              bem.e("label"),
              {
                part: "label",
                "aria-label": label || itemValue,
              },
              label || itemValue
            ),
          ]
        );
      })
      .join("");

    const indicatorTemplate = h(
      "span",
      bem.e("indicator"),
      { part: "indicator" },
      null
    );

    this._container.innerHTML = html(
      [optionsTemplate, indicatorTemplate].join("")
    );
    this._updateIndicatorPosition(this.value);
  }

  @listen("change", ".ea-segmented")
  private _handleChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.value = value;
    this.emit("change", { detail: { value } });
  }

  private _updateIndicatorPosition(value: string = this.value): void {
    if (!this._container) return;

    requestAnimationFrame(() => {
      if (!this._container) return;

      if (
        this.options?.includes(value as any) ||
        this.options?.some(
          (item: any) => item[this.propsConfiguration.value] === value
        )
      ) {
        const children = [
          ...this._container.querySelectorAll(".ea-segmented__item"),
        ] as HTMLLabelElement[];

        children.forEach(child => {
          const input = child.querySelector(
            ".ea-segmented__original"
          ) as HTMLInputElement;
          child.classList.toggle("is-checked", input?.value === value);

          if (input?.value === value) {
            const rect = child.getBoundingClientRect();
            this.style.setProperty(
              "--ea-segmented-indicator-width",
              `${rect.width}px`
            );
            this.style.setProperty(
              "--ea-segmented-indicator-height",
              `${rect.height}px`
            );
            this.style.setProperty(
              "--ea-segmented-indicator-position-x",
              `${child.offsetLeft}px`
            );
            this.style.setProperty(
              "--ea-segmented-indicator-position-y",
              `${child.offsetTop}px`
            );
          }
        });
      }
    });
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
    if (this.options && this.options.length > 0) {
      this._renderOptions(this.options);
    }

    if (this._container && typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver(() => {
        if (this._resizeTimer) {
          clearTimeout(this._resizeTimer);
        }

        this._resizeTimer = window.setTimeout(() => {
          this._resizeTimer = undefined;
          this._updateIndicatorPosition(this.value);
        }, 16);
      });
      this._resizeObserver.observe(this._container);
    }
  }

  $beforeUnmount(): void {
    if (this._resizeTimer) {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = undefined;
    }

    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
  }
}

export default EaSegmented;
