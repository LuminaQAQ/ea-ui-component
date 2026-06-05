import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-footer" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 底栏容器组件，用于布局的底部区域。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于放置底栏内容。
 *
 * @csspart container - 容器元素。
 *
 * @cssproperty --ea-footer-height - 底栏高度。
 * @cssproperty --ea-footer-padding - 底栏内边距。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaFooter extends EaBase {
  @attribute({
    type: String,
    default: "",
    a11y: {
      ariaAttr: "aria-label",
      target: ".ea-footer",
      map: v => v || null,
    },
  })
  label: string = "";

  @attribute({
    type: String,
    default: "60px",
    observer(this: EaFooter, newVal: string) {
      if (newVal && CSS.supports("height", newVal)) {
        this.style.setProperty("--ea-footer-height", newVal);
      } else if (newVal) {
        this.style.setProperty("--ea-footer-height", "60px");
      } else {
        this.style.setProperty("--ea-footer-height", "auto");
      }
    },
  })
  height: string = "60px";

  html(): string {
    return `
      <footer class="${bem()}" part="container">
        <slot></slot>
      </footer>
    `;
  }
}
