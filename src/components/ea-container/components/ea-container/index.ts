import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-container" as const;
const bem = createBEM(TAG_NAME);

const DIRECTION_TYPES = ["horizontal", "vertical"] as const;
type DirectionType = (typeof DIRECTION_TYPES)[number];

/**
 * @summary 布局容器组件，当子元素中包含 ea-header 或 ea-footer 时自动垂直排列，否则水平排列。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-header
 * @dependency ea-main
 * @dependency ea-footer
 * @dependency ea-aside
 *
 * @slot default - 默认插槽，用于放置 ea-header、ea-main、ea-footer、ea-aside 子组件。
 *
 * @csspart container - 容器元素。
 *
 * @cssproperty --ea-container-direction - 布局方向。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaContainer extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @attribute({
    type: Enum(DIRECTION_TYPES),
    default: "horizontal",
    observer(this: EaContainer) {
      this.updateContainerClasslist();
    },
  })
  direction: DirectionType = "horizontal";

  updateContainerClasslist(): string {
    const className = bem({ [this.direction]: true });
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

  @listen("slotchange", "slot")
  private _handleSlotChange(): void {
    if (this.hasAttribute("direction")) return;

    const children = [...this.querySelectorAll("& > *")].map(
      (item) => item.tagName.toLowerCase()
    );

    if (children.includes("ea-header") || children.includes("ea-footer")) {
      this.direction = "vertical";
    } else {
      this.direction = "horizontal";
    }
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
