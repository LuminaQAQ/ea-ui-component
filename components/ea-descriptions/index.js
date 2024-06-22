// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

const contentTemplate = (item, colspan, hasBorder) => {
    let label = item.getAttribute("label");
    let content = item.innerHTML;

    if (!label) {
        label = item.querySelector('[slot="label"]').innerHTML || "";
        
        console.log(item.textContent);
    }

    const notBorder = `
    <td class="ea-descriptions-item" colspan="${colspan}">
        <span class="ea-descriptions-item_label">${label}:</span>
        <span class="ea-descriptions-item_content">${content}</span>
    </td>
    `;

    const border = `
    <th class="ea-descriptions-item_label ea-descriptions-item_cell is-border" colspan="${1}">${label}</th>
    <td class="ea-descriptions-item_content ea-descriptions-item_cell is-border" colspan="${colspan}">${content}</td>
    `;

    return hasBorder ? border : notBorder;
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

    initDescriptionsItem(colNumber, items, hasBorder) {
        const length = Number(items.length);

        for (let i = 0; i < length; i += 3) {
            let colspanCount = 0;
            const tbody = document.createElement('tbody');
            const tr = document.createElement('tr');

            for (let j = i; j < colNumber + i; j++) {
                const colspan = Number(items[j]?.getAttribute("span")) || 1;
                let temp = colspanCount + colspan;

                if (temp > colNumber || !items[j]) break;

                tr.innerHTML += contentTemplate(items[j], colspan, hasBorder);
            }

            tbody.appendChild(tr);
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

        const items = this.querySelectorAll('ea-descriptions-item');
        this.initDescriptionsItem(this.col, items, this.border);
    }

    connectedCallback() {
        this.init();
    }
}