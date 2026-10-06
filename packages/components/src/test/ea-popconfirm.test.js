import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";
import { fireKeydown } from "./utils/keyboard.js";
import { runAxe, assertNoA11yViolations } from "./utils/a11y.js";

import "../components/ea-popconfirm/index";

describe("EaPopconfirm", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  function createPopconfirm(attrs = {}, innerHTML = "") {
    const el = document.createElement("ea-popconfirm");
    for (const [key, value] of Object.entries(attrs)) {
      el.setAttribute(key, value);
    }
    if (innerHTML) {
      el.innerHTML = innerHTML;
    }
    return el;
  }

  function withReference(innerHTML) {
    return innerHTML || `<button slot="reference">Delete</button>`;
  }

  // ==================== 基础渲染 ====================

  describe("Basic Rendering", () => {
    it("应该正确渲染组件并包含 shadowRoot", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.shadowRoot).toBeTruthy();
    });

    it("应该渲染 .ea-popper 容器", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.shadowRoot.querySelector(".ea-popper")).toBeTruthy();
    });

    it("应该渲染 .ea-popper__reference 元素", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(
        popconfirm.shadowRoot.querySelector(".ea-popper__reference")
      ).toBeTruthy();
    });

    it("应该渲染 .ea-popper__original 元素", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(
        popconfirm.shadowRoot.querySelector(".ea-popper__original")
      ).toBeTruthy();
    });

    it("container 应该有 tabindex=-1", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const containerEl = popconfirm.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.getAttribute("tabindex")).toBe("-1");
    });

    it("original 应该有 tabindex=-1", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const originalEl = popconfirm.shadowRoot.querySelector(
        ".ea-popper__original"
      );
      expect(originalEl.getAttribute("tabindex")).toBe("-1");
    });

    it("reference 应该有 tabindex=-1", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const referenceEl = popconfirm.shadowRoot.querySelector(
        ".ea-popper__reference"
      );
      expect(referenceEl.getAttribute("tabindex")).toBe("-1");
    });
  });

  // ==================== CSS Parts ====================

  describe("CSS Parts", () => {
    it("应该支持 container part", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(
        popconfirm.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该支持 reference part", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(
        popconfirm.shadowRoot.querySelector('[part="reference"]')
      ).toBeTruthy();
    });

    it("应该支持 original part", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(
        popconfirm.shadowRoot.querySelector('[part="original"]')
      ).toBeTruthy();
    });

    it("应该支持 title part", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(
        popconfirm.shadowRoot.querySelector('[part="title"]')
      ).toBeTruthy();
    });

    it("应该支持 icon part", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.shadowRoot.querySelector('[part="icon"]')).toBeTruthy();
    });

    it("应该支持 title-content part", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(
        popconfirm.shadowRoot.querySelector('[part="title-content"]')
      ).toBeTruthy();
    });

    it("应该支持 footer part", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(
        popconfirm.shadowRoot.querySelector('[part="footer"]')
      ).toBeTruthy();
    });

    it("应该支持 cancel-button part", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(
        popconfirm.shadowRoot.querySelector('[part="cancel-button"]')
      ).toBeTruthy();
    });

    it("应该支持 confirm-button part", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(
        popconfirm.shadowRoot.querySelector('[part="confirm-button"]')
      ).toBeTruthy();
    });
  });

  // ==================== Slots ====================

  describe("Slots", () => {
    it("应该渲染 reference slot", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      const referenceSlot = popconfirm.shadowRoot.querySelector(
        'slot[name="reference"]'
      );
      expect(referenceSlot).toBeTruthy();
    });

    it("应该渲染 actions slot", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      const actionsSlot = popconfirm.shadowRoot.querySelector(
        'slot[name="actions"]'
      );
      expect(actionsSlot).toBeTruthy();
    });

    it("actions slot 默认内容应该包含取消和确认按钮", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      const cancelBtn = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__cancel"
      );
      const confirmBtn = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__confirm"
      );
      expect(cancelBtn).toBeTruthy();
      expect(confirmBtn).toBeTruthy();
    });

    it("应该支持自定义 actions slot 内容", () => {
      const popconfirm = createPopconfirm(
        {},
        `
        <button slot="reference">Delete</button>
        <footer slot="actions">
          <button class="custom-cancel">No</button>
          <button class="custom-confirm">Yes</button>
        </footer>
      `
      );
      container.appendChild(popconfirm);
      const actionsSlot = popconfirm.shadowRoot.querySelector(
        'slot[name="actions"]'
      );
      expect(actionsSlot).toBeTruthy();

      const assigned = actionsSlot.assignedElements();
      expect(assigned.length).toBeGreaterThan(0);
    });
  });

  // ==================== heading 属性 ====================

  describe("Heading Attribute", () => {
    it("默认 heading 应该是空字符串", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.heading).toBe("");
    });

    it("应该支持通过 HTML 属性设置 heading", () => {
      const popconfirm = createPopconfirm(
        { heading: "Are you sure?" },
        withReference()
      );
      container.appendChild(popconfirm);
      expect(popconfirm.heading).toBe("Are you sure?");
    });

    it("heading 应该渲染到 title-content 中", async () => {
      const popconfirm = createPopconfirm(
        { heading: "Confirm delete?" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

      const titleContent = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__title-content"
      );
      expect(titleContent.innerText).toBe("Confirm delete?");
    });

    it("动态修改 heading 应该更新 DOM", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      popconfirm.setAttribute("heading", "New Title");
      await waitForRender();

      const titleContent = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__title-content"
      );
      expect(titleContent.innerText).toBe("New Title");
    });

    it("heading 设置为空字符串应该正常工作", async () => {
      const popconfirm = createPopconfirm({ heading: "test" }, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      popconfirm.setAttribute("heading", "");
      expect(popconfirm.heading).toBe("");
    });
  });

  // ==================== icon 属性 ====================

  describe("Icon Attribute", () => {
    it("默认 icon 应该是 circle-question", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.icon).toBe("circle-question");
    });

    it("应该支持自定义 icon", () => {
      const popconfirm = createPopconfirm(
        { icon: "circle-info" },
        withReference()
      );
      container.appendChild(popconfirm);
      expect(popconfirm.icon).toBe("circle-info");
    });

    it("icon 应该渲染 ea-icon 元素并设置 name 属性", async () => {
      const popconfirm = createPopconfirm(
        { icon: "circle-exclamation" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

      const iconEl = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__title ea-icon"
      );
      expect(iconEl).toBeTruthy();
      expect(iconEl.getAttribute("name")).toBe("circle-exclamation");
    });

    it("动态修改 icon 应该更新 ea-icon 的 name 属性", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      popconfirm.setAttribute("icon", "circle-check");
      await waitForRender();

      const iconEl = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__title ea-icon"
      );
      expect(iconEl.getAttribute("name")).toBe("circle-check");
    });
  });

  // ==================== iconColor 属性 ====================

  describe("IconColor Attribute", () => {
    let originalSupports;

    beforeEach(() => {
      if (!globalThis.CSS) {
        globalThis.CSS = {};
      }
      originalSupports = globalThis.CSS.supports;
      globalThis.CSS.supports = (prop, value) => {
        if (prop === "color") {
          return /^(#|rgb|hsl|rgba|hsla|\b(red|blue|green|white|black|yellow|orange|purple|pink|gray|grey|brown|cyan|magenta|teal|navy|maroon|olive|silver|lime|aqua|fuchsia|gold|indigo|ivory|khaki|lavender|plum|salmon|tan|tomato|violet|wheat)\b)/i.test(
            value
          );
        }
        return false;
      };
    });

    afterEach(() => {
      if (originalSupports) {
        globalThis.CSS.supports = originalSupports;
      } else {
        delete globalThis.CSS.supports;
      }
    });

    it("默认 iconColor 应该是 rgb(255, 153, 0)", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.iconColor).toBe("rgb(255, 153, 0)");
    });

    it("应该支持自定义 iconColor", () => {
      const popconfirm = createPopconfirm(
        { "icon-color": "#626AEF" },
        withReference()
      );
      container.appendChild(popconfirm);
      expect(popconfirm.iconColor).toBe("#626AEF");
    });

    it("iconColor 应该设置 CSS 变量 --ea-popconfirm-title-icon-color", async () => {
      const popconfirm = createPopconfirm(
        { "icon-color": "#FF0000" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

      expect(
        popconfirm.style.getPropertyValue("--ea-popconfirm-title-icon-color")
      ).toBe("#FF0000");
    });

    it("动态修改 iconColor 应该更新 CSS 变量", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      popconfirm.setAttribute("icon-color", "#00FF00");
      await waitForRender();

      expect(
        popconfirm.style.getPropertyValue("--ea-popconfirm-title-icon-color")
      ).toBe("#00FF00");
    });

    it("无效的颜色值应该输出警告", async () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      popconfirm.setAttribute("icon-color", "not-a-color");
      await waitForRender();

      expect(warnSpy).toHaveBeenCalled();

      warnSpy.mockRestore();
    });
  });

  // ==================== hideIcon 属性 ====================

  describe("HideIcon Attribute", () => {
    it("默认 hideIcon 应该是 false", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.hideIcon).toBe(false);
    });

    it("应该支持通过 HTML 属性设置 hideIcon 为 true", () => {
      const popconfirm = createPopconfirm({ "hide-icon": "" }, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.hideIcon).toBe(true);
    });

    it("hideIcon 为 true 时应该添加 is-icon-hidden 类", async () => {
      const popconfirm = createPopconfirm({ "hide-icon": "" }, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const containerEl = popconfirm.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-icon-hidden")).toBe(true);
    });

    it("hideIcon 为 false 时不应该有 is-icon-hidden 类", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const containerEl = popconfirm.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-icon-hidden")).toBe(false);
    });

    it("动态切换 hideIcon 应该更新类名", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const containerEl = popconfirm.shadowRoot.querySelector(".ea-popper");

      popconfirm.setAttribute("hide-icon", "");
      await waitForRender();
      expect(containerEl.classList.contains("is-icon-hidden")).toBe(true);

      popconfirm.removeAttribute("hide-icon");
      await waitForRender();
      expect(containerEl.classList.contains("is-icon-hidden")).toBe(false);
    });
  });

  // ==================== confirmButtonText 属性 ====================

  describe("ConfirmButtonText Attribute", () => {
    it("默认 confirmButtonText 应该是 '确定'", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.confirmButtonText).toBe("确定");
    });

    it("应该支持自定义 confirmButtonText", () => {
      const popconfirm = createPopconfirm(
        { "confirm-button-text": "Yes" },
        withReference()
      );
      container.appendChild(popconfirm);
      expect(popconfirm.confirmButtonText).toBe("Yes");
    });

    it("confirmButtonText 应该渲染到确认按钮中", async () => {
      const popconfirm = createPopconfirm(
        { "confirm-button-text": "Confirm" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

      const confirmBtn = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__confirm"
      );
      expect(confirmBtn.textContent).toBe("Confirm");
    });

    it("动态修改 confirmButtonText 应该更新按钮文字", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      popconfirm.setAttribute("confirm-button-text", "Sure");
      await waitForRender();

      const confirmBtn = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__confirm"
      );
      expect(confirmBtn.textContent).toBe("Sure");
    });
  });

  // ==================== cancelButtonText 属性 ====================

  describe("CancelButtonText Attribute", () => {
    it("默认 cancelButtonText 应该是 '取消'", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.cancelButtonText).toBe("取消");
    });

    it("应该支持自定义 cancelButtonText", () => {
      const popconfirm = createPopconfirm(
        { "cancel-button-text": "No" },
        withReference()
      );
      container.appendChild(popconfirm);
      expect(popconfirm.cancelButtonText).toBe("No");
    });

    it("cancelButtonText 应该渲染到取消按钮中", async () => {
      const popconfirm = createPopconfirm(
        { "cancel-button-text": "Cancel" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

      const cancelBtn = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__cancel"
      );
      expect(cancelBtn.textContent).toBe("Cancel");
    });

    it("动态修改 cancelButtonText 应该更新按钮文字", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      popconfirm.setAttribute("cancel-button-text", "Nope");
      await waitForRender();

      const cancelBtn = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__cancel"
      );
      expect(cancelBtn.textContent).toBe("Nope");
    });
  });

  // ==================== confirmButtonType 属性 ====================

  describe("ConfirmButtonType Attribute", () => {
    it("默认 confirmButtonType 应该是 primary", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.confirmButtonType).toBe("primary");
    });

    it("应该支持所有合法的 confirmButtonType 值", async () => {
      const types = ["normal", "primary", "success", "warning", "danger"];

      for (const type of types) {
        const popconfirm = createPopconfirm(
          { "confirm-button-type": type },
          withReference()
        );
        container.appendChild(popconfirm);
        await waitForRender();

        expect(popconfirm.confirmButtonType).toBe(type);

        const confirmBtn = popconfirm.shadowRoot.querySelector(
          ".ea-popconfirm__confirm"
        );
        expect(confirmBtn.getAttribute("variant")).toBe(type);

        container.removeChild(popconfirm);
      }
    });

    it("动态修改 confirmButtonType 应该更新按钮 variant", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      popconfirm.setAttribute("confirm-button-type", "danger");
      await waitForRender();

      const confirmBtn = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__confirm"
      );
      expect(confirmBtn.getAttribute("variant")).toBe("danger");
    });

    it("无效的 confirmButtonType 值应该回退到默认值", () => {
      const popconfirm = createPopconfirm(
        { "confirm-button-type": "invalid" },
        withReference()
      );
      container.appendChild(popconfirm);
      expect(popconfirm.confirmButtonType).toBe("primary");
    });
  });

  // ==================== cancelButtonType 属性 ====================

  describe("CancelButtonType Attribute", () => {
    it("默认 cancelButtonType 应该是 normal", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.cancelButtonType).toBe("normal");
    });

    it("应该支持所有合法的 cancelButtonType 值", async () => {
      const types = ["normal", "primary", "success", "warning", "danger"];

      for (const type of types) {
        const popconfirm = createPopconfirm(
          { "cancel-button-type": type },
          withReference()
        );
        container.appendChild(popconfirm);
        await waitForRender();

        expect(popconfirm.cancelButtonType).toBe(type);

        const cancelBtn = popconfirm.shadowRoot.querySelector(
          ".ea-popconfirm__cancel"
        );
        expect(cancelBtn.getAttribute("variant")).toBe(type);

        container.removeChild(popconfirm);
      }
    });

    it("动态修改 cancelButtonType 应该更新按钮 variant", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      popconfirm.setAttribute("cancel-button-type", "warning");
      await waitForRender();

      const cancelBtn = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__cancel"
      );
      expect(cancelBtn.getAttribute("variant")).toBe("warning");
    });

    it("无效的 cancelButtonType 值应该回退到默认值", () => {
      const popconfirm = createPopconfirm(
        { "cancel-button-type": "invalid" },
        withReference()
      );
      container.appendChild(popconfirm);
      expect(popconfirm.cancelButtonType).toBe("normal");
    });
  });

  // ==================== visible 属性 ====================

  describe("Visible Attribute", () => {
    it("默认 visible 应该是 false", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.visible).toBe(false);
    });

    it("应该支持 visible 属性设置为 true", () => {
      const popconfirm = createPopconfirm({ visible: "" }, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.visible).toBe(true);
    });

    it("visible 为 true 时应该同步设置 visible 为 true", () => {
      const popconfirm = createPopconfirm({ visible: "" }, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.visible).toBe(true);
    });

    it("visible 为 false 时 visible 应该为 false", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.visible).toBe(false);
    });

    it("动态修改 visible 应该同步 visible", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      popconfirm.setAttribute("visible", "");
      await waitForRender();
      expect(popconfirm.visible).toBe(true);

      popconfirm.removeAttribute("visible");
      expect(popconfirm.visible).toBe(false);
    });
  });

  // ==================== 继承自 EaPopper 的属性 ====================

  describe("Inherited Properties (from EaPopper)", () => {
    describe("Width", () => {
      it("默认 width 应该是 150", () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        expect(popconfirm.width).toBe(150);
      });

      it("应该支持自定义 width", () => {
        const popconfirm = createPopconfirm({ width: "220" }, withReference());
        container.appendChild(popconfirm);
        expect(popconfirm.width).toBe(220);
      });

      it("width 应该设置 CSS 变量 --ea-popper-width", async () => {
        const popconfirm = createPopconfirm({ width: "300" }, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        expect(popconfirm.style.getPropertyValue("--ea-popper-width")).toBe(
          "300px"
        );
      });
    });

    describe("Placement", () => {
      it("默认 placement 应该是 top", () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        expect(popconfirm.placement).toBe("top");
      });

      it("应该支持所有 12 个 placement 值", () => {
        const placements = [
          "top",
          "top-start",
          "top-end",
          "bottom",
          "bottom-start",
          "bottom-end",
          "left",
          "left-start",
          "left-end",
          "right",
          "right-start",
          "right-end",
        ];

        for (const placement of placements) {
          const popconfirm = createPopconfirm({ placement }, withReference());
          container.appendChild(popconfirm);
          expect(popconfirm.placement).toBe(placement);
          container.removeChild(popconfirm);
        }
      });

      it("placement 应该生成对应的 BEM 修饰符类名", async () => {
        const popconfirm = createPopconfirm(
          { placement: "bottom-start" },
          withReference()
        );
        container.appendChild(popconfirm);
        await waitForRender();

        const containerEl = popconfirm.shadowRoot.querySelector(".ea-popper");
        expect(containerEl.classList.contains("ea-popper--bottom-start")).toBe(
          true
        );
      });
    });

    describe("ShowArrow", () => {
      it("默认 showArrow 应该是 true", () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        expect(popconfirm.showArrow).toBe(true);
      });

      it("showArrow 为 true 时应该添加 is-show-arrow 类", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        const containerEl = popconfirm.shadowRoot.querySelector(".ea-popper");
        expect(containerEl.classList.contains("is-show-arrow")).toBe(true);
      });

      it("showArrow 为 false 时不应该有 is-show-arrow 类", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        popconfirm.showArrow = false;
        await waitForRender();

        const containerEl = popconfirm.shadowRoot.querySelector(".ea-popper");
        expect(containerEl.classList.contains("is-show-arrow")).toBe(false);
      });
    });

    describe("Visible", () => {
      it("默认 visible 应该是 false", () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        expect(popconfirm.visible).toBe(false);
      });

      it("visible 为 true 时应该添加 is-show 类", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        popconfirm.show();
        await waitForRender();

        const containerEl = popconfirm.shadowRoot.querySelector(".ea-popper");
        expect(containerEl.classList.contains("is-show")).toBe(true);
      });
    });

    describe("Offset", () => {
      it("默认 offset 应该是 '0 0'", () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        expect(popconfirm.offset).toBe("0 0");
      });

      it("应该支持自定义 offset", () => {
        const popconfirm = createPopconfirm(
          { offset: "10 20" },
          withReference()
        );
        container.appendChild(popconfirm);
        expect(popconfirm.offset).toBe("10 20");
      });

      it("offset 应该更新 CSS 变量", async () => {
        const popconfirm = createPopconfirm(
          { offset: "30 40" },
          withReference()
        );
        container.appendChild(popconfirm);
        await waitForRender();

        expect(
          popconfirm.style.getPropertyValue("--ea-popper-transform-x")
        ).toBe("30px");
        expect(
          popconfirm.style.getPropertyValue("--ea-popper-transform-y")
        ).toBe("40px");
      });
    });

    describe("Flip", () => {
      it("默认 flip 应该是 true", () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        expect(popconfirm.flip).toBe(true);
      });

      it("应该支持 flip 设置为 false", () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        popconfirm.flip = false;
        expect(popconfirm.flip).toBe(false);
      });
    });
  });

  // ==================== 方法 ====================

  describe("Methods", () => {
    describe("show()", () => {
      it("show() 应该设置 visible 为 true", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        popconfirm.show();
        expect(popconfirm.visible).toBe(true);
      });
    });

    describe("hide()", () => {
      it("hide() 应该设置 visible 为 false", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        popconfirm.show();
        expect(popconfirm.visible).toBe(true);

        popconfirm.hide();
        expect(popconfirm.visible).toBe(false);
      });
    });

    describe("toggle()", () => {
      it("toggle() 应该切换 visible", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        expect(popconfirm.visible).toBe(false);

        popconfirm.toggle();
        expect(popconfirm.visible).toBe(true);

        popconfirm.toggle();
        expect(popconfirm.visible).toBe(false);
      });
    });

    describe("open()", () => {
      it("open() 应该显示 popconfirm", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        expect(popconfirm.visible).toBe(false);

        popconfirm.open();
        expect(popconfirm.visible).toBe(true);
      });

      it("open() 应该注册 window click 监听来关闭", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        popconfirm.open();
        expect(popconfirm.visible).toBe(true);

        document.body.click();
        expect(popconfirm.visible).toBe(false);
      });

      it("点击 popconfirm 内部不应该关闭", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        popconfirm.open();
        expect(popconfirm.visible).toBe(true);

        const innerEl = popconfirm.shadowRoot.querySelector(
          ".ea-popper__original"
        );
        innerEl.click();
        expect(popconfirm.visible).toBe(true);
      });

      it("连续调用 open() 不应该出错", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        popconfirm.open();
        popconfirm.open();
        popconfirm.open();

        expect(popconfirm.visible).toBe(true);
      });
    });

    describe("close()", () => {
      it("close() 应该隐藏 popconfirm", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        popconfirm.open();
        expect(popconfirm.visible).toBe(true);

        popconfirm.close();
        expect(popconfirm.visible).toBe(false);
      });

      it("close() 应该清理 window click 监听", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        popconfirm.open();
        popconfirm.close();

        document.body.click();
        expect(popconfirm.visible).toBe(false);
      });

      it("在未打开状态下调用 close() 不应该出错", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        expect(() => popconfirm.close()).not.toThrow();
      });
    });
  });

  // ==================== 事件 ====================

  describe("Events", () => {
    describe("ea-confirm 事件", () => {
      it("应该能监听 ea-confirm 事件", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("ea-confirm", handler);

        popconfirm.dispatchEvent(new CustomEvent("ea-confirm"));
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it("点击确认按钮应该触发 ea-confirm 事件并关闭", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("ea-confirm", handler);

        popconfirm.open();
        await waitForRender();

        const confirmBtn = popconfirm.shadowRoot.querySelector(
          ".ea-popconfirm__confirm"
        );
        confirmBtn.click();
        await waitForRender();

        expect(handler).toHaveBeenCalledTimes(1);
        expect(popconfirm.visible).toBe(false);
      });
    });

    describe("ea-cancel 事件", () => {
      it("应该能监听 ea-cancel 事件", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("ea-cancel", handler);

        popconfirm.dispatchEvent(new CustomEvent("ea-cancel"));
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it("点击取消按钮应该触发 ea-cancel 事件并关闭", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("ea-cancel", handler);

        popconfirm.open();
        await waitForRender();

        const cancelBtn = popconfirm.shadowRoot.querySelector(
          ".ea-popconfirm__cancel"
        );
        cancelBtn.click();
        await waitForRender();

        expect(handler).toHaveBeenCalledTimes(1);
        expect(popconfirm.visible).toBe(false);
      });
    });

    describe("ea-show / ea-shown 事件", () => {
      it("show() 应该触发 ea-show 事件", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("ea-show", handler);

        popconfirm.show();
        await waitForRender();

        expect(handler).toHaveBeenCalled();
      });

      it("open() 应该触发 ea-show 事件", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("ea-show", handler);

        popconfirm.open();
        await waitForRender();

        expect(handler).toHaveBeenCalled();
      });
    });

    describe("ea-hide / ea-hidden 事件", () => {
      it("hide() 应该触发 ea-hide 事件", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        popconfirm.show();
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("ea-hide", handler);

        popconfirm.hide();
        await waitForRender();

        expect(handler).toHaveBeenCalled();
      });

      it("close() 应该触发 ea-hide 事件", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        popconfirm.open();
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("ea-hide", handler);

        popconfirm.close();
        await waitForRender();

        expect(handler).toHaveBeenCalled();
      });
    });
  });

  // ==================== 事件处理器 (@listen) ====================

  describe("Event Handlers (@listen)", () => {
    it("点击 reference slot 应该打开 popconfirm", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.visible).toBe(false);

      const referenceSlot = popconfirm.shadowRoot.querySelector(
        'slot[name="reference"]'
      );
      referenceSlot.dispatchEvent(
        new MouseEvent("click", { detail: 1, bubbles: true })
      );
      expect(popconfirm.visible).toBe(true);
    });

    it("点击取消按钮应该触发 ea-cancel 并关闭", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const cancelHandler = vi.fn();
      popconfirm.addEventListener("ea-cancel", cancelHandler);

      popconfirm.open();
      await waitForRender();

      const cancelBtn = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__cancel"
      );
      cancelBtn.click();
      await waitForRender();

      expect(cancelHandler).toHaveBeenCalledTimes(1);
      expect(popconfirm.visible).toBe(false);
    });

    it("点击确认按钮应该触发 ea-confirm 并关闭", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const confirmHandler = vi.fn();
      popconfirm.addEventListener("ea-confirm", confirmHandler);

      popconfirm.open();
      await waitForRender();

      const confirmBtn = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__confirm"
      );
      confirmBtn.click();
      await waitForRender();

      expect(confirmHandler).toHaveBeenCalledTimes(1);
      expect(popconfirm.visible).toBe(false);
    });
  });

  // ==================== 生命周期 ====================

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", () => {
      const popconfirm = createPopconfirm(
        { placement: "bottom", heading: "Test" },
        withReference()
      );
      container.appendChild(popconfirm);
      expect(popconfirm.shadowRoot).toBeTruthy();
      expect(popconfirm.placement).toBe("bottom");
      expect(popconfirm.heading).toBe("Test");
    });

    it("组件断开连接后 isConnected 应该为 false", () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      popconfirm.remove();
      expect(popconfirm.isConnected).toBe(false);
    });

    it("组件移除时应该清理全局关闭监听", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      popconfirm.open();
      expect(popconfirm.visible).toBe(true);

      popconfirm.remove();

      document.body.click();
    });

    it("应该支持属性动态更新", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.heading).toBe("");

      popconfirm.setAttribute("heading", "Updated Title");
      expect(popconfirm.heading).toBe("Updated Title");
    });

    it("多个属性同时更新应该正常工作", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      popconfirm.setAttribute("heading", "New");
      popconfirm.setAttribute("icon", "circle-info");
      popconfirm.setAttribute("icon-color", "#0000FF");
      popconfirm.setAttribute("confirm-button-text", "OK");
      expect(popconfirm.heading).toBe("New");
      expect(popconfirm.icon).toBe("circle-info");
      expect(popconfirm.iconColor).toBe("#0000FF");
      expect(popconfirm.confirmButtonText).toBe("OK");
    });
  });

  // ==================== 边界情况 ====================

  describe("Edge Cases", () => {
    it("没有 reference slot 时应该正常渲染", () => {
      const popconfirm = createPopconfirm();
      container.appendChild(popconfirm);
      expect(popconfirm.shadowRoot).toBeTruthy();
    });

    it("空 heading 应该正常渲染", () => {
      const popconfirm = createPopconfirm({ heading: "" }, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.heading).toBe("");
    });

    it("没有 reference slot 时 open() 不应该出错", async () => {
      const popconfirm = createPopconfirm();
      container.appendChild(popconfirm);
      await waitForRender();

      expect(() => popconfirm.open()).not.toThrow();
    });

    it("没有 reference slot 时 close() 不应该出错", async () => {
      const popconfirm = createPopconfirm();
      container.appendChild(popconfirm);
      await waitForRender();

      expect(() => popconfirm.close()).not.toThrow();
    });

    it("快速连续 open/close 不应该出错", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      for (let i = 0; i < 5; i++) {
        popconfirm.open();
        popconfirm.close();
      }

      expect(popconfirm.visible).toBe(false);
    });

    it("width 设置为 0 应该正常工作", () => {
      const popconfirm = createPopconfirm({ width: "0" }, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.width).toBe(0);
    });

    it("应该处理负数 offset", async () => {
      const popconfirm = createPopconfirm(
        { offset: "-10 -20" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.style.getPropertyValue("--ea-popper-transform-x")).toBe(
        "-10px"
      );
      expect(popconfirm.style.getPropertyValue("--ea-popper-transform-y")).toBe(
        "-20px"
      );
    });

    it("单个值的 offset 应该正常工作", () => {
      const popconfirm = createPopconfirm({ offset: "15" }, withReference());
      container.appendChild(popconfirm);
      expect(popconfirm.offset).toBe("15");
    });

    it("无效的 placement 值应该回退到默认值", () => {
      const popconfirm = createPopconfirm(
        { placement: "invalid" },
        withReference()
      );
      container.appendChild(popconfirm);
      expect(popconfirm.placement).toBe("top");
    });

    it("无效的 offset 值应该输出错误", async () => {
      const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      const popconfirm = createPopconfirm(
        { offset: "invalid" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

      expect(errorSpy).toHaveBeenCalled();

      errorSpy.mockRestore();
    });

    it("showArrow 从 true 切换到 false 再切回 true", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      const containerEl = popconfirm.shadowRoot.querySelector(".ea-popper");

      popconfirm.showArrow = false;
      await waitForRender();
      expect(containerEl.classList.contains("is-show-arrow")).toBe(false);

      popconfirm.showArrow = true;
      await waitForRender();
      expect(containerEl.classList.contains("is-show-arrow")).toBe(true);
    });

    it("placement 变化应该更新 className", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const containerEl = popconfirm.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("ea-popper--top")).toBe(true);

      popconfirm.placement = "bottom";
      await waitForRender();

      expect(containerEl.classList.contains("ea-popper--top")).toBe(false);
      expect(containerEl.classList.contains("ea-popper--bottom")).toBe(true);
    });

    it("width 动态变化应该更新 CSS 变量", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      popconfirm.width = 300;
      await waitForRender();

      expect(popconfirm.style.getPropertyValue("--ea-popper-width")).toBe(
        "300px"
      );
    });

    it("visible 变化时应该触发对应的过渡类名", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const containerEl = popconfirm.shadowRoot.querySelector(".ea-popper");

      popconfirm.show();
      await waitForRender();
      expect(containerEl.classList.contains("is-show")).toBe(true);

      popconfirm.hide();
      await waitForRender();
      expect(containerEl.classList.contains("is-before-hide")).toBe(true);
    });

    it("toggle 连续调用应该正确切换", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      popconfirm.toggle();
      expect(popconfirm.visible).toBe(true);

      popconfirm.toggle();
      expect(popconfirm.visible).toBe(false);

      popconfirm.toggle();
      expect(popconfirm.visible).toBe(true);
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-popconfirm");
      el.setAttribute("heading", "Are you sure?");
      el.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el, {
        rules: { "aria-valid-attr-value": { enabled: false } },
      });
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("触发元素应该有 aria-haspopup='alertdialog'", async () => {
        const el = document.createElement("ea-popconfirm");
        el.setAttribute("heading", "Are you sure?");
        el.innerHTML = `<button slot="reference">Delete</button>`;
        container.appendChild(el);
        await waitForRender();
        const trigger = el.querySelector('[slot="reference"]');
        expect(trigger.getAttribute("aria-haspopup")).toBe("alertdialog");
      });

      it("弹出层应该有 role='alertdialog'", async () => {
        const el = document.createElement("ea-popconfirm");
        el.setAttribute("heading", "Are you sure?");
        el.innerHTML = `<button slot="reference">Delete</button>`;
        container.appendChild(el);
        await waitForRender();
        const popper = el.shadowRoot.querySelector('[part="original"]');
        expect(popper.getAttribute("role")).toBe("alertdialog");
      });

      it("触发元素应该有 aria-expanded 属性", async () => {
        const el = document.createElement("ea-popconfirm");
        el.setAttribute("heading", "Are you sure?");
        el.innerHTML = `<button slot="reference">Delete</button>`;
        container.appendChild(el);
        await waitForRender();
        const trigger = el.querySelector('[slot="reference"]');
        expect(trigger.hasAttribute("aria-expanded")).toBe(true);
      });
    });
  });
});

