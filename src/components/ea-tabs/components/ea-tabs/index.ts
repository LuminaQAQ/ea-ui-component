import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { RovingTabindex } from "@utils/roving-tabindex";
import { EaTabClickEvent } from "./events/EaTabClickEvent";
import { EaTabRemoveEvent } from "./events/EaTabRemoveEvent";
import { EaTabsChangeEvent } from "./events/EaTabsChangeEvent";
import type { EaTabElement } from "../../types";

import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-tabs" as const;
const bem = createBEM(TAG_NAME);

export type TabsType = "" | "card" | "border-card";
export type TabPosition = "top" | "bottom" | "left" | "right";

/**
 * @summary 标签页组件，用于分隔内容上有关联但属于不同类别的数据集合。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot nav - 放置标签项的容器（无须手动设置，ea-tab 会自动分配）。
 * @slot default - 默认插槽，用于放置 ea-tab-panel 面板子元素。
 *
 * @event ea-tab-click - 点击标签时触发，detail: `{ name, panel }`。
 * @event ea-tabs-change - 标签页切换时触发，detail: `{ name }`。
 * @event ea-tab-remove - 点击删除标签时触发，detail: `{ name }`。
 *
 * @csspart container - 外层容器。
 * @csspart nav - 标签栏容器。
 * @csspart prev - 上一个标签滚动按钮。
 * @csspart next - 下一个标签滚动按钮。
 * @csspart line - 标签栏下方的连接线。
 * @csspart indicator - 标签栏下方的指示器。
 * @csspart content - 标签栏下方的面板内容区域。
 *
 * @cssproperty --ea-tabs-tab-spacing - 标签项间距。
 * @cssproperty --ea-tabs-border-color - 边框颜色。
 * @cssproperty --ea-tabs-nav-height - 导航栏高度。
 * @cssproperty --ea-tabs-border-card-bg-color - 边框卡片背景颜色。
 * @cssproperty --ea-tabs-content-spacing - 内容区域内边距。
 * @cssproperty --ea-tabs-indicator-color - 指示器颜色。
 * @cssproperty --ea-tabs-indicator-size - 指示器尺寸。
 * @cssproperty --ea-tabs-indicator-x - 指示器偏移量。
 * @cssproperty --ea-tabs-transition - 过渡动画时长。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTabs extends EaBase {
  @query(".ea-tabs")
  private _container!: HTMLElement;

  @query(".ea-tabs__prev")
  private _prevBtn!: HTMLElement;

  @query(".ea-tabs__next")
  private _nextBtn!: HTMLElement;

  @query(".ea-tabs__nav")
  private _nav!: HTMLElement;

  @query(".ea-tabs__line")
  private _line!: HTMLElement;

  private _resizeObserver?: ResizeObserver;
  private _slotChangeTimer?: number;
  private _resizeTimer?: number;
  private _rovingTabindex?: RovingTabindex;

  @attribute({
    type: Enum(["", "card", "border-card"]),
    default: "",
    observer(this: EaTabs) {
      this.updateContainerClasslist();

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
      this._syncRovingTabindex(newVal);

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
      this._updateAriaOrientation(newVal);

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
   * @param tabEl - 目标标签元素
   * @param lineEl - 指示线元素
   * @param position - 标签位置方向
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
   * @param tabEl - 目标标签元素
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
   * @param activeName - 激活的标签面板标识
   */
  private _updateTabsActive = (activeName: string = this.active): void => {
    const panelEls = [...this.querySelectorAll("ea-tab-panel")];
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
   * @param isEditable - 是否可编辑
   */
  private _updateTabEditable = (isEditable: boolean = this.editable): void => {
    this.querySelectorAll("ea-tab").forEach(tab => {
      tab.toggleAttribute("editable", isEditable);
    });
  };

  /**
   * 更新标签导航按钮图标方向
   * @param tabPosition - 标签位置方向
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
        <div class='${bem.e("content")}' part='content'>
          <slot></slot>
        </div>
      </div>
    `;
  }

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
   * 处理 slot 变化逻辑
   */
  private _handleSlotChange(): void {
    const tabEls = [...this.querySelectorAll("ea-tab")];
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

  @listen("click", ".ea-tabs__nav")
  private _handleTabClick(e: Event): void {
    const target = (e.target as HTMLElement).closest("ea-tab");
    if (!target || target?.hasAttribute("disabled")) return;

    const panelName = target.getAttribute("panel") || "";
    this.active = panelName;

    this.dispatchEvent(
      new EaTabClickEvent({
        name: panelName,
        panel: this.querySelector(`ea-tab-panel[name="${panelName}"]`),
      })
    );
  }

  @listen("click", ".ea-tabs__prev")
  private _handlePrev(): void {
    this._nav.scrollTo({
      left: this._nav.scrollLeft - this._nav.offsetWidth,
      top: this._nav.scrollTop - this._nav.offsetHeight,
      behavior: "smooth",
    });
  }

  @listen("click", ".ea-tabs__next")
  private _handleNext(): void {
    this._nav.scrollTo({
      left: this._nav.scrollLeft + this._nav.offsetWidth,
      top: this._nav.scrollTop + this._nav.offsetHeight,
      behavior: "smooth",
    });
  }

  @listen("ea-tab-close-icon-click")
  private _handleTabRemove(e: Event): void {
    e.preventDefault();
    (e as Event).stopImmediatePropagation();

    const customEvent = e as CustomEvent;
    const panelId = customEvent.detail.panel;

    const tabEls = [...this.querySelectorAll("ea-tab")];
    const tab = customEvent.target as HTMLElement;
    const index = tabEls.indexOf(tab as EaTabElement);
    const panel = this.querySelector(
      `ea-tab-panel[name="${panelId}"]`
    ) as HTMLElement;

    const isRemovingActive = panelId === this.active;

    panel.remove();
    tab.remove();

    if (isRemovingActive) {
      const remaining = [...this.querySelectorAll("ea-tab")];
      const fallback = remaining[index - 1] || remaining[0];
      const tabName = fallback?.getAttribute("panel") || "";
      this.setAttribute("active", tabName);
      this.dispatchEvent(new EaTabRemoveEvent({ name: tabName }));
    } else {
      this.dispatchEvent(new EaTabRemoveEvent({ name: this.active }));
    }
  }

  $mount(): void {
    this.setAttribute("role", "tablist");
    this._updateAriaOrientation();

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

    this._initRovingTabindex();
  }

  /** 根据 tabPosition 更新 aria-orientation 属性 */
  private _updateAriaOrientation(position: TabPosition = this.tabPosition): void {
    const isVertical = position === "left" || position === "right";
    this.setAttribute("aria-orientation", isVertical ? "vertical" : "horizontal");
  }

  /** 初始化键盘导航 */
  private _initRovingTabindex(): void {
    const isVertical =
      this.tabPosition === "left" || this.tabPosition === "right";
    const tabEls = [...this.querySelectorAll("ea-tab")] as HTMLElement[];

    this._rovingTabindex = new RovingTabindex({
      orientation: isVertical ? "vertical" : "horizontal",
      loop: true,
      onActivate: index => {
        const tab = tabEls[index];
        if (tab && !tab.hasAttribute("disabled")) {
          const panelName = tab.getAttribute("panel") || "";
          this.active = panelName;
        }
      },
    });
    this._rovingTabindex.setItems(tabEls);
    this._syncRovingTabindex(this.active);
  }

  /** 同步 RovingTabindex 的当前索引与 active 属性 */
  private _syncRovingTabindex(activeName: string): void {
    if (!this._rovingTabindex || !activeName) return;
    const tabEls = [...this.querySelectorAll("ea-tab")] as HTMLElement[];
    const activeIndex = tabEls.findIndex(tab => tab.getAttribute("panel") === activeName);
    if (activeIndex >= 0) {
      this._rovingTabindex.setCurrentIndex(activeIndex);
    }
  }

  @listen("keydown", ".ea-tabs__nav")
  private _handleNavKeydown(e: KeyboardEvent): void {
    this._rovingTabindex?.handleKeydown(e);
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

    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;

    this._rovingTabindex?.destroy();
    this._rovingTabindex = undefined;
  }
}
