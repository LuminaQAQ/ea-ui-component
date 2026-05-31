import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { VARIANT_TYPES, type VariantType } from "@/constants/variant";
import { EaCheckTagChangeEvent } from "../../events/EaCheckTagChangeEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-check-tag" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 可选中标签组件，用于类似复选框的标签选择场景，支持选中状态切换和多种类型。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于放置标签文本或自定义内容。
 *
 * @event change - 选中状态改变时触发，detail: `{ checked: boolean }`。
 *
 * @csspart container - 容器元素。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCheckTag extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCheckTag) {
      this.updateContainerClasslist();
    },
  })
  checked: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCheckTag) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Enum(VARIANT_TYPES),
    default: "primary",
    observer(this: EaCheckTag) {
      this.updateContainerClasslist();
    },
  })
  variant: VariantType = "primary";

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.variant]: this.variant && this.checked,
      },
      {
        disabled: this.disabled,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  /** 渲染模板 */
  html(): string {
    return `
      <div class='${this.updateContainerClasslist()}' part='container'>
        <slot></slot>
      </div>
    `;
  }

  /** 点击切换选中状态 */
  @listen("click", bem.cb())
  private _handleClick(): void {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.dispatchEvent(new EaCheckTagChangeEvent({ checked: this.checked }));
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
