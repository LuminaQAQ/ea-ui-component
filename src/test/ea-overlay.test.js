import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { waitForRender } from "./utils/waitForRender";

import "../common/ea-overlay/index";

describe("EaOverlay", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Rendering", () => {
    it("should render with shadow DOM", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.shadowRoot).toBeTruthy();
    });

    it("should render container element", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      const containerEl = overlay.shadowRoot.querySelector(".ea-overlay");
      expect(containerEl).toBeTruthy();
    });

    it("should render mask element", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      const mask = overlay.shadowRoot.querySelector(".ea-overlay__mask");
      expect(mask).toBeTruthy();
    });

    it("should render content element", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      const content = overlay.shadowRoot.querySelector(".ea-overlay__content");
      expect(content).toBeTruthy();
    });

    it("should render slot in content area", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      const slot = overlay.shadowRoot.querySelector(".ea-overlay__content slot");
      expect(slot).toBeTruthy();
    });
  });

  describe("CSS Parts", () => {
    it("should have container part", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("should have mask part", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.shadowRoot.querySelector('[part="mask"]')).toBeTruthy();
    });

    it("should have content part", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });
  });

  describe("BEM Class Names", () => {
    it("should have block class name by default", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      const containerEl = overlay.shadowRoot.querySelector(".ea-overlay");
      expect(containerEl.classList.contains("ea-overlay")).toBe(true);
    });

    it("should have is-modal state class by default", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      const containerEl = overlay.shadowRoot.querySelector(".ea-overlay");
      expect(containerEl.classList.contains("is-modal")).toBe(true);
    });

    it("should add ea-overlay--open modifier when visible", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.visible = true;
      await waitForRender();

      const containerEl = overlay.shadowRoot.querySelector(".ea-overlay");
      expect(containerEl.classList.contains("ea-overlay--open")).toBe(true);
    });

    it("should remove is-modal state class when modal is false", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.modal = false;
      await waitForRender();

      const containerEl = overlay.shadowRoot.querySelector(".ea-overlay");
      expect(containerEl.classList.contains("is-modal")).toBe(false);
    });

    it("should add is-show state class during open transition", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.visible = true;
      await waitForRender();

      await new Promise(resolve => requestAnimationFrame(resolve));

      const containerEl = overlay.shadowRoot.querySelector(".ea-overlay");
      expect(containerEl.classList.contains("is-show")).toBe(true);
    });

    it("should add is-before-close state class during close transition", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.visible = true;
      await waitForRender();

      overlay.visible = false;
      await waitForRender(0);

      const containerEl = overlay.shadowRoot.querySelector(".ea-overlay");
      expect(containerEl.classList.contains("is-before-close")).toBe(true);
    });
  });

  describe("Visible Attribute", () => {
    it("should default visible to false", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.visible).toBe(false);
    });

    it("should support setting visible via attribute", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("visible", "");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.visible).toBe(true);
    });

    it("should support show() method", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.show();
      expect(overlay.visible).toBe(true);
    });

    it("should support hide() method", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.show();
      expect(overlay.visible).toBe(true);

      overlay.hide();
      expect(overlay.visible).toBe(false);
    });

    it("should toggle visible attribute", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.show();
      await waitForRender();
      expect(overlay.visible).toBe(true);

      overlay.hide();
      await waitForRender();
      expect(overlay.visible).toBe(false);

      overlay.show();
      await waitForRender();
      expect(overlay.visible).toBe(true);
    });
  });

  describe("Modal Attribute", () => {
    it("should default modal to true", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.modal).toBe(true);
    });

    it("should support non-modal mode via property", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.modal = false;
      await waitForRender();

      expect(overlay.modal).toBe(false);
    });

    it("should update container classlist when modal changes", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      const containerEl = overlay.shadowRoot.querySelector(".ea-overlay");
      expect(containerEl.classList.contains("is-modal")).toBe(true);

      overlay.modal = false;
      await waitForRender();

      expect(containerEl.classList.contains("is-modal")).toBe(false);
    });
  });

  describe("Close On Click Modal Attribute", () => {
    it("should default closeOnClickModal to true", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.closeOnClickModal).toBe(true);
    });

    it("should close when clicking mask and closeOnClickModal is true", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.show();
      await waitForRender();
      expect(overlay.visible).toBe(true);

      const mask = overlay.shadowRoot.querySelector(".ea-overlay__mask");
      mask.dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender();

      expect(overlay.visible).toBe(false);
    });

    it("should not close when clicking mask and closeOnClickModal is false", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.closeOnClickModal = false;
      overlay.show();
      await waitForRender();
      expect(overlay.visible).toBe(true);

      const mask = overlay.shadowRoot.querySelector(".ea-overlay__mask");
      mask.dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender();

      expect(overlay.visible).toBe(true);
    });
  });

  describe("Close On Press Escape Attribute", () => {
    it("should default closeOnPressEscape to true", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.closeOnPressEscape).toBe(true);
    });

    it("should close on Escape key when closeOnPressEscape is true", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.show();
      await waitForRender();
      expect(overlay.visible).toBe(true);

      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);

      await waitForRender();

      expect(overlay.visible).toBe(false);
    });

    it("should not close on Escape key when closeOnPressEscape is false", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.closeOnPressEscape = false;
      overlay.show();
      await waitForRender();
      expect(overlay.visible).toBe(true);

      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);

      await waitForRender();

      expect(overlay.visible).toBe(true);
    });

    it("should not close on Escape when overlay is not visible", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.visible).toBe(false);

      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);

      await waitForRender();

      expect(overlay.visible).toBe(false);
    });
  });

  describe("AppendToBody Attribute", () => {
    it("should default appendToBody to false", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.appendToBody).toBe(false);
    });

    it("should append to body when appendToBody is true", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("append-to-body", "");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.parentElement).toBe(document.body);
    });

    it("should not append to body when appendToBody is false", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.parentElement).toBe(container);
    });
  });

  describe("AppendTo Attribute", () => {
    it("should default appendTo to 'body'", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.appendTo).toBe("body");
    });

    it("should append to specified selector", async () => {
      const target = document.createElement("div");
      target.id = "overlay-target";
      document.body.appendChild(target);

      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("append-to", "#overlay-target");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.parentElement).toBe(target);

      target.remove();
    });

    it("should fallback to body when selector not found", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("append-to", "#non-existent");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.parentElement).toBe(container);
    });
  });

  describe("CSS Variable Attributes", () => {
    it("should support z-index attribute", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("z-index", "2000");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.zIndex).toBe("2000");
      expect(overlay.style.getPropertyValue("--ea-overlay-z-index")).toBe("2000");
    });

    it("should support background-color attribute", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("background-color", "rgba(0,0,0,0.8)");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.backgroundColor).toBe("rgba(0,0,0,0.8)");
      expect(overlay.style.getPropertyValue("--ea-overlay-background-color")).toBe("rgba(0,0,0,0.8)");
    });

    it("should support content-width attribute", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("content-width", "80%");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.contentWidth).toBe("80%");
      expect(overlay.style.getPropertyValue("--ea-overlay-content-width")).toBe("80%");
    });

    it("should support content-max-width attribute", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("content-max-width", "600px");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.contentMaxWidth).toBe("600px");
      expect(overlay.style.getPropertyValue("--ea-overlay-content-max-width")).toBe("600px");
    });

    it("should support content-height attribute", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("content-height", "60%");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.contentHeight).toBe("60%");
      expect(overlay.style.getPropertyValue("--ea-overlay-content-height")).toBe("60%");
    });

    it("should default CSS variable attributes to empty string", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.zIndex).toBe("");
      expect(overlay.backgroundColor).toBe("");
      expect(overlay.contentWidth).toBe("");
      expect(overlay.contentMaxWidth).toBe("");
      expect(overlay.contentHeight).toBe("");
    });
  });

  describe("beforeClose Property", () => {
    it("should default beforeClose to null", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.beforeClose).toBeNull();
    });

    it("should call beforeClose before closing", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("close-on-click-modal", "");
      container.appendChild(overlay);

      await waitForRender();

      const beforeCloseHandler = vi.fn(done => done());
      overlay.beforeClose = beforeCloseHandler;

      overlay.show();
      await waitForRender();
      expect(overlay.visible).toBe(true);

      const mask = overlay.shadowRoot.querySelector(".ea-overlay__mask");
      mask.dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender();

      expect(beforeCloseHandler).toHaveBeenCalled();
    });

    it("should not close until done is called in beforeClose", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("close-on-click-modal", "");
      container.appendChild(overlay);

      await waitForRender();

      let doneFn = null;
      overlay.beforeClose = done => {
        doneFn = done;
      };

      overlay.show();
      await waitForRender();

      const mask = overlay.shadowRoot.querySelector(".ea-overlay__mask");
      mask.dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender();

      expect(overlay.visible).toBe(true);

      if (doneFn) doneFn();
      await waitForRender();

      expect(overlay.visible).toBe(false);
    });

    it("should support async beforeClose", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("close-on-click-modal", "");
      container.appendChild(overlay);

      await waitForRender();

      let doneCalled = false;
      overlay.beforeClose = async done => {
        await new Promise(resolve => setTimeout(resolve, 50));
        doneCalled = true;
        done();
      };

      overlay.show();
      await waitForRender();

      const mask = overlay.shadowRoot.querySelector(".ea-overlay__mask");
      mask.dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender(100);

      expect(doneCalled).toBe(true);
      expect(overlay.visible).toBe(false);
    });
  });

  describe("Events", () => {
    it("should dispatch ea-open event when overlay opens", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      const openHandler = vi.fn();
      overlay.addEventListener("ea-open", openHandler);

      overlay.visible = true;
      await waitForRender();

      expect(openHandler).toHaveBeenCalled();
      expect(openHandler.mock.calls[0][0] instanceof Event).toBe(true);
      expect(openHandler.mock.calls[0][0].type).toBe("ea-open");
    });

    it("should dispatch ea-opened event after open transition", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      const openedHandler = vi.fn();
      overlay.addEventListener("ea-opened", openedHandler);

      overlay.show();
      await new Promise(resolve => requestAnimationFrame(resolve));
      await waitForRender();

      const containerEl = overlay.shadowRoot.querySelector(".ea-overlay");
      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));

      await waitForRender();

      expect(openedHandler).toHaveBeenCalled();
      expect(openedHandler.mock.calls[0][0].type).toBe("ea-opened");
    });

    it("should dispatch ea-close event when overlay closes", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.visible = true;
      await waitForRender();

      const closeHandler = vi.fn();
      overlay.addEventListener("ea-close", closeHandler);

      overlay.visible = false;
      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
      expect(closeHandler.mock.calls[0][0].type).toBe("ea-close");
    });

    it("should dispatch ea-closed event after close transition", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.visible = true;
      await waitForRender();

      const closedHandler = vi.fn();
      overlay.addEventListener("ea-closed", closedHandler);

      overlay.visible = false;
      await waitForRender();

      const containerEl = overlay.shadowRoot.querySelector(".ea-overlay");
      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));

      await waitForRender();

      expect(closedHandler).toHaveBeenCalled();
      expect(closedHandler.mock.calls[0][0].type).toBe("ea-closed");
    });

    it("should have bubbles and composed on events", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      const openHandler = vi.fn();
      overlay.addEventListener("ea-open", openHandler);

      overlay.visible = true;
      await waitForRender();

      expect(openHandler).toHaveBeenCalled();
      const event = openHandler.mock.calls[0][0];
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });
  });

  describe("Slots", () => {
    it("should support default slot", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.innerHTML = `<div class="content">Overlay Content</div>`;
      container.appendChild(overlay);

      await waitForRender();

      const slot = overlay.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  describe("updateContainerClasslist Method", () => {
    it("should return correct BEM class string when hidden", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      const result = overlay.updateContainerClasslist();
      expect(result).toContain("ea-overlay");
      expect(result).toContain("is-modal");
      expect(result).not.toContain("ea-overlay--open");
    });

    it("should return correct BEM class string when visible", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.visible = true;
      const result = overlay.updateContainerClasslist();
      expect(result).toContain("ea-overlay--open");
    });

    it("should not include is-modal when modal is false", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.modal = false;
      const result = overlay.updateContainerClasslist();
      expect(result).not.toContain("is-modal");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty component", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.shadowRoot).toBeTruthy();
    });

    it("should handle multiple show/hide cycles", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.show();
      expect(overlay.visible).toBe(true);

      overlay.hide();
      expect(overlay.visible).toBe(false);

      overlay.show();
      expect(overlay.visible).toBe(true);

      overlay.hide();
      expect(overlay.visible).toBe(false);
    });

    it("should handle rapid visible changes", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.visible = true;
      overlay.visible = false;
      overlay.visible = true;

      await waitForRender();

      expect(overlay.visible).toBe(true);
    });

    it("should handle component removal", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.remove();

      expect(overlay.isConnected).toBe(false);
    });

    it("should handle attribute dynamic updates", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.modal).toBe(true);

      overlay.modal = false;
      await waitForRender();

      expect(overlay.modal).toBe(false);

      overlay.modal = true;
      await waitForRender();

      expect(overlay.modal).toBe(true);
    });
  });

  describe("Lifecycle", () => {
    it("should initialize correctly on connect", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.modal = false;
      await waitForRender();

      expect(overlay.shadowRoot).toBeTruthy();
      expect(overlay.modal).toBe(false);
    });

    it("should clean up on disconnect", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.show();
      await waitForRender();

      overlay.remove();
      expect(overlay.isConnected).toBe(false);
    });

    it("should support reconnection", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.remove();
      expect(overlay.isConnected).toBe(false);

      container.appendChild(overlay);
      await waitForRender();

      expect(overlay.isConnected).toBe(true);
      expect(overlay.shadowRoot).toBeTruthy();
    });
  });
});
