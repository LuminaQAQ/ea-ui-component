import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-breadcrumb" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaBreadcrumb extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-breadcrumb")
  private _container!: HTMLElement;

  @query("#defaultSlot")
  private _defaultSlot!: HTMLSlotElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "/",
    observer(this: EaBreadcrumb) {
      this._renderSeparator();
    },
  })
  separator: string = "/";

  // ==================== 私有属性 ====================

  private _abortController?: AbortController;

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem();

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /**
   * 获取分隔符元素
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
   * 渲染分隔符
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

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <nav class="${bem()}" part="container">
        <slot id="defaultSlot"></slot>
      </nav>
      <slot id="separatorSlot" name="separator"></slot>
    `;
  }

  // ==================== 事件处理 ====================

  private _handleSlotChange = (): void => {
    this._renderSeparator();
  };

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();

    // 初始化 AbortController
    this._abortController = new AbortController();

    // 监听 slot 变化
    this._defaultSlot.addEventListener("slotchange", this._handleSlotChange, {
      signal: this._abortController.signal,
    });

    // 初始渲染分隔符
    this._renderSeparator();
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
  }
}

export default EaBreadcrumb;
