import { namespace } from "@/directives/namespace";
import Base from "@components/Base.js";
import { EaTreeNodeExpandEvent } from "./events/EaTreeNodeExpandEvent";
import { EaTreeNodeCollapseEvent } from "./events/EaTreeNodeCollapseEvent";
import { EaTreeNodeSelectEvent } from "./events/EaTreeNodeSelectEvent";
import stylesheet from "./index.scss?inline";
import "./components/label/index";

export class EaTree extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  /** @type {WeakMap} */
  #expandedNodes = new WeakMap();

  /** @type {HTMLElement} */
  #selectedNode = null;

  #dataStates = {
    nodes: new WeakMap(),
    expandedNodes: new WeakMap(),
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

          this.#container.addEventListener("click", this.#onLabelClick, {
            signal: this.#AbortControllerStates.dataAC.signal,
          });
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
      const tree = document.createElement("ea-tree");
      const treeLabel = document.createElement("ea-tree-label");

      sec.className = "ea-tree__children";
      sec.part = "children";

      treeLabel.label = item[label];
      treeLabel.item = item;
      tree.dataProps = this.dataProps;
      tree.data = item[children];

      const hasChildren = item[children] && item[children].length > 0;
      if (hasChildren) {
        treeLabel.hasChildren = true;
        tree.hidden = !this.#expandedNodes.has(treeLabel);
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
    const label = e.target.closest("ea-tree-label");
    if (!label) {
      return;
    }

    // 处理节点展开/收起
    if (label.hasChildren) {
      const sec = label.parentElement;
      const tree = sec.querySelector("ea-tree");
      const isExpanded = this.#expandedNodes.has(label);

      tree.hidden = isExpanded ? true : false;
      label.toggleAttribute("expanded", isExpanded ? false : true);

      if (this.#expandedNodes.has(label)) {
        this.#expandedNodes.delete(label);
        this.#collapseNode(tree, label);
      } else {
        this.#expandedNodes.set(label, true);
        this.#expandNode(tree, label);
      }
    }

    // this.#deselectNode(this.#expandNode.get(this.#selectNode));
    this.#selectNode(label);
  };

  /**
   * 展开节点
   * @param {HTMLElement} tree 树元素
   * @param {HTMLElement} label 标签元素
   */
  #expandNode = (tree, label) => {
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
    // 如果点击的是已选中的节点，则取消选中
    if (this.#selectedNode === label) {
      this.#deselectNode();
      return;
    }

    // 取消之前选中的节点
    if (this.#selectedNode) {
      this.#selectedNode.selected = false;
    }

    // 选中新节点
    this.#selectedNode = label;
    label.selected = true;

    // 触发选中事件
    this.dispatchEvent(
      new EaTreeNodeSelectEvent({
        node: label.item,
        selected: true,
      })
    );
  };

  /**
   * 取消选中节点
   */
  #deselectNode = () => {
    if (this.#selectedNode) {
      const deselectedNode = this.#selectedNode;
      this.#selectedNode.selected = false;
      this.#selectedNode = null;

      // 触发取消选中事件
      this.dispatchEvent(
        new EaTreeNodeSelectEvent({
          node: deselectedNode.item,
          selected: false,
        })
      );
    }
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
