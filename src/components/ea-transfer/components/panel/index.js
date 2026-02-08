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
    lastDataHash: "", // 数据哈希值，用于检测数据变化
    itemElements: new Map(), // 缓存 DOM 元素
  };

  static get observedAttributes() {
    return [...super.observedAttributes, "data-title", "type", "filterable"];
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
    filterable: {
      props: true,
      type: Boolean,
      default: false,
      observer: newVal => {
        // this.#handleFilterableUpdate(newVal);
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
              part='filter'
              placeholder="${this["filter-placeholder"]}"
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
  }

  connectedCallback() {
    super.connectedCallback();

    this.#bindEvents();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
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

        // 更新计数显示
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

        // 更新计数显示
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
      ".ea-transfer-panel__item:not(.is-disabled)"
    ).length;
    const checkedItems = this.#states.selectedKeys.size;

    this.#count.textContent = `${checkedItems}/${totalItems}`;
  };

  /**
   * 处理数据更新
   * @param {Array} newData
   */
  #handleDataUpdate = newData => {
    newData.forEach(item => {
      this.#list.appendChild(item);
    });

    // 数据更新后更新计数
    this.#updateCount();
  };

  /**
   * 更新搜索框占位符
   * @param {string} newPlaceholder
   */
  #updateFilterPlaceholder(newPlaceholder) {
    if (this.#filterInput) {
      this.#filterInput.placeholder = newPlaceholder || "请输入搜索内容";
    }
  }
}

if (!window.customElements.get("ea-transfer-panel")) {
  window.customElements.define("ea-transfer-panel", EaTransferPanel);
}
