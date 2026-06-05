import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-menu-item-group" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 菜单项分组组件，用于将菜单项按组分类，显示分组标题。
 * @status stable
 * @since 3.0
 *
 * @slot title - 分组标题内容。
 * @slot default - 分组内菜单项内容。
 *
 * @csspart container - 外层容器元素。
 * @csspart title - 分组标题容器元素。
 * @csspart content - 分组内容容器元素。
 *
 * @cssproperty --ea-menu-item-group-spacing - 分组水平内边距。
 * @cssproperty --ea-menu-item-group-height - 分组标题高度。
 * @cssproperty --ea-menu-item-group-font-size - 分组标题字体大小。
 * @cssproperty --ea-menu-item-group-text-color - 分组标题文字颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaMenuItemGroup extends EaBase {
  private static _instanceCount: number = 0;

  private readonly _uniqueId: number = EaMenuItemGroup._instanceCount++;

  @query(bem.ce("title"))
  private _titleEl!: HTMLElement;

  @query(bem.ce("content"))
  private _contentEl!: HTMLElement;

  @query('slot[name="title"]')
  private _titleSlot!: HTMLSlotElement;

  @attribute({
    type: String,
    default: "",
    observer(this: EaMenuItemGroup, newVal: string) {
      if (this._titleSlot) {
        this._titleSlot.textContent = newVal;
      }
    },
  })
  groupTitle: string = "";

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <header class="${bem.e("title")}" part="title">
          <slot name="title">${this.groupTitle}</slot>
        </header>
        <div class="${bem.e("content")}" part="content" role="group">
          <slot></slot>
        </div>
      </div>
    `;
  }

  /** 设置 ARIA 关联属性 */
  private _setupAria(): void {
    const id = `ea-menu-item-group-${this._uniqueId}`;
    this._titleEl.setAttribute("id", `${id}-title`);
    this._contentEl.setAttribute("aria-labelledby", `${id}-title`);
  }

  $mount(): void {
    this._setupAria();
  }
}

export default EaMenuItemGroup;
