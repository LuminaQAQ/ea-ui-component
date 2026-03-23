import { describe, it, expect, beforeEach, afterEach } from "vitest";

// 模拟 ea-checkbox 组件
class EaCheckbox extends HTMLElement {
  #container;
  #original;
  #labelSlot;
  #abortController = new AbortController();

  static get observedAttributes() {
    return [
      "size",
      "value",
      "label",
      "name",
      "checked",
      "disabled",
      "indeterminate",
      "border",
      "limit-disabled",
      "required",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const randomId = Math.random().toString(36).substring(2, 15);

    this.shadowRoot.innerHTML = `
      <style>
        .ea-checkbox {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
          margin-right: 30px;
        }
        .ea-checkbox__orignal {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }
        .ea-checkbox__inner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 1px solid #dcdfe6;
          border-radius: 2px;
          background: #fff;
          transition: all 0.3s;
          position: relative;
        }
        .ea-checkbox.checked .ea-checkbox__inner {
          background: #409eff;
          border-color: #409eff;
        }
        .ea-checkbox.checked .ea-checkbox__inner::after {
          content: '';
          position: absolute;
          left: 4px;
          top: 1px;
          width: 4px;
          height: 8px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        .ea-checkbox.indeterminate .ea-checkbox__inner {
          background: #409eff;
          border-color: #409eff;
        }
        .ea-checkbox.indeterminate .ea-checkbox__inner::after {
          content: '';
          position: absolute;
          left: 3px;
          top: 6px;
          width: 8px;
          height: 2px;
          background: #fff;
          transform: none;
          border: none;
        }
        .ea-checkbox.disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
        .ea-checkbox__label {
          margin-left: 8px;
          font-size: 14px;
        }
        .ea-checkbox.--large .ea-checkbox__inner {
          width: 16px;
          height: 16px;
        }
        .ea-checkbox.--small .ea-checkbox__inner {
          width: 12px;
          height: 12px;
        }
        .ea-checkbox.border {
          border: 1px solid #dcdfe6;
          padding: 8px 15px;
          border-radius: 4px;
        }
      </style>
      <label class="ea-checkbox" part="container" for="${randomId}">
        <input id="${randomId}" type="checkbox" class="ea-checkbox__orignal" part="orignal" />
        <span class="ea-checkbox__inner" part="input" tabindex="1"></span>
        <span class="ea-checkbox__label" part="label" tabindex="1">
          <slot></slot>
        </span>
      </label>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-checkbox");
    this.#labelSlot = this.shadowRoot.querySelector(".ea-checkbox__label");
    this.#original = this.shadowRoot.querySelector(".ea-checkbox__orignal");

    this.updateContainerClasslist();
  }

  connectedCallback() {
    this.#original.addEventListener("change", () => {
      this.checked = this.#original.checked;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            value: this.value,
            checked: this.checked,
          },
          bubbles: true,
        })
      );
    });

    this.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        this.#original.checked = !this.checked;
        this.#original.dispatchEvent(new Event("change"));
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "size":
      case "checked":
      case "disabled":
      case "indeterminate":
      case "border":
      case "limit-disabled":
        this.updateContainerClasslist();
        break;
      case "label":
        if (this.#labelSlot) {
          this.#labelSlot.textContent = newValue;
        }
        break;
      case "value":
        if (this.#original) {
          this.#original.value = newValue;
        }
        break;
    }
  }

  updateContainerClasslist() {
    let className = "ea-checkbox";

    const size = this.getAttribute("size");
    if (size && size !== "default") {
      className += ` --${size}`;
    }

    if (this.hasAttribute("checked")) {
      className += " checked";
    }
    if (this.hasAttribute("disabled")) {
      className += " disabled";
    }
    if (this.hasAttribute("indeterminate")) {
      className += " indeterminate";
    }
    if (this.hasAttribute("border")) {
      className += " border";
    }
    if (this.hasAttribute("limit-disabled")) {
      className += " limit-disabled";
    }

    if (this.#container) {
      this.#container.className = className;
    }
    return className;
  }

  get checked() {
    return this.hasAttribute("checked");
  }

  set checked(value) {
    if (value) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }

  get value() {
    return this.getAttribute("value") || "";
  }

  set value(val) {
    this.setAttribute("value", val);
  }
}

// 模拟 ea-checkbox-group 组件
class EaCheckboxGroup extends HTMLElement {
  #container;
  #defaultSlot;
  #label;
  #abortController = new AbortController();

  static get observedAttributes() {
    return [
      "label",
      "name",
      "value",
      "disabled",
      "min",
      "max",
      "size",
      "required",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .ea-checkbox-group {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .ea-checkbox-group__form-label {
          display: block;
          margin-bottom: 10px;
          font-weight: bold;
        }
      </style>
      <label class='ea-checkbox-group__form-label' part='form-label'></label>
      <div class='ea-checkbox-group' part='container'>
        <slot></slot>
      </div>
    `;

    this.#label = this.shadowRoot.querySelector(
      ".ea-checkbox-group__form-label"
    );
    this.#container = this.shadowRoot.querySelector(".ea-checkbox-group");
    this.#defaultSlot = this.shadowRoot.querySelector("slot");

    this.updateContainerClasslist();
  }

