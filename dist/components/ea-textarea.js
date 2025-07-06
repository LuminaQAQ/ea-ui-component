var b = (s) => {
  throw TypeError(s);
};
var w = (s, r, t) => r.has(s) || b("Cannot " + t);
var i = (s, r, t) => (w(s, r, "read from private field"), t ? t.call(s) : r.get(s)), d = (s, r, t) => r.has(s) ? b("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(s) : r.set(s, t), x = (s, r, t, a) => (w(s, r, "write to private field"), a ? a.call(s, t) : r.set(s, t), t), n = (s, r, t) => (w(s, r, "access private method"), t);
import { B as p } from "./Base.js";
const f = `
.ea-textarea_wrap {
  position: relative;
  width: 100%;
}
.ea-textarea_wrap .ea-textarea_inner {
  box-sizing: border-box;
  box-shadow: none;
  resize: vertical;
  min-height: 1.75rem;
  border: 1px solid #dcdfe6;
  outline: 0;
  transition: border 0.2s;
  border-radius: 3px;
  padding: 0.5rem;
  line-height: 0.8;
  font-size: 0.8rem;
  scrollbar-width: none;
}
.ea-textarea_wrap .ea-textarea_inner:focus {
  border-color: #409eff;
}
.ea-textarea_wrap .ea-textarea_inner::placeholder {
  color: #c0c4cc;
}
.ea-textarea_wrap .ea-textarea_inner:disabled {
  background-color: #eeeeee;
  color: #c0c4cc;
}
.ea-textarea_wrap .ea-textarea_inner:invalid {
  border-color: #f56c6c;
}
.ea-textarea_wrap .ea-input_word-limit {
  position: absolute;
  font-size: 0.75rem;
  bottom: 0.5rem;
  right: 0.5rem;
}
`;
var u, e, h, o, m;
class L extends p {
  constructor() {
    super();
    d(this, h);
    d(this, u);
    d(this, e);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-textarea_wrap" part="container">
                <textarea class="ea-textarea_inner" part="textarea" placeholder="请输入内容"></textarea>
            </div>
        `, x(this, u, t.querySelector(".ea-textarea_wrap")), x(this, e, t.querySelector(".ea-textarea_inner")), this.build(t, f);
  }
  // ------- name 属性 -------
  // #region
  get name() {
    return this.getAttribute("name") || "ea-textarea";
  }
  set name(t) {
    this.setAttribute("name", t);
  }
  // #endregion
  // ------- end -------
  // ------- value 输入框的值 -------
  // #region
  get value() {
    return i(this, e).value;
  }
  set value(t) {
    i(this, e).value = t;
  }
  // #endregion
  // ------- end -------
  // ------- disabled 是否禁用 -------
  // #region
  get disabled() {
    return this.getAttrBoolean("disabled");
  }
  set disabled(t) {
    this.toggleAttr("disabled", t), i(this, e).disabled = t;
  }
  // #endregion
  // ------- end -------
  // ------- placeholder 提示 -------
  // #region
  get placeholder() {
    return this.getAttribute("placeholder") || "";
  }
  set placeholder(t) {
    t && (this.setAttribute("placeholder", t), i(this, e).placeholder = t);
  }
  // #endregion
  // ------- end -------
  // ------- rows 默认行数 -------
  // #region
  get rows() {
    return this.getAttribute("rows") || 2;
  }
  set rows(t) {
    this.setAttribute("rows", t), i(this, e).rows = t;
  }
  // #endregion
  // ------- end -------
  // ------- autosize 自动调整高度 -------
  // #region
  get autosize() {
    return this.getAttrBoolean("autosize");
  }
  set autosize(t) {
    t && (this.setAttribute("autosize", t), i(this, e).addEventListener("input", (a) => {
      if (i(this, e).style.height !== i(this, e).scrollHeight + "px" && (i(this, e).style.height = i(this, e).scrollHeight + "px", i(this, e).style.minHeight = i(this, e).scrollHeight + "px"), a.target.type === "textarea") {
        const l = i(this, e).cols, c = a.target.value.length;
        let g = Math.ceil(c / l) <= Number(i(this, e).rows) ? Number(i(this, e).rows) : Math.ceil(c / l);
        c % l == 1 && (this.minRows > g ? n(this, h, o).call(this, this.minRows) : this.maxRows < g ? n(this, h, o).call(this, this.maxRows) : n(this, h, o).call(this, g));
      }
    }));
  }
  // #endregion
  // ------- end -------
  // ------- min-rows 最小行数 -------
  // #region
  get minRows() {
    const t = this.getAttrNumber("min-rows");
    return t !== 0 && t > 0 ? t : 0;
  }
  set minRows(t) {
    t && (this.setAttribute("min-rows", t), n(this, h, o).call(this, Number(t)));
  }
  // #endregion
  // ------- end -------
  // ------- max-rows 最大行数 -------
  // #region
  get maxRows() {
    const t = Number(this.getAttribute("max-rows"));
    return t !== 0 && t > 0 ? t : 0;
  }
  set maxRows(t) {
    t && (this.setAttribute("max-rows", t), n(this, h, o).call(this, Number(t)));
  }
  // #endregion
  // ------- end -------
  // ------- max-length/min-length 最大/最小字符长度 -------
  // #region
  // 获取最大限制值
  get maxLength() {
    return this.getAttribute("max-length");
  }
  set maxLength(t) {
    t && (this.setAttribute("max-length", t), i(this, e).maxLength = t, this.showWordLimit && (this.showWordLimit = !0));
  }
  // 获取最小限制值
  get minLength() {
    return this.getAttribute("min-length");
  }
  set minLength(t) {
    t && (this.setAttribute("min-length", t), i(this, e).minLength = t);
  }
  // #endregion
  // ------- end -------
  // ------- show-word-limit 显示 当前文字长度 和 限制值 -------
  // #region
  get showWordLimit() {
    return this.getAttrBoolean("show-word-limit");
  }
  set showWordLimit(t) {
    if (!t) return;
    this.setAttribute("show-word-limit", t);
    const a = document.createElement("span");
    a.part = "word-limit", a.className = "ea-input_word-limit", a.innerText = `${i(this, e).value.length}/${this.maxLength}`, i(this, e).addEventListener("input", (l) => {
      a.innerText = `${l.target.value.length}/${this.maxLength}`;
    }), i(this, u).appendChild(a), a.style.left = i(this, e).getBoundingClientRect().width - a.getBoundingClientRect().width - 5 + "px";
  }
  connectedCallback() {
    this.setAttribute("data-ea-component", !0), this.name = this.name, this.placeholder = this.placeholder, this.value = this.value, i(this, e).value = this.getAttribute("value") || "", this.disabled = this.disabled, this.autosize = this.autosize, this.maxRows && (this.maxRows = this.maxRows), this.minRows && (this.minRows = this.minRows), this.rows = this.rows, this.maxLength = this.maxLength, this.minLength = this.minLength, i(this, e).addEventListener("input", (t) => {
      n(this, h, m).call(this, "change", t);
    }), i(this, e).addEventListener("focus", (t) => {
      n(this, h, m).call(this, "focus", t);
    }), i(this, e).addEventListener("blur", (t) => {
      n(this, h, m).call(this, "blur", t);
    });
  }
}
u = new WeakMap(), e = new WeakMap(), h = new WeakSet(), // #endregion
// ------- end -------
o = function(t) {
  t = Number(t), i(this, e).rows = t;
}, m = function(t, a) {
  this.dispatchEvent(
    new CustomEvent(t, {
      detail: {
        value: a.target.value
      }
    })
  );
};
window.customElements.get("ea-textarea") || window.customElements.define("ea-textarea", L);
export {
  L as EaTextarea
};
