import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-col" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCol extends EaBase {
  // ==================== 属性定义 ====================

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

  // ==================== 方法 ====================

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <${this.tag} class="${bem()}" part="container">
        <slot></slot>
      </${this.tag}>
    `;
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    // 初始化 CSS 变量
    this.style.setProperty("--ea-col-span", String(this.span));
    this.style.setProperty("--ea-col-offset", String(this.offset));
    this.style.setProperty("--ea-col-push", String(this.push));
    this.style.setProperty("--ea-col-pull", String(this.pull));
  }
}
