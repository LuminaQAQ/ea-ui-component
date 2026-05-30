import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-menu-item" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 菜单项组件，用于展示单个菜单条目，支持激活和禁用状态。
 * @status stable
 * @since 3.0
 *
 * @slot default - 菜单项内容的默认插槽。
 *
 * @csspart container - 菜单项外层容器元素。
 *
 * @cssproperty --ea-menu-item-spacing - 菜单项水平内边距。
 * @cssproperty --ea-menu-item-height - 菜单项高度。
 * @cssproperty --ea-menu-item-font-size - 菜单项字体大小。
 * @cssproperty --ea-menu-item-bg-color - 菜单项背景颜色。
 * @cssproperty --ea-menu-item-border-color - 菜单项激活边框颜色。
 * @cssproperty --ea-menu-item-active-text-color - 菜单项激活文字颜色。
 * @cssproperty --ea-menu-item-active-bg-color - 菜单项激活背景颜色。
 * @cssproperty --ea-menu-item-transition - 菜单项过渡动画时长。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaMenuItem extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @attribute({
    type: String,
    default: "",
  })
  index: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaMenuItem) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaMenuItem) {
      this.updateContainerClasslist();
    },
  })
  active: boolean = false;

  updateContainerClasslist(): string {
    const className = bem(
      {},
      {
        disabled: this.disabled,
        active: this.active,
      }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    return `
      <li class="${bem()}" role="menuitem" part="container">
        <slot></slot>
      </li>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}

export default EaMenuItem;
