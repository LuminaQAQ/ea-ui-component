import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import "../../components/ea-tabs/index.ts";
import "../../components/ea-splitter/index.ts";

const WAIT = { timeout: 5000 };

describe("真实浏览器布局套件", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.style.width = "600px";
    container.style.height = "200px";
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  function createTabs() {
    const tabs = document.createElement("ea-tabs");
    tabs.innerHTML = `
      <ea-tab panel="panel0">Tab 0</ea-tab>
      <ea-tab panel="panel1">Tab 1</ea-tab>
      <ea-tab panel="panel2">Tab 2</ea-tab>
      <ea-tab-panel name="panel0">Content 0</ea-tab-panel>
      <ea-tab-panel name="panel1">Content 1</ea-tab-panel>
      <ea-tab-panel name="panel2">Content 2</ea-tab-panel>
    `;
    return tabs;
  }

  function tabRects(tabs) {
    return [...tabs.querySelectorAll("ea-tab")].map(tab =>
      tab.getBoundingClientRect()
    );
  }

  describe("ea-tabs 指示条几何", () => {
    it("指示条尺寸应来自导航栏内标签的真实宽度", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);

      await vi.waitFor(() => {
        const rects = tabRects(tabs);
        expect(rects).toHaveLength(3);
        expect(rects[1].x).toBeGreaterThan(rects[0].x);
        expect(rects[2].x).toBeGreaterThan(rects[1].x);
        expect(rects[1].y).toBe(rects[0].y);
      }, WAIT);

      const navWidth = tabs.shadowRoot
        .querySelector(".ea-tabs__nav")
        .getBoundingClientRect().width;
      const activeTabWidth = tabs.querySelector('[panel="panel0"]').offsetWidth;
      const size = parseFloat(
        tabs.style.getPropertyValue("--ea-tabs-indicator-size")
      );

      expect(Number.isFinite(size)).toBe(true);
      expect(size).toBeCloseTo(activeTabWidth, 0);
      expect(size).toBeLessThan(navWidth);
    });

    it("切换激活标签后指示条偏移应随真实位置变化", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);

      await vi.waitFor(() => {
        const rects = tabRects(tabs);
        expect(rects[2].x).toBeGreaterThan(rects[0].x);
      }, WAIT);

      const firstX = parseFloat(
        tabs.style.getPropertyValue("--ea-tabs-indicator-x")
      );
      expect(Number.isFinite(firstX)).toBe(true);

      tabs.active = "panel2";

      await vi.waitFor(() => {
        const lastX = parseFloat(
          tabs.style.getPropertyValue("--ea-tabs-indicator-x")
        );
        expect(Number.isFinite(lastX)).toBe(true);
        expect(lastX).toBeGreaterThan(firstX);
      }, WAIT);
    });
  });

  describe("ea-splitter 拖拽布局", () => {
    it("拖拽分隔条应真实改变相邻面板宽度", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel min="0">Panel 1</ea-splitter-panel>
        <ea-splitter-panel min="0">Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      const panels = [...splitter.querySelectorAll("ea-splitter-panel")];
      await Promise.all([
        splitter.updateComplete,
        ...panels.map(panel => panel.updateComplete),
      ]);

      const beforePre = panels[0].getBoundingClientRect().width;
      const beforeNext = panels[1].getBoundingClientRect().width;

      expect(beforePre).toBeGreaterThan(0);
      expect(beforeNext).toBeGreaterThan(0);

      const bar = splitter.querySelector("ea-splitter-bar");
      const barRect = bar.getBoundingClientRect();
      const startX = barRect.left + barRect.width / 2;

      bar.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true, clientX: startX })
      );
      window.dispatchEvent(
        new MouseEvent("mousemove", { clientX: startX + 100 })
      );
      window.dispatchEvent(new MouseEvent("mouseup"));

      await vi.waitFor(() => {
        expect(panels[0].getBoundingClientRect().width).toBeCloseTo(
          beforePre + 100,
          0
        );
        expect(panels[1].getBoundingClientRect().width).toBeCloseTo(
          beforeNext - 100,
          0
        );
      }, WAIT);
    });
  });
});
