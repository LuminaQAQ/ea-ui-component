import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-button-group" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaButtonGroup extends EaBase {
  // ==================== 属性定义 ====================

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaButtonGroup, newVal: boolean) {
      this.querySelectorAll("ea-button").forEach((button) => {
        if (newVal) {
          button.setAttribute("disabled", "");
        } else {
          button.removeAttribute("disabled");
        }
      });
    },
  })
  disabled: boolean = false;

  @attribute({
    type: ["small", "medium", "large"] as const,
    default: "medium",
    observer(this: EaButtonGroup, newVal: string) {
      this.querySelectorAll("ea-button").forEach((button) => {
        button.setAttribute("size", newVal);
      });
    },
  })
  size: "small" | "medium" | "large" = "medium";

  @attribute({
    type: ["normal", "primary", "success", "warning", "danger"] as const,
    default: "normal",
    observer(this: EaButtonGroup, newVal: string) {
      this.querySelectorAll("ea-button").forEach((button) => {
        button.setAttribute("type", newVal);
      });
    },
  })
  type: "normal" | "primary" | "success" | "warning" | "danger" = "normal";

  // ==================== 方法 ====================

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class="${bem()}" part="container">
        <slot></slot>
      </div>
    `;
  }
}

export default EaButtonGroup;
