import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

if (!window.CSS) {
  window.CSS = {};
}
if (!window.CSS.supports) {
  window.CSS.supports = vi.fn((prop, value) => {
    if (typeof value !== "string") return false;
    if (
      /^\d+(\.\d+)?(px|rem|em|vh|vw|%|cm|mm|in|pt|pc|ch|ex|vmin|vmax)$/.test(
        value
      )
    )
      return true;
    if (
      /^(auto|inherit|initial|unset|none|max-content|min-content|fit-content)$/.test(
        value
      )
    )
      return true;
    return false;
  });
}

import "../components/ea-progress/index.ts";

describe("EaProgress Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染组件并拥有 shadowRoot", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.shadowRoot).toBeTruthy();
    });

    it("应该包含 ea-progress 容器元素", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl).toBeTruthy();
      expect(containerEl.tagName.toLowerCase()).toBe("div");
    });

    it("应该支持 CSS Parts（container, track, path, percentage）", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const parts = ["container", "track", "path", "percentage"];
      parts.forEach(part => {
        expect(
          progress.shadowRoot.querySelector(`[part="${part}"]`)
        ).toBeTruthy();
      });
    });

    it("应该支持 slot 内容", async () => {
      const progress = document.createElement("ea-progress");
      const span = document.createElement("span");
      span.setAttribute("slot", "");
      span.textContent = "50%";
      progress.appendChild(span);
      container.appendChild(progress);

      await waitForRender();

      const slot = progress.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("应该注册为 ea-progress 自定义元素", () => {
      expect(customElements.get("ea-progress")).toBeTruthy();
    });

    it("容器元素应该有 part=container", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.getAttribute("part")).toBe("container");
    });
  });

  describe("Variant Attribute", () => {
    it("默认 variant 应该是 line", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.variant).toBe("line");
    });

    it("line 变体应该渲染 section 结构的 track 和 path", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const track = progress.shadowRoot.querySelector(
        "section.ea-progress__track"
      );
      const path = progress.shadowRoot.querySelector(
        "section.ea-progress__path"
      );
      expect(track).toBeTruthy();
      expect(path).toBeTruthy();
    });

    it("line 变体应该包含 percentage-wrapper 和 slot", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const wrapper = progress.shadowRoot.querySelector(
        ".ea-progress__percentage-wrapper"
      );
      const slot = progress.shadowRoot.querySelector(
        "slot.ea-progress__percentage"
      );
      expect(wrapper).toBeTruthy();
      expect(slot).toBeTruthy();
    });

    it("应该支持 circle 变体", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.variant).toBe("circle");
    });

    it("circle 变体应该渲染 SVG 元素", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      container.appendChild(progress);

      await waitForRender();

      const svg = progress.shadowRoot.querySelector("svg");
      expect(svg).toBeTruthy();
      expect(svg.getAttribute("viewBox")).toBe("0 0 100 100");
    });

    it("circle 变体应该包含 track 和 path circle 元素", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      container.appendChild(progress);

      await waitForRender();

      const trackCircle = progress.shadowRoot.querySelector(
        "circle.ea-progress__track"
      );
      const pathCircle = progress.shadowRoot.querySelector(
        "circle.ea-progress__path"
      );
      expect(trackCircle).toBeTruthy();
      expect(pathCircle).toBeTruthy();
    });

    it("circle 变体的 circle 元素应该有正确的属性", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      container.appendChild(progress);

      await waitForRender();

      const circles = progress.shadowRoot.querySelectorAll("circle");
      circles.forEach(circle => {
        expect(circle.getAttribute("cx")).toBe("50");
        expect(circle.getAttribute("cy")).toBe("50");
        expect(circle.getAttribute("fill")).toBe("none");
      });
    });

    it("circle 变体的 circle 元素应该有 part 属性", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      container.appendChild(progress);

      await waitForRender();

      const trackCircle = progress.shadowRoot.querySelector(
        "circle.ea-progress__track"
      );
      const pathCircle = progress.shadowRoot.querySelector(
        "circle.ea-progress__path"
      );
      expect(trackCircle.getAttribute("part")).toBe("track");
      expect(pathCircle.getAttribute("part")).toBe("path");
    });

    it("circle 变体应该包含 percentage-wrapper 和 slot", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      container.appendChild(progress);

      await waitForRender();

      const wrapper = progress.shadowRoot.querySelector(
        ".ea-progress__percentage-wrapper"
      );
      const slot = progress.shadowRoot.querySelector(
        "slot.ea-progress__percentage"
      );
      expect(wrapper).toBeTruthy();
      expect(slot).toBeTruthy();
    });

    it("应该支持 dashboard 变体", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.variant).toBe("dashboard");
    });

    it("dashboard 变体应该渲染 SVG 元素", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      container.appendChild(progress);

      await waitForRender();

      const svg = progress.shadowRoot.querySelector("svg");
      expect(svg).toBeTruthy();
    });

    it("dashboard 变体应该包含 mask 和 clipPath 元素", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      container.appendChild(progress);

      await waitForRender();

      const mask = progress.shadowRoot.querySelector("mask#myMask");
      const clipPath = progress.shadowRoot.querySelector("clipPath#myClip");
      expect(mask).toBeTruthy();
      expect(clipPath).toBeTruthy();
    });

    it("dashboard 变体的 circle 元素应该有 clip-path 属性", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      container.appendChild(progress);

      await waitForRender();

      const trackCircle = progress.shadowRoot.querySelector(
        "circle.ea-progress__track"
      );
      const pathCircle = progress.shadowRoot.querySelector(
        "circle.ea-progress__path"
      );
      expect(trackCircle.getAttribute("clip-path")).toBe("url(#myClip)");
      expect(pathCircle.getAttribute("clip-path")).toBe("url(#myClip)");
    });

    it("dashboard 变体应该包含 percentage-wrapper 和 slot", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      container.appendChild(progress);

      await waitForRender();

      const wrapper = progress.shadowRoot.querySelector(
        ".ea-progress__percentage-wrapper"
      );
      const slot = progress.shadowRoot.querySelector(
        "slot.ea-progress__percentage"
      );
      expect(wrapper).toBeTruthy();
      expect(slot).toBeTruthy();
    });

    it("动态切换 variant 应该重新渲染", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.variant).toBe("line");
      expect(
        progress.shadowRoot.querySelector("section.ea-progress__track")
      ).toBeTruthy();

      progress.setAttribute("variant", "circle");
      await waitForRender();

      expect(progress.variant).toBe("circle");
      expect(progress.shadowRoot.querySelector("svg")).toBeTruthy();
    });

    it("从 circle 切换到 dashboard 应该重新渲染", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.variant).toBe("circle");
      expect(progress.shadowRoot.querySelector("mask#myMask")).toBeFalsy();

      progress.setAttribute("variant", "dashboard");
      await waitForRender();

      expect(progress.variant).toBe("dashboard");
      expect(progress.shadowRoot.querySelector("mask#myMask")).toBeTruthy();
    });

    it("无效的 variant 值应该使用默认值 line", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "invalid");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.variant).toBe("line");
    });

    it("从 line 切换到 circle 后 line 的 DOM 应该被替换", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(
        progress.shadowRoot.querySelector("section.ea-progress__track")
      ).toBeTruthy();

      progress.setAttribute("variant", "circle");
      await waitForRender();

      expect(
        progress.shadowRoot.querySelector("section.ea-progress__track")
      ).toBeFalsy();
      expect(progress.shadowRoot.querySelector("svg")).toBeTruthy();
    });
  });

  describe("Percentage Attribute", () => {
    it("默认 percentage 应该是 0", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.percentage).toBe(0);
    });

    it("应该支持 percentage 属性", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.percentage).toBe(50);
    });

    it("percentage 应该限制在 0-100 范围内（超过 100）", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "150");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.percentage).toBe(100);
    });

    it("负数的 percentage 应该被限制为 0", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "-10");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.percentage).toBe(0);
    });

    it("percentage 为 0 应该正常工作", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "0");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.percentage).toBe(0);
    });

    it("percentage 为 100 应该正常工作", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "100");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.percentage).toBe(100);
    });

    it("非数字的 percentage 应该返回默认值 0", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "abc");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.percentage).toBe(0);
    });

    it("line 变体应该设置 --ea-progress-percentage CSS 变量", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(
        containerEl.style.getPropertyValue("--ea-progress-percentage")
      ).toBe("50%");
    });

    it("动态更新 percentage 应该更新 CSS 变量", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      progress.setAttribute("percentage", "75");
      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(
        containerEl.style.getPropertyValue("--ea-progress-percentage")
      ).toBe("75%");
    });

    it("circle 变体应该设置 stroke-dashoffset 格式的 CSS 变量", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      const cssVar = containerEl.style.getPropertyValue(
        "--ea-progress-percentage"
      );
      expect(cssVar).toBeTruthy();
      expect(cssVar.endsWith("px")).toBe(true);
    });

    it("circle 变体 percentage 为 0 时 stroke-dashoffset 应该为 302px", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      progress.setAttribute("percentage", "0");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(
        containerEl.style.getPropertyValue("--ea-progress-percentage")
      ).toBe("302px");
    });

    it("circle 变体 percentage 为 100 时 stroke-dashoffset 应该为 0px", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      progress.setAttribute("percentage", "100");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(
        containerEl.style.getPropertyValue("--ea-progress-percentage")
      ).toBe("0px");
    });

    it("circle 变体 percentage 为 50 时 stroke-dashoffset 应该为 151px", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(
        containerEl.style.getPropertyValue("--ea-progress-percentage")
      ).toBe("151px");
    });

    it("dashboard 变体应该设置 stroke-dasharray 和 stroke-dashoffset", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const pathCircle = progress.shadowRoot.querySelector(
        "circle.ea-progress__path"
      );
      const trackCircle = progress.shadowRoot.querySelector(
        "circle.ea-progress__track"
      );
      expect(pathCircle).toBeTruthy();
      expect(trackCircle).toBeTruthy();
      expect(pathCircle.style.strokeDasharray).toBeTruthy();
      expect(trackCircle.style.strokeDasharray).toBeTruthy();
    });

    it("dashboard 变体 percentage 为 0 时 CSS 变量应该有值", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      progress.setAttribute("percentage", "0");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      const cssVar = containerEl.style.getPropertyValue(
        "--ea-progress-percentage"
      );
      expect(cssVar).toBeTruthy();
      expect(cssVar.endsWith("px")).toBe(true);
    });

    it("动态更新 percentage 应该触发 change 事件", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const changeHandler = vi.fn();
      progress.addEventListener("change", changeHandler);

      progress.setAttribute("percentage", "50");
      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });
  });

  describe("Status Attribute", () => {
    it("默认 status 应该是空字符串", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.status).toBe("");
    });

    it("应该支持 success 状态", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "success");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.status).toBe("success");
    });

    it("应该支持 warning 状态", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "warning");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.status).toBe("warning");
    });

    it("应该支持 exception 状态", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "exception");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.status).toBe("exception");
    });

    it("success 状态应该添加 ea-progress--success 修饰类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "success");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--success")).toBe(true);
    });

    it("warning 状态应该添加 ea-progress--warning 修饰类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "warning");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--warning")).toBe(true);
    });

    it("exception 状态应该添加 ea-progress--exception 修饰类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "exception");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--exception")).toBe(
        true
      );
    });

    it("success 状态应该显示 circle-check 图标", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "success");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const icon = progress.shadowRoot.querySelector(
        "ea-icon.ea-progress__status"
      );
      expect(icon).toBeTruthy();
      expect(icon.getAttribute("name")).toBe("circle-check");
    });

    it("warning 状态应该显示 triangle-exclamation 图标", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "warning");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const icon = progress.shadowRoot.querySelector(
        "ea-icon.ea-progress__status"
      );
      expect(icon).toBeTruthy();
      expect(icon.getAttribute("name")).toBe("triangle-exclamation");
    });

    it("exception 状态应该显示 circle-xmark 图标", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "exception");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const icon = progress.shadowRoot.querySelector(
        "ea-icon.ea-progress__status"
      );
      expect(icon).toBeTruthy();
      expect(icon.getAttribute("name")).toBe("circle-xmark");
    });

    it("无状态时应该显示百分比文字", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const text = progress.shadowRoot.querySelector(
        ".ea-progress__percentage"
      );
      expect(text.textContent).toBe("50%");
    });

    it("状态图标应该有 status-icon CSS Part", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "success");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const icon = progress.shadowRoot.querySelector('[part="status-icon"]');
      expect(icon).toBeTruthy();
    });

    it("textInside 为 true 时 status 不应该显示图标而是显示百分比", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "success");
      progress.setAttribute("text-inside", "");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const icon = progress.shadowRoot.querySelector(
        "ea-icon.ea-progress__status"
      );
      expect(icon).toBeFalsy();

      const text = progress.shadowRoot.querySelector(
        ".ea-progress__percentage"
      );
      expect(text.textContent).toBe("50%");
    });

    it("动态切换 status 应该更新类名", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "success");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--success")).toBe(true);

      progress.setAttribute("status", "warning");
      await waitForRender();

      expect(containerEl.classList.contains("ea-progress--success")).toBe(
        false
      );
      expect(containerEl.classList.contains("ea-progress--warning")).toBe(true);
    });

    it("动态移除 status 应该移除修饰类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "success");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--success")).toBe(true);

      progress.removeAttribute("status");
      await waitForRender();

      expect(containerEl.classList.contains("ea-progress--success")).toBe(
        false
      );
    });

    it("无效的 status 值应该使用默认值", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "invalid");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.status).toBe("");
    });
  });

  describe("StrokeWidth Attribute", () => {
    it("默认 strokeWidth 应该是 8px", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.strokeWidth).toBe("8px");
    });

    it("应该支持自定义 strokeWidth", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("stroke-width", "20px");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.strokeWidth).toBe("20px");
    });

    it("应该设置 --ea-progress-stroke-width CSS 变量", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("stroke-width", "16px");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(
        containerEl.style.getPropertyValue("--ea-progress-stroke-width")
      ).toBe("16px");
    });

    it("动态更新 strokeWidth 应该更新 CSS 变量", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      progress.setAttribute("stroke-width", "24px");
      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(
        containerEl.style.getPropertyValue("--ea-progress-stroke-width")
      ).toBe("24px");
    });

    it("无效的 CSS 宽度值应该触发 console.warn", async () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const progress = document.createElement("ea-progress");
      progress.setAttribute("stroke-width", "invalid");
      container.appendChild(progress);

      await waitForRender();

      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it("有效的 CSS 宽度值不应该触发 console.warn", async () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const progress = document.createElement("ea-progress");
      progress.setAttribute("stroke-width", "1rem");
      container.appendChild(progress);

      await waitForRender();

      expect(warnSpy).not.toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it("dashboard 变体应该使用 strokeWidth 计算 stroke-dasharray", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      progress.setAttribute("stroke-width", "6px");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const pathCircle = progress.shadowRoot.querySelector(
        "circle.ea-progress__path"
      );
      expect(pathCircle.style.strokeDasharray).toBeTruthy();
    });
  });

  describe("TextInside Attribute", () => {
    it("默认 textInside 应该是 false", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.textInside).toBe(false);
    });

    it("应该支持 textInside 属性", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("text-inside", "");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.textInside).toBe(true);
    });

    it("textInside 为 true 时应该添加 ea-progress--text-inside 修饰类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("text-inside", "");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--text-inside")).toBe(
        true
      );
    });

    it("textInside 为 false 时不应该有 ea-progress--text-inside 类", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--text-inside")).toBe(
        false
      );
    });

    it("textInside 为 true 时文字应该移动到 path 元素内", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("text-inside", "");
      container.appendChild(progress);

      await waitForRender();

      const path = progress.shadowRoot.querySelector(".ea-progress__path");
      const text = progress.shadowRoot.querySelector(
        ".ea-progress__percentage"
      );
      expect(path.contains(text)).toBe(true);
    });

    it("textInside 为 false 时文字应该在 percentage-wrapper 内", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const wrapper = progress.shadowRoot.querySelector(
        ".ea-progress__percentage-wrapper"
      );
      const text = progress.shadowRoot.querySelector(
        ".ea-progress__percentage"
      );
      expect(wrapper.contains(text)).toBe(true);
    });

    it("动态切换 textInside 应该移动文字位置", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const wrapper = progress.shadowRoot.querySelector(
        ".ea-progress__percentage-wrapper"
      );
      const path = progress.shadowRoot.querySelector(".ea-progress__path");
      const text = progress.shadowRoot.querySelector(
        ".ea-progress__percentage"
      );

      expect(wrapper.contains(text)).toBe(true);

      progress.setAttribute("text-inside", "");
      await waitForRender();

      expect(path.contains(text)).toBe(true);

      progress.removeAttribute("text-inside");
      await waitForRender();

      expect(wrapper.contains(text)).toBe(true);
    });
  });

  describe("Indeterminate Attribute", () => {
    it("默认 indeterminate 应该是 false", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.indeterminate).toBe(false);
    });

    it("应该支持 indeterminate 属性", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("indeterminate", "");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.indeterminate).toBe(true);
    });

    it("line 变体 indeterminate 为 true 时应该添加 is-indeterminate 状态类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("indeterminate", "");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("is-indeterminate")).toBe(true);
    });

    it("circle 变体 indeterminate 不应该添加 is-indeterminate 状态类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      progress.setAttribute("indeterminate", "");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("is-indeterminate")).toBe(false);
    });

    it("dashboard 变体 indeterminate 不应该添加 is-indeterminate 状态类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      progress.setAttribute("indeterminate", "");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("is-indeterminate")).toBe(false);
    });

    it("动态移除 indeterminate 应该移除 is-indeterminate 类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("indeterminate", "");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("is-indeterminate")).toBe(true);

      progress.removeAttribute("indeterminate");
      await waitForRender();

      expect(containerEl.classList.contains("is-indeterminate")).toBe(false);
    });
  });

  describe("Duration Attribute", () => {
    it("默认 duration 应该是 3", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.duration).toBe(3);
    });

    it("应该支持自定义 duration", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("duration", "5");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.duration).toBe(5);
    });

    it("应该设置 --ea-progress-animation-duration CSS 变量", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("duration", "5");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(
        containerEl.style.getPropertyValue("--ea-progress-animation-duration")
      ).toBe("5s");
    });

    it("动态更新 duration 应该更新 CSS 变量", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      progress.setAttribute("duration", "10");
      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(
        containerEl.style.getPropertyValue("--ea-progress-animation-duration")
      ).toBe("10s");
    });

    it("小数 duration 应该正常工作", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("duration", "2.5");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(
        containerEl.style.getPropertyValue("--ea-progress-animation-duration")
      ).toBe("2.5s");
    });
  });

  describe("Striped Attribute", () => {
    it("默认 striped 应该是 false", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.striped).toBe(false);
    });

    it("应该支持 striped 属性", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("striped", "");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.striped).toBe(true);
    });

    it("striped 为 true 时应该添加 ea-progress--striped 修饰类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("striped", "");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--striped")).toBe(true);
    });

    it("striped 为 false 时不应该有 ea-progress--striped 类", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--striped")).toBe(
        false
      );
    });

    it("动态添加和移除 striped 应该更新类名", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--striped")).toBe(
        false
      );

      progress.setAttribute("striped", "");
      await waitForRender();

      expect(containerEl.classList.contains("ea-progress--striped")).toBe(true);

      progress.removeAttribute("striped");
      await waitForRender();

      expect(containerEl.classList.contains("ea-progress--striped")).toBe(
        false
      );
    });
  });

  describe("StripedFlow Attribute", () => {
    it("默认 stripedFlow 应该是 false", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.stripedFlow).toBe(false);
    });

    it("应该支持 stripedFlow 属性", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("striped-flow", "");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.stripedFlow).toBe(true);
    });

    it("stripedFlow 为 true 时应该添加 is-striped-flow 状态类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("striped-flow", "");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("is-striped-flow")).toBe(true);
    });

    it("stripedFlow 为 false 时不应该有 is-striped-flow 类", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("is-striped-flow")).toBe(false);
    });
  });

  describe("Size Attribute", () => {
    it("默认 size 应该是 126px", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.size).toBe("126px");
    });

    it("应该支持自定义 size", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("size", "200px");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.size).toBe("200px");
    });

    it("circle 变体应该设置 --ea-progress-size CSS 变量", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      progress.setAttribute("size", "200px");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.style.getPropertyValue("--ea-progress-size")).toBe(
        "200px"
      );
    });

    it("dashboard 变体应该设置 --ea-progress-size CSS 变量", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      progress.setAttribute("size", "180px");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.style.getPropertyValue("--ea-progress-size")).toBe(
        "180px"
      );
    });

    it("line 变体不应该设置 --ea-progress-size CSS 变量", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("size", "200px");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.style.getPropertyValue("--ea-progress-size")).toBe("");
    });

    it("动态更新 size 应该更新 CSS 变量", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      container.appendChild(progress);

      await waitForRender();

      progress.setAttribute("size", "250px");
      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.style.getPropertyValue("--ea-progress-size")).toBe(
        "250px"
      );
    });
  });

  describe("ShowText Attribute", () => {
    it("默认 showText 应该是 true", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.showText).toBe(true);
    });

    it("showText 为 true 时应该添加 is-show-text 状态类", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("is-show-text")).toBe(true);
    });

    it("应该支持 showText 设置为 false", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("show-text", "false");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.showText).toBe(false);
    });

    it("showText 为 false 时应该移除 is-show-text 状态类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("show-text", "false");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("is-show-text")).toBe(false);
    });

    it("动态切换 showText 应该更新类名", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("is-show-text")).toBe(true);

      progress.setAttribute("show-text", "false");
      await waitForRender();

      expect(containerEl.classList.contains("is-show-text")).toBe(false);

      progress.showText = true;
      await waitForRender();

      expect(containerEl.classList.contains("is-show-text")).toBe(true);
    });
  });

  describe("Color Property", () => {
    it("默认 color 应该是空字符串", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.color).toBe("");
    });

    it("应该支持字符串 color", async () => {
      const progress = document.createElement("ea-progress");
      progress.color = "#6f7ad3";
      container.appendChild(progress);

      await waitForRender();

      expect(progress.color).toBe("#6f7ad3");
    });

    it("字符串 color 应该设置 --ea-progress-path-color CSS 变量", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      progress.color = "#6f7ad3";
      await waitForRender();

      const pathEl = progress.shadowRoot.querySelector(".ea-progress__path");
      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        "#6f7ad3"
      );
    });

    it("应该支持数组 color", async () => {
      const progress = document.createElement("ea-progress");
      progress.color = [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
      ];
      container.appendChild(progress);

      await waitForRender();

      expect(Array.isArray(progress.color)).toBe(true);
      expect(progress.color.length).toBe(3);
    });

    it("数组 color 应该根据 percentage 选择最近的颜色", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "30");
      progress.color = [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
      ];
      container.appendChild(progress);

      await waitForRender();

      const pathEl = progress.shadowRoot.querySelector(".ea-progress__path");
      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        "#e6a23c"
      );
    });

    it("数组 color 中 percentage 小于第一项时应该使用第一项颜色", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "10");
      progress.color = [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
      ];
      container.appendChild(progress);

      await waitForRender();

      const pathEl = progress.shadowRoot.querySelector(".ea-progress__path");
      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        "#f56c6c"
      );
    });

    it("数组 color 中 percentage 等于某项时应该使用该项颜色", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "20");
      progress.color = [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
      ];
      container.appendChild(progress);

      await waitForRender();

      const pathEl = progress.shadowRoot.querySelector(".ea-progress__path");
      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        "#f56c6c"
      );
    });

    it("数组 color 中 percentage 大于所有项时应该使用第一项颜色", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "80");
      progress.color = [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
      ];
      container.appendChild(progress);

      await waitForRender();

      const pathEl = progress.shadowRoot.querySelector(".ea-progress__path");
      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        "#f56c6c"
      );
    });

    it("应该支持函数 color", async () => {
      const colorFn = percentage => {
        if (percentage < 30) return "#909399";
        if (percentage < 70) return "#e6a23c";
        return "#67c23a";
      };
      const progress = document.createElement("ea-progress");
      progress.color = colorFn;
      container.appendChild(progress);

      await waitForRender();

      expect(typeof progress.color).toBe("function");
    });

    it("函数 color 应该调用函数并设置返回的颜色", async () => {
      const colorFn = vi.fn(percentage => {
        if (percentage < 30) return "#909399";
        if (percentage < 70) return "#e6a23c";
        return "#67c23a";
      });

      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "50");
      progress.color = colorFn;
      container.appendChild(progress);

      await waitForRender();

      expect(colorFn).toHaveBeenCalledWith(50);
      const pathEl = progress.shadowRoot.querySelector(".ea-progress__path");
      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        "#e6a23c"
      );
    });

    it("空 color 不应该设置 CSS 变量", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const pathEl = progress.shadowRoot.querySelector(".ea-progress__path");
      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        ""
      );
    });

    it("undefined color 不应该设置 CSS 变量", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      progress.color = undefined;
      await waitForRender();

      const pathEl = progress.shadowRoot.querySelector(".ea-progress__path");
      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        ""
      );
    });

    it("函数 color 在 percentage 变化时应该重新计算", async () => {
      const colorFn = vi.fn(percentage => {
        if (percentage < 30) return "#909399";
        if (percentage < 70) return "#e6a23c";
        return "#67c23a";
      });

      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "20");
      progress.color = colorFn;
      container.appendChild(progress);

      await waitForRender();

      expect(colorFn).toHaveBeenCalledWith(20);

      progress.setAttribute("percentage", "80");
      await waitForRender();

      expect(colorFn).toHaveBeenCalledWith(80);
    });

    it("color 属性应该覆盖 status 的默认颜色", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "success");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      progress.color = "#6f7ad3";
      await waitForRender();

      const pathEl = progress.shadowRoot.querySelector(".ea-progress__path");
      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        "#6f7ad3"
      );
    });

    it("circle 变体应该支持字符串 color", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      progress.color = "#6f7ad3";
      await waitForRender();

      const pathEl = progress.shadowRoot.querySelector(".ea-progress__path");
      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        "#6f7ad3"
      );
    });

    it("dashboard 变体应该支持字符串 color", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      progress.color = "#6f7ad3";
      await waitForRender();

      const pathEl = progress.shadowRoot.querySelector(".ea-progress__path");
      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        "#6f7ad3"
      );
    });
  });

  describe("Events", () => {
    it("percentage 变化时应该触发 change 事件", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "0");
      container.appendChild(progress);

      await waitForRender();

      const changeHandler = vi.fn();
      progress.addEventListener("change", changeHandler);

      progress.setAttribute("percentage", "50");
      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });

    it("change 事件应该包含 percentage 详情", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "0");
      container.appendChild(progress);

      await waitForRender();

      let eventDetail = null;
      progress.addEventListener("change", e => {
        eventDetail = e.detail;
      });

      progress.setAttribute("percentage", "75");
      await waitForRender();

      expect(eventDetail).toBeTruthy();
      expect(eventDetail.percentage).toBe(75);
    });

    it("多次更新 percentage 应该触发多次 change 事件", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "0");
      container.appendChild(progress);

      await waitForRender();

      const changeHandler = vi.fn();
      progress.addEventListener("change", changeHandler);

      progress.setAttribute("percentage", "25");
      await waitForRender();

      progress.setAttribute("percentage", "50");
      await waitForRender();

      expect(changeHandler).toHaveBeenCalledTimes(2);
    });

    it("change 事件应该冒泡", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "0");
      container.appendChild(progress);

      await waitForRender();

      const changeHandler = vi.fn();
      container.addEventListener("change", changeHandler);

      progress.setAttribute("percentage", "50");
      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });

    it("percentage 被限制为 0 时（负数）会触发 change 事件", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "0");
      container.appendChild(progress);

      await waitForRender();

      const changeHandler = vi.fn();
      progress.addEventListener("change", changeHandler);

      progress.setAttribute("percentage", "-10");
      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });

    it("percentage 被限制为 100 时（超过 100）会触发 change 事件", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "100");
      container.appendChild(progress);

      await waitForRender();

      const changeHandler = vi.fn();
      progress.addEventListener("change", changeHandler);

      progress.setAttribute("percentage", "150");
      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });
  });

  describe("updateContainerClasslist Method", () => {
    it("应该返回 BEM 格式的类名字符串", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const className = progress.updateContainerClasslist();
      expect(className).toContain("ea-progress");
    });

    it("line 变体应该包含 is-line 状态类", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const className = progress.updateContainerClasslist();
      expect(className).toContain("is-line");
    });

    it("circle 变体应该包含 is-circle 状态类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      container.appendChild(progress);

      await waitForRender();

      const className = progress.updateContainerClasslist();
      expect(className).toContain("is-circle");
    });

    it("dashboard 变体应该包含 is-dashboard 状态类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      container.appendChild(progress);

      await waitForRender();

      const className = progress.updateContainerClasslist();
      expect(className).toContain("is-dashboard");
    });

    it("showText 为 true 时应该包含 is-show-text 状态类", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      const className = progress.updateContainerClasslist();
      expect(className).toContain("is-show-text");
    });

    it("showText 为 false 时不应包含 is-show-text 状态类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("show-text", "false");
      container.appendChild(progress);

      await waitForRender();

      const className = progress.updateContainerClasslist();
      expect(className).not.toContain("is-show-text");
    });

    it("indeterminate + line 应该包含 is-indeterminate 状态类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("indeterminate", "");
      container.appendChild(progress);

      await waitForRender();

      const className = progress.updateContainerClasslist();
      expect(className).toContain("is-indeterminate");
    });

    it("indeterminate + circle 不应该包含 is-indeterminate 状态类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      progress.setAttribute("indeterminate", "");
      container.appendChild(progress);

      await waitForRender();

      const className = progress.updateContainerClasslist();
      expect(className).not.toContain("is-indeterminate");
    });

    it("stripedFlow 为 true 时应该包含 is-striped-flow 状态类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("striped-flow", "");
      container.appendChild(progress);

      await waitForRender();

      const className = progress.updateContainerClasslist();
      expect(className).toContain("is-striped-flow");
    });

    it("striped 为 true 时应该包含 ea-progress--striped 修饰类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("striped", "");
      container.appendChild(progress);

      await waitForRender();

      const className = progress.updateContainerClasslist();
      expect(className).toContain("ea-progress--striped");
    });

    it("textInside 为 true 时应该包含 ea-progress--text-inside 修饰类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("text-inside", "");
      container.appendChild(progress);

      await waitForRender();

      const className = progress.updateContainerClasslist();
      expect(className).toContain("ea-progress--text-inside");
    });

    it("status 应该添加对应的修饰类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "success");
      container.appendChild(progress);

      await waitForRender();

      const className = progress.updateContainerClasslist();
      expect(className).toContain("ea-progress--success");
    });

    it("应该同时包含多个修饰类和状态类", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "success");
      progress.setAttribute("striped", "");
      progress.setAttribute("text-inside", "");
      container.appendChild(progress);

      await waitForRender();

      const className = progress.updateContainerClasslist();
      expect(className).toContain("ea-progress--success");
      expect(className).toContain("ea-progress--striped");
      expect(className).toContain("ea-progress--text-inside");
      expect(className).toContain("is-line");
      expect(className).toContain("is-show-text");
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "50");
      progress.setAttribute("variant", "line");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.shadowRoot).toBeTruthy();
      expect(progress.percentage).toBe(50);
      expect(progress.variant).toBe("line");
    });

    it("组件断开连接后应该正常移除", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      progress.remove();

      expect(progress.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.percentage).toBe(0);

      progress.setAttribute("percentage", "60");
      await waitForRender();

      expect(progress.percentage).toBe(60);
    });

    it("动态更新 variant 应该重新渲染", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "line");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.variant).toBe("line");

      progress.setAttribute("variant", "circle");
      await waitForRender();

      expect(progress.variant).toBe("circle");
      expect(progress.shadowRoot.querySelector("svg")).toBeTruthy();
    });

    it("$mount 时应该读取 color attribute 并设置 color property", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("color", "#ff0000");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.color).toBe("#ff0000");
    });

    it("$mount 时如果没有 color attribute 则 color property 保持默认", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.color).toBe("");
    });
  });

  describe("Complex Scenarios", () => {
    it("应该支持 status + textInside 组合", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "success");
      progress.setAttribute("text-inside", "");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--success")).toBe(true);
      expect(containerEl.classList.contains("ea-progress--text-inside")).toBe(
        true
      );
    });

    it("textInside 为 true 时 status 不应该显示图标", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "success");
      progress.setAttribute("text-inside", "");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const icon = progress.shadowRoot.querySelector(
        "ea-icon.ea-progress__status"
      );
      expect(icon).toBeFalsy();
    });

    it("应该支持 striped + stripedFlow 组合", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("striped", "");
      progress.setAttribute("striped-flow", "");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--striped")).toBe(true);
      expect(containerEl.classList.contains("is-striped-flow")).toBe(true);
    });

    it("应该支持 indeterminate + stripedFlow 组合", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("indeterminate", "");
      progress.setAttribute("striped-flow", "");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("is-indeterminate")).toBe(true);
      expect(containerEl.classList.contains("is-striped-flow")).toBe(true);
    });

    it("应该支持 circle 变体 + status 组合", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      progress.setAttribute("status", "success");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--success")).toBe(true);
      expect(containerEl.classList.contains("is-circle")).toBe(true);
    });

    it("应该支持 dashboard 变体 + status 组合", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      progress.setAttribute("status", "exception");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--exception")).toBe(
        true
      );
      expect(containerEl.classList.contains("is-dashboard")).toBe(true);
    });

    it("应该支持字符串 color + status 组合（color 优先）", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "success");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      progress.color = "#6f7ad3";
      await waitForRender();

      const pathEl = progress.shadowRoot.querySelector(".ea-progress__path");
      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        "#6f7ad3"
      );
    });

    it("应该支持多种属性同时设置", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "70");
      progress.setAttribute("stroke-width", "12px");
      progress.setAttribute("striped", "");
      progress.setAttribute("show-text", "");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.percentage).toBe(70);
      expect(progress.strokeWidth).toBe("12px");
      expect(progress.striped).toBe(true);
      expect(progress.showText).toBe(true);
    });

    it("应该支持从 line 切换到 circle 并保留 percentage", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "60");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.percentage).toBe(60);

      progress.setAttribute("variant", "circle");
      await waitForRender();

      expect(progress.variant).toBe("circle");
      expect(progress.percentage).toBe(60);
    });

    it("应该支持从 circle 切换回 line", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.shadowRoot.querySelector("svg")).toBeTruthy();

      progress.setAttribute("variant", "line");
      await waitForRender();

      expect(progress.variant).toBe("line");
      expect(
        progress.shadowRoot.querySelector("section.ea-progress__track")
      ).toBeTruthy();
    });

    it("应该支持动态切换 status", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");

      progress.setAttribute("status", "success");
      await waitForRender();
      expect(containerEl.classList.contains("ea-progress--success")).toBe(true);

      progress.setAttribute("status", "warning");
      await waitForRender();
      expect(containerEl.classList.contains("ea-progress--success")).toBe(
        false
      );
      expect(containerEl.classList.contains("ea-progress--warning")).toBe(true);

      progress.setAttribute("status", "exception");
      await waitForRender();
      expect(containerEl.classList.contains("ea-progress--warning")).toBe(
        false
      );
      expect(containerEl.classList.contains("ea-progress--exception")).toBe(
        true
      );
    });

    it("应该支持函数 color 在 percentage 变化时重新计算", async () => {
      const colorFn = vi.fn(percentage => {
        if (percentage < 30) return "#909399";
        if (percentage < 70) return "#e6a23c";
        return "#67c23a";
      });

      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "20");
      progress.color = colorFn;
      container.appendChild(progress);

      await waitForRender();

      expect(colorFn).toHaveBeenCalledWith(20);

      progress.setAttribute("percentage", "80");
      await waitForRender();

      expect(colorFn).toHaveBeenCalledWith(80);
    });

    it("应该支持 indeterminate + striped + stripedFlow 三重组合", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("indeterminate", "");
      progress.setAttribute("striped", "");
      progress.setAttribute("striped-flow", "");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("is-indeterminate")).toBe(true);
      expect(containerEl.classList.contains("ea-progress--striped")).toBe(true);
      expect(containerEl.classList.contains("is-striped-flow")).toBe(true);
    });

    it("应该支持 circle 变体 + status + color 组合", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      progress.setAttribute("status", "success");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      progress.color = "#6f7ad3";
      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--success")).toBe(true);
      expect(containerEl.classList.contains("is-circle")).toBe(true);

      const pathEl = progress.shadowRoot.querySelector(".ea-progress__path");
      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        "#6f7ad3"
      );
    });

    it("应该支持 dashboard 变体 + strokeWidth + percentage 组合", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      progress.setAttribute("stroke-width", "6px");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const pathCircle = progress.shadowRoot.querySelector(
        "circle.ea-progress__path"
      );
      const trackCircle = progress.shadowRoot.querySelector(
        "circle.ea-progress__track"
      );
      expect(pathCircle.style.strokeDasharray).toBeTruthy();
      expect(trackCircle.style.strokeDasharray).toBeTruthy();
    });

    it("从 dashboard 切换到 line 后 SVG 应该被替换为 section 结构", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.shadowRoot.querySelector("svg")).toBeTruthy();
      expect(progress.shadowRoot.querySelector("mask#myMask")).toBeTruthy();

      progress.setAttribute("variant", "line");
      await waitForRender();

      expect(progress.shadowRoot.querySelector("svg")).toBeFalsy();
      expect(progress.shadowRoot.querySelector("mask#myMask")).toBeFalsy();
      expect(
        progress.shadowRoot.querySelector("section.ea-progress__track")
      ).toBeTruthy();
    });

    it("应该支持所有三种变体的完整循环切换", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      expect(progress.variant).toBe("line");
      expect(
        progress.shadowRoot.querySelector("section.ea-progress__track")
      ).toBeTruthy();

      progress.setAttribute("variant", "circle");
      await waitForRender();
      expect(progress.variant).toBe("circle");
      expect(progress.shadowRoot.querySelector("svg")).toBeTruthy();

      progress.setAttribute("variant", "dashboard");
      await waitForRender();
      expect(progress.variant).toBe("dashboard");
      expect(progress.shadowRoot.querySelector("mask#myMask")).toBeTruthy();

      progress.setAttribute("variant", "line");
      await waitForRender();
      expect(progress.variant).toBe("line");
      expect(
        progress.shadowRoot.querySelector("section.ea-progress__track")
      ).toBeTruthy();
    });

    it("应该支持数组 color 在 percentage 变化时自动更新颜色", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "10");
      progress.color = [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#6f7ad3", percentage: 80 },
      ];
      container.appendChild(progress);

      await waitForRender();

      const pathEl = progress.shadowRoot.querySelector(".ea-progress__path");
      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        "#f56c6c"
      );

      progress.setAttribute("percentage", "50");
      await waitForRender();

      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        "#5cb87a"
      );

      progress.setAttribute("percentage", "90");
      await waitForRender();

      expect(pathEl.style.getPropertyValue("--ea-progress-path-color")).toBe(
        "#f56c6c"
      );
    });

    it("应该支持 showText=false 隐藏百分比文字", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "50");
      progress.setAttribute("show-text", "false");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("is-show-text")).toBe(false);
    });

    it("应该支持 circle 变体 + size + strokeWidth 组合", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      progress.setAttribute("size", "200px");
      progress.setAttribute("stroke-width", "8px");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.style.getPropertyValue("--ea-progress-size")).toBe(
        "200px"
      );
      expect(
        containerEl.style.getPropertyValue("--ea-progress-stroke-width")
      ).toBe("8px");
    });

    it("应该支持 warning 状态在 circle 变体中显示图标", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "circle");
      progress.setAttribute("status", "warning");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const icon = progress.shadowRoot.querySelector(
        "ea-icon.ea-progress__status"
      );
      expect(icon).toBeTruthy();
      expect(icon.getAttribute("name")).toBe("triangle-exclamation");
    });

    it("应该支持 exception 状态在 dashboard 变体中显示图标", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("variant", "dashboard");
      progress.setAttribute("status", "exception");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await waitForRender();

      const icon = progress.shadowRoot.querySelector(
        "ea-icon.ea-progress__status"
      );
      expect(icon).toBeTruthy();
      expect(icon.getAttribute("name")).toBe("circle-xmark");
    });
  });
});
