// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

export class EaDescriptions extends Base {
    #wrap;

    #table;
    #tableHeader;
    #tableBody;

    #slot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-descriptions_wrap';

        const header = document.createElement('div');
        header.className = 'ea-descriptions_header';
        wrap.appendChild(header);

        const body = document.createElement('div');
        const table = document.createElement('table');
        const thead = document.createElement('thead');

        const slot = document.createElement('slot');
        body.className = 'ea-descriptions_body';
        body.appendChild(table);
        table.appendChild(thead);
        wrap.appendChild(body);

        this.#wrap = wrap;
        this.#table = table;
        this.#tableHeader = header;
        this.#slot = slot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- title 设置标题 -------
    // #region
    get title() {
        return this.getAttribute('title') || "";
    }

    set title(value) {
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

    initDescriptionsItem(colNumber, items) {
        const length = Number(items.length);

        for (let i = 0; i < length; i += 3) {
            let colspanCount = 0;
            const tbody = document.createElement('tbody');
            const tr = document.createElement('tr');
            tbody.appendChild(tr);

            for (let j = i; j < colNumber + i; j++) {
                const colspan = Number(items[j]?.getAttribute("span")) || 1;
                let temp = colspanCount + colspan;

                if (temp > colNumber || !items[j]) break;


                const td = document.createElement('td');
                td.className = 'ea-descriptions-item_wrap';
                td.colSpan = colspan;

                td.innerHTML = `
                    <span class="ea-descriptions-item_label">${items[j].getAttribute("label")}:</span>
                    <span class="ea-descriptions-item_content">
                        ${items[j].innerHTML}
                    </span>
                `;

                // tr.appendChild(items[j].cloneNode(true));
                tr.appendChild(td);
            }

            this.#table.appendChild(tbody);
        }

        items.forEach(el => {
            el.remove();
        });
    }

    init() {
        const that = this;

        this.title = this.title;

        this.col = this.col;

        const items = this.querySelectorAll('ea-descriptions-item');
        this.initDescriptionsItem(this.col, items);
    }

    connectedCallback() {
        this.init();
    }
}