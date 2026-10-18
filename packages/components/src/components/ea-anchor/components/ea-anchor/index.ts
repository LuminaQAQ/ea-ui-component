import EaBase, { createBEM } from "@easy-component-ui/core/core/EaBase";
import {
  CustomElement,
  attribute,
  query,
  listen,
} from "@easy-component-ui/core/decorator";
import { rafThrottle } from "@easy-component-ui/core/utils/performance";
import { EaAnchorChangeEvent } from "../../events/EaAnchorChangeEvent";
import { EaAnchorClickEvent } from "../../events/EaAnchorClickEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-anchor" as const;
const bem = createBEM(TAG_NAME);

const ANCHOR_LINK_TAG = "ea-anchor-link";
const WINDOW_TARGET = "window";

const DIRECTIONS = ["vertical", "horizontal"] as const;
type AnchorDirection = (typeof DIRECTIONS)[number];

/**
 * 三次缓入缓出
 * @param t 归一化进度
 * @returns 缓动后的进度
 */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface AnchorLinkItem {
  href: string;
  element: HTMLElement;
}

/**
 * @summary 锚点导航组件，用于长页面的区块定位滚动与当前区块联动高亮，支持嵌套层级、水平方向与吸附。
 * @status stable
 * @since 4.1
 *
 * @dependency ea-anchor-link
 *
 * @slot default - 默认插槽，用于放置 ea-anchor-link 子元素。
 *
 * @event ea-click - 点击锚点链接时触发，detail: `{ href, heading, targetEl }`。
 * @event ea-change - 当前高亮链接变化时触发，detail: `{ href, heading }`。
 *
 * @csspart container - 导航容器元素。
 * @csspart marker - 当前项滑块指示元素。
 *
 * @cssproperty --ea-anchor-font-size - 字号。
 * @cssproperty --ea-anchor-text-color - 文本颜色。
 * @cssproperty --ea-anchor-marker-color - 滑块颜色。
 * @cssproperty --ea-anchor-marker-width - 滑块粗细。
 * @cssproperty --ea-anchor-marker-offset - 滑块偏移量。
 * @cssproperty --ea-anchor-marker-size - 滑块长度。
 * @cssproperty --ea-anchor-offset - 吸附偏移量。
 * @cssproperty --ea-anchor-transition - 过渡时长。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaAnchor extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  private _targetScrollAbortController?: AbortController;

  private _rafId?: number;

  private _isScrolling: boolean = false;

  private _isMounted: boolean = false;

  private _markerVisible: boolean = false;

  /**
   * 滚动容器选择器，window 表示页面滚动
   * @default "window"
   */
  @attribute({
    type: String,
    default: WINDOW_TARGET,
    observer(this: EaAnchor) {
      this._bindTargetScroll();
    },
  })
  target: string = WINDOW_TARGET;

  /**
   * 滚动定位时目标区块距容器顶部的偏移量
   * @default 0
   */
  @attribute({
    type: Number,
    default: 0,
    observer(this: EaAnchor, newVal: number) {
      this.style.setProperty(`--${TAG_NAME}-offset`, `${newVal}px`);
    },
  })
  offset: number = 0;

  /**
   * 判定当前区块的顶部边界容差
   * @default 15
   */
  @attribute({
    type: Number,
    default: 15,
    observer(this: EaAnchor) {
      if (this._isMounted && !this._isScrolling) this._runSpy();
    },
  })
  offsetBoundary: number = 15;

  /**
   * 滚动动画时长（毫秒），0 表示瞬时跳转
   * @default 300
   */
  @attribute({ type: Number, default: 300 })
  duration: number = 300;

  /**
   * 排列方向
   * @default "vertical"
   */
  @attribute({
    type: String,
    default: DIRECTIONS[0],
    observer(this: EaAnchor) {
      this._syncLinks();
      this.updateContainerClasslist();
      this._updateMarker(this.active);
    },
  })
  direction: AnchorDirection = DIRECTIONS[0];

  /**
   * 是否显示当前项滑块指示器
   * @default true
   */
  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaAnchor) {
      this._updateMarker(this.active);
    },
  })
  marker: boolean = true;

  /**
   * 容器自身吸附
   * @default false
   */
  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaAnchor) {
      this.updateContainerClasslist();
    },
  })
  affix: boolean = false;

  /**
   * 点击后使用 replaceState 同步 hash
   * @default false
   */
  @attribute({ type: Boolean, default: false })
  replace: boolean = false;

  /**
   * 当前高亮链接的 href
   * @default ""
   */
  @attribute({
    type: String,
    default: "",
    observer(this: EaAnchor, newVal: string) {
      this._updateActive(newVal);

      this.dispatchEvent(
        new EaAnchorChangeEvent({
          href: newVal,
          heading: this._getHeading(newVal),
        })
      );
    },
  })
  active: string = "";

  /**
   * 程序化滚动到指定区块
   * @param href 目标区块选择器
   */
  scrollToAnchor(href: string): void {
    this._applyActive(href);
    this._scrollToAnchor(href);
  }

  /**
   * 更新容器类名
   * @returns 容器类名字符串
   */
  updateContainerClasslist(): string {
    const className = bem(
      { [this.direction]: true },
      { "marker-visible": this._markerVisible }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /** 渲染模板 */
  html(): string {
    return `
      <nav class="${this.updateContainerClasslist()}" part="container" role="navigation">
        <span class="${bem.e("marker")}" part="marker" aria-hidden="true"></span>
        <slot></slot>
      </nav>
    `;
  }

  /**
   * 窗口滚动处理
   */
  @listen("scroll", "window")
  private _handleWindowScroll(): void {
    if (this.target !== WINDOW_TARGET) return;
    this._scheduleSpy();
  }

  /**
   * 容器滚动处理
   */
  private _handleContainerScroll = (): void => {
    this._scheduleSpy();
  };

  /**
   * 子级链接变化处理
   */
  @listen("slotchange", "slot:not([name])")
  private _handleSlotChange(): void {
    this._syncLinks();
    this.updateContainerClasslist();

    if (this._isMounted && !this._isScrolling) {
      this._runSpy();
    }
  }

  /**
   * 子级链接点击处理
   * @param e 子级链接派发的内部事件
   */
  @listen("ea-anchor-link-click")
  private _handleLinkClick(e: Event): void {
    e.stopPropagation();

    const href = (e as CustomEvent<{ href: string }>).detail?.href || "";
    const section = this._getSection(href);
    if (!section) return;

    const heading = this._getHeading(href);

    this._applyActive(href);
    this._scrollToAnchor(href);

    this.dispatchEvent(
      new EaAnchorClickEvent({ href, heading, targetEl: section })
    );
  }

  /** 绑定滚动容器监听 */
  private _bindTargetScroll(): void {
    this._targetScrollAbortController?.abort();
    this._targetScrollAbortController = new AbortController();

    if (this.target === WINDOW_TARGET) return;

    const container = this._getContainerElement();
    container?.addEventListener("scroll", this._handleContainerScroll, {
      passive: true,
      signal: this._targetScrollAbortController.signal,
    });
  }

  /** 以 rAF 节流派发滚动高亮计算 */
  private _scheduleSpy = rafThrottle((): void => {
    if (this._isScrolling) return;

    this._runSpy();
  });

  /** 计算并应用当前高亮区块 */
  private _runSpy(): void {
    this._applyActive(this._computeActiveHref());
  }

  /**
   * 设置当前高亮项
   * @param href 目标区块选择器
   */
  private _applyActive(href: string): void {
    if (!href || href === this.active) return;

    this.active = href;
  }

  /**
   * 计算当前区块的 href
   * @returns 当前区块的选择器
   */
  private _computeActiveHref(): string {
    const links = this._getLinks();
    if (links.length === 0) return "";

    const container = this._getContainerElement();

    if (
      this._isContainerScrollable(container) &&
      this._isScrolledToBottom(container)
    ) {
      return links[links.length - 1].href;
    }

    const horizontal = this._getScrollAxis(container) === "horizontal";
    const containerRect = container?.getBoundingClientRect();
    const containerStart = containerRect
      ? horizontal
        ? containerRect.left
        : containerRect.top
      : 0;
    const threshold = this.offsetBoundary;

    let current = "";
    let currentStart = Number.NEGATIVE_INFINITY;

    links.forEach(link => {
      const section = this._getSection(link.href);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionStart = (horizontal ? rect.left : rect.top) - containerStart;
      if (sectionStart <= threshold && sectionStart > currentStart) {
        currentStart = sectionStart;
        current = link.href;
      }
    });

    if (current) return current;

    return links[0].href;
  }

  /**
   * 执行平滑滚动到目标区块
   * @param href 目标区块选择器
   */
  private _scrollToAnchor(href: string): void {
    const section = this._getSection(href);
    if (!section) return;

    const container = this._getContainerElement();
    const end = this._getScrollEnd(section, container);

    this._cancelScrollAnimation();
    this._isScrolling = true;

    if (this.duration <= 0) {
      this._setScrollPosition(container, end);
      this._isScrolling = false;
      this._syncHash(href);
      return;
    }

    const start = this._getScrollPosition(container);
    const delta = end - start;
    const startTime = performance.now();
    const { duration } = this;

    const step = (now: number): void => {
      const progress = Math.min((now - startTime) / duration, 1);
      this._setScrollPosition(
        container,
        start + delta * easeInOutCubic(progress)
      );

      if (progress < 1) {
        this._rafId = requestAnimationFrame(step);
        return;
      }

      this._rafId = undefined;
      this._isScrolling = false;
      this._syncHash(href);
    };

    this._rafId = requestAnimationFrame(step);
  }

  /** 取消进行中的滚动动画 */
  private _cancelScrollAnimation(): void {
    if (this._rafId === undefined) return;
    cancelAnimationFrame(this._rafId);
    this._rafId = undefined;
  }

  /**
   * 同步地址栏 hash
   * @param href 目标区块选择器
   */
  private _syncHash(href: string): void {
    if (!href.startsWith("#")) return;

    if (this.replace) {
      window.history.replaceState(null, "", href);
    } else {
      window.history.pushState(null, "", href);
    }
  }

  /**
   * 获取滚动容器元素
   * @returns 容器元素，window 滚动时为 null
   */
  private _getContainerElement(): HTMLElement | null {
    if (this.target === WINDOW_TARGET) return null;

    try {
      return document.querySelector<HTMLElement>(this.target);
    } catch {
      return null;
    }
  }

  /**
   * 判断滚动容器的实际滚动轴
   * @param container 滚动容器元素，window 滚动时为 null
   * @returns 滚动轴方向
   */
  private _getScrollAxis(
    container: HTMLElement | null
  ): "vertical" | "horizontal" {
    const el = container ?? document.documentElement;
    const horizontalOverflow = el.scrollWidth - el.clientWidth;
    const verticalOverflow = el.scrollHeight - el.clientHeight;

    return horizontalOverflow > verticalOverflow ? "horizontal" : "vertical";
  }

  /**
   * 获取锚点目标区块
   * @param href 目标区块选择器
   * @returns 目标区块元素
   */
  private _getSection(href: string): HTMLElement | null {
    if (!href) return null;

    try {
      return document.querySelector<HTMLElement>(href);
    } catch {
      return null;
    }
  }

  /**
   * 获取全部锚点链接
   * @returns 链接项列表
   */
  private _getLinks(): AnchorLinkItem[] {
    return Array.from(this.querySelectorAll<HTMLElement>(ANCHOR_LINK_TAG))
      .map(element => ({ href: element.getAttribute("href") || "", element }))
      .filter(item => item.href !== "");
  }

  /**
   * 获取链接标题
   * @param href 目标区块选择器
   * @returns 标题文本
   */
  private _getHeading(href: string): string {
    const link = this._getLinks().find(item => item.href === href);
    if (!link) return "";

    const heading = link.element.getAttribute("heading");
    if (heading) return heading;

    const anchor = link.element.shadowRoot?.querySelector("a");
    return anchor?.textContent?.trim() || "";
  }

  /**
   * 计算滚动终点
   * @param section 目标区块元素
   * @param container 滚动容器元素
   * @returns 滚动终点位置
   */
  private _getScrollEnd(
    section: HTMLElement,
    container: HTMLElement | null
  ): number {
    const horizontal = this._getScrollAxis(container) === "horizontal";
    const rect = section.getBoundingClientRect();

    if (!container) {
      const base = horizontal
        ? window.scrollX + rect.left
        : window.scrollY + rect.top;
      return Math.max(base - this.offset, 0);
    }

    const containerRect = container.getBoundingClientRect();
    const base = horizontal
      ? container.scrollLeft + rect.left - containerRect.left
      : container.scrollTop + rect.top - containerRect.top;

    return Math.max(base - this.offset, 0);
  }

  /**
   * 获取当前滚动位置
   * @param container 滚动容器元素
   * @returns 滚动位置
   */
  private _getScrollPosition(container: HTMLElement | null): number {
    const horizontal = this._getScrollAxis(container) === "horizontal";

    if (!container) return horizontal ? window.scrollX : window.scrollY;

    return horizontal ? container.scrollLeft : container.scrollTop;
  }

  /**
   * 设置滚动位置
   * @param container 滚动容器元素
   * @param value 目标位置
   */
  private _setScrollPosition(
    container: HTMLElement | null,
    value: number
  ): void {
    const horizontal = this._getScrollAxis(container) === "horizontal";

    if (!container) {
      if (horizontal) {
        window.scrollTo({ left: value, behavior: "auto" });
      } else {
        window.scrollTo({ top: value, behavior: "auto" });
      }
      return;
    }

    if (horizontal) {
      container.scrollLeft = value;
    } else {
      container.scrollTop = value;
    }
  }

  /**
   * 判断容器是否可滚动
   * @param container 滚动容器元素
   * @returns 是否可滚动
   */
  private _isContainerScrollable(container: HTMLElement | null): boolean {
    const horizontal = this._getScrollAxis(container) === "horizontal";

    if (!container) {
      const doc = document.documentElement;
      return horizontal
        ? doc.scrollWidth > window.innerWidth
        : doc.scrollHeight > window.innerHeight;
    }

    return horizontal
      ? container.scrollWidth > container.clientWidth
      : container.scrollHeight > container.clientHeight;
  }

  /**
   * 判断是否已滚动到底部
   * @param container 滚动容器元素
   * @returns 是否到底部
   */
  private _isScrolledToBottom(container: HTMLElement | null): boolean {
    const horizontal = this._getScrollAxis(container) === "horizontal";

    if (!container) {
      const doc = document.documentElement;
      return horizontal
        ? window.scrollX + window.innerWidth >= doc.scrollWidth - 1
        : window.scrollY + window.innerHeight >= doc.scrollHeight - 1;
    }

    return horizontal
      ? container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 1
      : container.scrollTop + container.clientHeight >=
          container.scrollHeight - 1;
  }

  /**
   * 更新链接的激活状态
   * @param href 当前高亮区块选择器
   */
  private _updateActive(href: string): void {
    const links = this._getLinks();
    const activeSet = this._collectActiveChain(href, links);

    links.forEach(link => {
      if (activeSet.has(link.href)) {
        link.element.setAttribute("active", "");
      } else {
        link.element.removeAttribute("active");
      }
    });

    this._updateMarker(href);
  }

  /**
   * 收集当前高亮项及其父级链
   * @param href 当前高亮区块选择器
   * @param links 链接项列表
   * @returns 需要激活的链接 href 集合
   */
  private _collectActiveChain(
    href: string,
    links: AnchorLinkItem[]
  ): Set<string> {
    const chain = new Set<string>();

    const matched = links.find(item => item.href === href);
    if (!matched) return chain;

    chain.add(href);

    let parent =
      matched.element.parentElement?.closest<HTMLElement>(ANCHOR_LINK_TAG);

    while (parent) {
      const parentHref = parent.getAttribute("href");
      if (parentHref) chain.add(parentHref);
      parent = parent.parentElement?.closest<HTMLElement>(ANCHOR_LINK_TAG);
    }

    return chain;
  }

  /**
   * 更新滑块位置
   * @param href 当前高亮区块选择器
   */
  private _updateMarker(href: string): void {
    if (!this._container) return;

    const matched = this._getLinks().find(item => item.href === href);
    const anchor = matched
      ? ((matched.element.shadowRoot?.querySelector(
          "a"
        ) as HTMLElement | null) ?? matched.element)
      : null;

    this._markerVisible = this.marker && !!anchor;

    if (anchor) {
      const containerRect = this._container.getBoundingClientRect();
      const rect = anchor.getBoundingClientRect();
      const horizontal = this.direction === "horizontal";

      this.style.setProperty(
        `--${TAG_NAME}-marker-offset`,
        `${horizontal ? rect.left - containerRect.left : rect.top - containerRect.top}px`
      );
      this.style.setProperty(
        `--${TAG_NAME}-marker-size`,
        `${horizontal ? rect.width : rect.height}px`
      );
    }

    this.updateContainerClasslist();
  }

  /** 同步方向到子级链接 */
  private _syncLinks(): void {
    this.querySelectorAll<HTMLElement>(ANCHOR_LINK_TAG).forEach(link => {
      link.setAttribute("direction", this.direction);
    });
  }

  /** 组件挂载 */
  $mount(): void {
    this.style.setProperty(`--${TAG_NAME}-offset`, `${this.offset}px`);

    this._bindTargetScroll();
    this._syncLinks();
    this.updateContainerClasslist();

    if (!this.active) {
      const initialHref = this._computeActiveHref();
      if (initialHref) this.active = initialHref;
    }
  }

  /** 挂载完成 */
  $mounted(): void {
    this._isMounted = true;
    this.updateContainerClasslist();
    this._updateMarker(this.active);
  }

  /** 组件销毁前 */
  $beforeUnmount(): void {
    this._targetScrollAbortController?.abort();
    this._cancelScrollAnimation();
    this._scheduleSpy.cancel();
  }
}

export default EaAnchor;
