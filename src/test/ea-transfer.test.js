import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";
import "../components/ea-transfer/index";

ElementInternals.prototype.setValidity =
  ElementInternals.prototype.setValidity ||
  function (flags, message) {
    if (!this.validity) {
      this.validity = { valid: true };
    }
    this.validity.valid = !flags || Object.keys(flags).length === 0;
    this.validationMessage = message || "";
  };

ElementInternals.prototype.reportValidity =
  ElementInternals.prototype.reportValidity ||
  function () {
    return this.validity ? this.validity.valid : true;
  };

ElementInternals.prototype.checkValidity =
  ElementInternals.prototype.checkValidity ||
  function () {
    return this.validity ? this.validity.valid : true;
  };

ElementInternals.prototype.setFormValue =
  ElementInternals.prototype.setFormValue || function () {};

describe("EaTransfer Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

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

  const getPanelCheckbox = itemEl => {
    return itemEl.querySelector("ea-checkbox");
  };

  const setCheckboxChecked = (checkbox, checked) => {
    if (checked) {
      checkbox.setAttribute("checked", "");
    } else {
      checkbox.removeAttribute("checked");
    }
  };

  const selectPanelItem = async (panel, index) => {
    const items = panel.shadowRoot.querySelectorAll(
      ".ea-transfer-panel__item:not(.is-disabled)"
    );
    const item = items[index];
    if (!item) return;

    const checkbox = getPanelCheckbox(item);
    if (checkbox) {
      setCheckboxChecked(checkbox, true);
      checkbox.dispatchEvent(
        new Event("change", { bubbles: true, composed: true })
      );
    }
    await waitForRender();
  };

  const deselectPanelItem = async (panel, index) => {
    const items = panel.shadowRoot.querySelectorAll(
      ".ea-transfer-panel__item:not(.is-disabled)"
    );
    const item = items[index];
    if (!item) return;

    const checkbox = getPanelCheckbox(item);
    if (checkbox) {
      setCheckboxChecked(checkbox, false);
      checkbox.dispatchEvent(
        new Event("change", { bubbles: true, composed: true })
      );
    }
    await waitForRender();
  };

  const selectAllPanelItems = async (panel, checked) => {
    const selectAllCheckbox = panel.shadowRoot.querySelector(
      ".ea-transfer-panel__checkbox"
    );
    if (selectAllCheckbox) {
      setCheckboxChecked(selectAllCheckbox, checked);
      selectAllCheckbox.dispatchEvent(
        new Event("change", { bubbles: true, composed: true })
      );
    }
    await waitForRender();
  };

  /**
   * 基本结构测试
   */
  describe("Basic Structure", () => {
    it("应该正确渲染 ea-transfer 组件", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer).toBeDefined();
      expect(transfer.shadowRoot).toBeDefined();
    });

    it("应该包含所有 CSS Parts", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();

      const containerEl =
        transfer.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeTruthy();

      const panels = transfer.shadowRoot.querySelectorAll('[part~="panel"]');
      expect(panels.length).toBe(2);

      const sourcePanel = transfer.shadowRoot.querySelector(
        '[part~="source-panel"]'
      );
      expect(sourcePanel).toBeTruthy();

      const targetPanel = transfer.shadowRoot.querySelector(
        '[part~="target-panel"]'
      );
      expect(targetPanel).toBeTruthy();

      const buttons = transfer.shadowRoot.querySelector('[part="buttons"]');
      expect(buttons).toBeTruthy();

      const buttonEls =
        transfer.shadowRoot.querySelectorAll('[part~="button"]');
      expect(buttonEls.length).toBe(2);

      const rightBtn = transfer.shadowRoot.querySelector(
        '[part~="move-to-right-btn"]'
      );
      expect(rightBtn).toBeTruthy();

      const leftBtn = transfer.shadowRoot.querySelector(
        '[part~="move-to-left-btn"]'
      );
      expect(leftBtn).toBeTruthy();
    });

    it("应该正确创建两个面板 (source / target)", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      const targetPanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="target"]'
      );

      expect(sourcePanel).toBeTruthy();
      expect(targetPanel).toBeTruthy();
    });

    it("初始状态下移动按钮应该禁用", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer._moveToRightBtn.disabled).toBe(true);
      expect(transfer._moveToLeftBtn.disabled).toBe(true);
    });

    it("应该包含左右两个 ea-transfer-panel 元素", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      const targetPanel = transfer._targetPanel;
      expect(sourcePanel).toBeTruthy();
      expect(targetPanel).toBeTruthy();
    });
  });

  /**
   * HTML Attributes / Properties 默认值测试
   */
  describe("Default Values", () => {
    it("disabled 默认值应为 false", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(transfer.disabled).toBe(false);
    });

    it("filterable 默认值应为 false", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(transfer.filterable).toBe(false);
    });

    it("filterPlaceholder 默认值应为 '请输入搜索内容'", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(transfer.filterPlaceholder).toBe("请输入搜索内容");
    });

    it("data 默认值应为空数组", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(Array.isArray(transfer.data)).toBe(true);
      expect(transfer.data.length).toBe(0);
    });

    it("value 默认值应为空数组", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(Array.isArray(transfer.value)).toBe(true);
      expect(transfer.value.length).toBe(0);
    });

    it("dataProps 应有正确的默认映射 {key, label, disabled}", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(transfer.dataProps).toEqual({
        key: "key",
        label: "label",
        disabled: "disabled",
      });
    });

    it("titles 默认值应为空数组", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(Array.isArray(transfer.titles)).toBe(true);
      expect(transfer.titles.length).toBe(0);
    });

    it("buttonTexts 默认值应为空数组", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(Array.isArray(transfer.buttonTexts)).toBe(true);
      expect(transfer.buttonTexts.length).toBe(0);
    });

    it("filterMethod 默认值应为 null", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(transfer.filterMethod).toBeNull();
    });

    it("leftDefaultChecked 默认值应为空数组", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(Array.isArray(transfer.leftDefaultChecked)).toBe(true);
      expect(transfer.leftDefaultChecked.length).toBe(0);
    });

    it("rightDefaultChecked 默认值应为空数组", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(Array.isArray(transfer.rightDefaultChecked)).toBe(true);
      expect(transfer.rightDefaultChecked.length).toBe(0);
    });
  });

  /**
   * 属性设置测试
   */
  describe("Attribute/Property Setting", () => {
    it("设置 disabled=true 应添加 is-disabled 样式类", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.disabled = true;
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.disabled).toBe(true);
      const containerEl = transfer.shadowRoot.querySelector(".ea-transfer");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("设置 filterable=true 应影响两个面板", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.filterable = true;
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.filterable).toBe(true);
      expect(transfer._sourcePanel.filterable).toBe(true);
      expect(transfer._targetPanel.filterable).toBe(true);
    });

    it("应支持设置自定义 filterPlaceholder", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      transfer.filterPlaceholder = "Search items...";
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.filterPlaceholder).toBe("Search items...");
    });

    it("设置 data 应渲染到 source panel 中", async () => {
      const transfer = document.createElement("ea-transfer");
      const data = generateTestData();
      transfer.data = data;
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.data.length).toBe(10);
      expect(transfer._sourcePanel.data.length).toBe(10);
    });

    it("设置 value 应将相应数据渲染到 target panel 中", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [1, 2, 3];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.value).toEqual([1, 2, 3]);
      expect(transfer._targetPanel.data.length).toBe(3);
      expect(transfer._sourcePanel.data.length).toBe(7);
    });

    it("应支持自定义 dataProps 字段映射", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.dataProps = {
        key: "id",
        label: "name",
        disabled: "isDisabled",
      };
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.dataProps).toEqual({
        key: "id",
        label: "name",
        disabled: "isDisabled",
      });
    });

    it("设置 titles 应更新面板标题", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();

      transfer.titles = ["Source List", "Target List"];
      await waitForRender();

      expect(transfer.titles).toEqual(["Source List", "Target List"]);
      expect(transfer._sourcePanel.getAttribute("data-title")).toBe(
        "Source List"
      );
      expect(transfer._targetPanel.getAttribute("data-title")).toBe(
        "Target List"
      );
    });

    it("设置 buttonTexts 应更新按钮文本", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.buttonTexts = ["To right", "To left"];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.buttonTexts).toEqual(["To right", "To left"]);
    });

    it("应支持设置 leftDefaultChecked 和 rightDefaultChecked", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.leftDefaultChecked = [1, 2];
      transfer.rightDefaultChecked = [3, 4];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.leftDefaultChecked).toEqual([1, 2]);
      expect(transfer.rightDefaultChecked).toEqual([3, 4]);
    });

    it("应支持设置自定义 filterMethod", async () => {
      const transfer = document.createElement("ea-transfer");
      const customFilter = (query, item) =>
        item.label.toLowerCase().includes(query.toLowerCase());
      transfer.filterMethod = customFilter;
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.filterMethod).toBe(customFilter);
    });
  });

  /**
   * Slots 插槽测试
   */
  describe("Slots", () => {
    it("应支持 left-empty 插槽", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.innerHTML = '<div slot="left-empty">No data</div>';
      container.appendChild(transfer);
      await waitForRender();

      const slot = transfer.shadowRoot.querySelector('slot[name="left-empty"]');
      expect(slot).toBeTruthy();
    });

    it("应支持 right-empty 插槽", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.innerHTML = '<div slot="right-empty">No data</div>';
      container.appendChild(transfer);
      await waitForRender();

      const slot = transfer.shadowRoot.querySelector(
        'slot[name="right-empty"]'
      );
      expect(slot).toBeTruthy();
    });

    it("应支持 left-footer 插槽", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.innerHTML = '<div slot="left-footer">Footer</div>';
      container.appendChild(transfer);
      await waitForRender();

      const slot = transfer.shadowRoot.querySelector(
        'slot[name="left-footer"]'
      );
      expect(slot).toBeTruthy();
    });

    it("应支持 right-footer 插槽", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.innerHTML = '<div slot="right-footer">Footer</div>';
      container.appendChild(transfer);
      await waitForRender();

      const slot = transfer.shadowRoot.querySelector(
        'slot[name="right-footer"]'
      );
      expect(slot).toBeTruthy();
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("设置 value 属性应触发 change 事件", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const changeHandler = vi.fn();
      transfer.addEventListener("change", changeHandler);

      transfer.value = [1, 2];
      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });

    it("change 事件的 detail 应包含新 value", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const changeHandler = vi.fn();
      transfer.addEventListener("change", changeHandler);

      transfer.value = [1, 2];
      await waitForRender();

      const event = changeHandler.mock.calls[0][0];
      expect(event.detail.value).toEqual([1, 2]);
    });

    it("应支持触发 ea-left-check-change 事件监听", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const handler = vi.fn();
      transfer.addEventListener("ea-left-check-change", handler);

      transfer.dispatchEvent(
        new CustomEvent("ea-left-check-change", {
          detail: { value: [1, 2] },
          bubbles: true,
          composed: true,
        })
      );

      expect(handler).toHaveBeenCalled();
    });

    it("应支持触发 ea-right-check-change 事件监听", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const handler = vi.fn();
      transfer.addEventListener("ea-right-check-change", handler);

      transfer.dispatchEvent(
        new CustomEvent("ea-right-check-change", {
          detail: { value: [3, 4] },
          bubbles: true,
          composed: true,
        })
      );

      expect(handler).toHaveBeenCalled();
    });
  });

  /**
   * 数据分离 & 移动功能测试
   */
  describe("Data Separation & Movement", () => {
    it("根据 value 正确分离 source 和 target 面板数据", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [1, 2, 3];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.value).toEqual([1, 2, 3]);
      expect(transfer._targetPanel.data.length).toBe(3);
      expect(transfer._sourcePanel.data.length).toBe(7);
    });

    it("选中源面板项并点击右移按钮应移动到 target", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      const initialSourceCount = sourcePanel.data.length;

      await selectPanelItem(sourcePanel, 0);

      transfer._moveToRightBtn.click();
      await waitForRender();

      expect(transfer.value.length).toBe(1);
      expect(sourcePanel.data.length).toBe(initialSourceCount - 1);
      expect(transfer._targetPanel.data.length).toBe(1);
    });

    it("选中目标面板项并点击左移按钮应移回 source", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [1, 2, 3];
      container.appendChild(transfer);
      await waitForRender();

      const targetPanel = transfer._targetPanel;
      const initialTargetCount = targetPanel.data.length;

      await selectPanelItem(targetPanel, 0);

      transfer._moveToLeftBtn.click();
      await waitForRender();

      expect(transfer.value.length).toBe(2);
      expect(targetPanel.data.length).toBe(initialTargetCount - 1);
    });

    it("移动操作应触发 change 事件", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const changeHandler = vi.fn();
      transfer.addEventListener("change", changeHandler);

      const sourcePanel = transfer._sourcePanel;
      await selectPanelItem(sourcePanel, 0);

      transfer._moveToRightBtn.click();
      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });

    it("value 为空数组时所有数据应在 source 面板", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer._sourcePanel.data.length).toBe(10);
      expect(transfer._targetPanel.data.length).toBe(0);
    });
  });

  /**
   * 选中项交互测试
   */
  describe("Item Selection", () => {
    it("选中项后移动按钮应启用", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      await selectPanelItem(sourcePanel, 0);

      expect(transfer._moveToRightBtn.disabled).toBe(false);
    });

    it("清空选中后移动按钮应禁用", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      await selectPanelItem(sourcePanel, 0);
      expect(transfer._moveToRightBtn.disabled).toBe(false);

      await deselectPanelItem(sourcePanel, 0);

      expect(transfer._moveToRightBtn.disabled).toBe(true);
    });

    it("面板应该显示正确的选中计数 (selected/total)", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      const countEl = sourcePanel.shadowRoot.querySelector(
        ".ea-transfer-panel__count"
      );
      expect(countEl).toBeTruthy();
      expect(countEl.textContent).toMatch(/^\d+\/\d+$/);
    });

    it("选中项应更新计数", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = [{ key: 1, label: "Option 1", disabled: false }];
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      await selectPanelItem(sourcePanel, 0);

      const countEl = sourcePanel.shadowRoot.querySelector(
        ".ea-transfer-panel__count"
      );
      expect(countEl.textContent).toBe("1/1");
    });
  });

  /**
   * 全选功能测试
   */
  describe("Select All", () => {
    it("点击全选应选中所有未禁用项", async () => {
      const transfer = document.createElement("ea-transfer");
      const data = generateTestData().filter(item => !item.disabled);
      transfer.data = data;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      await selectAllPanelItems(sourcePanel, true);

      expect(sourcePanel._states.selectedKeys.size).toBe(data.length);
    });

    it("取消全选应取消所有选中", async () => {
      const transfer = document.createElement("ea-transfer");
      const data = generateTestData().filter(item => !item.disabled);
      transfer.data = data;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      await selectAllPanelItems(sourcePanel, true);
      await selectAllPanelItems(sourcePanel, false);

      expect(sourcePanel._states.selectedKeys.size).toBe(0);
    });

    it("部分选定时全选 checkbox 应显示 indeterminate 状态", async () => {
      const transfer = document.createElement("ea-transfer");
      const data = generateTestData().filter(item => !item.disabled);
      transfer.data = data;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      await selectPanelItem(sourcePanel, 0);

      expect(sourcePanel._checkbox.indeterminate).toBe(true);
      expect(sourcePanel._checkbox.checked).toBe(false);
    });
  });

  /**
   * 搜索过滤功能测试
   */
  describe("Search Filtering", () => {
    it("filterable=true 时面板应显示搜索框", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      expect(sourcePanel.filterable).toBe(true);

      const filterWrapper = sourcePanel.shadowRoot.querySelector(
        ".ea-transfer-panel__filter-wrapper"
      );
      expect(filterWrapper).toBeTruthy();
    });

    it("输入搜索关键词应过滤不匹配的项", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      const filterInput = sourcePanel._filterInput;

      filterInput.value = "Option 1";
      filterInput.dispatchEvent(new Event("input"));
      await waitForRender();

      const visibleItems = sourcePanel.shadowRoot.querySelectorAll(
        ".ea-transfer-panel__item:not(.is-filtered-out)"
      );
      expect(visibleItems.length).toBeGreaterThan(0);
      expect(visibleItems.length).toBeLessThan(10);
    });

    it("清空搜索关键词应显示全部项", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      const filterInput = sourcePanel._filterInput;

      filterInput.value = "Option";
      filterInput.dispatchEvent(new Event("input"));
      await waitForRender();

      filterInput.value = "";
      filterInput.dispatchEvent(new Event("input"));
      await waitForRender();

      const filteredOut =
        sourcePanel.shadowRoot.querySelectorAll(".is-filtered-out");
      expect(filteredOut.length).toBe(0);
    });

    it("clearQuery('left') 应清空左侧搜索并重置过滤", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      const filterInput = sourcePanel._filterInput;

      filterInput.value = "xyz";
      filterInput.dispatchEvent(new Event("input"));
      await waitForRender();

      transfer.clearQuery("left");
      await waitForRender();

      expect(sourcePanel._filterInput.value).toBe("");
    });

    it("搜索过滤时全选应仅影响可见项", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      const data = [
        { key: 1, label: "Apple" },
        { key: 2, label: "Banana" },
      ];
      transfer.data = data;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      const filterInput = sourcePanel._filterInput;

      filterInput.value = "Apple";
      filterInput.dispatchEvent(new Event("input"));
      await waitForRender();

      await selectAllPanelItems(sourcePanel, true);

      expect(sourcePanel._states.selectedKeys.size).toBe(1);
    });
  });

  /**
   * 公共方法测试
   */
  describe("Public Methods", () => {
    it("checkValidity 方法应存在并可调用", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();

      expect(typeof transfer.checkValidity).toBe("function");
    });

    it("reportValidity 方法应存在并可调用", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();

      expect(typeof transfer.reportValidity).toBe("function");
    });

    it("clearQuery 方法应存在", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      expect(typeof transfer.clearQuery).toBe("function");
    });

    it("clearQuery('left') 和 clearQuery('right') 应分别清空对应面板", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      const targetPanel = transfer._targetPanel;

      sourcePanel._filterInput.value = "test1";
      targetPanel._filterInput.value = "test2";
      await waitForRender();

      transfer.clearQuery("left");
      transfer.clearQuery("right");
      await waitForRender();

      expect(sourcePanel._filterInput.value).toBe("");
      expect(targetPanel._filterInput.value).toBe("");
    });
  });

  /**
   * 表单验证测试
   */
  describe("Form Validation", () => {
    it("required=true 且 value 为空时应返回 invalid", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.required = true;
      transfer.data = generateTestData();
      transfer.value = [];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.checkValidity()).toBe(false);
    });

    it("required=true 且 value 有值时应返回 valid", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.required = true;
      transfer.data = generateTestData();
      transfer.value = [1];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.checkValidity()).toBe(true);
    });

    it("required=false 时空值也应 valid", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.checkValidity()).toBe(true);
    });
  });

  /**
   * 动态修改测试
   */
  describe("Dynamic Modification", () => {
    it("动态修改 data 应更新 source 面板", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const newData = [{ key: 100, label: "New Option", disabled: false }];
      transfer.data = newData;
      await waitForRender();

      expect(transfer.data.length).toBe(1);
      expect(transfer.data[0].key).toBe(100);
      expect(transfer._sourcePanel.data.length).toBe(1);
    });

    it("动态修改 value 应移动数据到 target 面板", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [1];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer._targetPanel.data.length).toBe(1);

      transfer.value = [2, 3];
      await waitForRender();

      expect(transfer.value).toEqual([2, 3]);
      expect(transfer._targetPanel.data.length).toBe(2);
    });

    it("动态修改 titles 应更新面板标题", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();

      transfer.titles = ["Old Src", "Old Tgt"];
      await waitForRender();

      expect(transfer._sourcePanel.getAttribute("data-title")).toBe("Old Src");
      expect(transfer._targetPanel.getAttribute("data-title")).toBe("Old Tgt");

      transfer.titles = ["New Src", "New Tgt"];
      await waitForRender();

      expect(transfer.titles).toEqual(["New Src", "New Tgt"]);
      expect(transfer._sourcePanel.getAttribute("data-title")).toBe("New Src");
      expect(transfer._targetPanel.getAttribute("data-title")).toBe("New Tgt");
    });

    it("动态修改 disabled 应更新样式类", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.disabled).toBe(false);

      transfer.disabled = true;
      await waitForRender();

      expect(transfer.disabled).toBe(true);
      const containerEl = transfer.shadowRoot.querySelector(".ea-transfer");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);

      transfer.disabled = false;
      await waitForRender();

      expect(transfer.disabled).toBe(false);
      expect(containerEl.classList.contains("is-disabled")).toBe(false);
    });

    it("动态切换 filterable 应添加/移除搜索框", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.filterable).toBe(false);
      transfer.filterable = true;
      await waitForRender();

      expect(transfer.filterable).toBe(true);
      expect(transfer._sourcePanel.filterable).toBe(true);
    });

    it("动态修改 buttonTexts 应更新按钮文本", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();

      transfer.buttonTexts = ["Right", "Left"];
      await waitForRender();

      expect(transfer.buttonTexts).toEqual(["Right", "Left"]);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 data 应正常渲染", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = [];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.data).toEqual([]);
      expect(transfer.shadowRoot).toBeDefined();
    });

    it("空 value 应正常渲染", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.value).toEqual([]);
      expect(transfer._sourcePanel.data.length).toBe(10);
    });

    it("多个 transfer 实例应独立工作", async () => {
      const t1 = document.createElement("ea-transfer");
      t1.data = generateTestData();
      t1.value = [1, 2];

      const t2 = document.createElement("ea-transfer");
      t2.data = generateTestData();
      t2.value = [3, 4];

      container.appendChild(t1);
      container.appendChild(t2);
      await waitForRender();

      expect(t1.value).toEqual([1, 2]);
      expect(t2.value).toEqual([3, 4]);
    });

    it("包含禁用项的数据应正常渲染", async () => {
      const transfer = document.createElement("ea-transfer");
      const data = [
        { key: 1, label: "A", disabled: false },
        { key: 2, label: "B", disabled: true },
        { key: 3, label: "C", disabled: false },
      ];
      transfer.data = data;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;
      const disabledItems =
        sourcePanel.shadowRoot.querySelectorAll(".is-disabled");
      expect(disabledItems.length).toBe(1);
    });

    it("全部数据禁用时全选 checkbox 应保持可用", async () => {
      const transfer = document.createElement("ea-transfer");
      const data = [
        { key: 1, label: "X", disabled: true },
        { key: 2, label: "Y", disabled: true },
      ];
      transfer.data = data;
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer._sourcePanel._checkbox.disabled).toBe(false);
      expect(transfer._sourcePanel.data.length).toBe(2);
    });

    it("自定义 dataProps 可与自定义 data 配合使用", async () => {
      const transfer = document.createElement("ea-transfer");
      const customData = [
        { id: "a", name: "Alpha", blocked: false },
        { id: "b", name: "Beta", blocked: true },
      ];
      transfer.data = customData;
      transfer.dataProps = { key: "id", label: "name", disabled: "blocked" };
      transfer.value = ["a"];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.value).toEqual(["a"]);
      expect(transfer._targetPanel.data.length).toBe(1);
      expect(transfer._sourcePanel.data.length).toBe(1);

      const sourcePanel = transfer._sourcePanel;
      const disabledItems =
        sourcePanel.shadowRoot.querySelectorAll(".is-disabled");
      expect(disabledItems.length).toBe(1);
    });
  });

  /**
   * 组合属性测试
   */
  describe("Combined Tests", () => {
    it("应支持同时设置多个属性", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [1, 2];
      transfer.filterable = true;
      transfer.titles = ["Source", "Target"];
      transfer.buttonTexts = ["To Right", "To Left"];
      transfer.leftDefaultChecked = [1];
      transfer.rightDefaultChecked = [2];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.data.length).toBe(10);
      expect(transfer.value).toEqual([1, 2]);
      expect(transfer.filterable).toBe(true);
      expect(transfer.titles).toEqual(["Source", "Target"]);
      expect(transfer.buttonTexts).toEqual(["To Right", "To Left"]);
      expect(transfer.leftDefaultChecked).toEqual([1]);
      expect(transfer.rightDefaultChecked).toEqual([2]);
    });

    it("完整的穿梭流程：选中 → 右移 → 左移", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer._sourcePanel;

      await selectPanelItem(sourcePanel, 0);
      await selectPanelItem(sourcePanel, 1);

      transfer._moveToRightBtn.click();
      await waitForRender();

      expect(transfer.value.length).toBe(2);

      const targetPanel = transfer._targetPanel;

      await selectPanelItem(targetPanel, 1);

      transfer._moveToLeftBtn.click();
      await waitForRender();

      expect(transfer.value.length).toBe(1);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("connectedCallback 后应正确初始化", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.shadowRoot).toBeDefined();
      expect(transfer._sourcePanel).toBeTruthy();
      expect(transfer._targetPanel).toBeTruthy();
      expect(transfer.data.length).toBe(10);
    });

    it("remove() 后应正常从 DOM 移除", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(container.contains(transfer)).toBe(true);

      transfer.remove();
      expect(container.contains(transfer)).toBe(false);
    });
  });
});
