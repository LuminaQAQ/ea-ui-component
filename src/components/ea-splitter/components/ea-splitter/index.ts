import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { EaSplitterPanelResizeStartEvent } from "./events/EaSplitterPanelResizeStartEvent";
import { EaSplitterPanelResizeEvent } from "./events/EaSplitterPanelResizeEvent";
import { EaSplitterPanelResizeEndEvent } from "./events/EaSplitterPanelResizeEndEvent";
import stylesheet from "./index.scss?inline";
import type { EaSplitterPanel, SplitterLayoutType } from "../ea-splitter-panel";
import type { EaSplitterBar } from "../ea-splitter-bar";

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
    const splitterBar = this.children[index] as EaSplitterBar;

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

      this._updateBarA11y(splitterBar, preChild);

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
    const splitterBar = this.children[index] as EaSplitterBar;

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

      this._updateBarA11y(splitterBar, preChild);

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
   * 更新分隔条的 a11y 属性
   * @param bar 分隔条元素
   * @param prePanel 前一个面板元素
   */
  private _updateBarA11y(bar: EaSplitterBar, prePanel: EaSplitterPanel): void {
    const containerSize =
      this.layout === "vertical"
        ? this._container.clientHeight
        : this._container.clientWidth;
    const panelSize = prePanel.getBoundingClientRect()[
      this.layout === "vertical" ? "height" : "width"
    ];
    const percentage = containerSize > 0 ? Math.round((panelSize / containerSize) * 100) : 50;
    bar.valuenow = percentage;
  }

  /**
   * 获取面板的最小尺寸（像素）
   * @param panel 面板元素
   * @param containerSize 容器尺寸
   */
  private _getMinSize(panel: EaSplitterPanel, containerSize: number): number {
    if (!panel.min) return 0;
    if (panel.min.endsWith("%")) {
      return containerSize * parseCSSMinValue(panel.min);
    }
    return parseCSSMinValue(panel.min);
  }

  /**
   * 对指定 bar 相邻的面板执行步进调整
   * @param barIndex bar 的索引
   * @param delta 像素增量（正数增大主面板，负数缩小主面板）
   */
  private _resizeByStep(barIndex: number, delta: number): void {
    const preChild = this.children[barIndex - 1] as EaSplitterPanel;
    const nextChild = this.children[barIndex + 1] as EaSplitterPanel;
    const splitterBar = this.children[barIndex] as EaSplitterBar;
    if (!preChild || !nextChild) return;

    const isVertical = this.layout === "vertical";
    const containerSize = isVertical
      ? this._container.clientHeight
      : this._container.clientWidth;
    const dimension = isVertical ? "height" : "width";

    const preSize = preChild.getBoundingClientRect()[dimension];
    const nextSize = nextChild.getBoundingClientRect()[dimension];

    const newPreSize = preSize + delta;
    const newNextSize = nextSize - delta;

    const minPreSize = this._getMinSize(preChild, containerSize);
    const minNextSize = this._getMinSize(nextChild, containerSize);

    if (newPreSize <= minPreSize || newNextSize <= minNextSize) return;

    this._dispatchResizeEvent(EaSplitterPanelResizeStartEvent);

    preChild.size = newPreSize + "px";
    nextChild.size = newNextSize + "px";

    this._updateBarA11y(splitterBar, preChild);
    this._dispatchResizeEvent(EaSplitterPanelResizeEvent);
    this._dispatchResizeEvent(EaSplitterPanelResizeEndEvent);
  }

  /**
   * 将主面板折叠到最小尺寸或恢复到之前的位置
   * @param barIndex bar 的索引
   */
  private _toggleCollapse(barIndex: number): void {
    const preChild = this.children[barIndex - 1] as EaSplitterPanel;
    const nextChild = this.children[barIndex + 1] as EaSplitterPanel;
    const splitterBar = this.children[barIndex] as EaSplitterBar;
    if (!preChild || !nextChild) return;

    const isVertical = this.layout === "vertical";
    const containerSize = isVertical
      ? this._container.clientHeight
      : this._container.clientWidth;
    const dimension = isVertical ? "height" : "width";
    const minPreSize = this._getMinSize(preChild, containerSize);
    const preSize = preChild.getBoundingClientRect()[dimension];

    if (preSize > minPreSize) {
      (splitterBar as any)._prevPreSize = preSize;
      (splitterBar as any)._prevNextSize = nextChild.getBoundingClientRect()[dimension];

      this._dispatchResizeEvent(EaSplitterPanelResizeStartEvent);
      preChild.size = minPreSize + "px";
      nextChild.size = (containerSize - minPreSize) + "px";
      this._updateBarA11y(splitterBar, preChild);
      this._dispatchResizeEvent(EaSplitterPanelResizeEvent);
      this._dispatchResizeEvent(EaSplitterPanelResizeEndEvent);
    } else {
      const prevPreSize = (splitterBar as any)._prevPreSize;
      const prevNextSize = (splitterBar as any)._prevNextSize;
      if (prevPreSize == null) return;

      this._dispatchResizeEvent(EaSplitterPanelResizeStartEvent);
      preChild.size = prevPreSize + "px";
      nextChild.size = prevNextSize + "px";
      this._updateBarA11y(splitterBar, preChild);
      this._dispatchResizeEvent(EaSplitterPanelResizeEvent);
      this._dispatchResizeEvent(EaSplitterPanelResizeEndEvent);
    }
  }

  /**
   * 将主面板调整到最小或最大尺寸
   * @param barIndex bar 的索引
   * @param toMin 是否调整到最小尺寸
   */
  private _resizeToExtent(barIndex: number, toMin: boolean): void {
    const preChild = this.children[barIndex - 1] as EaSplitterPanel;
    const nextChild = this.children[barIndex + 1] as EaSplitterPanel;
    const splitterBar = this.children[barIndex] as EaSplitterBar;
    if (!preChild || !nextChild) return;

    const isVertical = this.layout === "vertical";
    const containerSize = isVertical
      ? this._container.clientHeight
      : this._container.clientWidth;

    const minPreSize = this._getMinSize(preChild, containerSize);
    const minNextSize = this._getMinSize(nextChild, containerSize);

    this._dispatchResizeEvent(EaSplitterPanelResizeStartEvent);

    if (toMin) {
      preChild.size = minPreSize + "px";
      nextChild.size = (containerSize - minPreSize) + "px";
    } else {
      const maxPreSize = containerSize - minNextSize;
      preChild.size = maxPreSize + "px";
      nextChild.size = minNextSize + "px";
    }

    this._updateBarA11y(splitterBar, preChild);
    this._dispatchResizeEvent(EaSplitterPanelResizeEvent);
    this._dispatchResizeEvent(EaSplitterPanelResizeEndEvent);
  }

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

  /**
   * 处理键盘事件 - 支持方向键调整、Enter 折叠/恢复、Home/End 极值
   * @param e 键盘事件
   */
  @listen("keydown")
  private _handleKeyDown(e: KeyboardEvent): void {
    const target = e.target as HTMLElement;
    const bar = target.closest("ea-splitter-bar") as HTMLElement;
    if (!bar) return;

    const index = Number(bar.getAttribute("data-index"));
    if (isNaN(index)) return;

    const step = (bar as EaSplitterBar).step || 10;
    const isHorizontal = this.layout === "horizontal";

    switch (e.key) {
      case "ArrowLeft":
        if (isHorizontal) {
          e.preventDefault();
          this._resizeByStep(index, -step);
        }
        break;
      case "ArrowRight":
        if (isHorizontal) {
          e.preventDefault();
          this._resizeByStep(index, step);
        }
        break;
      case "ArrowUp":
        if (!isHorizontal) {
          e.preventDefault();
          this._resizeByStep(index, -step);
        }
        break;
      case "ArrowDown":
        if (!isHorizontal) {
          e.preventDefault();
          this._resizeByStep(index, step);
        }
        break;
      case "Enter":
        e.preventDefault();
        this._toggleCollapse(index);
        break;
      case "Home":
        e.preventDefault();
        this._resizeToExtent(index, true);
        break;
      case "End":
        e.preventDefault();
        this._resizeToExtent(index, false);
        break;
    }
  }

  private _panelIdCounter: number = 0;

  $mount(): void {
    queueMicrotask(() => {
      const panels = [...this.children].filter(
        child => child.tagName === "EA-SPLITTER-PANEL"
      ) as EaSplitterPanel[];

      panels.forEach((panel, index) => {
        panel.setAttribute("layout", this.layout);
        panel.setAttribute("data-panel-index", String(index));

        if (!panel.id) {
          panel.id = `${TAG_NAME}-panel-${this._panelIdCounter++}`;
        }

        if (index < panels.length - 1) {
          const splitterBar = document.createElement("ea-splitter-bar") as EaSplitterBar;
          this.insertBefore(splitterBar, panel.nextSibling);

          const barIndex = [...this.children].indexOf(splitterBar);
          splitterBar.setAttribute("data-index", String(barIndex));
          splitterBar.setAttribute("layout", this.layout);
          splitterBar.setAttribute("aria-controls", panel.id);

          this._updateBarA11y(splitterBar, panel);
        }
      });
    });
  }
}
