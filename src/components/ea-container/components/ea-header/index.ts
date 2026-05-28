import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-header" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 顶栏容器组件，用于布局的顶部区域。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于放置顶栏内容。
 *
 * @csspart container - 容器元素。
 *
 * @cssproperty --ea-header-height - 顶栏高度。
 * @cssproperty --ea-header-padding - 顶栏内边距。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaHeader extends EaBase {
  @attribute({
    type: String,
    default: "60px",
    observer(this: EaHeader, newVal: string) {
      if (newVal && CSS.supports("height", newVal)) {
        this.style.setProperty("--ea-header-height", newVal);
      } else if (newVal) {
        this.style.setProperty("--ea-header-height", "60px");
      } else {
        this.style.setProperty("--ea-header-height", "auto");
      }
    },
  })
  height: string = "60px";

  html(): string {
    return `
      <header class="${bem()}" part="container">
        <slot></slot>
      </header>
    `;
  }
}
