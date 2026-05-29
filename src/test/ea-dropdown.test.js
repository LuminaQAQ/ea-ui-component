import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-dropdown/index.ts";

function createDropdown(attrs = {}, innerHTML = "") {
  const el = document.createElement("ea-dropdown");
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  if (innerHTML) {
    el.innerHTML = innerHTML;
  }
  return el;
}

function withReference(innerHTML) {
  return (
    innerHTML ||
    `<span slot="reference" class="ref">Trigger</span>
     <ea-dropdown-menu>
       <ea-dropdown-item>Item 1</ea-dropdown-item>
       <ea-dropdown-item>Item 2</ea-dropdown-item>
     </ea-dropdown-menu>`
  );
}

function createDropdownItem(attrs = {}, textContent = "Test Item") {
  const el = document.createElement("ea-dropdown-item");
  for (const [key, value] of Object.entries(attrs)) {
    if (value === "" || value === true) {
      el.setAttribute(key, "");
    } else {
      el.setAttribute(key, value);
    }
  }
  el.textContent = textContent;
  return el;
}

function createDropdownMenu(innerHTML = "") {
  const el = document.createElement("ea-dropdown-menu");
  if (innerHTML) {
    el.innerHTML = innerHTML;
  }
  return el;
}

describe("EaDropdown Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  // ==================== 基础渲染 ====================

  describe("Basic Rendering", () => {
    it("应该正确渲染组件并包含 shadowRoot", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.shadowRoot).toBeTruthy();
    });

    it("应该渲染 .ea-popper 容器", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.shadowRoot.querySelector(".ea-popper")).toBeTruthy();
    });

    it("应该渲染 .ea-popper__reference 元素", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(
        dropdown.shadowRoot.querySelector(".ea-popper__reference")
      ).toBeTruthy();
    });

    it("应该渲染 .ea-popper__original 元素", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(
        dropdown.shadowRoot.querySelector(".ea-popper__original")
      ).toBeTruthy();
    });

    it("container 应该有 tabindex=-1", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      const containerEl = dropdown.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.getAttribute("tabindex")).toBe("-1");
    });

    it("original 应该有 tabindex=0", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      const originalEl = dropdown.shadowRoot.querySelector(
        ".ea-popper__original"
      );
      expect(originalEl.getAttribute("tabindex")).toBe("0");
    });

    it("reference 应该有 tabindex=-1", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      const referenceEl = dropdown.shadowRoot.querySelector(
        ".ea-popper__reference"
      );
      expect(referenceEl.getAttribute("tabindex")).toBe("-1");
    });
  });

  // ==================== CSS Parts ====================

  describe("CSS Parts", () => {
    it("应该支持 container part", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(
        dropdown.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该支持 reference part", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(
        dropdown.shadowRoot.querySelector('[part="reference"]')
      ).toBeTruthy();
    });

    it("应该支持 original part", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(
        dropdown.shadowRoot.querySelector('[part="original"]')
      ).toBeTruthy();
    });
  });

  // ==================== Slots ====================

  describe("Slots", () => {
    it("应该渲染 reference slot", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      const referenceSlot = dropdown.shadowRoot.querySelector(
        'slot[name="reference"]'
      );
      expect(referenceSlot).toBeTruthy();
    });

    it("应该渲染默认 slot", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      const defaultSlot = dropdown.shadowRoot.querySelector("slot:not([name])");
      expect(defaultSlot).toBeTruthy();
    });

    it("reference slot 应该接收 slotted 元素", async () => {
      const dropdown = createDropdown(
        {},
        `<button slot="reference">Click Me</button>
         <ea-dropdown-menu>
           <ea-dropdown-item>Item 1</ea-dropdown-item>
         </ea-dropdown-menu>`
      );
      container.appendChild(dropdown);
      await waitForRender();

      const referenceSlot = dropdown.shadowRoot.querySelector(
        'slot[name="reference"]'
      );
      expect(referenceSlot).toBeTruthy();
    });
  });

  // ==================== trigger 属性 ====================

  describe("Trigger Attribute", () => {
    it("默认 trigger 应该是 hover", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.trigger).toBe("hover");
    });

    it("设置 trigger='click' 应该生效", async () => {
      const dropdown = createDropdown({ trigger: "click" }, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.trigger).toBe("click");
    });

    it("设置 trigger='contextmenu' 应该生效", async () => {
      const dropdown = createDropdown(
        { trigger: "contextmenu" },
        withReference()
      );
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.trigger).toBe("contextmenu");
    });

    it("动态修改 trigger 属性应该更新", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.trigger).toBe("hover");

      dropdown.trigger = "click";
      await waitForRender(0);

      expect(dropdown.trigger).toBe("click");
    });

    it("无效的 trigger 值时 getter 应该返回 null", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      dropdown.setAttribute("trigger", "invalid");
      await waitForRender(0);

      expect(dropdown.trigger).toBe("hover");
    });
  });

  // ==================== placement 属性 ====================

  describe("Placement Attribute", () => {
    it("默认 placement 应该是 bottom（未显式设置时）", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.placement).toBe("bottom");
    });

    it("显式设置 placement 应该生效", async () => {
      const dropdown = createDropdown({ placement: "top" }, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.placement).toBe("top");
    });

    it("应该支持 bottom-start", async () => {
      const dropdown = createDropdown(
        { placement: "bottom-start" },
        withReference()
      );
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.placement).toBe("bottom-start");
    });

    it("应该支持 bottom-end", async () => {
      const dropdown = createDropdown(
        { placement: "bottom-end" },
        withReference()
      );
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.placement).toBe("bottom-end");
    });

    it("应该支持 top-start", async () => {
      const dropdown = createDropdown(
        { placement: "top-start" },
        withReference()
      );
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.placement).toBe("top-start");
    });

    it("应该支持 top-end", async () => {
      const dropdown = createDropdown(
        { placement: "top-end" },
        withReference()
      );
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.placement).toBe("top-end");
    });

    it("动态修改 placement 应该更新容器类名", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      dropdown.placement = "top";
      await waitForRender(0);

      const containerEl = dropdown.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.toString()).toContain("ea-popper--top");
    });
  });

  // ==================== hideOnClick 属性 ====================

  describe("Hide On Click Attribute", () => {
    it("默认 hideOnClick 应该是 true", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.hideOnClick).toBe(true);
    });

    it("设置 hide-on-click='false' 应该禁用点击隐藏", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();
      dropdown.hideOnClick = false;
      await waitForRender();

      expect(dropdown.hideOnClick).toBe(false);
    });

    it("动态修改 hideOnClick 应该生效", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.hideOnClick).toBe(true);

      dropdown.hideOnClick = false;
      await waitForRender(0);

      expect(dropdown.hideOnClick).toBe(false);
    });
  });

  // ==================== size 属性 ====================

  describe("Size Attribute", () => {
    it("默认 size 应该为空字符串", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.size).toBe("");
    });

    it("设置 size='small' 应该生效", async () => {
      const dropdown = createDropdown({ size: "small" }, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.size).toBe("small");
    });

    it("设置 size='default' 应该生效", async () => {
      const dropdown = createDropdown({ size: "default" }, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.size).toBe("default");
    });

    it("设置 size='large' 应该生效", async () => {
      const dropdown = createDropdown({ size: "large" }, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.size).toBe("large");
    });
  });

  // ==================== 继承自 EaPopper 的属性 ====================

  describe("Inherited EaPopper Attributes", () => {
    it("默认 width 应该是 150", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.width).toBe(150);
    });

    it("设置 width 属性应该生效", async () => {
      const dropdown = createDropdown({ width: "200" }, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.width).toBe(200);
    });

    it("默认 showArrow 应该是 true", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.showArrow).toBe(true);
    });

    it("设置 show-arrow='false' 应该隐藏箭头", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();
      dropdown.showArrow = false;
      await waitForRender();

      expect(dropdown.showArrow).toBe(false);
    });

    it("默认 status 应该是 false", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.visible).toBe(false);
    });

    it("默认 offset 应该是 '0 0'", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.offset).toBe("0 0");
    });

    it("默认 flip 应该是 true", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.flip).toBe(true);
    });
  });

  // ==================== 方法 ====================

  describe("Methods", () => {
    it("应该提供 show 方法", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(typeof dropdown.show).toBe("function");
    });

    it("应该提供 hide 方法", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(typeof dropdown.hide).toBe("function");
    });

    it("应该提供 toggle 方法", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(typeof dropdown.toggle).toBe("function");
    });

    it("调用 show 方法应该设置 status 为 true", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.visible).toBe(false);

      dropdown.show();
      await waitForRender(0);

      expect(dropdown.visible).toBe(true);
    });

    it("调用 hide 方法应该设置 status 为 false", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      dropdown.show();
      await waitForRender(0);

      dropdown.hide();
      await waitForRender(0);

      expect(dropdown.visible).toBe(false);
    });

    it("调用 toggle 方法应该切换 status", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.visible).toBe(false);

      dropdown.toggle();
      await waitForRender(0);

      expect(dropdown.visible).toBe(true);

      dropdown.toggle();
      await waitForRender(0);

      expect(dropdown.visible).toBe(false);
    });
  });

  // ==================== 事件 ====================

  describe("Events", () => {
    it("调用 show 应该触发 show 事件", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      const showHandler = vi.fn();
      dropdown.addEventListener("ea-show", showHandler);

      dropdown.show();
      await waitForRender(0);

      expect(showHandler).toHaveBeenCalled();
    });

    it("调用 hide 应该触发 hide 事件", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      dropdown.show();
      await waitForRender(0);

      const hideHandler = vi.fn();
      dropdown.addEventListener("ea-hide", hideHandler);

      dropdown.hide();
      await waitForRender(0);

      expect(hideHandler).toHaveBeenCalled();
    });

    it("show 事件应该冒泡", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      const showHandler = vi.fn();
      container.addEventListener("ea-show", showHandler);

      dropdown.show();
      await waitForRender(0);

      expect(showHandler).toHaveBeenCalled();
    });

    it("hide 事件应该冒泡", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      dropdown.show();
      await waitForRender(0);

      const hideHandler = vi.fn();
      container.addEventListener("ea-hide", hideHandler);

      dropdown.hide();
      await waitForRender(0);

      expect(hideHandler).toHaveBeenCalled();
    });

    it("点击菜单项应该触发 command 事件", async () => {
      const dropdown = createDropdown(
        { trigger: "click" },
        `<span slot="reference">Trigger</span>
         <ea-dropdown-menu>
           <ea-dropdown-item command="test-command">Item 1</ea-dropdown-item>
         </ea-dropdown-menu>`
      );
      container.appendChild(dropdown);
      await waitForRender();

      const commandHandler = vi.fn();
      dropdown.addEventListener("command", commandHandler);

      const item = dropdown.querySelector("ea-dropdown-item");
      const content = item.shadowRoot.querySelector(
        ".ea-dropdown-item__content"
      );
      content.click();

      expect(commandHandler).toHaveBeenCalled();
      expect(commandHandler.mock.calls[0][0].detail.command).toBe(
        "test-command"
      );
    });

    it("点击菜单项应该触发 ea-dropdown-item-click 事件", async () => {
      const dropdown = createDropdown(
        { trigger: "click" },
        `<span slot="reference">Trigger</span>
         <ea-dropdown-menu>
           <ea-dropdown-item>Item 1</ea-dropdown-item>
         </ea-dropdown-menu>`
      );
      container.appendChild(dropdown);
      await waitForRender();

      const clickHandler = vi.fn();
      container.addEventListener("ea-dropdown-item-click", clickHandler, true);

      const item = dropdown.querySelector("ea-dropdown-item");
      const content = item.shadowRoot.querySelector(
        ".ea-dropdown-item__content"
      );
      content.click();

      expect(clickHandler).toHaveBeenCalled();
    });

    it("hideOnClick 为 true 时，点击菜单项应该隐藏下拉菜单", async () => {
      const dropdown = createDropdown(
        { "hide-on-click": "true" },
        `<span slot="reference">Trigger</span>
         <ea-dropdown-menu>
           <ea-dropdown-item>Item 1</ea-dropdown-item>
         </ea-dropdown-menu>`
      );
      container.appendChild(dropdown);
      await waitForRender();

      dropdown.show();
      await waitForRender(0);
      expect(dropdown.visible).toBe(true);

      const item = dropdown.querySelector("ea-dropdown-item");
      const content = item.shadowRoot.querySelector(
        ".ea-dropdown-item__content"
      );
      content.click();
      await waitForRender(0);

      expect(dropdown.visible).toBe(false);
    });

    it("hideOnClick 为 false 时，点击菜单项不应该隐藏下拉菜单", async () => {
      const dropdown = createDropdown(
        {},
        `<span slot="reference">Trigger</span>
         <ea-dropdown-menu>
           <ea-dropdown-item>Item 1</ea-dropdown-item>
         </ea-dropdown-menu>`
      );
      container.appendChild(dropdown);
      await waitForRender();
      dropdown.hideOnClick = false;
      await waitForRender();

      dropdown.show();
      await waitForRender(0);
      expect(dropdown.visible).toBe(true);

      const item = dropdown.querySelector("ea-dropdown-item");
      const content = item.shadowRoot.querySelector(
        ".ea-dropdown-item__content"
      );
      content.click();
      await waitForRender(0);

      expect(dropdown.visible).toBe(true);
    });
  });

  // ==================== Hover 触发 ====================

  describe("Hover Trigger", () => {
    it("hover 触发时，mouseenter 应该显示下拉菜单", async () => {
      const dropdown = createDropdown({ trigger: "hover" }, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.visible).toBe(false);

      dropdown.dispatchEvent(new MouseEvent("mouseenter"));
      await waitForRender(0);

      expect(dropdown.visible).toBe(true);
    });

    it("hover 触发时，mouseleave 应该延迟隐藏下拉菜单", async () => {
      const dropdown = createDropdown({ trigger: "hover" }, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      dropdown.dispatchEvent(new MouseEvent("mouseenter"));
      await waitForRender(0);
      expect(dropdown.visible).toBe(true);

      dropdown.dispatchEvent(new MouseEvent("mouseleave"));

      await waitForRender(50);
      expect(dropdown.visible).toBe(true);

      await waitForRender(200);
      expect(dropdown.visible).toBe(false);
    });

    it("mouseleave 延迟期间重新 mouseenter 应该取消隐藏", async () => {
      const dropdown = createDropdown({ trigger: "hover" }, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      dropdown.dispatchEvent(new MouseEvent("mouseenter"));
      await waitForRender(0);
      expect(dropdown.visible).toBe(true);

      dropdown.dispatchEvent(new MouseEvent("mouseleave"));
      await waitForRender(80);

      dropdown.dispatchEvent(new MouseEvent("mouseenter"));
      await waitForRender(0);

      await waitForRender(200);
      expect(dropdown.visible).toBe(true);
    });
  });

  // ==================== Click 触发 ====================

  describe("Click Trigger", () => {
    it("click 触发时，点击 reference slot 应该切换显示状态", async () => {
      const dropdown = createDropdown(
        { trigger: "click" },
        `<span slot="reference">Trigger</span>
         <ea-dropdown-menu>
           <ea-dropdown-item>Item 1</ea-dropdown-item>
         </ea-dropdown-menu>`
      );
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.visible).toBe(false);

      const referenceSlot = dropdown.shadowRoot.querySelector(
        'slot[name="reference"]'
      );
      referenceSlot.dispatchEvent(new Event("click", { bubbles: true }));
      await waitForRender(0);

      expect(dropdown.visible).toBe(true);

      referenceSlot.dispatchEvent(new Event("click", { bubbles: true }));
      await waitForRender(0);

      expect(dropdown.visible).toBe(false);
    });
  });

  // ==================== Contextmenu 触发 ====================

  describe("Contextmenu Trigger", () => {
    it("contextmenu 触发时，右键应该切换显示状态", async () => {
      const dropdown = createDropdown(
        { trigger: "contextmenu" },
        withReference()
      );
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.visible).toBe(false);

      dropdown.dispatchEvent(
        new MouseEvent("contextmenu", { cancelable: true })
      );
      await waitForRender(0);

      expect(dropdown.visible).toBe(true);
    });

    it("contextmenu 触发时，右键事件应该被 preventDefault", async () => {
      const dropdown = createDropdown(
        { trigger: "contextmenu" },
        withReference()
      );
      container.appendChild(dropdown);
      await waitForRender();

      const event = new MouseEvent("contextmenu", { cancelable: true });
      dropdown.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
    });
  });

  // ==================== 容器类名 ====================

  describe("Container Classlist", () => {
    it("初始状态应该包含 placement 类名", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      const containerEl = dropdown.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.toString()).toContain("ea-popper--bottom");
    });

    it("show 时应该添加 is-show 状态类", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      dropdown.show();
      await waitForRender(0);

      const containerEl = dropdown.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-show")).toBe(true);
    });

    it("showArrow 为 true 时应该包含 show-arrow 状态类", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      const containerEl = dropdown.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-show-arrow")).toBe(true);
    });

    it("showArrow 为 false 时不应该包含 show-arrow 状态类", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();
      dropdown.showArrow = false;
      await waitForRender();

      const containerEl = dropdown.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-show-arrow")).toBe(false);
    });
  });

  // ==================== CSS 变量 ====================

  describe("CSS Variables", () => {
    it("设置 width 应该设置 --ea-popper-width CSS 变量", async () => {
      const dropdown = createDropdown({ width: "200" }, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.style.getPropertyValue("--ea-popper-width")).toBe(
        "200px"
      );
    });

    it("设置 offset 应该设置 --ea-popper-transform-x 和 --ea-popper-transform-y CSS 变量", async () => {
      const dropdown = createDropdown({ offset: "10 20" }, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.style.getPropertyValue("--ea-popper-transform-x")).toBe(
        "10px"
      );
      expect(dropdown.style.getPropertyValue("--ea-popper-transform-y")).toBe(
        "20px"
      );
    });
  });

  // ==================== 边界条件 ====================

  describe("Edge Cases", () => {
    it("空内容时应该正确处理", async () => {
      const dropdown = createDropdown();
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.shadowRoot).toBeTruthy();
    });

    it("没有 reference 时应该正确处理", async () => {
      const dropdown = createDropdown(
        {},
        `<ea-dropdown-menu>
           <ea-dropdown-item>Item 1</ea-dropdown-item>
         </ea-dropdown-menu>`
      );
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.shadowRoot).toBeTruthy();
    });

    it("没有 dropdown-menu 时应该正确处理", async () => {
      const dropdown = createDropdown(
        {},
        `<span slot="reference">Trigger</span>`
      );
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.shadowRoot).toBeTruthy();
    });

    it("连续调用 show 不应该出错", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      dropdown.show();
      await waitForRender(0);
      dropdown.show();
      await waitForRender(0);
      dropdown.show();
      await waitForRender(0);

      expect(dropdown.visible).toBe(true);
    });

    it("连续调用 hide 不应该出错", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      dropdown.hide();
      await waitForRender(0);
      dropdown.hide();
      await waitForRender(0);

      expect(dropdown.visible).toBe(false);
    });

    it("未 show 时调用 hide 不应该出错", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      dropdown.hide();
      await waitForRender(0);

      expect(dropdown.visible).toBe(false);
    });
  });

  // ==================== 生命周期 ====================

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(
        dropdown.shadowRoot.querySelector('slot[name="reference"]')
      ).toBeTruthy();
      expect(
        dropdown.shadowRoot.querySelector("slot:not([name])")
      ).toBeTruthy();
    });

    it("组件断开连接后应该清理资源", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(() => {
        dropdown.remove();
      }).not.toThrow();
    });

    it("应该继承 EaPopper 的功能", async () => {
      const dropdown = createDropdown({}, withReference());
      container.appendChild(dropdown);
      await waitForRender();

      expect(typeof dropdown.show).toBe("function");
      expect(typeof dropdown.hide).toBe("function");
      expect(typeof dropdown.toggle).toBe("function");
    });

    it("组件重新连接后应该重新初始化触发事件", async () => {
      const dropdown = createDropdown(
        { trigger: "click" },
        `<span slot="reference">Trigger</span>
         <ea-dropdown-menu>
           <ea-dropdown-item>Item 1</ea-dropdown-item>
         </ea-dropdown-menu>`
      );
      container.appendChild(dropdown);
      await waitForRender();

      dropdown.remove();
      container.appendChild(dropdown);
      await waitForRender();

      expect(dropdown.trigger).toBe("click");
    });
  });
});

