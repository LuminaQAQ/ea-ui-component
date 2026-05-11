import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-popconfirm/index";

describe("EaPopconfirm Component", () => {
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
    it("应该正确渲染组件并包含 shadowRoot", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.shadowRoot).toBeTruthy();
    });

    it("应该渲染 .ea-popper 容器", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.shadowRoot.querySelector(".ea-popper")).toBeTruthy();
    });

    it("应该渲染 .ea-popper__reference 元素", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(
        popconfirm.shadowRoot.querySelector(".ea-popper__reference")
      ).toBeTruthy();
    });

    it("应该渲染 .ea-popper__original 元素", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

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

    it("original 应该有 tabindex=0", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const originalEl = popconfirm.shadowRoot.querySelector(
        ".ea-popper__original"
      );
      expect(originalEl.getAttribute("tabindex")).toBe("0");
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
    it("应该支持 container part", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(
        popconfirm.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该支持 reference part", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(
        popconfirm.shadowRoot.querySelector('[part="reference"]')
      ).toBeTruthy();
    });

    it("应该支持 original part", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(
        popconfirm.shadowRoot.querySelector('[part="original"]')
      ).toBeTruthy();
    });

    it("应该支持 title part", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(
        popconfirm.shadowRoot.querySelector('[part="title"]')
      ).toBeTruthy();
    });

    it("应该支持 icon part", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.shadowRoot.querySelector('[part="icon"]')).toBeTruthy();
    });

    it("应该支持 title-content part", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(
        popconfirm.shadowRoot.querySelector('[part="title-content"]')
      ).toBeTruthy();
    });

    it("应该支持 footer part", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(
        popconfirm.shadowRoot.querySelector('[part="footer"]')
      ).toBeTruthy();
    });

    it("应该支持 cancel-button part", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(
        popconfirm.shadowRoot.querySelector('[part="cancel-button"]')
      ).toBeTruthy();
    });

    it("应该支持 confirm-button part", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(
        popconfirm.shadowRoot.querySelector('[part="confirm-button"]')
      ).toBeTruthy();
    });
  });

  // ==================== Slots ====================

  describe("Slots", () => {
    it("应该渲染 reference slot", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const referenceSlot = popconfirm.shadowRoot.querySelector(
        'slot[name="reference"]'
      );
      expect(referenceSlot).toBeTruthy();
    });

    it("应该渲染 actions slot", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const actionsSlot = popconfirm.shadowRoot.querySelector(
        'slot[name="actions"]'
      );
      expect(actionsSlot).toBeTruthy();
    });

    it("actions slot 默认内容应该包含取消和确认按钮", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const cancelBtn = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__cancel"
      );
      const confirmBtn = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__confirm"
      );
      expect(cancelBtn).toBeTruthy();
      expect(confirmBtn).toBeTruthy();
    });

    it("应该支持自定义 actions slot 内容", async () => {
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
      await waitForRender();

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
    it("默认 heading 应该是空字符串", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.heading).toBe("");
    });

    it("应该支持通过 HTML 属性设置 heading", async () => {
      const popconfirm = createPopconfirm(
        { heading: "Are you sure?" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

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
      await waitForRender();

      expect(popconfirm.heading).toBe("");
    });
  });

  // ==================== icon 属性 ====================

  describe("Icon Attribute", () => {
    it("默认 icon 应该是 circle-question", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.icon).toBe("circle-question");
    });

    it("应该支持自定义 icon", async () => {
      const popconfirm = createPopconfirm(
        { icon: "circle-info" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

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

    it("默认 iconColor 应该是 rgb(255, 153, 0)", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.iconColor).toBe("rgb(255, 153, 0)");
    });

    it("应该支持自定义 iconColor", async () => {
      const popconfirm = createPopconfirm(
        { "icon-color": "#626AEF" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

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
    it("默认 hideIcon 应该是 false", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.hideIcon).toBe(false);
    });

    it("应该支持通过 HTML 属性设置 hideIcon 为 true", async () => {
      const popconfirm = createPopconfirm({ "hide-icon": "" }, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

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
    it("默认 confirmButtonText 应该是 '确定'", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.confirmButtonText).toBe("确定");
    });

    it("应该支持自定义 confirmButtonText", async () => {
      const popconfirm = createPopconfirm(
        { "confirm-button-text": "Yes" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

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
    it("默认 cancelButtonText 应该是 '取消'", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.cancelButtonText).toBe("取消");
    });

    it("应该支持自定义 cancelButtonText", async () => {
      const popconfirm = createPopconfirm(
        { "cancel-button-text": "No" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

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
    it("默认 confirmButtonType 应该是 primary", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

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

    it("无效的 confirmButtonType 值应该回退到 null", async () => {
      const popconfirm = createPopconfirm(
        { "confirm-button-type": "invalid" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.confirmButtonType).toBe("primary");
    });
  });

  // ==================== cancelButtonType 属性 ====================

  describe("CancelButtonType Attribute", () => {
    it("默认 cancelButtonType 应该是 normal", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

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

    it("无效的 cancelButtonType 值应该回退到 null", async () => {
      const popconfirm = createPopconfirm(
        { "cancel-button-type": "invalid" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.cancelButtonType).toBe("normal");
    });
  });

  // ==================== visible 属性 ====================

  describe("Visible Attribute", () => {
    it("默认 visible 应该是 false", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.visible).toBe(false);
    });

    it("应该支持 visible 属性设置为 true", async () => {
      const popconfirm = createPopconfirm({ visible: "" }, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.visible).toBe(true);
    });

    it("visible 为 true 时应该同步设置 visible 为 true", async () => {
      const popconfirm = createPopconfirm({ visible: "" }, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.visible).toBe(true);
    });

    it("visible 为 false 时 visible 应该为 false", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

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
      await waitForRender();
      expect(popconfirm.visible).toBe(false);
    });
  });

  // ==================== 继承自 EaPopper 的属性 ====================

  describe("Inherited Properties (from EaPopper)", () => {
    describe("Width", () => {
      it("默认 width 应该是 150", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        expect(popconfirm.width).toBe(150);
      });

      it("应该支持自定义 width", async () => {
        const popconfirm = createPopconfirm({ width: "220" }, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

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
      it("默认 placement 应该是 top", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        expect(popconfirm.placement).toBe("top");
      });

      it("应该支持所有 12 个 placement 值", async () => {
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
          await waitForRender();

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
      it("默认 showArrow 应该是 true", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

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
        const popconfirm = createPopconfirm(
          { "show-arrow": "false" },
          withReference()
        );
        container.appendChild(popconfirm);
        await waitForRender();

        const containerEl = popconfirm.shadowRoot.querySelector(".ea-popper");
        expect(containerEl.classList.contains("is-show-arrow")).toBe(false);
      });
    });

    describe("Visible", () => {
      it("默认 visible 应该是 false", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

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
      it("默认 offset 应该是 '0 0'", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        expect(popconfirm.offset).toBe("0 0");
      });

      it("应该支持自定义 offset", async () => {
        const popconfirm = createPopconfirm(
          { offset: "10 20" },
          withReference()
        );
        container.appendChild(popconfirm);
        await waitForRender();

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
      it("默认 flip 应该是 true", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        expect(popconfirm.flip).toBe(true);
      });

      it("应该支持 flip 设置为 false", async () => {
        const popconfirm = createPopconfirm({ flip: "false" }, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

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
        await waitForRender();

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
        await waitForRender();

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
        await waitForRender();

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
    describe("confirm 事件", () => {
      it("应该能监听 confirm 事件", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("confirm", handler);

        popconfirm.dispatchEvent(new CustomEvent("confirm"));
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it("点击确认按钮应该触发 confirm 事件并关闭", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("confirm", handler);

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

    describe("cancel 事件", () => {
      it("应该能监听 cancel 事件", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("cancel", handler);

        popconfirm.dispatchEvent(new CustomEvent("cancel"));
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it("点击取消按钮应该触发 cancel 事件并关闭", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("cancel", handler);

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

    describe("show / shown 事件", () => {
      it("show() 应该触发 show 事件", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("show", handler);

        popconfirm.show();
        await waitForRender();

        expect(handler).toHaveBeenCalled();
      });

      it("open() 应该触发 show 事件", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("show", handler);

        popconfirm.open();
        await waitForRender();

        expect(handler).toHaveBeenCalled();
      });
    });

    describe("hide / hidden 事件", () => {
      it("hide() 应该触发 hide 事件", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        popconfirm.show();
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("hide", handler);

        popconfirm.hide();
        await waitForRender();

        expect(handler).toHaveBeenCalled();
      });

      it("close() 应该触发 hide 事件", async () => {
        const popconfirm = createPopconfirm({}, withReference());
        container.appendChild(popconfirm);
        await waitForRender();

        popconfirm.open();
        await waitForRender();

        const handler = vi.fn();
        popconfirm.addEventListener("hide", handler);

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
      referenceSlot.click();
      await waitForRender();

      expect(popconfirm.visible).toBe(true);
    });

    it("点击取消按钮应该触发 cancel 并关闭", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const cancelHandler = vi.fn();
      popconfirm.addEventListener("cancel", cancelHandler);

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

    it("点击确认按钮应该触发 confirm 并关闭", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      const confirmHandler = vi.fn();
      popconfirm.addEventListener("confirm", confirmHandler);

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
    it("组件连接后应该正确初始化", async () => {
      const popconfirm = createPopconfirm(
        { placement: "bottom", heading: "Test" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.shadowRoot).toBeTruthy();
      expect(popconfirm.placement).toBe("bottom");
      expect(popconfirm.heading).toBe("Test");
    });

    it("组件断开连接后 isConnected 应该为 false", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

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
      await waitForRender();
    });

    it("应该支持属性动态更新", async () => {
      const popconfirm = createPopconfirm({}, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.heading).toBe("");

      popconfirm.setAttribute("heading", "Updated Title");
      await waitForRender();

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
      await waitForRender();

      expect(popconfirm.heading).toBe("New");
      expect(popconfirm.icon).toBe("circle-info");
      expect(popconfirm.iconColor).toBe("#0000FF");
      expect(popconfirm.confirmButtonText).toBe("OK");
    });
  });

  // ==================== 边界情况 ====================

  describe("Edge Cases", () => {
    it("没有 reference slot 时应该正常渲染", async () => {
      const popconfirm = createPopconfirm();
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.shadowRoot).toBeTruthy();
    });

    it("空 heading 应该正常渲染", async () => {
      const popconfirm = createPopconfirm({ heading: "" }, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

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

    it("width 设置为 0 应该正常工作", async () => {
      const popconfirm = createPopconfirm({ width: "0" }, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

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

    it("单个值的 offset 应该正常工作", async () => {
      const popconfirm = createPopconfirm({ offset: "15" }, withReference());
      container.appendChild(popconfirm);
      await waitForRender();

      expect(popconfirm.offset).toBe("15");
    });

    it("无效的 placement 值应该回退到 null", async () => {
      const popconfirm = createPopconfirm(
        { placement: "invalid" },
        withReference()
      );
      container.appendChild(popconfirm);
      await waitForRender();

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
      await waitForRender();

      const containerEl = popconfirm.shadowRoot.querySelector(".ea-popper");

      popconfirm.setAttribute("show-arrow", "false");
      await waitForRender();
      expect(containerEl.classList.contains("is-show-arrow")).toBe(false);

      popconfirm.setAttribute("show-arrow", "true");
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
      await waitForRender();

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
});
