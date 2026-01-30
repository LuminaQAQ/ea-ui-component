import { namespace } from "@/directives/namespace";
import Base from "@components/Base.js";
import stylesheet from "./index.scss?inline";
import "../label/index";

export class EaTreeChild extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  #dataStates = {
    nodes: new Map(),
    expandedNodes: new Set(),
    selectedNode: null,
  };

  #AbortControllerStates = {
    /** @type {AbortController} */
    dataAC: null,
  };

  propState = this.properties({
    data: {
      props: true,
      type: Array,
      default: "",
      /** @param {Array} newVal */
      observer: async newVal => {
        await customElements.whenDefined("ea-tree");
        await customElements.whenDefined("ea-tree-label");

        this.#AbortControllerStates.dataAC?.abort();

        this.#container.innerHTML = "";

        if (newVal) {
          this.#AbortControllerStates.dataAC = new AbortController();

          this.#handleTreeRender(newVal);
        }
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

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-tree",
      {
        // ['--' + this.type]: this.type,
      },
      {}
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
    const ns = namespace("tree-child");

    this.ns = ns;

    this.shadowRoot.innerHTML = `
      <div class='${ns.b()}' part='container'></div>
    `;

    this.#container = this.shadowRoot.querySelector(ns.cb());
  }

  /**
   * 渲染树节点
   * @param {Array} treeData 树数据
   */
  #handleTreeRender = treeData => {
    const { label, children } = this.dataProps;
    const frag = document.createDocumentFragment();

    treeData.forEach(item => {
      const sec = document.createElement("section");
      const tree = document.createElement("ea-tree-child");
      const treeLabel = document.createElement("ea-tree-label");

      sec.className = this.ns.e("children");
      sec.part = "children-wrapper";
      tree.part = "children";
      treeLabel.part = "label";

      treeLabel.label = item[label];
      tree.dataProps = this.dataProps;
      tree.data = item[children];

      const hasChildren = item[children] && item[children].length > 0;
      if (hasChildren) {
        treeLabel.hasChildren = true;
        tree.hidden = !this.#dataStates.expandedNodes.has(treeLabel);
      }

      sec.appendChild(treeLabel);
      sec.appendChild(tree);
      frag.appendChild(sec);
    });

    this.#container.appendChild(frag);
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.updateContainerClasslist();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();

    for (const ac of Object.values(this.#AbortControllerStates)) {
      ac?.abort();
    }
  }
}

if (!customElements.get("ea-tree-child")) {
  customElements.define("ea-tree-child", EaTreeChild);
}
