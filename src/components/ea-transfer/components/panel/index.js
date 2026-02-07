import { namespace } from "@/directives/namespace";
import Base from "@components/Base.js";
import stylesheet from "./index.scss?inline";

export class EaTransferPanel extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #list;
  /** @type {HTMLElement} */
  #header;
  /** @type {HTMLElement} */
  #checkbox;
  /** @type {HTMLElement} */
  #title;
  /** @type {HTMLElement} */
  #count;
  /** @type {HTMLElement} */
  #filterWrapper;
  /** @type {HTMLElement} */
  #filterInput;

  /** @type {AbortController} */
  #abortController = new AbortController();

  #states = {
    selectedKeys: new Set(),
    filteredData: [],
    filterText: "",
  };

  static get observedAttributes() {
    return [...super.observedAttributes, "title", "filterable"];
  }

  state = this.properties({
    // type 属性已移除，无实际意义
  });

  propStates = this.properties({
    title: {
      props: true,
      type: String,
      default: "",
      observer: newVal => {
        this.#updateTitle(newVal);
      },
    },
    data: {
      props: true,
      type: Array,
      default: [],
      observer: newVal => {
        this.#handleDataUpdate(newVal);
      },
    },
    selected: {
      props: true,
      type: Array,
      default: [],
      observer: newVal => {
        this.#handleSelectedUpdate(newVal);
      },
    },
    filterable: {
      props: true,
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#handleFilterableUpdate(newVal);
      },
    },
    "filter-placeholder": {
      props: true,
      type: String,
      default: "请输入搜索内容",
      observer: newVal => {
        this.#updateFilterPlaceholder(newVal);
      },
    },
    "filter-method": {
      props: true,
      type: Function,
      rawFunction: true,
      default: null,
    },
    dataProps: {
      props: true,
      type: Object,
      default: () => ({
        key: "key",
        label: "label",
        disabled: "disabled",
      }),
      observer: newVal => {
        this.#updateFieldMapping(newVal);
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-transfer-panel",
      {},
      { filterable: this.filterable }
    );

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    const ns = namespace("transfer-panel");
    this.ns = ns;

    this.shadowRoot.innerHTML = this.html(`
      <div class='${ns.b()}' part='container'>
        <div class='${ns.e("header")}' part='header'>
          <ea-checkbox class='${ns.e("checkbox")}' part='checkbox'></ea-checkbox>
          <span class='${ns.e("title")}' part='title'></span>
          <span class='${ns.e("count")}' part='count'></span>
        </div>
        <div class='${ns.e("body")}' part='body'>
            <div class='${ns.e("filter-wrapper")}' part='filter-wrapper'>
              <ea-input 
                class='${ns.e("filter")}' 
                part='filter'
                placeholder="${this["filter-placeholder"]}"
                clearable
              ></ea-input>
            </div>
          <div class='${ns.e("list")}' part='list'></div>
        </div>
      </div>
    `);

    this.#container = this.shadowRoot.querySelector(ns.cb());
    this.#header = this.shadowRoot.querySelector(ns.ce("header"));
    this.#checkbox = this.shadowRoot.querySelector(ns.ce("checkbox"));
    this.#title = this.shadowRoot.querySelector(ns.ce("title"));
    this.#count = this.shadowRoot.querySelector(ns.ce("count"));
    this.#list = this.shadowRoot.querySelector(ns.ce("list"));
    this.#filterWrapper = this.shadowRoot.querySelector(
      ns.ce("filter-wrapper")
    );
    this.#filterInput = this.shadowRoot.querySelector(ns.ce("filter"));
  }

  connectedCallback() {
    super.connectedCallback();
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#bindEvents();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }

  /**
   * 绑定事件
   */
  #bindEvents() {
    // 绑定列表点击事件
    this.#list.addEventListener("click", this.#onItemClick.bind(this), {
      signal: this.#abortController.signal,
    });

    // 绑定双击事件
    this.#list.addEventListener("dblclick", this.#onItemDblClick.bind(this), {
      signal: this.#abortController.signal,
    });

    // 绑定全选复选框事件
    if (this.#checkbox) {
      this.#checkbox.addEventListener(
        "change",
        this.#onHeaderCheckboxChange.bind(this),
        {
          signal: this.#abortController.signal,
        }
      );
    }

    // 绑定搜索输入事件
    if (this.#filterInput) {
      this.#filterInput.addEventListener(
        "input",
        this.#onFilterInput.bind(this),
        {
          signal: this.#abortController.signal,
        }
      );
    }
  }

  /**
   * 列表项点击事件
   * @param {Event} e
   */
  #onItemClick(e) {
    const item = e.target.closest(`.${this.ns.e("item")}`);
    if (!item) return;

    const key = item.getAttribute("data-key");
    const disabled = item.classList.contains("is-disabled");

    if (disabled) return;

    this.#toggleItemSelection(key);
    this.emit("item-click", {
      detail: {
        key,
        item: this.#getItemByKey(key),
        type: this.type,
      },
    });
  }

  /**
   * 列表项双击事件
   * @param {Event} e
   */
  #onItemDblClick(e) {
    const item = e.target.closest(`.${this.ns.e("item")}`);
    if (!item) return;

    const key = item.getAttribute("data-key");
    const disabled = item.classList.contains("is-disabled");

    if (disabled) return;

    this.emit("item-dblclick", {
      detail: {
        key,
        item: this.#getItemByKey(key),
        type: this.type,
      },
    });
  }

  /**
   * 全选复选框变化事件
   * @param {Event} e
   */
  #onHeaderCheckboxChange(e) {
    const checked = e.target.checked;
    this.#toggleAllSelection(checked);
    this.emit("checkbox-change", {
      detail: {
        checked,
        selectedKeys: Array.from(this.#states.selectedKeys),
        type: this.type,
      },
    });
  }

  /**
   * 搜索输入事件
   * @param {Event} e
   */
  #onFilterInput(e) {
    const filterText = e.target.value.trim();
    this.#states.filterText = filterText;
    this.#applyFilter();
    this.emit("filter", {
      detail: {
        filterText,
        type: this.type,
      },
    });
  }

  /**
   * 切换单个项的选择状态
   * @param {string} key
   */
  #toggleItemSelection(key) {
    if (this.#states.selectedKeys.has(key)) {
      this.#states.selectedKeys.delete(key);
    } else {
      this.#states.selectedKeys.add(key);
    }

    this.#updateSelectionState();
    this.#renderList();
  }

  /**
   * 切换全选状态
   * @param {boolean} checked
   */
  #toggleAllSelection(checked) {
    const availableItems = this.#getAvailableItems();

    if (checked) {
      availableItems.forEach(item => {
        const key = this.#getFieldValue(item, "key");
        this.#states.selectedKeys.add(key);
      });
    } else {
      this.#states.selectedKeys.clear();
    }

    this.#renderList();
  }

  /**
   * 更新选择状态
   */
  #updateSelectionState() {
    if (!this.#checkbox) return;

    const availableItems = this.#getAvailableItems();
    const selectedCount = this.#states.selectedKeys.size;
    const availableCount = availableItems.length;

    if (selectedCount === 0) {
      this.#checkbox.checked = false;
      this.#checkbox.indeterminate = false;
    } else if (selectedCount === availableCount) {
      this.#checkbox.checked = true;
      this.#checkbox.indeterminate = false;
    } else {
      this.#checkbox.checked = false;
      this.#checkbox.indeterminate = true;
    }
  }

  /**
   * 处理数据更新
   * @param {Array} newData
   */
  #handleDataUpdate(newData) {
    this.#states.filteredData = newData || [];
    this.#applyFilter();
  }

  /**
   * 处理选中项更新
   * @param {Array} newSelected
   */
  #handleSelectedUpdate(newSelected) {
    this.#states.selectedKeys = new Set(newSelected || []);
    this.#updateSelectionState();
    this.#renderList();
  }

  /**
   * 处理可过滤状态更新
   * @param {boolean} newFilterable
   */
  #handleFilterableUpdate(newFilterable) {
    // 重新渲染以显示/隐藏搜索框
    this.$render();
  }

  /**
   * 更新标题
   * @param {string} newTitle
   */
  #updateTitle(newTitle) {
    if (this.#title) {
      this.#title.textContent = newTitle || "";
    }
  }

  /**
   * 更新搜索框占位符
   * @param {string} newPlaceholder
   */
  #updateFilterPlaceholder(newPlaceholder) {
    if (this.#filterInput) {
      this.#filterInput.placeholder = newPlaceholder || "请输入搜索内容";
    }
  }

  /**
   * 更新字段映射
   * @param {Object} newDataProps
   */
  #updateFieldMapping(newDataProps) {
    // 字段映射更新后重新渲染列表
    this.#renderList();
  }

  /**
   * 应用过滤
   */
  #applyFilter() {
    if (!this.data || !Array.isArray(this.data)) {
      this.#states.filteredData = [];
      return;
    }

    if (!this.#states.filterText) {
      this.#states.filteredData = this.data;
    } else {
      const filterMethod = this["filter-method"];

      if (filterMethod && typeof filterMethod === "function") {
        // 使用自定义过滤方法
        this.#states.filteredData = this.data.filter(item =>
          filterMethod(this.#states.filterText, item)
        );
      } else {
        // 使用默认过滤方法
        this.#states.filteredData = this.data.filter(item => {
          const label = this.#getFieldValue(item, "label") || "";
          return label
            .toLowerCase()
            .includes(this.#states.filterText.toLowerCase());
        });
      }
    }

    this.#renderList();
  }

  /**
   * 渲染列表
   */
  #renderList() {
    if (!this.#list || !Array.isArray(this.#states.filteredData)) return;

    const items = this.#states.filteredData.map(item => {
      const key = this.#getFieldValue(item, "key");
      const label = this.#getFieldValue(item, "label") || "";
      const disabled = this.#getFieldValue(item, "disabled") || false;
      const selected = this.#states.selectedKeys.has(key);

      const className = this.computedClasslist(this.ns.e("item"), {
        "is-selected": selected,
        "is-disabled": disabled,
      });

      return `
        <div class="${className}" data-key="${key}" part="item">
          <ea-checkbox 
            ${selected ? "checked" : ""} 
            ${disabled ? "disabled" : ""}
            part="item-checkbox"
          ></ea-checkbox>
          <span class="${this.ns.e("item-label")}" part="item-label">${label}</span>
        </div>
      `;
    });

    this.#list.innerHTML = items.join("");
    this.#updateCount();
  }

  /**
   * 更新计数显示
   */
  #updateCount() {
    if (!this.#count) return;

    const total = this.#states.filteredData.length;
    const selected = this.#states.selectedKeys.size;

    this.#count.textContent = `${selected}/${total}`;
  }

  /**
   * 获取字段值
   * @param {Object} item
   * @param {string} field
   * @returns {any}
   */
  #getFieldValue(item, field) {
    const fieldName = this.dataProps[field] || field;
    return item?.[fieldName];
  }

  /**
   * 根据key获取数据项
   * @param {string} key
   * @returns {Object|null}
   */
  #getItemByKey(key) {
    return (
      this.data.find(item => this.#getFieldValue(item, "key") === key) || null
    );
  }

  /**
   * 获取可用的数据项（非禁用的）
   * @returns {Array}
   */
  #getAvailableItems() {
    return (this.#states.filteredData || []).filter(
      item => !this.#getFieldValue(item, "disabled")
    );
  }

  /**
   * 获取当前选中的key列表
   * @returns {Array}
   */
  getSelectedKeys() {
    return Array.from(this.#states.selectedKeys);
  }

  /**
   * 设置选中项
   * @param {Array} keys
   */
  setSelectedKeys(keys) {
    this.#states.selectedKeys = new Set(keys || []);
    this.#updateSelectionState();
    this.#renderList();
  }

  /**
   * 清除选中项
   */
  clearSelection() {
    this.#states.selectedKeys.clear();
    this.#updateSelectionState();
    this.#renderList();
  }

  /**
   * 清除搜索过滤
   */
  clearFilter() {
    if (this.#filterInput) {
      this.#filterInput.value = "";
    }
    this.#states.filterText = "";
    this.#applyFilter();
  }
}

if (!window.customElements.get("ea-transfer-panel")) {
  window.customElements.define("ea-transfer-panel", EaTransferPanel);
}
