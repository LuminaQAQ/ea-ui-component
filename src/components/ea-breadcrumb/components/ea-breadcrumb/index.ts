import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-breadcrumb" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 面包屑导航组件，显示当前页面的路径，快速返回之前的任意页面。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot default - 默认插槽，用于放置 ea-breadcrumb-item 子组件。
 * @slot separator - 自定义分隔符内容。
 *
 * @csspart container - 导航容器元素。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaBreadcrumb extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query("#defaultSlot")
  private _defaultSlot!: HTMLSlotElement;

  @attribute({
    type: String,
    default: "/",
    observer(this: EaBreadcrumb) {
      this._renderSeparator();
    },
  })
  separator: string = "/";

  updateContainerClasslist(): string {
    const className = bem();

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /**
   * 获取分隔符元素，优先使用 separator slot 中的自定义内容
   * @param defaultSeparator - 默认分隔符文本
   * @returns 分隔符 DOM 元素
   */
  private _getSeparatorItem(defaultSeparator: string = this.separator): HTMLElement {
    const separatorSlot = this.shadowRoot!.querySelector("#separatorSlot") as HTMLSlotElement;
    let separator = separatorSlot?.assignedElements()[0] as HTMLElement | undefined;

    if (!separator) {
      separator = document.createElement("span");
      separator.setAttribute("slot", "separator");
      separator.innerText = defaultSeparator;
    }

    return separator;
  }

  /**
   * 渲染分隔符到非末尾的面包屑项中
   */
  private _renderSeparator(): void {
    const defaultSlot = this.shadowRoot!.querySelector("#defaultSlot") as HTMLSlotElement;
    if (!defaultSlot) return;

    const breadcrumbItems = [...defaultSlot.assignedElements()].filter(
      (item) => item.tagName.toLowerCase() === "ea-breadcrumb-item"
    );

    const separator = this._getSeparatorItem(this.separator);

    breadcrumbItems.forEach((item, index) => {
      if (
        index < breadcrumbItems.length - 1 &&
        !item.querySelector("[slot='separator']")
      ) {
        item.appendChild(separator.cloneNode(true));
      }
    });
  }

  html(): string {
    return `
      <nav class="${bem()}" part="container">
        <slot id="defaultSlot"></slot>
      </nav>
      <slot id="separatorSlot" name="separator"></slot>
    `;
  }

  /**
   * 处理默认 slot 内容变化，重新渲染分隔符
   */
  @listen("slotchange", "#defaultSlot")
  private _handleSlotChange(): void {
    this._renderSeparator();
  }

  $mount(): void {
    this.updateContainerClasslist();
    this._renderSeparator();
  }
}

export default EaBreadcrumb;
