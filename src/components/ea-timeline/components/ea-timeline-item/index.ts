import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import { VARIANT_TYPES, type VariantType } from "@/constants/variant";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-timeline-item" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTimelineItem extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("dot"))
  private _dot!: HTMLElement;

  @query(bem.ce("tail"))
  private _tail!: HTMLElement;

  @query('slot[name="timestamp"]')
  private _timestampSlot!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: Enum(VARIANT_TYPES),
    default: "",
    observer(this: EaTimelineItem) {
      this.updateContainerClasslist();
    },
  })
  variant: VariantType | "" = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaTimelineItem, newVal: string) {
      this._timestampSlot.textContent = newVal;
    },
  })
  timestamp: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTimelineItem, newVal: boolean) {
      this._timestampSlot.style.display = newVal ? "none" : "block";
    },
  })
  hideTimestamp: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaTimelineItem, newVal: string) {
      if (!CSS.supports("color", newVal))
        return console.warn(
          `[EaTimelineItem] The color value ${newVal} is not supported.`
        );
      if (!this._dot) return;

      this.style.setProperty("--ea-timeline-item-dot-color", newVal);
      this._dot.style.borderColor = newVal;
    },
  })
  color: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTimelineItem) {
      this.updateContainerClasslist();
    },
  })
  hollow: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaTimelineItem, newVal: string) {
      this._dot.innerHTML = `<ea-icon class="${bem.e("icon-dot")}" part='icon-dot' name="${newVal}"></ea-icon>`;
    },
  })
  icon: string = "";

  @attribute({
    type: Enum(["normal", "large"]),
    default: "",
    observer(this: EaTimelineItem) {
      this.updateContainerClasslist();
    },
  })
  size: "normal" | "large" | "" = "";

  @attribute({
    type: Enum(["top", "bottom"]),
    default: "",
    observer(this: EaTimelineItem) {
      this.updateContainerClasslist();
    },
  })
  placement: "top" | "bottom" | "" = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTimelineItem) {
      this.updateContainerClasslist();
    },
  })
  center: boolean = false;

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.variant]: !!this.variant,
        [this.size]: !!this.size,
        [this.placement]: !!this.placement,
        center: this.center,
      },
      {
        "hollow-dot": this.hollow,
      }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <aside class="${bem.e("wrapper")}" part="left-wrapper">
          <slot name="dot">
            <section class="${bem.e("dot")}" part="dot"></section>
          </slot>
          <section class="${bem.e("tail")}" part="tail"></section>
        </aside>
        <main class="${bem.e("wrapper")} ${bem.e("right-wrapper")}" part="right-wrapper">
          <header class="${bem.e("content")}" part="content">
            <slot></slot>
          </header>
          <footer class="${bem.e("timestamp")}" part="timestamp">
            <slot name="timestamp"></slot>
          </footer>
        </main>
      </div>
    `;
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }
}

export default EaTimelineItem;
