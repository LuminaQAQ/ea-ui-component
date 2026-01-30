import { namespace } from "@/directives/namespace";
import Base from "@components/Base.js";
import { EaTreeNodeExpandEvent } from "./events/EaTreeNodeExpandEvent";
import { EaTreeNodeCollapseEvent } from "./events/EaTreeNodeCollapseEvent";
import { EaTreeNodeSelectEvent } from "./events/EaTreeNodeSelectEvent";
import { EaTreeNodeClickEvent } from "./events/EaTreeNodeClickEvent";
import stylesheet from "./index.scss?inline";
import "./components/label/index";
import "./components/child/index";

export class EaTree extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  #dataStates = {
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

          this.#container.addEventListener(
            "ea-tree-label-click",
            this.#onLabelClick,
            {
              signal: this.#AbortControllerStates.dataAC.signal,
            }
          );
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
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-tree", {}, {});

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
      <div class='${ns.b("tree")}' part='container'></div>
      <slot></slot>
    `;

    this.#container = this.shadowRoot.querySelector(`.${ns.b("tree")}`);
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

      sec.className = "ea-tree__children";
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

  /**
   * 点击标签事件
   * @param {MouseEvent} e 事件对象
   */
  #onLabelClick = e => {
    e.stopImmediatePropagation();

    const label = e.detail.label;
    const tree = e.detail.child;
    if (!label) {
      return;
    }

    this.dispatchEvent(
      new EaTreeNodeClickEvent({
        data: label.item,
      })
    );

    if (label.hasChildren) {
      if (this.#dataStates.expandedNodes.has(label)) {
        this.#dataStates.expandedNodes.delete(label);
        this.#collapseNode(tree, label);
      } else {
        this.#dataStates.expandedNodes.add(label);
        this.#expandNode(tree, label);
      }
    }

    this.#selectNode(label);
  };

  /**
   * 展开节点
   * @param {HTMLElement} tree 树元素
   * @param {HTMLElement} label 标签元素
   */
  #expandNode = (tree, label) => {
    tree.toggleAttribute("hidden", false);
    label.toggleAttribute("expanded", true);

    this.dispatchEvent(
      new EaTreeNodeExpandEvent({
        node: label.item,
        expanded: true,
      })
    );
  };

  /**
   * 收起节点
   * @param {HTMLElement} tree 树元素
   * @param {HTMLElement} label 标签元素
   */
  #collapseNode = (tree, label) => {
    tree.toggleAttribute("hidden", true);
    label.toggleAttribute("expanded", false);

    this.dispatchEvent(
      new EaTreeNodeCollapseEvent({
        node: label.item,
        expanded: false,
      })
    );
  };

  /**
   * 选中节点
   * @param {HTMLElement} label 标签元素
   */
  #selectNode = label => {
    if (this.#dataStates.selectedNode) {
      this.#dataStates.selectedNode.selected = false;
    }

    this.#dataStates.selectedNode = label;
    label.selected = true;

    this.dispatchEvent(
      new EaTreeNodeSelectEvent({
        node: label.item,
        selected: true,
      })
    );
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

if (!customElements.get("ea-tree")) {
  customElements.define("ea-tree", EaTree);
}
