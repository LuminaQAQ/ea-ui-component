import { EaOverlay } from "@/common/ea-overlay";
import { EaOverlayClosedEvent } from "@/common/ea-overlay/events/EaOverlayClosedEvent";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { createBEM } from "@utils/bem";
import { html } from "@utils/html";
import "../ea-image/components/ea-image/index";
import "@/components/ea-icon/index";
import { EaImagePreviewErrorEvent } from "./events/EaImagePreviewErrorEvent";
import { EaImagePreviewSwitchEvent } from "./events/EaImagePreviewSwitchEvent";
import { EaImagePreviewRotateEvent } from "./events/EaImagePreviewRotateEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-image-preview" as const;
const bem = createBEM(TAG_NAME);

export type ImagePreviewStatus = "loading" | "success" | "error";

/**
 * @summary 图片预览组件，用于全屏预览图片，支持缩放、旋转、切换和拖拽移动。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-overlay
 * @dependency ea-icon
 * @dependency ea-image
 *
 * @slot progress - 自定义进度内容，支持 data-active 和 data-total 属性。
 * @slot toolbar - 自定义工具栏内容。
 * @slot viewer-error - 图片加载失败时的错误提示内容。
 *
 * @event ea-preview-error - 图片加载失败时触发。
 * @event ea-switch - 图片切换时触发，detail: `{ index: number, url: string, imgTarget: HTMLElement }`。
 * @event ea-rotate - 图片旋转时触发，detail: `{ oldVal: number, rotate: number }`。
 *
 * @csspart header - 头部区域。
 * @csspart main - 主体区域。
 * @csspart footer - 底部区域。
 * @csspart progress - 进度区域。
 * @csspart toolbar - 工具栏区域。
 * @csspart icon - 图标元素。
 * @csspart close-icon - 关闭图标。
 * @csspart prev-icon - 上一张图标。
 * @csspart next-icon - 下一张图标。
 * @csspart zoom-out-icon - 缩小图标。
 * @csspart zoom-in-icon - 放大图标。
 * @csspart rotate-left-icon - 逆时针旋转图标。
 * @csspart rotate-right-icon - 顺时针旋转图标。
 *
 * @cssproperty --ea-image-preview-img-move-x - 图片水平偏移量。
 * @cssproperty --ea-image-preview-img-move-y - 图片垂直偏移量。
 * @cssproperty --ea-image-preview-tool-size - 工具图标尺寸。
 * @cssproperty --ea-image-preview-tool-color - 工具图标颜色。
 * @cssproperty --ea-image-preview-tool-offset-x - 工具栏水平偏移量。
 * @cssproperty --ea-image-preview-tool-offset-y - 工具栏垂直偏移量。
 * @cssproperty --ea-image-preview-scale - 图片缩放比例。
 * @cssproperty --ea-image-preview-rotate - 图片旋转角度。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaImagePreview extends EaOverlay {
  private static _idCounter = 0;

  @query(".ea-image-preview__progress")
  private _progress!: HTMLElement;

  private _imgAbortController?: AbortController;
  private _imgMoveAbortController?: AbortController;

  private _states = {
    urlList: [] as string[],
    status: "loading" as ImagePreviewStatus,
    dirtyUpdate: false,
    isUrlListInit: false,
    position: { x: 0, y: 0 },
  };

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaImagePreview, newVal: number) {
      this.index = newVal;
    },
  })
  initialIndex: number = 0;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaImagePreview, newVal: number, oldVal: number) {
      if (this._states.dirtyUpdate) return (this._states.dirtyUpdate = false);

      if (this.infinite) {
        if (!this.urlList.length) return;

        const length = this.urlList.length - 1;

        if (newVal > length) return (this.index = 0);
        else if (newVal < 0) return (this.index = length);
      } else if (newVal < 0 || newVal > this.urlList.length - 1) {
        this._states.dirtyUpdate = true;
        return (this.index = oldVal);
      }

      this._renderImage(newVal);
    },
  })
  index: number = 0;

  @attribute({
    type: Boolean,
    default: true,
  })
  infinite: boolean = true;

  @attribute({
    type: Number,
    default: 1,
  })
  zoom: number = 1;

  @attribute({
    type: Number,
    default: 1.2,
  })
  zoomRate: number = 1.2;

  @attribute({
    type: Number,
    default: 1,
    observer(this: EaImagePreview, newVal: number, oldVal: number) {
      if (newVal < this.minScale || newVal > this.maxScale)
        return (this.scale = oldVal);

      this._overlayContent?.style.setProperty(
        "--ea-image-preview-scale",
        String(newVal)
      );
    },
  })
  scale: number = 1;

  @attribute({
    type: Number,
    default: 0.2,
  })
  minScale: number = 0.2;

  @attribute({
    type: Number,
    default: 7,
  })
  maxScale: number = 7;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaImagePreview) {
      this.updateContainerClasslist();
    },
  })
  showProgress: boolean = false;

  @property({
    type: Array,
    default: [],
    observer(this: EaImagePreview, newVal: string[]) {
      this._states.isUrlListInit = false;

      this._states.urlList = newVal;
      this.index = this.initialIndex;

      this._states.isUrlListInit = true;
    },
  })
  urlList: string[] = [];

  get status(): ImagePreviewStatus {
    return this._states.status;
  }

  set status(val: ImagePreviewStatus) {
    this._states.status = val;
  }

  updateContainerClasslist(): string {
    const parentClassName = super.updateContainerClasslist();

    const className = `${parentClassName} ${bem(
      { [this._states.status]: true },
      { "show-progress": this.showProgress }
    )}`;

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    const tpl = document.createElement("template");
    tpl.innerHTML = super.html();

    const contentContainer = tpl.content.querySelector(".ea-overlay__content")!;

    const toolbarHTML = `
      <header class="${bem.e("header")}" part="header">
        <ea-icon class="${bem.e("icon")} ${bem.e("close-icon")}" name="xmark" part="icon close-icon"></ea-icon>
      </header>
      <main class="${bem.e("main")}" part="main">
        <ea-icon class="${bem.e("icon")} ${bem.e("prev-icon")}" data-action="switch-prev" name="angle-left" part="icon prev-icon"></ea-icon>
        <ea-icon class="${bem.e("icon")} ${bem.e("next-icon")}" data-action="switch-next" name="angle-right" part="icon next-icon"></ea-icon>
      </main>
      <footer class="${bem.e("footer")}" part="footer">
        <section class="${bem.e("progress")}" part="progress">
          <slot name="progress"></slot>
        </section>
        <section class="${bem.e("toolbar")}" part="toolbar">
          <slot name="toolbar">
            <ea-icon class="${bem.e("icon")} ${bem.e("zoom-out-icon")}" data-action="zoom-out" name="magnifying-glass-minus" part="icon zoom-out-icon"></ea-icon>
            <ea-icon class="${bem.e("icon")} ${bem.e("zoom-in-icon")}" data-action="zoom-in" name="magnifying-glass-plus" part="icon zoom-in-icon"></ea-icon>
            <ea-icon class="${bem.e("icon")} ${bem.e("rotate-left-icon")}" data-action="rotate-anticlockwise" name="rotate-left" part="icon rotate-left-icon"></ea-icon>
            <ea-icon class="${bem.e("icon")} ${bem.e("rotate-right-icon")}" data-action="rotate-clockwise" name="rotate-right" part="icon rotate-right-icon"></ea-icon>
          </slot>
        </section>
      </footer>
    `;

    contentContainer.insertAdjacentHTML("beforebegin", html(toolbarHTML));

    return tpl.innerHTML;
  }

  /** 切换图片到上一张或下一张 */
  private _handleSwitch(action: "prev" | "next"): void {
    if (action === "prev") {
      this.index--;
    } else if (action === "next") {
      this.index++;
    }
  }

  /** 缩放图片 */
  private _handleZoom(action: "in" | "out"): void {
    if (action === "in") {
      this.scale = Number((this.scale * this.zoomRate).toFixed(3));
    } else if (action === "out") {
      this.scale = Number((this.scale / this.zoomRate).toFixed(3));
    }
  }

  /** 旋转图片 */
  private _handleRotate(action: "left" | "right" | "reset"): void {
    const currentRotate = Number(
      this._overlayContent?.style
        .getPropertyValue("--ea-image-preview-rotate")
        .split("deg")[0] || 0
    );
    let rotate = 0;

    if (action === "left") {
      rotate = currentRotate - 90;
    } else if (action === "right") {
      rotate = currentRotate + 90;
    }

    this._overlayContent?.style.setProperty(
      "--ea-image-preview-rotate",
      rotate + "deg"
    );

    this.dispatchEvent(
      new EaImagePreviewRotateEvent({
        oldVal: currentRotate,
        rotate,
      })
    );
  }

  /** 更新进度显示 */
  private _handleProgress(active: number, total: number): void {
    const progress = this.querySelector("[slot='progress']");

    const renderContent = (
      activeEls: NodeListOf<Element>,
      totalEls: NodeListOf<Element>
    ) => {
      activeEls.forEach(item => (item.textContent = String(active)));
      totalEls.forEach(item => (item.textContent = String(total)));
    };

    if (progress instanceof HTMLSlotElement) {
      const assignedNodes = progress.assignedNodes({ flatten: true });
      const elements = assignedNodes.filter(
        (node): node is Element => node.nodeType === Node.ELEMENT_NODE
      );
      elements.forEach(el => {
        const activeEls = el.querySelectorAll("[data-active]");
        const totalEls = el.querySelectorAll("[data-total]");
        renderContent(activeEls, totalEls);
      });
    } else if (progress) {
      const activeEls = progress.querySelectorAll("[data-active]");
      const totalEls = progress.querySelectorAll("[data-total]");
      renderContent(activeEls, totalEls);
    } else {
      const progressEl =
        this._progress ||
        this.shadowRoot?.querySelector(".ea-image-preview__progress");
      if (progressEl) {
        progressEl.textContent = `${active} / ${total}`;
      }
    }
  }

  /** 处理图片拖拽移动 */
  private _onImgMoveEvent(startE: MouseEvent): void {
    startE.preventDefault();

    this._imgMoveAbortController?.abort();
    this._imgMoveAbortController = new AbortController();

    const startX = startE.clientX;
    const startY = startE.clientY;

    const originX = this._states.position.x;
    const originY = this._states.position.y;

    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";

    const moveEvent = (e: MouseEvent) => {
      e.preventDefault();

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const newX = originX + deltaX;
      const newY = originY + deltaY;

      this._overlayContent?.style.setProperty(
        "--ea-image-preview-img-move-x",
        `${newX}px`
      );
      this._overlayContent?.style.setProperty(
        "--ea-image-preview-img-move-y",
        `${newY}px`
      );
    };

    const mouseupEvent = (e: MouseEvent) => {
      e.preventDefault();

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      this._states.position.x = originX + deltaX;
      this._states.position.y = originY + deltaY;

      document.body.style.cursor = "";
      document.body.style.userSelect = "";

      this._imgMoveAbortController?.abort();
    };

    window.addEventListener("mousemove", moveEvent, {
      signal: this._imgMoveAbortController.signal,
    });
    window.addEventListener("mouseup", mouseupEvent, {
      signal: this._imgMoveAbortController.signal,
    });
  }

  /** 渲染指定索引的图片 */
  private _renderImage(index: number): void {
    const src = this.urlList[index];
    if (!this._overlayContent) return;

    const prevImg = this._overlayContent.querySelector(
      ".ea-image-preview__img"
    );
    if (prevImg) {
      prevImg.remove();
    }

    if (src) {
      this._imgAbortController?.abort();
      this._imgAbortController = new AbortController();

      const viewerErrorSlot = this.querySelector('[slot="viewer-error"]');
      const errorSlotHTML = viewerErrorSlot
        ? '<slot name="viewer-error" slot="error"></slot>'
        : "";
      const imgStr = `<ea-image class="ea-image-preview__img" src="${src}" fit="contain">${errorSlotHTML}</ea-image>`;
      this._overlayContent.insertAdjacentHTML("afterbegin", html(imgStr));
      const img = this._overlayContent.querySelector(
        ".ea-image-preview__img"
      ) as HTMLElement;

      const onImgErrorEvent = () => {
        this._states.status = "error";
        this._container?.classList.remove(
          "ea-image-preview--success",
          "ea-image-preview--loading"
        );
        this._container?.classList.add("ea-image-preview--error");

        this.dispatchEvent(new EaImagePreviewErrorEvent());
        this._imgAbortController?.abort();
      };

      const onImageLoadEvent = () => {
        this._states.status = "success";
        this._container?.classList.remove(
          "ea-image-preview--error",
          "ea-image-preview--loading"
        );
        this._container?.classList.add("ea-image-preview--success");
        this._imgAbortController?.abort();
      };

      this._handleProgress(index + 1, this.urlList.length);

      img.addEventListener("error", onImgErrorEvent, {
        once: true,
        signal: this._imgAbortController.signal,
      });
      img.addEventListener("load", onImageLoadEvent, {
        once: true,
        signal: this._imgAbortController.signal,
      });

      if (this.visible && this._states.isUrlListInit) {
        this.dispatchEvent(
          new EaImagePreviewSwitchEvent({
            index,
            url: src,
            imgTarget: img,
          })
        );
      }
    }
  }

  setActiveItem(index: number): void {
    this.index = index;
  }

  reset(): void {
    this.index = this.initialIndex;
    this.scale = 1;
    this._handleRotate("reset");

    this._states.position = {
      x: 0,
      y: 0,
    };

    this._overlayContent?.style.setProperty(
      "--ea-image-preview-img-move-x",
      `0px`
    );
    this._overlayContent?.style.setProperty(
      "--ea-image-preview-img-move-y",
      `0px`
    );
  }

  @listen("click", ".ea-image-preview__close-icon")
  private _handleCloseIconClick(): void {
    this.hide();
    this.visible = false;
  }

  private static readonly _actionMap: Record<
    string,
    (self: EaImagePreview) => void
  > = {
    "switch-prev": self => self._handleSwitch("prev"),
    "switch-next": self => self._handleSwitch("next"),
    "zoom-out": self => self._handleZoom("out"),
    "zoom-in": self => self._handleZoom("in"),
    "rotate-anticlockwise": self => self._handleRotate("left"),
    "rotate-clockwise": self => self._handleRotate("right"),
  };

  @listen("click", ".ea-image-preview__main")
  private _handleMainClick(e: MouseEvent): void {
    const target = (e.target as Element).closest("[data-action]");
    if (!target) return;

    const action = target.getAttribute("data-action");
    EaImagePreview._actionMap[action as string]?.(this);
  }

  @listen("click", ".ea-image-preview__toolbar")
  private _handleToolbarClick(e: MouseEvent): void {
    const target = (e.target as Element).closest("[data-action]");
    if (!target) return;

    const action = target.getAttribute("data-action");
    EaImagePreview._actionMap[action as string]?.(this);
  }

  @listen("wheel", ".ea-overlay")
  private _handleWheel(e: WheelEvent): void {
    e.preventDefault();

    if (e.deltaY > 0) {
      this._handleZoom("out");
    } else {
      this._handleZoom("in");
    }
  }

  @listen("mousedown", ".ea-overlay__content")
  private _handleImgMouseDown(e: MouseEvent): void {
    this._onImgMoveEvent(e);
  }

  @listen("ea-closed")
  private _handleClosed(e: EaOverlayClosedEvent): void {
    if (e.target !== this) return;
    this.reset();
  }

  $mount(): void {
    super.$mount?.();

    try {
      this.setAttribute("role", "dialog");
    } catch {
      this.role = "dialog";
    }

    this.setAttribute("aria-modal", "true");
    this.setAttribute("aria-label", "Image Preview");

    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    super.$beforeUnmount?.();

    this._imgAbortController?.abort();
    this._imgMoveAbortController?.abort();
  }
}
