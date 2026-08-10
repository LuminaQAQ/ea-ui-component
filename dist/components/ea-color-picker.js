import { a as nt } from "../core/EaFormAssociatedBase.ts.js";
import { c as R } from "../utils/bem.ts.js";
import { q as C, a as w, l as S, C as W, p as z } from "../core/decorator.js";
import { h as P } from "../utils/html.ts.js";
import { E as H } from "../utils/Enum.ts.js";
import { E as lt } from "../core/EaBase.ts.js";
import { p as ht } from "../utils/Utils.ts.js";
import "./ea-input.js";
import { s as ut } from "../css/ea-color-picker-panel.style.js";
import "./ea-popper.js";
import "./ea-button.js";
import "./ea-icon.js";
import { s as pt } from "../css/ea-color-picker.style.js";
var N = (t) => {
  throw TypeError(t);
}, D = (t, e, s) => e.has(t) || N("Cannot " + s), A = (t, e, s) => (D(t, e, "read from private field"), s ? s.call(t) : e.get(t)), F = (t, e, s) => e.has(t) ? N("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), B = (t, e, s, a) => (D(t, e, "write to private field"), e.set(t, s), s), m = (t, e, s) => (D(t, e, "access private method"), s), $, M, q, k, j, U, G, X, Y, J, K, Q, Z, tt, et, st, V, L, O, at, rt;
const T = class I {
  constructor(e) {
    F(this, M), F(this, $), B(this, $, this.parse(e));
  }
  parse(e) {
    return e ? typeof e == "string" ? m(this, M, K).call(this, e) || m(this, M, V).call(this) : typeof e == "object" ? m(this, M, st).call(this, e) : m(this, M, V).call(this) : m(this, M, V).call(this);
  }
  static parseStringStrict(e) {
    var s, a, i, r;
    return !e || typeof e != "string" ? null : (e = e.trim().toLowerCase(), e.startsWith("#") ? m(s = I, k, j).call(s, e) : e.startsWith("rgb") ? m(a = I, k, U).call(a, e) : e.startsWith("hsl") ? m(i = I, k, G).call(i, e) : e.startsWith("hsv") ? m(r = I, k, X).call(r, e) : null);
  }
  hsvStrToHsvObject(e) {
    const s = e.match(
      /hsv\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*(\d*\.?\d+)\s*)?\)/
    );
    if (s) {
      const a = parseInt(s[1]), i = parseInt(s[2]) / 100, r = parseInt(s[3]) / 100, o = s[4] ? parseFloat(s[4]) : 1;
      return { h: a, s: i, v: r, a: o };
    }
    return null;
  }
  toHex(e = !1) {
    const { r: s, g: a, b: i, a: r } = A(this, $), o = (u) => {
      const p = Math.round(u).toString(16);
      return p.length === 1 ? "0" + p : p;
    };
    let n = `#${o(s)}${o(a)}${o(i)}`;
    return e && r < 1 && (n += o(r * 255)), n;
  }
  toRgb(e = !1) {
    const { r: s, g: a, b: i, a: r } = A(this, $);
    return e && r < 1 ? `rgba(${s}, ${a}, ${i}, ${r})` : `rgb(${s}, ${a}, ${i})`;
  }
  toHsl(e = !1) {
    const s = m(this, M, at).call(this);
    return e && s.a < 1 ? `hsla(${s.h}, ${s.s}%, ${s.l}%, ${s.a})` : `hsl(${s.h}, ${s.s}%, ${s.l}%)`;
  }
  toHsv(e = !1) {
    const s = m(this, M, rt).call(this);
    return e && s.a < 1 ? `hsv(${s.h}, ${s.s}%, ${s.v}%, ${s.a})` : `hsv(${s.h}, ${s.s}%, ${s.v}%)`;
  }
  toString(e = "hex") {
    switch (e.toLowerCase()) {
      case "hex":
        return this.toHex();
      case "hexa":
        return this.toHex(!0);
      case "rgb":
        return this.toRgb();
      case "rgba":
        return this.toRgb(!0);
      case "hsl":
        return this.toHsl();
      case "hsla":
        return this.toHsl(!0);
      case "hsv":
        return this.toHsv();
      default:
        return this.toHex();
    }
  }
  getValue() {
    return { ...A(this, $) };
  }
  setValue(e) {
    B(this, $, this.parse(e));
  }
  getBrightness() {
    const { r: e, g: s, b: a } = A(this, $);
    return (e * 0.299 + s * 0.587 + a * 0.114) / 255;
  }
  isLight() {
    return this.getBrightness() > 0.5;
  }
  isDark() {
    return this.getBrightness() <= 0.5;
  }
  static isValidColor(e) {
    return !e || typeof e != "string" ? !1 : I.parseStringStrict(e) !== null;
  }
};
$ = /* @__PURE__ */ new WeakMap();
M = /* @__PURE__ */ new WeakSet();
q = function(t) {
  return t = t.trim().toLowerCase(), t.startsWith("#") ? m(this, M, Q).call(this, t) : t.startsWith("rgb") ? m(this, M, Z).call(this, t) : t.startsWith("hsl") ? m(this, M, tt).call(this, t) : t.startsWith("hsv") ? m(this, M, et).call(this, t) : null;
};
k = /* @__PURE__ */ new WeakSet();
j = function(t) {
  if (t = t.replace("#", ""), ![3, 6, 8].includes(t.length))
    return null;
  if (t.length === 3 && (t = t.split("").map((s) => s + s).join("")), t.length === 6) {
    const s = parseInt(t.substring(0, 2), 16), a = parseInt(t.substring(2, 4), 16), i = parseInt(t.substring(4, 6), 16);
    return { r: s, g: a, b: i, a: 1 };
  }
  if (t.length === 8) {
    const s = parseInt(t.substring(0, 2), 16), a = parseInt(t.substring(2, 4), 16), i = parseInt(t.substring(4, 6), 16), r = parseInt(t.substring(6, 8), 16) / 255;
    return { r: s, g: a, b: i, a: r };
  }
  return null;
};
U = function(t) {
  const e = t.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?\)/
  );
  if (e) {
    const s = parseInt(e[1]), a = parseInt(e[2]), i = parseInt(e[3]), r = e[4] ? parseFloat(e[4]) : 1;
    return s < 0 || s > 255 || a < 0 || a > 255 || i < 0 || i > 255 || r < 0 || r > 1 ? null : { r: s, g: a, b: i, a: r };
  }
  return null;
};
G = function(t) {
  var e;
  const s = t.match(
    /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*(\d*\.?\d+)\s*)?\)/
  );
  if (s) {
    const a = parseInt(s[1]), i = parseInt(s[2]) / 100, r = parseInt(s[3]) / 100, o = s[4] ? parseFloat(s[4]) : 1;
    return a < 0 || a > 360 || i < 0 || i > 1 || r < 0 || r > 1 || o < 0 || o > 1 ? null : m(e = T, k, Y).call(e, { h: a, s: i, l: r, a: o });
  }
  return null;
};
X = function(t) {
  var e;
  const s = t.match(
    /hsv\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*(\d*\.?\d+)\s*)?\)/
  );
  if (s) {
    const a = parseInt(s[1]), i = parseInt(s[2]) / 100, r = parseInt(s[3]) / 100, o = s[4] ? parseFloat(s[4]) : 1;
    return a < 0 || a > 360 || i < 0 || i > 1 || r < 0 || r > 1 || o < 0 || o > 1 ? null : m(e = T, k, J).call(e, { h: a, s: i, v: r, a: o });
  }
  return null;
};
Y = function(t) {
  const { h: e, s, l: a, a: i = 1 } = t;
  if (s === 0) {
    const l = Math.round(a * 255);
    return { r: l, g: l, b: l, a: i };
  }
  const r = (l, x, y) => (y < 0 && (y += 1), y > 1 && (y -= 1), y < 1 / 6 ? l + (x - l) * 6 * y : y < 1 / 2 ? x : y < 2 / 3 ? l + (x - l) * (2 / 3 - y) * 6 : l), o = a < 0.5 ? a * (1 + s) : a + s - a * s, n = 2 * a - o, u = e / 360, p = Math.round(r(n, o, u + 1 / 3) * 255), c = Math.round(r(n, o, u) * 255), b = Math.round(r(n, o, u - 1 / 3) * 255);
  return { r: p, g: c, b, a: i };
};
J = function(t) {
  const { h: e, s, v: a, a: i = 1 } = t, r = Math.floor(e / 60) % 6, o = e / 60 - r, n = a * (1 - s), u = a * (1 - o * s), p = a * (1 - (1 - o) * s);
  let c, b, l;
  switch (r) {
    case 0:
      [c, b, l] = [a, p, n];
      break;
    case 1:
      [c, b, l] = [u, a, n];
      break;
    case 2:
      [c, b, l] = [n, a, p];
      break;
    case 3:
      [c, b, l] = [n, u, a];
      break;
    case 4:
      [c, b, l] = [p, n, a];
      break;
    case 5:
      [c, b, l] = [a, n, u];
      break;
  }
  return {
    r: Math.round(c * 255),
    g: Math.round(b * 255),
    b: Math.round(l * 255),
    a: i
  };
};
K = function(t) {
  return m(this, M, q).call(this, t);
};
Q = function(t) {
  if (t = t.replace("#", ""), ![3, 6, 8].includes(t.length))
    return null;
  if (t.length === 3 && (t = t.split("").map((s) => s + s).join("")), t.length === 6) {
    const s = parseInt(t.substring(0, 2), 16), a = parseInt(t.substring(2, 4), 16), i = parseInt(t.substring(4, 6), 16);
    return { r: s, g: a, b: i, a: 1 };
  }
  if (t.length === 8) {
    const s = parseInt(t.substring(0, 2), 16), a = parseInt(t.substring(2, 4), 16), i = parseInt(t.substring(4, 6), 16), r = parseInt(t.substring(6, 8), 16) / 255;
    return { r: s, g: a, b: i, a: r };
  }
  return null;
};
Z = function(t) {
  const e = t.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?\)/
  );
  if (e) {
    const s = parseInt(e[1]), a = parseInt(e[2]), i = parseInt(e[3]), r = e[4] ? parseFloat(e[4]) : 1;
    return s < 0 || s > 255 || a < 0 || a > 255 || i < 0 || i > 255 || r < 0 || r > 1 ? null : { r: s, g: a, b: i, a: r };
  }
  return null;
};
tt = function(t) {
  const e = t.match(
    /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*(\d*\.?\d+)\s*)?\)/
  );
  if (e) {
    const s = parseInt(e[1]), a = parseInt(e[2]) / 100, i = parseInt(e[3]) / 100, r = e[4] ? parseFloat(e[4]) : 1;
    return s < 0 || s > 360 || a < 0 || a > 1 || i < 0 || i > 1 || r < 0 || r > 1 ? null : m(this, M, L).call(this, { h: s, s: a, l: i, a: r });
  }
  return null;
};
et = function(t) {
  const e = this.hsvStrToHsvObject(t);
  if (e) {
    const s = e.h, a = e.s, i = e.v, r = e.a;
    return s < 0 || s > 360 || a < 0 || a > 1 || i < 0 || i > 1 || r < 0 || r > 1 ? null : m(this, M, O).call(this, { h: s, s: a, v: i, a: r });
  }
  return null;
};
st = function(t) {
  const { r: e, g: s, b: a, a: i = 1, h: r, s: o, l: n, v: u } = t;
  return e !== void 0 && s !== void 0 && a !== void 0 ? {
    r: Math.max(0, Math.min(255, e)),
    g: Math.max(0, Math.min(255, s)),
    b: Math.max(0, Math.min(255, a)),
    a: Math.max(0, Math.min(1, i))
  } : r !== void 0 && o !== void 0 && n !== void 0 ? m(this, M, L).call(this, {
    h: Math.max(0, Math.min(360, r)),
    s: Math.max(0, Math.min(1, o)),
    l: Math.max(0, Math.min(1, n)),
    a: Math.max(0, Math.min(1, i))
  }) : r !== void 0 && o !== void 0 && u !== void 0 ? m(this, M, O).call(this, {
    h: Math.max(0, Math.min(360, r)),
    s: Math.max(0, Math.min(1, o)),
    v: Math.max(0, Math.min(1, u)),
    a: Math.max(0, Math.min(1, i))
  }) : m(this, M, V).call(this);
};
V = function() {
  return { r: 0, g: 0, b: 0, a: 1 };
};
L = function(t) {
  const { h: e, s, l: a, a: i = 1 } = t;
  if (s === 0) {
    const l = Math.round(a * 255);
    return { r: l, g: l, b: l, a: i };
  }
  const r = (l, x, y) => (y < 0 && (y += 1), y > 1 && (y -= 1), y < 1 / 6 ? l + (x - l) * 6 * y : y < 1 / 2 ? x : y < 2 / 3 ? l + (x - l) * (2 / 3 - y) * 6 : l), o = a < 0.5 ? a * (1 + s) : a + s - a * s, n = 2 * a - o, u = e / 360, p = Math.round(r(n, o, u + 1 / 3) * 255), c = Math.round(r(n, o, u) * 255), b = Math.round(r(n, o, u - 1 / 3) * 255);
  return { r: p, g: c, b, a: i };
};
O = function(t) {
  const { h: e, s, v: a, a: i = 1 } = t, r = Math.floor(e / 60) % 6, o = e / 60 - r, n = a * (1 - s), u = a * (1 - o * s), p = a * (1 - (1 - o) * s);
  let c, b, l;
  switch (r) {
    case 0:
      [c, b, l] = [a, p, n];
      break;
    case 1:
      [c, b, l] = [u, a, n];
      break;
    case 2:
      [c, b, l] = [n, a, p];
      break;
    case 3:
      [c, b, l] = [n, u, a];
      break;
    case 4:
      [c, b, l] = [p, n, a];
      break;
    case 5:
      [c, b, l] = [a, n, u];
      break;
  }
  return {
    r: Math.round(c * 255),
    g: Math.round(b * 255),
    b: Math.round(l * 255),
    a: i
  };
};
at = function() {
  const { r: t, g: e, b: s, a } = A(this, $), i = t / 255, r = e / 255, o = s / 255, n = Math.max(i, r, o), u = Math.min(i, r, o), p = n - u;
  let c = 0, b = 0;
  const l = (n + u) / 2;
  if (p !== 0) {
    switch (b = l > 0.5 ? p / (2 - n - u) : p / (n + u), n) {
      case i:
        c = (r - o) / p + (r < o ? 6 : 0);
        break;
      case r:
        c = (o - i) / p + 2;
        break;
      case o:
        c = (i - r) / p + 4;
        break;
    }
    c *= 60;
  }
  return {
    h: Math.round(c),
    s: Math.round(b * 100),
    l: Math.round(l * 100),
    a
  };
};
rt = function() {
  const { r: t, g: e, b: s, a } = A(this, $), i = t / 255, r = e / 255, o = s / 255, n = Math.max(i, r, o), u = Math.min(i, r, o), p = n - u;
  let c = 0;
  const b = n === 0 ? 0 : p / n, l = n;
  if (p !== 0) {
    switch (n) {
      case i:
        c = (r - o) / p + (r < o ? 6 : 0);
        break;
      case r:
        c = (o - i) / p + 2;
        break;
      case o:
        c = (i - r) / p + 4;
        break;
    }
    c *= 60;
  }
  return {
    h: Math.round(c),
    s: Math.round(b * 100),
    v: Math.round(l * 100),
    a
  };
};
F(T, k);
let E = T;
class ct extends Event {
  constructor(e) {
    super("ea-clear", { bubbles: !0, composed: !0 }), this.detail = e || {};
  }
}
class dt extends Event {
  constructor(e) {
    super("ea-active-change", {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }), this.detail = e;
  }
}
class _t extends Event {
  constructor(e) {
    super("ea-invalid-color", {
      bubbles: !0,
      composed: !0
    }), this.detail = e;
  }
}
var ft = Object.defineProperty, vt = Object.getOwnPropertyDescriptor, g = (t, e, s, a) => {
  for (var i = a > 1 ? void 0 : a ? vt(e, s) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (i = (a ? o(e, s, i) : o(i)) || i);
  return a && i && ft(e, s, i), i;
};
const it = "ea-color-picker-panel", h = R(it), bt = ["hsl", "hsv", "hex", "rgb", "rgba"];
let v = class extends lt {
  constructor() {
    super(...arguments), this.value = "", this.colorFormat = "hex", this.showAlpha = !1, this.disabled = !1, this.border = !1, this.clearable = !0, this.predefine = [], this._abortControllerStates = {
      saturationMove: null,
      hueMove: null,
      alphaMove: null
    }, this._states = {
      isFirstValueUpdate: !1,
      hue: 0,
      saturation: 1,
      value: 1,
      alpha: 1,
      color: new E(),
      lastValidValue: ""
    }, this._updateSvpanelStatus = () => {
      const t = new E({
        h: this._states.hue,
        s: 1,
        v: 1,
        a: 1
      });
      this.style.setProperty(
        "--ea-color-picker-panel-background-color",
        t.toString(this._getEffectiveFormat())
      );
    };
  }
  updateContainerClasslist() {
    const t = h(
      {},
      {
        disabled: this.disabled,
        border: this.border,
        "show-alpha": this.showAlpha,
        clearable: this.clearable
      }
    );
    return this._container && (this._container.className = t), t;
  }
  html() {
    return P(`
      <div class="${h.b()}" part="container">
        <div class="${h.e("wrapper")}" part="wrapper">
          <div class="${h.e("svpanel")}" part="svpanel" role="slider" aria-label="Saturation and brightness" aria-valuemin="0" aria-valuemax="100">
            <div class="${h.e("cursor")} ${h.e("svpanel-cursor")}" part="svpanel-cursor"></div>
          </div>
          <div class="${h.e("hue-slider")} ${h.m("vertical")}" part="hue-slider" role="slider" aria-label="Hue" aria-valuemin="0" aria-valuemax="360" aria-orientation="vertical">
            <div class="${h.e("thumb")} ${h.e("hue-slider-thumb")}" part="hue-slider-thumb"></div>
          </div>
        </div>
        <div class="${h.e("alpha-slider")}" part="alpha-slider" role="slider" aria-label="Opacity" aria-valuemin="0" aria-valuemax="100">
          <div class="${h.e("thumb")} ${h.e("alpha-slider-thumb")}" part="alpha-slider-thumb"></div>
        </div>
        <div class="${h.e("predefine")}" part="predefine">
          <div class="${h.e("colors")}" part="predefine-colors"></div>
        </div>
        <div class="${h.e("footer")}" part="footer">
          <div class="${h.e("text-display")}" part="text-display"></div>
          <ea-input class="${h.e("color-input")}" part="color-input" type="text" size="small"></ea-input>
          <section class="${h.e("append")}" part="append">
            <slot name="footer"></slot>
          </section>
        </div>
      </div>
    `);
  }
  _handleSaturationMouseDown(t) {
    var s, a;
    if ((s = this._abortControllerStates.saturationMove) == null || s.abort(), (a = this._abortControllerStates.hueMove) == null || a.abort(), this.disabled) return;
    t.preventDefault(), this._abortControllerStates.saturationMove = new AbortController();
    const e = (i) => {
      const r = this._saturation.getBoundingClientRect(), o = Math.max(0, Math.min(i.clientX - r.left, r.width)), n = Math.max(0, Math.min(i.clientY - r.top, r.height)), u = o / r.width, p = 1 - n / r.height;
      this._states.saturation = u, this._states.value = p, this._states.color.setValue({
        h: this._states.hue,
        s: u,
        v: p,
        a: this._states.alpha
      }), this.value = this._states.color.toString(this._getEffectiveFormat()), this._emitChangeEvent(), this._saturationThumb.style.left = u * r.width + "px", this._saturationThumb.style.top = (1 - p) * r.height + "px";
    };
    e(t), window.addEventListener("mousemove", e, {
      signal: this._abortControllerStates.saturationMove.signal
    }), window.addEventListener(
      "mouseup",
      () => {
        var i;
        (i = this._abortControllerStates.saturationMove) == null || i.abort();
      },
      {
        signal: this._abortControllerStates.saturationMove.signal
      }
    );
  }
  _handleHueMouseDown(t) {
    var s, a;
    if ((s = this._abortControllerStates.hueMove) == null || s.abort(), (a = this._abortControllerStates.saturationMove) == null || a.abort(), this.disabled) return;
    t.preventDefault(), this._abortControllerStates.hueMove = new AbortController();
    const e = (i) => {
      const r = this._hue.getBoundingClientRect(), n = (1 - Math.max(0.01, Math.min(i.clientY - r.top, r.height)) / r.height) * 360;
      this._states.hue = n, this._states.color.setValue({
        h: n,
        s: this._states.saturation,
        v: this._states.value,
        a: this._states.alpha
      }), this.value = this._states.color.toString(this._getEffectiveFormat()), this._emitChangeEvent(), this._hueThumb.style.top = (1 - n / 360) * r.height + "px", this._updateSvpanelStatus();
    };
    e(t), window.addEventListener("mousemove", e, {
      signal: this._abortControllerStates.hueMove.signal
    }), window.addEventListener(
      "mouseup",
      () => {
        var i;
        (i = this._abortControllerStates.hueMove) == null || i.abort();
      },
      {
        signal: this._abortControllerStates.hueMove.signal
      }
    );
  }
  _handleAlphaMouseDown(t) {
    var s, a, i;
    if ((s = this._abortControllerStates.alphaMove) == null || s.abort(), (a = this._abortControllerStates.saturationMove) == null || a.abort(), (i = this._abortControllerStates.hueMove) == null || i.abort(), this.disabled) return;
    t.preventDefault(), this._abortControllerStates.alphaMove = new AbortController();
    const e = (r) => {
      const o = this._alpha.getBoundingClientRect(), n = Math.max(0, Math.min(r.clientX - o.left, o.width)), u = Number((n / o.width).toFixed(2));
      Math.abs(this._states.alpha - u) > 1e-3 && (this._states.alpha = u, this._states.color.setValue({
        h: this._states.hue,
        s: this._states.saturation,
        v: this._states.value,
        a: u
      }), this.value = this._states.color.toString(this._getEffectiveFormat()), this._emitChangeEvent(), this._alphaThumb.style.left = u * o.width + "px");
    };
    e(t), window.addEventListener("mousemove", e, {
      signal: this._abortControllerStates.alphaMove.signal
    }), window.addEventListener(
      "mouseup",
      () => {
        var r;
        (r = this._abortControllerStates.alphaMove) == null || r.abort();
      },
      {
        signal: this._abortControllerStates.alphaMove.signal
      }
    );
  }
  _handleColorInputChange(t) {
    const s = t.target.value;
    try {
      const a = new E(s);
      this.value = a.toString(this._getEffectiveFormat()), this._emitChangeEvent();
    } catch {
      this._colorInput.value = this.value;
    }
  }
  _handleColorInputBlur() {
    if (!this._colorInput) return;
    const t = this._colorInput.getAttribute("value") || "";
    if (!t) {
      this.value = "", this._states.lastValidValue = "";
      return;
    }
    this._validateColor(t) ? (this._states.lastValidValue = t, this._updateColorFromValue(t)) : (this._colorInput.setAttribute("value", this._states.lastValidValue || ""), this.dispatchEvent(
      new _t({ value: t })
    ));
  }
  _handlePredefineListClick(t) {
    if (this.disabled) return;
    const e = t.target.closest(
      h.ce("predefine-color")
    );
    if (!e) return;
    const s = e.getAttribute("data-color");
    s && this._updateColorFromValue(s);
  }
  /** 获取有效的颜色格式，考虑透明度 */
  _getEffectiveFormat() {
    const t = this.colorFormat;
    return this.showAlpha && {
      hex: "rgba",
      rgb: "rgba",
      hsl: "hsla"
    }[t] || t;
  }
  /** 从当前颜色对象解析 HSV 值 */
  _parseHsvFromColor() {
    const t = this._states.color.hsvStrToHsvObject(
      this._states.color.toHsv(!0)
    );
    t && (this._states.hue = parseInt(t.h), this._states.saturation = t.s, this._states.value = t.v, this._states.alpha = t.a ? parseFloat(t.a) : 1);
  }
  /** 获取滑块尺寸 */
  _getSliderSize(t, e, s, a) {
    const i = t.getBoundingClientRect(), r = ht(this.style.getPropertyValue(e)) || s;
    return Math.max(0, Math.min(i[a], r), r);
  }
  /** 更新所有滑块光标位置 */
  _updateCursorPosition() {
    if (!this._states.isFirstValueUpdate && this.value && (this._states.color.setValue(this.value), this._parseHsvFromColor(), this._states.isFirstValueUpdate = !0), this._saturationThumb && this._saturation) {
      const t = this._states.saturation, e = this._states.value, s = this._getSliderSize(
        this._saturation,
        "--ea-color-picker-panel-svpanel-width",
        280,
        "width"
      ), a = this._getSliderSize(
        this._saturation,
        "--ea-color-picker-panel-svpanel-height",
        180,
        "height"
      ), i = t * s, r = (1 - e) * a;
      this._saturationThumb.style.left = i + "px", this._saturationThumb.style.top = r + "px";
    }
    if (this._hueThumb && this._hue) {
      const t = this._states.hue, e = this._getSliderSize(
        this._hue,
        "--ea-color-picker-panel-hue-slider-height",
        180,
        "height"
      ), s = (1 - t / 360) * e;
      this._hueThumb.style.top = s + "px";
    }
    if (this._alphaThumb && this._alpha) {
      const t = this._states.alpha, e = this._getSliderSize(
        this._alpha,
        "--ea-color-picker-panel-alpha-slider-width",
        280,
        "width"
      ), s = t * e;
      this._alphaThumb.style.left = s + "px";
    }
    this._updateSliderAriaValues();
  }
  /** 更新所有滑块的 aria-valuenow 属性 */
  _updateSliderAriaValues() {
    if (this._saturation) {
      const t = Math.round(this._states.value * 100);
      this._saturation.setAttribute("aria-valuenow", String(t));
    }
    this._hue && this._hue.setAttribute("aria-valuenow", String(Math.round(this._states.hue))), this._alpha && this._alpha.setAttribute("aria-valuenow", String(Math.round(this._states.alpha * 100)));
  }
  /** 触发颜色变化事件 */
  _emitChangeEvent() {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          value: this.value,
          color: this._states.color
        },
        bubbles: !0,
        composed: !0
      })
    ), this.dispatchEvent(
      new dt({ value: this.value })
    );
  }
  /** 渲染预定义颜色列表 */
  _renderPredefineColors(t) {
    if (this._predefineList) {
      if (!t || t.length === 0) {
        this._predefineList.innerHTML = "";
        return;
      }
      this._predefineList.innerHTML = P(
        t.map(
          (e) => `
          <div class="${h.e("predefine-color")}"
            part="predefine-color"
            style="background-color: ${e}"
            data-color="${e}"
          ></div>
        `
        ).join("")
      );
    }
  }
  /** 从颜色值更新所有状态 */
  _updateColorFromValue(t) {
    this._updateColorInputValue(), this.value = t, this._states.color.setValue(t), this._parseHsvFromColor(), this._updateCursorPosition(), this._updateSvpanelStatus(), this._emitChangeEvent();
  }
  /** 更新文本显示模式 */
  _updateTextDisplayMode() {
    !this._colorInput || !this._textDisplay || (this._updateColorInputValue(), this.updateContainerClasslist());
  }
  /** 更新颜色输入框的值 */
  _updateColorInputValue() {
    this.clearable && this._colorInput ? this._colorInput.setAttribute("value", this.value) : !this.clearable && this._textDisplay && (this._textDisplay.textContent = this.value);
  }
  /** 验证颜色值是否合法 */
  _validateColor(t) {
    return E.isValidColor(t);
  }
  resetCursorPosition() {
    this._states.hue = 0, this._states.saturation = 1, this._states.value = 1, this._states.alpha = 1, this._states.isFirstValueUpdate = !1, this._saturationThumb && (this._saturationThumb.style.left = "", this._saturationThumb.style.top = ""), this._hueThumb && (this._hueThumb.style.top = ""), this._alphaThumb && (this._alphaThumb.style.left = ""), this._updateSvpanelStatus();
  }
  $mount() {
    this.updateContainerClasslist(), this._updateTextDisplayMode();
  }
  $mounted() {
    if (this.value) {
      this._states.color.setValue(this.value);
      const t = this._states.color.toString(this._getEffectiveFormat());
      if (t !== this.value) {
        this.value = t;
        return;
      }
    }
    this._updateCursorPosition();
  }
};
g([
  C(h.cb())
], v.prototype, "_container", 2);
g([
  C(h.ce("svpanel"))
], v.prototype, "_saturation", 2);
g([
  C(h.ce("svpanel-cursor"))
], v.prototype, "_saturationThumb", 2);
g([
  C(h.ce("hue-slider"))
], v.prototype, "_hue", 2);
g([
  C(h.ce("hue-slider-thumb"))
], v.prototype, "_hueThumb", 2);
g([
  C(h.ce("alpha-slider"))
], v.prototype, "_alpha", 2);
g([
  C(h.ce("alpha-slider-thumb"))
], v.prototype, "_alphaThumb", 2);
g([
  C(h.ce("predefine"))
], v.prototype, "_predefineList", 2);
g([
  C(h.ce("color-input"))
], v.prototype, "_colorInput", 2);
g([
  C(h.ce("text-display"))
], v.prototype, "_textDisplay", 2);
g([
  w({
    type: String,
    default: "",
    observer(t) {
      this._states.lastValidValue = t, t && this._states.color.setValue(t), this._updateCursorPosition(), this._updateSvpanelStatus(), this._updateColorInputValue();
    }
  })
], v.prototype, "value", 2);
g([
  w({
    type: H(bt),
    default: "hex",
    observer(t) {
      this.value && (this.value = this._states.color.toString(this._getEffectiveFormat()));
    }
  })
], v.prototype, "colorFormat", 2);
g([
  w({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist(), this.value && (this.value = this._states.color.toString(this._getEffectiveFormat())), this._updateCursorPosition();
    }
  })
], v.prototype, "showAlpha", 2);
g([
  w({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], v.prototype, "disabled", 2);
g([
  w({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], v.prototype, "border", 2);
g([
  w({
    type: Boolean,
    default: !0,
    observer() {
      this._updateTextDisplayMode();
    }
  })
], v.prototype, "clearable", 2);
g([
  z({
    type: Array,
    default: [],
    observer(t) {
      this._renderPredefineColors(t);
    }
  })
], v.prototype, "predefine", 2);
g([
  S("mousedown", h.ce("svpanel"))
], v.prototype, "_handleSaturationMouseDown", 1);
g([
  S("mousedown", h.ce("hue-slider"))
], v.prototype, "_handleHueMouseDown", 1);
g([
  S("mousedown", h.ce("alpha-slider"))
], v.prototype, "_handleAlphaMouseDown", 1);
g([
  S("change", h.ce("color-input"))
], v.prototype, "_handleColorInputChange", 1);
g([
  S("blur", h.ce("color-input"))
], v.prototype, "_handleColorInputBlur", 1);
g([
  S("click", h.ce("predefine"))
], v.prototype, "_handlePredefineListClick", 1);
v = g([
  W(it, { styles: [ut] })
], v);
var gt = Object.defineProperty, mt = Object.getOwnPropertyDescriptor, f = (t, e, s, a) => {
  for (var i = a > 1 ? void 0 : a ? mt(e, s) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (i = (a ? o(e, s, i) : o(i)) || i);
  return a && i && gt(e, s, i), i;
};
const ot = "ea-color-picker", d = R(ot), Ct = ["hsl", "hsv", "hex", "rgb", "rgba"], yt = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
  "right",
  "right-start",
  "right-end"
];
let _ = class extends nt {
  constructor() {
    super(...arguments), this.label = "", this.value = "", this.disabled = !1, this.clearable = !1, this.size = "", this.colorFormat = "hex", this.showAlpha = !1, this.tabindex = 0, this.required = !1, this.placement = "bottom", this.predefine = [], this._uniqueId = _._instanceCount++, this._abortControllerStates = {
      close: null
    }, this._states = {
      isOpen: !1,
      isPanelDefined: !1,
      previousValue: ""
    };
  }
  updateContainerClasslist() {
    const t = d(
      {
        [this.size]: !!this.size
      },
      {
        "has-value": !!this.value,
        disabled: this.disabled
      }
    );
    return this._container && (this._container.className = t), t;
  }
  html() {
    return P(`
      <label class="${d.e("form-label")}" part="form-label"></label>
      <div class="${d()}" part="container" tabindex="${this.tabindex}">
        <ea-popper
          class="${d.e("popper")}"
          part="popper"
          show-arrow="false"
        >
          <div class="${d.e("trigger")}" part="trigger" slot="reference">
            <div class="${d.e("outer")}" part="outer">
              <div class="${d.e("inner")}" part="inner"></div>
            </div>
            <div class="${d.e("icon-wrapper")}" part="icon-wrapper">
              <ea-icon class="${d.e("icon")} ${d.e("status")}" part="status-icon" name="xmark"></ea-icon>
            </div>
          </div>
          <ea-color-picker-panel class="${d.e("panel")}" part="panel">
            <div slot="footer" class="${d.e("footer-actions")}" part="footer-actions">
              <ea-button class="${d.e("clear-btn")}" part="clear-btn" plain text>clear</ea-button>
              <ea-button class="${d.e("confirm-btn")}" part="confirm-btn" plain>ok</ea-button>
            </div>
          </ea-color-picker-panel>
        </ea-popper>
      </div>
    `);
  }
  _handleTriggerClick(t) {
    var e;
    this.disabled || ((e = this._abortControllerStates.close) == null || e.abort(), this._abortControllerStates.close = new AbortController(), this._states.previousValue = this.value, this._showPopper(), document.addEventListener("click", this._handleDocumentClick.bind(this), {
      signal: this._abortControllerStates.close.signal
    }));
  }
  _handlePopperShow() {
    this._states.isOpen = !0, this.updateContainerClasslist(), this._updateAriaExpanded();
  }
  _handlePopperHide() {
    this._states.isOpen = !1, this.updateContainerClasslist(), this._updateAriaExpanded(), this._states.previousValue !== void 0 && this._states.previousValue !== this.value && (this.value = this._states.previousValue, this._updateTriggerColor(), this._updateStatusIcon());
  }
  _handlePanelChange(t) {
    const { value: e } = t.detail;
    this.value = e, this._updateTriggerColor(), this._updateStatusIcon();
  }
  _handleClearClick() {
    var t, e;
    this.value = "", this._panel.style.setProperty(
      "--ea-color-picker-panel-background-color",
      "#ff0000"
    ), (e = (t = this._panel).resetCursorPosition) == null || e.call(t), this._updateTriggerColor(), this._updateStatusIcon(), this.emit("change", { detail: { value: "" } }), this.dispatchEvent(new ct()), this._states.previousValue = "", this._hidePopper();
  }
  _handleConfirmClick() {
    this._states.previousValue = this.value, this._hidePopper();
  }
  /** 处理文档点击事件，点击外部时关闭弹出层 */
  _handleDocumentClick(t) {
    this._states.isOpen && (!this.contains(t.target) || t.target !== this) && this._hidePopper();
  }
  /** 显示弹出层 */
  _showPopper() {
    this._popper && this._popper.show();
  }
  /** 隐藏弹出层 */
  _hidePopper() {
    this._popper && this._popper.hide();
  }
  /** 更新触发器内层背景颜色 */
  _updateTriggerColor() {
    if (this._inner) {
      if (!this.value) {
        this._inner.style.setProperty(
          "--ea-color-picker-inner-background-color",
          "transparent"
        );
        return;
      }
      try {
        const t = new E(this.value);
        this._inner.style.setProperty(
          "--ea-color-picker-inner-background-color",
          t.toRgb(!0)
        );
      } catch {
        this._inner.style.setProperty(
          "--ea-color-picker-inner-background-color",
          "transparent"
        );
      }
    }
  }
  /** 更新状态图标 */
  _updateStatusIcon(t = this.value) {
    this._statusIcon && this._statusIcon.setAttribute("name", t ? "angle-down" : "xmark");
  }
  /** 设置触发器的 ARIA 属性，遵循 W3C disclosure 模式 */
  _setupAria() {
    this._trigger && (this._trigger.setAttribute("aria-expanded", "false"), this._trigger.setAttribute("aria-haspopup", "dialog"), this._trigger.setAttribute("role", "button"), this._trigger.hasAttribute("tabindex") || this._trigger.setAttribute("tabindex", "0"));
  }
  /** 更新触发器的 aria-expanded 状态 */
  _updateAriaExpanded() {
    this._trigger && this._trigger.setAttribute("aria-expanded", String(this._states.isOpen));
  }
  show() {
    this._showPopper();
  }
  hide() {
    this._hidePopper();
  }
  focus() {
    this._container && this._container.focus();
  }
  blur() {
    this._container && this._container.blur();
  }
  get validationTarget() {
    return this;
  }
  updateValidity() {
    this.required && !this.value ? this.setValidity({ valueMissing: !0 }, "请选择一个颜色") : this.setValidity({});
  }
  checkValidity() {
    return this.updateValidity(), this.internals && typeof this.internals.checkValidity == "function" ? this.internals.checkValidity() : !this.required || !!this.value;
  }
  reportValidity() {
    return this.updateValidity(), this.internals && typeof this.internals.reportValidity == "function" ? this.internals.reportValidity() : !this.required || !!this.value;
  }
  $mount() {
    this.updateContainerClasslist(), this._setupAria();
  }
  $mounted() {
    this._panel && (this._panel.setAttribute("color-format", this.colorFormat), this._panel.setAttribute("clearable", String(this.clearable)), this._panel.setAttribute("value", this.value), this._panel.setAttribute("show-alpha", String(this.showAlpha)), this._panel.predefine = this.predefine);
  }
};
_._instanceCount = 0;
f([
  C(d.ce("form-label"))
], _.prototype, "_label", 2);
f([
  C(d.cb())
], _.prototype, "_container", 2);
f([
  C(d.ce("popper"))
], _.prototype, "_popper", 2);
f([
  C(d.ce("trigger"))
], _.prototype, "_trigger", 2);
f([
  C(d.ce("outer"))
], _.prototype, "_outer", 2);
f([
  C(d.ce("inner"))
], _.prototype, "_inner", 2);
f([
  C(d.ce("icon") + d.ce("status"))
], _.prototype, "_statusIcon", 2);
f([
  C(d.ce("panel"))
], _.prototype, "_panel", 2);
f([
  C(d.ce("clear-btn"))
], _.prototype, "_clearBtn", 2);
f([
  C(d.ce("confirm-btn"))
], _.prototype, "_confirmBtn", 2);
f([
  w({
    type: String,
    default: "",
    observer(t) {
      this._label.textContent = t;
    },
    a11y: {
      ariaAttr: "aria-label",
      target: ".ea-color-picker__trigger",
      map: (t) => t || "颜色选择"
    }
  })
], _.prototype, "label", 2);
f([
  w({
    type: String,
    default: "",
    observer() {
      this.setValue(this.value || null), this._updateTriggerColor(), this._updateStatusIcon(), this._panel && this._panel.setAttribute("value", this.value);
    }
  })
], _.prototype, "value", 2);
f([
  w({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    },
    a11y: {
      ariaAttr: "aria-disabled",
      target: ".ea-color-picker__trigger",
      map: (t) => String(t)
    }
  })
], _.prototype, "disabled", 2);
f([
  w({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist(), this._panel && this._panel.setAttribute("clearable", String(this.clearable));
    }
  })
], _.prototype, "clearable", 2);
f([
  w({
    type: ["small", "medium", "large"],
    default: "",
    observer() {
      this.updateContainerClasslist();
    }
  })
], _.prototype, "size", 2);
f([
  w({
    type: H(Ct),
    default: "hex",
    observer(t) {
      this._panel && this._panel.setAttribute("color-format", t);
    }
  })
], _.prototype, "colorFormat", 2);
f([
  w({
    type: Boolean,
    default: !1,
    observer(t) {
      this._panel && this._panel.setAttribute("show-alpha", String(t));
    }
  })
], _.prototype, "showAlpha", 2);
f([
  w({
    type: Number,
    default: 0
  })
], _.prototype, "tabindex", 2);
f([
  w({
    type: Boolean,
    default: !1
  })
], _.prototype, "required", 2);
f([
  w({
    type: H(yt),
    default: "bottom",
    observer(t) {
      this._popper.setAttribute("placement", t);
    }
  })
], _.prototype, "placement", 2);
f([
  z({
    type: Array,
    default: [],
    observer(t) {
      this._states.isPanelDefined ? this._panel.predefine = t : customElements.whenDefined("ea-color-picker-panel").then(() => {
        this._states.isPanelDefined = !0, this._panel.predefine = t;
      });
    }
  })
], _.prototype, "predefine", 2);
f([
  S("click", d.ce("trigger"))
], _.prototype, "_handleTriggerClick", 1);
f([
  S("show", d.ce("popper"))
], _.prototype, "_handlePopperShow", 1);
f([
  S("hide", d.ce("popper"))
], _.prototype, "_handlePopperHide", 1);
f([
  S("change", d.ce("panel"))
], _.prototype, "_handlePanelChange", 1);
f([
  S("click", d.ce("clear-btn"))
], _.prototype, "_handleClearClick", 1);
f([
  S("click", d.ce("confirm-btn"))
], _.prototype, "_handleConfirmClick", 1);
_ = f([
  W(ot, { styles: [pt] })
], _);
export {
  E as Color,
  _ as EaColorPicker,
  v as EaColorPickerPanel
};
