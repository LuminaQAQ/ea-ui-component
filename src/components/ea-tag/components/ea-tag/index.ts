import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { html } from "@utils/html";
import { Enum } from "@/utils/Enum";
import { componentSizes } from "@/utils/Variables";
import EaUtils from "@/utils/Utils";
import { EaTagRemoveEvent } from "../../events/EaTagRemoveEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-tag" as const;
const bem = createBEM(TAG_NAME);

// ==================== 类型定义 ====================

export type TagType = "primary" | "info" | "success" | "warning" | "danger";

export type TagSize = "large" | "default" | "small";

export type TagEffect = "dark" | "light" | "plain";

// ==================== 组件类 ====================

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTag extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-tag")
  private _container!: HTMLElement;

  @query(".ea-tag__close")
  private _closeIcon!: HTMLElement;

  /** @type {AbortController} */
  private _closableAbortController?: AbortController;

  // ==================== 属性定义 ====================

  @attribute({
    type: Enum(["primary", "info", "success", "warning", "danger"]),
    default: "primary",
    observer(this: EaTag) {
      this.updateContainerClasslist();
    },
  })
  type: TagType = "primary";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTag, newVal: boolean) {
      this._closableAbortController?.abort();

      if (newVal) {
        this._closableAbortController = new AbortController();
        this._closeIcon.addEventListener("click", this._onTagRemoveEvent, {
          signal: this._closableAbortController.signal,
        });
      }

      this.updateContainerClasslist();
    },
  })
  closable: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTag) {},
  })
  disableTransitions: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaTag, newVal: string) {
      if (newVal && CSS.supports("background", newVal))
        this._container.style.background = newVal;
      else this._container.style.background = "";

      if (!CSS.supports("background", newVal))
        return console.warn(
          `[EaTag] The color value ${newVal} is not supported.`
        );
    },
  })
  color: string = "";

  @attribute({
    type: Enum(componentSizes),
    default: "default",
    observer(this: EaTag) {
      this.updateContainerClasslist();
    },
  })
  size: TagSize = "default";

  @attribute({
    type: Enum(["dark", "light", "plain"]),
    default: "light",
    observer(this: EaTag) {
      this.updateContainerClasslist();
    },
  })
  effect: TagEffect = "light";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTag) {
      this.updateContainerClasslist();
    },
  })
  round: boolean = false;

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.type]: true,
        [`${this.size}-size`]: true,
        [this.effect]: true,
      },
      {
        closable: this.closable,
        round: this.round,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class='${this.updateContainerClasslist()}' part='container'>
        <span><slot></slot></span>
        <ea-icon class="ea-tag__close" part="close-icon" name="xmark"></ea-icon>
      </div>
    `;
  }

  /**
   * 标签移除事件
   */
  private _onTagRemoveEvent = async () => {
    if (!this.disableTransitions) {
      this._container.classList.add("before-close");
      await EaUtils.EaElement.addAsyncEventListener(
        this._container,
        "transitionend"
      );
    }

    this.dispatchEvent(new EaTagRemoveEvent({ text: this.textContent }));

    this.remove();
  };

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._closableAbortController?.abort();
  }
}
