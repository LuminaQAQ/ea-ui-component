import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

import "../components/ea-message-box/index";
import { EaMessageBox } from "../components/ea-message-box/utils/EaMessageBoxInstance";

describe("EaMessageBox Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    document.querySelectorAll("ea-message-box").forEach(el => el.remove());
    vi.useRealTimers();
  });

  function createMessageBox(attrs = {}) {
    const messageBox = document.createElement("ea-message-box");
    for (const [key, value] of Object.entries(attrs)) {
      if (value === true) {
        messageBox.setAttribute(key, "");
      } else if (value !== false && value !== undefined && value !== null) {
        messageBox.setAttribute(key, String(value));
      }
    }
    container.appendChild(messageBox);
    return messageBox;
  }

  function dispatchTransitionEnd(el) {
    const overlayEl = el.shadowRoot.querySelector(".ea-overlay");
    if (overlayEl) {
      overlayEl.dispatchEvent(new Event("transitionend", { bubbles: true }));
    }
  }

  // ==================== 基本渲染测试 ====================

  describe("Basic Rendering", () => {
    it("should render component with shadowRoot", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.shadowRoot).toBeTruthy();
    });

    it("should render overlay container", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.shadowRoot.querySelector(".ea-overlay")).toBeTruthy();
    });

    it("should render mask layer", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(
        messageBox.shadowRoot.querySelector(".ea-overlay__mask")
      ).toBeTruthy();
    });

    it("should render overlay content container", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(
        messageBox.shadowRoot.querySelector(".ea-overlay__content")
      ).toBeTruthy();
    });

    it("should render message-box-main body", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(
        messageBox.shadowRoot.querySelector(".ea-message-box-main")
      ).toBeTruthy();
    });

    it("should render header area", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(
        messageBox.shadowRoot.querySelector(".ea-message-box-main__header")
      ).toBeTruthy();
    });

    it("should render title-container area", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(
        messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__title-container"
        )
      ).toBeTruthy();
    });

    it("should render type-icon as ea-icon element", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const typeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__type-icon"
      );
      expect(typeIcon).toBeTruthy();
      expect(typeIcon.tagName.toLowerCase()).toBe("ea-icon");
    });

    it("should render title element", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(
        messageBox.shadowRoot.querySelector(".ea-message-box-main__title")
      ).toBeTruthy();
    });

    it("should render close-icon as ea-icon with default name xmark", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const closeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__icon-close"
      );
      expect(closeIcon).toBeTruthy();
      expect(closeIcon.tagName.toLowerCase()).toBe("ea-icon");
      expect(closeIcon.getAttribute("name")).toBe("xmark");
    });

    it("should render content area", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(
        messageBox.shadowRoot.querySelector(".ea-message-box-main__content")
      ).toBeTruthy();
    });

    it("should render description area", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(
        messageBox.shadowRoot.querySelector(".ea-message-box-main__description")
      ).toBeTruthy();
    });

    it("should render input as ea-input element", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const input = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__input"
      );
      expect(input).toBeTruthy();
      expect(input.tagName.toLowerCase()).toBe("ea-input");
    });

    it("should render invalid-message area", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(
        messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__invalid-message"
        )
      ).toBeTruthy();
    });

    it("should render footer area", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(
        messageBox.shadowRoot.querySelector(".ea-message-box-main__footer")
      ).toBeTruthy();
    });

    it("should render cancel-button as ea-button element", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      expect(cancelBtn).toBeTruthy();
      expect(cancelBtn.tagName.toLowerCase()).toBe("ea-button");
    });

    it("should render confirm-button as ea-button with variant primary", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      expect(confirmBtn).toBeTruthy();
      expect(confirmBtn.tagName.toLowerCase()).toBe("ea-button");
      expect(confirmBtn.getAttribute("variant")).toBe("primary");
    });

    it("confirm button default text should be OK", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      expect(confirmBtn.textContent).toBe("OK");
    });

    it("cancel button default text should be Cancel", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      expect(cancelBtn.textContent).toBe("Cancel");
    });
  });

  // ==================== CSS Parts 测试 ====================

  describe("CSS Parts", () => {
    const parts = [
      "container",
      "header",
      "title-wrap",
      "type-icon",
      "close-icon",
      "content",
      "description",
      "input",
      "invalid-message",
      "footer",
      "confirm-button",
      "cancel-button",
    ];

    parts.forEach(part => {
      it(`should expose ${part} CSS Part`, async () => {
        const messageBox = createMessageBox();
        await waitForRender();
        expect(
          messageBox.shadowRoot.querySelector(`[part="${part}"]`)
        ).toBeTruthy();
      });
    });
  });

  // ==================== BoxType 属性测试 ====================

  describe("BoxType Attribute", () => {
    it("default boxType should be personalized", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.boxType).toBe("personalized");
    });

    ["alert", "confirm", "prompt", "personalized"].forEach(boxType => {
      it(`should support boxType='${boxType}'`, async () => {
        const messageBox = createMessageBox({ "box-type": boxType });
        await waitForRender();
        expect(messageBox.boxType).toBe(boxType);
      });
    });

    ["alert", "confirm", "prompt", "personalized"].forEach(boxType => {
      it(`boxType='${boxType}' should generate is-${boxType}-box state class`, async () => {
        const messageBox = createMessageBox({ "box-type": boxType });
        await waitForRender();
        const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
        expect(overlayEl.classList.contains(`is-${boxType}-box`)).toBe(true);
      });
    });

    it("dynamically changing boxType should update class", async () => {
      const messageBox = createMessageBox({ "box-type": "alert" });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-alert-box")).toBe(true);

      messageBox.setAttribute("box-type", "confirm");
      await waitForRender();
      expect(overlayEl.classList.contains("is-alert-box")).toBe(false);
      expect(overlayEl.classList.contains("is-confirm-box")).toBe(true);
    });
  });

  // ==================== Heading 属性测试 ====================

  describe("Heading Attribute", () => {
    it("default heading should be empty string", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.heading).toBe("");
    });

    it("should support setting heading attribute", async () => {
      const messageBox = createMessageBox({ heading: "Test Title" });
      await waitForRender();
      expect(messageBox.heading).toBe("Test Title");
      const titleEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__title"
      );
      expect(titleEl.textContent).toBe("Test Title");
    });

    it("dynamically changing heading should update title text", async () => {
      const messageBox = createMessageBox({ heading: "Initial" });
      await waitForRender();
      messageBox.setAttribute("heading", "Updated");
      await waitForRender();
      const titleEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__title"
      );
      expect(titleEl.textContent).toBe("Updated");
    });

    it("setting heading via setAttribute should work correctly", async () => {
      const messageBox = createMessageBox();
      messageBox.setAttribute("heading", "Attr Title");
      container.appendChild(messageBox);
      await waitForRender();
      expect(messageBox.heading).toBe("Attr Title");
      const titleEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__title"
      );
      expect(titleEl.textContent).toBe("Attr Title");
    });
  });

  // ==================== Message 属性测试 ====================

  describe("Message Attribute", () => {
    it("default message should be empty string", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.message).toBe("");
    });

    it("should support setting message attribute", async () => {
      const messageBox = createMessageBox({ message: "Test Message" });
      await waitForRender();
      expect(messageBox.message).toBe("Test Message");
      const descEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__description"
      );
      expect(descEl.textContent).toBe("Test Message");
    });

    it("dynamically changing message should update content text", async () => {
      const messageBox = createMessageBox({ message: "Initial" });
      await waitForRender();
      messageBox.setAttribute("message", "Updated");
      await waitForRender();
      const descEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__description"
      );
      expect(descEl.textContent).toBe("Updated");
    });

    it("when dangerouslyUseHTMLString=true, message should render as HTML", async () => {
      const messageBox = createMessageBox({ message: "<b>Bold</b>" });
      messageBox.dangerouslyUseHTMLString = true;
      await waitForRender();
      messageBox.setAttribute("message", "<em>Italic</em>");
      await waitForRender();
      const descEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__description"
      );
      expect(descEl.innerHTML).toContain("<em>Italic</em>");
    });

    it("when dangerouslyUseHTMLString=false, message should render as plain text", async () => {
      const messageBox = createMessageBox({ message: "<b>Bold</b>" });
      await waitForRender();
      const descEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__description"
      );
      expect(descEl.textContent).toBe("<b>Bold</b>");
      expect(descEl.innerHTML).not.toContain("<b>");
    });

    it("default dangerouslyUseHTMLString should be false", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.dangerouslyUseHTMLString).toBe(false);
    });
  });

  // ==================== Variant 属性测试 ====================

  describe("Variant Attribute", () => {
    it("default variant should be empty string", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.variant).toBe("");
    });

    ["primary", "success", "warning", "error", "info"].forEach(variant => {
      it(`should support variant='${variant}'`, async () => {
        const messageBox = createMessageBox({ variant });
        await waitForRender();
        expect(messageBox.variant).toBe(variant);
      });
    });

    ["primary", "success", "warning", "error", "info"].forEach(variant => {
      it(`variant='${variant}' should generate ea-message-box--${variant} class`, async () => {
        const messageBox = createMessageBox({ variant });
        await waitForRender();
        const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
        expect(overlayEl.classList.contains(`ea-message-box--${variant}`)).toBe(
          true
        );
      });
    });

    it("dynamically changing variant should update class", async () => {
      const messageBox = createMessageBox({ variant: "success" });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-message-box--success")).toBe(
        true
      );

      messageBox.setAttribute("variant", "warning");
      await waitForRender();
      expect(overlayEl.classList.contains("ea-message-box--success")).toBe(
        false
      );
      expect(overlayEl.classList.contains("ea-message-box--warning")).toBe(
        true
      );
    });
  });

  // ==================== Variant 图标映射测试 ====================

  describe("Variant Icon Mapping", () => {
    const iconMap = {
      primary: "circle-info",
      success: "circle-check",
      warning: "triangle-exclamation",
      error: "circle-xmark",
      info: "circle-info",
    };

    Object.entries(iconMap).forEach(([variant, iconName]) => {
      it(`variant='${variant}' should auto-set icon to '${iconName}'`, async () => {
        const messageBox = createMessageBox({ variant });
        await waitForRender();
        expect(messageBox.icon).toBe(iconName);
        const typeIcon = messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__type-icon"
        );
        expect(typeIcon.getAttribute("name")).toBe(iconName);
      });
    });
  });

  // ==================== Icon 属性测试 ====================

  describe("Icon Attribute", () => {
    it("default icon should be empty string", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.icon).toBe("");
    });

    it("should support custom icon", async () => {
      const messageBox = createMessageBox({ icon: "custom-icon" });
      await waitForRender();
      const typeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__type-icon"
      );
      expect(typeIcon.getAttribute("name")).toBe("custom-icon");
    });

    it("dynamically changing icon should update icon element", async () => {
      const messageBox = createMessageBox({ icon: "icon-a" });
      await waitForRender();
      messageBox.setAttribute("icon", "icon-b");
      await waitForRender();
      const typeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__type-icon"
      );
      expect(typeIcon.getAttribute("name")).toBe("icon-b");
    });

    it("setting variant after icon should override icon with variant mapping", async () => {
      const messageBox = createMessageBox({ icon: "custom-icon" });
      await waitForRender();
      messageBox.setAttribute("variant", "success");
      await waitForRender();
      expect(messageBox.icon).toBe("circle-check");
      const typeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__type-icon"
      );
      expect(typeIcon.getAttribute("name")).toBe("circle-check");
    });
  });

  // ==================== CloseIcon 属性测试 ====================

  describe("CloseIcon Attribute", () => {
    it("default closeIcon should be xmark", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.closeIcon).toBe("xmark");
    });

    it("should support custom closeIcon", async () => {
      const messageBox = createMessageBox({ "close-icon": "cancel" });
      await waitForRender();
      expect(messageBox.closeIcon).toBe("cancel");
      const closeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__icon-close"
      );
      expect(closeIcon.getAttribute("name")).toBe("cancel");
    });

    it("dynamically changing closeIcon should update close icon element", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      messageBox.setAttribute("close-icon", "times");
      await waitForRender();
      const closeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__icon-close"
      );
      expect(closeIcon.getAttribute("name")).toBe("times");
    });
  });

  // ==================== Visible 属性测试 ====================

  describe("Visible Attribute", () => {
    it("default visible should be false", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.visible).toBe(false);
    });

    it("setting visible to true should show message box", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      expect(messageBox.visible).toBe(true);
    });

    it("visible=true should add ea-overlay--open class", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-overlay--open")).toBe(true);
    });

    it("visible=false should not add ea-overlay--open class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-overlay--open")).toBe(false);
    });

    it("show() method should set visible to true", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      messageBox.show();
      await waitForRender();
      expect(messageBox.visible).toBe(true);
    });

    it("hide() method should set visible to false", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      messageBox.hide();
      await waitForRender();
      expect(messageBox.visible).toBe(false);
    });
  });

  // ==================== ShowClose 属性测试 ====================

  describe("ShowClose Attribute", () => {
    it("default showClose should be true", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.showClose).toBe(true);
    });

    it("showClose=false should add is-close-hidden state class", async () => {
      const messageBox = createMessageBox({ "show-close": "false" });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-close-hidden")).toBe(true);
    });

    it("showClose=true should not add is-close-hidden state class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-close-hidden")).toBe(false);
    });

    it("dynamically changing showClose should update state class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-close-hidden")).toBe(false);
      messageBox.setAttribute("show-close", "false");
      await waitForRender();
      expect(overlayEl.classList.contains("is-close-hidden")).toBe(true);
    });
  });

  // ==================== ShowCancelButton 属性测试 ====================

  describe("ShowCancelButton Attribute", () => {
    it("default showCancelButton should be false", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.showCancelButton).toBe(false);
    });

    it("showCancelButton=false should add is-cancel-hidden state class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-cancel-hidden")).toBe(true);
    });

    it("showCancelButton=true should not add is-cancel-hidden state class", async () => {
      const messageBox = createMessageBox({ "show-cancel-button": true });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-cancel-hidden")).toBe(false);
    });

    it("dynamically changing showCancelButton should update state class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-cancel-hidden")).toBe(true);
      messageBox.setAttribute("show-cancel-button", "");
      await waitForRender();
      expect(overlayEl.classList.contains("is-cancel-hidden")).toBe(false);
    });
  });

  // ==================== ShowConfirmButton 属性测试 ====================

  describe("ShowConfirmButton Attribute", () => {
    it("default showConfirmButton should be true", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.showConfirmButton).toBe(true);
    });

    it("showConfirmButton=false should add is-confirm-hidden state class", async () => {
      const messageBox = createMessageBox({ "show-confirm-button": "false" });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-confirm-hidden")).toBe(true);
    });

    it("showConfirmButton=true should not add is-confirm-hidden state class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-confirm-hidden")).toBe(false);
    });

    it("dynamically changing showConfirmButton should update state class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-confirm-hidden")).toBe(false);
      messageBox.setAttribute("show-confirm-button", "false");
      await waitForRender();
      expect(overlayEl.classList.contains("is-confirm-hidden")).toBe(true);
    });
  });

  // ==================== ConfirmButtonText 属性测试 ====================

  describe("ConfirmButtonText Attribute", () => {
    it("default confirmButtonText should be OK", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.confirmButtonText).toBe("OK");
    });

    it("should support custom confirm button text", async () => {
      const messageBox = createMessageBox({ "confirm-button-text": "确定" });
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      expect(confirmBtn.textContent).toBe("确定");
    });

    it("dynamically changing confirmButtonText should update button text", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      messageBox.setAttribute("confirm-button-text", "Submit");
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      expect(confirmBtn.textContent).toBe("Submit");
    });
  });

  // ==================== CancelButtonText 属性测试 ====================

  describe("CancelButtonText Attribute", () => {
    it("default cancelButtonText should be Cancel", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.cancelButtonText).toBe("Cancel");
    });

    it("should support custom cancel button text", async () => {
      const messageBox = createMessageBox({ "cancel-button-text": "取消" });
      await waitForRender();
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      expect(cancelBtn.textContent).toBe("取消");
    });

    it("dynamically changing cancelButtonText should update button text", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      messageBox.setAttribute("cancel-button-text", "Abort");
      await waitForRender();
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      expect(cancelBtn.textContent).toBe("Abort");
    });
  });

  // ==================== Center 属性测试 ====================

  describe("Center Attribute", () => {
    it("default center should be false", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.center).toBe(false);
    });

    it("center=true should add ea-message-box--center modifier class", async () => {
      const messageBox = createMessageBox({ center: true });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-message-box--center")).toBe(true);
    });

    it("center=false should not add ea-message-box--center modifier class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-message-box--center")).toBe(
        false
      );
    });

    it("dynamically changing center should update modifier class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-message-box--center")).toBe(
        false
      );
      messageBox.setAttribute("center", "");
      await waitForRender();
      expect(overlayEl.classList.contains("ea-message-box--center")).toBe(true);
    });
  });

  // ==================== RoundButton 属性测试 ====================

  describe("RoundButton Attribute", () => {
    it("default roundButton should be false", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.roundButton).toBe(false);
    });

    it("roundButton=true should set round attribute on buttons", async () => {
      const messageBox = createMessageBox({ "round-button": true });
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      expect(confirmBtn.getAttribute("round")).toBe("true");
      expect(cancelBtn.getAttribute("round")).toBe("true");
    });

    it("dynamically changing roundButton should update button round attribute", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      messageBox.setAttribute("round-button", "");
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      expect(confirmBtn.getAttribute("round")).toBe("true");
    });
  });

  // ==================== ButtonSize 属性测试 ====================

  describe("ButtonSize Attribute", () => {
    it("default buttonSize should be medium", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.buttonSize).toBe("medium");
    });

    ["small", "medium", "large"].forEach(size => {
      it(`should support buttonSize='${size}'`, async () => {
        const messageBox = createMessageBox({ "button-size": size });
        await waitForRender();
        expect(messageBox.buttonSize).toBe(size);
      });
    });

    it("buttonSize should be applied to both confirm and cancel buttons", async () => {
      const messageBox = createMessageBox({ "button-size": "large" });
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      expect(confirmBtn.getAttribute("size")).toBe("large");
      expect(cancelBtn.getAttribute("size")).toBe("large");
    });

    it("dynamically changing buttonSize should update button size attribute", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      messageBox.setAttribute("button-size", "small");
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      expect(confirmBtn.getAttribute("size")).toBe("small");
    });
  });

  // ==================== ShowInput 属性测试 ====================

  describe("ShowInput Attribute", () => {
    it("default showInput should be false", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.showInput).toBe(false);
    });

    it("showInput=true should add is-input-visible state class", async () => {
      const messageBox = createMessageBox({ "show-input": true });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-input-visible")).toBe(true);
    });

    it("showInput=false should not add is-input-visible state class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-input-visible")).toBe(false);
    });

    it("dynamically changing showInput should update state class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-input-visible")).toBe(false);
      messageBox.setAttribute("show-input", "");
      await waitForRender();
      expect(overlayEl.classList.contains("is-input-visible")).toBe(true);
    });
  });

  // ==================== InputPlaceholder 属性测试 ====================

  describe("InputPlaceholder Attribute", () => {
    it("default inputPlaceholder should be empty string", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.inputPlaceholder).toBe("");
    });

    it("should support setting inputPlaceholder", async () => {
      const messageBox = createMessageBox({ "input-placeholder": "请输入" });
      await waitForRender();
      const input = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__input"
      );
      expect(input.getAttribute("placeholder")).toBe("请输入");
    });

    it("dynamically changing inputPlaceholder should update input placeholder", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      messageBox.setAttribute("input-placeholder", "Type here");
      await waitForRender();
      const input = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__input"
      );
      expect(input.getAttribute("placeholder")).toBe("Type here");
    });
  });

  // ==================== InputType 属性测试 ====================

  describe("InputType Attribute", () => {
    it("default inputType should be text", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.inputType).toBe("text");
    });

    it("should support setting inputType", async () => {
      const messageBox = createMessageBox({ "input-type": "password" });
      await waitForRender();
      const input = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__input"
      );
      expect(input.getAttribute("type")).toBe("password");
    });

    it("dynamically changing inputType should update input type", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      messageBox.setAttribute("input-type", "number");
      await waitForRender();
      const input = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__input"
      );
      expect(input.getAttribute("type")).toBe("number");
    });
  });

  // ==================== InputValue 属性测试 ====================

  describe("InputValue Attribute", () => {
    it("default inputValue should be empty string", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.inputValue).toBe("");
    });

    it("should support setting inputValue", async () => {
      const messageBox = createMessageBox({ "input-value": "hello" });
      await waitForRender();
      const input = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__input"
      );
      expect(input.getAttribute("value")).toBe("hello");
    });

    it("dynamically changing inputValue should update input value", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      messageBox.setAttribute("input-value", "world");
      await waitForRender();
      const input = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__input"
      );
      expect(input.getAttribute("value")).toBe("world");
    });
  });

  // ==================== InputErrorMessage 属性测试 ====================

  describe("InputErrorMessage Attribute", () => {
    it("default inputErrorMessage should be empty string", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.inputErrorMessage).toBe("");
    });

    it("should support setting inputErrorMessage when inputPattern is set", async () => {
      const messageBox = createMessageBox({
        "input-error-message": "格式错误",
      });
      messageBox.inputPattern = /test/;
      await waitForRender();
      const invalidMsg = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__invalid-message"
      );
      expect(invalidMsg.textContent).toBe("格式错误");
    });
  });

  // ==================== InputPattern 属性测试 ====================

  describe("InputPattern Property", () => {
    it("default inputPattern should be null", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.inputPattern).toBeNull();
    });

    it("should support setting inputPattern regex", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      messageBox.inputPattern = /^[a-z]+$/;
      expect(messageBox.inputPattern).toEqual(/^[a-z]+$/);
    });
  });

  // ==================== Movable 属性测试 ====================

  describe("Movable Attribute", () => {
    it("default movable should be false", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.movable).toBe(false);
    });

    it("movable=true should add ea-message-box--draggable modifier class", async () => {
      const messageBox = createMessageBox({ movable: true });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-message-box--draggable")).toBe(
        true
      );
    });

    it("movable=false should not add ea-message-box--draggable modifier class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-message-box--draggable")).toBe(
        false
      );
    });

    it("dynamically changing movable should update modifier class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-message-box--draggable")).toBe(
        false
      );
      messageBox.setAttribute("movable", "");
      await waitForRender();
      expect(overlayEl.classList.contains("ea-message-box--draggable")).toBe(
        true
      );
    });
  });

  // ==================== 继承自 EaOverlay 的属性测试 ====================

  describe("Modal Attribute (inherited)", () => {
    it("default modal should be true", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.modal).toBe(true);
    });

    it("modal=true should add is-modal state class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-modal")).toBe(true);
    });

    it("modal=false should not add is-modal state class", async () => {
      const messageBox = createMessageBox({ modal: "false" });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-modal")).toBe(false);
    });
  });

  describe("CloseOnClickModal Attribute (inherited)", () => {
    it("default closeOnClickModal should be true", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.closeOnClickModal).toBe(true);
    });

    it("should support setting closeOnClickModal to false", async () => {
      const messageBox = createMessageBox({ "close-on-click-modal": "false" });
      await waitForRender();
      expect(messageBox.closeOnClickModal).toBe(false);
    });
  });

  describe("CloseOnPressEscape Attribute", () => {
    it("default closeOnPressEscape should be true", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.closeOnPressEscape).toBe(true);
    });

    it("should support setting closeOnPressEscape to true", async () => {
      const messageBox = createMessageBox({ "close-on-press-escape": true });
      await waitForRender();
      expect(messageBox.closeOnPressEscape).toBe(true);
    });
  });

  describe("ZIndex Attribute (inherited)", () => {
    it("default zIndex should be empty string", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.zIndex).toBe("");
    });

    it("should support setting zIndex", async () => {
      const messageBox = createMessageBox({ "z-index": "5000" });
      await waitForRender();
      expect(messageBox.zIndex).toBe("5000");
      expect(messageBox.style.getPropertyValue("--ea-overlay-z-index")).toBe(
        "5000"
      );
    });
  });

  describe("BackgroundColor Attribute (inherited)", () => {
    it("default backgroundColor should be empty string", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.backgroundColor).toBe("");
    });

    it("should support setting backgroundColor", async () => {
      const messageBox = createMessageBox({
        "background-color": "rgba(0,0,0,0.6)",
      });
      await waitForRender();
      expect(messageBox.backgroundColor).toBe("rgba(0,0,0,0.6)");
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-background-color")
      ).toBe("rgba(0,0,0,0.6)");
    });
  });

  // ==================== BeforeClose 属性测试 ====================

  describe("BeforeClose Property", () => {
    it("default beforeClose should be null", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.beforeClose).toBeNull();
    });

    it("setting beforeClose callback should intercept close", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      let doneCalled = false;
      messageBox.beforeClose = done => {
        doneCalled = true;
        done();
      };
      messageBox.visible = false;
      await waitForRender();
      expect(doneCalled).toBe(true);
    });

    it("beforeClose not calling done should prevent close", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      messageBox.beforeClose = () => {};
      messageBox.visible = false;
      await waitForRender();
      expect(messageBox.visible).toBe(true);
    });
  });

  // ==================== ConfirmButtonLoading 属性测试 ====================

  describe("ConfirmButtonLoading Property", () => {
    it("default confirmButtonLoading should be false", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.confirmButtonLoading).toBe(false);
    });

    it("confirmButtonLoading=true should set loading attribute on confirm button", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      messageBox.confirmButtonLoading = true;
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      expect(confirmBtn.getAttribute("loading")).toBe("true");
    });

    it("confirmButtonLoading=true should disable input element", async () => {
      const messageBox = createMessageBox({ "show-input": true });
      await waitForRender();
      messageBox.confirmButtonLoading = true;
      await waitForRender();
      const input = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__input"
      );
      expect(input.disabled).toBe(true);
    });
  });

  // ==================== DistinguishCancelAndClose 属性测试 ====================

  describe("DistinguishCancelAndClose Property", () => {
    it("default distinguishCancelAndClose should be false", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.distinguishCancelAndClose).toBe(false);
    });

    it("should support setting distinguishCancelAndClose", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      messageBox.distinguishCancelAndClose = true;
      expect(messageBox.distinguishCancelAndClose).toBe(true);
    });
  });

  // ==================== 事件测试 ====================

  describe("Events", () => {
    it("clicking confirm button should trigger confirm event", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("confirm", handler);
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      expect(handler).toHaveBeenCalled();
    });

    it("clicking cancel button should trigger cancel event", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "show-cancel-button": true,
      });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("cancel", handler);
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      cancelBtn.click();
      await waitForRender();
      expect(handler).toHaveBeenCalled();
    });

    it("clicking close icon should trigger cancel event when distinguishCancelAndClose=false", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      const cancelHandler = vi.fn();
      const closeHandler = vi.fn();
      messageBox.addEventListener("cancel", cancelHandler);
      messageBox.addEventListener("message-close", closeHandler);
      const closeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__icon-close"
      );
      closeIcon.click();
      await waitForRender();
      expect(cancelHandler).toHaveBeenCalled();
      expect(closeHandler).not.toHaveBeenCalled();
    });

    it("clicking close icon should trigger message-close event when distinguishCancelAndClose=true", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      messageBox.distinguishCancelAndClose = true;
      const cancelHandler = vi.fn();
      const closeHandler = vi.fn();
      messageBox.addEventListener("cancel", cancelHandler);
      messageBox.addEventListener("message-close", closeHandler);
      const closeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__icon-close"
      );
      closeIcon.click();
      await waitForRender();
      expect(cancelHandler).not.toHaveBeenCalled();
      expect(closeHandler).toHaveBeenCalled();
    });

    it("clicking close icon when showClose=false should not trigger any event", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "show-close": "false",
      });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("cancel", handler);
      const closeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__icon-close"
      );
      closeIcon.click();
      await waitForRender();
      expect(handler).not.toHaveBeenCalled();
    });

    it("confirm event should bubble and be composed", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("confirm", handler);
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      expect(handler).toHaveBeenCalled();
      const event = handler.mock.calls[0][0];
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it("cancel event should bubble and be composed", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "show-cancel-button": true,
      });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("cancel", handler);
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      cancelBtn.click();
      await waitForRender();
      expect(handler).toHaveBeenCalled();
      const event = handler.mock.calls[0][0];
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it("setting visible to true should trigger open event", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const openHandler = vi.fn();
      messageBox.addEventListener("open", openHandler);
      messageBox.setAttribute("visible", "");
      await waitForRender();
      expect(openHandler).toHaveBeenCalled();
    });

    it("setting visible to true then transitionend should trigger opened event", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const openedHandler = vi.fn();
      messageBox.addEventListener("opened", openedHandler);
      messageBox.show();
      await waitForRender();
      await new Promise(resolve => requestAnimationFrame(resolve));
      dispatchTransitionEnd(messageBox);
      await waitForRender();
      expect(openedHandler).toHaveBeenCalled();
    });

    it("setting visible from true to false should trigger close event", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      const closeHandler = vi.fn();
      messageBox.addEventListener("close", closeHandler);
      messageBox.removeAttribute("visible");
      await waitForRender();
      expect(closeHandler).toHaveBeenCalled();
    });

    it("setting visible from true to false then transitionend should trigger closed event", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      const closedHandler = vi.fn();
      messageBox.addEventListener("closed", closedHandler);
      messageBox.removeAttribute("visible");
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      await waitForRender();
      expect(closedHandler).toHaveBeenCalled();
    });
  });

  // ==================== InputPattern 验证测试 ====================

  describe("InputPattern Validation", () => {
    it("inputPattern matching should trigger confirm event on click", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "show-input": true,
        "input-value": "abc",
      });
      messageBox.inputPattern = /^[a-z]+$/;
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("confirm", handler);
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      expect(handler).toHaveBeenCalled();
    });

    it("inputPattern not matching should not trigger confirm event on click", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "show-input": true,
        "input-value": "123",
      });
      messageBox.inputPattern = /^[a-z]+$/;
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("confirm", handler);
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      expect(handler).not.toHaveBeenCalled();
    });

    it("inputPattern not matching should add is-invalid state class", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "show-input": true,
        "input-value": "123",
      });
      messageBox.inputPattern = /^[a-z]+$/;
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-invalid")).toBe(true);
    });

    it("without inputPattern, clicking confirm should trigger confirm event normally", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "show-input": true,
      });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("confirm", handler);
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      expect(handler).toHaveBeenCalled();
    });

    it("inputPattern not matching should display inputErrorMessage", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "show-input": true,
        "input-value": "123",
        "input-error-message": "Only letters allowed",
      });
      messageBox.inputPattern = /^[a-z]+$/;
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      const invalidMsg = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__invalid-message"
      );
      expect(invalidMsg.textContent).toBe("Only letters allowed");
    });
  });

  // ==================== ESC 键测试 ====================

  describe("ESC Key Handling", () => {
    it("closeOnPressEscape=true and pressing ESC should trigger cancel event", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "close-on-press-escape": true,
      });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("cancel", handler);
      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);
      await waitForRender();
      expect(handler).toHaveBeenCalled();
    });

    it("closeOnPressEscape=false and pressing ESC should not trigger event", async () => {
      const messageBox = document.createElement("ea-message-box");
      messageBox.setAttribute("visible", "");
      messageBox.closeOnPressEscape = false;
      container.appendChild(messageBox);
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("cancel", handler);
      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);
      await waitForRender();
      expect(handler).not.toHaveBeenCalled();
    });

    it("visible=false and pressing ESC should not trigger event", async () => {
      const messageBox = createMessageBox({ "close-on-press-escape": true });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("cancel", handler);
      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);
      await waitForRender();
      expect(handler).not.toHaveBeenCalled();
    });

    it("closeOnPressEscape=true with distinguishCancelAndClose=true should trigger message-close on ESC", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "close-on-press-escape": true,
      });
      messageBox.distinguishCancelAndClose = true;
      await waitForRender();
      const closeHandler = vi.fn();
      const cancelHandler = vi.fn();
      messageBox.addEventListener("message-close", closeHandler);
      messageBox.addEventListener("cancel", cancelHandler);
      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);
      await waitForRender();
      expect(closeHandler).toHaveBeenCalled();
      expect(cancelHandler).not.toHaveBeenCalled();
    });

    it("ESC key event should be stopImmediatePropagation and preventDefault", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "close-on-press-escape": true,
      });
      await waitForRender();
      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true,
      });
      const spy = vi.spyOn(escapeEvent, "stopImmediatePropagation");
      const preventSpy = vi.spyOn(escapeEvent, "preventDefault");
      document.dispatchEvent(escapeEvent);
      await waitForRender();
      expect(spy).toHaveBeenCalled();
      expect(preventSpy).toHaveBeenCalled();
    });
  });

  // ==================== 遮罩层点击测试 ====================

  describe("Mask Click Handling", () => {
    it("closeOnClickModal=true and clicking mask should trigger cancel event", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("cancel", handler);
      const mask = messageBox.shadowRoot.querySelector(".ea-overlay__mask");
      mask.click();
      await waitForRender();
      expect(handler).toHaveBeenCalled();
    });

    it("closeOnClickModal=false and clicking mask should not trigger event", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "close-on-click-modal": "false",
      });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("cancel", handler);
      const mask = messageBox.shadowRoot.querySelector(".ea-overlay__mask");
      mask.click();
      await waitForRender();
      expect(handler).not.toHaveBeenCalled();
    });

    it("closeOnClickModal=true with distinguishCancelAndClose=true should trigger message-close on mask click", async () => {
      const messageBox = createMessageBox({ visible: true });
      messageBox.distinguishCancelAndClose = true;
      await waitForRender();
      const closeHandler = vi.fn();
      const cancelHandler = vi.fn();
      messageBox.addEventListener("message-close", closeHandler);
      messageBox.addEventListener("cancel", cancelHandler);
      const mask = messageBox.shadowRoot.querySelector(".ea-overlay__mask");
      mask.click();
      await waitForRender();
      expect(closeHandler).toHaveBeenCalled();
      expect(cancelHandler).not.toHaveBeenCalled();
    });
  });

  // ==================== 拖拽测试 ====================

  describe("Drag Functionality", () => {
    it("movable=true and mousedown on header should start drag", async () => {
      const messageBox = createMessageBox({ movable: true, visible: true });
      await waitForRender();
      const header = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__header"
      );
      const content = messageBox.shadowRoot.querySelector(
        ".ea-overlay__content"
      );
      const mousedownEvent = new MouseEvent("mousedown", {
        clientX: 100,
        clientY: 100,
        bubbles: true,
      });
      Object.defineProperty(mousedownEvent, "target", {
        value: header,
        writable: false,
      });
      header.dispatchEvent(mousedownEvent);
      const mousemoveEvent = new MouseEvent("mousemove", {
        clientX: 200,
        clientY: 200,
        bubbles: true,
      });
      window.dispatchEvent(mousemoveEvent);
      expect(content.style.left).toBeTruthy();
      expect(content.style.top).toBeTruthy();
      const mouseupEvent = new MouseEvent("mouseup", { bubbles: true });
      window.dispatchEvent(mouseupEvent);
    });

    it("movable=false and mousedown on header should not start drag", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      const header = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__header"
      );
      const content = messageBox.shadowRoot.querySelector(
        ".ea-overlay__content"
      );
      const mousedownEvent = new MouseEvent("mousedown", {
        clientX: 100,
        clientY: 100,
        bubbles: true,
      });
      header.dispatchEvent(mousedownEvent);
      const mousemoveEvent = new MouseEvent("mousemove", {
        clientX: 200,
        clientY: 200,
        bubbles: true,
      });
      window.dispatchEvent(mousemoveEvent);
      expect(content.style.left).toBe("");
      expect(content.style.top).toBe("");
    });

    it("mousedown on close icon should not start drag even when movable=true", async () => {
      const messageBox = createMessageBox({ movable: true, visible: true });
      await waitForRender();
      const closeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__icon-close"
      );
      const content = messageBox.shadowRoot.querySelector(
        ".ea-overlay__content"
      );
      const mousedownEvent = new MouseEvent("mousedown", {
        clientX: 100,
        clientY: 100,
        bubbles: true,
      });
      Object.defineProperty(mousedownEvent, "target", {
        value: closeIcon,
        writable: false,
      });
      closeIcon.dispatchEvent(mousedownEvent);
      const mousemoveEvent = new MouseEvent("mousemove", {
        clientX: 200,
        clientY: 200,
        bubbles: true,
      });
      window.dispatchEvent(mousemoveEvent);
      expect(content.style.left).toBe("");
      expect(content.style.top).toBe("");
    });

    it("mouseup should stop drag", async () => {
      const messageBox = createMessageBox({ movable: true, visible: true });
      await waitForRender();
      const header = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__header"
      );
      const mousedownEvent = new MouseEvent("mousedown", {
        clientX: 100,
        clientY: 100,
        bubbles: true,
      });
      Object.defineProperty(mousedownEvent, "target", {
        value: header,
        writable: false,
      });
      header.dispatchEvent(mousedownEvent);
      const mouseupEvent = new MouseEvent("mouseup", { bubbles: true });
      window.dispatchEvent(mouseupEvent);
      const mousemoveEvent = new MouseEvent("mousemove", {
        clientX: 300,
        clientY: 300,
        bubbles: true,
      });
      window.dispatchEvent(mousemoveEvent);
      const content = messageBox.shadowRoot.querySelector(
        ".ea-overlay__content"
      );
      expect(content.style.left).toBe("");
    });
  });

  // ==================== 生命周期测试 ====================

  describe("Lifecycle", () => {
    it("$mount should set role to dialog", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.getAttribute("role")).toBe("dialog");
    });

    it("$mount should set CSS variables for content dimensions", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-content-width")
      ).toBe("100%");
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-content-max-width")
      ).toBe("420px");
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-content-height")
      ).toBe("auto");
    });

    it("removing element should not throw errors", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(() => messageBox.remove()).not.toThrow();
      expect(messageBox.isConnected).toBe(false);
    });
  });

  // ==================== 组合类名测试 ====================

  describe("Combined Class Names", () => {
    it("should contain both overlay and message-box classes", async () => {
      const messageBox = createMessageBox({
        visible: true,
        variant: "success",
      });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-overlay")).toBe(true);
      expect(overlayEl.classList.contains("ea-overlay--open")).toBe(true);
      expect(overlayEl.classList.contains("is-modal")).toBe(true);
      expect(overlayEl.classList.contains("ea-message-box")).toBe(true);
      expect(overlayEl.classList.contains("ea-message-box--success")).toBe(
        true
      );
    });

    it("multiple attributes combined should generate all correct classes", async () => {
      const messageBox = createMessageBox({
        visible: true,
        variant: "warning",
        center: true,
        movable: true,
        "box-type": "confirm",
      });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-overlay--open")).toBe(true);
      expect(overlayEl.classList.contains("ea-message-box--warning")).toBe(
        true
      );
      expect(overlayEl.classList.contains("ea-message-box--center")).toBe(true);
      expect(overlayEl.classList.contains("ea-message-box--draggable")).toBe(
        true
      );
      expect(overlayEl.classList.contains("is-confirm-box")).toBe(true);
    });

    it("all hidden states combined should generate correct classes", async () => {
      const messageBox = createMessageBox({
        "show-close": "false",
        "show-cancel-button": "false",
        "show-confirm-button": "false",
      });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-close-hidden")).toBe(true);
      expect(overlayEl.classList.contains("is-cancel-hidden")).toBe(true);
      expect(overlayEl.classList.contains("is-confirm-hidden")).toBe(true);
    });
  });

  // ==================== EaMessageBox Instance API 测试 ====================

  describe("EaMessageBox Instance API", () => {
    afterEach(() => {
      document.querySelectorAll("ea-message-box").forEach(el => el.remove());
    });

    describe("EaMessageBox()", () => {
      it("should create and display ea-message-box element", async () => {
        const promise = EaMessageBox({ message: "Test", heading: "Title" });
        await waitForRender();
        const messageBox = document.querySelector("ea-message-box");
        expect(messageBox).toBeTruthy();
        expect(messageBox.visible).toBe(true);
        const confirmBtn = messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__confirm-button"
        );
        confirmBtn.click();
        await waitForRender();
        dispatchTransitionEnd(messageBox);
        await waitForRender();
        try {
          await promise;
        } catch {
          /* expected */
        }
      });

      it("clicking confirm button should resolve with confirm", async () => {
        const promise = EaMessageBox({ message: "Test", heading: "Title" });
        await waitForRender();
        const messageBox = document.querySelector("ea-message-box");
        const confirmBtn = messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__confirm-button"
        );
        confirmBtn.click();
        await waitForRender();
        dispatchTransitionEnd(messageBox);
        const result = await promise;
        expect(result).toBe("confirm");
      });

      it("clicking cancel button should reject with cancel", async () => {
        const promise = EaMessageBox({
          message: "Test",
          heading: "Title",
          showCancelButton: true,
        });
        await waitForRender();
        const messageBox = document.querySelector("ea-message-box");
        const cancelBtn = messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__cancel-button"
        );
        cancelBtn.click();
        await waitForRender();
        dispatchTransitionEnd(messageBox);
        try {
          await promise;
          expect.fail("Should have rejected");
        } catch (action) {
          expect(action).toBe("cancel");
        }
      });

      it("distinguishCancelAndClose=true and clicking close icon should reject with close", async () => {
        const promise = EaMessageBox({
          message: "Test",
          heading: "Title",
          distinguishCancelAndClose: true,
        });
        await waitForRender();
        const messageBox = document.querySelector("ea-message-box");
        messageBox.distinguishCancelAndClose = true;
        const closeIcon = messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__icon-close"
        );
        closeIcon.click();
        await waitForRender();
        dispatchTransitionEnd(messageBox);
        try {
          await promise;
          expect.fail("Should have rejected");
        } catch (action) {
          expect(action).toBe("close");
        }
      });

      it("after closing, element should be removed from DOM", async () => {
        const promise = EaMessageBox({ message: "Test", heading: "Title" });
        await waitForRender();
        const messageBox = document.querySelector("ea-message-box");
        expect(messageBox).toBeTruthy();
        const confirmBtn = messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__confirm-button"
        );
        confirmBtn.click();
        await waitForRender();
        dispatchTransitionEnd(messageBox);
        await promise;
        await waitForRender();
        const removedBox = document.querySelector("ea-message-box");
        expect(removedBox).toBeNull();
      });

      it("should correctly pass all options to component", async () => {
        const promise = EaMessageBox({
          message: "Hello",
          heading: "World",
          variant: "success",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          showCancelButton: true,
          boxType: "confirm",
        });
        await waitForRender();
        const messageBox = document.querySelector("ea-message-box");
        expect(messageBox.message).toBe("Hello");
        expect(messageBox.heading).toBe("World");
        expect(messageBox.variant).toBe("success");
        expect(messageBox.confirmButtonText).toBe("Yes");
        expect(messageBox.cancelButtonText).toBe("No");
        expect(messageBox.showCancelButton).toBe(true);
        expect(messageBox.boxType).toBe("confirm");
        const cancelBtn = messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__cancel-button"
        );
        cancelBtn.click();
        await waitForRender();
        dispatchTransitionEnd(messageBox);
        try {
          await promise;
        } catch {
          /* expected */
        }
      });

      it("beforeClose callback should intercept close", async () => {
        let beforeCloseCalled = false;
        const promise = EaMessageBox({
          message: "Test",
          heading: "Title",
          beforeClose: (action, instance, done) => {
            beforeCloseCalled = true;
            done();
          },
        });
        await waitForRender();
        const messageBox = document.querySelector("ea-message-box");
        const confirmBtn = messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__confirm-button"
        );
        confirmBtn.click();
        await waitForRender();
        dispatchTransitionEnd(messageBox);
        const result = await promise;
        expect(beforeCloseCalled).toBe(true);
        expect(result).toBe("confirm");
      });
    });

    describe("EaMessageBox.alert()", () => {
      it("should create alert type message box", async () => {
        const promise = EaMessageBox.alert("Alert Message", "Alert Title");
        await waitForRender();
        const messageBox = document.querySelector("ea-message-box");
        expect(messageBox).toBeTruthy();
        expect(messageBox.boxType).toBe("alert");
        expect(messageBox.message).toBe("Alert Message");
        expect(messageBox.heading).toBe("Alert Title");
        expect(messageBox.showConfirmButton).toBe(true);
        expect(messageBox.closeOnClickModal).toBe(false);
        const confirmBtn = messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__confirm-button"
        );
        confirmBtn.click();
        await waitForRender();
        dispatchTransitionEnd(messageBox);
        await promise;
      });

      it("alert should not show cancel button by default", async () => {
        const promise = EaMessageBox.alert("Test");
        await waitForRender();
        const messageBox = document.querySelector("ea-message-box");
        expect(messageBox.showCancelButton).toBe(false);
        const confirmBtn = messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__confirm-button"
        );
        confirmBtn.click();
        await waitForRender();
        dispatchTransitionEnd(messageBox);
        await promise;
      });

      it("alert should support custom options", async () => {
        const promise = EaMessageBox.alert("Test", "Title", {
          variant: "error",
          confirmButtonText: "Got it",
        });
        await waitForRender();
        const messageBox = document.querySelector("ea-message-box");
        expect(messageBox.variant).toBe("error");
        expect(messageBox.confirmButtonText).toBe("Got it");
        const confirmBtn = messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__confirm-button"
        );
        confirmBtn.click();
        await waitForRender();
        dispatchTransitionEnd(messageBox);
        await promise;
      });
    });

    describe("EaMessageBox.confirm()", () => {
      it("should create confirm type message box", async () => {
        const promise = EaMessageBox.confirm(
          "Confirm Message",
          "Confirm Title"
        );
        await waitForRender();
        const messageBox = document.querySelector("ea-message-box");
        expect(messageBox).toBeTruthy();
        expect(messageBox.boxType).toBe("confirm");
        expect(messageBox.message).toBe("Confirm Message");
        expect(messageBox.heading).toBe("Confirm Title");
        expect(messageBox.showConfirmButton).toBe(true);
        expect(messageBox.showCancelButton).toBe(true);
        expect(messageBox.closeOnPressEscape).toBe(true);
        const cancelBtn = messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__cancel-button"
        );
        cancelBtn.click();
        await waitForRender();
        dispatchTransitionEnd(messageBox);
        try {
          await promise;
        } catch {
          /* expected */
        }
      });

      it("confirm should support custom options", async () => {
        const promise = EaMessageBox.confirm("Test", "Title", {
          variant: "warning",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        });
        await waitForRender();
        const messageBox = document.querySelector("ea-message-box");
        expect(messageBox.variant).toBe("warning");
        expect(messageBox.confirmButtonText).toBe("Yes");
        expect(messageBox.cancelButtonText).toBe("No");
        const cancelBtn = messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__cancel-button"
        );
        cancelBtn.click();
        await waitForRender();
        dispatchTransitionEnd(messageBox);
        try {
          await promise;
        } catch {
          /* expected */
        }
      });
    });

    describe("EaMessageBox.prompt()", () => {
      it("should create prompt type message box", async () => {
        const promise = EaMessageBox.prompt("Prompt Message", "Prompt Title");
        await waitForRender();
        const messageBox = document.querySelector("ea-message-box");
        expect(messageBox).toBeTruthy();
        expect(messageBox.boxType).toBe("prompt");
        expect(messageBox.message).toBe("Prompt Message");
        expect(messageBox.heading).toBe("Prompt Title");
        expect(messageBox.showConfirmButton).toBe(true);
        expect(messageBox.showCancelButton).toBe(true);
        expect(messageBox.showInput).toBe(true);
        expect(messageBox.closeOnPressEscape).toBe(true);
        const cancelBtn = messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__cancel-button"
        );
        cancelBtn.click();
        await waitForRender();
        dispatchTransitionEnd(messageBox);
        try {
          await promise;
        } catch {
          /* expected */
        }
      });

      it("prompt should support custom options", async () => {
        const promise = EaMessageBox.prompt("Test", "Title", {
          inputPlaceholder: "Enter value",
          inputPattern: /^[a-z]+$/,
          inputErrorMessage: "Only lowercase letters",
        });
        await waitForRender();
        const messageBox = document.querySelector("ea-message-box");
        expect(messageBox.inputPlaceholder).toBe("Enter value");
        expect(messageBox.inputPattern).toEqual(/^[a-z]+$/);
        expect(messageBox.inputErrorMessage).toBe("Only lowercase letters");
        const cancelBtn = messageBox.shadowRoot.querySelector(
          ".ea-message-box-main__cancel-button"
        );
        cancelBtn.click();
        await waitForRender();
        dispatchTransitionEnd(messageBox);
        try {
          await promise;
        } catch {
          /* expected */
        }
      });
    });
  });

  // ==================== 边界情况测试 ====================

  describe("Edge Cases", () => {
    it("empty heading should render empty title", async () => {
      const messageBox = createMessageBox({ heading: "" });
      await waitForRender();
      const titleEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__title"
      );
      expect(titleEl.textContent).toBe("");
    });

    it("empty message should render empty description", async () => {
      const messageBox = createMessageBox({ message: "" });
      await waitForRender();
      const descEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__description"
      );
      expect(descEl.textContent).toBe("");
    });

    it("special characters in heading should be rendered as text", async () => {
      const messageBox = createMessageBox({
        heading: "<script>alert(1)</script>",
      });
      await waitForRender();
      const titleEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__title"
      );
      expect(titleEl.textContent).toBe("<script>alert(1)</script>");
    });

    it("special characters in message should be rendered as text by default", async () => {
      const messageBox = createMessageBox({
        message: "<script>alert(1)</script>",
      });
      await waitForRender();
      const descEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__description"
      );
      expect(descEl.textContent).toBe("<script>alert(1)</script>");
    });

    it("multiple show/hide cycles should work correctly", async () => {
      const messageBox = createMessageBox();
      await waitForRender();

      messageBox.show();
      await waitForRender();
      expect(messageBox.visible).toBe(true);

      messageBox.hide();
      await waitForRender();
      expect(messageBox.visible).toBe(false);

      messageBox.show();
      await waitForRender();
      expect(messageBox.visible).toBe(true);

      messageBox.hide();
      await waitForRender();
      expect(messageBox.visible).toBe(false);
    });

    it("setting the same attribute value twice should not cause errors", async () => {
      const messageBox = createMessageBox({ heading: "Same" });
      await waitForRender();
      messageBox.setAttribute("heading", "Same");
      await waitForRender();
      const titleEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__title"
      );
      expect(titleEl.textContent).toBe("Same");
    });

    it("distinguishCancelAndClose=true and clicking close icon should trigger message-close instead of cancel", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      messageBox.distinguishCancelAndClose = true;
      const cancelHandler = vi.fn();
      const closeHandler = vi.fn();
      messageBox.addEventListener("cancel", cancelHandler);
      messageBox.addEventListener("message-close", closeHandler);
      const closeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__icon-close"
      );
      closeIcon.click();
      await waitForRender();
      expect(closeHandler).toHaveBeenCalled();
      expect(cancelHandler).not.toHaveBeenCalled();
    });
  });

  // ==================== Variant 空值测试 ====================

  describe("Variant Empty Value", () => {
    it("variant='' should not generate ea-message-box-- modifier class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      const classes = overlayEl.className;
      expect(classes).not.toContain("ea-message-box-- ");
      expect(classes).not.toMatch(/ea-message-box--$/);
    });

    it("setting variant from empty to a value should add modifier class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-message-box--success")).toBe(
        false
      );
      messageBox.setAttribute("variant", "success");
      await waitForRender();
      expect(overlayEl.classList.contains("ea-message-box--success")).toBe(
        true
      );
    });

    it("setting variant from a value to empty should remove modifier class", async () => {
      const messageBox = createMessageBox({ variant: "error" });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-message-box--error")).toBe(true);
      messageBox.setAttribute("variant", "");
      await waitForRender();
      expect(overlayEl.classList.contains("ea-message-box--error")).toBe(false);
    });
  });

  // ==================== _handleInputPattern 深度测试 ====================

  describe("InputPattern Deep Validation", () => {
    it("without input element, clicking confirm should still trigger confirm event", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("confirm", handler);
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      expect(handler).toHaveBeenCalled();
    });

    it("with inputPattern but showInput=false, _input element still exists so validation runs on empty value", async () => {
      const messageBox = createMessageBox({ visible: true });
      messageBox.inputPattern = /^[a-z]+$/;
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("confirm", handler);
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      expect(handler).not.toHaveBeenCalled();
    });

    it("inputPattern with empty input value should be invalid", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "show-input": true,
        "input-value": "",
      });
      messageBox.inputPattern = /^[a-z]+$/;
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("confirm", handler);
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      expect(handler).not.toHaveBeenCalled();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-invalid")).toBe(true);
    });

    it("inputPattern validation should toggle is-invalid class on container", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "show-input": true,
        "input-value": "123",
      });
      messageBox.inputPattern = /^[a-z]+$/;
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-invalid")).toBe(true);

      messageBox.setAttribute("input-value", "abc");
      await waitForRender();
      confirmBtn.click();
      await waitForRender();
      expect(overlayEl.classList.contains("is-invalid")).toBe(false);
    });

    it("inputPattern not matching should add is-invalid class but default error message is only in rejected promise", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "show-input": true,
        "input-value": "123",
      });
      messageBox.inputPattern = /^[a-z]+$/;
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-invalid")).toBe(true);
    });

    it("inputErrorMessage without inputPattern should not display error message", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "show-input": true,
        "input-error-message": "Error",
      });
      await waitForRender();
      const invalidMsg = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__invalid-message"
      );
      expect(invalidMsg.textContent).toBe("");
    });

    it("after invalid input, fixing the input and clicking confirm should succeed", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "show-input": true,
        "input-value": "123",
      });
      messageBox.inputPattern = /^[a-z]+$/;
      await waitForRender();

      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();

      const handler = vi.fn();
      messageBox.addEventListener("confirm", handler);

      messageBox.setAttribute("input-value", "abc");
      await waitForRender();
      confirmBtn.click();
      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });
  });

  // ==================== Mask Click 深度测试 ====================

  describe("Mask Click Deep Tests", () => {
    it("clicking overlay content should not trigger cancel event", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("cancel", handler);
      const content = messageBox.shadowRoot.querySelector(
        ".ea-overlay__content"
      );
      content.click();
      await waitForRender();
      expect(handler).not.toHaveBeenCalled();
    });

    it("clicking message-box-main body should not trigger cancel event", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("cancel", handler);
      const mainBody = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main"
      );
      mainBody.click();
      await waitForRender();
      expect(handler).not.toHaveBeenCalled();
    });

    it("closeOnClickModal=false with distinguishCancelAndClose=true, clicking mask should not trigger any event", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "close-on-click-modal": "false",
      });
      messageBox.distinguishCancelAndClose = true;
      await waitForRender();
      const cancelHandler = vi.fn();
      const closeHandler = vi.fn();
      messageBox.addEventListener("cancel", cancelHandler);
      messageBox.addEventListener("message-close", closeHandler);
      const mask = messageBox.shadowRoot.querySelector(".ea-overlay__mask");
      mask.click();
      await waitForRender();
      expect(cancelHandler).not.toHaveBeenCalled();
      expect(closeHandler).not.toHaveBeenCalled();
    });
  });

  // ==================== EaMessageBox Instance API 深度测试 ====================

  describe("EaMessageBox Instance API Deep Tests", () => {
    afterEach(() => {
      document.querySelectorAll("ea-message-box").forEach(el => el.remove());
    });

    it("EaMessageBox default variant should be primary", async () => {
      const promise = EaMessageBox({ message: "Test" });
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      expect(messageBox.variant).toBe("primary");
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      await promise;
    });

    it("EaMessageBox default closeOnClickModal should be true", async () => {
      const promise = EaMessageBox({ message: "Test" });
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      expect(messageBox.closeOnClickModal).toBe(true);
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      await promise;
    });

    it("EaMessageBox.alert should set closeOnClickModal to false", async () => {
      const promise = EaMessageBox.alert("Test");
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      expect(messageBox.closeOnClickModal).toBe(false);
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      await promise;
    });

    it("EaMessageBox.confirm should set closeOnPressEscape to true", async () => {
      const promise = EaMessageBox.confirm("Test");
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      expect(messageBox.closeOnPressEscape).toBe(true);
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      cancelBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      try {
        await promise;
      } catch {
        /* expected */
      }
    });

    it("EaMessageBox.confirm should show both confirm and cancel buttons", async () => {
      const promise = EaMessageBox.confirm("Test");
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      expect(messageBox.showConfirmButton).toBe(true);
      expect(messageBox.showCancelButton).toBe(true);
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      cancelBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      try {
        await promise;
      } catch {
        /* expected */
      }
    });

    it("EaMessageBox.prompt should set showInput to true", async () => {
      const promise = EaMessageBox.prompt("Test");
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      expect(messageBox.showInput).toBe(true);
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      cancelBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      try {
        await promise;
      } catch {
        /* expected */
      }
    });

    it("EaMessageBox custom options should override defaults", async () => {
      const promise = EaMessageBox({
        message: "Test",
        variant: "error",
        closeOnClickModal: false,
        closeOnPressEscape: true,
        showCancelButton: true,
        center: true,
        roundButton: true,
        buttonSize: "large",
        confirmButtonText: "Agree",
        cancelButtonText: "Disagree",
      });
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      expect(messageBox.variant).toBe("error");
      expect(messageBox.closeOnClickModal).toBe(false);
      expect(messageBox.closeOnPressEscape).toBe(true);
      expect(messageBox.showCancelButton).toBe(true);
      expect(messageBox.center).toBe(true);
      expect(messageBox.roundButton).toBe(true);
      expect(messageBox.buttonSize).toBe("large");
      expect(messageBox.confirmButtonText).toBe("Agree");
      expect(messageBox.cancelButtonText).toBe("Disagree");
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      cancelBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      try {
        await promise;
      } catch {
        /* expected */
      }
    });

    it("EaMessageBox.alert with custom options should override alert defaults", async () => {
      const promise = EaMessageBox.alert("Test", "Title", {
        closeOnClickModal: true,
        variant: "warning",
      });
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      expect(messageBox.closeOnClickModal).toBe(true);
      expect(messageBox.variant).toBe("warning");
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      await promise;
    });

    it("EaMessageBox should support appendTo option with HTMLElement", async () => {
      const customContainer = document.createElement("div");
      document.body.appendChild(customContainer);
      const promise = EaMessageBox({
        message: "Test",
        appendTo: customContainer,
      });
      await waitForRender();
      const messageBox = customContainer.querySelector("ea-message-box");
      expect(messageBox).toBeTruthy();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      await promise;
      customContainer.remove();
    });

    it("EaMessageBox should support appendTo option with CSS selector", async () => {
      const customContainer = document.createElement("div");
      customContainer.id = "test-append-target";
      document.body.appendChild(customContainer);
      const promise = EaMessageBox({
        message: "Test",
        appendTo: "#test-append-target",
      });
      await waitForRender();
      const messageBox = customContainer.querySelector("ea-message-box");
      expect(messageBox).toBeTruthy();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      await promise;
      customContainer.remove();
    });

    it("EaMessageBox with invalid appendTo should default to body", async () => {
      const promise = EaMessageBox({
        message: "Test",
        appendTo: "#non-existent-selector",
      });
      await waitForRender();
      const messageBox = document.body.querySelector("ea-message-box");
      expect(messageBox).toBeTruthy();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      await promise;
    });

    it("EaMessageBox with inputPattern should validate on confirm", async () => {
      const promise = EaMessageBox.prompt("Enter text", "Input", {
        inputPattern: /^[a-z]+$/,
        inputErrorMessage: "Only lowercase letters allowed",
      });
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-invalid")).toBe(true);
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      cancelBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      try {
        await promise;
      } catch {
        /* expected */
      }
    });

    it("EaMessageBox with beforeClose should intercept and allow close", async () => {
      let beforeCloseCalled = false;
      const promise = EaMessageBox({
        message: "Test",
        beforeClose: (action, instance, done) => {
          beforeCloseCalled = true;
          expect(action).toBe("confirm");
          done();
        },
      });
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      const result = await promise;
      expect(beforeCloseCalled).toBe(true);
      expect(result).toBe("confirm");
    });

    it("EaMessageBox with beforeClose should intercept and prevent close", async () => {
      const promise = EaMessageBox({
        message: "Test",
        beforeClose: () => {
          // not calling done - should prevent close
        },
      });
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(messageBox.visible).toBe(true);
      messageBox.beforeClose = null;
      messageBox.removeAttribute("visible");
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      try {
        await promise;
      } catch {
        /* expected */
      }
    });

    it("EaMessageBox with distinguishCancelAndClose should reject with close on close icon click", async () => {
      const promise = EaMessageBox({
        message: "Test",
        distinguishCancelAndClose: true,
      });
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      const closeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__icon-close"
      );
      closeIcon.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      try {
        await promise;
        expect.fail("Should have rejected");
      } catch (action) {
        expect(action).toBe("close");
      }
    });

    it("EaMessageBox with distinguishCancelAndClose should reject with cancel on cancel button click", async () => {
      const promise = EaMessageBox({
        message: "Test",
        distinguishCancelAndClose: true,
        showCancelButton: true,
      });
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      cancelBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      try {
        await promise;
        expect.fail("Should have rejected");
      } catch (action) {
        expect(action).toBe("cancel");
      }
    });
  });

  // ==================== dangerouslyUseHTMLString 深度测试 ====================

  describe("DangerouslyUseHTMLString Deep Tests", () => {
    it("dangerouslyUseHTMLString=true should render HTML tags", async () => {
      const messageBox = createMessageBox({
        message: "<strong>Bold</strong> text",
      });
      messageBox.dangerouslyUseHTMLString = true;
      await waitForRender();
      const descEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__description"
      );
      expect(descEl.innerHTML).toContain("<strong>Bold</strong>");
      expect(descEl.textContent).toBe("Bold text");
    });

    it("dangerouslyUseHTMLString=false should escape HTML tags", async () => {
      const messageBox = createMessageBox({
        message: "<strong>Bold</strong> text",
      });
      await waitForRender();
      const descEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__description"
      );
      expect(descEl.innerHTML).not.toContain("<strong>");
      expect(descEl.textContent).toBe("<strong>Bold</strong> text");
    });

    it("switching dangerouslyUseHTMLString from false to true should re-render as HTML", async () => {
      const messageBox = createMessageBox({ message: "<em>Italic</em>" });
      await waitForRender();
      const descEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__description"
      );
      expect(descEl.textContent).toBe("<em>Italic</em>");
      messageBox.dangerouslyUseHTMLString = true;
      messageBox.setAttribute("message", "<em>Italic</em>");
      await waitForRender();
      expect(descEl.innerHTML).toContain("<em>Italic</em>");
    });

    it("message with complex HTML structure when dangerouslyUseHTMLString=true", async () => {
      const messageBox = createMessageBox({
        message: "<div><p>Paragraph</p><ul><li>Item</li></ul></div>",
      });
      messageBox.dangerouslyUseHTMLString = true;
      await waitForRender();
      const descEl = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__description"
      );
      expect(descEl.querySelector("p")).toBeTruthy();
      expect(descEl.querySelector("li")).toBeTruthy();
    });
  });

  // ==================== 事件深度测试 ====================

  describe("Events Deep Tests", () => {
    it("confirm event should be dispatched before transition abort", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      let confirmFired = false;
      messageBox.addEventListener("confirm", () => {
        confirmFired = true;
      });
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      expect(confirmFired).toBe(true);
    });

    it("cancel event should be dispatched on cancel button click", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "show-cancel-button": true,
      });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("cancel", handler);
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      cancelBtn.click();
      await waitForRender();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("multiple rapid confirm clicks should only fire confirm event once per click", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("confirm", handler);
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      confirmBtn.click();
      confirmBtn.click();
      await waitForRender();
      expect(handler).toHaveBeenCalledTimes(3);
    });

    it("open and opened events should fire in correct order", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const order = [];
      messageBox.addEventListener("open", () => order.push("open"));
      messageBox.addEventListener("opened", () => order.push("opened"));
      messageBox.show();
      await waitForRender();
      await new Promise(resolve => requestAnimationFrame(resolve));
      dispatchTransitionEnd(messageBox);
      await waitForRender();
      expect(order).toContain("open");
      expect(order).toContain("opened");
      expect(order.indexOf("open")).toBeLessThan(order.indexOf("opened"));
    });

    it("close and closed events should fire in correct order", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      const order = [];
      messageBox.addEventListener("close", () => order.push("close"));
      messageBox.addEventListener("closed", () => order.push("closed"));
      messageBox.hide();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      await waitForRender();
      expect(order).toContain("close");
      expect(order).toContain("closed");
      expect(order.indexOf("close")).toBeLessThan(order.indexOf("closed"));
    });

    it("message-close event should bubble and be composed", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      messageBox.distinguishCancelAndClose = true;
      const handler = vi.fn();
      messageBox.addEventListener("message-close", handler);
      const closeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__icon-close"
      );
      closeIcon.click();
      await waitForRender();
      expect(handler).toHaveBeenCalled();
      const event = handler.mock.calls[0][0];
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });
  });

  // ==================== CSS 变量覆盖测试 ====================

  describe("CSS Variable Overrides", () => {
    it("should support overriding content width via CSS variable", async () => {
      const messageBox = createMessageBox({
        "content-width": "500px",
      });
      await waitForRender();
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-content-width")
      ).toBe("500px");
    });

    it("should support overriding content max-width via CSS variable", async () => {
      const messageBox = createMessageBox({
        "content-max-width": "600px",
      });
      await waitForRender();
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-content-max-width")
      ).toBe("600px");
    });

    it("should support overriding content height via CSS variable", async () => {
      const messageBox = createMessageBox({
        "content-height": "300px",
      });
      await waitForRender();
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-content-height")
      ).toBe("300px");
    });

    it("should support overriding z-index via CSS variable", async () => {
      const messageBox = createMessageBox({ "z-index": "9999" });
      await waitForRender();
      expect(messageBox.style.getPropertyValue("--ea-overlay-z-index")).toBe(
        "9999"
      );
    });

    it("should support overriding background color via CSS variable", async () => {
      const messageBox = createMessageBox({
        "background-color": "rgba(0, 0, 0, 0.8)",
      });
      await waitForRender();
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-background-color")
      ).toBe("rgba(0, 0, 0, 0.8)");
    });

    it("$mount should set default CSS variables for content dimensions", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-content-width")
      ).toBe("100%");
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-content-max-width")
      ).toBe("420px");
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-content-height")
      ).toBe("auto");
    });
  });

  // ==================== 拖拽深度测试 ====================

  describe("Drag Deep Tests", () => {
    it("drag should calculate correct offset from content position", async () => {
      const messageBox = createMessageBox({ movable: true, visible: true });
      await waitForRender();
      const header = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__header"
      );
      const content = messageBox.shadowRoot.querySelector(
        ".ea-overlay__content"
      );

      const getBoundingClientRectSpy = vi.spyOn(
        content,
        "getBoundingClientRect"
      );
      getBoundingClientRectSpy.mockReturnValue({
        left: 50,
        top: 50,
        right: 450,
        bottom: 300,
        width: 400,
        height: 250,
        x: 50,
        y: 50,
        toJSON: () => {},
      });

      const mousedownEvent = new MouseEvent("mousedown", {
        clientX: 100,
        clientY: 100,
        bubbles: true,
      });
      Object.defineProperty(mousedownEvent, "target", {
        value: header,
        writable: false,
      });
      header.dispatchEvent(mousedownEvent);

      const mousemoveEvent = new MouseEvent("mousemove", {
        clientX: 200,
        clientY: 150,
        bubbles: true,
      });
      window.dispatchEvent(mousemoveEvent);

      expect(content.style.left).toBe("150px");
      expect(content.style.top).toBe("100px");

      const mouseupEvent = new MouseEvent("mouseup", { bubbles: true });
      window.dispatchEvent(mouseupEvent);
      getBoundingClientRectSpy.mockRestore();
    });

    it("drag should not move content when movable is false", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      const header = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__header"
      );
      const content = messageBox.shadowRoot.querySelector(
        ".ea-overlay__content"
      );

      const mousedownEvent = new MouseEvent("mousedown", {
        clientX: 100,
        clientY: 100,
        bubbles: true,
      });
      Object.defineProperty(mousedownEvent, "target", {
        value: header,
        writable: false,
      });
      header.dispatchEvent(mousedownEvent);

      const mousemoveEvent = new MouseEvent("mousemove", {
        clientX: 200,
        clientY: 200,
        bubbles: true,
      });
      window.dispatchEvent(mousemoveEvent);

      expect(content.style.left).toBe("");
      expect(content.style.top).toBe("");
    });

    it("drag should stop on mouseup", async () => {
      const messageBox = createMessageBox({ movable: true, visible: true });
      await waitForRender();
      const header = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__header"
      );
      const content = messageBox.shadowRoot.querySelector(
        ".ea-overlay__content"
      );

      const getBoundingClientRectSpy = vi.spyOn(
        content,
        "getBoundingClientRect"
      );
      getBoundingClientRectSpy.mockReturnValue({
        left: 0,
        top: 0,
        right: 400,
        bottom: 250,
        width: 400,
        height: 250,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      const mousedownEvent = new MouseEvent("mousedown", {
        clientX: 100,
        clientY: 100,
        bubbles: true,
      });
      Object.defineProperty(mousedownEvent, "target", {
        value: header,
        writable: false,
      });
      header.dispatchEvent(mousedownEvent);

      const mouseupEvent = new MouseEvent("mouseup", { bubbles: true });
      window.dispatchEvent(mouseupEvent);

      const mousemoveEvent = new MouseEvent("mousemove", {
        clientX: 300,
        clientY: 300,
        bubbles: true,
      });
      window.dispatchEvent(mousemoveEvent);

      expect(content.style.left).toBe("");
      getBoundingClientRectSpy.mockRestore();
    });
  });

  // ==================== 生命周期深度测试 ====================

  describe("Lifecycle Deep Tests", () => {
    it("component should have role=dialog after mount", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      expect(messageBox.getAttribute("role")).toBe("dialog");
    });

    it("removing and re-adding component should work correctly", async () => {
      const messageBox = createMessageBox({ heading: "Test" });
      container.appendChild(messageBox);
      await waitForRender();
      expect(messageBox.heading).toBe("Test");

      messageBox.remove();
      await waitForRender();
      expect(messageBox.isConnected).toBe(false);

      container.appendChild(messageBox);
      await waitForRender();
      expect(messageBox.isConnected).toBe(true);
    });

    it("component should clean up transition abort controller on unmount", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      expect(() => messageBox.remove()).not.toThrow();
    });

    it("setting visible and immediately removing should not throw", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      messageBox.show();
      messageBox.remove();
      expect(messageBox.isConnected).toBe(false);
    });
  });

  // ==================== 继承属性深度测试 ====================

  describe("Inherited Overlay Attributes Deep Tests", () => {
    it("should support contentLeft attribute", async () => {
      const messageBox = createMessageBox({ "content-left": "100px" });
      await waitForRender();
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-content-left")
      ).toBe("100px");
    });

    it("should support contentTop attribute", async () => {
      const messageBox = createMessageBox({ "content-top": "200px" });
      await waitForRender();
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-content-top")
      ).toBe("200px");
    });

    it("should support contentTranslateX attribute", async () => {
      const messageBox = createMessageBox({
        "content-translate-x": "50%",
      });
      await waitForRender();
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-content-translate-x")
      ).toBe("50%");
    });

    it("should support contentTranslateY attribute", async () => {
      const messageBox = createMessageBox({
        "content-translate-y": "-50%",
      });
      await waitForRender();
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-content-translate-y")
      ).toBe("-50%");
    });

    it("should support contentTransform attribute", async () => {
      const messageBox = createMessageBox({
        "content-transform": "translate(-50%, -50%)",
      });
      await waitForRender();
      expect(
        messageBox.style.getPropertyValue("--ea-overlay-content-transform")
      ).toBe("translate(-50%, -50%)");
    });

    it("modal=false should not add is-modal state class", async () => {
      const messageBox = createMessageBox({ modal: "false" });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-modal")).toBe(false);
    });

    it("modal=true should add is-modal state class", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-modal")).toBe(true);
    });
  });

  // ==================== confirmButtonLoading 深度测试 ====================

  describe("ConfirmButtonLoading Deep Tests", () => {
    it("confirmButtonLoading=true should set loading attribute on confirm button", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      messageBox.confirmButtonLoading = true;
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      expect(confirmBtn.getAttribute("loading")).toBe("true");
    });

    it("confirmButtonLoading=false should not set loading attribute on confirm button", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      expect(confirmBtn.getAttribute("loading")).toBeNull();
    });

    it("confirmButtonLoading=true then false should remove loading attribute", async () => {
      const messageBox = createMessageBox();
      await waitForRender();
      messageBox.confirmButtonLoading = true;
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      expect(confirmBtn.getAttribute("loading")).toBe("true");
      messageBox.confirmButtonLoading = false;
      await waitForRender();
      expect(confirmBtn.getAttribute("loading")).toBe("false");
    });

    it("confirmButtonLoading=true should disable input when showInput=true", async () => {
      const messageBox = createMessageBox({ "show-input": true });
      await waitForRender();
      messageBox.confirmButtonLoading = true;
      await waitForRender();
      const input = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__input"
      );
      expect(input.disabled).toBe(true);
    });

    it("confirmButtonLoading=false should not disable input", async () => {
      const messageBox = createMessageBox({ "show-input": true });
      await waitForRender();
      const input = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__input"
      );
      expect(input.disabled).toBe(false);
    });
  });

  // ==================== 组合场景深度测试 ====================

  describe("Combination Deep Tests", () => {
    it("alert boxType with error variant should have both classes", async () => {
      const messageBox = createMessageBox({
        "box-type": "alert",
        variant: "error",
      });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-alert-box")).toBe(true);
      expect(overlayEl.classList.contains("ea-message-box--error")).toBe(true);
    });

    it("prompt boxType with showInput should have both classes", async () => {
      const messageBox = createMessageBox({
        "box-type": "prompt",
        "show-input": true,
      });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-prompt-box")).toBe(true);
      expect(overlayEl.classList.contains("is-input-visible")).toBe(true);
    });

    it("center with roundButton should apply both modifiers", async () => {
      const messageBox = createMessageBox({
        center: true,
        "round-button": true,
      });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-message-box--center")).toBe(true);
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      expect(confirmBtn.getAttribute("round")).toBe("true");
      expect(cancelBtn.getAttribute("round")).toBe("true");
    });

    it("movable with visible should be draggable", async () => {
      const messageBox = createMessageBox({
        movable: true,
        visible: true,
      });
      await waitForRender();
      const overlayEl = messageBox.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-message-box--draggable")).toBe(
        true
      );
      expect(overlayEl.classList.contains("ea-overlay--open")).toBe(true);
    });

    it("all button-related attributes together should work correctly", async () => {
      const messageBox = createMessageBox({
        "show-cancel-button": true,
        "confirm-button-text": "Yes",
        "cancel-button-text": "No",
        "round-button": true,
        "button-size": "small",
      });
      await waitForRender();
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      expect(confirmBtn.textContent).toBe("Yes");
      expect(cancelBtn.textContent).toBe("No");
      expect(confirmBtn.getAttribute("round")).toBe("true");
      expect(cancelBtn.getAttribute("round")).toBe("true");
      expect(confirmBtn.getAttribute("size")).toBe("small");
      expect(cancelBtn.getAttribute("size")).toBe("small");
    });

    it("input-related attributes together should work correctly", async () => {
      const messageBox = createMessageBox({
        "show-input": true,
        "input-placeholder": "Type here",
        "input-type": "password",
        "input-value": "secret",
      });
      await waitForRender();
      const input = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__input"
      );
      expect(input.getAttribute("placeholder")).toBe("Type here");
      expect(input.getAttribute("type")).toBe("password");
      expect(input.getAttribute("value")).toBe("secret");
    });

    it("variant observer overrides icon attribute when both are set during creation", async () => {
      const messageBox = createMessageBox({
        variant: "success",
        icon: "custom-icon",
      });
      await waitForRender();
      const typeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__type-icon"
      );
      expect(typeIcon.getAttribute("name")).toBe("circle-check");
    });

    it("setting icon after variant has been processed should override variant icon", async () => {
      const messageBox = createMessageBox({ variant: "success" });
      await waitForRender();
      messageBox.setAttribute("icon", "custom-icon");
      await waitForRender();
      const typeIcon = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__type-icon"
      );
      expect(typeIcon.getAttribute("name")).toBe("custom-icon");
    });

    it("setting variant after custom icon should update icon to variant mapping", async () => {
      const messageBox = createMessageBox({ icon: "custom-icon" });
      await waitForRender();
      messageBox.setAttribute("variant", "warning");
      await waitForRender();
      expect(messageBox.icon).toBe("triangle-exclamation");
    });
  });

  // ==================== BeforeClose 深度测试 ====================

  describe("BeforeClose Deep Tests", () => {
    it("beforeClose calling done should allow close", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      let doneCalled = false;
      messageBox.beforeClose = done => {
        doneCalled = true;
        done();
      };
      messageBox.visible = false;
      await waitForRender();
      expect(doneCalled).toBe(true);
    });

    it("beforeClose not calling done should prevent close", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      messageBox.beforeClose = () => {};
      messageBox.visible = false;
      await waitForRender();
      expect(messageBox.visible).toBe(true);
    });

    it("beforeClose=null should allow normal close", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      messageBox.beforeClose = null;
      messageBox.visible = false;
      await waitForRender();
      expect(messageBox.visible).toBe(false);
    });

    it("beforeClose should be called when hiding via hide() method", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      let beforeCloseCalled = false;
      messageBox.beforeClose = done => {
        beforeCloseCalled = true;
        done();
      };
      messageBox.hide();
      await waitForRender();
      expect(beforeCloseCalled).toBe(true);
    });

    it("beforeClose should be called when removing visible attribute", async () => {
      const messageBox = createMessageBox({ visible: true });
      await waitForRender();
      let beforeCloseCalled = false;
      messageBox.beforeClose = done => {
        beforeCloseCalled = true;
        done();
      };
      messageBox.removeAttribute("visible");
      await waitForRender();
      expect(beforeCloseCalled).toBe(true);
    });
  });

  // ==================== ESC 键深度测试 ====================

  describe("ESC Key Deep Tests", () => {
    it("pressing non-ESC key should not trigger any event", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "close-on-press-escape": true,
      });
      await waitForRender();
      const handler = vi.fn();
      messageBox.addEventListener("cancel", handler);
      const enterEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
      });
      document.dispatchEvent(enterEvent);
      await waitForRender();
      expect(handler).not.toHaveBeenCalled();
    });

    it("ESC key with closeOnPressEscape=true and distinguishCancelAndClose=true should trigger message-close", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "close-on-press-escape": true,
      });
      messageBox.distinguishCancelAndClose = true;
      await waitForRender();
      const closeHandler = vi.fn();
      const cancelHandler = vi.fn();
      messageBox.addEventListener("message-close", closeHandler);
      messageBox.addEventListener("cancel", cancelHandler);
      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);
      await waitForRender();
      expect(closeHandler).toHaveBeenCalled();
      expect(cancelHandler).not.toHaveBeenCalled();
    });

    it("ESC key with closeOnPressEscape=true and distinguishCancelAndClose=false should trigger cancel", async () => {
      const messageBox = createMessageBox({
        visible: true,
        "close-on-press-escape": true,
      });
      await waitForRender();
      const cancelHandler = vi.fn();
      const closeHandler = vi.fn();
      messageBox.addEventListener("cancel", cancelHandler);
      messageBox.addEventListener("message-close", closeHandler);
      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);
      await waitForRender();
      expect(cancelHandler).toHaveBeenCalled();
      expect(closeHandler).not.toHaveBeenCalled();
    });
  });

  // ==================== EaMessageBoxInstance 内部逻辑测试 ====================

  describe("EaMessageBoxInstance Internal Logic", () => {
    afterEach(() => {
      document.querySelectorAll("ea-message-box").forEach(el => el.remove());
    });

    it("excluded keys should be set as properties not attributes", async () => {
      const promise = EaMessageBox({
        message: "Test",
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: true,
        confirmButtonLoading: false,
      });
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      expect(messageBox.dangerouslyUseHTMLString).toBe(true);
      expect(messageBox.distinguishCancelAndClose).toBe(true);
      expect(messageBox.confirmButtonLoading).toBe(false);
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      await promise;
    });

    it("inputPattern as excluded key should be set as property", async () => {
      const promise = EaMessageBox.prompt("Enter text", "Input", {
        inputValue: "abc",
        inputPattern: /^[a-z]+$/,
      });
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      expect(messageBox.inputPattern).toEqual(/^[a-z]+$/);
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      const result = await promise;
      expect(result).toBe("confirm");
    });

    it("non-excluded keys should be set as attributes", async () => {
      const promise = EaMessageBox({
        message: "Test",
        heading: "Title",
        variant: "success",
        boxType: "confirm",
      });
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      expect(messageBox.getAttribute("message")).toBe("Test");
      expect(messageBox.getAttribute("heading")).toBe("Title");
      expect(messageBox.getAttribute("variant")).toBe("success");
      expect(messageBox.getAttribute("box-type")).toBe("confirm");
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      await promise;
    });

    it("EaMessageBox.alert should use boxType alert", async () => {
      const promise = EaMessageBox.alert("Alert");
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      expect(messageBox.boxType).toBe("alert");
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      await promise;
    });

    it("EaMessageBox.confirm should use boxType confirm", async () => {
      const promise = EaMessageBox.confirm("Confirm");
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      expect(messageBox.boxType).toBe("confirm");
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      cancelBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      try {
        await promise;
      } catch {
        /* expected */
      }
    });

    it("EaMessageBox.prompt should use boxType prompt", async () => {
      const promise = EaMessageBox.prompt("Prompt");
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      expect(messageBox.boxType).toBe("prompt");
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      cancelBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      try {
        await promise;
      } catch {
        /* expected */
      }
    });

    it("EaMessageBox should resolve with confirm action on confirm click", async () => {
      const promise = EaMessageBox({ message: "Test" });
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      const confirmBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__confirm-button"
      );
      confirmBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      const result = await promise;
      expect(result).toBe("confirm");
    });

    it("EaMessageBox should reject with cancel action on cancel click", async () => {
      const promise = EaMessageBox({
        message: "Test",
        showCancelButton: true,
      });
      await waitForRender();
      const messageBox = document.querySelector("ea-message-box");
      const cancelBtn = messageBox.shadowRoot.querySelector(
        ".ea-message-box-main__cancel-button"
      );
      cancelBtn.click();
      await waitForRender();
      dispatchTransitionEnd(messageBox);
      try {
        await promise;
        expect.fail("Should have rejected");
      } catch (action) {
        expect(action).toBe("cancel");
      }
    });
  });
});
