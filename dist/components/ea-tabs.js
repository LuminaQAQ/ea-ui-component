var L = (s) => {
  throw TypeError(s);
};
var S = (s, i, t) => i.has(s) || L("Cannot " + t);
var d = (s, i, t) => (S(s, i, "read from private field"), t ? t.call(s) : i.get(s)), c = (s, i, t) => i.has(s) ? L("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(s) : i.set(s, t), b = (s, i, t, e) => (S(s, i, "write to private field"), e ? e.call(s, t) : i.set(s, t), t), n = (s, i, t) => (S(s, i, "access private method"), t);
import { B as C } from "./Base.js";
import "./index3.js";
import "./ea-tab.js";
import "./ea-pane.js";
import { t as k } from "./timeout.js";
const I = `
.ea-tabs_wrap {
  position: relative;
}
.ea-tabs_wrap .ea-tabs_tab-wrap {
  display: flex;
  align-items: center;
  overflow-x: auto;
  scrollbar-width: thin;
}
.ea-tabs_wrap .ea-tabs_pane-wrap {
  padding: 20px;
}
.ea-tabs_wrap .ea-tabs_tab-bottom-bar {
  position: absolute;
  height: 2px;
  width: 0;
  top: 40px;
  left: 0;
  border-radius: 999px;
  background-color: #409eff;
  transition: left 0.3s;
}
.ea-tabs_wrap.ea-tabs_wrap--normal .ea-tabs_tab-wrap {
  border-bottom: 2px solid #e4e7ed;
}
.ea-tabs_wrap.ea-tabs_wrap--card .ea-tabs_tab-wrap {
  border-bottom: 1px solid #e4e7ed;
}
.ea-tabs_wrap.ea-tabs_wrap--card .ea-tabs_tab-bottom-bar {
  height: 1px;
  bottom: -1px;
  background-color: white;
}
.ea-tabs_wrap.ea-tabs_wrap--border-card {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.ea-tabs_wrap.ea-tabs_wrap--border-card .ea-tabs_tab-wrap {
  background-color: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}
.ea-tabs_wrap.ea-tabs_wrap--border-card .ea-tabs_tab-bottom-bar {
  height: 1px;
  bottom: -1px;
  background-color: white;
}
`;
var w, h, g, p, u, a, A, y, E, q, B, N;
class T extends C {
  constructor() {
    super();
    c(this, a);
    c(this, w);
    c(this, h);
    c(this, g);
    c(this, p);
    c(this, u, 0);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-tabs_wrap" part="container">
                <div class="ea-tabs_tab-wrap" part="tab-wrap">
                    <slot></slot>
                </div>
                <div class="ea-tabs_tab-bottom-bar" part="tab-bottom-bar"></div>
                <div class="ea-tabs_pane-wrap" part="pane-wrap">
                    <slot name="pane"></slot>
                </div>
            </div>
        `, b(this, w, t.querySelector(".ea-tabs_wrap")), b(this, h, t.querySelector(".ea-tabs_tab-bottom-bar")), b(this, g, t.querySelector(".ea-tabs_pane-wrap")), b(this, p, t.querySelector(".ea-tabs_tab-wrap > slot")), this.build(t, I);
  }
  // ------- type 标签样式类型 -------
  // #region
  get type() {
    return this.getAttribute("type") || "normal";
  }
  set type(t) {
    this.setAttribute("type", t), d(this, w).classList.add("ea-tabs_wrap--" + t);
    const e = this.querySelectorAll("ea-tab");
    e.forEach((l) => {
      l.type = t;
    }), t !== "border-card" && (e[0].handleBorderRadius("--border-radius-top-left"), e[e.length - 1].handleBorderRadius("--border-radius-top-right"), e[e.length - 1].handleBorderRightWidth());
  }
  // #endregion
  // ------- end -------
  // ------- actived 标签是否被选中 -------
  // #region
  get actived() {
    return this.getAttribute("actived") || this.querySelectorAll("ea-tab")[0].name || 0;
  }
  set actived(t) {
    this.setAttribute("actived", t), this.querySelectorAll("ea-tab").forEach((e, l) => {
      e.actived = e.name === t;
    });
  }
  // #endregion
  // ------- end -------
  // ------- editable 标签是否可编辑 -------
  // #region
  get editable() {
    return this.getAttrBoolean("editable") || !1;
  }
  set editable(t) {
    this.setAttribute("editable", t), n(this, a, B).call(this, t);
  }
  connectedCallback() {
    this.type = this.type, this.actived = this.actived, this.editable = this.editable, n(this, a, E).call(this), n(this, a, y).call(this), n(this, a, N).call(this);
  }
}
w = new WeakMap(), h = new WeakMap(), g = new WeakMap(), p = new WeakMap(), u = new WeakMap(), a = new WeakSet(), // #endregion
// ------- end -------
A = function(t) {
  const e = this.querySelectorAll("ea-tab"), l = this.querySelectorAll("ea-pane"), { width: r, height: o } = t.getBoundingClientRect(), f = Array.from(e).reduce((m, x, R) => R <= t.index ? m + x.offsetWidth : m, 0), _ = (m, x) => {
    m.actived = !1, m.index = x;
  };
  e.forEach(_), l.forEach(_), t.actived = !0, this.querySelector(`ea-pane[name="${t.name}"]`).actived = !0, d(this, h).style.left = f - r + "px", d(this, h).style.width = r + "px", d(this, h).style.top = o + "px";
}, y = function() {
  const t = this.querySelectorAll("ea-tab"), e = this.querySelectorAll("ea-pane"), l = (r) => {
    n(this, a, A).call(this, r.detail.event), this.actived = r.detail.name, r.detail.event.actived = !0;
  };
  t.forEach((r, o) => {
    r.index = o, r.name || (r.name = o), r.removeEventListener("tab-click", l), r.addEventListener("tab-click", l);
  }), e.forEach((r, o) => {
    r.index = o, r.name || (r.name = o);
  });
}, E = function() {
  k(() => {
    const t = this.querySelector('ea-tab[name="' + this.actived + '"]');
    t.actived = !0, n(this, a, A).call(this, t);
  }, 20);
}, q = function(t) {
  var f;
  t.stopPropagation();
  const e = this.querySelectorAll("ea-tab"), { name: l, event: r, index: o } = t.detail;
  let v = o;
  e[o + 1] ? v = o + 1 : e[o - 1] && (v = o - 1);
  try {
    this.actived = (f = e[v]) == null ? void 0 : f.name, r.remove(), this.querySelector(`ea-pane[name="${l}"]`).remove(), e.length <= 1 ? d(this, h).style.width = 0 : (n(this, a, E).call(this), n(this, a, y).call(this));
  } catch {
  }
}, B = function(t) {
  this.querySelectorAll("ea-tab").forEach((e) => {
    e.editable = t;
  }), this.removeEventListener("tab-close", n(this, a, q)), this.addEventListener("tab-close", n(this, a, q));
}, N = function() {
  k(() => {
    b(this, u, d(this, p).assignedNodes().length), d(this, p).addEventListener("slotchange", (t) => {
      const e = t.target.assignedNodes().length;
      e >= d(this, u) ? (n(this, a, y).call(this), n(this, a, B).call(this, this.editable), this.type = this.type, b(this, u, e), this.dispatchEvent(new CustomEvent("tab-add", {
        detail: {
          event: t,
          tabs: this.querySelectorAll("ea-tab"),
          panes: this.querySelectorAll("ea-pane")
        },
        bubbles: !0,
        composed: !0
      }))) : b(this, u, d(this, p).assignedNodes().length);
    });
  }, 20);
};
customElements.get("ea-tabs") || customElements.define("ea-tabs", T);
export {
  T as EaTabs
};
