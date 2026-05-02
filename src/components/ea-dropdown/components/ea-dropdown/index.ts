import { EaPopper } from "@/common/ea-popper";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { listen } from "@decorator/listen";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-dropdown" as const;

const TRIGGER_TYPES = ["click", "hover", "contextmenu"] as const;
type TriggerType = (typeof TRIGGER_TYPES)[number];

const SIZE_TYPES = ["small", "default", "large"] as const;
type SizeType = (typeof SIZE_TYPES)[number];

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDropdown extends EaPopper {
  @query('slot[name="reference"]')
  private _referenceSlot!: HTMLSlotElement;

  private _triggerAbortController?: AbortController;
  private _hoverHideTimer: ReturnType<typeof setTimeout> | null = null;
  private _contextmenuAbortController?: AbortController;

  @attribute({
    type: Enum(TRIGGER_TYPES),
    default: "hover",
    observer() {},
  })
  trigger: TriggerType = "hover";

  @attribute({
    type: Boolean,
    default: true,
    observer() {},
  })
  hideOnClick: boolean = true;

  @attribute({
    type: Enum(SIZE_TYPES),
    default: "",
    observer() {},
  })
  size: SizeType | "" = "";

  constructor() {
    super();
  }

  private _clearHoverHideTimer(): void {
    if (this._hoverHideTimer !== null) {
      clearTimeout(this._hoverHideTimer);
      this._hoverHideTimer = null;
    }
  }

  private _scheduleHoverHide(): void {
    this._hoverHideTimer = setTimeout(() => {
      this.hide();
      this._hoverHideTimer = null;
    }, 150);
  }

  private _triggerEventStrategies: Record<TriggerType, () => void> = {
    hover: () => {
      this.addEventListener(
        "mouseenter",
        () => {
          this._clearHoverHideTimer();
          this.show();
        },
        { signal: this._triggerAbortController!.signal }
      );

      this.addEventListener(
        "mouseleave",
        () => {
          this._scheduleHoverHide();
        },
        { signal: this._triggerAbortController!.signal }
      );
    },

    click: () => {
      this._referenceSlot.addEventListener(
        "click",
        () => {
          this.toggle();
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

          this.toggle();

          if (this.visible) {
            window.addEventListener(
              "click",
              (e: MouseEvent) => {
                if (!this.contains(e.target as Node)) {
                  this.hide();
                }
              },
              { signal: this._contextmenuAbortController.signal, once: true }
            );
          }
        },
        { signal: this._triggerAbortController!.signal }
      );
    },
  };

  @listen("ea-dropdown-item-click")
  private _handleDropdownItemClick(e: Event) {
    e.stopPropagation();
    if (this.hideOnClick) this.hide();
  }

  $mount(): void {
    super.$mount();
    if (!this.getAttribute("placement")) this.placement = "bottom";

    this._triggerAbortController?.abort();
    this._triggerAbortController = new AbortController();
    this._triggerEventStrategies[this.trigger]();
  }

  $beforeUnmount(): void {
    super.$beforeUnmount();
    this._triggerAbortController?.abort();
    this._contextmenuAbortController?.abort();
    this._clearHoverHideTimer();
  }
}
