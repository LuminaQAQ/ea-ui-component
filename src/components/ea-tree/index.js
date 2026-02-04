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

    tree.dataProps = this.dataProps;
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
      const foundLabel = labels.find(label => label.data[nodeKey] === key);
      if (foundLabel) {
        this.#treeState.expandedNodes.add(foundLabel);
        this.#expandNode(foundLabel.nextElementSibling, foundLabel);
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
      const foundLabel = labels.find(label => label.data[nodeKey] === key);
      if (foundLabel) {
        foundLabel.checked = true;

        foundLabel.dispatchEvent(
          new CustomEvent("ea-tree-checkbox-click", {
            bubbles: true,
            composed: true,
            detail: {
              label: foundLabel,
              checked: true,
            },
          })
        );
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
        node: label.data,
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
   * 根据节点键值查找标签元素
   * @param {*} key 节点键值
   * @returns {HTMLElement|null} 找到的标签元素或null
   */
  #findLabelByKey = key => {
    if (!this["node-key"]) return null;
    const nodeKey = this["node-key"];
    const labels = [...this.#container.querySelectorAll("ea-tree-label")];
    return labels.find(label => label.data && label.data[nodeKey] === key);
  };

  /**
   * 根据节点数据查找标签元素
   * @param {Object} data 节点数据
   * @returns {HTMLElement|null} 找到的标签元素或null
   */
  #findLabelByData = data => {
    if (!this["node-key"]) return null;
    const labels = [...this.#container.querySelectorAll("ea-tree-label")];
    return labels.find(label => {
      if (!label.data) return false;
      return JSON.stringify(label.data) === JSON.stringify(data);
    });
  };

  /**
   * 获取所有标签元素
   * @returns {Array} 所有标签元素数组
   */
  #getAllLabels = () => {
    return [...this.#container.querySelectorAll("ea-tree-label")];
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

  /**
   * 获取半选中节点数据
   * @returns {Array} 半选中节点数据数组
   */
  getHalfCheckedNodes = () => {
    if (!this["show-checkbox"]) {
      return [];
    }

    const labels = [...this.#container.querySelectorAll("ea-tree-label")];
    const halfCheckedNodes = [];

    labels.forEach(label => {
      if (label.hasAttribute("indeterminate")) {
        halfCheckedNodes.push(label.data);
      }
    });

    return halfCheckedNodes;
  };

  /**
   * 获取半选中节点键值
   * @returns {Array} 半选中节点键值数组
   */
  getHalfCheckedKeys = () => {
    if (!this["show-checkbox"] || !this["node-key"]) {
      return [];
    }

    const labels = this.#container.querySelectorAll("ea-tree-label");
    const halfCheckedKeys = [];
    const nodeKey = this["node-key"];

    labels.forEach(label => {
      if (
        label.hasAttribute("indeterminate") &&
        label.data &&
        label.data[nodeKey]
      ) {
        halfCheckedKeys.push(label.data[nodeKey]);
      }
    });

    return halfCheckedKeys;
  };

  /**
   * 获取当前选中节点键值
   * @returns {*} 当前选中节点键值或null
   */
  getCurrentKey = () => {
    if (!this["node-key"] || !this.#treeState.selectedNode) {
      return null;
    }

    const nodeKey = this["node-key"];
    const selectedNodeData = this.#treeState.selectedNode.data;

    return selectedNodeData && selectedNodeData[nodeKey]
      ? selectedNodeData[nodeKey]
      : null;
  };

  /**
   * 获取当前选中节点数据
   * @returns {*} 当前选中节点数据或null
   */
  getCurrentNode = () => {
    if (!this.#treeState.selectedNode) {
      return null;
    }

    return this.#treeState.selectedNode.data;
  };

  /**
   * 更新节点键值的子节点数据
   * @param {*} key 节点键值
   * @param {Array} data 子节点数据数组
   * @returns {boolean} 是否更新成功
   */
  updateKeyChildren = (key, data) => {
    if (!this["node-key"]) {
      console.warn("updateKeyChildren requires node-key to be set");
      return false;
    }

    const label = this.#findLabelByKey(key);
    if (!label) {
      console.warn(`Node with key ${key} not found`);
      return false;
    }

    const tree = label.nextElementSibling;
    if (!tree || tree.tagName !== "EA-TREE-CHILD") {
      console.warn("Target node is not a parent node");
      return false;
    }

    const { children } = this.dataProps;

    label.data = { ...label.data, [children]: data };
    tree.data = data;

    timeout(() => {
      label.emit("ea-tree-checkbox-click", {
        bubbles: true,
        composed: true,
        detail: {
          label,
          checked: label.checked,
        },
      });
    }, 16);

    return true;
  };

  /**
   * 获取选中节点数据
   * @param {boolean} leafOnly 是否仅返回叶子节点
   * @param {boolean} includeHalfChecked 是否包含半选中节点
   * @returns {Array} 选中节点数据数组
   */
  getCheckedNodes = (leafOnly = false, includeHalfChecked = false) => {
    if (!this["show-checkbox"]) {
      return [];
    }

    const labels = this.#getAllLabels();
    const checkedNodes = [];

    labels.forEach(label => {
      const isChecked = label.hasAttribute("checked");
      const isIndeterminate = label.hasAttribute("indeterminate");

      if (isChecked || (includeHalfChecked && isIndeterminate)) {
        if (leafOnly && !label.hasChildren) {
          return;
        }
        checkedNodes.push(label.data);
      }
    });

    return checkedNodes;
  };

  /**
   * 设置选中节点数据
   * @param {Array} nodes 选中节点数据数组
   * @param {boolean} leafOnly 是否仅选中叶子节点
   * @returns {boolean} 是否设置成功
   */
  setCheckedNodes = (nodes, leafOnly = false) => {
    if (!this["show-checkbox"] || !this["node-key"]) {
      console.warn(
        "setCheckedNodes requires show-checkbox and node-key to be set"
      );
      return false;
    }

    const labels = this.#getAllLabels();

    labels.forEach(label => {
      if (label.disabled) return;

      const shouldBeChecked = nodes.some(node => {
        if (leafOnly && label.hasChildren) {
          return false;
        }
        return JSON.stringify(label.data) === JSON.stringify(node);
      });

      label.checked = shouldBeChecked;
      label.indeterminate = false;

      if (!this["check-strictly"] && shouldBeChecked) {
        label.dispatchEvent(
          new CustomEvent("ea-tree-checkbox-click", {
            bubbles: true,
            composed: true,
            detail: {
              label,
              checked: shouldBeChecked,
            },
          })
        );
      }
    });

    return true;
  };

  /**
   * 获取选中节点键值
   * @param {boolean} leafOnly 是否仅返回叶子节点
   * @returns {Array} 选中节点键值数组
   */
  getCheckedKeys = (leafOnly = false) => {
    if (!this["show-checkbox"] || !this["node-key"]) {
      return [];
    }

    const labels = this.#getAllLabels();
    const checkedKeys = [];
    const nodeKey = this["node-key"];

    labels.forEach(label => {
      if (label.hasAttribute("checked") && label.data && label.data[nodeKey]) {
        if (leafOnly && !label.hasChildren) {
          return;
        }
        checkedKeys.push(label.data[nodeKey]);
      }
    });

    return checkedKeys;
  };

  /**
   * 设置选中节点键值
   * @param {Array} keys 选中节点键值数组
   * @param {boolean} leafOnly 是否仅选中叶子节点
   * @returns {boolean} 是否设置成功
   */
  setCheckedKeys = (keys, leafOnly = false) => {
    if (!this["show-checkbox"] || !this["node-key"]) {
      console.warn(
        "setCheckedKeys requires show-checkbox and node-key to be set"
      );
      return false;
    }

    const nodeKey = this["node-key"];

    console.log(keys);

    keys.forEach(key => {
      const label = this.#findLabelByKey(key);
      if (label.disabled) return;

      let shouldBeChecked = label.data && label.data[nodeKey] === key;
      if (leafOnly && label.hasChildren) {
        shouldBeChecked = false;
      }

      console.log(label, label.data);

      label.checked = shouldBeChecked;
      label.indeterminate = false;

      if (!this["check-strictly"]) {
        label.dispatchEvent(
          new CustomEvent("ea-tree-checkbox-click", {
            bubbles: true,
            composed: true,
            detail: {
              label,
              checked: shouldBeChecked,
            },
          })
        );
      }
    });

    return true;
  };

  /**
   * 设置节点选中状态
   * @param {*} keyOrData 节点键值或数据对象
   * @param {boolean} checked 是否选中
   * @returns {boolean} 是否设置成功
   */
  setChecked = (keyOrData, checked) => {
    if (!this["show-checkbox"] || !this["node-key"]) {
      console.warn("setChecked requires show-checkbox and node-key to be set");
      return false;
    }

    let label;
    if (typeof keyOrData === "object") {
      label = this.#findLabelByData(keyOrData);
    } else {
      label = this.#findLabelByKey(keyOrData);
    }

    if (!label) {
      console.warn("Node not found");
      return false;
    }

    if (label.disabled) {
      console.warn("Cannot set checked state for disabled node");
      return false;
    }

    label.checked = checked;

    if (!this["check-strictly"]) {
      label.dispatchEvent(
        new CustomEvent("ea-tree-checkbox-click", {
          bubbles: true,
          composed: true,
          detail: {
            label,
            checked,
          },
        })
      );
    }

    return true;
  };

  #expandParentNodes = label => {
    if (label.disabled) return;

    const targetPath = label.getAttribute("path");
    const sameTreeNodes = this.#getSameTreeNodes(targetPath);
    const ancestorNodes = sameTreeNodes.filter(
      node => node.getAttribute("path").startsWith(targetPath) && node !== label
    );
    const descendantNodes = sameTreeNodes.filter(
      node => !ancestorNodes.includes(node) && node !== label
    );

    descendantNodes.forEach(node => {
      node.expanded = true;
    });
  };

  #resolveNode = nodeOrDataOrKey => {
    if (!nodeOrDataOrKey) return null;

    if (typeof nodeOrDataOrKey === "object") {
      return this.#findLabelByData(nodeOrDataOrKey);
    } else if (
      typeof nodeOrDataOrKey === "number" ||
      typeof nodeOrDataOrKey === "string"
    ) {
      return this.#findLabelByKey(nodeOrDataOrKey);
    }

    return null;
  };

  // #getParentTreeElement = label => {
  //   if (!label) return null;

  //   const parentSection = label.closest("section");
  //   if (!parentSection) return null;

  //   const parentLabel = parentSection.previousElementSibling;
  //   if (parentLabel && parentLabel.tagName === "EA-TREE-LABEL") {
  //     return parentLabel.nextElementSibling;
  //   }

  //   return null;
  // };

  setCurrentKey = (key, shouldAutoExpandParent = true) => {
    if (!this["node-key"]) {
      console.warn("setCurrentKey requires node-key to be set");
      return false;
    }

    if (!key) {
      if (this.#treeState.selectedNode) {
        this.#treeState.selectedNode.selected = false;
        this.#treeState.selectedNode = null;
      }
      return true;
    }

    const label = this.#findLabelByKey(key);
    if (!label) {
      console.warn(`Node with key ${key} not found`);
      return false;
    }

    if (label.disabled) {
      console.warn("Cannot select disabled node");
      return false;
    }

    this.#selectNode(label);

    if (shouldAutoExpandParent) {
      this.#expandParentNodes(label);
    }

    return true;
  };

  setCurrentNode = (node, shouldAutoExpandParent = true) => {
    if (!this["node-key"]) {
      console.warn("setCurrentNode requires node-key to be set");
      return false;
    }

    if (!node) {
      if (this.#treeState.selectedNode) {
        this.#treeState.selectedNode.selected = false;
        this.#treeState.selectedNode = null;
      }
      return true;
    }

    const label = this.#findLabelByData(node);
    if (!label) {
      console.warn("Node not found");
      return false;
    }

    if (label.disabled) {
      console.warn("Cannot select disabled node");
      return false;
    }

    this.#selectNode(label);

    if (shouldAutoExpandParent) {
      this.#expandParentNodes(label);
    }

    return true;
  };

  getNode = data => {
    if (!this["node-key"]) {
      console.warn("getNode requires node-key to be set");
      return null;
    }

    const label = this.#resolveNode(data);
    if (!label) {
      return null;
    }

    return {
      label,
      child: label.nextElementSibling,
      data,
    };
  };

  remove = data => {
    if (!this["node-key"]) {
      console.warn("remove requires node-key to be set");
      return false;
    }

    const label = this.#resolveNode(data);
    if (!label) {
      console.warn("Node not found");
      return false;
    }

    const parentSection = label.closest("section");
    if (!parentSection) {
      console.warn("Cannot find parent section");
      return false;
    }

    // 如果是选中的节点，取消选中
    if (this.#treeState.selectedNode === label) {
      this.#treeState.selectedNode = null;
    }

    label.dispatchEvent(
      new CustomEvent("ea-tree-child-change", {
        bubbles: true,
        composed: true,
        detail: { action: "remove", nodeKey: this["node-key"], data },
      })
    );

    return true;
  };

  append = (data, parentNode) => {
    if (!this["node-key"]) {
      console.warn("append requires node-key to be set");
      return false;
    }

    const parentLabel = this.#resolveNode(parentNode);
    if (!parentLabel) {
      console.warn("Parent node not found");
      return false;
    }

    const tree = parentLabel.nextElementSibling;
    if (!tree || tree.tagName !== "EA-TREE-CHILD") {
      console.warn("Parent node is not a container node");
      return false;
    }

    parentLabel.dispatchEvent(
      new CustomEvent("ea-tree-child-change", {
        bubbles: true,
        composed: true,
        detail: { action: "append", nodeKey: this["node-key"], data },
      })
    );

    return true;
  };

  // insertBefore = (data, refNode) => {
  //   if (!this["node-key"]) {
  //     console.warn("insertBefore requires node-key to be set");
  //     return false;
  //   }

  //   const refLabel = this.#resolveNode(refNode);
  //   if (!refLabel) {
  //     console.warn("Reference node not found");
  //     return false;
  //   }

  //   const parentSection = refLabel.closest("section");
  //   if (!parentSection) {
  //     console.warn("Cannot find parent section");
  //     return false;
  //   }

  //   const parentTree = this.#getParentTreeElement(refLabel);
  //   if (!parentTree) {
  //     console.warn("Cannot find parent tree");
  //     return false;
  //   }

  //   refLabel.dispatchEvent(
  //     new CustomEvent("ea-tree-child-change", {
  //       bubbles: true,
  //       composed: true,
  //       detail: { action: "insert-before", nodeKey: this["node-key"], data },
  //     })
  //   );

  //   return true;
  // };

  // insertAfter = (data, refNode) => {
  //   if (!this["node-key"]) {
  //     console.warn("insertAfter requires node-key to be set");
  //     return false;
  //   }

  //   const refLabel = this.#resolveNode(refNode);
  //   if (!refLabel) {
  //     console.warn("Reference node not found");
  //     return false;
  //   }

  //   const parentSection = refLabel.closest("section");
  //   if (!parentSection) {
  //     console.warn("Cannot find parent section");
  //     return false;
  //   }

  //   const parentTree = this.#getParentTreeElement(refLabel);
  //   if (!parentTree) {
  //     console.warn("Cannot find parent tree");
  //     return false;
  //   }

  //   refLabel.dispatchEvent(
  //     new CustomEvent("ea-tree-child-change", {
  //       bubbles: true,
  //       composed: true,
  //       detail: { action: "insert-after", nodeKey: this["node-key"], data },
  //     })
  //   );

  //   return true;
  // };
}

if (!customElements.get("ea-tree")) {
  customElements.define("ea-tree", EaTree);
}
