import { describe, it, expect, beforeEach, afterEach } from "vitest";

import "./index";

describe("___CLASS_NAME___", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ___TAG_NAME___ 组件", () => {
      const el = document.createElement("___TAG_NAME___");
      container.appendChild(el);

      expect(el).toBeDefined();
      expect(el.shadowRoot).toBeDefined();
    });

    it("应该包含 .___TAG_NAME___ 容器元素", () => {
      const el = document.createElement("___TAG_NAME___");
      container.appendChild(el);

      expect(el.shadowRoot!.querySelector(".___TAG_NAME___")).toBeTruthy();
    });
  });
});
