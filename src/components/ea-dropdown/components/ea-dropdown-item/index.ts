import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, listen, query } from "@decorator";
import { EaDropdownCommandEvent } from "../../events/EaDropdownCommandEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-dropdown-item" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 下拉菜单项组件，用于展示下拉菜单中的单个选项，支持分割线、禁用和指令事件。
 * @status stable
 * @since 3.0
 *
 * @slot default - 菜单项内容插槽。
 *
 * @event ea-command - 点击菜单项时触发（当设置了 command 属性），detail: `{ command: string }`。
 *
 * @csspart container - 菜单项容器。
 * @csspart divider - 分割线。
 * @csspart content - 菜单项内容。
 *
 * @cssproperty --ea-dropdown-item-spacing - 菜单项内边距。
 * @cssproperty --ea-dropdown-item-divider-spacing - 分割线间距。
 * @cssproperty --ea-dropdown-item-divider-color - 分割线颜色。
 * @cssproperty --ea-dropdown-item-color - 菜单项文字颜色。
 * @cssproperty --ea-dropdown-item-disabled-color - 禁用状态文字颜色。
 * @cssproperty --ea-dropdown-item-hover-color - 悬停状态文字颜色。
 * @cssproperty --ea-dropdown-item-hover-background-color - 悬停状态背景颜色。
 * @cssproperty --ea-dropdown-item-font-size - 菜单项字体大小。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDropdownItem extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaDropdownItem) {
      this.updateContainerClasslist();
    },
  })
  divided: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    a11y: {
      ariaAttr: "aria-disabled",
      map: v => String(v),
    },
    observer(this: EaDropdownItem) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: String,
    default: "",
  })
  command: string = "";

  updateContainerClasslist(): string {
    const className = bem(
      { disabled: this.disabled },
      { divided: this.divided }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <div class="${bem.e("divider")}" part="divider"></div>
        <div class="${bem.e("content")}" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  @listen("click")
  private _handleClick(e: Event) {
    if (this.disabled) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return;
    }

    this.emit("ea-dropdown-item-click");

    if (this.command) {
      this.dispatchEvent(new EaDropdownCommandEvent({ command: this.command }));
    }
  }

  @listen("keydown")
  private _handleKeydown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  }

  $mount(): void {
    this.tabIndex = 0;
    this.setAttribute("role", "menuitem");
    this.updateContainerClasslist();
  }
}
