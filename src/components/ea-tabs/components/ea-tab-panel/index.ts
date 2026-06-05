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

  @attribute({
    type: Boolean,
    default: false,
    a11y: {
      ariaAttr: "inert",
      map: v => v ? null : "",
    },
  })
  active: boolean = false;

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

  /** 设置 ARIA 属性，遵循 W3C tabs 模式 */
  private _setupAria(): void {
    this._container.setAttribute("role", "tabpanel");
    this._container.id = `ea-tab-panel-${this.name}`;
    this._container.setAttribute("tabindex", "0");

    const tab = this.closest("ea-tabs")?.querySelector(`ea-tab[panel="${this.name}"]`);
    if (tab?.id) {
      this._container.setAttribute("aria-labelledby", tab.id);
    }
  }

  $mount(): void {
    this.updateContainerClasslist();
    this._setupAria();
  }
}
