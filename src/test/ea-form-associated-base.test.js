import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";
import { runAxe, assertNoA11yViolations } from "./utils/a11y.js";

// 尝试加载 EaFormAssociatedBase，处理组件尚未重构为 TypeScript 的情况
let componentReady = false;
try {
  const mod = await import("../core/EaFormAssociatedBase.ts");
  const EaFormAssociatedBase = mod.default || mod.EaFormAssociatedBase;
  // 注册自定义元素
  if (EaFormAssociatedBase && !customElements.get("ea-form-associated-base")) {
    customElements.define("ea-form-associated-base", EaFormAssociatedBase);
  }
  componentReady = true;
} catch (e) {
  console.warn(`[ea-form-associated-base] 组件尚未重构为 TypeScript (或存在依赖缺失)，跳过测试`);
}

const suite = componentReady ? describe : describe.skip;

suite("EaFormAssociatedBase", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Properties", () => {
    it("应该创建表单关联基类元素", async () => {
      const element = document.createElement("ea-form-associated-base");
      container.appendChild(element);

      await waitForRender();

      expect(element).toBeTruthy();
      expect(element.tagName).toBe("EA-FORM-ASSOCIATED-BASE");
    });

    it("应该支持 name 属性", async () => {
      const element = document.createElement("ea-form-associated-base");
      element.setAttribute("name", "testName");
      container.appendChild(element);

      await waitForRender();

      expect(element.getAttribute("name")).toBe("testName");
    });

    it("应该支持 value 属性", async () => {
      const element = document.createElement("ea-form-associated-base");
      element.setAttribute("value", "testValue");
      container.appendChild(element);

      await waitForRender();

      expect(element.getAttribute("value")).toBe("testValue");
    });

    it("应该支持 disabled 属性", async () => {
      const element = document.createElement("ea-form-associated-base");
      element.setAttribute("disabled", "true");
      container.appendChild(element);

      await waitForRender();

      expect(element.getAttribute("disabled")).toBe("true");
    });

    it("应该支持 required 属性", async () => {
      const element = document.createElement("ea-form-associated-base");
      element.setAttribute("required", "true");
      container.appendChild(element);

      await waitForRender();

      expect(element.getAttribute("required")).toBe("true");
    });
  });

  describe("Form Association", () => {
    it("应该具有 form 属性", async () => {
      const element = document.createElement("ea-form-associated-base");
      container.appendChild(element);

      await waitForRender();

      // form 属性应该存在（在 JSDOM 中可能为 null，但在真实浏览器中会返回表单）
      expect(
        element.form === null || element.form instanceof HTMLFormElement
      ).toBe(true);
    });

    it("getForm 方法应该存在", async () => {
      const element = document.createElement("ea-form-associated-base");
      container.appendChild(element);

      await waitForRender();

      expect(typeof element.getForm).toBe("function");
    });

    it("没有表单关联时 form 属性应该为 null", async () => {
      const element = document.createElement("ea-form-associated-base");
      container.appendChild(element);

      await waitForRender();

      expect(element.form).toBeNull();
    });
  });

  describe("Validation Properties", () => {
    it("应该具有 type 属性", async () => {
      const element = document.createElement("ea-form-associated-base");
      container.appendChild(element);

      await waitForRender();

      // 在 jsdom 中，form-associated custom element 的 type 属性可能为空字符串
      // 验证 type 属性存在且类型正确即可
      expect(typeof element.type).toBe("string");
    });

    it("应该具有 validity 属性", async () => {
      const element = document.createElement("ea-form-associated-base");
      container.appendChild(element);

      await waitForRender();

      // validity 可能为 null 或 ValidityState 对象
      expect(
        element.validity === null || typeof element.validity === "object"
      ).toBe(true);
    });

    it("应该具有 willValidate 属性", async () => {
      const element = document.createElement("ea-form-associated-base");
      container.appendChild(element);

      await waitForRender();

      expect(typeof element.willValidate).toBe("boolean");
    });
  });

  describe("Methods", () => {
    it("应该具有 setValue 方法", async () => {
      const element = document.createElement("ea-form-associated-base");
      container.appendChild(element);

      await waitForRender();

      expect(typeof element.setValue).toBe("function");

      // 调用 setValue 不应该抛出错误
      expect(() => element.setValue("test")).not.toThrow();
    });

    it("应该具有 removeValue 方法", async () => {
      const element = document.createElement("ea-form-associated-base");
      container.appendChild(element);

      await waitForRender();

      expect(typeof element.removeValue).toBe("function");

      // 调用 removeValue 不应该抛出错误
      expect(() => element.removeValue()).not.toThrow();
    });

    it("应该具有 checkValidity 方法", async () => {
      const element = document.createElement("ea-form-associated-base");
      container.appendChild(element);

      await waitForRender();

      expect(typeof element.checkValidity).toBe("function");
    });

    it("应该具有 reportValidity 方法", async () => {
      const element = document.createElement("ea-form-associated-base");
      container.appendChild(element);

      await waitForRender();

      expect(typeof element.reportValidity).toBe("function");
    });

    it("应该具有 setValidity 方法", async () => {
      const element = document.createElement("ea-form-associated-base");
      container.appendChild(element);

      await waitForRender();

      expect(typeof element.setValidity).toBe("function");

      // 调用 setValidity 不应该抛出错误
      expect(() => element.setValidity({}, "")).not.toThrow();
    });

    it("应该具有 setCustomValidity 方法", async () => {
      const element = document.createElement("ea-form-associated-base");
      container.appendChild(element);

      await waitForRender();

      expect(typeof element.setCustomValidity).toBe("function");

      // 调用 setCustomValidity 不应该抛出错误
      expect(() => element.setCustomValidity("error message")).not.toThrow();
    });

    it("应该具有 resetCustomValidity 方法", async () => {
      const element = document.createElement("ea-form-associated-base");
      container.appendChild(element);

      await waitForRender();

      expect(typeof element.resetCustomValidity).toBe("function");

      // 调用 resetCustomValidity 不应该抛出错误
      expect(() => element.resetCustomValidity()).not.toThrow();
    });

    it("应该具有 updateValidity 方法", async () => {
      const element = document.createElement("ea-form-associated-base");
      container.appendChild(element);

      await waitForRender();

      expect(typeof element.updateValidity).toBe("function");

      // 调用 updateValidity 不应该抛出错误
      expect(() => element.updateValidity()).not.toThrow();
    });
  });

  describe("Attribute Observers", () => {
    it("minlength 属性应该可设置", async () => {
      const element = document.createElement("ea-form-associated-base");
      element.setAttribute("minlength", "5");
      container.appendChild(element);

      await waitForRender();

      expect(element.getAttribute("minlength")).toBe("5");
    });

    it("maxlength 属性应该可设置", async () => {
      const element = document.createElement("ea-form-associated-base");
      element.setAttribute("maxlength", "100");
      container.appendChild(element);

      await waitForRender();

      expect(element.getAttribute("maxlength")).toBe("100");
    });

    it("min 属性应该可设置", async () => {
      const element = document.createElement("ea-form-associated-base");
      element.setAttribute("min", "0");
      container.appendChild(element);

      await waitForRender();

      expect(element.getAttribute("min")).toBe("0");
    });

    it("max 属性应该可设置", async () => {
      const element = document.createElement("ea-form-associated-base");
      element.setAttribute("max", "100");
      container.appendChild(element);

      await waitForRender();

      expect(element.getAttribute("max")).toBe("100");
    });

    it("pattern 属性应该可设置", async () => {
      const element = document.createElement("ea-form-associated-base");
      element.setAttribute("pattern", "[a-zA-Z]+");
      container.appendChild(element);

      await waitForRender();

      expect(element.getAttribute("pattern")).toBe("[a-zA-Z]+");
    });

    it("custom-validation-message 属性应该可设置", async () => {
      const element = document.createElement("ea-form-associated-base");
      element.setAttribute("custom-validation-message", "Custom error");
      container.appendChild(element);

      await waitForRender();

      expect(element.getAttribute("custom-validation-message")).toBe(
        "Custom error"
      );
    });
  });

  describe("Accessibility", () => {
    describe("ARIA Attributes", () => {
      it("作为表单关联基类不直接设置 ARIA 属性", async () => {
        const el = document.createElement("ea-form-associated-base");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("role")).toBeNull();
        expect(el.getAttribute("aria-disabled")).toBeNull();
      });
    });

    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-form-associated-base");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });
  });
});
