import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-space" as const;
const bem = createBEM(TAG_NAME);

const DIRECTION_TYPES = ["horizontal", "vertical"] as const;
type DirectionType = (typeof DIRECTION_TYPES)[number];

const SIZE_TYPES = ["small", "default", "large"] as const;
type SizeType = (typeof SIZE_TYPES)[number];

const ALIGNMENT_TYPES = [
  "",
  "center",
  "flex-start",
  "flex-end",
  "baseline",
  "stretch",
] as const;
type AlignmentType = (typeof ALIGNMENT_TYPES)[number];

/**
 * @summary 间距组件，用于在子元素之间提供统一的间距，支持方向、对齐、换行和填充等布局功能。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于放置需要间距的子元素。
 *
 * @csspart container - 容器元素。
 * @csspart spacer - 分隔符元素。
 *
 * @cssproperty --ea-space-gap - 间距大小。
 * @cssproperty --ea-space-gap-small - 小号间距。
 * @cssproperty --ea-space-gap-default - 默认间距。
 * @cssproperty --ea-space-gap-large - 大号间距。
 * @cssproperty --ea-space-alignment - 对齐方式。
 * @cssproperty --ea-space-fill-ratio - 填充比例。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSpace extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSpace) {
      this.updateContainerClasslist();
    },
  })
  wrap: boolean = false;

  @attribute({
    type: Enum(ALIGNMENT_TYPES),
    default: "",
    observer(this: EaSpace, newVal: AlignmentType) {
      if (newVal && !CSS.supports("align-items", newVal)) {
        console.warn(`[ea-space] Invalid alignment value: ${newVal}`);
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
      const existingSpacers = this.querySelectorAll('[part="spacer"]');
      existingSpacers.forEach(spacer => spacer.remove());

      if (!newVal) return;

      const children = [...this.children];
      children.forEach((child, i) => {
        if (i < children.length - 1) {
          const spacer = document.createElement("span");
          spacer.innerText = newVal;
          spacer.setAttribute("part", "spacer");
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
        this.fill = true;
      }
      this.style.setProperty("--ea-space-fill-ratio", `${newVal}%`);
    },
  })
  fillRatio: number = 100;

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

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </div>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}

export type { DirectionType, SizeType, AlignmentType };
export { DIRECTION_TYPES, SIZE_TYPES, ALIGNMENT_TYPES };
