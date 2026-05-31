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

describe("EaTransfer", () => {
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

  describe("Basic Structure", () => {
    it("should render ea-transfer component", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer).toBeDefined();
      expect(transfer.shadowRoot).toBeDefined();
    });

    it("should contain all CSS Parts", async () => {
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

    it("should create two panels (source / target)", async () => {
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

    it("move buttons should be disabled initially", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const rightBtn = transfer.shadowRoot.querySelector(
        '[part~="move-to-right-btn"]'
      );
      const leftBtn = transfer.shadowRoot.querySelector(
        '[part~="move-to-left-btn"]'
      );
      expect(rightBtn.hasAttribute("disabled")).toBe(true);
      expect(leftBtn.hasAttribute("disabled")).toBe(true);
    });

    it("should contain left and right ea-transfer-panel elements", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
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
  });

  describe("Default Values", () => {
    it("disabled default should be false", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(transfer.disabled).toBe(false);
    });

    it("filterable default should be false", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(transfer.filterable).toBe(false);
    });

    it("filterPlaceholder default should be '请输入搜索内容'", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(transfer.filterPlaceholder).toBe("请输入搜索内容");
    });

    it("data default should be empty array", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(Array.isArray(transfer.data)).toBe(true);
      expect(transfer.data.length).toBe(0);
    });

    it("value default should be empty array", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(Array.isArray(transfer.value)).toBe(true);
      expect(transfer.value.length).toBe(0);
    });

    it("dataProps should have correct default mapping", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(transfer.dataProps).toEqual({
        key: "key",
        label: "label",
        disabled: "disabled",
      });
    });

    it("titles default should be empty array", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(Array.isArray(transfer.titles)).toBe(true);
      expect(transfer.titles.length).toBe(0);
    });

    it("buttonTexts default should be empty array", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(Array.isArray(transfer.buttonTexts)).toBe(true);
      expect(transfer.buttonTexts.length).toBe(0);
    });

    it("filterMethod default should be null", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(transfer.filterMethod).toBeNull();
    });

    it("leftDefaultChecked default should be empty array", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(Array.isArray(transfer.leftDefaultChecked)).toBe(true);
      expect(transfer.leftDefaultChecked.length).toBe(0);
    });

    it("rightDefaultChecked default should be empty array", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(Array.isArray(transfer.rightDefaultChecked)).toBe(true);
      expect(transfer.rightDefaultChecked.length).toBe(0);
    });
  });

  describe("Attribute/Property Setting", () => {
    it("setting disabled=true should add is-disabled state class", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.disabled = true;
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.disabled).toBe(true);
      const containerEl = transfer.shadowRoot.querySelector(".ea-transfer");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("setting filterable=true should affect both panels", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.filterable = true;
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.filterable).toBe(true);
      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      const targetPanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="target"]'
      );
      expect(sourcePanel.filterable).toBe(true);
      expect(targetPanel.filterable).toBe(true);
    });

    it("should support custom filterPlaceholder", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      transfer.filterPlaceholder = "Search items...";
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.filterPlaceholder).toBe("Search items...");
    });

    it("setting data should render to source panel", async () => {
      const transfer = document.createElement("ea-transfer");
      const data = generateTestData();
      transfer.data = data;
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.data.length).toBe(10);
      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      expect(sourcePanel.data.length).toBe(10);
    });

    it("setting value should render corresponding data to target panel", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [1, 2, 3];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.value).toEqual([1, 2, 3]);
      const targetPanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="target"]'
      );
      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      expect(targetPanel.data.length).toBe(3);
      expect(sourcePanel.data.length).toBe(7);
    });

    it("should support custom dataProps field mapping", async () => {
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

    it("setting titles should update panel titles", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();

      transfer.titles = ["Source List", "Target List"];
      await waitForRender();

      expect(transfer.titles).toEqual(["Source List", "Target List"]);
      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      const targetPanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="target"]'
      );
      expect(sourcePanel.getAttribute("data-title")).toBe("Source List");
      expect(targetPanel.getAttribute("data-title")).toBe("Target List");
    });

    it("setting buttonTexts should update button text", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.buttonTexts = ["To right", "To left"];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.buttonTexts).toEqual(["To right", "To left"]);
    });

    it("should support setting leftDefaultChecked and rightDefaultChecked", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.leftDefaultChecked = [1, 2];
      transfer.rightDefaultChecked = [3, 4];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.leftDefaultChecked).toEqual([1, 2]);
      expect(transfer.rightDefaultChecked).toEqual([3, 4]);
    });

    it("should support setting custom filterMethod", async () => {
      const transfer = document.createElement("ea-transfer");
      const customFilter = (query, item) =>
        item.label.toLowerCase().includes(query.toLowerCase());
      transfer.filterMethod = customFilter;
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.filterMethod).toBe(customFilter);
    });
  });

  describe("Slots", () => {
    it("should support left-empty slot", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.innerHTML = '<div slot="left-empty">No data</div>';
      container.appendChild(transfer);
      await waitForRender();

      const slot = transfer.shadowRoot.querySelector('slot[name="left-empty"]');
      expect(slot).toBeTruthy();
    });

    it("should support right-empty slot", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.innerHTML = '<div slot="right-empty">No data</div>';
      container.appendChild(transfer);
      await waitForRender();

      const slot = transfer.shadowRoot.querySelector(
        'slot[name="right-empty"]'
      );
      expect(slot).toBeTruthy();
    });

    it("should support left-footer slot", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.innerHTML = '<div slot="left-footer">Footer</div>';
      container.appendChild(transfer);
      await waitForRender();

      const slot = transfer.shadowRoot.querySelector(
        'slot[name="left-footer"]'
      );
      expect(slot).toBeTruthy();
    });

    it("should support right-footer slot", async () => {
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

  describe("Events", () => {
    it("setting value property should trigger change event", async () => {
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

    it("change event detail should contain new value", async () => {
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

    it("should support ea-left-check-change event", async () => {
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

    it("should support ea-right-check-change event", async () => {
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

  describe("Data Separation & Movement", () => {
    it("should correctly separate source and target panel data based on value", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [1, 2, 3];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.value).toEqual([1, 2, 3]);
      const targetPanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="target"]'
      );
      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      expect(targetPanel.data.length).toBe(3);
      expect(sourcePanel.data.length).toBe(7);
    });

    it("selecting source item and clicking move-right should move to target", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      const initialSourceCount = sourcePanel.data.length;

      await selectPanelItem(sourcePanel, 0);

      const rightBtn = transfer.shadowRoot.querySelector(
        '[part~="move-to-right-btn"]'
      );
      rightBtn.click();
      await waitForRender();

      expect(transfer.value.length).toBe(1);
      expect(sourcePanel.data.length).toBe(initialSourceCount - 1);
      const targetPanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="target"]'
      );
      expect(targetPanel.data.length).toBe(1);
    });

    it("selecting target item and clicking move-left should move back to source", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [1, 2, 3];
      container.appendChild(transfer);
      await waitForRender();

      const targetPanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="target"]'
      );
      const initialTargetCount = targetPanel.data.length;

      await selectPanelItem(targetPanel, 0);

      const leftBtn = transfer.shadowRoot.querySelector(
        '[part~="move-to-left-btn"]'
      );
      leftBtn.click();
      await waitForRender();

      expect(transfer.value.length).toBe(2);
      expect(targetPanel.data.length).toBe(initialTargetCount - 1);
    });

    it("move operation should trigger change event", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const changeHandler = vi.fn();
      transfer.addEventListener("change", changeHandler);

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      await selectPanelItem(sourcePanel, 0);

      const rightBtn = transfer.shadowRoot.querySelector(
        '[part~="move-to-right-btn"]'
      );
      rightBtn.click();
      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });

    it("empty value should put all data in source panel", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [];
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      const targetPanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="target"]'
      );
      expect(sourcePanel.data.length).toBe(10);
      expect(targetPanel.data.length).toBe(0);
    });
  });

  describe("Item Selection", () => {
    it("move button should be enabled after selecting item", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      await selectPanelItem(sourcePanel, 0);

      const rightBtn = transfer.shadowRoot.querySelector(
        '[part~="move-to-right-btn"]'
      );
      expect(rightBtn.hasAttribute("disabled")).toBe(false);
    });

    it("move button should be disabled after clearing selection", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      await selectPanelItem(sourcePanel, 0);

      const rightBtn = transfer.shadowRoot.querySelector(
        '[part~="move-to-right-btn"]'
      );
      expect(rightBtn.hasAttribute("disabled")).toBe(false);

      await deselectPanelItem(sourcePanel, 0);

      expect(rightBtn.hasAttribute("disabled")).toBe(true);
    });

    it("panel should display correct selection count (selected/total)", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      const countEl = sourcePanel.shadowRoot.querySelector(
        ".ea-transfer-panel__count"
      );
      expect(countEl).toBeTruthy();
      expect(countEl.textContent).toMatch(/^\d+\/\d+$/);
    });

    it("selecting item should update count", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = [{ key: 1, label: "Option 1", disabled: false }];
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      await selectPanelItem(sourcePanel, 0);

      const countEl = sourcePanel.shadowRoot.querySelector(
        ".ea-transfer-panel__count"
      );
      expect(countEl.textContent).toBe("1/1");
    });
  });

  describe("Select All", () => {
    it("clicking select all should select all non-disabled items", async () => {
      const transfer = document.createElement("ea-transfer");
      const data = generateTestData().filter(item => !item.disabled);
      transfer.data = data;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      await selectAllPanelItems(sourcePanel, true);

      expect(sourcePanel._states.selectedKeys.size).toBe(data.length);
    });

    it("deselecting all should clear all selections", async () => {
      const transfer = document.createElement("ea-transfer");
      const data = generateTestData().filter(item => !item.disabled);
      transfer.data = data;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      await selectAllPanelItems(sourcePanel, true);
      await selectAllPanelItems(sourcePanel, false);

      expect(sourcePanel._states.selectedKeys.size).toBe(0);
    });

    it("partial selection should show indeterminate state on select-all checkbox", async () => {
      const transfer = document.createElement("ea-transfer");
      const data = generateTestData().filter(item => !item.disabled);
      transfer.data = data;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      await selectPanelItem(sourcePanel, 0);

      expect(sourcePanel._checkbox.indeterminate).toBe(true);
      expect(sourcePanel._checkbox.checked).toBe(false);
    });
  });

  describe("Search Filtering", () => {
    it("filterable=true should show search input in panels", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      expect(sourcePanel.filterable).toBe(true);

      const filterWrapper = sourcePanel.shadowRoot.querySelector(
        ".ea-transfer-panel__filter-wrapper"
      );
      expect(filterWrapper).toBeTruthy();
    });

    it("entering search keyword should filter non-matching items", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
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

    it("clearing search keyword should show all items", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
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

    it("clearQuery('left') should clear left panel search and reset filter", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      const filterInput = sourcePanel._filterInput;

      filterInput.value = "xyz";
      filterInput.dispatchEvent(new Event("input"));
      await waitForRender();

      transfer.clearQuery("left");
      await waitForRender();

      expect(sourcePanel._filterInput.value).toBe("");
    });

    it("select all during search should only affect visible items", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      const data = [
        { key: 1, label: "Apple" },
        { key: 2, label: "Banana" },
      ];
      transfer.data = data;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      const filterInput = sourcePanel._filterInput;

      filterInput.value = "Apple";
      filterInput.dispatchEvent(new Event("input"));
      await waitForRender();

      await selectAllPanelItems(sourcePanel, true);

      expect(sourcePanel._states.selectedKeys.size).toBe(1);
    });
  });

  describe("Public Methods", () => {
    it("checkValidity method should exist and be callable", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();

      expect(typeof transfer.checkValidity).toBe("function");
    });

    it("reportValidity method should exist and be callable", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();

      expect(typeof transfer.reportValidity).toBe("function");
    });

    it("clearQuery method should exist", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      expect(typeof transfer.clearQuery).toBe("function");
    });

    it("clearQuery('left') and clearQuery('right') should clear respective panels", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.filterable = true;
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      const targetPanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="target"]'
      );

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

  describe("Form Validation", () => {
    it("required=true with empty value should return invalid", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.required = true;
      transfer.data = generateTestData();
      transfer.value = [];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.checkValidity()).toBe(false);
    });

    it("required=true with value should return valid", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.required = true;
      transfer.data = generateTestData();
      transfer.value = [1];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.checkValidity()).toBe(true);
    });

    it("required=false with empty value should be valid", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.checkValidity()).toBe(true);
    });
  });

  describe("Dynamic Modification", () => {
    it("dynamically modifying data should update source panel", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const newData = [{ key: 100, label: "New Option", disabled: false }];
      transfer.data = newData;
      await waitForRender();

      expect(transfer.data.length).toBe(1);
      expect(transfer.data[0].key).toBe(100);
      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      expect(sourcePanel.data.length).toBe(1);
    });

    it("dynamically modifying value should move data to target panel", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [1];
      container.appendChild(transfer);
      await waitForRender();

      const targetPanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="target"]'
      );
      expect(targetPanel.data.length).toBe(1);

      transfer.value = [2, 3];
      await waitForRender();

      expect(transfer.value).toEqual([2, 3]);
      expect(targetPanel.data.length).toBe(2);
    });

    it("dynamically modifying titles should update panel titles", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();

      transfer.titles = ["Old Src", "Old Tgt"];
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      const targetPanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="target"]'
      );
      expect(sourcePanel.getAttribute("data-title")).toBe("Old Src");
      expect(targetPanel.getAttribute("data-title")).toBe("Old Tgt");

      transfer.titles = ["New Src", "New Tgt"];
      await waitForRender();

      expect(transfer.titles).toEqual(["New Src", "New Tgt"]);
      expect(sourcePanel.getAttribute("data-title")).toBe("New Src");
      expect(targetPanel.getAttribute("data-title")).toBe("New Tgt");
    });

    it("dynamically modifying disabled should update state class", async () => {
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

    it("dynamically toggling filterable should add/remove search input", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.filterable).toBe(false);
      transfer.filterable = true;
      await waitForRender();

      expect(transfer.filterable).toBe(true);
      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      expect(sourcePanel.filterable).toBe(true);
    });

    it("dynamically modifying buttonTexts should update button text", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();

      transfer.buttonTexts = ["Right", "Left"];
      await waitForRender();

      expect(transfer.buttonTexts).toEqual(["Right", "Left"]);
    });
  });

  describe("Edge Cases", () => {
    it("empty data should render normally", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = [];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.data).toEqual([]);
      expect(transfer.shadowRoot).toBeDefined();
    });

    it("empty value should render normally", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.value = [];
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.value).toEqual([]);
      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      expect(sourcePanel.data.length).toBe(10);
    });

    it("multiple transfer instances should work independently", async () => {
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

    it("data with disabled items should render normally", async () => {
      const transfer = document.createElement("ea-transfer");
      const data = [
        { key: 1, label: "A", disabled: false },
        { key: 2, label: "B", disabled: true },
        { key: 3, label: "C", disabled: false },
      ];
      transfer.data = data;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      const disabledItems =
        sourcePanel.shadowRoot.querySelectorAll(".is-disabled");
      expect(disabledItems.length).toBe(1);
    });

    it("all disabled data should keep select-all checkbox enabled", async () => {
      const transfer = document.createElement("ea-transfer");
      const data = [
        { key: 1, label: "X", disabled: true },
        { key: 2, label: "Y", disabled: true },
      ];
      transfer.data = data;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      expect(sourcePanel._checkbox.disabled).toBe(false);
      expect(sourcePanel.data.length).toBe(2);
    });

    it("custom dataProps should work with custom data", async () => {
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
      const targetPanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="target"]'
      );
      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      expect(targetPanel.data.length).toBe(1);
      expect(sourcePanel.data.length).toBe(1);

      const disabledItems =
        sourcePanel.shadowRoot.querySelectorAll(".is-disabled");
      expect(disabledItems.length).toBe(1);
    });
  });

  describe("Combined Tests", () => {
    it("should support setting multiple properties simultaneously", async () => {
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

    it("full transfer flow: select → move right → move left", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );

      await selectPanelItem(sourcePanel, 0);
      await selectPanelItem(sourcePanel, 1);

      const rightBtn = transfer.shadowRoot.querySelector(
        '[part~="move-to-right-btn"]'
      );
      rightBtn.click();
      await waitForRender();

      expect(transfer.value.length).toBe(2);

      const targetPanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="target"]'
      );

      await selectPanelItem(targetPanel, 1);

      const leftBtn = transfer.shadowRoot.querySelector(
        '[part~="move-to-left-btn"]'
      );
      leftBtn.click();
      await waitForRender();

      expect(transfer.value.length).toBe(1);
    });
  });

  describe("Disabled State", () => {
    it("should propagate disabled to both panels", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.disabled = true;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      const targetPanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="target"]'
      );
      expect(sourcePanel.disabled).toBe(true);
      expect(targetPanel.disabled).toBe(true);
    });

    it("should disable panel checkbox when disabled", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.disabled = true;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      expect(sourcePanel._checkbox.disabled).toBe(true);
    });

    it("should not move items when disabled", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.disabled = true;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      const initialSourceCount = sourcePanel.data.length;

      await selectPanelItem(sourcePanel, 0);

      const rightBtn = transfer.shadowRoot.querySelector(
        '[part~="move-to-right-btn"]'
      );
      rightBtn.click();
      await waitForRender();

      expect(transfer.value.length).toBe(0);
      expect(sourcePanel.data.length).toBe(initialSourceCount);
    });

    it("should not handle item selection when disabled", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      transfer.disabled = true;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );

      const items = sourcePanel.shadowRoot.querySelectorAll(
        ".ea-transfer-panel__item:not(.is-disabled)"
      );
      const item = items[0];
      if (!item) return;

      const checkbox = getPanelCheckbox(item);
      if (checkbox) {
        setCheckboxChecked(checkbox, true);
        checkbox.dispatchEvent(
          new Event("change", { bubbles: true, composed: true })
        );
      }
      await waitForRender();

      expect(sourcePanel._states.selectedKeys.size).toBe(0);
    });

    it("should not handle select-all when disabled", async () => {
      const transfer = document.createElement("ea-transfer");
      const data = generateTestData().filter(item => !item.disabled);
      transfer.data = data;
      transfer.disabled = true;
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );

      const selectAllCheckbox = sourcePanel.shadowRoot.querySelector(
        ".ea-transfer-panel__checkbox"
      );
      if (selectAllCheckbox) {
        setCheckboxChecked(selectAllCheckbox, true);
        selectAllCheckbox.dispatchEvent(
          new Event("change", { bubbles: true, composed: true })
        );
      }
      await waitForRender();

      expect(sourcePanel._states.selectedKeys.size).toBe(0);
    });

    it("should dynamically propagate disabled when toggled", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      expect(sourcePanel.disabled).toBe(false);

      transfer.disabled = true;
      await waitForRender();

      expect(sourcePanel.disabled).toBe(true);
      expect(sourcePanel._checkbox.disabled).toBe(true);

      transfer.disabled = false;
      await waitForRender();

      expect(sourcePanel.disabled).toBe(false);
    });
  });

  describe("Lifecycle", () => {
    it("connectedCallback should initialize correctly", async () => {
      const transfer = document.createElement("ea-transfer");
      transfer.data = generateTestData();
      container.appendChild(transfer);
      await waitForRender();

      expect(transfer.shadowRoot).toBeDefined();
      const sourcePanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="source"]'
      );
      const targetPanel = transfer.shadowRoot.querySelector(
        'ea-transfer-panel[type="target"]'
      );
      expect(sourcePanel).toBeTruthy();
      expect(targetPanel).toBeTruthy();
      expect(transfer.data.length).toBe(10);
    });

    it("remove() should remove from DOM normally", async () => {
      const transfer = document.createElement("ea-transfer");
      container.appendChild(transfer);
      await waitForRender();
      expect(container.contains(transfer)).toBe(true);

      transfer.remove();
      expect(container.contains(transfer)).toBe(false);
    });
  });
});
