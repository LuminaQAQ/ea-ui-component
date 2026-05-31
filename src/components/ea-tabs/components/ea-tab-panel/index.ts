import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { Enum } from "@utils/Enum";

import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-tab-panel" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 标签面板组件，用于在 ea-tabs 中定义单个面板内容区域。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于面板的实际内容。
 *
 * @csspart container - 面板内容的外层容器。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTabPanel extends EaBase {
  get _hostTabsContext(): HTMLElement | null {
    try {
      return this.closest("ea-tabs");
    } catch {
      return null;
    }
  }

  @query(".ea-tab-panel")
  private _container!: HTMLElement;

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

  updateContainerClasslist(): string {
    const className = bem({ [this.type]: !!this.type });

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <slot></slot>
      </div>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
