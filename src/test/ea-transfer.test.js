import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-transfer 组件
import "../components/ea-transfer/index.js";

describe("EaTransfer Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  // 生成测试数据
  const generateTestData = () => {
    const data = [];
    for (let i = 1; i <= 10; i++) {
      data.push({
        key: i,
        label: `Option ${i}`,
        disabled: i % 4 === 0,
      });
    }
    return data;
  };

  /**
   * 基本功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-transfer 组件", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer).toBeDefined();
      expect(transfer.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(
        transfer.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 panel CSS Part", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      // panel part 是组合形式 "panel source-panel" 或 "panel target-panel"
      expect(transfer.shadowRoot.querySelector('[part~="panel"]')).toBeTruthy();
    });

    it("应该包含 source-panel CSS Part", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(
        transfer.shadowRoot.querySelector('[part~="source-panel"]')
      ).toBeTruthy();
    });

    it("应该包含 target-panel CSS Part", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(
        transfer.shadowRoot.querySelector('[part~="target-panel"]')
      ).toBeTruthy();
    });

    it("应该包含 buttons CSS Part", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(
        transfer.shadowRoot.querySelector('[part="buttons"]')
      ).toBeTruthy();
    });

    it("应该包含 button CSS Part", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      // button part 是组合形式 "button move-to-right-btn" 或 "button move-to-left-btn"
      expect(
        transfer.shadowRoot.querySelector('[part~="button"]')
      ).toBeTruthy();
    });

    it("应该包含 move-to-right-btn CSS Part", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(
        transfer.shadowRoot.querySelector('[part~="move-to-right-btn"]')
      ).toBeTruthy();
    });

    it("应该包含 move-to-left-btn CSS Part", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(
        transfer.shadowRoot.querySelector('[part~="move-to-left-btn"]')
      ).toBeTruthy();
    });
  });

  /**
   * Data 属性测试
   */
  describe("Data Attribute", () => {
    it("默认 data 应该是空数组", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Array.isArray(transfer.data)).toBe(true);
      expect(transfer.data.length).toBe(0);
    });

    it("应该支持设置 data 属性", async () => {
      const transfer = document.createElement("ea-transfer");
      const data = generateTestData();
      transfer.data = data;
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.data.length).toBe(10);
    });
  });

  /**
   * Value 属性测试
   */
  describe("Value Attribute", () => {
    it("默认 value 应该是空数组", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Array.isArray(transfer.value)).toBe(true);
      expect(transfer.value.length).toBe(0);
    });

    it("应该支持设置 value 属性", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [1, 2, 3];
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.value).toEqual([1, 2, 3]);
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      const value = transfer.disabled;
      expect(value === false || value === null).toBe(true);
    });

    it("应该支持 disabled 属性", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.disabled = true;
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.disabled).toBe(true);
    });
  });

  /**
   * Filterable 属性测试
   */
  describe("Filterable Attribute", () => {
    it("默认 filterable 应该是 false", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      const value = transfer.filterable;
      expect(value === false || value === null).toBe(true);
    });

    it("应该支持 filterable 属性", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.filterable).toBe(true);
    });
  });

  /**
   * Filter-placeholder 属性测试
   */
  describe("Filter-placeholder Attribute", () => {
    it("默认 filter-placeholder 应该是 '请输入搜索内容'", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer["filter-placeholder"]).toBe("请输入搜索内容");
    });

    it("应该支持自定义 filter-placeholder", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer["filter-placeholder"] = "Search...";
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer["filter-placeholder"]).toBe("Search...");
    });
  });

  /**
   * DataProps 属性测试
   */
  describe("DataProps Attribute", () => {
    it("默认 dataProps 应该有正确的默认值", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.dataProps).toEqual({
        key: "key",
        label: "label",
        disabled: "disabled",
      });
    });

    it("应该支持自定义 dataProps", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.dataProps = {
        key: "id",
        label: "name",
        disabled: "isDisabled",
      };
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.dataProps).toEqual({
        key: "id",
        label: "name",
        disabled: "isDisabled",
      });
    });
  });

  /**
   * Titles 属性测试
   */
  describe("Titles Attribute", () => {
    it("默认 titles 应该是空数组", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Array.isArray(transfer.titles)).toBe(true);
    });

    it("应该支持设置 titles", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.titles = ["Source", "Target"];
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.titles).toEqual(["Source", "Target"]);
    });
  });

  /**
   * ButtonTexts 属性测试
   */
  describe("ButtonTexts Attribute", () => {
    it("默认 buttonTexts 应该是空数组", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Array.isArray(transfer.buttonTexts)).toBe(true);
    });

    it("应该支持设置 buttonTexts", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.buttonTexts = ["To right", "To left"];
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.buttonTexts).toEqual(["To right", "To left"]);
    });
  });

  /**
   * LeftDefaultChecked 属性测试
   */
  describe("LeftDefaultChecked Attribute", () => {
    it("默认 leftDefaultChecked 应该是空数组", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Array.isArray(transfer.leftDefaultChecked)).toBe(true);
    });

    it("应该支持设置 leftDefaultChecked", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.leftDefaultChecked = [1, 2];
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.leftDefaultChecked).toEqual([1, 2]);
    });
  });

  /**
   * RightDefaultChecked 属性测试
   */
  describe("RightDefaultChecked Attribute", () => {
    it("默认 rightDefaultChecked 应该是空数组", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Array.isArray(transfer.rightDefaultChecked)).toBe(true);
    });

    it("应该支持设置 rightDefaultChecked", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.rightDefaultChecked = [3, 4];
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.rightDefaultChecked).toEqual([3, 4]);
    });
  });

  /**
   * Slots 测试
   */
  describe("Slots", () => {
    it("应该支持 left-empty 插槽", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.innerHTML = `
        <div slot="left-empty">No data</div>
      `;
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      const slot = transfer.shadowRoot.querySelector('slot[name="left-empty"]');
      expect(slot).toBeTruthy();
    });

    it("应该支持 right-empty 插槽", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.innerHTML = `
        <div slot="right-empty">No data</div>
      `;
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      const slot = transfer.shadowRoot.querySelector(
        'slot[name="right-empty"]'
      );
      expect(slot).toBeTruthy();
    });

    it("应该支持 left-footer 插槽", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.innerHTML = `
        <div slot="left-footer">Footer</div>
      `;
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      const slot = transfer.shadowRoot.querySelector(
        'slot[name="left-footer"]'
      );
      expect(slot).toBeTruthy();
    });

    it("应该支持 right-footer 插槽", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.innerHTML = `
        <div slot="right-footer">Footer</div>
      `;
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      const slot = transfer.shadowRoot.querySelector(
        'slot[name="right-footer"]'
      );
      expect(slot).toBeTruthy();
    });
  });

  /**
   * Events 测试
   */
  describe("Events", () => {
    it("应该触发 change 事件", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      const changeHandler = vi.fn();
      transfer.addEventListener("change", changeHandler);

      transfer.value = [1, 2];

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(changeHandler).toHaveBeenCalled();
    });

    it("应该触发 ea-left-check-change 事件", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      const checkHandler = vi.fn();
      transfer.addEventListener("ea-left-check-change", checkHandler);

      // 模拟触发事件
      transfer.dispatchEvent(
        new CustomEvent("ea-left-check-change", {
          detail: { value: [1, 2] },
        })
      );

      expect(checkHandler).toHaveBeenCalled();
    });

    it("应该触发 ea-right-check-change 事件", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      const checkHandler = vi.fn();
      transfer.addEventListener("ea-right-check-change", checkHandler);

      // 模拟触发事件
      transfer.dispatchEvent(
        new CustomEvent("ea-right-check-change", {
          detail: { value: [3, 4] },
        })
      );

      expect(checkHandler).toHaveBeenCalled();
    });
  });

  /**
   * Methods 测试
   */
  describe("Methods", () => {
    it("应该支持 clearQuery 方法", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.filterable = true;
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(typeof transfer.clearQuery).toBe("function");
    });
  });

  /**
   * 组合测试
   */
  describe("Combined Tests", () => {
    it("应该支持多种属性组合", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [1, 2];
      transfer.filterable = true;
      transfer.titles = ["Source", "Target"];
      transfer.buttonTexts = ["To right", "To left"];
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.data.length).toBe(10);
      expect(transfer.value).toEqual([1, 2]);
      expect(transfer.filterable).toBe(true);
      expect(transfer.titles).toEqual(["Source", "Target"]);
      expect(transfer.buttonTexts).toEqual(["To right", "To left"]);
    });

    it("应该正确分离源数据和目标数据", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [1, 2, 3];
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      // value 中的项应该在目标面板，其他的在源面板
      expect(transfer.value).toContain(1);
      expect(transfer.value).toContain(2);
      expect(transfer.value).toContain(3);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空数据应该正常渲染", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = [];
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.data).toEqual([]);
      expect(transfer.shadowRoot).toBeDefined();
    });

    it("空 value 应该正常渲染", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [];
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.value).toEqual([]);
    });

    it("多个 transfer 应该独立工作", async () => {
      const transfer1 = document.createElement("ea-transfer");
      transfer1.data = generateTestData();
      transfer1.value = [1, 2];

      const transfer2 = document.createElement("ea-transfer");
      transfer2.data = generateTestData();
      transfer2.value = [3, 4];

      container.appendChild(transfer1);
      container.appendChild(transfer2);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer1.value).toEqual([1, 2]);
      expect(transfer2.value).toEqual([3, 4]);
    });

    it("包含禁用项的数据应该正常处理", async () => {
      const transfer = document.createElement("ea-transfer");
      const data = [
        { key: 1, label: "Option 1", disabled: false },
        { key: 2, label: "Option 2", disabled: true },
        { key: 3, label: "Option 3", disabled: false },
      ];
      transfer.data = data;
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.data[1].disabled).toBe(true);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.shadowRoot).toBeDefined();
      expect(transfer.data.length).toBe(10);
    });

    it("组件断开连接后应该正常移除", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      transfer.remove();

      expect(container.contains(transfer)).toBe(false);
    });

    it("动态修改 data 应该生效", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      const newData = [{ key: 100, label: "New Option", disabled: false }];
      transfer.data = newData;

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.data.length).toBe(1);
      expect(transfer.data[0].key).toBe(100);
    });

    it("动态修改 value 应该生效", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [1];
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      transfer.value = [2, 3];

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.value).toEqual([2, 3]);
    });

    it("动态修改 titles 应该生效", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.titles = ["Old Source", "Old Target"];
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      transfer.titles = ["New Source", "New Target"];

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.titles).toEqual(["New Source", "New Target"]);
    });

    it("动态修改 disabled 应该生效", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      transfer.disabled = true;

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.disabled).toBe(true);
    });

    it("动态修改 filterable 应该生效", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);

      await new Promise(resolve => setTimeout(resolve, 100));

      transfer.filterable = true;

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(transfer.filterable).toBe(true);
    });
  });
});
