import { describe, it, expect, beforeEach, afterEach } from "vitest";

import "./index";

describe("EaButton", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-button 组件", () => {
      const el = document.createElement("ea-button");
      container.appendChild(el);

      expect(el).toBeDefined();
      expect(el.shadowRoot).toBeDefined();
    });

    it("应该包含 .ea-button 容器元素", () => {
      const el = document.createElement("ea-button");
      container.appendChild(el);

      expect(el.shadowRoot!.querySelector(".ea-button")).toBeTruthy();
    });

    it("disabled 时容器带 --disabled 修饰符", () => {
      const el = document.createElement("ea-button");
      el.setAttribute("disabled", "");
      container.appendChild(el);

      expect(
        el.shadowRoot!.querySelector(".ea-button--disabled")
      ).toBeTruthy();
    });

    it("动态设置 disabled 时更新 --disabled 修饰符", async () => {
      const el = document.createElement("ea-button");
      container.appendChild(el);
      await new Promise<void>(resolve =>
        requestAnimationFrame(() => resolve())
      );

      el.setAttribute("disabled", "");
      await new Promise<void>(resolve =>
        requestAnimationFrame(() => resolve())
      );

      expect(
        el.shadowRoot!.querySelector(".ea-button--disabled")
      ).toBeTruthy();
    });
  });
});
