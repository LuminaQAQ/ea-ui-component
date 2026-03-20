import { EaOverlay } from "@/common/ea-overlay";
import EaUtils from "@/utils/Utils.js";
import "../ea-image/components/ea-image/index.js";
import stylesheet from "./index.scss?inline";

export class EaImagePreview extends EaOverlay {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #content;
  /** @type {HTMLElement} */
  #header;
  /** @type {HTMLElement} */
  #main;
  /** @type {HTMLElement} */
  #footer;
  /** @type {HTMLElement} */
  #imgContent;
  /** @type {HTMLElement} */
  #mask;
  /** @type {HTMLElement} */
  #closeIcon;
  /** @type {HTMLElement} */
  #prevIcon;
  /** @type {HTMLElement} */
  #nextIcon;
  /** @type {HTMLElement} */
  #progress;
  /** @type {HTMLElement} */
  #zoomInIcon;
  /** @type {HTMLElement} */
  #zoomOutIcon;
  /** @type {HTMLElement} */
  #rotateLeftIcon;
  /** @type {HTMLElement} */
  #rotateRightIcon;

  /** @type {AbortController} */

  #AbortControllerStates = {
    /** @type {AbortController | null} */
    main: null,
    /** @type {AbortController | null} */
    img: null,
    /** @type {AbortController | null} */
    clickModal: null,
    /** @type {AbortController | null} */
    imgMove: null,
    /** @type {AbortController | null} */
    toolbar: null,
    /** @type {AbortController | null} */
    switchPrev: null,
    /** @type {AbortController | null} */
    switchNext: null,
    /** @type {AbortController | null} */
    zoomOut: null,
    /** @type {AbortController | null} */
    zoomIn: null,
    /** @type {AbortController | null} */
    rotateLeft: null,
    /** @type {AbortController | null} */
    rotateRight: null,
  };

  #states = {
    urlList: [],
    /** @type {"loading" | "success" | "error"} */
    status: "loading",

    dirtyUpdate: false,

    isUrlListInit: false,

    position: {
      x: 0,
      y: 0,
    },
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,

      "visible",
      "index",
      "initial-index",
      "infinite",
      "zoom-rate",
      "scale",
      "min-scale",
      "max-scale",
      "close-on-press-escape",
      "hide-on-click-modal",

      "show-progress",

      "append-to-body",
    ];
  }

  state = this.properties({
    visible: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.status = newVal;

        if (newVal && this.urlList.length > 0) {
          const currentImg = this.#imgContent.querySelector(
            ".ea-image-preview__img"
          );
          if (!currentImg) {
            this.#renderImage(this.index);
          }
        }
      },
    },
    "initial-index": {
      type: Number,
      default: 0,
      observer: newVal => {
        this.index = newVal;
      },
    },
    index: {
      type: Number,
      default: () => this["initial-index"],
      observer: (newVal, oldVal) => {
        if (this.#states.dirtyUpdate) return (this.#states.dirtyUpdate = false);

        if (this.infinite) {
          if (!this.urlList.length) return;

          const length = this.urlList.length - 1;

          if (newVal > length) return (this.index = 0);
          else if (newVal < 0) return (this.index = length);
        } else if (newVal < 0 || newVal > this.urlList.length - 1) {
          this.#states.dirtyUpdate = true;
          return (this.index = oldVal);
        }

        this.#renderImage(newVal);
      },
    },
    infinite: {
      type: Boolean,
      default: true,
      observer: () => {},
    },
    "append-to-body": {
      type: Boolean,
      default: false,
      observer: () => {},
    },
    zoom: {
      type: Number,
      default: 1,
      observer: () => {},
    },
    "zoom-rate": {
      type: Number,
      default: 1.2,
      observer: () => {},
    },
    scale: {
      type: Number,
      default: 1,
      observer: (newVal, oldVal) => {
        if (newVal < this["min-scale"] || newVal > this["max-scale"])
          return (this.scale = oldVal);

        this.#imgContent.style.setProperty("--ea-image-preview-scale", newVal);
      },
    },
    "min-scale": {
      type: Number,
      default: 0.2,
      observer: () => {},
    },
    "max-scale": {
      type: Number,
      default: 7,
      observer: () => {},
    },
    "close-on-press-escape": {
      type: Boolean,
      default: true,
      observer: () => {},
    },
    "show-progress": {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    "hide-on-click-modal": {
      type: Boolean,
      default: false,
      observer: newVal => {
        const onModalClickEvent = e => {
          const img = this.#imgContent.querySelector(".ea-image-preview__img");

          if (
            !img.contains(e.target) &&
            !this.#header.contains(e.target) &&
            !this.#main.contains(e.target) &&
            !this.#footer.contains(e.target)
          ) {
            this.hide();
            this.visible = false;
          }
        };

        this.#AbortControllerStates.clickModal?.abort();

        if (newVal) {
          this.#AbortControllerStates.clickModal = new AbortController();
          this.#container.addEventListener("click", onModalClickEvent, {
            signal: this.#AbortControllerStates.clickModal.signal,
          });
        }
      },
    },
  });

  propState = this.properties({
    urlList: {
      props: true,
      type: Array,
      default: [],
      /** @param {String[]} newVal */
      observer: newVal => {
        this.#states.isUrlListInit = false;

        this.#states.urlList = newVal;
        this.index = this["initial-index"];

        this.#states.isUrlListInit = true;
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = `${super.updateContainerClasslist()} ${this.computedClasslist(
      "ea-image-preview",
      {
        ["--" + this.#states.status]: this.#states.status,
      },
      {
        "show-progress": this["show-progress"],
      }
    )}`;

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.#container = this.shadowRoot.querySelector(".ea-overlay");

    this.#container.innerHTML =
      this.#container.innerHTML +
      `
      <header class="ea-image-preview__header" part="header">
        <ea-icon class="ea-image-preview__icon close-icon" name="xmark" part="icon close-icon"></ea-icon>
      </header>
      <main class="ea-image-preview__main" part="main">
        <ea-icon class="ea-image-preview__icon prev-icon" name="angle-left" part="icon prev-icon"></ea-icon>
        <ea-icon class="ea-image-preview__icon next-icon" name="angle-right" part="icon next-icon"></ea-icon>
      </main>
      <footer class="ea-image-preview__footer" part="footer">
        <section class="ea-image-preview__progress" part="progress">
          <slot name="progress"></slot>
        </section>
        <section class="ea-image-preview__toolbar" part="toolbar">
          <slot name="toolbar">
            <ea-icon class="ea-image-preview__icon zoom-out-icon" name="magnifying-glass-minus" part="icon zoom-out-icon"></ea-icon>
            <ea-icon class="ea-image-preview__icon zoom-in-icon" name="magnifying-glass-plus" part="icon zoom-in-icon"></ea-icon>
            <ea-icon class="ea-image-preview__icon rotate-left-icon" name="rotate-left" part="icon rotate-left-icon"></ea-icon>
            <ea-icon class="ea-image-preview__icon rotate-right-icon" name="rotate-right" part="icon rotate-right-icon"></ea-icon>
          </slot>
        </section>
      </footer>
    `;

    this.#content = this.shadowRoot.querySelector(".ea-overlay__content");
    this.#mask = this.shadowRoot.querySelector(".ea-overlay__mask");
    this.#imgContent = this.shadowRoot.querySelector(".ea-overlay__content");
    this.#closeIcon = this.shadowRoot.querySelector(".close-icon");
    this.#prevIcon = this.shadowRoot.querySelector(".prev-icon");
    this.#nextIcon = this.shadowRoot.querySelector(".next-icon");
    this.#zoomInIcon = this.shadowRoot.querySelector(".zoom-in-icon");
    this.#zoomOutIcon = this.shadowRoot.querySelector(".zoom-out-icon");
    this.#rotateLeftIcon = this.shadowRoot.querySelector(".rotate-left-icon");
    this.#rotateRightIcon = this.shadowRoot.querySelector(".rotate-right-icon");
    this.#progress = this.shadowRoot.querySelector(
      ".ea-image-preview__progress slot[name='progress']"
    );

    this.#header = this.shadowRoot.querySelector(".ea-image-preview__header");
    this.#main = this.shadowRoot.querySelector(".ea-image-preview__main");
    this.#footer = this.shadowRoot.querySelector(".ea-image-preview__footer");

    this.#handleAppendToTarget();
  }

  /**
   * 处理挂载到目标
   */
  #handleAppendToTarget = () => {
    if (this["append-to-body"]) {
      document.body.appendChild(this);
    }
  };

  /**
   * 处理切换
   * @param {'prev' | 'next'} action
   */
  #handleSwitch = action => {
    if (action === "prev") {
      this.index--;
    } else if (action === "next") {
      this.index++;
    }
  };

  /**
   * 处理缩放
   * @param {'in' | 'out'} action
   */
  #handleZoom = action => {
    if (action === "in") {
      this.scale = (this.scale * this["zoom-rate"]).toFixed(3);
    } else if (action === "out") {
      this.scale = (this.scale / this["zoom-rate"]).toFixed(3);
    }
  };

  /**
   * 处理旋转
   * @param {'left' | 'right' | 'reset'} action
   */
  #handleRotate = action => {
    const currentRotate = Number(
      this.#imgContent.style
        .getPropertyValue("--ea-image-preview-rotate")
        .split("deg")[0] || 0
    );
    let rotate = 0;

    if (action === "left") {
      rotate = currentRotate - 90;
    } else if (action === "right") {
      rotate = currentRotate + 90;
    }

    this.#imgContent.style.setProperty(
      "--ea-image-preview-rotate",
      rotate + "deg"
    );

    this.emit("rotate", {
      detail: {
        oldVal: currentRotate,
        rotate,
      },
    });
  };

  /**
   * 处理进度
   * @param {Number} active
   * @param {Number} total
   * @returns
   */
  #handleProgress = (active, total) => {
    const progress = this.querySelector("[slot='progress']");

    /**
     * 渲染进度内容
     * @param {NodeList} activeEls
     * @param {NodeList} totalEls
     */
    const renderContent = (activeEls, totalEls) => {
      activeEls.forEach(item => (item.textContent = active));
      totalEls.forEach(item => (item.textContent = total));
    };

    if (progress) {
      try {
        const ary = progress.assignedNodes();
        ary.forEach(el => {
          const activeEls = el.querySelectorAll("[data-active]");
          const totalEls = el.querySelectorAll("[data-total]");
          renderContent(activeEls, totalEls);
        });
      } catch {
        const activeEls = progress.querySelectorAll("[data-active]");
        const totalEls = progress.querySelectorAll("[data-total]");
        renderContent(activeEls, totalEls);
      }
    } else {
      this.#progress.textContent = `${active} / ${total}`;
    }
  };

  /**
   * 处理图片移动事件
   * @param {MouseEvent} startE
   */
  #onImgMoveEvent = startE => {
    startE.preventDefault();

    this.#AbortControllerStates.imgMove?.abort();
    this.#AbortControllerStates.imgMove = new AbortController();

    const startX = startE.clientX;
    const startY = startE.clientY;

    const originX = this.#states.position.x;
    const originY = this.#states.position.y;

    /**
     * 处理移动事件
     * @param {MouseEvent} e
     */
    const moveEvent = e => {
      e.preventDefault();

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const newX = originX + deltaX;
      const newY = originY + deltaY;

      this.#imgContent.style.setProperty(
        "--ea-image-preview-img-move-x",
        `${newX}px`
      );
      this.#imgContent.style.setProperty(
        "--ea-image-preview-img-move-y",
        `${newY}px`
      );
    };

    /**
     * 处理鼠标抬起事件
     * @param {MouseEvent} e
     */
    const mouseupEvent = e => {
      e.preventDefault();

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      this.#states.position.x = originX + deltaX;
      this.#states.position.y = originY + deltaY;

      this.#AbortControllerStates.imgMove?.abort();
    };

    window.addEventListener("mousemove", moveEvent, {
      signal: this.#AbortControllerStates.imgMove.signal,
    });

    window.addEventListener("mouseup", mouseupEvent, {
      signal: this.#AbortControllerStates.imgMove.signal,
    });
  };

  /**
   * 初始化工具栏的事件。
   * 若用户传入了自定义工具，则优先使用用户元素，否则使用内置元素
   */
  #initToobarEvent = () => {
    /** @type {HTMLSlotElement} */
    let toolbarSlot = this.shadowRoot.querySelector("slot[name='toolbar']");
    const isImageChild = this.closest(".ea-image-preview");
    if (isImageChild) {
      toolbarSlot = isImageChild.querySelector("slot[name='toolbar']");
    }

    for (const key in this.#AbortControllerStates) {
      this.#AbortControllerStates[key]?.abort();
      this.#AbortControllerStates[key] = new AbortController();
    }

    const abortControllers = {
      "switch-prev": this.#AbortControllerStates.switchPrev,
      "switch-next": this.#AbortControllerStates.switchNext,
      "zoom-out": this.#AbortControllerStates.zoomOut,
      "zoom-in": this.#AbortControllerStates.zoomIn,
      "rotate-anticlockwise": this.#AbortControllerStates.rotateLeft,
      "rotate-clockwise": this.#AbortControllerStates.rotateRight,
    };

    const els = {
      "switch-prev": {
        el: null,
        callback: () => {
          this.#handleSwitch("prev");
        },
      },
      "switch-next": {
        el: null,
        callback: () => {
          this.#handleSwitch("next");
        },
      },
      "zoom-out": {
        el: this.#zoomOutIcon,
        callback: () => {
          this.#handleZoom("out");
        },
      },
      "zoom-in": {
        el: this.#zoomInIcon,
        callback: () => {
          this.#handleZoom("in");
        },
      },
      "rotate-anticlockwise": {
        el: this.#rotateLeftIcon,
        callback: () => {
          this.#handleRotate("left");
        },
      },
      "rotate-clockwise": {
        el: this.#rotateRightIcon,
        callback: () => {
          this.#handleRotate("right");
        },
      },
    };

    /**
     * 绑定工具栏事件
     */
    const bindToolbarEvents = () => {
      // 重置内置图标显示状态
      Object.values(els).forEach(options => {
        if (options.el) {
          options.el.style.display = "";
        }
      });

      const assignedNodes = toolbarSlot.assignedElements();

      // 收集所有自定义工具栏元素
      /** @type {Map<string, HTMLElement>} */
      const customActionEls = new Map();

      assignedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // 查找所有带有 data-action 属性的元素
          const actionEls = node.querySelectorAll("[data-action]");
          actionEls.forEach(el => {
            const action = el.getAttribute("data-action");
            if (action && !customActionEls.has(action)) {
              customActionEls.set(action, el);
            }
          });
        }
      });

      // 绑定事件
      for (const [action, options] of Object.entries(els)) {
        const customEl = customActionEls.get(action);

        if (customEl) {
          // 隐藏对应的内置图标
          if (options.el) {
            options.el.style.display = "none";
          }

          // 绑定自定义元素事件
          customEl.addEventListener("click", options.callback, {
            signal: abortControllers[action].signal,
          });
        } else if (options.el) {
          // 如果没有自定义元素，绑定内置图标事件
          options.el.addEventListener("click", options.callback, {
            signal: abortControllers[action].signal,
          });
        }
      }
    };

    // 监听 slotchange 事件，动态重新绑定
    toolbarSlot.addEventListener("slotchange", bindToolbarEvents, {
      signal: this.#AbortControllerStates.toolbar.signal,
    });

    // 初始绑定 - 使用 setTimeout 确保 slot 内容已分配
    setTimeout(() => bindToolbarEvents(), 0);
  };

  /**
   * 关闭 Preview
   */
  #handlePreviewClose = () => {
    this.hide();
    this.visible = false;
  };

  /**
   * 设置当前项
   * @param {Number} index
   */
  setActiveItem = index => {
    this.index = index;
  };

  /**
   * 渲染指定索引的图片
   * @param {number} index - 图片索引
   */
  #renderImage = index => {
    const src = this.urlList[index];
    this.#imgContent.innerHTML = "";

    if (src) {
      this.#AbortControllerStates.img?.abort();
      this.#AbortControllerStates.img = new AbortController();

      this.#imgContent.innerHTML = EaUtils.EaElement.h(
        "ea-image",
        "ea-image-preview__img",
        {
          src,
          fit: "contain",
        },
        `
          <slot name="viewer-error" slot="error"></slot>
        `
      );

      const img = this.#imgContent.querySelector(".ea-image-preview__img");

      /**
       * 处理图片加载错误
       */
      const onImgErrorEvent = () => {
        this.#states.status = "error";
        this.classList.remove(
          "ea-image-preview--success",
          "ea-image-preview--loading"
        );
        this.#container.classList.add("ea-image-preview--error");

        this.emit("error");
        this.#AbortControllerStates.img.abort();
      };

      /**
       * 处理图片加载完成
       */
      const onImageLoadEvent = () => {
        this.#states.status = "success";
        this.#container.classList.remove(
          "ea-image-preview--error",
          "ea-image-preview--loading"
        );
        this.#container.classList.add("ea-image-preview--success");
        this.#AbortControllerStates.img.abort();
      };

      this.#handleProgress(index + 1, this.urlList.length);

      img.addEventListener("error", onImgErrorEvent, {
        once: true,
        signal: this.#AbortControllerStates.img.signal,
      });
      img.addEventListener("load", onImageLoadEvent, {
        once: true,
        signal: this.#AbortControllerStates.img.signal,
      });

      if (this.visible && this.#states.isUrlListInit) {
        this.emit("switch", {
          detail: {
            index,
            url: src,
            imgTarget: img,
          },
        });
      }
    }
  };

  /**
   * 重置状态
   */
  reset = () => {
    this.index = this["initial-index"];
    this.scale = 1;
    this.#handleRotate("reset");

    this.#states.position = {
      x: 0,
      y: 0,
    };

    this.#imgContent.style.setProperty("--ea-image-preview-img-move-x", `0`);
    this.#imgContent.style.setProperty("--ea-image-preview-img-move-y", `0`);
  };

  connectedCallback() {
    super.connectedCallback();
    this.assignedStyle(stylesheet);

    this.#AbortControllerStates.main?.abort();
    this.#AbortControllerStates.main = new AbortController();

    // 上一张图片
    const onPrevEvent = () => {
      this.#handleSwitch("prev");
    };
    // 下一张图片
    const onNextEvent = () => {
      this.#handleSwitch("next");
    };
    // 图片缩放
    const onZoomEvent = e => {
      e.preventDefault();

      if (e.deltaY > 0) {
        this.#handleZoom("out");
      } else {
        this.#handleZoom("in");
      }
    };

    this.#initToobarEvent();

    this.#closeIcon.addEventListener("click", this.#handlePreviewClose, {
      signal: this.#AbortControllerStates.main.signal,
    });

    this.#prevIcon.addEventListener("click", onPrevEvent, {
      signal: this.#AbortControllerStates.main.signal,
    });
    this.#nextIcon.addEventListener("click", onNextEvent, {
      signal: this.#AbortControllerStates.main.signal,
    });

    this.#container.addEventListener("wheel", onZoomEvent, {
      signal: this.#AbortControllerStates.main.signal,
      passive: false,
    });

    this.addEventListener("closed", this.reset, {
      signal: this.#AbortControllerStates.main.signal,
    });

    this.#imgContent.addEventListener("mousedown", this.#onImgMoveEvent, {
      signal: this.#AbortControllerStates.main.signal,
    });

    if (this["close-on-press-escape"])
      window.addEventListener(
        "keydown",
        e => {
          if (e.key === "Escape") {
            this.hide();
          }
        },
        { signal: this.#AbortControllerStates.main.signal }
      );
  }

  $beforeUnmounted() {
    for (const controller of Object.values(this.#AbortControllerStates)) {
      controller?.abort();
    }
  }
}

if (!window.customElements.get("ea-image-preview")) {
  window.customElements.define("ea-image-preview", EaImagePreview);
}
