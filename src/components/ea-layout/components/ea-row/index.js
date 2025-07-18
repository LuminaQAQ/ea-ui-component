import Base from "../../../Base.js"

import stylesheet from './index.scss?inline';

export class EaRow extends Base {
    observedProps = ["gutter", "justify", "align"];

    /** 
     * @typedef {Object} State
     * @property {string} gutter - 列类型
     * @property {string} justify - 列对齐方式
     * @property {string} align - 列对齐方式
     */
    /** @type {State} */
    state = this.properties({
        gutter: {
            type: Number,
            default: 0,
            observer: (newVal) => {
                this.style.setProperty('--ea-row-gutter', newVal / 2 + 'px');
            }
        },
        justify: {
            type: ['start', 'end', 'center', 'space-around', 'space-between', 'space-evenly'],
            default: "start",
            observer: (newVal) => {
                this.style.setProperty('--ea-row-justify', newVal);
            }
        },
        align: {
            type: ['top', 'middle', 'bottom'],
            default: '',
            observer: (newVal) => { }
        },
    })

    constructor() {
        super();

        this.stylesheet = stylesheet;
    }

    // ------- gutter -------
    // #region
    get gutter() {
        return this.state.gutter;
    }

    set gutter(value) {
        this.state.gutter = value;
    }
    // #endregion
    // ------- end -------

    // ------- justify -------
    // #region
    get justify() {
        return this.state.justify;
    }

    set justify(value) {
        this.state.justify = value;
    }
    // #endregion
    // ------- end -------

    // ------- align -------
    // #region
    get align() {
        return this.state.align;
    }

    set align(value) {
        this.state.align = value;
    }
    // #endregion
    // ------- end -------

    // ------- tag -------
    // #region
    get tag() {
        return this.getAttribute('tag') || 'div';
    }

    set tag(value) {
        this.setAttribute('tag', value);
    }
    // #endregion
    // ------- end -------

    $mounted() {
        this.tag = this.tag;

        this.shadowRoot.innerHTML = `
            <${this.tag} class="ea-row" part="container">
                <slot></slot>
            </${this.tag}>
        `;

        this.gutter = this.getAttrNumber('gutter');
        this.justify = this.getAttribute('justify');
    }
}

if (!window.customElements.get('ea-row')) {
    window.customElements.define('ea-row', EaRow);
}