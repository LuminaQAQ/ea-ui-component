import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { timeout } from "@utils/timeout";
import "@components/ea-checkbox";
import "@components/ea-icon";
import { EaTreeCheckChangeEvent } from "./events/EaTreeCheckChangeEvent";
import { EaTreeCheckEvent } from "./events/EaTreeCheckEvent";
import { EaTreeCurrentChangeEvent } from "./events/EaTreeCurrentChangeEvent";
import { EaTreeNodeClickEvent } from "./events/EaTreeNodeClickEvent";
import { EaTreeNodeCollapseEvent } from "./events/EaTreeNodeCollapseEvent";
import { EaTreeNodeContextmenuEvent } from "./events/EaTreeNodeContextmenuEvent";
import { EaTreeNodeExpandEvent } from "./events/EaTreeNodeExpandEvent";
import { EaTreeNodeSelectEvent } from "./events/EaTreeNodeSelectEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-tree" as const;
const bem = createBEM(TAG_NAME);

interface TreeNodeState {
  raw: any;
  path: string;
  depth: number;
  label: string;
  disabled: boolean;
  hasChildren: boolean;
  expanded: boolean;
  checked: boolean;
  indeterminate: boolean;
  selected: boolean;
}

/**
 * @summary 树形控件，用于展示层次结构数据，支持展开折叠、复选框选择、右键菜单等功能。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-checkbox
 * @dependency ea-icon
 *
 * @slot default - 默认插槽。
 *
 * @event ea-node-click - 节点点击时触发，detail: `{ data: any }`。
 * @event ea-node-contextmenu - 节点右键点击时触发，detail: `{ data: any, node: TreeNodeState }`。
 * @event ea-node-select - 节点选中时触发，detail: `{ node: any, selected: boolean }`。
 * @event ea-check-change - 复选框状态变化时触发，detail: `{ data: any, checked: boolean, hasCheckedChildren: boolean }`。
 * @event ea-check - 复选框选中时触发，detail: `{ data: any, checkedState: { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys } }`。
 * @event ea-current-change - 当前选中节点变化时触发，detail: `{ data: any, node: TreeNodeState }`。
 * @event ea-node-expand - 节点展开时触发，detail: `{ data: any, node: TreeNodeState, expanded: true }`。
 * @event ea-node-collapse - 节点折叠时触发，detail: `{ data: any, node: TreeNodeState, expanded: false }`。
 *
 * @csspart container - 树容器元素。
 *
 * @cssproperty --ea-tree-font-size - 字体大小。
 * @cssproperty --ea-tree-text-color - 文本颜色。
 * @cssproperty --ea-tree-toggle-size - 展开图标尺寸。
 * @cssproperty --ea-tree-cursor - 光标样式。
 * @cssproperty --ea-tree-padding-vertical - 垂直内边距。
 * @cssproperty --ea-tree-padding-horizontal - 水平内边距。
 * @cssproperty --ea-tree-border-radius - 圆角大小。
 * @cssproperty --ea-tree-transition - 过渡动画时长。
 * @cssproperty --ea-tree-hover-bg - 悬停背景色。
 * @cssproperty --ea-tree-selected-bg - 选中背景色。
 * @cssproperty --ea-tree-selected-text-color - 选中文本色。
 * @cssproperty --ea-tree-icon-color - 图标颜色。
 * @cssproperty --ea-tree-icon-hover-color - 图标悬停颜色。
 * @cssproperty --ea-tree-indent-size - 缩进大小。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTree extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  private _nodeStates = new Map<string, TreeNodeState>();

  private _treeState = {
    selectedPath: null as string | null,
  };

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTree) {
      this._updateCheckboxVisibility();
    },
  })
  showCheckbox: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
  })
  checkStrictly: boolean = false;

  @attribute({
    type: String,
    default: "",
  })
  nodeKey: string = "";

  @attribute({
    type: Boolean,
    default: false,
  })
  expandOnIconClick: boolean = false;

  @property({
    type: Array,
    default: [],
    observer(this: EaTree, newVal: any[]) {
      this._handleDataChange(newVal);
    },
  })
  data: any[] = [];

  @property({
    type: Object,
    default: { children: "children", label: "label", disabled: "disabled" },
  })
  dataProps: Record<string, string> = {
    children: "children",
    label: "label",
    disabled: "disabled",
  };

  @property({
    type: Array,
    default: [],
  })
  defaultExpandedKeys: any[] = [];

  @property({
    type: Array,
    default: [],
  })
  defaultCheckedKeys: any[] = [];

  /** 处理数据变化，重新构建节点状态和渲染树 */
  private async _handleDataChange(newVal: any[]) {
    await customElements.whenDefined("ea-tree");

    this._nodeStates.clear();
    this._container.innerHTML = "";

    if (newVal && newVal.length > 0) {
      this._buildNodeStates(newVal, "");
      this._container.innerHTML = this._renderTree(newVal, "");

      timeout(() => {
        this._handleDefaultExpandedKeys(this.defaultExpandedKeys);
        this._handleDefaultCheckedKeys(this.defaultCheckedKeys);
      }, 16);
    }
  }

  /** 递归构建节点状态 Map */
  private _buildNodeStates(data: any[], parentPath: string): void {
    const { children, label, disabled } = this.dataProps;

    data.forEach((item, index) => {
      const path = parentPath ? `${parentPath}-${index + 1}` : `${index + 1}$`;
      const depth = path.split("-").length;
      const childItems = item[children] || [];
      const hasChildren = childItems.length > 0;

      this._nodeStates.set(path, {
        raw: item,
        path,
        depth,
        label: item[label] || "",
        disabled: item[disabled] === true,
        hasChildren,
        expanded: false,
        checked: false,
        indeterminate: false,
        selected: false,
      });

      if (hasChildren) {
        this._buildNodeStates(childItems, path);
      }
    });
  }

  /** 生成节点状态类名 */
  private _getNodeStateClasses(state: TreeNodeState): string {
    return bem.s(
      state.expanded ? "expanded" : "",
      state.selected ? "selected" : "",
      state.checked ? "checked" : "",
      state.indeterminate ? "indeterminate" : "",
      state.hasChildren ? "has-children" : "",
      this.showCheckbox ? "show-checkbox" : ""
    );
  }

  /** 渲染树 HTML */
  private _renderTree(data: any[], parentPath: string): string {
    const { children, label, disabled } = this.dataProps;

    return data
      .map((item, index) => {
        const path = parentPath
          ? `${parentPath}-${index + 1}`
          : `${index + 1}$`;
        const state = this._nodeStates.get(path)!;
        const childItems = item[children] || [];
        const hasChildren = childItems.length > 0;
        const isDisabled = item[disabled] === true;
        const text = item[label] || "";

        const stateClasses = this._getNodeStateClasses(state);

        const childrenHTML = hasChildren
          ? `<div class="${bem.e("children")}">${this._renderTree(
              childItems,
              path
            )}</div>`
          : "";

        const toggleIconHTML = hasChildren
          ? `<ea-icon name="angle-right" class="${bem.e("toggle-icon")}"></ea-icon>`
          : "";

        return `
<div class="${bem.e("node")} ${stateClasses}" data-path="${path}">
  <div class="${bem.e("label")}" data-path="${path}">
    ${toggleIconHTML}
    <ea-checkbox class="${bem.e("checkbox")}"${
          state.checked ? " checked" : ""
        }${state.indeterminate ? " indeterminate" : ""}${
          isDisabled ? " disabled" : ""
        }></ea-checkbox>
    <span class="${bem.e("text")}">${text}</span>
  </div>
  ${childrenHTML}
</div>`;
      })
      .join("");
  }

  /** 从事件路径中查找 label 元素 */
  private _findLabelInPath(path: EventTarget[]): HTMLElement | null {
    return path.find(
      el => el instanceof HTMLElement && el.classList.contains(bem.e("label"))
    ) as HTMLElement | null;
  }

  /** 判断事件路径中是否包含 toggle-icon */
  private _isToggleInPath(path: EventTarget[]): boolean {
    return path.some(
      el =>
        el instanceof HTMLElement && el.classList.contains(bem.e("toggle-icon"))
    );
  }

  /** 判断事件路径中是否包含 checkbox */
  private _isCheckboxInPath(path: EventTarget[]): boolean {
    return path.some(
      el =>
        el instanceof HTMLElement && el.classList.contains(bem.e("checkbox"))
    );
  }

  /** 根据 path 获取节点 DOM 元素 */
  private _getNodeElement(path: string): HTMLElement | null {
    return this._container.querySelector(
      `${bem.ce("node")}[data-path="${path}"]`
    ) as HTMLElement | null;
  }

  /** 根据 path 获取 label DOM 元素 */
  private _getLabelElement(path: string): HTMLElement | null {
    return this._container.querySelector(
      `${bem.ce("label")}[data-path="${path}"]`
    ) as HTMLElement | null;
  }

  /** 根据 path 获取 checkbox 组件 */
  private _getCheckboxElement(path: string): any {
    const labelEl = this._getLabelElement(path);
    if (!labelEl) return null;
    return labelEl.querySelector(bem.ce("checkbox")) as any;
  }

  /** 根据 path 获取子节点容器 */
  private _getChildrenElement(path: string): HTMLElement | null {
    const nodeEl = this._getNodeElement(path);
    if (!nodeEl) return null;
    return nodeEl.querySelector(
      `:scope > ${bem.ce("children")}`
    ) as HTMLElement | null;
  }

  /** 更新单个节点的 DOM 状态 */
  private _updateNodeDOM(path: string): void {
    const state = this._nodeStates.get(path);
    if (!state) return;

    const nodeEl = this._getNodeElement(path);
    if (!nodeEl) return;

    const stateClasses = this._getNodeStateClasses(state);
    nodeEl.className = `${bem.e("node")} ${stateClasses}`;

    const checkboxEl = this._getCheckboxElement(path);
    if (checkboxEl) {
      checkboxEl.checked = state.checked;
      checkboxEl.indeterminate = state.indeterminate;
    }
  }

  /** 根据 key 查找节点路径 */
  private _findPathByKey(key: any): string | null {
    if (!this.nodeKey) return null;
    const nodeKey = this.nodeKey;
    for (const [, state] of this._nodeStates) {
      if (state.raw && state.raw[nodeKey] === key) {
        return state.path;
      }
    }
    return null;
  }

  /** 根据数据对象查找节点路径 */
  private _findPathByData(data: any): string | null {
    if (!this.nodeKey) return null;
    for (const [, state] of this._nodeStates) {
      if (JSON.stringify(state.raw) === JSON.stringify(data)) {
        return state.path;
      }
    }
    return null;
  }

  /** 解析节点路径（支持 key 或数据对象） */
  private _resolvePath(nodeOrDataOrKey: any): string | null {
    if (!nodeOrDataOrKey) return null;

    if (
      typeof nodeOrDataOrKey === "string" ||
      typeof nodeOrDataOrKey === "number"
    ) {
      return this._findPathByKey(nodeOrDataOrKey);
    }

    if (typeof nodeOrDataOrKey === "object") {
      return this._findPathByData(nodeOrDataOrKey);
    }

    return null;
  }

  /** 处理默认展开的节点 */
  private _handleDefaultExpandedKeys = (expandedKeys: any[]) => {
    const nodeKey = this.nodeKey;
    if (!nodeKey) return;

    expandedKeys.forEach(key => {
      const path = this._findPathByKey(key);
      if (path) {
        this._expandPath(path);
      }
    });
  };

  /** 处理默认选中的节点 */
  private _handleDefaultCheckedKeys = (checkedKeys: any[]) => {
    const nodeKey = this.nodeKey;
    if (!nodeKey) return;

    checkedKeys.forEach(key => {
      const path = this._findPathByKey(key);
      if (path) {
        const state = this._nodeStates.get(path);
        if (state && !state.disabled) {
          this._handleCheckboxToggle(path, true);
        }
      }
    });
  };

  /** 展开指定路径的节点 */
  private _expandPath(path: string): void {
    const state = this._nodeStates.get(path);
    if (!state || !state.hasChildren) return;

    state.expanded = true;
    this._updateNodeDOM(path);

    this.dispatchEvent(
      new EaTreeNodeExpandEvent({
        data: state.raw,
        node: state,
        expanded: true,
      })
    );
  }

  /** 折叠指定路径的节点 */
  private _collapsePath(path: string): void {
    const state = this._nodeStates.get(path);
    if (!state || !state.hasChildren) return;

    state.expanded = false;
    this._updateNodeDOM(path);

    this.dispatchEvent(
      new EaTreeNodeCollapseEvent({
        data: state.raw,
        node: state,
        expanded: false,
      })
    );
  }

  /** 切换展开/折叠 */
  private _toggleExpand(path: string): void {
    const state = this._nodeStates.get(path);
    if (!state || !state.hasChildren) return;

    if (state.expanded) {
      this._collapsePath(path);
    } else {
      this._expandPath(path);
    }
  }

  /** 选中指定路径的节点 */
  private _selectPath(path: string): void {
    if (this._treeState.selectedPath) {
      const prevState = this._nodeStates.get(this._treeState.selectedPath);
      if (prevState) {
        prevState.selected = false;
        this._updateNodeDOM(this._treeState.selectedPath);
      }
    }

    const state = this._nodeStates.get(path);
    if (!state) return;

    this._treeState.selectedPath = path;
    state.selected = true;
    this._updateNodeDOM(path);

    this.dispatchEvent(
      new EaTreeNodeSelectEvent({
        node: state.raw,
        selected: true,
      })
    );

    this.dispatchEvent(
      new EaTreeCurrentChangeEvent({
        data: state.raw,
        node: state,
      })
    );
  }

  /** 展开指定路径的所有祖先节点 */
  private _expandAncestorPaths(path: string): void {
    const parts = path.split("-");
    for (let i = 1; i < parts.length; i++) {
      const ancestorPath = parts.slice(0, i).join("-");
      const ancestorState = this._nodeStates.get(ancestorPath);
      if (
        ancestorState &&
        ancestorState.hasChildren &&
        !ancestorState.expanded
      ) {
        ancestorState.expanded = true;
        this._updateNodeDOM(ancestorPath);
      }
    }
  }

  /** 处理 checkbox 切换逻辑 */
  private _handleCheckboxToggle(path: string, checked?: boolean): void {
    const state = this._nodeStates.get(path);
    if (!state || state.disabled) return;

    const newChecked = checked !== undefined ? checked : !state.checked;

    if (state.checked === newChecked && !state.indeterminate) return;

    state.checked = newChecked;
    state.indeterminate = false;

    if (this.checkStrictly) {
      this._updateNodeDOM(path);
      this._emitCheckEvents(path);
      return;
    }

    this._setDescendantsChecked(path, newChecked);
    this._updateAncestorsState(path);

    this._updateAllCheckboxDOM();
    this._emitCheckEvents(path);
  }

  /** 设置所有子孙节点的选中状态 */
  private _setDescendantsChecked(path: string, checked: boolean): void {
    this._nodeStates.forEach((state, nodePath) => {
      if (nodePath.startsWith(path + "-") && !state.disabled) {
        state.checked = checked;
        state.indeterminate = false;
      }
    });
  }

  /** 向上更新祖先节点的选中/半选状态 */
  private _updateAncestorsState(path: string): void {
    const parts = path.split("-");
    while (parts.length > 1) {
      parts.pop();
      const ancestorPath = parts.join("-");
      const ancestorState = this._nodeStates.get(ancestorPath);
      if (!ancestorState) continue;

      const childPaths = this._getDirectChildrenPaths(ancestorPath);

      const isAllChecked =
        childPaths.length > 0 &&
        childPaths.every(cp => {
          const s = this._nodeStates.get(cp)!;
          return s.checked;
        });

      const isAnyChecked = childPaths.some(cp => {
        const s = this._nodeStates.get(cp)!;
        return s.checked || s.indeterminate;
      });

      ancestorState.checked = isAllChecked;
      ancestorState.indeterminate = !isAllChecked && isAnyChecked;
    }
  }

  /** 获取直接子节点的路径列表 */
  private _getDirectChildrenPaths(parentPath: string): string[] {
    const parentDepth = parentPath.split("-").length;
    const result: string[] = [];

    this._nodeStates.forEach((_, nodePath) => {
      const nodeDepth = nodePath.split("-").length;
      if (
        nodeDepth === parentDepth + 1 &&
        nodePath.startsWith(parentPath + "-")
      ) {
        result.push(nodePath);
      }
    });

    return result;
  }

  /** 更新所有节点的 checkbox DOM */
  private _updateAllCheckboxDOM(): void {
    this._nodeStates.forEach((_, path) => {
      this._updateNodeDOM(path);
    });
  }

  /** 判断指定路径下是否有已选中的子孙节点 */
  private _hasCheckedChildren(path: string): boolean {
    for (const [nodePath, state] of this._nodeStates) {
      if (nodePath.startsWith(path + "-") && state.checked) {
        return true;
      }
    }
    return false;
  }

  /** 派发 checkbox 相关事件 */
  private _emitCheckEvents(path: string): void {
    const state = this._nodeStates.get(path);
    if (!state) return;

    const hasCheckedChildren = this._hasCheckedChildren(path);

    this.dispatchEvent(
      new EaTreeCheckChangeEvent({
        data: state.raw,
        checked: state.checked,
        hasCheckedChildren,
      })
    );

    const checkedNodes = this.getCheckedNodes();
    const checkedKeys = this.getCheckedKeys();
    const halfCheckedNodes = this.getHalfCheckedNodes();
    const halfCheckedKeys = this.getHalfCheckedKeys();

    this.dispatchEvent(
      new EaTreeCheckEvent({
        data: state.raw,
        checkedState: {
          checkedNodes,
          checkedKeys,
          halfCheckedNodes,
          halfCheckedKeys,
        },
      })
    );
  }

  /** 更新所有节点的 checkbox 可见性 */
  private _updateCheckboxVisibility(): void {
    this._nodeStates.forEach((_, path) => {
      this._updateNodeDOM(path);
    });
  }

  /** 处理节点点击事件 */
  @listen("click", bem.ce("node"))
  private _handleClick(e: Event): void {
    const composedPath = e.composedPath();
    const labelEl = this._findLabelInPath(composedPath);
    if (!labelEl) return;

    const path = labelEl.dataset.path!;
    const state = this._nodeStates.get(path);
    if (!state) return;

    const isCheckboxClick = this._isCheckboxInPath(composedPath);
    if (isCheckboxClick) return;

    const isToggleClick = this._isToggleInPath(composedPath);

    if (this.expandOnIconClick) {
      if (isToggleClick) {
        this._toggleExpand(path);
      } else {
        this.dispatchEvent(new EaTreeNodeClickEvent({ data: state.raw }));
        this._selectPath(path);
      }
      return;
    }

    if (state.hasChildren) {
      this._toggleExpand(path);
    }

    this.dispatchEvent(new EaTreeNodeClickEvent({ data: state.raw }));
    this._selectPath(path);
  }

  /** 处理 checkbox 变更事件 */
  @listen("change", bem.ce("checkbox"))
  private _handleCheckboxChange(e: Event): void {
    e.stopPropagation();

    const composedPath = e.composedPath();
    const labelEl = composedPath.find(
      el => el instanceof HTMLElement && el.classList.contains(bem.e("label"))
    ) as HTMLElement | null;

    if (!labelEl) return;

    const path = labelEl.dataset.path!;
    const state = this._nodeStates.get(path);
    if (!state || state.disabled) return;

    const detail = (e as CustomEvent).detail;
    const newChecked =
      detail?.checked !== undefined ? detail.checked : !state.checked;

    this._handleCheckboxToggle(path, newChecked);
  }

  /** 处理节点右键菜单事件 */
  @listen("contextmenu", bem.ce("node"))
  private _handleContextmenu(e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    const composedPath = e.composedPath();
    const labelEl = this._findLabelInPath(composedPath);
    if (!labelEl) return;

    const path = labelEl.dataset.path!;
    const state = this._nodeStates.get(path);
    if (!state) return;

    this.dispatchEvent(
      new EaTreeNodeContextmenuEvent({
        data: state.raw,
        node: state,
      })
    );
  }

  html(): string {
    return `
      <div class="${bem()}" part="container"></div>
      <slot></slot>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const className = bem({}, {});

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /** 获取半选中节点数据数组 */
  getHalfCheckedNodes(): any[] {
    if (!this.showCheckbox) return [];

    const result: any[] = [];
    this._nodeStates.forEach(state => {
      if (state.indeterminate) {
        result.push(state.raw);
      }
    });
    return result;
  }

  /** 获取半选中节点键值数组 */
  getHalfCheckedKeys(): any[] {
    if (!this.showCheckbox || !this.nodeKey) return [];

    const nodeKey = this.nodeKey;
    const result: any[] = [];
    this._nodeStates.forEach(state => {
      if (state.indeterminate && state.raw && state.raw[nodeKey]) {
        result.push(state.raw[nodeKey]);
      }
    });
    return result;
  }

  /** 获取当前选中节点的键值 */
  getCurrentKey(): any {
    if (!this.nodeKey || !this._treeState.selectedPath) return null;

    const state = this._nodeStates.get(this._treeState.selectedPath);
    if (!state || !state.raw) return null;

    return state.raw[this.nodeKey] || null;
  }

  /** 获取当前选中节点的数据 */
  getCurrentNode(): any {
    if (!this._treeState.selectedPath) return null;

    const state = this._nodeStates.get(this._treeState.selectedPath);
    return state ? state.raw : null;
  }

  /**
   * 更新指定节点的子节点数据
   * @param key - 节点键值
   * @param data - 新的子节点数据数组
   * @returns 是否更新成功
   */
  updateKeyChildren(key: any, data: any[]): boolean {
    if (!this.nodeKey) {
      console.warn("updateKeyChildren requires node-key to be set");
      return false;
    }

    const path = this._findPathByKey(key);
    if (!path) {
      console.warn(`Node with key ${key} not found`);
      return false;
    }

    const state = this._nodeStates.get(path);
    if (!state || !state.hasChildren) {
      console.warn("Target node is not a parent node");
      return false;
    }

    const { children } = this.dataProps;
    state.raw = { ...state.raw, [children]: data };

    const pathsToRemove: string[] = [];
    this._nodeStates.forEach((_, nodePath) => {
      if (nodePath.startsWith(path + "-")) {
        pathsToRemove.push(nodePath);
      }
    });
    pathsToRemove.forEach(p => this._nodeStates.delete(p));

    this._buildNodeStates(data, path);

    const childrenEl = this._getChildrenElement(path);
    if (childrenEl) {
      childrenEl.innerHTML = this._renderTree(data, path);
    }

    timeout(() => {
      this._handleCheckboxToggle(path, state.checked);
    }, 16);

    return true;
  }

  /**
   * 获取选中节点数据数组
   * @param leafOnly - 是否仅返回叶子节点
   * @param includeHalfChecked - 是否包含半选节点
   * @returns 选中节点数据数组
   */
  getCheckedNodes(
    leafOnly: boolean = false,
    includeHalfChecked: boolean = false
  ): any[] {
    if (!this.showCheckbox) return [];

    const result: any[] = [];
    this._nodeStates.forEach(state => {
      if (state.checked || (includeHalfChecked && state.indeterminate)) {
        if (leafOnly && state.hasChildren) return;
        result.push(state.raw);
      }
    });
    return result;
  }

  /**
   * 通过节点数据设置选中状态
   * @param nodes - 要选中的节点数据数组
   * @returns 是否设置成功
   */
  setCheckedNodes(nodes: any[]): boolean {
    if (!this.showCheckbox || !this.nodeKey) {
      console.warn(
        "setCheckedNodes requires show-checkbox and node-key to be set"
      );
      return false;
    }

    nodes.forEach(node => {
      const path = this._resolvePath(node);
      if (!path) return;
      const state = this._nodeStates.get(path);
      if (!state || state.disabled) return;

      this._handleCheckboxToggle(path, true);
    });

    return true;
  }

  /**
   * 获取选中节点键值数组
   * @param leafOnly - 是否仅返回叶子节点
   * @returns 选中节点键值数组
   */
  getCheckedKeys(leafOnly: boolean = false): any[] {
    if (!this.showCheckbox || !this.nodeKey) return [];

    const nodeKey = this.nodeKey;
    const result: any[] = [];
    this._nodeStates.forEach(state => {
      if (state.checked && state.raw && state.raw[nodeKey]) {
        if (leafOnly && state.hasChildren) return;
        result.push(state.raw[nodeKey]);
      }
    });
    return result;
  }

  /**
   * 通过键值设置选中状态
   * @param keys - 要选中的节点键值数组
   * @param leafOnly - 是否仅选中叶子节点
   * @returns 是否设置成功
   */
  setCheckedKeys(keys: any[], leafOnly: boolean = false): boolean {
    if (!this.showCheckbox || !this.nodeKey) {
      console.warn(
        "setCheckedKeys requires show-checkbox and node-key to be set"
      );
      return false;
    }

    keys.forEach(key => {
      const path = this._findPathByKey(key);
      if (!path) return;
      const state = this._nodeStates.get(path);
      if (!state || state.disabled) return;
      if (leafOnly && state.hasChildren) return;

      this._handleCheckboxToggle(path, true);
    });

    return true;
  }

  /**
   * 设置指定节点的选中状态
   * @param keyOrData - 节点键值或数据对象
   * @param checked - 是否选中
   * @returns 是否设置成功
   */
  setChecked(keyOrData: any, checked: boolean): boolean {
    if (!this.showCheckbox || !this.nodeKey) {
      console.warn("setChecked requires show-checkbox and node-key to be set");
      return false;
    }

    const path = this._resolvePath(keyOrData);
    if (!path) {
      console.warn("Node not found");
      return false;
    }

    const state = this._nodeStates.get(path);
    if (!state || state.disabled) {
      console.warn("Cannot set checked state for disabled node");
      return false;
    }

    this._handleCheckboxToggle(path, checked);
    return true;
  }

  /**
   * 设置当前选中节点的键值
   * @param key - 节点键值，传 null 取消选中
   * @param shouldAutoExpandParent - 是否自动展开父节点
   * @returns 是否设置成功
   */
  setCurrentKey(key: any, shouldAutoExpandParent: boolean = true): boolean {
    if (!this.nodeKey) {
      console.warn("setCurrentKey requires node-key to be set");
      return false;
    }

    if (!key) {
      if (this._treeState.selectedPath) {
        const prevState = this._nodeStates.get(this._treeState.selectedPath);
        if (prevState) {
          prevState.selected = false;
          this._updateNodeDOM(this._treeState.selectedPath);
        }
        this._treeState.selectedPath = null;
      }
      return true;
    }

    const path = this._findPathByKey(key);
    if (!path) {
      console.warn(`Node with key ${key} not found`);
      return false;
    }

    const state = this._nodeStates.get(path);
    if (!state || state.disabled) {
      console.warn("Cannot select disabled node");
      return false;
    }

    this._selectPath(path);

    if (shouldAutoExpandParent) {
      this._expandAncestorPaths(path);
    }

    return true;
  }

  /**
   * 设置当前选中节点
   * @param node - 节点数据对象，传 null 取消选中
   * @param shouldAutoExpandParent - 是否自动展开父节点
   * @returns 是否设置成功
   */
  setCurrentNode(node: any, shouldAutoExpandParent: boolean = true): boolean {
    if (!this.nodeKey) {
      console.warn("setCurrentNode requires node-key to be set");
      return false;
    }

    if (!node) {
      if (this._treeState.selectedPath) {
        const prevState = this._nodeStates.get(this._treeState.selectedPath);
        if (prevState) {
          prevState.selected = false;
          this._updateNodeDOM(this._treeState.selectedPath);
        }
        this._treeState.selectedPath = null;
      }
      return true;
    }

    const path = this._findPathByData(node);
    if (!path) {
      console.warn("Node not found");
      return false;
    }

    const state = this._nodeStates.get(path);
    if (!state || state.disabled) {
      console.warn("Cannot select disabled node");
      return false;
    }

    this._selectPath(path);

    if (shouldAutoExpandParent) {
      this._expandAncestorPaths(path);
    }

    return true;
  }

  /**
   * 获取节点信息
   * @param data - 节点键值或数据对象
   * @returns 节点信息对象，包含 label（节点状态）、child（子节点容器）、data（原始数据）
   */
  getNode(data: any): any {
    if (!this.nodeKey) {
      console.warn("getNode requires node-key to be set");
      return null;
    }

    const path = this._resolvePath(data);
    if (!path) return null;

    const state = this._nodeStates.get(path)!;
    return {
      label: state,
      child: this._getChildrenElement(path),
      data: state.raw,
    };
  }
}

export default EaTree;
