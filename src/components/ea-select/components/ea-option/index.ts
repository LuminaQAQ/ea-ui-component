import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-option" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 下拉选择器选项组件，用于定义选择器的可选项。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于选项内容。
 *
 * @csspart container - 选项容器。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaOption extends EaBase {
  private static _idCounter = 0;

  @query(bem.cb())
  private _container!: HTMLElement;

  @attribute({
    type: String,
    default: null,
  })
  value: string | null = null;

  @attribute({
    type: String,
    default: null,
  })
  label: string | null = null;

  @attribute({
    type: Boolean,
    default: false,
    a11y: { ariaAttr: "aria-selected", map: (v: boolean) => String(v) },
    observer(this: EaOption) {
      this.updateContainerClasslist();
    },
  })
  selected: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    a11y: { ariaAttr: "aria-disabled", map: (v: boolean) => String(v) },
    observer(this: EaOption) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @property({
    type: Boolean,
    default: false,
    observer(this: EaOption) {
      this.updateContainerClasslist();
    },
  })
  active: boolean = false;

  updateContainerClasslist(): string {
    const className = bem(
      {},
      {
        selected: this.selected,
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
      <div class='${bem()}' part='container'>
        <slot></slot>
      </div>
    `;
  }

  @listen("click")
  private _handleClick(e: Event): void {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (this.disabled) return;

    this.emit("ea-option-click", {
      detail: { value: this.value, target: this },
    });
  }

  $mounted() {
    this.setAttribute("role", "option");
    this.id = `ea-option-${EaOption._idCounter++}`;
    this.updateContainerClasslist();
  }
}
