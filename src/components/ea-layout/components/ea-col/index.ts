import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-col" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 栅格列组件，基于 24 分栏的 Flex 子项，支持列宽、偏移、推拉和自定义标签。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-row
 *
 * @slot default - 默认插槽，用于列内容。
 *
 * @csspart container - 容器元素。
 *
 * @cssproperty --ea-col-span - 栅格占据的列数，默认 24。
 * @cssproperty --ea-col-offset - 栅格左侧的间隔格数，默认 0。
 * @cssproperty --ea-col-push - 栅格向右移动格数，默认 0。
 * @cssproperty --ea-col-pull - 栅格向左移动格数，默认 0。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCol extends EaBase {
  @attribute({
    type: Number,
    default: 24,
    observer(this: EaCol, newVal: number) {
      this.style.setProperty("--ea-col-span", String(newVal));
    },
  })
  span: number = 24;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaCol, newVal: number) {
      this.style.setProperty("--ea-col-offset", String(newVal));
    },
  })
  offset: number = 0;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaCol, newVal: number) {
      this.style.setProperty("--ea-col-push", String(newVal));
    },
  })
  push: number = 0;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaCol, newVal: number) {
      this.style.setProperty("--ea-col-pull", String(newVal));
    },
  })
  pull: number = 0;

  @attribute({
    type: String,
    default: "div",
  })
  tag: string = "div";

  html(): string {
    return `
      <${this.tag} class="${bem()}" part="container">
        <slot></slot>
      </${this.tag}>
    `;
  }

  $mount(): void {
    this.style.setProperty("--ea-col-span", String(this.span));
    this.style.setProperty("--ea-col-offset", String(this.offset));
    this.style.setProperty("--ea-col-push", String(this.push));
    this.style.setProperty("--ea-col-pull", String(this.pull));
  }
}
