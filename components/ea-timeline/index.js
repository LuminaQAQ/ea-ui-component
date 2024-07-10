// @ts-nocheck
import Base from '../Base.js';
import { createElement, createSlotElement } from '../../utils/createElement.js';

const stylesheet = `
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

export class EaTimeline extends Base {
  #mounted = false;

  #wrap;

  #container;

  #timelineSlot;

  #observer;


  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const wrap = document.createElement('div');
    wrap.className = 'ea-timeline_wrap';

    const timelineSlot = createSlotElement('');
    const container = createElement('ul', 'ea-timeline-item_container', [timelineSlot]);
    wrap.appendChild(container);

    this.#wrap = wrap;
    this.#container = container;
    this.#timelineSlot = timelineSlot;

    this.build(shadowRoot, stylesheet);
    this.shadowRoot.appendChild(wrap);
  }

  // ------- reverse 时间线排序 -------
  // #region
  get reverse() {
    const attr = this.getAttribute('reverse');
    const flag = ["true", "false"].includes(attr);

    if (attr && flag) return attr === "true";

    return true;
  }

  set reverse(value) {
    this.setAttribute('reverse', value);

    this.#sortTimeline(value);
  }
  // #endregion
  // ------- end -------

  #sortTimeline(flag) {
    flag = flag === "true" || flag === true ? true : false;

    setTimeout(() => {
      try {
        const timelineItems = Array.from(this.querySelectorAll('ea-timeline-item'));
        const slotTimeline = Array.from(this.shadowRoot.querySelectorAll('ea-timeline-item'));
        const timeArr = Array.from(timelineItems.concat(slotTimeline)).sort((a, b) => {
          const aTime = new Date(a.time);
          const bTime = new Date(b.time);

          return flag ? (bTime - aTime) : (aTime - bTime);
        })

        timeArr.forEach((item, index) => {
          this.#container.appendChild(item);
        })

        this.#timelineSlot.innerHTML = '';
      } catch (error) { }
    }, 20);
  }

  init() {
    const that = this;

    this.reverse = this.reverse;

    setTimeout(() => {
      const observer = new MutationObserver((mutationsList, observer) => {
        this.#sortTimeline(that.reverse);
      });
      observer.observe(this, { childList: true });
      this.#observer = observer;
    }, 1000);
  }

  connectedCallback() {
    this.init();

    setTimeout(() => {
      this.#mounted = true;
    }, 30);
  }

  disconnectedCallback() {
    try {
      this.#observer.disconnect();
    } catch (error) { }
  }
}

if (!customElements.get('ea-timeline')) {
  customElements.define('ea-timeline', EaTimeline);
}

export class EaTimelineItem extends Base {
  #wrap;

  #timeWrap;

  #timelineCircle;
  #timelineContent;
  #timelineTimestamp;
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const timelineCircle = createElement('div', 'ea-timeline-item_circle');
    const timelineTail = createElement('div', 'ea-timeline-item_tail');

    const timelineItemSlot = createSlotElement('');
    const timelineContent = createElement('div', 'ea-timeline-item_content', [timelineItemSlot]);
    const timelineTimestamp = createElement('div', 'ea-timeline-item_timestamp');
    const timelineContainer = createElement('div', 'ea-timeline-item_container', [timelineContent, timelineTimestamp]);

    const wrap = createElement('li', 'ea-timeline-item_wrap', [timelineCircle, timelineTail, timelineContainer]);

    this.#wrap = wrap;
    this.#timeWrap = timelineContainer;
    this.#timelineCircle = timelineCircle;
    this.#timelineTimestamp = timelineTimestamp;
    this.#timelineContent = timelineContent;

    this.build(shadowRoot, stylesheet);
    this.shadowRoot.appendChild(wrap);
  }

  // ------- time 时间 -------
  // #region
  get time() {
    return this.getAttribute('time') || "";
  }

  set time(value) {
    this.setAttribute('time', value);

    this.#timelineTimestamp.innerText = value;
  }
  // #endregion
  // ------- end -------

  // ------- type 时间线类型 -------
  // #region
  get type() {
    const attr = this.getAttribute('type');
    const flag = ["primary", "success", "warning", "danger", "info"].includes(attr);

    if (attr && flag) return attr;

    return "info";
  }

  set type(value) {
    this.setAttribute('type', value);

    this.#timelineCircle.classList.add(`ea-timeline-item--${value}`);
  }
  // #endregion
  // ------- end -------

  // ------- color 时间线颜色 -------
  // #region
  get color() {
    return this.getAttribute('color') || "";
  }

  set color(value) {
    this.setAttribute('color', value);

    const isColor = new Option().style.color = value;

    if (isColor !== "") this.#timelineCircle.style.backgroundColor = value;
  }
  // #endregion
  // ------- end -------

  // ------- size 时间线尺寸 -------
  // #region
  get size() {
    const attr = this.getAttribute('size');
    const flag = ["normal", "large"].includes(attr);

    if (attr && flag) return attr;

    return "normal";
  }

  set size(value) {
    this.setAttribute('size', value);

    this.#wrap.classList.add(`ea-timeline-item_circle--${value}`);
  }
  // #endregion
  // ------- end -------

  // ------- placement 时间的显示位置 -------
  // #region
  get placement() {
    const attr = this.getAttribute('placement');
    const flag = ["top", "bottom"].includes(attr);

    if (attr && flag) return attr;

    return "bottom";
  }

  set placement(value) {
    this.setAttribute('placement', value);

    this.#timeWrap.classList.add(`ea-timeline-item_timestamp--${value}`);
  }
  // #endregion
  // ------- end -------

  init() {
    const that = this;

    this.time = this.time;

    this.type = this.type;

    this.color = this.color;

    this.size = this.size;

    this.placement = this.placement;
  }

  connectedCallback() {
    this.init();
  }
}

if (!customElements.get('ea-timeline-item')) {
  customElements.define('ea-timeline-item', EaTimelineItem);
}