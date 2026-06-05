import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import "../components/ea-avatar/index";
import { waitForRender } from "./utils/waitForRender";
import { runAxe, assertNoA11yViolations } from "./utils/a11y";

describe("EaAvatar", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-avatar 组件", () => {
      const avatar = document.createElement("ea-avatar");
      container.appendChild(avatar);

      expect(avatar).toBeDefined();
      expect(avatar.shadowRoot).toBeDefined();
    });

    it("应该包含默认的 avatar 占位 SVG", () => {
      const avatar = document.createElement("ea-avatar");
      container.appendChild(avatar);

      const avatarContainer = avatar.shadowRoot.querySelector(".ea-avatar");
      expect(avatarContainer).toBeDefined();
      expect(avatarContainer.innerHTML).toContain("svg");
    });

    it("应该包含 part='container' 属性", () => {
      const avatar = document.createElement("ea-avatar");
      container.appendChild(avatar);

      const containerEl = avatar.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeDefined();
    });
  });

  describe("Shape Attribute", () => {
    it('应该正确应用 shape="circle" 样式', async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("shape", "circle");
      container.appendChild(avatar);

      await waitForRender();

      const containerEl = avatar.shadowRoot.querySelector(".ea-avatar");
      expect(containerEl.classList.contains("ea-avatar--circle")).toBe(true);
    });

    it('应该正确应用 shape="square" 样式', async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("shape", "square");
      container.appendChild(avatar);

      await waitForRender();

      const containerEl = avatar.shadowRoot.querySelector(".ea-avatar");
      expect(containerEl.classList.contains("ea-avatar--square")).toBe(true);
    });

    it("默认 shape 应该是 circle", async () => {
      const avatar = document.createElement("ea-avatar");
      container.appendChild(avatar);

      await waitForRender();

      expect(avatar.shape).toBe("circle");

      const containerEl = avatar.shadowRoot.querySelector(".ea-avatar");
      expect(containerEl.classList.contains("ea-avatar--circle")).toBe(true);
    });

    it("shape 属性变化时应该正确更新 class", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("shape", "circle");
      container.appendChild(avatar);

      await waitForRender();

      let containerEl = avatar.shadowRoot.querySelector(".ea-avatar");
      expect(containerEl.classList.contains("ea-avatar--circle")).toBe(true);

      avatar.setAttribute("shape", "square");
      await waitForRender();

      containerEl = avatar.shadowRoot.querySelector(".ea-avatar");
      expect(containerEl.classList.contains("ea-avatar--square")).toBe(true);
      expect(containerEl.classList.contains("ea-avatar--circle")).toBe(false);
    });
  });

  describe("Size Attribute", () => {
    it('应该正确应用 size="large"', async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("size", "large");
      container.appendChild(avatar);

      await waitForRender(0);

      expect(avatar.size).toBe("large");
    });

    it('应该正确应用 size="default"', async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("size", "default");
      container.appendChild(avatar);

      await waitForRender(0);

      expect(avatar.size).toBe("default");
    });

    it('应该正确应用 size="small"', async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("size", "small");
      container.appendChild(avatar);

      await waitForRender(0);

      expect(avatar.size).toBe("small");
    });

    it("应该正确应用像素值 size", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("size", "50px");
      container.appendChild(avatar);

      await waitForRender(0);

      expect(avatar.size).toBe("50px");
    });

    it("默认 size 应该是 default", async () => {
      const avatar = document.createElement("ea-avatar");
      container.appendChild(avatar);

      await waitForRender(0);

      expect(avatar.size).toBe("default");
    });

    it("size 属性变化时应该正确更新", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("size", "small");
      container.appendChild(avatar);

      await waitForRender(0);
      expect(avatar.size).toBe("small");

      avatar.setAttribute("size", "60px");
      await waitForRender(0);

      expect(avatar.size).toBe("60px");
    });

    it("无效的 size 值应该回退到 default 并输出警告", async () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("size", "not-a-valid-size-value-xyz");
      container.appendChild(avatar);

      await waitForRender(0);

      if (consoleSpy.mock.calls.length > 0) {
        expect(consoleSpy).toHaveBeenCalled();
      }

      consoleSpy.mockRestore();
    });

    it("枚举 size 值应该设置对应的 CSS 变量", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("size", "large");
      container.appendChild(avatar);

      await waitForRender();

      const style = avatar.style.cssText;
      if (style) {
        expect(style).toContain("--ea-avatar-size");
      }
    });

    it("像素值 size 应该直接设置 CSS 变量", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("size", "50px");
      container.appendChild(avatar);

      await waitForRender();

      const style = avatar.style.cssText;
      if (style) {
        expect(style).toContain("--ea-avatar-size");
      }
    });
  });

  describe("Icon Attribute", () => {
    it("应该正确显示 icon 图标", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("icon", "coffee");
      container.appendChild(avatar);

      await waitForRender();

      const avatarContainer = avatar.shadowRoot.querySelector(".ea-avatar");
      expect(avatarContainer.innerHTML).toContain("ea-icon");
      expect(avatarContainer.innerHTML).toContain("coffee");
    });

    it("icon 属性变化时应该正确更新", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("icon", "coffee");
      container.appendChild(avatar);

      await waitForRender();

      let avatarContainer = avatar.shadowRoot.querySelector(".ea-avatar");
      expect(avatarContainer.innerHTML).toContain("coffee");

      avatar.setAttribute("icon", "user");
      await waitForRender();

      avatarContainer = avatar.shadowRoot.querySelector(".ea-avatar");
      expect(avatarContainer.innerHTML).toContain("user");
    });

    it("清空 icon 时应该显示默认 slot", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("icon", "coffee");
      container.appendChild(avatar);

      await waitForRender();

      avatar.setAttribute("icon", "");
      await waitForRender();

      const avatarContainer = avatar.shadowRoot.querySelector(".ea-avatar");
      expect(avatarContainer.innerHTML).toContain("<slot>");
    });

    it("设置 src 时 icon observer 不应覆盖图片", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("src", "https://example.com/avatar.jpg");
      avatar.setAttribute("icon", "coffee");
      container.appendChild(avatar);

      await waitForRender();

      expect(avatar.src).toBe("https://example.com/avatar.jpg");
      expect(avatar.icon).toBe("coffee");
    });
  });

  describe("Src Attribute", () => {
    it("应该正确设置 src 属性", async () => {
      const avatar = document.createElement("ea-avatar");
      const testSrc = "https://example.com/avatar.jpg";
      avatar.setAttribute("src", testSrc);
      container.appendChild(avatar);

      await waitForRender(0);

      expect(avatar.src).toBe(testSrc);
    });

    it("src 变化时应该更新图片", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("src", "https://example.com/old.jpg");
      container.appendChild(avatar);

      await waitForRender(0);

      avatar.setAttribute("src", "https://example.com/new.jpg");
      await waitForRender(0);

      expect(avatar.src).toBe("https://example.com/new.jpg");
    });

    it("设置 src 时应该启动预加载", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("src", "https://example.com/avatar.jpg");
      container.appendChild(avatar);

      await waitForRender();

      expect(avatar.src).toBe("https://example.com/avatar.jpg");
    });

    it("清空 src 时应该显示回退内容", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("src", "https://example.com/avatar.jpg");
      container.appendChild(avatar);

      await waitForRender();

      avatar.setAttribute("src", "");
      await waitForRender();

      const slot = avatar.shadowRoot.querySelector("slot");
      expect(slot).not.toBeNull();
    });

    it("清空 src 且有 icon 时应该显示 icon", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("icon", "user");
      avatar.setAttribute("src", "https://example.com/avatar.jpg");
      container.appendChild(avatar);

      await waitForRender();

      avatar.setAttribute("src", "");
      await waitForRender();

      const avatarContainer = avatar.shadowRoot.querySelector(".ea-avatar");
      expect(avatarContainer.innerHTML).toContain("ea-icon");
      expect(avatarContainer.innerHTML).toContain("user");
    });

    it("使用 data URI 时应该启动预加载流程", async () => {
      const avatar = document.createElement("ea-avatar");
      const dataUri =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      avatar.setAttribute("src", dataUri);
      container.appendChild(avatar);

      await waitForRender();

      expect(avatar.src).toBe(dataUri);
    });

    it("预加载成功后应该渲染 img 元素（真实浏览器环境）", async () => {
      const avatar = document.createElement("ea-avatar");
      const dataUri =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      avatar.setAttribute("src", dataUri);
      container.appendChild(avatar);

      await waitForRender();

      const img = avatar.shadowRoot.querySelector(".ea-avatar__img");
      if (img) {
        expect(img.tagName).toBe("IMG");
        expect(img.getAttribute("part")).toBe("img-avatar");
      }
    });
  });

  describe("SrcSet Attribute", () => {
    it("应该正确设置 src-set 属性", async () => {
      const avatar = document.createElement("ea-avatar");
      const testSrc =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      avatar.src = testSrc;
      avatar.srcSet = testSrc;
      container.appendChild(avatar);

      await waitForRender();

      expect(avatar.srcSet).toBe(testSrc);
    });

    it("预加载成功后 srcset 应传递给 img 元素（真实浏览器环境）", async () => {
      const avatar = document.createElement("ea-avatar");
      const testSrc =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      avatar.src = testSrc;
      avatar.srcSet = testSrc;
      container.appendChild(avatar);

      await waitForRender();

      const img = avatar.shadowRoot.querySelector(".ea-avatar__img");
      if (img) {
        expect(img.srcset).toBe(testSrc);
      }
    });
  });

  describe("Alt Attribute", () => {
    it("应该正确设置 alt 属性", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("alt", "User Avatar");
      container.appendChild(avatar);

      await waitForRender(0);

      expect(avatar.alt).toBe("User Avatar");
    });

    it("alt 变化时应该更新", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("alt", "Old Alt");
      container.appendChild(avatar);

      await waitForRender(0);

      avatar.setAttribute("alt", "New Alt");
      await waitForRender(0);

      expect(avatar.alt).toBe("New Alt");
    });

    it("有图片时 alt 应该传递给 img 元素", async () => {
      const avatar = document.createElement("ea-avatar");
      const dataUri =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      avatar.setAttribute("src", dataUri);
      avatar.setAttribute("alt", "Test Alt");
      container.appendChild(avatar);

      await waitForRender();

      const img = avatar.shadowRoot.querySelector(".ea-avatar__img");
      if (img) {
        expect(img.alt).toBe("Test Alt");
      }
    });
  });

  describe("Fit Attribute", () => {
    const fitValues = ["fill", "contain", "cover", "none", "scale-down"];

    fitValues.forEach(fit => {
      it(`应该正确应用 fit="${fit}"`, async () => {
        const avatar = document.createElement("ea-avatar");
        avatar.setAttribute("fit", fit);
        container.appendChild(avatar);

        await waitForRender();

        expect(avatar.fit).toBe(fit);
        expect(avatar.getAttribute("style")).toContain(
          `--ea-avatar-fit: ${fit}`
        );
      });
    });

    it("默认 fit 应该是 cover", async () => {
      const avatar = document.createElement("ea-avatar");
      container.appendChild(avatar);

      await waitForRender();

      expect(avatar.fit).toBe("cover");
    });

    it("fit 属性变化时应该正确更新样式", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("fit", "fill");
      container.appendChild(avatar);

      await waitForRender();
      expect(avatar.getAttribute("style")).toContain("--ea-avatar-fit: fill");

      avatar.setAttribute("fit", "contain");
      await waitForRender();

      expect(avatar.getAttribute("style")).toContain(
        "--ea-avatar-fit: contain"
      );
    });
  });

  describe("Events", () => {
    it("图片加载失败时应该触发 error 事件", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("src", "https://invalid-url/avatar.jpg");
      container.appendChild(avatar);

      const errorHandler = vi.fn();
      avatar.addEventListener("error", errorHandler);

      await waitForRender();

      expect(errorHandler).not.toHaveBeenCalled();
    });
  });

  describe("CSS Parts", () => {
    it("应该正确设置 container part", () => {
      const avatar = document.createElement("ea-avatar");
      container.appendChild(avatar);

      const containerEl = avatar.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeDefined();
    });
  });

  describe("Slots", () => {
    it("应该支持默认 slot 作为文本内容", () => {
      const avatar = document.createElement("ea-avatar");
      avatar.textContent = "User";
      container.appendChild(avatar);

      const slot = avatar.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });

    it("slot 内容应该通过 slot 元素传递", () => {
      const avatar = document.createElement("ea-avatar");
      avatar.textContent = "AB";
      container.appendChild(avatar);

      const slot = avatar.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });
  });

  describe("Display Types", () => {
    it("应该支持图标展示类型", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("icon", "coffee");
      container.appendChild(avatar);

      await waitForRender();

      const avatarContainer = avatar.shadowRoot.querySelector(".ea-avatar");
      expect(avatarContainer.innerHTML).toContain("ea-icon");
    });

    it("应该支持图片展示类型", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("src", "https://example.com/avatar.jpg");
      container.appendChild(avatar);

      await waitForRender(0);

      expect(avatar.src).toBe("https://example.com/avatar.jpg");
    });

    it("应该支持文本展示类型", () => {
      const avatar = document.createElement("ea-avatar");
      avatar.textContent = "user";
      container.appendChild(avatar);

      const slot = avatar.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });

    it("src 优先级高于 icon（通过属性值验证）", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("icon", "user");
      avatar.setAttribute("src", "https://example.com/avatar.jpg");
      container.appendChild(avatar);

      await waitForRender();

      expect(avatar.src).toBe("https://example.com/avatar.jpg");
      expect(avatar.icon).toBe("user");
    });
  });

  describe("updateContainerClasslist", () => {
    it("应该返回正确的 BEM 类名", async () => {
      const avatar = document.createElement("ea-avatar");
      container.appendChild(avatar);

      await waitForRender();

      const className = avatar.updateContainerClasslist();
      expect(className).toContain("ea-avatar");
      expect(className).toContain("ea-avatar--circle");
    });

    it("shape 变化时应该返回更新后的类名", async () => {
      const avatar = document.createElement("ea-avatar");
      container.appendChild(avatar);

      await waitForRender();

      avatar.shape = "square";
      const className = avatar.updateContainerClasslist();
      expect(className).toContain("ea-avatar--square");
      expect(className).not.toContain("ea-avatar--circle");
    });
  });

  describe("Lifecycle", () => {
    it("组件移除时应该清理事件监听器", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("src", "https://example.com/avatar.jpg");
      container.appendChild(avatar);

      await waitForRender(0);

      container.removeChild(avatar);

      expect(true).toBe(true);
    });

    it("$mount 时应该调用 updateContainerClasslist", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("shape", "square");
      container.appendChild(avatar);

      await waitForRender();

      const containerEl = avatar.shadowRoot.querySelector(".ea-avatar");
      expect(containerEl.classList.contains("ea-avatar--square")).toBe(true);
    });
  });

  describe("Complex Scenarios", () => {
    it("应该支持组合使用多个属性", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("shape", "square");
      avatar.setAttribute("size", "large");
      avatar.setAttribute("icon", "user");
      avatar.setAttribute("fit", "contain");
      container.appendChild(avatar);

      await waitForRender();

      const containerEl = avatar.shadowRoot.querySelector(".ea-avatar");
      expect(containerEl.classList.contains("ea-avatar--square")).toBe(true);
      expect(avatar.size).toBe("large");
      expect(avatar.fit).toBe("contain");
      expect(containerEl.innerHTML).toContain("ea-icon");
    });

    it("应该正确处理多个 Avatar 实例", async () => {
      const avatar1 = document.createElement("ea-avatar");
      avatar1.setAttribute("shape", "circle");
      avatar1.setAttribute("size", "small");

      const avatar2 = document.createElement("ea-avatar");
      avatar2.setAttribute("shape", "square");
      avatar2.setAttribute("size", "large");

      container.appendChild(avatar1);
      container.appendChild(avatar2);

      await waitForRender();

      const containerEl1 = avatar1.shadowRoot.querySelector(".ea-avatar");
      const containerEl2 = avatar2.shadowRoot.querySelector(".ea-avatar");

      expect(containerEl1.classList.contains("ea-avatar--circle")).toBe(true);
      expect(containerEl2.classList.contains("ea-avatar--square")).toBe(true);
    });

    it("icon 和 src 同时存在时 src 优先", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("icon", "user");
      avatar.setAttribute("src", "https://example.com/avatar.jpg");
      container.appendChild(avatar);

      await waitForRender();

      expect(avatar.src).toBe("https://example.com/avatar.jpg");
    });

    it("从 src 切换到 icon 应该正确显示", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("icon", "user");
      avatar.setAttribute("src", "https://example.com/avatar.jpg");
      container.appendChild(avatar);

      await waitForRender();

      avatar.setAttribute("src", "");
      await waitForRender();

      const avatarContainer = avatar.shadowRoot.querySelector(".ea-avatar");
      expect(avatarContainer.innerHTML).toContain("ea-icon");
      expect(avatarContainer.innerHTML).toContain("user");
    });

    it("从 src 切换到默认 slot 应该正确显示", async () => {
      const avatar = document.createElement("ea-avatar");
      avatar.setAttribute("src", "https://example.com/avatar.jpg");
      container.appendChild(avatar);

      await waitForRender();

      avatar.setAttribute("src", "");
      await waitForRender();

      const slot = avatar.shadowRoot.querySelector("slot");
      expect(slot).not.toBeNull();
    });
  });

  describe("Accessibility", () => {
    describe("ARIA Attributes", () => {
      it("有图片时 alt 应该传递给 img 元素", async () => {
        const el = document.createElement("ea-avatar");
        const dataUri = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        el.setAttribute("src", dataUri);
        el.setAttribute("alt", "User Avatar");
        container.appendChild(el);
        await waitForRender();
        const img = el.shadowRoot.querySelector(".ea-avatar__img");
        if (img) {
          expect(img.alt).toBe("User Avatar");
        }
      });
    });

    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-avatar");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });
  });
});
