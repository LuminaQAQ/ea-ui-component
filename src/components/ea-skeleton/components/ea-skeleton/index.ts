import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { html } from "@utils/html";
import { timeout } from "@utils/timeout";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-skeleton" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 骨架屏组件，在需要等待加载内容的位置提供占位效果，支持自定义模板和节流防抖。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-skeleton-item
 *
 * @slot default - 默认插槽，loading 结束后展示的真实内容。
 * @slot template - 骨架屏模板插槽，用于自定义骨架屏布局。
 *
 * @csspart container - 外层容器。
 * @csspart default-slot - 默认插槽容器。
 * @csspart template-slot - 骨架屏模板插槽容器。
 *
 * @cssproperty --ea-skeleton-transition - 过渡动画时长。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSkeleton extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("template"))
  private _templateSlot!: HTMLSlotElement;

  @attribute({
    type: Number,
    default: 4,
    observer(this: EaSkeleton, newVal: number) {
      this._initDefaultSkeleton(newVal);
      this._updateAnimatedStatus(this.animated);
    },
  })
  rows: number = 4;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSkeleton, newVal: boolean) {
      this._updateAnimatedStatus(newVal);
    },
  })
  animated: boolean = false;

  @attribute({
    type: Number,
    default: 1,
    observer(this: EaSkeleton, newVal: number) {
      const elements = this._getTemplateElements();
      const fragment = this._renderTemplates(newVal, elements);

      const [first] = elements;
      const hasMultiple = elements.length > 1;
      const isSkeletonItem = first?.tagName === "EA-SKELETON-ITEM";

      if (hasMultiple || isSkeletonItem) {
        elements.forEach(el => el.remove());
        this.appendChild(fragment);
      } else {
        first.innerHTML = "";
        first.appendChild(fragment);
      }
    },
  })
  count: number = 1;

  @attribute({
    type: Number,
    default: 0,
  })
  throttleLeading: number = 0;

  @attribute({
    type: Number,
    default: 0,
  })
  throttleTrailing: number = 0;

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaSkeleton, newVal: boolean) {
      clearTimeout(this._loadingThrottle);

      this._loadingThrottle = timeout(
        () => {
          this.updateContainerClasslist();
        },
        (newVal ? this.throttleTrailing : this.throttleLeading) || 0
      );
    },
  })
  loading: boolean = true;

  private _loadingThrottle: number | undefined = undefined;
  private _templateNode: DocumentFragment | null = null;

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const className = bem({}, { loading: this.loading });
    this._container.className = className;
    return className;
  }

  /** 获取模板插槽中的元素，若无则返回插槽元素本身 */
  private _getTemplateElements(): HTMLElement[] {
    const slotted = [...this.querySelectorAll("[slot='template']")] as HTMLElement[];
    return slotted.length ? slotted : [this._templateSlot];
  }

  /** 克隆模板元素并缓存 */
  private _cloneTemplate(elements: HTMLElement[]): DocumentFragment {
    if (this._templateNode) return this._templateNode;

    const fragment = document.createDocumentFragment();
    elements.forEach(el => fragment.appendChild(el.cloneNode(true)));
    this._templateNode = fragment;
    return fragment;
  }

  /** 根据 count 渲染多份模板 */
  private _renderTemplates(
    count: number,
    elements: HTMLElement[]
  ): DocumentFragment {
    const template = this._cloneTemplate(elements);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      fragment.appendChild(template.cloneNode(true));
    }

    return fragment;
  }

  /** 初始化默认骨架屏段落 */
  private _initDefaultSkeleton(rows: number = this.rows): void {
    const children = this.querySelectorAll("ea-skeleton-item");
    if (children.length) return;

    this._templateSlot.innerHTML = html(
      `${Array.from({ length: rows })
        .map(
          () =>
            `<ea-skeleton-item variant="p" ${this.animated ? "animated" : ""}></ea-skeleton-item>`
        )
        .join("")}`
    );
  }

  /** 同步 animated 状态到所有子 skeleton-item */
  private _updateAnimatedStatus(isAnimated: boolean): void {
    const assigned = this._templateSlot.assignedElements() as HTMLElement[];
    const children: HTMLElement[] = assigned
      .filter(el => el.tagName.toLocaleLowerCase() === "ea-skeleton-item")
      .concat(
        ...assigned.map(el => [...el.querySelectorAll("ea-skeleton-item")] as HTMLElement[])
      )
      .concat([...this._templateSlot.querySelectorAll("ea-skeleton-item")] as HTMLElement[]);

    children.forEach(child => child.toggleAttribute("animated", isAnimated));
  }

  /** 渲染模板 */
  html(): string {
    return `
      <div class="${bem()}" part="container" aria-hidden="true" aria-busy="${this.loading}">
        <slot class="${bem.e("default")}" part="default-slot"></slot>
        <slot class="${bem.e("template")}" name="template" part="template-slot"></slot>
      </div>
    `;
  }

  @listen("slotchange", bem.ce("template"))
  private _handleTemplateSlotChange(): void {
    this._updateAnimatedStatus(this.animated);
  }

  $mount(): void {
    this.updateContainerClasslist();
  }

  $mounted(): void {
    this._initDefaultSkeleton();
  }

  $beforeUnmount(): void {
    clearTimeout(this._loadingThrottle);
    this._loadingThrottle = undefined;
  }
}

export default EaSkeleton;
