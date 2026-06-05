import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-timeline" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 时间线组件，用于可视化地呈现时间流信息。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，放置 ea-timeline-item 子节点。
 *
 * @csspart container - 外层容器。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTimeline extends EaBase {
  html(): string {
    return `
      <div class="${bem()}" part="container" role="list">
        <slot></slot>
      </div>
    `;
  }
}

export default EaTimeline;
