import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";
import type { EaSplitterPanel, SplitterLayoutType } from "../ea-splitter-panel";

const TAG_NAME = "ea-splitter" as const;
const bem = createBEM(TAG_NAME);

/**
 * 解析 CSS 最小值
 * @param value CSS 值
 * @returns 解析后的数值
 */
const parseCSSMinValue = (value: string): number => {
  if (!value || value.trim() === "") {
    return 0;
  }

  if (value.endsWith("px")) {
    return parseInt(value.replace("px", ""));
  }

  if (value.endsWith("%")) {
    return Number(value.replace("%", "")) / 100;
  }

  const parsed = parseInt(value);
  return isNaN(parsed) ? 0 : parsed;
};

export interface SplitterResizeDetail {
  size: number[];
}

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSplitter extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-splitter")
  private _container!: HTMLElement;

  private _resizeController?: AbortController;

  // ==================== 属性定义 ====================

  @attribute({
    type: Enum(["horizontal", "vertical"] as const),
    default: "horizontal",
    observer(this: EaSplitter, newVal: SplitterLayoutType) {
      this._container.style.setProperty(
        "--ea-splitter-direction",
        newVal === "vertical" ? "column" : "row"
      );
      this._container.className = this.updateContainerClasslist();
    },
  })
  layout: SplitterLayoutType = "horizontal";

  // ==================== 方法 ====================

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist(): string {
    return bem({ [this.layout]: true });
  }

  /**
   * 派发 resize 事件
   * @param eventName 事件名称
   */
  private _dispatchResizeEvent(eventName: string): void {
    this.emit(eventName, {
      detail: {
        size: [...this.children]
          .filter(child => child.tagName === "EA-SPLITTER-PANEL")
          .map(
            child =>
              (child as EaSplitterPanel).getBoundingClientRect()?.[
                this.layout === "vertical" ? "height" : "width"
              ]
          ),
      } as SplitterResizeDetail,
    });
  }

  /**
   * `layout="horizontal"` 时的 `resize` 事件监听
   * @param e 鼠标事件
   */
  private _splitterColResizeEvent = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    const controller = new AbortController();
    const target = e.target as HTMLElement;
    const index = Number(target.getAttribute("data-index"));

    const preChild = this.children[index - 1] as EaSplitterPanel;
    const nextChild = this.children[index + 1] as EaSplitterPanel;

    const startX = e.clientX;

    const preChildRect = preChild.getBoundingClientRect();
    const initialPreWidth = preChildRect.width;

    const nextChildRect = nextChild.getBoundingClientRect();
    const initialNextWidth = nextChildRect.width;

    this._dispatchResizeEvent("panel-resize-start");

    const mousemoveHandler = (moveE: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const deltaX = moveE.clientX - startX;

      const newPreWidth = initialPreWidth + deltaX;
      const newNextWidth = initialNextWidth - deltaX;

      let currentPreWidth = 0;
      let currentNextWidth = 0;
      if (preChild.min.endsWith("%")) {
        currentPreWidth =
          this._container.clientWidth * parseCSSMinValue(preChild.min);
        currentNextWidth =
          this._container.clientWidth * parseCSSMinValue(nextChild.min);
      } else if (preChild.min.endsWith("px")) {
        currentPreWidth = parseCSSMinValue(preChild.min);
        currentNextWidth = parseCSSMinValue(nextChild.min);
      }

      if (newPreWidth <= currentPreWidth || newNextWidth <= currentNextWidth)
        return;

      preChild.size = newPreWidth + "px";
      nextChild.size = newNextWidth + "px";

      this._dispatchResizeEvent("panel-resize");
    };

    const mouseupHandler = () => {
      controller.abort();
      this._dispatchResizeEvent("panel-resize-end");
    };

    window.addEventListener("mousemove", mousemoveHandler, {
      signal: controller.signal,
    });
    window.addEventListener("mouseup", mouseupHandler, {
      signal: controller.signal,
    });
  };

  /**
   * `layout="vertical"` 时的 `resize` 事件监听
   * @param e 鼠标事件
   */
  private _splitterRowResizeEvent = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    const controller = new AbortController();
    const target = e.target as HTMLElement;
    const index = Number(target.getAttribute("data-index"));

    const preChild = this.children[index - 1] as EaSplitterPanel;
    const nextChild = this.children[index + 1] as EaSplitterPanel;

    const startY = e.clientY;

    const preChildRect = preChild.getBoundingClientRect();
    const initialPreHeight = preChildRect.height;

    const nextChildRect = nextChild.getBoundingClientRect();
    const initialNextHeight = nextChildRect.height;

    this._dispatchResizeEvent("panel-resize-start");

    const mousemoveHandler = (moveE: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const deltaY = moveE.clientY - startY;

      const newPreHeight = initialPreHeight + deltaY;
      const newNextHeight = initialNextHeight - deltaY;

      let currentPreHeight = 0;
      let currentNextHeight = 0;
      if (preChild.min.endsWith("%")) {
        currentPreHeight =
          this._container.clientHeight * parseCSSMinValue(preChild.min);
        currentNextHeight =
          this._container.clientHeight * parseCSSMinValue(nextChild.min);
      } else if (preChild.min.endsWith("px")) {
        currentPreHeight = parseCSSMinValue(preChild.min);
        currentNextHeight = parseCSSMinValue(nextChild.min);
      }

      if (
        newPreHeight <= currentPreHeight ||
        newNextHeight <= currentNextHeight
      )
        return;

      preChild.size = newPreHeight + "px";
      nextChild.size = newNextHeight + "px";

      this._dispatchResizeEvent("panel-resize");
    };

    const mouseupHandler = () => {
      controller.abort();
      this._dispatchResizeEvent("panel-resize-end");
    };

    window.addEventListener("mousemove", mousemoveHandler, {
      signal: controller.signal,
    });
    window.addEventListener("mouseup", mouseupHandler, {
      signal: controller.signal,
    });
  };

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </div>
    `;
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this._resizeController = new AbortController();

    queueMicrotask(() => {
      let children = [...this.children];
      [...this.children].forEach((child, index) => {
        if (child.tagName === "EA-SPLITTER-PANEL") {
          (child as EaSplitterPanel).layout = this.layout;
          child.setAttribute("data-panel-index", String(index));

          if (index < children.length - 1) {
            const splitterBar = document.createElement("ea-splitter-bar");
            this.insertBefore(splitterBar, child.nextSibling);
          }
        }
      });

      children = [...this.children];
      children.forEach((child, index) => {
        if (child.tagName === "EA-SPLITTER-BAR") {
          child.setAttribute("data-index", String(index));
          (child as HTMLElement & { layout: string }).layout = this.layout;
          child.addEventListener(
            "mousedown",
            this.layout === "horizontal"
              ? this._splitterColResizeEvent
              : this._splitterRowResizeEvent,
            { signal: this._resizeController?.signal }
          );
        }
      });
    });
  }

  $beforeUnmount(): void {
    this._resizeController?.abort();
  }
}
