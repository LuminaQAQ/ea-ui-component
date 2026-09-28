import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitForRender } from "./utils/waitForRender";
import { runAxe, assertNoA11yViolations } from "./utils/a11y";

import "../components/ea-container/index";

describe("EaContainer", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("基础渲染", () => {
    it("应该正确渲染 ea-container 组件", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot).toBeTruthy();
      expect(el.shadowRoot.querySelector(".ea-container")).toBeTruthy();
    });

    it("应该正确渲染 ea-header 组件", async () => {
      const el = document.createElement("ea-header");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot).toBeTruthy();
      expect(el.shadowRoot.querySelector(".ea-header")).toBeTruthy();
    });

    it("应该正确渲染 ea-main 组件", async () => {
      const el = document.createElement("ea-main");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot).toBeTruthy();
      expect(el.shadowRoot.querySelector(".ea-main")).toBeTruthy();
    });

    it("应该正确渲染 ea-footer 组件", async () => {
      const el = document.createElement("ea-footer");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot).toBeTruthy();
      expect(el.shadowRoot.querySelector(".ea-footer")).toBeTruthy();
    });

    it("应该正确渲染 ea-aside 组件", async () => {
      const el = document.createElement("ea-aside");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot).toBeTruthy();
      expect(el.shadowRoot.querySelector(".ea-aside")).toBeTruthy();
    });
  });

  describe("CSS Part", () => {
    it("ea-container 应该支持 container part", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("ea-header 应该支持 container part", async () => {
      const el = document.createElement("ea-header");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("ea-main 应该支持 container part", async () => {
      const el = document.createElement("ea-main");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("ea-footer 应该支持 container part", async () => {
      const el = document.createElement("ea-footer");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("ea-aside 应该支持 container part", async () => {
      const el = document.createElement("ea-aside");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });
  });

  describe("direction 属性", () => {
    it("默认 direction 应该是 horizontal", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("horizontal");
    });

    it("应该支持设置 direction 为 vertical", async () => {
      const el = document.createElement("ea-container");
      el.setAttribute("direction", "vertical");
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("vertical");
    });

    it("应该支持设置 direction 为 horizontal", async () => {
      const el = document.createElement("ea-container");
      el.setAttribute("direction", "horizontal");
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("horizontal");
    });

    it("direction 变化时应该更新容器类名", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-container");
      expect(containerEl.classList.contains("ea-container--horizontal")).toBe(true);

      el.setAttribute("direction", "vertical");
      await waitForRender();

      expect(containerEl.classList.contains("ea-container--vertical")).toBe(true);
      expect(containerEl.classList.contains("ea-container--horizontal")).toBe(false);
    });
  });

  describe("自动方向检测", () => {
    it("包含 ea-header 时应该自动设置为 vertical 方向", async () => {
      const el = document.createElement("ea-container");
      const header = document.createElement("ea-header");
      el.appendChild(header);
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("vertical");
    });

    it("包含 ea-footer 时应该自动设置为 vertical 方向", async () => {
      const el = document.createElement("ea-container");
      const footer = document.createElement("ea-footer");
      el.appendChild(footer);
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("vertical");
    });

    it("同时包含 ea-header 和 ea-footer 时应该自动设置为 vertical 方向", async () => {
      const el = document.createElement("ea-container");
      const header = document.createElement("ea-header");
      const footer = document.createElement("ea-footer");
      el.appendChild(header);
      el.appendChild(footer);
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("vertical");
    });

    it("不包含 ea-header 或 ea-footer 时应该保持 horizontal 方向", async () => {
      const el = document.createElement("ea-container");
      const aside = document.createElement("ea-aside");
      const main = document.createElement("ea-main");
      el.appendChild(aside);
      el.appendChild(main);
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("horizontal");
    });

    it("显式设置 direction 属性后不应该自动改变方向", async () => {
      const el = document.createElement("ea-container");
      el.setAttribute("direction", "horizontal");
      const header = document.createElement("ea-header");
      el.appendChild(header);
      container.appendChild(el);

      await waitForRender();

      expect(el.getAttribute("direction")).toBe("horizontal");
    });

    it("动态添加 ea-header 后应该自动改变方向", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("horizontal");

      const header = document.createElement("ea-header");
      el.appendChild(header);

      await waitForRender();

      expect(el.direction).toBe("vertical");
    });

    it("动态移除 ea-header 后应该恢复方向", async () => {
      const el = document.createElement("ea-container");
      const header = document.createElement("ea-header");
      el.appendChild(header);
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("vertical");

      header.remove();

      await waitForRender();

      expect(["horizontal", "vertical"].includes(el.direction)).toBe(true);
    });
  });

  describe("header height 属性", () => {
    it("默认 header height 应该是 60px", async () => {
      const el = document.createElement("ea-header");
      container.appendChild(el);

      await waitForRender();

      expect(el.height).toBe("60px");
    });

    it("应该支持自定义 header height", async () => {
      const el = document.createElement("ea-header");
      el.setAttribute("height", "100px");
      container.appendChild(el);

      await waitForRender();

      expect(el.height).toBe("100px");
    });

    it("应该支持 header height 为 auto", async () => {
      const el = document.createElement("ea-header");
      el.setAttribute("height", "auto");
      container.appendChild(el);

      await waitForRender();

      expect(el.height).toBe("auto");
    });

    it("无效的 height 值时应该通过 CSS.supports 校验回退", async () => {
      const el = document.createElement("ea-header");
      el.setAttribute("height", "invalid");
      container.appendChild(el);

      await waitForRender();

      expect(el.height).toBe("invalid");
    });

    it("空 height 值应该设置为 auto", async () => {
      const el = document.createElement("ea-header");
      el.setAttribute("height", "");
      container.appendChild(el);

      await waitForRender();

      expect(el.style.getPropertyValue("--ea-header-height")).toBe("auto");
    });

    it("应该支持 height 动态更新", async () => {
      const el = document.createElement("ea-header");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("height", "100px");
      await waitForRender();

      expect(el.height).toBe("100px");
    });
  });

  describe("footer height 属性", () => {
    it("默认 footer height 应该是 60px", async () => {
      const el = document.createElement("ea-footer");
      container.appendChild(el);

      await waitForRender();

      expect(el.height).toBe("60px");
    });

    it("应该支持自定义 footer height", async () => {
      const el = document.createElement("ea-footer");
      el.setAttribute("height", "80px");
      container.appendChild(el);

      await waitForRender();

      expect(el.height).toBe("80px");
    });

    it("无效的 height 值时应该通过 CSS.supports 校验回退", async () => {
      const el = document.createElement("ea-footer");
      el.setAttribute("height", "invalid");
      container.appendChild(el);

      await waitForRender();

      expect(el.height).toBe("invalid");
    });

    it("空 height 值应该设置为 auto", async () => {
      const el = document.createElement("ea-footer");
      el.setAttribute("height", "");
      container.appendChild(el);

      await waitForRender();

      expect(el.style.getPropertyValue("--ea-footer-height")).toBe("auto");
    });

    it("应该支持 height 动态更新", async () => {
      const el = document.createElement("ea-footer");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("height", "100px");
      await waitForRender();

      expect(el.height).toBe("100px");
    });
  });

  describe("aside width 属性", () => {
    it("默认 aside width 应该是 300px", async () => {
      const el = document.createElement("ea-aside");
      container.appendChild(el);

      await waitForRender();

      expect(el.width).toBe("300px");
    });

    it("应该支持自定义 aside width", async () => {
      const el = document.createElement("ea-aside");
      el.setAttribute("width", "200px");
      container.appendChild(el);

      await waitForRender();

      expect(el.width).toBe("200px");
    });

    it("应该支持 aside width 为百分比", async () => {
      const el = document.createElement("ea-aside");
      el.setAttribute("width", "20%");
      container.appendChild(el);

      await waitForRender();

      expect(el.width).toBe("20%");
    });

    it("应该支持 width 动态更新", async () => {
      const el = document.createElement("ea-aside");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("width", "250px");
      await waitForRender();

      expect(el.width).toBe("250px");
    });
  });

  describe("布局组合", () => {
    it("应该支持 Header + Main 布局", async () => {
      const el = document.createElement("ea-container");
      const header = document.createElement("ea-header");
      header.textContent = "Header";
      const main = document.createElement("ea-main");
      main.textContent = "Main";

      el.appendChild(header);
      el.appendChild(main);
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("vertical");
      expect(el.querySelector("ea-header")).toBeTruthy();
      expect(el.querySelector("ea-main")).toBeTruthy();
    });

    it("应该支持 Header + Main + Footer 布局", async () => {
      const el = document.createElement("ea-container");
      const header = document.createElement("ea-header");
      const main = document.createElement("ea-main");
      const footer = document.createElement("ea-footer");

      el.appendChild(header);
      el.appendChild(main);
      el.appendChild(footer);
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("vertical");
      expect(el.querySelector("ea-header")).toBeTruthy();
      expect(el.querySelector("ea-main")).toBeTruthy();
      expect(el.querySelector("ea-footer")).toBeTruthy();
    });

    it("应该支持 Aside + Main 水平布局", async () => {
      const el = document.createElement("ea-container");
      el.setAttribute("direction", "horizontal");
      const aside = document.createElement("ea-aside");
      const main = document.createElement("ea-main");

      el.appendChild(aside);
      el.appendChild(main);
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("horizontal");
      expect(el.querySelector("ea-aside")).toBeTruthy();
      expect(el.querySelector("ea-main")).toBeTruthy();
    });

    it("应该支持嵌套布局", async () => {
      const outer = document.createElement("ea-container");
      const header = document.createElement("ea-header");
      const inner = document.createElement("ea-container");
      inner.setAttribute("direction", "horizontal");
      const aside = document.createElement("ea-aside");
      const main = document.createElement("ea-main");

      inner.appendChild(aside);
      inner.appendChild(main);
      outer.appendChild(header);
      outer.appendChild(inner);
      container.appendChild(outer);

      await waitForRender();

      expect(outer.direction).toBe("vertical");
      expect(inner.direction).toBe("horizontal");
    });

    it("应该支持多个 Aside 的水平布局", async () => {
      const el = document.createElement("ea-container");
      el.setAttribute("direction", "horizontal");
      const aside1 = document.createElement("ea-aside");
      const main = document.createElement("ea-main");
      const aside2 = document.createElement("ea-aside");

      el.appendChild(aside1);
      el.appendChild(main);
      el.appendChild(aside2);
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("horizontal");
      expect(el.querySelectorAll("ea-aside").length).toBe(2);
    });
  });

  describe("Slot 内容", () => {
    it("ea-header 应该支持 slot 内容", async () => {
      const el = document.createElement("ea-header");
      el.innerHTML = "<span>Header Content</span>";
      container.appendChild(el);

      await waitForRender();

      const slot = el.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("ea-main 应该支持 slot 内容", async () => {
      const el = document.createElement("ea-main");
      el.innerHTML = "<div>Main Content</div>";
      container.appendChild(el);

      await waitForRender();

      const slot = el.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("ea-aside 应该支持 slot 内容", async () => {
      const el = document.createElement("ea-aside");
      el.innerHTML = "<nav>Aside Content</nav>";
      container.appendChild(el);

      await waitForRender();

      const slot = el.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("ea-footer 应该支持 slot 内容", async () => {
      const el = document.createElement("ea-footer");
      el.innerHTML = "<span>Footer Content</span>";
      container.appendChild(el);

      await waitForRender();

      const slot = el.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("ea-container 应该支持 slot 内容", async () => {
      const el = document.createElement("ea-container");
      const main = document.createElement("ea-main");
      el.appendChild(main);
      container.appendChild(el);

      await waitForRender();

      const slot = el.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  describe("BEM 类名", () => {
    it("ea-container 默认应该有 ea-container--horizontal 修饰符类名", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-container");
      expect(containerEl.classList.contains("ea-container")).toBe(true);
      expect(containerEl.classList.contains("ea-container--horizontal")).toBe(true);
    });

    it("ea-container 设置 vertical 后应该有 ea-container--vertical 修饰符类名", async () => {
      const el = document.createElement("ea-container");
      el.setAttribute("direction", "vertical");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-container");
      expect(containerEl.classList.contains("ea-container--vertical")).toBe(true);
    });

    it("ea-header 应该有 ea-header 块类名", async () => {
      const el = document.createElement("ea-header");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector(".ea-header")).toBeTruthy();
    });

    it("ea-main 应该有 ea-main 块类名", async () => {
      const el = document.createElement("ea-main");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector(".ea-main")).toBeTruthy();
    });

    it("ea-footer 应该有 ea-footer 块类名", async () => {
      const el = document.createElement("ea-footer");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector(".ea-footer")).toBeTruthy();
    });

    it("ea-aside 应该有 ea-aside 块类名", async () => {
      const el = document.createElement("ea-aside");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector(".ea-aside")).toBeTruthy();
    });
  });

  describe("边界条件", () => {
    it("应该处理空 container", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot).toBeTruthy();
      expect(el.direction).toBe("horizontal");
    });

    it("应该处理只有文本内容的 container", async () => {
      const el = document.createElement("ea-container");
      el.textContent = "Text content";
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe("生命周期", () => {
    it("组件连接后应该正确初始化", async () => {
      const el = document.createElement("ea-container");
      el.setAttribute("direction", "vertical");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot).toBeTruthy();
      expect(el.direction).toBe("vertical");
    });

    it("组件断开连接后应该正常移除", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await waitForRender();

      el.remove();

      expect(el.isConnected).toBe(false);
    });

    it("应该支持 direction 动态更新", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("horizontal");

      el.setAttribute("direction", "vertical");
      await waitForRender();

      expect(el.direction).toBe("vertical");
    });
  });

  describe("updateContainerClasslist 方法", () => {
    it("应该返回正确的 BEM 类名字符串", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await waitForRender();

      const className = el.updateContainerClasslist();
      expect(className).toContain("ea-container");
      expect(className).toContain("ea-container--horizontal");
    });

    it("direction 为 vertical 时应该返回 vertical 修饰符", async () => {
      const el = document.createElement("ea-container");
      el.setAttribute("direction", "vertical");
      container.appendChild(el);

      await waitForRender();

      const className = el.updateContainerClasslist();
      expect(className).toContain("ea-container--vertical");
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("ea-header 设置 label 时应该有 aria-label", async () => {
        const header = document.createElement("ea-header");
        header.setAttribute("label", "Site header");
        container.appendChild(header);
        await waitForRender();
        const headerEl = header.shadowRoot.querySelector(".ea-header");
        expect(headerEl.getAttribute("aria-label")).toBe("Site header");
      });

      it("ea-header 未设置 label 时不应该有 aria-label", async () => {
        const header = document.createElement("ea-header");
        container.appendChild(header);
        await waitForRender();
        const headerEl = header.shadowRoot.querySelector(".ea-header");
        expect(headerEl.hasAttribute("aria-label")).toBe(false);
      });

      it("ea-footer 设置 label 时应该有 aria-label", async () => {
        const footer = document.createElement("ea-footer");
        footer.setAttribute("label", "Site footer");
        container.appendChild(footer);
        await waitForRender();
        const footerEl = footer.shadowRoot.querySelector(".ea-footer");
        expect(footerEl.getAttribute("aria-label")).toBe("Site footer");
      });

      it("ea-footer 未设置 label 时不应该有 aria-label", async () => {
        const footer = document.createElement("ea-footer");
        container.appendChild(footer);
        await waitForRender();
        const footerEl = footer.shadowRoot.querySelector(".ea-footer");
        expect(footerEl.hasAttribute("aria-label")).toBe(false);
      });

      it("ea-aside 设置 label 时应该有 aria-label", async () => {
        const aside = document.createElement("ea-aside");
        aside.setAttribute("label", "Sidebar navigation");
        container.appendChild(aside);
        await waitForRender();
        const asideEl = aside.shadowRoot.querySelector(".ea-aside");
        expect(asideEl.getAttribute("aria-label")).toBe("Sidebar navigation");
      });

      it("ea-aside 未设置 label 时不应该有 aria-label", async () => {
        const aside = document.createElement("ea-aside");
        container.appendChild(aside);
        await waitForRender();
        const asideEl = aside.shadowRoot.querySelector(".ea-aside");
        expect(asideEl.hasAttribute("aria-label")).toBe(false);
      });

      it("ea-main 设置 label 时应该有 aria-label", async () => {
        const main = document.createElement("ea-main");
        main.setAttribute("label", "Main content");
        container.appendChild(main);
        await waitForRender();
        const mainEl = main.shadowRoot.querySelector(".ea-main");
        expect(mainEl.getAttribute("aria-label")).toBe("Main content");
      });

      it("ea-main 未设置 label 时不应该有 aria-label", async () => {
        const main = document.createElement("ea-main");
        container.appendChild(main);
        await waitForRender();
        const mainEl = main.shadowRoot.querySelector(".ea-main");
        expect(mainEl.hasAttribute("aria-label")).toBe(false);
      });
    });
  });
});
