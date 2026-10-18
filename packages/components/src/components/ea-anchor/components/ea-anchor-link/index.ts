import EaBase, { createBEM } from "@easy-component-ui/core/core/EaBase";
import { CustomElement, attribute, query, listen } from "@easy-component-ui/core/decorator";
import { html } from "@easy-component-ui/core/utils/html";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-anchor-link" as const;
const bem = createBEM(TAG_NAME);

const ANCHOR_LINK_TAG = "ea-anchor-link";

/**
 * @summary 锚点链接组件，作为 ea-anchor 的子项，用于承载单个锚点及嵌套子级。
 * @status stable
 * @since 4.1
 *
 * @slot heading - 自定义链接标题内容。
 * @slot default - 嵌套的子级 ea-anchor-link。
 *
 * @csspart container - 链接容器元素。
 * @csspart link - 链接元素。
 * @csspart heading - 标题元素。
 *
 * @cssproperty --ea-anchor-link-text-color - 文本颜色。
 * @cssproperty --ea-anchor-link-text-color-active - 激活文本颜色。
 * @cssproperty --ea-anchor-link-indent - 子级缩进。
 * @cssproperty --ea-anchor-link-transition - 过渡时长。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaAnchorLink extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query("a")
  private _anchor!: HTMLAnchorElement;

  @query('slot[name="heading"]')
  private _headingSlot!: HTMLSlotElement;

  /**
   * 目标区块选择器
   * @default ""
   */
  @attribute({
    type: String,
    default: "",
    observer(this: EaAnchorLink, newVal: string) {
      if (this._anchor) this._anchor.setAttribute("href", newVal);
    },
  })
  href: string = "";

  /**
   * 链接标题
   * @default ""
   */
  @attribute({
    type: String,
    default: "",
    observer(this: EaAnchorLink) {
      this._updateHeading();
    },
  })
  heading: string = "";

  /**
   * 是否禁用该链接
   * @default false
   */
  @attribute({
    type: Boolean,
    default: false,
    a11y: {
      ariaAttr: "aria-disabled",
      target: "a",
      map: (v: boolean) => String(v),
    },
  })
  disabled: boolean = false;

  /**
   * 是否为当前高亮链接
   * @default false
   */
  @attribute({
    type: Boolean,
    default: false,
    a11y: {
      ariaAttr: "aria-current",
      target: "a",
      map: (v: boolean) => (v ? "location" : null),
    },
    observer(this: EaAnchorLink) {
      this.updateContainerClasslist();
    },
  })
  active: boolean = false;

  /**
   * 更新容器类名
   * @returns 容器类名字符串
   */
  updateContainerClasslist(): string {
    const className = bem({}, { active: this.active, disabled: this.disabled });

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /** 渲染模板 */
  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <a class="${bem.e("link")}" part="link" href="${this.href}">
          <span class="${bem.e("heading")}" part="heading">
            <slot name="heading">${html(this.heading)}</slot>
          </span>
        </a>
        <div class="${bem.e("children")}">
          <slot></slot>
        </div>
      </div>
    `;
  }

  /**
   * 链接点击处理
   * @param e 点击事件
   */
  @listen("click", "a")
  private _handleClick(e: MouseEvent): void {
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();

    this.emit("ea-anchor-link-click", { detail: { href: this.href } });
  }

  /**
   * 子级链接变化处理
   */
  @listen("slotchange", "slot:not([name])")
  private _handleSlotChange(): void {
    this._updateHasChildren();
  }

  /** 更新标题内容 */
  private _updateHeading(): void {
    if (!this._headingSlot) return;

    this._headingSlot.innerHTML = this.heading ? html(this.heading) : "";
  }

  /** 更新是否包含子级 */
  private _updateHasChildren(): void {
    const hasChildren = this.querySelector(ANCHOR_LINK_TAG) !== null;

    if (hasChildren) {
      this.setAttribute("has-children", "");
    } else {
      this.removeAttribute("has-children");
    }
  }

  /** 组件挂载 */
  $mount(): void {
    this.updateContainerClasslist();
    this._updateHeading();
    this._updateHasChildren();
  }
}

export default EaAnchorLink;
