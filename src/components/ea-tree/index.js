import { namespace } from "@/directives/namespace";
import Base from "@components/Base.js";
import stylesheet from "./index.scss?inline";
import "./components/label/index";
import "./components/children/index";

export class EaTree extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  propState = this.properties({
    data: {
      props: true,
      type: Array,
      default: "",
      /** @param {Array} newVal */
      observer: async newVal => {
        await customElements.whenDefined("ea-tree");

        this.#container.innerHTML = "";

        const { label, children } = this.dataProps;
        const frag = document.createDocumentFragment();

        if (newVal) {
          newVal.forEach(item => {
            const sec = document.createElement("section");
            const tree = document.createElement("ea-tree");
            sec.innerHTML = `<ea-tree-label label="${item[label]}"></ea-tree-label>`;
            tree.dataProps = this.dataProps;
            tree.data = item[children];
            sec.appendChild(tree);
            frag.appendChild(sec);
          });
        }

        this.#container.appendChild(frag);
      },
    },
    dataProps: {
      props: true,
      type: Object,
      default: {
        children: "children",
        label: "label",
      },
      observer: newVal => {},
    },
  });

  prop;

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-tree", {
      // ['--' + this.type]: this.type,
    });

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    const ns = namespace("tree");

    this.ns = ns;

    this.shadowRoot.innerHTML = `
      <div class='${ns.b("tree")}' part='container'>
      </div>
      <slot></slot>
    `;

    this.#container = this.shadowRoot.querySelector(`.${ns.b("tree")}`); // 更新查询选择器
  }

  connectedCallback() {
    super.connectedCallback();
    this.#abortController?.abort();
    this.#abortController = new AbortController();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!customElements.get("ea-tree")) {
  customElements.define("ea-tree", EaTree);
}
