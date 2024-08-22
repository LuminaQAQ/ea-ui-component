// @ts-nocheck
import Base from '../Base.js';

import "../ea-descriptions-item/index.js";

import { getThTemplate_normal } from './src/components/getThTemplate_normal.js';
import { getTdTemplate_border } from './src/components/getTdTemplate_border.js';
import { getThTemplate_direction } from './src/components/getThTemplate_direction.js';
import { getTdTemplate_direction } from './src/components/getTdTemplate_direction.js';

import { stylesheet } from './src/style/stylesheet.js';
import { initDescriptionsItem } from './src/utils/initDescriptionsItem.js';

const contentTemplate = (item, colspan, hasBorder) => {
    let label = item.getAttribute("label");
    let content = item.innerHTML;

    if (!label) label = item.querySelector('[slot="label"]')?.innerHTML || "";

    return hasBorder ? getTdTemplate_border(label, content, colspan) : getThTemplate_normal(label, content, colspan);
}

export class EaDescriptions extends Base {
    #wrap;

    #table;
    #tableHeader;
    #tableBody;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-descriptions_wrap" part="container">
                <div class="ea-descriptions_header" part="header"></div>
                <div class="ea-descriptions_body" part="body-container">
                    <table class="ea-descriptions_table" part="table"></table>
                </div>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-descriptions_wrap');
        this.#table = shadowRoot.querySelector('.ea-descriptions_table');
        this.#tableHeader = shadowRoot.querySelector('.ea-descriptions_header');

        this.build(shadowRoot, stylesheet);
    }

    // ------- title 设置标题 -------
    // #region
    get title() {
        return this.getAttribute('title') || "";
    }

    set title(value) {
        this.setAttribute('title', value);

        this.#tableHeader.innerHTML = value;
    }
    // #endregion
    // ------- end -------

    // ------- col 一行显示多少个item -------
    // #region
    get col() {
        return this.getAttrNumber('col') || 3;
    }

    set col(value) {
        this.setAttribute('col', value);
    }
    // #endregion
    // ------- end -------

    // ------- border 是否显示边框 -------
    // #region
    get border() {
        return this.getAttrBoolean('border');
    }

    set border(value) {
        this.toggleAttr('border', value);
    }
    // #endregion
    // ------- end -------

    // ------- direction 显示方向 -------
    // #region
    get direction() {
        return this.getAttribute('direction') || "horizontal";
    }

    set direction(value) {
        this.setAttribute('direction', value);
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.title = this.title;

        this.col = this.col;

        this.border = this.border;

        this.direction = this.direction;

        const items = this.querySelectorAll('ea-descriptions-item');
        initDescriptionsItem(this.#table, this.col, items, this.border, this.direction);
    }
}

if (!customElements.get('ea-descriptions')) {
    customElements.define('ea-descriptions', EaDescriptions);
}