import Base from '../Base.js'

import stylesheet from './index.scss?inline';

export class EaLayout extends Base {
    observedProps = [];

    /** 
     * @typedef {Object} State
     */

    /** @type {State} */
    state = this.properties({
        example: {
            type: 'type',
            default: '',
            observer: (newVal) => {

            }
        },
    })

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return this.computedClasslist('ea-link', {
            // ['--' + this.state.type]: this.state.type,
        });
    }

    constructor() {
        super();

        this.stylesheet = stylesheet;

        this.shadowRoot.innerHTML = `

        `;
    }

    // ------- example -------
    // #region
    get example() {
        return this.state.example;
    }

    set example(value) {
        this.state.example = value;
    }
    // #endregion
    // ------- end -------

    $mounted() {
        // example
        this.example = this.getAttribute('example');
    }
}

if (!window.customElements.get("ea-link")) {
    window.customElements.define("ea-link", EaLayout);
}