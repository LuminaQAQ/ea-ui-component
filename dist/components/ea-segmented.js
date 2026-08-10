import { E as w } from "../core/EaBase.ts.js";
import { a as h, C as z, q as E, p as g, l as y } from "../core/decorator.js";
import { h as u } from "../utils/h.ts.js";
import { h as P } from "../utils/html.ts.js";
import { E as A } from "../utils/Enum.ts.js";
import { s as S } from "../css/ea-segmented.style.js";
import { c as T } from "../utils/bem.ts.js";
class b extends Event {
  constructor(i) {
    super("change", {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }), this.detail = i;
  }
}
var I = Object.defineProperty, O = Object.getOwnPropertyDescriptor, o = (e, i, s, r) => {
  for (var t = r > 1 ? void 0 : r ? O(i, s) : i, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (t = (r ? l(i, s, t) : l(t)) || t);
  return r && t && I(i, s, t), t;
};
const v = "ea-segmented", c = T(v);
let k = 0, n = class extends w {
  constructor() {
    super(...arguments), this.options = [], this.propsConfiguration = {
      label: "label",
      value: "value",
      disabled: "disabled"
    }, this.value = "", this.size = "", this.direction = "", this.disabled = !1, this.block = !1, this.name = "";
  }
  updateContainerClasslist() {
    const e = c(
      { [this.size]: !!this.size },
      { [this.direction]: !!this.direction, block: this.block }
    );
    return this._container && (this._container.className = e), e;
  }
  html() {
    return `
      <div class='${c()}' part='container'></div>
    `;
  }
  /** 获取非禁用的选项列表 */
  _getEnabledItems() {
    return this._container ? Array.from(
      this._container.querySelectorAll(".ea-segmented__item")
    ).filter((e) => !e.hasAttribute("aria-disabled")) : [];
  }
  /** 更新 aria-activedescendant 指向当前选中项 */
  _updateActiveDescendant() {
    var s;
    if (!this._container) return;
    const e = this._container.querySelectorAll(".ea-segmented__item"), i = Array.from(e).find(
      (r) => r.getAttribute("aria-checked") === "true"
    );
    i != null && i.id ? this.setAttribute("aria-activedescendant", i.id) : (s = e[0]) != null && s.id && this.setAttribute("aria-activedescendant", e[0].id);
  }
  /** 渲染选项列表 */
  _renderOptions(e) {
    if (!this._container) return;
    const i = this.propsConfiguration, s = e.map((t) => {
      const a = typeof t == "string", l = a ? t : t[i.label], d = a ? t : t[i.value], p = a ? this.disabled : t[i.disabled] || this.disabled, f = a ? this.value === t : t.checked || this.value === t[i.value], C = [
        c.e("item"),
        p ? "is-disabled" : "",
        f ? "is-checked" : ""
      ].filter(Boolean).join(" "), m = {
        part: "input",
        type: "radio",
        name: this.name,
        id: l || d,
        value: d
      };
      p && (m.disabled = !0), f && (m.checked = !0);
      const _ = {
        part: "item",
        for: l || d,
        id: `${v}-item-${++k}`,
        role: "radio",
        "aria-checked": String(f)
      };
      return p && (_["aria-disabled"] = "true"), u(
        "label",
        C,
        _,
        [
          u("input", c.e("original"), m, ""),
          u(
            "span",
            c.e("label"),
            {
              part: "label"
            },
            l || d
          )
        ]
      );
    }).join(""), r = u(
      "span",
      c.e("indicator"),
      { part: "indicator" },
      null
    );
    this._container.innerHTML = P(
      [s, r].join("")
    ), this._updateIndicatorPosition(this.value), this._updateActiveDescendant();
  }
  _handleChange(e) {
    e.stopPropagation();
    const i = e.target.value;
    this.value = i, this.dispatchEvent(new b({ value: i }));
  }
  _handleKeydown(e) {
    if (this.disabled) return;
    const i = this._getEnabledItems();
    if (!i.length) return;
    const s = i.findIndex(
      (t) => t.getAttribute("aria-checked") === "true"
    );
    let r = s;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault(), r = s < i.length - 1 ? s + 1 : 0;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault(), r = s > 0 ? s - 1 : i.length - 1;
        break;
      case " ":
        if (e.preventDefault(), s < 0 && i[0]) {
          const t = i[0].querySelector(
            ".ea-segmented__original"
          );
          t && (this.value = t.value, this.dispatchEvent(
            new b({ value: t.value })
          ));
        }
        return;
      default:
        return;
    }
    if (r !== s && i[r]) {
      const t = i[r].querySelector(
        ".ea-segmented__original"
      );
      t && (this.value = t.value, this.dispatchEvent(
        new b({ value: t.value })
      ));
    }
  }
  /**
   * 更新选中指示器位置
   * @param value 当前选中值
   */
  _updateIndicatorPosition(e = this.value) {
    this._container && requestAnimationFrame(() => {
      var i, s;
      this._container && ((i = this.options) != null && i.includes(e) || (s = this.options) != null && s.some(
        (r) => r[this.propsConfiguration.value] === e
      )) && [
        ...this._container.querySelectorAll(".ea-segmented__item")
      ].forEach((t) => {
        const a = t.querySelector(
          ".ea-segmented__original"
        ), l = (a == null ? void 0 : a.value) === e;
        if (t.classList.toggle("is-checked", l), t.setAttribute("aria-checked", String(l)), (a == null ? void 0 : a.value) === e) {
          const d = t.getBoundingClientRect();
          this.style.setProperty(
            "--ea-segmented-indicator-width",
            `${d.width}px`
          ), this.style.setProperty(
            "--ea-segmented-indicator-height",
            `${d.height}px`
          ), this.style.setProperty(
            "--ea-segmented-indicator-position-x",
            `${t.offsetLeft}px`
          ), this.style.setProperty(
            "--ea-segmented-indicator-position-y",
            `${t.offsetTop}px`
          );
        }
      });
    });
  }
  $mount() {
    this.setAttribute("role", "radiogroup"), this.tabIndex = 0, this.updateContainerClasslist(), this.options && this.options.length > 0 && this._renderOptions(this.options), this._container && typeof ResizeObserver < "u" && (this._resizeObserver = new ResizeObserver(() => {
      this._resizeTimer && clearTimeout(this._resizeTimer), this._resizeTimer = window.setTimeout(() => {
        this._resizeTimer = void 0, this._updateIndicatorPosition(this.value);
      }, 16);
    }), this._resizeObserver.observe(this._container));
  }
  $beforeUnmount() {
    var e;
    this._resizeTimer && (clearTimeout(this._resizeTimer), this._resizeTimer = void 0), (e = this._resizeObserver) == null || e.disconnect(), this._resizeObserver = void 0;
  }
};
o([
  E(".ea-segmented")
], n.prototype, "_container", 2);
o([
  g({
    type: Array,
    default: [],
    observer(e) {
      this.hasAttribute("name") || (this.setAttribute(
        "name",
        this.tagName + "-" + Math.random().toString(36).substring(2, 15)
      ), console.warn(`[${this.tagName}] name attribute is required.`, this)), this._renderOptions(e);
    }
  })
], n.prototype, "options", 2);
o([
  g({
    type: Object,
    default: { label: "label", value: "value", disabled: "disabled" }
  })
], n.prototype, "propsConfiguration", 2);
o([
  h({
    type: String,
    default: "",
    observer(e) {
      this._updateIndicatorPosition(e), this._updateActiveDescendant();
    }
  })
], n.prototype, "value", 2);
o([
  h({
    type: A(["large", "default", "small"]),
    default: "",
    observer() {
      this.updateContainerClasslist(), this._updateIndicatorPosition(this.value);
    }
  })
], n.prototype, "size", 2);
o([
  h({
    type: A(["horizontal", "vertical"]),
    default: "",
    observer() {
      this.updateContainerClasslist(), this._updateIndicatorPosition(this.value);
    }
  })
], n.prototype, "direction", 2);
o([
  h({
    type: Boolean,
    default: !1,
    a11y: { ariaAttr: "aria-disabled", map: (e) => String(e) },
    observer() {
      this.updateContainerClasslist();
    }
  })
], n.prototype, "disabled", 2);
o([
  h({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], n.prototype, "block", 2);
o([
  h({
    type: String,
    default: ""
  })
], n.prototype, "name", 2);
o([
  y("change", ".ea-segmented")
], n.prototype, "_handleChange", 1);
o([
  y("keydown")
], n.prototype, "_handleKeydown", 1);
n = o([
  z(v, { styles: [S] })
], n);
const L = n;
export {
  n as EaSegmented,
  L as default
};
