// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

const stylesheet = `

`;

export class EaTableColumn extends Base {
    #wrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <th>
                <slot></slot>
            </th>
        `;

        this.build(shadowRoot, stylesheet);
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
        return this.getAttribute('label');
    }

    set label(value) {
        this.setAttribute('label', value);
    }
    // #endregion
    // ------- end -------

    #init() {
        const that = this;

        this.prop = this.prop;

        this.width = this.width;

        this.label = this.label;
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-table-column')) {
    customElements.define('ea-table-column', EaTableColumn);
}