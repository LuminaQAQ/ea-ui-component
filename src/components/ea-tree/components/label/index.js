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
    ];
  }

  state = this.properties({
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
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    expanded: {
      type: Boolean,
      default: false,
      observer: newVal => {
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
      observer: newVal => {
        this.#updateCheckboxState();
        this.updateContainerClasslist();
      },
    },
  });

  propStates = this.properties({
    hasChildren: {
      props: true,
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    "show-checkbox": {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
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
  }

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#checkboxElement.addEventListener(
      "change",
      e => {
        e.stopImmediatePropagation();

        this.checked = e.detail.checked;

        this.emit("ea-tree-checkbox-click", {
          bubbles: true,
          composed: true,
          detail: {
            label: this,
            checked: e.detail.checked,
          },
        });
      },
      {
        signal: this.#abortController.signal,
      }
    );

    this.#container.addEventListener(
      "click",
      e => {
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
      },
      {
        signal: this.#abortController.signal,
      }
    );
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-tree-label")) {
  window.customElements.define("ea-tree-label", EaTreeLabel);
}