// ==================== EaDropdownItem 组件 ====================

describe("EaDropdownItem Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  // ==================== 基础渲染 ====================

  describe("Basic Rendering", () => {
    it("应该正确渲染组件并包含 shadowRoot", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      expect(item.shadowRoot).toBeTruthy();
    });

    it("应该渲染 .ea-dropdown-item 容器", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      expect(item.shadowRoot.querySelector(".ea-dropdown-item")).toBeTruthy();
    });

    it("应该渲染 .ea-dropdown-item__divider 元素", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      expect(
        item.shadowRoot.querySelector(".ea-dropdown-item__divider")
      ).toBeTruthy();
    });

    it("应该渲染 .ea-dropdown-item__content 元素", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      expect(
        item.shadowRoot.querySelector(".ea-dropdown-item__content")
      ).toBeTruthy();
    });

    it("应该渲染默认 slot", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      const slot = item.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  // ==================== CSS Parts ====================

  describe("CSS Parts", () => {
    it("应该支持 container part", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      expect(item.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该支持 divider part", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      expect(item.shadowRoot.querySelector('[part="divider"]')).toBeTruthy();
    });

    it("应该支持 content part", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      expect(item.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });
  });

  // ==================== disabled 属性 ====================

  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      expect(item.disabled).toBe(false);
    });

    it("设置 disabled 属性应该生效", async () => {
      const item = createDropdownItem({ disabled: "" });
      container.appendChild(item);
      await waitForRender();

      expect(item.disabled).toBe(true);
    });

    it("disabled 时应该设置 aria-disabled 属性", async () => {
      const item = createDropdownItem({ disabled: "" });
      container.appendChild(item);
      await waitForRender();

      expect(item.hasAttribute("aria-disabled")).toBe(true);
    });

    it("disabled 时容器应该包含 disabled 修饰符类名", async () => {
      const item = createDropdownItem({ disabled: "" });
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector(".ea-dropdown-item");
      expect(containerEl.classList.toString()).toContain(
        "ea-dropdown-item--disabled"
      );
    });

    it("动态修改 disabled 应该更新类名", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      item.disabled = true;
      await waitForRender(0);

      const containerEl = item.shadowRoot.querySelector(".ea-dropdown-item");
      expect(containerEl.classList.toString()).toContain(
        "ea-dropdown-item--disabled"
      );

      item.disabled = false;
      await waitForRender(0);

      expect(containerEl.classList.toString()).not.toContain(
        "ea-dropdown-item--disabled"
      );
    });
  });

  // ==================== divided 属性 ====================

  describe("Divided Attribute", () => {
    it("默认 divided 应该是 false", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      expect(item.divided).toBe(false);
    });

    it("设置 divided 属性应该生效", async () => {
      const item = createDropdownItem({ divided: "" });
      container.appendChild(item);
      await waitForRender();

      expect(item.divided).toBe(true);
    });

    it("divided 时容器应该包含 divided 状态类名", async () => {
      const item = createDropdownItem({ divided: "" });
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector(".ea-dropdown-item");
      expect(containerEl.classList.contains("is-divided")).toBe(true);
    });

    it("未 divided 时容器不应该包含 divided 状态类名", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector(".ea-dropdown-item");
      expect(containerEl.classList.contains("is-divided")).toBe(false);
    });

    it("动态修改 divided 应该更新类名", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      item.divided = true;
      await waitForRender(0);

      const containerEl = item.shadowRoot.querySelector(".ea-dropdown-item");
      expect(containerEl.classList.contains("is-divided")).toBe(true);

      item.divided = false;
      await waitForRender(0);

      expect(containerEl.classList.contains("is-divided")).toBe(false);
    });
  });

  // ==================== command 属性 ====================

  describe("Command Attribute", () => {
    it("默认 command 应该为空字符串", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      expect(item.command).toBe("");
    });

    it("设置 command 属性应该生效", async () => {
      const item = createDropdownItem({ command: "test-cmd" });
      container.appendChild(item);
      await waitForRender();

      expect(item.command).toBe("test-cmd");
    });

    it("动态修改 command 应该生效", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      item.command = "new-cmd";
      await waitForRender(0);

      expect(item.command).toBe("new-cmd");
    });
  });

  // ==================== 事件 ====================

  describe("Events", () => {
    it("点击应该触发 ea-dropdown-item-click 事件", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      const clickHandler = vi.fn();
      item.addEventListener("ea-dropdown-item-click", clickHandler);

      const content = item.shadowRoot.querySelector(
        ".ea-dropdown-item__content"
      );
      content.click();

      expect(clickHandler).toHaveBeenCalled();
    });

    it("点击设置了 command 的项应该触发 command 事件", async () => {
      const item = createDropdownItem({ command: "my-command" });
      container.appendChild(item);
      await waitForRender();

      const commandHandler = vi.fn();
      item.addEventListener("command", commandHandler);

      const content = item.shadowRoot.querySelector(
        ".ea-dropdown-item__content"
      );
      content.click();

      expect(commandHandler).toHaveBeenCalled();
      expect(commandHandler.mock.calls[0][0].detail.command).toBe("my-command");
    });

    it("没有 command 的项点击不应该触发 command 事件", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      const commandHandler = vi.fn();
      item.addEventListener("command", commandHandler);

      const content = item.shadowRoot.querySelector(
        ".ea-dropdown-item__content"
      );
      content.click();

      expect(commandHandler).not.toHaveBeenCalled();
    });

    it("禁用时点击不应该触发 ea-dropdown-item-click 事件", async () => {
      const item = createDropdownItem({ disabled: "" });
      container.appendChild(item);
      await waitForRender();

      const clickHandler = vi.fn();
      item.addEventListener("ea-dropdown-item-click", clickHandler);

      const content = item.shadowRoot.querySelector(
        ".ea-dropdown-item__content"
      );
      content.click();

      expect(clickHandler).not.toHaveBeenCalled();
    });

    it("禁用时点击不应该触发 command 事件", async () => {
      const item = createDropdownItem({ disabled: "", command: "test" });
      container.appendChild(item);
      await waitForRender();

      const commandHandler = vi.fn();
      item.addEventListener("command", commandHandler);

      const content = item.shadowRoot.querySelector(
        ".ea-dropdown-item__content"
      );
      content.click();

      expect(commandHandler).not.toHaveBeenCalled();
    });

    it("ea-dropdown-item-click 事件应该冒泡", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      const bubbleHandler = vi.fn();
      container.addEventListener("ea-dropdown-item-click", bubbleHandler);

      const content = item.shadowRoot.querySelector(
        ".ea-dropdown-item__content"
      );
      content.click();

      expect(bubbleHandler).toHaveBeenCalled();
    });

    it("command 事件应该冒泡", async () => {
      const item = createDropdownItem({ command: "test" });
      container.appendChild(item);
      await waitForRender();

      const bubbleHandler = vi.fn();
      container.addEventListener("command", bubbleHandler);

      const content = item.shadowRoot.querySelector(
        ".ea-dropdown-item__content"
      );
      content.click();

      expect(bubbleHandler).toHaveBeenCalled();
    });
  });

  // ==================== 容器类名组合 ====================

  describe("Container Classlist Combinations", () => {
    it("disabled + divided 应该同时包含两个类名", async () => {
      const item = createDropdownItem({ disabled: "", divided: "" });
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector(".ea-dropdown-item");
      expect(containerEl.classList.toString()).toContain(
        "ea-dropdown-item--disabled"
      );
      expect(containerEl.classList.contains("is-divided")).toBe(true);
    });

    it("无属性时应该只有基础类名", async () => {
      const item = createDropdownItem();
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector(".ea-dropdown-item");
      expect(containerEl.classList.contains("ea-dropdown-item")).toBe(true);
      expect(containerEl.classList.contains("is-divided")).toBe(false);
      expect(containerEl.classList.toString()).not.toContain(
        "ea-dropdown-item--disabled"
      );
    });
  });
});

