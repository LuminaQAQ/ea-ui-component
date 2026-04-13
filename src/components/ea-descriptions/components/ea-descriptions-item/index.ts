import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-descriptions-item" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDescriptionsItem extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-descriptions-item")
  private _container!: HTMLElement;

  @query(".ea-descriptions-item__label")
  private _label!: HTMLSpanElement;

  private _contentObserver: MutationObserver | null = null;

  // ==================== 属性定义 ====================

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
    type: ["left", "center", "right"] as const,
    default: "",
    observer(this: EaDescriptionsItem) {
      this._notifyParent();
    },
  })
  align: "left" | "center" | "right" | "" = "";

  @attribute({
    type: ["left", "center", "right"] as const,
    default: "",
    observer(this: EaDescriptionsItem) {
      this._notifyParent();
    },
  })
  labelAlign: "left" | "center" | "right" | "" = "";

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

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem();
    if (this._container) {
      this._container.className = className;
    }
    return className;
  }

  /**
   * 渲染模板
   */
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

  /**
   * 通知父组件更新
   */
  private _notifyParent(): void {
    this.emit("ea-descriptions-item-change", {
      bubbles: true,
      composed: true,
    });
  }

  /**
   * 设置内容观察器
   */
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

  // ==================== 生命周期 ====================

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
