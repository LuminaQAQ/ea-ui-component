import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { Enum } from "@/utils/Enum";
import { EaTabClickEvent } from "./events/EaTabClickEvent";
import { EaTabRemoveEvent } from "./events/EaTabRemoveEvent";
import { EaTabsChangeEvent } from "./events/EaTabsChangeEvent";

import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-tabs" as const;
const bem = createBEM(TAG_NAME);

// ==================== 类型定义 ====================

export type TabsType = "" | "card" | "border-card";
export type TabPosition = "top" | "bottom" | "left" | "right";

// ==================== 组件类 ====================

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTabs extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-tabs")
  private _container!: HTMLElement;

  @query(".ea-tabs__prev")
  private _prevBtn!: HTMLElement;

  @query(".ea-tabs__next")
  private _nextBtn!: HTMLElement;

  @query(".ea-tabs__nav")
  private _nav!: HTMLElement;

  @query('slot[name="nav"]')
  private _navSlot!: HTMLSlotElement;

  @query(".ea-tabs__line")
  private _line!: HTMLElement;

  @query(".ea-tabs__indicator")
  private _indicator!: HTMLElement;

  @query(".ea-tabs__content")
  private _content!: HTMLElement;

  @query(".ea-tabs__content > slot")
  private _defaultSlot!: HTMLSlotElement;

  /** @type {ResizeObserver} */
  private _resizeObserver?: ResizeObserver;

  /** @type {number} */
  private _slotChangeTimer?: number;

  /** @type {number} */
  private _resizeTimer?: number;

  // ==================== 属性定义 ====================

  @attribute({
    type: Enum(["", "card", "border-card"]),
    default: "",
    observer(this: EaTabs) {
      this.updateContainerClasslist();

      // 设置所有子组件的 type 属性
      this.querySelectorAll("ea-tab").forEach(tab => {
        tab.setAttribute("type", this.type);
      });

      this.querySelectorAll("ea-tab-panel").forEach(panel => {
        panel.setAttribute("type", this.type);
      });
    },
  })
  type: TabsType = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaTabs, newVal: string) {
      this._updateTabsActive(newVal);

      this.dispatchEvent(new EaTabsChangeEvent({ name: newVal }));
    },
  })
  active: string = "";

  @attribute({
    type: Enum(["top", "bottom", "left", "right"]),
    default: "top",
    observer(this: EaTabs, newVal: TabPosition) {
      this.updateContainerClasslist();

      this._updateTabNavigationPosition(newVal);
      this._updateTabsActive(this.active);

      // 设置所有子组件的 tab-position 属性
      this.querySelectorAll("ea-tab").forEach(tab => {
        tab.setAttribute("tab-position", newVal);
      });

      this.querySelectorAll("ea-tab-panel").forEach(panel => {
        panel.setAttribute("tab-position", newVal);
      });
    },
  })
  tabPosition: TabPosition = "top";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTabs, newVal: boolean) {
      this._updateTabEditable(newVal);
    },
  })
  editable: boolean = false;

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    if (!this._nav || !this._container) return "";

    const isOverflow =
      this._nav.scrollWidth > this._nav.clientWidth ||
      this._nav.scrollHeight > this._nav.clientHeight;

    const className = bem(
      { [this.type]: !!this.type, [this.tabPosition]: true },
      { overflow: isOverflow }
    );

    this._container.className = className;

    return className;
  }

  /**
   * 更新指示器位置
   */
  private _updateIndicatorPosition = (
    tabEl: HTMLElement,
    lineEl: HTMLElement = this._line,
    position: TabPosition = this.tabPosition
  ): void => {
    if (!lineEl) return;

    const isVertical = position === "top" || position === "bottom";
    const tabRect = tabEl.getBoundingClientRect();
    const lineRect = lineEl.getBoundingClientRect();

    this.style.setProperty(
      "--ea-tabs-indicator-size",
      `${isVertical ? tabEl.offsetWidth : tabEl.offsetHeight}px`
    );
    this.style.setProperty(
      "--ea-tabs-indicator-x",
      `${isVertical ? tabRect.x - lineRect.x : tabRect.y - lineRect.y}px`
    );
  };

  /**
   * 更新导航滚动位置
   */
  private _updateNavPosition = (tabEl: HTMLElement): void => {
    if (!this._nav) return;

    const tabRect = tabEl.getBoundingClientRect();
    const isVertical =
      this.tabPosition === "left" || this.tabPosition === "right";

    let isVisible: boolean;
    let scrollTarget: number;

    if (isVertical) {
      const visibleTop = this._nav.scrollTop;
      const visibleBottom = visibleTop + this._nav.clientHeight;
      const tabTop = tabEl.offsetTop;
      const tabBottom = tabTop + tabRect.height;

      isVisible = tabTop >= visibleTop && tabBottom <= visibleBottom;

      scrollTarget = tabTop - this._nav.clientHeight / 2 + tabRect.height / 2;
    } else {
      const visibleLeft = this._nav.scrollLeft;
      const visibleRight = visibleLeft + this._nav.clientWidth;
      const tabLeft = tabEl.offsetLeft;
      const tabRight = tabLeft + tabRect.width;

      isVisible = tabLeft >= visibleLeft && tabRight <= visibleRight;

      scrollTarget = tabLeft - this._nav.clientWidth / 2 + tabRect.width / 2;
    }

    if (!isVisible) {
      if (isVertical) {
        this._nav.scrollTo({
          top: Math.max(0, scrollTarget),
          behavior: "smooth",
        });
      } else {
        this._nav.scrollTo({
          left: Math.max(0, scrollTarget),
          behavior: "smooth",
        });
      }
    }
  };

  /**
   * 更新 tab 激活状态
   */
  private _updateTabsActive = (activeName: string = this.active): void => {
    /** @type {HTMLElement[]} */
    const panelEls = [...this.querySelectorAll("ea-tab-panel")];
    /** @type {HTMLElement[]} */
    const tabEls = [...this.querySelectorAll("ea-tab")];

    tabEls.forEach(tab => {
      const isActive = tab.getAttribute("panel") === activeName;

      tab.toggleAttribute("active", isActive);

      if (isActive && this.type === "")
        this._updateIndicatorPosition(tab as HTMLElement);

      if (isActive) this._updateNavPosition(tab as HTMLElement);
    });

    panelEls.forEach(panel => {
      panel.toggleAttribute(
        "active",
        activeName === panel.getAttribute("name")
      );
    });
  };

  /**
   * 更新 tab 是否为可编辑状态
   */
  private _updateTabEditable = (isEditable: boolean = this.editable): void => {
    this.querySelectorAll("ea-tab").forEach(tab => {
      tab.toggleAttribute("editable", isEditable);
    });
  };

  /**
   * 更新标签导航按钮图标方向
   */
  private _updateTabNavigationPosition = (
    tabPosition: TabPosition = this.tabPosition
  ): void => {
    if (!this._prevBtn || !this._nextBtn) return;

    if (tabPosition === "left" || tabPosition === "right") {
      this._prevBtn.setAttribute("name", "arrow-left");
      this._nextBtn.setAttribute("name", "arrow-right");
    } else if (tabPosition === "top" || tabPosition === "bottom") {
      this._prevBtn.setAttribute("name", "arrow-up");
      this._nextBtn.setAttribute("name", "arrow-down");
    }
  };

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <nav class='${bem.e("nav")}' part='nav'>
            <ea-icon name="angle-left" class="${bem.e("prev")} ${bem.e("scroll")}" part='prev'></ea-icon>
            <slot name='nav'></slot>
            <ea-icon name="angle-right" class="${bem.e("next")} ${bem.e("scroll")}" part='next'></ea-icon>
        </nav>
        <div class="${bem.e("line")}" part="line" tabindex="-1">
            <span class="${bem.e("indicator")}" part="indicator"></span>
        </div>
        <main class='${bem.e("content")}' part='content'>
          <slot></slot>
        </main>
      </div>
    `;
  }

  // ==================== 事件处理 ====================

  /**
   * 当 slot 内容变化时触发
   */
  @listen("slotchange", 'slot[name="nav"]')
  @listen("slotchange", ".ea-tabs__content > slot")
  private _onSlotChange(): void {
    if (this._slotChangeTimer) {
      clearTimeout(this._slotChangeTimer);
    }

    this._slotChangeTimer = window.setTimeout(() => {
      this._slotChangeTimer = undefined;

      requestAnimationFrame(() => {
        this._handleSlotChange();
      });
    }, 16);
  }

  /**
   * 实际处理 slot 变化的逻辑
   */
  private _handleSlotChange(): void {
    /** @type {HTMLElement[]} */
    const tabEls = [...this.querySelectorAll("ea-tab")];
    /** @type {HTMLElement[]} */
    const panelEls = [...this.querySelectorAll("ea-tab-panel")];

    tabEls.forEach(tab => {
      tab.setAttribute("slot", "nav");

      if (this.type) tab.setAttribute("type", this.type);
      tab.setAttribute("tab-position", this.tabPosition);
    });

    panelEls.forEach(panel => {
      if (this.type) panel.setAttribute("type", this.type);
      panel.setAttribute("tab-position", this.tabPosition);
    });

    this._updateTabsActive(this.active);
    this._updateTabEditable(this.editable);
    this.updateContainerClasslist();
  }

  /**
   * 标签点击事件
   */
  @listen("click", ".ea-tabs__nav")
  private _onTabClick(e: Event): void {
    const target = (e.target as HTMLElement).closest("ea-tab");
    if (!target || target?.hasAttribute("disabled")) return;

    const panelName = target.getAttribute("panel");
    this.active = panelName || "";

    this.dispatchEvent(
      new EaTabClickEvent({
        name: panelName,
        panel: this.querySelector(`ea-tab-panel[name="${panelName}"]`),
      })
    );
  }

  /**
   * 上一个按钮点击事件
   */
  @listen("click", ".ea-tabs__prev")
  private _onPrev(): void {
    this._nav.scrollTo({
      left: this._nav.scrollLeft - this._nav.offsetWidth,
      top: this._nav.scrollTop - this._nav.offsetHeight,
      behavior: "smooth",
    });
  }

  /**
   * 下一个按钮点击事件
   */
  @listen("click", ".ea-tabs__next")
  private _onNext(): void {
    this._nav.scrollTo({
      left: this._nav.scrollLeft + this._nav.offsetWidth,
      top: this._nav.scrollTop + this._nav.offsetHeight,
      behavior: "smooth",
    });
  }

  /**
   * 删除标签事件
   */
  @listen("ea-tab-close-icon-click")
  private _onTabRemove(e: Event): void {
    e.preventDefault();
    (e as Event).stopImmediatePropagation();

    const customEvent = e as CustomEvent;
    const panelId = customEvent.detail.panel;

    const tabEls = [...this.querySelectorAll("ea-tab")];
    const tab = customEvent.target as HTMLElement;
    const index = tabEls.indexOf(tab);
    const panel = this.querySelector(
      `ea-tab-panel[name="${panelId}"]`
    ) as HTMLElement;
    const tabName = [...this.querySelectorAll("ea-tab")][
      index - 1 < 0 ? 0 : index - 1
    ].getAttribute("panel");

    this.setAttribute("active", tabName || "");

    panel.remove();
    tab.remove();

    this.dispatchEvent(new EaTabRemoveEvent({ name: tabName }));
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    // 动态设置默认激活的 tab
    if (!this.active) {
      const activeAttr = this.getAttribute("active");
      if (activeAttr) {
        this.active = activeAttr;
      } else {
        const firstTab = this.querySelector("ea-tab");
        if (firstTab) {
          this.active = firstTab.getAttribute("panel") || "";
        }
      }
    }

    this.updateContainerClasslist();

    if (this._nav) {
      this._resizeObserver = new ResizeObserver(() => {
        if (this._resizeTimer) {
          clearTimeout(this._resizeTimer);
        }

        this._resizeTimer = window.setTimeout(() => {
          this._resizeTimer = undefined;
          this.updateContainerClasslist();
        }, 16);
      });
      this._resizeObserver.observe(this._nav);
    }
  }

  $beforeUnmount(): void {
    if (this._slotChangeTimer) {
      clearTimeout(this._slotChangeTimer);
      this._slotChangeTimer = undefined;
    }

    if (this._resizeTimer) {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = undefined;
    }

    this._resizeObserver?.unobserve();
    this._resizeObserver = undefined;
  }
}
