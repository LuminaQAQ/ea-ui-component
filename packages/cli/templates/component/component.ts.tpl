import EaBase, { createBEM } from "@easy-component-ui/core/core/EaBase";
import { CustomElement, attribute, query, listen } from "@easy-component-ui/core/decorator";
___INTERNAL_DEPS___
import stylesheet from "./index.scss?inline";

const TAG_NAME = "___TAG_NAME___" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary ___SUMMARY___
 * @status stable
 * @since ___VERSION___
 *
___DEPENDENCY___
 * @slot default - 默认插槽。
 *
 * @csspart container - 容器元素。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class ___CLASS_NAME___ extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: ___CLASS_NAME___, newVal: boolean) {
      this.updateContainerClasslist();
    },
  })
  disabled = false;

  updateContainerClasslist(): string {
    const className = bem({ disabled: this.disabled });

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <slot></slot>
      </div>
    `;
  }

  /** 处理宿主元素点击事件 */
  @listen("click")
  private _handleClick(_e: MouseEvent): void {
    // TODO: 交互逻辑
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}

___EXPORT_DEFAULT___
declare global {
  interface HTMLElementTagNameMap {
    "___TAG_NAME___": ___CLASS_NAME___;
  }
}
