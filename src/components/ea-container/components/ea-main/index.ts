import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-main" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 主要区域容器组件，用于布局的主要内容区域。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于放置主要内容。
 *
 * @csspart container - 容器元素。
 *
 * @cssproperty --ea-main-padding - 主区域内边距。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaMain extends EaBase {
  html(): string {
    return `
      <main class="${bem()}" part="container">
        <slot></slot>
      </main>
    `;
  }
}
