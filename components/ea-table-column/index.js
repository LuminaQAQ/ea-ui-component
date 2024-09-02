// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'

import "../ea-checkbox/index.js"

const stylesheet = ``;

export class EaTableColumn extends Base {
    #labelNode;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <th>
                <slot></slot>
                <span></span>
            </th>
        `;

        this.build(shadowRoot, stylesheet);

        this.#labelNode = shadowRoot.querySelector('span');
    }

    // ------- prop 表头对应的数据的键值 -------
    // #region
    get prop() {
        return this.getAttribute('prop');
    }

    set prop(value) {
        this.setAttribute('prop', value);
    }
    // #endregion
    // ------- end -------

    // ------- width 列宽 -------
    // #region
    get width() {
        return this.getAttrNumber('width') || 350;
    }

    set width(value) {
        this.setAttribute('width', value);
    }
    // #endregion
    // ------- end -------

    // ------- label 标题 -------
    // #region
    get label() {
        return this.getAttribute('label') || '';
    }

    set label(value) {
        this.setAttribute('label', value);

        if (value !== '') this.#labelNode.innerHTML = value;
    }
    // #endregion
    // ------- end -------

    // ------- colspan 跨列 -------
    // #region
    get colspan() {
        return this.getAttrNumber('colspan') || 1;
    }

    set colspan(value) {
        this.setAttribute('colspan', value);
    }
    // #endregion
    // ------- end -------

    // ------- rowspan 跨行 -------
    // #region
    get rowspan() {
        return this.getAttrNumber('rowspan') || 1;
    }

    set rowspan(value) {
        this.setAttribute('rowspan', value);
    }
    // #endregion
    // ------- end -------

    // ------- type 列类型 -------
    // #region
    get type() {
        const attr = this.getAttribute('type');

        return ['default', 'index', 'selection'].includes(attr) ? attr : 'default';
    }

    set type(value) {
        this.setAttribute('type', value);

        if (value === "selection") {
            this.#labelNode.innerHTML = `
                <ea-checkbox></ea-checkbox>
            `;

            this.#labelNode.querySelector('ea-checkbox').addEventListener('change', (e) => {
                this.dispatchEvent(new CustomEvent('header-selection-change', {
                    detail: {
                        checked: e.detail.checked,
                    },
                    composed: true
                }));
            });
        }
    }
    // #endregion
    // ------- end -------

    // ------- sortable 是否可排序 -------
    // #region
    get sortable() {
        return this.getAttrBoolean('sortable') || false;
    }

    set sortable(value) {
        this.setAttribute('sortable', value);
    }
    // #endregion
    // ------- end -------

    // ------- order 排序方式 -------
    // #region
    get order() {
        return this.getAttribute('order') || 'asc';
    }

    set order(value) {
        this.setAttribute('order', value);
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.prop = this.prop;

        this.width = this.width;

        this.label = this.label;

        this.colspan = this.colspan;

        this.rowspan = this.rowspan;

        this.type = this.type;

        this.sortable = this.sortable;

        this.order = this.order;
    }
}

if (!customElements.get('ea-table-column')) {
    customElements.define('ea-table-column', EaTableColumn);
}