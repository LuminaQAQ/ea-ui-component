import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-option-group" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 选项分组组件，用于将下拉选择器的选项进行分组展示。
 * @status stable
 * @since 3.0
 *
 * @slot header - 自定义分组头部内容。
 * @slot default - 默认插槽，用于放置 ea-option。
 *
 * @csspart container - 分组容器。
 * @csspart header - 分组头部。
 * @csspart content - 分组内容。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaOptionGroup extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("header"))
  private _header!: HTMLElement;

  @query('slot[name="header"]')
  private _headerSlot!: HTMLSlotElement;

  @query(bem.ce("content"))
  private _content!: HTMLElement;

  @attribute({
    type: String,
    default: "",
    observer(this: EaOptionGroup, newVal: string) {
      if (this._headerSlot) {
        this._headerSlot.textContent = newVal;
      }
    },
  })
  label: string = "";

  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <header class='${bem.e("header")}' part='header'>
          <slot name='header'></slot>
        </header>
        <section class='${bem.e("content")}' part='content'>
          <slot></slot>
        </section>
      </div>
    `;
  }
}
