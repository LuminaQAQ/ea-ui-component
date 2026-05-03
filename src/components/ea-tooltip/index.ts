import { EaPopper } from "@common/ea-popper/index";
import { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-tooltip" as const;
const bem = createBEM(TAG_NAME);

const TRIGGER_TYPES = [
  "click",
  "focus",
  "hover",
  "contextmenu",
  "customized",
] as const;

type TriggerType = (typeof TRIGGER_TYPES)[number];

const EFFECT_TYPES = ["dark", "light", "customized"] as const;

type EffectType = (typeof EFFECT_TYPES)[number];

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTooltip extends EaPopper {
  // ==================== DOM 元素引用 ====================

  private _contentElement?: HTMLElement;
  private _triggerAbortController?: AbortController;
  private _contextmenuAbortController?: AbortController;

  // ==================== 属性定义 ====================

  @attribute({
    type: Enum(TRIGGER_TYPES),
    default: "hover",
  })
  trigger: TriggerType = "hover";

  @attribute({
    type: Enum(EFFECT_TYPES),
    default: "dark",
    observer(this: EaTooltip) {
      this.updateContainerClasslist();
    },
  })
  effect: EffectType = "dark";

  @attribute({
    type: String,
    default: "",
    observer(this: EaTooltip, newVal: string) {
      if (!this._contentElement) {
        const contentElement = document.createElement("div");
        const contentSlot = this._originalPopper.querySelector("slot");
        contentElement.classList.add(bem.e("content"));
        contentElement.part = "content";
        contentElement.innerText = newVal;

        this._originalPopper.appendChild(contentElement);

        this._contentElement = contentElement;
        contentSlot?.remove();
      } else {
        this._contentElement.innerText = newVal;
      }
    },
  })
  content: string = "";

  // ==================== 方法 ====================

  private _initTriggerEvent(): void {
    this._triggerAbortController?.abort();
    this._triggerAbortController = new AbortController();

    if (this.trigger === "customized") return;

    const strategy = this._triggerEventStrategies[this.trigger];
    if (strategy) {
      strategy();
    } else {
      console.warn(`[EaTooltip] trigger event ${this.trigger} is not exist`);
      this._triggerEventStrategies["hover"]();
    }
  }

  private _triggerEventStrategies: Record<TriggerType, () => void> = {
    hover: () => {
      this.addEventListener(
        "mouseover",
        () => {
          this.show();

          this.addEventListener(
            "mouseout",
            () => {
              this.hide();
            },
            { once: true, signal: this._triggerAbortController!.signal }
          );
        },
        { signal: this._triggerAbortController!.signal }
      );
    },
    click: () => {
      this.addEventListener(
        "click",
        () => {
          this.toggle();
        },
        { signal: this._triggerAbortController!.signal }
      );
    },
    focus: () => {
      this.addEventListener(
        "focus",
        () => {
          this.show();

          this.addEventListener(
            "blur",
            () => {
              this.hide();
            },
            { signal: this._triggerAbortController!.signal }
          );
        },
        { signal: this._triggerAbortController!.signal }
      );
    },
    contextmenu: () => {
      this.addEventListener(
        "contextmenu",
        (e: MouseEvent) => {
          e.preventDefault();

          this._contextmenuAbortController?.abort();
          this._contextmenuAbortController = new AbortController();

          this.show();

          window.addEventListener(
            "click",
            (e: MouseEvent) => {
              const isThis = this.contains(e.target as Node);
              if (!isThis) {
                this.hide();
                this._contextmenuAbortController?.abort();
              }
            },
            { signal: this._contextmenuAbortController.signal }
          );
        },
        { signal: this._triggerAbortController!.signal }
      );
    },
    customized: () => {},
  };

  updateContainerClasslist(): string {
    const originClasslist = super.updateContainerClasslist();
    const className = `${originClasslist} ${bem({
      [this.effect]: this.effect && this.effect !== "customized",
    })}`;

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    super.$mount();
    this._initTriggerEvent();
  }

  $beforeUnmount(): void {
    super.$beforeUnmount();
    this._triggerAbortController?.abort();
    this._contextmenuAbortController?.abort();
  }
}
