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

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: null,
    observer(this: EaOption) {},
  })
  value: string | null = null;

  @attribute({
    type: String,
    default: null,
    observer(this: EaOption) {},
  })
  label: string | null = null;

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
    observer(this: EaOption) {
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

    if (this._container) {
      this._container.className = className;
      this._container.setAttribute("tabindex", this.disabled ? "-1" : "0");
    }

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

  $mounted() {
    this.updateContainerClasslist();
  }
}
