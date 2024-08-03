// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

import "../ea-table-column/index.js"

const stylesheet = `

`;

export class EaTable extends Base {
    #wrap;

    #headerCols;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-table_wrap';
        wrap.part = 'wrap';

        wrap.innerHTML = `
            <table class="ea-table_main">
                <colgroup></colgroup>
                <thead>
                    <tr><slot></slot></tr>
                </thead>
                <tbody></tbody>
            </table>
        `;

        this.#wrap = wrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- border 边框 -------
    // #region
    get border() {
        return this.getAttrBoolean('border');
    }

    set border(value) {
        this.setAttribute('border', value);

        const table = this.shadowRoot.querySelector('table');
        table.classList.toggle('border', value);
    }
    // #endregion
    // ------- end -------

    renderTableHeader() {
        const colgroup = this.shadowRoot.querySelector('colgroup');
        const tr = this.shadowRoot.querySelector('thead tr');

        const columns = Array.from(this.querySelectorAll('ea-table-column'));
        this.#headerCols = columns;

        colgroup.innerHTML = '';
        tr.innerHTML = '';

        columns.forEach(column => {
            const col = createElement('col');
            col.setAttribute('width', column.width);

            const th = createElement('th', 'ea-table__cell th-cell', [column]);

            colgroup.appendChild(col);
            tr.appendChild(th);
        });
    }

    renderTable(data) {
        const tbody = this.shadowRoot.querySelector('tbody');
        const columns = this.#headerCols;
        tbody.innerHTML = '';

        data.forEach(item => {
            const row = createElement('tr', 'ea-table__row');

            columns.forEach(column => {
                const cell = createElement('td', 'ea-table__cell td_cell');
                cell.textContent = item[column.prop];
                row.appendChild(cell);
            });

            tbody.appendChild(row);
        });
    }

    #init() {
        const that = this;

        this.border = this.border;

        this.renderTableHeader();
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-table')) {
    customElements.define('ea-table', EaTable);
}