import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";

import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-tab-panel" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTabPanel extends EaBase {
  /** @returns {HTMLElement | null} */
  get _hostTabsContext(): HTMLElement | null {
    try {
      return this.closest("ea-tabs");
    } catch {
      return null;
    }
  }

  // ==================== DOM 元素引用 ====================

  @query(".ea-tab-panel")
  private _container!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
  })
  name: string = "";

  @attribute({
    type: Enum(["", "card", "border-card"]),
    default: "",
    observer(this: EaTabPanel) {
      this.updateContainerClasslist();
    },
  })
  type: "" | "card" | "border-card" = "";

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem({ [this.type]: !!this.type });

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <slot></slot>
      </div>
    `;
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }
}