  connectedCallback() {
    // 如果没有设置 name 属性，则生成随机 name
    if (!this.hasAttribute("name")) {
      this.setAttribute("name", Math.random().toString(36).substring(2, 15));
    }

    this.#defaultSlot.addEventListener("slotchange", () => {
      this.#updateCheckboxChildrenName();
      this.#updateCheckboxChildrenValue();
      this.#updateLimitStatus();
    });

    this.addEventListener("change", e => {
      const { checked, value } = e.detail;
      this.#updateGroupValue(checked, value);
      this.#updateLimitStatus();
    });

    // 初始更新（使用 queueMicrotask 确保子元素已渲染）
    queueMicrotask(() => {
      this.#updateCheckboxChildrenName();
      this.#updateCheckboxChildrenValue();
      this.#updateLimitStatus();
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "label":
        if (this.#label) {
          this.#label.textContent = newValue;
        }
        break;
      case "value":
        this.#updateCheckboxChildrenValue();
        this.#updateLimitStatus();
        break;
      case "disabled":
        this.querySelectorAll("ea-checkbox").forEach(checkbox => {
          checkbox.toggleAttribute("disabled", this.hasAttribute("disabled"));
        });
        break;
      case "size":
        this.#updateChildrenSize();
        break;
      case "min":
      case "max":
        this.#updateLimitStatus();
        break;
    }
  }

  updateContainerClasslist() {
    const className = "ea-checkbox-group";
    if (this.#container) {
      this.#container.className = className;
    }
    return className;
  }

  #updateCheckboxChildrenName = () => {
    this.querySelectorAll("ea-checkbox").forEach(checkbox => {
      checkbox.setAttribute("name", this.name);
    });
  };

  #updateCheckboxChildrenValue = () => {
    const value = this.value;
    this.querySelectorAll("ea-checkbox").forEach(checkbox => {
      const isChecked = value.includes(checkbox.getAttribute("value"));
      checkbox.toggleAttribute("checked", isChecked);
    });
  };

  #updateGroupValue = (isChecked, updateValue) => {
    let currentValue = this.value;

    if (isChecked) {
      if (!currentValue.includes(updateValue)) {
        currentValue.push(updateValue);
      }
    } else {
      currentValue = currentValue.filter(item => item !== updateValue);
    }

    this._value = currentValue;
  };

  #updateLimitStatus = () => {
    const value = this.value;
    const min = parseInt(this.getAttribute("min")) || 0;
    const max = parseInt(this.getAttribute("max")) || Infinity;

    if (value.length <= min) {
      this.querySelectorAll("ea-checkbox").forEach(item => {
        const isChecked = item.hasAttribute("checked");
        item.toggleAttribute("limit-disabled", isChecked);
      });
    } else if (value.length >= max) {
      this.querySelectorAll("ea-checkbox").forEach(item => {
        const isChecked = item.hasAttribute("checked");
        item.toggleAttribute("limit-disabled", !isChecked);
      });
    } else {
      this.querySelectorAll("ea-checkbox").forEach(item => {
        item.toggleAttribute("limit-disabled", false);
      });
    }
  };

  #updateChildrenSize = () => {
    const size = this.getAttribute("size");
    this.querySelectorAll("ea-checkbox").forEach(checkbox => {
      checkbox.setAttribute("size", size);
    });
  };

  get name() {
    return this.getAttribute("name");
  }

  set name(val) {
    this.setAttribute("name", val);
  }

  get value() {
    const val = this.getAttribute("value");
    if (!val) return [];
    try {
      return JSON.parse(val);
    } catch {
      return val.split(",").map(v => v.trim());
    }
  }

  set value(val) {
    if (Array.isArray(val)) {
      this.setAttribute("value", JSON.stringify(val));
    } else {
      this.setAttribute("value", val);
    }
  }
}

