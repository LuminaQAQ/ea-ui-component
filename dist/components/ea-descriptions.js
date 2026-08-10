import { E as C } from "../core/EaBase.ts.js";
import { q as y, a as i, C as $, l as m } from "../core/decorator.js";
import { E as g } from "../utils/Enum.ts.js";
import { s as N } from "../css/ea-descriptions-item.style.js";
import { c as P } from "../utils/bem.ts.js";
import { h as w } from "../utils/html.ts.js";
import { h as u } from "../utils/h.ts.js";
import { s as R } from "../css/ea-descriptions.style.js";
var T = Object.defineProperty, D = Object.getOwnPropertyDescriptor, h = (t, l, e, n) => {
  for (var r = n > 1 ? void 0 : n ? D(l, e) : l, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (n ? o(l, e, r) : o(r)) || r);
  return n && r && T(l, e, r), r;
};
const S = "ea-descriptions-item", _ = P(S), E = ["left", "center", "right"];
let p = class extends C {
  constructor() {
    super(...arguments), this._contentObserver = null, this.label = "", this.colspan = 1, this.rowspan = 1, this.align = "", this.labelAlign = "", this.width = "", this.labelWidth = "", this.labelPart = "", this.contentPart = "";
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const t = _();
    return this._container && (this._container.className = t), t;
  }
  html() {
    return `
      <div class='${_()}' part='container'>
        <span class='${_.e("label")}' part='label'>${this.label}</span>
        <span class='${_.e("content")}' part='content'>
          <slot></slot>
        </span>
      </div>
    `;
  }
  /** 通知父组件更新 */
  _notifyParent() {
    this.emit("ea-descriptions-item-change", {
      bubbles: !0,
      composed: !0
    });
  }
  /** 设置内容观察器 */
  _setupContentObserver() {
    this._contentObserver = new MutationObserver(() => {
      this._notifyParent();
    }), this._contentObserver.observe(this, {
      childList: !0,
      subtree: !0,
      characterData: !0
    });
  }
  $mount() {
    this._setupContentObserver();
  }
  $beforeUnmount() {
    this._contentObserver && (this._contentObserver.disconnect(), this._contentObserver = null);
  }
};
h([
  y(_.cb())
], p.prototype, "_container", 2);
h([
  y(_.ce("label"))
], p.prototype, "_label", 2);
h([
  i({
    type: String,
    default: "",
    observer(t) {
      this._label.textContent = t, this._notifyParent();
    }
  })
], p.prototype, "label", 2);
h([
  i({
    type: Number,
    default: 1,
    observer() {
      this._notifyParent();
    }
  })
], p.prototype, "colspan", 2);
h([
  i({
    type: Number,
    default: 1,
    observer() {
      this._notifyParent();
    }
  })
], p.prototype, "rowspan", 2);
h([
  i({
    type: g(E),
    default: "",
    observer() {
      this._notifyParent();
    }
  })
], p.prototype, "align", 2);
h([
  i({
    type: g(E),
    default: "",
    observer() {
      this._notifyParent();
    }
  })
], p.prototype, "labelAlign", 2);
h([
  i({
    type: String,
    default: "",
    observer() {
      this._notifyParent();
    }
  })
], p.prototype, "width", 2);
h([
  i({
    type: String,
    default: "",
    observer() {
      this._notifyParent();
    }
  })
], p.prototype, "labelWidth", 2);
h([
  i({
    type: String,
    default: "",
    observer() {
      this._notifyParent();
    }
  })
], p.prototype, "labelPart", 2);
h([
  i({
    type: String,
    default: "",
    observer() {
      this._notifyParent();
    }
  })
], p.prototype, "contentPart", 2);
p = h([
  $(S, { styles: [N] })
], p);
var I = Object.defineProperty, A = Object.getOwnPropertyDescriptor, d = (t, l, e, n) => {
  for (var r = n > 1 ? void 0 : n ? A(l, e) : l, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (n ? o(l, e, r) : o(r)) || r);
  return n && r && I(l, e, r), r;
};
const O = "ea-descriptions", a = P(O), L = ["horizontal", "vertical"], j = ["large", "default", "small"];
let c = class extends C {
  constructor() {
    super(...arguments), this.column = 3, this.caption = "", this.border = !1, this.direction = "horizontal", this.size = "default", this.labelWidth = "", this._variantRenderer = {
      normal: (t) => this._renderNormalRow(t),
      border: (t) => this._renderBorderRow(t),
      vertical: (t) => this._renderVerticalRow(t)
    };
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const t = a(
      { [this.size]: !0 },
      { border: this.border, vertical: this.direction === "vertical" }
    );
    return this._container && (this._container.className = t), t;
  }
  html() {
    return `
      <slot id='defaultSlot' part='default-slot'></slot>
      <table class='${a()}' part='container' aria-labelledby='descriptions-title'>
        <caption class='${a.e("caption")}' part='caption'>
          <section class='${a.e("title")}' part='title' id='descriptions-title'>
            <slot name='header'></slot>
          </section>
          <section class='${a.e("extra")}' part='extra'>
            <slot name='extra'></slot>
          </section>
        </caption>
        <tbody class='${a.e("body")}' part='body'>
        </tbody>
      </table>
    `;
  }
  /**
   * 处理子元素分割，将 HTML 描述转换为行列描述
   * @param children - 子元素列表
   * @param column - 每行列数
   * @returns 行列描述二维数组
   */
  _handleChildrenDivide(t, l) {
    const e = [];
    return t.forEach((n) => {
      const r = {
        label: n.label,
        content: n.innerHTML,
        colspan: n.colspan,
        rowspan: n.rowspan,
        align: n.align,
        "label-align": n.labelAlign,
        width: n.width,
        "label-width": n.labelWidth || this.labelWidth,
        "label-part": n.labelPart,
        "content-part": n.contentPart
      };
      let s = e.findIndex((o) => o.reduce((f, v) => f + ((v == null ? void 0 : v.colspan) || 0), 0) + r.colspan <= l);
      s === -1 && (e.push([]), s = e.length - 1), e[s].push(r);
      for (let o = 1; o < r.rowspan; o++) {
        const b = s + o;
        e[b] || (e[b] = []);
        for (let f = 0; f < r.colspan; f++)
          e[b].splice(e[s].indexOf(r) + f, 0, {
            colspan: 1,
            rowspan: 1,
            placeholder: !0
          });
      }
    }), e.map((n) => n.filter((r) => !r.placeholder)).filter((n) => n.length > 0);
  }
  /**
   * 获取 Descriptions 组件的样式类型
   * @returns 样式类型
   */
  _getVariant() {
    return this.direction === "vertical" ? "vertical" : this.border ? "border" : "normal";
  }
  /**
   * 计算单元格样式
   * @param item - 描述项配置
   * @param isLabel - 是否为标签单元格
   * @returns CSS 样式字符串
   */
  _getCellStyle(t, l) {
    const e = [];
    return t.align && e.push(`--ea-descriptions-align: ${t.align};`), l && (t["label-align"] || t.align) && e.push(
      `--ea-descriptions-label-align: ${t["label-align"] || t.align};`
    ), t.width && e.push(`--ea-descriptions-item-width: ${t.width}`), l && t["label-width"] && e.push(`--ea-descriptions-label-width: ${t["label-width"]};`), e.join(" ");
  }
  /**
   * 计算普通模式的 colspan
   * @param item - 描述项配置
   * @param index - 当前项在行中的索引
   * @param row - 当前行
   * @returns colspan 值或 undefined
   */
  _getNormalColspan(t, l, e) {
    const n = e.reduce((o, b) => o + b.colspan, 0), s = l === e.length - 1 && e.length < this.column && n < this.column;
    if (t.colspan > 1 || s)
      return s ? this.column - n + (l < 1 ? 1 : l) : t.colspan;
  }
  /**
   * 渲染标签元素
   * @param item - 描述项配置
   * @param tag - HTML 标签名
   * @param extraClass - 额外类名
   * @returns HTML 字符串
   */
  _renderLabelElement(t, l = "span", e) {
    const n = e ? `${a.e("label")} ${e}` : a.e("label");
    return u(
      l,
      n,
      {
        part: `label cell ${t["label-part"] || ""}`,
        style: this._getCellStyle(t, !0),
        role: "rowheader"
      },
      t.label
    );
  }
  /**
   * 渲染内容元素
   * @param item - 描述项配置
   * @param tag - HTML 标签名
   * @param extraClass - 额外类名
   * @returns HTML 字符串
   */
  _renderContentElement(t, l = "span", e) {
    const n = e ? `${a.e("content")} ${e}` : a.e("content");
    return u(
      l,
      n,
      {
        part: `content cell ${t["content-part"] || ""}`,
        style: this._getCellStyle(t, !1)
      },
      w(t.content)
    );
  }
  /**
   * 渲染表格行
   * @param cells - 单元格 HTML 数组
   * @param extraPart - 额外 part 名称
   * @returns HTML 字符串
   */
  _renderTableRow(t, l) {
    return u(
      "tr",
      a.e("row"),
      { part: l ? `row ${l}` : "row" },
      t
    );
  }
  /** 普通模式渲染器 */
  _renderNormalRow(t) {
    const l = t.map((e, n) => {
      const r = this._getNormalColspan(e, n, t), s = {
        part: "col-cell",
        style: e.width ? `--ea-descriptions-item-width: ${e.width}` : ""
      };
      return e.rowspan > 1 && (s.rowspan = e.rowspan), r && (s.colspan = r), u("td", a.e("cell"), s, [
        this._renderLabelElement(e),
        this._renderContentElement(e)
      ]);
    });
    return this._renderTableRow(l);
  }
  /** 边框模式渲染器 */
  _renderBorderRow(t) {
    const l = t.flatMap((e, n) => {
      const r = n === t.length - 1, s = t.length < 3 && r, o = u(
        "td",
        a.e("label"),
        {
          part: `label cell ${e["label-part"] || ""}`,
          colspan: 1,
          rowspan: e.rowspan,
          style: this._getCellStyle(e, !0),
          role: "rowheader"
        },
        e.label
      ), b = u(
        "td",
        a.e("content"),
        {
          part: `content cell ${e["content-part"] || ""}`,
          rowspan: e.rowspan,
          colspan: s ? 6 - (n + 1) : e.colspan || 1,
          style: this._getCellStyle(e, !1)
        },
        w(e.content)
      );
      return [o, b];
    });
    return this._renderTableRow(l);
  }
  /** 垂直模式渲染器 */
  _renderVerticalRow(t) {
    const l = (r) => t.length < 3 && r === t.length - 1, e = t.map(
      (r, s) => u(
        "th",
        `${a.e("label")} ${a.e("header")}`,
        {
          part: `label cell ${r["label-part"] || ""}`,
          rowspan: 1,
          colspan: l(s) ? 6 - (s + 1) : r.colspan || 1,
          style: this._getCellStyle(r, !0),
          scope: "row",
          role: "rowheader"
        },
        r.label
      )
    ), n = t.map(
      (r, s) => u(
        "td",
        `${a.e("content")} ${a.e("cell")}`,
        {
          part: `content cell ${r["content-part"] || ""}`,
          rowspan: r.rowspan * 2 - 1,
          colspan: l(s) ? 6 - (s + 1) : r.colspan || 1,
          style: this._getCellStyle(r, !1)
        },
        w(r.content)
      )
    );
    return this._renderTableRow(e, "row-label") + this._renderTableRow(n, "row-content");
  }
  /** 渲染默认插槽内容 */
  _render() {
    const t = [
      ...this.querySelectorAll(
        "ea-descriptions-item"
      )
    ];
    this._tbody.innerHTML = this._handleChildrenDivide(t, this.column).map(this._variantRenderer[this._getVariant()].bind(this)).join("");
  }
  _handleSlotChange() {
    this._render();
  }
  _handleChildChange(t) {
    t.stopImmediatePropagation(), this._render();
  }
  $mount() {
    this.updateContainerClasslist(), this._render();
  }
};
d([
  y(a.cb())
], c.prototype, "_container", 2);
d([
  y(`${a.ce("title")} slot[name='header']`)
], c.prototype, "_captionSlot", 2);
d([
  y(a.ce("body"))
], c.prototype, "_tbody", 2);
d([
  i({
    type: Number,
    default: 3,
    observer() {
      this._render();
    }
  })
], c.prototype, "column", 2);
d([
  i({
    type: String,
    default: "",
    observer(t) {
      this._captionSlot && (this._captionSlot.textContent = t);
    }
  })
], c.prototype, "caption", 2);
d([
  i({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist(), this._render();
    }
  })
], c.prototype, "border", 2);
d([
  i({
    type: g(L),
    default: "horizontal",
    observer() {
      this.updateContainerClasslist(), this._render();
    }
  })
], c.prototype, "direction", 2);
d([
  i({
    type: g(j),
    default: "default",
    observer() {
      this.updateContainerClasslist();
    }
  })
], c.prototype, "size", 2);
d([
  i({
    type: String,
    default: "",
    observer(t) {
      this.style.setProperty("--ea-descriptions-label-width", t);
    }
  })
], c.prototype, "labelWidth", 2);
d([
  m("slotchange", "#defaultSlot")
], c.prototype, "_handleSlotChange", 1);
d([
  m("ea-descriptions-item-change")
], c.prototype, "_handleChildChange", 1);
c = d([
  $(O, { styles: [R] })
], c);
export {
  c as EaDescriptions,
  p as EaDescriptionsItem
};
