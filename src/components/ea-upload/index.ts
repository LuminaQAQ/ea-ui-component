import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-upload" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary
 * @status stable
 * @since 3.0
 *
 * @slot default - default slot.
 *
 * @csspart container - container element.
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaUpload extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @attribute({
    type: String,
    default: "",
    observer(this: EaUpload, newVal: string) {
      this.updateContainerClasslist();
    },
  })
  type: string = "";

  updateContainerClasslist(): string {
    const className = bem({
      // ['--' + this.type]: this.type,
    });

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

  @listen("click")
  private _handleClick(e: Event): void {
    // TODO
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
