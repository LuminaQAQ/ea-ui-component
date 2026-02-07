import Base from "@components/Base.js";
import { namespace } from "@/directives/namespace";
import stylesheet from "./index.scss?inline";
import "./components/panel/index.js";
import "@components/ea-checkbox/index.js";
import "@components/ea-button/index.js";
import "@components/ea-icon/index.js";
import "@components/ea-input/index.js";

export class EaTransfer extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #sourcePanel;
  /** @type {HTMLElement} */
  #targetPanel;
  /** @type {HTMLElement} */
  #moveToRightBtn;
  /** @type {HTMLElement} */
  #moveToLeftBtn;

  /** @type {AbortController} */
  #abortController = new AbortController();

  #AbortControllerStates = {
    /** @type {AbortController|null} */
    sourceClickAbortController: null,
    /** @type {AbortController|null} */
    targetClickAbortController: null,
    /** @type {AbortController|null} */
    sourceDblClickAbortController: null,
    /** @type {AbortController|null} */
    targetDblClickAbortController: null,
    /** @type {AbortController|null} */
    buttonClickAbortController: null,
  };

  #states = {
    sourceSelectedKeys: new Set(),
    targetSelectedKeys: new Set(),
    dataMap: new Map(),
    fieldMapping: {
      key: "key",
      label: "label",
      disabled: "disabled",
    },
  };

  static get observedAttributes() {
    return [...super.observedAttributes, "disabled"];
  }

  state = this.properties({
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
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
    value: {
      props: true,
      type: Array,
      default: [],
      observer: newVal => {
        this.#handleValueUpdate(newVal);
      },
    },
    dataProps: {
      props: true,
      type: Object,
      default: () => ({}),
      observer: newVal => {
        this.#updateFieldMapping(newVal);
      },
    },
    titles: {
      props: true,
      type: Array,
      default: () => ["列表 1", "列表 2"],
      observer: newVal => {
        this.#updateTitles(newVal);
      },
    },
    "button-texts": {
      props: true,
      type: Array,
      default: () => [],
      observer: newVal => {
        this.#updateButtonTexts(newVal);
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
      observer: newVal => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-transfer",
      {},
      {
        disabled: this.disabled,
      }
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
    const ns = namespace("transfer");
    this.ns = ns;

    this.shadowRoot.innerHTML = this.html(`
      <div class='${ns.b()}' part='container'>
        <div class='${ns.e("panels")}' part='panels'>
          <ea-transfer-panel 
            class='${ns.e("panel")} ${ns.m("panel", "source")}' 
            part='panel source-panel'
            title="${this.titles?.[0] || "列表 1"}"
            filterable="${this.filterable}"
            filter-placeholder="${this["filter-placeholder"]}"
          ></ea-transfer-panel>
          <div class='${ns.e("buttons")}' part='buttons'>
            <ea-button 
              class='${ns.e("button")} ${ns.e("move-to-right-btn")}' 
              part='button move-to-right-btn'
              type="primary" 
              size="small" 
              disabled
            >
              <ea-icon icon="icon-angle-right"></ea-icon>
            </ea-button>
            <ea-button 
              class='${ns.e("button")} ${ns.e("move-to-left-btn")}' 
              part='button move-to-left-btn'
              type="primary" 
              size="small" 
              disabled
            >
              <ea-icon icon="icon-angle-left"></ea-icon>
            </ea-button>
          </div>
          <ea-transfer-panel 
            class='${ns.e("panel")} ${ns.m("panel", "target")}' 
            part='panel target-panel'
            title="${this.titles?.[1] || "列表 2"}"
            filterable="${this.filterable}"
            filter-placeholder="${this["filter-placeholder"]}"
          ></ea-transfer-panel>
        </div>
      </div>
    `);

    this.#container = this.shadowRoot.querySelector(ns.cb());
    this.#sourcePanel = this.shadowRoot.querySelector(
      `${ns.ce("panel")}${ns.cm("source")}`
    );
    this.#targetPanel = this.shadowRoot.querySelector(
      `${ns.ce("panel")}${ns.cm("target")}`
    );

    this.#moveToRightBtn = this.shadowRoot.querySelector(
      `${ns.ce("button")}${ns.ce("move-to-right-btn")}`
    );
    this.#moveToLeftBtn = this.shadowRoot.querySelector(
      `${ns.ce("button")}${ns.ce("move-to-left-btn")}`
    );
  }

  connectedCallback() {
    super.connectedCallback();

    this.#bindEvents();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
    for (const key in this.#AbortControllerStates) {
      this.#AbortControllerStates[key]?.abort();
    }
  }

  /**
   * 绑定事件
   */
  #bindEvents() {
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    // 绑定源面板事件
    if (this.#sourcePanel) {
      this.#sourcePanel.addEventListener(
        "item-click",
        this.#onSourceItemClick.bind(this),
        { signal: this.#abortController.signal }
      );
      this.#sourcePanel.addEventListener(
        "item-dblclick",
        this.#onSourceItemDblClick.bind(this),
        { signal: this.#abortController.signal }
      );
      this.#sourcePanel.addEventListener(
        "checkbox-change",
        this.#onSourceHeaderCheckboxChange.bind(this),
        { signal: this.#abortController.signal }
      );
    }

    // 绑定目标面板事件
    if (this.#targetPanel) {
      this.#targetPanel.addEventListener(
        "item-click",
        this.#onTargetItemClick.bind(this),
        { signal: this.#abortController.signal }
      );
      this.#targetPanel.addEventListener(
        "item-dblclick",
        this.#onTargetItemDblClick.bind(this),
        { signal: this.#abortController.signal }
      );
      this.#targetPanel.addEventListener(
        "checkbox-change",
        this.#onTargetHeaderCheckboxChange.bind(this),
        { signal: this.#abortController.signal }
      );
    }

    // 绑定按钮点击事件
    this.#AbortControllerStates.buttonClickAbortController?.abort();
    this.#AbortControllerStates.buttonClickAbortController =
      new AbortController();

    this.#moveToRightBtn.addEventListener("click", this.#onMoveToRight, {
      signal: this.#AbortControllerStates.buttonClickAbortController.signal,
    });

    this.#moveToLeftBtn.addEventListener("click", this.#onMoveToLeft, {
      signal: this.#AbortControllerStates.buttonClickAbortController.signal,
    });
  }

  /**
   * 处理数据更新
   * @param {Array} newData
   */
  #handleDataUpdate = newData => {
    if (!Array.isArray(newData)) return;

    // 更新源面板数据
    if (this.#sourcePanel) {
      this.#sourcePanel.data = newData;
      this.#sourcePanel.selected = [];
    }

    // 更新目标面板数据
    if (this.#targetPanel) {
      this.#targetPanel.data = newData;
      this.#targetPanel.selected = this.value;
    }

    this.#updateButtonStates();
  };

  /**
   * 处理值更新
   * @param {Array} newValue
   */
  #handleValueUpdate = newValue => {
    if (!Array.isArray(newValue)) return;

    // 更新目标面板选中项
    if (this.#targetPanel) {
      this.#targetPanel.selected = newValue;
    }

    this.#updateButtonStates();
  };

  /**
   * 更新字段映射
   * @param {Object} newProps
   */
  #updateFieldMapping = newDataProps => {
    if (newDataProps && typeof newDataProps === "object") {
      this.#states.fieldMapping = {
        ...this.#states.fieldMapping,
        ...newDataProps,
      };
    }

    this.#updateButtonStates();
  };

  /**
   * 更新按钮状态
   */
  #updateButtonStates = () => {
    const hasSourceSelected = this.#states.sourceSelectedKeys.size > 0;
    const hasTargetSelected = this.#states.targetSelectedKeys.size > 0;

    this.#moveToRightBtn.disabled = !hasSourceSelected || this.disabled;
    this.#moveToLeftBtn.disabled = !hasTargetSelected || this.disabled;
  };

  /**
   * 源面板项点击事件
   * @param {CustomEvent} e
   */
  #onSourceItemClick = e => {
    const { key, item } = e.detail;

    if (this.#states.sourceSelectedKeys.has(key)) {
      this.#states.sourceSelectedKeys.delete(key);
    } else {
      this.#states.sourceSelectedKeys.add(key);
    }

    this.#updateButtonStates();
    this.#emitChangeEvent();
  };

  /**
   * 目标面板项点击事件
   * @param {CustomEvent} e
   */
  #onTargetItemClick = e => {
    const { key, item } = e.detail;

    if (this.#states.targetSelectedKeys.has(key)) {
      this.#states.targetSelectedKeys.delete(key);
    } else {
      this.#states.targetSelectedKeys.add(key);
    }

    this.#updateButtonStates();
    this.#emitChangeEvent();
  };

  /**
   * 向右移动按钮点击事件
   */
  #onMoveToRight = () => {
    if (this.#states.sourceSelectedKeys.size === 0) return;

    const newValue = [...this.value, ...this.#states.sourceSelectedKeys];
    this.value = newValue;
    this.#states.targetSelectedKeys.clear();

    this.#updateButtonStates();
    this.#emitChangeEvent();
  };

  /**
   * 向左移动按钮点击事件
   */
  #onMoveToLeft = () => {
    if (this.#states.targetSelectedKeys.size === 0) return;

    const newValue = this.value.filter(
      key => !this.#states.targetSelectedKeys.has(key)
    );
    this.value = newValue;
    this.#states.targetSelectedKeys.clear();

    this.#updateButtonStates();
    this.#emitChangeEvent();
  };

  /**
   * 触发 change 事件
   */
  #emitChangeEvent = () => {
    this.emit("change", {
      detail: {
        value: this.value,
        sourceSelectedKeys: Array.from(this.#states.sourceSelectedKeys),
        targetSelectedKeys: Array.from(this.#states.targetSelectedKeys),
      },
      bubbles: true,
      composed: true,
    });
  };

  /**
   * 更新标题
   * @param {Array} titles
   */
  #updateTitles = titles => {
    if (Array.isArray(titles) && titles.length >= 2) {
      // 更新源面板标题
      if (this.#sourcePanel) {
        this.#sourcePanel.title = titles[0];
      }

      // 更新目标面板标题
      if (this.#targetPanel) {
        this.#targetPanel.title = titles[1];
      }
    }
  };

  /**
   * 更新按钮文本
   * @param {Array} buttonTexts
   */
  #updateButtonTexts = buttonTexts => {
    // 按钮文本现在由 TransferPanel 组件管理，此方法保留为空
  };

  /**
   * 处理可过滤更新
   * @param {boolean} filterable
   */
  #handleFilterableUpdate = filterable => {
    // 重新渲染以显示/隐藏过滤输入框
    this.$render();
    this.#bindEvents();

    // 更新面板数据
    if (this.#sourcePanel) {
      this.#sourcePanel.data = this.data;
      this.#sourcePanel.selected = [];
    }
    if (this.#targetPanel) {
      this.#targetPanel.data = this.data;
      this.#targetPanel.selected = this.value;
    }
  };

  /**
   * 更新过滤占位符
   * @param {string} placeholder
   */
  #updateFilterPlaceholder = placeholder => {
    // 过滤占位符现在由 TransferPanel 组件管理，此方法保留为空
  };

  /**
   * 源面板全选复选框变化事件
   * @param {CustomEvent} e
   */
  #onSourceHeaderCheckboxChange = e => {
    const { checked, selectedKeys } = e.detail;

    this.#states.sourceSelectedKeys = new Set(selectedKeys);
    this.#updateButtonStates();
    this.#emitChangeEvent();
  };

  /**
   * 目标面板全选复选框变化事件
   * @param {CustomEvent} e
   */
  #onTargetHeaderCheckboxChange = e => {
    const { checked, selectedKeys } = e.detail;

    this.#states.targetSelectedKeys = new Set(selectedKeys);
    this.#updateButtonStates();
    this.#emitChangeEvent();
  };

  /**
   * 源面板项双击事件
   * @param {CustomEvent} e
   */
  #onSourceItemDblClick = e => {
    const { key, item } = e.detail;

    // 双击快速移动到目标列表
    const newValue = [...this.value, key];
    this.value = newValue;

    this.#updateButtonStates();
    this.#emitChangeEvent();
  };

  /**
   * 目标面板项双击事件
   * @param {CustomEvent} e
   */
  #onTargetItemDblClick = e => {
    const { key, item } = e.detail;

    // 双击快速移回源列表
    const newValue = this.value.filter(k => k !== key);
    this.value = newValue;

    this.#updateButtonStates();
    this.#emitChangeEvent();
  };
}

if (!customElements.get("ea-transfer")) {
  customElements.define("ea-transfer", EaTransfer);
}
