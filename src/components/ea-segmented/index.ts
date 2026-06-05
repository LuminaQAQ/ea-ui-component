import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { h } from "@utils/h";
import { html } from "@utils/html";
import { Enum } from "@utils/Enum";
import { EaSegmentedChangeEvent } from "./events/EaSegmentedChangeEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-segmented" as const;
const bem = createBEM(TAG_NAME);

let segmentedItemId = 0;

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

/**
 * @summary 分段选择器组件，用于在一组互斥的选项中进行选择，支持多种尺寸、方向和自定义字段映射。
 * @status stable
 * @since 3.0
 *
 * @csspart container - 组件根容器元素。
 * @csspart item - 每个选项的容器元素。
 * @csspart label - 选项标签元素。
 * @csspart input - 原生 radio input 元素。
 * @csspart indicator - 当前选中指示器元素。
 *
 * @event change - 选项改变时触发，detail: `{ value: string }`。
 *
 * @cssproperty --ea-segmented-border-radius - 组件圆角半径。
 * @cssproperty --ea-segmented-bg-color - 组件背景颜色。
 * @cssproperty --ea-segmented-hover-bg-color - 选项悬停背景颜色。
 * @cssproperty --ea-segmented-indicator-color - 选中指示器颜色。
 * @cssproperty --ea-segmented-item-checked-color - 选中项文字颜色。
 * @cssproperty --ea-segmented-item-disabled-color - 禁用项文字颜色。
 * @cssproperty --ea-segmented-item-disabled-bg-color - 禁用项背景颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSegmented extends EaBase {
  @query(".ea-segmented")
  private _container!: HTMLElement;

  private _resizeObserver?: ResizeObserver;

  private _resizeTimer?: number;

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

  @attribute({
    type: String,
    default: "",
    observer(this: EaSegmented, newVal: string) {
      this._updateIndicatorPosition(newVal);
      this._updateActiveDescendant();
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
    a11y: { ariaAttr: "aria-disabled", map: v => String(v) },
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

  /** 获取非禁用的选项列表 */
  private _getEnabledItems(): HTMLLabelElement[] {
    if (!this._container) return [];
    return Array.from(
      this._container.querySelectorAll(".ea-segmented__item")
    ).filter(el => !el.hasAttribute("aria-disabled")) as HTMLLabelElement[];
  }

  /** 更新 aria-activedescendant 指向当前选中项 */
  private _updateActiveDescendant(): void {
    if (!this._container) return;

    const items = this._container.querySelectorAll(".ea-segmented__item");
    const checkedItem = Array.from(items).find(
      el => el.getAttribute("aria-checked") === "true"
    );

    if (checkedItem?.id) {
      this.setAttribute("aria-activedescendant", checkedItem.id);
    } else if (items[0]?.id) {
      this.setAttribute("aria-activedescendant", items[0].id);
    }
  }

  /** 渲染选项列表 */
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

        const labelAttrs: Record<string, any> = {
          part: "item",
          for: label || itemValue,
          id: `${TAG_NAME}-item-${++segmentedItemId}`,
          role: "radio",
          "aria-checked": String(isChecked),
        };
        if (isDisabled) {
          labelAttrs["aria-disabled"] = "true";
        }

        return h(
          "label",
          itemClassName,
          labelAttrs,
          [
            h("input", bem.e("original"), inputProps, ""),
            h(
              "span",
              bem.e("label"),
              {
                part: "label",
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
    this._updateActiveDescendant();
  }

  /** 处理选项变更事件 */
  @listen("change", ".ea-segmented")
  private _handleChange(e: Event) {
    e.stopPropagation();

    const value = (e.target as HTMLInputElement).value;
    this.value = value;
    this.dispatchEvent(new EaSegmentedChangeEvent({ value }));
  }

  /** 处理键盘导航（aria-activedescendant 模式） */
  @listen("keydown")
  private _handleKeydown(e: KeyboardEvent): void {
    if (this.disabled) return;

    const enabledItems = this._getEnabledItems();
    if (!enabledItems.length) return;

    const currentIndex = enabledItems.findIndex(
      el => el.getAttribute("aria-checked") === "true"
    );
    let newIndex = currentIndex;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        newIndex =
          currentIndex < enabledItems.length - 1 ? currentIndex + 1 : 0;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        newIndex =
          currentIndex > 0 ? currentIndex - 1 : enabledItems.length - 1;
        break;
      case " ":
        e.preventDefault();
        if (currentIndex < 0 && enabledItems[0]) {
          const input = enabledItems[0].querySelector(
            ".ea-segmented__original"
          ) as HTMLInputElement;
          if (input) {
            this.value = input.value;
            this.dispatchEvent(
              new EaSegmentedChangeEvent({ value: input.value })
            );
          }
        }
        return;
      default:
        return;
    }

    if (newIndex !== currentIndex && enabledItems[newIndex]) {
      const input = enabledItems[newIndex].querySelector(
        ".ea-segmented__original"
      ) as HTMLInputElement;
      if (input) {
        this.value = input.value;
        this.dispatchEvent(
          new EaSegmentedChangeEvent({ value: input.value })
        );
      }
    }
  }

  /**
   * 更新选中指示器位置
   * @param value 当前选中值
   */
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
          const isChecked = input?.value === value;
          child.classList.toggle("is-checked", isChecked);
          child.setAttribute("aria-checked", String(isChecked));

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

  $mount(): void {
    this.setAttribute("role", "radiogroup");
    this.tabIndex = 0;

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
