import Base from "../../../Base.js"

import stylesheet from './index.scss?inline';

export class EaCol extends Base {
    observedProps = ["span", "offset", "push", "pull", "tag"];

    /** 
     * @typedef {Object} State
     * @property {Number} span 列数
     * @property {Number} offset 列偏移
     * @property {Number} push 列向右移动
     * @property {Number} pull 列向左移动
     */
    /** @type {State} */
    state = this.properties({
        span: {
            type: Number,
            default: 24,
            observer: (newVal) => {
                this.style.setProperty('--ea-col-span', newVal);
            }
        },
        offset: {
            type: Number,
            default: 0,
            observer: (newVal) => {
                this.style.setProperty('--ea-col-offset', newVal);
            }
        },
        push: {
            type: Number,
            default: 0,
            observer: (newVal) => {
                this.style.setProperty('--ea-col-push', newVal);
            }
        },
        pull: {
            type: Number,
            default: 0,
            observer: (newVal) => {
                this.style.setProperty('--ea-col-pull', newVal);
            }
        },
    })

    constructor() {
        super();

        this.stylesheet = stylesheet;
    }

    // ------- span -------
    // #region
    get span() {
        return this.state.span;
    }

    set span(value) {
        this.state.span = value;
    }
    // #endregion
    // ------- end -------

    // ------- offset -------
    // #region
    get offset() {
        return this.state.offset;
    }

    set offset(value) {
        this.state.offset = value;
    }
    // #endregion
    // ------- end -------

    // ------- push -------
    // #region
    get push() {
        return this.state.push;
    }

    set push(value) {
        this.state.push = value;
    }
    // #endregion
    // ------- end -------

    // ------- pull -------
    // #region
    get pull() {
        return this.state.pull;
    }

    set pull(value) {
        this.state.pull = value;
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

        this.span = this.getAttrNumber('span');
        this.offset = this.getAttrNumber('offset');
        this.push = this.getAttrNumber('push');
        this.pull = this.getAttrNumber('pull');
    }
}

if (!window.customElements.get('ea-col')) {
    window.customElements.define('ea-col', EaCol);
}