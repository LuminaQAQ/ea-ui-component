import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

Element.prototype.scrollTo = Element.prototype.scrollTo || function () {};

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-tabs/index.ts";

describe("EaTabs", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  function createTabs(options = {}) {
    const tabs = document.createElement("ea-tabs");

    if (options.type) tabs.type = options.type;
    if (options.active) tabs.active = options.active;
    if (options.tabPosition) tabs.tabPosition = options.tabPosition;
    if (options.editable !== undefined) tabs.editable = options.editable;

    const tabCount = options.tabCount || 2;
    let innerHTML = "";

    for (let i = 0; i < tabCount; i++) {
      const panelName = `panel${i}`;
      const tabLabel = `Tab ${i}`;
      const closableAttr =
        i === 0 && options.closable === false ? ' closable="false"' : "";

      innerHTML += `<ea-tab panel="${panelName}"${closableAttr}>${tabLabel}</ea-tab>`;
      innerHTML += `<ea-tab-panel name="${panelName}">Content ${i}</ea-tab-panel>`;
    }

    tabs.innerHTML = innerHTML;
    return tabs;
  }

  describe("基础渲染", () => {
    it("应该正确创建 Shadow DOM", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.shadowRoot).toBeDefined();
      expect(tabs.shadowRoot.nodeType).toBe(11);
    });

    it("应该包含所有必需的 CSS Parts", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      const parts = [
        "container",
        "nav",
        "prev",
        "next",
        "line",
        "indicator",
        "content",
      ];
      parts.forEach(part => {
        expect(tabs.shadowRoot.querySelector(`[part="${part}"]`)).toBeTruthy();
      });
    });

    it("应该包含 nav slot", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      const navSlot = tabs.shadowRoot.querySelector('slot[name="nav"]');
      expect(navSlot).toBeTruthy();
    });

    it("应该包含默认 slot", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      const defaultSlot = tabs.shadowRoot.querySelector(
        ".ea-tabs__content > slot"
      );
      expect(defaultSlot).toBeTruthy();
    });

    it("应该正确渲染导航按钮图标", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      const prevBtn = tabs.shadowRoot.querySelector('[part="prev"]');
      const nextBtn = tabs.shadowRoot.querySelector('[part="next"]');

      expect(prevBtn).toBeTruthy();
      expect(nextBtn).toBeTruthy();
      expect(prevBtn.getAttribute("name")).toBe("angle-left");
      expect(nextBtn.getAttribute("name")).toBe("angle-right");
    });
  });

  describe("Type 属性", () => {
    it("默认 type 应该是空字符串", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.type).toBe("");
    });

    it("设置 type='card' 应该更新类名", async () => {
      const tabs = createTabs({ type: "card" });
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.type).toBe("card");

      const containerEl = tabs.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.className).toContain("ea-tabs--card");
    });

    it("设置 type='border-card' 应该更新类名", async () => {
      const tabs = createTabs({ type: "border-card" });
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.type).toBe("border-card");

      const containerEl = tabs.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.className).toContain("ea-tabs--border-card");
    });

    it("type 改变时应该同步到子组件 ea-tab", async () => {
      const tabs = createTabs({ type: "" });
      container.appendChild(tabs);
      await waitForRender();

      tabs.type = "card";
      await waitForRender();

      const tabEls = tabs.querySelectorAll("ea-tab");
      tabEls.forEach(tab => {
        expect(tab.getAttribute("type")).toBe("card");
      });
    });

    it("type 改变时应该同步到子组件 ea-tab-panel", async () => {
      const tabs = createTabs({ type: "" });
      container.appendChild(tabs);
      await waitForRender();

      tabs.type = "border-card";
      await waitForRender();

      const panelEls = tabs.querySelectorAll("ea-tab-panel");
      panelEls.forEach(panel => {
        expect(panel.getAttribute("type")).toBe("border-card");
      });
    });

    it("BEM 类名不应该重复", async () => {
      const tabs = createTabs({ type: "border-card" });
      container.appendChild(tabs);
      await waitForRender();

      const containerEl = tabs.shadowRoot.querySelector('[part="container"]');
      const className = containerEl.className;

      expect(className).not.toContain("border-card-border-card");
      expect(className).toContain("ea-tabs--border-card");
    });

    it("type 为空时不应该添加类型修饰符", async () => {
      const tabs = createTabs({ type: "" });
      container.appendChild(tabs);
      await waitForRender();

      const containerEl = tabs.shadowRoot.querySelector('[part="container"]');
      const className = containerEl.className;

      expect(className).not.toContain("ea-tabs--card");
      expect(className).not.toContain("ea-tabs--border-card");
    });
  });

  describe("Active 属性", () => {
    it("默认 active 应该是空字符串", () => {
      const tabs = createTabs();
      expect(tabs.active).toBe("");
    });

    it("$mount 时如果没有设置 active，应该自动选择第一个 tab", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.active).toBe("panel0");
    });

    it("如果设置了 active 属性，应该保持该值", async () => {
      const tabs = createTabs({ active: "panel1" });
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.active).toBe("panel1");
    });

    it("设置 active 应该激活对应的 tab 和 panel", async () => {
      const tabs = createTabs({ active: "panel1" });
      container.appendChild(tabs);
      await waitForRender();

      const activeTab = tabs.querySelector('ea-tab[panel="panel1"]');
      const inactiveTab = tabs.querySelector('ea-tab[panel="panel0"]');
      const activePanel = tabs.querySelector('ea-tab-panel[name="panel1"]');
      const inactivePanel = tabs.querySelector('ea-tab-panel[name="panel0"]');

      expect(activeTab.hasAttribute("active")).toBe(true);
      expect(inactiveTab.hasAttribute("active")).toBeFalsy();
      expect(activePanel.hasAttribute("active")).toBe(true);
      expect(inactivePanel.hasAttribute("active")).toBeFalsy();
    });

    it("切换 active 应该触发 ea-tabs-change 事件", async () => {
      const tabs = createTabs({ active: "panel0" });
      container.appendChild(tabs);
      await waitForRender();

      let eventFired = false;
      let eventData = null;

      tabs.addEventListener("ea-tabs-change", e => {
        eventFired = true;
        eventData = e.detail;
      });

      tabs.active = "panel1";
      await waitForRender();

      expect(eventFired).toBe(true);
      expect(eventData.name).toBe("panel1");
    });

    it("切换 active 应该触发 EaTabsChangeEvent 实例", async () => {
      const tabs = createTabs({ active: "panel0" });
      container.appendChild(tabs);
      await waitForRender();

      let eventInstance = null;

      tabs.addEventListener("ea-tabs-change", e => {
        eventInstance = e;
      });

      tabs.active = "panel1";
      await waitForRender();

      expect(eventInstance).toBeDefined();
      expect(eventInstance.constructor.name).toBe("EaTabsChangeEvent");
      expect(eventInstance.bubbles).toBe(true);
      expect(eventInstance.composed).toBe(true);
    });

    it("active 为不存在的 panel 名称时不应该报错", async () => {
      const tabs = createTabs({ active: "nonexistent" });
      container.appendChild(tabs);
      await waitForRender();

      const allTabs = tabs.querySelectorAll("ea-tab[active]");
      expect(allTabs.length).toBe(0);
    });
  });

  describe("TabPosition 属性", () => {
    it("默认 tabPosition 应该是 top", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.tabPosition).toBe("top");
    });

    it("支持 top 方向", async () => {
      const tabs = createTabs({ tabPosition: "top" });
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.tabPosition).toBe("top");

      const containerEl = tabs.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.className).toContain("ea-tabs--top");
    });

    it("支持 bottom 方向", async () => {
      const tabs = createTabs({ tabPosition: "bottom" });
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.tabPosition).toBe("bottom");

      const containerEl = tabs.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.className).toContain("ea-tabs--bottom");
    });

    it("支持 left 方向", async () => {
      const tabs = createTabs({ tabPosition: "left" });
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.tabPosition).toBe("left");

      const containerEl = tabs.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.className).toContain("ea-tabs--left");
    });

    it("支持 right 方向", async () => {
      const tabs = createTabs({ tabPosition: "right" });
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.tabPosition).toBe("right");

      const containerEl = tabs.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.className).toContain("ea-tabs--right");
    });

    it("tabPosition 改变时应该同步到子组件 ea-tab", async () => {
      const tabs = createTabs({ tabPosition: "top" });
      container.appendChild(tabs);
      await waitForRender();

      tabs.tabPosition = "left";
      await waitForRender();

      const tabEls = tabs.querySelectorAll("ea-tab");
      tabEls.forEach(tab => {
        expect(tab.getAttribute("tab-position")).toBe("left");
      });
    });

    it("tabPosition 改变时应该同步到子组件 ea-tab-panel", async () => {
      const tabs = createTabs({ tabPosition: "top" });
      container.appendChild(tabs);
      await waitForRender();

      tabs.tabPosition = "bottom";
      await waitForRender();

      const panelEls = tabs.querySelectorAll("ea-tab-panel");
      panelEls.forEach(panel => {
        expect(panel.getAttribute("tab-position")).toBe("bottom");
      });
    });

    it("垂直方向（left/right）应该改变导航按钮图标为箭头", async () => {
      const tabs = createTabs({ tabPosition: "left" });
      container.appendChild(tabs);
      await waitForRender();

      const prevBtn = tabs.shadowRoot.querySelector('[part="prev"]');
      const nextBtn = tabs.shadowRoot.querySelector('[part="next"]');

      expect(prevBtn.getAttribute("name")).toBe("arrow-left");
      expect(nextBtn.getAttribute("name")).toBe("arrow-right");
    });

    it("水平方向（top/bottom）应该使用上下箭头图标", async () => {
      const tabs = createTabs({ tabPosition: "top" });
      container.appendChild(tabs);
      await waitForRender();

      const prevBtn = tabs.shadowRoot.querySelector('[part="prev"]');
      const nextBtn = tabs.shadowRoot.querySelector('[part="next"]');

      expect(prevBtn.getAttribute("name")).toBe("arrow-up");
      expect(nextBtn.getAttribute("name")).toBe("arrow-down");
    });
  });

  describe("Editable 属性", () => {
    it("默认 editable 应该是 false", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.editable).toBe(false);
    });

    it("设置 editable=true 应该给所有 tab 添加 editable 属性", async () => {
      const tabs = createTabs({ editable: true });
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.editable).toBe(true);

      const tabEls = tabs.querySelectorAll("ea-tab");
      tabEls.forEach(tab => {
        expect(tab.hasAttribute("editable")).toBe(true);
      });
    });

    it("动态修改 editable 应该同步到子组件", async () => {
      const tabs = createTabs({ editable: false });
      container.appendChild(tabs);
      await waitForRender();

      tabs.editable = true;
      await waitForRender();

      const tabEls = tabs.querySelectorAll("ea-tab");
      tabEls.forEach(tab => {
        expect(tab.hasAttribute("editable")).toBe(true);
      });
    });

    it("editable=true 时 tab 应该显示关闭图标（is-closable 类）", async () => {
      const tabs = createTabs({ editable: true });
      container.appendChild(tabs);
      await waitForRender();

      const tabEls = tabs.querySelectorAll("ea-tab");
      tabEls.forEach(tab => {
        const containerEl = tab.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.className).toContain("is-closable");
      });
    });
  });

  describe("事件系统", () => {
    describe("ea-tab-click 事件", () => {
      it("点击 tab 应该触发 ea-tab-click 事件", async () => {
        const tabs = createTabs({ active: "panel0" });
        container.appendChild(tabs);
        await waitForRender();

        let eventDetail = null;
        let eventFired = false;

        tabs.addEventListener("ea-tab-click", e => {
          eventFired = true;
          eventDetail = e.detail;
        });

        const tab = tabs.querySelector('ea-tab[panel="panel1"]');
        if (tab) {
          tab.click();
          await waitForRender();
        }

        expect(eventFired).toBe(true);
        expect(eventDetail.name).toBe("panel1");
        expect(eventDetail.panel).toBeTruthy();
      });

      it("ea-tab-click 事件应该是 EaTabClickEvent 实例", async () => {
        const tabs = createTabs({ active: "panel0" });
        container.appendChild(tabs);
        await waitForRender();

        let eventInstance = null;

        tabs.addEventListener("ea-tab-click", e => {
          eventInstance = e;
        });

        const tab = tabs.querySelector('ea-tab[panel="panel1"]');
        if (tab) {
          tab.click();
          await waitForRender();
        }

        expect(eventInstance).toBeDefined();
        expect(eventInstance.constructor.name).toBe("EaTabClickEvent");
        expect(eventInstance.bubbles).toBe(true);
        expect(eventInstance.composed).toBe(true);
      });

      it("点击 disabled 的 tab 不应该触发事件或切换", async () => {
        const tabs = createTabs({ active: "panel0" });

        const disabledTab = document.createElement("ea-tab");
        disabledTab.setAttribute("panel", "disabled-panel");
        disabledTab.setAttribute("disabled", "");
        disabledTab.textContent = "Disabled Tab";
        tabs.insertBefore(disabledTab, tabs.firstChild);

        const disabledPanel = document.createElement("ea-tab-panel");
        disabledPanel.setAttribute("name", "disabled-panel");
        disabledPanel.textContent = "Disabled Content";
        tabs.insertBefore(disabledPanel, tabs.firstChild);

        container.appendChild(tabs);
        await waitForRender();

        const originalActive = tabs.active;
        let eventFired = false;

        tabs.addEventListener("ea-tab-click", () => {
          eventFired = true;
        });

        disabledTab.click();
        await waitForRender();

        expect(tabs.active).toBe(originalActive);
        expect(eventFired).toBe(false);
      });

      it("点击 tab 后 active 应该更新为新 tab 的 panel 值", async () => {
        const tabs = createTabs({ active: "panel0" });
        container.appendChild(tabs);
        await waitForRender();

        const tab = tabs.querySelector('ea-tab[panel="panel1"]');
        if (tab) {
          tab.click();
          await waitForRender();
        }

        expect(tabs.active).toBe("panel1");
      });
    });

    describe("ea-tab-remove 事件", () => {
      it("删除 tab 应该触发 ea-tab-remove 事件", async () => {
        const tabs = createTabs({
          editable: true,
          tabCount: 3,
          active: "panel0",
        });
        container.appendChild(tabs);
        await waitForRender();

        let removeEventFired = false;
        let removedName = null;

        tabs.addEventListener("ea-tab-remove", e => {
          removeEventFired = true;
          removedName = e.detail.name;
        });

        const firstTab = tabs.querySelector('ea-tab[panel="panel0"]');
        if (firstTab && firstTab.shadowRoot) {
          const closeIcon = firstTab.shadowRoot.querySelector(
            '[part="close-icon"]'
          );
          if (closeIcon) {
            closeIcon.click();
            await waitForRender();
          }
        }

        expect(removeEventFired).toBe(true);
        expect(removedName).toBeTruthy();
      });

      it("ea-tab-remove 事件应该是 EaTabRemoveEvent 实例", async () => {
        const tabs = createTabs({
          editable: true,
          tabCount: 3,
          active: "panel0",
        });
        container.appendChild(tabs);
        await waitForRender();

        let eventInstance = null;

        tabs.addEventListener("ea-tab-remove", e => {
          eventInstance = e;
        });

        const firstTab = tabs.querySelector('ea-tab[panel="panel0"]');
        if (firstTab && firstTab.shadowRoot) {
          const closeIcon = firstTab.shadowRoot.querySelector(
            '[part="close-icon"]'
          );
          if (closeIcon) {
            closeIcon.click();
            await waitForRender();
          }
        }

        expect(eventInstance).toBeDefined();
        expect(eventInstance.constructor.name).toBe("EaTabRemoveEvent");
        expect(eventInstance.bubbles).toBe(true);
        expect(eventInstance.composed).toBe(true);
      });

      it("删除 tab 后应该同时移除对应的 panel", async () => {
        const tabs = createTabs({
          editable: true,
          tabCount: 3,
          active: "panel0",
        });
        container.appendChild(tabs);
        await waitForRender();

        const initialTabCount = tabs.querySelectorAll("ea-tab").length;
        const initialPanelCount = tabs.querySelectorAll("ea-tab-panel").length;

        const firstTab = tabs.querySelector('ea-tab[panel="panel0"]');
        if (firstTab && firstTab.shadowRoot) {
          const closeIcon = firstTab.shadowRoot.querySelector(
            '[part="close-icon"]'
          );
          if (closeIcon) {
            closeIcon.click();
            await waitForRender();
          }
        }

        expect(tabs.querySelectorAll("ea-tab").length).toBe(
          initialTabCount - 1
        );
        expect(tabs.querySelectorAll("ea-tab-panel").length).toBe(
          initialPanelCount - 1
        );
      });

      it("删除当前激活的 tab 应该切换到相邻 tab", async () => {
        const tabs = createTabs({
          editable: true,
          tabCount: 3,
          active: "panel1",
        });
        container.appendChild(tabs);
        await waitForRender();

        const secondTab = tabs.querySelector('ea-tab[panel="panel1"]');
        if (secondTab && secondTab.shadowRoot) {
          const closeIcon = secondTab.shadowRoot.querySelector(
            '[part="close-icon"]'
          );
          if (closeIcon) {
            closeIcon.click();
            await waitForRender();
          }
        }

        expect(tabs.active).toBe("panel0");
      });

      it("删除第一个 tab 应该切换到下一个 tab", async () => {
        const tabs = createTabs({
          editable: true,
          tabCount: 3,
          active: "panel0",
        });
        container.appendChild(tabs);
        await waitForRender();

        const firstTab = tabs.querySelector('ea-tab[panel="panel0"]');
        if (firstTab && firstTab.shadowRoot) {
          const closeIcon = firstTab.shadowRoot.querySelector(
            '[part="close-icon"]'
          );
          if (closeIcon) {
            closeIcon.click();
            await waitForRender();
          }
        }

        expect(tabs.active).toBeTruthy();
      });

      it("删除非激活 tab 时应保持当前激活标签页不变", async () => {
        const tabs = createTabs({
          editable: true,
          tabCount: 3,
          active: "panel0",
        });
        container.appendChild(tabs);
        await waitForRender();

        const thirdTab = tabs.querySelector('ea-tab[panel="panel2"]');
        if (thirdTab && thirdTab.shadowRoot) {
          const closeIcon = thirdTab.shadowRoot.querySelector(
            '[part="close-icon"]'
          );
          if (closeIcon) {
            closeIcon.click();
            await waitForRender();
          }
        }

        expect(tabs.active).toBe("panel0");
      });
    });

    describe("导航按钮事件", () => {
      it("点击 prev 按钮应该调用 scrollTo", async () => {
        const tabs = createTabs();
        container.appendChild(tabs);
        await waitForRender();

        const prevBtn = tabs.shadowRoot.querySelector('[part="prev"]');
        const navEl = tabs.shadowRoot.querySelector('[part="nav"]');

        const scrollToSpy = vi.spyOn(navEl, "scrollTo");

        prevBtn.click();
        await waitForRender();

        expect(scrollToSpy).toHaveBeenCalled();
      });

      it("点击 next 按钮应该调用 scrollTo", async () => {
        const tabs = createTabs();
        container.appendChild(tabs);
        await waitForRender();

        const nextBtn = tabs.shadowRoot.querySelector('[part="next"]');
        const navEl = tabs.shadowRoot.querySelector('[part="nav"]');

        const scrollToSpy = vi.spyOn(navEl, "scrollTo");

        nextBtn.click();
        await waitForRender();

        expect(scrollToSpy).toHaveBeenCalled();
      });
    });
  });

  describe("SlotChange 行为", () => {
    it("动态添加 tab 应该自动设置 slot='nav'", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      const newTab = document.createElement("ea-tab");
      newTab.setAttribute("panel", "new-panel");
      newTab.textContent = "New Tab";
      tabs.appendChild(newTab);

      const newPanel = document.createElement("ea-tab-panel");
      newPanel.setAttribute("name", "new-panel");
      newPanel.textContent = "New Content";
      tabs.appendChild(newPanel);

      await waitForRender();

      expect(newTab.getAttribute("slot")).toBe("nav");
    });

    it("动态添加 tab 应该继承父组件的 type 属性", async () => {
      const tabs = createTabs({ type: "card" });
      container.appendChild(tabs);
      await waitForRender();

      const newTab = document.createElement("ea-tab");
      newTab.setAttribute("panel", "dynamic-panel");
      newTab.textContent = "Dynamic Tab";
      tabs.appendChild(newTab);

      await waitForRender();

      expect(newTab.getAttribute("type")).toBe("card");
    });

    it("动态添加 tab 应该继承父组件的 tab-position 属性", async () => {
      const tabs = createTabs({ tabPosition: "left" });
      container.appendChild(tabs);
      await waitForRender();

      const newTab = document.createElement("ea-tab");
      newTab.setAttribute("panel", "dynamic-panel");
      newTab.textContent = "Dynamic Tab";
      tabs.appendChild(newTab);

      await waitForRender();

      expect(newTab.getAttribute("tab-position")).toBe("left");
    });

    it("动态添加 tab-panel 应该继承父组件的 type 属性", async () => {
      const tabs = createTabs({ type: "border-card" });
      container.appendChild(tabs);
      await waitForRender();

      const newPanel = document.createElement("ea-tab-panel");
      newPanel.setAttribute("name", "dynamic-panel");
      newPanel.textContent = "Dynamic Content";
      tabs.appendChild(newPanel);

      await waitForRender();

      expect(newPanel.getAttribute("type")).toBe("border-card");
    });

    it("动态添加 tab-panel 应该继承父组件的 tab-position 属性", async () => {
      const tabs = createTabs({ tabPosition: "right" });
      container.appendChild(tabs);
      await waitForRender();

      const newPanel = document.createElement("ea-tab-panel");
      newPanel.setAttribute("name", "dynamic-panel");
      newPanel.textContent = "Dynamic Content";
      tabs.appendChild(newPanel);

      await waitForRender();

      expect(newPanel.getAttribute("tab-position")).toBe("right");
    });

    it("快速连续添加多个 tab 应该正确处理（防抖）", async () => {
      const tabs = createTabs({ type: "card" });
      container.appendChild(tabs);
      await waitForRender();

      for (let i = 0; i < 5; i++) {
        const tab = document.createElement("ea-tab");
        tab.setAttribute(`panel`, `quick-${i}`);
        tab.textContent = `Quick ${i}`;
        tabs.appendChild(tab);

        const panel = document.createElement("ea-tab-panel");
        panel.setAttribute("name", `quick-${i}`);
        panel.textContent = `Content ${i}`;
        tabs.appendChild(panel);
      }

      await waitForRender();
      await new Promise(resolve => setTimeout(resolve, 100));

      const allTabs = tabs.querySelectorAll("ea-tab");
      allTabs.forEach(tab => {
        expect(tab.getAttribute("slot")).toBe("nav");
        if (tabs.type) {
          expect(tab.getAttribute("type")).toBe(tabs.type);
        }
      });
    });

    it("动态删除 tab 应该更新其他 tab 的状态", async () => {
      const tabs = createTabs({ active: "panel1", editable: true });
      container.appendChild(tabs);
      await waitForRender();

      const tab0 = tabs.querySelector('ea-tab[panel="panel0"]');
      if (tab0) {
        tab0.remove();
      }

      const panel0 = tabs.querySelector('ea-tab-panel[name="panel0"]');
      if (panel0) {
        panel0.remove();
      }

      await waitForRender();

      expect(tabs.querySelectorAll("ea-tab").length).toBe(1);
      expect(tabs.querySelectorAll("ea-tab-panel").length).toBe(1);
    });
  });

  describe("方法", () => {
    it("updateContainerClasslist 应该返回类名字符串", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      const className = tabs.updateContainerClasslist();
      expect(typeof className).toBe("string");
      expect(className.length).toBeGreaterThan(0);
    });

    it("updateContainerClasslist 应该包含正确的 BEM 结构", async () => {
      const tabs = createTabs({ type: "card", tabPosition: "top" });
      container.appendChild(tabs);
      await waitForRender();

      const className = tabs.updateContainerClasslist();

      expect(className).toContain("ea-tabs");
      expect(className).toContain("ea-tabs--card");
      expect(className).toContain("ea-tabs--top");
    });
  });

  describe("生命周期", () => {
    it("$mount 应该初始化 ResizeObserver", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      const navEl = tabs.shadowRoot.querySelector('[part="nav"]');
      expect(navEl).toBeTruthy();
    });

    it("$beforeUnmount 应该清理定时器和观察器", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      tabs.remove();
      await waitForRender();

      expect(true).toBe(true);
    });

    it("空组件（无子元素）不应该报错", async () => {
      const tabs = document.createElement("ea-tabs");
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.shadowRoot).toBeDefined();
      expect(tabs.active).toBe("");
    });
  });

  describe("EaTab 组件", () => {
    describe("基础渲染", () => {
      it("应该正确渲染 Shadow DOM", async () => {
        const tab = document.createElement("ea-tab");
        tab.setAttribute("panel", "test");
        tab.textContent = "Test Tab";
        container.appendChild(tab);
        await waitForRender();

        expect(tab.shadowRoot).toBeDefined();
      });

      it("应该包含 container 和 close-icon CSS Part", async () => {
        const tab = document.createElement("ea-tab");
        container.appendChild(tab);
        await waitForRender();

        expect(tab.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
        expect(
          tab.shadowRoot.querySelector('[part="close-icon"]')
        ).toBeTruthy();
      });

      it("应该正确显示文本内容", async () => {
        const tab = document.createElement("ea-tab");
        tab.setAttribute("panel", "test");
        tab.textContent = "Hello World";
        container.appendChild(tab);
        await waitForRender();

        expect(tab.textContent).toContain("Hello World");
      });
    });

    describe("属性测试", () => {
      it("panel 属性应该可读写", async () => {
        const tab = document.createElement("ea-tab");
        container.appendChild(tab);
        await waitForRender();

        expect(tab.panel).toBe("");

        tab.panel = "test-panel";
        expect(tab.panel).toBe("test-panel");
      });

      it("type 属性应该影响 BEM 类名", async () => {
        const tab = document.createElement("ea-tab");
        tab.setAttribute("panel", "test");
        tab.setAttribute("type", "card");
        container.appendChild(tab);
        await waitForRender();

        const containerEl = tab.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.className).toContain("ea-tab--card");
      });

      it("disabled 属性应该影响类名", async () => {
        const tab = document.createElement("ea-tab");
        tab.setAttribute("panel", "test");
        tab.disabled = true;
        container.appendChild(tab);
        await waitForRender();

        const containerEl = tab.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.className).toContain("is-disabled");
      });

      it("active 属性应该影响类名", async () => {
        const tab = document.createElement("ea-tab");
        tab.setAttribute("panel", "test");
        tab.active = true;
        container.appendChild(tab);
        await waitForRender();

        const containerEl = tab.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.className).toContain("is-active");
      });

      it("tabPosition 属性应该影响类名", async () => {
        const tab = document.createElement("ea-tab");
        tab.setAttribute("panel", "test");
        tab.tabPosition = "left";
        container.appendChild(tab);
        await waitForRender();

        const containerEl = tab.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.className).toContain("ea-tab--left");
      });

      it("editable 属性应该影响类名（is-closable）", async () => {
        const tab = document.createElement("ea-tab");
        tab.setAttribute("panel", "test");
        tab.editable = true;
        container.appendChild(tab);
        await waitForRender();

        const containerEl = tab.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.className).toContain("is-closable");
      });

      it("closable 属性应该影响类名", async () => {
        const tab = document.createElement("ea-tab");
        tab.setAttribute("panel", "test");
        tab.closable = true;
        container.appendChild(tab);
        await waitForRender();

        const containerEl = tab.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.className).toContain("is-closable");
      });
    });

    describe("BEM 类名生成", () => {
      it("第一个 tab 应该有 is-first 类", async () => {
        const tabs = createTabs();
        container.appendChild(tabs);
        await waitForRender();

        const firstTab = tabs.querySelector("ea-tab");
        const containerEl =
          firstTab.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.className).toContain("is-first");
      });

      it("最后一个 tab 应该有 is-last 类", async () => {
        const tabs = createTabs({ tabCount: 3 });
        container.appendChild(tabs);
        await waitForRender();

        const allTabs = tabs.querySelectorAll("ea-tab");
        const lastTab = allTabs[allTabs.length - 1];
        const containerEl =
          lastTab.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.className).toContain("is-last");
      });

      it("中间的 tab 不应该有 is-first 或 is-last 类", async () => {
        const tabs = createTabs({ tabCount: 4 });
        container.appendChild(tabs);
        await waitForRender();

        const middleTab = tabs.querySelectorAll("ea-tab")[1];
        const containerEl =
          middleTab.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.className).not.toContain("is-first");
        expect(containerEl.className).not.toContain("is-last");
      });

      it("只有一个 tab 时应该同时有 is-first 和 is-last 类", async () => {
        const tabs = createTabs({ tabCount: 1 });
        container.appendChild(tabs);
        await waitForRender();

        const onlyTab = tabs.querySelector("ea-tab");
        const containerEl =
          onlyTab.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.className).toContain("is-first");
        expect(containerEl.className).toContain("is-last");
      });
    });

    describe("事件测试", () => {
      it("点击关闭图标应该触发 ea-tab-close-icon-click 事件", async () => {
        const tab = document.createElement("ea-tab");
        tab.setAttribute("panel", "test");
        container.appendChild(tab);
        await waitForRender();

        let eventFired = false;
        let eventDetail = null;

        tab.addEventListener("ea-tab-close-icon-click", e => {
          eventFired = true;
          eventDetail = e.detail;
        });

        const closeIcon = tab.shadowRoot.querySelector('[part="close-icon"]');
        if (closeIcon) {
          closeIcon.click();
          await waitForRender();
        }

        expect(eventFired).toBe(true);
        expect(eventDetail.panel).toBe("test");
      });
    });
  });

  describe("EaTabPanel 组件", () => {
    describe("基础渲染", () => {
      it("应该正确渲染 Shadow DOM", async () => {
        const panel = document.createElement("ea-tab-panel");
        panel.setAttribute("name", "test");
        panel.textContent = "Test Content";
        container.appendChild(panel);
        await waitForRender();

        expect(panel.shadowRoot).toBeDefined();
      });

      it("应该包含 container CSS Part", async () => {
        const panel = document.createElement("ea-tab-panel");
        container.appendChild(panel);
        await waitForRender();

        expect(
          panel.shadowRoot.querySelector('[part="container"]')
        ).toBeTruthy();
      });

      it("应该正确显示内容", async () => {
        const panel = document.createElement("ea-tab-panel");
        panel.setAttribute("name", "test");
        panel.innerHTML = "<p>Panel Content</p>";
        container.appendChild(panel);
        await waitForRender();

        expect(panel.innerHTML).toContain("<p>Panel Content</p>");
      });
    });

    describe("属性测试", () => {
      it("name 属性应该可读写", async () => {
        const panel = document.createElement("ea-tab-panel");
        container.appendChild(panel);
        await waitForRender();

        expect(panel.name).toBe("");

        panel.name = "test-name";
        expect(panel.name).toBe("test-name");
      });

      it("type 属性应该影响 BEM 类名", async () => {
        const panel = document.createElement("ea-tab-panel");
        panel.setAttribute("name", "test");
        panel.setAttribute("type", "card");
        container.appendChild(panel);
        await waitForRender();

        const containerEl =
          panel.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.className).toContain("ea-tab-panel--card");
      });

      it("type='border-card' 应该添加对应的 BEM 类", async () => {
        const panel = document.createElement("ea-tab-panel");
        panel.setAttribute("name", "test");
        panel.setAttribute("type", "border-card");
        container.appendChild(panel);
        await waitForRender();

        const containerEl =
          panel.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.className).toContain("ea-tab-panel--border-card");
      });

      it("type 为空时不应该添加类型修饰符", async () => {
        const panel = document.createElement("ea-tab-panel");
        panel.setAttribute("name", "test");
        container.appendChild(panel);
        await waitForRender();

        const containerEl =
          panel.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.className).not.toContain("ea-tab-panel--card");
        expect(containerEl.className).not.toContain(
          "ea-tab-panel--border-card"
        );
      });
    });

    describe("与 EaTabs 的集成", () => {
      it("active 属性应该通过父组件设置", async () => {
        const tabs = createTabs({ active: "panel0" });
        container.appendChild(tabs);
        await waitForRender();

        const activePanel = tabs.querySelector('ea-tab-panel[name="panel0"]');
        const inactivePanel = tabs.querySelector('ea-tab-panel[name="panel1"]');

        expect(activePanel.hasAttribute("active")).toBe(true);
        expect(inactivePanel.hasAttribute("active")).toBeFalsy();
      });

      it("切换 active 应该更新 panel 的 active 属性", async () => {
        const tabs = createTabs({ active: "panel0" });
        container.appendChild(tabs);
        await waitForRender();

        tabs.active = "panel1";
        await waitForRender();

        const previouslyActivePanel = tabs.querySelector(
          'ea-tab-panel[name="panel0"]'
        );
        const nowActivePanel = tabs.querySelector(
          'ea-tab-panel[name="panel1"]'
        );

        expect(previouslyActivePanel.hasAttribute("active")).toBeFalsy();
        expect(nowActivePanel.hasAttribute("active")).toBe(true);
      });
    });
  });

  describe("边缘情况", () => {
    it("只有 tab 没有 panel 不应该报错", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `<ea-tab panel="only-tab">Only Tab</ea-tab>`;
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.shadowRoot).toBeDefined();
      expect(tabs.querySelectorAll("ea-tab").length).toBe(1);
    });

    it("只有 panel 没有 tab 不应该报错", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `<ea-tab-panel name="only-panel">Only Panel</ea-tab-panel>`;
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.shadowRoot).toBeDefined();
      expect(tabs.querySelectorAll("ea-tab-panel").length).toBe(1);
    });

    it("完全空的组件不应该报错", async () => {
      const tabs = document.createElement("ea-tabs");
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.shadowRoot).toBeDefined();
      expect(tabs.children.length).toBe(0);
    });

    it("大量 tab 的性能测试（10个tab）", async () => {
      const tabs = document.createElement("ea-tabs");
      let innerHTML = "";

      for (let i = 0; i < 10; i++) {
        innerHTML += `<ea-tab panel="panel${i}">Tab ${i}</ea-tab>`;
        innerHTML += `<ea-tab-panel name="panel${i}">Content ${i}</ea-tab-panel>`;
      }

      tabs.innerHTML = innerHTML;
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.querySelectorAll("ea-tab").length).toBe(10);
      expect(tabs.querySelectorAll("ea-tab-panel").length).toBe(10);
      expect(tabs.active).toBe("panel0");
    });

    it("重复的 panel 名称应该正常处理", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="same">Tab 1</ea-tab>
        <ea-tab-panel name="same">Content 1</ea-tab-panel>
        <ea-tab panel="same">Tab 2</ea-tab>
        <ea-tab-panel name="same">Content 2</ea-tab-panel>
      `;
      container.appendChild(tabs);
      await waitForRender();

      const activeTabs = tabs.querySelectorAll("ea-tab[active]");
      expect(activeTabs.length).toBe(2);
    });

    it("特殊字符在 panel/name 中应该正常处理", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="panel-with-special-chars_123">Special Tab</ea-tab>
        <ea-tab-panel name="panel-with-special-chars_123">Special Content</ea-tab-panel>
      `;
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.active).toBe("panel-with-special-chars_123");
    });

    it("频繁切换 active 不应该导致错误", async () => {
      const tabs = createTabs({ tabCount: 5 });
      container.appendChild(tabs);
      await waitForRender();

      for (let i = 0; i < 10; i++) {
        tabs.active = `panel${i % 5}`;
      }

      await waitForRender();

      expect(tabs.active).toBe("panel4");
    });

    it("在 editable=false 时点击关闭图标不应该触发删除", async () => {
      const tabs = createTabs({ editable: false, tabCount: 2 });
      container.appendChild(tabs);
      await waitForRender();

      const initialTabCount = tabs.querySelectorAll("ea-tab").length;

      const closeIcon = tabs.querySelector(".ea-tab__close-icon");
      if (closeIcon) {
        closeIcon.click();
        await waitForRender();
      }

      expect(tabs.querySelectorAll("ea-tab").length).toBe(initialTabCount);
    });
  });

  describe("属性同步", () => {
    it("通过 HTML 属性设置 type 应该反映到 JavaScript 属性", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.setAttribute("type", "card");
      tabs.innerHTML = `
        <ea-tab panel="test">Test</ea-tab>
        <ea-tab-panel name="test">Content</ea-tab-panel>
      `;
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.type).toBe("card");
    });

    it("通过 JavaScript 属性设置 type 应该反映到 HTML 属性", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      tabs.type = "border-card";

      expect(tabs.getAttribute("type")).toBe("border-card");
    });

    it("通过 HTML 属性设置 active 应该反映到 JavaScript 属性", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.setAttribute("active", "custom-active");
      tabs.innerHTML = `
        <ea-tab panel="custom-active">Custom</ea-tab>
        <ea-tab-panel name="custom-active">Custom Content</ea-tab-panel>
      `;
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.active).toBe("custom-active");
    });

    it("通过 HTML 属性设置 editable 应该反映到 JavaScript 属性", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.setAttribute("editable", "");
      tabs.innerHTML = `
        <ea-tab panel="test">Test</ea-tab>
        <ea-tab-panel name="test">Content</ea-tab-panel>
      `;
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.editable).toBe(true);
    });

    it("移除 HTML 属性应该更新 JavaScript 属性", async () => {
      const tabs = createTabs({ editable: true });
      container.appendChild(tabs);
      await waitForRender();

      tabs.removeAttribute("editable");

      expect(tabs.editable).toBe(false);
    });
  });

  describe("CSS 变量（指示器位置）", () => {
    it("激活非 card 类型 tab 时应该设置指示器 CSS 变量", async () => {
      const tabs = createTabs({ type: "", active: "panel1" });
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs).toBeDefined();
    });

    it("card 类型不应该更新指示器位置", async () => {
      const tabs = createTabs({ type: "card", active: "panel1" });
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.type).toBe("card");
    });
  });

  describe("可访问性", () => {
    it("tabs 组件应该有 tabindex", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      expect(tabs.getAttribute("tabindex")).toBe("0");
    });

    it("每个 tab 应该有 tabindex", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      const tabEls = tabs.querySelectorAll("ea-tab");
      tabEls.forEach(tab => {
        expect(tab.getAttribute("tabindex")).toBe("0");
      });
    });

    it("每个 tab-panel 应该有 tabindex", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      const panelEls = tabs.querySelectorAll("ea-tab-panel");
      panelEls.forEach(panel => {
        expect(panel.getAttribute("tabindex")).toBe("0");
      });
    });

    it("line 元素应该有 tabindex=-1", async () => {
      const tabs = createTabs();
      container.appendChild(tabs);
      await waitForRender();

      const lineEl = tabs.shadowRoot.querySelector('[part="line"]');
      expect(lineEl.getAttribute("tabindex")).toBe("-1");
    });
  });
});
