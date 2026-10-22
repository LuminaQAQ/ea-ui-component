import EaBase, { createBEM } from "@easy-component-ui/core/core/EaBase";
import { CustomElement, attribute, query } from "@easy-component-ui/core/decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-button" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 按钮组件，用于触发操作。
 * @status stable
 * @since 0.0.0
 *
 * @slot default - 按钮内容。
 *
 * @csspart container - 按钮容器元素。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaButton extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaButton, disabled: boolean) {
      this.updateContainerClasslist(disabled);
    },
  })
  disabled = false;

  updateContainerClasslist(disabled = this.disabled): string {
    const className = bem({ disabled });

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class="${bem({ disabled: this.disabled })}" part="container">
        <slot></slot>
      </div>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}

export default EaButton;
declare global {
  interface HTMLElementTagNameMap {
    "ea-button": EaButton;
  }
}
