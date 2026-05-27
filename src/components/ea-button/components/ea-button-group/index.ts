import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { Enum } from "@utils/Enum";
import { VARIANT_TYPES, type VariantType } from "@constants/variant";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-button-group" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 按钮组组件，用于组合多个按钮，统一管理尺寸和变体。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于放置 ea-button。
 *
 * @csspart container - 按钮组容器元素。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaButtonGroup extends EaBase {
  @query("slot")
  private _defaultSlot!: HTMLSlotElement;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaButtonGroup, newVal: boolean) {
      this._defaultSlot?.assignedElements().forEach((button) => {
        if (button.tagName === "EA-BUTTON") {
          button.toggleAttribute("disabled", newVal);
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
    type: Enum([...VARIANT_TYPES, "normal"]),
    default: "normal",
    observer(this: EaButtonGroup, newVal: string) {
      this.querySelectorAll("ea-button").forEach((button) => {
        button.setAttribute("variant", newVal);
      });
    },
  })
  variant: VariantType | "normal" = "normal";

  /** 渲染模板 */
  html(): string {
    return `
      <div class="${bem()}" part="container">
        <slot></slot>
      </div>
    `;
  }
}

export default EaButtonGroup;
