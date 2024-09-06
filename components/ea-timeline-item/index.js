import Base from '../Base.js';

import { stylesheet } from './src/style/stylesheet.js';

export class EaTimelineItem extends Base {
    #wrap;

    #timeWrap;

    #timelineCircle;
    #timelineTimestamp;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
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
        `;

        this.#wrap = shadowRoot.querySelector('.ea-timeline-item_wrap');
        this.#timeWrap = shadowRoot.querySelector('.ea-timeline-item_timestamp');
        this.#timelineCircle = shadowRoot.querySelector('.ea-timeline-item_circle');
        this.#timelineTimestamp = shadowRoot.querySelector('.ea-timeline-item_timestamp');

        this.build(shadowRoot, stylesheet);
    }

    // ------- time 时间 -------
    // #region
    get time() {
        return this.getAttribute('time') || "";
    }

    set time(value) {
        if (!value) return;

        this.setAttribute('time', value);

        this.#timelineTimestamp.innerText = value;
    }
    // #endregion
    // ------- end -------

    // ------- type 时间线类型 -------
    // #region
    get typeList() {
        return ["primary", "success", "warning", "danger", "info"];
    }

    get type() {
        const attr = this.getAttribute('type');

        return this.typeList.includes(attr) ? attr : "info";
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
        if (!value) return;

        this.setAttribute('color', value);

        const isColor = new Option().style.color = value;

        if (isColor !== "") this.#timelineCircle.style.backgroundColor = value;
    }
    // #endregion
    // ------- end -------

    // ------- size 时间线尺寸 -------
    // #region
    get sizeList() {
        return ["normal", "large"];
    }

    get size() {
        const attr = this.getAttribute('size');

        return this.sizeList.includes(attr) ? attr : "normal";
    }

    set size(value) {
        this.setAttribute('size', value);

        this.#wrap.classList.add(`ea-timeline-item_circle--${value}`);
    }
    // #endregion
    // ------- end -------

    // ------- placement 时间的显示位置 -------
    // #region
    get placementList() {
        return ["top", "bottom"];
    }

    get placement() {
        const attr = this.getAttribute('placement');

        return this.placementList.includes(attr) ? attr : "bottom";
    }

    set placement(value) {
        this.setAttribute('placement', value);

        this.#timeWrap.classList.add(`ea-timeline-item_timestamp--${value}`);
    }
    // #endregion
    // ------- end -------d

    connectedCallback() {
        this.time = this.time;

        this.type = this.type;

        this.color = this.color;

        this.size = this.size;

        this.placement = this.placement;
    }
}

if (!customElements.get('ea-timeline-item')) {
    customElements.define('ea-timeline-item', EaTimelineItem);
}