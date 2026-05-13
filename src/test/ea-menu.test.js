import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

import "../components/ea-menu/index";

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
   * EaMenu 基本渲染
   */
  describe("EaMenu Basic Rendering", () => {
    it("应该正确渲染 ea-menu 组件", async () => {
      const menu = document.createElement("ea-menu");
      container.appendChild(menu);
      await waitForRender();
      expect(menu).toBeDefined();
      expect(menu.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const menu = document.createElement("ea-menu");
      container.appendChild(menu);
      await waitForRender();
      expect(menu.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该渲染 slot 内容", async () => {
      const menu = document.createElement("ea-menu");
      menu.innerHTML = "<ea-menu-item>Item</ea-menu-item>";
      container.appendChild(menu);
      await waitForRender();
      expect(menu.shadowRoot.querySelector("slot")).toBeTruthy();
    });

    it("container 应该是 ul 元素且 role 为 menubar", async () => {
      const menu = document.createElement("ea-menu");
      container.appendChild(menu);
      await waitForRender();
      const el = menu.shadowRoot.querySelector('[part="container"]');
      expect(el.tagName).toBe("UL");
      expect(el.getAttribute("role")).toBe("menubar");
    });

    it("updateContainerClasslist 应该返回正确的类名", async () => {
      const menu = document.createElement("ea-menu");
      container.appendChild(menu);
      await waitForRender();
      const className = menu.updateContainerClasslist();
      expect(className).toContain("ea-menu--vertical");
    });
  });

  /**
   * EaMenu mode 属性
   */
  describe("EaMenu mode Attribute", () => {
    it("默认 mode 应该是 vertical", async () => {
      const menu = document.createElement("ea-menu");
      container.appendChild(menu);
      await waitForRender();
      expect(menu.mode).toBe("vertical");
    });

    it("应该支持 mode='horizontal'", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("mode", "horizontal");
      container.appendChild(menu);
      await waitForRender();
      expect(menu.mode).toBe("horizontal");
    });

    it("应该支持 mode='vertical'", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("mode", "vertical");
      container.appendChild(menu);
      await waitForRender();
      expect(menu.mode).toBe("vertical");
    });

    it("horizontal 模式应该应用 BEM modifier 类", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("mode", "horizontal");
      container.appendChild(menu);
      await waitForRender();
      const el = menu.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("ea-menu--horizontal");
    });

    it("vertical 模式应该应用 BEM modifier 类", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("mode", "vertical");
      container.appendChild(menu);
      await waitForRender();
      const el = menu.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("ea-menu--vertical");
    });

    it("动态修改 mode 应该更新 BEM 类", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("mode", "vertical");
      container.appendChild(menu);
      await waitForRender();

      menu.setAttribute("mode", "horizontal");
      await waitForRender();

      const el = menu.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("ea-menu--horizontal");
      expect(el.className).not.toContain("ea-menu--vertical");
    });

    it("修改 mode 应该同步到直接子 ea-sub-menu", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("mode", "horizontal");
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("index", "1");
      menu.appendChild(subMenu);
      container.appendChild(menu);
      await waitForRender();

      expect(subMenu.getAttribute("mode")).toBe("horizontal");

      menu.setAttribute("mode", "vertical");
      await waitForRender();
      expect(subMenu.getAttribute("mode")).toBe("vertical");
    });

    it("修改 mode 应该同步到嵌套子 ea-sub-menu", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("mode", "horizontal");
      const outer = document.createElement("ea-sub-menu");
      outer.setAttribute("index", "1");
      const inner = document.createElement("ea-sub-menu");
      inner.setAttribute("index", "1-1");
      outer.appendChild(inner);
      menu.appendChild(outer);
      container.appendChild(menu);
      await waitForRender();

      expect(outer.getAttribute("mode")).toBe("horizontal");
      expect(inner.getAttribute("mode")).toBe("horizontal");

      menu.setAttribute("mode", "vertical");
      await waitForRender();
      expect(outer.getAttribute("mode")).toBe("vertical");
      expect(inner.getAttribute("mode")).toBe("vertical");
    });
  });

  /**
   * EaMenu 颜色属性
   */
  describe("EaMenu Color Attributes", () => {
    it("应该支持 background-color 属性并设置 CSS 变量", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("background-color", "#545c64");
      container.appendChild(menu);
      await waitForRender();

      const el = menu.shadowRoot.querySelector('[part="container"]');
      expect(el.style.getPropertyValue("--ea-menu-bg-color")).toBe("#545c64");
    });

    it("应该支持 text-color 属性并设置 CSS 变量", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("text-color", "#fff");
      container.appendChild(menu);
      await waitForRender();

      const el = menu.shadowRoot.querySelector('[part="container"]');
      expect(el.style.getPropertyValue("--ea-menu-text-color")).toBe("#fff");
    });

    it("应该支持 active-text-color 属性并设置 CSS 变量", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("active-text-color", "#ffd04b");
      container.appendChild(menu);
      await waitForRender();

      const el = menu.shadowRoot.querySelector('[part="container"]');
      expect(el.style.getPropertyValue("--ea-menu-active-text-color")).toBe(
        "#ffd04b"
      );
    });

    it("默认颜色属性值应该正确", async () => {
      const menu = document.createElement("ea-menu");
      container.appendChild(menu);
      await waitForRender();

      expect(menu.backgroundColor).toBe("#ffffff");
      expect(menu.textColor).toBe("#303133");
      expect(menu.activeTextColor).toBe("#409eff");
    });

    it("动态修改颜色属性应该更新 CSS 变量", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("background-color", "#ffffff");
      container.appendChild(menu);
      await waitForRender();

      menu.setAttribute("background-color", "#000000");
      await waitForRender();

      const el = menu.shadowRoot.querySelector('[part="container"]');
      expect(el.style.getPropertyValue("--ea-menu-bg-color")).toBe("#000000");
    });
  });

  /**
   * EaMenu defaultActive 属性
   */
  describe("EaMenu defaultActive Attribute", () => {
    it("应该支持 default-active 属性", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("default-active", "1");
      container.appendChild(menu);
      await waitForRender();
      expect(menu.getAttribute("default-active")).toBe("1");
    });

    it("default-active 应该激活对应 index 的菜单项", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("default-active", "1");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      menuItem.textContent = "Item 1";
      menu.appendChild(menuItem);
      container.appendChild(menu);
      await waitForRender();

      expect(menuItem.hasAttribute("active")).toBe(true);
    });

    it("default-active 不匹配任何项时不应报错", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("default-active", "nonexistent");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      menu.appendChild(menuItem);
      container.appendChild(menu);
      await waitForRender();

      expect(menuItem.hasAttribute("active")).toBe(false);
    });

    it("default-active 应该触发 select 事件", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("default-active", "1");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      menuItem.textContent = "Item 1";
      menu.appendChild(menuItem);

      let fired = false;
      menu.addEventListener("select", () => {
        fired = true;
      });

      container.appendChild(menu);
      await waitForRender();

      expect(fired).toBe(true);
    });
  });

  /**
   * EaMenu active 属性
   */
  describe("EaMenu active Attribute", () => {
    it("应该支持 active 属性", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("active", "1");
      container.appendChild(menu);
      await waitForRender();
      expect(menu.getAttribute("active")).toBe("1");
    });

    it("设置 active 应该激活对应 index 的菜单项", async () => {
      const menu = document.createElement("ea-menu");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      menuItem.textContent = "Item 1";
      menu.appendChild(menuItem);
      container.appendChild(menu);
      await waitForRender();

      menu.setAttribute("active", "1");
      await waitForRender();
      expect(menuItem.hasAttribute("active")).toBe(true);
    });

    it("动态修改 active 应该切换激活项并清除旧项", async () => {
      const menu = document.createElement("ea-menu");
      const item1 = document.createElement("ea-menu-item");
      item1.setAttribute("index", "1");
      const item2 = document.createElement("ea-menu-item");
      item2.setAttribute("index", "2");
      menu.appendChild(item1);
      menu.appendChild(item2);
      container.appendChild(menu);
      await waitForRender();

      menu.setAttribute("active", "1");
      await waitForRender();
      expect(item1.hasAttribute("active")).toBe(true);
      expect(item2.hasAttribute("active")).toBe(false);

      menu.setAttribute("active", "2");
      await waitForRender();
      expect(item1.hasAttribute("active")).toBe(false);
      expect(item2.hasAttribute("active")).toBe(true);
    });

    it("active 应该激活子菜单内 item 的祖先 ea-sub-menu", async () => {
      const menu = document.createElement("ea-menu");
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("index", "2");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "2-1");
      menuItem.textContent = "Sub Item";
      subMenu.appendChild(menuItem);
      menu.appendChild(subMenu);
      container.appendChild(menu);
      await waitForRender();

      menu.setAttribute("active", "2-1");
      await waitForRender();

      expect(menuItem.hasAttribute("active")).toBe(true);
      expect(subMenu.hasAttribute("active")).toBe(true);
    });

    it("active 应该激活深层嵌套 item 的所有祖先 ea-sub-menu", async () => {
      const menu = document.createElement("ea-menu");
      const l1 = document.createElement("ea-sub-menu");
      l1.setAttribute("index", "1");
      const l2 = document.createElement("ea-sub-menu");
      l2.setAttribute("index", "1-1");
      const l3 = document.createElement("ea-sub-menu");
      l3.setAttribute("index", "1-1-1");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1-1-1-1");
      menuItem.textContent = "Deep";
      l3.appendChild(menuItem);
      l2.appendChild(l3);
      l1.appendChild(l2);
      menu.appendChild(l1);
      container.appendChild(menu);
      await waitForRender();

      menu.setAttribute("active", "1-1-1-1");
      await waitForRender();

      expect(menuItem.hasAttribute("active")).toBe(true);
      expect(l1.hasAttribute("active")).toBe(true);
      expect(l2.hasAttribute("active")).toBe(true);
      expect(l3.hasAttribute("active")).toBe(true);
    });

    it("active 为空字符串时不应报错", async () => {
      const menu = document.createElement("ea-menu");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      menu.appendChild(menuItem);
      container.appendChild(menu);
      await waitForRender();

      menu.setAttribute("active", "");
      await waitForRender();
      expect(menuItem.hasAttribute("active")).toBe(false);
    });

    it("设置 active 为相同值不应报错", async () => {
      const menu = document.createElement("ea-menu");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      menu.appendChild(menuItem);
      container.appendChild(menu);
      await waitForRender();

      menu.setAttribute("active", "1");
      await waitForRender();
      menu.setAttribute("active", "1");
      await waitForRender();

      expect(menuItem.hasAttribute("active")).toBe(true);
    });
  });

  /**
   * EaMenu collapse 属性
   */
  describe("EaMenu collapse Attribute", () => {
    it("默认 collapse 应该是 false", async () => {
      const menu = document.createElement("ea-menu");
      container.appendChild(menu);
      await waitForRender();
      expect(menu.collapse).toBe(false);
    });

    it("应该支持 collapse 属性", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("collapse", "");
      container.appendChild(menu);
      await waitForRender();
      expect(menu.collapse).toBe(true);
    });
  });

  /**
   * EaMenu select 事件
   */
  describe("EaMenu select Event", () => {
    it("点击 menu-item 应该触发 select 事件", async () => {
      const menu = document.createElement("ea-menu");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      menuItem.textContent = "Item 1";
      menu.appendChild(menuItem);
      container.appendChild(menu);
      await waitForRender();

      const selectPromise = new Promise(resolve => {
        menu.addEventListener("select", e => resolve(e.detail));
      });

      menuItem.click();
      const detail = await selectPromise;
      expect(detail.index).toBe("1");
      expect(detail.target).toBe(menuItem);
    });

    it("点击 menu-item 应该激活该项", async () => {
      const menu = document.createElement("ea-menu");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      menuItem.textContent = "Item 1";
      menu.appendChild(menuItem);
      container.appendChild(menu);
      await waitForRender();

      menuItem.click();
      await waitForRender();
      expect(menuItem.hasAttribute("active")).toBe(true);
    });

    it("点击不同 menu-item 应该切换激活项", async () => {
      const menu = document.createElement("ea-menu");
      const item1 = document.createElement("ea-menu-item");
      item1.setAttribute("index", "1");
      const item2 = document.createElement("ea-menu-item");
      item2.setAttribute("index", "2");
      menu.appendChild(item1);
      menu.appendChild(item2);
      container.appendChild(menu);
      await waitForRender();

      item1.click();
      await waitForRender();
      expect(item1.hasAttribute("active")).toBe(true);

      item2.click();
      await waitForRender();
      expect(item1.hasAttribute("active")).toBe(false);
      expect(item2.hasAttribute("active")).toBe(true);
    });

    it("子菜单内的 menu-item 点击应该触发 select 事件", async () => {
      const menu = document.createElement("ea-menu");
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("index", "2");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "2-1");
      menuItem.textContent = "Sub Item";
      subMenu.appendChild(menuItem);
      menu.appendChild(subMenu);
      container.appendChild(menu);
      await waitForRender();

      const selectPromise = new Promise(resolve => {
        menu.addEventListener("select", e => resolve(e.detail));
      });

      menuItem.click();
      const detail = await selectPromise;
      expect(detail.index).toBe("2-1");
      expect(detail.target).toBe(menuItem);
    });

    it("嵌套子菜单内的 menu-item 点击应该触发 select 事件", async () => {
      const menu = document.createElement("ea-menu");
      const outerSub = document.createElement("ea-sub-menu");
      outerSub.setAttribute("index", "1");
      const innerSub = document.createElement("ea-sub-menu");
      innerSub.setAttribute("index", "1-1");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1-1-1");
      menuItem.textContent = "Deep Item";
      innerSub.appendChild(menuItem);
      outerSub.appendChild(innerSub);
      menu.appendChild(outerSub);
      container.appendChild(menu);
      await waitForRender();

      const selectPromise = new Promise(resolve => {
        menu.addEventListener("select", e => resolve(e.detail));
      });

      menuItem.click();
      const detail = await selectPromise;
      expect(detail.index).toBe("1-1-1");
      expect(detail.target).toBe(menuItem);
    });

    it("disabled menu-item 不应触发 select 事件", async () => {
      const menu = document.createElement("ea-menu");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      menuItem.setAttribute("disabled", "");
      menuItem.textContent = "Disabled";
      menu.appendChild(menuItem);
      container.appendChild(menu);
      await waitForRender();

      let fired = false;
      menu.addEventListener("select", () => {
        fired = true;
      });

      menuItem.click();
      await waitForRender();
      expect(fired).toBe(false);
    });

    it("disabled menu-item 不应清除其他项的激活状态", async () => {
      const menu = document.createElement("ea-menu");
      const item1 = document.createElement("ea-menu-item");
      item1.setAttribute("index", "1");
      item1.textContent = "Active";
      const item2 = document.createElement("ea-menu-item");
      item2.setAttribute("index", "2");
      item2.setAttribute("disabled", "");
      item2.textContent = "Disabled";
      menu.appendChild(item1);
      menu.appendChild(item2);
      container.appendChild(menu);
      await waitForRender();

      item1.click();
      await waitForRender();
      expect(item1.hasAttribute("active")).toBe(true);

      item2.click();
      await waitForRender();
      expect(item1.hasAttribute("active")).toBe(true);
    });

    it("子菜单内 disabled menu-item 不应触发 select 事件", async () => {
      const menu = document.createElement("ea-menu");
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("index", "2");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "2-1");
      menuItem.setAttribute("disabled", "");
      menuItem.textContent = "Disabled Sub Item";
      subMenu.appendChild(menuItem);
      menu.appendChild(subMenu);
      container.appendChild(menu);
      await waitForRender();

      let fired = false;
      menu.addEventListener("select", () => {
        fired = true;
      });

      menuItem.click();
      await waitForRender();
      expect(fired).toBe(false);
    });

    it("点击子菜单标题（非 item）应该切换展开状态但不影响激活项", async () => {
      const menu = document.createElement("ea-menu");
      const item1 = document.createElement("ea-menu-item");
      item1.setAttribute("index", "1");
      item1.textContent = "Item 1";
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("index", "2");
      subMenu.setAttribute("mode", "vertical");
      subMenu.innerHTML = '<span slot="title">Sub</span>';
      const subItem = document.createElement("ea-menu-item");
      subItem.setAttribute("index", "2-1");
      subItem.textContent = "Sub Item";
      subMenu.appendChild(subItem);
      menu.appendChild(item1);
      menu.appendChild(subMenu);
      container.appendChild(menu);
      await waitForRender();

      item1.click();
      await waitForRender();
      expect(item1.hasAttribute("active")).toBe(true);

      const titleEl = subMenu.shadowRoot.querySelector('[part="title"]');
      titleEl.click();
      await waitForRender();

      expect(subMenu.open).toBe(true);
      expect(item1.hasAttribute("active")).toBe(true);
    });
  });

  /**
   * EaMenu 生命周期
   */
  describe("EaMenu Lifecycle", () => {
    it("$mount 应该正确初始化", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("mode", "horizontal");
      container.appendChild(menu);
      await waitForRender();
      expect(menu.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("$beforeUnmount 应该清理 abort controller", async () => {
      const menu = document.createElement("ea-menu");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      menu.appendChild(menuItem);
      container.appendChild(menu);
      await waitForRender();

      menu.remove();
      await waitForRender();

      let fired = false;
      menu.addEventListener("select", () => {
        fired = true;
      });

      menuItem.click();
      await waitForRender();
      expect(fired).toBe(false);
    });

    it("组件断开连接后应该正常移除", () => {
      const menu = document.createElement("ea-menu");
      const menuItem = document.createElement("ea-menu-item");
      menu.appendChild(menuItem);
      container.appendChild(menu);
      menu.remove();
      expect(container.contains(menu)).toBe(false);
    });
  });

  /**
   * EaMenuItem 基本渲染
   */
  describe("EaMenuItem Basic Rendering", () => {
    it("应该正确渲染 ea-menu-item 组件", async () => {
      const menuItem = document.createElement("ea-menu-item");
      container.appendChild(menuItem);
      await waitForRender();
      expect(menuItem).toBeDefined();
      expect(menuItem.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const menuItem = document.createElement("ea-menu-item");
      container.appendChild(menuItem);
      await waitForRender();
      expect(
        menuItem.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("container 应该是 li 元素且 role 为 menuitem", async () => {
      const menuItem = document.createElement("ea-menu-item");
      container.appendChild(menuItem);
      await waitForRender();
      const el = menuItem.shadowRoot.querySelector('[part="container"]');
      expect(el.tagName).toBe("LI");
      expect(el.getAttribute("role")).toBe("menuitem");
    });

    it("应该渲染 slot 内容", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.textContent = "Menu Item";
      container.appendChild(menuItem);
      await waitForRender();
      expect(menuItem.shadowRoot.querySelector("slot")).toBeTruthy();
    });

    it("updateContainerClasslist 应该返回正确的类名", async () => {
      const menuItem = document.createElement("ea-menu-item");
      container.appendChild(menuItem);
      await waitForRender();
      const className = menuItem.updateContainerClasslist();
      expect(className).toBe("ea-menu-item");
    });
  });

  /**
   * EaMenuItem index 属性
   */
  describe("EaMenuItem index Attribute", () => {
    it("应该支持 index 属性", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      container.appendChild(menuItem);
      await waitForRender();
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

    it("动态修改 index 应该生效", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      container.appendChild(menuItem);
      await waitForRender();

      menuItem.setAttribute("index", "2");
      await waitForRender();
      expect(menuItem.getAttribute("index")).toBe("2");
    });
  });

  /**
   * EaMenuItem disabled 属性
   */
  describe("EaMenuItem disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const menuItem = document.createElement("ea-menu-item");
      container.appendChild(menuItem);
      await waitForRender();
      expect(menuItem.disabled).toBe(false);
    });

    it("设置 disabled 属性应该禁用菜单项", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("disabled", "");
      container.appendChild(menuItem);
      await waitForRender();
      expect(menuItem.disabled).toBe(true);
    });

    it("disabled 应该应用 BEM modifier 类 is-disabled", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("disabled", "");
      container.appendChild(menuItem);
      await waitForRender();
      const el = menuItem.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("is-disabled");
    });

    it("动态设置 disabled 应该更新 BEM 类", async () => {
      const menuItem = document.createElement("ea-menu-item");
      container.appendChild(menuItem);
      await waitForRender();

      menuItem.setAttribute("disabled", "");
      await waitForRender();
      const el = menuItem.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("is-disabled");
    });

    it("移除 disabled 应该移除 BEM 类", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("disabled", "");
      container.appendChild(menuItem);
      await waitForRender();

      menuItem.removeAttribute("disabled");
      await waitForRender();
      const el = menuItem.shadowRoot.querySelector('[part="container"]');
      expect(el.className).not.toContain("is-disabled");
    });
  });

  /**
   * EaMenuItem active 属性
   */
  describe("EaMenuItem active Attribute", () => {
    it("默认 active 应该是 false", async () => {
      const menuItem = document.createElement("ea-menu-item");
      container.appendChild(menuItem);
      await waitForRender();
      expect(menuItem.active).toBe(false);
    });

    it("设置 active 属性应该激活菜单项", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("active", "");
      container.appendChild(menuItem);
      await waitForRender();
      expect(menuItem.active).toBe(true);
    });

    it("active 应该应用 BEM modifier 类 is-active", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("active", "");
      container.appendChild(menuItem);
      await waitForRender();
      const el = menuItem.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("is-active");
    });

    it("动态设置 active 应该更新 BEM 类", async () => {
      const menuItem = document.createElement("ea-menu-item");
      container.appendChild(menuItem);
      await waitForRender();

      menuItem.setAttribute("active", "");
      await waitForRender();
      const el = menuItem.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("is-active");
    });

    it("移除 active 应该移除 BEM 类", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("active", "");
      container.appendChild(menuItem);
      await waitForRender();

      menuItem.removeAttribute("active");
      await waitForRender();
      const el = menuItem.shadowRoot.querySelector('[part="container"]');
      expect(el.className).not.toContain("is-active");
    });

    it("同时设置 disabled 和 active 应该都有对应 BEM 类", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("disabled", "");
      menuItem.setAttribute("active", "");
      container.appendChild(menuItem);
      await waitForRender();
      const el = menuItem.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("is-disabled");
      expect(el.className).toContain("is-active");
    });
  });

  /**
   * EaSubMenu 基本渲染
   */
  describe("EaSubMenu Basic Rendering", () => {
    it("应该正确渲染 ea-sub-menu 组件", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);
      await waitForRender();
      expect(subMenu).toBeDefined();
      expect(subMenu.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);
      await waitForRender();
      expect(
        subMenu.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 title CSS Part", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);
      await waitForRender();
      expect(subMenu.shadowRoot.querySelector('[part="title"]')).toBeTruthy();
    });

    it("应该包含 arrow CSS Part", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);
      await waitForRender();
      expect(subMenu.shadowRoot.querySelector('[part="arrow"]')).toBeTruthy();
    });

    it("应该包含 content CSS Part", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);
      await waitForRender();
      expect(subMenu.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });

    it("应该渲染 title 插槽", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.innerHTML = '<span slot="title">Sub Menu</span>';
      container.appendChild(subMenu);
      await waitForRender();
      expect(
        subMenu.shadowRoot.querySelector('slot[name="title"]')
      ).toBeTruthy();
    });

    it("应该渲染默认插槽", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.innerHTML = "<ea-menu-item>Item</ea-menu-item>";
      container.appendChild(subMenu);
      await waitForRender();
      const defaultSlot = subMenu.shadowRoot.querySelector(
        "ul[part='content'] slot:not([name])"
      );
      expect(defaultSlot).toBeTruthy();
    });

    it("updateContainerClasslist 应该返回正确的类名", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);
      await waitForRender();
      const className = subMenu.updateContainerClasslist();
      expect(className).toContain("ea-sub-menu--vertical");
    });
  });

  /**
   * EaSubMenu index 属性
   */
  describe("EaSubMenu index Attribute", () => {
    it("应该支持 index 属性", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("index", "2");
      container.appendChild(subMenu);
      await waitForRender();
      expect(subMenu.getAttribute("index")).toBe("2");
    });

    it("动态修改 index 应该生效", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("index", "1");
      container.appendChild(subMenu);
      await waitForRender();

      subMenu.setAttribute("index", "2");
      await waitForRender();
      expect(subMenu.getAttribute("index")).toBe("2");
    });
  });

  /**
   * EaSubMenu mode 属性
   */
  describe("EaSubMenu mode Attribute", () => {
    it("默认 mode 应该是 vertical", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);
      await waitForRender();
      expect(subMenu.mode).toBe("vertical");
    });

    it("应该支持 mode='horizontal'", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("mode", "horizontal");
      container.appendChild(subMenu);
      await waitForRender();
      expect(subMenu.mode).toBe("horizontal");
    });

    it("horizontal 模式应该应用 BEM modifier 类", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("mode", "horizontal");
      container.appendChild(subMenu);
      await waitForRender();
      const el = subMenu.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("ea-sub-menu--horizontal");
    });

    it("vertical 模式应该应用 BEM modifier 类", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("mode", "vertical");
      container.appendChild(subMenu);
      await waitForRender();
      const el = subMenu.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("ea-sub-menu--vertical");
    });

    it("动态修改 mode 应该更新 BEM 类", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("mode", "vertical");
      container.appendChild(subMenu);
      await waitForRender();

      subMenu.setAttribute("mode", "horizontal");
      await waitForRender();
      const el = subMenu.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("ea-sub-menu--horizontal");
      expect(el.className).not.toContain("ea-sub-menu--vertical");
    });
  });

  /**
   * EaSubMenu disabled 属性
   */
  describe("EaSubMenu disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);
      await waitForRender();
      expect(subMenu.disabled).toBe(false);
    });

    it("设置 disabled 属性应该禁用子菜单", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("disabled", "");
      container.appendChild(subMenu);
      await waitForRender();
      expect(subMenu.disabled).toBe(true);
    });

    it("disabled 应该应用 BEM modifier 类 is-disabled", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("disabled", "");
      container.appendChild(subMenu);
      await waitForRender();
      const el = subMenu.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("is-disabled");
    });

    it("移除 disabled 应该移除 BEM 类", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("disabled", "");
      container.appendChild(subMenu);
      await waitForRender();

      subMenu.removeAttribute("disabled");
      await waitForRender();
      const el = subMenu.shadowRoot.querySelector('[part="container"]');
      expect(el.className).not.toContain("is-disabled");
    });

    it("disabled 子菜单点击标题不应展开/收起", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("disabled", "");
      container.appendChild(subMenu);
      await waitForRender();

      const titleEl = subMenu.shadowRoot.querySelector('[part="title"]');
      titleEl.click();
      await waitForRender();

      expect(subMenu.open).toBe(false);
    });

    it("disabled 子菜单内点击 menu-item 不应触发 ea-sub-menu-click", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("disabled", "");
      subMenu.setAttribute("index", "1");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1-1");
      menuItem.textContent = "Item";
      subMenu.appendChild(menuItem);
      container.appendChild(subMenu);
      await waitForRender();

      let fired = false;
      subMenu.addEventListener("ea-sub-menu-click", () => {
        fired = true;
      });

      menuItem.click();
      await waitForRender();
      expect(fired).toBe(false);
    });
  });

  /**
   * EaSubMenu active 属性
   */
  describe("EaSubMenu active Attribute", () => {
    it("默认 active 应该是 false", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);
      await waitForRender();
      expect(subMenu.active).toBe(false);
    });

    it("设置 active 属性应该激活子菜单", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("active", "");
      container.appendChild(subMenu);
      await waitForRender();
      expect(subMenu.active).toBe(true);
    });

    it("active 应该应用 BEM modifier 类 is-active", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("active", "");
      container.appendChild(subMenu);
      await waitForRender();
      const el = subMenu.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("is-active");
    });

    it("移除 active 应该移除 BEM 类", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("active", "");
      container.appendChild(subMenu);
      await waitForRender();

      subMenu.removeAttribute("active");
      await waitForRender();
      const el = subMenu.shadowRoot.querySelector('[part="container"]');
      expect(el.className).not.toContain("is-active");
    });
  });

  /**
   * EaSubMenu open 属性
   */
  describe("EaSubMenu open Attribute", () => {
    it("默认 open 应该是 false", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);
      await waitForRender();
      expect(subMenu.open).toBe(false);
    });

    it("设置 open 属性应该展开子菜单", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.open = true;
      container.appendChild(subMenu);
      await waitForRender();
      expect(subMenu.open).toBe(true);
    });

    it("open 应该应用 BEM modifier 类 is-open", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);
      await waitForRender();

      subMenu.open = true;
      await waitForRender();
      const el = subMenu.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("is-open");
    });

    it("vertical 模式点击标题应该切换 open 状态", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("mode", "vertical");
      container.appendChild(subMenu);
      await waitForRender();

      const titleEl = subMenu.shadowRoot.querySelector('[part="title"]');
      titleEl.click();
      await waitForRender();
      expect(subMenu.open).toBe(true);

      titleEl.click();
      await waitForRender();
      expect(subMenu.open).toBe(false);
    });

    it("horizontal 模式 mouseenter 应该设置 open 为 true", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("mode", "horizontal");
      container.appendChild(subMenu);
      await waitForRender();

      subMenu.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
      await waitForRender();
      expect(subMenu.open).toBe(true);
    });

    it("horizontal 模式 mouseleave 应该设置 open 为 false", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("mode", "horizontal");
      container.appendChild(subMenu);
      await waitForRender();

      subMenu.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
      await waitForRender();
      expect(subMenu.open).toBe(true);

      subMenu.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
      await waitForRender();
      expect(subMenu.open).toBe(false);
    });

    it("从 vertical 切换到 horizontal 模式应该切换交互方式", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("mode", "vertical");
      container.appendChild(subMenu);
      await waitForRender();

      const titleEl = subMenu.shadowRoot.querySelector('[part="title"]');
      titleEl.click();
      await waitForRender();
      expect(subMenu.open).toBe(true);

      subMenu.setAttribute("mode", "horizontal");
      await waitForRender();

      subMenu.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
      await waitForRender();
      expect(subMenu.open).toBe(true);

      subMenu.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
      await waitForRender();
      expect(subMenu.open).toBe(false);
    });
  });

  /**
   * EaSubMenu label 属性
   */
  describe("EaSubMenu label Attribute", () => {
    it("应该支持 label 属性", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("label", "Test Label");
      container.appendChild(subMenu);
      await waitForRender();
      expect(subMenu.getAttribute("label")).toBe("Test Label");
    });

    it("label 应该更新 title slot 内容", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("label", "Test Label");
      container.appendChild(subMenu);
      await waitForRender();
      const titleSlot = subMenu.shadowRoot.querySelector('slot[name="title"]');
      expect(titleSlot.textContent).toBe("Test Label");
    });

    it("动态修改 label 应该更新 title slot", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("label", "Old Label");
      container.appendChild(subMenu);
      await waitForRender();

      subMenu.setAttribute("label", "New Label");
      await waitForRender();
      const titleSlot = subMenu.shadowRoot.querySelector('slot[name="title"]');
      expect(titleSlot.textContent).toBe("New Label");
    });
  });

  /**
   * EaSubMenu 箭头图标
   */
  describe("EaSubMenu Arrow Icon", () => {
    it("vertical 模式箭头默认应该是 angle-down", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("mode", "vertical");
      container.appendChild(subMenu);
      await waitForRender();
      const arrow = subMenu.shadowRoot.querySelector('[part="arrow"]');
      expect(arrow.getAttribute("name")).toBe("angle-down");
    });

    it("horizontal 模式箭头默认应该是 angle-down", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("mode", "horizontal");
      container.appendChild(subMenu);
      await waitForRender();
      const arrow = subMenu.shadowRoot.querySelector('[part="arrow"]');
      expect(arrow.getAttribute("name")).toBe("angle-down");
    });

    it("嵌套子菜单在 vertical 模式下箭头应该是 angle-down", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("mode", "vertical");
      const outerSub = document.createElement("ea-sub-menu");
      outerSub.setAttribute("index", "1");
      const innerSub = document.createElement("ea-sub-menu");
      innerSub.setAttribute("index", "1-1");
      outerSub.appendChild(innerSub);
      menu.appendChild(outerSub);
      container.appendChild(menu);
      await waitForRender();

      const innerArrow = innerSub.shadowRoot.querySelector('[part="arrow"]');
      expect(innerArrow.getAttribute("name")).toBe("angle-down");
    });

    it("嵌套子菜单在 horizontal 模式下箭头应该是 angle-down", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("mode", "horizontal");
      const outerSub = document.createElement("ea-sub-menu");
      outerSub.setAttribute("index", "1");
      const innerSub = document.createElement("ea-sub-menu");
      innerSub.setAttribute("index", "1-1");
      outerSub.appendChild(innerSub);
      menu.appendChild(outerSub);
      container.appendChild(menu);
      await waitForRender();

      const innerArrow = innerSub.shadowRoot.querySelector('[part="arrow"]');
      expect(innerArrow.getAttribute("name")).toBe("angle-down");
    });
  });

  /**
   * EaSubMenu 事件
   */
  describe("EaSubMenu Events", () => {
    it("点击子菜单内 menu-item 应该触发 ea-sub-menu-click 事件", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("index", "2");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "2-1");
      menuItem.textContent = "Sub Item";
      subMenu.appendChild(menuItem);
      container.appendChild(subMenu);
      await waitForRender();

      const eventPromise = new Promise(resolve => {
        subMenu.addEventListener("ea-sub-menu-click", e => resolve(e.detail));
      });

      menuItem.click();
      const detail = await eventPromise;
      expect(detail.index).toBe("2");
      expect(detail.itemIndex).toBe("2-1");
      expect(detail.target).toBe(menuItem);
    });

    it("点击子菜单内 menu-item 应该激活子菜单和菜单项", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("index", "2");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "2-1");
      menuItem.textContent = "Sub Item";
      subMenu.appendChild(menuItem);
      container.appendChild(subMenu);
      await waitForRender();

      menuItem.click();
      await waitForRender();

      expect(subMenu.hasAttribute("active")).toBe(true);
      expect(menuItem.hasAttribute("active")).toBe(true);
    });

    it("嵌套子菜单内点击 item 应该激活所有祖先子菜单", async () => {
      const outerSub = document.createElement("ea-sub-menu");
      outerSub.setAttribute("index", "1");
      const innerSub = document.createElement("ea-sub-menu");
      innerSub.setAttribute("index", "1-1");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1-1-1");
      menuItem.textContent = "Deep";
      innerSub.appendChild(menuItem);
      outerSub.appendChild(innerSub);
      container.appendChild(outerSub);
      await waitForRender();

      menuItem.click();
      await waitForRender();

      expect(outerSub.hasAttribute("active")).toBe(true);
      expect(innerSub.hasAttribute("active")).toBe(true);
      expect(menuItem.hasAttribute("active")).toBe(true);
    });

    it("ea-sub-menu-click 事件应该冒泡", async () => {
      const menu = document.createElement("ea-menu");
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("index", "2");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "2-1");
      menuItem.textContent = "Sub Item";
      subMenu.appendChild(menuItem);
      menu.appendChild(subMenu);
      container.appendChild(menu);
      await waitForRender();

      const eventPromise = new Promise(resolve => {
        menu.addEventListener("ea-sub-menu-click", e => resolve(e.detail));
      });

      menuItem.click();
      const detail = await eventPromise;
      expect(detail.index).toBe("2");
      expect(detail.itemIndex).toBe("2-1");
    });
  });

  /**
   * EaSubMenu 生命周期
   */
  describe("EaSubMenu Lifecycle", () => {
    it("$mount 应该正确初始化", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("mode", "horizontal");
      container.appendChild(subMenu);
      await waitForRender();
      expect(
        subMenu.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("$beforeUnmount 应该清理所有 abort controller", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("mode", "vertical");
      container.appendChild(subMenu);
      await waitForRender();

      subMenu.remove();
      await waitForRender();

      const titleEl = subMenu.shadowRoot.querySelector('[part="title"]');
      titleEl.click();
      await waitForRender();
      expect(subMenu.open).toBe(false);
    });
  });

  /**
   * EaMenuItemGroup 基本渲染
   */
  describe("EaMenuItemGroup Basic Rendering", () => {
    it("应该正确渲染 ea-menu-item-group 组件", async () => {
      const menuGroup = document.createElement("ea-menu-item-group");
      container.appendChild(menuGroup);
      await waitForRender();
      expect(menuGroup).toBeDefined();
      expect(menuGroup.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const menuGroup = document.createElement("ea-menu-item-group");
      container.appendChild(menuGroup);
      await waitForRender();
      expect(
        menuGroup.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 title CSS Part", async () => {
      const menuGroup = document.createElement("ea-menu-item-group");
      container.appendChild(menuGroup);
      await waitForRender();
      expect(menuGroup.shadowRoot.querySelector('[part="title"]')).toBeTruthy();
    });

    it("应该包含 content CSS Part", async () => {
      const menuGroup = document.createElement("ea-menu-item-group");
      container.appendChild(menuGroup);
      await waitForRender();
      expect(
        menuGroup.shadowRoot.querySelector('[part="content"]')
      ).toBeTruthy();
    });

    it("应该渲染默认插槽", async () => {
      const menuGroup = document.createElement("ea-menu-item-group");
      menuGroup.innerHTML = "<ea-menu-item>Item</ea-menu-item>";
      container.appendChild(menuGroup);
      await waitForRender();
      const defaultSlot = menuGroup.shadowRoot.querySelector(
        '[part="content"] slot'
      );
      expect(defaultSlot).toBeTruthy();
    });
  });

  /**
   * EaMenuItemGroup groupTitle 属性
   */
  describe("EaMenuItemGroup groupTitle Attribute", () => {
    it("应该支持 group-title 属性", async () => {
      const menuGroup = document.createElement("ea-menu-item-group");
      menuGroup.setAttribute("group-title", "Group Title");
      container.appendChild(menuGroup);
      await waitForRender();
      expect(menuGroup.getAttribute("group-title")).toBe("Group Title");
    });

    it("group-title 应该渲染到 title slot 中", async () => {
      const menuGroup = document.createElement("ea-menu-item-group");
      menuGroup.setAttribute("group-title", "Group Title");
      container.appendChild(menuGroup);
      await waitForRender();
      const titleSlot =
        menuGroup.shadowRoot.querySelector('slot[name="title"]');
      expect(titleSlot.textContent).toBe("Group Title");
    });

    it("动态修改 group-title 应该更新 title slot", async () => {
      const menuGroup = document.createElement("ea-menu-item-group");
      menuGroup.setAttribute("group-title", "Old Title");
      container.appendChild(menuGroup);
      await waitForRender();

      menuGroup.setAttribute("group-title", "New Title");
      await waitForRender();
      const titleSlot =
        menuGroup.shadowRoot.querySelector('slot[name="title"]');
      expect(titleSlot.textContent).toBe("New Title");
    });

    it("默认 group-title 应该为空", async () => {
      const menuGroup = document.createElement("ea-menu-item-group");
      container.appendChild(menuGroup);
      await waitForRender();
      expect(menuGroup.groupTitle).toBe("");
    });
  });

  /**
   * 组合布局
   */
  describe("Combined Menu Layout", () => {
    it("应该支持基本的 menu + menu-item 布局", async () => {
      const menu = document.createElement("ea-menu");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      menuItem.textContent = "Item 1";
      menu.appendChild(menuItem);
      container.appendChild(menu);
      await waitForRender();

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
      await waitForRender();

      expect(subMenu.getAttribute("index")).toBe("2");
      expect(menuItem.getAttribute("index")).toBe("2-1");
    });

    it("应该支持 menu + menu-item-group 布局", async () => {
      const menu = document.createElement("ea-menu");
      const menuGroup = document.createElement("ea-menu-item-group");
      menuGroup.setAttribute("group-title", "Group One");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1-1");
      menuItem.textContent = "Group Item";
      menuGroup.appendChild(menuItem);
      menu.appendChild(menuGroup);
      container.appendChild(menu);
      await waitForRender();

      expect(menuGroup.getAttribute("group-title")).toBe("Group One");
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
      await waitForRender();

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
      await waitForRender();

      expect(menu.mode).toBe("horizontal");
      expect(menu.getAttribute("default-active")).toBe("1");
      expect(menu.getAttribute("background-color")).toBe("#545c64");
      expect(menu.getAttribute("text-color")).toBe("#fff");
      expect(menu.getAttribute("active-text-color")).toBe("#ffd04b");
    });

    it("应该支持 sub-menu 内嵌套 menu-item-group", async () => {
      const menu = document.createElement("ea-menu");
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("index", "1");
      const menuGroup = document.createElement("ea-menu-item-group");
      menuGroup.setAttribute("group-title", "Group One");
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1-1");
      menuItem.textContent = "Group Item";
      menuGroup.appendChild(menuItem);
      subMenu.appendChild(menuGroup);
      menu.appendChild(subMenu);
      container.appendChild(menu);
      await waitForRender();

      expect(menuGroup.getAttribute("group-title")).toBe("Group One");
      expect(menuItem.getAttribute("index")).toBe("1-1");
    });

    it("多个菜单实例不应互相干扰", async () => {
      const menu1 = document.createElement("ea-menu");
      const item1 = document.createElement("ea-menu-item");
      item1.setAttribute("index", "1");
      item1.textContent = "Menu1 Item";
      menu1.appendChild(item1);

      const menu2 = document.createElement("ea-menu");
      const item2 = document.createElement("ea-menu-item");
      item2.setAttribute("index", "1");
      item2.textContent = "Menu2 Item";
      menu2.appendChild(item2);

      container.appendChild(menu1);
      container.appendChild(menu2);
      await waitForRender();

      item1.click();
      await waitForRender();

      expect(item1.hasAttribute("active")).toBe(true);
      expect(item2.hasAttribute("active")).toBe(false);
    });
  });

  /**
   * 边界条件
   */
  describe("Edge Cases", () => {
    it("空 menu 应该正常渲染", async () => {
      const menu = document.createElement("ea-menu");
      container.appendChild(menu);
      await waitForRender();
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
      await waitForRender();

      expect(menuItem.getAttribute("index")).toBe("1-1-1-1");
    });

    it("动态修改 menu 颜色属性应该生效", async () => {
      const menu = document.createElement("ea-menu");
      menu.setAttribute("background-color", "#ffffff");
      container.appendChild(menu);
      await waitForRender();

      menu.setAttribute("background-color", "#000000");
      await waitForRender();
      expect(menu.getAttribute("background-color")).toBe("#000000");
    });

    it("动态修改 menu-item index 应该生效", async () => {
      const menuItem = document.createElement("ea-menu-item");
      menuItem.setAttribute("index", "1");
      container.appendChild(menuItem);
      await waitForRender();

      menuItem.setAttribute("index", "2");
      await waitForRender();
      expect(menuItem.getAttribute("index")).toBe("2");
    });

    it("动态修改 sub-menu disabled 应该更新 BEM 类", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);
      await waitForRender();

      subMenu.setAttribute("disabled", "");
      await waitForRender();
      const el = subMenu.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("is-disabled");
    });

    it("动态修改 sub-menu active 应该更新 BEM 类", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      container.appendChild(subMenu);
      await waitForRender();

      subMenu.setAttribute("active", "");
      await waitForRender();
      const el = subMenu.shadowRoot.querySelector('[part="container"]');
      expect(el.className).toContain("is-active");
    });

    it("组件断开连接后应该正常移除", () => {
      const menu = document.createElement("ea-menu");
      const menuItem = document.createElement("ea-menu-item");
      menu.appendChild(menuItem);
      container.appendChild(menu);
      menu.remove();
      expect(container.contains(menu)).toBe(false);
    });

    it("快速连续切换 active 不应报错", async () => {
      const menu = document.createElement("ea-menu");
      const item1 = document.createElement("ea-menu-item");
      item1.setAttribute("index", "1");
      const item2 = document.createElement("ea-menu-item");
      item2.setAttribute("index", "2");
      const item3 = document.createElement("ea-menu-item");
      item3.setAttribute("index", "3");
      menu.appendChild(item1);
      menu.appendChild(item2);
      menu.appendChild(item3);
      container.appendChild(menu);
      await waitForRender();

      menu.setAttribute("active", "1");
      menu.setAttribute("active", "2");
      menu.setAttribute("active", "3");
      await waitForRender();

      expect(item3.hasAttribute("active")).toBe(true);
      expect(item1.hasAttribute("active")).toBe(false);
      expect(item2.hasAttribute("active")).toBe(false);
    });

    it("没有 menu-item 的 sub-menu 点击标题不应报错", async () => {
      const subMenu = document.createElement("ea-sub-menu");
      subMenu.setAttribute("mode", "vertical");
      container.appendChild(subMenu);
      await waitForRender();

      const titleEl = subMenu.shadowRoot.querySelector('[part="title"]');
      expect(() => titleEl.click()).not.toThrow();
    });
  });
});
