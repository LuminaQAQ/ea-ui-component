// @ts-nocheck
import Base from '../Base';
import { createElement, createSlotElement } from '../../utils/createElement.js';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
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
        this.#observer.disconnect();
    }
}

if (!customElements.get('ea-timeline')) {
    customElements.define('ea-timeline', EaTimeline);
}

export class EaTimelineItem extends Base {
    #wrap;

    #timeWrap;

    #timelineCircle;
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
        this.#timeWrap = timelineTimestamp;
        this.#timelineCircle = timelineCircle;

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

        this.#timeWrap.innerText = value;
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

    init() {
        const that = this;

        this.time = this.time;

        this.type = this.type;
    }

    connectedCallback() {
        this.init();
    }
}

if (!customElements.get('ea-timeline-item')) {
    customElements.define('ea-timeline-item', EaTimelineItem);
}