import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";
import { runAxe, assertNoA11yViolations } from "./utils/a11y";

import "../components/ea-loading/index";

describe("EaLoading", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    vi.useRealTimers();
    document.body.style.overflow = "";
    document.querySelectorAll("ea-loading").forEach(el => el.remove());
  });

  describe("Basic Rendering", () => {
    it("应该正确渲染 ea-loading 组件", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      expect(loading).toBeDefined();
      expect(loading.shadowRoot).toBeDefined();
    });

    it("应该包含 .ea-loading 容器元素", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl).not.toBeNull();
    });

    it("应该包含 mask 元素", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const mask = loading.shadowRoot.querySelector(".ea-loading__mask");
      expect(mask).not.toBeNull();
    });

    it("应该包含 spinner 元素", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const spinner = loading.shadowRoot.querySelector(".ea-loading__spinner");
      expect(spinner).not.toBeNull();
    });

    it("应该包含 text 元素", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const text = loading.shadowRoot.querySelector(".ea-loading__text");
      expect(text).not.toBeNull();
    });

    it("应该包含 content 元素", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const content = loading.shadowRoot.querySelector(".ea-loading__content");
      expect(content).not.toBeNull();
    });

    it("spinner 应该是 ea-icon 元素", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const spinner = loading.shadowRoot.querySelector(".ea-loading__spinner");
      expect(spinner.tagName.toLowerCase()).toBe("ea-icon");
    });

    it("spinner 应该有 spin 属性", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const spinner = loading.shadowRoot.querySelector(".ea-loading__spinner");
      expect(spinner.hasAttribute("spin")).toBe(true);
    });
  });

  describe("Slots", () => {
    it("应该支持默认 slot", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const defaultSlot = loading.shadowRoot.querySelector(
        ".ea-loading__content slot"
      );
      expect(defaultSlot).not.toBeNull();
    });

    it("应该支持 spinner slot", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const spinnerSlot = loading.shadowRoot.querySelector(
        '.ea-loading__mask slot[name="spinner"]'
      );
      expect(spinnerSlot).not.toBeNull();
    });

    it("默认 slot 应该在 content 元素内", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const content = loading.shadowRoot.querySelector(".ea-loading__content");
      const defaultSlot = content.querySelector("slot:not([name])");
      expect(defaultSlot).not.toBeNull();
    });

    it("spinner slot 应该在 mask 元素内", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const mask = loading.shadowRoot.querySelector(".ea-loading__mask");
      const spinnerSlot = mask.querySelector('slot[name="spinner"]');
      expect(spinnerSlot).not.toBeNull();
    });
  });

  describe("Loading Attribute", () => {
    it("默认 loading 应该是 false", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.loading).toBe(false);
    });

    it("设置 loading 后应该添加 is-loading 状态 class", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("is-loading")).toBe(true);
    });

    it("loading 为 false 时不应有 is-loading 状态 class", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("is-loading")).toBe(false);
    });

    it("loading 变化时应该正确更新 class", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("is-loading")).toBe(false);

      loading.setAttribute("loading", "");
      await waitForRender();

      expect(containerEl.classList.contains("is-loading")).toBe(true);
    });

    it("loading 从 true 变为 false 时应该移除 is-loading class", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("is-loading")).toBe(true);

      loading.loading = false;
      await waitForRender();

      expect(containerEl.classList.contains("is-loading")).toBe(false);
    });
  });

  describe("Spinner Attribute", () => {
    it("默认 spinner 应该是 spinner", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.spinner).toBe("spinner");
    });

    it("应该正确设置 spinner 属性", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("spinner", "circle-notch");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.spinner).toBe("circle-notch");
    });

    it("spinner 属性应该传递给 ea-icon 的 name 属性", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("spinner", "circle-notch");
      container.appendChild(loading);

      await waitForRender();

      const spinner = loading.shadowRoot.querySelector(".ea-loading__spinner");
      expect(spinner.getAttribute("name")).toBe("circle-notch");
    });

    it("spinner 变化时应该更新 ea-icon 的 name 属性", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      const spinner = loading.shadowRoot.querySelector(".ea-loading__spinner");
      expect(spinner.getAttribute("name")).toBe("spinner");

      loading.setAttribute("spinner", "gear");
      await waitForRender();

      expect(spinner.getAttribute("name")).toBe("gear");
    });
  });

  describe("Spinner-Size Attribute", () => {
    it("默认 spinnerSize 应该是 0", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.spinnerSize).toBe(0);
    });

    it("设置 spinnerSize 后应该设置 CSS 变量", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("spinner-size", "32");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.style.getPropertyValue("--ea-loading-spinner-size")).toBe(
        "32px"
      );
    });

    it("spinnerSize 为 0 时不应设置 CSS 变量", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.style.getPropertyValue("--ea-loading-spinner-size")).toBe(
        ""
      );
    });

    it("spinnerSize 变化时应该更新 CSS 变量", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("spinner-size", "24");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.style.getPropertyValue("--ea-loading-spinner-size")).toBe(
        "24px"
      );

      loading.setAttribute("spinner-size", "48");
      await waitForRender();

      expect(loading.style.getPropertyValue("--ea-loading-spinner-size")).toBe(
        "48px"
      );
    });

    it("spinnerSize 从有值变为 0 时应该移除 CSS 变量", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("spinner-size", "32");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.style.getPropertyValue("--ea-loading-spinner-size")).toBe(
        "32px"
      );

      loading.setAttribute("spinner-size", "0");
      await waitForRender();

      expect(loading.style.getPropertyValue("--ea-loading-spinner-size")).toBe(
        ""
      );
    });
  });

  describe("Background Attribute", () => {
    it("默认 background 应该是 hsla(0, 0%, 100%, 0.9)", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.background).toBe("hsla(0, 0%, 100%, 0.9)");
    });

    it("设置 background 后应该设置 CSS 变量", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("background", "rgba(0, 0, 0, 0.5)");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.style.getPropertyValue("--ea-loading-background")).toBe(
        "rgba(0, 0, 0, 0.5)"
      );
    });

    it("background 变化时应该更新 CSS 变量", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      loading.setAttribute("background", "rgba(0, 0, 0, 0.8)");
      await waitForRender();

      expect(loading.style.getPropertyValue("--ea-loading-background")).toBe(
        "rgba(0, 0, 0, 0.8)"
      );
    });
  });

  describe("Text Attribute", () => {
    it("默认 text 应该是空字符串", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.text).toBe("");
    });

    it("设置 text 后应该显示加载文本", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("text", "正在加载中...");
      container.appendChild(loading);

      await waitForRender();

      const textEl = loading.shadowRoot.querySelector(".ea-loading__text");
      expect(textEl.textContent).toBe("正在加载中...");
    });

    it("text 变化时应该更新文本内容", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("text", "加载中");
      container.appendChild(loading);

      await waitForRender();

      const textEl = loading.shadowRoot.querySelector(".ea-loading__text");
      expect(textEl.textContent).toBe("加载中");

      loading.setAttribute("text", "请稍候");
      await waitForRender();

      expect(textEl.textContent).toBe("请稍候");
    });

    it("text 为空时文本元素应该隐藏", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      const textEl = loading.shadowRoot.querySelector(".ea-loading__text");
      expect(textEl.style.display).toBe("none");
    });

    it("text 有值时文本元素应该显示", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("text", "加载中");
      container.appendChild(loading);

      await waitForRender();

      const textEl = loading.shadowRoot.querySelector(".ea-loading__text");
      expect(textEl.style.display).toBe("");
    });

    it("text 从有值变为空时应该隐藏文本元素", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("text", "加载中");
      container.appendChild(loading);

      await waitForRender();

      const textEl = loading.shadowRoot.querySelector(".ea-loading__text");
      expect(textEl.style.display).toBe("");

      loading.setAttribute("text", "");
      await waitForRender();

      expect(textEl.style.display).toBe("none");
    });

    it("text 从空变为有值时应该显示文本元素", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      const textEl = loading.shadowRoot.querySelector(".ea-loading__text");
      expect(textEl.style.display).toBe("none");

      loading.setAttribute("text", "加载中");
      await waitForRender();

      expect(textEl.style.display).toBe("");
    });
  });

  describe("Fullscreen Attribute", () => {
    it("默认 fullscreen 应该是 false", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.fullscreen).toBe(false);
    });

    it("fullscreen 为 true 但 loading 为 false 时不应有 ea-loading--fullscreen 修饰符", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("fullscreen", "");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("ea-loading--fullscreen")).toBe(
        false
      );
    });

    it("fullscreen 和 loading 同时为 true 时应该有 ea-loading--fullscreen 修饰符", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("fullscreen", "");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("ea-loading--fullscreen")).toBe(
        true
      );
    });

    it("loading 从 true 变为 false 时应该移除 fullscreen 修饰符", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("fullscreen", "");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("ea-loading--fullscreen")).toBe(
        true
      );

      loading.loading = false;
      await waitForRender();

      expect(containerEl.classList.contains("ea-loading--fullscreen")).toBe(
        false
      );
    });

    it("loading 从 false 变为 true 时应该添加 fullscreen 修饰符", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("fullscreen", "");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("ea-loading--fullscreen")).toBe(
        false
      );

      loading.loading = true;
      await waitForRender();

      expect(containerEl.classList.contains("ea-loading--fullscreen")).toBe(
        true
      );
    });
  });

  describe("Lock Attribute", () => {
    it("默认 lock 应该是 false", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.lock).toBe(false);
    });

    it("lock 为 true 且 fullscreen 为 true 且 loading 为 true 时应该锁定滚动", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("fullscreen", "");
      loading.setAttribute("lock", "");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      expect(document.body.style.overflow).toBe("hidden");
    });

    it("lock 为 true 但 fullscreen 为 false 时不应锁定滚动", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("lock", "");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      expect(document.body.style.overflow).toBe("");
    });

    it("lock 为 true 但 loading 为 false 时不应锁定滚动", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("fullscreen", "");
      loading.setAttribute("lock", "");
      container.appendChild(loading);

      await waitForRender();

      expect(document.body.style.overflow).toBe("");
    });

    it("loading 从 true 变为 false 时应该解除滚动锁定", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("fullscreen", "");
      loading.setAttribute("lock", "");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      expect(document.body.style.overflow).toBe("hidden");

      loading.loading = false;
      await waitForRender();

      expect(document.body.style.overflow).toBe("");
    });

    it("组件卸载时应该解除滚动锁定", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("fullscreen", "");
      loading.setAttribute("lock", "");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      expect(document.body.style.overflow).toBe("hidden");

      loading.remove();
      await waitForRender();

      expect(document.body.style.overflow).toBe("");
    });

    it("lock 从 true 变为 false 时应该解除滚动锁定", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("fullscreen", "");
      loading.setAttribute("lock", "");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      expect(document.body.style.overflow).toBe("hidden");

      loading.lock = false;
      await waitForRender();

      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("Close Method", () => {
    it("close() 应该将 loading 设为 false", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.loading).toBe(true);

      loading.close();
      await waitForRender();

      expect(loading.loading).toBe(false);
    });

    it("close() 应该触发 ea-close 事件", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      const handler = vi.fn();
      loading.addEventListener("ea-close", handler);

      loading.close();
      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("close() 应该移除 is-loading 状态 class", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("is-loading")).toBe(true);

      loading.close();
      await waitForRender();

      expect(containerEl.classList.contains("is-loading")).toBe(false);
    });

    it("close() 全屏模式时应该解除滚动锁定", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("fullscreen", "");
      loading.setAttribute("lock", "");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      expect(document.body.style.overflow).toBe("hidden");

      loading.close();
      await waitForRender();

      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("BEM Class Names", () => {
    it("默认应该有 ea-loading class", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("ea-loading")).toBe(true);
    });

    it("loading 为 true 时应该有 is-loading 状态 class", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("is-loading")).toBe(true);
    });

    it("fullscreen 为 true 但 loading 为 false 时不应有 ea-loading--fullscreen 修饰符", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("fullscreen", "");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("ea-loading--fullscreen")).toBe(
        false
      );
    });

    it("fullscreen 和 loading 同时为 true 时应该同时有 is-loading 和 ea-loading--fullscreen class", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("loading", "");
      loading.setAttribute("fullscreen", "");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("is-loading")).toBe(true);
      expect(containerEl.classList.contains("ea-loading--fullscreen")).toBe(
        true
      );
    });
  });

  describe("CSS Parts", () => {
    it("应该正确设置 container part", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const containerEl = loading.shadowRoot.querySelector(
        '[part="container"]'
      );
      expect(containerEl).not.toBeNull();
    });

    it("应该正确设置 mask part", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const mask = loading.shadowRoot.querySelector('[part="mask"]');
      expect(mask).not.toBeNull();
    });

    it("应该正确设置 spinner part", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const spinner = loading.shadowRoot.querySelector('[part="spinner"]');
      expect(spinner).not.toBeNull();
    });

    it("应该正确设置 text part", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const text = loading.shadowRoot.querySelector('[part="text"]');
      expect(text).not.toBeNull();
    });

    it("应该正确设置 content-wrap part", () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      const contentWrap = loading.shadowRoot.querySelector(
        '[part="content-wrap"]'
      );
      expect(contentWrap).not.toBeNull();
    });
  });

  describe("updateContainerClasslist Method", () => {
    it("应该返回正确的 BEM 类名字符串", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("loading", "");
      loading.setAttribute("fullscreen", "");
      container.appendChild(loading);

      await waitForRender();

      const className = loading.updateContainerClasslist();
      expect(className).toContain("ea-loading");
      expect(className).toContain("ea-loading--fullscreen");
      expect(className).toContain("is-loading");
    });

    it("无修饰符时应该只返回基础类名", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      const className = loading.updateContainerClasslist();
      expect(className).toBe("ea-loading");
    });

    it("loading 为 true 时返回的类名应包含 is-loading", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      const className = loading.updateContainerClasslist();
      expect(className).toContain("is-loading");
    });

    it("fullscreen 为 true 但 loading 为 false 时不应包含 ea-loading--fullscreen", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("fullscreen", "");
      container.appendChild(loading);

      await waitForRender();

      const className = loading.updateContainerClasslist();
      expect(className).not.toContain("ea-loading--fullscreen");
    });

    it("fullscreen 和 loading 同时为 true 时应包含 ea-loading--fullscreen", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("fullscreen", "");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      const className = loading.updateContainerClasslist();
      expect(className).toContain("ea-loading--fullscreen");
    });
  });

  describe("$loading Service", () => {
    it("window.$loading 应该是一个函数", () => {
      expect(typeof window.$loading).toBe("function");
    });

    it("$loading() 应该返回包含 close 方法的实例", async () => {
      const loadingInstance = window.$loading({});

      await waitForRender();

      expect(loadingInstance).toBeDefined();
      expect(typeof loadingInstance.close).toBe("function");
      expect(loadingInstance.instance).toBeDefined();

      loadingInstance.close();
    });

    it("$loading() 应该创建全屏加载元素并添加到 body", async () => {
      const loadingInstance = window.$loading({});

      await waitForRender();

      const el = document.querySelector("body > ea-loading");
      expect(el).not.toBeNull();
      expect(el.loading).toBe(true);
      expect(el.fullscreen).toBe(true);

      loadingInstance.close();
    });

    it("$loading() close() 应该移除 DOM 元素", async () => {
      const loadingInstance = window.$loading({});

      await waitForRender();

      const el = document.querySelector("body > ea-loading");
      expect(el).not.toBeNull();

      loadingInstance.close();

      const elAfterClose = document.querySelector("body > ea-loading");
      expect(elAfterClose).toBeNull();
    });

    it("$loading() 应该支持 text 选项", async () => {
      const loadingInstance = window.$loading({ text: "加载中" });

      await waitForRender();

      expect(loadingInstance.instance.text).toBe("加载中");

      loadingInstance.close();
    });

    it("$loading() 应该支持 spinner 选项", async () => {
      const loadingInstance = window.$loading({ spinner: "circle-notch" });

      await waitForRender();

      expect(loadingInstance.instance.spinner).toBe("circle-notch");

      loadingInstance.close();
    });

    it("$loading() 应该支持 background 选项", async () => {
      const loadingInstance = window.$loading({
        background: "rgba(0, 0, 0, 0.7)",
      });

      await waitForRender();

      expect(loadingInstance.instance.background).toBe("rgba(0, 0, 0, 0.7)");

      loadingInstance.close();
    });

    it("$loading() 应该支持 lock 选项", async () => {
      const loadingInstance = window.$loading({ lock: true });

      await waitForRender();

      expect(loadingInstance.instance.lock).toBe(true);
      expect(document.body.style.overflow).toBe("hidden");

      loadingInstance.close();

      expect(document.body.style.overflow).toBe("");
    });

    it("$loading() 应该支持 spinnerSize 选项", async () => {
      const loadingInstance = window.$loading({ spinnerSize: 32 });

      await waitForRender();

      expect(loadingInstance.instance.spinnerSize).toBe(32);

      loadingInstance.close();
    });

    it("$loading() close() 应该将 loading 设为 false", async () => {
      const loadingInstance = window.$loading({});

      await waitForRender();

      expect(loadingInstance.instance.loading).toBe(true);

      loadingInstance.close();

      expect(loadingInstance.instance.loading).toBe(false);
    });

    it("$loading() 支持 target 为 HTMLElement", async () => {
      const target = document.createElement("div");
      target.id = "loading-target";
      document.body.appendChild(target);

      const loadingInstance = window.$loading({ target });

      await waitForRender();

      const el = target.querySelector("ea-loading");
      expect(el).not.toBeNull();
      expect(el.loading).toBe(true);
      expect(el.fullscreen).toBe(false);
      expect(target.style.position).toBe("relative");

      loadingInstance.close();

      expect(target.style.position).toBe("");
      target.remove();
    });

    it("$loading() 支持 target 为 CSS 选择器", async () => {
      const target = document.createElement("div");
      target.id = "loading-target-css";
      document.body.appendChild(target);

      const loadingInstance = window.$loading({ target: "#loading-target-css" });

      await waitForRender();

      const el = target.querySelector("ea-loading");
      expect(el).not.toBeNull();

      loadingInstance.close();
      target.remove();
    });

    it("$loading() 无效 target 时应该回退到 body", async () => {
      const loadingInstance = window.$loading({ target: "#non-existent" });

      await waitForRender();

      const el = document.querySelector("body > ea-loading");
      expect(el).not.toBeNull();

      loadingInstance.close();
    });

    it("多个 $loading 实例应该独立工作", async () => {
      const loading1 = window.$loading({ text: "加载1" });
      const loading2 = window.$loading({ text: "加载2" });

      await waitForRender();

      expect(loading1.instance.text).toBe("加载1");
      expect(loading2.instance.text).toBe("加载2");

      loading1.close();

      const remainingEls = document.querySelectorAll("body > ea-loading");
      expect(remainingEls.length).toBe(1);

      loading2.close();
    });
  });

  describe("Complex Scenarios", () => {
    it("应该支持组合使用多个属性", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("loading", "");
      loading.setAttribute("fullscreen", "");
      loading.setAttribute("lock", "");
      loading.setAttribute("text", "加载中");
      loading.setAttribute("spinner", "circle-notch");
      loading.setAttribute("spinner-size", "32");
      loading.setAttribute("background", "rgba(0,0,0,0.5)");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.loading).toBe(true);
      expect(loading.fullscreen).toBe(true);
      expect(loading.lock).toBe(true);
      expect(loading.text).toBe("加载中");
      expect(loading.spinner).toBe("circle-notch");
      expect(loading.spinnerSize).toBe(32);
      expect(loading.background).toBe("rgba(0,0,0,0.5)");

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("is-loading")).toBe(true);
      expect(containerEl.classList.contains("ea-loading--fullscreen")).toBe(
        true
      );

      expect(document.body.style.overflow).toBe("hidden");
    });

    it("应该正确处理动态属性变化", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("is-loading")).toBe(false);

      loading.setAttribute("loading", "");
      loading.setAttribute("fullscreen", "");
      await waitForRender();

      expect(containerEl.classList.contains("is-loading")).toBe(true);
      expect(containerEl.classList.contains("ea-loading--fullscreen")).toBe(
        true
      );
    });

    it("应该支持多个 Loading 实例", async () => {
      const loading1 = document.createElement("ea-loading");
      loading1.setAttribute("loading", "");
      loading1.setAttribute("text", "加载1");

      const loading2 = document.createElement("ea-loading");
      loading2.setAttribute("loading", "");
      loading2.setAttribute("text", "加载2");

      container.appendChild(loading1);
      container.appendChild(loading2);

      await waitForRender();

      expect(loading1.text).toBe("加载1");
      expect(loading2.text).toBe("加载2");

      const container1 = loading1.shadowRoot.querySelector(".ea-loading");
      const container2 = loading2.shadowRoot.querySelector(".ea-loading");

      expect(container1.classList.contains("is-loading")).toBe(true);
      expect(container2.classList.contains("is-loading")).toBe(true);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接时应该正确初始化", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("is-loading")).toBe(true);
    });

    it("组件断开连接时应该解除滚动锁定", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("fullscreen", "");
      loading.setAttribute("lock", "");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      expect(document.body.style.overflow).toBe("hidden");

      loading.remove();
      await waitForRender();

      expect(document.body.style.overflow).toBe("");
    });

    it("组件重新连接时应该正确渲染", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("loading", "");
      container.appendChild(loading);

      await waitForRender();

      loading.remove();
      await waitForRender();

      container.appendChild(loading);
      await waitForRender();

      expect(loading.shadowRoot).toBeDefined();
    });
  });

  describe("Edge Cases", () => {
    it("text 设置为 HTML 字符串时应该被安全处理", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("text", "<script>alert('xss')</script>");
      container.appendChild(loading);

      await waitForRender();

      const textEl = loading.shadowRoot.querySelector(".ea-loading__text");
      expect(textEl.querySelector("script")).toBeNull();
    });

    it("快速连续修改 loading 应该正确反映最终状态", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      loading.setAttribute("loading", "");
      loading.loading = false;
      loading.setAttribute("loading", "");
      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("is-loading")).toBe(true);
    });

    it("快速连续修改 spinner 应该正确反映最终状态", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      loading.setAttribute("spinner", "circle-notch");
      loading.setAttribute("spinner", "gear");
      loading.setAttribute("spinner", "spinner");
      await waitForRender();

      const spinner = loading.shadowRoot.querySelector(".ea-loading__spinner");
      expect(spinner.getAttribute("name")).toBe("spinner");
    });

    it("spinnerSize 为负数时不应设置 CSS 变量", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("spinner-size", "-10");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.style.getPropertyValue("--ea-loading-spinner-size")).toBe(
        ""
      );
    });

    it("默认 background 不应设置 CSS 变量", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.style.getPropertyValue("--ea-loading-background")).toBe(
        ""
      );
    });

    it("非默认 background 应该设置 CSS 变量", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("background", "rgba(0,0,0,0.5)");
      container.appendChild(loading);

      await waitForRender();

      expect(loading.style.getPropertyValue("--ea-loading-background")).toBe(
        "rgba(0,0,0,0.5)"
      );
    });

    it("fullscreen 为 true 但 loading 为 false 时不应阻挡页面交互", async () => {
      const loading = document.createElement("ea-loading");
      loading.setAttribute("fullscreen", "");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      expect(containerEl.classList.contains("ea-loading--fullscreen")).toBe(
        false
      );
      expect(containerEl.classList.contains("is-loading")).toBe(false);
    });
  });

  describe("DOM Structure", () => {
    it("容器应该包含 mask 和 content 两个直接子元素", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      const containerEl = loading.shadowRoot.querySelector(".ea-loading");
      const directChildren = Array.from(containerEl.children);

      const hasMask = directChildren.some(el =>
        el.classList.contains("ea-loading__mask")
      );
      const hasContent = directChildren.some(el =>
        el.classList.contains("ea-loading__content")
      );

      expect(hasMask).toBe(true);
      expect(hasContent).toBe(true);
    });

    it("mask 元素应该包含 spinner slot 和 text 元素", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      const mask = loading.shadowRoot.querySelector(".ea-loading__mask");
      const spinnerSlot = mask.querySelector('slot[name="spinner"]');
      const textEl = mask.querySelector(".ea-loading__text");

      expect(spinnerSlot).not.toBeNull();
      expect(textEl).not.toBeNull();
    });

    it("content 元素应该包含默认 slot", async () => {
      const loading = document.createElement("ea-loading");
      container.appendChild(loading);

      await waitForRender();

      const content = loading.shadowRoot.querySelector(".ea-loading__content");
      const defaultSlot = content.querySelector("slot:not([name])");
      expect(defaultSlot).not.toBeNull();
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-loading");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("loading=true 时内容区域应该有 inert 属性", async () => {
        const loading = document.createElement("ea-loading");
        loading.loading = true;
        container.appendChild(loading);
        await waitForRender();
        const content = loading.shadowRoot.querySelector(
          ".ea-loading__content"
        );
        expect(content.hasAttribute("inert")).toBe(true);
      });

      it("loading=false 时内容区域不应该有 inert 属性", async () => {
        const loading = document.createElement("ea-loading");
        container.appendChild(loading);
        await waitForRender();
        const content = loading.shadowRoot.querySelector(
          ".ea-loading__content"
        );
        expect(content.hasAttribute("inert")).toBe(false);
      });

      it("动态设置 loading=true 应该添加 inert 属性", async () => {
        const loading = document.createElement("ea-loading");
        container.appendChild(loading);
        await waitForRender();
        const content = loading.shadowRoot.querySelector(
          ".ea-loading__content"
        );
        expect(content.hasAttribute("inert")).toBe(false);
        loading.loading = true;
        await waitForRender();
        expect(content.hasAttribute("inert")).toBe(true);
      });

      it("动态移除 loading 应该移除 inert 属性", async () => {
        const loading = document.createElement("ea-loading");
        loading.loading = true;
        container.appendChild(loading);
        await waitForRender();
        const content = loading.shadowRoot.querySelector(
          ".ea-loading__content"
        );
        expect(content.hasAttribute("inert")).toBe(true);
        loading.loading = false;
        await waitForRender();
        expect(content.hasAttribute("inert")).toBe(false);
      });
    });
  });
});
