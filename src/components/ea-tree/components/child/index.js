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
    return [...super.observedAttributes, "show-checkbox", "checked"];
  }

  #dataStates = {
    nodes: new WeakMap(),
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

        let childrenSlotEl = this.querySelector("slot[name='children']");
        if (childrenSlotEl) childrenSlotEl.innerHTML = "";

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
    "show-checkbox": {
      type: Boolean,
      default: false,
      observer: newVal => {
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
   * 渲染树节点
   * @param {Array} treeData 树数据
   */
  #handleTreeRender = treeData => {
    const { label, children } = this.dataProps;
    const frag = document.createDocumentFragment();

    /**
     * 获取或创建 slot=children 的元素
     * @return {HTMLElement} slot=children 的元素
     */
    const getLightChildrenSlot = () => {
      let childrenSlotEl = this.querySelector("slot[name='children']");
      if (!childrenSlotEl) {
        const childrenWrapper = document.createElement("div");
        childrenWrapper.slot = "children";
        this.appendChild(childrenWrapper);

        childrenSlotEl = childrenWrapper;
      }

      return childrenSlotEl;
    };

    const childrenSlotEl = getLightChildrenSlot();

    // 获取当前节点的父标签（如果有）
    const parentLabel = this.parentElement?.querySelector("ea-tree-label");

    treeData.forEach((item, index) => {
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
      treeLabel["show-checkbox"] = this["show-checkbox"];

      // 设置节点路径
      if (parentLabel) {
        const parentPath = parentLabel.getAttribute("path");
        const currentPath = `${parentPath}-${index + 1}`;
        treeLabel.setAttribute("path", currentPath);
      } else {
        treeLabel.setAttribute("path", (index + 1).toString());
      }

      if (this["show-checkbox"]) {
        tree.setAttribute("show-checkbox", "");
      }

      const hasChildren = item[children] && item[children].length > 0;
      if (hasChildren) {
        treeLabel.hasChildren = true;
        tree.hidden = !this.#dataStates.expandedNodes.has(treeLabel);
      }

      sec.appendChild(treeLabel);
      sec.appendChild(tree);
      frag.appendChild(sec);

      this.#dataStates.nodes.set(sec, {
        label: treeLabel,
        child: tree,
        data: item,
      });
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

    for (const ac of Object.values(this.#AbortControllerStates)) {
      ac?.abort();
    }
  }
}

if (!customElements.get("ea-tree-child")) {
  customElements.define("ea-tree-child", EaTreeChild);
}
