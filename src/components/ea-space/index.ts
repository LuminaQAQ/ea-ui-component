import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-space" as const;
const bem = createBEM(TAG_NAME);

// 方向类型
const DIRECTION_TYPES = ["horizontal", "vertical"] as const;
type DirectionType = (typeof DIRECTION_TYPES)[number];

// 尺寸类型
const SIZE_TYPES = ["small", "default", "large"] as const;
type SizeType = (typeof SIZE_TYPES)[number];

// 对齐类型
const ALIGNMENT_TYPES = [
  "",
  "center",
  "flex-start",
  "flex-end",
  "baseline",
  "stretch",
] as const;
type AlignmentType = (typeof ALIGNMENT_TYPES)[number];

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSpace extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-space")
  private _container!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSpace, newVal: boolean) {
      this.style.setProperty("--ea-space-wrap", newVal ? "wrap" : "nowrap");
    },
  })
  wrap: boolean = false;

  @attribute({
    type: Enum(ALIGNMENT_TYPES),
    default: "",
    observer(this: EaSpace, newVal: AlignmentType) {
      if (newVal && !CSS.supports("align-items", newVal)) {
        console.warn(`[ea-space] Invalid alignment value ${newVal}`);
        return;
      }
      this.style.setProperty("--ea-space-alignment", newVal || "center");
    },
  })
  alignment: AlignmentType = "";

  @attribute({
    type: Enum(DIRECTION_TYPES),
    default: "horizontal",
    observer(this: EaSpace) {
      this.updateContainerClasslist();
    },
  })
  direction: DirectionType = "horizontal";

  @attribute({
    type: String,
    default: "default",
    observer(this: EaSpace, newVal: string) {
      if (SIZE_TYPES.includes(newVal as SizeType)) {
        this.updateContainerClasslist();
      } else {
        if (!CSS.supports("gap", newVal)) {
          console.warn("[ea-space] Invalid size value");
          return;
        }
        this.style.setProperty("--ea-space-gap", newVal);
      }
    },
  })
  size: string = "default";

  @attribute({
    type: String,
    default: "",
    observer(this: EaSpace, newVal: string) {
      // 移除现有的分隔符
      const existingSpacers = this.querySelectorAll('[part="spacer"]');
      existingSpacers.forEach(spacer => spacer.remove());

      if (!newVal) return;

      const children = [...this.children];
      children.forEach((child, i) => {
        if (i < children.length - 1) {
          const spacer = document.createElement("span");
          spacer.innerText = newVal;
          spacer.part = "spacer";
          this.insertBefore(spacer, child.nextSibling);
        }
      });
    },
  })
  spacer: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSpace) {
      this.updateContainerClasslist();
    },
  })
  fill: boolean = false;

  @attribute({
    type: Number,
    default: 100,
    observer(this: EaSpace, newVal: number) {
      if (!Number.isNaN(Number(newVal))) {
        this.toggleAttribute("fill", true);
      }
      this.style.setProperty("--ea-space-fill-ratio", `${newVal}%`);
    },
  })
  fillRatio: number = 100;

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const isPresetSize = SIZE_TYPES.includes(this.size as SizeType);
    const className = bem(
      {
        [this.size]: isPresetSize,
        vertical: this.direction === "vertical",
        fill: this.fill,
      },
      { wrap: this.wrap }
    );

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
      <div class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </div>
    `;
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }
}

export type { DirectionType, SizeType, AlignmentType };
export { DIRECTION_TYPES, SIZE_TYPES, ALIGNMENT_TYPES };
