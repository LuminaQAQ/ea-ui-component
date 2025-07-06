var p = (t, i, e) => {
  if (!i.has(t))
    throw TypeError("Cannot " + e);
};
var m = (t, i, e) => (p(t, i, "read from private field"), e ? e.call(t) : i.get(t)), n = (t, i, e) => {
  if (i.has(t))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(t) : i.set(t, e);
}, l = (t, i, e, c) => (p(t, i, "write to private field"), c ? c.call(t, e) : i.set(t, e), e);
import { B as d } from "./Base.js";
const _ = `
.ea-timeline-item_wrap {
  position: relative;
  padding-bottom: 20px;
  padding-left: 28px;
  list-style: none;
}
.ea-timeline-item_wrap .ea-timeline-item_circle {
  position: absolute;
  left: 0;
  z-index: 1;
  display: block;
  width: 12px;
  height: 12px;
  font-size: 12px;
  border-radius: 50%;
  background-color: #e4e7ed;
}
.ea-timeline-item_wrap .ea-timeline-item_circle.ea-timeline-item--primary {
  background-color: #409eff;
  color: #409eff;
}
.ea-timeline-item_wrap .ea-timeline-item_circle.ea-timeline-item--success {
  background-color: #67c23a;
  color: #67c23a;
}
.ea-timeline-item_wrap .ea-timeline-item_circle.ea-timeline-item--warning {
  background-color: #e6a23c;
  color: #e6a23c;
}
.ea-timeline-item_wrap .ea-timeline-item_circle.ea-timeline-item--danger {
  background-color: #f56c6c;
  color: #f56c6c;
}
.ea-timeline-item_wrap .ea-timeline-item_circle.ea-timeline-item--info {
  background-color: #e4e7ed;
  color: #e4e7ed;
}
.ea-timeline-item_wrap .ea-timeline-item_tail {
  z-index: 0;
  position: absolute;
  left: 0.3281rem;
  height: 100%;
  border-left: 2px solid #e4e7ed;
}
.ea-timeline-item_wrap .ea-timeline-item_container {
  position: relative;
  top: -4px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
}
.ea-timeline-item_wrap .ea-timeline-item_container .ea-timeline-item_timestamp {
  color: #909399;
  line-height: 1;
  margin-top: 8px;
}
.ea-timeline-item_wrap .ea-timeline-item_container .ea-timeline-item_content {
  color: #303133;
}
.ea-timeline-item_wrap .ea-timeline-item_container.ea-timeline-item_timestamp--top {
  flex-direction: column-reverse;
}
.ea-timeline-item_wrap .ea-timeline-item_container.ea-timeline-item_timestamp--top .ea-timeline-item_timestamp {
  margin-top: 0;
  margin-bottom: 8px;
}
.ea-timeline-item_wrap .ea-timeline-item_container.ea-timeline-item_timestamp--bottom {
  flex-direction: column;
}
.ea-timeline-item_wrap.ea-timeline-item_circle--large .ea-timeline-item_circle {
  width: 14px;
  height: 14px;
}
.ea-timeline-item_wrap.ea-timeline-item_circle--large .ea-timeline-item_tail {
  left: 0.3906rem;
}
.ea-timeline-item_wrap.ea-timeline-item_circle--large .ea-timeline-item_container {
  font-size: 16px;
}
`;
var r, s, a, o;
class h extends d {
  constructor() {
    super();
    n(this, r, void 0);
    n(this, s, void 0);
    n(this, a, void 0);
    n(this, o, void 0);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class='ea-timeline-item_wrap' part='container'>
                <div class='ea-timeline-item_circle' part='circle'></div>
                <div class='ea-timeline-item_tail' part='tail'></div>
                <div class='ea-timeline-item_container' part='body'>
                    <div class='ea-timeline-item_content' part='content'>
                        <slot></slot>
                    </div>
                    <div class='ea-timeline-item_timestamp' part='timestamp'></div>
                </div>
            </div>
        `, l(this, r, e.querySelector(".ea-timeline-item_wrap")), l(this, s, e.querySelector(".ea-timeline-item_timestamp")), l(this, a, e.querySelector(".ea-timeline-item_circle")), l(this, o, e.querySelector(".ea-timeline-item_timestamp")), this.build(e, _);
  }
  // ------- time 时间 -------
  // #region
  get time() {
    return this.getAttribute("time") || "";
  }
  set time(e) {
    e && (this.setAttribute("time", e), m(this, o).innerText = e);
  }
  // #endregion
  // ------- end -------
  // ------- type 时间线类型 -------
  // #region
  get typeList() {
    return ["primary", "success", "warning", "danger", "info"];
  }
  get type() {
    const e = this.getAttribute("type");
    return this.typeList.includes(e) ? e : "info";
  }
  set type(e) {
    this.setAttribute("type", e), m(this, a).classList.add(`ea-timeline-item--${e}`);
  }
  // #endregion
  // ------- end -------
  // ------- color 时间线颜色 -------
  // #region
  get color() {
    return this.getAttribute("color") || "";
  }
  set color(e) {
    if (!e)
      return;
    this.setAttribute("color", e), (new Option().style.color = e) !== "" && (m(this, a).style.backgroundColor = e);
  }
  // #endregion
  // ------- end -------
  // ------- size 时间线尺寸 -------
  // #region
  get sizeList() {
    return ["normal", "large"];
  }
  get size() {
    const e = this.getAttribute("size");
    return this.sizeList.includes(e) ? e : "normal";
  }
  set size(e) {
    this.setAttribute("size", e), m(this, r).classList.add(`ea-timeline-item_circle--${e}`);
  }
  // #endregion
  // ------- end -------
  // ------- placement 时间的显示位置 -------
  // #region
  get placementList() {
    return ["top", "bottom"];
  }
  get placement() {
    const e = this.getAttribute("placement");
    return this.placementList.includes(e) ? e : "bottom";
  }
  set placement(e) {
    this.setAttribute("placement", e), m(this, s).classList.add(`ea-timeline-item_timestamp--${e}`);
  }
  // #endregion
  // ------- end -------d
  connectedCallback() {
    this.time = this.time, this.type = this.type, this.color = this.color, this.size = this.size, this.placement = this.placement;
  }
}
r = new WeakMap(), s = new WeakMap(), a = new WeakMap(), o = new WeakMap();
customElements.get("ea-timeline-item") || customElements.define("ea-timeline-item", h);
export {
  h as EaTimelineItem
};
