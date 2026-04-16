import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-check-tag" as const;
const bem = createBEM(TAG_NAME);

// ==================== 类型定义 ====================

export type CheckTagType = "primary" | "info" | "success" | "warning" | "danger";

// ==================== 组件类 ====================

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCheckTag extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-check-tag")
  private _container!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCheckTag) {
      this.updateContainerClasslist();
    },
  })
  checked: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCheckTag) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Enum(["primary", "info", "success", "warning", "danger"]),
    default: "primary",
    observer(this: EaCheckTag) {
      this.updateContainerClasslist();
    },
  })
  type: CheckTagType = "primary";

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.type]: this.type && this.checked,
      },
      {
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
      <div class='${this.updateContainerClasslist()}' part='container'>
        <slot></slot>
      </div>
    `;
  }

  /**
   * 点击切换选中状态
   */
  @listen("click", ".ea-check-tag")
  private _onCheckChangeEvent(): void {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.emit("change", { detail: { checked: this.checked } });
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }
}
