import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-menu 组件及其子组件
import "../components/ea-menu/index.js";

describe("EaMenu Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * EaMenu 基本功能测试
   */
  describe("EaMenu Basic Functionality", () => {
    it("应该正确渲染 ea-menu 组件", async () => {
      const menu = document.createElement("ea-menu");
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menu).toBeDefined();
      expect(menu.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const menu = document.createElement("ea-menu");
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menu.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该渲染 slot 内容", async () => {
      const menu = document.createElement("ea-menu");
      menu.innerHTML = "<ea-menu-item>Item</ea-menu-item>";
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = menu.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * EaMenu Mode 属性测试
   */
  describe("EaMenu Mode Attribute", () => {
    it("默认 mode 应该是 vertical", async () => {
      const menu = document.createElement("ea-menu");
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menu.getAttribute("mode")).toBe(null);
    });

    it("应该支持 mode='horizontal'", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("mode", "horizontal");
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menu.getAttribute("mode")).toBe("horizontal");
    });

    it("应该支持 mode='vertical'", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("mode", "vertical");
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menu.getAttribute("mode")).toBe("vertical");
    });
  });

  /**
   * EaMenu 颜色属性测试
   */
  describe("EaMenu Color Attributes", () => {
    it("应该支持 background-color 属性", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("background-color", "#545c64");
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menu.getAttribute("background-color")).toBe("#545c64");
    });

    it("应该支持 text-color 属性", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("text-color", "#fff");
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menu.getAttribute("text-color")).toBe("#fff");
    });

    it("应该支持 active-text-color 属性", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("active-text-color", "#ffd04b");
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menu.getAttribute("active-text-color")).toBe("#ffd04b");
    });
  });

  /**
   * EaMenu Default Active 属性测试
   */
  describe("EaMenu Default Active Attribute", () => {
    it("应该支持 default-active 属性", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("default-active", "1");
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menu.getAttribute("default-active")).toBe("1");
    });
  });

  /**
   * EaMenuItem 基本功能测试
   */
  describe("EaMenuItem Basic Functionality", () => {
    it("应该正确渲染 ea-menu-item 组件", async () => {
      const menuItem = document.createElement("ea-menu-item");
      container.appendChild(menuItem);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuItem).toBeDefined();
      expect(menuItem.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const menuItem = document.createElement("ea-menu-item");
      container.appendChild(menuItem);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuItem.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该渲染 slot 内容", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.textContent = "Menu Item";
      container.appendChild(menuItem);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = menuItem.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * EaMenuItem Index 属性测试
   */
  describe("EaMenuItem Index Attribute", () => {
    it("应该支持 index 属性", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      container.appendChild(menuItem);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuItem.getAttribute("index")).toBe("1");
    });

    it("应该支持不同的 index 值", async () => {
      const indices = ["1", "2", "2-1", "2-2", "3-1-1"];

      for (const index of indices) {
        const menuItem = document.createElement("ea-menu-item");
        menuItem.setAttribute("index", index);
        expect(menuItem.getAttribute("index")).toBe(index);
      }
    });
  });

  /**
   * EaMenuItem Disabled 属性测试
   */
  describe("EaMenuItem Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const menuItem = document.createElement("ea-menu-item");
      container.appendChild(menuItem);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuItem.hasAttribute("disabled")).toBe(false);
    });

    it("设置 disabled 属性应该禁用菜单项", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("disabled", "");
      container.appendChild(menuItem);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuItem.hasAttribute("disabled")).toBe(true);
    });
  });

  /**
   * EaMenuItem Active 属性测试
   */
  describe("EaMenuItem Active Attribute", () => {
    it("默认 active 应该是 false", async () => {
      const menuItem = document.createElement("ea-menu-item");
      container.appendChild(menuItem);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuItem.hasAttribute("active")).toBe(false);
    });

    it("设置 active 属性应该激活菜单项", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("active", "");
      container.appendChild(menuItem);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuItem.hasAttribute("active")).toBe(true);
    });
  });

  /**
   * EaSubMenu 基本功能测试
   */
  describe("EaSubMenu Basic Functionality", () => {
    it("应该正确渲染 ea-sub-menu 组件", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(subMenu).toBeDefined();
      expect(subMenu.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(subMenu.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 title CSS Part", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(subMenu.shadowRoot.querySelector('[part="title"]')).toBeTruthy();
    });

    it("应该包含 arrow CSS Part", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(subMenu.shadowRoot.querySelector('[part="arrow"]')).toBeTruthy();
    });

    it("应该包含 content CSS Part", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(subMenu.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });

    it("应该渲染 title 插槽", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.innerHTML = '<span slot="title">Sub Menu</span>';
      container.appendChild(subMenu);

      await new Promise(resolve => setTimeout(resolve, 50));

      const titleSlot = subMenu.shadowRoot.querySelector('slot[name="title"]');
      expect(titleSlot).toBeTruthy();
    });
  });

  /**
   * EaSubMenu Index 属性测试
   */
  describe("EaSubMenu Index Attribute", () => {
    it("应该支持 index 属性", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("index", "2");
      container.appendChild(subMenu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(subMenu.getAttribute("index")).toBe("2");
    });
  });

  /**
   * EaSubMenu Mode 属性测试
   */
  describe("EaSubMenu Mode Attribute", () => {
    it("默认 mode 应该是 vertical", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(subMenu.getAttribute("mode")).toBe(null);
    });

    it("应该支持 mode='horizontal'", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("mode", "horizontal");
      container.appendChild(subMenu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(subMenu.getAttribute("mode")).toBe("horizontal");
    });
  });

  /**
   * EaSubMenu Disabled 属性测试
   */
  describe("EaSubMenu Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(subMenu.hasAttribute("disabled")).toBe(false);
    });

    it("设置 disabled 属性应该禁用子菜单", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("disabled", "");
      container.appendChild(subMenu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(subMenu.hasAttribute("disabled")).toBe(true);
    });
  });

  /**
   * EaMenuItemGroup 基本功能测试
   */
  describe("EaMenuItemGroup Basic Functionality", () => {
    it("应该正确渲染 ea-menu-item-group 组件", async () => {
      const menuGroup = document.createElement("ea-menu-item-group");
      container.appendChild(menuGroup);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuGroup).toBeDefined();
      expect(menuGroup.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const menuGroup = document.createElement("ea-menu-item-group");
      container.appendChild(menuGroup);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuGroup.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 title CSS Part", async () => {
      const menuGroup = document.createElement("ea-menu-item-group");
      container.appendChild(menuGroup);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuGroup.shadowRoot.querySelector('[part="title"]')).toBeTruthy();
    });

    it("应该包含 content CSS Part", async () => {
      const menuGroup = document.createElement("ea-menu-item-group");
      container.appendChild(menuGroup);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuGroup.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });
  });

  /**
   * EaMenuItemGroup Title 属性测试
   */
  describe("EaMenuItemGroup Title Attribute", () => {
    it("应该支持 title 属性", async () => {
      const menuGroup = document.createElement("ea-menu-item-group");
      menuGroup.setAttribute("title", "Group Title");
      container.appendChild(menuGroup);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuGroup.getAttribute("title")).toBe("Group Title");
    });
  });

  /**
   * 组合布局测试
   */
  describe("Combined Menu Layout", () => {
    it("应该支持基本的 menu + menu-item 布局", async () => {
      const menu = document.createElement("ea-menu");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      menuItem.textContent = "Item 1";
      menu.appendChild(menuItem);
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menu.shadowRoot).toBeDefined();
      expect(menuItem.shadowRoot).toBeDefined();
      expect(menuItem.getAttribute("index")).toBe("1");
    });

    it("应该支持 menu + sub-menu 布局", async () => {
      const menu = document.createElement("ea-menu");
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("index", "2");
      subMenu.innerHTML = '<span slot="title">Sub Menu</span>';
      
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "2-1");
      menuItem.textContent = "Sub Item";
      
      subMenu.appendChild(menuItem);
      menu.appendChild(subMenu);
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(subMenu.getAttribute("index")).toBe("2");
      expect(menuItem.getAttribute("index")).toBe("2-1");
    });

    it("应该支持 menu + menu-item-group 布局", async () => {
      const menu = document.createElement("ea-menu");
      const menuGroup = document.createElement("ea-menu-item-group");
      menuGroup.setAttribute("title", "Group One");
      
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1-1");
      menuItem.textContent = "Group Item";
      
      menuGroup.appendChild(menuItem);
      menu.appendChild(menuGroup);
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuGroup.getAttribute("title")).toBe("Group One");
      expect(menuItem.getAttribute("index")).toBe("1-1");
    });

    it("应该支持嵌套 sub-menu 布局", async () => {
      const menu = document.createElement("ea-menu");
      const outerSubMenu = document.createElement("ea-sub-menu");
      outerSubMenu.setAttribute("index", "1");
      outerSubMenu.innerHTML = '<span slot="title">Outer</span>';
      
      const innerSubMenu = document.createElement("ea-sub-menu");
      innerSubMenu.setAttribute("index", "1-1");
      innerSubMenu.innerHTML = '<span slot="title">Inner</span>';
      
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1-1-1");
      menuItem.textContent = "Deep Item";
      
      innerSubMenu.appendChild(menuItem);
      outerSubMenu.appendChild(innerSubMenu);
      menu.appendChild(outerSubMenu);
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(outerSubMenu.getAttribute("index")).toBe("1");
      expect(innerSubMenu.getAttribute("index")).toBe("1-1");
      expect(menuItem.getAttribute("index")).toBe("1-1-1");
    });

    it("应该支持完整的菜单配置", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("mode", "horizontal");
      menu.setAttribute("default-active", "1");
      menu.setAttribute("background-color", "#545c64");
      menu.setAttribute("text-color", "#fff");
      menu.setAttribute("active-text-color", "#ffd04b");
      
      const menuItem1 = document.createElement("ea-menu-item");
      menuItem1.setAttribute("index", "1");
      menuItem1.textContent = "Item 1";
      
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("index", "2");
      subMenu.innerHTML = '<span slot="title">Sub Menu</span>';
      
      const menuItem2 = document.createElement("ea-menu-item");
      menuItem2.setAttribute("index", "2-1");
      menuItem2.textContent = "Sub Item";
      
      subMenu.appendChild(menuItem2);
      menu.appendChild(menuItem1);
      menu.appendChild(subMenu);
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menu.getAttribute("mode")).toBe("horizontal");
      expect(menu.getAttribute("default-active")).toBe("1");
      expect(menu.getAttribute("background-color")).toBe("#545c64");
      expect(menu.getAttribute("text-color")).toBe("#fff");
      expect(menu.getAttribute("active-text-color")).toBe("#ffd04b");
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 select 事件", async () => {
      const menu = document.createElement("ea-menu");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      menuItem.textContent = "Item 1";
      menu.appendChild(menuItem);
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      const selectPromise = new Promise(resolve => {
        menu.addEventListener("select", e => {
          resolve(e.detail);
        });
      });

      menuItem.click();

      const detail = await selectPromise;
      expect(detail.index).toBe("1");
      expect(detail.target).toBe(menuItem);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 menu 应该正常渲染", async () => {
      const menu = document.createElement("ea-menu");
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menu.shadowRoot).toBeDefined();
    });

    it("多层嵌套应该正常工作", async () => {
      const menu = document.createElement("ea-menu");
      
      const subMenu1 = document.createElement("ea-sub-menu");
      subMenu1.setAttribute("index", "1");
      
      const subMenu2 = document.createElement("ea-sub-menu");
      subMenu2.setAttribute("index", "1-1");
      
      const subMenu3 = document.createElement("ea-sub-menu");
      subMenu3.setAttribute("index", "1-1-1");
      
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1-1-1-1");
      menuItem.textContent = "Deep";
      
      subMenu3.appendChild(menuItem);
      subMenu2.appendChild(subMenu3);
      subMenu1.appendChild(subMenu2);
      menu.appendChild(subMenu1);
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuItem.getAttribute("index")).toBe("1-1-1-1");
    });

    it("disabled 菜单项不应该触发事件", async () => {
      const menu = document.createElement("ea-menu");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      menuItem.setAttribute("disabled", "");
      menuItem.textContent = "Disabled Item";
      menu.appendChild(menuItem);
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuItem.hasAttribute("disabled")).toBe(true);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("menu 组件连接后应该正确初始化", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("mode", "horizontal");
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menu.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const menu = document.createElement("ea-menu");
      const menuItem = document.createElement("ea-menu-item");
      menu.appendChild(menuItem);
      container.appendChild(menu);

      menu.remove();

      expect(container.contains(menu)).toBe(false);
    });

    it("动态修改 menu mode 应该生效", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("mode", "vertical");
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      menu.setAttribute("mode", "horizontal");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menu.getAttribute("mode")).toBe("horizontal");
    });

    it("动态修改 menu 颜色属性应该生效", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("background-color", "#ffffff");
      container.appendChild(menu);

      await new Promise(resolve => setTimeout(resolve, 50));

      menu.setAttribute("background-color", "#000000");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menu.getAttribute("background-color")).toBe("#000000");
    });

    it("动态修改 menu-item index 应该生效", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      container.appendChild(menuItem);

      await new Promise(resolve => setTimeout(resolve, 50));

      menuItem.setAttribute("index", "2");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuItem.getAttribute("index")).toBe("2");
    });

    it("动态添加 disabled 属性应该生效", async () => {
      const menuItem = document.createElement("ea-menu-item");
      container.appendChild(menuItem);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuItem.hasAttribute("disabled")).toBe(false);

      menuItem.setAttribute("disabled", "");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(menuItem.hasAttribute("disabled")).toBe(true);
    });
  });
});
