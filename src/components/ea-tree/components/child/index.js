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
    return [
      ...super.observedAttributes,
      "show-checkbox",
      "checked",
      "expanded",
    ];
  }

  #treeState = {
    expandedNodes: new Set(),
    selectedNode: null,
  };

  #abortControllers = {
    /** @type {AbortController} */
    dataController: null,
  };

  propState = this.properties({
    data: {
      props: true,
      type: Array,
      default: "",
      /** @param {Array} newVal */
      observer: async newVal => {
        await customElements.whenDefined("ea-tree-label");

        this.#abortControllers.dataController?.abort();

        if (Array.isArray(newVal)) {
          this.#abortControllers.dataController = new AbortController();

          const childrenSlotEl = this.#getChildrenSlotElement();
          childrenSlotEl.innerHTML = "";

          this.#handleTreeRender(newVal);
        } else if (typeof newVal === "object" && newVal) {
          const { action, children } = newVal;

          if (action === "append") {
            this.#handleTreeRender(children);
          } else if (action === "insert-before") {
            // this.#handleInsertBefore(nodeKey, data);
          }
        }
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
    "node-key": {
      props: true,
      type: String,
      default: "id",
    },
    "show-checkbox": {
      type: Boolean,
      default: false,
      observer: () => {
        this.#updateCheckboxVisibility();
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
    expanded: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.hidden = newVal ? false : true;

        this.updateContainerClasslist();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  /**
   * 更新 checkbox 可见性
   */
  #updateCheckboxVisibility = () => {
    const labels = this.#container.querySelectorAll("ea-tree-label");
    labels.forEach(label => {
      label["show-checkbox"] = this["show-checkbox"];
    });
  };

  updateContainerClasslist() {
    const className = this.computedClasslist(
      this.ns.b(),
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
      <div class='${ns.b()}' part='container'>
        <slot name="children"></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(ns.cb());
  }

  /**
   * 获取或创建子节点插槽元素
   * @return {HTMLElement} 子节点插槽元素
   */
  #getChildrenSlotElement = () => {
    let childrenSlotEl = this.querySelector('[slot="children"]');

    if (!childrenSlotEl) {
      const childrenWrapper = document.createElement("div");
      childrenWrapper.slot = "children";
      this.appendChild(childrenWrapper);
      childrenSlotEl = childrenWrapper;
    } else {
    }
    return childrenSlotEl;
  };

  /**
   * 创建树节点路径
   * @param {number} index 节点索引
   * @returns {string} 节点路径
   */
  #createNodePath = index => {
    const parentLabel = this.parentElement?.querySelector("ea-tree-label");
    if (parentLabel) {
      const parentPath = parentLabel.getAttribute("path");
      return `${parentPath}-${index + 1}`;
    }
    return (index + 1).toString();
  };

  /**
   * 创建子节点元素
   * @param {Object} item 数据项
   * @param {number} index 索引
   * @returns {Object} 包含section、treeLabel和tree的对象
   */
  #createChildNode = (item, index) => {
    if (!item) return { sec: null, treeLabel: null, tree: null };

    const { children, disabled } = this.dataProps;
    const sec = document.createElement("section");
    const tree = document.createElement("ea-tree-child");
    const treeLabel = document.createElement("ea-tree-label");

    sec.className = this.ns.e("children");
    sec.part = "children-wrapper";
    tree.part = "children";
    treeLabel.part = "label";

    treeLabel.dataProps = this.dataProps;
    tree.dataProps = this.dataProps;
    treeLabel.data = item;
    tree.data = item[children];
    tree.hidden = true;
    treeLabel["show-checkbox"] = this["show-checkbox"];
    treeLabel.setAttribute("path", this.#createNodePath(index));

    if (disabled && item[disabled] === true) {
      treeLabel.toggleAttribute("disabled", true);
    }

    if (this["show-checkbox"]) {
      tree.toggleAttribute("show-checkbox", true);
    }

    const hasChildren = item[children] && item[children].length > 0;
    if (hasChildren) {
      treeLabel.hasChildren = true;
      tree.hidden = !this.#treeState.expandedNodes.has(treeLabel);
    }

    return { sec, treeLabel, tree };
  };

  /**
   * 渲染树节点
   * @param {Array} treeData 树数据
   */
  #handleTreeRender = treeData => {
    const frag = document.createDocumentFragment();
    const childrenSlotEl = this.#getChildrenSlotElement();

    treeData.forEach((item, index) => {
      const { sec, treeLabel, tree } = this.#createChildNode(item, index);

      sec.appendChild(treeLabel);
      sec.appendChild(tree);
      frag.appendChild(sec);
    });

    childrenSlotEl.appendChild(frag);
  };

  #updateCheckboxState = checked => {
    this.#container.querySelectorAll("ea-tree-label").forEach(label => {
      label.checked = checked;
    });

    this.#container.querySelectorAll("ea-tree-child").forEach(child => {
      child.checked = checked;
    });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.updateContainerClasslist();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();

    for (const ac of Object.values(this.#abortControllers)) {
      ac?.abort();
    }
  }
}

if (!customElements.get("ea-tree-child")) {
  customElements.define("ea-tree-child", EaTreeChild);
}
