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
    return [...super.observedAttributes, "show-checkbox", "check-strictly"];
  }

  #dataStates = {
    nodes: new WeakMap(),
    expandedNodes: new Set(),
    selectedNode: null,
    checkedNodes: new Set(),
    indeterminateNodes: new Set(),
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

          this.#container.addEventListener(
            "ea-tree-checkbox-click",
            this.#onCheckboxClick,
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
    "show-checkbox": {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#updateCheckboxVisibility();
      },
    },
    "check-strictly": {
      type: Boolean,
      default: false,
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

    this.#container = this.shadowRoot.querySelector(ns.cb("tree"));
  }

  /**
   * 渲染树节点
   * @param {Array} treeData 树数据
   */
  #handleTreeRender = treeData => {
    const { label, children } = this.dataProps;
    const frag = document.createDocumentFragment();

    treeData.forEach((item, index) => {
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
      treeLabel["show-checkbox"] = this["show-checkbox"];

      treeLabel.setAttribute("path", (index + 1).toString().concat("$"));

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

  /**
   * 更新 checkbox 可见性
   */
  #updateCheckboxVisibility = () => {
    const labels = this.#container.querySelectorAll("ea-tree-label");
    labels.forEach(label => {
      label["show-checkbox"] = this["show-checkbox"];
    });
  };

  /**
   * 复选框点击事件
   * @param {CustomEvent} e 事件对象
   */
  #onCheckboxClick = e => {
    e.stopImmediatePropagation();

    const label = e.detail.label;
    const checked = e.detail.checked;

    if (!label) return;

    this.dispatchEvent(
      new CustomEvent("ea-check-change", {
        detail: {
          node: label.item,
          checked: checked,
          checkedNodes: Array.from(this.#dataStates.checkedNodes).map(
            node => node.item
          ),
        },
      })
    );
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#container.addEventListener(
      "ea-tree-checkbox-click",
      e => {
        e.stopImmediatePropagation();

        const { label, checked } = e.detail;

        const treeRootPath = label.getAttribute("path")?.split("-")?.[0];
        const targetPath = label.getAttribute("path");
        const sameTreeNodes = [
          ...this.#container.querySelectorAll(`[path^="${treeRootPath}"]`),
        ];
        const ancestorNodes = sameTreeNodes.filter(node =>
          node.getAttribute("path").startsWith(targetPath)
        );
        const descendantNodes = sameTreeNodes.filter(
          node => node !== label && !ancestorNodes.includes(node)
        );

        console.log(
          targetPath,
          treeRootPath,
          sameTreeNodes,
          ancestorNodes,
          descendantNodes
        );

        // const parentWrapper = label.closest(".ea-tree__children");

        // if (!parentWrapper) return;

        // const { label: treeLabel, child: tree } =
        //   this.#dataStates.nodes.get(parentWrapper);

        // treeLabel.checked = e.detail.checked;
        // tree.checked = e.detail.checked;

        this.emit("ea-check-change", {
          detail: e.detail,
          bubbles: true,
          composed: true,
        });
      },
      { signal: this.#abortController.signal }
    );

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