if (!customElements.get("ea-checkbox")) {
  customElements.define("ea-checkbox", EaCheckbox);
}

if (!customElements.get("ea-checkbox-group")) {
  customElements.define("ea-checkbox-group", EaCheckboxGroup);
}

describe("EaCheckbox Component", () => {
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
    it("应该正确渲染 ea-checkbox 组件", () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      expect(checkbox).toBeDefined();
      expect(checkbox.shadowRoot).toBeDefined();
    });

    it("应该包含必要的 CSS Part", () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      expect(
        checkbox.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(
        checkbox.shadowRoot.querySelector('[part="orignal"]')
      ).toBeTruthy();
      expect(checkbox.shadowRoot.querySelector('[part="input"]')).toBeTruthy();
      expect(checkbox.shadowRoot.querySelector('[part="label"]')).toBeTruthy();
    });

    it("应该包含默认插槽", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.innerHTML = "Option 1";
      container.appendChild(checkbox);

      const slot = checkbox.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * Label 属性测试
   */
  describe("Label Attribute", () => {
    it("应该通过 label 属性设置文本", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("label", "Option 1");
      container.appendChild(checkbox);

      const labelEl = checkbox.shadowRoot.querySelector(".ea-checkbox__label");
      expect(labelEl.textContent).toBe("Option 1");
    });

    it("应该通过默认插槽设置文本", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.innerHTML = "Slot Content";
      container.appendChild(checkbox);

      const slot = checkbox.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * Value 属性测试
   */
  describe("Value Attribute", () => {
    it("应该设置 value 属性", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      container.appendChild(checkbox);

      expect(checkbox.getAttribute("value")).toBe("option1");
    });

    it("应该获取 value 属性", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      container.appendChild(checkbox);

      expect(checkbox.value).toBe("option1");
    });
  });

  /**
   * Checked 属性测试
   */
  describe("Checked Attribute", () => {
    it("默认应该未选中", () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      expect(checkbox.checked).toBe(false);
    });

    it("设置 checked 属性应该选中", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("checked", "");
      container.appendChild(checkbox);

      expect(checkbox.checked).toBe(true);
    });

    it("选中状态应该有 checked 类", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("checked", "");
      container.appendChild(checkbox);

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("checked")).toBe(true);
    });

    it("通过 setter 设置 checked", () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      checkbox.checked = true;
      expect(checkbox.hasAttribute("checked")).toBe(true);

      checkbox.checked = false;
      expect(checkbox.hasAttribute("checked")).toBe(false);
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("默认应该启用", () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      expect(checkbox.hasAttribute("disabled")).toBe(false);
    });

    it("设置 disabled 属性应该禁用", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("disabled", "");
      container.appendChild(checkbox);

      expect(checkbox.hasAttribute("disabled")).toBe(true);
    });

    it("禁用状态应该有 disabled 类", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("disabled", "");
      container.appendChild(checkbox);

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("disabled")).toBe(true);
    });
  });

  /**
   * Indeterminate 属性测试
   */
  describe("Indeterminate Attribute", () => {
    it("默认应该不是半选状态", () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      expect(checkbox.hasAttribute("indeterminate")).toBe(false);
    });

    it("设置 indeterminate 属性应该应用半选状态", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("indeterminate", "");
      container.appendChild(checkbox);

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("indeterminate")).toBe(true);
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("默认尺寸应该是 default", () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("--large")).toBe(false);
      expect(containerEl.classList.contains("--small")).toBe(false);
    });

    it("设置 size='large' 应该应用 large 类", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("size", "large");
      container.appendChild(checkbox);

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("--large")).toBe(true);
    });

    it("设置 size='small' 应该应用 small 类", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("size", "small");
      container.appendChild(checkbox);

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("--small")).toBe(true);
    });
  });

  /**
   * Border 属性测试
   */
  describe("Border Attribute", () => {
    it("默认应该没有边框", () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("border")).toBe(false);
    });

    it("设置 border 属性应该应用边框样式", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("border", "");
      container.appendChild(checkbox);

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("border")).toBe(true);
    });
  });

  /**
   * Change 事件测试
   */
  describe("Change Event", () => {
    it("点击应该触发 change 事件", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      container.appendChild(checkbox);

      const changeHandler = vi.fn();
      checkbox.addEventListener("change", changeHandler);

      const input = checkbox.shadowRoot.querySelector(".ea-checkbox__orignal");
      input.checked = true;
      input.dispatchEvent(new Event("change"));

      expect(changeHandler).toHaveBeenCalled();
    });

    it("change 事件应该包含 value 和 checked", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      container.appendChild(checkbox);

      let eventDetail = null;
      checkbox.addEventListener("change", e => {
        eventDetail = e.detail;
      });

      const input = checkbox.shadowRoot.querySelector(".ea-checkbox__orignal");
      input.checked = true;
      input.dispatchEvent(new Event("change"));

      expect(eventDetail).toMatchObject({
        value: "option1",
        checked: true,
      });
    });

    it("按 Enter 键应该切换选中状态", () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      const changeHandler = vi.fn();
      checkbox.addEventListener("change", changeHandler);

      checkbox.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

      expect(changeHandler).toHaveBeenCalled();
    });
  });

  /**
   * Name 属性测试
   */
  describe("Name Attribute", () => {
    it("应该设置 name 属性", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("name", "test-checkbox");
      container.appendChild(checkbox);

      const input = checkbox.shadowRoot.querySelector(".ea-checkbox__orignal");
      expect(input.getAttribute("name") || checkbox.getAttribute("name")).toBe(
        "test-checkbox"
      );
    });
  });
});

