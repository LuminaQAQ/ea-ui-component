// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

const stylesheet = `

`;

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

    // ------- fixed 固定列 -------
    // #region
    get fixed() {
        return this.getAttrBoolean('fixed');
    }

    set fixed(value) {
        this.setAttribute('fixed', value);
    }
    // #endregion
    // ------- end -------

    #init() {
        const that = this;

        this.prop = this.prop;

        this.width = this.width;

        this.label = this.label;

        this.colspan = this.colspan;

        this.rowspan = this.rowspan;

        this.fixed = this.fixed;
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-table-column')) {
    customElements.define('ea-table-column', EaTableColumn);
}