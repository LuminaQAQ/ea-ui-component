// @ts-nocheck
import Base from '../Base';
import { createElement, createSlotElement } from '../../utils/createElement.js';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

export class EaCard extends Base {
    #wrap;



    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-card_wrap';

        const headerSlot = createSlotElement('header');
        const header = createElement('div', 'ea-card_header', [headerSlot]);
        wrap.appendChild(header);

        const contentSlot = document.createElement('slot');
        const content = createElement('div', 'ea-card_content', [contentSlot]);
        wrap.appendChild(content);

        this.#wrap = wrap;


        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- shadow 阴影属性 -------
    // #region
    get shadow() {
        return this.getAttribute('shadow') || "always";
    }

    set shadow(val) {
        this.setAttribute('shadow', val);

        this.#wrap.classList.add(`is-${val}-shadow`);
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;

        this.shadow = this.shadow;
    }

    connectedCallback() {
        this.init();
    }
}