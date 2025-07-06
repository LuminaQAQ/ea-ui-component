var x = (i) => {
  throw TypeError(i);
};
var g = (i, e, t) => e.has(i) || x("Cannot " + t);
var a = (i, e, t) => (g(i, e, "read from private field"), t ? t.call(i) : e.get(i)), n = (i, e, t) => e.has(i) ? x("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), h = (i, e, t, s) => (g(i, e, "write to private field"), s ? s.call(i, t) : e.set(i, t), t), o = (i, e, t) => (g(i, e, "access private method"), t);
import { B as E } from "./Base.js";
import "./index3.js";
import { c as f } from "./createElement.js";
const T = (i) => {
  const e = f("span", "ea-rate_item");
  e.index = i, e.part = "rate-item";
  const t = f("ea-icon");
  return t.icon = "icon-star-empty", e.appendChild(t), e;
}, A = (i) => {
  for (let e = 0; e < 5; e++)
    i.appendChild(T(e));
}, y = `
:host {
  --i-color: rgb(247, 186, 42);
}
.ea-rate_wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.ea-rate_wrap .ea-rate_item {
  cursor: pointer;
}
.ea-rate_wrap .ea-rate_item ea-icon::part(container) {
  color: var(--i-color);
  transition: color 0.3s, font-size 0.1s;
}
.ea-rate_wrap .ea-rate_item.active ea-icon::part(container) {
  font-size: 1.1rem;
}
.ea-rate_wrap .ea-rate_item.disabled {
  pointer-events: none;
  cursor: not-allowed;
}
.ea-rate_wrap .ea-rate_text {
  margin-left: 0.25rem;
  min-width: 2rem;
  font-size: 0.8rem;
  line-height: 0.8;
  vertical-align: middle;
}
.ea-rate_wrap .ea-rate_score {
  position: absolute;
  left: 0;
  top: 0;
}
.ea-rate_wrap .ea-rate_score .ea-rate_score_item {
  width: 24px;
  height: 24px;
}
.ea-rate_wrap .ea-rate_score .ea-rate_score_item > i {
  color: #c0c4cc;
  font-size: 1rem;
  line-height: 1;
}
`;
var m, p, u, c, l, d, r, _, w, v, b;
class C extends E {
  constructor() {
    super();
    n(this, r);
    n(this, m);
    n(this, p);
    n(this, u);
    n(this, c);
    n(this, l);
    n(this, d, ["极差", "失望", "一般", "满意", "惊喜"]);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-rate_wrap" part="container">
                <section class="ea-rate_item-wrap" part="item-wrap">
                </section>
                <span class="ea-rate_text" part="text-wrap"></span>
            </div>
        `, h(this, m, t.querySelector(".ea-rate_wrap")), h(this, p, t.querySelector(".ea-rate_item-wrap")), h(this, u, t.querySelector(".ea-rate_text")), A(a(this, p)), h(this, c, t.querySelectorAll(".ea-rate_item")), h(this, l, t.querySelectorAll("ea-icon")), this.build(t, y);
  }
  // ------- value rate值 -------
  // #region
  get value() {
    const t = this.getAttrNumber("value") || 0;
    return t < 1 || t > 5 || !t ? 0 : t;
  }
  set value(t) {
    !t || isNaN(Number(t)) || (this.setAttribute("value", t), o(this, r, v).call(this), o(this, r, w).call(this, t));
  }
  // #endregion
  // ------- end -------
  // ------- color 图标颜色 -------
  // #region
  get color() {
    return this.getAttribute("color");
  }
  set color(t) {
    t && (this.setAttribute("color", t), a(this, p).style.setProperty("--i-color", t));
  }
  // #endregion
  // ------- end -------
  // ------- disabled 禁用 -------
  // #region
  get disabled() {
    return this.getAttrBoolean("disabled");
  }
  set disabled(t) {
    this.toggleAttr("disabled", t), a(this, c).forEach((s) => {
      s.classList.toggle("disabled", t);
    }), a(this, m).style.cursor = t ? "not-allowed" : "pointer";
  }
  // #endregion
  // ------- end -------
  // ------- show-text 显示文本 -------
  // #region
  get showText() {
    return this.getAttrBoolean("show-text");
  }
  set showText(t) {
    this.toggleAttr("show-text", t);
  }
  get showTextList() {
    return a(this, d);
  }
  set showTextList(t) {
    typeof t == "object" && t.length === 5 && h(this, d, t);
  }
  // #endregion
  // ------- end -------
  // ------- void-icon 未选中时展示的图标 -------
  // #region
  get voidIcon() {
    return this.getAttribute("void-icon") || "icon-star-empty";
  }
  set voidIcon(t) {
    this.setAttribute("void-icon", t), o(this, r, _).call(this, t);
  }
  // #endregion
  // ------- end -------
  // ------- active-icon 选中时展示的图标 -------
  // #region
  get activeIcon() {
    return this.getAttribute("active-icon") || "icon-star";
  }
  set activeIcon(t) {
    this.setAttribute("active-icon", t), o(this, r, _).call(this, t);
  }
  connectedCallback() {
    this.activeIconClass = this.activeIconClass, this.voidIconClass = this.voidIconClass, this.showText = this.showText, this.color = this.color, this.value = this.value, this.disabled = this.disabled, this.disabled || o(this, r, b).call(this);
  }
}
m = new WeakMap(), p = new WeakMap(), u = new WeakMap(), c = new WeakMap(), l = new WeakMap(), d = new WeakMap(), r = new WeakSet(), // #endregion
// ------- end -------
// 处理图标
_ = function(t) {
  a(this, l).forEach((s) => {
    s.icon = t;
  });
}, // 设置/显示选中状态
w = function(t) {
  for (let s = 0; s < t; s++)
    a(this, c)[s].classList.add("active"), a(this, l)[s].icon = this.activeIcon, this.showText && (a(this, u).innerText = this.showTextList[t - 1]);
}, // 当未选中时, 清除选中状态
v = function() {
  a(this, c).forEach((t, s) => {
    t.classList.remove("active"), a(this, l)[s].icon = this.voidIcon, this.showText && (a(this, u).innerText = "");
  });
}, // 初始化鼠标事件
b = function() {
  a(this, c).forEach((t) => {
    const { index: s } = t;
    t.addEventListener("mouseenter", () => {
      o(this, r, v).call(this), o(this, r, w).call(this, s + 1), this.dispatchEvent(new CustomEvent("hover", {
        detail: {
          value: s + 1,
          rateText: a(this, d)[s]
        }
      }));
    }), t.addEventListener("mouseleave", () => {
      o(this, r, v).call(this), o(this, r, w).call(this, this.value);
    }), t.addEventListener("click", () => {
      this.value = s + 1, this.dispatchEvent(new CustomEvent("change", {
        detail: {
          value: s + 1,
          rateText: a(this, d)[s]
        }
      }));
    });
  });
};
customElements.get("ea-rate") || customElements.define("ea-rate", C);
export {
  C as EaRate
};
