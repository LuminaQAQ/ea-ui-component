import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-aside" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 侧边栏容器组件，用于布局的侧边区域。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于放置侧边栏内容。
 *
 * @csspart container - 容器元素。
 *
 * @cssproperty --ea-aside-width - 侧边栏宽度。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaAside extends EaBase {
  @attribute({
    type: String,
    default: "300px",
    observer(this: EaAside, newVal: string) {
      this.style.setProperty("--ea-aside-width", newVal);
    },
  })
  width: string = "300px";

  html(): string {
    return `
      <aside class="${bem()}" part="container">
        <slot></slot>
      </aside>
    `;
  }
}
