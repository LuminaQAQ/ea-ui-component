import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-dropdown-menu" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 下拉菜单容器组件，用于包裹下拉菜单项。
 * @status stable
 * @since 3.0
 *
 * @slot default - 菜单项内容插槽。
 *
 * @csspart container - 菜单容器。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDropdownMenu extends EaBase {
  html(): string {
    return `
      <div class="${bem()}" part="container">
        <slot></slot>
      </div>
    `;
  }
}
