import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-descriptions-item" as const;
const bem = createBEM(TAG_NAME);

const ALIGN_TYPES = ["left", "center", "right"] as const;
type AlignType = (typeof ALIGN_TYPES)[number];

/**
 * @summary 描述列表项组件，用于定义描述列表中的单个字段项，支持跨行跨列和自定义对齐。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于描述项内容。
 *
 * @event ea-descriptions-item-change - 属性变化时触发，通知父组件重新渲染。
 *
 * @csspart container - item 外层容器。
 * @csspart label - 标签元素。
 * @csspart content - 内容元素。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDescriptionsItem extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("label"))
  private _label!: HTMLSpanElement;

  private _contentObserver: MutationObserver | null = null;

  @attribute({
    type: String,
    default: "",
    observer(this: EaDescriptionsItem, newVal: string) {
      this._label.textContent = newVal;
      this._notifyParent();
    },
  })
  label: string = "";

  @attribute({
    type: Number,
    default: 1,
    observer(this: EaDescriptionsItem) {
      this._notifyParent();
    },
  })
  colspan: number = 1;

  @attribute({
    type: Number,
    default: 1,
    observer(this: EaDescriptionsItem) {
      this._notifyParent();
    },
  })
  rowspan: number = 1;

  @attribute({
    type: Enum(ALIGN_TYPES),
    default: "",
    observer(this: EaDescriptionsItem) {
      this._notifyParent();
    },
  })
  align: AlignType | "" = "";

  @attribute({
    type: Enum(ALIGN_TYPES),
    default: "",
    observer(this: EaDescriptionsItem) {
      this._notifyParent();
    },
  })
  labelAlign: AlignType | "" = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaDescriptionsItem) {
      this._notifyParent();
    },
  })
  width: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaDescriptionsItem) {
      this._notifyParent();
    },
  })
  labelWidth: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaDescriptionsItem) {
      this._notifyParent();
    },
  })
  labelPart: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaDescriptionsItem) {
      this._notifyParent();
    },
  })
  contentPart: string = "";

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const className = bem();
    if (this._container) {
      this._container.className = className;
    }
    return className;
  }

  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <span class='${bem.e("label")}' part='label'>${this.label}</span>
        <span class='${bem.e("content")}' part='content'>
          <slot></slot>
        </span>
      </div>
    `;
  }

  /** 通知父组件更新 */
  private _notifyParent(): void {
    this.emit("ea-descriptions-item-change", {
      bubbles: true,
      composed: true,
    });
  }

  /** 设置内容观察器 */
  private _setupContentObserver(): void {
    this._contentObserver = new MutationObserver(() => {
      this._notifyParent();
    });

    this._contentObserver.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  $mount(): void {
    this._setupContentObserver();
  }

  $beforeUnmount(): void {
    if (this._contentObserver) {
      this._contentObserver.disconnect();
      this._contentObserver = null;
    }
  }
}
