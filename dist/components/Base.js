import { v as l } from "./index3.js";
class m extends HTMLElement {
  static get observedAttributes() {
    return this.observedProps;
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this._isSyncingAttrToState = !1;
  }
  /**
   * 样式导入
   * @param {string} stylesheet 静态样式（vite:`xxx.css?inline`）
   */
  adoptedStyle(e) {
    const t = new CSSStyleSheet(), i = new CSSStyleSheet();
    t.replaceSync(e), i.replaceSync(l), this.shadowRoot.adoptedStyleSheets = [t, i];
  }
  /**
   * 创建响应式数据配置
   * @param {Object.<string, {
  *   type: (Function|Array<*>),
  *   default: any,
  *   observer?: (newVal: any, oldVal?: any) => void
  * }>} states 配置对象，每个 key 是一个响应式字段名
  * @returns {Object} 返回代理后的响应式状态对象
  */
  properties(e) {
    const t = this, i = {};
    for (const [n, s] of Object.entries(e))
      i[n] = s.default;
    const h = (n, s) => {
      const r = e[n], o = r == null ? void 0 : r.type;
      if (o === Boolean)
        return s === "" || s === "true" || s === !0;
      if (o === Number) {
        const u = Number(s);
        return isNaN(u) ? r.default : u;
      }
      return Array.isArray(o) ? o.includes(s) ? s : r.default : s ?? r.default;
    }, c = (n, s) => {
      t._isSyncingStateToAttr || (t._isSyncingStateToAttr = !0, t.toggleAttr(n, s), t._isSyncingStateToAttr = !1);
    };
    return new Proxy(i, {
      get(n, s) {
        return n[s];
      },
      set(n, s, r) {
        var a;
        const o = e[s];
        if (!o)
          return !0;
        const u = h(s, r), d = n[s];
        return d === u || (n[s] = u, c(s, u), (a = o.observer) == null || a.call(o, u, d), t.$updated({ key: s, newVal: u, oldVal: d })), !0;
      }
    });
  }
  attributeChangedCallback(e, t, i) {
    t === i || this._isSyncingStateToAttr || (this._isSyncingAttrToState = !0, this.state && e in this.state && (this.state[e] = i), this._isSyncingAttrToState = !1);
  }
  /** @abstract 组件挂载前调用 */
  $beforeMounted() {
  }
  /** @abstract 组件挂载后调用 */
  $mounted() {
  }
  /** @abstract 组件销毁前调用 */
  $beforeUnmounted() {
  }
  /** @abstract 组件销毁后调用 */
  $unmounted() {
  }
  /**
   * 
   * @param {Object} data 
   * @param {any} data.key 键
   * @param {any} data.newVal 值
   * @param {any} data.oldVal 旧值
   */
  $updated(e) {
    this.dispatchEvent(new CustomEvent("updated", {
      detail: e,
      bubbles: !1,
      composed: !0
    }));
  }
  connectedCallback() {
    this.adoptedStyle(this.stylesheet), queueMicrotask(() => {
      var e, t;
      (e = this.$beforeMounted) == null || e.call(this), this.dispatchEvent(new CustomEvent("beforeMount", {
        detail: this,
        bubbles: !1,
        composed: !0
      })), (t = this.$mounted) == null || t.call(this), this.dispatchEvent(new CustomEvent("mounted", {
        detail: this,
        bubbles: !1,
        composed: !0
      }));
    });
  }
  disconnectedCallback() {
    var e, t;
    (e = this.$beforeUnmounted) == null || e.call(this), this.dispatchEvent(new CustomEvent("beforeUnmount", {
      detail: this,
      bubbles: !1,
      composed: !0
    })), (t = this.$unmounted) == null || t.call(this), this.dispatchEvent(new CustomEvent("unmounted", {
      detail: this,
      bubbles: !1,
      composed: !0
    })), this.remove(), this.state = null;
  }
  /**
   * 设置属性值，并切换className
   * @param {string} attr 属性名
   * @param {boolean} flag 属性值
   * @param {string} className class名
   */
  toggleAttribute(e, t, i) {
    t ? (this.setAttribute(e, t), i && this.dom.classList.add(i)) : (this.hasAttribute(e) && this.removeAttribute(e), i && this.dom.classList.remove(i));
  }
  /**
   * 设置属性值
   * @param {string} attr 属性名
   * @param {boolean} flag 属性值
   */
  toggleAttr(e, t) {
    t ? this.setAttribute(e, t) : this.removeAttribute(e);
  }
  /**
   * 获取属性值，并转换为布尔值
   * @param {string} attrName 属性名
   * @returns {boolean}
   */
  getAttrBoolean(e) {
    const t = this.getAttribute(e);
    return t === "true" || t === "";
  }
  /**
   * 获取属性值，并转换为数字
   * @param {string} attrName 属性名
   * @returns {number}
   */
  getAttrNumber(e) {
    const t = this.getAttribute(e);
    return t ? Number(t) : 0;
  }
}
export {
  m as B
};
