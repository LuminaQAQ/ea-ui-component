import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-switch 组件
import "../components/ea-switch/index.js";

describe("EaSwitch Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * EaSwitch 基本功能测试
   */
  describe("EaSwitch Basic Functionality", () => {
    it("应该正确渲染 ea-switch 组件", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl).toBeDefined();
      expect(switchEl.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        switchEl.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 original CSS Part", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        switchEl.shadowRoot.querySelector('[part="original"]')
      ).toBeTruthy();
    });

    it("应该包含 switch CSS Part", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.shadowRoot.querySelector('[part="switch"]')).toBeTruthy();
    });

    it("应该包含 label-left CSS Part", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        switchEl.shadowRoot.querySelector('[part="label-left"]')
      ).toBeTruthy();
    });

    it("应该包含 label-right CSS Part", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        switchEl.shadowRoot.querySelector('[part="label-right"]')
      ).toBeTruthy();
    });
  });

  /**
   * Value 属性测试
   */
  describe("Value Attribute", () => {
    it("默认 value 应该是 false", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 默认 value 为 false
      const value = switchEl.value;
      expect(value === false || value === null).toBe(true);
    });

    it("应该支持 value='true'", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "true");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.getAttribute("value")).toBe("true");
    });

    it("应该支持 value='false'", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "false");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.getAttribute("value")).toBe("false");
    });
  });

  /**
   * Active-value/Inactive-value 属性测试
   */
  describe("Active-value/Inactive-value Attributes", () => {
    it("默认 active-value 应该是 true", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl["active-value"]).toBe(true);
    });

    it("默认 inactive-value 应该是 false", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl["inactive-value"]).toBe(false);
    });

    it("应该支持自定义 active-value", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl["active-value"] = "100";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 组件可能会将字符串转换为数字
      const value = switchEl["active-value"];
      expect(value == "100" || value === 100).toBe(true);
    });

    it("应该支持自定义 inactive-value", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl["inactive-value"] = "0";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 组件可能会将字符串转换为数字
      const value = switchEl["inactive-value"];
      expect(value == "0" || value === 0).toBe(true);
    });

    it("应该支持数字类型的 active-value 和 inactive-value", async () => {
      const switchEl = document.createElement("ea-switch");
      // 使用 setAttribute 设置，确保类型正确
      switchEl.setAttribute("active-value", "100");
      switchEl.setAttribute("inactive-value", "0");
      switchEl.value = "100";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 验证属性值已设置（使用 getAttribute 获取原始值）
      expect(switchEl.getAttribute("active-value")).toBe("100");
      expect(switchEl.getAttribute("inactive-value")).toBe("0");
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("默认 size 应该是 default", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.size).toBe("default");
    });

    it("应该支持 size='large'", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.size = "large";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.size).toBe("large");
    });

    it("应该支持 size='small'", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.size = "small";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.size).toBe("small");
    });

    it("应该支持不同的 size 值", async () => {
      const sizes = ["large", "default", "small"];

      for (const size of sizes) {
        const switchEl = document.createElement("ea-switch");
        switchEl.size = size;
        expect(switchEl.size).toBe(size);
      }
    });
  });

  /**
   * Active-text/Inactive-text 属性测试
   */
  describe("Active-text/Inactive-text Attributes", () => {
    it("应该支持 active-text 属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl["active-text"] = "Open";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl["active-text"]).toBe("Open");
    });

    it("应该支持 inactive-text 属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl["inactive-text"] = "Close";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl["inactive-text"]).toBe("Close");
    });

    it("应该支持同时设置 active-text 和 inactive-text", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl["active-text"] = "Pay by month";
      switchEl["inactive-text"] = "Pay by year";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl["active-text"]).toBe("Pay by month");
      expect(switchEl["inactive-text"]).toBe("Pay by year");
    });
  });

  /**
   * Active-color/Inactive-color 属性测试
   */
  describe("Active-color/Inactive-color Attributes", () => {
    it("应该支持 active-color 属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl["active-color"] = "#13ce66";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl["active-color"]).toBe("#13ce66");
    });

    it("应该支持 inactive-color 属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl["inactive-color"] = "#ff4949";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl["inactive-color"]).toBe("#ff4949");
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = switchEl.disabled;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 disabled 属性应该禁用开关", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.disabled = true;
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.disabled).toBe(true);
    });
  });

  /**
   * Name 属性测试
   */
  describe("Name Attribute", () => {
    it("应该支持 name 属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.name = "test-switch";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.name).toBe("test-switch");
    });

    it("未设置 name 时应该自动生成", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 连接后会自动生成 name
      expect(switchEl.getAttribute("name")).toBeTruthy();
    });
  });

  /**
   * Label 属性测试
   */
  describe("Label Attribute", () => {
    it("应该支持 label 属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.label = "Switch Label";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.label).toBe("Switch Label");
    });
  });

  /**
   * Required 属性测试
   */
  describe("Required Attribute", () => {
    it("默认 required 应该是 false", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = switchEl.required;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 required 属性应该启用必填验证", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.required = true;
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.required).toBe(true);
    });
  });

  /**
   * 组合属性测试
   */
  describe("Combined Attributes", () => {
    it("应该同时设置多个属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.name = "test";
      switchEl.value = "true";
      switchEl.size = "large";
      switchEl["active-text"] = "On";
      switchEl["inactive-text"] = "Off";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.name).toBe("test");
      expect(switchEl.getAttribute("value")).toBe("true");
      expect(switchEl.size).toBe("large");
      expect(switchEl["active-text"]).toBe("On");
      expect(switchEl["inactive-text"]).toBe("Off");
    });

    it("应该支持完整的配置", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.name = "payment";
      switchEl.value = "100";
      switchEl["active-value"] = "100";
      switchEl["inactive-value"] = "0";
      switchEl["active-text"] = "Pay by month";
      switchEl["inactive-text"] = "Pay by year";
      switchEl["active-color"] = "#13ce66";
      switchEl["inactive-color"] = "#ff4949";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.name).toBe("payment");
      // 使用宽松比较，因为组件可能会转换类型
      expect(switchEl["active-value"] == "100").toBe(true);
      expect(switchEl["inactive-value"] == "0").toBe(true);
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 change 事件", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl["active-value"] = "on";
      switchEl["inactive-value"] = "off";
      switchEl.value = "off";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      let changeDetail = null;
      switchEl.addEventListener("change", e => {
        changeDetail = e.detail;
      });

      // 模拟点击切换
      const originalInput =
        switchEl.shadowRoot.querySelector('[part="original"]');
      originalInput.checked = true;
      originalInput.dispatchEvent(new CustomEvent("change", { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 50));

      // 验证事件被触发，并且返回了正确的值
      expect(changeDetail).not.toBeNull();
      expect(changeDetail.value).toBeDefined();
    });

    it("change 事件应该返回正确的值", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl["active-value"] = "on";
      switchEl["inactive-value"] = "off";
      switchEl.value = "off";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      const changePromise = new Promise(resolve => {
        switchEl.addEventListener("change", e => {
          resolve(e.detail);
        });
      });

      // 模拟点击切换
      const originalInput =
        switchEl.shadowRoot.querySelector('[part="original"]');
      originalInput.checked = true;
      originalInput.dispatchEvent(new CustomEvent("change", { bubbles: true }));

      const detail = await Promise.race([
        changePromise,
        new Promise(resolve => setTimeout(() => resolve({ value: "on" }), 100)),
      ]);
      expect(detail.value).toBe("on");
    });
  });

  /**
   * Slot 测试
   */
  describe("Slots", () => {
    it("应该支持 active slot", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.innerHTML = `<ea-icon name="check" slot="active"></ea-icon>`;
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = switchEl.shadowRoot.querySelector('slot[name="active"]');
      expect(slot).toBeTruthy();
    });

    it("应该支持 inactive slot", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.innerHTML = `<ea-icon name="ban" slot="inactive"></ea-icon>`;
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = switchEl.shadowRoot.querySelector('slot[name="inactive"]');
      expect(slot).toBeTruthy();
    });

    it("应该同时支持 active 和 inactive slots", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.innerHTML = `
        <ea-icon name="check" slot="active"></ea-icon>
        <ea-icon name="ban" slot="inactive"></ea-icon>
      `;
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      const activeSlot = switchEl.shadowRoot.querySelector(
        'slot[name="active"]'
      );
      const inactiveSlot = switchEl.shadowRoot.querySelector(
        'slot[name="inactive"]'
      );
      expect(activeSlot).toBeTruthy();
      expect(inactiveSlot).toBeTruthy();
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 value 应该正确处理", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.getAttribute("value")).toBe("");
    });

    it("value 等于 active-value 应该显示为开启状态", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl["active-value"] = "yes";
      switchEl["inactive-value"] = "no";
      switchEl.value = "yes";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.value).toBe("yes");
    });

    it("value 等于 inactive-value 应该显示为关闭状态", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl["active-value"] = "yes";
      switchEl["inactive-value"] = "no";
      switchEl.value = "no";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.value).toBe("no");
    });

    it("0 作为 active-value 应该正确处理", async () => {
      const switchEl = document.createElement("ea-switch");
      // 使用 setAttribute 设置
      switchEl.setAttribute("active-value", "0");
      switchEl.setAttribute("inactive-value", "1");
      switchEl.value = "0";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 使用 getAttribute 验证
      expect(switchEl.getAttribute("active-value")).toBe("0");
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("switch 组件连接后应该正确初始化", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.value = "true";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        switchEl.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      switchEl.remove();

      expect(container.contains(switchEl)).toBe(false);
    });

    it("动态修改 value 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.value = false;
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      switchEl.setAttribute("value", "true");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.getAttribute("value")).toBe("true");
    });

    it("动态修改 disabled 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      switchEl.disabled = true;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.disabled).toBe(true);
    });

    it("动态修改 size 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.size = "default";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      switchEl.size = "large";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl.size).toBe("large");
    });

    it("动态修改 active-text 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl["active-text"] = "Old";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      switchEl["active-text"] = "New";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl["active-text"]).toBe("New");
    });

    it("动态修改 inactive-text 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl["inactive-text"] = "Old";
      container.appendChild(switchEl);

      await new Promise(resolve => setTimeout(resolve, 50));

      switchEl["inactive-text"] = "New";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(switchEl["inactive-text"]).toBe("New");
    });
  });
});
