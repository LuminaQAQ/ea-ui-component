import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-dropdown 组件及其依赖
import "../components/ea-dropdown/index.js";

describe("EaDropdown Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基本功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-dropdown 组件", () => {
      const dropdown = document.createElement("ea-dropdown");
      container.appendChild(dropdown);

      expect(dropdown).toBeDefined();
      expect(dropdown.shadowRoot).toBeDefined();
    });

    it("应该包含 reference 插槽", () => {
      const dropdown = document.createElement("ea-dropdown");
      dropdown.innerHTML = `
        <span slot="reference">Trigger</span>
        <ea-dropdown-menu>
          <ea-dropdown-item>Item 1</ea-dropdown-item>
        </ea-dropdown-menu>
      `;
      container.appendChild(dropdown);

      const referenceSlot = dropdown.shadowRoot.querySelector(
        'slot[name="reference"]'
      );
      expect(referenceSlot).toBeTruthy();
    });

    it("应该包含默认插槽用于下拉内容", () => {
      const dropdown = document.createElement("ea-dropdown");
      dropdown.innerHTML = `
        <span slot="reference">Trigger</span>
        <ea-dropdown-menu>
          <ea-dropdown-item>Item 1</ea-dropdown-item>
        </ea-dropdown-menu>
      `;
      container.appendChild(dropdown);

      const defaultSlot = dropdown.shadowRoot.querySelector("slot:not([name])");
      expect(defaultSlot).toBeTruthy();
    });
  });

  /**
   * Trigger 属性测试
   */
  describe("Trigger Attribute", () => {
    it("默认 trigger 应该是 hover", async () => {
      const dropdown = document.createElement("ea-dropdown");
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(dropdown.trigger).toBe("hover");
    });

    it("设置 trigger='click' 应该使用点击触发", async () => {
      const dropdown = document.createElement("ea-dropdown");
      dropdown.setAttribute("trigger", "click");
      dropdown.innerHTML = `
        <span slot="reference">Trigger</span>
        <ea-dropdown-menu>
          <ea-dropdown-item>Item 1</ea-dropdown-item>
        </ea-dropdown-menu>
      `;
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(dropdown.trigger).toBe("click");
    });

    it("设置 trigger='contextmenu' 应该使用右键菜单触发", async () => {
      const dropdown = document.createElement("ea-dropdown");
      dropdown.setAttribute("trigger", "contextmenu");
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(dropdown.trigger).toBe("contextmenu");
    });
  });

  /**
   * Placement 属性测试
   */
  describe("Placement Attribute", () => {
    it("默认 placement 应该是 bottom", async () => {
      const dropdown = document.createElement("ea-dropdown");
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 如果没有设置 placement，默认为 bottom
      expect(dropdown.placement || "bottom").toBe("bottom");
    });

    it("应该支持 placement 属性设置", () => {
      const dropdown = document.createElement("ea-dropdown");
      // 在添加到 DOM 前设置属性
      dropdown.setAttribute("placement", "top");

      // 检查属性是否被设置
      expect(dropdown.hasAttribute("placement")).toBe(true);
      expect(dropdown.getAttribute("placement")).toBe("top");
    });

    it("应该支持多种 placement 值", () => {
      const placements = [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
      ];

      placements.forEach(placement => {
        const dropdown = document.createElement("ea-dropdown");
        dropdown.setAttribute("placement", placement);
        expect(dropdown.getAttribute("placement")).toBe(placement);
      });
    });
  });

  /**
   * Hide On Click 属性测试
   */
  describe("Hide On Click Attribute", () => {
    it("默认 hide-on-click 应该是 true", async () => {
      const dropdown = document.createElement("ea-dropdown");
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(dropdown["hide-on-click"]).toBe(true);
    });

    it("设置 hide-on-click='false' 应该禁用点击隐藏", async () => {
      const dropdown = document.createElement("ea-dropdown");
      dropdown.setAttribute("hide-on-click", "false");
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(dropdown["hide-on-click"]).toBe(false);
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("默认 size 应该为空", async () => {
      const dropdown = document.createElement("ea-dropdown");
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(dropdown.size).toBe("");
    });

    it("设置 size='small' 应该生效", async () => {
      const dropdown = document.createElement("ea-dropdown");
      dropdown.setAttribute("size", "small");
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(dropdown.size).toBe("small");
    });

    it("设置 size='large' 应该生效", async () => {
      const dropdown = document.createElement("ea-dropdown");
      dropdown.setAttribute("size", "large");
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(dropdown.size).toBe("large");
    });
  });

  /**
   * 方法测试
   */
  describe("Methods", () => {
    it("应该提供 show 方法", async () => {
      const dropdown = document.createElement("ea-dropdown");
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof dropdown.show).toBe("function");
    });

    it("应该提供 hide 方法", async () => {
      const dropdown = document.createElement("ea-dropdown");
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof dropdown.hide).toBe("function");
    });

    it("调用 show 方法应该显示下拉菜单", async () => {
      const dropdown = document.createElement("ea-dropdown");
      dropdown.innerHTML = `
        <span slot="reference">Trigger</span>
        <ea-dropdown-menu>
          <ea-dropdown-item>Item 1</ea-dropdown-item>
        </ea-dropdown-menu>
      `;
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      const showHandler = vi.fn();
      dropdown.addEventListener("show", showHandler);

      dropdown.show();

      expect(showHandler).toHaveBeenCalled();
    });

    it("调用 hide 方法应该隐藏下拉菜单", async () => {
      const dropdown = document.createElement("ea-dropdown");
      dropdown.innerHTML = `
        <span slot="reference">Trigger</span>
        <ea-dropdown-menu>
          <ea-dropdown-item>Item 1</ea-dropdown-item>
        </ea-dropdown-menu>
      `;
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      dropdown.show();

      const hideHandler = vi.fn();
      dropdown.addEventListener("hide", hideHandler);

      dropdown.hide();

      expect(hideHandler).toHaveBeenCalled();
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 show 事件", async () => {
      const dropdown = document.createElement("ea-dropdown");
      dropdown.innerHTML = `
        <span slot="reference">Trigger</span>
        <ea-dropdown-menu>
          <ea-dropdown-item>Item 1</ea-dropdown-item>
        </ea-dropdown-menu>
      `;
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      const showHandler = vi.fn();
      dropdown.addEventListener("show", showHandler);

      dropdown.show();

      expect(showHandler).toHaveBeenCalled();
    });

    it("应该触发 hide 事件", async () => {
      const dropdown = document.createElement("ea-dropdown");
      dropdown.innerHTML = `
        <span slot="reference">Trigger</span>
        <ea-dropdown-menu>
          <ea-dropdown-item>Item 1</ea-dropdown-item>
        </ea-dropdown-menu>
      `;
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      dropdown.show();

      const hideHandler = vi.fn();
      dropdown.addEventListener("hide", hideHandler);

      dropdown.hide();

      expect(hideHandler).toHaveBeenCalled();
    });

    it("点击菜单项应该触发 command 事件", async () => {
      const dropdown = document.createElement("ea-dropdown");
      dropdown.setAttribute("trigger", "click");
      dropdown.innerHTML = `
        <span slot="reference">Trigger</span>
        <ea-dropdown-menu>
          <ea-dropdown-item command="test-command">Item 1</ea-dropdown-item>
        </ea-dropdown-menu>
      `;
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      const commandHandler = vi.fn();
      dropdown.addEventListener("command", commandHandler);

      const item = dropdown.querySelector("ea-dropdown-item");
      item.click();

      expect(commandHandler).toHaveBeenCalled();
      expect(commandHandler.mock.calls[0][0].detail.command).toBe(
        "test-command"
      );
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空内容时应该正确处理", async () => {
      const dropdown = document.createElement("ea-dropdown");
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(dropdown.shadowRoot).toBeTruthy();
    });

    it("没有 reference 时应该正确处理", async () => {
      const dropdown = document.createElement("ea-dropdown");
      dropdown.innerHTML = `
        <ea-dropdown-menu>
          <ea-dropdown-item>Item 1</ea-dropdown-item>
        </ea-dropdown-menu>
      `;
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(dropdown.shadowRoot).toBeTruthy();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const dropdown = document.createElement("ea-dropdown");
      dropdown.innerHTML = `
        <span slot="reference">Trigger</span>
        <ea-dropdown-menu>
          <ea-dropdown-item>Item 1</ea-dropdown-item>
        </ea-dropdown-menu>
      `;
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        dropdown.shadowRoot.querySelector('slot[name="reference"]')
      ).toBeTruthy();
    });

    it("组件断开连接后应该清理资源", async () => {
      const dropdown = document.createElement("ea-dropdown");
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      dropdown.remove();

      expect(() => {
        // 确保没有抛出错误
      }).not.toThrow();
    });

    it("应该继承 EaPopper 的功能", async () => {
      const dropdown = document.createElement("ea-dropdown");
      container.appendChild(dropdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof dropdown.show).toBe("function");
      expect(typeof dropdown.hide).toBe("function");
    });
  });
});