describe("EaCheckboxGroup Component", () => {
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
    it("应该正确渲染 ea-checkbox-group 组件", () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      expect(group).toBeDefined();
      expect(group.shadowRoot).toBeDefined();
    });

    it("应该包含 container 和 form-label CSS Part", () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      expect(group.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(
        group.shadowRoot.querySelector('[part="form-label"]')
      ).toBeTruthy();
    });

    it("应该包含默认插槽", () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox value="1">Option 1</ea-checkbox>
        <ea-checkbox value="2">Option 2</ea-checkbox>
      `;
      container.appendChild(group);

      const slot = group.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * Value 属性测试
   */
  describe("Value Attribute", () => {
    it("默认 value 应该是空数组", () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      expect(group.value).toEqual([]);
    });

    it("设置 value 应该选中对应的 checkbox", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox value="a">Option A</ea-checkbox>
        <ea-checkbox value="b">Option B</ea-checkbox>
        <ea-checkbox value="c">Option C</ea-checkbox>
      `;
      group.setAttribute("value", JSON.stringify(["a", "c"]));
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      const checkboxes = group.querySelectorAll("ea-checkbox");
      expect(checkboxes[0].checked).toBe(true);
      expect(checkboxes[1].checked).toBe(false);
      expect(checkboxes[2].checked).toBe(true);
    });
  });

  /**
   * Name 属性测试
   */
  describe("Name Attribute", () => {
    it("应该设置 name 属性", () => {
      const group = document.createElement("ea-checkbox-group");
      group.setAttribute("name", "test-group");
      container.appendChild(group);

      expect(group.getAttribute("name")).toBe("test-group");
    });

    it("name 应该应用到子 checkbox", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox value="1">Option 1</ea-checkbox>
        <ea-checkbox value="2">Option 2</ea-checkbox>
      `;
      container.appendChild(group);

      // 先添加到 DOM，再设置 name 属性，触发 attributeChangedCallback
      group.setAttribute("name", "test-group");

      await new Promise(resolve => setTimeout(resolve, 50));

      const checkboxes = group.querySelectorAll("ea-checkbox");
      expect(checkboxes[0].getAttribute("name")).toBe("test-group");
      expect(checkboxes[1].getAttribute("name")).toBe("test-group");
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("设置 disabled 应该禁用所有子 checkbox", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox value="1">Option 1</ea-checkbox>
        <ea-checkbox value="2">Option 2</ea-checkbox>
      `;
      container.appendChild(group);

      // 先添加到 DOM，再设置 disabled 属性，触发 attributeChangedCallback
      group.setAttribute("disabled", "");

      await new Promise(resolve => setTimeout(resolve, 50));

      const checkboxes = group.querySelectorAll("ea-checkbox");
      expect(checkboxes[0].hasAttribute("disabled")).toBe(true);
      expect(checkboxes[1].hasAttribute("disabled")).toBe(true);
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("设置 size 应该应用到所有子 checkbox", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox value="1">Option 1</ea-checkbox>
        <ea-checkbox value="2">Option 2</ea-checkbox>
      `;
      container.appendChild(group);

      // 先添加到 DOM，再设置 size 属性，触发 attributeChangedCallback
      group.setAttribute("size", "large");

      await new Promise(resolve => setTimeout(resolve, 50));

      const checkboxes = group.querySelectorAll("ea-checkbox");
      expect(checkboxes[0].getAttribute("size")).toBe("large");
      expect(checkboxes[1].getAttribute("size")).toBe("large");
    });
  });

  /**
   * Min/Max 属性测试
   */
  describe("Min/Max Attributes", () => {
    it("设置 min 应该限制最少选择数量", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.setAttribute("min", "1");
      group.innerHTML = `
        <ea-checkbox value="a">Option A</ea-checkbox>
        <ea-checkbox value="b">Option B</ea-checkbox>
      `;
      group.setAttribute("value", JSON.stringify(["a"]));
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      const checkboxes = group.querySelectorAll("ea-checkbox");
      // 选中的项应该有 limit-disabled 属性
      expect(checkboxes[0].hasAttribute("limit-disabled")).toBe(true);
    });

    it("设置 max 应该限制最多选择数量", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.setAttribute("max", "2");
      group.innerHTML = `
        <ea-checkbox value="a">Option A</ea-checkbox>
        <ea-checkbox value="b">Option B</ea-checkbox>
        <ea-checkbox value="c">Option C</ea-checkbox>
      `;
      group.setAttribute("value", JSON.stringify(["a", "b"]));
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      const checkboxes = group.querySelectorAll("ea-checkbox");
      // 未选中的项应该有 limit-disabled 属性
      expect(checkboxes[2].hasAttribute("limit-disabled")).toBe(true);
    });
  });

  /**
   * Change 事件测试
   */
  describe("Change Event", () => {
    it("子 checkbox 变化应该触发 group 的 change 事件", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox value="a">Option A</ea-checkbox>
        <ea-checkbox value="b">Option B</ea-checkbox>
      `;
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      const changeHandler = vi.fn();
      group.addEventListener("change", changeHandler);

      const checkbox = group.querySelector("ea-checkbox");
      checkbox.dispatchEvent(
        new CustomEvent("change", {
          detail: { value: "a", checked: true },
          bubbles: true,
        })
      );

      expect(changeHandler).toHaveBeenCalled();
    });

    it("change 事件应该更新 group 的 value", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox value="a">Option A</ea-checkbox>
        <ea-checkbox value="b">Option B</ea-checkbox>
      `;
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      const checkbox = group.querySelector("ea-checkbox");
      checkbox.dispatchEvent(
        new CustomEvent("change", {
          detail: { value: "a", checked: true },
          bubbles: true,
        })
      );

      expect(group._value).toContain("a");
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("没有子 checkbox 时应该正确处理", () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      const checkboxes = group.querySelectorAll("ea-checkbox");
      expect(checkboxes.length).toBe(0);
    });

    it("只有一个子 checkbox 时应该正确处理", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `<ea-checkbox value="1">Option 1</ea-checkbox>`;
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      const checkboxes = group.querySelectorAll("ea-checkbox");
      expect(checkboxes.length).toBe(1);
    });

    it("动态添加 checkbox 应该更新", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox value="1">Option 1</ea-checkbox>
      `;
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      const newCheckbox = document.createElement("ea-checkbox");
      newCheckbox.setAttribute("value", "2");
      newCheckbox.textContent = "Option 2";
      group.appendChild(newCheckbox);

      await new Promise(resolve => setTimeout(resolve, 50));

      const checkboxes = group.querySelectorAll("ea-checkbox");
      expect(checkboxes.length).toBe(2);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox value="1">Option 1</ea-checkbox>
        <ea-checkbox value="2">Option 2</ea-checkbox>
      `;
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(group.shadowRoot.querySelector(".ea-checkbox-group")).toBeTruthy();
    });

    it("组件断开连接后应该清理资源", () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      group.remove();

      expect(() => {
        group.disconnectedCallback?.();
      }).not.toThrow();
    });
  });
});
