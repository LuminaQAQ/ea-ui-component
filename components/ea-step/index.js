// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

const stylesheet = `

`;

export class EaStep extends Base {
    #wrap;

    #headWrap;
    #stepIcon;
    #stepBar;

    #titleWrap;
    #descriptionWrap;

    #headSlot;
    #titleSlot;
    #descriptionSlot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-step_wrap';
        wrap.part = 'wrap';

        const stepIcon = createElement('div', 'ea-step_head-icon');
        const stepBar = createElement('div', 'ea-step_bar');
        const headWrap = createElement('div', 'ea-step_head-wrap', [stepBar, stepIcon]);
        headWrap.part = 'head-wrap';
        wrap.appendChild(headWrap);

        const titleSlot = createSlotElement('title');
        const titleWrap = createElement('div', 'ea-step_title-wrap', [titleSlot]);
        titleWrap.part = 'title-wrap';
        const descriptionSlot = createSlotElement('description');
        const descriptionWrap = createElement('div', 'ea-step_description-wrap', [descriptionSlot]);
        descriptionWrap.part = 'description-wrap';
        const mainWrap = createElement('div', 'ea-step_main-wrap', [titleWrap, descriptionWrap]);
        mainWrap.part = 'main-wrap';
        wrap.appendChild(mainWrap);

        this.#wrap = wrap;
        this.#headWrap = headWrap;
        this.#stepIcon = stepIcon;
        this.#stepBar = stepBar;

        this.#titleWrap = titleWrap;
        this.#titleSlot = titleSlot;
        this.#descriptionWrap = descriptionWrap;
        this.#descriptionSlot = descriptionSlot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- title 步骤的标题(如:步骤一) -------
    // #region
    get title() {
        return this.getAttribute('title');
    }

    set title(value) {
        const slot = this.querySelector('[slot="title"]');

        if (!slot) {
            this.#titleWrap.innerText = value;
        } else {
            value = slot.innerHTML;
            this.#titleSlot.innerHTML = value;
        }

        this.setAttribute('title', value);
    }
    // #endregion
    // ------- end -------

    // ------- description 步骤的描述 -------
    // #region
    get description() {
        return this.getAttribute('description');
    }

    set description(value) {
        const slot = this.querySelector('[slot="description"]');

        if (!slot) {
            this.#descriptionWrap.innerText = value;
        } else {
            value = slot.innerHTML;
            this.#descriptionSlot.innerHTML = value;
        }

        this.setAttribute('description', value);
    }
    // #endregion
    // ------- end -------

    // ------- space 步骤之间的间距 -------
    // #region
    get space() {
        return this.getAttribute('space') || '50%';
    }

    set space(value) {
        this.setAttribute('space', value);

        this.style.flexBasis = value;
    }
    // #endregion
    // ------- end -------

    // ------- icon 步骤的图标 -------
    // #region
    get icon() {
        return this.getAttribute('icon');
    }

    set icon(value) {
        if (!value) {
            this.#stepIcon.innerHTML = this.index + 1;
            this.#stepIcon.classList.add('is-text');
            value = this.index + 1;
        } else {
            this.#stepIcon.innerHTML = `
                <ea-icon icon="${value}"></ea-icon>
            `;
        }

        this.setAttribute('icon', value);
    }
    // #endregion
    // ------- end -------

    // ------- active 当前的步骤 -------
    // #region
    get active() {
        return this.getAttrBoolean('active') || false;
    }

    set active(value) {
        this.toggleAttr('active', value);
    }
    // #endregion
    // ------- end -------

    // ------- is-last 是否最后一个步骤 -------
    // #region
    get isLast() {
        return this.getAttrBoolean('is-last') || false;
    }

    set isLast(value) {
        this.toggleAttr('is-last', value);

        this.#headWrap.classList.toggle('is-last', value);
        this.style.cssText = `
            flex-basis: auto;
            flex-grow: 0;
            flex-shrink: 0;
        `;
    }
    // #endregion
    // ------- end -------

    // ------- status 步骤的状态 -------
    // #region
    get status() {
        return this.getAttribute('status');
    }

    set status(value) {
        this.setAttribute('status', value);

        this.#wrap.classList.toggle('is-finish', value === 'finish');
        this.#wrap.classList.toggle('is-process', value === 'process');
        this.#wrap.classList.toggle('is-wait', value === 'wait');

        if (value === 'finish') {
            const isIcon = this.#stepIcon.querySelector('ea-icon');

            if (!isIcon) this.#stepIcon.innerHTML = `
                <ea-icon icon="icon-ok" color="#67c23a" style="font-size: 14px; line-height: 14px;"></ea-icon>
            `;
        } else {
            this.#stepIcon.innerHTML = this.index + 1;
        }
    }
    // #endregion
    // ------- end -------

    #init() {
        const that = this;

        this.title = this.title;
        this.description = this.description;

        this.space = this.space;

        let timer = setTimeout(() => {
            this.icon = this.icon;

            clearTimeout(timer);
            timer = null;
        }, 20);

    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-step')) {
    customElements.define('ea-step', EaStep);
}