import { namespace } from "@/directives/namespace";
import Base from "@components/Base.js";
import { EaTreeNodeExpandEvent } from "./events/EaTreeNodeExpandEvent";
import { EaTreeNodeCollapseEvent } from "./events/EaTreeNodeCollapseEvent";
import { EaTreeNodeSelectEvent } from "./events/EaTreeNodeSelectEvent";
import { EaTreeNodeClickEvent } from "./events/EaTreeNodeClickEvent";
import stylesheet from "./index.scss?inline";
import "./components/label/index";
import "./components/child/index";
import { timeout } from "@/utils/timeout";

export class EaTree extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "show-checkbox",
      "check-strictly",
      "node-key",
    ];
  }

  #treeState = {
    expandedNodes: new Set(),
    selectedNode: null,
    checkedNodes: new Set(),
  };

  #abortControllers = {
    /** @type {AbortController} */
    dataController: null,
  };

  attrState = this.properties({
    "show-checkbox": {
      type: Boolean,
      default: false,
      observer: () => {
        this.#updateCheckboxVisibility();
      },
    },
    "check-strictly": {
      type: Boolean,
      default: false,
    },
    "node-key": {
      type: String,
      default: null,
    },
  });

  propState = this.properties({
    data: {
      props: true,
      type: Array,
      default: "",
      /** @param {Array} newVal */
      observer: async newVal => {
        await customElements.whenDefined("ea-tree");
        await customElements.whenDefined("ea-tree-label");

        this.#abortControllers.dataController?.abort();

        this.#container.innerHTML = "";

        if (newVal) {
          this.#abortControllers.dataController = new AbortController();

          this.#handleTreeRender(newVal);
          this.#bindTreeEvents();

          // 因为子树的元素在渲染时需要设置 prop 属性，因此渲染有些延迟，所以此处等待约一帧
          timeout(() => {
            this.#handleDefaultExpandedKeys(this.defaultExpandedKeys);
            this.#handleDefaultCheckedKeys(this.defaultCheckedKeys);
          }, 16);
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
    },
    defaultExpandedKeys: {
      props: true,
      type: Array,
      default: [],
      observer: newVal => {},
    },
    defaultCheckedKeys: {
      props: true,
      type: Array,
      default: [],
      observer: newVal => {},
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
   * 创建树节点元素
   * @param {Object} item 数据项
   * @param {number} index 索引
   * @returns {Object} 包含section、treeLabel和tree的对象
   */
  #createTreeNode = (item, index) => {
    const { label, children, disabled } = this.dataProps;
    const sec = document.createElement("section");
    const tree = document.createElement("ea-tree-child");
    const treeLabel = document.createElement("ea-tree-label");

    sec.className = "ea-tree__children";
    sec.part = "children-wrapper";
    tree.part = "children";
    treeLabel.part = "label";

    treeLabel.label = item[label];
    treeLabel.data = item;
    tree.dataProps = this.dataProps;
    tree.data = item[children];
    treeLabel["show-checkbox"] = this["show-checkbox"];
    treeLabel.setAttribute("path", (index + 1).toString().concat("$"));

    if (disabled && item[disabled] === true) {
      treeLabel.toggleAttribute("disabled", true);
    }

    if (this["show-checkbox"]) {
      tree.setAttribute("show-checkbox", "");
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

    treeData.forEach((item, index) => {
      const { sec, treeLabel, tree } = this.#createTreeNode(item, index);

      sec.appendChild(treeLabel);
      sec.appendChild(tree);
      frag.appendChild(sec);
    });

    this.#container.appendChild(frag);
  };

  /**
   * 处理默认展开键
   * @param {Array} expandedKeys 展开键数组
   */
  #handleDefaultExpandedKeys = expandedKeys => {
    const nodeKey = this["node-key"];
    if (!nodeKey) return;
    const labels = [...this.#container.querySelectorAll("ea-tree-label")];

    expandedKeys.forEach(key => {
      const label = labels.find(label => label.data[nodeKey] === key);
      if (label) {
        this.#treeState.expandedNodes.add(label);
        this.#expandNode(label.nextElementSibling, label);
      }
    });
  };

  /**
   * 处理默认选中键
   * @param {Array} checkedKeys 选中键数组
   */
  #handleDefaultCheckedKeys = checkedKeys => {
    const nodeKey = this["node-key"];
    if (!nodeKey) return;

    const labels = [...this.#container.querySelectorAll("ea-tree-label")];

    checkedKeys.forEach(key => {
      const label = labels.find(label => label.data[nodeKey] === key);
      if (label) {
        label.checked = true;
      }
    });
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
        data: label.data,
      })
    );

    if (label.hasChildren) {
      if (this.#treeState.expandedNodes.has(label)) {
        this.#treeState.expandedNodes.delete(label);
        this.#collapseNode(tree, label);
      } else {
        this.#treeState.expandedNodes.add(label);
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
    if (this.#treeState.selectedNode) {
      this.#treeState.selectedNode.selected = false;
    }

    this.#treeState.selectedNode = label;
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
   * 获取相同树路径下的所有节点
   * @param {string} treeRootPath 树路径
   * @returns {Array} 相同树路径的节点数组
   */
  #getSameTreeNodes = treeRootPath => {
    const sameTreeNodes = [];
    const pathAry = treeRootPath.split("-");

    sameTreeNodes.push(this.#container.querySelector(`[path="${pathAry[0]}"]`));

    while (pathAry.length > 1) {
      const treePath = pathAry.join("-");
      pathAry.pop();

      sameTreeNodes.push(
        ...this.#container.querySelectorAll(`[path^="${treePath}"]`)
      );
    }

    return sameTreeNodes;
  };

  /**
   * 检查节点状态
   * @param {Array} labelEls 标签元素数组
   * @param {HTMLElement} currentNode 当前节点
   * @returns {Object} 包含isAllChecked和isAnyChecked的对象
   */
  #checkNodeStatus = (labelEls, currentNode) => {
    const isAllChecked = labelEls.every(
      label => label.getAttribute("checked") || label === currentNode
    );
    const isAnyChecked = labelEls.some(
      label => label.getAttribute("checked") && label !== currentNode
    );

    return { isAllChecked, isAnyChecked };
  };

  /**
   * 更新节点复选框状态
   * @param {HTMLElement} node 节点元素
   * @param {boolean} isAllChecked 是否全部选中
   * @param {boolean} isAnyChecked 是否有选中
   */
  #updateNodeCheckboxState = (node, isAllChecked, isAnyChecked) => {
    if (isAllChecked) {
      node.toggleAttribute("checked", true);
      node.toggleAttribute("indeterminate", false);
    } else if (isAnyChecked) {
      node.toggleAttribute("checked", false);
      node.toggleAttribute("indeterminate", true);
    } else {
      node.toggleAttribute("checked", false);
      node.toggleAttribute("indeterminate", false);
    }
  };

  /**
   * 绑定树组件事件
   */
  #bindTreeEvents = () => {
    this.#container.addEventListener(
      "ea-tree-label-click",
      this.#onLabelClick,
      {
        signal: this.#abortControllers.dataController.signal,
      }
    );

    this.#container.addEventListener(
      "ea-tree-checkbox-click",
      this.#onCheckboxClick,
      {
        signal: this.#abortControllers.dataController.signal,
      }
    );
  };

  /**
   * 绑定复选框状态管理事件
   */
  #bindCheckboxStateEvents = () => {
    this.#container.addEventListener(
      "ea-tree-checkbox-click",
      this.#handleCheckboxStateChange,
      {
        signal: this.#abortController.signal,
      }
    );
  };

  /**
   * 处理复选框状态变化
   * @param {CustomEvent} e 事件对象
   */
  #handleCheckboxStateChange = e => {
    e.stopImmediatePropagation();

    const { label, checked } = e.detail;

    if (label.disabled) return;

    const targetPath = label.getAttribute("path");
    const sameTreeNodes = this.#getSameTreeNodes(targetPath);
    const ancestorNodes = sameTreeNodes.filter(
      node => node.getAttribute("path").startsWith(targetPath) && node !== label
    );
    const descendantNodes = sameTreeNodes.filter(
      node => node !== label && !ancestorNodes.includes(node)
    );

    ancestorNodes.forEach(node => {
      if (!node.disabled) {
        node.checked = checked;
      }
    });

    descendantNodes.reverse().forEach(node => {
      if (node.disabled) return;

      const childWrapper = node.closest(".ea-tree-child__children");
      const rootWrapper = node.closest(".ea-tree__children");
      const labelEls = childWrapper
        ? [...childWrapper.querySelectorAll("ea-tree-label")]
        : [...rootWrapper.querySelectorAll("ea-tree-label")];

      const { isAllChecked, isAnyChecked } = this.#checkNodeStatus(
        labelEls,
        node
      );
      this.#updateNodeCheckboxState(node, isAllChecked, isAnyChecked);
    });

    if (label?.isRoot?.()) {
      this.#updateNodeCheckboxState(label, checked, checked);

      this.#container
        .querySelectorAll(`[path^="${targetPath}"]`)
        .forEach(label => {
          if (!label.disabled) {
            label.checked = checked;
          }
        });
    }

    this.emit("ea-check-change", {
      detail: e.detail,
      bubbles: true,
      composed: true,
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
          checkedNodes: Array.from(this.#treeState.checkedNodes).map(
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

    this.#bindCheckboxStateEvents();
    this.updateContainerClasslist();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();

    for (const ac of Object.values(this.#abortControllers)) {
      ac?.abort();
    }
  }
}

if (!customElements.get("ea-tree")) {
  customElements.define("ea-tree", EaTree);
}
