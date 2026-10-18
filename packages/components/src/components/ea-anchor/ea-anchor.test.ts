import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import "./index";
import type { EaAnchor } from "./components/ea-anchor";
import type { EaAnchorLink } from "./components/ea-anchor-link";
import { runAxe, assertNoA11yViolations } from "../../test/utils/a11y";

interface LinkSpec {
  href: string;
  heading: string;
  children?: LinkSpec[];
}

interface RectInit {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

const cleanupFns: Array<() => void> = [];

/** 模拟元素几何信息 */
function mockRect(el: Element, init: RectInit = {}): void {
  const { top = 0, left = 0, width = 100, height = 100 } = init;

  el.getBoundingClientRect = () =>
    ({
      top,
      left,
      width,
      height,
      right: left + width,
      bottom: top + height,
      x: left,
      y: top,
      toJSON: () => ({}),
    }) as DOMRect;
}

/** 用固定值覆盖目标对象上的 getter */
function stubGetter(target: object, key: string, value: unknown): void {
  const original = Object.getOwnPropertyDescriptor(target, key);

  Object.defineProperty(target, key, {
    get: () => value,
    configurable: true,
  });

  cleanupFns.push(() => {
    if (original) {
      Object.defineProperty(target, key, original);
    } else {
      delete (target as Record<string, unknown>)[key];
    }
  });
}

/** 将链接配置渲染为 HTML 字符串 */
function buildLinksMarkup(specs: LinkSpec[]): string {
  return specs
    .map(
      spec =>
        `<ea-anchor-link href="${spec.href}" heading="${spec.heading}">${
          spec.children ? buildLinksMarkup(spec.children) : ""
        }</ea-anchor-link>`
    )
    .join("");
}

/** 收集元素上指定名称的事件 */
function captureEvents(el: HTMLElement, name: string): Event[] {
  const logs: Event[] = [];
  el.addEventListener(name, e => logs.push(e));
  return logs;
}

describe("EaAnchor", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  afterEach(() => {
    container.remove();
    cleanupFns.splice(0).forEach(fn => fn());
    vi.restoreAllMocks();
  });

  /**
   * 挂载锚点组件
   * @param specs 链接配置
   * @param attrs 锚点属性
   * @returns 锚点元素、区块映射与链接列表
   */
  async function mountAnchor(
    specs: LinkSpec[],
    attrs: Record<string, string> = {}
  ): Promise<{
    anchor: EaAnchor;
    sections: Map<string, HTMLElement>;
    links: EaAnchorLink[];
  }> {
    const sections = new Map<string, HTMLElement>();

    const collectSections = (items: LinkSpec[]): void => {
      items.forEach(item => {
        const section = document.createElement("section");
        section.id = item.href.replace(/^#/, "");
        container.appendChild(section);
        sections.set(item.href, section);

        if (item.children) collectSections(item.children);
      });
    };

    collectSections(specs);

    const anchor = document.createElement("ea-anchor") as unknown as EaAnchor;
    Object.entries(attrs).forEach(([key, value]) => {
      anchor.setAttribute(key, value);
    });
    anchor.innerHTML = buildLinksMarkup(specs);
    container.appendChild(anchor);

    await anchor.updateComplete;

    const links = Array.from(
      anchor.querySelectorAll("ea-anchor-link")
    ) as EaAnchorLink[];

    return { anchor, sections, links };
  }

  /** 触发窗口滚动并等待高亮计算 */
  async function triggerWindowScroll(): Promise<void> {
    window.dispatchEvent(new Event("scroll"));
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
  }

  describe("基本渲染", () => {
    it("应该注册自定义元素", () => {
      expect(customElements.get("ea-anchor")).toBeDefined();
      expect(customElements.get("ea-anchor-link")).toBeDefined();
    });

    it("应该正确渲染组件并包含 navigation 容器", async () => {
      const { anchor } = await mountAnchor([{ href: "#a", heading: "A" }]);
      const containerEl =
        anchor.shadowRoot!.querySelector('[part="container"]');

      expect(anchor.shadowRoot).toBeDefined();
      expect(containerEl?.tagName.toLowerCase()).toBe("nav");
      expect(containerEl?.getAttribute("role")).toBe("navigation");
    });

    it("应该包含 marker 与默认 slot", async () => {
      const { anchor } = await mountAnchor([{ href: "#a", heading: "A" }]);
      const marker = anchor.shadowRoot!.querySelector('[part="marker"]');

      expect(marker).toBeDefined();
      expect(marker?.getAttribute("aria-hidden")).toBe("true");
      expect(anchor.shadowRoot!.querySelector("slot")).toBeDefined();
    });

    it("ea-anchor-link 应该渲染带 href 的链接", async () => {
      const { links } = await mountAnchor([{ href: "#a", heading: "A" }]);
      const link = links[0];
      const anchorEl = link.shadowRoot!.querySelector("a");

      expect(link.shadowRoot).toBeDefined();
      expect(anchorEl?.getAttribute("href")).toBe("#a");
      expect(link.shadowRoot!.querySelector('[part="link"]')).toBeDefined();
      expect(link.shadowRoot!.querySelector('[part="heading"]')).toBeDefined();
      expect(anchorEl?.textContent?.trim()).toBe("A");
    });
  });

  describe("属性", () => {
    it("应该具备正确的默认值", async () => {
      const { anchor } = await mountAnchor([]);

      expect(anchor.target).toBe("window");
      expect(anchor.offset).toBe(0);
      expect(anchor.offsetBoundary).toBe(15);
      expect(anchor.duration).toBe(300);
      expect(anchor.direction).toBe("vertical");
      expect(anchor.marker).toBe(true);
      expect(anchor.affix).toBe(false);
      expect(anchor.replace).toBe(false);
      expect(anchor.active).toBe("");
    });

    it("ea-anchor-link 应该具备正确的默认值", async () => {
      const link = document.createElement(
        "ea-anchor-link"
      ) as unknown as EaAnchorLink;
      link.setAttribute("href", "#a");
      link.setAttribute("heading", "A");
      container.appendChild(link);

      await link.updateComplete;

      expect(link.href).toBe("#a");
      expect(link.heading).toBe("A");
      expect(link.disabled).toBe(false);
      expect(link.active).toBe(false);
    });

    it("offset 变化时应该同步 CSS 变量", async () => {
      const { anchor } = await mountAnchor([{ href: "#a", heading: "A" }]);

      anchor.offset = 64;
      await anchor.updateComplete;

      expect(anchor.style.getPropertyValue("--ea-anchor-offset")).toBe("64px");
    });

    it("direction 变化时应该更新容器类名与子级方向", async () => {
      const { anchor, links } = await mountAnchor([
        { href: "#a", heading: "A" },
      ]);

      expect(
        anchor.shadowRoot!.querySelector(".ea-anchor")!.className
      ).toContain("ea-anchor--vertical");

      anchor.direction = "horizontal";
      await anchor.updateComplete;

      expect(
        anchor.shadowRoot!.querySelector(".ea-anchor")!.className
      ).toContain("ea-anchor--horizontal");
      expect(links[0].getAttribute("direction")).toBe("horizontal");
    });

    it("应该支持 offset-boundary 连字符属性", async () => {
      const { anchor } = await mountAnchor([{ href: "#a", heading: "A" }], {
        "offset-boundary": "40",
      });

      expect(anchor.offsetBoundary).toBe(40);
      expect(anchor.getAttribute("offset-boundary")).toBe("40");
    });
  });

  describe("点击滚动", () => {
    it("点击链接应该调用内部 _scrollToAnchor", async () => {
      const { anchor, links, sections } = await mountAnchor(
        [{ href: "#a", heading: "A" }],
        { duration: "0" }
      );
      mockRect(sections.get("#a")!, { top: 300 });

      const scrollSpy = vi.spyOn(
        anchor as unknown as { _scrollToAnchor: (href: string) => void },
        "_scrollToAnchor"
      );

      links[0].shadowRoot!.querySelector("a")!.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );

      expect(scrollSpy).toHaveBeenCalledWith("#a");
    });

    it("duration 为 0 时应该瞬时滚动到目标位置", async () => {
      const { anchor, links, sections } = await mountAnchor(
        [{ href: "#a", heading: "A" }],
        { duration: "0" }
      );
      mockRect(sections.get("#a")!, { top: 300 });

      links[0].shadowRoot!.querySelector("a")!.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 300,
        behavior: "auto",
      });
      expect(anchor.active).toBe("#a");
    });

    it("点击非当前高亮链接应该立即切换高亮到该链接", async () => {
      const { anchor, links, sections } = await mountAnchor(
        [
          { href: "#a", heading: "A" },
          { href: "#b", heading: "B" },
        ],
        { duration: "0" }
      );
      mockRect(sections.get("#b")!, { top: 200 });

      expect(anchor.active).toBe("#a");

      links[1].shadowRoot!.querySelector("a")!.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );

      expect(anchor.active).toBe("#b");
    });

