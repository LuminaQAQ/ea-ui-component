import { a as K } from "../core/EaFormAssociatedBase.ts.js";
import { E as T } from "../core/EaBase.ts.js";
import { q as _, a as y, p as f, l as P, C as D } from "../core/decorator.js";
import { i as g } from "../utils/I18nManager.ts.js";
import { E as L } from "../utils/Enum.ts.js";
import "./ea-checkbox.js";
import "./ea-input.js";
import { s as B, a as F } from "../css/ea-transfer.style.js";
import { c as $ } from "../utils/bem.ts.js";
import "./ea-button.js";
import "./ea-icon.js";
class A extends Event {
  constructor(e) {
    super("ea-left-check-change", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class x extends Event {
  constructor(e) {
    super("ea-right-check-change", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
var w = Object.defineProperty, q = Object.getOwnPropertyDescriptor, d = (t, e, i, s) => {
  for (var a = s > 1 ? void 0 : s ? q(e, i) : e, l = t.length - 1, n; l >= 0; l--)
    (n = t[l]) && (a = (s ? n(e, i, a) : n(a)) || a);
  return s && a && w(e, i, a), a;
};
const E = "ea-transfer-panel", r = $(E);
let h = class extends T {
  constructor() {
    super(...arguments), this._uniqueId = h._idCounter++, this._states = {
      isEaInputDefined: !1,
      selectedKeys: /* @__PURE__ */ new Set(),
      filterText: ""
    }, this.disabled = !1, this.dataTitle = "", this.type = "source", this.filterable = !1, this.filterPlaceholder = "", this.data = [], this.filterMethod = null, this.dataProps = {
      key: "key",
      label: "label",
      disabled: "disabled"
    }, this.dataMap = /* @__PURE__ */ new Map();
  }
  updateContainerClasslist() {
    var s, a, l, n, p;
    const t = (l = (a = (s = this._footerSlot) == null ? void 0 : s.assignedElements) == null ? void 0 : a.call(s)) == null ? void 0 : l[0], e = ((p = (n = t == null ? void 0 : t.assignedElements) == null ? void 0 : n.call(t)) == null ? void 0 : p.length) > 0, i = r(
      {},
      {
        filterable: this.filterable,
        "has-footer": e,
        disabled: this.disabled
      }
    );
    return this._container && (this._container.className = i), i;
  }
  html() {
    g.locale = this.locale;
    const t = `ea-transfer-panel-title-${this._uniqueId}`;
    return `
      <div class='${r()}' part='container'>
        <div class='${r.e("header")}' part='header'>
          <ea-checkbox class='${r.e("checkbox")}' part='checkbox'>
            <span class='${r.e("title")}' part='title' id='${t}'></span>
          </ea-checkbox>
          <span class='${r.e("count")}' part='count'></span>
        </div>
        <div class='${r.e("body")}' part='body'>
          <div class='${r.e("filter-wrapper")}' part='filter-wrapper'>
            <ea-input
              class='${r.e("filter")}'
              placeholder="${g.t("transfer.filterPlaceholder")}"
              part='filter'
              prefix-icon="magnifying-glass"
              clearable
            ></ea-input>
          </div>
          <ul class='${r.e("list")}' part='list' role='listbox' tabindex='0' aria-labelledby='${t}' aria-multiselectable='true' aria-activedescendant=''></ul>
          <div class='${r.e("empty")}' part='empty'>
            <slot name="empty"></slot>
          </div>
          <div class='${r.e("footer")}' part='footer'>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
  $updateLocalization(t) {
    this.locale = t, g.locale = t, this._updateFilterPlaceholder();
  }
  $mount() {
    this.updateContainerClasslist(), this._bindEvents();
  }
  $beforeUnmount() {
    var t, e;
    (t = this._abortController) == null || t.abort(), (e = this._filterAbortController) == null || e.abort();
  }
  /** 清空列表项 */
  clearList() {
    this._list && (this._list.innerHTML = "");
  }
  /** 清空搜索关键词并重置过滤 */
  clearQuery() {
    this._filterInput && (this._filterInput.value = "", this._handleFilterChange(""));
  }
  /** 处理列表项选中变化 */
  _handleItemChange(t) {
    if (t.stopImmediatePropagation(), this.disabled) return;
    const e = t.target.closest(
      `.${r.e("item")}`
    );
    if (!e) return;
    const i = !!t.target.checked;
    i ? this._states.selectedKeys.add(e) : this._states.selectedKeys.delete(e), e.setAttribute("aria-selected", String(i)), this._updateSelectAllState(), this.emit("ea-transfer-panel-select-change", {
      detail: {
        type: this.type,
        selectedKey: e,
        isChecked: i
      },
      bubbles: !0,
      composed: !0
    }), this._updateCount();
  }
  _handleListKeydown(t) {
    if (this.disabled) return;
    const e = this._getVisibleItems();
    if (e.length === 0) return;
    const i = this._list.getAttribute("aria-activedescendant") || "", s = e.findIndex((a) => a.id === i);
    switch (t.key) {
      case "ArrowDown": {
        t.preventDefault();
        const a = s < e.length - 1 ? s + 1 : 0;
        this._setActiveDescendant(e[a]);
        break;
      }
      case "ArrowUp": {
        t.preventDefault();
        const a = s > 0 ? s - 1 : e.length - 1;
        this._setActiveDescendant(e[a]);
        break;
      }
      case "Home": {
        t.preventDefault(), this._setActiveDescendant(e[0]);
        break;
      }
      case "End": {
        t.preventDefault(), this._setActiveDescendant(e[e.length - 1]);
        break;
      }
      case " ": {
        t.preventDefault(), s >= 0 && this._toggleItemSelection(e[s]);
        break;
      }
    }
  }
  _handleListFocus() {
    if (this._list.getAttribute("aria-activedescendant")) return;
    const e = this._getVisibleItems();
    if (e.length === 0) return;
    const i = e.find(
      (s) => s.getAttribute("aria-selected") === "true"
    );
    this._setActiveDescendant(i || e[0]);
  }
  _handleListBlur() {
    const t = this._list.getAttribute("aria-activedescendant");
    if (t) {
      const e = this._list.querySelector(`#${t}`);
      e && e.classList.remove("is-active");
    }
  }
  /** 设置 aria-activedescendant 指向的当前活动选项 */
  _setActiveDescendant(t) {
    const e = this._list.getAttribute("aria-activedescendant");
    if (e) {
      const i = this._list.querySelector(`#${e}`);
      i && i.classList.remove("is-active");
    }
    this._list.setAttribute("aria-activedescendant", t.id), t.classList.add("is-active"), t.scrollIntoView({ block: "nearest" });
  }
  /** 切换列表项的选中状态 */
  _toggleItemSelection(t) {
    const e = t.querySelector(
      `.${r.e("item-checkbox")}:not([disabled])`
    );
    e && (e.checked = !e.checked, e.dispatchEvent(
      new CustomEvent("change", { bubbles: !0, composed: !0 })
    ));
  }
  /** 获取当前可见且可交互的列表项 */
  _getVisibleItems() {
    return [
      ...this._list.querySelectorAll(
        `.${r.e("item")}:not(.is-disabled):not(.is-filtered-out)`
      )
    ];
  }
  /** 处理全选复选框变化 */
  _handleSelectAllChange(t) {
    if (t.stopImmediatePropagation(), this.disabled) return;
    const e = !!t.target.checked, i = !!(this._states.filterText && this._states.filterText.trim() !== ""), s = this._getSelectableItems(i);
    t.target.indeterminate = !1, s.forEach((a) => {
      const l = a.querySelector(
        `.${r.e("item-checkbox")}:not([disabled])`
      );
      l && (l.checked = e, e ? this._states.selectedKeys.add(a) : this._states.selectedKeys.delete(a), a.setAttribute("aria-selected", String(e)));
    }), this.emit("ea-transfer-panel-select-all", {
      detail: {
        type: this.type,
        selectedKeys: s,
        isChecked: e,
        isFiltering: i
      },
      bubbles: !0,
      composed: !0
    }), this._updateCount();
  }
  /** 获取当前可选择的列表项 */
  _getSelectableItems(t) {
    return t ? [
      ...this._list.querySelectorAll(
        `.${r.e("item")}:not(.is-disabled):not(.is-filtered-out)`
      )
    ] : [
      ...this._list.querySelectorAll(`.${r.e("item")}:not(.is-disabled)`)
    ];
  }
  /** 绑定列表和全选复选框事件 */
  _bindEvents() {
    var t;
    (t = this._abortController) == null || t.abort(), this._abortController = new AbortController(), this._list.addEventListener("change", (e) => this._handleItemChange(e), {
      signal: this._abortController.signal
    }), this._checkbox.addEventListener(
      "change",
      (e) => this._handleSelectAllChange(e),
      {
        signal: this._abortController.signal
      }
    );
  }
  /** 更新选中计数显示 */
  _updateCount() {
    if (!this._count) return;
    const t = this._list.querySelectorAll(`.${r.e("item")}`).length, e = this._states.selectedKeys.size;
    this._count.textContent = `${e}/${t}`;
  }
  /** 处理数据更新，重新渲染列表 */
  _handleDataUpdate(t) {
    this.clearList();
    const e = new Set(t);
    for (const i of this._states.selectedKeys)
      e.has(i) || this._states.selectedKeys.delete(i);
    t.forEach((i) => {
      this._list.appendChild(i);
    }), this._removeCheckboxFromTabSequence(), this._filterData(), t.length === 0 ? (this._checkbox.disabled = !0, this._checkbox.checked = !1, this._checkbox.indeterminate = !1) : this._checkbox.disabled = !1, this._updateCount(), this._updateSelectAllState();
  }
  /** 将列表项内 checkbox 从 Tab 序列中移除，由 listbox 统一管理焦点 */
  _removeCheckboxFromTabSequence() {
    requestAnimationFrame(() => {
      this._list.querySelectorAll(
        `.${r.e("item-checkbox")}`
      ).forEach((e) => {
        e.tabIndex = -1;
      });
    });
  }
  /** 处理 filterable 属性内部更新 */
  _handleFilterableUpdateInternal(t) {
    var e;
    this._filterWrapper && (t ? (this._updateFilterPlaceholder(this.filterPlaceholder), this._bindFilterEvents()) : ((e = this._filterAbortController) == null || e.abort(), this._handleFilterChange("")), this.updateContainerClasslist());
  }
  /** 处理 disabled 属性更新 */
  _handleDisabledUpdate() {
    this._checkbox && (this._checkbox.disabled = this.disabled), this._filterInput && (this._filterInput.disabled = this.disabled);
  }
  /** 绑定搜索框输入和清除事件 */
  _bindFilterEvents() {
    var t;
    (t = this._filterAbortController) == null || t.abort(), this._filterAbortController = new AbortController(), this._filterInput && (this._filterInput.addEventListener(
      "input",
      (e) => {
        e.stopImmediatePropagation();
        const i = e.target.value.trim();
        this._handleFilterChange(i);
      },
      {
        signal: this._filterAbortController.signal
      }
    ), this._filterInput.addEventListener(
      "ea-clear",
      (e) => {
        e.stopImmediatePropagation(), this._handleFilterChange("");
      },
      {
        signal: this._filterAbortController.signal
      }
    ));
  }
  /** 处理搜索关键词变化 */
  _handleFilterChange(t) {
    this._states.filterText = t, this._filterData(), this._updateSelectAllState();
  }
  /** 计算全选复选框状态 */
  _calculateSelectAllState() {
    const t = this._states.filterText && this._states.filterText.trim() !== "";
    let e, i;
    if (t) {
      const s = this._list.querySelectorAll(
        `.${r.e("item")}:not(.is-disabled):not(.is-filtered-out)`
      ).length, a = [...this._states.selectedKeys].filter(
        (l) => !l.classList.contains("is-filtered-out")
      ).length;
      e = s > 0 && a >= s, i = a > 0;
    } else {
      const s = this._list.querySelectorAll(
        `.${r.e("item")}:not(.is-disabled)`
      ).length;
      e = s > 0 && this._states.selectedKeys.size >= s, i = this._states.selectedKeys.size > 0;
    }
    return { isAllChecked: e, isSomeChecked: i };
  }
  /** 更新全选复选框的选中/半选状态 */
  _updateSelectAllState() {
    if (!this._checkbox) return;
    const { isAllChecked: t, isSomeChecked: e } = this._calculateSelectAllState();
    t ? (this._checkbox.checked = !0, this._checkbox.indeterminate = !1) : e ? (this._checkbox.checked = !1, this._checkbox.indeterminate = !0) : (this._checkbox.checked = !1, this._checkbox.indeterminate = !1);
  }
  /** 根据搜索关键词过滤列表项 */
  _filterData() {
    const { label: t } = this.dataProps, e = this._states.filterText || "", i = e.toLowerCase(), s = [
      ...this._list.querySelectorAll(`.${r.e("item")}`)
    ];
    if (!e) {
      s.forEach((a) => {
        a.classList.remove("is-filtered-out");
      }), this._updateCount();
      return;
    }
    this.filterMethod && typeof this.filterMethod == "function" ? s.forEach((a) => {
      var p;
      const l = ((p = this.dataMap) == null ? void 0 : p.get(a)) || {}, n = this.filterMethod(e, l);
      a.classList.toggle("is-filtered-out", !n);
    }) : s.forEach((a) => {
      var m;
      const p = ((((m = this.dataMap) == null ? void 0 : m.get(a)) || {})[t] || "").toLowerCase().includes(i);
      a.classList.toggle("is-filtered-out", !p);
    }), this._updateCount();
  }
  /** 更新搜索框占位符文本 */
  _updateFilterPlaceholder(t) {
    this._filterInput && (this.hasAttribute("filter-placeholder") || (this._filterInput.placeholder = t || g.t("transfer.filterPlaceholder")));
  }
};
h._idCounter = 0;
d([
  _(r.cb())
], h.prototype, "_container", 2);
d([
  _(r.ce("checkbox"))
], h.prototype, "_checkbox", 2);
d([
  _(r.ce("title"))
], h.prototype, "_title", 2);
d([
  _(r.ce("count"))
], h.prototype, "_count", 2);
d([
  _(r.ce("list"))
], h.prototype, "_list", 2);
d([
  _(r.ce("filter-wrapper"))
], h.prototype, "_filterWrapper", 2);
d([
  _(r.ce("filter"))
], h.prototype, "_filterInput", 2);
d([
  _("slot[name='footer']")
], h.prototype, "_footerSlot", 2);
d([
  y({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist(), this._handleDisabledUpdate();
    }
  })
], h.prototype, "disabled", 2);
d([
  y({
    type: String,
    default: "",
    observer(t) {
      this._title && (this._title.textContent = t || "");
    }
  })
], h.prototype, "dataTitle", 2);
d([
  y({
    type: L(["source", "target"]),
    default: "source"
  })
], h.prototype, "type", 2);
d([
  y({
    type: Boolean,
    default: !1,
    observer(t) {
      if (!this._states.isEaInputDefined) {
        customElements.whenDefined("ea-input").then(() => {
          this._states.isEaInputDefined = !0, this._handleFilterableUpdateInternal(t);
        });
        return;
      }
      this._handleFilterableUpdateInternal(t);
    }
  })
], h.prototype, "filterable", 2);
d([
  y({
    type: String,
    default: "",
    observer(t) {
      this.filterable && this._updateFilterPlaceholder(t);
    }
  })
], h.prototype, "filterPlaceholder", 2);
d([
  f({
    type: Array,
    default: [],
    observer(t) {
      this._handleDataUpdate(t);
    }
  })
], h.prototype, "data", 2);
d([
  f({
    type: Function,
    default: null,
    rawFunction: !0
  })
], h.prototype, "filterMethod", 2);
d([
  f({
    type: Object,
    default: { key: "key", label: "label", disabled: "disabled" }
  })
], h.prototype, "dataProps", 2);
d([
  f({
    type: Object,
    default: /* @__PURE__ */ new Map()
  })
], h.prototype, "dataMap", 2);
d([
  P("keydown", r.ce("list"))
], h.prototype, "_handleListKeydown", 1);
d([
  P("focus", r.ce("list"))
], h.prototype, "_handleListFocus", 1);
d([
  P("blur", r.ce("list"))
], h.prototype, "_handleListBlur", 1);
h = d([
  D(E, { styles: [B] })
], h);
var U = Object.defineProperty, O = Object.getOwnPropertyDescriptor, u = (t, e, i, s) => {
  for (var a = s > 1 ? void 0 : s ? O(e, i) : e, l = t.length - 1, n; l >= 0; l--)
    (n = t[l]) && (a = (s ? n(e, i, a) : n(a)) || a);
  return s && a && U(e, i, a), a;
};
const I = "ea-transfer", o = $(I);
let c = class extends K {
  constructor() {
    super(...arguments), this.disabled = !1, this.filterable = !1, this.filterPlaceholder = "请输入搜索内容", this.data = [], this.value = [], this.dataProps = {
      key: "key",
      label: "label",
      disabled: "disabled"
    }, this.titles = [], this.buttonTexts = [], this.filterMethod = null, this.leftDefaultChecked = [], this.rightDefaultChecked = [], this._states = {
      isPanelDefined: !1,
      sourceSelectedKeys: /* @__PURE__ */ new Set(),
      targetSelectedKeys: /* @__PURE__ */ new Set(),
      dataMap: /* @__PURE__ */ new Map()
    };
  }
  updateContainerClasslist() {
    const t = o({}, { disabled: this.disabled });
    return this._container && (this._container.className = t), t;
  }
  html() {
    return g.locale = this.locale, `
      <div class='${o()}' part='container' role='group' aria-label='Transfer'>
        <ea-transfer-panel
          class='${o.e("panel")} ${o.e("panel")}--source'
          part='panel source-panel'
          type="source"
          data-title="${this._getDefaultTitle("source")}"
          filter-placeholder="${this.filterPlaceholder}"
        >
          <slot name="left-empty" slot="empty"></slot>
          <slot name="left-footer" slot="footer"></slot>
        </ea-transfer-panel>

        <div class='${o.e("buttons")}' part='buttons'>
          <ea-button
            class='${o.e("button")} ${o.e("move-to-right-btn")}'
            part='button move-to-right-btn'
            variant="primary"
            size="small"
            disabled
          >
            <ea-icon name="angle-right"></ea-icon>
            <span class="${o.e("button-text")}"></span>
          </ea-button>
          <ea-button
            class='${o.e("button")} ${o.e("move-to-left-btn")}'
            part='button move-to-left-btn'
            variant="primary"
            size="small"
            disabled
          >
            <ea-icon name="angle-left"></ea-icon>
            <span class="${o.e("button-text")}"></span>
          </ea-button>
        </div>

        <ea-transfer-panel
          class='${o.e("panel")} ${o.e("panel")}--target'
          part='panel target-panel'
          type="target"
          data-title="${this._getDefaultTitle("target")}"
          filter-placeholder="${this.filterPlaceholder}"
        >
          <slot name="right-empty" slot="empty"></slot>
          <slot name="right-footer" slot="footer"></slot>
        </ea-transfer-panel>
      </div>
    `;
  }
  $updateLocalization(t) {
    this.locale = t, g.locale = t, (!this.titles || this.titles.length === 0) && this._updateTitles([
      this._getDefaultTitle("source"),
      this._getDefaultTitle("target")
    ]);
  }
  $mount() {
    this.updateContainerClasslist(), this._bindEvents();
  }
  $beforeUnmount() {
    var t;
    (t = this._abortController) == null || t.abort();
  }
  /** 处理 disabled 属性更新，同步到子面板 */
  _handleDisabledUpdate() {
    this._sourcePanel && this._sourcePanel.toggleAttribute("disabled", this.disabled), this._targetPanel && this._targetPanel.toggleAttribute("disabled", this.disabled);
  }
  /** 更新字段映射配置到子面板 */
  _updateFieldMapping(t) {
    this._sourcePanel && (this._sourcePanel.dataProps = t), this._targetPanel && (this._targetPanel.dataProps = t);
  }
  /** 处理数据源更新，将数据分配到左右面板 */
  _handleDataUpdate(t) {
    const { key: e } = this.dataProps;
    if (this._sourcePanel) {
      const i = t.filter((s) => {
        const a = s[e];
        return !this.value.includes(a);
      });
      this._sourcePanel.clearList(), this._sourcePanel.data = this._createPanelData(
        i,
        this.leftDefaultChecked
      ), this._sourcePanel.selected = this.leftDefaultChecked, this._sourcePanel.originalData = t, this._sourcePanel.dataMap = this._states.dataMap, this._sourcePanel.dataProps = this.dataProps;
    }
    if (this._targetPanel) {
      const i = t.filter((s) => {
        const a = s[e];
        return this.value.includes(a);
      });
      this._targetPanel.clearList(), this._targetPanel.data = this._createPanelData(
        i,
        this.rightDefaultChecked
      ), this._targetPanel.selected = this.rightDefaultChecked, this._targetPanel.originalData = t, this._targetPanel.dataMap = this._states.dataMap, this._targetPanel.dataProps = this.dataProps;
    }
  }
  /** 处理选中值更新，重新分配面板数据 */
  _handleValueUpdate(t) {
    const { key: e } = this.dataProps;
    if (!(!this.data || this.data.length === 0)) {
      if (this._sourcePanel) {
        const i = this.data.filter((s) => {
          const a = s[e];
          return !t.includes(a);
        });
        this._sourcePanel.clearList(), this._sourcePanel.data = this._createPanelData(
          i,
          this.leftDefaultChecked
        ), this._sourcePanel.selected = this.leftDefaultChecked, this._sourcePanel.originalData = this.data, this._sourcePanel.dataMap = this._states.dataMap, this._sourcePanel.dataProps = this.dataProps;
      }
      if (this._targetPanel) {
        const i = this.data.filter((s) => {
          const a = s[e];
          return t.includes(a);
        }).sort((s, a) => {
          const l = t.indexOf(s[e]), n = t.indexOf(a[e]);
          return l - n;
        });
        this._targetPanel.clearList(), this._targetPanel.data = this._createPanelData(
          i,
          this.rightDefaultChecked
        ), this._targetPanel.selected = this.rightDefaultChecked, this._targetPanel.originalData = this.data, this._targetPanel.dataMap = this._states.dataMap, this._targetPanel.dataProps = this.dataProps;
      }
    }
  }
  /** 根据数据创建面板列表项元素 */
  _createPanelData(t, e) {
    const { key: i, label: s, disabled: a } = this.dataProps, l = $("ea-transfer-panel");
    return Array.from(
      { length: t.length },
      (p, m) => {
        const b = document.createElement("li"), v = t[m], C = v[a], k = e.includes(v[i]), M = `ea-transfer-option-${c._optionIdCounter++}`, S = [];
        return C && S.push("is-disabled"), k && S.push("is-checked"), b.className = [l.e("item"), ...S].join(" "), b.id = M, b.setAttribute("role", "option"), b.setAttribute("aria-selected", String(k)), b.innerHTML = `
        <ea-checkbox
          class="${l.e("item-checkbox")}"
          ${C ? "disabled" : ""}
          ${k && !C ? "checked" : ""}
          part="item-checkbox"
        >
          <span class="${l.e("item-label")}" part="item-label">${v[s]}</span>
        </ea-checkbox>
      `, this._states.dataMap.set(b, v), b;
      }
    ).sort((p, m) => {
      const b = this._states.dataMap.get(p)[i], v = this._states.dataMap.get(m)[i];
      return b - v;
    });
  }
  /** 更新移动按钮的文本内容 */
  _updateButtonTexts(t) {
    if (Array.isArray(t) && t.length >= 2) {
      const [e, i] = t;
      if (this._moveToRightBtn) {
        const s = this._moveToRightBtn.querySelector(
          `.${o.e("button-text")}`
        );
        s && (s.textContent = e, s.style.display = "inline");
      }
      if (this._moveToLeftBtn) {
        const s = this._moveToLeftBtn.querySelector(
          `.${o.e("button-text")}`
        );
        s && (s.textContent = i, s.style.display = "inline");
      }
    }
  }
  /** 处理 filterable 属性更新，同步到子面板 */
  _handleFilterableUpdate(t) {
    t && (this._sourcePanel && this._sourcePanel.toggleAttribute("filterable", t), this._targetPanel && this._targetPanel.toggleAttribute("filterable", t));
  }
  /** 更新搜索框占位符到子面板 */
  _updateFilterPlaceholder(t) {
    this.filterable && (this._sourcePanel && this._sourcePanel.setAttribute("filter-placeholder", t), this._targetPanel && this._targetPanel.setAttribute("filter-placeholder", t));
  }
  /** 获取面板默认标题 */
  _getDefaultTitle(t) {
    return t === "source" ? g.t("transfer.list1") : g.t("transfer.list2");
  }
  /** 更新面板标题 */
  _updateTitles(t) {
    if (Array.isArray(t) && t.length >= 2) {
      const [e, i] = t;
      this._sourcePanel && this._sourcePanel.setAttribute("data-title", e), this._targetPanel && this._targetPanel.setAttribute("data-title", i);
    }
  }
  /** 更新移动按钮的启用/禁用状态 */
  _updateButtonStates() {
    const { disabled: t } = this.dataProps;
    if (this._moveToRightBtn) {
      const e = this._getMovableKeys(
        [...this._states.sourceSelectedKeys],
        t
      );
      this._moveToRightBtn.disabled = e.length === 0;
    }
    if (this._moveToLeftBtn) {
      const e = this._getMovableKeys(
        [...this._states.targetSelectedKeys],
        t
      );
      this._moveToLeftBtn.disabled = e.length === 0;
    }
  }
  /** 清空指定面板的搜索关键词 */
  clearQuery(t) {
    t === "left" && this._sourcePanel ? this._sourcePanel.clearQuery() : t === "right" && this._targetPanel && this._targetPanel.clearQuery();
  }
  /** 触发面板选中项变化事件 */
  _triggerCheckChangeEvent(t, e) {
    const i = [
      ...this._states[`${t}SelectedKeys`]
    ], { key: s } = this.dataProps, l = {
      value: i.map((n) => {
        const p = this._states.dataMap.get(n);
        return p ? p[s] : null;
      }).filter(Boolean),
      movedKeys: [this._states.dataMap.get(e)[s]]
    };
    if (t === "source") {
      const n = new A(l);
      this.dispatchEvent(n);
    } else if (t === "target") {
      const n = new x(l);
      this.dispatchEvent(n);
    }
  }
  /** 触发全选变化事件 */
  _triggerCheckAllChangeEvent(t, e) {
    const { key: i } = this.dataProps, s = e.map((l) => {
      const n = this._states.dataMap.get(l);
      return n ? n[i] : null;
    }).filter(Boolean), a = [
      ...this._states[`${t}SelectedKeys`]
    ].map((l) => {
      const n = this._states.dataMap.get(l);
      return n ? n[i] : null;
    }).filter(Boolean);
    t === "source" ? this.dispatchEvent(
      new A({
        value: a,
        movedKeys: s
      })
    ) : t === "target" && this.dispatchEvent(
      new x({
        value: a,
        movedKeys: s
      })
    );
  }
  /** 处理面板选中项变化 */
  _handleSelectionChange(t, e, i) {
    const s = `${t}SelectedKeys`, a = this._states[s];
    i ? a.add(e) : a.delete(e), this._updateButtonStates(), this._triggerCheckChangeEvent(t, e);
  }
  /** 处理全选变化 */
  _handleSelectAllChange(t, e, i) {
    const s = `${t}SelectedKeys`, a = this._states[s];
    i ? e.forEach((l) => a.add(l)) : e.forEach((l) => a.delete(l)), this._updateButtonStates(), this._triggerCheckAllChangeEvent(t, e);
  }
  /** 获取可移动的选中项（排除禁用项） */
  _getMovableKeys(t, e) {
    return t.filter((i) => {
      const s = this._states.dataMap.get(i);
      return !s || !s[e];
    });
  }
  /** 处理移动后清除选中状态 */
  _handleMovableKeys(t, e) {
    const i = `${e}SelectedKeys`, s = this._states[i];
    t.forEach((a) => {
      const l = a.querySelector(".ea-transfer-panel__item-checkbox");
      l && (l.checked = !1, l.dispatchEvent(
        new CustomEvent("change", {
          bubbles: !0,
          composed: !0,
          detail: {
            checkbox: !1
          }
        })
      )), s.delete(a);
    });
  }
  /** 生成面板数据排序函数 */
  _handlePanelDataSort(t) {
    return (e, i) => {
      const s = this._states.dataMap.get(e), a = this._states.dataMap.get(i);
      return s[t] - a[t] || 0;
    };
  }
  _onMoveToRight(t) {
    if (t.stopImmediatePropagation(), this.disabled) return;
    const { key: e, disabled: i } = this.dataProps, s = [...this._states.sourceSelectedKeys], a = this._getMovableKeys(s, i);
    if (a.length !== 0) {
      if (this._handleMovableKeys(a, "source"), this._targetPanel && (this._targetPanel.data = [
        ...new Set(
          [...this._targetPanel.data, ...a].sort(
            this._handlePanelDataSort(e)
          )
        )
      ]), this._sourcePanel && (this._sourcePanel.data = this._sourcePanel.data.filter((l) => !a.includes(l)).sort(this._handlePanelDataSort(e))), this._targetPanel) {
        const l = this._targetPanel.data.map((n) => this._states.dataMap.get(n)[e]);
        this.value = l;
      }
      this._updateButtonStates();
    }
  }
  _onMoveToLeft(t) {
    if (t.stopImmediatePropagation(), this.disabled) return;
    const { key: e, disabled: i } = this.dataProps, s = [...this._states.targetSelectedKeys], a = this._getMovableKeys(s, i);
    if (a.length !== 0) {
      if (this._handleMovableKeys(a, "target"), this._sourcePanel && (this._sourcePanel.data = [
        ...new Set(
          [...this._sourcePanel.data, ...a].sort(
            this._handlePanelDataSort(e)
          )
        )
      ]), this._targetPanel && (this._targetPanel.data = this._targetPanel.data.filter((l) => !a.includes(l)).sort(this._handlePanelDataSort(e))), this._targetPanel) {
        const l = this._targetPanel.data.map((n) => this._states.dataMap.get(n)[e]);
        this.value = l;
      }
      this._updateButtonStates();
    }
  }
  /** 绑定面板内部通信事件 */
  _bindEvents() {
    var t;
    (t = this._abortController) == null || t.abort(), this._abortController = new AbortController(), this._container.addEventListener(
      "ea-transfer-panel-select-change",
      (e) => {
        e.stopImmediatePropagation();
        const { type: i, selectedKey: s, isChecked: a } = e.detail;
        this._handleSelectionChange(i, s, a);
      },
      {
        signal: this._abortController.signal
      }
    ), this._container.addEventListener(
      "ea-transfer-panel-select-all",
      (e) => {
        e.stopImmediatePropagation();
        const { type: i, selectedKeys: s, isChecked: a } = e.detail;
        this._handleSelectAllChange(i, s, a);
      },
      {
        signal: this._abortController.signal
      }
    );
  }
  get validationTarget() {
    var t, e;
    return ((e = (t = this._targetPanel) == null ? void 0 : t.shadowRoot) == null ? void 0 : e.querySelector(
      ".ea-transfer-panel__list"
    )) || null;
  }
  updateValidity() {
    const t = this.value, e = !t || Array.isArray(t) && t.length === 0;
    this.required && e ? this.internals.setValidity({ valueMissing: !0 }, "请至少选择一项") : this.internals.setValidity({}, "");
  }
  checkValidity() {
    return this.updateValidity(), this.internals.checkValidity();
  }
  reportValidity() {
    return this.updateValidity(), this.internals.reportValidity();
  }
};
c._optionIdCounter = 0;
u([
  _(o.cb())
], c.prototype, "_container", 2);
u([
  _(`.${o.e("panel")}.${o.e("panel")}--source`)
], c.prototype, "_sourcePanel", 2);
u([
  _(`.${o.e("panel")}.${o.e("panel")}--target`)
], c.prototype, "_targetPanel", 2);
u([
  _(`${o.ce("button")}${o.ce("move-to-right-btn")}`)
], c.prototype, "_moveToRightBtn", 2);
u([
  _(`${o.ce("button")}${o.ce("move-to-left-btn")}`)
], c.prototype, "_moveToLeftBtn", 2);
u([
  y({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-disabled",
      map: (t) => String(t)
    },
    observer() {
      this.updateContainerClasslist(), this._handleDisabledUpdate();
    }
  })
], c.prototype, "disabled", 2);
u([
  y({
    type: Boolean,
    default: !1,
    observer(t) {
      this._handleFilterableUpdate(t);
    }
  })
], c.prototype, "filterable", 2);
u([
  y({
    type: String,
    default: "请输入搜索内容",
    observer(t) {
      this._updateFilterPlaceholder(t);
    }
  })
], c.prototype, "filterPlaceholder", 2);
u([
  f({
    type: Array,
    default: [],
    observer(t) {
      if (!this._states.isPanelDefined) {
        customElements.whenDefined("ea-transfer-panel").then(() => {
          this._states.isPanelDefined = !0, this._handleDataUpdate(t);
        });
        return;
      }
      this._handleDataUpdate(t);
    }
  })
], c.prototype, "data", 2);
u([
  f({
    type: Array,
    default: [],
    observer(t) {
      if (!this._states.isPanelDefined) {
        customElements.whenDefined("ea-transfer-panel").then(() => {
          this._states.isPanelDefined = !0, this._handleValueUpdate(t), this.setValue(t), this.emit("change", { detail: { value: t } });
        });
        return;
      }
      this._handleValueUpdate(t), this.setValue(t), this.emit("change", { detail: { value: t } });
    }
  })
], c.prototype, "value", 2);
u([
  f({
    type: Object,
    default: { key: "key", label: "label", disabled: "disabled" },
    observer(t) {
      this._updateFieldMapping(t);
    }
  })
], c.prototype, "dataProps", 2);
u([
  f({
    type: Array,
    default: [],
    observer(t) {
      this._updateTitles(t);
    }
  })
], c.prototype, "titles", 2);
u([
  f({
    type: Array,
    default: [],
    observer(t) {
      this._updateButtonTexts(t);
    }
  })
], c.prototype, "buttonTexts", 2);
u([
  f({
    type: Function,
    default: null,
    rawFunction: !0
  })
], c.prototype, "filterMethod", 2);
u([
  f({
    type: Array,
    default: []
  })
], c.prototype, "leftDefaultChecked", 2);
u([
  f({
    type: Array,
    default: []
  })
], c.prototype, "rightDefaultChecked", 2);
u([
  P("click", `.${o.e("move-to-right-btn")}`)
], c.prototype, "_onMoveToRight", 1);
u([
  P("click", `.${o.e("move-to-left-btn")}`)
], c.prototype, "_onMoveToLeft", 1);
c = u([
  D(I, { styles: [F] })
], c);
export {
  c as EaTransfer
};
