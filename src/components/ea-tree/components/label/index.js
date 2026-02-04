import { namespace } from "@/directives/namespace";
import Base from "@components/Base.js";
import stylesheet from "./index.scss?inline";
import "@components/ea-checkbox";
import EaUtils from "@/utils/Utils";

export class EaTreeLabel extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #textElement;
  /** @type {HTMLElement} */
  #toggleElement;
  /** @type {HTMLElement} */
  #checkboxElement;

  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "label",
      "expanded",
      "selected",
      "checked",
      "indeterminate",
      "show-checkbox",
      "disabled",
      "path",
    ];
  }

  state = this.properties({
    path: {
      type: String,
      default: "",
    },

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
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    expanded: {
      type: Boolean,
      default: false,
      observer: newVal => {
        if (!this.hasChildren) return;

        this.updateContainerClasslist();

        const child = this.nextElementSibling;

        if (child) {
          child.expanded = newVal;
        }
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
    indeterminate: {
      type: Boolean,
      default: false,
      observer: () => {
        this.#updateCheckboxState();
        this.updateContainerClasslist();
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: () => {
        this.#updateDisabledState();
        this.updateContainerClasslist();
      },
    },
    "show-checkbox": {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
  });

  propStates = this.properties({
    hasChildren: {
      props: true,
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
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
    data: {
      props: true,
      type: Object,
      default: {},
      observer: newVal => {
        const { children, label, disabled } = this.dataProps;

        this.label = newVal?.[label] || this.label;
        this.hasChildren = newVal?.[children]?.length > 0;
        this.disabled = newVal?.[disabled] || false;
      },
    },
  });

  /**
   * 更新 checkbox 状态
   * @param {boolean} checked - 是否选中
   * @param {boolean} indeterminate - 是否不确定
   */
  #updateCheckboxState = (
    checked = this.checked,
    indeterminate = this.indeterminate
  ) => {
    if (!this.#checkboxElement) return;

    this.#checkboxElement.checked = checked;
    this.#checkboxElement.indeterminate = indeterminate;
  };

  /**
   * 更新禁用状态
   */
  #updateDisabledState = () => {
    if (!this.#checkboxElement) return;

    this.#checkboxElement.disabled = this.disabled;
  };

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
        checked: this.checked,
        indeterminate: this.indeterminate,
        "show-checkbox": this["show-checkbox"],
        disabled: this.disabled,
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
        <ea-checkbox class='${ns.e("checkbox")}' part='checkbox'></ea-checkbox>
        <span class='${ns.e("text")}' part='text'></span>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(`.${ns.b()}`);
    this.#textElement = this.shadowRoot.querySelector(`.${ns.e("text")}`);
    this.#checkboxElement = this.shadowRoot.querySelector(ns.ce("checkbox"));
    this.#toggleElement = this.shadowRoot.querySelector(`.${ns.e("toggle")}`);

    this.updateContainerClasslist();
    this.#updateDisabledState();
  }

  #handleRemoveNode(nodeKey, data) {
    const section = this.closest("section");
    if (!section) return;

    const parentTree = section.closest("ea-tree-child");
    if (!parentTree) return;

    const parentLabel = parentTree.previousElementSibling;
    if (!parentLabel) return;

    const childTree = parentLabel.nextElementSibling;
    if (!childTree) return;

    const { children } = parentLabel.dataProps;

    const newData = {
      ...parentLabel.data,
      [children]: parentLabel.data[children].filter(item => {
        if (typeof data === "object") {
          return (
            EaUtils.JSON.stringify(item[nodeKey]) !==
            EaUtils.JSON.stringify(data[nodeKey])
          );
        } else if (data) {
          return item[nodeKey] !== data;
        }
      }),
    };

    parentLabel.data = newData;
    childTree.data = {
      action: "remove",
      children: newData,
    };

    section.remove();
  }

  #handleAppendNode(nodeKey, data) {
    const childTree = this.nextElementSibling;
    if (!childTree) return;

    const { children } = this.dataProps;

    const newData = {
      ...this.data,
      [children]: [...(this.data[children] || []), data],
    };

    this.data = newData;
    childTree.data = newData[children];

    if (childTree.hidden) {
      childTree.hidden = false;
      this.hasChildren = true;
    }
  }

  // #handleInsertBefore(nodeKey, data) {
  //   const refSection = this.closest("section");
  //   if (!refSection) return;

  //   const parentTree = refSection.closest("ea-tree-child");
  //   if (!parentTree) return;

  //   const parentLabel = parentTree.previousElementSibling;
  //   if (!parentLabel) return;

  //   const childTree = parentLabel.nextElementSibling;
  //   if (!childTree) return;

  //   const { children } = parentLabel.dataProps;

  //   // 更新数据 - 使用简单的数据比较，类似 remove 的逻辑
  //   const childrenArray = parentLabel.data[children] || [];
  //   const refIndex = childrenArray.findIndex(item => {
  //     if (typeof data === "object") {
  //       return item[nodeKey] === data[nodeKey];
  //     } else {
  //       return item[nodeKey] === data;
  //     }
  //   });

  //   if (refIndex === -1) return;

  //   childrenArray.splice(refIndex, 0, data);
  //   const newData = {
  //     ...parentLabel.data,
  //     [children]: childrenArray,
  //   };

  //   parentLabel.data = newData;
  //   childTree.data = newData[children];

  //   // 创建新的节点元素并插入
  //   const parentPath = parentLabel.getAttribute("path");
  //   const newPath = `${parentPath}-${refIndex + 1}`;

  //   const sec = this.#createTreeNodeElement(data, newPath);
  //   parentTree.insertBefore(sec, refSection);

  //   // 更新后续节点的路径
  //   this.#updateSubsequentPaths(parentTree, refIndex + 1);
  // }

  // #handleInsertAfter(nodeKey, data) {
  //   const refSection = this.closest("section");
  //   if (!refSection) return;

  //   const parentTree = refSection.closest("ea-tree-child");
  //   if (!parentTree) return;

  //   const parentLabel = parentTree.previousElementSibling;
  //   if (!parentLabel) return;

  //   const childTree = parentLabel.nextElementSibling;
  //   if (!childTree) return;

  //   const { children } = parentLabel.dataProps;

  //   // 更新数据 - 使用简单的数据比较，类似 remove 的逻辑
  //   const childrenArray = parentLabel.data[children] || [];
  //   const refIndex = childrenArray.findIndex(item => {
  //     if (typeof data === "object") {
  //       return item[nodeKey] === data[nodeKey];
  //     } else {
  //       return item[nodeKey] === data;
  //     }
  //   });

  //   if (refIndex === -1) return;

  //   childrenArray.splice(refIndex + 1, 0, data);
  //   const newData = {
  //     ...parentLabel.data,
  //     [children]: childrenArray,
  //   };

  //   parentLabel.data = newData;
  //   childTree.data = newData[children];

  //   // 创建新的节点元素并插入
  //   const parentPath = parentLabel.getAttribute("path");
  //   const newPath = `${parentPath}-${refIndex + 2}`;

  //   const sec = this.#createTreeNodeElement(data, newPath);
  //   const nextSibling = refSection.nextElementSibling;
  //   if (nextSibling) {
  //     parentTree.insertBefore(sec, nextSibling);
  //   } else {
  //     parentTree.appendChild(sec);
  //   }

  //   // 更新后续节点的路径
  //   this.#updateSubsequentPaths(parentTree, refIndex + 2);
  // }

  // #updateSubsequentPaths(parentTree, startIndex) {
  //   const sections = parentTree.querySelectorAll("section");
  //   const parentPath = parentTree.previousElementSibling.getAttribute("path");

  //   sections.forEach((section, index) => {
  //     const label = section.querySelector("ea-tree-label");
  //     if (label && index >= startIndex - 1) {
  //       const newPath = `${parentPath}-${index + 1}`;
  //       label.setAttribute("path", newPath);
  //     }
  //   });
  // }

  // #createTreeNodeElement(item, path) {
  //   // 确保 dataProps 可用，如果没有则使用默认值
  //   const dataProps = this.dataProps || {
  //     children: "children",
  //     label: "label",
  //     disabled: "disabled",
  //   };

  //   const { label: labelProp, children, disabled } = dataProps;
  //   const sec = document.createElement("section");
  //   const tree = document.createElement("ea-tree-child");
  //   const treeLabel = document.createElement("ea-tree-label");

  //   sec.className = "ea-tree__children";
  //   sec.part = "children-wrapper";
  //   tree.part = "children";
  //   treeLabel.part = "label";

  //   // 安全地设置 label，如果 item 中没有对应的属性则使用空字符串
  //   treeLabel.label = item?.[labelProp] || "";
  //   treeLabel.data = item;
  //   treeLabel.dataProps = dataProps;
  //   tree.dataProps = dataProps;
  //   tree.data = item?.[children] || [];
  //   treeLabel["show-checkbox"] = this["show-checkbox"];
  //   treeLabel.setAttribute("path", path);

  //   if (disabled && item?.[disabled] === true) {
  //     treeLabel.toggleAttribute("disabled", true);
  //   }

  //   if (this["show-checkbox"]) {
  //     tree.setAttribute("show-checkbox", "");
  //   }

  //   const hasChildren = item?.[children] && item[children].length > 0;
  //   if (hasChildren) {
  //     treeLabel.hasChildren = true;
  //     tree.hidden = true;
  //   }

  //   sec.appendChild(treeLabel);
  //   sec.appendChild(tree);

  //   return sec;
  // }

  /**
   * 处理复选框变化事件
   * @param {Event} e 事件对象
   */
  #handleCheckboxChange = e => {
    e.stopImmediatePropagation();

    if (this.disabled) return;

    this.checked = e.detail.checked;

    this.emit("ea-tree-checkbox-click", {
      bubbles: true,
      composed: true,
      detail: {
        label: this,
        checked: e.detail.checked,
      },
    });
  };

  /**
   * 处理标签点击事件
   * @param {Event} e 事件对象
   */
  #handleLabelClick = e => {
    e.stopImmediatePropagation();

    const checkbox = e.target.closest(this.ns.ce("checkbox"));
    if (checkbox) return;

    const child = this.parentElement.querySelector("ea-tree-child");

    this.emit("ea-tree-label-click", {
      bubbles: true,
      composed: true,
      detail: {
        label: this,
        child,
      },
    });
  };

  /**
   * 绑定事件监听器
   */
  #bindEventListeners = () => {
    this.#checkboxElement.addEventListener(
      "change",
      this.#handleCheckboxChange,
      {
        signal: this.#abortController.signal,
      }
    );

    this.#container.addEventListener("click", this.#handleLabelClick, {
      signal: this.#abortController.signal,
    });

    this.addEventListener("ea-tree-child-change", e => {
      e.stopImmediatePropagation();

      const { action, nodeKey, data } = e.detail;

      switch (action) {
        case "remove":
          this.#handleRemoveNode(nodeKey, data);
          break;

        case "append":
          this.#handleAppendNode(nodeKey, data);
          break;

        case "insert-before":
          // this.#handleInsertBefore(nodeKey, data);
          break;

        case "insert-after":
          // this.#handleInsertAfter(nodeKey, data);
          break;
      }
    });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#bindEventListeners();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }

  /**
   * 获取节点深度
   * @returns {number} 节点深度
   */
  getDepth = () => {
    const path = this.path;
    return path ? path.split("-").length : 0;
  };

  /**
   * 判断是否为根节点
   * @returns {boolean} 是否为根节点
   */
  isRoot = () => {
    return this.getDepth() === 1;
  };

  /**
   * 判断是否为叶子节点
   * @returns {boolean} 是否为叶子节点
   */
  isLeaf = () => {
    if (!this.hasChildren) return true;

    const childLabels = childTree.querySelectorAll("ea-tree-label");
    return childLabels.length === 0;
  };
}

if (!window.customElements.get("ea-tree-label")) {
  window.customElements.define("ea-tree-label", EaTreeLabel);
}
