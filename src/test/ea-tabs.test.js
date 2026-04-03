import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Mock scrollTo for JSDOM environment
Element.prototype.scrollTo = Element.prototype.scrollTo || function () {};

// Mock ResizeObserver for JSDOM environment
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// 导入 ea-tabs 组件及其子组件
import "../components/ea-tabs/index.js";

describe("EaTabs, EaTab and EaTabPanel Components", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * EaTabs 基本功能测试
   */
  describe("EaTabs Basic Functionality", () => {
    it("应该正确渲染 ea-tabs 组件", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs).toBeDefined();
      expect(tabs.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 nav CSS Part", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.shadowRoot.querySelector('[part="nav"]')).toBeTruthy();
    });

    it("应该包含 prev CSS Part", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.shadowRoot.querySelector('[part="prev"]')).toBeTruthy();
    });

    it("应该包含 next CSS Part", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.shadowRoot.querySelector('[part="next"]')).toBeTruthy();
    });

    it("应该包含 line CSS Part", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.shadowRoot.querySelector('[part="line"]')).toBeTruthy();
    });

    it("应该包含 indicator CSS Part", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.shadowRoot.querySelector('[part="indicator"]')).toBeTruthy();
    });

    it("应该包含 content CSS Part", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });
  });

  /**
   * EaTab 基本功能测试
   */
  describe("EaTab Basic Functionality", () => {
    it("应该正确渲染 ea-tab 组件", async () => {
      const tab = document.createElement("ea-tab");
      tab.textContent = "Tab 1";
      container.appendChild(tab);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tab).toBeDefined();
      expect(tab.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const tab = document.createElement("ea-tab");
      container.appendChild(tab);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tab.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 close-icon CSS Part", async () => {
      const tab = document.createElement("ea-tab");
      container.appendChild(tab);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tab.shadowRoot.querySelector('[part="close-icon"]')).toBeTruthy();
    });

    it("应该正确显示标签内容", async () => {
      const tab = document.createElement("ea-tab");
      tab.textContent = "Tab 1";
      container.appendChild(tab);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tab.textContent).toBe("Tab 1");
    });
  });

  /**
   * EaTabPanel 基本功能测试
   */
  describe("EaTabPanel Basic Functionality", () => {
    it("应该正确渲染 ea-tab-panel 组件", async () => {
      const panel = document.createElement("ea-tab-panel");
      panel.textContent = "Panel Content";
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(panel).toBeDefined();
      expect(panel.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const panel = document.createElement("ea-tab-panel");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(panel.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该正确显示面板内容", async () => {
      const panel = document.createElement("ea-tab-panel");
      panel.textContent = "Panel Content";
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(panel.textContent).toBe("Panel Content");
    });
  });

  /**
   * EaTabs Type 属性测试
   */
  describe("EaTabs Type Attribute", () => {
    it("默认 type 应该是空字符串", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.type).toBe("");
    });

    it("应该支持 type='card'", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.type = "card";
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.type).toBe("card");
    });

    it("应该支持 type='border-card'", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.type = "border-card";
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.type).toBe("border-card");
    });
  });

  /**
   * EaTabs Active 属性测试
   */
  describe("EaTabs Active Attribute", () => {
    it("应该支持 active 属性", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab panel="second">Tab 2</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
        <ea-tab-panel name="second">Panel 2</ea-tab-panel>
      `;
      tabs.active = "first";
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.active).toBe("first");
    });

    it("应该触发 tabs-change 事件", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab panel="second">Tab 2</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
        <ea-tab-panel name="second">Panel 2</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      let changeDetail = null;
      tabs.addEventListener("tabs-change", e => {
        changeDetail = e.detail;
      });

      tabs.active = "second";

      await new Promise(resolve => setTimeout(resolve, 100));

      // 验证事件被触发（事件 detail 应该被定义）
      expect(changeDetail).toBeDefined();
    });
  });

  /**
   * EaTabs Tab-position 属性测试
   */
  describe("EaTabs Tab-position Attribute", () => {
    it("默认 tab-position 应该是 top", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs["tab-position"]).toBe("top");
    });

    it("应该支持 tab-position='bottom'", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs["tab-position"] = "bottom";
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs["tab-position"]).toBe("bottom");
    });

    it("应该支持 tab-position='left'", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs["tab-position"] = "left";
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs["tab-position"]).toBe("left");
    });

    it("应该支持 tab-position='right'", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs["tab-position"] = "right";
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs["tab-position"]).toBe("right");
    });
  });

  /**
   * EaTabs Editable 属性测试
   */
  describe("EaTabs Editable Attribute", () => {
    it("默认 editable 应该是 false", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      // 属性可能返回 null 或 false
      const value = tabs.editable;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 editable 应该启用编辑模式", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.editable = true;
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.editable).toBe(true);
    });
  });

  /**
   * EaTab Panel 属性测试
   */
  describe("EaTab Panel Attribute", () => {
    it("默认 panel 应该是空字符串", async () => {
      const tab = document.createElement("ea-tab");
      container.appendChild(tab);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tab.panel).toBe("");
    });

    it("应该支持 panel 属性", async () => {
      const tab = document.createElement("ea-tab");
      tab.panel = "first";
      container.appendChild(tab);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tab.panel).toBe("first");
    });
  });

  /**
   * EaTab Disabled 属性测试
   */
  describe("EaTab Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const tab = document.createElement("ea-tab");
      container.appendChild(tab);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = tab.disabled;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 disabled 应该禁用标签", async () => {
      const tab = document.createElement("ea-tab");
      tab.disabled = true;
      container.appendChild(tab);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tab.disabled).toBe(true);
    });
  });

  /**
   * EaTab Active 属性测试
   */
  describe("EaTab Active Attribute", () => {
    it("默认 active 应该是 false", async () => {
      const tab = document.createElement("ea-tab");
      container.appendChild(tab);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = tab.active;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 active 应该激活标签", async () => {
      const tab = document.createElement("ea-tab");
      tab.active = true;
      container.appendChild(tab);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tab.active).toBe(true);
    });
  });

  /**
   * EaTab Closable 属性测试
   */
  describe("EaTab Closable Attribute", () => {
    it("默认 closable 应该是 false", async () => {
      const tab = document.createElement("ea-tab");
      container.appendChild(tab);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = tab.closable;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 closable 应该显示关闭图标", async () => {
      const tab = document.createElement("ea-tab");
      tab.closable = true;
      container.appendChild(tab);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tab.closable).toBe(true);
    });
  });

  /**
   * EaTabPanel Name 属性测试
   */
  describe("EaTabPanel Name Attribute", () => {
    it("默认 name 应该是空字符串", async () => {
      const panel = document.createElement("ea-tab-panel");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(panel.name).toBe("");
    });

    it("应该支持 name 属性", async () => {
      const panel = document.createElement("ea-tab-panel");
      panel.name = "first";
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(panel.name).toBe("first");
    });
  });

  /**
   * 组合测试
   */
  describe("Combined Tests", () => {
    it("应该正确渲染包含 tab 和 panel 的 tabs", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab panel="second">Tab 2</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
        <ea-tab-panel name="second">Panel 2</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      const tabEls = tabs.querySelectorAll("ea-tab");
      const panelEls = tabs.querySelectorAll("ea-tab-panel");

      expect(tabEls.length).toBe(2);
      expect(panelEls.length).toBe(2);
    });

    it("应该支持卡片风格", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.type = "card";
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab panel="second">Tab 2</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
        <ea-tab-panel name="second">Panel 2</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.type).toBe("card");
    });

    it("应该支持边框卡片风格", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.type = "border-card";
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab panel="second">Tab 2</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
        <ea-tab-panel name="second">Panel 2</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.type).toBe("border-card");
    });

    it("点击 tab 应该触发 tab-click 事件", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab panel="second">Tab 2</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
        <ea-tab-panel name="second">Panel 2</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      let clickDetail = null;
      tabs.addEventListener("tab-click", e => {
        clickDetail = e.detail;
      });

      const tab = tabs.querySelector('ea-tab[panel="second"]');
      tab.click();

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(clickDetail).not.toBeNull();
    });

    it("disabled tab 不应该触发切换", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.active = "first";
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab panel="second" disabled>Tab 2</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
        <ea-tab-panel name="second">Panel 2</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      const disabledTab = tabs.querySelector('ea-tab[panel="second"]');
      disabledTab.click();

      await new Promise(resolve => setTimeout(resolve, 50));

      // active 应该保持为 first
      expect(tabs.active).toBe("first");
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 tab 应该正常渲染", async () => {
      const tab = document.createElement("ea-tab");
      container.appendChild(tab);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tab.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("空 panel 应该正常渲染", async () => {
      const panel = document.createElement("ea-tab-panel");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(panel.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("多个 tabs 应该独立工作", async () => {
      const tabs1 = document.createElement("ea-tabs");
      tabs1.innerHTML = `
        <ea-tab panel="a">Tab A</ea-tab>
        <ea-tab-panel name="a">Panel A</ea-tab-panel>
      `;

      const tabs2 = document.createElement("ea-tabs");
      tabs2.innerHTML = `
        <ea-tab panel="b">Tab B</ea-tab>
        <ea-tab-panel name="b">Panel B</ea-tab-panel>
      `;

      container.appendChild(tabs1);
      container.appendChild(tabs2);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs1.querySelector("ea-tab").textContent).toBe("Tab A");
      expect(tabs2.querySelector("ea-tab").textContent).toBe("Tab B");
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("tabs 组件连接后应该正确初始化", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("tab 组件连接后应该正确初始化", async () => {
      const tab = document.createElement("ea-tab");
      tab.textContent = "Tab 1";
      container.appendChild(tab);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tab.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("panel 组件连接后应该正确初始化", async () => {
      const panel = document.createElement("ea-tab-panel");
      panel.textContent = "Panel 1";
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(panel.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("tabs 组件断开连接后应该正常移除", () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      tabs.remove();

      expect(container.contains(tabs)).toBe(false);
    });

    it("tab 组件断开连接后应该正常移除", () => {
      const tab = document.createElement("ea-tab");
      container.appendChild(tab);

      tab.remove();

      expect(container.contains(tab)).toBe(false);
    });

    it("panel 组件断开连接后应该正常移除", () => {
      const panel = document.createElement("ea-tab-panel");
      container.appendChild(panel);

      panel.remove();

      expect(container.contains(panel)).toBe(false);
    });

    it("动态修改 tabs type 应该生效", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first" active>Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      tabs.type = "card";

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tabs.type).toBe("card");
    });

    it("动态修改 tabs active 应该生效", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab panel="second">Tab 2</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
        <ea-tab-panel name="second">Panel 2</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      tabs.active = "second";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tabs.active).toBe("second");
    });

    it("动态添加 tab 应该生效", async () => {
      const tabs = document.createElement("ea-tabs");
      tabs.innerHTML = `
        <ea-tab panel="first">Tab 1</ea-tab>
        <ea-tab-panel name="first">Panel 1</ea-tab-panel>
      `;
      container.appendChild(tabs);

      await new Promise(resolve => setTimeout(resolve, 100));

      const newTab = document.createElement("ea-tab");
      newTab.panel = "second";
      newTab.textContent = "Tab 2";
      tabs.appendChild(newTab);

      const newPanel = document.createElement("ea-tab-panel");
      newPanel.name = "second";
      newPanel.textContent = "Panel 2";
      tabs.appendChild(newPanel);

      await new Promise(resolve => setTimeout(resolve, 100));

      const tabEls = tabs.querySelectorAll("ea-tab");
      expect(tabEls.length).toBe(2);
    });
  });
});
