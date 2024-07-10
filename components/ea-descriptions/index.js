// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-descriptions_wrap {
  font-size: 14px;
}
.ea-descriptions_wrap .ea-descriptions_header {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 20px;
}
.ea-descriptions_wrap .ea-descriptions_body table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.ea-descriptions_wrap .ea-descriptions_body table th {
  background-color: #fafafa;
}
.ea-descriptions_wrap .ea-descriptions_body table td {
  vertical-align: baseline;
}
.ea-descriptions_wrap .ea-descriptions-item_label,
.ea-descriptions_wrap .ea-descriptions-item_content {
  font-weight: normal;
  font-size: 14px;
  vertical-align: middle;
}
.ea-descriptions_wrap .ea-descriptions-item_label.is-border,
.ea-descriptions_wrap .ea-descriptions-item_content.is-border {
  border: 1px solid #ebeef5;
}
.ea-descriptions_wrap .ea-descriptions-item_cell {
  text-align: left;
  padding: 12px 10px;
}
`;

const getThTemplate_normal = (label, content, colspan) => {
    return `
    <td class="ea-descriptions-item" colspan="${colspan}">
        <span class="ea-descriptions-item_label">${label}:</span>
        <span class="ea-descriptions-item_content">${content}</span>
    </td>
    `;
}

const getTdTemplate_border = (label, content, colspan) => {
    return `
    <th class="ea-descriptions-item_label ea-descriptions-item_cell is-border" colspan="${1}">${label}</th>
    <td class="ea-descriptions-item_content ea-descriptions-item_cell is-border" colspan="${colspan}">${content}</td>
    `
}
const getThTemplate_direction = (label, hasBorder) => {
    return `
    <th class="ea-descriptions-item_label ea-descriptions-item_cell ${hasBorder ? 'is-border' : ''}" colspan="${1}">
        ${label}${hasBorder ? '' : ':'}
    </th>`
}

const getTdTemplate_direction = (text, hasBorder, colspan) => {
    return `
    <td class="ea-descriptions-item_content ea-descriptions-item_cell ${hasBorder ? 'is-border' : ''}" colspan="${colspan}">
        ${text}
    </td>`
}

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

    initDescriptionsItem(colNumber, items, hasBorder, direction) {
        const length = Number(items.length);

        for (let i = 0; i < length; i += 3) {
            let colspanCount = 0;
            const tbody = document.createElement('tbody');

            switch (direction) {
                case "horizontal": {
                    const tr = document.createElement('tr');

                    for (let j = i; j < colNumber + i; j++) {
                        const colspan = Number(items[j]?.getAttribute("span")) || 1;
                        let temp = colspanCount + colspan;

                        if (temp > colNumber || !items[j]) break;

                        tr.innerHTML += contentTemplate(items[j], colspan, hasBorder);
                    }

                    tbody.appendChild(tr);
                    break;
                }
                case "vertical": {
                    const th_tr = document.createElement('tr');
                    const td_tr = document.createElement('tr');

                    for (let j = i; j < colNumber + i; j++) {
                        const colspan = Number(items[j]?.getAttribute("span")) || 1;
                        let temp = colspanCount + colspan;

                        if (temp > colNumber || !items[j]) break;

                        th_tr.innerHTML += getThTemplate_direction(items[j].getAttribute("label"), hasBorder);
                        td_tr.innerHTML += getTdTemplate_direction(items[j].innerHTML, hasBorder, colspan);
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
    }

    init() {
        const that = this;

        this.title = this.title;

        this.col = this.col;

        this.border = this.border;

        this.direction = this.direction;

        const items = this.querySelectorAll('ea-descriptions-item');
        this.initDescriptionsItem(this.col, items, this.border, this.direction);
    }

    connectedCallback() {
        this.init();
    }
}

if (!customElements.get('ea-descriptions')) {
    customElements.define('ea-descriptions', EaDescriptions);
}