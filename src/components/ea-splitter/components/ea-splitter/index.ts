import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { EaSplitterPanelResizeStartEvent } from "./events/EaSplitterPanelResizeStartEvent";
import { EaSplitterPanelResizeEvent } from "./events/EaSplitterPanelResizeEvent";
import { EaSplitterPanelResizeEndEvent } from "./events/EaSplitterPanelResizeEndEvent";
import stylesheet from "./index.scss?inline";
import type { EaSplitterPanel, SplitterLayoutType } from "../ea-splitter-panel";

const TAG_NAME = "ea-splitter" as const;
const bem = createBEM(TAG_NAME);

const parseCSSMinValue = (value: string): number => {
  if (!value || value.trim() === "") return 0;

  if (value.endsWith("px")) return parseInt(value.replace("px", ""));

  if (value.endsWith("%")) return Number(value.replace("%", "")) / 100;

  const parsed = parseInt(value);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * @summary 分隔面板组件，可将区域水平或垂直分隔，并支持拖动调整各区域大小。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-splitter-panel
 * @dependency ea-splitter-bar
 *
 * @slot default - 默认插槽，用于放置 ea-splitter-panel。
 *
 * @event ea-panel-resize-start - 开始调整面板大小时触发，detail: `{ size: number[] }`。
 * @event ea-panel-resize - 调整面板大小时触发，detail: `{ size: number[] }`。
 * @event ea-panel-resize-end - 面板调整大小结束时触发，detail: `{ size: number[] }`。
 *
 * @csspart container - 容器元素。
 *
 * @cssproperty --ea-splitter-direction - flex 布局方向。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSplitter extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @attribute({
    type: Enum(["horizontal", "vertical"] as const),
    default: "horizontal",
    observer(this: EaSplitter, newVal: SplitterLayoutType) {
      this._container.style.setProperty(
        "--ea-splitter-direction",
        newVal === "vertical" ? "column" : "row"
      );
      this._container.className = this.updateContainerClasslist();

      [...this.children].forEach(child => {
        if (
          child.tagName === "EA-SPLITTER-PANEL" ||
          child.tagName === "EA-SPLITTER-BAR"
        ) {
          child.setAttribute("layout", newVal);
        }
      });
    },
  })
  layout: SplitterLayoutType = "horizontal";

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    return bem({ [this.layout]: true });
  }

  /**
   * 派发 resize 事件
   * @param EventClass 事件类构造函数
   */
  private _dispatchResizeEvent(
    EventClass:
      | typeof EaSplitterPanelResizeStartEvent
      | typeof EaSplitterPanelResizeEvent
      | typeof EaSplitterPanelResizeEndEvent
  ): void {
    const panels = [...this.children]
      .filter(child => child.tagName === "EA-SPLITTER-PANEL")
      .map(
        child =>
          (child as EaSplitterPanel).getBoundingClientRect()?.[
            this.layout === "vertical" ? "height" : "width"
          ]
      );

    this.dispatchEvent(new EventClass({ size: panels }));
  }

  /**
   * 水平布局下的 resize 事件处理
   * @param e 鼠标事件
   * @param index bar 的索引
   */
  private _handleHorizontalResize = (e: MouseEvent, index: number): void => {
    const controller = new AbortController();

    const preChild = this.children[index - 1] as EaSplitterPanel;
    const nextChild = this.children[index + 1] as EaSplitterPanel;

    const startX = e.clientX;

    const initialPreWidth = preChild.getBoundingClientRect().width;
    const initialNextWidth = nextChild.getBoundingClientRect().width;

    this._dispatchResizeEvent(EaSplitterPanelResizeStartEvent);

    const mousemoveHandler = (moveE: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const deltaX = moveE.clientX - startX;
      const newPreWidth = initialPreWidth + deltaX;
      const newNextWidth = initialNextWidth - deltaX;

      let minPreWidth = 0;
      let minNextWidth = 0;
      if (preChild.min.endsWith("%")) {
        minPreWidth =
          this._container.clientWidth * parseCSSMinValue(preChild.min);
        minNextWidth =
          this._container.clientWidth * parseCSSMinValue(nextChild.min);
      } else if (preChild.min.endsWith("px")) {
        minPreWidth = parseCSSMinValue(preChild.min);
        minNextWidth = parseCSSMinValue(nextChild.min);
      }

      if (newPreWidth <= minPreWidth || newNextWidth <= minNextWidth) return;

      preChild.size = newPreWidth + "px";
      nextChild.size = newNextWidth + "px";

      this._dispatchResizeEvent(EaSplitterPanelResizeEvent);
    };

    const mouseupHandler = () => {
      controller.abort();
      this._dispatchResizeEvent(EaSplitterPanelResizeEndEvent);
    };

    window.addEventListener("mousemove", mousemoveHandler, {
      signal: controller.signal,
    });
    window.addEventListener("mouseup", mouseupHandler, {
      signal: controller.signal,
    });
  };

  /**
   * 垂直布局下的 resize 事件处理
   * @param e 鼠标事件
   * @param index bar 的索引
   */
  private _handleVerticalResize = (e: MouseEvent, index: number): void => {
    const controller = new AbortController();

    const preChild = this.children[index - 1] as EaSplitterPanel;
    const nextChild = this.children[index + 1] as EaSplitterPanel;

    const startY = e.clientY;

    const initialPreHeight = preChild.getBoundingClientRect().height;
    const initialNextHeight = nextChild.getBoundingClientRect().height;

    this._dispatchResizeEvent(EaSplitterPanelResizeStartEvent);

    const mousemoveHandler = (moveE: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const deltaY = moveE.clientY - startY;
      const newPreHeight = initialPreHeight + deltaY;
      const newNextHeight = initialNextHeight - deltaY;

      let minPreHeight = 0;
      let minNextHeight = 0;
      if (preChild.min.endsWith("%")) {
        minPreHeight =
          this._container.clientHeight * parseCSSMinValue(preChild.min);
        minNextHeight =
          this._container.clientHeight * parseCSSMinValue(nextChild.min);
      } else if (preChild.min.endsWith("px")) {
        minPreHeight = parseCSSMinValue(preChild.min);
        minNextHeight = parseCSSMinValue(nextChild.min);
      }

      if (newPreHeight <= minPreHeight || newNextHeight <= minNextHeight)
        return;

      preChild.size = newPreHeight + "px";
      nextChild.size = newNextHeight + "px";

      this._dispatchResizeEvent(EaSplitterPanelResizeEvent);
    };

    const mouseupHandler = () => {
      controller.abort();
      this._dispatchResizeEvent(EaSplitterPanelResizeEndEvent);
    };

    window.addEventListener("mousemove", mousemoveHandler, {
      signal: controller.signal,
    });
    window.addEventListener("mouseup", mouseupHandler, {
      signal: controller.signal,
    });
  };

  /** 渲染模板 */
  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </div>
    `;
  }

  /**
   * 处理 mousedown 事件 - 统一事件委托
   * @param e 鼠标事件
   */
  @listen("mousedown")
  private _handleMouseDown(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const bar = target.closest("ea-splitter-bar") as HTMLElement;
    if (!bar) return;

    e.preventDefault();
    e.stopPropagation();

    const index = Number(bar.getAttribute("data-index"));
    if (isNaN(index)) return;

    if (this.layout === "horizontal") {
      this._handleHorizontalResize(e, index);
    } else {
      this._handleVerticalResize(e, index);
    }
  }

  $mount(): void {
    queueMicrotask(() => {
      const panels = [...this.children].filter(
        child => child.tagName === "EA-SPLITTER-PANEL"
      ) as EaSplitterPanel[];

      panels.forEach((panel, index) => {
        panel.setAttribute("layout", this.layout);
        panel.setAttribute("data-panel-index", String(index));

        if (index < panels.length - 1) {
          const splitterBar = document.createElement("ea-splitter-bar");
          this.insertBefore(splitterBar, panel.nextSibling);

          const barIndex = [...this.children].indexOf(splitterBar);
          splitterBar.setAttribute("data-index", String(barIndex));
          splitterBar.setAttribute("layout", this.layout);
        }
      });
    });
  }
}
