import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { html } from "@/utils/html";
import { timeout } from "@/utils/timeout";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-skeleton" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSkeleton extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
  private _container!: HTMLElement;

  @query("#default")
  private _defaultSlot!: HTMLSlotElement;

  @query("#template")
  private _templateSlot!: HTMLSlotElement;

  // ==================== 属性定义 ====================

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
    observer(this: EaSkeleton) {},
  })
  throttleLeading: number = 0;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaSkeleton) {},
  })
  throttleTrailing: number = 0;

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaSkeleton, newVal: boolean) {
      if (this.throttleTrailing || this.throttleLeading) {
        try {
          clearTimeout(this._loadingThrottle);
          this._loadingThrottle = null;
        } catch {
          /* empty */
        }
      }

      this._loadingThrottle = timeout(
        () => {
          this.updateContainerClasslist();
        },
        (newVal ? this.throttleTrailing : this.throttleLeading) || 0
      );
    },
  })
  loading: boolean = true;

  // ==================== 私有属性 ====================

  private _loadingThrottle: number | null = null;
  private _templateNode: DocumentFragment | null = null;

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = bem({}, { loading: this.loading });

    this._container.className = className;

    return className;
  }

  private _getTemplateElements(): HTMLElement[] {
    const slotted = [...this.querySelectorAll("[slot='template']")];
    return slotted.length ? slotted : [this._templateSlot];
  }

  private _cloneTemplate(elements: HTMLElement[]): DocumentFragment {
    if (this._templateNode) return this._templateNode;

    const fragment = document.createDocumentFragment();
    elements.forEach(el => fragment.appendChild(el.cloneNode(true)));
    this._templateNode = fragment;
    return fragment;
  }

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

  private _updateAnimatedStatus(isAnimated: boolean): void {
    const assigned = this._templateSlot.assignedElements();
    const children: HTMLElement[] = assigned
      .filter(el => el.tagName.toLocaleLowerCase() === "ea-skeleton-item")
      .concat(
        ...assigned.map(el => [...el.querySelectorAll("ea-skeleton-item")])
      )
      .concat([...this._templateSlot.querySelectorAll("ea-skeleton-item")]);

    children.forEach(child => child.toggleAttribute("animated", isAnimated));
  }

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <slot id="default" part="default-slot"></slot>
        <slot id="template" name="template" part="template-slot"></slot>
      </div>
    `;
  }

  // ==================== 事件处理 ====================

  @listen("slotchange", "#template")
  private _handleTemplateSlotChange(): void {
    this._updateAnimatedStatus(this.animated);
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }

  $mounted(): void {
    this._initDefaultSkeleton();
  }

  $beforeUnmount(): void {
    try {
      clearTimeout(this._loadingThrottle);
      this._loadingThrottle = null;
    } catch {
      /* empty */
    }
  }
}

export default EaSkeleton;
