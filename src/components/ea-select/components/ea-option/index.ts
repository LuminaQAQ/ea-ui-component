import EaBase from "@/core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { createBEM } from "@utils/bem";
import { EaOptionClickEvent } from "../../events/EaOptionClickEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-option" as const;
const bem = createBEM(TAG_NAME);

// ==================== 组件类 ====================

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaOption extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-option")
  private _container!: HTMLElement;

  /** @type {AbortController} */
  private _abortController?: AbortController | null;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: null,
    observer(this: EaOption) {},
  })
  value: string | null = null;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaOption) {
      this.updateContainerClasslist();
    },
  })
  selected: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaOption, newVal: boolean) {
      this.setAttribute("tabindex", newVal ? "-1" : "0");
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  constructor() {
    super();
  }

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem(
      {},
      {
        selected: this.selected,
        disabled: this.disabled,
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
      <div class='ea-option' part='container'>
        <slot></slot>
      </div>
    `;
  }

  /**
   * 选项选择事件
   */
  @listen("click")
  private _onOptionSelectedEvent(e: Event): void {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (this.disabled) return;

    this.dispatchEvent(
      new EaOptionClickEvent({
        value: this.value,
        target: this,
      })
    );
  }

  /**
   * 键盘事件
   */
  @listen("keydown")
  private _onKeydown(e: KeyboardEvent): void {
    if (e.key === "Enter") {
      this._onOptionSelectedEvent(e);
    }
  }

  async connectedCallback() {
    super.connectedCallback();

    this.removeAttribute("tabindex");

    this._abortController?.abort();
    this._abortController = new AbortController();
  }

  $beforeUnmount() {
    this._abortController?.abort();
  }
}
