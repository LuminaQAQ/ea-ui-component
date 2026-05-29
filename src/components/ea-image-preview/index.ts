import { EaOverlay } from "@/common/ea-overlay";
import { EaOverlayClosedEvent } from "@/common/ea-overlay/events/EaOverlayClosedEvent";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { property } from "@decorator/property";
import { createBEM } from "@utils/bem";
import { html } from "@utils/html";
import "../ea-image/components/ea-image/index";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-image-preview" as const;
const bem = createBEM(TAG_NAME);

export type ImagePreviewStatus = "loading" | "success" | "error";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaImagePreview extends EaOverlay {
  // ==================== DOM 元素引用 ====================

  @query(".ea-overlay")
  private _container!: HTMLElement;

  @query(".ea-overlay__content")
  private _overlayContent!: HTMLElement;

  @query(".ea-overlay__mask")
  private _overlayMask!: HTMLElement;

  @query(".ea-image-preview__header")
  private _header!: HTMLElement;

  @query(".ea-image-preview__main")
  private _main!: HTMLElement;

  @query(".ea-image-preview__footer")
  private _footer!: HTMLElement;

  @query(".ea-image-preview__close-icon")
  private _closeIcon!: HTMLElement;

  @query(".ea-image-preview__progress")
  private _progress!: HTMLElement;

  // ==================== 私有属性 ====================

  private _mainAbortController?: AbortController;
  private _imgAbortController?: AbortController;
  private _clickModalAbortController?: AbortController;
  private _imgMoveAbortController?: AbortController;

  private _states = {
    urlList: [] as string[],
    status: "loading" as ImagePreviewStatus,
    dirtyUpdate: false,
    isUrlListInit: false,
    position: { x: 0, y: 0 },
  };

  // ==================== 属性定义 ====================

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

  // ==================== @property 属性（JS-only） ====================

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

  // ==================== 方法 ====================

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

  private _handleSwitch(action: "prev" | "next"): void {
    if (action === "prev") {
      this.index--;
    } else if (action === "next") {
      this.index++;
    }
  }

  private _handleZoom(action: "in" | "out"): void {
    if (action === "in") {
      this.scale = Number((this.scale * this.zoomRate).toFixed(3));
    } else if (action === "out") {
      this.scale = Number((this.scale / this.zoomRate).toFixed(3));
    }
  }

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

    this.emit("rotate", {
      detail: {
        oldVal: currentRotate,
        rotate,
      },
    });
  }

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

  private _onImgMoveEvent(startE: MouseEvent): void {
    startE.preventDefault();

    this._imgMoveAbortController?.abort();
    this._imgMoveAbortController = new AbortController();

    const startX = startE.clientX;
    const startY = startE.clientY;

    const originX = this._states.position.x;
    const originY = this._states.position.y;

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

      this._imgMoveAbortController?.abort();
    };

    window.addEventListener("mousemove", moveEvent, {
      signal: this._imgMoveAbortController.signal,
    });
    window.addEventListener("mouseup", mouseupEvent, {
      signal: this._imgMoveAbortController.signal,
    });
  }

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

      const imgStr = `<ea-image class="ea-image-preview__img" src="${src}" fit="contain"><slot name="viewer-error" slot="error"></slot></ea-image>`;
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

        this.emit("error");
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
        this.emit("switch", {
          detail: {
            index,
            url: src,
            imgTarget: img,
          },
        });
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
      `0`
    );
    this._overlayContent?.style.setProperty(
      "--ea-image-preview-img-move-y",
      `0`
    );
  }

  // ==================== 事件处理 ====================

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

  // ==================== 生命周期 ====================

  $mount(): void {
    super.$mount?.();

    this._mainAbortController?.abort();
    this._mainAbortController = new AbortController();

    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    super.$beforeUnmount?.();

    this._mainAbortController?.abort();
    this._imgAbortController?.abort();
    this._clickModalAbortController?.abort();
    this._imgMoveAbortController?.abort();
  }
}
