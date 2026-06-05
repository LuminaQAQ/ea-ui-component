import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";
import { runAxe, assertNoA11yViolations } from "./utils/a11y";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

import "../components/ea-segmented/index";

describe("EaSegmented Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.style.width = "600px";
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  function createSegmented(attrs = {}, options = null) {
    const el = document.createElement("ea-segmented");
    Object.entries(attrs).forEach(([key, val]) => {
      if (val === true) {
        el.setAttribute(key, "");
      } else if (val !== false && val != null) {
        el.setAttribute(key, val);
      }
    });
    if (options !== null) el.options = options;
    return el;
  }

  describe("基础渲染", () => {
    it("应该正确创建 Shadow DOM", async () => {
      const segmented = createSegmented({ name: "test" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.shadowRoot).toBeDefined();
      expect(segmented.shadowRoot.nodeType).toBe(11);
    });

    it("应该包含 .ea-segmented 容器元素", async () => {
      const segmented = createSegmented({ name: "test" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      const el = segmented.shadowRoot.querySelector(".ea-segmented");
      expect(el).toBeTruthy();
      expect(el.getAttribute("part")).toBe("container");
    });

    it("应该包含所有必需的 CSS Parts", async () => {
      const segmented = createSegmented({ name: "test" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      expect(
        segmented.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(segmented.shadowRoot.querySelector('[part="item"]')).toBeTruthy();
      expect(segmented.shadowRoot.querySelector('[part="label"]')).toBeTruthy();
      expect(segmented.shadowRoot.querySelector('[part="input"]')).toBeTruthy();
      expect(
        segmented.shadowRoot.querySelector('[part="indicator"]')
      ).toBeTruthy();
    });

    it("应该渲染 indicator 元素", async () => {
      const segmented = createSegmented({ name: "test" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      const indicator = segmented.shadowRoot.querySelector(
        ".ea-segmented__indicator"
      );
      expect(indicator).toBeTruthy();
      expect(indicator.getAttribute("part")).toBe("indicator");
    });

    it("无 options 时不应渲染 item", async () => {
      const segmented = createSegmented({ name: "test" }, []);
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items.length).toBe(0);
    });
  });

  describe("Options 属性", () => {
    it("应该支持字符串数组选项", async () => {
      const segmented = createSegmented({ name: "week" }, [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items.length).toBe(5);
    });

    it("应该支持对象数组选项", async () => {
      const segmented = createSegmented({ name: "fruit" }, [
        { label: "Apple", value: "Apple" },
        { label: "Cherry", value: "Cherry" },
        { label: "Grape", value: "Grape" },
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items.length).toBe(3);

      const inputs = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__original"
      );
      expect(inputs[0].value).toBe("Apple");
      expect(inputs[1].value).toBe("Cherry");
      expect(inputs[2].value).toBe("Grape");
    });

    it("字符串选项的 label 应该等于 value", async () => {
      const segmented = createSegmented({ name: "week" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const labels = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__label"
      );
      expect(labels[0].textContent.trim()).toBe("Mon");
      expect(labels[1].textContent.trim()).toBe("Tue");
      expect(labels[2].textContent.trim()).toBe("Wed");
    });

    it("对象选项的 label 应该使用 propsConfiguration.label 字段", async () => {
      const segmented = createSegmented({ name: "fruit" }, [
        { label: "苹果", value: "apple" },
        { label: "樱桃", value: "cherry" },
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const labels = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__label"
      );
      expect(labels[0].textContent.trim()).toBe("苹果");
      expect(labels[1].textContent.trim()).toBe("樱桃");
    });

    it("每个选项应该渲染 label 和 input 子元素", async () => {
      const segmented = createSegmented({ name: "week" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      items.forEach(item => {
        expect(item.querySelector(".ea-segmented__original")).toBeTruthy();
        expect(item.querySelector(".ea-segmented__label")).toBeTruthy();
      });
    });

    it("input 应该是 radio 类型", async () => {
      const segmented = createSegmented({ name: "week" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      const inputs = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__original"
      );
      inputs.forEach(input => {
        expect(input.type).toBe("radio");
      });
    });

    it("input 的 name 应该等于组件的 name 属性", async () => {
      const segmented = createSegmented({ name: "myGroup" }, ["A", "B"]);
      container.appendChild(segmented);
      await waitForRender();

      const inputs = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__original"
      );
      inputs.forEach(input => {
        expect(input.name).toBe("myGroup");
      });
    });

    it("设置 options 时如果没有 name 应该自动生成并警告", async () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const segmented = document.createElement("ea-segmented");
      segmented.options = ["A", "B"];
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.hasAttribute("name")).toBe(true);
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it("设置 options 时如果已有 name 不应覆盖", async () => {
      const segmented = createSegmented({ name: "myName" }, ["A", "B"]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.name).toBe("myName");
    });

    it("空 options 应该不渲染任何选项", async () => {
      const segmented = createSegmented({ name: "week" }, []);
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items.length).toBe(0);
    });

    it("应该支持动态更新 options", async () => {
      const segmented = createSegmented({ name: "week" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      expect(
        segmented.shadowRoot.querySelectorAll(".ea-segmented__item").length
      ).toBe(2);

      segmented.options = ["Mon", "Tue", "Wed", "Thu"];
      await waitForRender();

      expect(
        segmented.shadowRoot.querySelectorAll(".ea-segmented__item").length
      ).toBe(4);
    });

    it("动态更新 options 后 label 应该正确", async () => {
      const segmented = createSegmented({ name: "week" }, ["Mon"]);
      container.appendChild(segmented);
      await waitForRender();

      segmented.options = ["Tue", "Wed"];
      await waitForRender();

      const labels = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__label"
      );
      expect(labels[0].textContent.trim()).toBe("Tue");
      expect(labels[1].textContent.trim()).toBe("Wed");
    });

    it("应该处理重复的选项值", async () => {
      const segmented = createSegmented({ name: "week" }, [
        "Mon",
        "Mon",
        "Tue",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items.length).toBe(3);
    });

    it("应该处理包含特殊字符的选项", async () => {
      const segmented = createSegmented({ name: "test" }, [
        "Option 1",
        "Option-2",
        "Option_3",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const labels = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__label"
      );
      expect(labels[0].textContent.trim()).toBe("Option 1");
      expect(labels[1].textContent.trim()).toBe("Option-2");
      expect(labels[2].textContent.trim()).toBe("Option_3");
    });

    it("应该处理很长的选项文本", async () => {
      const segmented = createSegmented({ name: "test" }, [
        "Short",
        "This is a very long option text that should still render correctly",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items.length).toBe(2);
    });

    it("label 元素应该显示选项文本", async () => {
      const segmented = createSegmented({ name: "week" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      const labels = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__label"
      );
      expect(labels[0].textContent).toBe("Mon");
      expect(labels[1].textContent).toBe("Tue");
    });
  });

  describe("Value 属性", () => {
    it("默认 value 应该是空字符串", async () => {
      const segmented = createSegmented({ name: "week" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.value).toBe("");
    });

    it("应该支持 value 属性设置默认值", async () => {
      const segmented = createSegmented({ name: "week", value: "Tue" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.value).toBe("Tue");
    });

    it("选中的选项应该有 is-checked 类", async () => {
      const segmented = createSegmented({ name: "week", value: "Tue" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items[0].classList.contains("is-checked")).toBe(false);
      expect(items[1].classList.contains("is-checked")).toBe(true);
      expect(items[2].classList.contains("is-checked")).toBe(false);
    });

    it("选中的 input 应该有 checked 属性", async () => {
      const segmented = createSegmented({ name: "week", value: "Tue" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const inputs = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__original"
      );
      expect(inputs[0].checked).toBe(false);
      expect(inputs[1].checked).toBe(true);
    });

    it("应该支持动态更新 value", async () => {
      const segmented = createSegmented({ name: "week", value: "Mon" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.value).toBe("Mon");

      segmented.value = "Wed";
      await waitForRender();

      expect(segmented.value).toBe("Wed");
    });

    it("动态更新 value 后 is-checked 类应该正确切换", async () => {
      const segmented = createSegmented({ name: "week", value: "Mon" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      segmented.value = "Wed";
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items[0].classList.contains("is-checked")).toBe(false);
      expect(items[2].classList.contains("is-checked")).toBe(true);
    });

    it("对象选项的 value 应该使用 propsConfiguration.value 字段匹配", async () => {
      const segmented = createSegmented({ name: "fruit", value: "cherry" }, [
        { label: "Apple", value: "apple" },
        { label: "Cherry", value: "cherry" },
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items[0].classList.contains("is-checked")).toBe(false);
      expect(items[1].classList.contains("is-checked")).toBe(true);
    });

    it("对象选项的 checked 属性应该被尊重", async () => {
      const segmented = createSegmented({ name: "week" }, [
        { label: "Mon", value: "Mon" },
        { label: "Tue", value: "Tue", checked: true },
        { label: "Wed", value: "Wed" },
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items[1].classList.contains("is-checked")).toBe(true);
    });
  });

  describe("Size 属性", () => {
    it("默认 size 应该是空字符串", async () => {
      const segmented = createSegmented({ name: "week" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.size).toBe("");
    });

    it("应该支持所有 size 类型", async () => {
      const sizes = ["large", "default", "small"];

      for (const size of sizes) {
        const segmented = createSegmented({ name: "week", size }, [
          "Mon",
          "Tue",
        ]);
        container.appendChild(segmented);
        await waitForRender();

        expect(segmented.size).toBe(size);
        container.removeChild(segmented);
      }
    });

    it("size 变化时应该正确更新容器 class", async () => {
      const segmented = createSegmented({ name: "week" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      const containerEl = segmented.shadowRoot.querySelector(".ea-segmented");

      segmented.setAttribute("size", "large");
      await waitForRender();

      expect(containerEl.classList.contains("ea-segmented--large")).toBe(true);

      segmented.setAttribute("size", "small");
      await waitForRender();

      expect(containerEl.classList.contains("ea-segmented--small")).toBe(true);
      expect(containerEl.classList.contains("ea-segmented--large")).toBe(false);
    });

    it("size 属性变化时应该正确更新", async () => {
      const segmented = createSegmented({ name: "week", size: "large" }, [
        "Mon",
        "Tue",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.size).toBe("large");

      segmented.setAttribute("size", "small");
      await waitForRender();

      expect(segmented.size).toBe("small");
    });
  });

  describe("Direction 属性", () => {
    it("默认 direction 应该是空字符串", async () => {
      const segmented = createSegmented({ name: "week" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.direction).toBe("");
    });

    it("应该支持所有 direction 类型", async () => {
      const directions = ["horizontal", "vertical"];

      for (const direction of directions) {
        const segmented = createSegmented({ name: "week", direction }, [
          "Mon",
          "Tue",
        ]);
        container.appendChild(segmented);
        await waitForRender();

        expect(segmented.direction).toBe(direction);
        container.removeChild(segmented);
      }
    });

    it("direction 变化时应该正确更新容器 class", async () => {
      const segmented = createSegmented({ name: "week" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      const containerEl = segmented.shadowRoot.querySelector(".ea-segmented");

      segmented.setAttribute("direction", "horizontal");
      await waitForRender();

      expect(containerEl.classList.contains("is-horizontal")).toBe(true);

      segmented.setAttribute("direction", "vertical");
      await waitForRender();

      expect(containerEl.classList.contains("is-vertical")).toBe(true);
      expect(containerEl.classList.contains("is-horizontal")).toBe(false);
    });
  });

  describe("Disabled 属性", () => {
    it("默认 disabled 应该是 false", async () => {
      const segmented = createSegmented({ name: "week" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.disabled).toBe(false);
    });

    it("应该支持 disabled 属性设置为 true", async () => {
      const segmented = createSegmented({ name: "week", disabled: true }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.disabled).toBe(true);
    });

    it("disabled 属性应该可以动态移除", async () => {
      const segmented = createSegmented({ name: "week", disabled: true }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.disabled).toBe(true);

      segmented.removeAttribute("disabled");
      await waitForRender();

      expect(segmented.disabled).toBe(false);
    });

    it("禁用状态下所有 input 应该被禁用", async () => {
      const segmented = createSegmented({ name: "week", disabled: true }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const inputs = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__original"
      );
      inputs.forEach(input => {
        expect(input.disabled).toBe(true);
      });
    });

    it("禁用状态下所有 item 应该有 is-disabled 类", async () => {
      const segmented = createSegmented({ name: "week", disabled: true }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      items.forEach(item => {
        expect(item.classList.contains("is-disabled")).toBe(true);
      });
    });

    it("disabled 不应该在容器上添加 is-disabled 类", async () => {
      const segmented = createSegmented({ name: "week" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      const containerEl = segmented.shadowRoot.querySelector(".ea-segmented");
      expect(containerEl.classList.contains("is-disabled")).toBe(false);

      segmented.setAttribute("disabled", "");
      await waitForRender();

      expect(containerEl.classList.contains("is-disabled")).toBe(false);
    });

    it("应该支持 options 中的 disabled 属性", async () => {
      const segmented = createSegmented({ name: "week" }, [
        { label: "Mon", value: "Mon", disabled: true },
        { label: "Tue", value: "Tue" },
        { label: "Wed", value: "Wed", disabled: true },
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items[0].classList.contains("is-disabled")).toBe(true);
      expect(items[1].classList.contains("is-disabled")).toBe(false);
      expect(items[2].classList.contains("is-disabled")).toBe(true);
    });

    it("单个选项 disabled 时对应的 input 应该被禁用", async () => {
      const segmented = createSegmented({ name: "week" }, [
        { label: "Mon", value: "Mon", disabled: true },
        { label: "Tue", value: "Tue" },
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const inputs = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__original"
      );
      expect(inputs[0].disabled).toBe(true);
      expect(inputs[1].disabled).toBe(false);
    });

    it("组件全局 disabled 时，选项级 disabled 也应该生效", async () => {
      const segmented = createSegmented({ name: "week", disabled: true }, [
        { label: "Mon", value: "Mon" },
        { label: "Tue", value: "Tue" },
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const inputs = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__original"
      );
      inputs.forEach(input => {
        expect(input.disabled).toBe(true);
      });
    });
  });

  describe("Block 属性", () => {
    it("默认 block 应该是 false", async () => {
      const segmented = createSegmented({ name: "week" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.block).toBe(false);
    });

    it("应该支持 block 属性设置为 true", async () => {
      const segmented = createSegmented({ name: "week", block: true }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.block).toBe(true);
    });

    it("block 变化时应该正确更新容器 class", async () => {
      const segmented = createSegmented({ name: "week" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      const containerEl = segmented.shadowRoot.querySelector(".ea-segmented");
      expect(containerEl.classList.contains("is-block")).toBe(false);

      segmented.setAttribute("block", "");
      await waitForRender();

      expect(containerEl.classList.contains("is-block")).toBe(true);
    });

    it("block 属性应该可以动态移除", async () => {
      const segmented = createSegmented({ name: "week", block: true }, [
        "Mon",
        "Tue",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.block).toBe(true);

      segmented.removeAttribute("block");
      await waitForRender();

      expect(segmented.block).toBe(false);
    });
  });

  describe("Name 属性", () => {
    it("默认 name 应该是空字符串", async () => {
      const segmented = document.createElement("ea-segmented");
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.name).toBe("");
    });

    it("应该支持 name 属性设置", async () => {
      const segmented = createSegmented({ name: "myGroup" }, ["A", "B"]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.name).toBe("myGroup");
    });

    it("name 属性应该映射到 input 的 name", async () => {
      const segmented = createSegmented({ name: "radioGroup" }, ["A", "B"]);
      container.appendChild(segmented);
      await waitForRender();

      const inputs = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__original"
      );
      inputs.forEach(input => {
        expect(input.name).toBe("radioGroup");
      });
    });
  });

  describe("PropsConfiguration 属性", () => {
    it("默认 propsConfiguration 应该包含 label, value, disabled", async () => {
      const segmented = createSegmented({ name: "week" });
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.propsConfiguration).toEqual({
        label: "label",
        value: "value",
        disabled: "disabled",
      });
    });

    it("应该支持自定义 propsConfiguration", async () => {
      const segmented = createSegmented({ name: "week" });
      segmented.propsConfiguration = {
        label: "myLabel",
        value: "myValue",
        disabled: "myDisabled",
      };
      segmented.options = [
        { myLabel: "Mon", myValue: "Mon", myDisabled: true },
        { myLabel: "Tue", myValue: "Tue" },
      ];
      container.appendChild(segmented);
      await waitForRender();

      const labels = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__label"
      );
      expect(labels[0].textContent.trim()).toBe("Mon");
      expect(labels[1].textContent.trim()).toBe("Tue");
    });

    it("自定义 propsConfiguration 的 disabled 字段应该生效", async () => {
      const segmented = createSegmented({ name: "week" });
      segmented.propsConfiguration = {
        label: "text",
        value: "key",
        disabled: "isLocked",
      };
      segmented.options = [
        { text: "A", key: "a", isLocked: true },
        { text: "B", key: "b" },
      ];
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items[0].classList.contains("is-disabled")).toBe(true);
      expect(items[1].classList.contains("is-disabled")).toBe(false);
    });

    it("自定义 propsConfiguration 的 value 字段应该用于匹配", async () => {
      const segmented = createSegmented({ name: "week", value: "b" });
      segmented.propsConfiguration = {
        label: "text",
        value: "key",
        disabled: "isLocked",
      };
      segmented.options = [
        { text: "A", key: "a" },
        { text: "B", key: "b" },
      ];
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items[0].classList.contains("is-checked")).toBe(false);
      expect(items[1].classList.contains("is-checked")).toBe(true);
    });
  });

  describe("BEM 类名", () => {
    it("容器应该有 ea-segmented 基础类名", async () => {
      const segmented = createSegmented({ name: "week" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      const containerEl = segmented.shadowRoot.querySelector(".ea-segmented");
      expect(containerEl.classList.contains("ea-segmented")).toBe(true);
    });

    it("size 应该生成正确的修饰符类名", async () => {
      const segmented = createSegmented({ name: "week", size: "large" }, [
        "Mon",
        "Tue",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const containerEl = segmented.shadowRoot.querySelector(".ea-segmented");
      expect(containerEl.classList.contains("ea-segmented--large")).toBe(true);
    });

    it("direction 应该生成正确的状态类名", async () => {
      const segmented = createSegmented(
        { name: "week", direction: "vertical" },
        ["Mon", "Tue"]
      );
      container.appendChild(segmented);
      await waitForRender();

      const containerEl = segmented.shadowRoot.querySelector(".ea-segmented");
      expect(containerEl.classList.contains("is-vertical")).toBe(true);
    });

    it("block 应该生成正确的状态类名", async () => {
      const segmented = createSegmented({ name: "week", block: true }, [
        "Mon",
        "Tue",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const containerEl = segmented.shadowRoot.querySelector(".ea-segmented");
      expect(containerEl.classList.contains("is-block")).toBe(true);
    });

    it("disabled 不应该在容器上生成状态类名（仅影响 item）", async () => {
      const segmented = createSegmented({ name: "week", disabled: true }, [
        "Mon",
        "Tue",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const containerEl = segmented.shadowRoot.querySelector(".ea-segmented");
      expect(containerEl.classList.contains("is-disabled")).toBe(false);

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      items.forEach(item => {
        expect(item.classList.contains("is-disabled")).toBe(true);
      });
    });

    it("多个修饰符和状态应该同时存在", async () => {
      const segmented = createSegmented(
        { name: "week", size: "large", direction: "vertical", block: true },
        ["Mon", "Tue"]
      );
      container.appendChild(segmented);
      await waitForRender();

      const containerEl = segmented.shadowRoot.querySelector(".ea-segmented");
      expect(containerEl.classList.contains("ea-segmented--large")).toBe(true);
      expect(containerEl.classList.contains("is-vertical")).toBe(true);
      expect(containerEl.classList.contains("is-block")).toBe(true);
    });

    it("item 应该有 ea-segmented__item 类名", async () => {
      const segmented = createSegmented({ name: "week" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      items.forEach(item => {
        expect(item.classList.contains("ea-segmented__item")).toBe(true);
      });
    });

    it("label 应该有 ea-segmented__label 类名", async () => {
      const segmented = createSegmented({ name: "week" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      const labels = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__label"
      );
      labels.forEach(label => {
        expect(label.classList.contains("ea-segmented__label")).toBe(true);
      });
    });

    it("original input 应该有 ea-segmented__original 类名", async () => {
      const segmented = createSegmented({ name: "week" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      const inputs = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__original"
      );
      inputs.forEach(input => {
        expect(input.classList.contains("ea-segmented__original")).toBe(true);
      });
    });

    it("indicator 应该有 ea-segmented__indicator 类名", async () => {
      const segmented = createSegmented({ name: "week" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      const indicator = segmented.shadowRoot.querySelector(
        ".ea-segmented__indicator"
      );
      expect(indicator.classList.contains("ea-segmented__indicator")).toBe(
        true
      );
    });
  });

  describe("事件", () => {
    it("应该触发 change 事件当选项改变时", async () => {
      const segmented = createSegmented({ name: "week" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const changeHandler = vi.fn();
      segmented.addEventListener("change", changeHandler);

      const input = segmented.shadowRoot.querySelector('input[value="Tue"]');
      input.click();
      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });

    it("change 事件应该包含选中的 value", async () => {
      const segmented = createSegmented({ name: "week" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      let eventDetail = null;
      segmented.addEventListener("change", e => {
        eventDetail = e.detail;
      });

      const input = segmented.shadowRoot.querySelector('input[value="Wed"]');
      input.click();
      await waitForRender();

      expect(eventDetail).toBeTruthy();
      expect(eventDetail.value).toBe("Wed");
    });

    it("点击选项后 value 应该更新", async () => {
      const segmented = createSegmented({ name: "week" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const input = segmented.shadowRoot.querySelector('input[value="Tue"]');
      input.click();
      await waitForRender();

      expect(segmented.value).toBe("Tue");
    });

    it("点击选项后 is-checked 类应该正确切换", async () => {
      const segmented = createSegmented({ name: "week", value: "Mon" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const input = segmented.shadowRoot.querySelector('input[value="Wed"]');
      input.click();
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items[0].classList.contains("is-checked")).toBe(false);
      expect(items[2].classList.contains("is-checked")).toBe(true);
    });

    it("change 事件应该是 EaSegmentedChangeEvent 实例", async () => {
      const segmented = createSegmented({ name: "week" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      let receivedEvent = null;
      segmented.addEventListener("change", e => {
        receivedEvent = e;
      });

      const input = segmented.shadowRoot.querySelector('input[value="Tue"]');
      input.click();
      await waitForRender();

      expect(receivedEvent).toBeTruthy();
      expect(receivedEvent.type).toBe("change");
      expect(receivedEvent.bubbles).toBe(true);
      expect(receivedEvent.composed).toBe(true);
    });

    it("原生 change 事件不应泄漏到组件外部", async () => {
      const segmented = createSegmented({ name: "week" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      const nativeChangeHandler = vi.fn();
      segmented.addEventListener("change", (e) => {
        if (!e.detail) nativeChangeHandler();
      });

      const input = segmented.shadowRoot.querySelector('input[value="Tue"]');
      input.click();
      await waitForRender();

      expect(nativeChangeHandler).not.toHaveBeenCalled();
    });
  });

  describe("指示器位置", () => {
    it("选中选项时应该设置 CSS 自定义属性", async () => {
      const segmented = createSegmented({ name: "week", value: "Mon" }, [
        "Mon",
        "Tue",
      ]);
      container.appendChild(segmented);
      await waitForRender(200);

      const width = segmented.style.getPropertyValue(
        "--ea-segmented-indicator-width"
      );
      const height = segmented.style.getPropertyValue(
        "--ea-segmented-indicator-height"
      );
      const posX = segmented.style.getPropertyValue(
        "--ea-segmented-indicator-position-x"
      );
      const posY = segmented.style.getPropertyValue(
        "--ea-segmented-indicator-position-y"
      );

      expect(width).toBeTruthy();
      expect(height).toBeTruthy();
      expect(posX).not.toBeUndefined();
      expect(posY).not.toBeUndefined();
    });

    it("切换选项后 CSS 自定义属性应该更新", async () => {
      const segmented = createSegmented({ name: "week", value: "Mon" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender(200);

      segmented.value = "Wed";
      await waitForRender(200);

      const posX = segmented.style.getPropertyValue(
        "--ea-segmented-indicator-position-x"
      );
      expect(posX).toBeTruthy();
    });

    it("value 不在 options 中时不应设置 CSS 自定义属性", async () => {
      const segmented = createSegmented({ name: "week", value: "NotFound" }, [
        "Mon",
        "Tue",
      ]);
      container.appendChild(segmented);
      await waitForRender(200);

      const width = segmented.style.getPropertyValue(
        "--ea-segmented-indicator-width"
      );
      expect(width).toBe("");
    });
  });

  describe("生命周期", () => {
    it("组件连接后应该正确初始化", async () => {
      const segmented = createSegmented({ name: "week", value: "Tue" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.shadowRoot).toBeTruthy();
      expect(segmented.value).toBe("Tue");
    });

    it("组件断开连接后应该正常移除", async () => {
      const segmented = createSegmented({ name: "week" }, [
        "Mon",
        "Tue",
        "Wed",
      ]);
      container.appendChild(segmented);
      await waitForRender();

      segmented.remove();

      expect(segmented.isConnected).toBe(false);
    });

    it("options 在组件挂载前设置应该在挂载后渲染", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items.length).toBe(3);
    });

    it("value 在组件挂载前设置应该在挂载后生效", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.setAttribute("value", "Tue");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);
      await waitForRender();

      expect(segmented.value).toBe("Tue");
    });

    it("多次设置 options 应该正确替换内容", async () => {
      const segmented = createSegmented({ name: "week" }, ["Mon", "Tue"]);
      container.appendChild(segmented);
      await waitForRender();

      segmented.options = ["A", "B", "C"];
      await waitForRender();

      const labels = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__label"
      );
      expect(labels.length).toBe(3);
      expect(labels[0].textContent.trim()).toBe("A");
      expect(labels[1].textContent.trim()).toBe("B");
      expect(labels[2].textContent.trim()).toBe("C");
    });
  });

  describe("属性组合", () => {
    it("size + direction 应该同时生效", async () => {
      const segmented = createSegmented(
        { name: "week", size: "large", direction: "vertical" },
        ["Mon", "Tue"]
      );
      container.appendChild(segmented);
      await waitForRender();

      const containerEl = segmented.shadowRoot.querySelector(".ea-segmented");
      expect(containerEl.classList.contains("ea-segmented--large")).toBe(true);
      expect(containerEl.classList.contains("is-vertical")).toBe(true);
    });

    it("size + disabled 应该同时生效", async () => {
      const segmented = createSegmented(
        { name: "week", size: "small", disabled: true },
        ["Mon", "Tue"]
      );
      container.appendChild(segmented);
      await waitForRender();

      const containerEl = segmented.shadowRoot.querySelector(".ea-segmented");
      expect(containerEl.classList.contains("ea-segmented--small")).toBe(true);

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      items.forEach(item => {
        expect(item.classList.contains("is-disabled")).toBe(true);
      });
    });

    it("block + direction 应该同时生效", async () => {
      const segmented = createSegmented(
        { name: "week", block: true, direction: "horizontal" },
        ["Mon", "Tue"]
      );
      container.appendChild(segmented);
      await waitForRender();

      const containerEl = segmented.shadowRoot.querySelector(".ea-segmented");
      expect(containerEl.classList.contains("is-block")).toBe(true);
      expect(containerEl.classList.contains("is-horizontal")).toBe(true);
    });

    it("value + disabled 应该同时生效", async () => {
      const segmented = createSegmented(
        { name: "week", value: "Mon", disabled: true },
        ["Mon", "Tue"]
      );
      container.appendChild(segmented);
      await waitForRender();

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items[0].classList.contains("is-checked")).toBe(true);
      expect(items[0].classList.contains("is-disabled")).toBe(true);
    });
  });

  describe("自定义元素注册", () => {
    it("应该注册为 ea-segmented 自定义元素", () => {
      expect(customElements.get("ea-segmented")).toBeDefined();
    });

    it("创建的元素应该是 EaCustomElement 的子类实例", () => {
      const segmented = document.createElement("ea-segmented");
      expect(segmented.constructor.name).toBe("EaCustomElement");
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-segmented");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("宿主元素应该有 role='radiogroup'", async () => {
        const el = createSegmented({ name: "week" }, ["Mon", "Tue"]);
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("role")).toBe("radiogroup");
      });

      it("选项应该有 role='radio'", async () => {
        const el = createSegmented({ name: "week" }, ["Mon", "Tue"]);
        container.appendChild(el);
        await waitForRender();
        const items = el.shadowRoot.querySelectorAll(".ea-segmented__item");
        items.forEach(item => {
          expect(item.getAttribute("role")).toBe("radio");
        });
      });

      it("选中的选项应该有 aria-checked='true'", async () => {
        const el = createSegmented({ name: "week", value: "Mon" }, [
          "Mon",
          "Tue",
        ]);
        container.appendChild(el);
        await waitForRender();
        const items = el.shadowRoot.querySelectorAll(".ea-segmented__item");
        expect(items[0].getAttribute("aria-checked")).toBe("true");
        expect(items[1].getAttribute("aria-checked")).toBe("false");
      });

      it("disabled 时宿主元素应该有 aria-disabled='true'", async () => {
        const el = createSegmented({ name: "week", disabled: true }, [
          "Mon",
          "Tue",
        ]);
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-disabled")).toBe("true");
      });

      it("未 disabled 时宿主元素应该有 aria-disabled='false'", async () => {
        const el = createSegmented({ name: "week" }, ["Mon", "Tue"]);
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-disabled")).toBe("false");
      });
    });

    describe("Keyboard Interaction", () => {
      it("按下 ArrowRight 应该切换到下一个选项", async () => {
        const el = createSegmented({ name: "week", value: "Mon" }, [
          "Mon",
          "Tue",
          "Wed",
        ]);
        container.appendChild(el);
        await waitForRender();
        el.focus();
        el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
        await waitForRender();
        expect(el.value).toBe("Tue");
      });

      it("按下 ArrowLeft 应该切换到上一个选项", async () => {
        const el = createSegmented({ name: "week", value: "Tue" }, [
          "Mon",
          "Tue",
          "Wed",
        ]);
        container.appendChild(el);
        await waitForRender();
        el.focus();
        el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
        await waitForRender();
        expect(el.value).toBe("Mon");
      });

      it("在最后一个选项按下 ArrowRight 应该循环到第一个选项", async () => {
        const el = createSegmented({ name: "week", value: "Wed" }, [
          "Mon",
          "Tue",
          "Wed",
        ]);
        container.appendChild(el);
        await waitForRender();
        el.focus();
        el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
        await waitForRender();
        expect(el.value).toBe("Mon");
      });

      it("在第一个选项按下 ArrowLeft 应该循环到最后一个选项", async () => {
        const el = createSegmented({ name: "week", value: "Mon" }, [
          "Mon",
          "Tue",
          "Wed",
        ]);
        container.appendChild(el);
        await waitForRender();
        el.focus();
        el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
        await waitForRender();
        expect(el.value).toBe("Wed");
      });
    });
  });
});
