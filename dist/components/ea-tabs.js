var L = (s, r, t) => {
  if (!r.has(s))
    throw TypeError("Cannot " + t);
};
var d = (s, r, t) => (L(s, r, "read from private field"), t ? t.call(s) : r.get(s)), n = (s, r, t) => {
  if (r.has(s))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(s) : r.set(s, t);
}, b = (s, r, t, e) => (L(s, r, "write to private field"), e ? e.call(s, t) : r.set(s, t), t);
var o = (s, r, t) => (L(s, r, "access private method"), t);
import { B as W } from "./Base.js";
import "./index3.js";
import "./ea-tab.js";
import "./ea-pane.js";
import { t as I } from "./timeout.js";
const $ = `
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
var w, h, A, c, p, v, k, u, S, f, N, y, R, g, C, E, T;
class H extends W {
  constructor() {
    super();
    // #endregion
    // ------- end -------
    n(this, v);
    n(this, u);
    n(this, f);
    n(this, y);
    n(this, g);
    n(this, E);
    n(this, w, void 0);
    n(this, h, void 0);
    n(this, A, void 0);
    n(this, c, void 0);
    n(this, p, 0);
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
        `, b(this, w, t.querySelector(".ea-tabs_wrap")), b(this, h, t.querySelector(".ea-tabs_tab-bottom-bar")), b(this, A, t.querySelector(".ea-tabs_pane-wrap")), b(this, c, t.querySelector(".ea-tabs_tab-wrap > slot")), this.build(t, $);
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
    this.setAttribute("editable", t), o(this, g, C).call(this, t);
  }
  connectedCallback() {
    this.type = this.type, this.actived = this.actived, this.editable = this.editable, o(this, f, N).call(this), o(this, u, S).call(this), o(this, E, T).call(this);
  }
}
w = new WeakMap(), h = new WeakMap(), A = new WeakMap(), c = new WeakMap(), p = new WeakMap(), v = new WeakSet(), k = function(t) {
  const e = this.querySelectorAll("ea-tab"), l = this.querySelectorAll("ea-pane"), { width: a, height: i } = t.getBoundingClientRect(), x = Array.from(e).reduce((m, B, M) => M <= t.index ? m + B.offsetWidth : m, 0), q = (m, B) => {
    m.actived = !1, m.index = B;
  };
  e.forEach(q), l.forEach(q), t.actived = !0, this.querySelector(`ea-pane[name="${t.name}"]`).actived = !0, d(this, h).style.left = x - a + "px", d(this, h).style.width = a + "px", d(this, h).style.top = i + "px";
}, u = new WeakSet(), S = function() {
  const t = this.querySelectorAll("ea-tab"), e = this.querySelectorAll("ea-pane"), l = (a) => {
    o(this, v, k).call(this, a.detail.event), this.actived = a.detail.name, a.detail.event.actived = !0;
  };
  t.forEach((a, i) => {
    a.index = i, a.name || (a.name = i), a.removeEventListener("tab-click", l), a.addEventListener("tab-click", l);
  }), e.forEach((a, i) => {
    a.index = i, a.name || (a.name = i);
  });
}, f = new WeakSet(), N = function() {
  I(() => {
    const t = this.querySelector('ea-tab[name="' + this.actived + '"]');
    t.actived = !0, o(this, v, k).call(this, t);
  }, 20);
}, y = new WeakSet(), R = function(t) {
  var x;
  t.stopPropagation();
  const e = this.querySelectorAll("ea-tab"), { name: l, event: a, index: i } = t.detail;
  let _ = i;
  e[i + 1] ? _ = i + 1 : e[i - 1] && (_ = i - 1);
  try {
    this.actived = (x = e[_]) == null ? void 0 : x.name, a.remove(), this.querySelector(`ea-pane[name="${l}"]`).remove(), e.length <= 1 ? d(this, h).style.width = 0 : (o(this, f, N).call(this), o(this, u, S).call(this));
  } catch {
  }
}, g = new WeakSet(), C = function(t) {
  this.querySelectorAll("ea-tab").forEach((e) => {
    e.editable = t;
  }), this.removeEventListener("tab-close", o(this, y, R)), this.addEventListener("tab-close", o(this, y, R));
}, E = new WeakSet(), T = function() {
  I(() => {
    b(this, p, d(this, c).assignedNodes().length), d(this, c).addEventListener("slotchange", (t) => {
      const e = t.target.assignedNodes().length;
      e >= d(this, p) ? (o(this, u, S).call(this), o(this, g, C).call(this, this.editable), this.type = this.type, b(this, p, e), this.dispatchEvent(new CustomEvent("tab-add", {
        detail: {
          event: t,
          tabs: this.querySelectorAll("ea-tab"),
          panes: this.querySelectorAll("ea-pane")
        },
        bubbles: !0,
        composed: !0
      }))) : b(this, p, d(this, c).assignedNodes().length);
    });
  }, 20);
};
customElements.get("ea-tabs") || customElements.define("ea-tabs", H);
export {
  H as EaTabs
};
