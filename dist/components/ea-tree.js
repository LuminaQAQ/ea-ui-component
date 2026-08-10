import { E as K } from "../core/EaBase.ts.js";
import { q as D, l as p, C as T, a as _, p as b } from "../core/decorator.js";
import { t as k } from "../utils/timeout.ts.js";
import "./ea-checkbox.js";
import "./ea-icon.js";
import { s as $ } from "../css/ea-tree.style.js";
import { c as A } from "../utils/bem.ts.js";
class M extends Event {
  constructor(t) {
    super("ea-check-change", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
class L extends Event {
  constructor(t) {
    super("ea-check", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
class O extends Event {
  constructor(t) {
    super("ea-current-change", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
class C extends Event {
  constructor(t) {
    super("ea-node-click", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
class I extends Event {
  constructor(t) {
    super("ea-node-collapse", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
class B extends Event {
  constructor(t) {
    super("ea-node-contextmenu", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
class H extends Event {
  constructor(t) {
    super("ea-node-expand", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
class q extends Event {
  constructor(t) {
    super("ea-node-select", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
var F = Object.defineProperty, j = Object.getOwnPropertyDescriptor, l = (e, t, s, n) => {
  for (var a = n > 1 ? void 0 : n ? j(t, s) : t, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (a = (n ? o(t, s, a) : o(a)) || a);
  return n && a && F(t, s, a), a;
};
const y = "ea-tree", h = A(y);
let c = class extends K {
  constructor() {
    super(...arguments), this._nodeStates = /* @__PURE__ */ new Map(), this._treeState = {
      selectedPath: null
    }, this._focusedPath = null, this.showCheckbox = !1, this.checkStrictly = !1, this.nodeKey = "", this.label = "", this.expandOnIconClick = !1, this.data = [], this.dataProps = {
      children: "children",
      label: "label",
      disabled: "disabled"
    }, this.defaultExpandedKeys = [], this.defaultCheckedKeys = [], this._handleDefaultExpandedKeys = (e) => {
      this.nodeKey && e.forEach((s) => {
        const n = this._findPathByKey(s);
        n && this._expandPath(n);
      });
    }, this._handleDefaultCheckedKeys = (e) => {
      this.nodeKey && e.forEach((s) => {
        const n = this._findPathByKey(s);
        if (n) {
          const a = this._nodeStates.get(n);
          a && !a.disabled && this._handleCheckboxToggle(n, !0);
        }
      });
    };
  }
  /** 处理数据变化，重新构建节点状态和渲染树 */
  async _handleDataChange(e) {
    if (await customElements.whenDefined("ea-tree"), this._nodeStates.clear(), this._container.innerHTML = "", this._focusedPath = null, e && e.length > 0) {
      this._buildNodeStates(e, ""), this._container.innerHTML = this._renderTree(e, "");
      const t = this._getRootPaths();
      t.length > 0 && (this._focusedPath = t[0], this._updateNodeDOM(t[0])), k(() => {
        this._handleDefaultExpandedKeys(this.defaultExpandedKeys), this._handleDefaultCheckedKeys(this.defaultCheckedKeys);
      }, 16);
    }
  }
  /** 递归构建节点状态 Map */
  _buildNodeStates(e, t) {
    const { children: s, label: n, disabled: a } = this.dataProps;
    e.forEach((i, o) => {
      const r = t ? `${t}-${o + 1}` : `${o + 1}$`, d = r.split("-").length, f = i[s] || [], u = f.length > 0;
      this._nodeStates.set(r, {
        raw: i,
        path: r,
        depth: d,
        label: i[n] || "",
        disabled: i[a] === !0,
        hasChildren: u,
        expanded: !1,
        checked: !1,
        indeterminate: !1,
        selected: !1
      }), u && this._buildNodeStates(f, r);
    });
  }
  /** 生成节点状态类名 */
  _getNodeStateClasses(e) {
    return h.s(
      e.expanded ? "expanded" : "",
      e.selected ? "selected" : "",
      e.checked ? "checked" : "",
      e.indeterminate ? "indeterminate" : "",
      e.hasChildren ? "has-children" : "",
      this.showCheckbox ? "show-checkbox" : ""
    );
  }
  /** 渲染树 HTML */
  _renderTree(e, t) {
    const { children: s, label: n, disabled: a } = this.dataProps;
    return e.map((i, o) => {
      const r = t ? `${t}-${o + 1}` : `${o + 1}$`, d = this._nodeStates.get(r), f = i[s] || [], u = f.length > 0, x = i[a] === !0, g = i[n] || "", P = !t && o === 0, m = this._getNodeStateClasses(d), E = u ? `<div class="${h.e("children")}" role="group">${this._renderTree(
        f,
        r
      )}</div>` : "", S = u ? `<ea-icon name="angle-right" class="${h.e("toggle-icon")}"></ea-icon>` : "", w = ` aria-selected="${d.selected}"`, v = this.showCheckbox ? ` aria-checked="${d.checked || d.indeterminate ? d.indeterminate ? "mixed" : String(d.checked) : "false"}"` : "", N = P && !this._focusedPath ? 'tabindex="0"' : 'tabindex="-1"';
      return `
<div class="${h.e("node")} ${m}" data-path="${r}" role="treeitem" aria-label="${g}"${u ? ` aria-expanded="${d.expanded}"` : ""}${w}${v}>
  <div class="${h.e("label")}" data-path="${r}" ${N}>
    ${S}
    <ea-checkbox class="${h.e("checkbox")}"${d.checked ? " checked" : ""}${d.indeterminate ? " indeterminate" : ""}${x ? " disabled" : ""}></ea-checkbox>
    <span class="${h.e("text")}">${g}</span>
  </div>
  ${E}
</div>`;
    }).join("");
  }
  /** 从事件路径中查找 label 元素 */
  _findLabelInPath(e) {
    return e.find(
      (t) => t instanceof HTMLElement && t.classList.contains(h.e("label"))
    );
  }
  /** 判断事件路径中是否包含 toggle-icon */
  _isToggleInPath(e) {
    return e.some(
      (t) => t instanceof HTMLElement && t.classList.contains(h.e("toggle-icon"))
    );
  }
  /** 判断事件路径中是否包含 checkbox */
  _isCheckboxInPath(e) {
    return e.some(
      (t) => t instanceof HTMLElement && t.classList.contains(h.e("checkbox"))
    );
  }
  /** 根据 path 获取节点 DOM 元素 */
  _getNodeElement(e) {
    return this._container.querySelector(
      `${h.ce("node")}[data-path="${e}"]`
    );
  }
  /** 根据 path 获取 label DOM 元素 */
  _getLabelElement(e) {
    return this._container.querySelector(
      `${h.ce("label")}[data-path="${e}"]`
    );
  }
  /** 根据 path 获取 checkbox 组件 */
  _getCheckboxElement(e) {
    const t = this._getLabelElement(e);
    return t ? t.querySelector(h.ce("checkbox")) : null;
  }
  /** 根据 path 获取子节点容器 */
  _getChildrenElement(e) {
    const t = this._getNodeElement(e);
    return t ? t.querySelector(
      `:scope > ${h.ce("children")}`
    ) : null;
  }
  /** 更新单个节点的 DOM 状态 */
  _updateNodeDOM(e) {
    const t = this._nodeStates.get(e);
    if (!t) return;
    const s = this._getNodeElement(e);
    if (!s) return;
    const n = this._getNodeStateClasses(t);
    if (s.className = `${h.e("node")} ${n}`, t.hasChildren && s.setAttribute("aria-expanded", String(t.expanded)), s.setAttribute("aria-selected", String(t.selected)), this.showCheckbox) {
      const o = t.indeterminate ? "mixed" : String(t.checked);
      s.setAttribute("aria-checked", o);
    } else
      s.removeAttribute("aria-checked");
    const a = this._getLabelElement(e);
    a && a.setAttribute(
      "tabindex",
      this._focusedPath === e ? "0" : "-1"
    );
    const i = this._getCheckboxElement(e);
    i && (i.checked = t.checked, i.indeterminate = t.indeterminate);
  }
  /** 根据 key 查找节点路径 */
  _findPathByKey(e) {
    if (!this.nodeKey) return null;
    const t = this.nodeKey;
    for (const [, s] of this._nodeStates)
      if (s.raw && s.raw[t] === e)
        return s.path;
    return null;
  }
  /** 根据数据对象查找节点路径 */
  _findPathByData(e) {
    if (!this.nodeKey) return null;
    for (const [, t] of this._nodeStates)
      if (JSON.stringify(t.raw) === JSON.stringify(e))
        return t.path;
    return null;
  }
  /** 解析节点路径（支持 key 或数据对象） */
  _resolvePath(e) {
    return e ? typeof e == "string" || typeof e == "number" ? this._findPathByKey(e) : typeof e == "object" ? this._findPathByData(e) : null : null;
  }
  /** 展开指定路径的节点 */
  _expandPath(e) {
    const t = this._nodeStates.get(e);
    !t || !t.hasChildren || (t.expanded = !0, this._updateNodeDOM(e), this.dispatchEvent(
      new H({
        data: t.raw,
        node: t,
        expanded: !0
      })
    ));
  }
  /** 折叠指定路径的节点 */
  _collapsePath(e) {
    const t = this._nodeStates.get(e);
    !t || !t.hasChildren || (t.expanded = !1, this._updateNodeDOM(e), this.dispatchEvent(
      new I({
        data: t.raw,
        node: t,
        expanded: !1
      })
    ));
  }
  /** 切换展开/折叠 */
  _toggleExpand(e) {
    const t = this._nodeStates.get(e);
    !t || !t.hasChildren || (t.expanded ? this._collapsePath(e) : this._expandPath(e));
  }
  /** 选中指定路径的节点 */
  _selectPath(e) {
    if (this._treeState.selectedPath) {
      const s = this._nodeStates.get(this._treeState.selectedPath);
      s && (s.selected = !1, this._updateNodeDOM(this._treeState.selectedPath));
    }
    const t = this._nodeStates.get(e);
    t && (this._treeState.selectedPath = e, t.selected = !0, this._updateNodeDOM(e), this.dispatchEvent(
      new q({
        node: t.raw,
        selected: !0
      })
    ), this.dispatchEvent(
      new O({
        data: t.raw,
        node: t
      })
    ));
  }
  /** 展开指定路径的所有祖先节点 */
  _expandAncestorPaths(e) {
    const t = e.split("-");
    for (let s = 1; s < t.length; s++) {
      const n = t.slice(0, s).join("-"), a = this._nodeStates.get(n);
      a && a.hasChildren && !a.expanded && (a.expanded = !0, this._updateNodeDOM(n));
    }
  }
  /** 处理 checkbox 切换逻辑 */
  _handleCheckboxToggle(e, t) {
    const s = this._nodeStates.get(e);
    if (!s || s.disabled) return;
    const n = t !== void 0 ? t : !s.checked;
    if (!(s.checked === n && !s.indeterminate)) {
      if (s.checked = n, s.indeterminate = !1, this.checkStrictly) {
        this._updateNodeDOM(e), this._emitCheckEvents(e);
        return;
      }
      this._setDescendantsChecked(e, n), this._updateAncestorsState(e), this._updateAllCheckboxDOM(), this._emitCheckEvents(e);
    }
  }
  /** 设置所有子孙节点的选中状态 */
  _setDescendantsChecked(e, t) {
    this._nodeStates.forEach((s, n) => {
      n.startsWith(e + "-") && !s.disabled && (s.checked = t, s.indeterminate = !1);
    });
  }
  /** 向上更新祖先节点的选中/半选状态 */
  _updateAncestorsState(e) {
    const t = e.split("-");
    for (; t.length > 1; ) {
      t.pop();
      const s = t.join("-"), n = this._nodeStates.get(s);
      if (!n) continue;
      const a = this._getDirectChildrenPaths(s), i = a.length > 0 && a.every((r) => this._nodeStates.get(r).checked), o = a.some((r) => {
        const d = this._nodeStates.get(r);
        return d.checked || d.indeterminate;
      });
      n.checked = i, n.indeterminate = !i && o;
    }
  }
  /** 获取直接子节点的路径列表 */
  _getDirectChildrenPaths(e) {
    const t = e.split("-").length, s = [];
    return this._nodeStates.forEach((n, a) => {
      a.split("-").length === t + 1 && a.startsWith(e + "-") && s.push(a);
    }), s;
  }
  /** 更新所有节点的 checkbox DOM */
  _updateAllCheckboxDOM() {
    this._nodeStates.forEach((e, t) => {
      this._updateNodeDOM(t);
    });
  }
  /** 判断指定路径下是否有已选中的子孙节点 */
  _hasCheckedChildren(e) {
    for (const [t, s] of this._nodeStates)
      if (t.startsWith(e + "-") && s.checked)
        return !0;
    return !1;
  }
  /** 派发 checkbox 相关事件 */
  _emitCheckEvents(e) {
    const t = this._nodeStates.get(e);
    if (!t) return;
    const s = this._hasCheckedChildren(e);
    this.dispatchEvent(
      new M({
        data: t.raw,
        checked: t.checked,
        hasCheckedChildren: s
      })
    );
    const n = this.getCheckedNodes(), a = this.getCheckedKeys(), i = this.getHalfCheckedNodes(), o = this.getHalfCheckedKeys();
    this.dispatchEvent(
      new L({
        data: t.raw,
        checkedState: {
          checkedNodes: n,
          checkedKeys: a,
          halfCheckedNodes: i,
          halfCheckedKeys: o
        }
      })
    );
  }
  /** 更新所有节点的 checkbox 可见性 */
  _updateCheckboxVisibility() {
    this._nodeStates.forEach((e, t) => {
      this._updateNodeDOM(t);
    });
  }
  _handleClick(e) {
    const t = e.composedPath(), s = this._findLabelInPath(t);
    if (!s) return;
    const n = s.dataset.path, a = this._nodeStates.get(n);
    if (!a || (this._moveFocus(n), this._isCheckboxInPath(t))) return;
    const o = this._isToggleInPath(t);
    if (this.expandOnIconClick) {
      o ? this._toggleExpand(n) : (this.dispatchEvent(new C({ data: a.raw })), this._selectPath(n));
      return;
    }
    a.hasChildren && this._toggleExpand(n), this.dispatchEvent(new C({ data: a.raw })), this._selectPath(n);
  }
  _handleCheckboxChange(e) {
    e.stopPropagation();
    const s = e.composedPath().find(
      (r) => r instanceof HTMLElement && r.classList.contains(h.e("label"))
    );
    if (!s) return;
    const n = s.dataset.path, a = this._nodeStates.get(n);
    if (!a || a.disabled) return;
    const i = e.detail, o = (i == null ? void 0 : i.checked) !== void 0 ? i.checked : !a.checked;
    this._handleCheckboxToggle(n, o);
  }
  _handleContextmenu(e) {
    e.preventDefault(), e.stopPropagation();
    const t = e.composedPath(), s = this._findLabelInPath(t);
    if (!s) return;
    const n = s.dataset.path, a = this._nodeStates.get(n);
    a && this.dispatchEvent(
      new B({
        data: a.raw,
        node: a
      })
    );
  }
  _handleKeydown(e) {
    const s = e.target.dataset.path;
    if (!s) return;
    const n = this._nodeStates.get(s);
    if (!n || n.disabled) return;
    const a = this._getVisiblePaths();
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        const i = a.indexOf(s);
        i < a.length - 1 && this._moveFocus(a[i + 1]);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const i = a.indexOf(s);
        i > 0 && this._moveFocus(a[i - 1]);
        break;
      }
      case "ArrowRight": {
        if (e.preventDefault(), n.hasChildren)
          if (!n.expanded)
            this._expandPath(s);
          else {
            const i = this._getDirectChildrenPaths(s).filter((o) => this._getNodeElement(o) !== null);
            i.length > 0 && this._moveFocus(i[0]);
          }
        break;
      }
      case "ArrowLeft": {
        if (e.preventDefault(), n.hasChildren && n.expanded)
          this._collapsePath(s);
        else {
          const i = this._getParentPath(s);
          i && this._moveFocus(i);
        }
        break;
      }
      case "Home": {
        e.preventDefault(), a.length > 0 && this._moveFocus(a[0]);
        break;
      }
      case "End": {
        e.preventDefault(), a.length > 0 && this._moveFocus(a[a.length - 1]);
        break;
      }
      case "Enter": {
        e.preventDefault(), n.hasChildren ? this._toggleExpand(s) : this._selectPath(s);
        break;
      }
      case " ": {
        e.preventDefault(), this.showCheckbox ? this._handleCheckboxToggle(s) : this._selectPath(s);
        break;
      }
      case "*": {
        e.preventDefault(), this._expandSiblingNodes(s);
        break;
      }
      default: {
        e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key) && (e.preventDefault(), this._handleTypeAhead(s, e.key));
        break;
      }
    }
  }
  /** 获取所有可见节点的路径列表 */
  _getVisiblePaths() {
    const e = [], t = this._getRootPaths(), s = (n) => {
      for (const a of n) {
        const i = this._nodeStates.get(a);
        if (i && (e.push(a), i.hasChildren && i.expanded)) {
          const o = this._getDirectChildrenPaths(a);
          s(o);
        }
      }
    };
    return s(t), e;
  }
  /** 获取根节点路径列表 */
  _getRootPaths() {
    const e = [];
    return this._nodeStates.forEach((t, s) => {
      t.depth === 1 && e.push(s);
    }), e.sort(), e;
  }
  /** 获取父节点路径 */
  _getParentPath(e) {
    const t = e.split("-");
    return t.length <= 1 ? null : (t.pop(), t.join("-"));
  }
  /** 移动焦点到指定路径的节点 */
  _moveFocus(e) {
    const t = this._focusedPath;
    this._focusedPath = e, t && this._updateNodeDOM(t), this._updateNodeDOM(e);
    const s = this._getLabelElement(e);
    s && s.focus();
  }
  /** 展开同级所有节点 */
  _expandSiblingNodes(e) {
    const t = this._getParentPath(e), s = t ? this._getDirectChildrenPaths(t) : this._getRootPaths();
    for (const n of s) {
      const a = this._nodeStates.get(n);
      a && a.hasChildren && !a.expanded && this._expandPath(n);
    }
  }
  /** 处理 type-ahead 查找 */
  _handleTypeAhead(e, t) {
    const s = this._getVisiblePaths(), n = s.indexOf(e), a = t.toLowerCase();
    for (let i = 1; i < s.length; i++) {
      const o = (n + i) % s.length, r = s[o], d = this._nodeStates.get(r);
      if (d && d.label.toLowerCase().startsWith(a)) {
        this._moveFocus(r);
        return;
      }
    }
  }
  html() {
    return `
      <div class="${h()}" part="container"></div>
      <slot></slot>
    `;
  }
  $mount() {
    this._container.setAttribute("role", "tree"), this._updateTreeAriaAttrs(), this.updateContainerClasslist();
  }
  /** 更新树容器的 ARIA 属性 */
  _updateTreeAriaAttrs() {
    this._container && (this.label ? this._container.setAttribute("aria-label", this.label) : this._container.removeAttribute("aria-label"), this.showCheckbox ? this._container.setAttribute("aria-multiselectable", "true") : this._container.removeAttribute("aria-multiselectable"));
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const e = h({}, {});
    return this._container && (this._container.className = e), e;
  }
  /** 获取半选中节点数据数组 */
  getHalfCheckedNodes() {
    if (!this.showCheckbox) return [];
    const e = [];
    return this._nodeStates.forEach((t) => {
      t.indeterminate && e.push(t.raw);
    }), e;
  }
  /** 获取半选中节点键值数组 */
  getHalfCheckedKeys() {
    if (!this.showCheckbox || !this.nodeKey) return [];
    const e = this.nodeKey, t = [];
    return this._nodeStates.forEach((s) => {
      s.indeterminate && s.raw && s.raw[e] && t.push(s.raw[e]);
    }), t;
  }
  /** 获取当前选中节点的键值 */
  getCurrentKey() {
    if (!this.nodeKey || !this._treeState.selectedPath) return null;
    const e = this._nodeStates.get(this._treeState.selectedPath);
    return !e || !e.raw ? null : e.raw[this.nodeKey] || null;
  }
  /** 获取当前选中节点的数据 */
  getCurrentNode() {
    if (!this._treeState.selectedPath) return null;
    const e = this._nodeStates.get(this._treeState.selectedPath);
    return e ? e.raw : null;
  }
  /**
   * 更新指定节点的子节点数据
   * @param key - 节点键值
   * @param data - 新的子节点数据数组
   * @returns 是否更新成功
   */
  updateKeyChildren(e, t) {
    if (!this.nodeKey)
      return console.warn("updateKeyChildren requires node-key to be set"), !1;
    const s = this._findPathByKey(e);
    if (!s)
      return console.warn(`Node with key ${e} not found`), !1;
    const n = this._nodeStates.get(s);
    if (!n || !n.hasChildren)
      return console.warn("Target node is not a parent node"), !1;
    const { children: a } = this.dataProps;
    n.raw = { ...n.raw, [a]: t };
    const i = [];
    this._nodeStates.forEach((r, d) => {
      d.startsWith(s + "-") && i.push(d);
    }), i.forEach((r) => this._nodeStates.delete(r)), this._buildNodeStates(t, s);
    const o = this._getChildrenElement(s);
    return o && (o.innerHTML = this._renderTree(t, s)), k(() => {
      this._handleCheckboxToggle(s, n.checked);
    }, 16), !0;
  }
  /**
   * 获取选中节点数据数组
   * @param leafOnly - 是否仅返回叶子节点
   * @param includeHalfChecked - 是否包含半选节点
   * @returns 选中节点数据数组
   */
  getCheckedNodes(e = !1, t = !1) {
    if (!this.showCheckbox) return [];
    const s = [];
    return this._nodeStates.forEach((n) => {
      if (n.checked || t && n.indeterminate) {
        if (e && n.hasChildren) return;
        s.push(n.raw);
      }
    }), s;
  }
  /**
   * 通过节点数据设置选中状态
   * @param nodes - 要选中的节点数据数组
   * @returns 是否设置成功
   */
  setCheckedNodes(e) {
    return !this.showCheckbox || !this.nodeKey ? (console.warn(
      "setCheckedNodes requires show-checkbox and node-key to be set"
    ), !1) : (e.forEach((t) => {
      const s = this._resolvePath(t);
      if (!s) return;
      const n = this._nodeStates.get(s);
      !n || n.disabled || this._handleCheckboxToggle(s, !0);
    }), !0);
  }
  /**
   * 获取选中节点键值数组
   * @param leafOnly - 是否仅返回叶子节点
   * @returns 选中节点键值数组
   */
  getCheckedKeys(e = !1) {
    if (!this.showCheckbox || !this.nodeKey) return [];
    const t = this.nodeKey, s = [];
    return this._nodeStates.forEach((n) => {
      if (n.checked && n.raw && n.raw[t]) {
        if (e && n.hasChildren) return;
        s.push(n.raw[t]);
      }
    }), s;
  }
  /**
   * 通过键值设置选中状态
   * @param keys - 要选中的节点键值数组
   * @param leafOnly - 是否仅选中叶子节点
   * @returns 是否设置成功
   */
  setCheckedKeys(e, t = !1) {
    return !this.showCheckbox || !this.nodeKey ? (console.warn(
      "setCheckedKeys requires show-checkbox and node-key to be set"
    ), !1) : (e.forEach((s) => {
      const n = this._findPathByKey(s);
      if (!n) return;
      const a = this._nodeStates.get(n);
      !a || a.disabled || t && a.hasChildren || this._handleCheckboxToggle(n, !0);
    }), !0);
  }
  /**
   * 设置指定节点的选中状态
   * @param keyOrData - 节点键值或数据对象
   * @param checked - 是否选中
   * @returns 是否设置成功
   */
  setChecked(e, t) {
    if (!this.showCheckbox || !this.nodeKey)
      return console.warn("setChecked requires show-checkbox and node-key to be set"), !1;
    const s = this._resolvePath(e);
    if (!s)
      return console.warn("Node not found"), !1;
    const n = this._nodeStates.get(s);
    return !n || n.disabled ? (console.warn("Cannot set checked state for disabled node"), !1) : (this._handleCheckboxToggle(s, t), !0);
  }
  /**
   * 设置当前选中节点的键值
   * @param key - 节点键值，传 null 取消选中
   * @param shouldAutoExpandParent - 是否自动展开父节点
   * @returns 是否设置成功
   */
  setCurrentKey(e, t = !0) {
    if (!this.nodeKey)
      return console.warn("setCurrentKey requires node-key to be set"), !1;
    if (!e) {
      if (this._treeState.selectedPath) {
        const a = this._nodeStates.get(this._treeState.selectedPath);
        a && (a.selected = !1, this._updateNodeDOM(this._treeState.selectedPath)), this._treeState.selectedPath = null;
      }
      return !0;
    }
    const s = this._findPathByKey(e);
    if (!s)
      return console.warn(`Node with key ${e} not found`), !1;
    const n = this._nodeStates.get(s);
    return !n || n.disabled ? (console.warn("Cannot select disabled node"), !1) : (this._selectPath(s), t && this._expandAncestorPaths(s), !0);
  }
  /**
   * 设置当前选中节点
   * @param node - 节点数据对象，传 null 取消选中
   * @param shouldAutoExpandParent - 是否自动展开父节点
   * @returns 是否设置成功
   */
  setCurrentNode(e, t = !0) {
    if (!this.nodeKey)
      return console.warn("setCurrentNode requires node-key to be set"), !1;
    if (!e) {
      if (this._treeState.selectedPath) {
        const a = this._nodeStates.get(this._treeState.selectedPath);
        a && (a.selected = !1, this._updateNodeDOM(this._treeState.selectedPath)), this._treeState.selectedPath = null;
      }
      return !0;
    }
    const s = this._findPathByData(e);
    if (!s)
      return console.warn("Node not found"), !1;
    const n = this._nodeStates.get(s);
    return !n || n.disabled ? (console.warn("Cannot select disabled node"), !1) : (this._selectPath(s), t && this._expandAncestorPaths(s), !0);
  }
  /**
   * 获取节点信息
   * @param data - 节点键值或数据对象
   * @returns 节点信息对象，包含 label（节点状态）、child（子节点容器）、data（原始数据）
   */
  getNode(e) {
    if (!this.nodeKey)
      return console.warn("getNode requires node-key to be set"), null;
    const t = this._resolvePath(e);
    if (!t) return null;
    const s = this._nodeStates.get(t);
    return {
      label: s,
      child: this._getChildrenElement(t),
      data: s.raw
    };
  }
};
l([
  D(h.cb())
], c.prototype, "_container", 2);
l([
  _({
    type: Boolean,
    default: !1,
    observer() {
      this._updateCheckboxVisibility(), this._updateTreeAriaAttrs();
    }
  })
], c.prototype, "showCheckbox", 2);
l([
  _({
    type: Boolean,
    default: !1
  })
], c.prototype, "checkStrictly", 2);
l([
  _({
    type: String,
    default: ""
  })
], c.prototype, "nodeKey", 2);
l([
  _({
    type: String,
    default: "",
    observer() {
      this._updateTreeAriaAttrs();
    }
  })
], c.prototype, "label", 2);
l([
  _({
    type: Boolean,
    default: !1
  })
], c.prototype, "expandOnIconClick", 2);
l([
  b({
    type: Array,
    default: [],
    observer(e) {
      this._handleDataChange(e);
    }
  })
], c.prototype, "data", 2);
l([
  b({
    type: Object,
    default: { children: "children", label: "label", disabled: "disabled" }
  })
], c.prototype, "dataProps", 2);
l([
  b({
    type: Array,
    default: []
  })
], c.prototype, "defaultExpandedKeys", 2);
l([
  b({
    type: Array,
    default: []
  })
], c.prototype, "defaultCheckedKeys", 2);
l([
  p("click", h.ce("node"))
], c.prototype, "_handleClick", 1);
l([
  p("change", h.ce("checkbox"))
], c.prototype, "_handleCheckboxChange", 1);
l([
  p("contextmenu", h.ce("node"))
], c.prototype, "_handleContextmenu", 1);
l([
  p("keydown", h.ce("label"))
], c.prototype, "_handleKeydown", 1);
c = l([
  T(y, { styles: [$] })
], c);
const Z = c;
export {
  c as EaTree,
  Z as default
};
