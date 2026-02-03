import { namespace } from "@/directives/namespace";
import Base from "@components/Base.js";
import stylesheet from "./index.scss?inline";
import "@components/ea-checkbox";

export class EaTreeLabel extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #textElement;
  /** @type {HTMLElement} */
  #toggleElement;
  /** @type {HTMLElement} */
  #checkboxElement;

  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "label",
      "expanded",
      "selected",
      "checked",
      "indeterminate",
      "show-checkbox",
      "disabled",
      "path",
    ];
  }

  state = this.properties({
    path: {
      type: String,
      default: "",
    },

    label: {
      type: String,
      default: "",
      observer: newVal => {
        this.#textElement.textContent = newVal;
      },
    },
    selected: {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    expanded: {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    checked: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#updateCheckboxState(newVal);
        this.updateContainerClasslist();
      },
    },
    indeterminate: {
      type: Boolean,
      default: false,
      observer: () => {
        this.#updateCheckboxState();
        this.updateContainerClasslist();
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: () => {
        this.#updateDisabledState();
        this.updateContainerClasslist();
      },
    },
    "show-checkbox": {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
  });

  propStates = this.properties({
    hasChildren: {
      props: true,
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    dataProps: {
      props: true,
      type: Object,
      default: {
        children: "children",
        label: "label",
        disabled: "disabled",
      },
      observer: () => {},
    },
    data: {
      props: true,
      type: Object,
      default: {},
      observer: newVal => {
        const { children, label, disabled } = this.dataProps;

        this.label = newVal?.[label] || this.label;
        this.hasChildren = newVal?.[children]?.length > 0;
        this.disabled = newVal?.[disabled] || false;
      },
    },
  });

  /**
   * 更新 checkbox 状态
   * @param {boolean} checked - 是否选中
   * @param {boolean} indeterminate - 是否不确定
   */
  #updateCheckboxState = (
    checked = this.checked,
    indeterminate = this.indeterminate
  ) => {
    if (!this.#checkboxElement) return;

    this.#checkboxElement.checked = checked;
    this.#checkboxElement.indeterminate = indeterminate;
  };

  /**
   * 更新禁用状态
   */
  #updateDisabledState = () => {
    if (!this.#checkboxElement) return;

    this.#checkboxElement.disabled = this.disabled;
  };

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-tree-label",
      {
        // ['--' + this.type]: this.type,
      },
      {
        "has-children": this.hasChildren,
        expanded: this.expanded,
        selected: this.selected,
        checked: this.checked,
        indeterminate: this.indeterminate,
        "show-checkbox": this["show-checkbox"],
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
    const ns = namespace("tree-label");

    this.ns = ns;

    this.shadowRoot.innerHTML = `
      <div class='${ns.b()}' part='container'>
        <ea-icon icon="icon-angle-right" class='${ns.e("toggle-icon")}' part='toggle'></ea-icon>
        <ea-checkbox class='${ns.e("checkbox")}' part='checkbox'></ea-checkbox>
        <span class='${ns.e("text")}' part='text'></span>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(`.${ns.b()}`);
    this.#textElement = this.shadowRoot.querySelector(`.${ns.e("text")}`);
    this.#checkboxElement = this.shadowRoot.querySelector(ns.ce("checkbox"));
    this.#toggleElement = this.shadowRoot.querySelector(`.${ns.e("toggle")}`);

    this.updateContainerClasslist();
    this.#updateDisabledState();
  }

  /**
   * 处理复选框变化事件
   * @param {Event} e 事件对象
   */
  #handleCheckboxChange = e => {
    e.stopImmediatePropagation();

    if (this.disabled) return;

    this.checked = e.detail.checked;

    this.emit("ea-tree-checkbox-click", {
      bubbles: true,
      composed: true,
      detail: {
        label: this,
        checked: e.detail.checked,
      },
    });
  };

  /**
   * 处理标签点击事件
   * @param {Event} e 事件对象
   */
  #handleLabelClick = e => {
    e.stopImmediatePropagation();

    const checkbox = e.target.closest(this.ns.ce("checkbox"));
    if (checkbox) return;

    const child = this.parentElement.querySelector("ea-tree-child");

    this.emit("ea-tree-label-click", {
      bubbles: true,
      composed: true,
      detail: {
        label: this,
        child,
      },
    });
  };

  /**
   * 绑定事件监听器
   */
  #bindEventListeners = () => {
    this.#checkboxElement.addEventListener(
      "change",
      this.#handleCheckboxChange,
      {
        signal: this.#abortController.signal,
      }
    );

    this.#container.addEventListener("click", this.#handleLabelClick, {
      signal: this.#abortController.signal,
    });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#bindEventListeners();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }

  /**
   * 获取节点深度
   * @returns {number} 节点深度
   */
  getDepth = () => {
    const path = this.path;
    return path ? path.split("-").length : 0;
  };

  /**
   * 判断是否为根节点
   * @returns {boolean} 是否为根节点
   */
  isRoot = () => {
    return this.getDepth() === 1;
  };

  /**
   * 判断是否为叶子节点
   * @returns {boolean} 是否为叶子节点
   */
  isLeaf = () => {
    if (!this.hasChildren) return true;

    const childLabels = childTree.querySelectorAll("ea-tree-label");
    return childLabels.length === 0;
  };
}

if (!window.customElements.get("ea-tree-label")) {
  window.customElements.define("ea-tree-label", EaTreeLabel);
}
