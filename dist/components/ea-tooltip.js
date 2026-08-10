import { EaPopper as f } from "./ea-popper.js";
import "../core/EaBase.ts.js";
import { q as m, a as c, C as v, l as b } from "../core/decorator.js";
import { E as u } from "../utils/Enum.ts.js";
import { s as _ } from "../css/ea-tooltip.style.js";
import { c as d } from "../utils/bem.ts.js";
var E = Object.defineProperty, C = Object.getOwnPropertyDescriptor, o = (t, e, r, n) => {
  for (var i = n > 1 ? void 0 : n ? C(e, r) : e, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (i = (n ? l(e, r, i) : l(i)) || i);
  return n && i && E(e, r, i), i;
};
const p = "ea-tooltip", g = d(p), h = d("ea-popper"), A = [
  "click",
  "focus",
  "hover",
  "contextmenu",
  "customized"
], T = ["dark", "light", "customized"];
let s = class extends f {
  constructor() {
    super(...arguments), this.trigger = "hover", this.effect = "dark", this.content = "", this._triggerEventStrategies = {
      hover: () => {
        this.addEventListener(
          "mouseover",
          () => {
            this.show();
          },
          { signal: this._triggerAbortController.signal }
        ), this.addEventListener(
          "mouseout",
          () => {
            this.contains(document.activeElement) || this.hide();
          },
          { signal: this._triggerAbortController.signal }
        ), this.addEventListener(
          "focusin",
          () => {
            this.show();
          },
          { signal: this._triggerAbortController.signal }
        ), this.addEventListener(
          "focusout",
          () => {
            requestAnimationFrame(() => {
              this.visible && !this.contains(document.activeElement) && this.hide();
            });
          },
          { signal: this._triggerAbortController.signal }
        );
      },
      click: () => {
        this.addEventListener(
          "click",
          (t) => {
            t.detail !== 0 && this.toggle();
          },
          { signal: this._triggerAbortController.signal }
        );
      },
      focus: () => {
        this.addEventListener(
          "focusin",
          () => {
            this.visible || this.show();
          },
          { signal: this._triggerAbortController.signal }
        ), this.addEventListener(
          "focusout",
          () => {
            requestAnimationFrame(() => {
              this.visible && !this.contains(document.activeElement) && this.hide();
            });
          },
          { signal: this._triggerAbortController.signal }
        );
      },
      contextmenu: () => {
        this.addEventListener(
          "contextmenu",
          (t) => {
            var e;
            t.preventDefault(), (e = this._contextmenuAbortController) == null || e.abort(), this._contextmenuAbortController = new AbortController(), this.show(), window.addEventListener(
              "click",
              (r) => {
                var i;
                this.contains(r.target) || (this.hide(), (i = this._contextmenuAbortController) == null || i.abort());
              },
              { signal: this._contextmenuAbortController.signal }
            );
          },
          { signal: this._triggerAbortController.signal }
        );
      },
      customized: () => {
      }
    };
  }
  updateContainerClasslist() {
    const e = `${super.updateContainerClasslist()} ${g(
      {
        [this.effect]: this.effect && this.effect !== "customized"
      },
      {
        "has-content": !!this.content
      }
    )}`;
    return this._container && (this._container.className = e), e;
  }
  /** 设置 ARIA 关联属性：tooltip 使用 aria-describedby，非交互式触发元素添加 tabindex */
  _setupAria() {
    super._setupAria(), this._originalPopper.setAttribute("role", "tooltip");
    const t = this._getReferenceTrigger();
    t && (t.removeAttribute("aria-controls"), t.removeAttribute("aria-expanded"), t.setAttribute("aria-describedby", this._originalPopper.id), this._isNativelyFocusable(t) || t.setAttribute("tabindex", "0"));
  }
  /** tooltip 不使用 aria-expanded */
  _updateAriaExpanded() {
  }
  /** 检查元素是否原生可聚焦 */
  _isNativelyFocusable(t) {
    return !!(["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(t.tagName) || t.tabIndex >= 0);
  }
  /** 初始化触发事件监听 */
  _initTriggerEvent() {
    var e;
    if ((e = this._triggerAbortController) == null || e.abort(), this._triggerAbortController = new AbortController(), this.trigger === "customized") return;
    const t = this._triggerEventStrategies[this.trigger];
    t ? t() : (console.warn(`[EaTooltip] trigger event ${this.trigger} is not exist`), this._triggerEventStrategies.hover());
  }
  _handleKeydown(t) {
    const e = t.target, r = this._getReferenceTrigger();
    if (r && (e === r || r.contains(e))) {
      if (t.key === "Escape") {
        t.preventDefault(), t.stopPropagation(), this.hide();
        return;
      }
      if (t.key === "Enter" || t.key === " ") {
        if (this.trigger === "focus" || this.trigger === "hover" || this.trigger === "customized") return;
        t.preventDefault(), t.stopPropagation(), this.toggle();
      }
    }
  }
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container" tabindex="-1">
        <div class="${h.e("reference")}" part="reference" tabindex="-1">
          <slot name="reference"></slot>
          <div class="${h.e("original")}" part="original" tabindex="-1" inert>
            <slot></slot>
            <div class="${g.e("content")}" part="content"></div>
          </div>
        </div>
      </div>
    `;
  }
  $mount() {
    super.$mount(), this._initTriggerEvent(), this.content && this._contentElement && (this._contentElement.textContent = this.content);
  }
  $beforeUnmount() {
    var t, e;
    super.$beforeUnmount(), (t = this._triggerAbortController) == null || t.abort(), (e = this._contextmenuAbortController) == null || e.abort();
  }
};
o([
  m(g.ce("content"))
], s.prototype, "_contentElement", 2);
o([
  c({
    type: u(A),
    default: "hover",
    observer() {
      this._initTriggerEvent();
    }
  })
], s.prototype, "trigger", 2);
o([
  c({
    type: u(T),
    default: "dark",
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "effect", 2);
o([
  c({
    type: String,
    default: "",
    observer(t) {
      this._contentElement && (this._contentElement.textContent = t), this.updateContainerClasslist();
    }
  })
], s.prototype, "content", 2);
o([
  b("keydown")
], s.prototype, "_handleKeydown", 1);
s = o([
  v(p, { styles: [_] })
], s);
export {
  s as EaTooltip
};
