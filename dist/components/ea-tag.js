import { E as C } from "../core/EaBase.ts.js";
import { q as b, a as i, l as v, C as _ } from "../core/decorator.js";
import { E as d } from "../utils/Enum.ts.js";
import { V as y, a as g } from "../core/constants.js";
import { s as $ } from "../css/ea-check-tag.style.js";
import { c as E } from "../utils/bem.ts.js";
import { t as k } from "../utils/timeout.ts.js";
import { s as P } from "../css/ea-tag.style.js";
import "./ea-icon.js";
class x extends Event {
  constructor(e) {
    super("change", {
      bubbles: !0,
      composed: !0
    }), this.detail = e;
  }
}
var S = Object.defineProperty, w = Object.getOwnPropertyDescriptor, u = (t, e, o, s) => {
  for (var a = s > 1 ? void 0 : s ? w(e, o) : e, l = t.length - 1, c; l >= 0; l--)
    (c = t[l]) && (a = (s ? c(e, o, a) : c(a)) || a);
  return s && a && S(e, o, a), a;
};
const T = "ea-check-tag", m = E(T);
let p = class extends C {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.variant = "primary";
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const t = m(
      {
        [this.variant]: this.variant && this.checked
      },
      {
        disabled: this.disabled
      }
    );
    return this._container && (this._container.className = t), t;
  }
  /** 渲染模板 */
  html() {
    return `
      <div class='${this.updateContainerClasslist()}' part='container' role='checkbox'>
        <slot></slot>
      </div>
    `;
  }
  _handleClick() {
    this.disabled || (this.checked = !this.checked, this.dispatchEvent(new x({ checked: this.checked })));
  }
  $mount() {
    this.updateContainerClasslist();
  }
};
u([
  b(m.cb())
], p.prototype, "_container", 2);
u([
  i({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-checked",
      map: (t) => String(!!t)
    },
    observer() {
      this.updateContainerClasslist();
    }
  })
], p.prototype, "checked", 2);
u([
  i({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-disabled",
      map: (t) => String(t)
    },
    observer() {
      this.updateContainerClasslist();
    }
  })
], p.prototype, "disabled", 2);
u([
  i({
    type: d(y),
    default: "primary",
    observer() {
      this.updateContainerClasslist();
    }
  })
], p.prototype, "variant", 2);
u([
  v("click", m.cb())
], p.prototype, "_handleClick", 1);
p = u([
  _(T, { styles: [$] })
], p);
class f extends Event {
  constructor(e) {
    super("ea-remove", {
      bubbles: !0,
      composed: !0
    }), this.detail = e;
  }
}
var N = Object.defineProperty, O = Object.getOwnPropertyDescriptor, n = (t, e, o, s) => {
  for (var a = s > 1 ? void 0 : s ? O(e, o) : e, l = t.length - 1, c; l >= 0; l--)
    (c = t[l]) && (a = (s ? c(e, o, a) : c(a)) || a);
  return s && a && N(e, o, a), a;
};
const A = "ea-tag", h = E(A), B = ["large", "default", "small"], D = ["dark", "light", "plain"];
let r = class extends C {
  constructor() {
    super(...arguments), this.variant = g, this.closable = !1, this.disableTransitions = !1, this.color = "", this.size = "default", this.effect = "light", this.round = !1;
  }
  /** 更新自定义颜色 */
  _updateCustomColor(t) {
    if (this._container) {
      if (!t) {
        this._container.style.removeProperty("--ea-tag-custom-color");
        return;
      }
      try {
        CSS.supports("background", t) ? this._container.style.setProperty("--ea-tag-custom-color", t) : (this._container.style.removeProperty("--ea-tag-custom-color"), console.warn(`[EaTag] The color value ${t} is not supported.`));
      } catch {
        this._container.style.setProperty("--ea-tag-custom-color", t);
      }
    }
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const t = h(
      {
        [this.variant]: !0,
        [`${this.size}-size`]: !0,
        [this.effect]: !0
      },
      {
        closable: this.closable,
        round: this.round
      }
    );
    return this._container && (this._container.className = t), t;
  }
  /** 渲染模板 */
  html() {
    return `
      <div class='${this.updateContainerClasslist()}' part='container'>
        <span class="${h.e("content")}"><slot></slot></span>
        <ea-icon class="${h.e("close")}" part="close-icon" name="xmark" role="button" aria-label="close" tabindex="0"></ea-icon>
      </div>
    `;
  }
  _handleCloseClick() {
    var t;
    if (this.disableTransitions)
      this.dispatchEvent(new f({ text: this.textContent })), this.remove();
    else {
      this._container.classList.add(h.s("before-close")), (t = this._transitionAbortController) == null || t.abort(), this._transitionAbortController = new AbortController();
      const e = parseFloat(getComputedStyle(this._container).transitionDuration) || 0.3, o = () => {
        var s;
        clearTimeout(this._closeFallbackTimer), (s = this._transitionAbortController) == null || s.abort(), this.dispatchEvent(new f({ text: this.textContent })), this.remove();
      };
      this._container.addEventListener(
        "transitionend",
        (s) => {
          s.target !== this._container || s.propertyName !== "filter" || o();
        },
        { signal: this._transitionAbortController.signal }
      ), this._closeFallbackTimer = k(
        o,
        (e + 0.1) * 1e3
      );
    }
  }
  $mount() {
    this.updateContainerClasslist(), this.color && this._updateCustomColor(this.color);
  }
  $beforeUnmount() {
    var t;
    (t = this._transitionAbortController) == null || t.abort(), clearTimeout(this._closeFallbackTimer);
  }
};
n([
  b(h.cb())
], r.prototype, "_container", 2);
n([
  i({
    type: d(y),
    default: g,
    observer() {
      this.updateContainerClasslist();
    }
  })
], r.prototype, "variant", 2);
n([
  i({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], r.prototype, "closable", 2);
n([
  i({
    type: Boolean,
    default: !1
  })
], r.prototype, "disableTransitions", 2);
n([
  i({
    type: String,
    default: "",
    observer(t) {
      this._updateCustomColor(t);
    }
  })
], r.prototype, "color", 2);
n([
  i({
    type: d(B),
    default: "default",
    observer() {
      this.updateContainerClasslist();
    }
  })
], r.prototype, "size", 2);
n([
  i({
    type: d(D),
    default: "light",
    observer() {
      this.updateContainerClasslist();
    }
  })
], r.prototype, "effect", 2);
n([
  i({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], r.prototype, "round", 2);
n([
  v("click", h.ce("close"))
], r.prototype, "_handleCloseClick", 1);
r = n([
  _(A, { styles: [P] })
], r);
export {
  p as EaCheckTag,
  x as EaCheckTagChangeEvent,
  r as EaTag,
  f as EaTagRemoveEvent
};