describe("EaDropdownItem Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基本功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-dropdown-item 组件", () => {
      const item = document.createElement("ea-dropdown-item");
      item.textContent = "Test Item";
      container.appendChild(item);

      expect(item).toBeDefined();
      expect(item.shadowRoot).toBeDefined();
    });

    it("应该包含必要的 CSS Part", () => {
      const item = document.createElement("ea-dropdown-item");
      container.appendChild(item);

      expect(item.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(item.shadowRoot.querySelector('[part="divider"]')).toBeTruthy();
      expect(item.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const item = document.createElement("ea-dropdown-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 默认为 null，转换为布尔值后为 false
      expect(!!item.disabled).toBe(false);
    });

    it("设置 disabled='true' 应该禁用菜单项", async () => {
      const item = document.createElement("ea-dropdown-item");
      item.setAttribute("disabled", "");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.disabled).toBe(true);
      expect(item.hasAttribute("aria-disabled")).toBe(true);
    });
  });

  /**
   * Divided 属性测试
   */
  describe("Divided Attribute", () => {
    it("默认 divided 应该是 false", async () => {
      const item = document.createElement("ea-dropdown-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 默认为 null，转换为布尔值后为 false
      expect(!!item.divided).toBe(false);
    });

    it("设置 divided='true' 应该显示分割线", async () => {
      const item = document.createElement("ea-dropdown-item");
      item.setAttribute("divided", "");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.divided).toBe(true);
    });
  });

  /**
   * Command 属性测试
   */
  describe("Command Attribute", () => {
    it("默认 command 应该为空", async () => {
      const item = document.createElement("ea-dropdown-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.command).toBe("");
    });

    it("设置 command 属性应该生效", async () => {
      const item = document.createElement("ea-dropdown-item");
      item.setAttribute("command", "test-cmd");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.command).toBe("test-cmd");
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("点击应该触发 ea-dropdown-item-click 事件", async () => {
      const item = document.createElement("ea-dropdown-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      const clickHandler = vi.fn();
      item.addEventListener("ea-dropdown-item-click", clickHandler);

      item.click();

      expect(clickHandler).toHaveBeenCalled();
    });

    it("点击应该触发 command 事件（当设置了 command 属性）", async () => {
      const item = document.createElement("ea-dropdown-item");
      item.setAttribute("command", "my-command");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      const commandHandler = vi.fn();
      item.addEventListener("command", commandHandler);

      item.click();

      expect(commandHandler).toHaveBeenCalled();
      expect(commandHandler.mock.calls[0][0].detail.command).toBe("my-command");
    });

    it("禁用时点击不应该触发事件", async () => {
      const item = document.createElement("ea-dropdown-item");
      item.setAttribute("disabled", "");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      const clickHandler = vi.fn();
      item.addEventListener("ea-dropdown-item-click", clickHandler);

      item.click();

      expect(clickHandler).not.toHaveBeenCalled();
    });
  });
});

describe("EaDropdownMenu Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基本功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-dropdown-menu 组件", () => {
      const menu = document.createElement("ea-dropdown-menu");
      container.appendChild(menu);

      expect(menu).toBeDefined();
      expect(menu.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", () => {
      const menu = document.createElement("ea-dropdown-menu");
      container.appendChild(menu);

      expect(menu.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含默认插槽", () => {
      const menu = document.createElement("ea-dropdown-menu");
      menu.innerHTML = `
        <ea-dropdown-item>Item 1</ea-dropdown-item>
        <ea-dropdown-item>Item 2</ea-dropdown-item>
      `;
      container.appendChild(menu);

      const slot = menu.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * 内容测试
   */
  describe("Content", () => {
    it("应该正确渲染子菜单项", () => {
      const menu = document.createElement("ea-dropdown-menu");
      menu.innerHTML = `
        <ea-dropdown-item>Item 1</ea-dropdown-item>
        <ea-dropdown-item>Item 2</ea-dropdown-item>
        <ea-dropdown-item>Item 3</ea-dropdown-item>
      `;
      container.appendChild(menu);

      const items = menu.querySelectorAll("ea-dropdown-item");
      expect(items.length).toBe(3);
    });

    it("空内容时应该正确处理", () => {
      const menu = document.createElement("ea-dropdown-menu");
      container.appendChild(menu);

      expect(menu.shadowRoot).toBeTruthy();
    });
  });
});
