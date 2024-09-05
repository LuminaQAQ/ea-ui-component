import Base from '../Base.js';
import "../ea-icon/index.js"

import "../ea-descriptions-item/index.js";

import { getThTemplate_direction } from './src/components/getThTemplate_direction.js';
import { getTdTemplate_direction } from './src/components/getTdTemplate_direction.js';
import { contentTemplate } from "./src/components/contentTemplate.js";

import { stylesheet } from './src/style/stylesheet.js';

export class EaDescriptions extends Base {
    #table;
    #tableHeader;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-descriptions_wrap" part="container">
                <div class="ea-descriptions_header" part="header-wrap"></div>
                <div class="ea-descriptions_body" part="body-wrap">
                    <table class="ea-descriptions_table" part="table-wrap"></table>
                </div>
            </div>
        `;

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

    #initDescriptionsItem(items) {
        const length = Number(items.length);

        for (let i = 0; i < length; i += 3) {
            let colspanCount = 0;
            const tbody = document.createElement('tbody');
            tbody.part = 'table-tbody';

            switch (this.direction) {
                case "horizontal": {
                    const tr = document.createElement('tr');
                    tr.part = 'table-tr';

                    for (let j = i; j < this.col + i; j++) {
                        const colspan = Number(items[j]?.getAttribute("span")) || 1;
                        let temp = colspanCount + colspan;

                        if (temp > this.col || !items[j]) break;

                        tr.innerHTML += contentTemplate(items[j], colspan, this.border);
                    }

                    tbody.appendChild(tr);
                    break;
                }
                case "vertical": {
                    const th_tr = document.createElement('tr');
                    const td_tr = document.createElement('tr');
                    th_tr.part = 'table-tr';
                    td_tr.part = 'table-tr';

                    for (let j = i; j < this.col + i; j++) {
                        const colspan = Number(items[j]?.getAttribute("span")) || 1;
                        let temp = colspanCount + colspan;

                        if (temp > this.col || !items[j]) break;

                        th_tr.innerHTML += getThTemplate_direction(items[j].getAttribute("label"), this.border);
                        td_tr.innerHTML += getTdTemplate_direction(items[j].innerHTML, this.border, colspan);
                    }

                    tbody.appendChild(th_tr);
                    tbody.appendChild(td_tr);
                    break;
                }
            }

            this.#table.appendChild(tbody);
        }

        items.forEach(el => {
            el.remove();
        });
        this.shadowRoot?.querySelectorAll('[slot]').forEach(slot => {
            slot.remove();
        });
    }

    #initHasIconItem() {
        const hasIcon = this.shadowRoot?.querySelector('ea-icon');

        if (hasIcon) {
            this.shadowRoot.innerHTML += `
                <link rel="stylesheet" href="${new URL('../ea-icon/index.css', import.meta.url).href}">
            `;
        }
    }

    connectedCallback() {
        this.title = this.title;

        this.col = this.col;

        this.border = this.border;

        this.direction = this.direction;

        const items = this.querySelectorAll('ea-descriptions-item');
        this.#initDescriptionsItem(items);

        this.#initHasIconItem();
    }
}

if (!customElements.get('ea-descriptions')) {
    customElements.define('ea-descriptions', EaDescriptions);
}