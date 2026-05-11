import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

let observerInstances = [];

class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.observing = [];
    observerInstances.push(this);
  }
  observe(target) {
    this.observing.push(target);
  }
  unobserve(target) {
    this.observing = this.observing.filter(el => el !== target);
  }
  disconnect() {
    this.observing = [];
  }
  trigger(entries) {
    this.callback(entries);
  }
}

global.IntersectionObserver = MockIntersectionObserver;

import "../components/ea-infinite-scroll/index.ts";

describe("EaInfiniteScroll Component", () => {
  let container;

  beforeEach(() => {
    observerInstances = [];
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    document.querySelectorAll("ea-infinite-scroll").forEach(el => el.remove());
  });

  describe("Basic Rendering", () => {
    it("应该正确渲染组件并拥有 shadowRoot", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot).toBeTruthy();
    });

    it("应该包含根容器 .ea-infinite-scroll", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector(".ea-infinite-scroll")).toBeTruthy();
    });

    it("应该包含 content 包裹层 .ea-infinite-scroll__content", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(
        el.shadowRoot.querySelector(".ea-infinite-scroll__content")
      ).toBeTruthy();
    });

    it("应该包含 placeholder 元素 .ea-infinite-scroll__placeholder", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(
        el.shadowRoot.querySelector(".ea-infinite-scroll__placeholder")
      ).toBeTruthy();
    });

    it("应该包含 loading 元素 .ea-infinite-scroll__loading", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(
        el.shadowRoot.querySelector(".ea-infinite-scroll__loading")
      ).toBeTruthy();
    });

    it("应该包含 noMore 元素 .ea-infinite-scroll__noMore", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(
        el.shadowRoot.querySelector(".ea-infinite-scroll__noMore")
      ).toBeTruthy();
    });
  });

  describe("CSS Parts", () => {
    it("应该包含 container part", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 content part", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });

    it("应该包含 placeholder part", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="placeholder"]')).toBeTruthy();
    });

    it("应该包含 loading part", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="loading"]')).toBeTruthy();
    });

    it("应该包含 noMore part", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="noMore"]')).toBeTruthy();
    });
  });

  describe("Slots", () => {
    it("应该支持默认 slot（位于 content 内）", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.innerHTML = `
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
      `;
      container.appendChild(el);

      await waitForRender();

      const contentEl = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__content"
      );
      const slot = contentEl.querySelector("slot:not([name])");
      expect(slot).toBeTruthy();
    });

    it("应该支持 loading slot", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.innerHTML = `<section slot="loading">Loading...</section>`;
      container.appendChild(el);

      await waitForRender();

      const loadingSlot = el.shadowRoot.querySelector('slot[name="loading"]');
      expect(loadingSlot).toBeTruthy();
    });

    it("应该支持 noMore slot", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.innerHTML = `<section slot="noMore">No more data</section>`;
      container.appendChild(el);

      await waitForRender();

      const noMoreSlot = el.shadowRoot.querySelector('slot[name="noMore"]');
      expect(noMoreSlot).toBeTruthy();
    });
  });

  describe("DOM Structure", () => {
    it("根容器应为 section 元素", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const rootEl = el.shadowRoot.querySelector(".ea-infinite-scroll");
      expect(rootEl.tagName).toBe("SECTION");
    });

    it("content 应为 section 元素", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const contentEl = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__content"
      );
      expect(contentEl.tagName).toBe("SECTION");
    });

    it("placeholder 应为 div 元素", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );
      expect(placeholder.tagName).toBe("DIV");
    });

    it("loading 容器应为 section 元素", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const loading = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__loading"
      );
      expect(loading.tagName).toBe("SECTION");
    });

    it("noMore 容器应为 section 元素", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const noMore = el.shadowRoot.querySelector(".ea-infinite-scroll__noMore");
      expect(noMore.tagName).toBe("SECTION");
    });

    it("content 应为根容器的子元素", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const rootEl = el.shadowRoot.querySelector(".ea-infinite-scroll");
      const contentEl = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__content"
      );
      expect(contentEl.parentElement).toBe(rootEl);
    });

    it("placeholder 应为根容器的子元素", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const rootEl = el.shadowRoot.querySelector(".ea-infinite-scroll");
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );
      expect(placeholder.parentElement).toBe(rootEl);
    });

    it("loading 应为根容器的子元素", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const rootEl = el.shadowRoot.querySelector(".ea-infinite-scroll");
      const loading = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__loading"
      );
      expect(loading.parentElement).toBe(rootEl);
    });

    it("noMore 应为根容器的子元素", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const rootEl = el.shadowRoot.querySelector(".ea-infinite-scroll");
      const noMore = el.shadowRoot.querySelector(".ea-infinite-scroll__noMore");
      expect(noMore.parentElement).toBe(rootEl);
    });
  });

  describe("Status Attribute", () => {
    it("默认 status 应该是 finished", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(el.status).toBe("finished");
    });

    it("应该支持通过 attribute 设置 status 为 loading", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("status", "loading");
      container.appendChild(el);

      await waitForRender();

      expect(el.status).toBe("loading");
    });

    it("应该支持通过 attribute 设置 status 为 noMore", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("status", "noMore");
      container.appendChild(el);

      await waitForRender();

      expect(el.status).toBe("noMore");
    });

    it("应该支持通过 attribute 设置 status 为 finished", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("status", "finished");
      container.appendChild(el);

      await waitForRender();

      expect(el.status).toBe("finished");
    });

    it("应该支持通过 property 设置 status", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      el.status = "loading";
      await waitForRender();

      expect(el.status).toBe("loading");
    });

    it("应该支持动态更新 status", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("status", "loading");
      await waitForRender();
      expect(el.status).toBe("loading");

      el.setAttribute("status", "noMore");
      await waitForRender();
      expect(el.status).toBe("noMore");

      el.setAttribute("status", "finished");
      await waitForRender();
      expect(el.status).toBe("finished");
    });

    it("status 为 loading 时容器应有 loading 修饰类", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("status", "loading");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-infinite-scroll");
      expect(containerEl.className).toContain("loading");
    });

    it("status 为 noMore 时容器应有 noMore 修饰类", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("status", "noMore");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-infinite-scroll");
      expect(containerEl.className).toContain("noMore");
    });

    it("status 为 finished 时容器不应有 loading 或 noMore 修饰类", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-infinite-scroll");
      expect(containerEl.className).not.toContain("loading");
      expect(containerEl.className).not.toContain("noMore");
    });

    it("动态切换 status 应更新容器类名", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("status", "loading");
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-infinite-scroll");
      expect(containerEl.className).toContain("loading");

      el.setAttribute("status", "noMore");
      await waitForRender();

      expect(containerEl.className).not.toContain("loading");
      expect(containerEl.className).toContain("noMore");
    });

    it("从 loading 切换到 finished 应移除 loading 类", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("status", "loading");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-infinite-scroll");
      expect(containerEl.className).toContain("loading");

      el.setAttribute("status", "finished");
      await waitForRender();

      expect(containerEl.className).not.toContain("loading");
    });
  });

  describe("Distance Attribute", () => {
    it("默认 distance 应该是 0", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(el.distance).toBe(0);
    });

    it("应该支持设置 distance 为正整数", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("distance", "100");
      container.appendChild(el);

      await waitForRender();

      expect(el.distance).toBe(100);
    });

    it("应该支持动态更新 distance", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("distance", "200");
      await waitForRender();

      expect(el.distance).toBe(200);
    });

    it("distance 为 0 时不应报错", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("distance", "0");
      container.appendChild(el);

      await waitForRender();

      expect(el.distance).toBe(0);
    });

    it("distance 为负数时应正确解析", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("distance", "-50");
      container.appendChild(el);

      await waitForRender();

      expect(el.distance).toBe(-50);
    });

    it("distance 应传递给 IntersectionObserver 的 rootMargin", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("distance", "150");
      container.appendChild(el);

      await waitForRender();

      const observer = observerInstances[observerInstances.length - 1];
      expect(observer).toBeTruthy();
      expect(observer.options.rootMargin).toBe("150px");
    });

    it("默认 distance 时 rootMargin 应为 0px", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const observer = observerInstances[observerInstances.length - 1];
      expect(observer).toBeTruthy();
      expect(observer.options.rootMargin).toBe("0px");
    });
  });

  describe("IntersectionObserver", () => {
    it("挂载时应创建 IntersectionObserver 实例", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(observerInstances.length).toBeGreaterThan(0);
    });

    it("IntersectionObserver 应观察 placeholder 元素", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );
      expect(observer.observing).toContain(placeholder);
    });

    it("placeholder 进入视口且 status 为 finished 时应触发 loadmore", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const loadmoreHandler = vi.fn();
      el.addEventListener("loadmore", loadmoreHandler);

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      observer.trigger([{ isIntersecting: true, target: placeholder }]);

      expect(loadmoreHandler).toHaveBeenCalled();
    });

    it("触发 loadmore 时 status 应变为 loading", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(el.status).toBe("finished");

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      observer.trigger([{ isIntersecting: true, target: placeholder }]);

      expect(el.status).toBe("loading");
    });

    it("status 为 loading 时不应触发 loadmore", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("status", "loading");
      container.appendChild(el);

      await waitForRender();

      const loadmoreHandler = vi.fn();
      el.addEventListener("loadmore", loadmoreHandler);

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      observer.trigger([{ isIntersecting: true, target: placeholder }]);

      expect(loadmoreHandler).not.toHaveBeenCalled();
    });

    it("status 为 noMore 时不应触发 loadmore", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("status", "noMore");
      container.appendChild(el);

      await waitForRender();

      const loadmoreHandler = vi.fn();
      el.addEventListener("loadmore", loadmoreHandler);

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      observer.trigger([{ isIntersecting: true, target: placeholder }]);

      expect(loadmoreHandler).not.toHaveBeenCalled();
    });

    it("isIntersecting 为 false 时不应触发 loadmore", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const loadmoreHandler = vi.fn();
      el.addEventListener("loadmore", loadmoreHandler);

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      observer.trigger([{ isIntersecting: false, target: placeholder }]);

      expect(loadmoreHandler).not.toHaveBeenCalled();
    });

    it("触发 loadmore 后应 unobserve target", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      expect(observer.observing).toContain(placeholder);

      observer.trigger([{ isIntersecting: true, target: placeholder }]);

      expect(observer.observing).not.toContain(placeholder);
    });

    it("组件卸载时应 disconnect IntersectionObserver", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      expect(observer.observing).toContain(placeholder);

      el.remove();
      await waitForRender();

      expect(observer.observing.length).toBe(0);
    });
  });

  describe("Loadmore Event", () => {
    it("loadmore 事件应该包含 finished 回调", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      let finishedCallback;
      el.addEventListener("loadmore", e => {
        finishedCallback = e.detail.finished;
      });

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      observer.trigger([{ isIntersecting: true, target: placeholder }]);

      expect(typeof finishedCallback).toBe("function");
    });

    it("loadmore 事件应该包含 noMore 回调", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      let noMoreCallback;
      el.addEventListener("loadmore", e => {
        noMoreCallback = e.detail.noMore;
      });

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      observer.trigger([{ isIntersecting: true, target: placeholder }]);

      expect(typeof noMoreCallback).toBe("function");
    });

    it("finished 回调应将 status 设为 finished", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      let finishedCallback;
      el.addEventListener("loadmore", e => {
        finishedCallback = e.detail.finished;
      });

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      observer.trigger([{ isIntersecting: true, target: placeholder }]);

      expect(el.status).toBe("loading");

      finishedCallback();
      await waitForRender();

      expect(el.status).toBe("finished");
    });

    it("noMore 回调应将 status 设为 noMore", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      let noMoreCallback;
      el.addEventListener("loadmore", e => {
        noMoreCallback = e.detail.noMore;
      });

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      observer.trigger([{ isIntersecting: true, target: placeholder }]);

      expect(el.status).toBe("loading");

      noMoreCallback();
      await waitForRender();

      expect(el.status).toBe("noMore");
    });

    it("finished 回调后应重新 observe target", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      let finishedCallback;
      el.addEventListener("loadmore", e => {
        finishedCallback = e.detail.finished;
      });

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      observer.trigger([{ isIntersecting: true, target: placeholder }]);

      expect(observer.observing).not.toContain(placeholder);

      finishedCallback();
      await waitForRender();

      expect(observer.observing).toContain(placeholder);
    });

    it("noMore 回调后应重新 observe target", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      let noMoreCallback;
      el.addEventListener("loadmore", e => {
        noMoreCallback = e.detail.noMore;
      });

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      observer.trigger([{ isIntersecting: true, target: placeholder }]);

      expect(observer.observing).not.toContain(placeholder);

      noMoreCallback();
      await waitForRender();

      expect(observer.observing).toContain(placeholder);
    });

    it("finished 回调后 status 为 finished，可再次触发 loadmore", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      let finishedCallback;
      const loadmoreHandler = vi.fn(e => {
        finishedCallback = e.detail.finished;
      });
      el.addEventListener("loadmore", loadmoreHandler);

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      observer.trigger([{ isIntersecting: true, target: placeholder }]);
      expect(loadmoreHandler).toHaveBeenCalledTimes(1);

      finishedCallback();
      await waitForRender();

      observer.trigger([{ isIntersecting: true, target: placeholder }]);
      expect(loadmoreHandler).toHaveBeenCalledTimes(2);
    });

    it("noMore 回调后 status 为 noMore，不应再触发 loadmore", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      let noMoreCallback;
      const loadmoreHandler = vi.fn(e => {
        noMoreCallback = e.detail.noMore;
      });
      el.addEventListener("loadmore", loadmoreHandler);

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      observer.trigger([{ isIntersecting: true, target: placeholder }]);
      expect(loadmoreHandler).toHaveBeenCalledTimes(1);

      noMoreCallback();
      await waitForRender();

      observer.trigger([{ isIntersecting: true, target: placeholder }]);
      expect(loadmoreHandler).toHaveBeenCalledTimes(1);
    });

    it("loadmore 事件应冒泡", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      let eventBubbles = false;
      el.addEventListener("loadmore", e => {
        eventBubbles = e.bubbles;
      });

      observer.trigger([{ isIntersecting: true, target: placeholder }]);

      expect(eventBubbles).toBe(true);
    });
  });

  describe("Slotchange Event", () => {
    it("应该触发 slotchange 事件", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const slotchangeHandler = vi.fn();
      el.addEventListener("slotchange", slotchangeHandler);

      const item = document.createElement("div");
      el.appendChild(item);

      await waitForRender();

      expect(slotchangeHandler).toHaveBeenCalled();
    });

    it("slotchange 事件应冒泡", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      let eventBubbles = false;
      el.addEventListener("slotchange", e => {
        eventBubbles = e.bubbles;
      });

      const item = document.createElement("div");
      el.appendChild(item);

      await waitForRender();

      expect(eventBubbles).toBe(true);
    });

    it("slotchange 事件应穿透 shadow boundary", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      let eventComposed = false;
      el.addEventListener("slotchange", e => {
        eventComposed = e.composed;
      });

      const item = document.createElement("div");
      el.appendChild(item);

      await waitForRender();

      expect(eventComposed).toBe(true);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("distance", "50");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot).toBeTruthy();
      expect(el.shadowRoot.querySelector(".ea-infinite-scroll")).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      el.remove();

      expect(el.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(el.status).toBe("finished");

      el.setAttribute("status", "loading");
      await waitForRender();

      expect(el.status).toBe("loading");
    });

    it("移除后重新添加应正常工作", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      el.remove();
      await waitForRender();

      container.appendChild(el);
      await waitForRender();

      expect(el.shadowRoot).toBeTruthy();
      expect(el.isConnected).toBe(true);
    });

    it("重新添加后应创建新的 IntersectionObserver", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const firstObserverCount = observerInstances.length;

      el.remove();
      await waitForRender();

      container.appendChild(el);
      await waitForRender();

      expect(observerInstances.length).toBeGreaterThan(firstObserverCount);
    });
  });

  describe("Edge Cases", () => {
    it("应该处理空组件", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot).toBeTruthy();
    });

    it("应该处理多次状态切换", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("status", "loading");
      await waitForRender();
      expect(el.status).toBe("loading");

      el.setAttribute("status", "finished");
      await waitForRender();
      expect(el.status).toBe("finished");

      el.setAttribute("status", "noMore");
      await waitForRender();
      expect(el.status).toBe("noMore");

      el.setAttribute("status", "finished");
      await waitForRender();
      expect(el.status).toBe("finished");
    });

    it("应该处理动态添加内容", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      for (let i = 0; i < 5; i++) {
        const item = document.createElement("div");
        item.className = "item";
        item.textContent = `Item ${i + 1}`;
        el.appendChild(item);
      }

      await waitForRender();

      expect(el.querySelectorAll(".item").length).toBe(5);
    });

    it("应该处理大量子元素", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      for (let i = 0; i < 100; i++) {
        const item = document.createElement("div");
        item.className = "item";
        item.textContent = `Item ${i + 1}`;
        el.appendChild(item);
      }

      await waitForRender();

      expect(el.querySelectorAll(".item").length).toBe(100);
    });

    it("应该处理同时设置多个属性", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("status", "loading");
      el.setAttribute("distance", "150");
      container.appendChild(el);

      await waitForRender();

      expect(el.status).toBe("loading");
      expect(el.distance).toBe(150);
    });

    it("应该处理快速连续的状态切换", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("status", "loading");
      el.setAttribute("status", "finished");
      el.setAttribute("status", "noMore");
      await waitForRender();

      expect(el.status).toBe("noMore");
    });

    it("应该处理 distance 为小数字符串", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("distance", "10.5");
      container.appendChild(el);

      await waitForRender();

      expect(el.distance).toBe(10.5);
    });

    it("应该处理 distance 为空字符串", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("distance", "");
      container.appendChild(el);

      await waitForRender();

      expect(typeof el.distance).toBe("number");
    });

    it("应该处理 status 为无效值时回退为 null", async () => {
      const el = document.createElement("ea-infinite-scroll");
      el.setAttribute("status", "invalid");
      container.appendChild(el);

      await waitForRender();

      expect(el.status).toBe("finished");
    });
  });

  describe("Complete Loadmore Flow", () => {
    it("完整的加载流程：finished → loading → finished", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(el.status).toBe("finished");

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      let finishedCallback;
      el.addEventListener("loadmore", e => {
        finishedCallback = e.detail.finished;
      });

      observer.trigger([{ isIntersecting: true, target: placeholder }]);
      expect(el.status).toBe("loading");

      finishedCallback();
      await waitForRender();

      expect(el.status).toBe("finished");
    });

    it("完整的加载流程：finished → loading → noMore", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      expect(el.status).toBe("finished");

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      let noMoreCallback;
      el.addEventListener("loadmore", e => {
        noMoreCallback = e.detail.noMore;
      });

      observer.trigger([{ isIntersecting: true, target: placeholder }]);
      expect(el.status).toBe("loading");

      noMoreCallback();
      await waitForRender();

      expect(el.status).toBe("noMore");
    });

    it("多次加载循环：finished → loading → finished → loading → noMore", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      let currentCallback;
      el.addEventListener("loadmore", e => {
        currentCallback = e.detail;
      });

      observer.trigger([{ isIntersecting: true, target: placeholder }]);
      expect(el.status).toBe("loading");

      currentCallback.finished();
      await waitForRender();
      expect(el.status).toBe("finished");

      observer.trigger([{ isIntersecting: true, target: placeholder }]);
      expect(el.status).toBe("loading");

      currentCallback.noMore();
      await waitForRender();
      expect(el.status).toBe("noMore");
    });

    it("loading 期间 IntersectionObserver 再次触发不应重复 loadmore", async () => {
      const el = document.createElement("ea-infinite-scroll");
      container.appendChild(el);

      await waitForRender();

      const loadmoreHandler = vi.fn();
      el.addEventListener("loadmore", loadmoreHandler);

      const observer = observerInstances[observerInstances.length - 1];
      const placeholder = el.shadowRoot.querySelector(
        ".ea-infinite-scroll__placeholder"
      );

      observer.trigger([{ isIntersecting: true, target: placeholder }]);
      expect(loadmoreHandler).toHaveBeenCalledTimes(1);
      expect(el.status).toBe("loading");

      observer.trigger([{ isIntersecting: true, target: placeholder }]);
      expect(loadmoreHandler).toHaveBeenCalledTimes(1);
    });
  });
});
