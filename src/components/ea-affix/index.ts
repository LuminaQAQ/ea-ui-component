import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-affix" as const;
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
export class EaAffix extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  private afffixState = {
    isAffix: false,
    originalTop: 0,
    originalLeft: 0,
    currentTop: 0,
    currentLeft: 0,
  };

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaAffix, newVal: number) {
      this._handleScroll();
    },
  })
  offset: number = 0;

  @attribute({
    type: String,
    default: "",
  })
  target: string = "";

  updateContainerClasslist(): string {
    const className = bem(
      {
        // [this.type]: this.type,
      },
      {
        affix: this.afffixState.isAffix,
      }
    );

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

  @listen("scroll", "window")
  private _handleScroll(): void {
    const scrollTop = window.scrollY;
    const offsetTop = this.offsetTop;
    const targetElement = this.target
      ? document.querySelector(this.target)
          : null;
      
      const left = this.getBoundingClientRect().x;
      
      console.log(this.getBoundingClientRect());
      

    let targetTop = 0;
    let targetLeft = 0;

    if (targetElement) {
      targetTop = targetElement.clientTop;
      targetLeft = targetElement.clientLeft;
    } else {
      targetTop = window.scrollY;
      targetLeft = window.scrollX;
    }

    this.afffixState.isAffix = scrollTop + this.offset >= offsetTop;
    

    this._container.style.setProperty(`--${TAG_NAME}-top`, `${this.offset}px`);
    this._container.style.setProperty(
      `--${TAG_NAME}-left`,
      `${left}px`
      );

    this.updateContainerClasslist();
  }

  $mount(): void {
    this._handleScroll();

    this.updateContainerClasslist();
  }
}