describe("EaPopconfirm Keyboard And Focus", () => {
  let container;

  function createPopconfirm(innerHTML) {
    const el = document.createElement("ea-popconfirm");
    el.innerHTML = innerHTML;
    container.appendChild(el);
    return el;
  }

  const withReference = (extra = "") =>
    `<button slot="reference">Delete</button>${extra}`;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Trigger Keyboard Activation", () => {
    it("触发元素按 Enter 应该打开", async () => {
      const popconfirm = createPopconfirm(withReference());
      await waitForRender();

      const trigger = popconfirm.querySelector('[slot="reference"]');
      const event = fireKeydown(trigger, "Enter");

      expect(event.defaultPrevented).toBe(true);
      expect(popconfirm.visible).toBe(true);
    });

    it("触发元素按空格应该打开", async () => {
      const popconfirm = createPopconfirm(withReference());
      await waitForRender();

      const trigger = popconfirm.querySelector('[slot="reference"]');
      fireKeydown(trigger, " ");

      expect(popconfirm.visible).toBe(true);
    });

    it("已打开时按 Enter 应该关闭", async () => {
      const popconfirm = createPopconfirm(withReference());
      await waitForRender();

      const trigger = popconfirm.querySelector('[slot="reference"]');
      fireKeydown(trigger, "Enter");
      expect(popconfirm.visible).toBe(true);

      fireKeydown(trigger, "Enter");
      expect(popconfirm.visible).toBe(false);
    });

    it("触发元素上的其他按键不应该有影响", async () => {
      const popconfirm = createPopconfirm(withReference());
      await waitForRender();

      const trigger = popconfirm.querySelector('[slot="reference"]');
      const event = fireKeydown(trigger, "a");

      expect(popconfirm.visible).toBe(false);
      expect(event.defaultPrevented).toBe(false);
    });
  });

  describe("Content Keyboard Interaction", () => {
    it("内容区按 Escape 应该关闭并聚焦触发元素", async () => {
      const popconfirm = createPopconfirm(
        withReference(`<button slot="actions" class="a">A</button>`)
      );
      await waitForRender();

      popconfirm.open();
      await waitForRender();

      const trigger = popconfirm.querySelector('[slot="reference"]');
      const event = fireKeydown(popconfirm.querySelector(".a"), "Escape");

      expect(event.defaultPrevented).toBe(true);
      expect(popconfirm.visible).toBe(false);
      expect(document.activeElement).toBe(trigger);
    });

    it("内容区最后一个元素按 Tab 应该循环到第一个元素", async () => {
      const popconfirm = createPopconfirm(
        withReference(
          `<button slot="actions" class="a">A</button><button slot="actions" class="b">B</button>`
        )
      );
      await waitForRender();

      popconfirm.open();
      await waitForRender();

      const event = fireKeydown(popconfirm.querySelector(".b"), "Tab");

      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(popconfirm.querySelector(".a"));
    });

    it("内容区第一个元素按 Shift+Tab 应该循环到最后一个元素", async () => {
      const popconfirm = createPopconfirm(
        withReference(
          `<button slot="actions" class="a">A</button><button slot="actions" class="b">B</button>`
        )
      );
      await waitForRender();

      popconfirm.open();
      await waitForRender();

      const event = fireKeydown(popconfirm.querySelector(".a"), "Tab", {
        shiftKey: true,
      });

      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(popconfirm.querySelector(".b"));
    });

    it("内容区中间元素按 Tab 不应该被拦截", async () => {
      const popconfirm = createPopconfirm(
        withReference(
          `<button slot="actions" class="a">A</button><button slot="actions" class="b">B</button><button slot="actions" class="c">C</button>`
        )
      );
      await waitForRender();

      popconfirm.open();
      await waitForRender();

      const event = fireKeydown(popconfirm.querySelector(".b"), "Tab");

      expect(event.defaultPrevented).toBe(false);
    });

    it("内容区没有可聚焦元素时 Tab 不做处理", async () => {
      const popconfirm = createPopconfirm(withReference());
      await waitForRender();

      popconfirm.open();
      await waitForRender();

      const event = fireKeydown(popconfirm, "Tab");

      expect(event.defaultPrevented).toBe(false);
    });

    it("被禁用的内容元素不应该参与焦点循环", async () => {
      const popconfirm = createPopconfirm(
        withReference(`<button slot="actions" class="d" disabled>D</button>`)
      );
      await waitForRender();

      popconfirm.open();
      await waitForRender();

      const event = fireKeydown(popconfirm.querySelector(".d"), "Tab");

      expect(event.defaultPrevented).toBe(false);
    });
  });

  describe("Keyboard Activation Focus Management", () => {
    it("键盘激活后应该聚焦内容区第一个可聚焦元素", async () => {
      const popconfirm = createPopconfirm(
        withReference(`<button slot="actions" class="first">F</button>`)
      );
      await waitForRender();

      const trigger = popconfirm.querySelector('[slot="reference"]');
      fireKeydown(trigger, "Enter");
      await waitForRender();

      expect(document.activeElement).toBe(popconfirm.querySelector(".first"));
    });

    it("内容区没有可聚焦元素时应该聚焦原始内容容器", async () => {
      const popconfirm = createPopconfirm(withReference());
      await waitForRender();

      const trigger = popconfirm.querySelector('[slot="reference"]');
      fireKeydown(trigger, "Enter");
      await waitForRender();

      const original = popconfirm.shadowRoot.querySelector('[part="original"]');
      const focused =
        popconfirm.shadowRoot.activeElement ?? document.activeElement;

      expect(original.tabIndex).toBe(0);
      expect([popconfirm, original]).toContain(focused);
    });

    it("自定义元素内容应该聚焦其 Shadow DOM 内的可聚焦元素", async () => {
      const popconfirm = createPopconfirm(
        withReference(`<ea-button slot="actions" class="btn">OK</ea-button>`)
      );
      await waitForRender();

      const trigger = popconfirm.querySelector('[slot="reference"]');
      fireKeydown(trigger, "Enter");
      await waitForRender();

      const btn = popconfirm.querySelector(".btn");
      const inner = btn.shadowRoot.querySelector("button");
      const focused = btn.shadowRoot.activeElement ?? document.activeElement;

      expect(inner).toBeTruthy();
      expect([btn, inner]).toContain(focused);
    });

    it("鼠标打开不应该自动移动焦点", async () => {
      const popconfirm = createPopconfirm(
        withReference(`<button slot="actions" class="first">F</button>`)
      );
      await waitForRender();

      popconfirm.open();
      await waitForRender();

      expect(document.activeElement).not.toBe(
        popconfirm.querySelector(".first")
      );
    });
  });

  describe("Focusout Handling", () => {
    it("焦点移出组件时应该关闭", async () => {
      const popconfirm = createPopconfirm(
        withReference(`<button slot="actions" class="a">A</button>`)
      );
      await waitForRender();

      popconfirm.open();
      await waitForRender();

      popconfirm.dispatchEvent(
        new FocusEvent("focusout", { bubbles: true, composed: true })
      );
      await waitForRender();

      expect(popconfirm.visible).toBe(false);
    });

    it("焦点仍在组件内部时不应该关闭", async () => {
      const popconfirm = createPopconfirm(
        withReference(`<button slot="actions" class="a">A</button>`)
      );
      await waitForRender();

      popconfirm.open();
      await waitForRender();

      popconfirm.querySelector(".a").focus();
      popconfirm.dispatchEvent(
        new FocusEvent("focusout", { bubbles: true, composed: true })
      );
      await waitForRender();

      expect(popconfirm.visible).toBe(true);
    });

    it("隐藏状态下焦点移出不应该有副作用", async () => {
      const popconfirm = createPopconfirm(withReference());
      await waitForRender();

      popconfirm.dispatchEvent(
        new FocusEvent("focusout", { bubbles: true, composed: true })
      );
      await waitForRender();

      expect(popconfirm.visible).toBe(false);
    });
  });

  describe("Reference Interactions", () => {
    it("detail 为 0 的点击不应该打开", async () => {
      const popconfirm = createPopconfirm(withReference());
      await waitForRender();

      const referenceSlot = popconfirm.shadowRoot.querySelector(
        'slot[name="reference"]'
      );
      referenceSlot.dispatchEvent(
        new MouseEvent("click", { detail: 0, bubbles: true })
      );

      expect(popconfirm.visible).toBe(false);
    });

    it("点击外部应该关闭", async () => {
      const popconfirm = createPopconfirm(withReference());
      await waitForRender();

      popconfirm.open();
      await waitForRender();
      expect(popconfirm.visible).toBe(true);

      const outside = document.createElement("button");
      container.appendChild(outside);
      outside.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(popconfirm.visible).toBe(false);
    });

    it("关闭后全局点击监听应该被清理", async () => {
      const popconfirm = createPopconfirm(withReference());
      await waitForRender();

      popconfirm.open();
      await waitForRender();
      popconfirm.close();

      const outside = document.createElement("button");
      container.appendChild(outside);
      outside.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(popconfirm.visible).toBe(false);
    });
  });

  describe("Trigger Accessibility Setup", () => {
    it("非原生可聚焦触发元素应该补充 tabindex 和 role", async () => {
      const popconfirm = createPopconfirm(
        `<span slot="reference">Delete</span>`
      );
      await waitForRender();

      const trigger = popconfirm.querySelector('[slot="reference"]');
      expect(trigger.getAttribute("tabindex")).toBe("0");
      expect(trigger.getAttribute("role")).toBe("button");
    });

    it("自带 tabindex 的触发元素不应该补充 role", async () => {
      const popconfirm = createPopconfirm(
        `<div slot="reference" tabindex="0">Delete</div>`
      );
      await waitForRender();

      const trigger = popconfirm.querySelector('[slot="reference"]');
      expect(trigger.hasAttribute("role")).toBe(false);
    });
  });
});
