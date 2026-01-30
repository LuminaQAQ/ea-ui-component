import { namespace } from "@/directives/namespace";
import Base from "@components/Base.js";
import stylesheet from "./index.scss?inline";

export class EaTreeLabel extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #textElement;
  /** @type {HTMLElement} */
  #toggleElement;

  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "label", "expanded"];
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
    item: {
      props: true,
      type: Object,
      default: null,
    },
    expanded: {
      props: false,
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
  });

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
        <span class='${ns.e("text")}' part='text'></span>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(`.${ns.b()}`);
    this.#textElement = this.shadowRoot.querySelector(`.${ns.e("text")}`);
    this.#toggleElement = this.shadowRoot.querySelector(`.${ns.e("toggle")}`);

    this.updateContainerClasslist();
  }

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.addEventListener(
      "click",
      e => {
        e.stopImmediatePropagation();

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
