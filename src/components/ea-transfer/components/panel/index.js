import { namespace } from "@/directives/namespace";
import Base from "@components/Base.js";
import stylesheet from "./index.scss?inline";
import { i18nManager } from "@/utils/I18nManager";

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
    isEaInputDefined: false,

    selectedKeys: new Set(),
    filterText: "",
    filteredData: [],
  };

  #AbortControllerStates = {
    /** @type {AbortController} */
    filter: new AbortController(),
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "data-title",
      "type",
      "filterable",
      "filter-placeholder",
    ];
  }

  state = this.properties({
    "data-title": {
      type: String,
      default: "",
      observer: newVal => {
        if (this.#title) {
          this.#title.textContent = newVal || "";
        }
      },
    },
    filterable: {
      type: Boolean,
      default: false,
      observer: async newVal => {
        if (!this.#states.isEaInputDefined) {
          await customElements.whenDefined("ea-input");
          this.#states.isEaInputDefined = true;
        }

        this.#handleFilterableUpdate(newVal);

        this.#AbortControllerStates.filter?.abort();

        if (newVal) {
          this.#AbortControllerStates.filter = new AbortController();

          this.#filterInput.addEventListener(
            "input",
            e => {
              e.stopImmediatePropagation();
              const value = e.target.value.trim();
              this.#handleFilterChange(value);
            },
            {
              signal: this.#AbortControllerStates.filter.signal,
            }
          );

          this.#filterInput.addEventListener(
            "ea-clear",
            e => {
              e.stopImmediatePropagation();

              this.#handleFilterChange("");
            },
            {
              signal: this.#AbortControllerStates.filter.signal,
            }
          );
        }
      },
    },
    "filter-placeholder": {
      type: String,
      default: "",
      observer: newVal => {
        if (!this.filterable) return;

        this.#updateFilterPlaceholder(newVal);
      },
    },
    type: {
      type: ["source", "target"],
      default: "source",
      observer: newVal => {},
    },
  });

  propStates = this.properties({
    data: {
      props: true,
      type: Array,
      default: [],
      observer: newVal => {
        this.#handleDataUpdate(newVal);
      },
    },
    filterMethod: {
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
      observer: newVal => {},
    },
    dataMap: {
      props: true,
      type: Object,
      default: () => new Map(),
      observer: newVal => {},
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
    i18nManager.locale = this.locale;

    this.shadowRoot.innerHTML = this.html(`
      <div class='${ns.b()}' part='container'>
        <div class='${ns.e("header")}' part='header'>
          <ea-checkbox class='${ns.e("checkbox")}' part='checkbox'>
            <span class='${ns.e("title")}' part='title'></span>
          </ea-checkbox>
          <span class='${ns.e("count")}' part='count'></span>
        </div>
        <div class='${ns.e("body")}' part='body'>
          <div class='${ns.e("filter-wrapper")}' part='filter-wrapper'>
            <ea-input 
              class='${ns.e("filter")}'
              placeholder="${i18nManager.t("transfer.filterPlaceholder")}"
              part='filter'
              prefix-icon="icon-search"
              clearable
            ></ea-input>
          </div>
          <ul class='${ns.e("list")}' part='list'></ul>
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

    this.updateContainerClasslist();
  }

  connectedCallback() {
    super.connectedCallback();

    this.#bindEvents();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();

    for (controller of Object.values(this.#AbortControllerStates)) {
      controller?.abort();
    }
  }

  /**
   * 清空列表项
   */
  clearList() {
    this.#list.innerHTML = "";
  }

  /**
   * 绑定事件
   */
  #bindEvents() {
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#list.addEventListener(
      "change",
      e => {
        e.stopImmediatePropagation();

        const li = e.target.closest(".ea-transfer-panel__item");
        const isChecked = Boolean(e.target.checked);

        if (isChecked) {
          this.#states.selectedKeys.add(li);
        } else {
          this.#states.selectedKeys.delete(li);
        }

        const isAllChecked =
          this.#states.selectedKeys.size >=
          this.#list.querySelectorAll(
            ".ea-transfer-panel__item:not(.is-disabled)"
          ).length;
        const isSomeChecked = this.#states.selectedKeys.size > 0;

        if (isAllChecked) {
          this.#checkbox.checked = true;
          this.#checkbox.indeterminate = false;
        } else if (isSomeChecked) {
          this.#checkbox.checked = false;
          this.#checkbox.indeterminate = true;
        } else {
          this.#checkbox.checked = false;
          this.#checkbox.indeterminate = false;
        }

        this.emit("ea-transfer-panel-item-change", {
          detail: {
            type: this.type,
            selectedKey: li,
            isChecked,
          },
          bubbles: true,
          composed: true,
        });

        this.#updateCount();
      },
      {
        signal: this.#abortController.signal,
      }
    );

    this.#checkbox.addEventListener(
      "change",
      e => {
        e.stopImmediatePropagation();

        const isChecked = Boolean(e.target.checked);
        const listItems = [
          ...this.#list.querySelectorAll(
            ".ea-transfer-panel__item:not(.is-disabled)"
          ),
        ];

        listItems.forEach(li => {
          const checkbox = li.querySelector(
            ".ea-transfer-panel__item-checkbox:not([disabled])"
          );
          if (!checkbox) return;

          checkbox.checked = isChecked;

          if (isChecked) {
            this.#states.selectedKeys.add(li);
          } else {
            this.#states.selectedKeys.delete(li);
          }
        });

        this.emit("ea-transfer-panel-select-all", {
          detail: {
            type: this.type,
            selectedKeys: listItems,
            isChecked,
          },
          bubbles: true,
          composed: true,
        });

        this.#updateCount();
      },
      {
        signal: this.#abortController.signal,
      }
    );
  }

  /**
   * 更新计数显示
   */
  #updateCount = () => {
    if (!this.#count) return;

    const totalItems = this.#list.querySelectorAll(
      ".ea-transfer-panel__item"
    ).length;
    const checkedItems = this.#states.selectedKeys.size;

    this.#count.textContent = `${checkedItems}/${totalItems}`;
  };

  /**
   * 处理数据更新
   * @param {Array} newData
   */
  #handleDataUpdate = newData => {
    this.clearList();

    newData.forEach(item => {
      this.#list.appendChild(item);
    });

    this.#filterData();

    if (newData.length === 0) {
      this.#checkbox.disabled = true;
      this.#checkbox.checked = false;
      this.#checkbox.indeterminate = false;
    } else {
      this.#checkbox.disabled = false;
    }
  };

  /**
   * 处理可筛选状态更新
   * @param {boolean} filterable
   */
  #handleFilterableUpdate = filterable => {
    if (this.#filterWrapper) {
      if (filterable) {
        this.#updateFilterPlaceholder(this["filter-placeholder"]);
      } else {
        this.#handleFilterChange("");
      }

      this.updateContainerClasslist();
    }
  };

  /**
   * 处理筛选条件变化
   * @param {string} filterText
   */
  #handleFilterChange = filterText => {
    this.#states.filterText = filterText;

    this.#filterData();
  };

  /**
   * 执行数据筛选
   */
  #filterData = () => {
    const { key, label, disabled } = this.dataProps;
    const filterText = this.#states.filterText || "";
    const filterTextLower = filterText.toLowerCase();

    const allItems = [
      ...this.#list.querySelectorAll(".ea-transfer-panel__item"),
    ];

    if (!filterText) {
      allItems.forEach(item => {
        item.style.display = "block";
      });
      this.#updateCount();
      return;
    }

    if (this.filterMethod && typeof this.filterMethod === "function") {
      allItems.forEach(item => {
        const data = this.dataMap?.get(item) || {};
        const shouldShow = this.filterMethod(filterText, data);
        item.style.display = shouldShow ? "block" : "none";
      });
    } else {
      allItems.forEach(item => {
        const data = this.dataMap?.get(item) || {};
        const itemLabel = data[label] || "";
        const shouldShow = itemLabel.toLowerCase().includes(filterTextLower);
        item.style.display = shouldShow ? "block" : "none";
      });
    }

    this.#updateCount();
  };

  /**
   * 更新搜索框占位符
   * @param {string} newPlaceholder
   */
  #updateFilterPlaceholder(newPlaceholder) {
    if (this.#filterInput) {
      if (!this.hasAttribute("filter-placeholder")) {
        this.#filterInput.placeholder =
          newPlaceholder || i18nManager.t("transfer.filterPlaceholder");
      }
    }
  }

  $updateLocalization(locale) {
    i18nManager.locale = locale;

    this.#updateFilterPlaceholder();
  }
}

if (!window.customElements.get("ea-transfer-panel")) {
  window.customElements.define("ea-transfer-panel", EaTransferPanel);
}
