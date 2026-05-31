import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";

import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-tab" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 标签项组件，用于在 ea-tabs 中定义单个标签，支持禁用、可关闭等状态。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot default - 默认插槽，用于标签文本内容。
 *
 * @event ea-tab-close-icon-click - 点击关闭图标时触发，detail: `{ panel }`。
 *
 * @csspart container - 单个标签项的外层容器。
 * @csspart close-icon - 关闭图标元素。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTab extends EaBase {
  get _hostTabsContext(): HTMLElement | null {
    try {
      return this.closest("ea-tabs");
    } catch {
      return null;
    }
  }

  @query(".ea-tab")
  private _container!: HTMLElement;

  @attribute({
    type: String,
    default: "",
  })
  panel: string = "";

  @attribute({
    type: Enum(["", "card", "border-card"]),
    default: "",
    observer(this: EaTab) {
      this.updateContainerClasslist();
    },
  })
  type: "" | "card" | "border-card" = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTab) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTab) {
      this.updateContainerClasslist();
    },
  })
  active: boolean = false;

  @attribute({
    type: String,
    default: "top",
    observer(this: EaTab) {
      this.updateContainerClasslist();
    },
  })
  tabPosition: string = "top";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTab) {
      this.updateContainerClasslist();
    },
  })
  editable: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTab) {
      this.updateContainerClasslist();
    },
  })
  closable: boolean = false;

  updateContainerClasslist(): string {
    const tabEls = this._hostTabsContext
      ? [...this._hostTabsContext.querySelectorAll("ea-tab")]
      : [];

    const className = bem(
      {
        [this.type]:
          this.type === this._hostTabsContext?.getAttribute("type") || "",
        [this.tabPosition]: true,
      },
      {
        disabled: this.disabled,
        active: this.active,
        last: tabEls.slice(-1)[0] === this,
        first: tabEls[0] === this,
        closable: this.closable ? this.closable : this.editable,
      }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <slot></slot>
        <ea-icon class="${bem.e("close-icon")}" name="xmark" part="close-icon"></ea-icon>
      </div>
    `;
  }

  @listen("click", ".ea-tab__close-icon")
  private _handleCloseIconClick(e: Event): void {
    e.preventDefault();
    (e as MouseEvent).stopImmediatePropagation();

    this.emit("ea-tab-close-icon-click", {
      detail: {
        panel: this.panel,
      },
      bubbles: true,
    });
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