    it("应该支持 offset 定位偏移", async () => {
      const { links, sections } = await mountAnchor(
        [{ href: "#a", heading: "A" }],
        { duration: "0", offset: "64" }
      );
      mockRect(sections.get("#a")!, { top: 300 });

      links[0].shadowRoot!.querySelector("a")!.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 236,
        behavior: "auto",
      });
    });

    it("direction 为 horizontal 但页面纵向滚动时应该滚动纵向轴", async () => {
      const { links, sections } = await mountAnchor(
        [{ href: "#a", heading: "A" }],
        { duration: "0", direction: "horizontal" }
      );
      mockRect(sections.get("#a")!, { top: 500 });

      links[0].shadowRoot!.querySelector("a")!.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 500,
        behavior: "auto",
      });
    });

    it("容器横向可滚动时应该滚动水平轴（与 direction 无关）", async () => {
      const holder = document.createElement("div");
      holder.id = "h-scroll-holder";
      container.appendChild(holder);

      Object.defineProperty(holder, "scrollLeft", {
        value: 0,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(holder, "scrollWidth", {
        value: 2000,
        configurable: true,
      });
      Object.defineProperty(holder, "clientWidth", {
        value: 400,
        configurable: true,
      });

      const { links, sections } = await mountAnchor(
        [{ href: "#a", heading: "A" }],
        { duration: "0", target: "#h-scroll-holder" }
      );

      mockRect(holder, { left: 50, width: 400 });
      mockRect(sections.get("#a")!, { left: 450, top: 0 });

      links[0].shadowRoot!.querySelector("a")!.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );

      expect(holder.scrollLeft).toBe(400);
      expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it("应该同步地址栏 hash", async () => {
      const pushSpy = vi
        .spyOn(window.history, "pushState")
        .mockImplementation(() => {});
      const { links, sections } = await mountAnchor(
        [{ href: "#a", heading: "A" }],
        { duration: "0" }
      );
      mockRect(sections.get("#a")!, { top: 300 });

      links[0].shadowRoot!.querySelector("a")!.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );

      expect(pushSpy).toHaveBeenCalledWith(null, "", "#a");
    });

    it("replace 为 true 时应该使用 replaceState", async () => {
      const replaceSpy = vi
        .spyOn(window.history, "replaceState")
        .mockImplementation(() => {});
      const { links, sections } = await mountAnchor(
        [{ href: "#a", heading: "A" }],
        { duration: "0", replace: "" }
      );
      mockRect(sections.get("#a")!, { top: 300 });

      links[0].shadowRoot!.querySelector("a")!.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );

      expect(replaceSpy).toHaveBeenCalledWith(null, "", "#a");
    });

    it("应该支持容器内滚动", async () => {
      const holder = document.createElement("div");
      holder.id = "scroll-holder";
      holder.appendChild(document.createElement("div"));
      container.appendChild(holder);

      Object.defineProperty(holder, "scrollTop", {
        value: 100,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(holder, "scrollHeight", {
        value: 2000,
        configurable: true,
      });
      Object.defineProperty(holder, "clientHeight", {
        value: 400,
        configurable: true,
      });

      const { links, sections } = await mountAnchor(
        [{ href: "#a", heading: "A" }],
        { duration: "0", target: "#scroll-holder" }
      );

      mockRect(holder, { top: 50, height: 400 });
      mockRect(sections.get("#a")!, { top: 350 });

      links[0].shadowRoot!.querySelector("a")!.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );

      expect(holder.scrollTop).toBe(400);
      expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it("程序化 scrollToAnchor 应该滚动并更新高亮", async () => {
      const { anchor, sections } = await mountAnchor(
        [
          { href: "#a", heading: "A" },
          { href: "#b", heading: "B" },
        ],
        { duration: "0" }
      );
      mockRect(sections.get("#b")!, { top: 200 });

      anchor.scrollToAnchor("#b");

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 200,
        behavior: "auto",
      });
      expect(anchor.active).toBe("#b");
    });
  });

  describe("滚动高亮", () => {
    it("滚动时应该高亮对应区块的链接", async () => {
      const { anchor, sections, links } = await mountAnchor([
        { href: "#a", heading: "A" },
        { href: "#b", heading: "B" },
        { href: "#c", heading: "C" },
      ]);

      mockRect(sections.get("#a")!, { top: 0 });
      mockRect(sections.get("#b")!, { top: 200 });
      mockRect(sections.get("#c")!, { top: 400 });
      await triggerWindowScroll();
      expect(anchor.active).toBe("#a");

      mockRect(sections.get("#a")!, { top: -400 });
      mockRect(sections.get("#b")!, { top: 10 });
      mockRect(sections.get("#c")!, { top: 300 });
      await triggerWindowScroll();

      expect(anchor.active).toBe("#b");
      expect(links[1].active).toBe(true);
      expect(links[0].active).toBe(false);
    });

    it("高亮变化时应该派发 ea-change 事件", async () => {
      const { anchor, sections } = await mountAnchor([
        { href: "#a", heading: "A" },
        { href: "#b", heading: "B" },
      ]);
      const changes = captureEvents(anchor, "ea-change");

      mockRect(sections.get("#a")!, { top: 0 });
      mockRect(sections.get("#b")!, { top: 200 });
      await triggerWindowScroll();
      changes.length = 0;

      mockRect(sections.get("#a")!, { top: -100 });
      mockRect(sections.get("#b")!, { top: 5 });
      await triggerWindowScroll();

      expect(changes).toHaveLength(1);
      expect((changes[0] as CustomEvent).detail).toEqual({
        href: "#b",
        heading: "B",
      });
    });

    it("高亮边界应该由 offsetBoundary 决定", async () => {
      const { anchor, sections } = await mountAnchor(
        [
          { href: "#a", heading: "A" },
          { href: "#b", heading: "B" },
        ],
        { "offset-boundary": "100" }
      );

      mockRect(sections.get("#a")!, { top: 0 });
      mockRect(sections.get("#b")!, { top: 200 });
      await triggerWindowScroll();

      mockRect(sections.get("#a")!, { top: -200 });
      mockRect(sections.get("#b")!, { top: 50 });
      await triggerWindowScroll();

      expect(anchor.active).toBe("#b");
    });

    it("容器滚动时应该更新高亮", async () => {
      const holder = document.createElement("div");
      holder.id = "scroll-holder";
      container.appendChild(holder);

      Object.defineProperty(holder, "scrollTop", {
        value: 0,
        writable: true,
        configurable: true,
      });

      const { anchor, sections } = await mountAnchor(
        [
          { href: "#a", heading: "A" },
          { href: "#b", heading: "B" },
        ],
        { target: "#scroll-holder" }
      );

      mockRect(holder, { top: 0, height: 400 });
      mockRect(sections.get("#a")!, { top: 0 });
      mockRect(sections.get("#b")!, { top: 300 });

      holder.dispatchEvent(new Event("scroll"));
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(anchor.active).toBe("#a");

      mockRect(sections.get("#a")!, { top: -200 });
      mockRect(sections.get("#b")!, { top: 10 });

      holder.dispatchEvent(new Event("scroll"));
      await new Promise(resolve => requestAnimationFrame(resolve));

      expect(anchor.active).toBe("#b");
    });
  });

  describe("高亮判定优先级", () => {
    it("容器可滚动且已到末端时应该取最后一项", async () => {
      const { anchor, sections } = await mountAnchor([
        { href: "#a", heading: "A" },
        { href: "#b", heading: "B" },
        { href: "#c", heading: "C" },
      ]);

      mockRect(sections.get("#a")!, { top: 0 });
      mockRect(sections.get("#b")!, { top: 300 });
      mockRect(sections.get("#c")!, { top: 600 });
      await triggerWindowScroll();
      expect(anchor.active).toBe("#a");

      stubGetter(document.documentElement, "scrollHeight", 3000);
      stubGetter(window, "innerHeight", 800);
      stubGetter(window, "scrollY", 2200);

      mockRect(sections.get("#a")!, { top: 500 });
      mockRect(sections.get("#b")!, { top: 800 });
      mockRect(sections.get("#c")!, { top: 1200 });
      await triggerWindowScroll();

      expect(anchor.active).toBe("#c");
    });

    it("候选集非空但已到末端时应该优先取最后一项", async () => {
      const { anchor, sections } = await mountAnchor([
        { href: "#a", heading: "A" },
        { href: "#b", heading: "B" },
        { href: "#c", heading: "C" },
      ]);

      stubGetter(document.documentElement, "scrollHeight", 3000);
      stubGetter(window, "innerHeight", 800);
      stubGetter(window, "scrollY", 2200);

      mockRect(sections.get("#a")!, { top: -500 });
      mockRect(sections.get("#b")!, { top: 10 });
      mockRect(sections.get("#c")!, { top: 900 });
      await triggerWindowScroll();

      expect(anchor.active).toBe("#c");
    });

    it("候选集为空且短页面不可滚动时应该取第一项", async () => {
      const { anchor, sections } = await mountAnchor([
        { href: "#a", heading: "A" },
        { href: "#b", heading: "B" },
        { href: "#c", heading: "C" },
      ]);

      mockRect(sections.get("#a")!, { top: -100 });
      mockRect(sections.get("#b")!, { top: 0 });
      mockRect(sections.get("#c")!, { top: 200 });
      await triggerWindowScroll();
      expect(anchor.active).toBe("#b");

      stubGetter(document.documentElement, "scrollHeight", 400);
      stubGetter(window, "innerHeight", 800);
      stubGetter(window, "scrollY", 0);

      mockRect(sections.get("#a")!, { top: 500 });
      mockRect(sections.get("#b")!, { top: 600 });
      mockRect(sections.get("#c")!, { top: 700 });
      await triggerWindowScroll();

      expect(anchor.active).toBe("#a");
    });
  });

  describe("嵌套", () => {
    it("应该正确渲染嵌套子链接", async () => {
      const { anchor } = await mountAnchor([
        {
          href: "#parent",
          heading: "父级",
          children: [
            { href: "#child-a", heading: "子项 A" },
            { href: "#child-b", heading: "子项 B" },
          ],
        },
      ]);

      const parent = anchor.querySelector("ea-anchor-link")!;
      const children = parent.querySelectorAll("ea-anchor-link");

      expect(children).toHaveLength(2);
      expect(parent.hasAttribute("has-children")).toBe(true);
    });

    it("子级激活时父级应该联动高亮", async () => {
      const { anchor, sections } = await mountAnchor([
        {
          href: "#parent",
          heading: "父级",
          children: [{ href: "#child", heading: "子项" }],
        },
      ]);
      const links = Array.from(
        anchor.querySelectorAll("ea-anchor-link")
      ) as EaAnchorLink[];

      mockRect(sections.get("#parent")!, { top: 0 });
      mockRect(sections.get("#child")!, { top: 300 });
      await triggerWindowScroll();
      expect(anchor.active).toBe("#parent");

      mockRect(sections.get("#parent")!, { top: -200 });
      mockRect(sections.get("#child")!, { top: 5 });
      await triggerWindowScroll();

      expect(anchor.active).toBe("#child");
      expect(links[0].hasAttribute("active")).toBe(true);
      expect(links[1].hasAttribute("active")).toBe(true);
    });
  });

  describe("禁用", () => {
    it("禁用链接不应该触发滚动与点击事件", async () => {
      const { anchor, links, sections } = await mountAnchor(
        [{ href: "#a", heading: "A" }],
        { duration: "0" }
      );
      links[0].setAttribute("disabled", "");
      mockRect(sections.get("#a")!, { top: 300 });

      const clicks = captureEvents(anchor, "ea-click");
      const scrollSpy = vi.spyOn(
        anchor as unknown as { _scrollToAnchor: (href: string) => void },
        "_scrollToAnchor"
      );

      links[0].shadowRoot!.querySelector("a")!.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );

      expect(scrollSpy).not.toHaveBeenCalled();
      expect(clicks).toHaveLength(0);

      await vi.waitFor(() => {
        expect(
          links[0].shadowRoot!.querySelector("a")!.getAttribute("aria-disabled")
        ).toBe("true");
      });
    });
  });

  describe("marker", () => {
    it("marker 位置应该随激活项更新", async () => {
      const { anchor, links } = await mountAnchor(
        [
          { href: "#a", heading: "A" },
          { href: "#b", heading: "B" },
        ],
        { duration: "0" }
      );

      mockRect(anchor.shadowRoot!.querySelector("nav")!, {
        top: 0,
        left: 0,
        width: 200,
        height: 200,
      });
      mockRect(links[0].shadowRoot!.querySelector("a")!, {
        top: 30,
        left: 0,
        width: 80,
        height: 20,
      });
      mockRect(links[1].shadowRoot!.querySelector("a")!, {
        top: 80,
        left: 0,
        width: 80,
        height: 20,
      });

      anchor.scrollToAnchor("#b");
      await anchor.updateComplete;

      expect(anchor.style.getPropertyValue("--ea-anchor-marker-offset")).toBe(
        "80px"
      );
      expect(anchor.style.getPropertyValue("--ea-anchor-marker-size")).toBe(
        "20px"
      );
      expect(
        anchor
          .shadowRoot!.querySelector(".ea-anchor")!
          .classList.contains("is-marker-visible")
      ).toBe(true);

      anchor.scrollToAnchor("#a");
      await anchor.updateComplete;

      expect(anchor.style.getPropertyValue("--ea-anchor-marker-offset")).toBe(
        "30px"
      );
    });

    it("marker 为 false 时不应该显示滑块", async () => {
      const { anchor, links } = await mountAnchor([
        { href: "#a", heading: "A" },
      ]);

      mockRect(anchor.shadowRoot!.querySelector("nav")!, {
        top: 0,
        height: 100,
      });
      mockRect(links[0].shadowRoot!.querySelector("a")!, {
        top: 10,
        height: 20,
      });

      anchor.scrollToAnchor("#a");
      expect(
        anchor
          .shadowRoot!.querySelector(".ea-anchor")!
          .classList.contains("is-marker-visible")
      ).toBe(true);

      anchor.marker = false;
      await anchor.updateComplete;

      expect(
        anchor
          .shadowRoot!.querySelector(".ea-anchor")!
          .classList.contains("is-marker-visible")
      ).toBe(false);
    });
  });

  describe("事件", () => {
    it("点击链接应该派发 ea-click 事件", async () => {
      const { anchor, links, sections } = await mountAnchor(
        [{ href: "#a", heading: "A" }],
        { duration: "0" }
      );
      mockRect(sections.get("#a")!, { top: 300 });

      const clicks = captureEvents(anchor, "ea-click");

      links[0].shadowRoot!.querySelector("a")!.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );

      expect(clicks).toHaveLength(1);
      expect((clicks[0] as CustomEvent).detail).toEqual({
        href: "#a",
        heading: "A",
        targetEl: sections.get("#a"),
      });
    });

    it("ea-click 事件应该穿透 shadow boundary", async () => {
      const { anchor, links, sections } = await mountAnchor(
        [{ href: "#a", heading: "A" }],
        { duration: "0" }
      );
      mockRect(sections.get("#a")!, { top: 300 });

      const outer = captureEvents(container, "ea-click");

      links[0].shadowRoot!.querySelector("a")!.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );

      expect(outer).toHaveLength(1);
    });
  });

  describe("边界", () => {
    it("动态新增链接时应该通过 slotchange 重算", async () => {
      const { anchor, sections, links } = await mountAnchor([
        { href: "#a", heading: "A" },
      ]);
      const slot = anchor.shadowRoot!.querySelector("slot")!;

      mockRect(sections.get("#a")!, { top: 0 });
      await triggerWindowScroll();

      const newLink = document.createElement("ea-anchor-link");
      newLink.setAttribute("href", "#b");
      newLink.setAttribute("heading", "B");

      const section = document.createElement("section");
      section.id = "b";
      container.appendChild(section);
      sections.set("#b", section);

      anchor.appendChild(newLink);
      slot.dispatchEvent(new Event("slotchange"));

      expect(newLink.getAttribute("direction")).toBe("vertical");

      mockRect(sections.get("#a")!, { top: -200 });
      mockRect(section, { top: 5 });
      await triggerWindowScroll();

      expect(anchor.active).toBe("#b");
      expect(links).toHaveLength(1);
    });

    it("找不到目标区块时不应该抛错", async () => {
      const { anchor } = await mountAnchor([
        { href: "#missing", heading: "M" },
      ]);

      expect(() => anchor.scrollToAnchor("#missing")).not.toThrow();
    });
  });

  describe("无障碍", () => {
    it("默认不应该有 axe 违规", async () => {
      const { anchor } = await mountAnchor([
        { href: "#a", heading: "基础用法" },
        {
          href: "#b",
          heading: "进阶",
          children: [{ href: "#c", heading: "子项" }],
        },
      ]);

      const results = await runAxe(anchor);
      assertNoA11yViolations(results);
    });

    it("激活链接应该设置 aria-current", async () => {
      const { anchor, sections } = await mountAnchor([
        { href: "#a", heading: "A" },
        { href: "#b", heading: "B" },
      ]);

      mockRect(sections.get("#a")!, { top: 0 });
      mockRect(sections.get("#b")!, { top: 300 });
      await triggerWindowScroll();

      const activeLink = anchor.querySelector("ea-anchor-link")!;
      const anchorEl = activeLink.shadowRoot!.querySelector("a");

      expect(anchorEl?.getAttribute("aria-current")).toBe("location");

      anchor.scrollToAnchor("#b");

      await vi.waitFor(() => {
        expect(anchorEl?.getAttribute("aria-current")).toBeNull();
      });
    });

    it("链接应该使用原生 a 元素保证键盘可达", async () => {
      const { links } = await mountAnchor([{ href: "#a", heading: "A" }]);
      const anchorEl = links[0].shadowRoot!.querySelector("a");

      expect(anchorEl?.tagName.toLowerCase()).toBe("a");
      expect(anchorEl?.hasAttribute("href")).toBe(true);
    });
  });
});
