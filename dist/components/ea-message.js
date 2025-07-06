var m = (s) => {
  throw TypeError(s);
};
var f = (s, t, e) => t.has(s) || m("Cannot " + e);
var o = (s, t, e) => (f(s, t, "read from private field"), e ? e.call(s) : t.get(s)), l = (s, t, e) => t.has(s) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), h = (s, t, e, n) => (f(s, t, "write to private field"), n ? n.call(s, e) : t.set(s, e), e);
import { B as u } from "./Base.js";
import "./index3.js";
class w {
  /**
   * 处理字符串型消息
   * @param {Element} el EaMessage元素
   * @param {String} tip 文本
   */
  handleStringMsg(t, e) {
    t.text = e, t.type = "info", t.hasClose = !1;
  }
  /**
   * 处理对象型消息
   * @param {Element} el EaMessage元素
   * @param {String} tips 文本
   * @param {*} attrs 属性列表
   */
  handleObjectMsg(t, e, n) {
    for (const i in e)
      n.includes(i) && (t[i] = e[i]);
    Object.keys(e).includes("type") || (t.type = "info");
  }
  /**
   * 处理消失的时长
   * @param {*} el EaMessage元素
   * @param {*} duration 时间间隔
   */
  handleDuration(t, e = 3) {
    if (e === 0) return;
    let n = setTimeout(() => {
      t.show = !1, clearTimeout(n), n = null;
    }, e * 1e3 + 40);
  }
  open(t) {
    const e = document.createElement("ea-message");
    if (document.body.appendChild(e), typeof t == "string")
      this.handleStringMsg(e, t), this.handleDuration(e);
    else if (typeof t == "object")
      this.handleObjectMsg(e, t, e.attrs), this.handleDuration(e, t.duration);
    else throw new Error("[EaMessage] TypeError");
    return e.show = !0, {
      onClose(n) {
        typeof n == "function" && e.addEventListener("click", function() {
          n();
        });
      }
    };
  }
}
const y = `
.ea-message_wrap {
  position: fixed;
  left: 50%;
  z-index: 999;
  display: flex;
  align-items: center;
  padding: 15px 15px 15px 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  top: -100%;
  transform-origin: center;
  opacity: 0;
  transform: translate(-50%, 0);
  min-width: 380px;
  overflow: hidden;
  background-color: black;
  transition: opacity 0.3s, top 0.3s;
}
.ea-message_wrap .ea-icon-wrap {
  margin-right: 0.5rem;
  line-height: 1;
}
.ea-message_wrap .ea-text-content {
  line-height: 1;
  margin-right: auto;
  vertical-align: middle;
}
.ea-message_wrap .ea-close-icon {
  margin-left: auto;
}
.ea-message_wrap.ea-message--success {
  background-color: #f0f9eb;
  color: #67c23a;
}
.ea-message_wrap.ea-message--info {
  background-color: #f4f4f5;
  color: #909399;
}
.ea-message_wrap.ea-message--warning {
  background-color: #fdf6ec;
  color: #e6a23c;
}
.ea-message_wrap.ea-message--error {
  background-color: #fef0f0;
  color: #f56c6c;
}
`;
var a, c, g, r;
class b extends u {
  constructor() {
    super();
    l(this, a);
    l(this, c);
    l(this, g);
    l(this, r);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class="ea-message_wrap" part="container">
                <ea-icon class="ea-icon-wrap" part="icon"></ea-icon>
                <div class="ea-text-content" part="content-wrap"></div>
                <ea-icon class="ea-close-icon" icon="icon-cancel"></ea-icon>
            </div>
        `, h(this, a, e.querySelector(".ea-message_wrap")), this.wrap = o(this, a), h(this, c, e.querySelector(".ea-icon-wrap")), h(this, g, e.querySelector(".ea-text-content")), h(this, r, e.querySelector(".ea-close-icon")), this.closeWrap = o(this, r), this.build(e, y);
  }
  get attrs() {
    return ["show", "text", "icon", "type", "showClose", "center"];
  }
  get iconList() {
    return {
      success: "icon-ok-circled",
      error: "icon-cancel-circled",
      warning: "icon-attention-alt",
      info: "icon-info"
    };
  }
  // ------- show 提示框的显示状态 -------
  // #region
  get show() {
    return this.getAttrBoolean("show");
  }
  set show(e) {
    this.setAttribute("show", e);
    const n = document.querySelectorAll("ea-message");
    if (e) {
      const i = n.length - 1, d = o(this, a).getBoundingClientRect().height;
      let p = i <= 0 ? 10 : (i + 1) * 10;
      o(this, a).style.top = `${i * d + p}px`, o(this, a).style.opacity = 1;
    } else {
      o(this, a).style.top = "-100%", o(this, a).style.opacity = 0;
      let i = o(this, a).addEventListener("transitionend", () => {
        this.removeEventListener("transitionend", i), this.remove();
      });
    }
  }
  // #endregion
  // ------- end -------
  // ------- text 提示框的文字 -------
  // #region
  get text() {
    return this.getAttribute("text");
  }
  set text(e) {
    e && (this.setAttribute("text", e), o(this, g).innerText = e);
  }
  // #endregion
  // ------- end -------
  // ------- type 提示框的类型 -------
  // #region
  get type() {
    return this.getAttribute("type") || "info";
  }
  set type(e) {
    this.setAttribute("type", e), o(this, a).classList.add(`ea-message--${e}`), o(this, c).icon = this.iconList[e];
  }
  // #endregion
  // ------- end -------
  // ------- showClose 提示框的关闭按钮 -------
  // #region
  get showClose() {
    return this.getAttrBoolean("showClose") || !1;
  }
  set showClose(e) {
    e && (this.setAttribute("showClose", e), o(this, r).style.display = e ? "block" : "none");
  }
  // #endregion
  // ------- end -------
  // ------- center 提示框是否居中 -------
  // #region
  get center() {
    return this.getAttrBoolean("center") || !1;
  }
  set center(e) {
    e && (this.setAttribute("center", e), o(this, c).style.marginLeft = e ? "auto" : "0");
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    o(this, r).addEventListener("click", () => {
      this.show = !1;
    });
  }
  disconnectedCallback() {
    const e = document.querySelectorAll("ea-message");
    e.length > 0 && Array.from(e).forEach((i, d) => {
      const p = i.wrap.getBoundingClientRect().height;
      i.wrap.style.top = `${d * p + d * 10}px`;
    });
  }
}
a = new WeakMap(), c = new WeakMap(), g = new WeakMap(), r = new WeakMap();
customElements.get("ea-message") || customElements.define("ea-message", b);
window.$message = new w();
export {
  b as EaMessageElement
};