// ==================== EaDropdownMenu 组件 ====================

describe("EaDropdownMenu Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  // ==================== 基础渲染 ====================

  describe("Basic Rendering", () => {
    it("应该正确渲染组件并包含 shadowRoot", async () => {
      const menu = createDropdownMenu();
      container.appendChild(menu);
      await waitForRender();

      expect(menu.shadowRoot).toBeTruthy();
    });

    it("应该渲染 .ea-dropdown-menu 容器", async () => {
      const menu = createDropdownMenu();
      container.appendChild(menu);
      await waitForRender();

      expect(menu.shadowRoot.querySelector(".ea-dropdown-menu")).toBeTruthy();
    });

    it("应该渲染默认 slot", async () => {
      const menu = createDropdownMenu();
      container.appendChild(menu);
      await waitForRender();

      const slot = menu.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  // ==================== CSS Parts ====================

  describe("CSS Parts", () => {
    it("应该支持 container part", async () => {
      const menu = createDropdownMenu();
      container.appendChild(menu);
      await waitForRender();

      expect(menu.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });
  });

  // ==================== 内容 ====================

  describe("Content", () => {
    it("应该正确渲染子菜单项", async () => {
      const menu = createDropdownMenu(`
        <ea-dropdown-item>Item 1</ea-dropdown-item>
        <ea-dropdown-item>Item 2</ea-dropdown-item>
        <ea-dropdown-item>Item 3</ea-dropdown-item>
      `);
      container.appendChild(menu);
      await waitForRender();

      const items = menu.querySelectorAll("ea-dropdown-item");
      expect(items.length).toBe(3);
    });

    it("空内容时应该正确处理", async () => {
      const menu = createDropdownMenu();
      container.appendChild(menu);
      await waitForRender();

      expect(menu.shadowRoot).toBeTruthy();
      expect(menu.shadowRoot.querySelector(".ea-dropdown-menu")).toBeTruthy();
    });

    it("应该支持嵌套多个菜单项", async () => {
      const menu = createDropdownMenu();
      for (let i = 0; i < 10; i++) {
        const item = createDropdownItem({}, `Item ${i}`);
        menu.appendChild(item);
      }
      container.appendChild(menu);
      await waitForRender();

      const items = menu.querySelectorAll("ea-dropdown-item");
      expect(items.length).toBe(10);
    });
  });
});

// ==================== 组件协作集成测试 ====================

describe("Integration Tests", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it("dropdown + dropdown-menu + dropdown-item 应该正确协作", async () => {
    const dropdown = createDropdown(
      {},
      `<span slot="reference">Trigger</span>
       <ea-dropdown-menu>
         <ea-dropdown-item command="action1">Action 1</ea-dropdown-item>
         <ea-dropdown-item command="action2">Action 2</ea-dropdown-item>
         <ea-dropdown-item divided command="action3">Action 3</ea-dropdown-item>
       </ea-dropdown-menu>`
    );
    container.appendChild(dropdown);
    await waitForRender();

    expect(dropdown.shadowRoot).toBeTruthy();
    expect(dropdown.querySelectorAll("ea-dropdown-item").length).toBe(3);
    expect(dropdown.querySelector("ea-dropdown-menu")).toBeTruthy();
  });

  it("点击 dropdown-item 的 command 事件应该冒泡到 dropdown", async () => {
    const dropdown = createDropdown(
      {},
      `<span slot="reference">Trigger</span>
       <ea-dropdown-menu>
         <ea-dropdown-item command="action1">Action 1</ea-dropdown-item>
       </ea-dropdown-menu>`
    );
    container.appendChild(dropdown);
    await waitForRender();

    const commandHandler = vi.fn();
    dropdown.addEventListener("command", commandHandler);

    const item = dropdown.querySelector("ea-dropdown-item");
    const content = item.shadowRoot.querySelector(".ea-dropdown-item__content");
    content.click();

    expect(commandHandler).toHaveBeenCalled();
    expect(commandHandler.mock.calls[0][0].detail.command).toBe("action1");
  });

  it("点击 dropdown-item 应该触发 ea-dropdown-item-click 并被 dropdown 捕获", async () => {
    const dropdown = createDropdown(
      {},
      `<span slot="reference">Trigger</span>
       <ea-dropdown-menu>
         <ea-dropdown-item>Item 1</ea-dropdown-item>
       </ea-dropdown-menu>`
    );
    container.appendChild(dropdown);
    await waitForRender();

    dropdown.show();
    await waitForRender(0);
    expect(dropdown.visible).toBe(true);

    const item = dropdown.querySelector("ea-dropdown-item");
    const content = item.shadowRoot.querySelector(".ea-dropdown-item__content");
    content.click();
    await waitForRender(0);

    expect(dropdown.visible).toBe(false);
  });

  it("多个 dropdown-item 应该各自独立触发 command 事件", async () => {
    const dropdown = createDropdown(
      {},
      `<span slot="reference">Trigger</span>
       <ea-dropdown-menu>
         <ea-dropdown-item command="cmd1">Item 1</ea-dropdown-item>
         <ea-dropdown-item command="cmd2">Item 2</ea-dropdown-item>
       </ea-dropdown-menu>`
    );
    container.appendChild(dropdown);
    await waitForRender();

    const commandHandler = vi.fn();
    dropdown.addEventListener("command", commandHandler);

    const items = dropdown.querySelectorAll("ea-dropdown-item");

    const content1 = items[0].shadowRoot.querySelector(
      ".ea-dropdown-item__content"
    );
    content1.click();
    expect(commandHandler).toHaveBeenCalledTimes(1);
    expect(commandHandler.mock.calls[0][0].detail.command).toBe("cmd1");

    const content2 = items[1].shadowRoot.querySelector(
      ".ea-dropdown-item__content"
    );
    content2.click();
    expect(commandHandler).toHaveBeenCalledTimes(2);
    expect(commandHandler.mock.calls[1][0].detail.command).toBe("cmd2");
  });

  it("disabled 的 dropdown-item 不应该影响其他 item", async () => {
    const dropdown = createDropdown(
      {},
      `<span slot="reference">Trigger</span>
       <ea-dropdown-menu>
         <ea-dropdown-item disabled command="disabled-cmd">Disabled</ea-dropdown-item>
         <ea-dropdown-item command="enabled-cmd">Enabled</ea-dropdown-item>
       </ea-dropdown-menu>`
    );
    container.appendChild(dropdown);
    await waitForRender();

    const commandHandler = vi.fn();
    dropdown.addEventListener("command", commandHandler);

    const items = dropdown.querySelectorAll("ea-dropdown-item");

    const disabledContent = items[0].shadowRoot.querySelector(
      ".ea-dropdown-item__content"
    );
    disabledContent.click();
    expect(commandHandler).not.toHaveBeenCalled();

    const enabledContent = items[1].shadowRoot.querySelector(
      ".ea-dropdown-item__content"
    );
    enabledContent.click();
    expect(commandHandler).toHaveBeenCalledTimes(1);
    expect(commandHandler.mock.calls[0][0].detail.command).toBe("enabled-cmd");
  });

  it("hideOnClick=false 时连续点击多个 item 不应该隐藏 dropdown", async () => {
    const dropdown = createDropdown(
      {},
      `<span slot="reference">Trigger</span>
       <ea-dropdown-menu>
         <ea-dropdown-item command="cmd1">Item 1</ea-dropdown-item>
         <ea-dropdown-item command="cmd2">Item 2</ea-dropdown-item>
       </ea-dropdown-menu>`
    );
    container.appendChild(dropdown);
    await waitForRender();
    dropdown.hideOnClick = false;
    await waitForRender();

    dropdown.show();
    await waitForRender(0);
    expect(dropdown.visible).toBe(true);

    const items = dropdown.querySelectorAll("ea-dropdown-item");
    const content1 = items[0].shadowRoot.querySelector(
      ".ea-dropdown-item__content"
    );
    content1.click();
    await waitForRender(0);

    expect(dropdown.visible).toBe(true);

    const content2 = items[1].shadowRoot.querySelector(
      ".ea-dropdown-item__content"
    );
    content2.click();
    await waitForRender(0);

    expect(dropdown.visible).toBe(true);
  });
});
