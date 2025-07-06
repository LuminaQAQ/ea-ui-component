var u = (t) => {
  throw TypeError(t);
};
var f = (t, a, e) => a.has(t) || u("Cannot " + e);
var r = (t, a, e) => (f(t, a, "read from private field"), e ? e.call(t) : a.get(t)), c = (t, a, e) => a.has(t) ? u("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, e), n = (t, a, e, d) => (f(t, a, "write to private field"), d ? d.call(t, e) : a.set(t, e), e), p = (t, a, e) => (f(t, a, "access private method"), e);
import { B as m } from "./Base.js";
import "./index3.js";
import { h as x } from "./handleDefaultAttrIsTrue.js";
import { c as g } from "./createElement.js";
const y = `
.ea-alert_wrap {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 20px 0 0;
  display: flex;
  align-items: center;
  width: 100%;
  opacity: 1;
  transition: opacity 0.2s;
}
.ea-alert_wrap .ea-alert_content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ea-alert_wrap .ea-alert_content .ea-alert_title {
  display: flex;
  align-items: center;
}
.ea-alert_wrap .ea-alert_content .ea-alert_title i {
  margin-right: 0.5rem;
}
.ea-alert_wrap .ea-alert_content .ea-alert_close-icon {
  color: #c0c4cc;
  cursor: pointer;
}
.ea-alert_wrap .ea-alert_content.ea-alert--center .ea-alert_title,
.ea-alert_wrap .ea-alert_content.ea-alert--center .ea-alert_close-icon {
  margin-left: auto;
}
.ea-alert_wrap .ea-alert_description {
  width: 100%;
  margin: 5px 0 0;
  font-size: 12px;
}
.ea-alert_wrap.ea-alert--success {
  background-color: #f0f9eb;
  color: #67c23a;
}
.ea-alert_wrap.ea-alert--success.ea-alert--dark {
  color: #fff;
  background-color: #67c23a;
}
.ea-alert_wrap.ea-alert--success.ea-alert--dark .ea-alert_close-icon {
  color: #fff;
}
.ea-alert_wrap.ea-alert--info {
  background-color: #f4f4f5;
  color: #909399;
}
.ea-alert_wrap.ea-alert--info.ea-alert--dark {
  color: #fff;
  background-color: #909399;
}
.ea-alert_wrap.ea-alert--info.ea-alert--dark .ea-alert_close-icon {
  color: #fff;
}
.ea-alert_wrap.ea-alert--warning {
  background-color: #fdf6ec;
  color: #e6a23c;
}
.ea-alert_wrap.ea-alert--warning.ea-alert--dark {
  color: #fff;
  background-color: #e6a23c;
}
.ea-alert_wrap.ea-alert--warning.ea-alert--dark .ea-alert_close-icon {
  color: #fff;
}
.ea-alert_wrap.ea-alert--error {
  background-color: #fef0f0;
  color: #f56c6c;
}
.ea-alert_wrap.ea-alert--error.ea-alert--dark {
  color: #fff;
  background-color: #f56c6c;
}
.ea-alert_wrap.ea-alert--error.ea-alert--dark .ea-alert_close-icon {
  color: #fff;
}
`;
var i, h, o, s, l, _, w, b;
class k extends m {
  constructor() {
    super();
    c(this, l);
    c(this, i);
    c(this, h);
    c(this, o);
    c(this, s);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
      <div class='ea-alert_wrap' part='container'>
        <div class="ea-alert_content" part='content-wrap'>
          <span class="ea-alert_title" part='title'></span>
          <ea-icon class="ea-alert_close-icon" part='icon'></ea-icon>
        </div>
      </div>
    `, n(this, i, e.querySelector(".ea-alert_wrap")), n(this, h, e.querySelector(".ea-alert_content")), n(this, o, e.querySelector(".ea-alert_title")), n(this, s, e.querySelector(".ea-alert_close-icon")), this.build(e, y);
  }
  // ------- type 获取提示类型 -------
  // #region
  get type() {
    return this.getAttribute("type") || "info";
  }
  set type(e) {
    this.setAttribute("type", e), r(this, i).classList.add(`ea-alert--${e}`);
  }
  // #endregion
  // ------- end -------
  // ------- title 获取提示标题 -------
  // #region
  get title() {
    return this.getAttribute("title") || "";
  }
  set title(e) {
    this.setAttribute("title", e), r(this, o).innerText = e;
  }
  // #endregion
  // ------- end -------
  // ------- closable 是否可关闭 -------
  // #region
  get closable() {
    return x("closable");
  }
  set closable(e) {
    this.setAttribute("closable", e), r(this, s).style.display = e ? "block" : "none";
  }
  // #endregion
  // ------- end -------
  // ------- close-text 关闭按钮文字 -------
  // #region
  get closeText() {
    return this.getAttribute("close-text") || "";
  }
  set closeText(e) {
    this.setAttribute("close-text", e);
  }
  // #endregion
  // ------- end -------
  // ------- effect 亮色与暗色主题 -------
  // #region
  get effect() {
    return this.getAttribute("effect") || "light";
  }
  set effect(e) {
    this.setAttribute("effect", e), r(this, i).classList.toggle("ea-alert--dark", e === "dark");
  }
  // #endregion
  // ------- end -------
  // ------- show-icon 是否显示图标 -------
  // #region
  get showIcon() {
    return this.getAttrBoolean("show-icon") || !1;
  }
  set showIcon(e) {
    this.setAttribute("show-icon", e);
  }
  // #endregion
  // ------- end -------
  // ------- center 是否居中 -------
  // #region
  get center() {
    return this.getAttrBoolean("center") || !1;
  }
  set center(e) {
    this.setAttribute("center", e), r(this, h).classList.toggle("ea-alert--center", e);
  }
  // #endregion
  // ------- end -------
  // ------- description 提示描述 -------
  // #region
  get description() {
    return this.getAttribute("description") || "";
  }
  set description(e) {
    this.setAttribute("description", e);
  }
  get iconList() {
    return {
      success: "ok-circled",
      info: "info",
      warning: "attention-alt",
      error: "cancel-circled"
    };
  }
  connectedCallback() {
    this.type = this.type, this.title = this.title, this.closable = this.closable, this.closeText = this.closeText, this.effect = this.effect, this.center = this.center, p(this, l, _).call(this), p(this, l, w).call(this), p(this, l, b).call(this);
  }
}
i = new WeakMap(), h = new WeakMap(), o = new WeakMap(), s = new WeakMap(), l = new WeakSet(), // #endregion
// ------- end -------
_ = function() {
  this.closable && (this.closable === !0 && this.closeText === "" ? r(this, s).icon = "icon-cancel" : r(this, s).innerText = this.closeText, r(this, s).addEventListener("click", () => {
    r(this, i).style.opacity = 0, this.dispatchEvent(new CustomEvent("close", { detail: { target: r(this, s) } }));
  }), r(this, i).addEventListener("transitionend", () => {
    this.remove();
  }));
}, w = function() {
  if (!this.showIcon) return;
  const e = g("ea-icon");
  e.icon = `icon-${this.iconList[this.type]}`, e.classList.add(`ea-alert--${this.type}`), r(this, o).insertBefore(e, r(this, o).firstChild);
}, b = function() {
  if (!this.description) return;
  const e = g("p", "ea-alert_description");
  e.part = "description", r(this, i).style.flexDirection = "column", e.innerText = this.description, r(this, i).appendChild(e);
};
customElements.get("ea-alert") || customElements.define("ea-alert", k);
export {
  k as EaAlert
};
